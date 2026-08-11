
import * as THREE from 'three';
export class PhysicsWorld {
  constructor(){ this.bodies=[]; this.staticBodies=[]; this.constraints=[]; this.gravity=new THREE.Vector3(0,-9.81,0); this.broadphase={ grid:new Map(), cellSize:5 }; this.collisionPairs=[]; this.solverIterations=10; this.time=0; }
  addBody(body){ if(body.isStatic) this.staticBodies.push(body); else this.bodies.push(body); }
  removeBody(body){ this.bodies=this.bodies.filter(b=>b!==body); this.staticBodies=this.staticBodies.filter(b=>b!==body); }
  updateBroadphase(){ this.broadphase.grid.clear(); for(let body of [...this.bodies, ...this.staticBodies]){ const key=this.getCellKey(body.position); if(!this.broadphase.grid.has(key)) this.broadphase.grid.set(key,[]); this.broadphase.grid.get(key).push(body);} }
  getCellKey(pos){ const s=this.broadphase.cellSize; return `${Math.floor(pos.x/s)}_${Math.floor(pos.y/s)}_${Math.floor(pos.z/s)}`; }
  getNearbyBodies(body){ const result=[]; const s=this.broadphase.cellSize; const base=body.position; for(let x=-1;x<=1;x++) for(let y=-1;y<=1;y++) for(let z=-1;z<=1;z++){ const k=`${Math.floor((base.x+x*s)/s)}_${Math.floor((base.y+y*s)/s)}_${Math.floor((base.z+z*s)/s)}`; if(this.broadphase.grid.has(k)) result.push(...this.broadphase.grid.get(k)); } return [...new Set(result)]; }
  step(delta){
    this.time+=delta;
    for(let body of this.bodies){ if(!body.sleeping){ body.velocity.add(this.gravity.clone().multiplyScalar(delta*body.gravityScale)); body.velocity.multiplyScalar(1-body.linearDamping*delta); body.angularVelocity.multiplyScalar(1-body.angularDamping*delta); body.position.add(body.velocity.clone().multiplyScalar(delta)); const angDelta=body.angularVelocity.clone().multiplyScalar(delta); const q=new THREE.Quaternion().setFromAxisAngle(angDelta.normalize(), angDelta.length()); if(angDelta.length()>0.001) body.quaternion.multiply(q).normalize(); body.updateMatrixWorld(); } }
    this.updateBroadphase();
    this.collisionPairs=[];
    for(let body of this.bodies){ const nearby=this.getNearbyBodies(body); for(let other of nearby){ if(other===body) continue; if(this.checkCollision(body, other)){ this.collisionPairs.push([body, other]); this.resolveCollision(body, other); } } }
    for(let c of this.constraints) c.solve(delta);
    for(let i=0;i<this.solverIterations;i++){ for(let [a,b] of this.collisionPairs) this.resolveCollision(a,b); }
  }
  checkCollision(a,b){ const dist=a.position.distanceTo(b.position); return dist < (a.bounds.radius+b.bounds.radius); }
  resolveCollision(a,b){
    const normal=b.position.clone().sub(a.position).normalize();
    const relVel=b.velocity.clone().sub(a.velocity);
    const velAlongNormal=relVel.dot(normal);
    if(velAlongNormal>0) return;
    const restitution=Math.min(a.restitution,b.restitution);
    let j=-(1+restitution)*velAlongNormal; const invMass=(a.invMass||1)+(b.invMass||1); j/=invMass;
    const impulse=normal.clone().multiplyScalar(j);
    if(!a.isStatic) a.velocity.sub(impulse.clone().multiplyScalar(a.invMass)); if(!b.isStatic) b.velocity.add(impulse.clone().multiplyScalar(b.invMass));
    const penetration=(a.bounds.radius+b.bounds.radius)-a.position.distanceTo(b.position);
    if(penetration>0){ const percent=0.4; const correction=normal.clone().multiplyScalar(penetration/(invMass)*percent); if(!a.isStatic) a.position.sub(correction.clone().multiplyScalar(a.invMass)); if(!b.isStatic) b.position.add(correction.clone().multiplyScalar(b.invMass)); }
    if(a.onCollision) a.onCollision(b); if(b.onCollision) b.onCollision(a);
  }
}
