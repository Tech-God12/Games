// ============================================================================
// VitalsSystem.js
// Ticks regeneration (health + shield) with damage-delay windows, counts down
// timed invulnerability, and reapplies health clamp. Runs in the Sim phase.
// ============================================================================

import { System, Phase } from '../ecs/System.js';
import { Health, Shield, Regeneration, Invulnerability } from '../ecs/components/Vitals.js';

export class VitalsSystem extends System {
  constructor() {
    super({ query: { any: ['Health', 'Shield', 'Regeneration', 'Invulnerability'] }, priority: Phase.Sim });
    this.elapsed = 0;
  }

  fixedUpdate(fixed) {
    if (!this.query) return;
    this.elapsed += fixed;
    const now = (this.world && this.world.clock) ? this.world.clock.elapsed : this.elapsed;
    this.query.forEach((e) => {
      const health = e.get(Health.type);
      if (health && health.alive) {
        // timed invulnerability
        if (health.invulnTime > 0) {
          health.invulnTime -= fixed;
          if (health.invulnTime <= 0) { health.invulnTime = 0; health.invincible = false; }
        }
        // regeneration
        if (health.regen > 0 && health.current < health.max) {
          if (now - health.lastDamagedAt >= health.regenDelay) {
            health.current = Math.min(health.max, health.current + health.regen * fixed);
          }
        }
        if (health.current > health.max) health.current = health.max;
      }
      const shield = e.get(Shield.type);
      if (shield && shield.max > 0) {
        if (shield.current < shield.max && now - shield.lastDamagedAt >= shield.regenDelay) {
          shield.current = Math.min(shield.max, shield.current + shield.regen * fixed);
        }
      }
      const regen = e.get(Regeneration.type);
      if (regen && health && health.alive) {
        if (now - regen.lastAt >= regen.delay) {
          health.current = Math.min(health.max, health.current + regen.rate * fixed);
          regen.lastAt = now;
        }
      }
      const inv = e.get(Invulnerability.type);
      if (inv) {
        inv.time -= fixed;
        if (inv.time <= 0) { e.remove(Invulnerability.type); if (health) health.invincible = false; }
      }
    });
  }
}
