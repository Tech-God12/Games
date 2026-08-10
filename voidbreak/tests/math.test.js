/**
 * VOIDBREAK — math library tests.
 * Covers scalar helpers, easing, Vec2/3, Mat4, Quat, Color.
 */

import {
  suite, test, assert, assertEqual, assertClose, assertArrayClose,
  assertVecClose,
} from './framework.js';
import {
  clamp, clamp01, lerp, inverseLerp, smoothstep, damp, wrapAngle,
  angleDelta, lerpAngle, ease, moveTowards, deg2rad, rad2deg, formatNumber,
  formatTime, binarySearchLE, pingPong, repeat, mapRange,
} from '../src/core/math.js';
import { Vec2, Rect, Mat2, angleDelta2, wrapAngle2 } from '../src/core/math2d.js';
import { Vec3 } from '../src/core/vec3.js';
import { Mat4, mat3FromMat4, normalMatrix } from '../src/core/mat4.js';
import { Quat } from '../src/core/quat.js';
import { Color, parseColor, hslToRgb, rgbToHsl, mixCss, darken, lighten } from '../src/core/color.js';

suite('math: scalar helpers', () => {
  test('clamp', () => {
    assertEqual(clamp(5, 0, 3), 3);
    assertEqual(clamp(-1, 0, 3), 0);
    assertEqual(clamp(2, 0, 3), 2);
  });

  test('clamp01', () => {
    assertEqual(clamp01(1.5), 1);
    assertEqual(clamp01(-0.2), 0);
    assertEqual(clamp01(0.4), 0.4);
  });

  test('lerp and inverseLerp are inverses', () => {
    assertClose(inverseLerp(0, 10, lerp(0, 10, 0.37)), 0.37);
    assertClose(lerp(2, 4, 0.5), 3);
  });

  test('mapRange', () => {
    assertClose(mapRange(0.5, 0, 1, 100, 200), 150);
    assertClose(mapRange(-1, 0, 1, 0, 10), 0);
  });

  test('smoothstep endpoints', () => {
    assertEqual(smoothstep(0, 1, 0), 0);
    assertEqual(smoothstep(0, 1, 1), 1);
    assertClose(smoothstep(0, 1, 0.5), 0.5);
  });

  test('wrapAngle', () => {
    assertClose(wrapAngle(Math.PI + 0.1), -Math.PI + 0.1);
    assertClose(wrapAngle(-Math.PI - 0.1), Math.PI - 0.1);
    assertClose(wrapAngle(0), 0);
  });

  test('angleDelta shortest path', () => {
    assertClose(angleDelta(0, Math.PI * 0.9), Math.PI * 0.9);
    assertClose(angleDelta(0, -Math.PI * 0.9), -Math.PI * 0.9);
    assertClose(angleDelta(Math.PI, -Math.PI), 0);
  });

  test('lerpAngle', () => {
    assertClose(lerpAngle(0, Math.PI * 2 - 0.1, 0.5), -0.05);
    assertClose(lerpAngle(0, 0.8, 0.5), 0.4);
  });

  test('ease curves hit endpoints', () => {
    for (const kind of ['linear', 'inQuad', 'outQuad', 'inOutCubic', 'outElastic', 'outBounce', 'inBack']) {
      assertClose(ease(kind, 0), 0, 1e-6, `ease(${kind},0)`);
      assertClose(ease(kind, 1), 1, 1e-6, `ease(${kind},1)`);
    }
  });

  test('moveTowards clamps at target', () => {
    assertClose(moveTowards(5, 10, 3), 8);
    assertClose(moveTowards(5, 10, 10), 10);
    assertClose(moveTowards(5, 2, 1), 4);
  });

  test('deg2rad/rad2deg round trip', () => {
    assertClose(rad2deg(deg2rad(123.45)), 123.45);
  });

  test('binarySearchLE', () => {
    assertEqual(binarySearchLE([0.1, 0.4, 0.9, 1.0], 0.5), 1);
    assertEqual(binarySearchLE([0.1, 0.4], 0.05), -1);
    assertEqual(binarySearchLE([0.1, 0.4, 0.9], 1.0), 2);
  });

  test('formatting helpers', () => {
    assertEqual(formatNumber(1234), '1,234');
    assertEqual(formatTime(83), '1:23');
  });

  test('pingPong and repeat', () => {
    assertClose(pingPong(1.5, 1), 0.5);
    assertClose(repeat(-0.5, 1), 0.5);
  });
});

