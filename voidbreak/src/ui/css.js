/**
 * VOIDBREAK — UI stylesheet.
 *
 * All UI styling in one injected stylesheet: sci-fi HUD look, menus,
 * buttons, cards, overlays. Uses CSS variables for theming.
 */

export const UI_CSS = `
:root {
  --accent: #35f0ff;
  --accent2: #ff3d7f;
  --gold: #ffd166;
  --warn: #ffb000;
  --danger: #ff3b3b;
  --ok: #4dffa6;
  --panel: rgba(8,12,20,0.86);
  --panel-border: rgba(80,220,255,0.28);
  --text: #e8f4ff;
  --text-dim: #8fa6bf;
  --font-mono: 'Consolas', 'Menlo', monospace;
}

.vb-root, .vb-root * { box-sizing: border-box; }
.vb-root {
  position: fixed; inset: 0;
  font-family: var(--font-mono);
  color: var(--text);
  pointer-events: none;
  z-index: 10;
  overflow: hidden;
}
.vb-root.pointer-active { pointer-events: auto; }

.vb-hidden { display: none !important; }
.vb-fade-in { animation: vbFadeIn 0.25s ease; }
@keyframes vbFadeIn { from { opacity: 0; } to { opacity: 1; } }

.vb-panel {
  background: var(--panel);
  border: 1px solid var(--panel-border);
  border-radius: 6px;
  padding: 20px;
  box-shadow: 0 0 30px rgba(0,0,0,0.5), inset 0 0 40px rgba(53,240,255,0.03);
}
.vb-title {
  font-size: 22px; font-weight: 700; letter-spacing: 4px;
  color: var(--accent); text-transform: uppercase;
  text-shadow: 0 0 12px rgba(53,240,255,0.5);
  margin: 0 0 6px 0;
}
.vb-subtitle { color: var(--text-dim); font-size: 12px; letter-spacing: 2px; margin: 0 0 18px 0; }
.vb-section-title {
  font-size: 13px; letter-spacing: 3px; color: var(--accent);
  border-bottom: 1px solid rgba(53,240,255,0.2);
  padding-bottom: 6px; margin: 18px 0 10px 0; text-transform: uppercase;
}

.vb-btn {
  pointer-events: auto;
  display: inline-block;
  background: rgba(53,240,255,0.08);
  border: 1px solid rgba(53,240,255,0.4);
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 10px 22px;
  margin: 4px;
  cursor: pointer;
  border-radius: 3px;
  transition: all 0.12s ease;
  position: relative;
  overflow: hidden;
}
.vb-btn:hover { background: rgba(53,240,255,0.2); border-color: var(--accent); color: #fff; box-shadow: 0 0 14px rgba(53,240,255,0.3); }
.vb-btn:active { transform: translateY(1px); }
.vb-btn:disabled { opacity: 0.35; cursor: default; }
.vb-btn.primary { background: var(--accent); color: #04121a; font-weight: 700; }
.vb-btn.primary:hover { background: #7df5ff; }
.vb-btn.danger { border-color: rgba(255,59,59,0.5); color: var(--danger); }
.vb-btn.danger:hover { background: rgba(255,59,59,0.15); border-color: var(--danger); }
.vb-btn.gold { border-color: rgba(255,209,102,0.5); color: var(--gold); }
.vb-btn.gold:hover { background: rgba(255,209,102,0.15); }
.vb-btn.small { font-size: 11px; padding: 5px 12px; letter-spacing: 1px; }
.vb-btn.big { font-size: 18px; padding: 14px 40px; letter-spacing: 5px; }

.vb-slider {
  -webkit-appearance: none; appearance: none;
  width: 200px; height: 4px;
  background: rgba(143,166,191,0.3);
  border-radius: 2px; outline: none;
  cursor: pointer;
}
.vb-slider::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none;
  width: 14px; height: 14px; border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px rgba(53,240,255,0.6);
  cursor: pointer;
}
.vb-slider::-moz-range-thumb {
  width: 14px; height: 14px; border: none; border-radius: 50%;
  background: var(--accent); cursor: pointer;
}

.vb-toggle {
  position: relative; width: 46px; height: 22px;
  background: rgba(143,166,191,0.25);
  border-radius: 12px; cursor: pointer;
  border: 1px solid rgba(143,166,191,0.4);
  transition: all 0.15s;
  pointer-events: auto;
}
.vb-toggle .knob {
  position: absolute; top: 2px; left: 2px;
  width: 16px; height: 16px; border-radius: 50%;
  background: var(--text-dim);
  transition: all 0.15s;
}
.vb-toggle.on { background: rgba(53,240,255,0.3); border-color: var(--accent); }
.vb-toggle.on .knob { left: 26px; background: var(--accent); box-shadow: 0 0 8px var(--accent); }

.vb-select {
  background: rgba(8,12,20,0.9);
  color: var(--text);
  border: 1px solid var(--panel-border);
  padding: 8px 10px;
  font-family: var(--font-mono);
  font-size: 13px;
  border-radius: 3px;
  cursor: pointer;
  pointer-events: auto;
}
.vb-select:focus { outline: none; border-color: var(--accent); }

.vb-keybind {
  pointer-events: auto;
  background: rgba(53,240,255,0.08);
  border: 1px solid rgba(53,240,255,0.35);
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 12px;
  padding: 5px 12px;
  border-radius: 3px;
  cursor: pointer;
  min-width: 70px;
  text-align: center;
}
.vb-keybind.listening { border-color: var(--gold); color: var(--gold); box-shadow: 0 0 10px rgba(255,209,102,0.4); }

.vb-screen {
  position: fixed; inset: 0;
  display: flex; align-items: center; justify-content: center;
  z-index: 50;
  background: radial-gradient(ellipse at center, rgba(4,8,16,0.72) 0%, rgba(2,4,10,0.92) 100%);
  pointer-events: auto;
}
.vb-menu { width: 640px; max-width: 94vw; max-height: 92vh; overflow-y: auto; text-align: center; }
.vb-menu.wide { width: 900px; }
.vb-menu .menu-title {
  font-size: 46px; font-weight: 800; letter-spacing: 14px;
  color: var(--accent);
  text-shadow: 0 0 30px rgba(53,240,255,0.6);
  margin: 6px 0 2px 0;
}
.vb-menu .menu-sub { color: var(--text-dim); letter-spacing: 6px; font-size: 12px; margin-bottom: 26px; }
.vb-menu-actions { display: flex; flex-direction: column; align-items: center; gap: 6px; margin: 20px 0; }
.vb-menu-actions .vb-btn { width: 320px; }

.vb-row {
  display: flex; align-items: center; justify-content: space-between;
  gap: 12px; padding: 8px 4px;
  border-bottom: 1px solid rgba(143,166,191,0.08);
}
.vb-row label { color: var(--text); font-size: 13px; letter-spacing: 1px; }
.vb-row .desc { color: var(--text-dim); font-size: 11px; }
.vb-column { display: flex; flex-direction: column; gap: 4px; }

.vb-hud { position: absolute; inset: 0; pointer-events: none; }

.vb-hud-top {
  position: absolute; top: 14px; left: 0; right: 0;
  display: flex; justify-content: space-between; align-items: flex-start;
  padding: 0 18px;
}
.vb-wave-box { text-align: left; }
.vb-wave-label { color: var(--text-dim); font-size: 10px; letter-spacing: 3px; }
.vb-wave-number { color: var(--accent); font-size: 30px; font-weight: 800; text-shadow: 0 0 12px rgba(53,240,255,0.5); line-height: 1; }
.vb-wave-enemies { color: var(--warn); font-size: 12px; margin-top: 2px; }

.vb-score-box { text-align: right; }
.vb-score { font-size: 26px; color: var(--gold); font-weight: 700; text-shadow: 0 0 10px rgba(255,209,102,0.4); }
.vb-combo { font-size: 15px; color: var(--accent2); letter-spacing: 1px; min-height: 18px; }
.vb-timer { font-size: 12px; color: var(--text-dim); }

.vb-bossbar {
  position: absolute; top: 90px; left: 50%; transform: translateX(-50%);
  width: 560px; max-width: 80vw;
}
.vb-bossbar .name { text-align: center; color: var(--danger); font-size: 16px; letter-spacing: 5px; margin-bottom: 4px; text-shadow: 0 0 10px rgba(255,59,59,0.5); }
.vb-bossbar .bar {
  height: 10px; background: rgba(255,59,59,0.15);
  border: 1px solid rgba(255,59,59,0.5);
  border-radius: 5px; overflow: hidden;
}
.vb-bossbar .fill { height: 100%; background: linear-gradient(90deg, #ff3b3b, #ff8a5a); transition: width 0.15s; }

.vb-hud-bottom {
  position: absolute; bottom: 18px; left: 18px; right: 18px;
  display: flex; justify-content: space-between; align-items: flex-end;
  gap: 12px;
}
.vb-ammo {
  font-size: 40px; font-weight: 800; color: var(--text);
  text-shadow: 0 0 12px rgba(0,0,0,0.8);
  line-height: 1;
}
.vb-ammo.reloading { color: var(--warn); }
.vb-weapon-name { color: var(--text-dim); font-size: 12px; letter-spacing: 2px; margin-top: 2px; }
.vb-reload-bar {
  width: 180px; height: 3px; background: rgba(143,166,191,0.2);
  border-radius: 2px; margin-top: 6px; overflow: hidden;
}
.vb-reload-bar .fill { height: 100%; background: var(--warn); }

.vb-vitals { display: flex; flex-direction: column; gap: 6px; min-width: 240px; }
.vb-vital-row { display: flex; align-items: center; gap: 10px; }
.vb-vital-row .icon { width: 22px; text-align: center; font-size: 14px; }
.vb-vital-row .bar { flex: 1; height: 12px; background: rgba(0,0,0,0.5); border: 1px solid rgba(143,166,191,0.25); border-radius: 3px; overflow: hidden; }
.vb-vital-row .fill { height: 100%; transition: width 0.12s ease; }
.vb-vital-row .num { width: 44px; text-align: right; font-size: 12px; color: var(--text-dim); }
.vb-hp .fill { background: linear-gradient(90deg, #3dff8a, #4dffa6); box-shadow: 0 0 8px rgba(77,255,166,0.4); }
.vb-hp.low .fill { background: linear-gradient(90deg, #ff3b3b, #ff8a5a); animation: vbPulse 0.8s infinite; }
.vb-shield .fill { background: linear-gradient(90deg, #4d8aff, #6aa8ff); box-shadow: 0 0 8px rgba(106,168,255,0.4); }
@keyframes vbPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.55; } }

.vb-minimap {
  position: absolute; right: 18px; bottom: 18px;
  width: 150px; height: 150px;
  border: 1px solid rgba(53,240,255,0.3);
  background: rgba(4,10,18,0.7);
  border-radius: 4px;
  overflow: hidden;
}
.vb-minimap canvas { width: 100%; height: 100%; display: block; }

.vb-crosshair { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none; }
.vb-crosshair svg { display: block; }

.vb-damage-num {
  position: absolute;
  font-family: var(--font-mono);
  font-weight: 800;
  text-shadow: 0 0 6px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.7);
  transform: translate(-50%, -50%);
  pointer-events: none;
  white-space: nowrap;
  animation: vbDamageFloat 0.9s ease-out forwards;
}
@keyframes vbDamageFloat {
  0% { opacity: 0; transform: translate(-50%, -30%) scale(0.6); }
  12% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
  25% { transform: translate(-50%, -55%) scale(1); }
  100% { opacity: 0; transform: translate(-50%, -160%) scale(0.9); }
}

.vb-hitmarker { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
.vb-hitmarker .seg {
  position: absolute; width: 12px; height: 3px; background: #fff;
  border-radius: 1px;
}
.vb-hitmarker.crit .seg { background: var(--danger); }

.vb-killfeed {
  position: absolute; top: 16px; right: 180px;
  display: flex; flex-direction: column; gap: 3px;
  align-items: flex-end;
}
.vb-killfeed .item {
  font-size: 11px; color: var(--text);
  background: rgba(4,10,18,0.7);
  padding: 3px 8px; border-radius: 3px;
  border-left: 2px solid var(--accent);
  animation: vbKillIn 0.2s ease, vbKillOut 0.4s ease 4.6s forwards;
  max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.vb-killfeed .item .weapon { color: var(--gold); }
.vb-killfeed .item.crit { border-left-color: var(--danger); }
@keyframes vbKillIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; } }
@keyframes vbKillOut { to { opacity: 0; transform: translateX(30px); } }

.vb-toast {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  font-size: 26px; letter-spacing: 6px; font-weight: 800;
  color: var(--gold);
  text-shadow: 0 0 20px rgba(0,0,0,0.9), 0 0 30px rgba(255,209,102,0.4);
  opacity: 0;
  pointer-events: none;
  white-space: nowrap;
}
.vb-toast.show { animation: vbToast 2.2s ease forwards; }
@keyframes vbToast {
  0% { opacity: 0; transform: translate(-50%, -30%) scale(0.8); }
  12% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
  20% { transform: translate(-50%, -50%) scale(1); }
  80% { opacity: 1; }
  100% { opacity: 0; transform: translate(-50%, -60%) scale(1.1); }
}

.vb-banner {
  position: absolute; top: 34%; left: 50%; transform: translateX(-50%);
  text-align: center; pointer-events: none;
}
.vb-banner .big {
  font-size: 44px; font-weight: 800; letter-spacing: 12px;
  color: var(--accent);
  text-shadow: 0 0 30px rgba(53,240,255,0.6);
  animation: vbBannerIn 0.5s cubic-bezier(0.2, 1.4, 0.4, 1) forwards;
}
.vb-banner .sub {
  font-size: 15px; letter-spacing: 6px; color: var(--text-dim);
  margin-top: 8px;
  animation: vbBannerIn 0.5s 0.2s cubic-bezier(0.2, 1.4, 0.4, 1) both;
}
@keyframes vbBannerIn { from { opacity: 0; transform: translateY(24px) scale(0.9); } to { opacity: 1; } }

.vb-intermission {
  position: absolute; bottom: 24%; left: 50%; transform: translateX(-50%);
  text-align: center;
}
.vb-intermission .t { font-size: 34px; font-weight: 800; color: var(--gold); letter-spacing: 8px; text-shadow: 0 0 20px rgba(255,209,102,0.5); }
.vb-intermission .s { font-size: 13px; color: var(--text-dim); letter-spacing: 3px; margin-top: 6px; }

.vb-hint {
  position: absolute; bottom: 130px; left: 50%; transform: translateX(-50%);
  background: rgba(4,10,18,0.8);
  border: 1px solid rgba(53,240,255,0.3);
  padding: 8px 16px; border-radius: 4px;
  font-size: 12px; letter-spacing: 1px; color: var(--text);
  pointer-events: none;
  white-space: nowrap;
  animation: vbHint 5s ease forwards;
}
@keyframes vbHint { 0% { opacity: 0; } 8% { opacity: 1; } 85% { opacity: 1; } 100% { opacity: 0; } }

.vb-cards { display: flex; gap: 18px; justify-content: center; flex-wrap: wrap; margin: 18px 0; }
.vb-card {
  pointer-events: auto;
  width: 230px;
  background: rgba(10,16,28,0.92);
  border: 1px solid rgba(143,166,191,0.25);
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
  text-align: center;
}
.vb-card:hover { transform: translateY(-6px); border-color: var(--accent); box-shadow: 0 8px 30px rgba(53,240,255,0.2); }
.vb-card .icon { font-size: 34px; margin-bottom: 8px; }
.vb-card .name { font-size: 15px; font-weight: 700; letter-spacing: 1px; color: var(--text); margin-bottom: 6px; }
.vb-card .rarity { font-size: 10px; letter-spacing: 3px; margin-bottom: 8px; }
.vb-card .desc { font-size: 12px; color: var(--text-dim); line-height: 1.5; }

.vb-ach-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; text-align: left; max-height: 400px; overflow-y: auto; }
.vb-ach { display: flex; gap: 10px; align-items: center; padding: 8px; background: rgba(143,166,191,0.06); border-radius: 4px; border: 1px solid rgba(143,166,191,0.1); }
.vb-ach .ic { font-size: 20px; width: 28px; text-align: center; }
.vb-ach .nm { font-size: 12px; color: var(--text); }
.vb-ach .ds { font-size: 10px; color: var(--text-dim); }
.vb-ach.locked { opacity: 0.35; }

.vb-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; text-align: left; }
.vb-stat { background: rgba(143,166,191,0.06); padding: 10px; border-radius: 4px; }
.vb-stat .k { font-size: 10px; color: var(--text-dim); letter-spacing: 2px; text-transform: uppercase; }
.vb-stat .v { font-size: 20px; color: var(--text); margin-top: 4px; font-weight: 700; }

.vb-footer { color: var(--text-dim); font-size: 11px; letter-spacing: 1px; margin-top: 16px; }

.vb-toast2 {
  position: absolute; top: 70px; left: 50%; transform: translateX(-50%);
  background: rgba(8,12,20,0.9);
  border: 1px solid var(--gold);
  border-radius: 4px;
  padding: 10px 18px;
  font-size: 13px; color: var(--gold);
  animation: vbToast2 3s ease forwards;
  pointer-events: none;
}
@keyframes vbToast2 { 0% { opacity: 0; transform: translateX(-50%) translateY(-10px); } 10% { opacity: 1; } 80% { opacity: 1; } 100% { opacity: 0; } }

.vb-armory-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; text-align: left; }
.vb-armory { padding: 10px; background: rgba(143,166,191,0.06); border-radius: 4px; border: 1px solid rgba(143,166,191,0.12); }
.vb-armory .nm { font-size: 13px; color: var(--text); font-weight: 700; }
.vb-armory .ds { font-size: 11px; color: var(--text-dim); }
.vb-armory.locked { opacity: 0.4; }

.vb-vignette {
  position: absolute; inset: 0;
  pointer-events: none;
  box-shadow: inset 0 0 140px rgba(0,0,0,0.55);
}
.vb-damage-vignette {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(255,0,0,0.35) 100%);
  opacity: 0; transition: opacity 0.2s;
}
.vb-lowhp-vignette {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse at center, transparent 45%, rgba(255,0,0,0.45) 100%);
  opacity: 0; transition: opacity 0.4s;
}
`;
