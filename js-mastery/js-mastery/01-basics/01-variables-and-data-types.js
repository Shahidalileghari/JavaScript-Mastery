/**
 * 01 - Variables & Data Types
 * Topics: var / let / const, primitives, typeof, type coercion
 */

// ---- Declaring variables ----
const PI = 3.14159;          // const: cannot be reassigned
let counter = 0;             // let: block-scoped, can be reassigned
var legacy = 'avoid me';     // var: function-scoped (legacy, avoid in new code)
counter += 1;

console.log({ PI, counter, legacy });

// ---- The 7 primitive types ----
const examples = {
  string: 'hello',
  number: 42,                // integers and floats share one type
  bigint: 9007199254740993n, // arbitrary-size integers
  boolean: true,
  undefined: undefined,      // declared but not assigned
  null: null,                // intentional "no value"
  symbol: Symbol('id'),      // unique identifier
};

for (const [label, value] of Object.entries(examples)) {
  console.log(`${label.padEnd(10)} -> typeof: ${typeof value}`);
}
// Note: typeof null === 'object' is a famous historical bug.

// ---- Reference types ----
const arr = [1, 2, 3];       // arrays are objects
const obj = { a: 1 };
console.log(typeof arr, Array.isArray(arr), typeof obj);

// ---- Type coercion ----
console.log('5' + 1);        // "51"  (number -> string)
console.log('5' - 1);        // 4     (string -> number)
console.log(1 == '1');       // true  (loose equality coerces)
console.log(1 === '1');      // false (strict equality: ALWAYS prefer this)
console.log(Number('abc'));  // NaN
console.log(Boolean(''), Boolean('0'), Boolean([])); // false true true

// ---- Falsy values: false, 0, -0, 0n, '', null, undefined, NaN ----
