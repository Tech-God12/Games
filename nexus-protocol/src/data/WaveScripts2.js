// ============================================================================
// WaveScripts2.js
// Extended curated wave compositions for waves 31–60. Each defines a named
// encounter with grouped enemy spawns, elite injections, and boss phases.
// Falls back to procedural composition beyond the scripted range.
// ============================================================================

import { WaveScripts, getWaveScript } from './WaveScripts.js';

const S = (def) => ExtendedWaveScripts.push(def);

const ExtendedWaveScripts = [];

S({ wave: 31, name: 'Cleansing Fire', boss: false, intro: 'Burn it clean.',
  groups: [
    { archetype: 'pyromancer', count: 5, delay: 0, interval: 0.4, elite: false, pattern: 'ring' },
    { archetype: 'shocker', count: 4, delay: 2, interval: 0.5, elite: false, pattern: 'sides' },
    { archetype: 'brute', count: 2, delay: 5, interval: 1.0, elite: true, pattern: 'spread' },
  ] });
S({ wave: 32, name: 'The Horde King', boss: true, bossId: 'hordeKing', intro: 'The swarm finds its king.',
  groups: [
    { archetype: 'summoner', count: 3, delay: 6, interval: 0.8, elite: false, pattern: 'spread' },
    { archetype: 'swarmling', count: 20, delay: 10, interval: 0.12, elite: false, pattern: 'cluster' },
  ] });
S({ wave: 33, name: 'Frostbite', boss: false, intro: 'Cold closes in.',
  groups: [
    { archetype: 'cryomancer', count: 6, delay: 0, interval: 0.4, elite: false, pattern: 'ring' },
    { archetype: 'frostfly', count: 10, delay: 3, interval: 0.3, elite: false, pattern: 'spread' },
    { archetype: 'frostGiant', count: 1, delay: 7, interval: 1.0, elite: true, pattern: 'sides' },
  ] });
S({ wave: 34, name: 'The Iron God', boss: true, bossId: 'ironGod', intro: 'It is war, given a body.',
  groups: [
    { archetype: 'tank', count: 2, delay: 8, interval: 1.0, elite: true, pattern: 'spread' },
    { archetype: 'healer', count: 2, delay: 16, interval: 1.0, elite: false, pattern: 'sides' },
  ] });
S({ wave: 35, name: 'Storm Front', boss: false, intro: 'The air hums.',
  groups: [
    { archetype: 'stormMage', count: 6, delay: 0, interval: 0.4, elite: false, pattern: 'ring' },
    { archetype: 'lightningRod', count: 4, delay: 3, interval: 0.5, elite: false, pattern: 'sides' },
    { archetype: 'dodger', count: 6, delay: 6, interval: 0.4, elite: false, pattern: 'spread' },
  ] });
S({ wave: 36, name: 'The Arbiter', boss: true, bossId: 'arbiter', intro: 'The Protocol renders judgment.',
  groups: [
    { archetype: 'strafer', count: 6, delay: 6, interval: 0.4, elite: false, pattern: 'ring' },
    { archetype: 'voidEye', count: 2, delay: 14, interval: 1.0, elite: true, pattern: 'spread' },
  ] });
S({ wave: 37, name: 'Plague March', boss: false, intro: 'Sickness spreads.',
  groups: [
    { archetype: 'plagueCaster', count: 5, delay: 0, interval: 0.5, elite: false, pattern: 'ring' },
    { archetype: 'plagueWalker', count: 6, delay: 3, interval: 0.4, elite: false, pattern: 'sides' },
    { archetype: 'blob', count: 4, delay: 6, interval: 0.6, elite: false, pattern: 'spread' },
  ] });
S({ wave: 38, name: 'The Star Eater', boss: true, bossId: 'starEater', intro: 'It eats stars. You are next.',
  groups: [
    { archetype: 'voidAssassin', count: 3, delay: 8, interval: 0.8, elite: true, pattern: 'spread' },
    { archetype: 'swarmling', count: 18, delay: 16, interval: 0.12, elite: false, pattern: 'cluster' },
  ] });
S({ wave: 39, name: 'Heavy Metal', boss: false, intro: 'Steel advances.',
  groups: [
    { archetype: 'tank', count: 2, delay: 0, interval: 1.0, elite: true, pattern: 'sides' },
    { archetype: 'ironhide', count: 6, delay: 2, interval: 0.4, elite: false, pattern: 'ring' },
    { archetype: 'shielder', count: 3, delay: 5, interval: 0.6, elite: false, pattern: 'spread' },
  ] });
S({ wave: 40, name: 'The Behemoth', boss: true, bossId: 'behemoth', intro: 'It cannot be killed. Only endured.',
  groups: [
    { archetype: 'brute', count: 3, delay: 8, interval: 0.8, elite: false, pattern: 'ring' },
    { archetype: 'healer', count: 2, delay: 16, interval: 1.0, elite: false, pattern: 'spread' },
  ] });
