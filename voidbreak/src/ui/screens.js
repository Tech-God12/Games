/**
 * VOIDBREAK — In-run and meta screens.
 *
 * Upgrade selection (3 cards), game over (stats), armory (weapons with
 * unlocks), achievements, records and credits.
 */

import { h, el, ui } from './ui.js';
import { RARITY } from '../game/upgrades/upgrade_defs.js';
import { cardIcon } from '../game/upgrades/cards.js';
import { ACHIEVEMENTS, achievements } from '../game/meta/achievements.js';
import { weaponProgression } from '../game/meta/unlocks.js';
import { records } from '../game/meta/records.js';
import { WEAPON_BY_ID } from '../game/weapons/weapon_defs.js';
import { MODES, GAME_VERSION } from '../core/constants.js';

/** Register screens that depend on live game state. */
export function registerGameScreens(game) {
  ui.addScreen('upgrades', buildUpgradeScreen(game));
  ui.addScreen('gameover', buildGameOverScreen(game));
  ui.addScreen('armory', buildArmoryScreen(game));
  ui.addScreen('achievements', buildAchievementsScreen(game));
  ui.addScreen('records', buildRecordsScreen(game));
  ui.addScreen('credits', buildCreditsScreen(game));
}

// ----------------------------------------------------------------- upgrades

function buildUpgradeScreen(game) {
  const panel = h('div', 'vb-panel vb-menu');
  const title = h('div', 'menu-title', 'UPGRADE');
  const subtitle = h('div', 'menu-sub', 'WAVE COMPLETE — CHOOSE A MODIFICATION');
  const cards = h('div', 'vb-cards');
  const actions = h('div', 'vb-menu-actions');
  const rerollBtn = ui.button('⟳ REROLL (1 PER WAVE)', () => {
    const drawn = game.drawUpgrades(true);
    renderCards(drawn);
    rerollBtn.disabled = true;
  }, { className: 'small' });

  const renderCards = (drawn) => {
    cards.replaceChildren();
    if (drawn.length === 0) {
      cards.append(h('div', 'vb-card', 'NO UPGRADES AVAILABLE'));
      return;
    }
    for (const def of drawn) {
      const r = RARITY[def.rarity];
      const card = h('div', 'vb-card');
      card.style.borderColor = r.color;
      card.append(
        h('div', 'icon', cardIcon(def)),
        el('div', { class: 'name' }, def.name),
        el('div', { class: 'rarity', style: { color: r.color } }, r.label),
        h('div', 'desc', def.desc),
      );
      card.addEventListener('click', () => {
        game.chooseUpgrade(def.id);
      });
      cards.append(card);
    }
  };

  panel.append(title, subtitle, cards, actions);
  actions.append(rerollBtn);

  const onShow = () => {
    rerollBtn.disabled = false;
    renderCards(game.currentUpgrades);
  };
  game.onUpgradeScreenShown = onShow;
  return panel;
}

// ----------------------------------------------------------------- game over

function buildGameOverScreen(game) {
  const panel = h('div', 'vb-panel vb-menu');
  const title = h('div', 'menu-title');
  const subtitle = h('div', 'menu-sub');
  const stats = h('div', 'vb-stats-grid');
  const actions = h('div', 'vb-menu-actions');

  const render = () => {
    const s = game.lastRunSummary ?? {};
    const won = s.won;
    title.textContent = won ? 'VICTORY' : 'RUN TERMINATED';
    title.style.color = won ? '#4dffa6' : '#ff3b3b';
    title.style.textShadow = won ? '0 0 30px rgba(77,255,166,0.6)' : '0 0 30px rgba(255,59,59,0.6)';
    subtitle.textContent = won
      ? `${modeName(s.mode)} COMPLETE ON ${(s.difficulty ?? 'OPERATIVE').toUpperCase()}`
      : `WAVE ${s.wave ?? 1} · ${modeName(s.mode)}`;

    const rows = [
      ['Score', (s.score ?? 0).toLocaleString()],
      ['Wave', String(s.wave ?? 1)],
      ['Time', formatTime(s.timeAlive ?? 0)],
      ['Kills', String(s.kills ?? 0)],
      ['Accuracy', `${Math.round((s.accuracy ?? 0) * 100)}%`],
      ['Headshots', String(s.headshots ?? 0)],
      ['Damage Dealt', (s.damageDealt ?? 0).toLocaleString()],
      ['Damage Taken', (s.damageTaken ?? 0).toLocaleString()],
      ['Max Combo', String(s.maxCombo ?? 0)],
      ['Upgrades', String(s.upgradesTaken ?? 0)],
      ['Elites', String(s.elitesKilled ?? 0)],
      ['Top Weapon', prettyWeapon(s.topWeapon)],
    ];
    stats.replaceChildren(...rows.map(([k, v]) => el('div', { class: 'vb-stat' }, [
      h('div', 'k', k),
      h('div', 'v', v),
    ])));

    actions.replaceChildren(
      ui.button('DEPLOY AGAIN', () => game.startRun(game.selectedMode, game.selectedDifficulty), { className: 'primary' }),
      ui.button('MAIN MENU', () => game.toMainMenu(), { silent: true }),
    );
  };

  panel.append(title, subtitle, stats, actions);
  game.onGameOverShown = render;
  return panel;
}

// ------------------------------------------------------------------ armory

