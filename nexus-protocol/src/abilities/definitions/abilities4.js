// ============================================================================
// abilities4.js — More active abilities: utility, escapes, and big finishers.
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
  { id: 'phaseWalk', name: 'Phase Walk', cooldown: 9, key: 'KeyQ', rarity: 'epic', tags: ['mobility', 'defense'],
    description: 'Become intangible and +50% move speed for 3s.', icon: { shape: 'ghost', color: 0x8a5bff },
    activate: (ctx) => {
      const h = ctx.player.get(Health); if (!h) return false;
      h.invulnTime = Math.max(h.invulnTime, 3);
      ctx.player.meta = ctx.player.meta || {}; ctx.player.meta.phaseWalk = 3;
      if (ctx.effects) ctx.effects.flash(ctx.player.get(Body).pos.clone().setY(1), 0x8a5bff, 2);
      bus.emit(Channels.PlaySFX, { name: 'void_hum', volume: 0.5, dur: 0.6 });
      return true;
    } },
  { id: 'vengeance', name: 'Vengeance', cooldown: 18, key: 'KeyX', rarity: 'epic', tags: ['offense', 'special'],
    description: 'Reflect 200% of damage taken in the last 5s as a shockwave.', icon: { shape: 'blast', color: 0xff5544 },
    activate: (ctx) => {
      const body = ctx.player.get(Body); if (!body) return false;
      const dmg = 120 + (ctx.player.meta?.recentDamage || 0) * 2;
      const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
      for (const e of enemies) { const eb = e.get(Body); if (!eb) continue; if (body.pos.distanceTo(eb.pos) > 10) continue;
        applyDamage(e, { amount: dmg * (1 - body.pos.distanceTo(eb.pos) / 10 * 0.5), type: DamageType.Explosive, crit: false, headshot: false, knockback: 18, statusChance: 0, lifesteal: 0, attacker: ctx.player, world: ctx.world, effects: ctx.effects, hitPoint: eb.pos.clone(), source: 'player' }); }
      if (ctx.effects) { ctx.effects.explosion(body.pos.clone().setY(0.6), 10, 0xff5544, true); ctx.effects.addShake(0.7); }
      ctx.player.meta = ctx.player.meta || {}; ctx.player.meta.recentDamage = 0;
      bus.emit(Channels.PlaySFX, { name: 'explosion', volume: 0.8 });
      return true;
    } },
  { id: 'soulLink', name: 'Soul Link', cooldown: 20, key: 'KeyF', rarity: 'legendary', tags: ['control', 'special'],
    description: 'Chain all enemies within 15m together; damage one damages all.', icon: { shape: 'chain', color: 0xb266ff },
    activate: (ctx) => {
      const body = ctx.player.get(Body); if (!body) return false;
      const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
      const linked = enemies.filter(e => { const eb = e.get(Body); return eb && body.pos.distanceTo(eb.pos) < 15; });
      for (const e of linked) { let st = e.get(StatusEffects.type); if (!st) { st = new StatusEffects(); e.add(st); } st.add(StatusType.Mark, 3, 5); }
      if (ctx.effects) { for (const e of linked) { const eb = e.get(Body); ctx.effects.beam(body.pos.clone().setY(1), eb.pos.clone().setY(1), 0xb266ff, 0.08, 0.5); } }
      bus.emit(Channels.PlaySFX, { name: 'ability', volume: 0.6 });
      bus.emit(Channels.Toast, { text: 'SOUL LINK', color: '#b266ff' });
      return true;
    } },
  { id: 'aegisNova', name: 'Aegis Nova', cooldown: 16, key: 'KeyV', rarity: 'epic', tags: ['defense', 'control'],
    description: 'Pulse a shield that knocks back and stuns nearby enemies.', icon: { shape: 'shield', color: 0x29e7ff },
    activate: (ctx) => {
      const body = ctx.player.get(Body); if (!body) return false;
      const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
      for (const e of enemies) { const eb = e.get(Body); if (!eb) continue; if (body.pos.distanceTo(eb.pos) > 8) continue;
        const dir = _v.subVectors(eb.pos, body.pos).setY(0).normalize(); eb.vel.addScaledVector(dir, 16);
        let st = e.get(StatusEffects.type); if (!st) { st = new StatusEffects(); e.add(st); } st.add(StatusType.Stun, 1, 1.5); }
      if (ctx.effects) { ctx.effects.explosion(body.pos.clone().setY(0.6), 8, 0x29e7ff, false); ctx.effects.addShake(0.4); }
      bus.emit(Channels.PlaySFX, { name: 'ability', volume: 0.6 });
      return true;
    } },
  { id: 'overclock', name: 'Overclock', cooldown: 22, key: 'KeyX', rarity: 'epic', tags: ['offense', 'special'],
    description: '+100% fire rate and no ammo cost for 5s.', icon: { shape: 'chip', color: 0xff5544 },
    activate: (ctx) => {
      ctx.player.meta = ctx.player.meta || {}; ctx.player.meta.overclock = 5;
      if (ctx.effects) ctx.effects.screenFlash([255, 80, 60], 0.5);
      bus.emit(Channels.PlaySFX, { name: 'ability', volume: 0.6 });
      bus.emit(Channels.Toast, { text: 'OVERCLOCK!', color: '#ff5544' });
      return true;
    } },
  { id: 'deathBlossom', name: 'Death Blossom', cooldown: 24, key: 'KeyX', rarity: 'legendary', tags: ['offense', 'aoe'],
    description: 'Spin, firing a 360° barrage of piercing projectiles.', icon: { shape: 'star', color: 0xff3df0 },
    activate: (ctx) => {
      const body = ctx.player.get(Body); if (!body) return false;
      const from = body.pos.clone().setY(1.4);
      const n = 32;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        const dir = new THREE.Vector3(Math.cos(a), 0, Math.sin(a)).normalize();
        ctx.projectileFactory.spawn({ position: from.clone(), direction: dir, team: 'player', ownerId: ctx.player.id, damage: 50, damageType: DamageType.Energy, knockback: 8, color: 0xff3df0,
          projectile: { speed: 40, gravity: 0, lifetime: 2, color: 0xff3df0, radius: 0.18, shape: 'shard', scale: 1.2, pierce: 5, glow: true, trail: true } });
      }
      if (ctx.effects) { ctx.effects.explosion(body.pos.clone().setY(1), 4, 0xff3df0, true); ctx.effects.addShake(0.5); }
      bus.emit(Channels.PlaySFX, { name: 'shoot_lightning', volume: 0.7 });
      return true;
    } },
  { id: 'emergencyRepair', name: 'Emergency Repair', cooldown: 18, key: 'KeyV', rarity: 'rare', tags: ['sustain'],
    description: 'Heal 50 HP and gain 30 shield instantly.', icon: { shape: 'wrench', color: 0x4fd07a },
    activate: (ctx) => {
      heal(ctx.player, 50);
      let sh = ctx.player.get(Shield); if (!sh) { sh = new Shield(); ctx.player.add(sh); }
      sh.max = Math.max(sh.max, 30); sh.current = Math.min(sh.max, sh.current + 30);
      if (ctx.effects) ctx.effects.flash(ctx.player.get(Body).pos.clone().setY(1), 0x4fd07a, 1.5);
      bus.emit(Channels.PlaySFX, { name: 'pickup', volume: 0.6 });
      return true;
    } },
  { id: 'gravitySlam', name: 'Gravity Slam', cooldown: 14, key: 'KeyF', rarity: 'epic', tags: ['control', 'aoe'],
    description: 'Pull all enemies within 14m toward you and damage them.', icon: { shape: 'orb', color: 0x8a5bff },
    activate: (ctx) => {
      const body = ctx.player.get(Body); if (!body) return false;
      const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
      for (const e of enemies) { const eb = e.get(Body); if (!eb) continue; const d = body.pos.distanceTo(eb.pos); if (d > 14 || d < 0.1) continue;
        const dir = _v.subVectors(body.pos, eb.pos).setY(0).normalize(); eb.vel.addScaledVector(dir, 30);
        applyDamage(e, { amount: 40, type: DamageType.Kinetic, crit: false, headshot: false, knockback: 0, statusChance: 0.5, statusType: StatusType.Slow, statusPower: 2, statusDuration: 2, lifesteal: 0, attacker: ctx.player, world: ctx.world, effects: ctx.effects, hitPoint: eb.pos.clone(), source: 'player' }); }
      if (ctx.effects) { ctx.effects.flash(body.pos.clone().setY(0.5), 0x8a5bff, 3); ctx.effects.addShake(0.4); }
      bus.emit(Channels.PlaySFX, { name: 'shoot_plasma', volume: 0.7 });
      return true;
    } },
]);
