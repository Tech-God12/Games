// ============================================================================
// ExtraScreens.js
// Additional UI screens installed onto the UIManager after its initial build:
// Achievements, Meta Skill Tree, Daily & Weekly Challenges, Controls,
// Tutorial, Credits, and a live Minimap widget. Keeping these separate avoids
// bloating UIManager and lets the game lazy-mount richer meta features.
// ============================================================================

import { bus, Channels } from '../core/EventBus.js';
import { AchievementRegistry } from '../progression/Achievements.js';
import { MetaSkillTree, MetaBranch } from '../progression/MetaSkillTree.js';
import { DailyChallenge, ChallengeModifiers } from '../game/DailyChallenge.js';
import { DifficultyManager, Difficulties } from '../game/Difficulty.js';
import { WeaponRegistry } from '../weapons/WeaponRegistry.js';
import { CharacterRegistry } from '../player/Characters.js';
import { EnemyRegistry } from '../enemies/EnemyRegistry.js';
import { BossRegistry } from '../bosses/BossRegistry.js';
import { ItemRegistry } from '../items/ItemRegistry.js';
import { PerkRegistry } from '../perks/PerkRegistry.js';
import { AbilityRegistry } from '../abilities/AbilityRegistry.js';
import { allLoreEntries, LoreCategories } from '../data/Lore.js';
import { formatNumber } from '../core/MathUtils.js';
import { T } from '../data/Localization.js';

const BRANCH_COLOR = { vitality: '#4fd07a', offense: '#ff5544', economy: '#ffb347', utility: '#29e7ff', arcana: '#b266ff' };

export function installExtraScreens(ui) {
  const game = ui.game; const save = ui.save;
  ui._buildAchievements = () => buildAchievements(ui);
  ui._buildMetaTree = () => buildMetaTree(ui);
  ui._buildDaily = () => buildDaily(ui);
  ui._buildControls = () => buildControls(ui);
  ui._buildTutorial = () => buildTutorial(ui);
  ui._buildCredits = () => buildCredits(ui);

  buildAchievements(ui);
  buildMetaTree(ui);
  buildDaily(ui);
  buildControls(ui);
  buildTutorial(ui);
  buildCredits(ui);

  // add menu buttons
  const menu = ui.screens.get('menu');
  if (menu) {
    const row = menu.querySelector('div > div:nth-child(2)'); // the button row
    // append extra buttons into the second row
    let row2 = menu.querySelector('#mExtraRow');
    if (!row2) {
      row2 = document.createElement('div'); row2.id = 'mExtraRow'; row2.style.cssText = 'display:flex;gap:10px;';
      const btnRow = menu.querySelectorAll('.nv-btn');
      btnRow[btnRow.length - 1]?.parentElement?.appendChild(row2);
    }
    addMenuButton(row2, 'Achievements', () => { sfx(); refreshAchievements(ui); ui.show('achievements'); });
    addMenuButton(row2, 'Skill Tree', () => { sfx(); refreshMetaTree(ui); ui.show('metatree'); });
    addMenuButton(row2, 'Daily', () => { sfx(); refreshDaily(ui); ui.show('daily'); });
    addMenuButton(row2, 'How to Play', () => { sfx(); ui.show('tutorial'); });
    addMenuButton(row2, 'Credits', () => { sfx(); ui.show('credits'); });
  }

  // minimap widget
  ui.minimap = new Minimap(game);
  ui.root.appendChild(ui.minimap.canvas);
}

function addMenuButton(parent, label, onclick) {
  const b = document.createElement('button'); b.className = 'nv-btn'; b.textContent = label;
  b.onclick = onclick; parent.appendChild(b); return b;
}
function sfx() { bus.emit(Channels.PlaySFX, { name: 'ui_click', volume: 0.35 }); }
function makeScreen(id) {
  const s = document.createElement('div'); s.className = 'screen'; s.id = id; return s;
}
function header(title, backCb) {
  return `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
    <div style="font:800 22px 'Segoe UI';letter-spacing:0.2em;color:#29e7ff;">${title}</div>
    <button class="nv-btn ghost" id="${title.replace(/\s/g,'')}Back" style="padding:6px 12px;">← Back</button></div>`;
}

