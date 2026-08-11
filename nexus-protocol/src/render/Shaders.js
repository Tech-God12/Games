// ============================================================================
// Shaders.js
// A library of reusable GLSL shaders and post-processing pass definitions:
// scanlines, CRT, glitch, chromatic aberration, vignette, pixelate, hologram,
// dissolve, force-field/fresnel, heat haze, grid pulse, and outline. Each is
// exported as { name, uniforms, vertexShader, fragmentShader } ready to wrap
// in a THREE.ShaderPass or use as a material. Keeps all GLSL in one place.
// ============================================================================

const FULLSCREEN_VERT = `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;

// --- Scanlines (CRT horizontal lines) ---
export const ScanlineShader = {
  uniforms: { tDiffuse: { value: null }, intensity: { value: 0.35 }, count: { value: 480.0 }, time: { value: 0 } },
  vertexShader: FULLSCREEN_VERT,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float intensity; uniform float count; uniform float time;
    varying vec2 vUv;
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      float line = sin(vUv.y * count + time * 2.0) * 0.5 + 0.5;
      c.rgb *= 1.0 - intensity * (1.0 - line);
      gl_FragColor = c;
    }`,
};

// --- CRT curvature + vignette ---
export const CRTShader = {
  uniforms: { tDiffuse: { value: null }, curvature: { value: 0.1 }, vignette: { value: 0.6 }, scan: { value: 0.18 } },
  vertexShader: FULLSCREEN_VERT,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float curvature; uniform float vignette; uniform float scan;
    varying vec2 vUv;
    vec2 curve(vec2 uv) {
      uv = uv * 2.0 - 1.0;
      vec2 off = uv.yx * curvature;
      uv += uv * off * off;
      return uv * 0.5 + 0.5;
    }
    void main() {
      vec2 uv = curve(vUv);
      if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) { gl_FragColor = vec4(0.0); return; }
      vec4 c = texture2D(tDiffuse, uv);
      c.rgb *= 1.0 - scan * (sin(vUv.y * 800.0) * 0.5 + 0.5);
      float d = distance(vUv, vec2(0.5));
      c.rgb *= 1.0 - smoothstep(0.4, 0.85, d) * vignette;
      gl_FragColor = c;
    }`,
};

// --- Glitch (random horizontal slices + color split) ---
export const GlitchShader = {
  uniforms: { tDiffuse: { value: null }, strength: { value: 0.4 }, time: { value: 0 }, active: { value: 0 } },
  vertexShader: FULLSCREEN_VERT,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float strength; uniform float time; uniform float active;
    varying vec2 vUv;
    float rand(vec2 co) { return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453); }
    void main() {
      vec2 uv = vUv;
      float t = floor(time * 12.0);
      float slice = step(0.92, rand(vec2(t, floor(uv.y * 30.0))));
      uv.x += slice * strength * (rand(vec2(t, uv.y)) - 0.5) * active;
      float split = strength * 0.01 * active;
      vec4 c = texture2D(tDiffuse, uv);
      c.r = texture2D(tDiffuse, uv + vec2(split, 0.0)).r;
      c.b = texture2D(tDiffuse, uv - vec2(split, 0.0)).b;
      gl_FragColor = c;
    }`,
};

// --- Chromatic aberration ---
export const ChromaticShader = {
  uniforms: { tDiffuse: { value: null }, amount: { value: 0.003 } },
  vertexShader: FULLSCREEN_VERT,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float amount; varying vec2 vUv;
    void main() {
      vec2 dir = vUv - 0.5;
      gl_FragColor.r = texture2D(tDiffuse, vUv + dir * amount).r;
      gl_FragColor.g = texture2D(tDiffuse, vUv).g;
      gl_FragColor.b = texture2D(tDiffuse, vUv - dir * amount).b;
      gl_FragColor.a = 1.0;
    }`,
};

// --- Vignette ---
export const VignetteShader = {
  uniforms: { tDiffuse: { value: null }, intensity: { value: 0.8 }, softness: { value: 0.5 } },
  vertexShader: FULLSCREEN_VERT,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float intensity; uniform float softness; varying vec2 vUv;
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      float d = distance(vUv, vec2(0.5));
      c.rgb *= 1.0 - smoothstep(softness, 0.9, d) * intensity;
      gl_FragColor = c;
    }`,
};

