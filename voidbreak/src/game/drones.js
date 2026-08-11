/**
 * VOIDBREAK — DroneCompanion.
 *
 * The combat drone perk: a small flying helper that orbits the player and
 * fires at the nearest enemy. Upgrades make it hit harder or duplicate it.
 * A short-lived "turret" variant deploys on kills.
 */

import { Vec3 } from '../core/vec3.js';
import { playSfx } from '../audio/sfx.js';

export class DroneCompanion {
  /**
   * @param {import('./game.js').Game} game
   * @param {number} x spawn x
   * @param {number} z spawn z
   * @param {object} [opts] {turret, life}
   */
  constructor(game, x, z, opts = {}) {
    this.game = game;
    this.world = game.world;
    this.position = new Vec3(x, 1.8, z);
    this.velocity = new Vec3();
    this.turret = opts.turret ?? false;
    this.life = opts.life ?? Infinity;
    this.age = 0;
    this.dead = false;
    this.fireTimer = 0.5;
    this.orbitAngle = Math.random() * Math.PI * 2;
    this.orbitRadius = this.turret ? 0 : 2.2;
    this.damage = this.turret ? 10 : 8 * this.game.droneDamageMult;
    this.fireInterval = this.turret ? 0.8 : 0.4;
    this.model = null;
    this._buildVisual();
  }

  _buildVisual() {
    const gl = this.game.renderer.gl;
    const { Model } = requireModel();
    const { RenderObject } = requireScene();
    const { Mesh } = requireMesh();
    const { Material } = requireMaterial();
    const { buildIcosphere, buildCylinder } = requireGeo();
    const { Color } = requireColor();

    this.model = new Model(gl, { name: 'drone' });
    const coreMat = new Material({ color: new Color(0.15, 0.2, 0.3, 1), metalness: 0.4, roughness: 0.5, rimPower: 3, rimStrength: 1.2 });
    const glowMat = new Material({ color: new Color(0, 0, 0, 1), emissive: new Color(0.2, 0.9, 1, 2), unlit: true, blend: 'additive' });
    const ringMat = new Material({ color: new Color(0.2, 0.25, 0.35, 1), metalness: 0.6, roughness: 0.4 });

    const core = new RenderObject(new Mesh(gl, buildIcosphere(0.14, 1)), coreMat, { castShadow: false, boundsRadius: 1 });
    const glow = new RenderObject(new Mesh(gl, buildIcosphere(0.2, 1)), glowMat, { castShadow: false, boundsRadius: 1 });
    const ring = new RenderObject(new Mesh(gl, buildCylinder(0.3, 0.05, 12, { caps: false })), ringMat, { castShadow: false, boundsRadius: 1 });
    ring.quaternion.setFromAxisAngle({ x: 1, y: 0, z: 0 }, Math.PI / 2);
    ring.position.y = 0.05;

    this.model.addPart('core', core, { position: new Vec3(0, 0, 0) });
    this.model.addPart('glow', glow, { position: new Vec3(0, 0, 0) });
    this.model.addPart('ring', ring, { position: new Vec3(0, 0, 0) });
    this.model.setPosition(this.position.x, this.position.y, this.position.z);
    this.model.updateWorld();
  }

  remove() {
    this.dead = true;
    if (this.model) {
      for (const obj of this.model.objects) {
        this.game.scene.remove(obj);
      }
    }
  }

