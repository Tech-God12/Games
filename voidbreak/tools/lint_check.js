/**
 * VOIDBREAK — syntax checker.
 *
 * Runs `node --check` (parse-only) over every .js file in the project so
 * syntax errors are caught before the browser ever loads the game.
 *
 * Usage: node tools/lint_check.js [path]
 */

import { execFileSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKIP_DIRS = new Set(['node_modules', '.git']);
const ONLY_EXT = new Set(['.js', '.mjs', '.cjs']);

function collect(dir, out) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      collect(full, out);
    } else if (ONLY_EXT.has(path.extname(entry))) {
      out.push(full);
    }
  }
}

const files = [];
const startDir = process.argv[2] ? path.resolve(ROOT, process.argv[2]) : ROOT;
collect(startDir, files);

let failed = 0;
for (const file of files) {
  try {
    execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
  } catch (err) {
    failed++;
    const msg = err.stderr?.toString().trim() ?? err.message;
    console.error(`✗ ${path.relative(ROOT, file)}\n    ${msg}`);
  }
}

if (failed === 0) {
  console.log(`[lint] OK — ${files.length} file(s) parsed cleanly.`);
} else {
  console.error(`[lint] ${failed} file(s) failed to parse.`);
  process.exit(1);
}
