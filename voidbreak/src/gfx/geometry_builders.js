/**
 * VOIDBREAK — Geometry builders.
 *
 * Pure functions generating indexed geometry data for the common primitives:
 * box, plane, sphere, icosphere, cylinder, cone, capsule, torus, and utility
 * transforms. Output is consumed by Mesh.
 */

import { TAU } from '../core/constants.js';

/** Empty geometry object. */
export function createGeometry() {
  return { positions: [], normals: [], uvs: [], colors: [], indices: [] };
}

function pushVertex(geo, px, py, pz, nx, ny, nz, u, v, r = 1, g = 1, b = 1, a = 1) {
  geo.positions.push(px, py, pz);
  geo.normals.push(nx, ny, nz);
  geo.uvs.push(u, v);
  geo.colors.push(r, g, b, a);
}

function pushIndex(geo, a, b, c) {
  geo.indices.push(a, b, c);
}

/** Axis-aligned box centered at origin with half extents (sx, sy, sz). */
export function buildBox(sx = 0.5, sy = 0.5, sz = 0.5, opts = {}) {
  const geo = createGeometry();
  const uvScale = opts.uvScale ?? 1;
  const faces = [
    { n: [1, 0, 0], verts: [[sx, -sy, sz], [sx, -sy, -sz], [sx, sy, -sz], [sx, sy, sz]] },
    { n: [-1, 0, 0], verts: [[-sx, -sy, -sz], [-sx, -sy, sz], [-sx, sy, sz], [-sx, sy, -sz]] },
    { n: [0, 1, 0], verts: [[-sx, sy, sz], [sx, sy, sz], [sx, sy, -sz], [-sx, sy, -sz]] },
    { n: [0, -1, 0], verts: [[-sx, -sy, -sz], [sx, -sy, -sz], [sx, -sy, sz], [-sx, -sy, sz]] },
    { n: [0, 0, 1], verts: [[-sx, -sy, sz], [sx, -sy, sz], [sx, sy, sz], [-sx, sy, sz]] },
    { n: [0, 0, -1], verts: [[sx, -sy, -sz], [-sx, -sy, -sz], [-sx, sy, -sz], [sx, sy, -sz]] },
  ];
  for (const face of faces) {
    const base = geo.positions.length / 3;
    for (let i = 0; i < 4; i++) {
      const v = face.verts[i];
      const u = (i === 0 || i === 3) ? 0 : 1;
      const vv = (i < 2) ? 0 : 1;
      pushVertex(geo, v[0], v[1], v[2], face.n[0], face.n[1], face.n[2], u * uvScale, vv * uvScale);
    }
    pushIndex(geo, base, base + 1, base + 2);
    pushIndex(geo, base, base + 2, base + 3);
  }
  return geo;
}

/** Plane on the XZ ground (y = 0), `w`×`d`, UV tiled by `uvScale`. */
export function buildPlaneXZ(w = 1, d = 1, opts = {}) {
  const geo = createGeometry();
  const uv = opts.uvScale ?? 1;
  const hw = w / 2;
  const hd = d / 2;
  pushVertex(geo, -hw, 0, -hd, 0, 1, 0, 0, 0);
  pushVertex(geo, hw, 0, -hd, 0, 1, 0, uv, 0);
  pushVertex(geo, hw, 0, hd, 0, 1, 0, uv, uv);
  pushVertex(geo, -hw, 0, hd, 0, 1, 0, 0, uv);
  pushIndex(geo, 0, 1, 2);
  pushIndex(geo, 0, 2, 3);
  return geo;
}

/** Plane on the XY plane facing +Z (for wall pieces). */
export function buildPlaneXY(w = 1, h = 1, opts = {}) {
  const geo = createGeometry();
  const uv = opts.uvScale ?? 1;
  const hw = w / 2;
  const hh = h / 2;
  pushVertex(geo, -hw, -hh, 0, 0, 0, 1, 0, 0);
  pushVertex(geo, hw, -hh, 0, 0, 0, 1, uv, 0);
  pushVertex(geo, hw, hh, 0, 0, 0, 1, uv, uv);
  pushVertex(geo, -hw, hh, 0, 0, 0, 1, 0, uv);
  pushIndex(geo, 0, 1, 2);
  pushIndex(geo, 0, 2, 3);
  return geo;
}

