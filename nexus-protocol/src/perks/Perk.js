// ============================================================================
// Perk.js — Perk definitions: powerful one-time traits acquired through
// progression choices or shop. Each perk can contribute stat deltas via
// stat() and/or run a one-time apply() hook for special mechanics.
// ============================================================================

export function makePerk(def) {
  return Object.freeze({
    id: def.id,
    name: def.name || def.id,
    description: def.description || '',
    rarity: def.rarity || 'rare',
    icon: def.icon || { shape: 'star', color: 0xffb347 },
    weight: def.weight || 6,
    stat: def.stat || (() => ({})),
    apply: def.apply || (() => {}),
    tags: def.tags || [],
    flavor: def.flavor || '',
    condition: def.condition || null, // (save) => boolean for availability
  });
}
