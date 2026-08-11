// ============================================================================
// items9.js — A large batch of additional items to deepen the shop pool.
// ============================================================================

import { ItemRegistry } from '../ItemRegistry.js';
import { ItemRarity } from '../ItemRarity.js';

const I = (def) => ItemRegistry.register(def);

// Common
I({ id: 'copperCoin', name: 'Copper Coin', rarity: ItemRarity.Common, maxStacks: 6, price: 50, weight: 13, tags: ['economy'], description: '+5% currency per stack', icon: { shape: 'coin', color: 0xcc8844 }, stat: (s) => ({ currencyMult: 1 + 0.05 * s }) });
I({ id: 'copperPlate', name: 'Copper Plate', rarity: ItemRarity.Common, maxStacks: 6, price: 50, weight: 13, tags: ['defense'], description: '+1 armor per stack', icon: { shape: 'square', color: 0xcc8844 }, stat: (s) => ({ armor: 1 * s }) });
I({ id: 'copperCell', name: 'Copper Cell', rarity: ItemRarity.Common, maxStacks: 6, price: 55, weight: 12, tags: ['offense'], description: '+5% damage per stack', icon: { shape: 'cell', color: 0xcc8844 }, stat: (s) => ({ damageMult: 1 + 0.05 * s }) });
I({ id: 'tinHeart', name: 'Tin Heart', rarity: ItemRarity.Common, maxStacks: 6, price: 55, weight: 12, tags: ['defense'], description: '+8 max HP per stack', icon: { shape: 'heart', color: 0xaaaaaa }, stat: (s) => ({ maxHP: 8 * s }) });
I({ id: 'tinBoot', name: 'Tin Boot', rarity: ItemRarity.Common, maxStacks: 6, price: 55, weight: 12, tags: ['mobility'], description: '+3% move speed per stack', icon: { shape: 'boot', color: 0xaaaaaa }, stat: (s) => ({ moveMult: 1 + 0.03 * s }) });
I({ id: 'tinMag', name: 'Tin Mag', rarity: ItemRarity.Common, maxStacks: 6, price: 55, weight: 12, tags: ['offense'], description: '+8% magazine per stack', icon: { shape: 'mag', color: 0xaaaaaa }, stat: (s) => ({ magMult: 1 + 0.08 * s }) });
I({ id: 'tinScope', name: 'Tin Scope', rarity: ItemRarity.Common, maxStacks: 6, price: 60, weight: 11, tags: ['offense', 'precision'], description: '-4% spread per stack', icon: { shape: 'lens', color: 0xaaaaaa }, stat: (s) => ({ spreadMult: 1 - 0.04 * s }) });
I({ id: 'tinClock', name: 'Tin Clock', rarity: ItemRarity.Common, maxStacks: 6, price: 55, weight: 12, tags: ['offense'], description: '-4% reload per stack', icon: { shape: 'clock', color: 0xaaaaaa }, stat: (s) => ({ reloadMult: 1 - 0.04 * s }) });