// --- Pixelate ---
export const PixelateShader = {
  uniforms: { tDiffuse: { value: null }, pixels: { value: 320.0 } },
  vertexShader: FULLSCREEN_VERT,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float pixels; varying vec2 vUv;
    void main() {
      vec2 size = vec2(pixels, pixels * (1.0/1.0));
      vec2 uv = floor(vUv * size) / size;
      gl_FragColor = texture2D(tDiffuse, uv);
    }`,
};

// --- Color grade (lift/gamma/gain-ish) ---
export const GradeShader = {
  uniforms: { tDiffuse: { value: null }, tint: { value: [1.0, 1.0, 1.0] }, saturation: { value: 1.1 }, contrast: { value: 1.08 }, brightness: { value: 1.0 } },
  vertexShader: FULLSCREEN_VERT,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform vec3 tint; uniform float saturation; uniform float contrast; uniform float brightness;
    varying vec2 vUv;
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      c.rgb *= tint;
      float l = dot(c.rgb, vec3(0.299, 0.587, 0.114));
      c.rgb = mix(vec3(l), c.rgb, saturation);
      c.rgb = (c.rgb - 0.5) * contrast + 0.5;
      c.rgb *= brightness;
      gl_FragColor = c;
    }`,
};

// --- Hologram (scan + flicker + tint) for material use ---
export const HologramShader = {
  uniforms: { time: { value: 0 }, color: { value: [0.16, 0.9, 1.0] }, opacity: { value: 0.8 } },
  vertexShader: `varying vec2 vUv; varying vec3 vNormal; void main() { vUv = uv; vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: `
    uniform float time; uniform vec3 color; uniform float opacity; varying vec2 vUv; varying vec3 vNormal;
    void main() {
      float scan = sin(vUv.y * 80.0 + time * 4.0) * 0.5 + 0.5;
      float flick = 0.85 + 0.15 * sin(time * 30.0);
      float fres = pow(1.0 - abs(vNormal.z), 1.5);
      vec3 col = color * (0.4 + scan * 0.6) * flick;
      col += color * fres;
      gl_FragColor = vec4(col, opacity * (0.5 + fres * 0.5));
    }`,
};

// --- Dissolve (noise-based alpha cutoff) ---
export const DissolveShader = {
  uniforms: { time: { value: 0 }, progress: { value: 0 }, edgeColor: { value: [1.0, 0.6, 0.2] }, scale: { value: 8.0 } },
  vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: `
    uniform float time; uniform float progress; uniform vec3 edgeColor; uniform float scale; varying vec2 vUv;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float noise(vec2 p) { vec2 i = floor(p); vec2 f = fract(p); f = f*f*(3.0-2.0*f);
      return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }
    void main() {
      float n = noise(vUv * scale + time * 0.2);
      float d = smoothstep(progress, progress + 0.1, n);
      if (d < 0.01) discard;
      float edge = smoothstep(progress - 0.05, progress, n);
      vec3 col = mix(edgeColor, vec3(1.0), edge);
      gl_FragColor = vec4(col, d);
    }`,
};

// --- Force field / fresnel bubble ---
export const ForceFieldShader = {
  uniforms: { time: { value: 0 }, color: { value: [0.16, 0.9, 1.0] }, power: { value: 2.0 }, opacity: { value: 0.5 } },
  vertexShader: `varying vec3 vNormal; varying vec3 vView; void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal); vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv; }`,
  fragmentShader: `
    uniform float time; uniform vec3 color; uniform float power; uniform float opacity;
    varying vec3 vNormal; varying vec3 vView;
    void main() {
      float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), power);
      float pulse = sin(time * 3.0) * 0.5 + 0.5;
      vec3 col = color * (fres + pulse * 0.2);
      gl_FragColor = vec4(col, opacity * fres);
    }`,
  transparent: true, blending: 'additive', side: 'double',
};

// --- Heat haze (UV wobble) ---
export const HeatHazeShader = {
  uniforms: { tDiffuse: { value: null }, strength: { value: 0.004 }, time: { value: 0 } },
  vertexShader: FULLSCREEN_VERT,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float strength; uniform float time; varying vec2 vUv;
    void main() {
      vec2 uv = vUv;
      uv.x += sin(uv.y * 40.0 + time * 3.0) * strength;
      uv.y += cos(uv.x * 30.0 + time * 2.0) * strength * 0.5;
      gl_FragColor = texture2D(tDiffuse, uv);
    }`,
};