S({ wave: 41, name: 'Phantom Legion', boss: false, intro: 'They phase through.',
  groups: [
    { archetype: 'wraith', count: 8, delay: 0, interval: 0.4, elite: false, pattern: 'ring' },
    { archetype: 'mirror', count: 6, delay: 3, interval: 0.5, elite: false, pattern: 'sides' },
    { archetype: 'voidAssassin', count: 3, delay: 6, interval: 0.7, elite: true, pattern: 'spread' },
  ] });
S({ wave: 42, name: 'The World Eater', boss: true, bossId: 'worldEater', intro: 'It has consumed worlds.',
  groups: [
    { archetype: 'warlord', count: 2, delay: 10, interval: 1.0, elite: true, pattern: 'spread' },
    { archetype: 'swarmling', count: 24, delay: 18, interval: 0.1, elite: false, pattern: 'cluster' },
  ] });
S({ wave: 43, name: 'Inferno', boss: false, intro: 'Everything burns.',
  groups: [
    { archetype: 'infernoBrute', count: 2, delay: 0, interval: 1.0, elite: true, pattern: 'sides' },
    { archetype: 'pyromancer', count: 6, delay: 2, interval: 0.4, elite: false, pattern: 'ring' },
    { archetype: 'fireArcher', count: 4, delay: 5, interval: 0.5, elite: false, pattern: 'spread' },
  ] });
S({ wave: 44, name: 'Deep Freeze', boss: false, intro: 'Absolute zero.',
  groups: [
    { archetype: 'frostGiant', count: 2, delay: 0, interval: 1.0, elite: true, pattern: 'sides' },
    { archetype: 'cryomancer', count: 6, delay: 2, interval: 0.4, elite: false, pattern: 'ring' },
    { archetype: 'iceArcher', count: 4, delay: 5, interval: 0.5, elite: false, pattern: 'spread' },
  ] });
S({ wave: 45, name: 'The Astral Sovereign', boss: true, bossId: 'astralSovereign', intro: 'The Sovereign claims its throne.',
  groups: [
    { archetype: 'archmage', count: 3, delay: 10, interval: 0.8, elite: true, pattern: 'spread' },
    { archetype: 'strafer', count: 8, delay: 18, interval: 0.3, elite: false, pattern: 'ring' },
  ] });
S({ wave: 46, name: 'Swarm Tide', boss: false, intro: 'They never stop coming.',
  groups: [
    { archetype: 'swarmling', count: 30, delay: 0, interval: 0.1, elite: false, pattern: 'ring' },
    { archetype: 'summoner', count: 4, delay: 3, interval: 0.5, elite: false, pattern: 'spread' },
    { archetype: 'swarmQueen', count: 1, delay: 8, interval: 1.0, elite: true, pattern: 'sides' },
  ] });
S({ wave: 47, name: 'Void Court', boss: false, intro: 'The Court convenes.',
  groups: [
    { archetype: 'voidAssassin', count: 5, delay: 0, interval: 0.5, elite: true, pattern: 'ring' },
    { archetype: 'voidMage', count: 4, delay: 3, interval: 0.5, elite: false, pattern: 'sides' },
    { archetype: 'voidRay', count: 6, delay: 6, interval: 0.4, elite: false, pattern: 'spread' },
  ] });
S({ wave: 48, name: 'Apex Predators', boss: false, intro: 'Only the strongest remain.',
  groups: [
    { archetype: 'champion', count: 3, delay: 0, interval: 0.8, elite: true, pattern: 'sides' },
    { archetype: 'reaper', count: 6, delay: 2, interval: 0.4, elite: false, pattern: 'ring' },
    { archetype: 'colossus', count: 1, delay: 8, interval: 1.0, elite: true, pattern: 'spread' },
  ] });
S({ wave: 49, name: 'The Everything', boss: false, intro: 'All of it. At once.',
  groups: [
    { archetype: 'shooter', count: 8, delay: 0, interval: 0.3, elite: false, pattern: 'ring' },
    { archetype: 'charger', count: 6, delay: 2, interval: 0.4, elite: false, pattern: 'sides' },
    { archetype: 'bomber', count: 8, delay: 4, interval: 0.3, elite: false, pattern: 'spread' },
    { archetype: 'tank', count: 2, delay: 8, interval: 1.0, elite: true, pattern: 'sides' },
    { archetype: 'swarmling', count: 20, delay: 10, interval: 0.1, elite: false, pattern: 'cluster' },
  ] });
S({ wave: 50, name: 'The Infinity Core', boss: true, bossId: 'infinityCore', intro: 'It is endless. It is absolute. It is.',
  groups: [
    { archetype: 'voidEye', count: 3, delay: 8, interval: 0.8, elite: true, pattern: 'spread' },
    { archetype: 'strafer', count: 10, delay: 16, interval: 0.3, elite: false, pattern: 'ring' },
    { archetype: 'swarmling', count: 30, delay: 24, interval: 0.08, elite: false, pattern: 'cluster' },
  ] });
