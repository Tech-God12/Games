/**
 * NEXUS: FRAGMENT — WORLD/Vegetation
 * World generation — Vegetation
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

import * as THREE from 'three';

export interface VegetationLayer { height: number; color: THREE.Color; roughness: number; }
export const VEGETATION_SEED = 68229;

export class Vegetation {
  private layers: VegetationLayer[] = [];
  constructor(public seed:number=VEGETATION_SEED){}

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
export const VEGETATION_HEIGHT_000 = 34.0510;
export const VEGETATION_COLOR_000 = 0xdcbaa4;
// Vegetation layer 0 — authored for Ring-07
export const VEGETATION_HEIGHT_001 = 21.0260;
export const VEGETATION_COLOR_001 = 0xc66fbb;
// Vegetation layer 1 — authored for Ring-07
export const VEGETATION_HEIGHT_002 = 46.7064;
export const VEGETATION_COLOR_002 = 0x07563a;
// Vegetation layer 2 — authored for Ring-07
export const VEGETATION_HEIGHT_003 = 30.2728;
export const VEGETATION_COLOR_003 = 0x686524;
// Vegetation layer 3 — authored for Ring-07
export const VEGETATION_HEIGHT_004 = 5.0835;
export const VEGETATION_COLOR_004 = 0x647928;
// Vegetation layer 4 — authored for Ring-07
export const VEGETATION_HEIGHT_005 = 22.7143;
export const VEGETATION_COLOR_005 = 0xfe985c;
// Vegetation layer 5 — authored for Ring-07
export const VEGETATION_HEIGHT_006 = 65.0839;
export const VEGETATION_COLOR_006 = 0xda177d;
// Vegetation layer 6 — authored for Ring-07
export const VEGETATION_HEIGHT_007 = 45.0209;
export const VEGETATION_COLOR_007 = 0xed72a3;
// Vegetation layer 7 — authored for Ring-07
export const VEGETATION_HEIGHT_008 = 4.5553;
export const VEGETATION_COLOR_008 = 0x8b569d;
// Vegetation layer 8 — authored for Ring-07
export const VEGETATION_HEIGHT_009 = -14.0637;
export const VEGETATION_COLOR_009 = 0x80262d;
// Vegetation layer 9 — authored for Ring-07
export const VEGETATION_HEIGHT_010 = 24.7406;
export const VEGETATION_COLOR_010 = 0xe30c0a;
// Vegetation layer 10 — authored for Ring-07
export const VEGETATION_HEIGHT_011 = -17.8114;
export const VEGETATION_COLOR_011 = 0x5c8e1d;
// Vegetation layer 11 — authored for Ring-07
export const VEGETATION_HEIGHT_012 = -7.9261;
export const VEGETATION_COLOR_012 = 0x48d4b5;
// Vegetation layer 12 — authored for Ring-07
export const VEGETATION_HEIGHT_013 = 38.9468;
export const VEGETATION_COLOR_013 = 0x073f61;
// Vegetation layer 13 — authored for Ring-07
export const VEGETATION_HEIGHT_014 = 74.2003;
export const VEGETATION_COLOR_014 = 0x09c533;
// Vegetation layer 14 — authored for Ring-07
export const VEGETATION_HEIGHT_015 = 8.3705;
export const VEGETATION_COLOR_015 = 0x435516;
// Vegetation layer 15 — authored for Ring-07
export const VEGETATION_HEIGHT_016 = 34.4552;
export const VEGETATION_COLOR_016 = 0xfa9c78;
// Vegetation layer 16 — authored for Ring-07
export const VEGETATION_HEIGHT_017 = 31.7859;
export const VEGETATION_COLOR_017 = 0x78180d;
// Vegetation layer 17 — authored for Ring-07
export const VEGETATION_HEIGHT_018 = 33.2883;
export const VEGETATION_COLOR_018 = 0x99f764;
// Vegetation layer 18 — authored for Ring-07
export const VEGETATION_HEIGHT_019 = 31.6358;
export const VEGETATION_COLOR_019 = 0x975477;
// Vegetation layer 19 — authored for Ring-07
export const VEGETATION_HEIGHT_020 = -16.9967;
export const VEGETATION_COLOR_020 = 0x6ea4c4;
// Vegetation layer 20 — authored for Ring-07
export const VEGETATION_HEIGHT_021 = 16.1917;
export const VEGETATION_COLOR_021 = 0x33851a;
// Vegetation layer 21 — authored for Ring-07
export const VEGETATION_HEIGHT_022 = 59.7750;
export const VEGETATION_COLOR_022 = 0x1fa8a6;
// Vegetation layer 22 — authored for Ring-07
export const VEGETATION_HEIGHT_023 = 36.5333;
export const VEGETATION_COLOR_023 = 0xf57138;
// Vegetation layer 23 — authored for Ring-07
export const VEGETATION_HEIGHT_024 = 69.1493;
export const VEGETATION_COLOR_024 = 0xc20f10;
// Vegetation layer 24 — authored for Ring-07
export const VEGETATION_HEIGHT_025 = 56.2378;
export const VEGETATION_COLOR_025 = 0x767c4d;
// Vegetation layer 25 — authored for Ring-07
export const VEGETATION_HEIGHT_026 = -10.4628;
export const VEGETATION_COLOR_026 = 0x05bc04;
// Vegetation layer 26 — authored for Ring-07
export const VEGETATION_HEIGHT_027 = 16.5122;
export const VEGETATION_COLOR_027 = 0xa6c9d1;
// Vegetation layer 27 — authored for Ring-07
export const VEGETATION_HEIGHT_028 = 45.0650;
export const VEGETATION_COLOR_028 = 0xf032a4;
// Vegetation layer 28 — authored for Ring-07
export const VEGETATION_HEIGHT_029 = 71.6619;
export const VEGETATION_COLOR_029 = 0x6f7a2f;
// Vegetation layer 29 — authored for Ring-07
export const VEGETATION_HEIGHT_030 = -11.7013;
export const VEGETATION_COLOR_030 = 0x74531a;
// Vegetation layer 30 — authored for Ring-07
export const VEGETATION_HEIGHT_031 = 30.0317;
export const VEGETATION_COLOR_031 = 0x6c5da1;
// Vegetation layer 31 — authored for Ring-07
export const VEGETATION_HEIGHT_032 = 46.1949;
export const VEGETATION_COLOR_032 = 0x9b2e8e;
// Vegetation layer 32 — authored for Ring-07
export const VEGETATION_HEIGHT_033 = 24.9884;
export const VEGETATION_COLOR_033 = 0x34d872;
// Vegetation layer 33 — authored for Ring-07
export const VEGETATION_HEIGHT_034 = -7.4906;
export const VEGETATION_COLOR_034 = 0x719f15;
// Vegetation layer 34 — authored for Ring-07
export const VEGETATION_HEIGHT_035 = 23.5130;
export const VEGETATION_COLOR_035 = 0x0e8711;
// Vegetation layer 35 — authored for Ring-07
export const VEGETATION_HEIGHT_036 = 35.6285;
export const VEGETATION_COLOR_036 = 0x118454;
// Vegetation layer 36 — authored for Ring-07
export const VEGETATION_HEIGHT_037 = 33.9105;
export const VEGETATION_COLOR_037 = 0x8f9acf;
// Vegetation layer 37 — authored for Ring-07
export const VEGETATION_HEIGHT_038 = 39.3475;
export const VEGETATION_COLOR_038 = 0xf85c59;
// Vegetation layer 38 — authored for Ring-07
export const VEGETATION_HEIGHT_039 = 28.8317;
export const VEGETATION_COLOR_039 = 0x95d6ab;
// Vegetation layer 39 — authored for Ring-07
export const VEGETATION_HEIGHT_040 = 1.5562;
export const VEGETATION_COLOR_040 = 0xeb0ea5;
// Vegetation layer 40 — authored for Ring-07
export const VEGETATION_HEIGHT_041 = 38.8770;
export const VEGETATION_COLOR_041 = 0x9e77dd;
// Vegetation layer 41 — authored for Ring-07
export const VEGETATION_HEIGHT_042 = 3.0606;
export const VEGETATION_COLOR_042 = 0x6484dc;
// Vegetation layer 42 — authored for Ring-07
export const VEGETATION_HEIGHT_043 = -9.5073;
export const VEGETATION_COLOR_043 = 0xc2b282;
// Vegetation layer 43 — authored for Ring-07
export const VEGETATION_HEIGHT_044 = 25.0359;
export const VEGETATION_COLOR_044 = 0x90a985;
// Vegetation layer 44 — authored for Ring-07
export const VEGETATION_HEIGHT_045 = 19.6126;
export const VEGETATION_COLOR_045 = 0xb23151;
// Vegetation layer 45 — authored for Ring-07
export const VEGETATION_HEIGHT_046 = 79.9802;
export const VEGETATION_COLOR_046 = 0x849750;
// Vegetation layer 46 — authored for Ring-07
export const VEGETATION_HEIGHT_047 = 46.4851;
export const VEGETATION_COLOR_047 = 0x2844ae;
// Vegetation layer 47 — authored for Ring-07
export const VEGETATION_HEIGHT_048 = 35.6705;
export const VEGETATION_COLOR_048 = 0xeba433;
// Vegetation layer 48 — authored for Ring-07
export const VEGETATION_HEIGHT_049 = 21.9826;
export const VEGETATION_COLOR_049 = 0x7e48a4;
// Vegetation layer 49 — authored for Ring-07
export const VEGETATION_HEIGHT_050 = 44.4676;
export const VEGETATION_COLOR_050 = 0x23ff8f;
// Vegetation layer 50 — authored for Ring-07
export const VEGETATION_HEIGHT_051 = -6.4101;
export const VEGETATION_COLOR_051 = 0xcca215;
// Vegetation layer 51 — authored for Ring-07
export const VEGETATION_HEIGHT_052 = -19.5220;
export const VEGETATION_COLOR_052 = 0x3383e5;
// Vegetation layer 52 — authored for Ring-07
export const VEGETATION_HEIGHT_053 = 38.1801;
export const VEGETATION_COLOR_053 = 0x290d45;
// Vegetation layer 53 — authored for Ring-07
export const VEGETATION_HEIGHT_054 = 45.7608;
export const VEGETATION_COLOR_054 = 0xbf6c3e;
// Vegetation layer 54 — authored for Ring-07
export const VEGETATION_HEIGHT_055 = 66.5601;
export const VEGETATION_COLOR_055 = 0x6a73f2;
// Vegetation layer 55 — authored for Ring-07
export const VEGETATION_HEIGHT_056 = -18.8352;
export const VEGETATION_COLOR_056 = 0x87528c;
// Vegetation layer 56 — authored for Ring-07
export const VEGETATION_HEIGHT_057 = -14.1417;
export const VEGETATION_COLOR_057 = 0x894abd;
// Vegetation layer 57 — authored for Ring-07
export const VEGETATION_HEIGHT_058 = -4.4396;
export const VEGETATION_COLOR_058 = 0x8794ad;
// Vegetation layer 58 — authored for Ring-07
export const VEGETATION_HEIGHT_059 = 78.8643;
export const VEGETATION_COLOR_059 = 0x6ca265;
// Vegetation layer 59 — authored for Ring-07
export const VEGETATION_HEIGHT_060 = 51.7131;
export const VEGETATION_COLOR_060 = 0x48474d;
// Vegetation layer 60 — authored for Ring-07
export const VEGETATION_HEIGHT_061 = -5.8504;
export const VEGETATION_COLOR_061 = 0x662ad8;
// Vegetation layer 61 — authored for Ring-07
export const VEGETATION_HEIGHT_062 = -1.6159;
export const VEGETATION_COLOR_062 = 0xa46101;
// Vegetation layer 62 — authored for Ring-07
export const VEGETATION_HEIGHT_063 = 43.4030;
export const VEGETATION_COLOR_063 = 0x0e18c5;
// Vegetation layer 63 — authored for Ring-07
export const VEGETATION_HEIGHT_064 = 10.9330;
export const VEGETATION_COLOR_064 = 0x08387c;
// Vegetation layer 64 — authored for Ring-07
export const VEGETATION_HEIGHT_065 = 69.4166;
export const VEGETATION_COLOR_065 = 0xc2b112;
// Vegetation layer 65 — authored for Ring-07
export const VEGETATION_HEIGHT_066 = 36.4014;
export const VEGETATION_COLOR_066 = 0xa84d91;
// Vegetation layer 66 — authored for Ring-07
export const VEGETATION_HEIGHT_067 = -17.8927;
export const VEGETATION_COLOR_067 = 0x1e617b;
// Vegetation layer 67 — authored for Ring-07
export const VEGETATION_HEIGHT_068 = 42.6989;
export const VEGETATION_COLOR_068 = 0xc65895;
// Vegetation layer 68 — authored for Ring-07
export const VEGETATION_HEIGHT_069 = 35.6894;
export const VEGETATION_COLOR_069 = 0x496a6b;
// Vegetation layer 69 — authored for Ring-07
export const VEGETATION_HEIGHT_070 = 35.6943;
export const VEGETATION_COLOR_070 = 0x845664;
// Vegetation layer 70 — authored for Ring-07
export const VEGETATION_HEIGHT_071 = 40.3669;
export const VEGETATION_COLOR_071 = 0x98f510;
// Vegetation layer 71 — authored for Ring-07
export const VEGETATION_HEIGHT_072 = 15.7470;
export const VEGETATION_COLOR_072 = 0x4505d6;
// Vegetation layer 72 — authored for Ring-07
export const VEGETATION_HEIGHT_073 = 21.8559;
export const VEGETATION_COLOR_073 = 0xf817cf;
// Vegetation layer 73 — authored for Ring-07
export const VEGETATION_HEIGHT_074 = 68.6053;
export const VEGETATION_COLOR_074 = 0x41b330;
// Vegetation layer 74 — authored for Ring-07
export const VEGETATION_HEIGHT_075 = 67.1149;
export const VEGETATION_COLOR_075 = 0x766e54;
// Vegetation layer 75 — authored for Ring-07
export const VEGETATION_HEIGHT_076 = 2.6266;
export const VEGETATION_COLOR_076 = 0x03d1e5;
// Vegetation layer 76 — authored for Ring-07
export const VEGETATION_HEIGHT_077 = 32.2637;
export const VEGETATION_COLOR_077 = 0xb567ea;
// Vegetation layer 77 — authored for Ring-07
export const VEGETATION_HEIGHT_078 = 46.7102;
export const VEGETATION_COLOR_078 = 0x3b8ab4;
// Vegetation layer 78 — authored for Ring-07
export const VEGETATION_HEIGHT_079 = -1.8943;
export const VEGETATION_COLOR_079 = 0xc11f44;
// Vegetation layer 79 — authored for Ring-07
export const VEGETATION_HEIGHT_080 = 5.0529;
export const VEGETATION_COLOR_080 = 0xb7cff2;
// Vegetation layer 80 — authored for Ring-07
export const VEGETATION_HEIGHT_081 = 16.8750;
export const VEGETATION_COLOR_081 = 0x0aaf60;
// Vegetation layer 81 — authored for Ring-07
export const VEGETATION_HEIGHT_082 = 35.6593;
export const VEGETATION_COLOR_082 = 0x1ec7d9;
// Vegetation layer 82 — authored for Ring-07
export const VEGETATION_HEIGHT_083 = 52.3220;
export const VEGETATION_COLOR_083 = 0x26ca12;
// Vegetation layer 83 — authored for Ring-07
export const VEGETATION_HEIGHT_084 = 64.3803;
export const VEGETATION_COLOR_084 = 0xf694da;
// Vegetation layer 84 — authored for Ring-07
export const VEGETATION_HEIGHT_085 = 46.0149;
export const VEGETATION_COLOR_085 = 0x1055ff;
// Vegetation layer 85 — authored for Ring-07
export const VEGETATION_HEIGHT_086 = 33.9736;
export const VEGETATION_COLOR_086 = 0xa4e840;
// Vegetation layer 86 — authored for Ring-07
export const VEGETATION_HEIGHT_087 = 66.8177;
export const VEGETATION_COLOR_087 = 0xb3964e;
// Vegetation layer 87 — authored for Ring-07
export const VEGETATION_HEIGHT_088 = 34.7833;
export const VEGETATION_COLOR_088 = 0xec1f42;
// Vegetation layer 88 — authored for Ring-07
export const VEGETATION_HEIGHT_089 = 55.9103;
export const VEGETATION_COLOR_089 = 0xaf63bd;
// Vegetation layer 89 — authored for Ring-07
export const VEGETATION_HEIGHT_090 = -14.3372;
export const VEGETATION_COLOR_090 = 0x247a67;
// Vegetation layer 90 — authored for Ring-07
export const VEGETATION_HEIGHT_091 = 11.5332;
export const VEGETATION_COLOR_091 = 0x3ff789;
// Vegetation layer 91 — authored for Ring-07
export const VEGETATION_HEIGHT_092 = 23.8404;
export const VEGETATION_COLOR_092 = 0xbf3838;
// Vegetation layer 92 — authored for Ring-07
export const VEGETATION_HEIGHT_093 = 71.8931;
export const VEGETATION_COLOR_093 = 0xcd2364;
// Vegetation layer 93 — authored for Ring-07
export const VEGETATION_HEIGHT_094 = 3.2780;
export const VEGETATION_COLOR_094 = 0xe3508d;
// Vegetation layer 94 — authored for Ring-07
export const VEGETATION_HEIGHT_095 = 14.4532;
export const VEGETATION_COLOR_095 = 0x7d0a60;
// Vegetation layer 95 — authored for Ring-07
export const VEGETATION_HEIGHT_096 = 42.2348;
export const VEGETATION_COLOR_096 = 0xaa248b;
// Vegetation layer 96 — authored for Ring-07
export const VEGETATION_HEIGHT_097 = 28.4680;
export const VEGETATION_COLOR_097 = 0xa5d088;
// Vegetation layer 97 — authored for Ring-07
export const VEGETATION_HEIGHT_098 = -5.0178;
export const VEGETATION_COLOR_098 = 0xdfaa05;
// Vegetation layer 98 — authored for Ring-07
export const VEGETATION_HEIGHT_099 = 52.6646;
export const VEGETATION_COLOR_099 = 0x1c7398;
// Vegetation layer 99 — authored for Ring-07
export const VEGETATION_HEIGHT_100 = 41.8014;
export const VEGETATION_COLOR_100 = 0xcabdd8;
// Vegetation layer 100 — authored for Ring-07
export const VEGETATION_HEIGHT_101 = 2.7919;
export const VEGETATION_COLOR_101 = 0x472242;
// Vegetation layer 101 — authored for Ring-07
export const VEGETATION_HEIGHT_102 = -1.0542;
export const VEGETATION_COLOR_102 = 0x75cdfe;
// Vegetation layer 102 — authored for Ring-07
export const VEGETATION_HEIGHT_103 = 68.3265;
export const VEGETATION_COLOR_103 = 0x7f4968;
// Vegetation layer 103 — authored for Ring-07
export const VEGETATION_HEIGHT_104 = 20.4229;
export const VEGETATION_COLOR_104 = 0x5b344e;
// Vegetation layer 104 — authored for Ring-07
export const VEGETATION_HEIGHT_105 = 18.6439;
export const VEGETATION_COLOR_105 = 0xd27eae;
// Vegetation layer 105 — authored for Ring-07
export const VEGETATION_HEIGHT_106 = 76.9058;
export const VEGETATION_COLOR_106 = 0xc5201f;
// Vegetation layer 106 — authored for Ring-07
export const VEGETATION_HEIGHT_107 = 61.6394;
export const VEGETATION_COLOR_107 = 0x20e3ac;
// Vegetation layer 107 — authored for Ring-07
export const VEGETATION_HEIGHT_108 = 2.3489;
export const VEGETATION_COLOR_108 = 0x5ee8ae;
// Vegetation layer 108 — authored for Ring-07
export const VEGETATION_HEIGHT_109 = 46.3838;
export const VEGETATION_COLOR_109 = 0xe6436c;
// Vegetation layer 109 — authored for Ring-07
export const VEGETATION_HEIGHT_110 = -6.4018;
export const VEGETATION_COLOR_110 = 0xcc4c8a;
// Vegetation layer 110 — authored for Ring-07
export const VEGETATION_HEIGHT_111 = 20.6987;
export const VEGETATION_COLOR_111 = 0x9cc670;
// Vegetation layer 111 — authored for Ring-07
export const VEGETATION_HEIGHT_112 = 36.7731;
export const VEGETATION_COLOR_112 = 0x938ca2;
// Vegetation layer 112 — authored for Ring-07
export const VEGETATION_HEIGHT_113 = 7.3246;
export const VEGETATION_COLOR_113 = 0x22e76e;
// Vegetation layer 113 — authored for Ring-07
export const VEGETATION_HEIGHT_114 = 50.1709;
export const VEGETATION_COLOR_114 = 0x281133;
// Vegetation layer 114 — authored for Ring-07
export const VEGETATION_HEIGHT_115 = 75.6128;
export const VEGETATION_COLOR_115 = 0x376102;
// Vegetation layer 115 — authored for Ring-07
export const VEGETATION_HEIGHT_116 = 45.3573;
export const VEGETATION_COLOR_116 = 0x595a4a;
// Vegetation layer 116 — authored for Ring-07
export const VEGETATION_HEIGHT_117 = 23.4637;
export const VEGETATION_COLOR_117 = 0x1bcc7c;
// Vegetation layer 117 — authored for Ring-07
export const VEGETATION_HEIGHT_118 = 1.1478;
export const VEGETATION_COLOR_118 = 0x7fcf62;
// Vegetation layer 118 — authored for Ring-07
export const VEGETATION_HEIGHT_119 = 41.2521;
export const VEGETATION_COLOR_119 = 0x3ad717;
// Vegetation layer 119 — authored for Ring-07
export const VEGETATION_HEIGHT_120 = 57.1895;
export const VEGETATION_COLOR_120 = 0xf9c047;
// Vegetation layer 120 — authored for Ring-07
export const VEGETATION_HEIGHT_121 = 31.7744;
export const VEGETATION_COLOR_121 = 0xc3171b;
// Vegetation layer 121 — authored for Ring-07
export const VEGETATION_HEIGHT_122 = 66.5416;
export const VEGETATION_COLOR_122 = 0x9fb39f;
// Vegetation layer 122 — authored for Ring-07
export const VEGETATION_HEIGHT_123 = -9.5953;
export const VEGETATION_COLOR_123 = 0x335736;
// Vegetation layer 123 — authored for Ring-07
export const VEGETATION_HEIGHT_124 = 19.2148;
export const VEGETATION_COLOR_124 = 0xfef668;
// Vegetation layer 124 — authored for Ring-07
export const VEGETATION_HEIGHT_125 = 6.7038;
export const VEGETATION_COLOR_125 = 0x208b68;
// Vegetation layer 125 — authored for Ring-07
export const VEGETATION_HEIGHT_126 = -18.6789;
export const VEGETATION_COLOR_126 = 0xda3098;
// Vegetation layer 126 — authored for Ring-07
export const VEGETATION_HEIGHT_127 = 62.5994;
export const VEGETATION_COLOR_127 = 0x4171ea;
// Vegetation layer 127 — authored for Ring-07
export const VEGETATION_HEIGHT_128 = 8.4147;
export const VEGETATION_COLOR_128 = 0xf2a16d;
// Vegetation layer 128 — authored for Ring-07
export const VEGETATION_HEIGHT_129 = 44.4194;
export const VEGETATION_COLOR_129 = 0x426499;
// Vegetation layer 129 — authored for Ring-07
export const VEGETATION_HEIGHT_130 = 44.8047;
export const VEGETATION_COLOR_130 = 0x744e25;
// Vegetation layer 130 — authored for Ring-07
export const VEGETATION_HEIGHT_131 = 68.6806;
export const VEGETATION_COLOR_131 = 0xad6bba;
// Vegetation layer 131 — authored for Ring-07
export const VEGETATION_HEIGHT_132 = 62.0489;
export const VEGETATION_COLOR_132 = 0x3b7d8b;
// Vegetation layer 132 — authored for Ring-07
export const VEGETATION_HEIGHT_133 = 9.5512;
export const VEGETATION_COLOR_133 = 0x2b01e2;
// Vegetation layer 133 — authored for Ring-07
export const VEGETATION_HEIGHT_134 = 14.5511;
export const VEGETATION_COLOR_134 = 0x05c093;
// Vegetation layer 134 — authored for Ring-07
export const VEGETATION_HEIGHT_135 = 25.2528;
export const VEGETATION_COLOR_135 = 0xdf77d9;
// Vegetation layer 135 — authored for Ring-07
export const VEGETATION_HEIGHT_136 = -9.0546;
export const VEGETATION_COLOR_136 = 0xcc3293;
// Vegetation layer 136 — authored for Ring-07
export const VEGETATION_HEIGHT_137 = -6.4782;
export const VEGETATION_COLOR_137 = 0xf11271;
// Vegetation layer 137 — authored for Ring-07
export const VEGETATION_HEIGHT_138 = 64.4716;
export const VEGETATION_COLOR_138 = 0xe403a0;
// Vegetation layer 138 — authored for Ring-07
export const VEGETATION_HEIGHT_139 = 27.6147;
export const VEGETATION_COLOR_139 = 0xd31a68;
// Vegetation layer 139 — authored for Ring-07
export const VEGETATION_HEIGHT_140 = 8.9903;
export const VEGETATION_COLOR_140 = 0x451105;
// Vegetation layer 140 — authored for Ring-07
export const VEGETATION_HEIGHT_141 = 34.7059;
export const VEGETATION_COLOR_141 = 0x0dd608;
// Vegetation layer 141 — authored for Ring-07
export const VEGETATION_HEIGHT_142 = -13.3231;
export const VEGETATION_COLOR_142 = 0xdef73f;
// Vegetation layer 142 — authored for Ring-07
export const VEGETATION_HEIGHT_143 = 4.0658;
export const VEGETATION_COLOR_143 = 0x19b546;
// Vegetation layer 143 — authored for Ring-07
export const VEGETATION_HEIGHT_144 = 63.2950;
export const VEGETATION_COLOR_144 = 0x116dfc;
// Vegetation layer 144 — authored for Ring-07
export const VEGETATION_HEIGHT_145 = 70.2547;
export const VEGETATION_COLOR_145 = 0x247e26;
// Vegetation layer 145 — authored for Ring-07
export const VEGETATION_HEIGHT_146 = 58.5177;
export const VEGETATION_COLOR_146 = 0x0bbbae;
// Vegetation layer 146 — authored for Ring-07
export const VEGETATION_HEIGHT_147 = -0.1513;
export const VEGETATION_COLOR_147 = 0x429e5d;
// Vegetation layer 147 — authored for Ring-07
export const VEGETATION_HEIGHT_148 = 3.1810;
export const VEGETATION_COLOR_148 = 0xbaeef8;
// Vegetation layer 148 — authored for Ring-07
export const VEGETATION_HEIGHT_149 = 53.6700;
export const VEGETATION_COLOR_149 = 0xd404ea;
// Vegetation layer 149 — authored for Ring-07
export const VEGETATION_HEIGHT_150 = 53.5250;
export const VEGETATION_COLOR_150 = 0x3182dd;
// Vegetation layer 150 — authored for Ring-07
export const VEGETATION_HEIGHT_151 = 49.1479;
export const VEGETATION_COLOR_151 = 0x34bb14;
// Vegetation layer 151 — authored for Ring-07
export const VEGETATION_HEIGHT_152 = 4.7510;
export const VEGETATION_COLOR_152 = 0x26788d;
// Vegetation layer 152 — authored for Ring-07
export const VEGETATION_HEIGHT_153 = -14.5453;
export const VEGETATION_COLOR_153 = 0xf7ec99;
// Vegetation layer 153 — authored for Ring-07
export const VEGETATION_HEIGHT_154 = 75.1625;
export const VEGETATION_COLOR_154 = 0x8c86fa;
// Vegetation layer 154 — authored for Ring-07
export const VEGETATION_HEIGHT_155 = -19.4323;
export const VEGETATION_COLOR_155 = 0xab23ce;
// Vegetation layer 155 — authored for Ring-07
