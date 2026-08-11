// ============================================================================
// Ability.js — Active ability definitions: cooldown-gated actives triggered by
// hotkeys. Each ability has an activate(ctx) that applies its effect and
// returns true on success (starting the cooldown) or false to not consume it.
// ============================================================================

export function makeAbility(def) {
  return Object.freeze({
    id: def.id,
    name: def.name || def.id,
    description: def.description || '',
    cooldown: def.cooldown || 8,
    key: def.key || 'KeyQ',
    icon: def.icon || { shape: 'star', color: 0x29e7ff },
    rarity: def.rarity || 'rare',
    tags: def.tags || [],
    activate: def.activate || (() => false),
    aiHint: def.aiHint || null,
  });
}
