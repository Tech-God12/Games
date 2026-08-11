// ============================================================================
// Achievements.js
// Achievement definitions and a manager that checks unlock conditions during a
// run and persists unlocks via SaveManager. Includes a rich set of combat,
// survival, exploration, and mastery achievements with tiered progression.
// ============================================================================

import { bus, Channels } from '../core/EventBus.js';
import { clamp, formatNumber } from '../core/MathUtils.js';

class AchievementRegistryClass {
  constructor() { this._map = new Map(); this._order = []; }
  register(def) { this._map.set(def.id, def); this._order.push(def.id); return def; }
  registerMany(list) { for (const d of list) this.register(d); }
  get(id) { return this._map.get(id) || null; }
  all() { return Array.from(this._map.values()); }
  ids() { return this._order.slice(); }
  count() { return this._map.size; }
  /** Evaluate all achievements against a context; returns newly unlocked ids. */
  evaluate(ctx) {
    const newly = [];
    for (const a of this.all()) {
      if (ctx.save.achievements[a.id]) continue;
      let ok = false;
      try { ok = a.check(ctx); } catch (e) { ok = false; }
      if (ok) { ctx.save.addAchievement(a.id); newly.push(a.id); }
    }
    return newly;
  }
}
export const AchievementRegistry = new AchievementRegistryClass();

const A = (id, name, desc, check, opts = {}) => AchievementRegistry.register({
  id, name, description: desc, icon: opts.icon || '🏆', tier: opts.tier || 'bronze',
  reward: opts.reward || 0, check, hidden: !!opts.hidden,
});

// ---- Combat: kills ----
A('firstBlood', 'First Blood', 'Defeat your first enemy.', (c) => c.stats.totalKills >= 1);
A('centurion', 'Centurion', 'Defeat 100 enemies in total.', (c) => c.stats.totalKills >= 100);
A('slayer', 'Slayer', 'Defeat 1,000 enemies in total.', (c) => c.stats.totalKills >= 1000);
A('exterminator', 'Exterminator', 'Defeat 10,000 enemies in total.', (c) => c.stats.totalKills >= 10000, { tier: 'gold' });

// ---- Combat: bosses ----
A('firstBoss', 'Giant Killer', 'Defeat your first boss.', (c) => c.records.bossesKilled >= 1);
A('bossSlayer', 'Boss Slayer', 'Defeat 6 different bosses.', (c) => c.records.bossesKilled >= 6);
A('bossMaster', 'Boss Master', 'Defeat 20 bosses in total.', (c) => c.records.bossesKilled >= 20, { tier: 'gold' });

// ---- Survival: waves ----
A('wave5', 'Survivor', 'Reach wave 5.', (c) => c.records.bestWave >= 5);
A('wave10', 'Veteran', 'Reach wave 10.', (c) => c.records.bestWave >= 10);
A('wave20', 'Elite Operator', 'Reach wave 20.', (c) => c.records.bestWave >= 20, { tier: 'silver' });
A('wave30', 'Apex Survivor', 'Reach wave 30.', (c) => c.records.bestWave >= 30, { tier: 'gold' });
A('wave40', 'Mythic Survivor', 'Reach wave 40.', (c) => c.records.bestWave >= 40, { tier: 'gold' });
A('wave50', 'Legend', 'Reach wave 50.', (c) => c.records.bestWave >= 50, { tier: 'platinum', hidden: true });

// ---- Score ----
A('score10k', 'Score Hunter', 'Score 10,000 in a single run.', (c) => c.records.bestScore >= 10000);
A('score100k', 'High Roller', 'Score 100,000 in a single run.', (c) => c.records.bestScore >= 100000, { tier: 'silver' });
A('score1m', 'Millionaire', 'Score 1,000,000 in a single run.', (c) => c.records.bestScore >= 1000000, { tier: 'platinum', hidden: true });

// ---- Runs & time ----
A('firstRun', 'Initiation', 'Complete your first run.', (c) => c.records.totalRuns >= 1);
A('tenRuns', 'Dedicated', 'Complete 10 runs.', (c) => c.records.totalRuns >= 10);
A('fiftyRuns', 'Veteran Operator', 'Complete 50 runs.', (c) => c.records.totalRuns >= 50, { tier: 'silver' });
A('marathon', 'Marathoner', 'Survive a run lasting 10 minutes.', (c) => c.records.bestTime >= 600);

// ---- Currency / economy ----
A('hoarder', 'Hoarder', 'Accumulate 1,000 currency.', (c) => c.records.currency >= 1000);
A('tycoon', 'Tycoon', 'Accumulate 10,000 currency.', (c) => c.records.currency >= 10000, { tier: 'gold' });
A('magnate', 'Magnate', 'Accumulate 100,000 currency.', (c) => c.records.currency >= 100000, { tier: 'platinum', hidden: true });

