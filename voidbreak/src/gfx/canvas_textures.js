/**
 * VOIDBREAK — Procedural canvas textures.
 *
 * Every texture in the game is generated at runtime on a 2D canvas — no
 * image assets are shipped. This module provides the generator library:
 * noise tileables, glows, sparks, smoke, rings, grids, hex patterns, etc.
 *
 * All functions return an offscreen canvas ready for Texture upload.
 */

import { valueFbm2, perlin2, simplex2n, cellular2, warped2 } from '../core/noise.js';
import { hslToRgb } from '../core/color.js';
import { clamp01, smoothstep } from '../core/math.js';

export function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

function ctx2d(c) {
  return c.getContext('2d', { willReadFrequently: false });
}

/** Solid color texture. */
export function texSolid(w, h, r, g, b, a = 1) {
  const c = makeCanvas(w, h);
  const x = ctx2d(c);
  x.fillStyle = `rgba(${(r * 255) | 0},${(g * 255) | 0},${(b * 255) | 0},${a})`;
  x.fillRect(0, 0, w, h);
  return c;
}

/** Radial gradient glow (soft circle). Used for particles & lights. */
export function texGlow(size = 128, inner = [1, 1, 1], outer = [0, 0, 0]) {
  const c = makeCanvas(size, size);
  const x = ctx2d(c);
  const g = x.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, `rgba(${inner[0] * 255 | 0},${inner[1] * 255 | 0},${inner[2] * 255 | 0},1)`);
  g.addColorStop(0.35, `rgba(${inner[0] * 255 | 0},${inner[1] * 255 | 0},${inner[2] * 255 | 0},0.55)`);
  g.addColorStop(1, `rgba(${outer[0] * 255 | 0},${outer[1] * 255 | 0},${outer[2] * 255 | 0},0)`);
  x.fillStyle = g;
  x.fillRect(0, 0, size, size);
  return c;
}

/** Soft round particle (smooth falloff, white). */
export function texSoftParticle(size = 64) {
  const c = makeCanvas(size, size);
  const x = ctx2d(c);
  const g = x.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.6, 'rgba(255,255,255,0.9)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g;
  x.fillRect(0, 0, size, size);
  return c;
}

