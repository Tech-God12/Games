/**
 * NEXUS: FRAGMENT — WEAPONS/PhantomWeapon
 * Weapon system — PhantomWeapon — High-cycle SMG
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

import * as THREE from 'three';

export const PHANTOMWEAPON_ID = 'phantom';
export const PHANTOMWEAPON_DISPLAY = 'X-9 PHANTOM';

export const PHANTOMWEAPON_STATS = {
  mag: 32,
  reserve: 160,
  velocity: 88,
  falloff: 0.88,
  rpm: 780,
} as const;

export const PHANTOMWEAPON_RECOIL_TABLE: number[][] = [
  [0.50123, 0.18340, 0.21420, 0.51406, 0.45345, 0.33386], // pattern 0
  [0.23702, 0.42627, 0.55129, 0.25326, 0.42903, 0.35372], // pattern 1
  [0.57765, 0.18483, 0.25037, 0.34080, 0.41325, 0.50088], // pattern 2
  [0.52272, 0.60134, 0.45733, 0.52046, 0.40652, 0.51045], // pattern 3
  [0.29709, 0.26013, 0.27169, 0.33555, 0.61739, 0.32064], // pattern 4
  [0.57530, 0.20753, 0.42229, 0.39321, 0.48668, 0.43100], // pattern 5
  [0.40064, 0.19963, 0.36114, 0.29990, 0.21192, 0.34316], // pattern 6
  [0.20305, 0.29970, 0.51227, 0.22306, 0.44610, 0.45362], // pattern 7
  [0.18582, 0.45385, 0.41830, 0.49471, 0.22129, 0.57940], // pattern 8
  [0.51427, 0.29002, 0.22413, 0.60304, 0.41261, 0.52241], // pattern 9
  [0.54440, 0.19395, 0.19276, 0.30043, 0.19491, 0.46499], // pattern 10
  [0.29193, 0.26225, 0.57929, 0.47238, 0.25719, 0.27351], // pattern 11
  [0.24619, 0.57388, 0.46541, 0.19740, 0.39174, 0.53462], // pattern 12
  [0.34552, 0.52029, 0.60433, 0.61346, 0.57325, 0.61979], // pattern 13
  [0.54092, 0.56364, 0.36575, 0.54484, 0.40516, 0.22045], // pattern 14
  [0.59176, 0.60235, 0.57351, 0.56930, 0.36892, 0.30182], // pattern 15
  [0.21979, 0.18154, 0.23539, 0.19752, 0.47669, 0.42245], // pattern 16
  [0.54233, 0.47750, 0.43730, 0.48616, 0.55587, 0.45360], // pattern 17
  [0.22844, 0.20408, 0.53681, 0.47440, 0.36999, 0.44051], // pattern 18
  [0.42686, 0.51929, 0.35146, 0.33386, 0.40124, 0.37974], // pattern 19
  [0.21709, 0.32975, 0.46672, 0.55005, 0.59415, 0.28693], // pattern 20
  [0.61064, 0.41871, 0.21285, 0.51418, 0.33110, 0.19616], // pattern 21
  [0.40681, 0.32780, 0.42032, 0.61816, 0.52863, 0.51809], // pattern 22
  [0.43099, 0.32551, 0.32364, 0.41218, 0.37790, 0.26856], // pattern 23
  [0.45434, 0.19965, 0.38231, 0.42546, 0.50179, 0.58585], // pattern 24
  [0.26431, 0.40930, 0.24334, 0.46136, 0.23289, 0.49526], // pattern 25
  [0.45659, 0.19021, 0.34256, 0.50530, 0.54569, 0.30935], // pattern 26
  [0.23364, 0.27998, 0.27788, 0.19376, 0.27388, 0.18975], // pattern 27
];

export const PHANTOMWEAPON_FALLOFF: {d:number, m:number}[] = [
  { d:0, m:1.00000 },
  { d:12, m:0.99758 },
  { d:24, m:0.99510 },
  { d:36, m:0.99258 },
  { d:48, m:0.99002 },
  { d:60, m:0.98740 },
  { d:72, m:0.98474 },
  { d:84, m:0.98202 },
  { d:96, m:0.97926 },
  { d:108, m:0.97646 },
  { d:120, m:0.97360 },
  { d:132, m:0.97070 },
  { d:144, m:0.96774 },
  { d:156, m:0.96474 },
  { d:168, m:0.96170 },
  { d:180, m:0.95860 },
  { d:192, m:0.95546 },
  { d:204, m:0.95226 },
  { d:216, m:0.94902 },
  { d:228, m:0.94574 },
  { d:240, m:0.94240 },
  { d:252, m:0.93902 },
  { d:264, m:0.93558 },
  { d:276, m:0.93210 },
  { d:288, m:0.92858 },
  { d:300, m:0.92500 },
  { d:312, m:0.92138 },
  { d:324, m:0.91770 },
  { d:336, m:0.91398 },
  { d:348, m:0.91022 },
  { d:360, m:0.90640 },
  { d:372, m:0.90254 },
  { d:384, m:0.89862 },
  { d:396, m:0.89466 },
  { d:408, m:0.89066 },
  { d:420, m:0.88660 },
  { d:432, m:0.88250 },
  { d:444, m:0.87834 },
  { d:456, m:0.87414 },
  { d:468, m:0.86990 },
  { d:480, m:0.86560 },
  { d:492, m:0.86126 },
  { d:504, m:0.85686 },
  { d:516, m:0.85242 },
  { d:528, m:0.84794 },
  { d:540, m:0.84340 },
  { d:552, m:0.83882 },
  { d:564, m:0.83418 },
  { d:576, m:0.82950 },
  { d:588, m:0.82478 },
];

export class PhantomWeapon {
  public ammo = 32; public reserve=160; public heat=0; public ads=0;
  public readonly id='phantom'; public readonly name='X-9 PHANTOM';
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
    this.recoilIndex = (this.recoilIndex+1) % PHANTOMWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % PHANTOMWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % PHANTOMWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % PHANTOMWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % PHANTOMWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % PHANTOMWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % PHANTOMWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % PHANTOMWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % PHANTOMWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % PHANTOMWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % PHANTOMWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % PHANTOMWEAPON_RECOIL_TABLE.length;
    return r;
  }

  public ballistic00(distance:number, gravity:number): number {
    const v0=88; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00100)*0.04;
    return drop;
  }

  public ballistic01(distance:number, gravity:number): number {
    const v0=88; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00120)*0.04;
    return drop;
  }

  public ballistic02(distance:number, gravity:number): number {
    const v0=88; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00140)*0.04;
    return drop;
  }

  public ballistic03(distance:number, gravity:number): number {
    const v0=88; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00160)*0.04;
    return drop;
  }

  public ballistic04(distance:number, gravity:number): number {
    const v0=88; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00180)*0.04;
    return drop;
  }

  public ballistic05(distance:number, gravity:number): number {
    const v0=88; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00200)*0.04;
    return drop;
  }

  public ballistic06(distance:number, gravity:number): number {
    const v0=88; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00220)*0.04;
    return drop;
  }

  public ballistic07(distance:number, gravity:number): number {
    const v0=88; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00240)*0.04;
    return drop;
  }

  public ballistic08(distance:number, gravity:number): number {
    const v0=88; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00260)*0.04;
    return drop;
  }

  public ballistic09(distance:number, gravity:number): number {
    const v0=88; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00280)*0.04;
    return drop;
  }

  public ballistic10(distance:number, gravity:number): number {
    const v0=88; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00300)*0.04;
    return drop;
  }

  public ballistic11(distance:number, gravity:number): number {
    const v0=88; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00320)*0.04;
    return drop;
  }

  public ballistic12(distance:number, gravity:number): number {
    const v0=88; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00340)*0.04;
    return drop;
  }

  public ballistic13(distance:number, gravity:number): number {
    const v0=88; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00360)*0.04;
    return drop;
  }

  public ballistic14(distance:number, gravity:number): number {
    const v0=88; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00380)*0.04;
    return drop;
  }

  public ballistic15(distance:number, gravity:number): number {
    const v0=88; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00400)*0.04;
    return drop;
  }

}
export const PHANTOMWEAPON_EXTRA_000 = { idx:0, value:641.940, label:'PhantomWeapon-0' };
// PhantomWeapon tuning note 0: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_000 = 159.74; // Hz
export type PhantomWeaponVariant0 = 'PhantomWeapon-0';
export const PHANTOMWEAPON_EXTRA_001 = { idx:1, value:796.396, label:'PhantomWeapon-1' };
// PhantomWeapon tuning note 1: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_001 = 492.88; // Hz
export type PhantomWeaponVariant1 = 'PhantomWeapon-1';
export const PHANTOMWEAPON_EXTRA_002 = { idx:2, value:115.201, label:'PhantomWeapon-2' };
// PhantomWeapon tuning note 2: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_002 = 693.15; // Hz
export type PhantomWeaponVariant2 = 'PhantomWeapon-2';
export const PHANTOMWEAPON_EXTRA_003 = { idx:3, value:686.543, label:'PhantomWeapon-3' };
// PhantomWeapon tuning note 3: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_003 = 210.18; // Hz
export type PhantomWeaponVariant3 = 'PhantomWeapon-3';
export const PHANTOMWEAPON_EXTRA_004 = { idx:4, value:817.819, label:'PhantomWeapon-4' };
// PhantomWeapon tuning note 4: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_004 = 370.79; // Hz
export type PhantomWeaponVariant4 = 'PhantomWeapon-4';
export const PHANTOMWEAPON_EXTRA_005 = { idx:5, value:893.969, label:'PhantomWeapon-5' };
// PhantomWeapon tuning note 5: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_005 = 1066.83; // Hz
export type PhantomWeaponVariant5 = 'PhantomWeapon-5';
export const PHANTOMWEAPON_EXTRA_006 = { idx:6, value:653.993, label:'PhantomWeapon-6' };
// PhantomWeapon tuning note 6: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_006 = 860.49; // Hz
export type PhantomWeaponVariant6 = 'PhantomWeapon-6';
export const PHANTOMWEAPON_EXTRA_007 = { idx:7, value:982.163, label:'PhantomWeapon-7' };
// PhantomWeapon tuning note 7: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_007 = 1092.52; // Hz
export type PhantomWeaponVariant7 = 'PhantomWeapon-7';
export const PHANTOMWEAPON_EXTRA_008 = { idx:8, value:953.122, label:'PhantomWeapon-8' };
// PhantomWeapon tuning note 8: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_008 = 138.86; // Hz
export type PhantomWeaponVariant8 = 'PhantomWeapon-8';
export const PHANTOMWEAPON_EXTRA_009 = { idx:9, value:590.580, label:'PhantomWeapon-9' };
// PhantomWeapon tuning note 9: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_009 = 119.02; // Hz
export type PhantomWeaponVariant9 = 'PhantomWeapon-9';
export const PHANTOMWEAPON_EXTRA_010 = { idx:10, value:422.604, label:'PhantomWeapon-10' };
// PhantomWeapon tuning note 10: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_010 = 409.79; // Hz
export type PhantomWeaponVariant10 = 'PhantomWeapon-10';
export const PHANTOMWEAPON_EXTRA_011 = { idx:11, value:808.811, label:'PhantomWeapon-11' };
// PhantomWeapon tuning note 11: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_011 = 804.68; // Hz
export type PhantomWeaponVariant11 = 'PhantomWeapon-11';
export const PHANTOMWEAPON_EXTRA_012 = { idx:12, value:565.804, label:'PhantomWeapon-12' };
// PhantomWeapon tuning note 12: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_012 = 453.38; // Hz
export type PhantomWeaponVariant12 = 'PhantomWeapon-12';
export const PHANTOMWEAPON_EXTRA_013 = { idx:13, value:318.397, label:'PhantomWeapon-13' };
// PhantomWeapon tuning note 13: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_013 = 736.59; // Hz
export type PhantomWeaponVariant13 = 'PhantomWeapon-13';
export const PHANTOMWEAPON_EXTRA_014 = { idx:14, value:477.887, label:'PhantomWeapon-14' };
// PhantomWeapon tuning note 14: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_014 = 776.97; // Hz
export type PhantomWeaponVariant14 = 'PhantomWeapon-14';
export const PHANTOMWEAPON_EXTRA_015 = { idx:15, value:100.747, label:'PhantomWeapon-15' };
// PhantomWeapon tuning note 15: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_015 = 964.85; // Hz
export type PhantomWeaponVariant15 = 'PhantomWeapon-15';
export const PHANTOMWEAPON_EXTRA_016 = { idx:16, value:140.017, label:'PhantomWeapon-16' };
// PhantomWeapon tuning note 16: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_016 = 358.61; // Hz
export type PhantomWeaponVariant16 = 'PhantomWeapon-16';
export const PHANTOMWEAPON_EXTRA_017 = { idx:17, value:182.894, label:'PhantomWeapon-17' };
// PhantomWeapon tuning note 17: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_017 = 1064.56; // Hz
export type PhantomWeaponVariant17 = 'PhantomWeapon-17';
export const PHANTOMWEAPON_EXTRA_018 = { idx:18, value:687.111, label:'PhantomWeapon-18' };
// PhantomWeapon tuning note 18: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_018 = 305.73; // Hz
export type PhantomWeaponVariant18 = 'PhantomWeapon-18';
export const PHANTOMWEAPON_EXTRA_019 = { idx:19, value:498.982, label:'PhantomWeapon-19' };
// PhantomWeapon tuning note 19: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_019 = 262.60; // Hz
export type PhantomWeaponVariant19 = 'PhantomWeapon-19';
export const PHANTOMWEAPON_EXTRA_020 = { idx:20, value:755.489, label:'PhantomWeapon-20' };
// PhantomWeapon tuning note 20: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_020 = 289.68; // Hz
export type PhantomWeaponVariant20 = 'PhantomWeapon-20';
export const PHANTOMWEAPON_EXTRA_021 = { idx:21, value:677.751, label:'PhantomWeapon-21' };
// PhantomWeapon tuning note 21: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_021 = 322.17; // Hz
export type PhantomWeaponVariant21 = 'PhantomWeapon-21';
export const PHANTOMWEAPON_EXTRA_022 = { idx:22, value:416.562, label:'PhantomWeapon-22' };
// PhantomWeapon tuning note 22: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_022 = 92.25; // Hz
export type PhantomWeaponVariant22 = 'PhantomWeapon-22';
export const PHANTOMWEAPON_EXTRA_023 = { idx:23, value:42.892, label:'PhantomWeapon-23' };
// PhantomWeapon tuning note 23: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_023 = 110.13; // Hz
export type PhantomWeaponVariant23 = 'PhantomWeapon-23';
export const PHANTOMWEAPON_EXTRA_024 = { idx:24, value:16.792, label:'PhantomWeapon-24' };
// PhantomWeapon tuning note 24: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_024 = 96.49; // Hz
export type PhantomWeaponVariant24 = 'PhantomWeapon-24';
export const PHANTOMWEAPON_EXTRA_025 = { idx:25, value:109.688, label:'PhantomWeapon-25' };
// PhantomWeapon tuning note 25: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_025 = 776.98; // Hz
export type PhantomWeaponVariant25 = 'PhantomWeapon-25';
export const PHANTOMWEAPON_EXTRA_026 = { idx:26, value:330.615, label:'PhantomWeapon-26' };
// PhantomWeapon tuning note 26: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_026 = 994.91; // Hz
export type PhantomWeaponVariant26 = 'PhantomWeapon-26';
export const PHANTOMWEAPON_EXTRA_027 = { idx:27, value:317.845, label:'PhantomWeapon-27' };
// PhantomWeapon tuning note 27: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_027 = 1014.86; // Hz
export type PhantomWeaponVariant27 = 'PhantomWeapon-27';
export const PHANTOMWEAPON_EXTRA_028 = { idx:28, value:337.205, label:'PhantomWeapon-28' };
// PhantomWeapon tuning note 28: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_028 = 910.95; // Hz
export type PhantomWeaponVariant28 = 'PhantomWeapon-28';
export const PHANTOMWEAPON_EXTRA_029 = { idx:29, value:464.301, label:'PhantomWeapon-29' };
// PhantomWeapon tuning note 29: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_029 = 1138.40; // Hz
export type PhantomWeaponVariant29 = 'PhantomWeapon-29';
export const PHANTOMWEAPON_EXTRA_030 = { idx:30, value:695.062, label:'PhantomWeapon-30' };
// PhantomWeapon tuning note 30: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_030 = 754.08; // Hz
export type PhantomWeaponVariant30 = 'PhantomWeapon-30';
export const PHANTOMWEAPON_EXTRA_031 = { idx:31, value:764.106, label:'PhantomWeapon-31' };
// PhantomWeapon tuning note 31: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_031 = 600.56; // Hz
export type PhantomWeaponVariant31 = 'PhantomWeapon-31';
export const PHANTOMWEAPON_EXTRA_032 = { idx:32, value:971.356, label:'PhantomWeapon-32' };
// PhantomWeapon tuning note 32: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_032 = 648.15; // Hz
export type PhantomWeaponVariant32 = 'PhantomWeapon-32';
export const PHANTOMWEAPON_EXTRA_033 = { idx:33, value:125.646, label:'PhantomWeapon-33' };
// PhantomWeapon tuning note 33: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_033 = 240.69; // Hz
export type PhantomWeaponVariant33 = 'PhantomWeapon-33';
export const PHANTOMWEAPON_EXTRA_034 = { idx:34, value:630.508, label:'PhantomWeapon-34' };
// PhantomWeapon tuning note 34: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_034 = 518.04; // Hz
export type PhantomWeaponVariant34 = 'PhantomWeapon-34';
export const PHANTOMWEAPON_EXTRA_035 = { idx:35, value:894.791, label:'PhantomWeapon-35' };
// PhantomWeapon tuning note 35: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_035 = 1066.85; // Hz
export type PhantomWeaponVariant35 = 'PhantomWeapon-35';
export const PHANTOMWEAPON_EXTRA_036 = { idx:36, value:512.106, label:'PhantomWeapon-36' };
// PhantomWeapon tuning note 36: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_036 = 201.53; // Hz
export type PhantomWeaponVariant36 = 'PhantomWeapon-36';
export const PHANTOMWEAPON_EXTRA_037 = { idx:37, value:243.519, label:'PhantomWeapon-37' };
// PhantomWeapon tuning note 37: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_037 = 744.35; // Hz
export type PhantomWeaponVariant37 = 'PhantomWeapon-37';
export const PHANTOMWEAPON_EXTRA_038 = { idx:38, value:19.340, label:'PhantomWeapon-38' };
// PhantomWeapon tuning note 38: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_038 = 288.74; // Hz
export type PhantomWeaponVariant38 = 'PhantomWeapon-38';
export const PHANTOMWEAPON_EXTRA_039 = { idx:39, value:186.209, label:'PhantomWeapon-39' };
// PhantomWeapon tuning note 39: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_039 = 809.07; // Hz
export type PhantomWeaponVariant39 = 'PhantomWeapon-39';
export const PHANTOMWEAPON_EXTRA_040 = { idx:40, value:546.270, label:'PhantomWeapon-40' };
// PhantomWeapon tuning note 40: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_040 = 1199.85; // Hz
export type PhantomWeaponVariant40 = 'PhantomWeapon-40';
export const PHANTOMWEAPON_EXTRA_041 = { idx:41, value:810.696, label:'PhantomWeapon-41' };
// PhantomWeapon tuning note 41: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_041 = 97.66; // Hz
export type PhantomWeaponVariant41 = 'PhantomWeapon-41';
export const PHANTOMWEAPON_EXTRA_042 = { idx:42, value:845.697, label:'PhantomWeapon-42' };
// PhantomWeapon tuning note 42: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_042 = 41.37; // Hz
export type PhantomWeaponVariant42 = 'PhantomWeapon-42';
export const PHANTOMWEAPON_EXTRA_043 = { idx:43, value:483.713, label:'PhantomWeapon-43' };
// PhantomWeapon tuning note 43: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_043 = 393.02; // Hz
export type PhantomWeaponVariant43 = 'PhantomWeapon-43';
export const PHANTOMWEAPON_EXTRA_044 = { idx:44, value:461.595, label:'PhantomWeapon-44' };
// PhantomWeapon tuning note 44: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_044 = 1060.59; // Hz
export type PhantomWeaponVariant44 = 'PhantomWeapon-44';
export const PHANTOMWEAPON_EXTRA_045 = { idx:45, value:903.358, label:'PhantomWeapon-45' };
// PhantomWeapon tuning note 45: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_045 = 394.72; // Hz
export type PhantomWeaponVariant45 = 'PhantomWeapon-45';
export const PHANTOMWEAPON_EXTRA_046 = { idx:46, value:875.090, label:'PhantomWeapon-46' };
// PhantomWeapon tuning note 46: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_046 = 558.71; // Hz
export type PhantomWeaponVariant46 = 'PhantomWeapon-46';
export const PHANTOMWEAPON_EXTRA_047 = { idx:47, value:627.569, label:'PhantomWeapon-47' };
// PhantomWeapon tuning note 47: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_047 = 112.69; // Hz
export type PhantomWeaponVariant47 = 'PhantomWeapon-47';
export const PHANTOMWEAPON_EXTRA_048 = { idx:48, value:372.862, label:'PhantomWeapon-48' };
// PhantomWeapon tuning note 48: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_048 = 1035.30; // Hz
export type PhantomWeaponVariant48 = 'PhantomWeapon-48';
export const PHANTOMWEAPON_EXTRA_049 = { idx:49, value:669.378, label:'PhantomWeapon-49' };
// PhantomWeapon tuning note 49: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_049 = 922.47; // Hz
export type PhantomWeaponVariant49 = 'PhantomWeapon-49';
export const PHANTOMWEAPON_EXTRA_050 = { idx:50, value:643.476, label:'PhantomWeapon-50' };
// PhantomWeapon tuning note 50: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_050 = 863.42; // Hz
export type PhantomWeaponVariant50 = 'PhantomWeapon-50';
export const PHANTOMWEAPON_EXTRA_051 = { idx:51, value:235.368, label:'PhantomWeapon-51' };
// PhantomWeapon tuning note 51: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_051 = 650.53; // Hz
export type PhantomWeaponVariant51 = 'PhantomWeapon-51';
export const PHANTOMWEAPON_EXTRA_052 = { idx:52, value:5.082, label:'PhantomWeapon-52' };
// PhantomWeapon tuning note 52: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_052 = 615.70; // Hz
export type PhantomWeaponVariant52 = 'PhantomWeapon-52';
export const PHANTOMWEAPON_EXTRA_053 = { idx:53, value:196.426, label:'PhantomWeapon-53' };
// PhantomWeapon tuning note 53: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_053 = 902.15; // Hz
export type PhantomWeaponVariant53 = 'PhantomWeapon-53';
export const PHANTOMWEAPON_EXTRA_054 = { idx:54, value:221.201, label:'PhantomWeapon-54' };
// PhantomWeapon tuning note 54: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_054 = 57.78; // Hz
export type PhantomWeaponVariant54 = 'PhantomWeapon-54';
export const PHANTOMWEAPON_EXTRA_055 = { idx:55, value:319.519, label:'PhantomWeapon-55' };
// PhantomWeapon tuning note 55: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_055 = 666.38; // Hz
export type PhantomWeaponVariant55 = 'PhantomWeapon-55';
export const PHANTOMWEAPON_EXTRA_056 = { idx:56, value:564.780, label:'PhantomWeapon-56' };
// PhantomWeapon tuning note 56: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_056 = 391.66; // Hz
export type PhantomWeaponVariant56 = 'PhantomWeapon-56';
export const PHANTOMWEAPON_EXTRA_057 = { idx:57, value:884.185, label:'PhantomWeapon-57' };
// PhantomWeapon tuning note 57: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_057 = 1026.97; // Hz
export type PhantomWeaponVariant57 = 'PhantomWeapon-57';
export const PHANTOMWEAPON_EXTRA_058 = { idx:58, value:821.063, label:'PhantomWeapon-58' };
// PhantomWeapon tuning note 58: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_058 = 1131.74; // Hz
export type PhantomWeaponVariant58 = 'PhantomWeapon-58';
export const PHANTOMWEAPON_EXTRA_059 = { idx:59, value:572.682, label:'PhantomWeapon-59' };
// PhantomWeapon tuning note 59: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_059 = 716.16; // Hz
export type PhantomWeaponVariant59 = 'PhantomWeapon-59';
export const PHANTOMWEAPON_EXTRA_060 = { idx:60, value:263.548, label:'PhantomWeapon-60' };
// PhantomWeapon tuning note 60: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_060 = 169.57; // Hz
export type PhantomWeaponVariant60 = 'PhantomWeapon-60';
export const PHANTOMWEAPON_EXTRA_061 = { idx:61, value:727.887, label:'PhantomWeapon-61' };
// PhantomWeapon tuning note 61: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_061 = 94.14; // Hz
export type PhantomWeaponVariant61 = 'PhantomWeapon-61';
export const PHANTOMWEAPON_EXTRA_062 = { idx:62, value:684.344, label:'PhantomWeapon-62' };
// PhantomWeapon tuning note 62: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_062 = 116.43; // Hz
export type PhantomWeaponVariant62 = 'PhantomWeapon-62';
export const PHANTOMWEAPON_EXTRA_063 = { idx:63, value:870.285, label:'PhantomWeapon-63' };
// PhantomWeapon tuning note 63: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_063 = 777.48; // Hz
export type PhantomWeaponVariant63 = 'PhantomWeapon-63';
export const PHANTOMWEAPON_EXTRA_064 = { idx:64, value:3.042, label:'PhantomWeapon-64' };
// PhantomWeapon tuning note 64: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_064 = 938.66; // Hz
export type PhantomWeaponVariant64 = 'PhantomWeapon-64';
export const PHANTOMWEAPON_EXTRA_065 = { idx:65, value:206.571, label:'PhantomWeapon-65' };
// PhantomWeapon tuning note 65: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_065 = 1092.44; // Hz
export type PhantomWeaponVariant65 = 'PhantomWeapon-65';
export const PHANTOMWEAPON_EXTRA_066 = { idx:66, value:715.275, label:'PhantomWeapon-66' };
// PhantomWeapon tuning note 66: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_066 = 599.17; // Hz
export type PhantomWeaponVariant66 = 'PhantomWeapon-66';
export const PHANTOMWEAPON_EXTRA_067 = { idx:67, value:959.147, label:'PhantomWeapon-67' };
// PhantomWeapon tuning note 67: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_067 = 828.43; // Hz
export type PhantomWeaponVariant67 = 'PhantomWeapon-67';
export const PHANTOMWEAPON_EXTRA_068 = { idx:68, value:795.242, label:'PhantomWeapon-68' };
// PhantomWeapon tuning note 68: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_068 = 548.08; // Hz
export type PhantomWeaponVariant68 = 'PhantomWeapon-68';
export const PHANTOMWEAPON_EXTRA_069 = { idx:69, value:335.782, label:'PhantomWeapon-69' };
// PhantomWeapon tuning note 69: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_069 = 872.73; // Hz
export type PhantomWeaponVariant69 = 'PhantomWeapon-69';
export const PHANTOMWEAPON_EXTRA_070 = { idx:70, value:206.605, label:'PhantomWeapon-70' };
// PhantomWeapon tuning note 70: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_070 = 959.09; // Hz
export type PhantomWeaponVariant70 = 'PhantomWeapon-70';
export const PHANTOMWEAPON_EXTRA_071 = { idx:71, value:962.448, label:'PhantomWeapon-71' };
// PhantomWeapon tuning note 71: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_071 = 1166.24; // Hz
export type PhantomWeaponVariant71 = 'PhantomWeapon-71';
export const PHANTOMWEAPON_EXTRA_072 = { idx:72, value:972.915, label:'PhantomWeapon-72' };
// PhantomWeapon tuning note 72: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_072 = 639.90; // Hz
export type PhantomWeaponVariant72 = 'PhantomWeapon-72';
export const PHANTOMWEAPON_EXTRA_073 = { idx:73, value:483.624, label:'PhantomWeapon-73' };
// PhantomWeapon tuning note 73: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_073 = 269.23; // Hz
export type PhantomWeaponVariant73 = 'PhantomWeapon-73';
export const PHANTOMWEAPON_EXTRA_074 = { idx:74, value:582.790, label:'PhantomWeapon-74' };
// PhantomWeapon tuning note 74: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_074 = 773.28; // Hz
export type PhantomWeaponVariant74 = 'PhantomWeapon-74';
export const PHANTOMWEAPON_EXTRA_075 = { idx:75, value:219.173, label:'PhantomWeapon-75' };
// PhantomWeapon tuning note 75: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_075 = 1164.07; // Hz
export type PhantomWeaponVariant75 = 'PhantomWeapon-75';
export const PHANTOMWEAPON_EXTRA_076 = { idx:76, value:911.597, label:'PhantomWeapon-76' };
// PhantomWeapon tuning note 76: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_076 = 231.70; // Hz
export type PhantomWeaponVariant76 = 'PhantomWeapon-76';
export const PHANTOMWEAPON_EXTRA_077 = { idx:77, value:297.469, label:'PhantomWeapon-77' };
// PhantomWeapon tuning note 77: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_077 = 426.97; // Hz
export type PhantomWeaponVariant77 = 'PhantomWeapon-77';
export const PHANTOMWEAPON_EXTRA_078 = { idx:78, value:600.849, label:'PhantomWeapon-78' };
// PhantomWeapon tuning note 78: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_078 = 1105.58; // Hz
export type PhantomWeaponVariant78 = 'PhantomWeapon-78';
export const PHANTOMWEAPON_EXTRA_079 = { idx:79, value:917.600, label:'PhantomWeapon-79' };
// PhantomWeapon tuning note 79: ensures deterministic recoil and audio sync
export const PHANTOMWEAPON_AUDIO_079 = 57.33; // Hz
export type PhantomWeaponVariant79 = 'PhantomWeapon-79';

// padding line 0 — PhantomWeapon.ts — Ring-07
// padding line 1 — PhantomWeapon.ts — Ring-07
// padding line 2 — PhantomWeapon.ts — Ring-07
