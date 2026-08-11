/**
 * VOIDBREAK — Run statistics.
 *
 * Tracks everything about the current run: kills (total/by weapon/by enemy
 * type), damage dealt/taken, shots fired, accuracy, pickups, waves, time.
 * Snapshot is shown on the game-over screen and stored in records.
 */

export class RunStats {
  constructor() {
    this.reset();
  }

  reset() {
    this.kills = 0;
    this.killsByWeapon = new Map();
    this.killsByEnemy = new Map();
    this.damageDealt = 0;
    this.damageTaken = 0;
    this.shotsFired = 0;
    this.shotsHit = 0;
    this.headshots = 0;
    this.crits = 0;
    this.pickups = new Map();
    this.wavesCleared = 0;
    this.bossesKilled = 0;
    this.elitesKilled = 0;
    this.timeAlive = 0;
    this.dashes = 0;
    this.upgradesTaken = 0;
    this.maxCombo = 0;
    this.energyCollected = 0;
    this.healthRestored = 0;
    this.startTime = 0;
  }

  registerKill(enemy, weaponId, opts = {}) {
    this.kills++;
    this.killsByWeapon.set(weaponId ?? 'unknown', (this.killsByWeapon.get(weaponId ?? 'unknown') ?? 0) + 1);
    this.killsByEnemy.set(enemy?.id ?? 'unknown', (this.killsByEnemy.get(enemy?.id ?? 'unknown') ?? 0) + 1);
    if (opts.crit) this.crits++;
    if (opts.headshot) this.headshots++;
    if (enemy?.def?.boss) this.bossesKilled++;
    if (enemy?.def?.elite) this.elitesKilled++;
  }

  registerShot() {
    this.shotsFired++;
  }

  registerHit() {
    this.shotsHit++;
  }

  registerDamageDealt(amount) {
    this.damageDealt += amount;
  }

  registerDamageTaken(amount) {
    this.damageTaken += amount;
  }

  registerPickup(type, amount) {
    this.pickups.set(type, (this.pickups.get(type) ?? 0) + (amount ?? 1));
    if (type === 'energy') this.energyCollected += amount ?? 1;
    if (type === 'health') this.healthRestored += amount ?? 0;
  }

  get accuracy() {
    return this.shotsFired > 0 ? this.shotsHit / this.shotsFired : 0;
  }

  snapshot() {
    return {
      kills: this.kills,
      damageDealt: Math.round(this.damageDealt),
      damageTaken: Math.round(this.damageTaken),
      shotsFired: this.shotsFired,
      shotsHit: this.shotsHit,
      accuracy: this.accuracy,
      headshots: this.headshots,
      crits: this.crits,
      wavesCleared: this.wavesCleared,
      bossesKilled: this.bossesKilled,
      elitesKilled: this.elitesKilled,
      timeAlive: this.timeAlive,
      dashes: this.dashes,
      upgradesTaken: this.upgradesTaken,
      maxCombo: this.maxCombo,
      energyCollected: this.energyCollected,
      healthRestored: Math.round(this.healthRestored),
      topWeapon: [...this.killsByWeapon.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'none',
      topEnemy: [...this.killsByEnemy.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'none',
    };
  }
}
