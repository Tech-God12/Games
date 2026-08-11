/**
 * VOIDBREAK — Arena generator.
 *
 * Procedurally builds an arena for a biome: boundary walls, floor, cover
 * clusters (pillars, crates, wall segments), props, spawn pads and ambient
 * lights. Uses a seeded RNG so a seed reproduces the same layout.
 *
 * Output: { staticObjects[], colliders[], spawnPoints[], decor[], size }
 * consumed by Arena (which registers them with the world/scene).
 */

import { RNG } from '../../core/rng.js';

export const ARENA_SIZE = 46; // half-extent (arena is 92×92)

export class ArenaLayout {
  constructor(seed = 1, biomeIndex = 0) {
    this.seed = seed;
    this.biomeIndex = biomeIndex;
    this.rng = new RNG(seed * 7919 + biomeIndex * 104729);
    this.size = ARENA_SIZE;
    this.obstacles = [];
    this.decor = [];
    this.spawnPoints = [];
    this.lights = [];
    this.playerStart = { x: 0, z: 0 };
  }

  generate() {
    this._buildBoundary();
    this._buildCore();
    this._buildCover();
    this._buildDecor();
    this._buildSpawns();
    this._buildLights();
    return this;
  }

  _buildBoundary() {
    const s = this.size;
    const wallH = 7;
    const t = 1.2;
    const walls = [
      { x: 0, z: -s - t / 2, w: s * 2 + t * 2, d: t, h: wallH },
      { x: 0, z: s + t / 2, w: s * 2 + t * 2, d: t, h: wallH },
      { x: -s - t / 2, z: 0, w: t, d: s * 2 + t * 2, h: wallH },
      { x: s + t / 2, z: 0, w: t, d: s * 2 + t * 2, h: wallH },
    ];
    for (const w of walls) {
      this.obstacles.push({ ...w, type: 'wall' });
    }
    for (const [cx, cz] of [[-s, -s], [s, -s], [-s, s], [s, s]]) {
      this.obstacles.push({ x: cx, z: cz, w: t + 2, d: t + 2, h: wallH + 2, type: 'tower' });
      this.decor.push({ type: 'tower', x: cx, z: cz, rot: 0, scale: 1 });
    }
  }

  _buildCore() {
    const coreType = this.rng.pick(['pylon', 'obelisk', 'core']);
    if (coreType === 'pylon') {
      this.obstacles.push({ x: 0, z: 0, w: 2.4, d: 2.4, h: 1.1, type: 'platform' });
      this.decor.push({ type: 'core', x: 0, z: 0, rot: 0, scale: 1 });
    } else if (coreType === 'obelisk') {
      this.obstacles.push({ x: 0, z: 0, w: 2.0, d: 2.0, h: 2.6, type: 'obelisk_collider' });
      this.decor.push({ type: 'obelisk', x: 0, z: 0, rot: 0, scale: 1 });
    } else {
      this.obstacles.push({ x: 0, z: 0, w: 3.0, d: 3.0, h: 0.8, type: 'platform' });
      this.decor.push({ type: 'core', x: 0, z: 0, rot: 0, scale: 1.3 });
    }
  }

  _buildCover() {
    const rng = this.rng;
    const count = 26 + Math.floor(rng.int(0, 10));
    const minR = 5;
    const maxR = this.size - 5;
    const placed = [];
    let attempts = 0;
    while (placed.length < count && attempts < 400) {
      attempts++;
      const angle = rng.angle();
      const r = Math.sqrt(rng.next()) * (maxR - minR) + minR;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const w = rng.pick([1.6, 2.2, 2.8, 1.2]);
      const d = rng.pick([1.6, 2.2, 2.8, 1.2]);
      const h = rng.pick([0.9, 1.2, 2.2, 1.4]);
      let ok = true;
      for (const p of placed) {
        const dx = p.x - x;
        const dz = p.z - z;
        if (Math.hypot(dx, dz) < (p.w + w) * 0.6 + 1.6) {
          ok = false;
          break;
        }
      }
      if (!ok) continue;
      const type = h > 2 ? 'pillar' : rng.chance(0.45) ? 'crate' : 'wall';
      placed.push({ x, z, w, d });
      this.obstacles.push({ x, z, w, d, h, type });
      if (type === 'pillar' && rng.chance(0.5)) {
        this.decor.push({ type: 'pillar_glow', x, z, rot: 0, scale: 1 });
      }
      if (type === 'crate' && rng.chance(0.35)) {
        this.decor.push({ type: 'crate_light', x, z, rot: 0, scale: 1 });
      }
    }
  }

