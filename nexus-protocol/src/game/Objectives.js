// ============================================================================
// Objectives.js
// In-run optional objectives that grant bonus rewards (currency, XP, items).
// Generated at wave start from a pool, tracked across the wave, and resolved
// on wave clear or failure. Adds short-term goals and variety to each wave.
// ============================================================================

import { bus, Channels } from '../core/EventBus.js';
import { clamp, formatNumber } from '../core/MathUtils.js';

class ObjectiveRegistryClass {
  constructor() { this._defs = []; }
  register(def) { this._defs.push(def); return def; }
  all() { return this._defs.slice(); }
  count() { return this._defs.length; }
  roll(rng, ctx, n = 2) {
    const avail = this._defs.filter(d => !d.condition || d.condition(ctx));
    const chosen = []; const copy = avail.slice();
    for (let i = 0; i < n && copy.length; i++) { const idx = Math.floor(rng.next() * copy.length); chosen.push(copy.splice(idx, 1)[0]); }
    return chosen.map(d => ({ def: d, progress: 0, target: d.target(ctx), done: false, failed: false, value: d.reward(ctx) }));
  }
}
export const ObjectiveRegistry = new ObjectiveRegistryClass();

// Common context fields: { wave, kills, progression, player, waveStartKills, waveStartHP, tookDamage, timeLimit }
const O = (id, name, desc, target, reward, check, opts = {}) => ObjectiveRegistry.register({
  id, name, description: desc, target, reward, check, condition: opts.condition, timeLimit: opts.timeLimit, type: opts.type || 'wave',
});

O('waveClean', 'Flawless Wave', 'Clear the wave without taking damage.', (c) => 1, (c) => ({ currency: 40 + c.wave * 5 }), (c, st) => st.done = (!c.tookDamage && c.waveCleared) ? 1 : 0);
O('waveSpeed', 'Speed Clear', 'Clear the wave in under 30 seconds.', (c) => 1, (c) => ({ currency: 30 + c.wave * 4 }), (c, st) => st.done = (c.waveTime < 30 && c.waveCleared) ? 1 : 0);
O('waveKills', 'Exterminator', 'Defeat 20 enemies this wave.', (c) => 20, (c) => ({ currency: 50 }), (c, st) => { st.done = Math.min(20, c.killsThisWave); return st.done >= 20; }, { condition: (c) => c.wave >= 3 });
O('headshots', 'Marksman', 'Land 10 headshot kills this wave.', (c) => 10, (c) => ({ currency: 45 }), (c, st) => { st.done = Math.min(10, c.headshotsThisWave); return st.done >= 10; }, { condition: (c) => c.wave >= 4 });
O('noReload', 'Trigger Discipline', 'Clear the wave without reloading.', (c) => 1, (c) => ({ currency: 35 + c.wave * 3 }), (c, st) => st.done = (!c.reloadedThisWave && c.waveCleared) ? 1 : 0);
O('lowHP', 'Living Dangerously', 'Clear the wave while ending above 50% HP... after dropping below 25%.', (c) => 1, (c) => ({ currency: 60 }), (c, st) => st.done = (c.droppedBelow25 && c.endHPFrac > 0.5 && c.waveCleared) ? 1 : 0, { condition: (c) => c.wave >= 5 });
O('dashKills', 'Hit & Run', 'Defeat 8 enemies within 2s of dashing.', (c) => 8, (c) => ({ currency: 40 }), (c, st) => { st.done = Math.min(8, c.dashKills); return st.done >= 8; }, { condition: (c) => c.wave >= 4 });
O('comboWave', 'Combo Master', 'Reach a x30 combo this wave.', (c) => 30, (c) => ({ currency: 70 }), (c, st) => { st.done = Math.min(30, c.maxComboThisWave); return st.done >= 30; }, { condition: (c) => c.wave >= 6 });
O('eliteHunter', 'Elite Hunter', 'Defeat 2 elites this wave.', (c) => 2, (c) => ({ currency: 55 }), (c, st) => { st.done = Math.min(2, c.eliteKillsThisWave); return st.done >= 2; }, { condition: (c) => c.wave >= 7 });
O('bossNoHit', 'Untouchable', 'Defeat the boss without taking damage.', (c) => 1, (c) => ({ currency: 200, item: true }), (c, st) => st.done = (c.bossCleared && !c.tookDamage) ? 1 : 0, { condition: (c) => c.isBossWave });
O('pacifistWave', 'Pacifist', 'Let the arena hazards get 8 kills this wave.', (c) => 8, (c) => ({ currency: 50 }), (c, st) => { st.done = Math.min(8, c.hazardKills); return st.done >= 8; }, { condition: (c) => c.hasHazards });
O('survivor', 'Last Stand', 'Survive a wave ending below 20% HP.', (c) => 1, (c) => ({ currency: 80 }), (c, st) => st.done = (c.waveCleared && c.endHPFrac < 0.2) ? 1 : 0, { condition: (c) => c.wave >= 5 });

