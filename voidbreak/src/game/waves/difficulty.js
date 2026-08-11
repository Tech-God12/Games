/**
 * VOIDBREAK — Difficulty curves (pure math).
 *
 * Wave → budget / composition / elite chance / boss schedule. All functions
 * are pure and unit-tested; the WaveDirector consumes them.
 */

import { clamp, clamp01 } from '../../core/math.js';

/** Total spawn budget (points) for a wave. */
export function waveBudget(wave, mode = 'endless') {
  const base = 26 + wave * 9 + Math.pow(wave, 1.6) * 1.6;
  switch (mode) {
    case 'blitz': return base * 1.45;
    case 'crucible': return base * 0.7;
    default: return base;
  }
}

/** Cost per archetype for budgeting. */
export const COSTS = {
  grunt: 1,
  runner: 1.3,
  shooter: 1.6,
  spitter: 1.7,
  drone: 2.2,
  brute: 5,
  shieldbearer: 2.6,
  summoner: 4,
  swarmling: 0.5,
};

/** Probability that a spawn is an elite at this wave. */
export function eliteChance(wave, mode = 'endless') {
  const base = clamp01((wave - 2) * 0.035 + 0.01);
  return mode === 'blitz' ? base * 1.3 : base;
}

/** Enemy health/damage/speed scaling by wave. */
export function enemyScaling(wave) {
  return {
    hp: 1 + (wave - 1) * 0.09 + Math.pow(Math.max(0, wave - 8), 1.5) * 0.05,
    damage: 1 + (wave - 1) * 0.055,
    speed: 1 + Math.min(0.35, (wave - 1) * 0.012),
    score: 1 + (wave - 1) * 0.08,
  };
}

/** Boss waves (every N waves). */
export function isBossWave(wave) {
  return wave % 5 === 0;
}

/** Which boss for a boss wave. */
export function bossForWave(wave) {
  return (wave / 5) % 2 === 1 ? 'boss_colossus' : 'boss_warden';
}

/** Intermission length (seconds) before a wave. */
export function intermissionTime(wave, mode = 'endless') {
  const base = wave === 1 ? 12 : 8;
  return mode === 'blitz' ? base * 0.6 : base;
}

/** Max alive enemies cap (spawner pauses when at cap). */
export function aliveCap(wave, mode = 'endless') {
  const base = 14 + Math.floor(wave * 1.6);
  return mode === 'blitz' ? base + 8 : base;
}

/** Respawn pacing: interval between spawns (seconds), by wave. */
export function spawnInterval(wave, mode = 'endless') {
  const base = clamp(1.35 - wave * 0.045, 0.42, 1.35);
  return mode === 'blitz' ? base * 0.65 : base;
}

/** Total waves for a mode (Infinity for endless). */
export function totalWaves(mode) {
  switch (mode) {
    case 'blitz': return 10;
    case 'crucible': return 15;
    case 'practice': return Infinity;
    default: return Infinity;
  }
}

/** Wave-clear reward (score). */
export function waveClearScore(wave) {
  return 250 + wave * 125;
}

/** Armor scaling for brutes+ by wave. */
export function armorBonus(wave) {
  return Math.floor(Math.max(0, wave - 4) * 1.5);
}
