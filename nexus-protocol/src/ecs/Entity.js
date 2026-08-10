// ============================================================================
// Entity.js
// An entity is a lightweight id with a bag of typed components and a set of
// string tags. Entities carry no logic; systems operate over them via queries.
// Includes a generation counter so stale ids can be detected after recycling.
// ============================================================================

let _nextId = 1;

export class Entity {
  constructor(world) {
    this.world = world;
    this.id = _nextId++;
    this.generation = 0;
    this.alive = true;
    this.active = true;        // inactive entities are skipped by most systems
    this.tags = new Set();
    /** @type {Map<string, import('./Component.js').Component>} */
    this.components = new Map();
    /** user-attached arbitrary data (not serialized by systems) */
    this.meta = Object.create(null);
    /** seconds since spawned, for timers/lifecycle */
    this.age = 0;
    /** optional friendly name for debugging */
    this.name = '';
  }

  add(component) {
    this.components.set(component.constructor.type, component);
    if (this.world) this.world._onComponentAdded(this, component.constructor.type);
    return this;
  }

  has(typeName) { return this.components.has(typeName); }

  get(typeName) { return this.components.get(typeName) || null; }

  remove(typeName) {
    const c = this.components.get(typeName);
    if (c) {
      this.components.delete(typeName);
      if (this.world) this.world._onComponentRemoved(this, typeName);
      if (c.recycle) c.recycle();
    }
    return this;
  }

  tag(t) { this.tags.add(t); if (this.world) this.world._onTagAdded(this, t); return this; }
  untag(t) { this.tags.delete(t); if (this.world) this.world._onTagRemoved(this, t); return this; }
  hasTag(t) { return this.tags.has(t); }

  /** Remove all components (returns them to pools if applicable). */
  clearComponents() {
    for (const c of this.components.values()) if (c.recycle) c.recycle();
    this.components.clear();
    if (this.world) this.world._onEntityCleared(this);
  }

  destroy() {
    if (this.world) this.world.removeEntity(this);
    else { this.alive = false; }
  }
}
