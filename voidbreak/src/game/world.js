/**
 * VOIDBREAK — World.
 *
 * Owns every simulated entity and the static collision world, steps the
 * simulation at a fixed rate, and provides spatial queries. Also routes
 * world-level events onto the EventBus.
 */

import { EventBus } from '../core/eventbus.js';
import { CollisionWorld } from './collision.js';
import { SpatialHash } from '../core/geometry.js';
import { profiler } from '../core/profiler.js';
import { createProjectile } from './combat/projectiles.js';

export class World {
  constructor(opts = {}) {
    this.bus = opts.bus ?? new EventBus();
    this.collision = new CollisionWorld();
    this.scene = opts.scene ?? null;
    this.entities = [];
    this.projectiles = [];
    this.pickups = [];
    this.enemies = [];
    this.players = [];
    this._removals = [];
    this._additions = [];
    this.spatial = new SpatialHash(3);
    this.time = 0;
    this.stepCount = 0;

    this.onEntityAdded = opts.onEntityAdded ?? null;
    this.onEntityRemoved = opts.onEntityRemoved ?? null;
  }

  get bounds() {
    return this.collision.bounds;
  }

  addEntity(entity, opts = {}) {
    entity.world = this;
    if (opts.spawn !== false) {
      this._additions.push(entity);
    } else {
      this.entities.push(entity);
    }
    this._classify(entity);
    return entity;
  }

  _classify(entity) {
    if (entity.kind === 'enemy') {
      if (!this.enemies.includes(entity)) this.enemies.push(entity);
    } else if (entity.kind === 'projectile') {
      if (!this.projectiles.includes(entity)) this.projectiles.push(entity);
    } else if (entity.kind === 'pickup') {
      if (!this.pickups.includes(entity)) this.pickups.push(entity);
    } else if (entity.kind === 'player') {
      if (!this.players.includes(entity)) this.players.push(entity);
    }
  }

  _unclassify(entity) {
    const arr = entity.kind === 'enemy' ? this.enemies
      : entity.kind === 'projectile' ? this.projectiles
        : entity.kind === 'pickup' ? this.pickups
          : entity.kind === 'player' ? this.players
            : null;
    if (arr) {
      const i = arr.indexOf(entity);
      if (i >= 0) arr.splice(i, 1);
    }
  }

  removeEntity(entity) {
    if (!entity || entity.world !== this) return;
    this._removals.push(entity);
  }

  /** Spawn a projectile entity (see Projectile opts). */
  spawnProjectile(opts) {
    return createProjectile(this, opts);
  }

  /** Flush pending add/remove queues and step one fixed tick. */
  step(dt) {
    this.time += dt;
    this.stepCount++;
    this._flush();

    this.spatial.clear();
    for (const e of this.entities) {
      if (!e.active) continue;
      this.spatial.insert(e, e.position.x, e.position.y, e.position.z, e.radius);
    }

    for (const e of this.entities) {
      if (!e.active) continue;
      try {
        e.update(dt);
      } catch (err) {
        console.error(`[world] error updating ${e}`, err);
        e.active = false;
      }
      if (!e.position.isFinite()) {
        console.error(`[world] ${e} has non-finite position`, JSON.stringify(e.position));
        e.active = false;
        e.alive = false;
        this._removals.push(e);
      }
    }

    this._flush();
  }

  _flush() {
    for (const e of this._additions) {
      if (!this.entities.includes(e)) {
        this.entities.push(e);
        this.onEntityAdded?.(e);
      }
    }
    this._additions.length = 0;
    for (const e of this._removals) {
      const i = this.entities.indexOf(e);
      if (i >= 0) this.entities.splice(i, 1);
      this._unclassify(e);
      e.onRemove?.();
      this.onEntityRemoved?.(e);
    }
    this._removals.length = 0;
  }

  /** Query entities near a point (radius). */
  query(x, z, radius, out = []) {
    return this.spatial.query(x, z, radius, out);
  }

  /** Query enemies within radius of a point. */
  queryEnemies(x, z, radius, out = []) {
    const found = this.spatial.query(x, z, radius, out);
    const res = [];
    for (const e of found) {
      if (e.kind === 'enemy' && e.alive) res.push(e);
    }
    return res;
  }

  /** Find nearest enemy to a point within radius. */
  nearestEnemy(x, y, z, radius = Infinity) {
    let best = null;
    let bestD = radius * radius;
    for (const e of this.enemies) {
      if (!e.alive) continue;
      const d = (e.position.x - x) ** 2 + (e.position.z - z) ** 2;
      if (d < bestD) {
        bestD = d;
        best = e;
      }
    }
    return best;
  }

  /** Reset everything (new run). */
  reset() {
    for (const e of this.entities) {
      try {
        e.onRemove?.();
      } catch { /* ignore */ }
    }
    this.entities.length = 0;
    this.enemies.length = 0;
    this.projectiles.length = 0;
    this.pickups.length = 0;
    this.players.length = 0;
    this._additions.length = 0;
    this._removals.length = 0;
    this.collision.clear();
    this.time = 0;
    this.stepCount = 0;
  }

  get enemyCount() {
    return this.enemies.filter((e) => e.alive).length;
  }

  get entityCount() {
    return this.entities.length;
  }
}
