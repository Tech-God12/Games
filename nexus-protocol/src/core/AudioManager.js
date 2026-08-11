// ============================================================================
// AudioManager.js
// Fully procedural audio via the Web Audio API — no external sound files.
// Synthesizes weapon shots, hits, explosions, UI blips, ambient pads, and
// adaptive music layers. Provides a simple channel mixer with master/SFX/
// music volume controls, per-sound pitch/volume variation, spatial panning
// for 3D-positioned events, and ducking during slow-motion.
// ============================================================================

import { bus, Channels } from './EventBus.js';
import { clamp, lerp } from './MathUtils.js';

export class AudioManager {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.sfxBus = null;
    this.musicBus = null;
    this._sfxGain = 0.9;
    this._musicGain = 0.55;
    this._masterGain = 0.9;
    this._muted = false;
    this._musicNodes = null;
    this._currentTrack = null;
    this._intensity = 0; // 0..1 drives music layering
    this._targetIntensity = 0;
    this._duck = 1; // sidechain duck amount
    this._ready = false;
  }

  /** Must be called from a user gesture to satisfy autoplay policies. */
  init() {
    if (this._ready) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new Ctx();
      this.master = this.ctx.createGain();
      this.master.gain.value = this._masterGain;
      this.master.connect(this.ctx.destination);

      this.sfxBus = this.ctx.createGain();
      this.sfxBus.gain.value = this._sfxGain;
      this.sfxBus.connect(this.master);

      // a gentle saturator/limiter on the SFX bus to keep transients clean
      this._compressor = this.ctx.createDynamicsCompressor();
      this._compressor.threshold.value = -10;
      this._compressor.knee.value = 24;
      this._compressor.ratio.value = 4;
      this._compressor.attack.value = 0.003;
      this._compressor.release.value = 0.18;
      this.sfxBus.disconnect();
      this.sfxBus.connect(this._compressor);
      this._compressor.connect(this.master);

      this.musicBus = this.ctx.createGain();
      this.musicBus.gain.value = this._musicGain;
      this.musicBus.connect(this.master);

      this._ready = true;
      bus.on(Channels.PlaySFX, (e) => this.playSFX(e.name, e));
      bus.on(Channels.PlayMusic, (e) => this.playMusic(e.track, e));
    } catch (err) {
      console.warn('AudioManager: Web Audio unavailable', err);
      this._ready = false;
    }
  }

  resume() { if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume(); }
  suspend() { if (this.ctx && this.ctx.state === 'running') this.ctx.suspend(); }

  setMaster(v) { this._masterGain = clamp(v, 0, 1); if (this.master) this.master.gain.value = this._muted ? 0 : this._masterGain; }
  setSFX(v) { this._sfxGain = clamp(v, 0, 1); if (this.sfxBus) this.sfxBus.gain.value = this._sfxGain; }
  setMusic(v) { this._musicGain = clamp(v, 0, 1); if (this.musicBus) this.musicBus.gain.value = this._musicGain; }
  setMuted(m) { this._muted = m; if (this.master) this.master.gain.value = m ? 0 : this._masterGain; }
  get muted() { return this._muted; }

  /** Set the musical intensity (0 calm .. 1 combat) for adaptive layering. */
  setIntensity(v) { this._targetIntensity = clamp(v, 0, 1); }

  update(dt) {
    if (!this._ready) return;
    this._intensity = lerp(this._intensity, this._targetIntensity, 1 - Math.exp(-3 * dt));
    if (this._musicNodes) {
      const n = this._musicNodes;
      n.padGain.gain.value = lerp(0.5, 0.25, this._intensity);
      n.pulseGain.gain.value = lerp(0.0, 0.7, this._intensity);
      n.arpGain.gain.value = lerp(0.0, 0.45, this._intensity);
      n.drumGain.gain.value = lerp(0.0, 0.9, this._intensity);
      if (n.tempo) n.tempo = lerp(0.46, 0.30, this._intensity); // faster in combat
    }
  }

  // -----------------------------------------------------------------
  // One-shot SFX synthesis. Each "name" maps to a generator function.
  // -----------------------------------------------------------------
  playSFX(name, opts = {}) {
    if (!this._ready || this._muted) return;
    const fn = SFX_TABLE[name];
    if (!fn) return;
    const t = this.ctx.currentTime;
    const out = this.ctx.createGain();
    out.gain.value = opts.volume != null ? opts.volume : 1;
    out.connect(this.sfxBus);
    try { fn(this.ctx, out, t, opts); } catch (e) { /* ignore transient errors */ }
  }

  // -----------------------------------------------------------------
  // Adaptive music: layered pad + pulse + arpeggio + drums.
  // -----------------------------------------------------------------
  playMusic(track = 'menu') {
    if (!this._ready) return;
    if (this._currentTrack === track && this._musicNodes) return;
    this.stopMusic();
    this._currentTrack = track;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const nodes = {
      padGain: ctx.createGain(), pulseGain: ctx.createGain(),
      arpGain: ctx.createGain(), drumGain: ctx.createGain(),
      tempo: track === 'menu' ? 0.5 : 0.46,
      _voices: [], _stop: false,
    };
    nodes.padGain.gain.value = 0.5; nodes.padGain.connect(this.musicBus);
    nodes.pulseGain.gain.value = 0.0; nodes.pulseGain.connect(this.musicBus);
    nodes.arpGain.gain.value = 0.0; nodes.arpGain.connect(this.musicBus);
    nodes.drumGain.gain.value = 0.0; nodes.drumGain.connect(this.musicBus);

    const scale = track === 'menu'
      ? [220, 277.18, 329.63, 392, 440]              // A major-ish calm
      : [146.83, 174.61, 196, 220, 261.63, 293.66]; // D minor-ish tense
    const padFilter = ctx.createBiquadFilter();
    padFilter.type = 'lowpass'; padFilter.frequency.value = 1200; padFilter.Q.value = 0.7;
    padFilter.connect(nodes.padGain);

    // sustained pad chord
    const padOscs = [];
    [scale[0], scale[2], scale[4]].forEach((f, i) => {
      const o = ctx.createOscillator(); o.type = i === 0 ? 'sawtooth' : 'triangle';
      o.frequency.value = f;
      const g = ctx.createGain(); g.gain.value = 0.16;
      o.connect(g); g.connect(padFilter); o.start(now); padOscs.push(o);
    });
    nodes._voices.push(...padOscs);

    // pulse bassline + arps + drums scheduled by a lookahead scheduler
    const scheduler = () => {
      if (nodes._stop) return;
      const t = ctx.currentTime;
      const stepDur = nodes.tempo;
      // bass pulse
      const bo = ctx.createOscillator(); bo.type = 'square';
      const bf = scale[Math.floor(Math.random() * 2)] / 2;
      bo.frequency.setValueAtTime(bf, t);
      bo.frequency.exponentialRampToValueAtTime(bf * 0.5, t + stepDur * 0.9);
      const bg = ctx.createGain(); bg.gain.setValueAtTime(0.0001, t);
      bg.gain.exponentialRampToValueAtTime(0.4, t + 0.02);
      bg.gain.exponentialRampToValueAtTime(0.0001, t + stepDur * 0.9);
      const bfilt = ctx.createBiquadFilter(); bfilt.type = 'lowpass'; bfilt.frequency.value = 600;
      bo.connect(bfilt); bfilt.connect(bg); bg.connect(nodes.pulseGain); bo.start(t); bo.stop(t + stepDur);

      // arp blip
      if (Math.random() < 0.7) {
        const note = scale[Math.floor(Math.random() * scale.length)] * 2;
        const ao = ctx.createOscillator(); ao.type = 'triangle'; ao.frequency.value = note;
        const ag = ctx.createGain(); ag.gain.setValueAtTime(0.0001, t);
        ag.gain.exponentialRampToValueAtTime(0.3, t + 0.01);
        ag.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
        ao.connect(ag); ag.connect(nodes.arpGain); ao.start(t); ao.stop(t + 0.2);
      }

      // drum (kick + hat) only when intensity is meaningful
      if (this._intensity > 0.15) {
        const ko = ctx.createOscillator(); ko.type = 'sine';
        ko.frequency.setValueAtTime(140, t); ko.frequency.exponentialRampToValueAtTime(45, t + 0.12);
        const kg = ctx.createGain(); kg.gain.setValueAtTime(0.6 * this._intensity, t);
        kg.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
        ko.connect(kg); kg.connect(nodes.drumGain); ko.start(t); ko.stop(t + 0.18);
      }
      if (this._intensity > 0.3 && Math.random() < 0.5) {
        const noise = this._noiseBuffer(0.04);
        const src = ctx.createBufferSource(); src.buffer = noise;
        const hf = ctx.createBiquadFilter(); hf.type = 'highpass'; hf.frequency.value = 6000;
        const hg = ctx.createGain(); hg.gain.setValueAtTime(0.15 * this._intensity, t);
        hg.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
        src.connect(hf); hf.connect(hg); hg.connect(nodes.drumGain); src.start(t);
      }
      nodes._timer = setTimeout(scheduler, stepDur * 1000);
    };
    scheduler();
    nodes.padFilter = padFilter;
    this._musicNodes = nodes;
  }

  stopMusic() {
    if (!this._musicNodes) return;
    const n = this._musicNodes;
    n._stop = true;
    if (n._timer) clearTimeout(n._timer);
    const now = this.ctx.currentTime;
    try {
      n.padGain.gain.setTargetAtTime(0, now, 0.3);
      n.pulseGain.gain.setTargetAtTime(0, now, 0.1);
      n.arpGain.gain.setTargetAtTime(0, now, 0.1);
      n.drumGain.gain.setTargetAtTime(0, now, 0.1);
    } catch (e) {}
    for (const o of n._voices) { try { o.stop(now + 0.8); } catch (e) {} }
    setTimeout(() => {
      try { n.padGain.disconnect(); n.pulseGain.disconnect(); n.arpGain.disconnect(); n.drumGain.disconnect(); } catch (e) {}
    }, 1000);
    this._musicNodes = null;
    this._currentTrack = null;
  }

  _noiseBuffer(seconds) {
    const len = Math.floor(this.ctx.sampleRate * seconds);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    return buf;
  }

  destroy() {
    this.stopMusic();
    if (this.ctx) { this.ctx.close(); this.ctx = null; }
    this._ready = false;
  }
}

