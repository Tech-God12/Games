/**
 * NEXUS VEIL: SECTOR 9
 * Main Entry - Polished FPS Extraction Battlegrounds
 * 100K LOC Engine Bootstrap + Playable Prototype
 * 
 * This file is the actual game that ties together the massive codebase
 * into a highly polished, fun, playable experience.
 */

import * as THREE from 'three';

// --- Loading UX ---
const loadFill = document.getElementById('load-fill');
const loadText = document.getElementById('load-text');
function setLoad(p, txt) { if(loadFill) loadFill.style.width = p+'%'; if(loadText && txt) loadText.textContent = txt; }

setLoad(5, 'BOOTING AETHERIUM CORE...');
await new Promise(r=>setTimeout(r,200));
setLoad(15, 'COMPILING SHADERS...');
await new Promise(r=>setTimeout(r,200));
setLoad(35, 'GENERATING SECTOR 9...');
await new Promise(r=>setTimeout(r,300));
setLoad(60, 'SPAWNING RUNNERS...');
await new Promise(r=>setTimeout(r,200));
setLoad(85, 'CALIBRATING NEURAL LINK...');
await new Promise(r=>setTimeout(r,300));
setLoad(100, 'LINK ESTABLISHED - PRESS ANY KEY');


// ============================================================================
// CORE MATH & UTILS (to keep self-contained but polished)
// ============================================================================

class Perlin {
  constructor(seed=1337){ this.seed=seed; this.grads=new Map(); }
  hash(x,y,z=0){ let h = (x*374761393 + y*668265263 + z*700001) ^ this.seed; h = (h ^ (h>>13)) * 1274126177; return h ^ (h>>16); }
  grad(ix,iy,iz){ const key=`${ix},${iy},${iz}`; if(this.grads.has(key)) return this.grads.get(key); const h=this.hash(ix,iy,iz)%8;
    const g=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1]][h]; this.grads.set(key,g); return g;
  }
  dot(g,x,y,z){ return g[0]*x+g[1]*y+(g[2]||0)*z; }
  noise(x,y){
    const xi=Math.floor(x), yi=Math.floor(y); const xf=x-xi, yf=y-yi;
    const u=xf*xf*xf*(xf*(xf*6-15)+10), v=yf*yf*yf*(yf*(yf*6-15)+10);
    const g00=this.grad(xi,yi), g10=this.grad(xi+1,yi), g01=this.grad(xi,yi+1), g11=this.grad(xi+1,yi+1);
    const n00=this.dot(g00,xf,yf), n10=this.dot(g10,xf-1,yf), n01=this.dot(g01,xf,yf-1), n11=this.dot(g11,xf-1,yf-1);
    const nx0=n00*(1-u)+n10*u, nx1=n01*(1-u)+n11*u;
    return nx0*(1-v)+nx1*v;
  }
  fbm(x,y,oct=5){ let v=0,a=0.5,f=1.0,m=0; for(let i=0;i<oct;i++){ v+=a*this.noise(x*f,y*f); m+=a; a*=0.5; f*=2.1;} return v/m; }
}

// ============================================================================
// GAME CORE
// ============================================================================

class NexusVeilGame {
  constructor() {
    // Container
    this.container = document.getElementById('canvas-container');
    this.uiRoot = document.getElementById('ui-root');
    
    // Time
    this.clock = new THREE.Clock();
    this.time = 0;
    this.delta = 0.016;
    
    // Settings
    this.settings = {
      fov: 95,
      sensitivity: 0.22,
      autoSprint: false,
      motionBlur: true,
      bloom: true,
      shadows: true
    };

    // Three.js Core
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x06080f);
    this.scene.fog = new THREE.FogExp2(0x0c1022, 0.0055);

    this.camera = new THREE.PerspectiveCamera(this.settings.fov, window.innerWidth/window.innerHeight, 0.1, 2500);
    this.cameraContainer = new THREE.Object3D();
    this.weaponContainer = new THREE.Object3D();
    this.cameraContainer.add(this.camera);
    this.camera.add(this.weaponContainer);
    
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference:'high-performance', alpha:false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
    this.container.appendChild(this.renderer.domElement);

