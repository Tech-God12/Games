// ============================================================================
// enemies8.js — Additional elite & special enemies for deep-wave variety.
// ============================================================================

import { EnemyRegistry } from '../EnemyRegistry.js';
import { StatusType, DamageType } from '../../ecs/components/Combat.js';

const E = (def) => EnemyRegistry.register(def);

E({ id: 'voidKnight', name: 'Void Knight', behavior: 'charger', shape: 'humanoid', color: 0x8a5bff, accent: 0xff3df0, scale: 1.4, orientYaw: true,
  health: 120, speed: 3.6, contactDamage: 18, radius: 0.65, height: 1.7, armor: 6, shield: 40, xp: 10, currency: { min: 3, max: 6 }, weight: 2, tier: 4, unlockWave: 16,
  tags: ['ground', 'charger', 'armored', 'elite'], detectRange: 50, eliteHealthMult: 1.5, resistances: { kinetic: 0.3 }, description: 'A void knight. Charges, resists kinetics, shielded.' });
E({ id: 'emberLord2', name: 'Ember Lord', behavior: 'brute', shape: 'humanoid', color: 0xff5522, accent: 0xffe066, scale: 1.7, orientYaw: true,
  health: 180, speed: 2.8, contactDamage: 20, radius: 0.85, height: 2.2, armor: 4, xp: 14, currency: { min: 4, max: 8 }, weight: 1, tier: 4, unlockWave: 17,
  tags: ['ground', 'heavy', 'slam', 'status', 'elite'], detectRange: 40, eliteHealthMult: 1.5, contactStatus: { chance: 0.6, type: StatusType.Burn, power: 2 }, description: 'An ember lord. Slam ignites the ground.' });
E({ id: 'frostLord2', name: 'Frost Lord', behavior: 'brute', shape: 'humanoid', color: 0x9fe7ff, accent: 0xffffff, scale: 1.7, orientYaw: true,
  health: 180, speed: 2.8, contactDamage: 20, radius: 0.85, height: 2.2, armor: 6, xp: 14, currency: { min: 4, max: 8 }, weight: 1, tier: 4, unlockWave: 17,
  tags: ['ground', 'heavy', 'slam', 'status', 'elite'], detectRange: 40, eliteHealthMult: 1.5, contactStatus: { chance: 0.6, type: StatusType.Freeze, power: 1 }, description: 'A frost lord. Slam freezes the ground.' });
E({ id: 'stormLord3', name: 'Storm Lord', behavior: 'brute', shape: 'humanoid', color: 0xffe066, accent: 0x29e7ff, scale: 1.7, orientYaw: true,
  health: 180, speed: 3.0, contactDamage: 20, radius: 0.85, height: 2.2, armor: 4, xp: 14, currency: { min: 4, max: 8 }, weight: 1, tier: 4, unlockWave: 17,
  tags: ['ground', 'heavy', 'slam', 'status', 'elite'], detectRange: 40, eliteHealthMult: 1.5, contactStatus: { chance: 0.6, type: StatusType.Shock, power: 1 }, description: 'A storm lord. Slam shocks the ground.' });
E({ id: 'plagueLord2', name: 'Plague Lord', behavior: 'shooter', shape: 'humanoid', color: 0x66ff44, accent: 0x223322, scale: 1.5, orientYaw: true,
  health: 140, speed: 2.6, contactDamage: 14, radius: 0.65, height: 1.7, xp: 12, currency: { min: 4, max: 8 }, weight: 1, tier: 4, unlockWave: 16,
  tags: ['ground', 'ranged', 'status', 'elite'], detectRange: 55, eliteHealthMult: 1.4,
  attack: { type: 'ranged', damage: 12, range: 32, cooldown: 1.4, preferredRange: 16, projectile: { speed: 30, color: 0x66ff44, shape: 'orb', scale: 1.2, radius: 0.26, lifetime: 4 } },
  contactStatus: { chance: 0.6, type: StatusType.Poison, power: 2 }, description: 'A plague lord barraging poison orbs.' });
E({ id: 'bloodLord', name: 'Blood Lord', behavior: 'fastChaser', shape: 'humanoid', color: 0xff3df0, accent: 0x8a5bff, scale: 1.4, orientYaw: true,
  health: 130, speed: 7.5, contactDamage: 20, radius: 0.6, height: 1.6, xp: 12, currency: { min: 4, max: 8 }, weight: 1, tier: 4, unlockWave: 17,
  tags: ['ground', 'fast', 'elite'], detectRange: 55, eliteHealthMult: 1.3, contactStatus: { chance: 0.5, type: StatusType.Bleed, power: 2 }, description: 'A blood lord. Fast, bleeds, relentless.' });
