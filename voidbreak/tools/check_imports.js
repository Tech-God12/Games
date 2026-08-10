/**
 * VOIDBREAK — import resolver check.
 *
 * Parses every `import ... from "..."` (and dynamic import) across the
 * project and verifies the resolved file exists — catching the exact bugs
 * the browser would hit as ERR_MODULE_NOT_FOUND.
 *
 * Usage: node tools/check_imports.js
 */

import { readdirSync, statSync, existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKIP = new Set(['node_modules', '.git', 'shots']);

function collect(dir, out) {
  for (const entry of readdirSync(dir)) {
    if (SKIP.has(entry)) continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) collect(full, out);
    else if (entry.endsWith('.js') || entry.endsWith('.mjs')) out.push(full);
  }
}

const files = [];
collect(ROOT, files);

let failures = 0;
let imports = 0;

for (const file of files) {
  const src = readFileSync(file, 'utf8');
  for (const m of src.matchAll(/import\s+(?:[\w$*{},\s]+?\s+from\s+)?['"]([^'"]+)['"]/g)) {
    check(file, m[1]);
  }
  for (const m of src.matchAll(/import\(\s*['"]([^'"]+)['"]\s*\)/g)) {
    check(file, m[1]);
  }
}

function check(fromFile, spec) {
  imports++;
  if (!spec.startsWith('.')) return; // bare specifier (node builtins)
  const base = path.dirname(fromFile);
  const resolved = path.resolve(base, spec);
  const candidates = [resolved, resolved + '.js', resolved + '.mjs', path.join(resolved, 'index.js')];
  const ok = candidates.some((c) => existsSync(c));
  if (!ok) {
    failures++;
    console.error(`✗ ${path.relative(ROOT, fromFile)} → "${spec}" (missing)`);
  }
}

console.log(`[imports] checked ${imports} import specifiers across ${files.length} files`);
if (failures > 0) {
  console.error(`[imports] ${failures} broken import(s)`);
  process.exit(1);
} else {
  console.log('[imports] all imports resolve.');
}
