/**
 * VOIDBREAK — HUD.
 *
 * The in-game heads-up display: vitals (HP/shield), ammo + reload bar,
 * wave/score/combo readout, crosshair, hitmarker, damage numbers, killfeed,
 * minimap, boss bar, banners, intermission timer, hints and damage
 * vignettes. Driven by game events + per-frame state reads.
 */

import { h, el, ui } from './ui.js';
import { projectToScreen } from '../gfx/projection.js';
import { settings } from '../core/settings.js';

export class HUD {
  constructor(game) {
    this.game = game;
    this.root = h('div', 'vb-hud');
    ui.root.appendChild(this.root);
    this.elements = {};
    this.damageNumbers = [];
    this.hitmarkers = [];
    this._lastHp = -1;
    this._lastShield = -1;
    this._lastAmmo = -1;
    this._lastWeaponId = '';
    this._bannerTimer = null;
    this._flashTimer = null;
    this.minimapCtx = null;
    this._bindEvents();
    this._build();
  }

  _build() {
    const root = this.root;

    const top = h('div', 'vb-hud-top');
    const waveBox = h('div', 'vb-wave-box');
    waveBox.append(
      h('div', 'vb-wave-label', 'WAVE'),
      el('div', { class: 'vb-wave-number' }, (this.elements.waveNum = h('span', '', '1'))),
      el('div', { class: 'vb-wave-enemies' }, (this.elements.enemies = h('span', '', ''))),
    );
    const scoreBox = h('div', 'vb-score-box');
    scoreBox.append(
      el('div', { class: 'vb-score' }, (this.elements.score = h('span', '', '0'))),
      el('div', { class: 'vb-combo' }, (this.elements.combo = h('span', '', ''))),
      el('div', { class: 'vb-timer' }, (this.elements.timer = h('span', '', '0:00'))),
    );
    top.append(waveBox, scoreBox);
    root.append(top);

    const bossBar = h('div', 'vb-bossbar');
    bossBar.classList.add('vb-hidden');
    bossBar.append(
      el('div', { class: 'name' }, (this.elements.bossName = h('span', '', 'BOSS'))),
      el('div', { class: 'bar' }, el('div', { class: 'fill', style: { width: '100%' } }, (this.elements.bossFill = h('span', '', '')))),
    );
    this.elements.bossBar = bossBar;
    root.append(bossBar);

    const bottom = h('div', 'vb-hud-bottom');
    const left = h('div', 'vb-column');
    left.append(
      el('div', { class: 'vb-ammo' }, (this.elements.ammo = h('span', '', '30'))),
      el('div', { class: 'vb-weapon-name' }, (this.elements.weaponName = h('span', '', ''))),
      el('div', { class: 'vb-reload-bar' }, el('div', { class: 'fill', style: { width: '0%' } }, (this.elements.reloadFill = h('span', '', '')))),
    );
    const right = h('div', 'vb-column');
    const vitals = h('div', 'vb-vitals');
    vitals.append(
      vitalRow('❤', 'HP', 'vb-hp', this.elements, 'hpFill', 'hpNum'),
      vitalRow('🛡', 'SHLD', 'vb-shield', this.elements, 'shieldFill', 'shieldNum'),
    );
    right.append(vitals);
    bottom.append(left, right);
    root.append(bottom);

    if (settings.get('showMinimap')) {
      const mm = h('div', 'vb-minimap');
      const canvas = h('canvas');
      canvas.width = 150;
      canvas.height = 150;
      mm.append(canvas);
      root.append(mm);
      this.elements.minimap = canvas;
      this.minimapCtx = canvas.getContext('2d');
    }

    this.elements.crosshair = h('div', 'vb-crosshair');
    root.append(this.elements.crosshair);
    this.elements.dmgVignette = h('div', 'vb-damage-vignette');
    root.append(this.elements.dmgVignette);
    this.elements.lowHpVignette = h('div', 'vb-lowhp-vignette');
    root.append(this.elements.lowHpVignette);
    this.elements.killfeed = h('div', 'vb-killfeed');
    root.append(this.elements.killfeed);
    this.elements.banner = h('div', 'vb-banner');
    root.append(this.elements.banner);
    this.elements.intermission = h('div', 'vb-intermission');
    this.elements.intermission.append(h('div', 't', ''), h('div', 's', 'GET READY'));
    root.append(this.elements.intermission);
    this.elements.vignette = h('div', 'vb-vignette');
    root.append(this.elements.vignette);

    this._buildCrosshair(settings.get('crosshairStyle'), settings.get('crosshairColor'));
    settings.on('crosshairStyle', (v) => this._buildCrosshair(v, settings.get('crosshairColor')));
    settings.on('crosshairColor', (v) => this._buildCrosshair(settings.get('crosshairStyle'), v));
    settings.on('showMinimap', (v) => {
      this.elements.minimap?.parentElement?.classList.toggle('vb-hidden', !v);
    });
  }

