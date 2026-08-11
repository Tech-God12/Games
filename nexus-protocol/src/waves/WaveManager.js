// ============================================================================
// WaveManager.js
// Orchestrates the run's pace: procedural wave composition with difficulty
// scaling, timed enemy spawning around the arena ring, elite injections, boss
// waves on a cadence, and intermission windows between waves. Emits wave
// start/clear and boss events so HUD/music/UI can react.
// ============================================================================

import * as THREE from 'three';
import { bus, Channels } from '../core/EventBus.js';
import { Random } from '../core/Random.js';
import { clamp, lerp, TAU } from '../core/MathUtils.js';
import { WaveMember } from '../ecs/components/Gameplay.js';

export const WaveState = Object.freeze({
  Intermission: 'intermission', Active: 'active', Boss: 'boss', Cleared: 'cleared',
});

export class WaveManager {
  constructor(world, enemyFactory, arena, opts = {}) {
    this.world = world;
    this.factory = enemyFactory;
    this.arena = arena;
    this.bossFactory = null;
    this.rng = opts.rng || new Random((Math.random() * 1e9) >>> 0);
    this.wave = 0;
    this.state = WaveState.Intermission;
    this.intermissionTimer = 3;
    this.intermissionDuration = 5;
    this.spawnQueue = [];        // [{archetype, x, z, delay, opts}]
    this.spawnTimer = 0;
    this.aliveQuery = world.query({ all: ['WaveMember'] });
    this.bossEvery = 5;
    this.difficultyCurve = 1.0;
    this._bossAlive = false;
    this._bossEntity = null;
    this.totalSpawnedThisWave = 0;
    this.totalToSpawnThisWave = 0;
    this.onSpawnEnemy = null;    // hook for AI summoner
  }

  setBossFactory(f) { this.bossFactory = f; }

  start() {
    this.wave = 0;
    this.state = WaveState.Intermission;
    this.intermissionTimer = 3;
    this._beginIntermission();
  }

  _beginIntermission() {
    this.state = WaveState.Intermission;
    this.intermissionTimer = this.intermissionDuration;
    bus.emit(Channels.WaveIntermission, { nextWave: this.wave + 1, duration: this.intermissionDuration });
  }

  _startWave() {
    this.wave++;
    this.totalSpawnedThisWave = 0;
    this.spawnQueue.length = 0;
    this.spawnTimer = 0;
    const isBossWave = this.wave % this.bossEvery === 0;
    if (isBossWave) {
      this.state = WaveState.Boss;
      this._spawnBoss();
      bus.emit(Channels.WaveStart, { wave: this.wave, boss: true });
      bus.emit(Channels.PlaySFX, { name: 'boss_roar', volume: 0.8 });
      bus.emit(Channels.PlayMusic, { track: 'combat' });
      return;
    }
    this.state = WaveState.Active;
    this.difficultyMult = (this.difficulty && this.difficulty.spawnMult) ? this.difficulty.spawnMult() : 1;
    this._composeWave();
    this.totalToSpawnThisWave = this.spawnQueue.length;
    bus.emit(Channels.WaveStart, { wave: this.wave, boss: false, count: this.totalToSpawnThisWave });
    bus.emit(Channels.PlaySFX, { name: 'wave_start', volume: 0.5 });
    bus.emit(Channels.Toast, { text: `WAVE ${this.wave}`, color: '#29e7ff' });
  }

  _composeWave() {
    const w = this.wave;
    const tier = clamp(w / 20, 0, 1);
    const diffMult = this.difficultyMult || 1;
    const budget = Math.floor((8 + w * 3 + w * w * 0.25) * diffMult);
    const maxUnlock = w;
    let spent = 0;
    let delay = 0;
    let count = 0;
    const maxAlive = clamp(8 + w * 2, 8, 48);
    const eliteChanceBase = clamp(0.02 + w * 0.004, 0, 0.18) * (this.difficulty ? this.difficulty.eliteChanceMult() : 1);
    while (spent < budget) {
      const def = this.factory ? this._pickArchetype(maxUnlock, tier) : null;
      if (!def) break;
      const cost = this._costFor(def);
      if (spent + cost > budget * 1.4) break;
      spent += cost;
      const pt = this.arena.spawnPoint(this.rng, 12, this.arena.boundsRadius - 2);
      const opts = this._scaleOpts(w, tier, def);
      // elite chance
      if (this.rng.chance(eliteChanceBase) && def.tier >= 2) { opts.elite = true; }
      this.spawnQueue.push({ archetype: def.id, x: pt.x, z: pt.z, delay, opts });
      delay += this.rng.range(0.15, 0.6);
      count++;
    }
    // guarantee a few chaff
    if (count < 4) {
      for (let i = 0; i < 4; i++) {
        const pt = this.arena.spawnPoint(this.rng, 12, this.arena.boundsRadius - 2);
        this.spawnQueue.push({ archetype: 'drone', x: pt.x, z: pt.z, delay: i * 0.3, opts: this._scaleOpts(w, tier, null) });
      }
    }
    this._maxAlive = maxAlive;
  }

