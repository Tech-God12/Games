// ============================================================================
// PickupManager.js
// Spawns and drops pickups: health, currency, ammo, shield, and rare power-ups
// (nuke, freeze, magnet). Listens to entity deaths for chance-based drops and
// emits pickups at the arena on a slow cadence. Builds a procedural icon mesh
// per type with emissive glow.
// ============================================================================

import * as THREE from 'three';
import { Body } from '../ecs/components/Body.js';
import { Pickup, PickupType } from '../ecs/components/Gameplay.js';
import { CurrencyDrop } from '../ecs/components/Combat.js';
import { MeshRef } from '../ecs/components/Render.js';
import { bus, Channels } from '../core/EventBus.js';
import { Random } from '../core/Random.js';
import { clamp } from '../core/MathUtils.js';

const PICKUP_COLORS = {
  [PickupType.Health]: 0x4fd07a, [PickupType.Currency]: 0xffb347, [PickupType.Ammo]: 0x9fe7ff,
  [PickupType.Shield]: 0x29e7ff, [PickupType.Nuke]: 0xff3df0, [PickupType.Freeze]: 0x9fe7ff,
  [PickupType.Magnet]: 0xff3df0, [PickupType.PowerDamage]: 0xff5544, [PickupType.PowerSpeed]: 0x4fffd0,
  [PickupType.PowerRapid]: 0xffaa44, [PickupType.Heart]: 0xff5577, [PickupType.Bomb]: 0xff7733,
};

export class PickupManager {
  constructor(world, scene, assets, arena) {
    this.world = world;
    this.scene = scene;
    this.assets = assets;
    this.arena = arena;
    this.rng = new Random((Math.random() * 1e9) >>> 0);
    this._powerupTimer = 8;
    this._unsub = bus.on(Channels.EntityKilled, (e) => this._onKill(e));
    this._geoCache = new Map();
  }

  _geo(key, factory) { let g = this._geoCache.get(key); if (!g) { g = factory(); this._geoCache.set(key, g); } return g; }

  spawn(type, x, z, value) {
    const e = this.world.createEntity('pickup:' + type);
    const body = new Body();
    body.pos.set(x, 0.5, z);
    body.radius = 0.4; body.height = 0.8; body.friction = 0; body.gravityScale = 0;
    e.add(body);
    const pk = new Pickup();
    pk.type = type; pk.value = value; pk.magnetRange = 5;
    e.add(pk);
    e.tag('Pickup');
    const meshRef = new MeshRef();
    const mesh = this._buildIcon(type);
    mesh.position.copy(body.pos);
    meshRef.object = mesh; meshRef.castShadow = false;
    e.add(meshRef);
    this.scene.add(mesh);
    return e;
  }

