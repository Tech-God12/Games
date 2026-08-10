// ============================================================================
// Viewmodel.js
// Procedural first-person weapon model rendered in a dedicated scene/camera so
// it ignores world fog and never clips through walls. Builds a gun mesh from
// primitives based on the weapon's viewmodel descriptor and animates it with
// view bob, look sway, recoil kick, reload dip, equip slide, and muzzle flash.
// ============================================================================

import * as THREE from 'three';
import { lerp, damp, clamp, Easing } from '../core/MathUtils.js';

export class Viewmodel {
  constructor(viewmodelScene, assets) {
    this.scene = viewmodelScene;
    this.assets = assets;
    this.group = new THREE.Group();
    this.scene.add(this.group);
    this.gun = new THREE.Group();
    this.group.add(this.gun);
    this.muzzle = new THREE.Group();
    this.gun.add(this.muzzle);
    this.muzzle.position.set(0, 0, -1);

    // muzzle flash sprite
    const mfMat = new THREE.SpriteMaterial({ map: assets.particleTexture(), color: 0xffe08a, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
    this.muzzleFlash = new THREE.Sprite(mfMat);
    this.muzzleFlash.scale.set(0.5, 0.5, 1);
    this.muzzle.add(this.muzzleFlash);
    this.muzzleLight = new THREE.PointLight(0xffe08a, 0, 6, 2);
    this.muzzle.add(this.muzzleLight);

    // base transform (right-hand grip)
    this.basePos = new THREE.Vector3(0.28, -0.28, -0.55);
    this.baseRot = new THREE.Euler(0, 0, 0);
    this.group.position.copy(this.basePos);

    // animation state
    this.swayX = 0; this.swayY = 0;
    this.bobX = 0; this.bobY = 0;
    this.recoilPos = 0; this.recoilRot = 0;
    this.reloadDip = 0;
    this.equipT = 0;
    this.equipDur = 0.35;
    this.flashTime = 0;
    this.flashDur = 0.06;
    this.currentDef = null;
    this._materials = [];
  }

  /** Build (or rebuild) the gun mesh for a weapon definition. */
  setWeapon(def) {
    if (this.currentDef === def) return;
    this.currentDef = def;
    // clear previous
    for (let i = this.gun.children.length - 1; i >= 0; i--) {
      const c = this.gun.children[i];
      if (c === this.muzzle) continue;
      this.gun.remove(c);
      c.traverse?.((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
    }
    this._materials = [];
    const vm = def?.viewmodel || { color: 0x223044, accent: 0x29e7ff, length: 0.5, shape: 'box' };
    const mat = new THREE.MeshStandardMaterial({ color: vm.color, metalness: 0.7, roughness: 0.35, emissive: 0x000000 });
    const accentMat = new THREE.MeshStandardMaterial({ color: vm.accent, emissive: vm.accent, emissiveIntensity: 1.4, metalness: 0.4, roughness: 0.4 });
    this._materials.push(mat, accentMat);
    const len = vm.length || 0.5;
    const shape = vm.shape || 'box';
    this._buildShape(shape, len, mat, accentMat);
    this.muzzle.position.set(0, 0, -len - 0.05);
    this.equipT = 0;
    // flash color from weapon
    this.muzzleFlash.material.color.setHex(def?.muzzleColor || def?.tracerColor || 0xffe08a);
    this.muzzleLight.color.setHex(def?.muzzleColor || def?.tracerColor || 0xffe08a);
  }

  _add(mesh, parent = this.gun) { parent.add(mesh); return mesh; }
  _box(w, h, d, mat, x, y, z, parent) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z); return this._add(m, parent);
  }
  _cyl(r, h, mat, x, y, z, parent) {
    const g = new THREE.CylinderGeometry(r, r, h, 10);
    const m = new THREE.Mesh(g, mat); m.position.set(x, y, z); m.rotation.x = Math.PI / 2;
    return this._add(m, parent);
  }

  _buildShape(shape, len, mat, accentMat) {
    switch (shape) {
      case 'smg':
        this._box(0.08, 0.12, len, mat, 0, 0, -len / 2);
        this._cyl(0.03, len * 0.7, mat, 0, 0.02, -len * 0.6);
        this._box(0.07, 0.18, 0.06, mat, 0, -0.16, 0.0);
        this._box(0.03, 0.03, 0.2, accentMat, 0.05, 0.08, -0.1);
        break;
      case 'rifle':
        this._box(0.07, 0.1, len, mat, 0, 0, -len / 2);
        this._cyl(0.025, len * 0.9, mat, 0, 0.03, -len * 0.55);
        this._box(0.06, 0.2, 0.07, mat, 0, -0.16, 0.02);
        this._box(0.12, 0.04, 0.2, accentMat, 0, -0.05, -0.1);
        this._box(0.04, 0.1, 0.18, mat, 0, -0.02, 0.1);
        break;
      case 'shotgun':
        this._box(0.09, 0.12, len, mat, 0, 0, -len / 2);
        this._cyl(0.045, len * 0.8, mat, 0, 0.02, -len * 0.55);
        this._box(0.07, 0.2, 0.08, mat, 0, -0.17, 0.02);
        this._box(0.12, 0.05, 0.1, accentMat, 0, -0.04, -0.15);
        break;
      case 'heavy':
        this._box(0.12, 0.14, len, mat, 0, 0, -len / 2);
        this._cyl(0.06, len * 0.6, mat, 0, 0.02, -len * 0.5);
        this._box(0.1, 0.18, 0.1, mat, 0, -0.18, 0.03);
        this._box(0.16, 0.05, 0.14, accentMat, 0, -0.02, -0.1);
        this._cyl(0.08, 0.06, accentMat, 0, 0.02, -len - 0.05);
        break;
      case 'energy':
        this._box(0.08, 0.12, len * 0.9, mat, 0, 0, -len * 0.45);
        this._cyl(0.04, len, accentMat, 0, 0.03, -len * 0.5);
        this._box(0.07, 0.18, 0.07, mat, 0, -0.16, 0.02);
        this._box(0.04, 0.04, 0.22, accentMat, 0, 0.08, -0.1);
        break;
      case 'launcher':
        this._cyl(0.09, len, mat, 0, 0, -len / 2);
        this._box(0.1, 0.18, 0.1, mat, 0, -0.18, 0.03);
        this._cyl(0.1, 0.06, accentMat, 0, 0, -len - 0.03);
        this._box(0.05, 0.05, 0.18, accentMat, 0.08, 0, -0.2);
        break;
      case 'blade':
        this._box(0.03, 0.05, len * 1.4, accentMat, 0, 0.04, -len * 0.7);
        this._box(0.12, 0.04, 0.12, mat, 0, -0.02, 0.04);
        this._box(0.02, 0.12, 0.18, mat, 0, -0.1, 0.06);
        break;
      case 'pistol':
      case 'box':
      default:
        this._box(0.07, 0.1, len * 0.8, mat, 0, 0, -len * 0.4);
        this._cyl(0.025, len * 0.5, mat, 0, 0.02, -len * 0.6);
        this._box(0.06, 0.16, 0.06, mat, 0, -0.14, 0.0);
        this._box(0.03, 0.03, 0.18, accentMat, 0.04, 0.06, -0.08);
        break;
    }
  }

  /** Trigger a muzzle flash + recoil kick. */
  flash(intensity = 1) {
    this.flashTime = this.flashDur;
    this.muzzleFlash.material.opacity = intensity;
    const s = 0.5 + Math.random() * 0.3;
    this.muzzleFlash.scale.set(s, s, 1);
    this.muzzleLight.intensity = 6 * intensity;
    this.recoilPos = Math.min(this.recoilPos + 0.04, 0.12);
    this.recoilRot = Math.min(this.recoilRot + 0.06, 0.18);
  }

  reload() { this.reloadDip = 1; }

  /** Per-frame animation. */
  update(dt, player, weaponInstance) {
    const p = player?.get('Player');
    const body = player?.get('Body');
    // equip animation
    this.equipT = Math.min(this.equipDur, this.equipT + dt);
    const equip = Easing.outBack(this.equipT / this.equipDur);

    // bob from movement
    let bobAmt = 0;
    if (p && body) {
      const speed = Math.hypot(body.vel.x, body.vel.z);
      bobAmt = clamp(speed / 8, 0, 1) * (body.grounded ? 1 : 0.2);
    }
    const t = performance.now() * 0.001;
    this.bobX = Math.sin(t * 9) * 0.012 * bobAmt;
    this.bobY = Math.sin(t * 18) * 0.01 * bobAmt;

    // sway from look delta (approx via yaw/pitch derivative)
    if (p) {
      this.swayX = damp(this.swayX, -(p.meta?.lookDeltaX || 0) * 6, 8, dt);
      this.swayY = damp(this.swayY, -(p.meta?.lookDeltaY || 0) * 6, 8, dt);
      if (p.meta) { p.meta.lookDeltaX = 0; p.meta.lookDeltaY = 0; }
    }

    // recoil recovery
    this.recoilPos = damp(this.recoilPos, 0, 10, dt);
    this.recoilRot = damp(this.recoilRot, 0, 10, dt);

    // reload dip
    if (this.reloadDip > 0) {
      this.reloadDip = Math.max(0, this.reloadDip - dt * (1 / 0.9));
    }
    const dip = Math.sin((1 - this.reloadDip) * Math.PI) * 0.18 * this.reloadDip;

    // flash decay
    if (this.flashTime > 0) {
      this.flashTime -= dt;
      const a = clamp(this.flashTime / this.flashDur, 0, 1);
      this.muzzleFlash.material.opacity = a;
      this.muzzleLight.intensity = 6 * a;
    } else {
      this.muzzleFlash.material.opacity = 0;
      this.muzzleLight.intensity = 0;
    }

    // compose transform
    const px = this.basePos.x + this.bobX + this.swayX;
    const py = this.basePos.y + this.bobY + this.swayY - dip + this.recoilPos * 0.2;
    const pz = this.basePos.z + this.recoilPos - (1 - equip) * 0.6;
    this.group.position.set(px, py, pz);
    this.group.rotation.set(this.recoilRot - (1 - equip) * 0.5, this.swayX * 0.5, 0);
  }

  hide() { this.group.visible = false; }
  show() { this.group.visible = true; }

  dispose() {
    this.scene.remove(this.group);
    for (const m of this._materials) m.dispose();
  }
}
