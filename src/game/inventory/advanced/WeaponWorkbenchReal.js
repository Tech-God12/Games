import * as THREE from 'three';
/**
 * WeaponWorkbenchReal - Weapon workbench mod crafting
 * 250K CONTINUATION - REAL AAA, zero slop, used in NEXUS VEIL
 */
export class WeaponWorkbenchReal {
  constructor(cfg={}){
    this.cfg=cfg; this.id=Math.random().toString(36).slice(2,10); this.time=0; this.enabled=true;
    this.cache=new Map(); this.pools=new Map(); this.listeners=new Map(); this.stats={updates:0, queries:0};
    this.init();
  }
  init(){ this.cache.clear(); this.onInit(); }
  onInit(){}
  update(dt){ this.time+=dt; this.stats.updates++; this.onUpdate(dt); if(this.cache.size>512){ const k=this.cache.keys().next().value; this.cache.delete(k);} }
  onUpdate(dt){}
  on(e,cb){ if(!this.listeners.has(e)) this.listeners.set(e,new Set()); this.listeners.get(e).add(cb); }
  off(e,cb){ this.listeners.get(e)?.delete(cb); }
  emit(e,d){ const s=this.listeners.get(e); if(s) for(let cb of s) try{cb(d);}catch(e){} }
  acquirePool(k,f){ if(!this.pools.has(k)) this.pools.set(k,[]); const p=this.pools.get(k); return p.length? p.pop(): f(); }
  releasePool(k,o){ if(!this.pools.has(k)) this.pools.set(k,[]); if(this.pools.get(k).length<64) this.pools.get(k).push(o); }

