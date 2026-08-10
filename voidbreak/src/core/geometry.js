/**
 * VOIDBREAK — Collision geometry primitives and tests.
 *
 * Ray, Plane, Sphere, AABB, Frustum and the intersection functions used by
 * the physics layer, AI line-of-sight and the renderer's culling. All pure —
 * unit tested.
 */

import { EPSILON } from './constants.js';
import { Vec3 } from './vec3.js';

export class Ray {
  constructor(origin = new Vec3(), direction = new Vec3(0, 0, -1)) {
    this.origin = origin;
    this.direction = direction;
  }

  set(origin, direction) {
    this.origin.copy(origin);
    this.direction.copy(direction);
    return this;
  }

  /** Point at distance t along the ray. */
  at(t, out = new Vec3()) {
    return out.copy(this.origin).addScaled(this.direction, t);
  }

  clone() {
    return new Ray(this.origin.clone(), this.direction.clone());
  }
}

export class Plane {
  constructor(normal = new Vec3(0, 1, 0), constant = 0) {
    this.normal = normal;
    this.constant = constant;
  }

  set(normal, constant) {
    this.normal.copy(normal);
    this.constant = constant;
    return this;
  }

  /** Signed distance from point to plane. */
  distanceToPoint(p) {
    return this.normal.dot(p) + this.constant;
  }
}

export class Sphere {
  constructor(center = new Vec3(), radius = 1) {
    this.center = center;
    this.radius = radius;
  }

  set(center, radius) {
    this.center.copy(center);
    this.radius = radius;
    return this;
  }

  containsPoint(p) {
    return p.distanceToSq(this.center) <= this.radius * this.radius;
  }
}

export class AABB {
  constructor(min = new Vec3(Infinity, Infinity, Infinity), max = new Vec3(-Infinity, -Infinity, -Infinity)) {
    this.min = min;
    this.max = max;
  }

  set(min, max) {
    this.min.copy(min);
    this.max.copy(max);
    return this;
  }

  setFromCenterAndSize(center, halfSize) {
    this.min.copy(center).sub(halfSize);
    this.max.copy(center).add(halfSize);
    return this;
  }

  setFromPoints(points) {
    this.min.setScalar(Infinity);
    this.max.setScalar(-Infinity);
    for (const p of points) {
      this.min.min(p);
      this.max.max(p);
    }
    return this;
  }

  expandByPoint(p) {
    this.min.min(p);
    this.max.max(p);
    return this;
  }

  expandByScalar(s) {
    this.min.addScalar(-s);
    this.max.addScalar(s);
    return this;
  }

  center(out = new Vec3()) {
    return out.copy(this.min).add(this.max).mulScalar(0.5);
  }

  size(out = new Vec3()) {
    return out.copy(this.max).sub(this.min);
  }

  halfSize(out = new Vec3()) {
    return this.size(out).mulScalar(0.5);
  }

  closestPointTo(p, out = new Vec3()) {
    out.x = Math.min(Math.max(p.x, this.min.x), this.max.x);
    out.y = Math.min(Math.max(p.y, this.min.y), this.max.y);
    out.z = Math.min(Math.max(p.z, this.min.z), this.max.z);
    return out;
  }

  containsPoint(p) {
    return (
      p.x >= this.min.x && p.x <= this.max.x &&
      p.y >= this.min.y && p.y <= this.max.y &&
      p.z >= this.min.z && p.z <= this.max.z
    );
  }

  intersectsAABB(other) {
    return !(
      other.max.x < this.min.x || other.min.x > this.max.x ||
      other.max.y < this.min.y || other.min.y > this.max.y ||
      other.max.z < this.min.z || other.min.z > this.max.z
    );
  }

