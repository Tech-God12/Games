// ============================================================================
// MetaSkillTree.js
// Persistent between-run skill tree purchased with meta currency. Nodes grant
// permanent bonuses applied at run start (extra starting HP, currency, XP,
// rerolls, etc.). Branches: Vitality, Offense, Economy, Utility, Arcana.
// Each node has ranks, prerequisites, and costs. Saved per-node rank.
// ============================================================================

const Branch = Object.freeze({ Vitality: 'vitality', Offense: 'offense', Economy: 'economy', Utility: 'utility', Arcana: 'arcana' });

class MetaSkillTreeClass {
  constructor() {
    this._nodes = new Map();
    this._order = [];
    this._registerDefaults();
  }
  register(def) { this._nodes.set(def.id, def); this._order.push(def.id); return def; }
  get(id) { return this._nodes.get(id) || null; }
  all() { return Array.from(this._nodes.values()); }
  byBranch(b) { return this.all().filter(n => n.branch === b); }
  count() { return this._nodes.size; }
  /** Cost for the next rank (rank is current rank). */
  cost(node, rank) { return Math.round((node.baseCost || 1) * Math.pow(node.costGrowth || 1.6, rank)); }
  /** Is a node purchasable given current ranks and prerequisites? */
  canPurchase(node, ranks, currency) {
    const cur = ranks[node.id] || 0;
    if (cur >= node.maxRank) return false;
    if (currency < this.cost(node, cur)) return false;
    if (node.requires) for (const r of node.requires) if ((ranks[r] || 0) < 1) return false;
    return true;
  }
  /** Apply all purchased nodes to a run-start context (stats + flags). */
  applyRunStart(ranks, ctx) {
    for (const [id, rank] of Object.entries(ranks)) {
      const node = this.get(id); if (!node || !node.apply) continue;
      node.apply(ctx, rank);
    }
  }
  _registerDefaults() {
    const R = (id, name, branch, desc, maxRank, baseCost, apply, requires, costGrowth = 1.6) => this.register({
      id, name, branch, description: desc, maxRank, baseCost, costGrowth, requires: requires || [], apply,
    });
    // ---- Vitality ----
    R('vit_health', 'Reinforced Plating', Branch.Vitality, '+10 starting HP per rank', 8, 1, (c, r) => { c.maxHP = (c.maxHP || 100) + 10 * r; });
    R('vit_regen', 'Cellular Repair', Branch.Vitality, '+0.5 HP/s starting regen per rank', 5, 2, (c, r) => { c.regen = (c.regen || 0) + 0.5 * r; }, ['vit_health']);
    R('vit_armor', 'Subdermal Armor', Branch.Vitality, '+1 starting armor per rank', 6, 2, (c, r) => { c.armor = (c.armor || 0) + 1 * r; });
    R('vit_shield', 'Energy Shielding', Branch.Vitality, '+10 starting shield per rank', 5, 2, (c, r) => { c.shield = (c.shield || 0) + 10 * r; }, ['vit_armor']);
    R('vit_revive', 'Phoenix Gene', Branch.Vitality, 'Revive once per run at 30% HP', 1, 8, (c, r) => { c.revive = (c.revive || 0) + r; }, ['vit_shield']);
    R('vit_regenDelay', 'Fast Recovery', Branch.Vitality, '-0.3s regen delay per rank', 4, 2, (c, r) => { c.regenDelay = (c.regenDelay || 4) - 0.3 * r; }, ['vit_regen']);
    // ---- Offense ----
    R('off_damage', 'Weapon Calibration', Branch.Offense, '+3% starting damage per rank', 8, 1, (c, r) => { c.damageMult = (c.damageMult || 1) * (1 + 0.03 * r); });
    R('off_firerate', 'Trigger Discipline', Branch.Offense, '+3% starting fire rate per rank', 6, 2, (c, r) => { c.fireRateMult = (c.fireRateMult || 1) * (1 + 0.03 * r); }, ['off_damage']);
    R('off_crit', 'Targeting AI', Branch.Offense, '+2% crit chance per rank', 6, 2, (c, r) => { c.critChance = (c.critChance || 0) + 0.02 * r; });
    R('off_critmult', 'Lethal Geometry', Branch.Offense, '+0.15 crit mult per rank', 5, 3, (c, r) => { c.critMult = (c.critMult || 0) + 0.15 * r; }, ['off_crit']);
    R('off_reload', 'Speedload Drills', Branch.Offense, '-4% reload time per rank', 5, 2, (c, r) => { c.reloadMult = (c.reloadMult || 1) * (1 - 0.04 * r); }, ['off_firerate']);
    R('off_headshot', 'Marksman Training', Branch.Offense, '+0.2 headshot mult per rank', 4, 3, (c, r) => { c.headshotMult = (c.headshotMult || 0) + 0.2 * r; }, ['off_crit']);
    R('off_lifesteal', 'Parasitic Rounds', Branch.Offense, '+1% lifesteal per rank', 4, 4, (c, r) => { c.lifesteal = (c.lifesteal || 0) + 0.01 * r; }, ['off_damage']);
    // ---- Economy ----
    R('eco_currency', 'Scavenger Instinct', Branch.Economy, '+10% currency per rank', 6, 1, (c, r) => { c.currencyMult = (c.currencyMult || 1) * (1 + 0.1 * r); });
    R('eco_xp', 'Combat Scholar', Branch.Economy, '+10% XP per rank', 6, 1, (c, r) => { c.xpMult = (c.xpMult || 1) * (1 + 0.1 * r); });
    R('eco_startcur', 'Stipend', Branch.Economy, '+20 starting currency per rank', 5, 2, (c, r) => { c.startCurrency = (c.startCurrency || 0) + 20 * r; }, ['eco_currency']);
    R('eco_shop', 'Quartermaster', Branch.Economy, '+1 shop offer per rank', 3, 4, (c, r) => { c.shopOffers = (c.shopOffers || 4) + r; }, ['eco_startcur']);
    R('eco_reroll', 'Merchant\'s Eye', Branch.Economy, '+1 shop reroll per rank', 3, 4, (c, r) => { c.shopRerolls = (c.shopRerolls || 0) + r; }, ['eco_shop']);
    // ---- Utility ----
    R('util_speed', 'Light Step', Branch.Utility, '+3% move speed per rank', 6, 1, (c, r) => { c.moveMult = (c.moveMult || 1) * (1 + 0.03 * r); });
    R('util_dash', 'Reflex Tuning', Branch.Utility, '-6% dash cooldown per rank', 5, 2, (c, r) => { c.dashCDMult = (c.dashCDMult || 1) * (1 - 0.06 * r); }, ['util_speed']);
    R('util_slots', 'Belt Expansion', Branch.Utility, '+1 weapon slot per rank (max 2)', 2, 8, (c, r) => { c.weaponSlots = (c.weaponSlots || 4) + r; });
    R('util_reroll2', 'Second Chance', Branch.Utility, '+1 upgrade reroll per rank', 3, 4, (c, r) => { c.upgradeRerolls = (c.upgradeRerolls || 0) + r; });
    R('util_magnet', 'Attraction Field', Branch.Utility, '+25% pickup magnet per rank', 4, 2, (c, r) => { c.magnetMult = (c.magnetMult || 1) * (1 + 0.25 * r); });
    // ---- Arcana ----
    R('arc_status', 'Elemental Attunement', Branch.Arcana, '+10% status power per rank', 6, 2, (c, r) => { c.statusPowerMult = (c.statusPowerMult || 1) * (1 + 0.1 * r); });
    R('arc_chance', 'Catalyst', Branch.Arcana, '+10% status chance per rank', 5, 2, (c, r) => { c.statusChanceMult = (c.statusChanceMult || 1) * (1 + 0.1 * r); }, ['arc_status']);
    R('arc_aoe', 'Blast Tuning', Branch.Arcana, '+10% AoE per rank', 5, 2, (c, r) => { c.aoeMult = (c.aoeMult || 1) * (1 + 0.1 * r); });
    R('arc_pierce', 'Penetration Field', Branch.Arcana, '+1 pierce per rank', 3, 5, (c, r) => { c.pierce = (c.pierce || 0) + r; }, ['arc_aoe']);
    R('arc_ability', 'Ability Capacitor', Branch.Arcana, '-8% ability cooldown per rank', 4, 4, (c, r) => { c.abilityCDMult = (c.abilityCDMult || 1) * (1 - 0.08 * r); }, ['arc_chance']);
    R('arc_overdrive', 'Overclock', Branch.Arcana, 'Overdrive lasts +1s per rank', 3, 6, (c, r) => { c.overdriveBonus = (c.overdriveBonus || 0) + r; }, ['arc_ability']);
  }
}

export const MetaSkillTree = new MetaSkillTreeClass();
export const MetaBranch = Branch;
export const META_NODE_COUNT = MetaSkillTree.count();
