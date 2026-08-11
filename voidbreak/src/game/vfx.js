/**
 * VOIDBREAK — VFX manager.
 *
 * Translates gameplay events into visuals: particles, decals, tracers,
 * lights, camera shakes and impact feedback. Subscribes to the world bus so
 * combat code stays clean.
 */

import { Vec3 } from '../core/vec3.js';
import { playSfx } from '../audio/sfx.js';

export class VFX {
  /**
   * @param {object} game the Game
   */
  constructor(game) {
    this.game = game;
    this.bus = game.bus;
    this.particles = game.renderer.particles;
    this.decals = game.renderer.decals;
    this.tracers = game.renderer.tracers;
    this.lights = game.lights;
    this.cameraRig = game.cameraRig;
    this._register();
  }

  _register() {
    const bus = this.bus;

    bus.on('fx.projectile_trail', (e) => {
      this._glow(e.x, e.y, e.z, e.color ?? '#ffd166', e.size ?? 0.5, 0.14);
    });
    bus.on('fx.explosion', (e) => {
      this.explosion(e.x, e.y, e.z, e.radius ?? 4, e.color ?? '#ffb000', e.intensity ?? 1);
    });
    bus.on('fx.shockwave', (e) => {
      this.shockwave(e.x, e.y, e.z, e.radius ?? 5, e.color ?? '#ff5d5d');
    });
    bus.on('fx.impact_world', (e) => {
      this.impactWorld(e.x, e.y, e.z, e.normal, e.element);
    });
    bus.on('fx.impact_player', (e) => {
      this.impactAt(e.x, e.y, e.z, '#ff5d5d', 6, 0.3);
      playSfx('hit.player', { x: e.x, y: e.y, z: e.z, vol: 0.5 });
    });
    bus.on('fx.enemy_tracer', (e) => {
      this.tracers.add({ x1: e.x1, y1: e.y1, z1: e.z1, x2: e.x2, y2: e.y2, z2: e.z2, color: hexToRgb(e.color), width: 2, life: 0.09 });
    });
    bus.on('fx.beam', (e) => {
      this.tracers.add({ x1: e.x1, y1: e.y1, z1: e.z1, x2: e.x2, y2: e.y2, z2: e.z2, color: hexToRgb(e.color), width: 4, life: 0.07 });
      this._glow(e.x1, e.y1, e.z1, e.color, 1.2, 0.08);
    });
    bus.on('fx.muzzle', (e) => {
      this.muzzleFlash(e.x, e.y, e.z, e.color ?? '#ffd166');
    });
    bus.on('fx.melee_windup', (e) => {
      this._glow(e.x, e.y, e.z, '#ffd166', 1.0, 0.12);
    });
    bus.on('fx.summon_ritual', (e) => {
      this.summonRitual(e.x, e.y, e.z, e.color ?? '#c07dff');
    });
    bus.on('fx.enemy_spawn', (e) => {
      this.enemySpawn(e.x, e.y, e.z, e.color ?? '#6ad8ff');
    });
    bus.on('fx.shield_hit', (e) => {
      this.impactAt(e.x, e.y, e.z, '#6a9aff', 4, 0.2);
    });
    bus.on('fx.shield_break', (e) => {
      this.shockwave(e.x, e.y, e.z, 2, '#6a9aff');
      playSfx('hit.shield', { x: e.x, y: e.y, z: e.z, vol: 0.4 });
    });
    bus.on('fx.trail', (e) => {
      this._glow(e.x, e.y, e.z, e.color ?? '#ff5d5d', 1.0, 0.1);
    });
    bus.on('fx.projectile_hit', (e) => {
      this.impactAt(e.x, e.y, e.z, elementColor(e.element), 8, 0.35);
    });
    bus.on('fx.projectile_expire', (e) => {
      this._glow(e.x, e.y, e.z, elementColor(e.element), 1.0, 0.15);
    });

    bus.on('cam.shake', (e) => {
      this.game.cameraRig?.addShake(e.amount ?? 0.3, e.duration ?? 0.3);
    });
    bus.on('enemy.death', (e) => {
      this.enemyDeath(e);
    });
  }

  // ------------------------------------------------------------ primitives

  _glow(x, y, z, color, size, life = 0.2) {
    const c = typeof color === 'string' ? hexToRgb(color) : color;
    this.particles.burst({
      x, y, z,
      count: 1,
      speed: 0.2,
      spread: 0,
      life,
      size: size ?? 0.5,
      sizeEnd: size ? size * 2 : 1,
      color: [c[0], c[1], c[2], 0.9],
      colorEnd: [c[0], c[1], c[2], 0],
      texture: 'glow',
      blend: 'add',
      dirX: 0, dirY: 1, dirZ: 0,
    });
  }

