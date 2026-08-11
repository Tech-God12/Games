/**
 * VOIDBREAK — Enemy brain (FSM).
 *
 * Drives enemy behavior with a finite state machine: idle → alert →
 * chase / strafe / attack / retreat / special, with per-archetype logic
 * injected via the archetype's `behavior` hooks.
 */

import { StateMachine } from '../../core/state_machine.js';

export class Brain {
  /**
   * @param {object} enemy the enemy entity (provides methods the states call)
   */
  constructor(enemy) {
    this.enemy = enemy;
    this.fsm = new StateMachine(this, {
      initial: 'idle',
      states: {
        idle: {
          enter: (self) => self.enemy.onStateEnter?.('idle'),
          update: (self, dt) => self._updateIdle(dt),
          exit: (self) => self.enemy.onStateExit?.('idle'),
        },
        alert: {
          enter: (self) => self.enemy.onStateEnter?.('alert'),
          update: (self, dt) => self._updateAlert(dt),
          exit: (self) => self.enemy.onStateExit?.('alert'),
        },
        chase: {
          enter: (self) => self.enemy.onStateEnter?.('chase'),
          update: (self, dt) => self._updateChase(dt),
          exit: (self) => self.enemy.onStateExit?.('chase'),
        },
        strafe: {
          enter: (self) => self.enemy.onStateEnter?.('strafe'),
          update: (self, dt) => self._updateStrafe(dt),
          exit: (self) => self.enemy.onStateExit?.('strafe'),
        },
        attack: {
          enter: (self) => self.enemy.onStateEnter?.('attack'),
          update: (self, dt) => self._updateAttack(dt),
          exit: (self) => self.enemy.onStateExit?.('attack'),
        },
        retreat: {
          enter: (self) => self.enemy.onStateEnter?.('retreat'),
          update: (self, dt) => self._updateRetreat(dt),
          exit: (self) => self.enemy.onStateExit?.('retreat'),
        },
        special: {
          enter: (self) => self.enemy.onStateEnter?.('special'),
          update: (self, dt) => self._updateSpecial(dt),
          exit: (self) => self.enemy.onStateExit?.('special'),
        },
        dead: {
          update: () => {},
        },
      },
    });

    this.lastAlert = 0;
    this.specialReady = 0;
    this.side = 1;
    this.strafeTimer = 0;
    this.retreatTimer = 0;
  }

  update(dt) {
    const enemy = this.enemy;
    if (!enemy.alive) {
      if (!this.fsm.is('dead')) this.fsm.set('dead');
      return;
    }

    this._decide(dt);
    this.fsm.update(dt);
  }

  _decide(dt) {
    const enemy = this.enemy;
    const senses = enemy.senses;
    const player = senses.player;
    const canSee = senses.canSeePlayer(dt);

    if (canSee) {
      this.lastAlert = enemy.world.time;
    }

    const target = player && !player.dead ? player : null;
    if (!target) {
      if (!this.fsm.is('idle')) this.fsm.set('idle');
      return;
    }

    const dist = target.position.distanceTo(enemy.position);
    const rules = enemy.behavior;

    if (rules.special && this.specialReady <= 0 && canSee && dist <= (rules.specialRange ?? 10)) {
      this.fsm.set('special');
      this.specialReady = rules.specialCooldown ?? 8;
      return;
    }

    const attackRange = rules.attackRange ?? 2.2;
    const preferredRange = rules.preferredRange ?? 12;
    const strafeRange = rules.strafeRange ?? 18;

    if (canSee) {
      if (enemy.attackCooldown <= 0 && dist <= attackRange && (rules.attackStyle === 'melee' || rules.attackStyle === 'both')) {
        this.fsm.set('attack');
      } else if ((rules.attackStyle === 'ranged' || rules.attackStyle === 'both') && dist <= strafeRange) {
        if (dist < preferredRange - 2) {
          this.fsm.set('retreat');
        } else if (dist > preferredRange + 3) {
          this.fsm.set('chase');
        } else {
          this.fsm.set('strafe');
        }
      } else if (dist > attackRange) {
        this.fsm.set('chase');
      } else {
        this.fsm.set('strafe');
      }
    } else if (senses.hasTarget) {
      this.fsm.set('chase');
      enemy.lastKnownTarget.copy(senses.lastKnownPlayer);
    } else if (this.fsm.is('chase') || this.fsm.is('attack') || this.fsm.is('strafe')) {
      this.fsm.set('idle');
    }
  }

  _moveTo(target, dt, speedScale = 1) {
    const enemy = this.enemy;
    const { steer, avoidWalls, separation } = enemy.aiModule;
    const speed = enemy.speed * speedScale;
    const seeked = seekVec(enemy.position, target, speed);
    const desired = steer(enemy.position, { vx: enemy.velocity.x, vz: enemy.velocity.z }, seeked, speed, dt);
    if (Number.isNaN(desired.vx) || Number.isNaN(desired.vz)) {
      console.error('[TRACE]', enemy.id,
        'pos:', enemy.position.x, enemy.position.z,
        'target:', target.x, target.z,
        'speed:', speed,
        'seeked:', seeked.vx, seeked.vz,
        'vel:', enemy.velocity.x, enemy.velocity.z);
    }
    const w = avoidWalls(enemy.position, enemy.world, enemy.wallProbe ?? 1.4, 3);
    desired.vx += w.x * (enemy.wallAvoidWeight ?? 1);
    desired.vz += w.z * (enemy.wallAvoidWeight ?? 1);
    const seps = separation(enemy.position, enemy.world.queryEnemies(enemy.position.x, enemy.position.z, 2), 1.0, 1.2);
    desired.vx += seps.x;
    desired.vz += seps.z;
    enemy.velocity.set(desired.vx, 0, desired.vz);
  }

