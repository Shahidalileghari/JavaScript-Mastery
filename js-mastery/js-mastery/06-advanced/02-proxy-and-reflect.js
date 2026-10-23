/**
 * 02 - Proxy & Reflect
 * A Proxy intercepts operations on an object (get, set, delete, has, ...).
 */

/** Validation proxy: rejects invalid writes. */
function createValidated(target, validators) {
  return new Proxy(target, {
    set(obj, prop, value, receiver) {
      const validate = validators[prop];
      if (validate && !validate(value)) {
        throw new TypeError(`Invalid value for "${String(prop)}": ${value}`);
      }
      return Reflect.set(obj, prop, value, receiver);
    },
  });
}

const person = createValidated({}, {
  age: (v) => Number.isInteger(v) && v >= 0,
  name: (v) => typeof v === 'string' && v.length > 0,
});
person.name = 'Shahid';
person.age = 25;
try { person.age = -5; } catch (e) { console.log(e.message); }

/** Default-value proxy. */
const withDefault = (obj, def) => new Proxy(obj, { get: (t, p) => (p in t ? t[p] : def) });
console.log(withDefault({ a: 1 }, 0).missing);

/** Logging / observing proxy. */
function observe(obj, onChange) {
  return new Proxy(obj, {
    set(t, p, v) {
      onChange(p, t[p], v);
      return Reflect.set(t, p, v);
    },
    deleteProperty(t, p) {
      onChange(p, t[p], undefined);
      return Reflect.deleteProperty(t, p);
    },
  });
}
const state = observe({ count: 0 }, (k, oldV, newV) => console.log(`${k}: ${oldV} -> ${newV}`));
state.count++;
delete state.count;

/** Negative array indexes. */
const negArray = (arr) => new Proxy(arr, {
  get: (t, p, r) => Reflect.get(t, typeof p === 'string' && /^-\d+$/.test(p) ? t.length + +p : p, r),
});
console.log(negArray([1, 2, 3])[-1]);
