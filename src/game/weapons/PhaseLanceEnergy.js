/**
 * NEXUS VEIL - Weapon System: Phase Lance Energy
 * ID: WPN_0007
 * Type: Experimental Aetherium Ballistics
 * Manufacturer: NEXUS ARMS
 * 
 * Complex internally simulated ballistics with recoil pattern generation,
 * procedural spread, heat management, and modular attachment system.
 */

import * as THREE from 'three';
import { WeaponBase } from './WeaponBase.js';
import { BallisticsSimulator } from '../physics/BallisticsSimulator.js';
import { RecoilPattern } from './RecoilPattern.js';
import { WeaponAudioProfile } from './WeaponAudioProfile.js';

export class PhaseLanceEnergy extends WeaponBase {
  static WeaponName = "Phase Lance Energy";
  static WeaponId = 7;
  static Category = "ENERGY";
  static Rarity = "EPIC";
  static BaseDamage = 79;
  static FireRate = 461;
  static MagazineSize = 50;
  static ReloadTime = 1.90;
  static EffectiveRange = 190;
  static Manufacturer = "NEXUS ARMS";

  constructor() {
    super();
    this.id = 7;
    this.name = "Phase Lance Energy";
    this.displayName = "PHASE LANCE ENERGY";
    this.category = PhaseLanceEnergy.constructor.Category || "ENERGY";
    this.damage = 79;
    this.fireRate = 461;
    this.magazineSize = 50;
    this.currentAmmo = this.magazineSize;
    this.reserveAmmo = this.magazineSize * 6;
    this.reloadTime = 1.90;
    this.effectiveRange = 190;
    this.accuracy = 0.770;
    this.mobility = 0.570;
    this.handling = 0.670;
    
    this.ballistics = new BallisticsSimulator({
      gravity: 9.81,
      dragCoefficient: 0.340,
      muzzleVelocity: 1050,
      projectileMass: 0.0120,
      airDensity: 1.225
    });

    this.recoilPattern = new RecoilPattern({
      verticalBase: 1.20,
      horizontalBase: 0.90,
      patternSeed: 9359,
      recoverySpeed: 12.0,
      cumulativeMultiplier: 1.120
    });

    this.heatSystem = {
      currentHeat: 0,
      maxHeat: 100,
      heatPerShot: 9,
      cooldownRate: 22,
      overheatPenalty: 2.5,
      isOverheated: false
    };

    this.attachments = {
      optic: null,
      barrel: null,
      underbarrel: null,
      stock: null,
      mag: null,
      perk: null
    };

    this.statsModifiers = {
      damage: { base: this.damage, multiplier: 1.0, additive: 0 },
      accuracy: { base: this.accuracy, multiplier: 1.0, additive: 0 },
      range: { base: this.effectiveRange, multiplier: 1.0, additive: 0 },
      fireRate: { base: this.fireRate, multiplier: 1.0, additive: 0 }
    };

    this.firingState = {
      isFiring: false,
      lastFireTime: 0,
      burstCount: 0,
      burstSize: 1,
      fireMode: "BURST",
      triggerHeldTime: 0
    };

    this.visualState = {
      muzzleFlashIntensity: 0,
      barrelSmoke: 0,
      shellEjectionTimer: 0,
      slidePosition: 0,
      boltPosition: 0
    };

    this.audioProfile = new WeaponAudioProfile({
      weaponId: 7,
      baseFrequency: 115,
      tailLength: 0.6499999999999999,
      reverbMix: 0.4
    });

    this.weaponSway = {
      amplitude: new THREE.Vector2(0.004, 0.005),
      frequency: new THREE.Vector2(1.5, 1.9),
      phase: Math.random() * Math.PI * 2,
      adsMultiplier: 0.3
    };

    this.proceduralAnimations = this.generateProceduralAnimations(7);
    this.ballisticHistory = [];
    this.hitMarkers = [];
  }

  generateProceduralAnimations(seed) {
    const anims = {};
    const animationNames = ['idle','walk','sprint','ads_idle','ads_walk','fire','fire_ads','reload_empty','reload_tactical','inspect','melee','equip','unequip','sprint_to_fire'];
    for (const animName of animationNames) {
      anims[animName] = {
        duration: 0.5 + Math.random()*1.5,
        keyframes: this.generateKeyframes(animName, seed),
        easing: ['easeInOutQuad','easeOutCubic','easeInOutSine','spring'][Math.floor(Math.random()*4)],
        loop: animName.includes('idle') || animName.includes('walk') || animName.includes('sprint'),
        additive: animName.includes('sway') || animName.includes('breath')
      };
    }
    return anims;
  }

