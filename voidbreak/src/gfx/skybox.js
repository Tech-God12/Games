/**
 * VOIDBREAK — Skybox.
 *
 * Procedural sky rendered as a fullscreen triangle: the fragment shader
 * reconstructs the view ray from the inverse view-projection and shades a
 * gradient sky with sun disc, stars and a nebula, then blends toward the
 * scene fog color at the horizon.
 */

import { ShaderProgram } from './program.js';
import { FULLSCREEN_VERT } from './shaderlib.js';
import { Vec3 } from '../core/vec3.js';

export const SKY_FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
uniform mat4 uInvViewProj;
uniform vec3 uCameraPos;
uniform vec3 uZenith;
uniform vec3 uHorizon;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform float uSunIntensity;
uniform float uStarIntensity;
uniform float uNebulaIntensity;
uniform vec3 uNebulaColor;
uniform float uFogFactor;
out vec4 outColor;

vec2 hash22(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise2(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash22(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
        dot(hash22(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash22(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(hash22(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y
  );
}

void main() {
  vec4 ndc = vec4(vUv * 2.0 - 1.0, 1.0, 1.0);
  vec4 dirWorld = uInvViewProj * ndc;
  vec3 dir = normalize(dirWorld.xyz / dirWorld.w - uCameraPos);

  float h = clamp(dir.y, -1.0, 1.0);
  float t = pow(max(h, 0.0), 0.55);

  vec3 sky = mix(uHorizon, uZenith, t);

  float sd = max(dot(dir, uSunDir), 0.0);
  float sunDisc = smoothstep(0.99945, 0.9997, sd);
  float sunGlow = pow(sd, 220.0) * 0.9 + pow(sd, 16.0) * 0.25;
  sky += uSunColor * uSunIntensity * (sunDisc * 3.0 + sunGlow);

  if (dir.y > 0.02) {
    float neb = noise2(dir.xz * 3.0 + vec2(1.7, 4.2)) * 0.5
              + noise2(dir.xz * 6.0 - vec2(3.1, 1.9)) * 0.25;
    neb = clamp(neb * 0.5 + 0.5, 0.0, 1.0);
    sky += uNebulaColor * uNebulaIntensity * neb * dir.y;
  }

  if (uStarIntensity > 0.001 && dir.y > 0.0) {
    vec2 sp = dir.xz / max(dir.y, 0.02) * 2.2;
    vec2 cell = floor(sp);
    vec2 f = fract(sp) - 0.5;
    vec2 hsh = hash22(cell);
    float star = smoothstep(0.18, 0.02, length(f));
    float twinkle = 0.6 + 0.4 * sin(hsh.x * 30.0);
    float mask = step(0.94, hsh.y * 0.5 + 0.5) * star * twinkle;
    sky += vec3(1.0) * mask * uStarIntensity * (0.25 + 0.75 * dir.y);
  }

  float horizonMask = pow(1.0 - abs(dir.y), 3.0);
  sky = mix(sky, uHorizon * 0.85 + uSunColor * 0.12, horizonMask * uFogFactor);

  outColor = vec4(sky, 1.0);
}
`;

export class Skybox {
  constructor(gl, camera) {
    this.gl = gl;
    this.camera = camera;
    this.program = new ShaderProgram(gl, FULLSCREEN_VERT, SKY_FRAG, null, 'skybox');
    this.vao = gl.raw.createVertexArray();
    this.visible = true;

    this.zenith = new Vec3(0.015, 0.02, 0.06);
    this.horizon = new Vec3(0.08, 0.09, 0.16);
    this.sunDir = new Vec3(0.5, 0.8, 0.3).normalize();
    this.sunColor = new Vec3(1.0, 0.9, 0.75);
    this.sunIntensity = 1.6;
    this.starIntensity = 0.8;
    this.nebulaIntensity = 0.5;
    this.nebulaColor = new Vec3(0.3, 0.15, 0.5);
    this.fogFactor = 0.85;
  }

  setEnv(env) {
    if (env.zenith) this.zenith.copy(env.zenith);
    if (env.horizon) this.horizon.copy(env.horizon);
    if (env.sunDir) this.sunDir.copy(env.sunDir).normalize();
    if (env.sunColor) this.sunColor.copy(env.sunColor);
    this.sunIntensity = env.sunIntensity ?? this.sunIntensity;
    this.starIntensity = env.starIntensity ?? this.starIntensity;
    this.nebulaIntensity = env.nebulaIntensity ?? this.nebulaIntensity;
    if (env.nebulaColor) this.nebulaColor.copy(env.nebulaColor);
    this.fogFactor = env.fogFactor ?? this.fogFactor;
  }

  /** Draw the sky (call with depth test on, depth write off, after clearing). */
  draw() {
    if (!this.visible) return;
    const g = this.gl.raw;
    const invVP = this.camera.viewInvMatrix;

    g.depthMask(false);
    g.disable(g.CULL_FACE);
    const P = this.program;
    P.use();
    P.setMat4('uInvViewProj', invVP);
    P.setVec3('uCameraPos', this.camera.position);
    P.setVec3('uZenith', this.zenith);
    P.setVec3('uHorizon', this.horizon);
    P.setVec3('uSunDir', this.sunDir);
    P.setVec3('uSunColor', this.sunColor);
    P.set1f('uSunIntensity', this.sunIntensity);
    P.set1f('uStarIntensity', this.starIntensity);
    P.set1f('uNebulaIntensity', this.nebulaIntensity);
    P.setVec3('uNebulaColor', this.nebulaColor);
    P.set1f('uFogFactor', this.fogFactor);
    g.bindVertexArray(this.vao);
    g.drawArrays(g.TRIANGLES, 0, 3);
    g.bindVertexArray(null);
    g.enable(g.CULL_FACE);
    g.depthMask(true);
  }

  dispose() {
    this.program.dispose();
  }
}
