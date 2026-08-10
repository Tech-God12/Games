/**
 * VOIDBREAK — GLSL 300 es shader sources.
 *
 * All rendering shaders live here as template strings. The pipeline:
 *
 *   depth       → directional shadow map pass
 *   main        → lit geometry (Blinn-Phong + shadows + fog + rim)
 *   unlit       → skybox / glow geometry
 *   particle    → instanced billboard particles (additive / alpha)
 *   decal       → projected surface decals
 *   fullscreen  → post chain: bright → blur → composite (+vignette, grade, grain, FXAA)
 */

export const FULLSCREEN_VERT = `#version 300 es
precision highp float;
out vec2 vUv;
void main() {
  vec2 pos = vec2(
    (gl_VertexID == 1) ? 3.0 : -1.0,
    (gl_VertexID == 2) ? 3.0 : -1.0
  );
  vUv = pos * 0.5 + 0.5;
  gl_Position = vec4(pos, 0.0, 1.0);
}
`;

export const DEPTH_VERT = `#version 300 es
precision highp float;
layout(location=0) in vec3 aPosition;
uniform mat4 uModel;
uniform mat4 uViewProj;
void main() {
  gl_Position = uViewProj * uModel * vec4(aPosition, 1.0);
}
`;

export const DEPTH_FRAG = `#version 300 es
precision highp float;
void main() {
  // Depth is written automatically; nothing else needed.
}
`;

export const MAIN_VERT = `#version 300 es
precision highp float;
layout(location=0) in vec3 aPosition;
layout(location=1) in vec3 aNormal;
layout(location=2) in vec2 aUv;
layout(location=3) in vec4 aColor;

uniform mat4 uModel;
uniform mat4 uViewProj;
uniform mat3 uNormalMat;

out vec3 vWorldPos;
out vec3 vNormal;
out vec2 vUv;
out vec4 vColor;

void main() {
  vec4 world = uModel * vec4(aPosition, 1.0);
  vWorldPos = world.xyz;
  vNormal = uNormalMat * aNormal;
  vUv = aUv;
  vColor = aColor;
  gl_Position = uViewProj * world;
}
`;

