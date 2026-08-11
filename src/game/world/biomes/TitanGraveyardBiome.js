
import * as THREE from 'three';
export class TitanGraveyardBiome {
  constructor(seed=9505){
    this.name='TitanGraveyard'; this.seed=seed; this.temperature=32.1; this.humidity=0.80; this.radiation=0.91;
    this.structures=[]; this.lootMultiplier=0.83; this.enemyDensity=0.25;
    this.colors={ primary:new THREE.Color().setHSL(0.029,0.8,0.5), secondary:new THREE.Color().setHSL(0.548,0.6,0.3), fog:new THREE.Color().setHSL(0.780,0.4,0.2) };
    this.generate();
  }
  generate(){
    const count=48;
    for(let i=0;i<count;i++){
      this.structures.push({
        type:['building','tower','bridge','platform','ruin'][Math.floor(Math.random()*5)],
        position:new THREE.Vector3((Math.random()-0.5)*500, Math.random()*50, (Math.random()-0.5)*500),
        rotation:Math.random()*Math.PI*2,
        scale:0.5+Math.random()*2.5,
        lootTier:Math.floor(Math.random()*4),
        hasEnemies:Math.random()<this.enemyDensity
      });
    }
  }
  getFogDensity(){ return 0.00516; }
  getAmbientLight(){ return { color:this.colors.secondary.clone(), intensity:0.64 }; }
  getLootAt(pos){ return { tier:Math.floor(Math.random()*4), multiplier:this.lootMultiplier }; }
  update(delta, time){
    // Biome-specific environmental updates
    this.windVector=new THREE.Vector3(Math.sin(time*0.1)*2, Math.cos(time*0.07)*0.5, Math.cos(time*0.1)*2);
    this.particleDensity = Math.sin(time*0.05 + this.seed)*0.5+0.5;
  }
  generateMeshes(scene){
    const group=new THREE.Group();
    for(let s of this.structures){
      const geo=new THREE.BoxGeometry(10*s.scale, 5+Math.random()*20, 10*s.scale);
      const mat=new THREE.MeshStandardMaterial({ color:this.colors.primary, roughness:0.8, metalness:0.2 });
      const mesh=new THREE.Mesh(geo, mat);
      mesh.position.copy(s.position); mesh.rotation.y=s.rotation; mesh.receiveShadow=true; mesh.castShadow=true;
      group.add(mesh);
    }
    // Ground plane with biome texture
    const groundGeo=new THREE.PlaneGeometry(2000,2000, 64,64);
    const pos=groundGeo.attributes.position;
    for(let i=0;i<pos.count;i++){
      const x=pos.getX(i), y=pos.getY(i);
      pos.setZ(i, Math.sin(x*0.01)*2 + Math.cos(y*0.01)*2 + (Math.random()-0.5)*0.5);
    }
    pos.needsUpdate=true; groundGeo.computeVertexNormals();
    const groundMat=new THREE.MeshStandardMaterial({ color:this.colors.secondary, roughness:0.9 });
    const ground=new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x=-Math.PI/2; ground.receiveShadow=true; group.add(ground);
    scene.add(group);
    return group;
  }
}
