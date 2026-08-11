// ============================================================================
// DailyChallenge.js
// Daily & weekly challenge generator: deterministic seeds derived from the
// date produce a fixed loadout, modifier set, and target goal for all players
// on a given day. Tracks completion in the save. Adds replayable variety and a
// shared leaderboard-style target.
// ============================================================================

import { Random, hashSeed } from '../core/Random.js';
import { clamp, formatNumber } from '../core/MathUtils.js';

export const ChallengeModifiers = [
  { id: 'glassCannon', name: 'Glass Cannon', desc: 'Max HP set to 50', apply: (c) => { c.maxHPOverride = 50; } },
  { id: 'berserker', name: 'Berserker', desc: '+50% damage, -30% max HP', apply: (c) => { c.damageMult = 1.5; c.maxHPMult = 0.7; } },
  { id: 'speed', name: 'Adrenaline', desc: '+30% move & fire speed', apply: (c) => { c.moveMult = 1.3; c.fireRateMult = 1.3; } },
  { id: 'heavy', name: 'Heavy Caliber', desc: '+40% damage, +20% spread', apply: (c) => { c.damageMult = 1.4; c.spreadMult = 1.2; } },
  { id: 'swarm', name: 'Swarm', desc: '2x enemies, -20% enemy HP', apply: (c) => { c.spawnMult = 2; c.enemyHPMult = 0.8; } },
  { id: 'elite', name: 'Elite Force', desc: '+50% elite chance, +30% currency', apply: (c) => { c.eliteChanceMult = 1.5; c.currencyMult = 1.3; } },
  { id: 'fragile', name: 'Fragile', desc: 'Take +50% damage', apply: (c) => { c.damageTakenMult = 1.5; } },
  { id: 'rich', name: 'Booty', desc: '+100% currency, -20% damage', apply: (c) => { c.currencyMult = 2; c.damageMult = 0.8; } },
  { id: 'tanky', name: 'Juggernaut', desc: '+50% max HP, -20% move speed', apply: (c) => { c.maxHPMult = 1.5; c.moveMult = 0.8; } },
  { id: 'rapid', name: 'Rapid Fire', desc: '+60% fire rate, -25% damage', apply: (c) => { c.fireRateMult = 1.6; c.damageMult = 0.75; } },
  { id: 'vampire', name: 'Vampire', desc: '+8% lifesteal, -30% max HP', apply: (c) => { c.lifesteal = 0.08; c.maxHPMult = 0.7; } },
  { id: 'overload', name: 'Overload', desc: '+50% damage, weapons jam occasionally', apply: (c) => { c.damageMult = 1.5; c.jamChance = 0.05; } },
];

export class DailyChallenge {
  constructor(save, weaponIds, characterIds) {
    this.save = save;
    this.weaponIds = weaponIds;
    this.characterIds = characterIds;
  }

  _seedFor(dateKey) { return hashSeed('nexus_daily_' + dateKey); }

  /** Date key YYYY-MM-DD (local). */
  dateKey(d = new Date()) {
    const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, '0'), day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
  weekKey(d = new Date()) {
    const y = d.getFullYear(); const onejan = new Date(y, 0, 1);
    const week = Math.ceil(((d - onejan) / 86400000 + onejan.getDay() + 1) / 7);
    return `${y}-W${week}`;
  }

  /** Generate today's daily challenge config. */
  daily(d = new Date()) {
    const key = this.dateKey(d);
    const rng = new Random(this._seedFor(key));
    const character = rng.pick(this.characterIds.length ? this.characterIds : ['ranger']);
    const weaponCount = 2;
    const weapons = [];
    const pool = this.weaponIds.length ? this.weaponIds : ['pistol'];
    for (let i = 0; i < weaponCount; i++) weapons.push(rng.pick(pool));
    const modCount = 2;
    const mods = [];
    const copy = ChallengeModifiers.slice();
    for (let i = 0; i < modCount; i++) { const m = rng.take(copy); mods.push(m); }
    const goal = rng.weighted(
      [Wave, Score, Kills, Bosses],
      [3, 3, 2, 1]
    );
    return { key, type: 'daily', character, weapons, modifiers: mods, goal: goal(rng), rng };
  }

  /** Generate this week's challenge. */
  weekly(d = new Date()) {
    const key = this.weekKey(d);
    const rng = new Random(this._seedFor(key));
    const character = rng.pick(this.characterIds.length ? this.characterIds : ['ranger']);
    const weapons = [];
    const pool = this.weaponIds.length ? this.weaponIds : ['pistol'];
    for (let i = 0; i < 3; i++) weapons.push(rng.pick(pool));
    const mods = [];
    const copy = ChallengeModifiers.slice();
    for (let i = 0; i < 3; i++) mods.push(rng.take(copy));
    const goal = rng.weighted([Wave, Score, Kills, Bosses], [3, 3, 2, 1]);
    return { key, type: 'weekly', character, weapons, modifiers: mods, goal: goal(rng), rng };
  }

  /** Build a run-start context from a challenge config. */
  buildRunContext(ch) {
    const ctx = { maxHPOverride: null, maxHPMult: 1, damageMult: 1, moveMult: 1, fireRateMult: 1, spreadMult: 1, spawnMult: 1, enemyHPMult: 1, eliteChanceMult: 1, currencyMult: 1, damageTakenMult: 1, lifesteal: 0, jamChance: 0 };
    for (const m of ch.modifiers) m.apply(ctx);
    return ctx;
  }

  /** Check if a challenge is already completed (saved by key). */
  isCompleted(key) { return !!this.save.achievements['challenge_' + key]; }
  markCompleted(key) { this.save.addAchievement('challenge_' + key); }

  /** Evaluate a run summary against a goal. */
  evaluate(ch, summary) {
    const g = ch.goal;
    if (g.type === 'wave') return summary.wave >= g.value;
    if (g.type === 'score') return summary.score >= g.value;
    if (g.type === 'kills') return summary.kills >= g.value;
    if (g.type === 'bosses') return summary.bossesKilled >= g.value;
    return false;
  }
}

function Wave(rng) { return { type: 'wave', value: rng.int(8, 20), label: (v) => `Reach Wave ${v}` }; }
function Score(rng) { return { type: 'score', value: rng.int(20000, 80000), label: (v) => `Score ${formatNumber(v)}` }; }
function Kills(rng) { return { type: 'kills', value: rng.int(150, 400), label: (v) => `Defeat ${v} enemies` }; }
function Bosses(rng) { return { type: 'bosses', value: rng.int(1, 4), label: (v) => `Defeat ${v} bosses` }; }
