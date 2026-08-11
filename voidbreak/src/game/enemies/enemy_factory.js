/**
 * VOIDBREAK — Enemy visual factory.
 *
 * Builds the procedural models (composite boxes/cones/spheres) for every
 * enemy archetype, with named parts the archetypes can animate: legs, arms,
 * head, eye, wings (drone), shield (shieldbearer), core (bosses).
 */

import { Model } from '../../gfx/model.js';
import { RenderObject } from '../../gfx/scene.js';
import { Mesh } from '../../gfx/mesh.js';
import { Material } from '../../gfx/material.js';
import { buildBox, buildCone, buildCylinder, buildIcosphere } from '../../gfx/geometry_builders.js';
import { Color } from '../../core/color.js';
import { Vec3 } from '../../core/vec3.js';

const _cache = new Map();
function getMesh(gl, key, builder) {
  if (!_cache.has(key)) {
    _cache.set(key, new Mesh(gl, builder()));
  }
  return _cache.get(key);
}

class PartBuilder {
  constructor(gl) {
    this.gl = gl;
  }

  box(key, w, h, d, mat) {
    return {
      key, mat,
      geom: () => getMesh(this.gl, `box_${key}`, () => buildBox(0.5, 0.5, 0.5)),
      scale: new Vec3(w, h, d),
    };
  }

  cone(key, r, h, mat) {
    return {
      key, mat,
      geom: () => getMesh(this.gl, `cone_${key}`, () => buildCone(r, h, 10, { cap: true })),
      scale: new Vec3(1, 1, 1),
    };
  }

  cyl(key, r, h, mat) {
    return {
      key, mat,
      geom: () => getMesh(this.gl, `cyl_${key}`, () => buildCylinder(r, h, 10, { caps: true })),
      scale: new Vec3(1, 1, 1),
    };
  }

  sphere(key, r, mat, detail = 1) {
    return {
      key, mat,
      geom: () => getMesh(this.gl, `sph_${key}_${detail}`, () => buildIcosphere(r, detail)),
      scale: new Vec3(1, 1, 1),
    };
  }
}

export class EnemyFactory {
  /**
   * @param {import('../../gfx/gl.js').GL} gl
   * @param {import('../../gfx/scene.js').Scene} scene
   */
  constructor(gl, scene) {
    this.gl = gl;
    this.scene = scene;
    this.b = new PartBuilder(gl);
  }

