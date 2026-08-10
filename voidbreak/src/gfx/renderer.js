/**
 * VOIDBREAK — Renderer.
 *
 * The central orchestration point for all rendering:
 *
 *   1. update shadow map (directional light, ortho around the camera)
 *   2. render the scene into the MSAA framebuffer:
 *        skybox → opaque (frustum-culled, sorted) → transparent → decals
 *   3. render particles (instanced billboards)
 *   4. resolve MSAA → post chain (bloom → composite → FXAA) → canvas
 *
 * Holds the shared resource singletons: texture cache, particle system,
 * decal system, shadow map and post FX.
 */

import { GL } from './gl.js';
import { ProgramCache, ShaderProgram } from './program.js';
import { TextureCache } from './texture.js';
import { Camera } from './camera.js';
import { Frustum } from '../core/geometry.js';
import { Vec3 } from '../core/vec3.js';
import { normalMatrix } from '../core/mat4.js';
import { ShadowMap } from './shadowmap.js';
import { PostFX } from './postfx.js';
import { Skybox } from './skybox.js';
import { ParticleSystem } from './particles.js';
import { DecalSystem } from './decals.js';
import { TracerSystem } from './tracers.js';
import {
  MAIN_VERT, MAIN_FRAG, DEPTH_VERT, DEPTH_FRAG, UNLIT_VERT, UNLIT_FRAG,
} from './shaderlib.js';

export class Renderer {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {object} [opts]
   */
  constructor(canvas, opts = {}) {
    this.canvas = canvas;
    this.gl = new GL(canvas, opts.gl);
    this.g = this.gl.raw;
    this.camera = new Camera();
    this.scene = null;
    this.lights = null;
    this.quality = null;

    this.programs = new ProgramCache(this.gl);
    this.textures = new TextureCache(this.gl);
    this.shadowMap = new ShadowMap(this.gl, 2048);
    this.post = new PostFX(this.gl);
    this.skybox = new Skybox(this.gl, this.camera);
    this.particles = new ParticleSystem(this.gl, this.textures, opts.particles ?? 4096);
    this.decals = new DecalSystem(this.gl, this.textures, opts.decals ?? 320);
    this.tracers = new TracerSystem(this.gl);

    this.frustum = new Frustum();
    this._normalMat = new Float32Array(9);

    this.env = {
      fogColor: new Vec3(0.05, 0.06, 0.12),
      fogNear: 30,
      fogFar: 120,
      ambient: 0.22,
      clearColor: [0.02, 0.03, 0.07, 1],
    };

    this.stats = { drawCalls: 0, triangles: 0, opaque: 0, transparent: 0, particles: 0 };
    this._time = 0;
  }

  setScene(scene) {
    this.scene = scene;
    return this;
  }

  setLights(lights) {
    this.lights = lights;
    return this;
  }

  setEnv(env) {
    Object.assign(this.env, env);
    if (env.fogColor) this.env.fogColor = env.fogColor;
    this.skybox.setEnv(env);
    return this;
  }

  setQuality(quality) {
    this.quality = quality;
    this.post.setQuality(quality);
    if (quality.shadowSize > 0) {
      if (this.shadowMap.size !== quality.shadowSize) {
        this.shadowMap.dispose();
        this.shadowMap = new ShadowMap(this.gl, quality.shadowSize);
      }
    }
    const pr = quality.pixelRatio ?? 1;
    this.resize(window.innerWidth, window.innerHeight, pr);
  }

  resize(cssW, cssH, pixelRatio = 1) {
    this.gl.resize(cssW, cssH, pixelRatio);
    this.camera.setAspect(this.gl.width / this.gl.height);
    this.post.resize(this.gl.width, this.gl.height, pixelRatio);
  }

