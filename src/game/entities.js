import { clamp, choose, composeTransform, damp, distance3, distanceSq3, angleTo, normalize3, rand, TAU, v3 } from '../core/math.js';

const C = {
  cyan: [.29,.88,1], pale: [.72,.97,1], violet: [.65,.38,1], pink: [1,.19,.48], red: [1,.18,.2], orange: [1,.47,.16], gold: [1,.72,.28], white: [.94,1,1], slate: [.15,.32,.45], blue: [.18,.48,.8], green: [.26,1,.7]
};

let NEXT_ID = 1;
export class Entity {
  constructor(position=[0,0,0]) { this.id=NEXT_ID++; this.position=position.slice(); this.velocity=[0,0,0]; this.dead=false; this.age=0; this.radius=1; this.rotation=0; }
  update(dt) { this.age+=dt; }
  destroy() { this.dead=true; }
}

export class Player extends Entity {
  constructor() { super([0,1.25,8]); this.reset(); }
  reset() {
    this.position=[0,1.25,8]; this.velocity=[0,0,0]; this.rotation=0; this.health=100; this.shield=40; this.level=1; this.xp=0; this.xpToNext=100; this.kills=0; this.combo=1; this.bestCombo=1; this.comboTimer=0; this.score=0; this.shotClock=0; this.dashClock=0; this.dashCooldownTimer=0; this.invulnerable=0; this.pulseCooldown=0; this.ultimate=0; this.overdrive=0; this.hurtClock=99; this.shotCount=0; this.radius=.72; this.stats={maxHealth:100,maxShield:40,damage:17,fireRate:7.5,projectileSpeed:29,projectiles:1,spread:.06,critChance:.14,critMultiplier:2,critChain:0,speed:10,acceleration:40,dashSpeed:30,dashCooldown:4.8,pulseCooldown:9,pulseDamage:48,pulseRadius:8,pickupRange:2.3,lifesteal:0,cooldownRate:1,shieldRegenDelay:3,shieldRegen:11,damageReduction:0,reactive:false,markChance:0,markBonus:0,echoShots:0,ultimateRate:1,overdriveDuration:6,waveHeal:0}; }
  get maxHealth() { return this.stats.maxHealth; }
  get maxShield() { return this.stats.maxShield; }
  update(dt, game) {
    this.age+=dt; if(this.dead)return;
    this.shotClock=Math.max(0,this.shotClock-dt*this.stats.fireRate/7.5); this.dashCooldownTimer=Math.max(0,this.dashCooldownTimer-dt*this.stats.cooldownRate); this.pulseCooldown=Math.max(0,this.pulseCooldown-dt*this.stats.cooldownRate); this.invulnerable=Math.max(0,this.invulnerable-dt); this.hurtClock+=dt; this.comboTimer-=dt;
    if(this.comboTimer<=0) this.combo=Math.max(1,this.combo-.8*dt);
    if(this.overdrive>0) this.overdrive=Math.max(0,this.overdrive-dt);
    const input=game.input; const move=[(input.isDown('d')?1:0)-(input.isDown('a')?1:0),0,(input.isDown('s')?1:0)-(input.isDown('w')?1:0)]; const moveLen=Math.hypot(move[0],move[2]); if(moveLen){move[0]/=moveLen;move[2]/=moveLen;}
    let aim=game.aimPoint; const aimDir=[aim[0]-this.position[0],0,aim[2]-this.position[2]]; const aimLen=Math.hypot(aimDir[0],aimDir[2])||1; aimDir[0]/=aimLen; aimDir[2]/=aimLen; this.rotation=Math.atan2(aimDir[0],aimDir[2]);
    if(input.wasPressed(' ') || input.wasPressed('shift')) this.dash(moveLen?move:aimDir,game);
    if(input.wasPressed('q')) this.voidPulse(game);
    if(input.wasPressed('e') && this.ultimate>=100) this.activateOverdrive(game);
    const speed=this.stats.speed*(this.overdrive>0?1.22:1); const targetX=move[0]*speed,targetZ=move[2]*speed; this.velocity[0]=damp(this.velocity[0],targetX, this.stats.acceleration/8,dt); this.velocity[2]=damp(this.velocity[2],targetZ, this.stats.acceleration/8,dt);
    if(this.dashClock>0){this.dashClock-=dt;this.position[0]+=this.velocity[0]*dt;this.position[2]+=this.velocity[2]*dt;} else { this.position[0]+=this.velocity[0]*dt;this.position[2]+=this.velocity[2]*dt; }
    game.constrainPlayer(this);
    if((input.isMouseDown(0)||input.isDown('f')) && this.shotClock<=0) this.shoot(game);
    if(this.hurtClock>this.stats.shieldRegenDelay && this.shield<this.maxShield) this.shield=Math.min(this.maxShield,this.shield+this.stats.shieldRegen*dt);
    if(this.overdrive>0) { this.ultimate=Math.min(100,this.ultimate+dt*4); if(Math.random()<dt*25) game.particles.trail(this.position,'gold',1); }
  }
  dash(direction,game) {
    if(this.dashCooldownTimer>0 || this.dead)return; const d=normalize3([0,0,0],direction); this.velocity[0]=d[0]*this.stats.dashSpeed;this.velocity[2]=d[2]*this.stats.dashSpeed;this.position[0]+=d[0]*2.5;this.position[2]+=d[2]*2.5;this.dashClock=.22;this.dashCooldownTimer=this.stats.dashCooldown;this.invulnerable=.42; game.audio.dash();game.particles.burst(this.position,'cyan',22,{speed:8,spread:.6,life:.5,size:[2,6],gravity:0});game.shake=.22;game.addFeed('VECTOR SHIFT // clean exit','good');
  }
  shoot(game) {
    const count=this.stats.projectiles; const base=this.rotation; const spread=this.stats.spread; this.shotClock=1/(this.stats.fireRate*(this.overdrive>0?1.5:1)); this.shotCount++; game.audio.shot();
    for(let i=0;i<count;i++){const offset=count===1?0:(i-(count-1)/2)*spread; const yaw=base+offset; game.spawnPlayerProjectile(this.position,yaw,this.stats.damage*(this.overdrive>0?1.28:1));}
    if(this.stats.echoShots && this.shotCount%6===0) { setTimeout(()=>{ if(!this.dead&&game.state==='playing') game.spawnPlayerProjectile(this.position,base,this.stats.damage*.5,'echo'); },100); }
    game.particles.sparks([this.position[0]+Math.sin(base)*.8,.95,this.position[2]+Math.cos(base)*.8],'pale',3);
  }
  voidPulse(game) {
    if(this.pulseCooldown>0)return; this.pulseCooldown=this.stats.pulseCooldown;game.audio.pulse();game.shake=.45;game.particles.ring(this.position,'violet',34);game.particles.burst(this.position,'violet',30,{speed:7,spread:1,life:.75,size:[2,7],gravity:0});
    for(const enemy of game.enemies){if(enemy.dead)continue;const d=distance3(this.position,enemy.position);if(d<this.stats.pulseRadius){const fall=1-d/this.stats.pulseRadius;enemy.takeDamage(this.stats.pulseDamage*(.55+.45*fall),game,true);const dx=enemy.position[0]-this.position[0],dz=enemy.position[2]-this.position[2],l=Math.hypot(dx,dz)||1;enemy.velocity[0]+=dx/l*10;enemy.velocity[2]+=dz/l*10;}}
    game.addFeed(`VOID PULSE // ${game.enemies.filter(e=>!e.dead&&distance3(this.position,e.position)<this.stats.pulseRadius).length} signatures erased`,'good');
  }
  activateOverdrive(game) { this.ultimate=0;this.overdrive=this.stats.overdriveDuration;game.audio.level();game.shake=.55;game.particles.ring(this.position,'gold',45);game.addFeed('OVERDRIVE // lattice unlocked','good'); }
  takeDamage(amount,game,source='impact') {
    if(this.invulnerable>0||this.dead)return false; amount*=1-this.stats.damageReduction; this.hurtClock=0; let remaining=amount; if(this.shield>0){const absorbed=Math.min(this.shield,remaining);this.shield-=absorbed;remaining-=absorbed;} if(remaining>0)this.health-=remaining; this.invulnerable=.08;game.audio.hurt();game.shake=Math.min(1,game.shake+.25);game.ui.flashDamage();game.particles.burst([this.position[0],1.1,this.position[2]],'red',12,{speed:4,spread:.7,life:.45,size:[2,5],gravity:0}); if(this.stats.reactive)game.particles.sparks(this.position,'violet',8); if(this.health<=0){this.health=0;this.dead=true;game.onPlayerDeath(source);} return true;
  }
  gainXP(amount,game) {
    this.xp+=amount; this.ultimate=Math.min(100,this.ultimate+amount*this.stats.ultimateRate*.22); while(this.xp>=this.xpToNext){this.xp-=this.xpToNext;this.level++;this.xpToNext=Math.floor(this.xpToNext*1.22+24);game.onLevelUp();} game.audio.pickup();
  }
  render(renderer,meshes,game) {
    const model=new Float32Array(16); const bob=Math.sin(this.age*5)*.045; const flash=this.invulnerable>0&&Math.floor(this.age*30)%2===0; const bodyColor=flash?[1,1,1]:C.cyan;
    composeTransform(model,[this.position[0],1.02+bob,this.position[2]],[0,this.rotation,0],[.72,.42,1.02]);renderer.draw(meshes.playerBody,model,bodyColor,.65);
    composeTransform(model,[this.position[0],1.31+bob,this.position[2]],[0,this.rotation,0],[.42,.19,.66]);renderer.draw(meshes.playerCore,model,flash?[1,1,1]:C.pale,1.15);
    composeTransform(model,[this.position[0],.76+bob,this.position[2]],[0,this.rotation,0],[1.04,.055,1.33]);renderer.draw(meshes.playerWing,model,C.violet,.46);
    for(const side of [-1,1]){composeTransform(model,[this.position[0]+side*.64*Math.cos(this.rotation),.82+bob,this.position[2]-side*.64*Math.sin(this.rotation)],[0,this.rotation,side*.08],[.09,.08,.55]);renderer.draw(meshes.playerFin,model,C.cyan,1);}
    composeTransform(model,[this.position[0],.27,this.position[2]],[0,0,0],[1.1,.025,1.1]);renderer.draw(meshes.ring,model,C.cyan,.95,.48,true);
    if(this.overdrive>0){composeTransform(model,[this.position[0],1.1,this.position[2]],[Math.PI/2,0,0],[1.35,1.35,1.35]);renderer.draw(meshes.ring,model,C.gold,1.2,.42,true);}
  }
}

