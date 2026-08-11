// ============================================================================
// Telemetry.js
// Anonymous in-run telemetry aggregation for balance analysis. Records event
// histograms, DPS over time, survival curves, and weapon/enemy performance
// metrics, then exposes a snapshot for the debug overlay and a future balance
// pass. No data leaves the client; everything stays in-memory or in the save.
// ============================================================================

import { bus, Channels } from '../core/EventBus.js';
import { clamp, lerp, formatNumber } from '../core/MathUtils.js';

export class Telemetry {
  constructor() {
    this.reset();
    this._unsub = [];
    this._wire();
    this._sampleTimer = 0;
    this._sampleInterval = 1.0;
  }

  reset() {
    this.events = {};                     // event name -> count
    this.dpsHistory = [];                 // [{t, dps}]
    this.killTimes = [];                  // seconds between kills
    this.lastKillT = 0;
    this.weaponDamage = {};               // weaponId -> total damage
    this.enemyDamage = {};                // archetypeId -> total damage taken by player from them
    this.deathCauses = {};                // archetypeId/bossId -> count of player deaths caused
    this.waveDurations = [];              // seconds per wave
    this.waveStartT = 0;
    this.spawnCounts = {};                // archetypeId -> spawns
    this.eliteCount = 0;
    this.bossPhasesSeen = 0;
    this.upgradesTaken = {};              // upgradeId -> count
    this.itemsBought = {};                // itemId -> count
    this.perksTaken = {};                 // perkId -> count
    this.abilitiesUsed = {};              // abilityId -> count
    this.pickupsCollected = {};           // pickupType -> count
    this.runStart = 0;
    this.peakDPS = 0;
    this._damageWindow = [];              // [{t, amount}] for rolling DPS
  }

  _wire() {
    this._unsub.push(bus.on(Channels.RunStart, () => { this.reset(); this.runStart = performance.now() / 1000; }));
    this._unsub.push(bus.on(Channels.WaveStart, () => { this.waveStartT = performance.now() / 1000; }));
    this._unsub.push(bus.on(Channels.WaveCleared, () => { if (this.waveStartT) this.waveDurations.push((performance.now() / 1000) - this.waveStartT); }));
    this._unsub.push(bus.on(Channels.EntityDamaged, (e) => { this._bump(this.events, 'damageDealt'); this._recordDPS(e.amount || 0); }));
    this._unsub.push(bus.on(Channels.PlayerDamaged, (e) => { this._bump(this.events, 'damageTaken'); }));
    this._unsub.push(bus.on(Channels.EntityKilled, (e) => { this._bump(this.events, 'kills'); const now = performance.now() / 1000; if (this.lastKillT) this.killTimes.push(now - this.lastKillT); this.lastKillT = now; }));
    this._unsub.push(bus.on(Channels.EntitySpawned, (e) => { const en = e.entity?.get?.('Enemy'); if (en) this._bump(this.spawnCounts, en.archetypeId); if (e.entity?.get?.('WaveMember')?.isElite) this.eliteCount++; }));
    this._unsub.push(bus.on(Channels.UpgradeChosen, (e) => this._bump(this.upgradesTaken, e.id)));
    this._unsub.push(bus.on(Channels.ItemAcquired, (e) => this._bump(this.itemsBought, e.id)));
    this._unsub.push(bus.on(Channels.PerkAcquired, (e) => this._bump(this.perksTaken, e.id)));
    this._unsub.push(bus.on('achievement.unlocked', () => this._bump(this.events, 'achievements')));
  }

  _bump(map, key) { if (key) map[key] = (map[key] || 0) + 1; }
  _recordDPS(amount) {
    const now = performance.now() / 1000;
    this._damageWindow.push({ t: now, amount });
    // trim window to last 5s
    const cutoff = now - 5;
    while (this._damageWindow.length && this._damageWindow[0].t < cutoff) this._damageWindow.shift();
  }

  noteAbility(id) { this._bump(this.abilitiesUsed, id); }
  notePickup(type) { this._bump(this.pickupsCollected, type); }
  noteBossPhase() { this.bossPhasesSeen++; }
  noteDeathCause(id) { this._bump(this.deathCauses, id); }
  noteWeaponDamage(weaponId, amount) { this._bump(this.weaponDamage, weaponId); this.weaponDamage[weaponId] = (this.weaponDamage[weaponId] || 0) + amount; }

  update(dt) {
    this._sampleTimer += dt;
    if (this._sampleTimer >= this._sampleInterval) {
      this._sampleTimer = 0;
      const dps = this.currentDPS;
      this.dpsHistory.push({ t: performance.now() / 1000 - this.runStart, dps });
      if (this.dpsHistory.length > 600) this.dpsHistory.shift();
      if (dps > this.peakDPS) this.peakDPS = dps;
    }
  }

  get currentDPS() {
    if (this._damageWindow.length === 0) return 0;
    let total = 0; for (const d of this._damageWindow) total += d.amount;
    return total / 5; // 5s window
  }

  /** A summary snapshot for the debug overlay / post-run. */
  snapshot() {
    const avgKillTime = this.killTimes.length ? this.killTimes.reduce((a, b) => a + b, 0) / this.killTimes.length : 0;
    const avgWave = this.waveDurations.length ? this.waveDurations.reduce((a, b) => a + b, 0) / this.waveDurations.length : 0;
    return {
      events: { ...this.events },
      peakDPS: Math.round(this.peakDPS),
      currentDPS: Math.round(this.currentDPS),
      avgKillTime: avgKillTime.toFixed(2),
      avgWaveDuration: avgWave.toFixed(1),
      totalKills: this.events.kills || 0,
      eliteCount: this.eliteCount,
      bossPhasesSeen: this.bossPhasesSeen,
      topWeapons: this._topN(this.weaponDamage, 5),
      topUpgrades: this._topN(this.upgradesTaken, 5),
      topItems: this._topN(this.itemsBought, 5),
      topPerks: this._topN(this.perksTaken, 5),
      topAbilities: this._topN(this.abilitiesUsed, 5),
      topPickups: this._topN(this.pickupsCollected, 5),
      topSpawns: this._topN(this.spawnCounts, 5),
      deathCauses: this._topN(this.deathCauses, 3),
    };
  }

  _topN(map, n) {
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => ({ id: k, value: v }));
  }

  /** Render a compact text report for the debug overlay. */
  report() {
    const s = this.snapshot();
    const lines = [];
    lines.push(`DPS ${s.currentDPS} (peak ${s.peakDPS})`);
    lines.push(`Kills ${s.totalKills} · avg kill ${s.avgKillTime}s`);
    lines.push(`Elites ${s.eliteCount} · boss phases ${s.bossPhasesSeen}`);
    if (s.topWeapons[0]) lines.push(`Top weapon: ${s.topWeapons[0].id} (${formatNumber(s.topWeapons[0].value)})`);
    if (s.topSpawns[0]) lines.push(`Top enemy: ${s.topSpawns[0].id} (${s.topSpawns[0].value})`);
    return lines.join('\n');
  }

  dispose() { for (const off of this._unsub) if (off) off(); this._unsub = []; }
}
