// ============================================================================
// Random.js
// Seeded pseudo-random number generators and a rich toolbox of distribution
// helpers. Deterministic seeding enables reproducible procedural generation
// and replayable runs. Includes Mulberry32 (fast, good quality) and xfnv1a
// hashing for string-keyed seeds. All helpers operate on a bound generator so
// different subsystems can share or isolate randomness streams.
// ============================================================================

/** xfnv1a hash: turn a string into a 32-bit unsigned seed. */
export function hashSeed(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  }
  return h >>> 0;
}

/** Mulberry32 PRNG factory. Returns a function producing [0,1). */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** SplitMix32: an alternative generator good for streaming sub-streams. */
export function splitmix32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x9E3779B9) | 0;
    let t = a ^ (a >>> 16);
    t = Math.imul(t, 0x21F0AAAD);
    t = t ^ (t >>> 15);
    t = Math.imul(t, 0x735A2D97);
    return ((t ^ (t >>> 15)) >>> 0) / 4294967296;
  };
}

export class Random {
  constructor(seed = 0) {
    this.seed = (typeof seed === 'string') ? hashSeed(seed) : (seed >>> 0);
    this._next = mulberry32(this.seed);
    this._spare = null; // for gaussian
  }

  /** Re-seed the generator. */
  reseed(seed) {
    this.seed = (typeof seed === 'string') ? hashSeed(seed) : (seed >>> 0);
    this._next = mulberry32(this.seed);
    this._spare = null;
  }

  /** Float in [0,1). */
  next() { return this._next(); }

  /** Float in [min,max). */
  range(min, max) { return min + (max - min) * this._next(); }

  /** Integer in [min,max] inclusive. */
  int(min, max) { return Math.floor(this.range(min, max + 1)); }

  /** Returns true with probability p (0..1). */
  chance(p) { return this._next() < p; }

  /** Pick a random element from an array. */
  pick(arr) { return arr[Math.floor(this._next() * arr.length)]; }

  /** Pick a random element and remove it from the array. */
  take(arr) {
    const i = Math.floor(this._next() * arr.length);
    return arr.splice(i, 1)[0];
  }

  /** Shuffle an array in place (Fisher–Yates) and return it. */
  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(this._next() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /** Weighted pick: weights is a parallel array of numbers. */
  weighted(items, weights) {
    let total = 0;
    for (const w of weights) total += w;
    let r = this._next() * total;
    for (let i = 0; i < items.length; i++) {
      r -= weights[i];
      if (r <= 0) return items[i];
    }
    return items[items.length - 1];
  }

  /** Gaussian sample via Box–Muller (mean=0, stddev=1). */
  gaussian() {
    if (this._spare !== null) { const s = this._spare; this._spare = null; return s; }
    let u = 0, v = 0, s = 0;
    do { u = this._next() * 2 - 1; v = this._next() * 2 - 1; s = u * u + v * v; } while (s >= 1 || s === 0);
    const mul = Math.sqrt(-2 * Math.log(s) / s);
    this._spare = v * mul;
    return u * mul;
  }

  /** Gaussian with given mean and stddev. */
  gaussianRange(mean, stddev) { return mean + this.gaussian() * stddev; }

  /** Random sign (+1 or -1). */
  sign() { return this._next() < 0.5 ? -1 : 1; }

  /** Random unit vector (2D) as {x,y}. */
  unit2() { const a = this.range(0, Math.PI * 2); return { x: Math.cos(a), y: Math.sin(a) }; }

  /** Random point inside a circle of given radius. */
  inCircle(radius = 1) {
    const a = this.range(0, Math.PI * 2);
    const r = radius * Math.sqrt(this._next());
    return { x: Math.cos(a) * r, y: Math.sin(a) * r };
  }

  /** Random point on a circle's edge. */
  onCircle(radius = 1) { const a = this.range(0, Math.PI * 2); return { x: Math.cos(a) * radius, y: Math.sin(a) * radius }; }

  /** Random color as hex number (hue range configurable). */
  color(hueMin = 0, hueMax = 360) {
    const h = this.range(hueMin, hueMax) / 360;
    const s = this.range(0.55, 0.95);
    const l = this.range(0.45, 0.65);
    return hslToHex(h, s, l);
  }

  /** Dice roll: n dice of d sides, plus modifier. */
  dice(n, d, mod = 0) { let sum = mod; for (let i = 0; i < n; i++) sum += this.int(1, d); return sum; }

  /** Derive a child Random with an independent stream. */
  child(label) {
    const s = hashSeed(`${this.seed}:${label}:${this._next()}`);
    return new Random(s);
  }
}

/** Convert HSL (h,s,l in 0..1) to a hex integer. */
export function hslToHex(h, s, l) {
  let r, g, b;
  if (s === 0) { r = g = b = l; }
  else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return (Math.round(r * 255) << 16) | (Math.round(g * 255) << 8) | Math.round(b * 255);
}

/** Shared global RNG (non-deterministic, seeded from time). */
export const rng = new Random((Date.now() & 0xffffffff) >>> 0);
