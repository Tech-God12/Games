/**
 * VOIDBREAK — PostFX.
 *
 * Post-processing chain:
 *
 *   scene (MSAA FBO) → resolve (color texture)
 *     → bright pass (half res) → gaussian blur (2 taps × 2 iterations)
 *     → composite (scene + bloom + vignette + grade + grain + scanlines +
 *       chromatic aberration + damage/low-hp overlays + colorblind)
 *     → FXAA (optional) → canvas
 */

import { ShaderProgram } from './program.js';
import {
  FULLSCREEN_VERT, BRIGHT_FRAG, BLUR_FRAG, COMPOSITE_FRAG, FXAA_FRAG,
} from './shaderlib.js';

const COLORBLIND_MATRICES = {
  none: [1, 0, 0, 0, 1, 0, 0, 0, 1],
  protanopia: [0.567, 0.433, 0, 0.558, 0.442, 0, 0, 0.242, 0.758],
  deuteranopia: [0.625, 0.375, 0, 0.7, 0.3, 0, 0, 0.3, 0.7],
  tritanopia: [0.95, 0.05, 0, 0, 0.433, 0.567, 0, 0.475, 0.525],
};

export class PostFX {
  constructor(gl) {
    this.gl = gl;
    const g = gl.raw;

    this.sceneFbo = null;
    this.resolveFbo = null;
    this.bloomFbo = null;
    this.blurA = null;
    this.blurB = null;
    this.outFbo = null;
    this.width = 0;
    this.height = 0;
    this.halfW = 0;
    this.halfH = 0;

    this.programs = {
      bright: new ShaderProgram(gl, FULLSCREEN_VERT, BRIGHT_FRAG, null, 'bright'),
      blur: new ShaderProgram(gl, FULLSCREEN_VERT, BLUR_FRAG, null, 'blur'),
      composite: new ShaderProgram(gl, FULLSCREEN_VERT, COMPOSITE_FRAG, null, 'composite'),
      fxaa: new ShaderProgram(gl, FULLSCREEN_VERT, FXAA_FRAG, null, 'fxaa'),
    };

    this.fsVao = g.createVertexArray();

    this.quality = 'high';
    this.fxaa = true;
    this.bloomEnabled = true;
    this.bloomStrength = 0.9;

    this.state = {
      exposure: 1.0,
      saturation: 1.06,
      contrast: 1.04,
      tint: [1.0, 0.98, 0.95],
      vignette: 0.85,
      grain: 0.12,
      scanlines: 0,
      chromatic: 0.5,
      damageFlash: 0,
      lowHp: 0,
      colorblind: 'none',
      time: 0,
    };
  }

  /** (Re)build all framebuffers for the given render size. */
  resize(width, height, pixelRatio) {
    const g = this.gl.raw;
    this.width = Math.max(2, Math.floor(width));
    this.height = Math.max(2, Math.floor(height));
    this.halfW = Math.max(1, Math.floor(this.width / 2));
    this.halfH = Math.max(1, Math.floor(this.height / 2));

    this._destroyFbos();

    const samples = 4;

    const colorRb = g.createRenderbuffer();
    g.bindRenderbuffer(g.RENDERBUFFER, colorRb);
    g.renderbufferStorageMultisample(g.RENDERBUFFER, samples, g.RGBA8, this.width, this.height);
    const depthRb = g.createRenderbuffer();
    g.bindRenderbuffer(g.RENDERBUFFER, depthRb);
    g.renderbufferStorageMultisample(g.RENDERBUFFER, samples, g.DEPTH_COMPONENT24, this.width, this.height);
    const msaaFbo = g.createFramebuffer();
    g.bindFramebuffer(g.FRAMEBUFFER, msaaFbo);
    g.framebufferRenderbuffer(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.RENDERBUFFER, colorRb);
    g.framebufferRenderbuffer(g.FRAMEBUFFER, g.DEPTH_ATTACHMENT, g.RENDERBUFFER, depthRb);
    if (g.checkFramebufferStatus(g.FRAMEBUFFER) !== g.FRAMEBUFFER_COMPLETE) {
      throw new Error('MSAA framebuffer incomplete');
    }
    this.sceneFbo = { fbo: msaaFbo, colorRb, depthRb, msaa: true };

    const resolveColor = g.createTexture();
    g.bindTexture(g.TEXTURE_2D, resolveColor);
    g.texImage2D(g.TEXTURE_2D, 0, g.RGBA8, this.width, this.height, 0, g.RGBA, g.UNSIGNED_BYTE, null);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
    const resolveFbo = g.createFramebuffer();
    g.bindFramebuffer(g.FRAMEBUFFER, resolveFbo);
    g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, resolveColor, 0);
    if (g.checkFramebufferStatus(g.FRAMEBUFFER) !== g.FRAMEBUFFER_COMPLETE) {
      throw new Error('resolve framebuffer incomplete');
    }
    this.resolveFbo = { fbo: resolveFbo, color: resolveColor };

