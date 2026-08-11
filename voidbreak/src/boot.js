/**
 * VOIDBREAK — Boot sequence.
 *
 * Entry point: hides the boot screen, initializes settings, creates the
 * Game, wires the pointer-lock lifecycle, and starts the loop. Any fatal
 * error is surfaced on the fatal-error overlay instead of a dead page.
 */

import { settings } from './core/settings.js';
import { log } from './core/profiler.js';
import { Game } from './game/game.js';
import { audio } from './audio/audioengine.js';
import { GAME_TITLE } from './core/constants.js';

const bootBar = document.getElementById('boot-bar');
const bootStatus = document.getElementById('boot-status');
const bootScreen = document.getElementById('boot-screen');
const fatal = document.getElementById('fatal-error');

function setBoot(step, label) {
  bootBar.style.width = `${Math.min(100, step * 25)}%`;
  bootStatus.textContent = label;
}

window.addEventListener('error', (e) => {
  showFatal(e.message, e.filename, e.lineno);
});

function showFatal(message, source, line) {
  if (fatal.style.display === 'flex') return;
  fatal.style.display = 'flex';
  document.getElementById('fatal-message').textContent = message;
  document.getElementById('fatal-details').textContent = `${source ?? ''}${line ? `:${line}` : ''}`;
  console.error('FATAL:', message, source, line);
}

async function boot() {
  try {
    document.title = `${GAME_TITLE} — Survive the Breach`;
    setBoot(1, 'LOADING SETTINGS');
    settings.load();

    setBoot(2, 'INITIALIZING ENGINE');
    const canvas = document.getElementById('game-canvas');
    const game = new Game(canvas);
    window.__VOIDBREAK__ = game;
    window.__VOIDBREAK_DEBUG__ = new URLSearchParams(location.search).has('debug');

    setBoot(3, 'WIRING INPUT');
    const unlockAudio = () => {
      audio.unlock();
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
    };
    document.addEventListener('click', unlockAudio);
    document.addEventListener('keydown', unlockAudio);

    const showMenu = () => {
      if (game.state === 'menu' && !game.menuShown) {
        game.menuShown = true;
        game.showScreen('main');
      }
    };
    document.addEventListener('click', showMenu, { once: true });

    setBoot(4, 'STARTING');
    game.start();

    setTimeout(() => {
      bootScreen.classList.add('hidden');
      setTimeout(() => bootScreen.remove(), 500);
    }, 250);

    log.info('boot', 'VOIDBREAK booted successfully');
  } catch (err) {
    console.error('Boot failure:', err);
    showFatal(err?.message ?? String(err), err?.stack, 0);
  }
}

boot();