  generateKeyframes(animName, seed) {
    const kfs = [];
    const count = animName.includes('idle') ? 8 : 4;
    for (let i=0;i<count;i++) {
      const t = i/(count-1);
      kfs.push({
        time: t,
        position: new THREE.Vector3(
          Math.sin(t*Math.PI*2 + seed)*0.01,
          Math.cos(t*Math.PI*1.5 + seed*0.7)*0.005,
          Math.sin(t*Math.PI + seed*0.3)*0.008
        ),
        rotation: new THREE.Euler(
          Math.sin(t*Math.PI + seed)*0.02,
          Math.cos(t*Math.PI*0.5 + seed)*0.03,
          Math.sin(t*Math.PI*0.7 + seed)*0.01
        ),
        fovShift: Math.sin(t*Math.PI*2)*0.5
      });
    }
    return kfs;
  }

  canFire(currentTime) {
    const interval = 60000 / this.getEffectiveFireRate();
    const timeSinceLastFire = currentTime - this.firingState.lastFireTime;
    return timeSinceLastFire >= interval && 
           this.currentAmmo > 0 && 
           !this.heatSystem.isOverheated &&
           !this.isReloading;
  }

  getEffectiveFireRate() {
    return this.statsModifiers.fireRate.base * this.statsModifiers.fireRate.multiplier + this.statsModifiers.fireRate.additive;
  }

  getEffectiveDamage(distance) {
    const range = this.getEffectiveRange();
    let falloff = 1.0;
    if (distance > range * 0.6) {
      const falloffStart = range * 0.6;
      const falloffEnd = range * 1.5;
      const t = Math.min(1, (distance - falloffStart)/(falloffEnd - falloffStart));
      falloff = 1 - t * 0.6;
      falloff = Math.max(0.35, falloff);
    }
    return this.getEffectiveDamageBase() * falloff;
  }

  getEffectiveDamageBase() {
    return this.statsModifiers.damage.base * this.statsModifiers.damage.multiplier + this.statsModifiers.damage.additive;
  }

  getEffectiveRange() {
    return this.statsModifiers.range.base * this.statsModifiers.range.multiplier + this.statsModifiers.range.additive;
  }

  fire(origin, direction, currentTime, playerVelocity) {
    if (!this.canFire(currentTime)) return null;

    this.currentAmmo--;
    this.firingState.lastFireTime = currentTime;
    this.firingState.burstCount++;
    
    this.heatSystem.currentHeat += this.heatSystem.heatPerShot;
    if (this.heatSystem.currentHeat >= this.heatSystem.maxHeat) {
      this.heatSystem.isOverheated = true;
    }

    const recoil = this.recoilPattern.sample(this.firingState.burstCount);
    const spread = this.calculateSpread(playerVelocity);
    const finalDirection = this.applySpread(direction.clone(), spread);
    
    const projectile = this.ballistics.createProjectile({
      origin: origin.clone(),
      direction: finalDirection,
      timestamp: currentTime,
      damage: this.getEffectiveDamageBase(),
      penetration: 4,
      weaponId: this.id
    });

    this.visualState.muzzleFlashIntensity = 1.0;
    this.visualState.shellEjectionTimer = 0.1;

    const audioEvent = this.audioProfile.generateFireEvent({
      position: origin,
      ammoRatio: this.currentAmmo / this.magazineSize,
      isSuppressed: !!this.attachments.barrel?.suppressed
    });

    this.ballisticHistory.push({
      time: currentTime,
      origin: origin.clone(),
      direction: finalDirection.clone(),
      recoil: recoil.clone(),
      spread
    });

    if (this.ballisticHistory.length > 100) this.ballisticHistory.shift();

    return {
      projectile,
      recoil,
      spread,
      audioEvent,
      visualEffects: this.generateMuzzleEffects(origin, finalDirection)
    };
  }

  calculateSpread(playerVelocity) {
    let baseSpread = 1 - this.accuracy;
    const vel = playerVelocity.length();
    if (vel > 0.5) baseSpread += vel * 0.01;
    if (this.isADS) baseSpread *= 0.25;
    if (this.isSliding) baseSpread *= 1.8;
    if (this.isAirborne) baseSpread *= 2.2;
    baseSpread += this.firingState.burstCount * 0.015 * (1 - this.handling*0.5);
    return Math.min(baseSpread, 0.15);
  }

  applySpread(dir, spread) {
    const right = new THREE.Vector3(1,0,0).cross(dir).normalize();
    if (right.lengthSq() < 0.001) right.set(0,0,1);
    const up = dir.clone().cross(right).normalize();
    const angle = Math.random()*Math.PI*2;
    const radius = Math.random()*spread;
    const offset = right.multiplyScalar(Math.cos(angle)*radius).add(up.multiplyScalar(Math.sin(angle)*radius));
    return dir.clone().add(offset).normalize();
  }

