/**
 * 02 - Closures
 * A closure = a function + the variables from the scope where it was created.
 */

/** Counter with private state - nobody can touch `count` directly. */
function createCounter(start = 0) {
  let count = start; // captured by the returned functions
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count,
  };
}

const counter = createCounter(10);
counter.increment();
counter.increment();
console.log(counter.value()); // 12

/** Function factory: "configure once, use many times". */
function multiplier(factor) {
  return (n) => n * factor;
}
const double = multiplier(2);
const triple = multiplier(3);
console.log(double(5), triple(5));

/** Run-once wrapper. */
function once(fn) {
  let called = false;
  let result;
  return (...args) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}
const init = once(() => { console.log('initialising...'); return 42; });
console.log(init(), init()); // logs "initialising..." only once

/** Module pattern: private variables + public API. */
const bank = (() => {
  let balance = 0; // private
  return {
    deposit(amount) { balance += amount; return balance; },
    getBalance: () => balance,
  };
})();
bank.deposit(100);
console.log(bank.getBalance(), bank.balance); // 100 undefined
