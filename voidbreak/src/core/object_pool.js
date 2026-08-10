/**
 * VOIDBREAK — ObjectPool.
 *
 * Pre-allocated pools for frequently created/destroyed objects (projectiles,
 * particles, damage numbers). Reuses instances to avoid GC pressure.
 * Supports constructor factory + reset callback.
 */

export class ObjectPool {
  /**
   * @param {Function} factory () => instance
   * @param {Function} [reset] (instance) => void — called when reused
   * @param {number} [initialSize] pre-allocate this many
   */
  constructor(factory, reset = null, initialSize = 0) {
    this.factory = factory;
    this.reset = reset;
    this.free = [];
    this.active = [];
    if (initialSize > 0) {
      for (let i = 0; i < initialSize; i++) {
        this.free.push(factory());
      }
    }
  }

  /** Acquire an instance (from free list or new). */
  acquire() {
    const obj = this.free.length > 0 ? this.free.pop() : this.factory();
    this.active.push(obj);
    return obj;
  }

  /** Return an instance to the pool. */
  release(obj) {
    const idx = this.active.indexOf(obj);
    if (idx >= 0) {
      this.active.splice(idx, 1);
    }
    if (this.reset) {
      try {
        this.reset(obj);
      } catch (err) {
        console.error('[pool] reset error:', err);
      }
    }
    this.free.push(obj);
    return obj;
  }

  /** Release all active instances. */
  releaseAll() {
    for (const obj of this.active) {
      if (this.reset) {
        try {
          this.reset(obj);
        } catch (err) {
          console.error('[pool] reset error:', err);
        }
      }
      this.free.push(obj);
    }
    this.active.length = 0;
  }

  /** Number of in-use instances. */
  get inUse() {
    return this.active.length;
  }

  /** Total instances allocated. */
  get total() {
    return this.free.length + this.active.length;
  }

  /** Pre-allocate more instances. */
  grow(count) {
    for (let i = 0; i < count; i++) {
      this.free.push(this.factory());
    }
  }
}
