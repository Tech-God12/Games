// ============================================================================
// Arena.js
// Builds and owns the playable stage: floor, boundary wall, cover pillars,
// lighting rig, sky, and biome theming. Exposes collision data (solids AABBs,
// boundsRadius, floorY, center) consumed by movement, AI, and hitscan. Can be
// rebuilt for a different biome or re-randomized for variety between runs.
// ============================================================================

import * as THREE from 'three';
import { getBiome } from './Biomes.js';
import { rng, Random } from '../core/Random.js';
import { clamp, TAU } from '../core/MathUtils.js';

const SKY_VERT = `
  varying vec3 vWorldPos;
  void main() {
    vWorldPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const SKY_FRAG = `
  varying vec3 vWorldPos;
  uniform vec3 uTop;
  uniform vec3 uBottom;
  uniform vec3 uAccent;
  uniform float uTime;
  void main() {
    float h = normalize(vWorldPos).y * 0.5 + 0.5;
    vec3 col = mix(uBottom, uTop, smoothstep(0.0, 0.8, h));
    // subtle horizon glow band
    float band = smoothstep(0.45, 0.5, h) - smoothstep(0.5, 0.58, h);
    col += uAccent * band * 0.25;
    gl_FragColor = vec4(col, 1.0);
  }
`;

export class Arena {
  constructor(scene, assets) {
    this.scene = scene;
    this.assets = assets;
    this.biome = getBiome('neon');
    this.radius = 34;
    this.floorY = 0;
    this.centerX = 0;
    this.centerZ = 0;
    this.circularBounds = true;
    this.boundsRadius = this.radius - 1;
    this.solids = [];
    this.objects = [];
    this.lights = [];
    this.seed = 1;
    this.sky = null;
    this.sun = null;
    this._elapsed = 0;
  }

  setBiome(id) { this.biome = getBiome(id); }

  /** (Re)build the arena geometry & lighting. */
  build(seed = 1) {
    this.seed = seed;
    this.dispose();
    const b = this.biome;
    const scene = this.scene;
    const assets = this.assets;
    const rand = new Random(seed);

    // ---- background & fog ----
    scene.background = new THREE.Color(b.colors.sky);
    scene.fog = new THREE.FogExp2(b.colors.fog, b.fogDensity);

    // ---- sky dome ----
    const skyGeo = new THREE.SphereGeometry(400, 24, 16);
    const skyMat = new THREE.ShaderMaterial({
      uniforms: {
        uTop: { value: new THREE.Color(b.colors.hemiSky) },
        uBottom: { value: new THREE.Color(b.colors.fog) },
        uAccent: { value: new THREE.Color(b.colors.accent1) },
        uTime: { value: 0 },
      },
      vertexShader: SKY_VERT, fragmentShader: SKY_FRAG, side: THREE.BackSide, depthWrite: false,
    });
    this.sky = new THREE.Mesh(skyGeo, skyMat);
    this.sky.frustumCulled = false;
    scene.add(this.sky);
    this.objects.push(this.sky);

    // ---- floor ----
    const floorTex = b.floorStyle === 'hex'
      ? assets.hexTexture(512, '#' + (b.colors.grid & 0xffffff).toString(16).padStart(6, '0'), '#' + (b.colors.glow & 0xffffff).toString(16).padStart(6, '0'))
      : assets.gridTexture(512, '#' + (b.colors.grid & 0xffffff).toString(16).padStart(6, '0'), '#' + (b.colors.glow & 0xffffff).toString(16).padStart(6, '0'));
    floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping;
    floorTex.repeat.set(8, 8);
    const floorGeo = new THREE.CircleGeometry(this.radius, 96);
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTex, color: b.colors.floor, emissive: b.colors.glow, emissiveIntensity: 0.25,
      metalness: 0.5, roughness: 0.6,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
    this.objects.push(floor);
    this.floor = floor;

    // ---- boundary wall (ring) ----
    const wallGeo = new THREE.CylinderGeometry(this.radius, this.radius, 6, 96, 1, true);
    const wallMat = new THREE.MeshStandardMaterial({
      color: b.colors.floor, emissive: b.colors.accent1, emissiveIntensity: 0.8,
      metalness: 0.6, roughness: 0.4, side: THREE.DoubleSide, transparent: true, opacity: 0.5,
    });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.set(this.centerX, 3, this.centerZ);
    wall.receiveShadow = true;
    scene.add(wall);
    this.objects.push(wall);

    // glowing rim ring at floor edge
    const rimGeo = new THREE.TorusGeometry(this.radius - 0.3, 0.08, 8, 128);
    const rimMat = new THREE.MeshBasicMaterial({ color: b.colors.accent1 });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = -Math.PI / 2;
    rim.position.set(this.centerX, 0.06, this.centerZ);
    scene.add(rim);
    this.objects.push(rim);
    this.rim = rim;

    // ---- cover pillars ----
    this._buildPillars(rand, b);

    // ---- decorative orbiting rings ----
    this._buildDecor(rand, b);

    // ---- lighting ----
    this._buildLights(b);

    return this;
  }

  _buildPillars(rand, b) {
    const scene = this.scene;
    const count = 7 + Math.floor(rand.next() * 4);
    const placed = [];
    let attempts = 0;
    while (placed.length < count && attempts < 60) {
      attempts++;
      const a = rand.range(0, TAU);
      const r = rand.range(6, this.radius - 6);
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      // keep clear of center spawn
      if (Math.hypot(x, z) < 5) continue;
      // avoid overlap
      let ok = true;
      for (const p of placed) if (Math.hypot(x - p.x, z - p.z) < 5) { ok = false; break; }
      if (!ok) continue;
      const w = rand.range(1.2, 2.4);
      const h = rand.range(2.5, 5.0);
      const d = rand.range(1.2, 2.4);
      placed.push({ x, z });
      const geo = new THREE.BoxGeometry(w, h, d);
      const mat = new THREE.MeshStandardMaterial({
        color: b.colors.floor, emissive: b.colors.accent2, emissiveIntensity: 0.5,
        metalness: 0.7, roughness: 0.3,
      });
      const pillar = new THREE.Mesh(geo, mat);
      pillar.position.set(x, h / 2, z);
      pillar.castShadow = true; pillar.receiveShadow = true;
      scene.add(pillar);
      this.objects.push(pillar);
      // emissive trim
      const trimGeo = new THREE.BoxGeometry(w + 0.05, 0.1, d + 0.05);
      const trimMat = new THREE.MeshBasicMaterial({ color: b.colors.accent1 });
      const trim = new THREE.Mesh(trimGeo, trimMat);
      trim.position.set(x, h - 0.2, z);
      scene.add(trim);
      this.objects.push(trim);
      // collider AABB
      this.solids.push({
        min: new THREE.Vector3(x - w / 2, 0, z - d / 2),
        max: new THREE.Vector3(x + w / 2, h, z + d / 2),
      });
    }
  }

  _buildDecor(rand, b) {
    const scene = this.scene;
    // floating rotating rings above
    for (let i = 0; i < 3; i++) {
      const ringGeo = new THREE.TorusGeometry(rand.range(2.5, 4), 0.06, 6, 48);
      const ringMat = new THREE.MeshBasicMaterial({ color: i % 2 ? b.colors.accent2 : b.colors.accent1, transparent: true, opacity: 0.7 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(rand.range(-10, 10), rand.range(6, 10), rand.range(-10, 10));
      ring.rotation.x = rand.range(0, Math.PI);
      scene.add(ring);
      this.objects.push(ring);
      this.decor = this.decor || [];
      this.decor.push({ mesh: ring, axis: new THREE.Vector3(rand.sign(), rand.sign(), rand.sign()).normalize(), speed: rand.sign() * rand.range(0.2, 0.6) });
    }
  }

  _buildLights(b) {
    const scene = this.scene;
    const ambient = new THREE.AmbientLight(b.colors.ambient, 0.6);
    scene.add(ambient); this.lights.push(ambient);
    const hemi = new THREE.HemisphereLight(b.colors.hemiSky, b.colors.hemiGround, 0.7);
    scene.add(hemi); this.lights.push(hemi);
    const sun = new THREE.DirectionalLight(b.colors.sun, 1.1);
    sun.position.set(20, 40, 12);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 1; sun.shadow.camera.far = 120;
    sun.shadow.camera.left = -40; sun.shadow.camera.right = 40;
    sun.shadow.camera.top = 40; sun.shadow.camera.bottom = -40;
    sun.shadow.bias = -0.0005;
    scene.add(sun); scene.add(sun.target); this.lights.push(sun); this.sun = sun;
    // colored accent point lights
    const p1 = new THREE.PointLight(b.colors.accent1, 1.2, 60, 1.5); p1.position.set(0, 12, 0); scene.add(p1); this.lights.push(p1);
    const p2 = new THREE.PointLight(b.colors.accent2, 0.8, 50, 1.5); p2.position.set(15, 6, 15); scene.add(p2); this.lights.push(p2);
    const p3 = new THREE.PointLight(b.colors.accent1, 0.8, 50, 1.5); p3.position.set(-15, 6, -15); scene.add(p3); this.lights.push(p3);
  }

  update(dt) {
    this._elapsed += dt;
    if (this.sky) this.sky.material.uniforms.uTime.value = this._elapsed;
    if (this.decor) {
      for (const d of this.decor) {
        d.mesh.rotateOnAxis(d.axis, d.speed * dt);
        d.mesh.position.y += Math.sin(this._elapsed * 0.6 + d.mesh.id) * 0.002;
      }
    }
    if (this.rim) this.rim.material.color.setHSL((this._elapsed * 0.05) % 1, 0.8, 0.6);
  }

  /** Find a random spawn point on the arena ring (for enemies). */
  spawnPoint(rand, minR = 12, maxR = 28) {
    const a = rand.range(0, TAU);
    const r = rand.range(minR, Math.min(maxR, this.boundsRadius - 1));
    return { x: this.centerX + Math.cos(a) * r, z: this.centerZ + Math.sin(a) * r, y: this.floorY };
  }

  /** Random interior point (for pickups/props). */
  interiorPoint(rand, maxR = 20) {
    const a = rand.range(0, TAU);
    const r = rand.range(0, maxR);
    return { x: this.centerX + Math.cos(a) * r, z: this.centerZ + Math.sin(a) * r, y: this.floorY };
  }

  dispose() {
    for (const o of this.objects) {
      this.scene.remove(o);
      o.traverse?.((c) => { if (c.geometry) c.geometry.dispose(); if (c.material) { if (Array.isArray(c.material)) c.material.forEach(m => m.dispose()); else c.material.dispose(); } });
    }
    for (const l of this.lights) this.scene.remove(l);
    this.objects = []; this.lights = []; this.solids = []; this.decor = null;
    this.sun = null; this.sky = null; this.floor = null; this.rim = null;
  }
}