// ---- Achievements ----
function buildAchievements(ui) {
  const s = makeScreen('achievements');
  s.innerHTML = `<div style="position:absolute;inset:0;background:rgba(5,6,10,0.8);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px);">
    <div class="nv-panel nv-scroll" style="width:min(900px,94vw);max-height:86vh;padding:24px;">
      ${header('ACHIEVEMENTS')}
      <div id="achGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px;"></div>
    </div></div>`;
  ui.root.appendChild(s); ui.screens.set('achievements', s);
  s.querySelector('#ACHIEVEMENTSBack').onclick = () => { sfx(); ui.show('menu'); };
}
function refreshAchievements(ui) {
  const grid = ui.screens.get('achievements').querySelector('#achGrid');
  grid.innerHTML = '';
  const tierColor = { bronze: '#cd7f32', silver: '#c0c0c0', gold: '#ffd24a', platinum: '#9fe7ff' };
  for (const a of AchievementRegistry.all()) {
    const unlocked = !!ui.save.achievements[a.id];
    const c = tierColor[a.tier] || '#9fb3d6';
    const d = document.createElement('div'); d.className = 'nv-card';
    d.style.opacity = unlocked ? '1' : '0.55';
    d.innerHTML = `<div style="display:flex;gap:10px;align-items:center;">
      <div style="font-size:24px;filter:${unlocked?'none':'grayscale(1)'};">${a.icon}</div>
      <div><div style="font:800 14px 'Segoe UI';color:${unlocked?c:'#6f86a8'};">${a.name}</div>
      <div style="font:11px/1.3 'Segoe UI';color:#9fb3d6;">${a.hidden && !unlocked ? 'Hidden achievement' : a.description}</div>
      <div style="font:10px monospace;color:${c};margin-top:3px;letter-spacing:0.1em;text-transform:uppercase;">${a.tier}${unlocked?' · UNLOCKED':''}</div></div></div>`;
    grid.appendChild(d);
  }
}

