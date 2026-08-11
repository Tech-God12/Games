// ============================================================================
// flying4.js — More flying enemies: elite air units, support drones, and
// exotic aerial threats for mid-to-late waves.
// ============================================================================

import { EnemyRegistry } from '../EnemyRegistry.js';
import { StatusType, DamageType } from '../../ecs/components/Combat.js';

const E = (def) => EnemyRegistry.register(def);

E({ id: 'hunterDrone', name: 'Hunter Drone', behavior: 'fastChaser', shape: 'drone', color: 0xff5544, accent: 0xffe066, scale: 1, orientYaw: false,
  health: 38, speed: 7.5, contactDamage: 12, radius: 0.45, height: 0.9, flying: true, hoverHeight: 2.4, xp: 4, currency: { min: 1, max: 3 }, weight: 3, tier: 3, unlockWave: 9,
  tags: ['flying', 'fast'], detectRange: 55, description: 'A hunter drone. Dives at high speed.' });
E({ id: 'gunship2', name: 'Gunship', behavior: 'orbiter', shape: 'drone', color: 0x5577aa, accent: 0xff3df0, scale: 1.4, orientYaw: false,
  health: 70, speed: 3.8, contactDamage: 10, radius: 0.65, height: 1.0, flying: true, hoverHeight: 3.5, xp: 6, currency: { min: 2, max: 5 }, weight: 2, tier: 4, unlockWave: 13,
  tags: ['flying', 'ranged', 'elite'], detectRange: 55, eliteHealthMult: 1.5,
  attack: { type: 'ranged', damage: 10, range: 28, cooldown: 0.9, preferredRange: 10, projectile: { speed: 34, color: 0x5577aa, shape: 'orb', scale: 1, radius: 0.22, lifetime: 4 } },
  description: 'A heavy gunship orbiting with sustained fire.' });
E({ id: 'voidRay2', name: 'Void Ray', behavior: 'strafer', shape: 'orb', color: 0x8a5bff, accent: 0xff3df0, scale: 1.2, orientYaw: false,
  health: 60, speed: 4.8, contactDamage: 10, radius: 0.6, height: 1.0, flying: true, hoverHeight: 3.4, xp: 5, currency: { min: 2, max: 4 }, weight: 2, tier: 4, unlockWave: 12,
  tags: ['flying', 'ranged', 'elite'], detectRange: 55, eliteHealthMult: 1.4,
  attack: { type: 'ranged', damage: 12, range: 32, cooldown: 1.0, preferredRange: 14, projectile: { speed: 40, color: 0x8a5bff, shape: 'shard', scale: 1, radius: 0.2, lifetime: 4 } },
  glowPulse: { base: 1, amplitude: 0.7, speed: 2 }, description: 'A void ray that strafes with rapid shard fire.' });
E({ id: 'phoenix2', name: 'Phoenix', behavior: 'shooter', shape: 'drone', color: 0xff7733, accent: 0xffe066, scale: 1.3, orientYaw: false,
  health: 65, speed: 4.0, contactDamage: 12, radius: 0.6, height: 1.1, flying: true, hoverHeight: 3.6, xp: 6, currency: { min: 2, max: 5 }, weight: 2, tier: 4, unlockWave: 14,
  tags: ['flying', 'ranged', 'status', 'elite'], detectRange: 60, eliteHealthMult: 1.4,
  attack: { type: 'ranged', damage: 12, range: 36, cooldown: 1.3, preferredRange: 16, projectile: { speed: 30, color: 0xff7733, shape: 'orb', scale: 1.2, radius: 0.28, lifetime: 4 } },
  contactStatus: { chance: 0.3, type: StatusType.Burn, power: 1 }, glowPulse: { base: 1.2, amplitude: 0.6, speed: 2 }, description: 'A fiery phoenix raining burning bolts.' });
E({ id: 'frostPhoenix', name: 'Frost Phoenix', behavior: 'shooter', shape: 'drone', color: 0x9fe7ff, accent: 0xffffff, scale: 1.3, orientYaw: false,
  health: 65, speed: 4.0, contactDamage: 12, radius: 0.6, height: 1.1, flying: true, hoverHeight: 3.6, xp: 6, currency: { min: 2, max: 5 }, weight: 2, tier: 4, unlockWave: 14,
  tags: ['flying', 'ranged', 'status', 'elite'], detectRange: 60, eliteHealthMult: 1.4,
  attack: { type: 'ranged', damage: 12, range: 36, cooldown: 1.3, preferredRange: 16, projectile: { speed: 30, color: 0x9fe7ff, shape: 'orb', scale: 1.2, radius: 0.28, lifetime: 4 } },
  contactStatus: { chance: 0.3, type: StatusType.Slow, power: 1 }, description: 'A frost phoenix raining chilling bolts.' });
