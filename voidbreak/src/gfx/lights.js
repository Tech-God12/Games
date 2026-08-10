/**
 * VOIDBREAK — Lights.
 *
 * One directional "sun" light (with shadow map support) plus a pool of
 * dynamic point lights. The renderer picks the N closest point lights to the
 * camera each frame and feeds them to the shader.
 */

import { Vec3 } from '../core/vec3.js';

export const MAX_POINT_LIGHTS = 4;

export class DirectionalLight {
  constructor(opts = {}) {
    /** Direction TOWARD the light (normalized automatically). */
    this.direction = new Vec3(0.5, 0.8, 0.3).normalize();
    if (opts.direction) this.direction.copy(opts.direction).normalize();
    this.color = opts.color ?? { r: 1, g: 0.97, b: 0.9 };
    this.intensity = opts.intensity ?? 1.4;
    this.shadowSize = opts.shadowSize ?? 60;
    this.shadowBias = opts.shadowBias ?? 0.004;
    this.enabled = opts.enabled ?? true;
    this.castsShadow = opts.castsShadow ?? true;
  }
}

export class PointLight {
  constructor(opts = {}) {
    this.position = new Vec3(0, 0, 0);
    if (opts.position) this.position.copy(opts.position);
    this.color = opts.color ?? { r: 1, g: 1, b: 1 };
    this.intensity = opts.intensity ?? 1;
    this.range = opts.range ?? 8;
    this.active = opts.active ?? false;
    this.life = opts.life ?? Infinity;
    this.maxLife = this.life;
    this.flicker = opts.flicker ?? 0;
  }

  get dead() {
    return this.life !== Infinity && this.life <= 0;
  }

  update(dt) {
    if (this.life !== Infinity) {
      this.life -= dt;
      if (this.life < 0) this.life = 0;
    }
  }
}

/**
 * LightManager owns the sun and a fixed pool of point lights.
 */
export class LightManager {
  constructor() {
    this.sun = new DirectionalLight();
    this.points = [];
    for (let i = 0; i < 16; i++) {
      this.points.push(new PointLight());
    }
    this._index = 0;
  }

  /** Spawn a temporary point light from the pool. Returns the light. */
  spawnPointLight(opts = {}) {
    const light = this.points[this._index];
    this._index = (this._index + 1) % this.points.length;
    if (opts.position) light.position.copy(opts.position);
    light.color = opts.color ?? { r: 1, g: 1, b: 1 };
    light.intensity = opts.intensity ?? 1;
    light.range = opts.range ?? 8;
    light.life = opts.life ?? 0.15;
    light.maxLife = light.life;
    light.flicker = opts.flicker ?? 0;
    light.active = true;
    return light;
  }

  update(dt) {
    for (const p of this.points) {
      if (p.active) {
        p.update(dt);
        if (p.dead) p.active = false;
      }
    }
  }

  /** Collect the closest `count` active lights to a position. */
  nearestTo(pos, count = MAX_POINT_LIGHTS) {
    const active = [];
    for (const p of this.points) {
      if (p.active) active.push(p);
    }
    active.sort((a, b) => a.position.distanceToSq(pos) - b.position.distanceToSq(pos));
    return active.slice(0, count);
  }

  clearDynamic() {
    for (const p of this.points) {
      p.active = false;
      p.life = 0;
    }
  }
}
