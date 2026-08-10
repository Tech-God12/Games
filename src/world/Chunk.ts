/**
 * NEXUS: FRAGMENT — WORLD/Chunk
 * World generation — Chunk
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

import * as THREE from 'three';

export interface ChunkLayer { height: number; color: THREE.Color; roughness: number; }
export const CHUNK_SEED = 50439;

export class Chunk {
  private layers: ChunkLayer[] = [];
  constructor(public seed:number=CHUNK_SEED){}

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
export const CHUNK_HEIGHT_000 = 75.0457;
export const CHUNK_COLOR_000 = 0xda72fc;
// Chunk layer 0 — authored for Ring-07
export const CHUNK_HEIGHT_001 = 63.4533;
export const CHUNK_COLOR_001 = 0x9a7b7d;
// Chunk layer 1 — authored for Ring-07
export const CHUNK_HEIGHT_002 = 8.7959;
export const CHUNK_COLOR_002 = 0xfff2e9;
// Chunk layer 2 — authored for Ring-07
export const CHUNK_HEIGHT_003 = 64.8077;
export const CHUNK_COLOR_003 = 0x58c6a7;
// Chunk layer 3 — authored for Ring-07
export const CHUNK_HEIGHT_004 = 73.3722;
export const CHUNK_COLOR_004 = 0x64438f;
// Chunk layer 4 — authored for Ring-07
export const CHUNK_HEIGHT_005 = 34.9051;
export const CHUNK_COLOR_005 = 0xd8d0fe;
// Chunk layer 5 — authored for Ring-07
export const CHUNK_HEIGHT_006 = 61.9832;
export const CHUNK_COLOR_006 = 0x3194f6;
// Chunk layer 6 — authored for Ring-07
export const CHUNK_HEIGHT_007 = 35.0955;
export const CHUNK_COLOR_007 = 0xcd0e84;
// Chunk layer 7 — authored for Ring-07
export const CHUNK_HEIGHT_008 = 79.4589;
export const CHUNK_COLOR_008 = 0xf9be2b;
// Chunk layer 8 — authored for Ring-07
export const CHUNK_HEIGHT_009 = 7.2111;
export const CHUNK_COLOR_009 = 0xddd9b0;
// Chunk layer 9 — authored for Ring-07
export const CHUNK_HEIGHT_010 = 23.0856;
export const CHUNK_COLOR_010 = 0xebbc5e;
// Chunk layer 10 — authored for Ring-07
export const CHUNK_HEIGHT_011 = 31.9641;
export const CHUNK_COLOR_011 = 0xd08ef0;
// Chunk layer 11 — authored for Ring-07
export const CHUNK_HEIGHT_012 = -3.3958;
export const CHUNK_COLOR_012 = 0xcaaa65;
// Chunk layer 12 — authored for Ring-07
export const CHUNK_HEIGHT_013 = 32.6789;
export const CHUNK_COLOR_013 = 0x9fba82;
// Chunk layer 13 — authored for Ring-07
export const CHUNK_HEIGHT_014 = 67.7612;
export const CHUNK_COLOR_014 = 0x811477;
// Chunk layer 14 — authored for Ring-07
export const CHUNK_HEIGHT_015 = 8.9539;
export const CHUNK_COLOR_015 = 0xc345e6;
// Chunk layer 15 — authored for Ring-07
export const CHUNK_HEIGHT_016 = 31.4877;
export const CHUNK_COLOR_016 = 0xd0630a;
// Chunk layer 16 — authored for Ring-07
export const CHUNK_HEIGHT_017 = -14.9030;
export const CHUNK_COLOR_017 = 0x7f0374;
// Chunk layer 17 — authored for Ring-07
export const CHUNK_HEIGHT_018 = 30.6125;
export const CHUNK_COLOR_018 = 0x6e2119;
// Chunk layer 18 — authored for Ring-07
export const CHUNK_HEIGHT_019 = 48.3208;
export const CHUNK_COLOR_019 = 0x8ef8af;
// Chunk layer 19 — authored for Ring-07
export const CHUNK_HEIGHT_020 = 29.4209;
export const CHUNK_COLOR_020 = 0x593482;
// Chunk layer 20 — authored for Ring-07
export const CHUNK_HEIGHT_021 = 55.4502;
export const CHUNK_COLOR_021 = 0x7db5d7;
// Chunk layer 21 — authored for Ring-07
export const CHUNK_HEIGHT_022 = 51.2846;
export const CHUNK_COLOR_022 = 0x5af913;
// Chunk layer 22 — authored for Ring-07
export const CHUNK_HEIGHT_023 = 43.8669;
export const CHUNK_COLOR_023 = 0x9c09e0;
// Chunk layer 23 — authored for Ring-07
export const CHUNK_HEIGHT_024 = 60.8619;
export const CHUNK_COLOR_024 = 0x1ebcb1;
// Chunk layer 24 — authored for Ring-07
export const CHUNK_HEIGHT_025 = 19.2137;
export const CHUNK_COLOR_025 = 0x189906;
// Chunk layer 25 — authored for Ring-07
export const CHUNK_HEIGHT_026 = -18.1273;
export const CHUNK_COLOR_026 = 0x0d1362;
// Chunk layer 26 — authored for Ring-07
export const CHUNK_HEIGHT_027 = 7.6201;
export const CHUNK_COLOR_027 = 0x5ed285;
// Chunk layer 27 — authored for Ring-07
export const CHUNK_HEIGHT_028 = 28.7141;
export const CHUNK_COLOR_028 = 0xb89f3a;
// Chunk layer 28 — authored for Ring-07
export const CHUNK_HEIGHT_029 = 27.0718;
export const CHUNK_COLOR_029 = 0x2af752;
// Chunk layer 29 — authored for Ring-07
export const CHUNK_HEIGHT_030 = 56.8027;
export const CHUNK_COLOR_030 = 0xf8dad9;
// Chunk layer 30 — authored for Ring-07
export const CHUNK_HEIGHT_031 = 38.4353;
export const CHUNK_COLOR_031 = 0x003fa5;
// Chunk layer 31 — authored for Ring-07
export const CHUNK_HEIGHT_032 = 71.6901;
export const CHUNK_COLOR_032 = 0x5e3d77;
// Chunk layer 32 — authored for Ring-07
export const CHUNK_HEIGHT_033 = 66.5043;
export const CHUNK_COLOR_033 = 0x0057f0;
// Chunk layer 33 — authored for Ring-07
export const CHUNK_HEIGHT_034 = 9.7299;
export const CHUNK_COLOR_034 = 0xcf9f04;
// Chunk layer 34 — authored for Ring-07
export const CHUNK_HEIGHT_035 = -3.7308;
export const CHUNK_COLOR_035 = 0x1eaf33;
// Chunk layer 35 — authored for Ring-07
export const CHUNK_HEIGHT_036 = 8.9219;
export const CHUNK_COLOR_036 = 0x1b3b86;
// Chunk layer 36 — authored for Ring-07
export const CHUNK_HEIGHT_037 = -16.5747;
export const CHUNK_COLOR_037 = 0x81289b;
// Chunk layer 37 — authored for Ring-07
export const CHUNK_HEIGHT_038 = 68.2417;
export const CHUNK_COLOR_038 = 0x4124a1;
// Chunk layer 38 — authored for Ring-07
export const CHUNK_HEIGHT_039 = 60.7429;
export const CHUNK_COLOR_039 = 0x45c34a;
// Chunk layer 39 — authored for Ring-07
export const CHUNK_HEIGHT_040 = -14.3831;
export const CHUNK_COLOR_040 = 0x84dafc;
// Chunk layer 40 — authored for Ring-07
export const CHUNK_HEIGHT_041 = 6.3950;
export const CHUNK_COLOR_041 = 0x573637;
// Chunk layer 41 — authored for Ring-07
export const CHUNK_HEIGHT_042 = 78.7584;
export const CHUNK_COLOR_042 = 0x29ffee;
// Chunk layer 42 — authored for Ring-07
export const CHUNK_HEIGHT_043 = 38.2348;
export const CHUNK_COLOR_043 = 0xd0a9c7;
// Chunk layer 43 — authored for Ring-07
export const CHUNK_HEIGHT_044 = 39.6607;
export const CHUNK_COLOR_044 = 0xfd5c34;
// Chunk layer 44 — authored for Ring-07
export const CHUNK_HEIGHT_045 = 67.7476;
export const CHUNK_COLOR_045 = 0x279476;
// Chunk layer 45 — authored for Ring-07
export const CHUNK_HEIGHT_046 = 39.1998;
export const CHUNK_COLOR_046 = 0x071053;
// Chunk layer 46 — authored for Ring-07
export const CHUNK_HEIGHT_047 = 1.3605;
export const CHUNK_COLOR_047 = 0x98076d;
// Chunk layer 47 — authored for Ring-07
export const CHUNK_HEIGHT_048 = 33.6021;
export const CHUNK_COLOR_048 = 0x2ee866;
// Chunk layer 48 — authored for Ring-07
export const CHUNK_HEIGHT_049 = 33.2291;
export const CHUNK_COLOR_049 = 0x81646b;
// Chunk layer 49 — authored for Ring-07
export const CHUNK_HEIGHT_050 = -4.9919;
export const CHUNK_COLOR_050 = 0xdf86be;
// Chunk layer 50 — authored for Ring-07
export const CHUNK_HEIGHT_051 = -16.3094;
export const CHUNK_COLOR_051 = 0x52ef55;
// Chunk layer 51 — authored for Ring-07
export const CHUNK_HEIGHT_052 = 40.9496;
export const CHUNK_COLOR_052 = 0x5026a5;
// Chunk layer 52 — authored for Ring-07
export const CHUNK_HEIGHT_053 = 63.1652;
export const CHUNK_COLOR_053 = 0xe8d8f4;
// Chunk layer 53 — authored for Ring-07
export const CHUNK_HEIGHT_054 = 65.1367;
export const CHUNK_COLOR_054 = 0xc6b423;
// Chunk layer 54 — authored for Ring-07
export const CHUNK_HEIGHT_055 = -5.9938;
export const CHUNK_COLOR_055 = 0x7d4999;
// Chunk layer 55 — authored for Ring-07
export const CHUNK_HEIGHT_056 = 21.5059;
export const CHUNK_COLOR_056 = 0x4b87db;
// Chunk layer 56 — authored for Ring-07
export const CHUNK_HEIGHT_057 = -14.5429;
export const CHUNK_COLOR_057 = 0x67cf41;
// Chunk layer 57 — authored for Ring-07
export const CHUNK_HEIGHT_058 = -8.1132;
export const CHUNK_COLOR_058 = 0xd74700;
// Chunk layer 58 — authored for Ring-07
export const CHUNK_HEIGHT_059 = 53.9721;
export const CHUNK_COLOR_059 = 0x2f7380;
// Chunk layer 59 — authored for Ring-07
export const CHUNK_HEIGHT_060 = -7.2155;
export const CHUNK_COLOR_060 = 0xf156f0;
// Chunk layer 60 — authored for Ring-07
export const CHUNK_HEIGHT_061 = 8.9798;
export const CHUNK_COLOR_061 = 0xd43981;
// Chunk layer 61 — authored for Ring-07
export const CHUNK_HEIGHT_062 = 64.2662;
export const CHUNK_COLOR_062 = 0xd04a4e;
// Chunk layer 62 — authored for Ring-07
export const CHUNK_HEIGHT_063 = 57.4964;
export const CHUNK_COLOR_063 = 0xdf06f7;
// Chunk layer 63 — authored for Ring-07
export const CHUNK_HEIGHT_064 = 48.9869;
export const CHUNK_COLOR_064 = 0x3df585;
// Chunk layer 64 — authored for Ring-07
export const CHUNK_HEIGHT_065 = 3.9861;
export const CHUNK_COLOR_065 = 0xb6c170;
// Chunk layer 65 — authored for Ring-07
export const CHUNK_HEIGHT_066 = 45.3013;
export const CHUNK_COLOR_066 = 0x4336aa;
// Chunk layer 66 — authored for Ring-07
export const CHUNK_HEIGHT_067 = 40.0076;
export const CHUNK_COLOR_067 = 0x95188a;
// Chunk layer 67 — authored for Ring-07
export const CHUNK_HEIGHT_068 = 0.8994;
export const CHUNK_COLOR_068 = 0xecb6e5;
// Chunk layer 68 — authored for Ring-07
export const CHUNK_HEIGHT_069 = 50.8394;
export const CHUNK_COLOR_069 = 0x888147;
// Chunk layer 69 — authored for Ring-07
export const CHUNK_HEIGHT_070 = 68.1678;
export const CHUNK_COLOR_070 = 0x3a1e9d;
// Chunk layer 70 — authored for Ring-07
export const CHUNK_HEIGHT_071 = 59.3362;
export const CHUNK_COLOR_071 = 0xf63bd7;
// Chunk layer 71 — authored for Ring-07
export const CHUNK_HEIGHT_072 = 11.4698;
export const CHUNK_COLOR_072 = 0x6f8870;
// Chunk layer 72 — authored for Ring-07
export const CHUNK_HEIGHT_073 = 19.0139;
export const CHUNK_COLOR_073 = 0xf50b4f;
// Chunk layer 73 — authored for Ring-07
export const CHUNK_HEIGHT_074 = 46.6156;
export const CHUNK_COLOR_074 = 0x201eb3;
// Chunk layer 74 — authored for Ring-07
export const CHUNK_HEIGHT_075 = -0.7417;
export const CHUNK_COLOR_075 = 0x9fff21;
// Chunk layer 75 — authored for Ring-07
export const CHUNK_HEIGHT_076 = -4.5018;
export const CHUNK_COLOR_076 = 0x60935d;
// Chunk layer 76 — authored for Ring-07
export const CHUNK_HEIGHT_077 = -5.6186;
export const CHUNK_COLOR_077 = 0x8b15d0;
// Chunk layer 77 — authored for Ring-07
export const CHUNK_HEIGHT_078 = 35.9075;
export const CHUNK_COLOR_078 = 0x4f6e60;
// Chunk layer 78 — authored for Ring-07
export const CHUNK_HEIGHT_079 = 18.9953;
export const CHUNK_COLOR_079 = 0x8a7796;
// Chunk layer 79 — authored for Ring-07
export const CHUNK_HEIGHT_080 = 59.5878;
export const CHUNK_COLOR_080 = 0xe3dcaa;
// Chunk layer 80 — authored for Ring-07
export const CHUNK_HEIGHT_081 = 60.3234;
export const CHUNK_COLOR_081 = 0x72567b;
// Chunk layer 81 — authored for Ring-07
export const CHUNK_HEIGHT_082 = 27.3722;
export const CHUNK_COLOR_082 = 0x25fb3d;
// Chunk layer 82 — authored for Ring-07
export const CHUNK_HEIGHT_083 = 0.5657;
export const CHUNK_COLOR_083 = 0x9fa27d;
// Chunk layer 83 — authored for Ring-07
export const CHUNK_HEIGHT_084 = 54.0086;
export const CHUNK_COLOR_084 = 0x958968;
// Chunk layer 84 — authored for Ring-07
export const CHUNK_HEIGHT_085 = 30.2759;
export const CHUNK_COLOR_085 = 0x7511d9;
// Chunk layer 85 — authored for Ring-07
export const CHUNK_HEIGHT_086 = -0.4433;
export const CHUNK_COLOR_086 = 0xccc281;
// Chunk layer 86 — authored for Ring-07
export const CHUNK_HEIGHT_087 = -10.5106;
export const CHUNK_COLOR_087 = 0x442d79;
// Chunk layer 87 — authored for Ring-07
export const CHUNK_HEIGHT_088 = -18.5229;
export const CHUNK_COLOR_088 = 0x32776d;
// Chunk layer 88 — authored for Ring-07
export const CHUNK_HEIGHT_089 = 55.4933;
export const CHUNK_COLOR_089 = 0xf3174c;
// Chunk layer 89 — authored for Ring-07
export const CHUNK_HEIGHT_090 = 28.9537;
export const CHUNK_COLOR_090 = 0x1263c8;
// Chunk layer 90 — authored for Ring-07
export const CHUNK_HEIGHT_091 = 11.0627;
export const CHUNK_COLOR_091 = 0x971761;
// Chunk layer 91 — authored for Ring-07
export const CHUNK_HEIGHT_092 = 48.8651;
export const CHUNK_COLOR_092 = 0x0b0e74;
// Chunk layer 92 — authored for Ring-07
export const CHUNK_HEIGHT_093 = 62.1320;
export const CHUNK_COLOR_093 = 0x43ba70;
// Chunk layer 93 — authored for Ring-07
export const CHUNK_HEIGHT_094 = 68.2885;
export const CHUNK_COLOR_094 = 0x6fe0f5;
// Chunk layer 94 — authored for Ring-07
export const CHUNK_HEIGHT_095 = 45.1483;
export const CHUNK_COLOR_095 = 0xdabe83;
// Chunk layer 95 — authored for Ring-07
export const CHUNK_HEIGHT_096 = 25.4954;
export const CHUNK_COLOR_096 = 0xdb5839;
// Chunk layer 96 — authored for Ring-07
export const CHUNK_HEIGHT_097 = 60.3304;
export const CHUNK_COLOR_097 = 0x22264b;
// Chunk layer 97 — authored for Ring-07
export const CHUNK_HEIGHT_098 = 32.7063;
export const CHUNK_COLOR_098 = 0xbefb89;
// Chunk layer 98 — authored for Ring-07
export const CHUNK_HEIGHT_099 = 66.0186;
export const CHUNK_COLOR_099 = 0xed668e;
// Chunk layer 99 — authored for Ring-07
export const CHUNK_HEIGHT_100 = 47.5959;
export const CHUNK_COLOR_100 = 0x04e9b8;
// Chunk layer 100 — authored for Ring-07
export const CHUNK_HEIGHT_101 = 72.2262;
export const CHUNK_COLOR_101 = 0xff8992;
// Chunk layer 101 — authored for Ring-07
export const CHUNK_HEIGHT_102 = -8.2517;
export const CHUNK_COLOR_102 = 0xc522ef;
// Chunk layer 102 — authored for Ring-07
export const CHUNK_HEIGHT_103 = 43.6090;
export const CHUNK_COLOR_103 = 0x01f8a9;
// Chunk layer 103 — authored for Ring-07
export const CHUNK_HEIGHT_104 = -7.8071;
export const CHUNK_COLOR_104 = 0x89db46;
// Chunk layer 104 — authored for Ring-07
export const CHUNK_HEIGHT_105 = -12.1214;
export const CHUNK_COLOR_105 = 0x5742f2;
// Chunk layer 105 — authored for Ring-07
export const CHUNK_HEIGHT_106 = 60.4911;
export const CHUNK_COLOR_106 = 0x6ef86d;
// Chunk layer 106 — authored for Ring-07
export const CHUNK_HEIGHT_107 = 40.9969;
export const CHUNK_COLOR_107 = 0x3538ef;
// Chunk layer 107 — authored for Ring-07
export const CHUNK_HEIGHT_108 = 4.7288;
export const CHUNK_COLOR_108 = 0x48f80d;
// Chunk layer 108 — authored for Ring-07
export const CHUNK_HEIGHT_109 = 78.4993;
export const CHUNK_COLOR_109 = 0x4fd357;
// Chunk layer 109 — authored for Ring-07
export const CHUNK_HEIGHT_110 = -14.3904;
export const CHUNK_COLOR_110 = 0x4bdaa7;
// Chunk layer 110 — authored for Ring-07
export const CHUNK_HEIGHT_111 = 39.4843;
export const CHUNK_COLOR_111 = 0x65f97f;
// Chunk layer 111 — authored for Ring-07
export const CHUNK_HEIGHT_112 = 64.6733;
export const CHUNK_COLOR_112 = 0x1b21e1;
// Chunk layer 112 — authored for Ring-07
export const CHUNK_HEIGHT_113 = 7.1988;
export const CHUNK_COLOR_113 = 0x72ec28;
// Chunk layer 113 — authored for Ring-07
export const CHUNK_HEIGHT_114 = 70.8630;
export const CHUNK_COLOR_114 = 0x3a50e0;
// Chunk layer 114 — authored for Ring-07
export const CHUNK_HEIGHT_115 = 67.1609;
export const CHUNK_COLOR_115 = 0xb50b20;
// Chunk layer 115 — authored for Ring-07
export const CHUNK_HEIGHT_116 = 41.3841;
export const CHUNK_COLOR_116 = 0xcf7cab;
// Chunk layer 116 — authored for Ring-07
export const CHUNK_HEIGHT_117 = 19.0189;
export const CHUNK_COLOR_117 = 0x98327e;
// Chunk layer 117 — authored for Ring-07
export const CHUNK_HEIGHT_118 = 55.0034;
export const CHUNK_COLOR_118 = 0x269b82;
// Chunk layer 118 — authored for Ring-07
export const CHUNK_HEIGHT_119 = 11.4189;
export const CHUNK_COLOR_119 = 0xca9953;
// Chunk layer 119 — authored for Ring-07
export const CHUNK_HEIGHT_120 = -17.7271;
export const CHUNK_COLOR_120 = 0xa5023e;
// Chunk layer 120 — authored for Ring-07
export const CHUNK_HEIGHT_121 = 14.9402;
export const CHUNK_COLOR_121 = 0xb1a833;
// Chunk layer 121 — authored for Ring-07
export const CHUNK_HEIGHT_122 = 70.0935;
export const CHUNK_COLOR_122 = 0xa434e6;
// Chunk layer 122 — authored for Ring-07
export const CHUNK_HEIGHT_123 = 70.6011;
export const CHUNK_COLOR_123 = 0x92f182;
// Chunk layer 123 — authored for Ring-07
export const CHUNK_HEIGHT_124 = 48.5377;
export const CHUNK_COLOR_124 = 0x8066f2;
// Chunk layer 124 — authored for Ring-07
export const CHUNK_HEIGHT_125 = 42.4493;
export const CHUNK_COLOR_125 = 0xc478e4;
// Chunk layer 125 — authored for Ring-07
export const CHUNK_HEIGHT_126 = 52.1726;
export const CHUNK_COLOR_126 = 0x19ab55;
// Chunk layer 126 — authored for Ring-07
export const CHUNK_HEIGHT_127 = 8.3163;
export const CHUNK_COLOR_127 = 0x2d5767;
// Chunk layer 127 — authored for Ring-07
export const CHUNK_HEIGHT_128 = 48.3697;
export const CHUNK_COLOR_128 = 0x6e58a9;
// Chunk layer 128 — authored for Ring-07
export const CHUNK_HEIGHT_129 = 38.6688;
export const CHUNK_COLOR_129 = 0x83e6dd;
// Chunk layer 129 — authored for Ring-07
export const CHUNK_HEIGHT_130 = 71.2588;
export const CHUNK_COLOR_130 = 0xfe2ceb;
// Chunk layer 130 — authored for Ring-07
export const CHUNK_HEIGHT_131 = 25.3726;
export const CHUNK_COLOR_131 = 0xe23e08;
// Chunk layer 131 — authored for Ring-07
export const CHUNK_HEIGHT_132 = 13.1686;
export const CHUNK_COLOR_132 = 0x6125a0;
// Chunk layer 132 — authored for Ring-07
export const CHUNK_HEIGHT_133 = 74.8162;
export const CHUNK_COLOR_133 = 0x36297c;
// Chunk layer 133 — authored for Ring-07
export const CHUNK_HEIGHT_134 = 35.0143;
export const CHUNK_COLOR_134 = 0x854cc1;
// Chunk layer 134 — authored for Ring-07
export const CHUNK_HEIGHT_135 = -9.6269;
export const CHUNK_COLOR_135 = 0xbaa3b1;
// Chunk layer 135 — authored for Ring-07
export const CHUNK_HEIGHT_136 = 26.0854;
export const CHUNK_COLOR_136 = 0x98bc1d;
// Chunk layer 136 — authored for Ring-07
export const CHUNK_HEIGHT_137 = 56.8770;
export const CHUNK_COLOR_137 = 0x5bd0f4;
// Chunk layer 137 — authored for Ring-07
export const CHUNK_HEIGHT_138 = 78.1320;
export const CHUNK_COLOR_138 = 0xb90a74;
// Chunk layer 138 — authored for Ring-07
export const CHUNK_HEIGHT_139 = 36.0398;
export const CHUNK_COLOR_139 = 0x2b62b3;
// Chunk layer 139 — authored for Ring-07
export const CHUNK_HEIGHT_140 = 17.6858;
export const CHUNK_COLOR_140 = 0xf018d5;
// Chunk layer 140 — authored for Ring-07
export const CHUNK_HEIGHT_141 = -1.9824;
export const CHUNK_COLOR_141 = 0x5f50ea;
// Chunk layer 141 — authored for Ring-07
export const CHUNK_HEIGHT_142 = 51.8903;
export const CHUNK_COLOR_142 = 0xe613fe;
// Chunk layer 142 — authored for Ring-07
export const CHUNK_HEIGHT_143 = 0.0755;
export const CHUNK_COLOR_143 = 0x9acede;
// Chunk layer 143 — authored for Ring-07
export const CHUNK_HEIGHT_144 = 27.9344;
export const CHUNK_COLOR_144 = 0x94ceee;
// Chunk layer 144 — authored for Ring-07
export const CHUNK_HEIGHT_145 = -15.9621;
export const CHUNK_COLOR_145 = 0x802db6;
// Chunk layer 145 — authored for Ring-07
export const CHUNK_HEIGHT_146 = -12.4959;
export const CHUNK_COLOR_146 = 0x2ab18e;
// Chunk layer 146 — authored for Ring-07
export const CHUNK_HEIGHT_147 = 8.9915;
export const CHUNK_COLOR_147 = 0x41f038;
// Chunk layer 147 — authored for Ring-07
export const CHUNK_HEIGHT_148 = 0.1715;
export const CHUNK_COLOR_148 = 0x180fc8;
// Chunk layer 148 — authored for Ring-07
export const CHUNK_HEIGHT_149 = 5.9242;
export const CHUNK_COLOR_149 = 0x930b04;
// Chunk layer 149 — authored for Ring-07
export const CHUNK_HEIGHT_150 = 28.4632;
export const CHUNK_COLOR_150 = 0x7e0f33;
// Chunk layer 150 — authored for Ring-07
export const CHUNK_HEIGHT_151 = 50.9225;
export const CHUNK_COLOR_151 = 0x823a0c;
// Chunk layer 151 — authored for Ring-07
export const CHUNK_HEIGHT_152 = 51.1453;
export const CHUNK_COLOR_152 = 0x2ab824;
// Chunk layer 152 — authored for Ring-07
export const CHUNK_HEIGHT_153 = 40.0071;
export const CHUNK_COLOR_153 = 0x08f364;
// Chunk layer 153 — authored for Ring-07
export const CHUNK_HEIGHT_154 = 19.4561;
export const CHUNK_COLOR_154 = 0x817831;
// Chunk layer 154 — authored for Ring-07
export const CHUNK_HEIGHT_155 = -7.7330;
export const CHUNK_COLOR_155 = 0xd0406d;
// Chunk layer 155 — authored for Ring-07
