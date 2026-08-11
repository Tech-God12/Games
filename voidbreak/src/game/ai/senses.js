/**
 * VOIDBREAK — AI senses.
 *
 * Perception model for enemies: vision (field of view cone + line-of-sight
 * raycast against obstacles) and hearing (world noise events with a radius).
 * Each enemy keeps a short memory of its last known player position.
 */

import { Vec3 } from '../../core/vec3.js';

export class Senses {
  constructor(owner, opts = {}) {
    this.owner = owner;
    this.visionRange = opts.visionRange ?? 40;
    this.fovDeg = opts.fovDeg ?? 160;
    this.hearingRange = opts.hearingRange ?? 30;
    this.loseSightTime = opts.loseSightTime ?? 4;

    this.lastKnownPlayer = new Vec3();
    this.hasTargetMemory = false;
    this.lastSeenTime = -1e9;
    this.lastHeardTime = -1e9;
    this.lastSightCheck = 0;
    this.sightCheckInterval = 0.15;
    this._canSeeCache = false;
  }

  /** Player position shortcut. */
  get player() {
    return this.owner.world?.players[0] ?? null;
  }

  /** True if we currently see the player (cached per interval). */
  canSeePlayer(dt) {
    const player = this.player;
    if (!player || player.dead) return false;
    this.lastSightCheck -= dt;
    if (this.lastSightCheck <= 0) {
      this.lastSightCheck = this.sightCheckInterval;
      this._canSeeCache = this._checkVision(player);
    }
    return this._canSeeCache;
  }

  _checkVision(player) {
    const to = player.position.clone().sub(this.owner.position);
    const dist = to.length();
    if (dist > this.visionRange) return false;

    const dir = this.owner.getFacing();
    const cosAngle = to.dot(dir) / (dist + 1e-6);
    const cosFov = Math.cos(this.fovDeg * Math.PI / 180 / 2);
    if (cosAngle < cosFov && !this.owner.alwaysAware) return false;

    const eye = this.owner.position.clone();
    eye.y += this.owner.height * 0.6;
    const target = player.position.clone();
    target.y += 0.9;
    const rayDir = target.sub(eye);
    const rayLen = rayDir.length();
    rayDir.normalize();
    const hit = this.owner.world.collision.raycast(eye, rayDir, rayLen - 0.3);
    if (hit) return false;

    this.lastKnownPlayer.copy(player.position);
    this.hasTargetMemory = true;
    this.lastSeenTime = this.owner.world.time;
    return true;
  }

  /** Notify the senses of a noise event. Returns true if it alerted us. */
  hear(event) {
    const pos = event ?? null;
    if (!pos) return false;
    const dx = pos.x - this.owner.position.x;
    const dz = pos.z - this.owner.position.z;
    const dist = Math.hypot(dx, dz);
    const radius = event.radius ?? this.hearingRange;
    if (dist > radius) return false;
    this.lastHeardTime = this.owner.world.time;
    this.lastKnownPlayer.set(this.owner.position.x + dx, 0, this.owner.position.z + dz);
    this.hasTargetMemory = true;
    return true;
  }

  /** Time since we last saw the player (or Infinity if never). */
  get timeSinceSeen() {
    return this.owner.world.time - this.lastSeenTime;
  }

  /** True while we have a valid target memory (saw or heard recently). */
  get hasTarget() {
    if (!this.hasTargetMemory) return false;
    if (this.owner.world.time - this.lastSeenTime < this.loseSightTime) return true;
    if (this.owner.world.time - this.lastHeardTime < this.loseSightTime * 0.5) return true;
    this.hasTargetMemory = false;
    return false;
  }

  /** Clear memory (after losing the player). */
  forget() {
    this.hasTargetMemory = false;
    this._canSeeCache = false;
  }
}

/** World noise event helper: emit gunfire alerts to nearby enemies. */
export function makeNoiseEvent(world, x, y, z, radius, source = null) {
  world.bus.emit('ai.noise', { x, y, z, radius, source });
}
