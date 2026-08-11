// ============================================================================
// BehaviorTree.js
// A small, reusable behavior-tree framework: composite nodes (Sequence,
// Selector, Parallel), decorators (Inverter, Succeeder, Repeater, Cooldown,
// Condition), and leaf nodes (Action, Wait). Status codes PENDING/RUNNING/
// SUCCESS/FAILURE. Designed for enemy/boss AI authoring as an alternative to
// the hand-rolled state machines in Behaviors.js.
// ============================================================================

export const Status = Object.freeze({ Pending: 0, Running: 1, Success: 2, Failure: 3 });

export class Node { constructor() { this.status = Status.Pending; } tick(ctx) { this.status = Status.Success; return this.status; } reset() { this.status = Status.Pending; } }

export class Action extends Node {
  constructor(fn, name = 'Action') { super(); this.fn = fn; this.name = name; }
  tick(ctx) { this.status = this.fn(ctx) ? Status.Success : Status.Failure; return this.status; }
}

export class Wait extends Node {
  constructor(duration) { super(); this.duration = duration; this.t = 0; }
  tick(ctx) { this.t += ctx.dt; if (this.t >= this.duration) { this.status = Status.Success; this.t = 0; } else this.status = Status.Running; return this.status; }
  reset() { super.reset(); this.t = 0; }
}

export class Sequence extends Node {
  constructor(children = []) { super(); this.children = children; this.idx = 0; }
  tick(ctx) {
    for (; this.idx < this.children.length; this.idx++) {
      const s = this.children[this.idx].tick(ctx);
      if (s === Status.Running) { this.status = Status.Running; return s; }
      if (s === Status.Failure) { this.status = Status.Failure; this.reset(); return Status.Failure; }
    }
    this.status = Status.Success; this.reset(); return Status.Success;
  }
  reset() { super.reset(); this.idx = 0; for (const c of this.children) c.reset(); }
}

export class Selector extends Node {
  constructor(children = []) { super(); this.children = children; this.idx = 0; }
  tick(ctx) {
    for (; this.idx < this.children.length; this.idx++) {
      const s = this.children[this.idx].tick(ctx);
      if (s === Status.Running) { this.status = Status.Running; return s; }
      if (s === Status.Success) { this.status = Status.Success; this.reset(); return Status.Success; }
    }
    this.status = Status.Failure; this.reset(); return Status.Failure;
  }
  reset() { super.reset(); this.idx = 0; for (const c of this.children) c.reset(); }
}

export class Parallel extends Node {
  constructor(children = [], policy = 'all') { super(); this.children = children; this.policy = policy; }
  tick(ctx) {
    let succ = 0, fail = 0;
    for (const c of this.children) { const s = c.tick(ctx); if (s === Status.Success) succ++; if (s === Status.Failure) fail++; }
    if (this.policy === 'all') { if (fail > 0) return Status.Failure; if (succ === this.children.length) return Status.Success; }
    else { if (succ > 0) return Status.Success; if (fail === this.children.length) return Status.Failure; }
    return Status.Running;
  }
  reset() { super.reset(); for (const c of this.children) c.reset(); }
}

export class Inverter extends Node { constructor(c) { super(); this.c = c; } tick(ctx) { const s = this.c.tick(ctx); this.status = s === Status.Success ? Status.Failure : (s === Status.Failure ? Status.Success : s); return this.status; } reset() { super.reset(); this.c.reset(); } }
export class Succeeder extends Node { constructor(c) { super(); this.c = c; } tick(ctx) { this.c.tick(ctx); this.status = Status.Success; return this.status; } reset() { super.reset(); this.c.reset(); } }
export class Repeater extends Node { constructor(c, n = -1) { super(); this.c = c; this.n = n; this.i = 0; } tick(ctx) { if (this.n < 0) { this.c.tick(ctx); this.status = Status.Running; return this.status; } for (; this.i < this.n; this.i++) { const s = this.c.tick(ctx); if (s === Status.Running) { this.status = Status.Running; return s; } } this.status = Status.Success; this.i = 0; return this.status; } reset() { super.reset(); this.i = 0; this.c.reset(); } }

export class Cooldown extends Node {
  constructor(c, duration) { super(); this.c = c; this.duration = duration; this.t = 0; }
  tick(ctx) { this.t -= ctx.dt; if (this.t > 0) { this.status = Status.Failure; return this.status; } const s = this.c.tick(ctx); if (s === Status.Success || s === Status.Failure) this.t = this.duration; this.status = s; return s; }
  reset() { super.reset(); this.t = 0; this.c.reset(); }
}

export class Condition extends Node {
  constructor(check, child) { super(); this.check = check; this.c = child; }
  tick(ctx) { if (!this.check(ctx)) { this.status = Status.Failure; return this.status; } this.status = this.c.tick(ctx); return this.status; }
  reset() { super.reset(); if (this.c) this.c.reset(); }
}

export class BehaviorTree {
  constructor(root) { this.root = root; this.ctx = {}; }
  tick(ctx) { Object.assign(this.ctx, ctx); return this.root.tick(this.ctx); }
  reset() { this.root.reset(); }
}

/** Build a typical combatant tree from high-level options (reusable factory). */
export function buildCombatantTree(opts = {}) {
  const atkRange = opts.attackRange || 8;
  const preferred = opts.preferredRange || 6;
  return new Selector([
    new Condition((c) => c.dist < 2.5, new Action((c) => { c.body.vel.x *= 0.6; c.body.vel.z *= 0.6; return true; }, 'halt')),
    new Condition((c) => c.dist > atkRange, new Action((c) => { c.seek(c.target); return true; }, 'approach')),
    new Condition((c) => c.dist < preferred - 2, new Action((c) => { c.flee(c.target); return true; }, 'backoff')),
    new Sequence([
      new Action((c) => { c.strafe(); return true; }, 'strafe'),
      new Cooldown(new Action((c) => c.attack(), 'attack'), opts.attackCooldown || 1.5),
    ]),
  ]);
}
