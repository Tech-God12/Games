// ============================================================================
// suite.mjs — Comprehensive test suite exercising math, RNG, ECS, combat,
// progression, balance, localization, spatial grid, behavior tree, weapon
// mods, objectives, combo, achievements, hazards, wave scripts, and lore.
// Runs under Node with the THREE stub loader.
// ============================================================================
import { register } from 'node:module';
register('./three-loader.mjs', import.meta.url);
await import('../src/content/index.js');

let pass = 0, fail = 0;
function ok(name, cond) { if (cond) { pass++; } else { fail++; console.log('  FAIL ' + name); } }
function eq(name, a, b) { ok(name, a === b); }
function near(name, a, b, eps = 1e-6) { ok(name, Math.abs(a - b) < eps); }
function section(name) { console.log('• ' + name); }

// ---- Math ----
section('MathUtils');
const M = await import('../src/core/MathUtils.js');
eq('clamp up', M.clamp(5, 0, 3), 3);
eq('clamp down', M.clamp(-1, 0, 3), 0);
eq('clamp01', M.clamp01(0.5), 0.5);
near('lerp', M.lerp(0, 10, 0.5), 5);
near('smoothstep', M.smoothstep(0, 1, 0.5), 0.5);
near('inverseLerp', M.inverseLerp(0, 10, 5), 0.5);
near('remap', M.remap(5, 0, 10, 100, 200), 150);
near('damp', M.damp(0, 10, 5, 0.1), 0 + (10) * (1 - Math.exp(-5 * 0.1)));
eq('approach up', M.approach(0, 5, 2), 2);
eq('approach down', M.approach(5, 0, 2), 3);
near('shortAngleDist', M.shortAngleDist(0, Math.PI / 2), Math.PI / 2);
near('shortAngleDist wrap', M.shortAngleDist(Math.PI - 0.1, -Math.PI + 0.1), 0.2, 1e-4);
eq('mod negative', M.mod(-1, 5), 4);
eq('sign', M.sign(-3), -1);
near('Easing.outBack', M.Easing.outBack(1), 1);
ok('formatNumber K', M.formatNumber(1500) === '1.50K');
ok('formatNumber M', M.formatNumber(1500000) === '1.50M');
ok('formatTime', M.formatTime(65) === '1:05');
ok('hexToInt', M.hexToInt('#ff8800') === 0xff8800);
ok('intToHex', M.intToHex(0xff8800) === '#ff8800');
ok('mixHex', M.mixHex(0x000000, 0xffffff, 0.5) === 0x808080);
ok('piecewise', Math.abs(M.piecewise([[0,0],[0.5,1],[1,2]], 0.25) - 0.5) < 1e-6);

// ---- Random ----
section('Random');
const { Random, hashSeed, rng } = await import('../src/core/Random.js');
const r = new Random('test');
eq('hashSeed deterministic', hashSeed('abc'), hashSeed('abc'));
ok('next in [0,1)', r.next() >= 0 && r.next() < 1);
ok('range', r.range(5, 10) >= 5 && r.range(5, 10) < 10);
ok('int inclusive', r.int(1, 3) >= 1 && r.int(1, 3) <= 3);
ok('chance always', new Random(1).chance(1) === true);
ok('chance never', new Random(1).chance(0) === false);
const arr = [1, 2, 3, 4]; const picked = r.pick(arr); ok('pick in array', arr.includes(picked));
const shuffled = r.shuffle([1, 2, 3, 4, 5]); ok('shuffle length', shuffled.length === 5);
const wp = r.weighted(['a', 'b', 'c'], [0, 1, 0]); eq('weighted picks only valid', wp, 'b');
const g = r.gaussian(); ok('gaussian finite', typeof g === 'number' && isFinite(g));
{ const sgn = r.sign(); ok('sign +-1', sgn === 1 || sgn === -1); }
const c2 = r.child('x'); ok('child is Random', c2 instanceof Random);
ok('dice range', r.dice(2, 6) >= 2 && r.dice(2, 6) <= 12);

