
import * as THREE from 'three';
export class VOLTClass {
  constructor(){
    this.name='VOLT'; this.displayName='VOLT RUNNER'; this.id='volt';
    this.stats={ health:117, shield:84, speed:5.314875947525522, jumpHeight:1.6650058050038143, abilityCooldown:18.421970278443215 };
    this.abilities={ tactical:{ name:'VOLT Tactical', cooldown:15.567029848118345, duration:5, effect:'cloak' }, ultimate:{ name:'VOLT Ultimate', cooldown:102.48902621061748, duration:12, effect:'aetherstorm' }, passive:{ name:'VOLT Passive', effect:'doublejump' } };
    this.lore='Classified runner from sector 9. Specializes in support.';
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
      position:center, radius:21.753609022785568, duration:this.abilities.ultimate.duration,
      tick:0, type:this.abilities.ultimate.effect,
      update:(dt)=>{
        ultimateEffect.tick+=dt;
        const pulse=Math.sin(ultimateEffect.tick*5)*0.5+0.5;
        // Ultimate-specific area damage/logic
        for(let enemy of world.enemies){
          if(enemy.position.distanceTo(center) < ultimateEffect.radius){
            enemy.takeDamage(47.45477453905176*dt, 'ultimate');
          }
        }
      }
    };
    world.activeUltimates.push(ultimateEffect);
    return true;
  }
  getMovementModifiers(){
    return { speedMultiplier:1.00, jumpMultiplier:1.14, slideMultiplier:1.31 };
  }
}
