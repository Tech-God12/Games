/**
 * VOIDBREAK — Enemy archetypes.
 *
 * Concrete enemy classes. Most behavior lives in the base Enemy + Brain;
 * these classes add their signature attacks (melee lunges, ranged bursts,
 * specials) and small per-type tweaks. Each is deliberately small.
 */

import { Enemy } from './enemy.js';
import { playSfx } from '../../audio/sfx.js';

export class Grunt extends Enemy {
  constructor(def, world, opts) {
    super(def, world, opts);
    this.attackAnim = 0;
  }

  updateAttack(dt) {
    this.attackAnim = Math.max(0, this.attackAnim - dt);
    const player = this.world.players[0];
    if (!player || player.dead) return;
    if (this.attackAnim <= 0) {
      this.attackAnim = 0.4;
      this.lungeAt(player, this.speed * 2.1, 2.6);
      playSfx('enemy.melee_swing', { x: this.position.x, y: this.position.y, z: this.position.z, vol: 0.3 });
      this.world.bus.emit('fx.melee_windup', { x: this.position.x, y: this.position.y + this.height * 0.6, z: this.position.z });
    }
    if (this.attackAnim < 0.22) {
      this.meleeHit(player, 2.4, this.damage);
    }
  }
}

export class Runner extends Grunt {
  updateAttack(dt) {
    this.attackAnim = Math.max(0, this.attackAnim - dt);
    const player = this.world.players[0];
    if (!player || player.dead) return;
    if (this.attackAnim <= 0) {
      this.attackAnim = 0.3;
      this.lungeAt(player, this.speed * 2.4, 2.2);
    }
    if (this.attackAnim < 0.16) {
      this.meleeHit(player, 2.1, this.damage);
    }
  }
}

export class Shooter extends Enemy {
  constructor(def, world, opts) {
    super(def, world, opts);
    this.burstCount = 0;
    this.burstTimer = 0;
  }

  performRangedAttack() {
    const player = this.world.players[0];
    if (!player || player.dead) return;
    const dist = player.position.distanceTo(this.position);
    if (dist > this.behavior.strafeRange + 4) return;
    if (this.burstCount > 0) {
      this.burstTimer -= 1 / 60;
      if (this.burstTimer <= 0) {
        this.burstCount--;
        this.burstTimer = 0.12;
        this.shootAtPlayer(player, this.damage);
        this.world.bus.emit('fx.muzzle', { x: this.position.x, y: this.position.y + this.height * 0.75, z: this.position.z, color: '#ffb066' });
      }
    } else if (this.attackCooldown <= 0) {
      this.burstCount = 3;
      this.burstTimer = 0;
      this.attackCooldown = this.behavior.attackCooldown;
    }
  }
}

export class Spitter extends Enemy {
  performRangedAttack() {
    const player = this.world.players[0];
    if (!player || player.dead) return;
    const dist = player.position.distanceTo(this.position);
    if (dist > this.behavior.strafeRange + 4) return;
    if (this.attackCooldown <= 0) {
      this.attackCooldown = this.behavior.attackCooldown;
      this.lobAtPlayer(player, this.damage, 9, '#a8ff5a');
      this.attackAnim = 0.5;
    }
  }
}

export class Brute extends Enemy {
  constructor(def, world, opts) {
    super(def, world, opts);
    this.attackAnim = 0;
    this.slamAnim = 0;
  }

  updateAttack(dt) {
    this.attackAnim = Math.max(0, this.attackAnim - dt);
    const player = this.world.players[0];
    if (!player || player.dead) return;
    if (this.attackAnim <= 0) {
      this.attackAnim = 0.7;
      this.lungeAt(player, this.speed * 1.6, 3.4);
      playSfx('enemy.growl', { x: this.position.x, y: this.position.y, z: this.position.z, vol: 0.5 });
    }
    if (this.attackAnim < 0.35) {
      this.meleeHit(player, 3.3, this.damage);
    }
  }

  updateSpecial(dt) {
    this.slamAnim = Math.max(0, this.slamAnim - dt);
    if (this.slamAnim <= 0) {
      this.slamAnim = 0.9;
      this.world.bus.emit('fx.shockwave', { x: this.position.x, y: 0.2, z: this.position.z, radius: 6, color: '#ff5d5d' });
      playSfx('explosion.medium', { x: this.position.x, y: this.position.y, z: this.position.z, vol: 0.6 });
      this.world.bus.emit('cam.shake', { amount: 0.6, duration: 0.4 });
      const player = this.world.players[0];
      if (player && !player.dead) {
        const dist = player.position.distanceTo(this.position);
        if (dist < 6) {
          const dmg = this.damage * 1.4 * (1 - dist / 7);
          player.takeDamage(dmg, this, { element: 'kinetic', sourcePos: this.position });
          player.movement.vx += (player.position.x - this.position.x) / dist * 6;
          player.movement.vz += (player.position.z - this.position.z) / dist * 6;
        }
      }
      this.brain.specialReady = this.behavior.specialCooldown;
    }
  }
}

