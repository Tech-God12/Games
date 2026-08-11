// ============================================================================
// GameOptions.js
// A comprehensive runtime game-options system that extends the base settings
// with gameplay toggles, accessibility options, and quality-of-life features.
// Bound to the SaveManager settings and exposed to the settings UI. Keeps all
// tunable player preferences in one validated, typed place.
// ============================================================================

import { clamp } from './MathUtils.js';

export const OptionType = Object.freeze({ Toggle: 'toggle', Slider: 'slider', Select: 'select', Key: 'key' });

/** Master option definitions: id, label, type, default, min/max/step, choices. */
export const OptionDefs = [
  // ---- Graphics ----
  { id: 'quality', label: 'Quality', type: OptionType.Select, default: 'high', choices: ['low', 'medium', 'high', 'ultra'], category: 'graphics' },
  { id: 'bloom', label: 'Bloom Intensity', type: OptionType.Slider, default: 1.0, min: 0, max: 2, step: 0.05, category: 'graphics' },
  { id: 'fov', label: 'Field of View', type: OptionType.Slider, default: 75, min: 60, max: 100, step: 1, category: 'graphics' },
  { id: 'screenShake', label: 'Screen Shake', type: OptionType.Slider, default: 1.0, min: 0, max: 2, step: 0.05, category: 'graphics' },
  { id: 'damageNumbers', label: 'Damage Numbers', type: OptionType.Toggle, default: true, category: 'graphics' },
  { id: 'showFps', label: 'Show FPS', type: OptionType.Toggle, default: false, category: 'graphics' },
  { id: 'showMinimap', label: 'Show Minimap', type: OptionType.Toggle, default: true, category: 'graphics' },
  { id: 'showTooltips', label: 'Show Tooltips', type: OptionType.Toggle, default: true, category: 'graphics' },
  { id: 'vsync', label: 'VSync (limit FPS)', type: OptionType.Toggle, default: true, category: 'graphics' },
  { id: 'fpsLimit', label: 'FPS Limit', type: OptionType.Slider, default: 0, min: 0, max: 240, step: 5, category: 'graphics' },
  { id: 'reducedMotion', label: 'Reduced Motion', type: OptionType.Toggle, default: false, category: 'graphics' },
  { id: 'colorblind', label: 'Colorblind Filter', type: OptionType.Select, default: 'off', choices: ['off', 'protanopia', 'deuteranopia', 'tritanopia'], category: 'graphics' },

  // ---- Audio ----
  { id: 'masterVolume', label: 'Master Volume', type: OptionType.Slider, default: 0.9, min: 0, max: 1, step: 0.05, category: 'audio' },
  { id: 'sfxVolume', label: 'SFX Volume', type: OptionType.Slider, default: 0.9, min: 0, max: 1, step: 0.05, category: 'audio' },
  { id: 'musicVolume', label: 'Music Volume', type: OptionType.Slider, default: 0.55, min: 0, max: 1, step: 0.05, category: 'audio' },
  { id: 'muted', label: 'Mute All', type: OptionType.Toggle, default: false, category: 'audio' },
  { id: 'hitMarkerSound', label: 'Hit Marker Sound', type: OptionType.Toggle, default: true, category: 'audio' },
  { id: 'killSound', label: 'Kill Sound', type: OptionType.Toggle, default: true, category: 'audio' },
  { id: 'lowHpAlert', label: 'Low HP Alert', type: OptionType.Toggle, default: true, category: 'audio' },

  // ---- Controls ----
  { id: 'mouseSensitivity', label: 'Mouse Sensitivity', type: OptionType.Slider, default: 1.0, min: 0.2, max: 2.5, step: 0.05, category: 'controls' },
  { id: 'invertY', label: 'Invert Y', type: OptionType.Toggle, default: false, category: 'controls' },
  { id: 'autoLock', label: 'Auto Pointer Lock', type: OptionType.Toggle, default: true, category: 'controls' },
  { id: 'autoReload', label: 'Auto Reload When Dry', type: OptionType.Toggle, default: true, category: 'controls' },
  { id: 'autoPickup', label: 'Auto Pickup (walk over)', type: OptionType.Toggle, default: true, category: 'controls' },
  { id: 'gamepadEnabled', label: 'Gamepad Enabled', type: OptionType.Toggle, default: true, category: 'controls' },
  { id: 'gamepadDeadzone', label: 'Gamepad Deadzone', type: OptionType.Slider, default: 0.08, min: 0, max: 0.3, step: 0.01, category: 'controls' },

  // ---- Gameplay ----
  { id: 'difficulty', label: 'Difficulty', type: OptionType.Select, default: 'normal', choices: ['easy', 'normal', 'hard', 'nightmare', 'mythic'], category: 'gameplay' },
  { id: 'autoLevelUp', label: 'Auto-pause on Level Up', type: OptionType.Toggle, default: true, category: 'gameplay' },
  { id: 'showCombo', label: 'Show Combo Meter', type: OptionType.Toggle, default: true, category: 'gameplay' },
  { id: 'showObjectives', label: 'Show Wave Objectives', type: OptionType.Toggle, default: true, category: 'gameplay' },
  { id: 'showBossBar', label: 'Show Boss Bar', type: OptionType.Toggle, default: true, category: 'gameplay' },
  { id: 'autoShop', label: 'Open Shop Between Waves', type: OptionType.Toggle, default: false, category: 'gameplay' },
  { id: 'confirmQuit', label: 'Confirm Run Abort', type: OptionType.Toggle, default: true, category: 'gameplay' },
  { id: 'oneShotKill', label: 'Practice: One-Shot Kill', type: OptionType.Toggle, default: false, category: 'gameplay' },
  { id: 'godMode', label: 'Practice: God Mode', type: OptionType.Toggle, default: false, category: 'gameplay' },
  { id: 'startWave', label: 'Practice: Start Wave', type: OptionType.Slider, default: 1, min: 1, max: 50, step: 1, category: 'gameplay' },

  // ---- Accessibility ----
  { id: 'highContrast', label: 'High Contrast UI', type: OptionType.Toggle, default: false, category: 'accessibility' },
  { id: 'largeText', label: 'Large Text', type: OptionType.Toggle, default: false, category: 'accessibility' },
  { id: 'subtitleSfx', label: 'Subtitle SFX (captions)', type: OptionType.Toggle, default: false, category: 'accessibility' },
  { id: 'flashReduction', label: 'Flash Reduction', type: OptionType.Slider, default: 1.0, min: 0, max: 1, step: 0.1, category: 'accessibility' },
  { id: 'autoDash', label: 'Auto-Dash on Damage', type: OptionType.Toggle, default: false, category: 'accessibility' },
];

