// ============================================================================
// main.js — entry point
// Bootstraps the engine and game with a staged loading screen, resilient
// error handling (any fault surfaces on a dedicated fatal screen), and wires
// global unhandled-error capture so issues are always visible.
// ============================================================================

const bootFill = document.getElementById('bootFill');
const bootStatus = document.getElementById('bootStatus');
const boot = document.getElementById('boot');
const fatal = document.getElementById('fatal');
const fatalMsg = document.getElementById('fatalMsg');

let _bootProgress = 0;
function setBoot(pct, status) {
  _bootProgress = Math.max(_bootProgress, pct);
  if (bootFill) bootFill.style.width = _bootProgress + '%';
  if (status && bootStatus) bootStatus.textContent = status;
}

function showFatal(err) {
  const msg = (err && err.stack) ? err.stack : String(err);
  if (fatalMsg) fatalMsg.textContent = (typeof err === 'object' && err !== null ? err.message + '\n\n' : '') + msg;
  if (fatal) fatal.style.display = 'block';
  if (boot) boot.classList.add('hide');
  console.error('[NEXUS PROTOCOL] fatal:', err);
}

window.addEventListener('error', (e) => {
  // Avoid stomping the fatal screen if already shown
  if (fatal && fatal.style.display === 'block') return;
  showFatal(e.error || e.message);
});
window.addEventListener('unhandledrejection', (e) => {
  showFatal(e.reason);
});

async function boot_() {
  try {
    setBoot(5, 'Booting engine…');
    const { Engine, Quality } = await import('./core/Engine.js');
    setBoot(15, 'Loading input & audio…');
    const { InputManager } = await import('./core/InputManager.js');
    const { AudioManager } = await import('./core/AudioManager.js');
    const { AssetManager } = await import('./core/AssetManager.js');
    setBoot(25, 'Loading persistence…');
    const { save } = await import('./core/SaveManager.js');
    setBoot(35, 'Loading game…');
    const { Game } = await import('./game/Game.js');
    setBoot(60, 'Building world…');

    const container = document.getElementById('app');
    const engine = new Engine(container, { quality: Quality.High });
    engine.input = new InputManager(engine.renderer.domElement);
    engine.audio = new AudioManager();
    engine.assets = new AssetManager();
    engine.save = save;

    // Apply saved settings
    const s = save.settings;
    if (s) {
      engine.setQuality(s.quality || 'high');
      if (engine.input) {
        engine.input.mouseSensitivity = 0.0022 * (s.mouseSensitivity || 1);
        engine.input.invertY = !!s.invertY;
      }
    }

    const game = new Game(engine);
    engine.setGame(game);
    engine.start();
    setBoot(100, 'Engaging…');

    // Fade out boot screen
    setTimeout(() => { if (boot) boot.classList.add('hide'); }, 250);
    setTimeout(() => { if (boot) boot.style.display = 'none'; }, 1100);

    // Expose for debugging
    window.__nexus = { engine, game };
  } catch (err) {
    showFatal(err);
  }
}

boot_();
