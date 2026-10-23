/**
 * 05 - Arrays
 * Topics: create, mutate, iterate, map/filter/reduce, find, sort, flat, immutable updates
 */

const fruits = ['apple', 'banana', 'cherry'];

// ---- Mutating methods (change the original array) ----
fruits.push('date');       // add to end
fruits.unshift('apricot'); // add to start
fruits.pop();              // remove from end
fruits.shift();            // remove from start
console.log(fruits);

// splice(start, deleteCount, ...items)
const letters = ['a', 'b', 'c', 'd'];
letters.splice(1, 2, 'X'); // remove 2 items from index 1, insert 'X'
console.log(letters);

// ---- Non-mutating methods (return new arrays) ----
const nums = [5, 3, 8, 1, 9, 2];
console.log(nums.slice(1, 3));            // copy a range
console.log(nums.map((n) => n * 2));      // transform each item
console.log(nums.filter((n) => n % 2));   // keep odd numbers
console.log(nums.reduce((a, n) => a + n, 0)); // fold to one value

// ---- Searching ----
console.log(nums.find((n) => n > 5));       // first match -> 8
console.log(nums.findIndex((n) => n > 5));  // index -> 2
console.log(nums.includes(3), nums.indexOf(9));
console.log(nums.some((n) => n > 8), nums.every((n) => n > 0));

// ---- Sorting ----
// Default sort is alphabetical! Always pass a comparator for numbers.
console.log([...nums].sort((a, b) => a - b)); // ascending (copy first!)
console.log(nums.toSorted((a, b) => b - a));  // ES2023: non-mutating sort

// ---- Flattening & grouping ----
console.log([1, [2, [3, [4]]]].flat(Infinity));
console.log([[1, 2], [3]].flatMap((x) => x));

// ---- Array.from / spread ----
console.log(Array.from({ length: 5 }, (_, i) => i * i)); // [0,1,4,9,16]
const merged = [...[1, 2], ...[3, 4]];
console.log(merged);

// ---- Chaining ----
const total = [1, 2, 3, 4, 5, 6]
  .filter((n) => n % 2 === 0)
  .map((n) => n * 10)
  .reduce((a, b) => a + b, 0);
console.log('chained total:', total);
