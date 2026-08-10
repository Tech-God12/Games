// ============================================================================
// Damage.js
// Central damage application: handles shields, armor, crits, headshots,
// invulnerability, lifesteal, status application, death, and event emission.
// Pure functions operating on entity components; gameplay systems build a
// DamageContext and call applyDamage(). Keeps all damage rules in one place
// so balance and perks can hook consistently.
// ============================================================================

import * as THREE from 'three';
import { bus, Channels } from '../core/EventBus.js';
import { StatusEffects, StatusType } from '../ecs/components/Combat.js';
import { Health as HealthC, Shield as ShieldC } from '../ecs/components/Vitals.js';
import { clamp } from '../core/MathUtils.js';

/**
 * @typedef {Object} DamageContext
 * @property {number} amount         base damage (post-crit already? no — pre)
 * @property {string} type           DamageType
 * @property {boolean} crit
 * @property {boolean} headshot
 * @property {number} knockback
 * @property {number} statusChance
 * @property {string} statusType
 * @property {number} statusPower
 * @property {number} statusDuration
 * @property {number} lifesteal      0..1 fraction
 * @property {number} armorPen       flat armor ignored
 * @property {import('../ecs/Entity.js').Entity} attacker
 * @property {import('../ecs/World.js').World} world
 * @property {object} effects
 * @property {object} progression    optional, for currency/xp on kill
 * @property {THREE.Vector3} hitPoint
 * @property {THREE.Vector3} hitNormal
 * @property {string} source         'player'|'enemy'|'environment'
 */

const ARMOR_EFFECTIVE_MAX = 0.9; // armor never removes more than 90%

/**
 * Apply damage to a target entity. Returns a result object.
 */
export function applyDamage(target, ctx) {
  const result = { killed: false, dealt: 0, crit: !!ctx.crit, headshot: !!ctx.headshot, blocked: false };
  if (!target || !target.alive) return result;
  const health = target.get(HealthC.type) || target.get('Health');
  if (!health || !health.alive || health.current <= 0) return result;

  // invulnerability
  if (health.invincible || health.invulnTime > 0) { result.blocked = true; return result; }

  let amount = ctx.amount;

  // armor reduction (flat, capped)
  const armor = Math.max(0, (health.armor || 0) - (ctx.armorPen || 0));
  if (armor > 0) {
    const reduction = Math.min(ARMOR_EFFECTIVE_MAX, armor / (armor + 20));
    amount *= (1 - reduction);
  }
  // incoming damage multiplier (debuffs like "mark")
  if (health.damageMult && health.damageMult !== 1) amount *= health.damageMult;

  amount = Math.max(0, amount);
  if (amount <= 0) return result;

  // shields absorb first
  let totalDealt = 0;
  const shield = target.get(ShieldC.type) || target.get('Shield');
  if (shield && shield.current > 0 && shield.absorbOrder === 1) {
    const absorbed = Math.min(shield.current, amount);
    shield.current -= absorbed;
    shield.lastDamagedAt = (ctx.world?.clock?.elapsed) || 0;
    totalDealt += absorbed;
    amount -= absorbed;
    if (shield.current <= 0) bus.emit(Channels.EntityDamaged, { entity: target, shieldBreak: true, amount: absorbed });
  }

  if (amount > 0) {
    health.current -= amount;
    health.lastDamagedAt = (ctx.world?.clock?.elapsed) || 0;
    totalDealt += amount;
  }
  result.dealt = totalDealt;

  // status application
  if (ctx.statusChance > 0 && Math.random() < ctx.statusChance && ctx.statusType) {
    let status = target.get(StatusEffects.type);
    if (!status) { status = new StatusEffects(); target.add(status); }
    status.add(ctx.statusType, ctx.statusPower || 1, ctx.statusDuration || 2);
  }

  // lifesteal
  if (ctx.lifesteal > 0 && ctx.attacker) {
    const healer = ctx.attacker.get(HealthC.type) || ctx.attacker.get('Health');
    if (healer && healer.alive) {
      healer.current = Math.min(healer.max, healer.current + amount * ctx.lifesteal);
    }
  }

  // knockback
  if (ctx.knockback > 0) {
    const body = target.get('Body');
    if (body && ctx.hitPoint) {
      const dir = ctx.attacker?.get('Body');
      let kbDir;
      if (dir) {
        kbDir = new THREE.Vector3().subVectors(body.pos, dir.pos).setY(0).normalize();
      } else {
        kbDir = ctx.hitNormal ? ctx.hitNormal.clone().setY(0).normalize() : new THREE.Vector3(0, 0, 1);
      }
      body.vel.addScaledVector(kbDir, ctx.knockback);
      body.vel.y += ctx.knockback * 0.3;
    }
  }

  const isPlayer = target.hasTag('Player');
  if (isPlayer) {
    bus.emit(Channels.PlayerDamaged, { entity: target, amount, source: ctx.source });
  } else {
    bus.emit(Channels.EntityDamaged, { entity: target, amount, crit: result.crit, headshot: result.headshot, hitPoint: ctx.hitPoint });
  }

  // death
  if (health.current <= 0) {
    health.current = 0;
    health.alive = false;
    result.killed = true;
    onDeath(target, ctx);
  }

  return result;
}

/** Handle entity death: events, rewards, effects. */
export function onDeath(target, ctx) {
  bus.emit(Channels.EntityKilled, { entity: target, killer: ctx.attacker });
  if (target.hasTag('Player')) {
    bus.emit(Channels.PlayerDeath, { entity: target });
    return; // player entity persists for death handling/camera
  }
  if (target.hasTag('Boss')) {
    bus.emit(Channels.BossDefeated, { entity: target, killer: ctx.attacker });
  }
  // rewards handled by the Game/Progression via events; effects here
  if (ctx.effects && ctx.hitPoint) {
    const body = target.get('Body');
    const pos = body ? body.pos.clone() : ctx.hitPoint.clone();
    ctx.effects.death(pos, 0xff3df0, target.hasTag('Boss') ? 3 : 1);
    ctx.effects.addShake(target.hasTag('Boss') ? 0.6 : 0.12);
  }
  // removeEntity sets alive=false and queues for flush; do NOT pre-set alive
  if (ctx.world) ctx.world.removeEntity(target);
}

/** Roll a crit/headshot for a weapon/profile. Returns {crit, headshot, mult}. */
export function rollCrit(critChance, critMult, headshotChance = 0, headshotMult = 1.5) {
  const roll = Math.random();
  if (headshotChance > 0 && roll < headshotChance) {
    return { crit: true, headshot: true, mult: headshotMult };
  }
  if (roll < critChance) return { crit: true, headshot: false, mult: critMult };
  return { crit: false, headshot: false, mult: 1 };
}

/** Apply a flat heal respecting max. */
export function heal(entity, amount) {
  const h = entity.get(HealthC.type) || entity.get('Health');
  if (!h || !h.alive) return 0;
  const before = h.current;
  h.current = Math.min(h.max, h.current + amount);
  bus.emit(Channels.PlayerHealed, { entity, amount: h.current - before });
  return h.current - before;
}
