import { mat4Identity, mat4LookAt, mat4Perspective, mat4Multiply, mat4Invert, transformPoint } from '../core/math.js';

const WORLD_VERTEX = `#version 100
attribute vec3 aPosition;
attribute vec3 aNormal;
uniform mat4 uProjection;
uniform mat4 uView;
uniform mat4 uModel;
varying vec3 vNormal;
varying vec3 vWorld;
varying float vDistance;
void main() {
  vec4 world = uModel * vec4(aPosition, 1.0);
  vWorld = world.xyz;
  vNormal = mat3(uModel) * aNormal;
  vec4 view = uView * world;
  vDistance = length(view.xyz);
  gl_Position = uProjection * view;
}`;
const WORLD_FRAGMENT = `#version 100
precision mediump float;
uniform vec4 uColor;
uniform float uEmissive;
uniform float uTime;
uniform bool uUnlit;
varying vec3 vNormal;
varying vec3 vWorld;
varying float vDistance;
void main() {
  vec3 n = normalize(vNormal);
  vec3 lightDir = normalize(vec3(-.42, .9, .36));
  float diffuse = max(dot(n, lightDir), 0.0);
  float rim = pow(1.0 - max(dot(n, normalize(vec3(.1,.72,.7))), 0.0), 2.0);
  vec3 lit = uColor.rgb * (uUnlit ? 1.0 : (.19 + diffuse * .7 + rim * .12));
  lit += uColor.rgb * uEmissive * (1.0 + .08 * sin(uTime * 2.0 + vWorld.y));
  float fog = smoothstep(48.0, 118.0, vDistance);
  vec3 fogColor = vec3(.018,.035,.075);
  vec3 result = mix(lit, fogColor, fog * .72);
  gl_FragColor = vec4(result, uColor.a);
}`;
const POINT_VERTEX = `#version 100
attribute vec3 aPosition;
attribute float aSize;
attribute vec4 aParticleColor;
uniform mat4 uProjection;
uniform mat4 uView;
varying vec4 vParticleColor;
void main() { vec4 view = uView * vec4(aPosition,1.0); gl_Position = uProjection * view; gl_PointSize = aSize * (240.0 / max(1.0, -view.z)); vParticleColor = aParticleColor; }`;
const POINT_FRAGMENT = `#version 100
precision mediump float;
varying vec4 vParticleColor;
void main() { vec2 p=gl_PointCoord-.5; float d=length(p)*2.0; float a=smoothstep(1.0,.08,d)*vParticleColor.a; if(a<.01) discard; gl_FragColor=vec4(vParticleColor.rgb*(1.0+(.4*(1.0-d))),a); }`;

function compile(gl, type, source) { const shader=gl.createShader(type); gl.shaderSource(shader,source); gl.compileShader(shader); if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader)); return shader; }
function program(gl, vertex, fragment) { const p=gl.createProgram(); gl.attachShader(p,compile(gl,gl.VERTEX_SHADER,vertex)); gl.attachShader(p,compile(gl,gl.FRAGMENT_SHADER,fragment)); gl.linkProgram(p); if(!gl.getProgramParameter(p,gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p)); return p; }

export class Mesh {
  constructor(gl, data) {
    this.gl=gl; this.mode=data.mode==='lines'?gl.LINES:gl.TRIANGLES; this.count=data.indices?data.indices.length:data.positions.length/3;
    this.position=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,this.position); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data.positions),gl.STATIC_DRAW);
    this.normal=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,this.normal); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data.normals),gl.STATIC_DRAW);
    if(data.indices) { this.index=gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.index); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(data.indices),gl.STATIC_DRAW); }
  }
  dispose() { const gl=this.gl; gl.deleteBuffer(this.position); gl.deleteBuffer(this.normal); if(this.index) gl.deleteBuffer(this.index); }
}

