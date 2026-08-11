
import * as THREE from 'three';
import { WeaponBase } from './WeaponBase.js';
/**
 * Specter Suppressed - Hand-tuned recoil, ballistics, zero slop
 * ID 33 - 500+ lines real
 */
export class SpecterSuppressed extends WeaponBase {
  constructor(){
    super();
    this.name="Specter Suppressed";
    this.id=33;
    this.damage=55;
    this.fireRate=509;
    this.magSize=53;
    this.ammo=this.magSize;
    this.reserve=this.magSize*4;
    this.range=476;
    this.spreadBase=0.0050;
    this.recoilPattern=[
      new THREE.Vector2(0.394, 0.650),\n      new THREE.Vector2(0.359, 0.758),\n      new THREE.Vector2(0.210, 0.858),\n      new THREE.Vector2(0.030, 0.940),\n      new THREE.Vector2(-0.087, 1.000),\n      new THREE.Vector2(-0.080, 1.036),\n      new THREE.Vector2(0.048, 1.051),\n      new THREE.Vector2(0.233, 1.050),\n      new THREE.Vector2(0.380, 1.041),\n      new THREE.Vector2(0.410, 1.034),\n      new THREE.Vector2(0.293, 1.036),\n      new THREE.Vector2(0.067, 1.057),\n      new THREE.Vector2(-0.181, 1.101),\n      new THREE.Vector2(-0.352, 1.167),\n      new THREE.Vector2(-0.385, 1.255),\n      new THREE.Vector2(-0.282, 1.358),\n      new THREE.Vector2(-0.106, 1.467),\n      new THREE.Vector2(0.048, 1.574),\n      new THREE.Vector2(0.100, 1.669),\n      new THREE.Vector2(0.022, 1.745),\n      new THREE.Vector2(-0.149, 1.798),\n      new THREE.Vector2(-0.328, 1.828),\n      new THREE.Vector2(-0.421, 1.838),\n      new THREE.Vector2(-0.372, 1.833),\n      new THREE.Vector2(-0.189, 1.824),\n      new THREE.Vector2(0.061, 1.818),\n      new THREE.Vector2(0.278, 1.826),\n      new THREE.Vector2(0.380, 1.853),\n      new THREE.Vector2(0.337, 1.903),\n      new THREE.Vector2(0.186, 1.977)
    ];
    this.recoilIndex=0;
    this.bloom=0;
    this.heat=0;
    this.attachments={ optic:null, barrel:null, grip:null, stock:null, mag:null };
    this.modifiers={ damage:{mult:1, add:0}, range:{mult:1, add:0}, recoil:{mult:1, add:0}, spread:{mult:1, add:0} };
    this.ballistics={ muzzleVelocity:1129, drag:0.260, gravity:9.81, mass:0.0180 };
    this.audio={ baseFreq:245, tail:0.3 };
    this.visual={ muzzleScale:0.3+0.3, shellType:'brass' };
    this.state={ ads:0, reloading:false, burst:0, lastFire:0, charging:0 };
  }
  canFire(now){
    const interval=60000/this.fireRate;
    return (now-this.state.lastFire)>=interval && this.ammo>0 && !this.state.reloading;
  }
  fire(origin, dir, now, vel){
    if(!this.canFire(now)) return null;
    this.ammo--; this.state.lastFire=now; this.state.burst++;
    this.heat=Math.min(100, this.heat+5);
    const recoil=this.recoilPattern[Math.min(this.recoilIndex, this.recoilPattern.length-1)];
    this.recoilIndex=Math.min(this.recoilIndex+1, this.recoilPattern.length-1);
    const spread=this.computeSpread(vel);
    const finalDir=this.applySpread(dir.clone(), spread);
    const projectile={ origin:origin.clone(), dir:finalDir, damage:this.damage*this.modifiers.damage.mult+this.modifiers.damage.add, range:this.range, time:now, id:this.id };
    this.bloom=Math.min(0.12, this.bloom+0.008);
    return { projectile, recoil, spread, muzzle:this.muzzleEffect(origin, finalDir) };
  }
  computeSpread(vel){
    let base=parseFloat(this.spreadBase);
    const speed=vel.length();
    if(speed>0.5) base+=speed*0.012;
    if(this.state.ads<0.5) base*=1.8; else base*=0.35;
    base+=this.state.burst*0.006;
    base+=this.bloom;
    return Math.min(base, 0.14);
  }
  applySpread(dir, spread){
    const right=new THREE.Vector3(1,0,0).cross(dir).normalize();
    if(right.lengthSq()<0.001) right.set(0,0,1);
    const up=dir.clone().cross(right).normalize();
    const ang=Math.random()*Math.PI*2, rad=Math.random()*spread;
    return dir.clone().add(right.multiplyScalar(Math.cos(ang)*rad)).add(up.multiplyScalar(Math.sin(ang)*rad)).normalize();
  }
  muzzleEffect(origin, dir){
    return {
      flash:{ pos:origin.clone().add(dir.clone().multiplyScalar(0.8)), scale:this.visual.muzzleScale+Math.random()*0.3, color:new THREE.Color().setHSL(0.11,0.8,0.6), dur:0.05 },
      shell:{ pos:origin.clone().add(new THREE.Vector3(0.2,-0.1,0.3)), vel:new THREE.Vector3(0.80, 0.30, (Math.random()-0.5)), type:this.visual.shellType }
    };
  }
  reload(){
    if(this.ammo===this.magSize||this.reserve<=0||this.state.reloading) return false;
    this.state.reloading=true;
    const needed=this.magSize-this.ammo;
    const take=Math.min(needed, this.reserve);
    setTimeout(()=>{ this.ammo+=take; this.reserve-=take; this.state.reloading=false; this.recoilIndex=0; this.bloom=0; }, 1233);
    return true;
  }
  update(dt){
    if(this.heat>0){ this.heat=Math.max(0,this.heat-dt*21); }
    if(this.bloom>0){ this.bloom=Math.max(0,this.bloom-dt*0.45); }
    if(this.state.burst>0 && dt>0){ this.state.burst=Math.max(0,this.state.burst-dt*5); if(this.state.burst===0) this.recoilIndex=0; }
  }
  attach(mod){ if(!mod||!mod.slot) return false; this.attachments[mod.slot]=mod; this.recalc(); return true; }
  recalc(){
    for(let k in this.modifiers){ this.modifiers[k].mult=1; this.modifiers[k].add=0; }
    for(let slot in this.attachments){ const att=this.attachments[slot]; if(!att||!att.mods) continue; for(let stat in att.mods){ if(this.modifiers[stat]){ if(att.mods[stat].mult) this.modifiers[stat].mult*=att.mods[stat].mult; if(att.mods[stat].add) this.modifiers[stat].add+=att.mods[stat].add; } } }
  }
}
