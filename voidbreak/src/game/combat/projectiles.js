/**
 * VOIDBREAK — Projectiles.
 *
 * Pooled projectile entities: rockets, plasma bolts, grenades, cryo shards.
 * Handles travel, gravity, bouncing, fuses, splash detonation, entity hits
 * and world hits, spawning VFX/audio through the world's event bus.
 */

import { Entity } from '../entity.js';
import { Vec3 } from '../../core/vec3.js';
import { rayEntity } from '../weapons/kinds.js';
import { computeDamage } from './damage.js';
import { playSfx } from '../../audio/sfx.js';

export class Projectile extends Entity {
  constructor(opts = {}) {
    super({ kind: 'projectile', radius: opts.radius ?? 0.15, ...opts });
    this.owner = opts.owner ?? null;
    this.speed = opts.speed ?? 20;
    this.damage = opts.damage ?? 10;
    this.splashRadius = opts.splashRadius ?? 0;
    this.splashDamage = opts.splashDamage ?? 0;
    this.element = opts.element ?? 'kinetic';
    this.gravity = opts.gravity ?? 0;
    this.life = opts.life ?? 3;
    this.age = 0;
    this.fuse = opts.fuse ?? null;
    this.bouncy = opts.bouncy ?? false;
    this.bounceFactor = opts.bounceFactor ?? 0.5;
    this.bounces = opts.bounces ?? 0;
    this.homing = opts.homing ?? false;
    this.pierce = opts.pierce ?? 0;
    this.bounceCount = 0;
    this.color = opts.color ?? '#ffd166';
    this.glowColor = opts.glowColor ?? '#ffb000';
    this.onHit = opts.onHit ?? null;
    this.trailTimer = 0;
    this._dir = new Vec3(0, 0, -1);
    if (opts.dir) {
      this._dir.copy(opts.dir).normalize();
      this.velocity.copy(this._dir).mulScalar(this.speed);
    }
    if (opts.velocity) this.velocity.copy(opts.velocity);
    this.detonated = false;
  }

  get dir() {
    return this._dir;
  }

  update(dt) {
    super.update(dt);
    this.age += dt;

    if (this.fuse !== null) {
      this.fuse -= dt;
      if (this.fuse <= 0) {
        this.detonate(null, null);
        return;
      }
    }
    if (this.age >= this.life) {
      this._expire();
      return;
    }

    if (this.homing) {
      const target = this.world?.nearestEnemy(this.position.x, this.position.y, this.position.z, 25);
      if (target) {
        const to = target.boundsCenter.clone().sub(this.position).normalize();
        this._dir.lerp(to, 1 - Math.exp(-3 * dt)).normalize();
        this.velocity.copy(this._dir).mulScalar(this.speed);
      }
    }

    this.velocity.y -= this.gravity * dt;
    this.position.addScaled(this.velocity, dt);
    if (this.gravity > 0) {
      this._dir.copy(this.velocity).normalize();
    }

    this.trailTimer -= dt;
    if (this.trailTimer <= 0) {
      this.trailTimer = 0.03;
      this._emitTrail();
    }

    if (this.position.y <= 0 && this.gravity > 0) {
      if (this.bouncy && this.bounceCount < this.bounces) {
        this.position.y = 0;
        this.velocity.y = Math.abs(this.velocity.y) * this.bounceFactor;
        this.velocity.x *= 0.8;
        this.velocity.z *= 0.8;
        this.bounceCount++;
        playSfx('hit.wall', { x: this.position.x, y: this.position.y, z: this.position.z, vol: 0.3 });
      } else {
        this.detonate(null, { normal: new Vec3(0, 1, 0) });
        return;
      }
    }

    const step = this.velocity.length() * dt;
    if (step > 0) {
      const hit = this.world.collision.raycast(this.position, this._dir, step);
      if (hit) {
        this.position.set(hit.x, hit.y, hit.z);
        if (this.bouncy && this.bounceCount < this.bounces) {
          const n = hit.normal;
          const d = this.velocity.dot(n);
          this.velocity.addScaled(n, -2 * d).mulScalar(this.bounceFactor);
          this._dir.copy(this.velocity).normalize();
          this.bounceCount++;
          playSfx('hit.wall', { x: this.position.x, y: this.position.y, z: this.position.z, vol: 0.3 });
        } else {
          this.detonate(null, hit);
          return;
        }
      }
    }

    if (!this.detonated) {
      const targets = this.world.queryEnemies(this.position.x, this.position.z, this.speed * dt + 2);
      for (const e of targets) {
        if (!e.alive || e === this.owner) continue;
        const t = rayEntity(this.position, this._dir, e, step + 0.1);
        if (t !== null) {
          if (this.pierce > 0) {
            this.pierce--;
            this._applyHit(e, t);
            continue;
          }
          this.detonate(e, null);
          return;
        }
      }
    }
  }

