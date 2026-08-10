// ============================================================================
// StatusEffectSystem.js
// Advances active status effects on entities: burn/shock/bleed damage-over-
// time, slow/freeze movement multipliers, stun lockout, mark damage amp, and
// haste speed boost. Applies tick damage on intervals and expires effects.
// ============================================================================

import * as THREE from 'three';
import { System, Phase } from '../ecs/System.js';
import { StatusEffects, StatusType } from '../ecs/components/Combat.js';
import { Health } from '../ecs/components/Vitals.js';
import { Body } from '../ecs/components/Body.js';
import { applyDamage } from '../combat/Damage.js';
import { bus, Channels } from '../core/EventBus.js';

export class StatusEffectSystem extends System {
  constructor() {
    super({ query: { all: ['StatusEffects'] }, priority: Phase.Sim });
    this.effects = null;       // for visual ticks
    this.world2 = null;
    this.elapsed = 0;
  }

  fixedUpdate(fixed) {
    if (!this.query) return;
    this.elapsed += fixed;
    this.query.forEach((e) => {
      const status = e.get(StatusEffects.type);
      if (!status) return;
      const health = e.get(Health.type);
      const body = e.get(Body.type);
      let slowMult = 1, hasteMult = 1, stunned = false, damageAmp = 1;
      const toRemove = [];
      for (const [type, s] of status.effects) {
        s.time -= fixed;
        s.tickAccum += fixed;
        if (s.time <= 0) { toRemove.push(type); continue; }
        switch (type) {
          case StatusType.Burn:
          case StatusType.Poison:
          case StatusType.Bleed: {
            const tickInterval = 0.25;
            if (s.tickAccum >= tickInterval) {
              s.tickAccum -= tickInterval;
              const dmg = s.power * tickInterval * 5; // dps ~= power*5
              if (health && health.alive) {
                // direct DoT (bypasses armor/shield rules partially)
                health.current -= dmg * (health.damageMult || 1);
                if (health.current <= 0 && health.alive) {
                  health.current = 0; health.alive = false;
                  bus.emit(Channels.EntityKilled, { entity: e, killer: null });
                  if (this.effects) { const p = body ? body.pos.clone() : new THREE.Vector3(); this.effects.death(p, type === StatusType.Burn ? 0xff6622 : 0x66ff66, 0.6); }
                  e.destroy();
                }
              }
            }
            break;
          }
          case StatusType.Slow: slowMult = Math.min(slowMult, 1 - Math.min(0.7, s.power * 0.25)); break;
          case StatusType.Freeze: slowMult = Math.min(slowMult, 1 - Math.min(0.9, s.power * 0.5)); break;
          case StatusType.Stun: stunned = true; break;
          case StatusType.Haste: hasteMult = Math.max(hasteMult, 1 + s.power * 0.2); break;
          case StatusType.Mark: damageAmp = Math.max(damageAmp, 1 + s.power * 0.15); break;
          case StatusType.Shock: /* reduces enemy accuracy handled in AI */ break;
        }
      }
      for (const t of toRemove) status.remove(t);

      // apply derived multipliers to the entity
      if (health) {
        // mark increases incoming damage; apply via damageMult (existing is multiplied)
        // We set damageMult to product of base and mark amp each tick (approx)
        if (status.has(StatusType.Mark)) health.damageMult = damageAmp; else health.damageMult = 1;
      }
      if (body) {
        const factor = stunned ? 0 : slowMult * hasteMult;
        // store on entity meta for AI/movement to read
        e.meta.speedFactor = factor;
        e.meta.stunned = stunned;
        if (stunned) { body.vel.x = 0; body.vel.z = 0; }
      }
    });
  }
}
