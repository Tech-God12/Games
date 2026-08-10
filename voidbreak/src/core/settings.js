/**
 * VOIDBREAK — Settings store.
 *
 * Holds user preferences with validation, typed coercion, change events and
 * persistence via the Storage module. Settings are loaded at boot and applied
 * to systems through listeners.
 */

import { DEFAULT_SETTINGS, QUALITY, UI } from './constants.js';
import { Storage, KEY_PREFIX } from './storage.js';
import { log } from './profiler.js';

const SETTINGS_KEY = `${KEY_PREFIX}settings`;

/** Value validators: return sanitized value or the default. */
const VALIDATORS = {
  quality: (v) => (QUALITY[v] ? v : 'high'),
  fov: (v) => Math.min(110, Math.max(60, toNum(v, DEFAULT_SETTINGS.fov))),
  sensitivity: (v) => Math.min(5, Math.max(0.05, toNum(v, 1))),
  invertY: (v) => !!v,
  vsync: (v) => !!v,
  fpsCap: (v) => Math.min(480, Math.max(30, toNum(v, 240))),
  volumeMaster: (v) => Math.min(1, Math.max(0, toNum(v, 0.85))),
  volumeSfx: (v) => Math.min(1, Math.max(0, toNum(v, 1))),
  volumeMusic: (v) => Math.min(1, Math.max(0, toNum(v, 0.6))),
  volumeAmbience: (v) => Math.min(1, Math.max(0, toNum(v, 0.7))),
  crosshairStyle: (v) => ['dynamic', 'static', 'dot', 'none'].includes(v) ? v : 'dynamic',
  crosshairColor: (v) => (typeof v === 'string' && /^#[0-9a-f]{6}$/i.test(v) ? v : UI.accent),
  crosshairScale: (v) => Math.min(2, Math.max(0.5, toNum(v, 1))),
  damageNumbers: (v) => !!v,
  hitmarker: (v) => !!v,
  screenShake: (v) => Math.min(1, Math.max(0, toNum(v, 1))),
  headbob: (v) => Math.min(1, Math.max(0, toNum(v, 1))),
  showFps: (v) => !!v,
  showMinimap: (v) => !!v,
  motionBlur: (v) => !!v,
  colorblind: (v) => ['none', 'protanopia', 'deuteranopia', 'tritanopia'].includes(v) ? v : 'none',
  language: (v) => (typeof v === 'string' && v.length > 0 ? v.slice(0, 8) : 'en'),
  showSubtitles: (v) => !!v,
  weaponSway: (v) => Math.min(1, Math.max(0, toNum(v, 1))),
  enemyDamageFlash: (v) => !!v,
  showKillfeed: (v) => !!v,
  gamepadRumble: (v) => !!v,
  zoomSensitivityScale: (v) => Math.min(1, Math.max(0.1, toNum(v, 0.6))),
};

function toNum(v, dflt) {
  const n = Number(v);
  return Number.isFinite(n) ? n : dflt;
}

export class Settings {
  constructor() {
    /** @type {Record<string, any>} live settings */
    this.values = { ...DEFAULT_SETTINGS };
    this.listeners = new Map();
    this.anyListeners = new Set();
    this.loaded = false;
  }

  /** Load persisted settings (merging over defaults). */
  load() {
    const saved = Storage.get(SETTINGS_KEY, null);
    if (saved && typeof saved === 'object') {
      for (const [key, value] of Object.entries(saved)) {
        if (key in VALIDATORS) {
          this.values[key] = VALIDATORS[key](value);
        }
      }
      this.values.quality = VALIDATORS.quality(this.values.quality);
    }
    this.loaded = true;
    log.info('settings', `loaded ${Object.keys(this.values).length} settings`);
    return this;
  }

  get(key) {
    return this.values[key];
  }

  all() {
    return { ...this.values };
  }

  /** Set a setting value (validated), persist, and notify listeners. */
  set(key, value) {
    const validator = VALIDATORS[key];
    const next = validator ? validator(value) : value;
    const prev = this.values[key];
    if (prev === next) return this;
    this.values[key] = next;
    this._notify(key, next, prev);
    this.persist();
    return this;
  }

  /** Set several at once. */
  apply(patch) {
    for (const [k, v] of Object.entries(patch)) {
      this.set(k, v);
    }
    return this;
  }

  /** Reset everything to defaults. */
  reset() {
    for (const key of Object.keys(this.values)) {
      const dflt = DEFAULT_SETTINGS[key];
      if (this.values[key] !== dflt) {
        this.values[key] = dflt;
        this._notify(key, dflt, this.values[key]);
      }
    }
    this.persist();
    return this;
  }

  /** Subscribe to a single key. */
  on(key, fn) {
    let set = this.listeners.get(key);
    if (!set) {
      set = new Set();
      this.listeners.set(key, set);
    }
    set.add(fn);
    return () => set.delete(fn);
  }

  /** Subscribe to any change. */
  onAny(fn) {
    this.anyListeners.add(fn);
    return () => this.anyListeners.delete(fn);
  }

  _notify(key, value, prev) {
    const set = this.listeners.get(key);
    if (set) {
      for (const fn of set) {
        try {
          fn(value, prev);
        } catch (err) {
          log.error('settings', `listener error for "${key}"`, err);
        }
      }
    }
    for (const fn of this.anyListeners) {
      try {
        fn(key, value, prev);
      } catch (err) {
        log.error('settings', 'any-listener error', err);
      }
    }
  }

  persist() {
    Storage.set(SETTINGS_KEY, this.values);
  }

  static wipe() {
    Storage.remove(SETTINGS_KEY);
  }
}

/** Singleton. */
export const settings = new Settings();

/** Convenience accessor used across the codebase. */
export function getSetting(key) {
  return settings.get(key);
}
