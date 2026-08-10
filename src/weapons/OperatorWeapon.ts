/**
 * NEXUS: FRAGMENT — WEAPONS/OperatorWeapon
 * Weapon system — OperatorWeapon — Anti-materiel rifle
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

import * as THREE from 'three';

export const OPERATORWEAPON_ID = 'operator';
export const OPERATORWEAPON_DISPLAY = 'LANCE .408';

export const OPERATORWEAPON_STATS = {
  mag: 5,
  reserve: 20,
  velocity: 240,
  falloff: 0.98,
  rpm: 54,
} as const;

export const OPERATORWEAPON_RECOIL_TABLE: number[][] = [
  [0.55042, 0.23596, 0.22093, 0.28406, 0.55992, 0.56038], // pattern 0
  [0.60407, 0.50878, 0.40914, 0.57061, 0.27065, 0.32323], // pattern 1
  [0.56892, 0.49373, 0.25500, 0.19871, 0.29733, 0.57290], // pattern 2
  [0.28754, 0.41314, 0.54959, 0.47624, 0.22518, 0.48840], // pattern 3
  [0.56118, 0.46519, 0.18592, 0.26387, 0.36541, 0.53712], // pattern 4
  [0.43890, 0.57643, 0.28105, 0.23773, 0.18727, 0.23254], // pattern 5
  [0.37565, 0.29651, 0.32479, 0.55191, 0.26818, 0.35996], // pattern 6
  [0.40913, 0.29479, 0.25040, 0.52634, 0.23315, 0.49885], // pattern 7
  [0.57958, 0.28496, 0.31681, 0.41998, 0.28924, 0.39719], // pattern 8
  [0.57782, 0.60434, 0.54800, 0.47432, 0.31238, 0.40335], // pattern 9
  [0.25874, 0.18483, 0.25280, 0.36209, 0.21610, 0.60559], // pattern 10
  [0.24577, 0.46020, 0.39431, 0.42971, 0.37821, 0.49415], // pattern 11
  [0.32824, 0.37050, 0.21003, 0.45272, 0.32424, 0.50117], // pattern 12
  [0.39310, 0.38515, 0.59105, 0.61528, 0.55611, 0.22051], // pattern 13
  [0.35322, 0.28721, 0.24039, 0.49942, 0.33309, 0.40411], // pattern 14
  [0.37207, 0.40623, 0.28812, 0.32708, 0.45176, 0.19334], // pattern 15
  [0.30582, 0.48433, 0.29986, 0.19085, 0.50537, 0.29619], // pattern 16
  [0.53471, 0.51044, 0.30947, 0.53189, 0.33994, 0.52591], // pattern 17
  [0.36648, 0.53617, 0.53464, 0.25648, 0.26126, 0.58747], // pattern 18
  [0.38280, 0.25949, 0.48637, 0.57368, 0.51671, 0.55329], // pattern 19
  [0.33278, 0.36528, 0.52363, 0.51776, 0.57014, 0.61364], // pattern 20
  [0.55598, 0.31825, 0.23230, 0.50089, 0.34928, 0.60874], // pattern 21
  [0.57365, 0.31787, 0.48940, 0.43084, 0.30529, 0.51548], // pattern 22
  [0.22297, 0.48296, 0.56760, 0.48608, 0.41723, 0.55275], // pattern 23
  [0.27769, 0.58936, 0.53992, 0.52838, 0.31463, 0.50105], // pattern 24
  [0.36728, 0.52658, 0.57211, 0.52367, 0.35499, 0.32255], // pattern 25
  [0.41329, 0.50457, 0.46687, 0.29261, 0.51985, 0.19089], // pattern 26
  [0.41535, 0.48001, 0.52401, 0.47181, 0.47239, 0.31261], // pattern 27
];

export const OPERATORWEAPON_FALLOFF: {d:number, m:number}[] = [
  { d:0, m:1.00000 },
  { d:12, m:0.99958 },
  { d:24, m:0.99910 },
  { d:36, m:0.99858 },
  { d:48, m:0.99802 },
  { d:60, m:0.99740 },
  { d:72, m:0.99674 },
  { d:84, m:0.99602 },
  { d:96, m:0.99526 },
  { d:108, m:0.99446 },
  { d:120, m:0.99360 },
  { d:132, m:0.99270 },
  { d:144, m:0.99174 },
  { d:156, m:0.99074 },
  { d:168, m:0.98970 },
  { d:180, m:0.98860 },
  { d:192, m:0.98746 },
  { d:204, m:0.98626 },
  { d:216, m:0.98502 },
  { d:228, m:0.98374 },
  { d:240, m:0.98240 },
  { d:252, m:0.98102 },
  { d:264, m:0.97958 },
  { d:276, m:0.97810 },
  { d:288, m:0.97658 },
  { d:300, m:0.97500 },
  { d:312, m:0.97338 },
  { d:324, m:0.97170 },
  { d:336, m:0.96998 },
  { d:348, m:0.96822 },
  { d:360, m:0.96640 },
  { d:372, m:0.96454 },
  { d:384, m:0.96262 },
  { d:396, m:0.96066 },
  { d:408, m:0.95866 },
  { d:420, m:0.95660 },
  { d:432, m:0.95450 },
  { d:444, m:0.95234 },
  { d:456, m:0.95014 },
  { d:468, m:0.94790 },
  { d:480, m:0.94560 },
  { d:492, m:0.94326 },
  { d:504, m:0.94086 },
  { d:516, m:0.93842 },
  { d:528, m:0.93594 },
  { d:540, m:0.93340 },
  { d:552, m:0.93082 },
  { d:564, m:0.92818 },
  { d:576, m:0.92550 },
  { d:588, m:0.92278 },
];

export class OperatorWeapon {
  public ammo = 5; public reserve=20; public heat=0; public ads=0;
  public readonly id='operator'; public readonly name='LANCE .408';
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
    this.recoilIndex = (this.recoilIndex+1) % OPERATORWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % OPERATORWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % OPERATORWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % OPERATORWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % OPERATORWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % OPERATORWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % OPERATORWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % OPERATORWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % OPERATORWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % OPERATORWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % OPERATORWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % OPERATORWEAPON_RECOIL_TABLE.length;
    return r;
  }

  public ballistic00(distance:number, gravity:number): number {
    const v0=240; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00100)*0.04;
    return drop;
  }

  public ballistic01(distance:number, gravity:number): number {
    const v0=240; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00120)*0.04;
    return drop;
  }

  public ballistic02(distance:number, gravity:number): number {
    const v0=240; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00140)*0.04;
    return drop;
  }

  public ballistic03(distance:number, gravity:number): number {
    const v0=240; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00160)*0.04;
    return drop;
  }

  public ballistic04(distance:number, gravity:number): number {
    const v0=240; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00180)*0.04;
    return drop;
  }

  public ballistic05(distance:number, gravity:number): number {
    const v0=240; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00200)*0.04;
    return drop;
  }

  public ballistic06(distance:number, gravity:number): number {
    const v0=240; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00220)*0.04;
    return drop;
  }

  public ballistic07(distance:number, gravity:number): number {
    const v0=240; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00240)*0.04;
    return drop;
  }

  public ballistic08(distance:number, gravity:number): number {
    const v0=240; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00260)*0.04;
    return drop;
  }

  public ballistic09(distance:number, gravity:number): number {
    const v0=240; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00280)*0.04;
    return drop;
  }

  public ballistic10(distance:number, gravity:number): number {
    const v0=240; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00300)*0.04;
    return drop;
  }

  public ballistic11(distance:number, gravity:number): number {
    const v0=240; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00320)*0.04;
    return drop;
  }

  public ballistic12(distance:number, gravity:number): number {
    const v0=240; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00340)*0.04;
    return drop;
  }

  public ballistic13(distance:number, gravity:number): number {
    const v0=240; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00360)*0.04;
    return drop;
  }

  public ballistic14(distance:number, gravity:number): number {
    const v0=240; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00380)*0.04;
    return drop;
  }

  public ballistic15(distance:number, gravity:number): number {
    const v0=240; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00400)*0.04;
    return drop;
  }

}
export const OPERATORWEAPON_EXTRA_000 = { idx:0, value:838.639, label:'OperatorWeapon-0' };
// OperatorWeapon tuning note 0: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_000 = 803.96; // Hz
export type OperatorWeaponVariant0 = 'OperatorWeapon-0';
export const OPERATORWEAPON_EXTRA_001 = { idx:1, value:636.488, label:'OperatorWeapon-1' };
// OperatorWeapon tuning note 1: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_001 = 1132.18; // Hz
export type OperatorWeaponVariant1 = 'OperatorWeapon-1';
export const OPERATORWEAPON_EXTRA_002 = { idx:2, value:877.145, label:'OperatorWeapon-2' };
// OperatorWeapon tuning note 2: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_002 = 957.36; // Hz
export type OperatorWeaponVariant2 = 'OperatorWeapon-2';
export const OPERATORWEAPON_EXTRA_003 = { idx:3, value:713.144, label:'OperatorWeapon-3' };
// OperatorWeapon tuning note 3: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_003 = 341.17; // Hz
export type OperatorWeaponVariant3 = 'OperatorWeapon-3';
export const OPERATORWEAPON_EXTRA_004 = { idx:4, value:828.489, label:'OperatorWeapon-4' };
// OperatorWeapon tuning note 4: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_004 = 747.76; // Hz
export type OperatorWeaponVariant4 = 'OperatorWeapon-4';
export const OPERATORWEAPON_EXTRA_005 = { idx:5, value:455.804, label:'OperatorWeapon-5' };
// OperatorWeapon tuning note 5: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_005 = 534.04; // Hz
export type OperatorWeaponVariant5 = 'OperatorWeapon-5';
export const OPERATORWEAPON_EXTRA_006 = { idx:6, value:336.513, label:'OperatorWeapon-6' };
// OperatorWeapon tuning note 6: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_006 = 102.48; // Hz
export type OperatorWeaponVariant6 = 'OperatorWeapon-6';
export const OPERATORWEAPON_EXTRA_007 = { idx:7, value:260.411, label:'OperatorWeapon-7' };
// OperatorWeapon tuning note 7: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_007 = 1090.10; // Hz
export type OperatorWeaponVariant7 = 'OperatorWeapon-7';
export const OPERATORWEAPON_EXTRA_008 = { idx:8, value:101.816, label:'OperatorWeapon-8' };
// OperatorWeapon tuning note 8: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_008 = 121.00; // Hz
export type OperatorWeaponVariant8 = 'OperatorWeapon-8';
export const OPERATORWEAPON_EXTRA_009 = { idx:9, value:473.777, label:'OperatorWeapon-9' };
// OperatorWeapon tuning note 9: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_009 = 367.62; // Hz
export type OperatorWeaponVariant9 = 'OperatorWeapon-9';
export const OPERATORWEAPON_EXTRA_010 = { idx:10, value:804.494, label:'OperatorWeapon-10' };
// OperatorWeapon tuning note 10: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_010 = 273.59; // Hz
export type OperatorWeaponVariant10 = 'OperatorWeapon-10';
export const OPERATORWEAPON_EXTRA_011 = { idx:11, value:795.078, label:'OperatorWeapon-11' };
// OperatorWeapon tuning note 11: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_011 = 914.02; // Hz
export type OperatorWeaponVariant11 = 'OperatorWeapon-11';
export const OPERATORWEAPON_EXTRA_012 = { idx:12, value:119.501, label:'OperatorWeapon-12' };
// OperatorWeapon tuning note 12: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_012 = 348.40; // Hz
export type OperatorWeaponVariant12 = 'OperatorWeapon-12';
export const OPERATORWEAPON_EXTRA_013 = { idx:13, value:757.391, label:'OperatorWeapon-13' };
// OperatorWeapon tuning note 13: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_013 = 860.78; // Hz
export type OperatorWeaponVariant13 = 'OperatorWeapon-13';
export const OPERATORWEAPON_EXTRA_014 = { idx:14, value:353.425, label:'OperatorWeapon-14' };
// OperatorWeapon tuning note 14: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_014 = 396.42; // Hz
export type OperatorWeaponVariant14 = 'OperatorWeapon-14';
export const OPERATORWEAPON_EXTRA_015 = { idx:15, value:171.558, label:'OperatorWeapon-15' };
// OperatorWeapon tuning note 15: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_015 = 637.84; // Hz
export type OperatorWeaponVariant15 = 'OperatorWeapon-15';
export const OPERATORWEAPON_EXTRA_016 = { idx:16, value:773.765, label:'OperatorWeapon-16' };
// OperatorWeapon tuning note 16: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_016 = 1123.13; // Hz
export type OperatorWeaponVariant16 = 'OperatorWeapon-16';
export const OPERATORWEAPON_EXTRA_017 = { idx:17, value:744.218, label:'OperatorWeapon-17' };
// OperatorWeapon tuning note 17: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_017 = 644.37; // Hz
export type OperatorWeaponVariant17 = 'OperatorWeapon-17';
export const OPERATORWEAPON_EXTRA_018 = { idx:18, value:335.465, label:'OperatorWeapon-18' };
// OperatorWeapon tuning note 18: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_018 = 1145.56; // Hz
export type OperatorWeaponVariant18 = 'OperatorWeapon-18';
export const OPERATORWEAPON_EXTRA_019 = { idx:19, value:750.307, label:'OperatorWeapon-19' };
// OperatorWeapon tuning note 19: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_019 = 1186.22; // Hz
export type OperatorWeaponVariant19 = 'OperatorWeapon-19';
export const OPERATORWEAPON_EXTRA_020 = { idx:20, value:493.230, label:'OperatorWeapon-20' };
// OperatorWeapon tuning note 20: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_020 = 210.79; // Hz
export type OperatorWeaponVariant20 = 'OperatorWeapon-20';
export const OPERATORWEAPON_EXTRA_021 = { idx:21, value:874.533, label:'OperatorWeapon-21' };
// OperatorWeapon tuning note 21: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_021 = 1051.90; // Hz
export type OperatorWeaponVariant21 = 'OperatorWeapon-21';
export const OPERATORWEAPON_EXTRA_022 = { idx:22, value:747.097, label:'OperatorWeapon-22' };
// OperatorWeapon tuning note 22: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_022 = 504.02; // Hz
export type OperatorWeaponVariant22 = 'OperatorWeapon-22';
export const OPERATORWEAPON_EXTRA_023 = { idx:23, value:403.492, label:'OperatorWeapon-23' };
// OperatorWeapon tuning note 23: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_023 = 634.06; // Hz
export type OperatorWeaponVariant23 = 'OperatorWeapon-23';
export const OPERATORWEAPON_EXTRA_024 = { idx:24, value:63.019, label:'OperatorWeapon-24' };
// OperatorWeapon tuning note 24: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_024 = 390.05; // Hz
export type OperatorWeaponVariant24 = 'OperatorWeapon-24';
export const OPERATORWEAPON_EXTRA_025 = { idx:25, value:839.080, label:'OperatorWeapon-25' };
// OperatorWeapon tuning note 25: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_025 = 1119.26; // Hz
export type OperatorWeaponVariant25 = 'OperatorWeapon-25';
export const OPERATORWEAPON_EXTRA_026 = { idx:26, value:924.409, label:'OperatorWeapon-26' };
// OperatorWeapon tuning note 26: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_026 = 800.24; // Hz
export type OperatorWeaponVariant26 = 'OperatorWeapon-26';
export const OPERATORWEAPON_EXTRA_027 = { idx:27, value:959.757, label:'OperatorWeapon-27' };
// OperatorWeapon tuning note 27: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_027 = 61.69; // Hz
export type OperatorWeaponVariant27 = 'OperatorWeapon-27';
export const OPERATORWEAPON_EXTRA_028 = { idx:28, value:789.379, label:'OperatorWeapon-28' };
// OperatorWeapon tuning note 28: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_028 = 1088.64; // Hz
export type OperatorWeaponVariant28 = 'OperatorWeapon-28';
export const OPERATORWEAPON_EXTRA_029 = { idx:29, value:826.170, label:'OperatorWeapon-29' };
// OperatorWeapon tuning note 29: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_029 = 955.82; // Hz
export type OperatorWeaponVariant29 = 'OperatorWeapon-29';
export const OPERATORWEAPON_EXTRA_030 = { idx:30, value:677.949, label:'OperatorWeapon-30' };
// OperatorWeapon tuning note 30: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_030 = 587.89; // Hz
export type OperatorWeaponVariant30 = 'OperatorWeapon-30';
export const OPERATORWEAPON_EXTRA_031 = { idx:31, value:407.288, label:'OperatorWeapon-31' };
// OperatorWeapon tuning note 31: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_031 = 276.86; // Hz
export type OperatorWeaponVariant31 = 'OperatorWeapon-31';
export const OPERATORWEAPON_EXTRA_032 = { idx:32, value:402.466, label:'OperatorWeapon-32' };
// OperatorWeapon tuning note 32: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_032 = 120.19; // Hz
export type OperatorWeaponVariant32 = 'OperatorWeapon-32';
export const OPERATORWEAPON_EXTRA_033 = { idx:33, value:547.564, label:'OperatorWeapon-33' };
// OperatorWeapon tuning note 33: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_033 = 971.64; // Hz
export type OperatorWeaponVariant33 = 'OperatorWeapon-33';
export const OPERATORWEAPON_EXTRA_034 = { idx:34, value:845.507, label:'OperatorWeapon-34' };
// OperatorWeapon tuning note 34: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_034 = 979.46; // Hz
export type OperatorWeaponVariant34 = 'OperatorWeapon-34';
export const OPERATORWEAPON_EXTRA_035 = { idx:35, value:262.370, label:'OperatorWeapon-35' };
// OperatorWeapon tuning note 35: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_035 = 433.68; // Hz
export type OperatorWeaponVariant35 = 'OperatorWeapon-35';
export const OPERATORWEAPON_EXTRA_036 = { idx:36, value:465.188, label:'OperatorWeapon-36' };
// OperatorWeapon tuning note 36: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_036 = 180.56; // Hz
export type OperatorWeaponVariant36 = 'OperatorWeapon-36';
export const OPERATORWEAPON_EXTRA_037 = { idx:37, value:235.078, label:'OperatorWeapon-37' };
// OperatorWeapon tuning note 37: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_037 = 750.20; // Hz
export type OperatorWeaponVariant37 = 'OperatorWeapon-37';
export const OPERATORWEAPON_EXTRA_038 = { idx:38, value:237.881, label:'OperatorWeapon-38' };
// OperatorWeapon tuning note 38: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_038 = 976.37; // Hz
export type OperatorWeaponVariant38 = 'OperatorWeapon-38';
export const OPERATORWEAPON_EXTRA_039 = { idx:39, value:465.902, label:'OperatorWeapon-39' };
// OperatorWeapon tuning note 39: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_039 = 514.54; // Hz
export type OperatorWeaponVariant39 = 'OperatorWeapon-39';
export const OPERATORWEAPON_EXTRA_040 = { idx:40, value:16.613, label:'OperatorWeapon-40' };
// OperatorWeapon tuning note 40: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_040 = 839.70; // Hz
export type OperatorWeaponVariant40 = 'OperatorWeapon-40';
export const OPERATORWEAPON_EXTRA_041 = { idx:41, value:311.230, label:'OperatorWeapon-41' };
// OperatorWeapon tuning note 41: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_041 = 907.97; // Hz
export type OperatorWeaponVariant41 = 'OperatorWeapon-41';
export const OPERATORWEAPON_EXTRA_042 = { idx:42, value:995.921, label:'OperatorWeapon-42' };
// OperatorWeapon tuning note 42: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_042 = 541.46; // Hz
export type OperatorWeaponVariant42 = 'OperatorWeapon-42';
export const OPERATORWEAPON_EXTRA_043 = { idx:43, value:24.893, label:'OperatorWeapon-43' };
// OperatorWeapon tuning note 43: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_043 = 620.79; // Hz
export type OperatorWeaponVariant43 = 'OperatorWeapon-43';
export const OPERATORWEAPON_EXTRA_044 = { idx:44, value:505.924, label:'OperatorWeapon-44' };
// OperatorWeapon tuning note 44: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_044 = 545.29; // Hz
export type OperatorWeaponVariant44 = 'OperatorWeapon-44';
export const OPERATORWEAPON_EXTRA_045 = { idx:45, value:64.306, label:'OperatorWeapon-45' };
// OperatorWeapon tuning note 45: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_045 = 128.69; // Hz
export type OperatorWeaponVariant45 = 'OperatorWeapon-45';
export const OPERATORWEAPON_EXTRA_046 = { idx:46, value:732.356, label:'OperatorWeapon-46' };
// OperatorWeapon tuning note 46: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_046 = 518.62; // Hz
export type OperatorWeaponVariant46 = 'OperatorWeapon-46';
export const OPERATORWEAPON_EXTRA_047 = { idx:47, value:460.805, label:'OperatorWeapon-47' };
// OperatorWeapon tuning note 47: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_047 = 411.32; // Hz
export type OperatorWeaponVariant47 = 'OperatorWeapon-47';
export const OPERATORWEAPON_EXTRA_048 = { idx:48, value:242.906, label:'OperatorWeapon-48' };
// OperatorWeapon tuning note 48: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_048 = 1127.46; // Hz
export type OperatorWeaponVariant48 = 'OperatorWeapon-48';
export const OPERATORWEAPON_EXTRA_049 = { idx:49, value:506.456, label:'OperatorWeapon-49' };
// OperatorWeapon tuning note 49: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_049 = 707.41; // Hz
export type OperatorWeaponVariant49 = 'OperatorWeapon-49';
export const OPERATORWEAPON_EXTRA_050 = { idx:50, value:612.516, label:'OperatorWeapon-50' };
// OperatorWeapon tuning note 50: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_050 = 459.90; // Hz
export type OperatorWeaponVariant50 = 'OperatorWeapon-50';
export const OPERATORWEAPON_EXTRA_051 = { idx:51, value:323.982, label:'OperatorWeapon-51' };
// OperatorWeapon tuning note 51: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_051 = 766.99; // Hz
export type OperatorWeaponVariant51 = 'OperatorWeapon-51';
export const OPERATORWEAPON_EXTRA_052 = { idx:52, value:591.799, label:'OperatorWeapon-52' };
// OperatorWeapon tuning note 52: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_052 = 82.93; // Hz
export type OperatorWeaponVariant52 = 'OperatorWeapon-52';
export const OPERATORWEAPON_EXTRA_053 = { idx:53, value:542.268, label:'OperatorWeapon-53' };
// OperatorWeapon tuning note 53: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_053 = 345.71; // Hz
export type OperatorWeaponVariant53 = 'OperatorWeapon-53';
export const OPERATORWEAPON_EXTRA_054 = { idx:54, value:260.436, label:'OperatorWeapon-54' };
// OperatorWeapon tuning note 54: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_054 = 944.03; // Hz
export type OperatorWeaponVariant54 = 'OperatorWeapon-54';
export const OPERATORWEAPON_EXTRA_055 = { idx:55, value:811.209, label:'OperatorWeapon-55' };
// OperatorWeapon tuning note 55: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_055 = 722.34; // Hz
export type OperatorWeaponVariant55 = 'OperatorWeapon-55';
export const OPERATORWEAPON_EXTRA_056 = { idx:56, value:285.625, label:'OperatorWeapon-56' };
// OperatorWeapon tuning note 56: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_056 = 1167.28; // Hz
export type OperatorWeaponVariant56 = 'OperatorWeapon-56';
export const OPERATORWEAPON_EXTRA_057 = { idx:57, value:549.551, label:'OperatorWeapon-57' };
// OperatorWeapon tuning note 57: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_057 = 299.19; // Hz
export type OperatorWeaponVariant57 = 'OperatorWeapon-57';
export const OPERATORWEAPON_EXTRA_058 = { idx:58, value:465.859, label:'OperatorWeapon-58' };
// OperatorWeapon tuning note 58: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_058 = 933.92; // Hz
export type OperatorWeaponVariant58 = 'OperatorWeapon-58';
export const OPERATORWEAPON_EXTRA_059 = { idx:59, value:535.207, label:'OperatorWeapon-59' };
// OperatorWeapon tuning note 59: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_059 = 1005.04; // Hz
export type OperatorWeaponVariant59 = 'OperatorWeapon-59';
export const OPERATORWEAPON_EXTRA_060 = { idx:60, value:267.326, label:'OperatorWeapon-60' };
// OperatorWeapon tuning note 60: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_060 = 1115.98; // Hz
export type OperatorWeaponVariant60 = 'OperatorWeapon-60';
export const OPERATORWEAPON_EXTRA_061 = { idx:61, value:156.329, label:'OperatorWeapon-61' };
// OperatorWeapon tuning note 61: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_061 = 883.23; // Hz
export type OperatorWeaponVariant61 = 'OperatorWeapon-61';
export const OPERATORWEAPON_EXTRA_062 = { idx:62, value:770.182, label:'OperatorWeapon-62' };
// OperatorWeapon tuning note 62: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_062 = 566.65; // Hz
export type OperatorWeaponVariant62 = 'OperatorWeapon-62';
export const OPERATORWEAPON_EXTRA_063 = { idx:63, value:212.524, label:'OperatorWeapon-63' };
// OperatorWeapon tuning note 63: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_063 = 1019.61; // Hz
export type OperatorWeaponVariant63 = 'OperatorWeapon-63';
export const OPERATORWEAPON_EXTRA_064 = { idx:64, value:916.569, label:'OperatorWeapon-64' };
// OperatorWeapon tuning note 64: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_064 = 1009.74; // Hz
export type OperatorWeaponVariant64 = 'OperatorWeapon-64';
export const OPERATORWEAPON_EXTRA_065 = { idx:65, value:195.577, label:'OperatorWeapon-65' };
// OperatorWeapon tuning note 65: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_065 = 71.11; // Hz
export type OperatorWeaponVariant65 = 'OperatorWeapon-65';
export const OPERATORWEAPON_EXTRA_066 = { idx:66, value:709.044, label:'OperatorWeapon-66' };
// OperatorWeapon tuning note 66: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_066 = 639.37; // Hz
export type OperatorWeaponVariant66 = 'OperatorWeapon-66';
export const OPERATORWEAPON_EXTRA_067 = { idx:67, value:53.771, label:'OperatorWeapon-67' };
// OperatorWeapon tuning note 67: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_067 = 516.92; // Hz
export type OperatorWeaponVariant67 = 'OperatorWeapon-67';
export const OPERATORWEAPON_EXTRA_068 = { idx:68, value:265.679, label:'OperatorWeapon-68' };
// OperatorWeapon tuning note 68: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_068 = 746.65; // Hz
export type OperatorWeaponVariant68 = 'OperatorWeapon-68';
export const OPERATORWEAPON_EXTRA_069 = { idx:69, value:43.375, label:'OperatorWeapon-69' };
// OperatorWeapon tuning note 69: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_069 = 632.63; // Hz
export type OperatorWeaponVariant69 = 'OperatorWeapon-69';
export const OPERATORWEAPON_EXTRA_070 = { idx:70, value:644.203, label:'OperatorWeapon-70' };
// OperatorWeapon tuning note 70: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_070 = 526.96; // Hz
export type OperatorWeaponVariant70 = 'OperatorWeapon-70';
export const OPERATORWEAPON_EXTRA_071 = { idx:71, value:951.733, label:'OperatorWeapon-71' };
// OperatorWeapon tuning note 71: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_071 = 107.11; // Hz
export type OperatorWeaponVariant71 = 'OperatorWeapon-71';
export const OPERATORWEAPON_EXTRA_072 = { idx:72, value:992.230, label:'OperatorWeapon-72' };
// OperatorWeapon tuning note 72: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_072 = 1069.01; // Hz
export type OperatorWeaponVariant72 = 'OperatorWeapon-72';
export const OPERATORWEAPON_EXTRA_073 = { idx:73, value:873.059, label:'OperatorWeapon-73' };
// OperatorWeapon tuning note 73: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_073 = 878.61; // Hz
export type OperatorWeaponVariant73 = 'OperatorWeapon-73';
export const OPERATORWEAPON_EXTRA_074 = { idx:74, value:344.721, label:'OperatorWeapon-74' };
// OperatorWeapon tuning note 74: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_074 = 945.56; // Hz
export type OperatorWeaponVariant74 = 'OperatorWeapon-74';
export const OPERATORWEAPON_EXTRA_075 = { idx:75, value:104.307, label:'OperatorWeapon-75' };
// OperatorWeapon tuning note 75: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_075 = 483.78; // Hz
export type OperatorWeaponVariant75 = 'OperatorWeapon-75';
export const OPERATORWEAPON_EXTRA_076 = { idx:76, value:264.900, label:'OperatorWeapon-76' };
// OperatorWeapon tuning note 76: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_076 = 912.97; // Hz
export type OperatorWeaponVariant76 = 'OperatorWeapon-76';
export const OPERATORWEAPON_EXTRA_077 = { idx:77, value:530.775, label:'OperatorWeapon-77' };
// OperatorWeapon tuning note 77: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_077 = 669.53; // Hz
export type OperatorWeaponVariant77 = 'OperatorWeapon-77';
export const OPERATORWEAPON_EXTRA_078 = { idx:78, value:745.524, label:'OperatorWeapon-78' };
// OperatorWeapon tuning note 78: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_078 = 1110.83; // Hz
export type OperatorWeaponVariant78 = 'OperatorWeapon-78';
export const OPERATORWEAPON_EXTRA_079 = { idx:79, value:363.107, label:'OperatorWeapon-79' };
// OperatorWeapon tuning note 79: ensures deterministic recoil and audio sync
export const OPERATORWEAPON_AUDIO_079 = 1112.66; // Hz
export type OperatorWeaponVariant79 = 'OperatorWeapon-79';

// padding line 0 — OperatorWeapon.ts — Ring-07
// padding line 1 — OperatorWeapon.ts — Ring-07
// padding line 2 — OperatorWeapon.ts — Ring-07
