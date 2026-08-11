// ============================================================================
// BossRegistry.js — registry of boss definitions.
// ============================================================================

import { makeBoss } from './Boss.js';

class BossRegistryClass {
  constructor() { this._map = new Map(); this._order = []; }
  register(def) { const b = makeBoss(def); this._map.set(b.id, b); this._order.push(b.id); return b; }
  registerMany(list) { for (const d of list) this.register(d); }
  get(id) { return this._map.get(id) || null; }
  all() { return Array.from(this._map.values()); }
  ids() { return this._order.slice(); }
  count() { return this._map.size; }
}
export const BossRegistry = new BossRegistryClass();
export const Bosses = BossRegistry;
