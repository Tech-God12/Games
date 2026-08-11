// ============================================================================
// ground5.js — Additional ground enemies: more chasers, walkers, and hybrids
// to fill out the bestiary across all wave ranges.
// ============================================================================

import { EnemyRegistry } from '../EnemyRegistry.js';
import { StatusType, DamageType } from '../../ecs/components/Combat.js';

const E = (def) => EnemyRegistry.register(def);

E({ id: 'stalker3', name: 'Stalker', behavior: 'fastChaser', shape: 'walker', color: 0x8866ff, accent: 0x222222, scale: 1, orientYaw: true,
  health: 30, speed: 7.0, contactDamage: 10, radius: 0.5, height: 1.1, xp: 3, currency: { min: 1, max: 3 }, weight: 5, tier: 2, unlockWave: 6,
  tags: ['ground', 'fast'], detectRange: 55, description: 'A relentless stalker that closes fast.' });
E({ id: 'gunRunner', name: 'Gun Runner', behavior: 'fastChaser', shape: 'humanoid', color: 0xff8844, accent: 0xffe066, scale: 0.9, orientYaw: true,
  health: 26, speed: 7.5, contactDamage: 8, radius: 0.45, height: 1.1, xp: 3, currency: { min: 1, max: 3 }, weight: 5, tier: 2, unlockWave: 6,
  tags: ['ground', 'fast'], detectRange: 55, description: 'A gun runner. Fast, light, expendable.' });
E({ id: 'plated2', name: 'Plated Walker', behavior: 'chaser', shape: 'walker', color: 0x9fb3d6, accent: 0xff3df0, scale: 1.1, orientYaw: true,
  health: 70, speed: 3.2, contactDamage: 12, radius: 0.55, height: 1.4, armor: 6, xp: 4, currency: { min: 2, max: 4 }, weight: 3, tier: 3, unlockWave: 9,
  tags: ['ground', 'armored'], detectRange: 45, description: 'A plated walker. Slow, armored, durable.' });
E({ id: 'venomCrawler', name: 'Venom Crawler', behavior: 'chaser', shape: 'spider', color: 0x66ff44, accent: 0x223322, scale: 0.9, orientYaw: true,
  health: 28, speed: 5.6, contactDamage: 8, radius: 0.45, height: 0.8, xp: 2, currency: { min: 1, max: 2 }, weight: 5, tier: 2, unlockWave: 6,
  tags: ['ground', 'status'], detectRange: 45, contactStatus: { chance: 0.3, type: StatusType.Poison, power: 1 }, description: 'A venom crawler. Poisons on touch.' });
E({ id: 'shockCrawler', name: 'Shock Crawler', behavior: 'chaser', shape: 'spider', color: 0xffe066, accent: 0x222222, scale: 0.9, orientYaw: true,
  health: 28, speed: 5.6, contactDamage: 8, radius: 0.45, height: 0.8, xp: 2, currency: { min: 1, max: 2 }, weight: 5, tier: 2, unlockWave: 6,
  tags: ['ground', 'status'], detectRange: 45, contactStatus: { chance: 0.3, type: StatusType.Shock, power: 1 }, description: 'A shock crawler. Stuns on touch.' });
E({ id: 'frostCrawler', name: 'Frost Crawler', behavior: 'chaser', shape: 'spider', color: 0x9fe7ff, accent: 0x222222, scale: 0.9, orientYaw: true,
  health: 28, speed: 5.6, contactDamage: 8, radius: 0.45, height: 0.8, xp: 2, currency: { min: 1, max: 2 }, weight: 5, tier: 2, unlockWave: 6,
  tags: ['ground', 'status'], detectRange: 45, contactStatus: { chance: 0.3, type: StatusType.Slow, power: 1 }, description: 'A frost crawler. Slows on touch.' });
E({ id: 'fireCrawler', name: 'Fire Crawler', behavior: 'chaser', shape: 'spider', color: 0xff5522, accent: 0x222222, scale: 0.9, orientYaw: true,
  health: 28, speed: 5.6, contactDamage: 8, radius: 0.45, height: 0.8, xp: 2, currency: { min: 1, max: 2 }, weight: 5, tier: 2, unlockWave: 6,
  tags: ['ground', 'status'], detectRange: 45, contactStatus: { chance: 0.3, type: StatusType.Burn, power: 1 }, description: 'A fire crawler. Ignites on touch.' });
