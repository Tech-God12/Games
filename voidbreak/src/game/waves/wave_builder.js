/**
 * VOIDBREAK — Wave composition builder.
 *
 * Turns a wave number + mode into an ordered spawn list (queue of enemy
 * groups) using the budget system. Pure logic — unit tested.
 */

import { waveBudget, COSTS, isBossWave, bossForWave } from './difficulty.js';
import { unlockableEnemies } from '../enemies/enemy_defs.js';

/**
 * Build a spawn queue for a wave.
 * @returns {Array<{id: string, count: number, delay: number, elite?: boolean}>}
 */
export function buildWave(wave, mode = 'endless', rng = Math.random) {
  if (isBossWave(wave)) {
    return [{ id: bossForWave(wave), count: 1, delay: 1.5, boss: true }];
  }

  const budget = waveBudget(wave, mode);
  const available = unlockableEnemies(wave);
  const groups = [];

  const gruntBudget = Math.min(budget * 0.45, 60);
  const grunts = Math.round(gruntBudget / COSTS.grunt * (0.8 + rng() * 0.4));
  if (grunts > 0) {
    groups.push({ id: 'grunt', count: grunts, delay: 0.5, elite: false });
  }
  let remaining = budget - gruntBudget;

  const midPool = available.filter((id) => COSTS[id] >= 1.3 && COSTS[id] <= 2.2);
  const heavyPool = available.filter((id) => COSTS[id] > 2.2);

  let midBudget = remaining * 0.5;
  while (midBudget > 0 && midPool.length > 0) {
    const id = midPool[Math.floor(rng() * midPool.length)];
    const cost = COSTS[id];
    const count = Math.min(Math.floor(midBudget / cost), 6);
    if (count > 0) {
      groups.push({ id, count, delay: 0.8, elite: false });
      midBudget -= cost * count;
    } else {
      midPool.splice(midPool.indexOf(id), 1);
    }
  }
  remaining -= remaining * 0.5;

  if (wave >= 6 && heavyPool.length > 0) {
    const id = heavyPool[Math.floor(rng() * heavyPool.length)];
    const cost = COSTS[id];
    const count = Math.max(1, Math.min(Math.floor(remaining * 0.7 / cost), 3));
    groups.push({ id, count, delay: 1.2, elite: false });
    remaining -= cost * count;
  }

  if (remaining > 0 && available.length > 0) {
    const id = available[Math.floor(rng() * available.length)];
    const cost = COSTS[id];
    const count = Math.max(1, Math.min(Math.floor(remaining / cost), 8));
    groups.push({ id, count, delay: 1.0, elite: false });
  }

  for (let i = groups.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [groups[i], groups[j]] = [groups[j], groups[i]];
  }

  return groups;
}

/**
 * Convert a group queue into an expanded spawn queue (each spawn as an item).
 */
export function expandGroups(groups, eliteChanceFn, rng = Math.random) {
  const queue = [];
  for (const group of groups) {
    for (let i = 0; i < group.count; i++) {
      const elite = group.elite || (!group.boss && rng() < eliteChanceFn());
      queue.push({ id: group.id, elite });
    }
  }
  return queue;
}

/** A descriptive label for the wave (for the banner UI). */
export function waveLabel(wave, mode) {
  if (isBossWave(wave)) {
    const boss = bossForWave(wave);
    return boss === 'boss_colossus' ? 'COLOSSUS BREACH' : 'WARDEN ASCENDANT';
  }
  const tier = wave < 3 ? 'VANGUARD' : wave < 7 ? 'SENTINELS' : wave < 11 ? 'REAVERS' : 'VOID LEGION';
  return `WAVE ${wave} — ${tier}`;
}

/** Short threat description for the briefing. */
export function waveThreat(wave) {
  return unlockableEnemies(wave).map((id) => id.replace('_', ' ')).join(', ');
}
