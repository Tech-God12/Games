// ============================================================================
// abilities7.js — More active abilities: defensive, utility, and ultimate.
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

A({ id: 'ironSkin', name: 'Iron Skin', cooldown: 18, key: 'KeyV', rarity: 'epic', tags: ['defense'],
  description: 'Reduce damage taken by 80% and reflect 100 thorns for 5s.', icon: { shape: 'shield', color: 0x9fb3d6 },
  activate: (ctx) => {
    ctx.player.meta = ctx.player.meta || {}; ctx.player.meta.ironSkin = 5;
    if (ctx.effects) ctx.effects.flash(ctx.player.get(Body).pos.clone().setY(1), 0x9fb3d6, 2.5);
    bus.emit(Channels.PlaySFX, { name: 'ability', volume: 0.6 });
    return true;
  } });
A({ id: 'bloodFury', name: 'Blood Fury', cooldown: 20, key: 'KeyX', rarity: 'legendary', tags: ['offense', 'sustain', 'special'],
  description: '+120% damage and +50% lifesteal for 5s. Costs 15% HP.', icon: { shape: 'drop', color: 0xff3df0 },
  activate: (ctx) => {
    const h = ctx.player.get(Health); if (!h || h.current < 10) return false;
    h.current = Math.max(1, h.current - h.max * 0.15);
    ctx.player.meta = ctx.player.meta || {}; ctx.player.meta.bloodFury = 5;
    if (ctx.effects) ctx.effects.screenFlash([255, 60, 180], 0.6);
    bus.emit(Channels.PlaySFX, { name: 'boss_roar', volume: 0.4 });
    bus.emit(Channels.Toast, { text: 'BLOOD FURY!', color: '#ff3df0' });
    return true;
  } });
A({ id: 'overload3', name: 'Overload', cooldown: 26, key: 'KeyX', rarity: 'legendary', tags: ['offense', 'special'],
  description: '+150% damage and infinite ammo for 5s.', icon: { shape: 'chip', color: 0xff5544 },
  activate: (ctx) => {
    ctx.player.meta = ctx.player.meta || {}; ctx.player.meta.overload3 = 5;
    if (ctx.effects) ctx.effects.screenFlash([255, 100, 60], 0.6);
    bus.emit(Channels.PlaySFX, { name: 'boss_roar', volume: 0.5 });
    bus.emit(Channels.Toast, { text: 'OVERLOAD!', color: '#ff5544' });
    return true;
  } });
A({ id: 'gravitySlam2', name: 'Gravity Slam', cooldown: 16, key: 'KeyF', rarity: 'epic', tags: ['control', 'aoe'],
  description: 'Pull all enemies within 16m toward you, then knockback + damage.', icon: { shape: 'orb', color: 0x8a5bff },
  activate: (ctx) => {
    const body = ctx.player.get(Body); if (!body) return false;
    const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
    for (const e of enemies) { const eb = e.get(Body); if (!eb) continue; const d = body.pos.distanceTo(eb.pos); if (d > 16 || d < 0.1) continue;
      const pull = _v.subVectors(body.pos, eb.pos).setY(0).normalize(); eb.vel.addScaledVector(pull, 36);
      applyDamage(e, { amount: 50, type: DamageType.Kinetic, crit: false, headshot: false, knockback: 0, statusChance: 0.6, statusType: StatusType.Slow, statusPower: 2, statusDuration: 2, lifesteal: 0, attacker: ctx.player, world: ctx.world, effects: ctx.effects, hitPoint: eb.pos.clone(), source: 'player' }); }
    // knockback burst after a beat
    setTimeout(() => { for (const e of enemies) { const eb = e.get(Body); if (!eb || !e.alive) continue; if (body.pos.distanceTo(eb.pos) < 6) { const kb = _v.subVectors(eb.pos, body.pos).setY(0).normalize(); eb.vel.addScaledVector(kb, 20); eb.vel.y += 8; } } }, 400);
    if (ctx.effects) { ctx.effects.flash(body.pos.clone().setY(0.5), 0x8a5bff, 3); ctx.effects.addShake(0.5); }
    bus.emit(Channels.PlaySFX, { name: 'shoot_plasma', volume: 0.7 });
    return true;
  } });