suite('math: vec2/rect', () => {
  test('vec2 arithmetic', () => {
    const a = new Vec2(1, 2);
    a.add(new Vec2(3, 4)).mulScalar(2);
    assertClose(a.x, 8, 1e-6);
    assertClose(a.y, 12, 1e-6);
    assertClose(a.length(), Math.sqrt(8 * 8 + 12 * 12));
  });

  test('vec2 normalize zero-safe', () => {
    const z = new Vec2(0, 0).normalize();
    assertClose(z.x, 0, 1e-6);
    assertClose(z.y, 0, 1e-6);
  });

  test('vec2 perp and rotate', () => {
    const v = new Vec2(1, 0);
    v.perp();
    assertClose(v.x, 0, 1e-6);
    assertClose(v.y, 1, 1e-6);
    v.rotate(Math.PI / 2);
    assertClose(v.x, -1, 1e-6);
    assertClose(v.y, 0, 1e-6);
  });

  test('rect containment and intersection', () => {
    const r = new Rect(0, 0, 10, 10);
    assert(r.containsPoint(5, 5));
    assert(!r.containsPoint(11, 5));
    assert(r.intersects(new Rect(8, 8, 4, 4)));
    assert(!r.intersects(new Rect(20, 20, 2, 2)));
  });

  test('mat2 rotation', () => {
    const m = new Mat2().makeRotation(Math.PI / 2);
    const out = m.transform(new Vec2(1, 0));
    assertClose(out.x, 0, 1e-6);
    assertClose(out.y, 1, 1e-6);
  });

  test('angleDelta2', () => {
    assertClose(angleDelta2(0, Math.PI * 2 - 0.01), -0.01);
    assertClose(wrapAngle2(Math.PI + 1), -Math.PI + 1);
  });
});

suite('math: vec3', () => {
  test('basic ops', () => {
    const v = new Vec3(1, 2, 3);
    v.add(new Vec3(1, 1, 1)).mulScalar(2).sub(new Vec3(1, 0, 0));
    assertVecClose(v, { x: 3, y: 6, z: 8 });
  });

  test('cross product handedness', () => {
    const x = new Vec3(1, 0, 0);
    const y = new Vec3(0, 1, 0);
    const z = x.clone().cross(y);
    assertVecClose(z, { x: 0, y: 0, z: 1 });
  });

  test('normalize', () => {
    const v = new Vec3(3, 4, 0).normalize();
    assertClose(v.length(), 1);
    assertVecClose(v, { x: 0.6, y: 0.8, z: 0 });
  });

  test('dot and angleTo', () => {
    const a = new Vec3(1, 0, 0);
    const b = new Vec3(0, 1, 0);
    assertClose(a.angleTo(b), Math.PI / 2);
  });

  test('reflect', () => {
    const d = new Vec3(1, -1, 0);
    d.reflect(new Vec3(0, 1, 0));
    assertVecClose(d, { x: 1, y: 1, z: 0 });
  });

  test('applyAxisAngle', () => {
    const v = new Vec3(1, 0, 0);
    v.applyAxisAngle(new Vec3(0, 1, 0), Math.PI / 2);
    assertVecClose(v, { x: 0, y: 0, z: -1 }, 1e-6);
  });

  test('lerpVectors static', () => {
    const out = Vec3.lerpVectors(new Vec3(0, 0, 0), new Vec3(10, 10, 10), 0.5);
    assertVecClose(out, { x: 5, y: 5, z: 5 });
  });
});

