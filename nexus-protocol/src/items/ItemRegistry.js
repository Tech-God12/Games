// ============================================================================
// ItemRegistry.js — registry of all item definitions with weighted random
// selection for shop generation, filtering by tag/rarity, and lookup by id.
// ============================================================================

import { makeItem } from './Item.js';
import { ItemRarity, RARITY_WEIGHT_ITEM } from './ItemRarity.js';

class ItemRegistryClass {
  constructor() { this._items = new Map(); this._order = []; this._byRarity = new Map(); }
  register(def) { const it = makeItem(def); this._items.set(it.id, it); this._order.push(it.id); let r = this._byRarity.get(it.rarity); if (!r) { r = []; this._byRarity.set(it.rarity, r); } r.push(it); return it; }
  registerMany(list) { for (const d of list) this.register(d); }
  get(id) { return this._items.get(id) || null; }
  has(id) { return this._items.has(id); }
  all() { return Array.from(this._items.values()); }
  ids() { return this._order.slice(); }
  count() { return this._items.size; }
  byRarity(r) { return (this._byRarity.get(r) || []).slice(); }
  byTag(t) { return this.all().filter(i => i.tags.includes(t)); }
  random(rng, opts = {}) {
    let pool = this.all();
    if (opts.maxRarity) {
      const order = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'curse'];
      const cap = order.indexOf(opts.maxRarity);
      pool = pool.filter(i => order.indexOf(i.rarity) <= cap);
    }
    if (opts.tags) pool = pool.filter(i => opts.tags.some(t => i.tags.includes(t)));
    if (opts.exclude) pool = pool.filter(i => !opts.exclude.includes(i.id));
    if (opts.maxPrice) pool = pool.filter(i => i.price <= opts.maxPrice);
    if (pool.length === 0) return null;
    const weights = pool.map(i => (RARITY_WEIGHT_ITEM[i.rarity] || 10) * (opts.weightBoost || 1));
    let total = 0; for (const w of weights) total += w;
    let r = rng.next() * total;
    for (let i = 0; i < pool.length; i++) { r -= weights[i]; if (r <= 0) return pool[i]; }
    return pool[pool.length - 1];
  }
  /** Generate N shop offers (distinct). */
  shopOffers(rng, n, opts = {}) {
    const out = []; const exclude = (opts.exclude || []).slice();
    for (let i = 0; i < n; i++) {
      const it = this.random(rng, { ...opts, exclude });
      if (!it) break;
      out.push(it); exclude.push(it.id);
    }
    return out;
  }
}
export const ItemRegistry = new ItemRegistryClass();
export const Items = ItemRegistry;
