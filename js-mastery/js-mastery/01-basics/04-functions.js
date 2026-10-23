/**
 * 04 - Functions
 * Topics: declarations, expressions, arrow functions, default/rest params, IIFE, recursion
 */

/** Function declaration (hoisted - can be called before it appears). */
function add(a, b) {
  return a + b;
}

/** Function expression (NOT hoisted). */
const multiply = function (a, b) {
  return a * b;
};

/** Arrow function: concise syntax, inherits `this` from the outer scope. */
const square = (x) => x * x;

/** Default parameters. */
function greet(name = 'Guest', greeting = 'Hello') {
  return `${greeting}, ${name}!`;
}

/** Rest parameters collect extra arguments into a real array. */
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

/** Returning multiple values via an array or object. */
function minMax(values) {
  return { min: Math.min(...values), max: Math.max(...values) };
}

/** Recursion: a function that calls itself. Needs a base case! */
function factorial(n) {
  if (n <= 1) return 1;         // base case
  return n * factorial(n - 1);  // recursive case
}

/** IIFE: Immediately Invoked Function Expression (creates private scope). */
const secret = (() => {
  const hidden = 'only visible inside';
  return hidden.toUpperCase();
})();

console.log(add(2, 3), multiply(4, 5), square(6));
console.log(greet(), greet('Shahid', 'Salaam'));
console.log(sum(1, 2, 3, 4), minMax([4, 9, 1]));
console.log(factorial(5), secret);

/** Functions are values: they can be stored, passed and returned. */
const operations = { add, multiply, square };
console.log(operations.add(10, 5));
