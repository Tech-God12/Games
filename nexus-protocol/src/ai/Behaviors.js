// ============================================================================
// Behaviors.js
// Library of enemy behavior functions. Each behavior drives an enemy entity's
// velocity and attacks given a context (player, arena, projectileFactory,
// effects, time). Behaviors are pure-ish functions of state; the AI system
// handles facing, contact damage, and status application around them.
//
// Available behaviors:
//   chaser, fastChaser, charger, shooter, shotgunner, sniper, strafer,
//   bomber, tank, swarm, turret, healer, shielder, summoner, orbiter,
//   dodger, splitter, kamikaze, brute, sentry, swarmLord
// ============================================================================

import * as THREE from 'three';
import { EnemyState } from '../ecs/components/Gameplay.js';
import { clamp, TAU } from '../core/MathUtils.js';
import { DamageType, StatusType } from '../ecs/components/Combat.js';
import { bus, Channels } from '../core/EventBus.js';

const _spawn = new THREE.Vector3();
const _dir = new THREE.Vector3();

class BehaviorRegistry {
  constructor() { this._map = new Map(); }
  register(name, fn) { this._map.set(name, fn); }
  get(name) { return this._map.get(name) || this._map.get('chaser'); }
  names() { return Array.from(this._map.keys()); }
}
export const Behaviors = new BehaviorRegistry();

/** Helper: move toward target position at speed. */
function moveToward(body, tx, tz, speed) {
  _dir.set(tx - body.pos.x, 0, tz - body.pos.z);
  const d = _dir.length();
  if (d > 0.05) { _dir.multiplyScalar(1 / d); body.vel.x = _dir.x * speed; body.vel.z = _dir.z * speed; }
  else { body.vel.x = 0; body.vel.z = 0; }
}

/** Helper: fire an enemy projectile at the player. */
function fireAtPlayer(enemy, e, ctx, opts = {}) {
  const { player, projectileFactory } = ctx;
  if (!player || !projectileFactory) return;
  const pb = player.get('Body'); if (!pb) return;
  const body = e.get('Body');
  const from = _spawn.set(body.pos.x, body.pos.y + (body.height * 0.6), body.pos.z);
  const target = opts.lead ? pb.pos.clone().addScaledVector(pb.vel, 0.15) : pb.pos.clone();
  _dir.subVectors(target, from).normalize();
  const spread = opts.spread || 0;
  if (spread > 0) {
    const a = (Math.random() - 0.5) * spread;
    const cos = Math.cos(a), sin = Math.sin(a);
    const dx = _dir.x * cos - _dir.z * sin, dz = _dir.x * sin + _dir.z * cos;
    _dir.set(dx, _dir.y, dz).normalize();
  }
  projectileFactory.spawn({
    position: from.clone(), direction: _dir.clone(), team: 'enemy', ownerId: e.id,
    damage: (opts.damage || 8) * enemy.damageScale, damageType: opts.damageType || DamageType.Energy,
    knockback: opts.knockback || 2, color: opts.color || 0xff3df0,
    critChance: 0, statusChance: opts.statusChance || 0, statusType: opts.statusType,
    statusPower: opts.statusPower, statusDuration: opts.duration || 2,
    projectile: {
      speed: opts.speed || 28, shape: opts.shape || 'orb', scale: opts.scale || 1, radius: opts.radius || 0.22,
      color: opts.color || 0xff3df0, lifetime: opts.lifetime || 4, glow: true, trail: true,
    },
  });
  if (ctx.effects) ctx.effects.muzzle(from, _dir, opts.color || 0xff3df0);
}

// ---------------------------------------------------------------------------
// Behaviors
// ---------------------------------------------------------------------------

Behaviors.register('chaser', (enemy, e, ctx, dist) => {
  const body = e.get('Body');
  const speed = (e.meta.baseSpeed || 4) * enemy.speedScale;
  ctx.toPlayer.normalize();
  if (dist > 1.2) { body.vel.x = ctx.toPlayer.x * speed; body.vel.z = ctx.toPlayer.z * speed; }
  else { body.vel.x *= 0.7; body.vel.z *= 0.7; }
});

Behaviors.register('fastChaser', (enemy, e, ctx, dist) => {
  const body = e.get('Body');
  const speed = (e.meta.baseSpeed || 7.5) * enemy.speedScale;
  // weave side to side
  const t = ctx.time * 4 + e.id;
  const side = Math.sin(t) * 0.4;
  const perpX = -ctx.toPlayer.z, perpZ = ctx.toPlayer.x;
  ctx.toPlayer.normalize();
  body.vel.x = (ctx.toPlayer.x + perpX * side) * speed;
  body.vel.z = (ctx.toPlayer.z + perpZ * side) * speed;
});

