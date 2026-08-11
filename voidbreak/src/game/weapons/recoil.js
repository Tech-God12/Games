/**
 * VOIDBREAK — Recoil.
 *
 * Recoil patterns: each weapon defines a set of "kicks" that push the camera
 * pitch/yaw and spread. Recoil recovers over time (pulled back by
 * recovery speed). Patterns can be scripted per shot index for satisfying
 * spray control.
 */

import { clamp, lerp } from '../../core/math.js';

export class Recoil {
  constructor(def = {}) {
    /** Vertical kick per shot (degrees). */
    this.vertical = def.vertical ?? 0.6;
    /** Horizontal kick per shot (degrees, signed). */
    this.horizontal = def.horizontal ?? 0.2;
    /** Random horizontal jitter amplitude. */
    this.randomHor = def.randomHor ?? 0.15;
    /** Pattern curve: list of [vertical, horizontal] multipliers per shot. */
    this.pattern = def.pattern ?? null;
    /** Recovery speed: how fast the camera returns (degrees/sec). */
    this.recovery = def.recovery ?? 8;
    /** Time before recovery starts (sec). */
    this.recoveryDelay = def.recoveryDelay ?? 0.08;

    this.pitch = 0;
    this.yaw = 0;
    this.spread = 0;
    this.shots = 0;
    this._recoverTimer = 0;
  }

  /** Fire a shot: add kick. Returns {pitchDelta, yawDelta} for camera shake. */
  kick(rng = Math.random) {
    let v = this.vertical;
    let h = this.horizontal;
    if (this.pattern) {
      const idx = this.shots % this.pattern.length;
      const [pv, ph] = this.pattern[idx];
      v *= pv;
      h *= ph;
    }
    const yawDelta = h + (rng() * 2 - 1) * this.randomHor;
    this.pitch += v;
    this.yaw += yawDelta;
    this.spread += this.vertical * 0.55;
    this.shots++;
    this._recoverTimer = this.recoveryDelay;
    return { pitchDelta: v, yawDelta };
  }

  /** Update recoil recovery; returns smoothed camera offsets. */
  update(dt, opts = {}) {
    if (this.pitch === 0 && this.yaw === 0 && this.spread === 0) return this;
    if (this._recoverTimer > 0) {
      this._recoverTimer -= dt;
      return this;
    }
    const speed = this.recovery * (opts.ads ? 0.7 : 1);
    this.pitch = Math.max(0, this.pitch - speed * dt);
    this.yaw = lerp(this.yaw, 0, clamp(1 - Math.exp(-4 * dt), 0, 1));
    this.spread = Math.max(0, this.spread - this.recovery * 0.5 * dt);
    return this;
  }

  /** Current spread contribution in degrees. */
  get spreadDeg() {
    return this.spread;
  }

  /** Reset recoil state (weapon switch). */
  reset() {
    this.pitch = 0;
    this.yaw = 0;
    this.spread = 0;
    this.shots = 0;
  }

  /** Recoil fade-out factor for the viewmodel kick animation. */
  get viewKick() {
    return clamp(this.pitch / 3, 0, 1);
  }
}
