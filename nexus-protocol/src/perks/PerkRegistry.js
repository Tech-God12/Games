// ============================================================================
// PerkRegistry.js — registry of perk definitions with weighted random pick.
// ============================================================================

import { makePerk } from './Perk.js';

class PerkRegistryClass {
  constructor() { this._map = new Map(); this._order = []; }
  register(def) { const p = makePerk(def); this._map.set(p.id, p); this._order.push(p.id); return p; }
  registerMany(list) { for (const d of list) this.register(d); }
  get(id) { return this._map.get(id) || null; }
  all() { return Array.from(this._map.values()); }
  ids() { return this._order.slice(); }
  count() { return this._map.size; }
  byTag(t) { return this.all().filter(p => p.tags.includes(t)); }
  available(save) { return this.all().filter(p => !p.condition || p.condition(save)); }
  random(rng, opts = {}) {
    let pool = opts.available ? this.available(opts.save) : this.all();
    if (opts.exclude) pool = pool.filter(p => !opts.exclude.includes(p.id));
    if (opts.tags) pool = pool.filter(p => opts.tags.some(t => p.tags.includes(t)));
    if (pool.length === 0) return null;
    const weights = pool.map(p => p.weight || 6);
    let total = 0; for (const w of weights) total += w;
    let r = rng.next() * total;
    for (let i = 0; i < pool.length; i++) { r -= weights[i]; if (r <= 0) return pool[i]; }
    return pool[pool.length - 1];
  }
  roll(rng, n, opts = {}) {
    const out = []; const exclude = (opts.exclude || []).slice();
    for (let i = 0; i < n; i++) { const p = this.random(rng, { ...opts, exclude }); if (!p) break; out.push(p); exclude.push(p.id); }
    return out;
  }
}
export const PerkRegistry = new PerkRegistryClass();
export const Perks = PerkRegistry;
