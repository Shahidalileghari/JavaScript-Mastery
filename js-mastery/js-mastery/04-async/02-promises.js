/**
 * 02 - Promises
 * States: pending -> fulfilled | rejected. Handlers: then / catch / finally
 */

/** Wraps setTimeout in a promise. */
const delay = (ms, value) => new Promise((resolve) => setTimeout(() => resolve(value), ms));

/** A promise that may reject. */
const risky = (shouldFail) =>
  new Promise((resolve, reject) => {
    setTimeout(() => (shouldFail ? reject(new Error('boom')) : resolve('success')), 10);
  });

// Chaining: each .then returns a NEW promise
delay(10, 2)
  .then((n) => n * 2)
  .then((n) => { console.log('chain result', n); return risky(true); })
  .catch((err) => { console.log('caught:', err.message); return 'recovered'; })
  .finally(() => console.log('cleanup'))
  .then((v) => console.log('after finally:', v))
  .then(runCombinators);

// Combinators
async function runCombinators() {
  const a = delay(30, 'A');
  const b = delay(10, 'B');
  const failing = () => risky(true); // create rejecting promises lazily so each is handled right away

  console.log('all       ->', await Promise.all([a, b]));              // all must succeed
  console.log('race      ->', await Promise.race([a, b]));             // first to settle
  console.log('any       ->', await Promise.any([failing(), b]));              // first to fulfil
  const settled = await Promise.allSettled([a, failing()]);                   // never rejects
  console.log('allSettled->', settled.map((r) => r.status));
}
