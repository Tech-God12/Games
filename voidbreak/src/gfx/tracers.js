/**
 * VOIDBREAK — Tracers.
 *
 * Fast bullet/beam visual lines drawn as additive GL_LINES. A small dynamic
 * buffer holds live tracers; each fades out over its life. Cheap and juicy.
 */

import { ShaderProgram } from './program.js';

const TRACER_VERT = `#version 300 es
precision highp float;
layout(location=0) in vec3 aPos;
layout(location=1) in vec4 aColor;
uniform mat4 uViewProj;
out vec4 vColor;
void main() {
  vColor = aColor;
  gl_Position = uViewProj * vec4(aPos, 1.0);
}
`;

const TRACER_FRAG = `#version 300 es
precision highp float;
in vec4 vColor;
out vec4 outColor;
void main() {
  outColor = vColor;
}
`;

const MAX_TRACERS = 256;

export class TracerSystem {
  constructor(gl) {
    this.gl = gl;
    const g = gl.raw;
    this.capacity = MAX_TRACERS;
    this.count = 0;
    this.px = new Float32Array(this.capacity * 2);
    this.py = new Float32Array(this.capacity * 2);
    this.pz = new Float32Array(this.capacity * 2);
    this.cr = new Float32Array(this.capacity * 2);
    this.cg = new Float32Array(this.capacity * 2);
    this.cb = new Float32Array(this.capacity * 2);
    this.ca = new Float32Array(this.capacity * 2);
    this.life = new Float32Array(this.capacity);
    this.maxLife = new Float32Array(this.capacity);
    this.width = new Float32Array(this.capacity);

    this.vbo = g.createBuffer();
    g.bindBuffer(g.ARRAY_BUFFER, this.vbo);
    g.bufferData(g.ARRAY_BUFFER, this.capacity * 2 * 6 * 4, g.DYNAMIC_DRAW);
    this.vao = g.createVertexArray();
    g.bindVertexArray(this.vao);
    g.bindBuffer(g.ARRAY_BUFFER, this.vbo);
    const stride = 6 * 4;
    g.enableVertexAttribArray(0);
    g.vertexAttribPointer(0, 3, g.FLOAT, false, stride, 0);
    g.enableVertexAttribArray(1);
    g.vertexAttribPointer(1, 4, g.FLOAT, false, stride, 12);
    g.bindVertexArray(null);

    this.program = new ShaderProgram(gl, TRACER_VERT, TRACER_FRAG, null, 'tracers');
  }

  /**
   * Add a tracer.
   * @param {object} o {x1,y1,z1, x2,y2,z2, color:[r,g,b], width, life}
   */
  add(o) {
    if (this.count >= this.capacity) {
      this.count--;
      for (let i = 0; i < this.count; i++) this._copy(i, i + 1);
    }
    const i = this.count++;
    this.px[i * 2] = o.x1;
    this.py[i * 2] = o.y1;
    this.pz[i * 2] = o.z1;
    this.px[i * 2 + 1] = o.x2;
    this.py[i * 2 + 1] = o.y2;
    this.pz[i * 2 + 1] = o.z2;
    const c = o.color ?? [1, 1, 1];
    for (let v = 0; v < 2; v++) {
      this.cr[i * 2 + v] = c[0];
      this.cg[i * 2 + v] = c[1];
      this.cb[i * 2 + v] = c[2];
      this.ca[i * 2 + v] = 1;
    }
    this.life[i] = o.life ?? 0.08;
    this.maxLife[i] = this.life[i];
    this.width[i] = o.width ?? 1;
  }

  _copy(dst, src) {
    for (let v = 0; v < 2; v++) {
      this.px[dst * 2 + v] = this.px[src * 2 + v];
      this.py[dst * 2 + v] = this.py[src * 2 + v];
      this.pz[dst * 2 + v] = this.pz[src * 2 + v];
      this.cr[dst * 2 + v] = this.cr[src * 2 + v];
      this.cg[dst * 2 + v] = this.cg[src * 2 + v];
      this.cb[dst * 2 + v] = this.cb[src * 2 + v];
      this.ca[dst * 2 + v] = this.ca[src * 2 + v];
    }
    this.life[dst] = this.life[src];
    this.maxLife[dst] = this.maxLife[src];
    this.width[dst] = this.width[src];
  }

  update(dt) {
    let write = 0;
    for (let i = 0; i < this.count; i++) {
      this.life[i] -= dt;
      if (this.life[i] <= 0) continue;
      if (write !== i) this._copy(write, i);
      const t = this.life[write] / this.maxLife[write];
      this.ca[write * 2] = t;
      this.ca[write * 2 + 1] = t;
      write++;
    }
    this.count = write;
  }

  render(viewProj) {
    if (this.count === 0) return;
    const g = this.gl.raw;
    const data = new Float32Array(this.count * 2 * 6);
    let o = 0;
    for (let i = 0; i < this.count; i++) {
      const v0 = i * 2;
      const v1 = i * 2 + 1;
      data[o++] = this.px[v0];
      data[o++] = this.py[v0];
      data[o++] = this.pz[v0];
      data[o++] = this.cr[v0];
      data[o++] = this.cg[v0];
      data[o++] = this.cb[v0];
      data[o++] = this.ca[v0];
      data[o++] = this.px[v1];
      data[o++] = this.py[v1];
      data[o++] = this.pz[v1];
      data[o++] = this.cr[v1];
      data[o++] = this.cg[v1];
      data[o++] = this.cb[v1];
      data[o++] = this.ca[v1];
    }
    g.bindBuffer(g.ARRAY_BUFFER, this.vbo);
    g.bufferSubData(g.ARRAY_BUFFER, 0, data);
    const P = this.program;
    P.use();
    P.setMat4('uViewProj', viewProj);
    g.enable(g.BLEND);
    g.blendFunc(g.SRC_ALPHA, g.ONE);
    g.depthMask(false);
    g.bindVertexArray(this.vao);
    g.lineWidth(1);
    g.drawArrays(g.LINES, 0, this.count * 2);
    g.bindVertexArray(null);
    g.depthMask(true);
    g.disable(g.BLEND);
  }

  clear() {
    this.count = 0;
  }

  dispose() {
    const g = this.gl.raw;
    g.deleteBuffer(this.vbo);
    g.deleteVertexArray(this.vao);
    this.program.dispose();
  }
}
