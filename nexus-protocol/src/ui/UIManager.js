// ============================================================================
// UIManager.js
// All DOM-based UI: main menu, HUD, pause/game-over/level-up/settings screens,
// toasts, crosshair, and boss bar. Screens are toggled by name; the HUD is
// updated each tick from live game state. Styles are injected once into the
// document head. Pointer events are carefully gated so gameplay input is never
// blocked while the HUD is visible.
// ============================================================================

import { bus, Channels } from '../core/EventBus.js';
import { clamp, formatNumber, formatTime, lerp } from '../core/MathUtils.js';
import { WeaponRegistry } from '../weapons/WeaponRegistry.js';
import { CharacterRegistry } from '../player/Characters.js';
import { ItemRegistry } from '../items/ItemRegistry.js';
import { RARITY_COLOR_ITEM } from '../items/ItemRarity.js';
import { AbilityRegistry } from '../abilities/AbilityRegistry.js';
import { Health, Shield } from '../ecs/components/Vitals.js';
import { Body } from '../ecs/components/Body.js';
import { Player } from '../ecs/components/Gameplay.js';

export class UIManager {
  constructor(game) {
    this.game = game;
    this.save = game.save;
    this.screens = new Map();
    this._toasts = [];
    this._toastTimers = [];
    this._hudEls = {};
    this._current = null;
    this._unsub = [];
  }

  build() {
    this._injectStyles();
    this.root = document.createElement('div');
    this.root.id = 'ui';
    this.root.style.cssText = 'position:fixed;inset:0;z-index:100;pointer-events:none;font-family:"Segoe UI",Arial,sans-serif;';
    document.body.appendChild(this.root);
    this._buildHUD();
    this._buildCrosshair();
    this._buildToasts();
    this._buildMenu();
    this._buildPause();
    this._buildGameOver();
    this._buildLevelUp();
    this._buildSettings();
    this._buildCharacterSelect();
    this._buildCodex();
    this._unsub.push(bus.on(Channels.Toast, (t) => this.toast(t.text, t.color)));
    this._unsub.push(bus.on(Channels.HUDUpdate, () => this._dirty = true));
    this.onResize();
  }

