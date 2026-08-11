// ============================================================================
// Game.js
// Top-level coordinator: owns the world, all systems and subsystems, the
// player, and the run state machine (menu / playing / levelup / paused /
// dead / shop). Wires the event bus, content registries, audio, save, and UI.
// Provides the run lifecycle (start/end), upgrade & shop choices, and the
// per-frame update routing consumed by the Engine.
// ============================================================================

import * as THREE from 'three';
import { bus, Channels } from '../core/EventBus.js';
import { Random } from '../core/Random.js';
import { clamp, lerp, formatNumber, formatTime } from '../core/MathUtils.js';

import { World } from '../ecs/World.js';
import { Body, Kinematics, Team, Teams, Facing } from '../ecs/components/Body.js';
import { Health, Shield } from '../ecs/components/Vitals.js';
import { Player, PlayerState, WaveMember } from '../ecs/components/Gameplay.js';
import { Collider, CollisionLayer } from '../ecs/components/Collision.js';
import { StatusEffects, StatusType, DamageType, Experience } from '../ecs/components/Combat.js';
import { MeshRef } from '../ecs/components/Render.js';

import { EffectsManager } from '../effects/EffectsManager.js';
import { Arena } from '../world/Arena.js';
import { ProjectileFactory } from '../combat/ProjectileFactory.js';
import { EnemyFactory } from '../enemies/EnemyFactory.js';
import { BossFactory } from '../bosses/BossFactory.js';
import { PlayerController } from '../player/PlayerController.js';
import { CameraRig } from '../player/CameraRig.js';
import { Viewmodel } from '../player/Viewmodel.js';
import { WeaponController } from '../player/WeaponController.js';
import { ProgressionManager } from '../progression/ProgressionManager.js';
import { WaveManager, setEnemyRegistryForWaves } from '../waves/WaveManager.js';
import { PickupManager } from '../pickups/PickupManager.js';
import { UIManager } from '../ui/UIManager.js';
import { installExtraScreens } from '../ui/ExtraScreens.js';
import { applyDamage, heal } from '../combat/Damage.js';
import { HazardFactory, HazardSystem } from '../world/Hazards.js';
import { ComboSystem } from '../progression/ComboSystem.js';
import { AchievementManager, AchievementRegistry } from '../progression/Achievements.js';
import { DecalSystem } from '../effects/Decals.js';
import { WeatherSystem } from '../effects/Weather.js';
import { DifficultyManager } from './Difficulty.js';
import { DailyChallenge } from './DailyChallenge.js';
import { MetaSkillTree } from '../progression/MetaSkillTree.js';
import { StatsTracker } from '../progression/StatsTracker.js';
import { RunLog } from './RunLog.js';
import { Telemetry } from './Telemetry.js';

// Systems
import { LifetimeSystem } from '../systems/LifetimeSystem.js';
import { VitalsSystem } from '../systems/VitalsSystem.js';
import { StatusEffectSystem } from '../systems/StatusEffectSystem.js';
import { MovementSystem } from '../systems/MovementSystem.js';
import { EnemyAISystem } from '../systems/EnemyAISystem.js';
import { BossAISystem } from '../systems/BossAISystem.js';
import { ProjectileSystem } from '../systems/ProjectileSystem.js';
import { PickupSystem } from '../systems/PickupSystem.js';
import { RenderSyncSystem } from '../systems/RenderSyncSystem.js';

// Content + registries
import '../content/index.js';
import { WeaponRegistry } from '../weapons/WeaponRegistry.js';
import { EnemyRegistry } from '../enemies/EnemyRegistry.js';
import { ItemRegistry } from '../items/ItemRegistry.js';
import { PerkRegistry } from '../perks/PerkRegistry.js';
import { AbilityRegistry } from '../abilities/AbilityRegistry.js';
import { CharacterRegistry } from '../player/Characters.js';
import { BossRegistry } from '../bosses/BossRegistry.js';
import { setBossRegistryForFactory } from '../bosses/BossFactory.js';

export const GameState = Object.freeze({
  Boot: 'boot', Menu: 'menu', Playing: 'playing', LevelUp: 'levelup',
  Paused: 'paused', Dead: 'dead', Shop: 'shop', Victory: 'victory',
});

export class Game {
  constructor(engine) {
    this.engine = engine;
    this.scene = engine.scene;
    this.camera = engine.camera;
    this.input = engine.input;
    this.audio = engine.audio;
    this.assets = engine.assets;
    this.save = engine.save;
    this.state = GameState.Boot;
    this.rng = new Random((Date.now() & 0xffffffff) >>> 0);
    this._listeners = [];
    this._abilityCooldowns = {};
    this._waveUsedPhoenix = false;
    this._vengefulTime = 0;
  }