  distanceToPoint(p) {
    const dx = Math.max(this.min.x - p.x, 0, p.x - this.max.x);
    const dy = Math.max(this.min.y - p.y, 0, p.y - this.max.y);
    const dz = Math.max(this.min.z - p.z, 0, p.z - this.max.z);
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  distanceToPointSq(p) {
    const dx = Math.max(this.min.x - p.x, 0, p.x - this.max.x);
    const dy = Math.max(this.min.y - p.y, 0, p.y - this.max.y);
    const dz = Math.max(this.min.z - p.z, 0, p.z - this.max.z);
    return dx * dx + dy * dy + dz * dz;
  }

  clone() {
    return new AABB(this.min.clone(), this.max.clone());
  }
}

/**
 * Ray vs AABB (slab method). Returns t (>= tMin) or null.
 */
export function rayAABB(origin, dir, box, tMin = 0, tMax = Infinity) {
  let tmin = tMin;
  let tmax = tMax;

  if (Math.abs(dir.x) < EPSILON) {
    if (origin.x < box.min.x || origin.x > box.max.x) return null;
  } else {
    let inv = 1 / dir.x;
    let t1 = (box.min.x - origin.x) * inv;
    let t2 = (box.max.x - origin.x) * inv;
    if (t1 > t2) { const tmp = t1; t1 = t2; t2 = tmp; }
    tmin = Math.max(tmin, t1);
    tmax = Math.min(tmax, t2);
    if (tmin > tmax) return null;
  }

  if (Math.abs(dir.y) < EPSILON) {
    if (origin.y < box.min.y || origin.y > box.max.y) return null;
  } else {
    let inv = 1 / dir.y;
    let t1 = (box.min.y - origin.y) * inv;
    let t2 = (box.max.y - origin.y) * inv;
    if (t1 > t2) { const tmp = t1; t1 = t2; t2 = tmp; }
    tmin = Math.max(tmin, t1);
    tmax = Math.min(tmax, t2);
    if (tmin > tmax) return null;
  }

  if (Math.abs(dir.z) < EPSILON) {
    if (origin.z < box.min.z || origin.z > box.max.z) return null;
  } else {
    let inv = 1 / dir.z;
    let t1 = (box.min.z - origin.z) * inv;
    let t2 = (box.max.z - origin.z) * inv;
    if (t1 > t2) { const tmp = t1; t1 = t2; t2 = tmp; }
    tmin = Math.max(tmin, t1);
    tmax = Math.min(tmax, t2);
    if (tmin > tmax) return null;
  }

  return tmin;
}

/** Ray vs sphere. Returns smallest positive t or null. */
export function raySphere(origin, dir, center, radius, tMin = 0, tMax = Infinity) {
  const ocX = origin.x - center.x;
  const ocY = origin.y - center.y;
  const ocZ = origin.z - center.z;
  const b = ocX * dir.x + ocY * dir.y + ocZ * dir.z;
  const c = ocX * ocX + ocY * ocY + ocZ * ocZ - radius * radius;
  if (c > 0 && b > 0) return null;
  const disc = b * b - c;
  if (disc < 0) return null;
  const sqrtD = Math.sqrt(disc);
  let t = -b - sqrtD;
  if (t < tMin) t = -b + sqrtD;
  if (t < tMin || t > tMax) return null;
  return t;
}

/** Ray vs plane. Returns t or null. */
export function rayPlane(origin, dir, plane, tMin = 0, tMax = Infinity) {
  const denom = plane.normal.dot(dir);
  if (Math.abs(denom) < EPSILON) return null;
  const t = -(plane.normal.dot(origin) + plane.constant) / denom;
  if (t < tMin || t > tMax) return null;
  return t;
}

/** Ray vs triangle (Möller–Trumbore). Returns t or null. */
export function rayTriangle(origin, dir, a, b, c, tMin = 0, tMax = Infinity) {
  const e1x = b.x - a.x, e1y = b.y - a.y, e1z = b.z - a.z;
  const e2x = c.x - a.x, e2y = c.y - a.y, e2z = c.z - a.z;
  const px = dir.y * e2z - dir.z * e2y;
  const py = dir.z * e2x - dir.x * e2z;
  const pz = dir.x * e2y - dir.y * e2x;
  const det = e1x * px + e1y * py + e1z * pz;
  if (det > -EPSILON && det < EPSILON) return null;
  const invDet = 1 / det;
  const tx = origin.x - a.x, ty = origin.y - a.y, tz = origin.z - a.z;
  const u = (tx * px + ty * py + tz * pz) * invDet;
  if (u < 0 || u > 1) return null;
  const qx = ty * e1z - tz * e1y;
  const qy = tz * e1x - tx * e1z;
  const qz = tx * e1y - ty * e1x;
  const v = (dir.x * qx + dir.y * qy + dir.z * qz) * invDet;
  if (v < 0 || u + v > 1) return null;
  const t = (e2x * qx + e2y * qy + e2z * qz) * invDet;
  if (t < tMin || t > tMax) return null;
  return t;
}

/** Sphere vs AABB overlap. */
export function sphereAABBOverlap(sphereCenter, radius, box) {
  const cx = Math.max(box.min.x, Math.min(sphereCenter.x, box.max.x));
  const cy = Math.max(box.min.y, Math.min(sphereCenter.y, box.max.y));
  const cz = Math.max(box.min.z, Math.min(sphereCenter.z, box.max.z));
  const dx = sphereCenter.x - cx;
  const dy = sphereCenter.y - cy;
  const dz = sphereCenter.z - cz;
  return dx * dx + dy * dy + dz * dz <= radius * radius;
}

/** Sphere vs sphere overlap. */
export function sphereSphereOverlap(aCenter, aRadius, bCenter, bRadius) {
  const r = aRadius + bRadius;
  return aCenter.distanceToSq(bCenter) <= r * r;
}

/** Closest point on a segment [a,b] to p. */
export function closestPointOnSegment(p, a, b, out = new Vec3()) {
  const abx = b.x - a.x, aby = b.y - a.y, abz = b.z - a.z;
  const lenSq = abx * abx + aby * aby + abz * abz;
  let t = 0;
  if (lenSq > EPSILON) {
    t = ((p.x - a.x) * abx + (p.y - a.y) * aby + (p.z - a.z) * abz) / lenSq;
    t = Math.min(1, Math.max(0, t));
  }
  out.x = a.x + abx * t;
  out.y = a.y + aby * t;
  out.z = a.z + abz * t;
  return out;
}

/** Distance from point to segment [a,b]. */
export function distanceToSegment(p, a, b) {
  return p.distanceTo(closestPointOnSegment(p, a, b));
}

/** Distance from point to segment, squared. */
export function distanceToSegmentSq(p, a, b) {
  return p.distanceToSq(closestPointOnSegment(p, a, b));
}

/** Distance between two segments (works for rays/lines too with t clamping flags). */
export function segmentSegmentDistance(a1, a2, b1, b2, out = { t1: 0, t2: 0, dist: 0 }) {
  const d1x = a2.x - a1.x, d1y = a2.y - a1.y, d1z = a2.z - a1.z;
  const d2x = b2.x - b1.x, d2y = b2.y - b1.y, d2z = b2.z - b1.z;
  const rx = a1.x - b1.x, ry = a1.y - b1.y, rz = a1.z - b1.z;

  const a = d1x * d1x + d1y * d1y + d1z * d1z;
  const e = d2x * d2x + d2y * d2y + d2z * d2z;
  const f = d2x * rx + d2y * ry + d2z * rz;

  let t1, t2;
  if (a <= EPSILON && e <= EPSILON) {
    t1 = 0; t2 = 0;
  } else if (a <= EPSILON) {
    t1 = 0; t2 = Math.min(1, Math.max(0, f / e));
  } else {
    const c = d1x * rx + d1y * ry + d1z * rz;
    if (e <= EPSILON) {
      t2 = 0; t1 = Math.min(1, Math.max(0, -c / a));
    } else {
      const b = d1x * d2x + d1y * d2y + d1z * d2z;
      const denom = a * e - b * b;
      t1 = denom > EPSILON ? Math.min(1, Math.max(0, (b * f - c * e) / denom)) : 0;
      t2 = (b * t1 + f) / e;
      if (t2 < 0) {
        t2 = 0;
        t1 = Math.min(1, Math.max(0, -c / a));
      } else if (t2 > 1) {
        t2 = 1;
        t1 = Math.min(1, Math.max(0, (b - c) / a));
      }
    }
  }
  const px = a1.x + d1x * t1;
  const py = a1.y + d1y * t1;
  const pz = a1.z + d1z * t1;
  const qx = b1.x + d2x * t2;
  const qy = b1.y + d2y * t2;
  const qz = b1.z + d2z * t2;
  const dx = px - qx, dy = py - qy, dz = pz - qz;
  out.t1 = t1;
  out.t2 = t2;
  out.dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
  return out;
}

/**
 * Frustum: 6 planes (left, right, top, bottom, near, far), inward normals.
 */
export class Frustum {
  constructor() {
    this.planes = [];
    for (let i = 0; i < 6; i++) this.planes.push(new Plane());
  }

