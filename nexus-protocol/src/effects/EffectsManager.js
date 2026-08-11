// ============================================================================
// EffectsManager.js
// One-stop facade for combat juice: particle bursts, tracers, beams, impact
// flashes, explosions, floating damage numbers (DOM-projected), screen flash
// vignettes, and camera-shake trauma. Backed by the GPU ParticleSystem and a
// pool of reusable line/sprite/DOM objects so effects never allocate per shot.
// ============================================================================

import * as THREE from 'three';
import { ParticleSystem } from './ParticleSystem.js';
import { bus, Channels } from '../core/EventBus.js';
import { clamp, lerp, TAU } from '../core/MathUtils.js';

export class EffectsManager {
  constructor(scene, camera, assets, opts = {}) {
    this.scene = scene;
    this.camera = camera;
    this.assets = assets;

    this.particles = new ParticleSystem(scene, opts.particleCap || 5000, assets.particleTexture());
    this.particlesSoft = new ParticleSystem(scene, opts.particleCap || 5000, assets.particleTexture());

    // ---- Tracer pool (additive lines) ----
    this.tracers = [];
    this._tracerCap = 96;
    for (let i = 0; i < this._tracerCap; i++) {
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
      const m = new THREE.LineBasicMaterial({ color: 0x29e7ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
      const line = new THREE.Line(g, m);
      line.frustumCulled = false;
      line.visible = false;
      scene.add(line);
      this.tracers.push({ line, life: 0, maxLife: 0.08 });
    }

    // ---- Beam pool (cylinder meshes for thick sustained beams) ----
    this.beams = [];
    this._beamCap = 24;
    for (let i = 0; i < this._beamCap; i++) {
      const geo = new THREE.CylinderGeometry(0.04, 0.04, 1, 8, 1, true);
      geo.translate(0, 0.5, 0); // pivot at base
      const mat = new THREE.MeshBasicMaterial({ color: 0xff3df0, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.frustumCulled = false;
      mesh.visible = false;
      scene.add(mesh);
      this.beams.push({ mesh, life: 0, maxLife: 0.06 });
    }

    // ---- Impact flash sprites ----
    this.flashes = [];
    this._flashCap = 64;
    const flashTex = assets.particleTexture();
    for (let i = 0; i < this._flashCap; i++) {
      const mat = new THREE.SpriteMaterial({ map: flashTex, color: 0xffffff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
      const sp = new THREE.Sprite(mat);
      sp.visible = false;
      scene.add(sp);
      this.flashes.push({ sprite: sp, life: 0, maxLife: 0.12, scale0: 1.2, scale1: 0.2 });
    }

    // ---- Dynamic point lights for explosions/muzzle ----
    this.lights = [];
    this._lightCap = 16;
    for (let i = 0; i < this._lightCap; i++) {
      const l = new THREE.PointLight(0xffaa44, 0, 12, 2);
      l.visible = false;
      scene.add(l);
      this.lights.push({ light: l, life: 0, maxLife: 0.25 });
    }

    // ---- Camera shake ----
    this.shakeTrauma = 0;
    this.shakeMax = 1;
    this.shakeDecay = 2.2;
    this._shakeNoise = 0;
    this.screenShakeScale = 1.0;

    // ---- Screen flash vignette (DOM) ----
    this.flashEl = document.createElement('div');
    this.flashEl.style.cssText = 'position:fixed;inset:0;z-index:200;pointer-events:none;opacity:0;' +
      'box-shadow:inset 0 0 200px rgba(255,40,80,0);transition:box-shadow 0.12s ease, opacity 0.12s ease;';
    document.body.appendChild(this.flashEl);
    this._flashColor = [255, 40, 80];
    this._flashStrength = 0;

    // ---- Damage numbers (DOM pool) ----
    this.damageNumbers = [];
    this._dnCap = 64;
    this._dnLayer = document.createElement('div');
    this._dnLayer.style.cssText = 'position:fixed;inset:0;z-index:180;pointer-events:none;overflow:hidden;font-family:"Segoe UI",Arial,sans-serif;';
    document.body.appendChild(this._dnLayer);
    for (let i = 0; i < this._dnCap; i++) {
      const el = document.createElement('div');
      el.style.cssText = 'position:absolute;transform:translate(-50%,-50%);font-weight:800;will-change:transform,opacity;' +
        'text-shadow:0 0 6px rgba(0,0,0,0.9),0 0 12px currentColor;opacity:0;';
      this._dnLayer.appendChild(el);
      this.damageNumbers.push({ el, life: 0, maxLife: 0.9, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, value: 0, color: '#fff', crit: false, size: 18 });
    }

    this.enabled = true;
    this._tmpV = new THREE.Vector3();
    this._tmpV2 = new THREE.Vector3();
    this._q = new THREE.Quaternion();
    this._up = new THREE.Vector3(0, 1, 0);
  }

  setShakeScale(s) { this.screenShakeScale = clamp(s, 0, 2); }

  // ----- Tracers -----
  tracer(from, to, color = 0x29e7ff, life = 0.06) {
    const t = this._getInactive(this.tracers); if (!t) return;
    const pos = t.line.geometry.attributes.position.array;
    pos[0] = from.x; pos[1] = from.y; pos[2] = from.z;
    pos[3] = to.x; pos[4] = to.y; pos[5] = to.z;
    t.line.geometry.attributes.position.needsUpdate = true;
    t.line.material.color.setHex(color);
    t.line.material.opacity = 1;
    t.line.visible = true;
    t.life = life; t.maxLife = life;
  }

  // ----- Beams -----
  beam(from, to, color = 0xff3df0, width = 0.06, life = 0.05) {
    const b = this._getInactive(this.beams); if (!b) return;
    const dir = this._tmpV.subVectors(to, from);
    const len = dir.length();
    b.mesh.scale.set(width / 0.04, len, width / 0.04);
    b.mesh.position.copy(from);
    b.mesh.quaternion.setFromUnitVectors(this._up, dir.normalize());
    b.mesh.material.color.setHex(color);
    b.mesh.material.opacity = 0.9;
    b.mesh.visible = true;
    b.life = life; b.maxLife = life;
  }

  // ----- Impact flash -----
  flash(position, color = 0xffffff, scale = 1.2) {
    const f = this._getInactive(this.flashes); if (!f) return;
    f.sprite.position.copy(position);
    f.sprite.material.color.setHex(color);
    f.sprite.material.opacity = 1;
    f.scale0 = scale; f.scale1 = scale * 0.2;
    f.sprite.scale.set(scale, scale, 1);
    f.sprite.visible = true;
    f.life = 0.12; f.maxLife = 0.12;
  }

  // ----- Dynamic light -----
  lightFlash(position, color = 0xffaa44, intensity = 8, range = 12, life = 0.18) {
    const l = this._getInactive(this.lights); if (!l) return;
    l.light.position.copy(position);
    l.light.color.setHex(color);
    l.light.intensity = intensity;
    l.light.distance = range;
    l.light.visible = true;
    l.life = life; l.maxLife = life;
  }

  // ----- Particle bursts -----
  hitSpark(position, normal, color = 0xffe08a, count = 10) {
    if (!this.enabled) return;
    this.flash(position, color, 0.8);
    const n = normal ? normal : this._tmpV2.set(0, 1, 0);
    this.particles.burst(count, (k) => {
      const a = Math.random() * TAU;
      const spread = 0.5 + Math.random() * 0.5;
      const dir = this._tmpV.set(
        n.x + Math.cos(a) * spread,
        n.y + Math.random() * 0.8,
        n.z + Math.sin(a) * spread
      ).normalize();
      const speed = 6 + Math.random() * 10;
      return {
        x: position.x, y: position.y, z: position.z,
        vx: dir.x * speed, vy: dir.y * speed, vz: dir.z * speed,
        life: 0.3 + Math.random() * 0.25,
        size: 2.5 + Math.random() * 2.5, sizeEnd: 0,
        colorStart: color, colorEnd: 0x551100,
        alphaStart: 1, alphaEnd: 0, drag: 6, gravity: 2,
      };
    });
  }

  bloodOrEnergy(position, color = 0x29e7ff, count = 14) {
    if (!this.enabled) return;
    this.particles.burst(count, () => {
      const a = Math.random() * TAU;
      const p = Math.random() * Math.PI;
      const speed = 3 + Math.random() * 7;
      return {
        x: position.x, y: position.y, z: position.z,
        vx: Math.sin(p) * Math.cos(a) * speed,
        vy: Math.cos(p) * speed + 2,
        vz: Math.sin(p) * Math.sin(a) * speed,
        life: 0.4 + Math.random() * 0.4,
        size: 2 + Math.random() * 2, sizeEnd: 0,
        colorStart: color, colorEnd: 0x110022,
        alphaStart: 0.9, alphaEnd: 0, drag: 4, gravity: 5,
      };
    });
  }

  muzzle(origin, dir, color = 0xffe08a) {
    if (!this.enabled) return;
    this.flash(origin, color, 0.6);
    this.lightFlash(origin, color, 6, 8, 0.06);
    this.particles.burst(6, () => {
      const spread = 0.3;
      const d = this._tmpV.copy(dir);
      d.x += (Math.random() - 0.5) * spread;
      d.y += (Math.random() - 0.5) * spread;
      d.z += (Math.random() - 0.5) * spread;
      d.normalize();
      const speed = 8 + Math.random() * 6;
      return {
        x: origin.x, y: origin.y, z: origin.z,
        vx: d.x * speed, vy: d.y * speed, vz: d.z * speed,
        life: 0.12 + Math.random() * 0.08,
        size: 3 + Math.random() * 2, sizeEnd: 0,
        colorStart: color, colorEnd: 0x331100,
        alphaStart: 1, alphaEnd: 0, drag: 8,
      };
    });
  }

  explosion(position, radius = 4, color = 0xff7733, big = false) {
    if (!this.enabled) return;
    this.flash(position, color, radius * 0.8);
    this.lightFlash(position, color, 14 + radius * 2, radius * 4, 0.3);
    const n = big ? 60 : 30;
    this.particles.burst(n, () => {
      const a = Math.random() * TAU;
      const p = Math.acos(2 * Math.random() - 1);
      const speed = (4 + Math.random() * 12) * (radius / 4);
      return {
        x: position.x, y: position.y, z: position.z,
        vx: Math.sin(p) * Math.cos(a) * speed,
        vy: Math.cos(p) * speed + 2,
        vz: Math.sin(p) * Math.sin(a) * speed,
        life: 0.4 + Math.random() * 0.6,
        size: 3 + Math.random() * 4, sizeEnd: 0,
        colorStart: color, colorEnd: 0x220000,
        alphaStart: 1, alphaEnd: 0, drag: 3, gravity: 3,
      };
    });
    // smoke
    this.particlesSoft.burst(big ? 24 : 12, () => ({
      x: position.x + (Math.random() - 0.5) * radius,
      y: position.y + Math.random() * radius,
      z: position.z + (Math.random() - 0.5) * radius,
      vx: (Math.random() - 0.5) * 2, vy: 1 + Math.random() * 2, vz: (Math.random() - 0.5) * 2,
      life: 0.8 + Math.random() * 0.8, size: 6, sizeEnd: 14,
      colorStart: 0x332222, colorEnd: 0x000000, alphaStart: 0.5, alphaEnd: 0, drag: 2,
    }));
    this.addShake(big ? 0.7 : 0.35);
    if (this.decals) this.decals.scorch(position.x, position.z, radius * 0.8);
  }

  death(position, color = 0x29e7ff, scale = 1) {
    if (!this.enabled) return;
    this.bloodOrEnergy(position, color, Math.floor(16 * scale));
    if (this.decals) this.decals.blood(position.x, position.z, 1.2 * scale, color);
    this.lightFlash(position, color, 6, 8, 0.15);
    this.particles.burst(Math.floor(8 * scale), () => ({
      x: position.x, y: position.y, z: position.z,
      vx: (Math.random() - 0.5) * 4, vy: 2 + Math.random() * 4, vz: (Math.random() - 0.5) * 4,
      life: 0.6 + Math.random() * 0.5, size: 4, sizeEnd: 0,
      colorStart: color, colorEnd: 0x000000, alphaStart: 1, alphaEnd: 0, drag: 3, gravity: 4,
    }));
  }

  trailParticle(position, color, size = 2, life = 0.3) {
    if (!this.enabled) return;
    this.particles.emit({
      x: position.x, y: position.y, z: position.z, vx: 0, vy: 0, vz: 0,
      life, size, sizeEnd: 0, colorStart: color, colorEnd: 0x000000, alphaStart: 0.8, alphaEnd: 0, drag: 1,
    });
  }

  // ----- Damage numbers -----
  damageNumber(worldPos, value, color = '#ffffff', crit = false) {
    if (!this.enabled) return;
    const dn = this._getInactive(this.damageNumbers); if (!dn) return;
    dn.x = worldPos.x; dn.y = worldPos.y + 0.6; dn.z = worldPos.z;
    dn.vx = (Math.random() - 0.5) * 1.5;
    dn.vy = 2.2 + Math.random() * 0.8;
    dn.vz = (Math.random() - 0.5) * 1.5;
    dn.value = Math.round(value);
    dn.color = color;
    dn.crit = crit;
    dn.size = crit ? 28 : 18;
    dn.life = crit ? 1.1 : 0.9;
    dn.maxLife = dn.life;
    dn.el.textContent = crit ? `${Math.round(value)}!` : `${Math.round(value)}`;
    dn.el.style.color = color;
    dn.el.style.fontSize = dn.size + 'px';
    dn.el.style.opacity = 1;
  }

  // ----- Screen flash & shake -----
  screenFlash(color = [255, 40, 80], strength = 0.6) {
    this._flashColor = color;
    this._flashStrength = Math.max(this._flashStrength, strength);
    this._applyFlash();
  }
  _applyFlash() {
    const [r, g, b] = this._flashColor;
    this.flashEl.style.boxShadow = `inset 0 0 200px rgba(${r},${g},${b},${this._flashStrength * 0.6})`;
    this.flashEl.style.opacity = String(this._flashStrength);
  }

  addShake(trauma) { this.shakeTrauma = clamp(this.shakeTrauma + trauma, 0, this.shakeMax); }

  /** Compute a shake offset (applied by the camera rig). */
  shakeOffset(out, dt) {
    if (this.shakeTrauma <= 0) { out.set(0, 0, 0); return out; }
    this.shakeTrauma = Math.max(0, this.shakeTrauma - this.shakeDecay * dt);
    const t = this.shakeTrauma * this.shakeTrauma; // squared for nice falloff
    const s = t * this.screenShakeScale;
    const time = performance.now() * 0.001;
    out.x = (Math.sin(time * 31.7) + Math.sin(time * 57.3)) * 0.5 * s * 0.4;
    out.y = (Math.sin(time * 23.1) + Math.sin(time * 41.9)) * 0.5 * s * 0.4;
    out.z = (Math.sin(time * 19.5)) * 0.5 * s * 0.3;
    return out;
  }
  get shakeRoll() {
    if (this.shakeTrauma <= 0) return 0;
    const t = this.shakeTrauma * this.shakeTrauma;
    const time = performance.now() * 0.001;
    return Math.sin(time * 17.2) * t * this.screenShakeScale * 0.15;
  }

  // ----- Per-frame update -----
  update(dt, camera) {
    if (camera) this.camera = camera;
    this.particles.update(dt);
    this.particlesSoft.update(dt);

    // tracers fade
    for (const t of this.tracers) {
      if (!t.line.visible) continue;
      t.life -= dt;
      if (t.life <= 0) { t.line.visible = false; t.line.material.opacity = 0; continue; }
      t.line.material.opacity = (t.life / t.maxLife);
    }
    // beams fade
    for (const b of this.beams) {
      if (!b.mesh.visible) continue;
      b.life -= dt;
      if (b.life <= 0) { b.mesh.visible = false; b.mesh.material.opacity = 0; continue; }
      b.mesh.material.opacity = (b.life / b.maxLife) * 0.9;
    }
    // flashes
    for (const f of this.flashes) {
      if (!f.sprite.visible) continue;
      f.life -= dt;
      if (f.life <= 0) { f.sprite.visible = false; f.sprite.material.opacity = 0; continue; }
      const p = 1 - f.life / f.maxLife;
      f.sprite.material.opacity = (1 - p);
      const sc = lerp(f.scale0, f.scale1, p);
      f.sprite.scale.set(sc, sc, 1);
    }
    // lights
    for (const l of this.lights) {
      if (!l.light.visible) continue;
      l.life -= dt;
      if (l.life <= 0) { l.light.visible = false; l.light.intensity = 0; continue; }
      l.light.intensity = (l.life / l.maxLife) * l.light.intensity; // handled via stored max? simple decay
    }
    // screen flash decay
    if (this._flashStrength > 0) {
      this._flashStrength = Math.max(0, this._flashStrength - dt * 4);
      this._applyFlash();
    }
    // damage numbers
    this._updateDamageNumbers(dt);
  }

  _updateDamageNumbers(dt) {
    const cam = this.camera;
    const w = window.innerWidth, h = window.innerHeight;
    for (const dn of this.damageNumbers) {
      if (dn.life <= 0) { if (dn.el.style.opacity !== '0') dn.el.style.opacity = '0'; continue; }
      dn.life -= dt;
      dn.x += dn.vx * dt;
      dn.y += dn.vy * dt;
      dn.z += dn.vz * dt;
      dn.vy -= 6 * dt; // gravity on the number
      dn.vx *= 0.96; dn.vz *= 0.96;
      this._tmpV.set(dn.x, dn.y, dn.z);
      this._tmpV.project(cam);
      const sx = (this._tmpV.x * 0.5 + 0.5) * w;
      const sy = (-this._tmpV.y * 0.5 + 0.5) * h;
      const behind = this._tmpV.z > 1;
      const alpha = behind ? 0 : clamp(dn.life / dn.maxLife, 0, 1);
      dn.el.style.transform = `translate(${sx}px, ${sy}px) translate(-50%,-50%) scale(${dn.crit ? 1.2 : 1})`;
      dn.el.style.opacity = String(alpha);
    }
  }

  _getInactive(pool) {
    for (let i = 0; i < pool.length; i++) if (pool[i].life <= 0 && !pool[i].line && !pool[i].mesh && !pool[i].sprite && !pool[i].light && !pool[i].el) return pool[i];
    // fallback: find by per-type visibility/inactive
    for (let i = 0; i < pool.length; i++) {
      const p = pool[i];
      if (p.line && !p.line.visible) return p;
      if (p.mesh && !p.mesh.visible) return p;
      if (p.sprite && !p.sprite.visible) return p;
      if (p.light && !p.light.visible) return p;
      if (p.el && p.life <= 0) return p;
    }
    return null;
  }

  dispose() {
    this.particles.dispose();
    this.particlesSoft.dispose();
    for (const t of this.tracers) { this.scene.remove(t.line); t.line.geometry.dispose(); t.line.material.dispose(); }
    for (const b of this.beams) { this.scene.remove(b.mesh); b.mesh.geometry.dispose(); b.mesh.material.dispose(); }
    for (const f of this.flashes) { this.scene.remove(f.sprite); f.sprite.material.dispose(); }
    for (const l of this.lights) { this.scene.remove(l.light); }
    this.flashEl.remove();
    this._dnLayer.remove();
  }
}
