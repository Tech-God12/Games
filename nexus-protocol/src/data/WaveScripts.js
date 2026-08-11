// ============================================================================
// WaveScripts.js
// Curated, hand-tuned wave compositions for specific wave numbers. Each script
// defines named groups with archetype, count, spawn delay, elite flag, and a
// spawn pattern. The WaveManager can fall back to these for crafted pacing on
// milestone waves; otherwise it procedurally composes. Pure data.
// ============================================================================

export const Patterns = Object.freeze({
  ring: 'ring',        // spawn evenly around the arena ring
  cluster: 'cluster',  // spawn in a tight group at one random point
  sides: 'sides',      // spawn from two opposite sides
  spread: 'spread',    // random scattered points
  spiral: 'spiral',    // sequential ring with increasing radius
  bossEntourage: 'bossEntourage', // ring of adds around a center boss
});

/**
 * @typedef {Object} WaveGroup
 * @property {string} archetype
 * @property {number} count
 * @property {number} delay       seconds before this group starts
 * @property {number} interval    seconds between spawns within the group
 * @property {boolean} elite
 * @property {string} pattern
 * @property {number} tier        optional tier override
 */

/**
 * @typedef {Object} WaveScript
 * @property {number} wave
 * @property {string} name
 * @property {boolean} boss
 * @property {string} bossId
 * @property {WaveGroup[]} groups
 * @property {string} intro
 */

