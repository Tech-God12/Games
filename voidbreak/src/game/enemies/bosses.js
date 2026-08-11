/**
 * VOIDBREAK — Bosses.
 *
 * The Colossus (melee juggernaut with phase-gated attacks) and the Warden
 * (floating ranged tyrant with volleys and a sweeping beam). Bosses drive
 * their own behavior more directly than grunts, use phase transitions and
 * announce their attacks so the player can react.
 */

import { Enemy } from './enemy.js';
import { playSfx } from '../../audio/sfx.js';

export const BOSS_DEFS = [
  {
    id: 'boss_colossus', name: 'THE COLOSSUS', desc: 'A mountain of corrupted armor. Watch for the charge.',
    health: 4200, speed: 2.6, damage: 32, radius: 1.6, height: 4.2,
    attackStyle: 'melee', attackRange: 4.5, attackCooldown: 2.2, armor: 40,
    special: 'charge', specialRange: 14, specialCooldown: 9,
    xpValue: 40, scoreValue: 5000, visionRange: 60, headshot: false, lootTable: 'boss',
    visual: 'colossus', dieElement: 'void', color: '#3a3a4a', glow: '#ff5d5d', modelScale: 2.6, boss: true, alwaysAware: true,
  },
  {
    id: 'boss_warden', name: 'THE WARDEN', desc: 'It watches. It judges. It erases.',
    health: 3600, speed: 3.2, damage: 20, radius: 1.4, height: 2.8,
    attackStyle: 'ranged', preferredRange: 16, strafeRange: 30, attackCooldown: 1.4, armor: 25, shield: 600,
    special: 'beam', specialRange: 34, specialCooldown: 10,
    xpValue: 40, scoreValue: 5000, visionRange: 60, headshot: false, lootTable: 'boss',
    visual: 'warden', dieElement: 'energy', color: '#4a3a6a', glow: '#c07dff', modelScale: 2.2,
    flying: true, hoverHeight: 3.4, boss: true, alwaysAware: true,
  },
];

export class BossColossus extends Enemy {
  constructor(def, world, opts) {
    super(def, world, opts);
    this.attackAnim = 0;
    this.phase = 1;
    this.phaseTransitioning = 0;
    this.chargeState = 0;
    this.chargeDir = { x: 0, z: 0 };
    this.chargeTime = 0;
    this.slamAnim = 0;
  }

  applyDamage(amount, source, opts = {}) {
    const dealt = super.applyDamage(amount, source, opts);
    const ratio = this.health / this.maxHealth;
    const newPhase = ratio > 0.66 ? 1 : ratio > 0.33 ? 2 : 3;
    if (newPhase > this.phase) {
      this.phase = newPhase;
      this.phaseTransitioning = 2.5;
      this.world.bus.emit('boss.phase', { name: this.name, phase: newPhase, x: this.position.x, y: this.position.y + this.height * 0.6, z: this.position.z });
      playSfx('ui.boss', { vol: 0.7 });
    }
    return dealt;
  }

  update(dt) {
    if (this.phaseTransitioning > 0) {
      this.phaseTransitioning -= dt;
      this.velocity.set(0, 0, 0);
      this.syncVisual(dt);
      super.update(dt);
      return;
    }
    this.speed = this.def.speed * (1 + (this.phase - 1) * 0.25);
    super.update(dt);
  }

  updateAttack(dt) {
    this.attackAnim = Math.max(0, this.attackAnim - dt);
    const player = this.world.players[0];
    if (!player || player.dead) return;
    if (this.attackAnim <= 0) {
      this.attackAnim = 0.85;
      this.lungeAt(player, this.speed * 1.9, 5.0);
      playSfx('enemy.growl', { x: this.position.x, y: this.position.y, z: this.position.z, vol: 0.7 });
    }
    if (this.attackAnim < 0.4) {
      this.meleeHit(player, 4.8, this.damage);
      this.world.bus.emit('fx.shockwave', { x: this.position.x, y: 0.2, z: this.position.z, radius: 3, color: '#ff5d5d' });
    }
  }

