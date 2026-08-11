/**
 * VOIDBREAK — Weapon definitions.
 *
 * The full arsenal. Every weapon is data-driven; behavior kind selects the
 * class from kinds.js. Tuning values are laid out explicitly so balance can
 * be reasoned about. Weapons are unlocked through the unlock system; the
 * starter loadout is the Sidearm + the Voltaic AR.
 */

export const WEAPON_DEFS = [
  {
    id: 'sidearm', name: 'MK-9 Sidearm', kind: 'hitscan',
    desc: 'Reliable semi-auto pistol. Always a good fallback.',
    damage: 18, fireRate: 5.5, auto: false, magSize: 12, reserveMax: 96, reloadTime: 1.1,
    spreadBase: 0.8, spreadMove: 1.4, spreadAir: 2.2, range: 70, falloffStart: 20, falloffEnd: 55, falloffFactor: 0.45,
    critChance: 0.06, critMult: 1.7, headshotMult: 2.0, element: 'kinetic',
    recoil: { vertical: 1.0, horizontal: 0.25, randomHor: 0.12, recovery: 12, pattern: [[1, 0], [1.1, 0.1], [1.2, -0.1]] },
    zoomFov: 60, adsTime: 0.14, tracerColor: '#ffe9a8', sound: 'gun.pistol', unlockWave: 0, tier: 1,
  },
  {
    id: 'voltaic', name: 'Voltaic AR', kind: 'hitscan',
    desc: 'Full-auto assault rifle with a tight recoil pattern.',
    damage: 13, fireRate: 10.5, auto: true, magSize: 30, reserveMax: 210, reloadTime: 1.7,
    spreadBase: 0.7, spreadMove: 1.9, spreadAir: 2.8, range: 95, falloffStart: 30, falloffEnd: 75, falloffFactor: 0.5,
    critChance: 0.05, critMult: 1.6, headshotMult: 2.0, element: 'energy',
    recoil: { vertical: 0.55, horizontal: 0.18, randomHor: 0.1, recovery: 9, pattern: [[1, 0], [1.1, 0.15], [1.2, 0.2], [1.3, 0.1], [1.4, -0.1], [1.5, -0.15]] },
    zoomFov: 60, adsTime: 0.16, tracerColor: '#9fd8ff', sound: 'gun.ar', unlockWave: 0, tier: 1,
  },
  {
    id: 'veil', name: 'Veil SMG', kind: 'hitscan',
    desc: 'High fire rate, high mobility, short range.',
    damage: 9, fireRate: 15, auto: true, magSize: 40, reserveMax: 320, reloadTime: 1.5,
    spreadBase: 1.1, spreadMove: 1.2, spreadAir: 2.0, range: 55, falloffStart: 15, falloffEnd: 45, falloffFactor: 0.5,
    critChance: 0.07, critMult: 1.5, headshotMult: 1.8, element: 'kinetic',
    recoil: { vertical: 0.4, horizontal: 0.22, randomHor: 0.2, recovery: 10, pattern: [[1, -0.2], [1, 0.1], [1, 0.2], [1, -0.1]] },
    zoomFov: 70, adsTime: 0.1, tracerColor: '#fff3c4', sound: 'gun.smg', unlockWave: 3, tier: 1,
  },
  {
    id: 'breaker', name: 'Breaker Shotgun', kind: 'hitscan',
    desc: '8-pellet close-range obliteration.',
    damage: 8, pellets: 8, fireRate: 1.4, auto: false, magSize: 6, reserveMax: 48, reloadTime: 2.4,
    spreadBase: 4.2, spreadMove: 2.5, spreadAir: 3.5, range: 28, falloffStart: 6, falloffEnd: 22, falloffFactor: 0.7,
    critChance: 0.05, critMult: 1.5, headshotMult: 1.5, element: 'kinetic', knockback: 4,
    recoil: { vertical: 2.2, horizontal: 0.35, randomHor: 0.25, recovery: 6, pattern: [[1, 0]] },
    zoomFov: 65, adsTime: 0.18, tracerColor: '#ffe0a0', sound: 'gun.shotgun', unlockWave: 5, tier: 2,
  },
  {
    id: 'executor', name: 'Executor Railgun', kind: 'charge',
    desc: 'Charge a piercing rail. One shot, one kill.',
    damage: 150, fireRate: 0.9, auto: false, magSize: 5, reserveMax: 25, reloadTime: 2.6,
    spreadBase: 0.15, range: 250, falloffStart: 200, falloffEnd: 260, falloffFactor: 0.3,
    critChance: 0.15, critMult: 2.2, headshotMult: 2.5, element: 'void',
    chargeTime: 0.9, beamOnRelease: true,
    recoil: { vertical: 3.2, horizontal: 0.4, recovery: 4 },
    zoomFov: 38, adsTime: 0.25, tracerColor: '#ff9dff', sound: 'gun.railgun', unlockWave: 8, tier: 3,
  },
  {
    id: 'havoc', name: 'Havoc Launcher', kind: 'grenade',
    desc: 'Lobbed plasma grenades with heavy splash.',
    damage: 90, fireRate: 1.1, auto: false, magSize: 4, reserveMax: 20, reloadTime: 2.2,
    spreadBase: 0.3, range: 80, element: 'plasma',
    projectileSpeed: 16, projectileGravity: 12, projectileLife: 4, splashRadius: 4.5, splashDamage: 90,
    fuse: 1.3, lobAngle: 0.22, knockback: 8,
    recoil: { vertical: 1.6, horizontal: 0.2, recovery: 5 },
    zoomFov: 60, adsTime: 0.15, sound: 'gun.grenade', unlockWave: 7, tier: 2,
  },
  {
    id: 'nova', name: 'Nova Cannon', kind: 'charge',
    desc: 'Charged plasma orb that detonates on impact.',
    damage: 60, fireRate: 1.3, auto: false, magSize: 6, reserveMax: 30, reloadTime: 2.0,
    spreadBase: 0.4, range: 140, element: 'plasma',
    chargeTime: 0.55, projectileSpeed: 26, projectileLife: 3, splashRadius: 3.2, splashDamage: 45,
    projectileColor: '#b26bff', projectileGlow: '#8a2be2',
    recoil: { vertical: 1.2, horizontal: 0.2, recovery: 5 },
    zoomFov: 55, adsTime: 0.18, sound: 'gun.plasma', unlockWave: 6, tier: 2,
  },
  {
    id: 'twinfang', name: 'Twinfang Minigun', kind: 'hitscan',
    desc: 'Spin-up bullet hose. Devours ammo, devours everything.',
    damage: 7, fireRate: 22, auto: true, magSize: 120, reserveMax: 480, reloadTime: 3.6,
    spreadBase: 1.4, spreadMove: 2.2, spreadAir: 3.2, range: 70, falloffStart: 20, falloffEnd: 55, falloffFactor: 0.45,
    critChance: 0.05, critMult: 1.5, headshotMult: 1.7, element: 'kinetic',
    recoil: { vertical: 0.3, horizontal: 0.3, randomHor: 0.3, recovery: 6, pattern: [[1, -0.3], [1, -0.1], [1, 0.1], [1, 0.3], [1, 0.1], [1, -0.1]] },
    zoomFov: 75, adsTime: 0.4, tracerColor: '#ffe9a8', sound: 'gun.minigun', unlockWave: 9, tier: 3,
  },
  {
    id: 'tesla', name: 'Tesla Lance', kind: 'beam',
    desc: 'Arc lightning that chains through enemies.',
    damage: 16, fireRate: 12, auto: true, magSize: 50, reserveMax: 250, reloadTime: 2.4,
    spreadBase: 0.5, range: 45, critChance: 0.1, critMult: 1.8, element: 'shock',
    beamColor: '#ffe14d', beamCooldown: 0.05,
    recoil: { vertical: 0.2, horizontal: 0.1, recovery: 12 },
    zoomFov: 65, adsTime: 0.12, sound: 'gun.tesla', unlockWave: 10, tier: 3,
  },
  {
    id: 'cryoshard', name: 'Cryoshard', kind: 'projectile',
    desc: 'Rapid ice bolts that freeze enemies in place.',
    damage: 12, fireRate: 4.5, auto: true, magSize: 24, reserveMax: 144, reloadTime: 1.8,
    spreadBase: 1.0, spreadMove: 1.6, spreadAir: 2.4, range: 90, critChance: 0.04, critMult: 1.5, element: 'cryo',
    projectileSpeed: 34, projectileLife: 3, projectileRadius: 0.14, projectileColor: '#aef6ff', projectileGlow: '#7df0ff',
    recoil: { vertical: 0.7, horizontal: 0.15, recovery: 8 },
    zoomFov: 58, adsTime: 0.16, sound: 'gun.plasma', unlockWave: 4, tier: 2,
  },
  {
    id: 'inferno', name: 'Inferno Lance', kind: 'beam',
    desc: 'Thermal beam that sets enemies ablaze.',
    damage: 14, fireRate: 10, auto: true, magSize: 60, reserveMax: 240, reloadTime: 2.6,
    spreadBase: 0.8, range: 40, critChance: 0.06, element: 'burn',
    beamColor: '#ff7a3d', beamCooldown: 0.06,
    recoil: { vertical: 0.25, horizontal: 0.12, recovery: 10 },
    zoomFov: 65, adsTime: 0.14, sound: 'gun.flamethrower', unlockWave: 11, tier: 3,
  },
  {
    id: 'battleaxe', name: 'Voidbreaker Battle Axe', kind: 'melee',
    desc: 'Rips through anything in a 120° arc. No ammo, all fury.',
    damage: 85, fireRate: 1.1, auto: false, magSize: Infinity, reserveMax: Infinity, infinite: true,
    reloadTime: 0.4, range: 3.2, arcDeg: 120, windup: 0.07, swingTime: 0.28, knockback: 7,
    critChance: 0.15, critMult: 2.0, element: 'void',
    recoil: { vertical: 1.5, horizontal: 0.3, recovery: 4 },
    sound: 'gun.melee', unlockWave: 2, tier: 2,
  },
  {
    id: 'drifter', name: 'Drifter Carbine', kind: 'hitscan',
    desc: 'Burst-fire carbine. Balanced damage and control.',
    damage: 16, fireRate: 4.2, auto: false, magSize: 18, reserveMax: 144, reloadTime: 1.9,
    spreadBase: 0.6, spreadMove: 1.5, spreadAir: 2.2, range: 110, falloffStart: 35, falloffEnd: 90, falloffFactor: 0.5,
    critChance: 0.08, critMult: 1.8, headshotMult: 2.2, element: 'kinetic',
    burst: 3, burstInterval: 0.09,
    recoil: { vertical: 0.9, horizontal: 0.2, randomHor: 0.12, recovery: 10, pattern: [[1, 0], [1.1, 0.1], [1.2, -0.1]] },
    zoomFov: 55, adsTime: 0.15, tracerColor: '#ffd9a0', sound: 'gun.br', unlockWave: 12, tier: 3,
  },
  {
    id: 'phantasm', name: 'Phantasm Rifle', kind: 'hitscan',
    desc: 'Phase rounds ignore armor and pass through one enemy.',
    damage: 22, fireRate: 4.0, auto: false, magSize: 10, reserveMax: 80, reloadTime: 1.6,
    spreadBase: 0.5, spreadMove: 1.3, spreadAir: 2.0, range: 130, critChance: 0.1, critMult: 2.0, headshotMult: 2.3, element: 'void',
    pierce: 1,
    recoil: { vertical: 1.2, horizontal: 0.25, randomHor: 0.15, recovery: 8 },
    zoomFov: 50, adsTime: 0.18, tracerColor: '#c07dff', sound: 'gun.sniper', unlockWave: 13, tier: 3,
  },
  {
    id: 'hush', name: 'Hush Marksman', kind: 'hitscan',
    desc: 'Silent precision sidearm for surgical takedowns.',
    damage: 28, fireRate: 2.6, auto: false, magSize: 8, reserveMax: 56, reloadTime: 1.3,
    spreadBase: 0.2, spreadMove: 1.0, spreadAir: 1.6, range: 160, falloffStart: 60, falloffEnd: 140, falloffFactor: 0.4,
    critChance: 0.2, critMult: 2.2, headshotMult: 2.5, element: 'kinetic',
    recoil: { vertical: 0.8, horizontal: 0.1, recovery: 14 },
    zoomFov: 40, adsTime: 0.22, tracerColor: '#ffffff', sound: 'gun.sniper', unlockWave: 14, tier: 3,
  },
  {
    id: 'starfall', name: 'STARFALL', kind: 'grenade',
    desc: 'Orbital strike in a can. Massive delayed blast.',
    damage: 220, fireRate: 0.5, auto: false, magSize: 2, reserveMax: 8, reloadTime: 3.2,
    spreadBase: 0.2, range: 120, element: 'plasma',
    projectileSpeed: 22, projectileGravity: 6, projectileLife: 5, splashRadius: 7, splashDamage: 220,
    fuse: 1.0, lobAngle: 0.1, knockback: 14,
    recoil: { vertical: 2.0, horizontal: 0.3, recovery: 3 },
    zoomFov: 50, adsTime: 0.2, sound: 'gun.grenade', unlockWave: 15, tier: 4,
  },
];

/** Lookup by id. */
export const WEAPON_BY_ID = new Map(WEAPON_DEFS.map((w) => [w.id, w]));

/** The player's starting arsenal (in order). */
export const STARTER_LOADOUT = ['sidearm', 'voltaic'];