  _pickArchetype(maxUnlock, tier) {
    // import lazily to avoid cycle
    const reg = this._registry();
    if (!reg) return null;
    return reg.random(this.rng, { maxUnlockWave: maxUnlock, tier });
  }

  _registry() {
    // Lazy require pattern
    if (!this._reg) {
      try { this._reg = require_registry(); } catch (e) { this._reg = null; }
    }
    return this._reg;
  }

  _costFor(def) {
    const base = { 0: 1, 1: 2, 2: 3, 3: 5, 4: 8 }[def.tier || 0] || 2;
    return base + Math.floor((def.health || 30) / 40);
  }

  _scaleOpts(w, tier, def) {
    const hpScale = (1 + (w - 1) * 0.12 + tier * 0.6) * (this.difficulty ? this.difficulty.preset.hpMult : 1);
    const dmgScale = (1 + (w - 1) * 0.06 + tier * 0.3) * (this.difficulty ? this.difficulty.preset.dmgMult : 1);
    const spdScale = (1 + Math.min(0.3, (w - 1) * 0.01)) * (this.difficulty ? this.difficulty.preset.speedMult : 1);
    return { scaleHealth: hpScale, scaleDamage: clamp(dmgScale, 1, 4), scaleSpeed: clamp(spdScale, 1, 1.6) };
  }

  _spawnBoss() {
    if (this.bossFactory) {
      const bossId = this._pickBossId();
      this._bossEntity = this.bossFactory.spawn(bossId, this.arena.centerX, this.arena.centerZ + 14, { wave: this.wave });
      this._bossAlive = !!this._bossEntity;
      bus.emit(Channels.BossSpawn, { entity: this._bossEntity, id: bossId });
    } else {
      // fallback: spawn an elite heavy as a stand-in boss
      const pt = { x: this.arena.centerX, z: this.arena.centerZ + 12 };
      const e = this.factory.spawn('tank', pt.x, pt.z, { scaleHealth: 6, scaleDamage: 1.4, elite: true });
      if (e) { e.tag('Boss'); this._bossEntity = e; this._bossAlive = true; bus.emit(Channels.BossSpawn, { entity: e, id: 'tank' }); }
    }
  }

  _pickBossId() {
    const order = ['sentinel', 'warbringer', 'tempest', 'leviathan', 'overlord', 'devourer'];
    const idx = Math.floor((this.wave / this.bossEvery - 1)) % order.length;
    return order[idx];
  }

  update(dt) {
    if (this.state === WaveState.Intermission) {
      this.intermissionTimer -= dt;
      if (this.intermissionTimer <= 0) this._startWave();
      return;
    }
    // spawn from queue
    if (this.state === WaveState.Active && this.spawnQueue.length) {
      this.spawnTimer += dt;
      while (this.spawnQueue.length && this.spawnTimer >= this.spawnQueue[0].delay) {
        const item = this.spawnQueue.shift();
        const aliveCount = this.aliveQuery.count;
        if (aliveCount < (this._maxAlive || 40)) {
          const e = this.factory.spawn(item.archetype, item.x, item.z, item.opts);
          if (e && item.opts.elite) e.get('WaveMember').isElite = true;
        } else {
          // push back to retry later
          item.delay = this.spawnTimer + 0.5;
          this.spawnQueue.push(item);
          break;
        }
      }
    }
    // check clear
    const alive = this.aliveQuery.count;
    if (this.state === WaveState.Active && this.spawnQueue.length === 0 && alive === 0) {
      this._clearWave();
    } else if (this.state === WaveState.Boss && !this._bossAlive) {
      this._clearWave();
    }
  }

  _clearWave() {
    bus.emit(Channels.WaveCleared, { wave: this.wave });
    bus.emit(Channels.PlaySFX, { name: 'wave_clear', volume: 0.6 });
    bus.emit(Channels.Toast, { text: `WAVE ${this.wave} CLEARED`, color: '#4fd07a' });
    this.state = WaveState.Cleared;
    // brief pause then intermission
    this.intermissionTimer = 1.5;
    this.state = WaveState.Intermission;
  }

  /** Mark the boss as defeated (called by BossFactory on death). */
  notifyBossDefeated() {
    this._bossAlive = false;
    this._bossEntity = null;
  }

  get aliveCount() { return this.aliveQuery.count; }
  get nextWaveNumber() { return this.wave + 1; }
  get isBossWave() { return this.state === WaveState.Boss; }
}

// Lazy registry accessor to avoid circular imports
let _regRef = null;
export function setEnemyRegistryForWaves(reg) { _regRef = reg; }
function require_registry() { return _regRef; }
