import * as THREE from 'three';
export class LensDistortionPass {
  constructor(){ this.enabled=true; this.intensity=1.0; this.uniforms={ time:{value:0}, intensity:{value:1}, resolution:{value:new THREE.Vector2(window.innerWidth, window.innerHeight)} }; this.material=null; this.initMaterial(); }
  initMaterial(){
    this.vertexShader=`varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`;
    this.fragmentShader=`
      uniform float time; uniform float intensity; uniform vec2 resolution; varying vec2 vUv;
      // LensDistortionPass - complex shader logic
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
      float noise(vec2 p){ vec2 i=floor(p); vec2 f=fract(p); float a=hash(i); float b=hash(i+vec2(1.,0.)); float c=hash(i+vec2(0.,1.)); float d=hash(i+vec2(1.,1.)); vec2 u=f*f*(3.-2.*f); return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y; }
      void main(){
        vec2 uv=vUv;
        // LensDistortionPass effect
        vec3 color=vec3(0.);
        for(int i=0;i<8;i++){
          float fi=float(i);
          uv+= vec2(noise(uv*3.+time*0.1+fi*0.5)*0.002*intensity);
          color+= vec3(noise(uv*5.+fi))*0.125;
        }
        gl_FragColor=vec4(color*intensity,1.);
      }`;
    this.material=new THREE.ShaderMaterial({ uniforms:this.uniforms, vertexShader:this.vertexShader, fragmentShader:this.fragmentShader });
  }
  render(scene,camera,delta){ this.uniforms.time.value+=delta; }
  setIntensity(v){ this.intensity=v; this.uniforms.intensity.value=v; }
}
