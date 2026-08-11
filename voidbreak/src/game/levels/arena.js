/**
 * VOIDBREAK — Arena.
 *
 * Builds the actual meshes/materials for an ArenaLayout, registers colliders
 * with the collision world and render objects with the scene, and sets the
 * biome environment on the renderer.
 */

import { Mesh } from '../../gfx/mesh.js';
import { Material } from '../../gfx/material.js';
import { RenderObject } from '../../gfx/scene.js';
import {
  buildBox, buildPlaneXZ, buildCylinder, buildCone, buildIcosphere,
} from '../../gfx/geometry_builders.js';
import { getBiome } from './biomes.js';
import { ArenaLayout, ARENA_SIZE } from './generator.js';
import { Color } from '../../core/color.js';
import { Vec3 } from '../../core/vec3.js';
import { texFloorPlate, texMetalPanel, texScorch, texEnergyOrb } from '../../gfx/canvas_textures.js';

export class Arena {
  /**
   * @param {import('../../gfx/gl.js').GL} gl
   * @param {import('../../gfx/scene.js').Scene} scene
   * @param {import('../world.js').World} world
   */
  constructor(gl, scene, world) {
    this.gl = gl;
    this.scene = scene;
    this.world = world;
    this.layout = null;
    this.biome = null;
    this.staticObjects = [];
    this._meshCache = new Map();
  }

  _mesh(key, builder) {
    if (!this._meshCache.has(key)) {
      this._meshCache.set(key, new Mesh(this.gl, builder(), {}));
    }
    return this._meshCache.get(key);
  }

  /** Generate and build an arena. */
  build(seed = 1, biomeIndex = 0) {
    this.layout = new ArenaLayout(seed, biomeIndex).generate();
    this.biome = getBiome(biomeIndex);
    this._buildEnvironment();
    return this;
  }

  /** Build all meshes, register colliders + objects. */
  _buildEnvironment() {
    const layout = this.layout;
    const b = this.biome;

    this.world.collision.clear();
    const s = layout.size;
    this.world.collision.setBounds(-s, -s, s, s, 9);
    for (const obs of layout.obstacles) {
      const hw = obs.w / 2;
      const hd = obs.d / 2;
      this.world.collision.addBox(obs.x - hw, 0, obs.z - hd, obs.x + hw, obs.h, obs.z + hd);
    }

    // --- Floor
    const floorMesh = this._mesh(`floor_${b.id}`, () => buildPlaneXZ(s * 2, s * 2, { uvScale: s / 4 }));
    const floorMat = new Material({
      texture: `floor_${b.id}`,
      color: '#888888',
      metalness: 0.15,
      roughness: 0.9,
    });
    const floor = new RenderObject(floorMesh, floorMat, { castShadow: false, boundsRadius: s * 2 });
    floor.setPosition(0, 0, 0);
    this.scene.addStatic(floor);
    this.staticObjects.push(floor);

    // --- Walls
    const wallMesh = this._mesh(`wall_${b.id}`, () => buildBox(0.5, 0.5, 0.5));
    const wallMat = new Material({
      texture: `wall_${b.id}`,
      color: '#aaaaaa',
      metalness: 0.3,
      roughness: 0.8,
    });
    for (const obs of layout.obstacles) {
      if (obs.type === 'wall' || obs.type === 'tower') {
        const obj = new RenderObject(wallMesh, wallMat, { boundsRadius: 6 });
        obj.setPosition(obs.x, obs.h / 2, obs.z);
        obj.setScale(obs.w, obs.h, obs.d);
        this.scene.addStatic(obj);
        this.staticObjects.push(obj);
      }
    }

    // --- Cover obstacles
    for (const obs of layout.obstacles) {
      if (obs.type === 'wall' || obs.type === 'tower') continue;
      let meshKey = 'box';
      let mat = new Material({ color: '#3a4252', metalness: 0.35, roughness: 0.75 });
      if (obs.type === 'pillar') {
        meshKey = 'pillar';
        mat = new Material({ color: '#2a3345', metalness: 0.4, roughness: 0.7, texture: `wall_${b.id}` });
      } else if (obs.type === 'platform') {
        mat = new Material({ color: '#222a38', metalness: 0.4, roughness: 0.7 });
      } else if (obs.type === 'crate') {
        mat = new Material({ color: '#4a4232', metalness: 0.25, roughness: 0.85 });
      }
      let mesh;
      if (meshKey === 'pillar') {
        mesh = this._mesh('pillar', () => buildCylinder(0.75, 1, 10, { caps: true }));
      } else {
        mesh = this._mesh('cover_box', () => buildBox(0.5, 0.5, 0.5));
      }
      const obj = new RenderObject(mesh, mat, { boundsRadius: 4 });
      if (meshKey === 'pillar') {
        obj.setPosition(obs.x, obs.h / 2, obs.z);
        obj.setScale(0.75, obs.h, 0.75);
      } else {
        obj.setPosition(obs.x, obs.h / 2, obs.z);
        obj.setScale(obs.w, obs.h, obs.d);
      }
      this.scene.addStatic(obj);
      this.staticObjects.push(obj);
    }

    this._buildDecor();
    this._buildStaticLights();
  }