  /** Extract from a Mat4 (view * projection). */
  setFromMatrix(m) {
    const e = m;
    const planes = this.planes;

    planes[0].normal.set(e[3] + e[0], e[7] + e[4], e[11] + e[8]);
    planes[0].constant = e[15] + e[12];
    planes[1].normal.set(e[3] - e[0], e[7] - e[4], e[11] - e[8]);
    planes[1].constant = e[15] - e[12];
    planes[2].normal.set(e[3] - e[1], e[7] - e[5], e[11] - e[9]);
    planes[2].constant = e[15] - e[13];
    planes[3].normal.set(e[3] + e[1], e[7] + e[5], e[11] + e[9]);
    planes[3].constant = e[15] + e[13];
    planes[4].normal.set(e[3] + e[2], e[7] + e[6], e[11] + e[10]);
    planes[4].constant = e[15] + e[14];
    planes[5].normal.set(e[3] - e[2], e[7] - e[6], e[11] - e[10]);
    planes[5].constant = e[15] - e[14];

    for (const p of planes) {
      const len = p.normal.length();
      if (len > 0) {
        p.normal.divScalar(len);
        p.constant /= len;
      }
    }
    return this;
  }

  intersectsSphere(center, radius) {
    for (const p of this.planes) {
      if (p.distanceToPoint(center) < -radius) return false;
    }
    return true;
  }

