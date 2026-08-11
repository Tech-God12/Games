/**
 * VOIDBREAK — Weapon behavior kinds.
 *
 * Subclasses of Weapon implementing the six firing behaviors:
 *   hitscan  — instant ray with tracers (bullet weapons)
 *   projectile — physical projectiles (rockets, plasma bolts)
 *   beam     — continuous beam (tesla/plasma cutter)
 *   charge   — hold to charge, release to fire (railgun, plasma cannon)
 *   grenade  — lobbed explosive with arc
 *   melee    — close-range arc attack
 */

import { Weapon } from './weapon.js';
import { Vec3 } from '../../core/vec3.js';
import { computeDamage } from '../combat/damage.js';
import { playSfx } from '../../audio/sfx.js';

// ------------------------------------------------------------------ hitscan

export class HitscanWeapon extends Weapon {
  fireShot(ctx, index, total) {
    const owner = this.owner;
    const origin = ctx.origin;
    const dir = ctx.dir.clone();

    const spread = this.currentSpread(ctx.moveSpeed ?? 0, ctx.airborne ?? false) * (Math.PI / 180);
    if (spread > 0.0001) {
      const theta = Math.random() * Math.PI * 2;
      const rad = spread * Math.sqrt(Math.random());
      const ortho1 = _tmp1.copy(dir).cross(Vec3.up()).normalizeOr(1, 0, 0);
      const ortho2 = _tmp2.copy(ortho1).cross(dir).normalize();
      dir.addScaled(ortho1, Math.cos(theta) * rad).addScaled(ortho2, Math.sin(theta) * rad).normalize();
    }

    const range = this.range;
    const world = this.world;
    const hit = world.collision.raycast(origin, dir, range);
    let hitEntity = null;
    let hitT = hit ? hit.t : range;
    let headshot = false;

    const targets = ctx.targets ?? world.queryEnemies(origin.x, origin.z, range);
    for (const e of targets) {
      if (!e.alive || e === owner) continue;
      const t = rayEntity(origin, dir, e, range);
      if (t !== null && t < hitT) {
        hitT = t;
        hitEntity = e;
        headshot = e.isHeadshotAt(origin, dir, t);
      }
    }

    const endPos = origin.clone().addScaled(dir, hitT);
    let result = { hit: hitEntity, hitT, endPos, crit: false, damage: 0, headshot: false };

    if (hitEntity) {
      const { amount, crit, headshot: hs } = computeDamage(
        {
          damage: this.shotDamage(ctx),
          element: this.elementApplied,
          critChance: this.critChance + this.modifiers.critChanceAdd,
          critMult: this.critMult,
          headshotMult: this.headshotMult,
          range: hitT,
          falloffStart: this.falloffStart,
          falloffEnd: this.falloffEnd,
          falloffFactor: this.falloffFactor,
        },
        { isHead: headshot, armor: hitEntity.armor ?? 0, shield: hitEntity.shield ?? 0 },
        { rng: ctx.rng },
      );
      const damageDealt = hitEntity.takeDamage(amount, owner, {
        element: this.elementApplied,
        crit,
        headshot: hs,
        sourcePos: origin,
        weapon: this,
        knockback: this.def.knockback ?? 2,
      });
      result = { ...result, crit, headshot: hs, damage: damageDealt };
      ctx.onHitEnemy?.(hitEntity, result, origin, dir);
    } else if (hit) {
      ctx.onHitWorld?.(hit, origin, dir);
    }

    ctx.onTracer?.(origin.clone(), endPos, this.def.tracerColor ?? '#9fd8ff', this.def.tracerSize ?? 0.02);
    void index; void total;
    return result;
  }
}

// ----------------------------------------------------------------- projectile

