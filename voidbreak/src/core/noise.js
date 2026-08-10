/**
 * VOIDBREAK — Procedural noise (value noise, Perlin, simplex, fBm).
 *
 * Deterministic, seeded, and used for procedural textures, arena generation
 * and decorations. Pure — unit tested. All functions accept explicit seeds
 * and return values in [0,1] unless noted.
 */

import { hash2i, hash3i } from './rng.js';
import { clamp01, lerp } from './math.js';

function smooth(t) {
  return t * t * (3 - 2 * t);
}

function smooth5(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

/** 2D value noise in [0,1]. */
export function valueNoise2(x, y, seed = 0) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = smooth(fx);
  const uy = smooth(fy);

  const a = (hash2i(ix, iy, seed) & 0xffffff) / 0xffffff;
  const b = (hash2i(ix + 1, iy, seed) & 0xffffff) / 0xffffff;
  const c = (hash2i(ix, iy + 1, seed) & 0xffffff) / 0xffffff;
  const d = (hash2i(ix + 1, iy + 1, seed) & 0xffffff) / 0xffffff;

  return lerp(lerp(a, b, ux), lerp(c, d, ux), uy);
}

/** 3D value noise in [0,1]. */
export function valueNoise3(x, y, z, seed = 0) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const iz = Math.floor(z);
  const fx = smooth(x - ix);
  const fy = smooth(y - iy);
  const fz = smooth(z - iz);

  const v000 = (hash3i(ix, iy, iz, seed) & 0xffffff) / 0xffffff;
  const v100 = (hash3i(ix + 1, iy, iz, seed) & 0xffffff) / 0xffffff;
  const v010 = (hash3i(ix, iy + 1, iz, seed) & 0xffffff) / 0xffffff;
  const v110 = (hash3i(ix + 1, iy + 1, iz, seed) & 0xffffff) / 0xffffff;
  const v001 = (hash3i(ix, iy, iz + 1, seed) & 0xffffff) / 0xffffff;
  const v101 = (hash3i(ix + 1, iy, iz + 1, seed) & 0xffffff) / 0xffffff;
  const v011 = (hash3i(ix, iy + 1, iz + 1, seed) & 0xffffff) / 0xffffff;
  const v111 = (hash3i(ix + 1, iy + 1, iz + 1, seed) & 0xffffff) / 0xffffff;

  const x00 = lerp(v000, v100, fx);
  const x10 = lerp(v010, v110, fx);
  const x01 = lerp(v001, v101, fx);
  const x11 = lerp(v011, v111, fx);
  const y0 = lerp(x00, x10, fy);
  const y1 = lerp(x01, x11, fy);
  return lerp(y0, y1, fz);
}

/** Gradient vectors for Perlin noise. */
const GRAD2 = [
  [1, 0], [-1, 0], [0, 1], [0, -1],
  [0.70710678, 0.70710678], [-0.70710678, 0.70710678],
  [0.70710678, -0.70710678], [-0.70710678, -0.70710678],
];

const GRAD3 = [
  [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
  [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
  [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
];

function grad2(h, x, y) {
  const g = GRAD2[h & 7];
  return g[0] * x + g[1] * y;
}

function grad3(h, x, y, z) {
  const g = GRAD3[h % 12];
  return g[0] * x + g[1] * y + g[2] * z;
}

/** 2D Perlin noise in [-1, 1]. */
export function perlin2(x, y, seed = 0) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = smooth5(fx);
  const uy = smooth5(fy);

  const h00 = hash2i(ix, iy, seed);
  const h10 = hash2i(ix + 1, iy, seed);
  const h01 = hash2i(ix, iy + 1, seed);
  const h11 = hash2i(ix + 1, iy + 1, seed);

  const n00 = grad2(h00, fx, fy);
  const n10 = grad2(h10, fx - 1, fy);
  const n01 = grad2(h01, fx, fy - 1);
  const n11 = grad2(h11, fx - 1, fy - 1);

  const nx0 = lerp(n00, n10, ux);
  const nx1 = lerp(n01, n11, ux);
  return lerp(nx0, nx1, uy);
}

/** 3D Perlin noise in [-1, 1]. */
export function perlin3(x, y, z, seed = 0) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fy = y - iy;
  const fz = z - iz;
  const ux = smooth5(fx);
  const uy = smooth5(fy);
  const uz = smooth5(fz);

  const h000 = hash3i(ix, iy, iz, seed);
  const h100 = hash3i(ix + 1, iy, iz, seed);
  const h010 = hash3i(ix, iy + 1, iz, seed);
  const h110 = hash3i(ix + 1, iy + 1, iz, seed);
  const h001 = hash3i(ix, iy, iz + 1, seed);
  const h101 = hash3i(ix + 1, iy, iz + 1, seed);
  const h011 = hash3i(ix, iy + 1, iz + 1, seed);
  const h111 = hash3i(ix + 1, iy + 1, iz + 1, seed);

  const n000 = grad3(h000, fx, fy, fz);
  const n100 = grad3(h100, fx - 1, fy, fz);
  const n010 = grad3(h010, fx, fy - 1, fz);
  const n110 = grad3(h110, fx - 1, fy - 1, fz);
  const n001 = grad3(h001, fx, fy, fz - 1);
  const n101 = grad3(h101, fx - 1, fy, fz - 1);
  const n011 = grad3(h011, fx, fy - 1, fz - 1);
  const n111 = grad3(h111, fx - 1, fy - 1, fz - 1);

  const x00 = lerp(n000, n100, ux);
  const x10 = lerp(n010, n110, ux);
  const x01 = lerp(n001, n101, ux);
  const x11 = lerp(n011, n111, ux);
  const y0 = lerp(x00, x10, uy);
  const y1 = lerp(x01, x11, uy);
  return lerp(y0, y1, uz);
}

/**
 * Fractal Brownian motion. Returns roughly in [-1,1] for normalized output.
 */
export function fbm2(x, y, seed = 0, octaves = 4, lacunarity = 2, gain = 0.5, normalized = true) {
  let amp = 1;
  let freq = 1;
  let sum = 0;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += perlin2(x * freq, y * freq, seed + i * 1013) * amp;
    norm += amp;
    amp *= gain;
    freq *= lacunarity;
  }
  if (normalized && norm > 0) return sum / norm;
  return sum;
}

