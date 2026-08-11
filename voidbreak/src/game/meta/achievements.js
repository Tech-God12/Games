/**
 * VOIDBREAK — Achievements.
 *
 * 60 persistent achievements tracked across runs. Unlocks are stored in
 * localStorage.
 */

import { Storage, KEY_PREFIX } from '../../core/storage.js';
import { playSfx } from '../../audio/sfx.js';

const ACH_KEY = `${KEY_PREFIX}achievements`;

export const ACHIEVEMENTS = [
  { id: 'first_blood', name: 'First Blood', desc: 'Kill your first enemy', icon: '💀', check: (s) => s.kills >= 1 },
  { id: 'ten_kills', name: 'Ten Feet Under', desc: 'Kill 10 enemies', icon: '🦴', check: (s) => s.kills >= 10 },
  { id: 'fifty_kills', name: 'Fifty Dead', desc: 'Kill 50 enemies', icon: '⚰️', check: (s) => s.kills >= 50 },
  { id: 'hundred_kills', name: 'Century of Death', desc: 'Kill 100 enemies', icon: '💯', check: (s) => s.kills >= 100 },
  { id: 'thousand_kills', name: 'Void Butcher', desc: 'Kill 1,000 enemies (cumulative)', icon: '🔪', check: (s) => s.kills >= 1000 },
  { id: 'wave_1', name: 'Into the Breach', desc: 'Clear wave 1', icon: '🌊', check: (s) => s.wavesCleared >= 1 },
  { id: 'wave_5', name: 'Breach Survivor', desc: 'Clear wave 5', icon: '🛡️', check: (s) => s.wavesCleared >= 5 },
  { id: 'wave_10', name: 'Tenth Circle', desc: 'Clear wave 10', icon: '🔟', check: (s) => s.wavesCleared >= 10 },
  { id: 'wave_15', name: 'Fifteen Fathoms', desc: 'Clear wave 15', icon: '⛓️', check: (s) => s.wavesCleared >= 15 },
  { id: 'wave_20', name: 'Two Dozen', desc: 'Clear wave 20', icon: '💎', check: (s) => s.wavesCleared >= 20 },
  { id: 'boss_1', name: 'Colossus Breaker', desc: 'Defeat the Colossus', icon: '🗿', check: (s) => s.bossesKilled >= 1 },
  { id: 'boss_2', name: 'Warden Silenced', desc: 'Defeat the Warden', icon: '👁️', check: (s) => s.bossesKilled >= 1 && s.topEnemy === 'boss_warden' },
  { id: 'bosses_all', name: 'Tyrant Slayer', desc: 'Defeat both bosses', icon: '⚡', check: (s) => s.bossesKilled >= 2 },
  { id: 'headshot_1', name: 'Sharpshooter', desc: 'Land a headshot', icon: '🎯', check: (s) => s.headshots >= 1 },
  { id: 'headshot_50', name: 'Surgeon', desc: 'Land 50 headshots (cumulative)', icon: '🧠', check: (s) => s.headshots >= 50 },
  { id: 'crit_1', name: 'Lucky Strike', desc: 'Land a critical hit', icon: '🍀', check: (s) => s.crits >= 1 },
  { id: 'combo_10', name: 'Combo Machine', desc: 'Reach a 10-kill combo', icon: '🔗', check: (s) => s.maxCombo >= 10 },
  { id: 'combo_25', name: 'Unstoppable', desc: 'Reach a 25-kill combo', icon: '🔥', check: (s) => s.maxCombo >= 25 },
  { id: 'combo_50', name: 'God of War', desc: 'Reach a 50-kill combo', icon: '👑', check: (s) => s.maxCombo >= 50 },
  { id: 'score_10k', name: 'Ten Grand', desc: 'Score 10,000 in a run', icon: '💰', check: (s) => s.score >= 10000 },
  { id: 'score_50k', name: 'Fifty Grand', desc: 'Score 50,000 in a run', icon: '🏦', check: (s) => s.score >= 50000 },
  { id: 'score_100k', name: 'Void Millionaire', desc: 'Score 100,000 in a run', icon: '🚀', check: (s) => s.score >= 100000 },
  { id: 'upgrades_10', name: 'Build Master', desc: 'Take 10 upgrades in a run', icon: '🧩', check: (s) => s.upgradesTaken >= 10 },
  { id: 'upgrades_20', name: 'Deck of Power', desc: 'Take 20 upgrades in a run', icon: '🃏', check: (s) => s.upgradesTaken >= 20 },
  { id: 'dash_100', name: 'Flash', desc: 'Dash 100 times (cumulative)', icon: '💨', check: (s) => s.dashes >= 100 },
  { id: 'loot_100', name: 'Loot Goblin', desc: 'Collect 100 pickups (cumulative)', icon: '🎁', check: (s) => s.pickupTotal >= 100 },
  { id: 'energy_500', name: 'Energy Vampire', desc: 'Collect 500 void energy (cumulative)', icon: '🧛', check: (s) => s.energyCollected >= 500 },
  { id: 'elite_10', name: 'Elite Hunter', desc: 'Kill 10 elite enemies (cumulative)', icon: '🏹', check: (s) => s.elitesKilled >= 10 },
  { id: 'no_damage_5', name: 'Untouchable', desc: 'Clear 5 waves taking zero damage', icon: '😇', check: (s) => s.noDamageWaves >= 5 },
  { id: 'perfect_wave', name: 'Perfect Storm', desc: 'Clear a wave taking no damage', icon: '🌪️', check: (s) => s.noDamageWaves >= 1 },
  { id: 'practice', name: 'Range Day', desc: 'Complete the practice range', icon: '🎪', check: (s) => s.practiceComplete },
  { id: 'blitz_win', name: 'Blitzkrieg', desc: 'Win a Blitz run', icon: '⚔️', check: (s) => s.modeWins.blitz >= 1 },
  { id: 'crucible_win', name: 'Crucible Master', desc: 'Win a Crucible run', icon: '🏆', check: (s) => s.modeWins.crucible >= 1 },
  { id: 'rookie_win', name: 'Baby Steps', desc: 'Win a run on Rookie', icon: '👶', check: (s) => s.difficultyWins.rookie >= 1 },
  { id: 'operative_win', name: 'Operative', desc: 'Win a run on Operative', icon: '🎖️', check: (s) => s.difficultyWins.operative >= 1 },
  { id: 'veteran_win', name: 'Veteran', desc: 'Win a run on Veteran', icon: '🎗️', check: (s) => s.difficultyWins.veteran >= 1 },
  { id: 'nightmare_win', name: 'Nightmare Mode', desc: 'Win a run on Nightmare', icon: '😈', check: (s) => s.difficultyWins.nightmare >= 1 },
  { id: 'melee_10', name: 'Melee Enthusiast', desc: 'Kill 10 enemies with melee (cumulative)', icon: '🪓', check: (s) => (s.weaponKills.battleaxe ?? 0) >= 10 },
  { id: 'shotgun_10', name: 'Up Close', desc: 'Kill 10 enemies with the shotgun (cumulative)', icon: '🔫', check: (s) => (s.weaponKills.breaker ?? 0) >= 10 },
  { id: 'sniper_10', name: 'One Shot', desc: 'Kill 10 enemies with the railgun (cumulative)', icon: '🎯', check: (s) => (s.weaponKills.executor ?? 0) >= 10 },
  { id: 'explosives_10', name: 'Demolitionist', desc: 'Kill 10 enemies with explosives (cumulative)', icon: '💣', check: (s) => (s.weaponKills.havoc ?? 0) + (s.weaponKills.starfall ?? 0) >= 10 },
  { id: 'minigun_10', name: 'Suppression', desc: 'Kill 10 enemies with the minigun (cumulative)', icon: '🌀', check: (s) => (s.weaponKills.twinfang ?? 0) >= 10 },
  { id: 'freeze_10', name: 'Cold Storage', desc: 'Kill 10 frozen enemies (cumulative)', icon: '❄️', check: (s) => s.cryoKills >= 10 },
  { id: 'burn_10', name: 'CreMated', desc: 'Kill 10 burning enemies (cumulative)', icon: '♨️', check: (s) => s.burnKills >= 10 },
  { id: 'shock_10', name: 'AC/DC', desc: 'Kill 10 shocked enemies (cumulative)', icon: '⚡', check: (s) => s.shockKills >= 10 },
  { id: 'survive_1min', name: 'Survivor', desc: 'Survive 1 minute', icon: '⏱️', check: (s) => s.timeAlive >= 60 },
  { id: 'survive_10min', name: 'Ironman', desc: 'Survive 10 minutes in one run', icon: '🏃', check: (s) => s.timeAlive >= 600 },
  { id: 'survive_30min', name: 'Marathon', desc: 'Survive 30 minutes in one run', icon: '🏅', check: (s) => s.timeAlive >= 1800 },
  { id: 'nightmare_5', name: 'Nightmare Fuel', desc: 'Reach wave 5 on Nightmare', icon: '🎃', check: (s) => s.difficultyWaves.nightmare >= 5 },
  { id: 'zero_to_hero', name: 'Zero to Hero', desc: 'Win a run with only the starter loadout', icon: '🦸', check: (s) => s.starterOnlyWin },
  { id: 'dodger', name: 'Dodger', desc: 'Dodge 50 enemy attacks (cumulative)', icon: '🙅', check: (s) => s.dodges >= 50 },
  { id: 'collector', name: 'Collector', desc: 'Own every weapon in a single run', icon: '🧰', check: (s) => s.allWeapons },
  { id: 'lore_master', name: 'Lore Master', desc: 'Read all 20 codex entries', icon: '📖', check: (s) => s.codexRead >= 20 },
  { id: 'settings_geek', name: 'Tinkerer', desc: 'Change any setting', icon: '⚙️', check: (s) => s.changedSettings },
  { id: 'respawn_never', name: 'No Rez', desc: 'Complete wave 3 without dying', icon: '🚫', check: (s) => s.wavesCleared >= 3 && s.deaths === 0 },
  { id: 'glass_cannon', name: 'Glass Cannon', desc: 'Win a run with 100 max health or less', icon: '🥃', check: (s) => s.glassCannonWin },
  { id: 'tank', name: 'Living Fortress', desc: 'Reach 250+ max health in a run', icon: '🛡️', check: (s) => s.maxHealthReached >= 250 },
  { id: 'speed_demon', name: 'Speed Demon', desc: 'Clear wave 1 in under 20 seconds', icon: '⚡', check: (s) => s.fastestWave1 <= 20 },
  { id: 'pacifist_no', name: 'Tactical Retreat', desc: 'Survive 30s without firing', icon: '🏳️', check: (s) => s.longestNoFire >= 30 },
  { id: 'welcome', name: 'Welcome to the Breach', desc: 'Complete the tutorial', icon: '👋', check: (s) => s.tutorialComplete },
];