  onAttach(engine) {
    // registries
    setEnemyRegistryForWaves(EnemyRegistry);
    setBossRegistryForFactory(BossRegistry);

    // world
    this.world = new World();

    // effects
    this.effects = new EffectsManager(this.scene, this.camera, this.assets);
    this.effects.setShakeScale(this.save.settings.screenShake ?? 1);

    // decals & weather
    this.decals = new DecalSystem(this.scene);
    this.weather = new WeatherSystem(this.scene, this.assets, 34);
    this.effects.decals = this.decals;

    // difficulty
    this.difficulty = new DifficultyManager(this.save);

    // daily challenges
    this.dailyChallenge = new DailyChallenge(this.save, WeaponRegistry.ids(), CharacterRegistry.ids());

    // arena
    this.arena = new Arena(this.scene, this.assets);
    this.arena.build(this.rng.int(1, 99999));

    // factories
    this.projectileFactory = new ProjectileFactory(this.world, this.scene, this.assets, this.effects);
    this.enemyFactory = new EnemyFactory(this.world, this.scene, this.assets, this.effects);

    // player controller pieces (player entity created on run start)
    this.cameraRig = new CameraRig(this.camera, this.engine.viewmodelCamera);
    this.cameraRig.effects = this.effects;
    this.cameraRig.setFOV(this.save.settings.fov || 75);
    this.viewmodel = new Viewmodel(this.engine.viewmodelScene, this.assets);
    this.playerController = new PlayerController(this.input);
    this.playerController.arena = this.arena; this.playerController.effects = this.effects;
    this.weapons = new WeaponController(this.input);
    this.weapons.camera = this.camera; this.weapons.cameraRig = this.cameraRig;
    this.weapons.viewmodel = this.viewmodel; this.weapons.projectileFactory = this.projectileFactory;
    this.weapons.effects = this.effects; this.weapons.arena = this.arena; this.weapons.assets = this.assets;
    this.weapons.init(this.world);

    // boss factory + wave manager
    this.bossFactory = new BossFactory(this.world, this.scene, this.assets, this.effects, this.enemyFactory, null);
    this.waveManager = new WaveManager(this.world, this.enemyFactory, this.arena, { rng: this.rng });
    this.waveManager.bossFactory = this.bossFactory;
    this.bossFactory.waveManager = this.waveManager;

    // pickup manager
    this.pickupManager = new PickupManager(this.world, this.scene, this.assets, this.arena);
    this.pickupManager.setRegistry(EnemyRegistry);

    // hazards
    this.hazardFactory = new HazardFactory(this.world, this.scene, this.assets, this.effects);
    this.hazardSystem = new HazardSystem(this.world);
    this._hazardTimer = 10;

    // progression
    this.progression = new ProgressionManager(null, this.weapons, this.save);
    this.progression.setRegistries({ items: ItemRegistry, perks: PerkRegistry });

    // combo & achievements
    this.comboSystem = new ComboSystem(this.progression, this.effects);
    this.achievementManager = new AchievementManager(this.save);
    this.statsTracker = new StatsTracker(this.save);
    this.runLog = new RunLog(this.progression);
    this.telemetry = new Telemetry();
    this._runCtx = {};

    // systems
    this._registerSystems();

    // wire system cross-refs
    this._wireSystems();

    // UI
    this.ui = new UIManager(this);
    this.ui.build();
    installExtraScreens(this.ui);

    // bus listeners
    this._wireBus();

    // start at menu
    this.viewmodel.hide();
    this.state = GameState.Menu;
    this.ui.show('menu');
    if (this.audio) { this.audio.init(); this.audio.playMusic('menu'); }
    bus.emit(Channels.GameStateChange, { state: this.state });
  }

  _registerSystems() {
    this.world.addSystem(new LifetimeSystem());
    this.world.addSystem(new VitalsSystem());
    this.world.addSystem(new StatusEffectSystem());
    this.world.addSystem(new MovementSystem());
    this.world.addSystem(new ProjectileSystem());
    this.world.addSystem(new PickupSystem());
    this.world.addSystem(new EnemyAISystem());
    this.world.addSystem(new BossAISystem());
    this.world.addSystem(new RenderSyncSystem());
  }

  _wireSystems() {
    const w = this.world;
    const movement = w.getSystem('MovementSystem'); if (movement) movement.arena = this.arena;
    const projectile = w.getSystem('ProjectileSystem');
    if (projectile) { projectile.arena = this.arena; projectile.effects = this.effects; projectile.progression = this.progression; }
    const status = w.getSystem('StatusEffectSystem'); if (status) status.effects = this.effects;
    const ai = w.getSystem('EnemyAISystem');
    if (ai) { ai.arena = this.arena; ai.effects = this.effects; ai.projectileFactory = this.projectileFactory; ai.progression = this.progression; ai.spawnEnemy = (id, x, z, o) => this.enemyFactory.spawn(id, x, z, o); }
    const boss = w.getSystem('BossAISystem');
    if (boss) { boss.arena = this.arena; boss.effects = this.effects; boss.projectileFactory = this.projectileFactory; boss.spawnEnemy = (id, x, z, o) => this.enemyFactory.spawn(id, x, z, o); }
    const pickup = w.getSystem('PickupSystem'); if (pickup) { pickup.effects = this.effects; pickup.progression = this.progression; }
    if (this.hazardSystem) { this.hazardSystem.setPlayer(this.player); this.hazardSystem.setEffects(this.effects); }
    const render = w.getSystem('RenderSyncSystem'); if (render) render.camera = this.camera;
    this.projectileSystem = projectile;
    this.aiSystem = ai; this.bossSystem = boss; this.pickupSystem = pickup;
  }

