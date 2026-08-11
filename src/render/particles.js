import { rand, randInt, TAU, v3 } from '../core/math.js';

const palette = {
  cyan: [0.35, .92, 1],
  violet: [.68, .42, 1],
  pink: [1, .25, .48],
  gold: [1, .7, .27],
  white: [.84, .98, 1],
  red: [1, .19, .2],
};

export class ParticleSystem {
  constructor() { this.items=[]; this.emitters=[]; }
  burst(position, color='cyan', count=12, options={}) {
    const c=Array.isArray(color)?color:palette[color]||palette.cyan; const speed=options.speed??5; const spread=options.spread??1; const life=options.life??.55;
    for(let i=0;i<count;i++){ const a=rand(0,TAU), u=rand(-1,1), s=Math.sqrt(1-u*u); const dir=[Math.cos(a)*s*spread,u*spread,Math.sin(a)*s*spread]; const velocity=[dir[0]*rand(speed*.45,speed),dir[1]*rand(speed*.45,speed),dir[2]*rand(speed*.45,speed)]; this.items.push({position:[position[0]+rand(-.08,.08),position[1]+rand(-.08,.08),position[2]+rand(-.08,.08)],velocity,life:rand(life*.55,life),maxLife:life,size:rand(options.size?.[0]??2,options.size?.[1]??5),color:c.slice(),drag:options.drag??3,gravity:options.gravity??-1.5,spin:rand(-4,4),rotation:rand(0,TAU)}); }
  }
  sparks(position,color='cyan',count=5) { this.burst(position,color,count,{speed:8,spread:.6,life:.35,size:[2,4],gravity:-2}); }
  trail(position,color='cyan',count=1) { const c=Array.isArray(color)?color:palette[color]||palette.cyan; for(let i=0;i<count;i++) this.items.push({position:[position[0]+rand(-.05,.05),position[1]+rand(-.05,.05),position[2]+rand(-.05,.05)],velocity:[rand(-.2,.2),rand(-.2,.2),rand(-.2,.2)],life:.28,maxLife:.28,size:rand(2,4),color:c.slice(),drag:4,gravity:0,rotation:0}); }
  ring(position,color='cyan',count=20) { const c=Array.isArray(color)?color:palette[color]||palette.cyan; for(let i=0;i<count;i++){ const a=i/count*TAU; this.items.push({position:[position[0],position[1]+.1,position[2]],velocity:[Math.cos(a)*rand(2,5),rand(.1,.5),Math.sin(a)*rand(2,5)],life:.5,maxLife:.5,size:rand(2,4),color:c.slice(),drag:0,gravity:0,rotation:0}); } }
  update(dt) { for(let i=this.items.length-1;i>=0;i--){const p=this.items[i];p.life-=dt;if(p.life<=0){this.items.splice(i,1);continue;} p.velocity[0]-=p.velocity[0]*p.drag*dt;p.velocity[1]+=p.gravity*dt;p.velocity[2]-=p.velocity[2]*p.drag*dt;p.position[0]+=p.velocity[0]*dt;p.position[1]+=p.velocity[1]*dt;p.position[2]+=p.velocity[2]*dt;p.rotation+=p.spin*dt;} }
  render(renderer) { renderer.drawPoints(this.items.map(p=>({...p,alpha:Math.min(1,p.life/.14)*Math.min(1,p.life/p.maxLife+.18),size:p.size*(.65+.35*p.life/p.maxLife)}))); }
  clear() { this.items.length=0; }
}
export { palette };
