/**
 * VOIDBREAK — Mat4 (4x4 matrix, column-major Float32Array).
 *
 * Column-major layout matching WebGL/GLSL expectations. All methods mutate
 * `this` and return `this`. Pure math — unit tested.
 */

import { EPSILON } from './constants.js';
import { Vec3 } from './vec3.js';

const _t = new Float32Array(16);

export class Mat4 extends Float32Array {
  constructor() {
    super(16);
    this.identity();
  }

  /** Reset to identity. */
  identity() {
    this.fill(0);
    this[0] = 1;
    this[5] = 1;
    this[10] = 1;
    this[15] = 1;
    return this;
  }

  /** Copy elements from another Mat4 or a 16-length array. */
  copy(m) {
    this.set(m);
    return this;
  }

  clone() {
    const m = new Mat4();
    m.set(this);
    return m;
  }

  /**
   * Matrix multiplication, column-major.
   * multiply(a, b)   → this = a * b
   * multiply(m)      → this = this * m  (post-multiply)
   */
  multiply(a, b) {
    if (b === undefined) {
      return this.multiply(this, a);
    }
    const ae = a;
    const be = b;
    const te = this;
    let a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
    let a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
    let a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
    let a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];

    let b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
    let b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
    let b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
    let b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];

    te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

    te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

    te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

    te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

    return this;
  }

  /** this = m * this (pre-multiply). */
  premultiply(m) {
    return this.multiply(m, this);
  }

  multiplyScalar(s) {
    for (let i = 0; i < 16; i++) this[i] *= s;
    return this;
  }

  /** Matrix transpose. */
  transpose() {
    _t.set(this);
    this[1] = _t[4]; this[2] = _t[8]; this[3] = _t[12];
    this[4] = _t[1]; this[6] = _t[9]; this[7] = _t[13];
    this[8] = _t[2]; this[9] = _t[6]; this[11] = _t[14];
    this[12] = _t[3]; this[13] = _t[7]; this[14] = _t[11];
    return this;
  }

  /** Inverse. Returns null if singular. */
  invert() {
    const te = this;
    const n11 = te[0], n21 = te[1], n31 = te[2], n41 = te[3];
    const n12 = te[4], n22 = te[5], n32 = te[6], n42 = te[7];
    const n13 = te[8], n23 = te[9], n33 = te[10], n43 = te[11];
    const n14 = te[12], n24 = te[13], n34 = te[14], n44 = te[15];

    const t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44;
    const t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44;
    const t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44;
    const t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

    const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;
    if (det === 0) return null;

    const detInv = 1 / det;

    te[0] = t11 * detInv;
    te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
    te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
    te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;

    te[4] = t12 * detInv;
    te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
    te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
    te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;

    te[8] = t13 * detInv;
    te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
    te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
    te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;

    te[12] = t14 * detInv;
    te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
    te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
    te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;

    return this;
  }

  /** Determinant. */
  determinant() {
    const te = this;
    const n11 = te[0], n21 = te[1], n31 = te[2], n41 = te[3];
    const n12 = te[4], n22 = te[5], n32 = te[6], n42 = te[7];
    const n13 = te[8], n23 = te[9], n33 = te[10], n43 = te[11];
    const n14 = te[12], n24 = te[13], n34 = te[14], n44 = te[15];
    return (
      n41 * (+n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34) +
      n42 * (+n11 * n23 * n34 - n11 * n24 * n33 + n14 * n21 * n33 - n13 * n21 * n34 + n13 * n24 * n31 - n14 * n23 * n31) +
      n43 * (+n11 * n24 * n32 - n11 * n22 * n34 - n14 * n21 * n32 + n12 * n21 * n34 + n14 * n22 * n31 - n12 * n24 * n31) +
      n44 * (+n13 * n21 * n32 - n11 * n23 * n32 - n13 * n22 * n31 + n11 * n22 * n33 + n12 * n23 * n31 - n12 * n21 * n33)
    );
  }

  makeTranslation(x, y, z) {
    this.identity();
    this[12] = x;
    this[13] = y;
    this[14] = z;
    return this;
  }

  makeScale(x, y, z) {
    this.identity();
    this[0] = x;
    this[5] = y;
    this[10] = z;
    return this;
  }

  makeRotationX(theta) {
    const c = Math.cos(theta);
    const s = Math.sin(theta);
    this.identity();
    this[5] = c;
    this[6] = s;
    this[9] = -s;
    this[10] = c;
    return this;
  }

  makeRotationY(theta) {
    const c = Math.cos(theta);
    const s = Math.sin(theta);
    this.identity();
    this[0] = c;
    this[2] = -s;
    this[8] = s;
    this[10] = c;
    return this;
  }

  makeRotationZ(theta) {
    const c = Math.cos(theta);
    const s = Math.sin(theta);
    this.identity();
    this[0] = c;
    this[1] = s;
    this[4] = -s;
    this[5] = c;
    return this;
  }

  /** Rotation about an arbitrary axis (radians). Axis is normalized internally. */
  makeRotationAxis(axis, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const t = 1 - c;
    const len = Math.hypot(axis.x, axis.y, axis.z);
    if (len < EPSILON) {
      this.identity();
      return this;
    }
    const invLen = 1 / len;
    const x = axis.x * invLen, y = axis.y * invLen, z = axis.z * invLen;
    const tx = t * x, ty = t * y, tz = t * z;
    this.identity();
    this[0] = tx * x + c;
    this[1] = tx * y + s * z;
    this[2] = tx * z - s * y;
    this[4] = ty * x - s * z;
    this[5] = ty * y + c;
    this[6] = ty * z + s * x;
    this[8] = tz * x + s * y;
    this[9] = tz * y - s * x;
    this[10] = tz * z + c;
    return this;
  }

  /** Build from a quaternion (assumed normalized). */
  makeRotationFromQuat(q) {
    const x = q.x, y = q.y, z = q.z, w = q.w;
    const x2 = x + x, y2 = y + y, z2 = z + z;
    const xx = x * x2, xy = x * y2, xz = x * z2;
    const yy = y * y2, yz = y * z2, zz = z * z2;
    const wx = w * x2, wy = w * y2, wz = w * z2;
    this.identity();
    this[0] = 1 - (yy + zz);
    this[4] = xy - wz;
    this[8] = xz + wy;
    this[1] = xy + wz;
    this[5] = 1 - (xx + zz);
    this[9] = yz - wx;
    this[2] = xz - wy;
    this[6] = yz + wx;
    this[10] = 1 - (xx + yy);
    return this;
  }

  /** TRS compose: translation * rotation * scale. */
  compose(position, quaternion, scale) {
    const te = this;
    const x = quaternion.x, y = quaternion.y, z = quaternion.z, w = quaternion.w;
    const x2 = x + x, y2 = y + y, z2 = z + z;
    const xx = x * x2, xy = x * y2, xz = x * z2;
    const yy = y * y2, yz = y * z2, zz = z * z2;
    const wx = w * x2, wy = w * y2, wz = w * z2;

    const sx = scale.x, sy = scale.y, sz = scale.z;

    te[0] = (1 - (yy + zz)) * sx;
    te[4] = (xy - wz) * sy;
    te[8] = (xz + wy) * sz;

    te[1] = (xy + wz) * sx;
    te[5] = (1 - (xx + zz)) * sy;
    te[9] = (yz - wx) * sz;

    te[2] = (xz - wy) * sx;
    te[6] = (yz + wx) * sy;
    te[10] = (1 - (xx + yy)) * sz;

    te[3] = 0;
    te[7] = 0;
    te[11] = 0;
    te[12] = position.x;
    te[13] = position.y;
    te[14] = position.z;
    te[15] = 1;
    return this;
  }

  /** Decompose TRS (returns false on failure). Inverse of compose(). */
  decompose(position, quaternion, scale) {
    const te = this;
    let sx = Math.hypot(te[0], te[1], te[2]);
    const det = this.determinant();
    if (det < 0) sx = -sx;
    position.set(te[12], te[13], te[14]);

    const invSX = 1 / sx;
    const m = _t;
    m.set(te);
    // Normalize only the first column; the other columns keep their lengths.
    m[0] *= invSX; m[1] *= invSX; m[2] *= invSX;
    const sy = Math.hypot(m[4], m[5], m[6]);
    const invSY = 1 / sy;
    m[4] *= invSY; m[5] *= invSY; m[6] *= invSY;
    const sz = Math.hypot(m[8], m[9], m[10]);
    const invSZ = 1 / sz;
    m[8] *= invSZ; m[9] *= invSZ; m[10] *= invSZ;

    // Extract rotation from the scale-free matrix.
    _rot.set(m);
    quaternion.setFromRotationMatrix(_rot);
    scale.set(sx, sy, sz);
    return true;
  }

  /** Perspective projection (column-major). */
  makePerspective(fovY, aspect, near, far) {
    const f = 1 / Math.tan(fovY / 2);
    const nf = 1 / (near - far);
    this.identity();
    this[0] = f / aspect;
    this[5] = f;
    this[10] = (far + near) * nf;
    this[11] = -1;
    this[14] = 2 * far * near * nf;
    this[15] = 0;
    return this;
  }

  /** Orthographic projection (column-major). */
  makeOrthographic(left, right, top, bottom, near, far) {
    const w = right - left;
    const h = top - bottom;
    const d = far - near;
    this.identity();
    this[0] = 2 / w;
    this[5] = 2 / h;
    this[10] = -2 / d;
    this[12] = -(right + left) / w;
    this[13] = -(top + bottom) / h;
    this[14] = -near / d;
    return this;
  }

  /** View matrix: world → camera space. */
  makeLookAt(eye, target, up) {
    const z = _v1.copy(eye).sub(target).normalize();
    const x = _v2.copy(up).cross(z).normalize();
    const y = _v3.copy(z).cross(x);
    this.identity();
    this[0] = x.x;
    this[4] = x.y;
    this[8] = x.z;
    this[1] = y.x;
    this[5] = y.y;
    this[9] = y.z;
    this[2] = z.x;
    this[6] = z.y;
    this[10] = z.z;
    this[12] = -(x.dot(eye));
    this[13] = -(y.dot(eye));
    this[14] = -(z.dot(eye));
    return this;
  }

  /** Transform a point (w=1) by this matrix, into out. */
  transformPoint(v, out = new Vec3()) {
    const x = v.x, y = v.y, z = v.z;
    const e = this;
    const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
    out.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
    out.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
    out.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
    return out;
  }

  /** Transform a direction (w=0) by this matrix, into out. */
  transformDirection(v, out = new Vec3()) {
    const x = v.x, y = v.y, z = v.z;
    const e = this;
    out.x = e[0] * x + e[4] * y + e[8] * z;
    out.y = e[1] * x + e[5] * y + e[9] * z;
    out.z = e[2] * x + e[6] * y + e[10] * z;
    return out;
  }

  /** Extract translation as a Vec3. */
  getTranslation(out = new Vec3()) {
    return out.set(this[12], this[13], this[14]);
  }

  getForward(out = new Vec3()) {
    return out.set(-this[8], -this[9], -this[10]);
  }

  getRight(out = new Vec3()) {
    return out.set(this[0], this[1], this[2]);
  }

  getUp(out = new Vec3()) {
    return out.set(this[4], this[5], this[6]);
  }

  equalsApprox(m, eps = EPSILON) {
    for (let i = 0; i < 16; i++) {
      if (Math.abs(this[i] - m[i]) > eps) return false;
    }
    return true;
  }

  toString() {
    const r = (i) => this[i].toFixed(3);
    return `Mat4(\n  ${r(0)} ${r(4)} ${r(8)} ${r(12)}\n  ${r(1)} ${r(5)} ${r(9)} ${r(13)}\n  ${r(2)} ${r(6)} ${r(10)} ${r(14)}\n  ${r(3)} ${r(7)} ${r(11)} ${r(15)}\n)`;
  }

  static identity() { return new Mat4().identity(); }
  static translation(x, y, z) { return new Mat4().makeTranslation(x, y, z); }
  static scale(x, y, z) { return new Mat4().makeScale(x, y, z); }
  static rotationX(t) { return new Mat4().makeRotationX(t); }
  static rotationY(t) { return new Mat4().makeRotationY(t); }
  static rotationZ(t) { return new Mat4().makeRotationZ(t); }
  static rotationAxis(axis, t) { return new Mat4().makeRotationAxis(axis, t); }
  static rotationFromQuat(q) { return new Mat4().makeRotationFromQuat(q); }
  static perspective(fovY, aspect, near, far) { return new Mat4().makePerspective(fovY, aspect, near, far); }
  static orthographic(l, r, t, b, n, f) { return new Mat4().makeOrthographic(l, r, t, b, n, f); }
  static lookAt(eye, target, up) { return new Mat4().makeLookAt(eye, target, up); }
}