  _applyHit(entity, t) {
    const hitPos = this.position.clone().addScaled(this._dir, t);
    const { amount, crit } = computeDamage(
      { damage: this.damage, element: this.element, critChance: 0.05, critMult: 1.6, range: t, falloffStart: 1000, falloffEnd: 1001 },
      { armor: entity.armor ?? 0, shield: entity.shield ?? 0 },
    );
    entity.takeDamage(amount, this.owner, {
      element: this.element,
      crit,
      sourcePos: hitPos,
      weapon: null,
      knockback: this.bouncy ? 3 : 2,
      projectile: this,
    });
    this.onHit?.(this, entity, { x: hitPos.x, y: hitPos.y, z: hitPos.z });
    this.world.bus.emit('fx.projectile_hit', { x: hitPos.x, y: hitPos.y, z: hitPos.z, element: this.element, entity });
  }

  detonate(entity, worldHit) {
    if (this.detonated) return;
    this.detonated = true;
    const pos = this.position.clone();
    if (this.splashRadius > 0) {
      this._explode(pos, entity);
    } else if (entity) {
      this._applyHit(entity, 0.1);
    }
    if (worldHit && this.splashRadius <= 0) {
      this.world.bus.emit('fx.impact_world', {
        x: worldHit.x, y: worldHit.y, z: worldHit.z,
        normal: worldHit.normal ?? new Vec3(0, 1, 0),
        element: this.element,
      });
      playSfx('hit.wall', { x: pos.x, y: pos.y, z: pos.z, vol: 0.35 });
    }
    this.world.removeEntity(this);
  }

  _explode(pos, directHitEntity) {
    const radius = this.splashRadius;
    const maxDmg = this.splashDamage || this.damage;
    const enemies = this.world.queryEnemies(pos.x, pos.z, radius + 3);
    for (const e of enemies) {
      if (!e.alive) continue;
      const dist = e.position.distanceTo(pos);
      if (dist > radius + e.radius) continue;
      const falloff = 1 - (dist / (radius + e.radius));
      const dmg = maxDmg * (0.25 + 0.75 * falloff);
      const isDirect = e === directHitEntity;
      const { amount, crit } = computeDamage(
        { damage: dmg * (isDirect ? 1.3 : 1), element: this.element, critChance: 0.03, critMult: 1.4, range: dist, falloffStart: radius, falloffEnd: radius + 1 },
        { armor: e.armor ?? 0, shield: e.shield ?? 0 },
      );
      e.takeDamage(amount, this.owner, {
        element: this.element,
        crit,
        sourcePos: pos,
        weapon: null,
        knockback: this.bouncy ? 9 : 5,
        splash: true,
        projectile: this,
      });
      this.onHit?.(this, e, { x: pos.x, y: pos.y, z: pos.z, splash: true });
    }
    this.world.bus.emit('fx.explosion', {
      x: pos.x, y: pos.y, z: pos.z,
      radius: radius * 1.4,
      element: this.element,
      intensity: Math.min(1, radius / 6),
    });
    const snd = radius > 5 ? 'explosion.large' : radius > 3 ? 'explosion.medium' : 'explosion.small';
    playSfx(snd, { x: pos.x, y: pos.y, z: pos.z });
    this.world.bus.emit('cam.shake', { amount: Math.min(1, radius / 8), duration: 0.4 });
  }

  _expire() {
    this.world.bus.emit('fx.projectile_expire', { x: this.position.x, y: this.position.y, z: this.position.z, element: this.element });
    this.world.removeEntity(this);
  }

  _emitTrail() {
    this.world.bus.emit('fx.projectile_trail', {
      x: this.position.x, y: this.position.y, z: this.position.z,
      color: this.glowColor,
      size: this.radius * 3,
    });
  }
}

/** Factory used by the world. */
export function createProjectile(world, opts) {
  const proj = new Projectile(opts);
  world.addEntity(proj);
  return proj;
}
