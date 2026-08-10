/**
 * VOIDBREAK — Color utilities.
 *
 * Parsing, conversion, HSL/HSV manipulation, interpolation, palettes and
 * CSS/hex helpers. Pure — unit tested. Colors are stored as arrays of
 * [r, g, b, a] floats in [0,1] in engine code; this module converts to and
 * from CSS strings and hex.
 */

import { clamp, clamp01, lerp } from './math.js';

export class Color {
  constructor(r = 0, g = 0, b = 0, a = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  set(r, g, b, a = this.a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    return this;
  }

  copy(c) {
    this.r = c.r;
    this.g = c.g;
    this.b = c.b;
    this.a = c.a;
    return this;
  }

  clone() {
    return new Color(this.r, this.g, this.b, this.a);
  }

  /** Set from CSS color string (#rgb, #rrggbb, #rrggbbaa, rgb(), rgba(), hsl(), named). */
  setFromString(str) {
    const c = parseColor(str);
    if (!c) return this;
    this.r = c[0];
    this.g = c[1];
    this.b = c[2];
    this.a = c[3];
    return this;
  }

  /** Linear → sRGB gamma correction. */
  toGamma(gamma = 2.2) {
    this.r = Math.pow(this.r, 1 / gamma);
    this.g = Math.pow(this.g, 1 / gamma);
    this.b = Math.pow(this.b, 1 / gamma);
    return this;
  }

  /** sRGB → linear. */
  toLinear(gamma = 2.2) {
    this.r = Math.pow(this.r, gamma);
    this.g = Math.pow(this.g, gamma);
    this.b = Math.pow(this.b, gamma);
    return this;
  }

  mulScalar(s) {
    this.r *= s;
    this.g *= s;
    this.b *= s;
    return this;
  }

  mul(c) {
    this.r *= c.r;
    this.g *= c.g;
    this.b *= c.b;
    return this;
  }

  add(c) {
    this.r += c.r;
    this.g += c.g;
    this.b += c.b;
    return this;
  }

  lerp(c, t) {
    this.r = lerp(this.r, c.r, t);
    this.g = lerp(this.g, c.g, t);
    this.b = lerp(this.b, c.b, t);
    this.a = lerp(this.a, c.a, t);
    return this;
  }

  clamp() {
    this.r = clamp01(this.r);
    this.g = clamp01(this.g);
    this.b = clamp01(this.b);
    this.a = clamp01(this.a);
    return this;
  }

  /** Perceived luminance (sRGB weights). */
  luma() {
    return this.r * 0.2126 + this.g * 0.7152 + this.b * 0.0722;
  }

  toCss() {
    const r = Math.round(clamp01(this.r) * 255);
    const g = Math.round(clamp01(this.g) * 255);
    const b = Math.round(clamp01(this.b) * 255);
    const a = clamp01(this.a);
    if (a >= 1) return `rgb(${r},${g},${b})`;
    return `rgba(${r},${g},${b},${a.toFixed(3)})`;
  }

  toHex() {
    const r = Math.round(clamp01(this.r) * 255).toString(16).padStart(2, '0');
    const g = Math.round(clamp01(this.g) * 255).toString(16).padStart(2, '0');
    const b = Math.round(clamp01(this.b) * 255).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  }

  toArray(out = [0, 0, 0, 1]) {
    out[0] = this.r;
    out[1] = this.g;
    out[2] = this.b;
    out[3] = this.a;
    return out;
  }

  toFloat32(out = new Float32Array(4)) {
    out[0] = this.r;
    out[1] = this.g;
    out[2] = this.b;
    out[3] = this.a;
    return out;
  }

  toString() {
    return this.toCss();
  }

  static fromCss(str) {
    return new Color().setFromString(str);
  }

  static fromHex(hex) {
    return new Color().setFromString(hex);
  }

  static fromHsl(h, s, l, a = 1) {
    const c = new Color();
    const [r, g, b] = hslToRgb(h, s, l);
    return c.set(r, g, b, a);
  }

  static fromHsv(h, s, v, a = 1) {
    const c = new Color();
    const [r, g, b] = hsvToRgb(h, s, v);
    return c.set(r, g, b, a);
  }

  static white() { return new Color(1, 1, 1, 1); }
  static black() { return new Color(0, 0, 0, 1); }
  static gray(v = 0.5, a = 1) { return new Color(v, v, v, a); }

  static mix(a, b, t) {
    return a.clone().lerp(b, t);
  }
}

/** Parse CSS color to [r,g,b,a] floats or null. */
export function parseColor(input) {
  if (typeof input !== 'string') return null;
  let str = input.trim().toLowerCase();
  const named = {
    black: '#000000', white: '#ffffff', red: '#ff0000', green: '#00ff00',
    blue: '#0000ff', yellow: '#ffff00', cyan: '#00ffff', magenta: '#ff00ff',
    gray: '#808080', grey: '#808080', orange: '#ffa500', purple: '#800080',
    transparent: 'rgba(0,0,0,0)',
  };
  if (named[str] !== undefined) str = named[str];

  if (str.startsWith('#')) {
    let hex = str.slice(1);
    if (hex.length === 3 || hex.length === 4) {
      const r = hex[0], g = hex[1], b = hex[2];
      const a = hex.length === 4 ? hex[3] : 'f';
      hex = r + r + g + g + b + b + a + a;
    }
    if (hex.length !== 6 && hex.length !== 8) return null;
    const int = parseInt(hex, 16);
    if (Number.isNaN(int)) return null;
    if (hex.length === 8) {
      const r = ((int >> 24) & 0xff) / 255;
      const g = ((int >> 16) & 0xff) / 255;
      const b = ((int >> 8) & 0xff) / 255;
      const a = (int & 0xff) / 255;
      return [r, g, b, a];
    }
    const r = ((int >> 16) & 0xff) / 255;
    const g = ((int >> 8) & 0xff) / 255;
    const b = (int & 0xff) / 255;
    return [r, g, b, 1];
  }

  if (str.startsWith('rgb')) {
    const m = str.match(/rgba?\(\s*([\d.]+%?)\s*,\s*([\d.]+%?)\s*,\s*([\d.]+%?)\s*(?:,\s*([\d.]+%?)\s*)?\)/);
    if (!m) return null;
    const conv = (v) => v.endsWith('%') ? parseFloat(v) / 100 : parseFloat(v) / 255;
    const a = m[4] !== undefined ? (m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4])) : 1;
    return [conv(m[1]), conv(m[2]), conv(m[3]), a];
  }

  if (str.startsWith('hsl')) {
    const m = str.match(/hsla?\(\s*([\d.]+)(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+%?)\s*)?\)/);
    if (!m) return null;
    const h = parseFloat(m[1]) / 360;
    const s = parseFloat(m[2]) / 100;
    const l = parseFloat(m[3]) / 100;
    const a = m[4] !== undefined ? (m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4])) : 1;
    const [r, g, b] = hslToRgb(h, s, l);
    return [r, g, b, a];
  }

  return null;
}