  _injectStyles() {
    if (document.getElementById('nexus-ui-styles')) return;
    const css = `
    #ui .screen { position:absolute; inset:0; display:none; pointer-events:auto; }
    #ui .screen.visible { display:block; }
    .nv-panel { background:rgba(8,12,22,0.82); border:1px solid rgba(41,231,255,0.25); border-radius:10px; backdrop-filter:blur(6px); }
    .nv-btn { font:700 14px/1 'Segoe UI',Arial; letter-spacing:0.08em; text-transform:uppercase; color:#cfe6ff;
      background:linear-gradient(180deg,rgba(41,231,255,0.12),rgba(41,231,255,0.04)); border:1px solid rgba(41,231,255,0.4);
      padding:12px 22px; border-radius:8px; cursor:pointer; transition:all .15s ease; pointer-events:auto; }
    .nv-btn:hover { background:linear-gradient(180deg,rgba(41,231,255,0.28),rgba(255,61,240,0.12)); border-color:#29e7ff; color:#fff; box-shadow:0 0 18px rgba(41,231,255,0.45); transform:translateY(-1px); }
    .nv-btn:active { transform:translateY(0); }
    .nv-btn.primary { background:linear-gradient(90deg,#29e7ff,#ff3df0); color:#06121a; border:none; }
    .nv-btn.primary:hover { box-shadow:0 0 26px rgba(255,61,240,0.6); color:#06121a; }
    .nv-btn.ghost { background:transparent; border-color:rgba(255,255,255,0.18); color:#9fb3d6; }
    .nv-title { font:800 clamp(34px,7vw,80px)/1 'Segoe UI',Arial; letter-spacing:0.3em;
      background:linear-gradient(90deg,#29e7ff,#ff3df0,#8a5bff); -webkit-background-clip:text; background-clip:text; color:transparent; text-shadow:0 0 50px rgba(41,231,255,0.25); }
    .nv-sub { letter-spacing:0.4em; color:#6f86a8; text-transform:uppercase; font-size:13px; }
    .bar { position:relative; height:10px; background:rgba(255,255,255,0.08); border-radius:5px; overflow:hidden; }
    .bar > i { position:absolute; left:0; top:0; bottom:0; display:block; border-radius:5px; transition:width .12s ease; }
    .hud-bar { width:220px; }
    .crosshair { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); pointer-events:none; }
    .crosshair .dot { width:4px;height:4px;border-radius:50%;background:#29e7ff;box-shadow:0 0 6px #29e7ff; position:absolute; left:50%;top:50%; transform:translate(-50%,-50%); }
    .crosshair .line { position:absolute; background:#29e7ff; box-shadow:0 0 4px #29e7ff; transition:transform .05s linear; }
    .toast { pointer-events:none; font:700 14px 'Segoe UI',Arial; letter-spacing:0.06em; padding:6px 14px; border-radius:6px;
      background:rgba(8,12,22,0.7); border:1px solid rgba(41,231,255,0.3); color:#cfe6ff; margin-top:8px; opacity:0; transform:translateY(8px); transition:all .25s ease; }
    .toast.show { opacity:1; transform:translateY(0); }
    .lu-card { pointer-events:auto; cursor:pointer; width:240px; padding:18px; border-radius:12px; border:1px solid rgba(41,231,255,0.3);
      background:rgba(10,16,28,0.9); transition:all .15s ease; position:relative; overflow:hidden; }
    .lu-card:hover { transform:translateY(-6px) scale(1.03); border-color:#29e7ff; box-shadow:0 0 30px rgba(41,231,255,0.4); }
    .lu-card .ic { font-size:34px; margin-bottom:8px; }
    .lu-card .nm { font:800 16px 'Segoe UI'; letter-spacing:0.05em; color:#fff; }
    .lu-card .ds { font:13px/1.4 'Segoe UI'; color:#9fb3d6; margin-top:6px; min-height:36px; }
    .lu-card .rk { font:11px 'Segoe UI'; letter-spacing:0.2em; text-transform:uppercase; margin-top:8px; }
    .nv-card { background:rgba(10,16,28,0.85); border:1px solid rgba(41,231,255,0.22); border-radius:10px; padding:14px; }
    .nv-scroll { overflow-y:auto; }
    .nv-scroll::-webkit-scrollbar { width:8px; } .nv-scroll::-webkit-scrollbar-thumb { background:rgba(41,231,255,0.3); border-radius:4px; }
    select,input[type=range] { accent-color:#29e7ff; }
    .nv-input { background:rgba(255,255,255,0.06); border:1px solid rgba(41,231,255,0.25); color:#cfe6ff; border-radius:6px; padding:8px 10px; }
    `;
    const style = document.createElement('style');
    style.id = 'nexus-ui-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ---- HUD ----
  _buildHUD() {
    const hud = document.createElement('div');
    hud.className = 'screen';
    hud.id = 'hud';
    hud.style.pointerEvents = 'none';
    hud.innerHTML = `
      <div style="position:absolute;top:16px;left:16px;">
        <div id="hudHealthWrap" style="display:flex;align-items:center;gap:8px;">
          <div style="font-size:20px;color:#ff5d7a;">♥</div>
          <div>
            <div class="bar hud-bar"><i id="hudHealth" style="background:linear-gradient(90deg,#ff3d6b,#ff8a5d);"></i></div>
            <div id="hudHealthText" style="font:700 12px monospace;color:#ffc4d0;margin-top:3px;">100 / 100</div>
          </div>
        </div>
        <div id="hudShieldWrap" style="display:none;margin-top:8px;align-items:center;gap:8px;">
          <div style="font-size:16px;color:#29e7ff;">🛡</div>
          <div>
            <div class="bar hud-bar" style="width:180px;"><i id="hudShield" style="background:linear-gradient(90deg,#29e7ff,#8a5bff);"></i></div>
            <div id="hudShieldText" style="font:700 11px monospace;color:#bfe9ff;margin-top:3px;">0 / 0</div>
          </div>
        </div>
      </div>

      <div style="position:absolute;top:16px;left:50%;transform:translateX(-50%);text-align:center;">
        <div id="hudWave" style="font:800 22px 'Segoe UI';letter-spacing:0.2em;color:#29e7ff;text-shadow:0 0 12px rgba(41,231,255,0.5);">WAVE 1</div>
        <div id="hudEnemies" style="font:700 12px monospace;color:#9fb3d6;margin-top:2px;">Enemies: 0</div>
        <div id="hudIntermission" style="display:none;font:700 14px 'Segoe UI';color:#ffd24a;margin-top:4px;"></div>
      </div>

      <div id="hudBossWrap" style="position:absolute;top:60px;left:50%;transform:translateX(-50%);display:none;text-align:center;width:60%;max-width:520px;">
        <div id="hudBossName" style="font:800 14px 'Segoe UI';letter-spacing:0.25em;color:#ff3df0;text-shadow:0 0 10px rgba(255,61,240,0.6);">BOSS</div>
        <div class="bar" style="height:12px;margin-top:4px;"><i id="hudBossHealth" style="background:linear-gradient(90deg,#ff3df0,#8a5bff);width:100%;"></i></div>
      </div>

      <div style="position:absolute;top:16px;right:16px;text-align:right;">
        <div style="display:flex;align-items:center;gap:6px;justify-content:flex-end;">
          <span style="color:#ffb347;">◈</span><span id="hudCurrency" style="font:800 18px monospace;color:#ffd28a;">0</span>
        </div>
        <div id="hudScore" style="font:700 12px monospace;color:#9fb3d6;margin-top:2px;">SCORE 0</div>
        <div style="margin-top:6px;text-align:right;">
          <div style="font:700 11px monospace;color:#cfe6ff;">LV <span id="hudLevel">1</span></div>
          <div class="bar" style="width:160px;margin-left:auto;"><i id="hudXP" style="background:linear-gradient(90deg,#4fd07a,#29e7ff);width:0%;"></i></div>
        </div>
        <div id="hudTime" style="font:700 11px monospace;color:#6f86a8;margin-top:4px;">0:00</div>
      </div>

      <div style="position:absolute;bottom:18px;left:18px;">
        <div id="hudWeapon" style="font:800 16px 'Segoe UI';letter-spacing:0.08em;color:#fff;text-shadow:0 0 8px rgba(0,0,0,0.8);">Sidearm</div>
        <div id="hudAmmo" style="font:700 22px monospace;color:#ffd28a;text-shadow:0 0 8px rgba(0,0,0,0.8);">14 <span style="color:#6f86a8;font-size:14px;">/ 120</span></div>
        <div id="hudWeaponsList" style="display:flex;gap:6px;margin-top:4px;"></div>
      </div>

      <div style="position:absolute;bottom:18px;left:50%;transform:translateX(-50%);display:flex;gap:14px;align-items:flex-end;">
        <div id="hudDash" style="text-align:center;">
          <div style="font:700 10px monospace;color:#9fb3d6;letter-spacing:0.15em;">DASH</div>
          <div class="bar" style="width:70px;margin-top:3px;"><i id="hudDashBar" style="background:#29e7ff;width:100%;"></i></div>
        </div>
        <div id="hudAbility" style="text-align:center;display:none;">
          <div id="hudAbilityName" style="font:700 10px monospace;color:#9fb3d6;letter-spacing:0.15em;">ABILITY</div>
          <div class="bar" style="width:70px;margin-top:3px;"><i id="hudAbilityBar" style="background:#ff3df0;width:100%;"></i></div>
        </div>
      </div>

      <div style="position:absolute;bottom:18px;right:18px;text-align:right;">
        <div id="hudKills" style="font:700 12px monospace;color:#9fb3d6;">KILLS 0</div>
        <div id="hudItems" style="display:flex;gap:4px;margin-top:6px;justify-content:flex-end;flex-wrap:wrap;max-width:220px;"></div>
      </div>
    `;
    this.root.appendChild(hud);
    this.screens.set('hud', hud);
    // cache elements
    const ids = ['hudHealth','hudHealthText','hudShield','hudShieldText','hudShieldWrap','hudWave','hudEnemies','hudIntermission','hudBossWrap','hudBossName','hudBossHealth','hudCurrency','hudScore','hudLevel','hudXP','hudTime','hudWeapon','hudAmmo','hudWeaponsList','hudDashBar','hudAbility','hudAbilityName','hudAbilityBar','hudKills','hudItems'];
    for (const id of ids) this._hudEls[id] = hud.querySelector('#' + id) || hud.querySelector('.' + id);
  }

  _buildCrosshair() {
    const ch = document.createElement('div');
    ch.className = 'crosshair';
    ch.innerHTML = `<div class="dot"></div>
      <div class="line" id="chTop" style="width:2px;height:8px;left:-1px;top:-16px;"></div>
      <div class="line" id="chBot" style="width:2px;height:8px;left:-1px;top:8px;"></div>
      <div class="line" id="chL" style="width:8px;height:2px;left:-16px;top:-1px;"></div>
      <div class="line" id="chR" style="width:8px;height:2px;left:8px;top:-1px;"></div>`;
    ch.style.display = 'none';
    this.root.appendChild(ch);
    this.crosshair = ch;
    this._chLines = { top: ch.querySelector('#chTop'), bot: ch.querySelector('#chBot'), l: ch.querySelector('#chL'), r: ch.querySelector('#chR') };
  }

  _buildToasts() {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:absolute;left:50%;bottom:90px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;pointer-events:none;';
    this.root.appendChild(wrap);
    this.toastWrap = wrap;
  }

  toast(text, color = '#cfe6ff') {
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = text;
    el.style.color = color;
    el.style.borderColor = color + '55';
    this.toastWrap.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    const entry = { el, t: 0, life: 2.0 };
    this._toasts.push(entry);
    if (this._toasts.length > 6) { const old = this._toasts.shift(); old.el.remove(); }
  }

  // ---- Menu ----
  _buildMenu() {
    const s = document.createElement('div');
    s.className = 'screen'; s.id = 'menu';
    s.innerHTML = `
      <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(ellipse at 50% 40%,rgba(41,231,255,0.08),transparent 60%),rgba(5,6,10,0.35);">
        <div class="nv-title">NEXUS PROTOCOL</div>
        <div class="nv-sub" style="margin-top:10px;">Arena Survivor</div>
        <div style="display:flex;flex-direction:column;gap:12px;margin-top:42px;align-items:center;">
          <button class="nv-btn primary" id="mPlay" style="min-width:240px;">▶ Deploy</button>
          <div style="display:flex;gap:10px;">
            <button class="nv-btn" id="mChar">Operatives</button>
            <button class="nv-btn" id="mShop">Arsenal</button>
            <button class="nv-btn" id="mCodex">Codex</button>
            <button class="nv-btn" id="mSettings">Settings</button>
          </div>
        </div>
        <div style="position:absolute;bottom:20px;font:700 11px monospace;color:#45597a;letter-spacing:0.2em;">
          BEST WAVE <span id="mBest">${this.save.records.bestWave}</span> · KILLS <span id="mKills">${this.save.records.totalKills}</span> · CURRENCY <span id="mCur">${this.save.records.currency}</span>
        </div>
      </div>`;
    this.root.appendChild(s);
    this.screens.set('menu', s);
    s.querySelector('#mPlay').onclick = () => { this._sfx('ui_click'); this.show('charselect'); };
    s.querySelector('#mChar').onclick = () => { this._sfx('ui_click'); this.show('charselect'); };
    s.querySelector('#mShop').onclick = () => { this._sfx('ui_click'); this.show('codex'); this._codexTab('weapons'); };
    s.querySelector('#mCodex').onclick = () => { this._sfx('ui_click'); this.show('codex'); };
    s.querySelector('#mSettings').onclick = () => { this._sfx('ui_click'); this.show('settings'); this._refreshSettings(); };
  }

  _buildPause() {
    const s = document.createElement('div');
    s.className = 'screen'; s.id = 'pause';
    s.innerHTML = `
      <div style="position:absolute;inset:0;background:rgba(5,6,10,0.6);display:flex;flex-direction:column;align-items:center;justify-content:center;backdrop-filter:blur(3px);">
        <div style="font:800 40px 'Segoe UI';letter-spacing:0.3em;color:#29e7ff;text-shadow:0 0 20px rgba(41,231,255,0.4);">PAUSED</div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-top:30px;align-items:center;">
          <button class="nv-btn primary" id="pResume" style="min-width:220px;">Resume</button>
          <button class="nv-btn" id="pSettings">Settings</button>
          <button class="nv-btn" id="pShop">Shop & Upgrades</button>
          <button class="nv-btn ghost" id="pQuit">Abort Run</button>
        </div>
      </div>`;
    this.root.appendChild(s);
    this.screens.set('pause', s);
    s.querySelector('#pResume').onclick = () => { this._sfx('ui_click'); this.game.resume(); };
    s.querySelector('#pSettings').onclick = () => { this._sfx('ui_click'); this.show('settings'); this._refreshSettings(); };
    s.querySelector('#pShop').onclick = () => { this._sfx('ui_click'); this._openShop(); };
    s.querySelector('#pQuit').onclick = () => { this._sfx('ui_back'); this.game.toMenu(); };
  }

  _buildGameOver() {
    const s = document.createElement('div');
    s.className = 'screen'; s.id = 'gameover';
    s.innerHTML = `
      <div style="position:absolute;inset:0;background:rgba(10,4,8,0.7);display:flex;flex-direction:column;align-items:center;justify-content:center;backdrop-filter:blur(3px);">
        <div style="font:800 56px 'Segoe UI';letter-spacing:0.3em;color:#ff3d6b;text-shadow:0 0 30px rgba(255,61,107,0.5);">RUN ENDED</div>
        <div id="goStats" class="nv-panel" style="margin-top:24px;padding:22px 36px;text-align:center;"></div>
        <div style="display:flex;gap:12px;margin-top:26px;">
          <button class="nv-btn primary" id="goRetry">Redeploy</button>
          <button class="nv-btn" id="goMenu">Main Menu</button>
        </div>
      </div>`;
    this.root.appendChild(s);
    this.screens.set('gameover', s);
    s.querySelector('#goRetry').onclick = () => { this._sfx('ui_click'); this.game.retry(); };
    s.querySelector('#goMenu').onclick = () => { this._sfx('ui_back'); this.game.toMenu(); };
  }

  _buildLevelUp() {
    const s = document.createElement('div');
    s.className = 'screen'; s.id = 'levelup';
    s.innerHTML = `
      <div style="position:absolute;inset:0;background:rgba(5,8,16,0.55);display:flex;flex-direction:column;align-items:center;justify-content:center;backdrop-filter:blur(2px);">
        <div style="font:800 34px 'Segoe UI';letter-spacing:0.25em;color:#ffd24a;text-shadow:0 0 24px rgba(255,210,74,0.5);">LEVEL UP</div>
        <div class="nv-sub" style="margin-top:6px;">Choose an upgrade</div>
        <div id="luCards" style="display:flex;gap:18px;margin-top:34px;flex-wrap:wrap;justify-content:center;"></div>
      </div>`;
    this.root.appendChild(s);
    this.screens.set('levelup', s);
  }

  presentLevelUp(choices) {
    const wrap = this.screens.get('levelup').querySelector('#luCards');
    wrap.innerHTML = '';
    const icons = { heart:'❤', shield:'🛡', boot:'👟', lightning:'⚡', sword:'⚔', target:'🎯', skull:'💀', drop:'🩸', coin:'◈', book:'📖', leaf:'🌿', cactus:'🌵', wind:'🌫', fist:'✊', arrow:'➹', blast:'💥', clock:'⏱', mag:'▦', flame:'🔥', virus:'☣', star:'★', fire:'🔥' };
    for (const c of choices) {
      const card = document.createElement('div');
      card.className = 'lu-card';
      const rank = this.game.progression.upgrades[c.id] || 0;
      const maxRank = c.maxRank || 5;
      const ic = icons[c.icon?.shape] || '✦';
      const color = c.__perk ? '#ff3df0' : ({ common:'#9fb3d6', uncommon:'#4fd07a', rare:'#4aa3ff', epic:'#b266ff', legendary:'#ffb347' }[c.rarity] || '#29e7ff');
      card.style.borderColor = color + '66';
      card.innerHTML = `
        <div class="ic" style="color:${color};text-shadow:0 0 14px ${color}88;">${ic}</div>
        <div class="nm">${c.name}</div>
        <div class="ds">${c.description}</div>
        <div class="rk" style="color:${color};">${c.__perk ? 'PERK' : (rank > 0 ? `RANK ${rank + 1}/${maxRank}` : 'NEW')}</div>`;
      card.onclick = () => { this._sfx('ui_click'); this.game.chooseUpgrade(c); };
      card.onmouseenter = () => this._sfx('ui_hover');
      wrap.appendChild(card);
    }
    this.show('levelup');
  }

  // ---- Settings ----
  _buildSettings() {
    const s = document.createElement('div');
    s.className = 'screen'; s.id = 'settings';
    s.innerHTML = `
      <div style="position:absolute;inset:0;background:rgba(5,6,10,0.7);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px);">
        <div class="nv-panel nv-scroll" style="width:min(560px,92vw);max-height:86vh;padding:24px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div style="font:800 22px 'Segoe UI';letter-spacing:0.2em;color:#29e7ff;">SETTINGS</div>
            <button class="nv-btn ghost" id="setClose" style="padding:6px 12px;">✕</button>
          </div>
          <div style="margin-top:18px;display:flex;flex-direction:column;gap:16px;">
            <label style="display:flex;justify-content:space-between;align-items:center;gap:12px;"><span>Quality</span>
              <select id="setQuality" class="nv-input">
                <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="ultra">Ultra</option>
              </select></label>
            <label style="display:flex;justify-content:space-between;align-items:center;gap:12px;"><span>Master Volume</span><input id="setMaster" type="range" min="0" max="1" step="0.05" style="width:200px;"></label>
            <label style="display:flex;justify-content:space-between;align-items:center;gap:12px;"><span>SFX Volume</span><input id="setSFX" type="range" min="0" max="1" step="0.05" style="width:200px;"></label>
            <label style="display:flex;justify-content:space-between;align-items:center;gap:12px;"><span>Music Volume</span><input id="setMusic" type="range" min="0" max="1" step="0.05" style="width:200px;"></label>
            <label style="display:flex;justify-content:space-between;align-items:center;gap:12px;"><span>Mouse Sensitivity</span><input id="setSens" type="range" min="0.2" max="2.5" step="0.05" style="width:200px;"></label>
            <label style="display:flex;justify-content:space-between;align-items:center;gap:12px;"><span>Field of View</span><input id="setFOV" type="range" min="60" max="100" step="1" style="width:200px;"></label>
            <label style="display:flex;justify-content:space-between;align-items:center;gap:12px;"><span>Screen Shake</span><input id="setShake" type="range" min="0" max="2" step="0.05" style="width:200px;"></label>
            <label style="display:flex;justify-content:space-between;align-items:center;gap:12px;"><span>Invert Y</span><input id="setInvert" type="checkbox"></label>
            <label style="display:flex;justify-content:space-between;align-items:center;gap:12px;"><span>Auto Pointer Lock</span><input id="setAutoLock" type="checkbox"></label>
            <label style="display:flex;justify-content:space-between;align-items:center;gap:12px;"><span>Damage Numbers</span><input id="setDmgNum" type="checkbox"></label>
            <div style="display:flex;gap:10px;margin-top:8px;">
              <button class="nv-btn ghost" id="setReset" style="flex:1;">Reset Progression</button>
              <button class="nv-btn" id="setApply" style="flex:1;">Apply & Save</button>
            </div>
          </div>
        </div>
      </div>`;
    this.root.appendChild(s);
    this.screens.set('settings', s);
    s.querySelector('#setClose').onclick = () => { this._sfx('ui_back'); this._closeSettings(); };
    s.querySelector('#setApply').onclick = () => { this._sfx('ui_click'); this._applySettings(); };
    s.querySelector('#setReset').onclick = () => { if (confirm('Reset all progression? This cannot be undone.')) { this.save.resetProgression(); this.save.save(); this._refreshSettings(); } };
  }

  _refreshSettings() {
    const s = this.save.settings; const el = this.screens.get('settings');
    el.querySelector('#setQuality').value = s.quality || 'high';
    el.querySelector('#setMaster').value = s.masterVolume ?? 0.9;
    el.querySelector('#setSFX').value = s.sfxVolume ?? 0.9;
    el.querySelector('#setMusic').value = s.musicVolume ?? 0.55;
    el.querySelector('#setSens').value = s.mouseSensitivity ?? 1;
    el.querySelector('#setFOV').value = s.fov ?? 75;
    el.querySelector('#setShake').value = s.screenShake ?? 1;
    el.querySelector('#setInvert').checked = !!s.invertY;
    el.querySelector('#setAutoLock').checked = s.autoLock !== false;
    el.querySelector('#setDmgNum').checked = s.damageNumbers !== false;
  }

  _applySettings() {
    const el = this.screens.get('settings');
    const s = this.save.settings;
    s.quality = el.querySelector('#setQuality').value;
    s.masterVolume = parseFloat(el.querySelector('#setMaster').value);
    s.sfxVolume = parseFloat(el.querySelector('#setSFX').value);
    s.musicVolume = parseFloat(el.querySelector('#setMusic').value);
    s.mouseSensitivity = parseFloat(el.querySelector('#setSens').value);
    s.fov = parseInt(el.querySelector('#setFOV').value);
    s.screenShake = parseFloat(el.querySelector('#setShake').value);
    s.invertY = el.querySelector('#setInvert').checked;
    s.autoLock = el.querySelector('#setAutoLock').checked;
    s.damageNumbers = el.querySelector('#setDmgNum').checked;
    // apply live
    this.game.engine.setQuality(s.quality);
    if (this.game.audio) { this.game.audio.setMaster(s.masterVolume); this.game.audio.setSFX(s.sfxVolume); this.game.audio.setMusic(s.musicVolume); }
    if (this.game.input) { this.game.input.mouseSensitivity = 0.0022 * s.mouseSensitivity; this.game.input.invertY = s.invertY; }
    if (this.game.cameraRig) this.game.cameraRig.setFOV(s.fov);
    if (this.game.effects) this.game.effects.setShakeScale(s.screenShake);
    this.save.markDirty(); this.save.save();
    this._closeSettings();
  }

  _closeSettings() {
    if (this.game.state === 'paused') this.show('pause');
    else if (this.game.state === 'menu') this.show('menu');
    else this.show('hud');
  }

  // ---- Character Select ----
  _buildCharacterSelect() {
    const s = document.createElement('div');
    s.className = 'screen'; s.id = 'charselect';
    s.innerHTML = `
      <div style="position:absolute;inset:0;background:rgba(5,6,10,0.5);display:flex;flex-direction:column;align-items:center;padding-top:50px;backdrop-filter:blur(2px);">
        <div style="font:800 28px 'Segoe UI';letter-spacing:0.25em;color:#29e7ff;">SELECT OPERATIVE</div>
        <button class="nv-btn ghost" id="csBack" style="position:absolute;top:20px;left:20px;padding:8px 14px;">← Back</button>
        <div id="csList" style="display:flex;gap:14px;margin-top:26px;flex-wrap:wrap;justify-content:center;max-width:90vw;"></div>
      </div>`;
    this.root.appendChild(s);
    this.screens.set('charselect', s);
    s.querySelector('#csBack').onclick = () => { this._sfx('ui_back'); this.show('menu'); };
  }

  _refreshCharSelect() {
    const list = this.screens.get('charselect').querySelector('#csList');
    list.innerHTML = '';
    for (const c of CharacterRegistry.all()) {
      const unlocked = c.unlock <= (this.save.records.bestWave || 0);
      const card = document.createElement('div');
      card.className = 'nv-card lu-card';
      card.style.width = '220px';
      card.style.opacity = unlocked ? '1' : '0.5';
      card.style.pointerEvents = unlocked ? 'auto' : 'none';
      const ic = { ranger:'🎯', berserker:'⚔', gunner:'🔫', mage:'✨', scout:'🏹', warden:'🛡', phantom:'👻', engineer:'🤖' }[c.id] || '🟦';
      card.innerHTML = `
        <div style="font-size:34px;">${ic}</div>
        <div style="font:800 18px 'Segoe UI';color:#fff;margin-top:6px;">${c.name}</div>
        <div style="font:12px/1.4 'Segoe UI';color:#9fb3d6;margin-top:6px;min-height:48px;">${c.description}</div>
        <div style="font:11px monospace;color:#6f86a8;margin-top:8px;">HP ${c.startMaxHP} · SPD ${c.startSpeed}</div>
        <div style="font:11px 'Segoe UI';color:#ffd24a;margin-top:4px;">${c.passive?.name || ''}</div>
        ${unlocked ? '<button class="nv-btn primary" style="width:100%;margin-top:10px;">Deploy</button>' : `<div style="font:11px monospace;color:#ff5d7a;margin-top:10px;">LOCKED · Reach Wave ${c.unlock}</div>`}`;
      if (unlocked) card.querySelector('button').onclick = () => { this._sfx('ui_click'); this.game.startRun(c.id); };
      list.appendChild(card);
    }
  }

  // ---- Codex ----
  _buildCodex() {
    const s = document.createElement('div');
    s.className = 'screen'; s.id = 'codex';
    s.innerHTML = `
      <div style="position:absolute;inset:0;background:rgba(5,6,10,0.7);display:flex;flex-direction:column;align-items:center;padding:40px 20px;backdrop-filter:blur(3px);">
        <div style="font:800 26px 'Segoe UI';letter-spacing:0.25em;color:#29e7ff;">CODEX</div>
        <button class="nv-btn ghost" id="cxBack" style="position:absolute;top:20px;left:20px;padding:8px 14px;">← Back</button>
        <div style="display:flex;gap:8px;margin-top:16px;">
          <button class="nv-btn" data-tab="weapons">Weapons</button>
          <button class="nv-btn" data-tab="enemies">Enemies</button>
          <button class="nv-btn" data-tab="items">Items</button>
          <button class="nv-btn" data-tab="perks">Perks</button>
          <button class="nv-btn" data-tab="stats">Records</button>
        </div>
        <div id="cxContent" class="nv-panel nv-scroll" style="margin-top:18px;width:min(900px,94vw);max-height:70vh;padding:18px;display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;"></div>
      </div>`;
    this.root.appendChild(s);
    this.screens.set('codex', s);
    s.querySelector('#cxBack').onclick = () => { this._sfx('ui_back'); this.show('menu'); };
    s.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { this._sfx('ui_click'); this._codexTab(b.dataset.tab); });
  }

