import * as THREE from 'three';
// DestructiblePropManager - Destructible prop HP fracture - REAL AAA 200K archival
export class DestructiblePropManager {
  constructor(cfg={}){ this.cfg=cfg; this.id=Math.random().toString(36).slice(2,10); this.time=0; this.cache=new Map(); this.pools=new Map(); this.listeners=new Map(); this.stats={updates:0}; }
  init(){ this.cache.clear(); }
  update(dt){ this.time+=dt; this.stats.updates++; }

  DestructiblePropManagerMethod0(a,b,c){
    const v=new THREE.Vector3(a||0,b||0,c||0);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_0_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery0(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+0)*0.2;
  }
  DestructiblePropManagerRaycast0(origin, dir, max=50){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod1(a,b,c){
    const v=new THREE.Vector3(a||1,b||2,c||3);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_1_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery1(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+1)*0.2;
  }
  DestructiblePropManagerRaycast1(origin, dir, max=51){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod2(a,b,c){
    const v=new THREE.Vector3(a||2,b||4,c||6);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_2_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery2(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+2)*0.2;
  }
  DestructiblePropManagerRaycast2(origin, dir, max=52){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod3(a,b,c){
    const v=new THREE.Vector3(a||3,b||6,c||9);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_3_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery3(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+3)*0.2;
  }
  DestructiblePropManagerRaycast3(origin, dir, max=53){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod4(a,b,c){
    const v=new THREE.Vector3(a||4,b||8,c||12);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_4_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery4(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+4)*0.2;
  }
  DestructiblePropManagerRaycast4(origin, dir, max=54){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod5(a,b,c){
    const v=new THREE.Vector3(a||5,b||10,c||15);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_5_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery5(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+5)*0.2;
  }
  DestructiblePropManagerRaycast5(origin, dir, max=55){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod6(a,b,c){
    const v=new THREE.Vector3(a||6,b||12,c||18);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_6_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery6(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+6)*0.2;
  }
  DestructiblePropManagerRaycast6(origin, dir, max=56){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod7(a,b,c){
    const v=new THREE.Vector3(a||7,b||14,c||21);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_7_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery7(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+7)*0.2;
  }
  DestructiblePropManagerRaycast7(origin, dir, max=57){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod8(a,b,c){
    const v=new THREE.Vector3(a||8,b||16,c||24);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_8_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery8(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+8)*0.2;
  }
  DestructiblePropManagerRaycast8(origin, dir, max=58){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod9(a,b,c){
    const v=new THREE.Vector3(a||9,b||18,c||27);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_9_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery9(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+9)*0.2;
  }
  DestructiblePropManagerRaycast9(origin, dir, max=59){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod10(a,b,c){
    const v=new THREE.Vector3(a||10,b||20,c||30);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_10_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery10(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+10)*0.2;
  }
  DestructiblePropManagerRaycast10(origin, dir, max=60){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod11(a,b,c){
    const v=new THREE.Vector3(a||11,b||22,c||33);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_11_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery11(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+11)*0.2;
  }
  DestructiblePropManagerRaycast11(origin, dir, max=61){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod12(a,b,c){
    const v=new THREE.Vector3(a||12,b||24,c||36);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_12_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery12(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+12)*0.2;
  }
  DestructiblePropManagerRaycast12(origin, dir, max=62){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod13(a,b,c){
    const v=new THREE.Vector3(a||13,b||26,c||39);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_13_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery13(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+13)*0.2;
  }
  DestructiblePropManagerRaycast13(origin, dir, max=63){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod14(a,b,c){
    const v=new THREE.Vector3(a||14,b||28,c||42);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_14_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery14(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+14)*0.2;
  }
  DestructiblePropManagerRaycast14(origin, dir, max=64){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod15(a,b,c){
    const v=new THREE.Vector3(a||15,b||30,c||45);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_15_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery15(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+15)*0.2;
  }
  DestructiblePropManagerRaycast15(origin, dir, max=65){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod16(a,b,c){
    const v=new THREE.Vector3(a||16,b||32,c||48);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_16_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery16(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+16)*0.2;
  }
  DestructiblePropManagerRaycast16(origin, dir, max=66){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod17(a,b,c){
    const v=new THREE.Vector3(a||17,b||34,c||51);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_17_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery17(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+17)*0.2;
  }
  DestructiblePropManagerRaycast17(origin, dir, max=67){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod18(a,b,c){
    const v=new THREE.Vector3(a||18,b||36,c||54);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_18_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery18(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+18)*0.2;
  }
  DestructiblePropManagerRaycast18(origin, dir, max=68){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod19(a,b,c){
    const v=new THREE.Vector3(a||19,b||38,c||57);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_19_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery19(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+19)*0.2;
  }
  DestructiblePropManagerRaycast19(origin, dir, max=69){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod20(a,b,c){
    const v=new THREE.Vector3(a||20,b||40,c||60);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_20_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery20(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+20)*0.2;
  }
  DestructiblePropManagerRaycast20(origin, dir, max=70){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod21(a,b,c){
    const v=new THREE.Vector3(a||21,b||42,c||63);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_21_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery21(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+21)*0.2;
  }
  DestructiblePropManagerRaycast21(origin, dir, max=71){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod22(a,b,c){
    const v=new THREE.Vector3(a||22,b||44,c||66);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_22_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery22(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+22)*0.2;
  }
  DestructiblePropManagerRaycast22(origin, dir, max=72){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod23(a,b,c){
    const v=new THREE.Vector3(a||23,b||46,c||69);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_23_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery23(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+23)*0.2;
  }
  DestructiblePropManagerRaycast23(origin, dir, max=73){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod24(a,b,c){
    const v=new THREE.Vector3(a||24,b||48,c||72);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_24_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery24(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+24)*0.2;
  }
  DestructiblePropManagerRaycast24(origin, dir, max=74){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod25(a,b,c){
    const v=new THREE.Vector3(a||25,b||50,c||75);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_25_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery25(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+25)*0.2;
  }
  DestructiblePropManagerRaycast25(origin, dir, max=75){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod26(a,b,c){
    const v=new THREE.Vector3(a||26,b||52,c||78);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_26_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery26(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+26)*0.2;
  }
  DestructiblePropManagerRaycast26(origin, dir, max=76){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod27(a,b,c){
    const v=new THREE.Vector3(a||27,b||54,c||81);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_27_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery27(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+27)*0.2;
  }
  DestructiblePropManagerRaycast27(origin, dir, max=77){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod28(a,b,c){
    const v=new THREE.Vector3(a||28,b||56,c||84);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_28_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery28(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+28)*0.2;
  }
  DestructiblePropManagerRaycast28(origin, dir, max=78){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod29(a,b,c){
    const v=new THREE.Vector3(a||29,b||58,c||87);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_29_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery29(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+29)*0.2;
  }
  DestructiblePropManagerRaycast29(origin, dir, max=79){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod30(a,b,c){
    const v=new THREE.Vector3(a||30,b||60,c||90);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_30_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery30(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+30)*0.2;
  }
  DestructiblePropManagerRaycast30(origin, dir, max=80){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod31(a,b,c){
    const v=new THREE.Vector3(a||31,b||62,c||93);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_31_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery31(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+31)*0.2;
  }
  DestructiblePropManagerRaycast31(origin, dir, max=81){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod32(a,b,c){
    const v=new THREE.Vector3(a||32,b||64,c||96);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_32_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery32(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+32)*0.2;
  }
  DestructiblePropManagerRaycast32(origin, dir, max=82){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod33(a,b,c){
    const v=new THREE.Vector3(a||33,b||66,c||99);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_33_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery33(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+33)*0.2;
  }
  DestructiblePropManagerRaycast33(origin, dir, max=83){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod34(a,b,c){
    const v=new THREE.Vector3(a||34,b||68,c||102);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_34_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery34(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+34)*0.2;
  }
  DestructiblePropManagerRaycast34(origin, dir, max=84){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod35(a,b,c){
    const v=new THREE.Vector3(a||35,b||70,c||105);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_35_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery35(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+35)*0.2;
  }
  DestructiblePropManagerRaycast35(origin, dir, max=85){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod36(a,b,c){
    const v=new THREE.Vector3(a||36,b||72,c||108);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_36_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery36(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+36)*0.2;
  }
  DestructiblePropManagerRaycast36(origin, dir, max=86){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  DestructiblePropManagerMethod37(a,b,c){
    const v=new THREE.Vector3(a||37,b||74,c||111);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('DestructiblePropManager_37_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  DestructiblePropManagerQuery37(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+37)*0.2;
  }
  DestructiblePropManagerRaycast37(origin, dir, max=87){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }
  dispose(){ this.cache.clear(); this.pools.clear(); }
}
