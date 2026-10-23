/**
 * 06 - Objects
 * Topics: literals, access, computed keys, methods, Object.* helpers, copying, freezing
 */

const key = 'role';
const person = {
  name: 'Shahid',
  skills: ['JS', 'Flutter'],
  [key]: 'engineer',            // computed property name
  greet() {                      // method shorthand
    return `Hi, I'm ${this.name}`;
  },
};

console.log(person.name, person['role'], person.greet());

// Add / update / delete
person.city = 'Karachi';
delete person.city;
console.log('city' in person, Object.hasOwn(person, 'name'));

// Iterating
console.log(Object.keys(person));
console.log(Object.values({ a: 1, b: 2 }));
console.log(Object.entries({ a: 1, b: 2 }));
console.log(Object.fromEntries([['x', 1], ['y', 2]]));

// Copying: spread = shallow copy. Nested objects are still shared!
const shallow = { ...person };
shallow.skills.push('Node');
console.log(person.skills); // also has 'Node' (shared reference)

// structuredClone = deep copy (works on plain data; it CANNOT clone functions/methods)
const data = { name: 'Shahid', skills: ['JS'], address: { city: 'Karachi' } };
const deep = structuredClone(data);
deep.skills.push('Docker');
console.log(data.skills.includes('Docker')); // false (original untouched)

// Merging
console.log(Object.assign({}, { a: 1 }, { b: 2 }), { ...{ a: 1 }, ...{ a: 9 } });

// Freezing & property descriptors
const frozen = Object.freeze({ id: 1 });
try {
  frozen.id = 2; // ES modules are strict mode, so this THROWS (sloppy scripts ignore it silently)
} catch (e) {
  console.log(e.name); // TypeError
}
console.log(frozen.id); // still 1

const locked = {};
Object.defineProperty(locked, 'id', { value: 7, writable: false, enumerable: true });
console.log(Object.getOwnPropertyDescriptor(locked, 'id'));

// Getters / setters
const temp = {
  _c: 25,
  get fahrenheit() { return this._c * 9 / 5 + 32; },
  set fahrenheit(f) { this._c = (f - 32) * 5 / 9; },
};
temp.fahrenheit = 212;
console.log(temp._c);
