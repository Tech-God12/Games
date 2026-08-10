// ============================================================================
// Hazards.js
// Biome hazard system: environmental dangers that spawn during waves based on
// the current biome (fire patches, ice slicks, void zones, laser grids, shard
// storms). Hazards are entities with a Hazard component; a HazardSystem ticks
// them, applies effects to entities that enter their area, and expires them.
// Adds spatial pressure and biome identity beyond aesthetics.
// ============================================================================

import * as THREE from 'three';
import { Component } from '../ecs/Component.js';
import { Body } from '../ecs/components/Body.js';
import { Health } from '../ecs/components/Vitals.js';
import { StatusEffects, StatusType, DamageType } from '../ecs/components/Combat.js';
import { MeshRef, GlowPulse } from '../ecs/components/Render.js';
import { Lifetime } from '../ecs/components/Lifecycle.js';
import { bus, Channels } from '../core/EventBus.js';
import { clamp, lerp, TAU } from '../core/MathUtils.js';

export class Hazard extends Component {
  static type = 'Hazard';
  constructor() {
    super();
    this.kind = 'fire';
    this.radius = 4;
    this.damagePerSec = 12;
    this.tickAccum = 0;
    this.tickInterval = 0.5;
    this.statusType = StatusType.Burn;
    this.statusPower = 1;
    this.statusChance = 0.5;
    this.team = 'enemy';       // who it harms ('enemy' harms enemies, 'player' harms player, 'all' both)
    this.color = 0xff5522;
    this.growTime = 0.6;
    this.age = 0;
    this.pulseFreq = 0;
  }
  reset() { this.kind = 'fire'; this.radius = 4; this.damagePerSec = 12; this.tickAccum = 0; this.tickInterval = 0.5;
    this.statusType = StatusType.Burn; this.statusPower = 1; this.statusChance = 0.5; this.team = 'enemy'; this.color = 0xff5522; this.growTime = 0.6; this.age = 0; this.pulseFreq = 0; }
}

export const HazardPresets = {
  fire: { kind: 'fire', radius: 4, damagePerSec: 16, statusType: StatusType.Burn, statusPower: 2, statusChance: 0.6, color: 0xff5522, pulseFreq: 6 },
  ice: { kind: 'ice', radius: 5, damagePerSec: 6, statusType: StatusType.Slow, statusPower: 2, statusChance: 0.8, color: 0x9fe7ff, pulseFreq: 2 },
  void: { kind: 'void', radius: 5, damagePerSec: 22, statusType: StatusType.Mark, statusPower: 1, statusChance: 0.5, color: 0x8a5bff, pulseFreq: 3 },
  laser: { kind: 'laser', radius: 3, damagePerSec: 30, statusType: StatusType.Burn, statusPower: 1, statusChance: 0.3, color: 0xff3df0, pulseFreq: 8 },
  shard: { kind: 'shard', radius: 4, damagePerSec: 14, statusType: StatusType.Bleed, statusPower: 1, statusChance: 0.5, color: 0x4fffd0, pulseFreq: 4 },
};

export class HazardFactory {
  constructor(world, scene, assets, effects) {
    this.world = world; this.scene = scene; this.assets = assets; this.effects = effects;
  }

  spawn(kind, x, z, opts = {}) {
    const preset = HazardPresets[kind] || HazardPresets.fire;
    const e = this.world.createEntity('hazard:' + kind);
    const body = new Body(); body.pos.set(x, 0.05, z); body.radius = preset.radius; body.height = 0.2; body.gravityScale = 0; body.friction = 0;
    e.add(body);
    const hz = new Hazard();
    Object.assign(hz, preset);
    hz.radius = (opts.radius || preset.radius);
    hz.damagePerSec = (opts.damagePerSec || preset.damagePerSec) * (opts.damageScale || 1);
    hz.team = opts.team || 'enemy';
    hz.color = opts.color || preset.color;
    e.add(hz);
    e.tag('Hazard');
    const life = new Lifetime(); life.duration = opts.duration || 8; e.add(life);
    // visual
    const meshRef = new MeshRef();
    const grp = this._buildVisual(hz);
    grp.position.copy(body.pos);
    meshRef.object = grp; meshRef.castShadow = false;
    e.add(meshRef);
    this.scene.add(grp);
    if (this.effects) this.effects.flash(body.pos.clone(), hz.color, 1.5);
    return e;
  }