const _v1 = new Vec3();
const _v2 = new Vec3();
const _v3 = new Vec3();
const _rot = new Mat4();

/** 3x3 matrix from the top-left of a Mat4 (for normal transforms). */
export function mat3FromMat4(m, out = new Float32Array(9)) {
  out[0] = m[0]; out[1] = m[1]; out[2] = m[2];
  out[3] = m[4]; out[4] = m[5]; out[5] = m[6];
  out[6] = m[8]; out[7] = m[9]; out[8] = m[10];
  return out;
}

/**
 * Inverse-transpose of the 3x3 part (normal matrix), returned in the order a
 * GLSL `mat3(uNormalMatrix) * normal` expects (column-major GLSL storage).
 * Returns null if singular.
 */
export function normalMatrix(m, out = new Float32Array(9)) {
  // 3x3 part read from Mat4's column-major layout:
  //   row-major M = [[a, d, g], [b, e, h], [c, f, i]]
  const a = m[0], b = m[1], c = m[2];
  const d = m[4], e = m[5], f = m[6];
  const g = m[8], h = m[9], i = m[10];
  const det = a * (e * i - f * h) - d * (b * i - c * h) + g * (b * f - c * e);
  if (det === 0) return null;
  const inv = 1 / det;
  // N = (M^-1)^T, stored so that GLSL mat3(N) * v == N_rowmajor * v.
  out[0] = (e * i - f * h) * inv;
  out[1] = (f * g - d * i) * inv;
  out[2] = (d * h - e * g) * inv;
  out[3] = (c * h - b * i) * inv;
  out[4] = (a * i - c * g) * inv;
  out[5] = (b * g - a * h) * inv;
  out[6] = (b * f - c * e) * inv;
  out[7] = (c * d - a * f) * inv;
  out[8] = (a * e - b * d) * inv;
  return out;
}
