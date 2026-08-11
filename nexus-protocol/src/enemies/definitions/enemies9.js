// ============================================================================
// enemies9.js — Additional ground & flying enemies for late-wave variety.
// ============================================================================

import { EnemyRegistry } from '../EnemyRegistry.js';
import { StatusType, DamageType } from '../../ecs/components/Combat.js';

const E = (def) => EnemyRegistry.register(def);

E({ id: 'assaulter2', name: 'Assaulter', behavior: 'charger', shape: 'humanoid', color: 0xff7733, accent: 0xffe066, scale: 1.1, orientYaw: true,
  health: 70, speed: 3.8, contactDamage: 16, radius: 0.55, height: 1.5, armor: 3, xp: 5, currency: { min: 2, max: 4 }, weight: 3, tier: 3, unlockWave: 11,
  tags: ['ground', 'charger', 'armored'], detectRange: 50, description: 'An armored assaulter that charges the line.' });
E({ id: 'rifleman2', name: 'Rifleman', behavior: 'sniper', shape: 'humanoid', color: 0x4aa3ff, accent: 0xffffff, scale: 1, orientYaw: true,
  health: 34, speed: 2.4, contactDamage: 6, radius: 0.5, height: 1.5, xp: 4, currency: { min: 1, max: 3 }, weight: 3, tier: 3, unlockWave: 9,
  tags: ['ground', 'ranged', 'precision'], detectRange: 60, attack: { type: 'ranged', damage: 14, range: 45, cooldown: 2.6, preferredRange: 22, projectile: { speed: 56, color: 0x4aa3ff, shape: 'shard', scale: 1, radius: 0.18, lifetime: 4 } }, description: 'A precision rifleman firing fast leading shots.' });
E({ id: 'gunSerg2', name: 'Gunner Sergeant', behavior: 'sentry', shape: 'humanoid', color: 0xff5544, accent: 0xffe066, scale: 1.1, orientYaw: true,
  health: 75, speed: 1.4, contactDamage: 8, radius: 0.55, height: 1.5, armor: 4, xp: 6, currency: { min: 2, max: 4 }, weight: 3, tier: 4, unlockWave: 13,
  tags: ['ground', 'ranged', 'burst'], detectRange: 55, attack: { type: 'ranged', damage: 9, range: 36, cooldown: 2.2, preferredRange: 20, projectile: { speed: 40, color: 0xff5544, shape: 'orb', scale: 1.1, radius: 0.24, lifetime: 4 } }, description: 'A veteran gunner firing disciplined triple-bursts.' });
E({ id: 'heavyGunner2', name: 'Heavy Gunner', behavior: 'turret', shape: 'humanoid', color: 0x5577aa, accent: 0xff3df0, scale: 1.3, orientYaw: true,
  health: 95, speed: 0.8, contactDamage: 8, radius: 0.7, height: 1.6, armor: 8, xp: 6, currency: { min: 2, max: 5 }, weight: 2, tier: 4, unlockWave: 14,
  tags: ['ground', 'ranged', 'armored'], detectRange: 55, attack: { type: 'ranged', damage: 10, range: 36, cooldown: 0.9, preferredRange: 22, projectile: { speed: 36, color: 0xff3df0, shape: 'orb', scale: 1, radius: 0.22, lifetime: 4 } }, description: 'A suppressive heavy gunner. Sustained fire, armored.' });
E({ id: 'berserker2', name: 'Berserker', behavior: 'fastChaser', shape: 'humanoid', color: 0xff3344, accent: 0xffe066, scale: 1.2, orientYaw: true,
  health: 60, speed: 7.2, contactDamage: 16, radius: 0.55, height: 1.5, xp: 5, currency: { min: 2, max: 4 }, weight: 3, tier: 3, unlockWave: 12,
  tags: ['ground', 'fast', 'elite'], detectRange: 55, eliteHealthMult: 1.5, description: 'A frenzied berserker that sprints and slashes.' });
E({ id: 'gunCrawler2', name: 'Gun Crawler', behavior: 'strafer', shape: 'spider', color: 0xff8844, accent: 0xffe066, scale: 1, orientYaw: true,
  health: 42, speed: 4.8, contactDamage: 8, radius: 0.5, height: 0.9, xp: 3, currency: { min: 1, max: 3 }, weight: 4, tier: 3, unlockWave: 10,
  tags: ['ground', 'ranged'], detectRange: 50, attack: { type: 'ranged', damage: 7, range: 22, cooldown: 1.2, preferredRange: 10, projectile: { speed: 32, color: 0xff8844, shape: 'orb', scale: 0.8, radius: 0.18, lifetime: 3 } }, description: 'A strafing gun-crawler that circles while firing.' });
