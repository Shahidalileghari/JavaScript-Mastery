/**
 * 04 - The Event Loop
 * Order: synchronous code -> microtasks (promises, queueMicrotask)
 *        -> macrotasks (setTimeout, setImmediate, I/O)
 */

console.log('1. sync start');

setTimeout(() => console.log('6. macrotask: setTimeout 0'), 0);

Promise.resolve().then(() => console.log('4. microtask: promise.then'));

queueMicrotask(() => console.log('5. microtask: queueMicrotask'));

process.nextTick(() => console.log('3. nextTick (Node: runs before promise microtasks)'));

(async () => {
  console.log('2. sync inside async fn (runs synchronously until first await)');
  await null;
  console.log('4b. continuation after await is a microtask');
})();

console.log('2b. sync end');

/*
 Key takeaways:
  - JS is single-threaded; async work is scheduled, not parallel.
  - A long synchronous loop BLOCKS everything (UI, timers, requests).
  - Microtasks always drain completely before the next macrotask.
*/
