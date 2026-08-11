/**
 * VOIDBREAK — ViewModel.
 *
 * First-person weapon rendering: a procedural gun built from primitives per
 * weapon archetype, attached to the camera. Handles position/sway/bob, ADS
 * alignment, reload animation, muzzle flash and weapon-switch transitions.
 */

import { Mesh } from '../../gfx/mesh.js';
import { buildBox } from '../../gfx/geometry_builders.js';
import { Material } from '../../gfx/material.js';
import { RenderObject } from '../../gfx/scene.js';
import { Quat } from '../../core/quat.js';
import { Vec3 } from '../../core/vec3.js';
import { damp, lerp, clamp01 } from '../../core/math.js';
import { Color } from '../../core/color.js';

const MESH_CACHE = new Map();
function mesh(gl, key, builder) {
  if (!MESH_CACHE.has(key)) {
    MESH_CACHE.set(key, new Mesh(gl, builder(), {}));
  }
  return MESH_CACHE.get(key);
}

const _q = new Quat();
const _p = new Vec3();

export class ViewModel {
  /**
   * @param {import('../../gfx/gl.js').GL} gl
   * @param {import('../../gfx/scene.js').Scene} scene
   */
  constructor(gl, scene, opts = {}) {
    this.gl = gl;
    this.scene = scene;
    this.camera = opts.camera;
    this.parts = [];
    this.visible = true;
    this.currentWeapon = null;

    this.pos = new Vec3(0.28, -0.24, -0.55);
    this.posTarget = this.pos.clone();
    this.rot = new Quat().identity();
    this.reloadAnim = 0;
    this.switchAnim = 0;
    this.muzzleTimer = 0;
    this.kick = 0;
    this.ads = 0;
    this.bobX = 0;
    this.bobY = 0;
    this.swayX = 0;
    this.swayY = 0;
    this._muzzle = new Vec3(0, 0, -0.9);
  }

