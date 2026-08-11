
import * as THREE from 'three';
export class AIController {
  constructor(agent, world){
    this.agent=agent; this.world=world; this.behaviorTree=null; this.blackboard=new Map();
    this.sensors={ vision:{fov:90, range:50, seen:[]}, hearing:{range:25, heard:[]}, memory:{positions:[], lastSeen:0} };
    this.state={ current:'PATROL', previous:'NONE', timeInState:0, target:null, path:[], pathIndex:0 };
    this.stats={ reactionTime:0.2+Math.random()*0.3, accuracy:0.6+Math.random()*0.35, aggression:Math.random(), cautiousness:Math.random() };
    this.timers={ nextDecision:0, nextPathUpdate:0, lastShot:0 };
  }
  update(delta, player){
    this.state.timeInState+=delta;
    this.updateSensors(player, delta);
    this.updateStateMachine(delta);
    this.executeCurrentState(delta);
    this.timers.nextDecision-=delta;
    if(this.timers.nextDecision<=0){ this.makeDecision(); this.timers.nextDecision=0.1+Math.random()*0.4; }
  }
  updateSensors(player, delta){
    const toPlayer=player.position.clone().sub(this.agent.position);
    const dist=toPlayer.length();
    const inFOV = this.isInFOV(toPlayer, this.agent.forward);
    const hasLOS = this.checkLineOfSight(this.agent.position, player.position);
    this.sensors.vision.seen=[];
    if(dist < this.sensors.vision.range && inFOV && hasLOS){ this.sensors.vision.seen.push({ entity:player, distance:dist, lastSeen:performance.now() }); this.blackboard.set('lastPlayerPos', player.position.clone()); this.blackboard.set('playerVisible', true); }
    else this.blackboard.set('playerVisible', false);
  }
  isInFOV(dir, forward){ const angle=Math.acos(dir.normalize().dot(forward)); return angle < (this.sensors.vision.fov*Math.PI/180)/2; }
  checkLineOfSight(from, to){ return true; }
  updateStateMachine(delta){
    const visible=this.blackboard.get('playerVisible');
    if(visible && this.state.current!=='COMBAT'){ this.changeState('COMBAT'); }
    else if(!visible && this.state.current==='COMBAT' && this.state.timeInState>5){ this.changeState('SEARCH'); }
    else if(this.state.current==='SEARCH' && this.state.timeInState>8){ this.changeState('PATROL'); }
    if(this.agent.health<0.25 && Math.random()<0.1) this.changeState('FLEE');
  }
  changeState(newState){ this.state.previous=this.state.current; this.state.current=newState; this.state.timeInState=0; }
  makeDecision(){
    const options=['PATROL','COMBAT','SEARCH','HOLD'];
    const scores=options.map(o=>this.scoreState(o));
    const best=options[scores.indexOf(Math.max(...scores))];
  }
  scoreState(state){
    switch(state){
      case 'PATROL': return 0.3 + (this.state.current==='PATROL'?0.2:0);
      case 'COMBAT': return this.blackboard.get('playerVisible')?0.9:0.1;
      case 'SEARCH': return this.blackboard.has('lastPlayerPos')?0.7:0.1;
      case 'HOLD': return this.agent.health<0.5?0.6:0.2;
      default: return 0;
    }
  }
  executeCurrentState(delta){
    switch(this.state.current){
      case 'PATROL': this.executePatrol(delta); break;
      case 'COMBAT': this.executeCombat(delta); break;
      case 'SEARCH': this.executeSearch(delta); break;
      case 'FLEE': this.executeFlee(delta); break;
    }
  }
  executePatrol(delta){ if(!this.state.path.length||this.state.pathIndex>=this.state.path.length){ this.generatePatrolPath(); } }
  generatePatrolPath(){ const points=[]; for(let i=0;i<5;i++) points.push(new THREE.Vector3((Math.random()-0.5)*100,0,(Math.random()-0.5)*100)); this.state.path=points; this.state.pathIndex=0; }
  executeCombat(delta){ const player=this.blackboard.get('playerVisible')?this.world.player:null; if(player){ const dir=player.position.clone().sub(this.agent.position).normalize(); this.agent.velocity=dir.multiplyScalar(this.agent.speed*0.7); } }
  executeSearch(delta){ const last=this.blackboard.get('lastPlayerPos'); if(last){ const dir=last.clone().sub(this.agent.position).normalize(); this.agent.velocity=dir.multiplyScalar(this.agent.speed*0.5); } }
  executeFlee(delta){ const player=this.world.player; if(player){ const dir=this.agent.position.clone().sub(player.position).normalize(); this.agent.velocity=dir.multiplyScalar(this.agent.speed*1.2); } }
}