E({ id: 'mirrorLord', name: 'Mirror Lord', behavior: 'dodger', shape: 'ghost', color: 0xffffff, accent: 0x29e7ff, scale: 1.4, orientYaw: false,
  health: 110, speed: 6.5, contactDamage: 16, radius: 0.6, height: 1.5, flying: true, hoverHeight: 2.2, xp: 12, currency: { min: 4, max: 8 }, weight: 1, tier: 4, unlockWave: 17,
  tags: ['flying', 'evasive', 'ranged', 'elite'], detectRange: 60, resistances: { kinetic: 0.5, energy: 0.3 }, eliteHealthMult: 1.3,
  attack: { type: 'ranged', damage: 14, range: 30, cooldown: 1.2, preferredRange: 16, projectile: { speed: 42, color: 0xffffff, shape: 'shard', scale: 1.1, radius: 0.22, lifetime: 4 } },
  description: 'A mirror lord. Reflects kinetics, dodges, barrages.' });
E({ id: 'dreadnought2', name: 'Dreadnought', behavior: 'tank', shape: 'tank', color: 0x5577aa, accent: 0xff3df0, scale: 1.8, orientYaw: true,
  health: 300, armor: 14, shield: 80, speed: 2.0, contactDamage: 24, radius: 1.0, height: 2.6, xp: 18, currency: { min: 6, max: 12 }, weight: 1, tier: 4, unlockWave: 18,
  tags: ['ground', 'heavy', 'armored', 'elite'], detectRange: 40, eliteHealthMult: 1.5,
  attack: { type: 'ranged', damage: 18, range: 32, cooldown: 1.6, preferredRange: 16, projectile: { speed: 30, color: 0x5577aa, shape: 'orb', scale: 1.4, radius: 0.32, lifetime: 4 } },
  description: 'A dreadnought. Shielded, armored, cannon-armed.' });
E({ id: 'shadowReaper', name: 'Shadow Reaper', behavior: 'kamikaze', shape: 'ghost', color: 0x000000, accent: 0x8a5bff, scale: 1.2, orientYaw: false,
  health: 60, speed: 10, contactDamage: 30, radius: 0.5, height: 1.3, flying: true, hoverHeight: 2.0, xp: 10, currency: { min: 3, max: 6 }, weight: 1, tier: 4, unlockWave: 18,
  tags: ['flying', 'fast', 'suicide', 'elite'], detectRange: 55, eliteHealthMult: 1.2, description: 'A shadow reaper. Phases in fast and detonates.' });
E({ id: 'warden3', name: 'Warden', behavior: 'shielder', shape: 'humanoid', color: 0x4aa3ff, accent: 0xffffff, scale: 1.5, orientYaw: true,
  health: 140, speed: 2.8, contactDamage: 12, radius: 0.7, height: 1.8, armor: 8, shield: 60, xp: 12, currency: { min: 4, max: 8 }, weight: 1, tier: 4, unlockWave: 17,
  tags: ['ground', 'support', 'armored', 'elite'], detectRange: 45, eliteHealthMult: 1.4, description: 'A warden. Shields itself and armors allies.' });
E({ id: 'archmage2', name: 'Archmage', behavior: 'shooter', shape: 'humanoid', color: 0xb266ff, accent: 0xff3df0, scale: 1.4, orientYaw: true,
  health: 130, speed: 2.8, contactDamage: 12, radius: 0.6, height: 1.7, xp: 16, currency: { min: 5, max: 10 }, weight: 1, tier: 4, unlockWave: 18,
  tags: ['ground', 'ranged', 'status', 'elite'], detectRange: 60, eliteHealthMult: 1.4,
  attack: { type: 'ranged', damage: 16, range: 44, cooldown: 1.2, preferredRange: 22, projectile: { speed: 38, color: 0xb266ff, shape: 'shard', scale: 1.3, radius: 0.26, lifetime: 5 } },
  contactStatus: { chance: 0.5, type: StatusType.Mark, power: 2 }, description: 'An archmage. Barrages and marks from range.' });
E({ id: 'reaver3', name: 'Reaper Lord', behavior: 'fastChaser', shape: 'shard', color: 0xff3df0, accent: 0x8a5bff, scale: 1.3, orientYaw: true,
  health: 100, speed: 9.5, contactDamage: 22, radius: 0.5, height: 1.3, flying: true, hoverHeight: 2.0, xp: 14, currency: { min: 4, max: 9 }, weight: 1, tier: 4, unlockWave: 18,
  tags: ['flying', 'fast', 'elite'], detectRange: 60, eliteHealthMult: 1.2, description: 'A reaper lord. Closes at terrifying speed.' });
