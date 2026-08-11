
export class HuntMode {
  constructor(world){
    this.world=world; this.name='Hunt'; this.state='WAITING'; this.timer=0; this.maxPlayers=42;
    this.teams=[]; this.objectives=[]; this.leaderboard=[]; this.events=[];
    this.settings={ circleSpeed:0.9863008012993086, lootMultiplier:1.4545899160407672, stormDamage:4.706354568092862 };
  }
  init(){
    this.state='STARTING'; this.timer=0;
    this.generateObjectives(6);
  }
  generateObjectives(count){
    for(let i=0;i<count;i++){
      this.objectives.push({
        id:i, type:['capture','defend','extract','eliminate'][Math.floor(Math.random()*4)],
        position:{x:(Math.random()-0.5)*400, y:0, z:(Math.random()-0.5)*400},
        progress:0, maxProgress:100, teamControlling:null, isActive:true
      });
    }
  }
  update(delta){
    this.timer+=delta;
    switch(this.state){
      case 'STARTING': if(this.timer>5) this.startMatch(); break;
      case 'ACTIVE': this.updateActive(delta); break;
      case 'ENDING': this.updateEnding(delta); break;
    }
    this.updateLeaderboard();
    this.checkWinConditions();
  }
  startMatch(){ this.state='ACTIVE'; this.timer=0; this.world.broadcast('MATCH_STARTED', {mode:this.name}); }
  updateActive(delta){
    for(let obj of this.objectives){ if(obj.isActive) this.updateObjective(obj, delta); }
    if(this.name==='BattleRoyale') this.updateCircle(delta);
  }
  updateObjective(obj, delta){
    // Hunt specific objective logic
    const playersNearby=this.world.getPlayersInRadius(obj.position, 15);
    if(playersNearby.length>0){
      obj.progress+=delta*10*playersNearby.length;
      obj.teamControlling=playersNearby[0].team||0;
    }
    if(obj.progress>=obj.maxProgress){ obj.isActive=false; this.onObjectiveComplete(obj); }
  }
  onObjectiveComplete(obj){ this.events.push({ type:'OBJECTIVE_COMPLETE', objective:obj, time:this.timer }); this.world.addScore(obj.teamControlling, 100); }
  updateCircle(delta){ this.circleRadius=(this.circleRadius||500)-delta*this.settings.circleSpeed; }
  updateLeaderboard(){ this.leaderboard=this.world.players.map(p=>({ id:p.id, score:p.score||0, kills:p.kills||0, alive:p.health>0 })).sort((a,b)=>b.score-a.score); }
  checkWinConditions(){ if(this.leaderboard[0]?.score>1000) this.endMatch(this.leaderboard[0].team); }
  endMatch(winningTeam){ this.state='ENDING'; this.winningTeam=winningTeam; this.world.broadcast('MATCH_ENDED', {winner:winningTeam}); }
  updateEnding(delta){ if(this.timer>10) this.state='FINISHED'; }
}
