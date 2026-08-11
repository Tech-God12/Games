// ============================================================================
// System.js
// Base class for systems — the logic that operates over entities matching a
// query each frame. Systems declare their query spec, an update priority, and
// which phases they run in (variable `update` for visuals/input, fixed
// `fixedUpdate` for deterministic simulation). The world wires queries on
// attach and tears them down on detach.
// ============================================================================

export const Phase = Object.freeze({
  Input: 0,
  Sim: 10,
  Combat: 20,
  AI: 30,
  Movement: 40,
  Collide: 50,
  Cleanup: 60,
  Render: 70,
});

export class System {
  constructor(spec = {}) {
    /** @type {{all?: string[], any?: string[], none?: string[], tags?: string[]}} */
    this.querySpec = spec.query || { all: [] };
    this.priority = spec.priority != null ? spec.priority : Phase.Sim;
    this.enabled = true;
    /** @type {import('./Query.js').Query} */
    this.query = null;
    this.world = null;
    this.name = this.constructor.name;
  }

  /** Called once when attached to a world. */
  onAttach(world) {
    this.world = world;
    if (this.querySpec && (this.querySpec.all?.length || this.querySpec.any?.length || this.querySpec.tags?.length)) {
      this.query = world.query(this.querySpec);
    }
  }

  onDetach() { if (this.query) { this.query.dispose(); this.query = null; } }

  /** Variable-rate update (called once per frame). */
  update(dt, sdt) {}

  /** Fixed-rate update (called at fixedStep). */
  fixedUpdate(fixed) {}

  /** Called when the world is reset/cleared. */
  reset() {}

  enable() { this.enabled = true; }
  disable() { this.enabled = false; }
}
