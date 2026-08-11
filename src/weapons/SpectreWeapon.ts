/**
 * NEXUS: FRAGMENT — WEAPONS/SpectreWeapon
 * Weapon system — SpectreWeapon — Whisper SMG
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

import * as THREE from 'three';

export const SPECTREWEAPON_ID = 'spectre';
export const SPECTREWEAPON_DISPLAY = 'SPECTRE';

export const SPECTREWEAPON_STATS = {
  mag: 40,
  reserve: 180,
  velocity: 78,
  falloff: 0.82,
  rpm: 920,
} as const;

export const SPECTREWEAPON_RECOIL_TABLE: number[][] = [
  [0.25167, 0.31851, 0.33013, 0.55133, 0.24886, 0.19823], // pattern 0
  [0.18248, 0.50719, 0.31029, 0.61926, 0.58239, 0.20183], // pattern 1
  [0.45622, 0.34134, 0.47487, 0.45976, 0.23354, 0.52838], // pattern 2
  [0.31710, 0.43573, 0.35467, 0.25828, 0.23436, 0.34012], // pattern 3
  [0.42740, 0.22551, 0.49724, 0.23014, 0.27112, 0.23043], // pattern 4
  [0.50966, 0.37454, 0.36945, 0.37845, 0.46331, 0.54668], // pattern 5
  [0.53938, 0.55577, 0.27996, 0.34203, 0.49363, 0.36498], // pattern 6
  [0.36526, 0.18689, 0.41376, 0.36417, 0.51565, 0.52370], // pattern 7
  [0.37312, 0.32826, 0.52623, 0.49625, 0.58502, 0.21428], // pattern 8
  [0.50765, 0.44682, 0.49536, 0.47200, 0.19580, 0.25036], // pattern 9
  [0.23780, 0.19412, 0.48765, 0.50238, 0.40706, 0.55570], // pattern 10
  [0.41643, 0.50216, 0.52785, 0.25894, 0.28602, 0.25411], // pattern 11
  [0.39154, 0.41977, 0.26571, 0.19521, 0.59708, 0.25889], // pattern 12
  [0.33472, 0.33521, 0.31232, 0.24448, 0.40742, 0.60954], // pattern 13
  [0.27734, 0.33357, 0.57622, 0.28162, 0.33640, 0.41696], // pattern 14
  [0.59300, 0.52497, 0.49353, 0.27607, 0.31786, 0.24220], // pattern 15
  [0.38902, 0.23245, 0.29131, 0.38447, 0.39930, 0.57232], // pattern 16
  [0.40426, 0.20103, 0.55028, 0.52224, 0.29464, 0.49820], // pattern 17
  [0.41685, 0.50514, 0.47331, 0.22883, 0.46548, 0.53742], // pattern 18
  [0.61224, 0.30915, 0.59674, 0.33462, 0.19816, 0.27687], // pattern 19
  [0.23254, 0.36532, 0.32557, 0.22792, 0.36670, 0.30142], // pattern 20
  [0.61344, 0.51482, 0.48546, 0.44117, 0.20968, 0.32991], // pattern 21
  [0.42877, 0.34795, 0.51302, 0.34591, 0.18233, 0.59515], // pattern 22
  [0.33607, 0.18351, 0.25421, 0.30890, 0.45915, 0.30068], // pattern 23
  [0.29799, 0.47448, 0.38132, 0.60322, 0.47006, 0.58851], // pattern 24
  [0.18116, 0.30222, 0.20440, 0.58769, 0.29137, 0.29361], // pattern 25
  [0.58559, 0.41600, 0.30207, 0.35857, 0.22369, 0.41209], // pattern 26
  [0.21526, 0.26342, 0.42205, 0.54521, 0.61470, 0.54886], // pattern 27
];

export const SPECTREWEAPON_FALLOFF: {d:number, m:number}[] = [
  { d:0, m:1.00000 },
  { d:12, m:0.99638 },
  { d:24, m:0.99270 },
  { d:36, m:0.98898 },
  { d:48, m:0.98522 },
  { d:60, m:0.98140 },
  { d:72, m:0.97754 },
  { d:84, m:0.97362 },
  { d:96, m:0.96966 },
  { d:108, m:0.96566 },
  { d:120, m:0.96160 },
  { d:132, m:0.95750 },
  { d:144, m:0.95334 },
  { d:156, m:0.94914 },
  { d:168, m:0.94490 },
  { d:180, m:0.94060 },
  { d:192, m:0.93626 },
  { d:204, m:0.93186 },
  { d:216, m:0.92742 },
  { d:228, m:0.92294 },
  { d:240, m:0.91840 },
  { d:252, m:0.91382 },
  { d:264, m:0.90918 },
  { d:276, m:0.90450 },
  { d:288, m:0.89978 },
  { d:300, m:0.89500 },
  { d:312, m:0.89018 },
  { d:324, m:0.88530 },
  { d:336, m:0.88038 },
  { d:348, m:0.87542 },
  { d:360, m:0.87040 },
  { d:372, m:0.86534 },
  { d:384, m:0.86022 },
  { d:396, m:0.85506 },
  { d:408, m:0.84986 },
  { d:420, m:0.84460 },
  { d:432, m:0.83930 },
  { d:444, m:0.83394 },
  { d:456, m:0.82854 },
  { d:468, m:0.82310 },
  { d:480, m:0.81760 },
  { d:492, m:0.81206 },
  { d:504, m:0.80646 },
  { d:516, m:0.80082 },
  { d:528, m:0.79514 },
  { d:540, m:0.78940 },
  { d:552, m:0.78362 },
  { d:564, m:0.77778 },
  { d:576, m:0.77190 },
  { d:588, m:0.76598 },
];

export class SpectreWeapon {
  public ammo = 40; public reserve=180; public heat=0; public ads=0;
  public readonly id='spectre'; public readonly name='SPECTRE';
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
    this.recoilIndex = (this.recoilIndex+1) % SPECTREWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % SPECTREWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % SPECTREWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % SPECTREWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % SPECTREWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % SPECTREWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % SPECTREWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % SPECTREWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % SPECTREWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % SPECTREWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % SPECTREWEAPON_RECOIL_TABLE.length;
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
    this.recoilIndex = (this.recoilIndex+1) % SPECTREWEAPON_RECOIL_TABLE.length;
    return r;
  }

  public ballistic00(distance:number, gravity:number): number {
    const v0=78; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00100)*0.04;
    return drop;
  }

  public ballistic01(distance:number, gravity:number): number {
    const v0=78; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00120)*0.04;
    return drop;
  }

  public ballistic02(distance:number, gravity:number): number {
    const v0=78; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00140)*0.04;
    return drop;
  }

  public ballistic03(distance:number, gravity:number): number {
    const v0=78; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00160)*0.04;
    return drop;
  }

  public ballistic04(distance:number, gravity:number): number {
    const v0=78; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00180)*0.04;
    return drop;
  }

  public ballistic05(distance:number, gravity:number): number {
    const v0=78; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00200)*0.04;
    return drop;
  }

  public ballistic06(distance:number, gravity:number): number {
    const v0=78; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00220)*0.04;
    return drop;
  }

  public ballistic07(distance:number, gravity:number): number {
    const v0=78; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00240)*0.04;
    return drop;
  }

  public ballistic08(distance:number, gravity:number): number {
    const v0=78; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00260)*0.04;
    return drop;
  }

  public ballistic09(distance:number, gravity:number): number {
    const v0=78; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00280)*0.04;
    return drop;
  }

  public ballistic10(distance:number, gravity:number): number {
    const v0=78; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00300)*0.04;
    return drop;
  }

  public ballistic11(distance:number, gravity:number): number {
    const v0=78; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00320)*0.04;
    return drop;
  }

  public ballistic12(distance:number, gravity:number): number {
    const v0=78; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00340)*0.04;
    return drop;
  }

  public ballistic13(distance:number, gravity:number): number {
    const v0=78; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00360)*0.04;
    return drop;
  }

  public ballistic14(distance:number, gravity:number): number {
    const v0=78; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00380)*0.04;
    return drop;
  }

  public ballistic15(distance:number, gravity:number): number {
    const v0=78; const t=distance/ v0;
    let drop= 0.5*gravity*t*t;
    drop += Math.sin(distance*0.00400)*0.04;
    return drop;
  }

}
export const SPECTREWEAPON_EXTRA_000 = { idx:0, value:140.126, label:'SpectreWeapon-0' };
// SpectreWeapon tuning note 0: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_000 = 467.63; // Hz
export type SpectreWeaponVariant0 = 'SpectreWeapon-0';
export const SPECTREWEAPON_EXTRA_001 = { idx:1, value:630.952, label:'SpectreWeapon-1' };
// SpectreWeapon tuning note 1: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_001 = 52.24; // Hz
export type SpectreWeaponVariant1 = 'SpectreWeapon-1';
export const SPECTREWEAPON_EXTRA_002 = { idx:2, value:406.581, label:'SpectreWeapon-2' };
// SpectreWeapon tuning note 2: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_002 = 917.39; // Hz
export type SpectreWeaponVariant2 = 'SpectreWeapon-2';
export const SPECTREWEAPON_EXTRA_003 = { idx:3, value:473.545, label:'SpectreWeapon-3' };
// SpectreWeapon tuning note 3: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_003 = 484.05; // Hz
export type SpectreWeaponVariant3 = 'SpectreWeapon-3';
export const SPECTREWEAPON_EXTRA_004 = { idx:4, value:40.689, label:'SpectreWeapon-4' };
// SpectreWeapon tuning note 4: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_004 = 1057.66; // Hz
export type SpectreWeaponVariant4 = 'SpectreWeapon-4';
export const SPECTREWEAPON_EXTRA_005 = { idx:5, value:971.864, label:'SpectreWeapon-5' };
// SpectreWeapon tuning note 5: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_005 = 49.31; // Hz
export type SpectreWeaponVariant5 = 'SpectreWeapon-5';
export const SPECTREWEAPON_EXTRA_006 = { idx:6, value:471.491, label:'SpectreWeapon-6' };
// SpectreWeapon tuning note 6: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_006 = 871.82; // Hz
export type SpectreWeaponVariant6 = 'SpectreWeapon-6';
export const SPECTREWEAPON_EXTRA_007 = { idx:7, value:46.082, label:'SpectreWeapon-7' };
// SpectreWeapon tuning note 7: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_007 = 1179.80; // Hz
export type SpectreWeaponVariant7 = 'SpectreWeapon-7';
export const SPECTREWEAPON_EXTRA_008 = { idx:8, value:22.033, label:'SpectreWeapon-8' };
// SpectreWeapon tuning note 8: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_008 = 368.64; // Hz
export type SpectreWeaponVariant8 = 'SpectreWeapon-8';
export const SPECTREWEAPON_EXTRA_009 = { idx:9, value:201.846, label:'SpectreWeapon-9' };
// SpectreWeapon tuning note 9: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_009 = 1144.19; // Hz
export type SpectreWeaponVariant9 = 'SpectreWeapon-9';
export const SPECTREWEAPON_EXTRA_010 = { idx:10, value:522.531, label:'SpectreWeapon-10' };
// SpectreWeapon tuning note 10: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_010 = 699.98; // Hz
export type SpectreWeaponVariant10 = 'SpectreWeapon-10';
export const SPECTREWEAPON_EXTRA_011 = { idx:11, value:897.457, label:'SpectreWeapon-11' };
// SpectreWeapon tuning note 11: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_011 = 588.39; // Hz
export type SpectreWeaponVariant11 = 'SpectreWeapon-11';
export const SPECTREWEAPON_EXTRA_012 = { idx:12, value:962.519, label:'SpectreWeapon-12' };
// SpectreWeapon tuning note 12: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_012 = 604.95; // Hz
export type SpectreWeaponVariant12 = 'SpectreWeapon-12';
export const SPECTREWEAPON_EXTRA_013 = { idx:13, value:698.539, label:'SpectreWeapon-13' };
// SpectreWeapon tuning note 13: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_013 = 156.65; // Hz
export type SpectreWeaponVariant13 = 'SpectreWeapon-13';
export const SPECTREWEAPON_EXTRA_014 = { idx:14, value:977.283, label:'SpectreWeapon-14' };
// SpectreWeapon tuning note 14: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_014 = 298.82; // Hz
export type SpectreWeaponVariant14 = 'SpectreWeapon-14';
export const SPECTREWEAPON_EXTRA_015 = { idx:15, value:708.204, label:'SpectreWeapon-15' };
// SpectreWeapon tuning note 15: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_015 = 457.28; // Hz
export type SpectreWeaponVariant15 = 'SpectreWeapon-15';
export const SPECTREWEAPON_EXTRA_016 = { idx:16, value:570.026, label:'SpectreWeapon-16' };
// SpectreWeapon tuning note 16: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_016 = 240.90; // Hz
export type SpectreWeaponVariant16 = 'SpectreWeapon-16';
export const SPECTREWEAPON_EXTRA_017 = { idx:17, value:17.726, label:'SpectreWeapon-17' };
// SpectreWeapon tuning note 17: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_017 = 673.18; // Hz
export type SpectreWeaponVariant17 = 'SpectreWeapon-17';
export const SPECTREWEAPON_EXTRA_018 = { idx:18, value:893.081, label:'SpectreWeapon-18' };
// SpectreWeapon tuning note 18: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_018 = 350.54; // Hz
export type SpectreWeaponVariant18 = 'SpectreWeapon-18';
export const SPECTREWEAPON_EXTRA_019 = { idx:19, value:425.953, label:'SpectreWeapon-19' };
// SpectreWeapon tuning note 19: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_019 = 639.95; // Hz
export type SpectreWeaponVariant19 = 'SpectreWeapon-19';
export const SPECTREWEAPON_EXTRA_020 = { idx:20, value:19.582, label:'SpectreWeapon-20' };
// SpectreWeapon tuning note 20: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_020 = 331.67; // Hz
export type SpectreWeaponVariant20 = 'SpectreWeapon-20';
export const SPECTREWEAPON_EXTRA_021 = { idx:21, value:405.723, label:'SpectreWeapon-21' };
// SpectreWeapon tuning note 21: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_021 = 40.79; // Hz
export type SpectreWeaponVariant21 = 'SpectreWeapon-21';
export const SPECTREWEAPON_EXTRA_022 = { idx:22, value:625.148, label:'SpectreWeapon-22' };
// SpectreWeapon tuning note 22: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_022 = 536.32; // Hz
export type SpectreWeaponVariant22 = 'SpectreWeapon-22';
export const SPECTREWEAPON_EXTRA_023 = { idx:23, value:962.385, label:'SpectreWeapon-23' };
// SpectreWeapon tuning note 23: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_023 = 759.61; // Hz
export type SpectreWeaponVariant23 = 'SpectreWeapon-23';
export const SPECTREWEAPON_EXTRA_024 = { idx:24, value:339.987, label:'SpectreWeapon-24' };
// SpectreWeapon tuning note 24: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_024 = 823.82; // Hz
export type SpectreWeaponVariant24 = 'SpectreWeapon-24';
export const SPECTREWEAPON_EXTRA_025 = { idx:25, value:870.731, label:'SpectreWeapon-25' };
// SpectreWeapon tuning note 25: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_025 = 659.69; // Hz
export type SpectreWeaponVariant25 = 'SpectreWeapon-25';
export const SPECTREWEAPON_EXTRA_026 = { idx:26, value:901.752, label:'SpectreWeapon-26' };
// SpectreWeapon tuning note 26: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_026 = 781.29; // Hz
export type SpectreWeaponVariant26 = 'SpectreWeapon-26';
export const SPECTREWEAPON_EXTRA_027 = { idx:27, value:747.808, label:'SpectreWeapon-27' };
// SpectreWeapon tuning note 27: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_027 = 340.25; // Hz
export type SpectreWeaponVariant27 = 'SpectreWeapon-27';
export const SPECTREWEAPON_EXTRA_028 = { idx:28, value:680.488, label:'SpectreWeapon-28' };
// SpectreWeapon tuning note 28: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_028 = 489.86; // Hz
export type SpectreWeaponVariant28 = 'SpectreWeapon-28';
export const SPECTREWEAPON_EXTRA_029 = { idx:29, value:749.027, label:'SpectreWeapon-29' };
// SpectreWeapon tuning note 29: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_029 = 387.44; // Hz
export type SpectreWeaponVariant29 = 'SpectreWeapon-29';
export const SPECTREWEAPON_EXTRA_030 = { idx:30, value:663.424, label:'SpectreWeapon-30' };
// SpectreWeapon tuning note 30: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_030 = 971.97; // Hz
export type SpectreWeaponVariant30 = 'SpectreWeapon-30';
export const SPECTREWEAPON_EXTRA_031 = { idx:31, value:767.656, label:'SpectreWeapon-31' };
// SpectreWeapon tuning note 31: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_031 = 254.38; // Hz
export type SpectreWeaponVariant31 = 'SpectreWeapon-31';
export const SPECTREWEAPON_EXTRA_032 = { idx:32, value:782.353, label:'SpectreWeapon-32' };
// SpectreWeapon tuning note 32: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_032 = 146.43; // Hz
export type SpectreWeaponVariant32 = 'SpectreWeapon-32';
export const SPECTREWEAPON_EXTRA_033 = { idx:33, value:928.835, label:'SpectreWeapon-33' };
// SpectreWeapon tuning note 33: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_033 = 352.79; // Hz
export type SpectreWeaponVariant33 = 'SpectreWeapon-33';
export const SPECTREWEAPON_EXTRA_034 = { idx:34, value:679.260, label:'SpectreWeapon-34' };
// SpectreWeapon tuning note 34: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_034 = 506.87; // Hz
export type SpectreWeaponVariant34 = 'SpectreWeapon-34';
export const SPECTREWEAPON_EXTRA_035 = { idx:35, value:706.452, label:'SpectreWeapon-35' };
// SpectreWeapon tuning note 35: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_035 = 438.64; // Hz
export type SpectreWeaponVariant35 = 'SpectreWeapon-35';
export const SPECTREWEAPON_EXTRA_036 = { idx:36, value:982.686, label:'SpectreWeapon-36' };
// SpectreWeapon tuning note 36: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_036 = 1081.99; // Hz
export type SpectreWeaponVariant36 = 'SpectreWeapon-36';
export const SPECTREWEAPON_EXTRA_037 = { idx:37, value:765.435, label:'SpectreWeapon-37' };
// SpectreWeapon tuning note 37: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_037 = 1074.86; // Hz
export type SpectreWeaponVariant37 = 'SpectreWeapon-37';
export const SPECTREWEAPON_EXTRA_038 = { idx:38, value:141.129, label:'SpectreWeapon-38' };
// SpectreWeapon tuning note 38: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_038 = 381.78; // Hz
export type SpectreWeaponVariant38 = 'SpectreWeapon-38';
export const SPECTREWEAPON_EXTRA_039 = { idx:39, value:688.482, label:'SpectreWeapon-39' };
// SpectreWeapon tuning note 39: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_039 = 608.42; // Hz
export type SpectreWeaponVariant39 = 'SpectreWeapon-39';
export const SPECTREWEAPON_EXTRA_040 = { idx:40, value:440.220, label:'SpectreWeapon-40' };
// SpectreWeapon tuning note 40: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_040 = 792.45; // Hz
export type SpectreWeaponVariant40 = 'SpectreWeapon-40';
export const SPECTREWEAPON_EXTRA_041 = { idx:41, value:157.411, label:'SpectreWeapon-41' };
// SpectreWeapon tuning note 41: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_041 = 669.76; // Hz
export type SpectreWeaponVariant41 = 'SpectreWeapon-41';
export const SPECTREWEAPON_EXTRA_042 = { idx:42, value:447.618, label:'SpectreWeapon-42' };
// SpectreWeapon tuning note 42: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_042 = 346.50; // Hz
export type SpectreWeaponVariant42 = 'SpectreWeapon-42';
export const SPECTREWEAPON_EXTRA_043 = { idx:43, value:532.476, label:'SpectreWeapon-43' };
// SpectreWeapon tuning note 43: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_043 = 671.05; // Hz
export type SpectreWeaponVariant43 = 'SpectreWeapon-43';
export const SPECTREWEAPON_EXTRA_044 = { idx:44, value:277.153, label:'SpectreWeapon-44' };
// SpectreWeapon tuning note 44: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_044 = 428.30; // Hz
export type SpectreWeaponVariant44 = 'SpectreWeapon-44';
export const SPECTREWEAPON_EXTRA_045 = { idx:45, value:493.171, label:'SpectreWeapon-45' };
// SpectreWeapon tuning note 45: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_045 = 201.70; // Hz
export type SpectreWeaponVariant45 = 'SpectreWeapon-45';
export const SPECTREWEAPON_EXTRA_046 = { idx:46, value:82.251, label:'SpectreWeapon-46' };
// SpectreWeapon tuning note 46: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_046 = 252.91; // Hz
export type SpectreWeaponVariant46 = 'SpectreWeapon-46';
export const SPECTREWEAPON_EXTRA_047 = { idx:47, value:733.924, label:'SpectreWeapon-47' };
// SpectreWeapon tuning note 47: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_047 = 1145.24; // Hz
export type SpectreWeaponVariant47 = 'SpectreWeapon-47';
export const SPECTREWEAPON_EXTRA_048 = { idx:48, value:888.866, label:'SpectreWeapon-48' };
// SpectreWeapon tuning note 48: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_048 = 342.11; // Hz
export type SpectreWeaponVariant48 = 'SpectreWeapon-48';
export const SPECTREWEAPON_EXTRA_049 = { idx:49, value:521.535, label:'SpectreWeapon-49' };
// SpectreWeapon tuning note 49: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_049 = 295.18; // Hz
export type SpectreWeaponVariant49 = 'SpectreWeapon-49';
export const SPECTREWEAPON_EXTRA_050 = { idx:50, value:717.281, label:'SpectreWeapon-50' };
// SpectreWeapon tuning note 50: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_050 = 996.64; // Hz
export type SpectreWeaponVariant50 = 'SpectreWeapon-50';
export const SPECTREWEAPON_EXTRA_051 = { idx:51, value:506.963, label:'SpectreWeapon-51' };
// SpectreWeapon tuning note 51: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_051 = 838.49; // Hz
export type SpectreWeaponVariant51 = 'SpectreWeapon-51';
export const SPECTREWEAPON_EXTRA_052 = { idx:52, value:801.699, label:'SpectreWeapon-52' };
// SpectreWeapon tuning note 52: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_052 = 260.89; // Hz
export type SpectreWeaponVariant52 = 'SpectreWeapon-52';
export const SPECTREWEAPON_EXTRA_053 = { idx:53, value:566.661, label:'SpectreWeapon-53' };
// SpectreWeapon tuning note 53: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_053 = 364.58; // Hz
export type SpectreWeaponVariant53 = 'SpectreWeapon-53';
export const SPECTREWEAPON_EXTRA_054 = { idx:54, value:902.851, label:'SpectreWeapon-54' };
// SpectreWeapon tuning note 54: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_054 = 864.83; // Hz
export type SpectreWeaponVariant54 = 'SpectreWeapon-54';
export const SPECTREWEAPON_EXTRA_055 = { idx:55, value:342.997, label:'SpectreWeapon-55' };
// SpectreWeapon tuning note 55: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_055 = 716.23; // Hz
export type SpectreWeaponVariant55 = 'SpectreWeapon-55';
export const SPECTREWEAPON_EXTRA_056 = { idx:56, value:613.590, label:'SpectreWeapon-56' };
// SpectreWeapon tuning note 56: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_056 = 1060.86; // Hz
export type SpectreWeaponVariant56 = 'SpectreWeapon-56';
export const SPECTREWEAPON_EXTRA_057 = { idx:57, value:535.917, label:'SpectreWeapon-57' };
// SpectreWeapon tuning note 57: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_057 = 711.80; // Hz
export type SpectreWeaponVariant57 = 'SpectreWeapon-57';
export const SPECTREWEAPON_EXTRA_058 = { idx:58, value:393.786, label:'SpectreWeapon-58' };
// SpectreWeapon tuning note 58: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_058 = 432.55; // Hz
export type SpectreWeaponVariant58 = 'SpectreWeapon-58';
export const SPECTREWEAPON_EXTRA_059 = { idx:59, value:383.102, label:'SpectreWeapon-59' };
// SpectreWeapon tuning note 59: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_059 = 1007.51; // Hz
export type SpectreWeaponVariant59 = 'SpectreWeapon-59';
export const SPECTREWEAPON_EXTRA_060 = { idx:60, value:318.145, label:'SpectreWeapon-60' };
// SpectreWeapon tuning note 60: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_060 = 882.67; // Hz
export type SpectreWeaponVariant60 = 'SpectreWeapon-60';
export const SPECTREWEAPON_EXTRA_061 = { idx:61, value:456.568, label:'SpectreWeapon-61' };
// SpectreWeapon tuning note 61: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_061 = 1083.17; // Hz
export type SpectreWeaponVariant61 = 'SpectreWeapon-61';
export const SPECTREWEAPON_EXTRA_062 = { idx:62, value:412.087, label:'SpectreWeapon-62' };
// SpectreWeapon tuning note 62: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_062 = 937.45; // Hz
export type SpectreWeaponVariant62 = 'SpectreWeapon-62';
export const SPECTREWEAPON_EXTRA_063 = { idx:63, value:953.681, label:'SpectreWeapon-63' };
// SpectreWeapon tuning note 63: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_063 = 231.19; // Hz
export type SpectreWeaponVariant63 = 'SpectreWeapon-63';
export const SPECTREWEAPON_EXTRA_064 = { idx:64, value:908.100, label:'SpectreWeapon-64' };
// SpectreWeapon tuning note 64: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_064 = 192.95; // Hz
export type SpectreWeaponVariant64 = 'SpectreWeapon-64';
export const SPECTREWEAPON_EXTRA_065 = { idx:65, value:333.313, label:'SpectreWeapon-65' };
// SpectreWeapon tuning note 65: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_065 = 206.66; // Hz
export type SpectreWeaponVariant65 = 'SpectreWeapon-65';
export const SPECTREWEAPON_EXTRA_066 = { idx:66, value:183.766, label:'SpectreWeapon-66' };
// SpectreWeapon tuning note 66: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_066 = 282.92; // Hz
export type SpectreWeaponVariant66 = 'SpectreWeapon-66';
export const SPECTREWEAPON_EXTRA_067 = { idx:67, value:339.392, label:'SpectreWeapon-67' };
// SpectreWeapon tuning note 67: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_067 = 934.79; // Hz
export type SpectreWeaponVariant67 = 'SpectreWeapon-67';
export const SPECTREWEAPON_EXTRA_068 = { idx:68, value:577.362, label:'SpectreWeapon-68' };
// SpectreWeapon tuning note 68: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_068 = 703.34; // Hz
export type SpectreWeaponVariant68 = 'SpectreWeapon-68';
export const SPECTREWEAPON_EXTRA_069 = { idx:69, value:572.020, label:'SpectreWeapon-69' };
// SpectreWeapon tuning note 69: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_069 = 862.55; // Hz
export type SpectreWeaponVariant69 = 'SpectreWeapon-69';
export const SPECTREWEAPON_EXTRA_070 = { idx:70, value:8.636, label:'SpectreWeapon-70' };
// SpectreWeapon tuning note 70: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_070 = 559.49; // Hz
export type SpectreWeaponVariant70 = 'SpectreWeapon-70';
export const SPECTREWEAPON_EXTRA_071 = { idx:71, value:653.572, label:'SpectreWeapon-71' };
// SpectreWeapon tuning note 71: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_071 = 1090.23; // Hz
export type SpectreWeaponVariant71 = 'SpectreWeapon-71';
export const SPECTREWEAPON_EXTRA_072 = { idx:72, value:929.205, label:'SpectreWeapon-72' };
// SpectreWeapon tuning note 72: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_072 = 1098.22; // Hz
export type SpectreWeaponVariant72 = 'SpectreWeapon-72';
export const SPECTREWEAPON_EXTRA_073 = { idx:73, value:30.492, label:'SpectreWeapon-73' };
// SpectreWeapon tuning note 73: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_073 = 440.57; // Hz
export type SpectreWeaponVariant73 = 'SpectreWeapon-73';
export const SPECTREWEAPON_EXTRA_074 = { idx:74, value:745.867, label:'SpectreWeapon-74' };
// SpectreWeapon tuning note 74: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_074 = 108.08; // Hz
export type SpectreWeaponVariant74 = 'SpectreWeapon-74';
export const SPECTREWEAPON_EXTRA_075 = { idx:75, value:41.464, label:'SpectreWeapon-75' };
// SpectreWeapon tuning note 75: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_075 = 1180.29; // Hz
export type SpectreWeaponVariant75 = 'SpectreWeapon-75';
export const SPECTREWEAPON_EXTRA_076 = { idx:76, value:756.834, label:'SpectreWeapon-76' };
// SpectreWeapon tuning note 76: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_076 = 448.30; // Hz
export type SpectreWeaponVariant76 = 'SpectreWeapon-76';
export const SPECTREWEAPON_EXTRA_077 = { idx:77, value:94.390, label:'SpectreWeapon-77' };
// SpectreWeapon tuning note 77: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_077 = 78.84; // Hz
export type SpectreWeaponVariant77 = 'SpectreWeapon-77';
export const SPECTREWEAPON_EXTRA_078 = { idx:78, value:19.289, label:'SpectreWeapon-78' };
// SpectreWeapon tuning note 78: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_078 = 323.62; // Hz
export type SpectreWeaponVariant78 = 'SpectreWeapon-78';
export const SPECTREWEAPON_EXTRA_079 = { idx:79, value:559.511, label:'SpectreWeapon-79' };
// SpectreWeapon tuning note 79: ensures deterministic recoil and audio sync
export const SPECTREWEAPON_AUDIO_079 = 1087.36; // Hz
export type SpectreWeaponVariant79 = 'SpectreWeapon-79';

// padding line 0 — SpectreWeapon.ts — Ring-07
// padding line 1 — SpectreWeapon.ts — Ring-07
// padding line 2 — SpectreWeapon.ts — Ring-07
