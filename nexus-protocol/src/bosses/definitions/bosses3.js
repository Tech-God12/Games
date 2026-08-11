// ============================================================================
// bosses3.js — End-game bosses for the deepest waves.
// ============================================================================

import { BossRegistry } from '../BossRegistry.js';

BossRegistry.registerMany([
  {
    id: 'arbiter', name: 'Arbiter', title: 'THE ARBITER', subtitle: 'Judge of the Protocol',
    health: 4200, shield: 500, armor: 12, speed: 3.4, behavior: 'orbiter',
    radius: 1.9, height: 3.6, color: 0x29e7ff, accent: 0xffffff, shape: 'orb', scale: 3.2, flying: true, hoverHeight: 4.5,
    attack: { type: 'ranged', damage: 18, range: 55, cooldown: 1.0, projectile: { speed: 42, color: 0x29e7ff, shape: 'shard', scale: 1.4, radius: 0.28, lifetime: 5 } },
    contactDamage: 28, xp: 320, currency: { min: 140, max: 220 }, unlockWave: 36,
    introText: 'The Protocol renders judgment.',
    phases: [
      { threshold: 1.0, abilities: ['spiralBurst', 'laserSweep', 'aimedVolley'], abilityInterval: 2.0, speedMult: 1, damageMult: 1 },
      { threshold: 0.7, abilities: ['spiralBurst', 'laserSweep', 'teleportStrike', 'radialBurst'], abilityInterval: 1.6, speedMult: 1.15, damageMult: 1.15 },
      { threshold: 0.4, abilities: ['spiralBurst', 'laserSweep', 'teleportStrike', 'radialBurst', 'summonAdds'], abilityInterval: 1.1, speedMult: 1.35, damageMult: 1.3 },
      { threshold: 0.15, abilities: ['spiralBurst', 'quake', 'radialBurst', 'laserSweep', 'teleportStrike', 'summonAdds'], abilityInterval: 0.7, speedMult: 1.6, damageMult: 1.5 },
    ],
  },
  {
    id: 'behemoth', name: 'Behemoth', title: 'THE BEHEMOTH', subtitle: 'The unkillable',
    health: 6000, armor: 18, shield: 300, speed: 2.4, behavior: 'tank',
    radius: 2.6, height: 4.6, color: 0xff5544, accent: 0xffe066, shape: 'walker', scale: 4.0,
    attack: { type: 'ranged', damage: 20, range: 40, cooldown: 1.6, projectile: { speed: 30, color: 0xff5544, shape: 'orb', scale: 1.6, radius: 0.38, lifetime: 5 } },
    contactDamage: 36, xp: 400, currency: { min: 180, max: 280 }, unlockWave: 38,
    introText: 'It cannot be killed. Only endured.',
    phases: [
      { threshold: 1.0, abilities: ['chargeSlam', 'quake', 'radialBurst'], abilityInterval: 2.4, speedMult: 1, damageMult: 1 },
      { threshold: 0.7, abilities: ['chargeSlam', 'quake', 'radialBurst', 'summonAdds'], abilityInterval: 1.8, speedMult: 1.15, damageMult: 1.15 },
      { threshold: 0.4, abilities: ['chargeSlam', 'quake', 'spiralBurst', 'radialBurst', 'summonAdds'], abilityInterval: 1.3, speedMult: 1.35, damageMult: 1.3 },
      { threshold: 0.15, abilities: ['chargeSlam', 'quake', 'spiralBurst', 'radialBurst', 'summonAdds', 'laserSweep'], abilityInterval: 0.8, speedMult: 1.55, damageMult: 1.5 },
    ],
  },
  {
    id: 'eclipse', name: 'Eclipse', title: 'THE ECLIPSE', subtitle: 'Light and void',
    health: 5000, shield: 800, armor: 8, speed: 4.0, behavior: 'fastChaser',
    radius: 2.0, height: 3.8, color: 0x8a5bff, accent: 0xffe066, shape: 'orb', scale: 3.4, flying: true, hoverHeight: 3.5,
    attack: { type: 'ranged', damage: 18, range: 50, cooldown: 1.0, projectile: { speed: 44, color: 0x8a5bff, shape: 'shard', scale: 1.4, radius: 0.28, lifetime: 5 } },
    contactDamage: 30, xp: 380, currency: { min: 170, max: 260 }, unlockWave: 40,
    introText: 'The sun goes out.',
    phases: [
      { threshold: 1.0, abilities: ['spiralBurst', 'teleportStrike', 'laserSweep'], abilityInterval: 1.8, speedMult: 1, damageMult: 1 },
      { threshold: 0.7, abilities: ['spiralBurst', 'teleportStrike', 'laserSweep', 'radialBurst'], abilityInterval: 1.4, speedMult: 1.2, damageMult: 1.15 },
      { threshold: 0.4, abilities: ['spiralBurst', 'teleportStrike', 'laserSweep', 'radialBurst', 'quake'], abilityInterval: 1.0, speedMult: 1.4, damageMult: 1.3 },
      { threshold: 0.15, abilities: ['spiralBurst', 'teleportStrike', 'laserSweep', 'radialBurst', 'quake', 'summonAdds'], abilityInterval: 0.6, speedMult: 1.7, damageMult: 1.55 },
    ],
  },
  {
    id: 'zenith', name: 'Zenith', title: 'THE ZENITH', subtitle: 'The final guardian',
    health: 8000, shield: 1000, armor: 14, speed: 3.6, behavior: 'tank',
    radius: 2.4, height: 4.4, color: 0xffe066, accent: 0xff3df0, shape: 'humanoid', scale: 4.2,
    attack: { type: 'ranged', damage: 22, range: 55, cooldown: 1.0, projectile: { speed: 44, color: 0xffe066, shape: 'shard', scale: 1.5, radius: 0.3, lifetime: 5 } },
    contactDamage: 36, xp: 600, currency: { min: 250, max: 400 }, unlockWave: 45,
    introText: 'There is nothing after this.',
    phases: [
      { threshold: 1.0, abilities: ['spiralBurst', 'laserSweep', 'radialBurst', 'aimedVolley'], abilityInterval: 1.8, speedMult: 1, damageMult: 1 },
      { threshold: 0.75, abilities: ['spiralBurst', 'laserSweep', 'radialBurst', 'chargeSlam', 'summonAdds'], abilityInterval: 1.4, speedMult: 1.15, damageMult: 1.15 },
      { threshold: 0.5, abilities: ['spiralBurst', 'laserSweep', 'radialBurst', 'chargeSlam', 'teleportStrike', 'quake', 'summonAdds'], abilityInterval: 1.0, speedMult: 1.3, damageMult: 1.3 },
      { threshold: 0.25, abilities: ['spiralBurst', 'laserSweep', 'radialBurst', 'chargeSlam', 'teleportStrike', 'quake', 'summonAdds', 'aimedVolley'], abilityInterval: 0.5, speedMult: 1.6, damageMult: 1.6 },
    ],
  },
]);
