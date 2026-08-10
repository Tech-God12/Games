// Smoke test: import the full game module graph (minus the WebGL/DOM engine)
// and the content layer, then assert every registry populated correctly.
import { register } from 'node:module';
register('./three-loader.mjs', import.meta.url);

const { ContentStats } = await import('../src/content/index.js');
const { WeaponRegistry } = await import('../src/weapons/WeaponRegistry.js');
const { EnemyRegistry } = await import('../src/enemies/EnemyRegistry.js');
const { ItemRegistry } = await import('../src/items/ItemRegistry.js');
const { PerkRegistry } = await import('../src/perks/PerkRegistry.js');
const { AbilityRegistry } = await import('../src/abilities/AbilityRegistry.js');
const { CharacterRegistry } = await import('../src/player/Characters.js');
const { BossRegistry } = await import('../src/bosses/BossRegistry.js');
const { UpgradePool } = await import('../src/progression/UpgradePool.js');
const { Behaviors } = await import('../src/ai/Behaviors.js');
const { BossAbilities } = await import('../src/bosses/Boss.js');

// Import the Game module to verify the entire game import graph resolves.
const { Game } = await import('../src/game/Game.js');

function check(name, got, min) {
  const ok = got >= min;
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${name}: ${got}${ok ? '' : ` (expected >= ${min})`}`);
  if (!ok) process.exitCode = 1;
}

console.log('--- Content registry counts ---');
check('weapons', WeaponRegistry.count(), 30);
check('enemies', EnemyRegistry.count(), 30);
check('items', ItemRegistry.count(), 30);
check('perks', PerkRegistry.count(), 15);
check('abilities', AbilityRegistry.count(), 8);
check('characters', CharacterRegistry.count(), 6);
check('bosses', BossRegistry.count(), 6);
check('upgrades', UpgradePool.count(), 20);
check('behaviors', Behaviors.names().length, 15);
check('boss abilities', Object.keys(BossAbilities).length, 6);
console.log('--- Module graph ---');
console.log('OK   Game class loaded:', typeof Game === 'function');
console.log('--- All imports resolved successfully ---');
