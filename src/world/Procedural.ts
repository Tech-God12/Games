/**
 * NEXUS: FRAGMENT — WORLD/Procedural
 * World generation — Procedural
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

import * as THREE from 'three';

export interface ProceduralLayer { height: number; color: THREE.Color; roughness: number; }
export const PROCEDURAL_SEED = 79789;

export class Procedural {
  private layers: ProceduralLayer[] = [];
  constructor(public seed:number=PROCEDURAL_SEED){}

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
export const PROCEDURAL_HEIGHT_000 = 25.0919;
export const PROCEDURAL_COLOR_000 = 0xe05c31;
// Procedural layer 0 — authored for Ring-07
export const PROCEDURAL_HEIGHT_001 = 60.6016;
export const PROCEDURAL_COLOR_001 = 0xf57d5b;
// Procedural layer 1 — authored for Ring-07
export const PROCEDURAL_HEIGHT_002 = -4.0538;
export const PROCEDURAL_COLOR_002 = 0x367ab9;
// Procedural layer 2 — authored for Ring-07
export const PROCEDURAL_HEIGHT_003 = -19.0489;
export const PROCEDURAL_COLOR_003 = 0x087bf9;
// Procedural layer 3 — authored for Ring-07
export const PROCEDURAL_HEIGHT_004 = 40.8694;
export const PROCEDURAL_COLOR_004 = 0x99086a;
// Procedural layer 4 — authored for Ring-07
export const PROCEDURAL_HEIGHT_005 = 60.4970;
export const PROCEDURAL_COLOR_005 = 0xc2dbe5;
// Procedural layer 5 — authored for Ring-07
export const PROCEDURAL_HEIGHT_006 = 32.8836;
export const PROCEDURAL_COLOR_006 = 0x01906d;
// Procedural layer 6 — authored for Ring-07
export const PROCEDURAL_HEIGHT_007 = 54.8910;
export const PROCEDURAL_COLOR_007 = 0xcb0fde;
// Procedural layer 7 — authored for Ring-07
export const PROCEDURAL_HEIGHT_008 = -5.9475;
export const PROCEDURAL_COLOR_008 = 0xb189cd;
// Procedural layer 8 — authored for Ring-07
export const PROCEDURAL_HEIGHT_009 = 74.8622;
export const PROCEDURAL_COLOR_009 = 0x909cb7;
// Procedural layer 9 — authored for Ring-07
export const PROCEDURAL_HEIGHT_010 = -16.3799;
export const PROCEDURAL_COLOR_010 = 0x2437af;
// Procedural layer 10 — authored for Ring-07
export const PROCEDURAL_HEIGHT_011 = 5.3492;
export const PROCEDURAL_COLOR_011 = 0xcc2965;
// Procedural layer 11 — authored for Ring-07
export const PROCEDURAL_HEIGHT_012 = -4.0613;
export const PROCEDURAL_COLOR_012 = 0xc8f901;
// Procedural layer 12 — authored for Ring-07
export const PROCEDURAL_HEIGHT_013 = 55.0388;
export const PROCEDURAL_COLOR_013 = 0x8ac20b;
// Procedural layer 13 — authored for Ring-07
export const PROCEDURAL_HEIGHT_014 = -18.4153;
export const PROCEDURAL_COLOR_014 = 0xda5dfa;
// Procedural layer 14 — authored for Ring-07
export const PROCEDURAL_HEIGHT_015 = 45.8155;
export const PROCEDURAL_COLOR_015 = 0xe180e2;
// Procedural layer 15 — authored for Ring-07
export const PROCEDURAL_HEIGHT_016 = 12.3314;
export const PROCEDURAL_COLOR_016 = 0x64c1e4;
// Procedural layer 16 — authored for Ring-07
export const PROCEDURAL_HEIGHT_017 = -15.7423;
export const PROCEDURAL_COLOR_017 = 0x295c37;
// Procedural layer 17 — authored for Ring-07
export const PROCEDURAL_HEIGHT_018 = 35.6734;
export const PROCEDURAL_COLOR_018 = 0x500143;
// Procedural layer 18 — authored for Ring-07
export const PROCEDURAL_HEIGHT_019 = 15.5233;
export const PROCEDURAL_COLOR_019 = 0xd6d727;
// Procedural layer 19 — authored for Ring-07
export const PROCEDURAL_HEIGHT_020 = -5.4717;
export const PROCEDURAL_COLOR_020 = 0x790db0;
// Procedural layer 20 — authored for Ring-07
export const PROCEDURAL_HEIGHT_021 = 30.1723;
export const PROCEDURAL_COLOR_021 = 0xcd8e15;
// Procedural layer 21 — authored for Ring-07
export const PROCEDURAL_HEIGHT_022 = 59.8378;
export const PROCEDURAL_COLOR_022 = 0xef8172;
// Procedural layer 22 — authored for Ring-07
export const PROCEDURAL_HEIGHT_023 = 1.6292;
export const PROCEDURAL_COLOR_023 = 0x8ab4b9;
// Procedural layer 23 — authored for Ring-07
export const PROCEDURAL_HEIGHT_024 = 7.1231;
export const PROCEDURAL_COLOR_024 = 0xa63d11;
// Procedural layer 24 — authored for Ring-07
export const PROCEDURAL_HEIGHT_025 = 45.9399;
export const PROCEDURAL_COLOR_025 = 0x714b97;
// Procedural layer 25 — authored for Ring-07
export const PROCEDURAL_HEIGHT_026 = 14.1982;
export const PROCEDURAL_COLOR_026 = 0xc012d9;
// Procedural layer 26 — authored for Ring-07
export const PROCEDURAL_HEIGHT_027 = -13.3314;
export const PROCEDURAL_COLOR_027 = 0x149cbf;
// Procedural layer 27 — authored for Ring-07
export const PROCEDURAL_HEIGHT_028 = -5.0337;
export const PROCEDURAL_COLOR_028 = 0x8f18fc;
// Procedural layer 28 — authored for Ring-07
export const PROCEDURAL_HEIGHT_029 = 13.8378;
export const PROCEDURAL_COLOR_029 = 0x11686f;
// Procedural layer 29 — authored for Ring-07
export const PROCEDURAL_HEIGHT_030 = 51.4063;
export const PROCEDURAL_COLOR_030 = 0xca49c2;
// Procedural layer 30 — authored for Ring-07
export const PROCEDURAL_HEIGHT_031 = 41.9036;
export const PROCEDURAL_COLOR_031 = 0x5eaa6d;
// Procedural layer 31 — authored for Ring-07
export const PROCEDURAL_HEIGHT_032 = 43.8485;
export const PROCEDURAL_COLOR_032 = 0x143031;
// Procedural layer 32 — authored for Ring-07
export const PROCEDURAL_HEIGHT_033 = 43.4872;
export const PROCEDURAL_COLOR_033 = 0x9813eb;
// Procedural layer 33 — authored for Ring-07
export const PROCEDURAL_HEIGHT_034 = -16.6908;
export const PROCEDURAL_COLOR_034 = 0x94faad;
// Procedural layer 34 — authored for Ring-07
export const PROCEDURAL_HEIGHT_035 = -15.0767;
export const PROCEDURAL_COLOR_035 = 0x4bd289;
// Procedural layer 35 — authored for Ring-07
export const PROCEDURAL_HEIGHT_036 = -18.1637;
export const PROCEDURAL_COLOR_036 = 0x8382af;
// Procedural layer 36 — authored for Ring-07
export const PROCEDURAL_HEIGHT_037 = 41.3300;
export const PROCEDURAL_COLOR_037 = 0x1703e7;
// Procedural layer 37 — authored for Ring-07
export const PROCEDURAL_HEIGHT_038 = 45.8589;
export const PROCEDURAL_COLOR_038 = 0x682010;
// Procedural layer 38 — authored for Ring-07
export const PROCEDURAL_HEIGHT_039 = -12.5337;
export const PROCEDURAL_COLOR_039 = 0xc0b09b;
// Procedural layer 39 — authored for Ring-07
export const PROCEDURAL_HEIGHT_040 = 57.2451;
export const PROCEDURAL_COLOR_040 = 0xc8ec2c;
// Procedural layer 40 — authored for Ring-07
export const PROCEDURAL_HEIGHT_041 = 72.6224;
export const PROCEDURAL_COLOR_041 = 0x6307e0;
// Procedural layer 41 — authored for Ring-07
export const PROCEDURAL_HEIGHT_042 = -7.7405;
export const PROCEDURAL_COLOR_042 = 0xaf8dee;
// Procedural layer 42 — authored for Ring-07
export const PROCEDURAL_HEIGHT_043 = 41.0786;
export const PROCEDURAL_COLOR_043 = 0x1c0678;
// Procedural layer 43 — authored for Ring-07
export const PROCEDURAL_HEIGHT_044 = -6.9204;
export const PROCEDURAL_COLOR_044 = 0x529d79;
// Procedural layer 44 — authored for Ring-07
export const PROCEDURAL_HEIGHT_045 = -5.8966;
export const PROCEDURAL_COLOR_045 = 0x114d8f;
// Procedural layer 45 — authored for Ring-07
export const PROCEDURAL_HEIGHT_046 = 6.7562;
export const PROCEDURAL_COLOR_046 = 0x5e075d;
// Procedural layer 46 — authored for Ring-07
export const PROCEDURAL_HEIGHT_047 = 16.3015;
export const PROCEDURAL_COLOR_047 = 0x5e071f;
// Procedural layer 47 — authored for Ring-07
export const PROCEDURAL_HEIGHT_048 = 33.4700;
export const PROCEDURAL_COLOR_048 = 0xc3df8a;
// Procedural layer 48 — authored for Ring-07
export const PROCEDURAL_HEIGHT_049 = 14.7033;
export const PROCEDURAL_COLOR_049 = 0x1ab134;
// Procedural layer 49 — authored for Ring-07
export const PROCEDURAL_HEIGHT_050 = 67.8351;
export const PROCEDURAL_COLOR_050 = 0x0ee0be;
// Procedural layer 50 — authored for Ring-07
export const PROCEDURAL_HEIGHT_051 = 57.2925;
export const PROCEDURAL_COLOR_051 = 0x1ac632;
// Procedural layer 51 — authored for Ring-07
export const PROCEDURAL_HEIGHT_052 = 66.6403;
export const PROCEDURAL_COLOR_052 = 0x4e8304;
// Procedural layer 52 — authored for Ring-07
export const PROCEDURAL_HEIGHT_053 = 66.7461;
export const PROCEDURAL_COLOR_053 = 0x82dc2e;
// Procedural layer 53 — authored for Ring-07
export const PROCEDURAL_HEIGHT_054 = 28.1245;
export const PROCEDURAL_COLOR_054 = 0x4d8f48;
// Procedural layer 54 — authored for Ring-07
export const PROCEDURAL_HEIGHT_055 = 39.5109;
export const PROCEDURAL_COLOR_055 = 0xf8cbc8;
// Procedural layer 55 — authored for Ring-07
export const PROCEDURAL_HEIGHT_056 = 63.0426;
export const PROCEDURAL_COLOR_056 = 0x4f2b6f;
// Procedural layer 56 — authored for Ring-07
export const PROCEDURAL_HEIGHT_057 = 24.3065;
export const PROCEDURAL_COLOR_057 = 0x104e0e;
// Procedural layer 57 — authored for Ring-07
export const PROCEDURAL_HEIGHT_058 = 49.4704;
export const PROCEDURAL_COLOR_058 = 0x95b61b;
// Procedural layer 58 — authored for Ring-07
export const PROCEDURAL_HEIGHT_059 = 49.8874;
export const PROCEDURAL_COLOR_059 = 0x48efec;
// Procedural layer 59 — authored for Ring-07
export const PROCEDURAL_HEIGHT_060 = -0.0133;
export const PROCEDURAL_COLOR_060 = 0xc8fda7;
// Procedural layer 60 — authored for Ring-07
export const PROCEDURAL_HEIGHT_061 = 34.7073;
export const PROCEDURAL_COLOR_061 = 0x4e065a;
// Procedural layer 61 — authored for Ring-07
export const PROCEDURAL_HEIGHT_062 = 6.1215;
export const PROCEDURAL_COLOR_062 = 0x89cd2d;
// Procedural layer 62 — authored for Ring-07
export const PROCEDURAL_HEIGHT_063 = -2.1712;
export const PROCEDURAL_COLOR_063 = 0xb3c814;
// Procedural layer 63 — authored for Ring-07
export const PROCEDURAL_HEIGHT_064 = -2.4666;
export const PROCEDURAL_COLOR_064 = 0xaea6c8;
// Procedural layer 64 — authored for Ring-07
export const PROCEDURAL_HEIGHT_065 = 61.1583;
export const PROCEDURAL_COLOR_065 = 0xbd72fa;
// Procedural layer 65 — authored for Ring-07
export const PROCEDURAL_HEIGHT_066 = 9.1747;
export const PROCEDURAL_COLOR_066 = 0x1c7ec3;
// Procedural layer 66 — authored for Ring-07
export const PROCEDURAL_HEIGHT_067 = 56.8940;
export const PROCEDURAL_COLOR_067 = 0x2a2c78;
// Procedural layer 67 — authored for Ring-07
export const PROCEDURAL_HEIGHT_068 = 25.9504;
export const PROCEDURAL_COLOR_068 = 0xd3e6df;
// Procedural layer 68 — authored for Ring-07
export const PROCEDURAL_HEIGHT_069 = 24.3712;
export const PROCEDURAL_COLOR_069 = 0x3db020;
// Procedural layer 69 — authored for Ring-07
export const PROCEDURAL_HEIGHT_070 = 54.6843;
export const PROCEDURAL_COLOR_070 = 0x8be0d8;
// Procedural layer 70 — authored for Ring-07
export const PROCEDURAL_HEIGHT_071 = 62.8246;
export const PROCEDURAL_COLOR_071 = 0xfea717;
// Procedural layer 71 — authored for Ring-07
export const PROCEDURAL_HEIGHT_072 = -13.3520;
export const PROCEDURAL_COLOR_072 = 0xdd1d7f;
// Procedural layer 72 — authored for Ring-07
export const PROCEDURAL_HEIGHT_073 = 52.0433;
export const PROCEDURAL_COLOR_073 = 0xb1377c;
// Procedural layer 73 — authored for Ring-07
export const PROCEDURAL_HEIGHT_074 = 5.6148;
export const PROCEDURAL_COLOR_074 = 0x795227;
// Procedural layer 74 — authored for Ring-07
export const PROCEDURAL_HEIGHT_075 = 72.2861;
export const PROCEDURAL_COLOR_075 = 0x14daa3;
// Procedural layer 75 — authored for Ring-07
export const PROCEDURAL_HEIGHT_076 = 77.5585;
export const PROCEDURAL_COLOR_076 = 0x2cdef2;
// Procedural layer 76 — authored for Ring-07
export const PROCEDURAL_HEIGHT_077 = 13.3675;
export const PROCEDURAL_COLOR_077 = 0x4917fb;
// Procedural layer 77 — authored for Ring-07
export const PROCEDURAL_HEIGHT_078 = 14.9715;
export const PROCEDURAL_COLOR_078 = 0x4f3bd7;
// Procedural layer 78 — authored for Ring-07
export const PROCEDURAL_HEIGHT_079 = 68.8037;
export const PROCEDURAL_COLOR_079 = 0xb8d20b;
// Procedural layer 79 — authored for Ring-07
export const PROCEDURAL_HEIGHT_080 = 35.0757;
export const PROCEDURAL_COLOR_080 = 0xac5dfc;
// Procedural layer 80 — authored for Ring-07
export const PROCEDURAL_HEIGHT_081 = 77.6669;
export const PROCEDURAL_COLOR_081 = 0xa517b0;
// Procedural layer 81 — authored for Ring-07
export const PROCEDURAL_HEIGHT_082 = 62.0674;
export const PROCEDURAL_COLOR_082 = 0x59043a;
// Procedural layer 82 — authored for Ring-07
export const PROCEDURAL_HEIGHT_083 = -3.0740;
export const PROCEDURAL_COLOR_083 = 0x786b83;
// Procedural layer 83 — authored for Ring-07
export const PROCEDURAL_HEIGHT_084 = -12.5808;
export const PROCEDURAL_COLOR_084 = 0x822377;
// Procedural layer 84 — authored for Ring-07
export const PROCEDURAL_HEIGHT_085 = 77.8512;
export const PROCEDURAL_COLOR_085 = 0x4f9e7b;
// Procedural layer 85 — authored for Ring-07
export const PROCEDURAL_HEIGHT_086 = 2.9569;
export const PROCEDURAL_COLOR_086 = 0x4c5f17;
// Procedural layer 86 — authored for Ring-07
export const PROCEDURAL_HEIGHT_087 = 20.0125;
export const PROCEDURAL_COLOR_087 = 0xfec095;
// Procedural layer 87 — authored for Ring-07
export const PROCEDURAL_HEIGHT_088 = 77.5637;
export const PROCEDURAL_COLOR_088 = 0x9ad8c1;
// Procedural layer 88 — authored for Ring-07
export const PROCEDURAL_HEIGHT_089 = 5.7280;
export const PROCEDURAL_COLOR_089 = 0x854e7d;
// Procedural layer 89 — authored for Ring-07
export const PROCEDURAL_HEIGHT_090 = 74.9149;
export const PROCEDURAL_COLOR_090 = 0xe5e811;
// Procedural layer 90 — authored for Ring-07
export const PROCEDURAL_HEIGHT_091 = -15.9660;
export const PROCEDURAL_COLOR_091 = 0x281c87;
// Procedural layer 91 — authored for Ring-07
export const PROCEDURAL_HEIGHT_092 = 28.9967;
export const PROCEDURAL_COLOR_092 = 0xb3fb73;
// Procedural layer 92 — authored for Ring-07
export const PROCEDURAL_HEIGHT_093 = -2.1812;
export const PROCEDURAL_COLOR_093 = 0x94f034;
// Procedural layer 93 — authored for Ring-07
export const PROCEDURAL_HEIGHT_094 = 74.9679;
export const PROCEDURAL_COLOR_094 = 0xf52189;
// Procedural layer 94 — authored for Ring-07
export const PROCEDURAL_HEIGHT_095 = 58.0077;
export const PROCEDURAL_COLOR_095 = 0x1cf13d;
// Procedural layer 95 — authored for Ring-07
export const PROCEDURAL_HEIGHT_096 = 42.8096;
export const PROCEDURAL_COLOR_096 = 0x170e01;
// Procedural layer 96 — authored for Ring-07
export const PROCEDURAL_HEIGHT_097 = 25.7308;
export const PROCEDURAL_COLOR_097 = 0x9524cf;
// Procedural layer 97 — authored for Ring-07
export const PROCEDURAL_HEIGHT_098 = 16.2404;
export const PROCEDURAL_COLOR_098 = 0x147ede;
// Procedural layer 98 — authored for Ring-07
export const PROCEDURAL_HEIGHT_099 = 29.3154;
export const PROCEDURAL_COLOR_099 = 0x424d55;
// Procedural layer 99 — authored for Ring-07
export const PROCEDURAL_HEIGHT_100 = 22.2375;
export const PROCEDURAL_COLOR_100 = 0x5fb352;
// Procedural layer 100 — authored for Ring-07
export const PROCEDURAL_HEIGHT_101 = 24.8983;
export const PROCEDURAL_COLOR_101 = 0xb070c1;
// Procedural layer 101 — authored for Ring-07
export const PROCEDURAL_HEIGHT_102 = 8.8212;
export const PROCEDURAL_COLOR_102 = 0x912cca;
// Procedural layer 102 — authored for Ring-07
export const PROCEDURAL_HEIGHT_103 = 1.9634;
export const PROCEDURAL_COLOR_103 = 0xb632d3;
// Procedural layer 103 — authored for Ring-07
export const PROCEDURAL_HEIGHT_104 = 28.4285;
export const PROCEDURAL_COLOR_104 = 0xa9e119;
// Procedural layer 104 — authored for Ring-07
export const PROCEDURAL_HEIGHT_105 = 52.1742;
export const PROCEDURAL_COLOR_105 = 0x8b9aeb;
// Procedural layer 105 — authored for Ring-07
export const PROCEDURAL_HEIGHT_106 = 29.0225;
export const PROCEDURAL_COLOR_106 = 0x9edbbc;
// Procedural layer 106 — authored for Ring-07
export const PROCEDURAL_HEIGHT_107 = -16.5611;
export const PROCEDURAL_COLOR_107 = 0x65747f;
// Procedural layer 107 — authored for Ring-07
export const PROCEDURAL_HEIGHT_108 = 64.4784;
export const PROCEDURAL_COLOR_108 = 0xb4b812;
// Procedural layer 108 — authored for Ring-07
export const PROCEDURAL_HEIGHT_109 = -9.1492;
export const PROCEDURAL_COLOR_109 = 0xef88d9;
// Procedural layer 109 — authored for Ring-07
export const PROCEDURAL_HEIGHT_110 = 67.8964;
export const PROCEDURAL_COLOR_110 = 0xc4a9c4;
// Procedural layer 110 — authored for Ring-07
export const PROCEDURAL_HEIGHT_111 = 18.9078;
export const PROCEDURAL_COLOR_111 = 0x0c6744;
// Procedural layer 111 — authored for Ring-07
export const PROCEDURAL_HEIGHT_112 = 2.2822;
export const PROCEDURAL_COLOR_112 = 0xae3afc;
// Procedural layer 112 — authored for Ring-07
export const PROCEDURAL_HEIGHT_113 = 12.5635;
export const PROCEDURAL_COLOR_113 = 0x446f74;
// Procedural layer 113 — authored for Ring-07
export const PROCEDURAL_HEIGHT_114 = -11.0804;
export const PROCEDURAL_COLOR_114 = 0x33a271;
// Procedural layer 114 — authored for Ring-07
export const PROCEDURAL_HEIGHT_115 = 7.2712;
export const PROCEDURAL_COLOR_115 = 0x3f97e7;
// Procedural layer 115 — authored for Ring-07
export const PROCEDURAL_HEIGHT_116 = 13.6901;
export const PROCEDURAL_COLOR_116 = 0x71a225;
// Procedural layer 116 — authored for Ring-07
export const PROCEDURAL_HEIGHT_117 = -5.2854;
export const PROCEDURAL_COLOR_117 = 0x6a39ea;
// Procedural layer 117 — authored for Ring-07
export const PROCEDURAL_HEIGHT_118 = 9.2619;
export const PROCEDURAL_COLOR_118 = 0xc8c87e;
// Procedural layer 118 — authored for Ring-07
export const PROCEDURAL_HEIGHT_119 = 1.6189;
export const PROCEDURAL_COLOR_119 = 0x4aa61c;
// Procedural layer 119 — authored for Ring-07
export const PROCEDURAL_HEIGHT_120 = 61.7992;
export const PROCEDURAL_COLOR_120 = 0xedb0b4;
// Procedural layer 120 — authored for Ring-07
export const PROCEDURAL_HEIGHT_121 = 3.4588;
export const PROCEDURAL_COLOR_121 = 0x766376;
// Procedural layer 121 — authored for Ring-07
export const PROCEDURAL_HEIGHT_122 = 10.5806;
export const PROCEDURAL_COLOR_122 = 0x50b72a;
// Procedural layer 122 — authored for Ring-07
export const PROCEDURAL_HEIGHT_123 = 19.0011;
export const PROCEDURAL_COLOR_123 = 0x45016b;
// Procedural layer 123 — authored for Ring-07
export const PROCEDURAL_HEIGHT_124 = 27.8940;
export const PROCEDURAL_COLOR_124 = 0x09012e;
// Procedural layer 124 — authored for Ring-07
export const PROCEDURAL_HEIGHT_125 = 55.3261;
export const PROCEDURAL_COLOR_125 = 0x3ae712;
// Procedural layer 125 — authored for Ring-07
export const PROCEDURAL_HEIGHT_126 = -9.9005;
export const PROCEDURAL_COLOR_126 = 0x9edb10;
// Procedural layer 126 — authored for Ring-07
export const PROCEDURAL_HEIGHT_127 = 37.2931;
export const PROCEDURAL_COLOR_127 = 0xab7cf5;
// Procedural layer 127 — authored for Ring-07
export const PROCEDURAL_HEIGHT_128 = 70.9029;
export const PROCEDURAL_COLOR_128 = 0x076a3f;
// Procedural layer 128 — authored for Ring-07
export const PROCEDURAL_HEIGHT_129 = 29.6787;
export const PROCEDURAL_COLOR_129 = 0x548035;
// Procedural layer 129 — authored for Ring-07
export const PROCEDURAL_HEIGHT_130 = 5.5744;
export const PROCEDURAL_COLOR_130 = 0xb17cdc;
// Procedural layer 130 — authored for Ring-07
export const PROCEDURAL_HEIGHT_131 = 5.9905;
export const PROCEDURAL_COLOR_131 = 0x6db887;
// Procedural layer 131 — authored for Ring-07
export const PROCEDURAL_HEIGHT_132 = 12.6731;
export const PROCEDURAL_COLOR_132 = 0x07f041;
// Procedural layer 132 — authored for Ring-07
export const PROCEDURAL_HEIGHT_133 = 52.9900;
export const PROCEDURAL_COLOR_133 = 0x471b4e;
// Procedural layer 133 — authored for Ring-07
export const PROCEDURAL_HEIGHT_134 = 61.0777;
export const PROCEDURAL_COLOR_134 = 0xacd4f8;
// Procedural layer 134 — authored for Ring-07
export const PROCEDURAL_HEIGHT_135 = 18.9692;
export const PROCEDURAL_COLOR_135 = 0xd28c95;
// Procedural layer 135 — authored for Ring-07
export const PROCEDURAL_HEIGHT_136 = 73.9251;
export const PROCEDURAL_COLOR_136 = 0xab5abf;
// Procedural layer 136 — authored for Ring-07
export const PROCEDURAL_HEIGHT_137 = 63.5504;
export const PROCEDURAL_COLOR_137 = 0x6eb612;
// Procedural layer 137 — authored for Ring-07
export const PROCEDURAL_HEIGHT_138 = 43.9786;
export const PROCEDURAL_COLOR_138 = 0x2911a4;
// Procedural layer 138 — authored for Ring-07
export const PROCEDURAL_HEIGHT_139 = 19.4773;
export const PROCEDURAL_COLOR_139 = 0xd30696;
// Procedural layer 139 — authored for Ring-07
export const PROCEDURAL_HEIGHT_140 = 70.4891;
export const PROCEDURAL_COLOR_140 = 0x75bd62;
// Procedural layer 140 — authored for Ring-07
export const PROCEDURAL_HEIGHT_141 = 6.2695;
export const PROCEDURAL_COLOR_141 = 0x2e4e4e;
// Procedural layer 141 — authored for Ring-07
export const PROCEDURAL_HEIGHT_142 = 8.3964;
export const PROCEDURAL_COLOR_142 = 0x9282c7;
// Procedural layer 142 — authored for Ring-07
export const PROCEDURAL_HEIGHT_143 = 24.1467;
export const PROCEDURAL_COLOR_143 = 0xc8c04e;
// Procedural layer 143 — authored for Ring-07
export const PROCEDURAL_HEIGHT_144 = -7.8726;
export const PROCEDURAL_COLOR_144 = 0x7e60e8;
// Procedural layer 144 — authored for Ring-07
export const PROCEDURAL_HEIGHT_145 = -11.8802;
export const PROCEDURAL_COLOR_145 = 0x15cab7;
// Procedural layer 145 — authored for Ring-07
export const PROCEDURAL_HEIGHT_146 = -19.2964;
export const PROCEDURAL_COLOR_146 = 0xaf9de7;
// Procedural layer 146 — authored for Ring-07
export const PROCEDURAL_HEIGHT_147 = 14.9221;
export const PROCEDURAL_COLOR_147 = 0xb9eab7;
// Procedural layer 147 — authored for Ring-07
export const PROCEDURAL_HEIGHT_148 = -12.3721;
export const PROCEDURAL_COLOR_148 = 0xd202b0;
// Procedural layer 148 — authored for Ring-07
export const PROCEDURAL_HEIGHT_149 = 65.0618;
export const PROCEDURAL_COLOR_149 = 0x9bb019;
// Procedural layer 149 — authored for Ring-07
export const PROCEDURAL_HEIGHT_150 = 29.0733;
export const PROCEDURAL_COLOR_150 = 0xd55499;
// Procedural layer 150 — authored for Ring-07
export const PROCEDURAL_HEIGHT_151 = 68.4345;
export const PROCEDURAL_COLOR_151 = 0x43f072;
// Procedural layer 151 — authored for Ring-07
export const PROCEDURAL_HEIGHT_152 = -14.5982;
export const PROCEDURAL_COLOR_152 = 0xf6351e;
// Procedural layer 152 — authored for Ring-07
export const PROCEDURAL_HEIGHT_153 = 76.6092;
export const PROCEDURAL_COLOR_153 = 0x254a75;
// Procedural layer 153 — authored for Ring-07
export const PROCEDURAL_HEIGHT_154 = -19.0568;
export const PROCEDURAL_COLOR_154 = 0x492adb;
// Procedural layer 154 — authored for Ring-07
export const PROCEDURAL_HEIGHT_155 = 79.6834;
export const PROCEDURAL_COLOR_155 = 0xc5f2a6;
// Procedural layer 155 — authored for Ring-07