suite('math: mat4', () => {
  test('identity multiply', () => {
    const m = new Mat4().identity();
    const v = new Vec3(1, 2, 3);
    const out = m.transformPoint(v);
    assertVecClose(out, v);
  });

  test('translation compose/decompose', () => {
    const m = new Mat4().makeTranslation(5, -3, 2);
    const out = m.transformPoint(new Vec3(1, 1, 1));
    assertVecClose(out, { x: 6, y: -2, z: 3 });
  });

  test('scale', () => {
    const m = new Mat4().makeScale(2, 3, 4);
    const out = m.transformPoint(new Vec3(1, 1, 1));
    assertVecClose(out, { x: 2, y: 3, z: 4 });
  });

  test('rotation and inverse', () => {
    const m = new Mat4().makeRotationY(Math.PI / 2);
    const v = m.transformPoint(new Vec3(1, 0, 0));
    assertVecClose(v, { x: 0, y: 0, z: -1 }, 1e-6);
    const inv = m.clone().invert();
    const back = inv.transformPoint(v);
    assertVecClose(back, { x: 1, y: 0, z: 0 }, 1e-5);
  });

  test('inverse of singular returns null', () => {
    const m = new Mat4();
    m.fill(0);
    assertEqual(m.invert(), null);
  });

  test('perspective matrix is invertible', () => {
    const p = new Mat4().makePerspective(Math.PI / 2, 1, 0.1, 100);
    const inv = p.clone().invert();
    assert(inv !== null);
  });

  test('lookAt', () => {
    const eye = new Vec3(0, 0, 10);
    const target = new Vec3(0, 0, 0);
    const view = new Mat4().makeLookAt(eye, target, new Vec3(0, 1, 0));
    const out = view.transformPoint(eye);
    assertVecClose(out, { x: 0, y: 0, z: 0 }, 1e-6);
    const fwd = view.transformDirection(new Vec3(0, 0, -1));
    assertVecClose(fwd, { x: 0, y: 0, z: -1 }, 1e-6);
  });

  test('normalMatrix preserves orthogonality', () => {
    const m = new Mat4().makeRotationX(0.7).multiply(new Mat4().makeScale(2, 2, 2));
    const nm = normalMatrix(m);
    assert(nm !== null);
    const v = new Vec3(0, 1, 0);
    const out = new Vec3(
      nm[0] * v.x + nm[3] * v.y + nm[6] * v.z,
      nm[1] * v.x + nm[4] * v.y + nm[7] * v.z,
      nm[2] * v.x + nm[5] * v.y + nm[8] * v.z,
    );
    assertClose(out.length(), 0.5, 1e-6);
  });

  test('mat3FromMat4', () => {
    const m = new Mat4().makeScale(1, 2, 3);
    const out = mat3FromMat4(m);
    assertEqual(out[4], 2);
    assertEqual(out[8], 3);
  });

  test('compose/decompose round trip', () => {
    const pos = new Vec3(1, 2, 3);
    const quat = new Quat().setFromEulerYXZ(0.5, -0.3, 0.1).normalize();
    const scale = new Vec3(2, 1.5, 3);
    const m = new Mat4().compose(pos, quat, scale);
    const p2 = new Vec3();
    const q2 = new Quat();
    const s2 = new Vec3();
    m.decompose(p2, q2, s2);
    assertVecClose(p2, pos, 1e-5);
    assertVecClose(s2, scale, 1e-5);
    const d = Math.min(q2.distanceTo(quat), q2.clone().negate().distanceTo(quat));
    assertClose(d, 0, 1e-5);
  });
});

