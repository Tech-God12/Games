// ============================================================================
// Lore.js
// In-universe lore codex entries shown in the Codex screen. Entries are
// grouped by category and written as diegetic records recovered from the
// Nexus. Pure data — consumed by the codex UI.
// ============================================================================

export const LoreCategories = ['world', 'factions', 'weapons', 'enemies', 'bosses', 'operatives', 'events'];

export const Lore = {
  world: [
    { id: 'nexus', title: 'The Nexus', body: 'The Nexus is a contested dimensional junction — a crossroads where realities bleed into one another. Whoever holds the Nexus holds the power to shape worlds. The arena is its heart: a stabilised bubble of consensus reality ringed by an emerald grid.' },
    { id: 'protocol', title: 'The Protocol', body: 'The Protocol is the compact that governs combat within the Nexus. Combatants are bound to its terms: fight, fall, and be reforged. Death is not the end here — it is a tuition. Every run teaches the Protocol a little more about you.' },
    { id: 'biomes', title: 'The Shifting Arenas', body: 'The arena cycles through a dozen stable configurations — biomes. Each is a snapshot of a world the Nexus has consumed: the founding Neon, the lightless Void, the Crystal caverns, the Inferno grid, the Frostbyte expanse, the Cyber sprawl. Each carries its own hazards.' },
    { id: 'waves', title: 'The Waves', body: 'The Nexus tests its contenders in waves. Each wave is a curated assault; every fifth, a guardian manifests. Survive long enough and the arena itself begins to turn against you — hazards bloom, the grid narrows, and the guardians grow desperate.' },
    { id: 'respawn', title: 'Reforging', body: 'To die in the Nexus is to be reforged. Memory persists; power does not. You return to the founding arena with nothing but what you have learned and the currency of your deeds. The wise spend it before the next descent.' },
  ],
  factions: [
    { id: 'wardens', title: 'The Wardens', body: 'The Wardens maintain the Protocol. They are not your allies — they are the referees. They deploy the arenas, calibrate the waves, and unleash the guardians. Cross them and the grid itself will reject you.' },
    { id: 'survivors', title: 'The Contenders', body: 'Operatives who enter the Nexus to claim it. They come from every consumed world: soldiers, mages, saboteurs, phantoms. All are bound by the Protocol. None have succeeded. Yet.' },
    { id: 'swarm', title: 'The Swarm', body: 'A self-replicating machine ecology that infests the lower strata of the Nexus. It has no leaders and no goals beyond propagation. The Hive Lord is its densest expression — a thinking tumor of a million drones.' },
    { id: 'voidcourt', title: 'The Void Court', body: 'Entities that slipped into the Nexus from realities that no longer exist. They are partly here and partly not, and they want the rest of themselves back. The Void Eye and the Nightmare are their emissaries.' },
    { id: 'forge', title: 'The Forge', body: 'A faction of artificers who trade weaponry for the currency of deeds. They built much of the arsenal the contenders wield. Their prices are fair; their wares are not.' },
  ],
  weapons: [
    { id: 'sidearm', title: 'The Sidearm', body: 'Every contender begins with one. The Wardens issue it as a reminder: skill, not steel, is the measure of an operative. Veterans clear whole waves with nothing else.' },
    { id: 'bfg', title: 'The Nexus BFG', body: 'A Forge experiment in overkill. It fires a plasma orb so dense it pierces, detonates, pierces again, and detonates again. The Forge denies building a second one.' },
    { id: 'excalibur', title: 'Excalibur', body: 'A blade pulled from a consumed world of legends. It does not cut so much as decide. In the right hands it is the most humane weapon in the arena — deaths are instantaneous.' },
    { id: 'oblivion', title: 'Oblivion', body: 'A single shot. A single solution. The Forge built Oblivion to end debates. It has a magazine of two because one is for the problem and one is for the person who brought the problem.' },
    { id: 'voidReaper', title: 'The Void Reaper', body: 'A scything beam laced with void-stuff. It marks what it cannot immediately kill, and what it marks, the Court eventually collects.' },
  ],
  enemies: [
    { id: 'drone', title: 'The Drone', body: 'The Protocol\'s opening gambit. A floating recon unit, slow and persistent. Drones are the alphabet the Nexus uses to write your death.' },
    { id: 'swarmling', title: 'The Swarmling', body: 'Individually trivial. Collectively, the most common cause of death in the founding arena. The Swarm does not mourn them; it does not even count them.' },
    { id: 'brute', title: 'The Brute', body: 'A brawler built to close distance and pound. Its ground-slam is telegraphed — the Protocol insists on fairness, even from monsters.' },
    { id: 'bomber', title: 'The Bomber', body: 'A drone packed with unstable charge. It wants to be your friend — very, very closely. Shoot it early, or make peace with the blast.' },
    { id: 'splitter', title: 'The Splitter', body: 'An amoeboid that refuses to die quietly. Kill it and it becomes three problems. Kill those and they become swarmlings. The math is not in your favor.' },
    { id: 'healer', title: 'The Mender', body: 'A support unit that mends its allies. The Protocol permits it because it punishes those who ignore priority targets. Kill the Mender first. Always first.' },
    { id: 'tank', title: 'The Juggernaut', body: 'A walking fortress: shields, armor, a shockwave slam. It is the answer to contenders who lean on a single weapon. Bring variety, or bring patience.' },
  ],
  bosses: [
    { id: 'sentinel', title: 'The Sentinel', body: 'The first guardian. The Wardens deploy it to measure whether a contender has learned the basics. It radial-bursts, it volleys, it summons. Beneath its patience is a killing machine.' },
    { id: 'warbringer', title: 'The Warbringer', body: 'An engine of ruin that lives for the charge. It telegraphs, then commits to a line — sidestep the line and punish the recovery. Failing to respect the slam is the most common death at wave ten.' },
    { id: 'tempest', title: 'The Tempest', body: 'A storm given a body. It hovers, it spirals, it sweeps the arena with light. Its teleport-strike punishes standing still. Keep moving, keep shooting, keep praying.' },
    { id: 'leviathan', title: 'The Leviathan', body: 'The Swarm\'s queen. It does not fight so much as manufacture. Left alone it drowns the arena in swarmlings. The only correct response is overwhelming, immediate violence.' },
    { id: 'overlord', title: 'The Overlord', body: 'The master of the arena, and the Wardens\' champion. It does everything the other guardians do, all at once, faster. Reaching it is an achievement; surviving it is a legend.' },
    { id: 'devourer', title: 'The Devourer', body: 'The end the Void Court sends when all else fails. It has come to consume — the arena, the contenders, the Protocol itself. There is no lore beyond it, only the question of whether anything comes after.' },
  ],
  operatives: [
    { id: 'ranger', title: 'The Ranger', body: 'The founding operative. Balanced, reliable, issued to every new contender. The Ranger is the yardstick against which all others are measured — and the one most often underestimated.' },
    { id: 'berserker', title: 'The Berserker', body: 'A close-range brawler who trades safety for ferocity. Below half health, the Berserker stops being a person and becomes a problem. The Protocol approves.' },
    { id: 'mage', title: 'The Arcanist', body: 'A weaver of energy and status. Fragile, but the Arcanist turns the arena into a chemistry set where enemies are reagents and fire is the answer.' },
    { id: 'phantom', title: 'The Phantom', body: 'A time-bender who treats seconds as a resource. Dash, slow, strike, vanish. The Phantom dies if touched — and is rarely touched.' },
    { id: 'warden_op', title: 'The Warden', body: 'An operative who took the Wardens\' name and their shields. Slow, armored, explosive. A wall that walks and detonates.' },
  ],
  events: [
    { id: 'firstDescent', title: 'The First Descent', body: 'Every contender remembers their first. The grid lighting up, the first drone drifting in, the first time the Sidearm kicks. Most also remember their first death. It comes quickly.' },
    { id: 'theTurn', title: 'The Turn', body: 'Somewhere around wave twelve, the arena stops being fair. Hazards bloom, elites walk, and the Protocol stops pretending this is a test. This is the Turn. Many do not survive it.' },
    { id: 'guardians', title: 'The Guardians', body: 'Every fifth wave, the Wardens deploy a guardian. Each is a thesis on a different way to die. Defeating one is a lesson; defeating all of them is a statement.' },
    { id: 'reforgingDay', title: 'Reforging Day', body: 'When a contender finally falls, the Forge is waiting. Currency becomes power, deeds become upgrades, and the descent begins again. The Nexus is generous to those who return.' },
    { id: 'theEnd', title: 'The End', body: 'No contender has reached the end. The Protocol does not confirm one exists. The Devourer, they say, is the last guardian — or the first of something worse. Nobody knows. Nobody has come back to say.' },
  ],
};

export function allLoreEntries() {
  const out = [];
  for (const cat of LoreCategories) for (const e of Lore[cat]) out.push({ ...e, category: cat });
  return out;
}
export function loreByCategory(cat) { return Lore[cat] || []; }
