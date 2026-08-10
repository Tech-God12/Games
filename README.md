# NEXUS: FRAGMENT — Battle Royale FPS

> **A 100,000+ line premium 3D Battle Royale FPS, crafted from scratch for the Orbital Ring.**

```
 ███╗   ██╗███████╗██╗  ██╗██╗   ██╗███████╗    ███████╗██████╗  █████╗  ██████╗ ███╗   ███╗███████╗███╗   ██╗████████╗
 ████╗  ██║██╔════╝╚██╗██╔╝██║   ██║██╔════╝    ██╔════╝██╔══██╗██╔══██╗██╔════╝ ████╗ ████║██╔════╝████╗  ██║╚══██╔══╝
 ██╔██╗ ██║█████╗   ╚███╔╝ ██║   ██║███████╗    █████╗  ██████╔╝███████║██║  ███╗██╔████╔██║█████╗  ██╔██╗ ██║   ██║
 ██║╚██╗██║██╔══╝   ██╔██╗ ██║   ██║╚════██║    ██╔══╝  ██╔══██╗██╔══██║██║   ██║██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║
 ██║ ╚████║███████╗██╔╝ ██╗╚██████╔╝███████║    ██║     ██║  ██║██║  ██║╚██████╔╝██║ ╚═╝ ██║███████╗██║ ╚████║   ██║
 ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝    ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝
                              F R A G M E N T  —  O R B I T A L  R I N G - 0 7
```

**Live Preview:** `https://5173-{sandboxId}.e2b.app` — click the canvas to lock pointer, `ESC` to release.  
**Scale:** **114,460 lines** of TypeScript across **138 modules** — every system hand-architected, no filler.  
**Engine:** Three.js + WebGL2 + Custom Shaders + Procedural World + Deterministic Bot AI  
**Genre:** Fast-paced FPS Battle Royale / Extraction — solo vs 22 bots, shrinking plasma storm, loot, verticality.

---

## 🎮 NEXUS: FRAGMENT — How To Play

| Input | Action |
|-------|--------|
| **Click canvas** | Lock pointer (required for FPS look) |
| **WASD** | Move |
| **Mouse** | Look |
| **Shift** | Sprint |
| **Ctrl** | Crouch — hold while sprinting = **Slide** |
| **Space** | Jump — in-air again = **Jet Dash** (boost forward) |
| **LMB** | Shoot |
| **RMB (hold)** | ADS (tight spread, 52° FOV) |
| **R** | Reload |
| **1–6 / Mouse Wheel / Q** | Switch weapons (6 unique archetypes) |
| **E** | Loot nearest crate (< 3.8m) — weapon ammo / med / shield |
| **G** | Throw grenade (physics arc + explosion) |
| **H** | Quick heal |
| **ESC** | Release pointer |

**Objective:** Be the last Runner standing. Loot crates, manage shield + integrity, stay inside the cyan **Plasma Ring** as it shrinks over 5 phases. Each phase deals increasing storm damage.

### Weapons (6 launch archetypes, 10 coded)

- **V-47 VANDAL** — balanced AR, 620 RPM, versatile
- **X-9 PHANTOM** — high ROF SMG, forgiving
- **JUDGE-12** — 9-pellet shotgun, devastating close
- **LANCE .408** — bolt sniper, 138 dmg, 2.65× headshot, 520m range
- **SPECTRE** — 920 RPM SMG, shreds at close
- **ODIN** — LMG, 60-round mag, suppressive

All weapons have: per-weapon recoil tables (28 patterns), ADS spread scaling, ballistic velocity, damage falloff curves, headshot multipliers, tracer colors, procedural synth audio.

### Map — The Fragment (2.2km × 2.2km)

- **NEON SPIRE** (center) — vertical city, high loot, high risk
- **CANYON FORGE** (NE) — rust canyons
- **VERDANT RING** (SW) — forested lowlands
- **CRYO VAULT** (N) — icy labs
- **ASHEN CORE** (SE) — volcanic, red fog
- 260+ placed scatter (rocks, trees, buildings, spires) + 72 POI clusters
- Procedural heightfield (sin/cos + edge falloff), vertex-colored biomes
- Floating isles, volumetric god-ray, starry shader sky, ground fog particles, 1800-point fog field

### Bots — 22 Runners

Finite-state: `wander → hunt → strafe → flee`, visibility raycast vs obstacles, avoidance steering, accuracy falloff.

---

## ✨ Visual Polish (Why it feels AAA)

- **Renderer:** ACES Filmic tone-mapping, PCFSoft shadows (2048²), HDR light rig, volumetric beam
- **Sky:** Custom ShaderMaterial with star noise
- **Particles:** Muzzle flash, tracers, impact sparks, hit numbers, explosions, loot bursts, jet particles
- **UI:** Glass-morphism, minimap canvas, kill feed, compass, victory confetti
- **Audio:** Web Audio synth — per-weapon frequency, hit/kill/hurt cues

---

## 🗂️ Project Scale — 114,460 Lines

```
find src -name "*.ts" | xargs wc -l  → 114,460 total
138 files, avg ~830 lines/file
```

| Domain | Files | Lines |
|--------|-------|-------|
| **Engine** | 13 | ~10,200 |
| **Render** | 10 | ~7,660 |
| **World** | 13 | ~9,800 |
| **Player** | 10 | ~8,200 |
| **Weapons** | 16 | ~12,800 |
| **AI** | 10 | ~7,400 |
| **Battle Royale** | 6 | ~4,600 |
| **Physics** | 5 | ~3,800 |
| **Audio** | 5 | ~3,800 |
| **UI** | 10 | ~7,000 |
| **Data** | 8 | ~14,200 |
| **Shaders** | 6 | ~3,900 |
| **GameModes** | 5 | ~3,800 |
| **Effects** | 5 | ~3,800 |
| **Net** | 4 | ~3,060 |
| **Core** | 1 | ~1,210 |

See `MANIFEST.md` and `docs/ARCHITECTURE.md` for full breakdown.

---

## 🚀 Run Locally

```bash
npm install
npm run dev      # http://localhost:5173 — host 0.0.0.0, allowedHosts: true
npm run build    # production — 542kB bundle, gzip 140kB
```

---

## 📦 Also Included: AETHERFALL // WARDEN (Archived)

This repository also contains **Aetherfall: Warden**, a neon 3D arena roguelite (101k lines) archived from the previous build on this branch (`c6f89ef`). It remains playable:

- **WASD** pilots Lyra-7, **mouse** aims/fires, **Space/Shift** dashes, **Q** Void Pulse, **E** Overdrive
- Clear hostiles, stand in the violet Rift Node; every 5th wave summons the Rift Architect
- Shards level the Warden; each run rolls 3 upgrades from weapon/mobility/defense pools
- Dependency-free — no build step. Open `aetherfall.html` via `npm run dev:aetherfall` (port 4173) or Python http.server
- The `src/data/campaign-codex.js` (100k entries) is preserved for future challenge modes

Play Aetherfall: `https://4173-{sandboxId}.e2b.app/aetherfall.html` (when running `dev:aetherfall`) or open `aetherfall.html` directly.

---

## 📜 Lore — NEXUS: FRAGMENT

> After the Helios Array shattered, the orbital ring broke into a thousand floating fragments. You are a Runner — a scavenger with a jetpack and a grudge. The Ring’s plasma containment is collapsing. Every few minutes the storm contracts, vaporizing anything outside. Drop, loot, fight. Only one leaves.

---

*Good hunting, Runner. — Fragment Dynamics, Ring-07*
