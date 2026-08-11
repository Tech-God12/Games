// ============================================================================
// ground4.js — Yet more ground enemies: elemental specialists & swarm hybrids.
// ============================================================================

import { EnemyRegistry } from '../EnemyRegistry.js';
import { StatusType, DamageType } from '../../ecs/components/Combat.js';

EnemyRegistry.registerMany([
  { id: 'fireArcher', name: 'Fire Archer', behavior: 'sniper', shape: 'humanoid', color: 0xff5522, accent: 0xffe066, scale: 1, orientYaw: true,
    health: 36, speed: 2.4, contactDamage: 8, radius: 0.5, height: 1.5, xp: 5, currency: { min: 1, max: 3 }, weight: 3, tier: 3, unlockWave: 10,
    tags: ['ground', 'ranged', 'status', 'precision'], detectRange: 60,
    attack: { type: 'ranged', damage: 14, range: 48, cooldown: 2.6, preferredRange: 22, projectile: { speed: 50, color: 0xff5522, shape: 'shard', scale: 1.1, radius: 0.2, lifetime: 4 } },
    contactStatus: { chance: 0.4, type: StatusType.Burn, power: 1 }, description: 'A long-range archer firing burning arrows.' },
  { id: 'iceArcher', name: 'Ice Archer', behavior: 'sniper', shape: 'humanoid', color: 0x9fe7ff, accent: 0xffffff, scale: 1, orientYaw: true,
    health: 36, speed: 2.4, contactDamage: 8, radius: 0.5, height: 1.5, xp: 5, currency: { min: 1, max: 3 }, weight: 3, tier: 3, unlockWave: 10,
    tags: ['ground', 'ranged', 'status', 'precision'], detectRange: 60,
    attack: { type: 'ranged', damage: 12, range: 48, cooldown: 2.6, preferredRange: 22, projectile: { speed: 50, color: 0x9fe7ff, shape: 'shard', scale: 1.1, radius: 0.2, lifetime: 4 } },
    contactStatus: { chance: 0.4, type: StatusType.Slow, power: 1 }, description: 'A long-range archer firing chilling arrows.' },
  { id: 'shockLancer', name: 'Shock Lancer', behavior: 'charger', shape: 'humanoid', color: 0xffe066, accent: 0x29e7ff, scale: 1.1, orientYaw: true,
    health: 60, speed: 4.0, contactDamage: 16, radius: 0.55, height: 1.5, armor: 2, xp: 5, currency: { min: 2, max: 4 }, weight: 3, tier: 3, unlockWave: 11,
    tags: ['ground', 'charger', 'status'], detectRange: 50, contactStatus: { chance: 0.4, type: StatusType.Shock, power: 1 }, description: 'A shock lancer that charges and stuns.' },
  { id: 'gunSwarmer', name: 'Gun Swarmer', behavior: 'swarm', shape: 'swarm', color: 0xff8844, accent: 0xffffff, scale: 0.8, orientYaw: false,
    health: 14, speed: 7.5, contactDamage: 5, radius: 0.35, height: 0.7, xp: 2, currency: { min: 0, max: 2, chance: 0.6 }, weight: 6, tier: 2, unlockWave: 7,
    tags: ['ground', 'fast', 'swarm'], detectRange: 45, description: 'A gun-toting swarmer. Reckless and fast.' },
  { id: 'shieldMaiden', name: 'Shield Maiden', behavior: 'shielder', shape: 'humanoid', color: 0x29e7ff, accent: 0xffffff, scale: 1.1, orientYaw: true,
    health: 70, speed: 3.0, contactDamage: 10, radius: 0.6, height: 1.6, armor: 4, xp: 6, currency: { min: 2, max: 4 }, weight: 2, tier: 3, unlockWave: 12,
    tags: ['ground', 'support', 'armored'], detectRange: 45, description: 'A shield maiden projecting armor to nearby allies.' },
  { id: 'medic', name: 'Medic', behavior: 'healer', shape: 'humanoid', color: 0x4fd07a, accent: 0xffffff, scale: 1, orientYaw: true,
    health: 50, speed: 3.4, contactDamage: 6, radius: 0.5, height: 1.5, xp: 6, currency: { min: 2, max: 4 }, weight: 2, tier: 3, unlockWave: 12,
    tags: ['ground', 'support'], detectRange: 50, description: 'A combat medic healing the front line.' },
  { id: 'sapper', name: 'Sapper', behavior: 'bomber', shape: 'walker', color: 0xff5522, accent: 0xffe066, scale: 1, orientYaw: true,
    health: 30, speed: 5.0, contactDamage: 26, radius: 0.5, height: 1.2, xp: 4, currency: { min: 1, max: 3 }, weight: 3, tier: 3, unlockWave: 9,
    tags: ['ground', 'suicide', 'explosive'], detectRange: 45, description: 'A sapper that sprints in and detonates.' },
  { id: 'gunPhalanx', name: 'Phalanx', behavior: 'turret', shape: 'humanoid', color: 0x5577aa, accent: 0xff3df0, scale: 1.2, orientYaw: true,
    health: 100, speed: 0.6, contactDamage: 8, radius: 0.7, height: 1.7, armor: 8, shield: 30, xp: 7, currency: { min: 2, max: 5 }, weight: 2, tier: 4, unlockWave: 14,
    tags: ['ground', 'ranged', 'armored'], detectRange: 50,
    attack: { type: 'ranged', damage: 10, range: 34, cooldown: 1.0, preferredRange: 20, projectile: { speed: 36, color: 0xff3df0, shape: 'orb', scale: 1, radius: 0.22, lifetime: 4 } },
    description: 'A shielded phalanx. Suppresses from behind a wall of armor.' },
  { id: 'stalker2', name: 'Night Stalker', behavior: 'fastChaser', shape: 'spider', color: 0x8a5bff, accent: 0x222222, scale: 1.1, orientYaw: true,
    health: 40, speed: 7.0, contactDamage: 12, radius: 0.5, height: 0.9, xp: 4, currency: { min: 1, max: 3 }, weight: 3, tier: 3, unlockWave: 10,
    tags: ['ground', 'fast'], detectRange: 55, resistances: { energy: 0.3 }, description: 'A nocturnal stalker resistant to energy.' },
  { id: 'ironCrawler', name: 'Iron Crawler', behavior: 'chaser', shape: 'spider', color: 0x9fb3d6, accent: 0xff3df0, scale: 1.2, orientYaw: true,
    health: 75, speed: 4.0, contactDamage: 12, radius: 0.6, height: 1.0, armor: 5, xp: 5, currency: { min: 2, max: 4 }, weight: 3, tier: 3, unlockWave: 11,
    tags: ['ground', 'armored'], detectRange: 45, description: 'An armored crawler. Slow but durable.' },
]);
