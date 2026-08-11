// ============================================================================
// LifetimeSystem.js
// Ticks Lifetime and RangeDespawn components and removes expired entities.
// Also processes MarkForRemoval delayed removals. Runs in the Cleanup phase.
// ============================================================================

import { System, Phase } from '../ecs/System.js';
import { Lifetime, RangeDespawn, MarkForRemoval } from '../ecs/components/Lifecycle.js';

export class LifetimeSystem extends System {
  constructor() {
    super({ query: { any: ['Lifetime', 'RangeDespawn', 'MarkForRemoval'] }, priority: Phase.Cleanup });
  }

  fixedUpdate(fixed) {
    if (!this.query) return;
    this.query.forEach((e) => {
      const life = e.get(Lifetime.type);
      if (life) {
        life.age += fixed;
        if (life.age >= life.duration) { e.destroy(); return; }
      }
      const rd = e.get(RangeDespawn.type);
      if (rd) {
        const body = e.get('Body');
        if (body) {
          const dx = body.pos.x - rd.originX, dz = body.pos.z - rd.originZ;
          if (dx * dx + dz * dz > rd.maxDist * rd.maxDist) { e.destroy(); return; }
        }
      }
      const m = e.get(MarkForRemoval.type);
      if (m) {
        m.delay -= fixed;
        if (m.delay <= 0) e.destroy();
      }
    });
  }
}