const ENEMY_TYPES = {
  skitter: {name:'SKITTER',health:30,speed:4.4,radius:.62,damage:10,xp:16,score:120,color:C.pink,fireCooldown:99},
  hunter: {name:'HUNTER',health:58,speed:3.3,radius:.86,damage:13,xp:26,score:220,color:C.violet,fireCooldown:2.6},
  spitter: {name:'SPITTER',health:44,speed:2.3,radius:.76,damage:16,xp:32,score:280,color:C.orange,fireCooldown:2.1},
  brute: {name:'BRUTE',health:190,speed:1.45,radius:1.35,damage:26,xp:62,score:600,color:C.red,fireCooldown:99},
  sentinel: {name:'SENTINEL',health:110,speed:1.8,radius:1.02,damage:19,xp:48,score:430,color:C.gold,fireCooldown:3.8},
  architect: {name:'RIFT ARCHITECT',health:820,speed:1.2,radius:2.35,damage:32,xp:280,score:3600,color:C.violet,fireCooldown:1.9,boss:true},
};

export class Enemy extends Entity {
  constructor(type,position,level=1) { super(position); this.type=type;this.profile=ENEMY_TYPES[type]||ENEMY_TYPES.skitter;this.position[1]=this.profile.boss?2.35:1;this.level=level;this.maxHealth=this.profile.health*(1+(level-1)*.16);this.health=this.maxHealth;this.speed=this.profile.speed*(1+(level-1)*.025);this.radius=this.profile.radius;this.rotation=rand(0,TAU);this.fireClock=rand(.5,2);this.attackClock=0;this.hitFlash=0;this.stagger=0;this.marked=0;this.orbit=rand(0,TAU);this.orbitDirection=Math.random()<.5?-1:1; }
  update(dt,game) {
    this.age+=dt;this.fireClock-=dt;this.attackClock-=dt;this.hitFlash=Math.max(0,this.hitFlash-dt);this.stagger=Math.max(0,this.stagger-dt);this.marked=Math.max(0,this.marked-dt); if(this.dead)return; const player=game.player; const dx=player.position[0]-this.position[0], dz=player.position[2]-this.position[2], dist=Math.hypot(dx,dz)||1; const dir=[dx/dist,0,dz/dist]; let desired=[dir[0]*this.speed,0,dir[2]*this.speed];
    if(this.type==='spitter'||this.type==='sentinel'){const preferred=this.type==='spitter'?13:16;const tangent=[-dir[2]*this.orbitDirection,0,dir[0]*this.orbitDirection];const radial=(dist-preferred)*.45;desired=[dir[0]*radial+tangent[0]*this.speed*.8,0,dir[2]*radial+tangent[2]*this.speed*.8];}
    if(this.type==='architect'){const preferred=11;const tangent=[-dir[2],0,dir[0]];const radial=(dist-preferred)*.28;desired=[dir[0]*radial+tangent[0]*this.speed*.65,0,dir[2]*radial+tangent[2]*this.speed*.65];}
    if(this.stagger>0){desired[0]*=.2;desired[2]*=.2;} this.velocity[0]=damp(this.velocity[0],desired[0],3.2,dt);this.velocity[2]=damp(this.velocity[2],desired[2],3.2,dt);this.position[0]+=this.velocity[0]*dt;this.position[2]+=this.velocity[2]*dt;game.constrainEnemy(this);
    this.rotation=Math.atan2(dir[0],dir[2]);
    if(dist<this.radius+player.radius+.7 && this.attackClock<=0){this.attackClock=this.type==='brute'?1.4:1;player.takeDamage(this.profile.damage*(this.type==='brute'?1.2:1),game,this.profile.name);const push=(this.type==='brute'?7:3);player.velocity[0]+=dir[0]*push;player.velocity[2]+=dir[2]*push;}
    if(this.profile.fireCooldown<90 && this.fireClock<=0){this.fireClock=this.profile.fireCooldown*(.85+Math.random()*.3);if(this.type==='architect')this.fireClock*=.7;game.spawnEnemyProjectile(this,player);}
    if(this.type==='architect' && Math.random()<dt*.12 && game.enemies.filter(e=>!e.dead).length<22){const a=Math.random()*TAU;game.spawnEnemy('skitter',[this.position[0]+Math.sin(a)*3,0,this.position[2]+Math.cos(a)*3]);}
  }
  takeDamage(amount,game,critical=false) { if(this.dead)return; if(this.marked>0)amount*=1+game.player.stats.markBonus;this.health-=amount;this.hitFlash=.1;this.stagger=this.type==='brute'?.04:.12;game.audio.hit(critical);game.particles.sparks([this.position[0],this.position[1],this.position[2]],critical?'gold':this.profile.color===C.red?'red':'cyan',critical?8:3); if(this.health<=0)game.killEnemy(this,critical); }
  render(renderer,meshes,game) {
    const model=new Float32Array(16);const c=this.hitFlash>0?C.white:this.profile.color;const pulse=1+Math.sin(this.age*4+this.id)*.035;
    if(this.type==='skitter'){composeTransform(model,[this.position[0],.72+Math.sin(this.age*9)*.06,this.position[2]],[0,this.rotation,0],[.64,.48,.64]);renderer.draw(meshes.enemySkitter,model,c,.45);for(const side of [-1,1]){composeTransform(model,[this.position[0]+Math.sin(this.rotation)*side*.45,.42,this.position[2]+Math.cos(this.rotation)*side*.45],[0,this.rotation,side*.18],[.08,.08,.52]);renderer.draw(meshes.enemyLimb,model,c,.3);}}
    else if(this.type==='hunter'){composeTransform(model,[this.position[0],1.12+Math.sin(this.age*4)*.08,this.position[2]],[0,this.rotation,0],[.88,.72,.88]);renderer.draw(meshes.enemyHunter,model,c,.5);composeTransform(model,[this.position[0],1.22,this.position[2]],[0,this.rotation,0],[.25,.18,.72]);renderer.draw(meshes.enemyEye,model,C.pale,1.1);}
    else if(this.type==='spitter'){composeTransform(model,[this.position[0],1.12+Math.sin(this.age*3)*.07,this.position[2]],[0,this.rotation,0],[.72,.9,.72]);renderer.draw(meshes.enemySpitter,model,c,.45);composeTransform(model,[this.position[0]+Math.sin(this.rotation)*.2,1.5+Math.sin(this.age*3)*.07,this.position[2]+Math.cos(this.rotation)*.2],[0,this.rotation,0],[.2,.2,.4]);renderer.draw(meshes.enemyEye,model,C.gold,1.2);}
    else if(this.type==='brute'){composeTransform(model,[this.position[0],1.35+Math.sin(this.age*2)*.05,this.position[2]],[0,this.rotation,0],[1.3*pulse,1.4*pulse,1.3*pulse]);renderer.draw(meshes.enemyBrute,model,c,.3);composeTransform(model,[this.position[0],1.47,this.position[2]],[0,this.rotation,0],[.38,.25,.78]);renderer.draw(meshes.enemyEye,model,C.red,1.15);}
    else if(this.type==='sentinel'){composeTransform(model,[this.position[0],1.5+Math.sin(this.age*2.5)*.1,this.position[2]],[0,this.rotation,0],[1.05,.4,1.05]);renderer.draw(meshes.enemySentinel,model,c,.65);composeTransform(model,[this.position[0],1.65,this.position[2]],[Math.PI/2,0,0],[.65,.65,.65]);renderer.draw(meshes.ring,model,C.gold,.8,.5,true);}
    else {const phase=this.health/this.maxHealth;composeTransform(model,[this.position[0],2.35+Math.sin(this.age*2)*.12,this.position[2]],[0,this.rotation,0],[2.2,2.1,2.2]);renderer.draw(meshes.boss,model,c,.55);composeTransform(model,[this.position[0],2.55,this.position[2]],[0,this.rotation,0],[.6,.38,1.3]);renderer.draw(meshes.enemyEye,model,C.pale,1.25);composeTransform(model,[this.position[0],.28,this.position[2]],[0,0,0],[2.6,.04,2.6]);renderer.draw(meshes.ring,model,C.pink,.9,.38,true);}
    const hp=this.health/this.maxHealth; if(hp<.999){const width=this.profile.boss?3.6:1.35;composeTransform(model,[this.position[0],this.profile.boss?4.7:2.2,this.position[2]],[0,this.rotation,0],[width,.028,.08]);renderer.draw(meshes.healthBar,model,[.12,.16,.21],0,1,true);composeTransform(model,[this.position[0]-width*(1-hp),this.profile.boss?4.705:2.205,this.position[2]],[0,this.rotation,0],[width*hp,.032,.09]);renderer.draw(meshes.healthBar,model,this.profile.boss?C.pink:C.cyan,1,1,true);}
    if(this.marked>0){composeTransform(model,[this.position[0],this.profile.boss?5.1:2.55,this.position[2]],[Math.PI/2,0,0],[this.radius*1.2,this.radius*1.2,this.radius*1.2]);renderer.draw(meshes.ring,model,C.gold,1,.6,true);}
  }
}

