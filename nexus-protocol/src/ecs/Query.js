// ============================================================================
// Query.js
// A cached view over the world matching entities that have a set of required
// component types and optional tags. Queries register with the world so their
// result sets are incrementally maintained on component add/remove instead of
// recomputed each frame. Supports "any" (at least one of) and "none" (must not
// have) clauses for flexible filtering.
// ============================================================================

export class Query {
  /**
   * @param {World} world
   * @param {{all?: string[], any?: string[], none?: string[], tags?: string[]}} spec
   */
  constructor(world, spec) {
    this.world = world;
    this.all = spec.all ? spec.all.slice() : [];
    this.any = spec.any ? spec.any.slice() : [];
    this.none = spec.none ? spec.none.slice() : [];
    this.tags = spec.tags ? spec.tags.slice() : [];
    /** @type {Set<import('./Entity.js').Entity>} */
    this.result = new Set();
    this._dirty = true;
    this.world._registerQuery(this);
  }

  /** Rebuild the result set from scratch (used on first access / hard reset). */
  rebuild() {
    this.result.clear();
    let base = null;
    for (const type of this.all) {
      const set = this.world._byComponent.get(type);
      if (!set) { return; } // no entities have this component => empty
      if (base === null) base = set;
      else { const next = new Set(); for (const id of base) if (set.has(id)) next.add(id); base = next; }
    }
    if (base === null) base = this.world._allIds;
    for (const id of base) {
      const e = this.world.entities.get(id);
      if (!e || !e.alive) continue;
      if (this.any.length && !this.any.some(t => e.has(t))) continue;
      if (this.none.length && this.none.some(t => e.has(t))) continue;
      if (this.tags.length && !this.tags.every(t => e.hasTag(t))) continue;
      this.result.add(e);
    }
    this._dirty = false;
  }

  /** Called by the world when a component is added to an entity. */
  onAdd(e, type) {
    if (this.all.includes(type)) {
      // entity might now satisfy all
      if (this._matches(e)) this.result.add(e);
    } else if (this.any.includes(type)) {
      if (this._matches(e)) this.result.add(e); else this.result.delete(e);
    } else if (this.none.includes(type)) {
      if (!this._matches(e)) this.result.delete(e);
    } else if (this.tags.includes(type)) {
      if (this._matches(e)) this.result.add(e);
    }
  }

  /** Called by the world when a component is removed. */
  onRemove(e, type) {
    if (this.all.includes(type)) { this.result.delete(e); }
    else if (this.any.includes(type)) { if (!this._matches(e)) this.result.delete(e); }
    else if (this.none.includes(type)) { if (this._matches(e)) this.result.add(e); }
  }

  onTagChange(e, tag, added) {
    if (this.tags.includes(tag)) {
      if (added && this._matches(e)) this.result.add(e);
      else if (!added) this.result.delete(e);
    }
  }

  onEntityRemoved(e) { this.result.delete(e); }

  _matches(e) {
    if (!e.alive) return false;
    for (const t of this.all) if (!e.has(t)) return false;
    if (this.any.length && !this.any.some(t => e.has(t))) return false;
    if (this.none.length && this.none.some(t => e.has(t))) return false;
    if (this.tags.length && !this.tags.every(t => e.hasTag(t))) return false;
    return true;
  }

  /** Iterate matching entities (skips inactive unless includeInactive). */
  forEach(fn, includeInactive = false) {
    if (this._dirty) this.rebuild();
    for (const e of this.result) {
      if (!includeInactive && !e.active) continue;
      fn(e);
    }
  }

  get array() {
    if (this._dirty) this.rebuild();
    const out = [];
    for (const e of this.result) if (e.active) out.push(e);
    return out;
  }

  get count() {
    if (this._dirty) this.rebuild();
    let n = 0;
    for (const e of this.result) if (e.active) n++;
    return n;
  }

  get first() {
    if (this._dirty) this.rebuild();
    for (const e of this.result) if (e.active) return e;
    return null;
  }

  dispose() { this.world._unregisterQuery(this); this.result.clear(); }
}
