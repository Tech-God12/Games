export const TAU = Math.PI * 2;
export const EPSILON = 0.000001;

export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
export const lerp = (a, b, t) => a + (b - a) * t;
export const invLerp = (a, b, value) => (value - a) / (b - a || 1);
export const remap = (a0, a1, b0, b1, value) => lerp(b0, b1, invLerp(a0, a1, value));
export const smoothstep = (a, b, value) => { const t = clamp(invLerp(a, b, value), 0, 1); return t * t * (3 - 2 * t); };
export const smootherstep = (a, b, value) => { const t = clamp(invLerp(a, b, value), 0, 1); return t * t * t * (t * (t * 6 - 15) + 10); };
export const damp = (current, target, smoothing, dt) => lerp(current, target, 1 - Math.exp(-smoothing * dt));
export const rand = (min = 0, max = 1) => min + Math.random() * (max - min);
export const randInt = (min, max) => Math.floor(rand(min, max + 1));
export const choose = (array) => array[Math.floor(Math.random() * array.length)];
export const wrap = (value, min, max) => { const range = max - min; return ((value - min) % range + range) % range + min; };
export const approach = (current, target, amount) => current < target ? Math.min(current + amount, target) : Math.max(current - amount, target);
export const easeOutCubic = (t) => 1 - Math.pow(1 - clamp(t, 0, 1), 3);
export const easeInOutCubic = (t) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const hash = (x, y = 0, z = 0) => { const n = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453123; return n - Math.floor(n); };

