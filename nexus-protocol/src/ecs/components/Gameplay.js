// ============================================================================
// Gameplay.js — player, enemy, boss, pickup, weapon-holder, spawner, wave.
// ============================================================================

import * as THREE from 'three';
import { Component } from '../Component.js';

export const PlayerState = Object.freeze({
  Idle: 'idle', Moving: 'moving', Dashing: 'dashing', Hurt: 'hurt', Dead: 'dead', Interacting: 'interacting',
});

export class Player extends Component {
  static type = 'Player';
  constructor() {
    super();
    this.state = PlayerState.Idle;
    this.characterId = 'ranger';
    this.dashCooldown = 0;
    this.dashTime = 0;
    this.dashDir = new THREE.Vector3();
    this.jumpCount = 0;
    this.maxJumps = 1;
    this.lastFireTime = 0;
    this.lookYaw = 0;
    this.lookPitch = 0;
    this.recoilPitch = 0;
    this.recoilYaw = 0;
    this.bobPhase = 0;
    this.sprintEnergy = 100;
    this.interactTarget = null;
  }
  reset() {
    this.state = PlayerState.Idle; this.characterId = 'ranger';
    this.dashCooldown = 0; this.dashTime = 0; this.dashDir.set(0, 0, 0);
    this.jumpCount = 0; this.maxJumps = 1; this.lastFireTime = 0;
    this.lookYaw = 0; this.lookPitch = 0; this.recoilPitch = 0; this.recoilYaw = 0;
    this.bobPhase = 0; this.sprintEnergy = 100; this.interactTarget = null;
  }
}

export const EnemyState = Object.freeze({
  Spawn: 'spawn', Idle: 'idle', Chase: 'chase', Attack: 'attack', Flee: 'flee',
  Stunned: 'stunned', Dead: 'dead', Wander: 'wander', Strafe: 'strafe', Charge: 'charge',
});

export class Enemy extends Component {
  static type = 'Enemy';
  constructor() {
    super();
    this.archetypeId = 'drone';
    this.state = EnemyState.Spawn;
    this.stateTime = 0;
    this.target = null;          // entity ref
    this.targetLastSeen = 0;
    this.attackCooldown = 0;
    this.attackRange = 8;
    this.preferredRange = 6;
    this.detectRange = 40;
    this.speedScale = 1;
    this.damageScale = 1;
    this.healthScale = 1;
    this.aggro = 1;
    this.wanderTarget = new THREE.Vector3();
    this.wanderTime = 0;
    this.isElite = false;
    this.eliteMods = [];
    this.behavior = 'chaser';    // behavior tree key
    this.leashDist = 60;
  }
  reset() {
    this.archetypeId = 'drone'; this.state = EnemyState.Spawn; this.stateTime = 0;
    this.target = null; this.targetLastSeen = 0; this.attackCooldown = 0;
    this.attackRange = 8; this.preferredRange = 6; this.detectRange = 40;
    this.speedScale = 1; this.damageScale = 1; this.healthScale = 1; this.aggro = 1;
    this.wanderTarget.set(0, 0, 0); this.wanderTime = 0; this.isElite = false; this.eliteMods = [];
    this.behavior = 'chaser'; this.leashDist = 60;
  }
}

export class Boss extends Component {
  static type = 'Boss';
  constructor() {
    super();
    this.bossId = 'sentinel';
    this.phase = 1;
    this.maxPhases = 3;
    this.abilityTimer = 0;
    this.abilityQueue = [];
    this.currentAbility = null;
    this.abilityTime = 0;
    this.phaseThresholds = [0.66, 0.33];
    this.invulnDuringAbility = false;
    this.title = 'THE SENTINEL';
    this.subtitle = 'Guardian of the Nexus';
  }
  reset() {
    this.bossId = 'sentinel'; this.phase = 1; this.maxPhases = 3; this.abilityTimer = 0;
    this.abilityQueue.length = 0; this.currentAbility = null; this.abilityTime = 0;
    this.phaseThresholds = [0.66, 0.33]; this.invulnDuringAbility = false;
    this.title = 'THE SENTINEL'; this.subtitle = 'Guardian of the Nexus';
  }
}

export const PickupType = Object.freeze({
  Health: 'health', Currency: 'currency', Ammo: 'ammo', Shield: 'shield',
  PowerDamage: 'powerDamage', PowerSpeed: 'powerSpeed', PowerRapid: 'powerRapid',
  Nuke: 'nuke', Freeze: 'freeze', Magnet: 'magnet', Bomb: 'bomb', Heart: 'heart', Key: 'key',
});

export class Pickup extends Component {
  static type = 'Pickup';
  constructor() {
    super();
    this.type = PickupType.Health;
    this.value = 25;
    this.magnet = 0;
    this.magnetRange = 4;
    this.bob = 0;
    this.collected = false;
  }
  reset() {
    this.type = PickupType.Health; this.value = 25; this.magnet = 0; this.magnetRange = 4;
    this.bob = 0; this.collected = false;
  }
}

export class WeaponHolder extends Component {
  static type = 'WeaponHolder';
  constructor() {
    super();
    this.slots = [];          // array of weapon instance descriptors
    this.current = 0;
    this.swapTime = 0;        // cooldown for swapping
    this.fireBuffer = 0;      // buffered fire request
  }
  reset() { this.slots.length = 0; this.current = 0; this.swapTime = 0; this.fireBuffer = 0; }
  get currentWeapon() { return this.slots[this.current] || null; }
}

/** Marks an entity as a member of the current wave (for kill counting). */
export class WaveMember extends Component {
  static type = 'WaveMember';
  constructor() { super(); this.waveIndex = 0; this.isBoss = false; this.isElite = false; }
  reset() { this.waveIndex = 0; this.isBoss = false; this.isElite = false; }
}

/** Spawner anchor for continuous enemy emission. */
export class Spawner extends Component {
  static type = 'Spawner';
  constructor() {
    super();
    this.interval = 2;
    this.timer = 0;
    this.maxAlive = 6;
    this.archetype = 'drone';
    this.team = 'enemy';
    this.active = true;
  }
  reset() { this.interval = 2; this.timer = 0; this.maxAlive = 6; this.archetype = 'drone'; this.team = 'enemy'; this.active = true; }
}
