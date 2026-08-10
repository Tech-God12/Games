/**
 * VOIDBREAK — Seeded pseudo-random number generator and helpers.
 *
 * The game is fully deterministic given a seed: every arena, wave and enemy
 * variation derives from a seeded RNG stream. This module provides
 * mulberry32 (fast, good distribution) plus a small API of distributions.
 * Pure — unit tested.
 */

export class RNG {
  /**
   * @param {number} seed integer seed. A string seed is hashed via fnv1a.
   */
  constructor(seed = 1337) {
    this.seed = typeof seed === 'string' ? hashString(seed) : seed >>> 0;
    this.state = this.seed >>> 0;
    this.calls = 0;
  }

  /** Reset to the initial seed. */
  reset() {
    this.state = this.seed >>> 0;
    this.calls = 0;
    return this;
  }

  /** Re-seed. */
  setSeed(seed) {
    this.seed = typeof seed === 'string' ? hashString(seed) : seed >>> 0;
    this.reset();
    return this;
  }

  /** Core mulberry32 step. Returns float in [0,1). */
  next() {
    this.calls++;
    let t = (this.state += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /** Float in [0, max) or [min, max). */
  float(max = 1, min = 0) {
    return min + this.next() * (max - min);
  }

  /** Integer in [min, max] inclusive. */
  int(min, max) {
    if (max === undefined) {
      max = min;
      min = 0;
    }
    return min + Math.floor(this.next() * (max - min + 1));
  }

  /** Integer in [min, max) exclusive of max. */
  intExclusive(min, max) {
    return min + Math.floor(this.next() * (max - min));
  }

  /** True with probability p. */
  chance(p) {
    return this.next() < p;
  }

  /** ±1 with equal probability. */
  sign() {
    return this.next() < 0.5 ? -1 : 1;
  }

  /** Float in [-1, 1]. */
  unit() {
    return this.next() * 2 - 1;
  }

  /** Float in [-max, max]. */
  spread(max = 1) {
    return (this.next() * 2 - 1) * max;
  }

  /** Random element of an array. */
  pick(arr) {
    if (arr.length === 0) return undefined;
    return arr[Math.floor(this.next() * arr.length)];
  }

  /** Random element with weights (array of [value, weight]). */
  pickWeighted(entries) {
    let total = 0;
    for (const [, w] of entries) total += w;
    let r = this.next() * total;
    for (const [value, w] of entries) {
      r -= w;
      if (r <= 0) return value;
    }
    return entries.length ? entries[entries.length - 1][0] : undefined;
  }

  /** Weighted index into a list of weights. */
  weightedIndex(weights) {
    let total = 0;
    for (const w of weights) total += w;
    let r = this.next() * total;
    for (let i = 0; i < weights.length; i++) {
      r -= weights[i];
      if (r <= 0) return i;
    }
    return weights.length - 1;
  }

  /** Shuffle an array in place (Fisher–Yates). */
  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  /** Pick n unique elements from an array (shallow copies). */
  sample(arr, n) {
    const copy = arr.slice();
    this.shuffle(copy);
    return copy.slice(0, Math.min(n, copy.length));
  }

  /** Gaussian-ish distribution (sum of uniforms, central limit). */
  gaussian(mean = 0, stdDev = 1) {
    const u = this.next() + this.next() + this.next() + this.next() + this.next() + this.next();
    return mean + (u - 3) / Math.sqrt(6 / 12) * stdDev * Math.sqrt(2) / 2;
  }

  /** Triangle distribution in [min, max] with mode. */
  triangular(min, max, mode = (min + max) / 2) {
    const u = this.next();
    const c = (mode - min) / (max - min);
    return u < c
      ? min + Math.sqrt(u * (max - min) * (mode - min))
      : max - Math.sqrt((1 - u) * (max - min) * (max - mode));
  }

  /** Random point inside a unit circle, returned as [x, y]. */
  pointInCircle(radius = 1) {
    const r = radius * Math.sqrt(this.next());
    const theta = this.next() * Math.PI * 2;
    return [r * Math.cos(theta), r * Math.sin(theta)];
  }

  /** Random point inside a unit sphere. */
  pointInSphere(radius = 1) {
    const u = this.next() * 2 - 1;
    const t = this.next() * Math.PI * 2;
    const r = radius * Math.cbrt(this.next());
    const s = Math.sqrt(1 - u * u);
    return [r * s * Math.cos(t), r * u, r * s * Math.sin(t)];
  }

  /** Random unit vector as [x, y, z]. */
  unitVector3() {
    const u = this.next() * 2 - 1;
    const t = this.next() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    return [s * Math.cos(t), u, s * Math.sin(t)];
  }

  /** Random angle in radians. */
  angle() {
    return this.next() * Math.PI * 2;
  }

  /** Random string token (for names/ids). */
  token(length = 8, alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789') {
    let out = '';
    for (let i = 0; i < length; i++) {
      out += alphabet[Math.floor(this.next() * alphabet.length)];
    }
    return out;
  }
}

/** FNV-1a 32-bit hash of a string. */
export function hashString(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Fast deterministic integer hash of a float coordinate (for noise). */
export function hash2i(x, y, seed = 0) {
  let h = seed ^ Math.imul(x | 0, 0x27d4eb2d) ^ Math.imul(y | 0, 0x165667b1);
  h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

/** Hash 3 integers → uint32. */
export function hash3i(x, y, z, seed = 0) {
  let h = seed
    ^ Math.imul(x | 0, 0x27d4eb2d)
    ^ Math.imul(y | 0, 0x165667b1)
    ^ Math.imul(z | 0, 0x9e3779b9);
  h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

/** Create a standalone random float in [0,1) from an integer (no RNG object). */
export function randInt01(i) {
  let t = (i + 0x6d2b79f5) >>> 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
