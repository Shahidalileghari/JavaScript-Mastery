/**
 * 05 - Destructuring, Spread & Rest
 */

// Array destructuring
const [first, , third = 'default', ...others] = [1, 2, undefined, 4, 5];
console.log(first, third, others);

// Swap without temp variable
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b);

// Object destructuring with rename + defaults + nested
const user = { id: 7, profile: { city: 'Karachi', zip: '74000' }, tags: ['dev'] };
const { id, profile: { city }, role = 'member', ...rest } = user;
console.log(id, city, role, rest);

// Destructuring in function parameters (named-arguments pattern)
function createUser({ name, age = 18, admin = false } = {}) {
  return { name, age, admin };
}
console.log(createUser({ name: 'Ali' }), createUser());

// Spread: copy / merge immutably
const base = { a: 1, b: 2 };
const updated = { ...base, b: 99, c: 3 };
const list = [1, 2, 3];
const more = [0, ...list, 4];
console.log(updated, more, Math.max(...list));

// Immutable update of nested state
const state = { todos: [{ id: 1, done: false }, { id: 2, done: false }] };
const next = {
  ...state,
  todos: state.todos.map((t) => (t.id === 2 ? { ...t, done: true } : t)),
};
console.log(state.todos[1].done, next.todos[1].done);
