// ============================================================================
// abilities6.js — More active abilities: elemental ultimates, mobility, and
// tactical tools rounding out the ability roster.
// ============================================================================

import * as THREE from 'three';
import { AbilityRegistry } from '../AbilityRegistry.js';
import { applyDamage, heal } from '../../combat/Damage.js';
import { StatusEffects, StatusType, DamageType } from '../../ecs/components/Combat.js';
import { Health, Shield } from '../../ecs/components/Vitals.js';
import { Body } from '../../ecs/components/Body.js';
import { bus, Channels } from '../../core/EventBus.js';

const _v = new THREE.Vector3();
const A = (def) => AbilityRegistry.register(def);

A({ id: 'fireRain', name: 'Fire Rain', cooldown: 20, key: 'KeyX', rarity: 'legendary', tags: ['offense', 'aoe', 'status'],
  description: 'Rain fire across the arena for 4s.', icon: { shape: 'flame', color: 0xff5522 },
  activate: (ctx) => {
    let n = 0;
    const interval = setInterval(() => {
      const a = Math.random() * Math.PI * 2; const r = 4 + Math.random() * 18;
      const pos = new THREE.Vector3(ctx.arena.centerX + Math.cos(a) * r, 8, ctx.arena.centerZ + Math.sin(a) * r);
      if (ctx.effects) ctx.effects.explosion(pos.clone().setY(0.5), 4, 0xff5522, false);
      const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
      for (const e of enemies) { const eb = e.get(Body); if (!eb) continue; if (pos.distanceTo(eb.pos) < 4.5) applyDamage(e, { amount: 60, type: DamageType.Fire, crit: false, headshot: false, knockback: 6, statusChance: 0.6, statusType: StatusType.Burn, statusPower: 2, statusDuration: 3, lifesteal: 0, attacker: ctx.player, world: ctx.world, effects: ctx.effects, hitPoint: pos.clone(), source: 'player' }); }
      bus.emit(Channels.PlaySFX, { name: 'explosion', volume: 0.4 });
      n++; if (n >= 12) clearInterval(interval);
    }, 150);
    bus.emit(Channels.Toast, { text: 'FIRE RAIN', color: '#ff5522' });
    return true;
  } });
A({ id: 'frostNova2', name: 'Glacial Nova', cooldown: 14, key: 'KeyF', rarity: 'epic', tags: ['control', 'status', 'aoe'],
  description: 'A spreading frost nova that freezes and damages in a wide ring.', icon: { shape: 'snow', color: 0x9fe7ff },
  activate: (ctx) => {
    const body = ctx.player.get(Body); if (!body) return false;
    const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
    for (const e of enemies) { const eb = e.get(Body); if (!eb) continue; const d = body.pos.distanceTo(eb.pos); if (d > 14) continue;
      let st = e.get(StatusEffects.type); if (!st) { st = new StatusEffects(); e.add(st); } st.add(StatusType.Freeze, 3, 4);
      applyDamage(e, { amount: 50 * (1 - d / 14 * 0.5), type: DamageType.Cryo, crit: false, headshot: false, knockback: 4, statusChance: 0, lifesteal: 0, attacker: ctx.player, world: ctx.world, effects: ctx.effects, hitPoint: eb.pos.clone(), source: 'player' }); }
    if (ctx.effects) { ctx.effects.explosion(body.pos.clone().setY(0.5), 14, 0x9fe7ff, true); ctx.effects.addShake(0.5); }
    bus.emit(Channels.PlaySFX, { name: 'ability', volume: 0.7 });
    return true;
  } });
