/**
 * VOIDBREAK — Enemy (base class).
 *
 * Shared enemy behavior: health/armor/shields, elemental status effects,
 * knockback, facing, procedural part animation (legs/arms/hover), headshots,
 * death dissolve + drops. Archetypes extend this class and configure the
 * `behavior` object consumed by the Brain.
 */

import { Entity } from '../entity.js';
import { Vec3 } from '../../core/vec3.js';
import { Brain } from '../ai/brain.js';
import { Senses } from '../ai/senses.js';
import * as steering from '../ai/steering.js';
import { computeDamage, makeStatus, tickStatus } from '../combat/damage.js';
import { playSfx } from '../../audio/sfx.js';

export class Enemy extends Entity {
  constructor(def, world, opts = {}) {
    super({
      kind: 'enemy',
      radius: def.radius ?? 0.5,
      height: def.height ?? 1.6,
      ...opts,
    });
    this.world = world;
    this.def = def;
    this.id = def.id;
    this.name = def.name;

    this.baseHealth = def.health ?? 60;
    this.health = this.baseHealth;
    this.maxHealth = this.baseHealth;
    this.armor = def.armor ?? 0;
    this.shield = def.shield ?? 0;
    this.maxShield = this.shield;
    this.speed = def.speed ?? 3.5;
    this.damage = def.damage ?? 10;
    this.xpValue = def.xpValue ?? 1;
    this.scoreValue = def.scoreValue ?? 100;
    this.wallProbe = def.wallProbe ?? 1.3;
    this.wallAvoidWeight = def.wallAvoidWeight ?? 1;

    this.behavior = {
      attackStyle: def.attackStyle ?? 'melee',
      attackRange: def.attackRange ?? 2.2,
      preferredRange: def.preferredRange ?? 10,
      strafeRange: def.strafeRange ?? 18,
      attackCooldown: def.attackCooldown ?? 1.2,
      special: def.special ?? null,
      specialRange: def.specialRange ?? 8,
      specialCooldown: def.specialCooldown ?? 8,
    };
    this.attackCooldown = Math.random() * 0.5;

    this.senses = new Senses(this, {
      visionRange: def.visionRange ?? 32,
      fovDeg: def.fovDeg ?? 150,
      hearingRange: def.hearingRange ?? 26,
    });
    this.alwaysAware = def.alwaysAware ?? false;
    this.brain = new Brain(this);
    this.aiModule = steering;
    this.lastKnownTarget = new Vec3();

    this.facing = new Vec3(0, 0, -1);
    this.turnSpeed = def.turnSpeed ?? 8;

    this.statuses = new Map();

    this.deathProgress = 0;
    this.deathVel = new Vec3();
    this.deathSpin = 0;

    this.visual = def.visual ?? 'grunt';
    this.model = null;
    this.modelScale = def.modelScale ?? 1;
    this.animPhase = Math.random() * 100;
    this.flashTimer = 0;
    this.attackAnim = 0;

    this.spawnTimer = def.spawnTime ?? 0.4;
    this.spawnScale = 0;

    this.knockbackVel = new Vec3();

    this.killedBy = null;
    this.killTime = 0;
  }

  /** Called after being added to the world — builds visuals. */
  initVisual(scene) {
    void scene;
  }

  getFacing() {
    return this.facing;
  }

  faceTowards(target, dt) {
    const dx = target.x - this.position.x;
    const dz = target.z - this.position.z;
    const len = Math.hypot(dx, dz);
    if (len < 0.001) return;
    const targetFacingX = dx / len;
    const targetFacingZ = dz / len;
    const t = Math.min(1, this.turnSpeed * dt);
    this.facing.x += (targetFacingX - this.facing.x) * t;
    this.facing.z += (targetFacingZ - this.facing.z) * t;
    const fl = Math.hypot(this.facing.x, this.facing.z) || 1;
    this.facing.x /= fl;
    this.facing.z /= fl;
    this.quaternion.setFromEulerYXZ(Math.atan2(-this.facing.x, -this.facing.z), 0, 0);
  }

