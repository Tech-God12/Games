/**
 * VOIDBREAK — Entity.
 *
 * Base class for all simulated objects: player, enemies, projectiles,
 * pickups. Entities are plain objects held by the World; they declare an
 * update method and a few optional hooks (onDeath, onCollide, draw-related
 * data). Rendering is separate: entities carry a render object / model.
 */

import { Vec3 } from '../core/vec3.js';
import { Quat } from '../core/quat.js';

let ENTITY_UID = 1;

export class Entity {
  constructor(opts = {}) {
    this.uid = ENTITY_UID++;
    this.kind = opts.kind ?? 'entity';
    this.position = new Vec3(0, 0, 0);
    this.velocity = new Vec3(0, 0, 0);
    this.quaternion = new Quat().identity();
    this.radius = opts.radius ?? 0.4;
    this.height = opts.height ?? 1.0;
    this.alive = true;
    this.active = true;
    this.dead = false;
    this.friendly = opts.friendly ?? false;
    this.team = opts.team ?? 0;
    this.world = null;
    this.render = null;
    this.flags = new Set();
    this.tags = new Set();
    this.age = 0;

    if (opts.x !== undefined) this.position.x = opts.x;
    if (opts.y !== undefined) this.position.y = opts.y;
    if (opts.z !== undefined) this.position.z = opts.z;
  }

  /** Called by the world each fixed step. Override in subclasses. */
  update(dt) {
    this.age += dt;
  }

  /** Called when removed from the world. */
  onRemove() {
    if (this.render) {
      this.world?.scene?.remove?.(this.render);
    }
  }

  /** Damage entry point; returns actual damage dealt. */
  takeDamage(amount, source = null, opts = {}) {
    if (!this.alive || amount <= 0) return 0;
    const dealt = this.applyDamage(amount, source, opts);
    if (dealt > 0) {
      this.onDamaged?.(dealt, source, opts);
      if (this.health !== undefined && this.health <= 0 && this.alive) {
        this.die(source, opts);
      }
    }
    return dealt;
  }

  /** Subclasses override to actually subtract health. */
  applyDamage(amount, source, opts) {
    this.health = (this.health ?? 100) - amount;
    return amount;
  }

  die(source, opts) {
    this.alive = false;
    this.dead = true;
    this.onDeath?.(source, opts);
  }

  /** World-space "chest" height (for aim etc.). */
  get centerY() {
    return this.position.y + this.height * 0.5;
  }

  get boundsCenter() {
    return this.position.clone().set(this.position.x, this.centerY, this.position.z);
  }

  toString() {
    return `Entity(${this.kind}#${this.uid})`;
  }
}