export class Projectile extends Entity {
  constructor(position,velocity,owner,damage,color='cyan',kind='player') { super(position);this.velocity=velocity.slice();this.owner=owner;this.damage=damage;this.color=color;this.kind=kind;this.life=kind==='player'?1.7:3.7;this.radius=kind==='player'?.24:.3;this.rotation=Math.atan2(velocity[0],velocity[2]); }
  update(dt,game) { this.age+=dt;this.life-=dt;if(this.life<=0){this.dead=true;return;}this.position[0]+=this.velocity[0]*dt;this.position[1]+=this.velocity[1]*dt;this.position[2]+=this.velocity[2]*dt;if(Math.abs(this.position[0])>45||Math.abs(this.position[2])>45){this.dead=true;return;} if(this.kind==='player'){for(const enemy of game.enemies){if(enemy.dead)continue;if(distanceSq3(this.position,enemy.position)<(this.radius+enemy.radius*.72)**2){const critical=Math.random()<game.player.stats.critChance;enemy.takeDamage(this.damage*(critical?game.player.stats.critMultiplier:1),game,critical);if(game.player.stats.markChance&&Math.random()<game.player.stats.markChance)enemy.marked=4;game.particles.burst(this.position,critical?'gold':'cyan',critical?9:4,{speed:4,spread:.8,life:.3,size:[2,5],gravity:0});this.dead=true;game.player.ultimate=Math.min(100,game.player.ultimate+1.4);break;}}} else if(distanceSq3(this.position,game.player.position)<(this.radius+game.player.radius)**2){game.player.takeDamage(this.damage,game,'RIFT BOLT');game.particles.burst(this.position,'red',8,{speed:3,spread:.8,life:.35,gravity:0});this.dead=true;}}
  render(renderer,meshes) { const model=new Float32Array(16);const y=this.position[1],stretch=this.kind==='player'?.72:.52;composeTransform(model,[this.position[0],y,this.position[2]],[0,this.rotation,0],[this.radius*.65,this.radius*.65,stretch]);renderer.draw(meshes.projectile,model,this.color==='red'?C.red:this.color==='gold'?C.gold:this.color==='violet'?C.violet:C.cyan,1.25,.96,true); }
}