/** Default settings derived from OptionDefs. */
export function defaultOptions() {
  const out = {};
  for (const o of OptionDefs) out[o.id] = o.default;
  return out;
}

/** Validate and coerce a settings object against OptionDefs. */
export function validateOptions(settings) {
  const out = defaultOptions();
  if (!settings || typeof settings !== 'object') return out;
  for (const o of OptionDefs) {
    if (settings[o.id] === undefined) continue;
    let v = settings[o.id];
    if (o.type === OptionType.Slider) {
      v = parseFloat(v);
      if (isNaN(v)) v = o.default;
      v = clamp(v, o.min, o.max);
    } else if (o.type === OptionType.Select) {
      if (!o.choices.includes(v)) v = o.default;
    } else if (o.type === OptionType.Toggle) {
      v = !!v;
    }
    out[o.id] = v;
  }
  return out;
}

/** Group options by category for UI rendering. */
export function optionsByCategory() {
  const out = {};
  for (const o of OptionDefs) { (out[o.category] = out[o.category] || []).push(o); }
  return out;
}

export const OptionCategories = ['graphics', 'audio', 'controls', 'gameplay', 'accessibility'];
export const OptionCount = OptionDefs.length;

/**
 * Live option manager: reads/writes the save settings, validates on load, and
 * notifies listeners when an option changes so systems can react immediately.
 */
export class GameOptions {
  constructor(save) {
    this.save = save;
    this.settings = validateOptions(save.settings);
    Object.assign(save.settings, this.settings);
    this._listeners = new Map(); // id -> Set<fn>
  }
  get(id) { return this.settings[id]; }
  set(id, value) {
    const def = OptionDefs.find(o => o.id === id);
    if (!def) return;
    let v = value;
    if (def.type === OptionType.Slider) v = clamp(parseFloat(v), def.min, def.max);
    else if (def.type === OptionType.Select) { if (!def.choices.includes(v)) return; }
    else if (def.type === OptionType.Toggle) v = !!v;
    this.settings[id] = v;
    this.save.settings[id] = v;
    this.save.markDirty();
    this._emit(id, v);
  }
  on(id, fn) { let s = this._listeners.get(id); if (!s) { s = new Set(); this._listeners.set(id, s); } s.add(fn); return () => s.delete(fn); }
  _emit(id, v) { const s = this._listeners.get(id); if (s) for (const fn of s) try { fn(v); } catch (e) { console.error(e); } }
  reset() { this.settings = defaultOptions(); Object.assign(this.save.settings, this.settings); this.save.markDirty(); }
}
