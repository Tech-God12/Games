// ============================================================================
// Characters.js
// Playable characters with distinct starting stats, loadouts, passives, and
// signature abilities. Characters are unlocked through meta-progression and
// selected at run start. The CharacterRegistry exposes lookup and filtering.
// ============================================================================

export function makeCharacter(def) {
  return Object.freeze({
    id: def.id,
    name: def.name || def.id,
    description: def.description || '',
    color: def.color || 0x29e7ff,
    accent: def.accent || 0xff3df0,
    startMaxHP: def.startMaxHP || 100,
    startSpeed: def.startSpeed || 6,
    startShield: def.startShield || 0,
    startWeapons: def.startWeapons || ['pistol'],
    startAbility: def.startAbility || null,
    passive: def.passive || null,       // { id, name, description }
    ability: def.ability || null,
    ult: def.ult || null,
    unlock: def.unlock || 0,            // bestWave required
    tags: def.tags || [],
    icon: def.icon || { shape: 'human', color: def.color || 0x29e7ff },
  });
}

class CharacterRegistryClass {
  constructor() { this._map = new Map(); this._order = []; }
  register(def) { const c = makeCharacter(def); this._map.set(c.id, c); this._order.push(c.id); return c; }
  registerMany(list) { for (const d of list) this.register(d); }
  get(id) { return this._map.get(id) || null; }
  all() { return Array.from(this._map.values()); }
  ids() { return this._order.slice(); }
  count() { return this._map.size; }
  unlocked(save) { return this.all().filter(c => c.unlock <= (save?.records?.bestWave || 0)); }
}
export const CharacterRegistry = new CharacterRegistryClass();
export const Characters = CharacterRegistry;

CharacterRegistry.registerMany([
  {
    id: 'ranger', name: 'Ranger', color: 0x29e7ff, accent: 0xff3df0,
    startMaxHP: 100, startSpeed: 6.2, startWeapons: ['pistol', 'smg'],
    ability: 'frag', passive: { id: 'steady', name: 'Steady Aim', description: '-15% spread and +10% headshot damage.' },
    description: 'A balanced operative. Reliable and versatile.',
    unlock: 0, tags: ['balanced'],
  },
  {
    id: 'berserker', name: 'Berserker', color: 0xff5544, accent: 0xffaa44,
    startMaxHP: 140, startSpeed: 6.6, startWeapons: ['shotgun', 'blade'],
    ability: 'nova', passive: { id: 'rage', name: 'Bloodlust', description: '+25% damage below 50% HP; melee lifesteal doubled.' },
    description: 'Aggressive close-range brawler with high health.',
    unlock: 3, tags: ['aggressive', 'melee'],
  },
  {
    id: 'gunner', name: 'Gunner', color: 0xffb347, accent: 0x4aa3ff,
    startMaxHP: 90, startSpeed: 5.6, startWeapons: ['rifle', 'minigun'],
    ability: 'airstrike', passive: { id: 'suppress', name: 'Suppression', description: '+15% fire rate; kills reduce ability cooldown by 0.5s.' },
    description: 'Sustained-fire specialist. Mows down crowds.',
    unlock: 6, tags: ['ranged', 'suppression'],
  },
  {
    id: 'mage', name: 'Arcanist', color: 0xb266ff, accent: 0x29e7ff,
    startMaxHP: 80, startSpeed: 6.0, startWeapons: ['laser', 'plasma'],
    ability: 'frostNova', passive: { id: 'attunement', name: 'Attunement', description: '+30% status power; status effects last 1s longer.' },
    description: 'Energy and status master. Fragile but devastating.',
    unlock: 9, tags: ['energy', 'status'],
  },
  {
    id: 'scout', name: 'Scout', color: 0x4fd07a, accent: 0x9fe7ff,
    startMaxHP: 85, startSpeed: 7.4, startWeapons: ['sniper', 'smg'],
    ability: 'blink', passive: { id: 'eagle', name: 'Eagle Eye', description: '+20% crit damage; +15% range.' },
    description: 'Mobile precision striker. Hit and fade.',
    unlock: 12, tags: ['precision', 'mobility'],
  },
  {
    id: 'warden', name: 'Warden', color: 0x4aa3ff, accent: 0xff3df0,
    startMaxHP: 130, startSpeed: 5.4, startWeapons: ['rocket', 'pistol'],
    startShield: 40, ability: 'shieldWall', passive: { id: 'bulwark', name: 'Bulwark', description: '+4 armor and shields regen 50% faster.' },
    description: 'Tanky explosives expert with shields.',
    unlock: 15, tags: ['tank', 'explosive'],
  },
  {
    id: 'phantom', name: 'Phantom', color: 0xff3df0, accent: 0x8a5bff,
    startMaxHP: 75, startSpeed: 7.0, startWeapons: ['laser', 'blade'],
    ability: 'bulletTime', passive: { id: 'phase', name: 'Phase', description: 'Dash grants 0.5s extra i-frames and +20% damage after dashing.' },
    description: 'Time-bending assassin. Fragile, lethal, evasive.',
    unlock: 18, tags: ['mobility', 'special'],
  },
  {
    id: 'engineer', name: 'Engineer', color: 0xffaa44, accent: 0x4fd07a,
    startMaxHP: 95, startSpeed: 5.8, startWeapons: ['plasma', 'smg'],
    ability: 'sentry', passive: { id: 'tinker', name: 'Tinker', description: 'Kills have a 10% chance to drop ammo; +20% AoE.' },
    description: 'Deployables and area control.',
    unlock: 21, tags: ['summon', 'aoe'],
  },
]);
