
import * as THREE from 'three';
export class ScreenSpaceReflections {
  constructor(){
    this.enabled=true;
    this.maxDistance=40;
    this.thickness=0.3;
    this.opacity=0.5;
    this.rayStep=0.2;
    this.binarySearchSteps=5;
    this.fresnel=true;
    this.createMaterial();
  }
  createMaterial(){
    this.material=new THREE.ShaderMaterial({
      uniforms:{
        tDiffuse:{value:null},
        tNormal:{value:null},
        tDepth:{value:null},
        cameraNear:{value:0.1},
        cameraFar:{value:1000},
        projectionMatrix:{value:new THREE.Matrix4()},
        invProjectionMatrix:{value:new THREE.Matrix4()},
        viewMatrix:{value:new THREE.Matrix4()},
        maxDistance:{value:this.maxDistance},
        thickness:{value:this.thickness},
        opacity:{value:this.opacity}
      },
      vertexShader:'varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position,1.0); }',
      fragmentShader:`
        uniform sampler2D tDiffuse; uniform sampler2D tDepth; uniform sampler2D tNormal;
        uniform float maxDistance; uniform float thickness; uniform float opacity;
        varying vec2 vUv;
        vec3 viewPos(float depth, vec2 uv){
          float z = depth*2.0-1.0;
          vec4 clip = vec4(uv*2.0-1.0, z, 1.0);
          vec4 view = vec4(0.0);
          // simplified
          view = clip;
          return view.xyz;
        }
        void main(){
          float depth=texture2D(tDepth, vUv).r;
          vec3 normal=texture2D(tNormal, vUv).xyz*2.0-1.0;
          vec3 viewPos0=viewPos(depth, vUv);
          vec3 reflectDir = reflect(normalize(viewPos0), normal);
          vec3 rayStart=viewPos0+reflectDir*0.01;
          vec3 rayEnd=rayStart+reflectDir*maxDistance;
          vec2 hitUv=vUv;
          float hit=false;
          for(int i=0;i<32;i++){
            float t=float(i)/32.0;
            vec3 p=mix(rayStart, rayEnd, t);
            vec4 proj=vec4(p,1.0);
            vec2 uv=proj.xy*0.5+0.5;
            if(uv.x<0.0||uv.x>1.0||uv.y<0.0||uv.y>1.0) break;
            float sceneDepth=texture2D(tDepth, uv).r;
            float sceneViewZ = sceneDepth*2.0-1.0;
            // simplified depth test
            if(abs(p.z-sceneViewZ)<thickness){ hitUv=uv; hit=1.0; break; }
          }
          vec4 color=texture2D(tDiffuse, vUv);
          vec4 reflected=texture2D(tDiffuse, hitUv);
          float fresnel = pow(1.0-max(dot(normal, vec3(0.,0.,1.)),0.0),2.0);
          float mixFactor = hit * fresnel * opacity;
          gl_FragColor=mix(color, reflected, mixFactor);
        }
      `,
      transparent:false
    });
  }
  update(camera){ this.material.uniforms.projectionMatrix.value.copy(camera.projectionMatrix); }
}