// ---- Mastery: weapons (per-weapon kill counts) ----
A('pistolMaster', 'Sidearm Master', 'Defeat 250 enemies with the Sidearm.', (c) => (c.stats.weaponKills['pistol'] || 0) >= 250);
A('smgMaster', 'SMG Master', 'Defeat 250 enemies with an SMG.', (c) => (c.stats.weaponKills['smg'] || 0) + (c.stats.weaponKills['smg2'] || 0) >= 250);
A('shotgunMaster', 'Shotgun Master', 'Defeat 250 enemies with a shotgun.', (c) => (c.stats.weaponKills['shotgun'] || 0) + (c.stats.weaponKills['autoShotgun'] || 0) >= 250);
A('rifleMaster', 'Rifle Master', 'Defeat 250 enemies with a rifle.', (c) => (c.stats.weaponKills['rifle'] || 0) >= 250);
A('sniperMaster', 'Sniper Master', 'Defeat 250 enemies with a sniper.', (c) => (c.stats.weaponKills['sniper'] || 0) + (c.stats.weaponKills['marksman'] || 0) >= 250);
A('heavyMaster', 'Heavy Master', 'Defeat 250 enemies with heavy weapons.', (c) => (c.stats.weaponKills['rocket'] || 0) + (c.stats.weaponKills['minigun'] || 0) >= 250);
A('meleeMaster', 'Blade Master', 'Defeat 150 enemies with melee weapons.', (c) => (c.stats.weaponKills['blade'] || 0) + (c.stats.weaponKills['excalibur'] || 0) >= 150);
A('energyMaster', 'Energy Master', 'Defeat 250 enemies with energy weapons.', (c) => (c.stats.weaponKills['laser'] || 0) + (c.stats.weaponKills['plasma'] || 0) >= 250);

// ---- Special / hidden ----
A('pacifist', 'Pacifist?', 'Reach wave 10... somehow.', (c) => c.records.bestWave >= 10, { hidden: true });
A('untouchable', 'Untouchable', 'Clear a boss wave without taking damage.', (c) => c.ctx && c.ctx.bossNoDamage, { hidden: true });
A('combo50', 'Combo King', 'Reach a x50 kill combo.', (c) => c.ctx && c.ctx.maxCombo >= 50, { tier: 'gold' });
A('combo100', 'Combo God', 'Reach a x100 kill combo.', (c) => c.ctx && c.ctx.maxCombo >= 100, { tier: 'platinum', hidden: true });
A('overload', 'Overload', 'Own 10 items in a single run.', (c) => c.ctx && c.ctx.itemCount >= 10);
A('perkMaster', 'Perk Master', 'Acquire 5 perks in a single run.', (c) => c.ctx && c.ctx.perkCount >= 5);
A('arsenal', 'Arsenal', 'Fill all 4 weapon slots.', (c) => c.ctx && c.ctx.weaponSlots >= 4);
A('lowHP', 'Living on the Edge', 'Kill a boss while below 10% HP.', (c) => c.ctx && c.ctx.bossKillLowHP, { hidden: true });
A('speedrun', 'Speedrun', 'Reach wave 10 in under 5 minutes.', (c) => c.ctx && c.ctx.wave10Under5, { hidden: true });
A('collector', 'Collector', 'Unlock 20 weapons.', (c) => c.unlocks.weapons.length >= 20);
A('operative', 'Operative', 'Unlock 5 operatives.', (c) => c.unlocks.characters.length >= 5);
A('completionist', 'Completionist', 'Unlock all operatives.', (c) => c.unlocks.characters.length >= 16, { tier: 'platinum', hidden: true });

export const ACHIEVEMENT_COUNT = AchievementRegistry.count();

/**
 * Manager that periodically evaluates achievements during a run and emits
 * toast notifications for newly unlocked ones.
 */
export class AchievementManager {
  constructor(save) {
    this.save = save;
    this._timer = 0;
    this._interval = 1.0;
    this.ctx = { save, records: save.records, stats: save.stats, unlocks: save.unlocks, ctx: {} };
    this._unsub = bus.on('achievements.setContext', (ctx) => { Object.assign(this.ctx.ctx, ctx); });
  }
  setRunContext(obj) { this.ctx.ctx = { ...this.ctx.ctx, ...obj }; }
  update(dt) {
    this._timer += dt;
    if (this._timer >= this._interval) {
      this._timer = 0;
      this.check();
    }
  }
  check() {
    const newly = AchievementRegistry.evaluate(this.ctx);
    for (const id of newly) {
      const a = AchievementRegistry.get(id);
      bus.emit(Channels.Toast, { text: `🏆 ${a.name}`, color: '#ffd24a' });
      bus.emit(Channels.PlaySFX, { name: 'levelup', volume: 0.5 });
      bus.emit('achievement.unlocked', { id, achievement: a });
    }
  }
}
