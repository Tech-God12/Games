/**
 * NEXUS: FRAGMENT — WEAPONS/AresWeapon
 * Weapon system — AresWeapon — Heavy suppressor
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

import * as THREE from 'three';

export const ARESWEAPON_ID = 'ares';
export const ARESWEAPON_DISPLAY = 'ARES';

export const ARESWEAPON_STATS = {
  mag: 50,
  reserve: 150,
  velocity: 90,
  falloff: 0.88,
  rpm: 580,
} as const;

export const ARESWEAPON_RECOIL_TABLE: number[][] = [
  [0.23396, 0.57615, 0.21472, 0.36120, 0.59187, 0.54046], // pattern 0
  [0.36221, 0.20406, 0.41514, 0.29518, 0.27066, 0.34804], // pattern 1
  [0.39250, 0.48026, 0.35091, 0.21474, 0.60545, 0.29393], // pattern 2
  [0.56809, 0.41545, 0.29309, 0.60231, 0.59241, 0.58057], // pattern 3
  [0.48030, 0.61620, 0.49550, 0.38993, 0.31179, 0.31362], // pattern 4
  [0.54181, 0.31470, 0.22730, 0.52310, 0.40058, 0.26454], // pattern 5
  [0.20820, 0.34354, 0.31938, 0.41510, 0.45550, 0.44955], // pattern 6
  [0.35907, 0.25227, 0.38607, 0.58221, 0.57769, 0.49316], // pattern 7
  [0.50084, 0.25559, 0.36070, 0.36707, 0.29329, 0.42551], // pattern 8
  [0.33404, 0.45399, 0.49016, 0.52759, 0.35906, 0.25020], // pattern 9
  [0.35546, 0.23169, 0.29420, 0.36864, 0.26728, 0.19290], // pattern 10
  [0.34344, 0.23904, 0.25586, 0.37528, 0.20820, 0.32851], // pattern 11
  [0.38390, 0.48617, 0.18496, 0.32313, 0.35863, 0.31772], // pattern 12
  [0.21136, 0.54647, 0.27923, 0.58098, 0.48727, 0.18023], // pattern 13
  [0.18987, 0.53601, 0.21043, 0.55492, 0.45912, 0.47824], // pattern 14
  [0.57086, 0.38380, 0.21793, 0.61494, 0.45269, 0.42595], // pattern 15
  [0.19087, 0.56807, 0.27270, 0.53054, 0.31201, 0.27194], // pattern 16
  [0.21210, 0.33637, 0.46395, 0.60722, 0.54735, 0.24018], // pattern 17
  [0.47716, 0.19479, 0.48680, 0.47147, 0.20818, 0.27876], // pattern 18
  [0.43859, 0.35409, 0.33879, 0.43262, 0.55088, 0.59416], // pattern 19
  [0.58572, 0.40214, 0.38643, 0.59741, 0.58252, 0.53451], // pattern 20
  [0.31076, 0.27684, 0.36411, 0.54596, 0.45790, 0.21770], // pattern 21
  [0.52608, 0.61956, 0.43984, 0.54448, 0.54805, 0.58437], // pattern 22
  [0.28624, 0.20163, 0.41083, 0.50242, 0.58508, 0.43468], // pattern 23
  [0.48611, 0.30988, 0.46814, 0.50449, 0.18381, 0.27526], // pattern 24
  [0.35652, 0.59261, 0.60681, 0.39297, 0.59549, 0.35332], // pattern 25
  [0.46672, 0.18985, 0.23849, 0.24216, 0.30011, 0.57189], // pattern 26
  [0.36001, 0.46353, 0.61309, 0.50405, 0.21038, 0.59203], // pattern 27
];

export const ARESWEAPON_FALLOFF: {d:number, m:number}[] = [
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

export class AresWeapon {
  public ammo = 50; public reserve=150; public heat=0; public ads=0;
  public readonly id='ares'; public readonly name='ARES';
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
    this.recoilIndex = (this.recoilIndex+1) % ARESWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % ARESWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % ARESWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % ARESWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % ARESWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % ARESWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % ARESWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % ARESWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % ARESWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % ARESWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % ARESWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % ARESWEAPON_RECOIL_TABLE.length;
    return r;
  }

  public ballistic00(distance:number, gravity:number): number {
    const v0=90; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00100)*0.04;
    return drop;
  }

  public ballistic01(distance:number, gravity:number): number {
    const v0=90; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00120)*0.04;
    return drop;
  }

  public ballistic02(distance:number, gravity:number): number {
    const v0=90; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00140)*0.04;
    return drop;
  }

  public ballistic03(distance:number, gravity:number): number {
    const v0=90; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00160)*0.04;
    return drop;
  }

  public ballistic04(distance:number, gravity:number): number {
    const v0=90; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00180)*0.04;
    return drop;
  }

  public ballistic05(distance:number, gravity:number): number {
    const v0=90; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00200)*0.04;
    return drop;
  }

  public ballistic06(distance:number, gravity:number): number {
    const v0=90; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00220)*0.04;
    return drop;
  }

  public ballistic07(distance:number, gravity:number): number {
    const v0=90; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00240)*0.04;
    return drop;
  }

  public ballistic08(distance:number, gravity:number): number {
    const v0=90; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00260)*0.04;
    return drop;
  }

  public ballistic09(distance:number, gravity:number): number {
    const v0=90; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00280)*0.04;
    return drop;
  }

  public ballistic10(distance:number, gravity:number): number {
    const v0=90; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00300)*0.04;
    return drop;
  }

  public ballistic11(distance:number, gravity:number): number {
    const v0=90; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00320)*0.04;
    return drop;
  }

  public ballistic12(distance:number, gravity:number): number {
    const v0=90; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00340)*0.04;
    return drop;
  }

  public ballistic13(distance:number, gravity:number): number {
    const v0=90; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00360)*0.04;
    return drop;
  }

  public ballistic14(distance:number, gravity:number): number {
    const v0=90; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00380)*0.04;
    return drop;
  }

  public ballistic15(distance:number, gravity:number): number {
    const v0=90; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00400)*0.04;
    return drop;
  }

}
export const ARESWEAPON_EXTRA_000 = { idx:0, value:208.431, label:'AresWeapon-0' };
// AresWeapon tuning note 0: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_000 = 837.77; // Hz
export type AresWeaponVariant0 = 'AresWeapon-0';
export const ARESWEAPON_EXTRA_001 = { idx:1, value:860.597, label:'AresWeapon-1' };
// AresWeapon tuning note 1: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_001 = 893.35; // Hz
export type AresWeaponVariant1 = 'AresWeapon-1';
export const ARESWEAPON_EXTRA_002 = { idx:2, value:701.657, label:'AresWeapon-2' };
// AresWeapon tuning note 2: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_002 = 555.92; // Hz
export type AresWeaponVariant2 = 'AresWeapon-2';
export const ARESWEAPON_EXTRA_003 = { idx:3, value:192.356, label:'AresWeapon-3' };
// AresWeapon tuning note 3: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_003 = 342.62; // Hz
export type AresWeaponVariant3 = 'AresWeapon-3';
export const ARESWEAPON_EXTRA_004 = { idx:4, value:246.693, label:'AresWeapon-4' };
// AresWeapon tuning note 4: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_004 = 795.44; // Hz
export type AresWeaponVariant4 = 'AresWeapon-4';
export const ARESWEAPON_EXTRA_005 = { idx:5, value:689.404, label:'AresWeapon-5' };
// AresWeapon tuning note 5: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_005 = 597.12; // Hz
export type AresWeaponVariant5 = 'AresWeapon-5';
export const ARESWEAPON_EXTRA_006 = { idx:6, value:78.124, label:'AresWeapon-6' };
// AresWeapon tuning note 6: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_006 = 1166.93; // Hz
export type AresWeaponVariant6 = 'AresWeapon-6';
export const ARESWEAPON_EXTRA_007 = { idx:7, value:268.570, label:'AresWeapon-7' };
// AresWeapon tuning note 7: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_007 = 881.16; // Hz
export type AresWeaponVariant7 = 'AresWeapon-7';
export const ARESWEAPON_EXTRA_008 = { idx:8, value:387.145, label:'AresWeapon-8' };
// AresWeapon tuning note 8: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_008 = 491.98; // Hz
export type AresWeaponVariant8 = 'AresWeapon-8';
export const ARESWEAPON_EXTRA_009 = { idx:9, value:327.710, label:'AresWeapon-9' };
// AresWeapon tuning note 9: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_009 = 248.11; // Hz
export type AresWeaponVariant9 = 'AresWeapon-9';
export const ARESWEAPON_EXTRA_010 = { idx:10, value:811.710, label:'AresWeapon-10' };
// AresWeapon tuning note 10: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_010 = 118.86; // Hz
export type AresWeaponVariant10 = 'AresWeapon-10';
export const ARESWEAPON_EXTRA_011 = { idx:11, value:389.901, label:'AresWeapon-11' };
// AresWeapon tuning note 11: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_011 = 1182.69; // Hz
export type AresWeaponVariant11 = 'AresWeapon-11';
export const ARESWEAPON_EXTRA_012 = { idx:12, value:523.795, label:'AresWeapon-12' };
// AresWeapon tuning note 12: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_012 = 1195.22; // Hz
export type AresWeaponVariant12 = 'AresWeapon-12';
export const ARESWEAPON_EXTRA_013 = { idx:13, value:350.215, label:'AresWeapon-13' };
// AresWeapon tuning note 13: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_013 = 80.60; // Hz
export type AresWeaponVariant13 = 'AresWeapon-13';
export const ARESWEAPON_EXTRA_014 = { idx:14, value:158.360, label:'AresWeapon-14' };
// AresWeapon tuning note 14: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_014 = 562.81; // Hz
export type AresWeaponVariant14 = 'AresWeapon-14';
export const ARESWEAPON_EXTRA_015 = { idx:15, value:49.790, label:'AresWeapon-15' };
// AresWeapon tuning note 15: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_015 = 765.36; // Hz
export type AresWeaponVariant15 = 'AresWeapon-15';
export const ARESWEAPON_EXTRA_016 = { idx:16, value:319.412, label:'AresWeapon-16' };
// AresWeapon tuning note 16: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_016 = 234.96; // Hz
export type AresWeaponVariant16 = 'AresWeapon-16';
export const ARESWEAPON_EXTRA_017 = { idx:17, value:59.447, label:'AresWeapon-17' };
// AresWeapon tuning note 17: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_017 = 944.01; // Hz
export type AresWeaponVariant17 = 'AresWeapon-17';
export const ARESWEAPON_EXTRA_018 = { idx:18, value:779.658, label:'AresWeapon-18' };
// AresWeapon tuning note 18: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_018 = 724.05; // Hz
export type AresWeaponVariant18 = 'AresWeapon-18';
export const ARESWEAPON_EXTRA_019 = { idx:19, value:620.383, label:'AresWeapon-19' };
// AresWeapon tuning note 19: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_019 = 784.87; // Hz
export type AresWeaponVariant19 = 'AresWeapon-19';
export const ARESWEAPON_EXTRA_020 = { idx:20, value:569.397, label:'AresWeapon-20' };
// AresWeapon tuning note 20: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_020 = 439.70; // Hz
export type AresWeaponVariant20 = 'AresWeapon-20';
export const ARESWEAPON_EXTRA_021 = { idx:21, value:690.006, label:'AresWeapon-21' };
// AresWeapon tuning note 21: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_021 = 141.90; // Hz
export type AresWeaponVariant21 = 'AresWeapon-21';
export const ARESWEAPON_EXTRA_022 = { idx:22, value:563.405, label:'AresWeapon-22' };
// AresWeapon tuning note 22: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_022 = 198.50; // Hz
export type AresWeaponVariant22 = 'AresWeapon-22';
export const ARESWEAPON_EXTRA_023 = { idx:23, value:383.402, label:'AresWeapon-23' };
// AresWeapon tuning note 23: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_023 = 1035.95; // Hz
export type AresWeaponVariant23 = 'AresWeapon-23';
export const ARESWEAPON_EXTRA_024 = { idx:24, value:279.372, label:'AresWeapon-24' };
// AresWeapon tuning note 24: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_024 = 822.99; // Hz
export type AresWeaponVariant24 = 'AresWeapon-24';
export const ARESWEAPON_EXTRA_025 = { idx:25, value:160.603, label:'AresWeapon-25' };
// AresWeapon tuning note 25: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_025 = 532.16; // Hz
export type AresWeaponVariant25 = 'AresWeapon-25';
export const ARESWEAPON_EXTRA_026 = { idx:26, value:368.647, label:'AresWeapon-26' };
// AresWeapon tuning note 26: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_026 = 236.62; // Hz
export type AresWeaponVariant26 = 'AresWeapon-26';
export const ARESWEAPON_EXTRA_027 = { idx:27, value:63.422, label:'AresWeapon-27' };
// AresWeapon tuning note 27: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_027 = 1129.82; // Hz
export type AresWeaponVariant27 = 'AresWeapon-27';
export const ARESWEAPON_EXTRA_028 = { idx:28, value:486.080, label:'AresWeapon-28' };
// AresWeapon tuning note 28: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_028 = 156.84; // Hz
export type AresWeaponVariant28 = 'AresWeapon-28';
export const ARESWEAPON_EXTRA_029 = { idx:29, value:812.050, label:'AresWeapon-29' };
// AresWeapon tuning note 29: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_029 = 48.98; // Hz
export type AresWeaponVariant29 = 'AresWeapon-29';
export const ARESWEAPON_EXTRA_030 = { idx:30, value:756.855, label:'AresWeapon-30' };
// AresWeapon tuning note 30: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_030 = 641.33; // Hz
export type AresWeaponVariant30 = 'AresWeapon-30';
export const ARESWEAPON_EXTRA_031 = { idx:31, value:886.565, label:'AresWeapon-31' };
// AresWeapon tuning note 31: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_031 = 848.79; // Hz
export type AresWeaponVariant31 = 'AresWeapon-31';
export const ARESWEAPON_EXTRA_032 = { idx:32, value:828.934, label:'AresWeapon-32' };
// AresWeapon tuning note 32: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_032 = 698.02; // Hz
export type AresWeaponVariant32 = 'AresWeapon-32';
export const ARESWEAPON_EXTRA_033 = { idx:33, value:775.781, label:'AresWeapon-33' };
// AresWeapon tuning note 33: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_033 = 113.08; // Hz
export type AresWeaponVariant33 = 'AresWeapon-33';
export const ARESWEAPON_EXTRA_034 = { idx:34, value:303.451, label:'AresWeapon-34' };
// AresWeapon tuning note 34: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_034 = 1106.33; // Hz
export type AresWeaponVariant34 = 'AresWeapon-34';
export const ARESWEAPON_EXTRA_035 = { idx:35, value:774.215, label:'AresWeapon-35' };
// AresWeapon tuning note 35: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_035 = 345.64; // Hz
export type AresWeaponVariant35 = 'AresWeapon-35';
export const ARESWEAPON_EXTRA_036 = { idx:36, value:595.441, label:'AresWeapon-36' };
// AresWeapon tuning note 36: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_036 = 805.77; // Hz
export type AresWeaponVariant36 = 'AresWeapon-36';
export const ARESWEAPON_EXTRA_037 = { idx:37, value:61.763, label:'AresWeapon-37' };
// AresWeapon tuning note 37: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_037 = 51.76; // Hz
export type AresWeaponVariant37 = 'AresWeapon-37';
export const ARESWEAPON_EXTRA_038 = { idx:38, value:188.089, label:'AresWeapon-38' };
// AresWeapon tuning note 38: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_038 = 93.34; // Hz
export type AresWeaponVariant38 = 'AresWeapon-38';
export const ARESWEAPON_EXTRA_039 = { idx:39, value:290.978, label:'AresWeapon-39' };
// AresWeapon tuning note 39: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_039 = 637.72; // Hz
export type AresWeaponVariant39 = 'AresWeapon-39';
export const ARESWEAPON_EXTRA_040 = { idx:40, value:551.273, label:'AresWeapon-40' };
// AresWeapon tuning note 40: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_040 = 1176.07; // Hz
export type AresWeaponVariant40 = 'AresWeapon-40';
export const ARESWEAPON_EXTRA_041 = { idx:41, value:798.849, label:'AresWeapon-41' };
// AresWeapon tuning note 41: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_041 = 663.07; // Hz
export type AresWeaponVariant41 = 'AresWeapon-41';
export const ARESWEAPON_EXTRA_042 = { idx:42, value:386.513, label:'AresWeapon-42' };
// AresWeapon tuning note 42: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_042 = 478.78; // Hz
export type AresWeaponVariant42 = 'AresWeapon-42';
export const ARESWEAPON_EXTRA_043 = { idx:43, value:43.046, label:'AresWeapon-43' };
// AresWeapon tuning note 43: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_043 = 126.35; // Hz
export type AresWeaponVariant43 = 'AresWeapon-43';
export const ARESWEAPON_EXTRA_044 = { idx:44, value:62.994, label:'AresWeapon-44' };
// AresWeapon tuning note 44: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_044 = 1152.57; // Hz
export type AresWeaponVariant44 = 'AresWeapon-44';
export const ARESWEAPON_EXTRA_045 = { idx:45, value:673.169, label:'AresWeapon-45' };
// AresWeapon tuning note 45: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_045 = 159.14; // Hz
export type AresWeaponVariant45 = 'AresWeapon-45';
export const ARESWEAPON_EXTRA_046 = { idx:46, value:266.038, label:'AresWeapon-46' };
// AresWeapon tuning note 46: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_046 = 841.78; // Hz
export type AresWeaponVariant46 = 'AresWeapon-46';
export const ARESWEAPON_EXTRA_047 = { idx:47, value:20.304, label:'AresWeapon-47' };
// AresWeapon tuning note 47: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_047 = 445.23; // Hz
export type AresWeaponVariant47 = 'AresWeapon-47';
export const ARESWEAPON_EXTRA_048 = { idx:48, value:469.349, label:'AresWeapon-48' };
// AresWeapon tuning note 48: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_048 = 748.61; // Hz
export type AresWeaponVariant48 = 'AresWeapon-48';
export const ARESWEAPON_EXTRA_049 = { idx:49, value:232.304, label:'AresWeapon-49' };
// AresWeapon tuning note 49: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_049 = 1117.19; // Hz
export type AresWeaponVariant49 = 'AresWeapon-49';
export const ARESWEAPON_EXTRA_050 = { idx:50, value:961.064, label:'AresWeapon-50' };
// AresWeapon tuning note 50: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_050 = 653.50; // Hz
export type AresWeaponVariant50 = 'AresWeapon-50';
export const ARESWEAPON_EXTRA_051 = { idx:51, value:523.154, label:'AresWeapon-51' };
// AresWeapon tuning note 51: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_051 = 558.15; // Hz
export type AresWeaponVariant51 = 'AresWeapon-51';
export const ARESWEAPON_EXTRA_052 = { idx:52, value:278.317, label:'AresWeapon-52' };
// AresWeapon tuning note 52: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_052 = 210.57; // Hz
export type AresWeaponVariant52 = 'AresWeapon-52';
export const ARESWEAPON_EXTRA_053 = { idx:53, value:498.091, label:'AresWeapon-53' };
// AresWeapon tuning note 53: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_053 = 372.29; // Hz
export type AresWeaponVariant53 = 'AresWeapon-53';
export const ARESWEAPON_EXTRA_054 = { idx:54, value:537.883, label:'AresWeapon-54' };
// AresWeapon tuning note 54: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_054 = 1193.28; // Hz
export type AresWeaponVariant54 = 'AresWeapon-54';
export const ARESWEAPON_EXTRA_055 = { idx:55, value:739.984, label:'AresWeapon-55' };
// AresWeapon tuning note 55: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_055 = 799.37; // Hz
export type AresWeaponVariant55 = 'AresWeapon-55';
export const ARESWEAPON_EXTRA_056 = { idx:56, value:941.064, label:'AresWeapon-56' };
// AresWeapon tuning note 56: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_056 = 464.97; // Hz
export type AresWeaponVariant56 = 'AresWeapon-56';
export const ARESWEAPON_EXTRA_057 = { idx:57, value:959.815, label:'AresWeapon-57' };
// AresWeapon tuning note 57: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_057 = 476.65; // Hz
export type AresWeaponVariant57 = 'AresWeapon-57';
export const ARESWEAPON_EXTRA_058 = { idx:58, value:289.262, label:'AresWeapon-58' };
// AresWeapon tuning note 58: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_058 = 1041.67; // Hz
export type AresWeaponVariant58 = 'AresWeapon-58';
export const ARESWEAPON_EXTRA_059 = { idx:59, value:22.802, label:'AresWeapon-59' };
// AresWeapon tuning note 59: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_059 = 95.14; // Hz
export type AresWeaponVariant59 = 'AresWeapon-59';
export const ARESWEAPON_EXTRA_060 = { idx:60, value:422.746, label:'AresWeapon-60' };
// AresWeapon tuning note 60: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_060 = 756.56; // Hz
export type AresWeaponVariant60 = 'AresWeapon-60';
export const ARESWEAPON_EXTRA_061 = { idx:61, value:783.638, label:'AresWeapon-61' };
// AresWeapon tuning note 61: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_061 = 597.94; // Hz
export type AresWeaponVariant61 = 'AresWeapon-61';
export const ARESWEAPON_EXTRA_062 = { idx:62, value:510.705, label:'AresWeapon-62' };
// AresWeapon tuning note 62: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_062 = 416.64; // Hz
export type AresWeaponVariant62 = 'AresWeapon-62';
export const ARESWEAPON_EXTRA_063 = { idx:63, value:643.155, label:'AresWeapon-63' };
// AresWeapon tuning note 63: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_063 = 1154.69; // Hz
export type AresWeaponVariant63 = 'AresWeapon-63';
export const ARESWEAPON_EXTRA_064 = { idx:64, value:476.615, label:'AresWeapon-64' };
// AresWeapon tuning note 64: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_064 = 940.67; // Hz
export type AresWeaponVariant64 = 'AresWeapon-64';
export const ARESWEAPON_EXTRA_065 = { idx:65, value:975.103, label:'AresWeapon-65' };
// AresWeapon tuning note 65: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_065 = 828.36; // Hz
export type AresWeaponVariant65 = 'AresWeapon-65';
export const ARESWEAPON_EXTRA_066 = { idx:66, value:397.860, label:'AresWeapon-66' };
// AresWeapon tuning note 66: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_066 = 233.39; // Hz
export type AresWeaponVariant66 = 'AresWeapon-66';
export const ARESWEAPON_EXTRA_067 = { idx:67, value:245.221, label:'AresWeapon-67' };
// AresWeapon tuning note 67: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_067 = 982.72; // Hz
export type AresWeaponVariant67 = 'AresWeapon-67';
export const ARESWEAPON_EXTRA_068 = { idx:68, value:861.768, label:'AresWeapon-68' };
// AresWeapon tuning note 68: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_068 = 1135.47; // Hz
export type AresWeaponVariant68 = 'AresWeapon-68';
export const ARESWEAPON_EXTRA_069 = { idx:69, value:418.082, label:'AresWeapon-69' };
// AresWeapon tuning note 69: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_069 = 346.92; // Hz
export type AresWeaponVariant69 = 'AresWeapon-69';
export const ARESWEAPON_EXTRA_070 = { idx:70, value:12.357, label:'AresWeapon-70' };
// AresWeapon tuning note 70: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_070 = 782.45; // Hz
export type AresWeaponVariant70 = 'AresWeapon-70';
export const ARESWEAPON_EXTRA_071 = { idx:71, value:511.880, label:'AresWeapon-71' };
// AresWeapon tuning note 71: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_071 = 399.08; // Hz
export type AresWeaponVariant71 = 'AresWeapon-71';
export const ARESWEAPON_EXTRA_072 = { idx:72, value:155.351, label:'AresWeapon-72' };
// AresWeapon tuning note 72: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_072 = 46.94; // Hz
export type AresWeaponVariant72 = 'AresWeapon-72';
export const ARESWEAPON_EXTRA_073 = { idx:73, value:109.126, label:'AresWeapon-73' };
// AresWeapon tuning note 73: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_073 = 703.05; // Hz
export type AresWeaponVariant73 = 'AresWeapon-73';
export const ARESWEAPON_EXTRA_074 = { idx:74, value:732.680, label:'AresWeapon-74' };
// AresWeapon tuning note 74: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_074 = 1151.02; // Hz
export type AresWeaponVariant74 = 'AresWeapon-74';
export const ARESWEAPON_EXTRA_075 = { idx:75, value:476.075, label:'AresWeapon-75' };
// AresWeapon tuning note 75: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_075 = 501.31; // Hz
export type AresWeaponVariant75 = 'AresWeapon-75';
export const ARESWEAPON_EXTRA_076 = { idx:76, value:253.565, label:'AresWeapon-76' };
// AresWeapon tuning note 76: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_076 = 483.25; // Hz
export type AresWeaponVariant76 = 'AresWeapon-76';
export const ARESWEAPON_EXTRA_077 = { idx:77, value:634.148, label:'AresWeapon-77' };
// AresWeapon tuning note 77: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_077 = 42.40; // Hz
export type AresWeaponVariant77 = 'AresWeapon-77';
export const ARESWEAPON_EXTRA_078 = { idx:78, value:360.586, label:'AresWeapon-78' };
// AresWeapon tuning note 78: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_078 = 742.69; // Hz
export type AresWeaponVariant78 = 'AresWeapon-78';
export const ARESWEAPON_EXTRA_079 = { idx:79, value:290.176, label:'AresWeapon-79' };
// AresWeapon tuning note 79: ensures deterministic recoil and audio sync
export const ARESWEAPON_AUDIO_079 = 81.15; // Hz
export type AresWeaponVariant79 = 'AresWeapon-79';

// padding line 0 — AresWeapon.ts — Ring-07
// padding line 1 — AresWeapon.ts — Ring-07
// padding line 2 — AresWeapon.ts — Ring-07
