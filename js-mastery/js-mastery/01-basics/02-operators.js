/**
 * 02 - Operators
 * Topics: arithmetic, comparison, logical, nullish, optional chaining, ternary
 */

// Arithmetic
console.log(10 + 3, 10 - 3, 10 * 3, 10 / 3, 10 % 3, 2 ** 10);

// Increment / decrement
let n = 5;
console.log(n++, n);   // 5 6  (post-increment returns old value)
console.log(++n, n);   // 7 7  (pre-increment returns new value)

// Comparison
console.log(5 > 3, 5 <= 3, 5 !== '5');

// Logical operators short-circuit
console.log(true && 'second');   // 'second'
console.log(false || 'fallback'); // 'fallback'
console.log(!0);                  // true

// Nullish coalescing (??) only falls back on null/undefined
const volume = 0;
console.log(volume || 50);  // 50  (0 is falsy - maybe not what you wanted!)
console.log(volume ?? 50);  // 0   (0 is a valid value)

// Optional chaining (?.) safely reads deep properties
const user = { profile: { name: 'Shahid' } };
console.log(user.profile?.name, user.address?.city); // 'Shahid' undefined

// Logical assignment
let config = { theme: null };
config.theme ??= 'dark';   // assign only if null/undefined
console.log(config);

// Ternary
const age = 20;
console.log(age >= 18 ? 'adult' : 'minor');

// Bitwise (rare, but good to know)
console.log(5 & 3, 5 | 3, 5 ^ 3, ~5, 1 << 3);