export const MAIN_FRAG = `#version 300 es
precision highp float;

in vec3 vWorldPos;
in vec3 vNormal;
in vec2 vUv;
in vec4 vColor;

uniform vec3 uCameraPos;
uniform vec3 uFogColor;
uniform float uFogNear;
uniform float uFogFar;
uniform float uTime;

uniform vec4 uColor;
uniform vec4 uEmissive;
uniform float uMetalness;
uniform float uRoughness;
uniform float uAlphaTest;
uniform float uRimPower;
uniform float uRimStrength;

uniform sampler2D uTex;
uniform float uHasTex;
uniform sampler2D uEmissiveTex;
uniform float uHasEmissiveTex;
uniform float uVertexColorBlend;

uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform float uSunIntensity;
uniform float uShadowEnabled;
uniform sampler2D uShadowMap;
uniform mat4 uShadowMatrix;
uniform vec2 uShadowTexel;
uniform float uShadowBias;

#define MAX_POINT_LIGHTS 4
uniform vec3 uPointPos[MAX_POINT_LIGHTS];
uniform vec3 uPointColor[MAX_POINT_LIGHTS];
uniform float uPointRange[MAX_POINT_LIGHTS];
uniform float uPointIntensity[MAX_POINT_LIGHTS];
uniform int uPointCount;

out vec4 outColor;

float sampleShadow(vec3 shadowCoord) {
  if (shadowCoord.x < 0.0 || shadowCoord.x > 1.0 ||
      shadowCoord.y < 0.0 || shadowCoord.y > 1.0 ||
      shadowCoord.z > 1.0) {
    return 1.0;
  }
  float shadow = 0.0;
  for (int x = -1; x <= 1; x++) {
    for (int y = -1; y <= 1; y++) {
      vec2 off = vec2(float(x), float(y)) * uShadowTexel;
      float depth = texture(uShadowMap, shadowCoord.xy + off).r;
      shadow += (shadowCoord.z - uShadowBias) <= depth ? 1.0 : 0.0;
    }
  }
  return shadow / 9.0;
}

float distributionBlinnPhong(float ndoth, float roughness) {
  float a = max(roughness, 0.02);
  float a2 = a * a;
  float ndoth2 = ndoth * ndoth;
  return (1.0 / (3.14159265 * a2)) * pow(ndoth2, max(1.0 / a2 - 1.0, 0.01));
}

void main() {
  vec4 base = uColor * vColor;
  if (uHasTex > 0.5) base *= texture(uTex, vUv);
  if (uVertexColorBlend > 0.5) {
    base.rgb *= vColor.rgb;
  }
  if (uAlphaTest > 0.0 && base.a < uAlphaTest) discard;

  vec3 N = normalize(vNormal);
  vec3 V = normalize(uCameraPos - vWorldPos);
  vec3 L = normalize(uSunDir);

  float ndl = max(dot(N, L), 0.0);
  float ambient = 0.22;
  vec3 diffuse = uSunColor * uSunIntensity * ndl;

  float shadow = 1.0;
  if (uShadowEnabled > 0.5) {
    vec4 shadowCoord = uShadowMatrix * vec4(vWorldPos, 1.0);
    shadowCoord.xyz /= shadowCoord.w;
    shadowCoord.xyz = shadowCoord.xyz * 0.5 + 0.5;
    shadow = sampleShadow(shadowCoord.xyz);
    diffuse *= mix(0.35, 1.0, shadow);
  }

  vec3 H = normalize(V + L);
  float ndoth = max(dot(N, H), 0.0);
  float spec = distributionBlinnPhong(ndoth, uRoughness);
  spec *= pow(max(dot(N, L), 0.0), 1.0);
  float specMask = mix(0.04, 0.9, uMetalness);
  vec3 specColor = mix(vec3(1.0), base.rgb, uMetalness);

  vec3 color = base.rgb * (ambient + diffuse * shadow) + specColor * spec * specMask * uSunIntensity * shadow;

  for (int i = 0; i < MAX_POINT_LIGHTS; i++) {
    if (i >= uPointCount) break;
    vec3 toL = uPointPos[i] - vWorldPos;
    float dist2 = dot(toL, toL);
    float range = uPointRange[i];
    if (dist2 > range * range) continue;
    vec3 Lp = normalize(toL);
    float att = 1.0 - smoothstep(0.0, range, sqrt(dist2));
    float ndlp = max(dot(N, Lp), 0.0);
    color += uPointColor[i] * uPointIntensity[i] * att * ndlp * base.rgb;
  }

  vec3 emissive = uEmissive.rgb * uEmissive.a;
  if (uHasEmissiveTex > 0.5) {
    emissive += texture(uEmissiveTex, vUv).rgb * uEmissive.a;
  }
  color += emissive;

  if (uRimPower > 0.0) {
    float fres = pow(1.0 - max(dot(N, V), 0.0), uRimPower);
    color += vec3(1.0) * fres * uRimStrength * (0.4 + 0.6 * ndl);
  }

  float dist = distance(uCameraPos, vWorldPos);
  float fog = smoothstep(uFogNear, uFogFar, dist);
  color = mix(color, uFogColor, fog);

  outColor = vec4(color, base.a);
}
`;

export const UNLIT_VERT = `#version 300 es
precision highp float;
layout(location=0) in vec3 aPosition;
layout(location=1) in vec3 aNormal;
layout(location=2) in vec2 aUv;
layout(location=3) in vec4 aColor;

uniform mat4 uModel;
uniform mat4 uViewProj;

out vec3 vWorldPos;
out vec2 vUv;
out vec4 vColor;
out vec3 vNormal;

void main() {
  vec4 world = uModel * vec4(aPosition, 1.0);
  vWorldPos = world.xyz;
  vUv = aUv;
  vColor = aColor;
  vNormal = aNormal;
  gl_Position = uViewProj * world;
}
`;

