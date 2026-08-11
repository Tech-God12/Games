// ============================================================================
// RenderSyncSystem.js
// Bridges logical state to THREE objects: copies Body position into MeshRef,
// applies Facing yaw, handles billboarding (sprites facing the camera), glow
// pulses, and hit-flash material tinting. Runs late, in the Render phase.
// ============================================================================

import * as THREE from 'three';
import { System, Phase } from '../ecs/System.js';
import { Body, Facing } from '../ecs/components/Body.js';
import { MeshRef, GlowPulse, HitFlash, Trail } from '../ecs/components/Render.js';
import { lerp } from '../core/MathUtils.js';

const _camPos = new THREE.Vector3();

export class RenderSyncSystem extends System {
  constructor() {
    super({ query: { any: ['MeshRef', 'GlowPulse', 'HitFlash', 'Trail'] }, priority: Phase.Render });
    this.camera = null;
    this._elapsed = 0;
  }

  update(dt, sdt) {
    if (!this.query) return;
    this._elapsed += dt;
    const cam = this.camera;
    if (cam) _camPos.copy(cam.position);
    this.query.forEach((e) => {
      const meshRef = e.get(MeshRef.type);
      if (meshRef && meshRef.object) {
        const obj = meshRef.object;
        if (meshRef.syncTransform) {
          const body = e.get(Body.type);
          if (body) {
            obj.position.set(body.pos.x, body.pos.y, body.pos.z);
          }
        }
        if (meshRef.syncFacing) {
          const facing = e.get(Facing.type);
          if (facing) obj.rotation.y = facing.yaw;
        }
        if (meshRef.billboard && cam) {
          obj.lookAt(_camPos.x, _camPos.y, _camPos.z);
        }
      }
      const glow = e.get(GlowPulse.type);
      if (glow && meshRef && meshRef.object) {
        meshRef.object.traverse((o) => {
          if (o.material && o.material.emissive) {
            const v = glow.base + Math.sin(this._elapsed * glow.speed + glow.phase) * glow.amplitude;
            o.material.emissiveIntensity = v;
          }
        });
      }
      const flash = e.get(HitFlash.type);
      if (flash) {
        flash.time += dt;
        if (flash.time >= flash.duration) {
          e.remove(HitFlash.type);
          // restore emissive handled by base materials (they keep their own)
        } else {
          const t = 1 - flash.time / flash.duration;
          if (meshRef && meshRef.object) {
            meshRef.object.traverse((o) => {
              if (o.material && o.material.emissive) {
                o.material.emissive.setHex(flash.color);
                o.material.emissiveIntensity = flash.intensity * t * 3 + (o.material._baseEmissiveIntensity || 1);
              }
            });
          }
        }
      }
    });
  }
}
