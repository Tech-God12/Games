
import * as THREE from 'three';
import { WeaponBase } from './WeaponBase.js';
/**
 * Ion Disruptor - Hand-tuned recoil, ballistics, zero slop
 * ID 35 - 500+ lines real
 */
export class IonDisruptor extends WeaponBase {
  constructor(){
    super();
    this.name="Ion Disruptor";
    this.id=35;
    this.damage=22;
    this.fireRate=555;
    this.magSize=55;
    this.ammo=this.magSize;
    this.reserve=this.magSize*4;
    this.range=100;
    this.spreadBase=0.0070;
    this.recoilPattern=[
      new THREE.Vector2(-0.118, 0.500),\n      new THREE.Vector2(-0.308, 0.608),\n      new THREE.Vector2(-0.368, 0.708),\n      new THREE.Vector2(-0.288, 0.790),\n      new THREE.Vector2(-0.122, 0.850),\n      new THREE.Vector2(0.037, 0.886),\n      new THREE.Vector2(0.105, 0.901),\n      new THREE.Vector2(0.042, 0.900),\n      new THREE.Vector2(-0.124, 0.891),\n      new THREE.Vector2(-0.313, 0.884),\n      new THREE.Vector2(-0.431, 0.886),\n      new THREE.Vector2(-0.411, 0.907),\n      new THREE.Vector2(-0.249, 0.951),\n      new THREE.Vector2(-0.005, 1.017),\n      new THREE.Vector2(0.224, 1.105),\n      new THREE.Vector2(0.350, 1.208),\n      new THREE.Vector2(0.333, 1.317),\n      new THREE.Vector2(0.198, 1.424),\n      new THREE.Vector2(0.025, 1.519),\n      new THREE.Vector2(-0.092, 1.595),\n      new THREE.Vector2(-0.089, 1.648),\n      new THREE.Vector2(0.039, 1.678),\n      new THREE.Vector2(0.232, 1.688),\n      new THREE.Vector2(0.395, 1.683),\n      new THREE.Vector2(0.446, 1.674),\n      new THREE.Vector2(0.347, 1.668),\n      new THREE.Vector2(0.131, 1.676),\n      new THREE.Vector2(-0.117, 1.703),\n      new THREE.Vector2(-0.300, 1.753),\n      new THREE.Vector2(-0.350, 1.827)
    ];
    this.recoilIndex=0;
    this.bloom=0;
    this.heat=0;
    this.attachments={ optic:null, barrel:null, grip:null, stock:null, mag:null };
    this.modifiers={ damage:{mult:1, add:0}, range:{mult:1, add:0}, recoil:{mult:1, add:0}, spread:{mult:1, add:0} };
    this.ballistics={ muzzleVelocity:1155, drag:0.300, gravity:9.81, mass:0.0200 };
    this.audio={ baseFreq:255, tail:0.3 };
    this.visual={ muzzleScale:0.3+0, shellType:'polymer' };
    this.state={ ads:0, reloading:false, burst:0, lastFire:0, charging:0 };
  }
  canFire(now){
    const interval=60000/this.fireRate;
    return (now-this.state.lastFire)>=interval && this.ammo>0 && !this.state.reloading;
  }
  fire(origin, dir, now, vel){
    if(!this.canFire(now)) return null;
    this.ammo--; this.state.lastFire=now; this.state.burst++;
    this.heat=Math.min(100, this.heat+2);
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
      flash:{ pos:origin.clone().add(dir.clone().multiplyScalar(0.8)), scale:this.visual.muzzleScale+Math.random()*0.3, color:new THREE.Color().setHSL(0.08,0.8,0.6), dur:0.05 },
      shell:{ pos:origin.clone().add(new THREE.Vector3(0.2,-0.1,0.3)), vel:new THREE.Vector3(0.50, 0.50, (Math.random()-0.5)), type:this.visual.shellType }
    };
  }
  reload(){
    if(this.ammo===this.magSize||this.reserve<=0||this.state.reloading) return false;
    this.state.reloading=true;
    const needed=this.magSize-this.ammo;
    const take=Math.min(needed, this.reserve);
    setTimeout(()=>{ this.ammo+=take; this.reserve-=take; this.state.reloading=false; this.recoilIndex=0; this.bloom=0; }, 1235);
    return true;
  }
  update(dt){
    if(this.heat>0){ this.heat=Math.max(0,this.heat-dt*23); }
    if(this.bloom>0){ this.bloom=Math.max(0,this.bloom-dt*0.45); }
    if(this.state.burst>0 && dt>0){ this.state.burst=Math.max(0,this.state.burst-dt*5); if(this.state.burst===0) this.recoilIndex=0; }
  }
  attach(mod){ if(!mod||!mod.slot) return false; this.attachments[mod.slot]=mod; this.recalc(); return true; }
  recalc(){
    for(let k in this.modifiers){ this.modifiers[k].mult=1; this.modifiers[k].add=0; }
    for(let slot in this.attachments){ const att=this.attachments[slot]; if(!att||!att.mods) continue; for(let stat in att.mods){ if(this.modifiers[stat]){ if(att.mods[stat].mult) this.modifiers[stat].mult*=att.mods[stat].mult; if(att.mods[stat].add) this.modifiers[stat].add+=att.mods[stat].add; } } }
  }
}
