// ============================================================================
// Tips.js
// Loading-screen and intermission tips, plus flavor quotes shown between
// waves. Categorized by topic (combat, movement, economy, enemies, bosses,
// biomes, lore). The UI rotates through these during downtime.
// ============================================================================

export const TipCategories = ['combat', 'movement', 'economy', 'enemies', 'bosses', 'biomes', 'builds', 'lore'];

export const Tips = {
  combat: [
    'Headshots deal bonus damage with most weapons. Aim for the dome on elites.',
    'Crit chance and crit multiplier stack — build both for exponential damage.',
    'Lifesteal turns aggressive builds into sustain builds. Vampiric items love fast weapons.',
    'Knockback can save your life — shotguns and the harpoon punt chargers away.',
    'Pierce lets one shot hit multiple enemies. Combine with tight corridors for value.',
    'AoE weapons clear swarms; precision weapons delete elites. Carry one of each.',
    'Status effects stack: burn, shock, and poison all tick simultaneously.',
    'Marked enemies take more damage from all sources. Mark, then unload.',
    'Slow and freeze lock down fast enemies. Cryo is a charger\'s worst enemy.',
    'Shocked enemies are easier to hit — chain lightning items multiply this.',
    'Damage falloff means shotguns are pointless at range. Get close.',
    'Recoil recovers over time — paced shots are more accurate than panicked ones.',
    'Reload during lulls, not mid-firefight. A dry magazine is a death sentence.',
    'Burst weapons reward trigger discipline. Let the burst settle before re-firing.',
    'Charged weapons release for up to 3x damage. Hold, then unleash on elites.',
  ],
  movement: [
    'Dashing grants brief invulnerability. Dash through projectiles, not away from them.',
    'Dash has a cooldown — don\'t waste it repositioning when you might need it to dodge.',
    'Jumping breaks contact damage. Leap over chargers to dodge their slam.',
    'Strafing is more survivable than backpedaling. Keep enemies in view.',
    'Standing still is death. Even slow movement throws off enemy aim.',
    'Use cover to break line of sight from snipers, then peek to counter-snipe.',
    'The arena edge is a wall — don\'t get cornered. Keep the center as an option.',
    'Adrenaline Junkie perk makes dashing a damage buff, not just an escape.',
    'Phase Walk and Blink abilities reposition you instantly. Use them to escape surrounds.',
    'Movement-based damage items reward never stopping. Combine with fast weapons.',
  ],
  economy: [
    'Currency persists between runs as Meta Points. Spend it in the Skill Tree.',
    'Combo kills grant bonus currency. Chain kills for a richer run.',
    'The shop refreshes offers — reroll if nothing fits your build.',
    'Scavenger items and perks multiply currency. Stack them for a hoarder build.',
    'Elites drop more currency. Prioritize them when you can.',
    'Don\'t hoard currency in a run — spend it on items before you die.',
    'Wave-clear objectives grant bonus currency. Check your active objectives.',
    'Bosses drop a fortune. The risk is worth the reward.',
  ],
  enemies: [
    'Menders heal allies. Kill them first, always, or the wave never ends.',
    'Bombers detonate on proximity. Shoot them before they reach you.',
    'Splitters divide on death. Clear the swarmlings quickly or drown.',
    'Snipers lead their shots. Keep moving to dodge their bolts.',
    'Chargers telegraph, then commit. Sidestep the line and punish the recovery.',
    'Shielders grant armor to nearby enemies. Strip the protection by killing them.',
    'Summoners spawn adds. Never leave a summoner alive — it only gets worse.',
    'Tanks have shields AND armor. Bring armor penetration or energy weapons.',
    'Dodgers weave erratically. Predict their pattern or use homing weapons.',
    'Elites are tougher and drop better. They glow gold — prioritize or avoid.',
    'Flying enemies ignore ground hazards. Bring anti-air when they swarm.',
    'Frozen enemies can\'t dodge. Cryo into precision is a deadly combo.',
  ],
  bosses: [
    'Bosses have multiple phases. They escalate at 66% and 33% health.',
    'Phase transitions emit a shockwave and grant brief invulnerability. Don\'t waste ammo.',
    'Radial bursts have gaps — find a lane and stand in it.',
    'Spiral volleys rotate. Move with the spiral, not against it.',
    'Charge slams telegraph a direction. Be elsewhere when they commit.',
    'Summon phases add mobs — clear them or the boss fight becomes a swarm fight.',
    'Quakes hit a wide radius. Jump or dash out of the ring.',
    'Laser sweeps track slowly. Stay ahead of the beam.',
    'Teleport strikes appear behind you. Keep moving after they vanish.',
    'Boss health bars show phases. Plan your cooldowns around thresholds.',
    'Save your ability and ult for phase 3 — that\'s when bosses get dangerous.',
    'Phoenix Feather and Last Stand revive you once per wave. Save them for bosses.',
  ],
  biomes: [
    'The Void spawns gravity wells that pull you in. Stay mobile.',
    'Inferno spawns fire patches. Don\'t stand in the glow.',
    'Frostbyte spawns ice that slows. Watch your footing.',
    'Crystal caverns spawn shard storms. Keep moving to avoid the rain.',
    'Cyber sprawl spawns laser grids. Time your dashes through the beams.',
    'Each biome changes the arena\'s look and hazards, not just the floor texture.',
    'Biome hazards harm enemies too — lure foes into them for free damage.',
    'Higher waves unlock new biomes. Variety is its own reward.',
  ],
  builds: [
    'Glass Cannon builds deal obscene damage but fold to a stiff breeze. Dash is life.',
    'Tank builds survive anything but clear slowly. Pair with AoE for balance.',
    'Status builds scale with status power and chance items. Stack them hard.',
    'Lifesteal + fast weapon = unkillable in swarms, fragile vs bosses.',
    'Crit builds want high crit chance AND multiplier. One without the other is weak.',
    'AoE builds clear crowds but struggle with single elites. Bring a backup.',
    'Pierce + ricochet turns corridors into kill zones.',
    'Fire, frost, and shock each have dedicated items and perks. Commit to one element.',
    'Currency builds fund the shop. Rich runs snowball into powerful item stacks.',
    'Hybrid builds are stronger than pure ones. Don\'t over-specialize.',
  ],
  lore: [
    'The Nexus is a contested junction of realities. Holding it means holding power.',
    'The Protocol governs combat here. Death is tuition, not the end.',
    'Every fifth wave, a guardian manifests. They are the Wardens\' champions.',
    'The Forge trades weaponry for the currency of deeds. Its prices are fair.',
    'No contender has reached the end of the Nexus. The Protocol does not confirm one exists.',
    'The Swarm has no leaders — only density. The Hive Lord is its densest expression.',
    'The Void Court slipped in from dead realities. They want the rest of themselves back.',
    'The Devourer is said to be the last guardian — or the first of something worse.',
  ],
};

