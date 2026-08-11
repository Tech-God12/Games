// ============================================================================
// Pickups.js
// A large roster of additional pickup definitions: power-ups, temp buffs, and
// consumables that spawn in the arena and from drops. Extends the base
// PickupType set with themed variants and rarity-weighted spawn tables.
// ============================================================================

import { PickupType } from '../ecs/components/Gameplay.js';

/** Extended pickup definitions with metadata for the spawn tables and UI. */
export const PickupDefs = {
  // ---- Health variants ----
  healthSmall: { type: PickupType.Health, value: 15, weight: 30, color: 0x4fd07a, label: 'Small Health', minWave: 0 },
  healthMed: { type: PickupType.Health, value: 30, weight: 15, color: 0x4fd07a, label: 'Health', minWave: 0 },
  healthLarge: { type: PickupType.Health, value: 60, weight: 5, color: 0x66ff88, label: 'Large Health', minWave: 5 },
  healthFull: { type: PickupType.Health, value: 999, weight: 1, color: 0xff66aa, label: 'Full Heal', minWave: 10 },

  // ---- Shield variants ----
  shieldSmall: { type: PickupType.Shield, value: 20, weight: 20, color: 0x29e7ff, label: 'Small Shield', minWave: 3 },
  shieldMed: { type: PickupType.Shield, value: 50, weight: 8, color: 0x29e7ff, label: 'Shield', minWave: 3 },
  shieldLarge: { type: PickupType.Shield, value: 100, weight: 3, color: 0x4aa3ff, label: 'Large Shield', minWave: 8 },

  // ---- Currency variants ----
  currencySmall: { type: PickupType.Currency, value: 2, weight: 30, color: 0xffb347, label: 'Coins', minWave: 0 },
  currencyMed: { type: PickupType.Currency, value: 8, weight: 12, color: 0xffb347, label: 'Coins', minWave: 0 },
  currencyLarge: { type: PickupType.Currency, value: 25, weight: 4, color: 0xffd24a, label: 'Coin Cache', minWave: 5 },
  currencyHuge: { type: PickupType.Currency, value: 60, weight: 1, color: 0xffe066, label: 'Treasure', minWave: 10 },

  // ---- Ammo ----
  ammoSmall: { type: PickupType.Ammo, value: 30, weight: 18, color: 0x9fe7ff, label: 'Ammo', minWave: 0 },
  ammoMed: { type: PickupType.Ammo, value: 80, weight: 8, color: 0x9fe7ff, label: 'Ammo Cache', minWave: 0 },
  ammoFull: { type: PickupType.Ammo, value: 999, weight: 2, color: 0xbfe9ff, label: 'Full Ammo', minWave: 8 },

  // ---- Power-ups (rare) ----
  powerDamage: { type: PickupType.PowerDamage, value: 30, weight: 4, color: 0xff5544, label: 'Damage Boost', minWave: 3, duration: 15 },
  powerSpeed: { type: PickupType.PowerSpeed, value: 30, weight: 4, color: 0x4fffd0, label: 'Speed Boost', minWave: 3, duration: 15 },
  powerRapid: { type: PickupType.PowerRapid, value: 30, weight: 3, color: 0xffaa44, label: 'Rapid Fire', minWave: 4, duration: 12 },

  // ---- Screen-clear / utility (very rare) ----
  nuke: { type: PickupType.Nuke, value: 0, weight: 1, color: 0xff3df0, label: 'NUKE', minWave: 5 },
  freeze: { type: PickupType.Freeze, value: 0, weight: 2, color: 0x9fe7ff, label: 'FREEZE', minWave: 4 },
  magnet: { type: PickupType.Magnet, value: 0, weight: 2, color: 0xff3df0, label: 'MAGNET', minWave: 3 },
  bomb: { type: PickupType.Bomb, value: 0, weight: 1, color: 0xff7733, label: 'BOMB', minWave: 6 },

  // ---- Heart (max HP increase, extremely rare) ----
  heart: { type: PickupType.Heart, value: 10, weight: 1, color: 0xff5577, label: 'Max Heart', minWave: 8 },
  key: { type: PickupType.Key, value: 1, weight: 1, color: 0xffd24a, label: 'Key', minWave: 10 },
};

/** Weighted random pickup selection for ambient spawns, gated by wave. */
export function rollPickup(rng, wave) {
  const pool = Object.entries(PickupDefs).filter(([, d]) => d.minWave <= wave);
  if (pool.length === 0) return null;
  const weights = pool.map(([, d]) => d.weight);
  let total = 0; for (const w of weights) total += w;
  let r = rng.next() * total;
  for (let i = 0; i < pool.length; i++) { r -= weights[i]; if (r <= 0) return { id: pool[i][0], def: pool[i][1] }; }
  return { id: pool[pool.length - 1][0], def: pool[pool.length - 1][1] };
}

/** A cheap drop table for enemy kills (overrides ambient). */
export const KillDropTable = {
  common: [
    { type: PickupType.Currency, value: 2, chance: 0.9, color: 0xffb347 },
    { type: PickupType.Ammo, value: 30, chance: 0.08, color: 0x9fe7ff },
    { type: PickupType.Health, value: 15, chance: 0.04, color: 0x4fd07a },
  ],
  elite: [
    { type: PickupType.Currency, value: 10, chance: 1.0, color: 0xffb347 },
    { type: PickupType.Health, value: 40, chance: 0.6, color: 0x4fd07a },
    { type: PickupType.Ammo, value: 80, chance: 0.5, color: 0x9fe7ff },
    { type: PickupType.Shield, value: 30, chance: 0.3, color: 0x29e7ff },
    { type: PickupType.PowerDamage, value: 30, chance: 0.1, color: 0xff5544 },
  ],
  boss: [
    { type: PickupType.Currency, value: 50, chance: 1.0, color: 0xffd24a },
    { type: PickupType.Health, value: 999, chance: 1.0, color: 0xff66aa },
    { type: PickupType.Ammo, value: 999, chance: 1.0, color: 0xbfe9ff },
    { type: PickupType.Shield, value: 100, chance: 1.0, color: 0x4aa3ff },
    { type: PickupType.Heart, value: 10, chance: 0.5, color: 0xff5577 },
  ],
};

/** Roll a kill drop from a table. Returns a drop descriptor or null. */
export function rollKillDrop(rng, tier) {
  const table = KillDropTable[tier] || KillDropTable.common;
  const out = [];
  for (const d of table) if (rng.chance(d.chance)) out.push(d);
  return out.length ? out : null;
}

export const PickupDefCount = Object.keys(PickupDefs).length;
