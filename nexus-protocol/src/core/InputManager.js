// ============================================================================
// InputManager.js
// Unified input: keyboard, mouse (with pointer lock), mouse-wheel, and
// gamepad. Provides an action-mapping layer so gameplay code queries logical
// actions (e.g. "fire", "dash") instead of raw keys. Tracks edge transitions
// (pressed/released this frame), analog look delta, and emits high-level
// events on the bus. Configurable bindings, with per-action repeat/delay for
// hold-to-fire semantics.
// ============================================================================

import { bus, Channels } from './EventBus.js';
import { clamp } from './MathUtils.js';

/** Default key/mouse bindings to logical actions. */
export const DefaultBindings = {
  moveForward: ['KeyW', 'ArrowUp'],
  moveBack: ['KeyS', 'ArrowDown'],
  moveLeft: ['KeyA', 'ArrowLeft'],
  moveRight: ['KeyD', 'ArrowRight'],
  jump: ['Space'],
  dash: ['ShiftLeft', 'ShiftRight'],
  fire: ['Mouse0'],
  altFire: ['Mouse2'],
  reload: ['KeyR'],
  interact: ['KeyE', 'KeyF'],
  nextWeapon: ['WheelDown', 'KeyE'],
  prevWeapon: ['WheelUp', 'KeyQ'],
  weapon1: ['Digit1'],
  weapon2: ['Digit2'],
  weapon3: ['Digit3'],
  weapon4: ['Digit4'],
  ability1: ['KeyQ'],
  ability2: ['KeyF'],
  ability3: ['KeyV'],
  ult: ['KeyX'],
  pause: ['Escape'],
  toggleStats: ['F3'],
  toggleFullscreen: ['F11'],
  pickup: ['KeyG'],
  skip: ['Enter'],
};

export class InputManager {
  constructor(domElement = document.body, bindings = DefaultBindings) {
    this.dom = domElement;
    this.bindings = { ...bindings };
    // reverse map: source -> actions
    this._sourceToActions = new Map();
    this._rebuildReverse();

    /** currently-down sources */
    this._down = new Set();
    /** sources that went down this frame */
    this._pressed = new Set();
    /** sources that went up this frame */
    this._released = new Set();
    /** action repeat timers for hold semantics */
    this._repeat = new Map();

    this.pointerLocked = false;
    /** accumulated mouse look delta since last consume */
    this.lookDelta = { x: 0, y: 0 };
    /** smoothed look delta for nicer feel */
    this.lookSmooth = { x: 0, y: 0 };
    this.mouseSensitivity = 0.0022;
    this.mouseSensitivityY = 0.0022;
    this.invertY = false;
    this._wheel = 0;

    /** gamepad index to use (-1 = auto) */
    this.activeGamepad = -1;
    this.gamepadLook = { x: 0, y: 0 };
    this.gamepadMove = { x: 0, y: 0 };
    this._gpPrevButtons = new Map();

    this._enabled = true;
    this._listeners = [];
    this._attach();
  }

  _rebuildReverse() {
    this._sourceToActions.clear();
    for (const [action, sources] of Object.entries(this.bindings)) {
      for (const src of sources) {
        let list = this._sourceToActions.get(src);
        if (!list) { list = []; this._sourceToActions.set(src, list); }
        list.push(action);
      }
    }
  }

  _attach() {
    const add = (type, handler, opts) => {
      const target = (type === 'keydown' || type === 'keyup') ? window : this.dom;
      target.addEventListener(type, handler, opts);
      this._listeners.push({ target, type, handler, opts });
    };

    add('keydown', (e) => this._onKey(e, true), undefined);
    add('keyup', (e) => this._onKey(e, false), undefined);
    add('mousedown', (e) => this._onMouseButton(e, true), undefined);
    add('mouseup', (e) => this._onMouseButton(e, false), undefined);
    add('mousemove', (e) => this._onMouseMove(e), undefined);
    add('wheel', (e) => this._onWheel(e), { passive: true });
    add('contextmenu', (e) => { if (this.pointerLocked) e.preventDefault(); }, undefined);
    add('pointerlockchange', () => this._onPointerLockChange(), undefined);
    add('pointerlockerror', () => { console.warn('Pointer lock failed'); }, undefined);
  }

  _onKey(e, down) {
    if (!this._enabled) return;
    // Prevent default for game-relevant keys to avoid page scroll etc.
    if (this.bindings && this._isGameKey(e.code)) {
      if (e.code === 'Space' || e.code.startsWith('Arrow')) e.preventDefault();
    }
    if (down) {
      if (!this._down.has(e.code)) {
        this._down.add(e.code);
        this._pressed.add(e.code);
        this._emitActions(e.code, true);
      }
    } else {
      this._down.delete(e.code);
      this._released.add(e.code);
      this._emitActions(e.code, false);
    }
  }

  _isGameKey(code) {
    for (const sources of Object.values(this.bindings)) {
      if (sources.includes(code)) return true;
    }
    return false;
  }

  _onMouseButton(e, down) {
    if (!this._enabled) return;
    const src = 'Mouse' + e.button;
    if (down) {
      this._down.add(src);
      this._pressed.add(src);
      this._emitActions(src, true);
    } else {
      this._down.delete(src);
      this._released.add(src);
      this._emitActions(src, false);
    }
  }