  _codexTab(tab) {
    const c = this.screens.get('codex').querySelector('#cxContent');
    c.innerHTML = '';
    const card = (title, sub, desc, color) => { const d = document.createElement('div'); d.className = 'nv-card'; d.innerHTML = `<div style="font:800 14px 'Segoe UI';color:${color || '#fff'};">${title}</div><div style="font:11px monospace;color:#6f86a8;margin-top:3px;">${sub || ''}</div><div style="font:12px/1.4 'Segoe UI';color:#9fb3d6;margin-top:6px;">${desc || ''}</div>`; return d; };
    if (tab === 'weapons') { for (const w of WeaponRegistry.all()) c.appendChild(card(w.name, w.category + ' · ' + w.rarity, w.description, ({ common:'#9fb3d6', uncommon:'#4fd07a', rare:'#4aa3ff', epic:'#b266ff', legendary:'#ffb347', mythic:'#ff3df0' })[w.rarity])); }
    else if (tab === 'enemies') { import('../enemies/EnemyRegistry.js').then(({ EnemyRegistry }) => { for (const e of EnemyRegistry.all()) c.appendChild(card(e.name, 'Tier ' + (e.tier || 0) + ' · ' + (e.behavior || ''), e.description, '#' + (e.color || 0xffffff).toString(16).padStart(6, '0'))); }); }
    else if (tab === 'items') { for (const it of ItemRegistry.all()) c.appendChild(card(it.name, it.rarity + (it.maxStacks > 1 ? ' · stacks x' + it.maxStacks : ''), it.description, '#' + RARITY_COLOR_ITEM[it.rarity].toString(16).padStart(6, '0'))); }
    else if (tab === 'perks') { import('../perks/PerkRegistry.js').then(({ PerkRegistry }) => { for (const p of PerkRegistry.all()) c.appendChild(card(p.name, p.rarity, p.description, '#ffb347')); }); }
    else if (tab === 'stats') {
      const r = this.save.records;
      c.style.display = 'block';
      c.appendChild(card('Best Wave', String(r.bestWave), 'Highest wave reached.', '#29e7ff'));
      c.appendChild(card('Best Score', formatNumber(r.bestScore), 'Highest single-run score.', '#ffd24a'));
      c.appendChild(card('Total Kills', formatNumber(r.totalKills), 'Lifetime enemy eliminations.', '#ff3df0'));
      c.appendChild(card('Bosses Killed', String(r.bossesKilled), 'Lifetime boss kills.', '#ff5544'));
      c.appendChild(card('Total Runs', String(r.totalRuns), 'Runs deployed.', '#9fb3d6'));
      c.appendChild(card('Currency', formatNumber(r.currency), 'Spendable meta-currency.', '#ffb347'));
    }
    c.style.display = tab === 'stats' ? 'block' : 'grid';
  }

