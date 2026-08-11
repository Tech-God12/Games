// ============================================================================
// Render.js — render-side components linking entities to THREE objects and
// visual effects (billboarding, trails, glow pulse, damage flash).
// ============================================================================

import * as THREE from 'three';
import { Component } from '../Component.js';

/** References the Object3D that visually represents the entity. */
export class MeshRef extends Component {
  static type = 'MeshRef';
  constructor() {
    super();
    this.object = null;
    this.syncTransform = true;
    this.syncFacing = false;
    this.billboard = false;
    this.disposeOnRemove = true;
    this.castShadow = true;
    this.receiveShadow = true;
  }
  reset() {
    this.object = null; this.syncTransform = true; this.syncFacing = false;
    this.billboard = false; this.disposeOnRemove = true; this.castShadow = true; this.receiveShadow = true;
  }
}

/** A pulsing emissive glow driven by a sine wave (for power nodes, cores). */
export class GlowPulse extends Component {
  static type = 'GlowPulse';
  constructor() { super(); this.base = 1; this.amplitude = 0.5; this.speed = 3; this.phase = 0; }
  reset() { this.base = 1; this.amplitude = 0.5; this.speed = 3; this.phase = 0; }
}

/** Trail renderer data: a ring buffer of past positions rendered as a ribbon. */
export class Trail extends Component {
  static type = 'Trail';
  constructor() {
    super();
    this.points = [];
    this.maxPoints = 16;
    this.color = 0x29e7ff;
    this.width = 0.12;
    this.minDist = 0.25;
    this.fade = true;
    this.line = null;       // THREE.Line/LineSegments object
  }
  reset() {
    this.points.length = 0; this.maxPoints = 16; this.color = 0x29e7ff;
    this.width = 0.12; this.minDist = 0.25; this.fade = true; this.line = null;
  }
}

/** Damage flash: temporarily tint a material on hit. */
export class HitFlash extends Component {
  static type = 'HitFlash';
  constructor() { super(); this.time = 0; this.duration = 0.12; this.color = 0xffffff; this.intensity = 1; }
  reset() { this.time = 0; this.duration = 0.12; this.color = 0xffffff; this.intensity = 1; }
}

/** Floating damage number billboard (data; the UI/particle system renders it). */
export class DamageNumber extends Component {
  static type = 'DamageNumber';
  constructor() {
    super();
    this.value = 0;
    this.color = 0xffffff;
    this.crit = false;
    this.life = 0.9;
    this.age = 0;
    this.offset = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
  }
  reset() {
    this.value = 0; this.color = 0xffffff; this.crit = false; this.life = 0.9; this.age = 0;
    this.offset.set(0, 0, 0); this.velocity.set(0, 0, 0);
  }
}

/** Camera shake contribution requested by gameplay events. */
export class CameraShake extends Component {
  static type = 'CameraShake';
  constructor() { super(); this.trauma = 0; this.maxTrauma = 1; this.decay = 1.5; this.freq = 18; }
  reset() { this.trauma = 0; this.maxTrauma = 1; this.decay = 1.5; this.freq = 18; }
}
