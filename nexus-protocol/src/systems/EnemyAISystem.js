// ============================================================================
// EnemyAISystem.js
// Drives enemy behavior state machines each fixed step. Delegates movement &
// attack decisions to pluggable behavior functions (see ai/Behaviors.js) and
// handles spawn-in scaling, contact damage, facing, and status-induced
// slow/stun. Reads the player entity as the primary target.
// ============================================================================

import * as THREE from 'three';
import { System, Phase } from '../ecs/System.js';
import { Body, Facing } from '../ecs/components/Body.js';
import { Enemy, EnemyState } from '../ecs/components/Gameplay.js';
import { Health } from '../ecs/components/Vitals.js';
import { applyDamage } from '../combat/Damage.js';
import { Behaviors } from '../ai/Behaviors.js';
import { bus, Channels } from '../core/EventBus.js';
import { clamp, TAU } from '../core/MathUtils.js';

const _toPlayer = new THREE.Vector3();
const _desired = new THREE.Vector3();

export class EnemyAISystem extends System {
  constructor() {
    super({ query: { all: ['Enemy', 'Body'], tags: ['Enemy'] }, priority: Phase.AI });
    this.player = null;
    this.arena = null;
    this.effects = null;
    this.projectileFactory = null;
    this.progression = null;
    this.spawnEnemy = null;     // (archetypeId, x, z, opts) => entity, set by Game
    this.elapsed = 0;
  }

  setPlayer(p) { this.player = p; }

  fixedUpdate(fixed) {
    if (!this.query) return;
    this.elapsed += fixed;
    const player = this.player;
    const ctx = {
      world: this.world, player, arena: this.arena, effects: this.effects,
      projectileFactory: this.projectileFactory, progression: this.progression,
      time: this.elapsed, fixed, toPlayer: _toPlayer, desired: _desired,
      applyDamage, spawnEnemy: (id, x, z, opts) => this.spawnEnemy && this.spawnEnemy(id, x, z, opts),
    };
    this.query.forEach((e) => {
      const enemy = e.get(Enemy.type);
      const body = e.get(Body.type);
      if (!enemy || !body) return;
      const health = e.get(Health.type);
      if (health && !health.alive) return;

      // status factors
      const factor = e.meta.speedFactor != null ? e.meta.speedFactor : 1;
      const stunned = !!e.meta.stunned;

      enemy.stateTime += fixed;
      if (enemy.attackCooldown > 0) enemy.attackCooldown -= fixed;

      // spawn-in animation
      if (enemy.state === EnemyState.Spawn) {
        enemy.stateTime += 0;
        const spawnDur = 0.5;
        if (enemy.stateTime >= spawnDur) { enemy.state = EnemyState.Chase; enemy.stateTime = 0; }
        // scale mesh up
        const meshRef = e.get('MeshRef');
        if (meshRef && meshRef.object) {
          const t = clamp(enemy.stateTime / spawnDur, 0, 1);
          const s = 0.2 + 0.8 * (1 - Math.pow(1 - t, 3));
          meshRef.object.scale.setScalar(s);
        }
        return;
      }

      // player reference
      let pb = null;
      if (player && player.alive) pb = player.get(Body.type);
      if (!pb) { // idle/wander if no player
        enemy.state = EnemyState.Idle;
        body.vel.x *= 0.9; body.vel.z *= 0.9;
        return;
      }

      _toPlayer.set(pb.pos.x - body.pos.x, 0, pb.pos.z - body.pos.z);
      const dist = _toPlayer.length();
      _toPlayer.normalize();

      // leash / despawn if absurdly far
      if (dist > enemy.leashDist) { e.destroy(); return; }

      // behavior
      const behavior = Behaviors.get(enemy.behavior);
      if (behavior && !stunned) {
        behavior(enemy, e, ctx, dist);
      } else {
        body.vel.x *= 0.8; body.vel.z *= 0.8;
      }

      // apply speed factor (slow/haste)
      body.vel.x *= factor; body.vel.z *= factor;

      // facing toward player
      const facing = e.get(Facing.type);
      if (facing) {
        const targetYaw = Math.atan2(_toPlayer.x, _toPlayer.z);
        facing.yaw += clamp(((targetYaw - facing.yaw + Math.PI * 3) % (Math.PI * 2)) - Math.PI, -1, 1) * 0.2;
      }

      // contact damage for melee behaviors
      if (enemy.behavior !== 'shooter' && enemy.behavior !== 'turret' && enemy.behavior !== 'summoner' && enemy.behavior !== 'healer' && enemy.behavior !== 'shielder') {
        if (dist < body.radius + (pb.radius || 0.4) + 0.3 && enemy.attackCooldown <= 0) {
          const dmg = (e.meta.contactDamage || 8) * enemy.damageScale;
          applyDamage(player, {
            amount: dmg, type: 'kinetic', crit: false, headshot: false, knockback: 6, statusChance: e.meta.contactStatusChance || 0,
            statusType: e.meta.contactStatusType, statusPower: e.meta.contactStatusPower, statusDuration: 2,
            lifesteal: 0, armorPen: 0, attacker: e, world: this.world, effects: this.effects,
            hitPoint: body.pos.clone(), hitNormal: _toPlayer.clone().negate(), source: 'enemy',
          });
          enemy.attackCooldown = 0.8;
          if (this.effects) this.effects.hitSpark(pb.pos.clone().setY(pb.pos.y + 1), _toPlayer, 0xff3df0, 8);
        }
      }
    });
  }
}
