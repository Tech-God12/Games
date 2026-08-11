// ============================================================================
// Tips2.js
// Extended tips, quotes, and flavor text for loading screens, intermissions,
// and the codex. Adds hundreds of additional lines of genuine guidance and
// worldbuilding. Merged into the Tips module on load.
// ============================================================================

const ExtraTips = {
  combat: [
    'Keep one anti-armor weapon and one anti-swarm weapon. The arena tests both.',
    'Knockback is crowd control. Shotguns and harpoons create space when surrounded.',
    'Crit builds scale exponentially — stack chance AND multiplier, not just one.',
    'Status effects tick while you reload. Apply, then reposition.',
    'Headshots multiply. Even a small headshot chance is worth aiming for.',
    'Burst weapons want rhythm. Don\'t mash — let each burst settle.',
    'Charged weapons reward patience. Hold, then release on the elite.',
    'Homing weapons ignore cover. Use them against dodgers and snipers.',
    'Ricochet weapons love corridors. Bounce shots around pillars.',
    'Pierce turns one shot into several. Aim through lines, not at individuals.',
    'Lifesteal + fast fire rate = unkillable against swarms, fragile vs bosses.',
    'AoE clears trash; single-target deletes elites. Know which you\'re firing.',
    'Slow and freeze trivialize chargers. Cryo is a charger\'s worst enemy.',
    'Shock stuns. A stunned enemy can\'t dodge, attack, or flee.',
    'Marked targets take more damage from everything. Mark, then focus.',
    'Burn ignores armor. Bring fire to armored waves.',
    'Damage falloff is real. Shotguns at range are a waste of ammo.',
    'Reload during lulls. A dry magazine mid-flank is a death sentence.',
    'Recoil recovers. Paced shots are more accurate than panicked ones.',
    'Every weapon has a job. Learn the job before you commit to the weapon.',
    'Dual-wielding and burst weapons front-load damage. Good for opening volleys.',
    'Beams ramp. Sustained fire on a single target outpaces burst against bosses.',
    'Melee lifesteal is the strongest sustain in the game. Bring a blade.',
    'Explosions harm you not at all but harm crowds a great deal. Use them.',
    'The arena edge is a wall. Don\'t get cornered — keep the center open.',
  ],
  movement: [
    'Dash through projectiles, not away from them. The i-frames are brief but total.',
    'Never waste a dash repositioning when a charge is incoming. Save it to dodge.',
    'Jumping breaks contact damage. Leap over a charger to dodge its slam.',
    'Strafe, don\'t backpedal. Keep enemies in your view and your escape open.',
    'Standing still is death. Even a slow circle throws off enemy aim.',
    'Use cover to break sniper line-of-sight, then peek to counter-snipe.',
    'Adrenaline Junkie turns dashing into a damage buff. Dash into the fight.',
    'Blink and Phase Walk reposition instantly. Use them to escape surrounds.',
    'Momentum items reward never stopping. Pair with fast weapons.',
    'A cornered operative is a dead operative. Always leave yourself an exit.',
    'Dashing has a cooldown. Track it. Knowing when you can\'t dash is survival.',
    'Kite elites around pillars. They path into the cover; you shoot around it.',
    'High-speed operatives (Raptor, Phantom) should never stop moving.',
    'Jump-dash-jump covers ground fast and dodges ground projectiles.',
    'The minimap shows enemy density. Watch it to avoid walking into a swarm.',
  ],
  economy: [
    'Currency becomes Meta Points between runs. The Skill Tree is permanent power.',
    'Combo kills grant bonus currency. Chain kills for a richer run.',
    'The shop rerolls. Don\'t settle for items that don\'t fit your build.',
    'Scavenger items and perks multiply currency. Stack them for a hoarder run.',
    'Elites drop more. Prioritize them when it\'s safe — the reward is worth it.',
    'Don\'t hoard in a run. Spend on items before you die; deeds don\'t carry.',
    'Wave-clear objectives grant bonus currency. Read your objectives.',
    'Bosses drop a fortune. The risk is the point — the reward is real.',
    'Quartermaster perk grants extra shop offers. Great for finding specific items.',
    'The Heart of Gold curse doubles currency but cuts damage. Rich but slow.',
  ],
  enemies: [
    'Menders heal. Kill them first, always, or the wave never ends.',
    'Bombers detonate on proximity. Shoot them before they reach you.',
    'Splitters divide on death. Clear the swarmlings fast or drown.',
    'Snipers lead their shots. Move erratically to dodge.',
    'Chargers telegraph, then commit. Sidestep the line and punish the recovery.',
    'Shielders grant armor to nearby allies. Strip the protection by killing them.',
    'Summoners spawn adds. Never leave one alive — it only gets worse.',
    'Tanks have shields AND armor. Bring armor pen or energy weapons.',
    'Dodgers weave erratically. Predict their pattern or use homing weapons.',
    'Elites glow gold and drop better. Prioritize when you can; avoid when you can\'t.',
    'Flying enemies ignore ground hazards. Bring anti-air when they swarm.',
    'Frozen enemies can\'t dodge. Cryo into precision is a deadly combo.',
    'Healers flee. Cut off their escape before engaging the front line.',
    'Kamikazes are fast and fragile. One tap is enough — don\'t let them close.',
    'Tanks slam. Watch the telegraph and jump or dash out of the ring.',
    'Void enemies resist kinetics. Energy weapons bypass their resistance.',
    'Crystal enemies resist energy. Kinetic weapons crack them open.',
    'Ghost enemies dodge and phase. Hitscan beats their movement.',
    'Swarm enemies die to one pellet. AoE and spread weapons farm them.',
    'The Juggernaut has doors: shield, armor, then soft. Become a key.',
  ],
  bosses: [
    'Bosses have multiple phases. They escalate at 66% and 33% health.',
    'Phase transitions emit a shockwave and grant brief invulnerability. Don\'t waste ammo.',
    'Radial bursts have gaps. Find a lane and stand in it.',
    'Spiral volleys rotate. Move with the spiral, not against it.',
    'Charge slams telegraph a direction. Be elsewhere when they commit.',
    'Summon phases add mobs — clear them or the boss fight becomes a swarm fight.',
    'Quakes hit a wide radius. Jump or dash out of the ring.',
    'Laser sweeps track slowly. Stay ahead of the beam.',
    'Teleport strikes appear behind you. Keep moving after they vanish.',
    'The boss bar shows phases. Plan your cooldowns around thresholds.',
    'Save your ability and ult for phase 3 — that\'s when bosses get dangerous.',
    'Phoenix Feather and Last Stand revive you once per wave. Save them for bosses.',
    'Bosses drop a full heal, ammo, and a heart. The reward is worth the risk.',
    'Elite adds in boss waves are worth killing for the drops, if you have the space.',
    'The final bosses (Infinity Core, The All) have 4 phases and every ability. Good luck.',
  ],
  biomes: [
    'The Void spawns gravity wells that pull you in. Stay mobile.',
    'Inferno spawns fire patches. Don\'t stand in the glow.',
    'Frostbyte spawns ice that slows. Watch your footing.',
    'Crystal caverns spawn shard storms. Keep moving to avoid the rain.',
    'Cyber sprawl spawns laser grids. Time your dashes through the beams.',
    'Each biome changes the look and hazards, not just the floor texture.',
    'Biome hazards harm enemies too — lure foes into them for free damage.',
    'Higher waves unlock new biomes. Variety is its own reward.',
    'The Neon Nexus is the founding arena — no hazards, just you and them.',
    'Weather is cosmetic but atmospheric: embers rise in Inferno, snow falls in Frost.',
  ],
  builds: [
    'Glass Cannon deals obscene damage but folds to a breeze. Dash is life.',
    'Tank builds survive anything but clear slowly. Pair with AoE for balance.',
    'Status builds scale with power and chance items. Stack them hard.',
    'Lifesteal + fast weapon = unkillable in swarms, fragile vs bosses.',
    'Crit builds want high chance AND multiplier. One without the other is weak.',
    'AoE builds clear crowds but struggle with single elites. Bring a backup.',
    'Pierce + ricochet turns corridors into kill zones.',
    'Fire, frost, and shock each have dedicated items and perks. Commit to one.',
    'Currency builds fund the shop. Rich runs snowball into powerful item stacks.',
    'Hybrid builds are stronger than pure ones. Don\'t over-specialize.',
    'The Skill Tree is permanent. Invest in branches that fit your playstyle.',
    'Weapons mods (scopes, mags, barrels) fine-tune a weapon. Use the shop.',
    'Perks are run-defining. Pick ones that synergize with your items.',
    'Two weapons > one. Carry an anti-swarm and an anti-elite at all times.',
    'The Operative choice sets your starting loadout and passive. Choose to your style.',
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
    'The grid is the Protocol\'s substrate. When it flickers, reality flickers with it.',
    'The Well beneath the arena holds every contender who has ever fallen.',
    'The Wardens do not fight. They referee, impartial as a clock.',
    'The Forge keeps a ledger of every weapon and every wielder. It never issues refunds.',
  ],
};