  _wireBus() {
    this._listeners.push(bus.on(Channels.EntityKilled, (ev) => this._onEntityKilled(ev)));
    this._listeners.push(bus.on(Channels.PlayerDeath, (ev) => this._onPlayerDeath(ev)));
    this._listeners.push(bus.on(Channels.PlayerDamaged, (ev) => this._onPlayerDamaged(ev)));
    this._listeners.push(bus.on(Channels.LevelUp, () => this._onLevelUp()));
    this._listeners.push(bus.on(Channels.WaveCleared, () => this._onWaveCleared()));
    this._listeners.push(bus.on(Channels.WaveStart, (e) => this._waveUsedPhoenix = false));
    this._listeners.push(bus.on(Channels.InputPointerLock, (e) => this._onPointerLock(e)));
    this._listeners.push(bus.on(Channels.InputAction, (e) => this._onInputAction(e)));
    this._listeners.push(bus.on(Channels.EntityDamaged, (ev) => this._onEntityDamaged(ev)));
    this._listeners.push(bus.on('pickup.nuke', () => this._nuke()));
    this._listeners.push(bus.on('pickup.freeze', () => this._freezeAll()));
    this._listeners.push(bus.on('pickup.magnet', () => this._magnetAll()));
    this._listeners.push(bus.on(Channels.EngineResize, () => this.ui && this.ui.onResize && this.ui.onResize()));
  }

  // -----------------------------------------------------------------
  // Run lifecycle
  // -----------------------------------------------------------------
  startRun(characterId = 'ranger', opts = {}) {
    const char = CharacterRegistry.get(characterId) || CharacterRegistry.get('ranger');
    this.character = char;
    this._challenge = opts.challenge || null;
    this._challengeCtx = this._challenge ? this._buildChallengeContext(this._challenge) : null;
    // clear world (keep systems)
    this.world.reset();
    // rebuild arena for variety
    this.arena.setBiome(this._pickBiome());
    this.arena.build(this.rng.int(1, 99999));
    this._wireSystems(); // re-bind arena refs after rebuild

    // create player
    this.player = this._createPlayer(char);
    this.playerController.setPlayer(this.player);
    this.projectileSystem.setPlayer(this.player);
    this.aiSystem.setPlayer(this.player);
    this.bossSystem.setPlayer(this.player);
    this.pickupSystem.setPlayer(this.player);

    // weather for the new biome
    this.weather.setBiome(this.arena.biome.id);

    // progression (apply persistent meta-skill-tree bonuses to base stats)
    this.progression.player = this.player;
    this.progression.setCharacter(char);
    this.progression.reset();
    this._applyMetaSkillTree();
    this._applyChallenge();
    this.progression.recompute();

    // difficulty -> wave manager
    this.waveManager.difficulty = this.difficulty;

    // weapons
    this.weapons.slots.length = 0; this.weapons.current = 0;
    const startWeapons = (this._challenge && this._challenge.weapons) ? this._challenge.weapons : char.startWeapons;
    for (const wid of startWeapons) this.weapons.addWeapon(wid);
    this.weapons.select(0);
    this.weapons.refillAll();
    this.viewmodel.show();

    // wave manager
    this.waveManager.rng = this.rng.child('wave');
    this.waveManager.start();

    // combo + achievements + run context
    this.comboSystem.reset();
    this._hazardTimer = 8;
    this._runCtx = { maxCombo: 0, itemCount: 0, perkCount: 0, weaponSlots: this.weapons.slots.length, bossNoDamage: true, wave10Under5: false, bossKillLowHP: false };
    this.achievementManager.setRunContext(this._runCtx);
    this._wave10StartTime = null;

    // state
    this.setState(GameState.Playing);
    this.requestLock();
    if (this.audio) { this.audio.playMusic('combat'); }
    bus.emit(Channels.RunStart, { character: char });
    this.ui.show('hud');
  }

  _pickBiome() {
    const unlocked = ['neon', 'void', 'crystal', 'inferno', 'frost', 'cyber']
      .filter(id => { const b = this._biomeById(id); return b.unlockWave <= (this.save.records.bestWave || 0); });
    const pool = unlocked.length ? unlocked : ['neon'];
    // bias toward recent biomes as waves rise handled elsewhere; pick random
    return pool[Math.floor(this.rng.next() * pool.length)] || 'neon';
  }
  _biomeById(id) { const m = { neon: { unlockWave: 0 }, void: { unlockWave: 6 }, crystal: { unlockWave: 12 }, inferno: { unlockWave: 18 }, frost: { unlockWave: 24 }, cyber: { unlockWave: 30 } }; return m[id] || { unlockWave: 0 }; }

