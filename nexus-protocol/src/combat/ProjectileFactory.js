// ============================================================================
// ProjectileFactory.js
// Creates projectile entities (visual + logical) from a weapon's projectile
// descriptor. Pooled where possible. Projectiles carry a Projectile component
// and are moved/handled by the ProjectileSystem. Visuals are simple emissive
// meshes with optional trails.
// ============================================================================

import * as THREE from 'three';
import { Body } from '../ecs/components/Body.js';
import { Team } from '../ecs/components/Body.js';
import { Teams } from '../ecs/components/Body.js';
import { Collider, CollisionLayer } from '../ecs/components/Collision.js';
import { Lifetime } from '../ecs/components/Lifecycle.js';
import { Projectile, DamageType } from '../ecs/components/Combat.js';
import { MeshRef } from '../ecs/components/Render.js';
import { RangeDespawn } from '../ecs/components/Lifecycle.js';

export class ProjectileFactory {
  constructor(world, scene, assets, effects) {
    this.world = world;
    this.scene = scene;
    this.assets = assets;
    this.effects = effects;
    this._geoCache = new Map();
  }

  _geometry(kind, scale) {
    const key = `${kind}_${scale.toFixed(2)}`;
    let g = this._geoCache.get(key);
    if (!g) {
      switch (kind) {
        case 'sphere': g = new THREE.SphereGeometry(0.12 * scale, 10, 8); break;
        case 'long': g = new THREE.CapsuleGeometry(0.08 * scale, 0.5 * scale, 4, 8); break;
        case 'chunky': g = new THREE.BoxGeometry(0.2 * scale, 0.2 * scale, 0.4 * scale); break;
        case 'shard': g = new THREE.ConeGeometry(0.12 * scale, 0.5 * scale, 5); break;
        case 'orb': g = new THREE.IcosahedronGeometry(0.16 * scale, 0); break;
        case 'ring': g = new THREE.TorusGeometry(0.18 * scale, 0.05 * scale, 6, 12); break;
        default: g = new THREE.SphereGeometry(0.12 * scale, 8, 6);
      }
      this._geoCache.set(key, g);
    }
    return g;
  }

  /**
   * Spawn a projectile.
   * @param {Object} o
   */
  spawn(o) {
    const def = o.projectile || {};
    const e = this.world.createEntity('projectile');
    const team = o.team || Teams.Enemy;

    const body = new Body();
    body.pos.copy(o.position);
    const speed = (def.speed || 60) * (o.speedMult || 1);
    body.vel.copy(o.direction).multiplyScalar(speed);
    if (def.gravity) body.gravityScale = def.gravity;
    body.radius = (def.radius || 0.18) * (def.scale || 1);
    body.height = body.radius * 2;
    body.friction = 0;
    e.add(body);

    const teamComp = new Team(); teamComp.id = team; e.add(teamComp);
    if (team === Teams.Player) e.tag('PlayerProjectile'); else e.tag('EnemyProjectile');
    e.tag('Projectile');

    const proj = new Projectile();
    proj.damage = o.damage;
    proj.damageType = o.damageType || DamageType.Kinetic;
    proj.ownerId = o.ownerId || 0;
    proj.team = team;
    proj.speed = speed;
    proj.pierce = (def.pierce || 0) + (o.pierceAdd || 0);
    proj.maxHits = proj.pierce + 1;
    proj.knockback = o.knockback || 2;
    proj.critChance = o.critChance || 0;
    proj.critMult = o.critMult || 2;
    proj.statusChance = o.statusChance || 0;
    proj.statusType = o.statusType;
    proj.statusPower = o.statusPower;
    proj.statusDuration = o.statusDuration;
    proj.aoeRadius = (def.aoe || 0) * (o.aoeMult || 1);
    proj.aoeFalloff = def.aoeFalloff != null ? def.aoeFalloff : 0.5;
    proj.homing = def.homing || 0;
    proj.targetId = o.targetId || 0;
    proj.proximityFuse = def.proximity || 0;
    proj.ricochet = def.ricochet || 0;
    proj.bouncesLeft = proj.ricochet;
    proj.trail = def.trail !== false;
    proj.visualScale = def.scale || 1;
    proj.color = o.color || def.color || 0x29e7ff;
    proj.canHeadshot = !!o.canHeadshot;
    proj.lifesteal = o.lifesteal || 0;
    e.add(proj);

    const life = new Lifetime();
    life.duration = def.lifetime || (def.range ? def.range / speed : 3);
    e.add(life);

    const rd = new RangeDespawn(); rd.maxDist = def.range ? def.range * 1.5 : 160; e.add(rd);

    // Visual
    const meshRef = new MeshRef();
    const kind = def.shape || 'sphere';
    const geo = this._geometry(kind, proj.visualScale);
    const color = proj.color;
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false });
    const mesh = new THREE.Mesh(geo, mat);
    // orient capsule/cone along velocity
    if (kind === 'long' || kind === 'shard' || kind === 'chunky') {
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), o.direction.clone().normalize());
    }
    // add a glow sprite halo
    const haloMat = new THREE.SpriteMaterial({ map: this.assets.particleTexture(), color, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false });
    const halo = new THREE.Sprite(haloMat);
    const haloScale = body.radius * 6;
    halo.scale.set(haloScale, haloScale, 1);
    mesh.add(halo);
    mesh.position.copy(body.pos);
    meshRef.object = mesh;
    meshRef.castShadow = false;
    meshRef.syncTransform = true;
    e.add(meshRef);
    this.scene.add(mesh);

    // a small point light for big projectiles
    if (proj.visualScale > 1.2 || def.glow) {
      const light = new THREE.PointLight(color, 1.5, 6, 2);
      mesh.add(light);
    }

    return e;
  }

  /** Spawn a simple hitscan tracer effect (no entity). */
  tracer(from, to, color, width) {
    if (this.effects) this.effects.tracer(from, to, color, 0.05);
  }

  dispose() {
    for (const g of this._geoCache.values()) g.dispose();
    this._geoCache.clear();
  }
}
