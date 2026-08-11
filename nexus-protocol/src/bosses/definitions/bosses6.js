// ============================================================================
// bosses6.js — Additional guardians for waves 60–80 with the densest phase
// rotations and highest stat budgets in the game.
// ============================================================================

import { BossRegistry } from '../BossRegistry.js';

const B = (def) => BossRegistry.register(def);

B({ id: 'eternalGuard', name: 'Eternal Guard', title: 'THE ETERNAL GUARD', subtitle: 'Unending sentinel',
  health: 18000, shield: 2000, armor: 18, speed: 3.4, behavior: 'tank',
  radius: 2.6, height: 4.8, color: 0x29e7ff, accent: 0xff3df0, shape: 'humanoid', scale: 4.8,
  attack: { type: 'ranged', damage: 26, range: 60, cooldown: 0.8, projectile: { speed: 48, color: 0x29e7ff, shape: 'shard', scale: 1.6, radius: 0.32, lifetime: 5 } },
  contactDamage: 46, xp: 1400, currency: { min: 500, max: 700 }, unlockWave: 60,
  introText: 'The eternal guard. It has been here longer than the cycle.',
  phases: [
    { threshold: 1.0, abilities: ['spiralBurst', 'laserSweep', 'radialBurst', 'aimedVolley'], abilityInterval: 1.4, speedMult: 1, damageMult: 1 },
    { threshold: 0.75, abilities: ['spiralBurst', 'laserSweep', 'radialBurst', 'chargeSlam', 'summonAdds'], abilityInterval: 1.1, speedMult: 1.15, damageMult: 1.15 },
    { threshold: 0.5, abilities: ['spiralBurst', 'laserSweep', 'radialBurst', 'chargeSlam', 'teleportStrike', 'quake', 'summonAdds'], abilityInterval: 0.8, speedMult: 1.3, damageMult: 1.3 },
    { threshold: 0.25, abilities: ['spiralBurst', 'laserSweep', 'radialBurst', 'chargeSlam', 'teleportStrike', 'quake', 'summonAdds', 'aimedVolley'], abilityInterval: 0.4, speedMult: 1.6, damageMult: 1.6 },
  ] });
B({ id: 'nullEntity', name: 'Null Entity', title: 'THE NULL ENTITY', subtitle: 'Absence incarnate',
  health: 20000, shield: 3000, armor: 14, speed: 4.0, behavior: 'fastChaser',
  radius: 2.4, height: 4.4, color: 0x000000, accent: 0x8a5bff, shape: 'spider', scale: 4.6,
  attack: { type: 'ranged', damage: 30, range: 60, cooldown: 0.5, projectile: { speed: 54, color: 0x8a5bff, shape: 'shard', scale: 1.8, radius: 0.34, lifetime: 5 } },
  contactDamage: 52, xp: 1600, currency: { min: 600, max: 800 }, unlockWave: 65,
  introText: 'It is the absence where a guardian should be.',
  phases: [
    { threshold: 1.0, abilities: ['spiralBurst', 'laserSweep', 'teleportStrike', 'chargeSlam'], abilityInterval: 1.2, speedMult: 1, damageMult: 1 },
    { threshold: 0.7, abilities: ['spiralBurst', 'laserSweep', 'teleportStrike', 'chargeSlam', 'radialBurst', 'quake'], abilityInterval: 0.9, speedMult: 1.2, damageMult: 1.2 },
    { threshold: 0.4, abilities: ['spiralBurst', 'laserSweep', 'teleportStrike', 'chargeSlam', 'radialBurst', 'quake', 'summonAdds', 'aimedVolley'], abilityInterval: 0.6, speedMult: 1.4, damageMult: 1.4 },
    { threshold: 0.15, abilities: ['spiralBurst', 'laserSweep', 'teleportStrike', 'chargeSlam', 'radialBurst', 'quake', 'summonAdds', 'aimedVolley'], abilityInterval: 0.3, speedMult: 1.8, damageMult: 1.8 },
  ] });
B({ id: 'worldbreaker', name: 'Worldbreaker', title: 'THE WORLDBREAKER', subtitle: 'It ends worlds',
  health: 24000, armor: 22, shield: 3000, speed: 2.8, behavior: 'brute',
  radius: 2.8, height: 5.0, color: 0xff5544, accent: 0xffe066, shape: 'humanoid', scale: 5.2,
  attack: { type: 'ranged', damage: 28, range: 50, cooldown: 1.2, projectile: { speed: 34, color: 0xff5544, shape: 'orb', scale: 1.8, radius: 0.4, lifetime: 5 } },
  contactDamage: 56, xp: 2000, currency: { min: 800, max: 1000 }, unlockWave: 70,
  introText: 'It has broken worlds before. It will break this one.',
  phases: [
    { threshold: 1.0, abilities: ['chargeSlam', 'quake', 'radialBurst', 'laserSweep'], abilityInterval: 1.4, speedMult: 1, damageMult: 1 },
    { threshold: 0.66, abilities: ['chargeSlam', 'quake', 'radialBurst', 'laserSweep', 'spiralBurst', 'summonAdds'], abilityInterval: 1.0, speedMult: 1.15, damageMult: 1.15 },
    { threshold: 0.33, abilities: ['chargeSlam', 'quake', 'spiralBurst', 'radialBurst', 'laserSweep', 'summonAdds', 'teleportStrike'], abilityInterval: 0.5, speedMult: 1.4, damageMult: 1.4 },
  ] });
B({ id: 'theAll', name: 'The All', title: 'THE ALL', subtitle: 'Everything, at once',
  health: 30000, shield: 4000, armor: 20, speed: 3.6, behavior: 'orbiter',
  radius: 2.8, height: 5.0, color: 0xffffff, accent: 0xff3df0, shape: 'orb', scale: 5.2, flying: true, hoverHeight: 5,
  attack: { type: 'ranged', damage: 30, range: 70, cooldown: 0.5, projectile: { speed: 54, color: 0xffffff, shape: 'shard', scale: 1.8, radius: 0.34, lifetime: 5 } },
  contactDamage: 60, xp: 2400, currency: { min: 1000, max: 1400 }, unlockWave: 75,
  introText: 'It is everything the Nexus has ever been, all at once.',
  phases: [
    { threshold: 1.0, abilities: ['spiralBurst', 'laserSweep', 'radialBurst', 'teleportStrike', 'aimedVolley'], abilityInterval: 1.0, speedMult: 1, damageMult: 1 },
    { threshold: 0.75, abilities: ['spiralBurst', 'laserSweep', 'radialBurst', 'teleportStrike', 'quake', 'summonAdds'], abilityInterval: 0.8, speedMult: 1.15, damageMult: 1.15 },
    { threshold: 0.5, abilities: ['spiralBurst', 'laserSweep', 'radialBurst', 'teleportStrike', 'quake', 'chargeSlam', 'summonAdds', 'aimedVolley'], abilityInterval: 0.5, speedMult: 1.3, damageMult: 1.3 },
    { threshold: 0.25, abilities: ['spiralBurst', 'laserSweep', 'radialBurst', 'teleportStrike', 'quake', 'chargeSlam', 'summonAdds', 'aimedVolley'], abilityInterval: 0.25, speedMult: 1.6, damageMult: 1.6 },
  ] });
