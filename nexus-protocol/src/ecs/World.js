// ============================================================================
// World.js
// The ECS world: owns entities, component indexes, queries, and the ordered
// list of systems. Provides entity spawn/remove, component add/remove hooks
// that keep queries fresh, and a top-level update/fixedUpdate dispatcher that
// runs enabled systems in priority order. Also tracks aggregate stats for the
// debug overlay.
// ============================================================================

import { Entity } from './Entity.js';
import { Query } from './Query.js';
import { System, Phase } from './System.js';
import { bus, Channels } from '../core/EventBus.js';

export class World {
  constructor() {
    /** @type {Map<number, Entity>} */
    this.entities = new Map();
    /** @type {Set<number>} all live entity ids (for queries with no `all`) */
    this._allIds = new Set();
    /** @type {Map<string, Set<number>>} component type -> entity ids */
    this._byComponent = new Map();
    /** @type {Map<string, Set<number>>} tag -> entity ids */
    this._byTag = new Map();
    /** @type {Query[]} */
    this._queries = [];
    /** @type {System[]} */
    this.systems = [];
    this._pendingRemove = [];
    this._stats = { spawned: 0, removed: 0 };
  }

  // ----- Entity lifecycle -----
  createEntity(name = '') {
    const e = new Entity(this);
    e.name = name;
    this.entities.set(e.id, e);
    this._allIds.add(e.id);
    this._stats.spawned++;
    bus.emit(Channels.EntitySpawned, { entity: e });
    return e;
  }

  removeEntity(e) {
    if (!e || !e.alive) return;
    if (this._pendingRemove.includes(e.id)) return;
    e.alive = false;
    this._pendingRemove.push(e.id);
  }

  _flushRemovals() {
    if (this._pendingRemove.length === 0) return;
    for (const id of this._pendingRemove) {
      const e = this.entities.get(id);
      if (!e) continue;
      // remove from indexes
      for (const type of e.components.keys()) {
        const set = this._byComponent.get(type);
        if (set) set.delete(id);
        for (const q of this._queries) q.onRemove(e, type);
      }
      for (const t of e.tags) {
        const set = this._byTag.get(t);
        if (set) set.delete(id);
        for (const q of this._queries) q.onTagChange(e, t, false);
      }
      e.clearComponents();
      this._allIds.delete(id);
      this.entities.delete(id);
      this._stats.removed++;
      bus.emit(Channels.EntityRemoved, { entity: e });
    }
    this._pendingRemove.length = 0;
  }

  // ----- Index hooks -----
  _onComponentAdded(e, type) {
    let set = this._byComponent.get(type);
    if (!set) { set = new Set(); this._byComponent.set(type, set); }
    set.add(e.id);
    for (const q of this._queries) q.onAdd(e, type);
  }
  _onComponentRemoved(e, type) {
    const set = this._byComponent.get(type);
    if (set) set.delete(e.id);
    for (const q of this._queries) q.onRemove(e, type);
  }
  _onTagAdded(e, tag) {
    let set = this._byTag.get(tag);
    if (!set) { set = new Set(); this._byTag.set(tag, set); }
    set.add(e.id);
    for (const q of this._queries) q.onTagChange(e, tag, true);
  }
  _onTagRemoved(e, tag) {
    const set = this._byTag.get(tag);
    if (set) set.delete(e.id);
    for (const q of this._queries) q.onTagChange(e, tag, false);
  }
  _onEntityCleared(e) {
    for (const type of e.components.keys()) {} // already empty
  }

  // ----- Queries -----
  _registerQuery(q) { this._queries.push(q); q._dirty = true; }
  _unregisterQuery(q) {
    const i = this._queries.indexOf(q);
    if (i >= 0) this._queries.splice(i, 1);
  }

  query(spec) { return new Query(this, spec); }

  // ----- Systems -----
  addSystem(system) {
    this.systems.push(system);
    this.systems.sort((a, b) => a.priority - b.priority);
    system.onAttach(this);
    return system;
  }

  removeSystem(system) {
    const i = this.systems.indexOf(system);
    if (i >= 0) { system.onDetach(); this.systems.splice(i, 1); }
  }

  getSystem(typeName) { return this.systems.find(s => s.constructor.name === typeName) || null; }

  update(dt, sdt) {
    for (let i = 0; i < this.systems.length; i++) {
      const s = this.systems[i];
      if (s.enabled) { try { s.update(dt, sdt); } catch (e) { console.error(`System ${s.name}.update:`, e); } }
    }
    this._flushRemovals();
  }

  fixedUpdate(fixed) {
    for (let i = 0; i < this.systems.length; i++) {
      const s = this.systems[i];
      if (s.enabled && s.fixedUpdate) { try { s.fixedUpdate(fixed); } catch (e) { console.error(`System ${s.name}.fixedUpdate:`, e); } }
    }
    this._flushRemovals();
  }

  reset() {
    // remove all entities (skip player if flagged by systems externally)
    for (const e of this.entities.values()) e.alive = false;
    this._pendingRemove = Array.from(this.entities.keys());
    this._flushRemovals();
    for (const s of this.systems) if (s.reset) s.reset();
    this._stats = { spawned: 0, removed: 0 };
  }

  clear() {
    this.entities.clear();
    this._allIds.clear();
    this._byComponent.clear();
    this._byTag.clear();
    for (const q of this._queries) q.result.clear();
    this._pendingRemove.length = 0;
  }

  get size() { return this.entities.size; }
  get stats() { return this._stats; }

  /** Find a single entity by tag. */
  findByTag(tag) {
    const set = this._byTag.get(tag);
    if (!set) return null;
    for (const id of set) { const e = this.entities.get(id); if (e && e.alive && e.active) return e; }
    return null;
  }

  /** All entities with a tag. */
  withTag(tag, out = []) {
    out.length = 0;
    const set = this._byTag.get(tag);
    if (set) for (const id of set) { const e = this.entities.get(id); if (e && e.alive && e.active) out.push(e); }
    return out;
  }
}
