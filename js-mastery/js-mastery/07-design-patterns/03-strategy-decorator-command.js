/**
 * 03 - Strategy, Decorator & Command Patterns
 */

// ---- STRATEGY: swap algorithms at runtime ----
const discountStrategies = {
  none: (price) => price,
  percent: (price) => price * 0.9,
  flat: (price) => Math.max(0, price - 20),
};
const checkout = (price, strategy = 'none') => discountStrategies[strategy](price);
console.log(checkout(100), checkout(100, 'percent'), checkout(100, 'flat'));

// ---- DECORATOR: wrap a function to add behaviour ----
const withLogging = (fn) => (...args) => {
  const result = fn(...args);
  console.log(`${fn.name || 'fn'}(${args.join(', ')}) = ${result}`);
  return result;
};
const withTiming = (fn) => (...args) => {
  const start = performance.now();
  const result = fn(...args);
  console.log(`took ${(performance.now() - start).toFixed(3)}ms`);
  return result;
};
const add = (a, b) => a + b;
withTiming(withLogging(add))(2, 3);

// ---- COMMAND with UNDO ----
class TextEditor {
  text = '';
  #history = [];

  /** Executes a command object { do, undo } and records it. */
  run(command) {
    command.do(this);
    this.#history.push(command);
  }
  undo() { this.#history.pop()?.undo(this); }
}
const append = (str) => ({
  do: (ed) => { ed.text += str; },
  undo: (ed) => { ed.text = ed.text.slice(0, -str.length); },
});
const editor = new TextEditor();
editor.run(append('Hello'));
editor.run(append(' World'));
console.log(editor.text);
editor.undo();
console.log(editor.text);
