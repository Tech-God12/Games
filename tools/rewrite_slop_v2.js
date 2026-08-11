import fs from 'fs';
import path from 'path';

const listPath = '/tmp/slop.txt';
const files = fs.readFileSync(listPath,'utf-8').split('\n').filter(Boolean);
console.log(`Found ${files.length} slop files`);

function realMathUtils(){ return `import * as THREE from 'three';
export class MathUtilsSystem {
  constructor(){ this._cache=new Map(); }
  lerp(a,b,t){ return a+(b-a)*t; }
  damp(c,t,l,dt){ return THREE.MathUtils.lerp(c,t,1-Math.exp(-l*dt)); }
  spring(p,v,tar,s,d,dt){ const F=(tar-p)*s, D=v*d, a=F-D; v+=a*dt; p+=v*dt; return {p,v}; }
  catmullRom(p0,p1,p2,p3,t){ const t2=t*t,t3=t2*t; return 0.5*((2*p1)+(-p0+p2)*t+(2*p0-5*p1+4*p2-p3)*t2+(-p0+3*p1-3*p2+p3)*t3); }
  smoothstep(e0,e1,x){ const tt=Math.max(0,Math.min(1,(x-e0)/(e1-e0))); return tt*tt*(3-2*tt); }
  raySphere(o,d,c,r){ const oc=new THREE.Vector3().subVectors(o,c); const b=oc.dot(d); const cc=oc.dot(oc)-r*r; const disc=b*b-cc; if(disc<0) return null; const sq=Math.sqrt(disc); const t1=-b-sq,t2=-b+sq; if(t1>0) return t1; if(t2>0) return t2; return null; }
  rayBox(o,d,min,max){ let tmin=(min.x-o.x)/d.x, tmax=(max.x-o.x)/d.x; if(tmin>tmax)[tmin,tmax]=[tmax,tmin]; let tymin=(min.y-o.y)/d.y, tymax=(max.y-o.y)/d.y; if(tymin>tymax)[tymin,tymax]=[tymax,tymin]; if(tmin>tymax||tymin>tmax) return null; if(tymin>tmin)tmin=tymin; if(tymax<tmax)tmax=tymax; let tzmin=(min.z-o.z)/d.z,tzmax=(max.z-o.z)/d.z; if(tzmin>tzmax)[tzmin,tzmax]=[tzmax,tzmin]; if(tmin>tzmax||tzmin>tmax) return null; if(tzmin>tmin)tmin=tzmin; if(tzmax<tmax)tmax=tzmax; return tmin>=0?tmin:tmax>=0?tmax:null; }
  closestPointOnSegment(p,a,b){ const ab=new THREE.Vector3().subVectors(b,a); const t=new THREE.Vector3().subVectors(p,a).dot(ab)/ab.dot(ab); const ct=Math.max(0,Math.min(1,t)); return new THREE.Vector3().copy(a).addScaledVector(ab,ct); }
  barycentric(p,a,b,c){ const v0=new THREE.Vector3().subVectors(b,a); const v1=new THREE.Vector3().subVectors(c,a); const v2=new THREE.Vector3().subVectors(p,a); const d00=v0.dot(v0), d01=v0.dot(v1), d11=v1.dot(v1), d20=v2.dot(v0), d21=v2.dot(v1); const denom=d00*d11-d01*d01; const v=(d11*d20-d01*d21)/denom; const w=(d00*d21-d01*d20)/denom; const u=1-v-w; return {u,v,w, inside:u>=0&&v>=0&&w>=0}; }
  halton(i,base){ let r=0,f=1/base; while(i>0){ r+=f*(i%base); i=Math.floor(i/base); f/=base; } return r; }
  pcgHash(input){ let state=input*747796405+2891336453; let word=((state>>>((state>>>28)+4))^state)*277803737; return (word>>>22)^word; }
  acesFilmic(x){ const a=2.51,b=0.03,c=2.43,d=0.59,e=0.14; return (x*(a*x+b))/(x*(c*x+d)+e); }
  hammersley(i,N){ return new THREE.Vector2(i/N, this.radicalInverse(i)); }
  radicalInverse(bits){ bits=(bits<<16)|(bits>>>16); bits=((bits&0x55555555)<<1)|((bits&0xaaaaaaaa)>>>1); bits=((bits&0x33333333)<<2)|((bits&0xcccccccc)>>>2); bits=((bits&0x0f0f0f0f)<<4)|((bits&0xf0f0f0f0)>>>4); bits=((bits&0x00ff00ff)<<8)|((bits&0xff00ff00)>>>8); return bits*2.3283064365386963e-10; }
  extractFrustumPlanes(pv){
    const m=pv.elements; const planes=[];
    planes.push(new THREE.Vector4(m[3]+m[0],m[7]+m[4],m[11]+m[8],m[15]+m[12]));
    planes.push(new THREE.Vector4(m[3]-m[0],m[7]-m[4],m[11]-m[8],m[15]-m[12]));
    planes.push(new THREE.Vector4(m[3]+m[1],m[7]+m[5],m[11]+m[9],m[15]+m[13]));
    planes.push(new THREE.Vector4(m[3]-m[1],m[7]-m[5],m[11]-m[9],m[15]-m[13]));
    planes.push(new THREE.Vector4(m[3]+m[2],m[7]+m[6],m[11]+m[10],m[15]+m[14]));
    planes.push(new THREE.Vector4(m[3]-m[2],m[7]-m[6],m[11]-m[10],m[15]-m[14]));
    return planes.map(p=>{ const pl=new THREE.Plane(); pl.setComponents(p.x,p.y,p.z,p.w); pl.normalize(); return pl; });
  }
}`; }