A({ id: 'chainLightning2', name: 'Chain Lightning', cooldown: 10, key: 'KeyF', rarity: 'epic', tags: ['offense', 'status'],
  description: 'Lightning that chains between up to 6 enemies.', icon: { shape: 'bolt', color: 0xffe066 },
  activate: (ctx) => {
    const body = ctx.player.get(Body); if (!body) return false;
    const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
    let prev = body.pos.clone().setY(1); let hits = 0; const hitSet = new Set();
    while (hits < 6) {
      let best = null, bd = 12;
      for (const e of enemies) { if (hitSet.has(e.id) || !e.alive) continue; const eb = e.get(Body); if (!eb) continue; const d = prev.distanceTo(eb.pos); if (d < bd) { bd = d; best = e; } }
      if (!best) break;
      const eb = best.get(Body);
      if (ctx.effects) ctx.effects.beam(prev.clone(), eb.pos.clone().setY(1), 0xffe066, 0.1, 0.15);
      applyDamage(best, { amount: 80 * Math.pow(0.85, hits), type: DamageType.Shock, crit: false, headshot: false, knockback: 4, statusChance: 0.6, statusType: StatusType.Shock, statusPower: 2, statusDuration: 2, lifesteal: 0, attacker: ctx.player, world: ctx.world, effects: ctx.effects, hitPoint: eb.pos.clone(), source: 'player' });
      hitSet.add(best.id); prev = eb.pos.clone().setY(1); hits++;
    }
    bus.emit(Channels.PlaySFX, { name: 'shoot_lightning', volume: 0.7 });
    return true;
  } });
A({ id: 'twinStrike', name: 'Twin Strike', cooldown: 8, key: 'KeyQ', rarity: 'rare', tags: ['offense', 'mobility'],
  description: 'Dash forward and fire a 360° burst at the destination.', icon: { shape: 'arrow', color: 0x29e7ff },
  activate: (ctx) => {
    const body = ctx.player.get(Body); if (!body) return false;
    const p = ctx.player.get('Player');
    const dir = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(p.lookPitch, p.lookYaw, 0, 'YXZ')); dir.y = 0; dir.normalize();
    body.pos.addScaledVector(dir, 8);
    if (ctx.effects) { ctx.effects.death(body.pos.clone().setY(1), 0x29e7ff, 1.5); }
    const from = body.pos.clone().setY(1.4);
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      const d = new THREE.Vector3(Math.cos(a), 0, Math.sin(a)).normalize();
      ctx.projectileFactory.spawn({ position: from.clone(), direction: d, team: 'player', ownerId: ctx.player.id, damage: 40, damageType: DamageType.Kinetic, knockback: 6, color: 0x29e7ff,
        projectile: { speed: 40, gravity: 0, lifetime: 1.5, color: 0x29e7ff, radius: 0.16, shape: 'shard', scale: 1, pierce: 2, glow: true, trail: true } });
    }
    bus.emit(Channels.PlaySFX, { name: 'dash', volume: 0.6 });
    return true;
  } });
A({ id: 'steelCyclone', name: 'Steel Cyclone', cooldown: 12, key: 'KeyF', rarity: 'epic', tags: ['offense', 'melee', 'aoe'],
  description: 'Spin with a blade, hitting all nearby enemies 3 times.', icon: { shape: 'blade', color: 0xffe066 },
  activate: (ctx) => {
    const body = ctx.player.get(Body); if (!body) return false;
    const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
    let ticks = 0;
    const interval = setInterval(() => {
      for (const e of enemies) { const eb = e.get(Body); if (!eb) continue; if (body.pos.distanceTo(eb.pos) > 4) continue;
        applyDamage(e, { amount: 50, type: DamageType.Kinetic, crit: false, headshot: false, knockback: 10, statusChance: 0.3, statusType: StatusType.Bleed, statusPower: 1, statusDuration: 2, lifesteal: 0.1, attacker: ctx.player, world: ctx.world, effects: ctx.effects, hitPoint: eb.pos.clone(), source: 'player' }); }
      if (ctx.effects) ctx.effects.trailParticle(body.pos.clone().setY(1), 0xffe066, 5, 0.3);
      ticks++; if (ticks >= 3) clearInterval(interval);
    }, 200);
    bus.emit(Channels.PlaySFX, { name: 'shoot_lightning', volume: 0.5 });
    return true;
  } });
