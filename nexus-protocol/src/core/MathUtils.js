// ============================================================================
// MathUtils.js
// General math helpers extending THREE.MathUtils with game-specific helpers:
// easing curves, range mapping, angle utilities, vector helpers on plain
// objects, hex/color helpers, and formatting. Kept dependency-light so it can
// be imported anywhere without pulling in THREE.
// ============================================================================

export const PI = Math.PI;
export const TAU = Math.PI * 2;
export const HALF_PI = Math.PI / 2;
export const DEG2RAD = Math.PI / 180;
export const RAD2DEG = 180 / Math.PI;
export const EPS = 1e-6;

export const clamp = (v, min, max) => v < min ? min : (v > max ? max : v);
export const clamp01 = (v) => v < 0 ? 0 : (v > 1 ? 1 : v);
export const lerp = (a, b, t) => a + (b - a) * t;
export const lerpAngle = (a, b, t) => a + shortAngleDist(a, b) * t;
export const inverseLerp = (a, b, v) => (v - a) / (b - a);
export const remap = (v, inMin, inMax, outMin, outMax) => lerp(outMin, outMax, clamp01(inverseLerp(inMin, inMax, v)));
export const smoothstep = (edge0, edge1, x) => { const t = clamp01((x - edge0) / (edge1 - edge0)); return t * t * (3 - 2 * t); };
export const smootherstep = (edge0, edge1, x) => { const t = clamp01((x - edge0) / (edge1 - edge0)); return t * t * t * (t * (t * 6 - 15) + 10); };
export const sign = (v) => v < 0 ? -1 : (v > 0 ? 1 : 0);
export const abs = Math.abs;
export const sq = (v) => v * v;
export const round = (v) => Math.round(v);
export const floor = (v) => Math.floor(v);
export const ceil = (v) => Math.ceil(v);

export const min = Math.min;
export const max = Math.max;

/** Smallest signed angular distance from a to b (radians). */
export function shortAngleDist(a, b) {
  let d = (b - a) % TAU;
  if (d < -PI) d += TAU;
  if (d > PI) d -= TAU;
  return d;
}

/** Linearly approach a value toward target by maxDelta. */
export function approach(current, target, maxDelta) {
  if (current < target) return Math.min(current + maxDelta, target);
  return Math.max(current - maxDelta, target);
}

/** Frame-rate independent exponential smoothing. */
export function damp(current, target, lambda, dt) {
  return lerp(current, target, 1 - Math.exp(-lambda * dt));
}

/** Damp for angles (shortest path). */
export function dampAngle(current, target, lambda, dt) {
  return current + shortAngleDist(current, target) * (1 - Math.exp(-lambda * dt));
}