  _createPlayer(char) {
    const e = this.world.createEntity('player');
    const body = new Body();
    body.pos.set(this.arena.centerX, this.arena.floorY + 0.85, this.arena.centerZ);
    body.radius = 0.4; body.height = 1.7; body.gravityScale = 1; body.friction = 8;
    e.add(body);
    const kin = new Kinematics(); kin.maxSpeed = char.startSpeed; kin.dashCooldown = 0.9; e.add(kin);
    const health = new Health(); health.max = char.startMaxHP; health.current = char.startMaxHP; health.regenDelay = 4; e.add(health);
    if (char.startShield) { const sh = new Shield(); sh.max = char.startShield; sh.current = char.startShield; e.add(sh); }
    const team = new Team(); team.id = Teams.Player; e.add(team);
    const player = new Player(); player.characterId = char.id; e.add(player);
    const facing = new Facing(); e.add(facing);
    e.tag('Player');
    return e;
  }

  endRun(won = false) {
    const summary = {
      wave: this.waveManager.wave, score: this.progression.score, kills: this.progression.kills,
      time: this.progression.time, bossesKilled: this.progression.bossesKilled, won,
    };
    this.save.recordRun(summary);
    // meta points from currency earned this run (convert a fraction to meta points)
    const earned = Math.max(0, this.progression.currency - (this._challengeCtx?.startCurrency || 0));
    this.save.meta.metaPoints = (this.save.meta.metaPoints || 0) + Math.floor(earned * 0.5);
    // challenge evaluation
    if (this._challenge && this.dailyChallenge) {
      if (this.dailyChallenge.evaluate(this._challenge, summary)) {
        this.dailyChallenge.markCompleted(this._challenge.key);
        bus.emit(Channels.Toast, { text: 'CHALLENGE COMPLETE!', color: '#ffd24a' });
      }
    }
    this._challenge = null; this._challengeCtx = null;
    // unlock checks
    this._checkUnlocks();
    this.save.save();
    this.viewmodel.hide();
    if (this.audio) this.audio.playMusic('menu');
  }

  _buildChallengeContext(ch) {
    if (!this.dailyChallenge) return null;
    return this.dailyChallenge.buildRunContext(ch);
  }

  _applyChallenge() {
    const ctx = this._challengeCtx; if (!ctx) return;
    if (ctx.maxHPOverride) this.progression._baseMaxHP = ctx.maxHPOverride;
    else if (ctx.maxHPMult) this.progression._baseMaxHP *= ctx.maxHPMult;
    if (ctx.damageMult) this.progression._baseDamageMult *= ctx.damageMult;
    if (ctx.moveMult) this.progression._baseMoveSpeedMult *= ctx.moveMult;
    if (ctx.fireRateMult) this.progression._baseFireRateMult *= ctx.fireRateMult;
    if (ctx.currencyMult) this.progression._currencyMult *= ctx.currencyMult;
    if (ctx.xpMult) this.progression._xpMult *= ctx.xpMult;
    if (ctx.lifesteal) this.progression._lifestealAll += ctx.lifesteal;
    if (ctx.spawnMult) this._challengeSpawnMult = ctx.spawnMult;
    if (ctx.enemyHPMult) this._challengeEnemyHPMult = ctx.enemyHPMult;
    if (ctx.damageTakenMult) this._challengeDamageTaken = ctx.damageTakenMult;
  }

  _checkUnlocks() {
    const best = this.save.records.bestWave;
    // unlock weapons by unlockWave
    for (const w of WeaponRegistry.all()) if (w.unlockWave > 0 && w.unlockWave <= best) this.save.unlockWeapon(w.id);
    for (const c of CharacterRegistry.all()) if (c.unlock > 0 && c.unlock <= best) this.save.unlockCharacter(c.id);
    // achievements
    if (this.progression.kills >= 100) this.save.addAchievement('centurion');
    if (this.waveManager.wave >= 10) this.save.addAchievement('wave10');
    if (this.progression.bossesKilled >= 1) this.save.addAchievement('firstBoss');
    if (this.progression.bossesKilled >= 6) this.save.addAchievement('bossSlayer');
  }

  setState(s) { this.state = s; bus.emit(Channels.GameStateChange, { state: s }); this.ui && this.ui.onStateChange(s); }

  requestLock() { if (this.save.settings.autoLock !== false) this.input.requestPointerLock(); }

  // -----------------------------------------------------------------
  // Per-frame
  // -----------------------------------------------------------------
  update(dt, sdt) {
    this.input.updateGamepad();
    if (this.audio) this.audio.update(dt);
    this.save.update(dt);
    if (this.save.settings.showFps) {/* handled by engine stats */}

    if (this.state === GameState.Playing) {
      this._updatePlaying(dt, sdt);
    } else if (this.state === GameState.LevelUp) {
      // frozen sim but keep effects/camera alive
      this.effects.update(dt, this.camera);
      this.arena.update(dt);
    } else if (this.state === GameState.Paused) {
      this.effects.update(dt * 0.2, this.camera);
    } else if (this.state === GameState.Dead) {
      this.effects.update(dt, this.camera);
      this.arena.update(dt);
      // slow orbit camera around death point
      if (this.player) {
        const body = this.player.get(Body);
        const t = performance.now() * 0.0003;
        this.camera.position.set(body.pos.x + Math.cos(t) * 6, body.pos.y + 3, body.pos.z + Math.sin(t) * 6);
        this.camera.lookAt(body.pos.x, body.pos.y + 1, body.pos.z);
      }
    } else if (this.state === GameState.Menu) {
      this.arena.update(dt);
      this.effects.update(dt, this.camera);
      // slow menu camera orbit
      const t = performance.now() * 0.00015;
      this.camera.position.set(Math.cos(t) * 20, 8, Math.sin(t) * 20);
      this.camera.lookAt(0, 2, 0);
    }
    this.input.endFrame();
  }