/** Spark — elongated streak along X. */
export function texSpark(size = 128) {
  const c = makeCanvas(size, size);
  const x = ctx2d(c);
  const grad = x.createLinearGradient(0, size / 2, size, size / 2);
  grad.addColorStop(0, 'rgba(255,255,255,0)');
  grad.addColorStop(0.4, 'rgba(255,255,255,1)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = grad;
  x.fillRect(0, size / 2 - 3, size, 6);
  return c;
}

/** Smoke puff — soft noisy blob with alpha falloff. */
export function texSmoke(size = 128, seed = 0) {
  const c = makeCanvas(size, size);
  const x = ctx2d(c);
  const img = x.createImageData(size, size);
  const d = img.data;
  for (let y = 0; y < size; y++) {
    for (let px = 0; px < size; px++) {
      const nx = px / size;
      const ny = y / size;
      const dist = Math.hypot(nx - 0.5, ny - 0.5) * 2;
      const n = warped2(nx * 4, ny * 4, seed, 2.2) * 0.6 + valueFbm2(nx * 3, ny * 3, seed + 11, 3) * 0.4;
      const a = (1 - smoothstep(0.45, 1.05, dist)) * smoothstep(0.0, 0.18, n);
      const v = 190 + n * 60;
      const i = (y * size + px) * 4;
      d[i] = v;
      d[i + 1] = v;
      d[i + 2] = v;
      d[i + 3] = clamp01(a) * 255;
    }
  }
  x.putImageData(img, 0, 0);
  return c;
}

/** Expanding ring (shockwave). */
export function texRing(size = 128, width = 0.14) {
  const c = makeCanvas(size, size);
  const x = ctx2d(c);
  const cx = size / 2;
  x.strokeStyle = 'rgba(255,255,255,1)';
  x.lineWidth = size * width;
  x.beginPath();
  x.arc(cx, cx, size * 0.36, 0, Math.PI * 2);
  x.stroke();
  x.globalCompositeOperation = 'destination-out';
  const g = x.createRadialGradient(cx, cx, size * 0.3, cx, cx, size * 0.5);
  g.addColorStop(0, 'rgba(0,0,0,0)');
  g.addColorStop(1, 'rgba(0,0,0,1)');
  x.fillStyle = g;
  x.fillRect(0, 0, size, size);
  return c;
}

/** Four-point star / cross flare. */
export function texStar(size = 128) {
  const c = makeCanvas(size, size);
  const x = ctx2d(c);
  const cx = size / 2;
  const grad = x.createRadialGradient(cx, cx, 0, cx, cx, size / 2);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = grad;
  x.fillRect(0, 0, size, size);
  x.globalCompositeOperation = 'lighter';
  x.fillStyle = 'rgba(255,255,255,0.9)';
  x.fillRect(cx - size * 0.02, 0, size * 0.04, size);
  x.fillRect(0, cx - size * 0.02, size, size * 0.04);
  return c;
}

/** Noise tileable texture (value fBm), tinted. */
export function texNoise(size = 256, seed = 0, tint = [1, 1, 1], intensity = 1, freq = 5) {
  const c = makeCanvas(size, size);
  const x = ctx2d(c);
  const img = x.createImageData(size, size);
  const d = img.data;
  for (let y = 0; y < size; y++) {
    for (let px = 0; px < size; px++) {
      const n = valueFbm2(px / size * freq, y / size * freq, seed, 4);
      const i = (y * size + px) * 4;
      d[i] = Math.max(0, Math.min(255, (0.5 + (n - 0.5) * intensity) * 255 * tint[0]));
      d[i + 1] = Math.max(0, Math.min(255, (0.5 + (n - 0.5) * intensity) * 255 * tint[1]));
      d[i + 2] = Math.max(0, Math.min(255, (0.5 + (n - 0.5) * intensity) * 255 * tint[2]));
      d[i + 3] = 255;
    }
  }
  x.putImageData(img, 0, 0);
  return c;
}

/**
 * Sci-fi floor plate texture: tileable grid of panels with grime and edge
 * highlights. `palette` = [base, panelLine, grime] arrays of [r,g,b].
 */
export function texFloorPlate(size = 512, seed = 0, palette = null) {
  const base = palette?.[0] ?? [0.14, 0.17, 0.24];
  const line = palette?.[1] ?? [0.25, 0.42, 0.55];
  const grime = palette?.[2] ?? [0.04, 0.05, 0.09];
  const c = makeCanvas(size, size);
  const x = ctx2d(c);

  x.fillStyle = `rgb(${base[0] * 255 | 0},${base[1] * 255 | 0},${base[2] * 255 | 0})`;
  x.fillRect(0, 0, size, size);
  const img = x.getImageData(0, 0, size, size);
  const d = img.data;
  const tile = 64;
  for (let y = 0; y < size; y++) {
    for (let px = 0; px < size; px++) {
      const i = (y * size + px) * 4;
      const n = valueFbm2(px / size * 8, y / size * 8, seed, 3);
      const grimeAmt = 0.35 * n + 0.2 * simplex2n(px / size * 12, y / size * 12, seed + 5);
      d[i] = base[0] * 255 * (1 - grimeAmt) + grime[0] * 255 * grimeAmt;
      d[i + 1] = base[1] * 255 * (1 - grimeAmt) + grime[1] * 255 * grimeAmt;
      d[i + 2] = base[2] * 255 * (1 - grimeAmt) + grime[2] * 255 * grimeAmt;
    }
  }
  x.putImageData(img, 0, 0);

  x.strokeStyle = `rgba(${line[0] * 255 | 0},${line[1] * 255 | 0},${line[2] * 255 | 0},0.9)`;
  x.lineWidth = 2;
  for (let gx = 0; gx < size; gx += tile) {
    x.beginPath();
    x.moveTo(gx, 0);
    x.lineTo(gx, size);
    x.stroke();
  }
  for (let gy = 0; gy < size; gy += tile) {
    x.beginPath();
    x.moveTo(0, gy);
    x.lineTo(size, gy);
    x.stroke();
  }
  x.strokeStyle = `rgba(${line[0] * 255 | 0},${line[1] * 255 | 0},${line[2] * 255 | 0},0.35)`;
  x.lineWidth = 1;
  for (let gx = tile / 2; gx < size; gx += tile) {
    for (let gy = tile / 2; gy < size; gy += tile) {
      x.strokeRect(gx - tile / 4, gy - tile / 4, tile / 2, tile / 2);
    }
  }
  let s = seed * 2654435761 >>> 0;
  const rand = () => { s = (Math.imul(s ^ (s >>> 13), 1274126177) >>> 0); return s / 4294967296; };
  for (let i = 0; i < 40; i++) {
    const gx = Math.floor(rand() * (size / tile)) * tile;
    const gy = Math.floor(rand() * (size / tile)) * tile;
    const bright = 0.25 + rand() * 0.4;
    x.fillStyle = `rgba(${line[0] * 255 * bright | 0},${line[1] * 255 * bright | 0},${line[2] * 255 * bright | 0},0.5)`;
    x.fillRect(gx + 4, gy + 4, tile - 8, 3);
    x.fillRect(gx + 4, gy + 4, 3, tile - 8);
  }
  const vg = x.createRadialGradient(size / 2, size / 2, size * 0.2, size / 2, size / 2, size * 0.75);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, 'rgba(0,0,0,0.35)');
  x.fillStyle = vg;
  x.fillRect(0, 0, size, size);
  return c;
}