// --- Grid pulse (animated grid overlay) ---
export const GridPulseShader = {
  uniforms: { tDiffuse: { value: null }, color: { value: [0.16, 0.9, 1.0] }, time: { value: 0 }, scale: { value: 24.0 }, intensity: { value: 0.08 } },
  vertexShader: FULLSCREEN_VERT,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform vec3 color; uniform float time; uniform float scale; uniform float intensity;
    varying vec2 vUv;
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      vec2 g = fract(vUv * scale);
      float line = smoothstep(0.96, 1.0, max(g.x, g.y)) + smoothstep(0.0, 0.04, min(g.x, g.y));
      float pulse = sin(time * 2.0) * 0.5 + 0.5;
      c.rgb += color * line * intensity * (0.5 + pulse * 0.5);
      gl_FragColor = c;
    }`,
};

// --- Outline (post edge detect via luminance Sobel) ---
export const OutlineShader = {
  uniforms: { tDiffuse: { value: null }, resolution: { value: [1 / 1280, 1 / 720] }, color: { value: [0.0, 0.0, 0.0] }, strength: { value: 1.0 } },
  vertexShader: FULLSCREEN_VERT,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform vec2 resolution; uniform vec3 color; uniform float strength; varying vec2 vUv;
    float l(vec2 uv) { vec4 c = texture2D(tDiffuse, uv); return dot(c.rgb, vec3(0.299, 0.587, 0.114)); }
    void main() {
      float tl = l(vUv + vec2(-1, 1) * resolution); float t = l(vUv + vec2(0, 1) * resolution); float tr = l(vUv + vec2(1, 1) * resolution);
      float ll = l(vUv + vec2(-1, 0) * resolution); float rr = l(vUv + vec2(1, 0) * resolution);
      float bl = l(vUv + vec2(-1, -1) * resolution); float b = l(vUv + vec2(0, -1) * resolution); float br = l(vUv + vec2(1, -1) * resolution);
      float gx = -tl - 2.0 * ll - bl + tr + 2.0 * rr + br;
      float gy = -tl - 2.0 * t - tr + bl + 2.0 * b + br;
      float e = clamp(length(vec2(gx, gy)) * strength, 0.0, 1.0);
      vec4 c = texture2D(tDiffuse, vUv);
      c.rgb = mix(c.rgb, color, e);
      gl_FragColor = c;
    }`,
};

// --- Dithering (Bayer 4x4 ordered) ---
export const DitherShader = {
  uniforms: { tDiffuse: { value: null }, levels: { value: 8.0 } },
  vertexShader: FULLSCREEN_VERT,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float levels; varying vec2 vUv;
    float bayer4(vec2 p) {
      int x = int(mod(p.x, 4.0)); int y = int(mod(p.y, 4.0));
      float m[16];
      return 0.0;
    }
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
      c.rgb = floor(c.rgb * levels + n + 0.5) / levels;
      gl_FragColor = c;
    }`,
};

// --- Kuwahara (painterly) — simplified ---
export const PainterlyShader = {
  uniforms: { tDiffuse: { value: null }, resolution: { value: [1 / 1280, 1 / 720] } },
  vertexShader: FULLSCREEN_VERT,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform vec2 resolution; varying vec2 vUv;
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      vec4 acc = vec4(0.0);
      for (int x = -2; x <= 2; x++) for (int y = -2; y <= 2; y++) acc += texture2D(tDiffuse, vUv + vec2(float(x), float(y)) * resolution * 2.0);
      gl_FragColor = acc / 25.0;
    }`,
};

// --- Water (animated normal-based ripple, material) ---
export const WaterShader = {
  uniforms: { time: { value: 0 }, color: { value: [0.1, 0.5, 0.7] }, opacity: { value: 0.7 } },
  vertexShader: `varying vec2 vUv; varying vec3 vNormal; void main() { vUv = uv; vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: `
    uniform float time; uniform vec3 color; uniform float opacity; varying vec2 vUv; varying vec3 vNormal;
    void main() {
      float r = sin(vUv.x * 20.0 + time * 2.0) * 0.5 + 0.5;
      float r2 = sin(vUv.y * 16.0 + time * 1.6) * 0.5 + 0.5;
      vec3 col = color + vec3(r * 0.1, r2 * 0.1, 0.2);
      gl_FragColor = vec4(col, opacity);
    }`,
  transparent: true,
};

// --- Library index ---
export const ShaderLibrary = {
  scanline: ScanlineShader, crt: CRTShader, glitch: GlitchShader, chromatic: ChromaticShader,
  vignette: VignetteShader, pixelate: PixelateShader, grade: GradeShader, hologram: HologramShader,
  dissolve: DissolveShader, forceField: ForceFieldShader, heatHaze: HeatHazeShader, gridPulse: GridPulseShader,
  outline: OutlineShader, dither: DitherShader, painterly: PainterlyShader, water: WaterShader,
};

export const ShaderNames = Object.keys(ShaderLibrary);
export const ShaderCount = ShaderNames.length;
