/**
 * VOIDBREAK — Input.
 *
 * Unified input: keyboard, mouse (pointer lock), scroll wheel and gamepad,
 * mapped to named actions with rebindable keys. The manager owns per-frame
 * state (held / just pressed / just released / consumed) and exposes it to
 * the game deterministically.
 */

import { log } from '../core/profiler.js';

export const Actions = {
  MOVE_FORWARD: 'move_forward',
  MOVE_BACK: 'move_back',
  MOVE_LEFT: 'move_left',
  MOVE_RIGHT: 'move_right',
  JUMP: 'jump',
  CROUCH: 'crouch',
  SPRINT: 'sprint',
  DASH: 'dash',
  FIRE: 'fire',
  ADS: 'ads',
  RELOAD: 'reload',
  MELEE: 'melee',
  INTERACT: 'interact',
  NEXT_WEAPON: 'next_weapon',
  PREV_WEAPON: 'prev_weapon',
  WEAPON_1: 'weapon_1',
  WEAPON_2: 'weapon_2',
  WEAPON_3: 'weapon_3',
  WEAPON_4: 'weapon_4',
  WEAPON_5: 'weapon_5',
  WEAPON_6: 'weapon_6',
  WEAPON_7: 'weapon_7',
  WEAPON_8: 'weapon_8',
  PAUSE: 'pause',
  CONSOLE: 'console',
  USE_UPGRADE_1: 'upgrade_1',
  USE_UPGRADE_2: 'upgrade_2',
  USE_UPGRADE_3: 'upgrade_3',
  USE_UPGRADE_4: 'upgrade_4',
  TOGGLE_MINIMAP: 'toggle_minimap',
  TOGGLE_HUD: 'toggle_hud',
  SCREENSHOT: 'screenshot',
  CYCLE_FIRE_MODE: 'cycle_fire_mode',
};

/** Default key bindings (action → keys). Keys are KeyboardEvent.code values. */
export const DEFAULT_BINDINGS = {
  [Actions.MOVE_FORWARD]: ['KeyW', 'ArrowUp'],
  [Actions.MOVE_BACK]: ['KeyS', 'ArrowDown'],
  [Actions.MOVE_LEFT]: ['KeyA', 'ArrowLeft'],
  [Actions.MOVE_RIGHT]: ['KeyD', 'ArrowRight'],
  [Actions.JUMP]: ['Space'],
  [Actions.CROUCH]: ['KeyC', 'ControlLeft'],
  [Actions.SPRINT]: ['ShiftLeft', 'ShiftRight'],
  [Actions.DASH]: ['KeyX'],
  [Actions.FIRE]: ['Mouse0'],
  [Actions.ADS]: ['Mouse2'],
  [Actions.RELOAD]: ['KeyR'],
  [Actions.MELEE]: ['KeyV'],
  [Actions.INTERACT]: ['KeyE'],
  [Actions.NEXT_WEAPON]: ['KeyQ'],
  [Actions.PREV_WEAPON]: ['KeyZ'],
  [Actions.WEAPON_1]: ['Digit1'],
  [Actions.WEAPON_2]: ['Digit2'],
  [Actions.WEAPON_3]: ['Digit3'],
  [Actions.WEAPON_4]: ['Digit4'],
  [Actions.WEAPON_5]: ['Digit5'],
  [Actions.WEAPON_6]: ['Digit6'],
  [Actions.WEAPON_7]: ['Digit7'],
  [Actions.WEAPON_8]: ['Digit8'],
  [Actions.PAUSE]: ['Escape'],
  [Actions.CONSOLE]: ['Backquote'],
  [Actions.USE_UPGRADE_1]: ['Digit1'],
  [Actions.USE_UPGRADE_2]: ['Digit2'],
  [Actions.USE_UPGRADE_3]: ['Digit3'],
  [Actions.USE_UPGRADE_4]: ['Digit4'],
  [Actions.TOGGLE_MINIMAP]: ['KeyM'],
  [Actions.TOGGLE_HUD]: ['KeyH'],
  [Actions.SCREENSHOT]: ['F12'],
  [Actions.CYCLE_FIRE_MODE]: ['KeyB'],
};