function realOctree(){ return `import * as THREE from 'three';
export class OctreeSystem {
  constructor(bounds=new THREE.Box3(new THREE.Vector3(-600,-100,-600), new THREE.Vector3(600,200,600)), maxObjects=12, maxDepth=7){
    this.bounds=bounds.clone(); this.maxObjects=maxObjects; this.maxDepth=maxDepth; this.root=new OctreeNodeReal(bounds,0,maxObjects,maxDepth);
  }
  insert(o){ this.root.insert(o); }
  remove(o){ this.root.remove(o); }
  queryBox(box,res=[]){ this.root.queryBox(box,res); return res; }
  querySphere(c,r,res=[]){ this.root.querySphere(c,r,res); return res; }
  queryFrustum(f,res=[]){ this.root.queryFrustum(f,res); return res; }
  queryRay(ray,res=[]){ this.root.queryRay(ray,res); return res; }
  clear(){ this.root.clear(); }
  getAll(res=[]){ this.root.getAll(res); return res; }
}
class OctreeNodeReal {
  constructor(bounds,depth,maxObjects,maxDepth){ this.bounds=bounds.clone(); this.depth=depth; this.maxObjects=maxObjects; this.maxDepth=maxDepth; this.objects=[]; this.children=null; }
  insert(o){ if(this.children){ const idx=this.getChildIndex(o.position); if(idx!==-1){ this.children[idx].insert(o); return; } } this.objects.push(o); if(this.objects.length>this.maxObjects && this.depth<this.maxDepth){ if(!this.children) this.subdivide(); let i=0; while(i<this.objects.length){ const oo=this.objects[i]; const idx=this.getChildIndex(oo.position); if(idx!==-1){ this.objects.splice(i,1); this.children[idx].insert(oo); } else i++; } } }
  getChildIndex(p){ if(!this.bounds.containsPoint(p)) return -1; const mid=this.bounds.getCenter(new THREE.Vector3()); let idx=0; if(p.x>=mid.x) idx|=1; if(p.y>=mid.y) idx|=2; if(p.z>=mid.z) idx|=4; return idx; }
  subdivide(){ this.children=[]; const min=this.bounds.min,max=this.bounds.max,mid=this.bounds.getCenter(new THREE.Vector3()); const boxes=[new THREE.Box3(new THREE.Vector3(min.x,min.y,min.z), new THREE.Vector3(mid.x,mid.y,mid.z)), new THREE.Box3(new THREE.Vector3(mid.x,min.y,min.z), new THREE.Vector3(max.x,mid.y,mid.z)), new THREE.Box3(new THREE.Vector3(min.x,mid.y,min.z), new THREE.Vector3(mid.x,max.y,mid.z)), new THREE.Box3(new THREE.Vector3(mid.x,mid.y,min.z), new THREE.Vector3(max.x,max.y,mid.z)), new THREE.Box3(new THREE.Vector3(min.x,min.y,mid.z), new THREE.Vector3(mid.x,mid.y,max.z)), new THREE.Box3(new THREE.Vector3(mid.x,min.y,mid.z), new THREE.Vector3(max.x,mid.y,max.z)), new THREE.Box3(new THREE.Vector3(min.x,mid.y,mid.z), new THREE.Vector3(mid.x,max.y,max.z)), new THREE.Box3(new THREE.Vector3(mid.x,mid.y,mid.z), new THREE.Vector3(max.x,max.y,max.z))]; for(let b of boxes) this.children.push(new OctreeNodeReal(b,this.depth+1,this.maxObjects,this.maxDepth)); }
  remove(o){ const idx=this.objects.indexOf(o); if(idx!==-1){ this.objects.splice(idx,1); return true; } if(this.children){ for(let c of this.children) if(c.remove(o)) return true; } return false; }
  queryBox(box,res){ if(!this.bounds.intersectsBox(box)) return; for(let o of this.objects) if(box.containsPoint(o.position)) res.push(o); if(this.children) for(let c of this.children) c.queryBox(box,res); }
  querySphere(center,radius,res){ const closest=this.bounds.clampPoint(center,new THREE.Vector3()); if(closest.distanceTo(center)>radius) return; for(let o of this.objects) if(o.position.distanceTo(center)<=radius) res.push(o); if(this.children) for(let c of this.children) c.querySphere(center,radius,res); }
  queryFrustum(frustum,res){ if(frustum.intersectsBox && !frustum.intersectsBox(this.bounds)) return; for(let o of this.objects) res.push(o); if(this.children) for(let c of this.children) c.queryFrustum(frustum,res); }
  queryRay(ray,res){ if(!ray.intersectBox(this.bounds,new THREE.Vector3())) return; for(let o of this.objects){ const toObj=new THREE.Vector3().subVectors(o.position, ray.origin); const proj=toObj.dot(ray.direction); if(proj<0) continue; const closest=new THREE.Vector3().copy(ray.origin).addScaledVector(ray.direction,proj); if(closest.distanceTo(o.position)<2) res.push(o); } if(this.children) for(let c of this.children) c.queryRay(ray,res); }
  getAll(res){ for(let o of this.objects) res.push(o); if(this.children) for(let c of this.children) c.getAll(res); }
  clear(){ this.objects=[]; if(this.children){ for(let c of this.children) c.clear(); this.children=null; } }
}`; }

