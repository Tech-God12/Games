// ============================================================================
// Lifecycle.js — lifetime timers and despawn behavior.
// ============================================================================

import { Component } from '../Component.js';

export class Lifetime extends Component {
  static type = 'Lifetime';
  constructor() { super(); this.duration = 5; this.age = 0; this.faded = false; }
  reset() { this.duration = 5; this.age = 0; this.faded = false; }
  get progress() { return this.duration > 0 ? Math.min(1, this.age / this.duration) : 1; }
  get remaining() { return Math.max(0, this.duration - this.age); }
}

/** Despawn after the entity strays beyond a max distance from origin. */
export class RangeDespawn extends Component {
  static type = 'RangeDespawn';
  constructor() { super(); this.maxDist = 120; this.originX = 0; this.originZ = 0; }
  reset() { this.maxDist = 120; this.originX = 0; this.originZ = 0; }
}

/** Mark an entity to be cleaned up next flush (used by death effects). */
export class MarkForRemoval extends Component {
  static type = 'MarkForRemoval';
  constructor() { super(); this.delay = 0; }
  reset() { this.delay = 0; }
}
