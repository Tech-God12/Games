/**
 * VOIDBREAK — Mesh (GPU geometry).
 *
 * Interleaved vertex format: position(3) | normal(3) | uv(2) | color(4),
 * i.e. 12 floats per vertex. Geometry is uploaded once at creation; meshes
 * are immutable after upload and shared between all instances.
 */

export const FLOATS_PER_VERTEX = 12;
export const VERTEX_SIZE = FLOATS_PER_VERTEX * 4; // bytes

export class Mesh {
  /**
   * @param {import('./gl.js').GL} gl
   * @param {object} geometry {positions, normals, uvs, colors, indices}
   * @param {object} [opts]
   * @param {boolean} [opts.dynamic] re-uploadable (for decals etc.)
   */
  constructor(gl, geometry, opts = {}) {
    this.gl = gl;
    const g = gl.raw;
    this.dynamic = !!opts.dynamic;

    const vertCount = geometry.positions.length / 3;
    this.vertCount = vertCount;
    this.indexCount = geometry.indices?.length ?? 0;
    this.triangleCount = this.indexCount / 3;

    const data = new Float32Array(vertCount * FLOATS_PER_VERTEX);
    const pos = geometry.positions;
    const nor = geometry.normals ?? new Float32Array(vertCount * 3);
    const uv = geometry.uvs ?? new Float32Array(vertCount * 2);
    const col = geometry.colors ?? new Float32Array(vertCount * 4);

    let o = 0;
    for (let i = 0; i < vertCount; i++) {
      const p = i * 3;
      const u = i * 2;
      const c = i * 4;
      data[o++] = pos[p];
      data[o++] = pos[p + 1];
      data[o++] = pos[p + 2];
      data[o++] = nor[p];
      data[o++] = nor[p + 1];
      data[o++] = nor[p + 2];
      data[o++] = uv[u];
      data[o++] = uv[u + 1];
      data[o++] = col[c];
      data[o++] = col[c + 1];
      data[o++] = col[c + 2];
      data[o++] = col[c + 3];
    }

    this.vbo = g.createBuffer();
    g.bindBuffer(g.ARRAY_BUFFER, this.vbo);
    g.bufferData(g.ARRAY_BUFFER, data, this.dynamic ? g.DYNAMIC_DRAW : g.STATIC_DRAW);

    if (geometry.indices && geometry.indices.length > 0) {
      const use32 = vertCount > 65535;
      this.ibo = g.createBuffer();
      g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, this.ibo);
      if (use32) {
        g.bufferData(g.ELEMENT_ARRAY_BUFFER, new Uint32Array(geometry.indices), this.dynamic ? g.DYNAMIC_DRAW : g.STATIC_DRAW);
      } else {
        g.bufferData(g.ELEMENT_ARRAY_BUFFER, new Uint16Array(geometry.indices), this.dynamic ? g.DYNAMIC_DRAW : g.STATIC_DRAW);
      }
      this.indexType = use32 ? g.UNSIGNED_INT : g.UNSIGNED_SHORT;
    } else {
      this.ibo = null;
      this.indexType = 0;
    }

    this.vao = g.createVertexArray();
    this._setupVao();
  }

  _setupVao() {
    const g = this.gl.raw;
    g.bindVertexArray(this.vao);
    g.bindBuffer(g.ARRAY_BUFFER, this.vbo);
    const stride = VERTEX_SIZE;
    g.enableVertexAttribArray(0);
    g.vertexAttribPointer(0, 3, g.FLOAT, false, stride, 0);
    g.enableVertexAttribArray(1);
    g.vertexAttribPointer(1, 3, g.FLOAT, false, stride, 12);
    g.enableVertexAttribArray(2);
    g.vertexAttribPointer(2, 2, g.FLOAT, false, stride, 24);
    g.enableVertexAttribArray(3);
    g.vertexAttribPointer(3, 4, g.FLOAT, false, stride, 32);
    if (this.ibo) {
      g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, this.ibo);
    }
    g.bindVertexArray(null);
  }

  /** Re-upload vertex data from a plain geometry (dynamic meshes only). */
  update(geometry) {
    if (!this.dynamic) {
      throw new Error('Mesh.update requires dynamic:true');
    }
    const g = this.gl.raw;
    const vertCount = geometry.positions.length / 3;
    this.vertCount = vertCount;
    this.indexCount = geometry.indices?.length ?? 0;
    this.triangleCount = this.indexCount / 3;
    const data = new Float32Array(vertCount * FLOATS_PER_VERTEX);
    const { positions: pos, normals: nor, uvs: uv, colors: col, indices } = geometry;
    let o = 0;
    for (let i = 0; i < vertCount; i++) {
      const p = i * 3;
      const u = i * 2;
      const c = i * 4;
      data[o++] = pos[p];
      data[o++] = pos[p + 1];
      data[o++] = pos[p + 2];
      data[o++] = nor ? nor[p] : 0;
      data[o++] = nor ? nor[p + 1] : 1;
      data[o++] = nor ? nor[p + 2] : 0;
      data[o++] = uv ? uv[u] : 0;
      data[o++] = uv ? uv[u + 1] : 0;
      data[o++] = col ? col[c] : 1;
      data[o++] = col ? col[c + 1] : 1;
      data[o++] = col ? col[c + 2] : 1;
      data[o++] = col ? col[c + 3] : 1;
    }
    g.bindBuffer(g.ARRAY_BUFFER, this.vbo);
    g.bufferData(g.ARRAY_BUFFER, data, g.DYNAMIC_DRAW);
    if (indices && indices.length > 0) {
      const use32 = vertCount > 65535;
      g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, this.ibo);
      if (use32) {
        g.bufferData(g.ELEMENT_ARRAY_BUFFER, new Uint32Array(indices), g.DYNAMIC_DRAW);
      } else {
        g.bufferData(g.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), g.DYNAMIC_DRAW);
      }
      this.indexType = use32 ? g.UNSIGNED_INT : g.UNSIGNED_SHORT;
    }
  }

  /** Draw with the given program (attribs 0-3 already bound to our VAO). */
  draw(program) {
    const g = this.gl.raw;
    g.bindVertexArray(this.vao);
    if (this.ibo) {
      g.drawElements(g.TRIANGLES, this.indexCount, this.indexType, 0);
    } else {
      g.drawArrays(g.TRIANGLES, 0, this.vertCount);
    }
    g.bindVertexArray(null);
  }

  dispose() {
    const g = this.gl.raw;
    g.deleteBuffer(this.vbo);
    if (this.ibo) g.deleteBuffer(this.ibo);
    g.deleteVertexArray(this.vao);
  }
}