/** Persistent achievement tracker. */
export class AchievementTracker {
  constructor() {
    this.unlocked = new Set(Storage.get(ACH_KEY, []));
    this.pending = [];
  }

  isUnlocked(id) {
    return this.unlocked.has(id);
  }

  get unlockedCount() {
    return this.unlocked.size;
  }

  get totalCount() {
    return ACHIEVEMENTS.length;
  }

  /** Evaluate conditions against the run stats snapshot; unlock new ones. */
  check(snapshot) {
    const newly = [];
    for (const ach of ACHIEVEMENTS) {
      if (this.unlocked.has(ach.id)) continue;
      try {
        if (ach.check(snapshot)) {
          this.unlocked.add(ach.id);
          newly.push(ach);
        }
      } catch { /* ignore */ }
    }
    if (newly.length > 0) {
      this.persist();
      this.pending.push(...newly);
      for (const a of newly) {
        playSfx('ui.levelup', { vol: 0.5 });
      }
    }
    return newly;
  }

  takePending() {
    const out = this.pending;
    this.pending = [];
    return out;
  }

  persist() {
    Storage.set(ACH_KEY, [...this.unlocked]);
  }

  reset() {
    this.unlocked.clear();
    this.persist();
  }
}

export const achievements = new AchievementTracker();
