/**
 * VOIDBREAK — RNG, noise and geometry tests.
 */

import {
  suite, test, assert, assertEqual, assertClose, assertInRange,
} from './framework.js';
import { RNG, hashString, hash2i, hash3i, randInt01 } from '../src/core/rng.js';
import {
  valueNoise2, valueNoise3, perlin2, perlin3, fbm2, fbm3, ridged2,
  cellular2, simplex2, simplex2n, warped2, valueFbm2,
} from '../src/core/noise.js';
import {
  Ray, Plane, Sphere, AABB, Frustum, SpatialHash,
  rayAABB, raySphere, rayPlane, rayTriangle, sphereAABBOverlap,
  closestPointOnSegment, distanceToSegmentSq, segmentSegmentDistance,
} from '../src/core/geometry.js';
import { Vec3 } from '../src/core/vec3.js';
import { Mat4 } from '../src/core/mat4.js';
import { CollisionWorld } from '../src/game/collision.js';

suite('rng', () => {
  test('deterministic for same seed', () => {
    const a = new RNG(12345);
    const b = new RNG(12345);
    for (let i = 0; i < 100; i++) {
      assertEqual(a.next(), b.next());
    }
  });

  test('different seeds diverge', () => {
    const a = new RNG(1);
    const b = new RNG(2);
    let same = true;
    for (let i = 0; i < 10; i++) {
      if (a.next() !== b.next()) { same = false; break; }
    }
    assert(!same);
  });

  test('range bounds', () => {
    const rng = new RNG(42);
    for (let i = 0; i < 1000; i++) {
      const v = rng.float(10, 20);
      assertInRange(v, 10, 20);
      assert(v < 20);
    }
    for (let i = 0; i < 1000; i++) {
      const v = rng.int(-5, 5);
      assertInRange(v, -5, 5);
      assertEqual(Number.isInteger(v), true);
    }
  });

  test('string seeds hash deterministically', () => {
    const a = new RNG('hello');
    const b = new RNG('hello');
    assertEqual(a.next(), b.next());
  });

  test('reset reproduces stream', () => {
    const rng = new RNG(7);
    const first = [];
    for (let i = 0; i < 20; i++) first.push(rng.next());
    rng.reset();
    for (let i = 0; i < 20; i++) assertEqual(rng.next(), first[i]);
  });

  test('pick and shuffle', () => {
    const rng = new RNG(99);
    const arr = [1, 2, 3, 4, 5];
    const shuffled = rng.shuffle(arr.slice());
    assertEqual(shuffled.length, 5);
    assertEqual([...shuffled].sort((a, b) => a - b).join(','), '1,2,3,4,5');
  });

  test('weighted picks bias correctly', () => {
    const rng = new RNG(5);
    const counts = { a: 0, b: 0 };
    for (let i = 0; i < 10000; i++) {
      const v = rng.pickWeighted([['a', 1], ['b', 9]]);
      counts[v]++;
    }
    assert(counts.b > counts.a * 5);
  });

  test('hash helpers', () => {
    assertEqual(hashString('abc'), hashString('abc'));
    assert(hashString('abc') !== hashString('abd'));
    assertEqual(hash2i(1, 2, 0), hash2i(1, 2, 0));
    assertEqual(hash3i(1, 2, 3, 0), hash3i(1, 2, 3, 0));
    assertInRange(randInt01(123), 0, 1);
  });
});

suite('noise', () => {
  test('value noise deterministic and in range', () => {
    for (const seed of [0, 1, 999]) {
      const a = valueNoise2(3.3, 4.4, seed);
      assertEqual(a, valueNoise2(3.3, 4.4, seed));
      assertInRange(a, 0, 1);
    }
  });

  test('perlin in [-1,1]', () => {
    for (let i = 0; i < 200; i++) {
      assertInRange(perlin2(i * 0.37, i * 0.13, i), -1, 1);
    }
  });

  test('fbm output reasonable', () => {
    assertInRange(fbm2(1.5, 2.5, 42, 5), -1.5, 1.5);
    assertInRange(fbm3(1, 2, 3, 42, 4), -1.5, 1.5);
  });

  test('simplex in range and deterministic', () => {
    const a = simplex2(0.5, 0.5, 3);
    assertEqual(a, simplex2(0.5, 0.5, 3));
    assertInRange(a, -1, 1);
    assertInRange(simplex2n(0.5, 0.5, 3), 0, 1);
  });

  test('ridged/cellular/warped in [0,1]', () => {
    assertInRange(ridged2(1, 2, 0, 4), 0, 1);
    assertInRange(cellular2(1, 2, 0), 0, 1);
    assertInRange(warped2(1, 2, 0, 3), 0, 1);
    assertInRange(valueFbm2(1, 2, 0, 4), 0, 1);
    assertInRange(valueNoise3(1, 2, 3, 0), 0, 1);
  });
});

