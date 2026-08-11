/**
 * VOIDBREAK — Collision.
 *
 * Static collision against an AABB obstacle list (axis-aligned world).
 * The arena floor is flat at y=0; obstacles are AABBs (walls, pillars,
 * crates). Provides:
 *
 *   - axis-separated movement resolution (circle vs inflated AABBs)
 *   - ground/step detection
 *   - raycasts vs obstacles for bullets and AI line-of-sight
 */

import { AABB, rayAABB, sphereAABBOverlap } from '../core/geometry.js';
import { Vec3 } from '../core/vec3.js';
import { EPSILON } from '../core/constants.js';

export class CollisionWorld {
  constructor() {
    /** @type {AABB[]} static obstacle boxes */
    this.obstacles = [];
    this.bounds = new AABB(new Vec3(-40, -10, -40), new Vec3(40, 30, 40));
    this.floorY = 0;
  }

  clear() {
    this.obstacles.length = 0;
    this.bounds.min.set(-40, -10, -40);
    this.bounds.max.set(40, 30, 40);
  }

  addBox(minX, minY, minZ, maxX, maxY, maxZ) {
    const box = new AABB(new Vec3(minX, minY, minZ), new Vec3(maxX, maxY, maxZ));
    this.obstacles.push(box);
    return box;
  }

  setBounds(minX, minZ, maxX, maxZ, wallHeight = 12) {
    this.bounds.min.set(minX, -10, minZ);
    this.bounds.max.set(maxX, wallHeight, maxZ);
  }

  /**
   * Resolve horizontal movement of a circle (center, radius) by (dx, dz),
   * sliding along obstacle faces. Returns { x, z } final position.
   */
  moveCircle(px, pz, dx, dz, radius) {
    let x = px;
    let z = pz;

    x += dx;
    if (this._collidesCircle(x, pz, radius)) {
      x = this._resolveX(x, pz, px, radius);
    }
    z += dz;
    if (this._collidesCircle(x, z, radius)) {
      z = this._resolveZ(x, z, pz, radius);
    }
    return { x, z };
  }

  _collidesCircle(x, z, radius) {
    if (x - radius < this.bounds.min.x || x + radius > this.bounds.max.x ||
        z - radius < this.bounds.min.z || z + radius > this.bounds.max.z) {
      return true;
    }
    for (const box of this.obstacles) {
      if (x > box.min.x - radius && x < box.max.x + radius &&
          z > box.min.z - radius && z < box.max.z + radius) {
        return true;
      }
    }
    return false;
  }

  _resolveX(x, z, prevX, radius) {
    let best = prevX;
    let bestDist = Infinity;
    for (const box of this.obstacles) {
      if (z > box.min.z - radius && z < box.max.z + radius) {
        if (x < box.min.x) {
          const target = box.min.x - radius;
          const d = Math.abs(target - x);
          if (d < bestDist) { bestDist = d; best = target; }
        } else if (x > box.max.x) {
          const target = box.max.x + radius;
          const d = Math.abs(target - x);
          if (d < bestDist) { bestDist = d; best = target; }
        }
      }
    }
    if (x - radius < this.bounds.min.x) best = Math.max(best, this.bounds.min.x + radius);
    if (x + radius > this.bounds.max.x) best = Math.min(best, this.bounds.max.x - radius);
    return best;
  }

  _resolveZ(x, z, prevZ, radius) {
    let best = prevZ;
    let bestDist = Infinity;
    for (const box of this.obstacles) {
      if (x > box.min.x - radius && x < box.max.x + radius) {
        if (z < box.min.z) {
          const target = box.min.z - radius;
          const d = Math.abs(target - z);
          if (d < bestDist) { bestDist = d; best = target; }
        } else if (z > box.max.z) {
          const target = box.max.z + radius;
          const d = Math.abs(target - z);
          if (d < bestDist) { bestDist = d; best = target; }
        }
      }
    }
    if (z - radius < this.bounds.min.z) best = Math.max(best, this.bounds.min.z + radius);
    if (z + radius > this.bounds.max.z) best = Math.min(best, this.bounds.max.z - radius);
    return best;
  }

  /** True if the circle overlaps any obstacle in the horizontal plane. */
  circleHits(x, z, radius) {
    return this._collidesCircle(x, z, radius);
  }

