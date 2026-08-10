/**
 * VOIDBREAK — Sound effect definitions.
 *
 * Every game sound as a declarative "synth DSL" consumed by AudioEngine.play.
 * Definitions are grouped by category; the game calls Sfx.play('gun.ar', ...).
 */

import { audio } from './audioengine.js';

export const Sfx = {
  // ----------------------------------------------------------- weapons

  'gun.pistol': { type: 'mixed', duration: 0.11, vol: 0.5, osc: [{ wave: 'square', freq: 420, freqEnd: 90, amp: 0.3 }], noiseFreq: 3200, noiseFreqEnd: 400, noiseAmp: 0.55 },
  'gun.smg': { type: 'mixed', duration: 0.09, vol: 0.42, osc: [{ wave: 'sawtooth', freq: 380, freqEnd: 110, amp: 0.25 }], noiseFreq: 3800, noiseFreqEnd: 500, noiseAmp: 0.5 },
  'gun.ar': { type: 'mixed', duration: 0.13, vol: 0.5, osc: [{ wave: 'square', freq: 300, freqEnd: 70, amp: 0.32 }, { wave: 'sawtooth', freq: 620, freqEnd: 140, amp: 0.12 }], noiseFreq: 2600, noiseFreqEnd: 300, noiseAmp: 0.6 },
  'gun.br': { type: 'mixed', duration: 0.16, vol: 0.55, osc: [{ wave: 'square', freq: 240, freqEnd: 55, amp: 0.35 }], noiseFreq: 2200, noiseFreqEnd: 240, noiseAmp: 0.6 },
  'gun.shotgun': { type: 'mixed', duration: 0.3, vol: 0.75, osc: [{ wave: 'sawtooth', freq: 180, freqEnd: 40, amp: 0.5 }], noiseFreq: 1800, noiseFreqEnd: 120, noiseAmp: 0.9 },
  'gun.sniper': { type: 'mixed', duration: 0.35, vol: 0.8, osc: [{ wave: 'square', freq: 260, freqEnd: 40, amp: 0.4 }], noiseFreq: 2000, noiseFreqEnd: 90, noiseAmp: 0.85 },
  'gun.plasma': { type: 'sweep', duration: 0.22, vol: 0.5, wave: 'sawtooth', freq: 700, freqEnd: 120, amp: 0.3 },
  'gun.minigun': { type: 'mixed', duration: 0.07, vol: 0.38, osc: [{ wave: 'sawtooth', freq: 320, freqEnd: 140, amp: 0.2 }], noiseFreq: 3000, noiseFreqEnd: 800, noiseAmp: 0.4 },
  'gun.railgun': { type: 'mixed', duration: 0.4, vol: 0.85, osc: [{ wave: 'sine', freq: 900, freqEnd: 60, amp: 0.5 }], noiseFreq: 4000, noiseFreqEnd: 100, noiseAmp: 0.9 },
  'gun.grenade': { type: 'mixed', duration: 0.2, vol: 0.6, osc: [{ wave: 'sine', freq: 500, freqEnd: 120, amp: 0.4 }], noiseFreq: 1500, noiseFreqEnd: 200, noiseAmp: 0.7 },
  'gun.flamethrower': { type: 'noise', duration: 0.25, vol: 0.45, filter: 'bandpass', freq: 900, freqEnd: 500, q: 2, amp: 0.5 },
  'gun.tesla': { type: 'noise', duration: 0.3, vol: 0.5, filter: 'highpass', freq: 3000, freqEnd: 5000, q: 1.2, amp: 0.35 },
  'gun.melee': { type: 'sweep', duration: 0.12, vol: 0.5, wave: 'sawtooth', freq: 800, freqEnd: 200, amp: 0.3 },

  'weapon.empty': { type: 'click', duration: 0.04, vol: 0.3, freq: 700, amp: 0.2 },
  'weapon.reload': { type: 'sequence', vol: 0.4, step: 0.05, notes: [{ freq: 300, amp: 0.1 }, { freq: 450, amp: 0.12 }, { freq: 600, amp: 0.12 }] },
  'weapon.reload_end': { type: 'click', duration: 0.05, vol: 0.4, freq: 1500, amp: 0.2 },
  'weapon.switch': { type: 'click', duration: 0.06, vol: 0.35, freq: 900, amp: 0.2 },
  'weapon.pickup': { type: 'sequence', vol: 0.5, step: 0.045, notes: [{ freq: 520, amp: 0.12 }, { freq: 660, amp: 0.12 }, { freq: 880, amp: 0.12 }] },

  // ------------------------------------------------------------ impacts

  'hit.enemy': { type: 'click', duration: 0.045, vol: 0.45, freq: 2200, amp: 0.35 },
  'hit.crit': { type: 'sequence', vol: 0.6, step: 0.04, notes: [{ freq: 1800, amp: 0.3 }, { freq: 2400, amp: 0.25 }] },
  'hit.kill': { type: 'sequence', vol: 0.6, step: 0.05, notes: [{ freq: 880, amp: 0.2, wave: 'sine' }, { freq: 1320, amp: 0.2, wave: 'sine' }, { freq: 1760, amp: 0.25, wave: 'sine' }] },
  'hit.player': { type: 'noise', duration: 0.12, vol: 0.5, filter: 'lowpass', freq: 800, freqEnd: 150, amp: 0.4 },
  'hit.wall': { type: 'noise', duration: 0.08, vol: 0.3, filter: 'highpass', freq: 1500, amp: 0.25 },
  'hit.shield': { type: 'sweep', duration: 0.12, vol: 0.5, wave: 'sine', freq: 1400, freqEnd: 400, amp: 0.3 },
  'hit.armor': { type: 'click', duration: 0.07, vol: 0.5, freq: 1200, amp: 0.4 },

  // ----------------------------------------------------------- enemies

  'enemy.spawn': { type: 'sweep', duration: 0.4, vol: 0.4, wave: 'sine', freq: 300, freqEnd: 900, amp: 0.25 },
  'enemy.growl': { type: 'sweep', duration: 0.3, vol: 0.3, wave: 'sawtooth', freq: 140, freqEnd: 90, amp: 0.2 },
  'enemy.shoot': { type: 'sweep', duration: 0.1, vol: 0.35, wave: 'sawtooth', freq: 500, freqEnd: 200, amp: 0.2 },
  'enemy.melee_swing': { type: 'sweep', duration: 0.12, vol: 0.35, wave: 'sine', freq: 300, freqEnd: 900, amp: 0.2 },
  'enemy.explode': { type: 'noise', duration: 0.6, vol: 0.7, filter: 'lowpass', freq: 1000, freqEnd: 60, amp: 0.8 },
  'enemy.die_small': { type: 'sweep', duration: 0.25, vol: 0.4, wave: 'sine', freq: 700, freqEnd: 120, amp: 0.3 },
  'enemy.die_big': { type: 'noise', duration: 0.8, vol: 0.75, filter: 'lowpass', freq: 800, freqEnd: 40, amp: 0.8 },
  'enemy.alert': { type: 'sweep', duration: 0.2, vol: 0.35, wave: 'sawtooth', freq: 200, freqEnd: 600, amp: 0.2 },
  'enemy.charge': { type: 'sweep', duration: 0.5, vol: 0.5, wave: 'sawtooth', freq: 150, freqEnd: 900, amp: 0.3 },
  'enemy.summon': { type: 'sequence', vol: 0.45, step: 0.09, notes: [{ freq: 200, amp: 0.15 }, { freq: 300, amp: 0.15 }, { freq: 450, amp: 0.15 }, { freq: 600, amp: 0.18 }] },

  // ---------------------------------------------------------- explosions

  'explosion.small': { type: 'noise', duration: 0.5, vol: 0.7, filter: 'lowpass', freq: 1500, freqEnd: 80, amp: 0.75 },
  'explosion.medium': { type: 'noise', duration: 0.7, vol: 0.85, filter: 'lowpass', freq: 1200, freqEnd: 50, amp: 0.9 },
  'explosion.large': { type: 'noise', duration: 1.0, vol: 1.0, filter: 'lowpass', freq: 900, freqEnd: 40, amp: 1.0 },
  'explosion.shockwave': { type: 'sweep', duration: 0.5, vol: 0.6, wave: 'sine', freq: 100, freqEnd: 40, amp: 0.5 },

  // ---------------------------------------------------------------- fx

  'fx.muzzle': { type: 'noise', duration: 0.05, vol: 0.3, filter: 'highpass', freq: 3000, amp: 0.2 },
  'fx.tracer': { type: 'sweep', duration: 0.08, vol: 0.2, wave: 'sine', freq: 2000, freqEnd: 800, amp: 0.12 },
  'fx.casing': { type: 'click', duration: 0.05, vol: 0.18, freq: 2500, amp: 0.12 },
  'fx.footstep': { type: 'noise', duration: 0.07, vol: 0.25, filter: 'lowpass', freq: 500, freqEnd: 150, amp: 0.2 },
  'fx.footstep_run': { type: 'noise', duration: 0.05, vol: 0.3, filter: 'lowpass', freq: 650, freqEnd: 200, amp: 0.25 },
  'fx.jump': { type: 'sweep', duration: 0.1, vol: 0.2, wave: 'sine', freq: 200, freqEnd: 500, amp: 0.1 },
  'fx.land': { type: 'noise', duration: 0.09, vol: 0.3, filter: 'lowpass', freq: 400, freqEnd: 100, amp: 0.25 },
  'fx.dash': { type: 'sweep', duration: 0.18, vol: 0.4, wave: 'sine', freq: 500, freqEnd: 1600, amp: 0.2 },
  'fx.powerup': { type: 'sequence', vol: 0.55, step: 0.06, notes: [{ freq: 400, amp: 0.12, wave: 'sine' }, { freq: 600, amp: 0.12, wave: 'sine' }, { freq: 900, amp: 0.15, wave: 'sine' }] },
  'fx.damage_ring': { type: 'sweep', duration: 0.4, vol: 0.45, wave: 'sine', freq: 1000, freqEnd: 200, amp: 0.25 },

  // ---------------------------------------------------------------- ui

  'ui.click': { type: 'click', duration: 0.04, vol: 0.35, freq: 1300, amp: 0.2 },
  'ui.hover': { type: 'click', duration: 0.03, vol: 0.22, freq: 1900, amp: 0.12 },
  'ui.confirm': { type: 'sequence', vol: 0.45, step: 0.06, notes: [{ freq: 600, amp: 0.12 }, { freq: 900, amp: 0.12 }, { freq: 1200, amp: 0.15 }] },
  'ui.back': { type: 'sequence', vol: 0.4, step: 0.06, notes: [{ freq: 900, amp: 0.1 }, { freq: 600, amp: 0.1 }] },
  'ui.error': { type: 'sequence', vol: 0.4, step: 0.08, notes: [{ freq: 300, amp: 0.12 }, { freq: 240, amp: 0.12 }] },
  'ui.open': { type: 'sweep', duration: 0.15, vol: 0.35, wave: 'sine', freq: 400, freqEnd: 900, amp: 0.15 },
  'ui.close': { type: 'sweep', duration: 0.12, vol: 0.3, wave: 'sine', freq: 800, freqEnd: 350, amp: 0.12 },
  'ui.wave_start': { type: 'sequence', vol: 0.6, step: 0.08, notes: [{ freq: 330, amp: 0.15, wave: 'sawtooth' }, { freq: 440, amp: 0.15, wave: 'sawtooth' }, { freq: 660, amp: 0.2, wave: 'sawtooth' }] },
  'ui.wave_clear': { type: 'sequence', vol: 0.6, step: 0.09, notes: [{ freq: 660, amp: 0.15, wave: 'sine' }, { freq: 880, amp: 0.15, wave: 'sine' }, { freq: 1100, amp: 0.2, wave: 'sine' }] },
  'ui.boss': { type: 'sequence', vol: 0.7, step: 0.12, notes: [{ freq: 110, amp: 0.4, wave: 'sawtooth' }, { freq: 110, amp: 0.35, wave: 'sawtooth' }, { freq: 165, amp: 0.3, wave: 'sawtooth' }, { freq: 220, amp: 0.35, wave: 'sawtooth' }] },
  'ui.levelup': { type: 'sequence', vol: 0.6, step: 0.07, notes: [{ freq: 523, amp: 0.14, wave: 'sine' }, { freq: 659, amp: 0.14, wave: 'sine' }, { freq: 784, amp: 0.16, wave: 'sine' }, { freq: 1046, amp: 0.2, wave: 'sine' }] },
  'ui.upgrade': { type: 'sequence', vol: 0.55, step: 0.05, notes: [{ freq: 700, amp: 0.12 }, { freq: 900, amp: 0.12 }, { freq: 1100, amp: 0.14 }, { freq: 1400, amp: 0.16 }] },
  'ui.gameover': { type: 'sequence', vol: 0.6, step: 0.14, notes: [{ freq: 300, amp: 0.2, wave: 'sawtooth' }, { freq: 240, amp: 0.2, wave: 'sawtooth' }, { freq: 180, amp: 0.25, wave: 'sawtooth' }] },
  'ui.victory': { type: 'sequence', vol: 0.65, step: 0.1, notes: [{ freq: 523, amp: 0.15, wave: 'sine' }, { freq: 659, amp: 0.15, wave: 'sine' }, { freq: 784, amp: 0.15, wave: 'sine' }, { freq: 1046, amp: 0.2, wave: 'sine' }, { freq: 784, amp: 0.15, wave: 'sine' }, { freq: 1046, amp: 0.22, wave: 'sine' }] },
  'ui.notify': { type: 'click', duration: 0.06, vol: 0.4, freq: 1000, amp: 0.2 },
  'ui.countdown': { type: 'click', duration: 0.08, vol: 0.45, freq: 800, amp: 0.25 },
  'ui.go': { type: 'sequence', vol: 0.6, step: 0.05, notes: [{ freq: 800, amp: 0.2 }, { freq: 1200, amp: 0.25 }] },

  // -------------------------------------------------------------- pickups

  'pickup.health': { type: 'sequence', vol: 0.5, step: 0.05, notes: [{ freq: 520, amp: 0.12, wave: 'sine' }, { freq: 780, amp: 0.14, wave: 'sine' }] },
  'pickup.shield': { type: 'sequence', vol: 0.5, step: 0.05, notes: [{ freq: 440, amp: 0.12, wave: 'sine' }, { freq: 660, amp: 0.14, wave: 'sine' }] },
  'pickup.ammo': { type: 'click', duration: 0.06, vol: 0.4, freq: 1100, amp: 0.2 },
  'pickup.energy': { type: 'sequence', vol: 0.5, step: 0.04, notes: [{ freq: 600, amp: 0.1, wave: 'sine' }, { freq: 750, amp: 0.12, wave: 'sine' }, { freq: 900, amp: 0.14, wave: 'sine' }] },
  'pickup.core': { type: 'sequence', vol: 0.6, step: 0.06, notes: [{ freq: 400, amp: 0.15, wave: 'sine' }, { freq: 800, amp: 0.15, wave: 'sine' }, { freq: 1200, amp: 0.18, wave: 'sine' }] },

  // ---------------------------------------------------------------- misc

  'misc.teleport': { type: 'sweep', duration: 0.4, vol: 0.4, wave: 'sine', freq: 800, freqEnd: 200, amp: 0.2 },
  'misc.alarm': { type: 'sequence', vol: 0.4, step: 0.25, notes: [{ freq: 600, amp: 0.15, wave: 'square' }, { freq: 450, amp: 0.15, wave: 'square' }] },
};

/**
 * Convenience wrapper: play a named sound, optionally positional.
 */
export function playSfx(name, opts = {}) {
  const def = Sfx[name];
  if (!def) {
    if (window.__VOIDBREAK_DEBUG__) console.warn(`[sfx] unknown sound "${name}"`);
    return null;
  }
  return audio.play(def, opts);
}

export const Sounds = Sfx;
