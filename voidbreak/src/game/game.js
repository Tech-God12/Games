/**
 * VOIDBREAK — Game.
 *
 * The orchestrator. Owns the renderer, scene, world, player, camera rig,
 * viewmodel, arena, wave director, loot, score, upgrades, VFX, drones, HUD
 * and menus, and drives the fixed-timestep simulation loop.
 */

import { Renderer } from '../gfx/renderer.js';
import { Scene } from '../gfx/scene.js';
import { LightManager } from '../gfx/lights.js';
import { World } from './world.js';
import { Player } from './player/player.js';
import { PlayerCamera } from './player/camera_rig.js';
import { ViewModel } from './weapons/viewmodel.js';
import { Arena } from './levels/arena.js';
import { WaveDirector } from './waves/director.js';
import { LootManager } from './loot/pickups.js';
import { Score } from './meta/score.js';
import { RunStats } from './meta/stats.js';
import { records, unlockedWeaponIds as unlockedWeaponIdsFn } from './meta/records.js';
import { achievements } from './meta/achievements.js';
import { applyUpgrade } from './upgrades/upgrade_db.js';
import { drawCards } from './upgrades/cards.js';
import { VFX } from './vfx.js';
import { EnemyFactory } from './enemies/enemy_factory.js';
import { input, Actions } from '../input/input.js';
import { audio } from '../audio/audioengine.js';
import { music } from '../audio/music.js';
import { ambience } from '../audio/ambience.js';
import { settings } from '../core/settings.js';
import { EventBus } from '../core/eventbus.js';
import { log } from '../core/profiler.js';
import { ui } from '../ui/ui.js';
import { HUD } from '../ui/hud.js';
import { registerMenus } from '../ui/menus.js';
import { registerGameScreens } from '../ui/screens.js';
import { DroneCompanion } from './drones.js';
import { Vec3 } from '../core/vec3.js';
import { playSfx } from '../audio/sfx.js';
import { MODES, FIXED_STEP } from '../core/constants.js';
import { GameLoop } from '../core/loop.js';
import { spawnEnemy } from './enemies/enemy_db.js';
import { WEAPON_BY_ID } from './weapons/weapon_defs.js';

const QUALITY_PRESETS = {
  low: { shadow: 0, shadowSize: 0, bloom: false, pixelRatio: 0.66, particleScale: 0.5, fxaa: false, fogQuality: 1 },
  medium: { shadow: 1, shadowSize: 1024, bloom: true, pixelRatio: 0.85, particleScale: 0.75, fxaa: false, fogQuality: 2 },
  high: { shadow: 1, shadowSize: 2048, bloom: true, pixelRatio: 1.0, particleScale: 1.0, fxaa: true, fogQuality: 3 },
  ultra: { shadow: 1, shadowSize: 2048, bloom: true, pixelRatio: 1.5, particleScale: 1.25, fxaa: true, fogQuality: 3 },
};

export class Game {
  constructor(canvas, opts = {}) {
    this.canvas = canvas;
    this.opts = opts;

    this.renderer = new Renderer(canvas, { gl: opts.gl });
    this.scene = new Scene();
    this.renderer.setScene(this.scene);
    this.lights = new LightManager();
    this.renderer.setLights(this.lights);

    this.world = new World({ bus: new EventBus() });
    this.bus = this.world.bus;
    this.world.lightManager = this.lights;

    this.score = new Score();
    this.combo = this.score;
    this.stats = new RunStats();
    this.loot = new LootManager(this.world, 1);
    this.vfx = new VFX(this);
    this.enemyFactory = new EnemyFactory(this.renderer.gl, this.scene);
    this.world.enemyFactory = this.enemyFactory;

    this.input = input;
    input.defaultBindings = new Map(input.bindings);

    this.player = null;
    this.cameraRig = null;
    this.viewmodel = null;

    this.arena = null;
    this.director = null;

    this.state = 'menu';
    this.runTime = 0;
    this.selectedMode = MODES.endless;
    this.selectedDifficulty = 'operative';
    this.currentUpgrades = [];
    this.upgradeCounts = new Map();
    this.flags = {};
    this.droneDamageMult = 1;
    this.drones = [];
    this.currentBoss = null;
    this.lastRunSummary = null;
    this.healthRegenTimer = 6;
    this.berserkStacks = 0;
    this.berserkTimer = 0;
    this.hunterHits = new Map();
    this.conductorHits = new Map();
    this.massExecuteTimer = 0;
    this.massExecuteCount = 0;
    this.noFireTimer = 0;
    this.longestNoFire = 0;
    this.noDamageWaves = 0;
    this.waveTookDamage = false;
    this.rerolled = false;
    this._meleeCd = 0;
    this._revengeTimer = 0;
    this.menuShown = false;

    this.cumulative = {
      kills: 0, headshots: 0, crits: 0, pickups: 0, energyCollected: 0,
      elitesKilled: 0, dashes: 0, cryoKills: 0, burnKills: 0, shockKills: 0,
      weaponKills: {}, dodges: 0, codexRead: 0, deaths: 0,
      modeWins: {}, difficultyWins: {}, difficultyWaves: {}, maxHealthReached: 0,
      fastestWave1: Infinity, noDamageWaves: 0, practiceComplete: false,
      tutorialComplete: false, changedSettings: false, starterOnlyWin: false,
      allWeapons: false, glassCannonWin: false, longestNoFire: 0, score: 0,
    };

    this.hud = null;
    registerMenus(this);
    registerGameScreens(this);

    this.loop = new GameLoop({
      update: (simDt, steps, wallDt) => this._frameUpdate(simDt, steps, wallDt),
      render: () => this._frameRender(),
    });

    this._wireEvents();

    this.cameraRig = new PlayerCamera(this.renderer.camera);
    this.cameraRig.bindSettings(settings);
    this._screenFx = { damageFlash: 0, lowHp: 0 };
    this.renderer.setScreenFx(this._screenFx);
    this.applySettings();

    window.addEventListener('resize', () => {
      this.renderer.resize(window.innerWidth, window.innerHeight, this.renderer.quality?.pixelRatio ?? 1);
    });

    log.info('game', 'Game initialized');
  }

