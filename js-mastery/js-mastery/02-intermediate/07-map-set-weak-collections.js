/**
 * 07 - Map, Set, WeakMap, WeakSet
 */

// Map: key-value pairs, ANY type as key, keeps insertion order
const scores = new Map([['ali', 90]]);
scores.set('sara', 95).set({ id: 1 }, 'object key');
console.log(scores.get('ali'), scores.size, scores.has('sara'));
for (const [k, v] of scores) console.log(k, v);

// Set: unique values
const unique = new Set([1, 2, 2, 3, 3, 3]);
console.log([...unique], unique.has(2));

// Set operations
const A = new Set([1, 2, 3]);
const B = new Set([2, 3, 4]);
console.log('union', [...new Set([...A, ...B])]);
console.log('intersection', [...A].filter((x) => B.has(x)));
console.log('difference', [...A].filter((x) => !B.has(x)));

// Grouping (ES2024)
const grouped = Object.groupBy([1, 2, 3, 4, 5], (n) => (n % 2 ? 'odd' : 'even'));
console.log(grouped);

// WeakMap: keys must be objects, held weakly (garbage-collectable).
// Perfect for private data / caches tied to object lifetime.
const privateData = new WeakMap();
class Account {
  constructor(balance) { privateData.set(this, { balance }); }
  get balance() { return privateData.get(this).balance; }
}
console.log(new Account(500).balance);
