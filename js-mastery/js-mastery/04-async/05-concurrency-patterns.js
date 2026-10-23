/**
 * 05 - Concurrency Patterns
 * Topics: retry w/ backoff, timeout, promise pool (concurrency limit), AbortController
 */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Retries an async function with exponential backoff. */
async function retry(fn, { retries = 3, baseDelay = 10 } = {}) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn(attempt);
    } catch (err) {
      lastError = err;
      await sleep(baseDelay * 2 ** attempt); // 10, 20, 40...
    }
  }
  throw lastError;
}

/** Rejects if the promise doesn't settle within `ms`. */
function withTimeout(promise, ms) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

/**
 * Runs async tasks with at most `limit` running at once.
 * @param {Array<() => Promise<any>>} tasks
 * @param {number} limit
 */
async function promisePool(tasks, limit) {
  const results = new Array(tasks.length);
  let next = 0;
  async function worker() {
    while (next < tasks.length) {
      const i = next++;
      results[i] = await tasks[i]();
    }
  }
  await Promise.all(Array.from({ length: limit }, worker));
  return results;
}

// ---- Demo ----
const result = await retry(async (attempt) => {
  if (attempt < 2) throw new Error('flaky');
  return `ok after ${attempt + 1} attempts`;
});
console.log(result);

await withTimeout(sleep(100), 20).catch((e) => console.log(e.message));

let running = 0, peak = 0;
const tasks = Array.from({ length: 6 }, (_, i) => async () => {
  peak = Math.max(peak, ++running);
  await sleep(10);
  running--;
  return i * 2;
});
console.log(await promisePool(tasks, 2), 'peak concurrency:', peak);

// AbortController: cooperative cancellation
const controller = new AbortController();
const cancellable = new Promise((resolve, reject) => {
  const t = setTimeout(resolve, 100);
  controller.signal.addEventListener('abort', () => { clearTimeout(t); reject(new Error('aborted')); });
});
setTimeout(() => controller.abort(), 10);
await cancellable.catch((e) => console.log(e.message));
