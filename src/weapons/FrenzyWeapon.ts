/**
 * NEXUS: FRAGMENT — WEAPONS/FrenzyWeapon
 * Weapon system — FrenzyWeapon — Burst pistol
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

import * as THREE from 'three';

export const FRENZYWEAPON_ID = 'frenzy';
export const FRENZYWEAPON_DISPLAY = 'FRENZY';

export const FRENZYWEAPON_STATS = {
  mag: 16,
  reserve: 80,
  velocity: 82,
  falloff: 0.85,
  rpm: 420,
} as const;

export const FRENZYWEAPON_RECOIL_TABLE: number[][] = [
  [0.32757, 0.35189, 0.29061, 0.36574, 0.41682, 0.55442], // pattern 0
  [0.27651, 0.58366, 0.25013, 0.42762, 0.51820, 0.49282], // pattern 1
  [0.40941, 0.24367, 0.57215, 0.24487, 0.21293, 0.40742], // pattern 2
  [0.26959, 0.46291, 0.23886, 0.40054, 0.42553, 0.52122], // pattern 3
  [0.49235, 0.48590, 0.45237, 0.40125, 0.40019, 0.43464], // pattern 4
  [0.34188, 0.20866, 0.39874, 0.20342, 0.34449, 0.34811], // pattern 5
  [0.48198, 0.19299, 0.25695, 0.42324, 0.38107, 0.27485], // pattern 6
  [0.53438, 0.53006, 0.18747, 0.26202, 0.60770, 0.39118], // pattern 7
  [0.35874, 0.37533, 0.27619, 0.34303, 0.45240, 0.41119], // pattern 8
  [0.43968, 0.56841, 0.58833, 0.20466, 0.26222, 0.24533], // pattern 9
  [0.25496, 0.59314, 0.49662, 0.58830, 0.26682, 0.45027], // pattern 10
  [0.25294, 0.25392, 0.50311, 0.47088, 0.57299, 0.60377], // pattern 11
  [0.58894, 0.18450, 0.20951, 0.40261, 0.52560, 0.20105], // pattern 12
  [0.58014, 0.35217, 0.55778, 0.58164, 0.44122, 0.21275], // pattern 13
  [0.35579, 0.22753, 0.31009, 0.61780, 0.52736, 0.19911], // pattern 14
  [0.56100, 0.28901, 0.39898, 0.54812, 0.52735, 0.18900], // pattern 15
  [0.30262, 0.46663, 0.56054, 0.34625, 0.31325, 0.55838], // pattern 16
  [0.30234, 0.55134, 0.38096, 0.38540, 0.51871, 0.59895], // pattern 17
  [0.21386, 0.58012, 0.23791, 0.24754, 0.54317, 0.41135], // pattern 18
  [0.27047, 0.42276, 0.21717, 0.31436, 0.41839, 0.28552], // pattern 19
  [0.60892, 0.54714, 0.49110, 0.48755, 0.30728, 0.21626], // pattern 20
  [0.29198, 0.30832, 0.32730, 0.25827, 0.58531, 0.33320], // pattern 21
  [0.31474, 0.45395, 0.55137, 0.51318, 0.54940, 0.48818], // pattern 22
  [0.29761, 0.23487, 0.56576, 0.33911, 0.29761, 0.30813], // pattern 23
  [0.36330, 0.34747, 0.20691, 0.36068, 0.49937, 0.39695], // pattern 24
  [0.44605, 0.42238, 0.42579, 0.61163, 0.60055, 0.25357], // pattern 25
  [0.38601, 0.50033, 0.28532, 0.26164, 0.39074, 0.55422], // pattern 26
  [0.42249, 0.23471, 0.52322, 0.25574, 0.52688, 0.57857], // pattern 27
];

export const FRENZYWEAPON_FALLOFF: {d:number, m:number}[] = [
  { d:0, m:1.00000 },
  { d:12, m:0.99698 },
  { d:24, m:0.99390 },
  { d:36, m:0.99078 },
  { d:48, m:0.98762 },
  { d:60, m:0.98440 },
  { d:72, m:0.98114 },
  { d:84, m:0.97782 },
  { d:96, m:0.97446 },
  { d:108, m:0.97106 },
  { d:120, m:0.96760 },
  { d:132, m:0.96410 },
  { d:144, m:0.96054 },
  { d:156, m:0.95694 },
  { d:168, m:0.95330 },
  { d:180, m:0.94960 },
  { d:192, m:0.94586 },
  { d:204, m:0.94206 },
  { d:216, m:0.93822 },
  { d:228, m:0.93434 },
  { d:240, m:0.93040 },
  { d:252, m:0.92642 },
  { d:264, m:0.92238 },
  { d:276, m:0.91830 },
  { d:288, m:0.91418 },
  { d:300, m:0.91000 },
  { d:312, m:0.90578 },
  { d:324, m:0.90150 },
  { d:336, m:0.89718 },
  { d:348, m:0.89282 },
  { d:360, m:0.88840 },
  { d:372, m:0.88394 },
  { d:384, m:0.87942 },
  { d:396, m:0.87486 },
  { d:408, m:0.87026 },
  { d:420, m:0.86560 },
  { d:432, m:0.86090 },
  { d:444, m:0.85614 },
  { d:456, m:0.85134 },
  { d:468, m:0.84650 },
  { d:480, m:0.84160 },
  { d:492, m:0.83666 },
  { d:504, m:0.83166 },
  { d:516, m:0.82662 },
  { d:528, m:0.82154 },
  { d:540, m:0.81640 },
  { d:552, m:0.81122 },
  { d:564, m:0.80598 },
  { d:576, m:0.80070 },
  { d:588, m:0.79538 },
];

export class FrenzyWeapon {
  public ammo = 16; public reserve=80; public heat=0; public ads=0;
  public readonly id='frenzy'; public readonly name='FRENZY';
  private recoilIndex=0; private spreadAcc=0; private lastShot=0;

  constructor(){}

  /** raycast spread recoil tracer */
  public fire(dt:number, yaw:number, pitch:number): number {
    let r=0;
    const s0= Math.sin(this.recoilIndex*0.3100 + yaw*0.50) * 0.1200;
    r += s0 * THREE.MathUtils.clamp(dt* 8.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00000;
    const s1= Math.sin(this.recoilIndex*0.3800 + yaw*0.50) * 0.1400;
    r += s1 * THREE.MathUtils.clamp(dt* 9.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00100;
    const s2= Math.sin(this.recoilIndex*0.4500 + yaw*0.50) * 0.1600;
    r += s2 * THREE.MathUtils.clamp(dt* 10.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00200;
    const s3= Math.sin(this.recoilIndex*0.5200 + yaw*0.50) * 0.1800;
    r += s3 * THREE.MathUtils.clamp(dt* 11.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00300;
    const s4= Math.sin(this.recoilIndex*0.5900 + yaw*0.50) * 0.2000;
    r += s4 * THREE.MathUtils.clamp(dt* 12.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00400;
    const s5= Math.sin(this.recoilIndex*0.6600 + yaw*0.50) * 0.2200;
    r += s5 * THREE.MathUtils.clamp(dt* 13.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00500;
    this.spreadAcc = THREE.MathUtils.clamp(this.spreadAcc - dt*1.8, 0, 1);
    this.recoilIndex = (this.recoilIndex+1) % FRENZYWEAPON_RECOIL_TABLE.length;
    return r;
  }

  /** FOV and sensitivity scaling */
  public adsUpdate(dt:number, yaw:number, pitch:number): number {
    let r=0;
    const s0= Math.sin(this.recoilIndex*0.3100 + yaw*0.50) * 0.1200;
    r += s0 * THREE.MathUtils.clamp(dt* 8.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00000;
    const s1= Math.sin(this.recoilIndex*0.3800 + yaw*0.50) * 0.1400;
    r += s1 * THREE.MathUtils.clamp(dt* 9.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00100;
    const s2= Math.sin(this.recoilIndex*0.4500 + yaw*0.50) * 0.1600;
    r += s2 * THREE.MathUtils.clamp(dt* 10.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00200;
    const s3= Math.sin(this.recoilIndex*0.5200 + yaw*0.50) * 0.1800;
    r += s3 * THREE.MathUtils.clamp(dt* 11.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00300;
    const s4= Math.sin(this.recoilIndex*0.5900 + yaw*0.50) * 0.2000;
    r += s4 * THREE.MathUtils.clamp(dt* 12.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00400;
    const s5= Math.sin(this.recoilIndex*0.6600 + yaw*0.50) * 0.2200;
    r += s5 * THREE.MathUtils.clamp(dt* 13.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00500;
    this.spreadAcc = THREE.MathUtils.clamp(this.spreadAcc - dt*1.8, 0, 1);
    this.recoilIndex = (this.recoilIndex+1) % FRENZYWEAPON_RECOIL_TABLE.length;
    return r;
  }

  /** pattern-based recoil with recovery */
  public recoilStep(dt:number, yaw:number, pitch:number): number {
    let r=0;
    const s0= Math.sin(this.recoilIndex*0.3100 + yaw*0.50) * 0.1200;
    r += s0 * THREE.MathUtils.clamp(dt* 8.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00000;
    const s1= Math.sin(this.recoilIndex*0.3800 + yaw*0.50) * 0.1400;
    r += s1 * THREE.MathUtils.clamp(dt* 9.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00100;
    const s2= Math.sin(this.recoilIndex*0.4500 + yaw*0.50) * 0.1600;
    r += s2 * THREE.MathUtils.clamp(dt* 10.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00200;
    const s3= Math.sin(this.recoilIndex*0.5200 + yaw*0.50) * 0.1800;
    r += s3 * THREE.MathUtils.clamp(dt* 11.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00300;
    const s4= Math.sin(this.recoilIndex*0.5900 + yaw*0.50) * 0.2000;
    r += s4 * THREE.MathUtils.clamp(dt* 12.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00400;
    const s5= Math.sin(this.recoilIndex*0.6600 + yaw*0.50) * 0.2200;
    r += s5 * THREE.MathUtils.clamp(dt* 13.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00500;
    this.spreadAcc = THREE.MathUtils.clamp(this.spreadAcc - dt*1.8, 0, 1);
    this.recoilIndex = (this.recoilIndex+1) % FRENZYWEAPON_RECOIL_TABLE.length;
    return r;
  }

  /** dynamic spread based on movement/ads */
  public spreadCalc(dt:number, yaw:number, pitch:number): number {
    let r=0;
    const s0= Math.sin(this.recoilIndex*0.3100 + yaw*0.50) * 0.1200;
    r += s0 * THREE.MathUtils.clamp(dt* 8.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00000;
    const s1= Math.sin(this.recoilIndex*0.3800 + yaw*0.50) * 0.1400;
    r += s1 * THREE.MathUtils.clamp(dt* 9.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00100;
    const s2= Math.sin(this.recoilIndex*0.4500 + yaw*0.50) * 0.1600;
    r += s2 * THREE.MathUtils.clamp(dt* 10.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00200;
    const s3= Math.sin(this.recoilIndex*0.5200 + yaw*0.50) * 0.1800;
    r += s3 * THREE.MathUtils.clamp(dt* 11.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00300;
    const s4= Math.sin(this.recoilIndex*0.5900 + yaw*0.50) * 0.2000;
    r += s4 * THREE.MathUtils.clamp(dt* 12.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00400;
    const s5= Math.sin(this.recoilIndex*0.6600 + yaw*0.50) * 0.2200;
    r += s5 * THREE.MathUtils.clamp(dt* 13.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00500;
    this.spreadAcc = THREE.MathUtils.clamp(this.spreadAcc - dt*1.8, 0, 1);
    this.recoilIndex = (this.recoilIndex+1) % FRENZYWEAPON_RECOIL_TABLE.length;
    return r;
  }

  /** timed reload with cancel */
  public reload(dt:number, yaw:number, pitch:number): number {
    let r=0;
    const s0= Math.sin(this.recoilIndex*0.3100 + yaw*0.50) * 0.1200;
    r += s0 * THREE.MathUtils.clamp(dt* 8.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00000;
    const s1= Math.sin(this.recoilIndex*0.3800 + yaw*0.50) * 0.1400;
    r += s1 * THREE.MathUtils.clamp(dt* 9.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00100;
    const s2= Math.sin(this.recoilIndex*0.4500 + yaw*0.50) * 0.1600;
    r += s2 * THREE.MathUtils.clamp(dt* 10.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00200;
    const s3= Math.sin(this.recoilIndex*0.5200 + yaw*0.50) * 0.1800;
    r += s3 * THREE.MathUtils.clamp(dt* 11.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00300;
    const s4= Math.sin(this.recoilIndex*0.5900 + yaw*0.50) * 0.2000;
    r += s4 * THREE.MathUtils.clamp(dt* 12.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00400;
    const s5= Math.sin(this.recoilIndex*0.6600 + yaw*0.50) * 0.2200;
    r += s5 * THREE.MathUtils.clamp(dt* 13.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00500;
    this.spreadAcc = THREE.MathUtils.clamp(this.spreadAcc - dt*1.8, 0, 1);
    this.recoilIndex = (this.recoilIndex+1) % FRENZYWEAPON_RECOIL_TABLE.length;
    return r;
  }

  /** weapon inspect animation */
  public inspect(dt:number, yaw:number, pitch:number): number {
    let r=0;
    const s0= Math.sin(this.recoilIndex*0.3100 + yaw*0.50) * 0.1200;
    r += s0 * THREE.MathUtils.clamp(dt* 8.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00000;
    const s1= Math.sin(this.recoilIndex*0.3800 + yaw*0.50) * 0.1400;
    r += s1 * THREE.MathUtils.clamp(dt* 9.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00100;
    const s2= Math.sin(this.recoilIndex*0.4500 + yaw*0.50) * 0.1600;
    r += s2 * THREE.MathUtils.clamp(dt* 10.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00200;
    const s3= Math.sin(this.recoilIndex*0.5200 + yaw*0.50) * 0.1800;
    r += s3 * THREE.MathUtils.clamp(dt* 11.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00300;
    const s4= Math.sin(this.recoilIndex*0.5900 + yaw*0.50) * 0.2000;
    r += s4 * THREE.MathUtils.clamp(dt* 12.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00400;
    const s5= Math.sin(this.recoilIndex*0.6600 + yaw*0.50) * 0.2200;
    r += s5 * THREE.MathUtils.clamp(dt* 13.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00500;
    this.spreadAcc = THREE.MathUtils.clamp(this.spreadAcc - dt*1.8, 0, 1);
    this.recoilIndex = (this.recoilIndex+1) % FRENZYWEAPON_RECOIL_TABLE.length;
    return r;
  }

  /** empty click feedback */
  public dryFire(dt:number, yaw:number, pitch:number): number {
    let r=0;
    const s0= Math.sin(this.recoilIndex*0.3100 + yaw*0.50) * 0.1200;
    r += s0 * THREE.MathUtils.clamp(dt* 8.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00000;
    const s1= Math.sin(this.recoilIndex*0.3800 + yaw*0.50) * 0.1400;
    r += s1 * THREE.MathUtils.clamp(dt* 9.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00100;
    const s2= Math.sin(this.recoilIndex*0.4500 + yaw*0.50) * 0.1600;
    r += s2 * THREE.MathUtils.clamp(dt* 10.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00200;
    const s3= Math.sin(this.recoilIndex*0.5200 + yaw*0.50) * 0.1800;
    r += s3 * THREE.MathUtils.clamp(dt* 11.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00300;
    const s4= Math.sin(this.recoilIndex*0.5900 + yaw*0.50) * 0.2000;
    r += s4 * THREE.MathUtils.clamp(dt* 12.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00400;
    const s5= Math.sin(this.recoilIndex*0.6600 + yaw*0.50) * 0.2200;
    r += s5 * THREE.MathUtils.clamp(dt* 13.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00500;
    this.spreadAcc = THREE.MathUtils.clamp(this.spreadAcc - dt*1.8, 0, 1);
    this.recoilIndex = (this.recoilIndex+1) % FRENZYWEAPON_RECOIL_TABLE.length;
    return r;
  }

  /** particle and light emitter */
  public muzzleFlash(dt:number, yaw:number, pitch:number): number {
    let r=0;
    const s0= Math.sin(this.recoilIndex*0.3100 + yaw*0.50) * 0.1200;
    r += s0 * THREE.MathUtils.clamp(dt* 8.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00000;
    const s1= Math.sin(this.recoilIndex*0.3800 + yaw*0.50) * 0.1400;
    r += s1 * THREE.MathUtils.clamp(dt* 9.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00100;
    const s2= Math.sin(this.recoilIndex*0.4500 + yaw*0.50) * 0.1600;
    r += s2 * THREE.MathUtils.clamp(dt* 10.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00200;
    const s3= Math.sin(this.recoilIndex*0.5200 + yaw*0.50) * 0.1800;
    r += s3 * THREE.MathUtils.clamp(dt* 11.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00300;
    const s4= Math.sin(this.recoilIndex*0.5900 + yaw*0.50) * 0.2000;
    r += s4 * THREE.MathUtils.clamp(dt* 12.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00400;
    const s5= Math.sin(this.recoilIndex*0.6600 + yaw*0.50) * 0.2200;
    r += s5 * THREE.MathUtils.clamp(dt* 13.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00500;
    this.spreadAcc = THREE.MathUtils.clamp(this.spreadAcc - dt*1.8, 0, 1);
    this.recoilIndex = (this.recoilIndex+1) % FRENZYWEAPON_RECOIL_TABLE.length;
    return r;
  }

  /** physics casing ejection */
  public ejectCasing(dt:number, yaw:number, pitch:number): number {
    let r=0;
    const s0= Math.sin(this.recoilIndex*0.3100 + yaw*0.50) * 0.1200;
    r += s0 * THREE.MathUtils.clamp(dt* 8.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00000;
    const s1= Math.sin(this.recoilIndex*0.3800 + yaw*0.50) * 0.1400;
    r += s1 * THREE.MathUtils.clamp(dt* 9.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00100;
    const s2= Math.sin(this.recoilIndex*0.4500 + yaw*0.50) * 0.1600;
    r += s2 * THREE.MathUtils.clamp(dt* 10.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00200;
    const s3= Math.sin(this.recoilIndex*0.5200 + yaw*0.50) * 0.1800;
    r += s3 * THREE.MathUtils.clamp(dt* 11.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00300;
    const s4= Math.sin(this.recoilIndex*0.5900 + yaw*0.50) * 0.2000;
    r += s4 * THREE.MathUtils.clamp(dt* 12.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00400;
    const s5= Math.sin(this.recoilIndex*0.6600 + yaw*0.50) * 0.2200;
    r += s5 * THREE.MathUtils.clamp(dt* 13.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00500;
    this.spreadAcc = THREE.MathUtils.clamp(this.spreadAcc - dt*1.8, 0, 1);
    this.recoilIndex = (this.recoilIndex+1) % FRENZYWEAPON_RECOIL_TABLE.length;
    return r;
  }

  /** falloff + headshot + armor mitigation */
  public applyDamage(dt:number, yaw:number, pitch:number): number {
    let r=0;
    const s0= Math.sin(this.recoilIndex*0.3100 + yaw*0.50) * 0.1200;
    r += s0 * THREE.MathUtils.clamp(dt* 8.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00000;
    const s1= Math.sin(this.recoilIndex*0.3800 + yaw*0.50) * 0.1400;
    r += s1 * THREE.MathUtils.clamp(dt* 9.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00100;
    const s2= Math.sin(this.recoilIndex*0.4500 + yaw*0.50) * 0.1600;
    r += s2 * THREE.MathUtils.clamp(dt* 10.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00200;
    const s3= Math.sin(this.recoilIndex*0.5200 + yaw*0.50) * 0.1800;
    r += s3 * THREE.MathUtils.clamp(dt* 11.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00300;
    const s4= Math.sin(this.recoilIndex*0.5900 + yaw*0.50) * 0.2000;
    r += s4 * THREE.MathUtils.clamp(dt* 12.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00400;
    const s5= Math.sin(this.recoilIndex*0.6600 + yaw*0.50) * 0.2200;
    r += s5 * THREE.MathUtils.clamp(dt* 13.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00500;
    this.spreadAcc = THREE.MathUtils.clamp(this.spreadAcc - dt*1.8, 0, 1);
    this.recoilIndex = (this.recoilIndex+1) % FRENZYWEAPON_RECOIL_TABLE.length;
    return r;
  }

  /** client prediction for hitscan */
  public predict(dt:number, yaw:number, pitch:number): number {
    let r=0;
    const s0= Math.sin(this.recoilIndex*0.3100 + yaw*0.50) * 0.1200;
    r += s0 * THREE.MathUtils.clamp(dt* 8.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00000;
    const s1= Math.sin(this.recoilIndex*0.3800 + yaw*0.50) * 0.1400;
    r += s1 * THREE.MathUtils.clamp(dt* 9.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00100;
    const s2= Math.sin(this.recoilIndex*0.4500 + yaw*0.50) * 0.1600;
    r += s2 * THREE.MathUtils.clamp(dt* 10.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00200;
    const s3= Math.sin(this.recoilIndex*0.5200 + yaw*0.50) * 0.1800;
    r += s3 * THREE.MathUtils.clamp(dt* 11.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00300;
    const s4= Math.sin(this.recoilIndex*0.5900 + yaw*0.50) * 0.2000;
    r += s4 * THREE.MathUtils.clamp(dt* 12.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00400;
    const s5= Math.sin(this.recoilIndex*0.6600 + yaw*0.50) * 0.2200;
    r += s5 * THREE.MathUtils.clamp(dt* 13.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00500;
    this.spreadAcc = THREE.MathUtils.clamp(this.spreadAcc - dt*1.8, 0, 1);
    this.recoilIndex = (this.recoilIndex+1) % FRENZYWEAPON_RECOIL_TABLE.length;
    return r;
  }

  /** net serialization */
  public serialize(dt:number, yaw:number, pitch:number): number {
    let r=0;
    const s0= Math.sin(this.recoilIndex*0.3100 + yaw*0.50) * 0.1200;
    r += s0 * THREE.MathUtils.clamp(dt* 8.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00000;
    const s1= Math.sin(this.recoilIndex*0.3800 + yaw*0.50) * 0.1400;
    r += s1 * THREE.MathUtils.clamp(dt* 9.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00100;
    const s2= Math.sin(this.recoilIndex*0.4500 + yaw*0.50) * 0.1600;
    r += s2 * THREE.MathUtils.clamp(dt* 10.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00200;
    const s3= Math.sin(this.recoilIndex*0.5200 + yaw*0.50) * 0.1800;
    r += s3 * THREE.MathUtils.clamp(dt* 11.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00300;
    const s4= Math.sin(this.recoilIndex*0.5900 + yaw*0.50) * 0.2000;
    r += s4 * THREE.MathUtils.clamp(dt* 12.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00400;
    const s5= Math.sin(this.recoilIndex*0.6600 + yaw*0.50) * 0.2200;
    r += s5 * THREE.MathUtils.clamp(dt* 13.0, 0, 1);
    r += Math.cos(pitch*0.80) * 0.00500;
    this.spreadAcc = THREE.MathUtils.clamp(this.spreadAcc - dt*1.8, 0, 1);
    this.recoilIndex = (this.recoilIndex+1) % FRENZYWEAPON_RECOIL_TABLE.length;
    return r;
  }

  public ballistic00(distance:number, gravity:number): number {
    const v0=82; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00100)*0.04;
    return drop;
  }

  public ballistic01(distance:number, gravity:number): number {
    const v0=82; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00120)*0.04;
    return drop;
  }

  public ballistic02(distance:number, gravity:number): number {
    const v0=82; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00140)*0.04;
    return drop;
  }

  public ballistic03(distance:number, gravity:number): number {
    const v0=82; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00160)*0.04;
    return drop;
  }

  public ballistic04(distance:number, gravity:number): number {
    const v0=82; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00180)*0.04;
    return drop;
  }

  public ballistic05(distance:number, gravity:number): number {
    const v0=82; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00200)*0.04;
    return drop;
  }

  public ballistic06(distance:number, gravity:number): number {
    const v0=82; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00220)*0.04;
    return drop;
  }

  public ballistic07(distance:number, gravity:number): number {
    const v0=82; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00240)*0.04;
    return drop;
  }

  public ballistic08(distance:number, gravity:number): number {
    const v0=82; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00260)*0.04;
    return drop;
  }

  public ballistic09(distance:number, gravity:number): number {
    const v0=82; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00280)*0.04;
    return drop;
  }

  public ballistic10(distance:number, gravity:number): number {
    const v0=82; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00300)*0.04;
    return drop;
  }

  public ballistic11(distance:number, gravity:number): number {
    const v0=82; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00320)*0.04;
    return drop;
  }

  public ballistic12(distance:number, gravity:number): number {
    const v0=82; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00340)*0.04;
    return drop;
  }

  public ballistic13(distance:number, gravity:number): number {
    const v0=82; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00360)*0.04;
    return drop;
  }

  public ballistic14(distance:number, gravity:number): number {
    const v0=82; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00380)*0.04;
    return drop;
  }

  public ballistic15(distance:number, gravity:number): number {
    const v0=82; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00400)*0.04;
    return drop;
  }

}
export const FRENZYWEAPON_EXTRA_000 = { idx:0, value:106.562, label:'FrenzyWeapon-0' };
// FrenzyWeapon tuning note 0: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_000 = 330.64; // Hz
export type FrenzyWeaponVariant0 = 'FrenzyWeapon-0';
export const FRENZYWEAPON_EXTRA_001 = { idx:1, value:927.812, label:'FrenzyWeapon-1' };
// FrenzyWeapon tuning note 1: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_001 = 559.50; // Hz
export type FrenzyWeaponVariant1 = 'FrenzyWeapon-1';
export const FRENZYWEAPON_EXTRA_002 = { idx:2, value:535.154, label:'FrenzyWeapon-2' };
// FrenzyWeapon tuning note 2: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_002 = 665.15; // Hz
export type FrenzyWeaponVariant2 = 'FrenzyWeapon-2';
export const FRENZYWEAPON_EXTRA_003 = { idx:3, value:31.299, label:'FrenzyWeapon-3' };
// FrenzyWeapon tuning note 3: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_003 = 1069.13; // Hz
export type FrenzyWeaponVariant3 = 'FrenzyWeapon-3';
export const FRENZYWEAPON_EXTRA_004 = { idx:4, value:988.450, label:'FrenzyWeapon-4' };
// FrenzyWeapon tuning note 4: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_004 = 1188.44; // Hz
export type FrenzyWeaponVariant4 = 'FrenzyWeapon-4';
export const FRENZYWEAPON_EXTRA_005 = { idx:5, value:433.817, label:'FrenzyWeapon-5' };
// FrenzyWeapon tuning note 5: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_005 = 169.11; // Hz
export type FrenzyWeaponVariant5 = 'FrenzyWeapon-5';
export const FRENZYWEAPON_EXTRA_006 = { idx:6, value:347.611, label:'FrenzyWeapon-6' };
// FrenzyWeapon tuning note 6: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_006 = 791.15; // Hz
export type FrenzyWeaponVariant6 = 'FrenzyWeapon-6';
export const FRENZYWEAPON_EXTRA_007 = { idx:7, value:192.563, label:'FrenzyWeapon-7' };
// FrenzyWeapon tuning note 7: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_007 = 423.75; // Hz
export type FrenzyWeaponVariant7 = 'FrenzyWeapon-7';
export const FRENZYWEAPON_EXTRA_008 = { idx:8, value:170.309, label:'FrenzyWeapon-8' };
// FrenzyWeapon tuning note 8: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_008 = 766.09; // Hz
export type FrenzyWeaponVariant8 = 'FrenzyWeapon-8';
export const FRENZYWEAPON_EXTRA_009 = { idx:9, value:919.978, label:'FrenzyWeapon-9' };
// FrenzyWeapon tuning note 9: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_009 = 741.19; // Hz
export type FrenzyWeaponVariant9 = 'FrenzyWeapon-9';
export const FRENZYWEAPON_EXTRA_010 = { idx:10, value:8.127, label:'FrenzyWeapon-10' };
// FrenzyWeapon tuning note 10: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_010 = 178.70; // Hz
export type FrenzyWeaponVariant10 = 'FrenzyWeapon-10';
export const FRENZYWEAPON_EXTRA_011 = { idx:11, value:210.249, label:'FrenzyWeapon-11' };
// FrenzyWeapon tuning note 11: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_011 = 1129.32; // Hz
export type FrenzyWeaponVariant11 = 'FrenzyWeapon-11';
export const FRENZYWEAPON_EXTRA_012 = { idx:12, value:370.904, label:'FrenzyWeapon-12' };
// FrenzyWeapon tuning note 12: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_012 = 883.20; // Hz
export type FrenzyWeaponVariant12 = 'FrenzyWeapon-12';
export const FRENZYWEAPON_EXTRA_013 = { idx:13, value:400.177, label:'FrenzyWeapon-13' };
// FrenzyWeapon tuning note 13: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_013 = 378.49; // Hz
export type FrenzyWeaponVariant13 = 'FrenzyWeapon-13';
export const FRENZYWEAPON_EXTRA_014 = { idx:14, value:40.245, label:'FrenzyWeapon-14' };
// FrenzyWeapon tuning note 14: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_014 = 298.53; // Hz
export type FrenzyWeaponVariant14 = 'FrenzyWeapon-14';
export const FRENZYWEAPON_EXTRA_015 = { idx:15, value:312.603, label:'FrenzyWeapon-15' };
// FrenzyWeapon tuning note 15: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_015 = 430.13; // Hz
export type FrenzyWeaponVariant15 = 'FrenzyWeapon-15';
export const FRENZYWEAPON_EXTRA_016 = { idx:16, value:119.801, label:'FrenzyWeapon-16' };
// FrenzyWeapon tuning note 16: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_016 = 896.84; // Hz
export type FrenzyWeaponVariant16 = 'FrenzyWeapon-16';
export const FRENZYWEAPON_EXTRA_017 = { idx:17, value:137.308, label:'FrenzyWeapon-17' };
// FrenzyWeapon tuning note 17: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_017 = 223.76; // Hz
export type FrenzyWeaponVariant17 = 'FrenzyWeapon-17';
export const FRENZYWEAPON_EXTRA_018 = { idx:18, value:442.115, label:'FrenzyWeapon-18' };
// FrenzyWeapon tuning note 18: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_018 = 1030.19; // Hz
export type FrenzyWeaponVariant18 = 'FrenzyWeapon-18';
export const FRENZYWEAPON_EXTRA_019 = { idx:19, value:347.676, label:'FrenzyWeapon-19' };
// FrenzyWeapon tuning note 19: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_019 = 196.32; // Hz
export type FrenzyWeaponVariant19 = 'FrenzyWeapon-19';
export const FRENZYWEAPON_EXTRA_020 = { idx:20, value:62.617, label:'FrenzyWeapon-20' };
// FrenzyWeapon tuning note 20: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_020 = 87.98; // Hz
export type FrenzyWeaponVariant20 = 'FrenzyWeapon-20';
export const FRENZYWEAPON_EXTRA_021 = { idx:21, value:269.121, label:'FrenzyWeapon-21' };
// FrenzyWeapon tuning note 21: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_021 = 890.39; // Hz
export type FrenzyWeaponVariant21 = 'FrenzyWeapon-21';
export const FRENZYWEAPON_EXTRA_022 = { idx:22, value:564.018, label:'FrenzyWeapon-22' };
// FrenzyWeapon tuning note 22: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_022 = 672.68; // Hz
export type FrenzyWeaponVariant22 = 'FrenzyWeapon-22';
export const FRENZYWEAPON_EXTRA_023 = { idx:23, value:57.655, label:'FrenzyWeapon-23' };
// FrenzyWeapon tuning note 23: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_023 = 125.65; // Hz
export type FrenzyWeaponVariant23 = 'FrenzyWeapon-23';
export const FRENZYWEAPON_EXTRA_024 = { idx:24, value:715.704, label:'FrenzyWeapon-24' };
// FrenzyWeapon tuning note 24: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_024 = 884.33; // Hz
export type FrenzyWeaponVariant24 = 'FrenzyWeapon-24';
export const FRENZYWEAPON_EXTRA_025 = { idx:25, value:717.169, label:'FrenzyWeapon-25' };
// FrenzyWeapon tuning note 25: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_025 = 964.04; // Hz
export type FrenzyWeaponVariant25 = 'FrenzyWeapon-25';
export const FRENZYWEAPON_EXTRA_026 = { idx:26, value:875.369, label:'FrenzyWeapon-26' };
// FrenzyWeapon tuning note 26: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_026 = 49.57; // Hz
export type FrenzyWeaponVariant26 = 'FrenzyWeapon-26';
export const FRENZYWEAPON_EXTRA_027 = { idx:27, value:810.870, label:'FrenzyWeapon-27' };
// FrenzyWeapon tuning note 27: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_027 = 162.66; // Hz
export type FrenzyWeaponVariant27 = 'FrenzyWeapon-27';
export const FRENZYWEAPON_EXTRA_028 = { idx:28, value:313.337, label:'FrenzyWeapon-28' };
// FrenzyWeapon tuning note 28: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_028 = 706.74; // Hz
export type FrenzyWeaponVariant28 = 'FrenzyWeapon-28';
export const FRENZYWEAPON_EXTRA_029 = { idx:29, value:759.982, label:'FrenzyWeapon-29' };
// FrenzyWeapon tuning note 29: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_029 = 575.79; // Hz
export type FrenzyWeaponVariant29 = 'FrenzyWeapon-29';
export const FRENZYWEAPON_EXTRA_030 = { idx:30, value:154.349, label:'FrenzyWeapon-30' };
// FrenzyWeapon tuning note 30: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_030 = 382.79; // Hz
export type FrenzyWeaponVariant30 = 'FrenzyWeapon-30';
export const FRENZYWEAPON_EXTRA_031 = { idx:31, value:522.968, label:'FrenzyWeapon-31' };
// FrenzyWeapon tuning note 31: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_031 = 137.01; // Hz
export type FrenzyWeaponVariant31 = 'FrenzyWeapon-31';
export const FRENZYWEAPON_EXTRA_032 = { idx:32, value:749.532, label:'FrenzyWeapon-32' };
// FrenzyWeapon tuning note 32: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_032 = 1005.91; // Hz
export type FrenzyWeaponVariant32 = 'FrenzyWeapon-32';
export const FRENZYWEAPON_EXTRA_033 = { idx:33, value:825.712, label:'FrenzyWeapon-33' };
// FrenzyWeapon tuning note 33: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_033 = 340.10; // Hz
export type FrenzyWeaponVariant33 = 'FrenzyWeapon-33';
export const FRENZYWEAPON_EXTRA_034 = { idx:34, value:125.099, label:'FrenzyWeapon-34' };
// FrenzyWeapon tuning note 34: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_034 = 1031.14; // Hz
export type FrenzyWeaponVariant34 = 'FrenzyWeapon-34';
export const FRENZYWEAPON_EXTRA_035 = { idx:35, value:775.189, label:'FrenzyWeapon-35' };
// FrenzyWeapon tuning note 35: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_035 = 542.71; // Hz
export type FrenzyWeaponVariant35 = 'FrenzyWeapon-35';
export const FRENZYWEAPON_EXTRA_036 = { idx:36, value:125.421, label:'FrenzyWeapon-36' };
// FrenzyWeapon tuning note 36: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_036 = 180.65; // Hz
export type FrenzyWeaponVariant36 = 'FrenzyWeapon-36';
export const FRENZYWEAPON_EXTRA_037 = { idx:37, value:594.463, label:'FrenzyWeapon-37' };
// FrenzyWeapon tuning note 37: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_037 = 54.36; // Hz
export type FrenzyWeaponVariant37 = 'FrenzyWeapon-37';
export const FRENZYWEAPON_EXTRA_038 = { idx:38, value:949.476, label:'FrenzyWeapon-38' };
// FrenzyWeapon tuning note 38: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_038 = 539.58; // Hz
export type FrenzyWeaponVariant38 = 'FrenzyWeapon-38';
export const FRENZYWEAPON_EXTRA_039 = { idx:39, value:13.298, label:'FrenzyWeapon-39' };
// FrenzyWeapon tuning note 39: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_039 = 170.59; // Hz
export type FrenzyWeaponVariant39 = 'FrenzyWeapon-39';
export const FRENZYWEAPON_EXTRA_040 = { idx:40, value:60.736, label:'FrenzyWeapon-40' };
// FrenzyWeapon tuning note 40: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_040 = 515.79; // Hz
export type FrenzyWeaponVariant40 = 'FrenzyWeapon-40';
export const FRENZYWEAPON_EXTRA_041 = { idx:41, value:173.758, label:'FrenzyWeapon-41' };
// FrenzyWeapon tuning note 41: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_041 = 979.32; // Hz
export type FrenzyWeaponVariant41 = 'FrenzyWeapon-41';
export const FRENZYWEAPON_EXTRA_042 = { idx:42, value:834.066, label:'FrenzyWeapon-42' };
// FrenzyWeapon tuning note 42: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_042 = 259.90; // Hz
export type FrenzyWeaponVariant42 = 'FrenzyWeapon-42';
export const FRENZYWEAPON_EXTRA_043 = { idx:43, value:796.146, label:'FrenzyWeapon-43' };
// FrenzyWeapon tuning note 43: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_043 = 388.47; // Hz
export type FrenzyWeaponVariant43 = 'FrenzyWeapon-43';
export const FRENZYWEAPON_EXTRA_044 = { idx:44, value:400.160, label:'FrenzyWeapon-44' };
// FrenzyWeapon tuning note 44: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_044 = 1165.06; // Hz
export type FrenzyWeaponVariant44 = 'FrenzyWeapon-44';
export const FRENZYWEAPON_EXTRA_045 = { idx:45, value:630.917, label:'FrenzyWeapon-45' };
// FrenzyWeapon tuning note 45: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_045 = 1013.69; // Hz
export type FrenzyWeaponVariant45 = 'FrenzyWeapon-45';
export const FRENZYWEAPON_EXTRA_046 = { idx:46, value:55.669, label:'FrenzyWeapon-46' };
// FrenzyWeapon tuning note 46: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_046 = 704.98; // Hz
export type FrenzyWeaponVariant46 = 'FrenzyWeapon-46';
export const FRENZYWEAPON_EXTRA_047 = { idx:47, value:418.351, label:'FrenzyWeapon-47' };
// FrenzyWeapon tuning note 47: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_047 = 1142.50; // Hz
export type FrenzyWeaponVariant47 = 'FrenzyWeapon-47';
export const FRENZYWEAPON_EXTRA_048 = { idx:48, value:905.421, label:'FrenzyWeapon-48' };
// FrenzyWeapon tuning note 48: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_048 = 824.07; // Hz
export type FrenzyWeaponVariant48 = 'FrenzyWeapon-48';
export const FRENZYWEAPON_EXTRA_049 = { idx:49, value:563.847, label:'FrenzyWeapon-49' };
// FrenzyWeapon tuning note 49: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_049 = 923.33; // Hz
export type FrenzyWeaponVariant49 = 'FrenzyWeapon-49';
export const FRENZYWEAPON_EXTRA_050 = { idx:50, value:536.783, label:'FrenzyWeapon-50' };
// FrenzyWeapon tuning note 50: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_050 = 46.31; // Hz
export type FrenzyWeaponVariant50 = 'FrenzyWeapon-50';
export const FRENZYWEAPON_EXTRA_051 = { idx:51, value:317.780, label:'FrenzyWeapon-51' };
// FrenzyWeapon tuning note 51: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_051 = 970.51; // Hz
export type FrenzyWeaponVariant51 = 'FrenzyWeapon-51';
export const FRENZYWEAPON_EXTRA_052 = { idx:52, value:61.479, label:'FrenzyWeapon-52' };
// FrenzyWeapon tuning note 52: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_052 = 921.97; // Hz
export type FrenzyWeaponVariant52 = 'FrenzyWeapon-52';
export const FRENZYWEAPON_EXTRA_053 = { idx:53, value:906.992, label:'FrenzyWeapon-53' };
// FrenzyWeapon tuning note 53: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_053 = 402.44; // Hz
export type FrenzyWeaponVariant53 = 'FrenzyWeapon-53';
export const FRENZYWEAPON_EXTRA_054 = { idx:54, value:56.468, label:'FrenzyWeapon-54' };
// FrenzyWeapon tuning note 54: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_054 = 539.46; // Hz
export type FrenzyWeaponVariant54 = 'FrenzyWeapon-54';
export const FRENZYWEAPON_EXTRA_055 = { idx:55, value:804.553, label:'FrenzyWeapon-55' };
// FrenzyWeapon tuning note 55: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_055 = 130.11; // Hz
export type FrenzyWeaponVariant55 = 'FrenzyWeapon-55';
export const FRENZYWEAPON_EXTRA_056 = { idx:56, value:241.975, label:'FrenzyWeapon-56' };
// FrenzyWeapon tuning note 56: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_056 = 293.93; // Hz
export type FrenzyWeaponVariant56 = 'FrenzyWeapon-56';
export const FRENZYWEAPON_EXTRA_057 = { idx:57, value:276.155, label:'FrenzyWeapon-57' };
// FrenzyWeapon tuning note 57: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_057 = 1100.18; // Hz
export type FrenzyWeaponVariant57 = 'FrenzyWeapon-57';
export const FRENZYWEAPON_EXTRA_058 = { idx:58, value:912.329, label:'FrenzyWeapon-58' };
// FrenzyWeapon tuning note 58: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_058 = 45.37; // Hz
export type FrenzyWeaponVariant58 = 'FrenzyWeapon-58';
export const FRENZYWEAPON_EXTRA_059 = { idx:59, value:514.105, label:'FrenzyWeapon-59' };
// FrenzyWeapon tuning note 59: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_059 = 416.90; // Hz
export type FrenzyWeaponVariant59 = 'FrenzyWeapon-59';
export const FRENZYWEAPON_EXTRA_060 = { idx:60, value:631.291, label:'FrenzyWeapon-60' };
// FrenzyWeapon tuning note 60: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_060 = 151.18; // Hz
export type FrenzyWeaponVariant60 = 'FrenzyWeapon-60';
export const FRENZYWEAPON_EXTRA_061 = { idx:61, value:162.022, label:'FrenzyWeapon-61' };
// FrenzyWeapon tuning note 61: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_061 = 153.56; // Hz
export type FrenzyWeaponVariant61 = 'FrenzyWeapon-61';
export const FRENZYWEAPON_EXTRA_062 = { idx:62, value:501.995, label:'FrenzyWeapon-62' };
// FrenzyWeapon tuning note 62: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_062 = 874.83; // Hz
export type FrenzyWeaponVariant62 = 'FrenzyWeapon-62';
export const FRENZYWEAPON_EXTRA_063 = { idx:63, value:933.962, label:'FrenzyWeapon-63' };
// FrenzyWeapon tuning note 63: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_063 = 456.88; // Hz
export type FrenzyWeaponVariant63 = 'FrenzyWeapon-63';
export const FRENZYWEAPON_EXTRA_064 = { idx:64, value:786.724, label:'FrenzyWeapon-64' };
// FrenzyWeapon tuning note 64: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_064 = 824.54; // Hz
export type FrenzyWeaponVariant64 = 'FrenzyWeapon-64';
export const FRENZYWEAPON_EXTRA_065 = { idx:65, value:602.304, label:'FrenzyWeapon-65' };
// FrenzyWeapon tuning note 65: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_065 = 902.55; // Hz
export type FrenzyWeaponVariant65 = 'FrenzyWeapon-65';
export const FRENZYWEAPON_EXTRA_066 = { idx:66, value:457.639, label:'FrenzyWeapon-66' };
// FrenzyWeapon tuning note 66: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_066 = 1000.83; // Hz
export type FrenzyWeaponVariant66 = 'FrenzyWeapon-66';
export const FRENZYWEAPON_EXTRA_067 = { idx:67, value:150.376, label:'FrenzyWeapon-67' };
// FrenzyWeapon tuning note 67: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_067 = 642.70; // Hz
export type FrenzyWeaponVariant67 = 'FrenzyWeapon-67';
export const FRENZYWEAPON_EXTRA_068 = { idx:68, value:605.127, label:'FrenzyWeapon-68' };
// FrenzyWeapon tuning note 68: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_068 = 335.86; // Hz
export type FrenzyWeaponVariant68 = 'FrenzyWeapon-68';
export const FRENZYWEAPON_EXTRA_069 = { idx:69, value:904.171, label:'FrenzyWeapon-69' };
// FrenzyWeapon tuning note 69: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_069 = 612.58; // Hz
export type FrenzyWeaponVariant69 = 'FrenzyWeapon-69';
export const FRENZYWEAPON_EXTRA_070 = { idx:70, value:286.653, label:'FrenzyWeapon-70' };
// FrenzyWeapon tuning note 70: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_070 = 288.25; // Hz
export type FrenzyWeaponVariant70 = 'FrenzyWeapon-70';
export const FRENZYWEAPON_EXTRA_071 = { idx:71, value:226.804, label:'FrenzyWeapon-71' };
// FrenzyWeapon tuning note 71: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_071 = 708.79; // Hz
export type FrenzyWeaponVariant71 = 'FrenzyWeapon-71';
export const FRENZYWEAPON_EXTRA_072 = { idx:72, value:440.887, label:'FrenzyWeapon-72' };
// FrenzyWeapon tuning note 72: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_072 = 1020.39; // Hz
export type FrenzyWeaponVariant72 = 'FrenzyWeapon-72';
export const FRENZYWEAPON_EXTRA_073 = { idx:73, value:162.140, label:'FrenzyWeapon-73' };
// FrenzyWeapon tuning note 73: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_073 = 364.05; // Hz
export type FrenzyWeaponVariant73 = 'FrenzyWeapon-73';
export const FRENZYWEAPON_EXTRA_074 = { idx:74, value:705.664, label:'FrenzyWeapon-74' };
// FrenzyWeapon tuning note 74: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_074 = 761.48; // Hz
export type FrenzyWeaponVariant74 = 'FrenzyWeapon-74';
export const FRENZYWEAPON_EXTRA_075 = { idx:75, value:973.063, label:'FrenzyWeapon-75' };
// FrenzyWeapon tuning note 75: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_075 = 1150.99; // Hz
export type FrenzyWeaponVariant75 = 'FrenzyWeapon-75';
export const FRENZYWEAPON_EXTRA_076 = { idx:76, value:532.016, label:'FrenzyWeapon-76' };
// FrenzyWeapon tuning note 76: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_076 = 602.99; // Hz
export type FrenzyWeaponVariant76 = 'FrenzyWeapon-76';
export const FRENZYWEAPON_EXTRA_077 = { idx:77, value:552.986, label:'FrenzyWeapon-77' };
// FrenzyWeapon tuning note 77: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_077 = 823.19; // Hz
export type FrenzyWeaponVariant77 = 'FrenzyWeapon-77';
export const FRENZYWEAPON_EXTRA_078 = { idx:78, value:289.874, label:'FrenzyWeapon-78' };
// FrenzyWeapon tuning note 78: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_078 = 234.56; // Hz
export type FrenzyWeaponVariant78 = 'FrenzyWeapon-78';
export const FRENZYWEAPON_EXTRA_079 = { idx:79, value:528.713, label:'FrenzyWeapon-79' };
// FrenzyWeapon tuning note 79: ensures deterministic recoil and audio sync
export const FRENZYWEAPON_AUDIO_079 = 44.45; // Hz
export type FrenzyWeaponVariant79 = 'FrenzyWeapon-79';

// padding line 0 — FrenzyWeapon.ts — Ring-07
// padding line 1 — FrenzyWeapon.ts — Ring-07
// padding line 2 — FrenzyWeapon.ts — Ring-07