  _buildDecor() {
    const b = this.biome;
    const layout = this.layout;
    const glowColor = b.accentColor;

    const makeGlowMat = () => new Material({
      color: new Color(0, 0, 0, 1),
      emissive: new Color(glowColor[0], glowColor[1], glowColor[2], 1.6),
      unlit: true,
      blend: 'additive',
      castShadow: false,
    });

    for (const d of layout.decor) {
      switch (d.type) {
        case 'core': {
          const mesh = this._mesh('core_sphere', () => buildIcosphere(0.8, 2));
          const mat = new Material({
            color: '#111a22',
            emissive: new Color(glowColor[0] * 0.6, glowColor[1] * 0.6, glowColor[2] * 0.6, 0.8),
            rimPower: 3, rimStrength: 1.2, metalness: 0.2, roughness: 0.4,
          });
          const obj = new RenderObject(mesh, mat, { castShadow: false, boundsRadius: 2 });
          obj.setPosition(d.x, 3.4 * d.scale, d.z);
          obj.setScale(0.8 * d.scale, 0.8 * d.scale, 0.8 * d.scale);
          this.scene.addStatic(obj);
          this.staticObjects.push(obj);
          const glow = new RenderObject(this._mesh('glow_orb', () => buildIcosphere(0.5, 1)), makeGlowMat(), { castShadow: false, boundsRadius: 2 });
          glow.setPosition(d.x, 3.4 * d.scale, d.z);
          glow.setScale(1.4 * d.scale, 1.4 * d.scale, 1.4 * d.scale);
          this.scene.addStatic(glow);
          this.staticObjects.push(glow);
          break;
        }
        case 'pillar_glow': {
          const strip = new RenderObject(this._mesh('glow_strip', () => buildBox(0.5, 0.5, 0.5)), makeGlowMat(), { castShadow: false, boundsRadius: 2 });
          strip.setPosition(d.x, 1.6, d.z);
          strip.setScale(0.55, 1.0, 0.55);
          this.scene.addStatic(strip);
          this.staticObjects.push(strip);
          break;
        }
        case 'crate_light': {
          const l = new RenderObject(this._mesh('crate_light', () => buildBox(0.5, 0.5, 0.5)), makeGlowMat(), { castShadow: false, boundsRadius: 1 });
          l.setPosition(d.x, 0.92, d.z);
          l.setScale(0.4, 0.06, 0.4);
          this.scene.addStatic(l);
          this.staticObjects.push(l);
          break;
        }
        case 'crystal': {
          const mat = new Material({
            color: d.color ?? b.accent,
            emissive: new Color(glowColor[0] * 0.4, glowColor[1] * 0.4, glowColor[2] * 0.4, 0.5),
            metalness: 0.1, roughness: 0.2, rimPower: 4, rimStrength: 1.4,
          });
          const mesh = this._mesh(`crystal_${d.color ?? b.id}`, () => buildCone(0.5, 1, 6, { cap: false }));
          const obj = new RenderObject(mesh, mat, { boundsRadius: 3 });
          obj.setPosition(d.x, d.scale * 1.1, d.z);
          obj.setScale(d.scale, d.scale * 2.2, d.scale);
          obj.quaternion.setFromAxisAngle({ x: 0, y: 1, z: 0 }, d.rot);
          this.scene.addStatic(obj);
          this.staticObjects.push(obj);
          break;
        }
        case 'pipe': {
          const mat = new Material({ color: '#333a44', metalness: 0.6, roughness: 0.5 });
          const mesh = this._mesh('pipe', () => buildCylinder(0.22, 1, 8, { caps: false }));
          const obj = new RenderObject(mesh, mat, { boundsRadius: 3 });
          obj.setPosition(d.x, 2.2, d.z);
          obj.setScale(1, 4.4, 1);
          obj.quaternion.setFromAxisAngle({ x: 0, y: 1, z: 0 }, d.rot);
          this.scene.addStatic(obj);
          this.staticObjects.push(obj);
          break;
        }
        case 'light': {
          const mat = new Material({
            color: new Color(0, 0, 0, 1),
            emissive: new Color(glowColor[0], glowColor[1], glowColor[2], 2.2),
            unlit: true, blend: 'additive', castShadow: false,
          });
          const mesh = this._mesh('light_sprite', () => buildIcosphere(0.25, 1));
          const obj = new RenderObject(mesh, mat, { castShadow: false, boundsRadius: 1 });
          obj.setPosition(d.x, 5.6, d.z);
          this.scene.addStatic(obj);
          this.staticObjects.push(obj);
          break;
        }
        case 'obelisk': {
          const mat = new Material({ color: '#1a2230', metalness: 0.3, roughness: 0.6, texture: `wall_${b.id}` });
          const mesh = this._mesh('obelisk', () => buildBox(0.5, 0.5, 0.5));
          const obj = new RenderObject(mesh, mat, { boundsRadius: 3 });
          obj.setPosition(d.x, 2.2, d.z);
          obj.setScale(1.6, 4.4, 1.6);
          this.scene.addStatic(obj);
          this.staticObjects.push(obj);
          const glow = new RenderObject(this._mesh('obelisk_glow', () => buildBox(0.5, 0.5, 0.5)), makeGlowMat(), { castShadow: false, boundsRadius: 2 });
          glow.setPosition(d.x, 4.0, d.z);
          glow.setScale(0.5, 0.5, 0.5);
          this.scene.addStatic(glow);
          this.staticObjects.push(glow);
          break;
        }
        case 'tower': {
          const mat = new Material({ color: '#2a3242', metalness: 0.4, roughness: 0.7, texture: `wall_${b.id}` });
          const mesh = this._mesh('tower', () => buildBox(0.5, 0.5, 0.5));
          const obj = new RenderObject(mesh, mat, { boundsRadius: 4 });
          obj.setPosition(d.x, 4.5, d.z);
          obj.setScale(3.4, 9, 3.4);
          this.scene.addStatic(obj);
          this.staticObjects.push(obj);
          break;
        }
        case 'scorch': {
          const mat = new Material({ color: '#000000', alpha: 0.5, blend: 'alpha', castShadow: false, depthWrite: false, texture: 'scorch' });
          const mesh = this._mesh('scorch_quad', () => buildPlaneXZ(1, 1));
          const obj = new RenderObject(mesh, mat, { castShadow: false, boundsRadius: 2 });
          obj.setPosition(d.x, 0.02, d.z);
          obj.setScale(d.scale, 1, d.scale);
          obj.quaternion.setFromAxisAngle({ x: 0, y: 1, z: 0 }, d.rot);
          this.scene.addStatic(obj);
          this.staticObjects.push(obj);
          break;
        }
        case 'spawn_pad': {
          const mat = new Material({
            color: new Color(0.05, 0.05, 0.1, 1),
            emissive: new Color(glowColor[0] * 0.4, glowColor[1] * 0.4, glowColor[2] * 0.4, 0.6),
            castShadow: false,
          });
          const mesh = this._mesh('pad', () => buildPlaneXZ(2.4, 2.4, { uvScale: 1 }));
          const obj = new RenderObject(mesh, mat, { castShadow: false, boundsRadius: 2 });
          obj.setPosition(d.x, 0.015, d.z);
          this.scene.addStatic(obj);
          this.staticObjects.push(obj);
          break;
        }
        default:
          break;
      }
    }
  }