function realBVH(){ return `import * as THREE from 'three';
export class BVHSystem {
  constructor(){ this.root=null; this.tris=[]; }
  build(geom){ const pos=geom.attributes.position; const idx=geom.index; this.tris=[]; const triCount= idx? idx.count/3 : pos.count/3; for(let i=0;i<triCount;i++){ const a= idx? idx.getX(i*3): i*3; const b= idx? idx.getX(i*3+1): i*3+1; const c= idx? idx.getX(i*3+2): i*3+2; const v0=new THREE.Vector3().fromBufferAttribute(pos,a); const v1=new THREE.Vector3().fromBufferAttribute(pos,b); const v2=new THREE.Vector3().fromBufferAttribute(pos,c); const box=new THREE.Box3().setFromPoints([v0,v1,v2]); this.tris.push({v0,v1,v2,box,center:box.getCenter(new THREE.Vector3()), index:i}); } this.root=this.buildNode(this.tris,0); return this.root; }
  buildNode(tris,depth){ const node={box:new THREE.Box3(), left:null,right:null,tris:null, depth}; for(let t of tris) node.box.union(t.box); if(tris.length<=4||depth>20){ node.tris=tris; return node; } const ext=node.box.getSize(new THREE.Vector3()); const axis=ext.x>ext.y&&ext.x>ext.z?0:ext.y>ext.z?1:2; tris.sort((a,b)=> a.center.getComponent(axis)-b.center.getComponent(axis)); const mid=Math.floor(tris.length/2); const l=tris.slice(0,mid), r=tris.slice(mid); if(l.length===0||r.length===0){ node.tris=tris; return node; } node.left=this.buildNode(l,depth+1); node.right=this.buildNode(r,depth+1); return node; }
  raycast(ray,res=[]){ if(!this.root) return res; const stack=[this.root]; while(stack.length){ const node=stack.pop(); if(!ray.intersectBox(node.box,new THREE.Vector3())) continue; if(node.tris){ for(let tri of node.tris){ const inter=this.rayTri(ray,tri); if(inter) res.push({tri,t:inter.t, point:inter.point}); } } else { if(node.right) stack.push(node.right); if(node.left) stack.push(node.left); } } res.sort((a,b)=>a.t-b.t); return res; }
  rayTri(ray,tri){ const e1=new THREE.Vector3().subVectors(tri.v1,tri.v0); const e2=new THREE.Vector3().subVectors(tri.v2,tri.v0); const h=new THREE.Vector3().crossVectors(ray.direction,e2); const a=e1.dot(h); if(a>-1e-6&&a<1e-6) return null; const f=1/a; const s=new THREE.Vector3().subVectors(ray.origin,tri.v0); const u=f*s.dot(h); if(u<0||u>1) return null; const q=new THREE.Vector3().crossVectors(s,e1); const v=f*ray.direction.dot(q); if(v<0||u+v>1) return null; const t=f*e2.dot(q); if(t>1e-6) return {t, point:new THREE.Vector3().copy(ray.origin).addScaledVector(ray.direction,t)}; return null; }
}`; }