export class Shieldbearer extends Enemy {
  constructor(def, world, opts) {
    super(def, world, opts);
    this.attackAnim = 0;
    this.def.shieldBlock = 0.85;
  }

  applyDamage(amount, source, opts = {}) {
    if (!this.alive) return 0;
    if (source?.position) {
      const to = this.position.clone().sub(source.position).set(this.position.x - source.position.x, 0, this.position.z - source.position.z).normalize();
      const dot = to.x * this.facing.x + to.z * this.facing.z;
      if (dot > 0.55) {
        amount *= (1 - (this.def.shieldBlock ?? 0.85));
        this.world.bus.emit('fx.shield_hit', { x: this.position.x, y: this.position.y + this.height * 0.6, z: this.position.z });
        if (opts.crit) opts.crit = false;
      }
    }
    return super.applyDamage(amount, source, opts);
  }

  updateAttack(dt) {
    this.attackAnim = Math.max(0, this.attackAnim - dt);
    const player = this.world.players[0];
    if (!player || player.dead) return;
    if (this.attackAnim <= 0) {
      this.attackAnim = 0.5;
      this.lungeAt(player, this.speed * 1.8, 2.6);
      playSfx('enemy.melee_swing', { x: this.position.x, y: this.position.y, z: this.position.z, vol: 0.35 });
    }
    if (this.attackAnim < 0.28) {
      this.meleeHit(player, 2.5, this.damage);
    }
  }
}

export class Drone extends Enemy {
  constructor(def, world, opts) {
    super(def, world, opts);
    this.burstTimer = 0;
    this.hoverBase = def.hoverHeight ?? 2.6;
  }

  update(dt) {
    if (!this.alive) {
      super.update(dt);
      return;
    }
    const targetY = this.hoverBase + Math.sin(this.animPhase * 0.7) * 0.3;
    this.position.y += (targetY - this.position.y) * Math.min(1, dt * 3);
    super.update(dt);
  }

  performRangedAttack() {
    const player = this.world.players[0];
    if (!player || player.dead) return;
    const dist = player.position.distanceTo(this.position);
    if (dist > this.behavior.strafeRange + 3) return;
    if (this.burstTimer > 0) {
      this.burstTimer -= 1 / 60;
      if (this.burstTimer <= 0) {
        this.burstTimer = 0.35;
        this.shootAtPlayer(player, this.damage, 26, '#6ad8ff');
      }
    } else if (this.attackCooldown <= 0) {
      this.burstTimer = 0.1;
      this.attackCooldown = this.behavior.attackCooldown;
    }
  }
}

export class Swarmling extends Enemy {
  constructor(def, world, opts) {
    super(def, world, opts);
    this.zigPhase = Math.random() * Math.PI * 2;
  }

  update(dt) {
    this.zigPhase += dt * 10;
    super.update(dt);
    const lateral = Math.sin(this.zigPhase) * 2.5;
    this.velocity.x += lateral * this.facing.z * dt * 3;
    this.velocity.z -= lateral * this.facing.x * dt * 3;
  }

  updateAttack(dt) {
    const player = this.world.players[0];
    if (!player || player.dead) return;
    if (this.attackCooldown <= 0) {
      this.attackCooldown = this.behavior.attackCooldown;
      this.meleeHit(player, 1.6, this.damage);
    }
  }
}

export class Summoner extends Enemy {
  constructor(def, world, opts) {
    super(def, world, opts);
    this.summonAnim = 0;
  }

  updateSpecial(dt) {
    this.summonAnim = Math.max(0, this.summonAnim - dt);
    if (this.summonAnim <= 0) {
      this.summonAnim = 1.2;
      for (let i = 0; i < 3; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = 2 + Math.random() * 2;
        this.world.bus.emit('enemy.summon_request', {
          id: 'swarmling',
          x: this.position.x + Math.cos(a) * r,
          y: 0,
          z: this.position.z + Math.sin(a) * r,
        });
      }
      this.world.bus.emit('fx.summon_ritual', { x: this.position.x, y: this.position.y + this.height * 0.8, z: this.position.z, color: '#c07dff' });
      playSfx('enemy.summon', { x: this.position.x, y: this.position.y, z: this.position.z, vol: 0.5 });
      this.brain.specialReady = this.behavior.specialCooldown;
    }
  }
}

export class Elite extends Enemy {
  constructor(def, world, opts) {
    super(def, world, opts);
    this.glowPhase = 0;
  }

  update(dt) {
    this.glowPhase += dt * 3;
    super.update(dt);
  }
}
