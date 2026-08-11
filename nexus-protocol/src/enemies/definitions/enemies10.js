// ============================================================================
// enemies10.js — Additional enemies to push the bestiary past 220.
// ============================================================================

import { EnemyRegistry } from '../EnemyRegistry.js';
import { StatusType, DamageType } from '../../ecs/components/Combat.js';

const E = (def) => EnemyRegistry.register(def);

E({ id: 'frostBrute', name: 'Frost Brute', behavior: 'brute', shape: 'humanoid', color: 0x9fe7ff, accent: 0xffffff, scale: 1.5, orientYaw: true,
  health: 130, speed: 2.8, contactDamage: 18, radius: 0.75, height: 2.0, armor: 4, xp: 8, currency: { min: 3, max: 6 }, weight: 2, tier: 4, unlockWave: 14,
  tags: ['ground', 'heavy', 'slam', 'status'], detectRange: 40, contactStatus: { chance: 0.5, type: StatusType.Freeze, power: 1 }, description: 'A frost brute. Slam freezes the ground.' });
E({ id: 'infernoBrute2', name: 'Inferno Brute', behavior: 'brute', shape: 'humanoid', color: 0xff5522, accent: 0xffe066, scale: 1.5, orientYaw: true,
  health: 130, speed: 3.0, contactDamage: 20, radius: 0.75, height: 2.0, armor: 2, xp: 8, currency: { min: 3, max: 6 }, weight: 2, tier: 4, unlockWave: 14,
  tags: ['ground', 'heavy', 'slam', 'status'], detectRange: 40, contactStatus: { chance: 0.5, type: StatusType.Burn, power: 2 }, description: 'An inferno brute. Slam ignites the ground.' });
E({ id: 'stormBrute', name: 'Storm Brute', behavior: 'brute', shape: 'humanoid', color: 0xffe066, accent: 0x29e7ff, scale: 1.5, orientYaw: true,
  health: 130, speed: 3.0, contactDamage: 20, radius: 0.75, height: 2.0, armor: 3, xp: 8, currency: { min: 3, max: 6 }, weight: 2, tier: 4, unlockWave: 14,
  tags: ['ground', 'heavy', 'slam', 'status'], detectRange: 40, contactStatus: { chance: 0.5, type: StatusType.Shock, power: 1 }, description: 'A storm brute. Slam shocks the ground.' });
E({ id: 'poisonBrute', name: 'Plague Brute', behavior: 'brute', shape: 'humanoid', color: 0x66ff44, accent: 0x223322, scale: 1.5, orientYaw: true,
  health: 130, speed: 2.8, contactDamage: 18, radius: 0.75, height: 2.0, armor: 3, xp: 8, currency: { min: 3, max: 6 }, weight: 2, tier: 4, unlockWave: 14,
  tags: ['ground', 'heavy', 'slam', 'status'], detectRange: 40, contactStatus: { chance: 0.5, type: StatusType.Poison, power: 2 }, description: 'A plague brute. Slam poisons the ground.' });
E({ id: 'frostHound', name: 'Frost Hound', behavior: 'fastChaser', shape: 'walker', color: 0x9fe7ff, accent: 0xffffff, scale: 0.9, orientYaw: true,
  health: 30, speed: 8, contactDamage: 8, radius: 0.45, height: 1.0, xp: 2, currency: { min: 1, max: 2 }, weight: 5, tier: 2, unlockWave: 6,
  tags: ['ground', 'fast', 'status'], detectRange: 55, contactStatus: { chance: 0.3, type: StatusType.Slow, power: 1 }, description: 'A frost hound. Fast and chilling.' });
E({ id: 'emberHound', name: 'Ember Hound', behavior: 'fastChaser', shape: 'walker', color: 0xff5522, accent: 0xffe066, scale: 0.9, orientYaw: true,
  health: 30, speed: 8, contactDamage: 8, radius: 0.45, height: 1.0, xp: 2, currency: { min: 1, max: 2 }, weight: 5, tier: 2, unlockWave: 6,
  tags: ['ground', 'fast', 'status'], detectRange: 55, contactStatus: { chance: 0.3, type: StatusType.Burn, power: 1 }, description: 'An ember hound. Fast and burning.' });
E({ id: 'shockHound', name: 'Shock Hound', behavior: 'fastChaser', shape: 'walker', color: 0xffe066, accent: 0x29e7ff, scale: 0.9, orientYaw: true,
  health: 30, speed: 8, contactDamage: 8, radius: 0.45, height: 1.0, xp: 2, currency: { min: 1, max: 2 }, weight: 5, tier: 2, unlockWave: 6,
  tags: ['ground', 'fast', 'status'], detectRange: 55, contactStatus: { chance: 0.3, type: StatusType.Shock, power: 1 }, description: 'A shock hound. Fast and stunning.' });
E({ id: 'poisonHound', name: 'Venom Hound', behavior: 'fastChaser', shape: 'walker', color: 0x66ff44, accent: 0x223322, scale: 0.9, orientYaw: true,
  health: 30, speed: 8, contactDamage: 8, radius: 0.45, height: 1.0, xp: 2, currency: { min: 1, max: 2 }, weight: 5, tier: 2, unlockWave: 6,
  tags: ['ground', 'fast', 'status'], detectRange: 55, contactStatus: { chance: 0.3, type: StatusType.Poison, power: 1 }, description: 'A venom hound. Fast and poisonous.' });
