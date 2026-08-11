// ============================================================================
// Item.js
// Item definitions: passive power-ups that stack and modify the player's stat
// block or react to gameplay events (onKill/onHit/onDamage/onUpdate). Items are
// acquired from the shop and rare drops. `stat(stacks)` returns the numeric
// deltas consumed by ProgressionManager.recompute().
// ============================================================================

import { ItemRarity, RARITY_COLOR_ITEM } from './ItemRarity.js';

export function makeItem(def) {
  return Object.freeze({
    id: def.id,
    name: def.name || def.id,
    description: def.description || '',
    rarity: def.rarity || ItemRarity.Common,
    maxStacks: def.maxStacks || 1,
    price: def.price || 0,
    icon: def.icon || { shape: 'gem', color: RARITY_COLOR_ITEM[def.rarity || ItemRarity.Common] },
    weight: def.weight || 10,
    stat: def.stat || (() => ({})),
    onKill: def.onKill || null,
    onHit: def.onHit || null,
    onDamage: def.onDamage || null,
    onUpdate: def.onUpdate || null,
    tags: def.tags || [],
    flavor: def.flavor || '',
  });
}
