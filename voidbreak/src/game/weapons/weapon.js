/**
 * VOIDBREAK — Weapon (base class).
 *
 * Every weapon is an instance built from a definition (weapon_defs.js) plus
 * a behavior kind (hitscan / projectile / beam / charge / grenade / melee).
 * The base class handles ammo, reloading, firing cadence, spread, recoil and
 * the trigger state machine; subclasses implement `fireShot(ctx)`.
 */

import { clamp, lerp } from '../../core/math.js';
import { Recoil } from './recoil.js';
import { playSfx } from '../../audio/sfx.js';

export class Weapon {
  /**
   * @param {object} def weapon definition
   * @param {object} owner the player entity wielding it
   */
  constructor(def, owner, opts = {}) {
    this.def = def;
    this.id = def.id;
    this.name = def.name;
    this.kind = def.kind ?? 'hitscan';
    this.owner = owner;
    this.world = owner?.world ?? null;

    this.magSize = def.magSize ?? 30;
    this.reserveMax = def.reserveMax ?? 120;
    this.ammoInMag = def.magSize ?? 30;
    this.reserve = def.reserveMax ?? 120;
    this.infinite = def.infinite ?? false;

    this.fireRate = def.fireRate ?? 8;
    this.auto = def.auto ?? false;
    this.pellets = def.pellets ?? 1;
    this.damage = def.damage ?? 10;
    this.headshotMult = def.headshotMult ?? 2.0;
    this.critChance = def.critChance ?? 0.05;
    this.critMult = def.critMult ?? 1.6;
    this.range = def.range ?? 120;
    this.falloffStart = def.falloffStart ?? 30;
    this.falloffEnd = def.falloffEnd ?? 80;
    this.falloffFactor = def.falloffFactor ?? 0.55;
    this.element = def.element ?? 'kinetic';
    this.spreadBase = def.spreadBase ?? 0.6;
    this.spreadMove = def.spreadMove ?? 1.8;
    this.spreadAir = def.spreadAir ?? 2.6;
    this.spreadAdsMult = def.spreadAdsMult ?? 0.4;
    this.spreadDecay = def.spreadDecay ?? 12;

    this.recoilDef = def.recoil ?? {};
    this.recoil = new Recoil(this.recoilDef);

    this.reloadTime = def.reloadTime ?? 1.6;
    this.reloadSpeedMult = def.reloadSpeedMult ?? 1;

    this.zoomFov = def.zoomFov ?? 55;
    this.adsTime = def.adsTime ?? 0.18;
    this.ads = 0;

    this.chargeTime = def.chargeTime ?? 0;
    this.charge = 0;
    this.charging = false;

    this.triggerHeld = false;
    this.cooldown = 0;
    this.reloading = false;
    this.reloadProgress = 0;
    this.spread = 0;
    this.fireTimer = 0;
    this.shotsFired = 0;
    this.lastFireTime = -10;
    this.muzzleFlashTimer = 0;

    this.modifiers = {
      damageMult: 1,
      fireRateMult: 1,
      reloadMult: 1,
      magMult: 1,
      pelletsAdd: 0,
      spreadMult: 1,
      projectileSpeedMult: 1,
      ammoEfficiency: 1,
      critChanceAdd: 0,
      lifesteal: 0,
      pierceAdd: 0,
      bounceAdd: 0,
      explosionRadiusMult: 1,
      elementOverride: null,
    };

    this.sound = def.sound ?? 'gun.ar';
    this.soundPitchVar = def.soundPitchVar ?? 0.06;

    this.triggerJustPressed = false;
    this.triggerJustReleased = false;
  }

  // ------------------------------------------------------------ ammo

  get ammoTotal() {
    return this.infinite ? Infinity : this.ammoInMag + this.reserve;
  }

  get needsReload() {
    return this.ammoInMag <= 0 && !this.infinite;
  }

  canFire() {
    if (this.reloading) return false;
    if (this.ammoInMag <= 0 && !this.infinite) return false;
    return this.cooldown <= 0;
  }

  /** Begin reloading (no-op if already full or reloading). */
  startReload() {
    if (this.reloading) return false;
    if (!this.infinite && this.ammoInMag >= this.magSize) return false;
    if (!this.infinite && this.reserve <= 0 && this.ammoInMag >= this.magSize) return false;
    this.reloading = true;
    this.reloadProgress = 0;
    this.charging = false;
    this.charge = 0;
    return true;
  }

  cancelReload() {
    this.reloading = false;
  }

  _finishReload() {
    if (this.infinite) {
      this.ammoInMag = this.magSize;
    } else {
      const need = this.magSize - this.ammoInMag;
      const take = Math.min(need, this.reserve);
      this.ammoInMag += take;
      this.reserve -= take;
    }
    this.reloading = false;
    playSfx('weapon.reload_end', { vol: 0.5 });
  }

  /** Add ammo to reserve (pickups). Returns amount accepted. */
  addAmmo(amount) {
    if (this.infinite) return 0;
    const before = this.reserve;
    this.reserve = Math.min(this.reserveMax, this.reserve + Math.floor(amount));
    return this.reserve - before;
  }

