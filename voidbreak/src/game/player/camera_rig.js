/**
 * VOIDBREAK — PlayerCamera (camera rig).
 *
 * Translates player state into the rendered camera: yaw/pitch with recoil
 * recovery, head-bob, FOV kick (sprint/ADS/impact), landing dip, screen
 * shake, and weapon sway offsets. This is where "game feel" lives.
 */

import { clamp, damp, lerp } from '../../core/math.js';

export class PlayerCamera {
  /**
   * @param {import('../../gfx/camera.js').Camera} camera the render camera
   */
  constructor(camera, opts = {}) {
    this.camera = camera;
    this.player = null;

    this.yaw = 0;
    this.pitch = 0;
    this.roll = 0;
    this.recoilPitch = 0;
    this.recoilYaw = 0;

    this.offset = { x: 0, y: 0, z: 0 };
    this.bobPhase = 0;
    this.bobAmp = 0;
    this.landDip = 0;
    this.shake = 0;
    this.shakeDecay = 3.5;
    this.fov = opts.fov ?? 88;
    this.fovBase = this.fov;
    this.fovKick = 0;
    this.fovZoom = 0;
    this._zoomFov = 55;

    this.swayX = 0;
    this.swayY = 0;

    this.headbobAmount = 1;
    this.shakeAmount = 1;
    this.weaponSway = 1;
    this.sensitivity = 1;
    this.invertY = false;
    this.zoomSensitivityScale = 0.6;

    this._mouseDx = 0;
    this._mouseDy = 0;
  }

  /** Bind settings updates. */
  bindSettings(settings) {
    settings.on('sensitivity', (v) => { this.sensitivity = v; });
    settings.on('invertY', (v) => { this.invertY = v; });
    settings.on('headbob', (v) => { this.headbobAmount = v; });
    settings.on('screenShake', (v) => { this.shakeAmount = v; });
    settings.on('weaponSway', (v) => { this.weaponSway = v; });
    settings.on('fov', (v) => { this.fovBase = v; });
    settings.on('zoomSensitivityScale', (v) => { this.zoomSensitivityScale = v; });
    this.fovBase = settings.get('fov');
    this.sensitivity = settings.get('sensitivity');
    this.invertY = settings.get('invertY');
  }

  /** Feed raw mouse deltas (before sensitivity) for one frame. */
  addLookInput(dx, dy) {
    this._mouseDx += dx;
    this._mouseDy += dy;
  }

  /** Add recoil (degrees). */
  addRecoil(pitchDeg, yawDeg) {
    this.recoilPitch += pitchDeg;
    this.recoilYaw += yawDeg;
  }

  /** Impulse screen shake. */
  addShake(amount, duration = 0.3) {
    this.shake = Math.min(1, this.shake + amount * this.shakeAmount);
    void duration;
  }

  /** FOV kick (positive = widen, e.g. dash/sprint). */
  addFovKick(amount) {
    this.fovKick = Math.min(14, this.fovKick + amount);
  }

  /** Apply ADS zoom (0..1). */
  setZoom(amount, targetFov) {
    this.fovZoom = clamp(amount, 0, 1);
    this._zoomFov = targetFov ?? 55;
  }

