/**
 * VOIDBREAK — Upgrade definitions.
 *
 * The roguelite backbone: after each cleared wave the player picks one of
 * three cards. Upgrades modify weapon stats, player stats, or grant perks
 * with unique hooks. Rarities: common / rare / epic / legendary.
 *
 * Each entry: { id, name, desc, rarity, type, tags[], data{} }
 * The actual application logic lives in upgrade_db.js.
 */

export const RARITY = Object.freeze({
  common: { label: 'COMMON', color: '#8fa6bf', weight: 60, maxStacks: 5 },
  rare: { label: 'RARE', color: '#4d9fff', weight: 28, maxStacks: 4 },
  epic: { label: 'EPIC', color: '#b26bff', weight: 9, maxStacks: 3 },
  legendary: { label: 'LEGENDARY', color: '#ffd166', weight: 3, maxStacks: 2 },
});

export const UPGRADE_DEFS = [
  // ============================================================ WEAPON MODS
  { id: 'dmg_1', name: 'High-Caliber Rounds', rarity: 'common', type: 'weapon', desc: '+18% weapon damage', tags: ['damage'] },
  { id: 'dmg_2', name: 'Penetrator Rounds', rarity: 'rare', type: 'weapon', desc: '+30% weapon damage', tags: ['damage'] },
  { id: 'dmg_3', name: 'Annihilator Core', rarity: 'epic', type: 'weapon', desc: '+45% weapon damage', tags: ['damage'] },
  { id: 'rof_1', name: 'Overclocked Actuator', rarity: 'common', type: 'weapon', desc: '+15% fire rate', tags: ['fireRate'] },
  { id: 'rof_2', name: 'Rapid Cyclone Mod', rarity: 'rare', type: 'weapon', desc: '+25% fire rate', tags: ['fireRate'] },
  { id: 'reload_1', name: 'Quick Reload Drone', rarity: 'common', type: 'weapon', desc: '+20% reload speed', tags: ['reload'] },
  { id: 'reload_2', name: 'Auto-Loader Rig', rarity: 'rare', type: 'weapon', desc: '+35% reload speed', tags: ['reload'] },
  { id: 'mag_1', name: 'Extended Magazine', rarity: 'common', type: 'weapon', desc: '+25% magazine size', tags: ['mag'] },
  { id: 'mag_2', name: 'Drum Mag', rarity: 'rare', type: 'weapon', desc: '+50% magazine size', tags: ['mag'] },
  { id: 'spread_1', name: 'Stabilizer Grip', rarity: 'common', type: 'weapon', desc: '-25% weapon spread', tags: ['spread'] },
  { id: 'spread_2', name: 'Laser Tracker', rarity: 'rare', type: 'weapon', desc: '-40% weapon spread', tags: ['spread'] },
  { id: 'multishot_1', name: 'Splitter Array', rarity: 'epic', type: 'weapon', desc: 'Weapons fire +1 extra projectile', tags: ['multishot'] },
  { id: 'multishot_2', name: 'Splinter Storm', rarity: 'legendary', type: 'weapon', desc: 'Weapons fire +2 extra projectiles', tags: ['multishot'] },
  { id: 'pierce_1', name: 'Phase Rounds', rarity: 'rare', type: 'weapon', desc: 'Projectiles pierce +1 enemy', tags: ['pierce'] },
  { id: 'pierce_2', name: 'Void Phasing', rarity: 'epic', type: 'weapon', desc: 'Projectiles pierce +2 enemies', tags: ['pierce'] },
  { id: 'crit_1', name: 'Tactical Analyzer', rarity: 'rare', type: 'weapon', desc: '+8% critical chance', tags: ['crit'] },
  { id: 'crit_2', name: 'Lethal Instinct Chip', rarity: 'epic', type: 'weapon', desc: '+15% critical chance', tags: ['crit'] },
  { id: 'headhunter', name: 'Headhunter', rarity: 'rare', type: 'weapon', desc: '+50% headshot damage', tags: ['headshot'] },
  { id: 'ammo_1', name: 'Ammo Synthesizer', rarity: 'common', type: 'weapon', desc: '+40% reserve ammo', tags: ['ammo'] },
  { id: 'ammo_regen', name: 'Recycler Core', rarity: 'epic', type: 'weapon', desc: 'Regenerate 2 ammo per second to the active weapon', tags: ['ammoRegen'] },
  { id: 'element_burn', name: 'Thermal Rounds', rarity: 'rare', type: 'weapon', desc: 'Weapons ignite enemies (burn damage over time)', tags: ['element'] },
  { id: 'element_shock', name: 'Tesla Coating', rarity: 'rare', type: 'weapon', desc: 'Weapons stun enemies on hit', tags: ['element'] },
  { id: 'element_cryo', name: 'Cryo Rounds', rarity: 'rare', type: 'weapon', desc: 'Weapons slow enemies on hit', tags: ['element'] },
  { id: 'explosion_1', name: 'Bigger Bangs', rarity: 'rare', type: 'weapon', desc: '+40% explosion radius', tags: ['explosion'] },
  { id: 'explosion_2', name: 'Chain Reaction', rarity: 'epic', type: 'weapon', desc: '+70% explosion radius', tags: ['explosion'] },
  { id: 'sway_reduce', name: 'Gyro Stabilizers', rarity: 'common', type: 'weapon', desc: 'Recoil recovers 40% faster', tags: ['recoil'] },
  { id: 'lifesteal_1', name: 'Vampiric Rounds', rarity: 'rare', type: 'weapon', desc: 'Heal 4% of damage dealt', tags: ['lifesteal'] },
  { id: 'lifesteal_2', name: 'Void Leech', rarity: 'epic', type: 'weapon', desc: 'Heal 9% of damage dealt', tags: ['lifesteal'] },

  // ============================================================ PLAYER MODS
  { id: 'hp_1', name: 'Nano-Weave Armor', rarity: 'common', type: 'player', desc: '+25 max health', tags: ['health'] },
  { id: 'hp_2', name: 'Titan Plating', rarity: 'rare', type: 'player', desc: '+50 max health', tags: ['health'] },
  { id: 'hp_regen', name: 'Regenerative Nanites', rarity: 'rare', type: 'player', desc: 'Regenerate 2 health per second after 6s without damage', tags: ['regen'] },
  { id: 'shield_1', name: 'Shield Capacitor', rarity: 'common', type: 'player', desc: '+25 max shields', tags: ['shield'] },
  { id: 'shield_2', name: 'Aegis Generator', rarity: 'rare', type: 'player', desc: '+50 max shields', tags: ['shield'] },
  { id: 'shield_regen', name: 'Fast Charge', rarity: 'common', type: 'player', desc: 'Shields recharge 35% faster and start 1s sooner', tags: ['shieldRegen'] },
  { id: 'speed_1', name: 'Servo Legs', rarity: 'common', type: 'player', desc: '+10% move speed', tags: ['speed'] },
  { id: 'speed_2', name: 'Hyper Coils', rarity: 'rare', type: 'player', desc: '+20% move speed', tags: ['speed'] },
  { id: 'jump_1', name: 'Compression Springs', rarity: 'common', type: 'player', desc: '+20% jump height', tags: ['jump'] },
  { id: 'jump_2', name: 'Zero-G Boots', rarity: 'rare', type: 'player', desc: 'Double jump unlocked', tags: ['doubleJump'] },
  { id: 'dash_1', name: 'Quick-Dash', rarity: 'common', type: 'player', desc: '-30% dash cooldown', tags: ['dash'] },
  { id: 'dash_2', name: 'Blink Core', rarity: 'epic', type: 'player', desc: '-50% dash cooldown and +20% dash speed', tags: ['dash'] },
  { id: 'magnet_1', name: 'Magnetic Field', rarity: 'common', type: 'player', desc: 'Pickups attract from further away', tags: ['magnet'] },
  { id: 'magnet_2', name: 'Void Attractor', rarity: 'rare', type: 'player', desc: 'Pickups fly to you from across the arena', tags: ['magnet'] },
  { id: 'armor_1', name: 'Harden', rarity: 'rare', type: 'player', desc: 'Take 10% less damage', tags: ['damageReduction'] },
  { id: 'armor_2', name: 'Unbreakable', rarity: 'epic', type: 'player', desc: 'Take 20% less damage', tags: ['damageReduction'] },
  { id: 'fortify', name: 'Iron Will', rarity: 'legendary', type: 'player', desc: 'Take 30% less damage and +25 max health', tags: ['damageReduction', 'health'] },
  { id: 'thorns', name: 'Thorns Field', rarity: 'rare', type: 'player', desc: 'Melee attackers take 12 damage', tags: ['thorns'] },
  { id: 'second_wind', name: 'Second Wind', rarity: 'legendary', type: 'player', desc: 'Survive lethal damage once per run (25% HP)', tags: ['secondWind'] },
  { id: 'adrenaline', name: 'Adrenaline', rarity: 'epic', type: 'player', desc: '+15% damage and +10% speed while below 35% health', tags: ['adrenaline'] },
  { id: 'scavenger', name: 'Scavenger', rarity: 'common', type: 'player', desc: 'Enemies drop +50% more loot', tags: ['loot'] },

  // ============================================================== PERKS
  { id: 'drone_1', name: 'Combat Drone', rarity: 'rare', type: 'perk', desc: 'A drone fights beside you (8 dmg, 2.5/s)', tags: ['drone'] },
  { id: 'drone_2', name: 'Ace Drone', rarity: 'epic', type: 'perk', desc: 'Combat drone deals +60% damage', tags: ['drone'] },
  { id: 'drone_3', name: 'Drone Swarm', rarity: 'legendary', type: 'perk', desc: 'Summon a second combat drone', tags: ['drone'] },
  { id: 'turret', name: 'Auto-Turret', rarity: 'rare', type: 'perk', desc: 'Deploy a turret on kill every 8s', tags: ['turret'] },
  { id: 'mines', name: 'Proximity Mines', rarity: 'rare', type: 'perk', desc: 'Drop a mine when you dash', tags: ['mines'] },
  { id: 'shockwave_kill', name: 'Void Pulse', rarity: 'epic', type: 'perk', desc: 'Kills release a damaging shockwave', tags: ['shockwave'] },
  { id: 'heal_kill', name: 'Executioner', rarity: 'rare', type: 'perk', desc: 'Kills restore 4 health', tags: ['healKill'] },
  { id: 'score_combo', name: 'Combo Chain', rarity: 'rare', type: 'perk', desc: 'Kill combo timer lasts 50% longer', tags: ['combo'] },
  { id: 'combo_damage', name: 'Overdrive', rarity: 'epic', type: 'perk', desc: '+2% damage per combo level (max 30%)', tags: ['comboDamage'] },
  { id: 'berserk', name: 'Berserker', rarity: 'legendary', type: 'perk', desc: 'Kills within 3s grant +8% damage stacking up to 5', tags: ['berserk'] },
  { id: 'frenzy', name: 'Frenzy', rarity: 'epic', type: 'perk', desc: 'Kills restore 8% of ammo to all weapons', tags: ['frenzy'] },
  { id: 'golden_eye', name: 'Golden Eye', rarity: 'epic', type: 'perk', desc: 'Headshots deal +100% score and refund 1 ammo', tags: ['goldenEye'] },
  { id: 'time_scale', name: 'Bullet Time', rarity: 'legendary', type: 'perk', desc: 'Enemies move 15% slower permanently', tags: ['slowEnemies'] },
  { id: 'xray', name: 'Void Sight', rarity: 'epic', type: 'perk', desc: 'Enemies take 8% more damage from all sources', tags: ['vulnerable'] },
  { id: 'cloak', name: 'Ghost Protocol', rarity: 'epic', type: 'perk', desc: 'Enemies lose track of you 60% faster', tags: ['cloak'] },
  { id: 'ricochet', name: 'Ricochet Rounds', rarity: 'legendary', type: 'perk', desc: 'Bullets that hit walls ricochet once', tags: ['ricochet'] },
  { id: 'overcharge', name: 'Overcharge', rarity: 'rare', type: 'perk', desc: 'Shields absorb 20% more damage', tags: ['overcharge'] },
  { id: 'electro_burst', name: 'Electro Burst', rarity: 'epic', type: 'perk', desc: 'Taking shield damage arcs 20 damage to nearby enemies', tags: ['electroBurst'] },
  { id: 'revenge', name: 'Vengeance', rarity: 'rare', type: 'perk', desc: 'Taking health damage grants +10% damage for 4s', tags: ['vengeance'] },
  { id: 'conductor', name: 'Lightning Conductor', rarity: 'legendary', type: 'perk', desc: 'Every 5th hit on an enemy strikes 3 nearby enemies with chain lightning', tags: ['conductor'] },
  { id: 'lucky', name: 'Lucky Break', rarity: 'rare', type: 'perk', desc: '+10% chance to dodge incoming damage', tags: ['dodge'] },
  { id: 'hunter', name: 'Hunter\'s Mark', rarity: 'common', type: 'perk', desc: 'Damage a marked enemy: every 10 hits mark (enemies take +15%)', tags: ['mark'] },
  { id: 'sturdy', name: 'Sturdy Frame', rarity: 'common', type: 'perk', desc: 'Cannot be knocked back as far', tags: ['sturdy'] },
  { id: 'medic', name: 'Field Medic', rarity: 'rare', type: 'perk', desc: 'Health pickups heal 50% more', tags: ['medic'] },
  { id: 'shield_medic', name: 'Shield Transfusion', rarity: 'epic', type: 'perk', desc: 'Shield pickups also restore 10 health', tags: ['shieldMedic'] },
  { id: 'adrenaline_dash', name: 'Dash Recharge', rarity: 'common', type: 'perk', desc: 'Kills reduce dash cooldown by 25%', tags: ['dashKill'] },
  { id: 'executioner_2', name: 'Mass Executor', rarity: 'legendary', type: 'perk', desc: 'Killing 3 enemies in 3s triggers a nova', tags: ['massExecute'] },
];

export const UPGRADE_BY_ID = new Map(UPGRADE_DEFS.map((u) => [u.id, u]));
