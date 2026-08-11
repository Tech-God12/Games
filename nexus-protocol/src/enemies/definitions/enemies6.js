// ============================================================================
// enemies6.js — Champion & miniboss-grade enemies: rare, very tough spawns
// that act as wave anchors. High stats, elite flags, and special behaviors.
// ============================================================================

import { EnemyRegistry } from '../EnemyRegistry.js';
import { StatusType, DamageType } from '../../ecs/components/Combat.js';

const E = (def) => EnemyRegistry.register(def);

E({ id: 'champion2', name: 'Blade Champion', behavior: 'fastChaser', shape: 'humanoid', color: 0xffd24a, accent: 0xff3df0, scale: 1.6, orientYaw: true,
  health: 130, speed: 6.5, contactDamage: 20, radius: 0.7, height: 1.8, armor: 4, xp: 14, currency: { min: 5, max: 10 }, weight: 1, tier: 4, unlockWave: 16,
  tags: ['ground', 'fast', 'elite'], detectRange: 55, eliteHealthMult: 1.5, description: 'A blade champion. Fast, armored, lethal.' });
E({ id: 'warlord', name: 'Warlord', behavior: 'brute', shape: 'humanoid', color: 0xff5544, accent: 0xffe066, scale: 1.8, orientYaw: true,
  health: 200, speed: 3.0, contactDamage: 22, radius: 0.85, height: 2.2, armor: 8, xp: 18, currency: { min: 6, max: 12 }, weight: 1, tier: 4, unlockWave: 17,
  tags: ['ground', 'heavy', 'slam', 'elite'], detectRange: 45, eliteHealthMult: 1.6, description: 'A warlord. A brutal mini-boss.' });
E({ id: 'archmage', name: 'Archmage', behavior: 'shooter', shape: 'humanoid', color: 0xb266ff, accent: 0xff3df0, scale: 1.5, orientYaw: true,
  health: 150, speed: 2.8, contactDamage: 12, radius: 0.65, height: 1.7, xp: 16, currency: { min: 5, max: 10 }, weight: 1, tier: 4, unlockWave: 18,
  tags: ['ground', 'ranged', 'status', 'elite'], detectRange: 60, eliteHealthMult: 1.5,
  attack: { type: 'ranged', damage: 16, range: 44, cooldown: 1.2, preferredRange: 22, projectile: { speed: 38, color: 0xb266ff, shape: 'shard', scale: 1.3, radius: 0.26, lifetime: 5 } },
  contactStatus: { chance: 0.5, type: StatusType.Mark, power: 2 }, description: 'An archmage. Barrages from range and marks.' });
E({ id: 'reaver2', name: 'Reaver', behavior: 'fastChaser', shape: 'shard', color: 0xff3df0, accent: 0x8a5bff, scale: 1.2, orientYaw: true,
  health: 95, speed: 9.5, contactDamage: 20, radius: 0.5, height: 1.3, flying: true, hoverHeight: 2.0, xp: 13, currency: { min: 4, max: 8 }, weight: 1, tier: 4, unlockWave: 17,
  tags: ['flying', 'fast', 'elite'], detectRange: 60, eliteHealthMult: 1.3, description: 'A reaver. Dives at terrifying speed.' });
E({ id: 'overseer2', name: 'Overseer', behavior: 'turret', shape: 'orb', color: 0xffb347, accent: 0xff3df0, scale: 1.5, orientYaw: false,
  health: 110, speed: 0.5, contactDamage: 10, radius: 0.8, height: 1.3, flying: true, hoverHeight: 6.5, xp: 13, currency: { min: 4, max: 8 }, weight: 1, tier: 4, unlockWave: 18,
  tags: ['flying', 'ranged', 'aoe', 'elite'], detectRange: 65, eliteHealthMult: 1.5,
  attack: { type: 'ranged', damage: 24, range: 58, cooldown: 2.0, preferredRange: 28, projectile: { speed: 26, gravity: 1.2, color: 0xffb347, shape: 'chunky', scale: 1.5, radius: 0.3, lifetime: 5 } },
  glowPulse: { base: 1.2, amplitude: 0.6, speed: 1.5 }, description: 'An overseer. Rains heavy mortars from altitude.' });
E({ id: 'warden2', name: 'Warden', behavior: 'shielder', shape: 'humanoid', color: 0x29e7ff, accent: 0xffffff, scale: 1.5, orientYaw: true,
  health: 120, speed: 2.8, contactDamage: 12, radius: 0.7, height: 1.8, armor: 6, shield: 40, xp: 12, currency: { min: 4, max: 8 }, weight: 1, tier: 4, unlockWave: 17,
  tags: ['ground', 'support', 'armored', 'elite'], detectRange: 45, eliteHealthMult: 1.5, description: 'A warden. Shields itself and grants armor to allies.' });
