# AETHERFALL // WARDEN

A neon 3D arena roguelite built from scratch with the browser's WebGL API. No runtime engine or asset pack is required: geometry, lighting, particles, enemies, audio cues, UI, and the arena are procedural.

## Run

```bash
python3 -m http.server 4173 --bind 0.0.0.0
```

Then open `http://localhost:4173` in a WebGL-capable browser.

## Mission loop

- **WASD** pilots Lyra-7, **mouse** aims and fires, **Space / Shift** dashes, **Q** casts Void Pulse, and **E** spends a full Overdrive charge.
- Clear the hostiles, then stand inside the violet Rift Node until it stabilizes. Every fifth wave summons the Rift Architect.
- Shards level the Warden and open protocol choices. Each run rolls three upgrades from a pool of weapon, mobility, defense, sync, pulse, and ultimate builds.
- Esc pauses the link. The game uses deterministic arena dressing, but combat rolls and upgrade drafts remain fresh.

The project is intentionally dependency-free so the live preview works without a build step. The off-boot `src/data/campaign-codex.js` is a 100,000-entry campaign layer: encounter seeds, sector weather, objectives, threats, and reward identities are available to future challenge modes without adding startup cost to the renderer.
