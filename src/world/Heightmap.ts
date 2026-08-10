/**
 * NEXUS: FRAGMENT — WORLD/Heightmap
 * World generation — Heightmap
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

import * as THREE from 'three';

export interface HeightmapLayer { height: number; color: THREE.Color; roughness: number; }
export const HEIGHTMAP_SEED = 7462;

export class Heightmap {
  private layers: HeightmapLayer[] = [];
  constructor(public seed:number=HEIGHTMAP_SEED){}

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
export const HEIGHTMAP_HEIGHT_000 = -3.8798;
export const HEIGHTMAP_COLOR_000 = 0x6bb6f5;
// Heightmap layer 0 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_001 = 1.0555;
export const HEIGHTMAP_COLOR_001 = 0xaa5af8;
// Heightmap layer 1 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_002 = 55.4074;
export const HEIGHTMAP_COLOR_002 = 0x847fb5;
// Heightmap layer 2 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_003 = 50.3972;
export const HEIGHTMAP_COLOR_003 = 0x4788f2;
// Heightmap layer 3 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_004 = -19.1197;
export const HEIGHTMAP_COLOR_004 = 0xf35b56;
// Heightmap layer 4 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_005 = 44.3969;
export const HEIGHTMAP_COLOR_005 = 0x8270fc;
// Heightmap layer 5 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_006 = 9.5943;
export const HEIGHTMAP_COLOR_006 = 0xaa4c39;
// Heightmap layer 6 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_007 = 6.3389;
export const HEIGHTMAP_COLOR_007 = 0x592aff;
// Heightmap layer 7 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_008 = 78.8959;
export const HEIGHTMAP_COLOR_008 = 0x61198d;
// Heightmap layer 8 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_009 = -4.7790;
export const HEIGHTMAP_COLOR_009 = 0x5a3327;
// Heightmap layer 9 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_010 = -18.3104;
export const HEIGHTMAP_COLOR_010 = 0xb456ac;
// Heightmap layer 10 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_011 = 47.6311;
export const HEIGHTMAP_COLOR_011 = 0xcb975c;
// Heightmap layer 11 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_012 = -5.5378;
export const HEIGHTMAP_COLOR_012 = 0x236e5a;
// Heightmap layer 12 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_013 = 26.6213;
export const HEIGHTMAP_COLOR_013 = 0xc4d20c;
// Heightmap layer 13 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_014 = 63.8261;
export const HEIGHTMAP_COLOR_014 = 0x8567be;
// Heightmap layer 14 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_015 = 24.4796;
export const HEIGHTMAP_COLOR_015 = 0x55429d;
// Heightmap layer 15 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_016 = 57.6520;
export const HEIGHTMAP_COLOR_016 = 0x841014;
// Heightmap layer 16 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_017 = 21.3879;
export const HEIGHTMAP_COLOR_017 = 0x46bd9c;
// Heightmap layer 17 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_018 = -4.7988;
export const HEIGHTMAP_COLOR_018 = 0x29eff0;
// Heightmap layer 18 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_019 = 39.7140;
export const HEIGHTMAP_COLOR_019 = 0x9c6cec;
// Heightmap layer 19 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_020 = 54.8667;
export const HEIGHTMAP_COLOR_020 = 0x35d3d9;
// Heightmap layer 20 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_021 = 7.2211;
export const HEIGHTMAP_COLOR_021 = 0x6cd554;
// Heightmap layer 21 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_022 = 12.9042;
export const HEIGHTMAP_COLOR_022 = 0xf3e7f5;
// Heightmap layer 22 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_023 = 53.7581;
export const HEIGHTMAP_COLOR_023 = 0xeb00c5;
// Heightmap layer 23 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_024 = -13.2129;
export const HEIGHTMAP_COLOR_024 = 0x4f2f32;
// Heightmap layer 24 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_025 = 22.5249;
export const HEIGHTMAP_COLOR_025 = 0xdf51d9;
// Heightmap layer 25 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_026 = 57.4356;
export const HEIGHTMAP_COLOR_026 = 0xb2cbaf;
// Heightmap layer 26 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_027 = 58.5583;
export const HEIGHTMAP_COLOR_027 = 0x78710f;
// Heightmap layer 27 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_028 = 54.2477;
export const HEIGHTMAP_COLOR_028 = 0x4811ad;
// Heightmap layer 28 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_029 = 6.3067;
export const HEIGHTMAP_COLOR_029 = 0x64d099;
// Heightmap layer 29 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_030 = 7.4712;
export const HEIGHTMAP_COLOR_030 = 0xc1e9da;
// Heightmap layer 30 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_031 = 47.5037;
export const HEIGHTMAP_COLOR_031 = 0x4f22f4;
// Heightmap layer 31 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_032 = 9.7820;
export const HEIGHTMAP_COLOR_032 = 0x2b625c;
// Heightmap layer 32 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_033 = 24.0118;
export const HEIGHTMAP_COLOR_033 = 0xfbf886;
// Heightmap layer 33 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_034 = 18.4231;
export const HEIGHTMAP_COLOR_034 = 0x28836d;
// Heightmap layer 34 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_035 = 13.8077;
export const HEIGHTMAP_COLOR_035 = 0x0334f4;
// Heightmap layer 35 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_036 = 46.0437;
export const HEIGHTMAP_COLOR_036 = 0xa71379;
// Heightmap layer 36 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_037 = 50.6139;
export const HEIGHTMAP_COLOR_037 = 0xc62396;
// Heightmap layer 37 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_038 = -8.8862;
export const HEIGHTMAP_COLOR_038 = 0x5b0b90;
// Heightmap layer 38 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_039 = 43.2170;
export const HEIGHTMAP_COLOR_039 = 0x10c5c9;
// Heightmap layer 39 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_040 = 5.8255;
export const HEIGHTMAP_COLOR_040 = 0xc6833e;
// Heightmap layer 40 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_041 = -19.8869;
export const HEIGHTMAP_COLOR_041 = 0x84adb4;
// Heightmap layer 41 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_042 = 63.8324;
export const HEIGHTMAP_COLOR_042 = 0x55b467;
// Heightmap layer 42 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_043 = 16.2866;
export const HEIGHTMAP_COLOR_043 = 0x96d762;
// Heightmap layer 43 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_044 = 46.8257;
export const HEIGHTMAP_COLOR_044 = 0xd255a4;
// Heightmap layer 44 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_045 = 60.7563;
export const HEIGHTMAP_COLOR_045 = 0xefd5ee;
// Heightmap layer 45 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_046 = 2.0945;
export const HEIGHTMAP_COLOR_046 = 0x1e8e47;
// Heightmap layer 46 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_047 = 32.1590;
export const HEIGHTMAP_COLOR_047 = 0x98e829;
// Heightmap layer 47 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_048 = 9.7962;
export const HEIGHTMAP_COLOR_048 = 0xe16862;
// Heightmap layer 48 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_049 = -15.5677;
export const HEIGHTMAP_COLOR_049 = 0x15a91a;
// Heightmap layer 49 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_050 = 19.8055;
export const HEIGHTMAP_COLOR_050 = 0x661626;
// Heightmap layer 50 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_051 = 13.0354;
export const HEIGHTMAP_COLOR_051 = 0x0e0271;
// Heightmap layer 51 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_052 = 48.4205;
export const HEIGHTMAP_COLOR_052 = 0xebbbd8;
// Heightmap layer 52 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_053 = 78.1085;
export const HEIGHTMAP_COLOR_053 = 0x53d248;
// Heightmap layer 53 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_054 = 67.7024;
export const HEIGHTMAP_COLOR_054 = 0x1a39c0;
// Heightmap layer 54 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_055 = 16.5901;
export const HEIGHTMAP_COLOR_055 = 0x9eca26;
// Heightmap layer 55 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_056 = 17.9786;
export const HEIGHTMAP_COLOR_056 = 0x54bd67;
// Heightmap layer 56 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_057 = -12.8573;
export const HEIGHTMAP_COLOR_057 = 0xc5a691;
// Heightmap layer 57 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_058 = -5.6335;
export const HEIGHTMAP_COLOR_058 = 0x94c843;
// Heightmap layer 58 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_059 = 7.1252;
export const HEIGHTMAP_COLOR_059 = 0xd83b6c;
// Heightmap layer 59 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_060 = 6.1311;
export const HEIGHTMAP_COLOR_060 = 0xab1451;
// Heightmap layer 60 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_061 = 45.5838;
export const HEIGHTMAP_COLOR_061 = 0x73524f;
// Heightmap layer 61 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_062 = 24.8732;
export const HEIGHTMAP_COLOR_062 = 0xb7da0d;
// Heightmap layer 62 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_063 = -10.0811;
export const HEIGHTMAP_COLOR_063 = 0xd1e841;
// Heightmap layer 63 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_064 = 59.9988;
export const HEIGHTMAP_COLOR_064 = 0x039669;
// Heightmap layer 64 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_065 = -17.1168;
export const HEIGHTMAP_COLOR_065 = 0x709c2f;
// Heightmap layer 65 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_066 = 29.7899;
export const HEIGHTMAP_COLOR_066 = 0x8dcb13;
// Heightmap layer 66 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_067 = 22.6010;
export const HEIGHTMAP_COLOR_067 = 0xd9756a;
// Heightmap layer 67 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_068 = 53.7204;
export const HEIGHTMAP_COLOR_068 = 0x585913;
// Heightmap layer 68 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_069 = -3.6425;
export const HEIGHTMAP_COLOR_069 = 0x8544c9;
// Heightmap layer 69 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_070 = 41.3219;
export const HEIGHTMAP_COLOR_070 = 0x551b49;
// Heightmap layer 70 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_071 = 41.6420;
export const HEIGHTMAP_COLOR_071 = 0x46e748;
// Heightmap layer 71 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_072 = 38.3465;
export const HEIGHTMAP_COLOR_072 = 0xba9e03;
// Heightmap layer 72 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_073 = 46.9734;
export const HEIGHTMAP_COLOR_073 = 0x29c1b3;
// Heightmap layer 73 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_074 = 21.7806;
export const HEIGHTMAP_COLOR_074 = 0x58be02;
// Heightmap layer 74 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_075 = 50.3207;
export const HEIGHTMAP_COLOR_075 = 0x5fb147;
// Heightmap layer 75 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_076 = 46.0844;
export const HEIGHTMAP_COLOR_076 = 0xc1efd7;
// Heightmap layer 76 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_077 = 15.3420;
export const HEIGHTMAP_COLOR_077 = 0x600591;
// Heightmap layer 77 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_078 = -9.6908;
export const HEIGHTMAP_COLOR_078 = 0x10cf8c;
// Heightmap layer 78 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_079 = 22.4301;
export const HEIGHTMAP_COLOR_079 = 0xad1761;
// Heightmap layer 79 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_080 = 74.5708;
export const HEIGHTMAP_COLOR_080 = 0xd8df62;
// Heightmap layer 80 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_081 = -12.2900;
export const HEIGHTMAP_COLOR_081 = 0xa314d4;
// Heightmap layer 81 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_082 = 54.3390;
export const HEIGHTMAP_COLOR_082 = 0xb5d0e8;
// Heightmap layer 82 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_083 = 1.9728;
export const HEIGHTMAP_COLOR_083 = 0x39a353;
// Heightmap layer 83 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_084 = -1.2192;
export const HEIGHTMAP_COLOR_084 = 0xae8ae4;
// Heightmap layer 84 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_085 = 78.8072;
export const HEIGHTMAP_COLOR_085 = 0xf5cc13;
// Heightmap layer 85 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_086 = 14.1551;
export const HEIGHTMAP_COLOR_086 = 0x1b8354;
// Heightmap layer 86 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_087 = 43.0238;
export const HEIGHTMAP_COLOR_087 = 0x879e0d;
// Heightmap layer 87 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_088 = -0.1259;
export const HEIGHTMAP_COLOR_088 = 0xfc091e;
// Heightmap layer 88 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_089 = 78.8295;
export const HEIGHTMAP_COLOR_089 = 0x8f0bd1;
// Heightmap layer 89 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_090 = 13.5200;
export const HEIGHTMAP_COLOR_090 = 0x8d9213;
// Heightmap layer 90 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_091 = 78.3025;
export const HEIGHTMAP_COLOR_091 = 0x6b61b6;
// Heightmap layer 91 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_092 = 7.2602;
export const HEIGHTMAP_COLOR_092 = 0x03a850;
// Heightmap layer 92 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_093 = -5.4660;
export const HEIGHTMAP_COLOR_093 = 0x0e8f93;
// Heightmap layer 93 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_094 = 23.8296;
export const HEIGHTMAP_COLOR_094 = 0x6d1540;
// Heightmap layer 94 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_095 = 59.6986;
export const HEIGHTMAP_COLOR_095 = 0xc10894;
// Heightmap layer 95 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_096 = -9.7843;
export const HEIGHTMAP_COLOR_096 = 0xc871f5;
// Heightmap layer 96 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_097 = 48.5332;
export const HEIGHTMAP_COLOR_097 = 0x860a9f;
// Heightmap layer 97 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_098 = 4.2517;
export const HEIGHTMAP_COLOR_098 = 0x399893;
// Heightmap layer 98 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_099 = 16.4659;
export const HEIGHTMAP_COLOR_099 = 0x99be99;
// Heightmap layer 99 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_100 = 71.7380;
export const HEIGHTMAP_COLOR_100 = 0x183811;
// Heightmap layer 100 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_101 = 36.2803;
export const HEIGHTMAP_COLOR_101 = 0x02e506;
// Heightmap layer 101 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_102 = -2.2439;
export const HEIGHTMAP_COLOR_102 = 0x7a2257;
// Heightmap layer 102 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_103 = 20.4722;
export const HEIGHTMAP_COLOR_103 = 0x4bc68b;
// Heightmap layer 103 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_104 = 36.5597;
export const HEIGHTMAP_COLOR_104 = 0x57b7a4;
// Heightmap layer 104 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_105 = -12.4401;
export const HEIGHTMAP_COLOR_105 = 0x8d801e;
// Heightmap layer 105 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_106 = 76.2105;
export const HEIGHTMAP_COLOR_106 = 0x85f534;
// Heightmap layer 106 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_107 = -8.2348;
export const HEIGHTMAP_COLOR_107 = 0x9d3d92;
// Heightmap layer 107 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_108 = 78.4264;
export const HEIGHTMAP_COLOR_108 = 0xc2b1cb;
// Heightmap layer 108 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_109 = 6.5234;
export const HEIGHTMAP_COLOR_109 = 0xa11b1d;
// Heightmap layer 109 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_110 = -7.4311;
export const HEIGHTMAP_COLOR_110 = 0xc08aaa;
// Heightmap layer 110 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_111 = 6.1086;
export const HEIGHTMAP_COLOR_111 = 0x6c560f;
// Heightmap layer 111 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_112 = 3.9016;
export const HEIGHTMAP_COLOR_112 = 0x7d343f;
// Heightmap layer 112 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_113 = 68.0610;
export const HEIGHTMAP_COLOR_113 = 0xec39ba;
// Heightmap layer 113 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_114 = 64.3514;
export const HEIGHTMAP_COLOR_114 = 0x03f896;
// Heightmap layer 114 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_115 = 57.2001;
export const HEIGHTMAP_COLOR_115 = 0xed5510;
// Heightmap layer 115 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_116 = 69.6593;
export const HEIGHTMAP_COLOR_116 = 0x7091b6;
// Heightmap layer 116 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_117 = 69.6538;
export const HEIGHTMAP_COLOR_117 = 0x28d246;
// Heightmap layer 117 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_118 = 66.0005;
export const HEIGHTMAP_COLOR_118 = 0xdbf3ac;
// Heightmap layer 118 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_119 = 64.8797;
export const HEIGHTMAP_COLOR_119 = 0x795435;
// Heightmap layer 119 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_120 = 23.3313;
export const HEIGHTMAP_COLOR_120 = 0xec4f42;
// Heightmap layer 120 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_121 = 19.2966;
export const HEIGHTMAP_COLOR_121 = 0x25723a;
// Heightmap layer 121 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_122 = 62.4504;
export const HEIGHTMAP_COLOR_122 = 0xf6e9ee;
// Heightmap layer 122 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_123 = 39.8482;
export const HEIGHTMAP_COLOR_123 = 0xb5ad28;
// Heightmap layer 123 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_124 = 47.5745;
export const HEIGHTMAP_COLOR_124 = 0x76b989;
// Heightmap layer 124 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_125 = -13.7331;
export const HEIGHTMAP_COLOR_125 = 0x52093c;
// Heightmap layer 125 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_126 = 21.5357;
export const HEIGHTMAP_COLOR_126 = 0x0cfc27;
// Heightmap layer 126 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_127 = 35.7521;
export const HEIGHTMAP_COLOR_127 = 0x306bbd;
// Heightmap layer 127 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_128 = 77.9103;
export const HEIGHTMAP_COLOR_128 = 0x6331ef;
// Heightmap layer 128 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_129 = 53.4760;
export const HEIGHTMAP_COLOR_129 = 0x9d4ce6;
// Heightmap layer 129 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_130 = 36.4808;
export const HEIGHTMAP_COLOR_130 = 0xf66254;
// Heightmap layer 130 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_131 = 30.9059;
export const HEIGHTMAP_COLOR_131 = 0x86d795;
// Heightmap layer 131 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_132 = 28.8697;
export const HEIGHTMAP_COLOR_132 = 0x44859d;
// Heightmap layer 132 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_133 = -16.1736;
export const HEIGHTMAP_COLOR_133 = 0x5a6c44;
// Heightmap layer 133 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_134 = 41.2395;
export const HEIGHTMAP_COLOR_134 = 0x1a3a2d;
// Heightmap layer 134 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_135 = -6.5433;
export const HEIGHTMAP_COLOR_135 = 0xec0e27;
// Heightmap layer 135 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_136 = 20.9054;
export const HEIGHTMAP_COLOR_136 = 0x060f59;
// Heightmap layer 136 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_137 = -11.6414;
export const HEIGHTMAP_COLOR_137 = 0xc2b857;
// Heightmap layer 137 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_138 = -18.2033;
export const HEIGHTMAP_COLOR_138 = 0x56c4e3;
// Heightmap layer 138 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_139 = 20.1347;
export const HEIGHTMAP_COLOR_139 = 0xb8a595;
// Heightmap layer 139 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_140 = -1.9516;
export const HEIGHTMAP_COLOR_140 = 0x8ddb8d;
// Heightmap layer 140 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_141 = 12.0928;
export const HEIGHTMAP_COLOR_141 = 0x692b30;
// Heightmap layer 141 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_142 = 50.0252;
export const HEIGHTMAP_COLOR_142 = 0x9c26f6;
// Heightmap layer 142 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_143 = 74.2139;
export const HEIGHTMAP_COLOR_143 = 0xf16efd;
// Heightmap layer 143 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_144 = 63.2590;
export const HEIGHTMAP_COLOR_144 = 0xab868f;
// Heightmap layer 144 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_145 = 33.1897;
export const HEIGHTMAP_COLOR_145 = 0xc823d9;
// Heightmap layer 145 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_146 = 71.4585;
export const HEIGHTMAP_COLOR_146 = 0x864124;
// Heightmap layer 146 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_147 = 66.8295;
export const HEIGHTMAP_COLOR_147 = 0x21a4cc;
// Heightmap layer 147 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_148 = 75.9065;
export const HEIGHTMAP_COLOR_148 = 0x04985a;
// Heightmap layer 148 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_149 = 8.1414;
export const HEIGHTMAP_COLOR_149 = 0x6624b7;
// Heightmap layer 149 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_150 = -17.2081;
export const HEIGHTMAP_COLOR_150 = 0x1b95c6;
// Heightmap layer 150 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_151 = 43.6448;
export const HEIGHTMAP_COLOR_151 = 0xa627ff;
// Heightmap layer 151 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_152 = 61.5784;
export const HEIGHTMAP_COLOR_152 = 0xaa10df;
// Heightmap layer 152 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_153 = 17.4856;
export const HEIGHTMAP_COLOR_153 = 0xc67800;
// Heightmap layer 153 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_154 = 0.8429;
export const HEIGHTMAP_COLOR_154 = 0xf0012f;
// Heightmap layer 154 — authored for Ring-07
export const HEIGHTMAP_HEIGHT_155 = 50.0718;
export const HEIGHTMAP_COLOR_155 = 0x04b1a6;
// Heightmap layer 155 — authored for Ring-07
