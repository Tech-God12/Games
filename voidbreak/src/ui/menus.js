/**
 * VOIDBREAK — Menu screens.
 *
 * Main menu, settings, pause, controls and difficulty select. Screens are
 * registered with the UIManager by name and built on demand.
 */

import { h, el, ui } from './ui.js';
import { SliderRow, ToggleRow, SelectRow, KeybindRow } from './components.js';
import { settings } from '../core/settings.js';
import { DIFFICULTIES, MODES, GAME_TITLE, GAME_SUBTITLE, GAME_VERSION } from '../core/constants.js';
import { records } from '../game/meta/records.js';
import { achievements } from '../game/meta/achievements.js';

/** Register all menu screens with the UI manager. */
export function registerMenus(game) {
  ui.addScreen('main', buildMainMenu(game));
  ui.addScreen('settings', buildSettingsMenu(game));
  ui.addScreen('pause', buildPauseMenu(game));
  ui.addScreen('controls', buildControlsMenu(game));
  ui.addScreen('difficulty', buildDifficultyMenu(game));
  ui.addScreen('mode', buildModeMenu(game));
}

function menuShell(game, opts = {}) {
  const panel = h('div', `vb-panel vb-menu ${opts.wide ? 'wide' : ''}`);
  if (opts.title) panel.append(h('div', 'menu-title', opts.title));
  if (opts.subtitle) panel.append(h('div', 'menu-sub', opts.subtitle));
  if (opts.back) {
    const backRow = h('div', 'vb-row');
    backRow.append(ui.button('← BACK', () => game.showScreen(opts.back), { className: 'small', silent: true }));
    panel.append(backRow);
  }
  return panel;
}

// ------------------------------------------------------------------ main

function buildMainMenu(game) {
  const panel = menuShell(game, { title: GAME_TITLE, subtitle: GAME_SUBTITLE });
  const actions = h('div', 'vb-menu-actions');
  actions.append(
    ui.button('▶ DEPLOY', () => game.showScreen('mode'), { className: 'primary big' }),
    ui.button('ARMORY', () => game.showScreen('armory'), { silent: true }),
    ui.button('ACHIEVEMENTS', () => game.showScreen('achievements'), { silent: true }),
    ui.button('RECORDS', () => game.showScreen('records'), { silent: true }),
    ui.button('SETTINGS', () => game.showScreen('settings'), { silent: true }),
    ui.button('CONTROLS', () => game.showScreen('controls'), { silent: true }),
  );
  panel.append(actions);

  const footer = h('div', 'vb-footer');
  const best = records.data;
  footer.textContent = `BEST WAVE ${best.bestWave} · BEST SCORE ${best.bestScore.toLocaleString()} · WINS ${best.totalWins} · ACHIEVEMENTS ${achievements.unlockedCount}/${achievements.totalCount}`;
  panel.append(footer, h('div', 'vb-footer', `v${GAME_VERSION} — fully procedural · zero assets`));
  return panel;
}

// ------------------------------------------------------------------ mode

function buildModeMenu(game) {
  const panel = menuShell(game, { title: 'DEPLOY', subtitle: 'SELECT OPERATION', back: 'main' });

  const modes = [
    [MODES.endless, 'ENDLESS PROTOCOL', 'Survive as long as you can. Upgrades every wave. The classic breach experience.'],
    [MODES.blitz, 'BLITZ', '10 brutal waves. Faster spawns, bigger budgets, double rewards.'],
    [MODES.crucible, 'CRUCIBLE', '15 waves. Elite-heavy composition. A gauntlet for veterans.'],
    [MODES.practice, 'PRACTICE RANGE', 'No waves. Targets, weapons, zero pressure. Warm up.'],
  ];
  const list = h('div', 'vb-column', { style: { gap: '8px', margin: '10px 0' } });
  for (const [id, name, desc] of modes) {
    const row = h('div', 'vb-row');
    row.style.cursor = 'pointer';
    const col = h('div', 'vb-column');
    col.append(el('label', { style: { fontSize: '15px', fontWeight: '700', letterSpacing: '2px' } }, name), el('span', { class: 'desc' }, desc));
    row.append(col, h('span', 'vb-btn small', 'SELECT →'));
    row.addEventListener('click', () => {
      ui.clickFx();
      game.selectedMode = id;
      if (id === MODES.practice) {
        game.startRun('practice', 'operative');
      } else {
        game.showScreen('difficulty');
      }
    });
    list.append(row);
  }
  panel.append(list);
  return panel;
}

// ------------------------------------------------------------------ difficulty

function buildDifficultyMenu(game) {
  const panel = menuShell(game, { title: 'DIFFICULTY', subtitle: 'ASSESS THREAT LEVEL', back: 'mode' });
  const list = h('div', 'vb-column', { style: { gap: '8px', margin: '10px 0' } });
  for (const [id, diff] of Object.entries(DIFFICULTIES)) {
    const row = h('div', 'vb-row');
    row.style.cursor = 'pointer';
    const col = h('div', 'vb-column');
    col.append(el('label', { style: { fontSize: '15px', fontWeight: '700', letterSpacing: '2px' } }, diff.label), el('span', { class: 'desc' }, diff.desc));
    row.append(col, h('span', 'vb-btn small', 'DEPLOY →'));
    row.addEventListener('click', () => {
      ui.clickFx();
      game.startRun(game.selectedMode, id);
    });
    list.append(row);
  }
  panel.append(list);
  return panel;
}

// ------------------------------------------------------------------ settings

