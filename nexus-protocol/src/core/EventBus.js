// ============================================================================
// EventBus.js
// A lightweight, dependency-free publish/subscribe system used across the
// entire game for decoupled communication between systems. Supports named
// channels, priority ordering, once-only subscriptions, sticky events, and
// safe removal. Designed to be used as a shared singleton but can also be
// instantiated for isolated event spaces (e.g. per-arena local events).
// ============================================================================

export class EventBus {
  constructor(name = 'bus') {
    this.name = name;
    /** @type {Map<string, Array<{fn: Function, priority: number, once: boolean, ctx: *}>>} */
    this._channels = new Map();
    /** @type {Map<string, *>} sticky values keyed by channel */
    this._sticky = new Map();
    this._suspended = false;
    this._suspendedQueue = [];
    this._idCounter = 0;
  }

  /**
   * Subscribe to a channel.
   * @param {string} channel
   * @param {Function} fn
   * @param {{priority?: number, once?: boolean, ctx?: *, sticky?: boolean}} [opts]
   * @returns {() => void} unsubscribe function
   */
  on(channel, fn, opts = {}) {
    const { priority = 0, once = false, ctx = null, sticky = false } = opts;
    if (typeof fn !== 'function') throw new TypeError('EventBus.on: fn must be a function');
    let list = this._channels.get(channel);
    if (!list) { list = []; this._channels.set(channel, list); }
    const entry = { fn, priority, once, ctx, id: ++this._idCounter };
    list.push(entry);
    // keep stable by priority (higher first), then insertion order
    list.sort((a, b) => (b.priority - a.priority) || (a.id - b.id));
    if (sticky && this._sticky.has(channel)) {
      // immediately deliver the last sticky value
      try { fn.call(ctx, this._sticky.get(channel)); } catch (e) { this._handleError(channel, e); }
      if (once) this.off(channel, fn);
    }
    return () => this.off(channel, fn);
  }

  /** Subscribe once. */
  once(channel, fn, opts = {}) {
    return this.on(channel, fn, { ...opts, once: true });
  }

  /** Unsubscribe a specific function (or all listeners for a channel). */
  off(channel, fn) {
    if (fn === undefined) { this._channels.delete(channel); return; }
    const list = this._channels.get(channel);
    if (!list) return;
    for (let i = list.length - 1; i >= 0; i--) {
      if (list[i].fn === fn) list.splice(i, 1);
    }
    if (list.length === 0) this._channels.delete(channel);
  }

  /** Publish a payload to a channel. Returns true if any listeners fired. */
  emit(channel, payload) {
    if (this._suspended) { this._suspendedQueue.push({ channel, payload }); return false; }
    return this._dispatch(channel, payload);
  }

  /** Emit and store as sticky so future sticky subscribers receive it immediately. */
  emitSticky(channel, payload) {
    this._sticky.set(channel, payload);
    return this._dispatch(channel, payload);
  }

  /** Clear a sticky value. */
  clearSticky(channel) { this._sticky.delete(channel); }

  _dispatch(channel, payload) {
    const list = this._channels.get(channel);
    if (!list || list.length === 0) return false;
    // copy to allow unsub during iteration
    const snapshot = list.slice();
    let delivered = false;
    for (let i = 0; i < snapshot.length; i++) {
      const e = snapshot[i];
      if (e.once) this.off(channel, e.fn);
      try { e.fn.call(e.ctx, payload); delivered = true; }
      catch (err) { this._handleError(channel, err); }
    }
    return delivered;
  }

  _handleError(channel, err) {
    // Avoid infinite recursion: dispatch to 'bus.error' directly without emit()
    const errList = this._channels.get('bus.error');
    if (errList) {
      for (const e of errList) { try { e.fn.call(e.ctx, { channel, error: err }); } catch (_) {} }
    }
    if (typeof console !== 'undefined') {
      console.error(`[EventBus:${this.name}] error in channel "${channel}":`, err);
    }
  }

  /** Suspend delivery; queued emits are flushed on resume. */
  suspend() { this._suspended = true; }
  resume() {
    this._suspended = false;
    const q = this._suspendedQueue;
    this._suspendedQueue = [];
    for (const { channel, payload } of q) this._dispatch(channel, payload);
  }

  /** Remove all listeners and sticky values. */
  clear() { this._channels.clear(); this._sticky.clear(); this._suspendedQueue.length = 0; }

  /** Number of listeners on a channel. */
  listenerCount(channel) { const l = this._channels.get(channel); return l ? l.length : 0; }

  /** List all active channel names. */
  channels() { return Array.from(this._channels.keys()); }
}

/** Shared global bus for cross-system communication. */
export const bus = new EventBus('global');

/** Channel name constants to avoid magic strings. */
export const Channels = Object.freeze({
  // engine / lifecycle
  EngineReady: 'engine.ready',
  EngineResize: 'engine.resize',
  EngineFocus: 'engine.focus',
  EngineBlur: 'engine.blur',
  FrameBegin: 'frame.begin',
  FrameEnd: 'frame.end',
  // input
  InputAction: 'input.action',
  InputAxis: 'input.axis',
  InputPointerLock: 'input.pointerlock',
  // game state
  GameStateChange: 'game.state',
  RunStart: 'run.start',
  RunEnd: 'run.end',
  RunPause: 'run.pause',
  RunResume: 'run.resume',
  // combat
  EntityDamaged: 'entity.damaged',
  EntityKilled: 'entity.killed',
  EntitySpawned: 'entity.spawned',
  EntityRemoved: 'entity.removed',
  PlayerDamaged: 'player.damaged',
  PlayerHealed: 'player.healed',
  PlayerDeath: 'player.death',
  WeaponFired: 'weapon.fired',
  WeaponSwitched: 'weapon.switched',
  WeaponReloaded: 'weapon.reloaded',
  ProjectileFired: 'projectile.fired',
  ProjectileHit: 'projectile.hit',
  // progression
  XPGained: 'progress.xp',
  LevelUp: 'progress.levelup',
  CurrencyChanged: 'progress.currency',
  UpgradeChosen: 'progress.upgrade',
  PerkAcquired: 'progress.perk',
  ItemAcquired: 'progress.item',
  // waves
  WaveStart: 'wave.start',
  WaveCleared: 'wave.cleared',
  WaveIntermission: 'wave.intermission',
  BossSpawn: 'boss.spawn',
  BossDefeated: 'boss.defeated',
  // ui
  UIShow: 'ui.show',
  UIHide: 'ui.hide',
  UIToggle: 'ui.toggle',
  HUDUpdate: 'hud.update',
  Toast: 'ui.toast',
  // audio
  PlaySFX: 'audio.sfx',
  PlayMusic: 'audio.music',
  // debug
  DebugToggle: 'debug.toggle',
  DebugStat: 'debug.stat',
});
