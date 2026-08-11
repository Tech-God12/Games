/**
 * NEXUS: FRAGMENT — WORLD/POIManager
 * World generation — POIManager
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

import * as THREE from 'three';

export interface POIManagerLayer { height: number; color: THREE.Color; roughness: number; }
export const POIMANAGER_SEED = 63035;

export class POIManager {
  private layers: POIManagerLayer[] = [];
  constructor(public seed:number=POIMANAGER_SEED){}

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
export const POIMANAGER_HEIGHT_000 = 45.1394;
export const POIMANAGER_COLOR_000 = 0x0107e5;
// POIManager layer 0 — authored for Ring-07
export const POIMANAGER_HEIGHT_001 = 6.0525;
export const POIMANAGER_COLOR_001 = 0xc7db6d;
// POIManager layer 1 — authored for Ring-07
export const POIMANAGER_HEIGHT_002 = -6.8097;
export const POIMANAGER_COLOR_002 = 0xfb7ffe;
// POIManager layer 2 — authored for Ring-07
export const POIMANAGER_HEIGHT_003 = 47.6814;
export const POIMANAGER_COLOR_003 = 0x2fd84e;
// POIManager layer 3 — authored for Ring-07
export const POIMANAGER_HEIGHT_004 = 5.3949;
export const POIMANAGER_COLOR_004 = 0x84f7e3;
// POIManager layer 4 — authored for Ring-07
export const POIMANAGER_HEIGHT_005 = 7.7516;
export const POIMANAGER_COLOR_005 = 0xbb94b6;
// POIManager layer 5 — authored for Ring-07
export const POIMANAGER_HEIGHT_006 = -5.2701;
export const POIMANAGER_COLOR_006 = 0x0a5d18;
// POIManager layer 6 — authored for Ring-07
export const POIMANAGER_HEIGHT_007 = -8.1725;
export const POIMANAGER_COLOR_007 = 0x274622;
// POIManager layer 7 — authored for Ring-07
export const POIMANAGER_HEIGHT_008 = -10.1025;
export const POIMANAGER_COLOR_008 = 0x0d48b9;
// POIManager layer 8 — authored for Ring-07
export const POIMANAGER_HEIGHT_009 = 69.9136;
export const POIMANAGER_COLOR_009 = 0x8d9d5c;
// POIManager layer 9 — authored for Ring-07
export const POIMANAGER_HEIGHT_010 = 37.9834;
export const POIMANAGER_COLOR_010 = 0xb67d52;
// POIManager layer 10 — authored for Ring-07
export const POIMANAGER_HEIGHT_011 = 6.2526;
export const POIMANAGER_COLOR_011 = 0x0f03d5;
// POIManager layer 11 — authored for Ring-07
export const POIMANAGER_HEIGHT_012 = 55.5717;
export const POIMANAGER_COLOR_012 = 0xe325ea;
// POIManager layer 12 — authored for Ring-07
export const POIMANAGER_HEIGHT_013 = 5.6735;
export const POIMANAGER_COLOR_013 = 0x8d5ad5;
// POIManager layer 13 — authored for Ring-07
export const POIMANAGER_HEIGHT_014 = 7.7376;
export const POIMANAGER_COLOR_014 = 0x102834;
// POIManager layer 14 — authored for Ring-07
export const POIMANAGER_HEIGHT_015 = 58.5090;
export const POIMANAGER_COLOR_015 = 0x638bf8;
// POIManager layer 15 — authored for Ring-07
export const POIMANAGER_HEIGHT_016 = -8.8482;
export const POIMANAGER_COLOR_016 = 0x7f15f5;
// POIManager layer 16 — authored for Ring-07
export const POIMANAGER_HEIGHT_017 = -19.7692;
export const POIMANAGER_COLOR_017 = 0x51ad5c;
// POIManager layer 17 — authored for Ring-07
export const POIMANAGER_HEIGHT_018 = -2.7098;
export const POIMANAGER_COLOR_018 = 0x1fa9b2;
// POIManager layer 18 — authored for Ring-07
export const POIMANAGER_HEIGHT_019 = 15.9065;
export const POIMANAGER_COLOR_019 = 0xe74d1d;
// POIManager layer 19 — authored for Ring-07
export const POIMANAGER_HEIGHT_020 = 27.8030;
export const POIMANAGER_COLOR_020 = 0x74d855;
// POIManager layer 20 — authored for Ring-07
export const POIMANAGER_HEIGHT_021 = 72.5604;
export const POIMANAGER_COLOR_021 = 0x87734f;
// POIManager layer 21 — authored for Ring-07
export const POIMANAGER_HEIGHT_022 = -12.7714;
export const POIMANAGER_COLOR_022 = 0x97365a;
// POIManager layer 22 — authored for Ring-07
export const POIMANAGER_HEIGHT_023 = 33.2109;
export const POIMANAGER_COLOR_023 = 0x582f73;
// POIManager layer 23 — authored for Ring-07
export const POIMANAGER_HEIGHT_024 = -2.4696;
export const POIMANAGER_COLOR_024 = 0xb669cb;
// POIManager layer 24 — authored for Ring-07
export const POIMANAGER_HEIGHT_025 = 79.6235;
export const POIMANAGER_COLOR_025 = 0x9935f3;
// POIManager layer 25 — authored for Ring-07
export const POIMANAGER_HEIGHT_026 = -11.0389;
export const POIMANAGER_COLOR_026 = 0xc84d08;
// POIManager layer 26 — authored for Ring-07
export const POIMANAGER_HEIGHT_027 = 67.2973;
export const POIMANAGER_COLOR_027 = 0xdaa605;
// POIManager layer 27 — authored for Ring-07
export const POIMANAGER_HEIGHT_028 = 67.2585;
export const POIMANAGER_COLOR_028 = 0x78141b;
// POIManager layer 28 — authored for Ring-07
export const POIMANAGER_HEIGHT_029 = 22.1754;
export const POIMANAGER_COLOR_029 = 0xc272b8;
// POIManager layer 29 — authored for Ring-07
export const POIMANAGER_HEIGHT_030 = 44.1099;
export const POIMANAGER_COLOR_030 = 0xd72c35;
// POIManager layer 30 — authored for Ring-07
export const POIMANAGER_HEIGHT_031 = -11.7441;
export const POIMANAGER_COLOR_031 = 0x82f8c6;
// POIManager layer 31 — authored for Ring-07
export const POIMANAGER_HEIGHT_032 = 71.5119;
export const POIMANAGER_COLOR_032 = 0xb78252;
// POIManager layer 32 — authored for Ring-07
export const POIMANAGER_HEIGHT_033 = 30.7933;
export const POIMANAGER_COLOR_033 = 0xb15dfb;
// POIManager layer 33 — authored for Ring-07
export const POIMANAGER_HEIGHT_034 = 59.3444;
export const POIMANAGER_COLOR_034 = 0x711461;
// POIManager layer 34 — authored for Ring-07
export const POIMANAGER_HEIGHT_035 = 73.4707;
export const POIMANAGER_COLOR_035 = 0xe020bf;
// POIManager layer 35 — authored for Ring-07
export const POIMANAGER_HEIGHT_036 = 1.4499;
export const POIMANAGER_COLOR_036 = 0xe5af34;
// POIManager layer 36 — authored for Ring-07
export const POIMANAGER_HEIGHT_037 = 2.6250;
export const POIMANAGER_COLOR_037 = 0x578749;
// POIManager layer 37 — authored for Ring-07
export const POIMANAGER_HEIGHT_038 = 72.1819;
export const POIMANAGER_COLOR_038 = 0x86264e;
// POIManager layer 38 — authored for Ring-07
export const POIMANAGER_HEIGHT_039 = 49.0402;
export const POIMANAGER_COLOR_039 = 0xf6d48b;
// POIManager layer 39 — authored for Ring-07
export const POIMANAGER_HEIGHT_040 = -19.5721;
export const POIMANAGER_COLOR_040 = 0x6d6a88;
// POIManager layer 40 — authored for Ring-07
export const POIMANAGER_HEIGHT_041 = 8.6498;
export const POIMANAGER_COLOR_041 = 0xa310ae;
// POIManager layer 41 — authored for Ring-07
export const POIMANAGER_HEIGHT_042 = -3.9253;
export const POIMANAGER_COLOR_042 = 0x6dee0e;
// POIManager layer 42 — authored for Ring-07
export const POIMANAGER_HEIGHT_043 = 12.9605;
export const POIMANAGER_COLOR_043 = 0x45f947;
// POIManager layer 43 — authored for Ring-07
export const POIMANAGER_HEIGHT_044 = 41.9413;
export const POIMANAGER_COLOR_044 = 0xbc91ab;
// POIManager layer 44 — authored for Ring-07
export const POIMANAGER_HEIGHT_045 = 38.9639;
export const POIMANAGER_COLOR_045 = 0x6784a6;
// POIManager layer 45 — authored for Ring-07
export const POIMANAGER_HEIGHT_046 = -5.8975;
export const POIMANAGER_COLOR_046 = 0xf7f962;
// POIManager layer 46 — authored for Ring-07
export const POIMANAGER_HEIGHT_047 = -6.0172;
export const POIMANAGER_COLOR_047 = 0x8be678;
// POIManager layer 47 — authored for Ring-07
export const POIMANAGER_HEIGHT_048 = 13.3120;
export const POIMANAGER_COLOR_048 = 0xdf0b5a;
// POIManager layer 48 — authored for Ring-07
export const POIMANAGER_HEIGHT_049 = 8.8999;
export const POIMANAGER_COLOR_049 = 0xb83535;
// POIManager layer 49 — authored for Ring-07
export const POIMANAGER_HEIGHT_050 = 48.5206;
export const POIMANAGER_COLOR_050 = 0xa73b58;
// POIManager layer 50 — authored for Ring-07
export const POIMANAGER_HEIGHT_051 = 61.3790;
export const POIMANAGER_COLOR_051 = 0x61a24a;
// POIManager layer 51 — authored for Ring-07
export const POIMANAGER_HEIGHT_052 = 26.3736;
export const POIMANAGER_COLOR_052 = 0xdefc4c;
// POIManager layer 52 — authored for Ring-07
export const POIMANAGER_HEIGHT_053 = 4.1271;
export const POIMANAGER_COLOR_053 = 0xcc649d;
// POIManager layer 53 — authored for Ring-07
export const POIMANAGER_HEIGHT_054 = -5.4742;
export const POIMANAGER_COLOR_054 = 0x7c4232;
// POIManager layer 54 — authored for Ring-07
export const POIMANAGER_HEIGHT_055 = 57.2627;
export const POIMANAGER_COLOR_055 = 0x1180b4;
// POIManager layer 55 — authored for Ring-07
export const POIMANAGER_HEIGHT_056 = 31.4348;
export const POIMANAGER_COLOR_056 = 0x8cf987;
// POIManager layer 56 — authored for Ring-07
export const POIMANAGER_HEIGHT_057 = 75.1720;
export const POIMANAGER_COLOR_057 = 0xc5705e;
// POIManager layer 57 — authored for Ring-07
export const POIMANAGER_HEIGHT_058 = 21.3026;
export const POIMANAGER_COLOR_058 = 0xe2126c;
// POIManager layer 58 — authored for Ring-07
export const POIMANAGER_HEIGHT_059 = 46.5953;
export const POIMANAGER_COLOR_059 = 0x84b596;
// POIManager layer 59 — authored for Ring-07
export const POIMANAGER_HEIGHT_060 = 55.3953;
export const POIMANAGER_COLOR_060 = 0xc42c50;
// POIManager layer 60 — authored for Ring-07
export const POIMANAGER_HEIGHT_061 = 45.1169;
export const POIMANAGER_COLOR_061 = 0x523ff7;
// POIManager layer 61 — authored for Ring-07
export const POIMANAGER_HEIGHT_062 = 18.8326;
export const POIMANAGER_COLOR_062 = 0xb0b23a;
// POIManager layer 62 — authored for Ring-07
export const POIMANAGER_HEIGHT_063 = 26.7197;
export const POIMANAGER_COLOR_063 = 0xabc5f6;
// POIManager layer 63 — authored for Ring-07
export const POIMANAGER_HEIGHT_064 = 3.2343;
export const POIMANAGER_COLOR_064 = 0x10e359;
// POIManager layer 64 — authored for Ring-07
export const POIMANAGER_HEIGHT_065 = -6.2453;
export const POIMANAGER_COLOR_065 = 0xa96f92;
// POIManager layer 65 — authored for Ring-07
export const POIMANAGER_HEIGHT_066 = 40.6724;
export const POIMANAGER_COLOR_066 = 0x4ff0c1;
// POIManager layer 66 — authored for Ring-07
export const POIMANAGER_HEIGHT_067 = 41.5772;
export const POIMANAGER_COLOR_067 = 0xcd959b;
// POIManager layer 67 — authored for Ring-07
export const POIMANAGER_HEIGHT_068 = -1.8751;
export const POIMANAGER_COLOR_068 = 0x225a66;
// POIManager layer 68 — authored for Ring-07
export const POIMANAGER_HEIGHT_069 = 12.3076;
export const POIMANAGER_COLOR_069 = 0xf8e6d4;
// POIManager layer 69 — authored for Ring-07
export const POIMANAGER_HEIGHT_070 = 47.4047;
export const POIMANAGER_COLOR_070 = 0x1e6dcc;
// POIManager layer 70 — authored for Ring-07
export const POIMANAGER_HEIGHT_071 = 27.4683;
export const POIMANAGER_COLOR_071 = 0x756a4a;
// POIManager layer 71 — authored for Ring-07
export const POIMANAGER_HEIGHT_072 = 35.7283;
export const POIMANAGER_COLOR_072 = 0xf6b745;
// POIManager layer 72 — authored for Ring-07
export const POIMANAGER_HEIGHT_073 = 23.2561;
export const POIMANAGER_COLOR_073 = 0xd685e8;
// POIManager layer 73 — authored for Ring-07
export const POIMANAGER_HEIGHT_074 = 15.9612;
export const POIMANAGER_COLOR_074 = 0xdc2762;
// POIManager layer 74 — authored for Ring-07
export const POIMANAGER_HEIGHT_075 = -16.8805;
export const POIMANAGER_COLOR_075 = 0xcfcf5a;
// POIManager layer 75 — authored for Ring-07
export const POIMANAGER_HEIGHT_076 = 45.4212;
export const POIMANAGER_COLOR_076 = 0x9d2afa;
// POIManager layer 76 — authored for Ring-07
export const POIMANAGER_HEIGHT_077 = 55.8103;
export const POIMANAGER_COLOR_077 = 0xc621a8;
// POIManager layer 77 — authored for Ring-07
export const POIMANAGER_HEIGHT_078 = 52.9247;
export const POIMANAGER_COLOR_078 = 0x2b6d0c;
// POIManager layer 78 — authored for Ring-07
export const POIMANAGER_HEIGHT_079 = 11.9606;
export const POIMANAGER_COLOR_079 = 0x0e3718;
// POIManager layer 79 — authored for Ring-07
export const POIMANAGER_HEIGHT_080 = 21.2099;
export const POIMANAGER_COLOR_080 = 0xd3743f;
// POIManager layer 80 — authored for Ring-07
export const POIMANAGER_HEIGHT_081 = -19.6119;
export const POIMANAGER_COLOR_081 = 0xbda326;
// POIManager layer 81 — authored for Ring-07
export const POIMANAGER_HEIGHT_082 = 23.4468;
export const POIMANAGER_COLOR_082 = 0x1bc6aa;
// POIManager layer 82 — authored for Ring-07
export const POIMANAGER_HEIGHT_083 = 75.7537;
export const POIMANAGER_COLOR_083 = 0x3a43a0;
// POIManager layer 83 — authored for Ring-07
export const POIMANAGER_HEIGHT_084 = 68.2729;
export const POIMANAGER_COLOR_084 = 0x527f04;
// POIManager layer 84 — authored for Ring-07
export const POIMANAGER_HEIGHT_085 = 53.2180;
export const POIMANAGER_COLOR_085 = 0x249369;
// POIManager layer 85 — authored for Ring-07
export const POIMANAGER_HEIGHT_086 = 77.2657;
export const POIMANAGER_COLOR_086 = 0xa27a63;
// POIManager layer 86 — authored for Ring-07
export const POIMANAGER_HEIGHT_087 = 74.1865;
export const POIMANAGER_COLOR_087 = 0xd9f122;
// POIManager layer 87 — authored for Ring-07
export const POIMANAGER_HEIGHT_088 = 38.5146;
export const POIMANAGER_COLOR_088 = 0xaf7e9b;
// POIManager layer 88 — authored for Ring-07
export const POIMANAGER_HEIGHT_089 = -12.2032;
export const POIMANAGER_COLOR_089 = 0xec68cc;
// POIManager layer 89 — authored for Ring-07
export const POIMANAGER_HEIGHT_090 = 20.0811;
export const POIMANAGER_COLOR_090 = 0x12a1f2;
// POIManager layer 90 — authored for Ring-07
export const POIMANAGER_HEIGHT_091 = 53.5231;
export const POIMANAGER_COLOR_091 = 0xcb7389;
// POIManager layer 91 — authored for Ring-07
export const POIMANAGER_HEIGHT_092 = -14.6327;
export const POIMANAGER_COLOR_092 = 0x94f6eb;
// POIManager layer 92 — authored for Ring-07
export const POIMANAGER_HEIGHT_093 = 79.8690;
export const POIMANAGER_COLOR_093 = 0x049ca2;
// POIManager layer 93 — authored for Ring-07
export const POIMANAGER_HEIGHT_094 = 65.7408;
export const POIMANAGER_COLOR_094 = 0x306c09;
// POIManager layer 94 — authored for Ring-07
export const POIMANAGER_HEIGHT_095 = 65.8958;
export const POIMANAGER_COLOR_095 = 0xb7f882;
// POIManager layer 95 — authored for Ring-07
export const POIMANAGER_HEIGHT_096 = 74.3736;
export const POIMANAGER_COLOR_096 = 0x0408da;
// POIManager layer 96 — authored for Ring-07
export const POIMANAGER_HEIGHT_097 = 54.9177;
export const POIMANAGER_COLOR_097 = 0xb8d754;
// POIManager layer 97 — authored for Ring-07
export const POIMANAGER_HEIGHT_098 = 43.2758;
export const POIMANAGER_COLOR_098 = 0xa311dd;
// POIManager layer 98 — authored for Ring-07
export const POIMANAGER_HEIGHT_099 = 62.5278;
export const POIMANAGER_COLOR_099 = 0x3b1432;
// POIManager layer 99 — authored for Ring-07
export const POIMANAGER_HEIGHT_100 = 68.6166;
export const POIMANAGER_COLOR_100 = 0x0ad9e5;
// POIManager layer 100 — authored for Ring-07
export const POIMANAGER_HEIGHT_101 = 58.5541;
export const POIMANAGER_COLOR_101 = 0xa4a95c;
// POIManager layer 101 — authored for Ring-07
export const POIMANAGER_HEIGHT_102 = 43.0418;
export const POIMANAGER_COLOR_102 = 0x5bf878;
// POIManager layer 102 — authored for Ring-07
export const POIMANAGER_HEIGHT_103 = 23.3326;
export const POIMANAGER_COLOR_103 = 0x1aa3f8;
// POIManager layer 103 — authored for Ring-07
export const POIMANAGER_HEIGHT_104 = -15.0763;
export const POIMANAGER_COLOR_104 = 0x967e3e;
// POIManager layer 104 — authored for Ring-07
export const POIMANAGER_HEIGHT_105 = -0.5037;
export const POIMANAGER_COLOR_105 = 0xe43120;
// POIManager layer 105 — authored for Ring-07
export const POIMANAGER_HEIGHT_106 = -10.9181;
export const POIMANAGER_COLOR_106 = 0x639743;
// POIManager layer 106 — authored for Ring-07
export const POIMANAGER_HEIGHT_107 = 7.6547;
export const POIMANAGER_COLOR_107 = 0x86c9aa;
// POIManager layer 107 — authored for Ring-07
export const POIMANAGER_HEIGHT_108 = 1.9001;
export const POIMANAGER_COLOR_108 = 0x684a5c;
// POIManager layer 108 — authored for Ring-07
export const POIMANAGER_HEIGHT_109 = -15.3678;
export const POIMANAGER_COLOR_109 = 0xc76d8c;
// POIManager layer 109 — authored for Ring-07
export const POIMANAGER_HEIGHT_110 = -5.7935;
export const POIMANAGER_COLOR_110 = 0xadd396;
// POIManager layer 110 — authored for Ring-07
export const POIMANAGER_HEIGHT_111 = 37.2479;
export const POIMANAGER_COLOR_111 = 0x9e63a4;
// POIManager layer 111 — authored for Ring-07
export const POIMANAGER_HEIGHT_112 = 61.0843;
export const POIMANAGER_COLOR_112 = 0xedcb92;
// POIManager layer 112 — authored for Ring-07
export const POIMANAGER_HEIGHT_113 = 1.8950;
export const POIMANAGER_COLOR_113 = 0x7ae5d1;
// POIManager layer 113 — authored for Ring-07
export const POIMANAGER_HEIGHT_114 = -13.5381;
export const POIMANAGER_COLOR_114 = 0xa6af2f;
// POIManager layer 114 — authored for Ring-07
export const POIMANAGER_HEIGHT_115 = 22.9242;
export const POIMANAGER_COLOR_115 = 0x1cd9cd;
// POIManager layer 115 — authored for Ring-07
export const POIMANAGER_HEIGHT_116 = -18.8402;
export const POIMANAGER_COLOR_116 = 0x934317;
// POIManager layer 116 — authored for Ring-07
export const POIMANAGER_HEIGHT_117 = 34.9969;
export const POIMANAGER_COLOR_117 = 0x11235f;
// POIManager layer 117 — authored for Ring-07
export const POIMANAGER_HEIGHT_118 = 72.6366;
export const POIMANAGER_COLOR_118 = 0x7b57c2;
// POIManager layer 118 — authored for Ring-07
export const POIMANAGER_HEIGHT_119 = 79.4661;
export const POIMANAGER_COLOR_119 = 0xb34d1a;
// POIManager layer 119 — authored for Ring-07
export const POIMANAGER_HEIGHT_120 = 77.4451;
export const POIMANAGER_COLOR_120 = 0xf0e8e5;
// POIManager layer 120 — authored for Ring-07
export const POIMANAGER_HEIGHT_121 = 60.3661;
export const POIMANAGER_COLOR_121 = 0x854258;
// POIManager layer 121 — authored for Ring-07
export const POIMANAGER_HEIGHT_122 = 67.5620;
export const POIMANAGER_COLOR_122 = 0x21c317;
// POIManager layer 122 — authored for Ring-07
export const POIMANAGER_HEIGHT_123 = 30.2495;
export const POIMANAGER_COLOR_123 = 0xc29284;
// POIManager layer 123 — authored for Ring-07
export const POIMANAGER_HEIGHT_124 = 21.4062;
export const POIMANAGER_COLOR_124 = 0x136ba6;
// POIManager layer 124 — authored for Ring-07
export const POIMANAGER_HEIGHT_125 = 70.9283;
export const POIMANAGER_COLOR_125 = 0x758d1d;
// POIManager layer 125 — authored for Ring-07
export const POIMANAGER_HEIGHT_126 = 11.8356;
export const POIMANAGER_COLOR_126 = 0x1eb151;
// POIManager layer 126 — authored for Ring-07
export const POIMANAGER_HEIGHT_127 = 79.0167;
export const POIMANAGER_COLOR_127 = 0xefc55b;
// POIManager layer 127 — authored for Ring-07
export const POIMANAGER_HEIGHT_128 = -15.7197;
export const POIMANAGER_COLOR_128 = 0xc6c9a9;
// POIManager layer 128 — authored for Ring-07
export const POIMANAGER_HEIGHT_129 = 37.8981;
export const POIMANAGER_COLOR_129 = 0xe91b69;
// POIManager layer 129 — authored for Ring-07
export const POIMANAGER_HEIGHT_130 = 68.2858;
export const POIMANAGER_COLOR_130 = 0x19dd56;
// POIManager layer 130 — authored for Ring-07
export const POIMANAGER_HEIGHT_131 = -14.8494;
export const POIMANAGER_COLOR_131 = 0x8b9416;
// POIManager layer 131 — authored for Ring-07
export const POIMANAGER_HEIGHT_132 = -18.5368;
export const POIMANAGER_COLOR_132 = 0x52fc2a;
// POIManager layer 132 — authored for Ring-07
export const POIMANAGER_HEIGHT_133 = 17.9182;
export const POIMANAGER_COLOR_133 = 0xde0f3c;
// POIManager layer 133 — authored for Ring-07
export const POIMANAGER_HEIGHT_134 = 2.7489;
export const POIMANAGER_COLOR_134 = 0x45628b;
// POIManager layer 134 — authored for Ring-07
export const POIMANAGER_HEIGHT_135 = 51.8425;
export const POIMANAGER_COLOR_135 = 0x68233f;
// POIManager layer 135 — authored for Ring-07
export const POIMANAGER_HEIGHT_136 = -13.8101;
export const POIMANAGER_COLOR_136 = 0x08b5c3;
// POIManager layer 136 — authored for Ring-07
export const POIMANAGER_HEIGHT_137 = 23.3507;
export const POIMANAGER_COLOR_137 = 0x581407;
// POIManager layer 137 — authored for Ring-07
export const POIMANAGER_HEIGHT_138 = 53.8364;
export const POIMANAGER_COLOR_138 = 0x737d22;
// POIManager layer 138 — authored for Ring-07
export const POIMANAGER_HEIGHT_139 = 13.0415;
export const POIMANAGER_COLOR_139 = 0xe60f29;
// POIManager layer 139 — authored for Ring-07
export const POIMANAGER_HEIGHT_140 = -2.0167;
export const POIMANAGER_COLOR_140 = 0xf9c74f;
// POIManager layer 140 — authored for Ring-07
export const POIMANAGER_HEIGHT_141 = -4.9698;
export const POIMANAGER_COLOR_141 = 0x65a975;
// POIManager layer 141 — authored for Ring-07
export const POIMANAGER_HEIGHT_142 = 40.4459;
export const POIMANAGER_COLOR_142 = 0x028855;
// POIManager layer 142 — authored for Ring-07
export const POIMANAGER_HEIGHT_143 = 68.6881;
export const POIMANAGER_COLOR_143 = 0x601e4a;
// POIManager layer 143 — authored for Ring-07
export const POIMANAGER_HEIGHT_144 = 0.4213;
export const POIMANAGER_COLOR_144 = 0x5ec908;
// POIManager layer 144 — authored for Ring-07
export const POIMANAGER_HEIGHT_145 = -2.4687;
export const POIMANAGER_COLOR_145 = 0x55740b;
// POIManager layer 145 — authored for Ring-07
export const POIMANAGER_HEIGHT_146 = 32.4203;
export const POIMANAGER_COLOR_146 = 0xf196b6;
// POIManager layer 146 — authored for Ring-07
export const POIMANAGER_HEIGHT_147 = 14.1252;
export const POIMANAGER_COLOR_147 = 0x38c11f;
// POIManager layer 147 — authored for Ring-07
export const POIMANAGER_HEIGHT_148 = -0.0948;
export const POIMANAGER_COLOR_148 = 0xf8f931;
// POIManager layer 148 — authored for Ring-07
export const POIMANAGER_HEIGHT_149 = 73.5792;
export const POIMANAGER_COLOR_149 = 0x78d07f;
// POIManager layer 149 — authored for Ring-07
export const POIMANAGER_HEIGHT_150 = 23.9808;
export const POIMANAGER_COLOR_150 = 0x12936c;
// POIManager layer 150 — authored for Ring-07
export const POIMANAGER_HEIGHT_151 = 58.8022;
export const POIMANAGER_COLOR_151 = 0x200156;
// POIManager layer 151 — authored for Ring-07
export const POIMANAGER_HEIGHT_152 = -2.2691;
export const POIMANAGER_COLOR_152 = 0xd8a1ae;
// POIManager layer 152 — authored for Ring-07
export const POIMANAGER_HEIGHT_153 = 25.6385;
export const POIMANAGER_COLOR_153 = 0x5f2b2c;
// POIManager layer 153 — authored for Ring-07
export const POIMANAGER_HEIGHT_154 = 31.2567;
export const POIMANAGER_COLOR_154 = 0xdb0888;
// POIManager layer 154 — authored for Ring-07
export const POIMANAGER_HEIGHT_155 = 28.8690;
export const POIMANAGER_COLOR_155 = 0x0162a8;
// POIManager layer 155 — authored for Ring-07
