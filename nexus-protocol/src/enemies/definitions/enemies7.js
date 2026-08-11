// ============================================================================
// enemies7.js — Additional ranged & support enemies to fill the bestiary.
// ============================================================================

import { EnemyRegistry } from '../EnemyRegistry.js';
import { StatusType, DamageType } from '../../ecs/components/Combat.js';

const E = (def) => EnemyRegistry.register(def);

E({ id: 'gunner2', name: 'Gunner', behavior: 'shooter', shape: 'humanoid', color: 0xff5a8a, accent: 0x29e7ff, scale: 1, orientYaw: true,
  health: 34, speed: 3.0, contactDamage: 8, radius: 0.5, height: 1.4, xp: 2, currency: { min: 1, max: 3 }, weight: 6, tier: 2, unlockWave: 4,
  tags: ['ground', 'ranged'], detectRange: 55, attack: { type: 'ranged', damage: 8, range: 30, cooldown: 1.5, preferredRange: 12, projectile: { speed: 30, color: 0xff5a8a, shape: 'orb', scale: 1, radius: 0.22, lifetime: 4 } }, description: 'A gunner keeping distance and lobbing bolts.' });
E({ id: 'shotgunner2', name: 'Scattergunner', behavior: 'shotgunner', shape: 'humanoid', color: 0xffaa44, accent: 0xff5522, scale: 1, orientYaw: true,
  health: 38, speed: 2.8, contactDamage: 8, radius: 0.5, height: 1.4, armor: 1, xp: 3, currency: { min: 1, max: 3 }, weight: 5, tier: 2, unlockWave: 6,
  tags: ['ground', 'ranged', 'spread'], detectRange: 50, attack: { type: 'ranged', damage: 5, range: 16, cooldown: 2.2, preferredRange: 8, projectile: { speed: 26, color: 0xffaa44, shape: 'orb', scale: 0.9, radius: 0.2, lifetime: 3 } }, description: 'A scattergunner firing spread bursts up close.' });
E({ id: 'sniper2', name: 'Sniper', behavior: 'sniper', shape: 'humanoid', color: 0xff3df0, accent: 0xffffff, scale: 1, orientYaw: true,
  health: 30, speed: 2.2, contactDamage: 6, radius: 0.5, height: 1.5, xp: 4, currency: { min: 2, max: 4 }, weight: 3, tier: 3, unlockWave: 8,
  tags: ['ground', 'ranged', 'precision'], detectRange: 60, attack: { type: 'ranged', damage: 18, range: 50, cooldown: 3.0, preferredRange: 24, projectile: { speed: 60, color: 0xff3df0, shape: 'shard', scale: 1.1, radius: 0.18, lifetime: 4 } }, description: 'A sniper firing fast leading shots from long range.' });
E({ id: 'strafer2', name: 'Strafer', behavior: 'strafer', shape: 'drone', color: 0x29e7ff, accent: 0xffffff, scale: 1, orientYaw: false,
  health: 28, speed: 5.0, contactDamage: 6, radius: 0.45, height: 0.9, flying: true, hoverHeight: 3.0, xp: 3, currency: { min: 1, max: 3 }, weight: 5, tier: 3, unlockWave: 7,
  tags: ['flying', 'ranged'], detectRange: 55, attack: { type: 'ranged', damage: 7, range: 26, cooldown: 1.3, preferredRange: 12, projectile: { speed: 34, color: 0x29e7ff, shape: 'orb', scale: 0.8, radius: 0.18, lifetime: 4 } }, description: 'A strafing drone peppering shots mid-range.' });
E({ id: 'sentry2', name: 'Sentry', behavior: 'sentry', shape: 'orb', color: 0x29e7ff, accent: 0xff3df0, scale: 1, orientYaw: false,
  health: 42, speed: 1.0, contactDamage: 6, radius: 0.5, height: 1.0, flying: true, hoverHeight: 2.5, xp: 3, currency: { min: 1, max: 3 }, weight: 4, tier: 3, unlockWave: 9,
  tags: ['flying', 'ranged', 'burst'], detectRange: 55, attack: { type: 'ranged', damage: 6, range: 30, cooldown: 2.4, preferredRange: 16, projectile: { speed: 38, color: 0x29e7ff, shape: 'orb', scale: 0.8, radius: 0.18, lifetime: 4 } }, description: 'A stationary sentry firing triple bursts.' });
E({ id: 'dodger2', name: 'Phantom', behavior: 'dodger', shape: 'ghost', color: 0xff66cc, accent: 0xffffff, scale: 1, orientYaw: false,
  health: 34, speed: 5.0, contactDamage: 8, radius: 0.5, height: 1.2, flying: true, hoverHeight: 2.0, xp: 4, currency: { min: 1, max: 3 }, weight: 4, tier: 3, unlockWave: 10,
  tags: ['flying', 'ranged', 'evasive'], detectRange: 50, attack: { type: 'ranged', damage: 7, range: 22, cooldown: 1.6, preferredRange: 14, projectile: { speed: 36, color: 0xff3df0, shape: 'orb', scale: 0.8, radius: 0.18, lifetime: 4 } }, description: 'A phantom with erratic dashes, hard to track.' });
E({ id: 'turret2', name: 'Bunker', behavior: 'turret', shape: 'tank', color: 0x5577aa, accent: 0xff3df0, scale: 0.9, orientYaw: true,
  health: 75, speed: 0.5, contactDamage: 6, radius: 0.7, height: 1.2, armor: 6, xp: 4, currency: { min: 2, max: 4 }, weight: 3, tier: 3, unlockWave: 11,
  tags: ['ground', 'ranged', 'armored'], detectRange: 50, attack: { type: 'ranged', damage: 8, range: 30, cooldown: 1.1, preferredRange: 20, projectile: { speed: 32, color: 0xff3df0, shape: 'orb', scale: 1, radius: 0.22, lifetime: 4 } }, description: 'A heavily armored emplacement. Flank or burst it.' });
