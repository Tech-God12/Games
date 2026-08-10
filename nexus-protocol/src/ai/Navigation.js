// ============================================================================
// Navigation.js
// Lightweight navigation helpers for ground AI: steering (seek/flee/arrive),
// obstacle avoidance via the arena's solid AABBs, flow-field-style goal
// vectors, and formation offsets. Used by behaviors that need to route around
// cover rather than beeline through pillars.
// ============================================================================

import * as THREE from 'three';
import { clamp, TAU } from '../core/MathUtils.js';

const _seek = new THREE.Vector3();
const _desired = new THREE.Vector3();

export const Steering = {
  /** Seek a target position at max speed. */
  seek(body, target, maxSpeed, dt, accel = 60) {
    _seek.set(target.x - body.pos.x, 0, target.z - body.pos.z);
    const d = _seek.length();
    if (d > 0.05) {
      _seek.multiplyScalar(1 / d);
      _desired.copy(_seek).multiplyScalar(maxSpeed);
      body.vel.x = THREE.MathUtils.damp(body.vel.x, _desired.x, accel * 0.06, dt);
      body.vel.z = THREE.MathUtils.damp(body.vel.z, _desired.z, accel * 0.06, dt);
    } else { body.vel.x *= 0.8; body.vel.z *= 0.8; }
  },
  /** Arrive: slow down within slowingRadius of target. */
  arrive(body, target, maxSpeed, dt, slowingRadius = 4, accel = 60) {
    _seek.set(target.x - body.pos.x, 0, target.z - body.pos.z);
    const d = _seek.length();
    if (d > 0.05) {
      _seek.multiplyScalar(1 / d);
      const speed = maxSpeed * clamp(d / slowingRadius, 0, 1);
      _desired.copy(_seek).multiplyScalar(speed);
      body.vel.x = THREE.MathUtils.damp(body.vel.x, _desired.x, accel * 0.06, dt);
      body.vel.z = THREE.MathUtils.damp(body.vel.z, _desired.z, accel * 0.06, dt);
    } else { body.vel.x *= 0.7; body.vel.z *= 0.7; }
  },
  /** Flee from a position. */
  flee(body, from, maxSpeed, dt, accel = 60, panicDist = 8) {
    _seek.set(body.pos.x - from.x, 0, body.pos.z - from.z);
    const d = _seek.length();
    if (d < panicDist && d > 0.05) {
      _seek.multiplyScalar(1 / d);
      _desired.copy(_seek).multiplyScalar(maxSpeed);
      body.vel.x = THREE.MathUtils.damp(body.vel.x, _desired.x, accel * 0.06, dt);
      body.vel.z = THREE.MathUtils.damp(body.vel.z, _desired.z, accel * 0.06, dt);
    }
  },
  /** Wander: produce a smoothed random direction. */
  wander(body, maxSpeed, dt, state, accel = 40) {
    state = state || { angle: 0 };
    state.angle += (Math.random() - 0.5) * 1.2;
    _seek.set(Math.cos(state.angle), 0, Math.sin(state.angle));
    _desired.copy(_seek).multiplyScalar(maxSpeed * 0.6);
    body.vel.x = THREE.MathUtils.damp(body.vel.x, _desired.x, accel * 0.06, dt);
    body.vel.z = THREE.MathUtils.damp(body.vel.z, _desired.z, accel * 0.06, dt);
    return state;
  },
  /** Apply obstacle avoidance: steer away from the nearest solid AABB edge. */
  avoidSolids(body, solids, strength = 1) {
    for (const s of solids) {
      const cx = (s.min.x + s.max.x) * 0.5, cz = (s.min.z + s.max.z) * 0.5;
      const hx = (s.max.x - s.min.x) * 0.5 + body.radius + 1.5;
      const hz = (s.max.z - s.min.z) * 0.5 + body.radius + 1.5;
      const dx = body.pos.x - cx, dz = body.pos.z - cz;
      if (Math.abs(dx) < hx && Math.abs(dz) < hz) {
        const px = hx - Math.abs(dx), pz = hz - Math.abs(dz);
        if (px < pz) { body.vel.x += Math.sign(dx || 1) * strength * 8; }
        else { body.vel.z += Math.sign(dz || 1) * strength * 8; }
      }
    }
  },
  /** Separate from a list of neighbors to prevent stacking. */
  separate(body, neighbors, radius = 1.5, strength = 1) {
    let cx = 0, cz = 0, n = 0;
    for (const o of neighbors) {
      if (o === body) continue;
      const dx = body.pos.x - o.pos.x, dz = body.pos.z - o.pos.z;
      const d = Math.hypot(dx, dz);
      if (d > 0 && d < radius) { cx += dx / d; cz += dz / d; n++; }
    }
    if (n > 0) { body.vel.x += (cx / n) * strength * 6; body.vel.z += (cz / n) * strength * 6; }
  },
};

/**
 * FlowField: a coarse grid of goal vectors that enemies can sample for smoother
 * routing toward the player around obstacles. Built per-frame (or throttled)
 * from the player's position and the arena solids using a simple potential
 * field (attract to player, repel from solids).
 */
export class FlowField {
  constructor(cellSize = 4, bounds = 34) {
    this.cellSize = cellSize;
    this.bounds = bounds;
    this.grid = new Map(); // key -> {x, z}
  }
  _key(cx, cz) { return (cx + 512) * 1024 + (cz + 512); }
  build(target, solids) {
    this.grid.clear();
    const r = Math.ceil(this.bounds / this.cellSize);
    for (let cx = -r; cx <= r; cx++) {
      for (let cz = -r; cz <= r; cz++) {
        const wx = cx * this.cellSize, wz = cz * this.cellSize;
        let vx = target.x - wx, vz = target.z - wz;
        const len = Math.hypot(vx, vz) || 1; vx /= len; vz /= len;
        // repulsion from solids
        for (const s of solids) {
          const sx = (s.min.x + s.max.x) * 0.5, sz = (s.min.z + s.max.z) * 0.5;
          const dx = wx - sx, dz = wz - sz;
          const d = Math.hypot(dx, dz);
          if (d < 4 && d > 0.01) { const f = (4 - d) / 4; vx += (dx / d) * f * 1.5; vz += (dz / d) * f * 1.5; }
        }
        const l = Math.hypot(vx, vz) || 1;
        this.grid.set(this._key(cx, cz), { x: vx / l, z: vz / l });
      }
    }
  }
  sample(x, z) {
    const cx = Math.floor(x / this.cellSize), cz = Math.floor(z / this.cellSize);
    return this.grid.get(this._key(cx, cz)) || { x: 0, z: 0 };
  }
}

/** Formation offsets for coordinated enemy groups (circle, line, wedge). */
export const Formations = {
  circle(n, radius = 3) {
    const out = [];
    for (let i = 0; i < n; i++) { const a = (i / n) * TAU; out.push({ x: Math.cos(a) * radius, z: Math.sin(a) * radius }); }
    return out;
  },
  line(n, spacing = 1.5) {
    const out = [];
    for (let i = 0; i < n; i++) out.push({ x: (i - (n - 1) / 2) * spacing, z: 0 });
    return out;
  },
  wedge(n, spacing = 1.5) {
    const out = [];
    for (let i = 0; i < n; i++) { const r = Math.floor(i / 2); const side = i % 2 ? 1 : -1; out.push({ x: side * (r + 1) * spacing, z: -r * spacing }); }
    return out;
  },
};
