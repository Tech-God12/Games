
import * as THREE from 'three';
/**
 * NEXUS VEIL - Core Engine
 * High performance custom engine with fixed timestep, ECS, and layered rendering
 */
export class Engine {
  constructor(container) {
    this.container = container;
    this.clock = new THREE.Clock();
    this.fixedTimeStep = 1/120;
    this.accumulator = 0;
    this.timeScale = 1.0;
    this.isRunning = false;
    this.systems = [];
    this.renderSystems = [];
    this.preUpdateHooks = [];
    this.postUpdateHooks = [];
    this.stats = { fps: 0, frameTime: 0, tickTime: 0, renderTime: 0, entities: 0 };
    this.frameCount = 0;
    this.lastFpsUpdate = 0;
    this.deltaBuffer = [];
    this.smoothedDelta = 1/60;
    this.maxDelta = 0.1;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 4000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance', stencil: false, depth: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    container.appendChild(this.renderer.domElement);
    this.setupResize();
  }
  setupResize(){ window.addEventListener('resize', ()=>{ this.camera.aspect=window.innerWidth/window.innerHeight; this.camera.updateProjectionMatrix(); this.renderer.setSize(window.innerWidth, window.innerHeight); }); }
  addSystem(sys, isRender=false){ if(isRender) this.renderSystems.push(sys); else this.systems.push(sys); sys.engine=this; if(sys.init) sys.init(); }
  addPreHook(fn){ this.preUpdateHooks.push(fn); }
  addPostHook(fn){ this.postUpdateHooks.push(fn); }
  start(){ this.isRunning=true; this.clock.start(); this.loop(); }
  stop(){ this.isRunning=false; }
  loop(){
    if(!this.isRunning) return;
    requestAnimationFrame(()=>this.loop());
    const rawDelta = Math.min(this.clock.getDelta()*this.timeScale, this.maxDelta);
    this.deltaBuffer.push(rawDelta); if(this.deltaBuffer.length>20) this.deltaBuffer.shift();
    this.smoothedDelta = this.deltaBuffer.reduce((a,b)=>a+b,0)/this.deltaBuffer.length;
    this.accumulator += rawDelta;
    const t0=performance.now();
    for(const hook of this.preUpdateHooks) hook(rawDelta);
    let ticks=0;
    while(this.accumulator>=this.fixedTimeStep && ticks<8){
      for(const sys of this.systems) if(sys.fixedUpdate) sys.fixedUpdate(this.fixedTimeStep);
      this.accumulator-=this.fixedTimeStep; ticks++;
    }
    for(const sys of this.systems) if(sys.update) sys.update(this.smoothedDelta);
    const tickTime=performance.now()-t0;
    for(const hook of this.postUpdateHooks) hook(this.smoothedDelta);
    const r0=performance.now();
    for(const sys of this.renderSystems) if(sys.render) sys.render(this.smoothedDelta);
    else this.renderer.render(this.scene, this.camera);
    const renderTime=performance.now()-r0;
    this.frameCount++; this.stats.frameTime=rawDelta*1000; this.stats.tickTime=tickTime; this.stats.renderTime=renderTime;
    if(performance.now()-this.lastFpsUpdate>500){ this.stats.fps=Math.round(1/this.smoothedDelta); this.lastFpsUpdate=performance.now(); }
  }
}