  start() {
    this.loop.start();
  }

  // ------------------------------------------------------------ screens

  showScreen(name) {
    const screen = ui.show(name);
    if (name === 'upgrades' && this.onUpgradeScreenShown) this.onUpgradeScreenShown();
    if (name === 'gameover' && this.onGameOverShown) this.onGameOverShown();
    if (name === 'achievements' && this.onAchievementsShown) this.onAchievementsShown();
    if (name === 'records' && this.onRecordsShown) this.onRecordsShown();
    return screen;
  }

  toMainMenu() {
    this.state = 'menu';
    this.loop.setTimeScale(1);
    this.hud?.destroy();
    this.hud = null;
    this.showScreen('main');
  }

  // ------------------------------------------------------------ runs

  startRun(mode, difficulty) {
    this.world.reset();
    this.lights.clearDynamic();
    this.score = new Score();
    this.combo = this.score;
    this.stats = new RunStats();
    this.flags = {};
    this.upgradeCounts = new Map();
    this.droneDamageMult = 1;
    for (const d of this.drones) d.remove();
    this.drones = [];
    this.currentBoss = null;
    this.runTime = 0;
    this.healthRegenTimer = 6;
    this.berserkStacks = 0;
    this.noDamageWaves = 0;
    this.waveTookDamage = false;
    this.rerolled = false;
    this._meleeCd = 0;
    this._revengeTimer = 0;
    this.selectedMode = mode;
    this.selectedDifficulty = difficulty;

    this.applySettings();

    this.arena?.destroy();
    this.arena = new Arena(this.renderer.gl, this.scene, this.world);
    this.arena.build(Math.floor(Math.random() * 999983), Math.floor(Math.random() * 4));
    this.arena.registerTextures(this.renderer);
    this.arena.applyEnvironment(this.renderer);

    const start = this.arena.playerStart;
    this.player = new Player(this.world, { x: start.x, y: 0, z: start.z });
    this.world.addEntity(this.player);
    const unlocked = this.unlockedWeaponIds();
    this.player.equipLoadout(mode === MODES.practice
      ? ['sidearm', 'voltaic', 'breaker', 'nova', 'executor', 'havoc', 'tesla', 'cryoshard', 'twinfang', 'battleaxe', 'starfall']
      : unlocked.slice(0, 6));
    this.cameraRig.player = this.player;
    this.cameraRig.yaw = 0;
    this.cameraRig.pitch = 0;
    this.cameraRig.snap();

    this.viewmodel?.destroy();
    this.viewmodel = new ViewModel(this.renderer.gl, this.scene, { camera: this.renderer.camera });
    this.viewmodel.setWeapon(this.player.currentWeapon.def);
    this.viewmodel.setVisible(true);

    this.director = new WaveDirector(this.world, {
      mode,
      difficulty,
      scene: this.scene,
      arena: this.arena,
      onUpgradeOffer: (wave) => this._offerUpgrades(wave),
    });
    this.loot.setDropScale(this.director.diff.dropScale);

    this.hud?.destroy();
    this.hud = new HUD(this);

    audio.unlock();
    music.setBoss(false);
    music.setIntensity(0);
    music.start();
    ambience.start();

    this.state = 'playing';
    ui.hideAllScreens();
    if (mode === MODES.practice) {
      this._setupPractice();
    } else {
      this.director.start();
    }
    this.loop.setTimeScale(1);
    this.input.requestPointerLock();
    this.hud.showHint('WASD MOVE · MOUSE AIM · CLICK FIRE · R RELOAD · SHIFT SPRINT · X DASH', 6500);
  }

