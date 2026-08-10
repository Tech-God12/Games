// ============================================================================
// Hitscan.js
// Ray-primitive intersections and gameplay raycasting used by hitscan weapons
// and beams: ray-sphere (enemy bodies + headshot zones), ray-AABB (arena
// pillars/cover), and combined queries that return sorted, blocked hits so
// weapons can punch through, ricochet, or stop at walls correctly.
// ============================================================================

import * as THREE from 'three';

const _tmp = new THREE.Vector3();

/** Ray-sphere intersection. Returns nearest t>=0 along dir (normalized) or -1. */
export function raySphere(origin, dir, center, radius) {
  _tmp.subVectors(origin, center);
  const b = _tmp.dot(dir);
  const c = _tmp.dot(_tmp) - radius * radius;
  const disc = b * b - c;
  if (disc < 0) return -1;
  const s = Math.sqrt(disc);
  const t0 = -b - s;
  const t1 = -b + s;
  if (t0 >= 0) return t0;
  if (t1 >= 0) return t1;
  return -1;
}

/** Ray-AABB (slab method). Returns nearest t>=0 or -1. dir must be normalized. */
export function rayAABB(origin, dir, min, max) {
  let tmin = -Infinity, tmax = Infinity;
  for (const ax of ['x', 'y', 'z']) {
    if (Math.abs(dir[ax]) < 1e-8) {
      if (origin[ax] < min[ax] || origin[ax] > max[ax]) return -1;
    } else {
      const inv = 1 / dir[ax];
      let t1 = (min[ax] - origin[ax]) * inv;
      let t2 = (max[ax] - origin[ax]) * inv;
      if (t1 > t2) [t1, t2] = [t2, t1];
      tmin = Math.max(tmin, t1);
      tmax = Math.min(tmax, t2);
      if (tmin > tmax) return -1;
    }
  }
  return tmin >= 0 ? tmin : (tmax >= 0 ? tmax : -1);
}

/** Surface normal for an AABB at the hit point. */
export function aabbNormal(point, min, max) {
  const c = { x: (min.x + max.x) / 2, y: (min.y + max.y) / 2, z: (min.z + max.z) / 2 };
  const e = { x: (max.x - min.x) / 2, y: (max.y - min.y) / 2, z: (max.z - min.z) / 2 };
  const d = { x: (point.x - c.x) / e.x, y: (point.y - c.y) / e.y, z: (point.z - c.z) / e.z };
  const ax = Math.abs(d.x), ay = Math.abs(d.y), az = Math.abs(d.z);
  if (ax > ay && ax > az) return new THREE.Vector3(Math.sign(d.x), 0, 0);
  if (ay > az) return new THREE.Vector3(0, Math.sign(d.y), 0);
  return new THREE.Vector3(0, 0, Math.sign(d.z));
}

/**
 * Raycast against a list of enemy entities (sphere colliders).
 * Returns sorted hits: [{entity, point, distance, headshot}].
 */
export function raycastEnemies(origin, dir, range, enemies, excludeId = 0, opts = {}) {
  const hits = [];
  for (const e of enemies) {
    if (!e.alive || !e.active) continue;
    if (e.id === excludeId) continue;
    const body = e.get('Body');
    if (!body) continue;
    const center = _tmp.set(body.pos.x, body.pos.y + body.height * 0.5, body.pos.z);
    const radius = body.radius;
    const t = raySphere(origin, dir, center, radius);
    if (t < 0 || t > range) continue;
    const point = origin.clone().addScaledVector(dir, t);
    const headTop = body.pos.y + body.height;
    const headZone = body.pos.y + body.height * 0.78;
    const headshot = point.y >= headZone && opts.canHeadshot !== false;
    hits.push({ entity: e, point, distance: t, headshot });
  }
  hits.sort((a, b) => a.distance - b.distance);
  return hits;
}

/**
 * Nearest solid (AABB) hit distance, or Infinity if none within range.
 * solids: [{min:Vector3, max:Vector3}]
 */
export function raycastSolids(origin, dir, range, solids) {
  let best = Infinity;
  for (const s of solids) {
    const t = rayAABB(origin, dir, s.min, s.max);
    if (t >= 0 && t < best && t <= range) best = t;
  }
  return best;
}

/**
 * Combined hitscan: returns final hits taking wall blocking into account,
 * honoring pierce count. Stops a hit if a wall is closer than the enemy.
 */
export function hitscan(origin, dir, range, enemies, solids, opts = {}) {
  const excludeId = opts.excludeId || 0;
  const pierce = opts.pierce || 0;
  const canHeadshot = opts.canHeadshot !== false;
  const enemyHits = raycastEnemies(origin, dir, range, enemies, excludeId, { canHeadshot });
  const wallDist = solids ? raycastSolids(origin, dir, range, solids) : Infinity;
  const wallPoint = wallDist < Infinity ? origin.clone().addScaledVector(dir, wallDist) : null;
  const results = [];
  let pierceLeft = pierce;
  for (const h of enemyHits) {
    if (h.distance > wallDist) break; // blocked by wall from here on
    results.push(h);
    if (pierceLeft <= 0) break;
    pierceLeft--;
  }
  return { hits: results, wallDist, wallPoint, endPoint: results.length ? results[results.length - 1].point : (wallPoint || origin.clone().addScaledVector(dir, range)) };
}
