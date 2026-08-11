// ============================================================================
// EnemyFactory.js
// Turns enemy archetype definitions into live ECS entities: builds the
// procedural visual mesh (by shape), wires Body/Health/Enemy/Collider/Team/
// XP/Currency/WaveMember components, applies wave/difficulty scaling and elite
// modifiers, and registers death hooks (split, drop, etc.). Also provides a
// pooled mesh builder to keep allocation low.
// ============================================================================

import * as THREE from 'three';
import { Body, Kinematics, Team, Teams, Facing } from '../ecs/components/Body.js';
import { Health, Shield } from '../ecs/components/Vitals.js';
import { Enemy, EnemyState, WaveMember, Boss } from '../ecs/components/Gameplay.js';
import { CurrencyDrop, Experience } from '../ecs/components/Combat.js';
import { Collider, CollisionLayer } from '../ecs/components/Collision.js';
import { MeshRef, GlowPulse } from '../ecs/components/Render.js';
import { StatusEffects, StatusType, DamageType } from '../ecs/components/Combat.js';
import { bus, Channels } from '../core/EventBus.js';
import { clamp, lerp, TAU } from '../core/MathUtils.js';

export class EnemyFactory {
  constructor(world, scene, assets, effects) {
    this.world = world;
    this.scene = scene;
    this.assets = assets;
    this.effects = effects;
    this._geoCache = new Map();
  }

  _geo(key, factory) {
    let g = this._geoCache.get(key);
    if (!g) { g = factory(); this._geoCache.set(key, g); }
    return g;
  }

  /**
   * Spawn an enemy.
   * @param {string} id archetype id
   * @param {number} x
   * @param {number} z
   * @param {object} opts { scaleHealth, scaleDamage, scaleSpeed, elite, team, y, biome }
   */
  spawn(id, x, z, opts = {}) {
    const def = EnemyRegistry_get(id);
    if (!def) { console.warn('EnemyFactory: unknown archetype', id); return null; }
    const e = this.world.createEntity('enemy:' + id);
    const sh = opts.scaleHealth || 1;
    const sd = opts.scaleDamage || 1;
    const ss = opts.scaleSpeed || 1;
    const elite = opts.elite || false;

    // Body
    const body = new Body();
    const y = opts.y != null ? opts.y : (def.flying ? (def.hoverHeight || 2.5) : 0);
    body.pos.set(x, y, z);
    body.radius = def.radius || 0.5;
    body.height = def.height || 1.2;
    body.gravityScale = def.flying ? 0 : 1;
    body.friction = def.flying ? 1.5 : 6;
    e.add(body);

    // Team + tags
    const team = new Team(); team.id = Teams.Enemy; e.add(team);
    e.tag('Enemy');

    // Health
    const health = new Health();
    health.max = (def.health || 30) * sh * (elite ? (def.eliteHealthMult || 3) : 1);
    health.current = health.max;
    health.armor = def.armor || 0;
    health.regen = def.regen || 0;
    health.deathBuffer = 0.1;
    if (def.shield) { const shc = new Shield(); shc.max = def.shield * sh; shc.current = shc.max; e.add(shc); }
    e.add(health);

    // Kinematics
    const kin = new Kinematics();
    kin.maxSpeed = (def.speed || 4) * ss;
    e.add(kin);

    // Facing
    const facing = new Facing(); e.add(facing);

    // Enemy component
    const enemy = new Enemy();
    enemy.archetypeId = id;
    enemy.behavior = def.behavior || 'chaser';
    enemy.attackRange = def.attack?.range || 8;
    enemy.preferredRange = def.attack?.preferredRange || def.attack?.range * 0.7 || 6;
    enemy.detectRange = def.detectRange || 45;
    enemy.speedScale = ss;
    enemy.damageScale = sd;
    enemy.isElite = elite;
    e.add(enemy);

    // meta for AI
    e.meta.baseSpeed = kin.maxSpeed;
    e.meta.contactDamage = (def.attack?.damage || def.contactDamage || 8) * sd;
    e.meta.contactStatusChance = def.contactStatus?.chance || 0;
    e.meta.contactStatusType = def.contactStatus?.type;
    e.meta.contactStatusPower = def.contactStatus?.power;
    if (def.attack && def.attack.type === 'ranged') {
      e.meta.projectile = def.attack.projectile || { speed: 28, color: 0xff3df0, damage: def.attack.damage, shape: 'orb', scale: 1, radius: 0.22, lifetime: 4 };
    }

    // Rewards
    const xp = new Experience(); xp.value = (def.xp || 1) * (elite ? 3 : 1); e.add(xp);
    const cur = new CurrencyDrop(); cur.min = def.currency?.min || 1; cur.max = def.currency?.max || 3; cur.chance = def.currency?.chance != null ? def.currency.chance : 1; e.add(cur);
    const wm = new WaveMember(); e.add(wm);

    // Visual
    const meshRef = new MeshRef();
    const mesh = this._buildMesh(def, elite);
    mesh.position.copy(body.pos);
    mesh.scale.setScalar(def.scale || 1);
    meshRef.object = mesh;
    meshRef.castShadow = !def.flying;
    meshRef.syncFacing = !!def.orientYaw;
    e.add(meshRef);
    this.scene.add(mesh);
    if (def.glowPulse) {
      const gp = new GlowPulse(); gp.base = def.glowPulse.base || 1; gp.amplitude = def.glowPulse.amplitude || 0.5; gp.speed = def.glowPulse.speed || 3; e.add(gp);
    }

    // Status resistances stored on meta
    if (def.resistances) e.meta.resistances = def.resistances;

    // Death hook
    if (def.onDeath) e.meta.onDeath = def.onDeath;
    if (def.splitInto) e.meta.splitInto = def.splitInto;

    // Spawn effect
    if (this.effects) this.effects.flash(body.pos.clone().setY(body.pos.y + body.height * 0.5), def.color || 0xff3df0, 1.2);
    bus.emit(Channels.EntitySpawned, { entity: e, def });

    // subscribe to death for rewards/hook via bus handled by Game
    return e;
  }