/** @type {WaveScript[]} */
export const WaveScripts = [
  { wave: 1, name: 'First Contact', boss: false, intro: 'The Nexus stirs.',
    groups: [
      { archetype: 'drone', count: 6, delay: 0, interval: 0.4, elite: false, pattern: 'ring' },
      { archetype: 'swarmling', count: 4, delay: 3, interval: 0.3, elite: false, pattern: 'spread' },
    ] },
  { wave: 2, name: 'Quickening', boss: false, intro: 'It learns.',
    groups: [
      { archetype: 'drone', count: 8, delay: 0, interval: 0.35, elite: false, pattern: 'ring' },
      { archetype: 'runner', count: 4, delay: 2, interval: 0.4, elite: false, pattern: 'sides' },
    ] },
  { wave: 3, name: 'First Ranged', boss: false, intro: 'Keep moving.',
    groups: [
      { archetype: 'drone', count: 6, delay: 0, interval: 0.4, elite: false, pattern: 'ring' },
      { archetype: 'shooter', count: 3, delay: 2, interval: 0.6, elite: false, pattern: 'spread' },
      { archetype: 'swarmling', count: 6, delay: 5, interval: 0.25, elite: false, pattern: 'cluster' },
    ] },
  { wave: 4, name: 'The Pack', boss: false, intro: 'They hunt together.',
    groups: [
      { archetype: 'runner', count: 8, delay: 0, interval: 0.3, elite: false, pattern: 'ring' },
      { archetype: 'spider', count: 4, delay: 3, interval: 0.5, elite: false, pattern: 'sides' },
      { archetype: 'shooter', count: 3, delay: 5, interval: 0.7, elite: false, pattern: 'spread' },
    ] },
  { wave: 5, name: 'The Sentinel', boss: true, bossId: 'sentinel', intro: 'A guardian awakens.',
    groups: [
      { archetype: 'drone', count: 4, delay: 4, interval: 0.6, elite: false, pattern: 'ring' },
      { archetype: 'swarmling', count: 6, delay: 10, interval: 0.3, elite: false, pattern: 'spread' },
    ] },
  { wave: 6, name: 'Aftermath', boss: false, intro: 'The grid recalibrates.',
    groups: [
      { archetype: 'walker', count: 5, delay: 0, interval: 0.5, elite: false, pattern: 'ring' },
      { archetype: 'shotgunner', count: 3, delay: 3, interval: 0.6, elite: false, pattern: 'sides' },
      { archetype: 'swarmling', count: 8, delay: 6, interval: 0.25, elite: false, pattern: 'cluster' },
    ] },
  { wave: 7, name: 'Air Support', boss: false, intro: 'Look up.',
    groups: [
      { archetype: 'strafer', count: 4, delay: 0, interval: 0.5, elite: false, pattern: 'ring' },
      { archetype: 'shooter', count: 4, delay: 2, interval: 0.5, elite: false, pattern: 'spread' },
      { archetype: 'bomber', count: 3, delay: 5, interval: 0.8, elite: false, pattern: 'sides' },
    ] },
  { wave: 8, name: 'Heavy Infantry', boss: false, intro: 'Brace.',
    groups: [
      { archetype: 'brute', count: 2, delay: 0, interval: 1.0, elite: false, pattern: 'sides' },
      { archetype: 'walker', count: 6, delay: 1, interval: 0.4, elite: false, pattern: 'ring' },
      { archetype: 'sniper', count: 2, delay: 4, interval: 1.0, elite: false, pattern: 'spread' },
      { archetype: 'swarmling', count: 10, delay: 7, interval: 0.2, elite: false, pattern: 'cluster' },
    ] },
  { wave: 9, name: 'Mixed Assault', boss: false, intro: 'No quarter.',
    groups: [
      { archetype: 'shooter', count: 5, delay: 0, interval: 0.4, elite: false, pattern: 'ring' },
      { archetype: 'charger', count: 3, delay: 2, interval: 0.7, elite: false, pattern: 'sides' },
      { archetype: 'bomber', count: 4, delay: 5, interval: 0.6, elite: false, pattern: 'spread' },
      { archetype: 'blob', count: 2, delay: 8, interval: 1.0, elite: false, pattern: 'sides' },
    ] },
  { wave: 10, name: 'The Warbringer', boss: true, bossId: 'warbringer', intro: 'It lives for war.',
    groups: [
      { archetype: 'walker', count: 4, delay: 5, interval: 0.6, elite: false, pattern: 'ring' },
      { archetype: 'shooter', count: 4, delay: 12, interval: 0.5, elite: false, pattern: 'spread' },
      { archetype: 'brute', count: 1, delay: 18, interval: 1.0, elite: true, pattern: 'sides' },
    ] },
  { wave: 11, name: 'Support Line', boss: false, intro: 'Prioritize.',
    groups: [
      { archetype: 'healer', count: 2, delay: 0, interval: 1.0, elite: false, pattern: 'spread' },
      { archetype: 'walker', count: 6, delay: 1, interval: 0.4, elite: false, pattern: 'ring' },
      { archetype: 'shooter', count: 4, delay: 4, interval: 0.5, elite: false, pattern: 'sides' },
      { archetype: 'swarmling', count: 12, delay: 7, interval: 0.2, elite: false, pattern: 'cluster' },
    ] },
  { wave: 12, name: 'Frost & Fire', boss: false, intro: 'Elements align.',
    groups: [
      { archetype: 'cryomancer', count: 3, delay: 0, interval: 0.6, elite: false, pattern: 'sides' },
      { archetype: 'pyromancer', count: 3, delay: 1, interval: 0.6, elite: false, pattern: 'sides' },
      { archetype: 'strafer', count: 5, delay: 3, interval: 0.4, elite: false, pattern: 'ring' },
      { archetype: 'charger', count: 3, delay: 6, interval: 0.7, elite: false, pattern: 'spread' },
    ] },
  { wave: 13, name: 'The Conjurers', boss: false, intro: 'End the summoners.',
    groups: [
      { archetype: 'summoner', count: 2, delay: 0, interval: 1.0, elite: false, pattern: 'spread' },
      { archetype: 'swarmling', count: 10, delay: 2, interval: 0.2, elite: false, pattern: 'cluster' },
      { archetype: 'shooter', count: 5, delay: 4, interval: 0.4, elite: false, pattern: 'ring' },
      { archetype: 'blob', count: 3, delay: 7, interval: 0.8, elite: false, pattern: 'sides' },
    ] },
  { wave: 14, name: 'Elite Strike', boss: false, intro: 'The Protocol stops pretending.',
    groups: [
      { archetype: 'brute', count: 1, delay: 0, interval: 1.0, elite: true, pattern: 'sides' },
      { archetype: 'sniper', count: 3, delay: 1, interval: 0.7, elite: false, pattern: 'spread' },
      { archetype: 'strafer', count: 5, delay: 3, interval: 0.4, elite: false, pattern: 'ring' },
      { archetype: 'bomber', count: 5, delay: 6, interval: 0.5, elite: false, pattern: 'sides' },
      { archetype: 'tank', count: 1, delay: 10, interval: 1.0, elite: true, pattern: 'spread' },
    ] },
  { wave: 15, name: 'The Tempest', boss: true, bossId: 'tempest', intro: 'The sky turns against you.',
    groups: [
      { archetype: 'strafer', count: 4, delay: 5, interval: 0.5, elite: false, pattern: 'ring' },
      { archetype: 'dodger', count: 3, delay: 12, interval: 0.6, elite: false, pattern: 'spread' },
      { archetype: 'swarmling', count: 10, delay: 18, interval: 0.2, elite: false, pattern: 'cluster' },
    ] },
  { wave: 16, name: 'Bulwark', boss: false, intro: 'Strip the shields.',
    groups: [
      { archetype: 'shielder', count: 2, delay: 0, interval: 1.0, elite: false, pattern: 'spread' },
      { archetype: 'walker', count: 8, delay: 1, interval: 0.35, elite: false, pattern: 'ring' },
      { archetype: 'shotgunner', count: 4, delay: 4, interval: 0.5, elite: false, pattern: 'sides' },
      { archetype: 'crystalShard', count: 3, delay: 7, interval: 0.7, elite: false, pattern: 'spread' },
    ] },
  { wave: 17, name: 'Bombing Run', boss: false, intro: 'Don\'t stand still.',
    groups: [
      { archetype: 'bomber', count: 8, delay: 0, interval: 0.4, elite: false, pattern: 'ring' },
      { archetype: 'kamikaze', count: 6, delay: 3, interval: 0.4, elite: false, pattern: 'sides' },
      { archetype: 'shooter', count: 5, delay: 5, interval: 0.4, elite: false, pattern: 'spread' },
    ] },
  { wave: 18, name: 'The Tank', boss: false, intro: 'Bring everything.',
    groups: [
      { archetype: 'tank', count: 1, delay: 0, interval: 1.0, elite: true, pattern: 'spread' },
      { archetype: 'walker', count: 8, delay: 1, interval: 0.35, elite: false, pattern: 'ring' },
      { archetype: 'healer', count: 2, delay: 3, interval: 1.0, elite: false, pattern: 'sides' },
      { archetype: 'sniper', count: 3, delay: 6, interval: 0.8, elite: false, pattern: 'spread' },
    ] },
  { wave: 19, name: 'Phantom Squadron', boss: false, intro: 'Trust your instincts.',
    groups: [
      { archetype: 'dodger', count: 5, delay: 0, interval: 0.5, elite: false, pattern: 'ring' },
      { archetype: 'mirror', count: 4, delay: 2, interval: 0.6, elite: false, pattern: 'sides' },
      { archetype: 'ghost', count: 4, delay: 4, interval: 0.6, elite: false, pattern: 'spread' },
      { archetype: 'strafer', count: 5, delay: 6, interval: 0.4, elite: false, pattern: 'ring' },
    ] },
  { wave: 20, name: 'The Leviathan', boss: true, bossId: 'leviathan', intro: 'It is never alone.',
    groups: [
      { archetype: 'summoner', count: 2, delay: 6, interval: 1.0, elite: false, pattern: 'spread' },
      { archetype: 'swarmling', count: 14, delay: 8, interval: 0.15, elite: false, pattern: 'cluster' },
      { archetype: 'healer', count: 2, delay: 16, interval: 1.0, elite: false, pattern: 'sides' },
    ] },
  { wave: 21, name: 'Overseers', boss: false, intro: 'High altitude.',
    groups: [
      { archetype: 'overseer', count: 3, delay: 0, interval: 0.8, elite: false, pattern: 'spread' },
      { archetype: 'strafer', count: 6, delay: 2, interval: 0.4, elite: false, pattern: 'ring' },
      { archetype: 'shooter', count: 5, delay: 5, interval: 0.4, elite: false, pattern: 'sides' },
    ] },
  { wave: 22, name: 'Elite Vanguard', boss: false, intro: 'The best of the Swarm.',
    groups: [
      { archetype: 'brute', count: 2, delay: 0, interval: 1.0, elite: true, pattern: 'sides' },
      { archetype: 'charger', count: 4, delay: 1, interval: 0.5, elite: false, pattern: 'ring' },
      { archetype: 'voidEye', count: 2, delay: 4, interval: 1.0, elite: true, pattern: 'spread' },
      { archetype: 'bomber', count: 6, delay: 6, interval: 0.4, elite: false, pattern: 'sides' },
    ] },
  { wave: 23, name: 'Crystal Field', boss: false, intro: 'Refraction.',
    groups: [
      { archetype: 'crystalShard', count: 6, delay: 0, interval: 0.4, elite: false, pattern: 'ring' },
      { archetype: 'strafer', count: 5, delay: 2, interval: 0.4, elite: false, pattern: 'sides' },
      { archetype: 'sniper', count: 4, delay: 5, interval: 0.6, elite: false, pattern: 'spread' },
    ] },
  { wave: 24, name: 'Kamikaze Run', boss: false, intro: 'Move or die.',
    groups: [
      { archetype: 'kamikaze', count: 12, delay: 0, interval: 0.25, elite: false, pattern: 'ring' },
      { archetype: 'bomber', count: 6, delay: 3, interval: 0.4, elite: false, pattern: 'sides' },
      { archetype: 'shooter', count: 6, delay: 5, interval: 0.3, elite: false, pattern: 'spread' },
    ] },
  { wave: 25, name: 'The Overlord', boss: true, bossId: 'overlord', intro: 'The master reveals itself.',
    groups: [
      { archetype: 'voidEye', count: 2, delay: 8, interval: 1.0, elite: true, pattern: 'spread' },
      { archetype: 'strafer', count: 6, delay: 14, interval: 0.4, elite: false, pattern: 'ring' },
      { archetype: 'swarmling', count: 16, delay: 20, interval: 0.15, elite: false, pattern: 'cluster' },
    ] },
  { wave: 26, name: 'The Cleansing', boss: false, intro: 'No mercy.',
    groups: [
      { archetype: 'tank', count: 1, delay: 0, interval: 1.0, elite: true, pattern: 'spread' },
      { archetype: 'summoner', count: 3, delay: 1, interval: 0.8, elite: false, pattern: 'sides' },
      { archetype: 'sniper', count: 4, delay: 3, interval: 0.6, elite: false, pattern: 'spread' },
      { archetype: 'bomber', count: 8, delay: 6, interval: 0.3, elite: false, pattern: 'ring' },
    ] },
  { wave: 27, name: 'Storm Front', boss: false, intro: 'Electric.',
    groups: [
      { archetype: 'overseer', count: 4, delay: 0, interval: 0.6, elite: false, pattern: 'spread' },
      { archetype: 'strafer', count: 8, delay: 2, interval: 0.3, elite: false, pattern: 'ring' },
      { archetype: 'dodger', count: 6, delay: 5, interval: 0.4, elite: false, pattern: 'sides' },
    ] },
  { wave: 28, name: 'The Titan', boss: true, bossId: 'titan', intro: 'The mountain stirs.',
    groups: [
      { archetype: 'brute', count: 3, delay: 6, interval: 0.8, elite: false, pattern: 'ring' },
      { archetype: 'healer', count: 2, delay: 14, interval: 1.0, elite: false, pattern: 'spread' },
      { archetype: 'swarmling', count: 18, delay: 20, interval: 0.15, elite: false, pattern: 'cluster' },
    ] },
  { wave: 29, name: 'All-Out', boss: false, intro: 'Everything at once.',
    groups: [
      { archetype: 'shooter', count: 8, delay: 0, interval: 0.3, elite: false, pattern: 'ring' },
      { archetype: 'charger', count: 6, delay: 2, interval: 0.4, elite: false, pattern: 'sides' },
      { archetype: 'sniper', count: 4, delay: 4, interval: 0.6, elite: false, pattern: 'spread' },
      { archetype: 'bomber', count: 8, delay: 6, interval: 0.3, elite: false, pattern: 'ring' },
      { archetype: 'tank', count: 1, delay: 10, interval: 1.0, elite: true, pattern: 'spread' },
    ] },
  { wave: 30, name: 'The Devourer', boss: true, bossId: 'devourer', intro: 'It has come to consume.',
    groups: [
      { archetype: 'voidEye', count: 3, delay: 8, interval: 0.8, elite: true, pattern: 'spread' },
      { archetype: 'strafer', count: 8, delay: 16, interval: 0.3, elite: false, pattern: 'ring' },
      { archetype: 'swarmling', count: 20, delay: 24, interval: 0.12, elite: false, pattern: 'cluster' },
    ] },
];

/** Look up a scripted wave by wave number (1-indexed). Returns null if none. */
export function getWaveScript(wave) {
  return WaveScripts.find(s => s.wave === wave) || null;
}

/** All scripted wave numbers. */
export function scriptedWaveNumbers() { return WaveScripts.map(s => s.wave); }

/** Total scripted waves. */
export const ScriptedWaveCount = WaveScripts.length;