E({ id: 'stormPhoenix', name: 'Storm Phoenix', behavior: 'shooter', shape: 'drone', color: 0xffe066, accent: 0x29e7ff, scale: 1.3, orientYaw: false,
  health: 65, speed: 4.0, contactDamage: 12, radius: 0.6, height: 1.1, flying: true, hoverHeight: 3.6, xp: 6, currency: { min: 2, max: 5 }, weight: 2, tier: 4, unlockWave: 14,
  tags: ['flying', 'ranged', 'status', 'elite'], detectRange: 60, eliteHealthMult: 1.4,
  attack: { type: 'ranged', damage: 12, range: 36, cooldown: 1.2, preferredRange: 16, projectile: { speed: 34, color: 0xffe066, shape: 'shard', scale: 1.1, radius: 0.24, lifetime: 4 } },
  contactStatus: { chance: 0.3, type: StatusType.Shock, power: 1 }, description: 'A storm phoenix raining shock shards.' });
E({ id: 'orbWeaver', name: 'Orb Weaver', behavior: 'orbiter', shape: 'drone', color: 0x4fffd0, accent: 0xffffff, scale: 1.1, orientYaw: false,
  health: 45, speed: 5.2, contactDamage: 8, radius: 0.5, height: 0.9, flying: true, hoverHeight: 2.8, xp: 4, currency: { min: 1, max: 3 }, weight: 3, tier: 3, unlockWave: 10,
  tags: ['flying', 'ranged'], detectRange: 50,
  attack: { type: 'ranged', damage: 8, range: 24, cooldown: 1.2, preferredRange: 8, projectile: { speed: 32, color: 0x4fffd0, shape: 'orb', scale: 0.8, radius: 0.18, lifetime: 4 } },
  description: 'An orb weaver that orbits and peppers shots.' });
E({ id: 'voidEye2', name: 'Void Eye', behavior: 'orbiter', shape: 'orb', color: 0x8a5bff, accent: 0xff3df0, scale: 1.3, orientYaw: false,
  health: 90, speed: 4.0, contactDamage: 12, radius: 0.7, height: 1.2, flying: true, hoverHeight: 3.5, xp: 7, currency: { min: 3, max: 6 }, weight: 2, tier: 4, unlockWave: 15,
  tags: ['flying', 'ranged', 'elite'], detectRange: 55, eliteHealthMult: 1.4,
  attack: { type: 'ranged', damage: 12, range: 30, cooldown: 1.0, preferredRange: 8, projectile: { speed: 34, color: 0x8a5bff, shape: 'orb', scale: 1.2, radius: 0.3, lifetime: 4 } },
  glowPulse: { base: 1, amplitude: 0.7, speed: 1.5 }, description: 'A looming void eye that orbits and barrages.' });
E({ id: 'reaper3', name: 'Reaper', behavior: 'fastChaser', shape: 'shard', color: 0xff3df0, accent: 0x8a5bff, scale: 1.1, orientYaw: true,
  health: 50, speed: 9.0, contactDamage: 16, radius: 0.45, height: 1.2, flying: true, hoverHeight: 2.0, xp: 5, currency: { min: 2, max: 4 }, weight: 2, tier: 4, unlockWave: 14,
  tags: ['flying', 'fast', 'elite'], detectRange: 55, eliteHealthMult: 1.3, description: 'A diving reaper that closes terrifyingly fast.' });
E({ id: 'artillery2', name: 'Artillery Eye', behavior: 'turret', shape: 'orb', color: 0xff5544, accent: 0xffe066, scale: 1.4, orientYaw: false,
  health: 90, speed: 0.4, contactDamage: 8, radius: 0.75, height: 1.2, flying: true, hoverHeight: 7, xp: 7, currency: { min: 3, max: 6 }, weight: 2, tier: 4, unlockWave: 15,
  tags: ['flying', 'ranged', 'aoe', 'elite'], detectRange: 65, eliteHealthMult: 1.5,
  attack: { type: 'ranged', damage: 22, range: 55, cooldown: 2.2, preferredRange: 25, projectile: { speed: 26, gravity: 1.2, color: 0xff5544, shape: 'chunky', scale: 1.5, radius: 0.3, lifetime: 5 } },
  glowPulse: { base: 1, amplitude: 0.6, speed: 1.5 }, description: 'A hovering artillery eye raining heavy mortars.' });
E({ id: 'stormCaller', name: 'Stormcaller', behavior: 'sentry', shape: 'orb', color: 0xffe066, accent: 0x29e7ff, scale: 1.4, orientYaw: false,
  health: 85, speed: 1.0, contactDamage: 10, radius: 0.7, height: 1.2, flying: true, hoverHeight: 5, xp: 8, currency: { min: 3, max: 6 }, weight: 2, tier: 4, unlockWave: 16,
  tags: ['flying', 'ranged', 'status', 'elite'], detectRange: 60, eliteHealthMult: 1.4,
  attack: { type: 'ranged', damage: 12, range: 40, cooldown: 1.6, preferredRange: 22, projectile: { speed: 40, color: 0xffe066, shape: 'shard', scale: 1.2, radius: 0.24, lifetime: 4 } },
  contactStatus: { chance: 0.4, type: StatusType.Shock, power: 1 }, glowPulse: { base: 1.2, amplitude: 0.7, speed: 2 }, description: 'A stormcaller saturating the sky with shock shards.' });
