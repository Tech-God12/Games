// ============================================================================
// BossFactory.js
// Creates boss entities: large procedural mesh, huge health/shield, Enemy +
// Boss components, team enemy, boss tag, and a death hook that emits the
// BossDefeated event, drops rewards, and notifies the WaveManager. Reuses
// EnemyFactory's mesh builder for visual consistency.
// ============================================================================

import * as THREE from 'three';
import { Body, Kinematics, Team, Teams, Facing } from '../ecs/components/Body.js';
import { Health, Shield } from '../ecs/components/Vitals.js';
import { Enemy, EnemyState, Boss, WaveMember } from '../ecs/components/Gameplay.js';
import { CurrencyDrop, Experience } from '../ecs/components/Combat.js';
import { MeshRef, GlowPulse } from '../ecs/components/Render.js';
import { bus, Channels } from '../core/EventBus.js';
import { clamp } from '../core/MathUtils.js';

export class BossFactory {
  constructor(world, scene, assets, effects, enemyFactory, waveManager) {
    this.world = world; this.scene = scene; this.assets = assets; this.effects = effects;
    this.enemyFactory = enemyFactory; this.waveManager = waveManager;
  }

  spawn(id, x, z, opts = {}) {
    const def = this._registry().get(id) || this._registry().all()[0];
    if (!def) return null;
    const wave = opts.wave || 5;
    const e = this.world.createEntity('boss:' + id);
    const hpScale = 1 + (wave - 5) * 0.15;

    const body = new Body();
    body.pos.set(x, def.flying ? def.hoverHeight : 0, z);
    body.radius = def.radius; body.height = def.height;
    body.gravityScale = def.flying ? 0 : 1; body.friction = def.flying ? 1.5 : 5;
    e.add(body);

    const team = new Team(); team.id = Teams.Enemy; e.add(team);
    e.tag('Enemy'); e.tag('Boss');

    const health = new Health();
    health.max = def.health * hpScale; health.current = health.max;
    health.armor = def.armor; health.regen = 0; health.deathBuffer = 0.2;
    e.add(health);
    if (def.shield) { const sh = new Shield(); sh.max = def.shield * hpScale; sh.current = sh.max; e.add(sh); }

    const kin = new Kinematics(); kin.maxSpeed = def.speed; e.add(kin);
    const facing = new Facing(); e.add(facing);

    const enemy = new Enemy();
    enemy.archetypeId = id; enemy.behavior = def.behavior || 'tank';
    enemy.attackRange = def.attack?.range || 40; enemy.preferredRange = def.attack?.preferredRange || 16;
    enemy.detectRange = 80; enemy.damageScale = 1 + (wave - 5) * 0.05;
    e.add(enemy);
    e.meta.baseSpeed = kin.maxSpeed;
    e.meta.contactDamage = def.contactDamage * enemy.damageScale;
    if (def.attack?.type === 'ranged') e.meta.projectile = def.attack.projectile;

    const boss = new Boss();
    boss.bossId = id; boss.title = def.title; boss.subtitle = def.subtitle;
    boss.maxPhases = def.phases.length;
    boss.phaseThresholds = def.phases.slice(1).map(p => p.threshold);
    boss.abilityQueue = def.phases[0].abilities.slice();
    boss.phase = 1;
    e.add(boss);

    const wm = new WaveMember(); wm.isBoss = true; e.add(wm);
    const xp = new Experience(); xp.value = def.xp; e.add(xp);
    const cur = new CurrencyDrop(); cur.min = def.currency.min; cur.max = def.currency.max; e.add(cur);

    // visual: reuse enemy mesh builder via a synthetic archetype
    const meshRef = new MeshRef();
    const mesh = this.enemyFactory._buildMesh({ shape: def.shape, color: def.color, accent: def.accent, orientYaw: true }, true);
    mesh.scale.setScalar(def.scale);
    mesh.position.copy(body.pos);
    meshRef.object = mesh; meshRef.syncFacing = true; meshRef.castShadow = !def.flying;
    e.add(meshRef);
    this.scene.add(mesh);
    const gp = new GlowPulse(); gp.base = 1.2; gp.amplitude = 0.6; gp.speed = 2; e.add(gp);

    // death listener
    const onDeath = () => {
      bus.emit(Channels.BossDefeated, { entity: e, id });
      bus.emit(Channels.PlaySFX, { name: 'explosion', volume: 1.0 });
      bus.emit(Channels.PlaySFX, { name: 'wave_clear', volume: 0.6 });
      if (this.effects) { this.effects.explosion(body.pos.clone().setY(1), def.color, true); this.effects.explosion(body.pos.clone().setY(2).add(new THREE.Vector3(2,0,0)), def.accent, true); this.effects.addShake(0.9); }
      if (this.waveManager) this.waveManager.notifyBossDefeated();
    };
    e.meta.onBossDeath = onDeath;
    bus.emit(Channels.BossSpawn, { entity: e, def });
    bus.emit(Channels.Toast, { text: def.title, color: '#ff3df0' });
    return e;
  }

  _registry() {
    if (!this._reg) { const { BossRegistry } = require_boss(); this._reg = BossRegistry; }
    return this._reg;
  }
}

let _bossRegRef = null;
export function setBossRegistryForFactory(r) { _bossRegRef = r; }
function require_boss() { return { BossRegistry: _bossRegRef }; }