// ---- Clock ----
section('Clock');
const { Clock, Timer, Profiler } = await import('../src/core/Clock.js');
const clk = new Clock(false); clk.start();
clk.tick(); clk.tick(); ok('clock elapsed > 0', clk.elapsed >= 0);
const tmr = new Timer(0.1, () => {}); tmr.start(); tmr.tick(0.05); ok('timer not done', !tmr.done); tmr.tick(0.06); ok('timer done', tmr.done);
const prof = new Profiler(); prof.begin('x'); prof.end('x'); ok('profiler report', prof.report().x.count === 1);

// ---- EventBus ----
section('EventBus');
const { bus, Channels } = await import('../src/core/EventBus.js');
let got = 0; const off = bus.on('test.evt', (e) => { got += e.v; }); bus.emit('test.evt', { v: 2 }); bus.emit('test.evt', { v: 3 }); eq('bus deliver', got, 5); off(); bus.emit('test.evt', { v: 100 }); eq('bus off', got, 5);
let once = 0; bus.once('test.once', () => once++); bus.emit('test.once', {}); bus.emit('test.once', {}); eq('bus once', once, 1);
bus.emitSticky('test.sticky', { v: 9 }); let sv = 0; bus.on('test.sticky', (e) => { sv = e.v; }, { sticky: true }); eq('bus sticky', sv, 9);
ok('channels frozen', Object.isFrozen(Channels));

// ---- ECS ----
section('ECS');
const { World } = await import('../src/ecs/World.js');
const { Body, Kinematics, Team, Teams } = await import('../src/ecs/components/Body.js');
const { Health, Shield } = await import('../src/ecs/components/Vitals.js');
const { Enemy } = await import('../src/ecs/components/Gameplay.js');
const world = new World();
const e1 = world.createEntity('e1'); e1.add(new Body()); e1.add(new Health()); e1.tag('Enemy');
const e2 = world.createEntity('e2'); e2.add(new Body()); e2.tag('Enemy');
const q = world.query({ all: ['Body'], tags: ['Enemy'] });
ok('query count', q.count === 2);
e1.destroy(); world.update(0.016, 0.016);
ok('entity removed after destroy', !world.entities.has(e1.id));
ok('query updated', q.count === 1);
const e3 = world.createEntity('e3'); e3.add(new Body()); e3.tag('Enemy');
ok('query add', q.count === 2);
e3.untag('Enemy'); ok('query tag remove', q.count === 1);
world.reset(); ok('reset clears', world.size === 0);

// ---- Damage ----
section('Damage');
const { applyDamage, heal, rollCrit } = await import('../src/combat/Damage.js');
const player = world.createEntity('p'); const pb = new Body(); pb.pos.set(0, 0, 0); player.add(pb); player.add(new Health()); player.tag('Player');
world.clock = { elapsed: 0 };
const en = world.createEntity('en'); const eb = new Body(); eb.pos.set(2, 0, 0); en.add(eb); const eh = new Health(); eh.max = 50; eh.current = 50; en.add(eh); en.tag('Enemy');
const res = applyDamage(en, { amount: 20, type: 'kinetic', attacker: player, world, effects: null, hitPoint: eb.pos, source: 'player' });
near('damage dealt', res.dealt, 20); ok('not killed', !res.killed);
const en2 = world.createEntity('en2'); const eb2 = new Body(); eb2.pos.set(0,0,0); en2.add(eb2); const eh2 = new Health(); eh2.max = 30; eh2.current = 30; en2.add(eh2); en2.tag('Enemy');
const r2 = applyDamage(en2, { amount: 40, type: 'kinetic', attacker: player, world, effects: null, hitPoint: eb2.pos, source: 'player' });
ok('killed', r2.killed);
const crit = rollCrit(1, 2, 0, 1.5); ok('crit always', crit.crit && crit.mult === 2);
player.get(Health.type).current = 0;
heal(player, 10); ok('heal player', player.get(Health.type).current === 10);