  updateSpecial(dt) {
    const player = this.world.players[0];
    if (!player || player.dead) {
      this.chargeState = 0;
      return;
    }
    if (this.chargeState === 0) {
      this.chargeState = 1;
      this.chargeTime = 1.0;
      this.world.bus.emit('boss.telegraph', { x: this.position.x, y: this.position.y + 1, z: this.position.z, radius: 2, color: '#ff0000', time: 1.0 });
      playSfx('enemy.charge', { x: this.position.x, y: this.position.y, z: this.position.z, vol: 0.6 });
      const dx = player.position.x - this.position.x;
      const dz = player.position.z - this.position.z;
      const len = Math.hypot(dx, dz) || 1;
      this.chargeDir = { x: dx / len, z: dz / len };
    } else if (this.chargeState === 1) {
      this.chargeTime -= dt;
      this.velocity.set(0, 0, 0);
      if (this.chargeTime <= 0) {
        this.chargeState = 2;
        this.chargeTime = 1.1;
        playSfx('explosion.shockwave', { x: this.position.x, y: this.position.y, z: this.position.z, vol: 0.6 });
      }
    } else {
      this.chargeTime -= dt;
      this.velocity.set(this.chargeDir.x * 16, 0, this.chargeDir.z * 16);
      if (player && !player.dead) {
        const dist = player.position.distanceTo(this.position);
        if (dist < this.radius + player.radius + 0.3) {
          player.takeDamage(this.damage * 1.5, this, { element: 'kinetic', sourcePos: this.position });
          player.movement.vx += this.chargeDir.x * 10;
          player.movement.vz += this.chargeDir.z * 10;
        }
      }
      this.world.bus.emit('fx.trail', { x: this.position.x, y: 0.2, z: this.position.z, color: '#ff5d5d' });
      if (this.chargeTime <= 0) {
        this.chargeState = 0;
        this.velocity.set(0, 0, 0);
        this.brain.specialReady = this.behavior.specialCooldown;
        this.world.bus.emit('fx.shockwave', { x: this.position.x, y: 0.2, z: this.position.z, radius: 7, color: '#ff5d5d' });
        this.world.bus.emit('cam.shake', { amount: 0.8, duration: 0.5 });
        playSfx('explosion.large', { x: this.position.x, y: this.position.y, z: this.position.z, vol: 0.8 });
        if (player && !player.dead) {
          const dist = player.position.distanceTo(this.position);
          if (dist < 7) {
            player.takeDamage(this.damage * 0.8, this, { element: 'kinetic', sourcePos: this.position });
          }
        }
      }
    }
  }
}

export class BossWarden extends Enemy {
  constructor(def, world, opts) {
    super(def, world, opts);
    this.volleyTimer = 0;
    this.beamState = 0;
    this.beamDir = 1;
    this.beamAngle = 0;
    this.beamTime = 0;
    this.phase = 1;
  }

  applyDamage(amount, source, opts = {}) {
    const dealt = super.applyDamage(amount, source, opts);
    const ratio = this.health / this.maxHealth;
    const newPhase = ratio > 0.66 ? 1 : ratio > 0.33 ? 2 : 3;
    if (newPhase > this.phase) {
      this.phase = newPhase;
      this.world.bus.emit('boss.phase', { name: this.name, phase: newPhase, x: this.position.x, y: this.position.y + this.height * 0.6, z: this.position.z });
      playSfx('ui.boss', { vol: 0.7 });
    }
    return dealt;
  }

  update(dt) {
    super.update(dt);
    this.volleyTimer -= dt;
    this.position.y = (this.def.hoverHeight ?? 3.4) + Math.sin(this.animPhase * 0.8) * 0.4;
  }

