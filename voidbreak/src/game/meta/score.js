/**
 * VOIDBREAK — Score & combo.
 *
 * Scoring with a kill combo system: kills within the combo window multiply
 * points. Combos decay between waves or after taking damage.
 */

export class Score {
  constructor() {
    this.total = 0;
    this.combo = 0;
    this.comboTimer = 0;
    this.comboWindow = 4.0;
    this.maxCombo = 0;
    this.multiplier = 1;
  }

  extendTime(extra) {
    this.comboWindow += extra;
  }

  /** Register a kill; returns the points awarded. */
  addKill(basePoints, opts = {}) {
    this.combo++;
    this.comboTimer = this.comboWindow;
    if (this.combo > this.maxCombo) this.maxCombo = this.combo;
    const mult = this.comboMultiplier();
    const bonus = opts.bonus ?? 0;
    const points = Math.round((basePoints + bonus) * mult);
    this.total += points;
    this.multiplier = mult;
    return { points, mult, combo: this.combo };
  }

  /** Combo multiplier curve: 1x, then +0.5x per 5 combo, cap 5x. */
  comboMultiplier() {
    if (this.combo < 3) return 1;
    return Math.min(5, 1 + Math.floor((this.combo - 1) / 5) * 0.5);
  }

  /** Add raw score (wave clears, pickups). */
  add(amount) {
    this.total += Math.round(amount);
  }

  /** Reset the combo (damage taken or wave end). */
  breakCombo() {
    this.combo = 0;
    this.comboTimer = 0;
    this.multiplier = 1;
  }

  update(dt) {
    if (this.combo > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) {
        this.combo = 0;
        this.multiplier = 1;
      }
    }
  }
}