  _buildStaticLights() {
    const lm = this.world.lightManager;
    if (!lm) return;
    for (const l of this.layout.lights) {
      lm.spawnPointLight({
        position: new Vec3(l.x, l.y, l.z),
        color: { r: l.color[0], g: l.color[1], b: l.color[2] },
        range: l.range,
        intensity: l.intensity,
        life: Infinity,
      });
    }
  }

  /** Apply the biome's atmosphere to the renderer. */
  applyEnvironment(renderer) {
    const b = this.biome;
    renderer.setEnv({
      fogColor: new Vec3(b.fog[0], b.fog[1], b.fog[2]),
      fogNear: b.fogNear,
      fogFar: b.fogFar,
      zenith: new Vec3(b.skyZenith[0], b.skyZenith[1], b.skyZenith[2]),
      horizon: new Vec3(b.skyHorizon[0], b.skyHorizon[1], b.skyHorizon[2]),
      sunDir: new Vec3(b.sunDir[0], b.sunDir[1], b.sunDir[2]),
      sunColor: new Vec3(b.sunColor[0], b.sunColor[1], b.sunColor[2]),
      sunIntensity: b.sunIntensity,
      starIntensity: b.starIntensity,
      nebula: new Vec3(b.nebula[0], b.nebula[1], b.nebula[2]),
      nebulaColor: new Vec3(b.nebula[0], b.nebula[1], b.nebula[2]),
      accent: b.accent,
    });
    renderer.lights?.sun?.direction?.set(b.sunDir[0], b.sunDir[1], b.sunDir[2]).normalize();
    renderer.lights.sun.color = { r: b.sunColor[0], g: b.sunColor[1], b: b.sunColor[2] };
  }