E({ id: 'bomberDrone2', name: 'Bomb Drone', behavior: 'kamikaze', shape: 'orb', color: 0xff3344, accent: 0xffe066, scale: 0.9, orientYaw: false,
  health: 20, speed: 8.5, contactDamage: 24, radius: 0.4, height: 0.9, flying: true, hoverHeight: 2.4, xp: 3, currency: { min: 1, max: 2 }, weight: 4, tier: 3, unlockWave: 8,
  tags: ['flying', 'suicide', 'explosive'], detectRange: 50, description: 'A diving bomb drone. Splash on impact.' });
E({ id: 'caster2', name: 'Caster', behavior: 'shooter', shape: 'drone', color: 0xb266ff, accent: 0xff3df0, scale: 1.1, orientYaw: false,
  health: 48, speed: 2.8, contactDamage: 6, radius: 0.5, height: 1.1, flying: true, hoverHeight: 4.5, xp: 4, currency: { min: 2, max: 4 }, weight: 3, tier: 3, unlockWave: 9,
  tags: ['flying', 'ranged'], detectRange: 60, attack: { type: 'ranged', damage: 11, range: 40, cooldown: 1.6, preferredRange: 20, projectile: { speed: 34, color: 0xb266ff, shape: 'shard', scale: 1.1, radius: 0.22, lifetime: 5 } }, description: 'A high-altitude caster lobbing heavy shards.' });
E({ id: 'spectre2', name: 'Spectre', behavior: 'dodger', shape: 'ghost', color: 0x88ffcc, accent: 0xffffff, scale: 1, orientYaw: false,
  health: 32, speed: 6, contactDamage: 9, radius: 0.5, height: 1.2, flying: true, hoverHeight: 2.2, xp: 4, currency: { min: 1, max: 3 }, weight: 3, tier: 3, unlockWave: 11,
  tags: ['flying', 'evasive', 'ranged'], detectRange: 55, resistances: { kinetic: 0.4 }, attack: { type: 'ranged', damage: 8, range: 24, cooldown: 1.5, preferredRange: 14, projectile: { speed: 38, color: 0x88ffcc, shape: 'orb', scale: 0.8, radius: 0.2, lifetime: 4 } }, description: 'A phasing spectre that dodges and resists kinetics.' });
E({ id: 'reaper4', name: 'Reaper', behavior: 'fastChaser', shape: 'shard', color: 0xff3df0, accent: 0x8a5bff, scale: 1, orientYaw: true,
  health: 42, speed: 8.8, contactDamage: 14, radius: 0.45, height: 1.2, flying: true, hoverHeight: 2.0, xp: 5, currency: { min: 2, max: 4 }, weight: 3, tier: 4, unlockWave: 14,
  tags: ['flying', 'fast', 'elite'], detectRange: 55, eliteHealthMult: 1.3, description: 'A diving reaper that closes terrifyingly fast.' });
E({ id: 'artillery3', name: 'Artillery Eye', behavior: 'turret', shape: 'orb', color: 0xff5544, accent: 0xffe066, scale: 1.4, orientYaw: false,
  health: 90, speed: 0.4, contactDamage: 8, radius: 0.75, height: 1.2, flying: true, hoverHeight: 7, xp: 7, currency: { min: 3, max: 6 }, weight: 2, tier: 4, unlockWave: 15,
  tags: ['flying', 'ranged', 'aoe', 'elite'], detectRange: 65, eliteHealthMult: 1.5, attack: { type: 'ranged', damage: 24, range: 55, cooldown: 2.2, preferredRange: 25, projectile: { speed: 26, gravity: 1.2, color: 0xff5544, shape: 'chunky', scale: 1.5, radius: 0.3, lifetime: 5 } }, glowPulse: { base: 1, amplitude: 0.6, speed: 1.5 }, description: 'A hovering artillery eye raining heavy mortars.' });
E({ id: 'voidRay3', name: 'Void Ray', behavior: 'strafer', shape: 'orb', color: 0x8a5bff, accent: 0xff3df0, scale: 1.2, orientYaw: false,
  health: 60, speed: 4.8, contactDamage: 10, radius: 0.6, height: 1.0, flying: true, hoverHeight: 3.4, xp: 5, currency: { min: 2, max: 4 }, weight: 2, tier: 4, unlockWave: 12,
  tags: ['flying', 'ranged', 'elite'], detectRange: 55, eliteHealthMult: 1.4, attack: { type: 'ranged', damage: 12, range: 32, cooldown: 1.0, preferredRange: 14, projectile: { speed: 40, color: 0x8a5bff, shape: 'shard', scale: 1, radius: 0.2, lifetime: 4 } }, glowPulse: { base: 1, amplitude: 0.7, speed: 2 }, description: 'A void ray that strafes with rapid shard fire.' });
