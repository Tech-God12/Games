/**
 * VOIDBREAK — Decals.
 *
 * Flat quads laid on surfaces (floor scorches, wall splats). Managed as a
 * pool of transforms; the geometry buffer is rebuilt only when the set
 * changes (dirty flag), keeping the per-frame cost near zero.
 */

import { ShaderProgram } from './program.js';
import { DECAL_VERT, DECAL_FRAG } from './shaderlib.js';
import { Quat } from '../core/quat.js';
import { Mat4 } from '../core/mat4.js';
import { MAX_DECALS } from '../core/constants.js';
import { texScorch } from './canvas_textures.js';

const VERTS_PER_DECAL = 4;

export class DecalSystem {
  /**
   * @param {import('./gl.js').GL} gl
   * @param {import('./texture.js').TextureCache} textures
   * @param {number} [capacity]
   */
  constructor(gl, textures, capacity = MAX_DECALS) {
    this.gl = gl;
    this.textures = textures;
    this.capacity = capacity;
    this.count = 0;
    this.dirty = true;

    this.x = new Float32Array(capacity);
    this.y = new Float32Array(capacity);
    this.z = new Float32Array(capacity);
    this.nx = new Float32Array(capacity);
    this.ny = new Float32Array(capacity);
    this.nz = new Float32Array(capacity);
    this.size = new Float32Array(capacity);
    this.rot = new Float32Array(capacity);
    this.cr = new Float32Array(capacity);
    this.cg = new Float32Array(capacity);
    this.cb = new Float32Array(capacity);
    this.ca = new Float32Array(capacity);
    this.texId = new Uint8Array(capacity);
    this.life = new Float32Array(capacity);
    this.maxLife = new Float32Array(capacity);
    this.active = new Uint8Array(capacity);

    const g = gl.raw;
    this.vertFloats = capacity * VERTS_PER_DECAL * 9;
    this.vbo = g.createBuffer();
    g.bindBuffer(g.ARRAY_BUFFER, this.vbo);
    g.bufferData(g.ARRAY_BUFFER, this.vertFloats * 4, g.DYNAMIC_DRAW);
    this.ibo = g.createBuffer();
    g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, this.ibo);
    const idx = new Uint16Array(capacity * 6);
    for (let i = 0; i < capacity; i++) {
      const b = i * VERTS_PER_DECAL;
      idx[i * 6] = b;
      idx[i * 6 + 1] = b + 1;
      idx[i * 6 + 2] = b + 2;
      idx[i * 6 + 3] = b;
      idx[i * 6 + 4] = b + 2;
      idx[i * 6 + 5] = b + 3;
    }
    g.bufferData(g.ELEMENT_ARRAY_BUFFER, idx, g.STATIC_DRAW);

