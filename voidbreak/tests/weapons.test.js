/**
 * VOIDBREAK — weapon & combat tests.
 */

import {
  suite, test, assert, assertEqual, assertClose,
} from './framework.js';
import { computeDamage } from '../src/game/combat/damage.js';
import { Recoil } from '../src/game/weapons/recoil.js';
import { createWeapon, weaponExists, getAllWeaponIds } from '../src/game/weapons/weapon_db.js';
import { WEAPON_DEFS, STARTER_LOADOUT } from '../src/game/weapons/weapon_defs.js';
import { Vec3 } from '../src/core/vec3.js';

function makeFakeWorld() {
  const bus = { emit: () => {}, on: () => () => {} };
  return {
    bus,
    collision: { raycast: () => null },
    queryEnemies: () => [],
    spawnProjectile: (opts) => ({ opts }),
    time: 0,
  };
}

function makeOwner(world) {
  return { world, position: new Vec3(0, 0, 0) };
}

function makeFireCtx(overrides = {}) {
  return {
    origin: new Vec3(0, 1.6, 0),
    dir: new Vec3(0, 0, -1),
    right: new Vec3(1, 0, 0),
    onKick: () => {}, onMuzzleFlash: () => {}, onTracer: () => {},
    onHitEnemy: () => {}, onHitWorld: () => {}, onFired: () => {},
    onProjectileHit: () => {}, onMeleeSwing: () => {}, onChargeFire: () => {},
    rng: () => 0.5,
    time: 0,
    ...overrides,
  };
}

suite('damage model', () => {
  test('base damage', () => {
    const { amount } = computeDamage({ damage: 25, critChance: 0, falloffStart: 0, falloffEnd: 0 }, {});
    assertEqual(amount, 25);
  });

  test('falloff reduces damage with range', () => {
    const near = computeDamage({ damage: 100, critChance: 0, falloffStart: 10, falloffEnd: 50, falloffFactor: 0.5, range: 10 }, {});
    const far = computeDamage({ damage: 100, critChance: 0, falloffStart: 10, falloffEnd: 50, falloffFactor: 0.5, range: 50 }, {});
    assertEqual(near.amount, 100);
    assertClose(far.amount, 50, 0.01);
  });

  test('crits multiply', () => {
    const { amount, crit } = computeDamage({ damage: 50, critChance: 1, critMult: 2, falloffStart: 0, falloffEnd: 0 }, {});
    assert(crit);
    assertEqual(amount, 100);
  });

  test('headshots multiply', () => {
    const { amount, headshot } = computeDamage(
      { damage: 50, critChance: 0, headshotMult: 2.5, falloffStart: 0, falloffEnd: 0 },
      { isHead: true },
    );
    assert(headshot);
    assertEqual(amount, 125);
  });

  test('armor reduces; plasma ignores half', () => {
    const kin = computeDamage({ damage: 100, element: 'kinetic', critChance: 0, falloffStart: 0, falloffEnd: 0 }, { armor: 50 });
    const plas = computeDamage({ damage: 100, element: 'plasma', critChance: 0, falloffStart: 0, falloffEnd: 0 }, { armor: 50 });
    assertClose(kin.amount, 50, 0.01);
    assertClose(plas.amount, 75, 0.01);
  });

  test('shock bonus vs shields', () => {
    const shock = computeDamage({ damage: 100, element: 'shock', critChance: 0, falloffStart: 0, falloffEnd: 0 }, { shield: 50 });
    assertClose(shock.amount, 150, 0.01);
  });
});

suite('recoil', () => {
  test('kick accumulates and recovers', () => {
    const r = new Recoil({ vertical: 1, horizontal: 0.2, recovery: 10 });
    r.kick(() => 0.5);
    assert(r.pitch > 0.9 && r.pitch <= 1.1);
    for (let i = 0; i < 120; i++) r.update(1 / 120);
    assert(r.pitch < 0.01);
  });

  test('pattern shapes recoil per shot', () => {
    const r = new Recoil({ vertical: 1, horizontal: 0, randomHor: 0, pattern: [[1, 0], [2, 0]] });
    r.kick(() => 0.5);
    assertClose(r.pitch, 1, 0.01);
    r.kick(() => 0.5);
    assertClose(r.pitch, 3, 0.01);
  });
});

