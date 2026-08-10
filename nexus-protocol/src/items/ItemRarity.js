// ============================================================================
// ItemRarity.js — rarity tiers and colors for items.
// ============================================================================

export const ItemRarity = Object.freeze({
  Common: 'common', Uncommon: 'uncommon', Rare: 'rare', Epic: 'epic', Legendary: 'legendary', Curse: 'curse',
});

export const RARITY_COLOR_ITEM = Object.freeze({
  common: 0x9fb3d6, uncommon: 0x4fd07a, rare: 0x4aa3ff, epic: 0xb266ff, legendary: 0xffb347, curse: 0xff3df0,
});

export const RARITY_WEIGHT_ITEM = Object.freeze({
  common: 100, uncommon: 55, rare: 22, epic: 8, legendary: 2, curse: 4,
});
