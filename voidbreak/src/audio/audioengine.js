/**
 * VOIDBREAK — AudioEngine.
 *
 * Procedural audio: no samples are shipped — every sound is synthesized at
 * runtime with WebAudio. The engine owns the master graph:
 *
 *   sfx bus ─┐
 *   music bus├─ master gain → compressor → destination
 *   amb bus ─┘
 *
 * Provides a tiny "synth DSL" for one-shot sounds (oscillators + noise +
 * envelopes + filters), a positional helper (pan + distance) and volume
 * routing tied to the settings store.
 */

import { log } from '../core/profiler.js';
import { settings } from '../core/settings.js';
import { clamp01 } from '../core/math.js';

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.sfxBus = null;
    this.musicBus = null;
    this.ambBus = null;
    this.unlocked = false;
    this.noiseBuffer = null;
    this._listener = { x: 0, y: 0, z: 0, fx: 0, fy: 0, fz: -1 };
    this.volume = {
      master: settings.get('volumeMaster'),
      sfx: settings.get('volumeSfx'),
      music: settings.get('volumeMusic'),
      ambience: settings.get('volumeAmbience'),
    };
    this._bindSettings();
  }

  _bindSettings() {
    settings.on('volumeMaster', (v) => { this.volume.master = v; this._applyVolumes(); });
    settings.on('volumeSfx', (v) => { this.volume.sfx = v; this._applyVolumes(); });
    settings.on('volumeMusic', (v) => { this.volume.music = v; this._applyVolumes(); });
    settings.on('volumeAmbience', (v) => { this.volume.ambience = v; this._applyVolumes(); });
  }

  get ready() {
    return this.ctx !== null && this.unlocked;
  }

  /** Create the AudioContext (must be called from a user gesture). */
  unlock() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      this.unlocked = true;
      return;
    }
    const Ctx = window.AudioContext ?? window.webkitAudioContext;
    if (!Ctx) {
      log.warn('audio', 'WebAudio not supported');
      return;
    }
    this.ctx = new Ctx({ latencyHint: 'interactive' });

    this.master = this.ctx.createGain();
    this.sfxBus = this.ctx.createGain();
    this.musicBus = this.ctx.createGain();
    this.ambBus = this.ctx.createGain();
    const comp = this.ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.knee.value = 20;
    comp.ratio.value = 6;
    comp.attack.value = 0.002;
    comp.release.value = 0.18;

    this.master.connect(comp);
    comp.connect(this.ctx.destination);
    this.sfxBus.connect(this.master);
    this.musicBus.connect(this.master);
    this.ambBus.connect(this.master);

    this._applyVolumes();

    const len = this.ctx.sampleRate * 2;
    this.noiseBuffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    this.unlocked = true;
    log.info('audio', `engine unlocked (${this.ctx.sampleRate} Hz)`);
  }

  _applyVolumes() {
    if (!this.ctx) return;
    this.master.gain.value = this.volume.master;
    this.sfxBus.gain.value = this.volume.sfx;
    this.musicBus.gain.value = this.volume.music;
    this.ambBus.gain.value = this.volume.ambience;
  }

  suspend() {
    this.ctx?.suspend();
  }

  resume() {
    this.ctx?.resume();
  }

  /**
   * Update the listener (camera) position/forward for positional audio.
   */
  updateListener(pos, forward) {
    this._listener.x = pos.x;
    this._listener.y = pos.y;
    this._listener.z = pos.z;
    this._listener.fx = forward.x;
    this._listener.fy = forward.y;
    this._listener.fz = forward.z;
  }

  /** Compute pan + volume from a world position relative to the listener. */
  spatialize(worldPos, referenceDistance = 8, maxDist = 60) {
    const dx = worldPos.x - this._listener.x;
    const dy = worldPos.y - this._listener.y;
    const dz = worldPos.z - this._listener.z;
    const dist = Math.hypot(dx, dy, dz);
    const fwdLen = Math.hypot(this._listener.fx, this._listener.fy, this._listener.fz) || 1;
    const fx = this._listener.fx / fwdLen;
    const fz = this._listener.fz / fwdLen;
    const cross = fx * dz - fz * dx;
    const side = clamp01(dist > 0.001 ? cross / dist : 0);
    const pan = side * 2 - 1;
    const vol = dist <= referenceDistance
      ? 1
      : Math.max(0, 1 - (dist - referenceDistance) / (maxDist - referenceDistance));
    return { pan, vol, dist };
  }

  /**
   * Play a one-shot synthesized sound at a world position.
   */
  play(def, opts = {}) {
    if (!this.ready || !def) return null;
    const t0 = this.ctx.currentTime;
    let vol = (opts.vol ?? 1) * (def.vol ?? 1);
    let pan = 0;

    if (opts.x !== undefined) {
      const sp = this.spatialize({ x: opts.x, y: opts.y ?? 0, z: opts.z ?? 0 });
      pan = sp.pan;
      vol *= sp.vol;
      if (vol <= 0.001) return null;
    }

    const out = this.ctx.createGain();
    out.gain.value = 0;
    if (this.ctx.createStereoPanner) {
      const panner = this.ctx.createStereoPanner();
      panner.pan.value = pan;
      out.connect(panner);
      panner.connect(this.sfxBus);
    } else {
      out.connect(this.sfxBus);
    }

    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0, t0);
    const attack = def.attack ?? 0.002;
    env.gain.linearRampToValueAtTime(1, t0 + attack);
    const release = def.release ?? 0.08;
    const end = t0 + (def.duration ?? 0.15) + release;
    env.gain.setTargetAtTime(0, end - release, release / 3);
    env.connect(out);

    const nodes = [];
    const register = (n) => {
      nodes.push(n);
      return n;
    };

    const pitch = opts.pitch ?? 1;

    if (def.type === 'osc') {
      const oscs = Array.isArray(def.osc) ? def.osc : [def.osc];
      for (const spec of oscs) {
        const osc = register(this.ctx.createOscillator());
        osc.type = spec.wave ?? def.wave ?? 'square';
        osc.frequency.setValueAtTime((spec.freq ?? def.freq ?? 440) * pitch, t0);
        if (spec.freqEnd !== undefined || def.freqEnd !== undefined) {
          osc.frequency.exponentialRampToValueAtTime(
            Math.max(1, (spec.freqEnd ?? def.freqEnd) * pitch),
            t0 + (def.duration ?? 0.15),
          );
        }
        const g = register(this.ctx.createGain());
        g.gain.value = spec.amp ?? def.amp ?? 0.3;
        osc.connect(g);
        g.connect(env);
        osc.start(t0);
        osc.stop(t0 + (def.duration ?? 0.15) + release + 0.05);
      }
    } else if (def.type === 'noise') {
      const src = register(this.ctx.createBufferSource());
      src.buffer = this.noiseBuffer;
      src.loop = true;
      if (def.rate !== undefined) src.playbackRate.value = opts.rate ?? def.rate;
      const filter = register(this.ctx.createBiquadFilter());
      filter.type = def.filter ?? 'lowpass';
      filter.frequency.setValueAtTime(def.freq ?? 1200, t0);
      if (def.freqEnd !== undefined) {
        filter.frequency.exponentialRampToValueAtTime(Math.max(10, def.freqEnd), t0 + (def.duration ?? 0.2));
      }
      filter.Q.value = def.q ?? 0.8;
      const g = register(this.ctx.createGain());
      g.gain.value = def.amp ?? 0.4;
      src.connect(filter);
      filter.connect(g);
      g.connect(env);
      src.start(t0);
      src.stop(t0 + (def.duration ?? 0.2) + release + 0.05);
    } else if (def.type === 'mixed') {
      if (def.osc) {
        for (const spec of Array.isArray(def.osc) ? def.osc : [def.osc]) {
          const osc = register(this.ctx.createOscillator());
          osc.type = spec.wave ?? 'sawtooth';
          osc.frequency.setValueAtTime((spec.freq ?? 220) * pitch, t0);
          osc.frequency.exponentialRampToValueAtTime(Math.max(1, (spec.freqEnd ?? 60) * pitch), t0 + (def.duration ?? 0.12));
          const g = register(this.ctx.createGain());
          g.gain.setValueAtTime(spec.amp ?? 0.25, t0);
          g.gain.exponentialRampToValueAtTime(0.001, t0 + (def.duration ?? 0.12));
          osc.connect(g);
          g.connect(env);
          osc.start(t0);
          osc.stop(t0 + (def.duration ?? 0.12) + release + 0.05);
        }
      }
      if (def.noise !== false) {
        const src = register(this.ctx.createBufferSource());
        src.buffer = this.noiseBuffer;
        src.loop = true;
        const filter = register(this.ctx.createBiquadFilter());
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(def.noiseFreq ?? 2400, t0);
        filter.frequency.exponentialRampToValueAtTime(Math.max(30, def.noiseFreqEnd ?? 200), t0 + (def.duration ?? 0.12));
        filter.Q.value = 0.7;
        const g = register(this.ctx.createGain());
        g.gain.setValueAtTime(def.noiseAmp ?? 0.5, t0);
        g.gain.exponentialRampToValueAtTime(0.001, t0 + (def.duration ?? 0.12));
        src.connect(filter);
        filter.connect(g);
        g.connect(env);
        src.start(t0);
        src.stop(t0 + (def.duration ?? 0.12) + release + 0.05);
      }
    } else if (def.type === 'sweep') {
      const osc = register(this.ctx.createOscillator());
      osc.type = def.wave ?? 'sine';
      osc.frequency.setValueAtTime((def.freq ?? 200) * pitch, t0);
      osc.frequency.exponentialRampToValueAtTime(Math.max(1, (def.freqEnd ?? 400) * pitch), t0 + (def.duration ?? 0.3));
      const g = register(this.ctx.createGain());
      g.gain.setValueAtTime(0.001, t0);
      g.gain.exponentialRampToValueAtTime(def.amp ?? 0.3, t0 + (def.attack ?? 0.02));
      g.gain.exponentialRampToValueAtTime(0.001, t0 + (def.duration ?? 0.3));
      osc.connect(g);
      g.connect(env);
      osc.start(t0);
      osc.stop(t0 + (def.duration ?? 0.3) + release + 0.05);
    } else if (def.type === 'click') {
      const osc = register(this.ctx.createOscillator());
      osc.type = 'square';
      osc.frequency.setValueAtTime((def.freq ?? 1800) * pitch, t0);
      const g = register(this.ctx.createGain());
      g.gain.setValueAtTime(def.amp ?? 0.2, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + (def.duration ?? 0.03));
      osc.connect(g);
      g.connect(env);
      osc.start(t0);
      osc.stop(t0 + (def.duration ?? 0.03) + release + 0.05);
    } else if (def.type === 'sequence') {
      const stepDur = def.step ?? 0.07;
      (def.notes ?? []).forEach((n, i) => {
        const tt = t0 + i * stepDur;
        const osc = register(this.ctx.createOscillator());
        osc.type = n.wave ?? 'square';
        osc.frequency.value = (n.freq ?? 440) * pitch;
        const g = register(this.ctx.createGain());
        g.gain.setValueAtTime(0.001, tt);
        g.gain.exponentialRampToValueAtTime(n.amp ?? 0.15, tt + 0.005);
        g.gain.exponentialRampToValueAtTime(0.001, tt + stepDur * 0.9);
        osc.connect(g);
        g.connect(env);
        osc.start(tt);
        osc.stop(tt + stepDur);
      });
    }

    out.gain.setValueAtTime(0, t0);
    out.gain.linearRampToValueAtTime(vol, t0 + (def.attack ?? 0.002));
    const end2 = t0 + (def.duration ?? 0.15) + release;
    out.gain.setTargetAtTime(0, end2 - release, release / 3);

    setTimeout(() => {
      for (const n of nodes) {
        try { n.disconnect(); } catch { /* ignore */ }
      }
      try { out.disconnect(); env.disconnect(); } catch { /* ignore */ }
    }, ((def.duration ?? 0.2) + release + 0.5) * 1000);

    return { end, nodes };
  }
}

export const audio = new AudioEngine();
