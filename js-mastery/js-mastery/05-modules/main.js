/**
 * 05 - ES Modules (import / export)
 * Run with: node 05-modules/main.js   (package.json has "type": "module")
 */
import { add, multiply, PI as pi } from './utils/math.js';   // named + rename
import Logger from './utils/logger.js';                       // default import
import * as utils from './utils/index.js';                    // namespace import

const log = new Logger('main');
log.log(`add(2,3) = ${add(2, 3)}`);
log.log(`multiply(4,5) = ${multiply(4, 5)}, pi = ${pi}`);
log.log(`barrel exports: ${Object.keys(utils).join(', ')}`);
console.log('total logs:', Logger.totalLogs);

// Dynamic import: load code on demand (returns a promise)
const { default: Logger2 } = await import('./utils/logger.js');
console.log('same module instance:', Logger === Logger2);

// Built-in node: modules
import { basename } from 'node:path';
console.log(basename(import.meta.url)); // import.meta.url = current file's URL
