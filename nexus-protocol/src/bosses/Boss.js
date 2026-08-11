// ============================================================================
// Boss.js
// Boss definition shape and the BossAbilities library: reusable attack
// patterns (radial bursts, spiral volleys, aimed fans, summon adds, charge
// slams, quakes, teleport strikes). BossFactory builds the entity; the
// BossAISystem sequences abilities per phase using these primitives.
// ============================================================================

import * as THREE from 'three';
import { Body } from '../ecs/components/Body.js';
import { bus, Channels } from '../core/EventBus.js';
import { DamageType } from '../ecs/components/Combat.js';
import { TAU } from '../core/MathUtils.js';

export function makeBoss(def) {
  return Object.freeze({
    id: def.id,
    name: def.name || def.id,
    title: def.title || def.name || def.id,
    subtitle: def.subtitle || '',
    health: def.health || 800,
    shield: def.shield || 0,
    armor: def.armor || 4,
    speed: def.speed || 2.6,
    behavior: def.behavior || 'tank',
    radius: def.radius || 1.4,
    height: def.height || 3.0,
    color: def.color || 0xff3df0,
    accent: def.accent || 0x29e7ff,
    shape: def.shape || 'tank',
    scale: def.scale || 2.2,
    flying: def.flying || false,
    hoverHeight: def.hoverHeight || 3,
    attack: def.attack || { type: 'ranged', damage: 14, range: 40, cooldown: 1.4, projectile: { speed: 30, color: 0xff3df0, shape: 'orb', scale: 1.4, radius: 0.32, lifetime: 5 } },
    contactDamage: def.contactDamage || 22,
    phases: def.phases || [
      { threshold: 1.0, abilities: ['radialBurst', 'aimedVolley'], abilityInterval: 3, speedMult: 1, damageMult: 1 },
      { threshold: 0.66, abilities: ['radialBurst', 'spiralBurst', 'summonAdds'], abilityInterval: 2.4, speedMult: 1.15, damageMult: 1.1 },
      { threshold: 0.33, abilities: ['spiralBurst', 'chargeSlam', 'quake', 'summonAdds'], abilityInterval: 1.8, speedMult: 1.3, damageMult: 1.25 },
    ],
    xp: def.xp || 60,
    currency: def.currency || { min: 30, max: 60 },
    unlockWave: def.unlockWave || 5,
    introText: def.introText || 'A guardian awakens.',
    tags: def.tags || ['boss'],
  });
}

// ---- Boss ability library ----
const _v = new THREE.Vector3();
const _from = new THREE.Vector3();

