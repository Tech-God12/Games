// ============================================================================
// items5.js — A large batch of additional passive items across all rarities,
// expanding shop variety and build expression further.
// ============================================================================

import { ItemRegistry } from '../ItemRegistry.js';
import { ItemRarity } from '../ItemRarity.js';

const I = (def) => ItemRegistry.register(def);

// Common stackers
I({ id: 'minorHealth', name: 'Minor Vital', rarity: ItemRarity.Common, maxStacks: 6, price: 60, weight: 14, tags: ['defense'], description: '+12 max HP per stack', icon: { shape: 'heart', color: 0x4fd07a }, stat: (s) => ({ maxHP: 12 * s }) });
I({ id: 'minorSpeed', name: 'Minor Swiftness', rarity: ItemRarity.Common, maxStacks: 6, price: 60, weight: 14, tags: ['mobility'], description: '+4% move speed per stack', icon: { shape: 'boot', color: 0x4fffd0 }, stat: (s) => ({ moveMult: 1 + 0.04 * s }) });
I({ id: 'minorDamage', name: 'Minor Power', rarity: ItemRarity.Common, maxStacks: 6, price: 60, weight: 14, tags: ['offense'], description: '+8% damage per stack', icon: { shape: 'gem', color: 0xff5544 }, stat: (s) => ({ damageMult: 1 + 0.08 * s }) });
I({ id: 'minorFire', name: 'Minor Haste', rarity: ItemRarity.Common, maxStacks: 6, price: 60, weight: 14, tags: ['offense'], description: '+5% fire rate per stack', icon: { shape: 'lightning', color: 0x29e7ff }, stat: (s) => ({ fireRateMult: 1 + 0.05 * s }) });
I({ id: 'minorArmor', name: 'Minor Plating', rarity: ItemRarity.Common, maxStacks: 6, price: 60, weight: 14, tags: ['defense'], description: '+1 armor per stack', icon: { shape: 'square', color: 0x9fb3d6 }, stat: (s) => ({ armor: 1 * s }) });
I({ id: 'minorCrit', name: 'Minor Focus', rarity: ItemRarity.Common, maxStacks: 6, price: 70, weight: 12, tags: ['offense'], description: '+3% crit chance per stack', icon: { shape: 'star', color: 0xffb347 }, stat: (s) => ({ critChance: 0.03 * s }) });
I({ id: 'minorLeech', name: 'Minor Leech', rarity: ItemRarity.Common, maxStacks: 4, price: 80, weight: 10, tags: ['sustain'], description: '+0.5% lifesteal per stack', icon: { shape: 'drop', color: 0xff3df0 }, stat: (s) => ({ lifesteal: 0.005 * s }) });
I({ id: 'minorRegen', name: 'Minor Renewal', rarity: ItemRarity.Common, maxStacks: 5, price: 70, weight: 12, tags: ['sustain'], description: '+0.5 HP/s regen per stack', icon: { shape: 'leaf', color: 0x66ff88 }, stat: (s) => ({ regen: 0.5 * s }) });
I({ id: 'minorShield', name: 'Minor Ward', rarity: ItemRarity.Common, maxStacks: 5, price: 70, weight: 12, tags: ['defense'], description: '+8 shield per stack', icon: { shape: 'shield', color: 0x29e7ff }, stat: (s) => ({ shield: 8 * s }) });
I({ id: 'minorCurrency', name: 'Minor Greed', rarity: ItemRarity.Common, maxStacks: 5, price: 70, weight: 12, tags: ['economy'], description: '+8% currency per stack', icon: { shape: 'coin', color: 0xffb347 }, stat: (s) => ({ currencyMult: 1 + 0.08 * s }) });

