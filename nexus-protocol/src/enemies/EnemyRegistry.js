// ============================================================================
// EnemyRegistry.js
// Registry of enemy archetype definitions (data only). Archetypes describe
// stats, behavior, visuals, attack profile, rewards, and optional death hooks.
// EnemyFactory turns these into live entities. Loaded from definitions/*.js.
// ============================================================================

class EnemyRegistryClass {
  constructor() {
    this._defs = new Map();
    this._order = [];
  }
  register(def) {
    if (this._defs.has(def.id)) console.warn(`EnemyRegistry: duplicate id "${def.id}"`);
    this._defs.set(def.id, def);
    this._order.push(def.id);
    return def;
  }
  registerMany(defs) { for (const d of defs) this.register(d); }
  get(id) { return this._defs.get(id) || null; }
  has(id) { return this._defs.has(id); }
  all() { return Array.from(this._defs.values()); }
  ids() { return this._order.slice(); }
  count() { return this._defs.size; }
  byTag(tag) { return this.all().filter(d => (d.tags || []).includes(tag)); }
  /** Weighted random archetype from a pool, biased by `tier` (0..1) to favor tougher enemies late. */
  random(rng, opts = {}) {
    let pool = this.all();
    if (opts.pool) pool = opts.pool.map(id => this.get(id)).filter(Boolean);
    if (opts.maxUnlockWave != null) pool = pool.filter(d => (d.unlockWave || 0) <= opts.maxUnlockWave);
    if (opts.tags) pool = pool.filter(d => opts.tags.some(t => (d.tags || []).includes(t)));
    if (opts.exclude) pool = pool.filter(d => !opts.exclude.includes(d.id));
    if (pool.length === 0) pool = this.all();
    const weights = pool.map(d => (d.weight || 10) * (opts.tier ? (1 + (d.tier || 0) * opts.tier) : 1));
    let total = 0; for (const w of weights) total += w;
    let r = rng.next() * total;
    for (let i = 0; i < pool.length; i++) { r -= weights[i]; if (r <= 0) return pool[i]; }
    return pool[pool.length - 1];
  }
}
export const EnemyRegistry = new EnemyRegistryClass();
export const Enemies = EnemyRegistry;
