// ============================================================================
// perks2.js — Additional perks: more build-defining traits and synergies.
// ============================================================================

import { PerkRegistry } from '../PerkRegistry.js';

PerkRegistry.registerMany([
  { id: 'gunslinger', name: 'Gunslinger', rarity: 'rare', weight: 6, tags: ['offense', 'precision'],
    description: '+15% crit chance and +0.5 crit multiplier with sidearms.', icon: { shape: 'target', color: 0xffb347 }, stat: () => ({ critChance: 0.15, critMult: 0.5 }) },
  { id: 'demolitionist', name: 'Demolitionist', rarity: 'epic', weight: 4, tags: ['offense', 'aoe'],
    description: '+40% AoE and explosives deal +25% damage.', icon: { shape: 'blast', color: 0xff7733 }, stat: () => ({ aoeMult: 1.4, damageMult: 1.0 }), apply: (p) => { p._perkDemo = true; } },
  { id: 'duelist', name: 'Duelist', rarity: 'rare', weight: 6, tags: ['offense'],
    description: '+20% damage to the nearest enemy; +10% move speed.', icon: { shape: 'sword', color: 0x29e7ff }, stat: () => ({ moveMult: 1.1 }) },
  { id: 'ironWill', name: 'Iron Will', rarity: 'epic', weight: 4, tags: ['defense'],
    description: 'Below 25% HP, take 50% less damage and regenerate 3 HP/s.', icon: { shape: 'shield', color: 0x4aa3ff }, stat: () => ({}), apply: (p) => { p._perkIronWill = true; } },
  { id: 'overclocker', name: 'Overclocker', rarity: 'epic', weight: 4, tags: ['offense'],
    description: '+25% fire rate, but +10% spread.', icon: { shape: 'chip', color: 0xff5544 }, stat: () => ({ fireRateMult: 1.25, spreadMult: 1.1 }) },
  { id: 'pathfinder', name: 'Pathfinder', rarity: 'rare', weight: 6, tags: ['mobility', 'economy'],
    description: '+15% move speed and +20% pickup magnet range.', icon: { shape: 'boot', color: 0x4fffd0 }, stat: () => ({ moveMult: 1.15 }) },
  { id: 'arsonist', name: 'Arsonist', rarity: 'epic', weight: 4, tags: ['offense', 'status'],
    description: 'Burning enemies take +40% damage; +30% burn chance.', icon: { shape: 'flame', color: 0xff5522 }, stat: () => ({ statusChanceMult: 1.3 }), apply: (p) => { p._perkArsonist = true; } },
  { id: 'cryologist', name: 'Cryologist', rarity: 'epic', weight: 4, tags: ['offense', 'status', 'control'],
    description: 'Frozen enemies take +40% damage; +30% freeze chance.', icon: { shape: 'snow', color: 0x9fe7ff }, stat: () => ({ statusChanceMult: 1.3 }), apply: (p) => { p._perkCryo = true; } },
  { id: 'electrostatic', name: 'Electrostatic', rarity: 'epic', weight: 4, tags: ['offense', 'status'],
    description: 'Shocked enemies take +40% damage; +30% shock chance.', icon: { shape: 'bolt', color: 0xffe066 }, stat: () => ({ statusChanceMult: 1.3 }), apply: (p) => { p._perkShock = true; } },
  { id: 'wildcard', name: 'Wildcard', rarity: 'legendary', weight: 2, tags: ['offense', 'special'],
    description: '+30% damage, +30% fire rate, +30% spread. Live dangerously.', icon: { shape: 'star', color: 0xff3df0 }, stat: () => ({ damageMult: 1.3, fireRateMult: 1.3, spreadMult: 1.3 }) },
  { id: 'momentum', name: 'Momentum', rarity: 'rare', weight: 6, tags: ['mobility', 'offense'],
    description: '+15% damage while moving; +10% move speed.', icon: { shape: 'wind', color: 0x9fe7ff }, stat: () => ({ moveMult: 1.1 }), apply: (p) => { p._perkMomentum = true; } },
  { id: 'lastBreath', name: 'Last Breath', rarity: 'epic', weight: 4, tags: ['offense', 'defense'],
    description: 'Below 20% HP, +60% fire rate and +30% damage.', icon: { shape: 'fire', color: 0xff5544 }, stat: () => ({}), apply: (p) => { p._perkLastBreath = true; } },
  { id: 'quartermaster', name: 'Quartermaster', rarity: 'rare', weight: 6, tags: ['economy', 'offense'],
    description: '+25% currency and +15% magazine size.', icon: { shape: 'coin', color: 0xffb347 }, stat: () => ({ currencyMult: 1.25, magMult: 1.15 }) },
  { id: 'surgical', name: 'Surgical', rarity: 'epic', weight: 4, tags: ['offense', 'precision'],
    description: '+0.5 headshot multiplier and headshots refill 2% ammo.', icon: { shape: 'target', color: 0xff3df0 }, stat: () => ({ headshotMult: 0.5 }), apply: (p) => { p._perkSurgical = true; } },
  { id: 'vanguard', name: 'Vanguard', rarity: 'rare', weight: 6, tags: ['defense', 'mobility'],
    description: '+30 shield and dashing refunds 20% of its cooldown on kill.', icon: { shape: 'shield', color: 0x29e7ff }, stat: () => ({ shield: 30 }) },
  { id: 'pyromancer', name: 'Pyromancer', rarity: 'legendary', weight: 2, tags: ['offense', 'status'],
    description: 'All hits ignite; +50% burn power.', icon: { shape: 'flame', color: 0xff5522 }, stat: () => ({ statusPowerMult: 1.5, statusChanceMult: 1.5 }), apply: (p) => { p._perkPyromancer = true; } },
]);
