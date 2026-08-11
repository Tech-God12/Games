// ============================================================================
// NameGen.js
// Procedural name generator for runs, enemies, weapons, and seed labels.
// Uses syllable composition with seeded RNG for deterministic, evocative
// names. Supports several "styles" (epic, tech, void, swarm, forge).
// ============================================================================

import { Random, hashSeed } from '../core/Random.js';

const Syllables = {
  epic: {
    pre: ['aer', 'vor', 'mor', 'thal', 'nyx', 'drak', 'krel', 'zhar', 'ulth', 'gorn', 'vex', 'pyr', 'cyn', 'loth', 'fen', 'rynn', 'shar', 'dro'],
    mid: ['a', 'e', 'i', 'o', 'u', 'ae', 'yo', 'ra', 'le', 'an', 'or', 'ix', 'um', 'eth', 'is'],
    suf: ['ix', 'oth', 'us', 'ar', 'on', 'yx', 'ael', 'or', 'is', 'um', 'eth', 'rax', 'vyr', 'mos', 'tus', 'neth'],
    title: ['the Endless', 'the Voidborn', 'the Unmaker', 'the Eternal', 'the Devourer', 'the Forsaken', 'the Ascendant', 'the Hollow', 'the Sovereign', 'the Infinite', 'the Last', 'the First', 'the Shattered', 'the Living', 'the Deathless'],
  },
  tech: {
    pre: ['arc', 'volt', 'core', 'flux', 'beam', 'pulse', 'grid', 'byte', 'data', 'syn', 'cyber', 'neuro', 'proto', 'hyper', 'mega', 'giga', 'turbo', 'nova'],
    mid: ['o', 'a', 'i', 'e', 'tron', 'matic', 'wave', 'flow', 'link', 'sync'],
    suf: ['tron', 'matic', 'wave', 'flux', 'beam', 'core', 'link', 'sync', 'drive', 'burn', 'strike', 'pulse', 'grid', 'loop'],
    title: ['Mk.I', 'Mk.II', 'Mk.III', 'Prime', 'Alpha', 'Omega', 'Type-0', 'Series-X', 'Unit-7', 'Proto'],
  },
  void: {
    pre: ['nul', 'vex', 'aby', 'obli', 'vac', 'tene', 'umbra', 'noc', 'psyc', 'eld', 'vor', 'ku', 'xer', 'nyr', 'zau'],
    mid: ['a', 'o', 'u', 'ya', 'vi', 'xe', 'lo', 'tho', 'mi', 'za'],
    suf: ['tion', 'vion', 'lux', 'rith', 'moth', 'nae', 'xil', 'gath', 'shyr', 'voth', 'miir', 'thys'],
    title: ['of the Void', 'the Hungering', 'the Unseen', 'the Hollow', 'the Consuming', 'the Endless Dark', 'the Forgotten', 'the Between'],
  },
  swarm: {
    pre: ['hive', 'swarm', 'brood', 'nest', 'kell', 'xen', 'thr', 'kri', 'vor', 'zyn', 'chit', 'skit'],
    mid: ['a', 'i', 'o', 'ik', 'ax', 'ur', 'en', 'ol'],
    suf: ['ling', 'ax', 'ik', 'ite', 'oth', 'ix', 'on', 'nid', 'mind', 'lord', 'queen', 'tide'],
    title: ['the Many', 'the Brood', 'the Endless', 'the Tide', 'the Nest', 'the Queen\'s', 'the Swarm', 'the Legion'],
  },
  forge: {
    pre: ['anvil', 'hammer', 'forge', 'iron', 'steel', 'molten', 'ember', 'spark', 'crucible', 'temper'],
    mid: ['a', 'o', 'i', 'for', 'smith', 'wright'],
    suf: ['forge', 'smith', 'wright', 'cast', 'tempered', 'forged', 'burn', 'strike', 'mark'],
    title: ['of the Forge', 'the Cast', 'the Tempered', 'the Molten', 'the Anvil', 'the Crucible'],
  },
};

function pick(rng, arr) { return arr[Math.floor(rng.next() * arr.length)]; }

/**
 * Generate a name in a given style.
 * @param {string} style - epic | tech | void | swarm | forge
 * @param {number} seed
 * @param {boolean} includeTitle
 */
export function generateName(style = 'epic', seed = 0, includeTitle = false) {
  const s = Syllables[style] || Syllables.epic;
  const rng = new Random(seed || (Math.random() * 1e9) >>> 0);
  let name = pick(rng, s.pre);
  if (rng.chance(0.5)) name += pick(rng, s.mid);
  name += pick(rng, s.suf);
  // capitalize
  name = name.charAt(0).toUpperCase() + name.slice(1);
  if (includeTitle && rng.chance(0.4)) name += ' ' + pick(rng, s.title);
  return name;
}

/** Generate a run name (seeded by run start time). */
export function generateRunName(seed) {
  const styles = ['epic', 'void', 'tech'];
  return generateName(styles[Math.floor(new Random(seed).next() * styles.length)], seed, true);
}

/** Generate a weapon codename. */
export function generateWeaponName(seed) { return generateName('tech', seed, true); }

/** Generate an enemy codename. */
export function generateEnemyName(seed) { return generateName('swarm', seed, false); }

/** Generate a boss title. */
export function generateBossTitle(seed) {
  const rng = new Random(seed);
  const name = generateName('void', seed, false);
  const title = pick(rng, Syllables.epic.title);
  return `${name.toUpperCase()} · ${title}`;
}

/** Generate a biome-ish adjective for run labels. */
export function generateBiomeAdjective(seed) {
  const rng = new Random(seed);
  const adj = ['Neon', 'Void', 'Crystal', 'Inferno', 'Frost', 'Cyber', 'Shattered', 'Hollow', 'Endless', 'Forgotten', 'Burning', 'Frozen', 'Living', 'Dead'];
  return pick(rng, adj);
}

/** A full run label: "Adjective Name the Title". */
export function generateRunLabel(seed) {
  const adj = generateBiomeAdjective(seed);
  const name = generateRunName(seed + 1);
  return `${adj} ${name}`;
}

/** Generate N distinct names. */
export function generateNames(style, count, seed = 0) {
  const out = new Set();
  let s = seed;
  while (out.size < count) { out.add(generateName(style, s++, true)); }
  return Array.from(out);
}
