
import * as THREE from 'three';
export class PHOENIXClass {
  constructor(){
    this.name='PHOENIX'; this.displayName='PHOENIX RUNNER'; this.id='phoenix';
    this.stats={ health:105, shield:77, speed:5.694052064916139, jumpHeight:1.535147764397634, abilityCooldown:17.880126980944056 };
    this.abilities={ tactical:{ name:'PHOENIX Tactical', cooldown:19.47119632480146, duration:5, effect:'dash' }, ultimate:{ name:'PHOENIX Ultimate', cooldown:145.97255444561085, duration:12, effect:'barrage' }, passive:{ name:'PHOENIX Passive', effect:'doublejump' } };
    this.lore='Classified runner from sector 9. Specializes in infiltration.';
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
      position:center, radius:28.184001596721306, duration:this.abilities.ultimate.duration,
      tick:0, type:this.abilities.ultimate.effect,
      update:(dt)=>{
        ultimateEffect.tick+=dt;
        const pulse=Math.sin(ultimateEffect.tick*5)*0.5+0.5;
        // Ultimate-specific area damage/logic
        for(let enemy of world.enemies){
          if(enemy.position.distanceTo(center) < ultimateEffect.radius){
            enemy.takeDamage(45.128492315107636*dt, 'ultimate');
          }
        }
      }
    };
    world.activeUltimates.push(ultimateEffect);
    return true;
  }
  getMovementModifiers(){
    return { speedMultiplier:0.98, jumpMultiplier:0.96, slideMultiplier:1.03 };
  }
}
