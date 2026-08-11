
import * as THREE from 'three';
export class AdvancedRenderer {
  constructor(engine){
    this.engine=engine; this.passes=[]; this.composerData={}; this.materialCache=new Map();
    this.lodSystem={ levels:[0,20,50,120,250], bias:1.0 };
    this.culling={ frustum:new THREE.Frustum(), matrix:new THREE.Matrix4(), enabled:true };
    this.shadowAtlas={ size:4096, tiles:[] }; this.initShadowAtlas();
  }
  initShadowAtlas(){ for(let i=0;i<8;i++) this.shadowAtlas.tiles.push({ x:(i%4)*1024, y:Math.floor(i/4)*1024, size:1024, used:false }); }
  createPBRMaterial(config){
    const key=JSON.stringify(config); if(this.materialCache.has(key)) return this.materialCache.get(key);
    const mat=new THREE.MeshStandardMaterial({ color:config.color||0xffffff, roughness:config.roughness??0.5, metalness:config.metalness??0.2 });
    this.materialCache.set(key, mat); return mat;
  }
  updateCulling(camera){
    this.culling.matrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    this.culling.frustum.setFromProjectionMatrix(this.culling.matrix);
  }
  isVisible(object){
    if(!this.culling.enabled) return true;
    if(!object.geometry || !object.geometry.boundingSphere){ object.geometry?.computeBoundingSphere(); }
    if(object.geometry?.boundingSphere){
      const sphere=object.geometry.boundingSphere.clone().applyMatrix4(object.matrixWorld);
      return this.culling.frustum.intersectsSphere(sphere);
    }
    return true;
  }
  addPass(pass){ this.passes.push(pass); }
  render(scene,camera,delta){
    this.updateCulling(camera);
    for(let pass of this.passes) if(pass.enabled) pass.render(scene,camera,delta);
    this.engine.renderer.render(scene,camera);
  }
}