A({ id: 'echoStep', name: 'Echo Step', cooldown: 9, key: 'KeyQ', rarity: 'epic', tags: ['mobility', 'offense'],
  description: 'Dash forward, leaving an echo that detonates after 0.5s.', icon: { shape: 'ghost', color: 0x29e7ff },
  activate: (ctx) => {
    const body = ctx.player.get(Body); if (!body) return false;
    const p = ctx.player.get('Player');
    const dir = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(p.lookPitch, p.lookYaw, 0, 'YXZ')); dir.y = 0; dir.normalize();
    const start = body.pos.clone();
    body.pos.addScaledVector(dir, 9);
    if (ctx.effects) { ctx.effects.death(start.clone().setY(1), 0x29e7ff, 2); ctx.effects.death(body.pos.clone().setY(1), 0x29e7ff, 1.5); }
    setTimeout(() => { if (ctx.effects) ctx.effects.explosion(start.clone().setY(0.5), 5, 0x29e7ff, false); const es = ctx.enemyQuery ? ctx.enemyQuery.array : []; for (const e of es) { const eb = e.get(Body); if (!eb || !e.alive) continue; if (start.distanceTo(eb.pos) < 5.5) applyDamage(e, { amount: 70, type: DamageType.Energy, crit: false, headshot: false, knockback: 10, statusChance: 0, lifesteal: 0, attacker: ctx.player, world: ctx.world, effects: ctx.effects, hitPoint: eb.pos.clone(), source: 'player' }); } bus.emit(Channels.PlaySFX, { name: 'explosion', volume: 0.5 }); }, 500);
    bus.emit(Channels.PlaySFX, { name: 'dash', volume: 0.6 });
    return true;
  } });
A({ id: 'phoenixRise', name: 'Phoenix Rise', cooldown: 30, key: 'KeyX', rarity: 'legendary', tags: ['defense', 'sustain', 'special'],
  description: 'Heal to full, cleanse, and emit a massive fire nova.', icon: { shape: 'feather', color: 0xff7733 },
  activate: (ctx) => {
    const body = ctx.player.get(Body); if (!body) return false;
    heal(ctx.player, 9999);
    const st = ctx.player.get(StatusEffects.type); if (st) st.effects.clear();
    const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
    for (const e of enemies) { const eb = e.get(Body); if (!eb) continue; if (body.pos.distanceTo(eb.pos) > 12) continue;
      applyDamage(e, { amount: 150, type: DamageType.Fire, crit: false, headshot: false, knockback: 16, statusChance: 0.8, statusType: StatusType.Burn, statusPower: 3, statusDuration: 4, lifesteal: 0, attacker: ctx.player, world: ctx.world, effects: ctx.effects, hitPoint: eb.pos.clone(), source: 'player' }); }
    if (ctx.effects) { ctx.effects.explosion(body.pos.clone().setY(0.6), 12, 0xff7733, true); ctx.effects.addShake(0.9); ctx.effects.screenFlash([255, 120, 40], 0.7); }
    bus.emit(Channels.PlaySFX, { name: 'explosion', volume: 1.0 });
    bus.emit(Channels.Toast, { text: 'PHOENIX RISE!', color: '#ff7733' });
    return true;
  } });
A({ id: 'voidCollapse', name: 'Void Collapse', cooldown: 28, key: 'KeyX', rarity: 'legendary', tags: ['control', 'aoe', 'special'],
  description: 'Collapse a void point: pull, damage, and slow everything nearby.', icon: { shape: 'orb', color: 0x8a5bff },
  activate: (ctx) => {
    const body = ctx.player.get(Body); if (!body) return false;
    const dir = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(ctx.player.get('Player').lookPitch, ctx.player.get('Player').lookYaw, 0, 'YXZ'));
    const center = body.pos.clone().addScaledVector(dir, 10);
    const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
    for (const e of enemies) { const eb = e.get(Body); if (!eb) continue; const d = center.distanceTo(eb.pos); if (d > 12) continue;
      const pull = _v.subVectors(center, eb.pos).setY(0).normalize(); eb.vel.addScaledVector(pull, 24);
      applyDamage(e, { amount: 120, type: DamageType.Energy, crit: false, headshot: false, knockback: 0, statusChance: 0.8, statusType: StatusType.Slow, statusPower: 3, statusDuration: 4, lifesteal: 0, attacker: ctx.player, world: ctx.world, effects: ctx.effects, hitPoint: eb.pos.clone(), source: 'player' }); }
    if (ctx.effects) { ctx.effects.explosion(center.clone().setY(0.5), 12, 0x8a5bff, true); ctx.effects.addShake(0.8); }
    bus.emit(Channels.PlaySFX, { name: 'void_hum', volume: 0.7, dur: 1.5 });
    bus.emit(Channels.Toast, { text: 'VOID COLLAPSE', color: '#8a5bff' });
    return true;
  } });
A({ id: 'twinBurst', name: 'Twin Burst', cooldown: 10, key: 'KeyQ', rarity: 'epic', tags: ['offense', 'mobility'],
  description: 'Dash and fire a 360° piercing burst at both start and end.', icon: { shape: 'arrow', color: 0xff3df0 },
  activate: (ctx) => {
    const body = ctx.player.get(Body); if (!body) return false;
    const p = ctx.player.get('Player');
    const dir = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(p.lookPitch, p.lookYaw, 0, 'YXZ')); dir.y = 0; dir.normalize();
    const start = body.pos.clone();
    const burst = (pos) => { const from = pos.clone().setY(1.4); for (let i = 0; i < 20; i++) { const a = (i / 20) * Math.PI * 2; const d = new THREE.Vector3(Math.cos(a), 0, Math.sin(a)).normalize(); ctx.projectileFactory.spawn({ position: from.clone(), direction: d, team: 'player', ownerId: ctx.player.id, damage: 35, damageType: DamageType.Energy, knockback: 6, color: 0xff3df0, projectile: { speed: 42, gravity: 0, lifetime: 1.6, color: 0xff3df0, radius: 0.16, shape: 'shard', scale: 1, pierce: 3, glow: true, trail: true } }); } };
    burst(start);
    body.pos.addScaledVector(dir, 9);
    burst(body.pos.clone());
    if (ctx.effects) { ctx.effects.death(start.clone().setY(1), 0xff3df0, 1.5); ctx.effects.death(body.pos.clone().setY(1), 0xff3df0, 1.5); }
    bus.emit(Channels.PlaySFX, { name: 'dash', volume: 0.6 });
    return true;
  } });