S({ wave: 51, name: 'After the End', boss: false, intro: 'You survived. They did not.',
  groups: [
    { archetype: 'warlord', count: 3, delay: 0, interval: 0.6, elite: true, pattern: 'ring' },
    { archetype: 'sniper', count: 6, delay: 3, interval: 0.4, elite: false, pattern: 'spread' },
    { archetype: 'dodger', count: 8, delay: 6, interval: 0.3, elite: false, pattern: 'sides' },
  ] });
S({ wave: 52, name: 'Iron Tide', boss: false, intro: 'The machines march.',
  groups: [
    { archetype: 'tank', count: 3, delay: 0, interval: 0.8, elite: true, pattern: 'sides' },
    { archetype: 'gunner', count: 8, delay: 2, interval: 0.3, elite: false, pattern: 'ring' },
    { archetype: 'shielder', count: 4, delay: 5, interval: 0.5, elite: false, pattern: 'spread' },
  ] });
S({ wave: 53, name: 'Storm Apex', boss: false, intro: 'The storm peaks.',
  groups: [
    { archetype: 'stormcaller', count: 4, delay: 0, interval: 0.6, elite: true, pattern: 'spread' },
    { archetype: 'strafer', count: 10, delay: 2, interval: 0.3, elite: false, pattern: 'ring' },
    { archetype: 'lightningRod', count: 6, delay: 5, interval: 0.4, elite: false, pattern: 'sides' },
  ] });
S({ wave: 54, name: 'Final Swarm', boss: false, intro: 'The last tide.',
  groups: [
    { archetype: 'swarmling', count: 40, delay: 0, interval: 0.08, elite: false, pattern: 'ring' },
    { archetype: 'swarmQueen', count: 2, delay: 4, interval: 1.0, elite: true, pattern: 'sides' },
    { archetype: 'summoner', count: 6, delay: 8, interval: 0.4, elite: false, pattern: 'spread' },
  ] });
S({ wave: 55, name: 'The Nothing', boss: true, bossId: 'theNothing', intro: 'There is nothing after this. Only this.',
  groups: [
    { archetype: 'voidAssassin', count: 4, delay: 10, interval: 0.7, elite: true, pattern: 'spread' },
    { archetype: 'strafer', count: 10, delay: 18, interval: 0.3, elite: false, pattern: 'ring' },
    { archetype: 'swarmling', count: 30, delay: 26, interval: 0.08, elite: false, pattern: 'cluster' },
  ] });
S({ wave: 56, name: 'Beyond', boss: false, intro: 'There should be nothing here.',
  groups: [
    { archetype: 'voidMage', count: 8, delay: 0, interval: 0.3, elite: false, pattern: 'ring' },
    { archetype: 'reaper', count: 8, delay: 3, interval: 0.3, elite: false, pattern: 'sides' },
    { archetype: 'colossus', count: 2, delay: 6, interval: 1.0, elite: true, pattern: 'spread' },
  ] });
S({ wave: 57, name: 'Echoes', boss: false, intro: 'You have been here before.',
  groups: [
    { archetype: 'mirror', count: 10, delay: 0, interval: 0.3, elite: false, pattern: 'ring' },
    { archetype: 'wraith', count: 10, delay: 3, interval: 0.3, elite: false, pattern: 'sides' },
    { archetype: 'dreadguard', count: 2, delay: 6, interval: 1.0, elite: true, pattern: 'spread' },
  ] });
S({ wave: 58, name: 'The Long Dark', boss: false, intro: 'No end in sight.',
  groups: [
    { archetype: 'tank', count: 4, delay: 0, interval: 0.6, elite: true, pattern: 'sides' },
    { archetype: 'sniper', count: 8, delay: 2, interval: 0.3, elite: false, pattern: 'spread' },
    { archetype: 'healer', count: 4, delay: 5, interval: 0.5, elite: false, pattern: 'ring' },
  ] });
S({ wave: 59, name: 'Crescendo', boss: false, intro: 'It builds to something.',
  groups: [
    { archetype: 'shooter', count: 10, delay: 0, interval: 0.25, elite: false, pattern: 'ring' },
    { archetype: 'charger', count: 8, delay: 2, interval: 0.3, elite: false, pattern: 'sides' },
    { archetype: 'bomber', count: 10, delay: 4, interval: 0.25, elite: false, pattern: 'spread' },
    { archetype: 'colossus', count: 3, delay: 8, interval: 0.8, elite: true, pattern: 'sides' },
  ] });
S({ wave: 60, name: 'The End', boss: true, bossId: 'theEnd', intro: 'There is nothing after this. Only this.',
  groups: [
    { archetype: 'voidEye', count: 4, delay: 10, interval: 0.7, elite: true, pattern: 'spread' },
    { archetype: 'strafer', count: 12, delay: 18, interval: 0.25, elite: false, pattern: 'ring' },
    { archetype: 'swarmling', count: 40, delay: 28, interval: 0.06, elite: false, pattern: 'cluster' },
  ] });

// Merge extended scripts into the lookup
for (const s of ExtendedWaveScripts) WaveScripts.push(s);

export const ExtendedWaveScriptCount = ExtendedWaveScripts.length;
export { ExtendedWaveScripts };