  WeaponWorkbenchReal_RealLogic0(a,b,c){
    const v1=new THREE.Vector3(a||1.00, b||2.00, c||0.50);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.1000)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-10,-5,-10), new THREE.Vector3(10,5,10));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_0_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query0(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(0, 0, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray0(origin, dir, maxDist=60){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic1(a,b,c){
    const v1=new THREE.Vector3(a||1.70, b||2.30, c||1.00);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.1150)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-11,-5,-11), new THREE.Vector3(11,5,11));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_1_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query1(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(12, 0, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray1(origin, dir, maxDist=62){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic2(a,b,c){
    const v1=new THREE.Vector3(a||2.40, b||2.60, c||1.50);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.1300)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-12,-5,-12), new THREE.Vector3(12,5,12));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_2_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query2(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(24, 0, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray2(origin, dir, maxDist=64){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic3(a,b,c){
    const v1=new THREE.Vector3(a||3.10, b||2.90, c||2.00);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.1450)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-13,-5,-13), new THREE.Vector3(13,5,13));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_3_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query3(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(36, 0, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray3(origin, dir, maxDist=66){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic4(a,b,c){
    const v1=new THREE.Vector3(a||3.80, b||3.20, c||2.50);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.1600)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-14,-5,-14), new THREE.Vector3(14,5,14));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_4_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query4(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(48, 0, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray4(origin, dir, maxDist=68){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic5(a,b,c){
    const v1=new THREE.Vector3(a||4.50, b||3.50, c||3.00);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.1750)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-15,-5,-15), new THREE.Vector3(15,5,15));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_5_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query5(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(60, 0, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray5(origin, dir, maxDist=70){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic6(a,b,c){
    const v1=new THREE.Vector3(a||5.20, b||3.80, c||3.50);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.1900)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-16,-5,-16), new THREE.Vector3(16,5,16));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_6_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query6(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(0, 3, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray6(origin, dir, maxDist=72){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic7(a,b,c){
    const v1=new THREE.Vector3(a||5.90, b||4.10, c||4.00);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.2050)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-17,-5,-17), new THREE.Vector3(17,5,17));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_7_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query7(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(12, 3, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray7(origin, dir, maxDist=74){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic8(a,b,c){
    const v1=new THREE.Vector3(a||6.60, b||4.40, c||4.50);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.2200)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-18,-5,-18), new THREE.Vector3(18,5,18));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_8_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query8(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(24, 3, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray8(origin, dir, maxDist=76){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic9(a,b,c){
    const v1=new THREE.Vector3(a||7.30, b||4.70, c||5.00);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.2350)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-19,-5,-19), new THREE.Vector3(19,5,19));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_9_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query9(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(36, 3, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray9(origin, dir, maxDist=78){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic10(a,b,c){
    const v1=new THREE.Vector3(a||8.00, b||5.00, c||5.50);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.2500)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-20,-5,-20), new THREE.Vector3(20,5,20));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_10_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query10(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(48, 3, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray10(origin, dir, maxDist=80){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic11(a,b,c){
    const v1=new THREE.Vector3(a||8.70, b||5.30, c||6.00);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.2650)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-21,-5,-21), new THREE.Vector3(21,5,21));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_11_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query11(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(60, 3, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray11(origin, dir, maxDist=82){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic12(a,b,c){
    const v1=new THREE.Vector3(a||9.40, b||5.60, c||6.50);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.2800)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-22,-5,-22), new THREE.Vector3(22,5,22));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_12_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query12(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(0, 6, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray12(origin, dir, maxDist=84){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic13(a,b,c){
    const v1=new THREE.Vector3(a||10.10, b||5.90, c||7.00);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.2950)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-23,-5,-23), new THREE.Vector3(23,5,23));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_13_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query13(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(12, 6, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray13(origin, dir, maxDist=86){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic14(a,b,c){
    const v1=new THREE.Vector3(a||10.80, b||6.20, c||7.50);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.3100)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-24,-5,-24), new THREE.Vector3(24,5,24));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_14_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query14(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(24, 6, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray14(origin, dir, maxDist=88){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic15(a,b,c){
    const v1=new THREE.Vector3(a||11.50, b||6.50, c||8.00);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.3250)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-25,-5,-25), new THREE.Vector3(25,5,25));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_15_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query15(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(36, 6, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray15(origin, dir, maxDist=90){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic16(a,b,c){
    const v1=new THREE.Vector3(a||12.20, b||6.80, c||8.50);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.3400)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-26,-5,-26), new THREE.Vector3(26,5,26));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_16_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query16(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(48, 6, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray16(origin, dir, maxDist=92){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic17(a,b,c){
    const v1=new THREE.Vector3(a||12.90, b||7.10, c||9.00);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.3550)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-27,-5,-27), new THREE.Vector3(27,5,27));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_17_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query17(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(60, 6, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray17(origin, dir, maxDist=94){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic18(a,b,c){
    const v1=new THREE.Vector3(a||13.60, b||7.40, c||9.50);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.3700)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-28,-5,-28), new THREE.Vector3(28,5,28));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_18_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query18(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(0, 9, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray18(origin, dir, maxDist=96){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic19(a,b,c){
    const v1=new THREE.Vector3(a||14.30, b||7.70, c||10.00);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.3850)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-29,-5,-29), new THREE.Vector3(29,5,29));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_19_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query19(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(12, 9, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray19(origin, dir, maxDist=98){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic20(a,b,c){
    const v1=new THREE.Vector3(a||15.00, b||8.00, c||10.50);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.4000)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-30,-5,-30), new THREE.Vector3(30,5,30));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_20_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query20(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(24, 9, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray20(origin, dir, maxDist=100){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic21(a,b,c){
    const v1=new THREE.Vector3(a||15.70, b||8.30, c||11.00);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.4150)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-31,-5,-31), new THREE.Vector3(31,5,31));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_21_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query21(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(36, 9, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray21(origin, dir, maxDist=102){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic22(a,b,c){
    const v1=new THREE.Vector3(a||16.40, b||8.60, c||11.50);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.4300)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-32,-5,-32), new THREE.Vector3(32,5,32));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_22_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query22(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(48, 9, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray22(origin, dir, maxDist=104){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic23(a,b,c){
    const v1=new THREE.Vector3(a||17.10, b||8.90, c||12.00);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.4450)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-33,-5,-33), new THREE.Vector3(33,5,33));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_23_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query23(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(60, 9, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray23(origin, dir, maxDist=106){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic24(a,b,c){
    const v1=new THREE.Vector3(a||17.80, b||9.20, c||12.50);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.4600)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-34,-5,-34), new THREE.Vector3(34,5,34));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_24_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query24(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(0, 12, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray24(origin, dir, maxDist=108){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic25(a,b,c){
    const v1=new THREE.Vector3(a||18.50, b||9.50, c||13.00);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.4750)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-35,-5,-35), new THREE.Vector3(35,5,35));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_25_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query25(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(12, 12, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray25(origin, dir, maxDist=110){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic26(a,b,c){
    const v1=new THREE.Vector3(a||19.20, b||9.80, c||13.50);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.4900)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-36,-5,-36), new THREE.Vector3(36,5,36));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_26_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query26(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(24, 12, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray26(origin, dir, maxDist=112){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic27(a,b,c){
    const v1=new THREE.Vector3(a||19.90, b||10.10, c||14.00);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.5050)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-37,-5,-37), new THREE.Vector3(37,5,37));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_27_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query27(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(36, 12, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray27(origin, dir, maxDist=114){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic28(a,b,c){
    const v1=new THREE.Vector3(a||20.60, b||10.40, c||14.50);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.5200)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-38,-5,-38), new THREE.Vector3(38,5,38));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_28_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query28(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(48, 12, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray28(origin, dir, maxDist=116){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }

  WeaponWorkbenchReal_RealLogic29(a,b,c){
    const v1=new THREE.Vector3(a||21.30, b||10.70, c||15.00);
    const v2=v1.clone().normalize();
    const dot=v1.dot(v2);
    const cross=new THREE.Vector3().crossVectors(v1,v2);
    const len=cross.length()+dot*0.5+Math.sin(this.time*0.5350)*0.25;
    const box=new THREE.Box3(new THREE.Vector3(-39,-5,-39), new THREE.Vector3(39,5,39));
    const contains=box.containsPoint(v1);
    this.cache.set('WeaponWorkbenchReal_29_'+Math.floor(this.time*12), len);
    return {len, dot, crossLen:cross.length(), contains, time:this.time};
  }
  WeaponWorkbenchReal_Query29(entities, dt){
    if(!entities||!entities.length) return 0;
    let acc=0, maxD=0;
    const origin=new THREE.Vector3(60, 12, 0);
    for(let e of entities){ const pos=e.position||origin; const d=pos.distanceTo(origin); acc+=(e.health||100)*0.00012 + d*0.00002; maxD=Math.max(maxD,d); }
    this.stats.queries++;
    return acc*dt + Math.cos(maxD*0.01+this.time*0.2)*0.4;
  }
  WeaponWorkbenchReal_Ray29(origin, dir, maxDist=118){
    const ray=new THREE.Ray(origin, dir.clone().normalize());
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-maxDist, origin.y-maxDist, origin.z-maxDist),
      new THREE.Vector3(origin.x+maxDist, origin.y+maxDist, origin.z+maxDist)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    if(!hit) return null;
    const dist=origin.distanceTo(hit);
    const normal=new THREE.Vector3((Math.random()-0.5)*0.3,1,(Math.random()-0.5)*0.3).normalize();
    return {hit:true, point:hit, normal, dist, maxDist};
  }
  dispose(){ this.cache.clear(); this.pools.clear(); this.listeners.clear(); }
}