  /** Build a model for an enemy def; returns {model, parts} with named parts. */
  build(def, enemy) {
    const model = new Model(this.gl, { name: `enemy_${def.id}` });
    const P = (name, spec, pos) => {
      const obj = new RenderObject(spec.geom(), spec.mat, { castShadow: true, boundsRadius: 2 });
      model.addPart(name, obj, { position: pos ?? new Vec3(0, 0, 0) });
      return model.get(name);
    };

    const palette = {
      body: new Material({ color: def.color ?? '#5a7a9a', metalness: 0.3, roughness: 0.65, rimPower: 3, rimStrength: 0.35 }),
      dark: new Material({ color: '#1a2028', metalness: 0.2, roughness: 0.8 }),
      eye: new Material({ color: new Color(0, 0, 0, 1), emissive: new Color(1, 0.6, 0.2, 2.4), unlit: true, blend: 'additive' }),
      glow: new Material({ color: new Color(0, 0, 0, 1), emissive: new Color(1, 0.7, 0.3, 1.8), unlit: true, blend: 'additive' }),
      shield: new Material({ color: new Color(0.1, 0.2, 0.35, 0.45), emissive: new Color(0.2, 0.5, 0.9, 0.7), alpha: 0.55, blend: 'alpha', doubleSided: true }),
    };

    const h = def.height ?? 1.6;
    const r = def.radius ?? 0.45;

    switch (def.visual) {
      case 'runner': {
        P('body', this.b.box('rn_body', r * 1.5, h * 0.5, r * 0.8, palette.body), new Vec3(0, h * 0.45, 0));
        P('head', this.b.box('rn_head', r * 0.9, h * 0.22, r * 0.9, palette.body), new Vec3(0, h * 0.85, 0));
        P('eye', this.b.sphere('rn_eye', r * 0.18, palette.eye, 1), new Vec3(0, h * 0.88, -r * 0.5));
        P('legL', this.b.box('rn_leg', r * 0.28, h * 0.35, r * 0.28, palette.dark), new Vec3(-r * 0.35, h * 0.12, 0));
        P('legR', this.b.box('rn_leg2', r * 0.28, h * 0.35, r * 0.28, palette.dark), new Vec3(r * 0.35, h * 0.12, 0));
        P('armL', this.b.box('rn_arm', r * 0.2, h * 0.3, r * 0.2, palette.dark), new Vec3(-r * 0.75, h * 0.5, 0));
        P('armR', this.b.box('rn_arm2', r * 0.2, h * 0.3, r * 0.2, palette.dark), new Vec3(r * 0.75, h * 0.5, 0));
        break;
      }
      case 'shooter': {
        P('body', this.b.box('sh_body', r * 1.6, h * 0.45, r * 1.0, palette.body), new Vec3(0, h * 0.48, 0));
        P('head', this.b.box('sh_head', r * 1.0, h * 0.25, r * 1.0, palette.body), new Vec3(0, h * 0.85, 0));
        P('eye', this.b.sphere('sh_eye', r * 0.2, palette.eye, 1), new Vec3(0, h * 0.88, -r * 0.55));
        P('gun', this.b.box('sh_gun', r * 0.3, r * 0.3, r * 1.6, palette.dark), new Vec3(0, h * 0.72, -r * 1.2));
        P('legL', this.b.box('sh_leg', r * 0.3, h * 0.38, r * 0.3, palette.dark), new Vec3(-r * 0.4, h * 0.1, 0));
        P('legR', this.b.box('sh_leg2', r * 0.3, h * 0.38, r * 0.3, palette.dark), new Vec3(r * 0.4, h * 0.1, 0));
        break;
      }
      case 'spitter': {
        P('body', this.b.box('sp_body', r * 1.8, h * 0.5, r * 1.2, palette.body), new Vec3(0, h * 0.5, 0));
        P('head', this.b.box('sp_head', r * 1.1, h * 0.22, r * 1.1, palette.body), new Vec3(0, h * 0.82, 0));
        P('eye', this.b.sphere('sp_eye', r * 0.22, palette.glow, 1), new Vec3(0, h * 0.85, -r * 0.6));
        P('maw', this.b.cone('sp_maw', r * 0.35, r * 0.6, palette.dark), new Vec3(0, h * 0.78, -r * 1.1));
        P('sack', this.b.sphere('sp_sack', r * 0.55, palette.glow, 2), new Vec3(0, h * 0.3, r * 0.7));
        P('legL', this.b.box('sp_leg', r * 0.24, h * 0.35, r * 0.24, palette.dark), new Vec3(-r * 0.55, h * 0.1, 0));
        P('legR', this.b.box('sp_leg2', r * 0.24, h * 0.35, r * 0.24, palette.dark), new Vec3(r * 0.55, h * 0.1, 0));
        break;
      }
      case 'brute': {
        P('body', this.b.box('br_body', r * 1.9, h * 0.55, r * 1.3, palette.body), new Vec3(0, h * 0.5, 0));
        P('chest', this.b.box('br_chest', r * 1.6, h * 0.35, r * 1.1, palette.dark), new Vec3(0, h * 0.72, 0));
        P('head', this.b.box('br_head', r * 1.1, h * 0.2, r * 1.1, palette.body), new Vec3(0, h * 0.92, 0));
        P('eye', this.b.sphere('br_eye', r * 0.25, palette.eye, 1), new Vec3(0, h * 0.95, -r * 0.6));
        P('armL', this.b.box('br_arm', r * 0.45, h * 0.75, r * 0.45, palette.dark), new Vec3(-r * 1.3, h * 0.55, 0));
        P('armR', this.b.box('br_arm2', r * 0.45, h * 0.75, r * 0.45, palette.dark), new Vec3(r * 1.3, h * 0.55, 0));
        P('fistL', this.b.sphere('br_fist', r * 0.4, palette.body, 1), new Vec3(-r * 1.3, h * 0.2, 0));
        P('fistR', this.b.sphere('br_fist2', r * 0.4, palette.body, 1), new Vec3(r * 1.3, h * 0.2, 0));
        P('legL', this.b.box('br_leg', r * 0.5, h * 0.4, r * 0.5, palette.dark), new Vec3(-r * 0.5, h * 0.1, 0));
        P('legR', this.b.box('br_leg2', r * 0.5, h * 0.4, r * 0.5, palette.dark), new Vec3(r * 0.5, h * 0.1, 0));
        break;
      }
      case 'shieldbearer': {
        P('body', this.b.box('sb_body', r * 1.6, h * 0.5, r * 1.0, palette.body), new Vec3(0, h * 0.5, 0));
        P('head', this.b.box('sb_head', r * 0.95, h * 0.24, r * 0.95, palette.body), new Vec3(0, h * 0.86, 0));
        P('eye', this.b.sphere('sb_eye', r * 0.18, palette.eye, 1), new Vec3(0, h * 0.88, -r * 0.5));
        P('shield', this.b.box('sb_shield', r * 1.9, h * 0.95, r * 0.22, palette.shield), new Vec3(0, h * 0.55, -r * 0.9));
        P('arm', this.b.box('sb_arm', r * 0.25, h * 0.4, r * 0.25, palette.dark), new Vec3(0, h * 0.5, -r * 0.35));
        P('legL', this.b.box('sb_leg', r * 0.3, h * 0.4, r * 0.3, palette.dark), new Vec3(-r * 0.4, h * 0.1, 0));
        P('legR', this.b.box('sb_leg2', r * 0.3, h * 0.4, r * 0.3, palette.dark), new Vec3(r * 0.4, h * 0.1, 0));
        break;
      }
      case 'drone': {
        P('core', this.b.sphere('dr_core', r * 0.8, palette.body, 2), new Vec3(0, 0, 0));
        P('eye', this.b.sphere('dr_eye', r * 0.3, palette.eye, 1), new Vec3(0, 0, -r * 0.8));
        P('ring', this.b.cyl('dr_ring', r * 1.15, 0.12, palette.dark), new Vec3(0, 0, 0));
        P('wingL', this.b.box('dr_wing', r * 1.2, 0.08, r * 0.6, palette.dark), new Vec3(-r * 1.2, 0.05, 0));
        P('wingR', this.b.box('dr_wing2', r * 1.2, 0.08, r * 0.6, palette.dark), new Vec3(r * 1.2, 0.05, 0));
        P('glowU', this.b.sphere('dr_glow', r * 0.2, palette.glow, 1), new Vec3(0, r * 0.7, 0));
        P('glowD', this.b.sphere('dr_glow2', r * 0.2, palette.glow, 1), new Vec3(0, -r * 0.7, 0));
        break;
      }
      case 'swarmling': {
        P('body', this.b.sphere('sw_body', r * 1.0, palette.body, 1), new Vec3(0, h * 0.5, 0));
        P('eye', this.b.sphere('sw_eye', r * 0.3, palette.eye, 1), new Vec3(0, h * 0.55, -r * 0.8));
        P('legL', this.b.box('sw_leg', r * 0.18, h * 0.25, r * 0.18, palette.dark), new Vec3(-r * 0.5, h * 0.12, 0));
        P('legR', this.b.box('sw_leg2', r * 0.18, h * 0.25, r * 0.18, palette.dark), new Vec3(r * 0.5, h * 0.12, 0));
        break;
      }
      case 'summoner': {
        P('body', this.b.box('su_body', r * 1.4, h * 0.5, r * 1.0, palette.body), new Vec3(0, h * 0.5, 0));
        P('head', this.b.box('su_head', r * 0.85, h * 0.25, r * 0.85, palette.body), new Vec3(0, h * 0.9, 0));
        P('eye', this.b.sphere('su_eye', r * 0.2, palette.eye, 1), new Vec3(0, h * 0.93, -r * 0.5));
        P('robeL', this.b.box('su_robe', r * 0.9, h * 0.3, r * 0.9, palette.dark), new Vec3(-r * 0.4, h * 0.15, 0));
        P('robeR', this.b.box('su_robe2', r * 0.9, h * 0.3, r * 0.9, palette.dark), new Vec3(r * 0.4, h * 0.15, 0));
        P('orb', this.b.sphere('su_orb', r * 0.35, palette.glow, 2), new Vec3(0, h * 0.95, 0));
        break;
      }
      case 'elite': {
        P('body', this.b.box('el_body', r * 1.7, h * 0.5, r * 1.0, palette.body), new Vec3(0, h * 0.48, 0));
        P('head', this.b.cone('el_head', r * 0.8, h * 0.5, palette.body), new Vec3(0, h * 0.95, 0));
        P('eye', this.b.sphere('el_eye', r * 0.22, palette.eye, 1), new Vec3(0, h * 0.9, -r * 0.4));
        P('armL', this.b.box('el_arm', r * 0.3, h * 0.4, r * 0.3, palette.dark), new Vec3(-r * 0.9, h * 0.55, 0));
        P('armR', this.b.box('el_arm2', r * 0.3, h * 0.4, r * 0.3, palette.dark), new Vec3(r * 0.9, h * 0.55, 0));
        P('legL', this.b.box('el_leg', r * 0.32, h * 0.4, r * 0.32, palette.dark), new Vec3(-r * 0.45, h * 0.1, 0));
        P('legR', this.b.box('el_leg2', r * 0.32, h * 0.4, r * 0.32, palette.dark), new Vec3(r * 0.45, h * 0.1, 0));
        P('mark', this.b.sphere('el_mark', r * 0.18, palette.glow, 1), new Vec3(0, h * 0.4, 0));
        if (def.id === 'elite_shooter') {
          P('gun', this.b.box('el_gun', r * 0.3, r * 0.3, r * 1.8, palette.dark), new Vec3(0, h * 0.7, -r * 1.2));
        }
        break;
      }
      case 'grunt':
      default: {
        P('body', this.b.box('gr_body', r * 1.6, h * 0.48, r * 0.9, palette.body), new Vec3(0, h * 0.46, 0));
        P('head', this.b.box('gr_head', r * 0.95, h * 0.26, r * 0.95, palette.body), new Vec3(0, h * 0.86, 0));
        P('eye', this.b.sphere('gr_eye', r * 0.18, palette.eye, 1), new Vec3(0, h * 0.89, -r * 0.5));
        P('legL', this.b.box('gr_leg', r * 0.3, h * 0.38, r * 0.3, palette.dark), new Vec3(-r * 0.4, h * 0.1, 0));
        P('legR', this.b.box('gr_leg2', r * 0.3, h * 0.38, r * 0.3, palette.dark), new Vec3(r * 0.4, h * 0.1, 0));
        P('armL', this.b.box('gr_arm', r * 0.22, h * 0.32, r * 0.22, palette.dark), new Vec3(-r * 0.85, h * 0.48, 0));
        P('armR', this.b.box('gr_arm2', r * 0.22, h * 0.32, r * 0.22, palette.dark), new Vec3(r * 0.85, h * 0.48, 0));
        break;
      }
    }

    model.setScale(def.modelScale ?? 1, def.modelScale ?? 1, def.modelScale ?? 1);
    return model;
  }

