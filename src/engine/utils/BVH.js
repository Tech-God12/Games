import * as THREE from 'three';
export class BVHSystem {
  constructor(){ this.root=null; this.tris=[]; this.nodes=[]; this.buildTime=0; }
  build(geom){
    const t0=performance.now();
    const pos=geom.attributes.position; const idx=geom.index; this.tris=[];
    const triCount= idx? idx.count/3 : pos.count/3;
    for(let i=0;i<triCount;i++){
      const a= idx? idx.getX(i*3): i*3;
      const b= idx? idx.getX(i*3+1): i*3+1;
      const c= idx? idx.getX(i*3+2): i*3+2;
      const v0=new THREE.Vector3().fromBufferAttribute(pos,a);
      const v1=new THREE.Vector3().fromBufferAttribute(pos,b);
      const v2=new THREE.Vector3().fromBufferAttribute(pos,c);
      const box=new THREE.Box3().setFromPoints([v0,v1,v2]);
      this.tris.push({v0,v1,v2,box,center:box.getCenter(new THREE.Vector3()), index:i, normal:new THREE.Triangle(v0,v1,v2).getNormal(new THREE.Vector3())});
    }
    this.root=this.buildNode(this.tris,0);
    this.buildTime=performance.now()-t0;
    return this.root;
  }
  buildNode(tris,depth){
    const node={box:new THREE.Box3(), left:null,right:null,tris:null, depth, sah:0};
    for(let t of tris) node.box.union(t.box);
    if(tris.length<=6||depth>22){ node.tris=tris; return node; }
    const ext=node.box.getSize(new THREE.Vector3());
    const axis=ext.x>ext.y&&ext.x>ext.z?0:ext.y>ext.z?1:2;
    tris.sort((a,b)=> a.center.getComponent(axis)-b.center.getComponent(axis));
    const mid=Math.floor(tris.length/2);
    const left=tris.slice(0,mid), right=tris.slice(mid);
    if(left.length===0||right.length===0){ node.tris=tris; return node; }
    // SAH cost
    const leftBox=new THREE.Box3(); for(let t of left) leftBox.union(t.box);
    const rightBox=new THREE.Box3(); for(let t of right) rightBox.union(t.box);
    const leftArea=this.boxArea(leftBox), rightArea=this.boxArea(rightBox);
    const totalArea=this.boxArea(node.box);
    node.sah=1 + (leftArea/totalArea)*left.length + (rightArea/totalArea)*right.length;
    if(node.sah > tris.length){ node.tris=tris; return node; }
    node.left=this.buildNode(left,depth+1);
    node.right=this.buildNode(right,depth+1);
    return node;
  }
  boxArea(box){ const s=box.getSize(new THREE.Vector3()); return 2*(s.x*s.y+s.y*s.z+s.z*s.x); }
  raycast(ray,res=[]){
    if(!this.root) return res;
    const stack=[this.root];
    while(stack.length){
      const node=stack.pop();
      if(!ray.intersectBox(node.box,new THREE.Vector3())) continue;
      if(node.tris){
        for(let tri of node.tris){
          const inter=this.rayTri(ray,tri);
          if(inter) res.push({tri,t:inter.t, point:inter.point, normal:tri.normal});
        }
      } else {
        if(node.right) stack.push(node.right);
        if(node.left) stack.push(node.left);
      }
    }
    res.sort((a,b)=>a.t-b.t);
    return res;
  }
  rayTri(ray,tri){
    const e1=new THREE.Vector3().subVectors(tri.v1,tri.v0);
    const e2=new THREE.Vector3().subVectors(tri.v2,tri.v0);
    const h=new THREE.Vector3().crossVectors(ray.direction,e2);
    const a=e1.dot(h);
    if(Math.abs(a)<1e-7) return null;
    const f=1/a;
    const s=new THREE.Vector3().subVectors(ray.origin,tri.v0);
    const u=f*s.dot(h);
    if(u<0||u>1) return null;
    const q=new THREE.Vector3().crossVectors(s,e1);
    const v=f*ray.direction.dot(q);
    if(v<0||u+v>1) return null;
    const t=f*e2.dot(q);
    if(t>1e-6) return {t, point:new THREE.Vector3().copy(ray.origin).addScaledVector(ray.direction,t)};
    return null;
  }
  sphereQuery(center,radius,res=[]){
    if(!this.root) return res;
    const stack=[this.root];
    while(stack.length){
      const node=stack.pop();
      const closest=node.box.clampPoint(center,new THREE.Vector3());
      if(closest.distanceTo(center)>radius) continue;
      if(node.tris){
        for(let tri of node.tris){ if(tri.center.distanceTo(center)<=radius+2) res.push(tri); }
      } else {
        if(node.right) stack.push(node.right);
        if(node.left) stack.push(node.left);
      }
    }
    return res;
  }
  frustumQuery(frustum,res=[]){
    if(!this.root) return res;
    const stack=[this.root];
    while(stack.length){
      const node=stack.pop();
      if(frustum.intersectsBox && !frustum.intersectsBox(node.box)) continue;
      if(node.tris){ for(let tri of node.tris) res.push(tri); }
      else { if(node.right) stack.push(node.right); if(node.left) stack.push(node.left); }
    }
    return res;
  }
  refit(){
    const recurse=(node)=>{
      if(node.tris){ node.box.makeEmpty(); for(let t of node.tris) node.box.union(t.box); }
      else { const l=recurse(node.left), r=recurse(node.right); node.box.copy(l).union(r); }
      return node.box;
    };
    if(this.root) recurse(this.root);
  }
  count(){ return this.countNodes(this.root); }
  countNodes(node){
    if(!node) return 0;
    if(node.tris) return 1;
    return 1+this.countNodes(node.left)+this.countNodes(node.right);
  }
  closestPoint(point){
    if(!this.root) return null;
    let best=null, bestDist=Infinity;
    const stack=[this.root];
    while(stack.length){
      const node=stack.pop();
      const closest=node.box.clampPoint(point,new THREE.Vector3());
      const dist=closest.distanceTo(point);
      if(dist>=bestDist) continue;
      if(node.tris){
        for(let tri of node.tris){
          const d=tri.center.distanceTo(point);
          if(d<bestDist){ bestDist=d; best=tri; }
        }
      } else {
        if(node.right) stack.push(node.right);
        if(node.left) stack.push(node.left);
      }
    }
    return {tri:best, distance:bestDist};
  }
}