  // ---- Shop (between waves, from pause) ----
  _openShop() {
    // simple inline shop using the codex panel pattern
    const prog = this.game.progression;
    const offers = ItemRegistry.shopOffers(this.game.rng, 4, { exclude: prog.items.filter(id => (prog.stacks[id] || 0) >= (ItemRegistry.get(id)?.maxStacks || 1)) });
    const wrap = this.screens.get('pause');
    let shop = document.getElementById('shopOverlay');
    if (shop) shop.remove();
    shop = document.createElement('div');
    shop.id = 'shopOverlay';
    shop.style.cssText = 'position:absolute;inset:0;background:rgba(5,6,10,0.85);display:flex;flex-direction:column;align-items:center;justify-content:center;backdrop-filter:blur(3px);';
    shop.innerHTML = `
      <div style="font:800 26px 'Segoe UI';letter-spacing:0.25em;color:#ffd24a;">ARSENAL · ◈ <span id="shopCur">${prog.currency}</span></div>
      <div class="nv-sub" style="margin-top:6px;">Spend currency on permanent-for-run items</div>
      <div id="shopItems" style="display:flex;gap:14px;margin-top:24px;flex-wrap:wrap;justify-content:center;"></div>
      <button class="nv-btn" id="shopClose" style="margin-top:26px;">Back</button>`;
    this.root.appendChild(shop);
    const items = shop.querySelector('#shopItems');
    for (const it of offers) {
      const card = document.createElement('div');
      card.className = 'lu-card'; card.style.width = '200px';
      const color = '#' + RARITY_COLOR_ITEM[it.rarity].toString(16).padStart(6, '0');
      card.style.borderColor = color + '66';
      const stacks = prog.stacks[it.id] || 0;
      card.innerHTML = `<div class="nm" style="color:${color};">${it.name}</div><div class="ds">${it.description}</div><div class="rk" style="color:${color};">${stacks > 0 ? 'OWNED x' + stacks : it.rarity.toUpperCase()}</div><div style="margin-top:10px;font:800 16px monospace;color:#ffd28a;">◈ ${it.price}</div>`;
      card.onclick = () => {
        if (this.game.buyItem(it.id)) { this._sfx('pickup'); shop.querySelector('#shopCur').textContent = this.game.progression.currency; card.style.opacity = '0.4'; card.style.pointerEvents = 'none'; }
        else this._sfx('ui_back');
      };
      items.appendChild(card);
    }
    shop.querySelector('#shopClose').onclick = () => { this._sfx('ui_back'); shop.remove(); this.show('pause'); };
  }

