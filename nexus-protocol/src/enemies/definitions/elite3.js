// ============================================================================
// elite3.js — More elite-tier enemies: champions, dreadnoughts, and rare
// threats for deep waves.
// ============================================================================

import { EnemyRegistry } from '../EnemyRegistry.js';
import { StatusType, DamageType } from '../../ecs/components/Combat.js';

EnemyRegistry.registerMany([
  { id: 'dreadnought', name: 'Dreadnought', behavior: 'tank', shape: 'tank', color: 0x8a5bff, accent: 0xff3df0, scale: 2.2, orientYaw: true,
    health: 320, shield: 120, armor: 14, speed: 2.0, contactDamage: 24, radius: 1.1, height: 2.8, xp: 22, currency: { min: 8, max: 16 }, weight: 1, tier: 4, unlockWave: 20,
    tags: ['ground', 'heavy', 'armored', 'elite'], detectRange: 40, eliteHealthMult: 1.7,
    attack: { type: 'ranged', damage: 18, range: 32, cooldown: 1.6, preferredRange: 16, projectile: { speed: 30, color: 0x8a5bff, shape: 'orb', scale: 1.4, radius: 0.32, lifetime: 4 } },
    description: 'A shielded dreadnought. The apex of the armored line.' },
  { id: 'archMage', name: 'Arch Mage', behavior: 'shooter', shape: 'humanoid', color: 0xb266ff, accent: 0xff3df0, scale: 1.4, orientYaw: true,
    health: 130, speed: 2.8, contactDamage: 10, radius: 0.6, height: 1.7, xp: 16, currency: { min: 5, max: 10 }, weight: 1, tier: 4, unlockWave: 18,
    tags: ['ground', 'ranged', 'status', 'elite'], detectRange: 60, eliteHealthMult: 1.6,
    attack: { type: 'ranged', damage: 16, range: 44, cooldown: 1.2, preferredRange: 22, projectile: { speed: 36, color: 0xb266ff, shape: 'shard', scale: 1.3, radius: 0.26, lifetime: 5 } },
    contactStatus: { chance: 0.5, type: StatusType.Mark, power: 2 }, description: 'An arch mage that marks and barrages from range.' },
  { id: 'warlock', name: 'Warlock', behavior: 'summoner', shape: 'humanoid', color: 0x66ff44, accent: 0xffe066, scale: 1.3, orientYaw: true,
    health: 110, speed: 2.6, contactDamage: 10, radius: 0.6, height: 1.6, xp: 14, currency: { min: 4, max: 9 }, weight: 1, tier: 4, unlockWave: 17,
    tags: ['ground', 'support', 'summoner', 'elite'], detectRange: 55, eliteHealthMult: 1.6, description: 'A warlock that summons swarmlings en masse.' },
  { id: 'steamRoller', name: 'Steamroller', behavior: 'charger', shape: 'tank', color: 0xff5544, accent: 0xffe066, scale: 1.8, orientYaw: true,
    health: 150, armor: 6, speed: 3.4, contactDamage: 24, radius: 0.9, height: 2.0, xp: 14, currency: { min: 4, max: 9 }, weight: 1, tier: 4, unlockWave: 17,
    tags: ['ground', 'charger', 'heavy', 'elite'], detectRange: 50, eliteHealthMult: 1.7, description: 'A charging steamroller that flattens lines.' },
  { id: 'plasmaTitan', name: 'Plasma Titan', behavior: 'sentry', shape: 'orb', color: 0x29e7ff, accent: 0xff3df0, scale: 1.8, orientYaw: false,
    health: 140, speed: 1.0, contactDamage: 12, radius: 0.9, height: 1.5, flying: true, hoverHeight: 3.5, xp: 15, currency: { min: 5, max: 10 }, weight: 1, tier: 4, unlockWave: 18,
    tags: ['flying', 'ranged', 'burst', 'elite'], detectRange: 60, eliteHealthMult: 1.6,
    attack: { type: 'ranged', damage: 14, range: 44, cooldown: 1.8, preferredRange: 24, projectile: { speed: 40, color: 0x29e7ff, shape: 'orb', scale: 1.2, radius: 0.28, lifetime: 5 } },
    glowPulse: { base: 1.2, amplitude: 0.7, speed: 1.5 }, description: 'A plasma titan saturating the sky with bursts.' },
  { id: 'reaperLord', name: 'Reaper Lord', behavior: 'fastChaser', shape: 'shard', color: 0xff3df0, accent: 0x8a5bff, scale: 1.3, orientYaw: true,
    health: 90, speed: 9.5, contactDamage: 22, radius: 0.5, height: 1.3, flying: true, hoverHeight: 2.0, xp: 14, currency: { min: 4, max: 9 }, weight: 1, tier: 4, unlockWave: 18,
    tags: ['flying', 'fast', 'elite'], detectRange: 60, eliteHealthMult: 1.4, description: 'A reaper lord that closes at terrifying speed.' },
  { id: 'bombardier', name: 'Bombardier', behavior: 'turret', shape: 'orb', color: 0xffb347, accent: 0xff5544, scale: 1.5, orientYaw: false,
    health: 110, speed: 0.5, contactDamage: 8, radius: 0.8, height: 1.3, flying: true, hoverHeight: 6.5, xp: 14, currency: { min: 4, max: 9 }, weight: 1, tier: 4, unlockWave: 19,
    tags: ['flying', 'ranged', 'aoe', 'elite'], detectRange: 65, eliteHealthMult: 1.7,
    attack: { type: 'ranged', damage: 26, range: 60, cooldown: 2.0, preferredRange: 28, projectile: { speed: 24, gravity: 1.4, color: 0xffb347, shape: 'chunky', scale: 1.6, radius: 0.32, lifetime: 5 } },
    description: 'A high-altitude bombardier raining heavy mortars.' },
  { id: 'champion', name: 'Champion', behavior: 'brute', shape: 'humanoid', color: 0xffd24a, accent: 0xff3df0, scale: 2.0, orientYaw: true,
    health: 220, armor: 10, speed: 3.0, contactDamage: 24, radius: 1.0, height: 2.6, xp: 20, currency: { min: 6, max: 12 }, weight: 1, tier: 4, unlockWave: 19,
    tags: ['ground', 'heavy', 'slam', 'elite'], detectRange: 45, eliteHealthMult: 1.7, description: 'A golden champion. The arena\'s gladiator.' },
]);
