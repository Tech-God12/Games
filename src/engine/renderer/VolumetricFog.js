
import * as THREE from 'three';
export class VolumetricFog {
  constructor(){
    this.enabled=true;
    this.density=0.015;
    this.heightFalloff=0.02;
    this.scattering=0.4;
    this.extinction=0.12;
    this.sunColor=new THREE.Color(0xffcc88);
    this.ambientColor=new THREE.Color(0x334455);
    this.noiseScale=0.08;
    this.windSpeed=0.5;
    this.time=0;
    this.createMaterial();
  }
  createMaterial(){
    this.material=new THREE.ShaderMaterial({
      uniforms:{
        tDepth:{value:null},
        tNoise:{value:null},
        cameraNear:{value:0.1},
        cameraFar:{value:1000},
        time:{value:0},
        fogDensity:{value:this.density},
        sunDirection:{value:new THREE.Vector3(0.3,0.8,0.2).normalize()},
        sunColor:{value:this.sunColor},
        ambientColor:{value:this.ambientColor},
        invProjection:{value:new THREE.Matrix4()},
        invView:{value:new THREE.Matrix4()}
      },
      vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position,1.0); }',
      fragmentShader: `
        uniform sampler2D tDepth;
        uniform float time;
        uniform float fogDensity;
        uniform vec3 sunDirection;
        uniform vec3 sunColor;
        uniform vec3 ambientColor;
        varying vec2 vUv;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5); }
        float noise(vec2 p){
          vec2 i=floor(p); vec2 f=fract(p);
          float a=hash(i); float b=hash(i+vec2(1.,0.)); float c=hash(i+vec2(0.,1.)); float d=hash(i+vec2(1.,1.));
          vec2 u=f*f*(3.-2.*f);
          return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;
        }
        float fbm(vec2 p){
          float v=0.; float a=0.5;
          for(int i=0;i<4;i++){ v+=a*noise(p); p*=2.0; a*=0.5; }
          return v;
        }
        void main(){
          float depth=texture2D(tDepth, vUv).r;
          float linearDepth = (2.0*0.1*1000.0)/(1000.0+0.1-depth*(1000.0-0.1));
          vec3 worldPos = vec3(vUv*2.0-1.0, depth)*linearDepth*0.01;
          float heightFactor = exp(-max(worldPos.y,0.0)*0.02);
          float noiseVal = fbm(vUv*4.0 + time*0.05)*0.5+0.5;
          float fog = 1.0 - exp(-linearDepth*fogDensity*heightFactor*noiseVal*1.5);
          float sunScattering = pow(max(dot(normalize(worldPos), sunDirection),0.0), 8.0);
          vec3 fogColor = mix(ambientColor, sunColor, sunScattering*0.6);
          gl_FragColor=vec4(fogColor, fog*0.5);
        }
      `,
      transparent:true, depthWrite:false, depthTest:false
    });
  }
  update(time, camera){
    this.time=time;
    this.material.uniforms.time.value=time;
    this.material.uniforms.fogDensity.value=this.density + Math.sin(time*0.1)*0.002;
  }
  setDensity(d){ this.density=d; this.material.uniforms.fogDensity.value=d; }
}