export class Renderer {
  constructor(canvas) {
    this.canvas=canvas; this.gl=canvas.getContext('webgl',{alpha:false,antialias:true,powerPreference:'high-performance'});
    if(!this.gl) throw new Error('WebGL is not available in this browser.');
    const gl=this.gl; this.program=program(gl,WORLD_VERTEX,WORLD_FRAGMENT); this.pointsProgram=program(gl,POINT_VERTEX,POINT_FRAGMENT);
    this.loc={ position:gl.getAttribLocation(this.program,'aPosition'), normal:gl.getAttribLocation(this.program,'aNormal'), projection:gl.getUniformLocation(this.program,'uProjection'), view:gl.getUniformLocation(this.program,'uView'), model:gl.getUniformLocation(this.program,'uModel'), color:gl.getUniformLocation(this.program,'uColor'), emissive:gl.getUniformLocation(this.program,'uEmissive'), time:gl.getUniformLocation(this.program,'uTime'), unlit:gl.getUniformLocation(this.program,'uUnlit') };
    this.pointLoc={position:gl.getAttribLocation(this.pointsProgram,'aPosition'),size:gl.getAttribLocation(this.pointsProgram,'aSize'),color:gl.getAttribLocation(this.pointsProgram,'aParticleColor'),projection:gl.getUniformLocation(this.pointsProgram,'uProjection'),view:gl.getUniformLocation(this.pointsProgram,'uView')};
    this.pointPosition=gl.createBuffer(); this.pointSize=gl.createBuffer(); this.pointColor=gl.createBuffer();
    this.projection=mat4Identity(); this.view=mat4Identity(); this.viewProjection=mat4Identity(); this.inverseViewProjection=mat4Identity(); this.camera={position:[0,10,15],target:[0,0,0]}; this.time=0; this.resizeObserver=new ResizeObserver(()=>this.resize()); this.resizeObserver.observe(canvas); this.resize();
    gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LEQUAL); gl.enable(gl.CULL_FACE); gl.cullFace(gl.BACK); gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA); gl.clearColor(.018,.035,.075,1);
  }
  resize() { const dpr=Math.min(devicePixelRatio||1,2); const rect=this.canvas.getBoundingClientRect(); const w=Math.max(1,Math.floor(rect.width*dpr)),h=Math.max(1,Math.floor(rect.height*dpr)); if(this.canvas.width!==w||this.canvas.height!==h){this.canvas.width=w;this.canvas.height=h;} this.gl.viewport(0,0,w,h); this.aspect=w/h; }
  begin(time, cameraPosition, target, fov=1.03) { this.resize(); this.time=time; this.camera.position=cameraPosition.slice(); this.camera.target=target.slice(); mat4Perspective(this.projection,fov,this.canvas.width/this.canvas.height,.1,180); mat4LookAt(this.view,cameraPosition,target,[0,1,0]); mat4Multiply(this.viewProjection,this.projection,this.view); mat4Invert(this.inverseViewProjection,this.viewProjection); const gl=this.gl; gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT); }
  draw(mesh, model, color=[1,1,1], emissive=0, alpha=1, unlit=false) { const gl=this.gl; gl.useProgram(this.program); gl.bindBuffer(gl.ARRAY_BUFFER,mesh.position); gl.enableVertexAttribArray(this.loc.position); gl.vertexAttribPointer(this.loc.position,3,gl.FLOAT,false,0,0); gl.bindBuffer(gl.ARRAY_BUFFER,mesh.normal); gl.enableVertexAttribArray(this.loc.normal); gl.vertexAttribPointer(this.loc.normal,3,gl.FLOAT,false,0,0); gl.uniformMatrix4fv(this.loc.projection,false,this.projection); gl.uniformMatrix4fv(this.loc.view,false,this.view); gl.uniformMatrix4fv(this.loc.model,false,model); gl.uniform4f(this.loc.color,color[0],color[1],color[2],alpha); gl.uniform1f(this.loc.emissive,emissive); gl.uniform1f(this.loc.time,this.time); gl.uniform1i(this.loc.unlit,unlit?1:0); if(alpha<1){gl.depthMask(false);} if(mesh.index){gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,mesh.index); gl.drawElements(mesh.mode,mesh.count,gl.UNSIGNED_SHORT,0);} else gl.drawArrays(mesh.mode,0,mesh.count); if(alpha<1)gl.depthMask(true); }
  drawPoints(particles) { if(!particles.length)return; const gl=this.gl; const positions=[],sizes=[],colors=[]; for(const p of particles){positions.push(p.position[0],p.position[1],p.position[2]);sizes.push(p.size||4);const c=p.color||[1,1,1];colors.push(c[0],c[1],c[2],p.alpha===undefined?1:p.alpha);} gl.useProgram(this.pointsProgram); gl.bindBuffer(gl.ARRAY_BUFFER,this.pointPosition); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(positions),gl.DYNAMIC_DRAW); gl.enableVertexAttribArray(this.pointLoc.position); gl.vertexAttribPointer(this.pointLoc.position,3,gl.FLOAT,false,0,0); gl.bindBuffer(gl.ARRAY_BUFFER,this.pointSize); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(sizes),gl.DYNAMIC_DRAW); gl.enableVertexAttribArray(this.pointLoc.size); gl.vertexAttribPointer(this.pointLoc.size,1,gl.FLOAT,false,0,0); gl.bindBuffer(gl.ARRAY_BUFFER,this.pointColor); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(colors),gl.DYNAMIC_DRAW); gl.enableVertexAttribArray(this.pointLoc.color); gl.vertexAttribPointer(this.pointLoc.color,4,gl.FLOAT,false,0,0); gl.uniformMatrix4fv(this.pointLoc.projection,false,this.projection); gl.uniformMatrix4fv(this.pointLoc.view,false,this.view); gl.depthMask(false); gl.blendFunc(gl.SRC_ALPHA,gl.ONE); gl.drawArrays(gl.POINTS,0,particles.length); gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA); gl.depthMask(true); }
  worldToScreen(position) { const p=transformPoint([0,0,0],this.viewProjection,position); return {x:(p[0]*.5+.5)*this.canvas.clientWidth,y:(1-(p[1]*.5+.5))*this.canvas.clientHeight,depth:p[2]}; }
  screenToGround(x,y,planeY=0) { const w=this.canvas.clientWidth,h=this.canvas.clientHeight; const nx=x/w*2-1,ny=1-y/h*2; const near=transformPoint([0,0,0],this.inverseViewProjection,[nx,ny,-1]); const far=transformPoint([0,0,0],this.inverseViewProjection,[nx,ny,1]); const dir=[far[0]-near[0],far[1]-near[1],far[2]-near[2]]; const t=(planeY-near[1])/(dir[1]||-.000001); return [near[0]+dir[0]*t,planeY,near[2]+dir[2]*t]; }
}