  // ------------------------------------------------------------ firing

  /**
   * Update weapon state. `input` has {fire, ads, reload}; `ctx` carries
   * world/player/camera context for actual shots.
   */
  update(dt, input, ctx) {
    this.triggerJustPressed = input.fire && !this.triggerHeld;
    this.triggerJustReleased = !input.fire && this.triggerHeld;
    this.triggerHeld = input.fire;

    this.cooldown = Math.max(0, this.cooldown - dt);
    this.muzzleFlashTimer = Math.max(0, this.muzzleFlashTimer - dt);
    this.spread = Math.max(0, this.spread - this.spreadDecay * dt);

    const adsTarget = input.ads && !this.reloading && this.canFire() ? 1 : 0;
    this.ads = lerp(this.ads, adsTarget, clamp(1 - Math.exp(-1 / this.adsTime * dt * 2), 0, 1));

    if (this.reloading) {
      this.reloadProgress += dt / (this.reloadTime / this.reloadSpeedMult);
      if (this.reloadProgress >= 1) this._finishReload();
    } else if (input.reload && !this.infinite && this.ammoInMag < this.magSize && this.reserve > 0) {
      this.startReload();
    }

    if (this.chargeTime > 0 && this.triggerHeld && !this.reloading && this.canFire()) {
      this.charging = true;
      this.charge = Math.min(1, this.charge + dt / this.chargeTime);
    } else {
      this.charging = false;
      if (!this.triggerHeld) this.charge = 0;
    }

    this.fireTimer -= dt;
    const wantFire = this.auto ? this.triggerHeld : this.triggerJustPressed;
    if (wantFire && this.canFire() && this.fireTimer <= 0 && !this.reloading) {
      this.fire(ctx);
      this.fireTimer = 1 / (this.fireRate * this.modifiers.fireRateMult);
    }

    if (this.triggerJustReleased && this.chargeTime > 0) {
      this.releaseCharge?.(ctx);
    }

    this.recoil.update(dt, { ads: this.ads > 0.5 });
  }

  /** Consume a shot's ammo. */
  _consumeAmmo(count = 1) {
    if (this.infinite) return;
    this.ammoInMag = Math.max(0, this.ammoInMag - count);
    if (this.ammoInMag <= 0 && this.reserve > 0) {
      this.startReload();
    }
  }

  /** Fire one trigger pull (handles pellets). */
  fire(ctx) {
    if (!this.canFire()) return;
    const shots = this.pellets + this.modifiers.pelletsAdd;
    const results = [];
    for (let i = 0; i < shots; i++) {
      results.push(this.fireShot(ctx, i, shots));
    }
    this._consumeAmmo(1);
    this._afterFire(ctx, results);
    return results;
  }

  /** Per-shot behavior — implemented by subclasses. */
  fireShot(ctx, index, total) {
    void ctx; void index; void total;
    return null;
  }

  _afterFire(ctx, results) {
    const kick = this.recoil.kick(ctx.rng ?? Math.random);
    this.spread += this.recoilDef.spreadPerShot ?? 0;
    this.shotsFired++;
    this.lastFireTime = ctx.time ?? performance.now() / 1000;
    this.muzzleFlashTimer = 0.05;
    ctx.onKick?.(kick.pitchDelta, kick.yawDelta);
    ctx.onMuzzleFlash?.(this);
    const pos = ctx.muzzleWorldPos;
    playSfx(this.sound, {
      x: pos?.x, y: pos?.y, z: pos?.z,
      vol: 1,
      pitch: 1 + (Math.random() * 2 - 1) * this.soundPitchVar,
    });
    ctx.onFired?.(this, results);
  }

  /** Current spread in degrees (movement-aware). */
  currentSpread(moveSpeed = 0, airborne = false, ads = null) {
    const adsFactor = (ads ?? this.ads) > 0.5 ? this.spreadAdsMult : 1;
    const moveFactor = moveSpeed > 1.5 ? this.spreadMove : 0;
    const airFactor = airborne ? this.spreadAir : 0;
    return (this.spreadBase + this.spread + moveFactor + airFactor) * this.modifiers.spreadMult * adsFactor;
  }

  /** Final damage for one pellet. */
  shotDamage(ctx = {}) {
    return this.damage * this.modifiers.damageMult * (ctx.damageMult ?? 1);
  }

  get elementApplied() {
    return this.modifiers.elementOverride ?? this.element;
  }

  get fireModeLabel() {
    return this.auto ? 'AUTO' : 'SEMI';
  }

  /** Called when the player switches away. */
  holster() {
    this.triggerHeld = false;
    this.charging = false;
    this.charge = 0;
    this.cancelReload();
  }

  /** Serialize for save/records. */
  serialize() {
    return {
      id: this.id,
      ammoInMag: this.ammoInMag,
      reserve: this.reserve,
      modifiers: { ...this.modifiers },
    };
  }
}