suite('geometry: rays', () => {
  test('rayAABB hit', () => {
    const box = new AABB(new Vec3(-1, -1, -1), new Vec3(1, 1, 1));
    assertEqual(rayAABB(new Vec3(0, 0, -5), new Vec3(0, 0, 1), box), 4);
  });

  test('rayAABB miss', () => {
    const box = new AABB(new Vec3(-1, -1, -1), new Vec3(1, 1, 1));
    assertEqual(rayAABB(new Vec3(5, 0, -5), new Vec3(0, 0, 1), box), null);
  });

  test('raySphere hit and miss', () => {
    assertEqual(raySphere(new Vec3(0, 0, -5), new Vec3(0, 0, 1), new Vec3(0, 0, 0), 1), 4);
    assertEqual(raySphere(new Vec3(0, 3, -5), new Vec3(0, 0, 1), new Vec3(0, 0, 0), 1), null);
  });

  test('rayPlane', () => {
    const plane = new Plane(new Vec3(0, 1, 0), 0);
    assertEqual(rayPlane(new Vec3(0, 5, 0), new Vec3(0, -1, 0), plane), 5);
  });

  test('rayTriangle', () => {
    const a = new Vec3(-1, 0, 0);
    const b = new Vec3(1, 0, 0);
    const c = new Vec3(0, 1, 0);
    assertEqual(rayTriangle(new Vec3(0, 0.5, -1), new Vec3(0, 0, 1), a, b, c), 1);
    assertEqual(rayTriangle(new Vec3(5, 5, -1), new Vec3(0, 0, 1), a, b, c), null);
  });

  test('collision raycast ignores bounds when origin inside', () => {
    const w = new CollisionWorld();
    w.setBounds(-10, -10, 10, 10, 8);
    const hit = w.raycast(new Vec3(0, 1.6, 0), new Vec3(0, 0, -1), 100);
    assertEqual(hit, null);
  });

  test('collision raycast hits inner obstacles', () => {
    const w = new CollisionWorld();
    w.setBounds(-10, -10, 10, 10, 8);
    w.addBox(-1, 0, -3, 1, 2, -1);
    const hit = w.raycast(new Vec3(0, 1, 0), new Vec3(0, 0, -1), 100);
    assert(hit !== null);
    assertClose(hit.t, 1);
  });
});

suite('geometry: volumes', () => {
  test('sphereAABBOverlap', () => {
    const box = new AABB(new Vec3(-1, -1, -1), new Vec3(1, 1, 1));
    assert(sphereAABBOverlap(new Vec3(1.5, 0, 0), 0.6, box));
    assert(!sphereAABBOverlap(new Vec3(3, 0, 0), 0.6, box));
  });

  test('closestPointOnSegment', () => {
    const a = new Vec3(0, 0, 0);
    const b = new Vec3(10, 0, 0);
    const p = closestPointOnSegment(new Vec3(3, 5, 0), a, b);
    assertClose(p.x, 3, 1e-6);
    assertClose(p.y, 0, 1e-6);
  });

  test('segmentSegmentDistance', () => {
    const out = segmentSegmentDistance(
      new Vec3(0, 0, 0), new Vec3(0, 0, 10),
      new Vec3(1, 0, 5), new Vec3(2, 0, 5),
    );
    assertClose(out.dist, 1);
  });
});

suite('geometry: frustum', () => {
  test('sphere in front of camera is inside frustum', () => {
    const viewProj = new Mat4()
      .makePerspective(Math.PI / 2, 1.5, 0.1, 100)
      .multiply(new Mat4().makeLookAt(new Vec3(0, 0, 10), new Vec3(0, 0, 0), new Vec3(0, 1, 0)));
    const f = new Frustum().setFromMatrix(viewProj);
    assert(f.intersectsSphere(new Vec3(0, 0, 0), 1));
    assert(!f.intersectsSphere(new Vec3(0, 0, -100), 1));
  });
});

suite('geometry: spatial hash', () => {
  test('insert and query', () => {
    const sh = new SpatialHash(4);
    const e1 = { x: 0, y: 0, z: 0 };
    const e2 = { x: 10, y: 0, z: 10 };
    sh.insert(e1, 0, 0, 0, 0.5);
    sh.insert(e2, 10, 0, 10, 0.5);
    const found = sh.query(0, 0, 2);
    assertEqual(found.length, 1);
    assertEqual(found[0], e1);
  });
});
