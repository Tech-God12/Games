// ============================================================================
// casters.js — Ranged caster enemies: elemental specialists, summoners, and
// support casters that pressure from distance and demand target priority.
// ============================================================================

import { EnemyRegistry } from '../EnemyRegistry.js';
import { StatusType, DamageType } from '../../ecs/components/Combat.js';

const E = (def) => EnemyRegistry.register(def);

E({ id: 'fireMage', name: 'Fire Mage', behavior: 'shooter', shape: 'humanoid', color: 0xff5522, accent: 0xffe066, scale: 1.1, orientYaw: true,
  health: 50, speed: 2.8, contactDamage: 8, radius: 0.55, height: 1.5, xp: 5, currency: { min: 2, max: 4 }, weight: 3, tier: 3, unlockWave: 10,
  tags: ['ground', 'ranged', 'status'], detectRange: 55,
  attack: { type: 'ranged', damage: 10, range: 30, cooldown: 1.6, preferredRange: 16, projectile: { speed: 28, color: 0xff5522, shape: 'orb', scale: 1.2, radius: 0.26, lifetime: 4 } },
  contactStatus: { chance: 0.5, type: StatusType.Burn, power: 2 }, description: 'A fire mage hurling ignite orbs.' });
E({ id: 'iceMage', name: 'Ice Mage', behavior: 'shooter', shape: 'humanoid', color: 0x9fe7ff, accent: 0xffffff, scale: 1.1, orientYaw: true,
  health: 50, speed: 2.8, contactDamage: 8, radius: 0.55, height: 1.5, xp: 5, currency: { min: 2, max: 4 }, weight: 3, tier: 3, unlockWave: 10,
  tags: ['ground', 'ranged', 'status'], detectRange: 55,
  attack: { type: 'ranged', damage: 9, range: 30, cooldown: 1.6, preferredRange: 16, projectile: { speed: 28, color: 0x9fe7ff, shape: 'orb', scale: 1.2, radius: 0.26, lifetime: 4 } },
  contactStatus: { chance: 0.5, type: StatusType.Slow, power: 2 }, description: 'An ice mage lobbing frost orbs.' });
E({ id: 'stormMage', name: 'Storm Mage', behavior: 'shooter', shape: 'humanoid', color: 0xffe066, accent: 0x29e7ff, scale: 1.1, orientYaw: true,
  health: 50, speed: 2.8, contactDamage: 8, radius: 0.55, height: 1.5, xp: 5, currency: { min: 2, max: 4 }, weight: 3, tier: 3, unlockWave: 10,
  tags: ['ground', 'ranged', 'status'], detectRange: 55,
  attack: { type: 'ranged', damage: 10, range: 30, cooldown: 1.4, preferredRange: 16, projectile: { speed: 36, color: 0xffe066, shape: 'shard', scale: 1.1, radius: 0.22, lifetime: 4 } },
  contactStatus: { chance: 0.5, type: StatusType.Shock, power: 1 }, description: 'A storm mage firing shock shards.' });
E({ id: 'voidMage', name: 'Void Mage', behavior: 'shooter', shape: 'humanoid', color: 0x8a5bff, accent: 0xff3df0, scale: 1.1, orientYaw: true,
  health: 60, speed: 2.6, contactDamage: 10, radius: 0.55, height: 1.5, xp: 6, currency: { min: 2, max: 5 }, weight: 2, tier: 4, unlockWave: 13,
  tags: ['ground', 'ranged', 'status', 'elite'], detectRange: 60, eliteHealthMult: 1.5,
  attack: { type: 'ranged', damage: 14, range: 38, cooldown: 1.4, preferredRange: 20, projectile: { speed: 36, color: 0x8a5bff, shape: 'shard', scale: 1.3, radius: 0.26, lifetime: 5 } },
  contactStatus: { chance: 0.4, type: StatusType.Mark, power: 2 }, description: 'A void mage that marks and barrages.' });
