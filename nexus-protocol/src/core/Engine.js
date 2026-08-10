// ============================================================================
// Engine.js
// Owns the WebGL renderer, the primary scene/camera, the post-processing
// pipeline (bloom + tone mapping + FXAA), the main animation loop, and
// lifecycle wiring (resize, focus, visibility). Delegates per-frame work to a
// Game instance via update/render callbacks. Quality presets let the player
// trade fidelity for performance. Designed to be the single integration point
// between raw Three.js and the rest of the game.
// ============================================================================

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { Clock, Profiler } from './Clock.js';
import { bus, Channels } from './EventBus.js';
import { clamp } from './MathUtils.js';

/** Graphics quality presets. */
export const Quality = Object.freeze({
  Low: 'low',
  Medium: 'medium',
  High: 'high',
  Ultra: 'ultra',
});

const QUALITY_PARAMS = {
  low:    { dpr: 0.75, bloom: 0.6,  bloomRes: 0.5, toneExp: 1.0, shadows: false, fxaa: true,  aa: false },
  medium: { dpr: 1.0,  bloom: 0.9,  bloomRes: 0.5, toneExp: 1.05, shadows: true,  fxaa: true,  aa: false },
  high:   { dpr: 1.25, bloom: 1.1,  bloomRes: 1.0, toneExp: 1.1, shadows: true,  fxaa: true,  aa: true },
  ultra:  { dpr: 1.5,  bloom: 1.25, bloomRes: 1.0, toneExp: 1.15, shadows: true,  fxaa: true,  aa: true },
};

export class Engine {
  constructor(container, opts = {}) {
    this.container = container || document.getElementById('app');
    this.quality = opts.quality || Quality.High;
    this.params = QUALITY_PARAMS[this.quality];

    // ---- Renderer ----
    this.renderer = new THREE.WebGLRenderer({
      antialias: this.params.aa,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio * this.params.dpr, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = this.params.toneExp;
    this.renderer.shadowMap.enabled = this.params.shadows;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(0x05060a, 1);
    this.container.appendChild(this.renderer.domElement);
    this.renderer.domElement.style.display = 'block';

    // ---- Scene & Camera ----
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x05060a, 0.012);
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.05, 1000);
    this.camera.position.set(0, 1.7, 6);

    // A dedicated scene/camera for the FPS viewmodel (rendered on top, no fog).
    this.viewmodelScene = new THREE.Scene();
    this.viewmodelCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);

    // ---- Clock & profiling ----
    this.clock = new Clock();
    this.profiler = new Profiler();
    this._accumulator = 0;
    this.maxSubSteps = 5;

    // ---- Post-processing ----
    this._buildComposer();

    // ---- State ----
    this.game = null;
    this._running = false;
    this._paused = false;
    this._destroyed = false;
    this._raf = 0;
    this._statsEl = null;

    // ---- Listeners ----
    this._onResize = this._handleResize.bind(this);
    this._onVisibility = this._handleVisibility.bind(this);
    window.addEventListener('resize', this._onResize, { passive: true });
    document.addEventListener('visibilitychange', this._onVisibility);

