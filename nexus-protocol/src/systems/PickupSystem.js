// ============================================================================
// PickupSystem.js
// Animates pickups (bob/spin), applies magnet attraction toward the player,
// and resolves collection: health, currency, ammo, shield, and power-ups.
// Emits events so the HUD/progression can react. Runs in the Sim phase.
// ============================================================================

import * as THREE from 'three';
import { System, Phase } from '../ecs/System.js';
import { Body } from '../ecs/components/Body.js';
import { Pickup, PickupType } from '../ecs/components/Gameplay.js';
import { MeshRef } from '../ecs/components/Render.js';
import { Health, Shield } from '../ecs/components/Vitals.js';
import { heal } from '../combat/Damage.js';
import { bus, Channels } from '../core/EventBus.js';

const _toP = new THREE.Vector3();

export class PickupSystem extends System {
  constructor() {
    super({ query: { all: ['Pickup', 'Body'], tags: ['Pickup'] }, priority: Phase.Sim });
    this.player = null;
    this.effects = null;
    this.progression = null;
    this.elapsed = 0;
  }

  setPlayer(p) { this.player = p; }

  update(dt, sdt) {
    if (!this.query) return;
    this.elapsed += dt;
    const player = this.player;
    this.query.forEach((e) => {
      const pickup = e.get(Pickup.type);
      const body = e.get(Body.type);
      if (!pickup || !body) return;
      pickup.bob += dt;
      const meshRef = e.get(MeshRef.type);
      if (meshRef && meshRef.object) {
        meshRef.object.position.y = body.pos.y + Math.sin(pickup.bob * 2.5) * 0.2;
        meshRef.object.rotation.y += dt * 2;
      }
      if (pickup.collected) { e.destroy(); return; }
      if (!player || !player.alive) return;
      const pb = player.get(Body.type);
      if (!pb) return;
      _toP.set(pb.pos.x - body.pos.x, 0, pb.pos.z - body.pos.z);
      const d = _toP.length();
      // magnet
      if (d < pickup.magnetRange + 2) {
        _toP.normalize();
        const pull = 14 * dt;
        body.pos.x += _toP.x * pull; body.pos.z += _toP.z * pull;
      }
      // collect
      if (d < pb.radius + 0.5) {
        this._collect(e, pickup, player);
      }
    });
  }

  _collect(e, pickup, player) {
    pickup.collected = true;
    const pos = e.get(Body.type).pos.clone();
    if (this.effects) this.effects.flash(pos, 0x29e7ff, 0.8);
    switch (pickup.type) {
      case PickupType.Health: {
        const amt = heal(player, pickup.value);
        bus.emit(Channels.PlaySFX, { name: 'pickup', volume: 0.7 });
        bus.emit(Channels.Toast, { text: `+${amt} HP`, color: '#4fd07a' });
        break;
      }
      case PickupType.Shield: {
        const sh = player.get(Shield.type) || player.add(new Shield());
        sh.max = Math.max(sh.max, pickup.value); sh.current = Math.min(sh.max, sh.current + pickup.value);
        bus.emit(Channels.PlaySFX, { name: 'pickup', volume: 0.7 });
        bus.emit(Channels.Toast, { text: `+${pickup.value} SHIELD`, color: '#29e7ff' });
        break;
      }
      case PickupType.Currency: {
        if (this.progression) this.progression.addCurrency(pickup.value);
        bus.emit(Channels.PlaySFX, { name: 'currency', volume: 0.5 });
        bus.emit(Channels.CurrencyChanged, { amount: pickup.value });
        break;
      }
      case PickupType.Ammo: {
        // refill current weapon reserve
        bus.emit('pickup.ammo', { value: pickup.value });
        bus.emit(Channels.PlaySFX, { name: 'pickup', volume: 0.6 });
        bus.emit(Channels.Toast, { text: `+AMMO`, color: '#ffb347' });
        break;
      }
      case PickupType.Nuke: {
        bus.emit(Channels.Toast, { text: 'NUKE!', color: '#ff3df0' });
        bus.emit('pickup.nuke', {});
        bus.emit(Channels.PlaySFX, { name: 'explosion', volume: 1.0 });
        break;
      }
      case PickupType.Freeze: {
        bus.emit(Channels.Toast, { text: 'FREEZE', color: '#9fe7ff' });
        bus.emit('pickup.freeze', {});
        break;
      }
      case PickupType.Magnet: {
        bus.emit(Channels.Toast, { text: 'MAGNET', color: '#ff3df0' });
        bus.emit('pickup.magnet', {});
        break;
      }
      default:
        bus.emit(Channels.PlaySFX, { name: 'pickup', volume: 0.6 });
        bus.emit(Channels.Toast, { text: pickup.type.toUpperCase(), color: '#ffffff' });
    }
    bus.emit(Channels.HUDUpdate, {});
    e.destroy();
  }
}