/** Get a random tip from a category (or any category). */
export function randomTip(rng, category = null) {
  const cats = category ? [category] : TipCategories;
  const cat = rng.pick(cats);
  const tips = Tips[cat] || Tips.combat;
  return { category: cat, text: rng.pick(tips) };
}

/** All tips flattened. */
export function allTips() {
  const out = [];
  for (const cat of TipCategories) for (const t of Tips[cat]) out.push({ category: cat, text: t });
  return out;
}

export const TipCount = allTips().length;

// ---- Kill quotes (shown briefly on elite/boss kills) ----
export const KillQuotes = [
  'EXTERMINATED', 'OBLITERATED', 'ANNIHILATED', 'ERASED', 'VAPORIZED', 'SHATTERED',
  'DEMOLISHED', 'WRECKED', 'RUINED', 'PURGED', 'CLEANSED', ' dismantled ', 'deleted',
  'REKT', 'GG', 'BYE', 'GONE', 'FINISHED', 'TERMINATED', 'ELIMINATED',
];

export function randomKillQuote(rng) { return rng.pick(KillQuotes); }

// ---- Wave-clear quotes ----
export const WaveClearQuotes = [
  'WAVE CLEARED', 'AREA SECURED', 'PERIMETER CLEAN', 'ALL HOSTILES DOWN',
  'SECTOR PACIFIED', 'THREAT NEUTRALIZED', 'CLEAN SWEEP', 'FLAWLESS',
];

export function randomWaveClearQuote(rng) { return rng.pick(WaveClearQuotes); }

// ---- Level-up quotes ----
export const LevelUpQuotes = [
  'LEVEL UP', 'POWER SURGE', 'ASCENDING', 'EVOLVING', 'OVERCLOCKED',
  'BREAKTHROUGH', 'TRANSCENDENT', 'AWAKENED', 'EMPOWERED',
];

export function randomLevelUpQuote(rng) { return rng.pick(LevelUpQuotes); }