  // ------------------------------------------------------------ damage

  applyDamage(amount, source, opts = {}) {
    if (!this.alive) return 0;
    const { amount: finalAmount } = computeDamage(
      { damage: amount, element: opts.element ?? 'kinetic', critChance: 0, range: 0, falloffStart: 0, falloffEnd: 0 },
      { armor: this.armor, shield: this.shield },
    );
    let remaining = finalAmount;
    if (this.shield > 0) {
      const s = Math.min(this.shield, remaining);
      this.shield -= s;
      remaining -= s;
      if (this.shield <= 0) this.world.bus.emit('fx.shield_break', { x: this.position.x, y: this.position.y + this.height * 0.7, z: this.position.z });
    }
    this.health -= remaining;
    this.flashTimer = 0.08;
    this.brain.onDamaged(source);

    if (opts.element && opts.element !== 'kinetic' && opts.element !== 'void') {
      this._applyStatus(opts.element, source);
    }

    if (opts.knockback && source?.position) {
      const kx = this.position.x - source.position.x;
      const kz = this.position.z - source.position.z;
      const len = Math.hypot(kx, kz) || 1;
      this.knockbackVel.set((kx / len) * opts.knockback * 2.2, 2, (kz / len) * opts.knockback * 2.2);
    }

    this.world.bus.emit('enemy.damaged', {
      enemy: this,
      amount: Math.round(finalAmount),
      crit: opts.crit ?? false,
      headshot: opts.headshot ?? false,
      element: opts.element,
      x: this.position.x, y: this.position.y + this.height * 0.6, z: this.position.z,
    });
    return finalAmount;
  }

  _applyStatus(element, source) {
    if (this.statuses.has(element)) {
      const st = this.statuses.get(element);
      st.stacks = Math.min(3, st.stacks + 1);
      st.duration = Math.max(st.duration, makeStatus(element, source).duration);
      return;
    }
    this.statuses.set(element, makeStatus(element, source));
  }

  die(source, opts) {
    if (!this.alive) return;
    this.alive = false;
    this.dead = true;
    this.killedBy = source;
    this.killTime = this.world.time;
    this.deathProgress = 0;
    this.deathVel.set((Math.random() - 0.5) * 3, 4.5 + Math.random() * 2, (Math.random() - 0.5) * 3);
    this.deathSpin = (Math.random() - 0.5) * 6;

    const isBoss = this.def.boss === true;
    this.world.bus.emit('enemy.death', {
      enemy: this,
      killer: source,
      score: this.scoreValue,
      xp: this.xpValue,
      x: this.position.x, y: this.position.y + this.height * 0.5, z: this.position.z,
      boss: isBoss,
      element: this.def.dieElement ?? 'void',
      damage: opts?.damage ?? 0,
      crit: opts?.crit ?? false,
      weapon: opts?.weapon ?? null,
    });
    playSfx(isBoss ? 'enemy.die_big' : 'enemy.die_small', { x: this.position.x, y: this.position.y, z: this.position.z, vol: isBoss ? 1 : 0.5 });
  }

  // ------------------------------------------------------------ statuses

  updateStatuses(dt) {
    for (const [element, status] of this.statuses) {
      status.duration -= dt;
      const dmg = tickStatus(status, dt);
      if (dmg > 0) {
        this.health -= dmg;
        this.world.bus.emit('enemy.status_damage', {
          enemy: this, amount: Math.round(dmg), element,
          x: this.position.x, y: this.position.y + this.height * 0.6, z: this.position.z,
        });
        if (this.health <= 0) {
          this.die(status.source, { damage: dmg });
          return;
        }
      }
      if (status.duration <= 0) this.statuses.delete(element);
    }
  }

  get statusSlowFactor() {
    let slow = 1;
    for (const st of this.statuses.values()) {
      slow = Math.min(slow, 1 - st.slowFactor);
    }
    return slow;
  }

  get isStunned() {
    for (const st of this.statuses.values()) {
      if (st.stunTime > 0) return true;
    }
    return false;
  }

  // ------------------------------------------------------------ update