Behaviors.register('charger', (enemy, e, ctx, dist) => {
  const body = e.get('Body');
  const speed = (e.meta.baseSpeed || 3.5) * enemy.speedScale;
  if (enemy.state === EnemyState.Charge) {
    // charging: keep current velocity, decelerate after chargeTime
    if (enemy.stateTime > 0.5) { enemy.state = EnemyState.Chase; enemy.stateTime = 0; enemy.attackCooldown = 2.2; }
    return;
  }
  if (dist < 14 && enemy.attackCooldown <= 0) {
    enemy.state = EnemyState.Charge; enemy.stateTime = 0;
    ctx.toPlayer.normalize();
    const chargeSpeed = speed * 4;
    body.vel.x = ctx.toPlayer.x * chargeSpeed; body.vel.z = ctx.toPlayer.z * chargeSpeed;
    if (ctx.effects) ctx.effects.trailParticle(body.pos.clone(), 0xffe066, 5, 0.4);
    return;
  }
  if (dist > 1.5) { ctx.toPlayer.normalize(); body.vel.x = ctx.toPlayer.x * speed; body.vel.z = ctx.toPlayer.z * speed; }
  else { body.vel.x *= 0.6; body.vel.z *= 0.6; }
});

Behaviors.register('shooter', (enemy, e, ctx, dist) => {
  const body = e.get('Body');
  const speed = (e.meta.baseSpeed || 3) * enemy.speedScale;
  const pref = enemy.preferredRange;
  if (dist > pref + 2) { ctx.toPlayer.normalize(); body.vel.x = ctx.toPlayer.x * speed; body.vel.z = ctx.toPlayer.z * speed; }
  else if (dist < pref - 2) { ctx.toPlayer.normalize(); body.vel.x = -ctx.toPlayer.x * speed; body.vel.z = -ctx.toPlayer.z * speed; }
  else { // strafe slightly
    const t = ctx.time * 1.5 + e.id;
    const perpX = -ctx.toPlayer.z * Math.sin(t), perpZ = ctx.toPlayer.x * Math.sin(t);
    body.vel.x = perpX * speed * 0.6; body.vel.z = perpZ * speed * 0.6;
  }
  if (enemy.attackCooldown <= 0 && dist < enemy.attackRange) {
    fireAtPlayer(enemy, e, ctx, { damage: 9, speed: 30, color: 0xff5a8a, shape: 'orb', scale: 1 });
    enemy.attackCooldown = 1.6;
  }
});

Behaviors.register('shotgunner', (enemy, e, ctx, dist) => {
  const body = e.get('Body');
  const speed = (e.meta.baseSpeed || 2.6) * enemy.speedScale;
  if (dist > 10) { ctx.toPlayer.normalize(); body.vel.x = ctx.toPlayer.x * speed; body.vel.z = ctx.toPlayer.z * speed; }
  else { body.vel.x *= 0.8; body.vel.z *= 0.8; }
  if (enemy.attackCooldown <= 0 && dist < 16) {
    for (let i = 0; i < 5; i++) fireAtPlayer(enemy, e, ctx, { damage: 5, speed: 26, color: 0xffaa44, shape: 'orb', scale: 0.9, spread: 0.4 });
    enemy.attackCooldown = 2.2;
  }
});

Behaviors.register('sniper', (enemy, e, ctx, dist) => {
  const body = e.get('Body');
  const speed = (e.meta.baseSpeed || 2.2) * enemy.speedScale;
  // keep far distance
  if (dist < 22) { ctx.toPlayer.normalize(); body.vel.x = -ctx.toPlayer.x * speed; body.vel.z = -ctx.toPlayer.z * speed; }
  else { body.vel.x *= 0.5; body.vel.z *= 0.5; }
  if (enemy.attackCooldown <= 0 && dist < 50) {
    fireAtPlayer(enemy, e, ctx, { damage: 18, speed: 60, color: 0xff3df0, shape: 'shard', scale: 1.1, radius: 0.18, lead: true });
    enemy.attackCooldown = 3.0;
  }
});