A({ id: 'aegisNova2', name: 'Aegis Nova', cooldown: 16, key: 'KeyV', rarity: 'epic', tags: ['defense', 'control'],
  description: 'Pulse a shield that knocks back, stuns, and shields you.', icon: { shape: 'shield', color: 0x29e7ff },
  activate: (ctx) => {
    const body = ctx.player.get(Body); if (!body) return false;
    const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
    for (const e of enemies) { const eb = e.get(Body); if (!eb) continue; if (body.pos.distanceTo(eb.pos) > 9) continue;
      const dir = _v.subVectors(eb.pos, body.pos).setY(0).normalize(); eb.vel.addScaledVector(dir, 18);
      let st = e.get(StatusEffects.type); if (!st) { st = new StatusEffects(); e.add(st); } st.add(StatusType.Stun, 1, 1.5); }
    let sh = ctx.player.get(Shield); if (!sh) { sh = new Shield(); ctx.player.add(sh); }
    sh.max = Math.max(sh.max, 60); sh.current = sh.max;
    if (ctx.effects) { ctx.effects.explosion(body.pos.clone().setY(0.6), 9, 0x29e7ff, false); ctx.effects.addShake(0.4); }
    bus.emit(Channels.PlaySFX, { name: 'ability', volume: 0.6 });
    return true;
  } });
A({ id: 'soulHarvestAbil', name: 'Soul Harvest', cooldown: 22, key: 'KeyF', rarity: 'legendary', tags: ['offense', 'sustain', 'special'],
  description: 'Drain all nearby enemies: heavy damage and heal for 50% of damage dealt.', icon: { shape: 'skull', color: 0xb266ff },
  activate: (ctx) => {
    const body = ctx.player.get(Body); if (!body) return false;
    const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
    let total = 0;
    for (const e of enemies) { const eb = e.get(Body); if (!eb) continue; if (body.pos.distanceTo(eb.pos) > 12) continue;
      const r = applyDamage(e, { amount: 100, type: DamageType.Energy, crit: false, headshot: false, knockback: 4, statusChance: 0, lifesteal: 0, attacker: ctx.player, world: ctx.world, effects: ctx.effects, hitPoint: eb.pos.clone(), source: 'player' });
      total += r.dealt; if (ctx.effects) ctx.effects.beam(eb.pos.clone().setY(1), body.pos.clone().setY(1), 0xb266ff, 0.08, 0.4); }
    heal(ctx.player, total * 0.5);
    if (ctx.effects) { ctx.effects.flash(body.pos.clone().setY(1), 0xb266ff, 2.5); ctx.effects.addShake(0.4); }
    bus.emit(Channels.PlaySFX, { name: 'ability', volume: 0.7 });
    bus.emit(Channels.Toast, { text: 'SOUL HARVEST', color: '#b266ff' });
    return true;
  } });
A({ id: 'stormCall', name: 'Storm Call', cooldown: 20, key: 'KeyX', rarity: 'legendary', tags: ['offense', 'status', 'aoe'],
  description: 'Call lightning strikes on 8 random enemies across the arena.', icon: { shape: 'bolt', color: 0xffe066 },
  activate: (ctx) => {
    const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
    const targets = enemies.filter(() => Math.random() < 0.5).slice(0, 8);
    if (targets.length === 0 && enemies.length) targets.push(...enemies.slice(0, 3));
    for (const e of targets) { const eb = e.get(Body); if (!eb) continue; const pos = eb.pos.clone();
      if (ctx.effects) { ctx.effects.beam(pos.clone().setY(20), pos.clone().setY(0.5), 0xffe066, 0.3, 0.3); ctx.effects.explosion(pos.clone().setY(0.5), 4, 0xffe066, false); }
      applyDamage(e, { amount: 120, type: DamageType.Shock, crit: false, headshot: false, knockback: 8, statusChance: 0.8, statusType: StatusType.Shock, statusPower: 2, statusDuration: 2, lifesteal: 0, attacker: ctx.player, world: ctx.world, effects: ctx.effects, hitPoint: pos, source: 'player' });
    }
    bus.emit(Channels.PlaySFX, { name: 'shoot_lightning', volume: 0.8 });
    bus.emit(Channels.Toast, { text: 'STORM CALL', color: '#ffe066' });
    return true;
  } });