/**
 * Manager that tracks active objectives for the current wave and resolves them.
 */
export class ObjectiveManager {
  constructor(progression, rng) {
    this.progression = progression; this.rng = rng;
    this.active = []; this._ctx = {};
    this._unsub = [];
    this._unsub.push(bus.on(Channels.WaveStart, (e) => this.onWaveStart(e)));
    this._unsub.push(bus.on(Channels.WaveCleared, (e) => this.onWaveCleared(e)));
  }
  onWaveStart(e) {
    const ctx = this._buildCtx(e);
    this._ctx = ctx;
    this.active = ObjectiveRegistry.roll(this.rng, ctx, 2);
    for (const o of this.active) bus.emit(Channels.Toast, { text: `Objective: ${o.def.name}`, color: '#ffd24a' });
  }
  onWaveCleared(e) {
    const ctx = this._ctx; if (!ctx) return;
    ctx.waveCleared = true; ctx.waveTime = (ctx.waveStartTime != null) ? (performance.now() / 1000 - ctx.waveStartTime) : 0;
    ctx.endHPFrac = this.progression.player?.get('Health')?.fraction || 1;
    for (const o of this.active) {
      const ok = o.def.check(ctx, o);
      if (ok || o.done >= o.target) {
        o.done = o.target; o.completed = true;
        const r = o.value; this.progression.addCurrency(r.currency || 0);
        bus.emit(Channels.Toast, { text: `Objective Complete: ${o.def.name} (+${r.currency || 0})`, color: '#4fd07a' });
        bus.emit(Channels.PlaySFX, { name: 'levelup', volume: 0.4 });
      }
    }
    this.active = [];
  }
  _buildCtx(e) {
    return {
      wave: e.wave, isBoss: e.boss, isBossWave: !!e.boss,
      waveStartKills: this.progression.kills, killsThisWave: 0, headshotsThisWave: 0, eliteKillsThisWave: 0,
      tookDamage: false, reloadedThisWave: false, droppedBelow25: false, dashKills: 0,
      maxComboThisWave: 0, hazardKills: 0, bossCleared: false, hasHazards: false,
      waveStartTime: performance.now() / 1000, waveTime: 0, endHPFrac: 1,
    };
  }
  /** Update context from gameplay events (called by Game). */
  noteKill(isElite, isHeadshot) {
    const c = this._ctx; if (!c) return; c.killsThisWave = this.progression.kills - c.waveStartKills; if (isElite) c.eliteKillsThisWave++; if (isHeadshot) c.headshotsThisWave++;
  }
  noteDamage() { if (this._ctx) { this._ctx.tookDamage = true; const f = this.progression.player?.get('Health')?.fraction || 1; if (f < 0.25) this._ctx.droppedBelow25 = true; } }
  noteReload() { if (this._ctx) this._ctx.reloadedThisWave = true; }
  noteDashKill() { if (this._ctx) this._ctx.dashKills++; }
  noteCombo(maxCombo) { if (this._ctx) this._ctx.maxComboThisWave = Math.max(this._ctx.maxComboThisWave, maxCombo); }
  noteHazardKill() { if (this._ctx) this._ctx.hazardKills++; }
  noteBossCleared() { if (this._ctx) this._ctx.bossCleared = true; }
  setHasHazards(v) { if (this._ctx) this._ctx.hasHazards = v; }
  get activeObjectives() { return this.active; }
  dispose() { for (const off of this._unsub) if (off) off(); this._unsub = []; }
}

export const OBJECTIVE_COUNT = ObjectiveRegistry.count();
