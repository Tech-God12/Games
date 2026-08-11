// ============================================================================
// Localization.js
// UI string table keyed by id, with a pluggable current language. English is
// the default and fallback; additional languages can be registered. The UI
// calls t('id') to resolve a string. Keeps all user-facing copy in one place
// and makes the game localizable.
// ============================================================================

const Strings = {
  en: {
    // menu
    'menu.title': 'NEXUS PROTOCOL',
    'menu.subtitle': 'Arena Survivor',
    'menu.play': 'Deploy',
    'menu.characters': 'Operatives',
    'menu.arsenal': 'Arsenal',
    'menu.codex': 'Codex',
    'menu.settings': 'Settings',
    'menu.quit': 'Quit',
    'menu.bestWave': 'BEST WAVE',
    'menu.kills': 'KILLS',
    'menu.currency': 'CURRENCY',
    'menu.tagline': 'A neon-soaked roguelite survival shooter',
    // character select
    'charselect.title': 'SELECT OPERATIVE',
    'charselect.back': 'Back',
    'charselect.deploy': 'Deploy',
    'charselect.locked': 'LOCKED · Reach Wave {0}',
    'charselect.hp': 'HP',
    'charselect.speed': 'SPD',
    // hud
    'hud.wave': 'WAVE {0}',
    'hud.boss': 'BOSS',
    'hud.enemies': 'Enemies: {0}',
    'hud.nextWave': 'Next wave in {0}s',
    'hud.score': 'SCORE {0}',
    'hud.kills': 'KILLS {0}',
    'hud.dash': 'DASH',
    'hud.ability': 'ABILITY',
    'hud.reload': 'RELOAD',
    'hud.level': 'LV {0}',
    // pause
    'pause.title': 'PAUSED',
    'pause.resume': 'Resume',
    'pause.settings': 'Settings',
    'pause.shop': 'Shop & Upgrades',
    'pause.quit': 'Abort Run',
    // game over
    'gameover.title': 'RUN ENDED',
    'gameover.retry': 'Redeploy',
    'gameover.menu': 'Main Menu',
    'gameover.wave': 'Wave Reached',
    'gameover.score': 'Score',
    'gameover.kills': 'Kills',
    'gameover.time': 'Time',
    'gameover.bosses': 'Bosses Killed',
    // level up
    'levelup.title': 'LEVEL UP',
    'levelup.subtitle': 'Choose an upgrade',
    'levelup.new': 'NEW',
    'levelup.rank': 'RANK {0}/{1}',
    'levelup.perk': 'PERK',
    // settings
    'settings.title': 'SETTINGS',
    'settings.quality': 'Quality',
    'settings.masterVolume': 'Master Volume',
    'settings.sfxVolume': 'SFX Volume',
    'settings.musicVolume': 'Music Volume',
    'settings.sensitivity': 'Mouse Sensitivity',
    'settings.fov': 'Field of View',
    'settings.screenShake': 'Screen Shake',
    'settings.invertY': 'Invert Y',
    'settings.autoLock': 'Auto Pointer Lock',
    'settings.damageNumbers': 'Damage Numbers',
    'settings.reset': 'Reset Progression',
    'settings.apply': 'Apply & Save',
    'settings.low': 'Low', 'settings.medium': 'Medium', 'settings.high': 'High', 'settings.ultra': 'Ultra',
    // shop
    'shop.title': 'ARSENAL',
    'shop.subtitle': 'Spend currency on permanent-for-run items',
    'shop.back': 'Back',
    'shop.owned': 'OWNED x{0}',
    'shop.insufficient': 'Not enough currency',
    // codex
    'codex.title': 'CODEX',
    'codex.weapons': 'Weapons',
    'codex.enemies': 'Enemies',
    'codex.items': 'Items',
    'codex.perks': 'Perks',
    'codex.lore': 'Lore',
    'codex.achievements': 'Achievements',
    'codex.records': 'Records',
    'codex.loreWorld': 'World',
    'codex.loreFactions': 'Factions',
    'codex.loreOperatives': 'Operatives',
    'codex.loreEvents': 'Events',
    // toasts
    'toast.nuke': 'NUKE!',
    'toast.freeze': 'FREEZE',
    'toast.magnet': 'MAGNET',
    'toast.waveStart': 'WAVE {0}',
    'toast.waveClear': 'WAVE {0} CLEARED',
    'toast.bossPhase': '{0} — PHASE {1}',
    'toast.phoenix': 'PHOENIX REVIVE!',
    'toast.overdrive': 'OVERDRIVE!',
    'toast.berserk': 'BERSERK!',
    'toast.adrenaline': 'ADRENALINE!',
    'toast.airstrike': 'AIRSTRIKE INBOUND',
    'toast.comboEnded': 'COMBO ENDED x{0}',
    // controls
    'controls.title': 'Controls',
    'controls.move': 'Move',
    'controls.look': 'Look',
    'controls.fire': 'Fire',
    'controls.altFire': 'Alt Fire',
    'controls.reload': 'Reload',
    'controls.dash': 'Dash',
    'controls.jump': 'Jump',
    'controls.ability': 'Ability',
    'controls.swap': 'Swap Weapon',
    'controls.pause': 'Pause',
    // misc
    'common.back': 'Back',
    'common.close': 'Close',
    'common.confirm': 'Confirm',
    'common.cancel': 'Cancel',
    'common.unlock': 'Unlock',
    'common.locked': 'Locked',
    'common.owned': 'Owned',
    'common.new': 'New',
    'common.max': 'MAX',
  },
  es: {
    'menu.title': 'NEXUS PROTOCOL',
    'menu.subtitle': 'Superviviente de Arena',
    'menu.play': 'Desplegar',
    'menu.settings': 'Ajustes',
    'pause.title': 'EN PAUSA',
    'pause.resume': 'Reanudar',
    'gameover.title': 'FIN DE LA RUN',
    'gameover.retry': 'Re-desplegar',
    'levelup.title': 'SUBIDA DE NIVEL',
    'levelup.subtitle': 'Elige una mejora',
    'settings.title': 'AJUSTES',
    'shop.title': 'ARSENAL',
    'codex.title': 'CÓDEX',
    'common.back': 'Volver',
    'common.close': 'Cerrar',
  },
  de: {
    'menu.title': 'NEXUS PROTOCOL',
    'menu.subtitle': 'Arena-Überlebende',
    'menu.play': 'Einsetzen',
    'menu.settings': 'Einstellungen',
    'pause.title': 'PAUSE',
    'pause.resume': 'Fortsetzen',
    'gameover.title': 'RUN BEENDET',
    'gameover.retry': 'Erneut einsetzen',
    'levelup.title': 'LEVEL UP',
    'settings.title': 'EINSTELLUNGEN',
    'common.back': 'Zurück',
  },
  fr: {
    'menu.title': 'NEXUS PROTOCOL',
    'menu.subtitle': 'Survivant d\'Arène',
    'menu.play': 'Déployer',
    'menu.settings': 'Réglages',
    'pause.title': 'PAUSE',
    'pause.resume': 'Reprendre',
    'gameover.title': 'RUN TERMINÉE',
    'gameover.retry': 'Redéployer',
    'levelup.title': 'NIVEAU SUPÉRIEUR',
    'settings.title': 'RÉGLAGES',
    'common.back': 'Retour',
  },
};

let _lang = 'en';
const _fallback = 'en';

export function setLanguage(lang) { if (Strings[lang]) _lang = lang; }
export function getLanguage() { return _lang; }
export function availableLanguages() { return Object.keys(Strings); }

/** Resolve a string, with {n} placeholder substitution. */
export function t(id, ...args) {
  const table = Strings[_lang] || Strings[_fallback];
  let s = table[id];
  if (s === undefined) s = (Strings[_fallback] && Strings[_fallback][id]) || id;
  if (args.length) {
    s = s.replace(/\{(\d+)\}/g, (m, i) => (args[i] !== undefined ? args[i] : m));
  }
  return s;
}

export const T = t;
