// ============================================================================
// Characters7.js — Additional operatives to push the roster past 50.
// ============================================================================

import { CharacterRegistry } from './Characters.js';

const C = (def) => CharacterRegistry.register(def);

C({ id: 'hellion', name: 'Hellion', color: 0xff5522, accent: 0xffe066,
  startMaxHP: 100, startSpeed: 6.2, startWeapons: ['infernoRifle', 'flamethrower'],
  ability: 'infernoBlast', passive: { id: 'attunement', name: 'Hellfire', description: '+60% burn power; burning enemies take +35% damage.' },
  description: 'A hellion who sets the arena ablaze and keeps it burning.', unlock: 36, tags: ['fire', 'status'] });
C({ id: 'cryolith', name: 'Cryolith', color: 0x9fe7ff, accent: 0xffffff,
  startMaxHP: 100, startSpeed: 6.2, startWeapons: ['frostRifle', 'cryoBeam'],
  ability: 'glacialNova', passive: { id: 'attunement', name: 'Deep Freeze', description: '+60% freeze power; frozen enemies take +35% damage.' },
  description: 'A cryolith who freezes the battlefield solid.', unlock: 36, tags: ['cryo', 'control'] });
C({ id: 'voltax', name: 'Voltax', color: 0xffe066, accent: 0x29e7ff,
  startMaxHP: 90, startSpeed: 6.4, startWeapons: ['arcRifle', 'tesla'],
  ability: 'stormCall', passive: { id: 'attunement', name: 'High Voltage', description: '+60% shock power; shocked enemies take +35% damage.' },
  description: 'A voltax conducting storms through the ranks.', unlock: 36, tags: ['shock', 'status'] });
C({ id: 'venomax', name: 'Venomax', color: 0x66ff44, accent: 0x223322,
  startMaxHP: 95, startSpeed: 6.0, startWeapons: ['plasmaRifle', 'needlerSMG'],
  ability: 'siphon', passive: { id: 'attunement', name: 'Toxic', description: '+50% poison power; poisoned enemies take +30% damage.' },
  description: 'A venomax spreading toxin and siphoning life.', unlock: 39, tags: ['poison', 'status', 'sustain'] });
C({ id: 'bloodreaver', name: 'Bloodreaver', color: 0xff3df0, accent: 0x8a5bff,
  startMaxHP: 75, startSpeed: 7.6, startWeapons: ['voidBlade', 'railSpike'],
  ability: 'bloodFury', passive: { id: 'phase', name: 'Bloodthirst', description: 'Melee kills heal 12% and reset dash; +20% damage below 40% HP.' },
  description: 'A bloodreaver who teleports between kills and never dies.', unlock: 39, tags: ['melee', 'mobility', 'sustain'] });
C({ id: 'ironwall', name: 'Ironwall', color: 0x4aa3ff, accent: 0xff3df0,
  startMaxHP: 200, startSpeed: 4.6, startWeapons: ['rotary', 'gatling'],
  startShield: 120, ability: 'ironSkin', passive: { id: 'bulwark', name: 'Ironwall', description: '+12 armor, +100 shield, -25% damage taken.' },
  description: 'An ironwall. The ultimate fortress, slow and indestructible.', unlock: 36, tags: ['tank', 'suppression'] });
C({ id: 'phaseblade', name: 'Phaseblade', color: 0x29e7ff, accent: 0xff3df0,
  startMaxHP: 80, startSpeed: 7.2, startWeapons: ['glaive', 'voidSniper'],
  ability: 'voidStep', passive: { id: 'phase', name: 'Phasewalk', description: 'Dash grants 1.2s i-frames and +30% damage for 2s.' },
  description: 'A phaseblade who blinks through reality, striking and vanishing.', unlock: 39, tags: ['mobility', 'precision', 'melee'] });
C({ id: 'stormlord3', name: 'Stormlord', color: 0xffe066, accent: 0x29e7ff,
  startMaxHP: 85, startSpeed: 6.6, startWeapons: ['tesla', 'stormCannon'],
  ability: 'stormCall', passive: { id: 'attunement', name: 'Conduction', description: '+60% shock power; shocked enemies take +35% damage; chain +1.' },
  description: 'A stormlord calling lightning and chaining it through all.', unlock: 39, tags: ['shock', 'status'] });
C({ id: 'pyromancer5', name: 'Pyromancer', color: 0xff5522, accent: 0xffe066,
  startMaxHP: 90, startSpeed: 6.0, startWeapons: ['infernoCannon', 'emberBeam'],
  ability: 'fireRain', passive: { id: 'attunement', name: 'Inferno', description: '+60% burn power; burning enemies take +35% damage; burn lasts +1s.' },
  description: 'A pyromancer raining fire and burning everything.', unlock: 39, tags: ['fire', 'status', 'aoe'] });
C({ id: 'glaciator2', name: 'Glaciator', color: 0x9fe7ff, accent: 0xffffff,
  startMaxHP: 90, startSpeed: 6.0, startWeapons: ['cryoCannon', 'frostBeam'],
  ability: 'blizzard', passive: { id: 'attunement', name: 'Absolute', description: '+60% freeze power; frozen enemies take +35% damage; freeze lasts +1s.' },
  description: 'A glaciator locking the battlefield in permafrost.', unlock: 39, tags: ['cryo', 'control', 'aoe'] });
C({ id: 'archon3', name: 'Archon', color: 0xb266ff, accent: 0x29e7ff,
  startMaxHP: 75, startSpeed: 6.8, startWeapons: ['voidLance', 'voidBeam'],
  ability: 'voidCollapse', passive: { id: 'attunement', name: 'Voidheart', description: '+40% energy damage, +25% crit damage, dash i-frames +0.3s.' },
  description: 'A void archon. The cosmos made weapon, fragile and absolute.', unlock: 42, tags: ['energy', 'precision', 'special'] });
C({ id: 'paladin3', name: 'Paladin', color: 0xffd24a, accent: 0x4fd07a,
  startMaxHP: 140, startSpeed: 5.8, startWeapons: ['excalibur', 'plasmaRifle'],
  ability: 'phoenixRise', passive: { id: 'bulwark', name: 'Sanctify', description: '+6 armor, regen 3 HP/s, lifesteal heals +60%.' },
  description: 'A paladin. Holy blade, holy shield, holy fire.', unlock: 42, tags: ['melee', 'sustain', 'tank'] });
