/**
 * 07 - Strings, Numbers, Math & Dates
 */

// ---- Strings ----
const s = '  Hello, JavaScript!  ';
console.log(s.trim().toUpperCase(), s.length);
console.log('abc'.padStart(5, '*'), 'abc'.repeat(2));
console.log('a-b-c'.split('-'), ['x', 'y'].join('+'));
console.log('JavaScript'.slice(0, 4), 'JavaScript'.includes('Script'));
console.log('one two one'.replaceAll('one', '1'));
console.log('abc'.at(-1)); // last char

// Template literals: interpolation + multi-line
const name = 'Shahid';
console.log(`Welcome ${name}, 2 + 3 = ${2 + 3}`);

// ---- Numbers ----
console.log(0.1 + 0.2);                    // 0.30000000000000004 (floating-point!)
console.log((0.1 + 0.2).toFixed(2));       // "0.30"
console.log(Number.isInteger(5.0), Number.isNaN(NaN));
console.log(parseInt('42px'), parseFloat('3.14abc'));
console.log(Number.MAX_SAFE_INTEGER);
console.log((1234567.891).toLocaleString('en-US')); // 1,234,567.891

// ---- Math ----
console.log(Math.round(2.5), Math.floor(-2.5), Math.ceil(2.1), Math.trunc(-2.9));
console.log(Math.max(1, 9, 4), Math.min(...[3, 1, 2]), Math.abs(-7));
console.log(Math.sqrt(16), Math.pow(2, 8), Math.hypot(3, 4));

/** Random integer in [min, max] inclusive. */
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
console.log(randomInt(1, 6) >= 1);

// ---- Dates ----
const d = new Date('2026-01-15T10:30:00Z');
console.log(d.toISOString(), d.getUTCFullYear(), d.getUTCMonth()); // month is 0-based!
console.log(new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeZone: 'UTC' }).format(d));