  impactAt(x, y, z, color, count = 6, power = 0.4) {
    const c = typeof color === 'string' ? hexToRgb(color) : color;
    this.particles.burst({
      x, y, z,
      count,
      speed: 2 + power * 6,
      spread: 0.9,
      life: 0.3 + Math.random() * 0.2,
      size: 0.08,
      sizeEnd: 0.02,
      color: [c[0], c[1], c[2], 1],
      colorEnd: [c[0], c[1], c[2], 0.2],
      gravity: 8,
      texture: 'spark',
      blend: 'add',
      dirX: 0, dirY: 1, dirZ: 0,
    });
  }

  impactWorld(x, y, z, normal, element) {
    const c = elementColor(element);
    this.impactAt(x, y, z, c, 5, 0.3);
    if (normal && normal.y > 0.7) {
      this.decals.add({
        x, y, z,
        nx: 0, ny: 1, nz: 0,
        size: 0.5 + Math.random() * 0.4,
        rot: Math.random() * Math.PI,
        color: [0, 0, 0, 0.5],
        texture: 'scorch',
        life: 30,
      });
    } else if (normal) {
      this.decals.add({
        x, y, z,
        nx: normal.x, ny: normal.y, nz: normal.z,
        size: 0.3,
        rot: Math.random() * Math.PI,
        color: [c[0] * 0.3, c[1] * 0.3, c[2] * 0.3, 0.4],
        texture: 'scorch',
        life: 15,
      });
    }
  }

  muzzleFlash(x, y, z, color) {
    const c = typeof color === 'string' ? hexToRgb(color) : color;
    this._glow(x, y, z, color, 0.6, 0.06);
    this.particles.burst({
      x, y, z,
      count: 3,
      speed: 1.2,
      spread: 0.5,
      life: 0.08,
      size: 0.12,
      sizeEnd: 0.02,
      color: [c[0], c[1], c[2], 1],
      colorEnd: [1, 1, 1, 0],
      texture: 'spark',
      blend: 'add',
      dirX: 0, dirY: 0.3, dirZ: -1,
    });
    this.lights.spawnPointLight({
      position: new Vec3(x, y, z),
      color: { r: c[0], g: c[1], b: c[2] },
      range: 6,
      intensity: 1.6,
      life: 0.07,
    });
  }

  explosion(x, y, z, radius, color, intensity = 1) {
    const c = typeof color === 'string' ? hexToRgb(color) : color;
    const n = Math.round(12 + radius * 4);
    this.particles.burst({
      x, y, z,
      count: n,
      speed: 5 + radius * 2.2,
      spread: 1,
      life: 0.5 + radius * 0.08,
      size: 0.5,
      sizeEnd: 0.08,
      color: [c[0], c[1], c[2], 1],
      colorEnd: [c[0] * 0.3, c[1] * 0.3, c[2] * 0.3, 0],
      gravity: 6,
      texture: 'spark',
      blend: 'add',
      dirX: 0, dirY: 1, dirZ: 0,
    });
    this.particles.burst({
      x, y, z,
      count: Math.round(n * 0.4),
      speed: 2 + radius * 0.6,
      spread: 1,
      life: 1.2 + radius * 0.15,
      size: 0.6,
      sizeEnd: 1.6,
      color: [0.25, 0.25, 0.3, 0.5],
      colorEnd: [0.1, 0.1, 0.12, 0],
      texture: 'smoke',
      blend: 'alpha',
      dirX: 0, dirY: 1, dirZ: 0,
    });
    this._glow(x, y, z, color, radius * 0.9, 0.12);
    this.shockwave(x, y, z, radius * 1.2, color);
    this.lights.spawnPointLight({
      position: new Vec3(x, y, z),
      color: { r: c[0], g: c[1], b: c[2] },
      range: radius * 2.4,
      intensity: 2.4 * intensity,
      life: 0.25,
    });
    this.decals.add({
      x, y: 0.02, z,
      nx: 0, ny: 1, nz: 0,
      size: radius * 0.6,
      rot: Math.random() * Math.PI,
      color: [0, 0, 0, 0.6],
      texture: 'scorch',
      life: 40,
    });
    this.game.cameraRig?.addShake(Math.min(1, radius / 8) * intensity, 0.35);
  }