// ---------- Easing curves ----------
export const Easing = {
  linear: (t) => t,
  inQuad: (t) => t * t,
  outQuad: (t) => 1 - (1 - t) * (1 - t),
  inOutQuad: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
  inCubic: (t) => t * t * t,
  outCubic: (t) => 1 - Math.pow(1 - t, 3),
  inOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  inQuart: (t) => t * t * t * t,
  outQuart: (t) => 1 - Math.pow(1 - t, 4),
  inOutQuart: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
  inExpo: (t) => t === 0 ? 0 : Math.pow(2, 10 * t - 10),
  outExpo: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  inOutExpo: (t) => {
    if (t === 0) return 0; if (t === 1) return 1;
    return t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2;
  },
  inBack: (t) => { const c1 = 1.70158, c3 = c1 + 1; return c3 * t * t * t - c1 * t * t; },
  outBack: (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
  inOutBack: (t) => {
    const c1 = 1.70158, c2 = c1 * 1.525;
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
  },
  outElastic: (t) => {
    const c4 = (2 * PI) / 3;
    return t === 0 ? 0 : (t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1);
  },
  outBounce: (t) => {
    const n1 = 7.5625, d1 = 2.75;
    if (t < 1 / d1) return n1 * t * t;
    if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
    if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  },
  inBounce: (t) => 1 - Easing.outBounce(1 - t),
  inOutBounce: (t) => t < 0.5 ? (1 - Easing.outBounce(1 - 2 * t)) / 2 : (1 + Easing.outBounce(2 * t - 1)) / 2,
};

// ---------- Vector helpers on plain {x,y,z} objects ----------
export const v2 = (x = 0, y = 0) => ({ x, y });
export const v3 = (x = 0, y = 0, z = 0) => ({ x, y, z });
export const v2len = (a) => Math.hypot(a.x, a.y);
export const v2dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
export const v2angle = (a) => Math.atan2(a.y, a.x);
export const v2add = (out, a, b) => { out.x = a.x + b.x; out.y = a.y + b.y; return out; };
export const v2sub = (out, a, b) => { out.x = a.x - b.x; out.y = a.y - b.y; return out; };
export const v2scale = (out, a, s) => { out.x = a.x * s; out.y = a.y * s; return out; };

// ---------- Formatting ----------
export function formatNumber(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(2) + 'K';
  return Math.floor(n).toString();
}

export function formatTime(seconds) {
  const s = Math.max(0, Math.floor(seconds));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export function formatPercent(v, digits = 0) { return (v * 100).toFixed(digits) + '%'; }

// ---------- Color helpers (hex int <-> rgb) ----------
export function hexToInt(hex) {
  if (typeof hex === 'number') return hex;
  if (typeof hex === 'string') {
    let s = hex.replace('#', '');
    if (s.length === 3) s = s.split('').map(c => c + c).join('');
    return parseInt(s, 16);
  }
  return 0;
}

export function intToHex(n) { return '#' + (n & 0xffffff).toString(16).padStart(6, '0'); }

export function hexToRGB(hex) {
  const n = hexToInt(hex);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function mixHex(a, b, t) {
  const ra = hexToRGB(a), rb = hexToRGB(b);
  const r = Math.round(lerp(ra.r, rb.r, t));
  const g = Math.round(lerp(ra.g, rb.g, t));
  const bl = Math.round(lerp(ra.b, rb.b, t));
  return (r << 16) | (g << 8) | bl;
}

export function darken(hex, t) { return mixHex(hex, 0x000000, t); }
export function lighten(hex, t) { return mixHex(hex, 0xffffff, t); }

/** Convert a hex int to a CSS rgba() string. */
export function hexToCSS(hex, alpha = 1) {
  const { r, g, b } = hexToRGB(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ---------- Misc ----------
/** Modulo that always returns non-negative for negative dividends. */
export function mod(n, m) { return ((n % m) + m) % m; }

/** Step function toward zero (used for friction). */
export function decay(value, rate, dt) {
  const k = 1 - Math.exp(-rate * dt);
  return value - value * k;
}

/** Is value approximately zero? */
export function nearZero(v, eps = EPS) { return Math.abs(v) < eps; }

/** Compute a stable hash for a string (FNV-1a, 32-bit). */
export function stringHash(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Map a 0..1 value across a piecewise curve defined by control points. */
export function piecewise(points, t) {
  if (t <= 0) return points[0][1];
  if (t >= 1) return points[points.length - 1][1];
  for (let i = 1; i < points.length; i++) {
    if (t <= points[i][0]) {
      const [t0, v0] = points[i - 1];
      const [t1, v1] = points[i];
      return lerp(v0, v1, clamp01((t - t0) / (t1 - t0)));
    }
  }
  return points[points.length - 1][1];
}

/** Build a seedable 1D value-noise function. */
export function makeValueNoise(seed = 1) {
  const perm = new Uint8Array(512);
  let s = seed >>> 0;
  const rnd = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  return (x) => {
    const i = Math.floor(x) & 255;
    const f = x - Math.floor(x);
    const u = f * f * (3 - 2 * f);
    const a = perm[i] / 255;
    const b = perm[i + 1] / 255;
    return lerp(a, b, u);
  };
}
