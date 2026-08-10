/**
 * VOIDBREAK — Ambient soundscape.
 *
 * Continuous low-level atmosphere: a deep station hum, wind layers, distant
 * metallic creaks and random far-away rumbles. All synthesized; level with
 * the ambience bus. The atmosphere "thickens" with wave intensity.
 */

import { audio } from './audioengine.js';
import { log } from '../core/profiler.js';

export class Ambience {
  constructor() {
    this.running = false;
    this.intensity = 0;
    this.nodes = [];
    this._creakTimer = null;
    this._rumbleTimer = null;
  }

  start() {
    if (this.running || !audio.ctx) return;
    this.running = true;
    this._buildHum();
    this._buildWind();
    this._creakTimer = setInterval(() => this._maybeCreak(), 14000);
    this._rumbleTimer = setInterval(() => this._maybeRumble(), 22000);
    log.info('music', 'ambience started');
  }

  stop() {
    this.running = false;
    for (const n of this.nodes) {
      try {
        n.osc.stop();
        n.gain.disconnect();
      } catch { /* ignore */ }
    }
    this.nodes = [];
    clearInterval(this._creakTimer);
    clearInterval(this._rumbleTimer);
  }

  setIntensity(v) {
    this.intensity = v;
  }

  _buildHum() {
    const ctx = audio.ctx;
    const makeDrone = (freq, vol, detune = 0) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      osc.detune.value = detune;
      const g = ctx.createGain();
      g.gain.value = vol;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 220;
      osc.connect(filter);
      filter.connect(g);
      g.connect(audio.ambBus);
      osc.start();
      return { osc, gain: g, filter };
    };
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 12;
    lfo.connect(lfoGain);

    const n1 = makeDrone(46, 0.09, -8);
    const n2 = makeDrone(46.7, 0.09, 8);
    const n3 = makeDrone(92, 0.03);
    lfoGain.connect(n1.filter.frequency);
    lfoGain.connect(n2.filter.frequency);
    lfo.start();
    this.nodes.push(n1, n2, n3, { osc: lfo, gain: lfoGain });
  }

  _buildWind() {
    const ctx = audio.ctx;
    const src = ctx.createBufferSource();
    src.buffer = audio.noiseBuffer;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 400;
    filter.Q.value = 0.6;
    const g = ctx.createGain();
    g.gain.value = 0.035;
    src.connect(filter);
    filter.connect(g);
    g.connect(audio.ambBus);
    src.start();
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.03;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 180;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
    this.nodes.push({ osc: src, gain: g }, { osc: lfo, gain: lfoGain });
  }

  _maybeCreak() {
    if (!audio.ready || Math.random() > 0.6) return;
    const ctx = audio.ctx;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    const startFreq = 120 + Math.random() * 200;
    osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(startFreq * (1.2 + Math.random() * 0.3), ctx.currentTime + 0.4);
    osc.frequency.linearRampToValueAtTime(startFreq * 0.7, ctx.currentTime + 1.2);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.35);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);
    osc.connect(g);
    g.connect(audio.ambBus);
    osc.start();
    osc.stop(ctx.currentTime + 1.5);
    setTimeout(() => {
      try { osc.disconnect(); g.disconnect(); } catch { /* ignore */ }
    }, 1700);
  }

  _maybeRumble() {
    if (!audio.ready || Math.random() > 0.5) return;
    const ctx = audio.ctx;
    const src = ctx.createBufferSource();
    src.buffer = audio.noiseBuffer;
    src.loop = true;
    src.playbackRate.value = 0.4;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 1.5);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 0.6);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.2);
    src.connect(filter);
    filter.connect(g);
    g.connect(audio.ambBus);
    src.start();
    src.stop(ctx.currentTime + 3.4);
    setTimeout(() => {
      try { src.disconnect(); filter.disconnect(); g.disconnect(); } catch { /* ignore */ }
    }, 3600);
  }
}

export const ambience = new Ambience();
