// ============================================================================
// SaveManager.js
// Persistence layer over localStorage with schema versioning, migration
// support, autosave throttling, and safe (de)serialization. Stores meta
// progression, unlocks, settings, best scores, and run history. Falls back
// gracefully to an in-memory store when localStorage is unavailable.
// ============================================================================

const STORAGE_KEY = 'nexus_protocol_save_v1';
const SCHEMA_VERSION = 1;

const DefaultSaveData = {
  version: SCHEMA_VERSION,
  createdAt: 0,
  lastSavedAt: 0,
  playtime: 0,
  // meta progression
  meta: {
    level: 1,
    xp: 0,
    prestige: 0,
    metaPoints: 0,
    upgrades: {}, // id -> rank
  },
  // unlocks
  unlocks: {
    weapons: ['pistol'],
    perks: [],
    characters: ['ranger'],
    biomes: ['neon'],
    difficulties: ['normal'],
  },
  // best records
  records: {
    bestWave: 0,
    bestScore: 0,
    bestKills: 0,
    bestTime: 0,
    longestRun: 0,
    totalKills: 0,
    totalRuns: 0,
    totalDeaths: 0,
    bossesKilled: 0,
    currency: 0,
  },
  // per-weapon/ enemy stats
  stats: {
    weaponKills: {},
    enemyKills: {},
  },
  // settings
  settings: {
    quality: 'high',
    masterVolume: 0.9,
    sfxVolume: 0.9,
    musicVolume: 0.55,
    muted: false,
    mouseSensitivity: 1.0,
    invertY: false,
    fov: 75,
    bloom: 1.0,
    screenShake: 1.0,
    damageNumbers: true,
    showFps: false,
    difficulty: 'normal',
    autoLock: true,
  },
  // recent run summaries
  history: [],
  // achievements
  achievements: {},
};

export class SaveManager {
  constructor() {
    this.data = null;
    this._memStore = null;
    this._dirty = false;
    this._autosaveTimer = 0;
    this._autosaveInterval = 5; // seconds
    this.load();
  }

  _ls() {
    try { return window.localStorage; } catch (e) { return null; }
  }

  load() {
    const ls = this._ls();
    let raw = null;
    if (ls) {
      try { raw = ls.getItem(STORAGE_KEY); } catch (e) { raw = null; }
    }
    if (!raw) {
      this.data = this._deepClone(DefaultSaveData);
      this.data.createdAt = Date.now();
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      this.data = this._migrate(parsed);
    } catch (e) {
      console.warn('SaveManager: corrupt save, resetting.', e);
      this.data = this._deepClone(DefaultSaveData);
      this.data.createdAt = Date.now();
    }
  }

  _migrate(data) {
    // Forward-compat: merge any missing default keys.
    const merged = this._deepClone(DefaultSaveData);
    merged.version = data.version || SCHEMA_VERSION;
    merged.createdAt = data.createdAt || Date.now();
    merged.lastSavedAt = data.lastSavedAt || 0;
    merged.playtime = data.playtime || 0;
    this._mergeObj(merged.meta, data.meta);
    this._mergeObj(merged.unlocks, data.unlocks);
    this._mergeObj(merged.records, data.records);
    this._mergeObj(merged.stats, data.stats);
    this._mergeObj(merged.settings, data.settings);
    merged.history = Array.isArray(data.history) ? data.history.slice(-50) : [];
    this._mergeObj(merged.achievements, data.achievements);
    return merged;
  }

  _mergeObj(target, source) {
    if (!source || typeof source !== 'object') return;
    for (const k of Object.keys(source)) {
      if (target[k] && typeof target[k] === 'object' && !Array.isArray(target[k]) && typeof source[k] === 'object') {
        this._mergeObj(target[k], source[k]);
      } else if (source[k] !== undefined) {
        target[k] = source[k];
      }
    }
  }

  _deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }

  /** Mark data dirty; will be flushed by the autosave loop or save(). */
  markDirty() { this._dirty = true; }

  /** Persist immediately. */
  save() {
    this.data.lastSavedAt = Date.now();
    const ls = this._ls();
    if (ls) {
      try { ls.setItem(STORAGE_KEY, JSON.stringify(this.data)); this._dirty = false; return true; }
      catch (e) { console.warn('SaveManager: write failed', e); return false; }
    }
    this._dirty = false;
    return false;
  }

  /** Called each frame by the engine. */
  update(dt) {
    if (this._dirty) {
      this._autosaveTimer += dt;
      if (this._autosaveTimer >= this._autosaveInterval) {
        this.save();
        this._autosaveTimer = 0;
      }
    }
  }

  // ----- Convenience accessors -----
  get settings() { return this.data.settings; }
  get meta() { return this.data.meta; }
  get unlocks() { return this.data.unlocks; }
  get records() { return this.data.records; }
  get stats() { return this.data.stats; }
  get achievements() { return this.data.achievements; }

  unlockWeapon(id) { if (!this.data.unlocks.weapons.includes(id)) { this.data.unlocks.weapons.push(id); this.markDirty(); } }
  unlockPerk(id) { if (!this.data.unlocks.perks.includes(id)) { this.data.unlocks.perks.push(id); this.markDirty(); } }
  unlockCharacter(id) { if (!this.data.unlocks.characters.includes(id)) { this.data.unlocks.characters.push(id); this.markDirty(); } }
  unlockBiome(id) { if (!this.data.unlocks.biomes.includes(id)) { this.data.unlocks.biomes.push(id); this.markDirty(); } }

  addCurrency(n) { this.data.records.currency += Math.max(0, Math.floor(n)); this.markDirty(); }
  spendCurrency(n) {
    if (this.data.records.currency < n) return false;
    this.data.records.currency -= n; this.markDirty(); return true;
  }

  recordRun(summary) {
    const r = this.data.records;
    r.totalRuns++;
    r.bestWave = Math.max(r.bestWave, summary.wave);
    r.bestScore = Math.max(r.bestScore, summary.score);
    r.bestKills = Math.max(r.bestKills, summary.kills);
    r.bestTime = Math.max(r.bestTime, summary.time);
    r.longestRun = Math.max(r.longestRun, summary.time);
    r.totalKills += summary.kills;
    if (summary.won) {} else r.totalDeaths++;
    r.bossesKilled += summary.bossesKilled || 0;
    this.data.history.unshift({ ...summary, at: Date.now() });
    this.data.history = this.data.history.slice(0, 50);
    this.markDirty();
  }

  addAchievement(id) {
    if (!this.data.achievements[id]) { this.data.achievements[id] = Date.now(); this.markDirty(); return true; }
    return false;
  }

  addPlaytime(dt) { this.data.playtime += dt; this.markDirty(); }

  resetProgression() {
    const settings = this._deepClone(this.data.settings);
    this.data = this._deepClone(DefaultSaveData);
    this.data.settings = settings;
    this.data.createdAt = Date.now();
    this.save();
  }

  wipeAll() {
    const ls = this._ls();
    if (ls) { try { ls.removeItem(STORAGE_KEY); } catch (e) {} }
    this.data = this._deepClone(DefaultSaveData);
    this.data.createdAt = Date.now();
  }

  exportJSON() { return JSON.stringify(this.data, null, 2); }
  importJSON(json) {
    try { const parsed = JSON.parse(json); this.data = this._migrate(parsed); this.save(); return true; }
    catch (e) { return false; }
  }
}

/** Shared singleton. */
export const save = new SaveManager();
