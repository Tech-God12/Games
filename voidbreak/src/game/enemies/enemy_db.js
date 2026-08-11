/**
 * VOIDBREAK — Enemy registry.
 *
 * Maps archetype ids → classes and spawns configured enemies with difficulty
 * scaling applied (health, damage, speed multipliers from the run settings).
 */

import { ENEMY_DEFS, ENEMY_BY_ID } from './enemy_defs.js';
import {
  Grunt, Runner, Shooter, Spitter, Brute, Shieldbearer, Drone, Swarmling, Summoner, Elite,
} from './archetypes.js';
import { BossColossus, BossWarden } from './bosses.js';

const CLASS_BY_ID = {
  grunt: Grunt,
  runner: Runner,
  shooter: Shooter,
  spitter: Spitter,
  brute: Brute,
  shieldbearer: Shieldbearer,
  drone: Drone,
  swarmling: Swarmling,
  summoner: Summoner,
  elite_grunt: Elite,
  elite_shooter: Elite,
  boss_colossus: BossColossus,
  boss_warden: BossWarden,
};

export function enemyClassFor(id) {
  return CLASS_BY_ID[id] ?? Grunt;
}

/**
 * Spawn an enemy.
 */
export function spawnEnemy(world, id, opts = {}) {
  const def = ENEMY_BY_ID.get(id) ?? ENEMY_BY_ID.get('grunt');
  const Cls = enemyClassFor(id);
  const enemy = new Cls(def, world, { x: opts.x ?? 0, y: opts.y ?? 0, z: opts.z ?? 0 });

  const diff = opts.difficulty ?? {};
  enemy.maxHealth = def.health * (diff.hpScale ?? 1);
  enemy.health = enemy.maxHealth;
  if (def.shield) {
    enemy.maxShield = def.shield * (diff.hpScale ?? 1);
    enemy.shield = enemy.maxShield;
  }
  enemy.speed = def.speed * (diff.speedScale ?? 1);
  enemy.damage = def.damage * (diff.damageScale ?? 1);
  enemy.scoreValue = Math.round(def.scoreValue * (diff.scoreScale ?? 1));

  if (opts.spawnEffect !== false) {
    world.bus.emit('fx.enemy_spawn', { x: enemy.position.x, y: 0.3, z: enemy.position.z, color: def.glow ?? '#6ad8ff' });
  }
  world.addEntity(enemy);
  return enemy;
}

export { ENEMY_DEFS, ENEMY_BY_ID };