/** 3D fBm. */
export function fbm3(x, y, z, seed = 0, octaves = 4, lacunarity = 2, gain = 0.5, normalized = true) {
  let amp = 1;
  let freq = 1;
  let sum = 0;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += perlin3(x * freq, y * freq, z * freq, seed + i * 1013) * amp;
    norm += amp;
    amp *= gain;
    freq *= lacunarity;
  }
  if (normalized && norm > 0) return sum / norm;
  return sum;
}

/** Ridged multifractal (sharp ridges) in [0,1]. Good for mountains/veins. */
export function ridged2(x, y, seed = 0, octaves = 4) {
  let amp = 0.5;
  let freq = 1;
  let sum = 0;
  for (let i = 0; i < octaves; i++) {
    const n = 1 - Math.abs(perlin2(x * freq, y * freq, seed + i * 777));
    sum += n * n * amp;
    amp *= 0.5;
    freq *= 2.05;
  }
  return clamp01(sum);
}

/** Cellular (Voronoi-ish) distance noise in [0,1]. */
export function cellular2(x, y, seed = 0) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  let f1 = 1e9;
  let f2 = 1e9;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const cx = ix + dx;
      const cy = iy + dy;
      const h = hash2i(cx, cy, seed);
      const px = cx + ((h & 0xff) / 255);
      const py = cy + (((h >> 8) & 0xff) / 255);
      const ddx = px - x;
      const ddy = py - y;
      const d = ddx * ddx + ddy * ddy;
      if (d < f1) {
        f2 = f1;
        f1 = d;
      } else if (d < f2) {
        f2 = d;
      }
    }
  }
  const r = Math.sqrt(f1);
  const r2 = Math.sqrt(f2);
  return clamp01(r / (r2 + 1e-6) * 0.5 + 0.5);
}

/** Value-noise fBm in [0,1] (softer than Perlin fBm). */
export function valueFbm2(x, y, seed = 0, octaves = 4) {
  let amp = 1;
  let freq = 1;
  let sum = 0;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += valueNoise2(x * freq, y * freq, seed + i * 313) * amp;
    norm += amp;
    amp *= 0.5;
    freq *= 2;
  }
  return clamp01(sum / norm);
}

/**
 * Domain-warped fBm — produces organic swirls for procedural textures.
 * Returns value in [0,1].
 */
export function warped2(x, y, seed = 0, strength = 3) {
  const dx = fbm2(x + 5.2, y + 1.3, seed, 3, 2, 0.5) * strength;
  const dy = fbm2(x + 8.7, y + 3.4, seed + 42, 3, 2, 0.5) * strength;
  return clamp01(fbm2(x + dx, y + dy, seed + 7, 4, 2, 0.5) * 0.5 + 0.5);
}

/** 2D simplex noise (Ken Perlin's improved simplex) in [-1, 1]. */
const F2 = 0.3660254037844386;
const G2 = 0.21132486540518713;

export function simplex2(x, y, seed = 0) {
  const s = (x + y) * F2;
  const i = Math.floor(x + s);
  const j = Math.floor(y + s);
  const t = (i + j) * G2;
  const x0 = x - (i - t);
  const y0 = y - (j - t);

  let i1, j1;
  if (x0 > y0) { i1 = 1; j1 = 0; } else { i1 = 0; j1 = 1; }

  const x1 = x0 - i1 + G2;
  const y1 = y0 - j1 + G2;
  const x2 = x0 - 1 + 2 * G2;
  const y2 = y0 - 1 + 2 * G2;

  const ii = i & 0xff;
  const jj = j & 0xff;

  let n0, n1, n2;

  let t0 = 0.5 - x0 * x0 - y0 * y0;
  if (t0 >= 0) {
    const gi0 = hash2i(ii, jj, seed) & 7;
    t0 *= t0;
    n0 = t0 * t0 * grad2(gi0, x0, y0);
  } else {
    n0 = 0;
  }

  let t1 = 0.5 - x1 * x1 - y1 * y1;
  if (t1 >= 0) {
    const gi1 = hash2i(ii + i1, jj + j1, seed) & 7;
    t1 *= t1;
    n1 = t1 * t1 * grad2(gi1, x1, y1);
  } else {
    n1 = 0;
  }

  let t2 = 0.5 - x2 * x2 - y2 * y2;
  if (t2 >= 0) {
    const gi2 = hash2i(ii + 1, jj + 1, seed) & 7;
    t2 *= t2;
    n2 = t2 * t2 * grad2(gi2, x2, y2);
  } else {
    n2 = 0;
  }

  return 70.142857 * (n0 + n1 + n2);
}

/** Normalized simplex noise in [0,1]. */
export function simplex2n(x, y, seed = 0) {
  return clamp01(simplex2(x, y, seed) * 0.5 + 0.5);
}
