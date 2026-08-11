// ============================================================================
// ProjectileSystem.js
// Moves projectile entities, resolves hits against enemies/player/walls, and
// applies damage with pierce, AoE, homing, proximity fuses, and ricochets.
// Spawns impact effects, tracers, damage numbers, and SFX. Runs in Combat.
// ============================================================================

import * as THREE from 'three';
import { System, Phase } from '../ecs/System.js';
import { Body } from '../ecs/components/Body.js';
import { Projectile, StatusType } from '../ecs/components/Combat.js';
import { Lifetime } from '../ecs/components/Lifecycle.js';
import { Teams } from '../ecs/components/Body.js';
import { applyDamage, rollCrit } from '../combat/Damage.js';
import { rayAABB } from '../combat/Hitscan.js';
import { bus, Channels } from '../core/EventBus.js';
import { clamp } from '../core/MathUtils.js';

const _dir = new THREE.Vector3();
const _toTarget = new THREE.Vector3();
const _hitPoint = new THREE.Vector3();

export class ProjectileSystem extends System {
  constructor() {
    super({ query: { all: ['Projectile', 'Body'], tags: ['Projectile'] }, priority: Phase.Combat });
    this.arena = null;
    this.effects = null;
    this.world2 = null;
    this.progression = null;
    this.enemyQuery = null;
    this._playerEntity = null;
  }

  onAttach(world) {
    super.onAttach(world);
    this.enemyQuery = world.query({ all: ['Body', 'Health'], tags: ['Enemy'] });
  }

  setPlayer(p) { this._playerEntity = p; }