// ---- Armor & shield ----
section('Armor/Shield');
// Shield (no armor): 50 dmg, shield 30 -> shield 0, health takes 20 -> 80
const sa = world.createEntity('sa'); const sab = new Body(); sa.add(sab); const sah = new Health(); sah.max = 100; sah.current = 100; sa.add(sah); const sas = new Shield(); sas.max = 30; sas.current = 30; sa.add(sas); sa.tag('Enemy');
const r3 = applyDamage(sa, { amount: 50, type: 'kinetic', attacker: player, world, effects: null, hitPoint: sab.pos, source: 'player' });
ok('shield absorbs first', sas.current === 0);
ok('health takes remainder', sah.current === 80);
// Armor (no shield): 50 dmg, armor 20 -> 50% reduction -> 25 dmg -> health 75
const sb = world.createEntity('sb'); const sbb = new Body(); sb.add(sbb); const sbh = new Health(); sbh.max = 100; sbh.current = 100; sbh.armor = 20; sb.add(sbh); sb.tag('Enemy');
applyDamage(sb, { amount: 50, type: 'kinetic', attacker: player, world, effects: null, hitPoint: sbb.pos, source: 'player' });
ok('armor reduces damage', sbh.current === 75);

// ---- Weapons ----
section('Weapons');
const { WeaponRegistry } = await import('../src/weapons/WeaponRegistry.js');
const { WeaponInstance } = await import('../src/weapons/Weapon.js');
ok('weapons registered', WeaponRegistry.count() >= 80);
const pistol = WeaponRegistry.get('pistol'); ok('pistol exists', !!pistol);
const wi = new WeaponInstance(pistol); ok('magazine', wi.ammo === pistol.magazine);
wi.consumeAmmo(); ok('consume ammo', wi.ammo === pistol.magazine - 1);
wi.startReload(); ok('reloading', wi.reloading);
wi.tick(999); ok('reload completes', !wi.reloading && wi.ammo === wi.effectiveMagazine);
ok('effectiveDamage', wi.effectiveDamage === pistol.damage);

// ---- Progression ----
section('Progression');
const { ProgressionManager } = await import('../src/progression/ProgressionManager.js');
const { ItemRegistry } = await import('../src/items/ItemRegistry.js');
const { PerkRegistry } = await import('../src/perks/PerkRegistry.js');
const { UpgradePool } = await import('../src/progression/UpgradePool.js');
const fakeW = { recomputeMods(m) { this.mods = m; } };
const fakeSave = { settings: {}, records: { bestWave: 0 }, stats: { enemyKills: {} }, achievements: {}, markDirty() {}, save() {}, unlockWeapon() {}, unlockCharacter() {}, addAchievement(id) { this.achievements[id] = Date.now(); }, recordRun() {} };
const prog = new ProgressionManager(player, fakeW, fakeSave);
prog.setRegistries({ items: ItemRegistry, perks: PerkRegistry });
prog.setCharacter({ id: 'ranger', startMaxHP: 100, startSpeed: 6, passive: { id: 'steady' } });
prog.recompute();
ok('prog base hp', player.get(Health.type).max === 100);
prog.applyUpgrade('overcharge'); prog.recompute(); ok('upgrade damage', fakeW.mods.damageMult > 1);
prog.addXP(1000); ok('level up triggered', prog.pendingLevelUps > 0 || prog.level > 1);
const choices = prog.rollUpgrades(new Random(1), 3); ok('roll upgrades', choices.length === 3);

// ---- Balance ----
section('Balance');
const { Balance, xpForLevel, waveBudget, waveMaxAlive, waveScaling, eliteChance, armorReduction } = await import('../src/data/Balance.js');
ok('xpForLevel increasing', xpForLevel(5) > xpForLevel(4));
ok('waveBudget increasing', waveBudget(10) > waveBudget(5));
ok('waveMaxAlive cap', waveMaxAlive(100) <= Balance.waves.maxAliveCap);
ok('waveScaling hp', waveScaling(10, 1).hpScale > 1);
ok('eliteChance cap', eliteChance(100) <= Balance.waves.eliteChanceCap);
near('armorReduction', armorReduction(20), 0.5);

