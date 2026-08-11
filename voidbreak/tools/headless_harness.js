/**
 * VOIDBREAK — Headless Node harness.
 *
 * Runs the real game in Node with a WebGL2 mock + DOM stubs + pure-JS 2D
 * canvas stub. Used to catch runtime errors (imports, boot, simulation,
 * render path) that `node --check` and unit tests miss.
 *
 * Usage: node tools/headless_harness.js [seconds] [mode] [difficulty]
 */

const errors = [];
const warnings = [];

/** Pure-JS 2D context stub covering the API the texture generators use. */
function make2dContext() {
  const grad = () => ({ addColorStop() {} });
  const state = {
    fillStyle: '#000', strokeStyle: '#000', lineWidth: 1,
    globalCompositeOperation: 'source-over', font: '', textAlign: 'left',
    globalAlpha: 1,
  };
  const imageData = (w, h) => ({ width: w, height: h, data: new Uint8ClampedArray(w * h * 4) });
  const ctx = {
    canvas: null,
    get fillStyle() { return state.fillStyle; },
    set fillStyle(v) { state.fillStyle = v; },
    get strokeStyle() { return state.strokeStyle; },
    set strokeStyle(v) { state.strokeStyle = v; },
    get lineWidth() { return state.lineWidth; },
    set lineWidth(v) { state.lineWidth = v; },
    get globalCompositeOperation() { return state.globalCompositeOperation; },
    set globalCompositeOperation(v) { state.globalCompositeOperation = v; },
    get font() { return state.font; },
    set font(v) { state.font = v; },
    get textAlign() { return state.textAlign; },
    set textAlign(v) { state.textAlign = v; },
    get globalAlpha() { return state.globalAlpha; },
    set globalAlpha(v) { state.globalAlpha = v; },
    fillRect() {}, strokeRect() {}, clearRect() {},
    beginPath() {}, moveTo() {}, lineTo() {}, closePath() {}, stroke() {}, fill() {},
    arc() {}, arcTo() {}, rect() {}, ellipse() {}, bezierCurveTo() {}, quadraticCurveTo() {},
    save() {}, restore() {}, translate() {}, rotate() {}, scale() {}, setTransform() {}, resetTransform() {},
    clip() {}, drawImage() {}, setLineDash() {}, getLineDash: () => [],
    measureText: () => ({ width: 0 }),
    fillText() {}, strokeText() {},
    createRadialGradient: grad, createLinearGradient: grad,
    createImageData: (w, h) => imageData(w, h),
    getImageData: (x, y, w, h) => imageData(w, h),
    putImageData() {},
  };
  return ctx;
}

class ClassList {
  constructor() { this.set = new Set(); }
  add(...c) { c.forEach((x) => this.set.add(x)); }
  remove(...c) { c.forEach((x) => this.set.delete(x)); }
  toggle(c, force) {
    if (force === undefined) {
      if (this.set.has(c)) { this.set.delete(c); return false; }
      this.set.add(c); return true;
    }
    if (force) this.set.add(c); else this.set.delete(c);
    return !!force;
  }
  contains(c) { return this.set.has(c); }
}

const GL_CONSTANTS = new Map();
function glConst(name) {
  if (!GL_CONSTANTS.has(name)) GL_CONSTANTS.set(name, GL_CONSTANTS.size + 1);
  return GL_CONSTANTS.get(name);
}

