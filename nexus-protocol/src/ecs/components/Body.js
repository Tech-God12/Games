// ============================================================================
// Body.js — spatial/kinematic components
// Body:   position & velocity (pure data, no Object3D). Authoritative transform.
// Kinematics: movement tuning for character-like motion.
// Team:   collision/faction grouping ('player' | 'enemy' | 'neutral').
// ============================================================================

import * as THREE from 'three';
import { Component } from '../Component.js';

export const Teams = Object.freeze({ Player: 'player', Enemy: 'enemy', Neutral: 'neutral' });

export class Body extends Component {
  static type = 'Body';
  constructor() {
    super();
    this.pos = new THREE.Vector3();
    this.vel = new THREE.Vector3();
    this.radius = 0.4;
    this.height = 1.0;
    this.mass = 1.0;
    this.gravityScale = 1.0;
    this.grounded = false;
    this.friction = 8.0;
  }
  reset() {
    this.pos.set(0, 0, 0);
    this.vel.set(0, 0, 0);
    this.radius = 0.4;
    this.height = 1.0;
    this.mass = 1.0;
    this.gravityScale = 1.0;
    this.grounded = false;
    this.friction = 8.0;
  }
}

export class Kinematics extends Component {
  static type = 'Kinematics';
  constructor() {
    super();
    this.maxSpeed = 6.0;
    this.accel = 60.0;
    this.airAccel = 12.0;
    this.turnSpeed = 12.0;
    this.jumpForce = 7.0;
    this.dashSpeed = 18.0;
    this.dashDuration = 0.18;
    this.dashCooldown = 0.9;
  }
  reset() {
    this.maxSpeed = 6.0; this.accel = 60.0; this.airAccel = 12.0; this.turnSpeed = 12.0;
    this.jumpForce = 7.0; this.dashSpeed = 18.0; this.dashDuration = 0.18; this.dashCooldown = 0.9;
  }
}

export class Team extends Component {
  static type = 'Team';
  constructor() { super(); this.id = Teams.Neutral; }
  reset() { this.id = Teams.Neutral; }
}

/** Facing direction (yaw) for entities that orient toward movement/targets. */
export class Facing extends Component {
  static type = 'Facing';
  constructor() { super(); this.yaw = 0; this.pitch = 0; this.smooth = 10; }
  reset() { this.yaw = 0; this.pitch = 0; this.smooth = 10; }
}