/** UV sphere with `widthSeg` × `heightSeg`. */
export function buildSphere(radius = 1, widthSeg = 24, heightSeg = 16, opts = {}) {
  const geo = createGeometry();
  const uvScale = opts.uvScale ?? 1;
  for (let y = 0; y <= heightSeg; y++) {
    const v = y / heightSeg;
    const phi = v * Math.PI;
    for (let x = 0; x <= widthSeg; x++) {
      const u = x / widthSeg;
      const theta = u * TAU;
      const nx = Math.sin(phi) * Math.cos(theta);
      const ny = Math.cos(phi);
      const nz = Math.sin(phi) * Math.sin(theta);
      pushVertex(geo, nx * radius, ny * radius, nz * radius, nx, ny, nz, u * uvScale, v * uvScale);
    }
  }
  for (let y = 0; y < heightSeg; y++) {
    for (let x = 0; x < widthSeg; x++) {
      const a = y * (widthSeg + 1) + x;
      const b = a + widthSeg + 1;
      pushIndex(geo, a, b, a + 1);
      pushIndex(geo, b, b + 1, a + 1);
    }
  }
  return geo;
}

/** Icosphere (subdivided icosahedron) — rounder, more even triangles. */
export function buildIcosphere(radius = 1, detail = 2, opts = {}) {
  const t = (1 + Math.sqrt(5)) / 2;
  const verts = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ].map((v) => {
    const len = Math.hypot(v[0], v[1], v[2]);
    return [v[0] / len, v[1] / len, v[2] / len];
  });

  const faces = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ];

  const pos = verts.map((v) => [v[0] * radius, v[1] * radius, v[2] * radius]);
  const cache = new Map();

  const mid = (i1, i2) => {
    const key = i1 < i2 ? `${i1}_${i2}` : `${i2}_${i1}`;
    if (cache.has(key)) return cache.get(key);
    const a = pos[i1];
    const b = pos[i2];
    const m = [(a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5, (a[2] + b[2]) * 0.5];
    const len = Math.hypot(m[0], m[1], m[2]);
    const idx = pos.length;
    pos.push([(m[0] / len) * radius, (m[1] / len) * radius, (m[2] / len) * radius]);
    cache.set(key, idx);
    return idx;
  };

  let tris = faces;
  for (let d = 0; d < detail; d++) {
    const next = [];
    for (const [a, b, c] of tris) {
      const ab = mid(a, b);
      const bc = mid(b, c);
      const ca = mid(c, a);
      next.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
    }
    tris = next;
  }

  const geo = createGeometry();
  const cache2 = new Map();
  const idxFor = (i) => {
    if (cache2.has(i)) return cache2.get(i);
    const p = pos[i];
    const len = Math.hypot(p[0], p[1], p[2]);
    const nx = p[0] / len, ny = p[1] / len, nz = p[2] / len;
    const u = Math.atan2(nz, nx) / TAU + 0.5;
    const v = Math.acos(Math.min(1, Math.max(-1, ny))) / Math.PI;
    const idx = geo.positions.length / 3;
    pushVertex(geo, p[0], p[1], p[2], nx, ny, nz, u, v);
    cache2.set(i, idx);
    return idx;
  };
  for (const tri of tris) {
    pushIndex(geo, idxFor(tri[0]), idxFor(tri[1]), idxFor(tri[2]));
  }
  return geo;
}

