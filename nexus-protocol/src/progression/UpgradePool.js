// ============================================================================
// UpgradePool.js
// Level-up upgrade definitions. Each upgrade has an id, name, description,
// icon hint, weight, maxRank, a `stat(rank)` returning the numeric deltas for
// the progression recompute, and an `apply()` hook for one-time effects. The
// pool is the heart of the roguelite build variety.
// ============================================================================

class UpgradePoolClass {
  constructor() { this._map = new Map(); this._order = []; }
  register(u) { this._map.set(u.id, u); this._order.push(u.id); return u; }
  registerMany(list) { for (const u of list) this.register(u); }
  get(id) { return this._map.get(id) || null; }
  all() { return Array.from(this._map.values()); }
  count() { return this._map.size; }
}
export const UpgradePool = new UpgradePoolClass();

const U = (id, name, desc, stat, opts = {}) => UpgradePool.register({
  id, name, description: desc, icon: opts.icon || 'star', rarity: opts.rarity || 'common',
  weight: opts.weight || 10, maxRank: opts.maxRank || 5, stat,
  apply: opts.apply || (() => {}), tags: opts.tags || [],
});

U('vitality', 'Vitality', '+25 max HP per rank', (r) => ({ maxHP: 25 * r }), { icon: 'heart', maxRank: 8 });
U('adamant', 'Adamant', '+2 armor per rank', (r) => ({ armor: 2 * r }), { icon: 'shield', maxRank: 6 });
U('bulwark', 'Bulwark', '+20 shield per rank', (r) => ({ shield: 20 * r }), { icon: 'shield', maxRank: 6 });
U('adrenaline', 'Adrenaline', '+8% move speed per rank', (r) => ({ moveMult: 1 + 0.08 * r }), { icon: 'boot', maxRank: 5 });
U('swift', 'Swift Strike', '+10% fire rate per rank', (r) => ({ fireRateMult: 1 + 0.10 * r }), { icon: 'lightning', maxRank: 5 });
U('overcharge', 'Overcharge', '+12% damage per rank', (r) => ({ damageMult: 1 + 0.12 * r }), { icon: 'sword', maxRank: 6 });
U('deadeye', 'Deadeye', '+5% crit chance per rank', (r) => ({ critChance: 0.05 * r }), { icon: 'target', maxRank: 6 });
U('lethality', 'Lethality', '+0.3 crit multiplier per rank', (r) => ({ critMult: 0.3 * r }), { icon: 'skull', maxRank: 6 });
U('vampiric', 'Vampiric', '+2% lifesteal on all damage per rank', (r) => ({ lifesteal: 0.02 * r }), { icon: 'drop', maxRank: 5 });
U('scavenger', 'Scavenger', '+15% currency per rank', (r) => ({ currencyMult: 1 + 0.15 * r }), { icon: 'coin', maxRank: 4 });
U('scholar', 'Scholar', '+12% XP per rank', (r) => ({ xpMult: 1 + 0.12 * r }), { icon: 'book', maxRank: 4 });
U('resilience', 'Resilience', '-4% damage taken per rank', (r) => ({ damageReduction: 0.04 * r }), { icon: 'shield', maxRank: 5 });
U('reflex', 'Reflex', '-10% dash cooldown per rank', (r) => ({ dashCDMult: 1 - 0.10 * r }), { icon: 'wind', maxRank: 4 });
U('regen', 'Regrowth', '+1.5 HP/sec regen per rank', (r) => ({ regen: 1.5 * r }), { icon: 'leaf', maxRank: 5 });
U('thorns', 'Thorns', 'Reflect 8 damage per rank when hit', (r) => ({ thorns: 8 * r }), { icon: 'cactus', maxRank: 5 });
U('knockback', 'Kinetic Force', '+20% knockback per rank', (r) => ({ knockbackMult: 1 + 0.20 * r }), { icon: 'fist', maxRank: 4 });
U('velocity', 'Velocity', '+12% projectile speed per rank', (r) => ({ projectileSpeedMult: 1 + 0.12 * r }), { icon: 'arrow', maxRank: 4 });
U('blast', 'Blast Radius', '+15% AoE per rank', (r) => ({ aoeMult: 1 + 0.15 * r }), { icon: 'blast', maxRank: 4 });
U('pierce', 'Piercing', '+1 pierce per rank', (r) => ({ pierce: 1 * r }), { icon: 'arrow', maxRank: 3 });
U('tight', 'Tight Grouping', '-15% spread per rank', (r) => ({ spreadMult: 1 - 0.15 * r }), { icon: 'target', maxRank: 4 });
U('speedload', 'Speedload', '-12% reload time per rank', (r) => ({ reloadMult: 1 - 0.12 * r }), { icon: 'clock', maxRank: 4 });
U('extended', 'Extended Mags', '+20% magazine size per rank', (r) => ({ magMult: 1 + 0.20 * r }), { icon: 'mag', maxRank: 4 });
U('status', 'Status Power', '+20% status power per rank', (r) => ({ statusPowerMult: 1 + 0.20 * r }), { icon: 'flame', maxRank: 4 });
U('contagion', 'Contagion', '+15% status chance per rank', (r) => ({ statusChanceMult: 1 + 0.15 * r }), { icon: 'virus', maxRank: 4 });
U('longshot', 'Longshot', '+12% range per rank', (r) => ({ rangeMult: 1 + 0.12 * r }), { icon: 'arrow', maxRank: 4 });
U('headhunter', 'Headhunter', '+0.3 headshot multiplier per rank', (r) => ({ headshotMult: 0.3 * r }), { icon: 'target', maxRank: 4 });
U('penetrator', 'Penetrator', '+3 armor penetration per rank', (r) => ({ armorPen: 3 * r }), { icon: 'arrow', maxRank: 4 });
U('giantkiller', 'Giantkiller', 'One-time: +50% damage vs elites/bosses', (r) => ({}), {
  icon: 'skull', maxRank: 1, weight: 6,
  apply: (prog) => { prog._giantkiller = (prog._giantkiller || 0) + 1; },
  stat: () => ({}),
});
U('berserker', 'Berserker', 'One-time: +25% damage when below 40% HP', (r) => ({}), {
  icon: 'fire', maxRank: 1, weight: 6, apply: (p) => { p._berserker = true; }, stat: () => ({}),
});
U('lastStand', 'Last Stand', 'One-time: survive a lethal hit at 1 HP once per wave', (r) => ({}), {
  icon: 'shield', maxRank: 1, weight: 5, apply: (p) => { p._lastStand = true; }, stat: () => ({}),
});
U('glasscannon', 'Glass Cannon', '+40% damage, -30% max HP', (r) => ({ damageMult: 1.4, maxHP: -30 }), {
  icon: 'sword', maxRank: 1, weight: 4,
});

export const UPGRADE_COUNT = UpgradePool.count();
