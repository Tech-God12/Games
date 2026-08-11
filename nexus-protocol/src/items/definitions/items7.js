// ============================================================================
// items7.js — Additional rare/epic items and more stackers for shop variety.
// ============================================================================

import { ItemRegistry } from '../ItemRegistry.js';
import { ItemRarity } from '../ItemRarity.js';

const I = (def) => ItemRegistry.register(def);

// Rare stackers
I({ id: 'powerCell', name: 'Power Cell', rarity: ItemRarity.Rare, maxStacks: 3, price: 200, weight: 7, tags: ['offense'], description: '+10% damage per stack', icon: { shape: 'cell', color: 0xff5544 }, stat: (s) => ({ damageMult: 1 + 0.1 * s }) });
I({ id: 'speedCell', name: 'Speed Cell', rarity: ItemRarity.Rare, maxStacks: 3, price: 200, weight: 7, tags: ['mobility'], description: '+8% move speed per stack', icon: { shape: 'cell', color: 0x4fffd0 }, stat: (s) => ({ moveMult: 1 + 0.08 * s }) });
I({ id: 'fireCell', name: 'Haste Cell', rarity: ItemRarity.Rare, maxStacks: 3, price: 200, weight: 7, tags: ['offense'], description: '+8% fire rate per stack', icon: { shape: 'cell', color: 0x29e7ff }, stat: (s) => ({ fireRateMult: 1 + 0.08 * s }) });
I({ id: 'armorCell', name: 'Armor Cell', rarity: ItemRarity.Rare, maxStacks: 3, price: 210, weight: 7, tags: ['defense'], description: '+3 armor per stack', icon: { shape: 'cell', color: 0x9fb3d6 }, stat: (s) => ({ armor: 3 * s }) });
I({ id: 'healthCell', name: 'Vital Cell', rarity: ItemRarity.Rare, maxStacks: 3, price: 210, weight: 7, tags: ['defense'], description: '+22 max HP per stack', icon: { shape: 'cell', color: 0x4fd07a }, stat: (s) => ({ maxHP: 22 * s }) });
I({ id: 'shieldCell', name: 'Ward Cell', rarity: ItemRarity.Rare, maxStacks: 3, price: 210, weight: 7, tags: ['defense'], description: '+18 shield per stack', icon: { shape: 'cell', color: 0x29e7ff }, stat: (s) => ({ shield: 18 * s }) });
I({ id: 'critCell', name: 'Focus Cell', rarity: ItemRarity.Rare, maxStacks: 3, price: 220, weight: 6, tags: ['offense', 'precision'], description: '+5% crit chance per stack', icon: { shape: 'cell', color: 0xffb347 }, stat: (s) => ({ critChance: 0.05 * s }) });
I({ id: 'leechCell', name: 'Leech Cell', rarity: ItemRarity.Rare, maxStacks: 3, price: 230, weight: 6, tags: ['sustain'], description: '+1.5% lifesteal per stack', icon: { shape: 'cell', color: 0xff3df0 }, stat: (s) => ({ lifesteal: 0.015 * s }) });
I({ id: 'regenCell', name: 'Renewal Cell', rarity: ItemRarity.Rare, maxStacks: 3, price: 220, weight: 6, tags: ['sustain'], description: '+1 HP/s regen per stack', icon: { shape: 'cell', color: 0x66ff88 }, stat: (s) => ({ regen: 1 * s }) });
I({ id: 'currencyCell', name: 'Greed Cell', rarity: ItemRarity.Rare, maxStacks: 3, price: 220, weight: 6, tags: ['economy'], description: '+15% currency per stack', icon: { shape: 'cell', color: 0xffb347 }, stat: (s) => ({ currencyMult: 1 + 0.15 * s }) });
I({ id: 'xpCell', name: 'Insight Cell', rarity: ItemRarity.Rare, maxStacks: 3, price: 220, weight: 6, tags: ['economy'], description: '+15% XP per stack', icon: { shape: 'cell', color: 0x9fe7ff }, stat: (s) => ({ xpMult: 1 + 0.15 * s }) });
I({ id: 'reloadCell', name: 'Speedload Cell', rarity: ItemRarity.Rare, maxStacks: 3, price: 210, weight: 7, tags: ['offense'], description: '-10% reload per stack', icon: { shape: 'cell', color: 0x9fe7ff }, stat: (s) => ({ reloadMult: 1 - 0.1 * s }) });
I({ id: 'magCell', name: 'Extended Cell', rarity: ItemRarity.Rare, maxStacks: 3, price: 210, weight: 7, tags: ['offense'], description: '+15% magazine per stack', icon: { shape: 'cell', color: 0xffaa44 }, stat: (s) => ({ magMult: 1 + 0.15 * s }) });
I({ id: 'pierceCell', name: 'Piercing Cell', rarity: ItemRarity.Rare, maxStacks: 2, price: 240, weight: 6, tags: ['offense'], description: '+1 pierce per stack', icon: { shape: 'cell', color: 0x4aa3ff }, stat: (s) => ({ pierce: s }) });
I({ id: 'aoeCell', name: 'Blast Cell', rarity: ItemRarity.Rare, maxStacks: 3, price: 220, weight: 6, tags: ['offense', 'aoe'], description: '+12% AoE per stack', icon: { shape: 'cell', color: 0xff7733 }, stat: (s) => ({ aoeMult: 1 + 0.12 * s }) });
I({ id: 'rangeCell', name: 'Longshot Cell', rarity: ItemRarity.Rare, maxStacks: 3, price: 220, weight: 6, tags: ['offense'], description: '+10% range per stack', icon: { shape: 'cell', color: 0x29e7ff }, stat: (s) => ({ rangeMult: 1 + 0.1 * s }) });
I({ id: 'projCell', name: 'Velocity Cell', rarity: ItemRarity.Rare, maxStacks: 3, price: 220, weight: 6, tags: ['offense'], description: '+10% projectile speed per stack', icon: { shape: 'cell', color: 0xff66aa }, stat: (s) => ({ projectileSpeedMult: 1 + 0.1 * s }) });
I({ id: 'spreadCell', name: 'Grip Cell', rarity: ItemRarity.Rare, maxStacks: 3, price: 220, weight: 6, tags: ['offense'], description: '-12% spread per stack', icon: { shape: 'cell', color: 0xffb347 }, stat: (s) => ({ spreadMult: 1 - 0.12 * s }) });
I({ id: 'statusCell', name: 'Catalyst Cell', rarity: ItemRarity.Rare, maxStacks: 3, price: 230, weight: 6, tags: ['offense', 'status'], description: '+15% status chance per stack', icon: { shape: 'cell', color: 0x66ff88 }, stat: (s) => ({ statusChanceMult: 1 + 0.15 * s }) });
I({ id: 'statusPowCell', name: 'Amplifier Cell', rarity: ItemRarity.Rare, maxStacks: 3, price: 230, weight: 6, tags: ['offense', 'status'], description: '+15% status power per stack', icon: { shape: 'cell', color: 0xff6633 }, stat: (s) => ({ statusPowerMult: 1 + 0.15 * s }) });
I({ id: 'thornsCell', name: 'Thorns Cell', rarity: ItemRarity.Rare, maxStacks: 3, price: 210, weight: 7, tags: ['defense'], description: '+5 thorns per stack', icon: { shape: 'cell', color: 0x4fd07a }, stat: (s) => ({ thorns: 5 * s }) });
I({ id: 'dashCell', name: 'Reflex Cell', rarity: ItemRarity.Rare, maxStacks: 3, price: 230, weight: 6, tags: ['mobility'], description: '-7% dash cooldown per stack', icon: { shape: 'cell', color: 0x9fe7ff }, stat: (s) => ({ dashCDMult: 1 - 0.07 * s }) });
I({ id: 'resilienceCell', name: 'Resilience Cell', rarity: ItemRarity.Rare, maxStacks: 3, price: 230, weight: 6, tags: ['defense'], description: '-4% damage taken per stack', icon: { shape: 'cell', color: 0x4aa3ff }, stat: (s) => ({ damageReduction: 0.04 * s }) });
I({ id: 'headshotCell', name: 'Headhunter Cell', rarity: ItemRarity.Rare, maxStacks: 3, price: 240, weight: 5, tags: ['offense', 'precision'], description: '+0.25 headshot mult per stack', icon: { shape: 'cell', color: 0xff3df0 }, stat: (s) => ({ headshotMult: 0.25 * s }) });
I({ id: 'armorPenCell', name: 'Penetrator Cell', rarity: ItemRarity.Rare, maxStacks: 3, price: 240, weight: 5, tags: ['offense'], description: '+3 armor pen per stack', icon: { shape: 'cell', color: 0xb266ff }, stat: (s) => ({ armorPen: 3 * s }) });
I({ id: 'knockbackCell', name: 'Kinetic Cell', rarity: ItemRarity.Rare, maxStacks: 3, price: 220, weight: 6, tags: ['offense'], description: '+12% knockback per stack', icon: { shape: 'cell', color: 0xffaa44 }, stat: (s) => ({ knockbackMult: 1 + 0.12 * s }) });

