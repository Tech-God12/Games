/**
 * VOIDBREAK — UI components.
 *
 * Reusable form controls built from the UI manager: sliders, toggles,
 * selects and keybind buttons. They update the Settings store and re-render
 * on change.
 */

import { h, el } from './ui.js';
import { settings } from '../core/settings.js';
import { keyDisplayName } from '../input/input.js';
import { playSfx } from '../audio/sfx.js';

export function SliderRow(label, key, opts = {}) {
  const value = settings.get(key);
  const display = h('span', 'desc', formatValue(key, value));
  const slider = el('input', {
    type: 'range', class: 'vb-slider', min: opts.min ?? 0, max: opts.max ?? 1, step: opts.step ?? 0.01,
    value: String(value),
    oninput: (e) => {
      const v = Number(e.target.value);
      settings.set(key, v);
      display.textContent = formatValue(key, v);
      opts.onChange?.(v);
    },
    onchange: () => playSfx('ui.hover', { vol: 0.2 }),
  });
  return el('div', { class: 'vb-row' }, [
    el('div', { class: 'vb-column' }, [
      el('label', {}, label),
      el('span', { class: 'desc' }, opts.desc ?? ''),
    ]),
    el('div', { class: 'vb-column', style: { alignItems: 'flex-end', gap: '6px' } }, [display, slider]),
  ]);
}

export function ToggleRow(label, key, opts = {}) {
  const knob = h('div', 'knob');
  const toggle = el('div', {
    class: `vb-toggle ${settings.get(key) ? 'on' : ''}`,
    onclick: () => {
      const next = !settings.get(key);
      settings.set(key, next);
      toggle.classList.toggle('on', next);
      playSfx('ui.click', { vol: 0.3 });
      opts.onChange?.(next);
    },
  }, knob);
  return el('div', { class: 'vb-row' }, [
    el('div', { class: 'vb-column' }, [
      el('label', {}, label),
      el('span', { class: 'desc' }, opts.desc ?? ''),
    ]),
    toggle,
  ]);
}

export function SelectRow(label, key, options, opts = {}) {
  const select = el('select', {
    class: 'vb-select',
    onchange: (e) => {
      settings.set(key, e.target.value);
      playSfx('ui.hover', { vol: 0.2 });
      opts.onChange?.(e.target.value);
    },
  }, options.map((o) => {
    const v = Array.isArray(o) ? o[0] : o;
    const label2 = Array.isArray(o) ? o[1] : o;
    const opt = h('option', '', label2);
    opt.value = v;
    if (v === settings.get(key)) opt.selected = true;
    return opt;
  }));
  return el('div', { class: 'vb-row' }, [
    el('div', { class: 'vb-column' }, [
      el('label', {}, label),
      el('span', { class: 'desc' }, opts.desc ?? ''),
    ]),
    select,
  ]);
}

export function KeybindRow(label, action, bindings, onRebind) {
  const current = bindings.get(action)?.[0] ?? '—';
  const btn = h('button', 'vb-keybind', keyDisplayName(current));
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (btn.dataset.listening) {
      btn.classList.remove('listening');
      delete btn.dataset.listening;
      btn.textContent = keyDisplayName(bindings.get(action)?.[0] ?? '—');
      return;
    }
    btn.classList.add('listening');
    btn.dataset.listening = '1';
    btn.textContent = 'PRESS KEY...';
    const onKey = (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      if (ev.code !== 'Escape') {
        onRebind(action, ev.code);
        btn.textContent = keyDisplayName(ev.code);
      }
      btn.classList.remove('listening');
      delete btn.dataset.listening;
      document.removeEventListener('keydown', onKey, true);
    };
    document.addEventListener('keydown', onKey, true);
  });
  return el('div', { class: 'vb-row' }, [
    el('label', {}, label),
    btn,
  ]);
}

function formatValue(key, v) {
  switch (key) {
    case 'fov': return `${Math.round(v)}°`;
    case 'sensitivity': return `${v.toFixed(2)}×`;
    case 'volumeMaster':
    case 'volumeSfx':
    case 'volumeMusic':
    case 'volumeAmbience': return `${Math.round(v * 100)}%`;
    case 'crosshairScale': return `${v.toFixed(1)}×`;
    case 'fpsCap': return `${v} FPS`;
    default: return String(v);
  }
}