let glMock = null;
function getGlMock() {
  if (glMock) return glMock;
  let proxy = null;
  const g = {
    canvas: { width: 1280, height: 720 },
    getExtension: (name) => {
      if (name === 'EXT_texture_filter_anisotropic') return { MAX_TEXTURE_MAX_ANISOTROPY_EXT: glConst('ANISO'), TEXTURE_MAX_ANISOTROPY_EXT: glConst('TMAE') };
      return null;
    },
    getParameter: (p) => {
      if (p === proxy.MAX_TEXTURE_SIZE) return 4096;
      if (p === proxy.MAX_VERTEX_ATTRIBS) return 16;
      if (p === proxy.MAX_DRAW_BUFFERS) return 4;
      if (p === proxy.MAX_TEXTURE_IMAGE_UNITS) return 16;
      if (p === proxy.SAMPLES) return 0;
      if (p === proxy.VERSION) return 'WebGL 2.0 (mock)';
      return 0;
    },
    getShaderParameter: (sh, p) => (p === proxy.COMPILE_STATUS ? true : 0),
    getProgramParameter: (p, q) => (q === proxy.LINK_STATUS ? true : q === proxy.ACTIVE_UNIFORMS || q === proxy.ACTIVE_ATTRIBUTES ? 0 : 1),
    getShaderInfoLog: () => '',
    getProgramInfoLog: () => '',
    getUniformLocation: () => ({}),
    getAttribLocation: () => 0,
    checkFramebufferStatus: () => glConst('FRAMEBUFFER_COMPLETE'),
    getError: () => glConst('NO_ERROR'),
    readPixels: () => {},
    createShader: () => ({}),
    createProgram: () => ({}),
    createBuffer: () => ({}),
    createVertexArray: () => ({}),
    createTexture: () => ({}),
    createFramebuffer: () => ({}),
    createRenderbuffer: () => ({}),
  };
  const methods = [
    'shaderSource', 'compileShader', 'deleteShader', 'attachShader', 'bindAttribLocation',
    'linkProgram', 'deleteProgram', 'useProgram', 'uniform1f', 'uniform1i', 'uniform2f',
    'uniform3f', 'uniform4f', 'uniformMatrix3fv', 'uniformMatrix4fv', 'bindBuffer',
    'bufferData', 'bufferSubData', 'bindVertexArray', 'vertexAttribPointer',
    'enableVertexAttribArray', 'vertexAttribDivisor', 'drawElements', 'drawArrays',
    'drawArraysInstanced', 'bindTexture', 'texImage2D', 'texParameteri', 'texParameterf',
    'generateMipmap', 'pixelStorei', 'activeTexture', 'bindFramebuffer',
    'framebufferTexture2D', 'framebufferRenderbuffer', 'deleteFramebuffer',
    'deleteRenderbuffer', 'deleteTexture', 'deleteBuffer', 'deleteVertexArray',
    'enable', 'disable', 'clear', 'clearColor', 'clearDepth', 'viewport',
    'depthFunc', 'depthMask', 'cullFace', 'blendFunc', 'blendFuncSeparate',
    'lineWidth', 'polygonOffset', 'drawBuffers', 'readBuffer', 'blitFramebuffer',
    'bindRenderbuffer', 'renderbufferStorage', 'renderbufferStorageMultisample',
  ];
  for (const m of methods) g[m] = () => {};
  proxy = new Proxy(g, {
    get(target, prop) {
      if (prop in target) return target[prop];
      if (typeof prop === 'string' && prop.length > 0) {
        const c = prop.toUpperCase() === prop ? glConst(prop) : undefined;
        if (c !== undefined) return c;
        return () => {};
      }
      return undefined;
    },
  });
  glMock = proxy;
  return proxy;
}

function makeAudioNode() {
  const param = () => ({ value: 0, setValueAtTime() {}, linearRampToValueAtTime() {}, exponentialRampToValueAtTime() {}, setTargetAtTime() {} });
  return new Proxy({}, {
    get(t, prop) {
      if (prop === 'connect' || prop === 'disconnect' || prop === 'start' || prop === 'stop') return () => {};
      if (prop === 'gain' || prop === 'frequency' || prop === 'detune' || prop === 'Q' || prop === 'pan' || prop === 'playbackRate') return param();
      if (prop === 'state') return 'running';
      if (prop === 'currentTime') return 0;
      if (prop === 'destination') return {};
      if (prop === 'sampleRate') return 48000;
      return t;
    },
  });
}

function makeAudioContext() {
  return {
    currentTime: 0,
    sampleRate: 48000,
    destination: {},
    state: 'running',
    createGain: makeAudioNode,
    createOscillator: makeAudioNode,
    createBufferSource: makeAudioNode,
    createBiquadFilter: makeAudioNode,
    createDynamicsCompressor: makeAudioNode,
    createStereoPanner: makeAudioNode,
    createBuffer: () => ({ getChannelData: () => new Float32Array(10) }),
    resume: () => {},
    suspend: () => {},
  };
}

