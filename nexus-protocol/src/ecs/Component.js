// ============================================================================
// Component.js
// Base class for all components. A component is pure data with an optional
// reset() hook used when recycling from a pool. Each concrete component
// declares a unique static `type` string used as the indexing key in the
// world's component tables and queries.
// ============================================================================

export class Component {
  /** Unique type key — overridden by subclasses. */
  static type = 'Component';

  /** Optional pool the component returns to on recycle. */
  _pool = null;

  /** Reset mutable fields to defaults (called when recycled). */
  reset() {}

  /** Return this component to its pool (if any) and detach pool reference. */
  recycle() {
    if (this._pool) {
      this.reset();
      const p = this._pool;
      this._pool = null;
      p.release(this);
    }
  }

  /** Configure multiple fields at once and return self for chaining. */
  set(fields) {
    if (fields) for (const k of Object.keys(fields)) this[k] = fields[k];
    return this;
  }
}

/**
 * Maintain a per-component-type pool so heavy components (Health, Status, AI)
 * can be reused without allocation churn. Each call returns a fresh-or-recycled
 * instance with a bound `_pool` so `recycle()` returns it here.
 */
export class ComponentPool {
  constructor(typeClass) {
    this._type = typeClass;
    this._free = [];
  }
  acquire() {
    let c = this._free.pop();
    if (!c) c = new this._type();
    c._pool = this;
    if (c.reset) c.reset();
    return c;
  }
  release(c) { if (c) this._free.push(c); }
  get size() { return this._free.length; }
}