  /** Render one frame. */
  render() {
    if (!this.scene || !this.lights) return;
    const g = this.g;
    const cam = this.camera;
    cam.updateMatrices();
    this._time += 0.016;

    // ---- 1. Shadow pass
    const shadowsEnabled = this.quality?.shadow === 1 && this.lights.sun.castsShadow;
    let shadowMatrix = null;
    if (shadowsEnabled) {
      const vp = this.shadowMap.begin(this.lights.sun, cam.position, this.lights.sun.shadowSize);
      const depthProg = this.programs.get('depth', (gl) => new ShaderProgram(gl, DEPTH_VERT, DEPTH_FRAG, { aPosition: 0 }, 'depth'));
      depthProg.use();
      depthProg.setMat4('uViewProj', vp);
      const drawShadow = (obj) => {
        if (!obj.visible || !obj.castShadow) return;
        depthProg.setMat4('uModel', obj.matrix());
        obj.mesh.draw(depthProg);
      };
      if (this.scene.static) for (const obj of this.scene.static) drawShadow(obj);
      if (this.scene.dynamic) for (const obj of this.scene.dynamic) drawShadow(obj);
      this.shadowMap.end();
      shadowMatrix = this.shadowMap.viewProj;
    }

    // ---- 2. Scene pass into MSAA target
    this.post.bindSceneTarget();
    const cc = this.env.clearColor;
    g.clearColor(cc[0], cc[1], cc[2], 1);
    g.clear(g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT);
    g.enable(g.DEPTH_TEST);
    g.depthFunc(g.LEQUAL);

    this.skybox.draw();

    this.frustum.setFromMatrix(cam.viewProjMatrix);
    const { opaque, transparent } = this.scene.buildRenderList(this.frustum);

    const sun = this.lights.sun;
    const main = this.programs.get('main', (gl) => new ShaderProgram(gl, MAIN_VERT, MAIN_FRAG, null, 'main'));

    main.use();
    main.setVec3('uCameraPos', cam.position);
    main.set3f('uFogColor', this.env.fogColor.x, this.env.fogColor.y, this.env.fogColor.z);
    main.set1f('uFogNear', this.env.fogNear);
    main.set1f('uFogFar', this.env.fogFar);
    main.set1f('uTime', this._time);
    main.setVec3('uSunDir', sun.direction);
    main.set3f('uSunColor', sun.color.r, sun.color.g, sun.color.b);
    main.set1f('uSunIntensity', sun.intensity);
    main.set1f('uShadowEnabled', shadowsEnabled ? 1 : 0);
    if (shadowsEnabled) {
      this.shadowMap.bind(4);
      main.set1i('uShadowMap', 4);
      main.setMat4('uShadowMatrix', shadowMatrix);
      main.set2f('uShadowTexel', 1 / this.shadowMap.size, 1 / this.shadowMap.size);
      main.set1f('uShadowBias', sun.shadowBias);
    }

    const nearLights = this.lights.nearestTo(cam.position, 4);
    const n = Math.min(nearLights.length, 4);
    for (let i = 0; i < 4; i++) {
      if (i < n) {
        main.set3f(`uPointPos[${i}]`, nearLights[i].position.x, nearLights[i].position.y, nearLights[i].position.z);
        main.set3f(`uPointColor[${i}]`, nearLights[i].color.r, nearLights[i].color.g, nearLights[i].color.b);
        main.set1f(`uPointRange[${i}]`, nearLights[i].range);
        main.set1f(`uPointIntensity[${i}]`, nearLights[i].intensity);
      } else {
        main.set3f(`uPointPos[${i}]`, 0, -9999, 0);
        main.set3f(`uPointColor[${i}]`, 0, 0, 0);
        main.set1f(`uPointRange[${i}]`, 0.1);
        main.set1f(`uPointIntensity[${i}]`, 0);
      }
    }
    main.set1i('uPointCount', n);

    const vp = cam.viewProjMatrix;
    let draws = 0;

    g.enable(g.CULL_FACE);
    g.cullFace(g.BACK);
    g.disable(g.BLEND);
    g.depthMask(true);

    for (const obj of opaque) {
      this._drawMain(main, obj, vp, shadowsEnabled);
      draws++;
    }

    g.enable(g.BLEND);
    g.depthMask(false);
    for (const obj of transparent) {
      const mat = obj.material;
      if (mat.blend === 'additive') {
        g.blendFunc(g.SRC_ALPHA, g.ONE);
      } else {
        g.blendFunc(g.SRC_ALPHA, g.ONE_MINUS_SRC_ALPHA);
      }
      this._drawMain(main, obj, vp, false);
      draws++;
    }
    g.depthMask(true);
    g.disable(g.BLEND);

    this.decals.render(vp);
    this.tracers.render(vp);
    this.particles.render(cam, vp);

    // ---- 3. Resolve + post
    this.post.resolve();
    this.post.state.time = this._time;
    this.post.state.damageFlash = this.screenFx?.damageFlash ?? 0;
    this.post.state.lowHp = this.screenFx?.lowHp ?? 0;
    this.post.composite();

    this.stats.drawCalls = draws + this.particles.batches.length;
    this.stats.opaque = opaque.length;
    this.stats.transparent = transparent.length;
    this.stats.particles = this.particles.activeCount;

    if (this.screenFx) {
      this.screenFx.damageFlash = Math.max(0, this.screenFx.damageFlash - 0.06);
    }
  }

