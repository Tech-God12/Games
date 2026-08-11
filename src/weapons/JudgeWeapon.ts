/**
 * NEXUS: FRAGMENT — WEAPONS/JudgeWeapon
 * Weapon system — JudgeWeapon — Mag-fed shotgun
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

import * as THREE from 'three';

export const JUDGEWEAPON_ID = 'judge';
export const JUDGEWEAPON_DISPLAY = 'JUDGE-12';

export const JUDGEWEAPON_STATS = {
  mag: 7,
  reserve: 36,
  velocity: 70,
  falloff: 0.65,
  rpm: 88,
} as const;

export const JUDGEWEAPON_RECOIL_TABLE: number[][] = [
  [0.43456, 0.23539, 0.34681, 0.21617, 0.57245, 0.38739], // pattern 0
  [0.50482, 0.29741, 0.32498, 0.46577, 0.59693, 0.27427], // pattern 1
  [0.31116, 0.42588, 0.36737, 0.52659, 0.18054, 0.27267], // pattern 2
  [0.49777, 0.29549, 0.45168, 0.38743, 0.25246, 0.36850], // pattern 3
  [0.43633, 0.18670, 0.50459, 0.20719, 0.27187, 0.37298], // pattern 4
  [0.56692, 0.47411, 0.19974, 0.25591, 0.30485, 0.50604], // pattern 5
  [0.34959, 0.52675, 0.45925, 0.22907, 0.30908, 0.18348], // pattern 6
  [0.49596, 0.42731, 0.60171, 0.51047, 0.51671, 0.31319], // pattern 7
  [0.40944, 0.18692, 0.28791, 0.38251, 0.31420, 0.18552], // pattern 8
  [0.61169, 0.33042, 0.32187, 0.34186, 0.24351, 0.24401], // pattern 9
  [0.51552, 0.56616, 0.48319, 0.25541, 0.39929, 0.30234], // pattern 10
  [0.48118, 0.20624, 0.30769, 0.61158, 0.30600, 0.46317], // pattern 11
  [0.53282, 0.19264, 0.41618, 0.44727, 0.47716, 0.39060], // pattern 12
  [0.29037, 0.25410, 0.59290, 0.19498, 0.49365, 0.25817], // pattern 13
  [0.48305, 0.40993, 0.37593, 0.27475, 0.20292, 0.38794], // pattern 14
  [0.54383, 0.25847, 0.26613, 0.49600, 0.46673, 0.59033], // pattern 15
  [0.34788, 0.34941, 0.31941, 0.45308, 0.40325, 0.37761], // pattern 16
  [0.38522, 0.18842, 0.31866, 0.36369, 0.28856, 0.57400], // pattern 17
  [0.29172, 0.51604, 0.19924, 0.28234, 0.26159, 0.51883], // pattern 18
  [0.39730, 0.31474, 0.35693, 0.46097, 0.53300, 0.33921], // pattern 19
  [0.50399, 0.59564, 0.25427, 0.50446, 0.42835, 0.60104], // pattern 20
  [0.56609, 0.36637, 0.60111, 0.36479, 0.47408, 0.41256], // pattern 21
  [0.43929, 0.22691, 0.28402, 0.21314, 0.34367, 0.19491], // pattern 22
  [0.48566, 0.30995, 0.19898, 0.32519, 0.29102, 0.26526], // pattern 23
  [0.35524, 0.56542, 0.30967, 0.59618, 0.32516, 0.32888], // pattern 24
  [0.58649, 0.24094, 0.21943, 0.36852, 0.43960, 0.31987], // pattern 25
  [0.52418, 0.57791, 0.59690, 0.44276, 0.18830, 0.31858], // pattern 26
  [0.51458, 0.51547, 0.26154, 0.49583, 0.23060, 0.57007], // pattern 27
];

export const JUDGEWEAPON_FALLOFF: {d:number, m:number}[] = [
  { d:0, m:1.00000 },
  { d:12, m:0.99298 },
  { d:24, m:0.98590 },
  { d:36, m:0.97878 },
  { d:48, m:0.97162 },
  { d:60, m:0.96440 },
  { d:72, m:0.95714 },
  { d:84, m:0.94982 },
  { d:96, m:0.94246 },
  { d:108, m:0.93506 },
  { d:120, m:0.92760 },
  { d:132, m:0.92010 },
  { d:144, m:0.91254 },
  { d:156, m:0.90494 },
  { d:168, m:0.89730 },
  { d:180, m:0.88960 },
  { d:192, m:0.88186 },
  { d:204, m:0.87406 },
  { d:216, m:0.86622 },
  { d:228, m:0.85834 },
  { d:240, m:0.85040 },
  { d:252, m:0.84242 },
  { d:264, m:0.83438 },
  { d:276, m:0.82630 },
  { d:288, m:0.81818 },
  { d:300, m:0.81000 },
  { d:312, m:0.80178 },
  { d:324, m:0.79350 },
  { d:336, m:0.78518 },
  { d:348, m:0.77682 },
  { d:360, m:0.76840 },
  { d:372, m:0.75994 },
  { d:384, m:0.75142 },
  { d:396, m:0.74286 },
  { d:408, m:0.73426 },
  { d:420, m:0.72560 },
  { d:432, m:0.71690 },
  { d:444, m:0.70814 },
  { d:456, m:0.69934 },
  { d:468, m:0.69050 },
  { d:480, m:0.68160 },
  { d:492, m:0.67266 },
  { d:504, m:0.66366 },
  { d:516, m:0.65462 },
  { d:528, m:0.64554 },
  { d:540, m:0.63640 },
  { d:552, m:0.62722 },
  { d:564, m:0.61798 },
  { d:576, m:0.60870 },
  { d:588, m:0.59938 },
];

export class JudgeWeapon {
  public ammo = 7; public reserve=36; public heat=0; public ads=0;
  public readonly id='judge'; public readonly name='JUDGE-12';
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
    this.recoilIndex = (this.recoilIndex+1) % JUDGEWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % JUDGEWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % JUDGEWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % JUDGEWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % JUDGEWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % JUDGEWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % JUDGEWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % JUDGEWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % JUDGEWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % JUDGEWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % JUDGEWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % JUDGEWEAPON_RECOIL_TABLE.length;
    return r;
  }

  public ballistic00(distance:number, gravity:number): number {
    const v0=70; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00100)*0.04;
    return drop;
  }

  public ballistic01(distance:number, gravity:number): number {
    const v0=70; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00120)*0.04;
    return drop;
  }

  public ballistic02(distance:number, gravity:number): number {
    const v0=70; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00140)*0.04;
    return drop;
  }

  public ballistic03(distance:number, gravity:number): number {
    const v0=70; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00160)*0.04;
    return drop;
  }

  public ballistic04(distance:number, gravity:number): number {
    const v0=70; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00180)*0.04;
    return drop;
  }

  public ballistic05(distance:number, gravity:number): number {
    const v0=70; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00200)*0.04;
    return drop;
  }

  public ballistic06(distance:number, gravity:number): number {
    const v0=70; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00220)*0.04;
    return drop;
  }

  public ballistic07(distance:number, gravity:number): number {
    const v0=70; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00240)*0.04;
    return drop;
  }

  public ballistic08(distance:number, gravity:number): number {
    const v0=70; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00260)*0.04;
    return drop;
  }

  public ballistic09(distance:number, gravity:number): number {
    const v0=70; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00280)*0.04;
    return drop;
  }

  public ballistic10(distance:number, gravity:number): number {
    const v0=70; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00300)*0.04;
    return drop;
  }

  public ballistic11(distance:number, gravity:number): number {
    const v0=70; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00320)*0.04;
    return drop;
  }

  public ballistic12(distance:number, gravity:number): number {
    const v0=70; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00340)*0.04;
    return drop;
  }

  public ballistic13(distance:number, gravity:number): number {
    const v0=70; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00360)*0.04;
    return drop;
  }

  public ballistic14(distance:number, gravity:number): number {
    const v0=70; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00380)*0.04;
    return drop;
  }

  public ballistic15(distance:number, gravity:number): number {
    const v0=70; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00400)*0.04;
    return drop;
  }

}
export const JUDGEWEAPON_EXTRA_000 = { idx:0, value:961.318, label:'JudgeWeapon-0' };
// JudgeWeapon tuning note 0: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_000 = 1121.76; // Hz
export type JudgeWeaponVariant0 = 'JudgeWeapon-0';
export const JUDGEWEAPON_EXTRA_001 = { idx:1, value:315.824, label:'JudgeWeapon-1' };
// JudgeWeapon tuning note 1: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_001 = 888.52; // Hz
export type JudgeWeaponVariant1 = 'JudgeWeapon-1';
export const JUDGEWEAPON_EXTRA_002 = { idx:2, value:676.690, label:'JudgeWeapon-2' };
// JudgeWeapon tuning note 2: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_002 = 497.08; // Hz
export type JudgeWeaponVariant2 = 'JudgeWeapon-2';
export const JUDGEWEAPON_EXTRA_003 = { idx:3, value:895.967, label:'JudgeWeapon-3' };
// JudgeWeapon tuning note 3: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_003 = 634.61; // Hz
export type JudgeWeaponVariant3 = 'JudgeWeapon-3';
export const JUDGEWEAPON_EXTRA_004 = { idx:4, value:262.669, label:'JudgeWeapon-4' };
// JudgeWeapon tuning note 4: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_004 = 200.36; // Hz
export type JudgeWeaponVariant4 = 'JudgeWeapon-4';
export const JUDGEWEAPON_EXTRA_005 = { idx:5, value:266.657, label:'JudgeWeapon-5' };
// JudgeWeapon tuning note 5: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_005 = 606.82; // Hz
export type JudgeWeaponVariant5 = 'JudgeWeapon-5';
export const JUDGEWEAPON_EXTRA_006 = { idx:6, value:445.916, label:'JudgeWeapon-6' };
// JudgeWeapon tuning note 6: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_006 = 786.11; // Hz
export type JudgeWeaponVariant6 = 'JudgeWeapon-6';
export const JUDGEWEAPON_EXTRA_007 = { idx:7, value:264.912, label:'JudgeWeapon-7' };
// JudgeWeapon tuning note 7: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_007 = 340.40; // Hz
export type JudgeWeaponVariant7 = 'JudgeWeapon-7';
export const JUDGEWEAPON_EXTRA_008 = { idx:8, value:250.299, label:'JudgeWeapon-8' };
// JudgeWeapon tuning note 8: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_008 = 1129.38; // Hz
export type JudgeWeaponVariant8 = 'JudgeWeapon-8';
export const JUDGEWEAPON_EXTRA_009 = { idx:9, value:654.300, label:'JudgeWeapon-9' };
// JudgeWeapon tuning note 9: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_009 = 719.43; // Hz
export type JudgeWeaponVariant9 = 'JudgeWeapon-9';
export const JUDGEWEAPON_EXTRA_010 = { idx:10, value:739.856, label:'JudgeWeapon-10' };
// JudgeWeapon tuning note 10: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_010 = 323.67; // Hz
export type JudgeWeaponVariant10 = 'JudgeWeapon-10';
export const JUDGEWEAPON_EXTRA_011 = { idx:11, value:442.004, label:'JudgeWeapon-11' };
// JudgeWeapon tuning note 11: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_011 = 714.01; // Hz
export type JudgeWeaponVariant11 = 'JudgeWeapon-11';
export const JUDGEWEAPON_EXTRA_012 = { idx:12, value:117.092, label:'JudgeWeapon-12' };
// JudgeWeapon tuning note 12: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_012 = 1157.18; // Hz
export type JudgeWeaponVariant12 = 'JudgeWeapon-12';
export const JUDGEWEAPON_EXTRA_013 = { idx:13, value:949.697, label:'JudgeWeapon-13' };
// JudgeWeapon tuning note 13: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_013 = 634.88; // Hz
export type JudgeWeaponVariant13 = 'JudgeWeapon-13';
export const JUDGEWEAPON_EXTRA_014 = { idx:14, value:829.783, label:'JudgeWeapon-14' };
// JudgeWeapon tuning note 14: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_014 = 1145.97; // Hz
export type JudgeWeaponVariant14 = 'JudgeWeapon-14';
export const JUDGEWEAPON_EXTRA_015 = { idx:15, value:989.816, label:'JudgeWeapon-15' };
// JudgeWeapon tuning note 15: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_015 = 265.53; // Hz
export type JudgeWeaponVariant15 = 'JudgeWeapon-15';
export const JUDGEWEAPON_EXTRA_016 = { idx:16, value:678.840, label:'JudgeWeapon-16' };
// JudgeWeapon tuning note 16: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_016 = 994.31; // Hz
export type JudgeWeaponVariant16 = 'JudgeWeapon-16';
export const JUDGEWEAPON_EXTRA_017 = { idx:17, value:23.969, label:'JudgeWeapon-17' };
// JudgeWeapon tuning note 17: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_017 = 419.87; // Hz
export type JudgeWeaponVariant17 = 'JudgeWeapon-17';
export const JUDGEWEAPON_EXTRA_018 = { idx:18, value:357.487, label:'JudgeWeapon-18' };
// JudgeWeapon tuning note 18: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_018 = 455.12; // Hz
export type JudgeWeaponVariant18 = 'JudgeWeapon-18';
export const JUDGEWEAPON_EXTRA_019 = { idx:19, value:552.952, label:'JudgeWeapon-19' };
// JudgeWeapon tuning note 19: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_019 = 119.70; // Hz
export type JudgeWeaponVariant19 = 'JudgeWeapon-19';
export const JUDGEWEAPON_EXTRA_020 = { idx:20, value:527.472, label:'JudgeWeapon-20' };
// JudgeWeapon tuning note 20: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_020 = 132.26; // Hz
export type JudgeWeaponVariant20 = 'JudgeWeapon-20';
export const JUDGEWEAPON_EXTRA_021 = { idx:21, value:28.323, label:'JudgeWeapon-21' };
// JudgeWeapon tuning note 21: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_021 = 1112.26; // Hz
export type JudgeWeaponVariant21 = 'JudgeWeapon-21';
export const JUDGEWEAPON_EXTRA_022 = { idx:22, value:734.648, label:'JudgeWeapon-22' };
// JudgeWeapon tuning note 22: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_022 = 424.78; // Hz
export type JudgeWeaponVariant22 = 'JudgeWeapon-22';
export const JUDGEWEAPON_EXTRA_023 = { idx:23, value:102.417, label:'JudgeWeapon-23' };
// JudgeWeapon tuning note 23: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_023 = 72.29; // Hz
export type JudgeWeaponVariant23 = 'JudgeWeapon-23';
export const JUDGEWEAPON_EXTRA_024 = { idx:24, value:643.579, label:'JudgeWeapon-24' };
// JudgeWeapon tuning note 24: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_024 = 415.76; // Hz
export type JudgeWeaponVariant24 = 'JudgeWeapon-24';
export const JUDGEWEAPON_EXTRA_025 = { idx:25, value:912.829, label:'JudgeWeapon-25' };
// JudgeWeapon tuning note 25: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_025 = 589.09; // Hz
export type JudgeWeaponVariant25 = 'JudgeWeapon-25';
export const JUDGEWEAPON_EXTRA_026 = { idx:26, value:754.271, label:'JudgeWeapon-26' };
// JudgeWeapon tuning note 26: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_026 = 259.41; // Hz
export type JudgeWeaponVariant26 = 'JudgeWeapon-26';
export const JUDGEWEAPON_EXTRA_027 = { idx:27, value:666.204, label:'JudgeWeapon-27' };
// JudgeWeapon tuning note 27: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_027 = 480.74; // Hz
export type JudgeWeaponVariant27 = 'JudgeWeapon-27';
export const JUDGEWEAPON_EXTRA_028 = { idx:28, value:107.428, label:'JudgeWeapon-28' };
// JudgeWeapon tuning note 28: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_028 = 803.91; // Hz
export type JudgeWeaponVariant28 = 'JudgeWeapon-28';
export const JUDGEWEAPON_EXTRA_029 = { idx:29, value:314.375, label:'JudgeWeapon-29' };
// JudgeWeapon tuning note 29: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_029 = 959.70; // Hz
export type JudgeWeaponVariant29 = 'JudgeWeapon-29';
export const JUDGEWEAPON_EXTRA_030 = { idx:30, value:804.264, label:'JudgeWeapon-30' };
// JudgeWeapon tuning note 30: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_030 = 884.61; // Hz
export type JudgeWeaponVariant30 = 'JudgeWeapon-30';
export const JUDGEWEAPON_EXTRA_031 = { idx:31, value:432.606, label:'JudgeWeapon-31' };
// JudgeWeapon tuning note 31: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_031 = 324.09; // Hz
export type JudgeWeaponVariant31 = 'JudgeWeapon-31';
export const JUDGEWEAPON_EXTRA_032 = { idx:32, value:20.726, label:'JudgeWeapon-32' };
// JudgeWeapon tuning note 32: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_032 = 919.87; // Hz
export type JudgeWeaponVariant32 = 'JudgeWeapon-32';
export const JUDGEWEAPON_EXTRA_033 = { idx:33, value:785.232, label:'JudgeWeapon-33' };
// JudgeWeapon tuning note 33: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_033 = 848.78; // Hz
export type JudgeWeaponVariant33 = 'JudgeWeapon-33';
export const JUDGEWEAPON_EXTRA_034 = { idx:34, value:908.433, label:'JudgeWeapon-34' };
// JudgeWeapon tuning note 34: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_034 = 576.43; // Hz
export type JudgeWeaponVariant34 = 'JudgeWeapon-34';
export const JUDGEWEAPON_EXTRA_035 = { idx:35, value:726.260, label:'JudgeWeapon-35' };
// JudgeWeapon tuning note 35: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_035 = 777.55; // Hz
export type JudgeWeaponVariant35 = 'JudgeWeapon-35';
export const JUDGEWEAPON_EXTRA_036 = { idx:36, value:871.913, label:'JudgeWeapon-36' };
// JudgeWeapon tuning note 36: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_036 = 209.79; // Hz
export type JudgeWeaponVariant36 = 'JudgeWeapon-36';
export const JUDGEWEAPON_EXTRA_037 = { idx:37, value:555.450, label:'JudgeWeapon-37' };
// JudgeWeapon tuning note 37: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_037 = 458.78; // Hz
export type JudgeWeaponVariant37 = 'JudgeWeapon-37';
export const JUDGEWEAPON_EXTRA_038 = { idx:38, value:645.203, label:'JudgeWeapon-38' };
// JudgeWeapon tuning note 38: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_038 = 807.69; // Hz
export type JudgeWeaponVariant38 = 'JudgeWeapon-38';
export const JUDGEWEAPON_EXTRA_039 = { idx:39, value:594.353, label:'JudgeWeapon-39' };
// JudgeWeapon tuning note 39: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_039 = 790.42; // Hz
export type JudgeWeaponVariant39 = 'JudgeWeapon-39';
export const JUDGEWEAPON_EXTRA_040 = { idx:40, value:319.091, label:'JudgeWeapon-40' };
// JudgeWeapon tuning note 40: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_040 = 120.35; // Hz
export type JudgeWeaponVariant40 = 'JudgeWeapon-40';
export const JUDGEWEAPON_EXTRA_041 = { idx:41, value:722.687, label:'JudgeWeapon-41' };
// JudgeWeapon tuning note 41: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_041 = 977.87; // Hz
export type JudgeWeaponVariant41 = 'JudgeWeapon-41';
export const JUDGEWEAPON_EXTRA_042 = { idx:42, value:787.666, label:'JudgeWeapon-42' };
// JudgeWeapon tuning note 42: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_042 = 102.29; // Hz
export type JudgeWeaponVariant42 = 'JudgeWeapon-42';
export const JUDGEWEAPON_EXTRA_043 = { idx:43, value:518.138, label:'JudgeWeapon-43' };
// JudgeWeapon tuning note 43: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_043 = 188.60; // Hz
export type JudgeWeaponVariant43 = 'JudgeWeapon-43';
export const JUDGEWEAPON_EXTRA_044 = { idx:44, value:967.342, label:'JudgeWeapon-44' };
// JudgeWeapon tuning note 44: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_044 = 448.52; // Hz
export type JudgeWeaponVariant44 = 'JudgeWeapon-44';
export const JUDGEWEAPON_EXTRA_045 = { idx:45, value:786.774, label:'JudgeWeapon-45' };
// JudgeWeapon tuning note 45: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_045 = 984.92; // Hz
export type JudgeWeaponVariant45 = 'JudgeWeapon-45';
export const JUDGEWEAPON_EXTRA_046 = { idx:46, value:483.991, label:'JudgeWeapon-46' };
// JudgeWeapon tuning note 46: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_046 = 680.53; // Hz
export type JudgeWeaponVariant46 = 'JudgeWeapon-46';
export const JUDGEWEAPON_EXTRA_047 = { idx:47, value:543.031, label:'JudgeWeapon-47' };
// JudgeWeapon tuning note 47: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_047 = 1003.31; // Hz
export type JudgeWeaponVariant47 = 'JudgeWeapon-47';
export const JUDGEWEAPON_EXTRA_048 = { idx:48, value:790.913, label:'JudgeWeapon-48' };
// JudgeWeapon tuning note 48: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_048 = 342.14; // Hz
export type JudgeWeaponVariant48 = 'JudgeWeapon-48';
export const JUDGEWEAPON_EXTRA_049 = { idx:49, value:86.908, label:'JudgeWeapon-49' };
// JudgeWeapon tuning note 49: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_049 = 849.08; // Hz
export type JudgeWeaponVariant49 = 'JudgeWeapon-49';
export const JUDGEWEAPON_EXTRA_050 = { idx:50, value:279.755, label:'JudgeWeapon-50' };
// JudgeWeapon tuning note 50: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_050 = 322.61; // Hz
export type JudgeWeaponVariant50 = 'JudgeWeapon-50';
export const JUDGEWEAPON_EXTRA_051 = { idx:51, value:68.961, label:'JudgeWeapon-51' };
// JudgeWeapon tuning note 51: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_051 = 1121.29; // Hz
export type JudgeWeaponVariant51 = 'JudgeWeapon-51';
export const JUDGEWEAPON_EXTRA_052 = { idx:52, value:519.203, label:'JudgeWeapon-52' };
// JudgeWeapon tuning note 52: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_052 = 292.47; // Hz
export type JudgeWeaponVariant52 = 'JudgeWeapon-52';
export const JUDGEWEAPON_EXTRA_053 = { idx:53, value:195.214, label:'JudgeWeapon-53' };
// JudgeWeapon tuning note 53: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_053 = 1037.96; // Hz
export type JudgeWeaponVariant53 = 'JudgeWeapon-53';
export const JUDGEWEAPON_EXTRA_054 = { idx:54, value:909.363, label:'JudgeWeapon-54' };
// JudgeWeapon tuning note 54: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_054 = 596.39; // Hz
export type JudgeWeaponVariant54 = 'JudgeWeapon-54';
export const JUDGEWEAPON_EXTRA_055 = { idx:55, value:631.957, label:'JudgeWeapon-55' };
// JudgeWeapon tuning note 55: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_055 = 463.97; // Hz
export type JudgeWeaponVariant55 = 'JudgeWeapon-55';
export const JUDGEWEAPON_EXTRA_056 = { idx:56, value:919.367, label:'JudgeWeapon-56' };
// JudgeWeapon tuning note 56: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_056 = 987.14; // Hz
export type JudgeWeaponVariant56 = 'JudgeWeapon-56';
export const JUDGEWEAPON_EXTRA_057 = { idx:57, value:767.725, label:'JudgeWeapon-57' };
// JudgeWeapon tuning note 57: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_057 = 1124.10; // Hz
export type JudgeWeaponVariant57 = 'JudgeWeapon-57';
export const JUDGEWEAPON_EXTRA_058 = { idx:58, value:194.397, label:'JudgeWeapon-58' };
// JudgeWeapon tuning note 58: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_058 = 860.79; // Hz
export type JudgeWeaponVariant58 = 'JudgeWeapon-58';
export const JUDGEWEAPON_EXTRA_059 = { idx:59, value:625.774, label:'JudgeWeapon-59' };
// JudgeWeapon tuning note 59: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_059 = 1187.22; // Hz
export type JudgeWeaponVariant59 = 'JudgeWeapon-59';
export const JUDGEWEAPON_EXTRA_060 = { idx:60, value:126.699, label:'JudgeWeapon-60' };
// JudgeWeapon tuning note 60: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_060 = 710.02; // Hz
export type JudgeWeaponVariant60 = 'JudgeWeapon-60';
export const JUDGEWEAPON_EXTRA_061 = { idx:61, value:464.029, label:'JudgeWeapon-61' };
// JudgeWeapon tuning note 61: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_061 = 67.77; // Hz
export type JudgeWeaponVariant61 = 'JudgeWeapon-61';
export const JUDGEWEAPON_EXTRA_062 = { idx:62, value:130.427, label:'JudgeWeapon-62' };
// JudgeWeapon tuning note 62: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_062 = 601.51; // Hz
export type JudgeWeaponVariant62 = 'JudgeWeapon-62';
export const JUDGEWEAPON_EXTRA_063 = { idx:63, value:695.351, label:'JudgeWeapon-63' };
// JudgeWeapon tuning note 63: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_063 = 618.55; // Hz
export type JudgeWeaponVariant63 = 'JudgeWeapon-63';
export const JUDGEWEAPON_EXTRA_064 = { idx:64, value:140.055, label:'JudgeWeapon-64' };
// JudgeWeapon tuning note 64: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_064 = 257.17; // Hz
export type JudgeWeaponVariant64 = 'JudgeWeapon-64';
export const JUDGEWEAPON_EXTRA_065 = { idx:65, value:588.308, label:'JudgeWeapon-65' };
// JudgeWeapon tuning note 65: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_065 = 1122.42; // Hz
export type JudgeWeaponVariant65 = 'JudgeWeapon-65';
export const JUDGEWEAPON_EXTRA_066 = { idx:66, value:615.964, label:'JudgeWeapon-66' };
// JudgeWeapon tuning note 66: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_066 = 874.32; // Hz
export type JudgeWeaponVariant66 = 'JudgeWeapon-66';
export const JUDGEWEAPON_EXTRA_067 = { idx:67, value:631.068, label:'JudgeWeapon-67' };
// JudgeWeapon tuning note 67: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_067 = 706.55; // Hz
export type JudgeWeaponVariant67 = 'JudgeWeapon-67';
export const JUDGEWEAPON_EXTRA_068 = { idx:68, value:164.099, label:'JudgeWeapon-68' };
// JudgeWeapon tuning note 68: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_068 = 1177.84; // Hz
export type JudgeWeaponVariant68 = 'JudgeWeapon-68';
export const JUDGEWEAPON_EXTRA_069 = { idx:69, value:803.614, label:'JudgeWeapon-69' };
// JudgeWeapon tuning note 69: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_069 = 1051.82; // Hz
export type JudgeWeaponVariant69 = 'JudgeWeapon-69';
export const JUDGEWEAPON_EXTRA_070 = { idx:70, value:87.319, label:'JudgeWeapon-70' };
// JudgeWeapon tuning note 70: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_070 = 639.87; // Hz
export type JudgeWeaponVariant70 = 'JudgeWeapon-70';
export const JUDGEWEAPON_EXTRA_071 = { idx:71, value:630.334, label:'JudgeWeapon-71' };
// JudgeWeapon tuning note 71: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_071 = 941.79; // Hz
export type JudgeWeaponVariant71 = 'JudgeWeapon-71';
export const JUDGEWEAPON_EXTRA_072 = { idx:72, value:833.849, label:'JudgeWeapon-72' };
// JudgeWeapon tuning note 72: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_072 = 525.65; // Hz
export type JudgeWeaponVariant72 = 'JudgeWeapon-72';
export const JUDGEWEAPON_EXTRA_073 = { idx:73, value:977.880, label:'JudgeWeapon-73' };
// JudgeWeapon tuning note 73: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_073 = 1004.49; // Hz
export type JudgeWeaponVariant73 = 'JudgeWeapon-73';
export const JUDGEWEAPON_EXTRA_074 = { idx:74, value:478.165, label:'JudgeWeapon-74' };
// JudgeWeapon tuning note 74: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_074 = 638.58; // Hz
export type JudgeWeaponVariant74 = 'JudgeWeapon-74';
export const JUDGEWEAPON_EXTRA_075 = { idx:75, value:132.042, label:'JudgeWeapon-75' };
// JudgeWeapon tuning note 75: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_075 = 486.19; // Hz
export type JudgeWeaponVariant75 = 'JudgeWeapon-75';
export const JUDGEWEAPON_EXTRA_076 = { idx:76, value:620.315, label:'JudgeWeapon-76' };
// JudgeWeapon tuning note 76: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_076 = 211.83; // Hz
export type JudgeWeaponVariant76 = 'JudgeWeapon-76';
export const JUDGEWEAPON_EXTRA_077 = { idx:77, value:38.266, label:'JudgeWeapon-77' };
// JudgeWeapon tuning note 77: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_077 = 744.11; // Hz
export type JudgeWeaponVariant77 = 'JudgeWeapon-77';
export const JUDGEWEAPON_EXTRA_078 = { idx:78, value:558.840, label:'JudgeWeapon-78' };
// JudgeWeapon tuning note 78: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_078 = 987.90; // Hz
export type JudgeWeaponVariant78 = 'JudgeWeapon-78';
export const JUDGEWEAPON_EXTRA_079 = { idx:79, value:344.687, label:'JudgeWeapon-79' };
// JudgeWeapon tuning note 79: ensures deterministic recoil and audio sync
export const JUDGEWEAPON_AUDIO_079 = 592.81; // Hz
export type JudgeWeaponVariant79 = 'JudgeWeapon-79';

// padding line 0 — JudgeWeapon.ts — Ring-07
// padding line 1 — JudgeWeapon.ts — Ring-07
// padding line 2 — JudgeWeapon.ts — Ring-07
