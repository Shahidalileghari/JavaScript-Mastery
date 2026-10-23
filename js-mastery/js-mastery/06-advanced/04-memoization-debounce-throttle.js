/**
 * 04 - Performance Utilities: memoize, debounce, throttle
 */

/** Caches results by arguments. */
function memoize(fn, keyFn = (...args) => JSON.stringify(args)) {
  const cache = new Map();
  return function memoized(...args) {
    const key = keyFn(...args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

let calls = 0;
const slowSquare = memoize((n) => { calls++; return n * n; });
slowSquare(9); slowSquare(9); slowSquare(9);
console.log('memoized calls:', calls); // 1

// Classic use: recursive fibonacci goes from O(2^n) to O(n)
const fib = memoize((n) => (n < 2 ? n : fib(n - 1) + fib(n - 2)));
console.log(fib(80));

/** Delays running fn until `wait` ms have passed with no new calls. */
function debounce(fn, wait) {
  let timer;
  const debounced = (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
  debounced.cancel = () => clearTimeout(timer);
  return debounced;
}

/** Runs fn at most once per `interval` ms. */
function throttle(fn, interval) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn(...args);
    }
  };
}

const onSearch = debounce((q) => console.log('debounced search:', q), 20);
['j', 'js', 'jav', 'java'].forEach(onSearch); // only the last call fires

const onScroll = throttle((y) => console.log('throttled scroll:', y), 50);
[1, 2, 3].forEach(onScroll); // only the first fires within the interval