// Uncommon
I({ id: 'silverCoin', name: 'Silver Coin', rarity: ItemRarity.Uncommon, maxStacks: 4, price: 110, weight: 11, tags: ['economy'], description: '+12% currency per stack', icon: { shape: 'coin', color: 0xcccccc }, stat: (s) => ({ currencyMult: 1 + 0.12 * s }) });
I({ id: 'silverPlate', name: 'Silver Plate', rarity: ItemRarity.Uncommon, maxStacks: 5, price: 110, weight: 11, tags: ['defense'], description: '+3 armor per stack', icon: { shape: 'square', color: 0xcccccc }, stat: (s) => ({ armor: 3 * s }) });
I({ id: 'silverCell', name: 'Silver Cell', rarity: ItemRarity.Uncommon, maxStacks: 4, price: 120, weight: 10, tags: ['offense'], description: '+12% damage per stack', icon: { shape: 'cell', color: 0xcccccc }, stat: (s) => ({ damageMult: 1 + 0.12 * s }) });
I({ id: 'silverHeart', name: 'Silver Heart', rarity: ItemRarity.Uncommon, maxStacks: 5, price: 110, weight: 11, tags: ['defense'], description: '+20 max HP per stack', icon: { shape: 'heart', color: 0xcccccc }, stat: (s) => ({ maxHP: 20 * s }) });
I({ id: 'silverBoot', name: 'Silver Boot', rarity: ItemRarity.Uncommon, maxStacks: 4, price: 110, weight: 11, tags: ['mobility'], description: '+7% move speed per stack', icon: { shape: 'boot', color: 0xcccccc }, stat: (s) => ({ moveMult: 1 + 0.07 * s }) });
I({ id: 'silverMag', name: 'Silver Mag', rarity: ItemRarity.Uncommon, maxStacks: 4, price: 110, weight: 11, tags: ['offense'], description: '+15% magazine per stack', icon: { shape: 'mag', color: 0xcccccc }, stat: (s) => ({ magMult: 1 + 0.15 * s }) });
I({ id: 'silverScope', name: 'Silver Scope', rarity: ItemRarity.Uncommon, maxStacks: 4, price: 120, weight: 10, tags: ['offense', 'precision'], description: '-10% spread per stack', icon: { shape: 'lens', color: 0xcccccc }, stat: (s) => ({ spreadMult: 1 - 0.1 * s }) });
I({ id: 'silverClock', name: 'Silver Clock', rarity: ItemRarity.Uncommon, maxStacks: 4, price: 110, weight: 11, tags: ['offense'], description: '-10% reload per stack', icon: { shape: 'clock', color: 0xcccccc }, stat: (s) => ({ reloadMult: 1 - 0.1 * s }) });
I({ id: 'silverStar', name: 'Silver Star', rarity: ItemRarity.Uncommon, maxStacks: 4, price: 120, weight: 10, tags: ['offense', 'precision'], description: '+4% crit chance per stack', icon: { shape: 'star', color: 0xcccccc }, stat: (s) => ({ critChance: 0.04 * s }) });
I({ id: 'silverDrop', name: 'Silver Drop', rarity: ItemRarity.Uncommon, maxStacks: 3, price: 130, weight: 9, tags: ['sustain'], description: '+1.5% lifesteal per stack', icon: { shape: 'drop', color: 0xcccccc }, stat: (s) => ({ lifesteal: 0.015 * s }) });
I({ id: 'silverLeaf', name: 'Silver Leaf', rarity: ItemRarity.Uncommon, maxStacks: 4, price: 120, weight: 10, tags: ['sustain'], description: '+1 HP/s regen per stack', icon: { shape: 'leaf', color: 0xcccccc }, stat: (s) => ({ regen: 1 * s }) });
I({ id: 'silverShield', name: 'Silver Shield', rarity: ItemRarity.Uncommon, maxStacks: 4, price: 120, weight: 10, tags: ['defense'], description: '+18 shield per stack', icon: { shape: 'shield', color: 0xcccccc }, stat: (s) => ({ shield: 18 * s }) });