  _buildIcon(type) {
    const grp = new THREE.Group();
    const color = PICKUP_COLORS[type] || 0xffffff;
    const mat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 1.5, metalness: 0.4, roughness: 0.3 });
    const haloMat = new THREE.SpriteMaterial({ map: this.assets.particleTexture(), color, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false });
    const halo = new THREE.Sprite(haloMat); halo.scale.set(1.6, 1.6, 1); grp.add(halo);
    switch (type) {
      case PickupType.Health: {
        const v = new THREE.Mesh(this._geo('h_v', () => new THREE.BoxGeometry(0.12, 0.4, 0.12)), mat); grp.add(v);
        const h = new THREE.Mesh(this._geo('h_h', () => new THREE.BoxGeometry(0.4, 0.12, 0.12)), mat); grp.add(h);
        break;
      }
      case PickupType.Heart: {
        const s = new THREE.Mesh(this._geo('heart', () => new THREE.SphereGeometry(0.18, 10, 8)), mat); s.scale.set(1, 1.2, 0.6); s.position.y = 0.1; grp.add(s);
        break;
      }
      case PickupType.Currency: {
        const c = new THREE.Mesh(this._geo('coin', () => new THREE.CylinderGeometry(0.22, 0.22, 0.06, 16)), mat); c.rotation.x = Math.PI / 2; grp.add(c);
        break;
      }
      case PickupType.Ammo: {
        const b = new THREE.Mesh(this._geo('ammo', () => new THREE.BoxGeometry(0.18, 0.28, 0.18)), mat); grp.add(b);
        break;
      }
      case PickupType.Shield: {
        const s = new THREE.Mesh(this._geo('shield', () => new THREE.OctahedronGeometry(0.26, 0)), mat); grp.add(s);
        break;
      }
      case PickupType.Nuke: case PickupType.Bomb: {
        const b = new THREE.Mesh(this._geo('bomb', () => new THREE.SphereGeometry(0.25, 12, 10)), mat); grp.add(b);
        const f = new THREE.Mesh(this._geo('fuse', () => new THREE.ConeGeometry(0.06, 0.18, 6)), mat); f.position.y = 0.3; grp.add(f);
        break;
      }
      case PickupType.Freeze: {
        const s = new THREE.Mesh(this._geo('snow', () => new THREE.IcosahedronGeometry(0.25, 0)), mat); grp.add(s);
        break;
      }
      case PickupType.Magnet: {
        const t = new THREE.Mesh(this._geo('mag', () => new THREE.TorusGeometry(0.18, 0.06, 6, 12, Math.PI)), mat); grp.add(t);
        break;
      }
      default: {
        const o = new THREE.Mesh(this._geo('orb', () => new THREE.OctahedronGeometry(0.24, 0)), mat); grp.add(o);
      }
    }
    // base glow ring
    const ring = new THREE.Mesh(this._geo('ring', () => new THREE.TorusGeometry(0.4, 0.03, 6, 20)), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.6 }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = -0.4; grp.add(ring);
    return grp;
  }

  _onKill(ev) {
    const e = ev.entity; if (!e) return;
    const body = e.get(Body.type); if (!body) return;
    const cur = e.get(CurrencyDrop.type);
    const wm = e.get('WaveMember');
    const isElite = wm?.isElite || e.hasTag('Boss');
    const tier = this._tierOf(e);
    // currency drop
    if (cur) {
      const amount = this.rng.int(cur.min, cur.max) * (isElite ? 4 : 1);
      if (amount > 0 && this.rng.chance(cur.chance)) this.spawn(PickupType.Currency, body.pos.x, body.pos.z, amount);
    }
    // health drop chance (rare; higher for elites)
    const hpChance = (isElite ? 0.6 : 0.04) + tier * 0.01;
    if (this.rng.chance(hpChance)) this.spawn(PickupType.Health, body.pos.x + this.rng.range(-0.5, 0.5), body.pos.z + this.rng.range(-0.5, 0.5), isElite ? 40 : 18);
    // ammo drop
    if (this.rng.chance(isElite ? 0.5 : 0.08)) this.spawn(PickupType.Ammo, body.pos.x, body.pos.z, 60);
    // shield drop (elites)
    if (isElite && this.rng.chance(0.3)) this.spawn(PickupType.Shield, body.pos.x, body.pos.z, 30);
    // rare powerups
    if (this.rng.chance(0.012 + tier * 0.003)) {
      const pw = this.rng.weighted([PickupType.Nuke, PickupType.Freeze, PickupType.Magnet], [1, 2, 2]);
      this.spawn(pw, body.pos.x, body.pos.z, 0);
    }
  }

  _tierOf(e) {
    const en = e.get('Enemy'); if (!en) return 0;
    const def = this._reg()?.get(en.archetypeId); return def?.tier || 0;
  }
  _reg() { return this._registryRef || null; }
  setRegistry(r) { this._registryRef = r; }

  update(dt) {
    // occasional ambient powerup
    this._powerupTimer -= dt;
    if (this._powerupTimer <= 0) {
      this._powerupTimer = this.rng.range(18, 32);
      if (this.rng.chance(0.5)) {
        const pt = this.arena.interiorPoint(this.rng, 16);
        const t = this.rng.weighted([PickupType.Health, PickupType.Ammo, PickupType.Shield, PickupType.PowerDamage], [3, 3, 2, 1]);
        this.spawn(t, pt.x, pt.z, t === PickupType.Health ? 20 : (t === PickupType.Shield ? 25 : (t === PickupType.Ammo ? 50 : 0)));
      }
    }
  }

  dispose() { if (this._unsub) this._unsub(); for (const g of this._geoCache.values()) g.dispose(); this._geoCache.clear(); }
}
