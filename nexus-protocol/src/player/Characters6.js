// ============================================================================
// Characters6.js — Additional operatives to round the roster past 40.
// ============================================================================

import { CharacterRegistry } from './Characters.js';

const C = (def) => CharacterRegistry.register(def);

C({ id: 'wraith2', name: 'Wraith', color: 0x88aaff, accent: 0xff3df0,
  startMaxHP: 75, startSpeed: 7.6, startWeapons: ['blade', 'sniper'],
  ability: 'phaseWalk', passive: { id: 'phase', name: 'Phasing', description: 'Dash grants 1s i-frames and +25% damage for 2s.' },
  description: 'A wraith who phases between kills, fragile but untouchable.', unlock: 36, tags: ['mobility', 'precision'] });
C({ id: 'tactician', name: 'Tactician', color: 0x4aa3ff, accent: 0xffb347,
  startMaxHP: 100, startSpeed: 6.0, startWeapons: ['rifle', 'mineLayer'],
  ability: 'mineField', passive: { id: 'tinker', name: 'Tactician', description: '+25% AoE and mines deal +30% damage.' },
  description: 'A tactician who controls the arena with mines and fire.', unlock: 27, tags: ['tactical', 'aoe'] });
C({ id: 'arsonist2', name: 'Arsonist', color: 0xff5522, accent: 0xffe066,
  startMaxHP: 90, startSpeed: 6.0, startWeapons: ['flamethrower', 'emberRifle'],
  ability: 'infernoBlast', passive: { id: 'attunement', name: 'Pyre', description: '+50% burn power; burning enemies take +30% damage.' },
  description: 'An arsonist who drowns the arena in fire.', unlock: 30, tags: ['fire', 'status'] });
C({ id: 'cryomancer2', name: 'Cryomancer', color: 0x9fe7ff, accent: 0xffffff,
  startMaxHP: 90, startSpeed: 6.0, startWeapons: ['frostbeam', 'frostbite'],
  ability: 'blizzard', passive: { id: 'attunement', name: 'Permafrost', description: '+50% freeze power; frozen enemies take +30% damage.' },
  description: 'A cryomancer who locks the battlefield in ice.', unlock: 30, tags: ['cryo', 'control'] });
C({ id: 'stormcaller4', name: 'Stormcaller', color: 0xffe066, accent: 0x29e7ff,
  startMaxHP: 85, startSpeed: 6.2, startWeapons: ['tesla', 'stormRifle2'],
  ability: 'chainLightning2', passive: { id: 'attunement', name: 'Conduction', description: '+50% shock power; shocked enemies take +30% damage.' },
  description: 'A stormcaller chaining lightning through everything.', unlock: 30, tags: ['shock', 'status'] });
C({ id: 'plagueDoctor', name: 'Plague Doctor', color: 0x66ff44, accent: 0x222222,
  startMaxHP: 95, startSpeed: 6.0, startWeapons: ['plasmaRifle', 'needlerSMG'],
  ability: 'siphon', passive: { id: 'attunement', name: 'Contagion', description: '+40% poison power; poisoned enemies take +25% damage.' },
  description: 'A plague doctor spreading contagion and siphoning life.', unlock: 33, tags: ['poison', 'status', 'sustain'] });
C({ id: 'dreadnought', name: 'Dreadnought', color: 0x5577aa, accent: 0xff3df0,
  startMaxHP: 180, startSpeed: 4.8, startWeapons: ['gatling', 'rotary'],
  startShield: 100, ability: 'aegis2', passive: { id: 'bulwark', name: 'Dreadnought', description: '+10 armor, +80 shield, -20% damage taken.' },
  description: 'A dreadnought. The heaviest operative, a walking fortress.', unlock: 33, tags: ['tank', 'suppression'] });
C({ id: 'trickster', name: 'Trickster', color: 0xff3df0, accent: 0x8a5bff,
  startMaxHP: 80, startSpeed: 7.4, startWeapons: ['boomerang', 'smg2'],
  ability: 'mirrorImage', passive: { id: 'phase', name: 'Trickery', description: 'Dash leaves a decoy; kills reduce dash cooldown.' },
  description: 'A trickster who leaves decoys and never stops moving.', unlock: 36, tags: ['mobility', 'special'] });
C({ id: 'paladin2', name: 'Paladin', color: 0xffd24a, accent: 0x4fd07a,
  startMaxHP: 130, startSpeed: 5.8, startWeapons: ['glaive', 'plasmaRifle'],
  ability: 'sanctuary', passive: { id: 'bulwark', name: 'Sanctify', description: '+5 armor, regen 3 HP/s, lifesteal heals +50%.' },
  description: 'A paladin blending melee, sustain, and holy protection.', unlock: 33, tags: ['melee', 'sustain', 'tank'] });
C({ id: 'archon2', name: 'Archon', color: 0xb266ff, accent: 0x29e7ff,
  startMaxHP: 75, startSpeed: 6.6, startWeapons: ['voidLance', 'voidBeam'],
  ability: 'blackHole', passive: { id: 'attunement', name: 'Voidheart', description: '+30% energy damage, +20% crit damage, dash i-frames +0.2s.' },
  description: 'A void archon. Glass cannon of the cosmos.', unlock: 36, tags: ['energy', 'precision', 'special'] });