export function v2(x = 0, y = 0) { return [x, y]; }
export function v3(x = 0, y = 0, z = 0) { return [x, y, z]; }
export function v4(x = 0, y = 0, z = 0, w = 1) { return [x, y, z, w]; }
export function set3(out, x, y, z) { out[0] = x; out[1] = y; out[2] = z; return out; }
export function copy3(out, a) { out[0] = a[0]; out[1] = a[1]; out[2] = a[2]; return out; }
export function add3(out, a, b) { out[0] = a[0] + b[0]; out[1] = a[1] + b[1]; out[2] = a[2] + b[2]; return out; }
export function sub3(out, a, b) { out[0] = a[0] - b[0]; out[1] = a[1] - b[1]; out[2] = a[2] - b[2]; return out; }
export function mul3(out, a, scalar) { out[0] = a[0] * scalar; out[1] = a[1] * scalar; out[2] = a[2] * scalar; return out; }
export function mad3(out, a, b, scalar) { out[0] = a[0] + b[0] * scalar; out[1] = a[1] + b[1] * scalar; out[2] = a[2] + b[2] * scalar; return out; }
export function length3(a) { return Math.hypot(a[0], a[1], a[2]); }
export function lengthSq3(a) { return a[0] * a[0] + a[1] * a[1] + a[2] * a[2]; }
export function distance3(a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]); }
export function distanceSq3(a, b) { const x = a[0] - b[0], y = a[1] - b[1], z = a[2] - b[2]; return x * x + y * y + z * z; }
export function normalize3(out, a) { const len = Math.hypot(a[0], a[1], a[2]) || 1; out[0] = a[0] / len; out[1] = a[1] / len; out[2] = a[2] / len; return out; }
export function cross3(out, a, b) { const ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2]; out[0] = ay * bz - az * by; out[1] = az * bx - ax * bz; out[2] = ax * by - ay * bx; return out; }
export function dot3(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
export function rotateY3(out, a, angle) { const c = Math.cos(angle), s = Math.sin(angle); const x = a[0], z = a[2]; out[0] = x * c - z * s; out[1] = a[1]; out[2] = x * s + z * c; return out; }
export function rotateX3(out, a, angle) { const c = Math.cos(angle), s = Math.sin(angle); const y = a[1], z = a[2]; out[0] = a[0]; out[1] = y * c - z * s; out[2] = y * s + z * c; return out; }

export function mat4Identity(out = new Float32Array(16)) {
  out[0] = 1; out[1] = 0; out[2] = 0; out[3] = 0;
  out[4] = 0; out[5] = 1; out[6] = 0; out[7] = 0;
  out[8] = 0; out[9] = 0; out[10] = 1; out[11] = 0;
  out[12] = 0; out[13] = 0; out[14] = 0; out[15] = 1;
  return out;
}

export function mat4Copy(out, a) { out.set(a); return out; }
export function mat4Multiply(out, a, b) {
  const a00=a[0], a01=a[1], a02=a[2], a03=a[3], a10=a[4], a11=a[5], a12=a[6], a13=a[7], a20=a[8], a21=a[9], a22=a[10], a23=a[11], a30=a[12], a31=a[13], a32=a[14], a33=a[15];
  let b0=b[0], b1=b[1], b2=b[2], b3=b[3]; out[0]=b0*a00+b1*a10+b2*a20+b3*a30; out[1]=b0*a01+b1*a11+b2*a21+b3*a31; out[2]=b0*a02+b1*a12+b2*a22+b3*a32; out[3]=b0*a03+b1*a13+b2*a23+b3*a33;
  b0=b[4]; b1=b[5]; b2=b[6]; b3=b[7]; out[4]=b0*a00+b1*a10+b2*a20+b3*a30; out[5]=b0*a01+b1*a11+b2*a21+b3*a31; out[6]=b0*a02+b1*a12+b2*a22+b3*a32; out[7]=b0*a03+b1*a13+b2*a23+b3*a33;
  b0=b[8]; b1=b[9]; b2=b[10]; b3=b[11]; out[8]=b0*a00+b1*a10+b2*a20+b3*a30; out[9]=b0*a01+b1*a11+b2*a21+b3*a31; out[10]=b0*a02+b1*a12+b2*a22+b3*a32; out[11]=b0*a03+b1*a13+b2*a23+b3*a33;
  b0=b[12]; b1=b[13]; b2=b[14]; b3=b[15]; out[12]=b0*a00+b1*a10+b2*a20+b3*a30; out[13]=b0*a01+b1*a11+b2*a21+b3*a31; out[14]=b0*a02+b1*a12+b2*a22+b3*a32; out[15]=b0*a03+b1*a13+b2*a23+b3*a33;
  return out;
}
export function mat4Perspective(out, fovy, aspect, near, far) {
  const f = 1 / Math.tan(fovy / 2); const nf = 1 / (near - far);
  out[0] = f / aspect; out[1] = 0; out[2] = 0; out[3] = 0;
  out[4] = 0; out[5] = f; out[6] = 0; out[7] = 0;
  out[8] = 0; out[9] = 0; out[10] = (far + near) * nf; out[11] = -1;
  out[12] = 0; out[13] = 0; out[14] = 2 * far * near * nf; out[15] = 0;
  return out;
}
export function mat4LookAt(out, eye, center, up = [0,1,0]) {
  let z0=eye[0]-center[0], z1=eye[1]-center[1], z2=eye[2]-center[2]; let len=Math.hypot(z0,z1,z2)||1; z0/=len; z1/=len; z2/=len;
  let x0=up[1]*z2-up[2]*z1, x1=up[2]*z0-up[0]*z2, x2=up[0]*z1-up[1]*z0; len=Math.hypot(x0,x1,x2)||1; x0/=len; x1/=len; x2/=len;
  const y0=z1*x2-z2*x1, y1=z2*x0-z0*x2, y2=z0*x1-z1*x0;
  out[0]=x0; out[1]=y0; out[2]=z0; out[3]=0; out[4]=x1; out[5]=y1; out[6]=z1; out[7]=0; out[8]=x2; out[9]=y2; out[10]=z2; out[11]=0; out[12]=-(x0*eye[0]+x1*eye[1]+x2*eye[2]); out[13]=-(y0*eye[0]+y1*eye[1]+y2*eye[2]); out[14]=-(z0*eye[0]+z1*eye[1]+z2*eye[2]); out[15]=1; return out;
}
export function mat4Translate(out, a, x, y, z) { const t = mat4Identity(); t[12]=x; t[13]=y; t[14]=z; return mat4Multiply(out, a, t); }
export function mat4Scale(out, a, x, y, z) { const t = mat4Identity(); t[0]=x; t[5]=y; t[10]=z; return mat4Multiply(out, a, t); }
export function mat4RotateX(out, a, r) { const t=mat4Identity(), c=Math.cos(r), s=Math.sin(r); t[5]=c; t[6]=s; t[9]=-s; t[10]=c; return mat4Multiply(out,a,t); }
export function mat4RotateY(out, a, r) { const t=mat4Identity(), c=Math.cos(r), s=Math.sin(r); t[0]=c; t[2]=-s; t[8]=s; t[10]=c; return mat4Multiply(out,a,t); }
export function mat4RotateZ(out, a, r) { const t=mat4Identity(), c=Math.cos(r), s=Math.sin(r); t[0]=c; t[1]=s; t[4]=-s; t[5]=c; return mat4Multiply(out,a,t); }
export function composeTransform(out, position, rotation = [0,0,0], scale = [1,1,1]) { mat4Identity(out); mat4Translate(out,out,position[0],position[1],position[2]); mat4RotateY(out,out,rotation[1]); mat4RotateX(out,out,rotation[0]); mat4RotateZ(out,out,rotation[2]); mat4Scale(out,out,scale[0],scale[1],scale[2]); return out; }

export function mat4Invert(out, a) {
  const a00=a[0],a01=a[1],a02=a[2],a03=a[3],a10=a[4],a11=a[5],a12=a[6],a13=a[7],a20=a[8],a21=a[9],a22=a[10],a23=a[11],a30=a[12],a31=a[13],a32=a[14],a33=a[15];
  const b00=a00*a11-a01*a10, b01=a00*a12-a02*a10, b02=a00*a13-a03*a10, b03=a01*a12-a02*a11, b04=a01*a13-a03*a11, b05=a02*a13-a03*a12, b06=a20*a31-a21*a30, b07=a20*a32-a22*a30, b08=a20*a33-a23*a30, b09=a21*a32-a22*a31, b10=a21*a33-a23*a31, b11=a22*a33-a23*a32;
  const det=b00*b11-b01*b10+b02*b09+b03*b08-b04*b07+b05*b06;
  if (!det) return null;
  const id=1/det;
  out[0]=(a11*b11-a12*b10+a13*b09)*id; out[1]=(-a01*b11+a02*b10-a03*b09)*id; out[2]=(a31*b05-a32*b04+a33*b03)*id; out[3]=(-a21*b05+a22*b04-a23*b03)*id;
  out[4]=(-a10*b11+a12*b08-a13*b07)*id; out[5]=(a00*b11-a02*b08+a03*b07)*id; out[6]=(-a30*b05+a32*b02-a33*b01)*id; out[7]=(a20*b05-a22*b02+a23*b01)*id;
  out[8]=(a10*b10-a11*b08+a13*b06)*id; out[9]=(-a00*b10+a01*b08-a03*b06)*id; out[10]=(a30*b04-a31*b02+a33*b00)*id; out[11]=(-a20*b04+a21*b02-a23*b00)*id;
  out[12]=(-a10*b09+a11*b07-a12*b06)*id; out[13]=(a00*b09-a01*b07+a02*b06)*id; out[14]=(-a30*b03+a31*b01-a32*b00)*id; out[15]=(a20*b03-a21*b01+a22*b00)*id;
  return out;
}
export function transformPoint(out, matrix, point, w = 1) { const x=point[0],y=point[1],z=point[2]; const q=matrix; let ow=q[3]*x+q[7]*y+q[11]*z+q[15]*w; ow=ow||1; out[0]=(q[0]*x+q[4]*y+q[8]*z+q[12]*w)/ow; out[1]=(q[1]*x+q[5]*y+q[9]*z+q[13]*w)/ow; out[2]=(q[2]*x+q[6]*y+q[10]*z+q[14]*w)/ow; return out; }
export function rayPlaneY(out, origin, direction, y = 0) { const t=(y-origin[1])/(direction[1] || -EPSILON); out[0]=origin[0]+direction[0]*t; out[1]=y; out[2]=origin[2]+direction[2]*t; return t; }
export function angleTo(a, b) { return Math.atan2(b[0]-a[0], b[2]-a[2]); }
export function signedAngle(a, b) { return Math.atan2(a[0]*b[2]-a[2]*b[0], a[0]*b[0]+a[2]*b[2]); }
export function forwardFromYaw(out, yaw) { out[0] = Math.sin(yaw); out[1] = 0; out[2] = Math.cos(yaw); return out; }
export function formatNumber(number, digits = 6) { return Math.max(0, Math.floor(number)).toString().padStart(digits, '0'); }
export function formatTime(seconds) { const s=Math.max(0, Math.floor(seconds)); return `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`; }

export class RNG {
  constructor(seed = 1) { this.seed = seed >>> 0 || 1; }
  next() { let x=this.seed; x ^= x << 13; x ^= x >>> 17; x ^= x << 5; this.seed=x>>>0; return this.seed / 0x100000000; }
  float(min=0,max=1) { return min + (this.next() % 1) * (max-min); }
  int(min,max) { return Math.floor(this.float(min,max+1)); }
  pick(values) { return values[this.int(0,values.length-1)]; }
  sign() { return this.next() > .5 ? 1 : -1; }
}
