const TAU = Math.PI * 2;

function pushFace(positions, normals, a, b, c, d, normal) {
  positions.push(...a, ...b, ...c, ...a, ...c, ...d);
  normals.push(...normal, ...normal, ...normal, ...normal, ...normal, ...normal);
}

export function boxData(width=1, height=1, depth=1) {
  const x=width/2,y=height/2,z=depth/2; const p=[],n=[];
  pushFace(p,n,[-x,-y,z],[x,-y,z],[x,y,z],[-x,y,z],[0,0,1]);
  pushFace(p,n,[x,-y,-z],[-x,-y,-z],[-x,y,-z],[x,y,-z],[0,0,-1]);
  pushFace(p,n,[-x,-y,-z],[-x,-y,z],[-x,y,z],[-x,y,-z],[-1,0,0]);
  pushFace(p,n,[x,-y,z],[x,-y,-z],[x,y,-z],[x,y,z],[1,0,0]);
  pushFace(p,n,[-x,y,z],[x,y,z],[x,y,-z],[-x,y,-z],[0,1,0]);
  pushFace(p,n,[-x,-y,-z],[x,-y,-z],[x,-y,z],[-x,-y,z],[0,-1,0]);
  return { positions:p, normals:n, mode:'triangles' };
}

export function planeData(size=100) {
  const s=size/2; return { positions:[-s,0,-s,s,0,-s,s,0,s,-s,0,s], normals:[0,1,0,0,1,0,0,1,0,0,1,0], indices:[0,1,2,0,2,3], mode:'triangles' };
}

export function gridData(size=100, step=2) {
  const positions=[], normals=[]; const half=size/2; const count=Math.floor(size/step);
  for(let i=0;i<=count;i++) { const p=-half+i*step; positions.push(-half,.012,p,half,.012,p,p,.012,-half,p,.012,half); normals.push(0,1,0,0,1,0,0,1,0,0,1,0); }
  return {positions,normals,mode:'lines'};
}

export function sphereData(radius=1, segments=16, rings=10) {
  const positions=[],normals=[],indices=[];
  for(let y=0;y<=rings;y++) { const v=y/rings, phi=v*Math.PI; const sy=Math.cos(phi), sr=Math.sin(phi); for(let x=0;x<=segments;x++) { const u=x/segments, theta=u*TAU, sx=Math.cos(theta)*sr, sz=Math.sin(theta)*sr; normals.push(sx,sy,sz); positions.push(sx*radius,sy*radius,sz*radius); } }
  for(let y=0;y<rings;y++) for(let x=0;x<segments;x++) { const a=y*(segments+1)+x,b=a+segments+1; indices.push(a,b,a+1,b,b+1,a+1); }
  return {positions,normals,indices,mode:'triangles'};
}

export function icoData(radius=1) {
  const t=(1+Math.sqrt(5))/2; const raw=[[-1,t,0],[1,t,0],[-1,-t,0],[1,-t,0],[0,-1,t],[0,1,t],[0,-1,-t],[0,1,-t],[t,0,-1],[t,0,1],[-t,0,-1],[-t,0,1]];
  const faces=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];
  const positions=[],normals=[]; for(const face of faces) for(const index of face) { const v=raw[index]; const len=Math.hypot(...v); const p=v.map(c=>c/len*radius); positions.push(...p); normals.push(0,0,0); }
  for(let i=0;i<normals.length;i+=3) { const p=positions.slice(i,i+3); const len=Math.hypot(...p)||1; normals[i]=p[0]/len; normals[i+1]=p[1]/len; normals[i+2]=p[2]/len; }
  return {positions,normals,mode:'triangles'};
}

export function cylinderData(radius=1,height=1,segments=16,topRadius=radius) {
  const positions=[],normals=[],indices=[];
  for(let y=0;y<=1;y++) { const r=y?topRadius:radius; for(let i=0;i<=segments;i++) { const a=i/segments*TAU,c=Math.cos(a),s=Math.sin(a); positions.push(c*r,(y-.5)*height,s*r); normals.push(c,0,s); } }
  for(let i=0;i<segments;i++) { const a=i,b=i+1,c=segments+1+i,d=c+1; indices.push(a,c,b,b,c,d); }
  const base=positions.length/3; positions.push(0,-height/2,0); normals.push(0,-1,0); const top=positions.length/3; positions.push(0,height/2,0); normals.push(0,1,0);
  for(let i=0;i<segments;i++) { const a=i,b=i+1,c=segments+1+i,d=c+1; indices.push(base,b,a,top,c,d); }
  return {positions,normals,indices,mode:'triangles'};
}

export function coneData(radius=1,height=1,segments=16) { return cylinderData(radius,height,segments,0); }

export function torusData(major=1,minor=.1,majorSegments=24,minorSegments=8) {
  const positions=[],normals=[],indices=[];
  for(let y=0;y<=minorSegments;y++) { const v=y/minorSegments*TAU, cv=Math.cos(v), sv=Math.sin(v); for(let x=0;x<=majorSegments;x++) { const u=x/majorSegments*TAU, cu=Math.cos(u), su=Math.sin(u); const r=major+minor*cv; positions.push(cu*r,minor*sv,su*r); normals.push(cu*cv,sv,su*cv); } }
  for(let y=0;y<minorSegments;y++) for(let x=0;x<majorSegments;x++) { const a=y*(majorSegments+1)+x,b=a+majorSegments+1; indices.push(a,b,a+1,b,b+1,a+1); }
  return {positions,normals,indices,mode:'triangles'};
}

export function octaData(size=1) {
  const p=[0,size,0,-size,0,0,0,0,size, size,0,0,0,0,-size,-size,0,0,0,-size,0, size,0,0,0,size,0,0,0,-size,0,0,0,-size,0,0,0];
  // explicit triangles are less error-prone than indexing for this small silhouette
  const verts=[0,size,0,-size,0,0,0,0,size, 0,size,0,0,0,size,size,0,0, 0,size,0,size,0,0,0,0,-size, 0,size,0,0,0,-size,-size,0,0, 0,-size,0,0,0,size,-size,0,0, 0,-size,0,size,0,0,0,0,size, 0,-size,0,0,0,-size,size,0,0, 0,-size,0,-size,0,0,0,0,-size];
  const positions=verts.slice(),normals=[]; for(let i=0;i<positions.length;i+=9) { const ax=positions[i+3]-positions[i],ay=positions[i+4]-positions[i+1],az=positions[i+5]-positions[i+2], bx=positions[i+6]-positions[i],by=positions[i+7]-positions[i+1],bz=positions[i+8]-positions[i+2]; const nx=ay*bz-az*by,ny=az*bx-ax*bz,nz=ax*by-ay*bx,l=Math.hypot(nx,ny,nz)||1; normals.push(nx/l,ny/l,nz/l,nx/l,ny/l,nz/l,nx/l,ny/l,nz/l); }
  return {positions,normals,mode:'triangles'};
}

export function lineData(points) { const positions=[],normals=[]; for(const p of points) { positions.push(...p); normals.push(0,1,0); } return {positions,normals,mode:'lines'}; }