    this.vao = g.createVertexArray();
    g.bindVertexArray(this.vao);
    g.bindBuffer(g.ARRAY_BUFFER, this.vbo);
    const stride = 9 * 4;
    g.enableVertexAttribArray(0);
    g.vertexAttribPointer(0, 3, g.FLOAT, false, stride, 0);
    g.enableVertexAttribArray(2);
    g.vertexAttribPointer(2, 2, g.FLOAT, false, stride, 12);
    g.enableVertexAttribArray(3);
    g.vertexAttribPointer(3, 4, g.FLOAT, false, stride, 20);
    g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, this.ibo);
    g.bindVertexArray(null);

    this.program = new ShaderProgram(gl, DECAL_VERT, DECAL_FRAG, null, 'decals');

    this.texSlots = [];
    this.texKeyToId = new Map();
    this._quat = new Quat();
    this._mat = new Mat4().identity();
  }

  registerTexture(key, factory) {
    let id = this.texKeyToId.get(key);
    if (id !== undefined) return id;
    id = this.texSlots.length;
    this.texSlots.push({ key, tex: this.textures.get(key, factory, { mipmaps: false }) });
    this.texKeyToId.set(key, id);
    return id;
  }

  /**
   * Add a decal at a point oriented to a surface normal.
   */
  add(o) {
    if (this.count >= this.capacity) {
      this.count--;
      for (let i = 0; i < this.count; i++) this._copy(i, i + 1);
    }
    const i = this.count++;
    this.x[i] = o.x;
    this.y[i] = o.y + 0.012;
    this.z[i] = o.z;
    const len = Math.hypot(o.nx ?? 0, o.ny ?? 1, o.nz ?? 0) || 1;
    this.nx[i] = (o.nx ?? 0) / len;
    this.ny[i] = (o.ny ?? 1) / len;
    this.nz[i] = (o.nz ?? 0) / len;
    this.size[i] = o.size ?? 0.5;
    this.rot[i] = o.rot ?? 0;
    const c = o.color ?? [0, 0, 0, 0.85];
    this.cr[i] = c[0]; this.cg[i] = c[1]; this.cb[i] = c[2]; this.ca[i] = c[3] ?? 0.85;
    this.texId[i] = this.registerTexture(o.texture ?? 'scorch', () => texScorch(128, 0));
    this.life[i] = o.life ?? Infinity;
    this.maxLife[i] = this.life[i];
    this.active[i] = 1;
    this.dirty = true;
  }

  _copy(dst, src) {
    this.x[dst] = this.x[src]; this.y[dst] = this.y[src]; this.z[dst] = this.z[src];
    this.nx[dst] = this.nx[src]; this.ny[dst] = this.ny[src]; this.nz[dst] = this.nz[src];
    this.size[dst] = this.size[src]; this.rot[dst] = this.rot[src];
    this.cr[dst] = this.cr[src]; this.cg[dst] = this.cg[src]; this.cb[dst] = this.cb[src]; this.ca[dst] = this.ca[src];
    this.texId[dst] = this.texId[src];
    this.life[dst] = this.life[src]; this.maxLife[dst] = this.maxLife[src];
    this.active[dst] = this.active[src];
  }

  update(dt) {
    let anyExpired = false;
    for (let i = 0; i < this.count; i++) {
      if (this.life[i] !== Infinity) {
        this.life[i] -= dt;
        if (this.life[i] <= 0) {
          this.active[i] = 0;
          anyExpired = true;
        }
      }
    }
    if (anyExpired) {
      let w = 0;
      for (let i = 0; i < this.count; i++) {
        if (this.active[i]) {
          if (w !== i) this._copy(w, i);
          w++;
        }
      }
      this.count = w;
      this.dirty = true;
    }
  }

  _rebuild() {
    const g = this.gl.raw;
    const data = new Float32Array(this.count * VERTS_PER_DECAL * 9);
    let o = 0;
    for (let i = 0; i < this.count; i++) {
      const s = this.size[i] * 0.5;
      const c = Math.cos(this.rot[i]);
      const si = Math.sin(this.rot[i]);
      this._quat.setFromDirection({ x: this.nx[i], y: this.ny[i], z: this.nz[i] });
      this._mat.compose({ x: this.x[i], y: this.y[i], z: this.z[i] }, this._quat, { x: s, y: s, z: 1 });

      const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
      for (let v = 0; v < VERTS_PER_DECAL; v++) {
        const [cx, cy] = corners[v];
        const rx = cx * c - cy * si;
        const ry = cx * si + cy * c;
        data[o++] = this._mat[0] * rx + this._mat[4] * ry + this._mat[12];
        data[o++] = this._mat[1] * rx + this._mat[5] * ry + this._mat[13];
        data[o++] = this._mat[2] * rx + this._mat[6] * ry + this._mat[14];
        data[o++] = v === 0 ? 0 : v === 1 ? 1 : v === 2 ? 1 : 0;
        data[o++] = v < 2 ? 0 : 1;
        data[o++] = this.cr[i];
        data[o++] = this.cg[i];
        data[o++] = this.cb[i];
        data[o++] = this.ca[i];
      }
    }
    g.bindBuffer(g.ARRAY_BUFFER, this.vbo);
    g.bufferSubData(g.ARRAY_BUFFER, 0, data);
    this.dirty = false;
  }

  render(viewProj) {
    if (this.count === 0) return;
    if (this.dirty) this._rebuild();
    const g = this.gl.raw;
    g.enable(g.BLEND);
    g.blendFunc(g.SRC_ALPHA, g.ONE_MINUS_SRC_ALPHA);
    g.depthMask(false);
    g.enable(g.POLYGON_OFFSET_FILL);
    g.polygonOffset(-1, -1);

    const P = this.program;
    P.use();
    P.setMat4('uViewProj', viewProj);

    g.bindVertexArray(this.vao);
    let start = 0;
    let curTex = this.texId[0];
    for (let i = 1; i <= this.count; i++) {
      const t = i < this.count ? this.texId[i] : -1;
      if (t !== curTex) {
        this.texSlots[curTex].tex.bind(0);
        P.set1i('uTex', 0);
        g.drawElements(g.TRIANGLES, (i - start) * 6, g.UNSIGNED_SHORT, start * 6 * 2);
        start = i;
        curTex = t;
      }
    }
    g.bindVertexArray(null);
    g.disable(g.POLYGON_OFFSET_FILL);
    g.depthMask(true);
    g.disable(g.BLEND);
  }

  clear() {
    this.count = 0;
    this.dirty = true;
  }

  dispose() {
    const g = this.gl.raw;
    g.deleteBuffer(this.vbo);
    g.deleteBuffer(this.ibo);
    g.deleteVertexArray(this.vao);
    this.program.dispose();
  }
}