suite('math: quaternion', () => {
  test('identity rotation', () => {
    const q = new Quat();
    const v = new Vec3(1, 0, 0);
    q.rotateVec3(v);
    assertVecClose(v, { x: 1, y: 0, z: 0 });
  });

  test('euler YXZ 90° yaw', () => {
    const q = new Quat().setFromEulerYXZ(Math.PI / 2, 0, 0);
    const v = new Vec3(1, 0, 0);
    q.rotateVec3(v);
    assertVecClose(v, { x: 0, y: 0, z: -1 }, 1e-6);
  });

  test('multiply composition', () => {
    const q1 = new Quat().setFromAxisAngle({ x: 0, y: 1, z: 0 }, Math.PI / 2);
    const q2 = new Quat().setFromAxisAngle({ x: 1, y: 0, z: 0 }, Math.PI / 2);
    const composed = new Quat().multiplyQuaternions(q1, q2);
    const v = new Vec3(1, 0, 0);
    composed.rotateVec3(v);
    const v2 = new Vec3(1, 0, 0);
    q2.rotateVec3(v2);
    q1.rotateVec3(v2);
    assertVecClose(v, v2, 1e-6);
  });

  test('slerp half rotation', () => {
    const q0 = new Quat().identity();
    const q1 = new Quat().setFromAxisAngle({ x: 0, y: 1, z: 0 }, Math.PI);
    const half = q0.clone().slerp(q1, 0.5);
    const v = new Vec3(1, 0, 0);
    half.rotateVec3(v);
    assertVecClose(v, { x: 0, y: 0, z: -1 }, 1e-5);
  });

  test('fromRotationMatrix round trip', () => {
    const m = new Mat4().makeRotationAxis({ x: 0.3, y: 0.7, z: 0.2 }, 1.1);
    const q = new Quat().setFromRotationMatrix(m);
    const m2 = new Mat4().makeRotationFromQuat(q);
    assert(m.equalsApprox(m2, 1e-4));
  });

  test('setFromUnitVectors', () => {
    const from = new Vec3(0, 0, -1);
    const to = new Vec3(0, 1, 0);
    const q = new Quat().setFromUnitVectors(from, to);
    const v = from.clone();
    q.rotateVec3(v);
    assertVecClose(v, to, 1e-5);
  });

  test('toEulerYXZ round trip', () => {
    const q = new Quat().setFromEulerYXZ(0.4, -0.8, 0.2);
    const e = q.toEulerYXZ();
    const q2 = new Quat().setFromEulerYXZ(e.yaw, e.pitch, e.roll);
    const d = Math.min(q2.distanceTo(q), q2.clone().negate().distanceTo(q));
    assertClose(d, 0, 1e-5);
  });

  test('setFromDirection', () => {
    const q = new Quat().setFromDirection({ x: 0, y: 1, z: 0 });
    const v = new Vec3(0, 0, -1);
    q.rotateVec3(v);
    assertVecClose(v, { x: 0, y: 1, z: 0 }, 1e-5);
  });
});

suite('math: color', () => {
  test('hex parse', () => {
    const c = parseColor('#ff8000');
    assertArrayClose(c, [1, 0.5019607843137255, 0, 1]);
    const c3 = parseColor('#0af');
    assertArrayClose(c3, [0, 0.6666666666666666, 1, 1]);
    const ca = parseColor('#ff000080');
    assertClose(ca[3], 0x80 / 255);
  });

  test('rgb parse', () => {
    const c = parseColor('rgb(255, 0, 0)');
    assertArrayClose(c, [1, 0, 0, 1]);
    const c2 = parseColor('rgba(0,0,0,0.5)');
    assertClose(c2[3], 0.5);
  });

  test('hsl parse', () => {
    const c = parseColor('hsl(120, 100%, 50%)');
    assertArrayClose(c, [0, 1, 0, 1], 1e-5);
  });

  test('hsl/rgb round trip', () => {
    const [r, g, b] = hslToRgb(...rgbToHsl(0.7, 0.2, 0.5));
    assertClose(r, 0.7, 1e-6);
    assertClose(g, 0.2, 1e-6);
    assertClose(b, 0.5, 1e-6);
  });

  test('named colors', () => {
    assertArrayClose(parseColor('white'), [1, 1, 1, 1]);
    assertArrayClose(parseColor('black'), [0, 0, 0, 1]);
  });

  test('color class ops', () => {
    const c = new Color(1, 0.5, 0, 1);
    c.mulScalar(0.5);
    assertClose(c.r, 0.5);
    c.lerp(new Color(0, 0, 0, 1), 0.5);
    assertClose(c.r, 0.25);
    assertEqual(c.toHex().startsWith('#'), true);
  });

  test('darken/lighten/mix', () => {
    const d = darken('#ffffff', 1);
    assertEqual(d, 'rgb(0,0,0)');
    const l = lighten('#000000', 1);
    assertEqual(l, 'rgb(255,255,255)');
    const m = mixCss('#000000', '#ffffff', 0.5);
    assertEqual(m, 'rgb(128,128,128)');
  });

  test('invalid parse returns null', () => {
    assertEqual(parseColor('not-a-color'), null);
    assertEqual(parseColor(''), null);
  });
});
