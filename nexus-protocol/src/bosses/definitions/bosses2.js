// ============================================================================
// bosses2.js — Additional late-game bosses with denser phase rotations.
// ============================================================================

import { BossRegistry } from '../BossRegistry.js';

BossRegistry.registerMany([
  {
    id: 'titan', name: 'Titan', title: 'THE TITAN', subtitle: 'Mountain that walks',
    health: 3000, armor: 12, speed: 2.0, behavior: 'tank',
    radius: 2.2, height: 4.2, color: 0xff5544, accent: 0xffe066, shape: 'walker', scale: 3.6,
    attack: { type: 'ranged', damage: 18, range: 40, cooldown: 1.8, projectile: { speed: 28, color: 0xff5544, shape: 'orb', scale: 1.6, radius: 0.36, lifetime: 5 } },
    contactDamage: 32, xp: 220, currency: { min: 100, max: 180 }, unlockWave: 28,
    introText: 'The mountain stirs.',
    phases: [
      { threshold: 1.0, abilities: ['chargeSlam', 'aimedVolley', 'quake'], abilityInterval: 2.6, speedMult: 1, damageMult: 1 },
      { threshold: 0.66, abilities: ['chargeSlam', 'quake', 'radialBurst', 'summonAdds'], abilityInterval: 2.0, speedMult: 1.15, damageMult: 1.15 },
      { threshold: 0.33, abilities: ['chargeSlam', 'quake', 'radialBurst', 'spiralBurst', 'summonAdds'], abilityInterval: 1.4, speedMult: 1.35, damageMult: 1.3 },
    ],
  },
  {
    id: 'seraph', name: 'Seraph', title: 'THE SERAPH', subtitle: 'Light unending',
    health: 2400, shield: 400, armor: 4, speed: 4.4, behavior: 'orbiter',
    radius: 1.8, height: 3.4, color: 0xffe066, accent: 0xffffff, shape: 'orb', scale: 3.0, flying: true, hoverHeight: 5,
    attack: { type: 'ranged', damage: 16, range: 55, cooldown: 1.0, projectile: { speed: 40, color: 0xffe066, shape: 'shard', scale: 1.4, radius: 0.28, lifetime: 5 } },
    contactDamage: 22, xp: 200, currency: { min: 90, max: 160 }, unlockWave: 26,
    introText: 'Radiance given wrath.',
    phases: [
      { threshold: 1.0, abilities: ['spiralBurst', 'laserSweep'], abilityInterval: 2.2, speedMult: 1, damageMult: 1 },
      { threshold: 0.66, abilities: ['spiralBurst', 'laserSweep', 'teleportStrike', 'aimedVolley'], abilityInterval: 1.7, speedMult: 1.2, damageMult: 1.15 },
      { threshold: 0.33, abilities: ['spiralBurst', 'laserSweep', 'teleportStrike', 'radialBurst', 'summonAdds'], abilityInterval: 1.1, speedMult: 1.4, damageMult: 1.3 },
    ],
  },
  {
    id: 'nightmare', name: 'Nightmare', title: 'THE NIGHTMARE', subtitle: 'Fear made flesh',
    health: 3200, armor: 8, speed: 3.8, behavior: 'fastChaser',
    radius: 1.8, height: 3.4, color: 0x8a5bff, accent: 0xff3df0, shape: 'spider', scale: 3.4,
    attack: { type: 'ranged', damage: 16, range: 45, cooldown: 1.0, projectile: { speed: 38, color: 0x8a5bff, shape: 'shard', scale: 1.4, radius: 0.26, lifetime: 5 } },
    contactDamage: 28, xp: 240, currency: { min: 110, max: 190 }, unlockWave: 32,
    introText: 'It feeds on fear.',
    phases: [
      { threshold: 1.0, abilities: ['teleportStrike', 'spiralBurst', 'chargeSlam'], abilityInterval: 2.0, speedMult: 1, damageMult: 1 },
      { threshold: 0.66, abilities: ['teleportStrike', 'spiralBurst', 'laserSweep', 'quake'], abilityInterval: 1.6, speedMult: 1.2, damageMult: 1.15 },
      { threshold: 0.33, abilities: ['teleportStrike', 'spiralBurst', 'laserSweep', 'quake', 'radialBurst', 'summonAdds'], abilityInterval: 1.0, speedMult: 1.45, damageMult: 1.35 },
    ],
  },
  {
    id: 'monarch', name: 'Monarch', title: 'THE MONARCH', subtitle: 'Sovereign of the swarm',
    health: 4000, shield: 600, armor: 10, speed: 3.0, behavior: 'swarmLord',
    radius: 2.4, height: 4.0, color: 0xff66aa, accent: 0xffe066, shape: 'blob', scale: 3.8,
    attack: { type: 'ranged', damage: 14, range: 40, cooldown: 1.2, projectile: { speed: 28, color: 0xff66aa, shape: 'orb', scale: 1.5, radius: 0.32, lifetime: 5 } },
    contactDamage: 30, xp: 300, currency: { min: 150, max: 250 }, unlockWave: 34,
    introText: 'The swarm has a queen.',
    phases: [
      { threshold: 1.0, abilities: ['summonAdds', 'radialBurst', 'spiralBurst'], abilityInterval: 2.4, speedMult: 1, damageMult: 1 },
      { threshold: 0.7, abilities: ['summonAdds', 'summonAdds', 'spiralBurst', 'radialBurst'], abilityInterval: 1.8, speedMult: 1.15, damageMult: 1.1 },
      { threshold: 0.4, abilities: ['summonAdds', 'spiralBurst', 'radialBurst', 'quake', 'summonAdds'], abilityInterval: 1.3, speedMult: 1.3, damageMult: 1.25 },
      { threshold: 0.15, abilities: ['summonAdds', 'spiralBurst', 'radialBurst', 'quake', 'summonAdds', 'laserSweep'], abilityInterval: 0.8, speedMult: 1.6, damageMult: 1.5 },
    ],
  },
]);
