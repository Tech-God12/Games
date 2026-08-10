// ============================================================================
// CameraRig.js
// First-person camera driver: applies look yaw/pitch, recoil kick, view bob,
// camera shake (from EffectsManager), FOV kicks for sprint/dash/zoom, and a
// subtle lean during strafing. Drives both the world camera and a separate
// viewmodel camera so the gun renders without world fog/depth conflicts.
// ============================================================================

import * as THREE from 'three';
import { clamp, damp, lerp, dampAngle } from '../core/MathUtils.js';

const _shake = new THREE.Vector3();
const _euler = new THREE.Euler(0, 0, 0, 'YXZ');
const _quat = new THREE.Quaternion();

export class CameraRig {
  constructor(camera, viewmodelCamera) {
    this.camera = camera;
    this.viewmodelCamera = viewmodelCamera;
    this.targetFOV = 75;
    this.fov = 75;
    this.minPitch = -Math.PI / 2 + 0.05;
    this.maxPitch = Math.PI / 2 - 0.05;
    this.eyeHeight = 1.6;
    this.crouchHeight = 1.0;
    this.bobAmount = 0.06;
    this.bobFreq = 9;
    this.leanAmount = 0.025;
    this.roll = 0;
    this.recoilPitch = 0;
    this.recoilYaw = 0;
    this.kick = 0;            // positional kick back
    this.zoomFactor = 1;      // 1 = normal, <1 = zoomed
    this.effects = null;
    this._bobPhase = 0;
  }

  setFOV(fov) { this.targetFOV = fov; this.fov = fov; this.camera.fov = fov; this.camera.updateProjectionMatrix(); }

  addRecoil(pitch, yaw) {
    this.recoilPitch += pitch;
    this.recoilYaw += yaw;
  }

  setZoom(factor) { this.zoomFactor = clamp(factor, 0.4, 1); }

  /**
   * @param {number} dt
   * @param {import('../ecs/Entity.js').Entity} player entity with Body + Player components
   */
  update(dt, player) {
    const body = player.get('Body');
    const p = player.get('Player');
    if (!body || !p) return;

    // recoil recovery
    this.recoilPitch = damp(this.recoilPitch, 0, 9, dt);
    this.recoilYaw = damp(this.recoilYaw, 0, 9, dt);
    this.kick = damp(this.kick, 0, 12, dt);

    // FOV (with zoom + sprint kick)
    const desiredFOV = this.targetFOV * this.zoomFactor + (p.state === 'dashing' ? 8 : 0) + this.kick * 20;
    this.fov = damp(this.fov, desiredFOV, 8, dt);
    this.camera.fov = this.fov;
    this.camera.updateProjectionMatrix();
    this.viewmodelCamera.fov = this.fov;
    this.viewmodelCamera.updateProjectionMatrix();

    // view bob based on horizontal speed
    const speed = Math.hypot(body.vel.x, body.vel.z);
    const grounded = body.grounded;
    const bobTarget = grounded ? clamp(speed / 8, 0, 1) : 0;
    this._bobPhase += dt * this.bobFreq * bobTarget;
    const bobY = Math.sin(this._bobPhase * 2) * this.bobAmount * bobTarget;
    const bobX = Math.cos(this._bobPhase) * this.bobAmount * 0.5 * bobTarget;

    // strafe lean
    const move = p.meta?.moveX || 0;
    this.roll = damp(this.roll, move * this.leanAmount, 6, dt);

    // shake
    let shx = 0, shy = 0, shz = 0, shRoll = 0;
    if (this.effects) {
      this.effects.shakeOffset(_shake, dt);
      shx = _shake.x; shy = _shake.y; shz = _shake.z;
      shRoll = this.effects.shakeRoll;
    }

    // compose camera transform
    const yaw = p.lookYaw + this.recoilYaw;
    const pitch = clamp(p.lookPitch + this.recoilPitch, this.minPitch, this.maxPitch);
    _euler.set(pitch, yaw, this.roll + shRoll, 'YXZ');
    _quat.setFromEuler(_euler);

    const eyeY = this.eyeHeight;
    this.camera.position.set(
      body.pos.x + bobX + shx,
      body.pos.y + eyeY + bobY + shy,
      body.pos.z + shz
    );
    this.camera.quaternion.copy(_quat);

    // viewmodel camera: positioned at the same eye, slight forward offset handled by viewmodel object
    this.viewmodelCamera.position.copy(this.camera.position);
    this.viewmodelCamera.quaternion.copy(this.camera.quaternion);
  }
}