  _updatePlaying(dt, sdt) {
    // dynamic buff timers
    if (this.player?.meta?.overdrive) { this.player.meta.overdrive -= dt; if (this.player.meta.overdrive <= 0) { this.player.meta.overdrive = 0; this.progression.recompute(); } }
    if (this._vengefulTime > 0) { this._vengefulTime -= dt; if (this._vengefulTime <= 0) this.progression.recompute(); }
    // sentry deployable
    if (this.player?.meta?.sentry) { this._updateSentry(dt); }
    // adrenaline junkie dash buff
    const p = this.player.get(Player);
    if (p && p.dashTime > 0 && (this.progression.perks.includes('adrenalineJunkie') || this.character?.passive?.id === 'phase')) {
      this.player.meta.adrenaline = 0.3;
    } else if (this.player.meta?.adrenaline) { this.player.meta.adrenaline -= dt; if (this.player.meta.adrenaline <= 0) { delete this.player.meta.adrenaline; this.progression.recompute(); } else if (!this._adrenalineApplied) { this._adrenalineApplied = true; this.progression.recompute(); } }

    this.playerController.update(dt);
    this.weapons.update(dt);
    this.weapons.arena = this.arena;
    this._updateAbilities(dt);
    this.world.update(dt, sdt);
    this.waveManager.update(dt);
    this.pickupManager.update(dt);
    this.hazardSystem.update(dt);
    this._updateHazardSpawner(dt);
    this.decals.update(dt);
    this.weather.update(dt);
    this.progression.update(dt);
    this.world.clock = { elapsed: this.progression.time };
    this.comboSystem.update(dt);
    // update run context for achievements
    this._runCtx.maxCombo = Math.max(this._runCtx.maxCombo, this.comboSystem.count);
    this._runCtx.itemCount = this.progression.items.length;
    this._runCtx.perkCount = this.progression.perks.length;
    this._runCtx.weaponSlots = this.weapons.slots.length;
    if (this.waveManager.wave >= 10 && this._wave10StartTime === null) { this._wave10StartTime = this.progression.time; this._runCtx.wave10Under5 = this._wave10StartTime <= 300; }
    this.achievementManager.update(dt);
    this.statsTracker.update(dt);
    this.telemetry.update(dt);
    if (this.player) { const b = this.player.get(Body); if (b) this.statsTracker.noteDistance(b.pos); }
    this.statsTracker.noteBiomeTime(this.arena.biome.id, dt);
    this.cameraRig.update(dt, this.player);
    this.viewmodel.update(dt, this.player, this.weapons.currentWeapon);
    this.effects.update(dt, this.camera);
    this.arena.update(dt);

    // audio intensity from combat
    if (this.audio) {
      const alive = this.waveManager.aliveCount;
      const hpFrac = this.player.get(Health).fraction;
      this.audio.setIntensity(clamp(alive / 12 + (1 - hpFrac) * 0.3, 0, 1));
    }

    // HUD update
    this.ui && this.ui.tick(dt);
  }

  _updateHazardSpawner(dt) {
    if (this.waveManager.state !== 'active') return;
    const kind = this._biomeHazardKind();
    if (!kind) return;
    this._hazardTimer -= dt;
    if (this._hazardTimer <= 0) {
      this._hazardTimer = this.rng.range(10, 18);
      const pt = this.arena.interiorPoint(this.rng, this.arena.boundsRadius - 4);
      // avoid spawning on the player
      const pb = this.player.get(Body);
      if (pb && Math.hypot(pt.x - pb.pos.x, pt.z - pb.pos.z) < 6) return;
      const dmgScale = 1 + this.waveManager.wave * 0.04;
      this.hazardFactory.spawn(kind, pt.x, pt.z, { duration: this.rng.range(6, 10), damageScale, team: 'player' });
    }
  }

  _biomeHazardKind() {
    const id = this.arena.biome.id;
    return ({ neon: null, void: 'void', crystal: 'shard', inferno: 'fire', frost: 'ice', cyber: 'laser' })[id] || null;
  }

