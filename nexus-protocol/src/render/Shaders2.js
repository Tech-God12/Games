// ============================================================================
// Shaders2.js
// Additional GLSL shaders and material effects: neon outline, holographic
// grid, energy shield bubble, dissolving death, scanline CRT, color grading
// LUTs, and atmospheric fog/rain. Merged into the ShaderLibrary on load.
// ============================================================================

const FULLSCREEN_VERT = `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

// --- Neon outline (object-space fresnel rim) ---
export const NeonOutlineShader = {
  uniforms: { time: { value: 0 }, color: { value: [0.16, 0.9, 1.0] }, power: { value: 3.0 }, intensity: { value: 1.5 } },
  vertexShader: `varying vec3 vNormal; varying vec3 vView; void main() { vec4 mv = modelViewMatrix * vec4(position, 1.0); vNormal = normalize(normalMatrix * normal); vView = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`,
  fragmentShader: `uniform float time; uniform vec3 color; uniform float power; uniform float intensity; varying vec3 vNormal; varying vec3 vView;
    void main() { float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), power); float pulse = sin(time * 4.0) * 0.5 + 0.5; gl_FragColor = vec4(color * (fres + pulse * 0.15) * intensity, fres); }`,
  transparent: true, blending: 'additive',
};

// --- Holographic grid (material) ---
export const HoloGridShader = {
  uniforms: { time: { value: 0 }, color: { value: [0.16, 0.9, 1.0] }, scale: { value: 16.0 }, opacity: { value: 0.7 } },
  vertexShader: `varying vec2 vUv; varying vec3 vNormal; void main() { vUv = uv; vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: `uniform float time; uniform vec3 color; uniform float scale; uniform float opacity; varying vec2 vUv; varying vec3 vNormal;
    void main() { vec2 g = fract(vUv * scale); float line = smoothstep(0.96, 1.0, max(g.x, g.y)) + smoothstep(0.0, 0.04, min(g.x, g.y)); float scan = sin(vUv.y * 80.0 + time * 4.0) * 0.5 + 0.5; float fres = pow(1.0 - abs(vNormal.z), 1.5); vec3 col = color * (line * 0.6 + scan * 0.2 + fres * 0.4); gl_FragColor = vec4(col, opacity * (line + fres)); }`,
  transparent: true, blending: 'additive', side: 'double',
};

// --- Energy shield bubble (pulsing fresnel sphere) ---
export const ShieldBubbleShader = {
  uniforms: { time: { value: 0 }, color: { value: [0.16, 0.9, 1.0] }, hit: { value: 0 }, opacity: { value: 0.4 } },
  vertexShader: `varying vec3 vNormal; varying vec3 vView; void main() { vec4 mv = modelViewMatrix * vec4(position, 1.0); vNormal = normalize(normalMatrix * normal); vView = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`,
  fragmentShader: `uniform float time; uniform vec3 color; uniform float hit; uniform float opacity; varying vec3 vNormal; varying vec3 vView;
    void main() { float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.5); float pulse = sin(time * 3.0) * 0.5 + 0.5; float hex = sin(vView.x * 20.0) * sin(vView.y * 20.0) * 0.5 + 0.5; vec3 col = color * (fres + pulse * 0.15 + hit * 1.5) + vec3(hex * 0.1); gl_FragColor = vec4(col, opacity * (fres + hit * 0.5)); }`,
  transparent: true, blending: 'additive', side: 'double',
};

