/**
 * VOIDBREAK — Records & unlocks.
 *
 * Persistent best-run records (best wave, best score per mode/difficulty)
 * and the weapon unlock ledger. Records unlock weapons as milestones.
 */

import { Storage, KEY_PREFIX } from '../../core/storage.js';

const RECORDS_KEY = `${KEY_PREFIX}records`;

export class Records {
  constructor() {
    this.data = Storage.get(RECORDS_KEY, {
      bestScore: 0,
      bestWave: 0,
      bestScoreByMode: {},
      bestWaveByMode: {},
      bestByDifficulty: {},
      totalKills: 0,
      totalRuns: 0,
      totalWins: 0,
      totalTime: 0,
      weaponsUnlocked: [],
    });
  }

  get bestScore() { return this.data.bestScore; }
  get bestWave() { return this.data.bestWave; }

  /** Record a completed run summary. Returns unlocked weapon ids. */
  recordRun(summary) {
    const d = this.data;
    d.totalRuns++;
    d.totalTime += summary.timeAlive ?? 0;
    d.totalKills += summary.kills ?? 0;
    if (summary.won) d.totalWins++;

    if ((summary.score ?? 0) > d.bestScore) d.bestScore = summary.score;
    if ((summary.wave ?? 0) > d.bestWave) d.bestWave = summary.wave;

    const mode = summary.mode ?? 'endless';
    if (!d.bestScoreByMode[mode] || summary.score > d.bestScoreByMode[mode]) {
      d.bestScoreByMode[mode] = summary.score;
    }
    if (!d.bestWaveByMode[mode] || summary.wave > d.bestWaveByMode[mode]) {
      d.bestWaveByMode[mode] = summary.wave;
    }
    const diff = summary.difficulty ?? 'operative';
    if (!d.bestByDifficulty[diff] || summary.score > d.bestByDifficulty[diff]) {
      d.bestByDifficulty[diff] = summary.score;
    }
    this.persist();
    return this.checkUnlocks();
  }

  /** Weapon unlocks keyed by milestone. */
  checkUnlocks() {
    const newly = [];
    const milestones = [
      ['veil', 3], ['breaker', 5], ['nova', 6], ['havoc', 7], ['executor', 8],
      ['twinfang', 9], ['tesla', 10], ['inferno', 11], ['drifter', 12],
      ['phantasm', 13], ['hush', 14], ['starfall', 15], ['cryoshard', 4], ['battleaxe', 2],
    ];
    for (const [weaponId, wave] of milestones) {
      if (!this.data.weaponsUnlocked.includes(weaponId) && this.data.bestWave >= wave) {
        this.data.weaponsUnlocked.push(weaponId);
        newly.push({ id: weaponId, wave });
      }
    }
    if (newly.length > 0) this.persist();
    return newly;
  }

  isUnlocked(id) {
    return this.data.weaponsUnlocked.includes(id);
  }

  unlockWeapon(id) {
    if (!this.data.weaponsUnlocked.includes(id)) {
      this.data.weaponsUnlocked.push(id);
      this.persist();
    }
  }

  persist() {
    Storage.set(RECORDS_KEY, this.data);
  }

  reset() {
    Storage.remove(RECORDS_KEY);
  }
}

export const records = new Records();

/** Helper: which weapons the player may use given records. */
export function unlockedWeaponIds() {
  return ['sidearm', 'voltaic', ...records.data.weaponsUnlocked];
}
