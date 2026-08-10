/**
 * VOIDBREAK — ParticleSystem.
 *
 * Instanced billboard particles with CPU simulation. Parallel-array storage
 * for cache friendliness, a fixed capacity pool, several emitter helpers
 * (burst, stream, ring, shockwave, sparks, smoke), and batched instanced
 * rendering grouped by texture/blend mode.
 *
 * Particle attributes per instance: center(3) color(4) size(1) rot(1)
 * fade(1) = 10 floats. Draws 6 vertices (quad) × N instances.
 */

import { PARTICLE_VERT, PARTICLE_FRAG } from './shaderlib.js';
import { ShaderProgram } from './program.js';
import { MAX_PARTICLES } from '../core/constants.js';
import { texGlow } from './canvas_textures.js';

const ATTR_FLOATS = 10;

export class ParticleSystem {
  /**
   * @param {import('./gl.js').GL} gl
   * @param {import('./texture.js').TextureCache} textures
   * @param {number} [capacity]
   */
  constructor(gl, textures, capacity = MAX_PARTICLES) {
    this.gl = gl;
    this.textures = textures;
    this.capacity = capacity;
    this.count = 0;
    this.time = 0;

    this.px = new Float32Array(capacity);
    this.py = new Float32Array(capacity);
    this.pz = new Float32Array(capacity);
    this.vx = new Float32Array(capacity);
    this.vy = new Float32Array(capacity);
    this.vz = new Float32Array(capacity);
    this.grav = new Float32Array(capacity);
    this.drag = new Float32Array(capacity);
    this.life = new Float32Array(capacity);
    this.maxLife = new Float32Array(capacity);
    this.size = new Float32Array(capacity);
    this.sizeEnd = new Float32Array(capacity);
    this.rot = new Float32Array(capacity);
    this.rotSpeed = new Float32Array(capacity);
    this.cr = new Float32Array(capacity);
    this.cg = new Float32Array(capacity);
    this.cb = new Float32Array(capacity);
    this.ca = new Float32Array(capacity);
    this.er = new Float32Array(capacity);
    this.eg = new Float32Array(capacity);
    this.eb = new Float32Array(capacity);
    this.tex = new Uint8Array(capacity);
    this.blend = new Uint8Array(capacity);
    this.grounded = new Uint8Array(capacity);
    this.fadeIn = new Float32Array(capacity);

    this.instData = new Float32Array(capacity * ATTR_FLOATS);

    const g = gl.raw;
    this.quadVbo = g.createBuffer();
    g.bindBuffer(g.ARRAY_BUFFER, this.quadVbo);
    const quad = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1, 1, -1, -1, 1]);
    g.bufferData(g.ARRAY_BUFFER, quad, g.STATIC_DRAW);

    this.instVbo = g.createBuffer();
    g.bindBuffer(g.ARRAY_BUFFER, this.instVbo);
    g.bufferData(g.ARRAY_BUFFER, this.instData.byteLength, g.DYNAMIC_DRAW);

    this.vao = g.createVertexArray();
    g.bindVertexArray(this.vao);
    g.bindBuffer(g.ARRAY_BUFFER, this.quadVbo);
    g.enableVertexAttribArray(0);
    g.vertexAttribPointer(0, 2, g.FLOAT, false, 8, 0);
    g.bindBuffer(g.ARRAY_BUFFER, this.instVbo);
    const stride = ATTR_FLOATS * 4;
    let off = 0;
    g.enableVertexAttribArray(1);
    g.vertexAttribPointer(1, 3, g.FLOAT, false, stride, off); off += 12;
    g.enableVertexAttribArray(2);
    g.vertexAttribPointer(2, 4, g.FLOAT, false, stride, off); off += 16;
    g.enableVertexAttribArray(3);
    g.vertexAttribPointer(3, 1, g.FLOAT, false, stride, off); off += 4;
    g.enableVertexAttribArray(4);
    g.vertexAttribPointer(4, 1, g.FLOAT, false, stride, off); off += 4;
    g.enableVertexAttribArray(5);
    g.vertexAttribPointer(5, 1, g.FLOAT, false, stride, off); off += 4;
    g.vertexAttribDivisor(1, 1);
    g.vertexAttribDivisor(2, 1);
    g.vertexAttribDivisor(3, 1);
    g.vertexAttribDivisor(4, 1);
    g.vertexAttribDivisor(5, 1);
    g.bindVertexArray(null);

    this.program = new ShaderProgram(gl, PARTICLE_VERT, PARTICLE_FRAG, null, 'particles');

    this.texSlots = [];
    this.texKeyToId = new Map();
    this.batches = [];
  }

  /** Register a particle texture and return its slot id. */
  registerTexture(key, factory) {
    let id = this.texKeyToId.get(key);
    if (id !== undefined) return id;
    id = this.texSlots.length;
    this.texSlots.push({ key, tex: this.textures.get(key, factory, { mipmaps: false }) });
    this.texKeyToId.set(key, id);
    return id;
  }

  // ------------------------------------------------------------ spawning

  /**
   * Spawn a burst of particles.
   */
  burst(o) {
    const n = Math.min(o.count ?? 10, this.capacity - this.count);
    for (let i = 0; i < n; i++) {
      const idx = this._alloc();
      if (idx < 0) break;
      const life = o.life ?? 0.6;
      this.px[idx] = o.x; this.py[idx] = o.y; this.pz[idx] = o.z;
      let dx = o.dirX ?? 0, dy = o.dirY ?? 1, dz = o.dirZ ?? 0;
      const spread = o.spread ?? 0.3;
      if (spread > 0) {
        dx += (Math.random() * 2 - 1) * spread * 0.5;
        dy += (Math.random() * 2 - 1) * spread * 0.5;
        dz += (Math.random() * 2 - 1) * spread * 0.5;
      }
      const len = Math.hypot(dx, dy, dz) || 1;
      const speed = o.speed ?? 3;
      this.vx[idx] = dx / len * speed * (0.6 + Math.random() * 0.8);
      this.vy[idx] = dy / len * speed * (0.6 + Math.random() * 0.8);
      this.vz[idx] = dz / len * speed * (0.6 + Math.random() * 0.8);
      this.grav[idx] = o.gravity ?? 0;
      this.drag[idx] = o.drag ?? 0;
      this.life[idx] = life;
      this.maxLife[idx] = life;
      const size = o.size ?? 0.2;
      this.size[idx] = size * (0.7 + Math.random() * 0.6);
      this.sizeEnd[idx] = o.sizeEnd ?? size * 0.3;
      this.rot[idx] = Math.random() * Math.PI * 2;
      this.rotSpeed[idx] = o.rotSpeed ?? 0;
      const c = o.color ?? [1, 1, 1, 1];
      this.cr[idx] = c[0]; this.cg[idx] = c[1]; this.cb[idx] = c[2]; this.ca[idx] = c[3] ?? 1;
      const ce = o.colorEnd ?? c;
      this.er[idx] = ce[0]; this.eg[idx] = ce[1]; this.eb[idx] = ce[2];
      this.tex[idx] = this.registerTexture(o.texture ?? 'glow', () => texGlow(64));
      this.blend[idx] = o.blend === 'add' ? 1 : 0;
      this.grounded[idx] = o.grounded ? 1 : 0;
      this.fadeIn[idx] = o.fadeIn ?? 0;
    }
    return n;
  }

  /** Simple spawn (single particle with full control). */
  spawn(o) {
    return this.burst({ count: 1, ...o });
  }

  /** Stream: emit particles each frame (caller throttles). */
  stream(o) {
    this.burst({ ...o, count: 1 });
  }

  _alloc() {
    if (this.count >= this.capacity) return -1;
    return this.count++;
  }

  // ------------------------------------------------------------ update

  update(dt, floorY = null) {
    this.time += dt;
    let write = 0;
    for (let i = 0; i < this.count; i++) {
      this.life[i] -= dt;
      if (this.life[i] <= 0) continue;
      if (write !== i) this._copy(write, i);
      const t = 1 - Math.max(0, this.life[write]) / this.maxLife[write];
      this.vy[write] -= this.grav[write] * dt;
      const drag = Math.max(0, 1 - this.drag[write] * dt);
      this.vx[write] *= drag;
      this.vy[write] *= drag;
      this.vz[write] *= drag;
      this.px[write] += this.vx[write] * dt;
      this.py[write] += this.vy[write] * dt;
      this.pz[write] += this.vz[write] * dt;
      this.rot[write] += this.rotSpeed[write] * dt;
      if (this.grounded[write] && this.py[write] < 0) {
        this.py[write] = 0;
        this.vy[write] *= -0.35;
        this.vx[write] *= 0.7;
        this.vz[write] *= 0.7;
      }
      if (floorY !== null && this.py[write] < floorY) {
        this.py[write] = floorY;
      }
      const o = write * ATTR_FLOATS;
      const d = this.instData;
      d[o] = this.px[write];
      d[o + 1] = this.py[write];
      d[o + 2] = this.pz[write];
      const fadeIn = this.fadeIn[write] > 0 ? Math.min(1, t / this.fadeIn[write]) : 1;
      const fadeOut = 1 - Math.pow(t, 2.2);
      d[o + 3] = this.cr[write] + (this.er[write] - this.cr[write]) * t;
      d[o + 4] = this.cg[write] + (this.eg[write] - this.cg[write]) * t;
      d[o + 5] = this.cb[write] + (this.eb[write] - this.cb[write]) * t;
      d[o + 6] = this.ca[write] * fadeIn * fadeOut;
      d[o + 7] = this.size[write] + (this.sizeEnd[write] - this.size[write]) * t;
      d[o + 8] = this.rot[write];
      d[o + 9] = this.tex[write];
      write++;
    }
    this.count = write;

    this.batches.length = 0;
    if (this.count > 0) {
      let start = 0;
      let curTex = this.tex[0];
      for (let i = 1; i <= this.count; i++) {
        const t = i < this.count ? this.tex[i] : -1;
        if (t !== curTex) {
          this.batches.push({ start, count: i - start, texId: curTex });
          start = i;
          curTex = t;
        }
      }
    }
  }

  _copy(dst, src) {
    this.px[dst] = this.px[src]; this.py[dst] = this.py[src]; this.pz[dst] = this.pz[src];
    this.vx[dst] = this.vx[src]; this.vy[dst] = this.vy[src]; this.vz[dst] = this.vz[src];
    this.grav[dst] = this.grav[src]; this.drag[dst] = this.drag[src];
    this.life[dst] = this.life[src]; this.maxLife[dst] = this.maxLife[src];
    this.size[dst] = this.size[src]; this.sizeEnd[dst] = this.sizeEnd[src];
    this.rot[dst] = this.rot[src]; this.rotSpeed[dst] = this.rotSpeed[src];
    this.cr[dst] = this.cr[src]; this.cg[dst] = this.cg[src]; this.cb[dst] = this.cb[src]; this.ca[dst] = this.ca[src];
    this.er[dst] = this.er[src]; this.eg[dst] = this.eg[src]; this.eb[dst] = this.eb[src];
    this.tex[dst] = this.tex[src]; this.blend[dst] = this.blend[src];
    this.grounded[dst] = this.grounded[src]; this.fadeIn[dst] = this.fadeIn[src];
  }

  // ------------------------------------------------------------ render

  render(camera, viewProj) {
    if (this.count === 0) return;
    const g = this.gl.raw;

    g.bindBuffer(g.ARRAY_BUFFER, this.instVbo);
    g.bufferSubData(g.ARRAY_BUFFER, 0, this.instData.subarray(0, this.count * ATTR_FLOATS));

    const P = this.program;
    P.use();
    P.setMat4('uViewProj', viewProj);
    P.setVec3('uRight', camera.right);
    P.setVec3('uUp', camera.up);

    g.bindVertexArray(this.vao);
    g.enable(g.BLEND);
    g.depthMask(false);

    for (const batch of this.batches) {
      const slot = this.texSlots[batch.texId];
      slot.tex.bind(0);
      if (this.blend[batch.start] === 1) {
        g.blendFunc(g.SRC_ALPHA, g.ONE);
      } else {
        g.blendFunc(g.SRC_ALPHA, g.ONE_MINUS_SRC_ALPHA);
      }
      P.set1i('uTex', 0);
      P.set1f('uSoft', 0);
      g.drawArraysInstanced(g.TRIANGLES, 0, 6, batch.count);
    }

    g.depthMask(true);
    g.disable(g.BLEND);
    g.bindVertexArray(null);
  }

  clear() {
    this.count = 0;
  }

  get activeCount() {
    return this.count;
  }

  dispose() {
    const g = this.gl.raw;
    g.deleteBuffer(this.quadVbo);
    g.deleteBuffer(this.instVbo);
    g.deleteVertexArray(this.vao);
    this.program.dispose();
  }
}