  update(dt) {
    super.update(dt);
    if (!this.alive) {
      this.updateDeath(dt);
      return;
    }

    this.flashTimer = Math.max(0, this.flashTimer - dt);
    this.updateStatuses(dt);
    if (!this.alive) return;

    if (this.spawnTimer > 0) {
      this.spawnTimer -= dt;
      this.spawnScale = 1 - Math.max(0, this.spawnTimer) / (this.def.spawnTime ?? 0.4);
    }

    if (!this.isStunned) {
      this.brain.update(dt);
    } else {
      this.velocity.set(0, 0, 0);
    }

    if (!this.velocity.isFinite()) {
      console.error(`[enemy] ${this.id} velocity NaN after brain (${this.brain?.fsm?.currentId})`, JSON.stringify(this.velocity));
      this.velocity.set(0, 0, 0);
    }

    if (!this.knockbackVel.isZero()) {
      this.position.addScaled(this.knockbackVel, dt);
      this.knockbackVel.mulScalar(Math.max(0, 1 - 6 * dt));
      this.knockbackVel.y = Math.max(0, this.knockbackVel.y - 12 * dt);
    }

    const speedMul = this.statusSlowFactor;
    const moveX = this.velocity.x * speedMul * dt;
    const moveZ = this.velocity.z * speedMul * dt;
    const collided = this.world.collision.moveCircle(
      this.position.x, this.position.z, moveX, moveZ, this.radius,
    );
    this.position.x = collided.x;
    this.position.z = collided.z;
    this.position.y = 0;

    this.animPhase += dt * (6 + Math.hypot(this.velocity.x, this.velocity.z) * 2.2);

    this.syncVisual(dt);
  }

  updateDeath(dt) {
    this.deathProgress += dt * 1.1;
    this.position.addScaled(this.deathVel, dt);
    this.deathVel.y -= 16 * dt;
    this.position.y = Math.max(0, this.position.y);
    if (this.position.y <= 0.01 && this.deathVel.y < 0) {
      this.deathVel.y *= -0.3;
      this.deathVel.x *= 0.5;
      this.deathVel.z *= 0.5;
    }
    this.quaternion.multiplyAxisAngle({ x: 0, y: 1, z: 0 }, this.deathSpin * dt);
    this.syncVisual(dt);
    if (this.deathProgress > 1.6) {
      this.world.removeEntity(this);
    }
  }

  // ------------------------------------------------------------ visuals

  /** Build the procedural model for this enemy (archetypes override parts). */
  buildModel(factory) {
    this.model = factory.build(this.def, this);
  }

  syncVisual(dt) {
    void dt;
    if (!this.model) return;
    const scale = this.spawnScale * this.modelScale;
    this.model.setScale(scale, scale, scale);
    this.model.setPosition(this.position.x, this.position.y, this.position.z);
    this.model.setQuaternion(this.quaternion);
    if (!this.alive) {
      const s = Math.max(0, 1 - Math.pow(this.deathProgress, 2) * 0.85);
      this.model.setScale(scale * s, scale * s, scale * s);
    }
    if (this.flashTimer > 0 && this.def.flashable !== false) {
      this.model.setTint({ r: 1.5, g: 1.5, b: 1.5, a: 1 });
    } else {
      this.model.clearTint();
    }
    this.model.updateWorld();
  }

  isHeadshotAt(origin, dir, t) {
    if (!this.def.headshot) return false;
    const hy = this.position.y + this.height * 0.78;
    const hitY = origin.y + dir.y * t;
    return hitY >= hy;
  }

  // ------------------------------------------------------------ attacks

  /** Melee lunge toward the player (called by attack state). */
  lungeAt(player, speed = 8, range = 3) {
    const dx = player.position.x - this.position.x;
    const dz = player.position.z - this.position.z;
    const len = Math.hypot(dx, dz);
    if (len < 0.001) return;
    this.velocity.set((dx / len) * speed, 0, (dz / len) * speed);
  }

