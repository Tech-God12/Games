// ============================================================================
// ground3.js — More ground enemies: specialists, hybrids, and swarm variants.
// ============================================================================

import { EnemyRegistry } from '../EnemyRegistry.js';
import { StatusType, DamageType } from '../../ecs/components/Combat.js';

EnemyRegistry.registerMany([
  { id: 'shocker', name: 'Shocker', behavior: 'shooter', shape: 'humanoid', color: 0xffe066, accent: 0x29e7ff, scale: 1, orientYaw: true,
    health: 38, speed: 3.0, contactDamage: 8, radius: 0.5, height: 1.4, xp: 4, currency: { min: 1, max: 3 }, weight: 4, tier: 3, unlockWave: 10,
    tags: ['ground', 'ranged', 'status'], detectRange: 50,
    attack: { type: 'ranged', damage: 7, range: 24, cooldown: 1.5, preferredRange: 12, projectile: { speed: 34, color: 0xffe066, shape: 'orb', scale: 1, radius: 0.22, lifetime: 3 } },
    contactStatus: { chance: 0.4, type: StatusType.Shock, power: 1 }, description: 'A shock trooper that stuns with its bolts.' },
  { id: 'plagueWalker', name: 'Plague Walker', behavior: 'chaser', shape: 'walker', color: 0x66ff44, accent: 0x223322, scale: 1.1, orientYaw: true,
    health: 60, speed: 3.6, contactDamage: 12, radius: 0.55, height: 1.3, xp: 4, currency: { min: 1, max: 3 }, weight: 4, tier: 3, unlockWave: 11,
    tags: ['ground', 'status'], detectRange: 45, contactStatus: { chance: 0.4, type: StatusType.Poison, power: 1 }, description: 'A venomous walker that poisons on touch.' },
  { id: 'gunSerg', name: 'Gunner Sergeant', behavior: 'sentry', shape: 'humanoid', color: 0xff5544, accent: 0xffe066, scale: 1.1, orientYaw: true,
    health: 70, speed: 1.4, contactDamage: 8, radius: 0.55, height: 1.5, armor: 4, xp: 6, currency: { min: 2, max: 4 }, weight: 3, tier: 4, unlockWave: 13,
    tags: ['ground', 'ranged', 'burst'], detectRange: 55,
    attack: { type: 'ranged', damage: 9, range: 36, cooldown: 2.2, preferredRange: 20, projectile: { speed: 40, color: 0xff5544, shape: 'orb', scale: 1.1, radius: 0.24, lifetime: 4 } },
    description: 'A veteran gunner firing disciplined triple-bursts.' },
  { id: 'hopper', name: 'Hopper', behavior: 'charger', shape: 'spider', color: 0x66ff88, accent: 0x222222, scale: 0.9, orientYaw: true,
    health: 30, speed: 5.0, contactDamage: 12, radius: 0.45, height: 0.9, xp: 3, currency: { min: 1, max: 2 }, weight: 5, tier: 2, unlockWave: 7,
    tags: ['ground', 'fast', 'charger'], detectRange: 50, description: 'A pouncing spider that leaps in bursts.' },
  { id: 'gunCrawler', name: 'Gun Crawler', behavior: 'strafer', shape: 'spider', color: 0xff8844, accent: 0xffe066, scale: 1, orientYaw: true,
    health: 40, speed: 4.6, contactDamage: 8, radius: 0.5, height: 0.9, xp: 3, currency: { min: 1, max: 3 }, weight: 4, tier: 3, unlockWave: 10,
    tags: ['ground', 'ranged'], detectRange: 50,
    attack: { type: 'ranged', damage: 7, range: 22, cooldown: 1.2, preferredRange: 10, projectile: { speed: 32, color: 0xff8844, shape: 'orb', scale: 0.8, radius: 0.18, lifetime: 3 } },
    description: 'A strafing gun-crawler that circles while firing.' },
  { id: 'droneSwarm', name: 'Drone Swarm', behavior: 'swarm', shape: 'swarm', color: 0x29e7ff, accent: 0xffffff, scale: 0.7, orientYaw: false,
    health: 10, speed: 7.5, contactDamage: 4, radius: 0.3, height: 0.6, xp: 1, currency: { min: 0, max: 1, chance: 0.5 }, weight: 8, tier: 1, unlockWave: 4,
    tags: ['ground', 'swarm', 'fast'], detectRange: 40, description: 'A blister of drones. Frantic and disposable.' },
  { id: 'heavyGunner', name: 'Heavy Gunner', behavior: 'turret', shape: 'humanoid', color: 0x5577aa, accent: 0xff3df0, scale: 1.3, orientYaw: true,
    health: 90, speed: 0.8, contactDamage: 8, radius: 0.7, height: 1.6, armor: 8, xp: 6, currency: { min: 2, max: 5 }, weight: 2, tier: 4, unlockWave: 14,
    tags: ['ground', 'ranged', 'armored'], detectRange: 55,
    attack: { type: 'ranged', damage: 10, range: 36, cooldown: 0.9, preferredRange: 22, projectile: { speed: 36, color: 0xff3df0, shape: 'orb', scale: 1, radius: 0.22, lifetime: 4 } },
    description: 'A suppressive heavy gunner. Sustained fire, armored.' },
  { id: 'berserker', name: 'Berserker', behavior: 'fastChaser', shape: 'humanoid', color: 0xff3344, accent: 0xffe066, scale: 1.2, orientYaw: true,
    health: 55, speed: 7.0, contactDamage: 16, radius: 0.55, height: 1.5, xp: 5, currency: { min: 2, max: 4 }, weight: 3, tier: 3, unlockWave: 12,
    tags: ['ground', 'fast', 'elite'], detectRange: 55, eliteHealthMult: 1.5, description: 'A frenzied berserker that sprints and slashes.' },
  { id: 'rifleman', name: 'Rifleman', behavior: 'sniper', shape: 'humanoid', color: 0x4aa3ff, accent: 0xffffff, scale: 1, orientYaw: true,
    health: 32, speed: 2.4, contactDamage: 6, radius: 0.5, height: 1.5, xp: 4, currency: { min: 1, max: 3 }, weight: 3, tier: 3, unlockWave: 9,
    tags: ['ground', 'ranged', 'precision'], detectRange: 60,
    attack: { type: 'ranged', damage: 14, range: 45, cooldown: 2.6, preferredRange: 22, projectile: { speed: 56, color: 0x4aa3ff, shape: 'shard', scale: 1, radius: 0.18, lifetime: 4 } },
    description: 'A precision rifleman firing fast leading shots.' },
  { id: 'assaulter', name: 'Assaulter', behavior: 'charger', shape: 'humanoid', color: 0xff7733, accent: 0xffe066, scale: 1.1, orientYaw: true,
    health: 65, speed: 3.6, contactDamage: 16, radius: 0.55, height: 1.5, armor: 3, xp: 5, currency: { min: 2, max: 4 }, weight: 3, tier: 3, unlockWave: 11,
    tags: ['ground', 'charger', 'armored'], detectRange: 50, description: 'An armored assaulter that charges the line.' },
]);
