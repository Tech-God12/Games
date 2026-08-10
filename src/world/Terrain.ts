/**
 * NEXUS: FRAGMENT — WORLD/Terrain
 * World generation — Terrain
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

import * as THREE from 'three';

export interface TerrainLayer { height: number; color: THREE.Color; roughness: number; }
export const TERRAIN_SEED = 77317;

export class Terrain {
  private layers: TerrainLayer[] = [];
  constructor(public seed:number=TERRAIN_SEED){}

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
export const TERRAIN_HEIGHT_000 = 41.8827;
export const TERRAIN_COLOR_000 = 0x085b72;
// Terrain layer 0 — authored for Ring-07
export const TERRAIN_HEIGHT_001 = -7.8895;
export const TERRAIN_COLOR_001 = 0xdb7945;
// Terrain layer 1 — authored for Ring-07
export const TERRAIN_HEIGHT_002 = -0.9326;
export const TERRAIN_COLOR_002 = 0xf0d4da;
// Terrain layer 2 — authored for Ring-07
export const TERRAIN_HEIGHT_003 = 20.6565;
export const TERRAIN_COLOR_003 = 0xa8ec1c;
// Terrain layer 3 — authored for Ring-07
export const TERRAIN_HEIGHT_004 = 44.7040;
export const TERRAIN_COLOR_004 = 0x52c215;
// Terrain layer 4 — authored for Ring-07
export const TERRAIN_HEIGHT_005 = 79.3440;
export const TERRAIN_COLOR_005 = 0xd8a15f;
// Terrain layer 5 — authored for Ring-07
export const TERRAIN_HEIGHT_006 = 43.5407;
export const TERRAIN_COLOR_006 = 0x9c70b3;
// Terrain layer 6 — authored for Ring-07
export const TERRAIN_HEIGHT_007 = 47.8624;
export const TERRAIN_COLOR_007 = 0xb11f10;
// Terrain layer 7 — authored for Ring-07
export const TERRAIN_HEIGHT_008 = 57.5235;
export const TERRAIN_COLOR_008 = 0xafbd18;
// Terrain layer 8 — authored for Ring-07
export const TERRAIN_HEIGHT_009 = -4.6864;
export const TERRAIN_COLOR_009 = 0x7f1e64;
// Terrain layer 9 — authored for Ring-07
export const TERRAIN_HEIGHT_010 = 22.9475;
export const TERRAIN_COLOR_010 = 0x23b8de;
// Terrain layer 10 — authored for Ring-07
export const TERRAIN_HEIGHT_011 = -6.7151;
export const TERRAIN_COLOR_011 = 0x662ec8;
// Terrain layer 11 — authored for Ring-07
export const TERRAIN_HEIGHT_012 = 57.2345;
export const TERRAIN_COLOR_012 = 0xf45e22;
// Terrain layer 12 — authored for Ring-07
export const TERRAIN_HEIGHT_013 = 23.6558;
export const TERRAIN_COLOR_013 = 0x5f9732;
// Terrain layer 13 — authored for Ring-07
export const TERRAIN_HEIGHT_014 = -2.0762;
export const TERRAIN_COLOR_014 = 0x945c64;
// Terrain layer 14 — authored for Ring-07
export const TERRAIN_HEIGHT_015 = 57.2332;
export const TERRAIN_COLOR_015 = 0x0ffb91;
// Terrain layer 15 — authored for Ring-07
export const TERRAIN_HEIGHT_016 = -13.1263;
export const TERRAIN_COLOR_016 = 0x84b4fb;
// Terrain layer 16 — authored for Ring-07
export const TERRAIN_HEIGHT_017 = 2.7633;
export const TERRAIN_COLOR_017 = 0x66e26c;
// Terrain layer 17 — authored for Ring-07
export const TERRAIN_HEIGHT_018 = -9.5442;
export const TERRAIN_COLOR_018 = 0xac8dcd;
// Terrain layer 18 — authored for Ring-07
export const TERRAIN_HEIGHT_019 = -19.4544;
export const TERRAIN_COLOR_019 = 0x16f4dc;
// Terrain layer 19 — authored for Ring-07
export const TERRAIN_HEIGHT_020 = 74.3094;
export const TERRAIN_COLOR_020 = 0x22cff7;
// Terrain layer 20 — authored for Ring-07
export const TERRAIN_HEIGHT_021 = -9.3260;
export const TERRAIN_COLOR_021 = 0xaa6590;
// Terrain layer 21 — authored for Ring-07
export const TERRAIN_HEIGHT_022 = 62.2180;
export const TERRAIN_COLOR_022 = 0x34e82a;
// Terrain layer 22 — authored for Ring-07
export const TERRAIN_HEIGHT_023 = 35.4206;
export const TERRAIN_COLOR_023 = 0xa7288b;
// Terrain layer 23 — authored for Ring-07
export const TERRAIN_HEIGHT_024 = 67.0717;
export const TERRAIN_COLOR_024 = 0x860ea2;
// Terrain layer 24 — authored for Ring-07
export const TERRAIN_HEIGHT_025 = 73.7459;
export const TERRAIN_COLOR_025 = 0x879e84;
// Terrain layer 25 — authored for Ring-07
export const TERRAIN_HEIGHT_026 = 66.7568;
export const TERRAIN_COLOR_026 = 0x345276;
// Terrain layer 26 — authored for Ring-07
export const TERRAIN_HEIGHT_027 = 19.3400;
export const TERRAIN_COLOR_027 = 0x07bb87;
// Terrain layer 27 — authored for Ring-07
export const TERRAIN_HEIGHT_028 = 74.3235;
export const TERRAIN_COLOR_028 = 0xe091b5;
// Terrain layer 28 — authored for Ring-07
export const TERRAIN_HEIGHT_029 = 61.5287;
export const TERRAIN_COLOR_029 = 0xc641b7;
// Terrain layer 29 — authored for Ring-07
export const TERRAIN_HEIGHT_030 = 26.1130;
export const TERRAIN_COLOR_030 = 0x9ca568;
// Terrain layer 30 — authored for Ring-07
export const TERRAIN_HEIGHT_031 = 34.1528;
export const TERRAIN_COLOR_031 = 0x889da1;
// Terrain layer 31 — authored for Ring-07
export const TERRAIN_HEIGHT_032 = 12.0526;
export const TERRAIN_COLOR_032 = 0xf27fea;
// Terrain layer 32 — authored for Ring-07
export const TERRAIN_HEIGHT_033 = 36.0648;
export const TERRAIN_COLOR_033 = 0x38e40c;
// Terrain layer 33 — authored for Ring-07
export const TERRAIN_HEIGHT_034 = 63.0198;
export const TERRAIN_COLOR_034 = 0x1687b7;
// Terrain layer 34 — authored for Ring-07
export const TERRAIN_HEIGHT_035 = -0.8555;
export const TERRAIN_COLOR_035 = 0xdb7758;
// Terrain layer 35 — authored for Ring-07
export const TERRAIN_HEIGHT_036 = 22.2438;
export const TERRAIN_COLOR_036 = 0xeb867f;
// Terrain layer 36 — authored for Ring-07
export const TERRAIN_HEIGHT_037 = 32.1859;
export const TERRAIN_COLOR_037 = 0xaae9c6;
// Terrain layer 37 — authored for Ring-07
export const TERRAIN_HEIGHT_038 = 39.8402;
export const TERRAIN_COLOR_038 = 0x7f0ccd;
// Terrain layer 38 — authored for Ring-07
export const TERRAIN_HEIGHT_039 = 47.5716;
export const TERRAIN_COLOR_039 = 0x44faa2;
// Terrain layer 39 — authored for Ring-07
export const TERRAIN_HEIGHT_040 = 63.9250;
export const TERRAIN_COLOR_040 = 0x557603;
// Terrain layer 40 — authored for Ring-07
export const TERRAIN_HEIGHT_041 = 21.6292;
export const TERRAIN_COLOR_041 = 0x7fd3ce;
// Terrain layer 41 — authored for Ring-07
export const TERRAIN_HEIGHT_042 = 61.8051;
export const TERRAIN_COLOR_042 = 0xc3defb;
// Terrain layer 42 — authored for Ring-07
export const TERRAIN_HEIGHT_043 = 25.5193;
export const TERRAIN_COLOR_043 = 0x7ae3a0;
// Terrain layer 43 — authored for Ring-07
export const TERRAIN_HEIGHT_044 = -16.6412;
export const TERRAIN_COLOR_044 = 0x7bd5b8;
// Terrain layer 44 — authored for Ring-07
export const TERRAIN_HEIGHT_045 = -12.8895;
export const TERRAIN_COLOR_045 = 0xb56b3a;
// Terrain layer 45 — authored for Ring-07
export const TERRAIN_HEIGHT_046 = 4.5582;
export const TERRAIN_COLOR_046 = 0x4eec56;
// Terrain layer 46 — authored for Ring-07
export const TERRAIN_HEIGHT_047 = 76.0273;
export const TERRAIN_COLOR_047 = 0xc01078;
// Terrain layer 47 — authored for Ring-07
export const TERRAIN_HEIGHT_048 = 77.5336;
export const TERRAIN_COLOR_048 = 0xf12606;
// Terrain layer 48 — authored for Ring-07
export const TERRAIN_HEIGHT_049 = -9.0458;
export const TERRAIN_COLOR_049 = 0x699140;
// Terrain layer 49 — authored for Ring-07
export const TERRAIN_HEIGHT_050 = 15.1821;
export const TERRAIN_COLOR_050 = 0xd6fc43;
// Terrain layer 50 — authored for Ring-07
export const TERRAIN_HEIGHT_051 = -16.9678;
export const TERRAIN_COLOR_051 = 0xa9eaf3;
// Terrain layer 51 — authored for Ring-07
export const TERRAIN_HEIGHT_052 = 2.6685;
export const TERRAIN_COLOR_052 = 0x140f43;
// Terrain layer 52 — authored for Ring-07
export const TERRAIN_HEIGHT_053 = 31.5446;
export const TERRAIN_COLOR_053 = 0x20c04b;
// Terrain layer 53 — authored for Ring-07
export const TERRAIN_HEIGHT_054 = 11.3554;
export const TERRAIN_COLOR_054 = 0x7d4df6;
// Terrain layer 54 — authored for Ring-07
export const TERRAIN_HEIGHT_055 = -13.2281;
export const TERRAIN_COLOR_055 = 0x37c75c;
// Terrain layer 55 — authored for Ring-07
export const TERRAIN_HEIGHT_056 = 19.3455;
export const TERRAIN_COLOR_056 = 0xb51528;
// Terrain layer 56 — authored for Ring-07
export const TERRAIN_HEIGHT_057 = 54.6385;
export const TERRAIN_COLOR_057 = 0x56363c;
// Terrain layer 57 — authored for Ring-07
export const TERRAIN_HEIGHT_058 = 44.0628;
export const TERRAIN_COLOR_058 = 0xf20e78;
// Terrain layer 58 — authored for Ring-07
export const TERRAIN_HEIGHT_059 = 13.7740;
export const TERRAIN_COLOR_059 = 0x722541;
// Terrain layer 59 — authored for Ring-07
export const TERRAIN_HEIGHT_060 = 61.6160;
export const TERRAIN_COLOR_060 = 0x07a67b;
// Terrain layer 60 — authored for Ring-07
export const TERRAIN_HEIGHT_061 = 33.5543;
export const TERRAIN_COLOR_061 = 0xc9f0bb;
// Terrain layer 61 — authored for Ring-07
export const TERRAIN_HEIGHT_062 = 73.6352;
export const TERRAIN_COLOR_062 = 0x11aea9;
// Terrain layer 62 — authored for Ring-07
export const TERRAIN_HEIGHT_063 = -10.9382;
export const TERRAIN_COLOR_063 = 0x4ec464;
// Terrain layer 63 — authored for Ring-07
export const TERRAIN_HEIGHT_064 = 72.3105;
export const TERRAIN_COLOR_064 = 0xc51c43;
// Terrain layer 64 — authored for Ring-07
export const TERRAIN_HEIGHT_065 = 71.5128;
export const TERRAIN_COLOR_065 = 0x04e506;
// Terrain layer 65 — authored for Ring-07
export const TERRAIN_HEIGHT_066 = 55.8562;
export const TERRAIN_COLOR_066 = 0x233dd2;
// Terrain layer 66 — authored for Ring-07
export const TERRAIN_HEIGHT_067 = 23.7304;
export const TERRAIN_COLOR_067 = 0xd60d66;
// Terrain layer 67 — authored for Ring-07
export const TERRAIN_HEIGHT_068 = -8.5293;
export const TERRAIN_COLOR_068 = 0xa35f00;
// Terrain layer 68 — authored for Ring-07
export const TERRAIN_HEIGHT_069 = 11.6673;
export const TERRAIN_COLOR_069 = 0x3ae941;
// Terrain layer 69 — authored for Ring-07
export const TERRAIN_HEIGHT_070 = 72.7909;
export const TERRAIN_COLOR_070 = 0x5bc6a8;
// Terrain layer 70 — authored for Ring-07
export const TERRAIN_HEIGHT_071 = 60.7359;
export const TERRAIN_COLOR_071 = 0xaed88e;
// Terrain layer 71 — authored for Ring-07
export const TERRAIN_HEIGHT_072 = 30.2456;
export const TERRAIN_COLOR_072 = 0x595f72;
// Terrain layer 72 — authored for Ring-07
export const TERRAIN_HEIGHT_073 = 75.1645;
export const TERRAIN_COLOR_073 = 0x52784f;
// Terrain layer 73 — authored for Ring-07
export const TERRAIN_HEIGHT_074 = 56.0875;
export const TERRAIN_COLOR_074 = 0xe62a6b;
// Terrain layer 74 — authored for Ring-07
export const TERRAIN_HEIGHT_075 = 55.3775;
export const TERRAIN_COLOR_075 = 0xea2317;
// Terrain layer 75 — authored for Ring-07
export const TERRAIN_HEIGHT_076 = 4.2453;
export const TERRAIN_COLOR_076 = 0xd13b68;
// Terrain layer 76 — authored for Ring-07
export const TERRAIN_HEIGHT_077 = 10.2975;
export const TERRAIN_COLOR_077 = 0xafe90c;
// Terrain layer 77 — authored for Ring-07
export const TERRAIN_HEIGHT_078 = 43.8259;
export const TERRAIN_COLOR_078 = 0x3f66e0;
// Terrain layer 78 — authored for Ring-07
export const TERRAIN_HEIGHT_079 = 59.0779;
export const TERRAIN_COLOR_079 = 0x3a52d8;
// Terrain layer 79 — authored for Ring-07
export const TERRAIN_HEIGHT_080 = 4.9774;
export const TERRAIN_COLOR_080 = 0x9d4ffd;
// Terrain layer 80 — authored for Ring-07
export const TERRAIN_HEIGHT_081 = 75.0514;
export const TERRAIN_COLOR_081 = 0xf45dc0;
// Terrain layer 81 — authored for Ring-07
export const TERRAIN_HEIGHT_082 = 67.0939;
export const TERRAIN_COLOR_082 = 0x348d73;
// Terrain layer 82 — authored for Ring-07
export const TERRAIN_HEIGHT_083 = -10.8242;
export const TERRAIN_COLOR_083 = 0x36369d;
// Terrain layer 83 — authored for Ring-07
export const TERRAIN_HEIGHT_084 = 1.3410;
export const TERRAIN_COLOR_084 = 0x01045d;
// Terrain layer 84 — authored for Ring-07
export const TERRAIN_HEIGHT_085 = -6.5408;
export const TERRAIN_COLOR_085 = 0xca4cbf;
// Terrain layer 85 — authored for Ring-07
export const TERRAIN_HEIGHT_086 = 23.8330;
export const TERRAIN_COLOR_086 = 0x4ff961;
// Terrain layer 86 — authored for Ring-07
export const TERRAIN_HEIGHT_087 = 67.6947;
export const TERRAIN_COLOR_087 = 0xf09d97;
// Terrain layer 87 — authored for Ring-07
export const TERRAIN_HEIGHT_088 = 38.4020;
export const TERRAIN_COLOR_088 = 0x20cae5;
// Terrain layer 88 — authored for Ring-07
export const TERRAIN_HEIGHT_089 = -6.9285;
export const TERRAIN_COLOR_089 = 0x19ff5c;
// Terrain layer 89 — authored for Ring-07
export const TERRAIN_HEIGHT_090 = 30.3945;
export const TERRAIN_COLOR_090 = 0xf91eb4;
// Terrain layer 90 — authored for Ring-07
export const TERRAIN_HEIGHT_091 = 12.1620;
export const TERRAIN_COLOR_091 = 0xd556f3;
// Terrain layer 91 — authored for Ring-07
export const TERRAIN_HEIGHT_092 = 42.1185;
export const TERRAIN_COLOR_092 = 0xab399f;
// Terrain layer 92 — authored for Ring-07
export const TERRAIN_HEIGHT_093 = -5.0730;
export const TERRAIN_COLOR_093 = 0x6a3397;
// Terrain layer 93 — authored for Ring-07
export const TERRAIN_HEIGHT_094 = 4.3623;
export const TERRAIN_COLOR_094 = 0x456d9d;
// Terrain layer 94 — authored for Ring-07
export const TERRAIN_HEIGHT_095 = 14.2999;
export const TERRAIN_COLOR_095 = 0x7c4d03;
// Terrain layer 95 — authored for Ring-07
export const TERRAIN_HEIGHT_096 = 5.0505;
export const TERRAIN_COLOR_096 = 0x5e6669;
// Terrain layer 96 — authored for Ring-07
export const TERRAIN_HEIGHT_097 = 32.0621;
export const TERRAIN_COLOR_097 = 0x648856;
// Terrain layer 97 — authored for Ring-07
export const TERRAIN_HEIGHT_098 = -2.8760;
export const TERRAIN_COLOR_098 = 0xc43a24;
// Terrain layer 98 — authored for Ring-07
export const TERRAIN_HEIGHT_099 = 0.4046;
export const TERRAIN_COLOR_099 = 0xd96b6f;
// Terrain layer 99 — authored for Ring-07
export const TERRAIN_HEIGHT_100 = 39.4744;
export const TERRAIN_COLOR_100 = 0x635f54;
// Terrain layer 100 — authored for Ring-07
export const TERRAIN_HEIGHT_101 = -4.5053;
export const TERRAIN_COLOR_101 = 0x664a11;
// Terrain layer 101 — authored for Ring-07
export const TERRAIN_HEIGHT_102 = 59.5530;
export const TERRAIN_COLOR_102 = 0x42b937;
// Terrain layer 102 — authored for Ring-07
export const TERRAIN_HEIGHT_103 = 8.5898;
export const TERRAIN_COLOR_103 = 0x795ec9;
// Terrain layer 103 — authored for Ring-07
export const TERRAIN_HEIGHT_104 = 78.5420;
export const TERRAIN_COLOR_104 = 0x033ad5;
// Terrain layer 104 — authored for Ring-07
export const TERRAIN_HEIGHT_105 = -15.6811;
export const TERRAIN_COLOR_105 = 0x14f516;
// Terrain layer 105 — authored for Ring-07
export const TERRAIN_HEIGHT_106 = 52.6927;
export const TERRAIN_COLOR_106 = 0x417224;
// Terrain layer 106 — authored for Ring-07
export const TERRAIN_HEIGHT_107 = 35.7205;
export const TERRAIN_COLOR_107 = 0x2a520a;
// Terrain layer 107 — authored for Ring-07
export const TERRAIN_HEIGHT_108 = 4.2891;
export const TERRAIN_COLOR_108 = 0x03ad5d;
// Terrain layer 108 — authored for Ring-07
export const TERRAIN_HEIGHT_109 = 3.3519;
export const TERRAIN_COLOR_109 = 0x0b180c;
// Terrain layer 109 — authored for Ring-07
export const TERRAIN_HEIGHT_110 = 74.9995;
export const TERRAIN_COLOR_110 = 0x2ac550;
// Terrain layer 110 — authored for Ring-07
export const TERRAIN_HEIGHT_111 = -4.8183;
export const TERRAIN_COLOR_111 = 0x18e5cb;
// Terrain layer 111 — authored for Ring-07
export const TERRAIN_HEIGHT_112 = 60.9207;
export const TERRAIN_COLOR_112 = 0x0758cc;
// Terrain layer 112 — authored for Ring-07
export const TERRAIN_HEIGHT_113 = 38.0124;
export const TERRAIN_COLOR_113 = 0xcee952;
// Terrain layer 113 — authored for Ring-07
export const TERRAIN_HEIGHT_114 = 4.8984;
export const TERRAIN_COLOR_114 = 0x2ae609;
// Terrain layer 114 — authored for Ring-07
export const TERRAIN_HEIGHT_115 = 58.6508;
export const TERRAIN_COLOR_115 = 0x9580aa;
// Terrain layer 115 — authored for Ring-07
export const TERRAIN_HEIGHT_116 = 33.8553;
export const TERRAIN_COLOR_116 = 0xf695f9;
// Terrain layer 116 — authored for Ring-07
export const TERRAIN_HEIGHT_117 = 65.9447;
export const TERRAIN_COLOR_117 = 0x019bf4;
// Terrain layer 117 — authored for Ring-07
export const TERRAIN_HEIGHT_118 = 19.1331;
export const TERRAIN_COLOR_118 = 0x968f43;
// Terrain layer 118 — authored for Ring-07
export const TERRAIN_HEIGHT_119 = -13.0409;
export const TERRAIN_COLOR_119 = 0x1a7065;
// Terrain layer 119 — authored for Ring-07
export const TERRAIN_HEIGHT_120 = 52.6380;
export const TERRAIN_COLOR_120 = 0x79ac9a;
// Terrain layer 120 — authored for Ring-07
export const TERRAIN_HEIGHT_121 = 15.6627;
export const TERRAIN_COLOR_121 = 0x572aa1;
// Terrain layer 121 — authored for Ring-07
export const TERRAIN_HEIGHT_122 = 3.8641;
export const TERRAIN_COLOR_122 = 0x98b68e;
// Terrain layer 122 — authored for Ring-07
export const TERRAIN_HEIGHT_123 = -5.8520;
export const TERRAIN_COLOR_123 = 0x1f7102;
// Terrain layer 123 — authored for Ring-07
export const TERRAIN_HEIGHT_124 = 66.4173;
export const TERRAIN_COLOR_124 = 0x267fdc;
// Terrain layer 124 — authored for Ring-07
export const TERRAIN_HEIGHT_125 = -14.3219;
export const TERRAIN_COLOR_125 = 0x5cef1c;
// Terrain layer 125 — authored for Ring-07
export const TERRAIN_HEIGHT_126 = 78.0617;
export const TERRAIN_COLOR_126 = 0xba46b9;
// Terrain layer 126 — authored for Ring-07
export const TERRAIN_HEIGHT_127 = 46.7004;
export const TERRAIN_COLOR_127 = 0x48270e;
// Terrain layer 127 — authored for Ring-07
export const TERRAIN_HEIGHT_128 = 55.7569;
export const TERRAIN_COLOR_128 = 0x31fbcf;
// Terrain layer 128 — authored for Ring-07
export const TERRAIN_HEIGHT_129 = 40.1785;
export const TERRAIN_COLOR_129 = 0xb35b30;
// Terrain layer 129 — authored for Ring-07
export const TERRAIN_HEIGHT_130 = 8.3797;
export const TERRAIN_COLOR_130 = 0x78f340;
// Terrain layer 130 — authored for Ring-07
export const TERRAIN_HEIGHT_131 = 3.5295;
export const TERRAIN_COLOR_131 = 0x6687fa;
// Terrain layer 131 — authored for Ring-07
export const TERRAIN_HEIGHT_132 = 36.8778;
export const TERRAIN_COLOR_132 = 0x0d83d8;
// Terrain layer 132 — authored for Ring-07
export const TERRAIN_HEIGHT_133 = 3.6329;
export const TERRAIN_COLOR_133 = 0x51c411;
// Terrain layer 133 — authored for Ring-07
export const TERRAIN_HEIGHT_134 = 26.4012;
export const TERRAIN_COLOR_134 = 0x7beb52;
// Terrain layer 134 — authored for Ring-07
export const TERRAIN_HEIGHT_135 = 75.2497;
export const TERRAIN_COLOR_135 = 0x45493e;
// Terrain layer 135 — authored for Ring-07
export const TERRAIN_HEIGHT_136 = 0.2639;
export const TERRAIN_COLOR_136 = 0x6d4290;
// Terrain layer 136 — authored for Ring-07
export const TERRAIN_HEIGHT_137 = 68.8424;
export const TERRAIN_COLOR_137 = 0xd6e125;
// Terrain layer 137 — authored for Ring-07
export const TERRAIN_HEIGHT_138 = 24.9839;
export const TERRAIN_COLOR_138 = 0x20d344;
// Terrain layer 138 — authored for Ring-07
export const TERRAIN_HEIGHT_139 = -6.3619;
export const TERRAIN_COLOR_139 = 0xcaef05;
// Terrain layer 139 — authored for Ring-07
export const TERRAIN_HEIGHT_140 = -19.7209;
export const TERRAIN_COLOR_140 = 0x484a49;
// Terrain layer 140 — authored for Ring-07
export const TERRAIN_HEIGHT_141 = 40.2023;
export const TERRAIN_COLOR_141 = 0x7d2d92;
// Terrain layer 141 — authored for Ring-07
export const TERRAIN_HEIGHT_142 = 20.7584;
export const TERRAIN_COLOR_142 = 0x7c5465;
// Terrain layer 142 — authored for Ring-07
export const TERRAIN_HEIGHT_143 = 7.9429;
export const TERRAIN_COLOR_143 = 0xf4a50d;
// Terrain layer 143 — authored for Ring-07
export const TERRAIN_HEIGHT_144 = 59.3620;
export const TERRAIN_COLOR_144 = 0x63dd13;
// Terrain layer 144 — authored for Ring-07
export const TERRAIN_HEIGHT_145 = 78.5132;
export const TERRAIN_COLOR_145 = 0xaddad5;
// Terrain layer 145 — authored for Ring-07
export const TERRAIN_HEIGHT_146 = -11.0337;
export const TERRAIN_COLOR_146 = 0xe2625c;
// Terrain layer 146 — authored for Ring-07
export const TERRAIN_HEIGHT_147 = 54.8105;
export const TERRAIN_COLOR_147 = 0x7145b3;
// Terrain layer 147 — authored for Ring-07
export const TERRAIN_HEIGHT_148 = -15.3894;
export const TERRAIN_COLOR_148 = 0x5e4b72;
// Terrain layer 148 — authored for Ring-07
export const TERRAIN_HEIGHT_149 = 44.4205;
export const TERRAIN_COLOR_149 = 0x2ecbbd;
// Terrain layer 149 — authored for Ring-07
export const TERRAIN_HEIGHT_150 = 28.8104;
export const TERRAIN_COLOR_150 = 0xa7f203;
// Terrain layer 150 — authored for Ring-07
export const TERRAIN_HEIGHT_151 = 32.2991;
export const TERRAIN_COLOR_151 = 0x97475d;
// Terrain layer 151 — authored for Ring-07
export const TERRAIN_HEIGHT_152 = 54.1370;
export const TERRAIN_COLOR_152 = 0x31ac38;
// Terrain layer 152 — authored for Ring-07
export const TERRAIN_HEIGHT_153 = 4.7205;
export const TERRAIN_COLOR_153 = 0xb9ef22;
// Terrain layer 153 — authored for Ring-07
export const TERRAIN_HEIGHT_154 = 48.5739;
export const TERRAIN_COLOR_154 = 0xe5cd06;
// Terrain layer 154 — authored for Ring-07
export const TERRAIN_HEIGHT_155 = 57.9481;
export const TERRAIN_COLOR_155 = 0x43aa08;
// Terrain layer 155 — authored for Ring-07
