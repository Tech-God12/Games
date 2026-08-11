/**
 * VOIDBREAK — Biomes.
 *
 * Thematic arena variants: each defines the palette (floor/wall colors),
 * atmosphere (fog, sky, sun), accent glow color and the decoration set.
 * Biomes rotate every few waves to keep runs visually fresh.
 */

export const BIOMES = [
  {
    id: 'citadel', name: 'Iron Citadel', desc: 'The station core. Cold steel and cyan light.',
    floor: [0.12, 0.15, 0.22], floorLine: [0.20, 0.38, 0.50], floorGrime: [0.03, 0.04, 0.08],
    wall: [0.17, 0.20, 0.28], wallLine: [0.30, 0.42, 0.52],
    accent: '#35f0ff', accentColor: [0.21, 0.94, 1.0],
    fog: [0.02, 0.04, 0.09], fogNear: 22, fogFar: 90,
    skyZenith: [0.005, 0.01, 0.04], skyHorizon: [0.05, 0.08, 0.16],
    sunDir: [0.5, 0.85, 0.3], sunColor: [0.9, 0.95, 1.0], sunIntensity: 1.5, starIntensity: 0.7,
    nebula: [0.15, 0.1, 0.4], glow: '#35f0ff', props: ['pillar', 'pylon', 'crate', 'wall', 'light', 'pipe'], crystal: null,
  },
  {
    id: 'forge', name: 'Crimson Forge', desc: 'Molten industry. Heat haze and ember light.',
    floor: [0.20, 0.13, 0.12], floorLine: [0.55, 0.28, 0.16], floorGrime: [0.05, 0.03, 0.03],
    wall: [0.24, 0.15, 0.13], wallLine: [0.55, 0.30, 0.20],
    accent: '#ff7a3d', accentColor: [1.0, 0.48, 0.24],
    fog: [0.06, 0.02, 0.02], fogNear: 18, fogFar: 75,
    skyZenith: [0.04, 0.01, 0.005], skyHorizon: [0.16, 0.06, 0.04],
    sunDir: [0.3, 0.7, 0.6], sunColor: [1.0, 0.75, 0.55], sunIntensity: 1.3, starIntensity: 0.25,
    nebula: [0.4, 0.1, 0.05], glow: '#ff7a3d', props: ['pillar', 'crate', 'wall', 'forge', 'pipe', 'light'], crystal: null,
  },
  {
    id: 'cavern', name: 'Crystal Caverns', desc: 'A hollowed asteroid full of singing crystal.',
    floor: [0.11, 0.14, 0.20], floorLine: [0.30, 0.38, 0.55], floorGrime: [0.03, 0.04, 0.07],
    wall: [0.14, 0.16, 0.24], wallLine: [0.28, 0.34, 0.50],
    accent: '#b26bff', accentColor: [0.7, 0.42, 1.0],
    fog: [0.03, 0.02, 0.08], fogNear: 16, fogFar: 70,
    skyZenith: [0.02, 0.01, 0.06], skyHorizon: [0.08, 0.05, 0.18],
    sunDir: [0.4, 0.9, 0.2], sunColor: [0.85, 0.8, 1.0], sunIntensity: 1.1, starIntensity: 0.9,
    nebula: [0.35, 0.12, 0.5], glow: '#c07dff', props: ['pillar', 'crystal', 'crate', 'wall', 'crystal_big', 'light'], crystal: '#b26bff',
  },
  {
    id: 'voidreach', name: 'Void Reach', desc: 'The breach itself. Green static and ancient pylons.',
    floor: [0.08, 0.13, 0.12], floorLine: [0.20, 0.45, 0.35], floorGrime: [0.02, 0.04, 0.04],
    wall: [0.10, 0.16, 0.15], wallLine: [0.22, 0.40, 0.32],
    accent: '#4dffa6', accentColor: [0.3, 1.0, 0.65],
    fog: [0.01, 0.03, 0.03], fogNear: 20, fogFar: 85,
    skyZenith: [0.005, 0.02, 0.02], skyHorizon: [0.04, 0.10, 0.09],
    sunDir: [0.7, 0.6, 0.4], sunColor: [0.7, 1.0, 0.85], sunIntensity: 1.2, starIntensity: 0.5,
    nebula: [0.05, 0.3, 0.2], glow: '#4dffa6', props: ['pillar', 'pylon', 'crate', 'wall', 'obelisk', 'pipe'], crystal: null,
  },
];

export function getBiome(index) {
  return BIOMES[index % BIOMES.length];
}

export function randomBiome(rng) {
  return BIOMES[Math.floor(rng() * BIOMES.length)];
}