/** Metal wall texture: brushed panels with bolts and scratches. */
export function texMetalPanel(size = 512, seed = 0, palette = null) {
  const base = palette?.[0] ?? [0.20, 0.23, 0.31];
  const line = palette?.[1] ?? [0.35, 0.45, 0.55];
  const grime = palette?.[2] ?? [0.03, 0.04, 0.07];
  const c = makeCanvas(size, size);
  const x = ctx2d(c);
  x.fillStyle = `rgb(${base[0] * 255 | 0},${base[1] * 255 | 0},${base[2] * 255 | 0})`;
  x.fillRect(0, 0, size, size);

  const img = x.getImageData(0, 0, size, size);
  const d = img.data;
  for (let y = 0; y < size; y++) {
    for (let px = 0; px < size; px++) {
      const i = (y * size + px) * 4;
      const n = valueFbm2(px / size * 10, y / size * 3, seed, 3);
      const streak = perlin2(px / size * 40, y / size * 6, seed + 3) * 0.12;
      const v = base[0] * 255 * (1 + streak) * (1 - n * 0.25);
      d[i] = v;
      d[i + 1] = v * (base[1] / base[0]);
      d[i + 2] = v * (base[2] / base[0]);
    }
  }
  x.putImageData(img, 0, 0);

  x.strokeStyle = `rgba(${line[0] * 255 | 0},${line[1] * 255 | 0},${line[2] * 255 | 0},0.8)`;
  x.lineWidth = 4;
  x.strokeRect(8, 8, size - 16, size - 16);
  x.strokeRect(48, 48, size - 96, size - 96);
  x.strokeStyle = 'rgba(0,0,0,0.5)';
  x.lineWidth = 2;
  x.strokeRect(20, 20, size - 40, size - 40);
  x.fillStyle = `rgba(${line[0] * 255 | 0},${line[1] * 255 | 0},${line[2] * 255 | 0},0.9)`;
  for (const [rx, ry] of [[8, 8], [size - 8, 8], [8, size - 8], [size - 8, size - 8]]) {
    x.beginPath();
    x.arc(rx, ry, 5, 0, Math.PI * 2);
    x.fill();
  }
  return c;
}

