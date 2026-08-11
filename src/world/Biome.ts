/**
 * NEXUS: FRAGMENT — WORLD/Biome
 * World generation — Biome
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

import * as THREE from 'three';

export interface BiomeLayer { height: number; color: THREE.Color; roughness: number; }
export const BIOME_SEED = 49408;

export class Biome {
  private layers: BiomeLayer[] = [];
  constructor(public seed:number=BIOME_SEED){}

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
export const BIOME_HEIGHT_000 = 25.9261;
export const BIOME_COLOR_000 = 0x026563;
// Biome layer 0 — authored for Ring-07
export const BIOME_HEIGHT_001 = 73.4318;
export const BIOME_COLOR_001 = 0xcea1d5;
// Biome layer 1 — authored for Ring-07
export const BIOME_HEIGHT_002 = 42.9641;
export const BIOME_COLOR_002 = 0xee9958;
// Biome layer 2 — authored for Ring-07
export const BIOME_HEIGHT_003 = 10.4641;
export const BIOME_COLOR_003 = 0x12022d;
// Biome layer 3 — authored for Ring-07
export const BIOME_HEIGHT_004 = 36.0484;
export const BIOME_COLOR_004 = 0x1aac6e;
// Biome layer 4 — authored for Ring-07
export const BIOME_HEIGHT_005 = -12.6676;
export const BIOME_COLOR_005 = 0x445380;
// Biome layer 5 — authored for Ring-07
export const BIOME_HEIGHT_006 = 66.1102;
export const BIOME_COLOR_006 = 0xe95a33;
// Biome layer 6 — authored for Ring-07
export const BIOME_HEIGHT_007 = -0.3805;
export const BIOME_COLOR_007 = 0xf372f5;
// Biome layer 7 — authored for Ring-07
export const BIOME_HEIGHT_008 = 34.4135;
export const BIOME_COLOR_008 = 0xd4b5d3;
// Biome layer 8 — authored for Ring-07
export const BIOME_HEIGHT_009 = 37.5577;
export const BIOME_COLOR_009 = 0x77d620;
// Biome layer 9 — authored for Ring-07
export const BIOME_HEIGHT_010 = 16.1970;
export const BIOME_COLOR_010 = 0xf50daa;
// Biome layer 10 — authored for Ring-07
export const BIOME_HEIGHT_011 = 5.0705;
export const BIOME_COLOR_011 = 0x8f4f03;
// Biome layer 11 — authored for Ring-07
export const BIOME_HEIGHT_012 = 29.6955;
export const BIOME_COLOR_012 = 0x0378dd;
// Biome layer 12 — authored for Ring-07
export const BIOME_HEIGHT_013 = 76.3658;
export const BIOME_COLOR_013 = 0xf9ce42;
// Biome layer 13 — authored for Ring-07
export const BIOME_HEIGHT_014 = 45.8809;
export const BIOME_COLOR_014 = 0x59938a;
// Biome layer 14 — authored for Ring-07
export const BIOME_HEIGHT_015 = 4.2273;
export const BIOME_COLOR_015 = 0x9da619;
// Biome layer 15 — authored for Ring-07
export const BIOME_HEIGHT_016 = 56.6828;
export const BIOME_COLOR_016 = 0x53ad15;
// Biome layer 16 — authored for Ring-07
export const BIOME_HEIGHT_017 = 33.9429;
export const BIOME_COLOR_017 = 0xf672cc;
// Biome layer 17 — authored for Ring-07
export const BIOME_HEIGHT_018 = 67.7470;
export const BIOME_COLOR_018 = 0x030054;
// Biome layer 18 — authored for Ring-07
export const BIOME_HEIGHT_019 = 4.7948;
export const BIOME_COLOR_019 = 0x45de7d;
// Biome layer 19 — authored for Ring-07
export const BIOME_HEIGHT_020 = 37.0602;
export const BIOME_COLOR_020 = 0xc82c19;
// Biome layer 20 — authored for Ring-07
export const BIOME_HEIGHT_021 = 38.9329;
export const BIOME_COLOR_021 = 0x80cd27;
// Biome layer 21 — authored for Ring-07
export const BIOME_HEIGHT_022 = 2.3646;
export const BIOME_COLOR_022 = 0x6ed6ce;
// Biome layer 22 — authored for Ring-07
export const BIOME_HEIGHT_023 = 24.6240;
export const BIOME_COLOR_023 = 0xd7c0e1;
// Biome layer 23 — authored for Ring-07
export const BIOME_HEIGHT_024 = 65.6152;
export const BIOME_COLOR_024 = 0xfbc388;
// Biome layer 24 — authored for Ring-07
export const BIOME_HEIGHT_025 = -9.6728;
export const BIOME_COLOR_025 = 0x36eab6;
// Biome layer 25 — authored for Ring-07
export const BIOME_HEIGHT_026 = -6.4686;
export const BIOME_COLOR_026 = 0x68471e;
// Biome layer 26 — authored for Ring-07
export const BIOME_HEIGHT_027 = -19.6407;
export const BIOME_COLOR_027 = 0x86c234;
// Biome layer 27 — authored for Ring-07
export const BIOME_HEIGHT_028 = 68.0591;
export const BIOME_COLOR_028 = 0x21a251;
// Biome layer 28 — authored for Ring-07
export const BIOME_HEIGHT_029 = 13.9887;
export const BIOME_COLOR_029 = 0xd472a5;
// Biome layer 29 — authored for Ring-07
export const BIOME_HEIGHT_030 = 55.3775;
export const BIOME_COLOR_030 = 0x2bcb91;
// Biome layer 30 — authored for Ring-07
export const BIOME_HEIGHT_031 = 45.8721;
export const BIOME_COLOR_031 = 0x6fbd63;
// Biome layer 31 — authored for Ring-07
export const BIOME_HEIGHT_032 = 69.0300;
export const BIOME_COLOR_032 = 0x69d540;
// Biome layer 32 — authored for Ring-07
export const BIOME_HEIGHT_033 = -7.6762;
export const BIOME_COLOR_033 = 0x7e79d9;
// Biome layer 33 — authored for Ring-07
export const BIOME_HEIGHT_034 = 37.5595;
export const BIOME_COLOR_034 = 0xb053a8;
// Biome layer 34 — authored for Ring-07
export const BIOME_HEIGHT_035 = 17.2498;
export const BIOME_COLOR_035 = 0xaa81e8;
// Biome layer 35 — authored for Ring-07
export const BIOME_HEIGHT_036 = 50.9042;
export const BIOME_COLOR_036 = 0x82b324;
// Biome layer 36 — authored for Ring-07
export const BIOME_HEIGHT_037 = 53.4888;
export const BIOME_COLOR_037 = 0x2e09a9;
// Biome layer 37 — authored for Ring-07
export const BIOME_HEIGHT_038 = -13.9951;
export const BIOME_COLOR_038 = 0x0e4501;
// Biome layer 38 — authored for Ring-07
export const BIOME_HEIGHT_039 = 42.6685;
export const BIOME_COLOR_039 = 0x68c03d;
// Biome layer 39 — authored for Ring-07
export const BIOME_HEIGHT_040 = 62.6523;
export const BIOME_COLOR_040 = 0x64da94;
// Biome layer 40 — authored for Ring-07
export const BIOME_HEIGHT_041 = 36.3557;
export const BIOME_COLOR_041 = 0x5b2427;
// Biome layer 41 — authored for Ring-07
export const BIOME_HEIGHT_042 = -14.6441;
export const BIOME_COLOR_042 = 0xd72ddc;
// Biome layer 42 — authored for Ring-07
export const BIOME_HEIGHT_043 = 60.9899;
export const BIOME_COLOR_043 = 0x99e7bc;
// Biome layer 43 — authored for Ring-07
export const BIOME_HEIGHT_044 = -17.4122;
export const BIOME_COLOR_044 = 0x450c4c;
// Biome layer 44 — authored for Ring-07
export const BIOME_HEIGHT_045 = 47.5427;
export const BIOME_COLOR_045 = 0xb549e7;
// Biome layer 45 — authored for Ring-07
export const BIOME_HEIGHT_046 = 20.9516;
export const BIOME_COLOR_046 = 0x79b6b8;
// Biome layer 46 — authored for Ring-07
export const BIOME_HEIGHT_047 = 53.5855;
export const BIOME_COLOR_047 = 0x6fe584;
// Biome layer 47 — authored for Ring-07
export const BIOME_HEIGHT_048 = -2.7382;
export const BIOME_COLOR_048 = 0xfa95bc;
// Biome layer 48 — authored for Ring-07
export const BIOME_HEIGHT_049 = 38.0124;
export const BIOME_COLOR_049 = 0xb85143;
// Biome layer 49 — authored for Ring-07
export const BIOME_HEIGHT_050 = 67.4408;
export const BIOME_COLOR_050 = 0x007afc;
// Biome layer 50 — authored for Ring-07
export const BIOME_HEIGHT_051 = 2.1975;
export const BIOME_COLOR_051 = 0xb13de7;
// Biome layer 51 — authored for Ring-07
export const BIOME_HEIGHT_052 = 75.5645;
export const BIOME_COLOR_052 = 0x65a373;
// Biome layer 52 — authored for Ring-07
export const BIOME_HEIGHT_053 = 17.6989;
export const BIOME_COLOR_053 = 0xdc594a;
// Biome layer 53 — authored for Ring-07
export const BIOME_HEIGHT_054 = 43.4173;
export const BIOME_COLOR_054 = 0x5bfea2;
// Biome layer 54 — authored for Ring-07
export const BIOME_HEIGHT_055 = 47.2763;
export const BIOME_COLOR_055 = 0x8241d9;
// Biome layer 55 — authored for Ring-07
export const BIOME_HEIGHT_056 = 16.0342;
export const BIOME_COLOR_056 = 0xa25adb;
// Biome layer 56 — authored for Ring-07
export const BIOME_HEIGHT_057 = -4.8036;
export const BIOME_COLOR_057 = 0x204b56;
// Biome layer 57 — authored for Ring-07
export const BIOME_HEIGHT_058 = 40.0088;
export const BIOME_COLOR_058 = 0xd0ff6d;
// Biome layer 58 — authored for Ring-07
export const BIOME_HEIGHT_059 = 43.6986;
export const BIOME_COLOR_059 = 0xb24408;
// Biome layer 59 — authored for Ring-07
export const BIOME_HEIGHT_060 = 13.2337;
export const BIOME_COLOR_060 = 0x2c9688;
// Biome layer 60 — authored for Ring-07
export const BIOME_HEIGHT_061 = 15.6898;
export const BIOME_COLOR_061 = 0x005681;
// Biome layer 61 — authored for Ring-07
export const BIOME_HEIGHT_062 = 52.4867;
export const BIOME_COLOR_062 = 0xe2689a;
// Biome layer 62 — authored for Ring-07
export const BIOME_HEIGHT_063 = 0.5583;
export const BIOME_COLOR_063 = 0x9e445e;
// Biome layer 63 — authored for Ring-07
export const BIOME_HEIGHT_064 = 8.1191;
export const BIOME_COLOR_064 = 0xde7ce9;
// Biome layer 64 — authored for Ring-07
export const BIOME_HEIGHT_065 = 34.2351;
export const BIOME_COLOR_065 = 0xa5e5fe;
// Biome layer 65 — authored for Ring-07
export const BIOME_HEIGHT_066 = -18.2760;
export const BIOME_COLOR_066 = 0x5b119d;
// Biome layer 66 — authored for Ring-07
export const BIOME_HEIGHT_067 = 11.2804;
export const BIOME_COLOR_067 = 0x77f49c;
// Biome layer 67 — authored for Ring-07
export const BIOME_HEIGHT_068 = 24.1273;
export const BIOME_COLOR_068 = 0xb0a338;
// Biome layer 68 — authored for Ring-07
export const BIOME_HEIGHT_069 = -2.4022;
export const BIOME_COLOR_069 = 0xa99edd;
// Biome layer 69 — authored for Ring-07
export const BIOME_HEIGHT_070 = 24.7353;
export const BIOME_COLOR_070 = 0x45ce49;
// Biome layer 70 — authored for Ring-07
export const BIOME_HEIGHT_071 = 63.7447;
export const BIOME_COLOR_071 = 0x7ed152;
// Biome layer 71 — authored for Ring-07
export const BIOME_HEIGHT_072 = 31.5639;
export const BIOME_COLOR_072 = 0x36f4d0;
// Biome layer 72 — authored for Ring-07
export const BIOME_HEIGHT_073 = 52.5422;
export const BIOME_COLOR_073 = 0x81a0b9;
// Biome layer 73 — authored for Ring-07
export const BIOME_HEIGHT_074 = 0.2107;
export const BIOME_COLOR_074 = 0xdc95eb;
// Biome layer 74 — authored for Ring-07
export const BIOME_HEIGHT_075 = 22.3269;
export const BIOME_COLOR_075 = 0xbfb7d9;
// Biome layer 75 — authored for Ring-07
export const BIOME_HEIGHT_076 = -10.8086;
export const BIOME_COLOR_076 = 0x818393;
// Biome layer 76 — authored for Ring-07
export const BIOME_HEIGHT_077 = 71.3508;
export const BIOME_COLOR_077 = 0xe1add3;
// Biome layer 77 — authored for Ring-07
export const BIOME_HEIGHT_078 = -9.4091;
export const BIOME_COLOR_078 = 0xad20d5;
// Biome layer 78 — authored for Ring-07
export const BIOME_HEIGHT_079 = 34.0839;
export const BIOME_COLOR_079 = 0x2a78ff;
// Biome layer 79 — authored for Ring-07
export const BIOME_HEIGHT_080 = 1.3936;
export const BIOME_COLOR_080 = 0x37ecd1;
// Biome layer 80 — authored for Ring-07
export const BIOME_HEIGHT_081 = 26.9054;
export const BIOME_COLOR_081 = 0x3367d3;
// Biome layer 81 — authored for Ring-07
export const BIOME_HEIGHT_082 = 62.3022;
export const BIOME_COLOR_082 = 0x3364c6;
// Biome layer 82 — authored for Ring-07
export const BIOME_HEIGHT_083 = 11.8520;
export const BIOME_COLOR_083 = 0xef923e;
// Biome layer 83 — authored for Ring-07
export const BIOME_HEIGHT_084 = 61.7463;
export const BIOME_COLOR_084 = 0xe7f83d;
// Biome layer 84 — authored for Ring-07
export const BIOME_HEIGHT_085 = -18.3322;
export const BIOME_COLOR_085 = 0xc556aa;
// Biome layer 85 — authored for Ring-07
export const BIOME_HEIGHT_086 = 75.1026;
export const BIOME_COLOR_086 = 0x38af4b;
// Biome layer 86 — authored for Ring-07
export const BIOME_HEIGHT_087 = -4.9436;
export const BIOME_COLOR_087 = 0xdb9a42;
// Biome layer 87 — authored for Ring-07
export const BIOME_HEIGHT_088 = 16.9202;
export const BIOME_COLOR_088 = 0xac80fa;
// Biome layer 88 — authored for Ring-07
export const BIOME_HEIGHT_089 = 77.1800;
export const BIOME_COLOR_089 = 0xc093ec;
// Biome layer 89 — authored for Ring-07
export const BIOME_HEIGHT_090 = -2.6396;
export const BIOME_COLOR_090 = 0xdd7d48;
// Biome layer 90 — authored for Ring-07
export const BIOME_HEIGHT_091 = 60.3280;
export const BIOME_COLOR_091 = 0x84510a;
// Biome layer 91 — authored for Ring-07
export const BIOME_HEIGHT_092 = 13.2790;
export const BIOME_COLOR_092 = 0x8761f8;
// Biome layer 92 — authored for Ring-07
export const BIOME_HEIGHT_093 = 38.4198;
export const BIOME_COLOR_093 = 0xa2d3a9;
// Biome layer 93 — authored for Ring-07
export const BIOME_HEIGHT_094 = 25.0013;
export const BIOME_COLOR_094 = 0x5c3387;
// Biome layer 94 — authored for Ring-07
export const BIOME_HEIGHT_095 = 30.7866;
export const BIOME_COLOR_095 = 0x2967c5;
// Biome layer 95 — authored for Ring-07
export const BIOME_HEIGHT_096 = 45.0632;
export const BIOME_COLOR_096 = 0xa57bfa;
// Biome layer 96 — authored for Ring-07
export const BIOME_HEIGHT_097 = 44.2730;
export const BIOME_COLOR_097 = 0x593e30;
// Biome layer 97 — authored for Ring-07
export const BIOME_HEIGHT_098 = 20.1074;
export const BIOME_COLOR_098 = 0xd8adfd;
// Biome layer 98 — authored for Ring-07
export const BIOME_HEIGHT_099 = 3.9631;
export const BIOME_COLOR_099 = 0x81b330;
// Biome layer 99 — authored for Ring-07
export const BIOME_HEIGHT_100 = 4.3666;
export const BIOME_COLOR_100 = 0x8c711f;
// Biome layer 100 — authored for Ring-07
export const BIOME_HEIGHT_101 = 66.1982;
export const BIOME_COLOR_101 = 0xd83056;
// Biome layer 101 — authored for Ring-07
export const BIOME_HEIGHT_102 = 70.0119;
export const BIOME_COLOR_102 = 0x08bc96;
// Biome layer 102 — authored for Ring-07
export const BIOME_HEIGHT_103 = 72.6067;
export const BIOME_COLOR_103 = 0x0a6f87;
// Biome layer 103 — authored for Ring-07
export const BIOME_HEIGHT_104 = 78.3554;
export const BIOME_COLOR_104 = 0x85eeac;
// Biome layer 104 — authored for Ring-07
export const BIOME_HEIGHT_105 = 72.3609;
export const BIOME_COLOR_105 = 0xeaa486;
// Biome layer 105 — authored for Ring-07
export const BIOME_HEIGHT_106 = 78.5552;
export const BIOME_COLOR_106 = 0x58b99b;
// Biome layer 106 — authored for Ring-07
export const BIOME_HEIGHT_107 = 47.7196;
export const BIOME_COLOR_107 = 0x8e4782;
// Biome layer 107 — authored for Ring-07
export const BIOME_HEIGHT_108 = -13.0970;
export const BIOME_COLOR_108 = 0xbc97ca;
// Biome layer 108 — authored for Ring-07
export const BIOME_HEIGHT_109 = 71.2440;
export const BIOME_COLOR_109 = 0xbddc08;
// Biome layer 109 — authored for Ring-07
export const BIOME_HEIGHT_110 = 8.8277;
export const BIOME_COLOR_110 = 0x76a4af;
// Biome layer 110 — authored for Ring-07
export const BIOME_HEIGHT_111 = 54.0431;
export const BIOME_COLOR_111 = 0x33a38e;
// Biome layer 111 — authored for Ring-07
export const BIOME_HEIGHT_112 = 15.0133;
export const BIOME_COLOR_112 = 0xc23172;
// Biome layer 112 — authored for Ring-07
export const BIOME_HEIGHT_113 = 25.2147;
export const BIOME_COLOR_113 = 0x5de9b0;
// Biome layer 113 — authored for Ring-07
export const BIOME_HEIGHT_114 = 4.2333;
export const BIOME_COLOR_114 = 0xeaab21;
// Biome layer 114 — authored for Ring-07
export const BIOME_HEIGHT_115 = -13.2175;
export const BIOME_COLOR_115 = 0xaefad8;
// Biome layer 115 — authored for Ring-07
export const BIOME_HEIGHT_116 = 30.4560;
export const BIOME_COLOR_116 = 0x1cda40;
// Biome layer 116 — authored for Ring-07
export const BIOME_HEIGHT_117 = 45.7843;
export const BIOME_COLOR_117 = 0xe36e24;
// Biome layer 117 — authored for Ring-07
export const BIOME_HEIGHT_118 = 59.6718;
export const BIOME_COLOR_118 = 0x803520;
// Biome layer 118 — authored for Ring-07
export const BIOME_HEIGHT_119 = 55.1635;
export const BIOME_COLOR_119 = 0x3c0851;
// Biome layer 119 — authored for Ring-07
export const BIOME_HEIGHT_120 = 58.1148;
export const BIOME_COLOR_120 = 0x5e6cbb;
// Biome layer 120 — authored for Ring-07
export const BIOME_HEIGHT_121 = 78.0420;
export const BIOME_COLOR_121 = 0xf60bbe;
// Biome layer 121 — authored for Ring-07
export const BIOME_HEIGHT_122 = 30.0788;
export const BIOME_COLOR_122 = 0x9ba1eb;
// Biome layer 122 — authored for Ring-07
export const BIOME_HEIGHT_123 = 8.4254;
export const BIOME_COLOR_123 = 0x11d647;
// Biome layer 123 — authored for Ring-07
export const BIOME_HEIGHT_124 = -16.3765;
export const BIOME_COLOR_124 = 0x8fc08a;
// Biome layer 124 — authored for Ring-07
export const BIOME_HEIGHT_125 = -2.5200;
export const BIOME_COLOR_125 = 0x43b81b;
// Biome layer 125 — authored for Ring-07
export const BIOME_HEIGHT_126 = 69.4474;
export const BIOME_COLOR_126 = 0x1a73c4;
// Biome layer 126 — authored for Ring-07
export const BIOME_HEIGHT_127 = 60.6949;
export const BIOME_COLOR_127 = 0x9305cf;
// Biome layer 127 — authored for Ring-07
export const BIOME_HEIGHT_128 = 2.2503;
export const BIOME_COLOR_128 = 0x40e6ad;
// Biome layer 128 — authored for Ring-07
export const BIOME_HEIGHT_129 = 40.4757;
export const BIOME_COLOR_129 = 0x260350;
// Biome layer 129 — authored for Ring-07
export const BIOME_HEIGHT_130 = 64.6680;
export const BIOME_COLOR_130 = 0xe16a3d;
// Biome layer 130 — authored for Ring-07
export const BIOME_HEIGHT_131 = 55.8586;
export const BIOME_COLOR_131 = 0x660caa;
// Biome layer 131 — authored for Ring-07
export const BIOME_HEIGHT_132 = 75.2948;
export const BIOME_COLOR_132 = 0xc46f52;
// Biome layer 132 — authored for Ring-07
export const BIOME_HEIGHT_133 = 36.7629;
export const BIOME_COLOR_133 = 0x72d8d1;
// Biome layer 133 — authored for Ring-07
export const BIOME_HEIGHT_134 = 51.7642;
export const BIOME_COLOR_134 = 0xc93f58;
// Biome layer 134 — authored for Ring-07
export const BIOME_HEIGHT_135 = 27.3407;
export const BIOME_COLOR_135 = 0x625f88;
// Biome layer 135 — authored for Ring-07
export const BIOME_HEIGHT_136 = 56.1364;
export const BIOME_COLOR_136 = 0x674b15;
// Biome layer 136 — authored for Ring-07
export const BIOME_HEIGHT_137 = -17.1633;
export const BIOME_COLOR_137 = 0x135f30;
// Biome layer 137 — authored for Ring-07
export const BIOME_HEIGHT_138 = 5.1267;
export const BIOME_COLOR_138 = 0x4f15fc;
// Biome layer 138 — authored for Ring-07
export const BIOME_HEIGHT_139 = 10.1035;
export const BIOME_COLOR_139 = 0xb7cfb3;
// Biome layer 139 — authored for Ring-07
export const BIOME_HEIGHT_140 = 56.8907;
export const BIOME_COLOR_140 = 0x6b329c;
// Biome layer 140 — authored for Ring-07
export const BIOME_HEIGHT_141 = 26.1057;
export const BIOME_COLOR_141 = 0xad95d5;
// Biome layer 141 — authored for Ring-07
export const BIOME_HEIGHT_142 = 78.7844;
export const BIOME_COLOR_142 = 0x592137;
// Biome layer 142 — authored for Ring-07
export const BIOME_HEIGHT_143 = 60.5452;
export const BIOME_COLOR_143 = 0x2d0fdf;
// Biome layer 143 — authored for Ring-07
export const BIOME_HEIGHT_144 = 66.9610;
export const BIOME_COLOR_144 = 0x072519;
// Biome layer 144 — authored for Ring-07
export const BIOME_HEIGHT_145 = 70.0196;
export const BIOME_COLOR_145 = 0x7ac78a;
// Biome layer 145 — authored for Ring-07
export const BIOME_HEIGHT_146 = 24.9436;
export const BIOME_COLOR_146 = 0x4f5011;
// Biome layer 146 — authored for Ring-07
export const BIOME_HEIGHT_147 = 48.4759;
export const BIOME_COLOR_147 = 0x404b64;
// Biome layer 147 — authored for Ring-07
export const BIOME_HEIGHT_148 = 1.4052;
export const BIOME_COLOR_148 = 0x8c53f8;
// Biome layer 148 — authored for Ring-07
export const BIOME_HEIGHT_149 = -0.3936;
export const BIOME_COLOR_149 = 0x258bc2;
// Biome layer 149 — authored for Ring-07
export const BIOME_HEIGHT_150 = -14.2627;
export const BIOME_COLOR_150 = 0xf84037;
// Biome layer 150 — authored for Ring-07
export const BIOME_HEIGHT_151 = 65.4685;
export const BIOME_COLOR_151 = 0xb40e3a;
// Biome layer 151 — authored for Ring-07
export const BIOME_HEIGHT_152 = 73.1624;
export const BIOME_COLOR_152 = 0xb2e947;
// Biome layer 152 — authored for Ring-07
export const BIOME_HEIGHT_153 = -19.6358;
export const BIOME_COLOR_153 = 0x5ea2a1;
// Biome layer 153 — authored for Ring-07
export const BIOME_HEIGHT_154 = 72.4085;
export const BIOME_COLOR_154 = 0x358216;
// Biome layer 154 — authored for Ring-07
export const BIOME_HEIGHT_155 = 70.8113;
export const BIOME_COLOR_155 = 0xf70317;
// Biome layer 155 — authored for Ring-07
