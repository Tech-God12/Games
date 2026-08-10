/**
 * VOIDBREAK — ShaderProgram.
 *
 * Wraps a compiled/linked WebGL program: uniform location caching, uniform
 * setters, and attribute binding. `gl` here is the GL wrapper from gl.js
 * (used for its friendly compile-error reporting); raw GL calls go through
 * `this.raw` accessor.
 */

export class ShaderProgram {
  /**
   * @param {import('./gl.js').GL} gl the GL wrapper
   * @param {string} vertSrc GLSL 300 es vertex source
   * @param {string} fragSrc GLSL 300 es fragment source
   * @param {object} [attribLocations] explicit attribute locations
   * @param {string} [name]
   */
  constructor(gl, vertSrc, fragSrc, attribLocations = null, name = 'program') {
    this.gl = gl;
    this.raw = gl.raw;
    this.name = name;
    this.program = gl.createProgram(vertSrc, fragSrc, attribLocations);
    this.uniforms = new Map();
    this.attributes = new Map();
    this._cacheUniformLocations();
    this._cacheAttributeLocations();
  }

  _cacheUniformLocations() {
    const g = this.raw;
    const count = g.getProgramParameter(this.program, g.ACTIVE_UNIFORMS);
    for (let i = 0; i < count; i++) {
      const info = g.getActiveUniform(this.program, i);
      if (!info) continue;
      const base = info.name.replace(/\[0\]$/, '');
      const loc = g.getUniformLocation(this.program, info.name);
      if (loc !== null) this.uniforms.set(base, loc);
      if (info.size > 1 && info.name.includes('[0]')) {
        for (let e = 0; e < info.size; e++) {
          const elLoc = g.getUniformLocation(this.program, `${base}[${e}]`);
          if (elLoc !== null) this.uniforms.set(`${base}[${e}]`, elLoc);
        }
      }
    }
  }

  _cacheAttributeLocations() {
    const g = this.raw;
    const count = g.getProgramParameter(this.program, g.ACTIVE_ATTRIBUTES);
    for (let i = 0; i < count; i++) {
      const info = g.getActiveAttrib(this.program, i);
      if (!info) continue;
      const loc = g.getAttribLocation(this.program, info.name);
      this.attributes.set(info.name, loc);
    }
  }

  use() {
    this.raw.useProgram(this.program);
    return this;
  }

  getUniform(name) {
    return this.uniforms.get(name) ?? null;
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? -1;
  }

  // ------------------------------------------------------------- setters

  set1f(name, v) {
    const loc = this.uniforms.get(name);
    if (loc !== undefined) this.raw.uniform1f(loc, v);
    return this;
  }

  set1i(name, v) {
    const loc = this.uniforms.get(name);
    if (loc !== undefined) this.raw.uniform1i(loc, v);
    return this;
  }

  set2f(name, x, y) {
    const loc = this.uniforms.get(name);
    if (loc !== undefined) this.raw.uniform2f(loc, x, y);
    return this;
  }

  set3f(name, x, y, z) {
    const loc = this.uniforms.get(name);
    if (loc !== undefined) this.raw.uniform3f(loc, x, y, z);
    return this;
  }

  set4f(name, x, y, z, w) {
    const loc = this.uniforms.get(name);
    if (loc !== undefined) this.raw.uniform4f(loc, x, y, z, w);
    return this;
  }

  setVec3(name, v) {
    const loc = this.uniforms.get(name);
    if (loc !== undefined) this.raw.uniform3f(loc, v.x, v.y, v.z);
    return this;
  }

  setVec4(name, v) {
    const loc = this.uniforms.get(name);
    if (loc !== undefined) this.raw.uniform4f(loc, v.x, v.y, v.z, v.w);
    return this;
  }

  setMat4(name, m) {
    const loc = this.uniforms.get(name);
    if (loc !== undefined) this.raw.uniformMatrix4fv(loc, false, m);
    return this;
  }

  setMat3(name, m) {
    const loc = this.uniforms.get(name);
    if (loc !== undefined) this.raw.uniformMatrix3fv(loc, false, m);
    return this;
  }

  setColor(name, r, g, b, a = 1) {
    return this.set4f(name, r, g, b, a);
  }

  dispose() {
    this.raw.deleteProgram(this.program);
  }
}

/** Registry of created programs (name → ShaderProgram). */
export class ProgramCache {
  constructor(gl) {
    this.gl = gl;
    this.programs = new Map();
  }

  get(name, factory) {
    let prog = this.programs.get(name);
    if (!prog) {
      prog = factory(this.gl);
      this.programs.set(name, prog);
    }
    return prog;
  }

  has(name) {
    return this.programs.has(name);
  }

  disposeAll() {
    for (const p of this.programs.values()) p.dispose();
    this.programs.clear();
  }
}
