import { Mesh } from '../render/renderer.js';
import { boxData, planeData, gridData, sphereData, icoData, cylinderData, coneData, torusData, octaData } from '../render/geometry.js';
import { Player, Enemy, Projectile, Pickup, RiftNode, C, ENEMY_TYPES } from './entities.js';
import { ParticleSystem } from '../render/particles.js';
import { UPGRADES, rollUpgrades } from '../data/upgrades.js';
import { clamp, damp, distance3, rand, randInt, choose, RNG, composeTransform, TAU } from '../core/math.js';

const ARENA = 42;
const PROP_COLORS = [[.07,.19,.27],[.08,.24,.31],[.13,.17,.35],[.22,.12,.35],[.08,.3,.34]];

function makeMesh(gl,data) { return new Mesh(gl,data); }
function createMeshes(gl) {
  return {
    ground:makeMesh(gl,planeData(110)), grid:makeMesh(gl,gridData(100,2)), gridFine:makeMesh(gl,gridData(100,1)),
    cube:makeMesh(gl,boxData(1,1,1)), slab:makeMesh(gl,boxData(1,1,1)), sphere:makeMesh(gl,sphereData(1,14,9)), ico:makeMesh(gl,icoData(1)),
    cylinder:makeMesh(gl,cylinderData(1,1,16)), cone:makeMesh(gl,coneData(1,1,8)), ring:makeMesh(gl,torusData(1,.035,36,6)),
    playerBody:makeMesh(gl,boxData(1,1,1)), playerCore:makeMesh(gl,icoData(1)), playerWing:makeMesh(gl,boxData(1,1,1)), playerFin:makeMesh(gl,boxData(1,1,1)),
    enemySkitter:makeMesh(gl,icoData(1)), enemyHunter:makeMesh(gl,octaData(1)), enemySpitter:makeMesh(gl,cylinderData(1,1,8)), enemyBrute:makeMesh(gl,icoData(1)), enemySentinel:makeMesh(gl,torusData(.85,.28,12,5)), boss:makeMesh(gl,icoData(1)),
    enemyLimb:makeMesh(gl,boxData(1,1,1)), enemyEye:makeMesh(gl,boxData(1,1,1)), projectile:makeMesh(gl,icoData(1)), pickup:makeMesh(gl,octaData(1)), pylon:makeMesh(gl,coneData(1,1,6)), healthBar:makeMesh(gl,boxData(1,1,1)), crystal:makeMesh(gl,coneData(1,1,6)),
  };
}