  intersectsAABB(box) {
    for (const p of this.planes) {
      const nx = p.normal.x, ny = p.normal.y, nz = p.normal.z;
      const x = nx >= 0 ? box.max.x : box.min.x;
      const y = ny >= 0 ? box.max.y : box.min.y;
      const z = nz >= 0 ? box.max.z : box.min.z;
      if (nx * x + ny * y + nz * z + p.constant < 0) return false;
    }
    return true;
  }
}

/** Basic 2D grid spatial hash for entity queries (x/z plane). */
export class SpatialHash {
  constructor(cellSize = 4) {
    this.cellSize = cellSize;
    this.invCell = 1 / cellSize;
    this.cells = new Map();
  }

  key(cx, cz) {
    return cx * 73856093 ^ cz * 19349663;
  }

  clear() {
    this.cells.clear();
  }

  insert(entity, x, y, z, radius) {
    const minX = Math.floor((x - radius) * this.invCell);
    const maxX = Math.floor((x + radius) * this.invCell);
    const minZ = Math.floor((z - radius) * this.invCell);
    const maxZ = Math.floor((z + radius) * this.invCell);
    for (let cz = minZ; cz <= maxZ; cz++) {
      for (let cx = minX; cx <= maxX; cx++) {
        const key = this.key(cx, cz);
        let cell = this.cells.get(key);
        if (!cell) {
          cell = [];
          this.cells.set(key, cell);
        }
        cell.push(entity);
      }
    }
  }

  query(x, z, radius, out = []) {
    out.length = 0;
    const seen = new Set();
    const minX = Math.floor((x - radius) * this.invCell);
    const maxX = Math.floor((x + radius) * this.invCell);
    const minZ = Math.floor((z - radius) * this.invCell);
    const maxZ = Math.floor((z + radius) * this.invCell);
    for (let cz = minZ; cz <= maxZ; cz++) {
      for (let cx = minX; cx <= maxX; cx++) {
        const key = this.key(cx, cz);
        const cell = this.cells.get(key);
        if (!cell) continue;
        for (const e of cell) {
          if (!seen.has(e)) {
            seen.add(e);
            out.push(e);
          }
        }
      }
    }
    return out;
  }

  queryNear(x, z, radius, out = []) {
    this.query(x, z, radius, out);
    const r2 = radius * radius;
    for (let i = out.length - 1; i >= 0; i--) {
      const e = out[i];
      const dx = e.x - x;
      const dz = e.z - z;
      if (dx * dx + dz * dz > r2) out.splice(i, 1);
    }
    return out;
  }
}
