/**
 * VOIDBREAK — Quat (quaternion).
 *
 * Used for all 3D rotations in the engine (camera, entities, projectiles).
 * Mutable + chainable, like Vec3. Pure math — unit tested.
 */

import { EPSILON } from './constants.js';

export class Quat {
  constructor(x = 0, y = 0, z = 0, w = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  set(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  }

  copy(q) {
    this.x = q.x;
    this.y = q.y;
    this.z = q.z;
    this.w = q.w;
    return this;
  }

  clone() {
    return new Quat(this.x, this.y, this.z, this.w);
  }

  identity() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.w = 1;
    return this;
  }

  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }

  length() {
    return Math.sqrt(this.lengthSq());
  }

  /** Normalize in place. No-op for zero quaternion. */
  normalize() {
    const len = this.length();
    if (len < EPSILON) {
      return this.identity();
    }
    return this.set(this.x / len, this.y / len, this.z / len, this.w / len);
  }

  /** Conjugate (inverse for unit quaternions). */
  conjugate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }

  /** True inverse. */
  invert() {
    const lenSq = this.lengthSq();
    if (lenSq < EPSILON) return this.identity();
    return this.conjugate().set(
      this.x / lenSq, this.y / lenSq, this.z / lenSq, this.w / lenSq,
    );
  }

  dot(q) {
    return this.x * q.x + this.y * q.y + this.z * q.z + this.w * q.w;
  }

  /** Multiply: this = this * q (apply q first, then this). */
  multiply(q) {
    const { x, y, z, w } = this;
    const qx = q.x, qy = q.y, qz = q.z, qw = q.w;
    this.x = w * qx + x * qw + y * qz - z * qy;
    this.y = w * qy - x * qz + y * qw + z * qx;
    this.z = w * qz + x * qy - y * qx + z * qw;
    this.w = w * qw - x * qx - y * qy - z * qz;
    return this;
  }

  /** this = a * b. */
  multiplyQuaternions(a, b) {
    const ax = a.x, ay = a.y, az = a.z, aw = a.w;
    const bx = b.x, by = b.y, bz = b.z, bw = b.w;
    this.x = ax * bw + aw * bx + ay * bz - az * by;
    this.y = ay * bw + aw * by + az * bx - ax * bz;
    this.z = az * bw + aw * bz + ax * by - ay * bx;
    this.w = aw * bw - ax * bx - ay * by - az * bz;
    return this;
  }

  /** Multiply in place with an axis-angle rotation. */
  multiplyAxisAngle(axis, angle) {
    const half = angle * 0.5;
    const s = Math.sin(half);
    const qx = axis.x * s, qy = axis.y * s, qz = axis.z * s, qw = Math.cos(half);
    const { x, y, z, w } = this;
    this.x = w * qx + x * qw + y * qz - z * qy;
    this.y = w * qy - x * qz + y * qw + z * qx;
    this.z = w * qz + x * qy - y * qx + z * qw;
    this.w = w * qw - x * qx - y * qy - z * qz;
    return this;
  }

  /** Rotate a Vec3 by this quaternion, into out. */
  rotateVec3(v, out = v) {
    const { x, y, z, w } = this;
    const ix = w * v.x + y * v.z - z * v.y;
    const iy = w * v.y + z * v.x - x * v.z;
    const iz = w * v.z + x * v.y - y * v.x;
    const iw = -x * v.x - y * v.y - z * v.z;
    out.x = ix * w + iw * -x + iy * -z - iz * -y;
    out.y = iy * w + iw * -y + iz * -x - ix * -z;
    out.z = iz * w + iw * -z + ix * -y - iy * -x;
    return out;
  }

  /**
   * Set from Euler angles in YXZ order: R = Ry(yaw) * Rx(pitch) * Rz(roll).
   * This is the camera/player convention used across the game.
   */
  setFromEulerYXZ(yaw, pitch, roll = 0) {
    const cy = Math.cos(yaw * 0.5), sy = Math.sin(yaw * 0.5);
    const cp = Math.cos(pitch * 0.5), sp = Math.sin(pitch * 0.5);
    const cr = Math.cos(roll * 0.5), sr = Math.sin(roll * 0.5);
    this.x = cr * cy * sp + sr * cp * sy;
    this.y = cr * cp * sy - sr * cy * sp;
    this.z = sr * cp * cy - cr * sp * sy;
    this.w = cr * cp * cy + sr * sp * sy;
    return this;
  }

  /**
   * Extract Euler angles (YXZ order: R = Ry*Rx*Rz) into {yaw, pitch, roll}.
   */
  toEulerYXZ(out = { yaw: 0, pitch: 0, roll: 0 }) {
    const { x, y, z, w } = this;
    const m13 = 2 * (x * z + w * y);
    const m33 = 1 - 2 * (x * x + y * y);
    const m23 = 2 * (y * z - w * x);
    const m21 = 2 * (y * x + w * z);
    const m22 = 1 - 2 * (x * x + z * z);
    out.yaw = Math.atan2(m13, m33);
    out.pitch = Math.atan2(-m23, Math.sqrt(Math.max(0, 1 - m23 * m23)));
    out.roll = Math.atan2(m21, m22);
    return out;
  }

  /** Angular distance to another quaternion (radians, in [0, PI]). */
  distanceTo(q) {
    const d = Math.abs(this.dot(q));
    return Math.acos(Math.min(1, Math.max(-1, d))) * 2;
  }

  /** Set from axis + angle (radians). */
  setFromAxisAngle(axis, angle) {
    const half = angle * 0.5;
    const s = Math.sin(half);
    this.x = axis.x * s;
    this.y = axis.y * s;
    this.z = axis.z * s;
    this.w = Math.cos(half);
    return this;
  }

  /** Set from a rotation matrix. */
  setFromRotationMatrix(m) {
    const te = m;
    const m11 = te[0], m12 = te[4], m13 = te[8];
    const m21 = te[1], m22 = te[5], m23 = te[9];
    const m31 = te[2], m32 = te[6], m33 = te[10];
    const trace = m11 + m22 + m33;
    if (trace > 0) {
      const s = 0.5 / Math.sqrt(trace + 1);
      this.w = 0.25 / s;
      this.x = (m32 - m23) * s;
      this.y = (m13 - m31) * s;
      this.z = (m21 - m12) * s;
    } else if (m11 > m22 && m11 > m33) {
      const s = 2 * Math.sqrt(1 + m11 - m22 - m33);
      this.w = (m32 - m23) / s;
      this.x = 0.25 * s;
      this.y = (m12 + m21) / s;
      this.z = (m13 + m31) / s;
    } else if (m22 > m33) {
      const s = 2 * Math.sqrt(1 + m22 - m11 - m33);
      this.w = (m13 - m31) / s;
      this.x = (m12 + m21) / s;
      this.y = 0.25 * s;
      this.z = (m23 + m32) / s;
    } else {
      const s = 2 * Math.sqrt(1 + m33 - m11 - m22);
      this.w = (m21 - m12) / s;
      this.x = (m13 + m31) / s;
      this.y = (m23 + m32) / s;
      this.z = 0.25 * s;
    }
    return this.normalize();
  }

  /**
   * Set from a direction vector — builds the rotation that maps -Z (forward)
   * onto `dir`, using `up` as a hint (falls back gracefully when dir is
   * parallel to up).
   */
  setFromDirection(dir, up = { x: 0, y: 1, z: 0 }) {
    const dLen = Math.hypot(dir.x, dir.y, dir.z);
    if (dLen < EPSILON) return this.identity();
    const zAxis = { x: -dir.x / dLen, y: -dir.y / dLen, z: -dir.z / dLen };

    let xAxis = {
      x: up.y * zAxis.z - up.z * zAxis.y,
      y: up.z * zAxis.x - up.x * zAxis.z,
      z: up.x * zAxis.y - up.y * zAxis.x,
    };
    let lenX = Math.hypot(xAxis.x, xAxis.y, xAxis.z);
    if (lenX < EPSILON) {
      const hint = Math.abs(zAxis.z) < 0.9 ? { x: 0, y: 0, z: 1 } : { x: 1, y: 0, z: 0 };
      xAxis = {
        x: hint.y * zAxis.z - hint.z * zAxis.y,
        y: hint.z * zAxis.x - hint.x * zAxis.z,
        z: hint.x * zAxis.y - hint.y * zAxis.x,
      };
      lenX = Math.hypot(xAxis.x, xAxis.y, xAxis.z);
    }
    xAxis.x /= lenX; xAxis.y /= lenX; xAxis.z /= lenX;

    const yAxis = {
      x: zAxis.y * xAxis.z - zAxis.z * xAxis.y,
      y: zAxis.z * xAxis.x - zAxis.x * xAxis.z,
      z: zAxis.x * xAxis.y - zAxis.y * xAxis.x,
    };

    // Column-major rotation matrix: columns are xAxis, yAxis, zAxis.
    const m = [
      xAxis.x, xAxis.y, xAxis.z, 0,
      yAxis.x, yAxis.y, yAxis.z, 0,
      zAxis.x, zAxis.y, zAxis.z, 0,
      0, 0, 0, 1,
    ];
    return this.setFromRotationMatrix(m);
  }

  /** Shortest-path rotation from one direction to another. */
  setFromUnitVectors(from, to) {
    let r = from.x * to.x + from.y * to.y + from.z * to.z;
    if (r < -0.999999) {
      const axis = {
        x: from.y === 0 ? 1 : -from.z,
        y: 0,
        z: from.x,
      };
      const len = Math.hypot(axis.x, axis.y, axis.z);
      axis.x /= len; axis.z /= len;
      this.setFromAxisAngle(axis, Math.PI);
      return this;
    }
    const cross = {
      x: from.y * to.z - from.z * to.y,
      y: from.z * to.x - from.x * to.z,
      z: from.x * to.y - from.y * to.x,
    };
    this.x = cross.x;
    this.y = cross.y;
    this.z = cross.z;
    this.w = 1 + r;
    return this.normalize();
  }

  /** Spherical interpolation between this and q by t. */
  slerp(q, t) {
    if (t === 0) return this;
    if (t === 1) return this.copy(q);
    let cosHalfTheta = this.dot(q);
    let storedQ = q;
    if (cosHalfTheta < 0) {
      storedQ = q.clone().negate();
      cosHalfTheta = -cosHalfTheta;
    }
    if (cosHalfTheta > 0.999999) {
      const out = this.clone().lerp(storedQ, t).normalize();
      return this.copy(out);
    }
    const sinHalfTheta = Math.sqrt(1 - cosHalfTheta * cosHalfTheta);
    const halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
    const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
    const ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
    this.x = this.x * ratioA + storedQ.x * ratioB;
    this.y = this.y * ratioA + storedQ.y * ratioB;
    this.z = this.z * ratioA + storedQ.z * ratioB;
    this.w = this.w * ratioA + storedQ.w * ratioB;
    return this;
  }

  /** Linear interpolation then normalize (cheap slerp for small angles). */
  lerp(q, t) {
    this.x += (q.x - this.x) * t;
    this.y += (q.y - this.y) * t;
    this.z += (q.z - this.z) * t;
    this.w += (q.w - this.w) * t;
    return this;
  }

  negate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    this.w = -this.w;
    return this;
  }

  equals(q) {
    return this.x === q.x && this.y === q.y && this.z === q.z && this.w === q.w;
  }

  equalsApprox(q, eps = EPSILON) {
    return (
      Math.abs(this.x - q.x) <= eps &&
      Math.abs(this.y - q.y) <= eps &&
      Math.abs(this.z - q.z) <= eps &&
      Math.abs(this.w - q.w) <= eps
    );
  }

  toString() {
    return `Quat(${this.x.toFixed(3)}, ${this.y.toFixed(3)}, ${this.z.toFixed(3)}, ${this.w.toFixed(3)})`;
  }

  static identity() { return new Quat().identity(); }
  static fromEulerYXZ(yaw, pitch, roll = 0) { return new Quat().setFromEulerYXZ(yaw, pitch, roll); }
  static fromAxisAngle(axis, angle) { return new Quat().setFromAxisAngle(axis, angle); }
  static fromDirection(dir, up) { return new Quat().setFromDirection(dir, up); }
  static fromUnitVectors(from, to) { return new Quat().setFromUnitVectors(from, to); }
  static fromRotationMatrix(m) { return new Quat().setFromRotationMatrix(m); }
  static multiply(a, b, out = new Quat()) { return out.multiplyQuaternions(a, b); }
}

export const IDENTITY_QUAT = new Quat();
