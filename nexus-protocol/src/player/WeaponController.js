// ============================================================================
// WeaponController.js
// Owns the player's weapon loadout and translates input into shots across all
// fire modes (hitscan, projectile, beam, melee, charged). Handles semi/auto/
// burst triggers, spread, recoil, screen shake, SFX, viewmodel flash, weapon
// swapping, reloads, and ammo pickups. Applies per-weapon stat mods.
// ============================================================================

import * as THREE from 'three';
import { WeaponInstance, FireMode } from '../weapons/Weapon.js';
import { WeaponRegistry } from '../weapons/WeaponRegistry.js';
import { Body } from '../ecs/components/Body.js';
import { Health } from '../ecs/components/Vitals.js';
import { Player } from '../ecs/components/Gameplay.js';
import { applyDamage, rollCrit } from '../combat/Damage.js';
import { hitscan } from '../combat/Hitscan.js';
import { bus, Channels } from '../core/EventBus.js';
import { clamp, lerp, TAU } from '../core/MathUtils.js';
import { DamageType, StatusType } from '../ecs/components/Combat.js';

const _origin = new THREE.Vector3();
const _dir = new THREE.Vector3();
const _euler = new THREE.Euler(0, 0, 0, 'YXZ');
const _quat = new THREE.Quaternion();
const _spread = new THREE.Vector3();
const _muzzle = new THREE.Vector3();

export class WeaponController {
  constructor(input, opts = {}) {
    this.input = input;
    this.world = null;
    this.player = null;
    this.camera = null;
    this.cameraRig = null;
    this.viewmodel = null;
    this.projectileFactory = null;
    this.effects = null;
    this.arena = null;
    this.progression = null;
    this.eyeHeight = 1.6;
    this.slots = [];           // WeaponInstance[]
    this.maxSlots = opts.maxSlots || 4;
    this.current = 0;
    this.swapTimer = 0;
    this.swapDur = 0.35;
    this.enemyQuery = null;
    this._beamActive = false;
    this._chargeHeld = false;
    this._chargeTime = 0;
    bus.on('pickup.ammo', (e) => this._onAmmoPickup(e));
  }

  init(world) {
    this.world = world;
    this.enemyQuery = world.query({ all: ['Body', 'Health'], tags: ['Enemy'] });
  }

  /** Grant the starting loadout. */
  giveStarters() {
    for (const id of WeaponRegistry.starters()) this.addWeapon(id);
    this.select(0);
  }

  addWeapon(id, fillAmmo = true) {
    const def = WeaponRegistry.get(id);
    if (!def) return null;
    // stack: if same id already owned and not full, refill instead
    const existing = this.slots.find(s => s.def.id === id);
    if (existing) { existing.reserve = Math.min(existing.def.reserveMax, existing.reserve + existing.def.magazine * 2); return existing; }
    if (this.slots.length >= this.maxSlots) {
      // replace current
      const inst = new WeaponInstance(def);
      this.slots[this.current] = inst;
      this.viewmodel?.setWeapon(def);
      return inst;
    }
    const inst = new WeaponInstance(def);
    this.slots.push(inst);
    return inst;
  }

  select(index) {
    if (index < 0 || index >= this.slots.length) return;
    if (index === this.current && this.swapTimer <= 0) return;
    this.current = index;
    this.swapTimer = this.swapDur;
    const inst = this.slots[index];
    if (inst && this.viewmodel) this.viewmodel.setWeapon(inst.def);
    bus.emit(Channels.WeaponSwitched, { weapon: inst?.def });
    bus.emit(Channels.PlaySFX, { name: 'ui_click', volume: 0.3 });
  }

  next() { this.select((this.current + 1) % this.slots.length); }
  prev() { this.select((this.current - 1 + this.slots.length) % this.slots.length); }

  get currentWeapon() { return this.slots[this.current] || null; }

