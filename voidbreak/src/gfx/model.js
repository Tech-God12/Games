/**
 * VOIDBREAK — Model.
 *
 * A model is a tree of named parts, each a RenderObject with a local
 * transform relative to the model root. Used for composite characters
 * (enemy bodies made of boxes, viewmodel weapons, bosses) and for reusable
 * arena props. Parts can be individually hidden / recolored / animated.
 */

import { Mat4 } from '../core/mat4.js';
import { Vec3 } from '../core/vec3.js';
import { Quat } from '../core/quat.js';

export class ModelPart {
  constructor(renderObject, opts = {}) {
    this.obj = renderObject;
    this.name = opts.name ?? 'part';
    this.position = new Vec3(0, 0, 0);
    if (opts.position) this.position.copy(opts.position);
    this.quaternion = new Quat().identity();
    if (opts.quaternion) this.quaternion.copy(opts.quaternion);
    this.scale = new Vec3(1, 1, 1);
    if (opts.scale) this.scale.copy(opts.scale);
    this._matrix = new Mat4().identity();
    this._dirty = true;
    this.visible = opts.visible ?? true;
    this.tint = null;
  }

  /** Local matrix (relative to model root). */
  matrix() {
    if (this._dirty) {
      this._matrix.compose(this.position, this.quaternion, this.scale);
      this._dirty = false;
    }
    return this._matrix;
  }

  setPosition(x, y, z) {
    this.position.set(x, y, z);
    this._dirty = true;
    return this;
  }

  setQuaternion(q) {
    this.quaternion.copy(q);
    this._dirty = true;
    return this;
  }

  setScale(x, y, z) {
    this.scale.set(x, y, z);
    this._dirty = true;
    return this;
  }

  setVisible(v) {
    this.visible = v;
    return this;
  }
}

export class Model {
  /**
   * @param {import('./gl.js').GL} gl
   * @param {object} [opts]
   * @param {string} [opts.name]
   */
  constructor(gl, opts = {}) {
    this.gl = gl;
    this.name = opts.name ?? 'model';
    /** @type {Map<string, ModelPart>} */
    this.parts = new Map();
    this.position = new Vec3(0, 0, 0);
    this.quaternion = new Quat().identity();
    this.scale = new Vec3(1, 1, 1);
    this.visible = true;
    this._root = new Mat4().identity();
    this._dirty = true;
    this.castShadow = opts.castShadow ?? true;
  }

  /** Add a part from an existing RenderObject (adopts it). */
  addPart(name, obj, opts = {}) {
    const part = new ModelPart(obj, { name, ...opts });
    this.parts.set(name, part);
    return part;
  }

  get(name) {
    return this.parts.get(name);
  }

  getObject(name) {
    return this.parts.get(name)?.obj ?? null;
  }

  has(name) {
    return this.parts.has(name);
  }

  setPosition(x, y, z) {
    this.position.set(x, y, z);
    this._dirty = true;
    return this;
  }

  copyPosition(v) {
    this.position.copy(v);
    this._dirty = true;
    return this;
  }

  setQuaternion(q) {
    this.quaternion.copy(q);
    this._dirty = true;
    return this;
  }

  setScale(x, y, z) {
    this.scale.set(x, y, z);
    this._dirty = true;
    return this;
  }

  setVisible(v) {
    this.visible = v;
    for (const part of this.parts.values()) {
      part.obj.visible = v && part.visible;
    }
    return this;
  }

  /** Apply a color tint to every part's material (for damage flash etc.). */
  setTint(color) {
    for (const part of this.parts.values()) {
      part.tint = color;
    }
  }

  clearTint() {
    for (const part of this.parts.values()) {
      part.tint = null;
    }
  }

  /**
   * Update each part's world matrix and visibility. Returns true if the
   * model has any visible parts.
   */
  updateWorld(force = false) {
    if (this._dirty || force) {
      this._root.compose(this.position, this.quaternion, this.scale);
      this._dirty = false;
    }
    let anyVisible = false;
    for (const part of this.parts.values()) {
      const visible = this.visible && part.visible;
      part.obj.visible = visible;
      if (visible) {
        anyVisible = true;
        const local = part.matrix();
        const world = part.obj.matrix();
        world.multiply(this._root, local);
        if (part.tint && part.obj.material) {
          part.obj.material.color.copy(part.tint);
        }
      }
    }
    return anyVisible;
  }

  /** Get all render objects (for scene management). */
  get objects() {
    return [...this.parts.values()].map((p) => p.obj);
  }
}
