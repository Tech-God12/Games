// ============================================================================
// Characters5.js — Additional operatives rounding out the roster to 30+.
// ============================================================================

import { CharacterRegistry } from './Characters.js';

const C = (def) => CharacterRegistry.register(def);

C({ id: 'spellblade', name: 'Spellblade', color: 0xb266ff, accent: 0x29e7ff,
  startMaxHP: 95, startSpeed: 6.4, startWeapons: ['blade', 'plasmaRifle'],
  ability: 'nova', passive: { id: 'attunement', name: 'Spellweave', description: '+25% status power; melee hits apply a random status.' },
  description: 'A spellblade weaving steel and energy in equal measure.', unlock: 30, tags: ['melee', 'energy', 'status'] });
C({ id: 'gunmaster', name: 'Gunmaster', color: 0xffb347, accent: 0x29e7ff,
  startMaxHP: 100, startSpeed: 6.0, startWeapons: ['rifle', 'revolver'],
  ability: 'rocketBarrage', passive: { id: 'eagle', name: 'Deadeye', description: '+15% crit damage and +10% headshot damage.' },
  description: 'A master of firearms. Every shot counts.', unlock: 24, tags: ['precision', 'ranged'] });
C({ id: 'voidwalker', name: 'Voidwalker', color: 0x8a5bff, accent: 0xff3df0,
  startMaxHP: 80, startSpeed: 6.8, startWeapons: ['voidLance', 'voidRifle'],
  ability: 'voidRift', passive: { id: 'phase', name: 'Voidstep', description: 'Dash grants 1s i-frames and +25% damage for 2s.' },
  description: 'A voidwalker phasing through reality between kills.', unlock: 33, tags: ['mobility', 'energy', 'special'] });
C({ id: 'ironclad', name: 'Ironclad', color: 0x4aa3ff, accent: 0xff3df0,
  startMaxHP: 170, startSpeed: 5.0, startWeapons: ['gatling', 'rocket'],
  startShield: 80, ability: 'fortify', passive: { id: 'bulwark', name: 'Ironclad', description: '+8 armor, +60 shield, -15% damage taken.' },
  description: 'An ironclad wall of guns and armor.', unlock: 27, tags: ['tank', 'suppression'] });
C({ id: 'nightblade', name: 'Nightblade', color: 0xff3df0, accent: 0x8a5bff,
  startMaxHP: 75, startSpeed: 7.8, startWeapons: ['blade', 'smg3'],
  ability: 'phaseWalk', passive: { id: 'phase', name: 'Nightfall', description: 'Melee kills reset dash and grant +20% move speed.' },
  description: 'A nightblade striking from shadow and vanishing.', unlock: 36, tags: ['melee', 'mobility'] });
C({ id: 'elementalist', name: 'Elementalist', color: 0xff6633, accent: 0x9fe7ff,
  startMaxHP: 85, startSpeed: 6.2, startWeapons: ['flamethrower', 'frostbeam'],
  ability: 'blizzard', passive: { id: 'attunement', name: 'Duality', description: '+30% status power; fire and frost hits both apply.' },
  description: 'An elementalist wielding fire and frost in tandem.', unlock: 33, tags: ['status', 'control'] });
C({ id: 'stormlord', name: 'Stormlord', color: 0xffe066, accent: 0x29e7ff,
  startMaxHP: 85, startSpeed: 6.4, startWeapons: ['tesla', 'arcCannon'],
  ability: 'thunderclap', passive: { id: 'attunement', name: 'Conduction', description: '+40% shock power; shocked enemies take +25% damage.' },
  description: 'A stormlord conducting lightning through the ranks.', unlock: 33, tags: ['shock', 'status'] });
C({ id: 'mercenary', name: 'Mercenary', color: 0x66ff88, accent: 0xffb347,
  startMaxHP: 105, startSpeed: 6.6, startWeapons: ['smg2', 'shotgun'],
  ability: 'adrenalineShot', passive: { id: 'suppress', name: 'Hired Gun', description: '+20% currency; kills reduce ability cooldown by 0.5s.' },
  description: 'A mercenary who fights for the spoils.', unlock: 21, tags: ['close', 'economy', 'mobility'] });
C({ id: 'scholar', name: 'Scholar', color: 0x9fe7ff, accent: 0xb266ff,
  startMaxHP: 80, startSpeed: 6.0, startWeapons: ['laser', 'plasmaRifle'],
  ability: 'rally', passive: { id: 'attunement', name: 'Erudite', description: '+30% XP and +15% status power.' },
  description: 'A scholar who levels faster and wields energy.', unlock: 24, tags: ['energy', 'economy'] });
C({ id: 'brawler', name: 'Brawler', color: 0xff5544, accent: 0xffe066,
  startMaxHP: 140, startSpeed: 6.2, startWeapons: ['blade', 'autoShotgun'],
  ability: 'berserk', passive: { id: 'rage', name: 'Brawler', description: '+30% damage below 50% HP; melee lifesteal doubled.' },
  description: 'A brawler who gets stronger as they get hurt.', unlock: 21, tags: ['melee', 'close', 'aggressive'] });
