/**
 * 02 - Observer / Pub-Sub Pattern
 */

/** Minimal typed event bus. */
class EventBus {
  #listeners = new Map();

  /** Subscribe; returns an unsubscribe function. */
  on(event, handler) {
    if (!this.#listeners.has(event)) this.#listeners.set(event, new Set());
    this.#listeners.get(event).add(handler);
    return () => this.off(event, handler);
  }
  off(event, handler) { this.#listeners.get(event)?.delete(handler); }
  emit(event, payload) {
    this.#listeners.get(event)?.forEach((h) => h(payload));
  }
}

/** Observable store: UI subscribes to state changes. */
class Store {
  #state; #subscribers = new Set();
  constructor(initial) { this.#state = initial; }
  getState() { return this.#state; }
  setState(patch) {
    this.#state = { ...this.#state, ...patch };
    this.#subscribers.forEach((fn) => fn(this.#state));
  }
  subscribe(fn) { this.#subscribers.add(fn); return () => this.#subscribers.delete(fn); }
}

const bus = new EventBus();
const unsubscribe = bus.on('login', (u) => console.log('welcome', u));
bus.emit('login', 'Shahid');
unsubscribe();
bus.emit('login', 'nobody hears this');

const store = new Store({ count: 0 });
store.subscribe((s) => console.log('state changed ->', s));
store.setState({ count: 1 });
store.setState({ count: 2 });
