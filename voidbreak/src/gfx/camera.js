/**
 * VOIDBREAK — Camera.
 *
 * Perspective camera with explicit fov / aspect / near / far, built from
 * yaw/pitch/roll (player FPS convention). Matrices update lazily; the
 * forward/right/up basis is derived directly from the Euler angles so the
 * view stays stable even at extreme pitch.
 */

import { Mat4 } from '../core/mat4.js';
import { Vec3 } from '../core/vec3.js';

export class Camera {
  constructor(opts = {}) {
    this.position = new Vec3(0, 1.6, 0);
    this.rotation = { yaw: 0, pitch: 0, roll: 0 };
    this.fov = opts.fov ?? 88;         // degrees, vertical
    this.aspect = opts.aspect ?? 16 / 9;
    this.near = opts.near ?? 0.05;
    this.far = opts.far ?? 400;

    this._mView = new Mat4().identity();
    this._mProj = new Mat4().identity();
    this._mViewProj = new Mat4().identity();
    this._mViewInv = new Mat4().identity();
    this._dirty = true;

    this.forward = new Vec3(0, 0, -1);
    this.right = new Vec3(1, 0, 0);
    this.up = new Vec3(0, 1, 0);
  }

  setFov(fovDeg) {
    if (this.fov !== fovDeg) {
      this.fov = fovDeg;
      this._dirty = true;
    }
  }

  setAspect(aspect) {
    if (this.aspect !== aspect) {
      this.aspect = aspect;
      this._dirty = true;
    }
  }

  setPosition(x, y, z) {
    this.position.set(x, y, z);
    this._dirty = true;
  }

  copyPosition(v) {
    this.position.copy(v);
    this._dirty = true;
  }

  setRotation(yaw, pitch, roll = 0) {
    this.rotation.yaw = yaw;
    this.rotation.pitch = pitch;
    this.rotation.roll = roll;
    this._dirty = true;
  }

  /** Refresh view/projection matrices if dirty. */
  updateMatrices() {
    if (!this._dirty) return this;
    this._mProj.makePerspective(this.fov * Math.PI / 180, this.aspect, this.near, this.far);

    const cy = Math.cos(this.rotation.yaw);
    const sy = Math.sin(this.rotation.yaw);
    const cp = Math.cos(this.rotation.pitch);
    const sp = Math.sin(this.rotation.pitch);
    const cr = Math.cos(this.rotation.roll);
    const sr = Math.sin(this.rotation.roll);

    const fx = -sy * cp;
    const fy = sp;
    const fz = -cy * cp;
    this.forward.set(fx, fy, fz);

    this.right.set(cy, 0, -sy);
    const upNoRoll = new Vec3(0, 1, 0).cross(this.right).normalize();
    this.up.copy(upNoRoll).mulScalar(cr).addScaled(this.forward, sr);

    const eye = this.position;
    const m = this._mView;
    m.identity();
    m[0] = this.right.x;
    m[4] = this.right.y;
    m[8] = this.right.z;
    m[1] = this.up.x;
    m[5] = this.up.y;
    m[9] = this.up.z;
    m[2] = -this.forward.x;
    m[6] = -this.forward.y;
    m[10] = -this.forward.z;
    m[12] = -this.right.dot(eye);
    m[13] = -this.up.dot(eye);
    m[14] = this.forward.dot(eye);

    this._mViewProj.multiply(this._mProj, this._mView);
    this._mViewInv.copy(this._mView).invert();
    this._dirty = false;
    return this;
  }

  get viewMatrix() {
    this.updateMatrices();
    return this._mView;
  }

  get projMatrix() {
    this.updateMatrices();
    return this._mProj;
  }

  get viewProjMatrix() {
    this.updateMatrices();
    return this._mViewProj;
  }

  get viewInvMatrix() {
    this.updateMatrices();
    return this._mViewInv;
  }
}
