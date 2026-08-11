/**
 * VOIDBREAK — Pickups.
 *
 * Droppable items (health, shield, ammo, energy, cores). They bob and glow,
 * magnet toward the player within pickup radius, and apply their effect on
 * contact. The loot system listens for kills and spawns them.
 */

import { Entity } from '../entity.js';
import { DROP_INFO, DROP_TYPES, energyCount, rollDrops } from './drops.js';
import { playSfx } from '../../audio/sfx.js';

export class Pickup extends Entity {
  constructor(opts = {}) {
    super({ kind: 'pickup', radius: 0.3, height: 0.3, ...opts });
    this.type = opts.type ?? DROP_TYPES.energy;
    this.amount = opts.amount ?? 1;
    this.bobPhase = Math.random() * Math.PI * 2;
    this.magnetRadius = opts.magnetRadius ?? 4;
    this.age = 0;
    this.lifetime = opts.lifetime ?? 45;
    this.info = DROP_INFO[this.type] ?? DROP_INFO.energy;
  }

  update(dt) {
    super.update(dt);
    this.bobPhase += dt * 3;
    this.position.y = 0.4 + Math.sin(this.bobPhase) * 0.12;
    if (this.age > this.lifetime) {
      this.world.removeEntity(this);
      return;
    }

    const player = this.world.players[0];
    if (player && !player.dead) {
      const dist = player.position.distanceTo(this.position);
      const magnetR = player.stats.pickupRadius + this.magnetRadius;
      if (dist < magnetR) {
        const pull = 1 - dist / magnetR;
        const dir = player.position.clone().sub(this.position).normalize();
        this.position.addScaled(dir, pull * 9 * dt);
        if (dist < player.radius + 0.5) {
          this.collect(player);
        }
      }
    }
  }

  collect(player) {
    if (!this.alive) return;
    this.alive = false;
    const world = this.world;
    switch (this.type) {
      case DROP_TYPES.health: {
        const healed = player.heal(25 * this.amount);
        world.bus.emit('player.pickup', { type: this.type, amount: healed });
        playSfx('pickup.health', { vol: 0.5 });
        break;
      }
      case DROP_TYPES.shield: {
        const recharged = player.rechargeShield(30 * this.amount);
        world.bus.emit('player.pickup', { type: this.type, amount: recharged });
        playSfx('pickup.shield', { vol: 0.5 });
        break;
      }
      case DROP_TYPES.ammo: {
        let total = 0;
        for (const w of player.weapons) {
          total += w.addAmmo(20 * this.amount);
        }
        world.bus.emit('player.pickup', { type: this.type, amount: total });
        playSfx('pickup.ammo', { vol: 0.5 });
        break;
      }
      case DROP_TYPES.energy: {
        world.bus.emit('player.pickup', { type: this.type, amount: this.amount });
        playSfx('pickup.energy', { vol: 0.35 });
        break;
      }
      case DROP_TYPES.core: {
        world.bus.emit('player.pickup', { type: this.type, amount: this.amount });
        playSfx('pickup.core', { vol: 0.6 });
        break;
      }
    }
    world.removeEntity(this);
  }
}

/** The loot manager: listens to kills and spawns pickups. */
export class LootManager {
  constructor(world, dropScale = 1) {
    this.world = world;
    this.dropScale = dropScale;
    this._unsub = world.bus.on('enemy.death', (e) => this._onKill(e));
    this._unsubLoot = world.bus.on('loot.drop', (e) => this._onDrop(e));
  }

  setDropScale(scale) {
    this.dropScale = scale;
  }

  _onKill(e) {
    const table = e.enemy?.def?.lootTable;
    if (!table) return;
    const drops = rollDrops(table, this.dropScale);
    for (const type of drops) {
      this._spawn(type, e.x, e.z);
    }
  }

  _onDrop(e) {
    const drops = rollDrops(e.table, this.dropScale);
    for (const type of drops) {
      this._spawn(type, e.x, e.z);
    }
  }

  _spawn(type, x, z) {
    if (type === DROP_TYPES.energy) {
      const count = energyCount(1);
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = 0.3 + Math.random() * 0.4;
        this.world.addEntity(new Pickup({ type, amount: 1, x: x + Math.cos(a) * r, y: 0.4, z: z + Math.sin(a) * r, lifetime: 40 }));
      }
      return;
    }
    this.world.addEntity(new Pickup({
      type, amount: 1,
      x: x + (Math.random() - 0.5) * 0.5, y: 0.4, z: z + (Math.random() - 0.5) * 0.5,
      lifetime: 45,
    }));
  }

  destroy() {
    this._unsub?.();
    this._unsubLoot?.();
  }
}