export class Game {
  constructor(renderer,input,audio,ui) {
    this.renderer=renderer;this.input=input;this.audio=audio;this.ui=ui;ui.attach(this);this.meshes=createMeshes(renderer.gl);this.particles=new ParticleSystem();this.player=new Player();this.enemies=[];this.projectiles=[];this.pickups=[];this.nodes=[];this.scenery=[];this.skyStars=[];this.cameraPosition=[0,12,17];this.cameraTarget=[0,0,0];this.aimPoint=[0,0,0];this.state='title';this.time=0;this.lastDt=0;this.wave=0;this.waveTotal=0;this.waveKills=0;this.waveQueue=[];this.spawnClock=0;this.waveClearing=false;this.waveClearTimer=0;this.upgradeQueue=[];this.awaitNextWave=false;this.score=0;this.shake=0;this.directive='AWAITING DEPLOYMENT';this.activeNode=null;this.rng=new RNG(0xA37F19);this.buildWorld();this.demoEnemies=[new Enemy('architect',[0,0,-9],5),new Enemy('sentinel',[-8,0,-5],2),new Enemy('sentinel',[8,0,-5],2)];this.demoPlayer=new Player();this.demoPlayer.position=[0,1.25,7];this.demoPlayer.rotation=0;this.ui.hideLoading();
  }
  buildWorld() {
    const rng=new RNG(0xFEEDBEEF); const positions=[[-30,-30],[-20,28],[25,-27],[32,22],[-36,5],[35,-4],[-8,-34],[8,34]];
    for(let i=0;i<positions.length;i++){const [x,z]=positions[i];this.scenery.push({type:'tower',position:[x,0,z],scale:[rng.float(.75,1.25),rng.float(.7,1.6),rng.float(.75,1.25)],color:PROP_COLORS[i%PROP_COLORS.length],rotation:rng.float(0,TAU)});}
    for(let i=0;i<24;i++){let x=rng.float(-38,38),z=rng.float(-38,38);if(Math.hypot(x,z)<8) {i--;continue;}this.scenery.push({type:i%3?'crystal':'slab',position:[x,0,z],scale:[rng.float(.35,1),rng.float(.6,1.8),rng.float(.35,1)],color:PROP_COLORS[rng.int(0,PROP_COLORS.length-1)],rotation:rng.float(0,TAU)});}
    for(let i=0;i<230;i++){this.skyStars.push({position:[rng.float(-90,90),rng.float(8,55),rng.float(-85,60)],size:rng.float(1,3.5),color:rng.next()>.72?[.38,.7,1]:[.55,.62,.9],alpha:rng.float(.2,.8)});}
  }
  start() { this.reset();this.state='playing';this.ui.showGame();this.audio.start();this.audio.wave();this.addFeed('WARDEN LINK // established','good');this.addFeed('Frontier 07 // breach depth unknown','');this.startWave(); }
  reset() { this.player.reset();this.enemies.length=0;this.projectiles.length=0;this.pickups.length=0;this.particles.clear();this.nodes=[new RiftNode([-15,-15],0),new RiftNode([16,-10],1),new RiftNode([5,18],2)];this.wave=0;this.waveTotal=0;this.waveKills=0;this.waveQueue=[];this.spawnClock=0;this.waveClearing=false;this.waveClearTimer=0;this.upgradeQueue=[];this.awaitNextWave=false;this.score=0;this.shake=0;this.directive='INITIALIZING RIFT';this.activeNode=null;this.ui.feedEntries=[];this.ui.feed.innerHTML=''; }
  returnToTitle() { this.state='title';this.ui.showTitle();this.player.reset();this.enemies.length=0;this.projectiles.length=0;this.pickups.length=0;this.particles.clear(); }
  startWave() { this.wave++;this.waveKills=0;this.waveClearing=false;this.awaitNextWave=false;this.waveQueue=[];this.spawnClock=.1;this.nodes.forEach(n=>{n.active=false;n.completed=false;n.charge=0;});this.activeNode=this.nodes[(this.wave-1)%this.nodes.length];const boss=this.wave%5===0;if(boss){this.activeNode.completed=true;this.waveQueue.push({type:'architect',spawn:[0,-31]});const escorts=Math.min(6,2+Math.floor(this.wave/2));for(let i=0;i<escorts;i++)this.waveQueue.push({type:i%2?'spitter':'hunter',spawn:this.edgeSpawn(i)});this.waveTotal=this.waveQueue.length;this.directive='DEFEAT THE RIFT ARCHITECT';this.addFeed(`WAVE ${String(this.wave).padStart(2,'0')} // ARCHITECT SIGNATURE`,'warn');this.audio.boss();} else {this.activeNode.active=true;const count=5+this.wave*2;for(let i=0;i<count;i++){let type='skitter';if(this.wave>=2&&i%5===0)type='hunter';if(this.wave>=3&&i%7===0)type='spitter';if(this.wave>=4&&i%10===0)type='brute';if(this.wave>=6&&i%8===0)type='sentinel';this.waveQueue.push({type,spawn:this.edgeSpawn(i)});}this.waveTotal=this.waveQueue.length;this.directive=`SECURE NODE ${String(this.activeNode.index+1).padStart(2,'0')}`;this.addFeed(`WAVE ${String(this.wave).padStart(2,'0')} // rift density rising`,'warn');this.audio.wave();}}
  edgeSpawn(index=0) {const a=(index*.91+this.wave*1.77)%TAU;const r=35+this.rng.float(0,4);return [Math.sin(a)*r,0,Math.cos(a)*r];}
  spawnEnemy(type,position) {const enemy=new Enemy(type,position,this.wave);this.enemies.push(enemy);return enemy;}
  spawnPlayerProjectile(position,yaw,damage,kind='player') {const speed=this.player.stats.projectileSpeed;const x=Math.sin(yaw),z=Math.cos(yaw);const p=new Projectile([position[0]+x*.9,1.1,position[2]+z*.9],[x*speed,0,z*speed],this.player,damage,this.player.overdrive>0?'gold':'cyan',kind);this.projectiles.push(p);return p;}
  spawnEnemyProjectile(enemy,player) {const dx=player.position[0]-enemy.position[0],dz=player.position[2]-enemy.position[2],l=Math.hypot(dx,dz)||1;const lead=clamp(l/24,0,.45);const tx=player.position[0]+player.velocity[0]*lead,tz=player.position[2]+player.velocity[2]*lead;const a=Math.atan2(tx-enemy.position[0],tz-enemy.position[2]);const speed=enemy.type==='architect'?12:9;const p=new Projectile([enemy.position[0],enemy.profile.boss?2.5:1.2,enemy.position[2]],[Math.sin(a)*speed,0,Math.cos(a)*speed],enemy,enemy.profile.damage*.65,enemy.type==='architect'?'violet':'red','enemy');this.projectiles.push(p);this.particles.sparks(p.position,'red',2);}
  constrainPlayer(player) {const r=.9;player.position[0]=clamp(player.position[0],-ARENA+r,ARENA-r);player.position[2]=clamp(player.position[2],-ARENA+r,ARENA-r);for(const prop of this.scenery){if(prop.type==='slab'){const dx=player.position[0]-prop.position[0],dz=player.position[2]-prop.position[2],min=1.3*prop.scale[0];if(Math.hypot(dx,dz)<min){const l=Math.hypot(dx,dz)||1;player.position[0]=prop.position[0]+dx/l*min;player.position[2]=prop.position[2]+dz/l*min;}}}}
  constrainEnemy(enemy) {const r=enemy.radius;enemy.position[0]=clamp(enemy.position[0],-ARENA+r,ARENA-r);enemy.position[2]=clamp(enemy.position[2],-ARENA+r,ARENA-r);}
  aliveEnemies() {return this.enemies.reduce((n,e)=>n+(e.dead?0:1),0);}
  updateSpawning(dt) {if(!this.waveQueue.length)return;this.spawnClock-=dt;if(this.spawnClock<=0){const next=this.waveQueue.shift();this.spawnEnemy(next.type,next.spawn);this.spawnClock=Math.max(.18,.52-this.wave*.015);}}
  update(dt) {
    this.lastDt=dt;this.time+=dt;this.shake=Math.max(0,this.shake-dt*1.8);if(this.input.wasPressed('escape')){if(this.state==='playing')this.togglePause();else if(this.state==='paused')this.resume();else if(this.state==='gameover')this.returnToTitle();}
    if(this.input.wasPressed('r')&&(this.state==='paused'||this.state==='gameover')){this.audio.start();this.start();return;}
    if(this.state==='upgrade'){for(let i=0;i<3;i++)if(this.input.wasPressed(String(i+1)))this.selectUpgrade(i);this.particles.update(dt*.35);return;}
    if(this.state==='paused'||this.state==='gameover'){this.particles.update(dt*.18);return;}
    this.updateAim();
    if(this.state==='title'){this.particles.update(dt);this.input.endFrame();return;}
    if(this.state==='playing'){
      this.player.update(dt,this);this.updateSpawning(dt);for(const node of this.nodes)node.update(dt,this);for(const enemy of this.enemies)enemy.update(dt,this);for(const projectile of this.projectiles)projectile.update(dt,this);for(const pickup of this.pickups)pickup.update(dt,this);this.cleanup();this.particles.update(dt);
      if(this.waveClearing){this.waveClearTimer-=dt;if(this.waveClearTimer<=0){this.waveClearing=false;this.awaitNextWave=true;this.queueUpgrade('wave');}}
      else if(!this.waveQueue.length&&!this.aliveEnemies()&&(!this.activeNode||this.activeNode.completed))this.beginWaveClear();
      if(this.activeNode&&!this.activeNode.completed&&this.aliveEnemies()===0&&this.waveQueue.length===0)this.directive=`SECURE NODE ${String(this.activeNode.index+1).padStart(2,'0')}`;else if(this.activeNode&&!this.activeNode.completed)this.directive=`CLEAR HOSTILES // NODE ${String(this.activeNode.index+1).padStart(2,'0')}`;else if(this.wave%5===0)this.directive='DEFEAT THE RIFT ARCHITECT';
    }
    this.input.endFrame();
  }
  updateAim() {this.aimPoint=this.renderer.screenToGround(this.input.mouse.x,this.input.mouse.y,0);if(!Number.isFinite(this.aimPoint[0]))this.aimPoint=[this.player.position[0],0,this.player.position[2]-10];}
  beginWaveClear() {if(this.waveClearing)return;this.waveClearing=true;this.waveClearTimer=1.8;this.directive='RIFT STABILIZED // RETURNING';this.score+=Math.floor(500*this.wave*(1+this.player.combo*.1));this.player.ultimate=Math.min(100,this.player.ultimate+12);this.addFeed(`WAVE ${String(this.wave).padStart(2,'0')} // sector stable`,'good');this.audio.wave();}
  queueUpgrade(reason) {this.upgradeQueue.push(reason);if(this.state==='playing')this.openNextUpgrade();}
  openNextUpgrade() {if(!this.upgradeQueue.length)return;this.state='upgrade';const reason=this.upgradeQueue[0];const offers=rollUpgrades(3,()=>this.rng.float(0,1));this.currentOffers=offers;this.ui.showUpgrade(offers,this.player.level,idx=>this.selectUpgrade(idx));this.addFeed(reason==='wave'?'SYNCHRONIZATION WINDOW // choose protocol':'NEURAL SYNC // new protocol available','good');}
  selectUpgrade(index) {if(this.state!=='upgrade'||!this.currentOffers?.[index])return;const upgrade=this.currentOffers[index];upgrade.apply(this.player.stats);this.audio.select();this.particles.burst([this.player.position[0],1,this.player.position[2]],'violet',24,{speed:5,spread:1,life:.7,size:[2,6],gravity:0});this.ui.toastMessage(`${upgrade.name.toUpperCase()} // INSTALLED`);this.ui.hideUpgrade();this.upgradeQueue.shift();this.currentOffers=null;if(this.upgradeQueue.length){setTimeout(()=>this.openNextUpgrade(),220);}else{this.state='playing';if(this.awaitNextWave){this.startWave();}else this.ui.showGame();}}
  onLevelUp() {this.queueUpgrade('level');this.audio.level();this.addFeed(`LEVEL ${String(this.player.level).padStart(2,'0')} // sync threshold reached`,'good');}
  onNodeSecured(node) {this.addFeed(`NODE ${String(node.index+1).padStart(2,'0')} // rift stabilized`,'good');this.score+=350;this.player.ultimate=Math.min(100,this.player.ultimate+8);this.particles.ring(node.position,'green',25);if(this.aliveEnemies()===0&&!this.waveQueue.length)this.beginWaveClear();}
  killEnemy(enemy,critical=false) {if(enemy.dead&&enemy._rewarded)return;enemy.dead=true;enemy._rewarded=true;const p=enemy.position.slice();this.player.kills++;this.waveKills++;this.player.combo=Math.min(10,this.player.combo+.22+(critical?.1:0));this.player.bestCombo=Math.max(this.player.bestCombo,this.player.combo);this.player.comboTimer=4.2;const multiplier=1+(this.player.combo-1)*.14;this.score+=Math.floor(enemy.profile.score*multiplier);this.player.ultimate=Math.min(100,this.player.ultimate+enemy.profile.xp*.08);this.player.health=Math.min(this.player.maxHealth,this.player.health+enemy.profile.xp*this.player.stats.lifesteal);this.particles.burst([p[0],enemy.profile.boss?2.5:1,p[2]],enemy.profile.boss?'violet':critical?'gold':'pink',enemy.profile.boss?70:18,{speed:enemy.profile.boss?12:6,spread:1,life:enemy.profile.boss?1.2:.65,size:enemy.profile.boss?[3,9]:[2,6],gravity:-1});if(enemy.profile.boss){this.addFeed('ARCHITECT // core collapse confirmed','good');this.score+=5000;this.shake=.9;}else if(critical)this.addFeed('CRITICAL // breach fragment claimed','good');this.pickups.push(new Pickup([p[0],.45,p[2]],'xp',enemy.profile.xp));if(Math.random()<.12)this.pickups.push(new Pickup([p[0]+rand(-.35,.35),.45,p[2]+rand(-.35,.35)],'health',12));if(Math.random()<.08)this.pickups.push(new Pickup([p[0]+rand(-.3,.3),.45,p[2]+rand(-.3,.3)],'charge',14));}
  collectPickup(pickup) {if(pickup.type==='xp')this.player.gainXP(pickup.value,this);else if(pickup.type==='health'){this.player.health=Math.min(this.player.maxHealth,this.player.health+pickup.value);this.ui.toastMessage('HULL PATCH // +12');}else{this.player.ultimate=Math.min(100,this.player.ultimate+pickup.value);this.ui.toastMessage('OVERDRIVE CHARGE // +14');}this.particles.sparks(pickup.position,pickup.type==='health'?'red':pickup.type==='charge'?'gold':'cyan',5);}
  cleanup() {this.enemies=this.enemies.filter(e=>!e.dead||e.age<1);this.projectiles=this.projectiles.filter(e=>!e.dead);this.pickups=this.pickups.filter(e=>!e.dead);}
  damageBossRatio() {const boss=this.enemies.find(e=>e.profile.boss&&!e.dead);return boss?1-boss.health/boss.maxHealth:1;}
  waveProgress(nodeProgress=0) {if(this.wave%5===0)return this.damageBossRatio();const killProgress=this.waveTotal?this.waveKills/this.waveTotal:0;return clamp(killProgress*.55+nodeProgress*.45,0,1);}
  togglePause() {if(this.state==='playing'){this.state='paused';this.ui.showPause();}else if(this.state==='paused')this.resume();}
  resume() {if(this.state!=='paused')return;this.state='playing';this.ui.hidePause();}
  onPlayerDeath(source) {this.state='gameover';this.directive='WARDEN SIGNAL LOST';this.addFeed(`LINK LOST // ${source}`,'bad');this.ui.showGameover(this);this.audio.hurt();this.particles.burst(this.player.position,'red',55,{speed:10,spread:1.2,life:1.5,size:[3,9],gravity:-2});}
  addFeed(text,tone='') {this.ui.addFeed(text,tone);}
  render() {
    const p=this.state==='title'?this.demoPlayer:this.player;let target=[p.position[0],.3,p.position[2]];let cam;
    if(this.state==='title'){cam=[Math.sin(this.time*.12)*19,8.2,17+Math.cos(this.time*.12)*4];target=[0,1,-2];this.demoPlayer.rotation=Math.sin(this.time*.25)*.5;}
    else {const desired=[p.position[0],12.5,p.position[2]+16];this.cameraPosition[0]=damp(this.cameraPosition[0],desired[0],5,this.lastDt||.016);this.cameraPosition[1]=damp(this.cameraPosition[1],desired[1],5,this.lastDt||.016);this.cameraPosition[2]=damp(this.cameraPosition[2],desired[2],5,this.lastDt||.016);cam=this.cameraPosition.slice();if(this.shake){cam[0]+=rand(-this.shake,this.shake);cam[1]+=rand(-this.shake,this.shake);cam[2]+=rand(-this.shake,this.shake);}}
    this.renderer.begin(this.time,cam,target,1.02);this.drawWorld();
    if(this.state==='title'){this.demoPlayer.render(this.renderer,this.meshes,this);for(const e of this.demoEnemies)e.render(this.renderer,this.meshes,this);}
    else {for(const node of this.nodes)node.render(this.renderer,this.meshes);for(const prop of this.pickups)prop.render(this.renderer,this.meshes);for(const projectile of this.projectiles)projectile.render(this.renderer,this.meshes);for(const enemy of this.enemies)if(!enemy.dead)enemy.render(this.renderer,this.meshes,this);this.player.render(this.renderer,this.meshes,this);}
    this.particles.render(this.renderer);
  }
  drawWorld() {
    const m=new Float32Array(16);this.renderer.draw(this.meshes.ground,mIdentity(m),[.018,.044,.075],0,1,true);this.renderer.draw(this.meshes.grid,mIdentity(m),[.055,.19,.25],.12,.26,true);this.renderer.draw(this.meshes.gridFine,mIdentity(m),[.03,.1,.16],.03,.14,true);
    for(const prop of this.scenery){if(prop.type==='tower'){composeTransform(m,[prop.position[0],2*prop.scale[1],prop.position[2]],[0,prop.rotation,0],[prop.scale[0]*2.2,prop.scale[1]*2.8,prop.scale[2]*2.2]);this.renderer.draw(this.meshes.cylinder,m,prop.color,.12);composeTransform(m,[prop.position[0],5*prop.scale[1],prop.position[2]],[0,prop.rotation,0],[prop.scale[0]*.6,prop.scale[1]*.5,prop.scale[2]*.6]);this.renderer.draw(this.meshes.crystal,m,[.18,.52,.62],.5,.88,true);composeTransform(m,[prop.position[0],.15,prop.position[2]],[0,0,0],[prop.scale[0]*2.8,.05,prop.scale[2]*2.8]);this.renderer.draw(this.meshes.ring,m,[.1,.33,.42],.45,.36,true);}else if(prop.type==='crystal'){composeTransform(m,[prop.position[0],prop.scale[1]*.65,prop.position[2]],[0,prop.rotation,0],[prop.scale[0],prop.scale[1],prop.scale[2]]);this.renderer.draw(this.meshes.crystal,m,prop.color,.36,.9);composeTransform(m,[prop.position[0],.08,prop.position[2]],[0,0,0],[prop.scale[0]*1.8,.03,prop.scale[2]*1.8]);this.renderer.draw(this.meshes.ring,m,prop.color,.25,.3,true);}else{composeTransform(m,[prop.position[0],.35,prop.position[2]],[0,prop.rotation,0],[prop.scale[0]*2,prop.scale[1]*.7,prop.scale[2]*2]);this.renderer.draw(this.meshes.slab,m,prop.color,.1,.9);}}
    // Four boundary beacons make the playable space readable at a glance.
    for(const [x,z] of [[-41,-41],[41,-41],[-41,41],[41,41]]){composeTransform(m,[x,1.6,z],[0,Math.PI/4,0],[.45,3.2,.45]);this.renderer.draw(this.meshes.pylon,m,[.08,.28,.38],.25,.9);composeTransform(m,[x,4.9,z],[0,0,0],[.25,.25,.25]);this.renderer.draw(this.meshes.sphere,m,[.25,.75,1],1.2,.8,true);}
    this.renderer.drawPoints(this.skyStars);
  }
}
function mIdentity(out){out[0]=1;out[1]=0;out[2]=0;out[3]=0;out[4]=0;out[5]=1;out[6]=0;out[7]=0;out[8]=0;out[9]=0;out[10]=1;out[11]=0;out[12]=0;out[13]=0;out[14]=0;out[15]=1;return out;}
