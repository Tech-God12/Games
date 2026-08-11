// ============================================================================
// ParticleSystem.js
// High-throughput additive particle renderer built on THREE.Points with a
// custom shader. CPU-driven for flexible behaviors (gravity, drag, color &
// size curves, attractors) while the GPU handles point-sprite shading. A
// fixed-capacity ring buffer keeps allocation out of the hot path.
// ============================================================================

import * as THREE from 'three';

const VERT = `
  attribute float aSize;
  attribute float aAlpha;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vColor = aColor;
    vAlpha = aAlpha;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (300.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = `
  varying vec3 vColor;
  varying float vAlpha;
  uniform sampler2D uTex;
  void main() {
    vec4 tex = texture2D(uTex, gl_PointCoord);
    gl_FragColor = vec4(vColor, vAlpha) * tex;
    if (gl_FragColor.a <= 0.01) discard;
  }
`;

export class ParticleSystem {
  constructor(scene, capacity = 4000, texture = null) {
    this.scene = scene;
    this.capacity = capacity;
    this.cursor = 0;

    this.positions = new Float32Array(capacity * 3);
    this.colors = new Float32Array(capacity * 3);
    this.sizes = new Float32Array(capacity);
    this.alphas = new Float32Array(capacity);

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute('aColor', new THREE.BufferAttribute(this.colors, 3));
    this.geometry.setAttribute('aSize', new THREE.BufferAttribute(this.sizes, 1));
    this.geometry.setAttribute('aAlpha', new THREE.BufferAttribute(this.alphas, 1));
    this.geometry.setDrawRange(0, capacity);
    this.geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);

    this.material = new THREE.ShaderMaterial({
      uniforms: { uTex: { value: texture } },
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.points = new THREE.Points(this.geometry, this.material);
    this.points.frustumCulled = false;
    scene.add(this.points);

    // particle data arrays
    this.px = new Float32Array(capacity);
    this.py = new Float32Array(capacity);
    this.pz = new Float32Array(capacity);
    this.vx = new Float32Array(capacity);
    this.vy = new Float32Array(capacity);
    this.vz = new Float32Array(capacity);
    this.life = new Float32Array(capacity);
    this.maxLife = new Float32Array(capacity);
    this.sizeStart = new Float32Array(capacity);
    this.sizeEnd = new Float32Array(capacity);
    this.alphaStart = new Float32Array(capacity);
    this.alphaEnd = new Float32Array(capacity);
    this.r0 = new Float32Array(capacity); this.g0 = new Float32Array(capacity); this.b0 = new Float32Array(capacity);
    this.r1 = new Float32Array(capacity); this.g1 = new Float32Array(capacity); this.b1 = new Float32Array(capacity);
    this.gravity = new Float32Array(capacity);
    this.drag = new Float32Array(capacity);
    this.active = new Uint8Array(capacity);
    this.count = 0;
    this._tmpColor = new THREE.Color();
  }

  /**
   * Emit one particle.
   * @param {Object} o options
   */
  emit(o) {
    const i = this.cursor;
    this.cursor = (this.cursor + 1) % this.capacity;
    this.px[i] = o.x || 0; this.py[i] = o.y || 0; this.pz[i] = o.z || 0;
    this.vx[i] = o.vx || 0; this.vy[i] = o.vy || 0; this.vz[i] = o.vz || 0;
    const life = o.life || 1;
    this.life[i] = life; this.maxLife[i] = life;
    this.sizeStart[i] = o.sizeStart != null ? o.sizeStart : (o.size || 4);
    this.sizeEnd[i] = o.sizeEnd != null ? o.sizeEnd : 0;
    this.alphaStart[i] = o.alphaStart != null ? o.alphaStart : 1;
    this.alphaEnd[i] = o.alphaEnd != null ? o.alphaEnd : 0;
    const c0 = this._tmpColor.setHex(o.colorStart != null ? o.colorStart : (o.color || 0xffffff));
    this.r0[i] = c0.r; this.g0[i] = c0.g; this.b0[i] = c0.b;
    if (o.colorEnd != null) {
      const c1 = new THREE.Color(o.colorEnd);
      this.r1[i] = c1.r; this.g1[i] = c1.g; this.b1[i] = c1.b;
    } else { this.r1[i] = c0.r; this.g1[i] = c0.g; this.b1[i] = c0.b; }
    this.gravity[i] = o.gravity != null ? o.gravity : 0;
    this.drag[i] = o.drag != null ? o.drag : 0;
    this.active[i] = 1;
    this.count++;
  }

  /** Emit a burst of `n` particles using a generator fn(index). */
  burst(n, gen) {
    for (let k = 0; k < n; k++) this.emit(gen(k, n));
  }

  update(dt) {
    const cap = this.capacity;
    let alive = 0;
    for (let i = 0; i < cap; i++) {
      if (!this.active[i]) { continue; }
      let life = this.life[i] - dt;
      if (life <= 0) { this.active[i] = 0; this.alphas[i] = 0; this.sizes[i] = 0; continue; }
      this.life[i] = life;
      // integrate
      const drag = this.drag[i];
      if (drag > 0) {
        const f = Math.max(0, 1 - drag * dt);
        this.vx[i] *= f; this.vy[i] *= f; this.vz[i] *= f;
      }
      this.vy[i] -= this.gravity[i] * dt;
      this.px[i] += this.vx[i] * dt;
      this.py[i] += this.vy[i] * dt;
      this.pz[i] += this.vz[i] * dt;
      // interpolate
      const t = 1 - life / this.maxLife[i];
      const i3 = i * 3;
      this.positions[i3] = this.px[i];
      this.positions[i3 + 1] = this.py[i];
      this.positions[i3 + 2] = this.pz[i];
      this.colors[i3] = this.r0[i] + (this.r1[i] - this.r0[i]) * t;
      this.colors[i3 + 1] = this.g0[i] + (this.g1[i] - this.g0[i]) * t;
      this.colors[i3 + 2] = this.b0[i] + (this.b1[i] - this.b0[i]) * t;
      this.sizes[i] = this.sizeStart[i] + (this.sizeEnd[i] - this.sizeStart[i]) * t;
      this.alphas[i] = this.alphaStart[i] + (this.alphaEnd[i] - this.alphaStart[i]) * t;
      alive++;
    }
    this.count = alive;
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.aColor.needsUpdate = true;
    this.geometry.attributes.aSize.needsUpdate = true;
    this.geometry.attributes.aAlpha.needsUpdate = true;
  }

  get aliveCount() { return this.count; }

  dispose() {
    this.scene.remove(this.points);
    this.geometry.dispose();
    this.material.dispose();
  }
}
