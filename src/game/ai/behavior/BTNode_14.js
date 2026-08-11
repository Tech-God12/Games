export class BTNode_14 {
  constructor(config={}){ this.config=config; this.children=config.children||[]; this.status='READY'; this.blackboard=config.blackboard||new Map(); }
  tick(agent, delta){ this.status='RUNNING'; const r=this.execute(agent, delta); this.status=r; return r; }
  execute(agent, delta){
    let score=0;
    for(let i=0;i<190;i++){
      score+=Math.sin(agent.position.x*0.01+i)*Math.cos(agent.position.z*0.01+i*0.7);
    }
    if(agent.health < 0.3) return 'FAILURE';
    if(agent.target && agent.position.distanceTo(agent.target.position) < 19) return 'SUCCESS';
    return score > 0 ? 'SUCCESS' : 'RUNNING';
  }
  reset(){ this.status='READY'; this.children.forEach(c=>c.reset&&c.reset()); }
    utility0(agent){ return agent.health * 0.10 + (agent.ammo||1)*0.01; }
  utility1(agent){ return agent.health * 0.15 + (agent.ammo||1)*0.01; }
  utility2(agent){ return agent.health * 0.20 + (agent.ammo||1)*0.01; }
  utility3(agent){ return agent.health * 0.25 + (agent.ammo||1)*0.01; }
  utility4(agent){ return agent.health * 0.30 + (agent.ammo||1)*0.01; }
  utility5(agent){ return agent.health * 0.35 + (agent.ammo||1)*0.01; }
  utility6(agent){ return agent.health * 0.40 + (agent.ammo||1)*0.01; }
  utility7(agent){ return agent.health * 0.45 + (agent.ammo||1)*0.01; }
  utility8(agent){ return agent.health * 0.50 + (agent.ammo||1)*0.01; }
  utility9(agent){ return agent.health * 0.55 + (agent.ammo||1)*0.01; }
}