export class Pickup extends Entity {
  constructor(position,type='xp',value=10) { super(position);this.type=type;this.value=value;this.life=15;this.radius=.24;this.seed=rand(0,TAU); }
  update(dt,game) {this.age+=dt;this.life-=dt;if(this.life<=0){this.dead=true;return;}const target=game.player;const d=distance3(this.position,target.position);if(d<target.stats.pickupRange+this.radius){const dx=target.position[0]-this.position[0],dz=target.position[2]-this.position[2],l=Math.hypot(dx,dz)||1;const speed=d<3?14:6;this.velocity[0]=damp(this.velocity[0],dx/l*speed,5,dt);this.velocity[2]=damp(this.velocity[2],dz/l*speed,5,dt);this.position[0]+=this.velocity[0]*dt;this.position[2]+=this.velocity[2]*dt;} if(d<.85){this.dead=true;game.collectPickup(this);}}
  render(renderer,meshes) {const model=new Float32Array(16);const bob=.44+Math.sin(this.age*4+this.seed)*.1;composeTransform(model,[this.position[0],bob,this.position[2]],[0,this.age*2+this.seed,Math.sin(this.age*3)*.2],[.23,.38,.23]);renderer.draw(meshes.pickup,model,this.type==='health'?C.red:this.type==='charge'?C.gold:C.cyan,1.05,.93,true);composeTransform(model,[this.position[0],bob,this.position[2]],[Math.PI/2,0,0],[.38,.38,.38]);renderer.draw(meshes.ring,model,this.type==='health'?C.red:C.cyan,.7,.35,true);}
}

