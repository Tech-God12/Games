// ============================================================================
// Clock.js
// Central time manager. Tracks elapsed time, raw delta, a smoothed delta, and
// supports time scaling (slow-mo / hit-stop), fixed-timestep accumulation for
// deterministic physics, and per-tick frame stats. Also drives a simple
// high-resolution timer abstraction used throughout the codebase.
// ============================================================================

export class Clock {
  constructor(autoStart = true) {
    this._autoStart = autoStart;
    this._startTime = 0;
    this._oldTime = 0;
    this._running = false;

    /** Total elapsed real seconds since the clock started (sum of deltas). */
    this.elapsed = 0;
    /** Total unscaled elapsed seconds. */
    this.realElapsed = 0;
    /** Delta seconds for the current frame, after scaling. */
    this.delta = 0;
    /** Raw delta seconds before scaling. */
    this.rawDelta = 0;
    /** Smoothed delta for stable visual interpolation. */
    this.smoothDelta = 0;
    /** Multiplier applied to delta (0 = frozen, 1 = normal, 0.2 = slow-mo). */
    this.timeScale = 1;
    /** Hard cap on raw delta to avoid huge steps after tab switches. */
    this.maxDelta = 0.1;
    /** Fixed timestep used by the simulation accumulator. */
    this.fixedStep = 1 / 60;
    /** Frame counter. */
    this.frame = 0;
    /** Frames per second estimate. */
    this.fps = 0;
    this._fpsAccum = 0;
    this._fpsFrames = 0;
    /** Hit-stop timer: while > 0, effective delta is forced to ~0. */
    this._hitStop = 0;
    /** Optional external "now" function for testability. */
    this._now = (typeof performance !== 'undefined') ? performance.now.bind(performance) : Date.now;
  }

  start() {
    if (this._running) return;
    this._startTime = this._now();
    this._oldTime = this._startTime;
    this._running = true;
  }

  stop() {
    if (!this._running) return;
    this._running = false;
  }

  get running() { return this._running; }

  /** Advance the clock. Call once per animation frame. */
  tick() {
    if (!this._running) {
      if (this._autoStart) this.start();
      else return 0;
    }
    const now = this._now();
    let dt = (now - this._oldTime) / 1000;
    this._oldTime = now;
    if (dt < 0) dt = 0;
    if (dt > this.maxDelta) dt = this.maxDelta;

    this.rawDelta = dt;
    this.realElapsed += dt;

    // hit-stop overrides time scale momentarily
    if (this._hitStop > 0) {
      this._hitStop -= dt;
      if (this._hitStop < 0) this._hitStop = 0;
      dt = 0;
    }

    this.delta = dt * this.timeScale;
    this.elapsed += this.delta;

    // smoothed delta (low-pass)
    const a = 0.12;
    this.smoothDelta = this.smoothDelta === 0 ? this.delta : this.smoothDelta + (this.delta - this.smoothDelta) * a;

    this.frame++;
    this._fpsAccum += dt;
    this._fpsFrames++;
    if (this._fpsAccum >= 0.5) {
      this.fps = this._fpsFrames / this._fpsAccum;
      this._fpsAccum = 0;
      this._fpsFrames = 0;
    }
    return this.delta;
  }

  /** Pause the effective time flow without stopping the clock. */
  freeze(seconds = 0.08) { if (seconds > this._hitStop) this._hitStop = seconds; }

  /** Brief slow-motion effect that eases back to normal over `duration`. */
  slowmo(scale, duration, easeBack = true) {
    this._slowmo = { scale, duration, remaining: duration, easeBack };
    this.timeScale = scale;
  }

  /** Update slow-mo easing (called by engine each frame after tick). */
  updateTimers() {
    if (this._slowmo) {
      this._slowmo.remaining -= this.rawDelta;
      if (this._slowmo.remaining <= 0) {
        this.timeScale = 1;
        this._slowmo = null;
      } else if (this._slowmo.easeBack) {
        const t = this._slowmo.remaining / this._slowmo.duration;
        // ease from current scale back toward 1
        this.timeScale = 1 + (this._slowmo.scale - 1) * t;
      }
    }
  }

  /** Reset all accumulators. */
  reset() {
    this.elapsed = 0;
    this.realElapsed = 0;
    this.delta = 0;
    this.rawDelta = 0;
    this.smoothDelta = 0;
    this.frame = 0;
    this._hitStop = 0;
    this._slowmo = null;
    this.timeScale = 1;
    this._oldTime = this._now();
  }

  /** Current time in seconds (high resolution). */
  now() { return this._now() / 1000; }
}

/** A reusable countdown timer that ticks against a Clock's delta. */
export class Timer {
  constructor(duration = 0, onComplete = null, repeat = false) {
    this.duration = duration;
    this.elapsed = 0;
    this.onComplete = onComplete;
    this.repeat = repeat;
    this.active = false;
    this.paused = false;
  }

  start(duration) {
    if (duration !== undefined) this.duration = duration;
    this.elapsed = 0;
    this.active = true;
    this.paused = false;
    return this;
  }

  stop() { this.active = false; return this; }
  pause() { this.paused = true; return this; }
  resume() { this.paused = false; return this; }

  /** Advance by `dt` seconds. Returns true if the timer completed this tick. */
  tick(dt) {
    if (!this.active || this.paused || this.duration <= 0) return false;
    this.elapsed += dt;
    if (this.elapsed >= this.duration) {
      if (this.repeat) this.elapsed = this.elapsed % this.duration;
      else this.active = false;
      if (this.onComplete) this.onComplete();
      return true;
    }
    return false;
  }

  get progress() { return this.duration > 0 ? Math.min(1, this.elapsed / this.duration) : 0; }
  get remaining() { return Math.max(0, this.duration - this.elapsed); }
  get done() { return !this.active && this.elapsed >= this.duration; }
}

/** A stopwatch for profiling named scopes. */
export class Profiler {
  constructor() { this._marks = new Map(); this._acc = new Map(); this._counts = new Map(); }
  begin(name) { this._marks.set(name, performance.now()); }
  end(name) {
    const s = this._marks.get(name);
    if (s === undefined) return;
    const dt = performance.now() - s;
    this._acc.set(name, (this._acc.get(name) || 0) + dt);
    this._counts.set(name, (this._counts.get(name) || 0) + 1);
    this._marks.delete(name);
    return dt;
  }
  report() {
    const out = {};
    for (const name of this._acc.keys()) {
      const total = this._acc.get(name);
      const count = this._counts.get(name);
      out[name] = { total, count, avg: count ? total / count : 0 };
    }
    return out;
  }
  reset() { this._acc.clear(); this._counts.clear(); this._marks.clear(); }
}
