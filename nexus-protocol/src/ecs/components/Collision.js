// ============================================================================
// Collision.js — collider shapes and collision layers.
// ============================================================================

import * as THREE from 'three';
import { Component } from '../Component.js';

export const ColliderType = Object.freeze({ Sphere: 'sphere', Box: 'box', Cylinder: 'cylinder' });

export const CollisionLayer = Object.freeze({
  Player: 1 << 0,
  Enemy: 1 << 1,
  ProjectilePlayer: 1 << 2,
  ProjectileEnemy: 1 << 3,
  Pickup: 1 << 4,
  Solid: 1 << 5,
  Trigger: 1 << 6,
  Boss: 1 << 7,
});

export class Collider extends Component {
  static type = 'Collider';
  constructor() {
    super();
    this.type = ColliderType.Sphere;
    this.radius = 0.4;
    this.halfExtents = new THREE.Vector3(0.4, 0.5, 0.4);
    this.offset = new THREE.Vector3(0, 0.5, 0);
    this.layer = 0;
    this.mask = 0;
    this.solid = true;       // blocks movement (true) vs trigger (false)
    this.bounce = 0;
  }
  reset() {
    this.type = ColliderType.Sphere; this.radius = 0.4;
    this.halfExtents.set(0.4, 0.5, 0.4); this.offset.set(0, 0.5, 0);
    this.layer = 0; this.mask = 0; this.solid = true; this.bounce = 0;
  }
}

/** A simple voxel/occupancy marker used for arena wall collision queries. */
export class SolidBody extends Component {
  static type = 'SolidBody';
  constructor() { super(); this.min = new THREE.Vector3(); this.max = new THREE.Vector3(); this.static = true; }
  reset() { this.min.set(0, 0, 0); this.max.set(0, 0, 0); this.static = true; }
}