const KEY_NAMES = {
  Space: 'Space', ShiftLeft: 'L-Shift', ShiftRight: 'R-Shift', ControlLeft: 'Ctrl',
  ControlRight: 'R-Ctrl', AltLeft: 'Alt', AltRight: 'R-Alt', Escape: 'Esc',
  Backquote: '`', KeyW: 'W', KeyA: 'A', KeyS: 'S', KeyD: 'D', KeyQ: 'Q', KeyE: 'E',
  KeyR: 'R', KeyV: 'V', KeyC: 'C', KeyX: 'X', KeyZ: 'Z', KeyM: 'M', KeyH: 'H',
  KeyB: 'B', ArrowUp: '↑', ArrowDown: '↓', ArrowLeft: '←', ArrowRight: '→',
};

export function keyDisplayName(code) {
  if (KEY_NAMES[code]) return KEY_NAMES[code];
  if (code.startsWith('Digit')) return code.slice(5);
  if (code.startsWith('Key')) return code.slice(3);
  if (code.startsWith('Mouse')) return `Mouse ${code.slice(5)}`;
  return code;
}

export class InputManager {
  constructor(target = window, opts = {}) {
    this.target = target;
    this.bindings = new Map(Object.entries(DEFAULT_BINDINGS));
    this.held = new Map();
    this.pressed = new Map();
    this.released = new Map();
    this.sensitivity = 1;
    this.invertY = false;
    this.enabled = true;

    this.keys = new Set();
    this.mouseButtons = new Set();
    this.mouseDX = 0;
    this.mouseDY = 0;
    this.mouseWheel = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.pointerLocked = false;

    this.gamepads = [];
    this._handlers = [];
    this._lockChangeHandler = null;
    this._onLockChange = null;
    this.allowReLock = true;

    this._attach();
  }

  _attach() {
    const d = document;
    const on = (el, ev, fn, opts = {}) => {
      el.addEventListener(ev, fn, opts);
      this._handlers.push([el, ev, fn, opts]);
    };

    on(d, 'keydown', (e) => this._onKeyDown(e));
    on(d, 'keyup', (e) => this._onKeyUp(e));
    on(d, 'mousedown', (e) => this._onMouseDown(e));
    on(d, 'mouseup', (e) => this._onMouseUp(e));
    on(d, 'mousemove', (e) => this._onMouseMove(e));
    on(d, 'wheel', (e) => { this.mouseWheel += e.deltaY; }, { passive: true });
    on(d, 'contextmenu', (e) => e.preventDefault());

    this._lockChangeHandler = () => {
      this.pointerLocked = document.pointerLockElement === this.target;
      if (!this.pointerLocked) {
        this.mouseButtons.clear();
        this._releaseAll();
      }
      this._onLockChange?.(this.pointerLocked);
    };
    on(d, 'pointerlockchange', this._lockChangeHandler);
  }

  destroy() {
    for (const [el, ev, fn, opts] of this._handlers) {
      el.removeEventListener(ev, fn, opts);
    }
    this._handlers = [];
  }

  // ------------------------------------------------------------ pointer lock

  requestPointerLock() {
    if (!this.pointerLocked && this.target?.requestPointerLock) {
      try {
        const p = this.target.requestPointerLock();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      } catch { /* ignored */ }
    }
  }

  exitPointerLock() {
    if (document.pointerLockElement) document.exitPointerLock();
  }

  setLockChangeHandler(fn) {
    this._onLockChange = fn;
  }

  // ------------------------------------------------------------ raw events

  _onKeyDown(e) {
    if (!this.enabled) return;
    this.keys.add(e.code);
    e.preventDefault?.();
  }

  _onKeyUp(e) {
    this.keys.delete(e.code);
  }

  _onMouseDown(e) {
    if (!this.enabled) return;
    this.mouseButtons.add(`Mouse${e.button}`);
    if (e.button === 0 && !this.pointerLocked && this.allowReLock) {
      this.requestPointerLock();
    }
  }

  _onMouseUp(e) {
    this.mouseButtons.delete(`Mouse${e.button}`);
  }

