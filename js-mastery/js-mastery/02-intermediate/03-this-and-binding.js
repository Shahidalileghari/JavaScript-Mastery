/**
 * 03 - `this`, call, apply, bind
 * `this` is determined by HOW a function is called, not where it's defined
 * (except arrow functions, which use the `this` of the enclosing scope).
 */

const user = {
  name: 'Shahid',
  regular() { return this?.name; },
  arrow: () => typeof this,           // `this` of module scope (undefined in ESM)
  delayed() {
    // Arrow function keeps `this` of the surrounding method
    return [1].map(() => this.name);
  },
};

console.log(user.regular());          // 'Shahid' (called as method)
const detached = user.regular;
console.log(detached());              // undefined (lost its object)
console.log(user.arrow());
console.log(user.delayed());

function introduce(greeting, punctuation) {
  return `${greeting}, I'm ${this.name}${punctuation}`;
}

const other = { name: 'Ali' };
console.log(introduce.call(other, 'Hi', '!'));        // call: args listed
console.log(introduce.apply(other, ['Hello', '.']));  // apply: args in array
const bound = introduce.bind(other, 'Hey');           // bind: returns new function
console.log(bound('?'));

// `new` binding: `this` is the freshly created object
function Point(x, y) {
  this.x = x;
  this.y = y;
}
console.log(new Point(1, 2));
