/**
 * Logger - demonstrates a DEFAULT export and module-level private state.
 */
let count = 0; // private to this module (modules are singletons)

export default class Logger {
  constructor(prefix) { this.prefix = prefix; }
  log(message) {
    count++;
    console.log(`[${this.prefix}] #${count}: ${message}`);
  }
  static get totalLogs() { return count; }
}