  // ---- Show/hide ----
  show(name) {
    for (const [n, el] of this.screens) el.classList.toggle('visible', n === name);
    this._current = name;
    // crosshair only in hud
    if (this.crosshair) this.crosshair.style.display = (name === 'hud') ? 'block' : 'none';
    if (name === 'charselect') this._refreshCharSelect();
    if (name === 'menu') { const m = this.screens.get('menu'); m.querySelector('#mBest').textContent = this.save.records.bestWave; m.querySelector('#mKills').textContent = this.save.records.totalKills; m.querySelector('#mCur').textContent = this.save.records.currency; }
  }

  onStateChange(state) {
    // screens are shown explicitly via show(); nothing required here yet
  }

  onPointerLock(locked) {
    if (this.game.state === 'playing' && !locked) { /* pause handled in Game */ }
  }

  onResize() {}

  _sfx(name) { bus.emit(Channels.PlaySFX, { name, volume: 0.4 }); }

  // ---- Per-frame HUD update ----
  tick(dt) {
    // minimap
    if (this.minimap) this.minimap.update();
    // toasts
    for (let i = this._toasts.length - 1; i >= 0; i--) {
      const t = this._toasts[i]; t.t += dt;
      if (t.t > t.life) { t.el.classList.remove('show'); setTimeout(() => t.el.remove(), 300); this._toasts.splice(i, 1); }
      else if (t.t > t.life - 0.4) t.el.style.opacity = String(clamp((t.life - t.t) / 0.4, 0, 1));
    }
    const g = this.game; if (!g.player) return;
    const h = g.player.get(Health); const sh = g.player.get(Shield); const body = g.player.get(Body); const p = g.player.get(Player);
    const prog = g.progression; const w = g.weapons.currentWeapon;
    const e = this._hudEls;
    if (h) { e.hudHealth.style.width = (clamp(h.current / h.max, 0, 1) * 100) + '%'; e.hudHealthText.textContent = `${Math.ceil(h.current)} / ${Math.round(h.max)}`; }
    if (sh && sh.max > 0) { e.hudShieldWrap.style.display = 'flex'; e.hudShield.style.width = (clamp(sh.current / sh.max, 0, 1) * 100) + '%'; e.hudShieldText.textContent = `${Math.ceil(sh.current)} / ${Math.round(sh.max)}`; }
    else e.hudShieldWrap.style.display = 'none';
    e.hudWave.textContent = `WAVE ${g.waveManager.wave}` + (g.waveManager.isBossWave ? ' · BOSS' : '');
    e.hudEnemies.textContent = `Enemies: ${g.waveManager.aliveCount}`;
    // intermission
    if (g.waveManager.state === 'intermission') { e.hudIntermission.style.display = 'block'; e.hudIntermission.textContent = `Next wave in ${Math.ceil(g.waveManager.intermissionTimer)}s`; }
    else e.hudIntermission.style.display = 'none';
    // boss bar
    const boss = g.world.findByTag('Boss');
    if (boss) { const bh = boss.get(Health); e.hudBossWrap.style.display = 'block'; e.hudBossName.textContent = (boss.get('Boss')?.title) || 'BOSS'; e.hudBossHealth.style.width = (clamp(bh.fraction, 0, 1) * 100) + '%'; }
    else e.hudBossWrap.style.display = 'none';
    // right cluster
    e.hudCurrency.textContent = formatNumber(prog.currency);
    e.hudScore.textContent = 'SCORE ' + formatNumber(prog.score);
    e.hudLevel.textContent = prog.level;
    e.hudXP.style.width = (clamp(prog.xp / prog.xpToNext, 0, 1) * 100) + '%';
    e.hudTime.textContent = formatTime(prog.time);
    // weapon
    if (w) { e.hudWeapon.textContent = w.def.name; e.hudAmmo.innerHTML = `${w.ammo} <span style="color:#6f86a8;font-size:14px;">${w.def.reserveMax > 0 ? '/ ' + w.reserve : ''}</span>`; if (w.reloading) e.hudAmmo.innerHTML += ' <span style="color:#ff3df0;font-size:12px;">RELOAD</span>'; }
    // weapon slots
    let list = '';
    for (let i = 0; i < g.weapons.slots.length; i++) { const sw = g.weapons.slots[i]; list += `<span style="font:700 11px monospace;padding:3px 7px;border-radius:4px;border:1px solid ${i === g.weapons.current ? '#29e7ff' : 'rgba(255,255,255,0.15)'};color:${i === g.weapons.current ? '#29e7ff' : '#6f86a8'};background:rgba(8,12,22,0.6);">${i + 1} ${sw.def.name}</span>`; }
    e.hudWeaponsList.innerHTML = list;
    // dash / ability
    if (p) { const k = g.player.get('Kinematics'); const cd = p.dashCooldown; e.hudDashBar.style.width = (clamp(1 - cd / (k?.dashCooldown || 0.9), 0, 1) * 100) + '%'; e.hudDashBar.style.background = cd <= 0 ? '#29e7ff' : '#3a4a66'; }
    const char = g.character;
    if (char?.ability) { const ab = AbilityRegistry.get(char.ability); if (ab) { e.hudAbility.style.display = 'block'; e.hudAbilityName.textContent = ab.name; const cd = g._abilityCooldowns[ab.id] || 0; e.hudAbilityBar.style.width = (clamp(1 - cd / ab.cooldown, 0, 1) * 100) + '%'; e.hudAbilityBar.style.background = cd <= 0 ? '#ff3df0' : '#3a4a66'; } }
    else e.hudAbility.style.display = 'none';
    e.hudKills.textContent = 'KILLS ' + prog.kills;
    // items
    let it = '';
    for (const id of prog.items) { const item = ItemRegistry.get(id); if (item) { const c = '#' + RARITY_COLOR_ITEM[item.rarity].toString(16).padStart(6, '0'); const s = prog.stacks[id] || 1; it += `<span title="${item.name}" style="display:inline-flex;align-items:center;justify-content:center;min-width:22px;height:22px;padding:0 5px;border-radius:5px;border:1px solid ${c}66;color:${c};background:rgba(8,12,22,0.7);font:700 11px monospace;">${s > 1 ? s : '◆'}</span>`; } }
    e.hudItems.innerHTML = it;
    // crosshair spread from firing/movement
    const spread = w ? (w.effectiveSpread * (body.vel.length() > 1 ? 2 : 1)) * 1200 : 4;
    const gap = 4 + clamp(spread, 0, 18);
    this._chLines.top.style.transform = `translateY(-${gap}px)`;
    this._chLines.bot.style.transform = `translateY(${gap}px)`;
    this._chLines.l.style.transform = `translateX(-${gap}px)`;
    this._chLines.r.style.transform = `translateX(${gap}px)`;
  }

  destroy() {
    for (const off of this._unsub) if (off) off();
    this._unsub = [];
    if (this.root) this.root.remove();
  }
}
