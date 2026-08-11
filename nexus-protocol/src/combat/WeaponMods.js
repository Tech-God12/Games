// ============================================================================
// WeaponMods.js
// Weapon attachment/mod system: scopes, magazines, barrels, grips, and ammo
// types that modify a weapon instance's stat block. Mods are found in the shop
// and as drops, and slot into a weapon. Definitions are data; the controller
// applies them by merging into the weapon's mods object.
// ============================================================================

export const ModSlot = Object.freeze({
  Scope: 'scope', Magazine: 'magazine', Barrel: 'barrel', Grip: 'grip', Ammo: 'ammo', Stock: 'stock',
});

class WeaponModRegistryClass {
  constructor() { this._mods = new Map(); this._order = []; this._bySlot = new Map(); }
  register(def) { this._mods.set(def.id, def); this._order.push(def.id); let s = this._bySlot.get(def.slot); if (!s) { s = []; this._bySlot.set(def.slot, s); } s.push(def); return def; }
  registerMany(list) { for (const d of list) this.register(d); }
  get(id) { return this._mods.get(id) || null; }
  all() { return Array.from(this._mods.values()); }
  bySlot(slot) { return (this._bySlot.get(slot) || []).slice(); }
  count() { return this._mods.size; }
  random(rng, opts = {}) {
    let pool = this.all();
    if (opts.slot) pool = pool.filter(m => m.slot === opts.slot);
    if (opts.exclude) pool = pool.filter(m => !opts.exclude.includes(m.id));
    if (pool.length === 0) return null;
    return rng.pick(pool);
  }
}
export const WeaponModRegistry = new WeaponModRegistryClass();