/** HSL (h in [0,1]) → RGB floats. */
export function hslToRgb(h, s, l) {
  if (s === 0) return [l, l, l];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue2rgb = (p2, q2, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p2 + (q2 - p2) * 6 * t;
    if (t < 1 / 2) return q2;
    if (t < 2 / 3) return p2 + (q2 - p2) * (2 / 3 - t) * 6;
    return p2;
  };
  return [
    hue2rgb(p, q, h + 1 / 3),
    hue2rgb(p, q, h),
    hue2rgb(p, q, h - 1 / 3),
  ];
}

/** RGB floats → HSL (h in [0,1]). */
export function rgbToHsl(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return [h, s, l];
}

/** HSV → RGB floats. */
export function hsvToRgb(h, s, v) {
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: return [v, t, p];
    case 1: return [q, v, p];
    case 2: return [p, v, t];
    case 3: return [p, q, v];
    case 4: return [t, p, v];
    default: return [v, p, q];
  }
}

/** RGB floats → HSV. */
export function rgbToHsv(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const v = max;
  const d = max - min;
  const s = max === 0 ? 0 : d / max;
  let h = 0;
  if (max !== min) {
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return [h, s, v];
}

/** Shade: mix toward black (amount<0) or white (amount>0). */
export function shadeColor(str, amount) {
  const c = parseColor(str);
  if (!c) return str;
  const t = Math.abs(amount);
  const target = amount < 0 ? 0 : 1;
  return new Color(lerp(c[0], target, t), lerp(c[1], target, t), lerp(c[2], target, t), c[3]).toCss();
}

/** Darken a CSS color by factor f in [0,1]. */
export function darken(str, f) {
  return shadeColor(str, -clamp01(f));
}

/** Lighten a CSS color by factor f in [0,1]. */
export function lighten(str, f) {
  return shadeColor(str, clamp01(f));
}

/** Blend two CSS colors. */
export function mixCss(a, b, t) {
  const ca = parseColor(a);
  const cb = parseColor(b);
  if (!ca || !cb) return t < 0.5 ? a : b;
  return new Color(
    lerp(ca[0], cb[0], t),
    lerp(ca[1], cb[1], t),
    lerp(ca[2], cb[2], t),
    lerp(ca[3], cb[3], t),
  ).toCss();
}

/** Convert CSS color to an array of floats [r,g,b,a]. */
export function cssToArray(str, out = [0, 0, 0, 1]) {
  const c = parseColor(str);
  if (!c) return out;
  out[0] = c[0];
  out[1] = c[1];
  out[2] = c[2];
  out[3] = c[3];
  return out;
}

/** Float array → CSS string. */
export function arrayToCss(rgba, alphaOverride = null) {
  const r = Math.round(clamp(rgba[0], 0, 1) * 255);
  const g = Math.round(clamp(rgba[1], 0, 1) * 255);
  const b = Math.round(clamp(rgba[2], 0, 1) * 255);
  const a = alphaOverride !== null ? alphaOverride : rgba[3];
  if (a >= 1) return `rgb(${r},${g},${b})`;
  return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}

/** Named palette used across the game UI. */
export const PALETTE = Object.freeze({
  accent: '#35f0ff',
  accent2: '#ff3d7f',
  gold: '#ffd166',
  warn: '#ffb000',
  danger: '#ff3b3b',
  ok: '#4dffa6',
  energy: '#6aa8ff',
  plasma: '#b26bff',
  fire: '#ff7a3d',
  ice: '#7df0ff',
  void: '#0b0e1a',
  panel: '#0a0f18',
  text: '#e8f4ff',
  textDim: '#8fa6bf',
});