export const UNLIT_FRAG = `#version 300 es
precision highp float;

in vec3 vWorldPos;
in vec2 vUv;
in vec4 vColor;
in vec3 vNormal;

uniform vec4 uColor;
uniform sampler2D uTex;
uniform float uHasTex;
uniform vec3 uFogColor;
uniform float uFogNear;
uniform float uFogFar;
uniform vec3 uCameraPos;
uniform float uAdditive;

out vec4 outColor;

void main() {
  vec4 base = uColor * vColor;
  if (uHasTex > 0.5) base *= texture(uTex, vUv);
  if (uAdditive < 0.5) {
    float dist = distance(uCameraPos, vWorldPos);
    float fog = smoothstep(uFogNear, uFogFar, dist);
    base.rgb = mix(base.rgb, uFogColor, fog);
  }
  outColor = base;
}
`;

export const PARTICLE_VERT = `#version 300 es
precision highp float;
layout(location=0) in vec2 aCorner;
layout(location=1) in vec3 aCenter;
layout(location=2) in vec4 aColor;
layout(location=3) in float aSize;
layout(location=4) in float aRotation;
layout(location=5) in float aFade;

uniform mat4 uViewProj;
uniform vec3 uRight;
uniform vec3 uUp;

out vec4 vColor;
out vec2 vUv;
out float vFade;

void main() {
  float c = cos(aRotation);
  float s = sin(aRotation);
  vec2 rc = vec2(aCorner.x * c - aCorner.y * s, aCorner.x * s + aCorner.y * c);
  vec3 world = aCenter + uRight * (rc.x * aSize) + uUp * (rc.y * aSize);
  vColor = aColor;
  vUv = aCorner * 0.5 + 0.5;
  vFade = aFade;
  gl_Position = uViewProj * vec4(world, 1.0);
}
`;

export const PARTICLE_FRAG = `#version 300 es
precision highp float;

in vec4 vColor;
in vec2 vUv;
in float vFade;

uniform sampler2D uTex;
uniform float uSoft;

out vec4 outColor;

void main() {
  vec4 tex = texture(uTex, vUv);
  float alpha = tex.a * vColor.a;
  if (alpha < 0.003) discard;
  outColor = vec4(tex.rgb * vColor.rgb, alpha);
}
`;

export const DECAL_VERT = `#version 300 es
precision highp float;
layout(location=0) in vec3 aPosition;
layout(location=1) in vec3 aNormal;
layout(location=2) in vec2 aUv;
layout(location=3) in vec4 aColor;

uniform mat4 uModel;
uniform mat4 uViewProj;

out vec2 vUv;
out vec4 vColor;

void main() {
  vUv = aUv;
  vColor = aColor;
  gl_Position = uViewProj * uModel * vec4(aPosition, 1.0);
}
`;

export const DECAL_FRAG = `#version 300 es
precision highp float;

in vec2 vUv;
in vec4 vColor;

uniform sampler2D uTex;

out vec4 outColor;

void main() {
  vec4 tex = texture(uTex, vUv);
  outColor = vec4(vColor.rgb, tex.a * vColor.a);
  if (outColor.a < 0.01) discard;
}
`;

// ------------------------------------------------------------- post chain

export const BRIGHT_FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uTex;
uniform float uThreshold;
out vec4 outColor;
void main() {
  vec3 c = texture(uTex, vUv).rgb;
  float luma = dot(c, vec3(0.2126, 0.7152, 0.0722));
  float t = max(luma - uThreshold, 0.0);
  outColor = vec4(c * (t / max(luma, 0.0001)), 1.0);
}
`;

export const BLUR_FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uDirection;
uniform vec2 uTexelSize;
out vec4 outColor;
void main() {
  vec4 sum = vec4(0.0);
  float weights[5] = float[](0.227027, 0.1945946, 0.1216216, 0.054054, 0.016216);
  vec2 step = uDirection * uTexelSize;
  sum += texture(uTex, vUv) * weights[0];
  for (int i = 1; i < 5; i++) {
    float w = weights[i];
    sum += texture(uTex, vUv + step * float(i)) * w;
    sum += texture(uTex, vUv - step * float(i)) * w;
  }
  outColor = vec4(sum.rgb, 1.0);
}
`;

