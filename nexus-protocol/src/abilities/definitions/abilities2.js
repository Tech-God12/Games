// ============================================================================
// abilities2.js — Additional active abilities: traps, buffs, summons, mobility.
// ============================================================================

import * as THREE from 'three';
import { AbilityRegistry } from '../AbilityRegistry.js';
import { applyDamage, heal } from '../../combat/Damage.js';
import { StatusEffects, StatusType, DamageType } from '../../ecs/components/Combat.js';
import { Health, Shield } from '../../ecs/components/Vitals.js';
import { Body } from '../../ecs/components/Body.js';
import { bus, Channels } from '../../core/EventBus.js';

const _v = new THREE.Vector3();

AbilityRegistry.registerMany([
  { id: 'turretDrop', name: 'Auto Turret', cooldown: 18, key: 'KeyF', rarity: 'epic', tags: ['summon', 'offense'],
    description: 'Deploy a temporary auto-turret that fires at enemies for 14s.', icon: { shape: 'turret', color: 0x29e7ff },
    activate: (ctx) => {
      const body = ctx.player.get(Body); if (!body) return false;
      ctx.player.meta = ctx.player.meta || {};
      if (ctx.player.meta.sentry) return false;
      ctx.player.meta.sentry = { time: 14, pos: body.pos.clone(), cooldown: 0 };
      if (ctx.effects) ctx.effects.flash(body.pos.clone().setY(1), 0x29e7ff, 1.5);
      bus.emit(Channels.PlaySFX, { name: 'ability', volume: 0.5 });
      return true;
    } },
  { id: 'adrenalineShot', name: 'Adrenaline', cooldown: 14, key: 'KeyV', rarity: 'rare', tags: ['offense', 'mobility'],
    description: '+50% fire rate and +30% move speed for 6s.', icon: { shape: 'syringe', color: 0xff5544 },
    activate: (ctx) => {
      ctx.player.meta = ctx.player.meta || {};
      ctx.player.meta.adrenalineShot = 6;
      if (ctx.effects) ctx.effects.screenFlash([255, 80, 60], 0.4);
      bus.emit(Channels.PlaySFX, { name: 'ability', volume: 0.5 });
      bus.emit(Channels.Toast, { text: 'ADRENALINE!', color: '#ff5544' });
      return true;
    } },
  { id: 'blackHole', name: 'Singularity', cooldown: 24, key: 'KeyX', rarity: 'legendary', tags: ['control', 'aoe'],
    description: 'Spawn a singularity that pulls enemies in then detonates.', icon: { shape: 'orb', color: 0x8a5bff },
    activate: (ctx) => {
      const body = ctx.player.get(Body); if (!body) return false;
      const dir = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(ctx.player.get('Player').lookPitch, ctx.player.get('Player').lookYaw, 0, 'YXZ'));
      const pos = body.pos.clone().addScaledVector(dir, 8).setY(1);
      ctx.projectileFactory.spawn({
        position: pos, direction: new THREE.Vector3(0, 0, 0), team: 'player', ownerId: ctx.player.id,
        damage: 120, damageType: DamageType.Energy, knockback: 20, color: 0x8a5bff,
        projectile: { speed: 1, gravity: 0, lifetime: 2.5, color: 0x8a5bff, radius: 0.5, shape: 'orb', scale: 2, aoe: 9, aoeFalloff: 0.0, proximity: 8, glow: true, trail: true },
      });
      if (ctx.effects) ctx.effects.flash(pos, 0x8a5bff, 2);
      bus.emit(Channels.PlaySFX, { name: 'shoot_plasma', volume: 0.7 });
      return true;
    } },
  { id: 'sprintBurst', name: 'Sprint Burst', cooldown: 8, key: 'KeyQ', rarity: 'rare', tags: ['mobility'],
    description: 'Dash forward with a burst of speed and i-frames.', icon: { shape: 'wind', color: 0x29e7ff },
    activate: (ctx) => {
      const body = ctx.player.get(Body); if (!body) return false;
      const p = ctx.player.get('Player');
      const dir = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(p.lookPitch, p.lookYaw, 0, 'YXZ')); dir.y = 0; dir.normalize();
      body.vel.copy(dir).multiplyScalar(26);
      const h = ctx.player.get(Health); if (h) h.invulnTime = Math.max(h.invulnTime, 0.5);
      if (ctx.effects) { ctx.effects.death(body.pos.clone().setY(1), 0x29e7ff, 1.2); ctx.effects.addShake(0.2); }
      bus.emit(Channels.PlaySFX, { name: 'dash', volume: 0.6 });
      return true;
    } },
  { id: 'mantra', name: 'Mantra', cooldown: 20, key: 'KeyF', rarity: 'epic', tags: ['defense', 'sustain'],
    description: 'Cleanse status effects, heal 40 HP, and gain 2s invulnerability.', icon: { shape: 'lotus', color: 0x4fd07a },
    activate: (ctx) => {
      const h = ctx.player.get(Health); if (!h) return false;
      h.invulnTime = Math.max(h.invulnTime, 2);
      heal(ctx.player, 40);
      const st = ctx.player.get(StatusEffects.type); if (st) st.effects.clear();
      if (ctx.effects) ctx.effects.flash(ctx.player.get(Body).pos.clone().setY(1), 0x4fd07a, 2);
      bus.emit(Channels.PlaySFX, { name: 'pickup', volume: 0.6 });
      return true;
    } },
  { id: 'rocketBarrage', name: 'Rocket Barrage', cooldown: 26, key: 'KeyX', rarity: 'legendary', tags: ['offense', 'aoe'],
    description: 'Launch a salvo of 6 homing rockets at nearby enemies.', icon: { shape: 'missile', color: 0xff7733 },
    activate: (ctx) => {
      const body = ctx.player.get(Body); if (!body) return false;
      const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
      const targets = enemies.slice(0, 6);
      for (let i = 0; i < 6; i++) {
        const tgt = targets[i] || null;
        const dir = tgt ? _v.subVectors(tgt.get(Body).pos, body.pos).setY(0).normalize() : new THREE.Vector3(Math.cos(i), 0, Math.sin(i)).normalize();
        ctx.projectileFactory.spawn({
          position: body.pos.clone().setY(1.5), direction: dir.add(new THREE.Vector3(0, 0.4, 0)).normalize(), team: 'player', ownerId: ctx.player.id,
          damage: 80, damageType: DamageType.Explosive, knockback: 14, color: 0xff7733, targetId: tgt ? tgt.id : 0,
          projectile: { speed: 30, gravity: 0.2, lifetime: 3, color: 0xff7733, radius: 0.22, shape: 'chunky', scale: 1.3, aoe: 4, aoeFalloff: 0.5, homing: 0.6, glow: true, trail: true },
        });
      }
      bus.emit(Channels.PlaySFX, { name: 'shoot_rocket', volume: 0.6 });
      bus.emit(Channels.Toast, { text: 'BARRAGE!', color: '#ff7733' });
      return true;
    } },
  { id: 'timeWarp', name: 'Time Warp', cooldown: 30, key: 'KeyX', rarity: 'legendary', tags: ['control', 'special'],
    description: 'Drastically slow all enemies for 5 seconds.', icon: { shape: 'clock', color: 0xff3df0 },
    activate: (ctx) => {
      const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
      for (const e of enemies) { let st = e.get(StatusEffects.type); if (!st) { st = new StatusEffects(); e.add(st); } st.add(StatusType.Slow, 4, 5); }
      if (ctx.effects) ctx.effects.screenFlash([180, 60, 255], 0.5);
      bus.emit(Channels.PlaySFX, { name: 'void_hum', volume: 0.6, dur: 1.5 });
      bus.emit(Channels.Toast, { text: 'TIME WARP', color: '#ff3df0' });
      return true;
    } },
  { id: 'berserk', name: 'Berserk', cooldown: 22, key: 'KeyQ', rarity: 'epic', tags: ['offense', 'special'],
    description: '+100% damage and +50% move speed for 5s. Costs 20% HP.', icon: { shape: 'fire', color: 0xff5544 },
    activate: (ctx) => {
      const h = ctx.player.get(Health); if (!h || h.current < 10) return false;
      h.current = Math.max(1, h.current - h.max * 0.2);
      ctx.player.meta = ctx.player.meta || {}; ctx.player.meta.berserk = 5;
      if (ctx.effects) ctx.effects.screenFlash([255, 60, 40], 0.5);
      bus.emit(Channels.PlaySFX, { name: 'boss_roar', volume: 0.4 });
      bus.emit(Channels.Toast, { text: 'BERSERK!', color: '#ff5544' });
      return true;
    } },
]);
