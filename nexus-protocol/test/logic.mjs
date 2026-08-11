// Logic smoke test: exercise the ECS, damage application, and progression
// recompute under Node (THREE stubbed) to catch runtime bugs in the sim core.
import { register } from 'node:module';
register('./three-loader.mjs', import.meta.url);

// Register all content (items/perks/etc.) so registries are populated.
await import('../src/content/index.js');

import { World } from '../src/ecs/World.js';
import { Body, Kinematics, Team, Teams } from '../src/ecs/components/Body.js';
import { Health, Shield } from '../src/ecs/components/Vitals.js';
import { Player } from '../src/ecs/components/Gameplay.js';
import { Experience } from '../src/ecs/components/Combat.js';
import { ProgressionManager } from '../src/progression/ProgressionManager.js';
import { applyDamage, heal } from '../src/combat/Damage.js';
import { ItemRegistry } from '../src/items/ItemRegistry.js';
import { PerkRegistry } from '../src/perks/PerkRegistry.js';
import { UpgradePool } from '../src/progression/UpgradePool.js';

let failures = 0;
function assert(name, cond) { if (cond) console.log('OK   ' + name); else { console.log('FAIL ' + name); failures++; } }

const world = new World();
// player
const player = world.createEntity('player');
const body = new Body(); body.pos.set(0, 1, 0); body.radius = 0.4; body.height = 1.7;
player.add(body);
const kin = new Kinematics(); player.add(kin);
const health = new Health(); health.max = 100; health.current = 100; player.add(health);
const team = new Team(); team.id = Teams.Player; player.add(team);
player.add(new Player());
player.tag('Player');

// fake weapon controller
const fakeWeapons = { recomputeMods(m) { this.mods = m; } };
const fakeSave = { settings: {}, records: { bestWave: 0 }, stats: { enemyKills: {} }, markDirty() {}, save() {}, unlockWeapon() {}, unlockCharacter() {}, addAchievement() {}, recordRun() {} };
const prog = new ProgressionManager(player, fakeWeapons, fakeSave);
prog.setRegistries({ items: ItemRegistry, perks: PerkRegistry });
prog.setCharacter({ id: 'ranger', startMaxHP: 100, startSpeed: 6, startShield: 0, passive: { id: 'steady' } });
prog.recompute();

assert('player max HP base 100', health.max === 100);
assert('weapon mods damageMult 1', fakeWeapons.mods.damageMult === 1);

// apply upgrades
assert('apply overcharge', prog.applyUpgrade('overcharge'));
assert('apply overcharge rank2', prog.applyUpgrade('overcharge'));
prog.recompute();
assert('damageMult ~1.24', Math.abs(fakeWeapons.mods.damageMult - 1.24) < 0.001);
assert('apply vitality', prog.applyUpgrade('vitality'));
prog.recompute();
assert('max HP 125', health.max === 125);

// add an item
prog.addItem('powerCore');
prog.recompute();
assert('item damageMult applied', Math.abs(fakeWeapons.mods.damageMult - (1.24 * 1.15)) < 0.001);

// damage an enemy
const enemy = world.createEntity('enemy');
const eb = new Body(); eb.pos.set(2, 0, 0); eb.radius = 0.5; eb.height = 1.2; enemy.add(eb);
const eh = new Health(); eh.max = 30; eh.current = 30; enemy.add(eh);
const exp = new Experience(); exp.value = 5; enemy.add(exp);
enemy.tag('Enemy');
world.clock = { elapsed: 1 };
const res = applyDamage(enemy, { amount: 40, type: 'kinetic', crit: false, headshot: false, knockback: 0, statusChance: 0, lifesteal: 0, armorPen: 0, attacker: player, world, effects: null, hitPoint: eb.pos, source: 'player' });
assert('enemy killed', res.killed === true);
assert('enemy dead', eh.alive === false);

// heal test (max is 125 after vitality)
health.current = 10;
const healed = heal(player, 30);
assert('heal adds 30', healed === 30 && health.current === 40);
const healed2 = heal(player, 999);
assert('heal clamps to max', health.current === 125 && healed2 === 85);

// world flush removes dead enemy
world.update(0.016, 0.016);
assert('dead enemy removed', !world.entities.has(enemy.id));

// shield absorb
const enemy2 = world.createEntity('e2');
const e2b = new Body(); e2b.pos.set(0,0,0); enemy2.add(e2b);
const e2h = new Health(); e2h.max = 50; e2h.current = 50; enemy2.add(e2h);
const e2s = new Shield(); e2s.max = 20; e2s.current = 20; enemy2.add(e2s);
const r2 = applyDamage(enemy2, { amount: 30, type:'kinetic', crit:false, headshot:false, knockback:0, statusChance:0, lifesteal:0, armorPen:0, attacker: player, world, effects:null, hitPoint: e2b.pos, source:'player' });
assert('shield absorbed 20', e2s.current === 0);
assert('health took 10', e2h.current === 40);
assert('e2 not killed', r2.killed === false);

console.log(failures === 0 ? '\nALL LOGIC TESTS PASSED' : `\n${failures} LOGIC TESTS FAILED`);
if (failures) process.exitCode = 1;