suite('weapon db', () => {
  test('all weapon ids exist and are unique', () => {
    const ids = getAllWeaponIds();
    assertEqual(new Set(ids).size, ids.length);
    for (const id of ids) {
      assert(weaponExists(id), `missing weapon ${id}`);
    }
  });

  test('starter loadout exists', () => {
    assertEqual(STARTER_LOADOUT.length, 2);
    for (const id of STARTER_LOADOUT) assert(weaponExists(id));
  });

  test('definitions are internally consistent', () => {
    for (const def of WEAPON_DEFS) {
      assert(def.damage > 0, `${def.id}: damage`);
      assert(def.fireRate > 0, `${def.id}: fireRate`);
      assert(def.reloadTime > 0, `${def.id}: reloadTime`);
      assert(def.magSize > 0 || def.infinite, `${def.id}: magSize`);
    }
  });
});

suite('weapon behavior', () => {
  test('hitscan fires and consumes ammo', () => {
    const world = makeFakeWorld();
    const owner = makeOwner(world);
    const w = createWeapon('voltaic', owner);
    const ctx = makeFireCtx();
    const ammoBefore = w.ammoInMag;
    w.fire(ctx);
    assertEqual(w.ammoInMag, ammoBefore - 1);
    assert(w.shotsFired === 1);
  });

  test('empty mag cannot fire', () => {
    const world = makeFakeWorld();
    const owner = makeOwner(world);
    const w = createWeapon('sidearm', owner);
    w.ammoInMag = 0;
    w.reserve = 10;
    const ctx = makeFireCtx();
    assertEqual(w.canFire(), false);
    w.fire(ctx);
    assertEqual(w.shotsFired, 0);
  });

  test('reload refills from reserve', () => {
    const world = makeFakeWorld();
    const owner = makeOwner(world);
    const w = createWeapon('voltaic', owner);
    w.ammoInMag = 0;
    w.reserve = 60;
    assert(w.startReload());
    let t = 0;
    while (w.reloading && t < 5) {
      w.update(1 / 60, { fire: false, ads: false, reload: false }, {});
      t += 1 / 60;
    }
    assert(!w.reloading);
    assertEqual(w.ammoInMag, w.magSize);
    assertEqual(w.reserve, 30);
  });

  test('projectile weapon spawns projectile', () => {
    const world = makeFakeWorld();
    const owner = makeOwner(world);
    const w = createWeapon('cryoshard', owner);
    const spawned = [];
    world.spawnProjectile = (opts) => { spawned.push(opts); return { opts }; };
    const ctx = makeFireCtx();
    w.fire(ctx);
    assertEqual(spawned.length, 1);
    assertEqual(spawned[0].damage, w.shotDamage());
    assertClose(spawned[0].speed, w.def.projectileSpeed);
  });

  test('melee weapon requires cooldown and damages in arc', () => {
    const world = makeFakeWorld();
    const owner = makeOwner(world);
    const w = createWeapon('battleaxe', owner);
    const target = {
      alive: true, radius: 0.5, height: 1.6, armor: 0, shield: 0,
      position: new Vec3(0, 0, -1.5),
      centerY: 0.8,
      boundsCenter: new Vec3(0, 0.8, -1.5),
      takeDamage: (amount) => { target.damageTaken = (target.damageTaken ?? 0) + amount; return amount; },
      isHeadshotAt: () => false,
    };
    world.queryEnemies = () => [target];
    const ctx = makeFireCtx({ origin: new Vec3(0, 1.6, 0), dir: new Vec3(0, 0, -1) });
    w.update(0, { fire: true, ads: false, reload: false }, ctx);
    w.update(0.1, { fire: false, ads: false, reload: false }, ctx);
    w.update(0.1, { fire: false, ads: false, reload: false }, ctx);
    assert(target.damageTaken > 0, 'melee should damage targets in arc');
  });
});