  _setupPractice() {
    const r = this.arena.size - 6;
    const n = 8;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const e = spawnEnemy(this.world, 'grunt', {
        x: Math.cos(a) * r * 0.8,
        z: Math.sin(a) * r * 0.8,
        difficulty: { hpScale: 1, damageScale: 0, speedScale: 1, scoreScale: 1 },
      });
      e.practiceTarget = true;
      e.health = 100;
      e.maxHealth = 100;
      e.initVisual?.(this.scene);
    }
    this.hud.showHint('PRACTICE RANGE — TARGETS DON\'T FIGHT BACK. HAVE FUN.', 6000);
  }

  unlockedWeaponIds() {
    return unlockedWeaponIdsFn();
  }

  // ------------------------------------------------------------ upgrades

  _offerUpgrades(wave) {
    if (this.selectedMode === MODES.practice) {
      this.director.confirmUpgrade();
      return;
    }
    void wave;
    this.rerolled = false;
    this.currentUpgrades = drawCards(this);
    this.state = 'upgrading';
    this.loop.setTimeScale(0);
    this.input.exitPointerLock();
    this.showScreen('upgrades');
  }

  drawUpgrades(isReroll = false) {
    if (isReroll && this.rerolled) return this.currentUpgrades;
    if (isReroll) this.rerolled = true;
    this.currentUpgrades = drawCards(this);
    return this.currentUpgrades;
  }

  chooseUpgrade(id) {
    applyUpgrade(this, id);
    this.upgradeCounts.set(id, (this.upgradeCounts.get(id) ?? 0) + 1);
    this.stats.upgradesTaken++;
    this.currentUpgrades = [];
    this.state = 'playing';
    this.loop.setTimeScale(1);
    ui.hideAllScreens();
    this.director.confirmUpgrade();
    this.input.requestPointerLock();
  }

  // ------------------------------------------------------------ pause

  pauseGame() {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    this.loop.setTimeScale(0);
    this.input.exitPointerLock();
    this.showScreen('pause');
    playSfx('ui.open', { vol: 0.4 });
  }

  resumeGame() {
    if (this.state !== 'paused') return;
    this.state = 'playing';
    this.loop.setTimeScale(1);
    ui.hideAllScreens();
    this.input.requestPointerLock();
    playSfx('ui.close', { vol: 0.4 });
  }

  abandonRun() {
    this._endRun(false);
  }

  // ------------------------------------------------------------ events

  _wireEvents() {
    const bus = this.world.bus;

    bus.on('enemy.death', (e) => this._onEnemyDeath(e));
    bus.on('enemy.summon_request', (e) => this._onSummonRequest(e));
    bus.on('player.damaged', (e) => this._onPlayerDamaged(e));
    bus.on('player.pickup', (e) => this._onPickup(e));
    bus.on('player.land', (e) => {
      this.cameraRig.landDip = Math.min(0.4, e.impact * 0.3);
    });
    bus.on('wave.start', (e) => {
      this.waveTookDamage = false;
      music.setIntensity(Math.min(3, Math.floor(e.wave / 3)));
      music.setBoss(!!e.boss);
      if (e.boss) {
        this.currentBoss = this.world.enemies.find((en) => en.def?.boss);
      }
      ambience.setIntensity(Math.min(1, e.wave / 8));
    });
    bus.on('wave.cleared', (e) => {
      this.score.add(e.score);
      this.stats.wavesCleared++;
      if (!this.waveTookDamage) this.noDamageWaves++;
      if (e.wave === 1) {
        this.cumulative.fastestWave1 = Math.min(this.cumulative.fastestWave1, e.time);
      }
      music.setIntensity(0);
      this.score.breakCombo();
    });
    bus.on('boss.phase', () => music.setBoss(true));
    bus.on('player.death', () => this._onPlayerDeath());
    bus.on('run.finished', () => this._onRunFinished());
    bus.on('ai.noise', (e) => this._notifyEnemies(e));
  }

  _onEnemyDeath(e) {
    const { points, combo } = this.score.addKill(e.score, {
      bonus: e.boss ? 1000 : e.enemy?.def?.elite ? 200 : 0,
    });
    this.stats.registerKill(e.enemy, e.weapon?.id, { crit: e.crit, headshot: e.headshot });
    this.cumulative.kills++;
    if (e.crit) this.cumulative.crits++;
    if (e.headshot) this.cumulative.headshots++;
    if (e.enemy?.def?.elite) this.cumulative.elitesKilled++;
    this.cumulative.weaponKills[e.weapon?.id] = (this.cumulative.weaponKills[e.weapon?.id] ?? 0) + 1;
    if (combo >= 3) {
      this.stats.maxCombo = Math.max(this.stats.maxCombo, combo);
    }

    this._onKillPerks(e);

    const weaponName = e.weapon?.name ?? 'ENVIRONMENT';
    const enemyName = e.enemy?.name ?? 'TARGET';
    this.hud?.addKillfeed(`${weaponName} → ${enemyName} +${points}${e.crit ? ' CRIT!' : ''}`, { crit: e.crit });

    if (combo > 0 && combo % 10 === 0) {
      this.hud?._toast(`${combo} COMBO!`, '#ffd166');
      playSfx('ui.levelup', { vol: 0.4 });
    }

    if (e.boss) {
      this.currentBoss = null;
    }

    if (this.flags.massExecute) {
      this.massExecuteTimer = 3;
      this.massExecuteCount++;
      if (this.massExecuteCount >= 3) {
        this.massExecuteCount = 0;
        this.world.bus.emit('fx.explosion', { x: e.x, y: e.y, z: e.z, radius: 5, color: '#ffd166', intensity: 1 });
        this.world.queryEnemies(e.x, e.z, 6).forEach((en) => {
          if (en.alive && en !== e.enemy) en.takeDamage(40, this.player, { element: 'void' });
        });
      }
    }
  }

  _onKillPerks(e) {
    const flags = this.flags;
    if (flags.shockwaveKill) {
      this.world.bus.emit('fx.shockwave', { x: e.x, y: e.y, z: e.z, radius: 3.5, color: '#35f0ff' });
      this.world.queryEnemies(e.x, e.z, 3.5).forEach((en) => {
        if (en.alive && en !== e.enemy) en.takeDamage(15, this.player, { element: 'shock' });
      });
    }
    if (flags.healKill) this.player.heal(flags.healKill);
    if (flags.frenzy) {
      for (const w of this.player.weapons) {
        if (!w.infinite) w.reserve = Math.min(w.reserveMax, w.reserve + Math.ceil(w.magSize * 0.08));
      }
    }
    if (flags.berserk) {
      this.berserkStacks = Math.min(5, this.berserkStacks + 1);
      this.berserkTimer = 3;
    }
    if (flags.goldenEye && e.headshot) {
      const w = this.player.currentWeapon;
      if (w && !w.infinite) w.ammoInMag = Math.min(w.magSize, w.ammoInMag + 1);
      this.score.add(100);
    }
    if (flags.dashKill) this.player.movement.dashCooldown *= 0.75;
    if (flags.turret && Math.random() < 0.4) {
      this.drones.push(new DroneCompanion(this, e.x, e.z, { turret: true, life: 12 }));
    }
  }

  _onSummonRequest(e) {
    const enemy = spawnEnemy(this.world, e.id, {
      x: e.x, z: e.z, difficulty: this.director.scaling, scene: this.scene,
    });
    enemy.initVisual?.(this.scene);
  }

  _onPlayerDamaged(e) {
    this.stats.registerDamageTaken(e.amount);
    this.waveTookDamage = true;
    this._screenFx.damageFlash = Math.min(1, e.amount / 50);
    this.score.breakCombo();
    this.berserkStacks = 0;
    if (this.flags.revenge && e.healthDamage > 0) {
      this._revengeTimer = 4;
      for (const w of this.player.weapons) w.modifiers.damageMult *= 1.1;
    }
    if (this.flags.electroBurst && e.shieldDamage > 0) {
      this.world.queryEnemies(this.player.position.x, this.player.position.z, 5).forEach((en) => {
        if (en.alive) en.takeDamage(20, this.player, { element: 'shock' });
      });
    }
    if (this.player.stats.dodge && Math.random() < this.player.stats.dodge) {
      this.player.health = Math.min(this.player.maxHealth, this.player.health + e.healthDamage);
      this.player.shield = Math.min(this.player.maxShield, this.player.shield + e.shieldDamage);
      this.cumulative.dodges++;
      this.hud?._toast('DODGED', '#35f0ff');
    }
  }

  _onPickup(e) {
    this.stats.registerPickup(e.type, e.amount);
    this.cumulative.pickups++;
    if (e.type === 'energy') {
      this.cumulative.energyCollected += e.amount ?? 1;
      this.score.add((e.amount ?? 1) * 25);
    }
    if (e.type === 'core') {
      this.score.add(500);
      this.hud?._toast('DATA CORE +500', '#ffe14d');
    }
  }

  _notifyEnemies(e) {
    const enemies = this.world.queryEnemies(e.x, e.z, e.radius);
    for (const en of enemies) {
      if (en.alive) {
        en.senses.hear({ x: e.x, z: e.z, radius: e.radius });
        if (en.brain.fsm.is('idle')) {
          en.brain.fsm.set('chase');
          en.onAlerted?.();
        }
      }
    }
  }

  _onPlayerDeath() {
    this.cumulative.deaths++;
    this.loop.setTimeScale(0.25);
    this.input.exitPointerLock();
    setTimeout(() => this._endRun(false), 1600);
  }

  _onRunFinished() {
    this._endRun(true);
  }

  _endRun(won) {
    if (this.state === 'gameover') return;
    this.state = 'gameover';
    this.loop.setTimeScale(0);
    this.input.exitPointerLock();
    this.stats.timeAlive = this.runTime;
    this.stats.maxCombo = Math.max(this.stats.maxCombo, this.score.maxCombo);

    const summary = {
      won,
      mode: this.selectedMode,
      difficulty: this.selectedDifficulty,
      wave: this.director?.currentWave ?? 1,
      score: this.score.total,
      ...this.stats.snapshot(),
    };
    this.lastRunSummary = summary;

    const newlyUnlocked = records.recordRun({
      ...summary,
      score: this.score.total,
      kills: this.stats.kills,
      timeAlive: this.runTime,
    });
    for (const u of newlyUnlocked) {
      this.world.bus.emit('weapon.unlock', { id: u.id, name: WEAPON_BY_ID.get(u.id)?.name ?? u.id, wave: u.wave });
      playSfx('weapon.pickup', { vol: 0.6 });
    }

    const c = this.cumulative;
    c.score = Math.max(c.score, this.score.total);
    c.modeWins[this.selectedMode] = (c.modeWins[this.selectedMode] ?? 0) + (won ? 1 : 0);
    c.difficultyWins[this.selectedDifficulty] = (c.difficultyWins[this.selectedDifficulty] ?? 0) + (won ? 1 : 0);
    c.difficultyWaves[this.selectedDifficulty] = Math.max(c.difficultyWaves[this.selectedDifficulty] ?? 0, this.director?.currentWave ?? 0);
    c.noDamageWaves += this.noDamageWaves;
    c.longestNoFire = Math.max(c.longestNoFire, this.longestNoFire);
    c.maxHealthReached = Math.max(c.maxHealthReached, this.player.maxHealth);
    c.starterOnlyWin = won && this.player.weapons.length <= 2;
    c.allWeapons = this.player.weapons.length >= 14;
    c.glassCannonWin = won && this.player.maxHealth <= 100;

    const snapshot = {
      kills: c.kills,
      headshots: c.headshots,
      crits: c.crits,
      wavesCleared: this.stats.wavesCleared,
      bossesKilled: this.stats.bossesKilled,
      elitesKilled: c.elitesKilled,
      maxCombo: this.stats.maxCombo,
      score: this.score.total,
      upgradesTaken: this.stats.upgradesTaken,
      dashes: c.dashes,
      pickupTotal: c.pickups,
      energyCollected: c.energyCollected,
      weaponKills: c.weaponKills,
      cryoKills: c.cryoKills,
      burnKills: c.burnKills,
      shockKills: c.shockKills,
      timeAlive: this.runTime,
      noDamageWaves: c.noDamageWaves,
      practiceComplete: c.practiceComplete,
      modeWins: c.modeWins,
      difficultyWins: c.difficultyWins,
      difficultyWaves: c.difficultyWaves,
      tutorialComplete: c.tutorialComplete,
      changedSettings: c.changedSettings,
      starterOnlyWin: c.starterOnlyWin,
      allWeapons: c.allWeapons,
      glassCannonWin: c.glassCannonWin,
      maxHealthReached: c.maxHealthReached,
      fastestWave1: c.fastestWave1 === Infinity ? 999 : c.fastestWave1,
      longestNoFire: c.longestNoFire,
      dodges: c.dodges,
      codexRead: c.codexRead,
      deaths: c.deaths,
    };
    const newly = achievements.check(snapshot);
    for (const ach of newly) {
      this.world.bus.emit('achievement.unlock', { id: ach.id, name: ach.name });
    }

    music.stop();
    ambience.stop();
    this.showScreen('gameover');
  }

  // ------------------------------------------------------------ drones

  spawnDrone() {
    const drone = new DroneCompanion(this, this.player.position.x, this.player.position.z);
    this.drones.push(drone);
    return drone;
  }

  // ------------------------------------------------------------ frame

  _frameUpdate(simDt, steps, wallDt) {
    this.input.update(wallDt);

    if (this.input.wasPressed(Actions.PAUSE)) {
      if (this.state === 'playing') this.pauseGame();
      else if (this.state === 'paused') this.resumeGame();
    }
    if (this.input.wasPressed(Actions.TOGGLE_MINIMAP)) {
      settings.set('showMinimap', !settings.get('showMinimap'));
    }

    this.renderer.post.state.time += wallDt;

    if (this.state === 'playing' || this.state === 'upgrading') {
      this.runTime += simDt;
      this.score.update(simDt);
      this._tickPerks(simDt);

      for (let i = 0; i < steps; i++) {
        this._fixedStep(FIXED_STEP);
      }

      this.hud?.update(simDt);
    }
  }

  _tickPerks(dt) {
    if (this.flags.healthRegen) {
      this.healthRegenTimer -= dt;
      if (this.healthRegenTimer <= 0 && this.player.health < this.player.maxHealth) {
        this.player.health = Math.min(this.player.maxHealth, this.player.health + 2 * dt);
      }
    }
    if (this.flags.ammoRegen && this.player.currentWeapon && !this.player.currentWeapon.infinite) {
      const w = this.player.currentWeapon;
      w.ammoInMag = Math.min(w.magSize, w.ammoInMag + 2 * dt);
    }
    if (this.flags.berserk && this.berserkTimer > 0) {
      this.berserkTimer -= dt;
      if (this.berserkTimer <= 0) this.berserkStacks = 0;
    }
    if (this.flags.revenge && this._revengeTimer > 0) {
      this._revengeTimer -= dt;
      if (this._revengeTimer <= 0) {
        for (const w of this.player.weapons) w.modifiers.damageMult /= 1.1;
      }
    }
    if (this.massExecuteTimer > 0) {
      this.massExecuteTimer -= dt;
      if (this.massExecuteTimer <= 0) this.massExecuteCount = 0;
    }
    if (this.stats.shotsFired === 0) {
      this.noFireTimer += dt;
      this.longestNoFire = Math.max(this.longestNoFire, this.noFireTimer);
    }
  }

  _fixedStep(dt) {
    if (this.state !== 'playing' && this.state !== 'upgrading') return;
    const player = this.player;
    if (!player) return;

    if (!player.dead) {
      player.applyInput(this.input, this.cameraRig.yaw, dt);
      player.facing.set(-Math.sin(this.cameraRig.yaw), 0, -Math.cos(this.cameraRig.yaw));
    }

    if (this.state === 'playing' && player.currentWeapon && !player.dead) {
      this._weaponStep(dt);
    }
    this._meleeCd = Math.max(0, this._meleeCd - dt);

    this.world.step(dt);
    this.director?.update(dt);

    for (let i = this.drones.length - 1; i >= 0; i--) {
      this.drones[i].update(dt);
      if (this.drones[i].dead) this.drones.splice(i, 1);
    }

    this.renderer.particles.update(dt);
    this.renderer.decals.update(dt);
    this.renderer.tracers.update(dt);
    this.lights.update(dt);

    audio.updateListener(this.renderer.camera.position, this.renderer.camera.forward);
  }

  _weaponStep(dt) {
    const player = this.player;
    const weapon = player.currentWeapon;
    const cam = this.renderer.camera;

    if (this.input.wasPressed(Actions.NEXT_WEAPON)) player.nextWeapon(1);
    if (this.input.wasPressed(Actions.PREV_WEAPON)) player.nextWeapon(-1);
    for (let i = 1; i <= 8; i++) {
      if (this.input.wasPressed(Actions[`WEAPON_${i}`])) {
        const id = player.weapons[i - 1]?.id;
        if (id) player.switchToWeapon(id);
      }
    }
    if (this.input.wasPressed(Actions.MELEE)) {
      if (player.hasWeapon('battleaxe')) {
        player.switchToWeapon('battleaxe');
      } else {
        this._quickMelee();
      }
    }

    const origin = cam.position.clone();
    const dir = cam.forward.clone();

    const ctx = {
      origin,
      dir,
      right: cam.right,
      rng: Math.random,
      time: this.runTime,
      muzzleWorldPos: this.viewmodel?.muzzleWorldPos() ?? origin,
      moveSpeed: player.groundSpeed,
      airborne: !player.movement.grounded,
      targets: this.world.enemies,
      damageMult: player.stats.damageMult * this._comboDamageMult(),
      onKick: (pitchKick, yawKick) => this.cameraRig.addRecoil(pitchKick, yawKick),
      onMuzzleFlash: (w) => {
        const m = this.viewmodel?.muzzleWorldPos();
        if (m) this.vfx.muzzleFlash(m.x, m.y, m.z, w.def.tracerColor ?? '#ffd166');
        this.world.bus.emit('ai.noise', { x: origin.x, y: origin.y, z: origin.z, radius: 18, source: player });
      },
      onTracer: (from, to, color, size) => {
        this.renderer.tracers.add({
          x1: from.x, y1: from.y, z1: from.z,
          x2: to.x, y2: to.y, z2: to.z,
          color: hexArr(color),
          width: size ? 1 + size * 40 : 2,
          life: 0.07,
        });
      },
      onBeam: (from, to, color) => {
        this.vfx.playerBeam(from.x, from.y, from.z, to.x, to.y, to.z, color);
      },
      onHitEnemy: (enemy, result) => {
        this.stats.registerHit();
        this.hud?.addHitmarker(result.crit || result.headshot);
        if (result.headshot) this.cumulative.headshots++;
        if (result.crit) this.cumulative.crits++;
        const hy = enemy.position.y + enemy.height * (result.headshot ? 0.85 : 0.55);
        this.hud?.addDamageNumber(result.damage, new Vec3(enemy.position.x, hy, enemy.position.z), {
          crit: result.crit,
          headshot: result.headshot,
          color: result.headshot ? '#ff9d5a' : result.crit ? '#ffd166' : undefined,
        });
        this.vfx.impactAt(enemy.position.x, hy, enemy.position.z, elementColorOf(weapon.elementApplied), 6, 0.3);
        this._applyHitPerks(enemy, result);
      },
      onHitWorld: (hit) => {
        this.world.bus.emit('fx.impact_world', {
          x: hit.x, y: hit.y, z: hit.z,
          normal: hit.normal,
          element: weapon.elementApplied,
        });
        if (this.flags.ricochet && hit.normal) {
          this._ricochet(origin, dir, hit);
        }
      },
      onProjectileHit: (proj, entity, info) => {
        if (entity) {
          this.hud?.addHitmarker(false);
          this.hud?.addDamageNumber(proj.damage, new Vec3(info?.x ?? entity.position.x, entity.position.y + entity.height * 0.6, info?.z ?? entity.position.z));
        }
      },
      onChargeFire: (power) => {
        this.cameraRig.addShake(0.3 + power * 0.5, 0.3);
      },
      onMeleeSwing: () => {
        this.cameraRig.addShake(0.15, 0.15);
      },
      onFired: () => {
        this.stats.registerShot();
      },
    };

    weapon.update(dt, {
      fire: this.input.isDown(Actions.FIRE),
      ads: this.input.isDown(Actions.ADS),
      reload: this.input.wasPressed(Actions.RELOAD),
    }, ctx);

    this.cameraRig.setZoom(weapon.ads, weapon.zoomFov);
  }

  _quickMelee() {
    if (this._meleeCd > 0) return;
    this._meleeCd = 0.5;
    const cam = this.renderer.camera;
    const origin = cam.position.clone();
    const dir = cam.forward.clone();
    for (const e of this.world.enemies) {
      if (!e.alive) continue;
      const to = e.boundsCenter;
      const dist = origin.distanceTo(to);
      if (dist > 2.6 + e.radius) continue;
      const dot = dir.dot(to.clone().sub(origin).normalize());
      if (dot < 0.5) continue;
      e.takeDamage(25, this.player, { element: 'kinetic', sourcePos: origin, weapon: this.player.currentWeapon, knockback: 4 });
      this.hud?.addDamageNumber(25, e.boundsCenter);
    }
    playSfx('gun.melee', { vol: 0.4 });
  }

  _comboDamageMult() {
    if (this.flags.comboDamage) {
      return 1 + Math.min(0.3, this.score.combo * 0.02);
    }
    if (this.flags.berserk) {
      return 1 + this.berserkStacks * 0.08;
    }
    return 1;
  }

  _applyHitPerks(enemy, result) {
    if (this.flags.conductor) {
      const hits = (this.conductorHits.get(enemy.uid) ?? 0) + 1;
      this.conductorHits.set(enemy.uid, hits);
      if (hits % 5 === 0) {
        const nearby = this.world.queryEnemies(enemy.position.x, enemy.position.z, 6).filter((e) => e !== enemy && e.alive).slice(0, 3);
        for (const n of nearby) {
          n.takeDamage(18, this.player, { element: 'shock' });
          this.renderer.tracers.add({
            x1: enemy.position.x, y1: enemy.position.y + enemy.height * 0.6, z1: enemy.position.z,
            x2: n.position.x, y2: n.position.y + n.height * 0.6, z2: n.position.z,
            color: [1, 0.88, 0.3], width: 2, life: 0.12,
          });
        }
      }
    }
    if (this.flags.hunterMark) {
      const hits = (this.hunterHits.get(enemy.uid) ?? 0) + 1;
      this.hunterHits.set(enemy.uid, hits);
      if (hits === 10) {
        enemy.marked = 1.15;
        this.hud?._toast('MARKED', '#ff6ad8');
      }
    }
    void result;
  }

  _ricochet(origin, dir, hit) {
    const n = hit.normal;
    const d = dir.dot(n);
    const ref = dir.clone().addScaled(n, -2 * d);
    const start = new Vec3(hit.x, hit.y, hit.z);
    for (const e of this.world.enemies) {
      if (!e.alive) continue;
      const to = e.boundsCenter;
      const dist = start.distanceTo(to);
      if (dist > 30) continue;
      const dot = ref.dot(to.clone().sub(start).normalize());
      if (dot > 0.97) {
        const dmg = this.player.currentWeapon.shotDamage() * 0.7;
        e.takeDamage(dmg, this.player, { element: this.player.currentWeapon.elementApplied });
        this.renderer.tracers.add({
          x1: start.x, y1: start.y, z1: start.z,
          x2: to.x, y2: to.y, z2: to.z,
          color: [1, 1, 1], width: 2, life: 0.1,
        });
        this.hud?.addDamageNumber(dmg, to);
        return;
      }
    }
    const end = start.clone().addScaled(ref, 30);
    this.renderer.tracers.add({ x1: start.x, y1: start.y, z1: start.z, x2: end.x, y2: end.y, z2: end.z, color: [1, 1, 1], width: 1.5, life: 0.08 });
  }

  // ------------------------------------------------------------ render

  _frameRender() {
    if (this.state === 'playing' || this.state === 'upgrading') {
      const look = this.input.lookDelta();
      this.cameraRig.addLookInput(look.dx, look.dy);
      const w = this.player?.currentWeapon;
      this.cameraRig.update(0, {
        groundSpeed: this.player?.groundSpeed ?? 0,
        grounded: this.player?.movement?.grounded ?? true,
        ads: w?.ads ?? 0,
        recoilPitch: w?.recoil?.viewKick ?? 0,
      });
      if (this.viewmodel && w) {
        this.viewmodel.update(0, w, {
          ads: w.ads,
          recoilPitch: w.recoil.viewKick,
          bobX: this.cameraRig.viewBobX ?? 0,
          bobY: this.cameraRig.viewBobY ?? 0,
          swayX: this.cameraRig.viewSwayX ?? 0,
          swayY: this.cameraRig.viewSwayY ?? 0,
          meleeAnim: w.kind === 'melee' ? w.swingProgress : 0,
        });
      }
    }
    this.renderer.render();
  }

  // ------------------------------------------------------------ misc

  applySettings() {
    const q = settings.get('quality');
    this.renderer.setQuality(QUALITY_PRESETS[q] ?? QUALITY_PRESETS.high);
    this.cumulative.changedSettings = true;
  }

  destroy() {
    this.loop.stop();
    this.renderer.dispose();
    this.hud?.destroy();
    ui.destroy();
  }
}

function hexArr(hex) {
  if (Array.isArray(hex)) return hex;
  const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex ?? '');
  if (!m) return [1, 1, 1];
  return [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255];
}

function elementColorOf(element) {
  switch (element) {
    case 'burn': return '#ff7a3d';
    case 'shock': return '#ffe14d';
    case 'cryo': return '#7df0ff';
    case 'plasma': return '#b26bff';
    case 'void': return '#c07dff';
    case 'energy': return '#6aa8ff';
    default: return '#ffe9a8';
  }
}
