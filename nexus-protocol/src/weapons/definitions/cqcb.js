// ============================================================================
// cqcb.js — Close-quarters combat weapons: shotguns, SMGs, and rapid blasters
// built for swarm clearance and tight arenas.
// ============================================================================

import { WeaponRegistry } from '../WeaponRegistry.js';
import { FireMode, WeaponRarity } from '../Weapon.js';
import { DamageType, StatusType } from '../../ecs/components/Combat.js';

WeaponRegistry.registerMany([
  { id: 'autoShotgun', name: 'Auto Scattershot', category: 'shotgun', rarity: WeaponRarity.Epic,
    fireMode: FireMode.Hitscan, auto: true, damage: 6, damageType: DamageType.Kinetic, fireRate: 3, magazine: 12, reserveMax: 84, reloadTime: 2.4,
    pellets: 7, spread: 0.08, movingSpread: 0.02, range: 16, falloffStart: 7, falloffEnd: 14, falloffMin: 0.35, critChance: 0.05, critMult: 1.6, canHeadshot: false,
    knockback: 6, recoil: 1.6, screenShake: 0.12, sfx: 'shoot_shotgun', recoilPattern: 'random',
    viewmodel: { color: 0x223044, accent: 0xff6644, length: 0.6, shape: 'shotgun' }, tracerColor: 0xffd28a, impactColor: 0xffaa44,
    description: 'Full-auto shotgun. A wall of pellets at high cadence.', price: 420, unlockWave: 7, tags: ['close', 'crowd', 'auto'] },
  { id: 'doubleBarrel', name: 'Double Barrel', category: 'shotgun', rarity: WeaponRarity.Rare,
    fireMode: FireMode.Hitscan, auto: false, burst: 2, burstDelay: 0.08, damage: 11, damageType: DamageType.Kinetic, fireRate: 1.2, magazine: 2, reserveMax: 24, reloadTime: 1.6,
    pellets: 10, spread: 0.11, range: 14, falloffStart: 6, falloffEnd: 12, falloffMin: 0.3, critChance: 0.06, critMult: 1.7, canHeadshot: false,
    knockback: 12, recoil: 3.0, screenShake: 0.2, sfx: 'shoot_shotgun', recoilPattern: 'random',
    viewmodel: { color: 0x223044, accent: 0xffaa44, length: 0.6, shape: 'shotgun' }, tracerColor: 0xffd28a, impactColor: 0xffaa44,
    description: 'Two barrels, one trigger. Massive point-blank burst.', price: 280, unlockWave: 5, tags: ['close', 'burst', 'knockback'] },
  { id: 'sawedOff', name: 'Sawed-Off', category: 'shotgun', rarity: WeaponRarity.Uncommon,
    fireMode: FireMode.Hitscan, auto: false, damage: 8, damageType: DamageType.Kinetic, fireRate: 1.6, magazine: 4, reserveMax: 32, reloadTime: 1.4,
    pellets: 9, spread: 0.13, range: 10, falloffStart: 4, falloffEnd: 9, falloffMin: 0.25, critChance: 0.05, critMult: 1.6, canHeadshot: false,
    knockback: 10, recoil: 2.4, screenShake: 0.16, sfx: 'shoot_shotgun', recoilPattern: 'random',
    viewmodel: { color: 0x223044, accent: 0x9fb3d6, length: 0.5, shape: 'shotgun' }, tracerColor: 0xffd28a, impactColor: 0xffaa44,
    description: 'A brutally short scattergun. Spread like a fan.', price: 180, unlockWave: 3, tags: ['close', 'crowd'] },
  { id: 'smg2', name: 'Whisper SMG', category: 'smg', rarity: WeaponRarity.Uncommon,
    fireMode: FireMode.Hitscan, auto: true, damage: 8, damageType: DamageType.Kinetic, fireRate: 18, magazine: 40, reserveMax: 320, reloadTime: 1.5,
    spread: 0.02, movingSpread: 0.018, range: 32, falloffStart: 14, falloffEnd: 28, falloffMin: 0.5, critChance: 0.05, critMult: 1.7, canHeadshot: true,
    knockback: 1, recoil: 0.7, screenShake: 0.03, sfx: 'shoot_smg', viewmodel: { color: 0x223044, accent: 0x29e7ff, length: 0.5, shape: 'smg' },
    tracerColor: 0xbfe7a0, impactColor: 0xbfe7a0, description: 'Whisper-quiet, absurdly fast. Hose them down.',
    price: 220, unlockWave: 4, tags: ['auto', 'crowd', 'suppression'] },
  { id: 'pulsarSMG', name: 'Pulsar', category: 'smg', rarity: WeaponRarity.Rare,
    fireMode: FireMode.Projectile, auto: true, damage: 13, damageType: DamageType.Energy, fireRate: 11, magazine: 30, reserveMax: 240, reloadTime: 1.6,
    spread: 0.018, range: 36, critChance: 0.07, critMult: 1.9, canHeadshot: true, knockback: 2, recoil: 0.9, screenShake: 0.04, sfx: 'shoot_plasma',
    projectile: { speed: 60, gravity: 0, lifetime: 1.4, color: 0xff3df0, radius: 0.14, shape: 'orb', scale: 0.8, glow: true, trail: true },
    viewmodel: { color: 0x223044, accent: 0xff3df0, length: 0.55, shape: 'smg' }, projectileColor: 0xff3df0, impactColor: 0xff3df0,
    description: 'Rapid plasma SMG. Energy rounds that track straight.', price: 280, unlockWave: 5, tags: ['auto', 'energy', 'projectile'] },
  { id: 'flakCannon', name: 'Flak Cannon', category: 'shotgun', rarity: WeaponRarity.Epic,
    fireMode: FireMode.Projectile, auto: false, damage: 14, damageType: DamageType.Explosive, fireRate: 1.4, magazine: 6, reserveMax: 36, reloadTime: 2.2,
    pellets: 5, spread: 0.06, range: 24, critChance: 0.04, critMult: 1.6, canHeadshot: false, knockback: 8, recoil: 2.2, screenShake: 0.16, sfx: 'shoot_rocket',
    projectile: { speed: 40, gravity: 0.3, lifetime: 1.2, color: 0xff7733, radius: 0.18, shape: 'chunky', scale: 1, aoe: 2.5, aoeFalloff: 0.5, glow: true, trail: true },
    viewmodel: { color: 0x223044, accent: 0xff7733, length: 0.6, shape: 'launcher' }, projectileColor: 0xff7733, impactColor: 0xff7733,
    description: 'Fires a spread of mini-explosive flak. Airburst crowds.', price: 420, unlockWave: 8, tags: ['close', 'explosive', 'crowd', 'aoe'] },
  { id: 'stormSMG', name: 'Tempest', category: 'smg', rarity: WeaponRarity.Legendary,
    fireMode: FireMode.Hitscan, auto: true, damage: 11, damageType: DamageType.Shock, fireRate: 16, magazine: 36, reserveMax: 288, reloadTime: 1.6,
    spread: 0.014, range: 40, critChance: 0.1, critMult: 2.0, canHeadshot: true, knockback: 2, recoil: 0.8, screenShake: 0.04, sfx: 'shoot_lightning',
    viewmodel: { color: 0x223044, accent: 0xffe066, length: 0.55, shape: 'smg' }, tracerColor: 0xffe066, impactColor: 0xffe066,
    statusChance: 0.3, statusType: StatusType.Shock, statusPower: 1, statusDuration: 1.5,
    description: 'A shock-SMG that arcs electricity through clustered foes.', price: 560, unlockWave: 11, tags: ['auto', 'shock', 'crowd'] },
  { id: 'microBurst', name: 'Micro Burst', category: 'smg', rarity: WeaponRarity.Uncommon,
    fireMode: FireMode.Hitscan, auto: false, burst: 3, burstDelay: 0.05, damage: 12, damageType: DamageType.Kinetic, fireRate: 4, magazine: 24, reserveMax: 192, reloadTime: 1.5,
    spread: 0.012, range: 34, critChance: 0.08, critMult: 1.9, canHeadshot: true, knockback: 2, recoil: 1.0, screenShake: 0.05, sfx: 'shoot_smg',
    viewmodel: { color: 0x223044, accent: 0x4fd07a, length: 0.5, shape: 'smg' }, tracerColor: 0xbfe7a0, impactColor: 0xbfe7a0,
    description: 'A 3-round-burst machine pistol. Tight and rhythmic.', price: 200, unlockWave: 4, tags: ['burst', 'precision'] },
]);