A({ id: 'voidStep', name: 'Void Step', cooldown: 7, key: 'KeyQ', rarity: 'epic', tags: ['mobility', 'defense'],
  description: 'Phase through reality: teleport and become briefly intangible.', icon: { shape: 'ghost', color: 0x8a5bff },
  activate: (ctx) => {
    const body = ctx.player.get(Body); if (!body) return false;
    const p = ctx.player.get('Player');
    const dir = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(p.lookPitch, p.lookYaw, 0, 'YXZ')); dir.y = 0; dir.normalize();
    const dest = body.pos.clone().addScaledVector(dir, 12);
    const a = ctx.arena; if (a) { const dx = dest.x - a.centerX, dz = dest.z - a.centerZ; const d = Math.hypot(dx, dz); const m = a.boundsRadius - 1; if (d > m) { dest.x = a.centerX + dx / d * m; dest.z = a.centerZ + dz / d * m; } }
    if (ctx.effects) { ctx.effects.death(body.pos.clone().setY(1), 0x8a5bff, 1.5); ctx.effects.death(dest.clone().setY(1), 0x8a5bff, 1.5); }
    body.pos.copy(dest);
    const h = ctx.player.get(Health); if (h) h.invulnTime = Math.max(h.invulnTime, 1);
    bus.emit(Channels.PlaySFX, { name: 'void_hum', volume: 0.5, dur: 0.4 });
    return true;
  } });
A({ id: 'rally2', name: 'Rally', cooldown: 22, key: 'KeyV', rarity: 'epic', tags: ['sustain', 'offense', 'special'],
  description: 'Heal 60 HP, cleanse, and gain +40% damage for 8s.', icon: { shape: 'flag', color: 0x4fd07a },
  activate: (ctx) => {
    heal(ctx.player, 60);
    const st = ctx.player.get(StatusEffects.type); if (st) st.effects.clear();
    ctx.player.meta = ctx.player.meta || {}; ctx.player.meta.rally2 = 8;
    if (ctx.effects) ctx.effects.flash(ctx.player.get(Body).pos.clone().setY(1), 0x4fd07a, 2.5);
    bus.emit(Channels.PlaySFX, { name: 'levelup', volume: 0.6 });
    bus.emit(Channels.Toast, { text: 'RALLY!', color: '#4fd07a' });
    return true;
  } });
A({ id: 'aegis2', name: 'Aegis', cooldown: 14, key: 'KeyV', rarity: 'epic', tags: ['defense'],
  description: 'Invulnerable and +80 shield for 4s.', icon: { shape: 'shield', color: 0x29e7ff },
  activate: (ctx) => {
    const h = ctx.player.get(Health); if (!h) return false;
    h.invulnTime = Math.max(h.invulnTime, 4);
    let sh = ctx.player.get(Shield); if (!sh) { sh = new Shield(); ctx.player.add(sh); }
    sh.max = Math.max(sh.max, 80); sh.current = sh.max;
    if (ctx.effects) ctx.effects.flash(ctx.player.get(Body).pos.clone().setY(1), 0x29e7ff, 2.5);
    bus.emit(Channels.PlaySFX, { name: 'ability', volume: 0.6 });
    return true;
  } });
A({ id: 'overdrive2', name: 'Overdrive', cooldown: 24, key: 'KeyX', rarity: 'legendary', tags: ['offense', 'special'],
  description: '+100% damage and +50% fire rate for 6s.', icon: { shape: 'flame', color: 0xff5544 },
  activate: (ctx) => {
    ctx.player.meta = ctx.player.meta || {}; ctx.player.meta.overdrive = 6;
    if (ctx.effects) ctx.effects.screenFlash([255, 80, 60], 0.5);
    bus.emit(Channels.PlaySFX, { name: 'boss_roar', volume: 0.4 });
    bus.emit(Channels.Toast, { text: 'OVERDRIVE!', color: '#ff5544' });
    return true;
  } });
A({ id: 'bulletTime2', name: 'Bullet Time', cooldown: 28, key: 'KeyX', rarity: 'legendary', tags: ['control', 'special'],
  description: 'Slow time to a crawl for 5s (you are unaffected).', icon: { shape: 'clock', color: 0xff3df0 },
  activate: (ctx) => {
    if (ctx.engine?.clock) ctx.engine.clock.slowmo(0.2, 5, true);
    if (ctx.effects) ctx.effects.screenFlash([180, 60, 255], 0.5);
    bus.emit(Channels.PlaySFX, { name: 'void_hum', volume: 0.5, dur: 1.5 });
    return true;
  } });