export const BossAbilities = {
  radialBurst(entity, ctx, power = 1) {
    const body = entity.get(Body); if (!body) return;
    const n = Math.round(14 * power);
    const speed = 22 + power * 6;
    const color = ctx.color || 0xff3df0;
    _from.set(body.pos.x, body.pos.y + body.height * 0.5, body.pos.z);
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU + Math.random() * 0.05;
      const dir = new THREE.Vector3(Math.cos(a), 0, Math.sin(a)).normalize();
      ctx.projectileFactory.spawn({
        position: _from.clone(), direction: dir, team: 'enemy', ownerId: entity.id,
        damage: 12 * (ctx.damageMult || 1), damageType: DamageType.Energy, knockback: 4, color,
        projectile: { speed, gravity: 0, lifetime: 4, color, radius: 0.26, shape: 'orb', scale: 1.1, glow: true, trail: true },
      });
    }
    if (ctx.effects) { ctx.effects.flash(_from.clone(), color, 2.5); ctx.effects.addShake(0.25); }
    bus.emit(Channels.PlaySFX, { name: 'shoot_plasma', volume: 0.5, pitch: 0.7 });
  },
  aimedVolley(entity, ctx, power = 1) {
    const body = entity.get(Body); if (!body || !ctx.player) return;
    const pb = ctx.player.get(Body); if (!pb) return;
    _from.set(body.pos.x, body.pos.y + body.height * 0.5, body.pos.z);
    const base = _v.subVectors(pb.pos, _from).setY(0).normalize();
    const n = 5; const spread = 0.4;
    for (let i = 0; i < n; i++) {
      const a = (i - (n - 1) / 2) * spread;
      const dir = base.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), a);
      ctx.projectileFactory.spawn({
        position: _from.clone(), direction: dir, team: 'enemy', ownerId: entity.id,
        damage: 14 * (ctx.damageMult || 1), damageType: DamageType.Energy, knockback: 3, color: ctx.color || 0xff5a8a,
        projectile: { speed: 34, gravity: 0, lifetime: 4, color: ctx.color || 0xff5a8a, radius: 0.24, shape: 'orb', scale: 1, glow: true, trail: true },
      });
    }
    bus.emit(Channels.PlaySFX, { name: 'shoot_shotgun', volume: 0.4 });
  },
  spiralBurst(entity, ctx, power = 1) {
    // multi-arm spiral; stored state on boss meta for continuity
    const meta = entity.meta = entity.meta || {};
    meta.spiral = meta.spiral || { angle: 0, arms: 4, time: 0, duration: 2.2 };
    if (meta.spiral.time <= 0) { meta.spiral = { angle: 0, arms: 3 + Math.round(power), time: 2.2, duration: 2.2 }; }
  },
  summonAdds(entity, ctx, power = 1) {
    const body = entity.get(Body); if (!body) return;
    const count = 2 + Math.round(power);
    if (ctx.spawnEnemy) for (let i = 0; i < count; i++) ctx.spawnEnemy('swarmling', body.pos.x + (Math.random() - 0.5) * 3, body.pos.z + (Math.random() - 0.5) * 3, { scaled: true });
    if (ctx.effects) ctx.effects.flash(body.pos.clone().setY(body.height * 0.5), 0xff3df0, 2);
    bus.emit(Channels.PlaySFX, { name: 'ability', volume: 0.5 });
  },
  chargeSlam(entity, ctx, power = 1) {
    const body = entity.get(Body); if (!body || !ctx.player) return;
    const pb = ctx.player.get(Body); if (!pb) return;
    const dir = _v.subVectors(pb.pos, body.pos).setY(0).normalize();
    body.vel.copy(dir).multiplyScalar(18);
    entity.meta = entity.meta || {}; entity.meta.slamPending = 1.0; entity.meta.slamDir = dir.clone();
    if (ctx.effects) ctx.effects.trailParticle(body.pos.clone().setY(1), 0xffe066, 6, 0.5);
  },
  quake(entity, ctx, power = 1) {
    const body = entity.get(Body); if (!body) return;
    if (ctx.effects) { ctx.effects.explosion(body.pos.clone().setY(0.5), 8 * power, 0xff7733, true); ctx.effects.addShake(0.7); }
    bus.emit(Channels.PlaySFX, { name: 'explosion', volume: 0.9 });
    // radial shockwave projectiles
    _from.set(body.pos.x, body.pos.y + 0.5, body.pos.z);
    const n = 24;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU;
      const dir = new THREE.Vector3(Math.cos(a), 0, Math.sin(a)).normalize();
      ctx.projectileFactory.spawn({
        position: _from.clone(), direction: dir, team: 'enemy', ownerId: entity.id,
        damage: 16 * (ctx.damageMult || 1), damageType: DamageType.Explosive, knockback: 10, color: 0xff7733,
        projectile: { speed: 16, gravity: 0, lifetime: 2.5, color: 0xff7733, radius: 0.3, shape: 'orb', scale: 1.2, aoe: 1.5, glow: true, trail: true },
      });
    }
  },
  teleportStrike(entity, ctx, power = 1) {
    const body = entity.get(Body); if (!body || !ctx.player) return;
    const pb = ctx.player.get(Body); if (!pb) return;
    if (ctx.effects) ctx.effects.death(body.pos.clone().setY(1), ctx.color || 0x8a5bff, 2);
    const dir = _v.subVectors(pb.pos, body.pos).setY(0).normalize();
    body.pos.copy(pb.pos).addScaledVector(dir, -6);
    if (ctx.effects) ctx.effects.death(body.pos.clone().setY(1), ctx.color || 0x8a5bff, 2);
    bus.emit(Channels.PlaySFX, { name: 'void_hum', volume: 0.6, dur: 0.5 });
  },
  laserSweep(entity, ctx, power = 1) {
    // emulated as a dense radial aimed arc that widens
    const body = entity.get(Body); if (!body || !ctx.player) return;
    const pb = ctx.player.get(Body); if (!pb) return;
    _from.set(body.pos.x, body.pos.y + body.height * 0.5, body.pos.z);
    const base = _v.subVectors(pb.pos, _from).setY(0).normalize();
    const n = 18; const spread = 0.9;
    for (let i = 0; i < n; i++) {
      const a = (i - (n - 1) / 2) * (spread / n);
      const dir = base.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), a);
      ctx.projectileFactory.spawn({
        position: _from.clone(), direction: dir, team: 'enemy', ownerId: entity.id,
        damage: 10 * (ctx.damageMult || 1), damageType: DamageType.Energy, knockback: 2, color: 0xff3df0,
        projectile: { speed: 40, gravity: 0, lifetime: 3, color: 0xff3df0, radius: 0.18, shape: 'shard', scale: 1, glow: true, trail: true },
      });
    }
    if (ctx.effects) ctx.effects.beam(_from.clone(), pb.pos.clone().setY(pb.pos.y + 1), 0xff3df0, 0.2, 0.2);
  },
};
