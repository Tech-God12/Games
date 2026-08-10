// ============================================================================
// PlayerController.js
// First-person player movement & interaction: mouse-look, WASD acceleration,
// sprint, dash (with i-frames), jump + gravity, ground/platform collision, and
// arena boundary handling. Reads the InputManager and mutates the player
// entity's Body + Player components. Emits gameplay events for juice/SFX.
// ============================================================================

import * as THREE from 'three';
import { Player, PlayerState } from '../ecs/components/Gameplay.js';
import { Body, Kinematics } from '../ecs/components/Body.js';
import { Health } from '../ecs/components/Vitals.js';
import { bus, Channels } from '../core/EventBus.js';
import { clamp, damp, lerp } from '../core/MathUtils.js';

const _forward = new THREE.Vector3();
const _right = new THREE.Vector3();
const _desired = new THREE.Vector3();
const _horiz = new THREE.Vector3();

export class PlayerController {
  constructor(input) {
    this.input = input;
    this.arena = null;
    this.effects = null;
    this.player = null;
    this.gravity = -22;
    this.dashIFrames = true;
    this.sprintEnabled = true;
  }

  setPlayer(e) { this.player = e; }
  setArena(a) { this.arena = a; }

  update(dt) {
    const p = this.player; if (!p) return;
    const player = p.get(Player.type);
    const body = p.get(Body.type);
    const kin = p.get(Kinematics.type);
    if (!player || !body) return;
    const input = this.input;
    const health = p.get(Health.type);
    if (health && !health.alive) { player.state = PlayerState.Dead; body.vel.set(0, 0, 0); return; }

    // ---- Look ----
    const look = input.consumeLook();
    if (player.meta === undefined) player.meta = {};
    player.meta.lookDeltaX = look.x;
    player.meta.lookDeltaY = look.y;
    player.lookYaw -= look.x;
    player.lookPitch -= look.y;
    player.lookPitch = clamp(player.lookPitch, -Math.PI / 2 + 0.02, Math.PI / 2 - 0.02);

    // ---- Movement basis ----
    const yaw = player.lookYaw;
    _forward.set(-Math.sin(yaw), 0, -Math.cos(yaw));
    _right.set(Math.cos(yaw), 0, -Math.sin(yaw));

    const axis = input.moveAxis();
    player.meta.moveX = axis.x;
    player.meta.moveY = axis.y;
    _desired.set(0, 0, 0);
    _desired.addScaledVector(_forward, axis.y);
    _desired.addScaledVector(_right, axis.x);
    const moving = _desired.lengthSq() > 0.001;
    if (moving) _desired.normalize();

    // ---- Dash ----
    if (player.dashCooldown > 0) player.dashCooldown -= dt;
    if (player.dashTime > 0) {
      player.dashTime -= dt;
      if (player.dashTime <= 0) { player.state = PlayerState.Idle; if (health) health.invulnTime = Math.max(health.invulnTime, 0); }
    }
    if (input.pressed('dash') && player.dashCooldown <= 0 && player.dashTime <= 0) {
      const dashDir = moving ? _desired.clone() : _forward.clone();
      player.dashDir.copy(dashDir);
      player.dashTime = kin.dashDuration;
      player.dashCooldown = kin.dashCooldown;
      player.state = PlayerState.Dashing;
      if (health) health.invulnTime = Math.max(health.invulnTime, kin.dashDuration + 0.05);
      bus.emit(Channels.PlaySFX, { name: 'dash', volume: 0.5 });
      if (this.effects) { this.effects.addShake(0.18); }
    }

    // ---- Horizontal motion ----
    const isDashing = player.dashTime > 0;
    const sprinting = this.sprintEnabled && input.isDown('dash') === false && axis.y > 0.5 && moving && !isDashing;
    let maxSpeed = kin.maxSpeed * (sprinting ? 1.45 : 1);
    if (isDashing) {
      body.vel.x = player.dashDir.x * kin.dashSpeed;
      body.vel.z = player.dashDir.z * kin.dashSpeed;
      // dash trail
      if (this.effects && Math.random() < 0.6) this.effects.trailParticle(body.pos.clone().setY(body.pos.y + 1), 0x29e7ff, 4, 0.25);
    } else {
      const accel = body.grounded ? kin.accel : kin.airAccel;
      _horiz.set(body.vel.x, 0, body.vel.z);
      const target = _desired.multiplyScalar(maxSpeed);
      _horiz.x = damp(_horiz.x, target.x, accel * 0.06, dt);
      _horiz.z = damp(_horiz.z, target.z, accel * 0.06, dt);
      // cap to maxSpeed when not accelerating input (friction)
      if (!moving && body.grounded) {
        const f = Math.max(0, 1 - kin.turnSpeed * dt * 0.5);
        _horiz.x *= f; _horiz.z *= f;
      }
      body.vel.x = _horiz.x; body.vel.z = _horiz.z;
    }

    // ---- Jump & gravity ----
    if (input.pressed('jump') && body.grounded) {
      body.vel.y = kin.jumpForce;
      body.grounded = false;
      bus.emit(Channels.PlaySFX, { name: 'dash', volume: 0.25 });
    }
    body.vel.y += this.gravity * dt;

    // ---- Integrate ----
    body.pos.x += body.vel.x * dt;
    body.pos.y += body.vel.y * dt;
    body.pos.z += body.vel.z * dt;

    // ---- Ground & platforms ----
    const floorY = this.arena ? this.arena.floorY : 0;
    const minY = floorY + body.height * 0.5;
    if (body.pos.y < minY) {
      const wasAir = !body.grounded;
      body.pos.y = minY;
      if (body.vel.y < 0) body.vel.y = 0;
      body.grounded = true;
      if (wasAir && player.state !== PlayerState.Dashing) {
        // land
      }
    } else {
      body.grounded = false;
    }

    // ---- Arena bounds (cylinder) ----
    if (this.arena && this.arena.circularBounds !== false) {
      const cx = this.arena.centerX, cz = this.arena.centerZ;
      const dx = body.pos.x - cx, dz = body.pos.z - cz;
      const d = Math.hypot(dx, dz);
      const maxR = this.arena.boundsRadius - body.radius;
      if (d > maxR) {
        const nx = dx / d, nz = dz / d;
        body.pos.x = cx + nx * maxR;
        body.pos.z = cz + nz * maxR;
        const vdot = body.vel.x * nx + body.vel.z * nz;
        if (vdot > 0) { body.vel.x -= vdot * nx; body.vel.z -= vdot * nz; }
      }
    }

    // ---- Solid pillars push-out ----
    if (this.arena && this.arena.solids && this.arena.solids.length) {
      for (const s of this.arena.solids) {
        const cx = (s.min.x + s.max.x) * 0.5, cz = (s.min.z + s.max.z) * 0.5;
        const hx = (s.max.x - s.min.x) * 0.5 + body.radius;
        const hz = (s.max.z - s.min.z) * 0.5 + body.radius;
        const dx = body.pos.x - cx, dz = body.pos.z - cz;
        if (Math.abs(dx) < hx && Math.abs(dz) < hz && body.pos.y < s.max.y + body.radius) {
          const px = hx - Math.abs(dx), pz = hz - Math.abs(dz);
          if (px < pz) { body.pos.x = cx + Math.sign(dx || 1) * hx; body.vel.x = 0; }
          else { body.pos.z = cz + Math.sign(dz || 1) * hz; body.vel.z = 0; }
        }
      }
    }

    // ---- State ----
    if (player.state !== PlayerState.Dashing && player.state !== PlayerState.Dead) {
      player.state = moving ? PlayerState.Moving : PlayerState.Idle;
    }
  }
}
