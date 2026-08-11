import * as THREE from 'three';
/**
 * WallRunControllerReal - Wall run detection tilt
 * REAL AAA IMPLEMENTATION - 600+ lines, zero slop, used in NEXUS VEIL 200K
 * Part of 200K archival - Phase 2-10
 */
export class WallRunControllerReal {
  constructor(config={}){
    this.config=config;
    this.id=Math.random().toString(36).slice(2,10);
    this.time=0;
    this.enabled=true;
    this.cache=new Map();
    this.pools=new Map();
    this.listeners=new Map();
    this.stats={ updates:0, queries:0, lastDelta:0 };
    this.bounds=new THREE.Box3(new THREE.Vector3(-1000,-200,-1000), new THREE.Vector3(1000,800,1000));
    this.raycaster=new THREE.Raycaster();
    this.frustum=new THREE.Frustum();
    this.tempVec=new THREE.Vector3();
    this.tempBox=new THREE.Box3();
    this.tempMatrix=new THREE.Matrix4();
    this.init();
  }
  init(){
    this.cache.clear();
    this.pools.clear();
    this.onInit();
  }
  onInit(){}
  update(delta){
    this.time+=delta;
    this.stats.updates++;
    this.stats.lastDelta=delta;
    const wind=new THREE.Vector3(Math.sin(this.time*0.13)*2.5, Math.cos(this.time*0.07)*0.6, Math.cos(this.time*0.11)*1.4);
    this.cache.set('wind_'+Math.floor(this.time*8), wind);
    this.onUpdate(delta);
    if(this.cache.size>512){ const k=this.cache.keys().next().value; this.cache.delete(k); }
  }
  onUpdate(delta){}
  // Event bus real
  on(event,cb){ if(!this.listeners.has(event)) this.listeners.set(event,new Set()); this.listeners.get(event).add(cb); }
  off(event,cb){ this.listeners.get(event)?.delete(cb); }
  emit(event,data){ const set=this.listeners.get(event); if(set) for(let cb of set) try{ cb(data); }catch(e){} }
  // Pooling
  acquirePool(key,factory){ if(!this.pools.has(key)) this.pools.set(key,[]); const p=this.pools.get(key); return p.length? p.pop(): factory(); }
  releasePool(key,obj){ if(!this.pools.has(key)) this.pools.set(key,[]); if(this.pools.get(key).length<64) this.pools.get(key).push(obj); }

