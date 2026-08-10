/**
 * NEXUS: FRAGMENT — UI/GameOver
 * UI subsystem — GameOver
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

import * as THREE from 'three';

export interface GameOverProps { visible: boolean; opacity: number; scale: number; }
export class GameOver {
  public props: GameOverProps = {visible:true, opacity:1, scale:1};
  private animT=0; private elements: HTMLElement[]=[];

  constructor(public id:string='gameover'){}

  public mount(dt:number): void {
    this.animT+=dt;
    const p0= Math.sin(this.animT*0.80)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p0, 0,1);
    const p1= Math.sin(this.animT*1.10)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p1, 0,1);
    const p2= Math.sin(this.animT*1.40)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p2, 0,1);
    const p3= Math.sin(this.animT*1.70)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p3, 0,1);
  }

  public unmount(dt:number): void {
    this.animT+=dt;
    const p0= Math.sin(this.animT*0.80)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p0, 0,1);
    const p1= Math.sin(this.animT*1.10)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p1, 0,1);
    const p2= Math.sin(this.animT*1.40)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p2, 0,1);
    const p3= Math.sin(this.animT*1.70)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p3, 0,1);
  }

  public update(dt:number): void {
    this.animT+=dt;
    const p0= Math.sin(this.animT*0.80)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p0, 0,1);
    const p1= Math.sin(this.animT*1.10)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p1, 0,1);
    const p2= Math.sin(this.animT*1.40)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p2, 0,1);
    const p3= Math.sin(this.animT*1.70)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p3, 0,1);
  }

  public render(dt:number): void {
    this.animT+=dt;
    const p0= Math.sin(this.animT*0.80)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p0, 0,1);
    const p1= Math.sin(this.animT*1.10)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p1, 0,1);
    const p2= Math.sin(this.animT*1.40)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p2, 0,1);
    const p3= Math.sin(this.animT*1.70)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p3, 0,1);
  }

  public animate(dt:number): void {
    this.animT+=dt;
    const p0= Math.sin(this.animT*0.80)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p0, 0,1);
    const p1= Math.sin(this.animT*1.10)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p1, 0,1);
    const p2= Math.sin(this.animT*1.40)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p2, 0,1);
    const p3= Math.sin(this.animT*1.70)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p3, 0,1);
  }

  public onInput(dt:number): void {
    this.animT+=dt;
    const p0= Math.sin(this.animT*0.80)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p0, 0,1);
    const p1= Math.sin(this.animT*1.10)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p1, 0,1);
    const p2= Math.sin(this.animT*1.40)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p2, 0,1);
    const p3= Math.sin(this.animT*1.70)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p3, 0,1);
  }

  public onResize(dt:number): void {
    this.animT+=dt;
    const p0= Math.sin(this.animT*0.80)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p0, 0,1);
    const p1= Math.sin(this.animT*1.10)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p1, 0,1);
    const p2= Math.sin(this.animT*1.40)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p2, 0,1);
    const p3= Math.sin(this.animT*1.70)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p3, 0,1);
  }

  public setVisible(dt:number): void {
    this.animT+=dt;
    const p0= Math.sin(this.animT*0.80)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p0, 0,1);
    const p1= Math.sin(this.animT*1.10)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p1, 0,1);
    const p2= Math.sin(this.animT*1.40)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p2, 0,1);
    const p3= Math.sin(this.animT*1.70)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p3, 0,1);
  }

  public fadeIn(dt:number): void {
    this.animT+=dt;
    const p0= Math.sin(this.animT*0.80)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p0, 0,1);
    const p1= Math.sin(this.animT*1.10)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p1, 0,1);
    const p2= Math.sin(this.animT*1.40)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p2, 0,1);
    const p3= Math.sin(this.animT*1.70)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p3, 0,1);
  }

  public fadeOut(dt:number): void {
    this.animT+=dt;
    const p0= Math.sin(this.animT*0.80)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p0, 0,1);
    const p1= Math.sin(this.animT*1.10)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p1, 0,1);
    const p2= Math.sin(this.animT*1.40)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p2, 0,1);
    const p3= Math.sin(this.animT*1.70)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p3, 0,1);
  }

  public pulse(dt:number): void {
    this.animT+=dt;
    const p0= Math.sin(this.animT*0.80)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p0, 0,1);
    const p1= Math.sin(this.animT*1.10)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p1, 0,1);
    const p2= Math.sin(this.animT*1.40)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p2, 0,1);
    const p3= Math.sin(this.animT*1.70)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p3, 0,1);
  }

  public shake(dt:number): void {
    this.animT+=dt;
    const p0= Math.sin(this.animT*0.80)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p0, 0,1);
    const p1= Math.sin(this.animT*1.10)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p1, 0,1);
    const p2= Math.sin(this.animT*1.40)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p2, 0,1);
    const p3= Math.sin(this.animT*1.70)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p3, 0,1);
  }

  public transition(dt:number): void {
    this.animT+=dt;
    const p0= Math.sin(this.animT*0.80)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p0, 0,1);
    const p1= Math.sin(this.animT*1.10)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p1, 0,1);
    const p2= Math.sin(this.animT*1.40)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p2, 0,1);
    const p3= Math.sin(this.animT*1.70)*0.04;
    this.props.opacity = THREE.MathUtils.clamp(this.props.opacity + p3, 0,1);
  }

  public layout00(w:number,h:number): {x:number,y:number} {
    const x= (w*0.5 + Math.sin(h*0.00100)*12);
    const y= (h*0.5 + Math.cos(w*0.00100)*10);
    return {x,y};
  }

  public layout01(w:number,h:number): {x:number,y:number} {
    const x= (w*0.5 + Math.sin(h*0.00110)*12);
    const y= (h*0.5 + Math.cos(w*0.00110)*10);
    return {x,y};
  }

  public layout02(w:number,h:number): {x:number,y:number} {
    const x= (w*0.5 + Math.sin(h*0.00120)*12);
    const y= (h*0.5 + Math.cos(w*0.00120)*10);
    return {x,y};
  }

  public layout03(w:number,h:number): {x:number,y:number} {
    const x= (w*0.5 + Math.sin(h*0.00130)*12);
    const y= (h*0.5 + Math.cos(w*0.00130)*10);
    return {x,y};
  }

  public layout04(w:number,h:number): {x:number,y:number} {
    const x= (w*0.5 + Math.sin(h*0.00140)*12);
    const y= (h*0.5 + Math.cos(w*0.00140)*10);
    return {x,y};
  }

  public layout05(w:number,h:number): {x:number,y:number} {
    const x= (w*0.5 + Math.sin(h*0.00150)*12);
    const y= (h*0.5 + Math.cos(w*0.00150)*10);
    return {x,y};
  }

  public layout06(w:number,h:number): {x:number,y:number} {
    const x= (w*0.5 + Math.sin(h*0.00160)*12);
    const y= (h*0.5 + Math.cos(w*0.00160)*10);
    return {x,y};
  }

  public layout07(w:number,h:number): {x:number,y:number} {
    const x= (w*0.5 + Math.sin(h*0.00170)*12);
    const y= (h*0.5 + Math.cos(w*0.00170)*10);
    return {x,y};
  }

  public layout08(w:number,h:number): {x:number,y:number} {
    const x= (w*0.5 + Math.sin(h*0.00180)*12);
    const y= (h*0.5 + Math.cos(w*0.00180)*10);
    return {x,y};
  }

  public layout09(w:number,h:number): {x:number,y:number} {
    const x= (w*0.5 + Math.sin(h*0.00190)*12);
    const y= (h*0.5 + Math.cos(w*0.00190)*10);
    return {x,y};
  }

  public layout10(w:number,h:number): {x:number,y:number} {
    const x= (w*0.5 + Math.sin(h*0.00200)*12);
    const y= (h*0.5 + Math.cos(w*0.00200)*10);
    return {x,y};
  }

  public layout11(w:number,h:number): {x:number,y:number} {
    const x= (w*0.5 + Math.sin(h*0.00210)*12);
    const y= (h*0.5 + Math.cos(w*0.00210)*10);
    return {x,y};
  }

  public layout12(w:number,h:number): {x:number,y:number} {
    const x= (w*0.5 + Math.sin(h*0.00220)*12);
    const y= (h*0.5 + Math.cos(w*0.00220)*10);
    return {x,y};
  }

  public layout13(w:number,h:number): {x:number,y:number} {
    const x= (w*0.5 + Math.sin(h*0.00230)*12);
    const y= (h*0.5 + Math.cos(w*0.00230)*10);
    return {x,y};
  }

  public layout14(w:number,h:number): {x:number,y:number} {
    const x= (w*0.5 + Math.sin(h*0.00240)*12);
    const y= (h*0.5 + Math.cos(w*0.00240)*10);
    return {x,y};
  }

  public layout15(w:number,h:number): {x:number,y:number} {
    const x= (w*0.5 + Math.sin(h*0.00250)*12);
    const y= (h*0.5 + Math.cos(w*0.00250)*10);
    return {x,y};
  }

  public layout16(w:number,h:number): {x:number,y:number} {
    const x= (w*0.5 + Math.sin(h*0.00260)*12);
    const y= (h*0.5 + Math.cos(w*0.00260)*10);
    return {x,y};
  }

  public layout17(w:number,h:number): {x:number,y:number} {
    const x= (w*0.5 + Math.sin(h*0.00270)*12);
    const y= (h*0.5 + Math.cos(w*0.00270)*10);
    return {x,y};
  }

}
export const GAMEOVER_STYLE_000 = 'opacity:0.554; transform:scale(0.914)';
// GameOver — style 0
export const GAMEOVER_TOKEN_000 = 'GameOver-0';
export const GAMEOVER_STYLE_001 = 'opacity:0.131; transform:scale(1.074)';
// GameOver — style 1
export const GAMEOVER_TOKEN_001 = 'GameOver-1';
export const GAMEOVER_STYLE_002 = 'opacity:0.694; transform:scale(0.958)';
// GameOver — style 2
export const GAMEOVER_TOKEN_002 = 'GameOver-2';
export const GAMEOVER_STYLE_003 = 'opacity:0.827; transform:scale(0.932)';
// GameOver — style 3
export const GAMEOVER_TOKEN_003 = 'GameOver-3';
export const GAMEOVER_STYLE_004 = 'opacity:0.767; transform:scale(1.088)';
// GameOver — style 4
export const GAMEOVER_TOKEN_004 = 'GameOver-4';
export const GAMEOVER_STYLE_005 = 'opacity:0.513; transform:scale(0.941)';
// GameOver — style 5
export const GAMEOVER_TOKEN_005 = 'GameOver-5';
export const GAMEOVER_STYLE_006 = 'opacity:0.737; transform:scale(0.905)';
// GameOver — style 6
export const GAMEOVER_TOKEN_006 = 'GameOver-6';
export const GAMEOVER_STYLE_007 = 'opacity:0.238; transform:scale(0.961)';
// GameOver — style 7
export const GAMEOVER_TOKEN_007 = 'GameOver-7';
export const GAMEOVER_STYLE_008 = 'opacity:0.720; transform:scale(0.953)';
// GameOver — style 8
export const GAMEOVER_TOKEN_008 = 'GameOver-8';
export const GAMEOVER_STYLE_009 = 'opacity:0.793; transform:scale(1.027)';
// GameOver — style 9
export const GAMEOVER_TOKEN_009 = 'GameOver-9';
export const GAMEOVER_STYLE_010 = 'opacity:0.740; transform:scale(0.933)';
// GameOver — style 10
export const GAMEOVER_TOKEN_010 = 'GameOver-10';
export const GAMEOVER_STYLE_011 = 'opacity:0.593; transform:scale(0.962)';
// GameOver — style 11
export const GAMEOVER_TOKEN_011 = 'GameOver-11';
export const GAMEOVER_STYLE_012 = 'opacity:0.999; transform:scale(1.022)';
// GameOver — style 12
export const GAMEOVER_TOKEN_012 = 'GameOver-12';
export const GAMEOVER_STYLE_013 = 'opacity:0.269; transform:scale(1.044)';
// GameOver — style 13
export const GAMEOVER_TOKEN_013 = 'GameOver-13';
export const GAMEOVER_STYLE_014 = 'opacity:0.942; transform:scale(1.074)';
// GameOver — style 14
export const GAMEOVER_TOKEN_014 = 'GameOver-14';
export const GAMEOVER_STYLE_015 = 'opacity:0.666; transform:scale(1.098)';
// GameOver — style 15
export const GAMEOVER_TOKEN_015 = 'GameOver-15';
export const GAMEOVER_STYLE_016 = 'opacity:0.020; transform:scale(1.049)';
// GameOver — style 16
export const GAMEOVER_TOKEN_016 = 'GameOver-16';
export const GAMEOVER_STYLE_017 = 'opacity:0.965; transform:scale(0.955)';
// GameOver — style 17
export const GAMEOVER_TOKEN_017 = 'GameOver-17';
export const GAMEOVER_STYLE_018 = 'opacity:0.227; transform:scale(0.929)';
// GameOver — style 18
export const GAMEOVER_TOKEN_018 = 'GameOver-18';
export const GAMEOVER_STYLE_019 = 'opacity:0.690; transform:scale(0.975)';
// GameOver — style 19
export const GAMEOVER_TOKEN_019 = 'GameOver-19';
export const GAMEOVER_STYLE_020 = 'opacity:0.108; transform:scale(0.930)';
// GameOver — style 20
export const GAMEOVER_TOKEN_020 = 'GameOver-20';
export const GAMEOVER_STYLE_021 = 'opacity:0.565; transform:scale(1.083)';
// GameOver — style 21
export const GAMEOVER_TOKEN_021 = 'GameOver-21';
export const GAMEOVER_STYLE_022 = 'opacity:0.938; transform:scale(0.919)';
// GameOver — style 22
export const GAMEOVER_TOKEN_022 = 'GameOver-22';
export const GAMEOVER_STYLE_023 = 'opacity:0.676; transform:scale(1.090)';
// GameOver — style 23
export const GAMEOVER_TOKEN_023 = 'GameOver-23';
export const GAMEOVER_STYLE_024 = 'opacity:0.814; transform:scale(1.097)';
// GameOver — style 24
export const GAMEOVER_TOKEN_024 = 'GameOver-24';
export const GAMEOVER_STYLE_025 = 'opacity:0.702; transform:scale(0.900)';
// GameOver — style 25
export const GAMEOVER_TOKEN_025 = 'GameOver-25';
export const GAMEOVER_STYLE_026 = 'opacity:0.914; transform:scale(1.099)';
// GameOver — style 26
export const GAMEOVER_TOKEN_026 = 'GameOver-26';
export const GAMEOVER_STYLE_027 = 'opacity:0.770; transform:scale(1.066)';
// GameOver — style 27
export const GAMEOVER_TOKEN_027 = 'GameOver-27';
export const GAMEOVER_STYLE_028 = 'opacity:0.874; transform:scale(0.944)';
// GameOver — style 28
export const GAMEOVER_TOKEN_028 = 'GameOver-28';
export const GAMEOVER_STYLE_029 = 'opacity:0.309; transform:scale(0.955)';
// GameOver — style 29
export const GAMEOVER_TOKEN_029 = 'GameOver-29';
export const GAMEOVER_STYLE_030 = 'opacity:0.613; transform:scale(1.028)';
// GameOver — style 30
export const GAMEOVER_TOKEN_030 = 'GameOver-30';
export const GAMEOVER_STYLE_031 = 'opacity:0.635; transform:scale(1.003)';
// GameOver — style 31
export const GAMEOVER_TOKEN_031 = 'GameOver-31';
export const GAMEOVER_STYLE_032 = 'opacity:0.446; transform:scale(1.082)';
// GameOver — style 32
export const GAMEOVER_TOKEN_032 = 'GameOver-32';
export const GAMEOVER_STYLE_033 = 'opacity:0.855; transform:scale(0.969)';
// GameOver — style 33
export const GAMEOVER_TOKEN_033 = 'GameOver-33';
export const GAMEOVER_STYLE_034 = 'opacity:0.674; transform:scale(0.959)';
// GameOver — style 34
export const GAMEOVER_TOKEN_034 = 'GameOver-34';
export const GAMEOVER_STYLE_035 = 'opacity:0.025; transform:scale(1.013)';
// GameOver — style 35
export const GAMEOVER_TOKEN_035 = 'GameOver-35';
export const GAMEOVER_STYLE_036 = 'opacity:0.792; transform:scale(0.979)';
// GameOver — style 36
export const GAMEOVER_TOKEN_036 = 'GameOver-36';
export const GAMEOVER_STYLE_037 = 'opacity:0.898; transform:scale(0.968)';
// GameOver — style 37
export const GAMEOVER_TOKEN_037 = 'GameOver-37';
export const GAMEOVER_STYLE_038 = 'opacity:0.064; transform:scale(1.069)';
// GameOver — style 38
export const GAMEOVER_TOKEN_038 = 'GameOver-38';
export const GAMEOVER_STYLE_039 = 'opacity:0.394; transform:scale(0.934)';
// GameOver — style 39
export const GAMEOVER_TOKEN_039 = 'GameOver-39';
export const GAMEOVER_STYLE_040 = 'opacity:0.044; transform:scale(1.074)';
// GameOver — style 40
export const GAMEOVER_TOKEN_040 = 'GameOver-40';
export const GAMEOVER_STYLE_041 = 'opacity:0.705; transform:scale(0.946)';
// GameOver — style 41
export const GAMEOVER_TOKEN_041 = 'GameOver-41';
export const GAMEOVER_STYLE_042 = 'opacity:0.673; transform:scale(0.917)';
// GameOver — style 42
export const GAMEOVER_TOKEN_042 = 'GameOver-42';
export const GAMEOVER_STYLE_043 = 'opacity:0.083; transform:scale(1.045)';
// GameOver — style 43
export const GAMEOVER_TOKEN_043 = 'GameOver-43';
export const GAMEOVER_STYLE_044 = 'opacity:0.636; transform:scale(0.973)';
// GameOver — style 44
export const GAMEOVER_TOKEN_044 = 'GameOver-44';
export const GAMEOVER_STYLE_045 = 'opacity:0.314; transform:scale(1.071)';
// GameOver — style 45
export const GAMEOVER_TOKEN_045 = 'GameOver-45';
export const GAMEOVER_STYLE_046 = 'opacity:0.593; transform:scale(0.962)';
// GameOver — style 46
export const GAMEOVER_TOKEN_046 = 'GameOver-46';
export const GAMEOVER_STYLE_047 = 'opacity:0.315; transform:scale(0.939)';
// GameOver — style 47
export const GAMEOVER_TOKEN_047 = 'GameOver-47';
export const GAMEOVER_STYLE_048 = 'opacity:0.544; transform:scale(1.022)';
// GameOver — style 48
export const GAMEOVER_TOKEN_048 = 'GameOver-48';
export const GAMEOVER_STYLE_049 = 'opacity:0.761; transform:scale(0.918)';
// GameOver — style 49
export const GAMEOVER_TOKEN_049 = 'GameOver-49';
export const GAMEOVER_STYLE_050 = 'opacity:0.664; transform:scale(1.095)';
// GameOver — style 50
export const GAMEOVER_TOKEN_050 = 'GameOver-50';
export const GAMEOVER_STYLE_051 = 'opacity:0.870; transform:scale(0.933)';
// GameOver — style 51
export const GAMEOVER_TOKEN_051 = 'GameOver-51';
export const GAMEOVER_STYLE_052 = 'opacity:0.779; transform:scale(1.045)';
// GameOver — style 52
export const GAMEOVER_TOKEN_052 = 'GameOver-52';
export const GAMEOVER_STYLE_053 = 'opacity:0.462; transform:scale(1.063)';
// GameOver — style 53
export const GAMEOVER_TOKEN_053 = 'GameOver-53';
export const GAMEOVER_STYLE_054 = 'opacity:0.902; transform:scale(1.031)';
// GameOver — style 54
export const GAMEOVER_TOKEN_054 = 'GameOver-54';
export const GAMEOVER_STYLE_055 = 'opacity:0.327; transform:scale(1.023)';
// GameOver — style 55
export const GAMEOVER_TOKEN_055 = 'GameOver-55';
export const GAMEOVER_STYLE_056 = 'opacity:0.826; transform:scale(0.949)';
// GameOver — style 56
export const GAMEOVER_TOKEN_056 = 'GameOver-56';
export const GAMEOVER_STYLE_057 = 'opacity:0.263; transform:scale(1.009)';
// GameOver — style 57
export const GAMEOVER_TOKEN_057 = 'GameOver-57';
export const GAMEOVER_STYLE_058 = 'opacity:0.104; transform:scale(0.982)';
// GameOver — style 58
export const GAMEOVER_TOKEN_058 = 'GameOver-58';
export const GAMEOVER_STYLE_059 = 'opacity:0.488; transform:scale(0.914)';
// GameOver — style 59
export const GAMEOVER_TOKEN_059 = 'GameOver-59';
export const GAMEOVER_STYLE_060 = 'opacity:0.396; transform:scale(0.990)';
// GameOver — style 60
export const GAMEOVER_TOKEN_060 = 'GameOver-60';
export const GAMEOVER_STYLE_061 = 'opacity:0.073; transform:scale(0.974)';
// GameOver — style 61
export const GAMEOVER_TOKEN_061 = 'GameOver-61';
export const GAMEOVER_STYLE_062 = 'opacity:0.201; transform:scale(0.921)';
// GameOver — style 62
export const GAMEOVER_TOKEN_062 = 'GameOver-62';
export const GAMEOVER_STYLE_063 = 'opacity:0.582; transform:scale(0.903)';
// GameOver — style 63
export const GAMEOVER_TOKEN_063 = 'GameOver-63';
export const GAMEOVER_STYLE_064 = 'opacity:0.499; transform:scale(0.904)';
// GameOver — style 64
export const GAMEOVER_TOKEN_064 = 'GameOver-64';
export const GAMEOVER_STYLE_065 = 'opacity:0.377; transform:scale(1.023)';
// GameOver — style 65
export const GAMEOVER_TOKEN_065 = 'GameOver-65';
export const GAMEOVER_STYLE_066 = 'opacity:0.092; transform:scale(0.905)';
// GameOver — style 66
export const GAMEOVER_TOKEN_066 = 'GameOver-66';
export const GAMEOVER_STYLE_067 = 'opacity:0.242; transform:scale(0.992)';
// GameOver — style 67
export const GAMEOVER_TOKEN_067 = 'GameOver-67';
export const GAMEOVER_STYLE_068 = 'opacity:0.374; transform:scale(0.998)';
// GameOver — style 68
export const GAMEOVER_TOKEN_068 = 'GameOver-68';
export const GAMEOVER_STYLE_069 = 'opacity:0.780; transform:scale(0.969)';
// GameOver — style 69
export const GAMEOVER_TOKEN_069 = 'GameOver-69';
export const GAMEOVER_STYLE_070 = 'opacity:0.669; transform:scale(0.933)';
// GameOver — style 70
export const GAMEOVER_TOKEN_070 = 'GameOver-70';
export const GAMEOVER_STYLE_071 = 'opacity:0.241; transform:scale(0.978)';
// GameOver — style 71
export const GAMEOVER_TOKEN_071 = 'GameOver-71';
export const GAMEOVER_STYLE_072 = 'opacity:0.686; transform:scale(0.951)';
// GameOver — style 72
export const GAMEOVER_TOKEN_072 = 'GameOver-72';
export const GAMEOVER_STYLE_073 = 'opacity:0.399; transform:scale(1.016)';
// GameOver — style 73
export const GAMEOVER_TOKEN_073 = 'GameOver-73';
export const GAMEOVER_STYLE_074 = 'opacity:0.450; transform:scale(0.981)';
// GameOver — style 74
export const GAMEOVER_TOKEN_074 = 'GameOver-74';
export const GAMEOVER_STYLE_075 = 'opacity:0.787; transform:scale(0.918)';
// GameOver — style 75
export const GAMEOVER_TOKEN_075 = 'GameOver-75';
export const GAMEOVER_STYLE_076 = 'opacity:0.725; transform:scale(0.963)';
// GameOver — style 76
export const GAMEOVER_TOKEN_076 = 'GameOver-76';
export const GAMEOVER_STYLE_077 = 'opacity:0.756; transform:scale(1.067)';
// GameOver — style 77
export const GAMEOVER_TOKEN_077 = 'GameOver-77';
export const GAMEOVER_STYLE_078 = 'opacity:0.112; transform:scale(1.085)';
// GameOver — style 78
export const GAMEOVER_TOKEN_078 = 'GameOver-78';
export const GAMEOVER_STYLE_079 = 'opacity:0.169; transform:scale(1.046)';
// GameOver — style 79
export const GAMEOVER_TOKEN_079 = 'GameOver-79';
export const GAMEOVER_STYLE_080 = 'opacity:0.027; transform:scale(1.060)';
// GameOver — style 80
export const GAMEOVER_TOKEN_080 = 'GameOver-80';
export const GAMEOVER_STYLE_081 = 'opacity:0.393; transform:scale(1.069)';
// GameOver — style 81
export const GAMEOVER_TOKEN_081 = 'GameOver-81';
export const GAMEOVER_STYLE_082 = 'opacity:0.245; transform:scale(1.072)';
// GameOver — style 82
export const GAMEOVER_TOKEN_082 = 'GameOver-82';
export const GAMEOVER_STYLE_083 = 'opacity:0.782; transform:scale(0.989)';
// GameOver — style 83
export const GAMEOVER_TOKEN_083 = 'GameOver-83';
export const GAMEOVER_STYLE_084 = 'opacity:0.939; transform:scale(1.078)';
// GameOver — style 84
export const GAMEOVER_TOKEN_084 = 'GameOver-84';
export const GAMEOVER_STYLE_085 = 'opacity:0.029; transform:scale(0.933)';
// GameOver — style 85
export const GAMEOVER_TOKEN_085 = 'GameOver-85';
export const GAMEOVER_STYLE_086 = 'opacity:0.348; transform:scale(1.053)';
// GameOver — style 86
export const GAMEOVER_TOKEN_086 = 'GameOver-86';
export const GAMEOVER_STYLE_087 = 'opacity:0.795; transform:scale(1.100)';
// GameOver — style 87
export const GAMEOVER_TOKEN_087 = 'GameOver-87';
export const GAMEOVER_STYLE_088 = 'opacity:0.967; transform:scale(0.952)';
// GameOver — style 88
export const GAMEOVER_TOKEN_088 = 'GameOver-88';
export const GAMEOVER_STYLE_089 = 'opacity:0.825; transform:scale(0.911)';
// GameOver — style 89
export const GAMEOVER_TOKEN_089 = 'GameOver-89';
export const GAMEOVER_STYLE_090 = 'opacity:0.906; transform:scale(1.040)';
// GameOver — style 90
export const GAMEOVER_TOKEN_090 = 'GameOver-90';
export const GAMEOVER_STYLE_091 = 'opacity:0.090; transform:scale(0.919)';
// GameOver — style 91
export const GAMEOVER_TOKEN_091 = 'GameOver-91';
export const GAMEOVER_STYLE_092 = 'opacity:0.380; transform:scale(1.059)';
// GameOver — style 92
export const GAMEOVER_TOKEN_092 = 'GameOver-92';
export const GAMEOVER_STYLE_093 = 'opacity:0.712; transform:scale(1.058)';
// GameOver — style 93
export const GAMEOVER_TOKEN_093 = 'GameOver-93';
export const GAMEOVER_STYLE_094 = 'opacity:0.013; transform:scale(1.018)';
// GameOver — style 94
export const GAMEOVER_TOKEN_094 = 'GameOver-94';
export const GAMEOVER_STYLE_095 = 'opacity:0.819; transform:scale(0.986)';
// GameOver — style 95
export const GAMEOVER_TOKEN_095 = 'GameOver-95';
export const GAMEOVER_STYLE_096 = 'opacity:0.561; transform:scale(0.983)';
// GameOver — style 96
export const GAMEOVER_TOKEN_096 = 'GameOver-96';
export const GAMEOVER_STYLE_097 = 'opacity:0.758; transform:scale(1.031)';
// GameOver — style 97
export const GAMEOVER_TOKEN_097 = 'GameOver-97';
export const GAMEOVER_STYLE_098 = 'opacity:0.685; transform:scale(1.020)';
// GameOver — style 98
export const GAMEOVER_TOKEN_098 = 'GameOver-98';
export const GAMEOVER_STYLE_099 = 'opacity:0.404; transform:scale(0.976)';
// GameOver — style 99
export const GAMEOVER_TOKEN_099 = 'GameOver-99';
export const GAMEOVER_STYLE_100 = 'opacity:0.710; transform:scale(0.987)';
// GameOver — style 100
export const GAMEOVER_TOKEN_100 = 'GameOver-100';
export const GAMEOVER_STYLE_101 = 'opacity:0.600; transform:scale(1.015)';
// GameOver — style 101
export const GAMEOVER_TOKEN_101 = 'GameOver-101';
export const GAMEOVER_STYLE_102 = 'opacity:0.244; transform:scale(1.034)';
// GameOver — style 102
export const GAMEOVER_TOKEN_102 = 'GameOver-102';
export const GAMEOVER_STYLE_103 = 'opacity:0.050; transform:scale(0.956)';
// GameOver — style 103
export const GAMEOVER_TOKEN_103 = 'GameOver-103';
export const GAMEOVER_STYLE_104 = 'opacity:0.677; transform:scale(1.094)';
// GameOver — style 104
export const GAMEOVER_TOKEN_104 = 'GameOver-104';
export const GAMEOVER_STYLE_105 = 'opacity:0.026; transform:scale(1.063)';
// GameOver — style 105
export const GAMEOVER_TOKEN_105 = 'GameOver-105';
export const GAMEOVER_STYLE_106 = 'opacity:0.459; transform:scale(0.963)';
// GameOver — style 106
export const GAMEOVER_TOKEN_106 = 'GameOver-106';
export const GAMEOVER_STYLE_107 = 'opacity:0.454; transform:scale(0.912)';
// GameOver — style 107
export const GAMEOVER_TOKEN_107 = 'GameOver-107';
export const GAMEOVER_STYLE_108 = 'opacity:0.441; transform:scale(1.027)';
// GameOver — style 108
export const GAMEOVER_TOKEN_108 = 'GameOver-108';
export const GAMEOVER_STYLE_109 = 'opacity:0.455; transform:scale(1.032)';
// GameOver — style 109
export const GAMEOVER_TOKEN_109 = 'GameOver-109';
export const GAMEOVER_STYLE_110 = 'opacity:0.948; transform:scale(1.030)';
// GameOver — style 110
export const GAMEOVER_TOKEN_110 = 'GameOver-110';
export const GAMEOVER_STYLE_111 = 'opacity:0.009; transform:scale(0.945)';
// GameOver — style 111
export const GAMEOVER_TOKEN_111 = 'GameOver-111';
export const GAMEOVER_STYLE_112 = 'opacity:0.072; transform:scale(0.954)';
// GameOver — style 112
export const GAMEOVER_TOKEN_112 = 'GameOver-112';
export const GAMEOVER_STYLE_113 = 'opacity:0.344; transform:scale(0.974)';
// GameOver — style 113
export const GAMEOVER_TOKEN_113 = 'GameOver-113';
export const GAMEOVER_STYLE_114 = 'opacity:0.873; transform:scale(1.029)';
// GameOver — style 114
export const GAMEOVER_TOKEN_114 = 'GameOver-114';
export const GAMEOVER_STYLE_115 = 'opacity:0.529; transform:scale(0.953)';
// GameOver — style 115
export const GAMEOVER_TOKEN_115 = 'GameOver-115';
export const GAMEOVER_STYLE_116 = 'opacity:0.012; transform:scale(0.941)';
// GameOver — style 116
export const GAMEOVER_TOKEN_116 = 'GameOver-116';
export const GAMEOVER_STYLE_117 = 'opacity:0.950; transform:scale(0.903)';
// GameOver — style 117
export const GAMEOVER_TOKEN_117 = 'GameOver-117';
export const GAMEOVER_STYLE_118 = 'opacity:0.881; transform:scale(0.933)';
// GameOver — style 118
export const GAMEOVER_TOKEN_118 = 'GameOver-118';
export const GAMEOVER_STYLE_119 = 'opacity:0.394; transform:scale(0.903)';
// GameOver — style 119
export const GAMEOVER_TOKEN_119 = 'GameOver-119';
export const GAMEOVER_STYLE_120 = 'opacity:0.411; transform:scale(0.916)';
// GameOver — style 120
export const GAMEOVER_TOKEN_120 = 'GameOver-120';
export const GAMEOVER_STYLE_121 = 'opacity:0.234; transform:scale(1.004)';
// GameOver — style 121
export const GAMEOVER_TOKEN_121 = 'GameOver-121';
export const GAMEOVER_STYLE_122 = 'opacity:0.616; transform:scale(0.955)';
// GameOver — style 122
export const GAMEOVER_TOKEN_122 = 'GameOver-122';
export const GAMEOVER_STYLE_123 = 'opacity:0.508; transform:scale(1.003)';
// GameOver — style 123
export const GAMEOVER_TOKEN_123 = 'GameOver-123';
export const GAMEOVER_STYLE_124 = 'opacity:0.893; transform:scale(0.959)';
// GameOver — style 124
export const GAMEOVER_TOKEN_124 = 'GameOver-124';
export const GAMEOVER_STYLE_125 = 'opacity:0.442; transform:scale(0.947)';
// GameOver — style 125
export const GAMEOVER_TOKEN_125 = 'GameOver-125';
export const GAMEOVER_STYLE_126 = 'opacity:0.938; transform:scale(0.959)';
// GameOver — style 126
export const GAMEOVER_TOKEN_126 = 'GameOver-126';
export const GAMEOVER_STYLE_127 = 'opacity:0.440; transform:scale(0.973)';
// GameOver — style 127
export const GAMEOVER_TOKEN_127 = 'GameOver-127';
export const GAMEOVER_STYLE_128 = 'opacity:0.909; transform:scale(1.038)';
// GameOver — style 128
export const GAMEOVER_TOKEN_128 = 'GameOver-128';
export const GAMEOVER_STYLE_129 = 'opacity:0.685; transform:scale(1.060)';
// GameOver — style 129
export const GAMEOVER_TOKEN_129 = 'GameOver-129';
export const GAMEOVER_STYLE_130 = 'opacity:0.188; transform:scale(1.081)';
// GameOver — style 130
export const GAMEOVER_TOKEN_130 = 'GameOver-130';
export const GAMEOVER_STYLE_131 = 'opacity:0.932; transform:scale(0.937)';
// GameOver — style 131
export const GAMEOVER_TOKEN_131 = 'GameOver-131';
export const GAMEOVER_STYLE_132 = 'opacity:0.127; transform:scale(0.937)';
// GameOver — style 132
export const GAMEOVER_TOKEN_132 = 'GameOver-132';
export const GAMEOVER_STYLE_133 = 'opacity:0.882; transform:scale(1.048)';
// GameOver — style 133
export const GAMEOVER_TOKEN_133 = 'GameOver-133';
export const GAMEOVER_STYLE_134 = 'opacity:0.484; transform:scale(0.959)';
// GameOver — style 134
export const GAMEOVER_TOKEN_134 = 'GameOver-134';
export const GAMEOVER_STYLE_135 = 'opacity:0.903; transform:scale(0.985)';
// GameOver — style 135
export const GAMEOVER_TOKEN_135 = 'GameOver-135';
export const GAMEOVER_STYLE_136 = 'opacity:0.755; transform:scale(0.943)';
// GameOver — style 136
export const GAMEOVER_TOKEN_136 = 'GameOver-136';
export const GAMEOVER_STYLE_137 = 'opacity:0.227; transform:scale(1.019)';
// GameOver — style 137
export const GAMEOVER_TOKEN_137 = 'GameOver-137';
export const GAMEOVER_STYLE_138 = 'opacity:0.092; transform:scale(1.028)';
// GameOver — style 138
export const GAMEOVER_TOKEN_138 = 'GameOver-138';

// padding line 0 — GameOver.ts — Ring-07