  /** Register the procedural textures for this biome. */
  registerTextures(renderer) {
    const b = this.biome;
    const tex = renderer.textures;
    tex.get(`floor_${b.id}`, () => texFloorPlate(512, 7 + this.layout.seed % 100, [b.floor, b.floorLine, b.floorGrime]), { wrap: 'repeat', anisotropy: 8 });
    tex.get(`wall_${b.id}`, () => texMetalPanel(512, 13 + this.layout.seed % 100, [b.wall, b.wallLine, [0.03, 0.03, 0.05]]), { wrap: 'repeat', anisotropy: 8 });
    tex.get('scorch', () => texScorch(128, 3), { mipmaps: false });
    tex.get('energy_orb', () => texEnergyOrb(128, 5, b.accentColor), { mipmaps: false });
  }

  /** A good enemy spawn point (far from the player, clear of obstacles). */
  spawnPoint(px = 0, pz = 0) {
    for (let attempt = 0; attempt < 8; attempt++) {
      const p = this.layout.spawnPointAwayFrom(px, pz, 12);
      if (!this._insideObstacle(p.x, p.z)) return p;
    }
    return this.layout.spawnPoints[0] ?? { x: 0, z: 0 };
  }

  _insideObstacle(x, z) {
    for (const box of this.world.collision.obstacles) {
      const pad = 0.6;
      if (x > box.min.x - pad && x < box.max.x + pad &&
          z > box.min.z - pad && z < box.max.z + pad) {
        return true;
      }
    }
    return false;
  }

  /** Player start position. */
  get playerStart() {
    return this.layout.playerStart;
  }

  get size() {
    return ARENA_SIZE;
  }

  /** Obstacle rectangles for the minimap (x, z, w, d). */
  minimapRects() {
    return this.layout.obstacles
      .filter((o) => o.type !== 'wall' && o.type !== 'tower')
      .map((o) => ({ x: o.x, z: o.z, w: o.w, d: o.d }));
  }

  get boundarySize() {
    return this.layout.size;
  }

  /** Remove everything from the scene (for arena rebuilds). */
  destroy() {
    for (const obj of this.staticObjects) {
      this.scene.remove(obj);
    }
    this.staticObjects.length = 0;
    this._meshCache.clear();
  }
}
