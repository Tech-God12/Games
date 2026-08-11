/**
 * VOIDBREAK — WaveDirector.
 *
 * Runs the wave loop: intermission countdown → spawn queue → wave clear
 * check → rewards (score + upgrade choice). Handles spawn pacing, alive
 * caps, elite rolls and boss waves, and announces state changes on the bus
 * for the UI to render.
 */

import { buildWave, expandGroups, waveLabel } from './wave_builder.js';
import {
  intermissionTime, spawnInterval, aliveCap, eliteChance,
  enemyScaling, isBossWave, totalWaves, waveClearScore,
} from './difficulty.js';
import { spawnEnemy } from '../enemies/enemy_db.js';
import { playSfx } from '../../audio/sfx.js';

export class WaveDirector {
  constructor(world, opts = {}) {
    this.world = world;
    this.mode = opts.mode ?? 'endless';
    this.difficulty = opts.difficulty ?? 'operative';
    this.scene = opts.scene ?? null;
    this.arena = opts.arena ?? null;

    this.wave = 0;
    this.state = 'intermission';
    this.intermissionLeft = 0;
    this.queue = [];
    this.spawnTimer = 0;
    this.spawned = 0;
    this.totalToSpawn = 0;
    this.elapsedInWave = 0;
    this.upgradePending = false;
    this.onUpgradeOffer = opts.onUpgradeOffer ?? null;

    this.stats = { wavesCleared: 0, enemiesSpawned: 0, enemiesKilled: 0 };

    this.diff = this._resolveDifficulty();
    this.scaling = enemyScaling(1);

    this._unsubKill = world.bus.on('enemy.death', (e) => {
      if (!e.boss) {
        this.stats.enemiesKilled++;
      } else {
        this._onBossKilled(e);
      }
    });
  }

  _resolveDifficulty() {
    const presets = {
      rookie: { hpScale: 0.55, damageScale: 0.6, speedScale: 0.9, waveBudgetScale: 0.8, eliteChanceScale: 0.4, dropScale: 1.5 },
      operative: { hpScale: 1, damageScale: 1, speedScale: 1, waveBudgetScale: 1, eliteChanceScale: 1, dropScale: 1 },
      veteran: { hpScale: 1.45, damageScale: 1.35, speedScale: 1.1, waveBudgetScale: 1.2, eliteChanceScale: 1.6, dropScale: 0.75 },
      nightmare: { hpScale: 2.0, damageScale: 1.8, speedScale: 1.2, waveBudgetScale: 1.4, eliteChanceScale: 2.5, dropScale: 0.55 },
    };
    return presets[this.difficulty] ?? presets.operative;
  }

  start() {
    this.wave = 0;
    this.state = 'intermission';
    this.intermissionLeft = intermissionTime(1, this.mode);
    this.world.bus.emit('wave.state', { state: 'intermission', wave: 0, time: this.intermissionLeft });
    playSfx('ui.countdown', { vol: 0.4 });
  }

  beginWave() {
    this.wave++;
    if (this.wave > totalWaves(this.mode)) {
      this.state = 'finished';
      this.world.bus.emit('run.finished', { wave: this.wave, mode: this.mode });
      return;
    }
    const groups = buildWave(this.wave, this.mode, Math.random);
    this.queue = expandGroups(groups, () => eliteChance(this.wave, this.mode) * this.diff.eliteChanceScale, Math.random);
    this.totalToSpawn = this.queue.length;
    this.spawned = 0;
    this.spawnTimer = 0.5;
    this.elapsedInWave = 0;
    this.state = 'spawning';
    this.scaling = enemyScaling(this.wave);
    this.scaling.hp *= this.diff.hpScale;
    this.scaling.damage *= this.diff.damageScale;
    this.scaling.speed *= this.diff.speedScale;
    this.scaling.score *= this.diff.waveBudgetScale;

    this.world.bus.emit('wave.start', {
      wave: this.wave,
      label: waveLabel(this.wave, this.mode),
      boss: isBossWave(this.wave),
      total: this.totalToSpawn,
      mode: this.mode,
    });
    playSfx(isBossWave(this.wave) ? 'ui.boss' : 'ui.wave_start', { vol: 0.6 });
  }

  update(dt) {
    switch (this.state) {
      case 'intermission': {
        this.intermissionLeft -= dt;
        this.world.bus.emit('wave.countdown', { time: Math.ceil(this.intermissionLeft), wave: this.wave + 1 });
        if (this.intermissionLeft <= 0) {
          this.beginWave();
        }
        break;
      }
      case 'spawning': {
        this.elapsedInWave += dt;
        this.spawnTimer -= dt;
        const alive = this.world.enemyCount;
        const cap = aliveCap(this.wave, this.mode);
        if (this.spawnTimer <= 0 && this.queue.length > 0 && alive < cap) {
          this.spawnTimer = spawnInterval(this.wave, this.mode);
          this._spawnNext();
        }
        if (this.queue.length === 0 && alive === 0) {
          this._waveCleared();
        }
        break;
      }
      case 'upgrading':
      case 'finished':
      default:
        break;
    }
  }

  _spawnNext() {
    const item = this.queue.shift();
    const id = item.elite ? this._eliteId(item.id) : item.id;
    const pos = this.arena ? this.arena.spawnPoint() : { x: 0, z: 0 };
    const enemy = spawnEnemy(this.world, id, {
      x: pos.x, z: pos.z, difficulty: this.scaling, scene: this.scene,
    });
    enemy.initVisual?.(this.scene);
    this.spawned++;
    this.stats.enemiesSpawned++;
  }

  _eliteId(baseId) {
    if (baseId === 'grunt' || baseId === 'runner') return 'elite_grunt';
    if (baseId === 'shooter' || baseId === 'spitter') return 'elite_shooter';
    return baseId;
  }

  _waveCleared() {
    const score = waveClearScore(this.wave);
    this.stats.wavesCleared++;
    this.state = 'cleared';
    this.world.bus.emit('wave.cleared', {
      wave: this.wave,
      score,
      time: this.elapsedInWave,
      mode: this.mode,
    });
    playSfx('ui.wave_clear', { vol: 0.5 });

    this.upgradePending = true;
    this.state = 'upgrading';
    this.onUpgradeOffer?.(this.wave);
  }

  _onBossKilled(e) {
    if (this.state === 'spawning' && this.queue.length === 0) {
      this._waveCleared();
    }
    void e;
  }

  /** Called by the game when the upgrade choice is made. */
  confirmUpgrade() {
    this.upgradePending = false;
    const time = intermissionTime(this.wave + 1, this.mode);
    this.state = 'intermission';
    this.intermissionLeft = time;
    this.world.bus.emit('wave.state', { state: 'intermission', wave: this.wave, time });
  }

  get currentWave() {
    return this.wave;
  }

  get remainingSpawns() {
    return this.queue.length;
  }

  get enemiesAlive() {
    return this.world.enemyCount;
  }

  destroy() {
    this._unsubKill?.();
  }
}