export const COMPOSITE_FRAG = `#version 300 es
precision highp float;
in vec2 vUv;

uniform sampler2D uScene;
uniform sampler2D uBloom;
uniform float uBloomStrength;
uniform float uTime;

uniform float uVignette;
uniform float uSaturation;
uniform float uContrast;
uniform vec3 uGradeTint;
uniform vec3 uColorblindMat0;
uniform vec3 uColorblindMat1;
uniform vec3 uColorblindMat2;
uniform float uGrain;
uniform float uScanlines;
uniform float uChromatic;
uniform float uDamageFlash;
uniform float uLowHp;
uniform vec2 uResolution;
uniform float uExposure;

out vec4 outColor;

void main() {
  vec3 col = texture(uScene, vUv).rgb * uExposure;

  vec3 bloom = texture(uBloom, vUv).rgb;
  col += bloom * uBloomStrength;

  col = mix(col, col + vec3(0.55, 0.05, 0.05), clamp(uDamageFlash, 0.0, 1.0) * 0.85);
  float pulse = 0.5 + 0.5 * sin(uTime * 5.0);
  col = mix(col, col + vec3(0.4, 0.0, 0.0), uLowHp * pulse * 0.35);

  col *= uGradeTint;
  col = mix(vec3(dot(col, vec3(0.2126, 0.7152, 0.0722))), col, uSaturation);
  col = (col - 0.5) * uContrast + 0.5;

  col = vec3(
    dot(uColorblindMat0, col),
    dot(uColorblindMat1, col),
    dot(uColorblindMat2, col)
  );

  vec2 q = vUv - 0.5;
  float vig = 1.0 - dot(q, q) * 1.7 * uVignette;
  col *= max(vig, 0.0);

  if (uChromatic > 0.001) {
    float amount = uChromatic * 0.0025;
    vec2 dir = q;
    float r = texture(uScene, vUv + dir * amount).r;
    float b = texture(uScene, vUv - dir * amount).b;
    col.r = mix(col.r, r, 0.5);
    col.b = mix(col.b, b, 0.5);
  }

  if (uGrain > 0.001) {
    float g = fract(sin(dot(vUv * uResolution + vec2(uTime * 40.0), vec2(12.9898, 78.233))) * 43758.5453);
    col += (g - 0.5) * uGrain * 0.12;
  }

  if (uScanlines > 0.001) {
    float sl = 0.5 + 0.5 * sin(vUv.y * uResolution.y * 1.0);
    col *= 1.0 - uScanlines * 0.08 * sl;
  }

  outColor = vec4(col, 1.0);
}
`;

export const FXAA_FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uTexelSize;
out vec4 outColor;

void main() {
  vec3 rgbNW = texture(uTex, vUv + vec2(-1.0, -1.0) * uTexelSize).rgb;
  vec3 rgbNE = texture(uTex, vUv + vec2(1.0, -1.0) * uTexelSize).rgb;
  vec3 rgbSW = texture(uTex, vUv + vec2(-1.0, 1.0) * uTexelSize).rgb;
  vec3 rgbSE = texture(uTex, vUv + vec2(1.0, 1.0) * uTexelSize).rgb;
  vec3 rgbM = texture(uTex, vUv).rgb;

  vec3 luma = vec3(0.299, 0.587, 0.114);
  float lumaNW = dot(rgbNW, luma);
  float lumaNE = dot(rgbNE, luma);
  float lumaSW = dot(rgbSW, luma);
  float lumaSE = dot(rgbSE, luma);
  float lumaM = dot(rgbM, luma);

  float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));
  float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));

  vec2 dir;
  dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));
  dir.y = ((lumaNW + lumaSW) - (lumaNE + lumaSE));

  float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) * 0.25 * 0.0833, 0.0078125);
  float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);
  dir = min(vec2(8.0), max(vec2(-8.0), dir * rcpDirMin)) * uTexelSize;

  vec3 rgbA = 0.5 * (texture(uTex, vUv + dir * (1.0 / 3.0 - 0.5)).rgb +
                     texture(uTex, vUv + dir * (2.0 / 3.0 - 0.5)).rgb);
  vec3 rgbB = rgbA * 0.5 + 0.25 * (texture(uTex, vUv + dir * -0.5).rgb +
                                   texture(uTex, vUv + dir * 0.5).rgb);

  float lumaB = dot(rgbB, luma);
  if ((lumaB < lumaMin) || (lumaB > lumaMax)) {
    outColor = vec4(rgbA, 1.0);
  } else {
    outColor = vec4(rgbB, 1.0);
  }
}
`;
