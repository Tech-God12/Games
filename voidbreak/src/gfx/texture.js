/**
 * VOIDBREAK — Texture.
 *
 * WebGL texture wrapper: uploads canvas/ImageData sources, configures
 * filtering and wrapping, optional mipmaps and anisotropy. Textures are
 * cached by key in TextureCache so procedural textures are generated once.
 */

export class Texture {
  /**
   * @param {import('./gl.js').GL} gl
   * @param {CanvasImageSource|ImageData} source
   * @param {object} [opts]
   * @param {boolean} [opts.mipmaps] generate mipmaps (default true for POT)
   * @param {boolean} [opts.nearest] nearest filtering (pixel art)
   * @param {string} [opts.wrap] 'repeat' | 'clamp'
   * @param {boolean} [opts.flipY] flip vertically on upload
   * @param {number} [opts.anisotropy] override anisotropy
   */
  constructor(gl, source, opts = {}) {
    this.gl = gl;
    const g = gl.raw;
    this.width = source?.width ?? 0;
    this.height = source?.height ?? 0;
    const pow2 = isPow2(this.width) && isPow2(this.height);
    const useMips = opts.mipmaps ?? pow2;

    this.tex = g.createTexture();
    g.bindTexture(g.TEXTURE_2D, this.tex);
    g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, opts.flipY ?? false);
    g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, source);

    const wrap = opts.wrap === 'repeat' && pow2 ? g.REPEAT : g.CLAMP_TO_EDGE;
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, wrap);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, wrap);

    if (useMips) {
      g.generateMipmap(g.TEXTURE_2D);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, opts.nearest ? g.NEAREST_MIPMAP_NEAREST : g.LINEAR_MIPMAP_LINEAR);
    } else {
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, opts.nearest ? g.NEAREST : g.LINEAR);
    }
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, opts.nearest ? g.NEAREST : g.LINEAR);

    if (gl.anisoExt && useMips && (opts.anisotropy ?? 8) > 1) {
      const level = Math.min(opts.anisotropy ?? 8, gl.anisotropy);
      g.texParameterf(g.TEXTURE_2D, gl.anisoExt.TEXTURE_MAX_ANISOTROPY_EXT, level);
    }
    g.bindTexture(g.TEXTURE_2D, null);
  }

  /** Bind to a texture unit. */
  bind(unit = 0) {
    const g = this.gl.raw;
    g.activeTexture(g.TEXTURE0 + unit);
    g.bindTexture(g.TEXTURE_2D, this.tex);
  }

  dispose() {
    this.gl.raw.deleteTexture(this.tex);
  }
}

function isPow2(v) {
  return v > 0 && (v & (v - 1)) === 0;
}

/** Cache of named textures (key → Texture). */
export class TextureCache {
  constructor(gl) {
    this.gl = gl;
    this.textures = new Map();
  }

  /**
   * Get or create a texture. `factory` returns a source canvas plus opts.
   */
  get(key, factory, opts = {}) {
    let tex = this.textures.get(key);
    if (!tex) {
      const source = factory(this.gl);
      tex = new Texture(this.gl, source, opts);
      this.textures.set(key, tex);
    }
    return tex;
  }

  has(key) {
    return this.textures.has(key);
  }

  disposeAll() {
    for (const t of this.textures.values()) t.dispose();
    this.textures.clear();
  }
}
