// ============================================================================
// AssetManager.js
// Procedural asset generation and caching. Because the game ships no external
// image/model files, all textures and shared materials are generated here at
// runtime (canvases fed into THREE.CanvasTexture) and cached by key. This
// keeps load instant and memory bounded while still producing rich visuals:
// neon grid floors, noise/scanline overlays, gradient ramps, particle sprites,
// and PBR-ish materials with emissive glow.
// ============================================================================

import * as THREE from 'three';

export class AssetManager {
  constructor() {
    this.textures = new Map();
    this.materials = new Map();
    this.geometries = new Map();
    this.canvases = new Map();
  }

  /** Get or create a canvas texture by key with a generator fn. */
  texture(key, generator, size = 256) {
    let tex = this.textures.get(key);
    if (tex) return tex;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    generator(ctx, size);
    tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    tex.needsUpdate = true;
    this.textures.set(key, tex);
    this.canvases.set(key, canvas);
    return tex;
  }

  /** Shared material by key. */
  material(key, factory) {
    let m = this.materials.get(key);
    if (m) return m;
    m = factory();
    this.materials.set(key, m);
    return m;
  }

  /** Shared geometry by key. */
  geometry(key, factory) {
    let g = this.geometries.get(key);
    if (g) return g;
    g = factory();
    this.geometries.set(key, g);
    return g;
  }

  // ----- Built-in procedural textures -----

  gridTexture(size = 512, color = '#1b2a44', glow = '#29e7ff') {
    return this.texture(`grid_${size}_${color}_${glow}`, (ctx, s) => {
      ctx.fillStyle = '#05060a';
      ctx.fillRect(0, 0, s, s);
      ctx.strokeStyle = color; ctx.lineWidth = 2;
      const cells = 16, step = s / cells;
      for (let i = 0; i <= cells; i++) {
        ctx.beginPath(); ctx.moveTo(i * step, 0); ctx.lineTo(i * step, s); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i * step); ctx.lineTo(s, i * step); ctx.stroke();
      }
      // glowing intersection dots
      ctx.fillStyle = glow;
      for (let i = 0; i <= cells; i++) for (let j = 0; j <= cells; j++) {
        ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.arc(i * step, j * step, 2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }, size);
  }

  noiseTexture(size = 256, opacity = 0.5) {
    return this.texture(`noise_${size}_${opacity}`, (ctx, s) => {
      const img = ctx.createImageData(s, s);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 255 * opacity;
      }
      ctx.putImageData(img, 0, 0);
    }, size);
  }

  /** A radial soft particle sprite (white, for tinted additive particles). */
  particleTexture(size = 128) {
    return this.texture(`particle_${size}`, (ctx, s) => {
      const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(0.3, 'rgba(255,255,255,0.7)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
    }, size);
  }

  /** A hard-edged spark/star sprite for impacts. */
  sparkTexture(size = 64) {
    return this.texture(`spark_${size}`, (ctx, s) => {
      const c = s / 2;
      ctx.translate(c, c);
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, c);
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(0.4, 'rgba(255,255,255,0.6)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(0, 0, c, 0, Math.PI * 2); ctx.fill();
      // cross spikes
      ctx.strokeStyle = 'rgba(255,255,255,0.9)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-c, 0); ctx.lineTo(c, 0); ctx.moveTo(0, -c); ctx.lineTo(0, c); ctx.stroke();
    }, size);
  }

  /** A vertical gradient ramp texture (for emissive trails / laser cores). */
  rampTexture(stops = [[0, '#ffffff'], [1, '#29e7ff']], size = 64) {
    return this.texture(`ramp_${JSON.stringify(stops)}_${size}`, (ctx, s) => {
      const g = ctx.createLinearGradient(0, 0, 0, s);
      for (const [o, c] of stops) g.addColorStop(o, c);
      ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
    }, size);
  }

  /** Hexagon tile texture for "crystal" biome floors. */
  hexTexture(size = 256, color = '#2a1b44', glow = '#ff3df0') {
    return this.texture(`hex_${color}_${glow}_${size}`, (ctx, s) => {
      ctx.fillStyle = '#08060f'; ctx.fillRect(0, 0, s, s);
      const r = s / 8, h = r * Math.sqrt(3);
      ctx.strokeStyle = color; ctx.lineWidth = 2;
      for (let row = -1; row < 10; row++) {
        for (let col = -1; col < 10; col++) {
          const x = col * r * 1.5;
          const y = row * h + (col % 2 ? h / 2 : 0);
          this._hexPath(ctx, x, y, r); ctx.stroke();
        }
      }
      ctx.fillStyle = glow; ctx.globalAlpha = 0.35;
      for (let row = 0; row < 10; row++) for (let col = 0; col < 10; col++) {
        const x = col * r * 1.5, y = row * h + (col % 2 ? h / 2 : 0);
        ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }, size);
  }

  _hexPath(ctx, x, y, r) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i;
      const px = x + r * Math.cos(a), py = y + r * Math.sin(a);
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
  }

  /** Scanline / CRT overlay texture. */
  scanlineTexture(size = 256) {
    return this.texture(`scan_${size}`, (ctx, s) => {
      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.fillRect(0, 0, s, s);
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      for (let y = 0; y < s; y += 3) ctx.fillRect(0, y, s, 1);
    }, size);
  }

  // ----- Shared materials -----

  neonMaterial(color, opts = {}) {
    const key = `neon_${color}_${JSON.stringify(opts)}`;
    return this.material(key, () => new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: opts.emissive != null ? opts.emissive : 1.4,
      metalness: opts.metalness != null ? opts.metalness : 0.4,
      roughness: opts.roughness != null ? opts.roughness : 0.35,
      transparent: opts.transparent || false,
      opacity: opts.opacity != null ? opts.opacity : 1,
    }));
  }

  glowMaterial(color, opacity = 0.8) {
    const key = `glow_${color}_${opacity}`;
    return this.material(key, () => new THREE.MeshBasicMaterial({
      color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false,
    }));
  }

  dispose() {
    for (const t of this.textures.values()) t.dispose();
    for (const m of this.materials.values()) m.dispose();
    for (const g of this.geometries.values()) g.dispose();
    this.textures.clear(); this.materials.clear(); this.geometries.clear(); this.canvases.clear();
  }
}
