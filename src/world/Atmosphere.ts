/**
 * NEXUS: FRAGMENT — WORLD/Atmosphere
 * World generation — Atmosphere
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

import * as THREE from 'three';

export interface AtmosphereLayer { height: number; color: THREE.Color; roughness: number; }
export const ATMOSPHERE_SEED = 61145;

export class Atmosphere {
  private layers: AtmosphereLayer[] = [];
  constructor(public seed:number=ATMOSPHERE_SEED){}

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
export const ATMOSPHERE_HEIGHT_000 = -7.2582;
export const ATMOSPHERE_COLOR_000 = 0x806481;
// Atmosphere layer 0 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_001 = 33.2812;
export const ATMOSPHERE_COLOR_001 = 0x305e3b;
// Atmosphere layer 1 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_002 = 35.9350;
export const ATMOSPHERE_COLOR_002 = 0x1a13a5;
// Atmosphere layer 2 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_003 = 14.7451;
export const ATMOSPHERE_COLOR_003 = 0x44e2fa;
// Atmosphere layer 3 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_004 = 59.9704;
export const ATMOSPHERE_COLOR_004 = 0xc616e6;
// Atmosphere layer 4 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_005 = 63.9715;
export const ATMOSPHERE_COLOR_005 = 0x2e8bb6;
// Atmosphere layer 5 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_006 = 24.7278;
export const ATMOSPHERE_COLOR_006 = 0xbefbbd;
// Atmosphere layer 6 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_007 = -6.6116;
export const ATMOSPHERE_COLOR_007 = 0x2ba531;
// Atmosphere layer 7 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_008 = 43.2463;
export const ATMOSPHERE_COLOR_008 = 0x139cde;
// Atmosphere layer 8 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_009 = -16.8088;
export const ATMOSPHERE_COLOR_009 = 0x81cede;
// Atmosphere layer 9 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_010 = -2.4808;
export const ATMOSPHERE_COLOR_010 = 0x69e2fd;
// Atmosphere layer 10 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_011 = 16.3156;
export const ATMOSPHERE_COLOR_011 = 0x942b0d;
// Atmosphere layer 11 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_012 = 47.3218;
export const ATMOSPHERE_COLOR_012 = 0x2b0be4;
// Atmosphere layer 12 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_013 = 67.1640;
export const ATMOSPHERE_COLOR_013 = 0xeded7d;
// Atmosphere layer 13 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_014 = -12.3642;
export const ATMOSPHERE_COLOR_014 = 0xaae135;
// Atmosphere layer 14 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_015 = 21.8391;
export const ATMOSPHERE_COLOR_015 = 0x47d5a8;
// Atmosphere layer 15 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_016 = 9.8146;
export const ATMOSPHERE_COLOR_016 = 0x74a9a8;
// Atmosphere layer 16 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_017 = 63.4577;
export const ATMOSPHERE_COLOR_017 = 0xaf719d;
// Atmosphere layer 17 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_018 = 33.0717;
export const ATMOSPHERE_COLOR_018 = 0xb8b001;
// Atmosphere layer 18 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_019 = 41.1951;
export const ATMOSPHERE_COLOR_019 = 0x00f19f;
// Atmosphere layer 19 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_020 = 22.4189;
export const ATMOSPHERE_COLOR_020 = 0xb1e8a8;
// Atmosphere layer 20 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_021 = 48.1887;
export const ATMOSPHERE_COLOR_021 = 0xded026;
// Atmosphere layer 21 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_022 = 54.0710;
export const ATMOSPHERE_COLOR_022 = 0x8563c0;
// Atmosphere layer 22 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_023 = -11.2372;
export const ATMOSPHERE_COLOR_023 = 0x307ee3;
// Atmosphere layer 23 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_024 = 36.5774;
export const ATMOSPHERE_COLOR_024 = 0x78e6c1;
// Atmosphere layer 24 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_025 = 0.3180;
export const ATMOSPHERE_COLOR_025 = 0xf3aa9b;
// Atmosphere layer 25 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_026 = 12.3768;
export const ATMOSPHERE_COLOR_026 = 0x18bda1;
// Atmosphere layer 26 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_027 = 21.0896;
export const ATMOSPHERE_COLOR_027 = 0x09c4a3;
// Atmosphere layer 27 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_028 = 23.1281;
export const ATMOSPHERE_COLOR_028 = 0x72a82d;
// Atmosphere layer 28 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_029 = 8.9828;
export const ATMOSPHERE_COLOR_029 = 0x315a59;
// Atmosphere layer 29 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_030 = 48.2266;
export const ATMOSPHERE_COLOR_030 = 0x92c01c;
// Atmosphere layer 30 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_031 = 61.8432;
export const ATMOSPHERE_COLOR_031 = 0xe9b38d;
// Atmosphere layer 31 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_032 = 27.6793;
export const ATMOSPHERE_COLOR_032 = 0xe6fbda;
// Atmosphere layer 32 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_033 = 2.2011;
export const ATMOSPHERE_COLOR_033 = 0xa6007a;
// Atmosphere layer 33 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_034 = 1.5080;
export const ATMOSPHERE_COLOR_034 = 0xd5d05a;
// Atmosphere layer 34 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_035 = 18.8343;
export const ATMOSPHERE_COLOR_035 = 0xef6ba1;
// Atmosphere layer 35 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_036 = 78.1811;
export const ATMOSPHERE_COLOR_036 = 0x9d63ff;
// Atmosphere layer 36 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_037 = 40.6718;
export const ATMOSPHERE_COLOR_037 = 0xde1e55;
// Atmosphere layer 37 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_038 = 23.2775;
export const ATMOSPHERE_COLOR_038 = 0xb63df0;
// Atmosphere layer 38 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_039 = -5.7729;
export const ATMOSPHERE_COLOR_039 = 0xcdc328;
// Atmosphere layer 39 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_040 = 22.5932;
export const ATMOSPHERE_COLOR_040 = 0x48081a;
// Atmosphere layer 40 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_041 = 29.6830;
export const ATMOSPHERE_COLOR_041 = 0xc479ee;
// Atmosphere layer 41 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_042 = 61.3874;
export const ATMOSPHERE_COLOR_042 = 0x1dcc3f;
// Atmosphere layer 42 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_043 = 60.1656;
export const ATMOSPHERE_COLOR_043 = 0x5be300;
// Atmosphere layer 43 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_044 = 59.3361;
export const ATMOSPHERE_COLOR_044 = 0xd32525;
// Atmosphere layer 44 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_045 = -15.0009;
export const ATMOSPHERE_COLOR_045 = 0x7702bb;
// Atmosphere layer 45 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_046 = 44.5472;
export const ATMOSPHERE_COLOR_046 = 0x42c338;
// Atmosphere layer 46 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_047 = 50.1828;
export const ATMOSPHERE_COLOR_047 = 0x6e4a57;
// Atmosphere layer 47 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_048 = 38.1698;
export const ATMOSPHERE_COLOR_048 = 0x274b3c;
// Atmosphere layer 48 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_049 = 20.7711;
export const ATMOSPHERE_COLOR_049 = 0xa762da;
// Atmosphere layer 49 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_050 = 65.5685;
export const ATMOSPHERE_COLOR_050 = 0xc63ae9;
// Atmosphere layer 50 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_051 = 57.0071;
export const ATMOSPHERE_COLOR_051 = 0x975a02;
// Atmosphere layer 51 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_052 = 70.1116;
export const ATMOSPHERE_COLOR_052 = 0xb66ccd;
// Atmosphere layer 52 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_053 = 42.0138;
export const ATMOSPHERE_COLOR_053 = 0x736513;
// Atmosphere layer 53 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_054 = -12.8912;
export const ATMOSPHERE_COLOR_054 = 0x332370;
// Atmosphere layer 54 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_055 = 44.0949;
export const ATMOSPHERE_COLOR_055 = 0xc4088c;
// Atmosphere layer 55 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_056 = -17.1066;
export const ATMOSPHERE_COLOR_056 = 0xc34088;
// Atmosphere layer 56 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_057 = 16.2865;
export const ATMOSPHERE_COLOR_057 = 0xfa012b;
// Atmosphere layer 57 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_058 = 41.5516;
export const ATMOSPHERE_COLOR_058 = 0x2edc57;
// Atmosphere layer 58 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_059 = 23.0907;
export const ATMOSPHERE_COLOR_059 = 0x043690;
// Atmosphere layer 59 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_060 = 23.4171;
export const ATMOSPHERE_COLOR_060 = 0xe972cb;
// Atmosphere layer 60 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_061 = 2.8971;
export const ATMOSPHERE_COLOR_061 = 0xa6d93e;
// Atmosphere layer 61 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_062 = 47.1826;
export const ATMOSPHERE_COLOR_062 = 0x8ee48b;
// Atmosphere layer 62 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_063 = 14.5881;
export const ATMOSPHERE_COLOR_063 = 0x52bec3;
// Atmosphere layer 63 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_064 = 56.7326;
export const ATMOSPHERE_COLOR_064 = 0x4097e6;
// Atmosphere layer 64 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_065 = 9.0395;
export const ATMOSPHERE_COLOR_065 = 0xee18a3;
// Atmosphere layer 65 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_066 = 4.0508;
export const ATMOSPHERE_COLOR_066 = 0x8a0fd2;
// Atmosphere layer 66 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_067 = 34.1228;
export const ATMOSPHERE_COLOR_067 = 0x71e7d0;
// Atmosphere layer 67 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_068 = 57.2083;
export const ATMOSPHERE_COLOR_068 = 0xf28c73;
// Atmosphere layer 68 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_069 = -19.7604;
export const ATMOSPHERE_COLOR_069 = 0x50ee88;
// Atmosphere layer 69 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_070 = 46.4578;
export const ATMOSPHERE_COLOR_070 = 0xc554b0;
// Atmosphere layer 70 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_071 = 22.5442;
export const ATMOSPHERE_COLOR_071 = 0x343889;
// Atmosphere layer 71 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_072 = 60.7794;
export const ATMOSPHERE_COLOR_072 = 0x4994c9;
// Atmosphere layer 72 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_073 = 5.7245;
export const ATMOSPHERE_COLOR_073 = 0xe56a2f;
// Atmosphere layer 73 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_074 = -14.0967;
export const ATMOSPHERE_COLOR_074 = 0x464010;
// Atmosphere layer 74 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_075 = 30.2670;
export const ATMOSPHERE_COLOR_075 = 0x8e6f9d;
// Atmosphere layer 75 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_076 = 6.6271;
export const ATMOSPHERE_COLOR_076 = 0x8196b5;
// Atmosphere layer 76 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_077 = 69.3372;
export const ATMOSPHERE_COLOR_077 = 0x52054c;
// Atmosphere layer 77 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_078 = 6.7177;
export const ATMOSPHERE_COLOR_078 = 0x272495;
// Atmosphere layer 78 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_079 = 15.1717;
export const ATMOSPHERE_COLOR_079 = 0xf15377;
// Atmosphere layer 79 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_080 = 6.7884;
export const ATMOSPHERE_COLOR_080 = 0x4c2c57;
// Atmosphere layer 80 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_081 = 9.3057;
export const ATMOSPHERE_COLOR_081 = 0xf788b5;
// Atmosphere layer 81 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_082 = 65.4201;
export const ATMOSPHERE_COLOR_082 = 0x848f93;
// Atmosphere layer 82 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_083 = -7.6906;
export const ATMOSPHERE_COLOR_083 = 0x579502;
// Atmosphere layer 83 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_084 = 75.4604;
export const ATMOSPHERE_COLOR_084 = 0xd7c911;
// Atmosphere layer 84 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_085 = 79.3449;
export const ATMOSPHERE_COLOR_085 = 0x668ea4;
// Atmosphere layer 85 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_086 = 20.4211;
export const ATMOSPHERE_COLOR_086 = 0x038d48;
// Atmosphere layer 86 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_087 = 62.6129;
export const ATMOSPHERE_COLOR_087 = 0x8d7e26;
// Atmosphere layer 87 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_088 = 38.9894;
export const ATMOSPHERE_COLOR_088 = 0xfdc88e;
// Atmosphere layer 88 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_089 = -6.4764;
export const ATMOSPHERE_COLOR_089 = 0xaa06b9;
// Atmosphere layer 89 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_090 = 35.9286;
export const ATMOSPHERE_COLOR_090 = 0x57712a;
// Atmosphere layer 90 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_091 = -19.4270;
export const ATMOSPHERE_COLOR_091 = 0xa5d5fb;
// Atmosphere layer 91 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_092 = -14.5623;
export const ATMOSPHERE_COLOR_092 = 0xd42db8;
// Atmosphere layer 92 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_093 = 38.0808;
export const ATMOSPHERE_COLOR_093 = 0xf9d34a;
// Atmosphere layer 93 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_094 = 0.1877;
export const ATMOSPHERE_COLOR_094 = 0x920af8;
// Atmosphere layer 94 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_095 = 10.0542;
export const ATMOSPHERE_COLOR_095 = 0x56a641;
// Atmosphere layer 95 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_096 = 45.9918;
export const ATMOSPHERE_COLOR_096 = 0x0c7a1a;
// Atmosphere layer 96 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_097 = 20.4439;
export const ATMOSPHERE_COLOR_097 = 0xc7f458;
// Atmosphere layer 97 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_098 = 59.1485;
export const ATMOSPHERE_COLOR_098 = 0x333822;
// Atmosphere layer 98 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_099 = 49.5003;
export const ATMOSPHERE_COLOR_099 = 0x80c823;
// Atmosphere layer 99 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_100 = 46.6424;
export const ATMOSPHERE_COLOR_100 = 0xd12f00;
// Atmosphere layer 100 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_101 = 2.7770;
export const ATMOSPHERE_COLOR_101 = 0xa2a5e2;
// Atmosphere layer 101 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_102 = 28.6105;
export const ATMOSPHERE_COLOR_102 = 0x6a8aed;
// Atmosphere layer 102 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_103 = 69.5470;
export const ATMOSPHERE_COLOR_103 = 0x5c999e;
// Atmosphere layer 103 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_104 = 55.4863;
export const ATMOSPHERE_COLOR_104 = 0x3f4747;
// Atmosphere layer 104 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_105 = 38.3893;
export const ATMOSPHERE_COLOR_105 = 0xc4ecc6;
// Atmosphere layer 105 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_106 = 1.2862;
export const ATMOSPHERE_COLOR_106 = 0x47f373;
// Atmosphere layer 106 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_107 = 39.5245;
export const ATMOSPHERE_COLOR_107 = 0xd93191;
// Atmosphere layer 107 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_108 = 67.9844;
export const ATMOSPHERE_COLOR_108 = 0x2c6348;
// Atmosphere layer 108 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_109 = -18.9184;
export const ATMOSPHERE_COLOR_109 = 0x79eb13;
// Atmosphere layer 109 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_110 = 8.2165;
export const ATMOSPHERE_COLOR_110 = 0xe2eece;
// Atmosphere layer 110 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_111 = -16.9198;
export const ATMOSPHERE_COLOR_111 = 0xc27111;
// Atmosphere layer 111 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_112 = 47.8227;
export const ATMOSPHERE_COLOR_112 = 0x03766c;
// Atmosphere layer 112 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_113 = -14.4055;
export const ATMOSPHERE_COLOR_113 = 0x5b27cd;
// Atmosphere layer 113 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_114 = 5.3411;
export const ATMOSPHERE_COLOR_114 = 0x87c882;
// Atmosphere layer 114 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_115 = -11.9632;
export const ATMOSPHERE_COLOR_115 = 0xf2d98b;
// Atmosphere layer 115 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_116 = 40.6612;
export const ATMOSPHERE_COLOR_116 = 0xb1c9eb;
// Atmosphere layer 116 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_117 = 79.6509;
export const ATMOSPHERE_COLOR_117 = 0xf3f200;
// Atmosphere layer 117 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_118 = 69.6845;
export const ATMOSPHERE_COLOR_118 = 0xc49ca2;
// Atmosphere layer 118 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_119 = -2.3192;
export const ATMOSPHERE_COLOR_119 = 0xd2c679;
// Atmosphere layer 119 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_120 = 64.7035;
export const ATMOSPHERE_COLOR_120 = 0x8e86c7;
// Atmosphere layer 120 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_121 = 3.3770;
export const ATMOSPHERE_COLOR_121 = 0x5501c1;
// Atmosphere layer 121 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_122 = 66.0623;
export const ATMOSPHERE_COLOR_122 = 0xdc99e1;
// Atmosphere layer 122 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_123 = 15.6612;
export const ATMOSPHERE_COLOR_123 = 0xd129c9;
// Atmosphere layer 123 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_124 = 42.4978;
export const ATMOSPHERE_COLOR_124 = 0xa1845a;
// Atmosphere layer 124 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_125 = -6.5350;
export const ATMOSPHERE_COLOR_125 = 0xca8f9b;
// Atmosphere layer 125 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_126 = 68.4579;
export const ATMOSPHERE_COLOR_126 = 0x7480ec;
// Atmosphere layer 126 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_127 = 70.5555;
export const ATMOSPHERE_COLOR_127 = 0x5c0a69;
// Atmosphere layer 127 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_128 = 38.3620;
export const ATMOSPHERE_COLOR_128 = 0x55797d;
// Atmosphere layer 128 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_129 = 34.0206;
export const ATMOSPHERE_COLOR_129 = 0xdafee9;
// Atmosphere layer 129 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_130 = 24.7499;
export const ATMOSPHERE_COLOR_130 = 0x6f1ad0;
// Atmosphere layer 130 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_131 = 18.0507;
export const ATMOSPHERE_COLOR_131 = 0x18ec5b;
// Atmosphere layer 131 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_132 = 74.9259;
export const ATMOSPHERE_COLOR_132 = 0x7dc4e3;
// Atmosphere layer 132 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_133 = 24.5628;
export const ATMOSPHERE_COLOR_133 = 0x119112;
// Atmosphere layer 133 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_134 = 32.8342;
export const ATMOSPHERE_COLOR_134 = 0x596ba3;
// Atmosphere layer 134 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_135 = 20.0483;
export const ATMOSPHERE_COLOR_135 = 0xeb837c;
// Atmosphere layer 135 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_136 = 34.6216;
export const ATMOSPHERE_COLOR_136 = 0xe6bdc0;
// Atmosphere layer 136 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_137 = 75.0547;
export const ATMOSPHERE_COLOR_137 = 0x6ac528;
// Atmosphere layer 137 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_138 = 15.6583;
export const ATMOSPHERE_COLOR_138 = 0xff25c4;
// Atmosphere layer 138 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_139 = 13.9071;
export const ATMOSPHERE_COLOR_139 = 0x849d94;
// Atmosphere layer 139 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_140 = -13.8890;
export const ATMOSPHERE_COLOR_140 = 0x567719;
// Atmosphere layer 140 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_141 = -6.3562;
export const ATMOSPHERE_COLOR_141 = 0x08c207;
// Atmosphere layer 141 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_142 = 61.0554;
export const ATMOSPHERE_COLOR_142 = 0x4d11b7;
// Atmosphere layer 142 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_143 = -6.7066;
export const ATMOSPHERE_COLOR_143 = 0xc39d91;
// Atmosphere layer 143 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_144 = 44.4750;
export const ATMOSPHERE_COLOR_144 = 0x0b92b0;
// Atmosphere layer 144 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_145 = -16.0472;
export const ATMOSPHERE_COLOR_145 = 0xab1610;
// Atmosphere layer 145 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_146 = 66.5603;
export const ATMOSPHERE_COLOR_146 = 0x134b05;
// Atmosphere layer 146 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_147 = 31.7829;
export const ATMOSPHERE_COLOR_147 = 0x72ea17;
// Atmosphere layer 147 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_148 = 30.9255;
export const ATMOSPHERE_COLOR_148 = 0x0ea2f5;
// Atmosphere layer 148 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_149 = 49.9238;
export const ATMOSPHERE_COLOR_149 = 0x4e491e;
// Atmosphere layer 149 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_150 = 64.6095;
export const ATMOSPHERE_COLOR_150 = 0x5a238d;
// Atmosphere layer 150 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_151 = -8.9769;
export const ATMOSPHERE_COLOR_151 = 0x80745c;
// Atmosphere layer 151 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_152 = 25.4002;
export const ATMOSPHERE_COLOR_152 = 0x6f5497;
// Atmosphere layer 152 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_153 = 68.7356;
export const ATMOSPHERE_COLOR_153 = 0x0f5c3e;
// Atmosphere layer 153 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_154 = 60.2774;
export const ATMOSPHERE_COLOR_154 = 0x685c58;
// Atmosphere layer 154 — authored for Ring-07
export const ATMOSPHERE_HEIGHT_155 = -4.3964;
export const ATMOSPHERE_COLOR_155 = 0xdb6d03;
// Atmosphere layer 155 — authored for Ring-07
