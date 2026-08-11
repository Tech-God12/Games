// ============================================================================
// Characters3.js — Additional late-game operatives.
// ============================================================================

import { CharacterRegistry } from './Characters.js';

CharacterRegistry.registerMany([
  {
    id: 'templar', name: 'Templar', color: 0xffd24a, accent: 0x4fd07a,
    startMaxHP: 130, startSpeed: 5.6, startWeapons: ['blade', 'shotgun'],
    startShield: 30, ability: 'fortify', passive: { id: 'bulwark', name: 'Sanctified', description: '+5 armor, +30 shield, regen 2 HP/s, lifesteal +50%.' },
    description: 'A holy templar blending melee, defense, and sustain.',
    unlock: 36, tags: ['melee', 'tank', 'sustain'],
  },
  {
    id: 'assassin', name: 'Assassin', color: 0xff3df0, accent: 0x8a5bff,
    startMaxHP: 70, startSpeed: 7.8, startWeapons: ['sniper', 'smg2'],
    ability: 'blink', passive: { id: 'phase', name: 'Shadowstep', description: 'Dash grants 1s i-frames and +30% damage for 2s.' },
    description: 'A precision assassin who deletes targets and vanishes.',
    unlock: 33, tags: ['precision', 'mobility'],
  },
  {
    id: 'pyromaniac', name: 'Pyromaniac', color: 0xff5522, accent: 0xffe066,
    startMaxHP: 95, startSpeed: 6.0, startWeapons: ['flamethrower', 'napalm'],
    ability: 'overdrive', passive: { id: 'attunement', name: 'Inferno', description: '+50% burn power; burning enemies take +30% damage.' },
    description: 'A pyromaniac who turns the arena into an inferno.',
    unlock: 30, tags: ['fire', 'status'],
  },
  {
    id: 'glaciator', name: 'Glaciator', color: 0x9fe7ff, accent: 0xffffff,
    startMaxHP: 95, startSpeed: 6.0, startWeapons: ['frostbeam', 'frostbite'],
    ability: 'frostNova', passive: { id: 'attunement', name: 'Absolute', description: '+50% freeze power; frozen enemies take +30% damage.' },
    description: 'A glaciator who locks the battlefield in permafrost.',
    unlock: 30, tags: ['cryo', 'control'],
  },
  {
    id: 'teslamancer', name: 'Teslamancer', color: 0xffe066, accent: 0x29e7ff,
    startMaxHP: 85, startSpeed: 6.2, startWeapons: ['tesla', 'arcCannon'],
    ability: 'timeWarp', passive: { id: 'attunement', name: 'Conduction', description: '+50% shock power; shocked enemies take +30% damage.' },
    description: 'A teslamancer who chains lightning through everything.',
    unlock: 30, tags: ['shock', 'status'],
  },
  {
    id: 'artificer', name: 'Artificer', color: 0x66ff88, accent: 0xffb347,
    startMaxHP: 100, startSpeed: 5.8, startWeapons: ['grenadeLauncher', 'mineLayer'],
    ability: 'rocketBarrage', passive: { id: 'tinker', name: 'Sabotage', description: '+40% AoE; kills drop ammo and occasionally mines.' },
    description: 'An artificer of explosives. Tactical area control.',
    unlock: 27, tags: ['explosive', 'aoe', 'tactical'],
  },
]);
