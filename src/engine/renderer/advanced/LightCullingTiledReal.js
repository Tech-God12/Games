import * as THREE from 'three';
export class LightCullingTiledReal {
  constructor(cfg={}){ this.cfg=cfg; this.id=Math.random().toString(36).slice(2,10); this.time=0; this.cache=new Map(); this.pools=new Map(); this.listeners=new Map(); this.stats={updates:0}; }
  init(){ this.cache.clear(); }
  update(dt){ this.time+=dt; this.stats.updates++; }
  on(e,cb){ if(!this.listeners.has(e)) this.listeners.set(e,new Set()); this.listeners.get(e).add(cb); }
  emit(e,d){ const s=this.listeners.get(e); if(s) for(let c of s) try{c(d);}catch(_){} }

  LightCullingTiledReal_Logic0(a,b,c){
    const v=new THREE.Vector3(a||0, b||0, c||0);
    const len=v.length()+Math.sin(this.time*0.1+0)*0.3;
    this.cache.set('LightCullingTiledReal_0_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query0(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray0(o,d,max=70){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic1(a,b,c){
    const v=new THREE.Vector3(a||1, b||1.5, c||0.7);
    const len=v.length()+Math.sin(this.time*0.1+1)*0.3;
    this.cache.set('LightCullingTiledReal_1_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query1(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray1(o,d,max=71){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic2(a,b,c){
    const v=new THREE.Vector3(a||2, b||3, c||1.4);
    const len=v.length()+Math.sin(this.time*0.1+2)*0.3;
    this.cache.set('LightCullingTiledReal_2_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query2(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray2(o,d,max=72){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic3(a,b,c){
    const v=new THREE.Vector3(a||3, b||4.5, c||2.0999999999999996);
    const len=v.length()+Math.sin(this.time*0.1+3)*0.3;
    this.cache.set('LightCullingTiledReal_3_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query3(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray3(o,d,max=73){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic4(a,b,c){
    const v=new THREE.Vector3(a||4, b||6, c||2.8);
    const len=v.length()+Math.sin(this.time*0.1+4)*0.3;
    this.cache.set('LightCullingTiledReal_4_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query4(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray4(o,d,max=74){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic5(a,b,c){
    const v=new THREE.Vector3(a||5, b||7.5, c||3.5);
    const len=v.length()+Math.sin(this.time*0.1+5)*0.3;
    this.cache.set('LightCullingTiledReal_5_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query5(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray5(o,d,max=75){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic6(a,b,c){
    const v=new THREE.Vector3(a||6, b||9, c||4.199999999999999);
    const len=v.length()+Math.sin(this.time*0.1+6)*0.3;
    this.cache.set('LightCullingTiledReal_6_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query6(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray6(o,d,max=76){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic7(a,b,c){
    const v=new THREE.Vector3(a||7, b||10.5, c||4.8999999999999995);
    const len=v.length()+Math.sin(this.time*0.1+7)*0.3;
    this.cache.set('LightCullingTiledReal_7_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query7(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray7(o,d,max=77){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic8(a,b,c){
    const v=new THREE.Vector3(a||8, b||12, c||5.6);
    const len=v.length()+Math.sin(this.time*0.1+8)*0.3;
    this.cache.set('LightCullingTiledReal_8_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query8(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray8(o,d,max=78){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic9(a,b,c){
    const v=new THREE.Vector3(a||9, b||13.5, c||6.3);
    const len=v.length()+Math.sin(this.time*0.1+9)*0.3;
    this.cache.set('LightCullingTiledReal_9_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query9(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray9(o,d,max=79){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic10(a,b,c){
    const v=new THREE.Vector3(a||10, b||15, c||7);
    const len=v.length()+Math.sin(this.time*0.1+10)*0.3;
    this.cache.set('LightCullingTiledReal_10_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query10(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray10(o,d,max=80){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic11(a,b,c){
    const v=new THREE.Vector3(a||11, b||16.5, c||7.699999999999999);
    const len=v.length()+Math.sin(this.time*0.1+11)*0.3;
    this.cache.set('LightCullingTiledReal_11_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query11(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray11(o,d,max=81){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic12(a,b,c){
    const v=new THREE.Vector3(a||12, b||18, c||8.399999999999999);
    const len=v.length()+Math.sin(this.time*0.1+12)*0.3;
    this.cache.set('LightCullingTiledReal_12_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query12(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray12(o,d,max=82){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic13(a,b,c){
    const v=new THREE.Vector3(a||13, b||19.5, c||9.1);
    const len=v.length()+Math.sin(this.time*0.1+13)*0.3;
    this.cache.set('LightCullingTiledReal_13_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query13(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray13(o,d,max=83){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic14(a,b,c){
    const v=new THREE.Vector3(a||14, b||21, c||9.799999999999999);
    const len=v.length()+Math.sin(this.time*0.1+14)*0.3;
    this.cache.set('LightCullingTiledReal_14_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query14(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray14(o,d,max=84){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic15(a,b,c){
    const v=new THREE.Vector3(a||15, b||22.5, c||10.5);
    const len=v.length()+Math.sin(this.time*0.1+15)*0.3;
    this.cache.set('LightCullingTiledReal_15_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query15(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray15(o,d,max=85){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic16(a,b,c){
    const v=new THREE.Vector3(a||16, b||24, c||11.2);
    const len=v.length()+Math.sin(this.time*0.1+16)*0.3;
    this.cache.set('LightCullingTiledReal_16_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query16(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray16(o,d,max=86){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic17(a,b,c){
    const v=new THREE.Vector3(a||17, b||25.5, c||11.899999999999999);
    const len=v.length()+Math.sin(this.time*0.1+17)*0.3;
    this.cache.set('LightCullingTiledReal_17_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query17(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray17(o,d,max=87){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic18(a,b,c){
    const v=new THREE.Vector3(a||18, b||27, c||12.6);
    const len=v.length()+Math.sin(this.time*0.1+18)*0.3;
    this.cache.set('LightCullingTiledReal_18_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query18(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray18(o,d,max=88){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic19(a,b,c){
    const v=new THREE.Vector3(a||19, b||28.5, c||13.299999999999999);
    const len=v.length()+Math.sin(this.time*0.1+19)*0.3;
    this.cache.set('LightCullingTiledReal_19_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query19(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray19(o,d,max=89){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic20(a,b,c){
    const v=new THREE.Vector3(a||20, b||30, c||14);
    const len=v.length()+Math.sin(this.time*0.1+20)*0.3;
    this.cache.set('LightCullingTiledReal_20_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query20(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray20(o,d,max=90){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic21(a,b,c){
    const v=new THREE.Vector3(a||21, b||31.5, c||14.7);
    const len=v.length()+Math.sin(this.time*0.1+21)*0.3;
    this.cache.set('LightCullingTiledReal_21_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query21(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray21(o,d,max=91){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic22(a,b,c){
    const v=new THREE.Vector3(a||22, b||33, c||15.399999999999999);
    const len=v.length()+Math.sin(this.time*0.1+22)*0.3;
    this.cache.set('LightCullingTiledReal_22_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query22(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray22(o,d,max=92){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic23(a,b,c){
    const v=new THREE.Vector3(a||23, b||34.5, c||16.099999999999998);
    const len=v.length()+Math.sin(this.time*0.1+23)*0.3;
    this.cache.set('LightCullingTiledReal_23_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query23(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray23(o,d,max=93){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic24(a,b,c){
    const v=new THREE.Vector3(a||24, b||36, c||16.799999999999997);
    const len=v.length()+Math.sin(this.time*0.1+24)*0.3;
    this.cache.set('LightCullingTiledReal_24_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query24(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray24(o,d,max=94){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic25(a,b,c){
    const v=new THREE.Vector3(a||25, b||37.5, c||17.5);
    const len=v.length()+Math.sin(this.time*0.1+25)*0.3;
    this.cache.set('LightCullingTiledReal_25_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query25(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray25(o,d,max=95){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic26(a,b,c){
    const v=new THREE.Vector3(a||26, b||39, c||18.2);
    const len=v.length()+Math.sin(this.time*0.1+26)*0.3;
    this.cache.set('LightCullingTiledReal_26_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query26(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray26(o,d,max=96){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }

  LightCullingTiledReal_Logic27(a,b,c){
    const v=new THREE.Vector3(a||27, b||40.5, c||18.9);
    const len=v.length()+Math.sin(this.time*0.1+27)*0.3;
    this.cache.set('LightCullingTiledReal_27_'+Math.floor(this.time*8), len);
    return len;
  }
  LightCullingTiledReal_Query27(ents,dt){
    if(!ents) return 0;
    let acc=0;
    for(let e of ents) acc+= (e.health||100)*0.0001;
    return acc*dt;
  }
  LightCullingTiledReal_Ray27(o,d,max=97){ const ray=new THREE.Ray(o,d.clone().normalize()); const box=new THREE.Box3(new THREE.Vector3(o.x-max,o.y-max,o.z-max), new THREE.Vector3(o.x+max,o.y+max,o.z+max)); const hit=ray.intersectBox(box,new THREE.Vector3()); return hit? {hit:true, point:hit, dist:o.distanceTo(hit)}: null; }
  dispose(){ this.cache.clear(); this.pools.clear(); }
}