  _onMouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    if (this.pointerLocked) {
      this.mouseDX += e.movementX;
      this.mouseDY += e.movementY;
    }
  }

  // ------------------------------------------------------------ frame update

  /** Call once per frame (or fixed step) to settle input state. */
  update(dt) {
    void dt;
    this.pressed.clear();
    this.released.clear();
    this.mouseDX = 0;
    this.mouseDY = 0;
    this.mouseWheel = 0;

    this._pollGamepads();

    for (const [action, codes] of this.bindings) {
      let down = false;
      for (const code of codes) {
        if (code.startsWith('Mouse')) {
          if (this.mouseButtons.has(code)) down = true;
        } else if (code.startsWith('Pad')) {
          const [axis] = parsePadCode(code);
          if (axis === null) {
            if (this._padButton(code)) down = true;
          } else {
            const v = this._padAxis(axis);
            if (Math.abs(v) > 0.35) down = true;
          }
        } else if (this.keys.has(code)) {
          down = true;
        }
        if (down) break;
      }
      const wasHeld = this.held.get(action) ?? false;
      if (down && !wasHeld) this.pressed.set(action, true);
      if (!down && wasHeld) this.released.set(action, true);
      this.held.set(action, down);
    }
  }

  _padButton(code) {
    const m = code.match(/^Pad(\d+)$/);
    if (!m) return false;
    const idx = Number(m[1]);
    const gp = this.gamepads[0];
    if (!gp || gp.buttons[idx] === undefined) return false;
    return gp.buttons[idx].pressed;
  }

  _padAxis(axisIdx) {
    const gp = this.gamepads[0];
    if (!gp || gp.axes[axisIdx] === undefined) return 0;
    const v = gp.axes[axisIdx];
    return Math.abs(v) < 0.12 ? 0 : v;
  }

  _pollGamepads() {
    if (typeof navigator.getGamepads === 'function') {
      this.gamepads = navigator.getGamepads().filter(Boolean);
    }
  }

  _releaseAll() {
    for (const [action] of this.bindings) {
      this.released.set(action, true);
      this.held.set(action, false);
    }
  }

  // ------------------------------------------------------------ queries

  isDown(action) {
    return this.held.get(action) ?? false;
  }

  wasPressed(action) {
    return this.pressed.get(action) ?? false;
  }

  wasReleased(action) {
    return this.released.get(action) ?? false;
  }

  /** Consume a press so wasPressed returns false later in the frame. */
  consume(action) {
    this.pressed.set(action, false);
  }

  /** Axis values for movement actions. */
  moveAxis() {
    let x = 0;
    let y = 0;
    if (this.isDown(Actions.MOVE_FORWARD)) y += 1;
    if (this.isDown(Actions.MOVE_BACK)) y -= 1;
    if (this.isDown(Actions.MOVE_LEFT)) x -= 1;
    if (this.isDown(Actions.MOVE_RIGHT)) x += 1;
    const gx = this._padAxis(0);
    const gy = this._padAxis(1);
    if (Math.abs(gx) > 0.01) x += gx;
    if (Math.abs(gy) > 0.01) y -= gy;
    const len = Math.hypot(x, y);
    if (len > 1) {
      x /= len;
      y /= len;
    }
    return { x, y };
  }

  /** Mouse look deltas scaled by sensitivity. */
  lookDelta() {
    let dx = this.mouseDX * this.sensitivity;
    let dy = this.mouseDY * this.sensitivity;
    const rx = this._padAxis(2);
    const ry = this._padAxis(3);
    dx += rx * 3.2;
    dy += ry * 3.2;
    if (this.invertY) dy = -dy;
    return { dx, dy };
  }

  /** Apply rebindings from the settings store format. */
  loadBindings(map) {
    if (!map || typeof map !== 'object') return;
    for (const [action, codes] of Object.entries(map)) {
      if (Array.isArray(codes) && this.bindings.has(action)) {
        this.bindings.set(action, codes.slice(0, 4));
      }
    }
  }

  exportBindings() {
    return Object.fromEntries(this.bindings);
  }

  get gamepadConnected() {
    return this.gamepads.length > 0;
  }

  get gamepad() {
    return this.gamepads[0] ?? null;
  }

  /** Rumble support (if gamepad supports vibration). */
  vibrate(intensity = 0.5, ms = 120) {
    const gp = this.gamepads[0];
    if (gp?.vibrationActuator) {
      try {
        gp.vibrationActuator.playEffect('dual-rumble', {
          startDelay: 0,
          duration: ms,
          weakMagnitude: intensity * 0.4,
          strongMagnitude: intensity,
        });
      } catch { /* ignore */ }
    }
  }
}

function parsePadCode(code) {
  const m = code.match(/^PadAxis(\d+)$/);
  if (m) return [Number(m[1])];
  return [null];
}

export const input = new InputManager();
