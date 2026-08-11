// ============================================================================
// bosses5.js — Additional guardians for waves 40–60 with denser rotations.
// ============================================================================

import { BossRegistry } from '../BossRegistry.js';

const B = (def) => BossRegistry.register(def);

B({ id: 'nullTyrant', name: 'Null Tyrant', title: 'THE NULL TYRANT', subtitle: 'Emptiness enthroned',
  health: 6200, shield: 1000, armor: 10, speed: 3.2, behavior: 'orbiter',
  radius: 2.2, height: 4.2, color: 0x8a5bff, accent: 0x000000, shape: 'orb', scale: 3.6, flying: true, hoverHeight: 4.2,
  attack: { type: 'ranged', damage: 20, range: 58, cooldown: 0.9, projectile: { speed: 44, color: 0x8a5bff, shape: 'shard', scale: 1.5, radius: 0.3, lifetime: 5 } },
  contactDamage: 32, xp: 460, currency: { min: 200, max: 300 }, unlockWave: 40,
  introText: 'Emptiness takes the throne.',
  phases: [
    { threshold: 1.0, abilities: ['spiralBurst', 'laserSweep', 'teleportStrike'], abilityInterval: 1.8, speedMult: 1, damageMult: 1 },
    { threshold: 0.66, abilities: ['spiralBurst', 'laserSweep', 'teleportStrike', 'radialBurst'], abilityInterval: 1.4, speedMult: 1.2, damageMult: 1.15 },
    { threshold: 0.33, abilities: ['spiralBurst', 'laserSweep', 'teleportStrike', 'radialBurst', 'quake', 'summonAdds'], abilityInterval: 0.9, speedMult: 1.45, damageMult: 1.35 },
  ] });
B({ id: 'worldEater', name: 'World Eater', title: 'THE WORLD EATER', subtitle: 'It consumes all',
  health: 8500, armor: 14, speed: 2.8, behavior: 'brute',
  radius: 2.6, height: 4.8, color: 0xff5544, accent: 0xffe066, shape: 'humanoid', scale: 4.4,
  attack: { type: 'ranged', damage: 22, range: 44, cooldown: 1.4, projectile: { speed: 32, color: 0xff5544, shape: 'orb', scale: 1.6, radius: 0.36, lifetime: 5 } },
  contactDamage: 40, xp: 560, currency: { min: 250, max: 360 }, unlockWave: 42,
  introText: 'It has consumed worlds. You are a snack.',
  phases: [
    { threshold: 1.0, abilities: ['chargeSlam', 'quake', 'radialBurst'], abilityInterval: 2.2, speedMult: 1, damageMult: 1 },
    { threshold: 0.66, abilities: ['chargeSlam', 'quake', 'radialBurst', 'laserSweep', 'summonAdds'], abilityInterval: 1.6, speedMult: 1.15, damageMult: 1.15 },
    { threshold: 0.33, abilities: ['chargeSlam', 'quake', 'spiralBurst', 'radialBurst', 'laserSweep', 'summonAdds'], abilityInterval: 1.0, speedMult: 1.35, damageMult: 1.35 },
  ] });
B({ id: 'astralSovereign', name: 'Astral Sovereign', title: 'THE ASTRAL SOVEREIGN', subtitle: 'Ruler of the nexus',
  health: 10000, shield: 1500, armor: 12, speed: 3.6, behavior: 'tank',
  radius: 2.6, height: 4.6, color: 0xffe066, accent: 0x29e7ff, shape: 'humanoid', scale: 4.6,
  attack: { type: 'ranged', damage: 24, range: 60, cooldown: 0.9, projectile: { speed: 46, color: 0xffe066, shape: 'shard', scale: 1.6, radius: 0.32, lifetime: 5 } },
  contactDamage: 42, xp: 720, currency: { min: 300, max: 440 }, unlockWave: 45,
  introText: 'The Sovereign claims its throne.',
  phases: [
    { threshold: 1.0, abilities: ['spiralBurst', 'laserSweep', 'radialBurst', 'aimedVolley'], abilityInterval: 1.6, speedMult: 1, damageMult: 1 },
    { threshold: 0.75, abilities: ['spiralBurst', 'laserSweep', 'radialBurst', 'chargeSlam', 'summonAdds'], abilityInterval: 1.3, speedMult: 1.1, damageMult: 1.1 },
    { threshold: 0.5, abilities: ['spiralBurst', 'laserSweep', 'radialBurst', 'chargeSlam', 'teleportStrike', 'quake', 'summonAdds'], abilityInterval: 1.0, speedMult: 1.25, damageMult: 1.25 },
    { threshold: 0.25, abilities: ['spiralBurst', 'laserSweep', 'radialBurst', 'chargeSlam', 'teleportStrike', 'quake', 'summonAdds', 'aimedVolley'], abilityInterval: 0.6, speedMult: 1.5, damageMult: 1.5 },
  ] });
