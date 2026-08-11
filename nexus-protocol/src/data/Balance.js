// ============================================================================
// Balance.js
// Central tuning constants and formulas for difficulty, scaling, economy, and
// spawn pacing. Keeping these in one place makes the game easy to retune
// without hunting through systems. Values are derived from playtesting targets.
// ============================================================================

export const Balance = {
  // player base
  player: {
    baseMaxHP: 100,
    baseSpeed: 6.0,
    baseEyeHeight: 1.6,
    baseDashCooldown: 0.9,
    baseDashDuration: 0.18,
    baseDashSpeed: 18,
    baseJumpForce: 7,
    gravity: -22,
    radius: 0.4,
    height: 1.7,
    regenDelay: 4,
    iframesOnDash: 0.06,
    reviveInvuln: 2.5,
    contactDamageBase: 8,
  },

  // difficulty presets (multipliers applied to enemy stats & spawn rate)
  difficulty: {
    easy:   { hpMult: 0.7, dmgMult: 0.6, speedMult: 0.9, spawnMult: 0.8, eliteChance: 0.5, waveTimeMult: 1.2, label: 'Recruit' },
    normal: { hpMult: 1.0, dmgMult: 1.0, speedMult: 1.0, spawnMult: 1.0, eliteChance: 1.0, waveTimeMult: 1.0, label: 'Operative' },
    hard:   { hpMult: 1.4, dmgMult: 1.3, speedMult: 1.1, spawnMult: 1.25, eliteChance: 1.5, waveTimeMult: 0.85, label: 'Veteran' },
    nightmare: { hpMult: 2.0, dmgMult: 1.7, speedMult: 1.2, spawnMult: 1.6, eliteChance: 2.2, waveTimeMult: 0.7, label: 'Nightmare' },
    mythic: { hpMult: 2.8, dmgMult: 2.2, speedMult: 1.3, spawnMult: 2.0, eliteChance: 3.0, waveTimeMult: 0.6, label: 'Mythic' },
  },

  // wave composition scaling
  waves: {
    baseBudget: 8,
    budgetPerWave: 3,
    budgetQuadratic: 0.25,
    maxAliveBase: 8,
    maxAlivePerWave: 2,
    maxAliveCap: 48,
    intermissionDuration: 5,
    bossEvery: 5,
    eliteChanceBase: 0.02,
    eliteChancePerWave: 0.004,
    eliteChanceCap: 0.18,
    hpScalePerWave: 0.12,
    dmgScalePerWave: 0.06,
    spdScalePerWave: 0.01,
    spdScaleCap: 0.3,
  },

  // economy
  economy: {
    currencyDropBase: 1,
    bossCurrencyMult: 4,
    eliteCurrencyMult: 4,
    comboCurrencyPerKill: 0.5,
    comboMinForBonus: 5,
    shopOffers: 4,
    starterCurrency: 0,
    waveClearHealFraction: 0.05,
  },

  // progression curve
  progression: {
    xpBase: 8,
    xpPerLevel: 6,
    xpQuadratic: 1.5,
    xpKillBase: 1,
    xpBossMult: 60,
    scorePerKill: 10,
    scorePerLevel: 2,
    scorePerBoss: 500,
    upgradeChoices: 3,
    perkRollChance: 0.25,
  },

  // combat
  combat: {
    armorCap: 0.9,            // armor can't remove more than 90%
    armorFormula: 20,        // reduction = armor/(armor+20)
    pierceDamageFalloff: 0.25, // per pierced target
    critHeadshotMerge: true,
    splashSelfDamage: 0,     // player explosions don't self-damage
    contactDamageCooldown: 0.8,
    thornsReturnsAll: false,
  },

  // status effects
  status: {
    burnDps: 5,
    poisonDps: 5,
    bleedDps: 5,
    burnTick: 0.25,
    slowCap: 0.7,
    freezeCap: 0.9,
    hastePerPower: 0.2,
    markPerPower: 0.15,
    shockAccuracyReduce: 0.3,
  },

  // spawn pacing
  spawn: {
    ringMin: 12,
    ringMaxFrac: 0.94,       // fraction of bounds radius
    spawnDelayMin: 0.15,
    spawnDelayMax: 0.6,
    spawnAnimDuration: 0.5,
    leashDistance: 60,
    maxOrbiters: 6,
  },

  // hazards
  hazards: {
    spawnIntervalMin: 10,
    spawnIntervalMax: 18,
    durationMin: 6,
    durationMax: 10,
    growTime: 0.6,
    tickInterval: 0.5,
    minDistFromPlayer: 6,
    damageScalePerWave: 0.04,
  },

  // visuals / juice
  juice: {
    muzzleFlashLife: 0.06,
    tracerLife: 0.06,
    impactLife: 0.12,
    explosionLightLife: 0.25,
    damageNumberLife: 0.9,
    critDamageNumberLife: 1.1,
    shakeDecay: 2.2,
    hitstopDefault: 0.0,
    killHitstop: 0.03,
    bossKillHitstop: 0.12,
  },

  // performance
  performance: {
    particleCap: 5000,
    tracerCap: 96,
    beamCap: 24,
    flashCap: 64,
    lightCap: 16,
    damageNumberCap: 64,
    spatialGridCell: 4,
    maxSubSteps: 5,
    fixedStep: 1 / 60,
  },
};

/** Compute the XP required for a given level. */
export function xpForLevel(lv) {
  return Math.floor(Balance.progression.xpBase + lv * Balance.progression.xpPerLevel + lv * lv * Balance.progression.xpQuadratic);
}

/** Compute the wave spawn budget for a given wave number. */
export function waveBudget(wave) {
  const w = Balance.waves;
  return Math.floor(w.baseBudget + wave * w.budgetPerWave + wave * wave * w.budgetQuadratic);
}

/** Compute max concurrent alive enemies for a wave. */
export function waveMaxAlive(wave) {
  const w = Balance.waves;
  return Math.min(w.maxAliveCap, w.maxAliveBase + wave * w.maxAlivePerWave);
}

/** Enemy stat scaling for a wave. */
export function waveScaling(wave, tier) {
  const w = Balance.waves;
  const hpScale = 1 + (wave - 1) * w.hpScalePerWave + tier * 0.6;
  const dmgScale = 1 + (wave - 1) * w.dmgScalePerWave + tier * 0.3;
  const spdScale = 1 + Math.min(w.spdScaleCap, (wave - 1) * w.spdScalePerWave);
  return { hpScale, dmgScale, spdScale };
}

/** Elite spawn chance for a wave. */
export function eliteChance(wave) {
  const w = Balance.waves;
  return Math.min(w.eliteChanceCap, w.eliteChanceBase + wave * w.eliteChancePerWave);
}

/** Armor damage reduction fraction. */
export function armorReduction(armor) {
  return Math.min(Balance.combat.armorCap, armor / (armor + Balance.combat.armorFormula));
}
