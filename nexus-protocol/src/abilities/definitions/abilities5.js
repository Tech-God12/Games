// ============================================================================
// abilities5.js — More active abilities: tactical, defensive, and elemental
// ultimates rounding out the ability roster.
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

A({ id: 'infernoBlast', name: 'Inferno Blast', cooldown: 12, key: 'KeyF', rarity: 'epic', tags: ['offense', 'aoe', 'status'],
  description: 'Erupt a fire nova: damage + burn all nearby enemies.', icon: { shape: 'flame', color: 0xff5522 },
  activate: (ctx) => {
    const body = ctx.player.get(Body); if (!body) return false;
    const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
    for (const e of enemies) { const eb = e.get(Body); if (!eb) continue; if (body.pos.distanceTo(eb.pos) > 9) continue;
      applyDamage(e, { amount: 50, type: DamageType.Fire, crit: false, headshot: false, knockback: 8, statusChance: 0.8, statusType: StatusType.Burn, statusPower: 3, statusDuration: 4, lifesteal: 0, attacker: ctx.player, world: ctx.world, effects: ctx.effects, hitPoint: eb.pos.clone(), source: 'player' }); }
    if (ctx.effects) { ctx.effects.explosion(body.pos.clone().setY(0.6), 9, 0xff5522, true); ctx.effects.addShake(0.5); }
    bus.emit(Channels.PlaySFX, { name: 'explosion', volume: 0.7 });
    return true;
  } });
A({ id: 'blizzard', name: 'Blizzard', cooldown: 16, key: 'KeyX', rarity: 'legendary', tags: ['control', 'status', 'aoe'],
  description: 'Conjure a blizzard: freeze and damage all enemies in a wide area for 4s.', icon: { shape: 'snow', color: 0x9fe7ff },
  activate: (ctx) => {
    const body = ctx.player.get(Body); if (!body) return false;
    const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
    for (const e of enemies) { const eb = e.get(Body); if (!eb) continue; if (body.pos.distanceTo(eb.pos) > 16) continue;
      let st = e.get(StatusEffects.type); if (!st) { st = new StatusEffects(); e.add(st); }
      st.add(StatusType.Freeze, 3, 4);
      applyDamage(e, { amount: 30, type: DamageType.Cryo, crit: false, headshot: false, knockback: 2, statusChance: 0, lifesteal: 0, attacker: ctx.player, world: ctx.world, effects: ctx.effects, hitPoint: eb.pos.clone(), source: 'player' }); }
    if (ctx.effects) { ctx.effects.explosion(body.pos.clone().setY(1), 16, 0x9fe7ff, true); ctx.effects.addShake(0.4); }
    bus.emit(Channels.PlaySFX, { name: 'void_hum', volume: 0.6, dur: 1.5 });
    bus.emit(Channels.Toast, { text: 'BLIZZARD', color: '#9fe7ff' });
    return true;
  } });
A({ id: 'thunderclap', name: 'Thunderclap', cooldown: 10, key: 'KeyF', rarity: 'epic', tags: ['offense', 'control', 'status'],
  description: 'A shock clap: damage, stun, and shock nearby enemies.', icon: { shape: 'bolt', color: 0xffe066 },
  activate: (ctx) => {
    const body = ctx.player.get(Body); if (!body) return false;
    const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
    for (const e of enemies) { const eb = e.get(Body); if (!eb) continue; if (body.pos.distanceTo(eb.pos) > 8) continue;
      let st = e.get(StatusEffects.type); if (!st) { st = new StatusEffects(); e.add(st); }
      st.add(StatusType.Stun, 1, 1.5); st.add(StatusType.Shock, 2, 2);
      applyDamage(e, { amount: 40, type: DamageType.Shock, crit: false, headshot: false, knockback: 10, statusChance: 0, lifesteal: 0, attacker: ctx.player, world: ctx.world, effects: ctx.effects, hitPoint: eb.pos.clone(), source: 'player' }); }
    if (ctx.effects) { ctx.effects.explosion(body.pos.clone().setY(0.6), 8, 0xffe066, false); ctx.effects.addShake(0.5); }
    bus.emit(Channels.PlaySFX, { name: 'shoot_lightning', volume: 0.7 });
    return true;
  } });