  /** Rebuild the mesh parts for a weapon definition. */
  setWeapon(def) {
    this.clear();
    this.currentWeapon = def;
    if (!def) return;
    const gl = this.gl;

    const dark = new Color(0.13, 0.15, 0.2, 1);
    const dark2 = new Color(0.09, 0.10, 0.14, 1);
    const accent = new Color(0.16, 0.55, 0.75, 1);
    const metal = new Color(0.25, 0.26, 0.3, 1);

    const matBody = new Material({ color: dark, metalness: 0.35, roughness: 0.6, castShadow: false });
    const matDark = new Material({ color: dark2, metalness: 0.3, roughness: 0.7, castShadow: false });
    const matMetal = new Material({ color: metal, metalness: 0.7, roughness: 0.35, castShadow: false });
    const matAccent = new Material({ color: accent, metalness: 0.5, roughness: 0.4, emissive: new Color(0.1, 0.3, 0.4, 0.35), castShadow: false });
    const matGlow = new Material({ color: new Color(0, 0, 0, 1), emissive: new Color(1, 0.7, 0.25, 2.2), unlit: true, blend: 'additive', castShadow: false });

    const add = (key, pos, scale, mat, rotDeg = 0) => {
      const m = mesh(gl, key, () => buildBox());
      const obj = new RenderObject(m, mat, { castShadow: false, boundsRadius: 2 });
      obj.position.copy(pos);
      obj.scale.copy(scale);
      if (rotDeg !== 0) {
        obj.quaternion.setFromAxisAngle({ x: 0, y: 0, z: 1 }, rotDeg * Math.PI / 180);
      }
      obj.visible = this.visible;
      this.scene.addDynamic(obj);
      this.parts.push(obj);
      return obj;
    };

    const kind = def.kind;

    if (kind === 'melee') {
      add('axe_handle', new Vec3(0, 0, -0.35), new Vec3(0.06, 0.06, 0.5), matDark);
      add('axe_grip', new Vec3(0, -0.05, -0.12), new Vec3(0.07, 0.09, 0.18), matMetal);
      const head = add('axe_head', new Vec3(0, 0.06, -0.62), new Vec3(0.22, 0.3, 0.06), matMetal);
      head.quaternion.setFromAxisAngle({ x: 1, y: 0, z: 0 }, Math.PI / 2);
      add('axe_edge', new Vec3(0, 0.06, -0.68), new Vec3(0.2, 0.06, 0.1), matGlow);
      this._muzzle = new Vec3(0, 0.06, -0.7);
    } else if (kind === 'grenade') {
      add('launcher_body', new Vec3(0, 0, -0.3), new Vec3(0.14, 0.16, 0.35), matBody);
      add('launcher_barrel', new Vec3(0, 0.02, -0.62), new Vec3(0.16, 0.16, 0.4), matDark);
      add('launcher_barrel2', new Vec3(0, 0.02, -0.85), new Vec3(0.14, 0.14, 0.12), matMetal);
      add('launcher_grip', new Vec3(0, -0.16, -0.1), new Vec3(0.08, 0.14, 0.2), matDark);
      add('launcher_stock', new Vec3(0, -0.05, 0.12), new Vec3(0.1, 0.12, 0.25), matDark);
      add('launcher_sight', new Vec3(0, 0.1, -0.4), new Vec3(0.04, 0.06, 0.14), matMetal);
      this._muzzle = new Vec3(0, 0.02, -0.92);
    } else if (kind === 'beam') {
      add('beam_body', new Vec3(0, 0, -0.3), new Vec3(0.1, 0.14, 0.4), matBody);
      add('beam_emitter', new Vec3(0, 0, -0.75), new Vec3(0.08, 0.1, 0.4), matDark);
      add('beam_coil', new Vec3(0, 0, -0.72), new Vec3(0.12, 0.13, 0.18), matGlow);
      add('beam_grip', new Vec3(0, -0.14, -0.15), new Vec3(0.07, 0.1, 0.16), matDark);
      add('beam_cell', new Vec3(0, -0.1, -0.55), new Vec3(0.1, 0.12, 0.1), matAccent);
      this._muzzle = new Vec3(0, 0, -0.98);
    } else if (kind === 'charge') {
      add('charge_body', new Vec3(0, 0, -0.25), new Vec3(0.13, 0.16, 0.3), matBody);
      add('charge_barrel', new Vec3(0, 0.03, -0.7), new Vec3(0.09, 0.11, 0.5), matDark);
      add('charge_cap', new Vec3(0, 0.03, -0.98), new Vec3(0.1, 0.12, 0.1), matMetal);
      add('charge_capacitor', new Vec3(0, -0.04, -0.55), new Vec3(0.12, 0.16, 0.14), matAccent);
      add('charge_grip', new Vec3(0, -0.17, -0.12), new Vec3(0.08, 0.12, 0.16), matDark);
      this._muzzle = new Vec3(0, 0.03, -1.05);
    } else {
      const isPistol = def.magSize <= 14 && kind === 'hitscan';
      const isSmg = def.fireRate >= 13;
      const isShotgun = def.pellets > 4;
      const isSniper = def.range >= 130;
      const barrelLen = isPistol ? 0.28 : isSmg ? 0.35 : isShotgun ? 0.42 : isSniper ? 0.5 : 0.45;
      const bodyLen = isPistol ? 0.22 : 0.34;

      add('body', new Vec3(0, 0.01, -0.25), new Vec3(isPistol ? 0.07 : 0.1, isPistol ? 0.1 : 0.13, bodyLen), matBody);
      add('barrel', new Vec3(0, 0.02, -0.25 - bodyLen / 2 - barrelLen / 2 + 0.05), new Vec3(0.055, 0.055, barrelLen), matDark);
      add('barrel_tip', new Vec3(0, 0.02, -0.25 - bodyLen / 2 - barrelLen + 0.03), new Vec3(0.07, 0.07, 0.08), matMetal);
      this._muzzle = new Vec3(0, 0.02, -0.25 - bodyLen / 2 - barrelLen - 0.02);
      add('grip', new Vec3(0, -0.14, -0.18), new Vec3(0.06, 0.16, 0.1), matDark);
      add('mag', new Vec3(0, -0.22, -0.2), new Vec3(0.06, isPistol ? 0.14 : isSmg ? 0.2 : 0.18, 0.12), matDark);
      if (!isPistol) {
        add('sight', new Vec3(0, 0.09, -0.3), new Vec3(0.04, 0.07, 0.12), matMetal);
        add('sight_tip', new Vec3(0, 0.11, -0.38), new Vec3(0.03, 0.03, 0.05), matAccent);
        add('stock', new Vec3(0, -0.02, -0.25 - bodyLen / 2 - 0.12), new Vec3(0.07, 0.09, 0.22), matBody);
      }
      if (isShotgun || def.id === 'twinfang') {
        add('foregrip', new Vec3(0, -0.1, -0.45), new Vec3(0.06, 0.08, 0.2), matDark);
      }
    }

    this.posTarget.set(
      def.kind === 'melee' ? 0.2 : 0.3,
      -0.22 - (def.kind === 'melee' ? 0.1 : def.kind === 'grenade' ? 0.03 : 0),
      -0.5 - (def.kind === 'charge' || def.kind === 'grenade' ? 0.1 : 0),
    );
  }

