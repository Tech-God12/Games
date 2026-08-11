/**
 * VOIDBREAK — AI steering.
 *
 * Movement primitives for enemies: seek, arrive, flee, orbit (strafe),
 * separation (flocking), and wall avoidance. Pure math — unit tested.
 */

import { Vec3 } from '../../core/vec3.js';
import { clamp01 } from '../../core/math.js';

/**
 * Seek: steer velocity toward a target at max speed.
 */
export function seek(pos, vel, target, maxSpeed, turnRate = 8) {
  const desiredX = target.x - pos.x;
  const desiredZ = target.z - pos.z;
  const len = Math.hypot(desiredX, desiredZ);
  if (len < 1e-6) return { vx: 0, vz: 0 };
  const dx = desiredX / len * maxSpeed;
  const dz = desiredZ / len * maxSpeed;
  const t = clamp01(turnRate * 0.1);
  const vx0 = vel.vx ?? vel.x ?? 0;
  const vz0 = vel.vz ?? vel.z ?? 0;
  return { vx: vx0 + (dx - vx0) * t, vz: vz0 + (dz - vz0) * t };
}

/**
 * Arrive: slow down within arrival radius.
 */
export function arrive(pos, vel, target, maxSpeed, slowRadius = 3, stopRadius = 0.4) {
  const desiredX = target.x - pos.x;
  const desiredZ = target.z - pos.z;
  const dist = Math.hypot(desiredX, desiredZ);
  if (dist < stopRadius) return { vx: 0, vz: 0 };
  let speed = maxSpeed;
  if (dist < slowRadius) speed = maxSpeed * (dist / slowRadius);
  const dx = desiredX / dist * speed;
  const dz = desiredZ / dist * speed;
  const vx0 = vel.vx ?? vel.x ?? 0;
  const vz0 = vel.vz ?? vel.z ?? 0;
  return { vx: vx0 + (dx - vx0) * 0.2, vz: vz0 + (dz - vz0) * 0.2 };
}

/**
 * Orbit: keep a preferred distance from the target while circling (strafe).
 * `side` = -1/+1 direction.
 */
export function orbit(pos, vel, target, desiredDist, maxSpeed, side = 1, turnRate = 5) {
  const to = { x: pos.x - target.x, z: pos.z - target.z };
  const dist = Math.hypot(to.x, to.z) || 1;
  const radialX = to.x / dist;
  const radialZ = to.z / dist;
  const tangX = -radialZ * side;
  const tangZ = radialX * side;
  const radialErr = dist - desiredDist;
  const radialSpeed = clamp01(Math.abs(radialErr) / desiredDist) * maxSpeed * 0.6 * Math.sign(radialErr);
  const tangSpeed = maxSpeed * 0.7;
  const desiredX = radialX * radialSpeed + tangX * tangSpeed;
  const desiredZ = radialZ * radialSpeed + tangZ * tangSpeed;
  const t = clamp01(turnRate * 0.1);
  const vx0 = vel.vx ?? vel.x ?? 0;
  const vz0 = vel.vz ?? vel.z ?? 0;
  return { vx: vx0 + (desiredX - vx0) * t, vz: vz0 + (desiredZ - vz0) * t };
}

/**
 * Flee: move directly away from the target.
 */
export function flee(pos, vel, threat, maxSpeed) {
  const dx = pos.x - threat.x;
  const dz = pos.z - threat.z;
  const len = Math.hypot(dx, dz) || 1;
  return { vx: dx / len * maxSpeed, vz: dz / len * maxSpeed };
}

/**
 * Separation: push away from nearby neighbors (flocking).
 */
export function separation(pos, neighbors, minDist = 1.2, weight = 1.5, out = { x: 0, z: 0 }) {
  let dx = 0;
  let dz = 0;
  for (const n of neighbors) {
    const nx = pos.x - n.position.x;
    const nz = pos.z - n.position.z;
    const d2 = nx * nx + nz * nz;
    if (d2 > 0.0001 && d2 < minDist * minDist) {
      const d = Math.sqrt(d2);
      const push = (1 - d / minDist) * weight;
      dx += (nx / d) * push;
      dz += (nz / d) * push;
    }
  }
  out.x = dx;
  out.z = dz;
  return out;
}

/**
 * Wall avoidance: steer away from the closest obstacle within `probeDist`.
 */
export function avoidWalls(pos, world, probeDist = 1.6, weight = 3, out = { x: 0, z: 0 }) {
  out.x = 0;
  out.z = 0;
  const closest = world.collision.closestObstaclePoint(pos.x, pos.y, pos.z, world.collision.obstacles, probeDist);
  if (closest) {
    const dx = pos.x - closest.x;
    const dz = pos.z - closest.z;
    const d = Math.hypot(dx, dz);
    if (d > 1e-6 && d < probeDist) {
      const push = (1 - d / probeDist) * weight;
      out.x = (dx / d) * push;
      out.z = (dz / d) * push;
    } else if (d <= 1e-6) {
      // Inside (or exactly at) the obstacle: push along a deterministic axis.
      const push = weight;
      const angle = (pos.x * 12.9898 + pos.z * 78.233) % (Math.PI * 2);
      out.x = Math.cos(angle) * push;
      out.z = Math.sin(angle) * push;
    }
  }
  return out;
}

/** Combined steering helper for ground enemies. */
export function steer(pos, vel, desired, maxSpeed, dt) {
  const vx0 = vel.vx ?? vel.x ?? 0;
  const vz0 = vel.vz ?? vel.z ?? 0;
  const dvx = desired.vx ?? desired.x ?? 0;
  const dvz = desired.vz ?? desired.z ?? 0;
  const vx = vx0 + (dvx - vx0) * clamp01(dt * 6);
  const vz = vz0 + (dvz - vz0) * clamp01(dt * 6);
  return { vx, vz };
}

/** Straight-line direction from a to b (XZ). */
export function dirXZ(a, b, out = new Vec3()) {
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  const len = Math.hypot(dx, dz) || 1;
  return out.set(dx / len, 0, dz / len);
}
