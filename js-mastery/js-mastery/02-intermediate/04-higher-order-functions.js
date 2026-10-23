/**
 * 04 - Higher-Order Functions & Functional Patterns
 * Topics: HOFs, currying, composition, pipe, partial application
 */

/** A higher-order function takes or returns another function. */
function repeat(times, fn) {
  for (let i = 0; i < times; i++) fn(i);
}
repeat(3, (i) => console.log('tick', i));

/** compose: right-to-left, pipe: left-to-right. */
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);

const trim = (s) => s.trim();
const upper = (s) => s.toUpperCase();
const exclaim = (s) => `${s}!`;

console.log(pipe(trim, upper, exclaim)('  hello  '));
console.log(compose(exclaim, upper, trim)('  hello  '));

/** Generic curry: f(a, b, c) -> f(a)(b)(c) (or any grouping). */
function curry(fn) {
  return function curried(...args) {
    return args.length >= fn.length
      ? fn.apply(this, args)
      : (...more) => curried.apply(this, [...args, ...more]);
  };
}
const addThree = curry((a, b, c) => a + b + c);
console.log(addThree(1)(2)(3), addThree(1, 2)(3));

/** Partial application: pre-fill some arguments. */
const partial = (fn, ...preset) => (...rest) => fn(...preset, ...rest);
const greet = (greeting, name) => `${greeting}, ${name}`;
console.log(partial(greet, 'Salaam')('Shahid'));

/** Pure functions: same input -> same output, no side effects. */
const pureAdd = (a, b) => a + b;
console.log(pureAdd(2, 2));
