/**
 * NEXUS: FRAGMENT — WEAPONS/VandalWeapon
 * Weapon system — VandalWeapon — Adaptive assault rifle
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

import * as THREE from 'three';

export const VANDALWEAPON_ID = 'vandal';
export const VANDALWEAPON_DISPLAY = 'V-47 VANDAL';

export const VANDALWEAPON_STATS = {
  mag: 28,
  reserve: 120,
  velocity: 92,
  falloff: 0.92,
  rpm: 620,
} as const;

export const VANDALWEAPON_RECOIL_TABLE: number[][] = [
  [0.43338, 0.42369, 0.54175, 0.19934, 0.32128, 0.60791], // pattern 0
  [0.18718, 0.48937, 0.41154, 0.61663, 0.56255, 0.30853], // pattern 1
  [0.29584, 0.28414, 0.38245, 0.60974, 0.60595, 0.25143], // pattern 2
  [0.30956, 0.37978, 0.51349, 0.45539, 0.30637, 0.38701], // pattern 3
  [0.50524, 0.36027, 0.31760, 0.47216, 0.57616, 0.25972], // pattern 4
  [0.39542, 0.55915, 0.56885, 0.37453, 0.36825, 0.50806], // pattern 5
  [0.58239, 0.49000, 0.42676, 0.22636, 0.25678, 0.38882], // pattern 6
  [0.31127, 0.54943, 0.18204, 0.47544, 0.57504, 0.41843], // pattern 7
  [0.60294, 0.47091, 0.40374, 0.34532, 0.52406, 0.35744], // pattern 8
  [0.61919, 0.18502, 0.40272, 0.38497, 0.42695, 0.58201], // pattern 9
  [0.56905, 0.28007, 0.43754, 0.59341, 0.61091, 0.29026], // pattern 10
  [0.48856, 0.32240, 0.37122, 0.61611, 0.27237, 0.38691], // pattern 11
  [0.61798, 0.19523, 0.35464, 0.37985, 0.32634, 0.24789], // pattern 12
  [0.60198, 0.51154, 0.44622, 0.36731, 0.20424, 0.40895], // pattern 13
  [0.53623, 0.51427, 0.38557, 0.52356, 0.46022, 0.46116], // pattern 14
  [0.29457, 0.46935, 0.28940, 0.22420, 0.48474, 0.48735], // pattern 15
  [0.60485, 0.53640, 0.42234, 0.57656, 0.31687, 0.26475], // pattern 16
  [0.32322, 0.36229, 0.24638, 0.52899, 0.45368, 0.18377], // pattern 17
  [0.21518, 0.41896, 0.28982, 0.50784, 0.36169, 0.36202], // pattern 18
  [0.57572, 0.24857, 0.36693, 0.26682, 0.38052, 0.35359], // pattern 19
  [0.50110, 0.31106, 0.54571, 0.18800, 0.59357, 0.36566], // pattern 20
  [0.31289, 0.44513, 0.57325, 0.61217, 0.41302, 0.35527], // pattern 21
  [0.34358, 0.42217, 0.25053, 0.45553, 0.29821, 0.31107], // pattern 22
  [0.45609, 0.60671, 0.18981, 0.26167, 0.54883, 0.49044], // pattern 23
  [0.27400, 0.48938, 0.58436, 0.32116, 0.25139, 0.47545], // pattern 24
  [0.52824, 0.56975, 0.52871, 0.31517, 0.37738, 0.55995], // pattern 25
  [0.30942, 0.52397, 0.34734, 0.46672, 0.18779, 0.36732], // pattern 26
  [0.58627, 0.24808, 0.50897, 0.31082, 0.26493, 0.42100], // pattern 27
];

export const VANDALWEAPON_FALLOFF: {d:number, m:number}[] = [
  { d:0, m:1.00000 },
  { d:12, m:0.99838 },
  { d:24, m:0.99670 },
  { d:36, m:0.99498 },
  { d:48, m:0.99322 },
  { d:60, m:0.99140 },
  { d:72, m:0.98954 },
  { d:84, m:0.98762 },
  { d:96, m:0.98566 },
  { d:108, m:0.98366 },
  { d:120, m:0.98160 },
  { d:132, m:0.97950 },
  { d:144, m:0.97734 },
  { d:156, m:0.97514 },
  { d:168, m:0.97290 },
  { d:180, m:0.97060 },
  { d:192, m:0.96826 },
  { d:204, m:0.96586 },
  { d:216, m:0.96342 },
  { d:228, m:0.96094 },
  { d:240, m:0.95840 },
  { d:252, m:0.95582 },
  { d:264, m:0.95318 },
  { d:276, m:0.95050 },
  { d:288, m:0.94778 },
  { d:300, m:0.94500 },
  { d:312, m:0.94218 },
  { d:324, m:0.93930 },
  { d:336, m:0.93638 },
  { d:348, m:0.93342 },
  { d:360, m:0.93040 },
  { d:372, m:0.92734 },
  { d:384, m:0.92422 },
  { d:396, m:0.92106 },
  { d:408, m:0.91786 },
  { d:420, m:0.91460 },
  { d:432, m:0.91130 },
  { d:444, m:0.90794 },
  { d:456, m:0.90454 },
  { d:468, m:0.90110 },
  { d:480, m:0.89760 },
  { d:492, m:0.89406 },
  { d:504, m:0.89046 },
  { d:516, m:0.88682 },
  { d:528, m:0.88314 },
  { d:540, m:0.87940 },
  { d:552, m:0.87562 },
  { d:564, m:0.87178 },
  { d:576, m:0.86790 },
  { d:588, m:0.86398 },
];

export class VandalWeapon {
  public ammo = 28; public reserve=120; public heat=0; public ads=0;
  public readonly id='vandal'; public readonly name='V-47 VANDAL';
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
    this.recoilIndex = (this.recoilIndex+1) % VANDALWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % VANDALWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % VANDALWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % VANDALWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % VANDALWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % VANDALWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % VANDALWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % VANDALWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % VANDALWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % VANDALWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % VANDALWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % VANDALWEAPON_RECOIL_TABLE.length;
    return r;
  }

  public ballistic00(distance:number, gravity:number): number {
    const v0=92; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00100)*0.04;
    return drop;
  }

  public ballistic01(distance:number, gravity:number): number {
    const v0=92; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00120)*0.04;
    return drop;
  }

  public ballistic02(distance:number, gravity:number): number {
    const v0=92; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00140)*0.04;
    return drop;
  }

  public ballistic03(distance:number, gravity:number): number {
    const v0=92; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00160)*0.04;
    return drop;
  }

  public ballistic04(distance:number, gravity:number): number {
    const v0=92; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00180)*0.04;
    return drop;
  }

  public ballistic05(distance:number, gravity:number): number {
    const v0=92; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00200)*0.04;
    return drop;
  }

  public ballistic06(distance:number, gravity:number): number {
    const v0=92; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00220)*0.04;
    return drop;
  }

  public ballistic07(distance:number, gravity:number): number {
    const v0=92; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00240)*0.04;
    return drop;
  }

  public ballistic08(distance:number, gravity:number): number {
    const v0=92; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00260)*0.04;
    return drop;
  }

  public ballistic09(distance:number, gravity:number): number {
    const v0=92; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00280)*0.04;
    return drop;
  }

  public ballistic10(distance:number, gravity:number): number {
    const v0=92; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00300)*0.04;
    return drop;
  }

  public ballistic11(distance:number, gravity:number): number {
    const v0=92; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00320)*0.04;
    return drop;
  }

  public ballistic12(distance:number, gravity:number): number {
    const v0=92; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00340)*0.04;
    return drop;
  }

  public ballistic13(distance:number, gravity:number): number {
    const v0=92; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00360)*0.04;
    return drop;
  }

  public ballistic14(distance:number, gravity:number): number {
    const v0=92; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00380)*0.04;
    return drop;
  }

  public ballistic15(distance:number, gravity:number): number {
    const v0=92; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00400)*0.04;
    return drop;
  }

}
export const VANDALWEAPON_EXTRA_000 = { idx:0, value:39.740, label:'VandalWeapon-0' };
// VandalWeapon tuning note 0: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_000 = 121.49; // Hz
export type VandalWeaponVariant0 = 'VandalWeapon-0';
export const VANDALWEAPON_EXTRA_001 = { idx:1, value:284.880, label:'VandalWeapon-1' };
// VandalWeapon tuning note 1: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_001 = 1024.50; // Hz
export type VandalWeaponVariant1 = 'VandalWeapon-1';
export const VANDALWEAPON_EXTRA_002 = { idx:2, value:98.580, label:'VandalWeapon-2' };
// VandalWeapon tuning note 2: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_002 = 481.02; // Hz
export type VandalWeaponVariant2 = 'VandalWeapon-2';
export const VANDALWEAPON_EXTRA_003 = { idx:3, value:319.810, label:'VandalWeapon-3' };
// VandalWeapon tuning note 3: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_003 = 1114.48; // Hz
export type VandalWeaponVariant3 = 'VandalWeapon-3';
export const VANDALWEAPON_EXTRA_004 = { idx:4, value:777.060, label:'VandalWeapon-4' };
// VandalWeapon tuning note 4: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_004 = 806.35; // Hz
export type VandalWeaponVariant4 = 'VandalWeapon-4';
export const VANDALWEAPON_EXTRA_005 = { idx:5, value:61.471, label:'VandalWeapon-5' };
// VandalWeapon tuning note 5: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_005 = 573.87; // Hz
export type VandalWeaponVariant5 = 'VandalWeapon-5';
export const VANDALWEAPON_EXTRA_006 = { idx:6, value:107.744, label:'VandalWeapon-6' };
// VandalWeapon tuning note 6: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_006 = 596.08; // Hz
export type VandalWeaponVariant6 = 'VandalWeapon-6';
export const VANDALWEAPON_EXTRA_007 = { idx:7, value:31.897, label:'VandalWeapon-7' };
// VandalWeapon tuning note 7: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_007 = 310.81; // Hz
export type VandalWeaponVariant7 = 'VandalWeapon-7';
export const VANDALWEAPON_EXTRA_008 = { idx:8, value:291.564, label:'VandalWeapon-8' };
// VandalWeapon tuning note 8: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_008 = 1104.22; // Hz
export type VandalWeaponVariant8 = 'VandalWeapon-8';
export const VANDALWEAPON_EXTRA_009 = { idx:9, value:502.164, label:'VandalWeapon-9' };
// VandalWeapon tuning note 9: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_009 = 883.60; // Hz
export type VandalWeaponVariant9 = 'VandalWeapon-9';
export const VANDALWEAPON_EXTRA_010 = { idx:10, value:486.771, label:'VandalWeapon-10' };
// VandalWeapon tuning note 10: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_010 = 886.01; // Hz
export type VandalWeaponVariant10 = 'VandalWeapon-10';
export const VANDALWEAPON_EXTRA_011 = { idx:11, value:95.211, label:'VandalWeapon-11' };
// VandalWeapon tuning note 11: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_011 = 379.32; // Hz
export type VandalWeaponVariant11 = 'VandalWeapon-11';
export const VANDALWEAPON_EXTRA_012 = { idx:12, value:712.269, label:'VandalWeapon-12' };
// VandalWeapon tuning note 12: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_012 = 838.07; // Hz
export type VandalWeaponVariant12 = 'VandalWeapon-12';
export const VANDALWEAPON_EXTRA_013 = { idx:13, value:609.169, label:'VandalWeapon-13' };
// VandalWeapon tuning note 13: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_013 = 393.17; // Hz
export type VandalWeaponVariant13 = 'VandalWeapon-13';
export const VANDALWEAPON_EXTRA_014 = { idx:14, value:300.951, label:'VandalWeapon-14' };
// VandalWeapon tuning note 14: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_014 = 347.78; // Hz
export type VandalWeaponVariant14 = 'VandalWeapon-14';
export const VANDALWEAPON_EXTRA_015 = { idx:15, value:289.024, label:'VandalWeapon-15' };
// VandalWeapon tuning note 15: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_015 = 328.00; // Hz
export type VandalWeaponVariant15 = 'VandalWeapon-15';
export const VANDALWEAPON_EXTRA_016 = { idx:16, value:283.739, label:'VandalWeapon-16' };
// VandalWeapon tuning note 16: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_016 = 69.03; // Hz
export type VandalWeaponVariant16 = 'VandalWeapon-16';
export const VANDALWEAPON_EXTRA_017 = { idx:17, value:834.171, label:'VandalWeapon-17' };
// VandalWeapon tuning note 17: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_017 = 507.11; // Hz
export type VandalWeaponVariant17 = 'VandalWeapon-17';
export const VANDALWEAPON_EXTRA_018 = { idx:18, value:494.672, label:'VandalWeapon-18' };
// VandalWeapon tuning note 18: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_018 = 524.98; // Hz
export type VandalWeaponVariant18 = 'VandalWeapon-18';
export const VANDALWEAPON_EXTRA_019 = { idx:19, value:221.641, label:'VandalWeapon-19' };
// VandalWeapon tuning note 19: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_019 = 1140.41; // Hz
export type VandalWeaponVariant19 = 'VandalWeapon-19';
export const VANDALWEAPON_EXTRA_020 = { idx:20, value:304.657, label:'VandalWeapon-20' };
// VandalWeapon tuning note 20: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_020 = 1079.35; // Hz
export type VandalWeaponVariant20 = 'VandalWeapon-20';
export const VANDALWEAPON_EXTRA_021 = { idx:21, value:10.782, label:'VandalWeapon-21' };
// VandalWeapon tuning note 21: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_021 = 797.17; // Hz
export type VandalWeaponVariant21 = 'VandalWeapon-21';
export const VANDALWEAPON_EXTRA_022 = { idx:22, value:68.702, label:'VandalWeapon-22' };
// VandalWeapon tuning note 22: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_022 = 179.20; // Hz
export type VandalWeaponVariant22 = 'VandalWeapon-22';
export const VANDALWEAPON_EXTRA_023 = { idx:23, value:103.784, label:'VandalWeapon-23' };
// VandalWeapon tuning note 23: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_023 = 175.98; // Hz
export type VandalWeaponVariant23 = 'VandalWeapon-23';
export const VANDALWEAPON_EXTRA_024 = { idx:24, value:314.089, label:'VandalWeapon-24' };
// VandalWeapon tuning note 24: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_024 = 178.71; // Hz
export type VandalWeaponVariant24 = 'VandalWeapon-24';
export const VANDALWEAPON_EXTRA_025 = { idx:25, value:3.879, label:'VandalWeapon-25' };
// VandalWeapon tuning note 25: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_025 = 725.67; // Hz
export type VandalWeaponVariant25 = 'VandalWeapon-25';
export const VANDALWEAPON_EXTRA_026 = { idx:26, value:160.898, label:'VandalWeapon-26' };
// VandalWeapon tuning note 26: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_026 = 619.24; // Hz
export type VandalWeaponVariant26 = 'VandalWeapon-26';
export const VANDALWEAPON_EXTRA_027 = { idx:27, value:684.151, label:'VandalWeapon-27' };
// VandalWeapon tuning note 27: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_027 = 155.06; // Hz
export type VandalWeaponVariant27 = 'VandalWeapon-27';
export const VANDALWEAPON_EXTRA_028 = { idx:28, value:130.599, label:'VandalWeapon-28' };
// VandalWeapon tuning note 28: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_028 = 462.68; // Hz
export type VandalWeaponVariant28 = 'VandalWeapon-28';
export const VANDALWEAPON_EXTRA_029 = { idx:29, value:465.541, label:'VandalWeapon-29' };
// VandalWeapon tuning note 29: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_029 = 272.66; // Hz
export type VandalWeaponVariant29 = 'VandalWeapon-29';
export const VANDALWEAPON_EXTRA_030 = { idx:30, value:8.866, label:'VandalWeapon-30' };
// VandalWeapon tuning note 30: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_030 = 712.93; // Hz
export type VandalWeaponVariant30 = 'VandalWeapon-30';
export const VANDALWEAPON_EXTRA_031 = { idx:31, value:387.117, label:'VandalWeapon-31' };
// VandalWeapon tuning note 31: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_031 = 839.00; // Hz
export type VandalWeaponVariant31 = 'VandalWeapon-31';
export const VANDALWEAPON_EXTRA_032 = { idx:32, value:643.475, label:'VandalWeapon-32' };
// VandalWeapon tuning note 32: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_032 = 266.36; // Hz
export type VandalWeaponVariant32 = 'VandalWeapon-32';
export const VANDALWEAPON_EXTRA_033 = { idx:33, value:384.113, label:'VandalWeapon-33' };
// VandalWeapon tuning note 33: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_033 = 1029.66; // Hz
export type VandalWeaponVariant33 = 'VandalWeapon-33';
export const VANDALWEAPON_EXTRA_034 = { idx:34, value:720.411, label:'VandalWeapon-34' };
// VandalWeapon tuning note 34: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_034 = 283.06; // Hz
export type VandalWeaponVariant34 = 'VandalWeapon-34';
export const VANDALWEAPON_EXTRA_035 = { idx:35, value:138.924, label:'VandalWeapon-35' };
// VandalWeapon tuning note 35: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_035 = 1005.03; // Hz
export type VandalWeaponVariant35 = 'VandalWeapon-35';
export const VANDALWEAPON_EXTRA_036 = { idx:36, value:469.655, label:'VandalWeapon-36' };
// VandalWeapon tuning note 36: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_036 = 339.74; // Hz
export type VandalWeaponVariant36 = 'VandalWeapon-36';
export const VANDALWEAPON_EXTRA_037 = { idx:37, value:828.888, label:'VandalWeapon-37' };
// VandalWeapon tuning note 37: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_037 = 591.16; // Hz
export type VandalWeaponVariant37 = 'VandalWeapon-37';
export const VANDALWEAPON_EXTRA_038 = { idx:38, value:674.660, label:'VandalWeapon-38' };
// VandalWeapon tuning note 38: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_038 = 539.22; // Hz
export type VandalWeaponVariant38 = 'VandalWeapon-38';
export const VANDALWEAPON_EXTRA_039 = { idx:39, value:342.728, label:'VandalWeapon-39' };
// VandalWeapon tuning note 39: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_039 = 1134.39; // Hz
export type VandalWeaponVariant39 = 'VandalWeapon-39';
export const VANDALWEAPON_EXTRA_040 = { idx:40, value:157.952, label:'VandalWeapon-40' };
// VandalWeapon tuning note 40: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_040 = 547.08; // Hz
export type VandalWeaponVariant40 = 'VandalWeapon-40';
export const VANDALWEAPON_EXTRA_041 = { idx:41, value:584.516, label:'VandalWeapon-41' };
// VandalWeapon tuning note 41: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_041 = 132.01; // Hz
export type VandalWeaponVariant41 = 'VandalWeapon-41';
export const VANDALWEAPON_EXTRA_042 = { idx:42, value:499.990, label:'VandalWeapon-42' };
// VandalWeapon tuning note 42: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_042 = 683.24; // Hz
export type VandalWeaponVariant42 = 'VandalWeapon-42';
export const VANDALWEAPON_EXTRA_043 = { idx:43, value:465.489, label:'VandalWeapon-43' };
// VandalWeapon tuning note 43: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_043 = 501.74; // Hz
export type VandalWeaponVariant43 = 'VandalWeapon-43';
export const VANDALWEAPON_EXTRA_044 = { idx:44, value:560.166, label:'VandalWeapon-44' };
// VandalWeapon tuning note 44: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_044 = 644.05; // Hz
export type VandalWeaponVariant44 = 'VandalWeapon-44';
export const VANDALWEAPON_EXTRA_045 = { idx:45, value:517.960, label:'VandalWeapon-45' };
// VandalWeapon tuning note 45: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_045 = 509.61; // Hz
export type VandalWeaponVariant45 = 'VandalWeapon-45';
export const VANDALWEAPON_EXTRA_046 = { idx:46, value:205.819, label:'VandalWeapon-46' };
// VandalWeapon tuning note 46: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_046 = 1060.60; // Hz
export type VandalWeaponVariant46 = 'VandalWeapon-46';
export const VANDALWEAPON_EXTRA_047 = { idx:47, value:960.176, label:'VandalWeapon-47' };
// VandalWeapon tuning note 47: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_047 = 1145.91; // Hz
export type VandalWeaponVariant47 = 'VandalWeapon-47';
export const VANDALWEAPON_EXTRA_048 = { idx:48, value:845.056, label:'VandalWeapon-48' };
// VandalWeapon tuning note 48: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_048 = 891.03; // Hz
export type VandalWeaponVariant48 = 'VandalWeapon-48';
export const VANDALWEAPON_EXTRA_049 = { idx:49, value:946.137, label:'VandalWeapon-49' };
// VandalWeapon tuning note 49: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_049 = 262.51; // Hz
export type VandalWeaponVariant49 = 'VandalWeapon-49';
export const VANDALWEAPON_EXTRA_050 = { idx:50, value:534.627, label:'VandalWeapon-50' };
// VandalWeapon tuning note 50: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_050 = 720.37; // Hz
export type VandalWeaponVariant50 = 'VandalWeapon-50';
export const VANDALWEAPON_EXTRA_051 = { idx:51, value:617.122, label:'VandalWeapon-51' };
// VandalWeapon tuning note 51: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_051 = 939.42; // Hz
export type VandalWeaponVariant51 = 'VandalWeapon-51';
export const VANDALWEAPON_EXTRA_052 = { idx:52, value:505.927, label:'VandalWeapon-52' };
// VandalWeapon tuning note 52: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_052 = 496.02; // Hz
export type VandalWeaponVariant52 = 'VandalWeapon-52';
export const VANDALWEAPON_EXTRA_053 = { idx:53, value:934.591, label:'VandalWeapon-53' };
// VandalWeapon tuning note 53: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_053 = 234.59; // Hz
export type VandalWeaponVariant53 = 'VandalWeapon-53';
export const VANDALWEAPON_EXTRA_054 = { idx:54, value:45.856, label:'VandalWeapon-54' };
// VandalWeapon tuning note 54: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_054 = 746.98; // Hz
export type VandalWeaponVariant54 = 'VandalWeapon-54';
export const VANDALWEAPON_EXTRA_055 = { idx:55, value:709.450, label:'VandalWeapon-55' };
// VandalWeapon tuning note 55: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_055 = 549.15; // Hz
export type VandalWeaponVariant55 = 'VandalWeapon-55';
export const VANDALWEAPON_EXTRA_056 = { idx:56, value:832.627, label:'VandalWeapon-56' };
// VandalWeapon tuning note 56: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_056 = 190.74; // Hz
export type VandalWeaponVariant56 = 'VandalWeapon-56';
export const VANDALWEAPON_EXTRA_057 = { idx:57, value:149.817, label:'VandalWeapon-57' };
// VandalWeapon tuning note 57: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_057 = 637.57; // Hz
export type VandalWeaponVariant57 = 'VandalWeapon-57';
export const VANDALWEAPON_EXTRA_058 = { idx:58, value:535.474, label:'VandalWeapon-58' };
// VandalWeapon tuning note 58: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_058 = 426.20; // Hz
export type VandalWeaponVariant58 = 'VandalWeapon-58';
export const VANDALWEAPON_EXTRA_059 = { idx:59, value:347.962, label:'VandalWeapon-59' };
// VandalWeapon tuning note 59: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_059 = 527.09; // Hz
export type VandalWeaponVariant59 = 'VandalWeapon-59';
export const VANDALWEAPON_EXTRA_060 = { idx:60, value:217.172, label:'VandalWeapon-60' };
// VandalWeapon tuning note 60: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_060 = 809.20; // Hz
export type VandalWeaponVariant60 = 'VandalWeapon-60';
export const VANDALWEAPON_EXTRA_061 = { idx:61, value:474.104, label:'VandalWeapon-61' };
// VandalWeapon tuning note 61: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_061 = 368.79; // Hz
export type VandalWeaponVariant61 = 'VandalWeapon-61';
export const VANDALWEAPON_EXTRA_062 = { idx:62, value:434.681, label:'VandalWeapon-62' };
// VandalWeapon tuning note 62: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_062 = 820.93; // Hz
export type VandalWeaponVariant62 = 'VandalWeapon-62';
export const VANDALWEAPON_EXTRA_063 = { idx:63, value:375.626, label:'VandalWeapon-63' };
// VandalWeapon tuning note 63: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_063 = 555.24; // Hz
export type VandalWeaponVariant63 = 'VandalWeapon-63';
export const VANDALWEAPON_EXTRA_064 = { idx:64, value:286.300, label:'VandalWeapon-64' };
// VandalWeapon tuning note 64: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_064 = 311.33; // Hz
export type VandalWeaponVariant64 = 'VandalWeapon-64';
export const VANDALWEAPON_EXTRA_065 = { idx:65, value:645.364, label:'VandalWeapon-65' };
// VandalWeapon tuning note 65: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_065 = 215.77; // Hz
export type VandalWeaponVariant65 = 'VandalWeapon-65';
export const VANDALWEAPON_EXTRA_066 = { idx:66, value:777.277, label:'VandalWeapon-66' };
// VandalWeapon tuning note 66: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_066 = 507.08; // Hz
export type VandalWeaponVariant66 = 'VandalWeapon-66';
export const VANDALWEAPON_EXTRA_067 = { idx:67, value:503.092, label:'VandalWeapon-67' };
// VandalWeapon tuning note 67: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_067 = 810.85; // Hz
export type VandalWeaponVariant67 = 'VandalWeapon-67';
export const VANDALWEAPON_EXTRA_068 = { idx:68, value:969.834, label:'VandalWeapon-68' };
// VandalWeapon tuning note 68: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_068 = 602.54; // Hz
export type VandalWeaponVariant68 = 'VandalWeapon-68';
export const VANDALWEAPON_EXTRA_069 = { idx:69, value:65.325, label:'VandalWeapon-69' };
// VandalWeapon tuning note 69: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_069 = 708.84; // Hz
export type VandalWeaponVariant69 = 'VandalWeapon-69';
export const VANDALWEAPON_EXTRA_070 = { idx:70, value:333.187, label:'VandalWeapon-70' };
// VandalWeapon tuning note 70: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_070 = 330.30; // Hz
export type VandalWeaponVariant70 = 'VandalWeapon-70';
export const VANDALWEAPON_EXTRA_071 = { idx:71, value:898.576, label:'VandalWeapon-71' };
// VandalWeapon tuning note 71: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_071 = 138.06; // Hz
export type VandalWeaponVariant71 = 'VandalWeapon-71';
export const VANDALWEAPON_EXTRA_072 = { idx:72, value:793.166, label:'VandalWeapon-72' };
// VandalWeapon tuning note 72: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_072 = 324.08; // Hz
export type VandalWeaponVariant72 = 'VandalWeapon-72';
export const VANDALWEAPON_EXTRA_073 = { idx:73, value:190.643, label:'VandalWeapon-73' };
// VandalWeapon tuning note 73: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_073 = 1018.01; // Hz
export type VandalWeaponVariant73 = 'VandalWeapon-73';
export const VANDALWEAPON_EXTRA_074 = { idx:74, value:251.086, label:'VandalWeapon-74' };
// VandalWeapon tuning note 74: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_074 = 701.26; // Hz
export type VandalWeaponVariant74 = 'VandalWeapon-74';
export const VANDALWEAPON_EXTRA_075 = { idx:75, value:274.896, label:'VandalWeapon-75' };
// VandalWeapon tuning note 75: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_075 = 99.91; // Hz
export type VandalWeaponVariant75 = 'VandalWeapon-75';
export const VANDALWEAPON_EXTRA_076 = { idx:76, value:737.869, label:'VandalWeapon-76' };
// VandalWeapon tuning note 76: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_076 = 199.05; // Hz
export type VandalWeaponVariant76 = 'VandalWeapon-76';
export const VANDALWEAPON_EXTRA_077 = { idx:77, value:973.923, label:'VandalWeapon-77' };
// VandalWeapon tuning note 77: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_077 = 671.32; // Hz
export type VandalWeaponVariant77 = 'VandalWeapon-77';
export const VANDALWEAPON_EXTRA_078 = { idx:78, value:973.427, label:'VandalWeapon-78' };
// VandalWeapon tuning note 78: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_078 = 334.82; // Hz
export type VandalWeaponVariant78 = 'VandalWeapon-78';
export const VANDALWEAPON_EXTRA_079 = { idx:79, value:264.650, label:'VandalWeapon-79' };
// VandalWeapon tuning note 79: ensures deterministic recoil and audio sync
export const VANDALWEAPON_AUDIO_079 = 108.69; // Hz
export type VandalWeaponVariant79 = 'VandalWeapon-79';

// padding line 0 — VandalWeapon.ts — Ring-07
// padding line 1 — VandalWeapon.ts — Ring-07
// padding line 2 — VandalWeapon.ts — Ring-07