    this.bloomFbo = this._makeColorFbo(this.halfW, this.halfH);
    this.blurA = this._makeColorFbo(this.halfW, this.halfH);
    this.blurB = this._makeColorFbo(this.halfW, this.halfH);

    const outColor = g.createTexture();
    g.bindTexture(g.TEXTURE_2D, outColor);
    g.texImage2D(g.TEXTURE_2D, 0, g.RGBA8, this.width, this.height, 0, g.RGBA, g.UNSIGNED_BYTE, null);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
    const outFbo = g.createFramebuffer();
    g.bindFramebuffer(g.FRAMEBUFFER, outFbo);
    g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, outColor, 0);
    if (g.checkFramebufferStatus(g.FRAMEBUFFER) !== g.FRAMEBUFFER_COMPLETE) {
      throw new Error('output framebuffer incomplete');
    }
    this.outFbo = { fbo: outFbo, color: outColor };

    g.bindFramebuffer(g.FRAMEBUFFER, null);
  }

  _makeColorFbo(w, h) {
    const g = this.gl.raw;
    const tex = g.createTexture();
    g.bindTexture(g.TEXTURE_2D, tex);
    g.texImage2D(g.TEXTURE_2D, 0, g.RGBA8, w, h, 0, g.RGBA, g.UNSIGNED_BYTE, null);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
    const fbo = g.createFramebuffer();
    g.bindFramebuffer(g.FRAMEBUFFER, fbo);
    g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, tex, 0);
    if (g.checkFramebufferStatus(g.FRAMEBUFFER) !== g.FRAMEBUFFER_COMPLETE) {
      throw new Error('color framebuffer incomplete');
    }
    return { fbo, color: tex };
  }

  _destroyFbos() {
    const g = this.gl.raw;
    for (const f of [this.sceneFbo, this.resolveFbo, this.bloomFbo, this.blurA, this.blurB, this.outFbo]) {
      if (!f) continue;
      g.deleteFramebuffer(f.fbo);
      if (f.color) g.deleteTexture(f.color);
      if (f.colorRb) g.deleteRenderbuffer(f.colorRb);
      if (f.depthRb) g.deleteRenderbuffer(f.depthRb);
    }
    this.sceneFbo = null;
    this.resolveFbo = null;
    this.bloomFbo = null;
    this.blurA = null;
    this.blurB = null;
    this.outFbo = null;
  }

  /** Bind the scene render target (where the game draws). */
  bindSceneTarget() {
    const g = this.gl.raw;
    g.bindFramebuffer(g.FRAMEBUFFER, this.sceneFbo.fbo);
    g.viewport(0, 0, this.width, this.height);
  }

  /** Resolve MSAA → resolve texture. */
  resolve() {
    const g = this.gl.raw;
    if (this.sceneFbo.msaa) {
      g.bindFramebuffer(g.READ_FRAMEBUFFER, this.sceneFbo.fbo);
      g.bindFramebuffer(g.DRAW_FRAMEBUFFER, this.resolveFbo.fbo);
      g.blitFramebuffer(0, 0, this.width, this.height, 0, 0, this.width, this.height, g.COLOR_BUFFER_BIT, g.NEAREST);
      g.bindFramebuffer(g.FRAMEBUFFER, null);
    }
  }

  /** Run the full post chain; the last pass targets the canvas (or outFbo when FXAA). */
  composite() {
    const g = this.gl.raw;
    const P = this.programs;

    if (this.bloomEnabled) {
      g.bindFramebuffer(g.FRAMEBUFFER, this.bloomFbo.fbo);
      g.viewport(0, 0, this.halfW, this.halfH);
      this._bindTex(this.resolveFbo.color, 0);
      P.bright.use();
      P.bright.set1i('uTex', 0);
      P.bright.set1f('uThreshold', 0.72);
      this._drawFullscreen();

      for (let iter = 0; iter < 2; iter++) {
        const src = iter === 0 ? this.bloomFbo : this.blurB;
        const dstX = iter === 0 ? this.blurA : this.blurA;
        const dstY = iter === 0 ? this.blurB : this.blurB;
        g.bindFramebuffer(g.FRAMEBUFFER, dstX.fbo);
        g.viewport(0, 0, this.halfW, this.halfH);
        this._bindTex(src.color, 0);
        P.blur.use();
        P.blur.set1i('uTex', 0);
        P.blur.set2f('uDirection', 1, 0);
        P.blur.set2f('uTexelSize', 1 / this.halfW, 1 / this.halfH);
        this._drawFullscreen();

        g.bindFramebuffer(g.FRAMEBUFFER, dstY.fbo);
        g.viewport(0, 0, this.halfW, this.halfH);
        this._bindTex(dstX.color, 0);
        P.blur.use();
        P.blur.set1i('uTex', 0);
        P.blur.set2f('uDirection', 0, 1);
        P.blur.set2f('uTexelSize', 1 / this.halfW, 1 / this.halfH);
        this._drawFullscreen();
      }
    }

    const target = this.fxaa ? this.outFbo.fbo : null;
    g.bindFramebuffer(g.FRAMEBUFFER, target);
    g.viewport(0, 0, this.width, this.height);
    this._bindTex(this.resolveFbo.color, 0);
    if (this.bloomEnabled) this._bindTex(this.blurB.color, 1);
    const st = this.state;
    const cm = COLORBLIND_MATRICES[st.colorblind] ?? COLORBLIND_MATRICES.none;
    P.composite.use();
    P.composite.set1i('uScene', 0);
    P.composite.set1i('uBloom', 1);
    P.composite.set1f('uBloomStrength', this.bloomEnabled ? this.bloomStrength : 0);
    P.composite.set1f('uTime', st.time);
    P.composite.set1f('uVignette', st.vignette);
    P.composite.set1f('uSaturation', st.saturation);
    P.composite.set1f('uContrast', st.contrast);
    P.composite.set3f('uGradeTint', st.tint[0], st.tint[1], st.tint[2]);
    P.composite.set3f('uColorblindMat0', cm[0], cm[1], cm[2]);
    P.composite.set3f('uColorblindMat1', cm[3], cm[4], cm[5]);
    P.composite.set3f('uColorblindMat2', cm[6], cm[7], cm[8]);
    P.composite.set1f('uGrain', st.grain);
    P.composite.set1f('uScanlines', st.scanlines);
    P.composite.set1f('uChromatic', st.chromatic);
    P.composite.set1f('uDamageFlash', st.damageFlash);
    P.composite.set1f('uLowHp', st.lowHp);
    P.composite.set2f('uResolution', this.width, this.height);
    P.composite.set1f('uExposure', st.exposure);
    this._drawFullscreen();

    if (this.fxaa) {
      g.bindFramebuffer(g.FRAMEBUFFER, null);
      g.viewport(0, 0, this.width, this.height);
      this._bindTex(this.outFbo.color, 0);
      P.fxaa.use();
      P.fxaa.set1i('uTex', 0);
      P.fxaa.set2f('uTexelSize', 1 / this.width, 1 / this.height);
      this._drawFullscreen();
    }

    g.bindFramebuffer(g.FRAMEBUFFER, null);
  }

  _bindTex(tex, unit) {
    const g = this.gl.raw;
    g.activeTexture(g.TEXTURE0 + unit);
    g.bindTexture(g.TEXTURE_2D, tex);
  }

  _drawFullscreen() {
    const g = this.gl.raw;
    g.bindVertexArray(this.fsVao);
    g.drawArrays(g.TRIANGLES, 0, 3);
    g.bindVertexArray(null);
  }

  setQuality(quality) {
    this.quality = quality;
    this.bloomEnabled = quality.bloom;
    this.fxaa = quality.fxaa;
  }

  dispose() {
    this._destroyFbos();
    for (const p of Object.values(this.programs)) p.dispose();
  }
}