E({ id: 'orbiter2', name: 'Orbiter', behavior: 'orbiter', shape: 'drone', color: 0x66ffaa, accent: 0xffffff, scale: 0.9, orientYaw: false,
  health: 26, speed: 5.0, contactDamage: 6, radius: 0.4, height: 0.8, flying: true, hoverHeight: 2.6, xp: 3, currency: { min: 1, max: 3 }, weight: 4, tier: 3, unlockWave: 10,
  tags: ['flying', 'ranged'], detectRange: 50, attack: { type: 'ranged', damage: 6, range: 24, cooldown: 1.4, preferredRange: 7, projectile: { speed: 30, color: 0x29e7ff, shape: 'orb', scale: 0.8, radius: 0.18, lifetime: 4 } }, description: 'An orbiter circling the player firing inward.' });
E({ id: 'cryomancer2', name: 'Cryomancer', behavior: 'shooter', shape: 'humanoid', color: 0x9fe7ff, accent: 0xffffff, scale: 1, orientYaw: true,
  health: 40, speed: 3.0, contactDamage: 8, radius: 0.5, height: 1.4, xp: 4, currency: { min: 1, max: 3 }, weight: 3, tier: 3, unlockWave: 12,
  tags: ['ground', 'ranged', 'status'], detectRange: 55, attack: { type: 'ranged', damage: 7, range: 28, cooldown: 1.8, preferredRange: 12, projectile: { speed: 28, color: 0x9fe7ff, shape: 'orb', scale: 1, radius: 0.24, lifetime: 4 } }, contactStatus: { chance: 0.4, type: StatusType.Slow, power: 1 }, description: 'A cryomancer firing frost bolts that chill and slow.' });
E({ id: 'pyromancer2', name: 'Pyromancer', behavior: 'shooter', shape: 'humanoid', color: 0xff6633, accent: 0xffe066, scale: 1, orientYaw: true,
  health: 40, speed: 3.0, contactDamage: 8, radius: 0.5, height: 1.4, xp: 4, currency: { min: 1, max: 3 }, weight: 3, tier: 3, unlockWave: 12,
  tags: ['ground', 'ranged', 'status'], detectRange: 55, attack: { type: 'ranged', damage: 6, range: 26, cooldown: 1.5, preferredRange: 12, projectile: { speed: 26, color: 0xff6633, shape: 'orb', scale: 1, radius: 0.24, lifetime: 4 } }, contactStatus: { chance: 0.4, type: StatusType.Burn, power: 1 }, description: 'A pyromancer hurling fire that ignites on hit.' });
E({ id: 'healer3', name: 'Mender', behavior: 'healer', shape: 'humanoid', color: 0x4fd07a, accent: 0xffffff, scale: 1, orientYaw: true,
  health: 45, speed: 3.2, contactDamage: 6, radius: 0.5, height: 1.4, xp: 5, currency: { min: 2, max: 4 }, weight: 2, tier: 3, unlockWave: 11,
  tags: ['ground', 'support'], detectRange: 50, description: 'A mender healing nearby allies. Kill it first.' });
E({ id: 'shielder3', name: 'Bulwark', behavior: 'shielder', shape: 'humanoid', color: 0x4aa3ff, accent: 0xffffff, scale: 1.1, orientYaw: true,
  health: 55, speed: 3.0, contactDamage: 8, radius: 0.55, height: 1.5, armor: 2, xp: 5, currency: { min: 2, max: 4 }, weight: 2, tier: 3, unlockWave: 12,
  tags: ['ground', 'support'], detectRange: 45, description: 'A bulwark granting armor to nearby allies.' });
E({ id: 'summoner3', name: 'Conjurer', behavior: 'summoner', shape: 'humanoid', color: 0xb266ff, accent: 0xff3df0, scale: 1.1, orientYaw: true,
  health: 65, speed: 2.6, contactDamage: 8, radius: 0.55, height: 1.5, xp: 6, currency: { min: 2, max: 5 }, weight: 2, tier: 4, unlockWave: 13,
  tags: ['ground', 'support', 'summoner'], detectRange: 50, description: 'A conjurer spawning swarmlings. Never leave it alive.' });
E({ id: 'swarmLord2', name: 'Hive Lord', behavior: 'swarmLord', shape: 'blob', color: 0xff66aa, accent: 0xffe066, scale: 1.6, orientYaw: false,
  health: 150, speed: 3.0, contactDamage: 14, radius: 0.9, height: 1.6, armor: 3, xp: 10, currency: { min: 4, max: 8 }, weight: 1, tier: 4, unlockWave: 14,
  tags: ['ground', 'support', 'summoner', 'elite'], detectRange: 55, eliteHealthMult: 2.2, description: 'A hive lord drowning the arena in swarmlings.' });
E({ id: 'tank2', name: 'Juggernaut', behavior: 'tank', shape: 'tank', color: 0x8a5bff, accent: 0xff3df0, scale: 1.4, orientYaw: true,
  health: 230, speed: 2.2, contactDamage: 15, radius: 0.9, height: 1.6, armor: 10, shield: 60, xp: 12, currency: { min: 5, max: 10 }, weight: 1, tier: 4, unlockWave: 15,
  tags: ['ground', 'heavy', 'slam', 'armored'], detectRange: 40, description: 'A walking fortress with shields and a shockwave slam.' });