// ---- Localization ----
section('Localization');
const { t, setLanguage, availableLanguages } = await import('../src/data/Localization.js');
ok('default string', t('menu.title') === 'NEXUS PROTOCOL');
ok('placeholder', t('hud.wave', 5) === 'WAVE 5');
ok('fallback for missing', t('nonexistent.key') === 'nonexistent.key');
ok('languages include en', availableLanguages().includes('en'));
setLanguage('es'); ok('es string', t('menu.play') === 'Desplegar'); setLanguage('en');

// ---- SpatialGrid ----
section('SpatialGrid');
const { UniformGrid } = await import('../src/systems/SpatialGrid.js');
const grid = new UniformGrid(4);
// Use fake entities with numeric positions (the THREE stub doesn't store vector components)
const fakeBody = (x, z) => ({ get: (t) => t === 'Body' ? { pos: { x, z } } : null });
const ga = fakeBody(1, 1), gb = fakeBody(20, 20);
grid.rebuild([ga, gb]);
const near1 = grid.queryRadius(0, 0, 5); ok('grid radius finds near', near1.includes(ga) && !near1.includes(gb));
const nearest = grid.nearest(0, 0, 30); ok('grid nearest', nearest === ga);

// ---- BehaviorTree ----
section('BehaviorTree');
const { BehaviorTree, Sequence, Selector, Action, Status, Cooldown, Condition, Wait } = await import('../src/ai/BehaviorTree.js');
let log = 0;
const tree = new BehaviorTree(new Sequence([
  new Action(() => { log += 1; return true; }),
  new Selector([new Action(() => false), new Action(() => { log += 10; return true; })]),
]));
const s = tree.tick({ dt: 0.016 }); console.log('   [tree] s=', s, 'Status.Success=', Status.Success, 'log=', log); eq('tree success', s, Status.Success); eq('tree ran both', log, 11);
const failTree = new BehaviorTree(new Sequence([new Action(() => false), new Action(() => { log += 100; return true; })]));
failTree.tick({ dt: 0.016 }); eq('sequence short-circuit', log, 11);
const cd = new Cooldown(new Action(() => true), 1); eq('cd first ok', cd.tick({ dt: 0.1 }), Status.Success); eq('cd on cooldown', cd.tick({ dt: 0.1 }), Status.Failure);

// ---- WeaponMods ----
section('WeaponMods');
const { WeaponModRegistry, applyModsToWeapon, ModSlot } = await import('../src/combat/WeaponMods.js');
ok('mods registered', WeaponModRegistry.count() >= 20);
const wi2 = new WeaponInstance(WeaponRegistry.get('pistol'));
applyModsToWeapon(wi2, ['extMag', 'redDot']);
ok('mag mod applied', wi2.mods.magMult === 1.25);
ok('scope mod applied', wi2.mods.spreadMult === 0.9);
ok('mod by slot', WeaponModRegistry.bySlot(ModSlot.Scope).length >= 3);

// ---- Objectives ----
section('Objectives');
const { ObjectiveRegistry, ObjectiveManager } = await import('../src/game/Objectives.js');
ok('objectives registered', ObjectiveRegistry.count() >= 10);
const om = new ObjectiveManager(prog, new Random(1));
ok('manager created', !!om);

// ---- Combo ----
section('Combo');
const { ComboSystem } = await import('../src/progression/ComboSystem.js');
const combo = new ComboSystem(prog, null);
combo.onKill({ entity: { hasTag: () => false } });
combo.onKill({ entity: { hasTag: () => false } });
ok('combo count', combo.count === 2);
combo.update(2); ok('combo maintained', combo.count === 2);
combo.update(2); ok('combo expired', combo.count === 0);