function makeFakeElement() {
  const classList = new ClassList();
  const el = {
    tagName: 'div',
    children: [],
    style: {},
    dataset: {},
    classList,
    _2d: { _get() { return ctx2d; } },
    appendChild(child) {
      const node = typeof child === 'string' || typeof child === 'number'
        ? { nodeValue: String(child), children: [], appendChild() {}, append() {}, remove() {} }
        : child;
      this.children.push(node);
      if (typeof node === 'object') {
        node.parentNode = this;
        node.parentElement = this;
      }
      return node;
    },
    append(...cs) { cs.forEach((c) => this.appendChild(c)); },
    removeChild(child) { const i = this.children.indexOf(child); if (i >= 0) this.children.splice(i, 1); },
    replaceChildren(...cs) { this.children.length = 0; cs.forEach((c) => this.appendChild(c)); },
    remove() {},
    addEventListener() {},
    removeEventListener() {},
    setAttribute() {},
    getAttribute() { return null; },
    getContext(type) {
      if (type === '2d') return this._2d._get();
      if (type === 'webgl2') return getGlMock();
      return null;
    },
    querySelector(sel) {
      if (sel.startsWith('.')) {
        const cls = sel.slice(1);
        const walk = (node) => {
          if (node.classList?.contains?.(cls)) return node;
          for (const c of node.children ?? []) {
            const found = walk(c);
            if (found) return found;
          }
          return null;
        };
        return walk(this);
      }
      return null;
    },
    querySelectorAll(sel) {
      const out = [];
      if (sel.startsWith('.')) {
        const cls = sel.slice(1);
        const walk = (node) => {
          if (node.classList?.contains?.(cls)) out.push(node);
          for (const c of node.children ?? []) walk(c);
        };
        walk(this);
      }
      return out;
    },
    getBoundingClientRect() { return { left: 0, top: 0, width: 1280, height: 720 }; },
    requestPointerLock() {},
    focus() {},
    click() {},
    contains() { return false; },
    get className() { return [...classList.set].join(' '); },
    set className(v) {
      classList.set.clear();
      String(v).split(/\s+/).filter(Boolean).forEach((c) => classList.set.add(c));
    },
    set textContent(v) {
      el._textContent = String(v);
      this.children.length = 0;
    },
    get textContent() { return el._textContent ?? ''; },
  };
  return el;
}

const ctx2d = make2dContext();
const elements = new Map();
function getElement(id) {
  if (!elements.has(id)) elements.set(id, makeFakeElement());
  return elements.get(id);
}

const rafQueue = [];
let nextTimestamp = 0;

globalThis.window = globalThis;
globalThis.addEventListener = () => {};
globalThis.removeEventListener = () => {};
globalThis.document = {
  getElementById: getElement,
  createElement: (tag) => {
    if (tag === 'canvas') {
      const el = makeFakeElement();
      el.tagName = 'canvas';
      el.width = 1280;
      el.height = 720;
      return el;
    }
    return makeFakeElement();
  },
  createElementNS: () => makeFakeElement(),
  addEventListener() {},
  removeEventListener() {},
  head: makeFakeElement(),
  body: makeFakeElement(),
  hidden: false,
  pointerLockElement: null,
  exitPointerLock() {},
  visibilityState: 'visible',
};
globalThis.requestAnimationFrame = (cb) => {
  rafQueue.push(cb);
  return rafQueue.length;
};
globalThis.cancelAnimationFrame = () => {};
Object.defineProperty(globalThis, 'navigator', { value: { getGamepads: () => [] }, configurable: true });
globalThis.AudioContext = makeAudioContext;
globalThis.webkitAudioContext = makeAudioContext;
globalThis.performance = globalThis.performance ?? { now: () => nextTimestamp };
globalThis.location = { search: '', href: 'http://localhost/' };

// ------------------------------------------------------------------ boot

const { Game } = await import('../src/game/game.js');

const canvas = getElement('game-canvas');
canvas.tagName = 'canvas';
canvas.width = 1280;
canvas.height = 720;

// ------------------------------------------------------------------ run

const seconds = Number(process.argv[2] ?? 8);
const mode = process.argv[3] ?? 'endless';
const difficulty = process.argv[4] ?? 'operative';

let captureConsole = true;
const origError = console.error;
console.error = (...args) => {
  const msg = args.map((a) => (typeof a === 'string' ? a : a?.message ?? String(a))).join(' ');
  if (captureConsole) {
    if (!errors.includes(msg)) errors.push(msg);
    if (errors.length > 200) errors.length = 200;
  }
  origError(...args);
};