// Epic special
I({ id: 'overclockCell', name: 'Overclock Cell', rarity: ItemRarity.Epic, maxStacks: 1, price: 400, weight: 4, tags: ['offense', 'special'], description: '+30% fire rate, but +10% spread.', icon: { shape: 'cell', color: 0xff5544 }, stat: () => ({ fireRateMult: 1.3, spreadMult: 1.1 }) });
I({ id: 'berserkCell', name: 'Berserk Cell', rarity: ItemRarity.Epic, maxStacks: 1, price: 400, weight: 4, tags: ['offense', 'special'], description: '+50% damage below 40% HP.', icon: { shape: 'cell', color: 0xff5544 }, stat: () => ({}), onUpdate: null });
I({ id: 'vampCell', name: 'Vamp Cell', rarity: ItemRarity.Epic, maxStacks: 1, price: 400, weight: 4, tags: ['sustain', 'special'], description: '+6% lifesteal and +10% damage.', icon: { shape: 'cell', color: 0xff3df0 }, stat: () => ({ lifesteal: 0.06, damageMult: 1.1 }) });
I({ id: 'giantCell', name: 'Giant Cell', rarity: ItemRarity.Epic, maxStacks: 1, price: 420, weight: 4, tags: ['defense'], description: '+80 max HP, +5 armor, -15% move.', icon: { shape: 'cell', color: 0x4aa3ff }, stat: () => ({ maxHP: 80, armor: 5, moveMult: 0.85 }) });
I({ id: 'glassCell', name: 'Glass Cell', rarity: ItemRarity.Epic, maxStacks: 1, price: 400, weight: 4, tags: ['offense', 'curse'], description: '+50% damage, -30% max HP.', icon: { shape: 'cell', color: 0xff3df0 }, stat: () => ({ damageMult: 1.5, maxHP: -30 }) });

