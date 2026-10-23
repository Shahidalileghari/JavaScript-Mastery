# JS Mastery — JavaScript from Basics to Advanced

Runnable, heavily commented examples. Every file is standalone, uses modern ES modules and requires **Node.js 18+** (no dependencies).

## Quick start

```bash
cd js-mastery
npm start                      # run every example
node 01-basics/04-functions.js # run a single file
npm run async                  # run one section (basics | intermediate | oop | async | advanced | patterns | dsa)
```

## Curriculum

| Folder | Topics |
|---|---|
| `01-basics` | variables, types, operators, control flow, functions, arrays, objects, strings/numbers/dates |
| `02-intermediate` | scope & hoisting, closures, `this`/bind, higher-order functions, destructuring, errors, Map/Set, regex/JSON/Intl |
| `03-oop` | classes, private fields, inheritance, prototypes, mixins & composition |
| `04-async` | callbacks, promises, async/await, event loop, retry/timeout/pool/abort |
| `05-modules` | ES modules: named/default exports, barrel files, dynamic import |
| `06-advanced` | iterators/generators, Proxy/Reflect, Symbols, memoize/debounce/throttle, immutability, workers/streams |
| `07-design-patterns` | singleton, factory, observer, strategy, decorator, command, dependency injection |
| `08-data-structures-algorithms` | linked list, stack, queue, BST, graphs, sorting, searching, classic problems, DP |
| `09-projects` | todo manager, custom EventEmitter + Promise, tiny test framework |

## Suggested path
1. Read each file top to bottom, run it, then change values and re-run.
2. After each folder, rewrite 2–3 examples from memory.
3. Finish with `09-projects` and extend them (add features, write tests).

## Naming conventions used
- Folders/files: `NN-kebab-case` so they sort in learning order.
- Classes `PascalCase`, functions/variables `camelCase`, constants `UPPER_SNAKE_CASE`.
- JSDoc comments (`/** ... */`) on every class and function.
