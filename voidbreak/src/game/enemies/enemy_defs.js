/**
 * VOIDBREAK — Enemy definitions.
 *
 * All non-boss archetypes with their stats. Difficulty scaling is applied at
 * spawn time by the wave director; these are the base values. Bosses are
 * defined in bosses.js with their own defs.
 */

export const ENEMY_DEFS = [
  { id: 'grunt', name: 'Void Grunt', desc: 'Slow melee rusher. Swarms in groups.',
    health: 55, speed: 3.4, damage: 10, radius: 0.45, height: 1.55, attackStyle: 'melee', attackRange: 2.1, attackCooldown: 1.25,
    xpValue: 1, scoreValue: 100, visionRange: 30, headshot: true, lootTable: 'grunt', visual: 'grunt', dieElement: 'void', color: '#5a7a9a', glow: '#6ad8ff' },
  { id: 'runner', name: 'Void Runner', desc: 'Fast zig-zagging melee threat.',
    health: 35, speed: 6.2, damage: 8, radius: 0.38, height: 1.35, attackStyle: 'melee', attackRange: 1.9, attackCooldown: 0.9,
    xpValue: 1, scoreValue: 125, visionRange: 34, headshot: true, lootTable: 'runner', visual: 'runner', dieElement: 'void', color: '#8a4a6a', glow: '#ff6ad8' },
  { id: 'shooter', name: 'Void Shooter', desc: 'Ranged burst attacker that keeps its distance.',
    health: 45, speed: 2.6, damage: 7, radius: 0.45, height: 1.6, attackStyle: 'ranged', preferredRange: 14, strafeRange: 22, attackCooldown: 0.55,
    armor: 5, xpValue: 2, scoreValue: 175, visionRange: 40, headshot: true, aimSpread: 0.04, lootTable: 'shooter', visual: 'shooter', dieElement: 'void', color: '#7a5a3a', glow: '#ffb066' },
  { id: 'spitter', name: 'Void Spitter', desc: 'Lobs corrosive plasma arcs over cover.',
    health: 40, speed: 2.2, damage: 12, radius: 0.5, height: 1.4, attackStyle: 'ranged', preferredRange: 16, strafeRange: 26, attackCooldown: 2.2,
    element: 'plasma', splashRadius: 1.4, xpValue: 2, scoreValue: 200, visionRange: 36, headshot: true, lootTable: 'shooter', visual: 'spitter', dieElement: 'plasma', color: '#5a7a3a', glow: '#a8ff5a' },
  { id: 'brute', name: 'Void Brute', desc: 'Armored heavy with a devastating slam.',
    health: 240, speed: 2.2, damage: 24, radius: 0.85, height: 2.3, attackStyle: 'melee', attackRange: 3.2, attackCooldown: 2.0,
    armor: 30, special: 'slam', specialRange: 6, specialCooldown: 6, xpValue: 5, scoreValue: 500, visionRange: 26, headshot: true,
    lootTable: 'brute', visual: 'brute', dieElement: 'void', color: '#4a4a5a', glow: '#ff5d5d', modelScale: 1.25 },
  { id: 'shieldbearer', name: 'Void Shieldbearer', desc: 'Frontal shield blocks direct fire.',
    health: 90, speed: 2.8, damage: 14, radius: 0.55, height: 1.75, attackStyle: 'melee', attackRange: 2.4, attackCooldown: 1.4,
    armor: 15, xpValue: 3, scoreValue: 300, visionRange: 28, headshot: false, lootTable: 'shieldbearer', visual: 'shieldbearer', dieElement: 'void', color: '#5a5a7a', glow: '#6a9aff' },
  { id: 'drone', name: 'Void Drone', desc: 'Flying strafing unit with plasma bolts.',
    health: 60, speed: 4.0, damage: 8, radius: 0.5, height: 0.8, attackStyle: 'ranged', preferredRange: 12, strafeRange: 20, attackCooldown: 1.6,
    armor: 5, flying: true, hoverHeight: 2.6, xpValue: 3, scoreValue: 275, visionRange: 38, headshot: false, lootTable: 'drone', visual: 'drone', dieElement: 'energy', color: '#3a5a7a', glow: '#6ad8ff' },
  { id: 'swarmling', name: 'Void Swarmling', desc: 'Tiny, fragile, terrifying in numbers.',
    health: 14, speed: 5.4, damage: 4, radius: 0.3, height: 0.8, attackStyle: 'melee', attackRange: 1.4, attackCooldown: 1.0,
    xpValue: 0, scoreValue: 40, visionRange: 24, headshot: false, lootTable: null, visual: 'swarmling', dieElement: 'void', color: '#6a4a3a', glow: '#ffd166' },
  { id: 'summoner', name: 'Void Summoner', desc: 'Fragile caster that summons swarmlings.',
    health: 70, speed: 2.0, damage: 5, radius: 0.5, height: 1.8, attackStyle: 'ranged', preferredRange: 14, strafeRange: 22, attackCooldown: 3.0,
    special: 'summon', specialRange: 24, specialCooldown: 5.5, xpValue: 6, scoreValue: 600, visionRange: 40, headshot: true,
    lootTable: 'summoner', visual: 'summoner', dieElement: 'void', color: '#4a3a6a', glow: '#c07dff' },
  { id: 'elite_grunt', name: 'Elite Grunt', desc: 'A grunt warped by void energy. Faster, meaner, glowing.',
    health: 165, speed: 4.4, damage: 16, radius: 0.5, height: 1.7, attackStyle: 'melee', attackRange: 2.3, attackCooldown: 0.95,
    armor: 15, xpValue: 6, scoreValue: 800, visionRange: 34, headshot: true, lootTable: 'elite', visual: 'elite', dieElement: 'void', color: '#8a3a3a', glow: '#ff8a5a', modelScale: 1.15, elite: true },
  { id: 'elite_shooter', name: 'Elite Shooter', desc: 'A marksman corrupted by the breach. Rapid double-taps.',
    health: 130, speed: 3.2, damage: 12, radius: 0.5, height: 1.7, attackStyle: 'ranged', preferredRange: 15, strafeRange: 24, attackCooldown: 0.35,
    armor: 20, xpValue: 8, scoreValue: 1000, visionRange: 44, headshot: true, aimSpread: 0.025, lootTable: 'elite', visual: 'elite', dieElement: 'void', color: '#8a3a5a', glow: '#ff6ad8', modelScale: 1.1, elite: true },
];

export const ENEMY_BY_ID = new Map(ENEMY_DEFS.map((d) => [d.id, d]));

/** Which archetype ids can spawn at a given wave (for the wave builder). */
export function unlockableEnemies(wave) {
  const out = ['grunt'];
  if (wave >= 2) out.push('runner');
  if (wave >= 3) out.push('shooter');
  if (wave >= 4) out.push('spitter');
  if (wave >= 5) out.push('drone');
  if (wave >= 6) out.push('brute');
  if (wave >= 7) out.push('shieldbearer');
  if (wave >= 8) out.push('summoner');
  if (wave >= 9) out.push('swarmling');
  return out;
}

/** Elite pool by wave. */
export function elitePool(wave) {
  const out = [];
  if (wave >= 3) out.push('elite_grunt');
  if (wave >= 5) out.push('elite_shooter');
  return out;
}