function buildSettingsMenu(game) {
  const panel = menuShell(game, { title: 'SETTINGS', subtitle: 'SYSTEM CONFIGURATION', back: 'main' });
  const body = h('div');

  const sections = [
    ['DISPLAY', [
      SliderRow('Field of View', 'fov', { min: 60, max: 110, step: 1 }),
      SelectRow('Quality', 'quality', [['low', 'LOW'], ['medium', 'MEDIUM'], ['high', 'HIGH'], ['ultra', 'ULTRA']]),
      ToggleRow('Show FPS', 'showFps'),
      ToggleRow('Minimap', 'showMinimap'),
      SelectRow('Colorblind Filter', 'colorblind', [['none', 'NONE'], ['protanopia', 'PROTANOPIA'], ['deuteranopia', 'DEUTERANOPIA'], ['tritanopia', 'TRITANOPIA']]),
    ]],
    ['CONTROLS', [
      SliderRow('Mouse Sensitivity', 'sensitivity', { min: 0.05, max: 5, step: 0.05 }),
      ToggleRow('Invert Y', 'invertY'),
      SliderRow('ADS Sensitivity Scale', 'zoomSensitivityScale', { min: 0.1, max: 1, step: 0.05 }),
      ToggleRow('Screen Shake', 'screenShake'),
      ToggleRow('Head-bob', 'headbob'),
      ToggleRow('Weapon Sway', 'weaponSway'),
    ]],
    ['AUDIO', [
      SliderRow('Master Volume', 'volumeMaster'),
      SliderRow('SFX Volume', 'volumeSfx'),
      SliderRow('Music Volume', 'volumeMusic'),
      SliderRow('Ambience Volume', 'volumeAmbience'),
    ]],
    ['GAMEPLAY / UI', [
      ToggleRow('Damage Numbers', 'damageNumbers'),
      ToggleRow('Hitmarker', 'hitmarker'),
      ToggleRow('Killfeed', 'showKillfeed'),
      SelectRow('Crosshair', 'crosshairStyle', [['dynamic', 'DYNAMIC'], ['static', 'STATIC'], ['dot', 'DOT'], ['none', 'NONE']]),
      SliderRow('Crosshair Scale', 'crosshairScale', { min: 0.5, max: 2, step: 0.1 }),
    ]],
  ];

  for (const [title, rows] of sections) {
    body.append(h('div', 'vb-section-title', title));
    for (const row of rows) body.append(row);
  }

  const reset = h('div', 'vb-row');
  reset.append(h('span', 'desc', 'Restore all defaults'));
  reset.append(ui.button('RESET', () => {
    settings.reset();
    game.applySettings?.();
  }, { className: 'small danger' }));
  body.append(reset);
  panel.append(body);
  return panel;
}

// ------------------------------------------------------------------ pause

function buildPauseMenu(game) {
  const panel = menuShell(game, { title: 'PAUSED', subtitle: 'SYSTEMS SUSPENDED' });
  const actions = h('div', 'vb-menu-actions');
  actions.append(
    ui.button('RESUME', () => game.resumeGame(), { className: 'primary' }),
    ui.button('SETTINGS', () => game.showScreen('settings'), { silent: true }),
    ui.button('CONTROLS', () => game.showScreen('controls'), { silent: true }),
    ui.button('ABANDON RUN', () => game.abandonRun(), { className: 'danger', silent: true }),
  );
  panel.append(actions);
  const info = h('div', 'vb-footer');
  const d = game.director;
  info.textContent = d ? `WAVE ${d.currentWave} · SCORE ${game.score.total.toLocaleString()}` : '';
  panel.append(info);
  return panel;
}

// ------------------------------------------------------------------ controls

function buildControlsMenu(game) {
  const panel = menuShell(game, { title: 'CONTROLS', subtitle: 'INPUT MAPPING', back: 'main' });
  const body = h('div');
  const bindings = game.input.bindings;

  const rows = [
    ['Move', 'move_forward', 'MOVE FORWARD'],
    ['', 'move_back', 'MOVE BACK'],
    ['', 'move_left', 'STRAFE LEFT'],
    ['', 'move_right', 'STRAFE RIGHT'],
    ['', 'jump', 'JUMP'],
    ['', 'sprint', 'SPRINT'],
    ['', 'crouch', 'CROUCH'],
    ['', 'dash', 'DASH'],
    ['Combat', 'fire', 'FIRE'],
    ['', 'ads', 'AIM / ZOOM'],
    ['', 'reload', 'RELOAD'],
    ['', 'melee', 'MELEE'],
    ['', 'next_weapon', 'NEXT WEAPON'],
    ['', 'prev_weapon', 'PREV WEAPON'],
    ['', 'interact', 'INTERACT'],
    ['System', 'pause', 'PAUSE'],
    ['', 'toggle_minimap', 'TOGGLE MINIMAP'],
  ];

  let lastSection = '';
  for (const [section, action, label] of rows) {
    if (section && section !== lastSection) {
      body.append(h('div', 'vb-section-title', section));
      lastSection = section;
    }
    body.append(KeybindRow(label, action, bindings, (act, code) => {
      if (/^(Key|Digit|Arrow|Shift|Control)/.test(code) || code === 'Space' || code === 'Escape') {
        bindings.set(act, [code]);
        game.input.loadBindings(Object.fromEntries(bindings));
      }
    }));
  }
  const restore = h('div', 'vb-row');
  restore.append(h('span', 'desc', 'Restore default bindings'));
  restore.append(ui.button('RESTORE', () => {
    game.input.bindings = new Map(game.input.defaultBindings);
    game.input.loadBindings(Object.fromEntries(game.input.bindings));
    game.showScreen('controls');
  }, { className: 'small danger' }));
  body.append(restore);
  panel.append(body);
  return panel;
}
