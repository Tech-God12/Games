
import * as THREE from 'three';
/**
 * PBR Material Library - 32 physically based materials, no slop
 */
export class PBRMaterialLibrary {
  constructor(){
    this.materials=new Map();
    this.textures=new Map();
    this.init();
  }
  init(){
    this.createRustIron();
    this.createNeonEmissive();
    this.createAetherCrystal();
    this.createWetAsphalt();
    this.createHoloMetal();
    this.createCarbonFiber();
    this.createScratchedAluminium();
    this.createNeonSign();
    this.createConcrete();
    this.createGlass();
    this.createEmissiveCircuit();
    this.createLavaCrack();
    this.createIce();
    this.createWood();
    this.createFabric();
    this.createRubber();
    this.createPlastic();
    this.createBrass();
    this.createCopperPatina();
    this.createGold();
    this.createChrome();
    this.createMatteBlack();
    this.createAnisotropicSteel();
    this.createClearCoatCar();
    this.createTransmissionGlass();
    this.createIridescent();
    this.createSheenFabric();
    this.createSubsurfaceSkin();
    this.createSubsurfaceJade();
    this.createHologram();
    this.createForceField();
    this.createEnergyCore();
  }
  createRustIron(){
    const mat=new THREE.MeshStandardMaterial({
      color:0x8a4a2a,
      roughness:0.85,
      metalness:0.2,
      bumpScale:0.05
    });
    mat.name='RustIron';
    mat.userData={ type:'rust', rustAmount:0.7, roughnessVariation:0.3 };
    mat.onBeforeCompile=(shader)=>{
      shader.uniforms.time={value:0};
      shader.uniforms.rustAmount={value:0.7};
      shader.fragmentShader=shader.fragmentShader.replace('#include <roughnessmap_fragment>', `
        float rustMask = fract(sin(dot(vUv * 12.3, vec2(12.9898,78.233)))*43758.5);
        rustMask = smoothstep(0.3,0.8,rustMask);
        roughnessFactor = mix(roughnessFactor, 0.95, rustMask*rustAmount);
        #include <roughnessmap_fragment>
      `);
    };
    this.materials.set('rustIron', mat);
  }
  createNeonEmissive(){
    const mat=new THREE.MeshStandardMaterial({
      color:0x111122,
      emissive:0x5a7cff,
      emissiveIntensity:2.5,
      roughness:0.4,
      metalness:0.1
    });
    mat.name='NeonEmissive';
    mat.userData={ emissiveScroll:0.5, flickerSpeed:3.2 };
    this.materials.set('neonEmissive', mat);
  }
  createAetherCrystal(){
    const mat=new THREE.MeshPhysicalMaterial({
      color:0x7af2ff,
      transmission:1.0,
      thickness:1.2,
      ior:1.6,
      roughness:0.08,
      metalness:0,
      emissive:0x33aaff,
      emissiveIntensity:0.6,
      clearcoat:1,
      clearcoatRoughness:0.1
    });
    mat.name='AetherCrystal';
    this.materials.set('aetherCrystal', mat);
  }
  createWetAsphalt(){
    const mat=new THREE.MeshStandardMaterial({ color:0x222233, roughness:0.15, metalness:0.1 });
    mat.name='WetAsphalt';
    this.materials.set('wetAsphalt', mat);
  }
  createHoloMetal(){
    const mat=new THREE.MeshStandardMaterial({ color:0x9aaaff, roughness:0.2, metalness:0.9 });
    mat.name='HoloMetal';
    this.materials.set('holoMetal', mat);
  }
  createCarbonFiber(){
    const mat=new THREE.MeshStandardMaterial({ color:0x1a1a1a, roughness:0.6, metalness:0.3 });
    this.materials.set('carbonFiber', mat);
  }
  createScratchedAluminium(){
    const mat=new THREE.MeshStandardMaterial({ color:0xbbbbcc, roughness:0.45, metalness:0.85 });
    this.materials.set('scratchedAlu', mat);
  }
  createNeonSign(){ const mat=new THREE.MeshStandardMaterial({ color:0x000000, emissive:0xff3366, emissiveIntensity:3, roughness:0.7 }); this.materials.set('neonSign', mat); }
  createConcrete(){ const mat=new THREE.MeshStandardMaterial({ color:0x888888, roughness:0.92, metalness:0.02 }); this.materials.set('concrete', mat); }
  createGlass(){ const mat=new THREE.MeshPhysicalMaterial({ color:0xffffff, transmission:0.95, thickness:0.1, roughness:0.05, ior:1.4 }); this.materials.set('glass', mat); }
  createEmissiveCircuit(){ const mat=new THREE.MeshStandardMaterial({ color:0x0a0f1e, emissive:0x00ff88, emissiveIntensity:1.8, roughness:0.5 }); this.materials.set('emissiveCircuit', mat); }
  createLavaCrack(){ const mat=new THREE.MeshStandardMaterial({ color:0x220000, emissive:0xff4400, emissiveIntensity:2.2, roughness:0.8 }); this.materials.set('lavaCrack', mat); }
  createIce(){ const mat=new THREE.MeshPhysicalMaterial({ color:0xaaddff, transmission:0.8, ior:1.31, roughness:0.12, thickness:0.8 }); this.materials.set('ice', mat); }
  createWood(){ const mat=new THREE.MeshStandardMaterial({ color:0x8a5a2a, roughness:0.75, metalness:0 }); this.materials.set('wood', mat); }
  createFabric(){ const mat=new THREE.MeshStandardMaterial({ color:0x667799, roughness:0.95, metalness:0 }); this.materials.set('fabric', mat); }
  createRubber(){ const mat=new THREE.MeshStandardMaterial({ color:0x111111, roughness:0.9, metalness:0 }); this.materials.set('rubber', mat); }
  createPlastic(){ const mat=new THREE.MeshStandardMaterial({ color:0xeeeeee, roughness:0.35, metalness:0 }); this.materials.set('plastic', mat); }
  createBrass(){ const mat=new THREE.MeshStandardMaterial({ color:0xb5a642, roughness:0.3, metalness:0.85 }); this.materials.set('brass', mat); }
  createCopperPatina(){ const mat=new THREE.MeshStandardMaterial({ color:0x6da39a, roughness:0.6, metalness:0.4 }); this.materials.set('copperPatina', mat); }
  createGold(){ const mat=new THREE.MeshStandardMaterial({ color:0xffd700, roughness:0.25, metalness:1 }); this.materials.set('gold', mat); }
  createChrome(){ const mat=new THREE.MeshStandardMaterial({ color:0xcccccc, roughness:0.05, metalness:1 }); this.materials.set('chrome', mat); }
  createMatteBlack(){ const mat=new THREE.MeshStandardMaterial({ color:0x0a0a0a, roughness:0.85, metalness:0.1 }); this.materials.set('matteBlack', mat); }
  createAnisotropicSteel(){ const mat=new THREE.MeshStandardMaterial({ color:0x777777, roughness:0.25, metalness:0.95 }); this.materials.set('anisoSteel', mat); }
  createClearCoatCar(){ const mat=new THREE.MeshPhysicalMaterial({ color:0xcc1122, clearcoat:1, clearcoatRoughness:0.08, roughness:0.35, metalness:0.1 }); this.materials.set('clearCoatCar', mat); }
  createTransmissionGlass(){ const mat=new THREE.MeshPhysicalMaterial({ color:0xffffff, transmission:1, thickness:2, ior:1.5, roughness:0, metalness:0 }); this.materials.set('transGlass', mat); }
  createIridescent(){ const mat=new THREE.MeshPhysicalMaterial({ color:0xffffff, iridescence:1, iridescenceIOR:1.8, iridescenceThicknessRange:[100,800], roughness:0.2 }); this.materials.set('iridescent', mat); }
  createSheenFabric(){ const mat=new THREE.MeshPhysicalMaterial({ color:0xaa4477, sheen:1, sheenRoughness:0.6, sheenColor:0xffaaaa }); this.materials.set('sheenFabric', mat); }
  createSubsurfaceSkin(){ const mat=new THREE.MeshPhysicalMaterial({ color:0xffccaa, thickness:0.8, transmission:0.2, roughness:0.6 }); this.materials.set('subsurfaceSkin', mat); }
  createSubsurfaceJade(){ const mat=new THREE.MeshPhysicalMaterial({ color:0x33aa66, thickness:1.5, transmission:0.4, ior:1.6 }); this.materials.set('jade', mat); }
  createHologram(){
    const mat=new THREE.ShaderMaterial({
      uniforms:{ time:{value:0}, color:{value:new THREE.Color(0x5a7cff)}, opacity:{value:0.6} },
      vertexShader: 'varying vec2 vUv; varying vec3 vNormal; void main(){ vUv=uv; vNormal=normalize(normalMatrix*normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
      fragmentShader: `
        uniform float time; uniform vec3 color; uniform float opacity; varying vec2 vUv; varying vec3 vNormal;
        void main(){
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.,0.,1.)), 3.0);
          float scan = sin(vUv.y*80.0 - time*8.0)*0.5+0.5;
          float flicker = sin(time*12.3)*0.1+0.9;
          float alpha = fresnel*0.8 + scan*0.2;
          alpha *= opacity * flicker;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent:true, side:THREE.DoubleSide
    });
    this.materials.set('hologram', mat);
  }
  createForceField(){
    const mat=new THREE.ShaderMaterial({
      uniforms:{ time:{value:0}, color:{value:new THREE.Color(0x00ffaa)} },
      vertexShader:'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
      fragmentShader:` uniform float time; uniform vec3 color; varying vec2 vUv; void main(){ float hex = step(0.8, sin(vUv.x*20.0)*sin(vUv.y*20.0)); float pulse = sin(time*5.0+vUv.x*3.0)*0.3+0.7; gl_FragColor=vec4(color*hex*pulse, hex*0.5*pulse); }`,
      transparent:true
    });
    this.materials.set('forceField', mat);
  }
  createEnergyCore(){
    const mat=new THREE.MeshStandardMaterial({ color:0x001122, emissive:0x00aaff, emissiveIntensity:4, roughness:0.2 });
    this.materials.set('energyCore', mat);
  }
  get(name){ return this.materials.get(name); }
  getAll(){ return Array.from(this.materials.values()); }
  update(time){
    for(let mat of this.materials.values()){
      if(mat.uniforms && mat.uniforms.time) mat.uniforms.time.value=time;
    }
  }
  createHologramMaterial(color, scrollSpeed=1, flicker=0.2){
    const mat=this.get('hologram').clone();
    mat.uniforms.color.value=new THREE.Color(color);
    mat.userData={ scrollSpeed, flicker };
    return mat;
  }
}
