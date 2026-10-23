/**
 * 04 - Mixins & Composition ("favour composition over inheritance")
 * JS has single inheritance, so mixins add reusable behaviour.
 */

/** Mixin: a function that takes a class and returns an extended class. */
const Serializable = (Base) =>
  class extends Base {
    serialize() { return JSON.stringify(this); }
  };

const Timestamped = (Base) =>
  class extends Base {
    createdAt = '2026-01-01';
    touch() { this.updatedAt = 'now'; return this; }
  };

class Entity {
  constructor(id) { this.id = id; }
}

class User extends Serializable(Timestamped(Entity)) {
  constructor(id, name) {
    super(id);
    this.name = name;
  }
}

const u = new User(1, 'Shahid').touch();
console.log(u.serialize());

// Composition with plain functions ("has-a" instead of "is-a")
const canWalk = (state) => ({ walk: () => `${state.name} walks` });
const canSwim = (state) => ({ swim: () => `${state.name} swims` });

function createDuck(name) {
  const state = { name };
  return { ...state, ...canWalk(state), ...canSwim(state) };
}
const duck = createDuck('Donald');
console.log(duck.walk(), duck.swim());
