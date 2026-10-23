/**
 * 05 - Immutability & Functional Programming
 */

/** Deep freeze: makes an object (and nested objects) read-only. */
function deepFreeze(obj) {
  Object.values(obj).forEach((v) => typeof v === 'object' && v !== null && deepFreeze(v));
  return Object.freeze(obj);
}

const config = deepFreeze({ db: { host: 'localhost', port: 5432 } });
try {
  'use strict';
  config.db.port = 1;
} catch {}
console.log(config.db.port); // still 5432

// Immutable operations
const arr = [3, 1, 2];
console.log(arr.toSorted(), arr.toReversed(), arr.with(0, 99), arr); // arr unchanged

// Reducer pattern (Redux style): (state, action) => newState
function reducer(state = { count: 0, history: [] }, action) {
  switch (action.type) {
    case 'inc': return { ...state, count: state.count + 1, history: [...state.history, 'inc'] };
    case 'dec': return { ...state, count: state.count - 1, history: [...state.history, 'dec'] };
    default: return state;
  }
}
const actions = [{ type: 'inc' }, { type: 'inc' }, { type: 'dec' }];
console.log(actions.reduce(reducer, undefined));

/** Maybe monad: chain operations that may produce null. */
class Maybe {
  constructor(value) { this.value = value; }
  static of(value) { return new Maybe(value); }
  map(fn) { return this.value == null ? this : Maybe.of(fn(this.value)); }
  getOrElse(fallback) { return this.value ?? fallback; }
}
const city = Maybe.of({ address: { city: 'Karachi' } })
  .map((u) => u.address)
  .map((a) => a.city)
  .map((c) => c.toUpperCase());
console.log(city.getOrElse('unknown'));
console.log(Maybe.of({}).map((u) => u.address).map((a) => a.city).getOrElse('unknown'));