let game;
try {
  game = new Game(canvas);
  window.__VOIDBREAK__ = game;
  console.log('[harness] game constructed');

  game.start();
  game.startRun(mode, difficulty);
  console.log(`[harness] run started: mode=${mode} difficulty=${difficulty}`);

  const { spawnEnemy } = await import('../src/game/enemies/enemy_db.js');
  const cluster = ['grunt', 'grunt', 'runner', 'shooter', 'shooter', 'brute', 'drone', 'spitter', 'swarmling', 'swarmling', 'grunt', 'shieldbearer'];
  for (let c = 0; c < cluster.length; c++) {
    const a = (c / cluster.length) * Math.PI * 2;
    const e = spawnEnemy(game.world, cluster[c], {
      x: game.player.position.x + Math.cos(a) * 8,
      z: game.player.position.z + Math.sin(a) * 8,
      difficulty: { hpScale: 1, damageScale: 1, speedScale: 1, scoreScale: 1 },
    });
    e.initVisual?.(game.scene);
  }

  const steps = Math.max(1, Math.round(seconds * 60));
  const t0 = performance.now();
  for (let i = 0; i < steps; i++) {
    nextTimestamp += 1000 / 60;
    const cb = rafQueue.shift();
    if (cb) cb(nextTimestamp);

    // Simple combat bot: face the nearest enemy, move toward it, fire.
    if (i % 6 === 0) {
      const p = game.player;
      if (p && !p.dead) {
        const target = game.world.nearestEnemy(p.position.x, p.position.y, p.position.z, 80);
        game.input.keys.delete('KeyW');
        game.input.keys.delete('KeyS');
        game.input.keys.delete('KeyA');
        game.input.keys.delete('KeyD');
        game.input.mouseButtons.add('Mouse0');
        if (target) {
          const dx = target.position.x - p.position.x;
          const dz = target.position.z - p.position.z;
          const dy = (target.position.y + target.height * 0.5) - (p.position.y + 1.4);
          const hDist = Math.hypot(dx, dz) || 1;
          game.cameraRig.yaw = Math.atan2(-dx, -dz);
          game.cameraRig.pitch = Math.atan2(dy, hDist);
          const dist = hDist;
          if (dist > 10) {
            game.input.keys.add('KeyW');
          } else if (dist > 6) {
            game.input.keys.add('KeyW');
          } else {
            game.input.mouseButtons.add('Mouse2');
          }
          if (dist < 3 && i % 30 === 0) game.input.keys.add('Space');
        }
      }
    }
    if (i % 6 === 3) {
      game.input.keys.delete('Space');
    }
    if (i === 120) game.input.keys.add('Digit2');
    if (i === 150) game.input.keys.delete('Digit2');
    if (i === 210) game.input.keys.add('KeyR');
    if (i === 270) game.input.keys.delete('KeyR');
    if (i === 330) game.input.keys.add('KeyX');
    if (i === 360) game.input.keys.delete('KeyX');
    if (i === 420) game.input.keys.add('Digit3');
    if (i === 450) game.input.keys.delete('Digit3');
  }
  const elapsed = (performance.now() - t0) / 1000;
  const fps = steps / Math.max(0.001, elapsed);

  const info = {
    state: game.state,
    wave: game.director?.currentWave ?? 0,
    directorState: game.director?.state ?? 'none',
    enemies: game.world.enemyCount,
    entities: game.world.entityCount,
    particles: game.renderer.particles.activeCount,
    decals: game.renderer.decals.count,
    tracers: game.renderer.tracers.count,
    score: game.score?.total ?? 0,
    hp: game.player?.health ?? 0,
    shield: game.player?.shield ?? 0,
    weapons: game.player?.weapons.length ?? 0,
    ammo: game.player?.currentWeapon?.ammoInMag ?? 0,
    fps: Math.round(fps),
    renderCalls: game.renderer.stats?.drawCalls ?? 0,
    kills: game.stats?.kills ?? 0,
    damageDealt: Math.round(game.stats?.damageDealt ?? 0),
    damageTaken: Math.round(game.stats?.damageTaken ?? 0),
    shotsFired: game.stats?.shotsFired ?? 0,
    shotsHit: game.stats?.shotsHit ?? 0,
    enemiesSpawned: game.director?.stats?.enemiesSpawned ?? 0,
  };
  console.log('[harness] run info:', JSON.stringify(info, null, 2));

  game.destroy();
} catch (err) {
  errors.push(`[fatal] ${err?.stack ?? err}`);
  console.error('[harness] FATAL:', err);
}

console.log('----------------------------------------------');
console.log(`[harness] errors: ${errors.length}`);
captureConsole = false;
for (const e of errors) console.log(`  ✗ ${e}`);
process.exit(errors.length > 0 ? 1 : 0);
