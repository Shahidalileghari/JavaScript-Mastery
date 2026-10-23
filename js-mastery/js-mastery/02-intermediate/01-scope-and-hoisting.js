/**
 * 01 - Scope & Hoisting
 * Topics: global/function/block scope, TDZ, hoisting, scope chain
 */

// var is function-scoped, let/const are block-scoped
function scopeDemo() {
  if (true) {
    var a = 'var leaks out of the block';
    let b = 'let stays inside';
    const c = 'const stays inside';
  }
  console.log(a);
  console.log(typeof b, typeof c); // undefined undefined (not accessible)
}
scopeDemo();

// Hoisting: declarations are processed before code runs
console.log(hoisted());            // works! function declarations are fully hoisted
function hoisted() { return 'I was hoisted'; }

console.log(typeof v);             // undefined (var is hoisted, value is not)
var v = 10;

// Temporal Dead Zone: let/const exist but cannot be used before declaration
try {
  console.log(tdz);
  let tdz = 1;
} catch (err) {
  console.log(err.name);           // ReferenceError
}

// Scope chain: inner scopes can read outer variables, not vice versa
const level1 = 'outer';
function outer() {
  const level2 = 'middle';
  function inner() {
    return `${level1} > ${level2} > inner`;
  }
  return inner();
}
console.log(outer());

// Classic loop-closure gotcha
const withVar = [];
for (var i = 0; i < 3; i++) withVar.push(() => i);
console.log(withVar.map((f) => f())); // [3,3,3]

const withLet = [];
for (let j = 0; j < 3; j++) withLet.push(() => j);
console.log(withLet.map((f) => f())); // [0,1,2] (new binding per iteration)
