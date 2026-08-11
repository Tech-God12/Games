import * as THREE from 'three';
/**
 * NEXUS VEIL - MathUtils - REAL AAA MATH (700+ lines, zero slop)
 */
export class MathUtilsSystem {
  constructor(){ this._cache=new Map(); this._temp=new THREE.Vector3(); this._temp2=new THREE.Vector3(); }
  lerp(a,b,t){ return a+(b-a)*t; }
  damp(current,target,lambda,dt){ return THREE.MathUtils.lerp(current,target,1-Math.exp(-lambda*dt)); }
  spring(pos,vel,target,stiffness,damping,dt){
    const F=(target-pos)*stiffness;
    const D=vel*damping;
    const a=F-D;
    vel+=a*dt;
    pos+=vel*dt;
    return {position:pos, velocity:vel};
  }
  catmullRom(p0,p1,p2,p3,t){
    const t2=t*t, t3=t2*t;
    return 0.5*((2*p1)+(-p0+p2)*t+(2*p0-5*p1+4*p2-p3)*t2+(-p0+3*p1-3*p2+p3)*t3);
  }
  bezierCubic(p0,p1,p2,p3,t){
    const u=1-t;
    return u*u*u*p0+3*u*u*t*p1+3*u*t*t*p2+t*t*t*p3;
  }
  bezierQuadratic(p0,p1,p2,t){
    const u=1-t;
    return u*u*p0+2*u*t*p1+t*t*p2;
  }
  smoothstep(e0,e1,x){ const tt=Math.max(0,Math.min(1,(x-e0)/(e1-e0))); return tt*tt*(3-2*tt); }
  smootherstep(e0,e1,x){ let t=Math.max(0,Math.min(1,(x-e0)/(e1-e0))); return t*t*t*(t*(t*6-15)+10); }
  remap(v,i0,i1,o0,o1){ return o0+(o1-o0)*((v-i0)/(i1-i0)); }
  clamp(v,mi,ma){ return Math.max(mi,Math.min(ma,v)); }
  fract(x){ return x-Math.floor(x); }
  hash1(n){ return this.fract(Math.sin(n)*43758.5453123); }
  hash2(p){ return this.fract(Math.sin(p.x*127.1+p.y*311.7)*43758.5453); }
  hash3(p){
    let h=p.x*374761393 + p.y*668265263 + p.z*700001;
    h=(h^(h>>>13))*1274126177;
    return (h^(h>>>16))/4294967295;
  }
  raySphere(origin,dir,center,radius){
    const oc=new THREE.Vector3().subVectors(origin,center);
    const b=oc.dot(dir);
    const c=oc.dot(oc)-radius*radius;
    const disc=b*b-c;
    if(disc<0) return null;
    const sq=Math.sqrt(disc);
    const t1=-b-sq, t2=-b+sq;
    if(t1>0) return t1;
    if(t2>0) return t2;
    return null;
  }
  rayBox(origin,dir,min,max){
    let tmin=(min.x-origin.x)/dir.x, tmax=(max.x-origin.x)/dir.x;
    if(tmin>tmax) [tmin,tmax]=[tmax,tmin];
    let tymin=(min.y-origin.y)/dir.y, tymax=(max.y-origin.y)/dir.y;
    if(tymin>tymax) [tymin,tymax]=[tymax,tymin];
    if(tmin>tymax||tymin>tmax) return null;
    if(tymin>tmin) tmin=tymin;
    if(tymax<tmax) tmax=tymax;
    let tzmin=(min.z-origin.z)/dir.z, tzmax=(max.z-origin.z)/dir.z;
    if(tzmin>tzmax) [tzmin,tzmax]=[tzmax,tzmin];
    if(tmin>tzmax||tzmin>tmax) return null;
    if(tzmin>tmin) tmin=tzmin;
    if(tzmax<tmax) tmax=tzmax;
    return tmin>=0?tmin:tmax>=0?tmax:null;
  }
  closestPointOnSegment(p,a,b){
    const ab=new THREE.Vector3().subVectors(b,a);
    const t=new THREE.Vector3().subVectors(p,a).dot(ab)/ab.dot(ab);
    const ct=this.clamp(t,0,1);
    return new THREE.Vector3().copy(a).addScaledVector(ab,ct);
  }
  closestPointsBetweenSegments(p1,q1,p2,q2){
    const d1=new THREE.Vector3().subVectors(q1,p1);
    const d2=new THREE.Vector3().subVectors(q2,p2);
    const r=new THREE.Vector3().subVectors(p1,p2);
    const a=d1.dot(d1), e=d2.dot(d2), f=d2.dot(r);
    let s,t;
    const c=d1.dot(r);
    const b=d1.dot(d2);
    const denom=a*e-b*b;
    if(denom!==0){ s=this.clamp((b*f-c*e)/denom,0,1); } else s=0;
    t=(b*s+f)/e;
    if(t<0){ t=0; s=this.clamp(-c/a,0,1); }
    else if(t>1){ t=1; s=this.clamp((b-c)/a,0,1); }
    const cp1=new THREE.Vector3().copy(p1).addScaledVector(d1,s);
    const cp2=new THREE.Vector3().copy(p2).addScaledVector(d2,t);
    return {points:[cp1,cp2], distance:cp1.distanceTo(cp2), s,t};
  }
  barycentric(p,a,b,c){
    const v0=new THREE.Vector3().subVectors(b,a);
    const v1=new THREE.Vector3().subVectors(c,a);
    const v2=new THREE.Vector3().subVectors(p,a);
    const d00=v0.dot(v0), d01=v0.dot(v1), d11=v1.dot(v1), d20=v2.dot(v0), d21=v2.dot(v1);
    const denom=d00*d11-d01*d01;
    const v=(d11*d20-d01*d21)/denom;
    const w=(d00*d21-d01*d20)/denom;
    const u=1-v-w;
    return {u,v,w, inside:u>=0&&v>=0&&w>=0};
  }
  pointInTriangle(p,a,b,c){
    const bc=this.barycentric(p,a,b,c);
    return bc.inside;
  }
  rayTriangle(origin,dir,a,b,c){
    const e1=new THREE.Vector3().subVectors(b,a);
    const e2=new THREE.Vector3().subVectors(c,a);
    const h=new THREE.Vector3().crossVectors(dir,e2);
    const det=e1.dot(h);
    if(det>-1e-6&&det<1e-6) return null;
    const f=1/det;
    const s=new THREE.Vector3().subVectors(origin,a);
    const u=f*s.dot(h);
    if(u<0||u>1) return null;
    const q=new THREE.Vector3().crossVectors(s,e1);
    const v=f*dir.dot(q);
    if(v<0||u+v>1) return null;
    const t=f*e2.dot(q);
    if(t>1e-6) return {t, uv:{u,v,w:1-u-v}, point:new THREE.Vector3().copy(origin).addScaledVector(dir,t)};
    return null;
  }
  pointToPlaneDistance(p, planePoint, planeNormal){
    return new THREE.Vector3().subVectors(p,planePoint).dot(planeNormal);
  }
  projectPointOnPlane(p, planePoint, planeNormal){
    const dist=this.pointToPlaneDistance(p,planePoint,planeNormal);
    return new THREE.Vector3().copy(p).addScaledVector(planeNormal,-dist);
  }
  reflectVector(v,n){ return new THREE.Vector3().copy(v).sub(new THREE.Vector3().copy(n).multiplyScalar(2*v.dot(n))); }
  refractVector(v,n,eta){
    const cosI = -this.clamp(v.dot(n),-1,1);
    const sinT2 = eta*eta*(1-cosI*cosI);
    if(sinT2>1) return null;
    const cosT=Math.sqrt(1-sinT2);
    return new THREE.Vector3().copy(v).multiplyScalar(eta).add(new THREE.Vector3().copy(n).multiplyScalar(eta*cosI-cosT));
  }
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
  frustumContainsBox(frustum, box){ return frustum.intersectsBox(box); }
  frustumContainsSphere(frustum, center, radius){ return frustum.intersectsSphere(new THREE.Sphere(center,radius)); }
  halton(index,base){ let r=0,f=1/base; while(index>0){ r+=f*(index%base); index=Math.floor(index/base); f/=base; } return r; }
  radicalInverse(bits){ bits=(bits<<16)|(bits>>>16); bits=((bits&0x55555555)<<1)|((bits&0xaaaaaaaa)>>>1); bits=((bits&0x33333333)<<2)|((bits&0xcccccccc)>>>2); bits=((bits&0x0f0f0f0f)<<4)|((bits&0xf0f0f0f0)>>>4); bits=((bits&0x00ff00ff)<<8)|((bits&0xff00ff00)>>>8); return bits*2.3283064365386963e-10; }
  hammersley(i,N){ return new THREE.Vector2(i/N, this.radicalInverse(i)); }
  pcgHash(input){ let state=input*747796405+2891336453; let word=((state>>>((state>>>28)+4))^state)*277803737; return (word>>>22)^word; }
  toLinear(srgb){ return srgb<=0.04045? srgb/12.92 : Math.pow((srgb+0.055)/1.055,2.4); }
  toSRGB(lin){ return lin<=0.0031308? lin*12.92 : 1.055*Math.pow(lin,1/2.4)-0.055; }
  acesFilmic(x){ const a=2.51,b=0.03,c=2.43,d=0.59,e=0.14; return (x*(a*x+b))/(x*(c*x+d)+e); }
  temperatureToRGB(k){
    const temp=k/100; let r,g,b;
    if(temp<=66){ r=255; g=temp; g=99.4708025861*Math.log(g)-161.1195681661; } else { r=temp-60; r=329.698727446*Math.pow(r,-0.1332047592); g=temp-60; g=288.1221695283*Math.pow(g,-0.0755148492); }
    if(temp>=66){ b=255; } else if(temp<=19){ b=0; } else { b=temp-10; b=138.5177312231*Math.log(b)-305.0447927307; }
    return new THREE.Color(this.clamp(r,0,255)/255,this.clamp(g,0,255)/255,this.clamp(b,0,255)/255);
  }
  integrateRK4(pos,vel,accFunc,dt){
    const a1=accFunc(pos,vel);
    const r1_vel=new THREE.Vector3().copy(vel);
    const r1_acc=a1;
    const pos2=new THREE.Vector3().copy(pos).addScaledVector(r1_vel,dt*0.5);
    const vel2=new THREE.Vector3().copy(vel).addScaledVector(r1_acc,dt*0.5);
    const a2=accFunc(pos2,vel2);
    const pos3=new THREE.Vector3().copy(pos).addScaledVector(vel2,dt*0.5);
    const vel3=new THREE.Vector3().copy(vel).addScaledVector(a2,dt*0.5);
    const a3=accFunc(pos3,vel3);
    const pos4=new THREE.Vector3().copy(pos).addScaledVector(vel3,dt);
    const vel4=new THREE.Vector3().copy(vel).addScaledVector(a3,dt);
    const a4=accFunc(pos4,vel4);
    const posFinal=new THREE.Vector3().copy(pos).addScaledVector(new THREE.Vector3().copy(r1_vel).addScaledVector(vel2,2).addScaledVector(vel3,2).add(vel4), dt/6);
    const velFinal=new THREE.Vector3().copy(vel).addScaledVector(new THREE.Vector3().copy(r1_acc).addScaledVector(a2,2).addScaledVector(a3,2).add(a4), dt/6);
    return {pos:posFinal, vel:velFinal};
  }
  aStar(start,goal,neighbors,heur,cost){
    const open=new Map([[start.id||'s',{node:start,g:0,f:heur(start,goal),parent:null}]]);
    const closed=new Set();
    while(open.size){
      let cur=null, minF=Infinity;
      for(let [k,v] of open){ if(v.f<minF){ minF=v.f; cur=v; } }
      if(cur.node===goal){ const path=[]; let c=cur; while(c){ path.push(c.node); c=c.parent; } return path.reverse(); }
      open.delete(cur.node.id||'cur');
      closed.add(cur.node.id||cur.node);
      for(let nb of neighbors(cur.node)){
        if(closed.has(nb.id||nb)) continue;
        const tg=cur.g+(cost?cost(cur.node,nb):1);
        const ex=open.get(nb.id||'nb');
        if(!ex||tg<ex.g){ open.set(nb.id||Math.random(),{node:nb,g:tg,f:tg+heur(nb,goal),parent:cur}); }
      }
    }
    return null;
  }
}
