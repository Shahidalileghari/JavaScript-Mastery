/**
 * 03 - async / await
 * Syntactic sugar over promises that reads like synchronous code.
 */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getUser(id) {
  await sleep(10);
  if (id < 0) throw new Error('User not found');
  return { id, name: `User${id}` };
}

/** Sequential: each await waits for the previous one. */
async function sequential() {
  const t = Date.now();
  const u1 = await getUser(1);
  const u2 = await getUser(2);
  console.log('sequential', [u1.id, u2.id], Date.now() - t >= 20);
}

/** Parallel: start all first, then await together (much faster). */
async function parallel() {
  const t = Date.now();
  const users = await Promise.all([getUser(1), getUser(2), getUser(3)]);
  console.log('parallel  ', users.map((u) => u.id), Date.now() - t < 30);
}

/** Error handling with try/catch. */
async function withErrors() {
  try {
    await getUser(-1);
  } catch (err) {
    console.log('caught:', err.message);
  }
}

/** Async iteration: for await...of. */
async function* ticker(n) {
  for (let i = 1; i <= n; i++) {
    await sleep(5);
    yield i;
  }
}

async function main() {
  await sequential();
  await parallel();
  await withErrors();
  for await (const tick of ticker(3)) console.log('tick', tick);
}
main();
