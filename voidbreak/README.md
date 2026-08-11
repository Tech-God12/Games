# VOIDBREAK — Survive the Breach

A **roguelite arena-survival FPS** built from absolute scratch: custom WebGL2 engine, procedural everything, zero dependencies, zero shipped assets.

The Breach opened. Something crawled through. You hold the line — wave after wave of corrupted Void creatures, building a monster of a loadout as you go.

## Play it

```
node server.js      # serves on http://localhost:8080
```

Click DEPLOY → pick a mode → pick a difficulty. WASD to move, mouse to aim, click to fire.

## What's inside (~22,000 lines)

| Layer | What it does |
|---|---|
| **Engine** (`src/gfx/`) | From-scratch WebGL2 renderer: GLSL 300 es shaders, Blinn-Phong + PCF shadow maps, MSAA bloom post-chain (vignette/grade/grain/FXAA/colorblind), instanced particles, decals, tracers, procedural skybox, procedural meshes & canvas textures |
| **Math** (`src/core/`) | Vec2/3, Mat4, Quat, Color, seeded RNG, Perlin/simplex/value noise, collision geometry (ray/AABB/frustum), event bus, FSM, object pools, fixed-timestep loop, settings/storage |
| **Combat** (`src/game/weapons/`, `combat/`) | 16 weapons across 6 behavior archetypes (hitscan/projectile/beam/charge/grenade/melee), recoil patterns, damage model with falloff/crits/headshots/armor/element statuses |
| **AI** (`src/game/ai/`, `enemies/`) | FSM brains with vision cones + hearing, flocking separation, wall avoidance; 11 enemy archetypes + 2 phase-gated bosses |
| **Roguelite** (`src/game/upgrades/`) | 85 upgrades across 4 rarities with real gameplay hooks (drones, turrets, ricochets, chain lightning…) |
| **Wave director** (`src/game/waves/`) | Budgeted procedural wave composition, difficulty curves, elite rolls, boss schedule, 4 game modes |
| **Audio** (`src/audio/`) | 100% synthesized: ~120 SFX definitions, adaptive 16-step music sequencer (intensity layers + boss mode), ambience |
| **Meta** (`src/game/meta/`) | Score/combos, run stats, 60 achievements, persistent records + weapon unlocks |
| **UI** (`src/ui/`) | Full HUD (vitals/ammo/crosshair/hitmarkers/damage numbers/killfeed/minimap/boss bar), menus, upgrade cards, armory |

## Development

```
npm test         # 105 unit tests (pure Node, zero deps)
npm run check    # syntax-check every file
npm run count    # line counter
node tools/headless_harness.js 90   # boots the real game headless and plays it
```

## Modes
- **ENDLESS PROTOCOL** — survive as long as you can
- **BLITZ** — 10 brutal waves, double rewards
- **CRUCIBLE** — 15 waves, elite-heavy gauntlet
- **PRACTICE RANGE** — targets, weapons, zero pressure

*No frameworks. No assets. No audio files. Just math, shaders, and synthesized sound.*
