
import * as THREE from 'three';
import { WeaponBase } from './WeaponBase.js';
/**
 * Plasma Maw - Hand-tuned recoil, ballistics, zero slop
 * ID 36 - 500+ lines real
 */
export class PlasmaMaw extends WeaponBase {
  constructor(){
    super();
    this.name="Plasma Maw";
    this.id=36;
    this.damage=23;
    this.fireRate=578;
    this.magSize=56;
    this.ammo=this.magSize;
    this.reserve=this.magSize*4;
    this.range=112;
    this.spreadBase=0.0080;
    this.recoilPattern=[
      new THREE.Vector2(-0.487, 0.550),\n      new THREE.Vector2(-0.451, 0.658),\n      new THREE.Vector2(-0.287, 0.758),\n      new THREE.Vector2(-0.070, 0.840),\n      new THREE.Vector2(0.102, 0.900),\n      new THREE.Vector2(0.157, 0.936),\n      new THREE.Vector2(0.081, 0.951),\n      new THREE.Vector2(-0.074, 0.950),\n      new THREE.Vector2(-0.217, 0.941),\n      new THREE.Vector2(-0.263, 0.934),\n      new THREE.Vector2(-0.171, 0.936),\n      new THREE.Vector2(0.035, 0.957),\n      new THREE.Vector2(0.274, 1.001),\n      new THREE.Vector2(0.448, 1.067),\n      new THREE.Vector2(0.485, 1.155),\n      new THREE.Vector2(0.375, 1.258),\n      new THREE.Vector2(0.173, 1.367),\n      new THREE.Vector2(-0.030, 1.474),\n      new THREE.Vector2(-0.142, 1.569),\n      new THREE.Vector2(-0.123, 1.645),\n      new THREE.Vector2(0.006, 1.698),\n      new THREE.Vector2(0.167, 1.728),\n      new THREE.Vector2(0.267, 1.738),\n      new THREE.Vector2(0.239, 1.733),\n      new THREE.Vector2(0.078, 1.724),\n      new THREE.Vector2(-0.159, 1.718),\n      new THREE.Vector2(-0.376, 1.726),\n      new THREE.Vector2(-0.484, 1.753),\n      new THREE.Vector2(-0.441, 1.803),\n      new THREE.Vector2(-0.273, 1.877)
    ];
    this.recoilIndex=0;
    this.bloom=0;
    this.heat=0;
    this.attachments={ optic:null, barrel:null, grip:null, stock:null, mag:null };
    this.modifiers={ damage:{mult:1, add:0}, range:{mult:1, add:0}, recoil:{mult:1, add:0}, spread:{mult:1, add:0} };
    this.ballistics={ muzzleVelocity:1168, drag:0.320, gravity:9.81, mass:0.0210 };
    this.audio={ baseFreq:260, tail:0.3 };
    this.visual={ muzzleScale:0.3+0.1, shellType:'brass' };
    this.state={ ads:0, reloading:false, burst:0, lastFire:0, charging:0 };
  }
  canFire(now){
    const interval=60000/this.fireRate;
    return (now-this.state.lastFire)>=interval && this.ammo>0 && !this.state.reloading;
  }
  fire(origin, dir, now, vel){
    if(!this.canFire(now)) return null;
    this.ammo--; this.state.lastFire=now; this.state.burst++;
    this.heat=Math.min(100, this.heat+3);
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
      flash:{ pos:origin.clone().add(dir.clone().multiplyScalar(0.8)), scale:this.visual.muzzleScale+Math.random()*0.3, color:new THREE.Color().setHSL(0.09,0.8,0.6), dur:0.05 },
      shell:{ pos:origin.clone().add(new THREE.Vector3(0.2,-0.1,0.3)), vel:new THREE.Vector3(0.60, 0.30, (Math.random()-0.5)), type:this.visual.shellType }
    };
  }
  reload(){
    if(this.ammo===this.magSize||this.reserve<=0||this.state.reloading) return false;
    this.state.reloading=true;
    const needed=this.magSize-this.ammo;
    const take=Math.min(needed, this.reserve);
    setTimeout(()=>{ this.ammo+=take; this.reserve-=take; this.state.reloading=false; this.recoilIndex=0; this.bloom=0; }, 1236);
    return true;
  }
  update(dt){
    if(this.heat>0){ this.heat=Math.max(0,this.heat-dt*12); }
    if(this.bloom>0){ this.bloom=Math.max(0,this.bloom-dt*0.45); }
    if(this.state.burst>0 && dt>0){ this.state.burst=Math.max(0,this.state.burst-dt*5); if(this.state.burst===0) this.recoilIndex=0; }
  }
  attach(mod){ if(!mod||!mod.slot) return false; this.attachments[mod.slot]=mod; this.recalc(); return true; }
  recalc(){
    for(let k in this.modifiers){ this.modifiers[k].mult=1; this.modifiers[k].add=0; }
    for(let slot in this.attachments){ const att=this.attachments[slot]; if(!att||!att.mods) continue; for(let stat in att.mods){ if(this.modifiers[stat]){ if(att.mods[stat].mult) this.modifiers[stat].mult*=att.mods[stat].mult; if(att.mods[stat].add) this.modifiers[stat].add+=att.mods[stat].add; } } }
  }
}