// Uncommon stackers
I({ id: 'majorHealth', name: 'Major Vital', rarity: ItemRarity.Uncommon, maxStacks: 4, price: 110, weight: 11, tags: ['defense'], description: '+25 max HP per stack', icon: { shape: 'heart', color: 0x4fd07a }, stat: (s) => ({ maxHP: 25 * s }) });
I({ id: 'majorSpeed', name: 'Major Swiftness', rarity: ItemRarity.Uncommon, maxStacks: 4, price: 110, weight: 11, tags: ['mobility'], description: '+8% move speed per stack', icon: { shape: 'boot', color: 0x4fffd0 }, stat: (s) => ({ moveMult: 1 + 0.08 * s }) });
I({ id: 'majorDamage', name: 'Major Power', rarity: ItemRarity.Uncommon, maxStacks: 4, price: 110, weight: 11, tags: ['offense'], description: '+15% damage per stack', icon: { shape: 'gem', color: 0xff5544 }, stat: (s) => ({ damageMult: 1 + 0.15 * s }) });
I({ id: 'majorFire', name: 'Major Haste', rarity: ItemRarity.Uncommon, maxStacks: 4, price: 110, weight: 11, tags: ['offense'], description: '+10% fire rate per stack', icon: { shape: 'lightning', color: 0x29e7ff }, stat: (s) => ({ fireRateMult: 1 + 0.1 * s }) });
I({ id: 'majorArmor', name: 'Major Plating', rarity: ItemRarity.Uncommon, maxStacks: 4, price: 110, weight: 11, tags: ['defense'], description: '+3 armor per stack', icon: { shape: 'square', color: 0x9fb3d6 }, stat: (s) => ({ armor: 3 * s }) });
I({ id: 'majorCrit', name: 'Major Focus', rarity: ItemRarity.Uncommon, maxStacks: 4, price: 120, weight: 10, tags: ['offense'], description: '+5% crit chance per stack', icon: { shape: 'star', color: 0xffb347 }, stat: (s) => ({ critChance: 0.05 * s }) });
I({ id: 'majorCritMult', name: 'Major Lethality', rarity: ItemRarity.Uncommon, maxStacks: 4, price: 120, weight: 10, tags: ['offense'], description: '+0.3 crit mult per stack', icon: { shape: 'skull', color: 0xff3df0 }, stat: (s) => ({ critMult: 0.3 * s }) });
I({ id: 'majorLeech', name: 'Major Leech', rarity: ItemRarity.Uncommon, maxStacks: 3, price: 130, weight: 9, tags: ['sustain'], description: '+2% lifesteal per stack', icon: { shape: 'drop', color: 0xff3df0 }, stat: (s) => ({ lifesteal: 0.02 * s }) });
I({ id: 'majorRegen', name: 'Major Renewal', rarity: ItemRarity.Uncommon, maxStacks: 4, price: 120, weight: 10, tags: ['sustain'], description: '+1.5 HP/s regen per stack', icon: { shape: 'leaf', color: 0x66ff88 }, stat: (s) => ({ regen: 1.5 * s }) });
I({ id: 'majorShield', name: 'Major Ward', rarity: ItemRarity.Uncommon, maxStacks: 4, price: 120, weight: 10, tags: ['defense'], description: '+25 shield per stack', icon: { shape: 'shield', color: 0x29e7ff }, stat: (s) => ({ shield: 25 * s }) });
I({ id: 'majorCurrency', name: 'Major Greed', rarity: ItemRarity.Uncommon, maxStacks: 3, price: 130, weight: 9, tags: ['economy'], description: '+18% currency per stack', icon: { shape: 'coin', color: 0xffb347 }, stat: (s) => ({ currencyMult: 1 + 0.18 * s }) });
I({ id: 'majorXp', name: 'Major Insight', rarity: ItemRarity.Uncommon, maxStacks: 3, price: 130, weight: 9, tags: ['economy'], description: '+18% XP per stack', icon: { shape: 'book', color: 0x9fe7ff }, stat: (s) => ({ xpMult: 1 + 0.18 * s }) });
I({ id: 'majorReload', name: 'Major Speedload', rarity: ItemRarity.Uncommon, maxStacks: 3, price: 120, weight: 10, tags: ['offense'], description: '-12% reload per stack', icon: { shape: 'clock', color: 0x9fe7ff }, stat: (s) => ({ reloadMult: 1 - 0.12 * s }) });
I({ id: 'majorMag', name: 'Major Extended', rarity: ItemRarity.Uncommon, maxStacks: 3, price: 120, weight: 10, tags: ['offense'], description: '+18% magazine per stack', icon: { shape: 'mag', color: 0xffaa44 }, stat: (s) => ({ magMult: 1 + 0.18 * s }) });
I({ id: 'majorPierce', name: 'Major Piercing', rarity: ItemRarity.Uncommon, maxStacks: 2, price: 140, weight: 8, tags: ['offense'], description: '+1 pierce per stack', icon: { shape: 'arrow', color: 0x4aa3ff }, stat: (s) => ({ pierce: s }) });
I({ id: 'majorAoe', name: 'Major Blast', rarity: ItemRarity.Uncommon, maxStacks: 3, price: 130, weight: 9, tags: ['offense'], description: '+12% AoE per stack', icon: { shape: 'blast', color: 0xff7733 }, stat: (s) => ({ aoeMult: 1 + 0.12 * s }) });
I({ id: 'majorRange', name: 'Major Longshot', rarity: ItemRarity.Uncommon, maxStacks: 3, price: 130, weight: 9, tags: ['offense'], description: '+10% range per stack', icon: { shape: 'scope', color: 0x29e7ff }, stat: (s) => ({ rangeMult: 1 + 0.1 * s }) });
I({ id: 'majorProj', name: 'Major Velocity', rarity: ItemRarity.Uncommon, maxStacks: 3, price: 130, weight: 9, tags: ['offense'], description: '+10% projectile speed per stack', icon: { shape: 'arrow', color: 0xff66aa }, stat: (s) => ({ projectileSpeedMult: 1 + 0.1 * s }) });
I({ id: 'majorSpread', name: 'Major Grip', rarity: ItemRarity.Uncommon, maxStacks: 3, price: 130, weight: 9, tags: ['offense'], description: '-12% spread per stack', icon: { shape: 'target', color: 0xffb347 }, stat: (s) => ({ spreadMult: 1 - 0.12 * s }) });
I({ id: 'majorStatus', name: 'Major Catalyst', rarity: ItemRarity.Uncommon, maxStacks: 3, price: 140, weight: 8, tags: ['offense', 'status'], description: '+15% status chance per stack', icon: { shape: 'vial', color: 0x66ff88 }, stat: (s) => ({ statusChanceMult: 1 + 0.15 * s }) });
I({ id: 'majorStatusPow', name: 'Major Amplifier', rarity: ItemRarity.Uncommon, maxStacks: 3, price: 140, weight: 8, tags: ['offense', 'status'], description: '+15% status power per stack', icon: { shape: 'flame', color: 0xff6633 }, stat: (s) => ({ statusPowerMult: 1 + 0.15 * s }) });
I({ id: 'majorThorns', name: 'Major Thorns', rarity: ItemRarity.Uncommon, maxStacks: 3, price: 120, weight: 10, tags: ['defense'], description: '+5 thorns per stack', icon: { shape: 'cactus', color: 0x4fd07a }, stat: (s) => ({ thorns: 5 * s }) });
I({ id: 'majorDash', name: 'Major Reflex', rarity: ItemRarity.Uncommon, maxStacks: 3, price: 140, weight: 8, tags: ['mobility'], description: '-8% dash cooldown per stack', icon: { shape: 'wind', color: 0x9fe7ff }, stat: (s) => ({ dashCDMult: 1 - 0.08 * s }) });
I({ id: 'majorResilience', name: 'Major Resilience', rarity: ItemRarity.Uncommon, maxStacks: 3, price: 140, weight: 8, tags: ['defense'], description: '-4% damage taken per stack', icon: { shape: 'shield', color: 0x4aa3ff }, stat: (s) => ({ damageReduction: 0.04 * s }) });
I({ id: 'majorHeadshot', name: 'Major Headhunter', rarity: ItemRarity.Uncommon, maxStacks: 3, price: 150, weight: 7, tags: ['offense', 'precision'], description: '+0.25 headshot mult per stack', icon: { shape: 'target', color: 0xff3df0 }, stat: (s) => ({ headshotMult: 0.25 * s }) });
I({ id: 'majorArmorPen', name: 'Major Penetrator', rarity: ItemRarity.Uncommon, maxStacks: 3, price: 150, weight: 7, tags: ['offense'], description: '+3 armor pen per stack', icon: { shape: 'arrow', color: 0xb266ff }, stat: (s) => ({ armorPen: 3 * s }) });
