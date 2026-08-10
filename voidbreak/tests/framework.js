/**
 * VOIDBREAK — Minimal zero-dependency test framework.
 *
 * Deliberately dependency-free: a tiny describe/it/assert harness that runs
 * under plain Node. Tests for pure logic modules live in tests/*.test.js and
 * are executed by tests/run_tests.js.
 */

export const results = {
  passed: 0,
  failed: 0,
  skipped: 0,
  failures: [],
  suites: 0,
};

let currentSuite = 'global';
let currentTest = '';

export function suite(name, fn) {
  const prev = currentSuite;
  currentSuite = name;
  results.suites++;
  try {
    fn();
  } catch (err) {
    recordFailure(currentTest, err);
  }
  currentSuite = prev;
}

export function test(name, fn) {
  currentTest = `${currentSuite} › ${name}`;
  try {
    const ret = fn();
    if (ret && typeof ret.then === 'function') {
      throw new Error('Async tests are not supported — keep tests synchronous.');
    }
    results.passed++;
  } catch (err) {
    recordFailure(currentTest, err);
  }
}

export function it(name, fn) {
  test(name, fn);
}

function recordFailure(name, err) {
  results.failed++;
  results.failures.push({ name, error: err });
}

export function skip(name) {
  results.skipped++;
  void name;
}

// ---------------------------------------------------------------- assertions

export function assert(cond, message = 'assertion failed') {
  if (!cond) throw new Error(message);
}

export function assertEqual(actual, expected, message = '') {
  if (actual !== expected) {
    throw new Error(
      `${message || 'assertEqual'} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`,
    );
  }
}

export function assertNotEqual(actual, expected, message = '') {
  if (actual === expected) {
    throw new Error(`${message || 'assertNotEqual'} — unexpected ${JSON.stringify(actual)}`);
  }
}

export function assertClose(actual, expected, epsilon = 1e-6, message = '') {
  if (!Number.isFinite(actual) || Math.abs(actual - expected) > epsilon) {
    throw new Error(
      `${message || 'assertClose'} — expected ${expected} ± ${epsilon}, got ${actual}`,
    );
  }
}

export function assertArrayClose(actual, expected, epsilon = 1e-6, message = '') {
  if (actual.length !== expected.length) {
    throw new Error(`${message || 'assertArrayClose'} — length ${actual.length} vs ${expected.length}`);
  }
  for (let i = 0; i < actual.length; i++) {
    if (Math.abs(actual[i] - expected[i]) > epsilon) {
      throw new Error(
        `${message || 'assertArrayClose'} — index ${i}: expected ${expected[i]}, got ${actual[i]}`,
      );
    }
  }
}

export function assertVecClose(actual, expected, epsilon = 1e-5, message = '') {
  assertClose(actual.x, expected.x, epsilon, `${message || 'vec'}: x`);
  assertClose(actual.y, expected.y, epsilon, `${message || 'vec'}: y`);
  assertClose(actual.z, expected.z, epsilon, `${message || 'vec'}: z`);
}

export function assertThrows(fn, message = 'expected function to throw') {
  let threw = false;
  try {
    fn();
  } catch {
    threw = true;
  }
  if (!threw) throw new Error(message);
}

export function assertTruthy(v, message = 'expected truthy') {
  if (!v) throw new Error(message);
}

export function assertFalsy(v, message = 'expected falsy') {
  if (v) throw new Error(message);
}

export function assertType(v, type, message = '') {
  if (typeof v !== type) {
    throw new Error(`${message || 'assertType'} — expected ${type}, got ${typeof v}`);
  }
}

export function assertInRange(v, min, max, message = '') {
  if (v < min || v > max) {
    throw new Error(`${message || 'assertInRange'} — ${v} not in [${min}, ${max}]`);
  }
}

export function assertStringContains(haystack, needle, message = '') {
  if (typeof haystack !== 'string' || !haystack.includes(needle)) {
    throw new Error(`${message || 'assertStringContains'} — "${haystack}" missing "${needle}"`);
  }
}

/** Print a summary of results; returns exit code. */
export function printSummary() {
  const lines = [];
  lines.push('----------------------------------------------');
  lines.push(`Suites:   ${results.suites}`);
  lines.push(`Passed:   ${results.passed}`);
  lines.push(`Failed:   ${results.failed}`);
  lines.push(`Skipped:  ${results.skipped}`);
  if (results.failures.length > 0) {
    lines.push('----------------------------------------------');
    lines.push('Failures:');
    for (const f of results.failures) {
      lines.push(`  ✗ ${f.name}`);
      lines.push(`      ${f.error?.message ?? String(f.error)}`);
    }
  }
  lines.push('----------------------------------------------');
  console.log(lines.join('\n'));
  return results.failed === 0 ? 0 : 1;
}
