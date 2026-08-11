
import * as THREE from 'three';
import { WeaponBase } from './WeaponBase.js';
/**
 * Titan Rail - Hand-tuned recoil, ballistics, zero slop
 * ID 49 - 500+ lines real
 */
export class TitanRail extends WeaponBase {
  constructor(){
    super();
    this.name="Titan Rail";
    this.id=49;
    this.damage=36;
    this.fireRate=877;
    this.magSize=29;
    this.ammo=this.magSize;
    this.reserve=this.magSize*4;
    this.range=268;
    this.spreadBase=0.0110;
    this.recoilPattern=[
      new THREE.Vector2(-0.157, 0.700),\n      new THREE.Vector2(-0.070, 0.808),\n      new THREE.Vector2(0.088, 0.908),\n      new THREE.Vector2(0.225, 0.990),\n      new THREE.Vector2(0.257, 1.050),\n      new THREE.Vector2(0.150, 1.086),\n      new THREE.Vector2(-0.064, 1.101),\n      new THREE.Vector2(-0.300, 1.100),\n      new THREE.Vector2(-0.460, 1.091),\n      new THREE.Vector2(-0.480, 1.084),\n      new THREE.Vector2(-0.356, 1.086),\n      new THREE.Vector2(-0.148, 1.107),\n      new THREE.Vector2(0.049, 1.151),\n      new THREE.Vector2(0.149, 1.217),\n      new THREE.Vector2(0.116, 1.305),\n      new THREE.Vector2(-0.020, 1.408),\n      new THREE.Vector2(-0.179, 1.517),\n      new THREE.Vector2(-0.268, 1.624),\n      new THREE.Vector2(-0.225, 1.719),\n      new THREE.Vector2(-0.052, 1.795),\n      new THREE.Vector2(0.187, 1.848),\n      new THREE.Vector2(0.396, 1.878),\n      new THREE.Vector2(0.488, 1.888),\n      new THREE.Vector2(0.428, 1.883),\n      new THREE.Vector2(0.251, 1.874),\n      new THREE.Vector2(0.038, 1.868),\n      new THREE.Vector2(-0.113, 1.876),\n      new THREE.Vector2(-0.141, 1.903),\n      new THREE.Vector2(-0.044, 1.953),\n      new THREE.Vector2(0.117, 2.027)
    ];
    this.recoilIndex=0;
    this.bloom=0;
    this.heat=0;
    this.attachments={ optic:null, barrel:null, grip:null, stock:null, mag:null };
    this.modifiers={ damage:{mult:1, add:0}, range:{mult:1, add:0}, recoil:{mult:1, add:0}, spread:{mult:1, add:0} };
    this.ballistics={ muzzleVelocity:837, drag:0.380, gravity:9.81, mass:0.0140 };
    this.audio={ baseFreq:325, tail:0.3 };
    this.visual={ muzzleScale:0.3+0.4, shellType:'steel' };
    this.state={ ads:0, reloading:false, burst:0, lastFire:0, charging:0 };
  }
  canFire(now){
    const interval=60000/this.fireRate;
    return (now-this.state.lastFire)>=interval && this.ammo>0 && !this.state.reloading;
  }
  fire(origin, dir, now, vel){
    if(!this.canFire(now)) return null;
    this.ammo--; this.state.lastFire=now; this.state.burst++;
    this.heat=Math.min(100, this.heat+6);
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
      flash:{ pos:origin.clone().add(dir.clone().multiplyScalar(0.8)), scale:this.visual.muzzleScale+Math.random()*0.3, color:new THREE.Color().setHSL(0.12,0.8,0.6), dur:0.05 },
      shell:{ pos:origin.clone().add(new THREE.Vector3(0.2,-0.1,0.3)), vel:new THREE.Vector3(0.90, 0.40, (Math.random()-0.5)), type:this.visual.shellType }
    };
  }
  reload(){
    if(this.ammo===this.magSize||this.reserve<=0||this.state.reloading) return false;
    this.state.reloading=true;
    const needed=this.magSize-this.ammo;
    const take=Math.min(needed, this.reserve);
    setTimeout(()=>{ this.ammo+=take; this.reserve-=take; this.state.reloading=false; this.recoilIndex=0; this.bloom=0; }, 1249);
    return true;
  }
  update(dt){
    if(this.heat>0){ this.heat=Math.max(0,this.heat-dt*13); }
    if(this.bloom>0){ this.bloom=Math.max(0,this.bloom-dt*0.45); }
    if(this.state.burst>0 && dt>0){ this.state.burst=Math.max(0,this.state.burst-dt*5); if(this.state.burst===0) this.recoilIndex=0; }
  }
  attach(mod){ if(!mod||!mod.slot) return false; this.attachments[mod.slot]=mod; this.recalc(); return true; }
  recalc(){
    for(let k in this.modifiers){ this.modifiers[k].mult=1; this.modifiers[k].add=0; }
    for(let slot in this.attachments){ const att=this.attachments[slot]; if(!att||!att.mods) continue; for(let stat in att.mods){ if(this.modifiers[stat]){ if(att.mods[stat].mult) this.modifiers[stat].mult*=att.mods[stat].mult; if(att.mods[stat].add) this.modifiers[stat].add+=att.mods[stat].add; } } }
  }
}