  update(dt) {
    this.age += dt;
    if (this.turret && this.age >= this.life) {
      this.remove();
      return;
    }
    const player = this.game.player;
    if (!player || player.dead) {
      this.remove();
      return;
    }

    this.orbitAngle += dt * 1.6;
    const targetX = player.position.x + Math.cos(this.orbitAngle) * this.orbitRadius;
    const targetZ = player.position.z + Math.sin(this.orbitAngle) * this.orbitRadius;
    const targetY = player.position.y + 1.6 + Math.sin(this.age * 2.4) * 0.25;
    this.position.x += (targetX - this.position.x) * Math.min(1, dt * 4);
    this.position.z += (targetZ - this.position.z) * Math.min(1, dt * 4);
    this.position.y += (targetY - this.position.y) * Math.min(1, dt * 4);

    this.fireTimer -= dt;
    if (this.fireTimer <= 0) {
      const target = this.world.nearestEnemy(this.position.x, this.position.y, this.position.z, 18);
      if (target) {
        this.fireTimer = this.fireInterval;
        this._shoot(target);
      } else {
        this.fireTimer = 0.2;
      }
    }

    if (this.model) {
      this.model.setPosition(this.position.x, this.position.y, this.position.z);
      this.model.updateWorld();
    }
  }

  _shoot(target) {
    const origin = this.position.clone();
    const dir = target.boundsCenter.clone().sub(origin).normalize();
    const range = 22;
    const hit = this.world.collision.raycast(origin, dir, range);
    let hitT = hit ? hit.t : range;
    let hitEnemy = null;
    for (const e of this.world.enemies) {
      if (!e.alive || e === target) continue;
      if (e.position.distanceTo(origin) > range) continue;
      const t = droneRayEntity(origin, dir, e);
      if (t !== null && t < hitT) {
        hitT = t;
        hitEnemy = e;
      }
    }
    const tt = droneRayEntity(origin, dir, target);
    if (tt !== null && tt < hitT) {
      hitT = tt;
      hitEnemy = target;
    }
    if (hitEnemy) {
      hitEnemy.takeDamage(this.damage, this.game.player, { element: 'energy', sourcePos: origin, weapon: null });
      const end = origin.clone().addScaled(dir, hitT);
      this.game.tracers.add({
        x1: origin.x, y1: origin.y, z1: origin.z,
        x2: end.x, y2: end.y, z2: end.z,
        color: [0.35, 0.95, 1], width: 2, life: 0.1,
      });
      this.game.hud?.addDamageNumber(this.damage, new Vec3(hitEnemy.position.x, hitEnemy.position.y + hitEnemy.height * 0.6, hitEnemy.position.z));
    } else {
      const end = origin.clone().addScaled(dir, hitT);
      this.game.tracers.add({
        x1: origin.x, y1: origin.y, z1: origin.z,
        x2: end.x, y2: end.y, z2: end.z,
        color: [0.35, 0.95, 1], width: 1.5, life: 0.08,
      });
    }
    if (this.turret) playSfx('gun.smg', { x: origin.x, y: origin.y, z: origin.z, vol: 0.25 });
  }
}

function droneRayEntity(origin, dir, entity) {
  const cx = entity.position.x;
  const cy = entity.centerY;
  const cz = entity.position.z;
  const r = entity.radius + 0.2;
  const ocx = origin.x - cx;
  const ocy = origin.y - cy;
  const ocz = origin.z - cz;
  const b = ocx * dir.x + ocy * dir.y + ocz * dir.z;
  const c = ocx * ocx + ocy * ocy + ocz * ocz - r * r;
  if (c > 0 && b > 0) return null;
  const disc = b * b - c;
  if (disc < 0) return null;
  const t = -b - Math.sqrt(disc);
  return t > 0 ? t : null;
}

import { Model } from '../gfx/model.js';
import { RenderObject } from '../gfx/scene.js';
import { Mesh } from '../gfx/mesh.js';
import { Material } from '../gfx/material.js';
import { buildIcosphere, buildCylinder } from '../gfx/geometry_builders.js';
import { Color } from '../core/color.js';
function requireModel() { return { Model }; }
function requireScene() { return { RenderObject }; }
function requireMesh() { return { Mesh }; }
function requireMaterial() { return { Material }; }
function requireGeo() { return { buildIcosphere, buildCylinder }; }
function requireColor() { return { Color }; }