  clear() {
    for (const obj of this.parts) {
      this.scene.remove(obj);
    }
    this.parts.length = 0;
  }

  /**
   * Per-frame update. `weapon` is the active weapon instance.
   */
  update(dt, weapon, state = {}) {
    if (!this.visible) {
      for (const obj of this.parts) obj.visible = false;
      return;
    }
    const cam = this.camera;
    const p = cam.position;
    const fwd = cam.forward;
    const right = cam.right;
    const up = cam.up;

    const ads = state.ads ?? weapon?.ads ?? 0;
    const targetPos = lerp(this.posTarget.x, 0, ads);
    const targetPosY = lerp(this.posTarget.y, -0.13, ads);
    const targetPosZ = lerp(this.posTarget.z, -0.42, ads);
    this.pos.x = damp(this.pos.x, targetPos + state.bobX * 0.5, 14, dt);
    this.pos.y = damp(this.pos.y, targetPosY + state.bobY * 0.6, 14, dt);
    this.pos.z = damp(this.pos.z, targetPosZ, 14, dt);

    this.kick = damp(this.kick, state.recoilPitch ?? 0, 10, dt);

    if (weapon?.reloading) {
      const t = weapon.reloadProgress;
      const drop = Math.sin(Math.min(1, t * 3) * Math.PI);
      this.pos.y += drop * 0.16;
      this.pos.z += drop * 0.18;
      this.reloadAnim = t;
    } else {
      this.reloadAnim = 0;
    }

    if (weapon?.owner?.switching) {
      const st = clamp01(weapon.owner.switchTimer / 0.28);
      this.pos.y -= st * 0.3;
      this.pos.z += st * 0.25;
    }

    const melee = state.meleeAnim ?? 0;
    if (melee > 0) {
      const swing = Math.sin(melee * Math.PI);
      this.rot.setFromAxisAngle({ x: 1, y: 0, z: 0 }, -swing * 1.3);
      this.pos.x += swing * 0.35;
      this.pos.z -= swing * 0.2;
    } else {
      this.rot.identity();
    }

    this.muzzleTimer = Math.max(0, this.muzzleTimer - dt);
    if (weapon?.muzzleFlashTimer > 0) {
      this.muzzleTimer = weapon.muzzleFlashTimer;
    }

    _p.copy(p)
      .addScaled(right, this.pos.x)
      .addScaled(up, this.pos.y + this.kick * 0.01)
      .addScaled(fwd, this.pos.z + this.kick * 0.02);

    const kickPitch = this.kick * 0.001 + (state.pitchKick ?? 0) * 0.004;
    _q.setFromEulerYXZ(
      cam.rotation.yaw + this.kick * 0.002,
      cam.rotation.pitch + kickPitch,
      0,
    );

    for (const obj of this.parts) {
      obj.visible = true;
      obj.copyPosition(_p);
      obj.setQuaternion(_q);
    }
  }

  /** World position of the muzzle (for flashes/tracers). */
  muzzleWorldPos(out = new Vec3()) {
    const cam = this.camera;
    return out.copy(cam.position)
      .addScaled(cam.right, this.pos.x)
      .addScaled(cam.up, this.pos.y)
      .addScaled(cam.forward, this.pos.z - 0.7);
  }

  setVisible(v) {
    this.visible = v;
  }

  destroy() {
    this.clear();
  }
}