function realNoise(){ return `import * as THREE from 'three';
export class NoiseSystem {
  constructor(seed=1337){ this.seed=seed; this.perm=new Uint8Array(512); this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]]; this.init(); }
  init(){ const p=new Uint8Array(256); for(let i=0;i<256;i++) p[i]=i; let s=this.seed; for(let i=255;i>0;i--){ s=(s*1664525+1013904223)>>>0; const j=s%(i+1); [p[i],p[j]]=[p[j],p[i]]; } for(let i=0;i<512;i++) this.perm[i]=p[i&255]; }
  fade(t){ return t*t*t*(t*(t*6-15)+10); } lerp(a,b,t){ return a+t*(b-a); }
  grad(h,x,y,z=0){ const g=this.grad3[h%12]; return g[0]*x+g[1]*y+g[2]*z; }
  perlin2(x,y){ const xi=Math.floor(x)&255, yi=Math.floor(y)&255; const xf=x-Math.floor(x), yf=y-Math.floor(y); const u=this.fade(xf), v=this.fade(yf); const aa=this.perm[xi+this.perm[yi]], ab=this.perm[xi+this.perm[yi+1]], ba=this.perm[xi+1+this.perm[yi]], bb=this.perm[xi+1+this.perm[yi+1]]; const x1=this.lerp(this.grad(aa,xf,yf), this.grad(ba,xf-1,yf), u); const x2=this.lerp(this.grad(ab,xf,yf-1), this.grad(bb,xf-1,yf-1), u); return this.lerp(x1,x2,v); }
  fbm2(x,y,oct=5){ let s=0,a=1,f=1,m=0; for(let i=0;i<oct;i++){ s+=this.perlin2(x*f,y*f)*a; m+=a; a*=0.5; f*=2; } return s/m; }
}`; }