  _buildDecor() {
    const rng = this.rng;
    const n = 40;
    for (let i = 0; i < n; i++) {
      const side = rng.int(0, 3);
      const along = rng.float(-this.size + 3, this.size - 3);
      let x, z;
      if (side === 0) { x = along; z = -this.size + 1.2; }
      else if (side === 1) { x = along; z = this.size - 1.2; }
      else if (side === 2) { x = -this.size + 1.2; z = along; }
      else { x = this.size - 1.2; z = along; }
      const type = rng.pick(['pipe', 'light', 'banner', 'vent']);
      this.decor.push({ type, x, z, rot: rng.float(0, Math.PI * 2), scale: 0.8 + rng.float(0, 0.5) });
    }
    if (this.biomeIndex === 2) {
      for (let i = 0; i < 24; i++) {
        const angle = rng.angle();
        const r = rng.float(4, this.size - 4);
        this.decor.push({
          type: 'crystal',
          x: Math.cos(angle) * r,
          z: Math.sin(angle) * r,
          rot: rng.angle(),
          scale: 0.5 + rng.float(0, 1.4),
          color: rng.pick(['#b26bff', '#7df0ff', '#ff6ad8']),
        });
      }
    }
    for (let i = 0; i < 30; i++) {
      const angle = rng.angle();
      const r = rng.float(3, this.size - 3);
      this.decor.push({
        type: 'scorch',
        x: Math.cos(angle) * r,
        z: Math.sin(angle) * r,
        rot: rng.angle(),
        scale: 0.6 + rng.float(0, 1.2),
      });
    }
  }

  _buildSpawns() {
    const rng = this.rng;
    const n = 10;
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2 + rng.float(-0.2, 0.2);
      const r = this.size - 6;
      this.spawnPoints.push({ x: Math.cos(angle) * r, z: Math.sin(angle) * r });
      this.decor.push({ type: 'spawn_pad', x: Math.cos(angle) * r, z: Math.sin(angle) * r, rot: angle, scale: 1 });
    }
    for (let i = 0; i < 6; i++) {
      const angle = rng.angle();
      const r = rng.float(10, this.size * 0.5);
      this.spawnPoints.push({ x: Math.cos(angle) * r, z: Math.sin(angle) * r });
    }
    this.playerStart = { x: 0, z: 4 };
    this.spawnPoints.push({ x: 0, z: 8 });
  }

  _buildLights() {
    const rng = this.rng;
    this.lights.push({ x: 0, y: 4.5, z: 0, color: [0.3, 0.9, 1.0], range: 16, intensity: 1.2 });
    for (const obs of this.obstacles) {
      if (obs.type === 'pillar') {
        this.lights.push({ x: obs.x, y: obs.h + 0.4, z: obs.z, color: [0.2, 0.5, 0.9], range: 6, intensity: 0.6 });
      }
    }
    for (let i = 0; i < 8; i++) {
      const angle = rng.angle();
      const r = rng.float(6, this.size - 4);
      this.lights.push({
        x: Math.cos(angle) * r, y: 4.5, z: Math.sin(angle) * r,
        color: [1.0, 0.7, 0.4], range: 7, intensity: 0.5,
      });
    }
  }

  /** Pick a spawn point that is far from a given position. */
  spawnPointAwayFrom(x, z, minDist = 10) {
    let best = this.spawnPoints[0] ?? { x: 0, z: 0 };
    let bestD = -1;
    for (const p of this.spawnPoints) {
      const d = Math.hypot(p.x - x, p.z - z);
      if (d > bestD) {
        bestD = d;
        best = p;
      }
    }
    if (bestD < minDist) {
      const angle = Math.random() * Math.PI * 2;
      return { x: Math.cos(angle) * (this.size - 6), z: Math.sin(angle) * (this.size - 6) };
    }
    return best;
  }
}