A({ id: 'meteor', name: 'Meteor', cooldown: 20, key: 'KeyX', rarity: 'legendary', tags: ['offense', 'aoe'],
  description: 'Call a meteor that crashes for massive area damage.', icon: { shape: 'blast', color: 0xff7733 },
  activate: (ctx) => {
    const body = ctx.player.get(Body); if (!body) return false;
    const dir = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(ctx.player.get('Player').lookPitch, ctx.player.get('Player').lookYaw, 0, 'YXZ'));
    const pos = body.pos.clone().addScaledVector(dir, 10).setY(0.5);
    if (ctx.effects) { ctx.effects.beam(pos.clone().setY(30), pos.clone().setY(0.5), 0xff7733, 0.4, 0.3); ctx.effects.explosion(pos, 10, 0xff7733, true); ctx.effects.addShake(0.9); }
    const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
    for (const e of enemies) { const eb = e.get(Body); if (!eb) continue; if (pos.distanceTo(eb.pos) < 9) applyDamage(e, { amount: 180, type: DamageType.Explosive, crit: false, headshot: false, knockback: 24, statusChance: 0.6, statusType: StatusType.Burn, statusPower: 3, statusDuration: 3, lifesteal: 0, attacker: ctx.player, world: ctx.world, effects: ctx.effects, hitPoint: eb.pos.clone(), source: 'player' }); }
    bus.emit(Channels.PlaySFX, { name: 'explosion', volume: 1.0 });
    bus.emit(Channels.Toast, { text: 'METEOR!', color: '#ff7733' });
    return true;
  } });
A({ id: 'siphon', name: 'Siphon', cooldown: 14, key: 'KeyV', rarity: 'epic', tags: ['sustain', 'offense'],
  description: 'Drain life from all nearby enemies, healing yourself.', icon: { shape: 'drop', color: 0xff3df0 },
  activate: (ctx) => {
    const body = ctx.player.get(Body); if (!body) return false;
    const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
    let total = 0;
    for (const e of enemies) { const eb = e.get(Body); if (!eb) continue; if (body.pos.distanceTo(eb.pos) > 10) continue;
      const r = applyDamage(e, { amount: 35, type: DamageType.Energy, crit: false, headshot: false, knockback: 2, statusChance: 0, lifesteal: 0, attacker: ctx.player, world: ctx.world, effects: ctx.effects, hitPoint: eb.pos.clone(), source: 'player' });
      total += r.dealt; if (ctx.effects) ctx.effects.beam(eb.pos.clone().setY(1), body.pos.clone().setY(1), 0xff3df0, 0.06, 0.3); }
    heal(ctx.player, total * 0.5);
    if (ctx.effects) ctx.effects.flash(body.pos.clone().setY(1), 0xff3df0, 1.5);
    bus.emit(Channels.PlaySFX, { name: 'ability', volume: 0.6 });
    return true;
  } });
A({ id: 'mirrorImage', name: 'Mirror Image', cooldown: 22, key: 'KeyQ', rarity: 'epic', tags: ['mobility', 'special'],
  description: 'Spawn a decoy that draws enemy fire for 6s.', icon: { shape: 'ghost', color: 0x29e7ff },
  activate: (ctx) => {
    const body = ctx.player.get(Body); if (!body) return false;
    ctx.player.meta = ctx.player.meta || {};
    const arr = ctx.player.meta.decoys = ctx.player.meta.decoys || [];
    if (arr.length > 2) arr.shift();
    arr.push({ pos: body.pos.clone().add(new THREE.Vector3((Math.random() - 0.5) * 4, 0, (Math.random() - 0.5) * 4)), time: 6 });
    if (ctx.effects) ctx.effects.death(body.pos.clone().setY(1), 0x29e7ff, 1.5);
    bus.emit(Channels.PlaySFX, { name: 'ability', volume: 0.5 });
    return true;
  } });
