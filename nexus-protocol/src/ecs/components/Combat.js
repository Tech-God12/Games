// ============================================================================
// Combat.js — damage profiles, projectiles, beams, status effects, XP/currency.
// ============================================================================

import * as THREE from 'three';
import { Component } from '../Component.js';

export const DamageType = Object.freeze({
  Kinetic: 'kinetic',
  Energy: 'energy',
  Explosive: 'explosive',
  Fire: 'fire',
  Shock: 'shock',
  Cryo: 'cryo',
  Poison: 'poison',
  True: 'true',
});

export const StatusType = Object.freeze({
  Burn: 'burn', Shock: 'shock', Slow: 'slow', Poison: 'poison',
  Freeze: 'freeze', Mark: 'mark', Bleed: 'bleed', Stun: 'stun', Haste: 'haste', Shield: 'shield',
});

/** A configured outgoing damage profile (used by weapons/abilities). */
export class DamageProfile extends Component {
  static type = 'DamageProfile';
  constructor() {
    super();
    this.baseDamage = 10;
    this.damageType = DamageType.Kinetic;
    this.critChance = 0.05;
    this.critMult = 2.0;
    this.knockback = 4;
    this.statusChance = 0;
    this.statusType = StatusType.Burn;
    this.statusPower = 1;
    this.statusDuration = 2;
    this.armorPen = 0;
    this.headshotMult = 1.5;
  }
  reset() {
    this.baseDamage = 10; this.damageType = DamageType.Kinetic; this.critChance = 0.05;
    this.critMult = 2.0; this.knockback = 4; this.statusChance = 0; this.statusType = StatusType.Burn;
    this.statusPower = 1; this.statusDuration = 2; this.armorPen = 0; this.headshotMult = 1.5;
  }
}

/** Projectile component: travels along velocity, applies damage on hit. */
export class Projectile extends Component {
  static type = 'Projectile';
  constructor() {
    super();
    this.damage = 10;
    this.damageType = DamageType.Kinetic;
    this.ownerId = 0;
    this.team = 'enemy';
    this.speed = 60;
    this.pierce = 0;          // extra targets it can pass through
    this.maxHits = 1;
    this.hits = new Set();
    this.knockback = 4;
    this.critChance = 0.05;
    this.critMult = 2.0;
    this.statusChance = 0;
    this.statusType = StatusType.Burn;
    this.statusPower = 1;
    this.statusDuration = 2;
    this.aoeRadius = 0;       // >0 = explode on impact
    this.aoeFalloff = 0.5;    // 0=flat, 1=linear to edge
    this.homing = 0;          // 0..1 turn factor toward target
    this.targetId = 0;
    this.proximityFuse = 0;   // detonate within this dist of any enemy
    this.ricochet = 0;        // bounces off walls
    this.bouncesLeft = 0;
    this.trail = true;
    this.visualScale = 1;
    this.color = 0x29e7ff;
    this.canHeadshot = false;
    this.lifesteal = 0;       // fraction of damage returned as healing to owner
  }
  reset() {
    this.damage = 10; this.damageType = DamageType.Kinetic; this.ownerId = 0; this.team = 'enemy';
    this.speed = 60; this.pierce = 0; this.maxHits = 1; this.hits.clear(); this.knockback = 4;
    this.critChance = 0.05; this.critMult = 2.0; this.statusChance = 0; this.statusType = StatusType.Burn;
    this.statusPower = 1; this.statusDuration = 2; this.aoeRadius = 0; this.aoeFalloff = 0.5;
    this.homing = 0; this.targetId = 0; this.proximityFuse = 0; this.ricochet = 0; this.bouncesLeft = 0;
    this.trail = true; this.visualScale = 1; this.color = 0x29e7ff; this.canHeadshot = false; this.lifesteal = 0;
  }
}

/** Instant-hit beam/ray (hitscan visualized as a line). */
export class Beam extends Component {
  static type = 'Beam';
  constructor() {
    super();
    this.damage = 8;
    this.damageType = DamageType.Energy;
    this.ownerId = 0;
    this.team = 'player';
    this.range = 80;
    this.width = 0.08;
    this.tickRate = 0.1;     // damage interval for sustained beams
    this.tickAccum = 0;
    this.knockback = 2;
    this.color = 0xff3df0;
    this.targetPoint = new THREE.Vector3();
  }
  reset() {
    this.damage = 8; this.damageType = DamageType.Energy; this.ownerId = 0; this.team = 'player';
    this.range = 80; this.width = 0.08; this.tickRate = 0.1; this.tickAccum = 0; this.knockback = 2;
    this.color = 0xff3df0; this.targetPoint.set(0, 0, 0);
  }
}

/** Active status effects on an entity: map statusType -> {power, time, tick, tickAccum}. */
export class StatusEffects extends Component {
  static type = 'StatusEffects';
  constructor() { super(); this.effects = new Map(); }
  reset() { this.effects.clear(); }
  add(type, power, duration) {
    const existing = this.effects.get(type);
    if (existing) {
      existing.power = Math.max(existing.power, power);
      existing.time = Math.max(existing.time, duration);
    } else {
      this.effects.set(type, { power, time: duration, tick: 0, tickAccum: 0 });
    }
  }
  has(type) { return this.effects.has(type); }
  get(type) { return this.effects.get(type) || null; }
  remove(type) { this.effects.delete(type); }
}

export class Experience extends Component {
  static type = 'Experience';
  constructor() { super(); this.value = 1; }
  reset() { this.value = 1; }
}

export class CurrencyDrop extends Component {
  static type = 'CurrencyDrop';
  constructor() { super(); this.min = 1; this.max = 3; this.chance = 1; }
  reset() { this.min = 1; this.max = 3; this.chance = 1; }
}