// Rare
I({ id: 'goldCoin', name: 'Gold Coin', rarity: ItemRarity.Rare, maxStacks: 3, price: 220, weight: 7, tags: ['economy'], description: '+20% currency per stack', icon: { shape: 'coin', color: 0xffd24a }, stat: (s) => ({ currencyMult: 1 + 0.2 * s }) });
I({ id: 'goldPlate', name: 'Gold Plate', rarity: ItemRarity.Rare, maxStacks: 3, price: 220, weight: 7, tags: ['defense'], description: '+5 armor per stack', icon: { shape: 'square', color: 0xffd24a }, stat: (s) => ({ armor: 5 * s }) });
I({ id: 'goldCell', name: 'Gold Cell', rarity: ItemRarity.Rare, maxStacks: 3, price: 230, weight: 6, tags: ['offense'], description: '+18% damage per stack', icon: { shape: 'cell', color: 0xffd24a }, stat: (s) => ({ damageMult: 1 + 0.18 * s }) });
I({ id: 'goldHeart', name: 'Gold Heart', rarity: ItemRarity.Rare, maxStacks: 3, price: 220, weight: 7, tags: ['defense'], description: '+30 max HP per stack', icon: { shape: 'heart', color: 0xffd24a }, stat: (s) => ({ maxHP: 30 * s }) });
I({ id: 'goldBoot', name: 'Gold Boot', rarity: ItemRarity.Rare, maxStacks: 3, price: 220, weight: 7, tags: ['mobility'], description: '+10% move speed per stack', icon: { shape: 'boot', color: 0xffd24a }, stat: (s) => ({ moveMult: 1 + 0.1 * s }) });
I({ id: 'goldStar', name: 'Gold Star', rarity: ItemRarity.Rare, maxStacks: 3, price: 230, weight: 6, tags: ['offense', 'precision'], description: '+6% crit chance per stack', icon: { shape: 'star', color: 0xffd24a }, stat: (s) => ({ critChance: 0.06 * s }) });
I({ id: 'goldDrop', name: 'Gold Drop', rarity: ItemRarity.Rare, maxStacks: 2, price: 240, weight: 5, tags: ['sustain'], description: '+3% lifesteal per stack', icon: { shape: 'drop', color: 0xffd24a }, stat: (s) => ({ lifesteal: 0.03 * s }) });
I({ id: 'goldShield', name: 'Gold Shield', rarity: ItemRarity.Rare, maxStacks: 3, price: 230, weight: 6, tags: ['defense'], description: '+30 shield per stack', icon: { shape: 'shield', color: 0xffd24a }, stat: (s) => ({ shield: 30 * s }) });

// Epic event reactives
I({ id: 'executionersBlade', name: "Executioner's Blade", rarity: ItemRarity.Epic, maxStacks: 1, price: 400, weight: 4, tags: ['offense', 'special'], description: 'Kills below 40% HP deal +60% damage for 3s.', icon: { shape: 'axe', color: 0xff3df0 }, stat: () => ({}), onKill: null });
I({ id: 'vampiricBlade2', name: 'Vampiric Blade', rarity: ItemRarity.Epic, maxStacks: 1, price: 400, weight: 4, tags: ['offense', 'sustain', 'special'], description: 'Melee hits heal for 18% of damage.', icon: { shape: 'blade', color: 0xff3df0 }, stat: () => ({}), onHit: null });
I({ id: 'phasing2', name: 'Phasing', rarity: ItemRarity.Epic, maxStacks: 1, price: 400, weight: 4, tags: ['mobility', 'special'], description: 'Dashing grants 1.2s of invulnerability.', icon: { shape: 'ghost', color: 0x8a5bff }, stat: () => ({}), onUpdate: null });
I({ id: 'leechCircuit2', name: 'Leech Circuit', rarity: ItemRarity.Epic, maxStacks: 1, price: 400, weight: 4, tags: ['sustain', 'special'], description: 'Kills restore 4% HP.', icon: { shape: 'drop', color: 0xff3df0 }, stat: () => ({}), onKill: null });
I({ id: 'chainLight2', name: 'Chain Light', rarity: ItemRarity.Epic, maxStacks: 1, price: 400, weight: 4, tags: ['offense', 'special'], description: 'Hits chain to +2 nearby enemies for 50% damage.', icon: { shape: 'bolt', color: 0xffe066 }, stat: () => ({}), onHit: null });
I({ id: 'expansion2', name: 'Expansion', rarity: ItemRarity.Epic, maxStacks: 2, price: 400, weight: 4, tags: ['offense', 'aoe'], description: '+22% AoE per stack and explosions leave fire.', icon: { shape: 'blast', color: 0xff7733 }, stat: (s) => ({ aoeMult: 1 + 0.22 * s }) });
I({ id: 'coreTuner2', name: 'Core Tuner', rarity: ItemRarity.Epic, maxStacks: 2, price: 400, weight: 4, tags: ['offense'], description: '+12% damage and +6% fire rate per stack.', icon: { shape: 'chip', color: 0x29e7ff }, stat: (s) => ({ damageMult: 1 + 0.12 * s, fireRateMult: 1 + 0.06 * s }) });

