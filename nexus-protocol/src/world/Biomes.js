// ============================================================================
// Biomes.js
// Biome descriptors: color palettes, fog, floor texture style, prop themes,
// and ambient audio cue. Biomes drive the Arena's appearance and are unlocked
// through progression. Each biome also tweaks gameplay (enemy tint, hazard).
// ============================================================================

export const Biomes = [
  {
    id: 'neon',
    name: 'Neon Nexus',
    subtitle: 'The founding arena',
    unlockWave: 0,
    colors: {
      floor: 0x0a0f1c, grid: 0x1b3a55, glow: 0x29e7ff, accent1: 0x29e7ff, accent2: 0xff3df0,
      fog: 0x05060a, sky: 0x070a14, sun: 0x6699ff, ambient: 0x223355, hemiSky: 0x223a66, hemiGround: 0x080812,
    },
    fogDensity: 0.012,
    floorStyle: 'grid',
    hazard: null,
    music: 'menu',
  },
  {
    id: 'void',
    name: 'The Void',
    subtitle: 'Where light goes to die',
    unlockWave: 6,
    colors: {
      floor: 0x0c0814, grid: 0x2a1b44, glow: 0x8a5bff, accent1: 0x8a5bff, accent2: 0x29e7ff,
      fog: 0x08050f, sky: 0x0a0512, sun: 0xaa66ff, ambient: 0x221533, hemiSky: 0x331a55, hemiGround: 0x0a0512,
    },
    fogDensity: 0.016,
    floorStyle: 'hex',
    hazard: null,
    music: 'menu',
  },
  {
    id: 'crystal',
    name: 'Crystal Caverns',
    subtitle: 'Fractured reflections',
    unlockWave: 12,
    colors: {
      floor: 0x08141a, grid: 0x124a55, glow: 0x4fffd0, accent1: 0x4fffd0, accent2: 0xff3df0,
      fog: 0x051014, sky: 0x06181f, sun: 0x66ffdd, ambient: 0x114455, hemiSky: 0x114a55, hemiGround: 0x051014,
    },
    fogDensity: 0.014,
    floorStyle: 'hex',
    hazard: 'shards',
    music: 'menu',
  },
  {
    id: 'inferno',
    name: 'Inferno Grid',
    subtitle: 'Burn bright, burn out',
    unlockWave: 18,
    colors: {
      floor: 0x140a08, grid: 0x552a12, glow: 0xff6633, accent1: 0xff6633, accent2: 0xffaa22,
      fog: 0x100604, sky: 0x180a06, sun: 0xff8855, ambient: 0x553322, hemiSky: 0x552a18, hemiGround: 0x140804,
    },
    fogDensity: 0.018,
    floorStyle: 'grid',
    hazard: 'fire',
    music: 'menu',
  },
  {
    id: 'frost',
    name: 'Frostbyte',
    subtitle: 'Absolute zero',
    unlockWave: 24,
    colors: {
      floor: 0x0a1018, grid: 0x2a4a66, glow: 0x9fe7ff, accent1: 0x9fe7ff, accent2: 0xffffff,
      fog: 0x070c12, sky: 0x0a1220, sun: 0xaaddff, ambient: 0x224a66, hemiSky: 0x2a5577, hemiGround: 0x0a1220,
    },
    fogDensity: 0.013,
    floorStyle: 'hex',
    hazard: 'ice',
    music: 'menu',
  },
  {
    id: 'cyber',
    name: 'Cyber Sprawl',
    subtitle: 'Neon never sleeps',
    unlockWave: 30,
    colors: {
      floor: 0x06080f, grid: 0x123050, glow: 0x29e7ff, accent1: 0x29e7ff, accent2: 0xff3df0,
      fog: 0x05060a, sky: 0x080a14, sun: 0x66aaff, ambient: 0x223355, hemiSky: 0x2a4070, hemiGround: 0x08080f,
    },
    fogDensity: 0.011,
    floorStyle: 'grid',
    hazard: null,
    music: 'menu',
  },
];

export const BiomeMap = Object.fromEntries(Biomes.map(b => [b.id, b]));

export function getBiome(id) { return BiomeMap[id] || Biomes[0]; }
export function unlockedBiomes(records) {
  return Biomes.filter(b => b.unlockWave <= (records.bestWave || 0));
}