Behaviors.register('strafer', (enemy, e, ctx, dist) => {
  const body = e.get('Body');
  const speed = (e.meta.baseSpeed || 5) * enemy.speedScale;
  ctx.toPlayer.normalize();
  const perpX = -ctx.toPlayer.z, perpZ = ctx.toPlayer.x;
  const dir = (e.id % 2 ? 1 : -1);
  // maintain distance with oscillation
  const radial = dist > enemy.preferredRange ? 1 : (dist < enemy.preferredRange - 2 ? -1 : 0);
  body.vel.x = (ctx.toPlayer.x * radial + perpX * dir) * speed;
  body.vel.z = (ctx.toPlayer.z * radial + perpZ * dir) * speed;
  if (enemy.attackCooldown <= 0 && dist < enemy.attackRange) {
    fireAtPlayer(enemy, e, ctx, { damage: 7, speed: 34, color: 0x29e7ff, shape: 'orb', scale: 0.8 });
    enemy.attackCooldown = 1.3;
  }
});

Behaviors.register('bomber', (enemy, e, ctx, dist) => {
  const body = e.get('Body');
  const speed = (e.meta.baseSpeed || 5.5) * enemy.speedScale;
  ctx.toPlayer.normalize();
  body.vel.x = ctx.toPlayer.x * speed; body.vel.z = ctx.toPlayer.z * speed;
  // blink red as it approaches
  if (dist < 3 && enemy.attackCooldown <= 0) {
    // explode
    if (ctx.effects) ctx.effects.explosion(body.pos.clone(), 4, 0xff6622, true);
    bus.emit(Channels.PlaySFX, { name: 'explosion', volume: 0.7 });
    const player = ctx.player; if (player && player.alive) {
      const pb = player.get('Body');
      if (pb && body.pos.distanceTo(pb.pos) < 4 + (pb.radius || 0.4)) {
        const d = body.pos.distanceTo(pb.pos);
        const dmg = (e.meta.contactDamage || 25) * enemy.damageScale * (1 - clamp(d / 4, 0, 1) * 0.5);
        applyDamageEnemy(player, dmg, e, ctx, body.pos.clone());
      }
    }
    e.destroy();
    enemy.attackCooldown = 999;
  }
});

function applyDamageEnemy(player, dmg, attacker, ctx, point) {
  // local import avoided; use the bus to request damage via a dedicated channel
  // Simpler: require Damage via dynamic? Keep a ref on ctx.
  if (ctx.applyDamage) ctx.applyDamage(player, {
    amount: dmg, type: 'explosive', crit: false, headshot: false, knockback: 8, statusChance: 0,
    lifesteal: 0, armorPen: 0, attacker, world: ctx.world, effects: ctx.effects, hitPoint: point, hitNormal: new THREE.Vector3(0,1,0), source: 'enemy',
  });
}

Behaviors.register('tank', (enemy, e, ctx, dist) => {
  const body = e.get('Body');
  const speed = (e.meta.baseSpeed || 2) * enemy.speedScale;
  ctx.toPlayer.normalize();
  if (dist > 3) { body.vel.x = ctx.toPlayer.x * speed; body.vel.z = ctx.toPlayer.z * speed; }
  else { body.vel.x *= 0.7; body.vel.z *= 0.7; }
  // periodic shockwave slam
  if (enemy.attackCooldown <= 0 && dist < 8) {
    if (ctx.effects) { ctx.effects.explosion(body.pos.clone().setY(body.pos.y + 0.5), 5, 0x8a5bff, false); ctx.effects.addShake(0.4); }
    const player = ctx.player; if (player && player.alive) {
      const pb = player.get('Body');
      if (pb && body.pos.distanceTo(pb.pos) < 5 + (pb.radius || 0.4)) applyDamageEnemy(player, 15 * enemy.damageScale, e, ctx, pb.pos.clone());
    }
    enemy.attackCooldown = 4;
  }
});

Behaviors.register('swarm', (enemy, e, ctx, dist) => {
  const body = e.get('Body');
  const speed = (e.meta.baseSpeed || 8) * enemy.speedScale;
  ctx.toPlayer.normalize();
  const t = ctx.time * 6 + e.id * 1.7;
  const perpX = -ctx.toPlayer.z * Math.sin(t), perpZ = ctx.toPlayer.x * Math.sin(t);
  body.vel.x = (ctx.toPlayer.x + perpX * 0.6) * speed;
  body.vel.z = (ctx.toPlayer.z + perpZ * 0.6) * speed;
});

Behaviors.register('turret', (enemy, e, ctx, dist) => {
  const body = e.get('Body');
  body.vel.x *= 0.6; body.vel.z *= 0.6;
  if (enemy.attackCooldown <= 0 && dist < enemy.attackRange) {
    fireAtPlayer(enemy, e, ctx, { damage: 8, speed: 32, color: 0xff3df0, shape: 'orb', scale: 1 });
    enemy.attackCooldown = 1.1;
  }
});