  _applyMetaSkillTree() {
    const ranks = this.save.meta.upgrades || {};
    const ctx = { maxHP: this.progression._baseMaxHP, maxHPMult: 1, damageMult: 1, moveMult: 1, fireRateMult: 1, reloadMult: 1, critChance: 0, critMult: 0, headshotMult: 0, lifesteal: 0, shield: 0, armor: 0, regen: 0, currencyMult: 1, xpMult: 1, dashCDMult: 1, statusPowerMult: 1, statusChanceMult: 1, aoeMult: 1, pierce: 0, weaponSlots: this.weapons.maxSlots, startCurrency: 0, shopOffers: 4, revive: 0 };
    MetaSkillTree.applyRunStart(ranks, ctx);
    this.progression._baseMaxHP = (ctx.maxHP || 100) * (ctx.maxHPMult || 1);
    this.progression._baseDamageMult = ctx.damageMult || 1;
    this.progression._baseFireRateMult = ctx.fireRateMult || 1;
    this.progression._baseMoveSpeedMult = ctx.moveMult || 1;
    this.progression._baseCritChance = ctx.critChance || 0;
    this.progression._baseCritMult = ctx.critMult || 0;
    this.progression._baseShield = ctx.shield || 0;
    this.progression._lifestealAll = ctx.lifesteal || 0;
    this.progression._xpMult = ctx.xpMult || 1;
    this.progression._currencyMult = ctx.currencyMult || 1;
    this._metaCtx = ctx;
    if (ctx.weaponSlots) this.weapons.maxSlots = ctx.weaponSlots;
    if (ctx.startCurrency) this.progression.currency += ctx.startCurrency;
  }

  _updateSentry(dt) {
    const s = this.player.meta.sentry;
    s.time -= dt; s.cooldown -= dt;
    if (s.time <= 0) { delete this.player.meta.sentry; return; }
    if (s.cooldown <= 0) {
      // find nearest enemy in range
      const enemies = this.aiSystem.enemyQuery.array;
      let best = null, bd = 18;
      for (const e of enemies) { const eb = e.get(Body); if (!eb) continue; const d = s.pos.distanceTo(eb.pos); if (d < bd) { bd = d; best = e; } }
      if (best) {
        const eb = best.get(Body);
        const dir = new THREE.Vector3().subVectors(eb.pos, s.pos).setY(0).normalize();
        this.projectileFactory.spawn({
          position: s.pos.clone().setY(1.2), direction: dir, team: 'player', ownerId: this.player.id,
          damage: 18, damageType: DamageType.Kinetic, knockback: 2, color: 0x29e7ff,
          projectile: { speed: 50, gravity: 0, lifetime: 1.5, color: 0x29e7ff, radius: 0.16, shape: 'shard', scale: 1, glow: true, trail: true },
        });
        if (this.effects) this.effects.muzzle(s.pos.clone().setY(1.2), dir, 0x29e7ff);
        s.cooldown = 0.18;
      }
    }
  }

  _updateAbilities(dt) {
    const char = this.character; if (!char || !char.ability) return;
    const ability = AbilityRegistry.get(char.ability); if (!ability) return;
    this._abilityCooldowns[ability.id] = Math.max(0, (this._abilityCooldowns[ability.id] || 0) - dt);
    const key = ability.key;
    if (this.input.pressed(ability.key) || (ability.key === 'KeyQ' && this.input.pressed('ability1'))) {
      if (this._abilityCooldowns[ability.id] <= 0) {
        const ctx = { player: this.player, world: this.world, effects: this.effects, projectileFactory: this.projectileFactory, enemyQuery: this.aiSystem.enemyQuery, arena: this.arena, progression: this.progression, engine: this.engine };
        const ok = ability.activate(ctx);
        if (ok) this._abilityCooldowns[ability.id] = ability.cooldown;
      }
    }
  }

  fixedUpdate(fixed) {
    if (this.state === GameState.Playing) {
      this.world.clock = { elapsed: this.progression.time };
      this.world.fixedUpdate(fixed);
    }
  }

  // -----------------------------------------------------------------
  // Event handlers
  // -----------------------------------------------------------------
  _onEntityKilled(ev) {
    const e = ev.entity; if (!e) return;
    if (e.hasTag('Player')) return;
    const isBoss = e.hasTag('Boss');
    // boss death hook
    if (isBoss && e.meta.onBossDeath) { try { e.meta.onBossDeath(); } catch (err) { console.error(err); } }
    if (isBoss) {
      const h = this.player.get(Health);
      if (h && h.fraction < 0.1) this._runCtx.bossKillLowHP = true;
    }
    // rewards
    const xp = e.get(Experience.type);
    this.progression.addKill(xp ? xp.value : 1, isBoss);
    // split
    if (e.meta.splitInto) { const sp = e.meta.splitInto; const body = e.get(Body); if (body) for (let i = 0; i < (sp.count || 2); i++) this.enemyFactory.spawn(sp.id, body.pos.x + (Math.random() - 0.5) * 1.5, body.pos.z + (Math.random() - 0.5) * 1.5, { scaleHealth: 0.6, scaleDamage: 0.8 }); }
    // chain reactor item
    if (this.progression.items.includes('chainReactor') && Math.random() < 0.3) this._chainLightning(e);
    // necromancer perk
    if (this.progression.perks.includes('necromancer') && Math.random() < 0.15) this._spawnAllyDrone(e);
    // executioner perk
    if (this.progression.perks.includes('executioner')) { const w = this.weapons.currentWeapon; if (w) w.ammo = Math.min(w.effectiveMagazine, w.ammo + Math.ceil(w.effectiveMagazine * 0.05)); this._executionerTime = 2; }
    // suppress perk: reduce ability cd
    if (this.character?.passive?.id === 'suppress' && this.character.ability) { const id = this.character.ability; this._abilityCooldowns[id] = Math.max(0, (this._abilityCooldowns[id] || 0) - 0.5); }
    // stats
    const en = e.get('Enemy'); if (en) { this.save.stats.enemyKills[en.archetypeId] = (this.save.stats.enemyKills[en.archetypeId] || 0) + 1; this.save.markDirty(); }
  }

