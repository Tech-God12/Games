// ============================================================================
// abilities3.js — Additional active abilities: buffs, traps, and ultimates.
// ============================================================================

import * as THREE from 'three';
import { AbilityRegistry } from '../AbilityRegistry.js';
import { applyDamage, heal } from '../../combat/Damage.js';
import { StatusEffects, StatusType, DamageType } from '../../ecs/components/Combat.js';
import { Health, Shield } from '../../ecs/components/Vitals.js';
import { bus, Channels } from '../../core/EventBus.js';

import { Body as Body2 } from '../../ecs/components/Body.js';
const _v = new THREE.Vector3();

AbilityRegistry.registerMany([
  { id: 'orbitalStrike', name: 'Orbital Strike', cooldown: 28, key: 'KeyX', rarity: 'legendary', tags: ['offense', 'aoe'],
    description: 'Call down a massive column of energy on the nearest enemy.', icon: { shape: 'blast', color: 0x29e7ff },
    activate: (ctx) => {
      const body = ctx.player.get(Body2); if (!body) return false;
      const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
      let tgt = null, bd = 40;
      for (const e of enemies) { const eb = e.get(Body2); if (!eb) continue; const d = body.pos.distanceTo(eb.pos); if (d < bd) { bd = d; tgt = eb; } }
      const pos = tgt ? tgt.pos.clone() : body.pos.clone().add(new THREE.Vector3(0, 0, 8));
      if (ctx.effects) { ctx.effects.explosion(pos.clone().setY(0.5), 10, 0x29e7ff, true); ctx.effects.addShake(0.8); ctx.effects.beam(pos.clone().setY(20), pos.clone().setY(0.5), 0x29e7ff, 0.5, 0.4); }
      for (const e of enemies) { const eb = e.get(Body2); if (!eb) continue; if (pos.distanceTo(eb.pos) < 9) applyDamage(e, { amount: 200, type: DamageType.Energy, crit: true, headshot: false, knockback: 20, statusChance: 0, lifesteal: 0, attacker: ctx.player, world: ctx.world, effects: ctx.effects, hitPoint: eb.pos.clone(), source: 'player' }); }
      bus.emit(Channels.PlaySFX, { name: 'explosion', volume: 1.0 });
      bus.emit(Channels.Toast, { text: 'ORBITAL STRIKE', color: '#29e7ff' });
      return true;
    } },
  { id: 'fortify', name: 'Fortify', cooldown: 16, key: 'KeyV', rarity: 'epic', tags: ['defense'],
    description: 'Gain 100 shield, +6 armor, and 25% damage reduction for 6s.', icon: { shape: 'shield', color: 0x4aa3ff },
    activate: (ctx) => {
      const h = ctx.player.get(Health); if (!h) return false;
      h.invulnTime = Math.max(h.invulnTime, 0.5);
      let sh = ctx.player.get(Shield); if (!sh) { sh = new Shield(); ctx.player.add(sh); }
      sh.max = Math.max(sh.max, 100); sh.current = sh.max;
      ctx.player.meta = ctx.player.meta || {}; ctx.player.meta.fortify = 6;
      if (ctx.effects) ctx.effects.flash(ctx.player.get(Body2).pos.clone().setY(1), 0x4aa3ff, 2);
      bus.emit(Channels.PlaySFX, { name: 'ability', volume: 0.6 });
      return true;
    } },
  { id: 'bloodlust', name: 'Bloodlust', cooldown: 20, key: 'KeyQ', rarity: 'epic', tags: ['offense', 'sustain'],
    description: '+80% damage and +40% lifesteal for 5s.', icon: { shape: 'drop', color: 0xff3df0 },
    activate: (ctx) => {
      ctx.player.meta = ctx.player.meta || {}; ctx.player.meta.bloodlustAbil = 5;
      if (ctx.effects) ctx.effects.screenFlash([255, 60, 180], 0.5);
      bus.emit(Channels.PlaySFX, { name: 'boss_roar', volume: 0.4 });
      bus.emit(Channels.Toast, { text: 'BLOODLUST!', color: '#ff3df0' });
      return true;
    } },
  { id: 'groundSpike', name: 'Spike Trap', cooldown: 12, key: 'KeyF', rarity: 'epic', tags: ['offense', 'control'],
    description: 'Erupt spikes around you: damage + knockback + bleed.', icon: { shape: 'spike', color: 0x9fb3d6 },
    activate: (ctx) => {
      const body = ctx.player.get(Body2); if (!body) return false;
      const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
      for (const e of enemies) { const eb = e.get(Body2); if (!eb) continue; const d = body.pos.distanceTo(eb.pos); if (d > 8) continue;
        const dir = _v.subVectors(eb.pos, body.pos).setY(0).normalize();
        applyDamage(e, { amount: 50 * (1 - d / 8 * 0.4), type: DamageType.Kinetic, crit: false, headshot: false, knockback: 16, statusChance: 0.6, statusType: StatusType.Bleed, statusPower: 2, statusDuration: 3, lifesteal: 0, attacker: ctx.player, world: ctx.world, effects: ctx.effects, hitPoint: eb.pos.clone(), hitNormal: dir, source: 'player' });
      }
      if (ctx.effects) { ctx.effects.explosion(body.pos.clone().setY(0.4), 8, 0x9fb3d6, false); ctx.effects.addShake(0.4); }
      bus.emit(Channels.PlaySFX, { name: 'explosion', volume: 0.6 });
      return true;
    } },
  { id: 'rally', name: 'Rally', cooldown: 24, key: 'KeyX', rarity: 'epic', tags: ['sustain', 'special'],
    description: 'Heal 50 HP, cleanse, and gain +30% damage for 8s.', icon: { shape: 'flag', color: 0x4fd07a },
    activate: (ctx) => {
      heal(ctx.player, 50);
      const st = ctx.player.get(StatusEffects.type); if (st) st.effects.clear();
      ctx.player.meta = ctx.player.meta || {}; ctx.player.meta.rally = 8;
      if (ctx.effects) ctx.effects.flash(ctx.player.get(Body2).pos.clone().setY(1), 0x4fd07a, 2);
      bus.emit(Channels.PlaySFX, { name: 'levelup', volume: 0.5 });
      bus.emit(Channels.Toast, { text: 'RALLY!', color: '#4fd07a' });
      return true;
    } },
  { id: 'voidRift', name: 'Void Rift', cooldown: 22, key: 'KeyF', rarity: 'legendary', tags: ['control', 'aoe'],
    description: 'Open a void rift that pulls and damages enemies for 4s.', icon: { shape: 'orb', color: 0x8a5bff },
    activate: (ctx) => {
      const body = ctx.player.get(Body2); if (!body) return false;
      ctx.player.meta = ctx.player.meta || {}; ctx.player.meta.voidRift = { time: 4, pos: body.pos.clone().add(new THREE.Vector3(0, 0, 6)), tick: 0 };
      if (ctx.effects) ctx.effects.flash(ctx.player.meta.voidRift.pos, 0x8a5bff, 2.5);
      bus.emit(Channels.PlaySFX, { name: 'void_hum', volume: 0.6, dur: 1.2 });
      bus.emit(Channels.Toast, { text: 'VOID RIFT', color: '#8a5bff' });
      return true;
    } },
  { id: 'adrenaline2', name: 'Combat Stim', cooldown: 12, key: 'KeyV', rarity: 'rare', tags: ['offense', 'mobility'],
    description: '+40% fire rate and +25% move speed for 5s.', icon: { shape: 'syringe', color: 0xff5544 },
    activate: (ctx) => {
      ctx.player.meta = ctx.player.meta || {}; ctx.player.meta.stim = 5;
      if (ctx.effects) ctx.effects.screenFlash([255, 100, 80], 0.4);
      bus.emit(Channels.PlaySFX, { name: 'ability', volume: 0.5 });
      return true;
    } },
  { id: 'mineField', name: 'Mine Field', cooldown: 18, key: 'KeyQ', rarity: 'epic', tags: ['offense', 'tactical'],
    description: 'Scatter 6 proximity mines around you.', icon: { shape: 'bomb', color: 0xff3df0 },
    activate: (ctx) => {
      const body = ctx.player.get(Body2); if (!body) return false;
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const pos = body.pos.clone().add(new THREE.Vector3(Math.cos(a) * 4, 0, Math.sin(a) * 4));
        ctx.projectileFactory.spawn({ position: pos.clone().setY(0.5), direction: new THREE.Vector3(0, 0, 0), team: 'player', ownerId: ctx.player.id, damage: 80, damageType: DamageType.Explosive, knockback: 14, color: 0xff3df0,
          projectile: { speed: 0.1, gravity: 0, lifetime: 12, color: 0xff3df0, radius: 0.25, shape: 'orb', scale: 1, aoe: 4, aoeFalloff: 0.4, proximity: 3, glow: true, trail: false } });
      }
      bus.emit(Channels.PlaySFX, { name: 'ability', volume: 0.5 });
      return true;
    } },
]);