E({ id: 'plagueCaster', name: 'Plague Caster', behavior: 'shooter', shape: 'humanoid', color: 0x66ff44, accent: 0x223322, scale: 1.1, orientYaw: true,
  health: 55, speed: 2.6, contactDamage: 10, radius: 0.55, height: 1.5, xp: 6, currency: { min: 2, max: 4 }, weight: 2, tier: 4, unlockWave: 12,
  tags: ['ground', 'ranged', 'status'], detectRange: 55,
  attack: { type: 'ranged', damage: 9, range: 28, cooldown: 1.4, preferredRange: 14, projectile: { speed: 26, color: 0x66ff44, shape: 'orb', scale: 1.2, radius: 0.26, lifetime: 4 } },
  contactStatus: { chance: 0.6, type: StatusType.Poison, power: 2 }, description: 'A plague caster spreading poison.' });
E({ id: 'bloodCaster', name: 'Blood Caster', behavior: 'shooter', shape: 'humanoid', color: 0xff3df0, accent: 0x8a5bff, scale: 1.1, orientYaw: true,
  health: 58, speed: 2.6, contactDamage: 10, radius: 0.55, height: 1.5, xp: 6, currency: { min: 2, max: 4 }, weight: 2, tier: 4, unlockWave: 12,
  tags: ['ground', 'ranged', 'status'], detectRange: 55,
  attack: { type: 'ranged', damage: 11, range: 30, cooldown: 1.5, preferredRange: 16, projectile: { speed: 30, color: 0xff3df0, shape: 'orb', scale: 1.2, radius: 0.26, lifetime: 4 } },
  contactStatus: { chance: 0.5, type: StatusType.Bleed, power: 2 }, description: 'A blood caster causing hemorrhage.' });
E({ id: 'arcCaster', name: 'Arc Caster', behavior: 'shooter', shape: 'humanoid', color: 0x29e7ff, accent: 0xffe066, scale: 1.1, orientYaw: true,
  health: 52, speed: 2.8, contactDamage: 8, radius: 0.55, height: 1.5, xp: 5, currency: { min: 2, max: 4 }, weight: 3, tier: 3, unlockWave: 11,
  tags: ['ground', 'ranged', 'status'], detectRange: 55,
  attack: { type: 'ranged', damage: 9, range: 28, cooldown: 1.3, preferredRange: 14, projectile: { speed: 40, color: 0x29e7ff, shape: 'shard', scale: 1, radius: 0.2, lifetime: 4 } },
  contactStatus: { chance: 0.4, type: StatusType.Shock, power: 1 }, description: 'An arc caster firing rapid shards.' });
E({ id: 'frostCaster', name: 'Frost Caster', behavior: 'shooter', shape: 'humanoid', color: 0xbfe9ff, accent: 0xffffff, scale: 1.1, orientYaw: true,
  health: 54, speed: 2.6, contactDamage: 8, radius: 0.55, height: 1.5, xp: 5, currency: { min: 2, max: 4 }, weight: 3, tier: 3, unlockWave: 11,
  tags: ['ground', 'ranged', 'status', 'control'], detectRange: 55,
  attack: { type: 'ranged', damage: 8, range: 26, cooldown: 1.5, preferredRange: 14, projectile: { speed: 28, color: 0xbfe9ff, shape: 'orb', scale: 1.2, radius: 0.26, lifetime: 4 } },
  contactStatus: { chance: 0.5, type: StatusType.Freeze, power: 1 }, description: 'A frost caster that freezes on hit.' });
E({ id: 'emberCaster', name: 'Ember Caster', behavior: 'shooter', shape: 'humanoid', color: 0xff7733, accent: 0xffe066, scale: 1.1, orientYaw: true,
  health: 54, speed: 2.6, contactDamage: 8, radius: 0.55, height: 1.5, xp: 5, currency: { min: 2, max: 4 }, weight: 3, tier: 3, unlockWave: 11,
  tags: ['ground', 'ranged', 'status'], detectRange: 55,
  attack: { type: 'ranged', damage: 9, range: 28, cooldown: 1.4, preferredRange: 14, projectile: { speed: 28, color: 0xff7733, shape: 'orb', scale: 1.2, radius: 0.26, lifetime: 4 } },
  contactStatus: { chance: 0.5, type: StatusType.Burn, power: 2 }, description: 'An ember caster igniting foes.' });
