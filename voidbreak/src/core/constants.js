/**
 * VOIDBREAK — global constants.
 *
 * Every tuning value that is truly global (units, timing, physics) lives
 * here. Per-system constants live next to their system; this file is for
 * cross-cutting values used in many modules.
 */

export const TAU = Math.PI * 2;
export const HALF_PI = Math.PI / 2;
export const DEG2RAD = Math.PI / 180;
export const RAD2DEG = 180 / Math.PI;
export const EPSILON = 1e-6;
export const EPSILON_SQ = 1e-12;
export const INFINITY = Number.POSITIVE_INFINITY;
export const NEG_INFINITY = Number.NEGATIVE_INFINITY;

/** Fixed simulation step (seconds). The simulation runs at 120 Hz. */
export const FIXED_STEP = 1 / 120;
/** Maximum accumulated simulation time per rendered frame (avoids spiral of death). */
export const MAX_FRAME_SIM = 8 * FIXED_STEP;
/** Maximum per-frame wall delta accepted (seconds). Above this we clamp. */
export const MAX_DELTA = 0.25;

/** Game world scale: one unit ≈ one meter. */
export const WORLD_SCALE = 1;

/** Base movement speeds (m/s). Player-tuned. */
export const PLAYER_WALK_SPEED = 4.2;
export const PLAYER_RUN_SPEED = 6.4;
export const PLAYER_CROUCH_SPEED = 2.2;
export const PLAYER_JUMP_SPEED = 7.4;
export const PLAYER_EYE_HEIGHT = 1.62;
export const PLAYER_CROUCH_EYE_HEIGHT = 0.95;
export const PLAYER_RADIUS = 0.36;
export const PLAYER_HEIGHT = 1.8;
export const GRAVITY = 22.0;

/** Render timing defaults. */
export const TARGET_FPS = 120;
export const DEFAULT_FOV = 88;
export const MIN_FOV = 60;
export const MAX_FOV = 110;

/** Canvas texture cache size guard. */
export const MAX_TEXTURE_CACHE = 256;
export const MAX_PARTICLES = 4096;
export const MAX_DECALS = 320;

/** Save data version — bump to invalidate old save files. */
export const SAVE_VERSION = 1;

/** Game title / branding. */
export const GAME_TITLE = 'VOIDBREAK';
export const GAME_SUBTITLE = 'SURVIVE THE BREACH';
export const GAME_VERSION = '1.0.0';

/** Colors used across UI (CSS-ready strings). */
export const UI = Object.freeze({
  accent: '#35f0ff',
  accent2: '#ff3d7f',
  warn: '#ffb000',
  danger: '#ff3b3b',
  ok: '#4dffa6',
  panel: 'rgba(8,12,20,0.82)',
  panelBorder: 'rgba(80,220,255,0.25)',
  text: '#e8f4ff',
  textDim: '#8fa6bf',
  gold: '#ffd166',
});

/** Post-processing quality presets. */
export const QUALITY = Object.freeze({
  low: Object.freeze({ label: 'Low', shadow: 0, shadowSize: 0, bloom: false, pixelRatio: 0.66, particleScale: 0.5, fxaa: false, fogQuality: 1 }),
  medium: Object.freeze({ label: 'Medium', shadow: 1, shadowSize: 1024, bloom: true, pixelRatio: 0.85, particleScale: 0.75, fxaa: false, fogQuality: 2 }),
  high: Object.freeze({ label: 'High', shadow: 1, shadowSize: 2048, bloom: true, pixelRatio: 1.0, particleScale: 1.0, fxaa: true, fogQuality: 3 }),
  ultra: Object.freeze({ label: 'Ultra', shadow: 1, shadowSize: 2048, bloom: true, pixelRatio: 1.5, particleScale: 1.25, fxaa: true, fogQuality: 3 }),
});

/** Default settings (deep-cloned into the settings store). */
export const DEFAULT_SETTINGS = Object.freeze({
  quality: 'high',
  fov: DEFAULT_FOV,
  sensitivity: 1.0,
  invertY: false,
  vsync: true,
  fpsCap: 240,
  volumeMaster: 0.85,
  volumeSfx: 1.0,
  volumeMusic: 0.6,
  volumeAmbience: 0.7,
  crosshairStyle: 'dynamic',
  crosshairColor: '#35f0ff',
  crosshairScale: 1.0,
  damageNumbers: true,
  hitmarker: true,
  screenShake: 1.0,
  headbob: 1.0,
  showFps: false,
  showMinimap: true,
  motionBlur: false,
  colorblind: 'none',
  language: 'en',
  showSubtitles: false,
  subtitles: true,
  weaponSway: 1.0,
  enemyDamageFlash: true,
  showKillfeed: true,
  gamepadRumble: true,
  zoomSensitivityScale: 0.6,
});

/** Difficulty presets selectable from the main menu. */
export const DIFFICULTIES = Object.freeze({
  rookie: Object.freeze({ label: 'ROOKIE', desc: 'Forgiving combat. 40% enemy health, slower waves, more drops.', hpScale: 0.55, damageScale: 0.6, speedScale: 0.9, waveBudgetScale: 0.8, eliteChanceScale: 0.4, dropScale: 1.5, healFreq: 0.5 }),
  operative: Object.freeze({ label: 'OPERATIVE', desc: 'The intended Voidbreak experience.', hpScale: 1.0, damageScale: 1.0, speedScale: 1.0, waveBudgetScale: 1.0, eliteChanceScale: 1.0, dropScale: 1.0, healFreq: 0.3 }),
  veteran: Object.freeze({ label: 'VETERAN', desc: 'Relentless pressure. Enemies are faster, tougher and hit harder.', hpScale: 1.45, damageScale: 1.35, speedScale: 1.1, waveBudgetScale: 1.2, eliteChanceScale: 1.6, dropScale: 0.75, healFreq: 0.2 }),
  nightmare: Object.freeze({ label: 'NIGHTMARE', desc: 'No mercy. Elite spam, brutal health, scarce supplies.', hpScale: 2.0, damageScale: 1.8, speedScale: 1.2, waveBudgetScale: 1.4, eliteChanceScale: 2.5, dropScale: 0.55, healFreq: 0.12 }),
});

/** Game modes. */
export const MODES = Object.freeze({
  endless: 'endless',
  blitz: 'blitz',
  crucible: 'crucible',
  practice: 'practice',
});
