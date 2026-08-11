/**
 * VOIDBREAK — Damage model.
 *
 * Central damage pipeline: computes final damage from base damage, falloff,
 * crits, headshots, armor/shield interactions and element status effects.
 *
 * Elemental statuses (applied to enemies):
 *   burn   — damage over time
 *   shock  — brief stun + bonus vs shields
 *   cryo   — slow
 *   plasma — deals bonus to armor
 */

import { clamp01 } from '../../core/math.js';

export const ELEMENTS = Object.freeze({
  kinetic: 'kinetic',
  energy: 'energy',
  plasma: 'plasma',
  cryo: 'cryo',
  shock: 'shock',
  burn: 'burn',
  void: 'void',
});

export const ELEMENT_INFO = Object.freeze({
  kinetic: { color: '#e8d9b0', label: 'Kinetic' },
  energy: { color: '#6aa8ff', label: 'Energy' },
  plasma: { color: '#b26bff', label: 'Plasma' },
  cryo: { color: '#7df0ff', label: 'Cryo' },
  shock: { color: '#ffe14d', label: 'Shock' },
  burn: { color: '#ff7a3d', label: 'Thermal' },
  void: { color: '#c07dff', label: 'Void' },
});

/**
 * Compute final damage.
 */
export function computeDamage(shot, target = {}, opts = {}) {
  let dmg = shot.damage ?? 0;

  if (shot.falloffEnd && shot.falloffEnd > shot.falloffStart) {
    const t = clamp01((shot.range - shot.falloffStart) / (shot.falloffEnd - shot.falloffStart));
    dmg *= 1 - t * (shot.falloffFactor ?? 0.55);
  }

  const rng = opts.rng ?? Math.random;
  const crit = rng() < (shot.critChance ?? 0);
  const mult = shot.critMult ?? 1.6;
  if (crit) dmg *= mult;

  if (target.isHead) {
    dmg *= shot.headshotMult ?? 2.0;
  }

  const armor = target.armor ?? 0;
  if (armor > 0) {
    const ignore = shot.element === ELEMENTS.plasma ? 0.5 : shot.element === ELEMENTS.void ? 0.8 : 0;
    dmg *= 1 - (armor * (1 - ignore)) / 100;
  }

  const shield = target.shield ?? 0;
  if (shield > 0 && shot.element === ELEMENTS.shock) {
    dmg *= 1.5;
  }

  const difficulty = opts.difficulty ?? 1;
  dmg *= shot.isEnemyAttack ? difficulty : 1;

  return { amount: Math.max(0.5, dmg), crit, headshot: !!target.isHead };
}

/** Instantiate an elemental status effect. */
export function makeStatus(element, source) {
  const status = {
    element,
    source,
    ticks: 0,
    tickInterval: 0.5,
    tickTimer: 0,
    duration: 0,
    dps: 0,
    slowFactor: 0,
    stunTime: 0,
    stacks: 1,
  };
  switch (element) {
    case ELEMENTS.burn:
      status.duration = 2.5;
      status.dps = 6;
      status.tickInterval = 0.4;
      break;
    case ELEMENTS.shock:
      status.duration = 1.2;
      status.stunTime = 0.4;
      status.slowFactor = 0.35;
      break;
    case ELEMENTS.cryo:
      status.duration = 2.2;
      status.slowFactor = 0.45;
      break;
    default:
      break;
  }
  return status;
}

/** Status tick: returns damage to apply now (or 0). */
export function tickStatus(status, dt) {
  status.tickTimer += dt;
  let dmg = 0;
  if (status.tickTimer >= status.tickInterval && status.dps > 0) {
    status.tickTimer = 0;
    dmg = status.dps * status.tickInterval;
  }
  return dmg;
}

/** Color for damage numbers by element. */
export function elementColor(element, alpha = 1) {
  const info = ELEMENT_INFO[element] ?? ELEMENT_INFO.kinetic;
  const r = parseInt(info.color.slice(1, 3), 16) / 255;
  const g = parseInt(info.color.slice(3, 5), 16) / 255;
  const b = parseInt(info.color.slice(5, 7), 16) / 255;
  return [r, g, b, alpha];
}