B({ id: 'infinityCore', name: 'Infinity Core', title: 'THE INFINITY CORE', subtitle: 'Endless and absolute',
  health: 13000, shield: 2000, armor: 16, speed: 3.4, behavior: 'orbiter',
  radius: 2.4, height: 4.4, color: 0x29e7ff, accent: 0xff3df0, shape: 'orb', scale: 4.0, flying: true, hoverHeight: 5,
  attack: { type: 'ranged', damage: 26, range: 64, cooldown: 0.7, projectile: { speed: 50, color: 0x29e7ff, shape: 'shard', scale: 1.6, radius: 0.32, lifetime: 5 } },
  contactDamage: 46, xp: 960, currency: { min: 380, max: 540 }, unlockWave: 50,
  introText: 'It is endless. It is absolute. It is.',
  phases: [
    { threshold: 1.0, abilities: ['spiralBurst', 'laserSweep', 'radialBurst', 'teleportStrike', 'aimedVolley'], abilityInterval: 1.4, speedMult: 1, damageMult: 1 },
    { threshold: 0.75, abilities: ['spiralBurst', 'laserSweep', 'radialBurst', 'teleportStrike', 'quake', 'summonAdds'], abilityInterval: 1.1, speedMult: 1.15, damageMult: 1.15 },
    { threshold: 0.5, abilities: ['spiralBurst', 'laserSweep', 'radialBurst', 'teleportStrike', 'quake', 'chargeSlam', 'summonAdds', 'aimedVolley'], abilityInterval: 0.8, speedMult: 1.3, damageMult: 1.3 },
    { threshold: 0.25, abilities: ['spiralBurst', 'laserSweep', 'radialBurst', 'teleportStrike', 'quake', 'chargeSlam', 'summonAdds', 'aimedVolley'], abilityInterval: 0.45, speedMult: 1.6, damageMult: 1.6 },
  ] });
B({ id: 'theNothing', name: 'The Nothing', title: 'THE NOTHING', subtitle: 'After the end',
  health: 16000, shield: 2500, armor: 20, speed: 3.8, behavior: 'fastChaser',
  radius: 2.6, height: 4.6, color: 0x000000, accent: 0x8a5bff, shape: 'spider', scale: 4.8,
  attack: { type: 'ranged', damage: 28, range: 60, cooldown: 0.6, projectile: { speed: 52, color: 0x8a5bff, shape: 'shard', scale: 1.8, radius: 0.34, lifetime: 5 } },
  contactDamage: 50, xp: 1200, currency: { min: 500, max: 700 }, unlockWave: 55,
  introText: 'There is nothing after this. Only this.',
  phases: [
    { threshold: 1.0, abilities: ['spiralBurst', 'laserSweep', 'teleportStrike', 'chargeSlam'], abilityInterval: 1.4, speedMult: 1, damageMult: 1 },
    { threshold: 0.7, abilities: ['spiralBurst', 'laserSweep', 'teleportStrike', 'chargeSlam', 'radialBurst', 'quake'], abilityInterval: 1.0, speedMult: 1.2, damageMult: 1.2 },
    { threshold: 0.4, abilities: ['spiralBurst', 'laserSweep', 'teleportStrike', 'chargeSlam', 'radialBurst', 'quake', 'summonAdds', 'aimedVolley'], abilityInterval: 0.7, speedMult: 1.4, damageMult: 1.4 },
    { threshold: 0.15, abilities: ['spiralBurst', 'laserSweep', 'teleportStrike', 'chargeSlam', 'radialBurst', 'quake', 'summonAdds', 'aimedVolley'], abilityInterval: 0.35, speedMult: 1.8, damageMult: 1.8 },
  ] });
