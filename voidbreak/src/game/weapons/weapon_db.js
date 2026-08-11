/**
 * VOIDBREAK — Weapon factory.
 *
 * Builds Weapon instances from definitions, selecting the behavior class by
 * `kind`. Also provides the loadout/arsenal management used by the player.
 */

import { WEAPON_DEFS, WEAPON_BY_ID, STARTER_LOADOUT } from './weapon_defs.js';
import {
  HitscanWeapon, ProjectileWeapon, BeamWeapon, ChargeWeapon, GrenadeWeapon, MeleeWeapon,
} from './kinds.js';
import { Weapon } from './weapon.js';

const KIND_CLASS = {
  hitscan: HitscanWeapon,
  projectile: ProjectileWeapon,
  beam: BeamWeapon,
  charge: ChargeWeapon,
  grenade: GrenadeWeapon,
  melee: MeleeWeapon,
};

export function createWeapon(id, owner, opts = {}) {
  const def = WEAPON_BY_ID.get(id);
  if (!def) throw new Error(`Unknown weapon "${id}"`);
  const Cls = KIND_CLASS[def.kind] ?? Weapon;
  const weapon = new Cls(def, owner, opts);
  if (opts.ammoInMag !== undefined) weapon.ammoInMag = opts.ammoInMag;
  if (opts.reserve !== undefined) weapon.reserve = opts.reserve;
  if (opts.modifiers) Object.assign(weapon.modifiers, opts.modifiers);
  return weapon;
}

export function weaponExists(id) {
  return WEAPON_BY_ID.has(id);
}

export function getAllWeaponIds() {
  return WEAPON_DEFS.map((w) => w.id);
}

export function getStarterLoadout() {
  return STARTER_LOADOUT.slice();
}

export { WEAPON_DEFS, WEAPON_BY_ID };
