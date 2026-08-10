// ============================================================================
// Weapon.js
// Weapon definition (immutable, data-driven) and WeaponInstance (runtime
// state: ammo, cooldown, mods). Firing is executed by the WeaponController
// using the definition's fireMode + parameters; custom per-weapon behavior is
// expressed via optional onFire/onHit/onKill hooks so weapons can feel unique
// without bespoke systems.
// ============================================================================

import { DamageType, StatusType } from '../ecs/components/Combat.js';

export const FireMode = Object.freeze({
  Hitscan: 'hitscan',
  Projectile: 'projectile',
  Beam: 'beam',
  Melee: 'melee',
  Charged: 'charged',
});

export const WeaponRarity = Object.freeze({
  Common: 'common', Uncommon: 'uncommon', Rare: 'rare', Epic: 'epic', Legendary: 'legendary', Mythic: 'mythic',
});

export const RARITY_COLOR = Object.freeze({
  common: 0x9fb3d6, uncommon: 0x4fd07a, rare: 0x4aa3ff, epic: 0xb266ff, legendary: 0xffb347, mythic: 0xff3df0,
});

export const RARITY_WEIGHT = Object.freeze({
  common: 100, uncommon: 60, rare: 28, epic: 10, legendary: 3, mythic: 0.6,
});

/**
 * Create a weapon definition with sensible defaults filled in.
 * Definition fields are documented inline; missing optional fields default.
 */
export function makeWeapon(def) {
  const w = {
    id: def.id,
    name: def.name || def.id,
    type: def.type || 'sidearm',
    category: def.category || 'sidearm',     // sidearm, smg, shotgun, rifle, sniper, heavy, energy, special, melee
    rarity: def.rarity || WeaponRarity.Common,
    fireMode: def.fireMode || FireMode.Hitscan,
    damage: def.damage || 10,
    damageType: def.damageType || DamageType.Kinetic,
    fireRate: def.fireRate || 4,             // shots per second
    magazine: def.magazine || 12,
    reserveMax: def.reserveMax || 96,
    reloadTime: def.reloadTime || 1.4,
    pellets: def.pellets || 1,
    spread: def.spread || 0.01,              // radians (cone half-angle)
    movingSpread: def.movingSpread || 0.03,
    range: def.range || 80,
    falloffStart: def.falloffStart || 0,     // damage begins falling off at this distance
    falloffEnd: def.falloffEnd || 0,         // damage reaches min at this distance (0 = no falloff)
    falloffMin: def.falloffMin != null ? def.falloffMin : 0.5,
    // projectile
    projectile: def.projectile || null,      // {speed, gravity, lifetime, color, radius, pierce, aoe, homing, ricochet, proximity, scale, trail}
    // beam
    beam: def.beam || null,                  // {width, tickRate, color}
    // melee
    melee: def.melee || null,                // {range, arc, angle}
    // crit
    critChance: def.critChance != null ? def.critChance : 0.05,
    critMult: def.critMult != null ? def.critMult : 2.0,
    headshotMult: def.headshotMult != null ? def.headshotMult : 1.5,
    canHeadshot: def.canHeadshot || false,
    // status
    statusChance: def.statusChance || 0,
    statusType: def.statusType || StatusType.Burn,
    statusPower: def.statusPower || 1,
    statusDuration: def.statusDuration || 2,
    // misc
    knockback: def.knockback || 2,
    lifesteal: def.lifesteal || 0,
    armorPen: def.armorPen || 0,
    recoil: def.recoil || 1.0,               // vertical kick (radians-ish)
    recoilPattern: def.recoilPattern || 'up',// up, random, diag
    screenShake: def.screenShake || 0.06,
    heatPerShot: def.heatPerShot || 0,
    chargeTime: def.chargeTime || 0,
    auto: def.auto || false,                 // hold to fire
    burst: def.burst || 0,                   // 0 = no burst, n = shots per trigger pull
    burstDelay: def.burstDelay || 0.07,
    pelletsSpread: def.pelletsSpread || 1.0,
    sfx: def.sfx || 'shoot_pistol',
    icon: def.icon || null,                  // {shape, color} for procedural icon
    viewmodel: def.viewmodel || null,        // {color, accent, length, shape}
    tracerColor: def.tracerColor || 0xffe08a,
    tracerWidth: def.tracerWidth || 1,
    impactColor: def.impactColor || 0xffe08a,
    projectileColor: def.projectileColor || 0x29e7ff,
    description: def.description || '',
    flavor: def.flavor || '',
    price: def.price || 0,
    unlockWave: def.unlockWave || 0,
    tags: def.tags || [],
    onFire: def.onFire || null,
    onHit: def.onHit || null,
    onKill: def.onKill || null,
    onEquip: def.onEquip || null,
    onReload: def.onReload || null,
    mods: def.mods || null,                  // base intrinsic mods
    ...def.extra,
  };
  // derived icon defaults
  if (!w.icon) w.icon = { shape: 'gun', color: RARITY_COLOR[w.rarity] };
  if (!w.viewmodel) w.viewmodel = { color: 0x223044, accent: RARITY_COLOR[w.rarity], length: 0.5, shape: 'box' };
  return Object.freeze(w);
}