WeaponModRegistry.registerMany([
  // Scopes
  { id: 'redDot', name: 'Red Dot', slot: ModSlot.Scope, rarity: 'common', price: 60, description: '-10% spread', stat: () => ({ spreadMult: 0.9 }) },
  { id: 'holoScope', name: 'Holo Scope', slot: ModSlot.Scope, rarity: 'uncommon', price: 110, description: '-15% spread, +5% range', stat: () => ({ spreadMult: 0.85, rangeMult: 1.05 }) },
  { id: 'marksScope', name: 'Marksman Scope', slot: ModSlot.Scope, rarity: 'rare', price: 200, description: '-25% spread, +15% range, +10% crit', stat: () => ({ spreadMult: 0.75, rangeMult: 1.15, critChanceAdd: 0.1 }) },
  { id: 'thermalScope', name: 'Thermal Scope', slot: ModSlot.Scope, rarity: 'epic', price: 320, description: '-30% spread, +20% crit damage', stat: () => ({ spreadMult: 0.7, critMultAdd: 0.2 }) },
  // Magazines
  { id: 'extMag', name: 'Extended Mag', slot: ModSlot.Magazine, rarity: 'common', price: 70, description: '+25% magazine', stat: () => ({ magMult: 1.25 }) },
  { id: 'drumMag', name: 'Drum Mag', slot: ModSlot.Magazine, rarity: 'rare', price: 200, description: '+60% magazine, +10% reload', stat: () => ({ magMult: 1.6, reloadMult: 1.1 }) },
  { id: 'fastMag', name: 'Fast Mag', slot: ModSlot.Magazine, rarity: 'uncommon', price: 110, description: '-25% reload', stat: () => ({ reloadMult: 0.75 }) },
  { id: 'speedMag', name: 'Speed Mag', slot: ModSlot.Magazine, rarity: 'epic', price: 300, description: '+30% magazine, -30% reload', stat: () => ({ magMult: 1.3, reloadMult: 0.7 }) },
  // Barrels
  { id: 'compensator', name: 'Compensator', slot: ModSlot.Barrel, rarity: 'common', price: 60, description: '-15% recoil, -5% damage', stat: () => ({ damageMult: 0.95 }) },
  { id: 'muzzleBrake', name: 'Muzzle Brake', slot: ModSlot.Barrel, rarity: 'uncommon', price: 110, description: '+10% damage, +10% spread', stat: () => ({ damageMult: 1.1, spreadMult: 1.1 }) },
  { id: 'longBarrel', name: 'Long Barrel', slot: ModSlot.Barrel, rarity: 'uncommon', price: 120, description: '+15% range, +10% damage', stat: () => ({ rangeMult: 1.15, damageMult: 1.1 }) },
  { id: 'heavyBarrel', name: 'Heavy Barrel', slot: ModSlot.Barrel, rarity: 'rare', price: 220, description: '+20% damage, -10% fire rate', stat: () => ({ damageMult: 1.2, fireRateMult: 0.9 }) },
  { id: 'chronoBarrel', name: 'Chrono Barrel', slot: ModSlot.Barrel, rarity: 'epic', price: 340, description: '+25% projectile speed, +10% range', stat: () => ({ projectileSpeedMult: 1.25, rangeMult: 1.1 }) },
  // Grips
  { id: 'ergoGrip', name: 'Ergo Grip', slot: ModSlot.Grip, rarity: 'common', price: 60, description: '-10% spread', stat: () => ({ spreadMult: 0.9 }) },
  { id: 'tacticalGrip', name: 'Tactical Grip', slot: ModSlot.Grip, rarity: 'uncommon', price: 120, description: '-15% spread, +5% fire rate', stat: () => ({ spreadMult: 0.85, fireRateMult: 1.05 }) },
  { id: 'angledGrip', name: 'Angled Grip', slot: ModSlot.Grip, rarity: 'rare', price: 200, description: '+10% fire rate, -10% reload', stat: () => ({ fireRateMult: 1.1, reloadMult: 0.9 }) },
  // Ammo
  { id: 'hollowPoint', name: 'Hollow Points', slot: ModSlot.Ammo, rarity: 'uncommon', price: 130, description: '+20% damage, -10% pierce-friendly', stat: () => ({ damageMult: 1.2 }) },
  { id: 'apRounds', name: 'AP Rounds', slot: ModSlot.Ammo, rarity: 'rare', price: 220, description: '+5 armor pen, +10% damage', stat: () => ({ armorPenAdd: 5, damageMult: 1.1 }) },
  { id: 'incendiary', name: 'Incendiary Rounds', slot: ModSlot.Ammo, rarity: 'rare', price: 220, description: '+20% burn chance, +1 burn power', stat: () => ({ statusChanceMult: 1.2 }) },
  { id: 'cryoRounds', name: 'Cryo Rounds', slot: ModSlot.Ammo, rarity: 'rare', price: 220, description: '+20% slow chance', stat: () => ({ statusChanceMult: 1.2 }) },
  { id: 'shockRounds', name: 'Shock Rounds', slot: ModSlot.Ammo, rarity: 'rare', price: 220, description: '+20% shock chance', stat: () => ({ statusChanceMult: 1.2 }) },
  { id: 'explosiveRounds', name: 'Explosive Rounds', slot: ModSlot.Ammo, rarity: 'epic', price: 340, description: '+25% AoE, +10% damage', stat: () => ({ aoeMult: 1.25, damageMult: 1.1 }) },
  { id: 'hvpRounds', name: 'HVP Rounds', slot: ModSlot.Ammo, rarity: 'epic', price: 320, description: '+30% projectile speed, +1 pierce', stat: () => ({ projectileSpeedMult: 1.3, pierceAdd: 1 }) },
  // Stocks
  { id: 'lightStock', name: 'Light Stock', slot: ModSlot.Stock, rarity: 'uncommon', price: 100, description: '+5% move speed while firing (flavor)', stat: () => ({}) },
  { id: 'heavyStock', name: 'Heavy Stock', slot: ModSlot.Stock, rarity: 'uncommon', price: 100, description: '-15% spread, -5% move (flavor)', stat: () => ({ spreadMult: 0.85 }) },
  { id: 'shockStock', name: 'Shock Absorber Stock', slot: ModSlot.Stock, rarity: 'rare', price: 200, description: '-20% spread, +10% fire rate', stat: () => ({ spreadMult: 0.8, fireRateMult: 1.1 }) },
]);

/** Apply a set of mods (id list) to a weapon instance's mods object. */
export function applyModsToWeapon(weaponInstance, modIds) {
  // start from base mods (1.0)
  const base = { damageMult: 1, fireRateMult: 1, reloadMult: 1, magMult: 1, spreadMult: 1, critChanceAdd: 0, critMultAdd: 0, knockbackMult: 1, projectileSpeedMult: 1, statusPowerMult: 1, statusChanceMult: 1, lifestealAdd: 0, armorPenAdd: 0, rangeMult: 1, aoeMult: 1, pierceAdd: 0, headshotMultAdd: 0, ammoCostMult: 1 };
  for (const id of modIds) {
    const m = WeaponModRegistry.get(id); if (!m) continue;
    const s = m.stat();
    for (const k of Object.keys(s)) {
      if (k === 'damageMult' || k === 'fireRateMult' || k === 'reloadMult' || k === 'magMult' || k === 'spreadMult' || k === 'knockbackMult' || k === 'projectileSpeedMult' || k === 'statusPowerMult' || k === 'statusChanceMult' || k === 'rangeMult' || k === 'aoeMult') base[k] *= s[k];
      else if (k === 'critChanceAdd' || k === 'critMultAdd' || k === 'lifestealAdd' || k === 'armorPenAdd' || k === 'pierceAdd' || k === 'headshotMultAdd') base[k] += s[k];
    }
  }
  // merge with existing run-mods (items/perks) multiplicatively/additively
  Object.assign(weaponInstance.mods, base);
  return weaponInstance.mods;
}

export const WEAPON_MOD_COUNT = WeaponModRegistry.count();
