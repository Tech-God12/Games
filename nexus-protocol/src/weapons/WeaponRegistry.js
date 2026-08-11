// ============================================================================
// WeaponRegistry.js
// Central registry of all weapon definitions. Definitions are registered by
// id and looked up by id, rarity, category, or tag. Also provides weighted
// random selection for shop/loot generation and filtering helpers used by the
// codex UI. Definitions are loaded from src/weapons/definitions/*.js.
// ============================================================================

import { makeWeapon, WeaponRarity, RARITY_WEIGHT } from './Weapon.js';

class WeaponRegistryClass {
  constructor() {
    /** @type {Map<string, ReturnType<typeof makeWeapon>>} */
    this._defs = new Map();
    this._byRarity = new Map();
    this._byCategory = new Map();
    this._order = [];
  }

  register(def) {
    const w = makeWeapon(def);
    if (this._defs.has(w.id)) console.warn(`WeaponRegistry: duplicate id "${w.id}"`);
    this._defs.set(w.id, w);
    this._order.push(w.id);
    let r = this._byRarity.get(w.rarity); if (!r) { r = []; this._byRarity.set(w.rarity, r); } r.push(w);
    let c = this._byCategory.get(w.category); if (!c) { c = []; this._byCategory.set(w.category, c); } c.push(w);
    return w;
  }

  registerMany(defs) { for (const d of defs) this.register(d); }

  get(id) { return this._defs.get(id) || null; }
  has(id) { return this._defs.has(id); }
  all() { return Array.from(this._defs.values()); }
  ids() { return this._order.slice(); }
  count() { return this._defs.size; }

  byRarity(rarity) { return (this._byRarity.get(rarity) || []).slice(); }
  byCategory(cat) { return (this._byCategory.get(cat) || []).slice(); }

  byTag(tag) { return this.all().filter(w => w.tags.includes(tag)); }

  /** Weighted random weapon, optionally restricted to a rarity tier cap. */
  random(rng, opts = {}) {
    let pool = this.all();
    if (opts.maxRarity) {
      const order = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'];
      const cap = order.indexOf(opts.maxRarity);
      pool = pool.filter(w => order.indexOf(w.rarity) <= cap);
    }
    if (opts.category) pool = pool.filter(w => w.category === opts.category);
    if (opts.exclude) pool = pool.filter(w => !opts.exclude.includes(w.id));
    if (pool.length === 0) return null;
    const weights = pool.map(w => RARITY_WEIGHT[w.rarity] * (opts.rarityBoost ? Math.pow(0.5, ['common','uncommon','rare','epic','legendary','mythic'].indexOf(w.rarity)) * opts.rarityBoost + 1 : 1));
    let total = 0; for (const wgt of weights) total += wgt;
    let r = rng.next() * total;
    for (let i = 0; i < pool.length; i++) { r -= weights[i]; if (r <= 0) return pool[i]; }
    return pool[pool.length - 1];
  }

  /** Starter weapons granted at run start. */
  starters() { return ['pistol']; }
}

export const WeaponRegistry = new WeaponRegistryClass();
export const Weapons = WeaponRegistry; // alias