A({ id: 'overload2', name: 'Overload', cooldown: 24, key: 'KeyX', rarity: 'legendary', tags: ['offense', 'special'],
  description: '+100% damage and infinite ammo for 5s.', icon: { shape: 'chip', color: 0xff5544 },
  activate: (ctx) => {
    ctx.player.meta = ctx.player.meta || {}; ctx.player.meta.overload2 = 5;
    if (ctx.effects) ctx.effects.screenFlash([255, 80, 60], 0.6);
    bus.emit(Channels.PlaySFX, { name: 'boss_roar', volume: 0.4 });
    bus.emit(Channels.Toast, { text: 'OVERLOAD!', color: '#ff5544' });
    return true;
  } });
A({ id: 'sanctuary', name: 'Sanctuary', cooldown: 26, key: 'KeyV', rarity: 'legendary', tags: ['defense', 'sustain', 'special'],
  description: 'Create a sanctuary: invulnerable + regen 8 HP/s for 5s.', icon: { shape: 'lotus', color: 0x4fd07a },
  activate: (ctx) => {
    const h = ctx.player.get(Health); if (!h) return false;
    h.invulnTime = Math.max(h.invulnTime, 5);
    ctx.player.meta = ctx.player.meta || {}; ctx.player.meta.sanctuary = 5;
    if (ctx.effects) ctx.effects.flash(ctx.player.get(Body).pos.clone().setY(1), 0x4fd07a, 3);
    bus.emit(Channels.PlaySFX, { name: 'levelup', volume: 0.6 });
    bus.emit(Channels.Toast, { text: 'SANCTUARY', color: '#4fd07a' });
    return true;
  } });
A({ id: 'ripple', name: 'Ripple', cooldown: 11, key: 'KeyQ', rarity: 'rare', tags: ['control', 'mobility'],
  description: 'A ripple that slows and pushes back nearby enemies.', icon: { shape: 'ring', color: 0x29e7ff },
  activate: (ctx) => {
    const body = ctx.player.get(Body); if (!body) return false;
    const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
    for (const e of enemies) { const eb = e.get(Body); if (!eb) continue; if (body.pos.distanceTo(eb.pos) > 8) continue;
      const dir = _v.subVectors(eb.pos, body.pos).setY(0).normalize(); eb.vel.addScaledVector(dir, 14);
      let st = e.get(StatusEffects.type); if (!st) { st = new StatusEffects(); e.add(st); } st.add(StatusType.Slow, 2, 2); }
    if (ctx.effects) { ctx.effects.explosion(body.pos.clone().setY(0.5), 8, 0x29e7ff, false); ctx.effects.addShake(0.3); }
    bus.emit(Channels.PlaySFX, { name: 'ability', volume: 0.5 });
    return true;
  } });
A({ id: 'flareBurst', name: 'Flare Burst', cooldown: 8, key: 'KeyQ', rarity: 'rare', tags: ['offense', 'aoe'],
  description: 'Launch 3 flares that detonate in small explosions.', icon: { shape: 'flame', color: 0xff5522 },
  activate: (ctx) => {
    const body = ctx.player.get(Body); if (!body) return false;
    for (let i = -1; i <= 1; i++) {
      const dir = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(ctx.player.get('Player').lookPitch, ctx.player.get('Player').lookYaw + i * 0.3, 0, 'YXZ'));
      ctx.projectileFactory.spawn({ position: body.pos.clone().setY(1.4), direction: dir.add(new THREE.Vector3(0, 0.3, 0)).normalize(), team: 'player', ownerId: ctx.player.id, damage: 50, damageType: DamageType.Explosive, knockback: 10, color: 0xff5522,
        projectile: { speed: 30, gravity: 0.5, lifetime: 2, color: 0xff5522, radius: 0.22, shape: 'chunky', scale: 1.1, aoe: 4, aoeFalloff: 0.5, glow: true, trail: true } });
    }
    bus.emit(Channels.PlaySFX, { name: 'shoot_rocket', volume: 0.5 });
    return true;
  } });