/** Merge extra tips into the base Tips module on load. */
export function installExtraTips(baseModule) {
  for (const [cat, tips] of Object.entries(ExtraTips)) {
    if (!baseModule.Tips[cat]) baseModule.Tips[cat] = [];
    for (const t of tips) if (!baseModule.Tips[cat].includes(t)) baseModule.Tips[cat].push(t);
  }
}

// Extended kill/wave/level quotes
export const ExtraKillQuotes = [
  'WRECKED', 'MULCHED', 'PULPED', 'SHREDDED', 'LIQUEFIED', 'ATOMIZED', 'VAPORIZED',
  'CREAM-ED', 'SAUCED', 'BEDAZZLED', 'OUTPLAYED', 'OUTCLASSED', 'RELEGATED',
  'BODIED', 'DUNKED', 'STYLED ON', 'READ LIKE A BOOK', 'SENT TO THE SHADOW REALM',
  'DELETED', 'CTRL-Z\'D', '404\'D', 'GG NO RE', 'EZ', 'COOKED', 'SERVED', 'DEALT WITH',
];
export const ExtraWaveClearQuotes = [
  'WAVE CLEARED', 'AREA SECURED', 'PERIMETER CLEAN', 'ALL HOSTILES DOWN',
  'SECTOR PACIFIED', 'THREAT NEUTRALIZED', 'CLEAN SWEEP', 'FLAWLESS',
  'NOTHING LEFT', 'ARENA QUIET', 'BREACH CLOSED', 'CONTAINMENT HELD',
];
export const ExtraLevelUpQuotes = [
  'LEVEL UP', 'POWER SURGE', 'ASCENDING', 'EVOLVING', 'OVERCLOCKED',
  'BREAKTHROUGH', 'TRANSCENDENT', 'AWAKENED', 'EMPOWERED', 'LEVEL UP!',
  'RANK UP', 'POWER UP', 'LEVEL RAISED', 'STRENGTH GAINED',
];

export function installExtraQuotes(baseModule) {
  for (const q of ExtraKillQuotes) if (!baseModule.KillQuotes.includes(q)) baseModule.KillQuotes.push(q);
  for (const q of ExtraWaveClearQuotes) if (!baseModule.WaveClearQuotes.includes(q)) baseModule.WaveClearQuotes.push(q);
  for (const q of ExtraLevelUpQuotes) if (!baseModule.LevelUpQuotes.includes(q)) baseModule.LevelUpQuotes.push(q);
}

export const ExtraTipCount = Object.values(ExtraTips).reduce((n, t) => n + t.length, 0);
