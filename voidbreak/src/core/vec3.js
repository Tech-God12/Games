/**
 * VOIDBREAK — Vec3 (3D vector).
 *
 * Mutable, chainable class with static factory helpers. Methods mutate `this`
 * and return `this` to support chaining without allocation in hot paths.
 * All pure math — unit tested in tests/math.test.js.
 */

import { EPSILON } from './constants.js';

export class Vec3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  set(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  setScalar(s) {
    this.x = s;
    this.y = s;
    this.z = s;
    return this;
  }

  copy(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }

  clone() {
    return new Vec3(this.x, this.y, this.z);
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }

  addScaled(v, s) {
    this.x += v.x * s;
    this.y += v.y * s;
    this.z += v.z * s;
    return this;
  }

  addScalar(s) {
    this.x += s;
    this.y += s;
    this.z += s;
    return this;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  }

  subScaled(v, s) {
    this.x -= v.x * s;
    this.y -= v.y * s;
    this.z -= v.z * s;
    return this;
  }

  mul(v) {
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;
    return this;
  }

  mulScalar(s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
    return this;
  }

  div(v) {
    this.x /= v.x;
    this.y /= v.y;
    this.z /= v.z;
    return this;
  }

  divScalar(s) {
    return this.mulScalar(1 / s);
  }

  negate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }

  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  length() {
    return Math.sqrt(this.lengthSq());
  }

  /** Distance to another vector. */
  distanceTo(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    const dz = this.z - v.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  distanceToSq(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    const dz = this.z - v.z;
    return dx * dx + dy * dy + dz * dz;
  }

  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }

  /** Normalize in place; returns zero vector untouched when length ~ 0. */
  normalize() {
    const len = this.length();
    if (len < EPSILON) {
      this.setScalar(0);
      return this;
    }
    return this.divScalar(len);
  }

  /** Normalize, or fall back to a provided direction when length ~ 0. */
  normalizeOr(fallbackX, fallbackY, fallbackZ) {
    const len = this.length();
    if (len < EPSILON) {
      this.set(fallbackX, fallbackY, fallbackZ);
      return this;
    }
    return this.divScalar(len);
  }

  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  cross(v) {
    const { x, y, z } = this;
    this.x = y * v.z - z * v.y;
    this.y = z * v.x - x * v.z;
    this.z = x * v.y - y * v.x;
    return this;
  }

  /** cross(this, v) written into out (no self mutation). */
  crossInto(v, out) {
    out.x = this.y * v.z - this.z * v.y;
    out.y = this.z * v.x - this.x * v.z;
    out.z = this.x * v.y - this.y * v.x;
    return out;
  }

  /** Reflect this vector about a normal. */
  reflect(n) {
    const d = 2 * this.dot(n);
    this.x -= d * n.x;
    this.y -= d * n.y;
    this.z -= d * n.z;
    return this;
  }

  /** Project this onto v. */
  projectOn(v) {
    const lenSq = v.lengthSq();
    if (lenSq < EPSILON) return this.setScalar(0);
    const s = this.dot(v) / lenSq;
    return this.copy(v).mulScalar(s);
  }

  /** Reject this from v (component perpendicular to v). */
  rejectOn(v) {
    const proj = this.projectOn(v);
    this.sub(proj);
    return this;
  }

  lerp(v, t) {
    this.x += (v.x - this.x) * t;
    this.y += (v.y - this.y) * t;
    this.z += (v.z - this.z) * t;
    return this;
  }

  /** Linear interpolation between two vectors written into out. */
  static lerpVectors(a, b, t, out = new Vec3()) {
    return out.set(
      a.x + (b.x - a.x) * t,
      a.y + (b.y - a.y) * t,
      a.z + (b.z - a.z) * t,
    );
  }

  /** Spherical linear interpolation between two unit vectors. */
  slerp(a, b, t) {
    const dot = clampDot(a.x * b.x + a.y * b.y + a.z * b.z, -1, 1);
    if (dot > 0.9995) {
      return this.lerpVectors(a, b, t).normalize();
    }
    const theta = Math.acos(dot);
    const sinT = Math.sin(theta);
    const wa = Math.sin((1 - t) * theta) / sinT;
    const wb = Math.sin(t * theta) / sinT;
    return this.set(
      a.x * wa + b.x * wb,
      a.y * wa + b.y * wb,
      a.z * wa + b.z * wb,
    ).normalize();
  }

  /** Rotate this vector about an axis through the origin by angle (radians). */
  applyAxisAngle(axis, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const t = 1 - c;
    const { x, y, z } = this;
    const ax = axis.x, ay = axis.y, az = axis.z;
    this.x = (c + t * ax * ax) * x + (t * ax * ay - s * az) * y + (t * ax * az + s * ay) * z;
    this.y = (t * ay * ax + s * az) * x + (c + t * ay * ay) * y + (t * ay * az - s * ax) * z;
    this.z = (t * az * ax - s * ay) * x + (t * az * ay + s * ax) * y + (c + t * az * az) * z;
    return this;
  }

  min(v) {
    this.x = Math.min(this.x, v.x);
    this.y = Math.min(this.y, v.y);
    this.z = Math.min(this.z, v.z);
    return this;
  }

  max(v) {
    this.x = Math.max(this.x, v.x);
    this.y = Math.max(this.y, v.y);
    this.z = Math.max(this.z, v.z);
    return this;
  }

  clampScalar(min, max) {
    this.x = Math.min(Math.max(this.x, min), max);
    this.y = Math.min(Math.max(this.y, min), max);
    this.z = Math.min(Math.max(this.z, min), max);
    return this;
  }

  clampLength(maxLen) {
    const len = this.length();
    if (len > maxLen) {
      return this.divScalar(len).mulScalar(maxLen);
    }
    return this;
  }

  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);
    return this;
  }

  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);
    return this;
  }

  abs() {
    this.x = Math.abs(this.x);
    this.y = Math.abs(this.y);
    this.z = Math.abs(this.z);
    return this;
  }

  equalsApprox(v, eps = EPSILON) {
    return (
      Math.abs(this.x - v.x) <= eps &&
      Math.abs(this.y - v.y) <= eps &&
      Math.abs(this.z - v.z) <= eps
    );
  }

  equals(v) {
    return this.x === v.x && this.y === v.y && this.z === v.z;
  }

  isZero(eps = EPSILON) {
    return this.lengthSq() <= eps * eps;
  }

  isFinite() {
    return Number.isFinite(this.x) && Number.isFinite(this.y) && Number.isFinite(this.z);
  }

  angleTo(v) {
    const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
    if (denominator < EPSILON) return 0;
    const dot = Math.min(Math.max(this.dot(v) / denominator, -1), 1);
    return Math.acos(dot);
  }

  toArray(out = [0, 0, 0]) {
    out[0] = this.x;
    out[1] = this.y;
    out[2] = this.z;
    return out;
  }

  toString() {
    return `Vec3(${this.x.toFixed(3)}, ${this.y.toFixed(3)}, ${this.z.toFixed(3)})`;
  }

  static zero() { return new Vec3(0, 0, 0); }
  static one() { return new Vec3(1, 1, 1); }
  static up() { return new Vec3(0, 1, 0); }
  static down() { return new Vec3(0, -1, 0); }
  static right() { return new Vec3(1, 0, 0); }
  static left() { return new Vec3(-1, 0, 0); }
  static forward() { return new Vec3(0, 0, -1); }
  static back() { return new Vec3(0, 0, 1); }

  static add(a, b, out = new Vec3()) {
    return out.set(a.x + b.x, a.y + b.y, a.z + b.z);
  }

  static sub(a, b, out = new Vec3()) {
    return out.set(a.x - b.x, a.y - b.y, a.z - b.z);
  }

  static mulScalar(a, s, out = new Vec3()) {
    return out.set(a.x * s, a.y * s, a.z * s);
  }

  static cross(a, b, out = new Vec3()) {
    out.x = a.y * b.z - a.z * b.y;
    out.y = a.z * b.x - a.x * b.z;
    out.z = a.x * b.y - a.y * b.x;
    return out;
  }

  static dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }

  static distance(a, b) {
    return a.distanceTo(b);
  }

  static distanceSq(a, b) {
    return a.distanceToSq(b);
  }

  /** Direction from a to b (normalized). */
  static direction(a, b, out = new Vec3()) {
    return out.copy(b).sub(a).normalize();
  }

  static min(a, b, out = new Vec3()) {
    return out.set(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
  }

  static max(a, b, out = new Vec3()) {
    return out.set(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
  }
}

function clampDot(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}

export const ZERO = new Vec3(0, 0, 0);
export const UP = new Vec3(0, 1, 0);
export const DOWN = new Vec3(0, -1, 0);
export const RIGHT = new Vec3(1, 0, 0);
export const LEFT = new Vec3(-1, 0, 0);
export const FORWARD = new Vec3(0, 0, -1);
export const BACK = new Vec3(0, 0, 1);
