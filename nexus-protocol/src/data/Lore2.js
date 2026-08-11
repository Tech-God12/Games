// ============================================================================
// Lore2.js
// Extended lore codex: deeper entries for every category, plus new sub-areas
// (artifacts, timelines, factions detail, operative dossiers). Merged into
// the Lore module on load so the codex shows a richer world.
// ============================================================================

const ExtraLore = {
  world: [
    { id: 'theGrid', title: 'The Grid', body: 'The emerald grid that floors the founding arena is not decoration. It is the Protocol\'s substrate — the lattice on which consensus reality is computed here. When the grid flickers, reality flickers with it. Veterans learn to read the flicker.' },
    { id: 'theRim', title: 'The Rim', body: 'The glowing rim of the arena is the boundary of the stabilized bubble. Step beyond it and you are not in the Nexus anymore — you are in whatever the Nexus has not yet decided to be. Nobody who has crossed the rim has returned to describe it.' },
    { id: 'theWell', title: 'The Well', body: 'Beneath the grid, veterans say, is the Well — a reservoir of every contender who has ever fallen. The Forge draws from it. The Swarm nests in it. The Void Court whispers that the Well is the real Nexus, and the arena is just its lid.' },
    { id: 'cycles', title: 'The Cycles', body: 'The Nexus runs in cycles. Each cycle begins with the founding arena and ends — if a contender lasts — with the Devourer. No contender has ended a cycle. The Wardens insist the cycles are tests. The Forge insists they are products. The Court insists they are meals.' },
    { id: 'stability', title: 'Stability', body: 'The arena is stable. Mostly. Biomes are stable snapshots. Hazards are stable instabilities. The further you push, the less stable stability becomes. By wave forty, the grid stops pretending it is a floor and starts pretending it is a ceiling.' },
  ],
  factions: [
    { id: 'wardens2', title: 'The Wardens\' Code', body: 'The Wardens do not fight. They referee. Their code is simple: the Protocol must be upheld, the cycles must continue, the guardians must be deployed on schedule. They are impartial in the way a clock is impartial.' },
    { id: 'survivors2', title: 'The Contenders\' Pact', body: 'Contenders share no formal alliance — they compete for the Nexus alone. But a loose pact holds: knowledge is shared, currency is traded, and the codex is open to all. The dead leave their notes for the living. It is the closest thing to kindness the arena has.' },
    { id: 'swarm2', title: 'The Swarm\'s Logic', body: 'The Swarm does not plan. It propagates. A single swarmling becomes a tide; a tide becomes a queen; a queen becomes a hive lord. The logic is cancer, not conquest. It does not want the Nexus. It wants to be the Nexus.' },
    { id: 'voidcourt2', title: 'The Court\'s Hunger', body: 'The Void Court are remnants of consumed realities. They are incomplete — partly here, partly not. They came to the Nexus to become whole again. If they ever succeed, the Nexus becomes the next consumed reality. The Wardens pretend not to notice.' },
    { id: 'forge2', title: 'The Forge\'s Ledger', body: 'The Forge keeps a ledger of every weapon it has ever built and every contender who has ever wielded it. The ledger is fair: it charges exactly what a thing is worth, no more. It is also final: the Forge has never issued a refund. It has, however, been known to repo.' },
  ],
  weapons: [
    { id: 'sidearm2', title: 'The Sidearm\'s Truth', body: 'The Wardens issue the Sidearm not as a kindness but as a diagnostic. How far a contender gets with only the Sidearm is how the Wardens measure their potential. Those who clear ten waves with it alone are flagged for early guardian deployment. The Protocol does not enjoy being embarrassed.' },
    { id: 'bfg2', title: 'The BFG\'s Cost', body: 'The Nexus BFG was the Forge\'s first and only attempt at a weapon that solves problems non-specifically. It solved the test problem. It also solved the test chamber, the test observer, and three adjacent test chambers. The Forge decided the cost of building a second was a cost it could not afford.' },
    { id: 'excalibur2', title: 'Excalibur\'s Pull', body: 'Excalibur chooses its wielder as much as the wielder chooses it. Operatives who carry it report a faint pull toward the nearest elite — a pull that grows stronger the longer they ignore it. The blade does not like to be sheathed when something worthy is near.' },
    { id: 'oblivion2', title: 'Oblivion\'s Magazine', body: 'Oblivion has a magazine of two. The Forge built it this way on purpose: one shot for the problem, one shot for whoever brought the problem. Contenders who fire the second shot at the problem are, in the Forge\'s quiet opinion, using it wrong.' },
    { id: 'voidReaper2', title: 'The Void Reaper\'s Ledger', body: 'The Void Reaper keeps no ledger of its own — the Court keeps one for it. Every mark the Reaper leaves is a debt the Court intends to collect. Wielding it is, in a real sense, working for the Court. The wage is survival. The retirement is not.' },
  ],
  enemies: [
    { id: 'drone2', title: 'The Drone\'s Gaze', body: 'A Drone\'s single eye is a camera. It feeds the Wardens\' observation of the arena. Killing a Drone does not blind them — there are always more — but it does deny them a few frames. Veterans call it \'winking.\'' },
    { id: 'swarmling2', title: 'The Swarmling\'s Name', body: 'Swarmlings have no names. The Swarm does not name its cells. The Forge, in a rare moment of sentiment, names them posthumously in its ledger — a running list of small defeats that it finds quietly moving.' },
    { id: 'brute2', title: 'The Brute\'s Patience', body: 'A Brute telegraphs its slam because the Protocol insists on fairness, even from monsters. The Brute itself is not patient — it would rather not telegraph. The Wardens make it. The Brute resents this. You can see the resentment in its eyes, briefly, before the slam.' },
    { id: 'mender2', title: 'The Mender\'s Faith', body: 'Menders heal because they believe the Swarm should survive. They are, in their way, the Swarm\'s most faithful. They are also the Swarm\'s most correct strategy. Killing them first is not cruelty — it is the Protocol\'s most efficient prayer.' },
    { id: 'tank2', title: 'The Juggernaut\'s Doors', body: 'The Juggernaut\'s shield is a door. The Juggernaut\'s armor is a door. Behind the doors is a smaller, softer thing that really does not want to be found. The correct response to a Juggernaut is to become a key.' },
  ],
  bosses: [
    { id: 'sentinel2', title: 'The Sentinel\'s Yawn', body: 'The Sentinel is the first guardian and, veterans suspect, the only one who finds the cycles tedious. Its radial burst is, in a sense, a shrug. Its summons are an attempt to share the workload. Killing it is doing it a favor it will not admit.' },
    { id: 'warbringer2', title: 'The Warbringer\'s Line', body: 'The Warbringer commits to a charge and does not deviate. This is its strength and its joke: a contender who sidesteps the line watches the Warbringer run itself into the rim. The Wardens have asked it to turn. It has refused. It lives for the line, not the arrival.' },
    { id: 'tempest2', title: 'The Tempest\'s Boredom', body: 'The Tempest sweeps the arena with light because standing still bores it. It teleports because walking bores it. It summons because fighting alone bores it. The only thing that does not bore it is a contender who refuses to die. Become interesting. It will give you its full attention, briefly.' },
    { id: 'overlord2', title: 'The Overlord\'s Office', body: 'The Overlord treats the arena as an office it never leaves. Its phases are shifts. Its summons are staff. Its laser sweep is, apparently, its idea of a coffee break. Defeating it is, in its view, a resignation it has been waiting for.' },
    { id: 'devourer2', title: 'The Devourer\'s Question', body: 'The Devourer does not speak. But contenders who last long enough against it report a feeling — a question pressed into the back of the skull, wordless and vast: \'what comes after?\' The Devourer does not know. It is, perhaps, here to find out. So are you.' },
  ],
  operatives: [
    { id: 'ranger2', title: 'The Ranger\'s Notebook', body: 'The Ranger keeps a notebook of every death. Not to mourn — to study. Each entry is a sentence: where, what, why, and what to do next time. The notebook is full. The Ranger is still here. That is the advertisement.' },
    { id: 'berserker2', title: 'The Berserker\'s Threshold', body: 'The Berserker fights better hurt. This is not bravery; it is biology. Below half health, the Berserker\'s body stops reporting pain and starts reporting opportunity. The Protocol considers this a feature. The Berserker considers it a Tuesday.' },
    { id: 'mage2', title: 'The Arcanist\'s Recipe', body: 'The Arcanist treats combat as chemistry: enemies are reagents, status effects are catalysts, and fire is, frequently, the answer. The Arcanist\'s lab coat is purely ceremonial. The explosions are not.' },
    { id: 'phantom2', title: 'The Phantom\'s Seconds', body: 'The Phantom treats seconds as a currency and spends them carefully: a dash here, a slow there, a strike between heartbeats. The Phantom dies if touched. The Phantom is rarely touched. The Phantom is, the Wardens suspect, a little smug about this.' },
    { id: 'warden_op2', title: 'The Warden\'s Defection', body: 'No one knows if the operative called Warden is an actual Warden who defected, or a contender who took the name. The Warden will not say. The other Wardens will not say. The shields, however, work, and the rockets land. The Protocol accepts results.' },
  ],
  events: [
    { id: 'firstDescent2', title: 'The First Descent, Detailed', body: 'The first descent is the same for everyone: the grid lights, a Drone drifts in, the Sidearm kicks. Most contenders also remember the first time the grid turned red — the moment they understood the arena was not on their side. It is never on anyone\'s side. It is only on the cycle\'s side.' },
    { id: 'theTurn2', title: 'The Turn, Precisely', body: 'The Turn is not a single moment but a slope. Somewhere between wave twelve and wave fifteen, the arena stops testing and starts ending. Hazards bloom. Elites walk. The Protocol\'s courtesy — telegraphs, fairness, named waves — thins. By the Turn, you are no longer a student. You are the lesson.' },
    { id: 'guardians2', title: 'The Guardians\' Schedule', body: 'Every fifth wave, on schedule, a guardian manifests. The schedule is the one thing the Wardens will not negotiate. A contender may pause, shop, breathe — but the fifth wave comes. The guardian comes. The only variable is which one. The Wardens rotate them. They will not say why in this order. They will say it is fair.' },
    { id: 'reforgingDay2', title: 'Reforging Day, in Full', body: 'On Reforging Day the Forge opens its full catalog. Currency earned in death becomes power for the next descent. The wise spend before the next fall; the hoarded deed buys nothing in the Well. The Forge does not warn you. The codex does. Read it.' },
    { id: 'theEnd2', title: 'The End, Speculated', body: 'No contender has reached the end. The Protocol does not confirm one exists. The Devourer is said to be the last guardian — or the first of something worse. The Infinity Core is said to be the arena\'s heart. The Nothing is said to be what waits when the heart stops. Nobody knows. The Well keeps its secrets. The cycle keeps turning.' },
  ],
  artifacts: [
    { id: 'phoenixAsh2', title: 'The Phoenix Ash', body: 'Phoenix Ash is a recovered relic: a handful of cinders that, when carried, refuse to let a contender die the first time each cycle. The Forge cannot reproduce it. The Wardens cannot explain it. The Court, quietly, wants it back.' },
    { id: 'voidReaperRelic', title: 'The Void Reaper\'s Shard', body: 'A shard of the Void Reaper itself, recovered from a cycle that almost ended. It hums. It marks. It is, the Court insists, stolen property. Wielding it is a statement. The statement is: come and take it.' },
    { id: 'keystoneRelic', title: 'The Keystone', body: 'The Keystone is a key to nothing anyone has found. It resonates with every fifth shot. It is, the Forge theorizes, a calibration tool for something larger — perhaps the grid itself. Perhaps the cycle. Perhaps the lock the Devourer is the key to.' },
  ],
};

/** Merge extra lore into the base Lore module on load. */
export function installExtraLore(baseModule) {
  for (const [cat, entries] of Object.entries(ExtraLore)) {
    if (!baseModule.Lore[cat]) baseModule.Lore[cat] = [];
    for (const e of entries) if (!baseModule.Lore[cat].some(x => x.id === e.id)) baseModule.Lore[cat].push(e);
    if (!baseModule.LoreCategories.includes(cat)) baseModule.LoreCategories.push(cat);
  }
}

export const ExtraLoreCategoryCount = Object.keys(ExtraLore).length;
export const ExtraLoreEntryCount = Object.values(ExtraLore).reduce((n, e) => n + e.length, 0);