/**
 * Runtime weapon instance bound to a definition.
 */
export class WeaponInstance {
  constructor(def) {
    this.def = def;
    this.ammo = def.magazine;
    this.reserve = Math.min(def.reserveMax, def.magazine * 4);
    this.cooldown = 0;          // seconds until next shot
    this.reloadTimer = 0;
    this.reloading = false;
    this.heat = 0;
    this.charge = 0;            // for charged weapons
    this.burstLeft = 0;
    this.burstTimer = 0;
    this.triggerHeld = false;
    this.everFired = false;
    // stat multipliers (recomputed by progression)
    this.mods = {
      damageMult: 1, fireRateMult: 1, reloadMult: 1, magMult: 1, spreadMult: 1,
      critChanceAdd: 0, critMultAdd: 0, knockbackMult: 1, projectileSpeedMult: 1,
      statusPowerMult: 1, statusChanceMult: 1, lifestealAdd: 0, armorPenAdd: 0,
      rangeMult: 1, aoeMult: 1, pierceAdd: 0, ammoCostMult: 1, headshotMultAdd: 0,
    };
  }

  get effectiveFireRate() { return this.def.fireRate * this.mods.fireRateMult; }
  get effectiveDamage() { return this.def.damage * this.mods.damageMult; }
  get effectiveMagazine() { return Math.max(1, Math.round(this.def.magazine * this.mods.magMult)); }
  get effectiveReload() { return this.def.reloadTime * this.mods.reloadMult; }
  get effectiveSpread() { return this.def.spread * this.mods.spreadMult; }
  get effectiveCritChance() { return Math.min(1, this.def.critChance + this.mods.critChanceAdd); }
  get effectiveCritMult() { return this.def.critMult + this.mods.critMultAdd; }
  get canFire() { return this.cooldown <= 0 && !this.reloading && this.ammo > 0; }

  /** Recharge ammo toward magazine (used for weapons without reserve). */
  refill() { this.ammo = this.effectiveMagazine; }

  startReload() {
    if (this.reloading) return false;
    if (this.ammo >= this.effectiveMagazine) return false;
    if (this.reserve <= 0 && this.def.reserveMax > 0) return false;
    this.reloading = true;
    this.reloadTimer = this.effectiveReload;
    return true;
  }

  /** Tick weapon timers. Returns 'reloaded' when a reload completes. */
  tick(dt) {
    let event = null;
    if (this.cooldown > 0) this.cooldown = Math.max(0, this.cooldown - dt);
    if (this.reloading) {
      this.reloadTimer -= dt;
      if (this.reloadTimer <= 0) {
        const mag = this.effectiveMagazine;
        const need = mag - this.ammo;
        if (this.def.reserveMax > 0) {
          const take = Math.min(need, this.reserve);
          this.ammo += take; this.reserve -= take;
        } else {
          this.ammo = mag;
        }
        this.reloading = false;
        event = 'reloaded';
      }
    }
    if (this.burstLeft > 0) {
      this.burstTimer -= dt;
      if (this.burstTimer <= 0) { /* WeaponController will fire the burst shot */ }
    }
    if (this.heat > 0) this.heat = Math.max(0, this.heat - dt * 2);
    return event;
  }

  consumeAmmo() {
    const cost = Math.max(1, Math.round(1 * this.mods.ammoCostMult));
    if (this.ammo < cost) return false;
    this.ammo -= cost;
    return true;
  }

  /** Reset to full. */
  reset() {
    this.ammo = this.effectiveMagazine;
    this.cooldown = 0; this.reloading = false; this.reloadTimer = 0;
    this.heat = 0; this.charge = 0; this.burstLeft = 0; this.triggerHeld = false;
  }
}