/** Hexagon plate pattern (hive / energy). */
export function texHex(size = 256, seed = 0, tint = [0.2, 0.55, 0.85], glowAmt = 0.5) {
  const c = makeCanvas(size, size);
  const x = ctx2d(c);
  x.fillStyle = '#05080d';
  x.fillRect(0, 0, size, size);
  const r = 16;
  const h = r * Math.sqrt(3) / 2;
  x.strokeStyle = `rgba(${tint[0] * 255 | 0},${tint[1] * 255 | 0},${tint[2] * 255 | 0},${0.8 * glowAmt})`;
  x.lineWidth = 1.5;
  for (let row = -1; row * h * 2 < size + h; row++) {
    for (let col = -1; col * r * 1.5 < size + r; col++) {
      const cx = col * r * 1.5 + (row % 2 === 0 ? 0 : r * 0.75);
      const cy = row * h * 2;
      x.beginPath();
      for (let k = 0; k < 6; k++) {
        const a = Math.PI / 3 * k + Math.PI / 6;
        const px = cx + Math.cos(a) * r;
        const py = cy + Math.sin(a) * r;
        if (k === 0) x.moveTo(px, py);
        else x.lineTo(px, py);
      }
      x.closePath();
      x.stroke();
    }
  }
  const vg = x.createRadialGradient(size / 2, size / 2, size * 0.2, size / 2, size / 2, size * 0.75);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, 'rgba(0,0,0,0.5)');
  x.fillStyle = vg;
  x.fillRect(0, 0, size, size);
  return c;
}

/** Scorch mark (dark radial with irregular edge). */
export function texScorch(size = 128, seed = 0) {
  const c = makeCanvas(size, size);
  const x = ctx2d(c);
  const img = x.createImageData(size, size);
  const d = img.data;
  for (let y = 0; y < size; y++) {
    for (let px = 0; px < size; px++) {
      const nx = px / size;
      const ny = y / size;
      const dist = Math.hypot(nx - 0.5, ny - 0.5) * 2;
      const n = cellular2(nx * 6, ny * 6, seed) * 0.6 + valueFbm2(nx * 5, ny * 5, seed + 7, 2) * 0.4;
      const edge = smoothstep(0.75, 0.35, dist + n * 0.35);
      const core = smoothstep(0.5, 0.0, dist) * 0.6;
      const a = clamp01(edge + core);
      const v = 8 + n * 14;
      const i = (y * size + px) * 4;
      d[i] = v;
      d[i + 1] = v;
      d[i + 2] = v + 4;
      d[i + 3] = a * 255;
    }
  }
  x.putImageData(img, 0, 0);
  return c;
}

/** Energy splat (alien voidblood) — brighter core, colored rim. */
export function texSplat(size = 128, seed = 0, tint = [0.35, 0.9, 1.0]) {
  const c = makeCanvas(size, size);
  const x = ctx2d(c);
  const img = x.createImageData(size, size);
  const d = img.data;
  for (let y = 0; y < size; y++) {
    for (let px = 0; px < size; px++) {
      const nx = px / size;
      const ny = y / size;
      const dist = Math.hypot(nx - 0.5, ny - 0.5) * 2;
      const n = cellular2(nx * 5, ny * 5, seed) * 0.7;
      const a = smoothstep(0.8, 0.2, dist + n * 0.5);
      const core = 1 - smoothstep(0.1, 0.6, dist);
      const i = (y * size + px) * 4;
      d[i] = (tint[0] * (0.3 + core) + 0.2 * core) * 255;
      d[i + 1] = (tint[1] * (0.3 + core) + 0.2 * core) * 255;
      d[i + 2] = (tint[2] * (0.3 + core) + 0.2 * core) * 255;
      d[i + 3] = a * 255;
    }
  }
  x.putImageData(img, 0, 0);
  return c;
}

/** Procedural sky gradient canvas (fallback if shader skybox unavailable). */
export function texSkyGradient(w = 512, h = 512, top = [0.02, 0.03, 0.09], bottom = [0.1, 0.08, 0.16]) {
  const c = makeCanvas(w, h);
  const x = ctx2d(c);
  const g = x.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, `rgb(${top[0] * 255 | 0},${top[1] * 255 | 0},${top[2] * 255 | 0})`);
  g.addColorStop(1, `rgb(${bottom[0] * 255 | 0},${bottom[1] * 255 | 0},${bottom[2] * 255 | 0})`);
  x.fillStyle = g;
  x.fillRect(0, 0, w, h);
  return c;
}