// Legendary capstones
I({ id: 'giantBelt2', name: 'Giant Belt', rarity: ItemRarity.Legendary, maxStacks: 1, price: 600, weight: 2, tags: ['defense'], description: '+120 max HP and +8% move speed.', icon: { shape: 'shield', color: 0x4aa3ff }, stat: () => ({ maxHP: 120, moveMult: 1.08 }) });
I({ id: 'swiftArrow2', name: 'Swift Arrow', rarity: ItemRarity.Legendary, maxStacks: 1, price: 600, weight: 2, tags: ['offense'], description: '+15% projectile speed and +10% range.', icon: { shape: 'arrow', color: 0x4fffd0 }, stat: () => ({ projectileSpeedMult: 1.15, rangeMult: 1.1 }) });
I({ id: 'blastAmplifier2', name: 'Blast Amplifier', rarity: ItemRarity.Legendary, maxStacks: 1, price: 600, weight: 2, tags: ['offense', 'aoe'], description: '+40% AoE and +30% explosive damage.', icon: { shape: 'blast', color: 0xff7733 }, stat: () => ({ aoeMult: 1.4 }) });
I({ id: 'vitalSpark2', name: 'Vital Spark', rarity: ItemRarity.Legendary, maxStacks: 1, price: 600, weight: 2, tags: ['sustain'], description: 'Healing 50% more effective and regen +3 HP/s.', icon: { shape: 'spark', color: 0x4fd07a }, stat: () => ({ regen: 3 }) });
I({ id: 'criticalMass3', name: 'Critical Mass', rarity: ItemRarity.Legendary, maxStacks: 1, price: 600, weight: 2, tags: ['offense', 'precision'], description: '+20% crit chance; crits deal +80% and chain.', icon: { shape: 'star', color: 0xffb347 }, stat: () => ({ critChance: 0.2, critMult: 0.8 }) });
I({ id: 'soulHarvest4', name: 'Soul Harvest', rarity: ItemRarity.Legendary, maxStacks: 1, price: 620, weight: 2, tags: ['offense', 'sustain', 'special'], description: 'Kills grant +0.5% damage (caps +80%) and heal 1.5% HP.', icon: { shape: 'skull', color: 0xb266ff }, stat: () => ({}), onKill: null });
I({ id: 'echoChamber3', name: 'Echo Chamber', rarity: ItemRarity.Legendary, maxStacks: 1, price: 620, weight: 2, tags: ['offense', 'special'], description: 'Every 3rd shot fires twice.', icon: { shape: 'ring', color: 0x8a5bff }, stat: () => ({}), onUpdate: null });

// Curses
I({ id: 'cursedBlade3', name: 'Cursed Blade', rarity: ItemRarity.Curse, maxStacks: 1, price: 0, weight: 4, tags: ['offense', 'curse'], description: '+100% damage, but you take +70% damage.', icon: { shape: 'blade', color: 0xff3df0 }, stat: () => ({ damageMult: 2.0, damageReduction: -0.7 }) });
I({ id: 'fever3', name: 'Fever', rarity: ItemRarity.Curse, maxStacks: 1, price: 0, weight: 4, tags: ['offense', 'curse'], description: '+70% fire rate, but -3 HP/s.', icon: { shape: 'flame', color: 0xff3df0 }, stat: () => ({ fireRateMult: 1.7, regen: -3 }) });
I({ id: 'tunnel3', name: 'Tunnel Vision', rarity: ItemRarity.Curse, maxStacks: 1, price: 0, weight: 4, tags: ['offense', 'precision', 'curse'], description: '+50% crit chance, but -50% damage.', icon: { shape: 'target', color: 0xff3df0 }, stat: () => ({ critChance: 0.5, damageMult: 0.5 }) });
I({ id: 'bloodlustCurse3', name: 'Blood Curse', rarity: ItemRarity.Curse, maxStacks: 1, price: 0, weight: 4, tags: ['sustain', 'curse'], description: '+60% lifesteal, but max HP set to 30.', icon: { shape: 'drop', color: 0xff3df0 }, stat: () => ({ lifesteal: 0.6, maxHP: -70 }) });
