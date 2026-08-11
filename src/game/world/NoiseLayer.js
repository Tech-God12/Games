import * as THREE from 'three';
export class NoiseSystem {
  constructor(seed=1337){ this.seed=seed; this.perm=new Uint8Array(512); this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]]; this.init(); }
  init(){ const p=new Uint8Array(256); for(let i=0;i<256;i++) p[i]=i; let s=this.seed; for(let i=255;i>0;i--){ s=(s*1664525+1013904223)>>>0; const j=s%(i+1); [p[i],p[j]]=[p[j],p[i]]; } for(let i=0;i<512;i++) this.perm[i]=p[i&255]; }
  fade(t){ return t*t*t*(t*(t*6-15)+10); } lerp(a,b,t){ return a+t*(b-a); }
  grad(h,x,y,z=0){ const g=this.grad3[h%12]; return g[0]*x+g[1]*y+g[2]*z; }
  perlin2(x,y){ const xi=Math.floor(x)&255, yi=Math.floor(y)&255; const xf=x-Math.floor(x), yf=y-Math.floor(y); const u=this.fade(xf), v=this.fade(yf); const aa=this.perm[xi+this.perm[yi]], ab=this.perm[xi+this.perm[yi+1]], ba=this.perm[xi+1+this.perm[yi]], bb=this.perm[xi+1+this.perm[yi+1]]; const x1=this.lerp(this.grad(aa,xf,yf), this.grad(ba,xf-1,yf), u); const x2=this.lerp(this.grad(ab,xf,yf-1), this.grad(bb,xf-1,yf-1), u); return this.lerp(x1,x2,v); }
  perlin3(x,y,z){ const xi=Math.floor(x)&255, yi=Math.floor(y)&255, zi=Math.floor(z)&255; const xf=x-Math.floor(x), yf=y-Math.floor(y), zf=z-Math.floor(z); const u=this.fade(xf), v=this.fade(yf), w=this.fade(zf); const A=this.perm[xi]+yi, AA=this.perm[A]+zi, AB=this.perm[A+1]+zi; const B=this.perm[xi+1]+yi, BA=this.perm[B]+zi, BB=this.perm[B+1]+zi; return this.lerp(this.lerp(this.lerp(this.grad(this.perm[AA],xf,yf,zf), this.grad(this.perm[BA],xf-1,yf,zf), u), this.lerp(this.grad(this.perm[AB],xf,yf-1,zf), this.grad(this.perm[BB],xf-1,yf-1,zf), u), v), this.lerp(this.lerp(this.grad(this.perm[AA+1],xf,yf,zf-1), this.grad(this.perm[BA+1],xf-1,yf,zf-1), u), this.lerp(this.grad(this.perm[AB+1],xf,yf-1,zf-1), this.grad(this.perm[BB+1],xf-1,yf-1,zf-1), u), v), w); }
  fbm2(x,y,oct=5){ let s=0,a=1,f=1,m=0; for(let i=0;i<oct;i++){ s+=this.perlin2(x*f,y*f)*a; m+=a; a*=0.5; f*=2; } return s/m; }
  fbm3(x,y,z,oct=5){ let s=0,a=1,f=1,m=0; for(let i=0;i<oct;i++){ s+=this.perlin3(x*f,y*f,z*f)*a; m+=a; a*=0.5; f*=2; } return s/m; }
  ridged(x,y){ return 1-Math.abs(this.perlin2(x,y)); }
  worley(x,y){ const xi=Math.floor(x), yi=Math.floor(y); let md=10; for(let j=-1;j<=1;j++) for(let i=-1;i<=1;i++){ const nx=xi+i, ny=yi+j; const h=this.perm[(nx+this.perm[ny&255])&255]; const px=nx+(h%16)/16; const py=ny+((h>>4)%16)/16; const dx=x-px, dy=y-py; const d=dx*dx+dy*dy; if(d<md) md=d; } return Math.sqrt(md); }
}