  _buildVisual(hz) {
    const grp = new THREE.Group();
    const mat = new THREE.MeshBasicMaterial({ color: hz.color, transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(new THREE.RingGeometry(hz.radius * 0.8, hz.radius, 32), mat);
    ring.rotation.x = -Math.PI / 2; grp.add(ring);
    const disc = new THREE.Mesh(new THREE.CircleGeometry(hz.radius * 0.8, 32), new THREE.MeshBasicMaterial({ color: hz.color, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
    disc.rotation.x = -Math.PI / 2; grp.add(disc);
    // inner pulsing ring
    const inner = new THREE.Mesh(new THREE.RingGeometry(hz.radius * 0.3, hz.radius * 0.4, 24), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }));
    inner.rotation.x = -Math.PI / 2; grp.add(inner);
    grp.userData.inner = inner;
    grp.userData.ring = ring;
    grp.userData.spin = (t) => { inner.scale.setScalar(0.8 + Math.sin(t * hz.pulseFreq) * 0.3); ring.rotation.z = t * 0.3; };
    return grp;
  }
}

/**
 * System that ticks hazards: grows them in over growTime, applies periodic
 * damage + status to entities within radius (filtered by team), and animates.
 */
export class HazardSystem {
  constructor(world) {
    this.world = world;
    this.query = world.query({ all: ['Hazard', 'Body'], tags: ['Hazard'] });
    this.player = null;
    this.enemyQuery = world.query({ all: ['Body', 'Health'], tags: ['Enemy'] });
    this.effects = null;
    this._tmp = new THREE.Vector3();
  }
  setPlayer(p) { this.player = p; }
  setEffects(e) { this.effects = e; }

  update(dt) {
    if (!this.query) return;
    const player = this.player;
    this.query.forEach((e) => {
      const hz = e.get(Hazard.type);
      const body = e.get(Body.type);
      if (!hz || !body) return;
      hz.age += dt;
      const meshRef = e.get(MeshRef.type);
      if (meshRef && meshRef.object) {
        const t = clamp(hz.age / hz.growTime, 0, 1);
        meshRef.object.scale.setScalar(t);
        if (meshRef.object.userData.spin) meshRef.object.userData.spin(hz.age);
      }
      // tick damage
      hz.tickAccum += dt;
      if (hz.tickAccum >= hz.tickInterval) {
        hz.tickAccum = 0;
        const dmg = hz.damagePerSec * hz.tickInterval;
        const targets = [];
        if (hz.team === 'enemy' || hz.team === 'all') {
          for (const t of this.enemyQuery.array) {
            const tb = t.get(Body.type); if (!tb) continue;
            if (body.pos.distanceTo(tb.pos) < hz.radius + tb.radius) targets.push(t);
          }
        }
        if ((hz.team === 'player' || hz.team === 'all') && player && player.alive) {
          const pb = player.get(Body.type);
          if (pb && body.pos.distanceTo(pb.pos) < hz.radius + pb.radius) targets.push(player);
        }
        for (const t of targets) {
          const th = t.get(Health.type); if (!th || !th.alive) continue;
          // direct hazard damage (bypasses armor lightly)
          th.current -= dmg * (th.damageMult || 1);
          th.lastDamagedAt = (this.world.clock && this.world.clock.elapsed) || 0;
          if (hz.statusChance > 0 && Math.random() < hz.statusChance) {
            let st = t.get(StatusEffects.type); if (!st) { st = new StatusEffects(); t.add(st); }
            st.add(hz.statusType, hz.statusPower, hz.tickInterval * 3);
          }
          if (th.current <= 0 && th.alive) {
            th.current = 0; th.alive = false;
            bus.emit(Channels.EntityKilled, { entity: t, killer: null });
            if (this.effects) { const tb = t.get(Body.type); if (tb) this.effects.death(tb.pos.clone(), hz.color, 0.6); }
            t.destroy();
          }
        }
      }
    });
  }
}
