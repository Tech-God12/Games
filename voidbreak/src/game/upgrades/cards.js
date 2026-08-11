/**
 * VOIDBREAK — Upgrade cards.
 *
 * Draws 3 upgrade cards for the post-wave choice, weighted by rarity and
 * filtered by what's still stackable. Also provides the "reroll" mechanic.
 */

import { UPGRADE_DEFS, RARITY } from './upgrade_defs.js';
import { canTake } from './upgrade_db.js';

/** Draw `count` distinct, stackable upgrades. */
export function drawCards(ctx, count = 3, rng = Math.random) {
  const pool = UPGRADE_DEFS.filter((u) => canTake(ctx, u.id));
  if (pool.length === 0) return [];

  const rarityOrder = ['common', 'rare', 'epic', 'legendary'];
  const weights = rarityOrder.map((r) => RARITY[r].weight);
  const totalWeight = weights.reduce((a, b) => a + b, 0);

  const picked = [];
  const available = pool.slice();
  for (let i = 0; i < count && available.length > 0; i++) {
    let roll = rng() * totalWeight;
    let rarity = rarityOrder[0];
    for (let r = 0; r < rarityOrder.length; r++) {
      roll -= weights[r];
      if (roll <= 0) {
        rarity = rarityOrder[r];
        break;
      }
    }
    const candidates = available.filter((u) => u.rarity === rarity);
    if (candidates.length === 0) {
      const fallback = available[Math.floor(rng() * available.length)];
      picked.push(fallback);
      available.splice(available.indexOf(fallback), 1);
      continue;
    }
    const pick = candidates[Math.floor(rng() * candidates.length)];
    picked.push(pick);
    available.splice(available.indexOf(pick), 1);
  }
  return picked;
}

/** Reroll: replace the current card set once per wave (costs nothing in-run). */
export function reroll(ctx, rng = Math.random) {
  return drawCards(ctx, 3, rng);
}

/** Simple value string for a card (used by the UI). */
export function cardIcon(def) {
  switch (def.type) {
    case 'weapon': return '◈';
    case 'player': return '▲';
    case 'perk': return '★';
    default: return '◆';
  }
}

export { RARITY };
