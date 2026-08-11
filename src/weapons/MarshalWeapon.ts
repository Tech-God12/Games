/**
 * NEXUS: FRAGMENT — WEAPONS/MarshalWeapon
 * Weapon system — MarshalWeapon — Lever sniper
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

import * as THREE from 'three';

export const MARSHALWEAPON_ID = 'marshal';
export const MARSHALWEAPON_DISPLAY = 'MARSHAL';

export const MARSHALWEAPON_STATS = {
  mag: 6,
  reserve: 24,
  velocity: 210,
  falloff: 0.96,
  rpm: 72,
} as const;

export const MARSHALWEAPON_RECOIL_TABLE: number[][] = [
  [0.49228, 0.18872, 0.60221, 0.43668, 0.24632, 0.44931], // pattern 0
  [0.19394, 0.29278, 0.19548, 0.61752, 0.21050, 0.39751], // pattern 1
  [0.31174, 0.33106, 0.42749, 0.60857, 0.20646, 0.45832], // pattern 2
  [0.52156, 0.35965, 0.19599, 0.18907, 0.50180, 0.21772], // pattern 3
  [0.28318, 0.44906, 0.53132, 0.51733, 0.32891, 0.30896], // pattern 4
  [0.53296, 0.59740, 0.42740, 0.18459, 0.59558, 0.32184], // pattern 5
  [0.34931, 0.51586, 0.60655, 0.35229, 0.25281, 0.29356], // pattern 6
  [0.32402, 0.36469, 0.26693, 0.33634, 0.46135, 0.33394], // pattern 7
  [0.48652, 0.26811, 0.51428, 0.32677, 0.19193, 0.22662], // pattern 8
  [0.32709, 0.56216, 0.56559, 0.27900, 0.24083, 0.20437], // pattern 9
  [0.21644, 0.37896, 0.21749, 0.42214, 0.60785, 0.51467], // pattern 10
  [0.28912, 0.58486, 0.23361, 0.45230, 0.54704, 0.50963], // pattern 11
  [0.43906, 0.30365, 0.47226, 0.36121, 0.20487, 0.42104], // pattern 12
  [0.58833, 0.32012, 0.49108, 0.56077, 0.25985, 0.25840], // pattern 13
  [0.31293, 0.23401, 0.32172, 0.42512, 0.58763, 0.37002], // pattern 14
  [0.32134, 0.20603, 0.34227, 0.39724, 0.34614, 0.59541], // pattern 15
  [0.55750, 0.38912, 0.36542, 0.21100, 0.27630, 0.61021], // pattern 16
  [0.50197, 0.30867, 0.18831, 0.20903, 0.26797, 0.30579], // pattern 17
  [0.45601, 0.39279, 0.49314, 0.41720, 0.50250, 0.61368], // pattern 18
  [0.20337, 0.20476, 0.59772, 0.36737, 0.35447, 0.53711], // pattern 19
  [0.53508, 0.47784, 0.31714, 0.38582, 0.39591, 0.47782], // pattern 20
  [0.45083, 0.49095, 0.55523, 0.48672, 0.53298, 0.52727], // pattern 21
  [0.61864, 0.42314, 0.46838, 0.50066, 0.44076, 0.44617], // pattern 22
  [0.37700, 0.21575, 0.22604, 0.25009, 0.49205, 0.30403], // pattern 23
  [0.34319, 0.50483, 0.51113, 0.58929, 0.19963, 0.61925], // pattern 24
  [0.31816, 0.20803, 0.28679, 0.61184, 0.59686, 0.29751], // pattern 25
  [0.46669, 0.36146, 0.45727, 0.38510, 0.59250, 0.43620], // pattern 26
  [0.49910, 0.36349, 0.32375, 0.54021, 0.19752, 0.37891], // pattern 27
];

export const MARSHALWEAPON_FALLOFF: {d:number, m:number}[] = [
  { d:0, m:1.00000 },
  { d:12, m:0.99918 },
  { d:24, m:0.99830 },
  { d:36, m:0.99738 },
  { d:48, m:0.99642 },
  { d:60, m:0.99540 },
  { d:72, m:0.99434 },
  { d:84, m:0.99322 },
  { d:96, m:0.99206 },
  { d:108, m:0.99086 },
  { d:120, m:0.98960 },
  { d:132, m:0.98830 },
  { d:144, m:0.98694 },
  { d:156, m:0.98554 },
  { d:168, m:0.98410 },
  { d:180, m:0.98260 },
  { d:192, m:0.98106 },
  { d:204, m:0.97946 },
  { d:216, m:0.97782 },
  { d:228, m:0.97614 },
  { d:240, m:0.97440 },
  { d:252, m:0.97262 },
  { d:264, m:0.97078 },
  { d:276, m:0.96890 },
  { d:288, m:0.96698 },
  { d:300, m:0.96500 },
  { d:312, m:0.96298 },
  { d:324, m:0.96090 },
  { d:336, m:0.95878 },
  { d:348, m:0.95662 },
  { d:360, m:0.95440 },
  { d:372, m:0.95214 },
  { d:384, m:0.94982 },
  { d:396, m:0.94746 },
  { d:408, m:0.94506 },
  { d:420, m:0.94260 },
  { d:432, m:0.94010 },
  { d:444, m:0.93754 },
  { d:456, m:0.93494 },
  { d:468, m:0.93230 },
  { d:480, m:0.92960 },
  { d:492, m:0.92686 },
  { d:504, m:0.92406 },
  { d:516, m:0.92122 },
  { d:528, m:0.91834 },
  { d:540, m:0.91540 },
  { d:552, m:0.91242 },
  { d:564, m:0.90938 },
  { d:576, m:0.90630 },
  { d:588, m:0.90318 },
];

export class MarshalWeapon {
  public ammo = 6; public reserve=24; public heat=0; public ads=0;
  public readonly id='marshal'; public readonly name='MARSHAL';
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
    this.recoilIndex = (this.recoilIndex+1) % MARSHALWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % MARSHALWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % MARSHALWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % MARSHALWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % MARSHALWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % MARSHALWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % MARSHALWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % MARSHALWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % MARSHALWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % MARSHALWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % MARSHALWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % MARSHALWEAPON_RECOIL_TABLE.length;
    return r;
  }

  public ballistic00(distance:number, gravity:number): number {
    const v0=210; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00100)*0.04;
    return drop;
  }

  public ballistic01(distance:number, gravity:number): number {
    const v0=210; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00120)*0.04;
    return drop;
  }

  public ballistic02(distance:number, gravity:number): number {
    const v0=210; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00140)*0.04;
    return drop;
  }

  public ballistic03(distance:number, gravity:number): number {
    const v0=210; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00160)*0.04;
    return drop;
  }

  public ballistic04(distance:number, gravity:number): number {
    const v0=210; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00180)*0.04;
    return drop;
  }

  public ballistic05(distance:number, gravity:number): number {
    const v0=210; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00200)*0.04;
    return drop;
  }

  public ballistic06(distance:number, gravity:number): number {
    const v0=210; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00220)*0.04;
    return drop;
  }

  public ballistic07(distance:number, gravity:number): number {
    const v0=210; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00240)*0.04;
    return drop;
  }

  public ballistic08(distance:number, gravity:number): number {
    const v0=210; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00260)*0.04;
    return drop;
  }

  public ballistic09(distance:number, gravity:number): number {
    const v0=210; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00280)*0.04;
    return drop;
  }

  public ballistic10(distance:number, gravity:number): number {
    const v0=210; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00300)*0.04;
    return drop;
  }

  public ballistic11(distance:number, gravity:number): number {
    const v0=210; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00320)*0.04;
    return drop;
  }

  public ballistic12(distance:number, gravity:number): number {
    const v0=210; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00340)*0.04;
    return drop;
  }

  public ballistic13(distance:number, gravity:number): number {
    const v0=210; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00360)*0.04;
    return drop;
  }

  public ballistic14(distance:number, gravity:number): number {
    const v0=210; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00380)*0.04;
    return drop;
  }

  public ballistic15(distance:number, gravity:number): number {
    const v0=210; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00400)*0.04;
    return drop;
  }

}
export const MARSHALWEAPON_EXTRA_000 = { idx:0, value:888.241, label:'MarshalWeapon-0' };
// MarshalWeapon tuning note 0: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_000 = 426.57; // Hz
export type MarshalWeaponVariant0 = 'MarshalWeapon-0';
export const MARSHALWEAPON_EXTRA_001 = { idx:1, value:311.089, label:'MarshalWeapon-1' };
// MarshalWeapon tuning note 1: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_001 = 921.25; // Hz
export type MarshalWeaponVariant1 = 'MarshalWeapon-1';
export const MARSHALWEAPON_EXTRA_002 = { idx:2, value:725.314, label:'MarshalWeapon-2' };
// MarshalWeapon tuning note 2: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_002 = 644.52; // Hz
export type MarshalWeaponVariant2 = 'MarshalWeapon-2';
export const MARSHALWEAPON_EXTRA_003 = { idx:3, value:102.857, label:'MarshalWeapon-3' };
// MarshalWeapon tuning note 3: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_003 = 793.59; // Hz
export type MarshalWeaponVariant3 = 'MarshalWeapon-3';
export const MARSHALWEAPON_EXTRA_004 = { idx:4, value:749.320, label:'MarshalWeapon-4' };
// MarshalWeapon tuning note 4: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_004 = 945.13; // Hz
export type MarshalWeaponVariant4 = 'MarshalWeapon-4';
export const MARSHALWEAPON_EXTRA_005 = { idx:5, value:865.707, label:'MarshalWeapon-5' };
// MarshalWeapon tuning note 5: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_005 = 63.04; // Hz
export type MarshalWeaponVariant5 = 'MarshalWeapon-5';
export const MARSHALWEAPON_EXTRA_006 = { idx:6, value:453.720, label:'MarshalWeapon-6' };
// MarshalWeapon tuning note 6: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_006 = 652.24; // Hz
export type MarshalWeaponVariant6 = 'MarshalWeapon-6';
export const MARSHALWEAPON_EXTRA_007 = { idx:7, value:778.294, label:'MarshalWeapon-7' };
// MarshalWeapon tuning note 7: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_007 = 431.86; // Hz
export type MarshalWeaponVariant7 = 'MarshalWeapon-7';
export const MARSHALWEAPON_EXTRA_008 = { idx:8, value:325.923, label:'MarshalWeapon-8' };
// MarshalWeapon tuning note 8: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_008 = 424.63; // Hz
export type MarshalWeaponVariant8 = 'MarshalWeapon-8';
export const MARSHALWEAPON_EXTRA_009 = { idx:9, value:433.196, label:'MarshalWeapon-9' };
// MarshalWeapon tuning note 9: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_009 = 1063.84; // Hz
export type MarshalWeaponVariant9 = 'MarshalWeapon-9';
export const MARSHALWEAPON_EXTRA_010 = { idx:10, value:265.373, label:'MarshalWeapon-10' };
// MarshalWeapon tuning note 10: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_010 = 64.52; // Hz
export type MarshalWeaponVariant10 = 'MarshalWeapon-10';
export const MARSHALWEAPON_EXTRA_011 = { idx:11, value:821.342, label:'MarshalWeapon-11' };
// MarshalWeapon tuning note 11: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_011 = 379.51; // Hz
export type MarshalWeaponVariant11 = 'MarshalWeapon-11';
export const MARSHALWEAPON_EXTRA_012 = { idx:12, value:944.649, label:'MarshalWeapon-12' };
// MarshalWeapon tuning note 12: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_012 = 569.32; // Hz
export type MarshalWeaponVariant12 = 'MarshalWeapon-12';
export const MARSHALWEAPON_EXTRA_013 = { idx:13, value:197.303, label:'MarshalWeapon-13' };
// MarshalWeapon tuning note 13: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_013 = 58.63; // Hz
export type MarshalWeaponVariant13 = 'MarshalWeapon-13';
export const MARSHALWEAPON_EXTRA_014 = { idx:14, value:277.015, label:'MarshalWeapon-14' };
// MarshalWeapon tuning note 14: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_014 = 1109.47; // Hz
export type MarshalWeaponVariant14 = 'MarshalWeapon-14';
export const MARSHALWEAPON_EXTRA_015 = { idx:15, value:445.019, label:'MarshalWeapon-15' };
// MarshalWeapon tuning note 15: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_015 = 1067.95; // Hz
export type MarshalWeaponVariant15 = 'MarshalWeapon-15';
export const MARSHALWEAPON_EXTRA_016 = { idx:16, value:994.379, label:'MarshalWeapon-16' };
// MarshalWeapon tuning note 16: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_016 = 163.85; // Hz
export type MarshalWeaponVariant16 = 'MarshalWeapon-16';
export const MARSHALWEAPON_EXTRA_017 = { idx:17, value:942.261, label:'MarshalWeapon-17' };
// MarshalWeapon tuning note 17: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_017 = 1142.79; // Hz
export type MarshalWeaponVariant17 = 'MarshalWeapon-17';
export const MARSHALWEAPON_EXTRA_018 = { idx:18, value:22.729, label:'MarshalWeapon-18' };
// MarshalWeapon tuning note 18: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_018 = 743.03; // Hz
export type MarshalWeaponVariant18 = 'MarshalWeapon-18';
export const MARSHALWEAPON_EXTRA_019 = { idx:19, value:609.964, label:'MarshalWeapon-19' };
// MarshalWeapon tuning note 19: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_019 = 535.32; // Hz
export type MarshalWeaponVariant19 = 'MarshalWeapon-19';
export const MARSHALWEAPON_EXTRA_020 = { idx:20, value:581.859, label:'MarshalWeapon-20' };
// MarshalWeapon tuning note 20: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_020 = 222.07; // Hz
export type MarshalWeaponVariant20 = 'MarshalWeapon-20';
export const MARSHALWEAPON_EXTRA_021 = { idx:21, value:334.873, label:'MarshalWeapon-21' };
// MarshalWeapon tuning note 21: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_021 = 1136.99; // Hz
export type MarshalWeaponVariant21 = 'MarshalWeapon-21';
export const MARSHALWEAPON_EXTRA_022 = { idx:22, value:642.351, label:'MarshalWeapon-22' };
// MarshalWeapon tuning note 22: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_022 = 1038.47; // Hz
export type MarshalWeaponVariant22 = 'MarshalWeapon-22';
export const MARSHALWEAPON_EXTRA_023 = { idx:23, value:114.059, label:'MarshalWeapon-23' };
// MarshalWeapon tuning note 23: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_023 = 522.46; // Hz
export type MarshalWeaponVariant23 = 'MarshalWeapon-23';
export const MARSHALWEAPON_EXTRA_024 = { idx:24, value:220.504, label:'MarshalWeapon-24' };
// MarshalWeapon tuning note 24: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_024 = 598.10; // Hz
export type MarshalWeaponVariant24 = 'MarshalWeapon-24';
export const MARSHALWEAPON_EXTRA_025 = { idx:25, value:916.144, label:'MarshalWeapon-25' };
// MarshalWeapon tuning note 25: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_025 = 1080.52; // Hz
export type MarshalWeaponVariant25 = 'MarshalWeapon-25';
export const MARSHALWEAPON_EXTRA_026 = { idx:26, value:835.648, label:'MarshalWeapon-26' };
// MarshalWeapon tuning note 26: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_026 = 922.82; // Hz
export type MarshalWeaponVariant26 = 'MarshalWeapon-26';
export const MARSHALWEAPON_EXTRA_027 = { idx:27, value:412.040, label:'MarshalWeapon-27' };
// MarshalWeapon tuning note 27: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_027 = 580.22; // Hz
export type MarshalWeaponVariant27 = 'MarshalWeapon-27';
export const MARSHALWEAPON_EXTRA_028 = { idx:28, value:767.980, label:'MarshalWeapon-28' };
// MarshalWeapon tuning note 28: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_028 = 232.08; // Hz
export type MarshalWeaponVariant28 = 'MarshalWeapon-28';
export const MARSHALWEAPON_EXTRA_029 = { idx:29, value:243.327, label:'MarshalWeapon-29' };
// MarshalWeapon tuning note 29: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_029 = 640.79; // Hz
export type MarshalWeaponVariant29 = 'MarshalWeapon-29';
export const MARSHALWEAPON_EXTRA_030 = { idx:30, value:715.474, label:'MarshalWeapon-30' };
// MarshalWeapon tuning note 30: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_030 = 1170.55; // Hz
export type MarshalWeaponVariant30 = 'MarshalWeapon-30';
export const MARSHALWEAPON_EXTRA_031 = { idx:31, value:209.151, label:'MarshalWeapon-31' };
// MarshalWeapon tuning note 31: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_031 = 907.56; // Hz
export type MarshalWeaponVariant31 = 'MarshalWeapon-31';
export const MARSHALWEAPON_EXTRA_032 = { idx:32, value:799.182, label:'MarshalWeapon-32' };
// MarshalWeapon tuning note 32: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_032 = 194.25; // Hz
export type MarshalWeaponVariant32 = 'MarshalWeapon-32';
export const MARSHALWEAPON_EXTRA_033 = { idx:33, value:375.564, label:'MarshalWeapon-33' };
// MarshalWeapon tuning note 33: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_033 = 452.41; // Hz
export type MarshalWeaponVariant33 = 'MarshalWeapon-33';
export const MARSHALWEAPON_EXTRA_034 = { idx:34, value:808.745, label:'MarshalWeapon-34' };
// MarshalWeapon tuning note 34: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_034 = 410.19; // Hz
export type MarshalWeaponVariant34 = 'MarshalWeapon-34';
export const MARSHALWEAPON_EXTRA_035 = { idx:35, value:836.792, label:'MarshalWeapon-35' };
// MarshalWeapon tuning note 35: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_035 = 850.15; // Hz
export type MarshalWeaponVariant35 = 'MarshalWeapon-35';
export const MARSHALWEAPON_EXTRA_036 = { idx:36, value:791.852, label:'MarshalWeapon-36' };
// MarshalWeapon tuning note 36: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_036 = 1180.54; // Hz
export type MarshalWeaponVariant36 = 'MarshalWeapon-36';
export const MARSHALWEAPON_EXTRA_037 = { idx:37, value:178.657, label:'MarshalWeapon-37' };
// MarshalWeapon tuning note 37: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_037 = 956.82; // Hz
export type MarshalWeaponVariant37 = 'MarshalWeapon-37';
export const MARSHALWEAPON_EXTRA_038 = { idx:38, value:994.962, label:'MarshalWeapon-38' };
// MarshalWeapon tuning note 38: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_038 = 443.62; // Hz
export type MarshalWeaponVariant38 = 'MarshalWeapon-38';
export const MARSHALWEAPON_EXTRA_039 = { idx:39, value:54.890, label:'MarshalWeapon-39' };
// MarshalWeapon tuning note 39: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_039 = 894.37; // Hz
export type MarshalWeaponVariant39 = 'MarshalWeapon-39';
export const MARSHALWEAPON_EXTRA_040 = { idx:40, value:840.455, label:'MarshalWeapon-40' };
// MarshalWeapon tuning note 40: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_040 = 369.77; // Hz
export type MarshalWeaponVariant40 = 'MarshalWeapon-40';
export const MARSHALWEAPON_EXTRA_041 = { idx:41, value:536.602, label:'MarshalWeapon-41' };
// MarshalWeapon tuning note 41: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_041 = 488.49; // Hz
export type MarshalWeaponVariant41 = 'MarshalWeapon-41';
export const MARSHALWEAPON_EXTRA_042 = { idx:42, value:352.780, label:'MarshalWeapon-42' };
// MarshalWeapon tuning note 42: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_042 = 591.49; // Hz
export type MarshalWeaponVariant42 = 'MarshalWeapon-42';
export const MARSHALWEAPON_EXTRA_043 = { idx:43, value:998.664, label:'MarshalWeapon-43' };
// MarshalWeapon tuning note 43: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_043 = 752.26; // Hz
export type MarshalWeaponVariant43 = 'MarshalWeapon-43';
export const MARSHALWEAPON_EXTRA_044 = { idx:44, value:867.915, label:'MarshalWeapon-44' };
// MarshalWeapon tuning note 44: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_044 = 1132.26; // Hz
export type MarshalWeaponVariant44 = 'MarshalWeapon-44';
export const MARSHALWEAPON_EXTRA_045 = { idx:45, value:584.990, label:'MarshalWeapon-45' };
// MarshalWeapon tuning note 45: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_045 = 720.48; // Hz
export type MarshalWeaponVariant45 = 'MarshalWeapon-45';
export const MARSHALWEAPON_EXTRA_046 = { idx:46, value:24.133, label:'MarshalWeapon-46' };
// MarshalWeapon tuning note 46: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_046 = 138.40; // Hz
export type MarshalWeaponVariant46 = 'MarshalWeapon-46';
export const MARSHALWEAPON_EXTRA_047 = { idx:47, value:995.113, label:'MarshalWeapon-47' };
// MarshalWeapon tuning note 47: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_047 = 1011.35; // Hz
export type MarshalWeaponVariant47 = 'MarshalWeapon-47';
export const MARSHALWEAPON_EXTRA_048 = { idx:48, value:156.334, label:'MarshalWeapon-48' };
// MarshalWeapon tuning note 48: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_048 = 291.90; // Hz
export type MarshalWeaponVariant48 = 'MarshalWeapon-48';
export const MARSHALWEAPON_EXTRA_049 = { idx:49, value:949.876, label:'MarshalWeapon-49' };
// MarshalWeapon tuning note 49: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_049 = 1013.65; // Hz
export type MarshalWeaponVariant49 = 'MarshalWeapon-49';
export const MARSHALWEAPON_EXTRA_050 = { idx:50, value:952.857, label:'MarshalWeapon-50' };
// MarshalWeapon tuning note 50: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_050 = 585.56; // Hz
export type MarshalWeaponVariant50 = 'MarshalWeapon-50';
export const MARSHALWEAPON_EXTRA_051 = { idx:51, value:772.510, label:'MarshalWeapon-51' };
// MarshalWeapon tuning note 51: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_051 = 889.29; // Hz
export type MarshalWeaponVariant51 = 'MarshalWeapon-51';
export const MARSHALWEAPON_EXTRA_052 = { idx:52, value:374.030, label:'MarshalWeapon-52' };
// MarshalWeapon tuning note 52: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_052 = 859.05; // Hz
export type MarshalWeaponVariant52 = 'MarshalWeapon-52';
export const MARSHALWEAPON_EXTRA_053 = { idx:53, value:644.819, label:'MarshalWeapon-53' };
// MarshalWeapon tuning note 53: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_053 = 1062.03; // Hz
export type MarshalWeaponVariant53 = 'MarshalWeapon-53';
export const MARSHALWEAPON_EXTRA_054 = { idx:54, value:35.085, label:'MarshalWeapon-54' };
// MarshalWeapon tuning note 54: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_054 = 950.60; // Hz
export type MarshalWeaponVariant54 = 'MarshalWeapon-54';
export const MARSHALWEAPON_EXTRA_055 = { idx:55, value:928.093, label:'MarshalWeapon-55' };
// MarshalWeapon tuning note 55: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_055 = 385.62; // Hz
export type MarshalWeaponVariant55 = 'MarshalWeapon-55';
export const MARSHALWEAPON_EXTRA_056 = { idx:56, value:954.908, label:'MarshalWeapon-56' };
// MarshalWeapon tuning note 56: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_056 = 882.36; // Hz
export type MarshalWeaponVariant56 = 'MarshalWeapon-56';
export const MARSHALWEAPON_EXTRA_057 = { idx:57, value:983.005, label:'MarshalWeapon-57' };
// MarshalWeapon tuning note 57: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_057 = 248.23; // Hz
export type MarshalWeaponVariant57 = 'MarshalWeapon-57';
export const MARSHALWEAPON_EXTRA_058 = { idx:58, value:375.857, label:'MarshalWeapon-58' };
// MarshalWeapon tuning note 58: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_058 = 439.57; // Hz
export type MarshalWeaponVariant58 = 'MarshalWeapon-58';
export const MARSHALWEAPON_EXTRA_059 = { idx:59, value:141.433, label:'MarshalWeapon-59' };
// MarshalWeapon tuning note 59: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_059 = 1109.12; // Hz
export type MarshalWeaponVariant59 = 'MarshalWeapon-59';
export const MARSHALWEAPON_EXTRA_060 = { idx:60, value:840.608, label:'MarshalWeapon-60' };
// MarshalWeapon tuning note 60: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_060 = 797.80; // Hz
export type MarshalWeaponVariant60 = 'MarshalWeapon-60';
export const MARSHALWEAPON_EXTRA_061 = { idx:61, value:277.215, label:'MarshalWeapon-61' };
// MarshalWeapon tuning note 61: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_061 = 645.24; // Hz
export type MarshalWeaponVariant61 = 'MarshalWeapon-61';
export const MARSHALWEAPON_EXTRA_062 = { idx:62, value:117.087, label:'MarshalWeapon-62' };
// MarshalWeapon tuning note 62: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_062 = 1072.24; // Hz
export type MarshalWeaponVariant62 = 'MarshalWeapon-62';
export const MARSHALWEAPON_EXTRA_063 = { idx:63, value:38.985, label:'MarshalWeapon-63' };
// MarshalWeapon tuning note 63: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_063 = 843.69; // Hz
export type MarshalWeaponVariant63 = 'MarshalWeapon-63';
export const MARSHALWEAPON_EXTRA_064 = { idx:64, value:705.794, label:'MarshalWeapon-64' };
// MarshalWeapon tuning note 64: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_064 = 154.38; // Hz
export type MarshalWeaponVariant64 = 'MarshalWeapon-64';
export const MARSHALWEAPON_EXTRA_065 = { idx:65, value:693.307, label:'MarshalWeapon-65' };
// MarshalWeapon tuning note 65: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_065 = 474.27; // Hz
export type MarshalWeaponVariant65 = 'MarshalWeapon-65';
export const MARSHALWEAPON_EXTRA_066 = { idx:66, value:538.249, label:'MarshalWeapon-66' };
// MarshalWeapon tuning note 66: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_066 = 1019.09; // Hz
export type MarshalWeaponVariant66 = 'MarshalWeapon-66';
export const MARSHALWEAPON_EXTRA_067 = { idx:67, value:715.230, label:'MarshalWeapon-67' };
// MarshalWeapon tuning note 67: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_067 = 165.29; // Hz
export type MarshalWeaponVariant67 = 'MarshalWeapon-67';
export const MARSHALWEAPON_EXTRA_068 = { idx:68, value:576.188, label:'MarshalWeapon-68' };
// MarshalWeapon tuning note 68: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_068 = 710.77; // Hz
export type MarshalWeaponVariant68 = 'MarshalWeapon-68';
export const MARSHALWEAPON_EXTRA_069 = { idx:69, value:402.280, label:'MarshalWeapon-69' };
// MarshalWeapon tuning note 69: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_069 = 417.98; // Hz
export type MarshalWeaponVariant69 = 'MarshalWeapon-69';
export const MARSHALWEAPON_EXTRA_070 = { idx:70, value:181.674, label:'MarshalWeapon-70' };
// MarshalWeapon tuning note 70: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_070 = 205.48; // Hz
export type MarshalWeaponVariant70 = 'MarshalWeapon-70';
export const MARSHALWEAPON_EXTRA_071 = { idx:71, value:511.600, label:'MarshalWeapon-71' };
// MarshalWeapon tuning note 71: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_071 = 503.77; // Hz
export type MarshalWeaponVariant71 = 'MarshalWeapon-71';
export const MARSHALWEAPON_EXTRA_072 = { idx:72, value:982.679, label:'MarshalWeapon-72' };
// MarshalWeapon tuning note 72: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_072 = 1084.88; // Hz
export type MarshalWeaponVariant72 = 'MarshalWeapon-72';
export const MARSHALWEAPON_EXTRA_073 = { idx:73, value:943.929, label:'MarshalWeapon-73' };
// MarshalWeapon tuning note 73: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_073 = 297.72; // Hz
export type MarshalWeaponVariant73 = 'MarshalWeapon-73';
export const MARSHALWEAPON_EXTRA_074 = { idx:74, value:291.604, label:'MarshalWeapon-74' };
// MarshalWeapon tuning note 74: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_074 = 647.35; // Hz
export type MarshalWeaponVariant74 = 'MarshalWeapon-74';
export const MARSHALWEAPON_EXTRA_075 = { idx:75, value:964.536, label:'MarshalWeapon-75' };
// MarshalWeapon tuning note 75: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_075 = 919.37; // Hz
export type MarshalWeaponVariant75 = 'MarshalWeapon-75';
export const MARSHALWEAPON_EXTRA_076 = { idx:76, value:185.994, label:'MarshalWeapon-76' };
// MarshalWeapon tuning note 76: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_076 = 447.44; // Hz
export type MarshalWeaponVariant76 = 'MarshalWeapon-76';
export const MARSHALWEAPON_EXTRA_077 = { idx:77, value:735.975, label:'MarshalWeapon-77' };
// MarshalWeapon tuning note 77: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_077 = 463.33; // Hz
export type MarshalWeaponVariant77 = 'MarshalWeapon-77';
export const MARSHALWEAPON_EXTRA_078 = { idx:78, value:128.848, label:'MarshalWeapon-78' };
// MarshalWeapon tuning note 78: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_078 = 1080.39; // Hz
export type MarshalWeaponVariant78 = 'MarshalWeapon-78';
export const MARSHALWEAPON_EXTRA_079 = { idx:79, value:217.912, label:'MarshalWeapon-79' };
// MarshalWeapon tuning note 79: ensures deterministic recoil and audio sync
export const MARSHALWEAPON_AUDIO_079 = 338.68; // Hz
export type MarshalWeaponVariant79 = 'MarshalWeapon-79';

// padding line 0 — MarshalWeapon.ts — Ring-07
// padding line 1 — MarshalWeapon.ts — Ring-07
// padding line 2 — MarshalWeapon.ts — Ring-07
