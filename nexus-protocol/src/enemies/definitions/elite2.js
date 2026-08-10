// ============================================================================
// elite2.js — Elite-tier enemies with high stats and special tags. These
// appear as elite spawns or in late waves and demand focused fire.
// ============================================================================

import { EnemyRegistry } from '../EnemyRegistry.js';
import { StatusType, DamageType } from '../../ecs/components/Combat.js';

EnemyRegistry.registerMany([
  { id: 'titanWalker', name: 'Titan Walker', behavior: 'tank', shape: 'walker', color: 0xff5544, accent: 0xffe066, scale: 2.2, orientYaw: true,
    health: 180, armor: 8, speed: 2.4, contactDamage: 18, radius: 1.0, height: 2.6, xp: 12, currency: { min: 4, max: 8 }, weight: 1, tier: 4, unlockWave: 14,
    tags: ['ground', 'heavy', 'armored', 'elite'], detectRange: 40, eliteHealthMult: 2.0,
    attack: { type: 'ranged', damage: 14, range: 28, cooldown: 1.6, preferredRange: 14, projectile: { speed: 28, color: 0xff5544, shape: 'orb', scale: 1.4, radius: 0.3, lifetime: 4 } },
    description: 'A quadrupedal titan. Armored, relentless, and loud.' },
  { id: 'plasmaLord', name: 'Plasma Lord', behavior: 'sentry', shape: 'orb', color: 0x29e7ff, accent: 0xff3df0, scale: 1.8, orientYaw: false,
    health: 120, speed: 1.0, contactDamage: 10, radius: 0.9, height: 1.4, flying: true, hoverHeight: 3.5, xp: 12, currency: { min: 4, max: 8 }, weight: 1, tier: 4, unlockWave: 15,
    tags: ['flying', 'ranged', 'burst', 'elite'], detectRange: 60, eliteHealthMult: 1.8,
    attack: { type: 'ranged', damage: 12, range: 40, cooldown: 2.0, preferredRange: 22, projectile: { speed: 40, color: 0x29e7ff, shape: 'orb', scale: 1.2, radius: 0.26, lifetime: 5 } },
    glowPulse: { base: 1.2, amplitude: 0.7, speed: 1.5 }, description: 'A plasma lord that saturates the arena with bursts.' },
  { id: 'frostGiant', name: 'Frost Giant', behavior: 'brute', shape: 'humanoid', color: 0x9fe7ff, accent: 0xffffff, scale: 2.0, orientYaw: true,
    health: 160, armor: 6, speed: 2.8, contactDamage: 18, radius: 0.9, height: 2.4, xp: 12, currency: { min: 4, max: 8 }, weight: 1, tier: 4, unlockWave: 16,
    tags: ['ground', 'heavy', 'status', 'elite'], detectRange: 40, eliteHealthMult: 1.9,
    contactStatus: { chance: 0.5, type: StatusType.Freeze, power: 1 }, description: 'A towering frost giant that freezes with its slam.' },
  { id: 'infernoBrute', name: 'Inferno Brute', behavior: 'brute', shape: 'humanoid', color: 0xff5522, accent: 0xffe066, scale: 2.0, orientYaw: true,
    health: 160, armor: 4, speed: 3.0, contactDamage: 20, radius: 0.9, height: 2.4, xp: 12, currency: { min: 4, max: 8 }, weight: 1, tier: 4, unlockWave: 16,
    tags: ['ground', 'heavy', 'status', 'elite'], detectRange: 40, eliteHealthMult: 1.9,
    contactStatus: { chance: 0.5, type: StatusType.Burn, power: 2 }, description: 'A burning brute that ignites everything it pounds.' },
  { id: 'voidAssassin', name: 'Void Assassin', behavior: 'dodger', shape: 'ghost', color: 0x8a5bff, accent: 0xff3df0, scale: 1.2, orientYaw: false,
    health: 70, speed: 7.0, contactDamage: 14, radius: 0.5, height: 1.3, flying: true, hoverHeight: 2.2, xp: 10, currency: { min: 3, max: 6 }, weight: 2, tier: 4, unlockWave: 15,
    tags: ['flying', 'evasive', 'ranged', 'elite'], detectRange: 60, resistances: { kinetic: 0.5, energy: 0.2 }, eliteHealthMult: 1.5,
    attack: { type: 'ranged', damage: 14, range: 30, cooldown: 1.2, preferredRange: 16, projectile: { speed: 44, color: 0x8a5bff, shape: 'shard', scale: 1, radius: 0.2, lifetime: 4 } },
    description: 'A void-touched assassin that dodges and resists kinetics.' },
  { id: 'warDrone', name: 'War Drone', behavior: 'orbiter', shape: 'drone', color: 0xffb347, accent: 0xff3df0, scale: 1.4, orientYaw: false,
    health: 90, speed: 5.0, contactDamage: 12, radius: 0.6, height: 1.0, flying: true, hoverHeight: 3.0, xp: 9, currency: { min: 3, max: 6 }, weight: 2, tier: 4, unlockWave: 14,
    tags: ['flying', 'ranged', 'elite'], detectRange: 55, eliteHealthMult: 1.6,
    attack: { type: 'ranged', damage: 11, range: 28, cooldown: 1.0, preferredRange: 8, projectile: { speed: 34, color: 0xffb347, shape: 'orb', scale: 1, radius: 0.22, lifetime: 4 } },
    glowPulse: { base: 1, amplitude: 0.6, speed: 2 }, description: 'An elite war drone that orbits and barrages.' },
  { id: 'plague', name: 'Plague', behavior: 'shooter', shape: 'blob', color: 0x66ff44, accent: 0x223322, scale: 1.4, orientYaw: false,
    health: 100, speed: 2.6, contactDamage: 12, radius: 0.7, height: 1.3, xp: 10, currency: { min: 3, max: 6 }, weight: 2, tier: 4, unlockWave: 15,
    tags: ['ground', 'ranged', 'status', 'elite'], detectRange: 50, eliteHealthMult: 1.7,
    attack: { type: 'ranged', damage: 8, range: 26, cooldown: 1.4, preferredRange: 12, projectile: { speed: 24, color: 0x66ff44, shape: 'orb', scale: 1.1, radius: 0.26, lifetime: 4 } },
    contactStatus: { chance: 0.5, type: StatusType.Poison, power: 2 }, description: 'A plague mass that poisons on hit.' },
  { id: 'colossus', name: 'Colossus', behavior: 'tank', shape: 'tank', color: 0x5577aa, accent: 0xff3df0, scale: 2.0, orientYaw: true,
    health: 260, armor: 14, shield: 80, speed: 2.0, contactDamage: 22, radius: 1.1, height: 2.8, xp: 18, currency: { min: 6, max: 12 }, weight: 1, tier: 4, unlockWave: 18,
    tags: ['ground', 'heavy', 'armored', 'elite'], detectRange: 40, eliteHealthMult: 1.8,
    attack: { type: 'ranged', damage: 18, range: 32, cooldown: 1.8, preferredRange: 16, projectile: { speed: 30, color: 0xff3df0, shape: 'orb', scale: 1.4, radius: 0.32, lifetime: 4 } },
    description: 'A walking fortress with shields and heavy armor. The tank of tanks.' },
]);