export class ProjectileWeapon extends Weapon {
  fireShot(ctx, index, total) {
    const origin = ctx.origin.clone();
    const dir = ctx.dir.clone();
    const spread = this.currentSpread(ctx.moveSpeed ?? 0, ctx.airborne ?? false) * (Math.PI / 180);
    if (spread > 0.0001) {
      const theta = Math.random() * Math.PI * 2;
      const rad = spread * Math.sqrt(Math.random());
      const ortho1 = _tmp1.copy(dir).cross(Vec3.up()).normalizeOr(1, 0, 0);
      const ortho2 = _tmp2.copy(ortho1).cross(dir).normalize();
      dir.addScaled(ortho1, Math.cos(theta) * rad).addScaled(ortho2, Math.sin(theta) * rad).normalize();
    }
    const speed = (this.def.projectileSpeed ?? 30) * this.modifiers.projectileSpeedMult;
    const proj = this.world.spawnProjectile({
      origin,
      dir,
      speed,
      damage: this.shotDamage(ctx),
      element: this.elementApplied,
      owner: this.owner,
      radius: this.def.projectileRadius ?? 0.15,
      splashRadius: this.def.splashRadius ?? 0,
      splashDamage: this.def.splashDamage ?? 0,
      gravity: this.def.projectileGravity ?? 0,
      life: this.def.projectileLife ?? 3,
      color: this.def.projectileColor ?? '#ffd166',
      glowColor: this.def.projectileGlow ?? '#ffb000',
      homing: this.def.homing ?? false,
      pierce: this.def.pierce ?? 0 + this.modifiers.pierceAdd,
      bounce: this.def.bounce ?? 0 + this.modifiers.bounceAdd,
      onHit: (p, entity, info) => {
        ctx.onProjectileHit?.(p, entity, info);
      },
    });
    void index; void total;
    return { projectile: proj };
  }
}

// --------------------------------------------------------------------- beam

export class BeamWeapon extends Weapon {
  constructor(def, owner, opts = {}) {
    super(def, owner, opts);
    this.beamActive = false;
    this.beamTimer = 0;
    this.beamEnd = new Vec3();
    this.beamTarget = null;
    this.damageTick = 0;
  }

  update(dt, input, ctx) {
    super.update(dt, input, ctx);
    if (this.triggerHeld && this.canFire() && this.cooldown <= 0 && !this.reloading) {
      if (!this.beamActive) {
        this.beamActive = true;
        playSfx(this.def.beamStartSound ?? 'gun.tesla', { x: ctx.origin?.x, y: ctx.origin?.y, z: ctx.origin?.z, vol: 0.4 });
      }
      this.beamTimer += dt;
      this.damageTick -= dt;
      if (this.damageTick <= 0) {
        this._beamDamage(ctx);
        this.damageTick = 1 / this.fireRate;
        this._consumeAmmo(1);
      }
      this.cooldown = this.def.beamCooldown ?? 0.06;
    } else {
      this.beamActive = false;
      this.beamTimer = 0;
    }
  }

  _beamDamage(ctx) {
    const origin = ctx.origin;
    const dir = ctx.dir;
    const range = this.range;
    const hit = this.world.collision.raycast(origin, dir, range);
    let hitT = hit ? hit.t : range;
    let target = null;
    const targets = ctx.targets ?? this.world.queryEnemies(origin.x, origin.z, range);
    for (const e of targets) {
      if (!e.alive || e === this.owner) continue;
      const t = rayEntity(origin, dir, e, range);
      if (t !== null && t < hitT) {
        hitT = t;
        target = e;
      }
    }
    this.beamEnd.copy(origin).addScaled(dir, hitT);
    this.beamTarget = target;
    if (target) {
      const { amount } = computeDamage(
        { damage: this.shotDamage(ctx) * 0.6, element: this.elementApplied, critChance: this.critChance, range: hitT, falloffStart: this.falloffStart, falloffEnd: this.falloffEnd },
        { armor: target.armor ?? 0, shield: target.shield ?? 0 },
      );
      target.takeDamage(amount, this.owner, { element: this.elementApplied, sourcePos: origin, weapon: this });
      ctx.onHitEnemy?.(target, { hitT, damage: amount }, origin, dir);
    } else if (hit) {
      ctx.onHitWorld?.(hit, origin, dir);
    }
    ctx.onBeam?.(origin.clone(), this.beamEnd.clone(), this.def.beamColor ?? '#ffd166');
  }

  canFire() {
    if (this.reloading) return false;
    if (this.ammoInMag <= 0 && !this.infinite) return false;
    return true;
  }
}

// ------------------------------------------------------------------ charge

export class ChargeWeapon extends Weapon {
  fireShot(ctx) {
    void ctx;
    return { charged: false };
  }