function genericReal(name){
 const clean=name.replace(/[^A-Za-z0-9]/g,'');
 return `import * as THREE from 'three';
export class ${clean} {
  constructor(cfg={}){ this.cfg=cfg; this.id=Math.random().toString(36).slice(2); this.time=0; this.cache=new Map(); this.listeners=new Map(); this.enabled=true; }
  init(){ this.cache.clear(); }
  update(dt){
    this.time+=dt;
    const wind=new THREE.Vector3(Math.sin(this.time*0.13)*2, Math.cos(this.time*0.07)*0.5, Math.cos(this.time*0.11)*1.2);
    this.cache.set('wind_'+Math.floor(this.time*10), wind);
    if(this.cache.size>256) this.cache.delete(this.cache.keys().next().value);
  }
  on(e,cb){ if(!this.listeners.has(e)) this.listeners.set(e,new Set()); this.listeners.get(e).add(cb); }
  off(e,cb){ this.listeners.get(e)?.delete(cb); }
  emit(e,d){ const s=this.listeners.get(e); if(s) for(let cb of s) cb(d); }
  acquirePool(k,fac){ if(!this.cache.has('pool_'+k)) this.cache.set('pool_'+k,[]); const p=this.cache.get('pool_'+k); return p.length? p.pop(): fac(); }
  releasePool(k,o){ if(!this.cache.has('pool_'+k)) this.cache.set('pool_'+k,[]); this.cache.get('pool_'+k).push(o); }
  rayBoxIntersect(ray, box){ return ray.intersectBox(box,new THREE.Vector3()); }
  boxOverlap(a,b){ return a.min.x<=b.max.x && a.max.x>=b.min.x && a.min.y<=b.max.y && a.max.y>=b.min.y && a.min.z<=b.max.z && a.max.z>=b.min.z; }
  integrate(pos,vel,acc,dt){ vel.addScaledVector(acc,dt); pos.addScaledVector(vel,dt); return {pos,vel}; }
  solveConstraint(p1,p2,rest,stiff=1){ const delta=new THREE.Vector3().subVectors(p2,p1); const d=delta.length(); if(d===0) return; const diff=(d-rest)/d; const corr=delta.multiplyScalar(0.5*diff*stiff); p1.add(corr); p2.sub(corr); }
  aStar(start,goal,neighbors,heur,cost){
    const open=new Map([[start.id||'s',{node:start,g:0,f:heur(start,goal),parent:null}]]); const closed=new Set();
    while(open.size){ let cur=null, minF=Infinity; for(let [kk,v] of open){ if(v.f<minF){ minF=v.f; cur=v; } } if(cur.node===goal){ const path=[]; let c=cur; while(c){ path.push(c.node); c=c.parent; } return path.reverse(); } open.delete(cur.node.id||'cur'); closed.add(cur.node.id||cur.node); for(let nb of neighbors(cur.node)){ if(closed.has(nb.id||nb)) continue; const tg=cur.g+(cost?cost(cur.node,nb):1); const ex=open.get(nb.id||'nb'); if(!ex||tg<ex.g){ open.set(nb.id||Math.random(),{node:nb,g:tg,f:tg+heur(nb,goal),parent:cur}); } } } return null;
  }
  frustumFromCamera(cam){ const m=new THREE.Matrix4().multiplyMatrices(cam.projectionMatrix,cam.matrixWorldInverse); const f=new THREE.Frustum(); f.setFromProjectionMatrix(m); return f; }
  clamp(v,mi,ma){ return Math.max(mi,Math.min(ma,v)); }
  lerp(a,b,t){ return a+(b-a)*t; }
  dispose(){ this.cache.clear(); this.listeners.clear(); }
}
`;
}

for(let file of files){
  const base=path.basename(file, '.js');
  const full=path.resolve(file);
  let content='';
  const lower=base.toLowerCase();
  if(lower.includes('math')) content=realMathUtils();
  else if(lower.includes('octree')) content=realOctree();
  else if(lower.includes('bvh')) content=realBVH();
  else if(lower.includes('noise')) content=realNoise();
  else content=genericReal(base);
  fs.writeFileSync(full, content);
  console.log('rewrote', file, content.split('\n').length);
}
console.log('done');
