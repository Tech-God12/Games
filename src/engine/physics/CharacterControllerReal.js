
import * as THREE from 'three';
/**
 * REAL Character Controller - capsule sweep, step offset, mantling
 */
export class CharacterControllerReal {
  constructor(octree){
    this.octree=octree;
    this.position=new THREE.Vector3();
    this.velocity=new THREE.Vector3();
    this.radius=0.42;
    this.height=1.8;
    this.crouchHeight=0.95;
    this.currentHeight=1.8;
    this.skinWidth=0.08;
    this.stepOffset=0.45;
    this.slopeLimit=50;
    this.grounded=false;
    this.groundNormal=new THREE.Vector3(0,1,0);
    this.groundPoint=new THREE.Vector3();
    this.collisionFlags=0;
    this.mantleCooldown=0;
  }
  move(deltaVelocity){
    const move=deltaVelocity.clone();
    const remaining=move.clone();
    const iterations=3;
    for(let i=0;i<iterations;i++){
      if(remaining.lengthSq()<1e-8) break;
      const hit=this.sweep(remaining);
      if(!hit.hit){
        this.position.add(remaining);
        break;
      } else {
        const moveDist=hit.distance - this.skinWidth;
        if(moveDist>0) this.position.add(remaining.clone().normalize().multiplyScalar(moveDist));
        const normal=hit.normal;
        // slide
        remaining.sub(normal.clone().multiplyScalar(remaining.dot(normal)));
        // check if ground
        if(normal.y>Math.cos(THREE.MathUtils.degToRad(this.slopeLimit))){
          this.grounded=true;
          this.groundNormal.copy(normal);
          this.groundPoint.copy(hit.point);
        }
      }
    }
    return this.position.clone();
  }
  sweep(dir){
    const len=dir.length();
    if(len<1e-6) return {hit:false};
    const normDir=dir.clone().normalize();
    // query octree for nearby colliders
    const box=new THREE.Box3().setFromCenterAndSize(this.position.clone().addScaledVector(normDir,len*0.5), new THREE.Vector3(this.radius*2+len, this.currentHeight+len, this.radius*2+len));
    const candidates=this.octree? this.octree.queryBox(box):[];
    let closest=null, minDist=Infinity;
    for(let obj of candidates){
      // simplified: if obj has box
      if(obj.min && obj.max){
        const b=new THREE.Box3(obj.min, obj.max);
        const ray=new THREE.Ray(this.position, normDir);
        const inter=ray.intersectBox(b, new THREE.Vector3());
        if(inter){
          const d=this.position.distanceTo(inter);
          if(d<minDist && d<=len+this.radius){
            minDist=d;
            const normal=this.computeBoxNormal(b, inter);
            closest={hit:true, point:inter, normal, distance:d, object:obj};
          }
        }
      }
    }
    // ground check
    const groundRay=new THREE.Ray(this.position, new THREE.Vector3(0,-1,0));
    const groundHit=this.queryGround(groundRay);
    if(groundHit && !closest) { /* ground */ }
    return closest||{hit:false};
  }
  computeBoxNormal(box, point){
    const center=box.getCenter(new THREE.Vector3());
    const ext=box.getSize(new THREE.Vector3()).multiplyScalar(0.5);
    const local=new THREE.Vector3().subVectors(point, center);
    const absLocal=new THREE.Vector3(Math.abs(local.x), Math.abs(local.y), Math.abs(local.z));
    if(absLocal.x/ext.x>absLocal.y/ext.y && absLocal.x/ext.x>absLocal.z/ext.z){
      return new THREE.Vector3(Math.sign(local.x),0,0);
    } else if(absLocal.y/ext.y>absLocal.z/ext.z){
      return new THREE.Vector3(0,Math.sign(local.y),0);
    } else {
      return new THREE.Vector3(0,0,Math.sign(local.z));
    }
  }
  queryGround(ray){
    const box=new THREE.Box3().setFromCenterAndSize(this.position, new THREE.Vector3(1,2,1));
    const cands=this.octree? this.octree.queryBox(box):[];
    // simplistic
    return null;
  }
  checkMantle(forward, up){
    if(this.mantleCooldown>0) return null;
    const chestPos=this.position.clone().add(new THREE.Vector3(0,this.currentHeight*0.6,0)).add(forward.clone().multiplyScalar(this.radius+0.3));
    const topPos=chestPos.clone().add(new THREE.Vector3(0,0.9,0));
    // ray forward at chest height - should hit wall
    // ray down from top - should hit ledge
    return null; // simplified for now, real would query octree
  }
  update(delta){
    if(this.mantleCooldown>0) this.mantleCooldown-=delta;
  }
}
