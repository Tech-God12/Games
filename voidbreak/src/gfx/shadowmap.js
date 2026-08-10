/**
 * VOIDBREAK — ShadowMap.
 *
 * Single directional-light shadow map rendered from an orthographic camera
 * centered on the view camera's position. The depth texture is sampled by
 * the main shader with 3×3 PCF.
 */

import { Mat4 } from '../core/mat4.js';
import { Vec3 } from '../core/vec3.js';

export class ShadowMap {
  /**
   * @param {import('./gl.js').GL} gl
   * @param {number} size shadow map resolution
   */
  constructor(gl, size = 2048) {
    this.gl = gl;
    const g = gl.raw;
    this.size = size;

    this.fbo = g.createFramebuffer();
    this.tex = g.createTexture();
    g.bindTexture(g.TEXTURE_2D, this.tex);
    g.texImage2D(g.TEXTURE_2D, 0, g.DEPTH_COMPONENT24, size, size, 0, g.DEPTH_COMPONENT, g.UNSIGNED_INT, null);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.NEAREST);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.NEAREST);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_COMPARE_MODE, g.NONE);

    g.bindFramebuffer(g.FRAMEBUFFER, this.fbo);
    g.framebufferTexture2D(g.FRAMEBUFFER, g.DEPTH_ATTACHMENT, g.TEXTURE_2D, this.tex, 0);
    g.drawBuffers([g.NONE]);
    g.readBuffer(g.NONE);
    const status = g.checkFramebufferStatus(g.FRAMEBUFFER);
    if (status !== g.FRAMEBUFFER_COMPLETE) {
      throw new Error(`Shadow map framebuffer incomplete: 0x${status.toString(16)}`);
    }
    g.bindFramebuffer(g.FRAMEBUFFER, null);

    this._viewProj = new Mat4().identity();
    this._proj = new Mat4().identity();
    this._view = new Mat4().identity();
    this._eye = new Vec3();
    this._target = new Vec3();
  }

  /**
   * Begin the shadow pass: bind FBO, set viewport, clear depth.
   */
  begin(light, focusPosition, size = 60) {
    const g = this.gl.raw;
    g.bindFramebuffer(g.FRAMEBUFFER, this.fbo);
    g.viewport(0, 0, this.size, this.size);
    g.clearDepth(1.0);
    g.clear(g.DEPTH_BUFFER_BIT);
    g.enable(g.DEPTH_TEST);
    g.depthFunc(g.LEQUAL);
    g.disable(g.BLEND);
    g.enable(g.CULL_FACE);
    g.cullFace(g.FRONT);

    const sun = light.direction;
    this._target.copy(focusPosition).addScaled(sun, 5);
    this._eye.copy(focusPosition).addScaled(sun, -size * 1.6);
    this._view.makeLookAt(this._eye, this._target, new Vec3(0, 1, 0));
    this._proj.makeOrthographic(-size, size, size, -size, 1, size * 4);
    this._viewProj.multiply(this._proj, this._view);
    return this._viewProj;
  }

  /** End the shadow pass (restore main framebuffer state). */
  end() {
    const g = this.gl.raw;
    g.bindFramebuffer(g.FRAMEBUFFER, null);
  }

  /** Bind the depth texture to a unit. */
  bind(unit = 4) {
    const g = this.gl.raw;
    g.activeTexture(g.TEXTURE0 + unit);
    g.bindTexture(g.TEXTURE_2D, this.tex);
  }

  get viewProj() {
    return this._viewProj;
  }

  dispose() {
    const g = this.gl.raw;
    g.deleteTexture(this.tex);
    g.deleteFramebuffer(this.fbo);
  }
}