// --- Dissolving death (noise-based alpha burn) ---
export const DissolveDeathShader = {
  uniforms: { time: { value: 0 }, progress: { value: 0 }, edge: { value: [1.0, 0.6, 0.2] }, scale: { value: 10.0 } },
  vertexShader: `varying vec2 vUv; varying vec3 vPos; void main() { vUv = uv; vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: `uniform float time; uniform float progress; uniform vec3 edge; uniform float scale; varying vec2 vUv; varying vec3 vPos;
    float hash(vec3 p) { return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453); }
    float noise(vec3 p) { vec3 i = floor(p); vec3 f = fract(p); f = f*f*(3.0-2.0*f); return mix(mix(mix(hash(i), hash(i+vec3(1,0,0)), f.x), mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), f.x), f.y), mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), f.x), mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), f.x), f.y), f.z); }
    void main() { float n = noise(vPos * scale + time * 0.3); float d = smoothstep(progress, progress + 0.12, n); if (d < 0.01) discard; float e = smoothstep(progress - 0.06, progress, n); gl_FragColor = vec4(mix(edge, vec3(1.0), e), d); }`,
  transparent: true,
};

// --- Color grade LUT (cinematic teal-orange) ---
export const TealOrangeShader = {
  uniforms: { tDiffuse: { value: null }, intensity: { value: 0.6 } },
  vertexShader: FULLSCREEN_VERT,
  fragmentShader: `uniform sampler2D tDiffuse; uniform float intensity; varying vec2 vUv;
    void main() { vec4 c = texture2D(tDiffuse, vUv); vec3 shadow = vec3(0.05, 0.12, 0.18); vec3 high = vec3(1.0, 0.85, 0.6); float l = dot(c.rgb, vec3(0.299, 0.587, 0.114)); vec3 graded = mix(shadow, high, smoothstep(0.0, 1.0, l)); c.rgb = mix(c.rgb, graded * c.rgb * 2.0, intensity); gl_FragColor = c; }`,
};

// --- Atmospheric fog (depth-based) ---
export const FogShader = {
  uniforms: { tDiffuse: { value: null }, fogColor: { value: [0.02, 0.03, 0.05] }, fogDensity: { value: 0.6 }, near: { value: 10.0 }, far: { value: 60.0 } },
  vertexShader: FULLSCREEN_VERT,
  fragmentShader: `uniform sampler2D tDiffuse; uniform vec3 fogColor; uniform float fogDensity; uniform float near; uniform float far; varying vec2 vUv;
    void main() { vec4 c = texture2D(tDiffuse, vUv); float depth = clamp((far - near) / max(far - near, 0.001), 0.0, 1.0); float f = pow(depth, fogDensity); c.rgb = mix(c.rgb, fogColor, f * 0.5); gl_FragColor = c; }`,
};

// --- Rain (animated streaks overlay) ---
export const RainShader = {
  uniforms: { tDiffuse: { value: null }, time: { value: 0 }, density: { value: 0.3 }, color: { value: [0.6, 0.8, 1.0] } },
  vertexShader: FULLSCREEN_VERT,
  fragmentShader: `uniform sampler2D tDiffuse; uniform float time; uniform float density; uniform vec3 color; varying vec2 vUv;
    float rand(vec2 co) { return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453); }
    void main() { vec4 c = texture2D(tDiffuse, vUv); vec2 uv = vUv; float streak = 0.0; for (int i = 0; i < 4; i++) { float fi = float(i); vec2 p = uv * vec2(40.0, 4.0) + vec2(fi * 13.0, -time * (2.0 + fi)); p.x = fract(p.x); float r = rand(vec2(fi, floor(p.y))); if (r < density) { float d = abs(fract(p.x) - 0.5); streak += smoothstep(0.45, 0.5, 0.5 - d) * 0.3; } } c.rgb += color * streak * 0.15; gl_FragColor = c; }`,
};

// --- Snow (drifting flakes overlay) ---
export const SnowShader = {
  uniforms: { tDiffuse: { value: null }, time: { value: 0 }, density: { value: 0.4 }, color: { value: [1.0, 1.0, 1.0] } },
  vertexShader: FULLSCREEN_VERT,
  fragmentShader: `uniform sampler2D tDiffuse; uniform float time; uniform float density; uniform vec3 color; varying vec2 vUv;
    float rand(vec2 co) { return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453); }
    void main() { vec4 c = texture2D(tDiffuse, vUv); float flake = 0.0; for (int i = 0; i < 5; i++) { float fi = float(i); vec2 p = vUv * vec2(20.0, 20.0) + vec2(sin(time * 0.5 + fi) * 0.1, -time * (0.5 + fi * 0.2)); p = fract(p); float r = rand(vec2(fi, floor(p.y * 20.0))); if (r < density) { float d = length(p - 0.5); flake += smoothstep(0.4, 0.5, 0.5 - d) * 0.4; } } c.rgb += color * flake * 0.2; gl_FragColor = c; }`,
};

// --- Embers (rising sparks for inferno biome) ---
export const EmberShader = {
  uniforms: { tDiffuse: { value: null }, time: { value: 0 }, density: { value: 0.5 }, color: { value: [1.0, 0.4, 0.1] } },
  vertexShader: FULLSCREEN_VERT,
  fragmentShader: `uniform sampler2D tDiffuse; uniform float time; uniform float density; uniform vec3 color; varying vec2 vUv;
    float rand(vec2 co) { return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453); }
    void main() { vec4 c = texture2D(tDiffuse, vUv); float e = 0.0; for (int i = 0; i < 4; i++) { float fi = float(i); vec2 p = vUv * vec2(15.0, 8.0) + vec2(sin(time + fi) * 0.2, time * (0.8 + fi * 0.3)); p = fract(p); float r = rand(vec2(fi, floor(p.y * 8.0))); if (r < density) { float d = length(p - 0.5); e += smoothstep(0.4, 0.5, 0.5 - d) * 0.5; } } c.rgb += color * e * 0.25; gl_FragColor = c; }`,
};

// --- Damage flash (red vignette pulse on hit) ---
export const DamageFlashShader = {
  uniforms: { tDiffuse: { value: null }, strength: { value: 0 }, color: { value: [1.0, 0.15, 0.2] } },
  vertexShader: FULLSCREEN_VERT,
  fragmentShader: `uniform sampler2D tDiffuse; uniform float strength; uniform vec3 color; varying vec2 vUv;
    void main() { vec4 c = texture2D(tDiffuse, vUv); float d = distance(vUv, vec2(0.5)); float vig = smoothstep(0.3, 0.9, d); c.rgb = mix(c.rgb, c.rgb * (1.0 - color * strength), vig * strength); c.rgb += color * strength * vig * 0.5; gl_FragColor = c; }`,
};

// --- Low-health pulse (red edge pulse when HP is low) ---
export const LowHealthShader = {
  uniforms: { tDiffuse: { value: null }, time: { value: 0 }, strength: { value: 0 }, color: { value: [1.0, 0.1, 0.15] } },
  vertexShader: FULLSCREEN_VERT,
  fragmentShader: `uniform sampler2D tDiffuse; uniform float time; uniform float strength; uniform vec3 color; varying vec2 vUv;
    void main() { vec4 c = texture2D(tDiffuse, vUv); float d = distance(vUv, vec2(0.5)); float pulse = sin(time * 4.0) * 0.5 + 0.5; float vig = smoothstep(0.35, 0.85, d); c.rgb += color * vig * pulse * strength * 0.6; gl_FragColor = c; }`,
};

// --- install into the base library ---
export function installExtraShaders(baseModule) {
  baseModule.ShaderLibrary.neonOutline = NeonOutlineShader;
  baseModule.ShaderLibrary.holoGrid = HoloGridShader;
  baseModule.ShaderLibrary.shieldBubble = ShieldBubbleShader;
  baseModule.ShaderLibrary.dissolveDeath = DissolveDeathShader;
  baseModule.ShaderLibrary.tealOrange = TealOrangeShader;
  baseModule.ShaderLibrary.fog = FogShader;
  baseModule.ShaderLibrary.rain = RainShader;
  baseModule.ShaderLibrary.snow = SnowShader;
  baseModule.ShaderLibrary.embers = EmberShader;
  baseModule.ShaderLibrary.damageFlash = DamageFlashShader;
  baseModule.ShaderLibrary.lowHealth = LowHealthShader;
}

export const ExtraShaderCount = 11;
