/**
 * VOIDBREAK — Player.
 *
 * The player entity: movement (via movement.js kinematics), health/shields,
 * the weapon arsenal, and combat stat tracking. The camera and viewmodel are
 * driven by PlayerCamera (camera_rig.js); input is applied here.
 */

import { Entity } from '../entity.js';
import { Vec3 } from '../../core/vec3.js';
import { stepPlayer } from './movement.js';
import { createWeapon } from '../weapons/weapon_db.js';
import { playSfx } from '../../audio/sfx.js';
import {
  PLAYER_WALK_SPEED, PLAYER_RUN_SPEED, PLAYER_CROUCH_SPEED,
  PLAYER_JUMP_SPEED, PLAYER_EYE_HEIGHT, PLAYER_CROUCH_EYE_HEIGHT,
  PLAYER_RADIUS, PLAYER_HEIGHT, GRAVITY,
} from '../../core/constants.js';

export const PLAYER_STATS = {
  walkSpeed: PLAYER_WALK_SPEED,
  runSpeed: PLAYER_RUN_SPEED,
  crouchSpeed: PLAYER_CROUCH_SPEED,
  groundAccel: 55,
  airAccel: 9,
  airMaxSpeedFactor: 1.05,
  friction: 10,
  gravity: GRAVITY,
  jumpSpeed: PLAYER_JUMP_SPEED,
  coyoteTime: 0.12,
  jumpBuffer: 0.15,
  floorY: 0,
  crouchJump: true,
  dashSpeed: 17,
  dashDuration: 0.16,
  dashCooldown: 1.2,
  dashEndFactor: 0.35,
};

export class Player extends Entity {
  constructor(world, opts = {}) {
    super({ kind: 'player', radius: PLAYER_RADIUS, height: PLAYER_HEIGHT, friendly: true, team: 1, ...opts });
    this.world = world;
    this.movement = {
      px: opts.x ?? 0, py: opts.y ?? 0, pz: opts.z ?? 0,
      vx: 0, vy: 0, vz: 0,
      grounded: true, coyote: 0, buffer: 0,
      crouch: 0, sprint: 0,
      dashTimer: 0, dashCooldown: 0,
      dashDirX: 0, dashDirZ: 0,
      landed: false, jumped: false, dashed: false,
      vyLand: 0,
    };
    this.position.set(this.movement.px, this.movement.py + PLAYER_EYE_HEIGHT, this.movement.pz);
    this.radius = PLAYER_RADIUS;
    this.height = PLAYER_HEIGHT;

    this.maxHealth = opts.maxHealth ?? 100;
    this.health = this.maxHealth;
    this.maxShield = opts.maxShield ?? 75;
    this.shield = this.maxShield;
    this.shieldRegenDelay = opts.shieldRegenDelay ?? 3.5;
    this.shieldRegenRate = opts.shieldRegenRate ?? 12;
    this._shieldTimer = this.shieldRegenDelay;

    this.stats = {
      damageMult: 1,
      fireRateMult: 1,
      reloadMult: 1,
      magMult: 1,
      moveSpeedMult: 1,
      jumpMult: 1,
      healthMult: 1,
      shieldMult: 1,
      lifesteal: 0,
      critChanceAdd: 0,
      pickupRadius: 1.5,
      dashCooldownMult: 1,
      doubleJump: false,
      damageReduction: 0,
      dodge: 0,
    };

    this.weapons = [];
    this.weaponIndex = 0;
    this.currentWeapon = null;
    this.switching = false;
    this.switchTimer = 0;

    this.dead = false;
    this.deathTimer = 0;

    this.groundSpeed = 0;
    this.lastDamageTime = -10;
    this.kills = 0;
    this.damageDealt = 0;
    this.facing = new Vec3(0, 0, -1);

    this.iFrames = 0;
  }

  /** Build the starter arsenal. */
  equipLoadout(weaponIds) {
    for (const id of weaponIds) {
      this.addWeapon(id);
    }
    this.weaponIndex = 0;
    this.currentWeapon = this.weapons[0];
  }

  addWeapon(id, opts = {}) {
    if (this.weapons.some((w) => w.id === id)) return this.weapons.find((w) => w.id === id);
    const weapon = createWeapon(id, this, opts);
    this.weapons.push(weapon);
    return weapon;
  }

  hasWeapon(id) {
    return this.weapons.some((w) => w.id === id);
  }

  switchTo(index) {
    if (index < 0 || index >= this.weapons.length) return;
    if (index === this.weaponIndex) return;
    this.weapons[this.weaponIndex]?.holster();
    this.weaponIndex = index;
    this.currentWeapon = this.weapons[index];
    this.switching = true;
    this.switchTimer = 0.28;
    playSfx('weapon.switch');
  }

  nextWeapon(dir = 1) {
    if (this.weapons.length <= 1) return;
    this.switchTo((this.weaponIndex + dir + this.weapons.length) % this.weapons.length);
  }

  switchToWeapon(id) {
    const idx = this.weapons.findIndex((w) => w.id === id);
    if (idx >= 0) this.switchTo(idx);
  }

  // ------------------------------------------------------------ damage

