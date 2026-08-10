/**
 * VOIDBREAK — scalar math helpers, easing functions and interpolation.
 *
 * Pure functions only — no DOM, no allocation-heavy patterns. Tested by the
 * unit suite under tests/math.test.js.
 */

import { EPSILON, DEG2RAD } from './constants.js';

/** Clamp `v` into [min, max]. */
export function clamp(v, min, max) {
  return v < min ? min : v > max ? max : v;
}

/** Clamp `v` into [0, 1]. */
export function clamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/** Linear interpolation: a + (b - a) * t. */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

/** Inverse lerp: returns t such that lerp(a, b, t) === v. */
export function inverseLerp(a, b, v) {
  const d = b - a;
  if (Math.abs(d) < EPSILON) return 0.5;
  return (v - a) / d;
}

/** Linear interpolation clamped to [0,1] factor. */
export function lerpClamped(a, b, t) {
  return lerp(a, b, clamp01(t));
}

/** Map v from [a0,a1] into [b0,b1], clamped. */
export function mapRange(v, a0, a1, b0, b1) {
  return lerp(b0, b1, clamp01(inverseLerp(a0, a1, v)));
}

/** Smoothstep: Hermite interpolation between 0 and 1. */
export function smoothstep(edge0, edge1, x) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/** Smootherstep: 5th-order smoothstep. */
export function smootherstep(edge0, edge1, x) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * t * (t * (t * 6 - 15) + 10);
}

/** Frame-rate independent exponential approach: moves v toward target. */
export function damp(v, target, lambda, dt) {
  return lerp(v, target, 1 - Math.exp(-lambda * dt));
}

/**
 * Frame-rate independent spring damper (position/velocity spring).
 * Returns { pos, vel } updated toward targetPos with spring params.
 */
export function spring(pos, vel, targetPos, stiffness, damping, dt) {
  const f = 1 + 2 * damping * dt * stiffness + dt * dt * stiffness * stiffness;
  const x0 = pos - targetPos;
  const x1 = vel + dt * stiffness * x0;
  const posOut = targetPos + (x0 + dt * x1) / f;
  const velOut = (vel + dt * stiffness * x1) / f;
  return { pos: posOut, vel: velOut };
}

/** Repeat t into [0, period). */
export function repeat(t, period) {
  const r = t % period;
  return r < 0 ? r + period : r;
}

/** Ping-pong t into [0, period] oscillating. */
export function pingPong(t, period) {
  const r = repeat(t, period * 2);
  return r <= period ? r : period * 2 - r;
}

/** Wrap an angle (radians) into (-PI, PI]. */
export function wrapAngle(a) {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a <= -Math.PI) a += Math.PI * 2;
  return a;
}

/** Shortest signed angular difference from a to b (radians). */
export function angleDelta(a, b) {
  return wrapAngle(b - a);
}

/** Linear interpolation of angles along the shortest path. */
export function lerpAngle(a, b, t) {
  return a + wrapAngle(b - a) * t;
}

/** Smooth damping of an angle along shortest path. */
export function dampAngle(a, b, lambda, dt) {
  return a + wrapAngle(b - a) * (1 - Math.exp(-lambda * dt));
}

/** Linear interpolation through an easing curve. `kind` names a curve. */
export function ease(kind, t) {
  const x = clamp01(t);
  switch (kind) {
    case 'linear': return x;
    case 'inQuad': return x * x;
    case 'outQuad': return x * (2 - x);
    case 'inOutQuad': return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    case 'inCubic': return x * x * x;
    case 'outCubic': return 1 - Math.pow(1 - x, 3);
    case 'inOutCubic':
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    case 'inQuart': return x * x * x * x;
    case 'outQuart': return 1 - Math.pow(1 - x, 4);
    case 'inOutQuart':
      return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
    case 'inQuint': return x * x * x * x * x;
    case 'outQuint': return 1 - Math.pow(1 - x, 5);
    case 'inOutQuint':
      return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
    case 'inSine': return 1 - Math.cos(x * Math.PI / 2);
    case 'outSine': return Math.sin(x * Math.PI / 2);
    case 'inOutSine': return -(Math.cos(Math.PI * x) - 1) / 2;
    case 'inExpo': return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
    case 'outExpo': return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    case 'inOutExpo':
      return x === 0 ? 0 : x === 1 ? 1
        : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
        : (2 - Math.pow(2, -20 * x + 10)) / 2;
    case 'inCirc': return 1 - Math.sqrt(1 - x * x);
    case 'outCirc': return Math.sqrt(1 - Math.pow(x - 1, 2));
    case 'inOutCirc':
      return x < 0.5
        ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
        : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
    case 'inBack': {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return c3 * x * x * x - c1 * x * x;
    }
    case 'outBack': {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    }
    case 'inElastic':
      return x === 0 ? 0 : x === 1 ? 1
        : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * ((2 * Math.PI) / 3));
    case 'outElastic':
      return x === 0 ? 0 : x === 1 ? 1
        : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
    case 'outBounce': {
      const n1 = 7.5625;
      const d1 = 2.75;
      if (x < 1 / d1) return n1 * x * x;
      if (x < 2 / d1) { const xx = x - 1.5 / d1; return n1 * xx * xx + 0.75; }
      if (x < 2.5 / d1) { const xx = x - 2.25 / d1; return n1 * xx * xx + 0.9375; }
      const xx = x - 2.625 / d1;
      return n1 * xx * xx + 0.984375;
    }
    case 'inOutBack': {
      const c1 = 1.70158;
      const c2 = c1 * 1.525;
      return x < 0.5
        ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
        : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
    }
    default: return x;
  }
}

/** Degrees → radians. */
export function deg2rad(deg) {
  return deg * DEG2RAD;
}

/** Radians → degrees. */
export function rad2deg(rad) {
  return rad / DEG2RAD;
}

/** True if `v` is a finite number. */
export function isFiniteNumber(v) {
  return typeof v === 'number' && Number.isFinite(v);
}

/** Approximate equality within epsilon. */
export function approx(a, b, eps = EPSILON) {
  return Math.abs(a - b) <= eps;
}

/** Move `v` toward `target` by at most `maxDelta`. */
export function moveTowards(v, target, maxDelta) {
  if (Math.abs(target - v) <= maxDelta) return target;
  return v + Math.sign(target - v) * maxDelta;
}

/** Returns the fractional part of x (always non-negative). */
export function fract(x) {
  return x - Math.floor(x);
}

/** Round to `places` decimals. */
export function roundTo(x, places = 0) {
  const p = Math.pow(10, places);
  return Math.round(x * p) / p;
}

/** Hash a small number into a pseudo-random float in [0,1) (cheap, no allocation). */
export function hash01(x) {
  const s = Math.sin(x) * 43758.5453123;
  return s - Math.floor(s);
}

/** Binary search for largest i such that arr[i] <= v. Assumes arr sorted ascending. */
export function binarySearchLE(arr, v) {
  let lo = 0;
  let hi = arr.length - 1;
  let result = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] <= v) {
      result = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return result;
}

/** Weighted choice helper: pick index given cumulative weights array. */
export function weightedIndex(cumulative, r) {
  return binarySearchLE(cumulative, r);
}

/** Format a number with thousands separators. */
export function formatNumber(n) {
  if (!Number.isFinite(n)) return '∞';
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/** Format seconds as M:SS. */
export function formatTime(seconds) {
  const s = Math.max(0, Math.floor(seconds));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${rem.toString().padStart(2, '0')}`;
}

/** Format seconds as a compact duration for run records. */
export function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}
