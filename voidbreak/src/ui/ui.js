/**
 * VOIDBREAK — UI manager.
 *
 * Owns the UI root element, the stylesheet, the screen stack and small DOM
 * helpers. All UI is built with plain DOM APIs (no framework).
 */

import { UI_CSS } from './css.js';
import { playSfx } from '../audio/sfx.js';
import { log } from '../core/profiler.js';

export function h(tag, className = '', text = '') {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v);
    else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
    else if (v !== undefined && v !== null) node.setAttribute(k, v);
  }
  for (const c of Array.isArray(children) ? children : [children]) {
    if (c) node.append(c);
  }
  return node;
}

export class UIManager {
  constructor(rootId = 'ui-root') {
    this.root = document.getElementById(rootId);
    this.style = document.createElement('style');
    this.style.textContent = UI_CSS;
    document.head.appendChild(this.style);
    this.root.classList.add('vb-root');
    this.screens = new Map();
    this.currentScreen = null;
    this.sfx = true;
    this.clickFx = () => {
      if (this.sfx) playSfx('ui.click', { vol: 0.4 });
    };
  }

  /** Enable pointer events on the root (menus need it). */
  setPointerActive(active) {
    this.root.classList.toggle('pointer-active', active);
  }

  addScreen(name, element) {
    element.classList.add('vb-screen');
    element.classList.add('vb-hidden');
    this.root.appendChild(element);
    this.screens.set(name, element);
    return element;
  }

  show(name) {
    const screen = this.screens.get(name);
    if (!screen) {
      log.warn('ui', `unknown screen "${name}"`);
      return null;
    }
    if (this.currentScreen) {
      this.currentScreen.classList.add('vb-hidden');
    }
    screen.classList.remove('vb-hidden');
    this.currentScreen = screen;
    this.setPointerActive(true);
    return screen;
  }

  hide(name) {
    const screen = this.screens.get(name);
    if (screen) {
      screen.classList.add('vb-hidden');
      if (this.currentScreen === screen) this.currentScreen = null;
    }
  }

  hideAllScreens() {
    for (const s of this.screens.values()) {
      s.classList.add('vb-hidden');
    }
    this.currentScreen = null;
    this.setPointerActive(false);
  }

  removeScreen(name) {
    const screen = this.screens.get(name);
    if (screen) {
      screen.remove();
      this.screens.delete(name);
    }
  }

  clearScreen(name) {
    const screen = this.screens.get(name);
    if (screen) screen.replaceChildren();
    return screen;
  }

  /** Show a temporary toast at the center. */
  toast(text, duration = 2200, opts = {}) {
    const t = h('div', 'vb-toast', text);
    t.style.color = opts.color ?? '';
    this.root.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => t.remove(), duration + 400);
    return t;
  }

  /** Toast near the top (notifications). */
  toast2(text, duration = 3000) {
    const t = h('div', 'vb-toast2', text);
    this.root.appendChild(t);
    setTimeout(() => t.remove(), duration + 400);
    return t;
  }

  button(label, onClick, opts = {}) {
    const btn = h('button', `vb-btn ${opts.className ?? ''}`, label);
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.sfx && opts.silent !== true) this.clickFx();
      onClick?.(e);
    });
    if (opts.disabled) btn.disabled = true;
    return btn;
  }

  destroy() {
    this.style.remove();
    this.root.replaceChildren();
  }
}

export const ui = new UIManager();
