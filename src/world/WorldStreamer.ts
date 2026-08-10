/**
 * NEXUS: FRAGMENT — WORLD/WorldStreamer
 * World generation — WorldStreamer
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

import * as THREE from 'three';

export interface WorldStreamerLayer { height: number; color: THREE.Color; roughness: number; }
export const WORLDSTREAMER_SEED = 98605;

export class WorldStreamer {
  private layers: WorldStreamerLayer[] = [];
  constructor(public seed:number=WORLDSTREAMER_SEED){}

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
export const WORLDSTREAMER_HEIGHT_000 = 63.3990;
export const WORLDSTREAMER_COLOR_000 = 0x07a83a;
// WorldStreamer layer 0 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_001 = 24.8595;
export const WORLDSTREAMER_COLOR_001 = 0xb1561f;
// WorldStreamer layer 1 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_002 = 53.4806;
export const WORLDSTREAMER_COLOR_002 = 0x7a440c;
// WorldStreamer layer 2 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_003 = 56.4379;
export const WORLDSTREAMER_COLOR_003 = 0xc55795;
// WorldStreamer layer 3 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_004 = 67.3513;
export const WORLDSTREAMER_COLOR_004 = 0xdfa27b;
// WorldStreamer layer 4 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_005 = -4.4614;
export const WORLDSTREAMER_COLOR_005 = 0xf2bc08;
// WorldStreamer layer 5 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_006 = 40.5940;
export const WORLDSTREAMER_COLOR_006 = 0x9736e4;
// WorldStreamer layer 6 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_007 = 65.8936;
export const WORLDSTREAMER_COLOR_007 = 0x4b703b;
// WorldStreamer layer 7 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_008 = -7.0518;
export const WORLDSTREAMER_COLOR_008 = 0x23f224;
// WorldStreamer layer 8 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_009 = 25.0661;
export const WORLDSTREAMER_COLOR_009 = 0x8adc14;
// WorldStreamer layer 9 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_010 = 0.6157;
export const WORLDSTREAMER_COLOR_010 = 0x2f5d5f;
// WorldStreamer layer 10 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_011 = 44.9543;
export const WORLDSTREAMER_COLOR_011 = 0x1e5d16;
// WorldStreamer layer 11 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_012 = 39.6151;
export const WORLDSTREAMER_COLOR_012 = 0x62dee5;
// WorldStreamer layer 12 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_013 = -1.9987;
export const WORLDSTREAMER_COLOR_013 = 0x5c5f80;
// WorldStreamer layer 13 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_014 = 58.0774;
export const WORLDSTREAMER_COLOR_014 = 0x917d0a;
// WorldStreamer layer 14 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_015 = 29.3211;
export const WORLDSTREAMER_COLOR_015 = 0x5f3c83;
// WorldStreamer layer 15 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_016 = 28.6460;
export const WORLDSTREAMER_COLOR_016 = 0x31c7f5;
// WorldStreamer layer 16 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_017 = 46.0813;
export const WORLDSTREAMER_COLOR_017 = 0x786250;
// WorldStreamer layer 17 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_018 = -3.6232;
export const WORLDSTREAMER_COLOR_018 = 0xe62705;
// WorldStreamer layer 18 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_019 = 32.3953;
export const WORLDSTREAMER_COLOR_019 = 0x37d417;
// WorldStreamer layer 19 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_020 = -8.3498;
export const WORLDSTREAMER_COLOR_020 = 0xe1d512;
// WorldStreamer layer 20 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_021 = 47.0223;
export const WORLDSTREAMER_COLOR_021 = 0x6ead4c;
// WorldStreamer layer 21 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_022 = 43.6272;
export const WORLDSTREAMER_COLOR_022 = 0x264d89;
// WorldStreamer layer 22 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_023 = 1.8812;
export const WORLDSTREAMER_COLOR_023 = 0x91e19a;
// WorldStreamer layer 23 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_024 = 54.0687;
export const WORLDSTREAMER_COLOR_024 = 0xa7aa49;
// WorldStreamer layer 24 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_025 = 77.1791;
export const WORLDSTREAMER_COLOR_025 = 0x6c6ba7;
// WorldStreamer layer 25 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_026 = 72.8654;
export const WORLDSTREAMER_COLOR_026 = 0x631703;
// WorldStreamer layer 26 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_027 = 62.5268;
export const WORLDSTREAMER_COLOR_027 = 0x0c66e9;
// WorldStreamer layer 27 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_028 = 16.4011;
export const WORLDSTREAMER_COLOR_028 = 0x5572ff;
// WorldStreamer layer 28 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_029 = 63.2385;
export const WORLDSTREAMER_COLOR_029 = 0x602433;
// WorldStreamer layer 29 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_030 = 6.4716;
export const WORLDSTREAMER_COLOR_030 = 0x60be27;
// WorldStreamer layer 30 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_031 = 31.4960;
export const WORLDSTREAMER_COLOR_031 = 0xb1459a;
// WorldStreamer layer 31 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_032 = 12.3398;
export const WORLDSTREAMER_COLOR_032 = 0x4d8cb9;
// WorldStreamer layer 32 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_033 = 3.0900;
export const WORLDSTREAMER_COLOR_033 = 0xbf1772;
// WorldStreamer layer 33 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_034 = 16.7730;
export const WORLDSTREAMER_COLOR_034 = 0x0837be;
// WorldStreamer layer 34 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_035 = 63.0188;
export const WORLDSTREAMER_COLOR_035 = 0xeb8bbe;
// WorldStreamer layer 35 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_036 = -9.6392;
export const WORLDSTREAMER_COLOR_036 = 0x78358c;
// WorldStreamer layer 36 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_037 = 51.0041;
export const WORLDSTREAMER_COLOR_037 = 0xd3f313;
// WorldStreamer layer 37 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_038 = 49.5034;
export const WORLDSTREAMER_COLOR_038 = 0x65176d;
// WorldStreamer layer 38 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_039 = 39.9584;
export const WORLDSTREAMER_COLOR_039 = 0x0b181b;
// WorldStreamer layer 39 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_040 = 7.1211;
export const WORLDSTREAMER_COLOR_040 = 0xc6e96f;
// WorldStreamer layer 40 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_041 = 10.8841;
export const WORLDSTREAMER_COLOR_041 = 0x0fdb47;
// WorldStreamer layer 41 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_042 = 27.9822;
export const WORLDSTREAMER_COLOR_042 = 0x69e548;
// WorldStreamer layer 42 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_043 = 28.7880;
export const WORLDSTREAMER_COLOR_043 = 0x88a649;
// WorldStreamer layer 43 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_044 = -1.1168;
export const WORLDSTREAMER_COLOR_044 = 0x0f8ffd;
// WorldStreamer layer 44 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_045 = 76.7686;
export const WORLDSTREAMER_COLOR_045 = 0x6c5870;
// WorldStreamer layer 45 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_046 = -15.0503;
export const WORLDSTREAMER_COLOR_046 = 0x606b5f;
// WorldStreamer layer 46 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_047 = 70.6794;
export const WORLDSTREAMER_COLOR_047 = 0x3c6d8c;
// WorldStreamer layer 47 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_048 = 63.5814;
export const WORLDSTREAMER_COLOR_048 = 0x1ad7d0;
// WorldStreamer layer 48 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_049 = -16.2861;
export const WORLDSTREAMER_COLOR_049 = 0x33b012;
// WorldStreamer layer 49 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_050 = 62.1740;
export const WORLDSTREAMER_COLOR_050 = 0xa1b3bc;
// WorldStreamer layer 50 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_051 = 9.2130;
export const WORLDSTREAMER_COLOR_051 = 0x258614;
// WorldStreamer layer 51 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_052 = 45.0880;
export const WORLDSTREAMER_COLOR_052 = 0x5b87fc;
// WorldStreamer layer 52 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_053 = 5.7490;
export const WORLDSTREAMER_COLOR_053 = 0x9cb3a8;
// WorldStreamer layer 53 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_054 = 30.0190;
export const WORLDSTREAMER_COLOR_054 = 0x0f7a47;
// WorldStreamer layer 54 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_055 = 7.5377;
export const WORLDSTREAMER_COLOR_055 = 0x186679;
// WorldStreamer layer 55 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_056 = 53.4024;
export const WORLDSTREAMER_COLOR_056 = 0x1cf6f1;
// WorldStreamer layer 56 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_057 = -15.1783;
export const WORLDSTREAMER_COLOR_057 = 0x8c76d3;
// WorldStreamer layer 57 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_058 = 56.2645;
export const WORLDSTREAMER_COLOR_058 = 0x381409;
// WorldStreamer layer 58 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_059 = -19.9510;
export const WORLDSTREAMER_COLOR_059 = 0x3bd205;
// WorldStreamer layer 59 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_060 = 12.9440;
export const WORLDSTREAMER_COLOR_060 = 0x5312d4;
// WorldStreamer layer 60 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_061 = -5.9098;
export const WORLDSTREAMER_COLOR_061 = 0xd3591b;
// WorldStreamer layer 61 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_062 = 70.2793;
export const WORLDSTREAMER_COLOR_062 = 0x0de32f;
// WorldStreamer layer 62 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_063 = 19.7895;
export const WORLDSTREAMER_COLOR_063 = 0x05d8d7;
// WorldStreamer layer 63 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_064 = 74.0275;
export const WORLDSTREAMER_COLOR_064 = 0xfb8429;
// WorldStreamer layer 64 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_065 = -13.9836;
export const WORLDSTREAMER_COLOR_065 = 0x007ae8;
// WorldStreamer layer 65 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_066 = 35.0448;
export const WORLDSTREAMER_COLOR_066 = 0xe9a299;
// WorldStreamer layer 66 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_067 = 39.3970;
export const WORLDSTREAMER_COLOR_067 = 0xc27d64;
// WorldStreamer layer 67 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_068 = 54.9446;
export const WORLDSTREAMER_COLOR_068 = 0x07c059;
// WorldStreamer layer 68 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_069 = 71.8594;
export const WORLDSTREAMER_COLOR_069 = 0xf2a8e7;
// WorldStreamer layer 69 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_070 = 67.6739;
export const WORLDSTREAMER_COLOR_070 = 0x3a598f;
// WorldStreamer layer 70 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_071 = 62.5112;
export const WORLDSTREAMER_COLOR_071 = 0xbe0523;
// WorldStreamer layer 71 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_072 = 53.3626;
export const WORLDSTREAMER_COLOR_072 = 0x70aa41;
// WorldStreamer layer 72 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_073 = 75.1771;
export const WORLDSTREAMER_COLOR_073 = 0x2a80bb;
// WorldStreamer layer 73 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_074 = 25.4831;
export const WORLDSTREAMER_COLOR_074 = 0xb9a37e;
// WorldStreamer layer 74 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_075 = 58.9478;
export const WORLDSTREAMER_COLOR_075 = 0x8dd5c6;
// WorldStreamer layer 75 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_076 = 67.8113;
export const WORLDSTREAMER_COLOR_076 = 0x6b834e;
// WorldStreamer layer 76 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_077 = 49.7262;
export const WORLDSTREAMER_COLOR_077 = 0xa9388a;
// WorldStreamer layer 77 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_078 = 36.9968;
export const WORLDSTREAMER_COLOR_078 = 0x13c982;
// WorldStreamer layer 78 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_079 = 73.9470;
export const WORLDSTREAMER_COLOR_079 = 0x60062c;
// WorldStreamer layer 79 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_080 = 26.3454;
export const WORLDSTREAMER_COLOR_080 = 0x902c9f;
// WorldStreamer layer 80 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_081 = 40.0343;
export const WORLDSTREAMER_COLOR_081 = 0x61b386;
// WorldStreamer layer 81 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_082 = 12.0969;
export const WORLDSTREAMER_COLOR_082 = 0xe205a2;
// WorldStreamer layer 82 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_083 = -13.6094;
export const WORLDSTREAMER_COLOR_083 = 0xd0eb4e;
// WorldStreamer layer 83 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_084 = 70.0744;
export const WORLDSTREAMER_COLOR_084 = 0xab4ef1;
// WorldStreamer layer 84 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_085 = 37.9602;
export const WORLDSTREAMER_COLOR_085 = 0x019e0b;
// WorldStreamer layer 85 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_086 = 10.9603;
export const WORLDSTREAMER_COLOR_086 = 0xe4f128;
// WorldStreamer layer 86 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_087 = 38.7364;
export const WORLDSTREAMER_COLOR_087 = 0x07b960;
// WorldStreamer layer 87 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_088 = 52.3707;
export const WORLDSTREAMER_COLOR_088 = 0xd8a898;
// WorldStreamer layer 88 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_089 = 28.8749;
export const WORLDSTREAMER_COLOR_089 = 0x7676af;
// WorldStreamer layer 89 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_090 = -3.6309;
export const WORLDSTREAMER_COLOR_090 = 0x8f3641;
// WorldStreamer layer 90 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_091 = 79.9475;
export const WORLDSTREAMER_COLOR_091 = 0x777953;
// WorldStreamer layer 91 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_092 = 20.8509;
export const WORLDSTREAMER_COLOR_092 = 0x2597de;
// WorldStreamer layer 92 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_093 = 12.0720;
export const WORLDSTREAMER_COLOR_093 = 0x99a72c;
// WorldStreamer layer 93 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_094 = 49.7422;
export const WORLDSTREAMER_COLOR_094 = 0x267d5d;
// WorldStreamer layer 94 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_095 = 36.3247;
export const WORLDSTREAMER_COLOR_095 = 0x2e42e7;
// WorldStreamer layer 95 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_096 = 2.7280;
export const WORLDSTREAMER_COLOR_096 = 0x946f69;
// WorldStreamer layer 96 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_097 = 14.1814;
export const WORLDSTREAMER_COLOR_097 = 0xa08301;
// WorldStreamer layer 97 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_098 = 30.5620;
export const WORLDSTREAMER_COLOR_098 = 0x834f3a;
// WorldStreamer layer 98 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_099 = 27.7535;
export const WORLDSTREAMER_COLOR_099 = 0xca1fb8;
// WorldStreamer layer 99 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_100 = 47.7007;
export const WORLDSTREAMER_COLOR_100 = 0xd25142;
// WorldStreamer layer 100 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_101 = 66.7999;
export const WORLDSTREAMER_COLOR_101 = 0x42df07;
// WorldStreamer layer 101 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_102 = 24.9989;
export const WORLDSTREAMER_COLOR_102 = 0x4e055a;
// WorldStreamer layer 102 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_103 = 70.4721;
export const WORLDSTREAMER_COLOR_103 = 0x21fe43;
// WorldStreamer layer 103 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_104 = 25.5595;
export const WORLDSTREAMER_COLOR_104 = 0x1a1cc5;
// WorldStreamer layer 104 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_105 = 54.1125;
export const WORLDSTREAMER_COLOR_105 = 0x984806;
// WorldStreamer layer 105 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_106 = 73.7209;
export const WORLDSTREAMER_COLOR_106 = 0x765f05;
// WorldStreamer layer 106 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_107 = 19.3278;
export const WORLDSTREAMER_COLOR_107 = 0xaee5fd;
// WorldStreamer layer 107 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_108 = 4.2781;
export const WORLDSTREAMER_COLOR_108 = 0x09d160;
// WorldStreamer layer 108 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_109 = 60.1902;
export const WORLDSTREAMER_COLOR_109 = 0x676606;
// WorldStreamer layer 109 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_110 = -14.5253;
export const WORLDSTREAMER_COLOR_110 = 0x76cd03;
// WorldStreamer layer 110 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_111 = 58.1769;
export const WORLDSTREAMER_COLOR_111 = 0x027197;
// WorldStreamer layer 111 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_112 = 9.5694;
export const WORLDSTREAMER_COLOR_112 = 0xc71f46;
// WorldStreamer layer 112 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_113 = 45.6295;
export const WORLDSTREAMER_COLOR_113 = 0x5bd42e;
// WorldStreamer layer 113 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_114 = -9.2532;
export const WORLDSTREAMER_COLOR_114 = 0x598ab2;
// WorldStreamer layer 114 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_115 = 17.4823;
export const WORLDSTREAMER_COLOR_115 = 0x055a6f;
// WorldStreamer layer 115 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_116 = 3.3278;
export const WORLDSTREAMER_COLOR_116 = 0x027e02;
// WorldStreamer layer 116 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_117 = 18.3311;
export const WORLDSTREAMER_COLOR_117 = 0x4dc539;
// WorldStreamer layer 117 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_118 = 60.9914;
export const WORLDSTREAMER_COLOR_118 = 0xbd47a8;
// WorldStreamer layer 118 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_119 = 7.1516;
export const WORLDSTREAMER_COLOR_119 = 0xd011f9;
// WorldStreamer layer 119 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_120 = 70.2855;
export const WORLDSTREAMER_COLOR_120 = 0x5bd0a4;
// WorldStreamer layer 120 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_121 = 59.5403;
export const WORLDSTREAMER_COLOR_121 = 0x62c074;
// WorldStreamer layer 121 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_122 = 50.7009;
export const WORLDSTREAMER_COLOR_122 = 0xc170b3;
// WorldStreamer layer 122 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_123 = 79.6397;
export const WORLDSTREAMER_COLOR_123 = 0x873210;
// WorldStreamer layer 123 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_124 = 28.2058;
export const WORLDSTREAMER_COLOR_124 = 0x89529b;
// WorldStreamer layer 124 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_125 = 45.3267;
export const WORLDSTREAMER_COLOR_125 = 0x26fd10;
// WorldStreamer layer 125 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_126 = 68.7051;
export const WORLDSTREAMER_COLOR_126 = 0xacc252;
// WorldStreamer layer 126 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_127 = 78.2956;
export const WORLDSTREAMER_COLOR_127 = 0x31b531;
// WorldStreamer layer 127 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_128 = 75.6534;
export const WORLDSTREAMER_COLOR_128 = 0x8ee8d4;
// WorldStreamer layer 128 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_129 = 1.5467;
export const WORLDSTREAMER_COLOR_129 = 0x622c48;
// WorldStreamer layer 129 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_130 = -5.5910;
export const WORLDSTREAMER_COLOR_130 = 0x65028a;
// WorldStreamer layer 130 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_131 = 49.2957;
export const WORLDSTREAMER_COLOR_131 = 0x6cc7b6;
// WorldStreamer layer 131 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_132 = 76.7944;
export const WORLDSTREAMER_COLOR_132 = 0x671043;
// WorldStreamer layer 132 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_133 = 55.3443;
export const WORLDSTREAMER_COLOR_133 = 0x243152;
// WorldStreamer layer 133 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_134 = 59.0014;
export const WORLDSTREAMER_COLOR_134 = 0x3a1dba;
// WorldStreamer layer 134 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_135 = 32.6435;
export const WORLDSTREAMER_COLOR_135 = 0x515cbd;
// WorldStreamer layer 135 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_136 = -5.3423;
export const WORLDSTREAMER_COLOR_136 = 0xd796a3;
// WorldStreamer layer 136 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_137 = 28.0873;
export const WORLDSTREAMER_COLOR_137 = 0x81474e;
// WorldStreamer layer 137 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_138 = 27.6014;
export const WORLDSTREAMER_COLOR_138 = 0x17c387;
// WorldStreamer layer 138 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_139 = -13.8617;
export const WORLDSTREAMER_COLOR_139 = 0x028a53;
// WorldStreamer layer 139 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_140 = 65.5443;
export const WORLDSTREAMER_COLOR_140 = 0x2da7c6;
// WorldStreamer layer 140 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_141 = 68.6939;
export const WORLDSTREAMER_COLOR_141 = 0x84de6b;
// WorldStreamer layer 141 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_142 = 22.9584;
export const WORLDSTREAMER_COLOR_142 = 0xf4e5ca;
// WorldStreamer layer 142 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_143 = -13.4057;
export const WORLDSTREAMER_COLOR_143 = 0xf54749;
// WorldStreamer layer 143 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_144 = 25.9834;
export const WORLDSTREAMER_COLOR_144 = 0xf7fa26;
// WorldStreamer layer 144 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_145 = 22.5702;
export const WORLDSTREAMER_COLOR_145 = 0x3e4ae6;
// WorldStreamer layer 145 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_146 = 51.5718;
export const WORLDSTREAMER_COLOR_146 = 0x6307a2;
// WorldStreamer layer 146 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_147 = -0.1396;
export const WORLDSTREAMER_COLOR_147 = 0x51a7e5;
// WorldStreamer layer 147 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_148 = -19.4174;
export const WORLDSTREAMER_COLOR_148 = 0x491272;
// WorldStreamer layer 148 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_149 = -10.3346;
export const WORLDSTREAMER_COLOR_149 = 0xa4dce9;
// WorldStreamer layer 149 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_150 = 36.9264;
export const WORLDSTREAMER_COLOR_150 = 0xb95c7a;
// WorldStreamer layer 150 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_151 = 62.2973;
export const WORLDSTREAMER_COLOR_151 = 0xb3cdda;
// WorldStreamer layer 151 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_152 = 55.6547;
export const WORLDSTREAMER_COLOR_152 = 0x7b09b4;
// WorldStreamer layer 152 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_153 = -7.3728;
export const WORLDSTREAMER_COLOR_153 = 0xd0d45b;
// WorldStreamer layer 153 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_154 = 66.4422;
export const WORLDSTREAMER_COLOR_154 = 0x15c6c8;
// WorldStreamer layer 154 — authored for Ring-07
export const WORLDSTREAMER_HEIGHT_155 = 76.6825;
export const WORLDSTREAMER_COLOR_155 = 0x2468c5;
// WorldStreamer layer 155 — authored for Ring-07
