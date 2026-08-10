/**
 * VOIDBREAK — world → screen projection helpers.
 *
 * Used by the HUD for damage numbers, enemy markers and the boss bar anchor.
 * Pure math on the camera's matrices.
 */

import { Vec3 } from '../core/vec3.js';

const _clip = new Vec3();

/**
 * Project a world point to screen coordinates.
 * @param {import('./camera.js').Camera} camera
 * @param {Vec3} worldPos
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 * @returns {{x:number, y:number, depth:number, visible:boolean}}
 */
export function projectToScreen(camera, worldPos, canvasWidth, canvasHeight) {
  const vp = camera.viewProjMatrix;
  const x = worldPos.x, y = worldPos.y, z = worldPos.z;
  const e = vp;
  const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
  _clip.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
  _clip.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
  _clip.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
  const visible =
    _clip.z > -1 && _clip.z < 1 &&
    _clip.x > -1 && _clip.x < 1 &&
    _clip.y > -1 && _clip.y < 1;
  return {
    x: (_clip.x * 0.5 + 0.5) * canvasWidth,
    y: (-_clip.y * 0.5 + 0.5) * canvasHeight,
    depth: _clip.z,
    visible,
  };
}

/**
 * Direction from the camera toward a world point (normalized).
 */
export function directionTo(camera, worldPos, out = new Vec3()) {
  return out.copy(worldPos).sub(camera.position).normalize();
}

/**
 * Angle in radians between the camera's forward and a world point (0 = centered).
 */
export function angleToForward(camera, worldPos) {
  const dx = worldPos.x - camera.position.x;
  const dy = worldPos.y - camera.position.y;
  const dz = worldPos.z - camera.position.z;
  const len = Math.hypot(dx, dy, dz) || 1;
  return Math.acos(Math.min(1, Math.max(-1, (dx * camera.forward.x + dy * camera.forward.y + dz * camera.forward.z) / len)));
}

/**
 * Convert screen-space distance (px) into a world-size suggestion at a given
 * world distance, using the camera's fov.
 */
export function worldSizeForScreenPx(camera, worldPos, px, canvasHeight) {
  const dist = camera.position.distanceTo(worldPos);
  const fovRad = camera.fov * Math.PI / 180;
  const worldAtDist = 2 * dist * Math.tan(fovRad * 0.5);
  return worldAtDist * (px / canvasHeight);
}
