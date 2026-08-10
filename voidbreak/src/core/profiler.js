/**
 * VOIDBREAK — Logger and Profiler.
 *
 * Logger: leveled logging with categories, console output, and an in-memory
 * ring buffer the in-game console can read.
 *
 * Profiler: lightweight frame-time sampling with named markers and rolling
 * statistics, used by the debug overlay.
 */

const LEVELS = ['debug', 'info', 'warn', 'error', 'silent'];

export class Logger {
  constructor(opts = {}) {
    this.level = opts.level ?? 'info';
    this.categories = new Set(opts.categories ?? []);
    this.buffer = [];
    this.bufferSize = opts.bufferSize ?? 500;
    this.enabled = opts.enabled ?? true;
  }

  setLevel(level) {
    if (LEVELS.includes(level)) this.level = level;
  }

  _log(level, category, args) {
    if (!this.enabled) return;
    const levelIdx = LEVELS.indexOf(level);
    const curIdx = LEVELS.indexOf(this.level);
    if (levelIdx < curIdx) return;
    if (category && this.categories.size > 0 && !this.categories.has(category)) return;
    const ts = new Date().toISOString().slice(11, 23);
    const msg = args.map((a) => (typeof a === 'string' ? a : safeStringify(a))).join(' ');
    const entry = { level, category: category ?? 'core', time: ts, msg };
    this.buffer.push(entry);
    if (this.buffer.length > this.bufferSize) this.buffer.shift();
    const prefix = `[${ts}] [${level.toUpperCase()}]${category ? ` [${category}]` : ''}`;
    const fn = level === 'debug' ? 'log' : level;
    const out = `${prefix} ${msg}`;
    if (level === 'error') console.error(out);
    else if (level === 'warn') console.warn(out);
    else console.log(out);
  }

  debug(category, ...args) { this._log('debug', category, args); }
  info(category, ...args) { this._log('info', category, args); }
  warn(category, ...args) { this._log('warn', category, args); }
  error(category, ...args) { this._log('error', category, args); }

  d(...args) { this._log('debug', null, args); }
  i(...args) { this._log('info', null, args); }
  w(...args) { this._log('warn', null, args); }
  e(...args) { this._log('error', null, args); }

  dump() {
    return this.buffer.map((e) => `[${e.time}] [${e.level.toUpperCase()}] [${e.category}] ${e.msg}`);
  }

  clear() {
    this.buffer.length = 0;
  }
}

function safeStringify(v) {
  try {
    if (v instanceof Error) return v.message;
    if (typeof v === 'object') return JSON.stringify(v);
    return String(v);
  } catch {
    return String(v);
  }
}

export const log = new Logger();

// ------------------------------------------------------------------ Profiler

export class Profiler {
  constructor() {
    this.markers = new Map();
    this.frameTime = 0;
  }

  beginFrame() {
    this.frameTime = performance.now();
  }

  /** Record the time spent in a named section since mark() was called. */
  mark(name) {
    const now = performance.now();
    let m = this.markers.get(name);
    if (!m) {
      m = { min: Infinity, max: 0, total: 0, count: 0, last: 0, samples: [] };
      this.markers.set(name, m);
    }
    const dt = now - this.frameTime;
    m.last = dt;
    m.total += dt;
    m.count++;
    if (dt < m.min) m.min = dt;
    if (dt > m.max) m.max = dt;
    m.samples.push(dt);
    if (m.samples.length > 120) m.samples.shift();
    this.frameTime = now;
  }

  reset() {
    this.markers.clear();
  }

  average(name) {
    const m = this.markers.get(name);
    if (!m || m.count === 0) return 0;
    return m.total / m.count;
  }

  recentAverage(name) {
    const m = this.markers.get(name);
    if (!m || m.samples.length === 0) return 0;
    let sum = 0;
    for (const s of m.samples) sum += s;
    return sum / m.samples.length;
  }

  snapshot() {
    const out = [];
    for (const [name, m] of this.markers) {
      out.push({ name, avg: m.total / Math.max(1, m.count), last: m.last, count: m.count });
    }
    out.sort((a, b) => b.avg - a.avg);
    return out;
  }
}

export const profiler = new Profiler();