E({ id: 'curseCaster', name: 'Curse Caster', behavior: 'shooter', shape: 'humanoid', color: 0xb266ff, accent: 0xff3df0, scale: 1.2, orientYaw: true,
  health: 70, speed: 2.4, contactDamage: 10, radius: 0.6, height: 1.6, xp: 7, currency: { min: 3, max: 5 }, weight: 2, tier: 4, unlockWave: 14,
  tags: ['ground', 'ranged', 'status', 'elite'], detectRange: 60, eliteHealthMult: 1.4,
  attack: { type: 'ranged', damage: 12, range: 34, cooldown: 1.6, preferredRange: 18, projectile: { speed: 32, color: 0xb266ff, shape: 'shard', scale: 1.3, radius: 0.26, lifetime: 5 } },
  contactStatus: { chance: 0.5, type: StatusType.Mark, power: 2 }, description: 'A curse caster marking targets for death.' });
E({ id: 'summoner2', name: 'Conjurer', behavior: 'summoner', shape: 'humanoid', color: 0x8a5bff, accent: 0xff3df0, scale: 1.2, orientYaw: true,
  health: 80, speed: 2.4, contactDamage: 10, radius: 0.6, height: 1.6, xp: 8, currency: { min: 3, max: 6 }, weight: 2, tier: 4, unlockWave: 13,
  tags: ['ground', 'support', 'summoner', 'elite'], detectRange: 55, eliteHealthMult: 1.4, description: 'A conjurer spawning swarmlings relentlessly.' });
E({ id: 'warlock2', name: 'Warlock', behavior: 'summoner', shape: 'humanoid', color: 0x66ff44, accent: 0xffe066, scale: 1.3, orientYaw: true,
  health: 100, speed: 2.2, contactDamage: 10, radius: 0.65, height: 1.7, xp: 10, currency: { min: 3, max: 6 }, weight: 1, tier: 4, unlockWave: 15,
  tags: ['ground', 'support', 'summoner', 'elite'], detectRange: 55, eliteHealthMult: 1.5, description: 'A warlock summoning waves of minions.' });
E({ id: 'healer2', name: 'Mender', behavior: 'healer', shape: 'humanoid', color: 0x4fd07a, accent: 0xffffff, scale: 1.1, orientYaw: true,
  health: 55, speed: 3.2, contactDamage: 6, radius: 0.55, height: 1.5, xp: 6, currency: { min: 2, max: 4 }, weight: 2, tier: 3, unlockWave: 11,
  tags: ['ground', 'support'], detectRange: 50, description: 'A mender healing the front line.' });
E({ id: 'shielder2', name: 'Bulwark', behavior: 'shielder', shape: 'humanoid', color: 0x4aa3ff, accent: 0xffffff, scale: 1.2, orientYaw: true,
  health: 65, speed: 3.0, contactDamage: 8, radius: 0.6, height: 1.6, armor: 2, xp: 6, currency: { min: 2, max: 4 }, weight: 2, tier: 3, unlockWave: 12,
  tags: ['ground', 'support'], detectRange: 45, description: 'A bulwark projecting armor to allies.' });
E({ id: 'enhancer', name: 'Enhancer', behavior: 'healer', shape: 'humanoid', color: 0xffb347, accent: 0xffe066, scale: 1.1, orientYaw: true,
  health: 60, speed: 3.0, contactDamage: 8, radius: 0.55, height: 1.5, xp: 7, currency: { min: 2, max: 5 }, weight: 2, tier: 4, unlockWave: 14,
  tags: ['ground', 'support', 'elite'], detectRange: 50, eliteHealthMult: 1.4, description: 'An enhancer buffing nearby enemies\' speed and damage.' });
