// ============================================================================
// Tooltips.js
// A rich tooltip system for the codex, shop, and HUD: hover-triggered panels
// that show weapon/enemy/item/perk/ability stats, descriptions, rarity, and
// tags. Built as a single reusable DOM element positioned near the cursor.
// Keeps detailed information on-demand without cluttering the main UI.
// ============================================================================

import { WeaponRegistry } from '../weapons/WeaponRegistry.js';
import { EnemyRegistry } from '../enemies/EnemyRegistry.js';
import { ItemRegistry } from '../items/ItemRegistry.js';
import { PerkRegistry } from '../perks/PerkRegistry.js';
import { AbilityRegistry } from '../abilities/AbilityRegistry.js';
import { BossRegistry } from '../bosses/BossRegistry.js';
import { CharacterRegistry } from '../player/Characters.js';
import { hexToCSS } from '../core/MathUtils.js';

const RARITY_COLOR = { common: '#9fb3d6', uncommon: '#4fd07a', rare: '#4aa3ff', epic: '#b266ff', legendary: '#ffb347', mythic: '#ff3df0', curse: '#ff3df0' };

export class TooltipManager {
  constructor() {
    this.el = document.createElement('div');
    this.el.id = 'nexusTooltip';
    this.el.style.cssText = 'position:fixed;z-index:700;pointer-events:none;opacity:0;transition:opacity .12s ease;' +
      'max-width:320px;padding:12px 14px;border-radius:8px;background:rgba(8,12,22,0.95);' +
      'border:1px solid rgba(41,231,255,0.35);box-shadow:0 4px 24px rgba(0,0,0,0.6);' +
      'font:12px/1.5 "Segoe UI",Arial;color:#cfe6ff;backdrop-filter:blur(4px);';
    document.body.appendChild(this.el);
    this._visible = false;
    this._hideTimer = 0;
  }

  show(content, x, y) {
    this.el.innerHTML = content;
    this.el.style.opacity = '1';
    this._visible = true;
    this._position(x, y);
  }

  hide() { this.el.style.opacity = '0'; this._visible = false; }

  _position(x, y) {
    const w = this.el.offsetWidth, h = this.el.offsetHeight;
    const px = Math.min(x + 16, window.innerWidth - w - 8);
    const py = Math.min(y + 16, window.innerHeight - h - 8);
    this.el.style.left = px + 'px';
    this.el.style.top = py + 'px';
  }

  attach(element, contentBuilder) {
    element.addEventListener('mousemove', (e) => { this.show(contentBuilder(), e.clientX, e.clientY); });
    element.addEventListener('mouseleave', () => { this.hide(); });
  }

  // ---- Content builders ----
  weapon(id) {
    const w = WeaponRegistry.get(id); if (!w) return '';
    const c = RARITY_COLOR[w.rarity] || '#fff';
    const stats = [
      `Damage ${w.damage}`, `Fire Rate ${w.fireRate}/s`, `Mag ${w.magazine}`,
      w.range ? `Range ${w.range}` : '', w.pellets > 1 ? `Pellets ${w.pellets}` : '',
      w.critChance ? `Crit ${(w.critChance * 100).toFixed(0)}% ×${w.critMult}` : '',
      w.canHeadshot ? `Headshot ×${w.headshotMult}` : '', w.knockback ? `Knockback ${w.knockback}` : '',
      w.statusChance ? `${w.statusType} ${(w.statusChance * 100).toFixed(0)}%` : '',
      w.lifesteal ? `Lifesteal ${(w.lifesteal * 100).toFixed(0)}%` : '',
    ].filter(Boolean).join(' · ');
    return `<div style="font:800 15px 'Segoe UI';color:${c};">${w.name}</div>
      <div style="font:10px monospace;color:#6f86a8;letter-spacing:0.1em;text-transform:uppercase;margin-top:2px;">${w.rarity} · ${w.category}</div>
      <div style="font:11px monospace;color:#9fb3d6;margin-top:8px;">${stats}</div>
      <div style="font:12px/1.45 'Segoe UI';color:#cfe6ff;margin-top:8px;">${w.description}</div>
      ${w.flavor ? `<div style="font:italic 11px 'Segoe UI';color:#6f86a8;margin-top:8px;">"${w.flavor}"</div>` : ''}`;
  }

