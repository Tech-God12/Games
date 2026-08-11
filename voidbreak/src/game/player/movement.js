/**
 * VOIDBREAK — Player movement kinematics (pure math).
 *
 * Quake-style ground acceleration with air control, gravity, jump with
 * coyote time & buffering, crouch, sprint and dash. All functions are pure
 * — unit tested. The Player entity feeds state through these each tick.
 */

import { clamp } from '../../core/math.js';

/**
 * Horizontal ground movement.
 */
export function moveGround(s, input, p, dt) {
  const wishX = input.x;
  const wishZ = input.z;
  const wishSpeed = Math.hypot(wishX, wishZ);
  if (wishSpeed < 0.001) {
    const speed = Math.hypot(s.vx, s.vz);
    if (speed > 0.0001) {
      const drop = speed * p.friction * dt;
      const ns = Math.max(0, speed - drop);
      const scale = ns / speed;
      s.vx *= scale;
      s.vz *= scale;
    }
    return s;
  }
  const wx = wishX / wishSpeed;
  const wz = wishZ / wishSpeed;

  let speed = Math.hypot(s.vx, s.vz);
  if (speed > p.maxSpeed) {
    const dot = s.vx * wx + s.vz * wz;
    if (dot > p.maxSpeed) {
      const scale = p.maxSpeed / dot;
      s.vx *= scale;
      s.vz *= scale;
    }
  } else {
    const add = p.accel * dt * wishSpeed;
    const newSpeed = Math.min(speed + add, p.maxSpeed);
    if (speed < 0.0001) {
      s.vx = wx * newSpeed;
      s.vz = wz * newSpeed;
    } else {
      const curDot = (s.vx * wx + s.vz * wz) / speed;
      const scale = newSpeed / speed;
      const mix = clamp((newSpeed - speed) / add, 0, 1) * 0.5;
      s.vx = s.vx * scale + (wx - curDot * s.vx / speed) * add * mix;
      s.vz = s.vz * scale + (wz - curDot * s.vz / speed) * add * mix;
      const sp = Math.hypot(s.vx, s.vz) || 1;
      s.vx *= newSpeed / sp;
      s.vz *= newSpeed / sp;
    }
  }
  return s;
}

/**
 * Air movement: momentum preserved + small air control.
 */
export function moveAir(s, input, p, dt) {
  const wishSpeed = Math.hypot(input.x, input.z);
  if (wishSpeed < 0.001) return s;
  const wx = input.x / wishSpeed;
  const wz = input.z / wishSpeed;
  const accel = p.airAccel * dt * wishSpeed;
  const vx = s.vx + wx * accel;
  const vz = s.vz + wz * accel;
  const speed = Math.hypot(vx, vz);
  const maxAirSpeed = p.maxSpeed * p.airMaxSpeedFactor;
  if (speed > maxAirSpeed) {
    const scale = maxAirSpeed / speed;
    s.vx = vx * scale;
    s.vz = vz * scale;
  } else {
    s.vx = vx;
    s.vz = vz;
  }
  return s;
}

/** Apply gravity to vertical velocity. */
export function applyGravity(s, gravity, dt) {
  s.vy -= gravity * dt;
  return s;
}

/**
 * Full kinematic step: integrate horizontal + vertical, resolve floor/collision
 * and crouch/sprint state. Returns a new state object.
 */
export function stepPlayer(s, input, p, dt) {
  const out = { ...s };

  // Refresh coyote time while grounded.
  if (out.grounded) out.coyote = p.coyoteTime;

  const wantCrouch = !!input.crouch && (out.grounded || !p.crouchJump);
  out.crouch = wantCrouch ? 1 : 0;

  const wantSprint = !!input.sprint && !out.crouch && Math.hypot(input.x, input.z) > 0.2 && out.grounded;
  out.sprint = wantSprint ? 1 : 0;

  const maxSpeed = out.sprint ? p.runSpeed : out.crouch ? p.crouchSpeed : p.walkSpeed;

  if (out.grounded) {
    moveGround(out, input, { accel: p.groundAccel, maxSpeed, friction: p.friction, airControl: 0 }, dt);
  } else {
    moveAir(out, input, { airAccel: p.airAccel, maxSpeed, airMaxSpeedFactor: p.airMaxSpeedFactor }, dt);
  }

  if (!out.grounded) {
    out.vy -= p.gravity * dt;
  } else if (out.vy < 0) {
    out.vy = 0;
  }

  if (input.jump) out.buffer = p.jumpBuffer;
  else out.buffer = Math.max(0, out.buffer - dt);
  if (out.coyote > 0 && out.buffer > 0) {
    out.vy = p.jumpSpeed;
    out.grounded = false;
    out.coyote = 0;
    out.buffer = 0;
    out.jumped = true;
  } else {
    out.jumped = false;
  }

  out.px += out.vx * dt;
  out.py += out.vy * dt;
  out.pz += out.vz * dt;

  if (out.py <= p.floorY && out.vy <= 0) {
    if (!out.grounded) {
      out.landed = true;
      out.vyLand = Math.abs(out.vy);
    } else {
      out.landed = false;
      out.vyLand = 0;
    }
    out.py = p.floorY;
    out.vy = 0;
    out.grounded = true;
    out.coyote = p.coyoteTime;
  } else {
    out.landed = false;
    out.grounded = false;
    out.coyote = Math.max(0, out.coyote - dt);
  }

  if (out.dashTimer > 0) {
    out.dashTimer -= dt;
    out.vx = out.dashDirX * p.dashSpeed;
    out.vz = out.dashDirZ * p.dashSpeed;
    if (out.dashTimer <= 0) {
      out.vx *= p.dashEndFactor;
      out.vz *= p.dashEndFactor;
    }
  } else if (input.dash && out.dashCooldown <= 0) {
    out.dashTimer = p.dashDuration;
    out.dashCooldown = p.dashCooldown;
    const len = Math.hypot(input.x, input.z);
    if (len > 0.01) {
      out.dashDirX = input.x / len;
      out.dashDirZ = input.z / len;
    } else {
      out.dashDirX = 0;
      out.dashDirZ = 0;
    }
    out.dashed = true;
  } else {
    out.dashed = false;
    out.dashCooldown = Math.max(0, out.dashCooldown - dt);
  }

  return out;
}

/** Landing impact velocity for camera shake. */
export function landingImpact(s, p) {
  return clamp(Math.abs(s.vyLand) / p.jumpSpeed, 0, 1);
}

/** FOV kick based on speed (for sprint). */
export function speedFov(groundSpeed, maxSpeed, baseFov, kick = 8) {
  const t = clamp(groundSpeed / maxSpeed, 0, 1);
  return baseFov + t * kick;
}

/** Head-bob offset given phase, intensity and bob amount. */
export function headbobOffset(phase, intensity, bobAmount) {
  return {
    x: Math.sin(phase * 2) * 0.06 * intensity * bobAmount,
    y: Math.sin(phase) * 0.05 * intensity * bobAmount,
  };
}

/** Step length so bob frequency matches stride speed. */
export function bobPhaseDelta(groundSpeed, bobFrequency) {
  return groundSpeed * bobFrequency;
}
