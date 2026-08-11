// ============================================================================
// abilities.js — Active ability definitions with concrete effects.
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
  {
    id: 'frag', name: 'Frag Grenade', cooldown: 6, key: 'KeyQ', rarity: 'rare', tags: ['offense', 'aoe'],
    description: 'Lob a grenade that explodes for heavy area damage.', icon: { shape: 'bomb', color: 0xff7733 },
    activate: (ctx) => {
      const body = ctx.player.get(Body); if (!body) return false;
      const p = ctx.player.get('Player');
      const yaw = p?.lookYaw || 0, pitch = p?.lookPitch || 0;
      const dir = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(pitch, yaw, 0, 'YXZ')).normalize();
      const from = new THREE.Vector3(body.pos.x, body.pos.y + 1.5, body.pos.z).addScaledVector(dir, 0.6);
      ctx.projectileFactory.spawn({
        position: from, direction: dir.add(new THREE.Vector3(0, 0.25, 0)).normalize(), team: 'player', ownerId: ctx.player.id,
        damage: 80, damageType: DamageType.Explosive, knockback: 14, color: 0xff7733,
        projectile: { speed: 22, gravity: 1.2, lifetime: 2.2, color: 0xff7733, radius: 0.3, shape: 'chunky', scale: 1.6, aoe: 6, aoeFalloff: 0.5, glow: true, trail: true },
      });
      bus.emit(Channels.PlaySFX, { name: 'shoot_rocket', volume: 0.5 });
      return true;
    },
  },
  {
    id: 'frostNova', name: 'Frost Nova', cooldown: 10, key: 'KeyF', rarity: 'epic', tags: ['control', 'status'],
    description: 'Freeze and damage all nearby enemies.', icon: { shape: 'snow', color: 0x9fe7ff },
    activate: (ctx) => {
      const body = ctx.player.get(Body); if (!body) return false;
      const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
      let hit = 0;
      for (const e of enemies) {
        const eb = e.get(Body); if (!eb) continue;
        const d = body.pos.distanceTo(eb.pos);
        if (d > 10) continue;
        let st = e.get(StatusEffects.type); if (!st) { st = new StatusEffects(); e.add(st); }
        st.add(StatusType.Freeze, 2, 3);
        applyDamage(e, { amount: 30, type: DamageType.Cryo, crit: false, headshot: false, knockback: 6, statusChance: 0, lifesteal: 0, attacker: ctx.player, world: ctx.world, effects: ctx.effects, hitPoint: eb.pos.clone(), source: 'player' });
        hit++;
      }
      if (ctx.effects) { ctx.effects.explosion(body.pos.clone().setY(0.5), 10, 0x9fe7ff, true); ctx.effects.addShake(0.4); }
      bus.emit(Channels.PlaySFX, { name: 'ability', volume: 0.6 });
      return true;
    },
  },
  {
    id: 'shieldWall', name: 'Aegis', cooldown: 12, key: 'KeyV', rarity: 'rare', tags: ['defense'],
    description: 'Become invulnerable and gain 60 shield for 4 seconds.', icon: { shape: 'shield', color: 0x29e7ff },
    activate: (ctx) => {
      const h = ctx.player.get(Health); if (!h) return false;
      h.invulnTime = Math.max(h.invulnTime, 4);
      let sh = ctx.player.get(Shield); if (!sh) { sh = new Shield(); ctx.player.add(sh); }
      sh.max = Math.max(sh.max, 60); sh.current = sh.max;
      if (ctx.effects) ctx.effects.flash(ctx.player.get(Body).pos.clone().setY(1), 0x29e7ff, 2);
      bus.emit(Channels.PlaySFX, { name: 'ability', volume: 0.6 });
      return true;
    },
  },
  {
    id: 'bulletTime', name: 'Bullet Time', cooldown: 14, key: 'KeyX', rarity: 'legendary', tags: ['control', 'special'],
    description: 'Slow time to a crawl for 4 seconds.', icon: { shape: 'clock', color: 0xff3df0 },
    activate: (ctx) => {
      if (ctx.engine?.clock) ctx.engine.clock.slowmo(0.25, 4, true);
      if (ctx.effects) ctx.effects.screenFlash([180, 60, 255], 0.5);
      bus.emit(Channels.PlaySFX, { name: 'void_hum', volume: 0.5, dur: 1.2 });
      return true;
    },
  },
  {
    id: 'blink', name: 'Blink', cooldown: 5, key: 'KeyQ', rarity: 'rare', tags: ['mobility'],
    description: 'Teleport forward in your look direction.', icon: { shape: 'arrow', color: 0x29e7ff },
    activate: (ctx) => {
      const body = ctx.player.get(Body); if (!body) return false;
      const p = ctx.player.get('Player');
      const dir = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(p.lookPitch, p.lookYaw, 0, 'YXZ'));
      dir.y = 0; dir.normalize();
      const dest = body.pos.clone().addScaledVector(dir, 10);
      // clamp to arena
      const a = ctx.arena; if (a) { const dx = dest.x - a.centerX, dz = dest.z - a.centerZ; const d = Math.hypot(dx, dz); const m = a.boundsRadius - 1; if (d > m) { dest.x = a.centerX + dx / d * m; dest.z = a.centerZ + dz / d * m; } }
      if (ctx.effects) { ctx.effects.death(body.pos.clone().setY(1), 0x29e7ff, 1); ctx.effects.death(dest.clone().setY(1), 0x29e7ff, 1); }
      body.pos.copy(dest); body.pos.y = a ? a.floorY + body.height * 0.5 : body.pos.y;
      bus.emit(Channels.PlaySFX, { name: 'dash', volume: 0.6 });
      return true;
    },
  },
  {
    id: 'nova', name: 'Shockwave', cooldown: 9, key: 'KeyF', rarity: 'epic', tags: ['offense', 'control'],
    description: 'Detonate a shockwave: heavy damage + knockback around you.', icon: { shape: 'blast', color: 0xff3df0 },
    activate: (ctx) => {
      const body = ctx.player.get(Body); if (!body) return false;
      const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
      for (const e of enemies) {
        const eb = e.get(Body); if (!eb) continue;
        const d = body.pos.distanceTo(eb.pos);
        if (d > 9) continue;
        const dir = _v.subVectors(eb.pos, body.pos).setY(0).normalize();
        applyDamage(e, { amount: 60 * (1 - d / 9 * 0.5), type: DamageType.Explosive, crit: false, headshot: false, knockback: 18, statusChance: 0, lifesteal: 0, attacker: ctx.player, world: ctx.world, effects: ctx.effects, hitPoint: eb.pos.clone(), hitNormal: dir, source: 'player' });
      }
      if (ctx.effects) { ctx.effects.explosion(body.pos.clone().setY(0.6), 9, 0xff3df0, true); ctx.effects.addShake(0.6); }
      bus.emit(Channels.PlaySFX, { name: 'explosion', volume: 0.8 });
      return true;
    },
  },
  {
    id: 'healBurst', name: 'Medkit', cooldown: 16, key: 'KeyV', rarity: 'rare', tags: ['sustain'],
    description: 'Instantly restore 60 HP.', icon: { shape: 'cross', color: 0x4fd07a },
    activate: (ctx) => {
      const amt = heal(ctx.player, 60);
      if (ctx.effects) ctx.effects.flash(ctx.player.get(Body).pos.clone().setY(1), 0x4fd07a, 1.5);
      bus.emit(Channels.PlaySFX, { name: 'pickup', volume: 0.6 });
      bus.emit(Channels.Toast, { text: `+${Math.round(amt)} HP`, color: '#4fd07a' });
      return true;
    },
  },
  {
    id: 'overdrive', name: 'Overdrive', cooldown: 18, key: 'KeyX', rarity: 'epic', tags: ['offense', 'special'],
    description: '+80% damage and +40% fire rate for 6 seconds.', icon: { shape: 'flame', color: 0xff5544 },
    activate: (ctx) => {
      ctx.player.meta = ctx.player.meta || {};
      ctx.player.meta.overdrive = 6;
      if (ctx.effects) ctx.effects.screenFlash([255, 80, 60], 0.4);
      bus.emit(Channels.PlaySFX, { name: 'ability', volume: 0.6 });
      bus.emit(Channels.Toast, { text: 'OVERDRIVE!', color: '#ff5544' });
      return true;
    },
  },
  {
    id: 'airstrike', name: 'Airstrike', cooldown: 22, key: 'KeyQ', rarity: 'legendary', tags: ['offense', 'aoe'],
    description: 'Call in a barrage of explosions around you.', icon: { shape: 'blast', color: 0xffb347 },
    activate: (ctx) => {
      const body = ctx.player.get(Body); if (!body) return false;
      const a = ctx.arena;
      let n = 0;
      const interval = setInterval(() => {
        const ang = Math.random() * Math.PI * 2;
        const r = 6 + Math.random() * 10;
        const x = (a ? a.centerX : body.pos.x) + Math.cos(ang) * r;
        const z = (a ? a.centerZ : body.pos.z) + Math.sin(ang) * r;
        const pos = new THREE.Vector3(x, 0.5, z);
        if (ctx.effects) ctx.effects.explosion(pos, 5, 0xffb347, true);
        const enemies = ctx.enemyQuery ? ctx.enemyQuery.array : [];
        for (const e of enemies) { const eb = e.get(Body); if (!eb) continue; if (pos.distanceTo(eb.pos) < 5.5) applyDamage(e, { amount: 70, type: DamageType.Explosive, crit: false, headshot: false, knockback: 10, statusChance: 0, lifesteal: 0, attacker: ctx.player, world: ctx.world, effects: ctx.effects, hitPoint: pos.clone(), source: 'player' }); }
        bus.emit(Channels.PlaySFX, { name: 'explosion', volume: 0.6 });
        n++; if (n >= 8) clearInterval(interval);
      }, 180);
      bus.emit(Channels.Toast, { text: 'AIRSTRIKE INBOUND', color: '#ffb347' });
      return true;
    },
  },
  {
    id: 'sentry', name: 'Sentry Turret', cooldown: 20, key: 'KeyF', rarity: 'epic', tags: ['offense', 'summon'],
    description: 'Deploy an allied turret that fires at nearby enemies for 12s.', icon: { shape: 'turret', color: 0x29e7ff },
    activate: (ctx) => {
      const body = ctx.player.get(Body); if (!body) return false;
      ctx.player.meta = ctx.player.meta || {};
      ctx.player.meta.sentry = { time: 12, pos: body.pos.clone(), cooldown: 0 };
      if (ctx.effects) ctx.effects.flash(body.pos.clone().setY(1), 0x29e7ff, 1.5);
      bus.emit(Channels.PlaySFX, { name: 'ability', volume: 0.5 });
      return true;
    },
  },
]);