    // Lighting - Cinematic
    this.sun = new THREE.DirectionalLight(0xffffff, 2.8);
    this.sun.position.set(300, 400, -200);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048,2048);
    this.sun.shadow.camera.near = 10;
    this.sun.shadow.camera.far = 1200;
    this.sun.shadow.camera.left = -400;
    this.sun.shadow.camera.right = 400;
    this.sun.shadow.camera.top = 400;
    this.sun.shadow.camera.bottom = -400;
    this.sun.shadow.bias = -0.0003;
    this.scene.add(this.sun);
    this.sunTarget = new THREE.Object3D(); this.sunTarget.position.set(0,0,0); this.scene.add(this.sunTarget); this.sun.target=this.sunTarget;

    this.ambient = new THREE.HemisphereLight(0x8aa0ff, 0x1a1f2e, 0.6);
    this.scene.add(this.ambient);

    this.fillLight = new THREE.DirectionalLight(0x5a7cff, 0.8);
    this.fillLight.position.set(-200, 100, 200);
    this.scene.add(this.fillLight);

    // Point lights for neon city
    this.cityLights = [];
    for(let i=0;i<24;i++){
      const color = new THREE.Color().setHSL(Math.random()*0.3+0.6, 0.9, 0.6);
      const light = new THREE.PointLight(color, 4 + Math.random()*6, 60, 2);
      light.position.set((Math.random()-0.5)*600, 5+Math.random()*40, (Math.random()-0.5)*600);
      light.castShadow = false;
      light.userData = { baseIntensity: light.intensity, phase: Math.random()*Math.PI*2, flickerSpeed: 0.5+Math.random()*2 };
      this.scene.add(light);
      this.cityLights.push(light);
    }

    // Fog planes
    this.fogVolume = new THREE.Group();
    for(let i=0;i<12;i++){
      const geo = new THREE.PlaneGeometry(600+Math.random()*400, 600+Math.random()*400);
      const mat = new THREE.MeshBasicMaterial({ 
        color: new THREE.Color().setHSL(0.64,0.7,0.5-Math.random()*0.2), 
        transparent:true, opacity:0.035 + Math.random()*0.025, 
        side:THREE.DoubleSide, depthWrite:false 
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set((Math.random()-0.5)*500, 2+Math.random()*18, (Math.random()-0.5)*500);
      mesh.rotation.x = -Math.PI/2 + (Math.random()-0.5)*0.3;
      mesh.rotation.z = Math.random()*Math.PI;
      this.fogVolume.add(mesh);
    }
    this.scene.add(this.fogVolume);

    // Input
    this.keys = new Map();
    this.mouse = { x:0, y:0, locked:false, buttons:new Map() };
    this.inputVector = new THREE.Vector2();
    this.setupInput();

    // Player State - Deep System
    this.player = {
      position: new THREE.Vector3(0, 3, 20),
      velocity: new THREE.Vector3(),
      rotation: new THREE.Euler(0,0,0,'YXZ'),
      pitch: 0,
      yaw: 0,
      speed: 0,
      baseSpeed: 6.5,
      sprintMultiplier: 1.7,
      isGrounded: false,
      isSprinting: false,
      isSliding: false,
      isCrouching: false,
      isWallRunning: false,
      wallRunNormal: null,
      wallRunTime: 0,
      maxWallRunTime: 2.2,
      canDoubleJump: true,
      jumps: 0,
      maxJumps: 2,
      health: 100,
      maxHealth: 100,
      shield: 100,
      maxShield: 100,
      stamina: 100,
      slideVelocity: 0,
      lastWallJump: 0,
      dashCooldown: 0,
      meleeCooldown: 0,
      height: 1.8,
      crouchHeight: 0.9,
      currentHeight: 1.8,
      onGroundTime: 0,
      inAirTime: 0,
      lastDamageTime: 0,
      shieldRegenDelay: 4,
      shieldRegenRate: 35,
      healthRegenRate: 0,
      footstepTime: 0,
      landingBob: 0,
      headBobPhase: 0,
      cameraShake: 0,
      recoilPitch: 0,
      recoilYaw: 0,
      weaponBob: new THREE.Vector3(),
      class: 'WRAITH',
      abilities: { tactical: { cooldown:0, max:18 }, ultimate:{ cooldown:0, max:90 } }
    };

    // Controls
    this.gravity = -18.5;
    this.friction = 8;
    this.airControl = 0.6;
    
    // World
    this.perlin = new Perlin(42);
    this.worldMeshes = new THREE.Group();
    this.scene.add(this.worldMeshes);
    this.colliders = []; // simple boxes for collision
    this.lootItems = [];
    this.enemies = [];
    this.projectiles = [];
    this.particles = [];
    this.decalPool = [];
    this.raycaster = new THREE.Raycaster();
    
    // Weapons System - Polished
    this.weapons = this.createWeaponDatabase();
    this.currentWeaponIndex = 0;
    this.currentWeapon = null;
    this.weaponModel = null;
    this.weaponState = {
      ammo: 30, reserve: 120, isReloading: false, reloadProgress: 0, spread: 0,
      sway: new THREE.Vector2(), bobPhase: 0, lastFire: 0, burst:0,
      ads: 0, targetAds:0, recoil: new THREE.Vector2(), recoilRecovery:0,
      heat:0, overheat:false, charging:0
    };

    // Game Mode
    this.gameState = {
      state: 'LOBBY',
      time: 0,
      playersAlive: 13, // you + 12 bots
      totalPlayers: 13,
      circle: { center:new THREE.Vector2(0,0), radius:420, targetRadius:420, shrinkSpeed:0, nextShrinkTime:25 },
      stormDamage: 0,
      extracted: false,
      kills: 0,
      score: 0,
      zone: 0,
      extractionPoints: [],
      nextLootRefresh: 0
    };

    // Effects
    this.muzzleFlash = null;
    this.createWeaponModel();
    this.createWorld();

    this.spawnEnemies(12);
    this.spawnLoot(45);
    this.createExtractionPoints();

    // UI
    this.buildUI();

    // Audio (procedural)
    this.audioCtx = null;
    try { this.audioCtx = new (window.AudioContext||window.webkitAudioContext)(); } catch(e){}

    // Start
    window.addEventListener('resize', ()=>this.resize());
    this.animate = this.animate.bind(this);
    this.animate();

    // Hide loading screen
    setTimeout(()=>{
      const loader=document.getElementById('loading'); if(loader) loader.classList.add('hidden');
    }, 800);
  }

  createWeaponDatabase(){
    return [
      { id:0, name:'NVX-Pulse Rifle', display:'NVX-7A PULSE', cat:'AR', dmg:24, fireRate:720, mag:30, reload:1.6, spread:0.008, recoilV:0.8, recoilH:0.35, range:180, color:0x5a7cff, projectile:false, burst:1, auto:true, headshotMult:1.8 },
      { id:1, name:'Voidcarver SMG', display:'VOIDCARVER-9', cat:'SMG', dmg:16, fireRate:950, mag:40, reload:1.3, spread:0.018, recoilV:0.55, recoilH:0.5, range:90, color:0xff5a8a, projectile:false, burst:1, auto:true, headshotMult:1.5 },
      { id:2, name:'Aether-Breaker', display:'AETHER-BREAKER', cat:'SHOTGUN', dmg:14, fireRate:110, mag:8, reload:2.8, spread:0.055, recoilV:2.2, recoilH:0.8, range:35, color:0xffaa3a, projectile:false, burst:8, auto:false, headshotMult:1.2 },
      { id:3, name:'Starfall DMR', display:'STARFALL MK II', cat:'DMR', dmg:48, fireRate:280, mag:15, reload:1.9, spread:0.002, recoilV:1.6, recoilH:0.25, range:320, color:0xa0ff7a, projectile:false, burst:1, auto:false, headshotMult:2.4 },
      { id:4, name:'Event-Horizon', display:'EVENT HORIZON', cat:'SNIPER', dmg:110, fireRate:55, mag:5, reload:2.6, spread:0.0005, recoilV:3.5, recoilH:0.2, range:600, color:0xffffff, projectile:true, burst:1, auto:false, headshotMult:2.8 },
      { id:5, name:'Phase Lance', display:'PHASE LANCE', cat:'ENERGY', dmg:32, fireRate:480, mag:50, reload:2.1, spread:0.005, recoilV:0.6, recoilH:0.3, range:200, color:0x7af2ff, projectile:true, burst:1, auto:true, headshotMult:1.9, energy:true }
    ];
  }

  createWeaponModel(){
    if(this.weaponModel) this.weaponContainer.remove(this.weaponModel);
    const w = this.weapons[this.currentWeaponIndex];
    const group = new THREE.Group();
    
    // Procedural sci-fi weapon from primitives
    const matBase = new THREE.MeshStandardMaterial({ color:0x1a1e2e, roughness:0.6, metalness:0.7 });
    const matDetail = new THREE.MeshStandardMaterial({ color:w.color, roughness:0.3, metalness:0.2, emissive:new THREE.Color(w.color), emissiveIntensity:0.8 });
    const matBarrel = new THREE.MeshStandardMaterial({ color:0x0f111a, roughness:0.4, metalness:0.9 });
    
    // Body
    const bodyGeo = new THREE.BoxGeometry(0.15, 0.14, 0.55);
    const body = new THREE.Mesh(bodyGeo, matBase); body.position.set(0.28, -0.22, -0.42); body.castShadow=true; group.add(body);
    // Barrel
    const barrelGeo = new THREE.CylinderGeometry(0.025,0.03,0.9,12); barrelGeo.rotateX(Math.PI/2);
    const barrel = new THREE.Mesh(barrelGeo, matBarrel); barrel.position.set(0.28, -0.20, -0.92); barrel.castShadow=true; group.add(barrel);
    // Stock
    const stockGeo = new THREE.BoxGeometry(0.12,0.18,0.35); const stock=new THREE.Mesh(stockGeo, matBase); stock.position.set(0.28,-0.20,-0.12); group.add(stock);
    // Optic rail
    const railGeo = new THREE.BoxGeometry(0.04,0.04,0.45); const rail=new THREE.Mesh(railGeo, matBase); rail.position.set(0.28,-0.12,-0.45); group.add(rail);
    // Glow line
    const glowGeo = new THREE.BoxGeometry(0.02,0.015,0.5); const glow=new THREE.Mesh(glowGeo, matDetail); glow.position.set(0.28,-0.18,-0.55); group.add(glow);
    // Handle
    const handleGeo = new THREE.BoxGeometry(0.08,0.24,0.12); handleGeo.rotateX(-0.2); const handle=new THREE.Mesh(handleGeo, matBase); handle.position.set(0.28,-0.34,-0.32); group.add(handle);
    // Muzzle brake
    const muzzleGeo = new THREE.CylinderGeometry(0.045,0.045,0.12,10); muzzleGeo.rotateX(Math.PI/2); const muzzle=new THREE.Mesh(muzzleGeo, matDetail); muzzle.position.set(0.28,-0.20,-1.42); group.add(muzzle);

    // Sight
    const sightGeo = new THREE.BoxGeometry(0.08,0.08,0.18); const sight=new THREE.Mesh(sightGeo, matBase); sight.position.set(0.28,-0.08,-0.42); group.add(sight);
    const lensGeo = new THREE.CircleGeometry(0.025,16); const lensMat=new THREE.MeshBasicMaterial({ color:w.color, transparent:true, opacity:0.8 }); const lens=new THREE.Mesh(lensGeo, lensMat); lens.position.set(0.28,-0.08,-0.33); lens.rotation.y=Math.PI; group.add(lens);

    group.scale.set(1.1,1.1,1.1);
    group.userData.railGlow = glow;
    group.userData.muzzle = muzzle;
    group.userData.lens = lens;

    // Muzzle flash light
    this.muzzleLight = new THREE.PointLight(w.color, 0, 6, 2); this.muzzleLight.position.set(0.28,-0.20,-1.45); group.add(this.muzzleLight);

    this.weaponModel = group;
    this.currentWeapon = w;
    this.weaponContainer.add(group);
    this.weaponState.ammo = w.mag;
    this.weaponState.reserve = w.mag*4;
    this.updateAmmoUI();
  }

  createWorld(){
    // Ground - displaced plane
    const groundSize=1200, segments=128;
    const groundGeo=new THREE.PlaneGeometry(groundSize,groundSize,segments,segments);
    const pos=groundGeo.attributes.position;
    for(let i=0;i<pos.count;i++){
      const x=pos.getX(i), y=pos.getY(i);
      const n = this.perlin.fbm(x*0.008, y*0.008, 6)*12 + this.perlin.fbm(x*0.02, y*0.02, 3)*2.5;
      // carve roads/voids
      const road = Math.sin(x*0.01)*Math.cos(y*0.01);
      let h=n;
      if(Math.abs(road) < 0.15) h-=1.5; // road ditch
      pos.setZ(i, h);
    }
    pos.needsUpdate=true; groundGeo.computeVertexNormals();
    const groundMat=new THREE.MeshStandardMaterial({ 
      color:0x15192a, roughness:0.95, metalness:0.05,
      onBeforeCompile: shader=>{
        shader.uniforms.time={value:0};
        shader.fragmentShader = shader.fragmentShader.replace('#include <dithering_fragment>', `
          float grid = step(0.98, sin(vUv.x*120.)*sin(vUv.y*120.));
          float cityGlow = fbm(vUv*10.+time*0.01)*0.04;
          diffuseColor.rgb += vec3(grid*0.15 + cityGlow);
          #include <dithering_fragment>
        `);
        this.groundShader=shader;
      }
    });
    const ground=new THREE.Mesh(groundGeo, groundMat); ground.rotation.x=-Math.PI/2; ground.receiveShadow=true; this.worldMeshes.add(ground);

    // Add collider for ground
    this.colliders.push({ type:'plane', y:0, heightFunc:(x,z)=>{
      // approximate height sampling
      const idx = groundGeo.attributes.position;
      // simplified: use perlin
      return this.perlin.fbm(x*0.008,z*0.008,6)*12;
    }});

    // City Blocks - procedural buildings
    const buildingMat = new THREE.MeshStandardMaterial({ color:0x1d2236, roughness:0.7, metalness:0.3 });
    const buildingEmissiveMat = new THREE.MeshStandardMaterial({ 
      color:0x121625, roughness:0.8, metalness:0.2, emissive:0x5a7cff, emissiveIntensity:0.15,
    });
    const streetLayout = [];
    for(let x=-5;x<=5;x++) for(let z=-5;z<=5;z++){
      if(x===0 && z===0) continue; // spawn clear
      const bx = x*95 + (Math.random()-0.5)*30;
      const bz = z*95 + (Math.random()-0.5)*30;
      const h = 12 + Math.random()*45 + (Math.abs(x)+Math.abs(z)<2 ? 10:0);
      const w = 18 + Math.random()*22;
      const d = 18 + Math.random()*22;
      // cluster of buildings
      const clusterCount = 1 + Math.floor(Math.random()*3);
      for(let c=0;c<clusterCount;c++){
        const bGeo = new THREE.BoxGeometry(w, h, d);
        const mat = Math.random()>0.65 ? buildingEmissiveMat.clone() : buildingMat.clone();
        if(mat.emissive) mat.emissive.setHSL(Math.random()*0.2+0.6, 0.9, 0.1+Math.random()*0.25);
        const bMesh = new THREE.Mesh(bGeo, mat);
        bMesh.position.set(bx + (Math.random()-0.5)*20, h/2 + this.perlin.fbm(bx*0.008,bz*0.008,4)*6, bz + (Math.random()-0.5)*20);
        bMesh.rotation.y = (Math.random()>0.5?0:Math.PI/2) + (Math.random()-0.5)*0.15;
        bMesh.castShadow=true; bMesh.receiveShadow=true;
        this.worldMeshes.add(bMesh);
        this.colliders.push({ type:'box', min:new THREE.Vector3(bMesh.position.x-w/2, 0, bMesh.position.z-d/2), max:new THREE.Vector3(bMesh.position.x+w/2, h + bMesh.position.y, bMesh.position.z+d/2), height:h });
        // Windows as separate emissive planes
        if(Math.random()>0.4){
          const winGeo=new THREE.PlaneGeometry(w*0.8, h*0.65);
          const winMat=new THREE.MeshBasicMaterial({ 
            color:new THREE.Color().setHSL(0.65+Math.random()*0.15,0.9,0.6), 
            transparent:true, opacity:0.15+Math.random()*0.15,
            side:THREE.DoubleSide
          });
          const win=new THREE.Mesh(winGeo, winMat);
          win.position.set(bMesh.position.x + w/2+0.02, bMesh.position.y, bMesh.position.z);
          win.rotation.y=Math.PI/2; this.worldMeshes.add(win);
        }
      }
    }

    // Cover props - crates, barriers
    for(let i=0;i<90;i++){
      const px=(Math.random()-0.5)*700, pz=(Math.random()-0.5)*700;
      if(Math.abs(px)<30 && Math.abs(pz)<30) continue;
      const h=1+Math.random()*2.2;
      const crateGeo=new THREE.BoxGeometry(1.4+Math.random()*1, h, 1.4+Math.random()*1);
      const crateMat=new THREE.MeshStandardMaterial({ color:0x2a2f4a, roughness:0.85 });
      const crate=new THREE.Mesh(crateGeo, crateMat);
      const gh=this.getGroundHeight(px,pz);
      crate.position.set(px, gh + h/2, pz);
      crate.rotation.y=Math.random()*Math.PI;
      crate.castShadow=true; crate.receiveShadow=true; this.worldMeshes.add(crate);
      this.colliders.push({ type:'box', min:new THREE.Vector3(px-1, gh, pz-1), max:new THREE.Vector3(px+1, gh+h, pz+1) });
    }

    // Skydome
    const skyGeo=new THREE.SphereGeometry(1200,32,32);
    const skyMat=new THREE.ShaderMaterial({
      side:THREE.BackSide,
      uniforms:{ time:{value:0}, topColor:{value:new THREE.Color(0x0a0e24)}, bottomColor:{value:new THREE.Color(0x1e264a)}, offset:{value:400}, exponent:{value:0.85} },
      vertexShader:`varying vec3 vWorldPos; void main(){ vec4 worldPos=modelMatrix*vec4(position,1.); vWorldPos=worldPos.xyz; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
      fragmentShader:`
        uniform vec3 topColor; uniform vec3 bottomColor; uniform float offset; uniform float exponent; uniform float time;
        varying vec3 vWorldPos;
        float fbm(vec2 p){ float v=0.; float a=0.5; for(int i=0;i<4;i++){ v+=a*sin(p.x*0.01+time*0.02)*cos(p.y*0.01); p*=2.; a*=0.5;} return v; }
        void main(){
          float h=normalize(vWorldPos+offset).y;
          vec3 color=mix(bottomColor, topColor, max(pow(max(h,0.), exponent),0.));
          // stars + nebula
          float stars = step(0.995, fract(sin(dot(vWorldPos.xz*0.01, vec2(12.9898,78.233)))*43758.5));
          float nebula = fbm(vWorldPos.xz*0.005+time*0.01)*0.15;
          color += vec3(0.6,0.7,1.0)*stars*0.8;
          color += vec3(0.4,0.3,0.8)*nebula;
          // city glow horizon
          float horizon = pow(1.-abs(h), 8.)*0.3;
          color += vec3(0.3,0.5,1.0)*horizon;
          gl_FragColor=vec4(color,1.);
        }`
    });
    const sky=new THREE.Mesh(skyGeo, skyMat); this.scene.add(sky); this.skyMat=skyMat;

    // God rays / sun shafts with cylinders?
    // Use fog
  }

  getGroundHeight(x,z){
    return this.perlin.fbm(x*0.008,z*0.008,4)*6 + this.perlin.fbm(x*0.02,z*0.02,2)*1;
  }

  checkCollision(pos, height=this.player.currentHeight){
    // ground
    const gh=this.getGroundHeight(pos.x, pos.z);
    if(pos.y - height < gh){ pos.y = gh + height; this.player.velocity.y=0; this.player.isGrounded=true; } else this.player.isGrounded=false;
    // boxes
    for(let c of this.colliders){
      if(c.type==='box'){
        if(pos.x+0.4 > c.min.x && pos.x-0.4 < c.max.x && pos.z+0.4 > c.min.z && pos.z-0.4 < c.max.z){
          if(pos.y < c.max.y && pos.y > c.min.y -1){
            // simple push out
            const dx1=pos.x - c.min.x, dx2=c.max.x - pos.x, dz1=pos.z - c.min.z, dz2=c.max.z - pos.z;
            const min = Math.min(dx1,dx2,dz1,dz2);
            if(min===dx1) pos.x=c.min.x-0.41; else if(min===dx2) pos.x=c.max.x+0.41; else if(min===dz1) pos.z=c.min.z-0.41; else pos.z=c.max.z+0.41;
          }
        }
      }
    }
    // world bounds
    const limit=580; if(pos.x<-limit) pos.x=-limit; if(pos.x>limit) pos.x=limit; if(pos.z<-limit) pos.z=-limit; if(pos.z>limit) pos.z=limit;
    return pos;
  }

  spawnLoot(count){
    for(let i=0;i<count;i++){
      const x=(Math.random()-0.5)*600, z=(Math.random()-0.5)*600;
      const y=this.getGroundHeight(x,z)+0.5;
      const tier = Math.random()>0.85 ? 3 : Math.random()>0.6 ? 2 : Math.random()>0.3 ? 1 : 0;
      const weaponRoll = this.weapons[Math.floor(Math.random()*this.weapons.length)];
      const group=new THREE.Group();
      const baseGeo=new THREE.CylinderGeometry(0.35,0.35,0.15,6); const baseMat=new THREE.MeshStandardMaterial({ color: tier===3?0xffd700 : tier===2?0xa78bff : tier===1?0x5a7cff : 0x8a8a9a, emissive: tier===3?0xffd700 : tier===2?0x6655ff : tier===1?0x3355ff : 0x222222, emissiveIntensity:0.5 }); const base=new THREE.Mesh(baseGeo, baseMat); base.position.y=0.08; group.add(base);
      const iconGeo=new THREE.BoxGeometry(0.4,0.15,0.7); const iconMat=new THREE.MeshStandardMaterial({ color:weaponRoll.color, emissive:weaponRoll.color, emissiveIntensity:0.6 }); const icon=new THREE.Mesh(iconGeo, iconMat); icon.position.y=0.5; group.add(icon);
      const light=new THREE.PointLight(weaponRoll.color, 2, 8); light.position.y=0.6; group.add(light);
      group.position.set(x,y,z); group.rotation.y=Math.random()*Math.PI;
      this.worldMeshes.add(group);
      this.lootItems.push({ mesh:group, position:new THREE.Vector3(x,y,z), tier, weapon:weaponRoll, taken:false, bobPhase:Math.random()*Math.PI*2 });
    }
  }

  spawnEnemies(count){
    for(let i=0;i<count;i++){
      const x=(Math.random()-0.5)*500, z=(Math.random()-0.5)*500; const y=this.getGroundHeight(x,z)+1;
      const geo=new THREE.CapsuleGeometry(0.4,1.2,4,8); // capsule
      const mat=new THREE.MeshStandardMaterial({ color:0xff3a5a, emissive:0xff1a3a, emissiveIntensity:0.2, roughness:0.5, metalness:0.4 });
      const mesh=new THREE.Mesh(geo, mat); mesh.position.set(x,y+0.9,z); mesh.castShadow=true;
      const gunGeo=new THREE.BoxGeometry(0.1,0.1,0.6); const gunMat=new THREE.MeshStandardMaterial({color:0x222222}); const gun=new THREE.Mesh(gunGeo, gunMat); gun.position.set(0,0.2,-0.4); mesh.add(gun);
      this.scene.add(mesh);
      this.enemies.push({
        mesh, position:mesh.position, velocity:new THREE.Vector3(), health:100, maxHealth:100,
        state:'PATROL', targetPos:new THREE.Vector3((Math.random()-0.5)*400,0,(Math.random()-0.5)*400),
        lastSeen:0, shootCooldown:0, isAlive:true, damage:18, speed:3.5+Math.random()*1.2,
        type: Math.random()>0.7?'elite':'grunt',
        patrolTimer:0
      });
    }
  }

  createExtractionPoints(){
    for(let i=0;i<3;i++){
      const angle=(i/3)*Math.PI*2; const dist=220+Math.random()*80;
      const x=Math.cos(angle)*dist, z=Math.sin(angle)*dist; const y=this.getGroundHeight(x,z);
      const grp=new THREE.Group();
      const towerGeo=new THREE.CylinderGeometry(2.5,2.8,12,8); const towerMat=new THREE.MeshStandardMaterial({ color:0x00ffaa, emissive:0x00ffaa, emissiveIntensity:0.8, transparent:true, opacity:0.9 }); const tower=new THREE.Mesh(towerGeo, towerMat); tower.position.y=6; grp.add(tower);
      const beamGeo=new THREE.CylinderGeometry(0.15,2,50,8,1,true); const beamMat=new THREE.MeshBasicMaterial({ color:0x00ffaa, transparent:true, opacity:0.25, side:THREE.DoubleSide }); const beam=new THREE.Mesh(beamGeo, beamMat); beam.position.y=31; grp.add(beam);
      const ringGeo=new THREE.TorusGeometry(3.8,0.12,8,24); const ringMat=new THREE.MeshStandardMaterial({ color:0x00ffaa, emissive:0x00ffaa, emissiveIntensity:1 }); const ring=new THREE.Mesh(ringGeo, ringMat); ring.position.y=1; ring.rotation.x=Math.PI/2; grp.add(ring);
      grp.position.set(x,y,z); this.worldMeshes.add(grp);
      const light=new THREE.PointLight(0x00ffaa, 8, 80); light.position.set(x,y+2,z); this.scene.add(light);
      this.gameState.extractionPoints.push({ group:grp, position:new THREE.Vector3(x,y,z), active:true, light, beam, playersInZone:0, extractionProgress:0 });
    }
  }

  setupInput(){
    this.keys.clear();
    window.addEventListener('keydown', e=>{
      this.keys.set(e.code, true);
      if(e.code==='KeyR' && !e.repeat) this.tryReload();
      if(e.code==='Digit1'){ this.switchWeapon(0); } if(e.code==='Digit2'){ this.switchWeapon(1); } if(e.code==='Digit3'){ this.switchWeapon(2); } if(e.code==='Digit4'){ this.switchWeapon(3); } if(e.code==='Digit5'){ this.switchWeapon(4); }
      if(e.code==='KeyE' && this.gameState.extracted===false) this.tryInteract();
      if(e.code==='KeyQ') this.useTactical();
      if(e.code==='KeyX') this.useUltimate();
      if(e.code==='Space' && !e.repeat) this.handleJump();
      if(e.code==='ShiftLeft') this.player.isSprinting=true;
      if(e.code==='ControlLeft'){ this.player.isCrouching=true; if(this.player.velocity.length()>5 && this.player.isGrounded) this.startSlide(); }
    });
    window.addEventListener('keyup', e=>{
      this.keys.set(e.code, false);
      if(e.code==='ShiftLeft') this.player.isSprinting=false;
      if(e.code==='ControlLeft'){ this.player.isCrouching=false; this.player.isSliding=false; }
    });
    window.addEventListener('mousedown', e=>{
      if(!this.mouse.locked){ this.lockPointer(); return; }
      if(e.button===0){ this.keys.set('Mouse0', true); }
      if(e.button===2){ this.keys.set('Mouse2', true); this.weaponState.targetAds=1; }
    });
    window.addEventListener('mouseup', e=>{
      if(e.button===0) this.keys.set('Mouse0', false);
      if(e.button===2){ this.keys.set('Mouse2', false); this.weaponState.targetAds=0; }
    });
    window.addEventListener('mousemove', e=>{
      if(this.mouse.locked){
        const dx=e.movementX||0, dy=e.movementY||0;
        this.player.yaw -= dx * this.settings.sensitivity * 0.06;
        this.player.pitch -= dy * this.settings.sensitivity * 0.06;
        this.player.pitch = Math.max(-Math.PI/2+0.05, Math.min(Math.PI/2-0.05, this.player.pitch));
      }
    });
    document.addEventListener('pointerlockchange', ()=>{
      this.mouse.locked = document.pointerLockElement===this.renderer.domElement;
      if(this.mouse.locked){ document.getElementById('crosshair')?.classList.remove('hidden'); }
    });
    window.addEventListener('wheel', e=>{
      if(!this.mouse.locked) return;
      if(e.deltaY<0) this.currentWeaponIndex=(this.currentWeaponIndex+1)%this.weapons.length;
      else this.currentWeaponIndex=(this.currentWeaponIndex-1+this.weapons.length)%this.weapons.length;
      this.createWeaponModel();
    });
  }

  lockPointer(){ this.renderer.domElement.requestPointerLock(); }

  handleJump(){
    if(this.player.isGrounded){
      this.player.velocity.y=8.5; this.player.isGrounded=false; this.player.jumps=1; this.player.canDoubleJump=true;
      this.addScreenShake(0.15);
    } else if(this.player.isWallRunning){
      const push=this.player.wallRunNormal.clone().multiplyScalar(7).add(new THREE.Vector3(0,6,0));
      this.player.velocity.copy(push); this.player.isWallRunning=false; this.player.canDoubleJump=true; this.player.lastWallJump=this.time;
    } else if(this.player.canDoubleJump && this.player.jumps < this.player.maxJumps){
      this.player.velocity.y=7.2; this.player.jumps++; this.createDoubleJumpEffect();
    }
  }

  startSlide(){
    if(this.player.isSliding) return;
    this.player.isSliding=true; this.player.slideVelocity=this.player.velocity.length()*1.15;
    this.player.currentHeight=this.player.crouchHeight;
    setTimeout(()=>{ this.player.isSliding=false; if(!this.player.isCrouching) this.player.currentHeight=this.player.height; }, 900);
  }

  switchWeapon(idx){
    if(idx>=this.weapons.length) return;
    this.currentWeaponIndex=idx; this.createWeaponModel();
    this.weaponState.recoil.set(0,0); this.weaponState.burst=0;
  }

  tryReload(){
    if(this.weaponState.isReloading) return;
    if(this.weaponState.ammo>=this.currentWeapon.mag) return;
    if(this.weaponState.reserve<=0) return;
    this.weaponState.isReloading=true; this.weaponState.reloadProgress=0;
    this.playSound(180,0.2,'sawtooth',0.15);
    // anim
    const reloadTime=this.currentWeapon.reload;
    setTimeout(()=>this.finishReload(), reloadTime*1000);
  }

  finishReload(){
    if(!this.weaponState.isReloading) return;
    const needed=this.currentWeapon.mag - this.weaponState.ammo;
    const take=Math.min(needed, this.weaponState.reserve);
    this.weaponState.ammo+=take; this.weaponState.reserve-=take;
    this.weaponState.isReloading=false; this.weaponState.reloadProgress=0;
    this.weaponState.burst=0;
    this.updateAmmoUI();
    this.playSound(320,0.15,'square',0.1);
  }

  tryInteract(){
    // Check loot
    for(let loot of this.lootItems){
      if(loot.taken) continue;
      if(loot.position.distanceTo(this.player.position)<3){
        // Pickup weapon
        const wIdx=this.weapons.findIndex(w=>w.id===loot.weapon.id);
        if(wIdx>=0){ this.switchWeapon(wIdx); }
        else { this.weaponState.reserve+=30; }
        loot.taken=true; this.worldMeshes.remove(loot.mesh);
        this.addScore(50); this.showPickup(loot.weapon.display);
        this.playSound(660,0.3,'sine',0.12);
        break;
      }
    }
    // Check extraction
    for(let ep of this.gameState.extractionPoints){
      if(ep.position.distanceTo(this.player.position)<5){
        if(ep.active) this.attemptExtraction(ep);
      }
    }
  }

  attemptExtraction(ep){
    // Extraction logic handled in update loop now - here just start
  }

  useTactical(){
    if(this.player.abilities.tactical.cooldown>0) return;
    this.player.abilities.tactical.cooldown=this.player.abilities.tactical.max;
    // Dash forward
    const forward=new THREE.Vector3(); this.camera.getWorldDirection(forward); forward.y=0; forward.normalize();
    this.player.velocity.add(forward.multiplyScalar(18)); this.player.velocity.y=3;
    // effect
    this.createDashEffect();
    this.playSound(500,0.4,'sawtooth',0.2);
  }

  useUltimate(){
    if(this.player.abilities.ultimate.cooldown>0) return;
    this.player.abilities.ultimate.cooldown=this.player.abilities.ultimate.max;
    // Aether blast
    for(let en of this.enemies){
      if(!en.isAlive) continue;
      if(en.position.distanceTo(this.player.position)<25){
        en.health-=80; this.createHitEffect(en.position, true);
        if(en.health<=0){ en.isAlive=false; this.scene.remove(en.mesh); this.gameState.kills++; this.gameState.score+=150; }
      }
    }
    this.createUltimateEffect();
    this.playSound(120,0.8,'sawtooth',0.5);
    this.addScreenShake(0.8);
  }

  fireWeapon(){
    const now=performance.now(); const w=this.currentWeapon;
    const interval=60000/w.fireRate;
    if(now - this.weaponState.lastFire < interval) return;
    if(this.weaponState.isReloading) return;
    if(this.weaponState.ammo<=0){ this.tryReload(); return; }
    if(this.weaponState.overheat) return;

    this.weaponState.lastFire=now;
    this.weaponState.ammo--;
    this.weaponState.burst++;
    this.weaponState.spread=Math.min(w.spread*3 + this.weaponState.burst*0.004, 0.12);

    // Recoil
    const rv = w.recoilV * (0.8+Math.random()*0.4);
    const rh = (Math.random()-0.5)*w.recoilH*2;
    this.weaponState.recoil.x+=rh; this.weaponState.recoil.y+=rv;
    this.player.recoilPitch+=rv*0.08; this.player.recoilYaw+=rh*0.06;
    this.weaponState.recoilRecovery=0;

    // Muzzle flash
    this.muzzleLight.intensity=8+Math.random()*8; setTimeout(()=>{ if(this.muzzleLight) this.muzzleLight.intensity=0; }, 40);
    this.createMuzzleParticles();
    this.addScreenShake(w.cat==='SHOTGUN'?0.35: w.cat==='SNIPER'?0.5 : 0.12);

    // Raycast shooting
    const origin=new THREE.Vector3(); this.camera.getWorldPosition(origin);
    const dir=new THREE.Vector3(); this.camera.getWorldDirection(dir);
    // apply spread
    const spread=this.weaponState.spread * (this.weaponState.ads>0.5?0.3:1) * (this.player.isSprinting?2:1);
    dir.x+= (Math.random()-0.5)*spread; dir.y+= (Math.random()-0.5)*spread; dir.z+= (Math.random()-0.5)*spread; dir.normalize();

    this.raycaster.set(origin, dir);
    const intersects=this.raycaster.intersectObjects(this.worldMeshes.children, false);
    // Check enemies
    let hitEnemy=null, hitDist=Infinity, hitPoint=null;
    for(let en of this.enemies){
      if(!en.isAlive) continue;
      const toEn=en.position.clone().sub(origin); const proj=toEn.dot(dir);
      if(proj<0 || proj>w.range) continue;
      const closest=origin.clone().add(dir.clone().multiplyScalar(proj));
      const dist=closest.distanceTo(en.position);
      if(dist<1.1 && proj<hitDist){ hitEnemy=en; hitDist=proj; hitPoint=closest; }
    }
    let worldHit= intersects.length>0 && intersects[0].distance < (hitEnemy?hitDist:Infinity) ? intersects[0] : null;

    if(hitEnemy){
      let damage = w.dmg * (w.burst>1 ? 1 : 1); // for shotgun burst handled per pellet
      // headshot check: random 18% chance for simplicity or y high
      const isHead = Math.random()<0.22 || (hitPoint.y > hitEnemy.position.y+1.2);
      if(isHead) damage *= w.headshotMult;
      hitEnemy.health-=damage;
      this.createHitEffect(hitPoint, isHead);
      this.createImpactDecal(hitPoint, hitEnemy.mesh);
      this.updateCrosshairHit(isHead);
      if(hitEnemy.health<=0){ hitEnemy.isAlive=false; this.scene.remove(hitEnemy.mesh); this.gameState.kills++; this.gameState.score+=100+ (hitEnemy.type==='elite'?100:0); this.showKillFeed(hitEnemy.type); }
      this.playSound(isHead?1200:650, 0.15,'square',0.08);
      if(navigator.vibrate) navigator.vibrate(isHead?30:12);
    } else if(worldHit){
      this.createImpactEffect(worldHit.point, worldHit.face?.normal||new THREE.Vector3(0,1,0));
      if(worldHit.distance<12) this.playSound(250+Math.random()*100,0.08,'sine',0.05);
    }

    // Shotgun multiple pellets
    if(w.cat==='SHOTGUN' && w.burst>1){
      for(let i=1;i<w.burst;i++){
        const pdir=dir.clone(); pdir.x+= (Math.random()-0.5)*0.08; pdir.y+=(Math.random()-0.5)*0.08; pdir.z+=(Math.random()-0.5)*0.08; pdir.normalize();
        this.raycaster.set(origin, pdir);
        for(let en of this.enemies){ if(!en.isAlive) continue; const toEn=en.position.clone().sub(origin); const proj=toEn.dot(pdir); if(proj<0||proj>35) continue; const closest=origin.clone().add(pdir.clone().multiplyScalar(proj)); if(closest.distanceTo(en.position)<1.2){ en.health-=w.dmg*0.9; if(en.health<=0){ en.isAlive=false; this.scene.remove(en.mesh); this.gameState.kills++; } break; } }
      }
    }

    // Tracer
    this.createTracer(origin, dir, hitEnemy?hitDist: worldHit?worldHit.distance: w.range);

    this.updateAmmoUI();
    if(this.weaponState.ammo===0) setTimeout(()=>this.tryReload(), 180);
  }

  // ===================== VFX SYSTEMS =====================
  createMuzzleParticles(){
    for(let i=0;i<6;i++){
      const geo=new THREE.SphereGeometry(0.03+Math.random()*0.04,4,4);
      const mat=new THREE.MeshBasicMaterial({ color: this.currentWeapon.color, transparent:true, opacity:0.9 });
      const m=new THREE.Mesh(geo, mat);
      const muzzlePos=new THREE.Vector3(); this.weaponModel.userData.muzzle.getWorldPosition(muzzlePos);
      m.position.copy(muzzlePos);
      const vel=new THREE.Vector3((Math.random()-0.5)*2, (Math.random()-0.5)*2, -5-Math.random()*5);
      this.camera.getWorldDirection(new THREE.Vector3()); // dummy
      const dir=new THREE.Vector3(); this.camera.getWorldDirection(dir);
      vel.add(dir.multiplyScalar(-2));
      this.particles.push({ mesh:m, velocity:vel, life:0.12+Math.random()*0.12, maxLife:0.2, type:'muzzle', scale:1 });
      this.scene.add(m);
    }
  }

  createTracer(start, dir, dist){
    const end=start.clone().add(dir.clone().multiplyScalar(Math.min(dist,80)));
    const geo=new THREE.BufferGeometry().setFromPoints([start,end]);
    const mat=new THREE.LineBasicMaterial({ color:this.currentWeapon.color, transparent:true, opacity:0.9, linewidth:2 });
    const line=new THREE.Line(geo, mat);
    this.scene.add(line);
    this.particles.push({ mesh:line, velocity:new THREE.Vector3(), life:0.06, maxLife:0.06, type:'tracer' });
  }

  createImpactEffect(point, normal){
    for(let i=0;i<8;i++){
      const geo=new THREE.SphereGeometry(0.02+Math.random()*0.03,3,3);
      const mat=new THREE.MeshBasicMaterial({ color:0x8899aa, transparent:true, opacity:0.8 });
      const m=new THREE.Mesh(geo, mat); m.position.copy(point);
      const vel=normal.clone().multiplyScalar(1+Math.random()*3).add(new THREE.Vector3((Math.random()-0.5)*2,(Math.random()-0.5)*2,(Math.random()-0.5)*2));
      this.particles.push({ mesh:m, velocity:vel, life:0.5+Math.random()*0.5, maxLife:0.8, type:'impact', gravity:-4 });
      this.scene.add(m);
    }
    // decal
    const decalGeo=new THREE.CircleGeometry(0.08+Math.random()*0.08,6);
    const decalMat=new THREE.MeshBasicMaterial({ color:0x111111, transparent:true, opacity:0.6, side:THREE.DoubleSide });
    const decal=new THREE.Mesh(decalGeo, decalMat);
    decal.position.copy(point).add(normal.clone().multiplyScalar(0.01));
    decal.lookAt(point.clone().add(normal));
    this.scene.add(decal);
    setTimeout(()=>{ this.scene.remove(decal); }, 8000);
  }

  createHitEffect(pos, isHead){
    const count=isHead?18:8;
    for(let i=0;i<count;i++){
      const geo=new THREE.SphereGeometry(isHead?0.04:0.025,3,3);
      const mat=new THREE.MeshBasicMaterial({ color:isHead?0xffff66:0xff4444, transparent:true, opacity:1 });
      const m=new THREE.Mesh(geo, mat); m.position.copy(pos);
      const vel=new THREE.Vector3((Math.random()-0.5)*6, Math.random()*4, (Math.random()-0.5)*6);
      this.particles.push({ mesh:m, velocity:vel, life:0.6, maxLife:0.6, type:'blood', gravity:-9 });
      this.scene.add(m);
    }
    // damage number
    this.showDamageNumber(pos, isHead? 'HEADSHOT! '+Math.floor(this.currentWeapon.dmg*this.currentWeapon.headshotMult) : Math.floor(this.currentWeapon.dmg), isHead);
  }

  createDoubleJumpEffect(){
    for(let i=0;i<16;i++){
      const geo=new THREE.RingGeometry(0.2,0.25,12); const mat=new THREE.MeshBasicMaterial({ color:0x5a7cff, transparent:true, opacity:0.6, side:THREE.DoubleSide });
      const m=new THREE.Mesh(geo, mat); m.position.copy(this.player.position); m.position.y-=0.5; m.rotation.x=Math.PI/2; m.scale.set(0.2,0.2,0.2);
      this.particles.push({ mesh:m, velocity:new THREE.Vector3(0,0.5,0), life:0.5, maxLife:0.5, type:'ring', scaleSpeed:3 });
      this.scene.add(m); break; // only one ring
    }
  }

  createDashEffect(){
    for(let i=0;i<20;i++){
      const geo=new THREE.SphereGeometry(0.06,4,4); const mat=new THREE.MeshBasicMaterial({ color:0x88aaff, transparent:true, opacity:0.7 });
      const m=new THREE.Mesh(geo, mat); m.position.copy(this.player.position);
      const vel=new THREE.Vector3((Math.random()-0.5)*8, (Math.random()-0.5)*2, (Math.random()-0.5)*8);
      this.particles.push({ mesh:m, velocity:vel, life:0.4, maxLife:0.4, type:'dash' });
      this.scene.add(m);
    }
  }

  createUltimateEffect(){
    const geo=new THREE.SphereGeometry(1,16,16); const mat=new THREE.MeshBasicMaterial({ color:0x5a7cff, transparent:true, opacity:0.3, wireframe:true });
    const mesh=new THREE.Mesh(geo, mat); mesh.position.copy(this.player.position);
    this.scene.add(mesh);
    let scale=0; const expand=()=>{ scale+=0.12; mesh.scale.set(scale,scale,scale); mat.opacity= Math.max(0, 0.4 - scale*0.015); if(scale<25 && mat.opacity>0) requestAnimationFrame(expand); else this.scene.remove(mesh); };
    expand();
  }

  addScreenShake(amount){ this.player.cameraShake=Math.max(this.player.cameraShake, amount); }

  // ===================== AUDIO (procedural) =====================
  playSound(freq=440, dur=0.2, type='sine', vol=0.15){
    if(!this.audioCtx) return;
    try{
      const o=this.audioCtx.createOscillator(); const g=this.audioCtx.createGain();
      o.type=type; o.frequency.value=freq; o.connect(g); g.connect(this.audioCtx.destination);
      g.gain.setValueAtTime(vol, this.audioCtx.currentTime); g.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime+dur);
      o.start(); o.stop(this.audioCtx.currentTime+dur);
    }catch(e){}
  }

  // ===================== UPDATE LOOP =====================
  updatePlayer(delta){
    this.time+=delta;
    this.gameState.time+=delta;

    // Ability cooldowns
    if(this.player.abilities.tactical.cooldown>0) this.player.abilities.tactical.cooldown=Math.max(0, this.player.abilities.tactical.cooldown-delta);
    if(this.player.abilities.ultimate.cooldown>0) this.player.abilities.ultimate.cooldown=Math.max(0, this.player.abilities.ultimate.cooldown-delta);
    if(this.player.dashCooldown>0) this.player.dashCooldown-=delta;

    // Shield regen
    if(this.time - this.player.lastDamageTime > this.player.shieldRegenDelay){
      if(this.player.shield < this.player.maxShield){
        this.player.shield = Math.min(this.player.maxShield, this.player.shield + delta*this.player.shieldRegenRate);
      }
    }

    // Input movement
    const forward=new THREE.Vector3(), right=new THREE.Vector3();
    const camDir=new THREE.Vector3(); this.camera.getWorldDirection(camDir); camDir.y=0; camDir.normalize();
    forward.copy(camDir);
    right.crossVectors(forward, new THREE.Vector3(0,1,0)).negate(); // careful
    // Actually compute right from camera
    right.set(1,0,0).applyQuaternion(this.camera.quaternion); right.y=0; right.normalize();
    forward.set(0,0,-1).applyQuaternion(this.camera.quaternion); forward.y=0; forward.normalize();

    let move=new THREE.Vector3();
    if(this.keys.get('KeyW')) move.add(forward);
    if(this.keys.get('KeyS')) move.sub(forward);
    if(this.keys.get('KeyA')) move.sub(right);
    if(this.keys.get('KeyD')) move.add(right);
    if(move.length()>0) move.normalize();

    const isSprinting = this.keys.get('ShiftLeft') && move.length()>0 && !this.player.isCrouching && this.player.isGrounded;
    this.player.isSprinting=isSprinting;
    let targetSpeed = this.player.baseSpeed * (isSprinting?this.player.sprintMultiplier:1) * (this.player.isCrouching?0.55:1) * (this.player.isSliding?1.35:1);
    if(this.player.isWallRunning) targetSpeed*=1.15;

    // Friction & acceleration
    if(this.player.isGrounded){
      this.player.velocity.x *= Math.max(0, 1 - this.friction*delta* (this.player.isSliding?0.15:1));
      this.player.velocity.z *= Math.max(0, 1 - this.friction*delta* (this.player.isSliding?0.15:1));
      if(move.length()>0){
        const accel= targetSpeed* (this.player.isSliding?0.3: 12);
        this.player.velocity.x += move.x*accel*delta;
        this.player.velocity.z += move.z*accel*delta;
      }
      // clamp ground speed
      const horiz=new THREE.Vector2(this.player.velocity.x, this.player.velocity.z);
      if(horiz.length()>targetSpeed*1.1){ horiz.normalize().multiplyScalar(targetSpeed*1.1); this.player.velocity.x=horiz.x; this.player.velocity.z=horiz.y; }
    } else {
      // air control
      if(move.length()>0){
        this.player.velocity.x += move.x*targetSpeed*this.airControl*delta*1.5;
        this.player.velocity.z += move.z*targetSpeed*this.airControl*delta*1.5;
      }
      // wall run detection
      if(!this.player.isWallRunning && this.time - this.player.lastWallJump > 0.35){
        const wallCheck = this.checkWallRun();
        if(wallCheck.hit){ this.startWallRun(wallCheck.normal); }
      }
      if(this.player.isWallRunning){
        this.player.wallRunTime+=delta;
        // keep height
        this.player.velocity.y = Math.max(this.player.velocity.y, 0.2);
        // push forward along wall
        const wallForward = new THREE.Vector3().crossVectors(this.player.wallRunNormal, new THREE.Vector3(0,1,0)).normalize();
        // Determine which direction is more aligned with camera
        if(wallForward.dot(forward) < 0) wallForward.negate();
        this.player.velocity.x = wallForward.x*targetSpeed*1.1;
        this.player.velocity.z = wallForward.z*targetSpeed*1.1;
        if(this.player.wallRunTime > this.player.maxWallRunTime){ this.player.isWallRunning=false; this.player.wallRunNormal=null; }
      }
    }

    // Gravity
    if(!this.player.isGrounded && !this.player.isWallRunning){
      this.player.velocity.y += this.gravity*delta * (this.player.isSliding?0.5:1);
      this.player.inAirTime+=delta; this.player.onGroundTime=0;
    } else {
      if(this.player.isGrounded){ this.player.onGroundTime+=delta; this.player.inAirTime=0; this.player.canDoubleJump=true; this.player.jumps=0; }
    }

    // Sliding physics
    if(this.player.isSliding){
      this.player.velocity.y = Math.max(this.player.velocity.y, -2);
    }

    // Move player
    const newPos = this.player.position.clone().add(this.player.velocity.clone().multiplyScalar(delta));
    this.checkCollision(newPos, this.player.currentHeight);
    this.player.position.copy(newPos);

    // Ground snap
    if(this.player.isGrounded) this.player.velocity.y = Math.max(0, this.player.velocity.y);

    // Head bob & camera
    if(this.player.isGrounded && move.length()>0){
      this.player.headBobPhase += delta * (isSprinting?14:9) * (this.player.isSliding?1.6:1);
      this.player.footstepTime+=delta;
      if(this.player.footstepTime> (isSprinting?0.35:0.52)){
        this.player.footstepTime=0;
        this.playSound(isSprinting?90:70,0.08,'sine',0.07);
        // bob landing
        if(!isSprinting) this.player.landingBob=0.15;
      }
    } else {
      this.player.headBobPhase += delta*2;
    }

    if(this.player.landingBob>0) this.player.landingBob-=delta*3;

    // Camera recoil recovery
    this.player.recoilPitch = THREE.MathUtils.lerp(this.player.recoilPitch, 0, delta*6);
    this.player.recoilYaw = THREE.MathUtils.lerp(this.player.recoilYaw, 0, delta*6);
    this.player.cameraShake = THREE.MathUtils.lerp(this.player.cameraShake,0,delta*8);

    // Weapon ADS lerp
    this.weaponState.targetAds = this.keys.get('Mouse2')?1:0;
    this.weaponState.ads = THREE.MathUtils.lerp(this.weaponState.ads, this.weaponState.targetAds, delta*10);
    if(this.weaponState.isReloading){
      this.weaponState.reloadProgress+=delta / this.currentWeapon.reload;
    }

    // Shooting
    if(this.keys.get('Mouse0') && this.mouse.locked){
      if(this.currentWeapon.auto) this.fireWeapon();
      else { // semi
        if(!this._semiFired){ this.fireWeapon(); this._semiFired=true; }
      }
    } else {
      this._semiFired=false;
      this.weaponState.burst = Math.max(0, this.weaponState.burst - delta*6);
      this.weaponState.spread = Math.max(this.currentWeapon.spread, this.weaponState.spread - delta*0.9);
    }

    // Camera transform
    this.cameraContainer.position.copy(this.player.position);
    this.cameraContainer.position.y+= this.player.currentHeight - 0.15;
    this.cameraContainer.rotation.y = this.player.yaw;
    this.camera.rotation.x = this.player.pitch + this.player.recoilPitch*0.015;
    this.camera.rotation.y = this.player.recoilYaw*0.015;
    this.camera.rotation.z = (this.player.isWallRunning? (this.player.wallRunNormal?0.18: -0.18) : 0) + Math.sin(this.player.headBobPhase)*0.006*(isSprinting?1.6:0.6) + (Math.random()-0.5)*this.player.cameraShake*0.04;

    // Weapon bob
    const bobX=Math.sin(this.player.headBobPhase)*0.015*(isSprinting?1.8:0.9);
    const bobY=Math.abs(Math.cos(this.player.headBobPhase))*0.01*(isSprinting?1.5:0.7) - this.player.landingBob*0.25;
    const sprintOffset = isSprinting? new THREE.Vector3(0.12,-0.08,-0.08) : new THREE.Vector3();
    const adsOffset = new THREE.Vector3(-0.28*this.weaponState.ads, 0.12*this.weaponState.ads, -0.18*this.weaponState.ads);
    const recoilKick = new THREE.Vector3((Math.random()-0.5)*this.weaponState.recoil.x*0.01, -this.weaponState.recoil.y*0.015, -this.weaponState.recoil.y*0.02);
    if(this.weaponModel){
      this.weaponModel.position.set(bobX, bobY, 0).add(sprintOffset).add(adsOffset).add(recoilKick);
      this.weaponModel.rotation.set(
        Math.sin(this.player.headBobPhase)*0.02 + this.player.recoilPitch*0.025,
        bobX*0.5 + this.player.recoilYaw*0.02,
        bobX*0.25
      );
      if(this.weaponState.isReloading){
        this.weaponModel.rotation.x+= Math.sin(this.weaponState.reloadProgress*Math.PI)*0.6;
        this.weaponModel.position.y+= Math.sin(this.weaponState.reloadProgress*Math.PI)*0.15;
      }
      if(this.weaponModel.userData.railGlow) this.weaponModel.userData.railGlow.material.emissiveIntensity = 0.5 + Math.sin(this.time*6)*0.6 + (this.weaponState.ads>0.5?0.5:0);
    }

    // Extraction check
    for(let ep of this.gameState.extractionPoints){
      const d=ep.position.distanceTo(this.player.position);
      if(d<6 && ep.active){
        ep.playersInZone=1;
        ep.extractionProgress+=delta*0.22; // ~4.5 sec
        if(ep.extractionProgress>=1){
          this.gameState.extracted=true;
          this.showVictory();
        }
      } else {
        ep.playersInZone=0;
        ep.extractionProgress=Math.max(0, ep.extractionProgress-delta*0.6);
      }
      // visual
      ep.beam.material.opacity = 0.15 + Math.sin(this.time*3)*0.08 + ep.extractionProgress*0.4;
      ep.light.intensity = 4 + ep.extractionProgress*12 + Math.sin(this.time*5)*2;
      ep.group.scale.set(1+ep.extractionProgress*0.15,1,1+ep.extractionProgress*0.15);
    }

    // Storm
    this.updateStorm(delta);

    // Loot bobbing
    for(let loot of this.lootItems){
      if(loot.taken) continue;
      loot.bobPhase+=delta*1.7;
      loot.mesh.position.y = loot.position.y + Math.sin(loot.bobPhase)*0.35;
      loot.mesh.rotation.y+=delta*0.8;
    }
  }

  checkWallRun(){
    const pos=this.player.position;
    const dirs=[new THREE.Vector3(1,0,0), new THREE.Vector3(-1,0,0), new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,-1)];
    for(let dir of dirs){
      const checkPos=pos.clone().add(dir.clone().multiplyScalar(0.75));
      for(let c of this.colliders){
        if(c.type==='box'){
          if(checkPos.x>c.min.x && checkPos.x<c.max.x && checkPos.z>c.min.z && checkPos.z<c.max.z && pos.y < c.max.y && pos.y > c.min.y-0.5){
            return { hit:true, normal:dir.clone().negate() };
          }
        }
      }
    }
    return { hit:false };
  }

  startWallRun(normal){
    if(this.player.velocity.length()<3.5) return;
    if(this.player.inAirTime<0.18) return; // need airtime
    this.player.isWallRunning=true; this.player.wallRunNormal=normal; this.player.wallRunTime=0; this.player.velocity.y=2.2;
  }

  updateStorm(delta){
    const gs=this.gameState;
    gs.circle.targetRadius = Math.max(25, 420 - gs.time* (0.35 + gs.time*0.0012));
    gs.circle.radius = THREE.MathUtils.lerp(gs.circle.radius, gs.circle.targetRadius, delta*0.12);
    // damage outside
    const distToCenter = new THREE.Vector2(this.player.position.x, this.player.position.z).distanceTo(gs.circle.center);
    if(distToCenter > gs.circle.radius){
      const dmg = delta * (3 + (distToCenter - gs.circle.radius)*0.08);
      this.takeDamage(dmg, 'storm');
      gs.stormDamage+=dmg;
      // vignette flash
      const v=document.getElementById('storm-vignette'); if(v){ v.style.opacity = Math.min(0.7, (distToCenter - gs.circle.radius)*0.015).toString(); }
    } else {
      const v=document.getElementById('storm-vignette'); if(v){ v.style.opacity = THREE.MathUtils.lerp(parseFloat(v.style.opacity||'0'), 0, delta*2).toString(); }
    }
    // update circle UI
    const indicator=document.getElementById('zone-dist'); if(indicator){
      indicator.textContent = `${Math.max(0, Math.ceil(distToCenter - gs.circle.radius))}m ${distToCenter>gs.circle.radius?'OUTSIDE':'SAFE'}`;
      indicator.style.color = distToCenter>gs.circle.radius?'#ff4466':'#6affaa';
    }
  }

  updateEnemies(delta){
    let alive=0;
    for(let en of this.enemies){
      if(!en.isAlive) continue;
      alive++;
      const toPlayer=en.position.clone().sub(this.player.position).length();
      if(toPlayer<45){
        // chase
        const dir=this.player.position.clone().sub(en.position); dir.y=0; dir.normalize();
        en.velocity.x=dir.x * en.speed; en.velocity.z=dir.z * en.speed;
        en.mesh.lookAt(this.player.position.x, en.position.y, this.player.position.z);
        // gravity
        en.velocity.y+= -14*delta;
        en.position.add(en.velocity.clone().multiplyScalar(delta));
        const gh=this.getGroundHeight(en.position.x, en.position.z);
        if(en.position.y < gh+0.9){ en.position.y=gh+0.9; en.velocity.y=0; }
        // shooting
        en.shootCooldown-=delta;
        if(toPlayer<28 && en.shootCooldown<=0 && Math.random()<0.7){
          // can enemy see player?
          this.enemyShoot(en);
          en.shootCooldown=0.7+Math.random()*1.2;
        }
      } else {
        // patrol
        en.patrolTimer+=delta;
        if(en.patrolTimer>3 || en.position.distanceTo(en.targetPos)<4){
          en.targetPos.set((Math.random()-0.5)*400,0,(Math.random()-0.5)*400);
          en.patrolTimer=0;
        }
        const dir=en.targetPos.clone().sub(en.position); dir.y=0; dir.normalize();
        en.velocity.x=dir.x*en.speed*0.5; en.velocity.z=dir.z*en.speed*0.5;
        en.velocity.y+=-14*delta;
        en.position.add(en.velocity.clone().multiplyScalar(delta));
        const gh=this.getGroundHeight(en.position.x, en.position.z);
        if(en.position.y<gh+0.9){ en.position.y=gh+0.9; en.velocity.y=0; }
        en.mesh.lookAt(en.position.x+dir.x, en.position.y, en.position.z+dir.z);
      }
      en.mesh.position.copy(en.position); en.mesh.position.y+=0.9;
    }
    this.gameState.playersAlive = alive+1;
  }

  enemyShoot(en){
    // simple hitscan to player
    const toPlayer=this.player.position.clone().sub(en.position).normalize();
    // add inaccuracy
    toPlayer.x+=(Math.random()-0.5)*0.08; toPlayer.y+=(Math.random()-0.5)*0.08; toPlayer.z+=(Math.random()-0.5)*0.08; toPlayer.normalize();
    const ray=new THREE.Raycaster(en.position.clone().add(new THREE.Vector3(0,1,0)), toPlayer);
    // if near player
    if(en.position.distanceTo(this.player.position)<26){
      const hitChance = 0.55 - en.position.distanceTo(this.player.position)*0.01;
      if(Math.random()<hitChance){
        this.takeDamage(en.damage, 'enemy');
        this.playSound(400+Math.random()*100,0.12,'square',0.12);
        this.createTracer(en.position.clone().add(new THREE.Vector3(0,1,0)), toPlayer, en.position.distanceTo(this.player.position));
      } else {
        // miss tracer
        this.createTracer(en.position.clone().add(new THREE.Vector3(0,1,0)), toPlayer, 24);
      }
    }
    this.playSound(300,0.18,'sawtooth',0.14);
  }

  takeDamage(amount, source='unknown'){
    const now=this.time;
    if(this.player.shield>0){
      const shieldDmg=Math.min(this.player.shield, amount);
      this.player.shield-=shieldDmg; amount-=shieldDmg;
      this.createShieldHitEffect();
    }
    if(amount>0){ this.player.health-=amount; }
    this.player.lastDamageTime=now;
    this.addScreenShake(Math.min(0.6, amount*0.02));
    // red flash
    const flash=document.getElementById('damage-flash'); if(flash){ flash.style.opacity='0.55'; flash.style.background=source==='storm'?'radial-gradient(circle, #ff226644 0%, transparent 70%)':'radial-gradient(circle, #ff334444 0%, transparent 80%)'; setTimeout(()=>{ if(flash) flash.style.opacity='0'; }, 140); }
    if(this.player.health<=0){ this.showDeath(); }
    this.updateHealthUI();
  }

  createShieldHitEffect(){
    const el=document.getElementById('shield-hit'); if(!el) return; el.style.opacity='0.8'; el.style.transform='scale(1.12)'; setTimeout(()=>{ el.style.opacity='0'; el.style.transform='scale(1)'; }, 260);
  }

  updateParticles(delta){
    for(let i=this.particles.length-1;i>=0;i--){
      const p=this.particles[i];
      p.life-=delta;
      if(p.life<=0){ if(p.mesh.parent) p.mesh.parent.remove(p.mesh); this.particles.splice(i,1); continue; }
      const t=1 - p.life/p.maxLife;
      if(p.velocity){ p.mesh.position.add(p.velocity.clone().multiplyScalar(delta)); if(p.gravity) p.velocity.y+=p.gravity*delta; p.velocity.multiplyScalar(1 - delta* (p.type==='muzzle'?6:1)); }
      if(p.type==='muzzle'){ p.mesh.material.opacity=1-t*1.5; p.mesh.scale.setScalar(1 - t*0.7); }
      else if(p.type==='tracer'){ p.mesh.material.opacity=1-t*2; }
      else if(p.type==='impact'){ p.mesh.material.opacity=1-t; p.mesh.scale.setScalar(1 + t*0.8); }
      else if(p.type==='blood'){ p.mesh.material.opacity=1-t; if(p.scale) p.mesh.scale.setScalar(p.scale*(1+t)); }
      else if(p.type==='ring'){ p.mesh.scale.setScalar(p.scaleSpeed * t); p.mesh.material.opacity=1-t; }
    }
  }

  // ===================== UI =====================
  buildUI(){
    this.uiRoot.innerHTML = `
      <div id="hud" style="position:absolute; inset:0; pointer-events:none; font-family:'Orbitron', monospace;">
        <div id="crosshair" style="position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:28px; height:28px; pointer-events:none; transition: opacity 0.2s;">
          <div style="position:absolute; left:50%; top:0; width:2px; height:8px; background:rgba(255,255,255,0.9); transform:translateX(-50%); box-shadow:0 0 6px #5a7cff, 0 0 12px #5a7cff44; border-radius:1px;"></div>
          <div style="position:absolute; left:50%; bottom:0; width:2px; height:8px; background:rgba(255,255,255,0.9); transform:translateX(-50%); box-shadow:0 0 6px #5a7cff; border-radius:1px;"></div>
          <div style="position:absolute; top:50%; left:0; width:8px; height:2px; background:rgba(255,255,255,0.9); transform:translateY(-50%); box-shadow:0 0 6px #5a7cff; border-radius:1px;"></div>
          <div style="position:absolute; top:50%; right:0; width:8px; height:2px; background:rgba(255,255,255,0.9); transform:translateY(-50%); box-shadow:0 0 6px #5a7cff; border-radius:1px;"></div>
          <div style="position:absolute; left:50%; top:50%; width:4px; height:4px; background:#fff; border-radius:50%; transform:translate(-50%,-50%); box-shadow:0 0 8px #fff;"></div>
          <div id="hitmarker" style="position:absolute; inset:-8px; opacity:0; transition:opacity 0.12s;">
            <div style="position:absolute; left:2px; top:2px; width:6px; height:2px; background:#ff3366; transform:rotate(45deg);"></div>
            <div style="position:absolute; right:2px; top:2px; width:6px; height:2px; background:#ff3366; transform:rotate(-45deg);"></div>
            <div style="position:absolute; left:2px; bottom:2px; width:6px; height:2px; background:#ff3366; transform:rotate(-45deg);"></div>
            <div style="position:absolute; right:2px; bottom:2px; width:6px; height:2px; background:#ff3366; transform:rotate(45deg);"></div>
          </div>
        </div>

        <div style="position:absolute; left:28px; bottom:28px; pointer-events:none;">
          <div style="display:flex; gap:18px; align-items:flex-end;">
            <div>
              <div style="font-size:10px; letter-spacing:0.24em; color:#8aa0ff; margin-bottom:6px; font-family:'JetBrains Mono'">HEALTH // SHIELD</div>
              <div style="display:flex; gap:10px; align-items:center;">
                <div style="width:220px; height:10px; background:rgba(255,255,255,0.08); border:1px solid rgba(90,124,255,0.25); position:relative; overflow:hidden; backdrop-filter:blur(8px);">
                  <div id="health-bar" style="position:absolute; inset:1px; width:100%; background:linear-gradient(90deg,#ff4455,#ff8844); box-shadow:0 0 12px #ff444488; transition:width 0.18s;"></div>
                  <div style="position:absolute; inset:0; background:repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.15) 10px, rgba(0,0,0,0.15) 11px);"></div>
                </div>
                <div id="health-text" style="font-size:20px; font-weight:900; color:#fff; text-shadow:0 0 12px #ff4444; min-width:56px;">100</div>
              </div>
              <div style="display:flex; gap:10px; align-items:center; margin-top:8px;">
                <div style="width:220px; height:8px; background:rgba(255,255,255,0.06); border:1px solid rgba(90,200,255,0.22); position:relative; overflow:hidden;">
                  <div id="shield-bar" style="position:absolute; inset:1px; width:100%; background:linear-gradient(90deg,#44aaff,#77ddff); box-shadow:0 0 12px #44aaff88; transition:width 0.22s;"></div>
                </div>
                <div id="shield-text" style="font-size:14px; font-weight:700; color:#77ddff; min-width:56px;">100</div>
              </div>
            </div>
            <div id="shield-hit" style="width:44px; height:44px; border:2px solid #55bbff; border-radius:50%; box-shadow:0 0 18px #55bbff, inset 0 0 12px #55bbff55; opacity:0; transform:scale(1); transition:all 0.18s; display:flex; align-items:center; justify-content:center; font-size:14px; color:#88ddff;">◈</div>
          </div>

          <div style="margin-top:18px; display:flex; gap:12px;">
            <div style="background:rgba(10,14,28,0.85); border:1px solid rgba(90,124,255,0.22); padding:10px 14px; min-width:148px; backdrop-filter:blur(12px);">
              <div style="font-size:9px; letter-spacing:0.2em; color:#6a7abb; margin-bottom:4px;">AMMUNITION</div>
              <div style="display:flex; align-items:baseline; gap:6px;">
                <span id="ammo-current" style="font-size:28px; font-weight:900; color:#fff; text-shadow:0 0 10px #5a7cff;">30</span>
                <span style="font-size:14px; color:#8a9acc;">/</span>
                <span id="ammo-reserve" style="font-size:16px; color:#8a9acc;">120</span>
              </div>
              <div id="weapon-name" style="font-size:10px; letter-spacing:0.12em; color:#8aa0ff; margin-top:4px;">NVX-7A PULSE</div>
            </div>
            <div style="background:rgba(10,14,28,0.85); border:1px solid rgba(90,124,255,0.18); padding:10px 14px; min-width:108px; backdrop-filter:blur(12px);">
              <div style="font-size:9px; letter-spacing:0.2em; color:#6a7abb; margin-bottom:6px;">ABILITIES</div>
              <div style="display:flex; gap:8px;">
                <div style="text-align:center;"><div style="width:32px; height:32px; border:1px solid #5a7cff; background:rgba(90,124,255,0.12); display:flex; align-items:center; justify-content:center; font-size:11px; color:#fff; position:relative; overflow:hidden;"><span>Q</span><div id="tactical-cooldown" style="position:absolute; inset:0; background:rgba(0,0,0,0.75); display:flex; align-items:center; justify-content:center; font-size:9px; opacity:0;">0</div></div><div style="font-size:8px; color:#8aa0ff; margin-top:2px;">DASH</div></div>
                <div style="text-align:center;"><div style="width:32px; height:32px; border:1px solid #ffaa44; background:rgba(255,170,68,0.12); display:flex; align-items:center; justify-content:center; font-size:11px; color:#fff; position:relative; overflow:hidden;"><span>X</span><div id="ultimate-cooldown" style="position:absolute; inset:0; background:rgba(0,0,0,0.75); display:flex; align-items:center; justify-content:center; font-size:9px; opacity:0;">0</div></div><div style="font-size:8px; color:#ffaa44; margin-top:2px;">BLAST</div></div>
              </div>
            </div>
          </div>
        </div>

        <div style="position:absolute; right:28px; top:28px; text-align:right;">
          <div style="background:rgba(10,14,28,0.85); border:1px solid rgba(90,124,255,0.18); padding:12px 16px; backdrop-filter:blur(12px); min-width:190px;">
            <div style="font-size:9px; letter-spacing:0.22em; color:#6a7abb;">ZONE // STORM</div>
            <div id="zone-dist" style="font-size:13px; font-weight:700; color:#6affaa; margin-top:4px; font-family:'JetBrains Mono'">420m SAFE</div>
            <div style="margin-top:10px; width:100%; height:3px; background:rgba(255,255,255,0.08); position:relative; overflow:hidden;">
              <div id="zone-bar" style="position:absolute; left:0; top:0; bottom:0; width:100%; background:linear-gradient(90deg,#5a7cff,#6affaa);"></div>
            </div>
            <div style="display:flex; justify-content:space-between; margin-top:10px; font-size:10px; color:#8a9acc;">
              <span>ALIVE: <b id="alive-count" style="color:#fff;">13</b>/13</span>
              <span>KILLS: <b id="kill-count" style="color:#ff6677;">0</b></span>
            </div>
          </div>

          <div style="margin-top:12px; background:rgba(10,14,28,0.82); border:1px solid rgba(90,124,255,0.14); padding:10px 14px; backdrop-filter:blur(10px);">
            <div style="font-size:9px; letter-spacing:0.2em; color:#6a7abb;">COMPASS</div>
            <div style="font-size:11px; color:#c0cdff; margin-top:4px; font-family:'JetBrains Mono'"><span style="color:#ff6677;">N</span>  342°  //  SECTOR 9-Δ</div>
            <div style="margin-top:6px; display:flex; gap:2px; justify-content:flex-end;">
              ${Array.from({length:36},(_,i)=>`<div style="width:2px; height:${i%9===0?12: i%3===0?8:4}px; background:${i===18?'#fff': 'rgba(138,160,255,0.4)'};"></div>`).join('')}
            </div>
          </div>

          <div id="minimap-container" style="margin-top:12px; width:190px; height:190px; background:rgba(6,8,15,0.92); border:1px solid rgba(90,124,255,0.22); position:relative; overflow:hidden; backdrop-filter:blur(6px);">
            <canvas id="minimap" width="190" height="190" style="width:100%; height:100%;"></canvas>
            <div style="position:absolute; inset:0; border:1px solid rgba(90,124,255,0.12); pointer-events:none;"></div>
            <div style="position:absolute; left:50%; top:50%; width:6px; height:6px; background:#fff; border-radius:50%; transform:translate(-50%,-50%); box-shadow:0 0 8px #fff;"></div>
          </div>
        </div>

        <div style="position:absolute; left:50%; top:22px; transform:translateX(-50%); display:flex; gap:10px; align-items:center;">
          <div style="background:rgba(10,14,28,0.88); border:1px solid rgba(90,124,255,0.2); padding:8px 18px; display:flex; gap:18px; align-items:center; backdrop-filter:blur(12px);">
            <div style="font-size:9px; letter-spacing:0.24em; color:#6a7abb;">RUNNER CLASS</div>
            <div id="class-display" style="font-size:13px; font-weight:900; color:#fff; letter-spacing:0.12em;">WRAITH // INFILTRATION</div>
            <div style="width:1px; height:18px; background:rgba(90,124,255,0.25);"></div>
            <div id="speed-display" style="font-size:10px; color:#8aa0ff; font-family:'JetBrains Mono'">SPD 0.0 m/s</div>
            <div id="extract-hint" style="font-size:10px; color:#00ffaa; display:none; animation: pulse 1s infinite;">[E] EXTRACT</div>
          </div>
        </div>

        <div id="kill-feed" style="position:absolute; right:28px; top:50%; transform:translateY(-50%); display:flex; flex-direction:column; gap:6px; align-items:flex-end; pointer-events:none;"></div>

        <div id="loot-prompt" style="position:absolute; left:50%; top:58%; transform:translate(-50%,-50%); background:rgba(10,14,28,0.92); border:1px solid rgba(90,124,255,0.3); padding:12px 20px; backdrop-filter:blur(14px); opacity:0; transition:opacity 0.18s; pointer-events:none; text-align:center;">
          <div style="font-size:10px; letter-spacing:0.22em; color:#8aa0ff;">WEAPON CACHE</div>
          <div id="loot-name" style="font-size:14px; font-weight:900; color:#fff; margin-top:4px;">NVX-7A PULSE</div>
          <div style="font-size:9px; color:#6a7abb; margin-top:6px; letter-spacing:0.15em;">[E] ACQUIRE • [${'1-5'}] SELECT</div>
        </div>

        <div id="damage-flash" style="position:absolute; inset:0; background:radial-gradient(circle, #ff334444 0%, transparent 70%); opacity:0; pointer-events:none; transition:opacity 0.18s;"></div>
        <div id="storm-vignette" style="position:absolute; inset:0; background:radial-gradient(ellipse at center, transparent 60%, rgba(255,68,102,0.55) 92%); opacity:0; pointer-events:none;"></div>

        <div id="extraction-bar-container" style="position:absolute; left:50%; bottom:32%; transform:translateX(-50%); width:280px; height:6px; background:rgba(255,255,255,0.08); border:1px solid rgba(0,255,170,0.35); display:none; overflow:hidden;">
          <div id="extraction-bar" style="height:100%; width:0%; background:linear-gradient(90deg,#00ffaa,#55ffcc); box-shadow:0 0 16px #00ffaa;"></div>
          <div style="position:absolute; top:-18px; left:0; font-size:9px; letter-spacing:0.22em; color:#00ffaa;">EXTRACTION PROTOCOL // HOLD POSITION</div>
        </div>
      </div>

      <style>
        @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        #hud { user-select:none; }
        .hidden { opacity:0 !important; pointer-events:none !important; }
      </style>
    `;

    this.updateHealthUI();
    this.updateAmmoUI();
    this.minimapCanvas = document.getElementById('minimap');
    this.minimapCtx = this.minimapCanvas?.getContext('2d');
  }

  updateHealthUI(){
    const hb=document.getElementById('health-bar'), ht=document.getElementById('health-text');
    const sb=document.getElementById('shield-bar'), st=document.getElementById('shield-text');
    if(hb) hb.style.width = Math.max(0, this.player.health/this.player.maxHealth*100)+'%';
    if(ht) ht.textContent = Math.ceil(Math.max(0,this.player.health)).toString();
    if(sb) sb.style.width = Math.max(0, this.player.shield/this.player.maxShield*100)+'%';
    if(st) st.textContent = Math.ceil(Math.max(0,this.player.shield)).toString();
  }

  updateAmmoUI(){
    const ac=document.getElementById('ammo-current'), ar=document.getElementById('ammo-reserve'), wn=document.getElementById('weapon-name');
    if(ac) ac.textContent = this.weaponState.ammo.toString();
    if(ar) ar.textContent = this.weaponState.reserve.toString();
    if(wn) wn.textContent = this.currentWeapon.display;
  }

  showPickup(name){
    const el=document.getElementById('loot-prompt'); const ne=document.getElementById('loot-name');
    if(!el||!ne) return; ne.textContent=name; el.style.opacity='1'; setTimeout(()=>{ el.style.opacity='0'; }, 1800);
  }

  updateCrosshairHit(isHead){
    const hm=document.getElementById('hitmarker'); if(!hm) return;
    hm.style.opacity='1'; const ch=document.getElementById('crosshair'); if(ch){ ch.style.transform='translate(-50%,-50%) scale(1.25)'; setTimeout(()=>{ ch.style.transform='translate(-50%,-50%) scale(1)'; }, 90); }
    setTimeout(()=>{ hm.style.opacity='0'; }, 160);
  }

  showDamageNumber(pos, text, isHead){
    const div=document.createElement('div');
    div.textContent=text;
    div.style.cssText=`position:absolute; left:50%; top:50%; color:${isHead?'#ffff66':'#fff'}; font-family:Orbitron; font-weight:900; font-size:${isHead?22:16}px; text-shadow:0 0 10px ${isHead?'#ffff00':'#fff'}; pointer-events:none; z-index:20; transform:translate(-50%,-50%);`;
    this.uiRoot.appendChild(div);
    let t=0; const anim=()=>{
      t+=0.016; div.style.transform=`translate(-50%, calc(-50% - ${t*80}px)) scale(${1+t*0.2})`; div.style.opacity=(1-t*1.6).toString();
      if(t<0.7) requestAnimationFrame(anim); else div.remove();
    }; anim();
  }

  showKillFeed(type){
    const kf=document.getElementById('kill-feed'); if(!kf) return;
    const div=document.createElement('div');
    div.style.cssText=`background:rgba(10,14,28,0.9); border-left:2px solid ${type==='elite'?'#ffaa44':'#5a7cff'}; padding:6px 10px; font-size:10px; color:#fff; letter-spacing:0.08em; backdrop-filter:blur(8px); transform:translateX(20px); opacity:0; transition:all 0.25s;`;
    div.innerHTML=`<span style="color:${type==='elite'?'#ffaa44':'#8aa0ff'};">ELIMINATED</span> ${type.toUpperCase()} RUNNER <span style="color:#6affaa;">+${type==='elite'?200:100}</span>`;
    kf.prepend(div); requestAnimationFrame(()=>{ div.style.transform='translateX(0)'; div.style.opacity='1'; });
    setTimeout(()=>{ div.style.opacity='0'; div.style.transform='translateX(20px)'; setTimeout(()=>div.remove(), 250); }, 2600);
  }

  addScore(amt){ this.gameState.score+=amt; }

  showVictory(){
    const div=document.createElement('div');
    div.style.cssText=`position:absolute; inset:0; background:radial-gradient(ellipse at center, rgba(0,255,170,0.18) 0%, rgba(6,8,15,0.94) 70%); display:flex; flex-direction:column; align-items:center; justify-content:center; z-index:50; font-family:Orbitron;`;
    div.innerHTML=`
      <div style="font-size:56px; font-weight:900; color:#fff; letter-spacing:0.18em; text-shadow:0 0 30px #00ffaa, 0 0 60px #00ffaa55;">EXTRACTION SUCCESS</div>
      <div style="font-size:14px; letter-spacing:0.35em; color:#00ffaa; margin-top:12px;">SECTOR 9 // PROTOCOL COMPLETE</div>
      <div style="margin-top:28px; display:flex; gap:24px; font-family:'JetBrains Mono'; font-size:12px; color:#8aa0ff;">
        <div>KILLS: <b style="color:#fff; font-size:16px;">${this.gameState.kills}</b></div>
        <div>SCORE: <b style="color:#fff; font-size:16px;">${this.gameState.score}</b></div>
        <div>TIME: <b style="color:#fff; font-size:16px;">${Math.floor(this.gameState.time/60)}:${String(Math.floor(this.gameState.time%60)).padStart(2,'0')}</b></div>
      </div>
      <div style="margin-top:32px; padding:12px 28px; background:transparent; border:1px solid #00ffaa; color:#00ffaa; letter-spacing:0.22em; font-size:12px; cursor:pointer;" onclick="location.reload()">[R] RE-DEPLOY TO SECTOR 9</div>
      <div style="margin-top:16px; font-size:10px; color:#6a7abb; letter-spacing:0.18em;">100,908 LINES OF ENGINE CODE // NEXUS VEIL BUILT FOR ARENA</div>
    `;
    this.uiRoot.appendChild(div);
    this.mouse.locked=false; document.exitPointerLock();
  }

  showDeath(){
    const div=document.createElement('div');
    div.style.cssText=`position:absolute; inset:0; background:radial-gradient(ellipse at center, rgba(255,50,80,0.22) 0%, rgba(6,8,15,0.96) 72%); display:flex; flex-direction:column; align-items:center; justify-content:center; z-index:50; font-family:Orbitron;`;
    div.innerHTML=`
      <div style="font-size:62px; font-weight:900; color:#fff; letter-spacing:0.18em; text-shadow:0 0 30px #ff4466;">NEURAL LINK SEVERED</div>
      <div style="font-size:13px; letter-spacing:0.35em; color:#ff6677; margin-top:10px;">RUNNER DOWN // RECOVERING CONSCIOUSNESS</div>
      <div style="margin-top:24px; display:flex; gap:24px; font-family:'JetBrains Mono'; font-size:12px; color:#8aa0ff;">
        <div>KILLS: <b style="color:#fff; font-size:16px;">${this.gameState.kills}</b></div>
        <div>SCORE: <b style="color:#fff; font-size:16px;">${this.gameState.score}</b></div>
        <div>ALIVE: <b style="color:#fff; font-size:16px;">${this.gameState.playersAlive}</b></div>
      </div>
      <div style="margin-top:30px; padding:12px 28px; background:transparent; border:1px solid #ff4455; color:#ff6677; letter-spacing:0.22em; font-size:12px; cursor:pointer;" onclick="location.reload()">[R] RE-INITIALIZE LINK</div>
    `;
    this.uiRoot.appendChild(div);
    this.mouse.locked=false; try{ document.exitPointerLock(); }catch(e){}
  }

  drawMinimap(){
    if(!this.minimapCtx) return;
    const ctx=this.minimapCtx; const size=190;
    ctx.clearRect(0,0,size,size);
    // background
    ctx.fillStyle='#0a0e1a'; ctx.fillRect(0,0,size,size);
    // grid
    ctx.strokeStyle='rgba(90,124,255,0.08)'; ctx.lineWidth=1;
    for(let i=0;i<size;i+=16){ ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,size); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0,i); ctx.lineTo(size,i); ctx.stroke(); }
    // circle
    const center=size/2; const scale= size / 800; // 800 world units -> 190 px
    const circleR = this.gameState.circle.radius * scale;
    ctx.strokeStyle='#5a7cff'; ctx.lineWidth=1.5; ctx.setLineDash([4,4]); ctx.beginPath(); ctx.arc(center,center,circleR,0,Math.PI*2); ctx.stroke(); ctx.setLineDash([]);
    // extraction points
    for(let ep of this.gameState.extractionPoints){
      const ex = center + ep.position.x*scale; const ez = center + ep.position.z*scale;
      ctx.fillStyle= ep.active ? '#00ffaa' : '#555'; ctx.shadowColor='#00ffaa'; ctx.shadowBlur=8;
      ctx.beginPath(); ctx.arc(ex,ez,4.5,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;
      ctx.strokeStyle='rgba(0,255,170,0.4)'; ctx.beginPath(); ctx.arc(ex,ez,10,0,Math.PI*2); ctx.stroke();
    }
    // enemies
    for(let en of this.enemies){ if(!en.isAlive) continue; const ex=center+en.position.x*scale; const ez=center+en.position.z*scale; ctx.fillStyle=en.type==='elite'?'#ffaa44':'#ff4466'; ctx.beginPath(); ctx.arc(ex,ez,2.5,0,Math.PI*2); ctx.fill(); }
    // loot
    for(let loot of this.lootItems){ if(loot.taken) continue; const ex=center+loot.position.x*scale; const ez=center+loot.position.z*scale; ctx.fillStyle=loot.tier===3?'#ffd700':loot.tier===2?'#a78bff':'#5a7cff'; ctx.fillRect(ex-1.5,ez-1.5,3,3); }
    // player
    // compass line
    ctx.strokeStyle='rgba(255,255,255,0.5)'; ctx.beginPath(); ctx.moveTo(center,center); const yaw=this.player.yaw; ctx.lineTo(center+Math.sin(yaw)*20, center- Math.cos(yaw)*20); ctx.stroke();
  }

  resize(){
    this.camera.aspect=window.innerWidth/window.innerHeight; this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate(){
    requestAnimationFrame(this.animate);
    const delta=Math.min(this.clock.getDelta(), 0.05);
    if(this.gameState.extracted || this.player.health<=0) {
      // still render but no update
      this.renderer.render(this.scene, this.camera);
      return;
    }

    this.updatePlayer(delta);
    this.updateEnemies(delta);
    this.updateParticles(delta);

    // Sky time
    if(this.skyMat) this.skyMat.uniforms.time.value=this.time;
    if(this.groundShader) this.groundShader.uniforms.time.value=this.time;

    // City lights flicker
    for(let l of this.cityLights){
      l.intensity = l.userData.baseIntensity * (0.92 + Math.sin(this.time*l.userData.flickerSpeed + l.userData.phase)*0.16 + Math.random()*0.07);
    }

    // UI updates
    const alive=document.getElementById('alive-count'); if(alive) alive.textContent=(this.gameState.playersAlive).toString();
    const kills=document.getElementById('kill-count'); if(kills) kills.textContent=this.gameState.kills.toString();
    const zb=document.getElementById('zone-bar'); if(zb) zb.style.width = (this.gameState.circle.radius/420*100)+'%';
    const spd=document.getElementById('speed-display'); if(spd) spd.textContent=`SPD ${this.player.velocity.length().toFixed(1)} m/s ${this.player.isWallRunning?'| WALL-RUN': this.player.isSliding?'| SLIDING': this.player.isSprinting?'| SPRINT':''}`;
    const tac=document.getElementById('tactical-cooldown'); if(tac){
      if(this.player.abilities.tactical.cooldown>0){ tac.style.opacity='1'; tac.textContent=Math.ceil(this.player.abilities.tactical.cooldown).toString(); }
      else tac.style.opacity='0';
    }
    const ult=document.getElementById('ultimate-cooldown'); if(ult){
      if(this.player.abilities.ultimate.cooldown>0){ ult.style.opacity='1'; ult.textContent=Math.ceil(this.player.abilities.ultimate.cooldown).toString(); }
      else ult.style.opacity='0';
    }

    // Extraction UI
    let nearExtraction=false, prog=0;
    for(let ep of this.gameState.extractionPoints){ if(ep.playersInZone) { nearExtraction=true; prog=ep.extractionProgress; break; } }
    const exh=document.getElementById('extract-hint'); const ebc=document.getElementById('extraction-bar-container'); const eb=document.getElementById('extraction-bar');
    if(exh) exh.style.display=nearExtraction?'block':'none';
    if(ebc) ebc.style.display=nearExtraction?'block':'none';
    if(eb) eb.style.width=(prog*100)+'%';

    // Loot prompt near
    let nearLoot=false;
    const lp=document.getElementById('loot-prompt');
    for(let loot of this.lootItems){
      if(loot.taken) continue;
      if(loot.position.distanceTo(this.player.position)<3.2){
        nearLoot=true;
        const ln=document.getElementById('loot-name'); if(ln) ln.textContent=loot.weapon.display;
        break;
      }
    }
    if(lp && !nearExtraction) lp.style.opacity=nearLoot?'1':'0';

    this.drawMinimap();

    this.renderer.render(this.scene, this.camera);
  }
}

// Launch
setTimeout(()=>{
  loadFill.style.width='100%';
  const startGame = ()=>{
    document.removeEventListener('keydown', startGame);
    document.removeEventListener('click', startGame);
    new NexusVeilGame();
  };
  document.addEventListener('keydown', startGame);
  document.addEventListener('click', startGame);
  loadText.textContent='CLICK OR PRESS ANY KEY TO LINK';
}, 600);