E({ id: 'mender2', name: 'High Mender', behavior: 'healer', shape: 'humanoid', color: 0x4fd07a, accent: 0xffffff, scale: 1.4, orientYaw: true,
  health: 90, speed: 3.4, contactDamage: 8, radius: 0.65, height: 1.7, xp: 12, currency: { min: 4, max: 8 }, weight: 1, tier: 4, unlockWave: 17,
  tags: ['ground', 'support', 'elite'], detectRange: 55, eliteHealthMult: 1.4, description: 'A high mender. Heals aggressively; kill it first.' });
E({ id: 'swarmQueen', name: 'Swarm Queen', behavior: 'summoner', shape: 'blob', color: 0xff66aa, accent: 0xffe066, scale: 1.8, orientYaw: false,
  health: 180, speed: 2.6, contactDamage: 16, radius: 0.9, height: 1.8, xp: 16, currency: { min: 5, max: 10 }, weight: 1, tier: 4, unlockWave: 18,
  tags: ['ground', 'support', 'summoner', 'elite'], detectRange: 55, eliteHealthMult: 1.5, description: 'A swarm queen. Floods the arena with swarmlings.' });
E({ id: 'frostTitan', name: 'Frost Titan', behavior: 'brute', shape: 'humanoid', color: 0x9fe7ff, accent: 0xffffff, scale: 2.0, orientYaw: true,
  health: 220, armor: 6, speed: 2.8, contactDamage: 22, radius: 0.95, height: 2.4, xp: 16, currency: { min: 5, max: 10 }, weight: 1, tier: 4, unlockWave: 18,
  tags: ['ground', 'heavy', 'status', 'elite'], detectRange: 40, eliteHealthMult: 1.6,
  contactStatus: { chance: 0.5, type: StatusType.Freeze, power: 1 }, description: 'A frost titan. Freezes with its slam.' });
E({ id: 'infernoTitan', name: 'Inferno Titan', behavior: 'brute', shape: 'humanoid', color: 0xff5522, accent: 0xffe066, scale: 2.0, orientYaw: true,
  health: 220, armor: 4, speed: 3.0, contactDamage: 24, radius: 0.95, height: 2.4, xp: 16, currency: { min: 5, max: 10 }, weight: 1, tier: 4, unlockWave: 18,
  tags: ['ground', 'heavy', 'status', 'elite'], detectRange: 40, eliteHealthMult: 1.6,
  contactStatus: { chance: 0.5, type: StatusType.Burn, power: 2 }, description: 'An inferno titan. Ignites with its slam.' });
E({ id: 'voidAssassin2', name: 'Void Assassin', behavior: 'dodger', shape: 'ghost', color: 0x8a5bff, accent: 0xff3df0, scale: 1.3, orientYaw: false,
  health: 100, speed: 7.5, contactDamage: 18, radius: 0.55, height: 1.4, flying: true, hoverHeight: 2.2, xp: 14, currency: { min: 4, max: 9 }, weight: 1, tier: 4, unlockWave: 18,
  tags: ['flying', 'evasive', 'ranged', 'elite'], detectRange: 60, resistances: { kinetic: 0.5, energy: 0.2 }, eliteHealthMult: 1.3,
  attack: { type: 'ranged', damage: 16, range: 32, cooldown: 1.0, preferredRange: 16, projectile: { speed: 46, color: 0x8a5bff, shape: 'shard', scale: 1, radius: 0.2, lifetime: 4 } },
  description: 'A void assassin. Dodges, resists kinetics, and barrages.' });
E({ id: 'steelBehemoth', name: 'Steel Behemoth', behavior: 'tank', shape: 'tank', color: 0x5577aa, accent: 0xff3df0, scale: 2.0, orientYaw: true,
  health: 300, armor: 16, shield: 80, speed: 2.0, contactDamage: 24, radius: 1.0, height: 2.6, xp: 20, currency: { min: 6, max: 12 }, weight: 1, tier: 4, unlockWave: 20,
  tags: ['ground', 'heavy', 'armored', 'elite'], detectRange: 40, eliteHealthMult: 1.5,
  attack: { type: 'ranged', damage: 18, range: 32, cooldown: 1.6, preferredRange: 16, projectile: { speed: 30, color: 0xff3df0, shape: 'orb', scale: 1.4, radius: 0.32, lifetime: 4 } },
  description: 'A steel behemoth. The apex of armored ground units.' });
