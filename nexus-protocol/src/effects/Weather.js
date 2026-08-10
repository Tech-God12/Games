// ============================================================================
// Weather.js
// Ambient biome weather: a large-bounded particle system that drifts embers,
// snow, void motes, dust, sparks, or crystals depending on the biome. Adds
// atmosphere and motion to the arena without impacting gameplay.
// ============================================================================

import * as THREE from 'three';
import { clamp, lerp, TAU } from '../core/MathUtils.js';

const WEATHER_VERT = `
  attribute float aSize;
  attribute float aAlpha;
  attribute float aPhase;
  varying float vAlpha;
  uniform float uTime;
  void main() {
    vAlpha = aAlpha;
    vec3 p = position;
    p.x += sin(uTime * 0.5 + aPhase) * 1.5;
    p.z += cos(uTime * 0.4 + aPhase * 1.3) * 1.5;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = aSize * (300.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;
const WEATHER_FRAG = `
  varying float vAlpha;
  uniform sampler2D uTex;
  uniform vec3 uColor;
  void main() {
    vec4 tex = texture2D(uTex, gl_PointCoord);
    gl_FragColor = vec4(uColor, vAlpha) * tex;
    if (gl_FragColor.a <= 0.01) discard;
  }
`;

const Presets = {
  neon: { color: 0x29e7ff, count: 400, size: 2.5, drift: 0.5, fall: 0.2, alpha: 0.5 },
  void: { color: 0x8a5bff, count: 500, size: 2.0, drift: 0.8, fall: 0.1, alpha: 0.6 },
  crystal: { color: 0x4fffd0, count: 350, size: 3.0, drift: 0.4, fall: 0.5, alpha: 0.6 },
  inferno: { color: 0xff6633, count: 500, size: 3.0, drift: 0.6, fall: -0.6, alpha: 0.7 }, // embers rise
  frost: { color: 0xffffff, count: 600, size: 2.5, drift: 0.7, fall: 1.2, alpha: 0.7 }, // snow falls
  cyber: { color: 0xff3df0, count: 300, size: 2.0, drift: 0.3, fall: 0.3, alpha: 0.4 },
};

export class WeatherSystem {
  constructor(scene, assets, bounds = 34) {
    this.scene = scene;
    this.assets = assets;
    this.bounds = bounds;
    this.current = null;
    this.points = null;
    this.material = null;
    this.geo = null;
    this.data = null;
    this._time = 0;
  }

  setBiome(id) {
    const preset = Presets[id] || Presets.neon;
    if (this.current === id) return;
    this.current = id;
    this._build(preset);
  }

  _build(preset) {
    if (this.points) { this.scene.remove(this.points); this.geo.dispose(); this.material.dispose(); }
    const n = preset.count;
    const positions = new Float32Array(n * 3);
    const sizes = new Float32Array(n);
    const alphas = new Float32Array(n);
    const phases = new Float32Array(n);
    this.data = { px: new Float32Array(n), py: new Float32Array(n), pz: new Float32Array(n), vy: new Float32Array(n), preset };
    for (let i = 0; i < n; i++) {
      const x = (Math.random() - 0.5) * this.bounds * 2;
      const y = Math.random() * 18;
      const z = (Math.random() - 0.5) * this.bounds * 2;
      positions[i * 3] = x; positions[i * 3 + 1] = y; positions[i * 3 + 2] = z;
      this.data.px[i] = x; this.data.py[i] = y; this.data.pz[i] = z;
      this.data.vy[i] = preset.fall + (Math.random() - 0.5) * 0.3;
      sizes[i] = preset.size * (0.5 + Math.random());
      alphas[i] = preset.alpha * (0.5 + Math.random() * 0.5);
      phases[i] = Math.random() * TAU;
    }
    this.geo = new THREE.BufferGeometry();
    this.geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    this.geo.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1));
    this.geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
    this.geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);
    this.material = new THREE.ShaderMaterial({
      uniforms: { uTex: { value: this.assets.particleTexture() }, uColor: { value: new THREE.Color(preset.color) }, uTime: { value: 0 } },
      vertexShader: WEATHER_VERT, fragmentShader: WEATHER_FRAG,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    this.points = new THREE.Points(this.geo, this.material);
    this.points.frustumCulled = false;
    this.scene.add(this.points);
  }

  update(dt) {
    if (!this.data) return;
    this._time += dt;
    this.material.uniforms.uTime.value = this._time;
    const { px, py, pz, vy, preset } = this.data;
    const pos = this.geo.attributes.position.array;
    const n = px.length;
    const b = this.bounds;
    for (let i = 0; i < n; i++) {
      py[i] += vy[i] * dt;
      // recycle when out of vertical bounds
      if (preset.fall > 0 && py[i] < 0) { py[i] = 18; px[i] = (Math.random() - 0.5) * b * 2; pz[i] = (Math.random() - 0.5) * b * 2; }
      else if (preset.fall < 0 && py[i] > 18) { py[i] = 0; px[i] = (Math.random() - 0.5) * b * 2; pz[i] = (Math.random() - 0.5) * b * 2; }
      pos[i * 3] = px[i]; pos[i * 3 + 1] = py[i]; pos[i * 3 + 2] = pz[i];
    }
    this.geo.attributes.position.needsUpdate = true;
  }

  dispose() {
    if (this.points) { this.scene.remove(this.points); this.geo.dispose(); this.material.dispose(); }
    this.points = null; this.data = null;
  }
}