/** Cylinder along Y: radius r, height h, `seg` segments. Caps optional. */
export function buildCylinder(radius = 0.5, height = 1, seg = 16, opts = {}) {
  const geo = createGeometry();
  const caps = opts.caps ?? true;
  const uvScale = opts.uvScale ?? 1;
  const half = height / 2;
  const top = half;
  const bottom = -half;

  for (let i = 0; i <= seg; i++) {
    const a = (i / seg) * TAU;
    const nx = Math.cos(a);
    const nz = Math.sin(a);
    pushVertex(geo, nx * radius, top, nz * radius, nx, 0, nz, (i / seg) * uvScale, 0);
    pushVertex(geo, nx * radius, bottom, nz * radius, nx, 0, nz, (i / seg) * uvScale, 1);
  }
  for (let i = 0; i < seg; i++) {
    const a = i * 2;
    pushIndex(geo, a, a + 1, a + 2);
    pushIndex(geo, a + 1, a + 3, a + 2);
  }

  if (caps) {
    const centerTop = geo.positions.length / 3;
    pushVertex(geo, 0, top, 0, 0, 1, 0, 0.5, 0.5);
    for (let i = 0; i <= seg; i++) {
      const a = (i / seg) * TAU;
      pushVertex(geo, Math.cos(a) * radius, top, Math.sin(a) * radius, 0, 1, 0, 0.5 + 0.5 * Math.cos(a), 0.5 + 0.5 * Math.sin(a));
    }
    for (let i = 0; i < seg; i++) {
      pushIndex(geo, centerTop, centerTop + 1 + i, centerTop + 2 + i);
    }
    const centerBot = geo.positions.length / 3;
    pushVertex(geo, 0, bottom, 0, 0, -1, 0, 0.5, 0.5);
    for (let i = 0; i <= seg; i++) {
      const a = (i / seg) * TAU;
      pushVertex(geo, Math.cos(a) * radius, bottom, Math.sin(a) * radius, 0, -1, 0, 0.5 + 0.5 * Math.cos(a), 0.5 + 0.5 * Math.sin(a));
    }
    for (let i = 0; i < seg; i++) {
      pushIndex(geo, centerBot, centerBot + 2 + i, centerBot + 1 + i);
    }
  }
  return geo;
}

/** Cone along Y: radius r, height h, `seg` segments, optional cap. */
export function buildCone(radius = 0.5, height = 1, seg = 16, opts = {}) {
  const geo = createGeometry();
  const cap = opts.cap ?? true;
  const half = height / 2;
  const apex = half;
  const base = -half;

  for (let i = 0; i <= seg; i++) {
    const a = (i / seg) * TAU;
    const nx = Math.cos(a);
    const nz = Math.sin(a);
    const len = Math.hypot(nx, radius / height, nz);
    const snx = nx / len, sny = (radius / height) / len, snz = nz / len;
    pushVertex(geo, nx * radius, base, nz * radius, snx, sny, snz, i / seg, 1);
    pushVertex(geo, 0, apex, 0, snx, sny, snz, (i / seg + 0.5) / 2, 0);
  }
  for (let i = 0; i < seg; i++) {
    const a = i * 2;
    pushIndex(geo, a, a + 2, a + 3);
    pushIndex(geo, a, a + 3, a + 1);
  }
  if (cap) {
    const center = geo.positions.length / 3;
    pushVertex(geo, 0, base, 0, 0, -1, 0, 0.5, 0.5);
    for (let i = 0; i <= seg; i++) {
      const a = (i / seg) * TAU;
      pushVertex(geo, Math.cos(a) * radius, base, Math.sin(a) * radius, 0, -1, 0, 0.5 + 0.5 * Math.cos(a), 0.5 + 0.5 * Math.sin(a));
    }
    for (let i = 0; i < seg; i++) {
      pushIndex(geo, center, center + 2 + i, center + 1 + i);
    }
  }
  return geo;
}

