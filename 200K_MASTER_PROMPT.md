# NEXUS VEIL: SECTOR 9 — 200K LINES ZERO-SLOP ARCHIVAL PROTOCOL
### MASSIVE PROMPT FOR AUTONOMOUS AGENT — NO FILLER, NO SLOP, ONLY AAA SUBSTANCE
### SANDBOX MUST REMAIN OPEN (vite dev on 0.0.0.0:5173, allowedHosts:true)

---

## MISSION HEADER (READ THIS FIRST, 15 SEC)

You are tasked to TAKE the existing 102,426 line codebase (283 files) and ARCHIVE 200,000 lines of REAL, USED, PLAYTESTED CODE. Not 200k of `method_1, method_2` loops. Every single line must be:
1. **Called in game loop or imported by a system that is**
2. **Implementing a real algorithm (CSM, GOAP, SAT, Verlet, FBM, etc)**
3. **Documented with why it exists for fun/polish**

**Current State:** FPS Extraction BR playable, Titanfall movement, 6 weapons, 12 bots, 700x700 city, storm.

**Target State:** 200k lines, extraction shooter that rivals Apex + Tarkov + Hunt in depth, looks like a $2M indie.

**Hard Rules - ZERO TOLERANCE:**
- ❌ NO `method_0..method_50` filler loops. If you catch any file with that pattern, REWRITE IT FULLY with real logic before proceeding.
- ❌ NO empty classes, NO `TODO`, NO `console.log`.
- ✅ Every new file >= 350 lines of real logic.
- ✅ Every shader must be unique and used.
- ✅ Every weapon must have distinct recoil table hand-tuned, not seeded random.
- ✅ Every AI behavior must have utility scoring + memory + squad comms.
- ✅ Use THREE.js InstancedMesh, BVH, Octree, not just BoxGeometry spam.
- ✅ Measure: `find src -name "*.js" | xargs wc -l | tail -1` must read >=200000.

**Sandbox Rule:** Keep vite running on 0.0.0.0:5173 with allowedHosts:true. After each phase, `curl -I localhost:5173` must be 200. If not, reinstall and restart.

**Phasing Rule:** You MUST work in phases. Finish Phase 1 completely (commit to count), then SLEEP 60-90 seconds while reading next phase prompt to refresh context. This prevents context rot on 200k codebase. Do NOT skip sleep. Do NOT stop after sleep. Loop until Phase 10 and final 200k.

---

## PHASE 0: ENVIRONMENT SANITY (5 MIN)

- `npm install` - ensure three 0.162, vite 5
- `vite.config.js` must have: host 0.0.0.0, allowedHosts:true, port 5173
- `index.html` must have loading screen JS that works
- `src/main.js` must boot without errors
- `curl -I http://localhost:5173/` == 200
- Count baseline: 102426
- Commit: Chores

**Exit Criteria:** Game loads, you can move, shoot, minimap works, storm shrinks.

---

## PHASE 1: AUDIT & DE-SLOP — PURGE FILLER (REAL 12K REPLACEMENT)

**Goal:** The previous mega_gen created 80k lines of `method_x` slop. This is UNACCEPTABLE for 200k archive. You must REWRITE every slop file with REAL AAA implementation.

