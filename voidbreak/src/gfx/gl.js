/**
 * VOIDBREAK — WebGL2 context wrapper.
 *
 * Creates and validates the WebGL2 context, exposes capability info and a
 * few safe helpers. The whole engine is built on WebGL2 (GLSL 300 es).
 */

import { log } from '../core/profiler.js';

export class GL {
  constructor(canvas, opts = {}) {
    this.canvas = canvas;
    this.raw = null;
    this.version = null;
    this.maxTextureSize = 0;
    this.maxVertexAttribs = 0;
    this.maxDrawBuffers = 0;
    this.maxTextureUnits = 0;
    this.anisotropy = 0;
    this.capabilities = {};

    const attribs = {
      alpha: false,
      antialias: opts.antialias ?? true,
      depth: true,
      stencil: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      powerPreference: opts.powerPreference ?? 'high-performance',
      failIfMajorPerformanceCaveat: false,
    };

    this.raw = canvas.getContext('webgl2', attribs);
    if (!this.raw) {
      throw new Error('WebGL2 is not supported by this browser/device.');
    }

    this.gl = this.raw;
    this.version = `WebGL ${this.gl.getParameter(this.gl.VERSION)}`;

    this.maxTextureSize = this.gl.getParameter(this.gl.MAX_TEXTURE_SIZE);
    this.maxVertexAttribs = this.gl.getParameter(this.gl.MAX_VERTEX_ATTRIBS);
    this.maxDrawBuffers = this.gl.getParameter(this.gl.MAX_DRAW_BUFFERS);
    this.maxTextureUnits = this.gl.getParameter(this.gl.MAX_TEXTURE_IMAGE_UNITS);

    const anisoExt = this.gl.getExtension('EXT_texture_filter_anisotropic');
    if (anisoExt) {
      this.anisotropy = this.gl.getParameter(anisoExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    }
    this.anisoExt = anisoExt;

    this.capabilities = {
      msaa: attribs.antialias && this.gl.getParameter(this.gl.SAMPLES) > 0,
      samples: this.gl.getParameter(this.gl.SAMPLES),
      halfFloat: !!this.gl.getExtension('EXT_color_buffer_half_float'),
      float: !!this.gl.getExtension('EXT_color_buffer_float'),
      depthTexture: true,
      instancing: true,
      derivative: true,
      anisotropy: this.anisotropy,
    };

    const g = this.gl;
    g.enable(g.DEPTH_TEST);
    g.depthFunc(g.LEQUAL);
    g.enable(g.CULL_FACE);
    g.cullFace(g.BACK);
    g.disable(g.BLEND);
    g.clearColor(0, 0, 0, 1);

    log.info('gfx', `context created: ${this.version}, ${this.maxTextureSize}px textures, ${this.maxTextureUnits} texture units, antialias=${attribs.antialias}`);
  }

  /** Resize the drawing buffer to match the canvas CSS size × pixelRatio. */
  resize(cssWidth, cssHeight, pixelRatio = 1) {
    const w = Math.max(1, Math.floor(cssWidth * pixelRatio));
    const h = Math.max(1, Math.floor(cssHeight * pixelRatio));
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
    this.width = w;
    this.height = h;
    this.pixelRatio = pixelRatio;
    this.gl.viewport(0, 0, w, h);
    return this;
  }

  /** Create a shader program from source strings, throwing on error. */
  createProgram(vertSrc, fragSrc, attribLocations = null) {
    const g = this.gl;
    const vert = compileShader(g, g.VERTEX_SHADER, vertSrc, 'vertex');
    const frag = compileShader(g, g.FRAGMENT_SHADER, fragSrc, 'fragment');
    const prog = g.createProgram();
    g.attachShader(prog, vert);
    g.attachShader(prog, frag);
    if (attribLocations) {
      for (const [name, loc] of Object.entries(attribLocations)) {
        g.bindAttribLocation(prog, loc, name);
      }
    }
    g.linkProgram(prog);
    if (!g.getProgramParameter(prog, g.LINK_STATUS)) {
      const info = g.getProgramInfoLog(prog);
      g.deleteProgram(prog);
      g.deleteShader(vert);
      g.deleteShader(frag);
      throw new Error(`Program link failed: ${info}`);
    }
    g.deleteShader(vert);
    g.deleteShader(frag);
    return prog;
  }

  /** Check for GL errors and log them (debug helper). */
  checkError(label = '') {
    if (!window.__VOIDBREAK_DEBUG__) return false;
    const g = this.gl;
    let err;
    let ok = true;
    while ((err = g.getError()) !== g.NO_ERROR) {
      ok = false;
      log.warn('gfx', `GL error 0x${err.toString(16)} ${label}`);
    }
    return ok;
  }
}

function compileShader(g, type, source, label) {
  const sh = g.createShader(type);
  g.shaderSource(sh, source);
  g.compileShader(sh);
  if (!g.getShaderParameter(sh, g.COMPILE_STATUS)) {
    const info = g.getShaderInfoLog(sh);
    const shortSource = source.split('\n').map((line, i) => `${i + 1}: ${line}`).join('\n');
    g.deleteShader(sh);
    throw new Error(`${label} shader compile failed:\n${info}\n---\n${shortSource}`);
  }
  return sh;
}
