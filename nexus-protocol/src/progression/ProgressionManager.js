// ============================================================================
// ProgressionManager.js
// Run-scoped progression: XP/level curve, currency, score, kill/time/boss
// counters, and the set of acquired upgrades/perks/items. Recomputes derived
// player stats (max HP, speed, etc.) and weapon mods whenever something
// changes, and bridges to meta-progression (unlocks) via SaveManager.
// ============================================================================

import { bus, Channels } from '../core/EventBus.js';
import { clamp, lerp } from '../core/MathUtils.js';
import { Health, Shield } from '../ecs/components/Vitals.js';
import { Kinematics } from '../ecs/components/Body.js';
import { UpgradePool } from './UpgradePool.js';

export class ProgressionManager {
  constructor(player, weaponController, save) {
    this.player = player;
    this.weapons = weaponController;
    this.save = save;
    this.reset();
  }

  reset() {
    this.xp = 0;
    this.level = 1;
    this.xpToNext = this._xpForLevel(1);
    this.currency = 0;
    this.score = 0;
    this.kills = 0;
    this.bossesKilled = 0;
    this.time = 0;
    this.wave = 0;
    this.upgrades = {};        // id -> rank
    this.perks = [];           // perk ids
    this.items = [];           // item ids
    this.stacks = {};          // item id -> count (for stacking items)
    this.pendingLevelUps = 0;
    this._baseMaxHP = 100;
    this._baseSpeed = 6;
    this._baseDamageMult = 1;
    this._baseFireRateMult = 1;
    this._baseCritChance = 0;
    this._baseCritMult = 0;
    this._baseMoveSpeedMult = 1;
    this._baseShield = 0;
    this._lifestealAll = 0;
    this._xpMult = 1;
    this._currencyMult = 1;
    this._damageReduction = 0;
    this._dashCooldownMult = 1;
    this._regen = 0;
    this._thorns = 0;
  }

  _xpForLevel(lv) { return Math.floor(8 + lv * 6 + lv * lv * 1.5); }

  addXP(n) {
    this.xp += Math.max(0, Math.floor(n * this._xpMult));
    bus.emit(Channels.XPGained, { xp: this.xp, total: this.xp, toNext: this.xpToNext });
    this._checkLevelUp();
  }

  _checkLevelUp() {
    while (this.xp >= this.xpToNext) {
      this.xp -= this.xpToNext;
      this.level++;
      this.xpToNext = this._xpForLevel(this.level);
      this.pendingLevelUps++;
      bus.emit(Channels.LevelUp, { level: this.level });
      bus.emit(Channels.PlaySFX, { name: 'levelup', volume: 0.6 });
    }
  }

  addCurrency(n) {
    this.currency += Math.max(0, Math.floor(n * this._currencyMult));
    bus.emit(Channels.CurrencyChanged, { total: this.currency });
  }
  spendCurrency(n) {
    if (this.currency < n) return false;
    this.currency -= n; bus.emit(Channels.CurrencyChanged, { total: this.currency }); return true;
  }

  addKill(value, isBoss = false) {
    this.kills++;
    if (isBoss) this.bossesKilled++;
    this.addXP(value || 1);
    this.score += (isBoss ? 500 : 10) + this.level * 2;
  }

  /** Apply an upgrade from the pool by id. */
  applyUpgrade(id) {
    const up = UpgradePool.get(id);
    if (!up) return false;
    const rank = (this.upgrades[id] || 0) + 1;
    if (up.maxRank && rank > up.maxRank) return false;
    this.upgrades[id] = rank;
    up.apply(this, rank);
    this.recompute();
    bus.emit(Channels.UpgradeChosen, { id, rank });
    return true;
  }

  addPerk(id) { if (!this.perks.includes(id)) this.perks.push(id); this.recompute(); bus.emit(Channels.PerkAcquired, { id }); }
  addItem(id) {
    this.items.push(id);
    this.stacks[id] = (this.stacks[id] || 0) + 1;
    this.recompute();
    bus.emit(Channels.ItemAcquired, { id, stacks: this.stacks[id] });
  }