  /** Recompute mod multipliers from progression/perks/items. */
  recomputeMods(mods) {
    for (const inst of this.slots) {
      Object.assign(inst.mods, mods);
    }
  }

  update(dt) {
    if (!this.player || !this.world) return;
    if (this.swapTimer > 0) this.swapTimer -= dt;
    const inst = this.currentWeapon;
    if (!inst) return;
    const def = inst.def;

    // tick weapon timers
    const ev = inst.tick(dt);
    if (ev === 'reloaded') {
      bus.emit(Channels.WeaponReloaded, { weapon: def });
      bus.emit(Channels.PlaySFX, { name: 'reload', volume: 0.4 });
      if (def.onReload) def.onReload(this._ctx(inst));
    }

    // input: swap
    if (this.input.pressed('weapon1')) this.select(0);
    if (this.input.pressed('weapon2')) this.select(1);
    if (this.input.pressed('weapon3')) this.select(2);
    if (this.input.pressed('weapon4')) this.select(3);
    if (this.input.pressed('nextWeapon')) this.next();
    if (this.input.pressed('prevWeapon')) this.prev();

    // input: reload
    if (this.input.pressed('reload')) {
      if (inst.startReload()) {
        this.viewmodel?.reload();
        bus.emit(Channels.PlaySFX, { name: 'reload', volume: 0.35 });
      }
    }

    if (this.swapTimer > 0) return; // can't fire during swap

    // firing
    const triggerDown = this.input.isDown('fire');
    const triggerPressed = this.input.pressed('fire');

    if (def.fireMode === FireMode.Charged) {
      this._updateCharged(inst, dt, triggerDown, triggerPressed);
    } else if (def.fireMode === FireMode.Beam) {
      this._updateBeam(inst, dt, triggerDown);
    } else {
      // semi / auto / burst
      const wantFire = def.auto ? triggerDown : triggerPressed;
      if (inst.burstLeft > 0) {
        if (inst.burstTimer <= 0 && inst.canFire) { this._fireOnce(inst); inst.burstLeft--; inst.burstTimer = def.burstDelay; }
        else inst.burstTimer -= dt;
      } else if (wantFire && inst.canFire) {
        if (def.burst > 0) { inst.burstLeft = def.burst - 1; this._fireOnce(inst); inst.burstTimer = def.burstDelay; }
        else this._fireOnce(inst);
      }
      if (inst.ammo <= 0 && triggerDown && !inst.reloading) {
        // auto-reload when dry
        if (inst.startReload()) { this.viewmodel?.reload(); bus.emit(Channels.PlaySFX, { name: 'reload', volume: 0.35 }); }
      }
    }
  }

  _updateCharged(inst, dt, down, pressed) {
    if (down) { this._chargeTime += dt; }
    if (!down && this._chargeTime > 0) {
      const charge = clamp(this._chargeTime / inst.def.chargeTime, 0, 1);
      if (inst.canFire) this._fireOnce(inst, { charge });
      this._chargeTime = 0;
    }
  }

  _updateBeam(inst, dt, down) {
    const def = inst.def;
    if (down && inst.ammo > 0) {
      inst.tickAccum = (inst.tickAccum || 0) + dt;
      const tickRate = def.beam?.tickRate || 0.1;
      while (inst.tickAccum >= tickRate) {
        inst.tickAccum -= tickRate;
        inst.ammo = Math.max(0, inst.ammo - 1);
        this._fireBeam(inst);
        this.viewmodel?.flash(0.8);
        this._applyRecoil(inst, 0.3);
      }
      this._beamActive = true;
    } else {
      this._beamActive = false;
    }
  }

  _ctx(inst) {
    return {
      controller: this, weapon: inst, def: inst.def, player: this.player,
      world: this.world, effects: this.effects, progression: this.progression,
      enemyQuery: this.enemyQuery, arena: this.arena,
    };
  }