  _drawMain(prog, obj, vp, shadowsEnabled) {
    const g = this.g;
    const mat = obj.material;
    const mesh = obj.mesh;

    if (mat.unlit) {
      const unlit = this.programs.get('unlit', (gl) => new ShaderProgram(gl, UNLIT_VERT, UNLIT_FRAG, null, 'unlit'));
      unlit.use();
      unlit.setMat4('uViewProj', vp);
      unlit.setMat4('uModel', obj.matrix());
      unlit.setColor('uColor', mat.color.r, mat.color.g, mat.color.b, mat.alpha);
      if (mat.texture) {
        this.textures.get(mat.texture, () => makeEmptyTex(this.gl)).bind(0);
        unlit.set1i('uTex', 0);
        unlit.set1f('uHasTex', 1);
      } else {
        unlit.set1f('uHasTex', 0);
      }
      unlit.set3f('uFogColor', this.env.fogColor.x, this.env.fogColor.y, this.env.fogColor.z);
      unlit.set1f('uFogNear', this.env.fogNear);
      unlit.set1f('uFogFar', this.env.fogFar);
      unlit.setVec3('uCameraPos', this.camera.position);
      unlit.set1f('uAdditive', mat.blend === 'additive' ? 1 : 0);
      if (mat.doubleSided) g.disable(g.CULL_FACE);
      mesh.draw(unlit);
      if (mat.doubleSided) g.enable(g.CULL_FACE);
      return;
    }

    prog.use();
    prog.setMat4('uViewProj', vp);
    const model = obj.matrix();
    prog.setMat4('uModel', model);
    normalMatrix(model, this._normalMat);
    prog.setMat3('uNormalMat', this._normalMat);

    prog.setColor('uColor', mat.color.r, mat.color.g, mat.color.b, mat.alpha);
    prog.setColor('uEmissive', mat.emissive.r, mat.emissive.g, mat.emissive.b, mat.emissive.a);
    prog.set1f('uMetalness', mat.metalness);
    prog.set1f('uRoughness', mat.roughness);
    prog.set1f('uAlphaTest', mat.alphaTest);
    prog.set1f('uRimPower', mat.rimPower);
    prog.set1f('uRimStrength', mat.rimStrength);
    prog.set1f('uVertexColorBlend', mat.vertexColorBlend ? 1 : 0);
    prog.set1f('uShadowEnabled', (shadowsEnabled && mat.receiveShadow) ? 1 : 0);

    if (mat.texture) {
      this.textures.get(mat.texture, () => makeEmptyTex(this.gl)).bind(0);
      prog.set1i('uTex', 0);
      prog.set1f('uHasTex', 1);
    } else {
      prog.set1f('uHasTex', 0);
    }
    if (mat.emissiveTexture) {
      this.textures.get(mat.emissiveTexture, () => makeEmptyTex(this.gl)).bind(1);
      prog.set1i('uEmissiveTex', 1);
      prog.set1f('uHasEmissiveTex', 1);
    } else {
      prog.set1f('uHasEmissiveTex', 0);
    }

    if (mat.doubleSided) g.disable(g.CULL_FACE);
    mesh.draw(prog);
    if (mat.doubleSided) g.enable(g.CULL_FACE);
  }

  /** Screen FX hooks (set by the game: { damageFlash, lowHp }). */
  setScreenFx(fx) {
    this.screenFx = fx;
  }

  dispose() {
    this.programs.disposeAll();
    this.textures.disposeAll();
    this.shadowMap.dispose();
    this.post.dispose();
    this.particles.dispose();
    this.decals.dispose();
    this.tracers.dispose();
    this.skybox.dispose();
  }
}

function makeEmptyTex(gl) {
  void gl;
  const c = document.createElement('canvas');
  c.width = 4;
  c.height = 4;
  const x = c.getContext('2d');
  x.fillStyle = '#ffffff';
  x.fillRect(0, 0, 4, 4);
  return c;
}