E({ id: 'frostWisp2', name: 'Frost Wisp', behavior: 'orbiter', shape: 'ghost', color: 0x9fe7ff, accent: 0xffffff, scale: 0.9, orientYaw: false,
  health: 32, speed: 5.0, contactDamage: 8, radius: 0.45, height: 1.1, flying: true, hoverHeight: 2.5, xp: 4, currency: { min: 1, max: 3 }, weight: 3, tier: 3, unlockWave: 11,
  tags: ['flying', 'ranged', 'status'], detectRange: 50, attack: { type: 'ranged', damage: 7, range: 24, cooldown: 1.3, preferredRange: 8, projectile: { speed: 30, color: 0x9fe7ff, shape: 'orb', scale: 0.8, radius: 0.2, lifetime: 4 } }, contactStatus: { chance: 0.5, type: StatusType.Slow, power: 1 }, description: 'An icy wisp that slows on hit.' });
E({ id: 'fireWisp2', name: 'Ember Wisp', behavior: 'orbiter', shape: 'ghost', color: 0xff6633, accent: 0xffe066, scale: 0.9, orientYaw: false,
  health: 32, speed: 5.0, contactDamage: 8, radius: 0.45, height: 1.1, flying: true, hoverHeight: 2.5, xp: 4, currency: { min: 1, max: 3 }, weight: 3, tier: 3, unlockWave: 11,
  tags: ['flying', 'ranged', 'status'], detectRange: 50, attack: { type: 'ranged', damage: 7, range: 24, cooldown: 1.3, preferredRange: 8, projectile: { speed: 30, color: 0xff6633, shape: 'orb', scale: 0.8, radius: 0.2, lifetime: 4 } }, contactStatus: { chance: 0.5, type: StatusType.Burn, power: 1 }, description: 'A burning wisp that ignites on hit.' });
E({ id: 'shockWisp', name: 'Spark Wisp', behavior: 'orbiter', shape: 'ghost', color: 0xffe066, accent: 0x29e7ff, scale: 0.9, orientYaw: false,
  health: 32, speed: 5.0, contactDamage: 8, radius: 0.45, height: 1.1, flying: true, hoverHeight: 2.5, xp: 4, currency: { min: 1, max: 3 }, weight: 3, tier: 3, unlockWave: 11,
  tags: ['flying', 'ranged', 'status'], detectRange: 50, attack: { type: 'ranged', damage: 7, range: 24, cooldown: 1.3, preferredRange: 8, projectile: { speed: 30, color: 0xffe066, shape: 'orb', scale: 0.8, radius: 0.2, lifetime: 4 } }, contactStatus: { chance: 0.5, type: StatusType.Shock, power: 1 }, description: 'A spark wisp that stuns on hit.' });
E({ id: 'poisonWisp', name: 'Toxic Wisp', behavior: 'orbiter', shape: 'ghost', color: 0x66ff44, accent: 0x223322, scale: 0.9, orientYaw: false,
  health: 32, speed: 5.0, contactDamage: 8, radius: 0.45, height: 1.1, flying: true, hoverHeight: 2.5, xp: 4, currency: { min: 1, max: 3 }, weight: 3, tier: 3, unlockWave: 11,
  tags: ['flying', 'ranged', 'status'], detectRange: 50, attack: { type: 'ranged', damage: 7, range: 24, cooldown: 1.3, preferredRange: 8, projectile: { speed: 30, color: 0x66ff44, shape: 'orb', scale: 0.8, radius: 0.2, lifetime: 4 } }, contactStatus: { chance: 0.5, type: StatusType.Poison, power: 1 }, description: 'A toxic wisp that poisons on hit.' });
E({ id: 'frostGiant2', name: 'Frost Giant', behavior: 'brute', shape: 'humanoid', color: 0x9fe7ff, accent: 0xffffff, scale: 2.0, orientYaw: true,
  health: 220, armor: 6, speed: 2.8, contactDamage: 22, radius: 0.95, height: 2.4, xp: 16, currency: { min: 5, max: 10 }, weight: 1, tier: 4, unlockWave: 16,
  tags: ['ground', 'heavy', 'status', 'elite'], detectRange: 40, eliteHealthMult: 1.9, contactStatus: { chance: 0.5, type: StatusType.Freeze, power: 1 }, description: 'A towering frost giant that freezes with its slam.' });
E({ id: 'infernoTitan3', name: 'Inferno Titan', behavior: 'brute', shape: 'humanoid', color: 0xff5522, accent: 0xffe066, scale: 2.0, orientYaw: true,
  health: 220, armor: 4, speed: 3.0, contactDamage: 24, radius: 0.95, height: 2.4, xp: 16, currency: { min: 5, max: 10 }, weight: 1, tier: 4, unlockWave: 16,
  tags: ['ground', 'heavy', 'status', 'elite'], detectRange: 40, eliteHealthMult: 1.9, contactStatus: { chance: 0.5, type: StatusType.Burn, power: 2 }, description: 'A burning titan that ignites everything it pounds.' });
