/**
 * VOIDBREAK — Timers, Clock, and the fixed-timestep GameLoop.
 *
 * Timers: scheduled one-shot / repeating callbacks with game-time (scaled by
 * time-scale) or real-time execution.
 *
 * Clock: wall-clock / game-clock abstraction.
 *
 * GameLoop: requestAnimationFrame driver with a fixed simulation step,
 * interpolation-free rendering at latest state, and automatic pause when the
 * tab is hidden.
 */

import { FIXED_STEP, MAX_FRAME_SIM } from './constants.js';

export class Timer {
  constructor(clock, opts = {}) {
    this.clock = clock;
    this.elapsed = 0;
    this.duration = opts.duration ?? 0;
    this.repeat = opts.repeat ?? false;
    this.callback = opts.callback ?? null;
    this.realTime = opts.realTime ?? false;
    this.completed = false;
    this._unsub = null;
    this.paused = false;
  }

  get remaining() {
    return Math.max(0, this.duration - this.elapsed);
  }

  get fraction() {
    return this.duration > 0 ? Math.min(1, this.elapsed / this.duration) : 1;
  }

  /** Called by the clock each tick. */
  _tick(dt) {
    if (this.paused || this.completed) return;
    this.elapsed += dt;
    if (this.elapsed >= this.duration) {
      this.completed = true;
      if (this.callback) this.callback(this);
      if (this.repeat && !this.completed) {
        this.elapsed = 0;
        this.completed = false;
      }
    }
  }

  pause() {
    this.paused = true;
    return this;
  }

  resume() {
    this.paused = false;
    return this;
  }

  cancel() {
    this.completed = true;
    this._unsub?.();
  }
}

/**
 * TimerQueue: manages a list of Timers, ticking them each frame.
 */
export class TimerQueue {
  constructor(clock = null) {
    this.clock = clock;
    this.timers = new Set();
  }

  /** Create and start a timer. */
  after(duration, callback, opts = {}) {
    const t = new Timer(this.clock, { duration, callback, ...opts });
    this.timers.add(t);
    t._unsub = () => this.timers.delete(t);
    return t;
  }

  /** Repeating timer. */
  every(interval, callback, opts = {}) {
    return this.after(interval, callback, { ...opts, repeat: true });
  }

  /**
   * Tween: calls onUpdate(fraction, finished) every tick over `duration`.
   * The timer stays alive for the whole duration.
   */
  tween(duration, onUpdate, opts = {}) {
    const timer = new Timer(this.clock, {
      duration,
      repeat: false,
      callback: () => {},
      realTime: opts.realTime ?? false,
    });
    this.timers.add(timer);
    timer._unsub = () => this.timers.delete(timer);
    const baseTick = timer._tick.bind(timer);
    timer._tick = (dt) => {
      baseTick(dt);
      onUpdate(timer.fraction, timer.completed);
    };
    return timer;
  }

  /** Update all timers with dt (game time in seconds). */
  update(dt) {
    for (const t of [...this.timers]) {
      t._tick(dt);
      if (t.completed) this.timers.delete(t);
    }
  }

  get size() {
    return this.timers.size;
  }

  clear() {
    for (const t of this.timers) t.completed = true;
    this.timers.clear();
  }
}

/**
 * Clock: tracks simulation time with a time-scale factor (slow-mo support).
 */
export class Clock {
  constructor() {
    this.time = 0;
    this.realTime = 0;
    this.timeScale = 1;
    this.accumulator = 0;
  }

  /** Advance by a wall-clock delta. Returns simulated delta. */
  tick(wallDt) {
    this.realTime += wallDt;
    const simDt = wallDt * this.timeScale;
    this.time += simDt;
    this.accumulator += simDt;
    return simDt;
  }

  /** Consume one fixed step from the accumulator. Returns false when empty. */
  step() {
    if (this.accumulator >= FIXED_STEP) {
      this.accumulator -= FIXED_STEP;
      return true;
    }
    this.accumulator = 0;
    return false;
  }
}

/**
 * GameLoop: drives update+render via requestAnimationFrame.
 */
export class GameLoop {
  /**
   * @param {object} opts
   * @param {Function} [opts.update] called with (dt, fixedSteps) each frame
   * @param {Function} [opts.render] called each frame
   * @param {Function} [opts.onPause] called when auto-paused
   * @param {Function} [opts.onResume]
   */
  constructor(opts = {}) {
    this.update = opts.update ?? (() => {});
    this.render = opts.render ?? (() => {});
    this.onPause = opts.onPause ?? null;
    this.onResume = opts.onResume ?? null;
    this.clock = new Clock();
    this.running = false;
    this.paused = false;
    this.rafId = null;
    this.lastTime = 0;
    this.frame = 0;
    this.fps = 0;
    this._fpsAccum = 0;
    this._fpsFrames = 0;
    this._boundTick = this._tick.bind(this);
    this._boundVisibility = this._onVisibility.bind(this);
    this.maxDelta = opts.maxDelta ?? MAX_FRAME_SIM;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    document.addEventListener('visibilitychange', this._boundVisibility);
    this.rafId = requestAnimationFrame(this._boundTick);
  }

  stop() {
    this.running = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    document.removeEventListener('visibilitychange', this._boundVisibility);
  }

  pause() {
    if (!this.running) return;
    this.paused = true;
    if (this.onPause) this.onPause();
  }

  resume() {
    if (!this.running) return;
    this.paused = false;
    this.lastTime = performance.now();
    if (this.onResume) this.onResume();
  }

  _onVisibility() {
    if (document.hidden) {
      this.pause();
    } else {
      this.resume();
    }
  }

  _tick(now) {
    if (!this.running) return;
    let wallDt = (now - this.lastTime) / 1000;
    this.lastTime = now;
    if (wallDt < 0) wallDt = 0;
    if (wallDt > this.maxDelta) wallDt = this.maxDelta;

    this._fpsAccum += wallDt;
    this._fpsFrames++;
    if (this._fpsAccum >= 0.5) {
      this.fps = this._fpsFrames / this._fpsAccum;
      this._fpsFrames = 0;
      this._fpsAccum = 0;
    }

    if (!this.paused) {
      const simDt = this.clock.tick(wallDt);
      let steps = 0;
      while (this.clock.step()) steps++;
      this.update(simDt, steps, wallDt);
      this.render();
      this.frame++;
    } else {
      this.clock.accumulator = 0;
      this.render?.();
    }

    this.rafId = requestAnimationFrame(this._boundTick);
  }

  /** Set time scale (1 = normal). */
  setTimeScale(scale) {
    this.clock.timeScale = scale;
  }

  get time() {
    return this.clock.time;
  }
}