// ---- Meta Skill Tree ----
function buildMetaTree(ui) {
  const s = makeScreen('metatree');
  s.innerHTML = `<div style="position:absolute;inset:0;background:rgba(5,6,10,0.8);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px);">
    <div class="nv-panel nv-scroll" style="width:min(960px,94vw);max-height:88vh;padding:24px;">
      ${header('SKILL TREE')}
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <div style="font:700 14px monospace;color:#ffd28a;">Meta Points: <span id="mtPoints">0</span></div>
        <div style="font:700 12px monospace;color:#9fb3d6;">Currency: <span id="mtCur">0</span> · 1 currency = 1 meta point (auto)</div>
      </div>
      <div id="mtBranches" style="display:flex;flex-direction:column;gap:18px;"></div>
    </div></div>`;
  ui.root.appendChild(s); ui.screens.set('metatree', s);
  s.querySelector('#SKILLTREEBack').onclick = () => { sfx(); ui.show('menu'); };
}
function refreshMetaTree(ui) {
  const wrap = ui.screens.get('metatree');
  wrap.querySelector('#mtPoints').textContent = ui.save.meta.metaPoints || 0;
  wrap.querySelector('#mtCur').textContent = formatNumber(ui.save.records.currency || 0);
  const branches = wrap.querySelector('#mtBranches'); branches.innerHTML = '';
  const ranks = ui.save.meta.upgrades || {};
  const metaPoints = ui.save.meta.metaPoints || 0;
  for (const br of Object.values(MetaBranch)) {
    const nodes = MetaSkillTree.byBranch(br);
    if (!nodes.length) continue;
    const col = BRANCH_COLOR[br];
    const sec = document.createElement('div');
    sec.innerHTML = `<div style="font:800 14px 'Segoe UI';letter-spacing:0.15em;color:${col};text-transform:uppercase;margin-bottom:8px;">${br}</div><div class="mtNodes" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px;"></div>`;
    const nodesWrap = sec.querySelector('.mtNodes');
    for (const node of nodes) {
      const rank = ranks[node.id] || 0;
      const maxed = rank >= node.maxRank;
      const cost = MetaSkillTree.cost(node, rank);
      const canBuy = !maxed && metaPoints >= cost && (!node.requires || node.requires.every(r => (ranks[r] || 0) >= 1));
      const card = document.createElement('div'); card.className = 'nv-card';
      card.style.opacity = maxed ? '0.7' : '1';
      card.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div style="font:800 13px 'Segoe UI';color:#fff;">${node.name}</div>
          <div style="font:10px monospace;color:${col};">${rank}/${node.maxRank}</div>
        </div>
        <div style="font:11px/1.35 'Segoe UI';color:#9fb3d6;margin-top:4px;min-height:30px;">${node.description}</div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;">
          <div style="font:10px monospace;color:#6f86a8;">${node.requires?.length ? 'req: ' + node.requires.join(',') : ''}</div>
          <button class="nv-btn ${maxed?'ghost':'primary'}" style="padding:5px 12px;font-size:12px;pointer-events:${canBuy?'auto':'none'};opacity:${canBuy?'1':'0.4'};">${maxed?'MAX':cost+' MP'}</button>
        </div>`;
      const btn = card.querySelector('button');
      if (!maxed) btn.onclick = () => { if (purchaseMeta(ui, node)) { sfx(); refreshMetaTree(ui); } else bus.emit(Channels.PlaySFX, { name: 'ui_back', volume: 0.3 }); };
      nodesWrap.appendChild(card);
    }
    branches.appendChild(sec);
  }
}
function purchaseMeta(ui, node) {
  const save = ui.save; const ranks = save.meta.upgrades || (save.meta.upgrades = {});
  const rank = ranks[node.id] || 0;
  if (rank >= node.maxRank) return false;
  // convert currency to meta points as needed
  const need = MetaSkillTree.cost(node, rank);
  let mp = save.meta.metaPoints || 0;
  if (mp < need) {
    const convert = need - mp;
    if (save.records.currency < convert) return false;
    save.records.currency -= convert; mp += convert; save.meta.metaPoints = mp; save.markDirty();
  }
  save.meta.metaPoints -= need; ranks[node.id] = rank + 1; save.meta.upgrades = ranks; save.markDirty(); save.save();
  return true;
}

// ---- Daily & Weekly ----
function buildDaily(ui) {
  const s = makeScreen('daily');
  s.innerHTML = `<div style="position:absolute;inset:0;background:rgba(5,6,10,0.8);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px);">
    <div class="nv-panel nv-scroll" style="width:min(720px,94vw);max-height:86vh;padding:24px;">
      ${header('CHALLENGES')}
      <div id="dailyContent"></div>
    </div></div>`;
  ui.root.appendChild(s); ui.screens.set('daily', s);
  s.querySelector('#CHALLENGESBack').onclick = () => { sfx(); ui.show('menu'); };
}
function refreshDaily(ui) {
  const dc = ui.game.dailyChallenge || new DailyChallenge(ui.save, WeaponRegistry.ids(), CharacterRegistry.ids());
  ui.game.dailyChallenge = dc;
  const c = ui.screens.get('daily').querySelector('#dailyContent');
  const daily = dc.daily(); const weekly = dc.weekly();
  c.innerHTML = '';
  c.appendChild(renderChallenge(ui, dc, daily, 'DAILY'));
  c.appendChild(renderChallenge(ui, dc, weekly, 'WEEKLY'));
}
function renderChallenge(ui, dc, ch, label) {
  const completed = dc.isCompleted(ch.key);
  const div = document.createElement('div'); div.className = 'nv-card'; div.style.marginBottom = '14px';
  const char = CharacterRegistry.get(ch.character);
  const weapons = ch.weapons.map(id => WeaponRegistry.get(id)?.name || id).join(', ');
  const mods = ch.modifiers.map(m => `<span style="display:inline-block;margin:2px 4px 2px 0;padding:3px 8px;border-radius:5px;background:rgba(255,61,240,0.15);border:1px solid #ff3df066;color:#ff9de0;font:700 11px 'Segoe UI';">${m.name}</span>`).join('');
  div.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <div style="font:800 16px 'Segoe UI';color:#29e7ff;">${label} · ${ch.key}</div>
      <div style="font:700 12px monospace;color:${completed?'#4fd07a':'#ffd24a'};">${completed?'COMPLETED':'ACTIVE'}</div>
    </div>
    <div style="margin-top:8px;font:13px 'Segoe UI';color:#cfe6ff;">Operative: <b>${char?.name || ch.character}</b></div>
    <div style="font:12px 'Segoe UI';color:#9fb3d6;margin-top:4px;">Loadout: ${weapons}</div>
    <div style="margin-top:8px;">${mods}</div>
    <div style="margin-top:10px;font:800 14px 'Segoe UI';color:#ffd24a;">Goal: ${ch.goal.label(ch.goal.value)}</div>
    <button class="nv-btn primary" style="margin-top:12px;${completed?'opacity:0.5;pointer-events:none;':''}">${completed?'Completed':'Accept Challenge'}</button>`;
  if (!completed) div.querySelector('button').onclick = () => { sfx(); ui.game.startRun(ch.character, { challenge: ch }); ui.show('hud'); };
  return div;
}

// ---- Controls ----
function buildControls(ui) {
  const s = makeScreen('controls');
  const rows = [
    ['Move', 'W A S D / Arrow Keys'], ['Look', 'Mouse'], ['Fire', 'Left Mouse'], ['Alt Fire', 'Right Mouse'],
    ['Reload', 'R'], ['Dash', 'Shift'], ['Jump', 'Space'], ['Ability', 'Q / F / V / X (varies)'],
    ['Swap Weapon', 'Wheel / 1-4'], ['Pause', 'Escape'], ['Toggle Stats', 'F3'],
  ];
  s.innerHTML = `<div style="position:absolute;inset:0;background:rgba(5,6,10,0.8);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px);">
    <div class="nv-panel" style="width:min(560px,92vw);padding:24px;">
      ${header('CONTROLS')}
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${rows.map(([a,k]) => `<div style="display:flex;justify-content:space-between;padding:8px 12px;background:rgba(255,255,255,0.04);border-radius:6px;"><span style="color:#cfe6ff;font:600 13px 'Segoe UI';">${a}</span><span style="color:#29e7ff;font:700 12px monospace;letter-spacing:0.08em;">${k}</span></div>`).join('')}
      </div>
    </div></div>`;
  ui.root.appendChild(s); ui.screens.set('controls', s);
  s.querySelector('#CONTROLSBack').onclick = () => { sfx(); ui.show('menu'); };
}

// ---- Tutorial ----
function buildTutorial(ui) {
  const s = makeScreen('tutorial');
  const steps = [
    ['Deploy', 'Pick an Operative from the roster. Each has unique stats, a passive, and a signature ability. Start with the Ranger.'],
    ['Move & Look', 'WASD to move, mouse to look. Click to capture the mouse. Dash with Shift for a quick burst and i-frames.'],
    ['Shoot', 'Left click to fire your weapon. Right click for alt fire (where applicable). R to reload. Every weapon handles differently.'],
    ['Waves', 'Enemies arrive in waves. Clear them all to advance. Every 5th wave summons a Boss with multiple phases.'],
    ['Level Up', 'Kills grant XP. Level up to choose from upgrades, perks, and items that shape your build.'],
    ['Shop', 'Pause the run and open the Shop to spend currency on items. Currency also persists between runs as Meta Points.'],
    ['Hazards & Combos', 'Later biomes spawn environmental hazards. Chain kills to build a combo multiplier for bonus currency.'],
    ['Survive', 'There is no true end. Push for a higher wave each run. Unlock operatives, weapons, and skill-tree nodes as you go.'],
  ];
  s.innerHTML = `<div style="position:absolute;inset:0;background:rgba(5,6,10,0.8);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px);">
    <div class="nv-panel nv-scroll" style="width:min(640px,92vw);max-height:86vh;padding:24px;">
      ${header('HOW TO PLAY')}
      <div style="display:flex;flex-direction:column;gap:14px;">
        ${steps.map(([t,d],i) => `<div class="nv-card"><div style="font:800 15px 'Segoe UI';color:#29e7ff;">${i+1}. ${t}</div><div style="font:13px/1.5 'Segoe UI';color:#9fb3d6;margin-top:5px;">${d}</div></div>`).join('')}
      </div>
    </div></div>`;
  ui.root.appendChild(s); ui.screens.set('tutorial', s);
  s.querySelector('#HOWTOPLAYBack').onclick = () => { sfx(); ui.show('menu'); };
}

// ---- Credits ----
function buildCredits(ui) {
  const s = makeScreen('credits');
  s.innerHTML = `<div style="position:absolute;inset:0;background:rgba(5,6,10,0.8);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px);">
    <div class="nv-panel" style="width:min(560px,92vw);padding:24px;text-align:center;">
      ${header('CREDITS')}
      <div style="font:800 28px 'Segoe UI';letter-spacing:0.2em;background:linear-gradient(90deg,#29e7ff,#ff3df0);-webkit-background-clip:text;background-clip:text;color:transparent;">NEXUS PROTOCOL</div>
      <div style="font:600 13px 'Segoe UI';color:#9fb3d6;margin-top:10px;">Arena Survivor</div>
      <div style="margin-top:22px;font:13px/1.6 'Segoe UI';color:#cfe6ff;">
        <div><b style="color:#29e7ff;">Engine & Rendering</b><br>Three.js · WebGL · Custom post-processing</div>
        <div style="margin-top:14px;"><b style="color:#ff3df0;">Audio</b><br>Web Audio API — fully procedural SFX & adaptive music</div>
        <div style="margin-top:14px;"><b style="color:#ffb347;">Content</b><br>${WeaponRegistry.count()} weapons · ${EnemyRegistry.count()} enemies · ${BossRegistry.count()} bosses · ${ItemRegistry.count()} items · ${PerkRegistry.count()} perks · ${AbilityRegistry.count()} abilities · ${CharacterRegistry.count()} operatives</div>
        <div style="margin-top:14px;"><b style="color:#4fd07a;">Built with</b><br>an ECS architecture, procedural arenas, and a roguelite progression loop</div>
      </div>
      <div style="margin-top:24px;font:11px monospace;color:#45597a;letter-spacing:0.15em;">THANK YOU FOR PLAYING</div>
    </div></div>`;
  ui.root.appendChild(s); ui.screens.set('credits', s);
  s.querySelector('#CREDITSBack').onclick = () => { sfx(); ui.show('menu'); };
}

// ---- Minimap widget ----
class Minimap {
  constructor(game) {
    this.game = game;
    this.canvas = document.createElement('canvas');
    this.canvas.width = 160; this.canvas.height = 160;
    this.canvas.style.cssText = 'position:absolute;top:16px;right:200px;z-index:120;pointer-events:none;border-radius:8px;border:1px solid rgba(41,231,255,0.3);background:rgba(5,8,14,0.6);display:none;';
    this.ctx = this.canvas.getContext('2d');
  }
  show(v) { this.canvas.style.display = v ? 'block' : 'none'; }
  update() {
    const g = this.game; if (!g || !g.arena || !g.player || g.state !== 'playing') { this.show(false); return; }
    this.show(true);
    const ctx = this.ctx; const W = 160, H = 160;
    const r = g.arena.boundsRadius; const scale = (W / 2) / r;
    ctx.clearRect(0, 0, W, H);
    ctx.save(); ctx.translate(W / 2, H / 2);
    // arena circle
    ctx.strokeStyle = 'rgba(41,231,255,0.5)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(0, 0, W / 2 - 2, 0, Math.PI * 2); ctx.stroke();
    // enemies
    const enemies = g.aiSystem ? g.aiSystem.enemyQuery.array : [];
    for (const e of enemies) {
      const b = e.get('Body'); if (!b) continue;
      const x = (b.pos.x - g.arena.centerX) * scale, y = (b.pos.z - g.arena.centerZ) * scale;
      ctx.fillStyle = e.hasTag('Boss') ? '#ff3df0' : (e.get('WaveMember')?.isElite ? '#ffd24a' : '#ff5d7a');
      const s = e.hasTag('Boss') ? 5 : (e.get('WaveMember')?.isElite ? 3.5 : 2);
      ctx.fillRect(x - s / 2, y - s / 2, s, s);
    }
    // pickups
    const picks = g.world.withTag('Pickup');
    for (const p of picks) { const b = p.get('Body'); if (!b) continue; const x = (b.pos.x - g.arena.centerX) * scale, y = (b.pos.z - g.arena.centerZ) * scale; ctx.fillStyle = '#4fd07a'; ctx.fillRect(x - 1, y - 1, 2, 2); }
    // player
    const pb = g.player.get('Body'); if (pb) {
      const x = (pb.pos.x - g.arena.centerX) * scale, y = (pb.pos.z - g.arena.centerZ) * scale;
      const p = g.player.get('Player'); const yaw = p?.lookYaw || 0;
      ctx.fillStyle = '#29e7ff'; ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#29e7ff'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - Math.sin(yaw) * 7, y - Math.cos(yaw) * 7); ctx.stroke();
    }
    ctx.restore();
  }
}