  _onMouseMove(e) {
    if (this.pointerLocked) {
      this.lookDelta.x += e.movementX || 0;
      this.lookDelta.y += e.movementY || 0;
    }
  }

  _onWheel(e) {
    if (!this._enabled) return;
    this._wheel += Math.sign(e.deltaY);
    if (this._wheel !== 0) {
      const src = this._wheel > 0 ? 'WheelDown' : 'WheelUp';
      this._pressed.add(src);
      this._emitActions(src, true);
    }
  }

  _emitActions(src, down) {
    const actions = this._sourceToActions.get(src);
    if (!actions) return;
    for (const a of actions) bus.emit(Channels.InputAction, { action: a, down, source: src });
  }

  _onPointerLockChange() {
    this.pointerLocked = document.pointerLockElement === this.dom;
    bus.emit(Channels.InputPointerLock, { locked: this.pointerLocked });
    if (!this.pointerLocked) {
      this._down.clear();
    }
  }

  requestPointerLock() {
    if (!this.pointerLocked && this.dom.requestPointerLock) {
      this.dom.requestPointerLock();
    }
  }
  exitPointerLock() { if (document.exitPointerLock) document.exitPointerLock(); }

  // ---- Action query API ----

  /** True while any source bound to the action is held. */
  isDown(action) {
    const sources = this.bindings[action];
    if (!sources) return false;
    for (const s of sources) if (this._down.has(s)) return true;
    // gamepad fallback for movement axes handled separately
    return false;
  }

  /** True if the action was pressed this frame (edge). */
  pressed(action) {
    const sources = this.bindings[action];
    if (!sources) return false;
    for (const s of sources) if (this._pressed.has(s)) return true;
    return false;
  }

  /** True if the action was released this frame (edge). */
  released(action) {
    const sources = this.bindings[action];
    if (!sources) return false;
    for (const s of sources) if (this._released.has(s)) return true;
    return false;
  }

  /** Get analog movement vector from WASD in [-1,1] range on each axis. */
  moveAxis() {
    let x = 0, y = 0;
    if (this.isDown('moveForward')) y += 1;
    if (this.isDown('moveBack')) y -= 1;
    if (this.isDown('moveRight')) x += 1;
    if (this.isDown('moveLeft')) x -= 1;
    // blend with gamepad
    if (Math.abs(this.gamepadMove.x) > 0.01) x = this.gamepadMove.x;
    if (Math.abs(this.gamepadMove.y) > 0.01) y = -this.gamepadMove.y;
    const len = Math.hypot(x, y);
    if (len > 1) { x /= len; y /= len; }
    return { x, y };
  }

  /** Consume and return the accumulated look delta, then reset it. */
  consumeLook() {
    const dx = this.lookDelta.x * this.mouseSensitivity;
    const dy = this.lookDelta.y * this.mouseSensitivityY * (this.invertY ? -1 : 1);
    // add gamepad look
    const gx = this.gamepadLook.x * 0.06;
    const gy = this.gamepadLook.y * 0.06 * (this.invertY ? -1 : 1);
    this.lookDelta.x = 0; this.lookDelta.y = 0;
    return { x: dx + gx, y: dy + gy };
  }

  /** Called at the end of each frame to clear per-frame edge sets. */
  endFrame() {
    this._pressed.clear();
    this._released.clear();
    this._wheel = 0;
  }

  // ---- Gamepad ----
  updateGamepad() {
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    let pad = null;
    if (this.activeGamepad >= 0) pad = pads[this.activeGamepad];
    else { for (const p of pads) if (p) { pad = p; this.activeGamepad = p.index; break; } }
    if (!pad) { this.gamepadLook.x = 0; this.gamepadLook.y = 0; this.gamepadMove.x = 0; this.gamepadMove.y = 0; return; }

    const ax = (i) => { const v = pad.axes[i] || 0; return Math.abs(v) < 0.08 ? 0 : v; };
    this.gamepadLook.x = ax(2); this.gamepadLook.y = ax(3);
    this.gamepadMove.x = ax(0); this.gamepadMove.y = ax(1);

    // map face buttons to actions (Xbox layout: A=0,B=1,X=2,Y=3, LB=4,RB=5)
    const btn = (i) => pad.buttons[i] && pad.buttons[i].pressed;
    const prev = this._gpPrevButtons.get(pad.index) || new Array(16).fill(false);
    const fireAction = (idx, action, asSource) => {
      const now = btn(idx);
      if (now && !prev[idx]) { this._pressed.add(asSource); this._emitActions(asSource, true); this._down.add(asSource); }
      if (!now && prev[idx]) { this._released.add(asSource); this._emitActions(asSource, false); this._down.delete(asSource); }
      prev[idx] = now;
    };
    fireAction(0, 'fire', 'GP0');
    fireAction(2, 'altFire', 'GP2');
    fireAction(7, 'fire', 'GP7'); // right trigger (analog) — treat as fire when > 0.5
    this._gpPrevButtons.set(pad.index, prev);
  }

  setEnabled(v) { this._enabled = v; if (!v) this._down.clear(); }
  get enabled() { return this._enabled; }

  /** Rebind an action to new source(s). */
  rebind(action, sources) {
    this.bindings[action] = Array.isArray(sources) ? sources : [sources];
    this._rebuildReverse();
  }

  destroy() {
    for (const { target, type, handler, opts } of this._listeners) {
      target.removeEventListener(type, handler, opts);
    }
    this._listeners.length = 0;
  }
}