  _buildCrosshair(style, color) {
    const c = this.elements.crosshair;
    c.replaceChildren();
    if (style === 'none') return;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '30');
    svg.setAttribute('height', '30');
    svg.setAttribute('viewBox', '0 0 30 30');
    const mk = (x1, y1, x2, y2, w = 2) => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', String(x1));
      line.setAttribute('y1', String(y1));
      line.setAttribute('x2', String(x2));
      line.setAttribute('y2', String(y2));
      line.setAttribute('stroke', color);
      line.setAttribute('stroke-width', String(w));
      line.setAttribute('stroke-linecap', 'round');
      svg.appendChild(line);
    };
    if (style === 'dot') {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', '15');
      circle.setAttribute('cy', '15');
      circle.setAttribute('r', '1.6');
      circle.setAttribute('fill', color);
      svg.appendChild(circle);
    } else {
      mk(15, 5, 15, 10);
      mk(15, 20, 15, 25);
      mk(5, 15, 10, 15);
      mk(20, 15, 25, 15);
    }
    if (style === 'dynamic') {
      mk(15, 11, 15, 12, 1);
      mk(15, 18, 15, 19, 1);
      mk(11, 15, 12, 15, 1);
      mk(18, 15, 19, 15, 1);
    }
    c.append(svg);
  }

  // ------------------------------------------------------------ events

  _bindEvents() {
    const bus = this.game.bus;

    bus.on('wave.start', (e) => {
      this.elements.waveNum.textContent = String(e.wave);
      this._banner(e.label, e.boss ? 'BOSS INCOMING' : 'HOSTILES DETECTED', e.boss ? '#ff3b3b' : '');
    });
    bus.on('wave.cleared', (e) => {
      this._banner('WAVE CLEARED', `+${e.score} SCORE`, '#4dffa6');
    });
    bus.on('boss.phase', (e) => {
      this._toast(`⚠ ${e.name} — PHASE ${e.phase} ⚠`, '#ff3b3b');
    });
    bus.on('player.death', () => {
      this._banner('YOU DIED', 'THE BREACH CONSUMES', '#ff3b3b');
    });
    bus.on('player.damaged', (e) => {
      this._flashDamage(e.amount);
    });
    bus.on('player.pickup', (e) => {
      const colors = { health: '#4dffa6', shield: '#6aa8ff', ammo: '#ffd166', energy: '#c07dff', core: '#ffe14d' };
      const labels = { health: '+HP', shield: '+SHLD', ammo: '+AMMO', energy: '+E', core: '+CORE' };
      if (e.amount > 0) {
        this._toast(`${labels[e.type] ?? e.type}`, colors[e.type] ?? '#fff');
      }
    });
    bus.on('weapon.unlock', (e) => {
      this._toast2(`🔓 ${e.name} UNLOCKED`);
    });
    bus.on('upgrade.applied', (e) => {
      this._toast2(`${e.name} EQUIPPED`);
    });
    bus.on('achievement.unlock', (e) => {
      this._toast2(`🏆 ACHIEVEMENT: ${e.name}`);
    });
  }

  // ------------------------------------------------------------ per-frame

  update(dt) {
    const game = this.game;
    const player = game.player;
    if (!player) return;

    const hpRatio = player.health / player.maxHealth;
    if (player.health !== this._lastHp) {
      this.elements.hpFill.style.width = `${hpRatio * 100}%`;
      this.elements.hpNum.textContent = `${Math.ceil(player.health)}`;
      this.elements.hpNum.parentElement.classList.toggle('low', hpRatio < 0.3);
      this._lastHp = player.health;
    }
    if (player.shield !== this._lastShield) {
      this.elements.shieldFill.style.width = `${(player.shield / player.maxShield) * 100}%`;
      this.elements.shieldNum.textContent = `${Math.ceil(player.shield)}`;
      this._lastShield = player.shield;
    }

    const w = player.currentWeapon;
    if (w) {
      const mag = w.infinite ? '∞' : String(w.ammoInMag);
      if (w.ammoInMag !== this._lastAmmo || w.id !== this._lastWeaponId) {
        this.elements.ammo.textContent = mag;
        this.elements.ammo.parentElement.classList.toggle('reloading', w.reloading);
        this.elements.weaponName.textContent = w.name.toUpperCase();
        this._lastAmmo = w.ammoInMag;
        this._lastWeaponId = w.id;
      }
      if (w.reloading) {
        this.elements.reloadFill.style.width = `${w.reloadProgress * 100}%`;
        this.elements.reloadFill.parentElement.classList.remove('vb-hidden');
      } else {
        this.elements.reloadFill.parentElement.classList.add('vb-hidden');
      }
    }

    const director = game.director;
    if (director) {
      const alive = director.enemiesAlive;
      const remaining = director.remainingSpawns;
      if (director.state === 'spawning' && alive + remaining > 0) {
        this.elements.enemies.textContent = `☠ ${alive} ON FIELD · ${remaining} INCOMING`;
      } else if (director.state === 'intermission') {
        this.elements.enemies.textContent = 'INTERMISSION';
      } else if (director.state === 'upgrading') {
        this.elements.enemies.textContent = 'CHOOSE AN UPGRADE';
      } else {
        this.elements.enemies.textContent = '';
      }
      if (director.state === 'intermission' && !this.elements.intermission.classList.contains('vb-hidden')) {
        this.elements.intermission.children[0].textContent = `WAVE ${director.currentWave + 1} IN ${Math.ceil(director.intermissionLeft)}`;
      }
    }

    const score = game.score;
    this.elements.score.textContent = score.total.toLocaleString();
    if (score.combo >= 3) {
      this.elements.combo.textContent = `${score.combo} COMBO ×${score.comboMultiplier().toFixed(1)}`;
    } else {
      this.elements.combo.textContent = '';
    }
    this.elements.timer.textContent = formatClock(game.runTime);

    const boss = game.currentBoss;
    if (boss && !boss.dead) {
      this.elements.bossBar.classList.remove('vb-hidden');
      this.elements.bossName.textContent = boss.name.toUpperCase();
      this.elements.bossFill.style.width = `${(boss.health / boss.maxHealth) * 100}%`;
    } else {
      this.elements.bossBar.classList.add('vb-hidden');
    }

    for (let i = this.hitmarkers.length - 1; i >= 0; i--) {
      this.hitmarkers[i].life -= dt;
      if (this.hitmarkers[i].life <= 0) {
        this.hitmarkers[i].el.remove();
        this.hitmarkers.splice(i, 1);
      }
    }

    if (this.minimapCtx && settings.get('showMinimap')) {
      this._drawMinimap();
    }

    const lowHp = hpRatio < 0.3 && player.health > 0;
    this.elements.lowHpVignette.style.opacity = lowHp ? String((0.5 + 0.5 * Math.sin(performance.now() / 300)) * (1 - hpRatio * 2.5)) : '0';
  }

  // ------------------------------------------------------------ fx

  addDamageNumber(amount, worldPos, opts = {}) {
    if (!settings.get('damageNumbers')) return;
    const canvas = this.game.renderer.canvas;
    const proj = projectToScreen(this.game.renderer.camera, worldPos, canvas.width, canvas.height);
    if (!proj.visible) return;
    const el = h('div', 'vb-damage-num', `${Math.round(amount)}`);
    el.style.left = `${proj.x}px`;
    el.style.top = `${proj.y}px`;
    el.style.fontSize = `${opts.crit ? 26 : opts.headshot ? 22 : 16}px`;
    el.style.color = opts.color ?? (opts.crit ? '#ffd166' : opts.headshot ? '#ff9d5a' : '#ffffff');
    this.root.appendChild(el);
    setTimeout(() => el.remove(), 950);
  }

  addHitmarker(crit = false) {
    if (!settings.get('hitmarker')) return;
    const mk = h('div', `vb-hitmarker ${crit ? 'crit' : ''}`);
    for (let i = 0; i < 4; i++) {
      const seg = h('div', 'seg');
      seg.style.transform = `rotate(${i * 90}deg) translateY(-8px)`;
      mk.append(seg);
    }
    this.root.append(mk);
    this.hitmarkers.push({ el: mk, life: 0.15 });
  }

  addKillfeed(text, opts = {}) {
    if (!settings.get('showKillfeed')) return;
    const item = h('div', `item ${opts.crit ? 'crit' : ''}`, text);
    this.elements.killfeed.append(item);
    while (this.elements.killfeed.children.length > 6) {
      this.elements.killfeed.children[0].remove();
    }
    setTimeout(() => item.remove(), 5200);
  }

  showHint(text, duration = 5000) {
    if (this.elements.hint) this.elements.hint.remove();
    const hint = h('div', 'vb-hint', text);
    this.elements.hint = hint;
    this.root.append(hint);
    setTimeout(() => hint.remove(), duration);
  }

  _banner(big, sub, color = '') {
    const banner = this.elements.banner;
    banner.replaceChildren(
      el('div', { class: 'big', style: color ? { color } : {} }, big),
      h('div', 'sub', sub ?? ''),
    );
    clearTimeout(this._bannerTimer);
    this._bannerTimer = setTimeout(() => banner.replaceChildren(), 2600);
  }

  _toast(text, color = '') {
    ui.toast(text, 1400, { color });
  }

  _toast2(text) {
    ui.toast2(text, 2600);
  }

  _flashDamage(amount) {
    const v = this.elements.dmgVignette;
    v.style.opacity = String(Math.min(1, 0.25 + amount / 80));
    clearTimeout(this._flashTimer);
    this._flashTimer = setTimeout(() => { v.style.opacity = '0'; }, 220);
  }

  // ------------------------------------------------------------ minimap

  _drawMinimap() {
    const ctx = this.minimapCtx;
    const game = this.game;
    const size = 150;
    const arena = game.arena;
    if (!arena || !ctx) return;
    const half = arena.size;
    const toPx = (worldX, worldZ) => [
      (worldX + half) / (half * 2) * size,
      (worldZ + half) / (half * 2) * size,
    ];

    ctx.clearRect(0, 0, size, size);
    ctx.strokeStyle = 'rgba(143,166,191,0.5)';
    ctx.lineWidth = 1;
    for (const r of arena.minimapRects()) {
      const [x, y] = toPx(r.x - r.w / 2, r.z - r.d / 2);
      ctx.strokeRect(x, y, (r.w / (half * 2)) * size, (r.d / (half * 2)) * size);
    }

    ctx.fillStyle = '#ff5d5d';
    for (const e of game.world.enemies) {
      if (!e.alive) continue;
      const [x, y] = toPx(e.position.x, e.position.z);
      ctx.beginPath();
      ctx.arc(x, y, e.def?.boss ? 4 : 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#ffd166';
    for (const p of game.world.pickups) {
      if (!p.alive) continue;
      const [x, y] = toPx(p.position.x, p.position.z);
      ctx.fillRect(x - 1, y - 1, 2, 2);
    }

    const player = game.player;
    if (player) {
      const [x, y] = toPx(player.position.x, player.position.z);
      ctx.fillStyle = '#35f0ff';
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(53,240,255,0.6)';
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + player.facing.x * 8, y + player.facing.z * 8);
      ctx.stroke();
    }
  }

  destroy() {
    this.root.remove();
  }
}

function vitalRow(icon, label, cls, store, fillKey, numKey) {
  const row = h('div', `vb-vital-row ${cls}`);
  const fill = h('div', 'fill');
  fill.style.width = '100%';
  row.append(
    h('span', 'icon', icon),
    el('div', { class: 'bar' }, fill),
    h('span', 'num', '100'),
  );
  store[fillKey] = fill;
  store[numKey] = row.querySelector('.num');
  void label;
  return row;
}

function formatClock(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
