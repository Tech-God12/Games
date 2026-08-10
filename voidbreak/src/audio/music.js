/**
 * VOIDBREAK — Music sequencer.
 *
 * Fully synthesized adaptive music: a 16-step sequencer with per-instrument
 * pattern tables, layered by combat intensity (0 = calm → 3 = chaos). A
 * separate boss mode switches to a heavier pattern set. All voices are
 * generated with oscillators + filters — no samples.
 */

import { audio } from './audioengine.js';
import { log } from '../core/profiler.js';

const A2 = 110, B2 = 123.47, C3 = 130.81, D3 = 146.83, E3 = 164.81, F3 = 174.61, G3 = 196.0;
const A3 = 220, B3 = 246.94, C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.0;
const A4 = 440, C5 = 523.25, D5 = 587.33, E5 = 659.25, F5 = 698.46, G5 = 783.99, B4 = 493.88;

const CHORDS = [
  [A2, C3, E3],   // Am
  [F3, A3, C4],   // F
  [C3, E3, G3],   // C
  [G3, B3, D4],   // G
];

const ARP_PATTERNS = [
  [0, 1, 2, 1],
  [0, 2, 1, 2],
  [2, 1, 0, 1],
  [0, 1, 2, 3],
];

const SCALE = [A3, B3, C4, D4, E4, F4, G4, A4, B4, C5, D5, E5];

