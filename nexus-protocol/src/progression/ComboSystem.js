// ============================================================================
// ComboSystem.js
// Kill combo / multiplier system: chaining kills within a time window builds
// a combo counter and score multiplier that decays if you stop. Grants bonus
// currency and triggers milestone effects (visual + SFX) at thresholds. Adds
// a satisfying rhythm to combat and rewards aggressive play.
// ============================================================================

import { bus, Channels } from '../core/EventBus.js';
import { clamp, lerp, formatNumber } from '../core/MathUtils.js';

export const ComboThresholds = [
  { count: 5, label: 'NICE', color: 0x9fe7ff },
  { count: 10, label: 'COMBO', color: 0x4fd07a },
  { count: 20, label: 'SLAYING', color: 0xffb347 },
  { count: 35, label: 'RAMPAGE', color: 0xff5544 },
  { count: 50, label: 'UNSTOPPABLE', color: 0xff3df0 },
  { count: 75, label: 'GODLIKE', color: 0xffe066 },
  { count: 100, label: 'TRANSCENDENT', color: 0xffffff },
];

export class ComboSystem {
  constructor(progression, effects) {
    this.progression = progression;
    this.effects = effects;
    this.count = 0;
    this.maxCount = 0;
    this.window = 3.0;       // seconds to maintain combo
    this.timer = 0;
    this.multiplier = 1;
    this.lastMilestone = 0;
    this._unsub = bus.on(Channels.EntityKilled, (ev) => this.onKill(ev));
  }

  onKill(ev) {
    if (ev.entity && ev.entity.hasTag && ev.entity.hasTag('Player')) return;
    this.count++;
    this.maxCount = Math.max(this.maxCount, this.count);
    this.timer = this.window;
    this._recomputeMultiplier();
    this._checkMilestone();
    // bonus currency on combo
    if (this.count >= 5 && this.progression) {
      const bonus = Math.floor(this.count * 0.5);
      this.progression.addCurrency(bonus);
    }
  }

  _recomputeMultiplier() {
    // multiplier grows with combo: 1 + combo/20, capped at 5
    this.multiplier = clamp(1 + this.count / 20, 1, 5);
  }

  _checkMilestone() {
    for (const t of ComboThresholds) {
      if (this.count === t.count) {
        this.lastMilestone = t.count;
        bus.emit(Channels.Toast, { text: `${t.label} x${this.count}`, color: '#' + (t.color & 0xffffff).toString(16).padStart(6, '0') });
        bus.emit(Channels.PlaySFX, { name: 'levelup', volume: 0.4 + clamp(this.count / 100, 0, 0.4) });
        if (this.effects) { this.effects.addShake(clamp(0.1 + this.count / 200, 0.1, 0.5)); this.effects.screenFlash([t.color >> 16 & 255, t.color >> 8 & 255, t.color & 255], 0.3); }
        bus.emit('combo.milestone', { count: this.count, label: t.label, color: t.color });
      }
    }
  }

  /** Apply combo multiplier to score gains. */
  applyScore(base) { return Math.floor(base * this.multiplier); }

  update(dt) {
    if (this.count > 0) {
      this.timer -= dt;
      if (this.timer <= 0) {
        // combo broken
        if (this.count >= 10) bus.emit(Channels.Toast, { text: `COMBO ENDED x${this.count}`, color: '#6f86a8' });
        this.count = 0;
        this.multiplier = 1;
        this.timer = 0;
      }
    }
  }

  reset() { this.count = 0; this.maxCount = 0; this.timer = 0; this.multiplier = 1; this.lastMilestone = 0; }

  get fraction() { return this.count > 0 ? clamp(this.timer / this.window, 0, 1) : 0; }
  get active() { return this.count > 0; }
}
