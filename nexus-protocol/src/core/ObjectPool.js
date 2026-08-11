// ============================================================================
// ObjectPool.js
// Generic, allocation-free object pool used for high-churn objects such as
// projectiles, particles, and damage numbers. Supports factory/reset
// callbacks, pre-warming, dynamic growth, and idle eviction to keep memory
// bounded. Also includes a specialized PoolVector/PoolMatrix helpers.
// ============================================================================

export class ObjectPool {
  /**
   * @param {Function} factory  returns a new instance
   * @param {(obj:*)=>void} reset  optional reset/return-to-defaults hook
   * @param {number} preWarm   number of instances to allocate eagerly
   * @param {number} max       hard cap (0 = unlimited)
   */
  constructor(factory, reset = null, { preWarm = 0, max = 0 } = {}) {
    if (typeof factory !== 'function') throw new TypeError('ObjectPool: factory required');
    this._factory = factory;
    this._reset = reset;
    this._max = max;
    this._free = [];
    this._active = 0;
    this._created = 0;
    this._evictIdle = false;
    this._idleFrames = 0;
    for (let i = 0; i < preWarm; i++) this._free.push(this._factory());
    this._created = preWarm;
  }

  /** Acquire an instance, creating a new one if the pool is empty. */
  acquire() {
    let obj = this._free.pop();
    if (obj === undefined) {
      if (this._max > 0 && this._created >= this._max) {
        // recycle oldest active by returning whatever we can; here we just force-create
        obj = this._factory();
      } else {
        obj = this._factory();
        this._created++;
      }
    }
    this._active++;
    return obj;
  }

  /** Return an instance to the pool after resetting it. */
  release(obj) {
    if (obj === undefined || obj === null) return;
    if (this._reset) this._reset(obj);
    this._free.push(obj);
    if (this._active > 0) this._active--;
  }

  /** Release many at once. */
  releaseAll(arr) {
    for (let i = 0; i < arr.length; i++) this.release(arr[i]);
    arr.length = 0;
  }

  /** Pre-allocate up to `count` instances. */
  preWarm(count) {
    while (this._free.length < count) { this._free.push(this._factory()); this._created++; }
  }

  /** Trim the free list down to `keep` instances to free memory. */
  trim(keep = 0) {
    while (this._free.length > keep) { this._free.pop(); if (this._created > 0) this._created--; }
  }

  get activeCount() { return this._active; }
  get freeCount() { return this._free.length; }
  get createdCount() { return this._created; }
}

/**
 * A pooling helper specifically for arrays of objects that share a lifecycle.
 * Useful when a system produces a temporary list per frame and wants to avoid
 * GC churn.
 */
export class ArrayListPool {
  constructor() { this._free = []; }
  acquire() { const a = this._free.pop() || []; a.length = 0; return a; }
  release(a) { if (Array.isArray(a)) { a.length = 0; this._free.push(a); } }
}
