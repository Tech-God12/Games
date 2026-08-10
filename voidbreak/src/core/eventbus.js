/**
 * VOIDBREAK — EventBus (typed publish/subscribe).
 *
 * The game's systems communicate through a central bus. Supports wildcard
 * listeners ("*"), once-listening, priorities and async-safe iteration
 * (subscriptions added during dispatch do not fire until the next dispatch).
 */

export class EventBus {
  constructor() {
    /** @type {Map<string, Array<{fn: Function, once: boolean, priority: number}>>} */
    this.listeners = new Map();
    this.dispatching = false;
  }

  /**
   * Subscribe to an event.
   * @param {string} event event name (or "*")
   * @param {Function} fn (payload, eventName) => void
   * @param {object} [opts]
   * @param {boolean} [opts.once] auto-unsubscribe after first fire
   * @param {number} [opts.priority] higher fires first (default 0)
   * @returns {Function} unsubscribe function
   */
  on(event, fn, { once = false, priority = 0 } = {}) {
    if (typeof fn !== 'function') {
      throw new TypeError('EventBus.on: fn must be a function');
    }
    let list = this.listeners.get(event);
    if (!list) {
      list = [];
      this.listeners.set(event, list);
    }
    const entry = { fn, once, priority };
    list.push(entry);
    list.sort((a, b) => b.priority - a.priority);
    return () => this.off(event, fn);
  }

  /** Subscribe once. */
  once(event, fn, opts = {}) {
    return this.on(event, fn, { ...opts, once: true });
  }

  /** Unsubscribe a specific listener (by function reference). */
  off(event, fn) {
    const list = this.listeners.get(event);
    if (!list) return false;
    const idx = list.findIndex((e) => e.fn === fn);
    if (idx >= 0) {
      list.splice(idx, 1);
      if (list.length === 0) this.listeners.delete(event);
      return true;
    }
    return false;
  }

  /** Remove all listeners for an event (or all events). */
  removeAllListeners(event = null) {
    if (event === null) {
      this.listeners.clear();
    } else {
      this.listeners.delete(event);
    }
  }

  /** Number of listeners for an event. */
  listenerCount(event) {
    return this.listeners.get(event)?.length ?? 0;
  }

  /**
   * Emit an event synchronously. Listeners run in priority order; wildcard
   * listeners run after specific ones.
   */
  emit(event, payload = undefined) {
    const specific = this.listeners.get(event);
    const wildcard = this.listeners.get('*');
    const calls = [];
    if (specific) {
      for (const entry of specific) {
        if (!entry.removed) calls.push([entry, event]);
      }
    }
    if (wildcard) {
      for (const entry of wildcard) {
        if (!entry.removed) calls.push([entry, event]);
      }
    }
    for (const [entry, evt] of calls) {
      if (entry.removed) continue;
      if (entry.once) this.off(evt, entry.fn);
      try {
        entry.fn(payload, evt);
      } catch (err) {
        console.error(`[eventbus] listener error for "${evt}":`, err);
      }
    }
  }

  /** Number of distinct events with listeners. */
  get size() {
    return this.listeners.size;
  }
}

/** Convenience factory. */
export function createBus() {
  return new EventBus();
}