  performRangedAttack() {
    const player = this.world.players[0];
    if (!player || player.dead) return;
    if (this.volleyTimer > 0) return;
    this.volleyTimer = this.phase === 3 ? 0.5 : 0.9;
    const shots = this.phase >= 2 ? 5 : 3;
    for (let i = 0; i < shots; i++) {
      const spreadAngle = (i - (shots - 1) / 2) * 0.14;
      const origin = this.position.clone();
      origin.y -= 0.3;
      const to = player.position.clone().sub(origin);
      const dir = to.normalize();
      const cos = Math.cos(spreadAngle);
      const sin = Math.sin(spreadAngle);
      const rotated = {
        x: dir.x * cos - dir.z * sin,
        y: dir.y,
        z: dir.x * sin + dir.z * cos,
      };
      this.world.spawnProjectile({
        origin,
        dir: { x: rotated.x, y: rotated.y, z: rotated.z },
        speed: 20,
        damage: this.damage,
        element: 'void',
        owner: this,
        radius: 0.25,
        splashRadius: 1.0,
        splashDamage: this.damage * 0.4,
        gravity: 0,
        life: 3,
        color: '#c07dff',
        glowColor: '#8a2be2',
      });
    }
    this.world.bus.emit('fx.muzzle', { x: this.position.x, y: this.position.y - 0.3, z: this.position.z, color: '#c07dff' });
    playSfx('gun.plasma', { x: this.position.x, y: this.position.y, z: this.position.z, vol: 0.4 });
  }

  updateSpecial(dt) {
    const player = this.world.players[0];
    if (!player || player.dead) {
      this.beamState = 0;
      return;
    }
    if (this.beamState === 0) {
      this.beamState = 1;
      this.beamTime = 1.2;
      const to = player.position.clone().sub(this.position);
      this.beamAngle = Math.atan2(to.z, to.x);
      this.beamDir = Math.random() < 0.5 ? -1 : 1;
      this.world.bus.emit('boss.telegraph', { x: this.position.x, y: this.position.y, z: this.position.z, radius: 3, color: '#c07dff', time: 1.2 });
      playSfx('enemy.charge', { x: this.position.x, y: this.position.y, z: this.position.z, vol: 0.5 });
    } else if (this.beamState === 1) {
      this.beamTime -= dt;
      this.velocity.set(0, 0, 0);
      if (this.beamTime <= 0) {
        this.beamState = 2;
        this.beamTime = 2.6;
        this.world.bus.emit('boss.beam_start', { x: this.position.x, y: this.position.y, z: this.position.z });
      }
    } else {
      this.beamTime -= dt;
      this.beamAngle += this.beamDir * dt * 1.4;
      const dirX = Math.cos(this.beamAngle);
      const dirZ = Math.sin(this.beamAngle);
      const origin = this.position.clone();
      const end = origin.clone().add({ x: dirX * 40, y: 0, z: dirZ * 40 });
      this.world.bus.emit('fx.beam', { x1: origin.x, y1: origin.y, z1: origin.z, x2: end.x, y2: end.y, z2: end.z, color: '#c07dff' });
      if (player && !player.dead) {
        const px = player.position.x - origin.x;
        const pz = player.position.z - origin.z;
        const proj = px * dirX + pz * dirZ;
        if (proj > 0 && proj < 40) {
          const perpX = px - dirX * proj;
          const perpZ = pz - dirZ * proj;
          const perpDist = Math.hypot(perpX, perpZ);
          if (perpDist < 1.0) {
            player.takeDamage(this.damage * 1.6, this, { element: 'void', sourcePos: origin });
            this.world.bus.emit('cam.shake', { amount: 0.4, duration: 0.2 });
          }
        }
      }
      if (this.beamTime <= 0) {
        this.beamState = 0;
        this.brain.specialReady = this.behavior.specialCooldown;
        this.world.bus.emit('boss.beam_end', {});
      }
    }
  }
}