export class RiftNode extends Entity {
  constructor(position,index) {super([position[0],0,position.length>2?position[2]:position[1]]);this.index=index;this.charge=0;this.active=false;this.completed=false;this.radius=2.1;this.spin=rand(0,TAU);}
  update(dt,game) {this.age+=dt;this.spin+=dt*(this.active?1.4:.4);const d=distance3(this.position,game.player.position);if(this.active&&!this.completed&&d<this.radius){this.charge=clamp(this.charge+dt*.1,0,1);if(Math.random()<dt*6)game.particles.trail([this.position[0]+rand(-1,1),.3,this.position[2]+rand(-1,1)],'violet',1);if(this.charge>=1){this.completed=true;this.active=false;game.onNodeSecured(this);}}}
  render(renderer,meshes) {const model=new Float32Array(16);const col=this.completed?C.green:this.active?C.violet:C.slate;composeTransform(model,[this.position[0],.17,this.position[2]],[0,0,0],[1.8,.12,1.8]);renderer.draw(meshes.ring,model,col,this.active?1:.25,.42,true);for(let i=0;i<3;i++){const a=this.spin+i*TAU/3;composeTransform(model,[this.position[0]+Math.sin(a)*.65,.55+Math.sin(this.age*2+i)*.08,this.position[2]+Math.cos(a)*.65],[0,a,0],[.12,.55,.12]);renderer.draw(meshes.pylon,model,col,this.active?1:.28);}
    composeTransform(model,[this.position[0],.62+Math.sin(this.age*2)*.12,this.position[2]],[0,this.spin,0],[.24,.38,.24]);renderer.draw(meshes.pickup,model,col,this.active?1.2:.3,.8,true); if(this.active&&!this.completed){composeTransform(model,[this.position[0],.2,this.position[2]],[Math.PI/2,0,0],[2.25,2.25,2.25]);renderer.draw(meshes.ring,model,C.violet,.65,.22,true);}}
}

export { C, ENEMY_TYPES };
