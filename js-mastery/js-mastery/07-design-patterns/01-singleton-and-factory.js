/**
 * 01 - Singleton & Factory Patterns
 */

/** SINGLETON: exactly one instance exists. */
class Config {
  static #instance = null;
  #settings = {};

  constructor() {
    if (Config.#instance) return Config.#instance;
    Config.#instance = this;
  }
  set(k, v) { this.#settings[k] = v; return this; }
  get(k) { return this.#settings[k]; }
}
const c1 = new Config().set('env', 'prod');
const c2 = new Config();
console.log(c1 === c2, c2.get('env'));

/** FACTORY: creates objects without exposing creation logic. */
class Email { send(msg) { return `email: ${msg}`; } }
class Sms   { send(msg) { return `sms: ${msg}`; } }
class Push  { send(msg) { return `push: ${msg}`; } }

class NotificationFactory {
  static #registry = new Map([['email', Email], ['sms', Sms], ['push', Push]]);
  static create(type) {
    const Ctor = this.#registry.get(type);
    if (!Ctor) throw new Error(`Unknown notification type: ${type}`);
    return new Ctor();
  }
  /** Open/closed principle: register new types without editing the class. */
  static register(type, Ctor) { this.#registry.set(type, Ctor); }
}
console.log(NotificationFactory.create('sms').send('hello'));