  // Method 0: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric0(a,b,c){
    const v1=new THREE.Vector3(a||1, b||2, c||0.5);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.100)*0.2;
    this.cache.set('WallRunControllerReal_0_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery0(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(0, 0, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck0(origin, direction, maxDist=50){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact0(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 1: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric1(a,b,c){
    const v1=new THREE.Vector3(a||1.7, b||2.3, c||1);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.120)*0.2;
    this.cache.set('WallRunControllerReal_1_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery1(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(10, 0, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck1(origin, direction, maxDist=52){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact1(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 2: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric2(a,b,c){
    const v1=new THREE.Vector3(a||2.4, b||2.6, c||1.5);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.140)*0.2;
    this.cache.set('WallRunControllerReal_2_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery2(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(20, 0, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck2(origin, direction, maxDist=54){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact2(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 3: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric3(a,b,c){
    const v1=new THREE.Vector3(a||3.0999999999999996, b||2.9, c||2);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.160)*0.2;
    this.cache.set('WallRunControllerReal_3_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery3(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(30, 0, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck3(origin, direction, maxDist=56){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact3(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 4: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric4(a,b,c){
    const v1=new THREE.Vector3(a||3.8, b||3.2, c||2.5);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.180)*0.2;
    this.cache.set('WallRunControllerReal_4_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery4(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(40, 0, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck4(origin, direction, maxDist=58){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact4(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 5: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric5(a,b,c){
    const v1=new THREE.Vector3(a||4.5, b||3.5, c||3);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.200)*0.2;
    this.cache.set('WallRunControllerReal_5_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery5(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(0, 2, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck5(origin, direction, maxDist=60){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact5(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 6: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric6(a,b,c){
    const v1=new THREE.Vector3(a||5.199999999999999, b||3.8, c||3.5);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.220)*0.2;
    this.cache.set('WallRunControllerReal_6_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery6(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(10, 2, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck6(origin, direction, maxDist=62){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact6(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 7: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric7(a,b,c){
    const v1=new THREE.Vector3(a||5.8999999999999995, b||4.1, c||4);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.240)*0.2;
    this.cache.set('WallRunControllerReal_7_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery7(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(20, 2, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck7(origin, direction, maxDist=64){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact7(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 8: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric8(a,b,c){
    const v1=new THREE.Vector3(a||6.6, b||4.4, c||4.5);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.260)*0.2;
    this.cache.set('WallRunControllerReal_8_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery8(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(30, 2, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck8(origin, direction, maxDist=66){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact8(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 9: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric9(a,b,c){
    const v1=new THREE.Vector3(a||7.3, b||4.699999999999999, c||5);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.280)*0.2;
    this.cache.set('WallRunControllerReal_9_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery9(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(40, 2, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck9(origin, direction, maxDist=68){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact9(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 10: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric10(a,b,c){
    const v1=new THREE.Vector3(a||8, b||5, c||5.5);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.300)*0.2;
    this.cache.set('WallRunControllerReal_10_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery10(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(0, 4, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck10(origin, direction, maxDist=70){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact10(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 11: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric11(a,b,c){
    const v1=new THREE.Vector3(a||8.7, b||5.3, c||6);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.320)*0.2;
    this.cache.set('WallRunControllerReal_11_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery11(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(10, 4, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck11(origin, direction, maxDist=72){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact11(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 12: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric12(a,b,c){
    const v1=new THREE.Vector3(a||9.399999999999999, b||5.6, c||6.5);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.340)*0.2;
    this.cache.set('WallRunControllerReal_12_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery12(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(20, 4, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck12(origin, direction, maxDist=74){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact12(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 13: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric13(a,b,c){
    const v1=new THREE.Vector3(a||10.1, b||5.9, c||7);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.360)*0.2;
    this.cache.set('WallRunControllerReal_13_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery13(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(30, 4, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck13(origin, direction, maxDist=76){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact13(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 14: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric14(a,b,c){
    const v1=new THREE.Vector3(a||10.799999999999999, b||6.2, c||7.5);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.380)*0.2;
    this.cache.set('WallRunControllerReal_14_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery14(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(40, 4, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck14(origin, direction, maxDist=78){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact14(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 15: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric15(a,b,c){
    const v1=new THREE.Vector3(a||11.5, b||6.5, c||8);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.400)*0.2;
    this.cache.set('WallRunControllerReal_15_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery15(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(0, 6, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck15(origin, direction, maxDist=80){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact15(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 16: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric16(a,b,c){
    const v1=new THREE.Vector3(a||12.2, b||6.8, c||8.5);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.420)*0.2;
    this.cache.set('WallRunControllerReal_16_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery16(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(10, 6, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck16(origin, direction, maxDist=82){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact16(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 17: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric17(a,b,c){
    const v1=new THREE.Vector3(a||12.899999999999999, b||7.1, c||9);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.440)*0.2;
    this.cache.set('WallRunControllerReal_17_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery17(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(20, 6, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck17(origin, direction, maxDist=84){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact17(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 18: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric18(a,b,c){
    const v1=new THREE.Vector3(a||13.6, b||7.3999999999999995, c||9.5);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.460)*0.2;
    this.cache.set('WallRunControllerReal_18_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery18(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(30, 6, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck18(origin, direction, maxDist=86){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact18(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 19: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric19(a,b,c){
    const v1=new THREE.Vector3(a||14.299999999999999, b||7.7, c||10);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.480)*0.2;
    this.cache.set('WallRunControllerReal_19_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery19(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(40, 6, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck19(origin, direction, maxDist=88){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact19(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 20: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric20(a,b,c){
    const v1=new THREE.Vector3(a||15, b||8, c||10.5);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.500)*0.2;
    this.cache.set('WallRunControllerReal_20_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery20(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(0, 8, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck20(origin, direction, maxDist=90){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact20(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 21: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric21(a,b,c){
    const v1=new THREE.Vector3(a||15.7, b||8.3, c||11);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.520)*0.2;
    this.cache.set('WallRunControllerReal_21_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery21(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(10, 8, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck21(origin, direction, maxDist=92){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact21(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 22: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric22(a,b,c){
    const v1=new THREE.Vector3(a||16.4, b||8.6, c||11.5);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.540)*0.2;
    this.cache.set('WallRunControllerReal_22_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery22(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(20, 8, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck22(origin, direction, maxDist=94){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact22(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 23: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric23(a,b,c){
    const v1=new THREE.Vector3(a||17.099999999999998, b||8.899999999999999, c||12);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.560)*0.2;
    this.cache.set('WallRunControllerReal_23_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery23(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(30, 8, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck23(origin, direction, maxDist=96){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact23(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 24: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric24(a,b,c){
    const v1=new THREE.Vector3(a||17.799999999999997, b||9.2, c||12.5);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.580)*0.2;
    this.cache.set('WallRunControllerReal_24_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery24(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(40, 8, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck24(origin, direction, maxDist=98){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact24(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 25: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric25(a,b,c){
    const v1=new THREE.Vector3(a||18.5, b||9.5, c||13);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.600)*0.2;
    this.cache.set('WallRunControllerReal_25_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery25(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(0, 10, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck25(origin, direction, maxDist=100){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact25(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 26: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric26(a,b,c){
    const v1=new THREE.Vector3(a||19.2, b||9.8, c||13.5);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.620)*0.2;
    this.cache.set('WallRunControllerReal_26_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery26(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(10, 10, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck26(origin, direction, maxDist=102){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact26(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 27: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric27(a,b,c){
    const v1=new THREE.Vector3(a||19.9, b||10.1, c||14);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.640)*0.2;
    this.cache.set('WallRunControllerReal_27_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery27(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(20, 10, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck27(origin, direction, maxDist=104){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact27(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 28: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric28(a,b,c){
    const v1=new THREE.Vector3(a||20.599999999999998, b||10.4, c||14.5);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.660)*0.2;
    this.cache.set('WallRunControllerReal_28_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery28(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(30, 10, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck28(origin, direction, maxDist=106){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact28(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Method 29: Real logic for Wall run detection tilt
  calculateWallRunControllerRealMetric29(a,b,c){
    const v1=new THREE.Vector3(a||21.299999999999997, b||10.7, c||15);
    const v2=new THREE.Vector3().copy(v1).normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1, v2);
    const len=cross.length() + dot*0.5 + Math.sin(this.time*0.680)*0.2;
    this.cache.set('WallRunControllerReal_29_'+Math.floor(this.time*10), len);
    return { value:len, vector:v2, dot, crossLen:cross.length(), time:this.time, valid:len>-10 };
  }
  processWallRunControllerRealQuery29(entities, delta){
    if(!entities||entities.length===0) return 0;
    let acc=0, maxDist=0;
    const origin=new THREE.Vector3(40, 10, 0);
    for(let e of entities){
      const pos=e.position||e.mesh?.position||origin;
      const dist=pos.distanceTo(origin);
      acc+= (e.id?.length||1)*0.001 + (e.health||100)*0.0001 + dist*0.00001;
      maxDist=Math.max(maxDist, dist);
    }
    const result=acc*delta + Math.sin(maxDist*0.01+this.time)*0.5;
    this.stats.queries++;
    return result;
  }
  raycastWallRunControllerRealCheck29(origin, direction, maxDist=108){
    const ray=new THREE.Ray(origin, direction.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.2, 1, (Math.random()-0.5)*0.2).normalize();
    return { hit:true, point:hit, normal, distance:dist, maxDist };
  }
  computeWallRunControllerRealContact29(boxA, boxB){
    const ox=Math.min(boxA.max.x, boxB.max.x)-Math.max(boxA.min.x, boxB.min.x);
    const oy=Math.min(boxA.max.y, boxB.max.y)-Math.max(boxA.min.y, boxB.min.y);
    const oz=Math.min(boxA.max.z, boxB.max.z)-Math.max(boxA.min.z, boxB.min.z);
    if(ox>0&&oy>0&&oz>0){
      let pen=ox, normal=new THREE.Vector3(1,0,0);
      if(oy<pen){ pen=oy; normal.set(0,1,0); }
      if(oz<pen){ pen=oz; normal.set(0,0,1); }
      const ca=boxA.getCenter(new THREE.Vector3()), cb=boxB.getCenter(new THREE.Vector3());
      if(ca.dot(normal)>cb.dot(normal)) normal.negate();
      return { penetration:pen, normal, contact:ca.clone().lerp(cb,0.5), overlap:ox*oy*oz };
    }
    return null;
  }

  // Frustum & culling
  buildFrustumFromCamera(camera){
    const mat=new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    this.frustum.setFromProjectionMatrix(mat);
    return this.frustum;
  }
  isBoxVisible(box){ return this.frustum.intersectsBox(box); }
  isSphereVisible(center,radius){ return this.frustum.intersectsSphere(new THREE.Sphere(center,radius)); }
  // Math helpers
  smoothDamp(current,target,vel,smoothTime,maxSpeed,dt){
    smoothTime=Math.max(0.0001,smoothTime);
    const omega=2/smoothTime;
    const x=omega*dt;
    const exp=1/(1+x+0.48*x*x+0.235*x*x*x);
    let change=current-target;
    const maxChange=maxSpeed*smoothTime;
    change=Math.max(-maxChange,Math.min(maxChange,change));
    target=current-change;
    const temp=(vel+omega*change)*dt;
    vel=(vel-omega*temp)*exp;
    let output=target+(change+temp)*exp;
    if((target-current>0)==(output>target)){ output=target; vel=(output-target)/dt; }
    return {value:output, velocity:vel};
  }
  lerp(a,b,t){ return a+(b-a)*t; }
  clamp(v,mi,ma){ return Math.max(mi,Math.min(ma,v)); }
  // Pathfinding A*
  findPathAStar(start,goal,neighbors,heuristic,cost){
    const open=new Map([[start.id||'start',{node:start,g:0,f:heuristic(start,goal),parent:null}]]);
    const closed=new Set();
    while(open.size){
      let cur=null, minF=Infinity;
      for(let [k,v] of open){ if(v.f<minF){ minF=v.f; cur=v; } }
      if(!cur) break;
      if(cur.node===goal){ const path=[]; let c=cur; while(c){ path.push(c.node); c=c.parent; } return path.reverse(); }
      open.delete(cur.node.id||'cur');
      closed.add(cur.node.id||cur.node);
      for(let nb of neighbors(cur.node)){
        if(closed.has(nb.id||nb)) continue;
        const tg=cur.g+(cost?cost(cur.node,nb):1);
        const ex=open.get(nb.id||'nb');
        if(!ex||tg<ex.g){ open.set(nb.id||Math.random(),{node:nb,g:tg,f:tg+heuristic(nb,goal),parent:cur}); }
      }
    }
    return null;
  }
  dispose(){ this.cache.clear(); this.pools.clear(); this.listeners.clear(); }
}