  enemy(id) {
    const e = EnemyRegistry.get(id); if (!e) return '';
    const c = '#' + (e.color || 0xffffff).toString(16).padStart(6, '0');
    const stats = [`HP ${e.health}`, `Speed ${e.speed}`, `Contact ${e.contactDamage}`, e.armor ? `Armor ${e.armor}` : '', e.shield ? `Shield ${e.shield}` : '', e.regen ? `Regen ${e.regen}/s` : '', `Tier ${e.tier || 0}`].filter(Boolean).join(' · ');
    return `<div style="font:800 15px 'Segoe UI';color:${c};">${e.name}</div>
      <div style="font:10px monospace;color:#6f86a8;letter-spacing:0.1em;text-transform:uppercase;margin-top:2px;">${e.behavior} · tier ${e.tier || 0}</div>
      <div style="font:11px monospace;color:#9fb3d6;margin-top:8px;">${stats}</div>
      <div style="font:12px/1.45 'Segoe UI';color:#cfe6ff;margin-top:8px;">${e.description}</div>`;
  }

  item(id) {
    const it = ItemRegistry.get(id); if (!it) return '';
    const c = RARITY_COLOR[it.rarity] || '#fff';
    return `<div style="font:800 15px 'Segoe UI';color:${c};">${it.name}</div>
      <div style="font:10px monospace;color:#6f86a8;letter-spacing:0.1em;text-transform:uppercase;margin-top:2px;">${it.rarity}${it.maxStacks > 1 ? ` · stacks ×${it.maxStacks}` : ''}</div>
      <div style="font:12px/1.45 'Segoe UI';color:#cfe6ff;margin-top:8px;">${it.description}</div>
      <div style="font:11px monospace;color:#ffd28a;margin-top:8px;">◈ ${it.price}</div>`;
  }

  perk(id) {
    const p = PerkRegistry.get(id); if (!p) return '';
    const c = RARITY_COLOR[p.rarity] || '#fff';
    return `<div style="font:800 15px 'Segoe UI';color:${c};">${p.name}</div>
      <div style="font:10px monospace;color:#6f86a8;letter-spacing:0.1em;text-transform:uppercase;margin-top:2px;">${p.rarity} · perk</div>
      <div style="font:12px/1.45 'Segoe UI';color:#cfe6ff;margin-top:8px;">${p.description}</div>`;
  }

  ability(id) {
    const a = AbilityRegistry.get(id); if (!a) return '';
    const c = RARITY_COLOR[a.rarity] || '#fff';
    return `<div style="font:800 15px 'Segoe UI';color:${c};">${a.name}</div>
      <div style="font:10px monospace;color:#6f86a8;letter-spacing:0.1em;text-transform:uppercase;margin-top:2px;">${a.rarity} · ability · ${a.key}</div>
      <div style="font:12px/1.45 'Segoe UI';color:#cfe6ff;margin-top:8px;">${a.description}</div>
      <div style="font:11px monospace;color:#9fb3d6;margin-top:8px;">Cooldown ${a.cooldown}s</div>`;
  }

  boss(id) {
    const b = BossRegistry.get(id); if (!b) return '';
    return `<div style="font:800 15px 'Segoe UI';color:#ff3df0;">${b.title}</div>
      <div style="font:10px monospace;color:#6f86a8;letter-spacing:0.1em;text-transform:uppercase;margin-top:2px;">${b.subtitle} · ${b.phases.length} phases</div>
      <div style="font:11px monospace;color:#9fb3d6;margin-top:8px;">HP ${b.health}${b.shield ? ` · Shield ${b.shield}` : ''} · Armor ${b.armor || 0}</div>
      <div style="font:12px/1.45 'Segoe UI';color:#cfe6ff;margin-top:8px;">${b.introText}</div>`;
  }

  character(id) {
    const c = CharacterRegistry.get(id); if (!c) return '';
    return `<div style="font:800 15px 'Segoe UI';color:${hexToCSS(c.color)};">${c.name}</div>
      <div style="font:10px monospace;color:#6f86a8;letter-spacing:0.1em;text-transform:uppercase;margin-top:2px;">operative · unlock wave ${c.unlock}</div>
      <div style="font:11px monospace;color:#9fb3d6;margin-top:8px;">HP ${c.startMaxHP} · Speed ${c.startSpeed}${c.startShield ? ` · Shield ${c.startShield}` : ''}</div>
      <div style="font:12px/1.45 'Segoe UI';color:#cfe6ff;margin-top:8px;">${c.description}</div>
      <div style="font:11px 'Segoe UI';color:#ffd24a;margin-top:6px;">${c.passive?.name}: ${c.passive?.description}</div>`;
  }

  dispose() { this.el.remove(); }
}