  _aimRay() {
    const p = this.player.get(Player.type);
    const body = this.player.get(Body.type);
    _origin.set(body.pos.x, body.pos.y + this.eyeHeight, body.pos.z);
    _euler.set(p.lookPitch, p.lookYaw, 0, 'YXZ');
    _quat.setFromEuler(_euler);
    _dir.set(0, 0, -1).applyQuaternion(_quat).normalize();
    return { origin: _origin, dir: _dir };
  }

  _applySpread(dir, spread) {
    if (spread <= 0) return dir;
    const a1 = (Math.random() - 0.5) * spread;
    const a2 = (Math.random() - 0.5) * spread;
    const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), a1);
    _spread.copy(dir).applyQuaternion(q);
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(_quat);
    const q2 = new THREE.Quaternion().setFromAxisAngle(right, a2);
    _spread.applyQuaternion(q2).normalize();
    return _spread;
  }

  _muzzlePos(origin, dir) {
    return _muzzle.copy(origin).addScaledVector(dir, 0.6).add(new THREE.Vector3(0.15, -0.1, 0));
  }

  _fireOnce(inst, opts = {}) {
    const def = inst.def;
    if (!inst.consumeAmmo()) return;
    inst.cooldown = 1 / inst.effectiveFireRate;
    inst.everFired = true;
    const charge = opts.charge || 1;

    const { origin, dir } = this._aimRay();
    const moving = (this.player.get(Body.type)?.vel.length() ?? 0) > 1;
    let spread = inst.effectiveSpread * (moving ? 2.0 : 1);
    if (def.pellets > 1) spread += def.movingSpread;

    const muzzle = this._muzzlePos(origin, dir);
    // SFX + viewmodel + recoil
    bus.emit(Channels.PlaySFX, { name: def.sfx, volume: 0.5, pitch: 0.95 + Math.random() * 0.1 });
    this.viewmodel?.flash(1);
    this._applyRecoil(inst, 1);
    if (this.effects) {
      this.effects.muzzle(muzzle, dir, def.muzzleColor || def.tracerColor);
      this.effects.addShake(def.screenShake);
    }
    bus.emit(Channels.WeaponFired, { weapon: def });

    if (def.onFire) def.onFire(this._ctx(inst));

    const pellets = def.pellets || 1;
    for (let i = 0; i < pellets; i++) {
      const pdir = this._applySpread(dir, spread);
      const baseDamage = inst.effectiveDamage * charge;
      if (def.fireMode === FireMode.Projectile) {
        this._spawnProjectile(inst, muzzle, pdir, baseDamage);
      } else if (def.fireMode === FireMode.Melee) {
        this._doMelee(inst, pdir, baseDamage);
      } else {
        this._doHitscan(inst, origin, pdir, muzzle, baseDamage);
      }
    }
  }

  _doHitscan(inst, origin, dir, muzzle, baseDamage) {
    const def = inst.def;
    const enemies = this.enemyQuery ? this.enemyQuery.array : [];
    const solids = this.arena ? this.arena.solids : null;
    const res = hitscan(origin, dir, def.range * inst.mods.rangeMult, enemies, solids, { pierce: def.projectile?.pierce || inst.mods.pierceAdd, canHeadshot: def.canHeadshot, excludeId: this.player.id });
    // tracer
    const end = res.endPoint;
    if (this.effects) this.effects.tracer(muzzle, end, def.tracerColor, def.tracerWidth);
    // wall impact
    if (res.wallDist < Infinity && res.wallPoint && this.effects) {
      this.effects.hitSpark(res.wallPoint, new THREE.Vector3(0, 1, 0), def.impactColor, 6);
    }
    // damage each hit
    let pierceIdx = 0;
    for (const h of res.hits) {
      const falloff = this._falloff(def, h.distance);
      const crit = rollCrit(inst.effectiveCritChance, inst.effectiveCritMult, h.headshot ? 1 : 0, def.headshotMult + inst.mods.headshotMultAdd);
      const amount = baseDamage * falloff * crit.mult * (1 - pierceIdx * 0.25);
      const ctx = {
        amount, type: def.damageType, crit: crit.crit, headshot: h.headshot,
        knockback: def.knockback * inst.mods.knockbackMult, statusChance: def.statusChance * inst.mods.statusChanceMult,
        statusType: def.statusType, statusPower: def.statusPower * inst.mods.statusPowerMult, statusDuration: def.statusDuration,
        lifesteal: def.lifesteal + inst.mods.lifestealAdd, armorPen: def.armorPen + inst.mods.armorPenAdd,
        attacker: this.player, world: this.world, effects: this.effects, progression: this.progression,
        hitPoint: h.point.clone(), hitNormal: dir.clone().negate(), source: 'player',
      };
      const r = applyDamage(h.entity, ctx);
      if (this.effects) {
        this.effects.hitSpark(h.point, dir.clone().negate(), def.impactColor, crit.crit ? 14 : 8);
        if (r.dealt > 0) this.effects.damageNumber(h.point, r.dealt, crit.headshot ? '#ffd24a' : (crit.crit ? '#ff7d3d' : '#ffffff'), crit.crit);
        if (r.killed) { const tb = h.entity.get(Body.type); this.effects.bloodOrEnergy(h.point, def.impactColor, 16); }
      }
      if (def.onHit) def.onHit(this._ctx(inst), h.entity, r);
      if (r.killed && def.onKill) def.onKill(this._ctx(inst), h.entity);
      pierceIdx++;
    }
  }

  _spawnProjectile(inst, origin, dir, baseDamage) {
    const def = inst.def;
    if (!this.projectileFactory) return;
    this.projectileFactory.spawn({
      position: origin.clone(), direction: dir.clone(), team: 'player', ownerId: this.player.id,
      damage: baseDamage, damageType: def.damageType, knockback: def.knockback * inst.mods.knockbackMult,
      critChance: inst.effectiveCritChance, critMult: inst.effectiveCritMult,
      statusChance: def.statusChance * inst.mods.statusChanceMult, statusType: def.statusType,
      statusPower: def.statusPower * inst.mods.statusPowerMult, statusDuration: def.statusDuration,
      lifesteal: def.lifesteal + inst.mods.lifestealAdd,
      canHeadshot: def.canHeadshot,
      pierceAdd: inst.mods.pierceAdd,
      aoeMult: inst.mods.aoeMult,
      speedMult: inst.mods.projectileSpeedMult,
      color: def.projectileColor,
      projectile: def.projectile || { speed: 60, shape: 'sphere', scale: 1, color: def.projectileColor, lifetime: 3, radius: 0.18 },
    });
  }

  _doMelee(inst, dir, baseDamage) {
    const def = inst.def;
    const range = def.melee?.range || 2.2;
    const arc = def.melee?.arc || 1.2;
    const enemies = this.enemyQuery ? this.enemyQuery.array : [];
    const body = this.player.get(Body.type);
    let hitAny = false;
    for (const t of enemies) {
      const tb = t.get(Body.type); if (!tb) continue;
      const to = _spread.set(tb.pos.x - body.pos.x, (tb.pos.y + tb.height * 0.5) - (body.pos.y + this.eyeHeight), tb.pos.z - body.pos.z);
      const d = to.length();
      if (d > range + (tb.radius || 0.4)) continue;
      to.normalize();
      if (to.dot(dir) < Math.cos(arc)) continue;
      const crit = { crit: false, headshot: false, mult: 1 };
      const ctx = {
        amount: baseDamage, type: def.damageType, crit: false, headshot: false,
        knockback: def.knockback * inst.mods.knockbackMult * 2, statusChance: def.statusChance, statusType: def.statusType,
        statusPower: def.statusPower, statusDuration: def.statusDuration, lifesteal: def.lifesteal + inst.mods.lifestealAdd,
        attacker: this.player, world: this.world, effects: this.effects, progression: this.progression,
        hitPoint: tb.pos.clone(), hitNormal: to.clone(), source: 'player',
      };
      const r = applyDamage(t, ctx);
      if (this.effects) { this.effects.hitSpark(tb.pos.clone().setY(tb.pos.y + 1), to, def.impactColor, 12); if (r.dealt > 0) this.effects.damageNumber(tb.pos.clone().setY(tb.pos.y + 1.2), r.dealt, '#ffffff', false); }
      hitAny = true;
    }
    // swing effect
    if (this.effects && !hitAny) this.effects.hitSpark(body.pos.clone().addScaledVector(dir, 1.5), dir.clone().negate(), def.impactColor, 4);
  }

  _fireBeam(inst) {
    const def = inst.def;
    const { origin, dir } = this._aimRay();
    const enemies = this.enemyQuery ? this.enemyQuery.array : [];
    const solids = this.arena ? this.arena.solids : null;
    const res = hitscan(origin, dir, def.range * inst.mods.rangeMult, enemies, solids, { pierce: 5, canHeadshot: false, excludeId: this.player.id });
    const muzzle = this._muzzlePos(origin, dir);
    if (this.effects) this.effects.beam(muzzle, res.endPoint, def.beam?.color || def.tracerColor, def.beam?.width || 0.08, 0.05);
    for (const h of res.hits) {
      const crit = rollCrit(inst.effectiveCritChance, inst.effectiveCritMult, 0, def.headshotMult);
      const amount = inst.effectiveDamage * crit.mult;
      const ctx = {
        amount, type: def.damageType, crit: crit.crit, headshot: false,
        knockback: def.knockback * 0.5, statusChance: def.statusChance, statusType: def.statusType,
        statusPower: def.statusPower, statusDuration: def.statusDuration, lifesteal: def.lifesteal,
        attacker: this.player, world: this.world, effects: this.effects, progression: this.progression,
        hitPoint: h.point.clone(), hitNormal: dir.clone().negate(), source: 'player',
      };
      applyDamage(h.entity, ctx);
      if (this.effects) this.effects.hitSpark(h.point, dir.clone().negate(), def.beam?.color || def.tracerColor, 5);
    }
    if (res.wallDist < Infinity && res.wallPoint && this.effects) this.effects.hitSpark(res.wallPoint, dir.clone().negate(), def.impactColor, 4);
  }

  _falloff(def, dist) {
    if (!def.falloffEnd || def.falloffEnd <= 0) return 1;
    if (dist <= def.falloffStart) return 1;
    if (dist >= def.falloffEnd) return def.falloffMin;
    const t = (dist - def.falloffStart) / (def.falloffEnd - def.falloffStart);
    return lerp(1, def.falloffMin, t);
  }

  _applyRecoil(inst, scale) {
    const def = inst.def;
    if (this.cameraRig) {
      let yawKick = (Math.random() - 0.5) * def.recoil * 0.008 * scale;
      let pitchKick = def.recoil * 0.01 * scale;
      if (def.recoilPattern === 'random') pitchKick += (Math.random() - 0.5) * def.recoil * 0.006;
      this.cameraRig.addRecoil(pitchKick, yawKick);
    }
    const p = this.player?.get(Player.type);
    if (p) { p.recoilPitch = Math.min(0.2, (p.recoilPitch || 0) + def.recoil * 0.01 * scale); }
  }

  _onAmmoPickup(e) {
    const fill = e?.value || 50;
    for (const inst of this.slots) {
      if (inst.def.reserveMax > 0) inst.reserve = Math.min(inst.def.reserveMax, inst.reserve + fill);
    }
  }

  /** Refill all weapons to full (used between waves / at run start). */
  refillAll() { for (const inst of this.slots) inst.reset(); }
}