  _buildMesh(def, elite) {
    const grp = new THREE.Group();
    const color = elite ? 0xffd24a : (def.color || 0xff3df0);
    const accent = def.accent || 0xffffff;
    const bodyMat = new THREE.MeshStandardMaterial({
      color, emissive: color, emissiveIntensity: elite ? 1.6 : 1.0, metalness: 0.5, roughness: 0.4,
    });
    const accentMat = new THREE.MeshBasicMaterial({ color: accent });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x0a0a12, emissive: color, emissiveIntensity: 0.3, metalness: 0.8, roughness: 0.3 });
    const shape = def.shape || 'drone';

    switch (shape) {
      case 'drone': {
        const c = this._geo('drone_core', () => new THREE.IcosahedronGeometry(0.4, 0));
        const core = new THREE.Mesh(c, bodyMat); grp.add(core);
        const ringGeo = this._geo('drone_ring', () => new THREE.TorusGeometry(0.55, 0.04, 6, 24));
        const ring = new THREE.Mesh(ringGeo, accentMat); grp.add(ring);
        const ring2 = new THREE.Mesh(ringGeo, accentMat); ring2.rotation.x = Math.PI / 2; grp.add(ring2);
        grp.userData.spin = (t) => { ring.rotation.z = t * 2; ring2.rotation.y = t * 1.5; };
        break;
      }
      case 'orb': {
        const g = this._geo('orb', () => new THREE.IcosahedronGeometry(0.45, 1));
        const m = new THREE.Mesh(g, bodyMat); grp.add(m);
        const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.assets.particleTexture(), color, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }));
        halo.scale.set(2, 2, 1); grp.add(halo);
        break;
      }
      case 'walker': {
        const bodyG = this._geo('walker_body', () => new THREE.BoxGeometry(0.6, 0.7, 0.9));
        const bm = new THREE.Mesh(bodyG, bodyMat); bm.position.y = 0.6; grp.add(bm);
        const headG = this._geo('walker_head', () => new THREE.BoxGeometry(0.4, 0.35, 0.4));
        const head = new THREE.Mesh(headG, darkMat); head.position.set(0, 1.1, 0.1); grp.add(head);
        const eye = new THREE.Mesh(this._geo('eye', () => new THREE.BoxGeometry(0.1, 0.08, 0.05)), accentMat); eye.position.set(0, 1.1, 0.31); grp.add(eye);
        // legs
        for (let i = 0; i < 4; i++) {
          const leg = new THREE.Mesh(this._geo('walker_leg', () => new THREE.BoxGeometry(0.12, 0.6, 0.12)), darkMat);
          const ang = (i / 4) * Math.PI + Math.PI / 4;
          leg.position.set(Math.cos(ang) * 0.4, 0.3, Math.sin(ang) * 0.4);
          leg.rotation.z = Math.cos(ang) * 0.3; leg.rotation.x = Math.sin(ang) * 0.3;
          grp.add(leg);
        }
        break;
      }
      case 'spider': {
        const c = this._geo('spider_body', () => new THREE.SphereGeometry(0.4, 10, 8));
        const m = new THREE.Mesh(c, bodyMat); m.position.y = 0.5; m.scale.set(1, 0.6, 1.2); grp.add(m);
        for (let i = 0; i < 8; i++) {
          const leg = new THREE.Mesh(this._geo('spider_leg', () => new THREE.CylinderGeometry(0.03, 0.02, 0.7, 5)), darkMat);
          const a = (i / 8) * TAU;
          leg.position.set(Math.cos(a) * 0.45, 0.35, Math.sin(a) * 0.45);
          leg.rotation.z = -Math.cos(a) * 0.6; leg.rotation.x = Math.sin(a) * 0.6;
          grp.add(leg);
        }
        break;
      }
      case 'humanoid': {
        const torso = new THREE.Mesh(this._geo('hum_torso', () => new THREE.CapsuleGeometry(0.3, 0.6, 4, 8)), bodyMat); torso.position.y = 1.0; grp.add(torso);
        const head = new THREE.Mesh(this._geo('hum_head', () => new THREE.SphereGeometry(0.22, 10, 8)), darkMat); head.position.y = 1.7; grp.add(head);
        const visor = new THREE.Mesh(this._geo('hum_visor', () => new THREE.BoxGeometry(0.3, 0.06, 0.05)), accentMat); visor.position.set(0, 1.72, 0.2); grp.add(visor);
        for (const sx of [-1, 1]) {
          const arm = new THREE.Mesh(this._geo('hum_arm', () => new THREE.CapsuleGeometry(0.1, 0.5, 4, 6)), darkMat); arm.position.set(sx * 0.4, 1.0, 0); grp.add(arm);
          const leg = new THREE.Mesh(this._geo('hum_leg', () => new THREE.CapsuleGeometry(0.13, 0.6, 4, 6)), darkMat); leg.position.set(sx * 0.16, 0.35, 0); grp.add(leg);
        }
        break;
      }
      case 'crystal': {
        const g = this._geo('crystal', () => new THREE.OctahedronGeometry(0.5, 0));
        const m = new THREE.Mesh(g, bodyMat); grp.add(m);
        const inner = new THREE.Mesh(this._geo('crystal_inner', () => new THREE.OctahedronGeometry(0.25, 0)), accentMat); grp.add(inner);
        grp.userData.spin = (t) => { grp.rotation.y = t * 1.2; };
        break;
      }
      case 'blob': {
        const g = this._geo('blob', () => new THREE.SphereGeometry(0.5, 12, 10));
        const m = new THREE.Mesh(g, bodyMat); grp.add(m);
        grp.userData.wobble = (t) => { m.scale.set(1 + Math.sin(t * 6) * 0.1, 1 - Math.sin(t * 6) * 0.08, 1 + Math.cos(t * 6) * 0.1); };
        break;
      }
      case 'shard': {
        const g = this._geo('shard', () => new THREE.ConeGeometry(0.3, 0.9, 5));
        const m = new THREE.Mesh(g, bodyMat); m.rotation.x = Math.PI; grp.add(m);
        break;
      }
      case 'cube': {
        const g = this._geo('cube', () => new THREE.BoxGeometry(0.7, 0.7, 0.7));
        const m = new THREE.Mesh(g, bodyMat); grp.add(m);
        grp.userData.spin = (t) => { grp.rotation.x = t; grp.rotation.y = t * 1.3; };
        break;
      }
      case 'tank': {
        const hull = new THREE.Mesh(this._geo('tank_hull', () => new THREE.BoxGeometry(1.0, 0.7, 1.4)), bodyMat); hull.position.y = 0.7; grp.add(hull);
        const turret = new THREE.Mesh(this._geo('tank_turret', () => new THREE.CylinderGeometry(0.35, 0.45, 0.4, 8)), darkMat); turret.position.y = 1.2; grp.add(turret);
        const barrel = new THREE.Mesh(this._geo('tank_barrel', () => new THREE.CylinderGeometry(0.08, 0.08, 0.8, 8)), darkMat); barrel.position.set(0, 1.2, 0.6); barrel.rotation.x = Math.PI / 2; grp.add(barrel);
        for (let i = 0; i < 4; i++) {
          const wheel = new THREE.Mesh(this._geo('tank_wheel', () => new THREE.CylinderGeometry(0.25, 0.25, 0.2, 12)), darkMat);
          wheel.position.set(i % 2 ? 0.55 : -0.55, 0.25, i < 2 ? 0.45 : -0.45);
          wheel.rotation.z = Math.PI / 2; grp.add(wheel);
        }
        break;
      }
      case 'ghost': {
        const g = this._geo('ghost', () => new THREE.SphereGeometry(0.45, 12, 10));
        const m = new THREE.Mesh(g, bodyMat); m.material.transparent = true; m.material.opacity = 0.7; grp.add(m);
        const tail = new THREE.Mesh(this._geo('ghost_tail', () => new THREE.ConeGeometry(0.4, 0.7, 8)), bodyMat); tail.position.y = -0.6; tail.material.transparent = true; tail.material.opacity = 0.5; grp.add(tail);
        break;
      }
      case 'swarm': {
        const g = this._geo('swarm', () => new THREE.TetrahedronGeometry(0.3));
        const m = new THREE.Mesh(g, bodyMat); grp.add(m);
        grp.userData.spin = (t) => { grp.rotation.x = t * 4; grp.rotation.y = t * 5; };
        break;
      }
      default: {
        const g = this._geo('def', () => new THREE.SphereGeometry(0.4, 10, 8));
        const m = new THREE.Mesh(g, bodyMat); grp.add(m);
      }
    }

    // elite aura
    if (elite) {
      const aura = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.assets.particleTexture(), color: 0xffd24a, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false }));
      aura.scale.set(2.5, 2.5, 1); grp.add(aura);
      grp.userData.aura = aura;
    }
    // health bar (small sprite above) — handled by HUD via world; skip mesh here
    return grp;
  }

  dispose() {
    for (const g of this._geoCache.values()) g.dispose();
    this._geoCache.clear();
  }
}

// Avoid circular import: get from registry lazily
import { EnemyRegistry as _ER } from './EnemyRegistry.js';
function EnemyRegistry_get(id) { return _ER.get(id); }
