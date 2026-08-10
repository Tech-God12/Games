// ============================================================================
// enemies5.js — Tank & heavy line: slow, durable ground enemies that anchor
// waves and absorb fire. Armored, shielded, or regenerating variants.
// ============================================================================

import { EnemyRegistry } from '../EnemyRegistry.js';
import { StatusType, DamageType } from '../../ecs/components/Combat.js';

const E = (def) => EnemyRegistry.register(def);

E({ id: 'bulwark', name: 'Bulwark', behavior: 'chaser', shape: 'humanoid', color: 0x4aa3ff, accent: 0xffffff, scale: 1.4, orientYaw: true,
  health: 110, speed: 2.8, contactDamage: 14, radius: 0.7, height: 1.8, armor: 8, xp: 6, currency: { min: 2, max: 5 }, weight: 3, tier: 3, unlockWave: 10,
  tags: ['ground', 'armored', 'heavy'], detectRange: 40, description: 'A walking bulwark. Armored front, slow advance.' });
E({ id: 'behemoth2', name: 'Behemoth', behavior: 'brute', shape: 'humanoid', color: 0xff5544, accent: 0xffe066, scale: 1.7, orientYaw: true,
  health: 160, speed: 2.4, contactDamage: 18, radius: 0.85, height: 2.2, armor: 6, xp: 8, currency: { min: 3, max: 6 }, weight: 2, tier: 4, unlockWave: 12,
  tags: ['ground', 'heavy', 'slam'], detectRange: 40, description: 'A behemoth. Ground-pounds on arrival.' });
E({ id: 'fortress', name: 'Fortress', behavior: 'tank', shape: 'tank', color: 0x5577aa, accent: 0xff3df0, scale: 1.6, orientYaw: true,
  health: 200, armor: 12, shield: 40, speed: 1.8, contactDamage: 16, radius: 0.95, height: 2.0, xp: 10, currency: { min: 4, max: 8 }, weight: 1, tier: 4, unlockWave: 14,
  tags: ['ground', 'heavy', 'armored'], detectRange: 40,
  attack: { type: 'ranged', damage: 14, range: 30, cooldown: 1.8, preferredRange: 14, projectile: { speed: 28, color: 0xff3df0, shape: 'orb', scale: 1.3, radius: 0.3, lifetime: 4 } },
  description: 'A fortress tank. Shields, armor, and a cannon.' });
E({ id: 'regenerator', name: 'Regenerator', behavior: 'chaser', shape: 'blob', color: 0x66ff88, accent: 0x223322, scale: 1.3, orientYaw: false,
  health: 100, speed: 3.2, contactDamage: 12, radius: 0.7, height: 1.3, regen: 12, xp: 7, currency: { min: 2, max: 5 }, weight: 2, tier: 3, unlockWave: 11,
  tags: ['ground', 'regen', 'heavy'], detectRange: 40, glowPulse: { base: 0.8, amplitude: 0.5, speed: 3 }, description: 'A regenerator. Heals fast — burst it down.' });
E({ id: 'juggernaut2', name: 'Juggernaut Mk2', behavior: 'charger', shape: 'humanoid', color: 0x8a5bff, accent: 0xff3df0, scale: 1.6, orientYaw: true,
  health: 140, speed: 3.0, contactDamage: 18, radius: 0.8, height: 2.0, armor: 8, xp: 9, currency: { min: 3, max: 6 }, weight: 2, tier: 4, unlockWave: 13,
  tags: ['ground', 'charger', 'armored', 'heavy'], detectRange: 50, description: 'An armored juggernaut that charges the line.' });
E({ id: 'colossus2', name: 'Colossus', behavior: 'tank', shape: 'tank', color: 0xffb347, accent: 0xff3df0, scale: 1.8, orientYaw: true,
  health: 280, armor: 16, speed: 2.0, contactDamage: 22, radius: 1.0, height: 2.4, xp: 14, currency: { min: 5, max: 10 }, weight: 1, tier: 4, unlockWave: 16,
  tags: ['ground', 'heavy', 'armored', 'elite'], detectRange: 40, eliteHealthMult: 1.6,
  attack: { type: 'ranged', damage: 18, range: 32, cooldown: 1.6, preferredRange: 16, projectile: { speed: 30, color: 0xffb347, shape: 'orb', scale: 1.4, radius: 0.32, lifetime: 4 } },
  description: 'A colossus. The heaviest ground unit short of a boss.' });
E({ id: 'ironhide', name: 'Ironhide', behavior: 'chaser', shape: 'walker', color: 0x9fb3d6, accent: 0xff3df0, scale: 1.3, orientYaw: true,
  health: 95, speed: 3.4, contactDamage: 14, radius: 0.65, height: 1.6, armor: 10, xp: 7, currency: { min: 2, max: 5 }, weight: 2, tier: 3, unlockWave: 11,
  tags: ['ground', 'armored'], detectRange: 40, resistances: { kinetic: 0.3 }, description: 'An ironhide. Resists kinetic rounds.' });
E({ id: 'plated', name: 'Plated', behavior: 'chaser', shape: 'humanoid', color: 0x4fd07a, accent: 0xffffff, scale: 1.2, orientYaw: true,
  health: 85, speed: 3.2, contactDamage: 12, radius: 0.6, height: 1.5, armor: 6, shield: 30, xp: 6, currency: { min: 2, max: 5 }, weight: 2, tier: 3, unlockWave: 10,
  tags: ['ground', 'armored'], detectRange: 40, description: 'A plated trooper with shields and armor.' });
E({ id: 'titanWalker2', name: 'Titan', behavior: 'brute', shape: 'walker', color: 0xff5544, accent: 0xffe066, scale: 2.0, orientYaw: true,
  health: 190, speed: 2.6, contactDamage: 18, radius: 0.95, height: 2.4, armor: 10, xp: 12, currency: { min: 4, max: 8 }, weight: 1, tier: 4, unlockWave: 15,
  tags: ['ground', 'heavy', 'slam', 'elite'], detectRange: 40, eliteHealthMult: 1.7, description: 'A titan walker. Armored legs, heavy slam.' });
E({ id: 'dreadguard', name: 'Dreadguard', behavior: 'tank', shape: 'humanoid', color: 0x8a5bff, accent: 0xff3df0, scale: 1.7, orientYaw: true,
  health: 240, armor: 14, shield: 60, speed: 2.2, contactDamage: 20, radius: 0.9, height: 2.2, xp: 16, currency: { min: 5, max: 10 }, weight: 1, tier: 4, unlockWave: 17,
  tags: ['ground', 'heavy', 'armored', 'elite'], detectRange: 40, eliteHealthMult: 1.6,
  attack: { type: 'ranged', damage: 16, range: 32, cooldown: 1.6, preferredRange: 16, projectile: { speed: 30, color: 0x8a5bff, shape: 'orb', scale: 1.4, radius: 0.3, lifetime: 4 } },
  description: 'A dreadguard. Shielded, armored, and armed.' });
