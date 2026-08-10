// ============================================================================
// perks3.js — Additional perks: deep-build enablers and capstone traits.
// ============================================================================

import { PerkRegistry } from '../PerkRegistry.js';

PerkRegistry.registerMany([
  { id: 'kineticist', name: 'Kineticist', rarity: 'epic', weight: 4, tags: ['offense', 'control'],
    description: 'Knockback increased +60% and slammed enemies take +20% damage.', icon: { shape: 'fist', color: 0xffaa44 }, stat: () => ({ knockbackMult: 1.6 }), apply: (p) => { p._perkKineticist = true; } },
  { id: 'ammoConservation', name: 'Conservation', rarity: 'rare', weight: 6, tags: ['offense'],
    description: '15% chance not to consume ammo per shot.', icon: { shape: 'mag', color: 0xffaa44 }, stat: () => ({}), apply: (p) => { p._perkConserve = 0.15; } },
  { id: 'overpenetrate', name: 'Overpenetrate', rarity: 'epic', weight: 4, tags: ['offense'],
    description: '+2 pierce and pierced enemies take +10% damage.', icon: { shape: 'arrow', color: 0x4aa3ff }, stat: () => ({ pierce: 2 }), apply: (p) => { p._perkOverpen = true; } },
  { id: 'secondWind', name: 'Second Wind', rarity: 'epic', weight: 4, tags: ['defense', 'sustain'],
    description: 'Below 20% HP, regen 4 HP/s and +20% move speed.', icon: { shape: 'leaf', color: 0x4fd07a }, stat: () => ({}), apply: (p) => { p._perkSecondWind = true; } },
  { id: 'criticalSurge', name: 'Critical Surge', rarity: 'legendary', weight: 2, tags: ['offense', 'precision'],
    description: 'Crits have a 30% chance to refund the shot and +0.5 crit mult.', icon: { shape: 'star', color: 0xffb347 }, stat: () => ({ critMult: 0.5 }), apply: (p) => { p._perkCritSurge = true; } },
  { id: 'bloodlust', name: 'Bloodlust', rarity: 'epic', weight: 4, tags: ['offense', 'sustain'],
    description: 'Kills heal 2% HP and grant +10% damage for 3s.', icon: { shape: 'drop', color: 0xff3df0 }, stat: () => ({}), apply: (p) => { p._perkBloodlust = true; } },
  { id: 'elementalist2', name: 'Elementalist', rarity: 'legendary', weight: 2, tags: ['offense', 'status'],
    description: 'All hits apply a random status; +50% status power.', icon: { shape: 'flame', color: 0xff6633 }, stat: () => ({ statusPowerMult: 1.5, statusChanceMult: 1.5 }), apply: (p) => { p._perkElementalist = true; } },
  { id: 'armorer', name: 'Armorer', rarity: 'rare', weight: 6, tags: ['defense'],
    description: '+6 armor and -10% damage taken.', icon: { shape: 'shield', color: 0x4aa3ff }, stat: () => ({ armor: 6, damageReduction: 0.1 }) },
  { id: 'fleetFooted', name: 'Fleet-Footed', rarity: 'rare', weight: 6, tags: ['mobility'],
    description: '+20% move speed and dash refunds 25% on kill.', icon: { shape: 'boot', color: 0x4fffd0 }, stat: () => ({ moveMult: 1.2 }) },
  { id: 'siege', name: 'Siege', rarity: 'epic', weight: 4, tags: ['offense', 'aoe'],
    description: '+50% AoE and +20% explosive damage.', icon: { shape: 'blast', color: 0xff7733 }, stat: () => ({ aoeMult: 1.5 }), apply: (p) => { p._perkDemo = true; } },
  { id: 'gunsmith', name: 'Gunsmith', rarity: 'rare', weight: 6, tags: ['offense'],
    description: '+25% magazine, -20% reload, +10% fire rate.', icon: { shape: 'wrench', color: 0x9fb3d6 }, stat: () => ({ magMult: 1.25, reloadMult: 0.8, fireRateMult: 1.1 }) },
  { id: 'warlock', name: 'Warlock', rarity: 'legendary', weight: 2, tags: ['special', 'sustain'],
    description: 'Kills have a 20% chance to spawn an allied drone for 10s.', icon: { shape: 'skull', color: 0xb266ff }, stat: () => ({}), apply: (p) => { p._perkNecromancer = true; } },
  { id: 'precisionist', name: 'Precisionist', rarity: 'epic', weight: 4, tags: ['offense', 'precision'],
    description: '+10% crit chance, +0.4 crit mult, -10% spread.', icon: { shape: 'target', color: 0xffb347 }, stat: () => ({ critChance: 0.1, critMult: 0.4, spreadMult: 0.9 }) },
  { id: 'juggernaut', name: 'Juggernaut', rarity: 'epic', weight: 4, tags: ['defense'],
    description: '+80 max HP, +6 armor, -15% move speed; CC duration halved.', icon: { shape: 'shield', color: 0x4aa3ff }, stat: () => ({ maxHP: 80, armor: 6, moveMult: 0.85 }), apply: (p) => { p._perkJuggernaut = true; } },
  { id: 'ember', name: 'Ember', rarity: 'rare', weight: 6, tags: ['offense', 'status'],
    description: '+25% burn chance and burning enemies take +20% damage.', icon: { shape: 'flame', color: 0xff5522 }, stat: () => ({ statusChanceMult: 1.25 }), apply: (p) => { p._perkArsonist = true; } },
  { id: 'glacial', name: 'Glacial', rarity: 'rare', weight: 6, tags: ['offense', 'status', 'control'],
    description: '+25% freeze chance and frozen enemies take +20% damage.', icon: { shape: 'snow', color: 0x9fe7ff }, stat: () => ({ statusChanceMult: 1.25 }), apply: (p) => { p._perkCryo = true; } },
]);