    bus.on(Channels.DebugToggle, () => this._toggleStats());
  }

  _buildComposer() {
    const size = new THREE.Vector2(window.innerWidth, window.innerHeight);
    this.composer = new EffectComposer(this.renderer);
    this.composer.setPixelRatio(Math.min(window.devicePixelRatio * this.params.dpr, 2));
    this.composer.setSize(window.innerWidth, window.innerHeight);

    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);
    this.renderPass = renderPass;

    // Viewmodel overlay rendered after the world but before bloom so bloom
    // also catches muzzle flashes etc.
    this.viewmodelPass = new RenderPass(this.viewmodelScene, this.viewmodelCamera);
    this.viewmodelPass.clear = false; // don't clear the world buffer
    this.viewmodelPass.clearDepth = true;
    this.composer.addPass(this.viewmodelPass);

    const bloomRes = Math.max(64, Math.floor(Math.min(window.innerWidth, window.innerHeight) * this.params.bloomRes));
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(bloomRes, bloomRes), this.params.bloom, 0.7, 0.0);
    this.composer.addPass(this.bloomPass);

    this.outputPass = new OutputPass();
    this.composer.addPass(this.outputPass);

    if (this.params.fxaa) {
      this.fxaaPass = new ShaderPass(FXAAShader);
      this.fxaaPass.material.uniforms['resolution'].value.set(
        1 / (window.innerWidth * this._dpr()), 1 / (window.innerHeight * this._dpr())
      );
      this.composer.addPass(this.fxaaPass);
    }
  }

  _dpr() { return Math.min(window.devicePixelRatio * this.params.dpr, 2); }

  _handleResize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.renderer.setPixelRatio(this._dpr());
    this.renderer.setSize(w, h);
    this.composer.setPixelRatio(this._dpr());
    this.composer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.viewmodelCamera.aspect = w / h;
    this.viewmodelCamera.updateProjectionMatrix();
    const bloomRes = Math.max(64, Math.floor(Math.min(w, h) * this.params.bloomRes));
    this.bloomPass.setSize(bloomRes, bloomRes);
    if (this.fxaaPass) {
      this.fxaaPass.material.uniforms['resolution'].value.set(1 / (w * this._dpr()), 1 / (h * this._dpr()));
    }
    bus.emit(Channels.EngineResize, { width: w, height: h });
  }

  _handleVisibility() {
    if (document.hidden) bus.emit(Channels.EngineBlur, {});
    else bus.emit(Channels.EngineFocus, {});
  }

  /** Attach a Game instance that drives per-frame simulation & rendering. */
  setGame(game) {
    this.game = game;
    if (game.onAttach) game.onAttach(this);
  }

  /** Begin the main loop. */
  start() {
    if (this._running) return;
    this._running = true;
    this.clock.start();
    bus.emit(Channels.EngineReady, { engine: this });
    this._loop();
  }

  pause() { this._paused = true; }
  resume() { this._paused = false; this.clock._oldTime = this.clock.now() * 1000; }
  get paused() { return this._paused; }

  /** Apply a quality preset at runtime. */
  setQuality(q) {
    if (!QUALITY_PARAMS[q]) return;
    this.quality = q;
    this.params = QUALITY_PARAMS[q];
    this.renderer.antialias = this.params.aa;
    this.renderer.toneMappingExposure = this.params.toneExp;
    this.renderer.shadowMap.enabled = this.params.shadows;
    // rebuild composer for bloom resolution changes
    this.composer.dispose();
    this._buildComposer();
    this._handleResize();
  }

  _loop = () => {
    if (this._destroyed) return;
    this._raf = requestAnimationFrame(this._loop);
    const dt = this.clock.tick();
    this.clock.updateTimers();

    // Fixed-step simulation accumulation
    this._accumulator += dt;
    let steps = 0;
    const fixed = this.clock.fixedStep;
    if (this.game && !this._paused) {
      bus.emit(Channels.FrameBegin, { dt });
      this.profiler.begin('update');
      while (this._accumulator >= fixed && steps < this.maxSubSteps) {
        if (this.game.fixedUpdate) this.game.fixedUpdate(fixed);
        this._accumulator -= fixed;
        steps++;
      }
      // variable update for visuals/animations/input
      if (this.game.update) this.game.update(dt, this.clock.smoothDelta);
      this.profiler.end('update');

      this.profiler.begin('render');
      this._render();
      this.profiler.end('render');
      bus.emit(Channels.FrameEnd, { dt });
      this._updateStats();
    } else if (this.game) {
      // paused: still render a static frame
      this._render();
    }
  };

  _render() {
    this.composer.render(this.clock.smoothDelta);
  }

  _toggleStats() {
    if (this._statsEl) {
      this._statsEl.remove();
      this._statsEl = null;
      return;
    }
    const el = document.createElement('div');
    el.id = 'engineStats';
    el.style.cssText = 'position:fixed;top:8px;left:8px;z-index:600;font:11px/1.5 monospace;' +
      'background:rgba(5,8,14,0.7);padding:6px 10px;border:1px solid rgba(41,231,255,0.3);' +
      'border-radius:6px;color:#9fe7ff;pointer-events:none;text-shadow:0 0 6px rgba(41,231,255,0.4);';
    document.body.appendChild(el);
    this._statsEl = el;
    this._statsAccum = 0;
    this._statsFrames = 0;
  }

  _updateStats() {
    if (!this._statsEl) return;
    this._statsFrames++;
    this._statsAccum += this.clock.rawDelta;
    if (this._statsAccum >= 0.4) {
      const fps = this._statsFrames / this._statsAccum;
      const r = this.profiler.report();
      const upd = r.update ? r.update.avg.toFixed(2) : '0';
      const ren = r.render ? r.render.avg.toFixed(2) : '0';
      const ents = this.game && this.game.world ? this.game.world.size : 0;
      this._statsEl.innerHTML =
        `FPS ${fps.toFixed(0)}<br>` +
        `dt ${(this.clock.rawDelta * 1000).toFixed(1)}ms · scale ${this.clock.timeScale.toFixed(2)}<br>` +
        `update ${upd}ms · render ${ren}ms<br>` +
        `entities ${ents}<br>` +
        `quality ${this.quality} · dpr ${this._dpr().toFixed(2)}`;
      this._statsAccum = 0; this._statsFrames = 0;
      this.profiler.reset();
    }
  }

  /** Tear everything down. */
  destroy() {
    this._destroyed = true;
    cancelAnimationFrame(this._raf);
    window.removeEventListener('resize', this._onResize);
    document.removeEventListener('visibilitychange', this._onVisibility);
    if (this.game && this.game.destroy) this.game.destroy();
    this.composer.dispose();
    this.renderer.dispose();
    if (this._statsEl) this._statsEl.remove();
    bus.clear();
  }
}
