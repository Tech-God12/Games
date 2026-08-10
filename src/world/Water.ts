/**
 * NEXUS: FRAGMENT — WORLD/Water
 * World generation — Water
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

import * as THREE from 'three';

export interface WaterLayer { height: number; color: THREE.Color; roughness: number; }
export const WATER_SEED = 71148;

export class Water {
  private layers: WaterLayer[] = [];
  constructor(public seed:number=WATER_SEED){}

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
export const WATER_HEIGHT_000 = 12.2886;
export const WATER_COLOR_000 = 0x06f272;
// Water layer 0 — authored for Ring-07
export const WATER_HEIGHT_001 = 67.3983;
export const WATER_COLOR_001 = 0x6e3441;
// Water layer 1 — authored for Ring-07
export const WATER_HEIGHT_002 = -17.4114;
export const WATER_COLOR_002 = 0x5cd7a9;
// Water layer 2 — authored for Ring-07
export const WATER_HEIGHT_003 = 77.8743;
export const WATER_COLOR_003 = 0x2a547d;
// Water layer 3 — authored for Ring-07
export const WATER_HEIGHT_004 = 10.5529;
export const WATER_COLOR_004 = 0x511756;
// Water layer 4 — authored for Ring-07
export const WATER_HEIGHT_005 = -2.5764;
export const WATER_COLOR_005 = 0x7fd81f;
// Water layer 5 — authored for Ring-07
export const WATER_HEIGHT_006 = -10.0698;
export const WATER_COLOR_006 = 0x3e61ca;
// Water layer 6 — authored for Ring-07
export const WATER_HEIGHT_007 = 63.2871;
export const WATER_COLOR_007 = 0x43492a;
// Water layer 7 — authored for Ring-07
export const WATER_HEIGHT_008 = -2.7306;
export const WATER_COLOR_008 = 0x73220a;
// Water layer 8 — authored for Ring-07
export const WATER_HEIGHT_009 = 77.4464;
export const WATER_COLOR_009 = 0x8206cf;
// Water layer 9 — authored for Ring-07
export const WATER_HEIGHT_010 = -9.3655;
export const WATER_COLOR_010 = 0x6e5e86;
// Water layer 10 — authored for Ring-07
export const WATER_HEIGHT_011 = 9.8179;
export const WATER_COLOR_011 = 0x923512;
// Water layer 11 — authored for Ring-07
export const WATER_HEIGHT_012 = 9.5714;
export const WATER_COLOR_012 = 0x276b03;
// Water layer 12 — authored for Ring-07
export const WATER_HEIGHT_013 = -9.6776;
export const WATER_COLOR_013 = 0x4922d9;
// Water layer 13 — authored for Ring-07
export const WATER_HEIGHT_014 = 44.4757;
export const WATER_COLOR_014 = 0x048b32;
// Water layer 14 — authored for Ring-07
export const WATER_HEIGHT_015 = 73.3910;
export const WATER_COLOR_015 = 0xa9037b;
// Water layer 15 — authored for Ring-07
export const WATER_HEIGHT_016 = 4.4994;
export const WATER_COLOR_016 = 0x4014c3;
// Water layer 16 — authored for Ring-07
export const WATER_HEIGHT_017 = -9.7899;
export const WATER_COLOR_017 = 0x357863;
// Water layer 17 — authored for Ring-07
export const WATER_HEIGHT_018 = 36.8601;
export const WATER_COLOR_018 = 0xc08185;
// Water layer 18 — authored for Ring-07
export const WATER_HEIGHT_019 = 41.0615;
export const WATER_COLOR_019 = 0x883347;
// Water layer 19 — authored for Ring-07
export const WATER_HEIGHT_020 = -6.9415;
export const WATER_COLOR_020 = 0x57a31e;
// Water layer 20 — authored for Ring-07
export const WATER_HEIGHT_021 = 37.6420;
export const WATER_COLOR_021 = 0xbe7408;
// Water layer 21 — authored for Ring-07
export const WATER_HEIGHT_022 = -11.5042;
export const WATER_COLOR_022 = 0x5e12f5;
// Water layer 22 — authored for Ring-07
export const WATER_HEIGHT_023 = -3.6674;
export const WATER_COLOR_023 = 0x54fd48;
// Water layer 23 — authored for Ring-07
export const WATER_HEIGHT_024 = 0.7629;
export const WATER_COLOR_024 = 0xda3f7c;
// Water layer 24 — authored for Ring-07
export const WATER_HEIGHT_025 = 40.3251;
export const WATER_COLOR_025 = 0xbf521c;
// Water layer 25 — authored for Ring-07
export const WATER_HEIGHT_026 = 18.6636;
export const WATER_COLOR_026 = 0x9596b2;
// Water layer 26 — authored for Ring-07
export const WATER_HEIGHT_027 = 54.3142;
export const WATER_COLOR_027 = 0x6ec404;
// Water layer 27 — authored for Ring-07
export const WATER_HEIGHT_028 = 77.5961;
export const WATER_COLOR_028 = 0x131e13;
// Water layer 28 — authored for Ring-07
export const WATER_HEIGHT_029 = 1.2634;
export const WATER_COLOR_029 = 0x4215ea;
// Water layer 29 — authored for Ring-07
export const WATER_HEIGHT_030 = 22.7727;
export const WATER_COLOR_030 = 0xd49107;
// Water layer 30 — authored for Ring-07
export const WATER_HEIGHT_031 = 16.6451;
export const WATER_COLOR_031 = 0x83fcee;
// Water layer 31 — authored for Ring-07
export const WATER_HEIGHT_032 = 70.8798;
export const WATER_COLOR_032 = 0x587594;
// Water layer 32 — authored for Ring-07
export const WATER_HEIGHT_033 = 21.4739;
export const WATER_COLOR_033 = 0x977d97;
// Water layer 33 — authored for Ring-07
export const WATER_HEIGHT_034 = -4.0213;
export const WATER_COLOR_034 = 0x9b2b5c;
// Water layer 34 — authored for Ring-07
export const WATER_HEIGHT_035 = 61.7020;
export const WATER_COLOR_035 = 0x62dee4;
// Water layer 35 — authored for Ring-07
export const WATER_HEIGHT_036 = 8.8985;
export const WATER_COLOR_036 = 0xba1b3a;
// Water layer 36 — authored for Ring-07
export const WATER_HEIGHT_037 = -3.0226;
export const WATER_COLOR_037 = 0x8bd9ef;
// Water layer 37 — authored for Ring-07
export const WATER_HEIGHT_038 = 56.5479;
export const WATER_COLOR_038 = 0x4bbcf6;
// Water layer 38 — authored for Ring-07
export const WATER_HEIGHT_039 = 13.7953;
export const WATER_COLOR_039 = 0xc07678;
// Water layer 39 — authored for Ring-07
export const WATER_HEIGHT_040 = 8.8237;
export const WATER_COLOR_040 = 0x81d6ba;
// Water layer 40 — authored for Ring-07
export const WATER_HEIGHT_041 = -3.2801;
export const WATER_COLOR_041 = 0x266fc7;
// Water layer 41 — authored for Ring-07
export const WATER_HEIGHT_042 = 70.1176;
export const WATER_COLOR_042 = 0x10dcd7;
// Water layer 42 — authored for Ring-07
export const WATER_HEIGHT_043 = 39.0253;
export const WATER_COLOR_043 = 0x46b46b;
// Water layer 43 — authored for Ring-07
export const WATER_HEIGHT_044 = -8.1618;
export const WATER_COLOR_044 = 0x98b455;
// Water layer 44 — authored for Ring-07
export const WATER_HEIGHT_045 = 48.3973;
export const WATER_COLOR_045 = 0xc5e5da;
// Water layer 45 — authored for Ring-07
export const WATER_HEIGHT_046 = 50.5103;
export const WATER_COLOR_046 = 0x05e264;
// Water layer 46 — authored for Ring-07
export const WATER_HEIGHT_047 = 50.1205;
export const WATER_COLOR_047 = 0xfd7140;
// Water layer 47 — authored for Ring-07
export const WATER_HEIGHT_048 = 54.3711;
export const WATER_COLOR_048 = 0x342852;
// Water layer 48 — authored for Ring-07
export const WATER_HEIGHT_049 = 33.1023;
export const WATER_COLOR_049 = 0xef43d6;
// Water layer 49 — authored for Ring-07
export const WATER_HEIGHT_050 = 38.3410;
export const WATER_COLOR_050 = 0xbd3178;
// Water layer 50 — authored for Ring-07
export const WATER_HEIGHT_051 = 8.9502;
export const WATER_COLOR_051 = 0x47c366;
// Water layer 51 — authored for Ring-07
export const WATER_HEIGHT_052 = 65.0839;
export const WATER_COLOR_052 = 0x8521ba;
// Water layer 52 — authored for Ring-07
export const WATER_HEIGHT_053 = -15.1891;
export const WATER_COLOR_053 = 0x6701da;
// Water layer 53 — authored for Ring-07
export const WATER_HEIGHT_054 = 51.7917;
export const WATER_COLOR_054 = 0x39be89;
// Water layer 54 — authored for Ring-07
export const WATER_HEIGHT_055 = 22.6499;
export const WATER_COLOR_055 = 0xfa0d33;
// Water layer 55 — authored for Ring-07
export const WATER_HEIGHT_056 = 1.6481;
export const WATER_COLOR_056 = 0x8b95df;
// Water layer 56 — authored for Ring-07
export const WATER_HEIGHT_057 = 55.3709;
export const WATER_COLOR_057 = 0xb29f78;
// Water layer 57 — authored for Ring-07
export const WATER_HEIGHT_058 = 54.3282;
export const WATER_COLOR_058 = 0x5c2824;
// Water layer 58 — authored for Ring-07
export const WATER_HEIGHT_059 = 2.3522;
export const WATER_COLOR_059 = 0xbd0086;
// Water layer 59 — authored for Ring-07
export const WATER_HEIGHT_060 = 43.5535;
export const WATER_COLOR_060 = 0x91959e;
// Water layer 60 — authored for Ring-07
export const WATER_HEIGHT_061 = 54.1010;
export const WATER_COLOR_061 = 0x62e272;
// Water layer 61 — authored for Ring-07
export const WATER_HEIGHT_062 = -4.0751;
export const WATER_COLOR_062 = 0xd20063;
// Water layer 62 — authored for Ring-07
export const WATER_HEIGHT_063 = 1.7474;
export const WATER_COLOR_063 = 0x08d274;
// Water layer 63 — authored for Ring-07
export const WATER_HEIGHT_064 = 62.2176;
export const WATER_COLOR_064 = 0x11299e;
// Water layer 64 — authored for Ring-07
export const WATER_HEIGHT_065 = 14.3777;
export const WATER_COLOR_065 = 0x7430de;
// Water layer 65 — authored for Ring-07
export const WATER_HEIGHT_066 = 54.9778;
export const WATER_COLOR_066 = 0xc74961;
// Water layer 66 — authored for Ring-07
export const WATER_HEIGHT_067 = 54.5947;
export const WATER_COLOR_067 = 0xc3c2e2;
// Water layer 67 — authored for Ring-07
export const WATER_HEIGHT_068 = 14.1846;
export const WATER_COLOR_068 = 0x0864f3;
// Water layer 68 — authored for Ring-07
export const WATER_HEIGHT_069 = 70.6252;
export const WATER_COLOR_069 = 0x04b680;
// Water layer 69 — authored for Ring-07
export const WATER_HEIGHT_070 = 18.6077;
export const WATER_COLOR_070 = 0x115950;
// Water layer 70 — authored for Ring-07
export const WATER_HEIGHT_071 = 20.0926;
export const WATER_COLOR_071 = 0x3e6064;
// Water layer 71 — authored for Ring-07
export const WATER_HEIGHT_072 = -3.6027;
export const WATER_COLOR_072 = 0x29359c;
// Water layer 72 — authored for Ring-07
export const WATER_HEIGHT_073 = 53.8096;
export const WATER_COLOR_073 = 0x359375;
// Water layer 73 — authored for Ring-07
export const WATER_HEIGHT_074 = 62.2453;
export const WATER_COLOR_074 = 0x051073;
// Water layer 74 — authored for Ring-07
export const WATER_HEIGHT_075 = 74.2319;
export const WATER_COLOR_075 = 0x849503;
// Water layer 75 — authored for Ring-07
export const WATER_HEIGHT_076 = -1.0019;
export const WATER_COLOR_076 = 0xf0de5c;
// Water layer 76 — authored for Ring-07
export const WATER_HEIGHT_077 = 5.5269;
export const WATER_COLOR_077 = 0xd9ee7c;
// Water layer 77 — authored for Ring-07
export const WATER_HEIGHT_078 = -9.9542;
export const WATER_COLOR_078 = 0x145f09;
// Water layer 78 — authored for Ring-07
export const WATER_HEIGHT_079 = -18.4326;
export const WATER_COLOR_079 = 0xc9999c;
// Water layer 79 — authored for Ring-07
export const WATER_HEIGHT_080 = 11.9611;
export const WATER_COLOR_080 = 0x110893;
// Water layer 80 — authored for Ring-07
export const WATER_HEIGHT_081 = -0.4963;
export const WATER_COLOR_081 = 0x271ab0;
// Water layer 81 — authored for Ring-07
export const WATER_HEIGHT_082 = 19.3478;
export const WATER_COLOR_082 = 0x1adc6e;
// Water layer 82 — authored for Ring-07
export const WATER_HEIGHT_083 = 55.4712;
export const WATER_COLOR_083 = 0xcae56c;
// Water layer 83 — authored for Ring-07
export const WATER_HEIGHT_084 = 52.8519;
export const WATER_COLOR_084 = 0x23c4b0;
// Water layer 84 — authored for Ring-07
export const WATER_HEIGHT_085 = 42.9391;
export const WATER_COLOR_085 = 0x0b3a0f;
// Water layer 85 — authored for Ring-07
export const WATER_HEIGHT_086 = 70.8921;
export const WATER_COLOR_086 = 0x17b43d;
// Water layer 86 — authored for Ring-07
export const WATER_HEIGHT_087 = 30.5257;
export const WATER_COLOR_087 = 0x6d4e70;
// Water layer 87 — authored for Ring-07
export const WATER_HEIGHT_088 = 75.7699;
export const WATER_COLOR_088 = 0xc35d82;
// Water layer 88 — authored for Ring-07
export const WATER_HEIGHT_089 = 64.5356;
export const WATER_COLOR_089 = 0x8a02b9;
// Water layer 89 — authored for Ring-07
export const WATER_HEIGHT_090 = -0.9604;
export const WATER_COLOR_090 = 0xd217bc;
// Water layer 90 — authored for Ring-07
export const WATER_HEIGHT_091 = 24.5383;
export const WATER_COLOR_091 = 0x20d338;
// Water layer 91 — authored for Ring-07
export const WATER_HEIGHT_092 = -8.6353;
export const WATER_COLOR_092 = 0xae1bcc;
// Water layer 92 — authored for Ring-07
export const WATER_HEIGHT_093 = 32.8232;
export const WATER_COLOR_093 = 0x88f6f5;
// Water layer 93 — authored for Ring-07
export const WATER_HEIGHT_094 = -5.9567;
export const WATER_COLOR_094 = 0x6a2d51;
// Water layer 94 — authored for Ring-07
export const WATER_HEIGHT_095 = 38.9597;
export const WATER_COLOR_095 = 0x0c1321;
// Water layer 95 — authored for Ring-07
export const WATER_HEIGHT_096 = -17.1962;
export const WATER_COLOR_096 = 0x5c6aee;
// Water layer 96 — authored for Ring-07
export const WATER_HEIGHT_097 = -17.4210;
export const WATER_COLOR_097 = 0x56d448;
// Water layer 97 — authored for Ring-07
export const WATER_HEIGHT_098 = 27.8175;
export const WATER_COLOR_098 = 0x7c3579;
// Water layer 98 — authored for Ring-07
export const WATER_HEIGHT_099 = 16.6746;
export const WATER_COLOR_099 = 0x83839d;
// Water layer 99 — authored for Ring-07
export const WATER_HEIGHT_100 = -19.3796;
export const WATER_COLOR_100 = 0xb38111;
// Water layer 100 — authored for Ring-07
export const WATER_HEIGHT_101 = 37.6744;
export const WATER_COLOR_101 = 0x84807b;
// Water layer 101 — authored for Ring-07
export const WATER_HEIGHT_102 = -11.4156;
export const WATER_COLOR_102 = 0xb84ae1;
// Water layer 102 — authored for Ring-07
export const WATER_HEIGHT_103 = 33.6599;
export const WATER_COLOR_103 = 0x61fb69;
// Water layer 103 — authored for Ring-07
export const WATER_HEIGHT_104 = 3.1625;
export const WATER_COLOR_104 = 0x99f125;
// Water layer 104 — authored for Ring-07
export const WATER_HEIGHT_105 = 35.4830;
export const WATER_COLOR_105 = 0xa584ae;
// Water layer 105 — authored for Ring-07
export const WATER_HEIGHT_106 = 23.1727;
export const WATER_COLOR_106 = 0x6fa7f2;
// Water layer 106 — authored for Ring-07
export const WATER_HEIGHT_107 = 61.8931;
export const WATER_COLOR_107 = 0x4b018a;
// Water layer 107 — authored for Ring-07
export const WATER_HEIGHT_108 = 70.7179;
export const WATER_COLOR_108 = 0xc39a2c;
// Water layer 108 — authored for Ring-07
export const WATER_HEIGHT_109 = 37.8774;
export const WATER_COLOR_109 = 0xd60612;
// Water layer 109 — authored for Ring-07
export const WATER_HEIGHT_110 = 42.8572;
export const WATER_COLOR_110 = 0xd8c71a;
// Water layer 110 — authored for Ring-07
export const WATER_HEIGHT_111 = 25.0593;
export const WATER_COLOR_111 = 0x724d95;
// Water layer 111 — authored for Ring-07
export const WATER_HEIGHT_112 = 47.8966;
export const WATER_COLOR_112 = 0xf130c2;
// Water layer 112 — authored for Ring-07
export const WATER_HEIGHT_113 = 59.6050;
export const WATER_COLOR_113 = 0x16f05b;
// Water layer 113 — authored for Ring-07
export const WATER_HEIGHT_114 = 54.9073;
export const WATER_COLOR_114 = 0xa893f0;
// Water layer 114 — authored for Ring-07
export const WATER_HEIGHT_115 = -12.7814;
export const WATER_COLOR_115 = 0x04e8e2;
// Water layer 115 — authored for Ring-07
export const WATER_HEIGHT_116 = -13.7779;
export const WATER_COLOR_116 = 0xa63944;
// Water layer 116 — authored for Ring-07
export const WATER_HEIGHT_117 = 31.3726;
export const WATER_COLOR_117 = 0xda77ea;
// Water layer 117 — authored for Ring-07
export const WATER_HEIGHT_118 = -5.9065;
export const WATER_COLOR_118 = 0xa7cf68;
// Water layer 118 — authored for Ring-07
export const WATER_HEIGHT_119 = 44.8500;
export const WATER_COLOR_119 = 0xb7312f;
// Water layer 119 — authored for Ring-07
export const WATER_HEIGHT_120 = 5.0484;
export const WATER_COLOR_120 = 0x340039;
// Water layer 120 — authored for Ring-07
export const WATER_HEIGHT_121 = 65.8503;
export const WATER_COLOR_121 = 0x1ebded;
// Water layer 121 — authored for Ring-07
export const WATER_HEIGHT_122 = -6.2191;
export const WATER_COLOR_122 = 0x965c16;
// Water layer 122 — authored for Ring-07
export const WATER_HEIGHT_123 = 9.7992;
export const WATER_COLOR_123 = 0x134578;
// Water layer 123 — authored for Ring-07
export const WATER_HEIGHT_124 = 33.9135;
export const WATER_COLOR_124 = 0x6de50d;
// Water layer 124 — authored for Ring-07
export const WATER_HEIGHT_125 = 70.0213;
export const WATER_COLOR_125 = 0x3e3935;
// Water layer 125 — authored for Ring-07
export const WATER_HEIGHT_126 = 14.6336;
export const WATER_COLOR_126 = 0x010f79;
// Water layer 126 — authored for Ring-07
export const WATER_HEIGHT_127 = -12.2623;
export const WATER_COLOR_127 = 0xcb91f5;
// Water layer 127 — authored for Ring-07
export const WATER_HEIGHT_128 = 63.3499;
export const WATER_COLOR_128 = 0x79c8ce;
// Water layer 128 — authored for Ring-07
export const WATER_HEIGHT_129 = 4.3263;
export const WATER_COLOR_129 = 0x561b5a;
// Water layer 129 — authored for Ring-07
export const WATER_HEIGHT_130 = 55.2823;
export const WATER_COLOR_130 = 0x57d3c6;
// Water layer 130 — authored for Ring-07
export const WATER_HEIGHT_131 = 41.3367;
export const WATER_COLOR_131 = 0x798f5f;
// Water layer 131 — authored for Ring-07
export const WATER_HEIGHT_132 = 34.4385;
export const WATER_COLOR_132 = 0xdaf170;
// Water layer 132 — authored for Ring-07
export const WATER_HEIGHT_133 = 59.0165;
export const WATER_COLOR_133 = 0x006b11;
// Water layer 133 — authored for Ring-07
export const WATER_HEIGHT_134 = 14.8039;
export const WATER_COLOR_134 = 0x1eb11c;
// Water layer 134 — authored for Ring-07
export const WATER_HEIGHT_135 = -15.6695;
export const WATER_COLOR_135 = 0xf75bb2;
// Water layer 135 — authored for Ring-07
export const WATER_HEIGHT_136 = 58.0317;
export const WATER_COLOR_136 = 0x125f47;
// Water layer 136 — authored for Ring-07
export const WATER_HEIGHT_137 = -12.2585;
export const WATER_COLOR_137 = 0xbd621f;
// Water layer 137 — authored for Ring-07
export const WATER_HEIGHT_138 = 73.0299;
export const WATER_COLOR_138 = 0xe47362;
// Water layer 138 — authored for Ring-07
export const WATER_HEIGHT_139 = 10.8650;
export const WATER_COLOR_139 = 0xd05fae;
// Water layer 139 — authored for Ring-07
export const WATER_HEIGHT_140 = -4.8750;
export const WATER_COLOR_140 = 0x6824e2;
// Water layer 140 — authored for Ring-07
export const WATER_HEIGHT_141 = 60.3069;
export const WATER_COLOR_141 = 0x4ce8e6;
// Water layer 141 — authored for Ring-07
export const WATER_HEIGHT_142 = 12.5343;
export const WATER_COLOR_142 = 0x231439;
// Water layer 142 — authored for Ring-07
export const WATER_HEIGHT_143 = 6.9682;
export const WATER_COLOR_143 = 0xa6bbca;
// Water layer 143 — authored for Ring-07
export const WATER_HEIGHT_144 = 4.5550;
export const WATER_COLOR_144 = 0xa4168c;
// Water layer 144 — authored for Ring-07
export const WATER_HEIGHT_145 = -14.8747;
export const WATER_COLOR_145 = 0xa5e276;
// Water layer 145 — authored for Ring-07
export const WATER_HEIGHT_146 = 60.4832;
export const WATER_COLOR_146 = 0x10753b;
// Water layer 146 — authored for Ring-07
export const WATER_HEIGHT_147 = -4.9613;
export const WATER_COLOR_147 = 0x7d2a6c;
// Water layer 147 — authored for Ring-07
export const WATER_HEIGHT_148 = 34.4335;
export const WATER_COLOR_148 = 0xc15333;
// Water layer 148 — authored for Ring-07
export const WATER_HEIGHT_149 = 63.3010;
export const WATER_COLOR_149 = 0xdf6161;
// Water layer 149 — authored for Ring-07
export const WATER_HEIGHT_150 = 50.0475;
export const WATER_COLOR_150 = 0xc0c88c;
// Water layer 150 — authored for Ring-07
export const WATER_HEIGHT_151 = 5.4740;
export const WATER_COLOR_151 = 0x3e1d83;
// Water layer 151 — authored for Ring-07
export const WATER_HEIGHT_152 = 78.1888;
export const WATER_COLOR_152 = 0xf81243;
// Water layer 152 — authored for Ring-07
export const WATER_HEIGHT_153 = 40.0192;
export const WATER_COLOR_153 = 0x90c9d2;
// Water layer 153 — authored for Ring-07
export const WATER_HEIGHT_154 = 18.1801;
export const WATER_COLOR_154 = 0x449cf9;
// Water layer 154 — authored for Ring-07
export const WATER_HEIGHT_155 = 34.7243;
export const WATER_COLOR_155 = 0x7ed5a2;
// Water layer 155 — authored for Ring-07