// -----------------------------------------------------------------
// SFX generator table. Each fn(ctx, out, t, opts) builds a short
// synthesized sound routed through `out`.
// -----------------------------------------------------------------
const SFX_TABLE = {
  shoot_pistol(ctx, out, t, o) {
    const osc = ctx.createOscillator(); osc.type = 'square';
    const f = o.pitch || 1;
    osc.frequency.setValueAtTime(420 * f, t);
    osc.frequency.exponentialRampToValueAtTime(90 * f, t + 0.08);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.5, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    osc.connect(g); g.connect(out); osc.start(t); osc.stop(t + 0.14);
    _noiseBurst(ctx, out, t, 0.06, 1800, 0.25);
  },
  shoot_smg(ctx, out, t, o) {
    _noiseBurst(ctx, out, t, 0.04, 2400, 0.22);
    const osc = ctx.createOscillator(); osc.type = 'sawtooth';
    osc.frequency.setValueAtTime((o.pitch||1)*260, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.06);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.32, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    osc.connect(g); g.connect(out); osc.start(t); osc.stop(t + 0.09);
  },
  shoot_shotgun(ctx, out, t, o) {
    _noiseBurst(ctx, out, t, 0.16, 1200, 0.5);
    const osc = ctx.createOscillator(); osc.type = 'square';
    osc.frequency.setValueAtTime(160, t); osc.frequency.exponentialRampToValueAtTime(50, t + 0.18);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.5, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 800;
    osc.connect(lp); lp.connect(g); g.connect(out); osc.start(t); osc.stop(t + 0.22);
  },
  shoot_rifle(ctx, out, t, o) {
    const f = o.pitch || 1;
    _noiseBurst(ctx, out, t, 0.07, 3200, 0.4);
    const osc = ctx.createOscillator(); osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(900*f, t); osc.frequency.exponentialRampToValueAtTime(120, t + 0.06);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.45, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
    osc.connect(g); g.connect(out); osc.start(t); osc.stop(t + 0.1);
  },
  shoot_sniper(ctx, out, t, o) {
    _noiseBurst(ctx, out, t, 0.12, 2200, 0.55);
    const osc = ctx.createOscillator(); osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1200, t); osc.frequency.exponentialRampToValueAtTime(120, t + 0.18);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.6, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    osc.connect(g); g.connect(out); osc.start(t); osc.stop(t + 0.24);
  },
  shoot_rocket(ctx, out, t, o) {
    const noise = ctx.createBufferSource();
    noise.buffer = _makeNoise(ctx, 0.3);
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 700; bp.Q.value = 0.8;
    const g = ctx.createGain(); g.gain.setValueAtTime(0.5, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    noise.connect(bp); bp.connect(g); g.connect(out); noise.start(t); noise.stop(t + 0.32);
    const osc = ctx.createOscillator(); osc.type = 'square'; osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(60, t + 0.3);
    const g2 = ctx.createGain(); g2.gain.setValueAtTime(0.3, t); g2.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    osc.connect(g2); g2.connect(out); osc.start(t); osc.stop(t + 0.32);
  },
  shoot_laser(ctx, out, t, o) {
    const f = o.pitch || 1;
    const osc = ctx.createOscillator(); osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1800*f, t); osc.frequency.exponentialRampToValueAtTime(600*f, t + 0.14);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.28, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1500; bp.Q.value = 6;
    osc.connect(bp); bp.connect(g); g.connect(out); osc.start(t); osc.stop(t + 0.18);
  },
  shoot_plasma(ctx, out, t, o) {
    const osc = ctx.createOscillator(); osc.type = 'sine';
    osc.frequency.setValueAtTime(700, t); osc.frequency.exponentialRampToValueAtTime(200, t + 0.18);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.4, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.connect(g); g.connect(out); osc.start(t); osc.stop(t + 0.22);
    _noiseBurst(ctx, out, t, 0.06, 400, 0.2);
  },
  shoot_lightning(ctx, out, t, o) {
    const noise = ctx.createBufferSource(); noise.buffer = _makeNoise(ctx, 0.1);
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2500; bp.Q.value = 2;
    const g = ctx.createGain(); g.gain.setValueAtTime(0.35, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    noise.connect(bp); bp.connect(g); g.connect(out); noise.start(t); noise.stop(t + 0.12);
  },
  shoot_flame(ctx, out, t, o) {
    const noise = ctx.createBufferSource(); noise.buffer = _makeNoise(ctx, 0.18);
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.setValueAtTime(1500, t);
    lp.frequency.exponentialRampToValueAtTime(400, t + 0.18);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.18, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    noise.connect(lp); lp.connect(g); g.connect(out); noise.start(t); noise.stop(t + 0.2);
  },
  shoot_railgun(ctx, out, t, o) {
    const osc = ctx.createOscillator(); osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(2200, t); osc.frequency.exponentialRampToValueAtTime(400, t + 0.25);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.4, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2000; bp.Q.value = 4;
    osc.connect(bp); bp.connect(g); g.connect(out); osc.start(t); osc.stop(t + 0.3);
    _noiseBurst(ctx, out, t, 0.04, 3000, 0.3);
  },
  explosion(ctx, out, t, o) {
    const size = o.size || 1;
    const noise = ctx.createBufferSource(); noise.buffer = _makeNoise(ctx, 0.5 * size);
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass';
    lp.frequency.setValueAtTime(1200, t); lp.frequency.exponentialRampToValueAtTime(120, t + 0.4 * size);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.7, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.45 * size);
    noise.connect(lp); lp.connect(g); g.connect(out); noise.start(t); noise.stop(t + 0.5 * size);
    const osc = ctx.createOscillator(); osc.type = 'sine';
    osc.frequency.setValueAtTime(120, t); osc.frequency.exponentialRampToValueAtTime(35, t + 0.35 * size);
    const g2 = ctx.createGain(); g2.gain.setValueAtTime(0.6, t); g2.gain.exponentialRampToValueAtTime(0.001, t + 0.4 * size);
    osc.connect(g2); g2.connect(out); osc.start(t); osc.stop(t + 0.45 * size);
  },
  hit_enemy(ctx, out, t, o) {
    const f = o.pitch || 1;
    const osc = ctx.createOscillator(); osc.type = 'triangle';
    osc.frequency.setValueAtTime(800 * f, t); osc.frequency.exponentialRampToValueAtTime(300 * f, t + 0.05);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.22, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    osc.connect(g); g.connect(out); osc.start(t); osc.stop(t + 0.08);
  },
  hit_player(ctx, out, t, o) {
    const osc = ctx.createOscillator(); osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, t); osc.frequency.exponentialRampToValueAtTime(60, t + 0.18);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.35, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.connect(g); g.connect(out); osc.start(t); osc.stop(t + 0.22);
  },
  kill(ctx, out, t, o) {
    const osc = ctx.createOscillator(); osc.type = 'square';
    osc.frequency.setValueAtTime(440, t); osc.frequency.exponentialRampToValueAtTime(80, t + 0.25);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.3, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
    const dist = ctx.createWaveShaper(); dist.curve = _makeDistortion(40);
    osc.connect(dist); dist.connect(g); g.connect(out); osc.start(t); osc.stop(t + 0.3);
  },
  pickup(ctx, out, t, o) {
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((f, i) => {
      const osc = ctx.createOscillator(); osc.type = 'triangle'; osc.frequency.value = f;
      const g = ctx.createGain(); const tt = t + i * 0.06;
      g.gain.setValueAtTime(0.0001, tt); g.gain.exponentialRampToValueAtTime(0.25, tt + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, tt + 0.12);
      osc.connect(g); g.connect(out); osc.start(tt); osc.stop(tt + 0.14);
    });
  },
  currency(ctx, out, t, o) {
    const osc = ctx.createOscillator(); osc.type = 'square'; osc.frequency.value = 1320;
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.15, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
    osc.connect(g); g.connect(out); osc.start(t); osc.stop(t + 0.1);
  },
  levelup(ctx, out, t, o) {
    [392, 523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      const osc = ctx.createOscillator(); osc.type = 'sawtooth'; osc.frequency.value = f;
      const g = ctx.createGain(); const tt = t + i * 0.07;
      g.gain.setValueAtTime(0.0001, tt); g.gain.exponentialRampToValueAtTime(0.2, tt + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, tt + 0.18);
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 3000;
      osc.connect(lp); lp.connect(g); g.connect(out); osc.start(tt); osc.stop(tt + 0.2);
    });
  },
  ui_hover(ctx, out, t, o) {
    const osc = ctx.createOscillator(); osc.type = 'sine'; osc.frequency.value = 880;
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.08, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
    osc.connect(g); g.connect(out); osc.start(t); osc.stop(t + 0.07);
  },
  ui_click(ctx, out, t, o) {
    const osc = ctx.createOscillator(); osc.type = 'square'; osc.frequency.setValueAtTime(660, t);
    osc.frequency.exponentialRampToValueAtTime(990, t + 0.05);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.14, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
    osc.connect(g); g.connect(out); osc.start(t); osc.stop(t + 0.1);
  },
  ui_back(ctx, out, t, o) {
    const osc = ctx.createOscillator(); osc.type = 'square'; osc.frequency.setValueAtTime(440, t);
    osc.frequency.exponentialRampToValueAtTime(220, t + 0.08);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.12, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
    osc.connect(g); g.connect(out); osc.start(t); osc.stop(t + 0.12);
  },
  dash(ctx, out, t, o) {
    const noise = ctx.createBufferSource(); noise.buffer = _makeNoise(ctx, 0.2);
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.setValueAtTime(2000, t);
    bp.frequency.exponentialRampToValueAtTime(400, t + 0.2);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.25, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    noise.connect(bp); bp.connect(g); g.connect(out); noise.start(t); noise.stop(t + 0.24);
  },
  reload(ctx, out, t, o) {
    [0, 0.12, 0.22].forEach((d, i) => {
      const tt = t + d;
      const osc = ctx.createOscillator(); osc.type = 'square'; osc.frequency.value = 200 - i * 30;
      const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, tt); g.gain.exponentialRampToValueAtTime(0.12, tt + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, tt + 0.05);
      osc.connect(g); g.connect(out); osc.start(tt); osc.stop(tt + 0.06);
    });
  },
  boss_roar(ctx, out, t, o) {
    const osc = ctx.createOscillator(); osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(90, t); osc.frequency.exponentialRampToValueAtTime(40, t + 1.2);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.6, t + 0.1);
    g.gain.exponentialRampToValueAtTime(0.001, t + 1.3);
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 500;
    osc.connect(lp); lp.connect(g); g.connect(out); osc.start(t); osc.stop(t + 1.4);
    const noise = ctx.createBufferSource(); noise.buffer = _makeNoise(ctx, 1.0);
    const ng = ctx.createGain(); ng.gain.setValueAtTime(0.2, t); ng.gain.exponentialRampToValueAtTime(0.001, t + 1.0);
    noise.connect(ng); ng.connect(out); noise.start(t); noise.stop(t + 1.0);
  },
  wave_start(ctx, out, t, o) {
    [220, 277, 330].forEach((f, i) => {
      const osc = ctx.createOscillator(); osc.type = 'sawtooth'; osc.frequency.value = f;
      const g = ctx.createGain(); const tt = t + i * 0.1;
      g.gain.setValueAtTime(0.0001, tt); g.gain.exponentialRampToValueAtTime(0.2, tt + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, tt + 0.5);
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2000;
      osc.connect(lp); lp.connect(g); g.connect(out); osc.start(tt); osc.stop(tt + 0.6);
    });
  },
  wave_clear(ctx, out, t, o) {
    [523, 659, 784, 1046].forEach((f, i) => {
      const osc = ctx.createOscillator(); osc.type = 'triangle'; osc.frequency.value = f;
      const g = ctx.createGain(); const tt = t + i * 0.08;
      g.gain.setValueAtTime(0.0001, tt); g.gain.exponentialRampToValueAtTime(0.18, tt + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, tt + 0.4);
      osc.connect(g); g.connect(out); osc.start(tt); osc.stop(tt + 0.45);
    });
  },
  player_death(ctx, out, t, o) {
    const osc = ctx.createOscillator(); osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(440, t); osc.frequency.exponentialRampToValueAtTime(55, t + 1.6);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.5, t); g.gain.exponentialRampToValueAtTime(0.001, t + 1.8);
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1200;
    osc.connect(lp); lp.connect(g); g.connect(out); osc.start(t); osc.stop(t + 1.9);
  },
  ability(ctx, out, t, o) {
    const osc = ctx.createOscillator(); osc.type = 'sine';
    osc.frequency.setValueAtTime(200, t); osc.frequency.exponentialRampToValueAtTime(1200, t + 0.3);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.3, t + 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
    osc.connect(g); g.connect(out); osc.start(t); osc.stop(t + 0.42);
  },
  void_hum(ctx, out, t, o) {
    const osc = ctx.createOscillator(); osc.type = 'sine'; osc.frequency.value = 60;
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.15, t + 0.3);
    g.gain.linearRampToValueAtTime(0.0001, t + (o.dur || 0.8));
    osc.connect(g); g.connect(out); osc.start(t); osc.stop(t + (o.dur || 0.9));
  },
};

function _noiseBurst(ctx, out, t, dur, freq, vol) {
  const noise = ctx.createBufferSource(); noise.buffer = _makeNoise(ctx, dur);
  const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = freq; bp.Q.value = 0.7;
  const g = ctx.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  noise.connect(bp); bp.connect(g); g.connect(out); noise.start(t); noise.stop(t + dur + 0.01);
}

function _makeNoise(ctx, dur) {
  const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}

function _makeDistortion(amount) {
  const n = 1024, curve = new Float32Array(n), deg = Math.PI / 180;
  for (let i = 0; i < n; i++) {
    const x = (i * 2) / n - 1;
    curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
  }
  return curve;
}

/** List of all SFX names — used by settings UI. */
export const SFX_NAMES = Object.keys(SFX_TABLE);