  /**
   * Raycast against obstacles + bounds. Returns { t, x, y, z, normal }
   * or null. Used by bullets and AI sight checks.
   */
  raycast(origin, dir, maxDist = 1000, ignore = null) {
    const o = origin;
    const d = dir;
    let bestT = maxDist;
    let bestNormal = null;
    let bestPos = null;

    for (const box of this.obstacles) {
      if (box === ignore) continue;
      const t = rayAABB(o, d, box, 0, bestT);
      if (t !== null) {
        bestT = t;
        const hit = o.clone().addScaled(d, t);
        bestNormal = normalForHit(hit, box);
        bestPos = hit;
      }
    }
    // Bounds only blocks rays when the origin is OUTSIDE it (a ray from
    // inside the arena must not hit the boundary walls at t≈0).
    if (!this.bounds.containsPoint(o)) {
      const t = rayAABB(o, d, this.bounds, 0, bestT);
      if (t !== null) {
        bestT = t;
        bestPos = o.clone().addScaled(d, t);
        bestNormal = normalForHit(bestPos, this.bounds);
      }
    }
    if (bestPos === null) return null;
    return { t: bestT, x: bestPos.x, y: bestPos.y, z: bestPos.z, normal: bestNormal };
  }

  /** Closest point on the obstacle list to a position (for AI avoidance). */
  closestObstaclePoint(px, py, pz, obstacles = null, maxDist = 3, out = new Vec3()) {
    return closestObstaclePoint(px, py, pz, obstacles ?? this.obstacles, maxDist, out);
  }

  /** Ground height under a position (flat arena floor). */
  groundHeight(x, z) {
    return this.floorY;
  }

  /** Distance from a point down to the floor. */
  distanceToGround(x, y, z) {
    return Math.max(0, y - this.floorY);
  }
}

/** Approximate the outward face normal at a hit point on an AABB. */
export function normalForHit(hit, box) {
  const ex = Math.min(Math.abs(hit.x - box.min.x), Math.abs(box.max.x - hit.x));
  const ey = Math.min(Math.abs(hit.y - box.min.y), Math.abs(box.max.y - hit.y));
  const ez = Math.min(Math.abs(hit.z - box.min.z), Math.abs(box.max.z - hit.z));
  if (ex <= ey && ex <= ez) {
    return new Vec3(hit.x < (box.min.x + box.max.x) / 2 ? -1 : 1, 0, 0);
  }
  if (ey <= ez) {
    return new Vec3(0, hit.y < (box.min.y + box.max.y) / 2 ? -1 : 1, 0);
  }
  return new Vec3(0, 0, hit.z < (box.min.z + box.max.z) / 2 ? -1 : 1);
}

/** Point vs inflated AABB test. */
export function pointInInflatedBox(x, y, z, box, padX, padY, padZ) {
  return (
    x > box.min.x - padX && x < box.max.x + padX &&
    y > box.min.y - padY && y < box.max.y + padY &&
    z > box.min.z - padZ && z < box.max.z + padZ
  );
}

/** Sphere vs obstacle list (3D). */
export function sphereVsObstacles(cx, cy, cz, radius, obstacles) {
  for (const box of obstacles) {
    if (sphereAABBOverlap(new Vec3(cx, cy, cz), radius, box)) return true;
  }
  return false;
}

/** Closest point on obstacle list to a point (for AI avoidance). */
export function closestObstaclePoint(px, py, pz, obstacles, maxDist = 3, out = new Vec3()) {
  let bestD = maxDist * maxDist;
  let found = false;
  for (const box of obstacles) {
    if (px < box.min.x - maxDist || px > box.max.x + maxDist) continue;
    if (pz < box.min.z - maxDist || pz > box.max.z + maxDist) continue;
    const cx = Math.max(box.min.x, Math.min(px, box.max.x));
    const cy = Math.max(box.min.y, Math.min(py, box.max.y));
    const cz = Math.max(box.min.z, Math.min(pz, box.max.z));
    const dx = px - cx, dy = py - cy, dz = pz - cz;
    const d2 = dx * dx + dy * dy + dz * dz;
    if (d2 < bestD) {
      bestD = d2;
      out.set(cx, cy, cz);
      found = true;
    }
  }
  return found ? out : null;
}

export { EPSILON };