/** Capsule along Y (rounded cylinder), `segments` around, `rings` per cap. */
export function buildCapsule(radius = 0.5, height = 1, segments = 12, rings = 4, opts = {}) {
  const geo = createGeometry();
  const half = height / 2;

  const ringVerts = [];
  for (let ring = 0; ring <= segments; ring++) {
    const a = (ring / segments) * TAU;
    ringVerts.push([Math.cos(a), Math.sin(a)]);
  }

  const bodyTop = half;
  const bodyBot = -half;
  for (let i = 0; i <= segments; i++) {
    const [cx, cz] = ringVerts[i];
    pushVertex(geo, cx * radius, bodyTop, cz * radius, cx, 0, cz, i / segments, 0);
    pushVertex(geo, cx * radius, bodyBot, cz * radius, cx, 0, cz, i / segments, 1);
  }
  for (let i = 0; i < segments; i++) {
    const a = i * 2;
    pushIndex(geo, a, a + 1, a + 2);
    pushIndex(geo, a + 1, a + 3, a + 2);
  }

  for (let r = 1; r <= rings; r++) {
    const phi = (r / rings) * Math.PI / 2;
    const y = bodyTop + Math.sin(phi) * radius;
    const rad = Math.cos(phi) * radius;
    for (let i = 0; i <= segments; i++) {
      const [cx, cz] = ringVerts[i];
      pushVertex(geo, cx * rad, y, cz * rad, cx * Math.cos(phi), Math.sin(phi), cz * Math.cos(phi), i / segments, r / rings);
    }
  }
  const row0 = (segments + 1) * 2;
  for (let i = 0; i < segments; i++) {
    const a = row0 + i;
    pushIndex(geo, a, a + 1, a + segments + 1);
    pushIndex(geo, a + segments + 1, a + 1, a + segments + 2);
  }
  for (let r = 1; r < rings; r++) {
    const baseRow = row0 + r * (segments + 1);
    for (let i = 0; i < segments; i++) {
      const a = baseRow + i;
      pushIndex(geo, a, a + segments + 1, a + 1);
      pushIndex(geo, a + 1, a + segments + 1, a + segments + 2);
    }
  }

  for (let r = 1; r <= rings; r++) {
    const phi = (r / rings) * Math.PI / 2;
    const y = bodyBot - Math.sin(phi) * radius;
    const rad = Math.cos(phi) * radius;
    for (let i = 0; i <= segments; i++) {
      const [cx, cz] = ringVerts[i];
      pushVertex(geo, cx * rad, y, cz * rad, cx * Math.cos(phi), -Math.sin(phi), cz * Math.cos(phi), i / segments, 1 + r / rings);
    }
  }
  const botRow = row0 + rings * (segments + 1);
  for (let i = 0; i < segments; i++) {
    const a = botRow + i;
    pushIndex(geo, a, a + segments + 1, a + 1);
    pushIndex(geo, a + 1, a + segments + 1, a + segments + 2);
  }
  for (let r = 1; r < rings; r++) {
    const baseRow = botRow + r * (segments + 1);
    for (let i = 0; i < segments; i++) {
      const a = baseRow + i;
      pushIndex(geo, a, a + 1, a + segments + 1);
      pushIndex(geo, a + segments + 1, a + 1, a + segments + 2);
    }
  }
  return geo;
}

/** Torus in the XZ plane, major radius R, tube radius r. */
export function buildTorus(R = 1, r = 0.25, segments = 24, tubeSeg = 12, opts = {}) {
  const geo = createGeometry();
  for (let i = 0; i <= segments; i++) {
    const u = i / segments;
    const theta = u * TAU;
    const cx = Math.cos(theta);
    const cz = Math.sin(theta);
    for (let j = 0; j <= tubeSeg; j++) {
      const v = j / tubeSeg;
      const phi = v * TAU;
      const nx = Math.cos(phi);
      const ny = Math.sin(phi);
      const px = (R + r * nx) * cx;
      const py = r * ny;
      const pz = (R + r * nx) * cz;
      pushVertex(geo, px, py, pz, nx * cx, ny, nx * cz, u, v);
    }
  }
  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < tubeSeg; j++) {
      const a = i * (tubeSeg + 1) + j;
      const b = a + tubeSeg + 1;
      pushIndex(geo, a, b, a + 1);
      pushIndex(geo, b, b + 1, a + 1);
    }
  }
  return geo;
}