  _chainLightning(fromEntity) {
    const body = fromEntity.get(Body); if (!body) return;
    const enemies = this.aiSystem.enemyQuery.array;
    let prev = body.pos.clone(); let hits = 0;
    const hitSet = new Set([fromEntity.id]);
    for (let i = 0; i < 4 && hits < 4; i++) {
      let best = null, bd = 8;
      for (const e of enemies) { if (hitSet.has(e.id) || !e.alive) continue; const eb = e.get(Body); if (!eb) continue; const d = prev.distanceTo(eb.pos); if (d < bd) { bd = d; best = e; } }
      if (!best) break;
      const eb = best.get(Body);
      if (this.effects) this.effects.beam(prev.clone().setY(1), eb.pos.clone().setY(1), 0x29e7ff, 0.08, 0.12);
      applyDamage(best, { amount: 40, type: DamageType.Shock, crit: false, headshot: false, knockback: 2, statusChance: 0.5, statusType: StatusType.Shock, statusPower: 1, statusDuration: 1, lifesteal: 0, attacker: this.player, world: this.world, effects: this.effects, hitPoint: eb.pos.clone(), source: 'player' });
      hitSet.add(best.id); prev = eb.pos.clone(); hits++;
    }
  }

  _spawnAllyDrone(fromEntity) {
    // a friendly "drone" that shoots enemies — implement as a temporary turret-like entity
    const body = fromEntity.get(Body); if (!body) return;
    this.player.meta = this.player.meta || {};
    const arr = this.player.meta.allies = this.player.meta.allies || [];
    if (arr.length > 3) return;
    arr.push({ pos: body.pos.clone(), time: 12, cooldown: 0 });
  }

  _onEntityDamaged(ev) {
    // event items: onHit status + giantkiller
    const target = ev.entity; if (!target || target.hasTag('Player')) return;
    // giantkiller
    if (this.progression.items.includes('giantkillerBlade') && (target.hasTag('Boss') || target.get('WaveMember')?.isElite)) {
      // apply bonus as direct damage
      const h = target.get(Health); if (h && h.alive) { h.current -= ev.amount * 0.6; if (this.effects && ev.hitPoint) this.effects.damageNumber(ev.hitPoint, Math.round(ev.amount * 0.6), '#ffd24a', true); }
    }
  }

  _onPlayerDamaged(ev) {
    if (!this.player) return;
    if (this.waveManager.isBossWave) this._runCtx.bossNoDamage = false;
    // vengeful spirit item
    if (this.progression.items.includes('vengefulSpirit') && this._vengefulTime <= 0) { this._vengefulTime = 3; this.progression.recompute(); }
    // thorns
    const thorns = this.player.meta?.thorns || 0;
    if (thorns > 0 && ev.entity && ev.entity.alive) {
      applyDamage(ev.entity, { amount: thorns, type: DamageType.True, crit: false, headshot: false, knockback: 0, statusChance: 0, lifesteal: 0, attacker: this.player, world: this.world, effects: this.effects, hitPoint: ev.entity.get(Body)?.pos.clone(), source: 'player' });
    }
    // screen flash
    if (this.effects) this.effects.screenFlash([255, 40, 80], 0.5);
    bus.emit(Channels.PlaySFX, { name: 'hit_player', volume: 0.5 });
  }

  _onPlayerDeath(ev) {
    // phoenix feather / last stand
    const hasPhoenix = this.progression.items.includes('phoenixFeather') || this.progression._lastStand;
    if (hasPhoenix && !this._waveUsedPhoenix) {
      const h = this.player.get(Health);
      h.current = 1; h.alive = true; h.invulnTime = 2.5;
      this._waveUsedPhoenix = true;
      if (this.effects) { this.effects.flash(this.player.get(Body).pos.clone().setY(1), 0xff7733, 3); this.effects.screenFlash([255, 120, 40], 0.7); }
      bus.emit(Channels.Toast, { text: 'PHOENIX REVIVE!', color: '#ff7733' });
      bus.emit(Channels.PlaySFX, { name: 'levelup', volume: 0.7 });
      return;
    }
    this.setState(GameState.Dead);
    this.input.exitPointerLock();
    this.effects.addShake(1.0);
    if (this.effects) this.effects.screenFlash([255, 0, 40], 0.9);
    bus.emit(Channels.PlaySFX, { name: 'player_death', volume: 0.8 });
    this.endRun(false);
    this.ui.show('gameover');
  }

