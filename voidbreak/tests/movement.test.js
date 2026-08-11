/**
 * VOIDBREAK — player movement kinematics tests.
 */

import {
  suite, test, assert, assertEqual, assertClose, assertInRange,
} from './framework.js';
import { stepPlayer } from '../src/game/player/movement.js';

const P = {
  walkSpeed: 4.2,
  runSpeed: 6.4,
  crouchSpeed: 2.2,
  groundAccel: 55,
  airAccel: 9,
  airMaxSpeedFactor: 1.05,
  friction: 10,
  gravity: 22,
  jumpSpeed: 7.4,
  coyoteTime: 0.12,
  jumpBuffer: 0.15,
  floorY: 0,
  crouchJump: true,
  dashSpeed: 16,
  dashDuration: 0.16,
  dashCooldown: 1.1,
  dashEndFactor: 0.35,
};

function baseState() {
  return {
    px: 0, py: 0, pz: 0,
    vx: 0, vy: 0, vz: 0,
    grounded: true,
    coyote: 0, buffer: 0,
    crouch: 0, sprint: 0,
    dashTimer: 0, dashCooldown: 0,
    dashDirX: 0, dashDirZ: 0,
    landed: false, jumped: false, dashed: false,
    vyLand: 0,
  };
}

suite('movement: ground', () => {
  test('accelerates to walk speed', () => {
    let s = baseState();
    for (let i = 0; i < 240; i++) {
      s = stepPlayer(s, { x: 1, y: 0, z: 0, jump: false, crouch: false, sprint: false, dash: false }, P, 1 / 120);
    }
    assertClose(Math.hypot(s.vx, s.vz), P.walkSpeed, 0.01);
    assertInRange(s.px, P.walkSpeed * 2 - 0.35, P.walkSpeed * 2);
  });

  test('friction stops the player', () => {
    let s = baseState();
    s.vx = 4;
    for (let i = 0; i < 120; i++) {
      s = stepPlayer(s, { x: 0, y: 0, z: 0, jump: false, crouch: false, sprint: false, dash: false }, P, 1 / 120);
    }
    assertClose(Math.hypot(s.vx, s.vz), 0, 0.01);
  });

  test('sprint is faster than walk', () => {
    let s = baseState();
    for (let i = 0; i < 240; i++) {
      s = stepPlayer(s, { x: 1, y: 0, z: 0, jump: false, crouch: false, sprint: true, dash: false }, P, 1 / 120);
    }
    assertClose(Math.hypot(s.vx, s.vz), P.runSpeed, 0.01);
  });

  test('crouch is slower', () => {
    let s = baseState();
    for (let i = 0; i < 240; i++) {
      s = stepPlayer(s, { x: 1, y: 0, z: 0, jump: false, crouch: true, sprint: false, dash: false }, P, 1 / 120);
    }
    assertClose(Math.hypot(s.vx, s.vz), P.crouchSpeed, 0.01);
  });

  test('stays grounded on flat floor', () => {
    let s = baseState();
    for (let i = 0; i < 60; i++) {
      s = stepPlayer(s, { x: 0, y: 0, z: 0, jump: false, crouch: false, sprint: false, dash: false }, P, 1 / 120);
    }
    assert(s.grounded);
    assertClose(s.py, 0, 1e-9);
  });
});

suite('movement: jumping', () => {
  test('jump leaves the ground and returns', () => {
    let s = baseState();
    s = stepPlayer(s, { x: 0, y: 0, z: 0, jump: true, crouch: false, sprint: false, dash: false }, P, 1 / 120);
    assert(s.jumped);
    assert(!s.grounded);
    let maxH = 0;
    let total = 0;
    while (s.py > 0 || s.vy > 0) {
      s = stepPlayer(s, { x: 0, y: 0, z: 0, jump: false, crouch: false, sprint: false, dash: false }, P, 1 / 120);
      maxH = Math.max(maxH, s.py);
      total++;
      if (total > 1200) break;
    }
    assertClose(maxH, (P.jumpSpeed * P.jumpSpeed) / (2 * P.gravity), 0.05);
    assertClose(s.py, 0, 0.01);
    assert(s.grounded);
  });

  test('jump buffering: press before landing still jumps', () => {
    let s = baseState();
    s.grounded = false;
    s.py = 1.5;
    s.vy = 0;
    for (let i = 0; i < 12; i++) {
      s = stepPlayer(s, { x: 0, y: 0, z: 0, jump: true, crouch: false, sprint: false, dash: false }, P, 1 / 120);
    }
    for (let i = 0; i < 8; i++) {
      s = stepPlayer(s, { x: 0, y: 0, z: 0, jump: false, crouch: false, sprint: false, dash: false }, P, 1 / 120);
    }
    assert(s.py > 0.1, 'should have jumped off the ground');
  });

  test('coyote time: jump just after leaving ledge', () => {
    let s = baseState();
    s.grounded = false;
    s.py = 0.02;
    s.coyote = 0.12;
    s = stepPlayer(s, { x: 0, y: 0, z: 0, jump: true, crouch: false, sprint: false, dash: false }, P, 1 / 120);
    assert(s.jumped);
    assert(!s.grounded);
  });
});

suite('movement: air control', () => {
  test('air velocity preserved', () => {
    let s = baseState();
    s.grounded = false;
    s.py = 2;
    s.vx = 3;
    const before = Math.hypot(s.vx, s.vz);
    s = stepPlayer(s, { x: 0, y: 0, z: 0, jump: false, crouch: false, sprint: false, dash: false }, P, 1 / 120);
    const after = Math.hypot(s.vx, s.vz);
    assertClose(before, after, 0.0001);
  });

  test('air control is weak', () => {
    let s = baseState();
    s.grounded = false;
    s.py = 2;
    for (let i = 0; i < 60; i++) {
      s = stepPlayer(s, { x: 1, y: 0, z: 0, jump: false, crouch: false, sprint: false, dash: false }, P, 1 / 120);
    }
    assertInRange(Math.hypot(s.vx, s.vz), 0, P.walkSpeed * 1.2);
  });
});

suite('movement: dash', () => {
  test('dash boosts speed then decays', () => {
    let s = baseState();
    s = stepPlayer(s, { x: 1, y: 0, z: 0, jump: false, crouch: false, sprint: false, dash: true }, P, 1 / 120);
    assert(s.dashed);
    assert(s.dashTimer > 0);
    for (let i = 0; i < 5; i++) {
      s = stepPlayer(s, { x: 0, y: 0, z: 0, jump: false, crouch: false, sprint: false, dash: false }, P, 1 / 120);
    }
    assertClose(Math.hypot(s.vx, s.vz), P.dashSpeed, 0.5);
    for (let i = 0; i < 120; i++) {
      s = stepPlayer(s, { x: 0, y: 0, z: 0, jump: false, crouch: false, sprint: false, dash: true }, P, 1 / 120);
    }
    assert(!s.dashed);
    assertInRange(Math.hypot(s.vx, s.vz), 0, P.runSpeed * 1.2);
  });
});
