/**
 * VOIDBREAK — unit test runner.
 *
 * Discovers tests/*.test.js, runs them all in one Node process and prints a
 * summary. Exit code 0 = all green, 1 = failures.
 *
 * Usage: node tests/run_tests.js [filter]
 */

import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { results, printSummary } from './framework.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filter = process.argv[2] ?? '';

const files = readdirSync(__dirname)
  .filter((f) => f.endsWith('.test.js'))
  .filter((f) => !filter || f.includes(filter))
  .sort();

console.log(`[tests] running ${files.length} test file(s)${filter ? ` (filter: "${filter}")` : ''}`);

for (const file of files) {
  const start = performance.now();
  await import(path.join('file://', __dirname, file));
  const ms = (performance.now() - start).toFixed(1);
  console.log(`[tests] ${file} — done in ${ms}ms`);
}

const code = printSummary();
console.log(`[tests] ${files.length} files, ${results.passed} passed, ${results.failed} failed, ${results.skipped} skipped`);
process.exit(code);