  /** Recompute player stats & weapon mods from all upgrades/perks/items. */
  recompute() {
    // reset to base
    let maxHP = this._baseMaxHP, speedMult = this._baseMoveSpeedMult, damageMult = this._baseDamageMult;
    let fireRateMult = this._baseFireRateMult, critChanceAdd = this._baseCritChance, critMultAdd = this._baseCritMult;
    let shield = this._baseShield, lifesteal = this._lifestealAll, xpMult = this._xpMult, currencyMult = this._currencyMult;
    let damageReduction = this._damageReduction, dashCD = this._dashCooldownMult, regen = this._regen, thorns = this._thorns;
    let armor = 0, moveSpeedAdd = 0, knockbackMult = 1, projectileSpeedMult = 1, aoeMult = 1, pierceAdd = 0, spreadMult = 1, reloadMult = 1, magMult = 1, statusPowerMult = 1, statusChanceMult = 1, rangeMult = 1, headshotMultAdd = 0, armorPenAdd = 0;

    // re-apply upgrades (idempotent from base)
    for (const [id, rank] of Object.entries(this.upgrades)) {
      const up = UpgradePool.get(id);
      if (up && up.stat) {
        const r = up.stat(rank);
        maxHP += r.maxHP || 0; damageMult *= r.damageMult || 1; fireRateMult *= r.fireRateMult || 1;
        critChanceAdd += r.critChance || 0; critMultAdd += r.critMult || 0; speedMult *= r.moveMult || 1;
        shield += r.shield || 0; lifesteal += r.lifesteal || 0; xpMult *= r.xpMult || 1; currencyMult *= r.currencyMult || 1;
        damageReduction += r.damageReduction || 0; dashCD *= r.dashCDMult || 1; regen += r.regen || 0; thorns += r.thorns || 0;
        armor += r.armor || 0; moveSpeedAdd += r.moveSpeedAdd || 0; knockbackMult *= r.knockbackMult || 1;
        projectileSpeedMult *= r.projectileSpeedMult || 1; aoeMult *= r.aoeMult || 1; pierceAdd += r.pierce || 0;
        spreadMult *= r.spreadMult || 1; reloadMult *= r.reloadMult || 1; magMult *= r.magMult || 1;
        statusPowerMult *= r.statusPowerMult || 1; statusChanceMult *= r.statusChanceMult || 1;
        rangeMult *= r.rangeMult || 1; headshotMultAdd += r.headshotMult || 0; armorPenAdd += r.armorPen || 0;
      }
    }
    // apply items (stacking)
    const ItemRegistry = this._itemReg();
    for (const id of this.items) {
      const it = ItemRegistry ? ItemRegistry.get(id) : null;
      if (it && it.stat) {
        const s = this.stacks[id] || 1;
        const r = it.stat(s);
        maxHP += r.maxHP || 0; damageMult *= r.damageMult || 1; fireRateMult *= r.fireRateMult || 1;
        critChanceAdd += r.critChance || 0; critMultAdd += r.critMult || 0; speedMult *= r.moveMult || 1;
        shield += r.shield || 0; lifesteal += r.lifesteal || 0; xpMult *= r.xpMult || 1; currencyMult *= r.currencyMult || 1;
        damageReduction += r.damageReduction || 0; dashCD *= r.dashCDMult || 1; regen += r.regen || 0; thorns += r.thorns || 0;
        armor += r.armor || 0; moveSpeedAdd += r.moveSpeedAdd || 0; knockbackMult *= r.knockbackMult || 1;
        projectileSpeedMult *= r.projectileSpeedMult || 1; aoeMult *= r.aoeMult || 1; pierceAdd += r.pierce || 0;
        spreadMult *= r.spreadMult || 1; reloadMult *= r.reloadMult || 1; magMult *= r.magMult || 1;
        statusPowerMult *= r.statusPowerMult || 1; statusChanceMult *= r.statusChanceMult || 1;
        rangeMult *= r.rangeMult || 1; headshotMultAdd += r.headshotMult || 0; armorPenAdd += r.armorPen || 0;
      }
    }
    // apply perks
    const PerkRegistry = this._perkReg();
    for (const id of this.perks) {
      const pk = PerkRegistry ? PerkRegistry.get(id) : null;
      if (pk && pk.stat) {
        const r = pk.stat();
        maxHP += r.maxHP || 0; damageMult *= r.damageMult || 1; fireRateMult *= r.fireRateMult || 1;
        critChanceAdd += r.critChance || 0; critMultAdd += r.critMult || 0; speedMult *= r.moveMult || 1;
        shield += r.shield || 0; lifesteal += r.lifesteal || 0; xpMult *= r.xpMult || 1; currencyMult *= r.currencyMult || 1;
        damageReduction += r.damageReduction || 0; dashCD *= r.dashCDMult || 1; regen += r.regen || 0; thorns += r.thorns || 0;
        armor += r.armor || 0; moveSpeedAdd += r.moveSpeedAdd || 0; knockbackMult *= r.knockbackMult || 1;
        projectileSpeedMult *= r.projectileSpeedMult || 1; aoeMult *= r.aoeMult || 1; pierceAdd += r.pierce || 0;
        spreadMult *= r.spreadMult || 1; reloadMult *= r.reloadMult || 1; magMult *= r.magMult || 1;
        statusPowerMult *= r.statusPowerMult || 1; statusChanceMult *= r.statusChanceMult || 1;
        rangeMult *= r.rangeMult || 1; headshotMultAdd += r.headshotMult || 0; armorPenAdd += r.armorPen || 0;
      }
    }
    // character passive bonuses
    if (this.character) {
      const c = this.character;
      if (c.passive?.id === 'steady') { spreadMult *= 0.85; headshotMultAdd += 0.1; }
      if (c.passive?.id === 'eagle') { critMultAdd += 0.2; rangeMult *= 1.15; }
      if (c.passive?.id === 'bulwark') { armor += 4; }
      if (c.passive?.id === 'attunement') { statusPowerMult *= 1.3; }
      if (c.passive?.id === 'suppress') { fireRateMult *= 1.15; }
      if (c.passive?.id === 'tinker') { aoeMult *= 1.2; }
      if (c.passive?.id === 'rage') { /* dynamic, handled at damage time */ }
      if (c.passive?.id === 'phase') { /* dynamic, handled on dash */ }
    }
    // overdrive dynamic buff
    if (this.player?.meta?.overdrive && this.player.meta.overdrive > 0) {
      damageMult *= 1.8; fireRateMult *= 1.4;
    }
    // berserker/rage dynamic when low HP
    if (this.player) {
      const h = this.player.get(Health.type);
      if (h && h.alive) {
        const lowFrac = h.fraction < 0.4;
        const rageFrac = h.fraction < 0.5;
        if (lowFrac && (this._berserker || this.perks.includes('berserkerPerk'))) damageMult *= 1.5;
        if (rageFrac && (this._perkRage || this.character?.passive?.id === 'rage')) damageMult *= 1.25;
      }
    }
    // apply to player entity
    if (this.player) {
      const h = this.player.get(Health.type);
      if (h) {
        const ratio = h.current / h.max;
        h.max = maxHP; h.current = Math.min(maxHP, Math.max(h.current, maxHP * Math.max(ratio, 0.5)));
        h.armor = armor; h.regen = regen; h.damageMult = 1; // damageMult on health is for debuffs; reduction separate
        this._playerDamageReduction = clamp(damageReduction, 0, 0.8);
      }
      let sh = this.player.get(Shield.type);
      if (shield > 0) {
        if (!sh) { sh = new Shield(); this.player.add(sh); }
        sh.max = shield; sh.current = Math.min(shield, (sh.current > 0 ? sh.current : shield));
      } else if (sh) { sh.max = 0; sh.current = 0; }
      const kin = this.player.get(Kinematics.type);
      if (kin) {
        kin.maxSpeed = this._baseSpeed * speedMult + moveSpeedAdd;
        kin.dashCooldown = 0.9 * dashCD;
      }
      this.player.meta = this.player.meta || {};
      this.player.meta.thorns = thorns;
    }
    // weapon mods
    const mods = {
      damageMult, fireRateMult, reloadMult, magMult, spreadMult,
      critChanceAdd, critMultAdd, knockbackMult, projectileSpeedMult,
      statusPowerMult, statusChanceMult, lifestealAdd: lifesteal, armorPenAdd,
      rangeMult, aoeMult, pierceAdd, headshotMultAdd, ammoCostMult: 1,
    };
    this._mods = mods;
    if (this.weapons) this.weapons.recomputeMods(mods);
  }

  get mods() { return this._mods; }

  _itemReg() { return this._itemRegistry || null; }
  _perkReg() { return this._perkRegistry || null; }
  setRegistries({ items, perks }) { this._itemRegistry = items; this._perkRegistry = perks; }
  setCharacter(c) { this.character = c; if (c) { this._baseMaxHP = c.startMaxHP; this._baseSpeed = c.startSpeed; this._baseShield = c.startShield || 0; } }

  update(dt) { this.time += dt; }

  /** Generate upgrade choices for a level-up (3 distinct, respecting maxRank). */
  rollUpgrades(rng, count = 3) {
    const pool = UpgradePool.all().filter(u => {
      const rank = this.upgrades[u.id] || 0;
      return !u.maxRank || rank < u.maxRank;
    });
    // weight: rarer for stronger
    const chosen = [];
    const copy = pool.slice();
    for (let i = 0; i < count && copy.length; i++) {
      const weights = copy.map(u => u.weight || 10);
      let total = 0; for (const w of weights) total += w;
      let r = rng.next() * total;
      let idx = 0;
      for (; idx < copy.length; idx++) { r -= weights[idx]; if (r <= 0) break; }
      chosen.push(copy[idx]); copy.splice(idx, 1);
    }
    return chosen;
  }
}
