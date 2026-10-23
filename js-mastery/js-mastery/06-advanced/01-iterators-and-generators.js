/**
 * 01 - Iterators & Generators
 */

/** Custom iterable: implements [Symbol.iterator]. */
class Range {
  constructor(start, end, step = 1) {
    this.start = start; this.end = end; this.step = step;
  }
  [Symbol.iterator]() {
    let current = this.start;
    const { end, step } = this;
    return {
      next: () => (current <= end
        ? { value: (current += step) - step, done: false }
        : { value: undefined, done: true }),
    };
  }
}
console.log([...new Range(1, 10, 3)]);

/** Generator: pauses at each `yield`, resumes on next(). */
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

/** Lazy helper: take first n items from any iterable. */
function* take(n, iterable) {
  let i = 0;
  for (const item of iterable) {
    if (i++ >= n) return;
    yield item;
  }
}
console.log([...take(10, fibonacci())]); // infinite sequence, consumed lazily

/** Two-way communication: values can be sent INTO a generator. */
function* conversation() {
  const name = yield 'What is your name?';
  const lang = yield `Hi ${name}! Favourite language?`;
  return `${name} likes ${lang}`;
}
const chat = conversation();
console.log(chat.next().value);
console.log(chat.next('Shahid').value);
console.log(chat.next('JavaScript'));

/** yield* delegates to another iterable. */
function* flatten(arr) {
  for (const item of arr) Array.isArray(item) ? yield* flatten(item) : yield item;
}
console.log([...flatten([1, [2, [3, [4]]]])]);