Behaviors.register('healer', (enemy, e, ctx, dist) => {
  const body = e.get('Body');
  const speed = (e.meta.baseSpeed || 3) * enemy.speedScale;
  // flee from player, heal nearby enemies
  ctx.toPlayer.normalize();
  body.vel.x = -ctx.toPlayer.x * speed; body.vel.z = -ctx.toPlayer.z * speed;
  if (enemy.attackCooldown <= 0) {
    const allies = ctx.world.withTag ? ctx.world.withTag('Enemy') : [];
    for (const a of allies) {
      if (a === e) continue;
      const ab = a.get('Body'); if (!ab) continue;
      if (body.pos.distanceTo(ab.pos) < 8) {
        const ah = a.get('Health'); if (ah && ah.alive && ah.current < ah.max) {
          ah.current = Math.min(ah.max, ah.current + ah.max * 0.1);
          if (ctx.effects) ctx.effects.trailParticle(ab.pos.clone().setY(ab.pos.y + 1), 0x4fd07a, 4, 0.6);
        }
      }
    }
    enemy.attackCooldown = 1.5;
  }
});

Behaviors.register('shielder', (enemy, e, ctx, dist) => {
  const body = e.get('Body');
  const speed = (e.meta.baseSpeed || 3) * enemy.speedScale;
  ctx.toPlayer.normalize();
  if (dist > 8) { body.vel.x = ctx.toPlayer.x * speed; body.vel.z = ctx.toPlayer.z * speed; }
  else { body.vel.x *= 0.7; body.vel.z *= 0.7; }
  // grant armor to nearby allies
  if (enemy.attackCooldown <= 0) {
    const allies = ctx.world.withTag ? ctx.world.withTag('Enemy') : [];
    for (const a of allies) {
      if (a === e) continue;
      const ab = a.get('Body'); if (!ab) continue;
      if (body.pos.distanceTo(ab.pos) < 6) {
        const ah = a.get('Health'); if (ah) ah.armor = Math.max(ah.armor || 0, 6);
      }
    }
    enemy.attackCooldown = 2;
  }
});

Behaviors.register('summoner', (enemy, e, ctx, dist) => {
  const body = e.get('Body');
  const speed = (e.meta.baseSpeed || 2.4) * enemy.speedScale;
  ctx.toPlayer.normalize();
  if (dist < 12) { body.vel.x = -ctx.toPlayer.x * speed; body.vel.z = -ctx.toPlayer.z * speed; }
  else { body.vel.x *= 0.6; body.vel.z *= 0.6; }
  if (enemy.attackCooldown <= 0) {
    // spawn 2-3 minions
    const count = 2 + Math.floor(Math.random() * 2);
    if (ctx.spawnEnemy) for (let i = 0; i < count; i++) ctx.spawnEnemy('swarmling', body.pos.x + (Math.random() - 0.5) * 2, body.pos.z + (Math.random() - 0.5) * 2, { scaled: true });
    enemy.attackCooldown = 6;
    if (ctx.effects) ctx.effects.flash(body.pos.clone().setY(body.pos.y + 1), 0xff3df0, 1.5);
  }
});

Behaviors.register('orbiter', (enemy, e, ctx, dist) => {
  const body = e.get('Body');
  const speed = (e.meta.baseSpeed || 5) * enemy.speedScale;
  const player = ctx.player; const pb = player?.get('Body'); if (!pb) return;
  const r = 7;
  const a = ctx.time * 1.2 + e.id;
  const tx = pb.pos.x + Math.cos(a) * r, tz = pb.pos.z + Math.sin(a) * r;
  moveToward(body, tx, tz, speed);
  if (enemy.attackCooldown <= 0) { fireAtPlayer(enemy, e, ctx, { damage: 6, speed: 30, color: 0x29e7ff, shape: 'orb', scale: 0.8 }); enemy.attackCooldown = 1.4; }
});

Behaviors.register('dodger', (enemy, e, ctx, dist) => {
  const body = e.get('Body');
  const speed = (e.meta.baseSpeed || 5) * enemy.speedScale;
  ctx.toPlayer.normalize();
  // dodge perpendicular when player is looking/firing (simplified: random dashes)
  const t = ctx.time * 3 + e.id;
  const dodge = Math.sin(t) > 0.6 ? 1.6 : 1;
  const perpX = -ctx.toPlayer.z * Math.cos(t), perpZ = ctx.toPlayer.x * Math.cos(t);
  body.vel.x = (ctx.toPlayer.x + perpX) * speed * dodge;
  body.vel.z = (ctx.toPlayer.z + perpZ) * speed * dodge;
  if (enemy.attackCooldown <= 0 && dist < 20) { fireAtPlayer(enemy, e, ctx, { damage: 7, speed: 36, color: 0xff3df0, shape: 'orb', scale: 0.8 }); enemy.attackCooldown = 1.6; }
});

