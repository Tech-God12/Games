// ============================================================================
// Vitals.js — health, shield, armor, regeneration, invulnerability.
// ============================================================================

import { Component } from '../Component.js';

export class Health extends Component {
  static type = 'Health';
  constructor() {
    super();
    this.current = 100;
    this.max = 100;
    this.regen = 0;          // hp/sec
    this.regenDelay = 3.0;   // seconds after damage before regen resumes
    this.lastDamagedAt = -999;
    this.invincible = false;
    this.invulnTime = 0;     // timed invulnerability
    this.armor = 0;          // flat damage reduction
    this.damageMult = 1.0;   // incoming damage multiplier (debuffs)
    this.alive = true;
    this.deathBuffer = 0;    // time between death and removal (for effects)
  }
  reset() {
    this.current = 100; this.max = 100; this.regen = 0; this.regenDelay = 3.0;
    this.lastDamagedAt = -999; this.invincible = false; this.invulnTime = 0;
    this.armor = 0; this.damageMult = 1.0; this.alive = true; this.deathBuffer = 0;
  }
  get fraction() { return this.max > 0 ? this.current / this.max : 0; }
  get isDead() { return this.current <= 0; }
}

export class Shield extends Component {
  static type = 'Shield';
  constructor() {
    super();
    this.current = 0;
    this.max = 0;
    this.regen = 5.0;
    this.regenDelay = 2.5;
    this.lastDamagedAt = -999;
    this.absorbOrder = 1; // shields absorb before health
  }
  reset() { this.current = 0; this.max = 0; this.regen = 5.0; this.regenDelay = 2.5; this.lastDamagedAt = -999; this.absorbOrder = 1; }
  get fraction() { return this.max > 0 ? this.current / this.max : 0; }
}

export class Regeneration extends Component {
  static type = 'Regeneration';
  constructor() { super(); this.rate = 2.0; this.delay = 3.0; this.lastAt = -999; }
  reset() { this.rate = 2.0; this.delay = 3.0; this.lastAt = -999; }
}

/** Temporary invulnerability window with optional flash timing. */
export class Invulnerability extends Component {
  static type = 'Invulnerability';
  constructor() { super(); this.time = 0; this.maxTime = 0; this.flashRate = 12; }
  reset() { this.time = 0; this.maxTime = 0; this.flashRate = 12; }
}