  releaseCharge(ctx) {
    if (!ctx) return;
    const power = this.charge;
    const origin = ctx.origin.clone();
    const dir = ctx.dir.clone();
    const dmg = this.shotDamage(ctx) * (0.5 + power * 1.6);
    const range = this.range * (0.6 + power * 0.6);

    if (this.def.beamOnRelease) {
      const hit = this.world.collision.raycast(origin, dir, range);
      let hitT = hit ? hit.t : range;
      const targets = ctx.targets ?? this.world.queryEnemies(origin.x, origin.z, range);
      for (const e of targets) {
        if (!e.alive || e === this.owner) continue;
        const t = rayEntity(origin, dir, e, range);
        if (t !== null && t < hitT) {
          hitT = t;
          const { amount, crit } = computeDamage(
            { damage: dmg, element: this.elementApplied, critChance: this.critChance, critMult: this.critMult, range: t, falloffStart: 100, falloffEnd: 300 },
            { armor: e.armor ?? 0, shield: e.shield ?? 0 },
          );
          e.takeDamage(amount, this.owner, { element: this.elementApplied, crit, sourcePos: origin, weapon: this, knockback: 4 });
          ctx.onHitEnemy?.(e, { hitT: t, damage: amount }, origin, dir);
        }
      }
      const endPos = origin.clone().addScaled(dir, hitT);
      ctx.onTracer?.(origin.clone(), endPos, '#ff9dff', 0.045);
      ctx.onChargeFire?.(power);
      this._consumeAmmo(1);
      this.charge = 0;
      return;
    }

    const speed = (this.def.projectileSpeed ?? 24) * this.modifiers.projectileSpeedMult;
    const proj = this.world.spawnProjectile({
      origin,
      dir,
      speed,
      damage: dmg,
      element: this.elementApplied,
      owner: this.owner,
      radius: 0.2 + power * 0.15,
      splashRadius: (this.def.splashRadius ?? 2.5) * (0.4 + power * 0.9) * this.modifiers.explosionRadiusMult,
      splashDamage: dmg * 0.6,
      gravity: 0,
      life: 2.5,
      color: '#b26bff',
      glowColor: '#8a2be2',
      onHit: (p, entity, info) => ctx.onProjectileHit?.(p, entity, info),
    });
    ctx.onChargeFire?.(power);
    this._consumeAmmo(1);
    this.charge = 0;
    return { projectile: proj };
  }
}

// ----------------------------------------------------------------- grenade

export class GrenadeWeapon extends Weapon {
  fireShot(ctx) {
    const origin = ctx.origin.clone();
    const dir = ctx.dir.clone();
    const speed = this.def.projectileSpeed ?? 14;
    const lob = dir.clone();
    lob.y += this.def.lobAngle ?? 0.25;
    lob.normalize();
    const proj = this.world.spawnProjectile({
      origin,
      dir: lob,
      speed,
      damage: 0,
      element: this.elementApplied,
      owner: this.owner,
      radius: 0.18,
      splashRadius: (this.def.splashRadius ?? 4) * this.modifiers.explosionRadiusMult,
      splashDamage: this.shotDamage(ctx),
      gravity: this.def.projectileGravity ?? 14,
      life: this.def.projectileLife ?? 4,
      color: '#4a5a3a',
      glowColor: '#ffb000',
      fuse: this.def.fuse ?? 1.4,
      bouncy: true,
      bounceFactor: 0.45,
      onHit: (p, entity, info) => ctx.onProjectileHit?.(p, entity, info),
    });
    return { projectile: proj };
  }
}

// ------------------------------------------------------------------- melee

export class MeleeWeapon extends Weapon {
  constructor(def, owner, opts = {}) {
    super(def, owner, opts);
    this.windup = 0;
    this.swing = 0;
    this.swung = false;
  }

  update(dt, input, ctx) {
    this.triggerJustPressed = input.fire && !this.triggerHeld;
    this.triggerHeld = input.fire;
    this.cooldown = Math.max(0, this.cooldown - dt);

    if (this.windup > 0) {
      this.windup -= dt;
      if (this.windup <= 0 && !this.swung) {
        this._executeSwing(ctx);
        this.swung = true;
      }
    }
    if (this.triggerJustPressed && this.cooldown <= 0) {
      this.windup = this.def.windup ?? 0.08;
      this.swing = this.def.swingTime ?? 0.25;
      this.swung = false;
      this.cooldown = 1 / this.fireRate;
      playSfx(this.def.sound ?? 'gun.melee', { x: ctx.origin?.x, y: ctx.origin?.y, z: ctx.origin?.z });
    }
    this.swing = Math.max(0, this.swing - dt);
    this.recoil.update(dt, {});
  }

