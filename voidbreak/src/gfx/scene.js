/**
 * VOIDBREAK — RenderObject & Scene.
 *
 * RenderObject: a positioned instance of a Mesh + Material + model matrix.
 * Scene: owns lists of render objects (static world, dynamic entities) and
 * builds a per-frame render list with frustum culling and sorting.
 */

import { Mat4 } from '../core/mat4.js';
import { Vec3 } from '../core/vec3.js';
import { Quat } from '../core/quat.js';
import { Sphere } from '../core/geometry.js';

export class RenderObject {
  constructor(mesh, material, opts = {}) {
    this.mesh = mesh;
    this.material = material;
    this.position = new Vec3(0, 0, 0);
    this.quaternion = new Quat().identity();
    this.scale = new Vec3(1, 1, 1);
    this.visible = opts.visible ?? true;
    this.castShadow = opts.castShadow ?? (material?.castShadow ?? true);
    this.receiveShadow = opts.receiveShadow ?? (material?.receiveShadow ?? true);
    this.userData = opts.userData ?? null;
    this._matrix = new Mat4().identity();
    this._matrixDirty = true;
    this._bounds = new Sphere(new Vec3(), 0);
    this._boundsRadius = opts.boundsRadius ?? this._estimateRadius(mesh);
    this.layer = opts.layer ?? 0;
    this.renderOrder = opts.renderOrder ?? 0;
  }

  _estimateRadius(mesh) {
    if (!mesh || !mesh.geometryBounds) return 1;
    return mesh.geometryBounds;
  }

  setPosition(x, y, z) {
    this.position.set(x, y, z);
    this._matrixDirty = true;
    return this;
  }

  copyPosition(v) {
    this.position.copy(v);
    this._matrixDirty = true;
    return this;
  }

  setScale(x, y, z) {
    this.scale.set(x, y, z);
    this._matrixDirty = true;
    return this;
  }

  setQuaternion(q) {
    this.quaternion.copy(q);
    this._matrixDirty = true;
    return this;
  }

  /** Get (and lazily compute) the model matrix. */
  matrix() {
    if (this._matrixDirty) {
      this._matrix.compose(this.position, this.quaternion, this.scale);
      this._matrixDirty = false;
    }
    return this._matrix;
  }

  /** World-space bounding sphere (center from position, radius approx). */
  bounds() {
    this._bounds.center.copy(this.position);
    const s = Math.max(this.scale.x, Math.max(this.scale.y, this.scale.z));
    this._bounds.radius = this._boundsRadius * s;
    return this._bounds;
  }
}

/**
 * Scene: containers of render objects with shadow flags and a static/dynamic
 * split.
 */
export class Scene {
  constructor() {
    this.static = [];
    this.dynamic = [];
  }

  addStatic(obj) {
    this.static.push(obj);
    return obj;
  }

  addDynamic(obj) {
    this.dynamic.push(obj);
    return obj;
  }

  remove(obj) {
    const si = this.static.indexOf(obj);
    if (si >= 0) {
      this.static.splice(si, 1);
      return true;
    }
    const di = this.dynamic.indexOf(obj);
    if (di >= 0) {
      this.dynamic.splice(di, 1);
      return true;
    }
    return false;
  }

  removeAll() {
    this.static.length = 0;
    this.dynamic.length = 0;
  }

  /**
   * Build a render list: visible objects sorted into opaque and transparent.
   */
  buildRenderList(frustum) {
    const opaque = [];
    const transparent = [];
    const collect = (arr) => {
      for (const obj of arr) {
        if (!obj.visible) continue;
        const b = obj.bounds();
        if (!frustum.intersectsSphere(b.center, b.radius)) continue;
        const mat = obj.material;
        if (mat.blend !== null) {
          transparent.push(obj);
        } else {
          opaque.push(obj);
        }
      }
    };
    collect(this.static);
    collect(this.dynamic);

    opaque.sort((a, b) => {
      const ka = (a.material.texture ?? '') + '|' + (a.material.unlit ? 1 : 0) + '|' + (a.material.blend ?? '');
      const kb = (b.material.texture ?? '') + '|' + (b.material.unlit ? 1 : 0) + '|' + (b.material.blend ?? '');
      if (ka !== kb) return ka < kb ? -1 : 1;
      return a.renderOrder - b.renderOrder;
    });
    transparent.sort((a, b) => b.position.z - a.position.z);
    return { opaque, transparent };
  }
}
