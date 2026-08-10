// ============================================================================
// BossAISystem.js
// Drives boss phase transitions and ability rotations. Advances phases at
// health thresholds, sequences abilities from the current phase's queue, and
// maintains multi-tick patterns (spiral volleys, charge slams). The base
// movement/attack comes from the Enemy component via EnemyAISystem; this
// system layers boss-specific attack patterns on top.
// ============================================================================

import * as THREE from 'three';
import { System, Phase } from '../ecs/System.js';
import { Body } from '../ecs/components/Body.js';
import { Enemy } from '../ecs/components/Gameplay.js';
import { Boss } from '../ecs/components/Gameplay.js';
import { Health } from '../ecs/components/Vitals.js';
import { BossAbilities } from '../bosses/Boss.js';
import { BossRegistry } from '../bosses/BossRegistry.js';
import { bus, Channels } from '../core/EventBus.js';
import { clamp, TAU } from '../core/MathUtils.js';

const _v = new THREE.Vector3();

export class BossAISystem extends System {
  constructor() {
    super({ query: { all: ['Boss', 'Body'], tags: ['Boss'] }, priority: Phase.AI + 1 });
    this.player = null;
    this.effects = null;
    this.projectileFactory = null;
    this.arena = null;
    this.spawnEnemy = null;
    this.elapsed = 0;
  }

  setPlayer(p) { this.player = p; }

  update(dt, sdt) {
    if (!this.query) return;
    this.elapsed += dt;
    this.query.forEach((e) => {
      const boss = e.get(Boss.type);
      const body = e.get(Body.type);
      const health = e.get(Health.type);
      const enemy = e.get(Enemy.type);
      if (!boss || !body || !health) return;
      const def = BossRegistry.get(boss.bossId);
      if (!def) return;

      // phase transitions
      const frac = health.current / health.max;
      while (boss.phase < def.phases.length && frac <= def.phases[boss.phase].threshold) {
        // current phase index is boss.phase-1; next is boss.phase
        boss.phase++;
        const phaseDef = def.phases[boss.phase - 1];
        boss.abilityQueue = phaseDef.abilities.slice();
        enemy.speedScale = (def.speed / (e.meta.baseSpeed || def.speed)) * phaseDef.speedMult;
        e.meta.baseSpeed = def.speed * phaseDef.speedMult;
        enemy.damageScale = phaseDef.damageMult;
        boss.abilityTimer = 0.5;
        boss.invulnDuringAbility = false;
        if (this.effects) { this.effects.flash(body.pos.clone().setY(body.height * 0.5), def.color, 3); this.effects.addShake(0.5); this.effects.screenFlash([255, 60, 200], 0.4); }
        bus.emit(Channels.PlaySFX, { name: 'boss_roar', volume: 0.6 });
        bus.emit(Channels.Toast, { text: `${def.title} — PHASE ${boss.phase}`, color: '#ff3df0' });
      }

      const phaseDef = def.phases[boss.phase - 1] || def.phases[def.phases.length - 1];
      const ctx = {
        world: this.world, player: this.player, effects: this.effects,
        projectileFactory: this.projectileFactory, arena: this.arena,
        spawnEnemy: this.spawnEnemy, color: def.color, damageMult: enemy.damageScale, time: this.elapsed,
      };

      // multi-tick spiral
      const meta = e.meta = e.meta || {};
      if (meta.spiral && meta.spiral.time > 0) {
        meta.spiral.time -= dt;
        meta.spiral.angle += dt * 6;
        const arms = meta.spiral.arms;
        const from = _v.set(body.pos.x, body.pos.y + body.height * 0.5, body.pos.z);
        for (let a = 0; a < arms; a++) {
          const ang = meta.spiral.angle + (a / arms) * TAU;
          const dir = new THREE.Vector3(Math.cos(ang), 0, Math.sin(ang)).normalize();
          this.projectileFactory.spawn({
            position: from.clone(), direction: dir, team: 'enemy', ownerId: e.id,
            damage: 10 * enemy.damageScale, damageType: 'energy', knockback: 3, color: def.accent,
            projectile: { speed: 26, gravity: 0, lifetime: 3.5, color: def.accent, radius: 0.22, shape: 'orb', scale: 1, glow: true, trail: true },
          });
        }
        if (meta.spiral.time <= 0) meta.spiral = null;
      }

      // pending slam
      if (meta.slamPending) {
        meta.slamPending -= dt;
        // when close to player or timeout, detonate
        const pb = this.player?.get(Body);
        const close = pb && body.pos.distanceTo(pb.pos) < 3;
        if (close || meta.slamPending <= 0) {
          if (this.effects) { this.effects.explosion(body.pos.clone().setY(0.5), 6, 0xff7733, true); this.effects.addShake(0.6); }
          bus.emit(Channels.PlaySFX, { name: 'explosion', volume: 0.7 });
          if (pb && body.pos.distanceTo(pb.pos) < 6) {
            // damage player via applyDamage done in contact; here just knockback
            const kb = _v.subVectors(pb.pos, body.pos).setY(0).normalize();
            pb.vel.addScaledVector(kb, 14); pb.vel.y += 6;
          }
          meta.slamPending = 0;
        }
      }

      // ability rotation
      boss.abilityTimer -= dt;
      if (boss.abilityTimer <= 0 && (!meta.spiral)) {
        const abilities = boss.abilityQueue;
        if (abilities && abilities.length) {
          const name = abilities[Math.floor(Math.random() * abilities.length)];
          const fn = BossAbilities[name];
          const power = 1 + (boss.phase - 1) * 0.25;
          if (fn) fn(e, ctx, power);
          // spiral sets its own multi-tick state; others are instant
          boss.abilityTimer = phaseDef.abilityInterval * (0.7 + Math.random() * 0.6);
        }
      }
    });
  }
}
