// ============================================================================
// Characters4.js — Additional operatives rounding out the roster.
// ============================================================================

import { CharacterRegistry } from './Characters.js';

CharacterRegistry.registerMany([
  {
    id: 'dragoon', name: 'Dragoon', color: 0xff5544, accent: 0xffe066,
    startMaxHP: 110, startSpeed: 6.4, startWeapons: ['shotgun', 'battleRifle'],
    ability: 'sprintBurst', passive: { id: 'eagle', name: 'Lancer', description: '+15% shotgun damage; kills reduce dash cooldown.' },
    description: 'A shock-trooper dragoon. Close bursts and rapid repositioning.',
    unlock: 24, tags: ['close', 'mobility'],
  },
  {
    id: 'oracle', name: 'Oracle', color: 0x9fe7ff, accent: 0xff3df0,
    startMaxHP: 80, startSpeed: 6.0, startWeapons: ['voidLance', 'frostbeam'],
    ability: 'timeWarp', passive: { id: 'attunement', name: 'Foresight', description: '+20% crit damage; +15% status power.' },
    description: 'A seer who bends time and elements to her will.',
    unlock: 36, tags: ['precision', 'control', 'special'],
  },
  {
    id: 'marauder', name: 'Marauder', color: 0x66ff88, accent: 0xffb347,
    startMaxHP: 100, startSpeed: 6.6, startWeapons: ['smg3', 'autoShotgun'],
    ability: 'adrenalineShot', passive: { id: 'suppress', name: 'Plunder', description: '+20% currency; kills reduce ability cooldown.' },
    description: 'A marauder who lives fast and loots faster.',
    unlock: 21, tags: ['close', 'economy', 'mobility'],
  },
  {
    id: 'sage', name: 'Sage', color: 0xb266ff, accent: 0x29e7ff,
    startMaxHP: 90, startSpeed: 5.8, startWeapons: ['plasmaRifle', 'tesla'],
    ability: 'soulLink', passive: { id: 'attunement', name: 'Resonance', description: '+25% status power; status spreads on death.' },
    description: 'A sage weaving resonance through enemy ranks.',
    unlock: 33, tags: ['energy', 'status', 'control'],
  },
  {
    id: 'juggernaut', name: 'Juggernaut', color: 0x4aa3ff, accent: 0xff3df0,
    startMaxHP: 160, startSpeed: 5.0, startWeapons: ['minigun', 'rocket'],
    startShield: 50, ability: 'fortify', passive: { id: 'bulwark', name: 'Ironclad', description: '+8 armor, +50 shield, -10% damage taken.' },
    description: 'An immovable juggernaut. Walks through fire.',
    unlock: 27, tags: ['tank', 'suppression'],
  },
  {
    id: 'reaver', name: 'Reaver', color: 0xff3df0, accent: 0x8a5bff,
    startMaxHP: 75, startSpeed: 7.4, startWeapons: ['blade', 'railSpike'],
    ability: 'phaseWalk', passive: { id: 'phase', name: 'Bloodthirst', description: 'Melee kills heal 10% and reset dash.' },
    description: 'A reaver who teleports between kills.',
    unlock: 36, tags: ['melee', 'mobility', 'sustain'],
  },
]);
