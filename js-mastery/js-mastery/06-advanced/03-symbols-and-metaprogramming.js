/**
 * 03 - Symbols & Well-Known Symbols
 */

// Symbols are unique - ideal for "hidden" property keys
const id = Symbol('id');
const user = { name: 'Shahid', [id]: 123 };
console.log(Object.keys(user), user[id]);      // symbol key not listed
console.log(Symbol('a') === Symbol('a'));      // false
console.log(Symbol.for('app') === Symbol.for('app')); // global registry: true

// Customising built-in behaviour with well-known symbols
class Money {
  constructor(amount, currency) { this.amount = amount; this.currency = currency; }

  // Controls type conversion (+money, `${money}`)
  [Symbol.toPrimitive](hint) {
    return hint === 'number' ? this.amount : `${this.amount} ${this.currency}`;
  }
  // Controls Object.prototype.toString output
  get [Symbol.toStringTag]() { return 'Money'; }
  // Controls `instanceof`-like checks
  static [Symbol.hasInstance](x) { return 'amount' in x && 'currency' in x; }
}

const m = new Money(50, 'USD');
console.log(+m, `${m}`, Object.prototype.toString.call(m));
console.log({ amount: 1, currency: 'PKR' } instanceof Money);

// Tagged template literals
function highlight(strings, ...values) {
  return strings.reduce((out, str, i) => out + str + (values[i] !== undefined ? `[${values[i]}]` : ''), '');
}
const item = 'laptop', price = 999;
console.log(highlight`Buying ${item} for $${price}`);

/** Simple safe-HTML tag: escapes interpolated values. */
const html = (strings, ...vals) =>
  strings.reduce((out, s, i) => out + s + (i < vals.length ? String(vals[i]).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`) : ''), '');
console.log(html`<p>${'<script>alert(1)</script>'}</p>`);