// Legendary capstones
I({ id: 'apexCell', name: 'Apex Cell', rarity: ItemRarity.Legendary, maxStacks: 1, price: 600, weight: 2, tags: ['offense', 'precision'], description: '+20% crit, +0.8 crit mult.', icon: { shape: 'cell', color: 0xffb347 }, stat: () => ({ critChance: 0.2, critMult: 0.8 }) });
I({ id: 'titanCell', name: 'Titan Cell', rarity: ItemRarity.Legendary, maxStacks: 1, price: 600, weight: 2, tags: ['defense'], description: '+120 max HP, +8 armor, +40 shield.', icon: { shape: 'cell', color: 0x4aa3ff }, stat: () => ({ maxHP: 120, armor: 8, shield: 40 }) });
I({ id: 'stormCell2', name: 'Storm Cell', rarity: ItemRarity.Legendary, maxStacks: 1, price: 600, weight: 2, tags: ['offense', 'status', 'special'], description: 'All hits shock; +50% shock power.', icon: { shape: 'cell', color: 0xffe066 }, stat: () => ({ statusPowerMult: 1.5, statusChanceMult: 1.5 }), onHit: null });
I({ id: 'infernoCell', name: 'Inferno Cell', rarity: ItemRarity.Legendary, maxStacks: 1, price: 600, weight: 2, tags: ['offense', 'status', 'special'], description: 'All hits burn; +50% burn power.', icon: { shape: 'cell', color: 0xff5522 }, stat: () => ({ statusPowerMult: 1.5, statusChanceMult: 1.5 }), onHit: null });
I({ id: 'absoluteCell', name: 'Absolute Cell', rarity: ItemRarity.Legendary, maxStacks: 1, price: 600, weight: 2, tags: ['offense', 'status', 'special'], description: 'All hits freeze; +50% freeze power.', icon: { shape: 'cell', color: 0x9fe7ff }, stat: () => ({ statusPowerMult: 1.5, statusChanceMult: 1.5 }), onHit: null });
