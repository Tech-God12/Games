import { clamp } from './math.js';

export class InputManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.keys = new Set();
    this.pressed = new Set();
    this.released = new Set();
    this.buttons = new Set();
    this.mouse = { x: innerWidth * .5, y: innerHeight * .5, dx: 0, dy: 0, inside: false };
    this.touch = { active: false, x: 0, y: 0, originX: 0, originY: 0, dx: 0, dy: 0 };
    this.bind();
  }
  bind() {
    addEventListener('keydown', event => {
      const key = event.key.toLowerCase();
      if (!this.keys.has(key)) this.pressed.add(key);
      this.keys.add(key);
      if ([' ', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) event.preventDefault();
    });
    addEventListener('keyup', event => {
      const key = event.key.toLowerCase();
      this.keys.delete(key);
      this.released.add(key);
    });
    addEventListener('blur', () => { this.keys.clear(); this.buttons.clear(); });
    this.canvas.addEventListener('mousemove', event => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = clamp(event.clientX - rect.left, 0, rect.width);
      this.mouse.y = clamp(event.clientY - rect.top, 0, rect.height);
      this.mouse.dx += event.movementX || 0;
      this.mouse.dy += event.movementY || 0;
      this.mouse.inside = true;
    });
    this.canvas.addEventListener('mouseenter', () => this.mouse.inside = true);
    this.canvas.addEventListener('mouseleave', () => this.mouse.inside = false);
    this.canvas.addEventListener('mousedown', event => { this.buttons.add(event.button); this.canvas.focus(); });
    addEventListener('mouseup', event => this.buttons.delete(event.button));
    this.canvas.addEventListener('contextmenu', event => event.preventDefault());
    this.canvas.addEventListener('touchstart', event => {
      const t = event.changedTouches[0]; const rect=this.canvas.getBoundingClientRect();
      this.touch.active=true; this.touch.originX=t.clientX-rect.left; this.touch.originY=t.clientY-rect.top; this.touch.x=this.touch.originX; this.touch.y=this.touch.originY;
    }, { passive: true });
    this.canvas.addEventListener('touchmove', event => {
      if (!this.touch.active) return; const t=event.changedTouches[0]; const rect=this.canvas.getBoundingClientRect(); this.touch.x=t.clientX-rect.left; this.touch.y=t.clientY-rect.top; this.touch.dx=this.touch.x-this.touch.originX; this.touch.dy=this.touch.y-this.touch.originY;
    }, { passive: true });
    this.canvas.addEventListener('touchend', () => { this.touch.active=false; this.touch.dx=0; this.touch.dy=0; });
  }
  isDown(key) { return this.keys.has(key.toLowerCase()); }
  wasPressed(key) { return this.pressed.has(key.toLowerCase()); }
  wasReleased(key) { return this.released.has(key.toLowerCase()); }
  isMouseDown(button = 0) { return this.buttons.has(button); }
  endFrame() { this.pressed.clear(); this.released.clear(); this.mouse.dx=0; this.mouse.dy=0; }
}