  generateMuzzleEffects(origin, direction) {
    return {
      flash: {
        position: origin.clone().add(direction.clone().multiplyScalar(0.8)),
        scale: 0.3 + Math.random()*0.4,
        color: new THREE.Color().setHSL(0.1, 0.8, 0.6),
        duration: 0.05
      },
      smoke: {
        count: 2,
        velocity: direction.clone().multiplyScalar(2).add(new THREE.Vector3((Math.random()-0.5)*0.5, Math.random()*0.5, (Math.random()-0.5)*0.5)),
        lifetime: 0.8 + Math.random()*0.6
      },
      shell: {
        position: origin.clone().add(new THREE.Vector3(0.2, -0.1, 0.3)),
        velocity: new THREE.Vector3(0.7, 0.4, 0.24012310861495378),
        angularVelocity: new THREE.Vector3(Math.random()*10, Math.random()*10, Math.random()*10),
        casingType: "steel"
      }
    };
  }

  reload(isEmpty) {
    if (this.currentAmmo === this.magazineSize) return false;
    if (this.reserveAmmo <= 0) return false;
    this.isReloading = true;
    this.reloadStartTime = performance.now();
    this.reloadDuration = isEmpty ? this.reloadTime * 1.25 : this.reloadTime;
    this.pendingReload = {
      isEmpty,
      startAmmo: this.currentAmmo
    };
    return true;
  }

  updateReload(currentTime) {
    if (!this.isReloading) return false;
    const elapsed = (currentTime - this.reloadStartTime)/1000;
    if (elapsed >= this.reloadDuration) {
      const needed = this.magazineSize - this.currentAmmo;
      const toLoad = Math.min(needed, this.reserveAmmo);
      this.currentAmmo += toLoad;
      this.reserveAmmo -= toLoad;
      this.isReloading = false;
      this.firingState.burstCount = 0;
      this.heatSystem.currentHeat = Math.max(0, this.heatSystem.currentHeat - 30);
      return true;
    }
    return false;
  }

  update(deltaTime, currentTime) {
    if (this.heatSystem.currentHeat > 0) {
      this.heatSystem.currentHeat -= this.heatSystem.cooldownRate * deltaTime;
      if (this.heatSystem.currentHeat <= 0) {
        this.heatSystem.currentHeat = 0;
        this.heatSystem.isOverheated = false;
      }
      if (this.heatSystem.isOverheated && this.heatSystem.currentHeat < this.heatSystem.maxHeat * 0.5) {
        this.heatSystem.isOverheated = false;
      }
    }

    if (this.visualState.muzzleFlashIntensity > 0) {
      this.visualState.muzzleFlashIntensity -= deltaTime * 15;
    }
    if (this.visualState.shellEjectionTimer > 0) {
      this.visualState.shellEjectionTimer -= deltaTime;
    }

    this.updateReload(currentTime);
    this.recoilPattern.update(deltaTime, this.firingState.isFiring);
  }

  attach(mod) {
    if (!mod || !mod.slot) return false;
    this.attachments[mod.slot] = mod;
    this.recalculateStats();
    return true;
  }

  recalculateStats() {
    for (const key in this.statsModifiers) {
      this.statsModifiers[key].multiplier = 1.0;
      this.statsModifiers[key].additive = 0;
    }
    for (const slot in this.attachments) {
      const att = this.attachments[slot];
      if (!att || !att.modifiers) continue;
      for (const stat in att.modifiers) {
        if (this.statsModifiers[stat]) {
          if (att.modifiers[stat].multiplier) this.statsModifiers[stat].multiplier *= att.modifiers[stat].multiplier;
          if (att.modifiers[stat].additive) this.statsModifiers[stat].additive += att.modifiers[stat].additive;
        }
      }
    }
  }

  getCrosshairData() {
    const spread = this.calculateSpread(new THREE.Vector3());
    const recoilOffset = this.recoilPattern.getCurrentOffset();
    return {
      spread: spread * 800,
      recoilX: recoilOffset.x * 40,
      recoilY: recoilOffset.y * 40,
      hitMarker: this.hitMarkers.length > 0 ? this.hitMarkers[0] : null
    };
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      ammo: { current: this.currentAmmo, reserve: this.reserveAmmo },
      attachments: this.attachments,
      heat: this.heatSystem.currentHeat,
      stats: this.statsModifiers
    };
  }

  deserialize(data) {
    this.currentAmmo = data.ammo.current;
    this.reserveAmmo = data.ammo.reserve;
    this.attachments = data.attachments;
    this.heatSystem.currentHeat = data.heat;
    this.statsModifiers = data.stats;
  }
}