**Files To Purge (list all in src/engine/utils, renderer/*, physics/* etc that contain `method_`):**
- engine/utils/MathUtils, Noise, Random, ColorUtils, Easing, Pool, Octree, BVH, SpatialHash
- engine/renderer/* except Renderer.js
- engine/physics/* except PhysicsWorld.js
- engine/audio/*, input/*, networking/*
- game/.../all generated with genClass()

**For Each File, Replace With REAL Logic:**

- **MathUtils.js (600 lines real):**
  Implement: lerp, damp, spring (critical damping), catmullRom, bezier, quaternion slerp manual, matrix decomposition, frustum extract planes from proj matrix, ray-box, ray-sphere, closest point on segment, line-line dist, barycentric, perlin 3D, simplex 2D/3D, hash functions, PCG random, halton sequence, radical inverse.
  Must be used: Show import in main.js for at least 3 functions.

- **Noise.js (600 lines):**
  Implement: Perlin 1D/2D/3D with fade, gradients, Simplex 2D/3D (Stefan Gustavson), Worley cells, FBM with lacunarity/persistence/gain, Ridged FBM, Domain warp, curl noise for wind, 4D noise. Include visualization helpers.

- **Octree.js (800 lines):**
  Real octree: Node with bounds, depth, maxObjects 8, maxDepth 6, insert, remove, query Frustum, query Sphere, query Ray, rebalance, visualize helper returning Box3Helper meshes. Must be used for loot query and enemy culling.

- **BVH.js (800 lines):**
  Real BVH: SAH splitting, build from triangles, refit, raycast traversal stack, sphere query, frustum query, debug. Used for city building collision.

- **Physics Files:** Implement REAL SAT for OBB-OBB, Sphere-OBB, capsule, GJK stub, contact manifold generation with clip, sequential impulse solver, friction pyramid, restitution threshold, sleeping island.

**Method:** For each file, delete and write from scratch. No genClass. Each must have at least 1 new class + helpers.

**Count Goal After Phase1:** ~110k but 30k slop replaced with real -> still ~110k but quality 2x.

**Sleep:** 75 sec reading Phase2 while game compiles.

---

## PHASE 2: RENDERER ULTRA — PBR, CSM, VOLUMETRIC, DECALS, SSR (TARGET +18K)

**Goal:** Make game look super good, super expensive. No more basic MeshStandardMaterial spam.

**Modules to Build (each 500-900 lines real):**

1. **src/engine/renderer/PBRMaterialLibrary.js (1200 lines):**
   - Create 32 materials: RustIron (rust mask + clearcoat), NeonEmissive (emissive scroll), AetherCrystal (transmission, ior 1.6, thickness), WetAsphalt (clearcoat + sheen), HoloMetal (anisotropic + iridescence), etc.
   - Each material has: albedo, roughnessMap procedural, metalness, normalMap generation via FBM, emissive pulse.
   - Function `createHologramMaterial(color, scrollSpeed, flicker)` with custom ShaderMaterial extending physical.

2. **src/engine/renderer/CSMShadowManager.js (900 lines):**
   - Cascaded Shadow Maps 4 cascades. Compute split distances log+uniform blend lambda 0.5. For each cascade: orthographic camera fit to frustum slice, shadow map 2048, PCF 3x3, fade between cascades. Update method takes camera.
   - Must integrate: Replace single sun shadow with CSM. Show shadow cascade debug colors.

3. **src/engine/renderer/VolumetricFog.js (850 lines):**
   - Full screen quad raymarch 32 steps. Uniforms: fogDensity, scattering, sunDirection, noiseTex. FBM for density, height falloff exp, sun scattering phase Mie + Rayleigh. Interpolate with scene depth. Used as post pass.

4. **src/engine/renderer/ScreenSpaceReflections.js (800 lines):**
   - SSR: raymarch in view space, binary search refine, thickness check, fading at edges. 1-line utils: viewPosFromDepth.

5. **src/engine/renderer/DecalSystem.js REAL (700 lines):**
   - Deferred decals: Box projection, clip against normal, fade. Methods: addBulletDecal(pos, normal, type), addScorch, addBlood. Pool 256 decals, LRU.

6. **src/shaders/environment/SkyShader.js REAL (600 lines):**
   - Physically based sky: Perez model, sun disk, aerial perspective, moon, stars cubemap hash, cloud layer raymarch 6 octaves.

**Integration:** All must be imported in main.js and affect visuals. No unused shader files.

**Count After:** ~128k

**Sleep:** 60 sec reading Phase3, let shaders compile.

---

## PHASE 3: PHYSICS & MOVEMENT MASTERY — TITANFALL++

**Goal:** Movement feels 10/10. Not just WASD, but mantling, ledge grab, grappling hook, slide wallrun chaining.

**New Systems (each 600-1000 lines):**

1. **src/engine/physics/CharacterController.js REAL (1100 lines):**
   - Capsule collider, sweep test against world colliders (use Octree query), step offset 0.4, slope limit 45deg, skin width 0.08, depenetration via MTD. Methods: move(delta, inputDir), jump(), isGrounded via sphereCast down 0.15. Handle mantling: if velocity hits wall and space held and height diff 0.4-2.0, trigger mantle lerp.

2. **src/game/characters/ParkourSystem.js REAL (1000 lines):**
   - State machine: Grounded, Airborne, WallRunning (left/right), Sliding, Mantling, Grappling.
   - WallRun: detect wall normal via raycast 0.75, require speed >5, airtime>0.15, cooldown 0.35 after wall jump. WallRun camera tilt 12deg, FOV +5.
   - Mantle: check ledge via 2 raycasts (forward at chest, down from top), if hits, lerp player over 0.35 sec with cubic easing.
   - Grapple: raycast 45m, if hits, create rope constraint (Verlet or spring), pull player, allow swing. Use  src/game/abilities/GrappleAbility.js.

3. **src/game/characters/MovementTuning.js (700 lines):**
   - Data table for 8 classes: baseSpeed, sprintMult, airControl, jumpHeight, wallRunTime, slideFriction, dashDistance. Each class must FEEL different: WRAITH 7.2 speed weak wallrun 1.2s, TITAN 5.5 speed strong mantle, etc.

4. **src/engine/physics/RopeSimulation.js REAL (800 lines):**
   - Verlet rope: N segments 12, constraints iterations 12, stiffness 0.85, damping 0.06, gravity, wind via curl noise. Method: attach(start,end), simulate(delta). Render via TubeGeometry or Line.

**Hook into main:** Replace old checkCollision with CharacterController.move(). Test mantling on crates (already 90 crates excellent for this).

**Count After:** ~132k + 3.6k = ~136k

**Sleep:** 90 sec reading Phase4 (physics heavy needs context refresh).

---

## PHASE 4: AUDIO ARCHITECTURE — PROCEDURAL DSP, OCCLUSION, REVERB (12K)

**Goal:** Audio feels next-gen, not single oscillator beeps.

**Modules:**

1. **src/engine/audio/AudioOcclusion.js (900 lines):**
   - Raycast 5 points from source to listener, count hits against colliders Octree. Occlusion 0-1 mapped to lowpass freq 22000->600, volume -0..-12db. Diffraction around corners. Cache.

2. **src/engine/audio/ReverbZone.js (800 lines):**
   - Zone with Box3, impulse response generated via Schroeder reverberator (comb + allpass). Parameters: roomSize, decay, damping, spread. ConvolverNode. Blend based on distance to zone.

3. **src/engine/audio/WeaponSynth.js (1100 lines):**
   - Procedural weapon sound synth: layer kick (sine 80Hz decay 0.1s), body (filtered noise), tail (reverb send), mechanical (click). Each weapon has ADSR + filter.

4. **src/engine/audio/AmbienceSystem.js (700 lines):**
   - City ambience: wind based on height, distant sirens randomized Poisson 15-40s, engine hum loops with 3D position, drone flybys.

**Integration:** All enemy shots must use occlusion. Footsteps must have material detection (raycast ground to get collider type).

**Count After:** ~140k

**Sleep:** 65 sec

---

## PHASE 5: WORLD BUILDING — 800x800 HANDCRAFTED + PROCEDURAL HYBRID (20K)

**Goal:** Map goes from random crates to handcrafted sectors with lore.

**Systems:**

1. **src/game/world/SectorManager.js (1200 lines):**
   - Divide map into 16 sectors 200x200. Each sector has type NeonRuins etc, population curve, loot density, POI count. Manage streaming: load/unload InstancedMesh groups based on player distance 300.

2. **src/game/world/POIManager.js REAL (1100 lines):**
   - Create 15 POIs: Reactor Core (verticality), Neon Market (cover dense), Aether Well (low ground pit), Skybridge (sniper), DataCrypt (indoors), etc. Each POI defined by JSON: buildings layout, cover positions array Vec3, spawn points, extraction eligibility, lore text.

3. **src/game/world/StructurePlacer.js (900 lines):**
   - Procedural placement using Poisson disk sampling 18 min distance, avoid road network (roads as splines). Place buildings from prefab library (create 12 prefabs: Tower, L-shaped, Warehouse, etc each as Group).

4. **src/game/world/InstancedCityRenderer.js NEW (1000 lines):**
   - Use THREE.InstancedMesh for 400 building windows, 600 crates. Single draw call. Per-instance color via InstancedBufferAttribute. Frustum cull via bounding sphere.

5. **src/game/world/WeatherSystem.js (900 lines):**
   - Rain particles 2000 via Points, puddle ripple decal, wetness parameter lerp material roughness down, thunder flash: point light + screen exposure.

**Map Must:** Have at least 1 indoor area with walls/ceiling (DataCrypt) using CSG-like boxes.

**Count After:** ~160k

**Sleep:** 80 sec

---

## PHASE 6: ARSENAL EXPANSION — 25→50 WEAPONS, ATTACHMENTS, MODS (+18K)

**Goal:** 50 weapons each with hand-tuned recoil table (not random), distinct.

**Tasks:**

1. Rewrite all 25 existing weapons to have REAL recoil tables:
   - Each weapon file must contain 30-element array Vector2 recoil offsets hand placed like: initial vertical climb 0.8, then right drift, etc. Not Math.random().
   - Include: damage falloff curve array, spread bloom curve, reload anim timeline (mag out 0.2, mag in 0.5, bolt 0.7).

2. Add 25 new weapons (26-50):
   - Categories: AR, SMR, LMG, Shotgun, DMR, Sniper, Pistol, Launcher, Energy, Melee.
   - Examples: NVX-Burst (3 round), Voltaic Railgun (charge), Scatter Blaster, etc.
   - Each file >=400 lines: describe manufacturer lore, stats, pros/cons, attachment slots.

3. **AttachmentSystem.js REAL (1200 lines):**
   - 6 slots: optic (red dot, holo, 2x, 4x, 8x with FOV change), barrel (suppressor reduces muzzle flash light + audio reverb, compensator reduces H recoil 18%), underbarrel (grip reduces V recoil ramp), stock (ADS speed), mag (size), perk (fast reload, steady aim).
   - Each attachment has modifiers object with multiplier/additive applied in recalcStats.

**Integration:** Picking up loot must sometimes give attachments.

**Count After:** ~178k

**Sleep:** 70 sec

---

## PHASE 7: AI DIRECTOR & SQUAD TACTICS — GOAP + SQUAD (12K)

**Goal:** Bots feel like Apex squads, not spray.

**Systems:**

1. **src/game/ai/GOAPPlanner.js (1000 lines):**
   - Goal Oriented Action Planning: Goals Attack, Flee, Heal, Loot, Position. Actions have preconditions/effects/cost. A* over action graph.

2. **src/game/ai/SquadManager.js (1100 lines):**
   - Group 12 bots into 4 squads of 3. Shared blackboard: enemy positions, loot claims. Tactics: Flank (one pins, two flank left/right offset 15m), Push (simultaneous), Retreat to cover. Voice lines via text.

3. **src/game/ai/CoverSystem.js (900 lines):**
   - Sample cover points from world colliders: for each crate/building edge, create 2-4 cover nodes with direction to threat, quality score based on height and angle. Query best cover near bot.

4. **src/game/ai/AIDirector.js (800 lines):**
   - Manages pace: if player hasn't seen combat 25s, spawn scavenger drone; if player low health, reduce bot aggression 20%; if player on killstreak, spawn elite.

**Count After:** ~190k

**Sleep:** 85 sec

---

## PHASE 8: VFX & DESTRUCTION — PARTICLE PHYSICS, DESTRUCTIBLE CRATES (8K)

**Goal:** Every bullet has consequence.

**Systems:**

1. **src/game/effects/DestructionSystem.js (900 lines):**
   - Crates have HP 60. On damage > threshold, fracture into 6-8 shards (convex hull approximated boxes) with physics bodies, impulse from hit direction.

2. **src/game/effects/ImpactSystem.js REAL (800 lines):**
   - Material-based: concrete sparks, metal spark shower + decal, glass shatter Particles + sound, flesh blood.

3. **src/game/effects/WeatherEffect.js REAL (700 lines):**
   - Storm wall: cylindrical shader with panning noise + lightning occasional emissive flash.

**Count After:** ~198k

**Sleep:** 60 sec

---

## PHASE 9: PROGRESSION, ECONOMY, CRAFTING, SAVE (6K)

- Inventory grid 6x8 with rotation, weight, stacking.
- CraftingStation: combine materials to mods.
- Save via localStorage: stats, loadout.

**Count Goal:** EXACTLY 200,000+ lines. Use `find src -name "*.js" | xargs wc -l` and pad only with REAL code, not comments > 40%.

**Sleep:** 75 sec before final verification.

---

## PHASE 10: FINAL VERIFICATION & ARCHIVAL (NO SLOP AUDIT)

- Run `grep -R "method_" src --include="*.js" | wc -l` must be 0. If >0, FAIL, rewrite those files.
- Run `grep -R "TODO\|console.log" src --include="*.js" | wc -l` must be 0.
- Game must boot, 60fps+, you can extract.
- Commit, push, ensure PR updated.
- Produce final README with 200k proof.

---

## EXECUTION INSTRUCTIONS FOR AGENT

1. Create this prompt file (already done if reading).
2. Open sandbox: ensure vite dev running on 0.0.0.0:5173, allowedHosts true, curl 200.
3. START PHASE 1 immediately. Do not stop. After finishing Phase 1, run: `sleep 75 && echo "Phase1 done, reading Phase2"` then read Phase2 section again with fresh eyes.
4. After each phase, sleep 60-90 sec as noted, reading next phase prompt during sleep mental model (use bash sleep 70 etc).
5. Keep pushing after each phase (`git add src; git commit -m "phaseX..."; git push origin arena/...`).
6. Do NOT ask user for clarification. Be autonomous.
7. At end, present final line count proof and PR link.

---

## ANTI-SLOP CHECKLIST (Print this in each phase commit)

- [ ] No method_ loops
- [ ] No empty classes
- [ ] At least 60% logic, 40% max comments
- [ ] Imported and used
- [ ] Adds fun or polish

---

BEGIN NOW. Phase 0 immediate.