  _executeSwing(ctx) {
    const range = this.range ?? 2.6;
    const arc = (this.def.arcDeg ?? 120) * Math.PI / 180;
    const origin = ctx.origin;
    const dir = ctx.dir;
    const targets = ctx.targets ?? this.world.queryEnemies(origin.x, origin.z, range + 1);
    for (const e of targets) {
      if (!e.alive || e === this.owner) continue;
      const to = e.boundsCenter;
      const dist = origin.distanceTo(to);
      if (dist > range + e.radius) continue;
      const dot = dir.dot(to.clone().sub(origin).normalize());
      if (dot < Math.cos(arc / 2)) continue;
      const { amount, crit } = computeDamage(
        { damage: this.shotDamage(ctx), element: this.elementApplied, critChance: this.critChance, critMult: this.critMult, range: dist, falloffStart: range * 2, falloffEnd: range * 2 + 1 },
        { armor: e.armor ?? 0, shield: e.shield ?? 0 },
      );
      e.takeDamage(amount, this.owner, {
        element: this.elementApplied,
        crit,
        sourcePos: origin,
        weapon: this,
        knockback: this.def.knockback ?? 6,
      });
      ctx.onHitEnemy?.(e, { hitT: dist, damage: amount }, origin, dir);
    }
    playSfx('hit.enemy', { x: origin.x, y: origin.y, z: origin.z, vol: 0.6 });
    ctx.onMeleeSwing?.(this);
  }

  canFire() {
    return this.cooldown <= 0;
  }

  get swingProgress() {
    if (this.swing <= 0) return 0;
    return 1 - this.swing / (this.def.swingTime ?? 0.25);
  }
}

// ----------------------------------------------------------------- helpers

const _tmp1 = new Vec3();
const _tmp2 = new Vec3();

/**
 * Ray vs enemy capsule (segment from feet to head, radius = entity radius).
 * Returns the entry distance t or null.
 */
export function rayEntity(origin, dir, entity, maxDist) {
  const ax = entity.position.x;
  const ay = entity.position.y;
  const az = entity.position.z;
  const bx = ax;
  const by = ay + Math.max(entity.height ?? 1, 0.1);
  const bz = az;
  const r = entity.radius * 1.15;
  const r2 = r * r;

  const d1x = dir.x, d1y = dir.y, d1z = dir.z;
  const d2x = bx - ax, d2y = by - ay, d2z = bz - az;
  const rx = origin.x - ax, ry = origin.y - ay, rz = origin.z - az;

  const a = d1x * d1x + d1y * d1y + d1z * d1z;
  const e = d2x * d2x + d2y * d2y + d2z * d2z;
  const f = d2x * rx + d2y * ry + d2z * rz;
  const c = d1x * rx + d1y * ry + d1z * rz;

  let t1, t2;
  if (a <= 1e-8) {
    t1 = 0;
    t2 = e > 1e-8 ? Math.min(1, Math.max(0, f / e)) : 0;
  } else if (e <= 1e-8) {
    t2 = 0;
    t1 = Math.max(0, -c / a);
  } else {
    const b = d1x * d2x + d1y * d2y + d1z * d2z;
    const denom = a * e - b * b;
    t1 = denom > 1e-8 ? Math.min(1e9, Math.max(0, (b * f - c * e) / denom)) : 0;
    t2 = (b * t1 + f) / e;
    if (t2 < 0) {
      t2 = 0;
      t1 = Math.max(0, -c / a);
    } else if (t2 > 1) {
      t2 = 1;
      t1 = Math.max(0, (b - c) / a);
    }
  }

  if (t1 > maxDist) return null;
  const px = origin.x + d1x * t1, py = origin.y + d1y * t1, pz = origin.z + d1z * t1;
  const qx = ax + d2x * t2, qy = ay + d2y * t2, qz = az + d2z * t2;
  const dx = px - qx, dy = py - qy, dz = pz - qz;
  if (dx * dx + dy * dy + dz * dz <= r2) return t1;
  return null;
}