  fixedUpdate(fixed) {
    if (!this.query) return;
    const arena = this.arena;
    const solids = arena ? arena.solids : null;
    const player = this._playerEntity;
    this.query.forEach((projE) => {
      const proj = projE.get(Projectile.type);
      const body = projE.get(Body.type);
      if (!proj || !body) return;

      // homing steer
      if (proj.homing > 0 && proj.targetId) {
        const target = this.world.entities.get(proj.targetId);
        if (target && target.alive) {
          const tb = target.get(Body.type);
          if (tb) {
            _toTarget.set(tb.pos.x - body.pos.x, (tb.pos.y + tb.height * 0.5) - body.pos.y, tb.pos.z - body.pos.z).normalize();
            _dir.copy(body.vel).normalize();
            _dir.lerp(_toTarget, clamp(proj.homing * fixed * 4, 0, 1)).normalize();
            const speed = body.vel.length();
            body.vel.copy(_dir).multiplyScalar(speed);
            if (projE.get('MeshRef')?.object) {
              projE.get('MeshRef').object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), _dir);
            }
          }
        }
      }

      // step (substep for fast projectiles to avoid tunneling)
      const speed = body.vel.length();
      const steps = Math.max(1, Math.ceil(speed * fixed / 0.5));
      const sub = fixed / steps;
      for (let s = 0; s < steps; s++) {
        body.pos.x += body.vel.x * sub;
        body.pos.y += body.vel.y * sub;
        body.pos.z += body.vel.z * sub;

        // wall collision
        if (solids && solids.length) {
          let hitWall = false;
          for (const solid of solids) {
            if (body.pos.x > solid.min.x - body.radius && body.pos.x < solid.max.x + body.radius &&
                body.pos.z > solid.min.z - body.radius && body.pos.z < solid.max.z + body.radius &&
                body.pos.y > solid.min.y - body.radius && body.pos.y < solid.max.y + body.radius) {
              hitWall = true;
              _hitPoint.copy(body.pos);
              break;
            }
          }
          if (hitWall) {
            if (proj.ricochet > 0 && proj.bouncesLeft > 0) {
              // approximate reflect off nearest face
              proj.bouncesLeft--;
              body.vel.x = -body.vel.x * 0.8; body.vel.z = -body.vel.z * 0.8;
              body.pos.x += body.vel.x * sub; body.pos.z += body.vel.z * sub;
              if (this.effects) this.effects.hitSpark(_hitPoint, new THREE.Vector3(0, 1, 0), proj.color, 6);
            } else {
              this._impact(projE, _hitPoint, new THREE.Vector3(0, 1, 0), null);
              return;
            }
          }
        }

        // boundary
        if (arena && arena.circularBounds !== false) {
          const dx = body.pos.x - arena.centerX, dz = body.pos.z - arena.centerZ;
          if (dx * dx + dz * dz > arena.boundsRadius * arena.boundsRadius) {
            this._impact(projE, body.pos.clone(), new THREE.Vector3(-dx, 0, -dz).normalize(), null);
            return;
          }
        }

        // entity hits
        if (proj.team === Teams.Player) {
          const targets = this.enemyQuery ? this.enemyQuery.array : [];
          for (const t of targets) {
            if (!t.alive || !t.active) continue;
            if (proj.hits.has(t.id)) continue;
            const tb = t.get(Body.type);
            if (!tb) continue;
            const dx = body.pos.x - tb.pos.x, dy = body.pos.y - (tb.pos.y + tb.height * 0.5), dz = body.pos.z - tb.pos.z;
            const r = tb.radius + body.radius;
            if (dx * dx + dy * dy + dz * dz <= r * r) {
              const headshot = (body.pos.y >= tb.pos.y + tb.height * 0.82) && proj.canHeadshot;
              this._hitEntity(projE, t, body.pos.clone(), headshot);
              proj.hits.add(t.id);
              if (proj.hits.size >= proj.maxHits) { return; }
            }
          }
          // proximity fuse
          if (proj.proximityFuse > 0) {
            for (const t of targets) {
              if (!t.alive) continue; const tb = t.get(Body.type); if (!tb) continue;
              const d = body.pos.distanceTo(tb.pos);
              if (d < proj.proximityFuse) { this._impact(projE, body.pos.clone(), new THREE.Vector3(0, 1, 0), null); return; }
            }
          }
        } else if (proj.team === Teams.Enemy && player && player.alive) {
          const pb = player.get(Body.type);
          if (pb) {
            const dx = body.pos.x - pb.pos.x, dy = body.pos.y - (pb.pos.y + pb.height * 0.5), dz = body.pos.z - pb.pos.z;
            const r = pb.radius + body.radius;
            if (dx * dx + dy * dy + dz * dz <= r * r) {
              this._hitEntity(projE, player, body.pos.clone(), false);
              return;
            }
          }
        }
      }
    });
  }

  _hitEntity(projE, target, point, headshot) {
    const proj = projE.get(Projectile.type);
    const crit = rollCrit(proj.critChance, proj.critMult, headshot ? 1 : 0, headshot ? 1.5 : 1.5);
    const amount = proj.damage * crit.mult;
    const ctx = {
      amount, type: proj.damageType, crit: crit.crit, headshot,
      knockback: proj.knockback, statusChance: proj.statusChance, statusType: proj.statusType,
      statusPower: proj.statusPower, statusDuration: proj.statusDuration, lifesteal: proj.lifesteal,
      armorPen: 0, attacker: this.world.entities.get(proj.ownerId) || null,
      world: this.world, effects: this.effects, progression: this.progression,
      hitPoint: point, hitNormal: new THREE.Vector3(0, 1, 0), source: proj.team,
    };
    const res = applyDamage(target, ctx);
    if (this.effects) {
      const tb = target.get(Body.type);
      const color = proj.color;
      this.effects.hitSpark(point, new THREE.Vector3(0, 1, 0), color, crit.crit ? 16 : 8);
      if (res.dealt > 0) {
        const nc = crit.crit ? (crit.headshot ? '#ffd24a' : '#ff7d3d') : '#ffffff';
        this.effects.damageNumber(point, res.dealt, nc, crit.crit);
      }
      if (res.killed) this.effects.bloodOrEnergy(point, color, 18);
    }
    bus.emit(Channels.ProjectileHit, { projectile: projE, target, point, killed: res.killed });
    // AoE explosion on hit if configured
    if (proj.aoeRadius > 0) this._explode(projE, point);
    else projE.destroy();
  }

  _impact(projE, point, normal, hitEntity) {
    const proj = projE.get(Projectile.type);
    if (this.effects) this.effects.hitSpark(point, normal, proj.color, 6);
    if (proj.aoeRadius > 0) this._explode(projE, point);
    else projE.destroy();
  }

  _explode(projE, point) {
    const proj = projE.get(Projectile.type);
    if (this.effects) this.effects.explosion(point, proj.aoeRadius, proj.color, proj.aoeRadius > 4);
    bus.emit(Channels.PlaySFX, { name: 'explosion', volume: 0.7, size: proj.aoeRadius / 4 });
    const enemies = this.enemyQuery ? this.enemyQuery.array : [];
    for (const t of enemies) {
      if (!t.alive) continue;
      const tb = t.get(Body.type); if (!tb) continue;
      const d = point.distanceTo(tb.pos);
      if (d > proj.aoeRadius + (tb.radius || 0)) continue;
      const falloff = 1 - clamp(d / proj.aoeRadius, 0, 1) * proj.aoeFalloff;
      const amount = proj.damage * falloff;
      const ctx = {
        amount, type: proj.damageType, crit: false, headshot: false,
        knockback: proj.knockback * 2, statusChance: proj.statusChance, statusType: proj.statusType,
        statusPower: proj.statusPower, statusDuration: proj.statusDuration, lifesteal: proj.lifesteal,
        armorPen: 0, attacker: this.world.entities.get(proj.ownerId) || null,
        world: this.world, effects: this.effects, progression: this.progression,
        hitPoint: point.clone(), hitNormal: new THREE.Vector3(0, 1, 0), source: proj.team,
      };
      const res = applyDamage(t, ctx);
      if (this.effects && res.dealt > 0) this.effects.damageNumber(tb.pos.clone().setY(tb.pos.y + 1.2), res.dealt, '#ffaa44', false);
    }
    // also damage player if enemy explosion
    if (proj.team === Teams.Enemy && this._playerEntity && this._playerEntity.alive) {
      const pb = this._playerEntity.get(Body.type);
      if (pb) {
        const d = point.distanceTo(pb.pos);
        if (d < proj.aoeRadius + pb.radius) {
          const falloff = 1 - clamp(d / proj.aoeRadius, 0, 1) * proj.aoeFalloff;
          applyDamage(this._playerEntity, {
            amount: proj.damage * falloff, type: proj.damageType, crit: false, headshot: false,
            knockback: proj.knockback * 2, statusChance: 0, lifesteal: 0, armorPen: 0,
            attacker: null, world: this.world, effects: this.effects, hitPoint: point.clone(), source: 'enemy',
          });
        }
      }
    }
    projE.destroy();
  }
}
