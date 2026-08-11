/**
 * VOIDBREAK — Upgrade application.
 *
 * Applies upgrade effects to the game state. Each upgrade id maps to an
 * apply function with access to the player, weapons, world and event bus.
 * Perk effects register hooks (onKill, onDamage, onDash...) via the game's
 * event bus.
 */

import { UPGRADE_DEFS, UPGRADE_BY_ID, RARITY } from './upgrade_defs.js';
import { playSfx } from '../../audio/sfx.js';

/**
 * Apply an upgrade to the run state.
 */
export function applyUpgrade(ctx, id) {
  const def = UPGRADE_BY_ID.get(id);
  if (!def) {
    console.warn(`[upgrades] unknown upgrade "${id}"`);
    return null;
  }
  const fn = UPGRADE_APPLY[id];
  if (!fn) {
    console.warn(`[upgrades] no application logic for "${id}"`);
    return def;
  }
  fn(ctx, def);
  ctx.game?.bus?.emit?.('upgrade.applied', { id, name: def.name, rarity: def.rarity });
  playSfx('ui.upgrade', { vol: 0.5 });
  return def;
}

/** Check whether an upgrade can still be taken (stack limits). */
export function canTake(ctx, id) {
  const def = UPGRADE_BY_ID.get(id);
  if (!def) return false;
  const maxStacks = RARITY[def.rarity].maxStacks;
  const owned = ctx.game?.upgradeCounts?.get?.(id) ?? 0;
  return owned < maxStacks;
}