  _faceTarget(dt) {
    const enemy = this.enemy;
    const player = enemy.senses.player;
    if (!player) return;
    enemy.faceTowards(player.position, dt);
  }

  _tryAttack(dt) {
    const enemy = this.enemy;
    enemy.attackCooldown -= dt;
    if (enemy.attackCooldown <= 0) {
      const fired = enemy.performAttack?.();
      if (fired) {
        enemy.attackCooldown = enemy.behavior.attackCooldown ?? 1.2;
      }
    }
  }

  _updateIdle(dt) {
    const enemy = this.enemy;
    enemy.velocity.set(0, 0, 0);
    enemy.idlePhase = (enemy.idlePhase ?? 0) + dt;
    if (enemy.senses.canSeePlayer(dt)) {
      this.fsm.set('chase');
      enemy.onAlerted?.();
    }
  }

  _updateAlert(dt) {
    const enemy = this.enemy;
    if (enemy.senses.hasTarget) {
      this.fsm.set('chase');
    } else if (this.fsm.time > 1.5) {
      this.fsm.set('idle');
    }
    this._faceTarget(dt);
  }

  _updateChase(dt) {
    const enemy = this.enemy;
    const target = enemy.lastKnownTarget ?? enemy.senses.player?.position;
    if (!target) {
      this.fsm.set('idle');
      return;
    }
    this._moveTo(target, dt);
    this._faceTarget(dt);
    this._tryAttack(dt);
    if (enemy.behavior.attackStyle !== 'melee') {
      enemy.performRangedAttack?.();
    }
  }

  _updateStrafe(dt) {
    const enemy = this.enemy;
    const player = enemy.senses.player;
    if (!player) {
      this.fsm.set('idle');
      return;
    }
    this.strafeTimer -= dt;
    if (this.strafeTimer <= 0) {
      this.strafeTimer = 1.5 + Math.random() * 1.5;
      this.side = Math.random() < 0.5 ? -1 : 1;
    }
    const { orbit, avoidWalls, separation } = enemy.aiModule;
    const desired = orbit(enemy.position, { vx: enemy.velocity.x, vz: enemy.velocity.z }, player.position, enemy.behavior.preferredRange ?? 10, enemy.speed * 0.85, this.side);
    const walls = avoidWalls(enemy.position, enemy.world, enemy.wallProbe ?? 1.4, 3);
    const seps = separation(enemy.position, enemy.world.queryEnemies(enemy.position.x, enemy.position.z, 2), 1.0, 1.2);
    enemy.velocity.set(desired.vx + walls.x + seps.x, 0, desired.vz + walls.z + seps.z);
    this._faceTarget(dt);
    enemy.performRangedAttack?.();
  }

  _updateAttack(dt) {
    const enemy = this.enemy;
    this._faceTarget(dt);
    enemy.updateAttack?.(dt);
    enemy.velocity.x *= 0.8;
    enemy.velocity.z *= 0.8;
  }

  _updateRetreat(dt) {
    const enemy = this.enemy;
    const player = enemy.senses.player;
    if (!player) {
      this.fsm.set('idle');
      return;
    }
    this.retreatTimer -= dt;
    if (this.retreatTimer <= 0) {
      this.retreatTimer = 1.0;
      enemy.performRangedAttack?.();
    }
    const { flee, avoidWalls, separation } = enemy.aiModule;
    const desired = flee(enemy.position, { vx: enemy.velocity.x, vz: enemy.velocity.z }, player.position, enemy.speed * 0.8);
    const walls = avoidWalls(enemy.position, enemy.world, enemy.wallProbe ?? 1.4, 3);
    const seps = separation(enemy.position, enemy.world.queryEnemies(enemy.position.x, enemy.position.z, 2), 1.0, 1.2);
    enemy.velocity.set(desired.vx + walls.x + seps.x, 0, desired.vz + walls.z + seps.z);
    this._faceTarget(dt);
    enemy.performRangedAttack?.();
  }

  _updateSpecial(dt) {
    const enemy = this.enemy;
    enemy.updateSpecial?.(dt);
  }

  get state() {
    return this.fsm.currentId;
  }

  /** Notify: take damage — react. */
  onDamaged(attacker) {
    if (attacker && this.fsm.is('idle')) {
      this.fsm.set('chase');
      this.enemy.onAlerted?.();
      if (attacker.position) {
        this.enemy.lastKnownTarget = attacker.position.clone();
      }
    }
  }
}

function seekVec(pos, target, speed) {
  const dx = target.x - pos.x;
  const dz = target.z - pos.z;
  const len = Math.hypot(dx, dz) || 1;
  return { vx: dx / len * speed, vz: dz / len * speed };
}
