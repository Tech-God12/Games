// ============================================================================
// content/index.js
// Central content loader. Importing this module registers every weapon,
// enemy, item, perk, ability, and boss definition with its registry so the
// game has its full content available. New content files are added here.
// ============================================================================

// Weapons
import '../weapons/definitions/core.js';
import '../weapons/definitions/energy.js';
import '../weapons/definitions/special.js';
import '../weapons/definitions/legendary.js';
import '../weapons/definitions/precision.js';
import '../weapons/definitions/cqcb.js';
import '../weapons/definitions/heavy2.js';
import '../weapons/definitions/exotic2.js';
import '../weapons/definitions/experimental.js';
import '../weapons/definitions/ballistic.js';
import '../weapons/definitions/sidearms.js';
import '../weapons/definitions/rifles2.js';
import '../weapons/definitions/snipers2.js';
import '../weapons/definitions/shotguns2.js';
import '../weapons/definitions/smgs2.js';
import '../weapons/definitions/heavy3.js';
import '../weapons/definitions/energy2.js';
import '../weapons/definitions/melee2.js';

// Enemies
import '../enemies/definitions/basic.js';
import '../enemies/definitions/ranged.js';
import '../enemies/definitions/special.js';
import '../enemies/definitions/ground2.js';
import '../enemies/definitions/flying2.js';
import '../enemies/definitions/elite2.js';
import '../enemies/definitions/ground3.js';
import '../enemies/definitions/flying3.js';
import '../enemies/definitions/elite3.js';
import '../enemies/definitions/ground4.js';
import '../enemies/definitions/swarm.js';
import '../enemies/definitions/enemies5.js';
import '../enemies/definitions/casters.js';
import '../enemies/definitions/enemies6.js';
import '../enemies/definitions/flying4.js';
import '../enemies/definitions/ground5.js';

// Bosses
import '../bosses/definitions/bosses.js';
import '../bosses/definitions/bosses2.js';
import '../bosses/definitions/bosses3.js';
import '../bosses/definitions/bosses4.js';
import '../bosses/definitions/bosses5.js';
import '../bosses/definitions/bosses6.js';

// Items
import '../items/definitions/items.js';
import '../items/definitions/items2.js';
import '../items/definitions/items3.js';
import '../items/definitions/items4.js';
import '../items/definitions/items5.js';
import '../items/definitions/items6.js';
import '../items/definitions/items7.js';

// Perks
import '../perks/definitions/perks.js';
import '../perks/definitions/perks2.js';
import '../perks/definitions/perks3.js';
import '../perks/definitions/perks4.js';
import '../perks/definitions/perks5.js';
import '../perks/definitions/perks6.js';

// Abilities
import '../abilities/definitions/abilities.js';
import '../abilities/definitions/abilities2.js';
import '../abilities/definitions/abilities3.js';
import '../abilities/definitions/abilities4.js';
import '../abilities/definitions/abilities5.js';
import '../abilities/definitions/abilities6.js';

// Characters
import '../player/Characters.js';
import '../player/Characters2.js';
import '../player/Characters3.js';
import '../player/Characters4.js';
import '../player/Characters5.js';

// Extended localization
import { installExtraLocalization } from '../data/Localization2.js';
import * as _Loc from '../data/Localization.js';
installExtraLocalization(_Loc);
import '../data/WaveScripts2.js';
import * as _Lore from '../data/Lore.js';
import { installExtraLore } from '../data/Lore2.js';
installExtraLore(_Lore);
import '../pickups/Pickups.js';
import * as _Shaders from '../render/Shaders.js';
import { installExtraShaders } from '../render/Shaders2.js';
installExtraShaders(_Shaders);

import { WeaponRegistry } from '../weapons/WeaponRegistry.js';
import { EnemyRegistry } from '../enemies/EnemyRegistry.js';

export const ContentStats = {
  weapons: WeaponRegistry.count(),
  enemies: EnemyRegistry.count(),
};
