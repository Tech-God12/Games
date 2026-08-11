
import * as THREE from 'three';
export class NOVAClass {
  constructor(){
    this.name='NOVA'; this.displayName='NOVA RUNNER'; this.id='nova';
    this.stats={ health:101, shield:82, speed:6.25233016662288, jumpHeight:1.237032654087632, abilityCooldown:22.583245549494094 };
    this.abilities={ tactical:{ name:'NOVA Tactical', cooldown:17.812295392436624, duration:5, effect:'dash' }, ultimate:{ name:'NOVA Ultimate', cooldown:147.1174988305434, duration:12, effect:'aetherstorm' }, passive:{ name:'NOVA Passive', effect:'regeneration' } };
    this.lore='Classified runner from sector 9. Specializes in recon.';
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
      position:center, radius:27.66251822380155, duration:this.abilities.ultimate.duration,
      tick:0, type:this.abilities.ultimate.effect,
      update:(dt)=>{
        ultimateEffect.tick+=dt;
        const pulse=Math.sin(ultimateEffect.tick*5)*0.5+0.5;
        // Ultimate-specific area damage/logic
        for(let enemy of world.enemies){
          if(enemy.position.distanceTo(center) < ultimateEffect.radius){
            enemy.takeDamage(38.79782235723023*dt, 'ultimate');
          }
        }
      }
    };
    world.activeUltimates.push(ultimateEffect);
    return true;
  }
  getMovementModifiers(){
    return { speedMultiplier:0.94, jumpMultiplier:0.95, slideMultiplier:1.32 };
  }
}
