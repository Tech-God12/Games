/**
 * VOIDBREAK — StateMachine.
 *
 * Generic finite state machine used by the AI, the player controller and the
 * game's screen flow. States declare enter/update/exit callbacks; transitions
 * can be guarded by conditions. Deterministic, testable.
 */

export class StateMachine {
  /**
   * @param {object} owner the object the machine operates on
   * @param {object} [opts]
   * @param {string} [opts.initial] initial state id
   * @param {object} [opts.states] map of id → state definition
   */
  constructor(owner, opts = {}) {
    this.owner = owner;
    this.states = new Map();
    this.current = null;
    this.currentState = null;
    this.stateTime = 0;
    this.history = [];
    this.verbose = false;

    if (opts.states) {
      for (const [id, def] of Object.entries(opts.states)) {
        this.addState(id, def);
      }
    }
    if (opts.initial !== undefined) {
      this.set(opts.initial);
    }
  }

  addState(id, def = {}) {
    this.states.set(id, {
      id,
      enter: def.enter ?? null,
      update: def.update ?? null,
      exit: def.exit ?? null,
      canEnter: def.canEnter ?? null,
    });
    return this;
  }

  removeState(id) {
    this.states.delete(id);
    return this;
  }

  has(id) {
    return this.states.has(id);
  }

  get currentId() {
    return this.current;
  }

  /** True if currently in the given state. */
  is(id) {
    return this.current === id;
  }

  /** Time spent in the current state (seconds). */
  get time() {
    return this.stateTime;
  }

  /** Switch state. Runs exit on the old, enter on the new. */
  set(id, params = null) {
    if (!this.states.has(id)) {
      if (this.verbose) console.warn(`[fsm] unknown state "${id}"`);
      return false;
    }
    if (id === this.current && params?.force !== true) {
      return false;
    }
    const next = this.states.get(id);
    if (next.canEnter && !next.canEnter(this.owner, params)) {
      return false;
    }
    if (this.currentState?.exit) {
      try {
        this.currentState.exit(this.owner, params);
      } catch (err) {
        console.error(`[fsm] exit error in "${this.current}":`, err);
      }
    }
    this.history.push({ from: this.current, to: id, at: this.stateTime });
    if (this.history.length > 32) this.history.shift();
    this.current = id;
    this.currentState = next;
    this.stateTime = 0;
    if (next.enter) {
      try {
        next.enter(this.owner, params);
      } catch (err) {
        console.error(`[fsm] enter error in "${id}":`, err);
      }
    }
    return true;
  }

  /** Update current state with delta time. Returns the state id. */
  update(dt) {
    this.stateTime += dt;
    if (this.currentState?.update) {
      try {
        this.currentState.update(this.owner, dt);
      } catch (err) {
        console.error(`[fsm] update error in "${this.current}":`, err);
      }
    }
    return this.current;
  }

  /** Try a transition; returns true if it happened. */
  transition(id, params = null) {
    return this.set(id, params);
  }

  /** Reset to a state without running exit callbacks. */
  resetTo(id, params = null) {
    this.current = null;
    this.currentState = null;
    return this.set(id, params);
  }

  /** Get last state before the current one, or null. */
  get previous() {
    for (let i = this.history.length - 1; i >= 0; i--) {
      if (this.history[i].to === this.current) {
        return this.history[i].from;
      }
    }
    return null;
  }

  toString() {
    return `StateMachine(${this.current ?? 'none'}, t=${this.stateTime.toFixed(2)})`;
  }
}