E({ id: 'gunWalker', name: 'Gun Walker', behavior: 'shooter', shape: 'walker', color: 0x5577aa, accent: 0xff3df0, scale: 1.1, orientYaw: true,
  health: 50, speed: 3.0, contactDamage: 8, radius: 0.55, height: 1.3, xp: 4, currency: { min: 2, max: 4 }, weight: 3, tier: 3, unlockWave: 9,
  tags: ['ground', 'ranged'], detectRange: 55,
  attack: { type: 'ranged', damage: 9, range: 28, cooldown: 1.5, preferredRange: 12, projectile: { speed: 32, color: 0x5577aa, shape: 'orb', scale: 1, radius: 0.22, lifetime: 4 } },
  description: 'A gun walker. Armored quadruped with a turret.' });
E({ id: 'leaper2', name: 'Leaper', behavior: 'charger', shape: 'spider', color: 0xff66ff, accent: 0x222222, scale: 1, orientYaw: true,
  health: 38, speed: 4.8, contactDamage: 14, radius: 0.5, height: 0.9, xp: 4, currency: { min: 1, max: 3 }, weight: 3, tier: 3, unlockWave: 8,
  tags: ['ground', 'fast', 'charger'], detectRange: 50, description: 'A leaping spider that pounces in bursts.' });
E({ id: 'bruiser', name: 'Bruiser', behavior: 'chaser', shape: 'humanoid', color: 0xff5544, accent: 0xffe066, scale: 1.3, orientYaw: true,
  health: 80, speed: 3.4, contactDamage: 14, radius: 0.65, height: 1.7, armor: 3, xp: 5, currency: { min: 2, max: 4 }, weight: 3, tier: 3, unlockWave: 9,
  tags: ['ground', 'heavy'], detectRange: 45, description: 'A bruiser. Tough, slow, hits hard.' });
E({ id: 'rusher', name: 'Rusher', behavior: 'fastChaser', shape: 'shard', color: 0x29e7ff, accent: 0xffffff, scale: 0.8, orientYaw: true,
  health: 18, speed: 8.5, contactDamage: 7, radius: 0.4, height: 0.9, xp: 2, currency: { min: 1, max: 2 }, weight: 6, tier: 2, unlockWave: 5,
  tags: ['ground', 'fast'], detectRange: 55, description: 'A rusher. Closes distance at alarming speed.' });
E({ id: 'sentinel2', name: 'Sentinel Walker', behavior: 'shooter', shape: 'walker', color: 0x29e7ff, accent: 0xff3df0, scale: 1.2, orientYaw: true,
  health: 60, speed: 2.8, contactDamage: 8, radius: 0.6, height: 1.5, armor: 4, xp: 5, currency: { min: 2, max: 4 }, weight: 2, tier: 3, unlockWave: 10,
  tags: ['ground', 'ranged', 'armored'], detectRange: 55,
  attack: { type: 'ranged', damage: 10, range: 32, cooldown: 1.4, preferredRange: 16, projectile: { speed: 34, color: 0x29e7ff, shape: 'orb', scale: 1.1, radius: 0.24, lifetime: 4 } },
  description: 'A sentinel walker. Armored fire support.' });
E({ id: 'grenadier', name: 'Grenadier', behavior: 'shotgunner', shape: 'humanoid', color: 0xff7733, accent: 0xffe066, scale: 1, orientYaw: true,
  health: 44, speed: 2.8, contactDamage: 8, radius: 0.5, height: 1.4, xp: 4, currency: { min: 1, max: 3 }, weight: 3, tier: 3, unlockWave: 8,
  tags: ['ground', 'ranged', 'spread'], detectRange: 50,
  attack: { type: 'ranged', damage: 6, range: 18, cooldown: 2.0, preferredRange: 8, projectile: { speed: 26, color: 0xff7733, shape: 'orb', scale: 0.9, radius: 0.2, lifetime: 3 } },
  description: 'A grenadier. Lobs spread bursts up close.' });
E({ id: 'saboteur', name: 'Saboteur', behavior: 'bomber', shape: 'humanoid', color: 0x66ff88, accent: 0xffe066, scale: 1, orientYaw: true,
  health: 32, speed: 5.5, contactDamage: 26, radius: 0.5, height: 1.2, xp: 4, currency: { min: 1, max: 3 }, weight: 3, tier: 3, unlockWave: 8,
  tags: ['ground', 'suicide', 'explosive'], detectRange: 45, description: 'A saboteur. Sprints in and detonates.' });
E({ id: 'warden3', name: 'Warden Bot', behavior: 'shielder', shape: 'humanoid', color: 0x4aa3ff, accent: 0xffffff, scale: 1.2, orientYaw: true,
  health: 60, speed: 2.8, contactDamage: 8, radius: 0.6, height: 1.5, armor: 4, xp: 5, currency: { min: 2, max: 4 }, weight: 2, tier: 3, unlockWave: 10,
  tags: ['ground', 'support', 'armored'], detectRange: 45, description: 'A warden bot projecting armor to allies.' });
