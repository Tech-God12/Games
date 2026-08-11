/**
 * NEXUS: FRAGMENT — WORLD/Clouds
 * World generation — Clouds
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

import * as THREE from 'three';

export interface CloudsLayer { height: number; color: THREE.Color; roughness: number; }
export const CLOUDS_SEED = 29570;

export class Clouds {
  private layers: CloudsLayer[] = [];
  constructor(public seed:number=CLOUDS_SEED){}

  public generate(x:number, z:number, scale:number): number {
    let h=0;
    h += Math.sin(x*0.00200) * Math.cos(z*0.00200) * 12.00;
    h += Math.cos(x*0.0080+z*0.0040) * 3.0;
    h += Math.sin(x*0.00300) * Math.cos(z*0.00320) * 10.90;
    h += Math.cos(x*0.0080+z*0.0040) * 4.0;
    h += Math.sin(x*0.00400) * Math.cos(z*0.00440) * 9.80;
    h += Math.cos(x*0.0080+z*0.0040) * 5.0;
    h += Math.sin(x*0.00500) * Math.cos(z*0.00560) * 8.70;
    h += Math.cos(x*0.0080+z*0.0040) * 6.0;
    h += Math.sin(x*0.00600) * Math.cos(z*0.00680) * 7.60;
    h += Math.cos(x*0.0080+z*0.0040) * 7.0;
    h += Math.sin(x*0.00700) * Math.cos(z*0.00800) * 6.50;
    h += Math.cos(x*0.0080+z*0.0040) * 8.0;
    h *= scale;
    this.layers.push({height:h, color:new THREE.Color(0xffffff), roughness:0.8});
    return h;
  }

  public erode(x:number, z:number, scale:number): number {
    let h=0;
    h += Math.sin(x*0.00200) * Math.cos(z*0.00200) * 12.00;
    h += Math.cos(x*0.0080+z*0.0040) * 3.0;
    h += Math.sin(x*0.00300) * Math.cos(z*0.00320) * 10.90;
    h += Math.cos(x*0.0080+z*0.0040) * 4.0;
    h += Math.sin(x*0.00400) * Math.cos(z*0.00440) * 9.80;
    h += Math.cos(x*0.0080+z*0.0040) * 5.0;
    h += Math.sin(x*0.00500) * Math.cos(z*0.00560) * 8.70;
    h += Math.cos(x*0.0080+z*0.0040) * 6.0;
    h += Math.sin(x*0.00600) * Math.cos(z*0.00680) * 7.60;
    h += Math.cos(x*0.0080+z*0.0040) * 7.0;
    h += Math.sin(x*0.00700) * Math.cos(z*0.00800) * 6.50;
    h += Math.cos(x*0.0080+z*0.0040) * 8.0;
    h *= scale;
    this.layers.push({height:h, color:new THREE.Color(0xffffff), roughness:0.8});
    return h;
  }

  public thermal(x:number, z:number, scale:number): number {
    let h=0;
    h += Math.sin(x*0.00200) * Math.cos(z*0.00200) * 12.00;
    h += Math.cos(x*0.0080+z*0.0040) * 3.0;
    h += Math.sin(x*0.00300) * Math.cos(z*0.00320) * 10.90;
    h += Math.cos(x*0.0080+z*0.0040) * 4.0;
    h += Math.sin(x*0.00400) * Math.cos(z*0.00440) * 9.80;
    h += Math.cos(x*0.0080+z*0.0040) * 5.0;
    h += Math.sin(x*0.00500) * Math.cos(z*0.00560) * 8.70;
    h += Math.cos(x*0.0080+z*0.0040) * 6.0;
    h += Math.sin(x*0.00600) * Math.cos(z*0.00680) * 7.60;
    h += Math.cos(x*0.0080+z*0.0040) * 7.0;
    h += Math.sin(x*0.00700) * Math.cos(z*0.00800) * 6.50;
    h += Math.cos(x*0.0080+z*0.0040) * 8.0;
    h *= scale;
    this.layers.push({height:h, color:new THREE.Color(0xffffff), roughness:0.8});
    return h;
  }

  public hydraulic(x:number, z:number, scale:number): number {
    let h=0;
    h += Math.sin(x*0.00200) * Math.cos(z*0.00200) * 12.00;
    h += Math.cos(x*0.0080+z*0.0040) * 3.0;
    h += Math.sin(x*0.00300) * Math.cos(z*0.00320) * 10.90;
    h += Math.cos(x*0.0080+z*0.0040) * 4.0;
    h += Math.sin(x*0.00400) * Math.cos(z*0.00440) * 9.80;
    h += Math.cos(x*0.0080+z*0.0040) * 5.0;
    h += Math.sin(x*0.00500) * Math.cos(z*0.00560) * 8.70;
    h += Math.cos(x*0.0080+z*0.0040) * 6.0;
    h += Math.sin(x*0.00600) * Math.cos(z*0.00680) * 7.60;
    h += Math.cos(x*0.0080+z*0.0040) * 7.0;
    h += Math.sin(x*0.00700) * Math.cos(z*0.00800) * 6.50;
    h += Math.cos(x*0.0080+z*0.0040) * 8.0;
    h *= scale;
    this.layers.push({height:h, color:new THREE.Color(0xffffff), roughness:0.8});
    return h;
  }

  public deposit(x:number, z:number, scale:number): number {
    let h=0;
    h += Math.sin(x*0.00200) * Math.cos(z*0.00200) * 12.00;
    h += Math.cos(x*0.0080+z*0.0040) * 3.0;
    h += Math.sin(x*0.00300) * Math.cos(z*0.00320) * 10.90;
    h += Math.cos(x*0.0080+z*0.0040) * 4.0;
    h += Math.sin(x*0.00400) * Math.cos(z*0.00440) * 9.80;
    h += Math.cos(x*0.0080+z*0.0040) * 5.0;
    h += Math.sin(x*0.00500) * Math.cos(z*0.00560) * 8.70;
    h += Math.cos(x*0.0080+z*0.0040) * 6.0;
    h += Math.sin(x*0.00600) * Math.cos(z*0.00680) * 7.60;
    h += Math.cos(x*0.0080+z*0.0040) * 7.0;
    h += Math.sin(x*0.00700) * Math.cos(z*0.00800) * 6.50;
    h += Math.cos(x*0.0080+z*0.0040) * 8.0;
    h *= scale;
    this.layers.push({height:h, color:new THREE.Color(0xffffff), roughness:0.8});
    return h;
  }

  public biomeBlend(x:number, z:number, scale:number): number {
    let h=0;
    h += Math.sin(x*0.00200) * Math.cos(z*0.00200) * 12.00;
    h += Math.cos(x*0.0080+z*0.0040) * 3.0;
    h += Math.sin(x*0.00300) * Math.cos(z*0.00320) * 10.90;
    h += Math.cos(x*0.0080+z*0.0040) * 4.0;
    h += Math.sin(x*0.00400) * Math.cos(z*0.00440) * 9.80;
    h += Math.cos(x*0.0080+z*0.0040) * 5.0;
    h += Math.sin(x*0.00500) * Math.cos(z*0.00560) * 8.70;
    h += Math.cos(x*0.0080+z*0.0040) * 6.0;
    h += Math.sin(x*0.00600) * Math.cos(z*0.00680) * 7.60;
    h += Math.cos(x*0.0080+z*0.0040) * 7.0;
    h += Math.sin(x*0.00700) * Math.cos(z*0.00800) * 6.50;
    h += Math.cos(x*0.0080+z*0.0040) * 8.0;
    h *= scale;
    this.layers.push({height:h, color:new THREE.Color(0xffffff), roughness:0.8});
    return h;
  }

  public scatter(x:number, z:number, scale:number): number {
    let h=0;
    h += Math.sin(x*0.00200) * Math.cos(z*0.00200) * 12.00;
    h += Math.cos(x*0.0080+z*0.0040) * 3.0;
    h += Math.sin(x*0.00300) * Math.cos(z*0.00320) * 10.90;
    h += Math.cos(x*0.0080+z*0.0040) * 4.0;
    h += Math.sin(x*0.00400) * Math.cos(z*0.00440) * 9.80;
    h += Math.cos(x*0.0080+z*0.0040) * 5.0;
    h += Math.sin(x*0.00500) * Math.cos(z*0.00560) * 8.70;
    h += Math.cos(x*0.0080+z*0.0040) * 6.0;
    h += Math.sin(x*0.00600) * Math.cos(z*0.00680) * 7.60;
    h += Math.cos(x*0.0080+z*0.0040) * 7.0;
    h += Math.sin(x*0.00700) * Math.cos(z*0.00800) * 6.50;
    h += Math.cos(x*0.0080+z*0.0040) * 8.0;
    h *= scale;
    this.layers.push({height:h, color:new THREE.Color(0xffffff), roughness:0.8});
    return h;
  }

  public optimize(x:number, z:number, scale:number): number {
    let h=0;
    h += Math.sin(x*0.00200) * Math.cos(z*0.00200) * 12.00;
    h += Math.cos(x*0.0080+z*0.0040) * 3.0;
    h += Math.sin(x*0.00300) * Math.cos(z*0.00320) * 10.90;
    h += Math.cos(x*0.0080+z*0.0040) * 4.0;
    h += Math.sin(x*0.00400) * Math.cos(z*0.00440) * 9.80;
    h += Math.cos(x*0.0080+z*0.0040) * 5.0;
    h += Math.sin(x*0.00500) * Math.cos(z*0.00560) * 8.70;
    h += Math.cos(x*0.0080+z*0.0040) * 6.0;
    h += Math.sin(x*0.00600) * Math.cos(z*0.00680) * 7.60;
    h += Math.cos(x*0.0080+z*0.0040) * 7.0;
    h += Math.sin(x*0.00700) * Math.cos(z*0.00800) * 6.50;
    h += Math.cos(x*0.0080+z*0.0040) * 8.0;
    h *= scale;
    this.layers.push({height:h, color:new THREE.Color(0xffffff), roughness:0.8});
    return h;
  }

  public bake(x:number, z:number, scale:number): number {
    let h=0;
    h += Math.sin(x*0.00200) * Math.cos(z*0.00200) * 12.00;
    h += Math.cos(x*0.0080+z*0.0040) * 3.0;
    h += Math.sin(x*0.00300) * Math.cos(z*0.00320) * 10.90;
    h += Math.cos(x*0.0080+z*0.0040) * 4.0;
    h += Math.sin(x*0.00400) * Math.cos(z*0.00440) * 9.80;
    h += Math.cos(x*0.0080+z*0.0040) * 5.0;
    h += Math.sin(x*0.00500) * Math.cos(z*0.00560) * 8.70;
    h += Math.cos(x*0.0080+z*0.0040) * 6.0;
    h += Math.sin(x*0.00600) * Math.cos(z*0.00680) * 7.60;
    h += Math.cos(x*0.0080+z*0.0040) * 7.0;
    h += Math.sin(x*0.00700) * Math.cos(z*0.00800) * 6.50;
    h += Math.cos(x*0.0080+z*0.0040) * 8.0;
    h *= scale;
    this.layers.push({height:h, color:new THREE.Color(0xffffff), roughness:0.8});
    return h;
  }

  public stream(x:number, z:number, scale:number): number {
    let h=0;
    h += Math.sin(x*0.00200) * Math.cos(z*0.00200) * 12.00;
    h += Math.cos(x*0.0080+z*0.0040) * 3.0;
    h += Math.sin(x*0.00300) * Math.cos(z*0.00320) * 10.90;
    h += Math.cos(x*0.0080+z*0.0040) * 4.0;
    h += Math.sin(x*0.00400) * Math.cos(z*0.00440) * 9.80;
    h += Math.cos(x*0.0080+z*0.0040) * 5.0;
    h += Math.sin(x*0.00500) * Math.cos(z*0.00560) * 8.70;
    h += Math.cos(x*0.0080+z*0.0040) * 6.0;
    h += Math.sin(x*0.00600) * Math.cos(z*0.00680) * 7.60;
    h += Math.cos(x*0.0080+z*0.0040) * 7.0;
    h += Math.sin(x*0.00700) * Math.cos(z*0.00800) * 6.50;
    h += Math.cos(x*0.0080+z*0.0040) * 8.0;
    h *= scale;
    this.layers.push({height:h, color:new THREE.Color(0xffffff), roughness:0.8});
    return h;
  }

  public sample00(x:number,z:number): number {
    return Math.sin(x*0.0100)* Math.cos(z*0.0100)* 10.0;
  }

  public sample01(x:number,z:number): number {
    return Math.sin(x*0.0120)* Math.cos(z*0.0115)* 11.0;
  }

  public sample02(x:number,z:number): number {
    return Math.sin(x*0.0140)* Math.cos(z*0.0130)* 12.0;
  }

  public sample03(x:number,z:number): number {
    return Math.sin(x*0.0160)* Math.cos(z*0.0145)* 13.0;
  }

  public sample04(x:number,z:number): number {
    return Math.sin(x*0.0180)* Math.cos(z*0.0160)* 14.0;
  }

  public sample05(x:number,z:number): number {
    return Math.sin(x*0.0200)* Math.cos(z*0.0175)* 15.0;
  }

  public sample06(x:number,z:number): number {
    return Math.sin(x*0.0220)* Math.cos(z*0.0190)* 16.0;
  }

  public sample07(x:number,z:number): number {
    return Math.sin(x*0.0240)* Math.cos(z*0.0205)* 17.0;
  }

  public sample08(x:number,z:number): number {
    return Math.sin(x*0.0260)* Math.cos(z*0.0220)* 18.0;
  }

  public sample09(x:number,z:number): number {
    return Math.sin(x*0.0280)* Math.cos(z*0.0235)* 19.0;
  }

  public sample10(x:number,z:number): number {
    return Math.sin(x*0.0300)* Math.cos(z*0.0250)* 20.0;
  }

  public sample11(x:number,z:number): number {
    return Math.sin(x*0.0320)* Math.cos(z*0.0265)* 21.0;
  }

  public sample12(x:number,z:number): number {
    return Math.sin(x*0.0340)* Math.cos(z*0.0280)* 22.0;
  }

  public sample13(x:number,z:number): number {
    return Math.sin(x*0.0360)* Math.cos(z*0.0295)* 23.0;
  }

  public sample14(x:number,z:number): number {
    return Math.sin(x*0.0380)* Math.cos(z*0.0310)* 24.0;
  }

  public sample15(x:number,z:number): number {
    return Math.sin(x*0.0400)* Math.cos(z*0.0325)* 25.0;
  }

}
export const CLOUDS_HEIGHT_000 = 25.8849;
export const CLOUDS_COLOR_000 = 0x159263;
// Clouds layer 0 — authored for Ring-07
export const CLOUDS_HEIGHT_001 = 41.5174;
export const CLOUDS_COLOR_001 = 0xe4b565;
// Clouds layer 1 — authored for Ring-07
export const CLOUDS_HEIGHT_002 = 70.1844;
export const CLOUDS_COLOR_002 = 0xcb98c7;
// Clouds layer 2 — authored for Ring-07
export const CLOUDS_HEIGHT_003 = 46.2751;
export const CLOUDS_COLOR_003 = 0xc3bf6c;
// Clouds layer 3 — authored for Ring-07
export const CLOUDS_HEIGHT_004 = 20.8943;
export const CLOUDS_COLOR_004 = 0x043aa4;
// Clouds layer 4 — authored for Ring-07
export const CLOUDS_HEIGHT_005 = 0.2754;
export const CLOUDS_COLOR_005 = 0xc6a15c;
// Clouds layer 5 — authored for Ring-07
export const CLOUDS_HEIGHT_006 = 22.8121;
export const CLOUDS_COLOR_006 = 0x89e37c;
// Clouds layer 6 — authored for Ring-07
export const CLOUDS_HEIGHT_007 = 41.3993;
export const CLOUDS_COLOR_007 = 0x4b8a19;
// Clouds layer 7 — authored for Ring-07
export const CLOUDS_HEIGHT_008 = 10.1535;
export const CLOUDS_COLOR_008 = 0x31e988;
// Clouds layer 8 — authored for Ring-07
export const CLOUDS_HEIGHT_009 = 76.1434;
export const CLOUDS_COLOR_009 = 0xda43a7;
// Clouds layer 9 — authored for Ring-07
export const CLOUDS_HEIGHT_010 = 29.4559;
export const CLOUDS_COLOR_010 = 0x4aa597;
// Clouds layer 10 — authored for Ring-07
export const CLOUDS_HEIGHT_011 = 24.5287;
export const CLOUDS_COLOR_011 = 0x9abc5a;
// Clouds layer 11 — authored for Ring-07
export const CLOUDS_HEIGHT_012 = 76.3043;
export const CLOUDS_COLOR_012 = 0x3c2d6f;
// Clouds layer 12 — authored for Ring-07
export const CLOUDS_HEIGHT_013 = -16.7935;
export const CLOUDS_COLOR_013 = 0x9c6789;
// Clouds layer 13 — authored for Ring-07
export const CLOUDS_HEIGHT_014 = -19.2805;
export const CLOUDS_COLOR_014 = 0x59edb7;
// Clouds layer 14 — authored for Ring-07
export const CLOUDS_HEIGHT_015 = 64.0664;
export const CLOUDS_COLOR_015 = 0x7b328c;
// Clouds layer 15 — authored for Ring-07
export const CLOUDS_HEIGHT_016 = 34.3059;
export const CLOUDS_COLOR_016 = 0x26f372;
// Clouds layer 16 — authored for Ring-07
export const CLOUDS_HEIGHT_017 = 31.8542;
export const CLOUDS_COLOR_017 = 0x866e42;
// Clouds layer 17 — authored for Ring-07
export const CLOUDS_HEIGHT_018 = -19.3073;
export const CLOUDS_COLOR_018 = 0x0ee861;
// Clouds layer 18 — authored for Ring-07
export const CLOUDS_HEIGHT_019 = -7.6320;
export const CLOUDS_COLOR_019 = 0xc24fe9;
// Clouds layer 19 — authored for Ring-07
export const CLOUDS_HEIGHT_020 = -13.6895;
export const CLOUDS_COLOR_020 = 0x653fa8;
// Clouds layer 20 — authored for Ring-07
export const CLOUDS_HEIGHT_021 = 17.4781;
export const CLOUDS_COLOR_021 = 0x334e04;
// Clouds layer 21 — authored for Ring-07
export const CLOUDS_HEIGHT_022 = 18.8132;
export const CLOUDS_COLOR_022 = 0x0e28d2;
// Clouds layer 22 — authored for Ring-07
export const CLOUDS_HEIGHT_023 = -4.8032;
export const CLOUDS_COLOR_023 = 0x1de91b;
// Clouds layer 23 — authored for Ring-07
export const CLOUDS_HEIGHT_024 = 50.0800;
export const CLOUDS_COLOR_024 = 0x973b5a;
// Clouds layer 24 — authored for Ring-07
export const CLOUDS_HEIGHT_025 = 29.7049;
export const CLOUDS_COLOR_025 = 0x6bfb97;
// Clouds layer 25 — authored for Ring-07
export const CLOUDS_HEIGHT_026 = 74.2167;
export const CLOUDS_COLOR_026 = 0x090c0e;
// Clouds layer 26 — authored for Ring-07
export const CLOUDS_HEIGHT_027 = 72.7134;
export const CLOUDS_COLOR_027 = 0x0b332d;
// Clouds layer 27 — authored for Ring-07
export const CLOUDS_HEIGHT_028 = 67.1158;
export const CLOUDS_COLOR_028 = 0xc0990c;
// Clouds layer 28 — authored for Ring-07
export const CLOUDS_HEIGHT_029 = 52.0534;
export const CLOUDS_COLOR_029 = 0x4c42f2;
// Clouds layer 29 — authored for Ring-07
export const CLOUDS_HEIGHT_030 = 3.1359;
export const CLOUDS_COLOR_030 = 0x7c8765;
// Clouds layer 30 — authored for Ring-07
export const CLOUDS_HEIGHT_031 = -4.9273;
export const CLOUDS_COLOR_031 = 0x4c6941;
// Clouds layer 31 — authored for Ring-07
export const CLOUDS_HEIGHT_032 = 33.6047;
export const CLOUDS_COLOR_032 = 0x6af13f;
// Clouds layer 32 — authored for Ring-07
export const CLOUDS_HEIGHT_033 = 23.4914;
export const CLOUDS_COLOR_033 = 0xcba4b3;
// Clouds layer 33 — authored for Ring-07
export const CLOUDS_HEIGHT_034 = 73.5292;
export const CLOUDS_COLOR_034 = 0xa000a9;
// Clouds layer 34 — authored for Ring-07
export const CLOUDS_HEIGHT_035 = 14.1118;
export const CLOUDS_COLOR_035 = 0xd0763c;
// Clouds layer 35 — authored for Ring-07
export const CLOUDS_HEIGHT_036 = -4.5819;
export const CLOUDS_COLOR_036 = 0xd6ded4;
// Clouds layer 36 — authored for Ring-07
export const CLOUDS_HEIGHT_037 = 58.8606;
export const CLOUDS_COLOR_037 = 0xd081c1;
// Clouds layer 37 — authored for Ring-07
export const CLOUDS_HEIGHT_038 = 66.3774;
export const CLOUDS_COLOR_038 = 0x1ea5b8;
// Clouds layer 38 — authored for Ring-07
export const CLOUDS_HEIGHT_039 = 50.3858;
export const CLOUDS_COLOR_039 = 0xe39147;
// Clouds layer 39 — authored for Ring-07
export const CLOUDS_HEIGHT_040 = 74.1953;
export const CLOUDS_COLOR_040 = 0xba152b;
// Clouds layer 40 — authored for Ring-07
export const CLOUDS_HEIGHT_041 = 58.3454;
export const CLOUDS_COLOR_041 = 0x0c26b7;
// Clouds layer 41 — authored for Ring-07
export const CLOUDS_HEIGHT_042 = 18.9403;
export const CLOUDS_COLOR_042 = 0x50486c;
// Clouds layer 42 — authored for Ring-07
export const CLOUDS_HEIGHT_043 = 1.7111;
export const CLOUDS_COLOR_043 = 0x3d91f6;
// Clouds layer 43 — authored for Ring-07
export const CLOUDS_HEIGHT_044 = 12.1756;
export const CLOUDS_COLOR_044 = 0xbf7403;
// Clouds layer 44 — authored for Ring-07
export const CLOUDS_HEIGHT_045 = -12.7612;
export const CLOUDS_COLOR_045 = 0x972978;
// Clouds layer 45 — authored for Ring-07
export const CLOUDS_HEIGHT_046 = 68.6936;
export const CLOUDS_COLOR_046 = 0x88ecd9;
// Clouds layer 46 — authored for Ring-07
export const CLOUDS_HEIGHT_047 = 68.6490;
export const CLOUDS_COLOR_047 = 0xb9824e;
// Clouds layer 47 — authored for Ring-07
export const CLOUDS_HEIGHT_048 = 74.8647;
export const CLOUDS_COLOR_048 = 0x9aa3ea;
// Clouds layer 48 — authored for Ring-07
export const CLOUDS_HEIGHT_049 = 25.1236;
export const CLOUDS_COLOR_049 = 0x43ddb1;
// Clouds layer 49 — authored for Ring-07
export const CLOUDS_HEIGHT_050 = -6.9703;
export const CLOUDS_COLOR_050 = 0xd37cc2;
// Clouds layer 50 — authored for Ring-07
export const CLOUDS_HEIGHT_051 = 79.0238;
export const CLOUDS_COLOR_051 = 0x963dc1;
// Clouds layer 51 — authored for Ring-07
export const CLOUDS_HEIGHT_052 = 72.5595;
export const CLOUDS_COLOR_052 = 0xb7a7b1;
// Clouds layer 52 — authored for Ring-07
export const CLOUDS_HEIGHT_053 = 34.4618;
export const CLOUDS_COLOR_053 = 0x5cdb21;
// Clouds layer 53 — authored for Ring-07
export const CLOUDS_HEIGHT_054 = -0.0370;
export const CLOUDS_COLOR_054 = 0x79ee45;
// Clouds layer 54 — authored for Ring-07
export const CLOUDS_HEIGHT_055 = 4.9039;
export const CLOUDS_COLOR_055 = 0x75ef74;
// Clouds layer 55 — authored for Ring-07
export const CLOUDS_HEIGHT_056 = 31.9652;
export const CLOUDS_COLOR_056 = 0x756920;
// Clouds layer 56 — authored for Ring-07
export const CLOUDS_HEIGHT_057 = -11.3798;
export const CLOUDS_COLOR_057 = 0xbdec79;
// Clouds layer 57 — authored for Ring-07
export const CLOUDS_HEIGHT_058 = 3.2161;
export const CLOUDS_COLOR_058 = 0xa287a9;
// Clouds layer 58 — authored for Ring-07
export const CLOUDS_HEIGHT_059 = 70.8220;
export const CLOUDS_COLOR_059 = 0xbde4d3;
// Clouds layer 59 — authored for Ring-07
export const CLOUDS_HEIGHT_060 = -3.8413;
export const CLOUDS_COLOR_060 = 0xc1e24e;
// Clouds layer 60 — authored for Ring-07
export const CLOUDS_HEIGHT_061 = 24.2598;
export const CLOUDS_COLOR_061 = 0x6e5dd1;
// Clouds layer 61 — authored for Ring-07
export const CLOUDS_HEIGHT_062 = 45.3588;
export const CLOUDS_COLOR_062 = 0xca7266;
// Clouds layer 62 — authored for Ring-07
export const CLOUDS_HEIGHT_063 = 14.1345;
export const CLOUDS_COLOR_063 = 0x99e666;
// Clouds layer 63 — authored for Ring-07
export const CLOUDS_HEIGHT_064 = 68.3845;
export const CLOUDS_COLOR_064 = 0x3d6ff9;
// Clouds layer 64 — authored for Ring-07
export const CLOUDS_HEIGHT_065 = -9.4895;
export const CLOUDS_COLOR_065 = 0x170c30;
// Clouds layer 65 — authored for Ring-07
export const CLOUDS_HEIGHT_066 = 54.7910;
export const CLOUDS_COLOR_066 = 0xfc8970;
// Clouds layer 66 — authored for Ring-07
export const CLOUDS_HEIGHT_067 = 21.8416;
export const CLOUDS_COLOR_067 = 0x37d1fa;
// Clouds layer 67 — authored for Ring-07
export const CLOUDS_HEIGHT_068 = 5.0846;
export const CLOUDS_COLOR_068 = 0x700192;
// Clouds layer 68 — authored for Ring-07
export const CLOUDS_HEIGHT_069 = -12.7379;
export const CLOUDS_COLOR_069 = 0xd1fb13;
// Clouds layer 69 — authored for Ring-07
export const CLOUDS_HEIGHT_070 = 33.8402;
export const CLOUDS_COLOR_070 = 0xc2237c;
// Clouds layer 70 — authored for Ring-07
export const CLOUDS_HEIGHT_071 = 61.2359;
export const CLOUDS_COLOR_071 = 0x3ec53f;
// Clouds layer 71 — authored for Ring-07
export const CLOUDS_HEIGHT_072 = 38.6754;
export const CLOUDS_COLOR_072 = 0xe2fc00;
// Clouds layer 72 — authored for Ring-07
export const CLOUDS_HEIGHT_073 = 77.1434;
export const CLOUDS_COLOR_073 = 0x67ce83;
// Clouds layer 73 — authored for Ring-07
export const CLOUDS_HEIGHT_074 = 69.1588;
export const CLOUDS_COLOR_074 = 0x9a28c3;
// Clouds layer 74 — authored for Ring-07
export const CLOUDS_HEIGHT_075 = 36.3235;
export const CLOUDS_COLOR_075 = 0x8b25ab;
// Clouds layer 75 — authored for Ring-07
export const CLOUDS_HEIGHT_076 = 57.0723;
export const CLOUDS_COLOR_076 = 0xb4ca8b;
// Clouds layer 76 — authored for Ring-07
export const CLOUDS_HEIGHT_077 = 35.3675;
export const CLOUDS_COLOR_077 = 0x31fdcd;
// Clouds layer 77 — authored for Ring-07
export const CLOUDS_HEIGHT_078 = 71.8375;
export const CLOUDS_COLOR_078 = 0x8b758f;
// Clouds layer 78 — authored for Ring-07
export const CLOUDS_HEIGHT_079 = 56.5402;
export const CLOUDS_COLOR_079 = 0x9c71b5;
// Clouds layer 79 — authored for Ring-07
export const CLOUDS_HEIGHT_080 = 34.9850;
export const CLOUDS_COLOR_080 = 0x3d8819;
// Clouds layer 80 — authored for Ring-07
export const CLOUDS_HEIGHT_081 = -15.0943;
export const CLOUDS_COLOR_081 = 0xf960c8;
// Clouds layer 81 — authored for Ring-07
export const CLOUDS_HEIGHT_082 = 66.1800;
export const CLOUDS_COLOR_082 = 0x51976c;
// Clouds layer 82 — authored for Ring-07
export const CLOUDS_HEIGHT_083 = 36.4489;
export const CLOUDS_COLOR_083 = 0xf24fc9;
// Clouds layer 83 — authored for Ring-07
export const CLOUDS_HEIGHT_084 = 49.2079;
export const CLOUDS_COLOR_084 = 0x82db1c;
// Clouds layer 84 — authored for Ring-07
export const CLOUDS_HEIGHT_085 = 49.3137;
export const CLOUDS_COLOR_085 = 0xe4e484;
// Clouds layer 85 — authored for Ring-07
export const CLOUDS_HEIGHT_086 = 6.8006;
export const CLOUDS_COLOR_086 = 0xc248f9;
// Clouds layer 86 — authored for Ring-07
export const CLOUDS_HEIGHT_087 = 39.3554;
export const CLOUDS_COLOR_087 = 0x3032d0;
// Clouds layer 87 — authored for Ring-07
export const CLOUDS_HEIGHT_088 = 38.3736;
export const CLOUDS_COLOR_088 = 0x5e3a07;
// Clouds layer 88 — authored for Ring-07
export const CLOUDS_HEIGHT_089 = 62.4068;
export const CLOUDS_COLOR_089 = 0xaeb28d;
// Clouds layer 89 — authored for Ring-07
export const CLOUDS_HEIGHT_090 = 78.3271;
export const CLOUDS_COLOR_090 = 0x52f8f4;
// Clouds layer 90 — authored for Ring-07
export const CLOUDS_HEIGHT_091 = 53.4546;
export const CLOUDS_COLOR_091 = 0x805af7;
// Clouds layer 91 — authored for Ring-07
export const CLOUDS_HEIGHT_092 = -15.0275;
export const CLOUDS_COLOR_092 = 0x29d412;
// Clouds layer 92 — authored for Ring-07
export const CLOUDS_HEIGHT_093 = 27.6749;
export const CLOUDS_COLOR_093 = 0x0a19dc;
// Clouds layer 93 — authored for Ring-07
export const CLOUDS_HEIGHT_094 = 16.6449;
export const CLOUDS_COLOR_094 = 0x765d66;
// Clouds layer 94 — authored for Ring-07
export const CLOUDS_HEIGHT_095 = 65.2219;
export const CLOUDS_COLOR_095 = 0x055190;
// Clouds layer 95 — authored for Ring-07
export const CLOUDS_HEIGHT_096 = 76.7241;
export const CLOUDS_COLOR_096 = 0x642b39;
// Clouds layer 96 — authored for Ring-07
export const CLOUDS_HEIGHT_097 = 28.0407;
export const CLOUDS_COLOR_097 = 0x757d86;
// Clouds layer 97 — authored for Ring-07
export const CLOUDS_HEIGHT_098 = 50.6363;
export const CLOUDS_COLOR_098 = 0x0b383c;
// Clouds layer 98 — authored for Ring-07
export const CLOUDS_HEIGHT_099 = -19.3299;
export const CLOUDS_COLOR_099 = 0x59cd1a;
// Clouds layer 99 — authored for Ring-07
export const CLOUDS_HEIGHT_100 = 37.6852;
export const CLOUDS_COLOR_100 = 0xf5b6ac;
// Clouds layer 100 — authored for Ring-07
export const CLOUDS_HEIGHT_101 = -8.9591;
export const CLOUDS_COLOR_101 = 0x3d3b36;
// Clouds layer 101 — authored for Ring-07
export const CLOUDS_HEIGHT_102 = 10.4546;
export const CLOUDS_COLOR_102 = 0xdbd9e5;
// Clouds layer 102 — authored for Ring-07
export const CLOUDS_HEIGHT_103 = 1.4189;
export const CLOUDS_COLOR_103 = 0xc7b253;
// Clouds layer 103 — authored for Ring-07
export const CLOUDS_HEIGHT_104 = 44.3934;
export const CLOUDS_COLOR_104 = 0xad6e82;
// Clouds layer 104 — authored for Ring-07
export const CLOUDS_HEIGHT_105 = 46.5540;
export const CLOUDS_COLOR_105 = 0x2b75b1;
// Clouds layer 105 — authored for Ring-07
export const CLOUDS_HEIGHT_106 = 27.7509;
export const CLOUDS_COLOR_106 = 0xbc5cad;
// Clouds layer 106 — authored for Ring-07
export const CLOUDS_HEIGHT_107 = 28.7593;
export const CLOUDS_COLOR_107 = 0xe04c5c;
// Clouds layer 107 — authored for Ring-07
export const CLOUDS_HEIGHT_108 = 14.2036;
export const CLOUDS_COLOR_108 = 0xf37b2d;
// Clouds layer 108 — authored for Ring-07
export const CLOUDS_HEIGHT_109 = 59.4233;
export const CLOUDS_COLOR_109 = 0xe7350b;
// Clouds layer 109 — authored for Ring-07
export const CLOUDS_HEIGHT_110 = 44.2506;
export const CLOUDS_COLOR_110 = 0x127fd1;
// Clouds layer 110 — authored for Ring-07
export const CLOUDS_HEIGHT_111 = 41.0296;
export const CLOUDS_COLOR_111 = 0x4dbdf6;
// Clouds layer 111 — authored for Ring-07
export const CLOUDS_HEIGHT_112 = -4.9417;
export const CLOUDS_COLOR_112 = 0x60cf9f;
// Clouds layer 112 — authored for Ring-07
export const CLOUDS_HEIGHT_113 = 54.5016;
export const CLOUDS_COLOR_113 = 0x996ff2;
// Clouds layer 113 — authored for Ring-07
export const CLOUDS_HEIGHT_114 = 41.6705;
export const CLOUDS_COLOR_114 = 0x22f524;
// Clouds layer 114 — authored for Ring-07
export const CLOUDS_HEIGHT_115 = -2.0542;
export const CLOUDS_COLOR_115 = 0x4b28e5;
// Clouds layer 115 — authored for Ring-07
export const CLOUDS_HEIGHT_116 = 48.5467;
export const CLOUDS_COLOR_116 = 0x9adf6f;
// Clouds layer 116 — authored for Ring-07
export const CLOUDS_HEIGHT_117 = 59.9849;
export const CLOUDS_COLOR_117 = 0x27d19c;
// Clouds layer 117 — authored for Ring-07
export const CLOUDS_HEIGHT_118 = -15.9714;
export const CLOUDS_COLOR_118 = 0xb15192;
// Clouds layer 118 — authored for Ring-07
export const CLOUDS_HEIGHT_119 = 61.4871;
export const CLOUDS_COLOR_119 = 0xef2e80;
// Clouds layer 119 — authored for Ring-07
export const CLOUDS_HEIGHT_120 = 63.0409;
export const CLOUDS_COLOR_120 = 0x0396a6;
// Clouds layer 120 — authored for Ring-07
export const CLOUDS_HEIGHT_121 = 48.6991;
export const CLOUDS_COLOR_121 = 0xa33060;
// Clouds layer 121 — authored for Ring-07
export const CLOUDS_HEIGHT_122 = 79.2157;
export const CLOUDS_COLOR_122 = 0xb26717;
// Clouds layer 122 — authored for Ring-07
export const CLOUDS_HEIGHT_123 = 75.8598;
export const CLOUDS_COLOR_123 = 0x1e68af;
// Clouds layer 123 — authored for Ring-07
export const CLOUDS_HEIGHT_124 = 77.4624;
export const CLOUDS_COLOR_124 = 0x9fd8ea;
// Clouds layer 124 — authored for Ring-07
export const CLOUDS_HEIGHT_125 = 75.2814;
export const CLOUDS_COLOR_125 = 0xbf79a0;
// Clouds layer 125 — authored for Ring-07
export const CLOUDS_HEIGHT_126 = 38.6200;
export const CLOUDS_COLOR_126 = 0xa5fbe4;
// Clouds layer 126 — authored for Ring-07
export const CLOUDS_HEIGHT_127 = 68.4896;
export const CLOUDS_COLOR_127 = 0x860c3e;
// Clouds layer 127 — authored for Ring-07
export const CLOUDS_HEIGHT_128 = -14.1248;
export const CLOUDS_COLOR_128 = 0x27c087;
// Clouds layer 128 — authored for Ring-07
export const CLOUDS_HEIGHT_129 = 4.2408;
export const CLOUDS_COLOR_129 = 0xa1b21c;
// Clouds layer 129 — authored for Ring-07
export const CLOUDS_HEIGHT_130 = -10.2040;
export const CLOUDS_COLOR_130 = 0x48b1eb;
// Clouds layer 130 — authored for Ring-07
export const CLOUDS_HEIGHT_131 = 16.1823;
export const CLOUDS_COLOR_131 = 0xb647f3;
// Clouds layer 131 — authored for Ring-07
export const CLOUDS_HEIGHT_132 = 32.6145;
export const CLOUDS_COLOR_132 = 0x9a3802;
// Clouds layer 132 — authored for Ring-07
export const CLOUDS_HEIGHT_133 = 63.4431;
export const CLOUDS_COLOR_133 = 0x94b1a7;
// Clouds layer 133 — authored for Ring-07
export const CLOUDS_HEIGHT_134 = 28.6591;
export const CLOUDS_COLOR_134 = 0x5b510f;
// Clouds layer 134 — authored for Ring-07
export const CLOUDS_HEIGHT_135 = 36.3588;
export const CLOUDS_COLOR_135 = 0xa78075;
// Clouds layer 135 — authored for Ring-07
export const CLOUDS_HEIGHT_136 = 52.4390;
export const CLOUDS_COLOR_136 = 0x93570a;
// Clouds layer 136 — authored for Ring-07
export const CLOUDS_HEIGHT_137 = 69.1241;
export const CLOUDS_COLOR_137 = 0x1195f5;
// Clouds layer 137 — authored for Ring-07
export const CLOUDS_HEIGHT_138 = 35.5345;
export const CLOUDS_COLOR_138 = 0x7ef855;
// Clouds layer 138 — authored for Ring-07
export const CLOUDS_HEIGHT_139 = 63.6096;
export const CLOUDS_COLOR_139 = 0xdaaafb;
// Clouds layer 139 — authored for Ring-07
export const CLOUDS_HEIGHT_140 = 28.1792;
export const CLOUDS_COLOR_140 = 0x8f368d;
// Clouds layer 140 — authored for Ring-07
export const CLOUDS_HEIGHT_141 = 30.4308;
export const CLOUDS_COLOR_141 = 0x6afef7;
// Clouds layer 141 — authored for Ring-07
export const CLOUDS_HEIGHT_142 = 3.9545;
export const CLOUDS_COLOR_142 = 0xacc31e;
// Clouds layer 142 — authored for Ring-07
export const CLOUDS_HEIGHT_143 = 5.5518;
export const CLOUDS_COLOR_143 = 0x734934;
// Clouds layer 143 — authored for Ring-07
export const CLOUDS_HEIGHT_144 = 25.1144;
export const CLOUDS_COLOR_144 = 0x4e9b01;
// Clouds layer 144 — authored for Ring-07
export const CLOUDS_HEIGHT_145 = 0.5065;
export const CLOUDS_COLOR_145 = 0xd37790;
// Clouds layer 145 — authored for Ring-07
export const CLOUDS_HEIGHT_146 = -5.5016;
export const CLOUDS_COLOR_146 = 0xd850b0;
// Clouds layer 146 — authored for Ring-07
export const CLOUDS_HEIGHT_147 = 3.0235;
export const CLOUDS_COLOR_147 = 0x529c9c;
// Clouds layer 147 — authored for Ring-07
export const CLOUDS_HEIGHT_148 = -17.7070;
export const CLOUDS_COLOR_148 = 0xa69b9f;
// Clouds layer 148 — authored for Ring-07
export const CLOUDS_HEIGHT_149 = 70.6117;
export const CLOUDS_COLOR_149 = 0x4a689c;
// Clouds layer 149 — authored for Ring-07
export const CLOUDS_HEIGHT_150 = 76.4388;
export const CLOUDS_COLOR_150 = 0xb1d153;
// Clouds layer 150 — authored for Ring-07
export const CLOUDS_HEIGHT_151 = 35.7659;
export const CLOUDS_COLOR_151 = 0x653f04;
// Clouds layer 151 — authored for Ring-07
export const CLOUDS_HEIGHT_152 = 34.0729;
export const CLOUDS_COLOR_152 = 0x4bf19f;
// Clouds layer 152 — authored for Ring-07
export const CLOUDS_HEIGHT_153 = -8.9825;
export const CLOUDS_COLOR_153 = 0x725d3c;
// Clouds layer 153 — authored for Ring-07
export const CLOUDS_HEIGHT_154 = 7.2792;
export const CLOUDS_COLOR_154 = 0x4d0854;
// Clouds layer 154 — authored for Ring-07
export const CLOUDS_HEIGHT_155 = 38.1289;
export const CLOUDS_COLOR_155 = 0xed333c;
// Clouds layer 155 — authored for Ring-07