  /**
   * Per-frame update.
   */
  update(dt, state = {}) {
    const p = this.player;

    const zoomScale = lerp(1, this.zoomSensitivityScale, this.fovZoom);
    const sens = this.sensitivity * zoomScale;
    const move = state.lookDelta ?? { dx: this._mouseDx, dy: this._mouseDy };
    const dx = move.dx * sens;
    const dy = move.dy * sens * (this.invertY ? -1 : 1);

    this.yaw -= dx * 0.0022;
    this.pitch -= dy * 0.0022;
    this.pitch = clamp(this.pitch, -1.55, 1.55);

    this.recoilPitch = Math.max(0, this.recoilPitch - dt * 9);
    this.recoilYaw = damp(this.recoilYaw, 0, 6, dt);
    this.yaw += this.recoilYaw * 0.001;
    this.pitch += this.recoilPitch * 0.001;

    const speed = p?.groundSpeed ?? state.groundSpeed ?? 0;
    const moving = speed > 0.5 && (p?.movement?.grounded ?? state.grounded ?? true);
    const bobFreq = 6.5;
    if (moving) {
      this.bobPhase += dt * bobFreq * clamp(speed / 5, 0.6, 1.6);
      const sprintFactor = (p?.movement?.sprint ?? 0) > 0.5 ? 1.35 : 1;
      this.bobAmp = clamp(speed / 8, 0, 1) * sprintFactor * this.headbobAmount;
    } else {
      this.bobAmp = damp(this.bobAmp, 0, 8, dt);
    }
    const bobX = Math.sin(this.bobPhase * 2) * 0.045 * this.bobAmp;
    const bobY = Math.sin(this.bobPhase) * 0.035 * this.bobAmp;

    this.landDip = damp(this.landDip, 0, 6, dt);

    if (this.shake > 0.002) {
      const t = performance.now() / 1000;
      const amp = this.shake * this.shakeAmount;
      this.offset.x = Math.sin(t * 41.7) * 0.03 * amp;
      this.offset.y = Math.cos(t * 38.3) * 0.02 * amp;
      this.offset.z = Math.sin(t * 23.9) * 0.015 * amp;
      this.roll = Math.sin(t * 29.1) * 0.008 * amp;
      this.shake = Math.max(0, this.shake - this.shakeDecay * dt);
    } else {
      this.shake = 0;
      this.offset.x = 0;
      this.offset.y = 0;
      this.offset.z = 0;
      this.roll = 0;
    }

    if (this.weaponSway > 0) {
      const targetSwayX = -dx * 0.00012 * this.weaponSway;
      const targetSwayY = dy * 0.0001 * this.weaponSway;
      this.swayX = damp(this.swayX, targetSwayX, 12, dt);
      this.swayY = damp(this.swayY, targetSwayY, 12, dt);
    } else {
      this.swayX = 0;
      this.swayY = 0;
    }

    const fovBase = this.fovBase;
    const sprintKick = (p?.movement?.sprint ?? 0) > 0.5 && speed > 4 ? 7 : 0;
    this.fovKick = damp(this.fovKick, 0, 7, dt);
    const zoomFov = lerp(fovBase, this._zoomFov ?? 55, this.fovZoom);
    const targetFov = zoomFov + this.fovKick * 0.4 + sprintKick;
    this.fov = damp(this.fov, targetFov, 10, dt);
    this.camera.setFov(this.fov);

    const eyeY = p ? p.eyeHeight : 1.62;
    const pos = p?.position ?? { x: 0, y: eyeY, z: 0 };
    const bobApplyY = bobY - this.landDip * 0.22;
    const crouchDrop = p ? (1 - eyeY / 1.62) * 0.7 : 0;

    this.camera.setPosition(
      pos.x + this.offset.x + this.swayX + bobX,
      pos.y + this.offset.y + bobApplyY - crouchDrop,
      pos.z + this.offset.z,
    );
    this.camera.setRotation(
      this.yaw + this.recoilYaw * 0.0008,
      this.pitch + this.recoilPitch * 0.0008,
      this.roll,
    );

    this._mouseDx = 0;
    this._mouseDy = 0;

    this.viewBobX = bobX;
    this.viewBobY = bobApplyY;
    this.viewSwayX = this.swayX;
    this.viewSwayY = this.swayY;
  }

  /** Snap the camera to the player (after respawn). */
  snap() {
    const p = this.player;
    if (!p) return;
    this.camera.setPosition(p.position.x, p.position.y + p.eyeHeight, p.position.z);
    this.camera.setRotation(this.yaw, this.pitch, 0);
  }

  /** Direction the player aims (normalized, world space). */
  aimDir(out) {
    const cy = Math.cos(this.yaw);
    const sy = Math.sin(this.yaw);
    const cp = Math.cos(this.pitch);
    const sp = Math.sin(this.pitch);
    if (!out) out = { x: 0, y: 0, z: 0 };
    out.x = -sy * cp;
    out.y = sp;
    out.z = -cy * cp;
    return out;
  }
}
