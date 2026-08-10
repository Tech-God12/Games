// ============================================================================
// ground2.js — Additional ground enemies: bruisers, swarmers, hybrids.
// ============================================================================

import { EnemyRegistry } from '../EnemyRegistry.js';
import { StatusType, DamageType } from '../../ecs/components/Combat.js';

EnemyRegistry.registerMany([
  { id: 'crawler', name: 'Crawler', behavior: 'chaser', shape: 'spider', color: 0x88ff66, accent: 0x222222, scale: 0.9, orientYaw: true,
    health: 20, speed: 5.4, contactDamage: 7, radius: 0.4, height: 0.7, xp: 1, currency: { min: 1, max: 2 }, weight: 9, tier: 1, unlockWave: 2,
    tags: ['ground', 'fast'], detectRange: 50, description: 'A skittering swarm-filler. Quick and expendable.' },
  { id: 'gunnerDroid', name: 'Gun Droid', behavior: 'shooter', shape: 'drone', color: 0xff8844, accent: 0xffe066, scale: 1, orientYaw: false,
    health: 32, speed: 3.0, contactDamage: 6, radius: 0.45, height: 1.0, flying: false, xp: 2, currency: { min: 1, max: 3 }, weight: 6, tier: 2, unlockWave: 4,
    tags: ['ground', 'ranged'], detectRange: 55,
    attack: { type: 'ranged', damage: 8, range: 28, cooldown: 1.5, preferredRange: 12, projectile: { speed: 30, color: 0xff8844, shape: 'orb', scale: 1, radius: 0.22, lifetime: 4 } },
    description: 'A grounded fire-support droid. Lobs bolts from mid-range.' },
  { id: 'hulk', name: 'Hulk', behavior: 'brute', shape: 'humanoid', color: 0x55aaff, accent: 0xffffff, scale: 1.5, orientYaw: true,
    health: 130, speed: 2.6, contactDamage: 18, radius: 0.8, height: 2.0, armor: 6, xp: 6, currency: { min: 2, max: 5 }, weight: 3, tier: 3, unlockWave: 8,
    tags: ['ground', 'heavy', 'slam'], detectRange: 40, description: 'A massive brute that ground-pounds on arrival.' },
  { id: 'swarmHound', name: 'Swarm Hound', behavior: 'fastChaser', shape: 'walker', color: 0xffaa44, accent: 0xff3344, scale: 0.9, orientYaw: true,
    health: 24, speed: 8.0, contactDamage: 8, radius: 0.45, height: 1.0, xp: 2, currency: { min: 1, max: 2 }, weight: 6, tier: 2, unlockWave: 5,
    tags: ['ground', 'fast'], detectRange: 55, description: 'A fleet-footed hunter that weaves into range.' },
  { id: 'enforcer', name: 'Enforcer', behavior: 'charger', shape: 'humanoid', color: 0x4aa3ff, accent: 0xff3df0, scale: 1.1, orientYaw: true,
    health: 70, speed: 3.4, contactDamage: 16, radius: 0.55, height: 1.5, armor: 4, xp: 4, currency: { min: 2, max: 4 }, weight: 4, tier: 3, unlockWave: 9,
    tags: ['ground', 'charger'], detectRange: 50, description: 'A riot enforcer that charges in a straight line.' },
  { id: 'pyroBot', name: 'Pyro Bot', behavior: 'shooter', shape: 'humanoid', color: 0xff5522, accent: 0xffe066, scale: 1, orientYaw: true,
    health: 40, speed: 3.0, contactDamage: 8, radius: 0.5, height: 1.4, xp: 3, currency: { min: 1, max: 3 }, weight: 4, tier: 3, unlockWave: 8,
    tags: ['ground', 'ranged', 'status'], detectRange: 50,
    attack: { type: 'ranged', damage: 7, range: 22, cooldown: 1.4, preferredRange: 10, projectile: { speed: 26, color: 0xff5522, shape: 'orb', scale: 1, radius: 0.24, lifetime: 3 } },
    contactStatus: { chance: 0.4, type: StatusType.Burn, power: 1 }, description: 'Hurls firebombs that ignite on hit.' },
  { id: 'cryoBot', name: 'Cryo Bot', behavior: 'shooter', shape: 'humanoid', color: 0x9fe7ff, accent: 0xffffff, scale: 1, orientYaw: true,
    health: 40, speed: 3.0, contactDamage: 8, radius: 0.5, height: 1.4, xp: 3, currency: { min: 1, max: 3 }, weight: 4, tier: 3, unlockWave: 8,
    tags: ['ground', 'ranged', 'status'], detectRange: 50,
    attack: { type: 'ranged', damage: 7, range: 22, cooldown: 1.4, preferredRange: 10, projectile: { speed: 26, color: 0x9fe7ff, shape: 'orb', scale: 1, radius: 0.24, lifetime: 3 } },
    contactStatus: { chance: 0.4, type: StatusType.Slow, power: 1 }, description: 'Frost bombs that chill and slow.' },
  { id: 'glutton', name: 'Glutton', behavior: 'chaser', shape: 'blob', color: 0x66ff88, accent: 0x223322, scale: 1.4, orientYaw: false,
    health: 90, speed: 3.0, contactDamage: 14, radius: 0.8, height: 1.4, armor: 2, regen: 8, xp: 5, currency: { min: 2, max: 4 }, weight: 3, tier: 3, unlockWave: 10,
    tags: ['ground', 'regen', 'heavy'], detectRange: 40, glowPulse: { base: 0.8, amplitude: 0.5, speed: 3 },
    description: 'A regenerating mass. Burst it before it heals.' },
  { id: 'sprinter', name: 'Sprinter', behavior: 'fastChaser', shape: 'shard', color: 0x4fffd0, accent: 0xffffff, scale: 0.8, orientYaw: true,
    health: 14, speed: 9.5, contactDamage: 6, radius: 0.35, height: 0.9, xp: 1, currency: { min: 0, max: 2, chance: 0.6 }, weight: 7, tier: 2, unlockWave: 6,
    tags: ['ground', 'fast'], detectRange: 55, description: 'A blur of motion. Hard to track, easy to kill.' },
  { id: 'warden', name: 'Warden Drone', behavior: 'strafer', shape: 'drone', color: 0x29e7ff, accent: 0xff3df0, scale: 1, orientYaw: false,
    health: 30, speed: 4.5, contactDamage: 6, radius: 0.45, height: 1.0, xp: 3, currency: { min: 1, max: 3 }, weight: 4, tier: 2, unlockWave: 7,
    tags: ['ground', 'ranged'], detectRange: 55,
    attack: { type: 'ranged', damage: 7, range: 24, cooldown: 1.2, preferredRange: 10, projectile: { speed: 32, color: 0x29e7ff, shape: 'orb', scale: 0.8, radius: 0.18, lifetime: 4 } },
    description: 'A hovering warden that strafes and peppers shots.' },
]);
