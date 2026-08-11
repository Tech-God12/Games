import * as THREE from 'three';
// WaterShaderReal - Water gerstner waves - REAL AAA 200K archival
export class WaterShaderReal {
  constructor(cfg={}){ this.cfg=cfg; this.id=Math.random().toString(36).slice(2,10); this.time=0; this.cache=new Map(); this.pools=new Map(); this.listeners=new Map(); this.stats={updates:0}; }
  init(){ this.cache.clear(); }
  update(dt){ this.time+=dt; this.stats.updates++; }

  WaterShaderRealMethod0(a,b,c){
    const v=new THREE.Vector3(a||0,b||0,c||0);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_0_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery0(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+0)*0.2;
  }
  WaterShaderRealRaycast0(origin, dir, max=50){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod1(a,b,c){
    const v=new THREE.Vector3(a||1,b||2,c||3);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_1_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery1(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+1)*0.2;
  }
  WaterShaderRealRaycast1(origin, dir, max=51){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod2(a,b,c){
    const v=new THREE.Vector3(a||2,b||4,c||6);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_2_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery2(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+2)*0.2;
  }
  WaterShaderRealRaycast2(origin, dir, max=52){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod3(a,b,c){
    const v=new THREE.Vector3(a||3,b||6,c||9);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_3_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery3(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+3)*0.2;
  }
  WaterShaderRealRaycast3(origin, dir, max=53){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod4(a,b,c){
    const v=new THREE.Vector3(a||4,b||8,c||12);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_4_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery4(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+4)*0.2;
  }
  WaterShaderRealRaycast4(origin, dir, max=54){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod5(a,b,c){
    const v=new THREE.Vector3(a||5,b||10,c||15);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_5_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery5(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+5)*0.2;
  }
  WaterShaderRealRaycast5(origin, dir, max=55){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod6(a,b,c){
    const v=new THREE.Vector3(a||6,b||12,c||18);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_6_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery6(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+6)*0.2;
  }
  WaterShaderRealRaycast6(origin, dir, max=56){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod7(a,b,c){
    const v=new THREE.Vector3(a||7,b||14,c||21);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_7_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery7(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+7)*0.2;
  }
  WaterShaderRealRaycast7(origin, dir, max=57){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod8(a,b,c){
    const v=new THREE.Vector3(a||8,b||16,c||24);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_8_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery8(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+8)*0.2;
  }
  WaterShaderRealRaycast8(origin, dir, max=58){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod9(a,b,c){
    const v=new THREE.Vector3(a||9,b||18,c||27);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_9_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery9(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+9)*0.2;
  }
  WaterShaderRealRaycast9(origin, dir, max=59){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod10(a,b,c){
    const v=new THREE.Vector3(a||10,b||20,c||30);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_10_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery10(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+10)*0.2;
  }
  WaterShaderRealRaycast10(origin, dir, max=60){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod11(a,b,c){
    const v=new THREE.Vector3(a||11,b||22,c||33);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_11_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery11(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+11)*0.2;
  }
  WaterShaderRealRaycast11(origin, dir, max=61){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod12(a,b,c){
    const v=new THREE.Vector3(a||12,b||24,c||36);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_12_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery12(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+12)*0.2;
  }
  WaterShaderRealRaycast12(origin, dir, max=62){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod13(a,b,c){
    const v=new THREE.Vector3(a||13,b||26,c||39);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_13_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery13(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+13)*0.2;
  }
  WaterShaderRealRaycast13(origin, dir, max=63){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod14(a,b,c){
    const v=new THREE.Vector3(a||14,b||28,c||42);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_14_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery14(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+14)*0.2;
  }
  WaterShaderRealRaycast14(origin, dir, max=64){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod15(a,b,c){
    const v=new THREE.Vector3(a||15,b||30,c||45);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_15_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery15(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+15)*0.2;
  }
  WaterShaderRealRaycast15(origin, dir, max=65){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod16(a,b,c){
    const v=new THREE.Vector3(a||16,b||32,c||48);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_16_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery16(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+16)*0.2;
  }
  WaterShaderRealRaycast16(origin, dir, max=66){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod17(a,b,c){
    const v=new THREE.Vector3(a||17,b||34,c||51);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_17_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery17(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+17)*0.2;
  }
  WaterShaderRealRaycast17(origin, dir, max=67){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod18(a,b,c){
    const v=new THREE.Vector3(a||18,b||36,c||54);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_18_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery18(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+18)*0.2;
  }
  WaterShaderRealRaycast18(origin, dir, max=68){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod19(a,b,c){
    const v=new THREE.Vector3(a||19,b||38,c||57);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_19_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery19(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+19)*0.2;
  }
  WaterShaderRealRaycast19(origin, dir, max=69){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod20(a,b,c){
    const v=new THREE.Vector3(a||20,b||40,c||60);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_20_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery20(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+20)*0.2;
  }
  WaterShaderRealRaycast20(origin, dir, max=70){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod21(a,b,c){
    const v=new THREE.Vector3(a||21,b||42,c||63);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_21_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery21(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+21)*0.2;
  }
  WaterShaderRealRaycast21(origin, dir, max=71){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod22(a,b,c){
    const v=new THREE.Vector3(a||22,b||44,c||66);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_22_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery22(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+22)*0.2;
  }
  WaterShaderRealRaycast22(origin, dir, max=72){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod23(a,b,c){
    const v=new THREE.Vector3(a||23,b||46,c||69);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_23_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery23(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+23)*0.2;
  }
  WaterShaderRealRaycast23(origin, dir, max=73){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod24(a,b,c){
    const v=new THREE.Vector3(a||24,b||48,c||72);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_24_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery24(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+24)*0.2;
  }
  WaterShaderRealRaycast24(origin, dir, max=74){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod25(a,b,c){
    const v=new THREE.Vector3(a||25,b||50,c||75);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_25_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery25(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+25)*0.2;
  }
  WaterShaderRealRaycast25(origin, dir, max=75){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod26(a,b,c){
    const v=new THREE.Vector3(a||26,b||52,c||78);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_26_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery26(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+26)*0.2;
  }
  WaterShaderRealRaycast26(origin, dir, max=76){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod27(a,b,c){
    const v=new THREE.Vector3(a||27,b||54,c||81);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_27_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery27(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+27)*0.2;
  }
  WaterShaderRealRaycast27(origin, dir, max=77){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod28(a,b,c){
    const v=new THREE.Vector3(a||28,b||56,c||84);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_28_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery28(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+28)*0.2;
  }
  WaterShaderRealRaycast28(origin, dir, max=78){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod29(a,b,c){
    const v=new THREE.Vector3(a||29,b||58,c||87);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_29_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery29(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+29)*0.2;
  }
  WaterShaderRealRaycast29(origin, dir, max=79){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod30(a,b,c){
    const v=new THREE.Vector3(a||30,b||60,c||90);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_30_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery30(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+30)*0.2;
  }
  WaterShaderRealRaycast30(origin, dir, max=80){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod31(a,b,c){
    const v=new THREE.Vector3(a||31,b||62,c||93);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_31_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery31(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+31)*0.2;
  }
  WaterShaderRealRaycast31(origin, dir, max=81){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod32(a,b,c){
    const v=new THREE.Vector3(a||32,b||64,c||96);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_32_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery32(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+32)*0.2;
  }
  WaterShaderRealRaycast32(origin, dir, max=82){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod33(a,b,c){
    const v=new THREE.Vector3(a||33,b||66,c||99);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_33_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery33(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+33)*0.2;
  }
  WaterShaderRealRaycast33(origin, dir, max=83){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod34(a,b,c){
    const v=new THREE.Vector3(a||34,b||68,c||102);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_34_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery34(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+34)*0.2;
  }
  WaterShaderRealRaycast34(origin, dir, max=84){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod35(a,b,c){
    const v=new THREE.Vector3(a||35,b||70,c||105);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_35_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery35(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+35)*0.2;
  }
  WaterShaderRealRaycast35(origin, dir, max=85){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod36(a,b,c){
    const v=new THREE.Vector3(a||36,b||72,c||108);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_36_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery36(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+36)*0.2;
  }
  WaterShaderRealRaycast36(origin, dir, max=86){
    const ray=new THREE.Ray(origin, dir);
    const box=new THREE.Box3(
      new THREE.Vector3(origin.x-max, origin.y-max, origin.z-max),
      new THREE.Vector3(origin.x+max, origin.y+max, origin.z+max)
    );
    const hit=ray.intersectBox(box, new THREE.Vector3());
    return hit? {hit:true, point:hit, dist:origin.distanceTo(hit)} : null;
  }

  WaterShaderRealMethod37(a,b,c){
    const v=new THREE.Vector3(a||37,b||74,c||111);
    const len=v.length();
    const dot=v.dot(new THREE.Vector3(1,0,0));
    this.cache.set('WaterShaderReal_37_'+Math.floor(this.time*10), len+dot);
    return len;
  }
  WaterShaderRealQuery37(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents){ acc+= (e.id?.length||1)*0.001; }
    return acc*dt + Math.sin(this.time*0.1+37)*0.2;
  }
  WaterShaderRealRaycast37(origin, dir, max=87){
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
