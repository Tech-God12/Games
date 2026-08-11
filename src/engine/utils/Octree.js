import * as THREE from 'three';
export class OctreeSystem {
  constructor(bounds=new THREE.Box3(new THREE.Vector3(-800,-100,-800), new THREE.Vector3(800,300,800)), maxObjects=16, maxDepth=8){
    this.bounds=bounds.clone(); this.maxObjects=maxObjects; this.maxDepth=maxDepth; this.root=new OctreeNodeImpl(bounds,0,maxObjects,maxDepth);
    this.stats={ inserts:0, queries:0, nodes:0 };
  }
  insert(obj){
    if(!obj.position) return;
    this.root.insert(obj);
    this.stats.inserts++;
  }
  remove(obj){ return this.root.remove(obj); }
  queryBox(box,res=[]){ this.stats.queries++; this.root.queryBox(box,res); return res; }
  querySphere(center,radius,res=[]){ this.stats.queries++; this.root.querySphere(center,radius,res); return res; }
  queryFrustum(frustum,res=[]){ this.stats.queries++; this.root.queryFrustum(frustum,res); return res; }
  queryRay(ray,res=[]){ this.stats.queries++; this.root.queryRay(ray,res); return res; }
  queryCapsule(start,end,radius,res=[]){
    const box=new THREE.Box3().setFromPoints([start,end]).expandByScalar(radius);
    const candidates=[]; this.queryBox(box,candidates);
    for(let c of candidates){
      const closest=this.closestPointOnSegment(c.position,start,end);
      if(closest.distanceTo(c.position)<=radius) res.push(c);
    }
    return res;
  }
  closestPointOnSegment(p,a,b){
    const ab=new THREE.Vector3().subVectors(b,a);
    const t=new THREE.Vector3().subVectors(p,a).dot(ab)/ab.dot(ab);
    const ct=Math.max(0,Math.min(1,t));
    return new THREE.Vector3().copy(a).addScaledVector(ab,ct);
  }
  clear(){ this.root.clear(); }
  getAll(res=[]){ this.root.getAll(res); return res; }
  countNodes(){ return this.root.countNodes(); }
  countObjects(){ return this.root.countObjects(); }
  rebalance(){ const all=[]; this.getAll(all); this.clear(); for(let o of all) this.insert(o); }
  visualize(scene){
    const helpers=[]; this.root.visualize(scene,helpers); return helpers;
  }
  findNearest(point, maxRadius=50){
    let radius=2; let result=[];
    while(radius<=maxRadius){
      result=this.querySphere(point,radius);
      if(result.length>0){ result.sort((a,b)=> a.position.distanceTo(point)-b.position.distanceTo(point)); return result[0]; }
      radius*=2;
    }
    return null;
  }
}
class OctreeNodeImpl {
  constructor(bounds,depth,maxObjects,maxDepth){
    this.bounds=bounds.clone(); this.depth=depth; this.maxObjects=maxObjects; this.maxDepth=maxDepth; this.objects=[]; this.children=null;
  }
  insert(obj){
    if(this.children){
      const idx=this.getChildIndex(obj.position);
      if(idx!==-1){ this.children[idx].insert(obj); return; }
    }
    this.objects.push(obj);
    if(this.objects.length>this.maxObjects && this.depth<this.maxDepth){
      if(!this.children) this.subdivide();
      let i=0;
      while(i<this.objects.length){
        const o=this.objects[i];
        const idx=this.getChildIndex(o.position);
        if(idx!==-1){ this.objects.splice(i,1); this.children[idx].insert(o); }
        else i++;
      }
    }
  }
  getChildIndex(p){
    if(!this.bounds.containsPoint(p)) return -1;
    const mid=this.bounds.getCenter(new THREE.Vector3());
    let idx=0;
    if(p.x>=mid.x) idx|=1;
    if(p.y>=mid.y) idx|=2;
    if(p.z>=mid.z) idx|=4;
    return idx;
  }
  subdivide(){
    this.children=[];
    const min=this.bounds.min, max=this.bounds.max, mid=this.bounds.getCenter(new THREE.Vector3());
    const boxes=[
      new THREE.Box3(new THREE.Vector3(min.x,min.y,min.z), new THREE.Vector3(mid.x,mid.y,mid.z)),
      new THREE.Box3(new THREE.Vector3(mid.x,min.y,min.z), new THREE.Vector3(max.x,mid.y,mid.z)),
      new THREE.Box3(new THREE.Vector3(min.x,mid.y,min.z), new THREE.Vector3(mid.x,max.y,mid.z)),
      new THREE.Box3(new THREE.Vector3(mid.x,mid.y,min.z), new THREE.Vector3(max.x,max.y,mid.z)),
      new THREE.Box3(new THREE.Vector3(min.x,min.y,mid.z), new THREE.Vector3(mid.x,mid.y,max.z)),
      new THREE.Box3(new THREE.Vector3(mid.x,min.y,mid.z), new THREE.Vector3(max.x,mid.y,max.z)),
      new THREE.Box3(new THREE.Vector3(min.x,mid.y,mid.z), new THREE.Vector3(mid.x,max.y,max.z)),
      new THREE.Box3(new THREE.Vector3(mid.x,mid.y,mid.z), new THREE.Vector3(max.x,max.y,max.z)),
    ];
    for(let b of boxes) this.children.push(new OctreeNodeImpl(b,this.depth+1,this.maxObjects,this.maxDepth));
  }
  remove(obj){
    const idx=this.objects.indexOf(obj);
    if(idx!==-1){ this.objects.splice(idx,1); return true; }
    if(this.children){ for(let c of this.children) if(c.remove(obj)) return true; }
    return false;
  }
  queryBox(box,res){
    if(!this.bounds.intersectsBox(box)) return;
    for(let o of this.objects) if(box.containsPoint(o.position)) res.push(o);
    if(this.children) for(let c of this.children) c.queryBox(box,res);
  }
  querySphere(center,radius,res){
    const closest=this.bounds.clampPoint(center,new THREE.Vector3());
    if(closest.distanceTo(center)>radius) return;
    for(let o of this.objects) if(o.position.distanceTo(center)<=radius) res.push(o);
    if(this.children) for(let c of this.children) c.querySphere(center,radius,res);
  }
  queryFrustum(frustum,res){
    if(frustum.intersectsBox && !frustum.intersectsBox(this.bounds)) return;
    for(let o of this.objects) res.push(o);
    if(this.children) for(let c of this.children) c.queryFrustum(frustum,res);
  }
  queryRay(ray,res){
    if(!ray.intersectBox(this.bounds,new THREE.Vector3())) return;
    for(let o of this.objects){
      const toObj=new THREE.Vector3().subVectors(o.position,ray.origin);
      const proj=toObj.dot(ray.direction);
      if(proj<0) continue;
      const closest=new THREE.Vector3().copy(ray.origin).addScaledVector(ray.direction,proj);
      if(closest.distanceTo(o.position)<2.5) res.push(o);
    }
    if(this.children) for(let c of this.children) c.queryRay(ray,res);
  }
  getAll(res){ for(let o of this.objects) res.push(o); if(this.children) for(let c of this.children) c.getAll(res); }
  clear(){ this.objects=[]; if(this.children){ for(let c of this.children) c.clear(); this.children=null; } }
  countNodes(){ let cnt=1; if(this.children) for(let c of this.children) cnt+=c.countNodes(); return cnt; }
  countObjects(){ let cnt=this.objects.length; if(this.children) for(let c of this.children) cnt+=c.countObjects(); return cnt; }
  visualize(scene,helpers){
    const helper=new THREE.Box3Helper(this.bounds, this.depth===0?0xff0000:0x444444);
    scene.add(helper); helpers.push(helper);
    if(this.children) for(let c of this.children) c.visualize(scene,helpers);
  }
}
