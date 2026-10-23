/**
 * Project 2 - Build your own EventEmitter and Promise
 * Great for understanding what the built-ins really do.
 */

/** Minimal EventEmitter. */
class MiniEmitter {
  #events = {};
  on(name, fn) { (this.#events[name] ||= []).push(fn); return this; }
  off(name, fn) { this.#events[name] = (this.#events[name] ?? []).filter((f) => f !== fn); return this; }
  once(name, fn) {
    const wrapper = (...a) => { this.off(name, wrapper); fn(...a); };
    return this.on(name, wrapper);
  }
  emit(name, ...args) { (this.#events[name] ?? []).slice().forEach((fn) => fn(...args)); return this; }
}

const em = new MiniEmitter();
em.once('hello', (n) => console.log('once:', n));
em.on('hello', (n) => console.log('on:', n));
em.emit('hello', 'A').emit('hello', 'B');

/** Minimal Promise (A+ inspired, simplified). */
class MyPromise {
  #state = 'pending';
  #value;
  #handlers = [];

  constructor(executor) {
    const settle = (state) => (value) => {
      if (this.#state !== 'pending') return;
      this.#state = state;
      this.#value = value;
      this.#handlers.forEach((h) => this.#run(h));
    };
    try { executor(settle('fulfilled'), settle('rejected')); }
    catch (e) { settle('rejected')(e); }
  }

  #run({ onFulfilled, onRejected, resolve, reject }) {
    queueMicrotask(() => {
      const cb = this.#state === 'fulfilled' ? onFulfilled : onRejected;
      if (!cb) return (this.#state === 'fulfilled' ? resolve : reject)(this.#value);
      try { resolve(cb(this.#value)); } catch (e) { reject(e); }
    });
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handler = { onFulfilled, onRejected, resolve, reject };
      this.#state === 'pending' ? this.#handlers.push(handler) : this.#run(handler);
    });
  }
  catch(onRejected) { return this.then(undefined, onRejected); }
}

new MyPromise((res) => setTimeout(() => res(21), 10))
  .then((n) => n * 2)
  .then((n) => { console.log('MyPromise result:', n); throw new Error('oops'); })
  .catch((e) => console.log('MyPromise caught:', e.message));
