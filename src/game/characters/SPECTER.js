
import * as THREE from 'three';
export class SPECTERClass {
  constructor(){
    this.name='SPECTER'; this.displayName='SPECTER RUNNER'; this.id='specter';
    this.stats={ health:102, shield:63, speed:6.686590421878556, jumpHeight:1.2117565561910628, abilityCooldown:17.325584783366878 };
    this.abilities={ tactical:{ name:'SPECTER Tactical', cooldown:15.546548187523463, duration:5, effect:'shield' }, ultimate:{ name:'SPECTER Ultimate', cooldown:133.82730537096714, duration:12, effect:'aetherstorm' }, passive:{ name:'SPECTER Passive', effect:'wallrun' } };
    this.lore='Classified runner from sector 9. Specializes in assault.';
  }
  applyPassive(player){
    switch(this.abilities.passive.effect){
      case 'wallrun': player.canWallRun=true; player.wallRunTime=3; break;
      case 'doublejump': player.maxJumps=2; break;
      case 'regeneration': player.healthRegenRate=0.5; break;
      case 'hacker': player.hackSpeed=1.5; break;
    }
  }
  useTactical(player, world){
    if(player.abilityCooldowns.tactical>0) return false;
    player.abilityCooldowns.tactical=this.abilities.tactical.cooldown;
    // Complex tactical logic
    const center=player.position.clone();
    for(let i=0;i<20;i++){
      const dir=new THREE.Vector3((Math.random()-0.5), Math.random(), (Math.random()-0.5)).normalize();
      const effect={ position:center.clone().add(dir.multiplyScalar(2+i*0.5)), velocity:dir.multiplyScalar(5+Math.random()*5), lifetime:2+Math.random()*2, type:this.abilities.tactical.effect };
      world.effects.push(effect);
    }
    return true;
  }
  useUltimate(player, world){
    if(player.abilityCooldowns.ultimate>0) return false;
    player.abilityCooldowns.ultimate=this.abilities.ultimate.cooldown;
    const center=player.position.clone();
    const ultimateEffect={
      position:center, radius:28.07218594150026, duration:this.abilities.ultimate.duration,
      tick:0, type:this.abilities.ultimate.effect,
      update:(dt)=>{
        ultimateEffect.tick+=dt;
        const pulse=Math.sin(ultimateEffect.tick*5)*0.5+0.5;
        // Ultimate-specific area damage/logic
        for(let enemy of world.enemies){
          if(enemy.position.distanceTo(center) < ultimateEffect.radius){
            enemy.takeDamage(30.976888442805183*dt, 'ultimate');
          }
        }
      }
    };
    world.activeUltimates.push(ultimateEffect);
    return true;
  }
  getMovementModifiers(){
    return { speedMultiplier:0.96, jumpMultiplier:0.97, slideMultiplier:1.38 };
  }
}
