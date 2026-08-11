// ============================================================================
// Decals.js
// Persistent-on-floor combat decals: scorch marks, energy stains, craters.
// A pooled set of plane meshes lying on the floor that fade over time, giving
// combat a lasting visual footprint. Cheap and atmospheric.
// ============================================================================

import * as THREE from 'three';
import { clamp, lerp } from '../core/MathUtils.js';

const DECAL_GEO = new THREE.PlaneGeometry(1, 1, 1, 1);

export class DecalSystem {
  constructor(scene, capacity = 64) {
    this.scene = scene;
    this.capacity = capacity;
    this.pool = [];
    for (let i = 0; i < capacity; i++) {
      const mat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
      const mesh = new THREE.Mesh(DECAL_GEO, mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.y = 0.02;
      mesh.visible = false;
      mesh.renderOrder = -1;
      scene.add(mesh);
      this.pool.push({ mesh, life: 0, maxLife: 6, baseOpacity: 0.6 });
    }
  }
  /** Spawn a decal at (x,z) with size, color, life. */
  spawn(x, z, size = 1.5, color = 0x551100, life = 8, opacity = 0.6, rotation = null) {
    const d = this._get();
    if (!d) return;
    d.mesh.position.set(x, 0.02, z);
    d.mesh.scale.set(size, size, 1);
    d.mesh.rotation.z = rotation != null ? rotation : Math.random() * Math.PI * 2;
    d.mesh.material.color.setHex(color);
    d.mesh.material.opacity = opacity;
    d.mesh.visible = true;
    d.life = life; d.maxLife = life; d.baseOpacity = opacity;
  }
  scorch(x, z, size = 1.5) { this.spawn(x, z, size, 0x331100, 12, 0.5); }
  energy(x, z, size = 1.5, color = 0x29e7ff) { this.spawn(x, z, size, color, 6, 0.5); }
  blood(x, z, size = 1.2, color = 0xff3df0) { this.spawn(x, z, size, color, 10, 0.4); }
  crater(x, z, size = 2.5) { this.spawn(x, z, size, 0x110011, 16, 0.6); }
  _get() {
    for (const d of this.pool) if (d.life <= 0) return d;
    // recycle oldest (lowest life remaining)
    let oldest = this.pool[0];
    for (const d of this.pool) if (d.life < oldest.life) oldest = d;
    return oldest;
  }
  update(dt) {
    for (const d of this.pool) {
      if (d.life <= 0) { if (d.mesh.visible) d.mesh.visible = false; continue; }
      d.life -= dt;
      if (d.life <= 0) { d.mesh.visible = false; d.mesh.material.opacity = 0; continue; }
      const t = d.life / d.maxLife;
      d.mesh.material.opacity = d.baseOpacity * clamp(t, 0, 1);
    }
  }
  dispose() { for (const d of this.pool) { this.scene.remove(d.mesh); d.mesh.material.dispose(); } }
}