  applyDamage(amount, source, opts = {}) {
    if (this.dead) return 0;
    if (this.iFrames > 0 && opts.element !== 'burn') return 0;

    let remaining = amount * (1 - this.stats.damageReduction);
    let shieldDamage = 0;
    if (this.shield > 0) {
      shieldDamage = Math.min(this.shield, remaining);
      this.shield -= shieldDamage;
      remaining -= shieldDamage;
    }
    this.health -= Math.max(0, remaining);
    this._shieldTimer = this.shieldRegenDelay;
    this.lastDamageTime = this.world?.time ?? 0;
    this.iFrames = 0.35;

    this.world?.bus.emit('player.damaged', {
      amount: Math.round(shieldDamage + remaining),
      shieldDamage: Math.round(shieldDamage),
      healthDamage: Math.round(Math.max(0, remaining)),
      source,
    });
    playSfx('hit.player', { vol: 0.6 });
    this.world?.bus.emit('cam.shake', { amount: Math.min(0.5, (shieldDamage + remaining) / 80), duration: 0.25 });

    if (this.health <= 0 && !this.dead) {
      this.die(source, opts);
    }
    return shieldDamage + Math.max(0, remaining);
  }

  heal(amount) {
    const before = this.health;
    this.health = Math.min(this.maxHealth, this.health + amount);
    return this.health - before;
  }

  rechargeShield(amount) {
    const before = this.shield;
    this.shield = Math.min(this.maxShield, this.shield + amount);
    return this.shield - before;
  }

  die(source, opts) {
    if (this.dead) return;
    this.dead = true;
    this.alive = false;
    this.deathTimer = 2.2;
    this.world?.bus.emit('player.death', { source });
    playSfx('ui.gameover', { vol: 0.8 });
  }

  // ------------------------------------------------------------ update

  update(dt) {
    super.update(dt);
    if (this.dead) {
      this.deathTimer -= dt;
      return;
    }
    this.iFrames = Math.max(0, this.iFrames - dt);

    this._shieldTimer -= dt;
    if (this._shieldTimer <= 0 && this.shield < this.maxShield) {
      this.shield = Math.min(this.maxShield, this.shield + this.shieldRegenRate * dt * this.stats.shieldMult);
    }

    if (this.switching) {
      this.switchTimer -= dt;
      if (this.switchTimer <= 0) this.switching = false;
    }
  }

  /**
   * Apply player input + movement.
   * @param {import('../../input/input.js').InputManager} input
   * @param {number} yaw camera yaw (radians)
   * @param {number} dt fixed step
   */
  applyInput(input, yaw, dt) {
    if (this.dead) return;
    const stats = this.stats;
    const params = {
      ...PLAYER_STATS,
      walkSpeed: PLAYER_STATS.walkSpeed * stats.moveSpeedMult,
      runSpeed: PLAYER_STATS.runSpeed * stats.moveSpeedMult,
      crouchSpeed: PLAYER_STATS.crouchSpeed * stats.moveSpeedMult,
      jumpSpeed: PLAYER_STATS.jumpSpeed * stats.jumpMult,
      dashSpeed: PLAYER_STATS.dashSpeed * stats.moveSpeedMult,
      dashCooldown: PLAYER_STATS.dashCooldown * stats.dashCooldownMult,
    };

    const move = input.moveAxis();
    const sinY = Math.sin(yaw);
    const cosY = Math.cos(yaw);
    const wishX = move.x * cosY - move.y * sinY;
    const wishZ = move.x * sinY + move.y * cosY;

    const m = stepPlayer(this.movement, {
      x: wishX,
      y: 0,
      z: wishZ,
      jump: input.isDown('jump'),
      crouch: input.isDown('crouch'),
      sprint: input.isDown('sprint'),
      dash: input.wasPressed('dash'),
    }, params, dt);

    this.movement = m;

    if (m.dashed && Math.hypot(wishX, wishZ) < 0.01) {
      const fx = -Math.sin(yaw);
      const fz = -Math.cos(yaw);
      this.movement.dashDirX = fx;
      this.movement.dashDirZ = fz;
      this.movement.vx = fx * params.dashSpeed;
      this.movement.vz = fz * params.dashSpeed;
    }

    const collided = this.world.collision.moveCircle(
      this.movement.px, this.movement.pz,
      this.movement.vx * dt, this.movement.vz * dt,
      this.radius,
    );
    this.movement.px = collided.x;
    this.movement.pz = collided.z;

    if (m.landed) {
      this.world.bus.emit('player.land', { impact: Math.min(1, Math.abs(this.movement.vyLand) / 8) });
      playSfx('fx.land', { vol: Math.min(0.5, Math.abs(this.movement.vyLand) / 14) });
    }

    const eyeY = this.movement.crouch > 0.5 ? PLAYER_CROUCH_EYE_HEIGHT : PLAYER_EYE_HEIGHT;
    this.position.set(this.movement.px, this.movement.py + eyeY, this.movement.pz);
    this.groundSpeed = Math.hypot(this.movement.vx, this.movement.vz);
  }

  /** Register a kill (from the world's enemy death event). */
  registerKill(enemy, opts = {}) {
    this.kills++;
    this.damageDealt += opts.damage ?? 0;
    if (this.stats.lifesteal > 0) {
      const healAmt = (opts.damage ?? 0) * this.stats.lifesteal;
      if (healAmt > 0) this.heal(healAmt);
    }
    this.world.bus.emit('player.kill', { enemy, damage: opts.damage ?? 0, crit: opts.crit ?? false, weapon: opts.weapon });
  }

  get eyeHeight() {
    return this.movement.crouch > 0.5 ? PLAYER_CROUCH_EYE_HEIGHT : PLAYER_EYE_HEIGHT;
  }

  get speedMult() {
    return this.stats.moveSpeedMult;
  }

  isHeadshotAt(origin, dir, t) {
    const hy = this.position.y + this.height * 0.72;
    const hitY = origin.y + dir.y * t;
    return hitY >= hy;
  }
}
