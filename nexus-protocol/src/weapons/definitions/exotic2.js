// ============================================================================
// exotic2.js — More exotic/special weapons with unique mechanics: orbs that
// orbit, rebound blades, beam-scatter hybrids, time/dimensional tricks.
// ============================================================================

import { WeaponRegistry } from '../WeaponRegistry.js';
import { FireMode, WeaponRarity } from '../Weapon.js';
import { DamageType, StatusType } from '../../ecs/components/Combat.js';

WeaponRegistry.registerMany([
  { id: 'orbWalker', name: 'Orb Weaver', category: 'special', rarity: WeaponRarity.Epic,
    fireMode: FireMode.Projectile, auto: false, damage: 30, damageType: DamageType.Energy, fireRate: 1.6, magazine: 6, reserveMax: 36, reloadTime: 2.0,
    spread: 0.0, range: 40, critChance: 0.1, critMult: 2.0, canHeadshot: true, knockback: 4, recoil: 1.2, screenShake: 0.08, sfx: 'shoot_plasma',
    projectile: { speed: 18, gravity: 0, lifetime: 4, color: 0x4fffd0, radius: 0.3, shape: 'orb', scale: 1.4, homing: 0.8, pierce: 3, glow: true, trail: true },
    viewmodel: { color: 0x223044, accent: 0x4fffd0, length: 0.6, shape: 'energy' }, projectileColor: 0x4fffd0, impactColor: 0x4fffd0,
    description: 'Slow homing orbs that weave through crowds, piercing as they go.', price: 440, unlockWave: 9, tags: ['homing', 'pierce', 'special'] },
  { id: 'reboundBlade', name: 'Rebound Blade', category: 'melee', rarity: WeaponRarity.Epic,
    fireMode: FireMode.Projectile, auto: false, damage: 55, damageType: DamageType.Kinetic, fireRate: 1.2, magazine: 1, reserveMax: 0, reloadTime: 0,
    spread: 0.0, range: 28, critChance: 0.2, critMult: 2.4, canHeadshot: true, knockback: 10, recoil: 1.0, screenShake: 0.1, sfx: 'shoot_lightning',
    projectile: { speed: 34, gravity: 0, lifetime: 2.2, color: 0xffe066, radius: 0.28, shape: 'ring', scale: 1.3, pierce: 99, ricochet: 4, glow: true, trail: true },
    viewmodel: { color: 0x223044, accent: 0xffe066, length: 0.6, shape: 'blade' }, projectileColor: 0xffe066, impactColor: 0xffe066,
    lifesteal: 0.08, description: 'Hurls a ricocheting blade that bounces between enemies.', price: 420, unlockWave: 8, tags: ['pierce', 'ricochet', 'special', 'lifesteal'] },
  { id: 'beamScatter', name: 'Prism Burst', category: 'energy', rarity: WeaponRarity.Epic,
    fireMode: FireMode.Beam, auto: false, damage: 24, damageType: DamageType.Energy, fireRate: 1.4, magazine: 16, reserveMax: 96, reloadTime: 1.8,
    spread: 0.05, range: 30, critChance: 0.1, critMult: 2.0, canHeadshot: false, pellets: 5, knockback: 4, recoil: 1.6, screenShake: 0.1, sfx: 'shoot_laser',
    beam: { width: 0.08, tickRate: 0.12, color: 0xff3df0 }, viewmodel: { color: 0x223044, accent: 0xff3df0, length: 0.6, shape: 'energy' },
    tracerColor: 0xff3df0, impactColor: 0xff3df0, description: 'A prismatic beam-cannon that fires a fan of beams per shot.',
    price: 440, unlockWave: 9, tags: ['beam', 'spread', 'crowd'] },
  { id: 'chronoPistol', name: 'Chrono Pistol', category: 'sidearm', rarity: WeaponRarity.Legendary,
    fireMode: FireMode.Hitscan, auto: false, damage: 40, damageType: DamageType.Energy, fireRate: 2.5, magazine: 12, reserveMax: 96, reloadTime: 1.4,
    spread: 0.004, range: 60, critChance: 0.2, critMult: 2.4, canHeadshot: true, headshotMult: 2.0, knockback: 6, recoil: 1.2, screenShake: 0.08, sfx: 'shoot_laser',
    viewmodel: { color: 0x223044, accent: 0x29e7ff, length: 0.5, shape: 'pistol' }, tracerColor: 0x29e7ff, impactColor: 0x29e7ff,
    statusChance: 0.4, statusType: StatusType.Slow, statusPower: 2, statusDuration: 2,
    description: 'A sidearm that fires chrono-rounds, slowing time for the target.', price: 580, unlockWave: 11, tags: ['precision', 'control', 'special'] },
  { id: 'dimensionRifle', name: 'Phase Rifle', category: 'rifle', rarity: WeaponRarity.Legendary,
    fireMode: FireMode.Hitscan, auto: true, damage: 24, damageType: DamageType.Energy, fireRate: 7, magazine: 24, reserveMax: 168, reloadTime: 1.8,
    spread: 0.006, range: 60, critChance: 0.14, critMult: 2.2, canHeadshot: true, knockback: 3, recoil: 1.0, screenShake: 0.05, sfx: 'shoot_laser',
    viewmodel: { color: 0x1a1030, accent: 0x8a5bff, length: 0.7, shape: 'rifle' }, tracerColor: 0x8a5bff, impactColor: 0x8a5bff,
    statusChance: 0.3, statusType: StatusType.Mark, statusPower: 2, statusDuration: 3, projectile: { pierce: 2 },
    description: 'Phased rounds that pierce cover and mark targets for death.', price: 620, unlockWave: 12, tags: ['auto', 'pierce', 'special'] },
  { id: 'sawLauncher', name: 'Saw Launcher', category: 'heavy', rarity: WeaponRarity.Epic,
    fireMode: FireMode.Projectile, auto: false, damage: 18, damageType: DamageType.Kinetic, fireRate: 3, magazine: 8, reserveMax: 48, reloadTime: 2.0,
    spread: 0.0, range: 30, critChance: 0.05, critMult: 1.8, canHeadshot: false, knockback: 4, recoil: 1.0, screenShake: 0.06, sfx: 'shoot_rifle',
    projectile: { speed: 30, gravity: 0.2, lifetime: 2, color: 0x9fb3d6, radius: 0.3, shape: 'ring', scale: 1.2, pierce: 99, ricochet: 6, glow: false, trail: true },
    viewmodel: { color: 0x223044, accent: 0x9fb3d6, length: 0.6, shape: 'launcher' }, projectileColor: 0x9fb3d6, impactColor: 0x9fb3d6,
    description: 'Fires ricocheting sawblades that chew through lines.', price: 420, unlockWave: 9, tags: ['pierce', 'ricochet', 'special'] },
  { id: 'mirrorGun', name: 'Mirror Gun', category: 'energy', rarity: WeaponRarity.Legendary,
    fireMode: FireMode.Projectile, auto: true, damage: 16, damageType: DamageType.Energy, fireRate: 5, magazine: 20, reserveMax: 140, reloadTime: 1.8,
    spread: 0.0, range: 40, critChance: 0.12, critMult: 2.1, canHeadshot: true, knockback: 3, recoil: 0.8, screenShake: 0.05, sfx: 'shoot_laser',
    projectile: { speed: 44, gravity: 0, lifetime: 2, color: 0xffffff, radius: 0.18, shape: 'shard', scale: 1, ricochet: 8, glow: true, trail: true },
    viewmodel: { color: 0x223044, accent: 0xffffff, length: 0.6, shape: 'energy' }, projectileColor: 0xffffff, impactColor: 0xffffff,
    description: 'Crystalline shards that bounce wildly off every surface.', price: 600, unlockWave: 12, tags: ['ricochet', 'energy', 'special'] },
  { id: 'novaCannon', name: 'Nova Cannon', category: 'special', rarity: WeaponRarity.Mythic,
    fireMode: FireMode.Projectile, auto: false, damage: 40, damageType: DamageType.Energy, fireRate: 0.7, magazine: 3, reserveMax: 15, reloadTime: 2.6,
    spread: 0.0, range: 50, critChance: 0.0, canHeadshot: false, knockback: 24, recoil: 3.0, screenShake: 0.24, sfx: 'shoot_railgun',
    projectile: { speed: 26, gravity: 0, lifetime: 2.5, color: 0x29e7ff, radius: 0.5, shape: 'orb', scale: 2, aoe: 9, aoeFalloff: 0.2, pierce: 99, glow: true, trail: true },
    viewmodel: { color: 0x223044, accent: 0x29e7ff, length: 0.8, shape: 'heavy' }, projectileColor: 0x29e7ff, impactColor: 0x29e7ff,
    description: 'A mythic orb that pierces and detonates repeatedly as a walking nova.', price: 900, unlockWave: 17, tags: ['explosive', 'aoe', 'pierce', 'mythic', 'special'] },
]);
