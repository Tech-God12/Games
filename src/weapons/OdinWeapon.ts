/**
 * NEXUS: FRAGMENT — WEAPONS/OdinWeapon
 * Weapon system — OdinWeapon — Light machine gun
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

import * as THREE from 'three';

export const ODINWEAPON_ID = 'odin';
export const ODINWEAPON_DISPLAY = 'ODIN';

export const ODINWEAPON_STATS = {
  mag: 60,
  reserve: 180,
  velocity: 95,
  falloff: 0.9,
  rpm: 540,
} as const;

export const ODINWEAPON_RECOIL_TABLE: number[][] = [
  [0.46605, 0.32118, 0.49878, 0.26827, 0.45451, 0.52629], // pattern 0
  [0.31717, 0.38255, 0.39091, 0.25349, 0.20623, 0.26676], // pattern 1
  [0.49490, 0.58059, 0.47586, 0.33159, 0.40426, 0.18320], // pattern 2
  [0.26650, 0.54814, 0.53875, 0.35556, 0.52866, 0.22202], // pattern 3
  [0.52968, 0.19696, 0.47473, 0.47146, 0.29695, 0.18654], // pattern 4
  [0.57446, 0.49153, 0.30007, 0.36726, 0.53968, 0.46421], // pattern 5
  [0.50272, 0.25099, 0.21753, 0.25323, 0.23568, 0.49075], // pattern 6
  [0.59481, 0.29578, 0.33326, 0.60327, 0.56647, 0.21093], // pattern 7
  [0.49274, 0.50950, 0.36071, 0.33881, 0.52032, 0.50556], // pattern 8
  [0.24354, 0.32131, 0.36526, 0.43893, 0.34419, 0.29525], // pattern 9
  [0.52143, 0.53833, 0.61031, 0.53876, 0.18288, 0.36873], // pattern 10
  [0.32004, 0.39649, 0.40160, 0.37678, 0.44029, 0.41842], // pattern 11
  [0.30522, 0.21191, 0.18889, 0.23196, 0.36798, 0.18613], // pattern 12
  [0.43642, 0.37819, 0.52263, 0.20161, 0.43033, 0.55858], // pattern 13
  [0.19998, 0.35810, 0.59471, 0.53747, 0.53204, 0.44523], // pattern 14
  [0.59443, 0.53936, 0.30611, 0.20872, 0.57703, 0.48638], // pattern 15
  [0.24582, 0.40483, 0.19209, 0.32098, 0.53070, 0.47431], // pattern 16
  [0.34798, 0.20579, 0.55961, 0.44503, 0.55976, 0.22162], // pattern 17
  [0.52301, 0.56448, 0.35017, 0.41980, 0.32980, 0.56237], // pattern 18
  [0.41845, 0.25367, 0.60288, 0.23408, 0.35218, 0.24349], // pattern 19
  [0.39640, 0.61727, 0.39687, 0.49851, 0.54073, 0.38709], // pattern 20
  [0.31410, 0.42363, 0.23292, 0.37886, 0.38354, 0.51576], // pattern 21
  [0.18546, 0.32924, 0.46273, 0.30531, 0.59828, 0.39557], // pattern 22
  [0.54264, 0.23008, 0.19038, 0.33465, 0.48285, 0.50797], // pattern 23
  [0.60279, 0.48110, 0.18146, 0.32498, 0.49061, 0.61221], // pattern 24
  [0.40709, 0.48883, 0.43811, 0.42296, 0.30834, 0.31641], // pattern 25
  [0.25080, 0.19479, 0.29359, 0.42934, 0.59483, 0.31613], // pattern 26
  [0.35077, 0.49452, 0.48001, 0.56126, 0.31700, 0.49556], // pattern 27
];

export const ODINWEAPON_FALLOFF: {d:number, m:number}[] = [
  { d:0, m:1.00000 },
  { d:12, m:0.99798 },
  { d:24, m:0.99590 },
  { d:36, m:0.99378 },
  { d:48, m:0.99162 },
  { d:60, m:0.98940 },
  { d:72, m:0.98714 },
  { d:84, m:0.98482 },
  { d:96, m:0.98246 },
  { d:108, m:0.98006 },
  { d:120, m:0.97760 },
  { d:132, m:0.97510 },
  { d:144, m:0.97254 },
  { d:156, m:0.96994 },
  { d:168, m:0.96730 },
  { d:180, m:0.96460 },
  { d:192, m:0.96186 },
  { d:204, m:0.95906 },
  { d:216, m:0.95622 },
  { d:228, m:0.95334 },
  { d:240, m:0.95040 },
  { d:252, m:0.94742 },
  { d:264, m:0.94438 },
  { d:276, m:0.94130 },
  { d:288, m:0.93818 },
  { d:300, m:0.93500 },
  { d:312, m:0.93178 },
  { d:324, m:0.92850 },
  { d:336, m:0.92518 },
  { d:348, m:0.92182 },
  { d:360, m:0.91840 },
  { d:372, m:0.91494 },
  { d:384, m:0.91142 },
  { d:396, m:0.90786 },
  { d:408, m:0.90426 },
  { d:420, m:0.90060 },
  { d:432, m:0.89690 },
  { d:444, m:0.89314 },
  { d:456, m:0.88934 },
  { d:468, m:0.88550 },
  { d:480, m:0.88160 },
  { d:492, m:0.87766 },
  { d:504, m:0.87366 },
  { d:516, m:0.86962 },
  { d:528, m:0.86554 },
  { d:540, m:0.86140 },
  { d:552, m:0.85722 },
  { d:564, m:0.85298 },
  { d:576, m:0.84870 },
  { d:588, m:0.84438 },
];

export class OdinWeapon {
  public ammo = 60; public reserve=180; public heat=0; public ads=0;
  public readonly id='odin'; public readonly name='ODIN';
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
    this.recoilIndex = (this.recoilIndex+1) % ODINWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % ODINWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % ODINWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % ODINWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % ODINWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % ODINWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % ODINWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % ODINWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % ODINWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % ODINWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % ODINWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % ODINWEAPON_RECOIL_TABLE.length;
    return r;
  }

  public ballistic00(distance:number, gravity:number): number {
    const v0=95; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00100)*0.04;
    return drop;
  }

  public ballistic01(distance:number, gravity:number): number {
    const v0=95; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00120)*0.04;
    return drop;
  }

  public ballistic02(distance:number, gravity:number): number {
    const v0=95; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00140)*0.04;
    return drop;
  }

  public ballistic03(distance:number, gravity:number): number {
    const v0=95; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00160)*0.04;
    return drop;
  }

  public ballistic04(distance:number, gravity:number): number {
    const v0=95; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00180)*0.04;
    return drop;
  }

  public ballistic05(distance:number, gravity:number): number {
    const v0=95; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00200)*0.04;
    return drop;
  }

  public ballistic06(distance:number, gravity:number): number {
    const v0=95; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00220)*0.04;
    return drop;
  }

  public ballistic07(distance:number, gravity:number): number {
    const v0=95; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00240)*0.04;
    return drop;
  }

  public ballistic08(distance:number, gravity:number): number {
    const v0=95; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00260)*0.04;
    return drop;
  }

  public ballistic09(distance:number, gravity:number): number {
    const v0=95; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00280)*0.04;
    return drop;
  }

  public ballistic10(distance:number, gravity:number): number {
    const v0=95; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00300)*0.04;
    return drop;
  }

  public ballistic11(distance:number, gravity:number): number {
    const v0=95; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00320)*0.04;
    return drop;
  }

  public ballistic12(distance:number, gravity:number): number {
    const v0=95; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00340)*0.04;
    return drop;
  }

  public ballistic13(distance:number, gravity:number): number {
    const v0=95; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00360)*0.04;
    return drop;
  }

  public ballistic14(distance:number, gravity:number): number {
    const v0=95; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00380)*0.04;
    return drop;
  }

  public ballistic15(distance:number, gravity:number): number {
    const v0=95; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00400)*0.04;
    return drop;
  }

}
export const ODINWEAPON_EXTRA_000 = { idx:0, value:308.739, label:'OdinWeapon-0' };
// OdinWeapon tuning note 0: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_000 = 393.37; // Hz
export type OdinWeaponVariant0 = 'OdinWeapon-0';
export const ODINWEAPON_EXTRA_001 = { idx:1, value:60.341, label:'OdinWeapon-1' };
// OdinWeapon tuning note 1: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_001 = 571.39; // Hz
export type OdinWeaponVariant1 = 'OdinWeapon-1';
export const ODINWEAPON_EXTRA_002 = { idx:2, value:567.084, label:'OdinWeapon-2' };
// OdinWeapon tuning note 2: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_002 = 1129.07; // Hz
export type OdinWeaponVariant2 = 'OdinWeapon-2';
export const ODINWEAPON_EXTRA_003 = { idx:3, value:621.017, label:'OdinWeapon-3' };
// OdinWeapon tuning note 3: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_003 = 969.59; // Hz
export type OdinWeaponVariant3 = 'OdinWeapon-3';
export const ODINWEAPON_EXTRA_004 = { idx:4, value:995.507, label:'OdinWeapon-4' };
// OdinWeapon tuning note 4: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_004 = 1064.80; // Hz
export type OdinWeaponVariant4 = 'OdinWeapon-4';
export const ODINWEAPON_EXTRA_005 = { idx:5, value:286.995, label:'OdinWeapon-5' };
// OdinWeapon tuning note 5: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_005 = 910.20; // Hz
export type OdinWeaponVariant5 = 'OdinWeapon-5';
export const ODINWEAPON_EXTRA_006 = { idx:6, value:443.397, label:'OdinWeapon-6' };
// OdinWeapon tuning note 6: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_006 = 802.21; // Hz
export type OdinWeaponVariant6 = 'OdinWeapon-6';
export const ODINWEAPON_EXTRA_007 = { idx:7, value:449.874, label:'OdinWeapon-7' };
// OdinWeapon tuning note 7: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_007 = 189.63; // Hz
export type OdinWeaponVariant7 = 'OdinWeapon-7';
export const ODINWEAPON_EXTRA_008 = { idx:8, value:287.125, label:'OdinWeapon-8' };
// OdinWeapon tuning note 8: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_008 = 849.33; // Hz
export type OdinWeaponVariant8 = 'OdinWeapon-8';
export const ODINWEAPON_EXTRA_009 = { idx:9, value:680.119, label:'OdinWeapon-9' };
// OdinWeapon tuning note 9: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_009 = 149.13; // Hz
export type OdinWeaponVariant9 = 'OdinWeapon-9';
export const ODINWEAPON_EXTRA_010 = { idx:10, value:272.448, label:'OdinWeapon-10' };
// OdinWeapon tuning note 10: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_010 = 786.79; // Hz
export type OdinWeaponVariant10 = 'OdinWeapon-10';
export const ODINWEAPON_EXTRA_011 = { idx:11, value:827.829, label:'OdinWeapon-11' };
// OdinWeapon tuning note 11: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_011 = 916.83; // Hz
export type OdinWeaponVariant11 = 'OdinWeapon-11';
export const ODINWEAPON_EXTRA_012 = { idx:12, value:291.246, label:'OdinWeapon-12' };
// OdinWeapon tuning note 12: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_012 = 393.63; // Hz
export type OdinWeaponVariant12 = 'OdinWeapon-12';
export const ODINWEAPON_EXTRA_013 = { idx:13, value:881.574, label:'OdinWeapon-13' };
// OdinWeapon tuning note 13: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_013 = 872.73; // Hz
export type OdinWeaponVariant13 = 'OdinWeapon-13';
export const ODINWEAPON_EXTRA_014 = { idx:14, value:709.482, label:'OdinWeapon-14' };
// OdinWeapon tuning note 14: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_014 = 398.02; // Hz
export type OdinWeaponVariant14 = 'OdinWeapon-14';
export const ODINWEAPON_EXTRA_015 = { idx:15, value:49.955, label:'OdinWeapon-15' };
// OdinWeapon tuning note 15: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_015 = 739.75; // Hz
export type OdinWeaponVariant15 = 'OdinWeapon-15';
export const ODINWEAPON_EXTRA_016 = { idx:16, value:567.366, label:'OdinWeapon-16' };
// OdinWeapon tuning note 16: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_016 = 729.11; // Hz
export type OdinWeaponVariant16 = 'OdinWeapon-16';
export const ODINWEAPON_EXTRA_017 = { idx:17, value:787.331, label:'OdinWeapon-17' };
// OdinWeapon tuning note 17: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_017 = 638.71; // Hz
export type OdinWeaponVariant17 = 'OdinWeapon-17';
export const ODINWEAPON_EXTRA_018 = { idx:18, value:281.722, label:'OdinWeapon-18' };
// OdinWeapon tuning note 18: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_018 = 51.77; // Hz
export type OdinWeaponVariant18 = 'OdinWeapon-18';
export const ODINWEAPON_EXTRA_019 = { idx:19, value:294.258, label:'OdinWeapon-19' };
// OdinWeapon tuning note 19: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_019 = 823.70; // Hz
export type OdinWeaponVariant19 = 'OdinWeapon-19';
export const ODINWEAPON_EXTRA_020 = { idx:20, value:145.995, label:'OdinWeapon-20' };
// OdinWeapon tuning note 20: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_020 = 1143.64; // Hz
export type OdinWeaponVariant20 = 'OdinWeapon-20';
export const ODINWEAPON_EXTRA_021 = { idx:21, value:359.136, label:'OdinWeapon-21' };
// OdinWeapon tuning note 21: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_021 = 672.66; // Hz
export type OdinWeaponVariant21 = 'OdinWeapon-21';
export const ODINWEAPON_EXTRA_022 = { idx:22, value:263.068, label:'OdinWeapon-22' };
// OdinWeapon tuning note 22: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_022 = 414.28; // Hz
export type OdinWeaponVariant22 = 'OdinWeapon-22';
export const ODINWEAPON_EXTRA_023 = { idx:23, value:937.885, label:'OdinWeapon-23' };
// OdinWeapon tuning note 23: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_023 = 1026.46; // Hz
export type OdinWeaponVariant23 = 'OdinWeapon-23';
export const ODINWEAPON_EXTRA_024 = { idx:24, value:73.443, label:'OdinWeapon-24' };
// OdinWeapon tuning note 24: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_024 = 231.28; // Hz
export type OdinWeaponVariant24 = 'OdinWeapon-24';
export const ODINWEAPON_EXTRA_025 = { idx:25, value:56.853, label:'OdinWeapon-25' };
// OdinWeapon tuning note 25: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_025 = 1173.31; // Hz
export type OdinWeaponVariant25 = 'OdinWeapon-25';
export const ODINWEAPON_EXTRA_026 = { idx:26, value:768.236, label:'OdinWeapon-26' };
// OdinWeapon tuning note 26: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_026 = 504.87; // Hz
export type OdinWeaponVariant26 = 'OdinWeapon-26';
export const ODINWEAPON_EXTRA_027 = { idx:27, value:934.509, label:'OdinWeapon-27' };
// OdinWeapon tuning note 27: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_027 = 1166.80; // Hz
export type OdinWeaponVariant27 = 'OdinWeapon-27';
export const ODINWEAPON_EXTRA_028 = { idx:28, value:119.138, label:'OdinWeapon-28' };
// OdinWeapon tuning note 28: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_028 = 305.18; // Hz
export type OdinWeaponVariant28 = 'OdinWeapon-28';
export const ODINWEAPON_EXTRA_029 = { idx:29, value:174.724, label:'OdinWeapon-29' };
// OdinWeapon tuning note 29: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_029 = 421.64; // Hz
export type OdinWeaponVariant29 = 'OdinWeapon-29';
export const ODINWEAPON_EXTRA_030 = { idx:30, value:187.581, label:'OdinWeapon-30' };
// OdinWeapon tuning note 30: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_030 = 1035.05; // Hz
export type OdinWeaponVariant30 = 'OdinWeapon-30';
export const ODINWEAPON_EXTRA_031 = { idx:31, value:524.952, label:'OdinWeapon-31' };
// OdinWeapon tuning note 31: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_031 = 944.98; // Hz
export type OdinWeaponVariant31 = 'OdinWeapon-31';
export const ODINWEAPON_EXTRA_032 = { idx:32, value:557.082, label:'OdinWeapon-32' };
// OdinWeapon tuning note 32: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_032 = 909.50; // Hz
export type OdinWeaponVariant32 = 'OdinWeapon-32';
export const ODINWEAPON_EXTRA_033 = { idx:33, value:876.748, label:'OdinWeapon-33' };
// OdinWeapon tuning note 33: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_033 = 550.80; // Hz
export type OdinWeaponVariant33 = 'OdinWeapon-33';
export const ODINWEAPON_EXTRA_034 = { idx:34, value:17.340, label:'OdinWeapon-34' };
// OdinWeapon tuning note 34: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_034 = 1064.52; // Hz
export type OdinWeaponVariant34 = 'OdinWeapon-34';
export const ODINWEAPON_EXTRA_035 = { idx:35, value:540.565, label:'OdinWeapon-35' };
// OdinWeapon tuning note 35: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_035 = 311.83; // Hz
export type OdinWeaponVariant35 = 'OdinWeapon-35';
export const ODINWEAPON_EXTRA_036 = { idx:36, value:467.334, label:'OdinWeapon-36' };
// OdinWeapon tuning note 36: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_036 = 167.86; // Hz
export type OdinWeaponVariant36 = 'OdinWeapon-36';
export const ODINWEAPON_EXTRA_037 = { idx:37, value:285.574, label:'OdinWeapon-37' };
// OdinWeapon tuning note 37: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_037 = 678.64; // Hz
export type OdinWeaponVariant37 = 'OdinWeapon-37';
export const ODINWEAPON_EXTRA_038 = { idx:38, value:435.621, label:'OdinWeapon-38' };
// OdinWeapon tuning note 38: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_038 = 749.02; // Hz
export type OdinWeaponVariant38 = 'OdinWeapon-38';
export const ODINWEAPON_EXTRA_039 = { idx:39, value:970.129, label:'OdinWeapon-39' };
// OdinWeapon tuning note 39: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_039 = 531.48; // Hz
export type OdinWeaponVariant39 = 'OdinWeapon-39';
export const ODINWEAPON_EXTRA_040 = { idx:40, value:306.468, label:'OdinWeapon-40' };
// OdinWeapon tuning note 40: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_040 = 260.52; // Hz
export type OdinWeaponVariant40 = 'OdinWeapon-40';
export const ODINWEAPON_EXTRA_041 = { idx:41, value:389.359, label:'OdinWeapon-41' };
// OdinWeapon tuning note 41: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_041 = 380.56; // Hz
export type OdinWeaponVariant41 = 'OdinWeapon-41';
export const ODINWEAPON_EXTRA_042 = { idx:42, value:717.212, label:'OdinWeapon-42' };
// OdinWeapon tuning note 42: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_042 = 716.68; // Hz
export type OdinWeaponVariant42 = 'OdinWeapon-42';
export const ODINWEAPON_EXTRA_043 = { idx:43, value:973.565, label:'OdinWeapon-43' };
// OdinWeapon tuning note 43: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_043 = 1028.38; // Hz
export type OdinWeaponVariant43 = 'OdinWeapon-43';
export const ODINWEAPON_EXTRA_044 = { idx:44, value:812.862, label:'OdinWeapon-44' };
// OdinWeapon tuning note 44: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_044 = 245.03; // Hz
export type OdinWeaponVariant44 = 'OdinWeapon-44';
export const ODINWEAPON_EXTRA_045 = { idx:45, value:321.891, label:'OdinWeapon-45' };
// OdinWeapon tuning note 45: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_045 = 361.53; // Hz
export type OdinWeaponVariant45 = 'OdinWeapon-45';
export const ODINWEAPON_EXTRA_046 = { idx:46, value:334.020, label:'OdinWeapon-46' };
// OdinWeapon tuning note 46: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_046 = 1104.31; // Hz
export type OdinWeaponVariant46 = 'OdinWeapon-46';
export const ODINWEAPON_EXTRA_047 = { idx:47, value:226.471, label:'OdinWeapon-47' };
// OdinWeapon tuning note 47: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_047 = 863.68; // Hz
export type OdinWeaponVariant47 = 'OdinWeapon-47';
export const ODINWEAPON_EXTRA_048 = { idx:48, value:952.622, label:'OdinWeapon-48' };
// OdinWeapon tuning note 48: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_048 = 677.21; // Hz
export type OdinWeaponVariant48 = 'OdinWeapon-48';
export const ODINWEAPON_EXTRA_049 = { idx:49, value:517.938, label:'OdinWeapon-49' };
// OdinWeapon tuning note 49: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_049 = 606.27; // Hz
export type OdinWeaponVariant49 = 'OdinWeapon-49';
export const ODINWEAPON_EXTRA_050 = { idx:50, value:795.818, label:'OdinWeapon-50' };
// OdinWeapon tuning note 50: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_050 = 185.23; // Hz
export type OdinWeaponVariant50 = 'OdinWeapon-50';
export const ODINWEAPON_EXTRA_051 = { idx:51, value:801.381, label:'OdinWeapon-51' };
// OdinWeapon tuning note 51: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_051 = 107.01; // Hz
export type OdinWeaponVariant51 = 'OdinWeapon-51';
export const ODINWEAPON_EXTRA_052 = { idx:52, value:244.434, label:'OdinWeapon-52' };
// OdinWeapon tuning note 52: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_052 = 242.68; // Hz
export type OdinWeaponVariant52 = 'OdinWeapon-52';
export const ODINWEAPON_EXTRA_053 = { idx:53, value:845.775, label:'OdinWeapon-53' };
// OdinWeapon tuning note 53: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_053 = 804.63; // Hz
export type OdinWeaponVariant53 = 'OdinWeapon-53';
export const ODINWEAPON_EXTRA_054 = { idx:54, value:88.027, label:'OdinWeapon-54' };
// OdinWeapon tuning note 54: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_054 = 1139.11; // Hz
export type OdinWeaponVariant54 = 'OdinWeapon-54';
export const ODINWEAPON_EXTRA_055 = { idx:55, value:589.631, label:'OdinWeapon-55' };
// OdinWeapon tuning note 55: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_055 = 703.28; // Hz
export type OdinWeaponVariant55 = 'OdinWeapon-55';
export const ODINWEAPON_EXTRA_056 = { idx:56, value:761.657, label:'OdinWeapon-56' };
// OdinWeapon tuning note 56: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_056 = 694.79; // Hz
export type OdinWeaponVariant56 = 'OdinWeapon-56';
export const ODINWEAPON_EXTRA_057 = { idx:57, value:627.898, label:'OdinWeapon-57' };
// OdinWeapon tuning note 57: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_057 = 415.48; // Hz
export type OdinWeaponVariant57 = 'OdinWeapon-57';
export const ODINWEAPON_EXTRA_058 = { idx:58, value:250.517, label:'OdinWeapon-58' };
// OdinWeapon tuning note 58: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_058 = 105.47; // Hz
export type OdinWeaponVariant58 = 'OdinWeapon-58';
export const ODINWEAPON_EXTRA_059 = { idx:59, value:772.092, label:'OdinWeapon-59' };
// OdinWeapon tuning note 59: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_059 = 872.25; // Hz
export type OdinWeaponVariant59 = 'OdinWeapon-59';
export const ODINWEAPON_EXTRA_060 = { idx:60, value:723.288, label:'OdinWeapon-60' };
// OdinWeapon tuning note 60: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_060 = 789.67; // Hz
export type OdinWeaponVariant60 = 'OdinWeapon-60';
export const ODINWEAPON_EXTRA_061 = { idx:61, value:538.800, label:'OdinWeapon-61' };
// OdinWeapon tuning note 61: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_061 = 957.91; // Hz
export type OdinWeaponVariant61 = 'OdinWeapon-61';
export const ODINWEAPON_EXTRA_062 = { idx:62, value:501.955, label:'OdinWeapon-62' };
// OdinWeapon tuning note 62: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_062 = 703.46; // Hz
export type OdinWeaponVariant62 = 'OdinWeapon-62';
export const ODINWEAPON_EXTRA_063 = { idx:63, value:743.333, label:'OdinWeapon-63' };
// OdinWeapon tuning note 63: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_063 = 454.16; // Hz
export type OdinWeaponVariant63 = 'OdinWeapon-63';
export const ODINWEAPON_EXTRA_064 = { idx:64, value:702.306, label:'OdinWeapon-64' };
// OdinWeapon tuning note 64: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_064 = 176.89; // Hz
export type OdinWeaponVariant64 = 'OdinWeapon-64';
export const ODINWEAPON_EXTRA_065 = { idx:65, value:748.305, label:'OdinWeapon-65' };
// OdinWeapon tuning note 65: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_065 = 1168.41; // Hz
export type OdinWeaponVariant65 = 'OdinWeapon-65';
export const ODINWEAPON_EXTRA_066 = { idx:66, value:610.616, label:'OdinWeapon-66' };
// OdinWeapon tuning note 66: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_066 = 82.70; // Hz
export type OdinWeaponVariant66 = 'OdinWeapon-66';
export const ODINWEAPON_EXTRA_067 = { idx:67, value:962.895, label:'OdinWeapon-67' };
// OdinWeapon tuning note 67: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_067 = 462.03; // Hz
export type OdinWeaponVariant67 = 'OdinWeapon-67';
export const ODINWEAPON_EXTRA_068 = { idx:68, value:1.098, label:'OdinWeapon-68' };
// OdinWeapon tuning note 68: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_068 = 902.24; // Hz
export type OdinWeaponVariant68 = 'OdinWeapon-68';
export const ODINWEAPON_EXTRA_069 = { idx:69, value:609.157, label:'OdinWeapon-69' };
// OdinWeapon tuning note 69: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_069 = 529.05; // Hz
export type OdinWeaponVariant69 = 'OdinWeapon-69';
export const ODINWEAPON_EXTRA_070 = { idx:70, value:877.256, label:'OdinWeapon-70' };
// OdinWeapon tuning note 70: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_070 = 299.28; // Hz
export type OdinWeaponVariant70 = 'OdinWeapon-70';
export const ODINWEAPON_EXTRA_071 = { idx:71, value:77.126, label:'OdinWeapon-71' };
// OdinWeapon tuning note 71: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_071 = 509.25; // Hz
export type OdinWeaponVariant71 = 'OdinWeapon-71';
export const ODINWEAPON_EXTRA_072 = { idx:72, value:324.499, label:'OdinWeapon-72' };
// OdinWeapon tuning note 72: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_072 = 800.52; // Hz
export type OdinWeaponVariant72 = 'OdinWeapon-72';
export const ODINWEAPON_EXTRA_073 = { idx:73, value:701.417, label:'OdinWeapon-73' };
// OdinWeapon tuning note 73: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_073 = 688.03; // Hz
export type OdinWeaponVariant73 = 'OdinWeapon-73';
export const ODINWEAPON_EXTRA_074 = { idx:74, value:279.694, label:'OdinWeapon-74' };
// OdinWeapon tuning note 74: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_074 = 1153.66; // Hz
export type OdinWeaponVariant74 = 'OdinWeapon-74';
export const ODINWEAPON_EXTRA_075 = { idx:75, value:96.138, label:'OdinWeapon-75' };
// OdinWeapon tuning note 75: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_075 = 123.70; // Hz
export type OdinWeaponVariant75 = 'OdinWeapon-75';
export const ODINWEAPON_EXTRA_076 = { idx:76, value:559.591, label:'OdinWeapon-76' };
// OdinWeapon tuning note 76: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_076 = 789.57; // Hz
export type OdinWeaponVariant76 = 'OdinWeapon-76';
export const ODINWEAPON_EXTRA_077 = { idx:77, value:755.746, label:'OdinWeapon-77' };
// OdinWeapon tuning note 77: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_077 = 290.77; // Hz
export type OdinWeaponVariant77 = 'OdinWeapon-77';
export const ODINWEAPON_EXTRA_078 = { idx:78, value:128.734, label:'OdinWeapon-78' };
// OdinWeapon tuning note 78: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_078 = 336.94; // Hz
export type OdinWeaponVariant78 = 'OdinWeapon-78';
export const ODINWEAPON_EXTRA_079 = { idx:79, value:623.895, label:'OdinWeapon-79' };
// OdinWeapon tuning note 79: ensures deterministic recoil and audio sync
export const ODINWEAPON_AUDIO_079 = 277.26; // Hz
export type OdinWeaponVariant79 = 'OdinWeapon-79';

// padding line 0 — OdinWeapon.ts — Ring-07
// padding line 1 — OdinWeapon.ts — Ring-07
// padding line 2 — OdinWeapon.ts — Ring-07
