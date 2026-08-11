/**
 * VOIDBREAK — Loot tables.
 *
 * Determines what enemies drop. Tables are weight lists of drop types:
 * health, shield, ammo, energy (score), cores (rare). Drop rate scales with
 * the difficulty's drop scale. Pure logic — unit tested.
 */

export const DROP_TYPES = Object.freeze({
  health: 'health',
  shield: 'shield',
  ammo: 'ammo',
  energy: 'energy',
  core: 'core',
});

export const LOOT_TABLES = {
  grunt: [[DROP_TYPES.health, 0.10], [DROP_TYPES.shield, 0.06], [DROP_TYPES.ammo, 0.12], [DROP_TYPES.energy, 0.20]],
  runner: [[DROP_TYPES.health, 0.08], [DROP_TYPES.shield, 0.05], [DROP_TYPES.ammo, 0.14], [DROP_TYPES.energy, 0.22]],
  shooter: [[DROP_TYPES.health, 0.10], [DROP_TYPES.shield, 0.08], [DROP_TYPES.ammo, 0.16], [DROP_TYPES.energy, 0.18]],
  brute: [[DROP_TYPES.health, 0.55], [DROP_TYPES.shield, 0.4], [DROP_TYPES.ammo, 0.5], [DROP_TYPES.energy, 0.7], [DROP_TYPES.core, 0.25]],
  shieldbearer: [[DROP_TYPES.health, 0.35], [DROP_TYPES.shield, 0.5], [DROP_TYPES.ammo, 0.4], [DROP_TYPES.energy, 0.5]],
  drone: [[DROP_TYPES.health, 0.15], [DROP_TYPES.shield, 0.2], [DROP_TYPES.ammo, 0.2], [DROP_TYPES.energy, 0.35]],
  summoner: [[DROP_TYPES.health, 0.3], [DROP_TYPES.shield, 0.25], [DROP_TYPES.ammo, 0.3], [DROP_TYPES.energy, 0.4], [DROP_TYPES.core, 0.2]],
  elite: [[DROP_TYPES.health, 0.5], [DROP_TYPES.shield, 0.45], [DROP_TYPES.ammo, 0.5], [DROP_TYPES.energy, 0.8], [DROP_TYPES.core, 0.35]],
  boss: [[DROP_TYPES.health, 1.0], [DROP_TYPES.shield, 1.0], [DROP_TYPES.ammo, 1.0], [DROP_TYPES.energy, 1.0], [DROP_TYPES.core, 1.0]],
};

/**
 * Roll drops for a kill.
 */
export function rollDrops(tableName, dropScale = 1, rng = Math.random) {
  const table = LOOT_TABLES[tableName];
  if (!table) return [];
  const out = [];
  for (const [type, weight] of table) {
    const p = weight * dropScale;
    if (rng() < Math.min(1, p)) {
      out.push(type);
    }
  }
  if (tableName === 'boss') {
    return [DROP_TYPES.health, DROP_TYPES.shield, DROP_TYPES.ammo, DROP_TYPES.core, DROP_TYPES.energy];
  }
  while (out.length > 4) out.splice(Math.floor(rng() * out.length), 1);
  return out;
}

/** How many energy pickups to spawn for a kill's energy drop. */
export function energyCount(xpValue) {
  return Math.min(4, Math.max(1, Math.round(xpValue * 1.2)));
}

export const DROP_INFO = {
  health: { label: 'Med Kit', color: '#4dffa6', size: 0.28 },
  shield: { label: 'Shield Cell', color: '#6aa8ff', size: 0.28 },
  ammo: { label: 'Ammo', color: '#ffd166', size: 0.24 },
  energy: { label: 'Void Energy', color: '#c07dff', size: 0.18 },
  core: { label: 'Data Core', color: '#ffe14d', size: 0.34 },
};
