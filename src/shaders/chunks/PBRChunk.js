// chunks/PBRChunk - GLSL Shader Library
export const PBRChunkShader = `
  precision highp float;
  uniform float time; uniform vec2 resolution; uniform sampler2D tDiffuse;
  varying vec2 vUv;
  #define PI 3.14159265359
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453123); }
  float noise(vec2 p){ vec2 i=floor(p); vec2 f=fract(p); float a=hash(i); float b=hash(i+vec2(1.,0.)); float c=hash(i+vec2(0.,1.)); float d=hash(i+vec2(1.,1.)); vec2 u=f*f*(3.-2.*f); return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y; }
  float fbm(vec2 p){ float v=0.; float a=0.5; vec2 shift=vec2(100.); mat2 rot=mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5)); for(int i=0;i<6;i++){ v+=a*noise(p); p=rot*p*2.+shift; a*=0.5; } return v; }
  vec3 palette(float d){ return mix(vec3(0.2,0.1,0.8), vec3(1.,0.9,0.4), d); }
    float pattern0(vec2 uv){ return fbm(uv*1.0 + time*0.05)*0.50; }
  float pattern1(vec2 uv){ return fbm(uv*1.3 + time*0.06)*0.55; }
  float pattern2(vec2 uv){ return fbm(uv*1.6 + time*0.07)*0.60; }
  float pattern3(vec2 uv){ return fbm(uv*1.9 + time*0.08)*0.65; }
  float pattern4(vec2 uv){ return fbm(uv*2.2 + time*0.09)*0.70; }
  float pattern5(vec2 uv){ return fbm(uv*2.5 + time*0.10)*0.75; }
  float pattern6(vec2 uv){ return fbm(uv*2.8 + time*0.11)*0.80; }
  float pattern7(vec2 uv){ return fbm(uv*3.1 + time*0.12)*0.85; }
  float pattern8(vec2 uv){ return fbm(uv*3.4 + time*0.13)*0.90; }
  float pattern9(vec2 uv){ return fbm(uv*3.7 + time*0.14)*0.95; }
  float pattern10(vec2 uv){ return fbm(uv*4.0 + time*0.15)*1.00; }
  float pattern11(vec2 uv){ return fbm(uv*4.3 + time*0.16)*1.05; }
  float pattern12(vec2 uv){ return fbm(uv*4.6 + time*0.17)*1.10; }
  float pattern13(vec2 uv){ return fbm(uv*4.9 + time*0.18)*1.15; }
  float pattern14(vec2 uv){ return fbm(uv*5.2 + time*0.19)*1.20; }
  float pattern15(vec2 uv){ return fbm(uv*5.5 + time*0.20)*1.25; }
  float pattern16(vec2 uv){ return fbm(uv*5.8 + time*0.21)*1.30; }
  float pattern17(vec2 uv){ return fbm(uv*6.1 + time*0.22)*1.35; }
  float pattern18(vec2 uv){ return fbm(uv*6.4 + time*0.23)*1.40; }
  float pattern19(vec2 uv){ return fbm(uv*6.7 + time*0.24)*1.45; }
  float pattern20(vec2 uv){ return fbm(uv*7.0 + time*0.25)*1.50; }
  float pattern21(vec2 uv){ return fbm(uv*7.3 + time*0.26)*1.55; }
  float pattern22(vec2 uv){ return fbm(uv*7.6 + time*0.27)*1.60; }
  float pattern23(vec2 uv){ return fbm(uv*7.9 + time*0.28)*1.65; }
  float pattern24(vec2 uv){ return fbm(uv*8.2 + time*0.29)*1.70; }
  float pattern25(vec2 uv){ return fbm(uv*8.5 + time*0.30)*1.75; }
  float pattern26(vec2 uv){ return fbm(uv*8.8 + time*0.31)*1.80; }
  float pattern27(vec2 uv){ return fbm(uv*9.1 + time*0.32)*1.85; }
  float pattern28(vec2 uv){ return fbm(uv*9.4 + time*0.33)*1.90; }
  float pattern29(vec2 uv){ return fbm(uv*9.7 + time*0.34)*1.95; }
  void main(){
    vec2 uv=vUv; vec2 p=uv*2.-1.; p.x*=resolution.x/resolution.y;
    vec3 color=vec3(0.);
        color+= palette(pattern0(p))*0.05;
    color+= palette(pattern1(p))*0.05;
    color+= palette(pattern2(p))*0.05;
    color+= palette(pattern3(p))*0.05;
    color+= palette(pattern4(p))*0.05;
    color+= palette(pattern5(p))*0.05;
    color+= palette(pattern6(p))*0.05;
    color+= palette(pattern7(p))*0.05;
    color+= palette(pattern8(p))*0.05;
    color+= palette(pattern9(p))*0.05;
    color+= palette(pattern10(p))*0.05;
    color+= palette(pattern11(p))*0.05;
    color+= palette(pattern12(p))*0.05;
    color+= palette(pattern13(p))*0.05;
    color+= palette(pattern14(p))*0.05;
    color+= palette(pattern15(p))*0.05;
    color+= palette(pattern16(p))*0.05;
    color+= palette(pattern17(p))*0.05;
    color+= palette(pattern18(p))*0.05;
    color+= palette(pattern19(p))*0.05;
    float vignette=1.-dot(p,p)*0.15; color*=vignette;
    color+= vec3(fbm(p*5.+time*0.1))*0.02;
    gl_FragColor=vec4(color,1.);
  }
`;
export const PBRChunkUniforms = { time:{value:0}, resolution:{value:{x:1920,y:1080}}, tDiffuse:{value:null} };
export function shaderUtil0(uv,time){ return Math.sin(uv.x*1+time)*Math.cos(uv.y*2+time*0.7); }
export function shaderUtil1(uv,time){ return Math.sin(uv.x*2+time)*Math.cos(uv.y*3+time*0.7); }
export function shaderUtil2(uv,time){ return Math.sin(uv.x*3+time)*Math.cos(uv.y*4+time*0.7); }
export function shaderUtil3(uv,time){ return Math.sin(uv.x*4+time)*Math.cos(uv.y*5+time*0.7); }
export function shaderUtil4(uv,time){ return Math.sin(uv.x*5+time)*Math.cos(uv.y*6+time*0.7); }
export function shaderUtil5(uv,time){ return Math.sin(uv.x*6+time)*Math.cos(uv.y*7+time*0.7); }
export function shaderUtil6(uv,time){ return Math.sin(uv.x*7+time)*Math.cos(uv.y*8+time*0.7); }
export function shaderUtil7(uv,time){ return Math.sin(uv.x*8+time)*Math.cos(uv.y*9+time*0.7); }
export function shaderUtil8(uv,time){ return Math.sin(uv.x*9+time)*Math.cos(uv.y*10+time*0.7); }
export function shaderUtil9(uv,time){ return Math.sin(uv.x*10+time)*Math.cos(uv.y*11+time*0.7); }
export function shaderUtil10(uv,time){ return Math.sin(uv.x*11+time)*Math.cos(uv.y*12+time*0.7); }
export function shaderUtil11(uv,time){ return Math.sin(uv.x*12+time)*Math.cos(uv.y*13+time*0.7); }
export function shaderUtil12(uv,time){ return Math.sin(uv.x*13+time)*Math.cos(uv.y*14+time*0.7); }
export function shaderUtil13(uv,time){ return Math.sin(uv.x*14+time)*Math.cos(uv.y*15+time*0.7); }
export function shaderUtil14(uv,time){ return Math.sin(uv.x*15+time)*Math.cos(uv.y*16+time*0.7); }
export function shaderUtil15(uv,time){ return Math.sin(uv.x*16+time)*Math.cos(uv.y*17+time*0.7); }
export function shaderUtil16(uv,time){ return Math.sin(uv.x*17+time)*Math.cos(uv.y*18+time*0.7); }
export function shaderUtil17(uv,time){ return Math.sin(uv.x*18+time)*Math.cos(uv.y*19+time*0.7); }
export function shaderUtil18(uv,time){ return Math.sin(uv.x*19+time)*Math.cos(uv.y*20+time*0.7); }
export function shaderUtil19(uv,time){ return Math.sin(uv.x*20+time)*Math.cos(uv.y*21+time*0.7); }
export function shaderUtil20(uv,time){ return Math.sin(uv.x*21+time)*Math.cos(uv.y*22+time*0.7); }
export function shaderUtil21(uv,time){ return Math.sin(uv.x*22+time)*Math.cos(uv.y*23+time*0.7); }
export function shaderUtil22(uv,time){ return Math.sin(uv.x*23+time)*Math.cos(uv.y*24+time*0.7); }
export function shaderUtil23(uv,time){ return Math.sin(uv.x*24+time)*Math.cos(uv.y*25+time*0.7); }
export function shaderUtil24(uv,time){ return Math.sin(uv.x*25+time)*Math.cos(uv.y*26+time*0.7); }
export function shaderUtil25(uv,time){ return Math.sin(uv.x*26+time)*Math.cos(uv.y*27+time*0.7); }
export function shaderUtil26(uv,time){ return Math.sin(uv.x*27+time)*Math.cos(uv.y*28+time*0.7); }
export function shaderUtil27(uv,time){ return Math.sin(uv.x*28+time)*Math.cos(uv.y*29+time*0.7); }
export function shaderUtil28(uv,time){ return Math.sin(uv.x*29+time)*Math.cos(uv.y*30+time*0.7); }
export function shaderUtil29(uv,time){ return Math.sin(uv.x*30+time)*Math.cos(uv.y*31+time*0.7); }
export function shaderUtil30(uv,time){ return Math.sin(uv.x*31+time)*Math.cos(uv.y*32+time*0.7); }
export function shaderUtil31(uv,time){ return Math.sin(uv.x*32+time)*Math.cos(uv.y*33+time*0.7); }
export function shaderUtil32(uv,time){ return Math.sin(uv.x*33+time)*Math.cos(uv.y*34+time*0.7); }
export function shaderUtil33(uv,time){ return Math.sin(uv.x*34+time)*Math.cos(uv.y*35+time*0.7); }
export function shaderUtil34(uv,time){ return Math.sin(uv.x*35+time)*Math.cos(uv.y*36+time*0.7); }
export function shaderUtil35(uv,time){ return Math.sin(uv.x*36+time)*Math.cos(uv.y*37+time*0.7); }
export function shaderUtil36(uv,time){ return Math.sin(uv.x*37+time)*Math.cos(uv.y*38+time*0.7); }
export function shaderUtil37(uv,time){ return Math.sin(uv.x*38+time)*Math.cos(uv.y*39+time*0.7); }
export function shaderUtil38(uv,time){ return Math.sin(uv.x*39+time)*Math.cos(uv.y*40+time*0.7); }
export function shaderUtil39(uv,time){ return Math.sin(uv.x*40+time)*Math.cos(uv.y*41+time*0.7); }
