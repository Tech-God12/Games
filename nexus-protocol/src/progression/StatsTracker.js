// ============================================================================
// StatsTracker.js
// Granular in-run and lifetime stat tracking: damage dealt/taken per type,
// kills per weapon/enemy, accuracy, headshots, crits, dashes, ability uses,
// pickups collected, hazards triggered, distance traveled, time in each
// biome, and per-wave breakdowns. Feeds the post-run summary and the codex
// records screen. Persisted via SaveManager.
// ============================================================================

import { bus, Channels } from '../core/EventBus.js';
import { clamp, formatNumber, formatTime } from '../core/MathUtils.js';

export class StatsTracker {
  constructor(save) {
    this.save = save;
    this.reset();
    this._unsub = [];
    this._wire();
  }

  reset() {
    this.run = {
      damageDealt: 0, damageTaken: 0, damageByType: {}, damageByWeapon: {},
      kills: 0, killsByWeapon: {}, killsByEnemy: {}, headshots: 0, crits: 0,
      shotsFired: 0, shotsHit: 0, dashes: 0, jumps: 0, abilityUses: 0, ultUses: 0,
      pickups: 0, pickupsByType: {}, currencyEarned: 0, xpEarned: 0,
      hazardsTriggered: 0, hazardKills: 0, distance: 0,
      timeInBiome: {}, wavesCleared: 0, bossesKilled: 0, elitesKilled: 0,
      maxCombo: 0, levelsGained: 0, itemsBought: 0, upgradesChosen: 0, perksGained: 0,
      timeAlive: 0, hpLost: 0, hpHealed: 0, shieldLost: 0,
      deaths: 0, revives: 0, timeStunned: 0, timeSlowed: 0,
    };
    this._lastPos = null;
  }

  _wire() {
    this._unsub.push(bus.on(Channels.WeaponFired, (e) => { this.run.shotsFired++; this._bump(this.run.damageByWeapon, e.weapon?.id); }));
    this._unsub.push(bus.on(Channels.EntityDamaged, (e) => { if (e.amount) this.run.damageDealt += e.amount; if (e.crit) this.run.crits++; if (e.headshot) this.run.headshots++; this.run.shotsHit++; }));
    this._unsub.push(bus.on(Channels.PlayerDamaged, (e) => { this.run.damageTaken += e.amount || 0; this.run.hpLost += e.amount || 0; }));
    this._unsub.push(bus.on(Channels.EntityKilled, (e) => { const en = e.entity?.get?.('Enemy'); if (en) this._bump(this.run.killsByEnemy, en.archetypeId); this.run.kills++; if (e.entity?.hasTag?.('Boss')) this.run.bossesKilled++; if (e.entity?.get?.('WaveMember')?.isElite) this.run.elitesKilled++; }));
    this._unsub.push(bus.on(Channels.PlayerHealed, (e) => { this.run.hpHealed += e.amount || 0; }));
    this._unsub.push(bus.on(Channels.WeaponFired, (e) => { const w = this.run.killsByWeapon; }));
    this._unsub.push(bus.on(Channels.WaveCleared, () => { this.run.wavesCleared++; }));
    this._unsub.push(bus.on(Channels.LevelUp, () => { this.run.levelsGained++; }));
    this._unsub.push(bus.on(Channels.CurrencyChanged, (e) => { if (e.amount > 0) this.run.currencyEarned += e.amount; }));
    this._unsub.push(bus.on(Channels.XPGained, (e) => { this.run.xpEarned += e.xp || 0; }));
  }

  _bump(map, key) { if (key) map[key] = (map[key] || 0) + 1; }

  noteDash() { this.run.dashes++; }
  noteJump() { this.run.jumps++; }
  noteAbility() { this.run.abilityUses++; }
  noteUlt() { this.run.ultUses++; }
  notePickup(type) { this.run.pickups++; this._bump(this.run.pickupsByType, type); }
  noteHazard() { this.run.hazardsTriggered++; }
  noteHazardKill() { this.run.hazardKills++; }
  noteItemBought() { this.run.itemsBought++; }
  noteUpgrade() { this.run.upgradesChosen++; }
  notePerk() { this.run.perksGained++; }
  noteRevive() { this.run.revives++; }
  noteCombo(max) { this.run.maxCombo = Math.max(this.run.maxCombo, max); }
  noteDistance(pos) { if (this._lastPos) { const d = Math.hypot(pos.x - this._lastPos.x, pos.z - this._lastPos.z); this.run.distance += d; } this._lastPos = { x: pos.x, z: pos.z }; }
  noteBiomeTime(biome, dt) { this.run.timeInBiome[biome] = (this.run.timeInBiome[biome] || 0) + dt; }
  noteWeaponKill(weaponId) { this._bump(this.run.killsByWeapon, weaponId); }

