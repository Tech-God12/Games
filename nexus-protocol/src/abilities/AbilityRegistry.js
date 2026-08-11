// ============================================================================
// AbilityRegistry.js — registry of active abilities.
// ============================================================================

import { makeAbility } from './Ability.js';

class AbilityRegistryClass {
  constructor() { this._map = new Map(); this._order = []; }
  register(def) { const a = makeAbility(def); this._map.set(a.id, a); this._order.push(a.id); return a; }
  registerMany(list) { for (const d of list) this.register(d); }
  get(id) { return this._map.get(id) || null; }
  all() { return Array.from(this._map.values()); }
  ids() { return this._order.slice(); }
  count() { return this._map.size; }
}
export const AbilityRegistry = new AbilityRegistryClass();
export const Abilities = AbilityRegistry;
