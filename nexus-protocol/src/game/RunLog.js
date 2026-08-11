// ============================================================================
// RunLog.js
// A lightweight event log recorded during a run for post-run recap and a
// pseudo-replay timeline. Captures key events (wave starts/clears, level-ups,
// boss phases, kills milestones, item/perk acquisitions, deaths, revives)
// with timestamps. The log is summarized on the game-over screen and can be
// exported as JSON. Bounded to avoid unbounded memory growth.
// ============================================================================

import { bus, Channels } from '../core/EventBus.js';
import { formatTime } from '../core/MathUtils.js';

export class RunLog {
  constructor(progression) {
    this.progression = progression;
    this.entries = [];
    this.maxEntries = 500;
    this.startTime = 0;
    this._unsub = [];
    this._wire();
  }

  _wire() {
    this._unsub.push(bus.on(Channels.RunStart, () => this.start()));
    this._unsub.push(bus.on(Channels.WaveStart, (e) => this.log('wave', e.boss ? `Boss wave ${e.wave} begins` : `Wave ${e.wave} begins`)));
    this._unsub.push(bus.on(Channels.WaveCleared, (e) => this.log('wave', `Wave ${e.wave} cleared`)));
    this._unsub.push(bus.on(Channels.LevelUp, (e) => this.log('level', `Reached level ${e.level}`)));
    this._unsub.push(bus.on(Channels.BossSpawn, (e) => this.log('boss', `${e.entity?.get?.('Boss')?.title || 'Boss'} appears`)));
    this._unsub.push(bus.on(Channels.BossDefeated, (e) => this.log('boss', `Boss defeated!`)));
    this._unsub.push(bus.on(Channels.UpgradeChosen, (e) => this.log('upgrade', `Upgrade: ${e.id} (rank ${e.rank})`)));
    this._unsub.push(bus.on(Channels.PerkAcquired, (e) => this.log('perk', `Perk: ${e.id}`)));
    this._unsub.push(bus.on(Channels.ItemAcquired, (e) => this.log('item', `Item: ${e.id} (x${e.stacks})`)));
    this._unsub.push(bus.on(Channels.PlayerDeath, () => this.log('death', 'You fell')));
    this._unsub.push(bus.on('achievement.unlocked', (e) => this.log('achievement', `Achievement: ${e.achievement?.name}`)));
    this._unsub.push(bus.on('combo.milestone', (e) => this.log('combo', `${e.label} x${e.count}`)));
  }

  start() { this.entries = []; this.startTime = performance.now() / 1000; }

  log(type, text) {
    const t = (performance.now() / 1000) - this.startTime;
    this.entries.push({ t, type, text });
    if (this.entries.length > this.maxEntries) this.entries.shift();
  }

  /** Get a filtered timeline by type. */
  byType(type) { return this.entries.filter(e => e.type === type); }

  /** A formatted recap list for the game-over screen. */
  recap(maxItems = 20) {
    const out = [];
    const slice = this.entries.slice(-maxItems);
    for (const e of slice) out.push({ time: formatTime(e.t), text: e.text, type: e.type });
    return out;
  }

  /** Highlight reel: the most impactful events. */
  highlights() {
    const types = ['boss', 'level', 'combo', 'achievement', 'death'];
    return this.entries.filter(e => types.includes(e.type)).slice(-15).map(e => ({ time: formatTime(e.t), text: e.text, type: e.type }));
  }

  exportJSON() { return JSON.stringify({ startTime: this.startTime, entries: this.entries }, null, 2); }

  dispose() { for (const off of this._unsub) if (off) off(); this._unsub = []; }
}