  /** Direct melee hit check. */
  meleeHit(player, range, damage) {
    const dist = player.position.distanceTo(this.position);
    if (dist <= range + player.radius) {
      player.takeDamage(damage, this, { element: this.def.element ?? 'kinetic', sourcePos: this.position });
      this.world.bus.emit('cam.shake', { amount: 0.25, duration: 0.2 });
      return true;
    }
    return false;
  }

  /** Ranged attack: simple hitscan toward the player (for shooter types). */
  shootAtPlayer(player, damage, speed = 28, color = '#ff5d5d') {
    const origin = this.position.clone();
    origin.y += this.height * 0.7;
    const dir = player.position.clone().sub(origin).normalize();
    const spread = this.def.aimSpread ?? 0.03;
    dir.x += (Math.random() - 0.5) * spread;
    dir.y += (Math.random() - 0.5) * spread;
    dir.z += (Math.random() - 0.5) * spread;
    dir.normalize();

    const range = 60;
    const hit = this.world.collision.raycast(origin, dir, range);
    let hitT = hit ? hit.t : range;
    const p = this.world.players[0];
    if (p && !p.dead) {
      const t = rayPlayer(origin, dir, p, hitT);
      if (t !== null && t < hitT) {
        hitT = t;
        p.takeDamage(damage, this, { element: this.def.element ?? 'kinetic', sourcePos: origin });
        this.world.bus.emit('player.hit_by_enemy', { x: p.position.x, y: p.position.y, z: p.position.z, damage });
        this.world.bus.emit('fx.impact_player', { x: origin.x + dir.x * hitT, y: origin.y + dir.y * hitT, z: origin.z + dir.z * hitT });
      }
    }
    const end = origin.clone().addScaled(dir, hitT);
    this.world.bus.emit('fx.enemy_tracer', { x1: origin.x, y1: origin.y, z1: origin.z, x2: end.x, y2: end.y, z2: end.z, color });
    playSfx('enemy.shoot', { x: origin.x, y: origin.y, z: origin.z, vol: 0.35 });
    return true;
  }

  /** Lob a projectile at the player (spitter style). */
  lobAtPlayer(player, damage, speed = 10, color = '#ffb000') {
    const origin = this.position.clone();
    origin.y += this.height * 0.8;
    const target = player.position.clone();
    target.y += 0.5;
    const dx = target.x - origin.x;
    const dz = target.z - origin.z;
    const hDist = Math.hypot(dx, dz);
    const tFlight = hDist / speed;
    const vy = (target.y - origin.y) / tFlight + 0.5 * 22 * tFlight;
    const dir = new Vec3(dx / hDist * speed, vy, dz / hDist * speed);
    const proj = this.world.spawnProjectile({
      origin,
      dir,
      speed: 1,
      damage,
      element: this.def.element ?? 'plasma',
      owner: this,
      radius: 0.2,
      splashRadius: this.def.splashRadius ?? 1.2,
      splashDamage: damage * 0.5,
      gravity: 22,
      life: 4,
      color,
      glowColor: color,
      onHit: () => {},
    });
    proj.velocity.copy(dir);
    return proj;
  }

  /** Drop loot — emitted as an event; the loot system handles it. */
  dropLoot() {
    this.world.bus.emit('loot.drop', {
      x: this.position.x, y: 0.5, z: this.position.z,
      table: this.def.lootTable ?? 'grunt',
      xp: this.xpValue,
    });
  }
}

/** Ray vs player (sphere at chest). */
function rayPlayer(origin, dir, player, maxDist) {
  const cx = player.position.x;
  const cy = player.position.y + player.height * 0.45;
  const cz = player.position.z;
  const r = player.radius * 1.1;
  const ocx = origin.x - cx;
  const ocy = origin.y - cy;
  const ocz = origin.z - cz;
  const b = ocx * dir.x + ocy * dir.y + ocz * dir.z;
  const c = ocx * ocx + ocy * ocy + ocz * ocz - r * r;
  if (c > 0 && b > 0) return null;
  const disc = b * b - c;
  if (disc < 0) return null;
  const t = -b - Math.sqrt(disc);
  if (t < 0 || t > maxDist) return null;
  return t;
}
