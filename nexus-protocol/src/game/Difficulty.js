// ============================================================================
// Difficulty.js
// Difficulty manager: applies a preset's multipliers to wave scaling, enemy
// stats, spawn rates, and economy. Selected in settings; persisted. Exposes
// the active preset and a hook the WaveManager/EnemyFactory read.
// ============================================================================

import { Balance } from '../data/Balance.js';
import { clamp } from '../core/MathUtils.js';

export const Difficulties = Balance.difficulty;

export class DifficultyManager {
  constructor(save) {
    this.save = save;
    this.id = save.settings.difficulty || 'normal';
  }
  get preset() { return Difficulties[this.id] || Difficulties.normal; }
  set(id) { if (Difficulties[id]) { this.id = id; this.save.settings.difficulty = id; this.save.markDirty(); } }
  get label() { return this.preset.label; }
  /** Apply to wave scaling opts. */
  scaleWave(opts) {
    const p = this.preset;
    return {
      ...opts,
      scaleHealth: (opts.scaleHealth || 1) * p.hpMult,
      scaleDamage: clamp((opts.scaleDamage || 1) * p.dmgMult, 1, 4),
      scaleSpeed: (opts.scaleSpeed || 1) * p.speedMult,
    };
  }
  /** Elite chance multiplier. */
  eliteChanceMult() { return this.preset.eliteChance; }
  /** Spawn budget multiplier. */
  spawnMult() { return this.preset.spawnMult; }
  /** Whether the difficulty is unlocked. */
  unlocked() {
    const bw = this.save.records.bestWave || 0;
    const req = { easy: 0, normal: 0, hard: 8, nightmare: 15, mythic: 25 };
    return (req[this.id] || 0) <= bw;
  }
  static list() { return Object.entries(Difficulties).map(([id, p]) => ({ id, label: p.label, ...p })); }
}