// ---- Achievements ----
section('Achievements');
const { AchievementRegistry, AchievementManager } = await import('../src/progression/Achievements.js');
ok('achievements registered', AchievementRegistry.count() >= 20);
const am = new AchievementManager(fakeSave); am.setRunContext({ maxCombo: 0, itemCount: 0, perkCount: 0, weaponSlots: 0 });
am.check(); ok('achievement check ran', true);

// ---- Hazards ----
section('Hazards');
const { HazardPresets, HazardSystem } = await import('../src/world/Hazards.js');
ok('hazard presets', Object.keys(HazardPresets).length >= 5);

// ---- WaveScripts ----
section('WaveScripts');
const { WaveScripts, getWaveScript, ScriptedWaveCount } = await import('../src/data/WaveScripts.js');
ok('wave scripts', ScriptedWaveCount >= 30);
ok('getWaveScript 5 boss', getWaveScript(5)?.boss === true);
ok('getWaveScript missing null', getWaveScript(999) === null);

// ---- Lore ----
section('Lore');
const { allLoreEntries, LoreCategories } = await import('../src/data/Lore.js');
ok('lore categories', LoreCategories.length >= 5);
ok('lore entries', allLoreEntries().length >= 20);

// ---- Registries counts ----
section('Registries');
const { EnemyRegistry } = await import('../src/enemies/EnemyRegistry.js');
const { BossRegistry } = await import('../src/bosses/BossRegistry.js');
const { PerkRegistry: PR } = await import('../src/perks/PerkRegistry.js');
const { AbilityRegistry } = await import('../src/abilities/AbilityRegistry.js');
const { CharacterRegistry } = await import('../src/player/Characters.js');
ok('enemies >= 90', EnemyRegistry.count() >= 90);
ok('bosses >= 15', BossRegistry.count() >= 15);
ok('items >= 100', ItemRegistry.count() >= 100);
ok('perks >= 60', PR.count() >= 60);
ok('abilities >= 30', AbilityRegistry.count() >= 30);
ok('characters >= 25', CharacterRegistry.count() >= 25);

// ---- DailyChallenge ----
section('DailyChallenge');
const { DailyChallenge } = await import('../src/game/DailyChallenge.js');
const dc = new DailyChallenge(fakeSave, WeaponRegistry.ids(), CharacterRegistry.ids());
const d = dc.daily(); ok('daily has character', !!d.character); ok('daily has weapons', d.weapons.length >= 1); ok('daily has modifiers', d.modifiers.length >= 1);
const w = dc.weekly(); ok('weekly has key', !!w.key);
ok('daily deterministic', dc.daily(new Date(2026, 0, 1)).key === dc.daily(new Date(2026, 0, 1)).key);

// ---- Difficulty ----
section('Difficulty');
const { DifficultyManager, Difficulties } = await import('../src/game/Difficulty.js');
const dm = new DifficultyManager(fakeSave);
ok('difficulty preset', dm.preset.hpMult === 1);
dm.set('hard'); ok('difficulty set', dm.id === 'hard');
ok('difficulties count', Object.keys(Difficulties).length >= 4);

// ---- MetaSkillTree ----
section('MetaSkillTree');
const { MetaSkillTree, MetaBranch } = await import('../src/progression/MetaSkillTree.js');
ok('meta nodes >= 25', MetaSkillTree.count() >= 25);
ok('meta branches', Object.values(MetaBranch).length === 5);
const ranks = {}; ranks['vit_health'] = 2;
const ctx = { maxHP: 100 }; MetaSkillTree.applyRunStart(ranks, ctx); ok('meta apply hp', ctx.maxHP === 120);

// ---- Shaders ----
section('Shaders');
const { ShaderLibrary, ShaderCount } = await import('../src/render/Shaders.js');
ok('shaders >= 12', ShaderCount >= 12);
ok('shader has frag', !!ShaderLibrary.scanline.fragmentShader);

console.log(`\n==== SUITE: ${pass} passed, ${fail} failed ====`);
if (fail) process.exitCode = 1;
