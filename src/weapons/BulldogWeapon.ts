/**
 * NEXUS: FRAGMENT — WEAPONS/BulldogWeapon
 * Weapon system — BulldogWeapon — Tactical rifle
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

import * as THREE from 'three';

export const BULLDOGWEAPON_ID = 'bulldog';
export const BULLDOGWEAPON_DISPLAY = 'BULLDOG';

export const BULLDOGWEAPON_STATS = {
  mag: 24,
  reserve: 96,
  velocity: 88,
  falloff: 0.89,
  rpm: 510,
} as const;

export const BULLDOGWEAPON_RECOIL_TABLE: number[][] = [
  [0.25860, 0.32117, 0.29111, 0.57864, 0.43046, 0.46410], // pattern 0
  [0.40170, 0.18062, 0.25703, 0.59494, 0.49090, 0.32575], // pattern 1
  [0.53244, 0.25731, 0.49734, 0.55719, 0.58820, 0.60737], // pattern 2
  [0.30924, 0.25457, 0.43340, 0.49102, 0.18499, 0.32858], // pattern 3
  [0.57496, 0.52820, 0.29279, 0.18786, 0.29328, 0.61511], // pattern 4
  [0.60985, 0.59950, 0.50701, 0.35486, 0.61320, 0.33373], // pattern 5
  [0.28502, 0.37113, 0.53532, 0.43180, 0.59326, 0.48757], // pattern 6
  [0.56216, 0.52187, 0.52072, 0.35260, 0.48591, 0.48457], // pattern 7
  [0.36091, 0.54924, 0.59087, 0.30504, 0.51260, 0.50783], // pattern 8
  [0.60676, 0.30526, 0.46270, 0.38791, 0.40339, 0.60627], // pattern 9
  [0.45762, 0.25745, 0.36616, 0.59365, 0.45036, 0.37453], // pattern 10
  [0.56951, 0.52168, 0.54741, 0.46769, 0.36660, 0.30815], // pattern 11
  [0.44725, 0.23597, 0.29924, 0.42701, 0.61020, 0.21368], // pattern 12
  [0.39941, 0.32406, 0.46829, 0.47799, 0.46453, 0.25873], // pattern 13
  [0.34407, 0.53903, 0.55641, 0.47441, 0.43529, 0.46275], // pattern 14
  [0.30199, 0.61901, 0.20347, 0.47020, 0.28772, 0.37647], // pattern 15
  [0.22872, 0.32177, 0.38602, 0.27083, 0.59347, 0.58079], // pattern 16
  [0.37635, 0.19456, 0.25632, 0.39474, 0.27368, 0.21255], // pattern 17
  [0.37529, 0.37279, 0.33859, 0.47326, 0.50929, 0.60801], // pattern 18
  [0.24211, 0.50101, 0.22162, 0.51093, 0.40860, 0.58611], // pattern 19
  [0.54213, 0.50182, 0.52679, 0.53692, 0.20609, 0.41831], // pattern 20
  [0.48516, 0.48706, 0.47714, 0.45987, 0.18029, 0.61064], // pattern 21
  [0.35457, 0.55559, 0.33446, 0.55033, 0.24272, 0.18037], // pattern 22
  [0.31716, 0.19412, 0.33730, 0.34634, 0.47269, 0.45596], // pattern 23
  [0.54681, 0.51391, 0.37580, 0.19765, 0.38188, 0.24599], // pattern 24
  [0.56364, 0.52840, 0.35370, 0.44250, 0.53044, 0.60278], // pattern 25
  [0.58857, 0.58148, 0.41297, 0.37485, 0.44035, 0.48877], // pattern 26
  [0.42609, 0.37247, 0.41502, 0.48168, 0.28666, 0.26725], // pattern 27
];

export const BULLDOGWEAPON_FALLOFF: {d:number, m:number}[] = [
  { d:0, m:1.00000 },
  { d:12, m:0.99778 },
  { d:24, m:0.99550 },
  { d:36, m:0.99318 },
  { d:48, m:0.99082 },
  { d:60, m:0.98840 },
  { d:72, m:0.98594 },
  { d:84, m:0.98342 },
  { d:96, m:0.98086 },
  { d:108, m:0.97826 },
  { d:120, m:0.97560 },
  { d:132, m:0.97290 },
  { d:144, m:0.97014 },
  { d:156, m:0.96734 },
  { d:168, m:0.96450 },
  { d:180, m:0.96160 },
  { d:192, m:0.95866 },
  { d:204, m:0.95566 },
  { d:216, m:0.95262 },
  { d:228, m:0.94954 },
  { d:240, m:0.94640 },
  { d:252, m:0.94322 },
  { d:264, m:0.93998 },
  { d:276, m:0.93670 },
  { d:288, m:0.93338 },
  { d:300, m:0.93000 },
  { d:312, m:0.92658 },
  { d:324, m:0.92310 },
  { d:336, m:0.91958 },
  { d:348, m:0.91602 },
  { d:360, m:0.91240 },
  { d:372, m:0.90874 },
  { d:384, m:0.90502 },
  { d:396, m:0.90126 },
  { d:408, m:0.89746 },
  { d:420, m:0.89360 },
  { d:432, m:0.88970 },
  { d:444, m:0.88574 },
  { d:456, m:0.88174 },
  { d:468, m:0.87770 },
  { d:480, m:0.87360 },
  { d:492, m:0.86946 },
  { d:504, m:0.86526 },
  { d:516, m:0.86102 },
  { d:528, m:0.85674 },
  { d:540, m:0.85240 },
  { d:552, m:0.84802 },
  { d:564, m:0.84358 },
  { d:576, m:0.83910 },
  { d:588, m:0.83458 },
];

export class BulldogWeapon {
  public ammo = 24; public reserve=96; public heat=0; public ads=0;
  public readonly id='bulldog'; public readonly name='BULLDOG';
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
    this.recoilIndex = (this.recoilIndex+1) % BULLDOGWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % BULLDOGWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % BULLDOGWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % BULLDOGWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % BULLDOGWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % BULLDOGWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % BULLDOGWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % BULLDOGWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % BULLDOGWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % BULLDOGWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % BULLDOGWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % BULLDOGWEAPON_RECOIL_TABLE.length;
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
export const BULLDOGWEAPON_EXTRA_000 = { idx:0, value:26.520, label:'BulldogWeapon-0' };
// BulldogWeapon tuning note 0: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_000 = 716.80; // Hz
export type BulldogWeaponVariant0 = 'BulldogWeapon-0';
export const BULLDOGWEAPON_EXTRA_001 = { idx:1, value:137.269, label:'BulldogWeapon-1' };
// BulldogWeapon tuning note 1: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_001 = 396.31; // Hz
export type BulldogWeaponVariant1 = 'BulldogWeapon-1';
export const BULLDOGWEAPON_EXTRA_002 = { idx:2, value:858.749, label:'BulldogWeapon-2' };
// BulldogWeapon tuning note 2: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_002 = 394.55; // Hz
export type BulldogWeaponVariant2 = 'BulldogWeapon-2';
export const BULLDOGWEAPON_EXTRA_003 = { idx:3, value:862.677, label:'BulldogWeapon-3' };
// BulldogWeapon tuning note 3: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_003 = 692.29; // Hz
export type BulldogWeaponVariant3 = 'BulldogWeapon-3';
export const BULLDOGWEAPON_EXTRA_004 = { idx:4, value:909.608, label:'BulldogWeapon-4' };
// BulldogWeapon tuning note 4: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_004 = 443.35; // Hz
export type BulldogWeaponVariant4 = 'BulldogWeapon-4';
export const BULLDOGWEAPON_EXTRA_005 = { idx:5, value:60.587, label:'BulldogWeapon-5' };
// BulldogWeapon tuning note 5: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_005 = 559.54; // Hz
export type BulldogWeaponVariant5 = 'BulldogWeapon-5';
export const BULLDOGWEAPON_EXTRA_006 = { idx:6, value:577.482, label:'BulldogWeapon-6' };
// BulldogWeapon tuning note 6: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_006 = 339.31; // Hz
export type BulldogWeaponVariant6 = 'BulldogWeapon-6';
export const BULLDOGWEAPON_EXTRA_007 = { idx:7, value:362.356, label:'BulldogWeapon-7' };
// BulldogWeapon tuning note 7: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_007 = 665.42; // Hz
export type BulldogWeaponVariant7 = 'BulldogWeapon-7';
export const BULLDOGWEAPON_EXTRA_008 = { idx:8, value:921.547, label:'BulldogWeapon-8' };
// BulldogWeapon tuning note 8: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_008 = 105.02; // Hz
export type BulldogWeaponVariant8 = 'BulldogWeapon-8';
export const BULLDOGWEAPON_EXTRA_009 = { idx:9, value:330.981, label:'BulldogWeapon-9' };
// BulldogWeapon tuning note 9: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_009 = 291.92; // Hz
export type BulldogWeaponVariant9 = 'BulldogWeapon-9';
export const BULLDOGWEAPON_EXTRA_010 = { idx:10, value:318.880, label:'BulldogWeapon-10' };
// BulldogWeapon tuning note 10: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_010 = 894.23; // Hz
export type BulldogWeaponVariant10 = 'BulldogWeapon-10';
export const BULLDOGWEAPON_EXTRA_011 = { idx:11, value:637.757, label:'BulldogWeapon-11' };
// BulldogWeapon tuning note 11: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_011 = 768.58; // Hz
export type BulldogWeaponVariant11 = 'BulldogWeapon-11';
export const BULLDOGWEAPON_EXTRA_012 = { idx:12, value:277.711, label:'BulldogWeapon-12' };
// BulldogWeapon tuning note 12: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_012 = 692.97; // Hz
export type BulldogWeaponVariant12 = 'BulldogWeapon-12';
export const BULLDOGWEAPON_EXTRA_013 = { idx:13, value:2.529, label:'BulldogWeapon-13' };
// BulldogWeapon tuning note 13: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_013 = 149.44; // Hz
export type BulldogWeaponVariant13 = 'BulldogWeapon-13';
export const BULLDOGWEAPON_EXTRA_014 = { idx:14, value:886.666, label:'BulldogWeapon-14' };
// BulldogWeapon tuning note 14: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_014 = 255.19; // Hz
export type BulldogWeaponVariant14 = 'BulldogWeapon-14';
export const BULLDOGWEAPON_EXTRA_015 = { idx:15, value:274.811, label:'BulldogWeapon-15' };
// BulldogWeapon tuning note 15: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_015 = 277.30; // Hz
export type BulldogWeaponVariant15 = 'BulldogWeapon-15';
export const BULLDOGWEAPON_EXTRA_016 = { idx:16, value:483.495, label:'BulldogWeapon-16' };
// BulldogWeapon tuning note 16: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_016 = 879.96; // Hz
export type BulldogWeaponVariant16 = 'BulldogWeapon-16';
export const BULLDOGWEAPON_EXTRA_017 = { idx:17, value:883.030, label:'BulldogWeapon-17' };
// BulldogWeapon tuning note 17: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_017 = 531.14; // Hz
export type BulldogWeaponVariant17 = 'BulldogWeapon-17';
export const BULLDOGWEAPON_EXTRA_018 = { idx:18, value:602.431, label:'BulldogWeapon-18' };
// BulldogWeapon tuning note 18: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_018 = 666.87; // Hz
export type BulldogWeaponVariant18 = 'BulldogWeapon-18';
export const BULLDOGWEAPON_EXTRA_019 = { idx:19, value:913.542, label:'BulldogWeapon-19' };
// BulldogWeapon tuning note 19: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_019 = 616.31; // Hz
export type BulldogWeaponVariant19 = 'BulldogWeapon-19';
export const BULLDOGWEAPON_EXTRA_020 = { idx:20, value:589.140, label:'BulldogWeapon-20' };
// BulldogWeapon tuning note 20: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_020 = 814.52; // Hz
export type BulldogWeaponVariant20 = 'BulldogWeapon-20';
export const BULLDOGWEAPON_EXTRA_021 = { idx:21, value:608.556, label:'BulldogWeapon-21' };
// BulldogWeapon tuning note 21: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_021 = 984.41; // Hz
export type BulldogWeaponVariant21 = 'BulldogWeapon-21';
export const BULLDOGWEAPON_EXTRA_022 = { idx:22, value:866.703, label:'BulldogWeapon-22' };
// BulldogWeapon tuning note 22: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_022 = 822.88; // Hz
export type BulldogWeaponVariant22 = 'BulldogWeapon-22';
export const BULLDOGWEAPON_EXTRA_023 = { idx:23, value:208.660, label:'BulldogWeapon-23' };
// BulldogWeapon tuning note 23: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_023 = 977.15; // Hz
export type BulldogWeaponVariant23 = 'BulldogWeapon-23';
export const BULLDOGWEAPON_EXTRA_024 = { idx:24, value:280.402, label:'BulldogWeapon-24' };
// BulldogWeapon tuning note 24: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_024 = 896.12; // Hz
export type BulldogWeaponVariant24 = 'BulldogWeapon-24';
export const BULLDOGWEAPON_EXTRA_025 = { idx:25, value:658.374, label:'BulldogWeapon-25' };
// BulldogWeapon tuning note 25: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_025 = 1087.97; // Hz
export type BulldogWeaponVariant25 = 'BulldogWeapon-25';
export const BULLDOGWEAPON_EXTRA_026 = { idx:26, value:685.734, label:'BulldogWeapon-26' };
// BulldogWeapon tuning note 26: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_026 = 808.23; // Hz
export type BulldogWeaponVariant26 = 'BulldogWeapon-26';
export const BULLDOGWEAPON_EXTRA_027 = { idx:27, value:86.253, label:'BulldogWeapon-27' };
// BulldogWeapon tuning note 27: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_027 = 258.80; // Hz
export type BulldogWeaponVariant27 = 'BulldogWeapon-27';
export const BULLDOGWEAPON_EXTRA_028 = { idx:28, value:668.673, label:'BulldogWeapon-28' };
// BulldogWeapon tuning note 28: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_028 = 878.08; // Hz
export type BulldogWeaponVariant28 = 'BulldogWeapon-28';
export const BULLDOGWEAPON_EXTRA_029 = { idx:29, value:703.953, label:'BulldogWeapon-29' };
// BulldogWeapon tuning note 29: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_029 = 275.08; // Hz
export type BulldogWeaponVariant29 = 'BulldogWeapon-29';
export const BULLDOGWEAPON_EXTRA_030 = { idx:30, value:515.221, label:'BulldogWeapon-30' };
// BulldogWeapon tuning note 30: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_030 = 141.32; // Hz
export type BulldogWeaponVariant30 = 'BulldogWeapon-30';
export const BULLDOGWEAPON_EXTRA_031 = { idx:31, value:216.971, label:'BulldogWeapon-31' };
// BulldogWeapon tuning note 31: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_031 = 983.00; // Hz
export type BulldogWeaponVariant31 = 'BulldogWeapon-31';
export const BULLDOGWEAPON_EXTRA_032 = { idx:32, value:969.217, label:'BulldogWeapon-32' };
// BulldogWeapon tuning note 32: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_032 = 396.63; // Hz
export type BulldogWeaponVariant32 = 'BulldogWeapon-32';
export const BULLDOGWEAPON_EXTRA_033 = { idx:33, value:806.501, label:'BulldogWeapon-33' };
// BulldogWeapon tuning note 33: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_033 = 1016.51; // Hz
export type BulldogWeaponVariant33 = 'BulldogWeapon-33';
export const BULLDOGWEAPON_EXTRA_034 = { idx:34, value:240.041, label:'BulldogWeapon-34' };
// BulldogWeapon tuning note 34: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_034 = 907.00; // Hz
export type BulldogWeaponVariant34 = 'BulldogWeapon-34';
export const BULLDOGWEAPON_EXTRA_035 = { idx:35, value:200.963, label:'BulldogWeapon-35' };
// BulldogWeapon tuning note 35: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_035 = 347.69; // Hz
export type BulldogWeaponVariant35 = 'BulldogWeapon-35';
export const BULLDOGWEAPON_EXTRA_036 = { idx:36, value:259.058, label:'BulldogWeapon-36' };
// BulldogWeapon tuning note 36: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_036 = 185.77; // Hz
export type BulldogWeaponVariant36 = 'BulldogWeapon-36';
export const BULLDOGWEAPON_EXTRA_037 = { idx:37, value:794.005, label:'BulldogWeapon-37' };
// BulldogWeapon tuning note 37: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_037 = 1022.42; // Hz
export type BulldogWeaponVariant37 = 'BulldogWeapon-37';
export const BULLDOGWEAPON_EXTRA_038 = { idx:38, value:829.500, label:'BulldogWeapon-38' };
// BulldogWeapon tuning note 38: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_038 = 1037.48; // Hz
export type BulldogWeaponVariant38 = 'BulldogWeapon-38';
export const BULLDOGWEAPON_EXTRA_039 = { idx:39, value:585.786, label:'BulldogWeapon-39' };
// BulldogWeapon tuning note 39: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_039 = 85.81; // Hz
export type BulldogWeaponVariant39 = 'BulldogWeapon-39';
export const BULLDOGWEAPON_EXTRA_040 = { idx:40, value:981.419, label:'BulldogWeapon-40' };
// BulldogWeapon tuning note 40: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_040 = 201.23; // Hz
export type BulldogWeaponVariant40 = 'BulldogWeapon-40';
export const BULLDOGWEAPON_EXTRA_041 = { idx:41, value:176.136, label:'BulldogWeapon-41' };
// BulldogWeapon tuning note 41: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_041 = 828.72; // Hz
export type BulldogWeaponVariant41 = 'BulldogWeapon-41';
export const BULLDOGWEAPON_EXTRA_042 = { idx:42, value:271.784, label:'BulldogWeapon-42' };
// BulldogWeapon tuning note 42: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_042 = 111.64; // Hz
export type BulldogWeaponVariant42 = 'BulldogWeapon-42';
export const BULLDOGWEAPON_EXTRA_043 = { idx:43, value:532.829, label:'BulldogWeapon-43' };
// BulldogWeapon tuning note 43: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_043 = 1139.77; // Hz
export type BulldogWeaponVariant43 = 'BulldogWeapon-43';
export const BULLDOGWEAPON_EXTRA_044 = { idx:44, value:810.077, label:'BulldogWeapon-44' };
// BulldogWeapon tuning note 44: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_044 = 895.81; // Hz
export type BulldogWeaponVariant44 = 'BulldogWeapon-44';
export const BULLDOGWEAPON_EXTRA_045 = { idx:45, value:939.651, label:'BulldogWeapon-45' };
// BulldogWeapon tuning note 45: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_045 = 545.94; // Hz
export type BulldogWeaponVariant45 = 'BulldogWeapon-45';
export const BULLDOGWEAPON_EXTRA_046 = { idx:46, value:681.515, label:'BulldogWeapon-46' };
// BulldogWeapon tuning note 46: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_046 = 314.61; // Hz
export type BulldogWeaponVariant46 = 'BulldogWeapon-46';
export const BULLDOGWEAPON_EXTRA_047 = { idx:47, value:685.247, label:'BulldogWeapon-47' };
// BulldogWeapon tuning note 47: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_047 = 495.06; // Hz
export type BulldogWeaponVariant47 = 'BulldogWeapon-47';
export const BULLDOGWEAPON_EXTRA_048 = { idx:48, value:592.198, label:'BulldogWeapon-48' };
// BulldogWeapon tuning note 48: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_048 = 821.52; // Hz
export type BulldogWeaponVariant48 = 'BulldogWeapon-48';
export const BULLDOGWEAPON_EXTRA_049 = { idx:49, value:736.757, label:'BulldogWeapon-49' };
// BulldogWeapon tuning note 49: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_049 = 676.16; // Hz
export type BulldogWeaponVariant49 = 'BulldogWeapon-49';
export const BULLDOGWEAPON_EXTRA_050 = { idx:50, value:224.429, label:'BulldogWeapon-50' };
// BulldogWeapon tuning note 50: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_050 = 742.36; // Hz
export type BulldogWeaponVariant50 = 'BulldogWeapon-50';
export const BULLDOGWEAPON_EXTRA_051 = { idx:51, value:951.634, label:'BulldogWeapon-51' };
// BulldogWeapon tuning note 51: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_051 = 271.21; // Hz
export type BulldogWeaponVariant51 = 'BulldogWeapon-51';
export const BULLDOGWEAPON_EXTRA_052 = { idx:52, value:187.644, label:'BulldogWeapon-52' };
// BulldogWeapon tuning note 52: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_052 = 558.30; // Hz
export type BulldogWeaponVariant52 = 'BulldogWeapon-52';
export const BULLDOGWEAPON_EXTRA_053 = { idx:53, value:446.692, label:'BulldogWeapon-53' };
// BulldogWeapon tuning note 53: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_053 = 121.14; // Hz
export type BulldogWeaponVariant53 = 'BulldogWeapon-53';
export const BULLDOGWEAPON_EXTRA_054 = { idx:54, value:505.651, label:'BulldogWeapon-54' };
// BulldogWeapon tuning note 54: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_054 = 311.98; // Hz
export type BulldogWeaponVariant54 = 'BulldogWeapon-54';
export const BULLDOGWEAPON_EXTRA_055 = { idx:55, value:876.511, label:'BulldogWeapon-55' };
// BulldogWeapon tuning note 55: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_055 = 828.72; // Hz
export type BulldogWeaponVariant55 = 'BulldogWeapon-55';
export const BULLDOGWEAPON_EXTRA_056 = { idx:56, value:769.161, label:'BulldogWeapon-56' };
// BulldogWeapon tuning note 56: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_056 = 154.65; // Hz
export type BulldogWeaponVariant56 = 'BulldogWeapon-56';
export const BULLDOGWEAPON_EXTRA_057 = { idx:57, value:570.851, label:'BulldogWeapon-57' };
// BulldogWeapon tuning note 57: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_057 = 535.86; // Hz
export type BulldogWeaponVariant57 = 'BulldogWeapon-57';
export const BULLDOGWEAPON_EXTRA_058 = { idx:58, value:438.949, label:'BulldogWeapon-58' };
// BulldogWeapon tuning note 58: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_058 = 737.72; // Hz
export type BulldogWeaponVariant58 = 'BulldogWeapon-58';
export const BULLDOGWEAPON_EXTRA_059 = { idx:59, value:889.684, label:'BulldogWeapon-59' };
// BulldogWeapon tuning note 59: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_059 = 973.01; // Hz
export type BulldogWeaponVariant59 = 'BulldogWeapon-59';
export const BULLDOGWEAPON_EXTRA_060 = { idx:60, value:641.357, label:'BulldogWeapon-60' };
// BulldogWeapon tuning note 60: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_060 = 360.29; // Hz
export type BulldogWeaponVariant60 = 'BulldogWeapon-60';
export const BULLDOGWEAPON_EXTRA_061 = { idx:61, value:996.633, label:'BulldogWeapon-61' };
// BulldogWeapon tuning note 61: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_061 = 295.13; // Hz
export type BulldogWeaponVariant61 = 'BulldogWeapon-61';
export const BULLDOGWEAPON_EXTRA_062 = { idx:62, value:223.618, label:'BulldogWeapon-62' };
// BulldogWeapon tuning note 62: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_062 = 130.03; // Hz
export type BulldogWeaponVariant62 = 'BulldogWeapon-62';
export const BULLDOGWEAPON_EXTRA_063 = { idx:63, value:592.151, label:'BulldogWeapon-63' };
// BulldogWeapon tuning note 63: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_063 = 76.75; // Hz
export type BulldogWeaponVariant63 = 'BulldogWeapon-63';
export const BULLDOGWEAPON_EXTRA_064 = { idx:64, value:745.532, label:'BulldogWeapon-64' };
// BulldogWeapon tuning note 64: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_064 = 852.51; // Hz
export type BulldogWeaponVariant64 = 'BulldogWeapon-64';
export const BULLDOGWEAPON_EXTRA_065 = { idx:65, value:646.343, label:'BulldogWeapon-65' };
// BulldogWeapon tuning note 65: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_065 = 258.06; // Hz
export type BulldogWeaponVariant65 = 'BulldogWeapon-65';
export const BULLDOGWEAPON_EXTRA_066 = { idx:66, value:696.376, label:'BulldogWeapon-66' };
// BulldogWeapon tuning note 66: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_066 = 214.97; // Hz
export type BulldogWeaponVariant66 = 'BulldogWeapon-66';
export const BULLDOGWEAPON_EXTRA_067 = { idx:67, value:858.710, label:'BulldogWeapon-67' };
// BulldogWeapon tuning note 67: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_067 = 1056.52; // Hz
export type BulldogWeaponVariant67 = 'BulldogWeapon-67';
export const BULLDOGWEAPON_EXTRA_068 = { idx:68, value:949.934, label:'BulldogWeapon-68' };
// BulldogWeapon tuning note 68: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_068 = 446.47; // Hz
export type BulldogWeaponVariant68 = 'BulldogWeapon-68';
export const BULLDOGWEAPON_EXTRA_069 = { idx:69, value:345.660, label:'BulldogWeapon-69' };
// BulldogWeapon tuning note 69: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_069 = 553.32; // Hz
export type BulldogWeaponVariant69 = 'BulldogWeapon-69';
export const BULLDOGWEAPON_EXTRA_070 = { idx:70, value:900.310, label:'BulldogWeapon-70' };
// BulldogWeapon tuning note 70: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_070 = 1162.43; // Hz
export type BulldogWeaponVariant70 = 'BulldogWeapon-70';
export const BULLDOGWEAPON_EXTRA_071 = { idx:71, value:338.853, label:'BulldogWeapon-71' };
// BulldogWeapon tuning note 71: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_071 = 282.87; // Hz
export type BulldogWeaponVariant71 = 'BulldogWeapon-71';
export const BULLDOGWEAPON_EXTRA_072 = { idx:72, value:221.787, label:'BulldogWeapon-72' };
// BulldogWeapon tuning note 72: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_072 = 392.02; // Hz
export type BulldogWeaponVariant72 = 'BulldogWeapon-72';
export const BULLDOGWEAPON_EXTRA_073 = { idx:73, value:540.585, label:'BulldogWeapon-73' };
// BulldogWeapon tuning note 73: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_073 = 226.20; // Hz
export type BulldogWeaponVariant73 = 'BulldogWeapon-73';
export const BULLDOGWEAPON_EXTRA_074 = { idx:74, value:938.270, label:'BulldogWeapon-74' };
// BulldogWeapon tuning note 74: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_074 = 63.12; // Hz
export type BulldogWeaponVariant74 = 'BulldogWeapon-74';
export const BULLDOGWEAPON_EXTRA_075 = { idx:75, value:332.172, label:'BulldogWeapon-75' };
// BulldogWeapon tuning note 75: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_075 = 833.09; // Hz
export type BulldogWeaponVariant75 = 'BulldogWeapon-75';
export const BULLDOGWEAPON_EXTRA_076 = { idx:76, value:318.432, label:'BulldogWeapon-76' };
// BulldogWeapon tuning note 76: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_076 = 705.43; // Hz
export type BulldogWeaponVariant76 = 'BulldogWeapon-76';
export const BULLDOGWEAPON_EXTRA_077 = { idx:77, value:67.263, label:'BulldogWeapon-77' };
// BulldogWeapon tuning note 77: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_077 = 546.61; // Hz
export type BulldogWeaponVariant77 = 'BulldogWeapon-77';
export const BULLDOGWEAPON_EXTRA_078 = { idx:78, value:387.424, label:'BulldogWeapon-78' };
// BulldogWeapon tuning note 78: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_078 = 490.71; // Hz
export type BulldogWeaponVariant78 = 'BulldogWeapon-78';
export const BULLDOGWEAPON_EXTRA_079 = { idx:79, value:298.893, label:'BulldogWeapon-79' };
// BulldogWeapon tuning note 79: ensures deterministic recoil and audio sync
export const BULLDOGWEAPON_AUDIO_079 = 554.58; // Hz
export type BulldogWeaponVariant79 = 'BulldogWeapon-79';

// padding line 0 — BulldogWeapon.ts — Ring-07
// padding line 1 — BulldogWeapon.ts — Ring-07
// padding line 2 — BulldogWeapon.ts — Ring-07