  _onLevelUp() {
    if (this.state !== GameState.Playing) return;
    if (this.progression.pendingLevelUps <= 0) return;
    this.setState(GameState.LevelUp);
    this.input.exitPointerLock();
    this._presentLevelUp();
  }

  _presentLevelUp() {
    const count = 3 + (this.progression._extraChoices || 0);
    const choices = this.progression.rollUpgrades(this.rng, count);
    // mix in occasional perks
    if (this.rng.chance(0.25)) {
      const perk = PerkRegistry.random(this.rng, { exclude: this.progression.perks });
      if (perk) choices[Math.floor(this.rng.next() * choices.length)] = { __perk: true, ...perk, name: perk.name, description: perk.description, icon: perk.icon, rarity: perk.rarity, id: 'perk:' + perk.id };
    }
    this.ui.presentLevelUp(choices);
  }

  chooseUpgrade(choice) {
    if (choice.__perk) { this.progression.addPerk(choice.id.replace('perk:', '')); if (PerkRegistry.get(choice.id.replace('perk:', ''))?.apply) PerkRegistry.get(choice.id.replace('perk:', '')).apply(this.progression); }
    else this.progression.applyUpgrade(choice.id);
    this.progression.pendingLevelUps--;
    if (this.progression.pendingLevelUps > 0) this._presentLevelUp();
    else { this.setState(GameState.Playing); this.requestLock(); this.ui.show('hud'); }
    this.progression.recompute();
  }

  _onWaveCleared() {
    // refill a bit, maybe drop a shop portal? For now just continue.
    this.weapons.refillAll();
    // small heal between waves
    heal(this.player, this.player.get(Health).max * 0.05);
  }

  _onPointerLock(e) {
    if (!e.locked && this.state === GameState.Playing) {
      this.setState(GameState.Paused);
      this.ui.show('pause');
    } else if (e.locked && this.state === GameState.Paused) {
      this.resume();
    }
    this.ui && this.ui.onPointerLock(e.locked);
  }

  _onInputAction(e) {
    if (!e.down) return;
    if (e.action === 'pause') {
      if (this.state === GameState.Playing) { this.setState(GameState.Paused); this.input.exitPointerLock(); this.ui.show('pause'); }
      else if (this.state === GameState.Paused) { this.resume(); }
    }
    if (e.action === 'toggleStats' && this.state !== GameState.Boot) bus.emit(Channels.DebugToggle, {});
  }

  resume() {
    if (this.state === GameState.Paused || this.state === GameState.LevelUp) {
      this.setState(GameState.Playing); this.requestLock(); this.ui.show('hud');
    }
  }

  pause() {
    if (this.state === GameState.Playing) { this.setState(GameState.Paused); this.input.exitPointerLock(); this.ui.show('pause'); }
  }

  retry() { this.startRun(this.character?.id || 'ranger'); }
  toMenu() { this.setState(GameState.Menu); this.input.exitPointerLock(); this.viewmodel.hide(); this.world.reset(); if (this.audio) this.audio.playMusic('menu'); this.ui.show('menu'); }

  // power-up effects
  _nuke() {
    const enemies = this.aiSystem.enemyQuery.array.slice();
    for (const e of enemies) applyDamage(e, { amount: 300, type: DamageType.True, crit: true, headshot: false, knockback: 10, statusChance: 0, lifesteal: 0, attacker: this.player, world: this.world, effects: this.effects, hitPoint: e.get(Body)?.pos.clone(), source: 'player' });
    if (this.effects) this.effects.explosion(new THREE.Vector3(this.arena.centerX, 1, this.arena.centerZ), 20, 0xff3df0, true);
  }
  _freezeAll() {
    const enemies = this.aiSystem.enemyQuery.array;
    for (const e of enemies) { let st = e.get(StatusEffects.type); if (!st) { st = new StatusEffects(); e.add(st); } st.add(StatusType.Freeze, 2, 4); }
  }
  _magnetAll() {
    const picks = this.world.withTag('Pickup');
    for (const p of picks) { const pk = p.get('Pickup'); if (pk) pk.magnetRange = 40; }
  }

  // shop (between waves, opened from pause or auto)
  buyItem(id) {
    const it = ItemRegistry.get(id); if (!it) return false;
    const stacks = this.progression.stacks[id] || 0;
    if (stacks >= it.maxStacks) return false;
    if (!this.progression.spendCurrency(it.price)) return false;
    this.progression.addItem(id);
    this.progression.recompute();
    bus.emit(Channels.PlaySFX, { name: 'pickup', volume: 0.6 });
    return true;
  }

  destroy() {
    for (const off of this._listeners) if (off) off();
    this._listeners = [];
    this.effects?.dispose();
    this.arena?.dispose();
    this.enemyFactory?.dispose();
    this.projectileFactory?.dispose();
    this.viewmodel?.dispose();
    this.pickupManager?.dispose();
    this.ui?.destroy?.();
  }
}
