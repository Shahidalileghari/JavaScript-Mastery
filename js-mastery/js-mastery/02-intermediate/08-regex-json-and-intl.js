/**
 * 08 - Regular Expressions, JSON, Intl
 */

// ---- Regex ----
const email = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
console.log(email.test('dev@example.com'), email.test('nope'));

const text = 'Order #123 and order #456';
console.log(text.match(/#(\d+)/g));                 // all matches
for (const m of text.matchAll(/#(?<num>\d+)/g)) {   // named capture groups
  console.log(m.groups.num);
}
console.log('2026-01-15'.replace(/(\d+)-(\d+)-(\d+)/, '$3/$2/$1'));

// ---- JSON ----
const obj = { name: 'Shahid', skills: ['JS'], joined: new Date('2026-01-01T00:00:00Z'), skip: undefined };
const json = JSON.stringify(obj, null, 2); // pretty print; undefined is dropped
console.log(json);
console.log(JSON.parse(json, (k, v) => (k === 'joined' ? new Date(v) : v)).joined instanceof Date);

// ---- Intl ----
console.log(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(1234.5));
console.log(new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR' }).format(50000));
console.log(new Intl.PluralRules('en').select(1), new Intl.ListFormat('en').format(['a', 'b', 'c']));
