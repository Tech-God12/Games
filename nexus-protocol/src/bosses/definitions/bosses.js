// ============================================================================
// bosses.js — Six escalating boss encounters. Each defines phases with
// ability rotations; the BossAISystem advances phases at health thresholds.
// ============================================================================

import { BossRegistry } from '../BossRegistry.js';

BossRegistry.registerMany([
  {
    id: 'sentinel', name: 'Sentinel', title: 'THE SENTINEL', subtitle: 'Guardian of the Nexus',
    health: 900, armor: 4, speed: 2.4, behavior: 'tank',
    radius: 1.6, height: 3.2, color: 0x29e7ff, accent: 0xff3df0, shape: 'tank', scale: 2.4,
    attack: { type: 'ranged', damage: 12, range: 40, cooldown: 1.6, projectile: { speed: 30, color: 0x29e7ff, shape: 'orb', scale: 1.4, radius: 0.32, lifetime: 5 } },
    contactDamage: 22, xp: 60, currency: { min: 30, max: 50 }, unlockWave: 5,
    introText: 'A guardian awakens.',
    phases: [
      { threshold: 1.0, abilities: ['radialBurst', 'aimedVolley'], abilityInterval: 3.0, speedMult: 1, damageMult: 1 },
      { threshold: 0.66, abilities: ['radialBurst', 'aimedVolley', 'summonAdds'], abilityInterval: 2.4, speedMult: 1.15, damageMult: 1.1 },
      { threshold: 0.33, abilities: ['spiralBurst', 'aimedVolley', 'summonAdds', 'quake'], abilityInterval: 1.8, speedMult: 1.3, damageMult: 1.25 },
    ],
  },
  {
    id: 'warbringer', name: 'Warbringer', title: 'THE WARBRINGER', subtitle: 'Engine of ruin',
    health: 1400, armor: 8, speed: 3.0, behavior: 'brute',
    radius: 1.8, height: 3.6, color: 0xff5544, accent: 0xffaa44, shape: 'humanoid', scale: 2.8,
    attack: { type: 'ranged', damage: 14, range: 30, cooldown: 2, projectile: { speed: 28, color: 0xff5544, shape: 'orb', scale: 1.5, radius: 0.34, lifetime: 4 } },
    contactDamage: 28, xp: 90, currency: { min: 40, max: 70 }, unlockWave: 10,
    introText: 'It lives for war.',
    phases: [
      { threshold: 1.0, abilities: ['chargeSlam', 'aimedVolley'], abilityInterval: 3.2, speedMult: 1, damageMult: 1 },
      { threshold: 0.66, abilities: ['chargeSlam', 'quake', 'aimedVolley'], abilityInterval: 2.6, speedMult: 1.2, damageMult: 1.15 },
      { threshold: 0.33, abilities: ['chargeSlam', 'quake', 'radialBurst', 'summonAdds'], abilityInterval: 1.8, speedMult: 1.4, damageMult: 1.3 },
    ],
  },
  {
    id: 'tempest', name: 'Tempest', title: 'THE TEMPEST', subtitle: 'Storm made manifest',
    health: 1100, shield: 200, armor: 2, speed: 4.0, behavior: 'orbiter',
    radius: 1.5, height: 2.8, color: 0x8a5bff, accent: 0x29e7ff, shape: 'orb', scale: 2.6, flying: true, hoverHeight: 4,
    attack: { type: 'ranged', damage: 12, range: 50, cooldown: 1.2, projectile: { speed: 34, color: 0x8a5bff, shape: 'shard', scale: 1.3, radius: 0.26, lifetime: 5 } },
    contactDamage: 18, xp: 100, currency: { min: 45, max: 75 }, unlockWave: 15,
    introText: 'The sky turns against you.',
    phases: [
      { threshold: 1.0, abilities: ['spiralBurst', 'aimedVolley'], abilityInterval: 2.6, speedMult: 1, damageMult: 1 },
      { threshold: 0.66, abilities: ['spiralBurst', 'laserSweep', 'teleportStrike'], abilityInterval: 2.0, speedMult: 1.2, damageMult: 1.15 },
      { threshold: 0.33, abilities: ['spiralBurst', 'laserSweep', 'teleportStrike', 'radialBurst'], abilityInterval: 1.4, speedMult: 1.4, damageMult: 1.3 },
    ],
  },
  {
    id: 'leviathan', name: 'Leviathan', title: 'THE LEVIATHAN', subtitle: 'The endless swarm',
    health: 2200, armor: 6, speed: 2.2, behavior: 'swarmLord',
    radius: 2.0, height: 3.4, color: 0xff66aa, accent: 0xffe066, shape: 'blob', scale: 3.2,
    attack: { type: 'ranged', damage: 12, range: 36, cooldown: 1.4, projectile: { speed: 26, color: 0xff66aa, shape: 'orb', scale: 1.4, radius: 0.3, lifetime: 4 } },
    contactDamage: 24, xp: 130, currency: { min: 60, max: 100 }, unlockWave: 20,
    introText: 'It is never alone.',
    phases: [
      { threshold: 1.0, abilities: ['summonAdds', 'radialBurst'], abilityInterval: 3.0, speedMult: 1, damageMult: 1 },
      { threshold: 0.66, abilities: ['summonAdds', 'spiralBurst', 'summonAdds'], abilityInterval: 2.2, speedMult: 1.15, damageMult: 1.1 },
      { threshold: 0.33, abilities: ['summonAdds', 'spiralBurst', 'radialBurst', 'summonAdds', 'quake'], abilityInterval: 1.5, speedMult: 1.3, damageMult: 1.25 },
    ],
  },
  {
    id: 'overlord', name: 'Overlord', title: 'THE OVERLORD', subtitle: 'Master of the arena',
    health: 2600, shield: 300, armor: 8, speed: 3.0, behavior: 'tank',
    radius: 1.8, height: 3.6, color: 0xffb347, accent: 0xff3df0, shape: 'humanoid', scale: 3.0,
    attack: { type: 'ranged', damage: 16, range: 45, cooldown: 1.3, projectile: { speed: 34, color: 0xffb347, shape: 'orb', scale: 1.5, radius: 0.34, lifetime: 5 } },
    contactDamage: 26, xp: 180, currency: { min: 80, max: 140 }, unlockWave: 25,
    introText: 'The master reveals itself.',
    phases: [
      { threshold: 1.0, abilities: ['radialBurst', 'aimedVolley', 'laserSweep'], abilityInterval: 2.6, speedMult: 1, damageMult: 1 },
      { threshold: 0.75, abilities: ['radialBurst', 'spiralBurst', 'laserSweep', 'summonAdds'], abilityInterval: 2.2, speedMult: 1.1, damageMult: 1.1 },
      { threshold: 0.5, abilities: ['spiralBurst', 'laserSweep', 'teleportStrike', 'chargeSlam'], abilityInterval: 1.8, speedMult: 1.25, damageMult: 1.2 },
      { threshold: 0.25, abilities: ['spiralBurst', 'quake', 'radialBurst', 'summonAdds', 'chargeSlam', 'laserSweep'], abilityInterval: 1.2, speedMult: 1.5, damageMult: 1.4 },
    ],
  },
  {
    id: 'devourer', name: 'Devourer', title: 'THE DEVOURER', subtitle: 'End of all things',
    health: 3600, shield: 500, armor: 10, speed: 3.6, behavior: 'fastChaser',
    radius: 1.7, height: 3.2, color: 0xff3df0, accent: 0x8a5bff, shape: 'spider', scale: 3.2, flying: false,
    attack: { type: 'ranged', damage: 18, range: 50, cooldown: 1.1, projectile: { speed: 40, color: 0xff3df0, shape: 'shard', scale: 1.4, radius: 0.28, lifetime: 5 } },
    contactDamage: 30, xp: 260, currency: { min: 120, max: 200 }, unlockWave: 30,
    introText: 'It has come to consume.',
    phases: [
      { threshold: 1.0, abilities: ['spiralBurst', 'laserSweep', 'teleportStrike'], abilityInterval: 2.2, speedMult: 1, damageMult: 1 },
      { threshold: 0.75, abilities: ['spiralBurst', 'chargeSlam', 'laserSweep', 'quake'], abilityInterval: 1.8, speedMult: 1.15, damageMult: 1.15 },
      { threshold: 0.5, abilities: ['spiralBurst', 'radialBurst', 'teleportStrike', 'summonAdds', 'laserSweep'], abilityInterval: 1.4, speedMult: 1.3, damageMult: 1.3 },
      { threshold: 0.25, abilities: ['spiralBurst', 'quake', 'radialBurst', 'chargeSlam', 'laserSweep', 'teleportStrike', 'summonAdds'], abilityInterval: 0.9, speedMult: 1.6, damageMult: 1.5 },
    ],
  },
]);