Behaviors.register('kamikaze', (enemy, e, ctx, dist) => {
  const body = e.get('Body');
  const speed = (e.meta.baseSpeed || 9) * enemy.speedScale;
  ctx.toPlayer.normalize();
  body.vel.x = ctx.toPlayer.x * speed; body.vel.z = ctx.toPlayer.z * speed;
  if (dist < 1.6 && enemy.attackCooldown <= 0) {
    if (ctx.effects) ctx.effects.explosion(body.pos.clone(), 3.5, 0xff3344, true);
    bus.emit(Channels.PlaySFX, { name: 'explosion', volume: 0.6 });
    const player = ctx.player; if (player && player.alive) {
      const pb = player.get('Body'); if (pb) applyDamageEnemy(player, (e.meta.contactDamage || 18) * enemy.damageScale, e, ctx, pb.pos.clone());
    }
    e.destroy(); enemy.attackCooldown = 999;
  }
});

Behaviors.register('brute', (enemy, e, ctx, dist) => {
  const body = e.get('Body');
  const speed = (e.meta.baseSpeed || 3) * enemy.speedScale;
  ctx.toPlayer.normalize();
  if (dist > 2) { body.vel.x = ctx.toPlayer.x * speed; body.vel.z = ctx.toPlayer.z * speed; }
  else { body.vel.x *= 0.6; body.vel.z *= 0.6; }
  // heavy ground pound when close
  if (dist < 4 && enemy.attackCooldown <= 0) {
    if (ctx.effects) { ctx.effects.explosion(body.pos.clone().setY(body.pos.y + 0.4), 3, 0xffaa44, false); ctx.effects.addShake(0.3); }
    const player = ctx.player; if (player) { const pb = player.get('Body'); if (pb && body.pos.distanceTo(pb.pos) < 4) applyDamageEnemy(player, 14 * enemy.damageScale, e, ctx, pb.pos.clone()); }
    enemy.attackCooldown = 3;
  }
});

Behaviors.register('sentry', (enemy, e, ctx, dist) => {
  const body = e.get('Body');
  body.vel.x *= 0.4; body.vel.z *= 0.4;
  if (enemy.attackCooldown <= 0 && dist < 30) {
    // triple burst
    for (let i = -1; i <= 1; i++) fireAtPlayer(enemy, e, ctx, { damage: 6, speed: 38, color: 0x29e7ff, shape: 'orb', scale: 0.8, spread: 0.15 * i });
    enemy.attackCooldown = 2.4;
  }
});

Behaviors.register('splitter', (enemy, e, ctx, dist) => {
  const body = e.get('Body');
  const speed = (e.meta.baseSpeed || 4) * enemy.speedScale;
  ctx.toPlayer.normalize();
  body.vel.x = ctx.toPlayer.x * speed; body.vel.z = ctx.toPlayer.z * speed;
  // handled on death by EnemyFactory split hook (meta.onDeath)
});

Behaviors.register('swarmLord', (enemy, e, ctx, dist) => {
  const body = e.get('Body');
  const speed = (e.meta.baseSpeed || 3) * enemy.speedScale;
  ctx.toPlayer.normalize();
  if (dist > 8) { body.vel.x = ctx.toPlayer.x * speed; body.vel.z = ctx.toPlayer.z * speed; }
  else { body.vel.x *= 0.7; body.vel.z *= 0.7; }
  if (enemy.attackCooldown <= 0) {
    const count = 3;
    if (ctx.spawnEnemy) for (let i = 0; i < count; i++) ctx.spawnEnemy('swarmling', body.pos.x + (Math.random() - 0.5) * 3, body.pos.z + (Math.random() - 0.5) * 3, { scaled: true });
    // also spread shot
    for (let i = 0; i < 8; i++) fireAtPlayer(enemy, e, ctx, { damage: 5, speed: 24, color: 0xff3df0, shape: 'orb', scale: 0.8, spread: 0.8 });
    enemy.attackCooldown = 5;
  }
});

export const BEHAVIOR_NAMES = Behaviors.names();
