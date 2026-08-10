// ============================================================================
// Characters2.js — Additional playable operatives registered with the
// CharacterRegistry from Characters.js.
// ============================================================================

import { CharacterRegistry } from './Characters.js';

CharacterRegistry.registerMany([
  {
    id: 'arsonist', name: 'Arsonist', color: 0xff5522, accent: 0xffe066,
    startMaxHP: 90, startSpeed: 6.0, startWeapons: ['flamethrower', 'napalm'],
    ability: 'overdrive', passive: { id: 'attunement', name: 'Pyre', description: '+40% burn power; burning enemies take +25% damage.' },
    description: 'A fire specialist. Drowns the arena in flame.',
    unlock: 24, tags: ['fire', 'status'],
  },
  {
    id: 'cryomancer', name: 'Cryomancer', color: 0x9fe7ff, accent: 0xffffff,
    startMaxHP: 90, startSpeed: 6.0, startWeapons: ['frostbeam', 'frostbite'],
    ability: 'frostNova', passive: { id: 'attunement', name: 'Permafrost', description: '+40% freeze power; frozen enemies take +25% damage.' },
    description: 'A master of cold who locks the battlefield in ice.',
    unlock: 27, tags: ['cryo', 'control'],
  },
  {
    id: 'stormbringer', name: 'Stormbringer', color: 0xffe066, accent: 0x29e7ff,
    startMaxHP: 85, startSpeed: 6.2, startWeapons: ['tesla', 'arcCannon'],
    ability: 'timeWarp', passive: { id: 'attunement', name: 'Conduction', description: '+40% shock power; shocked enemies take +25% damage.' },
    description: 'A living storm. Chains lightning through the ranks.',
    unlock: 30, tags: ['shock', 'status'],
  },
  {
    id: 'saboteur', name: 'Saboteur', color: 0x66ff88, accent: 0xffb347,
    startMaxHP: 95, startSpeed: 6.4, startWeapons: ['rocket', 'mineLayer'],
    ability: 'rocketBarrage', passive: { id: 'tinker', name: 'Sabotage', description: '+30% AoE; kills have a 15% chance to drop a mine.' },
    description: 'An explosives virtuoso. Booms solve everything.',
    unlock: 21, tags: ['explosive', 'aoe'],
  },
  {
    id: 'vanguard', name: 'Vanguard', color: 0x4aa3ff, accent: 0xff3df0,
    startMaxHP: 150, startSpeed: 5.2, startWeapons: ['autoShotgun', 'blade'],
    startShield: 60, ability: 'shieldWall', passive: { id: 'bulwark', name: 'Bastion', description: '+6 armor, +50 shield, and 20% damage reduction while stationary.' },
    description: 'An immovable bulwark. Soak and shove.',
    unlock: 18, tags: ['tank', 'close'],
  },
  {
    id: 'archon', name: 'Archon', color: 0xb266ff, accent: 0x29e7ff,
    startMaxHP: 70, startSpeed: 6.6, startWeapons: ['voidLance', 'voidReaper'],
    ability: 'blackHole', passive: { id: 'attunement', name: 'Voidheart', description: '+30% energy damage; +20% crit damage.' },
    description: 'A void-touched archetype. Glass cannon of the cosmos.',
    unlock: 33, tags: ['energy', 'precision', 'special'],
  },
  {
    id: 'paladin', name: 'Paladin', color: 0xffd24a, accent: 0x4fd07a,
    startMaxHP: 120, startSpeed: 5.8, startWeapons: ['blade', 'plasma'],
    ability: 'mantra', passive: { id: 'bulwark', name: 'Sanctify', description: '+4 armor, regen 2 HP/s, and lifesteal heals +50%.' },
    description: 'A holy warrior blending melee, sustain, and support.',
    unlock: 27, tags: ['melee', 'sustain', 'tank'],
  },
  {
    id: 'raptor', name: 'Raptor', color: 0x4fffd0, accent: 0xff3df0,
    startMaxHP: 80, startSpeed: 7.6, startWeapons: ['smg2', 'sniper'],
    ability: 'sprintBurst', passive: { id: 'eagle', name: 'Hunt', description: '+20% crit damage; kills grant +15% move speed for 3s.' },
    description: 'A hyper-mobile skirmisher. Never stop moving.',
    unlock: 30, tags: ['mobility', 'precision'],
  },
]);
