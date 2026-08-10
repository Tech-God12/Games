// ============================================================================
// perks4.js — More perks for deep build expression.
// ============================================================================

import { PerkRegistry } from '../PerkRegistry.js';

PerkRegistry.registerMany([
  { id: 'oneShot', name: 'One Shot', rarity: 'legendary', weight: 2, tags: ['offense', 'precision'],
    description: 'Headshots deal +100% damage and refund 5% ammo.', icon: { shape: 'target', color: 0xff3df0 }, stat: () => ({ headshotMult: 1.0 }), apply: (p) => { p._perkOneShot = true; } },
  { id: 'bloodRite', name: 'Blood Rite', rarity: 'epic', weight: 4, tags: ['sustain', 'offense'],
    description: '+8% lifesteal and +20% damage; -15 max HP.', icon: { shape: 'drop', color: 0xff3df0 }, stat: () => ({ lifesteal: 0.08, damageMult: 1.2, maxHP: -15 }) },
  { id: 'overGeared', name: 'Overgeared', rarity: 'epic', weight: 4, tags: ['defense'],
    description: '+50 max HP, +4 armor, +20 shield.', icon: { shape: 'shield', color: 0x4aa3ff }, stat: () => ({ maxHP: 50, armor: 4, shield: 20 }) },
  { id: 'triggerHappy', name: 'Trigger Happy', rarity: 'rare', weight: 6, tags: ['offense'],
    description: '+20% fire rate and +10% mag size.', icon: { shape: 'lightning', color: 0x29e7ff }, stat: () => ({ fireRateMult: 1.2, magMult: 1.1 }) },
  { id: 'longShot', name: 'Long Shot', rarity: 'rare', weight: 6, tags: ['offense', 'precision'],
    description: '+25% range and damage falls off less.', icon: { shape: 'arrow', color: 0x9fe7ff }, stat: () => ({ rangeMult: 1.25 }) },
  { id: 'pyromancer2', name: 'Pyromancer', rarity: 'epic', weight: 4, tags: ['offense', 'status'],
    description: '+50% burn power; burning enemies take +30% damage.', icon: { shape: 'flame', color: 0xff5522 }, stat: () => ({ statusPowerMult: 1.5 }), apply: (p) => { p._perkArsonist = true; } },
  { id: 'cryomancer2', name: 'Cryomancer', rarity: 'epic', weight: 4, tags: ['offense', 'status', 'control'],
    description: '+50% freeze power; frozen enemies take +30% damage.', icon: { shape: 'snow', color: 0x9fe7ff }, stat: () => ({ statusPowerMult: 1.5 }), apply: (p) => { p._perkCryo = true; } },
  { id: 'stormCaller2', name: 'Stormcaller', rarity: 'epic', weight: 4, tags: ['offense', 'status'],
    description: '+50% shock power; shocked enemies take +30% damage.', icon: { shape: 'bolt', color: 0xffe066 }, stat: () => ({ statusPowerMult: 1.5 }), apply: (p) => { p._perkShock = true; } },
  { id: 'munitionsExpert2', name: 'Munitions Expert', rarity: 'epic', weight: 4, tags: ['offense', 'aoe'],
    description: '+50% AoE and +30% explosive damage.', icon: { shape: 'blast', color: 0xff7733 }, stat: () => ({ aoeMult: 1.5 }), apply: (p) => { p._perkDemo = true; } },
  { id: 'gunKata', name: 'Gun Kata', rarity: 'legendary', weight: 2, tags: ['offense', 'mobility', 'special'],
    description: 'Kills during a dash deal +50% damage and extend dash.', icon: { shape: 'wind', color: 0x29e7ff }, stat: () => ({}), apply: (p) => { p._perkGunKata = true; } },
  { id: 'adrenal', name: 'Adrenal', rarity: 'rare', weight: 6, tags: ['mobility', 'offense'],
    description: '+15% move speed; kills reduce dash cooldown by 0.3s.', icon: { shape: 'boot', color: 0x4fffd0 }, stat: () => ({ moveMult: 1.15 }) },
  { id: 'executioner2', name: 'Finisher', rarity: 'epic', weight: 4, tags: ['offense', 'special'],
    description: 'Kills below 30% HP refund 8% ammo and grant +30% damage for 3s.', icon: { shape: 'skull', color: 0xff3df0 }, stat: () => ({}), apply: (p) => { p._perkExecutioner = true; } },
  { id: 'warden2', name: 'Warden', rarity: 'epic', weight: 4, tags: ['defense', 'special'],
    description: 'Standing still for 2s grants +8 armor and 25% damage reduction.', icon: { shape: 'shield', color: 0x29e7ff }, stat: () => ({}), apply: (p) => { p._perkWarden = true; } },
  { id: 'bladeDancer', name: 'Blade Dancer', rarity: 'legendary', weight: 2, tags: ['offense', 'melee', 'special'],
    description: 'Melee hits grant +20% move speed and dash resets on kill.', icon: { shape: 'blade', color: 0x29e7ff }, stat: () => ({}), apply: (p) => { p._perkBladeDancer = true; } },
  { id: 'apex', name: 'Apex', rarity: 'legendary', weight: 2, tags: ['offense', 'precision'],
    description: '+25% crit chance and +1.0 crit multiplier.', icon: { shape: 'star', color: 0xffb347 }, stat: () => ({ critChance: 0.25, critMult: 1.0 }) },
]);
