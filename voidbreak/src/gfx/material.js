/**
 * VOIDBREAK — Material.
 *
 * Describes how a surface is shaded. Materials are plain data objects with
 * sane defaults; the renderer maps them onto the main shader's uniforms.
 * Materials are shared (immutable) after creation; per-frame animation state
 * lives on the render objects instead.
 */

import { Color } from '../core/color.js';

const _white = new Color(1, 1, 1, 1);

export class Material {
  constructor(opts = {}) {
    /** @type {Color} base albedo */
    this.color = opts.color instanceof Color ? opts.color.clone() : (opts.color ? Color.fromCss(opts.color) : _white.clone());
    /** @type {Color} emissive (a = intensity) */
    this.emissive = opts.emissive instanceof Color ? opts.emissive.clone() : (opts.emissive ? Color.fromCss(opts.emissive) : new Color(0, 0, 0, 0));
    /** @type {string|null} key of the albedo texture in the TextureCache */
    this.texture = opts.texture ?? null;
    /** @type {string|null} key of an emissive texture */
    this.emissiveTexture = opts.emissiveTexture ?? null;
    this.metalness = opts.metalness ?? 0.1;
    this.roughness = opts.roughness ?? 0.85;
    this.alpha = opts.alpha ?? 1;
    this.alphaTest = opts.alphaTest ?? 0;
    this.rimPower = opts.rimPower ?? 0;
    this.rimStrength = opts.rimStrength ?? 0;
    this.unlit = opts.unlit ?? false;
    this.doubleSided = opts.doubleSided ?? false;
    this.receiveShadow = opts.receiveShadow ?? true;
    this.castShadow = opts.castShadow ?? true;
    this.vertexColorBlend = opts.vertexColorBlend ?? false;
    this.blend = opts.blend ?? null; // null | 'alpha' | 'additive'
    this.depthWrite = opts.depthWrite ?? (this.blend === null);
    this.depthTest = opts.depthTest ?? true;
    this.fog = opts.fog ?? true;
    this.renderOrder = opts.renderOrder ?? 0;
  }

  clone() {
    const m = new Material();
    m.color.copy(this.color);
    m.emissive.copy(this.emissive);
    m.texture = this.texture;
    m.emissiveTexture = this.emissiveTexture;
    m.metalness = this.metalness;
    m.roughness = this.roughness;
    m.alpha = this.alpha;
    m.alphaTest = this.alphaTest;
    m.rimPower = this.rimPower;
    m.rimStrength = this.rimStrength;
    m.unlit = this.unlit;
    m.doubleSided = this.doubleSided;
    m.receiveShadow = this.receiveShadow;
    m.castShadow = this.castShadow;
    m.vertexColorBlend = this.vertexColorBlend;
    m.blend = this.blend;
    m.depthWrite = this.depthWrite;
    m.depthTest = this.depthTest;
    m.fog = this.fog;
    m.renderOrder = this.renderOrder;
    return m;
  }

  get opaque() {
    return this.blend === null;
  }
}

/** Convenience material factories. */
export const Materials = {
  solid(color, opts = {}) {
    return new Material({ color, ...opts });
  },

  textured(textureKey, opts = {}) {
    return new Material({ texture: textureKey, ...opts });
  },

  glow(color, intensity = 1, opts = {}) {
    return new Material({ color: '#000000', emissive: color, ...opts });
  },

  unlit(color, opts = {}) {
    return new Material({ color, unlit: true, ...opts });
  },
};