const UPGRADE_APPLY = {
  dmg_1: (c) => { for (const w of c.player.weapons) w.modifiers.damageMult *= 1.18; },
  dmg_2: (c) => { for (const w of c.player.weapons) w.modifiers.damageMult *= 1.30; },
  dmg_3: (c) => { for (const w of c.player.weapons) w.modifiers.damageMult *= 1.45; },
  rof_1: (c) => { for (const w of c.player.weapons) w.modifiers.fireRateMult *= 1.15; },
  rof_2: (c) => { for (const w of c.player.weapons) w.modifiers.fireRateMult *= 1.25; },
  reload_1: (c) => { for (const w of c.player.weapons) w.modifiers.reloadMult *= 1.2; },
  reload_2: (c) => { for (const w of c.player.weapons) w.modifiers.reloadMult *= 1.35; },
  mag_1: (c) => {
    for (const w of c.player.weapons) {
      w.modifiers.magMult *= 1.25;
      w.magSize = Math.round(w.def.magSize * w.modifiers.magMult);
    }
  },
  mag_2: (c) => {
    for (const w of c.player.weapons) {
      w.modifiers.magMult *= 1.5;
      w.magSize = Math.round(w.def.magSize * w.modifiers.magMult);
    }
  },
  spread_1: (c) => { for (const w of c.player.weapons) w.modifiers.spreadMult *= 0.75; },
  spread_2: (c) => { for (const w of c.player.weapons) w.modifiers.spreadMult *= 0.6; },
  multishot_1: (c) => { for (const w of c.player.weapons) w.modifiers.pelletsAdd += 1; },
  multishot_2: (c) => { for (const w of c.player.weapons) w.modifiers.pelletsAdd += 2; },
  pierce_1: (c) => { for (const w of c.player.weapons) w.modifiers.pierceAdd += 1; },
  pierce_2: (c) => { for (const w of c.player.weapons) w.modifiers.pierceAdd += 2; },
  crit_1: (c) => { for (const w of c.player.weapons) w.modifiers.critChanceAdd += 0.08; },
  crit_2: (c) => { for (const w of c.player.weapons) w.modifiers.critChanceAdd += 0.15; },
  headhunter: (c) => { for (const w of c.player.weapons) w.headshotMult *= 1.5; },
  ammo_1: (c) => {
    for (const w of c.player.weapons) {
      if (w.infinite) continue;
      w.reserveMax = Math.round(w.def.reserveMax * 1.4);
      w.reserve = Math.min(w.reserveMax, w.reserve + Math.round(w.def.reserveMax * 0.4));
    }
  },
  ammo_regen: (c) => { c.game.flags.ammoRegen = true; },
  element_burn: (c) => { for (const w of c.player.weapons) w.modifiers.elementOverride = 'burn'; },
  element_shock: (c) => { for (const w of c.player.weapons) w.modifiers.elementOverride = 'shock'; },
  element_cryo: (c) => { for (const w of c.player.weapons) w.modifiers.elementOverride = 'cryo'; },
  explosion_1: (c) => { for (const w of c.player.weapons) w.modifiers.explosionRadiusMult *= 1.4; },
  explosion_2: (c) => { for (const w of c.player.weapons) w.modifiers.explosionRadiusMult *= 1.7; },
  sway_reduce: (c) => { for (const w of c.player.weapons) w.recoil.recovery *= 1.4; },
  lifesteal_1: (c) => { c.player.stats.lifesteal += 0.04; },
  lifesteal_2: (c) => { c.player.stats.lifesteal += 0.09; },

  hp_1: (c) => { const p = c.player; p.maxHealth += 25; p.health += 25; },
  hp_2: (c) => { const p = c.player; p.maxHealth += 50; p.health += 50; },
  hp_regen: (c) => { c.game.flags.healthRegen = true; c.game.healthRegenTimer = 6; },
  shield_1: (c) => { const p = c.player; p.maxShield += 25; p.shield += 25; },
  shield_2: (c) => { const p = c.player; p.maxShield += 50; p.shield += 50; },
  shield_regen: (c) => { c.player.shieldRegenRate *= 1.35; c.player.shieldRegenDelay = Math.max(1.5, c.player.shieldRegenDelay - 1); },
  speed_1: (c) => { c.player.stats.moveSpeedMult *= 1.1; },
  speed_2: (c) => { c.player.stats.moveSpeedMult *= 1.2; },
  jump_1: (c) => { c.player.stats.jumpMult *= 1.2; },
  jump_2: (c) => { c.player.stats.doubleJump = true; c.game.flags.doubleJump = true; },
  dash_1: (c) => { c.player.stats.dashCooldownMult *= 0.7; },
  dash_2: (c) => { c.player.stats.dashCooldownMult *= 0.5; c.player.stats.moveSpeedMult *= 1.1; },
  magnet_1: (c) => { c.player.stats.pickupRadius *= 1.8; },
  magnet_2: (c) => { c.player.stats.pickupRadius *= 2.4; },
  armor_1: (c) => { c.player.stats.damageReduction += 0.1; },
  armor_2: (c) => { c.player.stats.damageReduction += 0.2; },
  fortify: (c) => { c.player.stats.damageReduction += 0.3; const p = c.player; p.maxHealth += 25; p.health += 25; },
  thorns: (c) => { c.game.flags.thorns = 12; },
  second_wind: (c) => { c.game.flags.secondWind = true; },
  adrenaline: (c) => { c.game.flags.adrenaline = true; },
  scavenger: (c) => { c.game.loot?.setDropScale?.((c.game.loot.dropScale ?? 1) * 1.5); },

  drone_1: (c) => { c.game.spawnDrone(); },
  drone_2: (c) => { c.game.droneDamageMult *= 1.6; },
  drone_3: (c) => { c.game.spawnDrone(); },
  turret: (c) => { c.game.flags.turret = true; },
  mines: (c) => { c.game.flags.mines = true; },
  shockwave_kill: (c) => { c.game.flags.shockwaveKill = true; },
  heal_kill: (c) => { c.game.flags.healKill = 4; },
  score_combo: (c) => { c.game.combo?.extendTime?.(0.5); },
  combo_damage: (c) => { c.game.flags.comboDamage = true; },
  berserk: (c) => { c.game.flags.berserk = true; },
  frenzy: (c) => { c.game.flags.frenzy = true; },
  golden_eye: (c) => { c.game.flags.goldenEye = true; },
  time_scale: (c) => { c.game.flags.slowEnemies = true; },
  xray: (c) => { c.game.flags.vulnerable = true; },
  cloak: (c) => { c.game.flags.cloak = true; },
  ricochet: (c) => { c.game.flags.ricochet = true; },
  overcharge: (c) => { c.game.flags.overcharge = true; },
  electro_burst: (c) => { c.game.flags.electroBurst = true; },
  revenge: (c) => { c.game.flags.revenge = true; },
  conductor: (c) => { c.game.flags.conductor = true; },
  lucky: (c) => { c.player.stats.dodge = (c.player.stats.dodge ?? 0) + 0.1; },
  hunter: (c) => { c.game.flags.hunterMark = true; },
  sturdy: (c) => { c.game.flags.sturdy = true; },
  medic: (c) => { c.game.flags.medic = true; },
  shield_medic: (c) => { c.game.flags.shieldMedic = true; },
  adrenaline_dash: (c) => { c.game.flags.dashKill = true; },
  executioner_2: (c) => { c.game.flags.massExecute = true; },
};

export function getUpgrade(id) {
  return UPGRADE_BY_ID.get(id) ?? null;
}

export function getUpgradeDefs() {
  return UPGRADE_DEFS;
}

export { RARITY };
