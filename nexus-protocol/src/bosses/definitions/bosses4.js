// ============================================================================
// bosses4.js — Additional guardians for waves 32–50.
// ============================================================================

import { BossRegistry } from '../BossRegistry.js';

BossRegistry.registerMany([
  {
    id: 'hordeKing', name: 'Horde King', title: 'THE HORDE KING', subtitle: 'Lord of the swarm',
    health: 5200, armor: 8, speed: 2.8, behavior: 'swarmLord',
    radius: 2.2, height: 3.8, color: 0xff66aa, accent: 0xffe066, shape: 'blob', scale: 3.6,
    attack: { type: 'ranged', damage: 14, range: 38, cooldown: 1.2, projectile: { speed: 28, color: 0xff66aa, shape: 'orb', scale: 1.5, radius: 0.32, lifetime: 5 } },
    contactDamage: 28, xp: 360, currency: { min: 150, max: 240 }, unlockWave: 32,
    introText: 'The swarm finds its king.',
    phases: [
      { threshold: 1.0, abilities: ['summonAdds', 'radialBurst', 'spiralBurst'], abilityInterval: 2.2, speedMult: 1, damageMult: 1 },
      { threshold: 0.66, abilities: ['summonAdds', 'summonAdds', 'spiralBurst', 'radialBurst'], abilityInterval: 1.6, speedMult: 1.15, damageMult: 1.15 },
      { threshold: 0.33, abilities: ['summonAdds', 'spiralBurst', 'radialBurst', 'quake', 'summonAdds'], abilityInterval: 1.0, speedMult: 1.35, damageMult: 1.3 },
    ],
  },
  {
    id: 'ironGod', name: 'Iron God', title: 'THE IRON GOD', subtitle: 'War incarnate',
    health: 6800, armor: 20, shield: 400, speed: 2.6, behavior: 'brute',
    radius: 2.6, height: 4.6, color: 0x5577aa, accent: 0xff3df0, shape: 'humanoid', scale: 4.2,
    attack: { type: 'ranged', damage: 20, range: 42, cooldown: 1.4, projectile: { speed: 32, color: 0x5577aa, shape: 'orb', scale: 1.6, radius: 0.36, lifetime: 5 } },
    contactDamage: 36, xp: 440, currency: { min: 190, max: 290 }, unlockWave: 34,
    introText: 'It is war, given a body.',
    phases: [
      { threshold: 1.0, abilities: ['chargeSlam', 'quake', 'radialBurst'], abilityInterval: 2.4, speedMult: 1, damageMult: 1 },
      { threshold: 0.66, abilities: ['chargeSlam', 'quake', 'radialBurst', 'laserSweep'], abilityInterval: 1.8, speedMult: 1.15, damageMult: 1.15 },
      { threshold: 0.33, abilities: ['chargeSlam', 'quake', 'spiralBurst', 'radialBurst', 'laserSweep', 'summonAdds'], abilityInterval: 1.2, speedMult: 1.35, damageMult: 1.3 },
    ],
  },
  {
    id: 'starEater', name: 'Star Eater', title: 'THE STAR EATER', subtitle: 'Devourer of light',
    health: 7200, shield: 1200, armor: 10, speed: 3.8, behavior: 'orbiter',
    radius: 2.2, height: 4.2, color: 0xffb347, accent: 0x29e7ff, shape: 'orb', scale: 3.8, flying: true, hoverHeight: 4.5,
    attack: { type: 'ranged', damage: 20, range: 58, cooldown: 0.9, projectile: { speed: 46, color: 0xffb347, shape: 'shard', scale: 1.5, radius: 0.3, lifetime: 5 } },
    contactDamage: 32, xp: 480, currency: { min: 210, max: 310 }, unlockWave: 38,
    introText: 'It eats stars. You are next.',
    phases: [
      { threshold: 1.0, abilities: ['spiralBurst', 'laserSweep', 'teleportStrike'], abilityInterval: 1.8, speedMult: 1, damageMult: 1 },
      { threshold: 0.66, abilities: ['spiralBurst', 'laserSweep', 'teleportStrike', 'radialBurst'], abilityInterval: 1.4, speedMult: 1.2, damageMult: 1.15 },
      { threshold: 0.33, abilities: ['spiralBurst', 'laserSweep', 'teleportStrike', 'radialBurst', 'quake', 'summonAdds'], abilityInterval: 0.9, speedMult: 1.45, damageMult: 1.35 },
    ],
  },
  {
    id: 'theEnd', name: 'The End', title: 'THE END', subtitle: 'Where the Nexus terminates',
    health: 12000, shield: 1500, armor: 18, speed: 3.4, behavior: 'tank',
    radius: 2.8, height: 5.0, color: 0x000000, accent: 0xff3df0, shape: 'humanoid', scale: 5.0,
    attack: { type: 'ranged', damage: 24, range: 60, cooldown: 0.8, projectile: { speed: 48, color: 0xff3df0, shape: 'shard', scale: 1.8, radius: 0.34, lifetime: 5 } },
    contactDamage: 44, xp: 1000, currency: { min: 400, max: 600 }, unlockWave: 50,
    introText: 'There is nothing after this. Only this.',
    phases: [
      { threshold: 1.0, abilities: ['spiralBurst', 'laserSweep', 'radialBurst', 'aimedVolley', 'chargeSlam'], abilityInterval: 1.6, speedMult: 1, damageMult: 1 },
      { threshold: 0.8, abilities: ['spiralBurst', 'laserSweep', 'radialBurst', 'chargeSlam', 'teleportStrike', 'summonAdds'], abilityInterval: 1.3, speedMult: 1.1, damageMult: 1.1 },
      { threshold: 0.6, abilities: ['spiralBurst', 'laserSweep', 'radialBurst', 'chargeSlam', 'teleportStrike', 'quake', 'summonAdds'], abilityInterval: 1.0, speedMult: 1.25, damageMult: 1.25 },
      { threshold: 0.4, abilities: ['spiralBurst', 'laserSweep', 'radialBurst', 'chargeSlam', 'teleportStrike', 'quake', 'summonAdds', 'aimedVolley'], abilityInterval: 0.7, speedMult: 1.4, damageMult: 1.4 },
      { threshold: 0.15, abilities: ['spiralBurst', 'laserSweep', 'radialBurst', 'chargeSlam', 'teleportStrike', 'quake', 'summonAdds', 'aimedVolley'], abilityInterval: 0.4, speedMult: 1.7, damageMult: 1.7 },
    ],
  },
]);