  update(dt) { this.run.timeAlive += dt; }

  /** Accuracy 0..1. */
  get accuracy() { return this.run.shotsFired > 0 ? clamp(this.run.shotsHit / this.run.shotsFired, 0, 1) : 0; }

  /** Finalize and merge into lifetime save stats. */
  finalize() {
    const s = this.save.stats;
    s.lifetime = s.lifetime || {};
    const L = s.lifetime;
    L.damageDealt = (L.damageDealt || 0) + this.run.damageDealt;
    L.damageTaken = (L.damageTaken || 0) + this.run.damageTaken;
    L.kills = (L.kills || 0) + this.run.kills;
    L.headshots = (L.headshots || 0) + this.run.headshots;
    L.crits = (L.crits || 0) + this.run.crits;
    L.shotsFired = (L.shotsFired || 0) + this.run.shotsFired;
    L.dashes = (L.dashes || 0) + this.run.dashes;
    L.abilityUses = (L.abilityUses || 0) + this.run.abilityUses;
    L.pickups = (L.pickups || 0) + this.run.pickups;
    L.distance = (L.distance || 0) + this.run.distance;
    L.timeAlive = (L.timeAlive || 0) + this.run.timeAlive;
    // merge per-weapon/enemy kills
    for (const [k, v] of Object.entries(this.run.killsByWeapon)) s.weaponKills[k] = (s.weaponKills[k] || 0) + v;
    for (const [k, v] of Object.entries(this.run.killsByEnemy)) s.enemyKills[k] = (s.enemyKills[k] || 0) + v;
    this.save.markDirty();
    return this.run;
  }

  /** A formatted summary for the game-over screen. */
  summary() {
    const r = this.run;
    return [
      { label: 'Wave Reached', value: r.wavesCleared + 1 },
      { label: 'Score', value: formatNumber(this._score) },
      { label: 'Kills', value: r.kills },
      { label: 'Bosses Killed', value: r.bossesKilled },
      { label: 'Elites Killed', value: r.elitesKilled },
      { label: 'Time', value: formatTime(r.timeAlive) },
      { label: 'Damage Dealt', value: formatNumber(r.damageDealt) },
      { label: 'Damage Taken', value: formatNumber(r.damageTaken) },
      { label: 'Headshots', value: r.headshots },
      { label: 'Critical Hits', value: r.crits },
      { label: 'Accuracy', value: Math.round(this.accuracy * 100) + '%' },
      { label: 'Shots Fired', value: formatNumber(r.shotsFired) },
      { label: 'Dashes', value: r.dashes },
      { label: 'Ability Uses', value: r.abilityUses },
      { label: 'Pickups', value: r.pickups },
      { label: 'Currency Earned', value: formatNumber(r.currencyEarned) },
      { label: 'XP Earned', value: formatNumber(r.xpEarned) },
      { label: 'Max Combo', value: 'x' + r.maxCombo },
      { label: 'Levels Gained', value: r.levelsGained },
      { label: 'Items Bought', value: r.itemsBought },
      { label: 'Upgrades Chosen', value: r.upgradesChosen },
      { label: 'Perks Gained', value: r.perksGained },
      { label: 'Distance', value: formatNumber(r.distance) + 'm' },
      { label: 'HP Healed', value: formatNumber(r.hpHealed) },
      { label: 'Revives', value: r.revives },
      { label: 'Hazards Triggered', value: r.hazardsTriggered },
      { label: 'Hazard Kills', value: r.hazardKills },
    ];
  }

  set score(v) { this._score = v; }

  dispose() { for (const off of this._unsub) if (off) off(); this._unsub = []; }
}
