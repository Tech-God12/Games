/**
 * VOIDBREAK — 2D math: Vec2, Rect, Mat2, and helpers.
 *
 * Used by the UI layer, minimap, 2D nav grids and the level generator's
 * tile maps. Pure math — unit tested.
 */

import { EPSILON } from './constants.js';

export class Vec2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  setScalar(s) {
    this.x = s;
    this.y = s;
    return this;
  }

  copy(v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  clone() {
    return new Vec2(this.x, this.y);
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  addScaled(v, s) {
    this.x += v.x * s;
    this.y += v.y * s;
    return this;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  subScaled(v, s) {
    this.x -= v.x * s;
    this.y -= v.y * s;
    return this;
  }

  mul(v) {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }

  mulScalar(s) {
    this.x *= s;
    this.y *= s;
    return this;
  }

  divScalar(s) {
    return this.mulScalar(1 / s);
  }

  negate() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }

  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }

  length() {
    return Math.sqrt(this.lengthSq());
  }

  distanceTo(v) {
    return Math.hypot(this.x - v.x, this.y - v.y);
  }

  distanceToSq(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return dx * dx + dy * dy;
  }

  normalize() {
    const len = this.length();
    if (len < EPSILON) return this.setScalar(0);
    return this.divScalar(len);
  }

  dot(v) {
    return this.x * v.x + this.y * v.y;
  }

  /** 2D cross product (z component of 3D cross). */
  cross(v) {
    return this.x * v.y - this.y * v.x;
  }

  /** Rotate 90° counter-clockwise. */
  perp() {
    const { x, y } = this;
    this.x = -y;
    this.y = x;
    return this;
  }

  /** Rotate by angle (radians). */
  rotate(angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const { x, y } = this;
    this.x = x * c - y * s;
    this.y = x * s + y * c;
    return this;
  }

  lerp(v, t) {
    this.x += (v.x - this.x) * t;
    this.y += (v.y - this.y) * t;
    return this;
  }

  angle() {
    return Math.atan2(this.y, this.x);
  }

  clampScalar(min, max) {
    this.x = Math.min(Math.max(this.x, min), max);
    this.y = Math.min(Math.max(this.y, min), max);
    return this;
  }

  isZero(eps = EPSILON) {
    return this.lengthSq() <= eps * eps;
  }

  equalsApprox(v, eps = EPSILON) {
    return Math.abs(this.x - v.x) <= eps && Math.abs(this.y - v.y) <= eps;
  }

  toString() {
    return `Vec2(${this.x.toFixed(3)}, ${this.y.toFixed(3)})`;
  }

  static zero() { return new Vec2(0, 0); }
  static one() { return new Vec2(1, 1); }
  static add(a, b, out = new Vec2()) { return out.set(a.x + b.x, a.y + b.y); }
  static sub(a, b, out = new Vec2()) { return out.set(a.x - b.x, a.y - b.y); }
  static mulScalar(a, s, out = new Vec2()) { return out.set(a.x * s, a.y * s); }
  static dot(a, b) { return a.x * b.x + a.y * b.y; }
  static distance(a, b) { return a.distanceTo(b); }
  static distanceSq(a, b) { return a.distanceToSq(b); }
}

/** Axis-aligned rectangle. */
export class Rect {
  constructor(x = 0, y = 0, w = 0, h = 0) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  set(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    return this;
  }

  copy(r) {
    return this.set(r.x, r.y, r.w, r.h);
  }

  clone() {
    return new Rect(this.x, this.y, this.w, this.h);
  }

  get left() { return this.x; }
  get right() { return this.x + this.w; }
  get top() { return this.y; }
  get bottom() { return this.y + this.h; }
  get cx() { return this.x + this.w * 0.5; }
  get cy() { return this.y + this.h * 0.5; }

  containsPoint(px, py) {
    return px >= this.x && px <= this.right && py >= this.y && py <= this.bottom;
  }

  containsVec(v) {
    return this.containsPoint(v.x, v.y);
  }

  intersects(r) {
    return !(
      r.right <= this.x || r.left >= this.right ||
      r.bottom <= this.y || r.top >= this.bottom
    );
  }

  /** Expand by `amount` on all sides. */
  inflate(amount) {
    this.x -= amount;
    this.y -= amount;
    this.w += amount * 2;
    this.h += amount * 2;
    return this;
  }

  /** Does this rect fully contain r? */
  containsRect(r) {
    return (
      r.x >= this.x && r.right <= this.right &&
      r.y >= this.y && r.bottom <= this.bottom
    );
  }

  area() {
    return this.w * this.h;
  }

  toString() {
    return `Rect(${this.x}, ${this.y}, ${this.w}x${this.h})`;
  }

  static fromCenter(cx, cy, w, h) {
    return new Rect(cx - w / 2, cy - h / 2, w, h);
  }
}

/** 2x2 matrix (column-major Float32Array(4)). */
export class Mat2 extends Float32Array {
  constructor() {
    super(4);
    this.identity();
  }

  identity() {
    this[0] = 1;
    this[1] = 0;
    this[2] = 0;
    this[3] = 1;
    return this;
  }

  makeRotation(angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    this[0] = c;
    this[1] = s;
    this[2] = -s;
    this[3] = c;
    return this;
  }

  transform(v, out = new Vec2()) {
    const x = v.x, y = v.y;
    out.x = this[0] * x + this[2] * y;
    out.y = this[1] * x + this[3] * y;
    return out;
  }
}

/** Angle utilities in 2D. */
export function angleLerp(a, b, t) {
  return a + angleDelta2(a, b) * t;
}

/** Signed shortest angle from a to b. */
export function angleDelta2(a, b) {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
}

/** Wrap angle into (-PI, PI]. */
export function wrapAngle2(a) {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a <= -Math.PI) a += Math.PI * 2;
  return a;
}

/** Direction vector (unit) from angle. */
export function fromAngle(angle, out = new Vec2()) {
  return out.set(Math.cos(angle), Math.sin(angle));
}