const RHYTHM = {
  0: {
    kick: [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    snare: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    hats:  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    bass:  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    arp:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  1: {
    kick: [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    hats:  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    bass:  [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0],
    arp:   [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
  },
  2: {
    kick: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    hats:  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    bass:  [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    arp:   [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0],
  },
  3: {
    kick: [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    snare: [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0],
    hats:  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    bass:  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
    arp:   [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
  },
};

const BOSS_RHYTHM = {
  kick: [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0],
  snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  hats:  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  bass:  [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
  arp:   [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
};

export class Music {
  constructor() {
    this.running = false;
    this.intensity = 0;
    this.boss = false;
    this.bpm = 104;
    this.step = 0;
    this.nextStepTime = 0;
    this.chordIdx = 0;
    this._timer = null;
    this.section = 0;
    this.leadNote = 0;
  }

  start() {
    if (this.running || !audio.ctx) return;
    this.running = true;
    this.step = 0;
    this.nextStepTime = audio.ctx.currentTime + 0.08;
    this._timer = setInterval(() => this._schedule(), 40);
    log.info('music', 'sequencer started');
  }

  stop() {
    this.running = false;
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  setIntensity(v) {
    this.intensity = Math.max(0, Math.min(3, v));
  }

  setBoss(v) {
    this.boss = v;
    if (v) this.intensity = Math.max(this.intensity, 2);
  }

  _schedule() {
    if (!this.running || !audio.ctx) return;
    const ahead = audio.ctx.currentTime + 0.12;
    const stepDur = 60 / this.bpm / 4;
    while (this.nextStepTime < ahead) {
      this._playStep(this.step, this.nextStepTime);
      this.step = (this.step + 1) % 16;
      if (this.step === 0) {
        this.chordIdx = (this.chordIdx + 1) % CHORDS.length;
        this.section++;
      }
      this.nextStepTime += stepDur;
    }
  }

  _pattern() {
    return this.boss ? BOSS_RHYTHM : RHYTHM[this.intensity];
  }

  _playStep(step, t) {
    const pat = this._pattern();
    const chord = CHORDS[this.chordIdx];

    if (pat.kick[step]) this._kick(t, step, pat.kick[step] === 2 ? 1.3 : 1);
    if (pat.snare[step]) this._snare(t, step);
    if (pat.hats[step]) this._hat(t, step, this.intensity >= 2 ? 0.9 : 0.6);
    if (pat.bass[step]) this._bass(t, chord[0]);
    if (pat.arp[step]) {
      const pattern = ARP_PATTERNS[this.chordIdx % ARP_PATTERNS.length];
      const deg = pattern[Math.floor(step / 4) % pattern.length];
      this._arp(t, chord[deg % chord.length], step % 4);
    }
    if (this.boss && step % 2 === 0) {
      this._lead(t, step);
    }
    if (step === 0 || step === 8) this._pad(t, chord);
  }

  _kick(t, step, accent = 1) {
    const ctx = audio.ctx;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(160 * accent, t);
    osc.frequency.exponentialRampToValueAtTime(42, t + 0.11);
    g.gain.setValueAtTime(0.9 * accent, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    osc.connect(g);
    g.connect(audio.musicBus);
    osc.start(t);
    osc.stop(t + 0.25);
    void step;
  }

  _snare(t, step) {
    const ctx = audio.ctx;
    const src = ctx.createBufferSource();
    src.buffer = audio.noiseBuffer;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1900;
    filter.Q.value = 0.9;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.5, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    src.connect(filter);
    filter.connect(g);
    g.connect(audio.musicBus);
    src.start(t);
    src.stop(t + 0.18);
    const tone = ctx.createOscillator();
    tone.type = 'triangle';
    tone.frequency.value = 185;
    const tg = ctx.createGain();
    tg.gain.setValueAtTime(0.25, t);
    tg.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    tone.connect(tg);
    tg.connect(audio.musicBus);
    tone.start(t);
    tone.stop(t + 0.1);
    void step;
  }

  _hat(t, step, vol) {
    const ctx = audio.ctx;
    const src = ctx.createBufferSource();
    src.buffer = audio.noiseBuffer;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 7800;
    const g = ctx.createGain();
    const open = step % 4 === 2 && this.intensity >= 2;
    g.gain.setValueAtTime(0.32 * vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + (open ? 0.28 : 0.05));
    src.connect(filter);
    filter.connect(g);
    g.connect(audio.musicBus);
    src.start(t);
    src.stop(t + 0.32);
  }

  _bass(t, rootFreq) {
    const ctx = audio.ctx;
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.value = rootFreq;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(700, t);
    filter.frequency.exponentialRampToValueAtTime(180, t + 0.18);
    filter.Q.value = 3;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.42, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.connect(filter);
    filter.connect(g);
    g.connect(audio.musicBus);
    osc.start(t);
    osc.stop(t + 0.24);
  }

  _pad(t, chord) {
    const ctx = audio.ctx;
    const dur = 60 / this.bpm * 4;
    for (const f of chord) {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';
      osc1.frequency.value = f;
      osc2.frequency.value = f * 1.005;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 900;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(0.07 * this._padGain(), t + dur * 0.3);
      g.gain.linearRampToValueAtTime(0.0001, t + dur * 0.96);
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(g);
      g.connect(audio.musicBus);
      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + dur);
      osc2.stop(t + dur);
    }
  }

  _padGain() {
    return 0.3 + this.intensity * 0.2 + (this.boss ? 0.2 : 0);
  }

  _arp(t, freq, noteIdx) {
    const ctx = audio.ctx;
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = freq * 2;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 2200;
    const g = ctx.createGain();
    const dur = 60 / this.bpm / 4;
    g.gain.setValueAtTime(0.14, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.85);
    osc.connect(filter);
    filter.connect(g);
    g.connect(audio.musicBus);
    osc.start(t);
    osc.stop(t + dur);
    if (this.intensity >= 3 && noteIdx % 2 === 1) {
      const osc2 = ctx.createOscillator();
      osc2.type = 'square';
      osc2.frequency.value = freq * 2;
      const g2 = ctx.createGain();
      g2.gain.setValueAtTime(0.05, t + dur * 0.5);
      g2.gain.exponentialRampToValueAtTime(0.001, t + dur * 1.3);
      osc2.connect(g2);
      g2.connect(audio.musicBus);
      osc2.start(t + dur * 0.5);
      osc2.stop(t + dur * 1.4);
    }
  }

  _lead(t, step) {
    const ctx = audio.ctx;
    if (step % 8 === 0) this.leadNote = (this.leadNote + 3) % (SCALE.length - 4);
    const f = SCALE[this.leadNote + Math.floor(step / 2) % 4];
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.value = f;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1400;
    const g = ctx.createGain();
    const dur = 60 / this.bpm / 2;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.13, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.9);
    osc.connect(filter);
    filter.connect(g);
    g.connect(audio.musicBus);
    osc.start(t);
    osc.stop(t + dur);
  }
}

export const music = new Music();
