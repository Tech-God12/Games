export const UPGRADES = [
  { id:'prism-core', icon:'◈', name:'Prism Core', tag:'WEAPON', text:'Weapon output +28%. Critical hits shed a second bolt.', apply: stats => { stats.damage *= 1.28; stats.critChain += 1; } },
  { id:'afterburner', icon:'✧', name:'Afterburner', tag:'MOBILITY', text:'Move speed +22%. Dash cooldown reduced by 1.2 sec.', apply: stats => { stats.speed *= 1.22; stats.dashCooldown = Math.max(1.8, stats.dashCooldown - 1.2); } },
  { id:'aegis-weave', icon:'⬡', name:'Aegis Weave', tag:'DEFENSE', text:'Maximum shield +35. Shield recharge begins sooner.', apply: stats => { stats.maxShield += 35; stats.shieldRegenDelay = Math.max(1.5, stats.shieldRegenDelay - .7); stats.shield = stats.maxShield; } },
  { id:'magnetic-siphon', icon:'◎', name:'Magnetic Siphon', tag:'SYNC', text:'Collect range +70%. Recover 3% hull when a shard arrives.', apply: stats => { stats.pickupRange *= 1.7; stats.lifesteal += .03; } },
  { id:'split-lance', icon:'⟡', name:'Split Lance', tag:'WEAPON', text:'Fire one additional lance at a 12° offset. Damage -8%.', apply: stats => { stats.projectiles += 1; stats.damage *= .92; stats.spread += .21; } },
  { id:'coolant-loop', icon:'◌', name:'Coolant Loop', tag:'SYSTEM', text:'Fire rate +35%. Ability cooldowns tick 18% faster.', apply: stats => { stats.fireRate *= 1.35; stats.cooldownRate *= 1.18; } },
  { id:'void-lattice', icon:'✦', name:'Void Lattice', tag:'PULSE', text:'Void Pulse radius +35% and damage +60%.', apply: stats => { stats.pulseRadius *= 1.35; stats.pulseDamage *= 1.6; } },
  { id:'reactive-plating', icon:'▣', name:'Reactive Plating', tag:'DEFENSE', text:'Taking damage releases a shock spark and grants 10% damage reduction.', apply: stats => { stats.damageReduction += .1; stats.reactive = true; } },
  { id:'hunter-kernel', icon:'⌁', name:'Hunter Kernel', tag:'SYNC', text:'Gain 8% chance to mark enemies. Marked targets take 25% more damage.', apply: stats => { stats.markChance += .08; stats.markBonus += .25; } },
  { id:'singularity-motor', icon:'◉', name:'Singularity Motor', tag:'ULTIMATE', text:'Overdrive charges 25% faster and lasts 2 seconds longer.', apply: stats => { stats.ultimateRate += .25; stats.overdriveDuration += 2; } },
  { id:'lumen-skin', icon:'◇', name:'Lumen Skin', tag:'DEFENSE', text:'Maximum hull +40 and each wave begins with 15% hull restored.', apply: stats => { stats.maxHealth += 40; stats.health = Math.min(stats.maxHealth, stats.health + 40); stats.waveHeal = (stats.waveHeal||0) + .15; } },
  { id:'echo-rounds', icon:'≋', name:'Echo Rounds', tag:'WEAPON', text:'Every sixth shot repeats at 50% damage. Projectile speed +35%.', apply: stats => { stats.echoShots += 1; stats.projectileSpeed *= 1.35; } },
];

export function rollUpgrades(count=3, rng=Math.random) {
  const pool=UPGRADES.slice(); const result=[]; while(result.length<Math.min(count,pool.length)){ const index=Math.floor(rng()*pool.length); result.push(pool.splice(index,1)[0]); } return result;
}