function buildArmoryScreen(game) {
  const panel = h('div', 'vb-panel vb-menu wide');
  panel.append(
    h('div', 'menu-title', 'ARMORY'),
    h('div', 'menu-sub', 'ARSENAL STATUS'),
  );
  const grid = h('div', 'vb-armory-grid');
  const unlocked = new Set(game.unlockedWeaponIds());
  const progression = weaponProgression();
  for (const def of progression) {
    const isUnlocked = unlocked.has(def.id);
    const cell = h('div', `vb-armory ${isUnlocked ? '' : 'locked'}`);
    cell.append(
      el('div', { class: 'nm' }, `${isUnlocked ? '✔' : '🔒'} ${def.name}`),
      h('div', 'ds', def.desc),
      h('div', 'ds', `DMG ${def.damage} · ROF ${def.fireRate}/s · ${def.kind.toUpperCase()}`),
      h('div', 'ds', isUnlocked ? '' : `UNLOCK: WAVE ${def.unlockWave}`),
    );
    grid.append(cell);
  }
  panel.append(grid);
  const back = h('div', 'vb-row');
  back.append(ui.button('← BACK', () => game.showScreen('main'), { className: 'small', silent: true }));
  panel.append(back);
  return panel;
}

// -------------------------------------------------------------- achievements

function buildAchievementsScreen(game) {
  const panel = h('div', 'vb-panel vb-menu wide');
  const grid = h('div', 'vb-ach-grid');
  const count = h('span', '', '');
  const render = () => {
    grid.replaceChildren();
    for (const ach of ACHIEVEMENTS) {
      const unlocked = achievements.isUnlocked(ach.id);
      const cell = h('div', `vb-ach ${unlocked ? '' : 'locked'}`);
      cell.append(
        h('span', 'ic', unlocked ? ach.icon : '❓'),
        el('div', { class: 'vb-column' }, [
          h('div', 'nm', ach.name),
          h('div', 'ds', ach.desc),
        ]),
      );
      grid.append(cell);
    }
    count.textContent = `${achievements.unlockedCount}/${achievements.totalCount} UNLOCKED`;
  };
  panel.append(
    h('div', 'menu-title', 'ACHIEVEMENTS'),
    el('div', { class: 'menu-sub' }, count),
    grid,
  );
  const back = h('div', 'vb-row');
  back.append(ui.button('← BACK', () => game.showScreen('main'), { className: 'small', silent: true }));
  panel.append(back);
  game.onAchievementsShown = render;
  return panel;
}

// ----------------------------------------------------------------- records

function buildRecordsScreen(game) {
  const panel = h('div', 'vb-panel vb-menu');
  const body = h('div');
  const render = () => {
    body.replaceChildren();
    const d = records.data;
    body.append(h('div', 'vb-section-title', 'PERSONAL RECORDS'));
    body.append(
      el('div', { class: 'vb-stats-grid' }, [
        stat('Best Wave', String(d.bestWave)),
        stat('Best Score', d.bestScore.toLocaleString()),
        stat('Total Runs', String(d.totalRuns)),
        stat('Total Wins', String(d.totalWins)),
        stat('Total Kills', d.totalKills.toLocaleString()),
        stat('Total Time', `${Math.floor(d.totalTime / 60)} min`),
      ]),
    );
    body.append(h('div', 'vb-section-title', 'BEST BY MODE'));
    for (const mode of Object.keys(MODES)) {
      body.append(el('div', { class: 'vb-row' }, [
        h('label', '', modeName(mode)),
        h('span', 'desc', `WAVE ${d.bestWaveByMode?.[mode] ?? 0} · SCORE ${(d.bestScoreByMode?.[mode] ?? 0).toLocaleString()}`),
      ]));
    }
    body.append(h('div', 'vb-section-title', 'BEST BY DIFFICULTY'));
    for (const diff of ['rookie', 'operative', 'veteran', 'nightmare']) {
      body.append(el('div', { class: 'vb-row' }, [
        h('label', '', diff.toUpperCase()),
        h('span', 'desc', (d.bestByDifficulty?.[diff] ?? 0).toLocaleString()),
      ]));
    }
  };
  panel.append(
    h('div', 'menu-title', 'RECORDS'),
    h('div', 'menu-sub', 'RUN HISTORY'),
    body,
  );
  const back = h('div', 'vb-row');
  back.append(ui.button('← BACK', () => game.showScreen('main'), { className: 'small', silent: true }));
  panel.append(back);
  game.onRecordsShown = render;
  return panel;
}

// ----------------------------------------------------------------- credits

function buildCreditsScreen(game) {
  const panel = h('div', 'vb-panel vb-menu');
  panel.append(
    h('div', 'menu-title', 'CREDITS'),
    h('div', 'menu-sub', `VOIDBREAK v${GAME_VERSION}`),
    h('div', 'desc', 'Built entirely from scratch:'),
    h('div', 'vb-stats-grid', [
      stat('Engine', 'Custom WebGL2'),
      stat('Audio', '100% Synthesized'),
      stat('Assets', '100% Procedural'),
      stat('Libraries', 'Zero Dependencies'),
    ]),
    h('div', 'vb-footer', 'Math, rendering, audio, AI, design: all hand-written.'),
  );
  const back = h('div', 'vb-row');
  back.append(ui.button('← BACK', () => game.showScreen('main'), { className: 'small', silent: true }));
  panel.append(back);
  return panel;
}

// ----------------------------------------------------------------- helpers

function stat(k, v) {
  return el('div', { class: 'vb-stat' }, [h('div', 'k', k), h('div', 'v', v)]);
}

function modeName(mode) {
  switch (mode) {
    case 'endless': return 'ENDLESS PROTOCOL';
    case 'blitz': return 'BLITZ';
    case 'crucible': return 'CRUCIBLE';
    case 'practice': return 'PRACTICE';
    default: return String(mode ?? '').toUpperCase();
  }
}

function prettyWeapon(id) {
  if (!id || id === 'none') return '—';
  return WEAPON_BY_ID.get(id)?.name ?? id;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