/** Starfield canvas for menu backgrounds. */
export function texStarfield(w = 256, h = 256, seed = 0, stars = 220) {
  const c = makeCanvas(w, h);
  const x = ctx2d(c);
  let s = seed * 2654435761 >>> 0;
  const rand = () => { s = (Math.imul(s ^ (s >>> 13), 1274126177) >>> 0); return s / 4294967296; };
  for (let i = 0; i < stars; i++) {
    const px = rand() * w;
    const py = rand() * h;
    const r = 0.5 + rand() * 1.2;
    const v = 0.4 + rand() * 0.6;
    x.fillStyle = `rgba(${v * 255 | 0},${v * 255 | 0},${v * 255 | 0},${0.5 + rand() * 0.5})`;
    x.beginPath();
    x.arc(px, py, r, 0, Math.PI * 2);
    x.fill();
  }
  return c;
}

/** Rounded rect helper for UI-ish textures. */
export function texRoundedRect(size, radius, fill = [0.05, 0.08, 0.14], border = [0.2, 0.6, 0.9], borderWidth = 2) {
  const c = makeCanvas(size, size);
  const x = ctx2d(c);
  const r = Math.min(radius, size / 2);
  x.fillStyle = `rgb(${fill[0] * 255 | 0},${fill[1] * 255 | 0},${fill[2] * 255 | 0})`;
  roundRectPath(x, 0, 0, size, size, r);
  x.fill();
  x.strokeStyle = `rgb(${border[0] * 255 | 0},${border[1] * 255 | 0},${border[2] * 255 | 0})`;
  x.lineWidth = borderWidth;
  roundRectPath(x, borderWidth / 2, borderWidth / 2, size - borderWidth, size - borderWidth, Math.max(1, r - borderWidth / 2));
  x.stroke();
  return c;
}

function roundRectPath(x, px, py, w, h, r) {
  x.beginPath();
  x.moveTo(px + r, py);
  x.arcTo(px + w, py, px + w, py + h, r);
  x.arcTo(px + w, py + h, px, py + h, r);
  x.arcTo(px, py + h, px, py, r);
  x.arcTo(px, py, px + w, py, r);
  x.closePath();
}

/** Energy orb texture — bright center with colored halo and swirl. */
export function texEnergyOrb(size = 128, seed = 0, tint = [0.4, 0.8, 1.0]) {
  const c = makeCanvas(size, size);
  const x = ctx2d(c);
  const img = x.createImageData(size, size);
  const d = img.data;
  for (let y = 0; y < size; y++) {
    for (let px = 0; px < size; px++) {
      const nx = px / size;
      const ny = y / size;
      const dist = Math.hypot(nx - 0.5, ny - 0.5) * 2;
      const swirl = simplex2n(nx * 8, ny * 8, seed);
      const a = 1 - smoothstep(0.1, 0.75, dist);
      const halo = 1 - smoothstep(0.5, 1.1, dist);
      const core = 1 - smoothstep(0.0, 0.35, dist);
      const i = (y * size + px) * 4;
      d[i] = (tint[0] * (0.35 + core) + 0.5 * core * swirl) * 255;
      d[i + 1] = (tint[1] * (0.35 + core) + 0.5 * core * swirl) * 255;
      d[i + 2] = (tint[2] * (0.35 + core) + 0.5 * core * swirl) * 255;
      d[i + 3] = clamp01(a * 0.85 + halo * 0.35) * 255;
    }
  }
  x.putImageData(img, 0, 0);
  return c;
}

/** Vignette/edge texture for post overlays. */
export function texVignette(w = 256, h = 256, strength = 1) {
  const c = makeCanvas(w, h);
  const x = ctx2d(c);
  const g = x.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.28, w / 2, h / 2, Math.max(w, h) * 0.72);
  g.addColorStop(0, 'rgba(0,0,0,0)');
  g.addColorStop(1, `rgba(0,0,0,${0.85 * strength})`);
  x.fillStyle = g;
  x.fillRect(0, 0, w, h);
  return c;
}

/** Helpers to generate an HSL-based palette for the procedural textures. */
export function hslCss(h, s, l, a = 1) {
  const [r, g, b] = hslToRgb(h, s, l);
  return `rgba(${(r * 255) | 0},${(g * 255) | 0},${(b * 255) | 0},${a})`;
}
