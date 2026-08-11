/**
 * VOIDBREAK — Unlock helpers.
 *
 * Maps weapon ids to their unlock descriptions for the armory UI, and
 * provides the ordered weapon list.
 */

import { WEAPON_DEFS, WEAPON_BY_ID } from '../weapons/weapon_defs.js';

/** Human-readable unlock condition for a weapon. */
export function unlockInfo(weaponId) {
  const def = WEAPON_BY_ID.get(weaponId);
  if (!def) return null;
  if (def.unlockWave === 0) return { text: 'Starter weapon', unlocked: true };
  return { text: `Reach wave ${def.unlockWave}`, unlocked: false };
}

/** All weapons sorted by unlock wave. */
export function weaponProgression() {
  return WEAPON_DEFS.slice().sort((a, b) => a.unlockWave - b.unlockWave);
}

export { WEAPON_BY_ID };
