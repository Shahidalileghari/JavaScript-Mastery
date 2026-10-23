/**
 * 06 - Error Handling
 * Topics: try/catch/finally, throw, custom errors, error cause
 */

/** Custom error class carrying extra context. */
class ValidationError extends Error {
  constructor(field, message, options) {
    super(message, options);
    this.name = 'ValidationError';
    this.field = field;
  }
}

/** Throws if the input is invalid. */
function validateAge(age) {
  if (typeof age !== 'number') throw new TypeError('age must be a number');
  if (age < 0) throw new ValidationError('age', 'age cannot be negative');
  return age;
}

for (const input of [25, -1, 'x']) {
  try {
    console.log('valid:', validateAge(input));
  } catch (err) {
    if (err instanceof ValidationError) console.log('Validation:', err.field, err.message);
    else if (err instanceof TypeError) console.log('Type problem:', err.message);
    else throw err; // unknown error -> re-throw, never swallow
  } finally {
    console.log('finally always runs');
  }
}

// Wrapping errors with `cause` keeps the original stack/context
try {
  try {
    JSON.parse('{ bad json');
  } catch (e) {
    throw new Error('Config could not be loaded', { cause: e });
  }
} catch (err) {
  console.log(err.message, '<-', err.cause.name);
}

/** Result-tuple style: avoid exceptions for expected failures. */
function safeParse(json) {
  try { return [null, JSON.parse(json)]; }
  catch (error) { return [error, null]; }
}
const [error, data] = safeParse('{"ok":true}');
console.log(error, data);
