/**
 * Project 3 - A tiny test framework (describe / it / expect)
 * Shows closures, async/await, custom errors and higher-order functions.
 */

const suites = [];
let currentSuite = null;

/** Groups tests. */
const describe = (name, fn) => { currentSuite = { name, tests: [] }; suites.push(currentSuite); fn(); };
/** Registers a (possibly async) test. */
const it = (name, fn) => currentSuite.tests.push({ name, fn });

/** Assertion helper with chained matchers. */
function expect(actual) {
  const fail = (msg) => { throw new Error(msg); };
  return {
    toBe: (exp) => Object.is(actual, exp) || fail(`Expected ${exp} but got ${actual}`),
    toEqual: (exp) => JSON.stringify(actual) === JSON.stringify(exp) || fail(`Expected ${JSON.stringify(exp)} but got ${JSON.stringify(actual)}`),
    toThrow: () => {
      try { actual(); } catch { return true; }
      fail('Expected function to throw');
    },
    rejects: async () => {
      try { await actual; } catch { return true; }
      fail('Expected promise to reject');
    },
  };
}

/** Executes every registered test and prints a summary. */
async function run() {
  let passed = 0, failed = 0;
  for (const suite of suites) {
    console.log(`\n${suite.name}`);
    for (const test of suite.tests) {
      try { await test.fn(); passed++; console.log(`  ✓ ${test.name}`); }
      catch (e) { failed++; console.log(`  ✗ ${test.name}: ${e.message}`); }
    }
  }
  console.log(`\n${passed} passed, ${failed} failed`);
  if (failed) process.exitCode = 1;
}

// ---- Using the framework ----
const sum = (...n) => n.reduce((a, b) => a + b, 0);

describe('sum()', () => {
  it('adds numbers', () => expect(sum(1, 2, 3)).toBe(6));
  it('returns 0 for no args', () => expect(sum()).toBe(0));
});

describe('async behaviour', () => {
  it('resolves values', async () => expect(await Promise.resolve([1])).toEqual([1]));
  it('detects rejection', () => expect(Promise.reject(new Error('x'))).rejects());
  it('detects throw', () => expect(() => JSON.parse('{')).toThrow());
});

await run();
