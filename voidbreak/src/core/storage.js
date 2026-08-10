/**
 * VOIDBREAK — Storage.
 *
 * Thin wrapper around localStorage with an in-memory fallback (for
 * environments where storage is unavailable, e.g. private mode or tests).
 * All game persistence (settings, saves, records) goes through this so the
 * behavior is predictable everywhere.
 */

import { log } from './profiler.js';

class MemoryStore {
  constructor() {
    this.data = new Map();
  }

  getItem(key) {
    return this.data.has(key) ? this.data.get(key) : null;
  }

  setItem(key, value) {
    this.data.set(key, String(value));
  }

  removeItem(key) {
    this.data.delete(key);
  }

  clear() {
    this.data.clear();
  }

  get length() {
    return this.data.size;
  }

  key(i) {
    return [...this.data.keys()][i] ?? null;
  }
}

let store = null;
let storageMode = 'localStorage';

function getStore() {
  if (store) return store;
  try {
    const testKey = '__voidbreak_test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    store = window.localStorage;
    storageMode = 'localStorage';
  } catch {
    log.warn('storage', 'localStorage unavailable — using in-memory store');
    store = new MemoryStore();
    storageMode = 'memory';
  }
  return store;
}

export const Storage = {
  get mode() {
    getStore();
    return storageMode;
  },

  has(key) {
    return getStore().getItem(key) !== null;
  },

  get(key, fallback = null) {
    try {
      const raw = getStore().getItem(key);
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    try {
      getStore().setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      log.warn('storage', `failed to write "${key}"`, err);
      return false;
    }
  },

  getRaw(key, fallback = null) {
    return getStore().getItem(key) ?? fallback;
  },

  setRaw(key, value) {
    try {
      getStore().setItem(key, String(value));
      return true;
    } catch {
      return false;
    }
  },

  remove(key) {
    try {
      getStore().removeItem(key);
    } catch { /* ignore */ }
  },

  clear() {
    try {
      getStore().clear();
    } catch { /* ignore */ }
  },

  /** All keys matching a prefix. */
  keysWithPrefix(prefix) {
    const s = getStore();
    const out = [];
    for (let i = 0; i < s.length; i++) {
      const k = s.key(i);
      if (k && k.startsWith(prefix)) out.push(k);
    }
    return out;
  },

  /** Byte estimate of stored data. */
  estimateBytes() {
    const s = getStore();
    let bytes = 0;
    for (let i = 0; i < s.length; i++) {
      const k = s.key(i);
      if (k) bytes += k.length * 2 + (s.getItem(k)?.length ?? 0) * 2;
    }
    return bytes;
  },
};

/** The prefix for all keys written by this game. */
export const KEY_PREFIX = 'voidbreak:';