  shockwave(x, y, z, radius, color) {
    const c = typeof color === 'string' ? hexToRgb(color) : color;
    this.particles.burst({
      x, y, z,
      count: 1,
      speed: 0,
      spread: 0,
      life: 0.4,
      size: 0.3,
      sizeEnd: radius,
      color: [c[0], c[1], c[2], 0.9],
      colorEnd: [c[0], c[1], c[2], 0],
      texture: 'ring',
      blend: 'add',
      dirX: 0, dirY: 1, dirZ: 0,
      grounded: true,
    });
  }

  summonRitual(x, y, z, color) {
    const c = typeof color === 'string' ? hexToRgb(color) : color;
    for (let i = 0; i < 12; i++) {
      this.particles.burst({
        x: x + (Math.random() - 0.5) * 1.6,
        y,
        z: z + (Math.random() - 0.5) * 1.6,
        count: 1,
        speed: 2,
        spread: 1,
        life: 0.8,
        size: 0.25,
        sizeEnd: 0.05,
        color: [c[0], c[1], c[2], 0.9],
        colorEnd: [c[0], c[1], c[2], 0],
        texture: 'spark',
        blend: 'add',
        dirX: 0, dirY: 1, dirZ: 0,
      });
    }
    this.shockwave(x, y, z, 2.5, color);
    this.lights.spawnPointLight({
      position: new Vec3(x, y, z),
      color: { r: c[0], g: c[1], b: c[2] },
      range: 7,
      intensity: 1.5,
      life: 0.6,
    });
  }

  enemySpawn(x, y, z, color) {
    this.shockwave(x, y, z, 2, color);
    this.particles.burst({
      x, y, z,
      count: 10,
      speed: 3,
      spread: 1,
      life: 0.5,
      size: 0.15,
      sizeEnd: 0.02,
      color: hexToRgb(color).concat(1),
      colorEnd: hexToRgb(color).concat(0),
      texture: 'spark',
      blend: 'add',
      dirX: 0, dirY: 1, dirZ: 0,
    });
    playSfx('enemy.spawn', { x, y, z, vol: 0.3 });
  }

  enemyDeath(e) {
    const c = hexToRgb(e.element === 'void' ? '#c07dff' : e.element === 'plasma' ? '#a8ff5a' : e.element === 'energy' ? '#6ad8ff' : '#8a6aff');
    this.particles.burst({
      x: e.x, y: e.y, z: e.z,
      count: 10 + (e.boss ? 40 : 0),
      speed: 2.5 + (e.boss ? 3 : 0),
      spread: 1,
      life: 0.5,
      size: 0.12,
      sizeEnd: 0.02,
      color: [c[0], c[1], c[2], 1],
      colorEnd: [c[0], c[1], c[2], 0],
      texture: 'spark',
      blend: 'add',
      dirX: 0, dirY: 1, dirZ: 0,
    });
    this.shockwave(e.x, e.y, e.z, e.boss ? 5 : 1.6, `rgb(${c[0] * 255 | 0},${c[1] * 255 | 0},${c[2] * 255 | 0})`);
    this.decals.add({
      x: e.x, y: 0.02, z: e.z,
      nx: 0, ny: 1, nz: 0,
      size: e.boss ? 2.4 : 0.6,
      rot: Math.random() * Math.PI,
      color: [c[0] * 0.4, c[1] * 0.4, c[2] * 0.4, 0.35],
      texture: 'splat',
      life: 60,
    });
    if (e.boss) {
      this.lights.spawnPointLight({
        position: new Vec3(e.x, e.y, e.z),
        color: { r: c[0], g: c[1], b: c[2] },
        range: 12,
        intensity: 2,
        life: 0.5,
      });
    }
  }

  /** Continuous beam visual for the player's beam weapons. */
  playerBeam(x1, y1, z1, x2, y2, z2, color, width = 4) {
    this.tracers.add({ x1, y1, z1, x2, y2, z2, color: hexToRgb(color), width, life: 0.05 });
  }
}

function hexToRgb(hex) {
  if (Array.isArray(hex)) return [hex[0], hex[1], hex[2]];
  if (typeof hex !== 'string') return [1, 1, 1];
  const m = hex.match(/[0-9a-f]{2}/gi);
  if (m && m.length >= 3) {
    return [parseInt(m[0], 16) / 255, parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255];
  }
  return [1, 1, 1];
}

function elementColor(element) {
  switch (element) {
    case 'burn': return '#ff7a3d';
    case 'shock': return '#ffe14d';
    case 'cryo': return '#7df0ff';
    case 'plasma': return '#b26bff';
    case 'void': return '#c07dff';
    case 'energy': return '#6aa8ff';
    default: return '#ffe9a8';
  }
}
