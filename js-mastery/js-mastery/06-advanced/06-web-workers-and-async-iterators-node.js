/**
 * 06 - Node Worker Threads, EventEmitter & Streams
 * JS is single-threaded, but Node can run CPU-heavy work in separate threads.
 */
import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import { EventEmitter } from 'node:events';
import { Readable, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

// ---- Worker threads (this file is both main and worker) ----
if (!isMainThread) {
  // Worker code: heavy CPU task without blocking the main thread
  let sum = 0;
  for (let i = 0; i < workerData.n; i++) sum += i;
  parentPort.postMessage(sum);
} else {
  const runWorker = (n) =>
    new Promise((resolve, reject) => {
      const w = new Worker(new URL(import.meta.url), { workerData: { n } });
      w.once('message', resolve);
      w.once('error', reject);
    });

  console.log('worker result:', await runWorker(1_000_000));

  // ---- EventEmitter ----
  class Orders extends EventEmitter {}
  const orders = new Orders();
  orders.on('created', (id) => console.log('order created', id));
  orders.once('created', () => console.log('(first order only)'));
  orders.emit('created', 1);
  orders.emit('created', 2);

  // ---- Streams: process data piece by piece, not all in memory ----
  const upper = new Transform({
    transform(chunk, _enc, cb) { cb(null, chunk.toString().toUpperCase()); },
  });
  const chunks = [];
  await pipeline(
    Readable.from(['stream ', 'of ', 'data']),
    upper,
    async function (source) { for await (const c of source) chunks.push(c.toString()); },
  );
  console.log(chunks.join(''));
}