  /** Animate an enemy's model parts by archetype (called in syncVisual). */
  animate(enemy, dt) {
    const model = enemy.model;
    if (!model) return;
    const def = enemy.def;
    const phase = enemy.animPhase;
    const moving = Math.hypot(enemy.velocity.x, enemy.velocity.z) > 0.4;

    const swing = (name, amp, speed = 1, offset = 0) => {
      const part = model.get(name);
      if (part) {
        const rot = Math.sin(phase * speed + offset) * amp * (moving ? 1 : 0.2);
        part.setQuaternion((part.quaternion.identity()).multiplyAxisAngle({ x: 1, y: 0, z: 0 }, rot));
      }
    };

    swing('legL', 0.5, 1.6);
    swing('legR', 0.5, 1.6);
    if (def.attackStyle === 'melee') {
      swing('armL', 0.35, 1.2);
      swing('armR', 0.35, 1.2);
    }
    if (def.flying) {
      const part = model.get('core');
      if (part) {
        part.position.y = Math.sin(phase * 0.8) * 0.15;
        part.quaternion.identity().multiplyAxisAngle({ x: 0, y: 0, z: 1 }, Math.sin(phase * 0.5) * 0.12);
      }
      swing('wingL', 0.25, 6);
      swing('wingR', 0.25, 6);
    }
    if (def.id === 'summoner') {
      const orb = model.get('orb');
      if (orb) {
        const s = 1 + Math.sin(phase * 2.5) * 0.15;
        orb.setScale(s, s, s);
      }
    }
    void dt;
  }
}