/** Rock: icosphere with per-vertex jitter. */
export function buildRock(radius = 1, detail = 1, jitter = 0.35, seed = 0, opts = {}) {
  const base = buildIcosphere(radius, detail, opts);
  let s = seed * 374761393 + 668265263;
  const rand = () => {
    s = (Math.imul(s ^ (s >>> 13), 1274126177) >>> 0);
    return s / 4294967296;
  };
  const pos = base.positions;
  const nor = base.normals;
  for (let i = 0; i < pos.length; i += 3) {
    const nx = nor[i], ny = nor[i + 1], nz = nor[i + 2];
    const len = Math.hypot(nx, ny, nz) || 1;
    const j = 1 + (rand() * 2 - 1) * jitter;
    pos[i] = nx / len * radius * j;
    pos[i + 1] = ny / len * radius * j;
    pos[i + 2] = nz / len * radius * j;
  }
  return base;
}

/** Cross-shaped emitter mesh (for particles / impact marks). */
export function buildQuad() {
  const geo = createGeometry();
  pushVertex(geo, -0.5, -0.5, 0, 0, 0, 1, 0, 0);
  pushVertex(geo, 0.5, -0.5, 0, 0, 0, 1, 1, 0);
  pushVertex(geo, 0.5, 0.5, 0, 0, 0, 1, 1, 1);
  pushVertex(geo, -0.5, 0.5, 0, 0, 0, 1, 0, 1);
  pushIndex(geo, 0, 1, 2);
  pushIndex(geo, 0, 2, 3);
  return geo;
}

/** Translate geometry in place. */
export function translateGeometry(geo, x, y, z) {
  const p = geo.positions;
  for (let i = 0; i < p.length; i += 3) {
    p[i] += x;
    p[i + 1] += y;
    p[i + 2] += z;
  }
  return geo;
}

/** Scale geometry in place (positions only). */
export function scaleGeometry(geo, sx, sy, sz) {
  const p = geo.positions;
  for (let i = 0; i < p.length; i += 3) {
    p[i] *= sx;
    p[i + 1] *= sy;
    p[i + 2] *= sz;
  }
  return geo;
}

/** Recompute flat (face) normals — gives the low-poly look. */
export function flatNormals(geo) {
  const pos = geo.positions;
  const idx = geo.indices;
  const normals = new Float32Array(pos.length);
  for (let i = 0; i < idx.length; i += 3) {
    const a = idx[i] * 3, b = idx[i + 1] * 3, c = idx[i + 2] * 3;
    const ax = pos[a], ay = pos[a + 1], az = pos[a + 2];
    const bx = pos[b], by = pos[b + 1], bz = pos[b + 2];
    const cx = pos[c], cy = pos[c + 1], cz = pos[c + 2];
    const ux = bx - ax, uy = by - ay, uz = bz - az;
    const vx = cx - ax, vy = cy - ay, vz = cz - az;
    let nx = uy * vz - uz * vy;
    let ny = uz * vx - ux * vz;
    let nz = ux * vy - uy * vx;
    const len = Math.hypot(nx, ny, nz) || 1;
    nx /= len; ny /= len; nz /= len;
    for (const vi of [a, b, c]) {
      normals[vi] += nx;
      normals[vi + 1] += ny;
      normals[vi + 2] += nz;
    }
  }
  for (let i = 0; i < normals.length; i += 3) {
    const len = Math.hypot(normals[i], normals[i + 1], normals[i + 2]) || 1;
    normals[i] /= len;
    normals[i + 1] /= len;
    normals[i + 2] /= len;
  }
  geo.normals = Array.from(normals);
  return geo;
}

/** Combine multiple geometries into one. */
export function mergeGeometries(geometries) {
  const out = createGeometry();
  let base = 0;
  for (const g of geometries) {
    const vcount = g.positions.length / 3;
    out.positions.push(...g.positions);
    out.normals.push(...(g.normals ?? new Float32Array(vcount * 3)));
    out.uvs.push(...(g.uvs ?? new Float32Array(vcount * 2)));
    out.colors.push(...(g.colors ?? new Float32Array(vcount * 4).fill(1)));
    for (const i of g.indices) out.indices.push(i + base);
    base += vcount;
  }
  return out;
}

/** Vertex colors: assign a color to every vertex. */
export function colorize(geo, r, g, b, a = 1) {
  const c = geo.colors;
  for (let i = 0; i < c.length; i += 4) {
    c[i] = r;
    c[i + 1] = g;
    c[i + 2] = b;
    c[i + 3] = a;
  }
  return geo;
}
