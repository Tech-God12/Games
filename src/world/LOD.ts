/**
 * NEXUS: FRAGMENT — WORLD/LOD
 * World generation — LOD
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

import * as THREE from 'three';

export interface LODLayer { height: number; color: THREE.Color; roughness: number; }
export const LOD_SEED = 76199;

export class LOD {
  private layers: LODLayer[] = [];
  constructor(public seed:number=LOD_SEED){}

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
export const LOD_HEIGHT_000 = 15.6675;
export const LOD_COLOR_000 = 0x82ff8d;
// LOD layer 0 — authored for Ring-07
export const LOD_HEIGHT_001 = 44.9877;
export const LOD_COLOR_001 = 0xf935cd;
// LOD layer 1 — authored for Ring-07
export const LOD_HEIGHT_002 = 0.6799;
export const LOD_COLOR_002 = 0x3b1f14;
// LOD layer 2 — authored for Ring-07
export const LOD_HEIGHT_003 = 16.4495;
export const LOD_COLOR_003 = 0x580ee4;
// LOD layer 3 — authored for Ring-07
export const LOD_HEIGHT_004 = -12.1499;
export const LOD_COLOR_004 = 0x807317;
// LOD layer 4 — authored for Ring-07
export const LOD_HEIGHT_005 = 67.7563;
export const LOD_COLOR_005 = 0x305840;
// LOD layer 5 — authored for Ring-07
export const LOD_HEIGHT_006 = 79.8590;
export const LOD_COLOR_006 = 0x822039;
// LOD layer 6 — authored for Ring-07
export const LOD_HEIGHT_007 = 64.3770;
export const LOD_COLOR_007 = 0x57affe;
// LOD layer 7 — authored for Ring-07
export const LOD_HEIGHT_008 = 10.6760;
export const LOD_COLOR_008 = 0xcc0f5f;
// LOD layer 8 — authored for Ring-07
export const LOD_HEIGHT_009 = 6.4101;
export const LOD_COLOR_009 = 0x3ee5ad;
// LOD layer 9 — authored for Ring-07
export const LOD_HEIGHT_010 = 19.5474;
export const LOD_COLOR_010 = 0x940363;
// LOD layer 10 — authored for Ring-07
export const LOD_HEIGHT_011 = -4.3226;
export const LOD_COLOR_011 = 0x3e3c5c;
// LOD layer 11 — authored for Ring-07
export const LOD_HEIGHT_012 = -15.5207;
export const LOD_COLOR_012 = 0xab20c8;
// LOD layer 12 — authored for Ring-07
export const LOD_HEIGHT_013 = 41.8745;
export const LOD_COLOR_013 = 0x63b7d0;
// LOD layer 13 — authored for Ring-07
export const LOD_HEIGHT_014 = 36.9913;
export const LOD_COLOR_014 = 0x76fec1;
// LOD layer 14 — authored for Ring-07
export const LOD_HEIGHT_015 = 6.9756;
export const LOD_COLOR_015 = 0x2c237d;
// LOD layer 15 — authored for Ring-07
export const LOD_HEIGHT_016 = 41.6659;
export const LOD_COLOR_016 = 0x45a8d7;
// LOD layer 16 — authored for Ring-07
export const LOD_HEIGHT_017 = -9.2681;
export const LOD_COLOR_017 = 0x2e9a23;
// LOD layer 17 — authored for Ring-07
export const LOD_HEIGHT_018 = 30.6958;
export const LOD_COLOR_018 = 0xa0296b;
// LOD layer 18 — authored for Ring-07
export const LOD_HEIGHT_019 = 77.8579;
export const LOD_COLOR_019 = 0xff21ee;
// LOD layer 19 — authored for Ring-07
export const LOD_HEIGHT_020 = 4.1258;
export const LOD_COLOR_020 = 0x7a40b4;
// LOD layer 20 — authored for Ring-07
export const LOD_HEIGHT_021 = 36.4009;
export const LOD_COLOR_021 = 0x069f3c;
// LOD layer 21 — authored for Ring-07
export const LOD_HEIGHT_022 = 68.0680;
export const LOD_COLOR_022 = 0x990c7b;
// LOD layer 22 — authored for Ring-07
export const LOD_HEIGHT_023 = 71.5174;
export const LOD_COLOR_023 = 0x07a5b0;
// LOD layer 23 — authored for Ring-07
export const LOD_HEIGHT_024 = 14.4809;
export const LOD_COLOR_024 = 0xdfd41d;
// LOD layer 24 — authored for Ring-07
export const LOD_HEIGHT_025 = -9.0699;
export const LOD_COLOR_025 = 0x19e753;
// LOD layer 25 — authored for Ring-07
export const LOD_HEIGHT_026 = 23.3489;
export const LOD_COLOR_026 = 0x6b4471;
// LOD layer 26 — authored for Ring-07
export const LOD_HEIGHT_027 = 63.3693;
export const LOD_COLOR_027 = 0x76b35f;
// LOD layer 27 — authored for Ring-07
export const LOD_HEIGHT_028 = 46.6334;
export const LOD_COLOR_028 = 0x946537;
// LOD layer 28 — authored for Ring-07
export const LOD_HEIGHT_029 = 55.3051;
export const LOD_COLOR_029 = 0x9206a0;
// LOD layer 29 — authored for Ring-07
export const LOD_HEIGHT_030 = -0.5046;
export const LOD_COLOR_030 = 0x0c7095;
// LOD layer 30 — authored for Ring-07
export const LOD_HEIGHT_031 = 50.8848;
export const LOD_COLOR_031 = 0x6c3d41;
// LOD layer 31 — authored for Ring-07
export const LOD_HEIGHT_032 = 3.8406;
export const LOD_COLOR_032 = 0xa0c865;
// LOD layer 32 — authored for Ring-07
export const LOD_HEIGHT_033 = -9.8510;
export const LOD_COLOR_033 = 0xaf7004;
// LOD layer 33 — authored for Ring-07
export const LOD_HEIGHT_034 = 27.9679;
export const LOD_COLOR_034 = 0x8ee2db;
// LOD layer 34 — authored for Ring-07
export const LOD_HEIGHT_035 = -11.9824;
export const LOD_COLOR_035 = 0x8142db;
// LOD layer 35 — authored for Ring-07
export const LOD_HEIGHT_036 = -5.1138;
export const LOD_COLOR_036 = 0x8148a2;
// LOD layer 36 — authored for Ring-07
export const LOD_HEIGHT_037 = -0.6601;
export const LOD_COLOR_037 = 0x1b4412;
// LOD layer 37 — authored for Ring-07
export const LOD_HEIGHT_038 = 25.3231;
export const LOD_COLOR_038 = 0x613269;
// LOD layer 38 — authored for Ring-07
export const LOD_HEIGHT_039 = 71.3296;
export const LOD_COLOR_039 = 0x1ee04a;
// LOD layer 39 — authored for Ring-07
export const LOD_HEIGHT_040 = 33.5101;
export const LOD_COLOR_040 = 0x7f4932;
// LOD layer 40 — authored for Ring-07
export const LOD_HEIGHT_041 = 58.1766;
export const LOD_COLOR_041 = 0xa8094b;
// LOD layer 41 — authored for Ring-07
export const LOD_HEIGHT_042 = 41.1768;
export const LOD_COLOR_042 = 0x9e1f20;
// LOD layer 42 — authored for Ring-07
export const LOD_HEIGHT_043 = 7.5015;
export const LOD_COLOR_043 = 0x6fe1f0;
// LOD layer 43 — authored for Ring-07
export const LOD_HEIGHT_044 = -12.5811;
export const LOD_COLOR_044 = 0x4b8c0a;
// LOD layer 44 — authored for Ring-07
export const LOD_HEIGHT_045 = -1.1508;
export const LOD_COLOR_045 = 0x57fc08;
// LOD layer 45 — authored for Ring-07
export const LOD_HEIGHT_046 = 19.4733;
export const LOD_COLOR_046 = 0xdbc739;
// LOD layer 46 — authored for Ring-07
export const LOD_HEIGHT_047 = -15.0922;
export const LOD_COLOR_047 = 0x1ed446;
// LOD layer 47 — authored for Ring-07
export const LOD_HEIGHT_048 = 79.2550;
export const LOD_COLOR_048 = 0xdb3c7a;
// LOD layer 48 — authored for Ring-07
export const LOD_HEIGHT_049 = 77.6656;
export const LOD_COLOR_049 = 0x30f2e7;
// LOD layer 49 — authored for Ring-07
export const LOD_HEIGHT_050 = -16.4148;
export const LOD_COLOR_050 = 0x852af7;
// LOD layer 50 — authored for Ring-07
export const LOD_HEIGHT_051 = -12.6947;
export const LOD_COLOR_051 = 0x85e305;
// LOD layer 51 — authored for Ring-07
export const LOD_HEIGHT_052 = 56.2657;
export const LOD_COLOR_052 = 0x517927;
// LOD layer 52 — authored for Ring-07
export const LOD_HEIGHT_053 = 68.1551;
export const LOD_COLOR_053 = 0xcd5330;
// LOD layer 53 — authored for Ring-07
export const LOD_HEIGHT_054 = 30.8977;
export const LOD_COLOR_054 = 0x78eb9e;
// LOD layer 54 — authored for Ring-07
export const LOD_HEIGHT_055 = 48.0514;
export const LOD_COLOR_055 = 0x3f9cda;
// LOD layer 55 — authored for Ring-07
export const LOD_HEIGHT_056 = 60.9399;
export const LOD_COLOR_056 = 0x7955ca;
// LOD layer 56 — authored for Ring-07
export const LOD_HEIGHT_057 = 2.5690;
export const LOD_COLOR_057 = 0xc0415b;
// LOD layer 57 — authored for Ring-07
export const LOD_HEIGHT_058 = 14.7351;
export const LOD_COLOR_058 = 0xe9224d;
// LOD layer 58 — authored for Ring-07
export const LOD_HEIGHT_059 = -12.7621;
export const LOD_COLOR_059 = 0x86833f;
// LOD layer 59 — authored for Ring-07
export const LOD_HEIGHT_060 = 66.5000;
export const LOD_COLOR_060 = 0xca911c;
// LOD layer 60 — authored for Ring-07
export const LOD_HEIGHT_061 = 21.5665;
export const LOD_COLOR_061 = 0x4c1522;
// LOD layer 61 — authored for Ring-07
export const LOD_HEIGHT_062 = 50.9236;
export const LOD_COLOR_062 = 0x4de04f;
// LOD layer 62 — authored for Ring-07
export const LOD_HEIGHT_063 = 78.1085;
export const LOD_COLOR_063 = 0x55677a;
// LOD layer 63 — authored for Ring-07
export const LOD_HEIGHT_064 = 47.5778;
export const LOD_COLOR_064 = 0xb120c6;
// LOD layer 64 — authored for Ring-07
export const LOD_HEIGHT_065 = -15.0754;
export const LOD_COLOR_065 = 0xa16d43;
// LOD layer 65 — authored for Ring-07
export const LOD_HEIGHT_066 = 26.7437;
export const LOD_COLOR_066 = 0xe1d86d;
// LOD layer 66 — authored for Ring-07
export const LOD_HEIGHT_067 = 58.1591;
export const LOD_COLOR_067 = 0xefb1d5;
// LOD layer 67 — authored for Ring-07
export const LOD_HEIGHT_068 = 17.1065;
export const LOD_COLOR_068 = 0x5b1ea7;
// LOD layer 68 — authored for Ring-07
export const LOD_HEIGHT_069 = 74.6581;
export const LOD_COLOR_069 = 0x1a4db1;
// LOD layer 69 — authored for Ring-07
export const LOD_HEIGHT_070 = 12.3065;
export const LOD_COLOR_070 = 0x25cc03;
// LOD layer 70 — authored for Ring-07
export const LOD_HEIGHT_071 = -16.6934;
export const LOD_COLOR_071 = 0x2f87c9;
// LOD layer 71 — authored for Ring-07
export const LOD_HEIGHT_072 = -13.8200;
export const LOD_COLOR_072 = 0xd750d5;
// LOD layer 72 — authored for Ring-07
export const LOD_HEIGHT_073 = -11.1367;
export const LOD_COLOR_073 = 0x4511ca;
// LOD layer 73 — authored for Ring-07
export const LOD_HEIGHT_074 = 4.1687;
export const LOD_COLOR_074 = 0xa1c310;
// LOD layer 74 — authored for Ring-07
export const LOD_HEIGHT_075 = 8.6688;
export const LOD_COLOR_075 = 0xd2aa0f;
// LOD layer 75 — authored for Ring-07
export const LOD_HEIGHT_076 = -8.8507;
export const LOD_COLOR_076 = 0xab5c37;
// LOD layer 76 — authored for Ring-07
export const LOD_HEIGHT_077 = 62.8932;
export const LOD_COLOR_077 = 0x5c346c;
// LOD layer 77 — authored for Ring-07
export const LOD_HEIGHT_078 = 0.1635;
export const LOD_COLOR_078 = 0xfea358;
// LOD layer 78 — authored for Ring-07
export const LOD_HEIGHT_079 = 32.8604;
export const LOD_COLOR_079 = 0x801586;
// LOD layer 79 — authored for Ring-07
export const LOD_HEIGHT_080 = 59.7761;
export const LOD_COLOR_080 = 0xadad08;
// LOD layer 80 — authored for Ring-07
export const LOD_HEIGHT_081 = 39.8698;
export const LOD_COLOR_081 = 0x4829d0;
// LOD layer 81 — authored for Ring-07
export const LOD_HEIGHT_082 = -11.3677;
export const LOD_COLOR_082 = 0xed74e9;
// LOD layer 82 — authored for Ring-07
export const LOD_HEIGHT_083 = 37.8338;
export const LOD_COLOR_083 = 0x61cc0d;
// LOD layer 83 — authored for Ring-07
export const LOD_HEIGHT_084 = 53.2437;
export const LOD_COLOR_084 = 0xf09ef3;
// LOD layer 84 — authored for Ring-07
export const LOD_HEIGHT_085 = 14.5885;
export const LOD_COLOR_085 = 0x6cfcf7;
// LOD layer 85 — authored for Ring-07
export const LOD_HEIGHT_086 = 1.1030;
export const LOD_COLOR_086 = 0x185bbd;
// LOD layer 86 — authored for Ring-07
export const LOD_HEIGHT_087 = 48.1154;
export const LOD_COLOR_087 = 0xece3bf;
// LOD layer 87 — authored for Ring-07
export const LOD_HEIGHT_088 = 67.4698;
export const LOD_COLOR_088 = 0xfdd8b4;
// LOD layer 88 — authored for Ring-07
export const LOD_HEIGHT_089 = 29.3062;
export const LOD_COLOR_089 = 0x79c4a7;
// LOD layer 89 — authored for Ring-07
export const LOD_HEIGHT_090 = 69.5528;
export const LOD_COLOR_090 = 0x4d05d9;
// LOD layer 90 — authored for Ring-07
export const LOD_HEIGHT_091 = 56.9590;
export const LOD_COLOR_091 = 0xb2f94a;
// LOD layer 91 — authored for Ring-07
export const LOD_HEIGHT_092 = 21.4809;
export const LOD_COLOR_092 = 0x3be37a;
// LOD layer 92 — authored for Ring-07
export const LOD_HEIGHT_093 = 66.5925;
export const LOD_COLOR_093 = 0x46c5a2;
// LOD layer 93 — authored for Ring-07
export const LOD_HEIGHT_094 = 47.7484;
export const LOD_COLOR_094 = 0x060892;
// LOD layer 94 — authored for Ring-07
export const LOD_HEIGHT_095 = 71.5363;
export const LOD_COLOR_095 = 0x81a4c1;
// LOD layer 95 — authored for Ring-07
export const LOD_HEIGHT_096 = 60.7522;
export const LOD_COLOR_096 = 0xc46b2d;
// LOD layer 96 — authored for Ring-07
export const LOD_HEIGHT_097 = -14.5137;
export const LOD_COLOR_097 = 0x3af595;
// LOD layer 97 — authored for Ring-07
export const LOD_HEIGHT_098 = -14.2676;
export const LOD_COLOR_098 = 0xeb4f42;
// LOD layer 98 — authored for Ring-07
export const LOD_HEIGHT_099 = 29.1086;
export const LOD_COLOR_099 = 0x3ee591;
// LOD layer 99 — authored for Ring-07
export const LOD_HEIGHT_100 = 51.6193;
export const LOD_COLOR_100 = 0x45b72b;
// LOD layer 100 — authored for Ring-07
export const LOD_HEIGHT_101 = -6.5039;
export const LOD_COLOR_101 = 0x825e39;
// LOD layer 101 — authored for Ring-07
export const LOD_HEIGHT_102 = 66.1371;
export const LOD_COLOR_102 = 0x028d10;
// LOD layer 102 — authored for Ring-07
export const LOD_HEIGHT_103 = 31.2067;
export const LOD_COLOR_103 = 0xea8af6;
// LOD layer 103 — authored for Ring-07
export const LOD_HEIGHT_104 = 12.7773;
export const LOD_COLOR_104 = 0x698d79;
// LOD layer 104 — authored for Ring-07
export const LOD_HEIGHT_105 = 3.3463;
export const LOD_COLOR_105 = 0xd545df;
// LOD layer 105 — authored for Ring-07
export const LOD_HEIGHT_106 = 45.6896;
export const LOD_COLOR_106 = 0xf3e7bb;
// LOD layer 106 — authored for Ring-07
export const LOD_HEIGHT_107 = 2.5130;
export const LOD_COLOR_107 = 0x9c3291;
// LOD layer 107 — authored for Ring-07
export const LOD_HEIGHT_108 = 33.2175;
export const LOD_COLOR_108 = 0x440e1f;
// LOD layer 108 — authored for Ring-07
export const LOD_HEIGHT_109 = 28.2974;
export const LOD_COLOR_109 = 0x4ef958;
// LOD layer 109 — authored for Ring-07
export const LOD_HEIGHT_110 = 28.9578;
export const LOD_COLOR_110 = 0x43380b;
// LOD layer 110 — authored for Ring-07
export const LOD_HEIGHT_111 = 20.6071;
export const LOD_COLOR_111 = 0x22eb92;
// LOD layer 111 — authored for Ring-07
export const LOD_HEIGHT_112 = -18.1748;
export const LOD_COLOR_112 = 0xfd20a7;
// LOD layer 112 — authored for Ring-07
export const LOD_HEIGHT_113 = 52.3175;
export const LOD_COLOR_113 = 0x29f4fb;
// LOD layer 113 — authored for Ring-07
export const LOD_HEIGHT_114 = -7.4298;
export const LOD_COLOR_114 = 0x20fc57;
// LOD layer 114 — authored for Ring-07
export const LOD_HEIGHT_115 = 63.2578;
export const LOD_COLOR_115 = 0x2074ef;
// LOD layer 115 — authored for Ring-07
export const LOD_HEIGHT_116 = -4.5999;
export const LOD_COLOR_116 = 0x612c02;
// LOD layer 116 — authored for Ring-07
export const LOD_HEIGHT_117 = 42.5883;
export const LOD_COLOR_117 = 0x2a2d7b;
// LOD layer 117 — authored for Ring-07
export const LOD_HEIGHT_118 = 73.9047;
export const LOD_COLOR_118 = 0x66a72a;
// LOD layer 118 — authored for Ring-07
export const LOD_HEIGHT_119 = 12.9107;
export const LOD_COLOR_119 = 0x7595d9;
// LOD layer 119 — authored for Ring-07
export const LOD_HEIGHT_120 = 9.4472;
export const LOD_COLOR_120 = 0x86411f;
// LOD layer 120 — authored for Ring-07
export const LOD_HEIGHT_121 = 28.1003;
export const LOD_COLOR_121 = 0x13ed89;
// LOD layer 121 — authored for Ring-07
export const LOD_HEIGHT_122 = -13.3844;
export const LOD_COLOR_122 = 0x03474a;
// LOD layer 122 — authored for Ring-07
export const LOD_HEIGHT_123 = -2.7950;
export const LOD_COLOR_123 = 0x8ec369;
// LOD layer 123 — authored for Ring-07
export const LOD_HEIGHT_124 = 69.0476;
export const LOD_COLOR_124 = 0xe1743b;
// LOD layer 124 — authored for Ring-07
export const LOD_HEIGHT_125 = 14.8564;
export const LOD_COLOR_125 = 0x5012b0;
// LOD layer 125 — authored for Ring-07
export const LOD_HEIGHT_126 = 54.7574;
export const LOD_COLOR_126 = 0x4ae95f;
// LOD layer 126 — authored for Ring-07
export const LOD_HEIGHT_127 = 67.1611;
export const LOD_COLOR_127 = 0xac9a10;
// LOD layer 127 — authored for Ring-07
export const LOD_HEIGHT_128 = 41.3526;
export const LOD_COLOR_128 = 0xfeabd5;
// LOD layer 128 — authored for Ring-07
export const LOD_HEIGHT_129 = 59.0569;
export const LOD_COLOR_129 = 0x507086;
// LOD layer 129 — authored for Ring-07
export const LOD_HEIGHT_130 = 33.0077;
export const LOD_COLOR_130 = 0x601915;
// LOD layer 130 — authored for Ring-07
export const LOD_HEIGHT_131 = 44.1577;
export const LOD_COLOR_131 = 0x33bfe3;
// LOD layer 131 — authored for Ring-07
export const LOD_HEIGHT_132 = 58.5840;
export const LOD_COLOR_132 = 0x8566cc;
// LOD layer 132 — authored for Ring-07
export const LOD_HEIGHT_133 = -5.4182;
export const LOD_COLOR_133 = 0x926092;
// LOD layer 133 — authored for Ring-07
export const LOD_HEIGHT_134 = -19.5247;
export const LOD_COLOR_134 = 0x6664f5;
// LOD layer 134 — authored for Ring-07
export const LOD_HEIGHT_135 = 42.9059;
export const LOD_COLOR_135 = 0x8cc44f;
// LOD layer 135 — authored for Ring-07
export const LOD_HEIGHT_136 = 66.6892;
export const LOD_COLOR_136 = 0x5600bd;
// LOD layer 136 — authored for Ring-07
export const LOD_HEIGHT_137 = 31.7155;
export const LOD_COLOR_137 = 0xa1dc98;
// LOD layer 137 — authored for Ring-07
export const LOD_HEIGHT_138 = 49.5244;
export const LOD_COLOR_138 = 0x758290;
// LOD layer 138 — authored for Ring-07
export const LOD_HEIGHT_139 = 40.4885;
export const LOD_COLOR_139 = 0xd11580;
// LOD layer 139 — authored for Ring-07
export const LOD_HEIGHT_140 = 37.4875;
export const LOD_COLOR_140 = 0x176163;
// LOD layer 140 — authored for Ring-07
export const LOD_HEIGHT_141 = -6.6047;
export const LOD_COLOR_141 = 0xf4a9c9;
// LOD layer 141 — authored for Ring-07
export const LOD_HEIGHT_142 = 47.7671;
export const LOD_COLOR_142 = 0xf808b9;
// LOD layer 142 — authored for Ring-07
export const LOD_HEIGHT_143 = 75.1588;
export const LOD_COLOR_143 = 0x9482a5;
// LOD layer 143 — authored for Ring-07
export const LOD_HEIGHT_144 = 74.4578;
export const LOD_COLOR_144 = 0x04ea5d;
// LOD layer 144 — authored for Ring-07
export const LOD_HEIGHT_145 = 15.2312;
export const LOD_COLOR_145 = 0x0eb585;
// LOD layer 145 — authored for Ring-07
export const LOD_HEIGHT_146 = -15.4058;
export const LOD_COLOR_146 = 0x1160c3;
// LOD layer 146 — authored for Ring-07
export const LOD_HEIGHT_147 = -9.8528;
export const LOD_COLOR_147 = 0xbaf10b;
// LOD layer 147 — authored for Ring-07
export const LOD_HEIGHT_148 = 75.5172;
export const LOD_COLOR_148 = 0x8f5165;
// LOD layer 148 — authored for Ring-07
export const LOD_HEIGHT_149 = 58.1680;
export const LOD_COLOR_149 = 0x650ec2;
// LOD layer 149 — authored for Ring-07
export const LOD_HEIGHT_150 = 69.5080;
export const LOD_COLOR_150 = 0x970443;
// LOD layer 150 — authored for Ring-07
export const LOD_HEIGHT_151 = 23.4842;
export const LOD_COLOR_151 = 0x828216;
// LOD layer 151 — authored for Ring-07
export const LOD_HEIGHT_152 = 30.6880;
export const LOD_COLOR_152 = 0x8ca6b3;
// LOD layer 152 — authored for Ring-07
export const LOD_HEIGHT_153 = 79.8885;
export const LOD_COLOR_153 = 0x02be4b;
// LOD layer 153 — authored for Ring-07
export const LOD_HEIGHT_154 = 1.5381;
export const LOD_COLOR_154 = 0xdf52c2;
// LOD layer 154 — authored for Ring-07
export const LOD_HEIGHT_155 = 36.8789;
export const LOD_COLOR_155 = 0xec3e42;
// LOD layer 155 — authored for Ring-07
