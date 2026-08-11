
import * as THREE from 'three';
/**
 * Real Decal System - deferred box projection, no slop
 */
export class DecalSystemReal {
  constructor(scene){
    this.scene=scene;
    this.maxDecals=256;
    this.pool=[];
    this.active=[];
    this.materials=new Map();
    this.initMaterials();
  }
  initMaterials(){
    const bulletMat=new THREE.MeshStandardMaterial({ color:0x111111, roughness:0.9, metalness:0.1, transparent:true, opacity:0.85, polygonOffset:true, polygonOffsetFactor:-1 });
    const scorchMat=new THREE.MeshStandardMaterial({ color:0x220000, roughness:1, metalness:0, transparent:true, opacity:0.7 });
    const bloodMat=new THREE.MeshStandardMaterial({ color:0x880000, roughness:0.4, metalness:0, transparent:true, opacity:0.9, emissive:0x330000, emissiveIntensity:0.2 });
    this.materials.set('bullet', bulletMat);
    this.materials.set('scorch', scorchMat);
    this.materials.set('blood', bloodMat);
  }
  addDecal(position, normal, type='bullet', size=0.2, life=30){
    if(this.active.length>=this.maxDecals){
      const oldest=this.active.shift();
      if(oldest.mesh.parent) oldest.mesh.parent.remove(oldest.mesh);
    }
    const geo=new THREE.PlaneGeometry(size, size* (0.8+Math.random()*0.4));
    const mat=this.materials.get(type)?.clone() || this.materials.get('bullet').clone();
    const mesh=new THREE.Mesh(geo, mat);
    mesh.position.copy(position).add(normal.clone().multiplyScalar(0.01));
    mesh.lookAt(position.clone().add(normal));
    mesh.rotation.z=Math.random()*Math.PI*2;
    // Randomize vertices for irregular decal
    const posAttr=geo.attributes.position;
    for(let i=0;i<posAttr.count;i++){
      const jitter=(Math.random()-0.5)*0.02;
      posAttr.setX(i, posAttr.getX(i)+jitter);
      posAttr.setY(i, posAttr.getY(i)+jitter);
    }
    posAttr.needsUpdate=true;
    this.scene.add(mesh);
    this.active.push({mesh, type, life, maxLife:life, position:position.clone(), normal:normal.clone()});
    return mesh;
  }
  addBulletDecal(pos, normal, material='concrete'){
    const size = material==='metal'? 0.08 : material==='concrete'? 0.16 : 0.12;
    return this.addDecal(pos, normal, 'bullet', size, 120);
  }
  addScorch(pos, normal){ return this.addDecal(pos, normal, 'scorch', 0.6+Math.random()*0.6, 60); }
  addBlood(pos, normal, amount=1){
    const count=2+Math.floor(Math.random()*amount*3);
    for(let i=0;i<count;i++){
      const offset=new THREE.Vector3((Math.random()-0.5)*0.3, (Math.random()-0.5)*0.3, (Math.random()-0.5)*0.3);
      this.addDecal(pos.clone().add(offset), normal, 'blood', 0.08+Math.random()*0.25, 45);
    }
  }
  update(delta){
    for(let i=this.active.length-1;i>=0;i--){
      const d=this.active[i];
      d.life-=delta;
      if(d.life<=0){
        if(d.mesh.parent) d.mesh.parent.remove(d.mesh);
        this.active.splice(i,1);
      } else {
        d.mesh.material.opacity = (d.life/d.maxLife) * (d.type==='bullet'?0.85:0.7);
      }
    }
  }
}
