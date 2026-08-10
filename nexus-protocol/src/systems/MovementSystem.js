// ============================================================================
// MovementSystem.js
// Integrates Body velocity for non-player, non-projectile entities (enemies,
// pickups, debris). Applies ground friction, gravity, ground clamping, and
// circular arena bounds. Player & projectile motion are handled by dedicated
// controllers to keep their bespoke logic isolated.
// ============================================================================

import * as THREE from 'three';
import { System, Phase } from '../ecs/System.js';
import { Body } from '../ecs/components/Body.js';
import { clamp } from '../core/MathUtils.js';

export class MovementSystem extends System {
  constructor() {
    super({ query: { all: ['Body'], none: ['Player', 'Projectile'] }, priority: Phase.Movement });
    this.arena = null;        // set by Game
    this.gravity = -22;
    this.floorY = 0;
  }

  fixedUpdate(fixed) {
    if (!this.query) return;
    const arena = this.arena;
    const boundsR = arena ? arena.boundsRadius : 60;
    const floorY = arena ? arena.floorY : 0;
    this.query.forEach((e) => {
      const body = e.get(Body.type);
      if (!body) return;
      // gravity
      if (body.gravityScale > 0) {
        body.vel.y += this.gravity * body.gravityScale * fixed;
      }
      // integrate
      body.pos.x += body.vel.x * fixed;
      body.pos.y += body.vel.y * fixed;
      body.pos.z += body.vel.z * fixed;

      // ground clamp (simple floor at floorY + half-height)
      const minY = floorY + (body.gravityScale > 0 ? body.height * 0.5 : 0);
      if (body.pos.y < minY) {
        body.pos.y = minY;
        if (body.vel.y < 0) body.vel.y = 0;
        body.grounded = true;
        // ground friction (horizontal)
        if (body.friction > 0) {
          const f = Math.max(0, 1 - body.friction * fixed);
          body.vel.x *= f; body.vel.z *= f;
        }
      } else {
        body.grounded = false;
      }

      // circular bounds (bounce/stop)
      if (arena && arena.circularBounds !== false) {
        const dx = body.pos.x - arena.centerX;
        const dz = body.pos.z - arena.centerZ;
        const d = Math.hypot(dx, dz);
        const maxR = boundsR - body.radius;
        if (d > maxR) {
          const nx = dx / d, nz = dz / d;
          body.pos.x = arena.centerX + nx * maxR;
          body.pos.z = arena.centerZ + nz * maxR;
          // reflect outward velocity
          const vdot = body.vel.x * nx + body.vel.z * nz;
          if (vdot > 0) {
            body.vel.x -= 2 * vdot * nx;
            body.vel.z -= 2 * vdot * nz;
            body.vel.x *= 0.5; body.vel.z *= 0.5;
          }
        }
      }

      // pillar collision (AABB push-out) — keep enemies out of cover boxes
      if (arena && arena.solids && arena.solids.length) {
        this._resolveSolids(body, arena.solids);
      }
    });
  }

  _resolveSolids(body, solids) {
    for (const s of solids) {
      const cx = (s.min.x + s.max.x) * 0.5, cz = (s.min.z + s.max.z) * 0.5;
      const hx = (s.max.x - s.min.x) * 0.5 + body.radius;
      const hz = (s.max.z - s.min.z) * 0.5 + body.radius;
      const dx = body.pos.x - cx, dz = body.pos.z - cz;
      if (Math.abs(dx) < hx && Math.abs(dz) < hz && body.pos.y < s.max.y + body.radius) {
        // push out along least penetration axis
        const px = hx - Math.abs(dx);
        const pz = hz - Math.abs(dz);
        if (px < pz) {
          body.pos.x = cx + Math.sign(dx || 1) * hx;
          body.vel.x = 0;
        } else {
          body.pos.z = cz + Math.sign(dz || 1) * hz;
          body.vel.z = 0;
        }
      }
    }
  }
}
