/**
 * VOIDBREAK — line counter.
 *
 * Counts lines of code in the project with a breakdown by directory and by
 * file type (code vs comments vs blank). Used to track progress toward the
 * project's scale goals.
 *
 * Usage: node tools/line_count.js [dir]
 */

import { readdirSync, statSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.cache']);
const COUNTED_EXT = new Set(['.js', '.mjs', '.cjs', '.html', '.css', '.json', '.md', '.glsl', '.txt']);

function collect(dir, out) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      collect(full, out);
    } else if (COUNTED_EXT.has(path.extname(entry))) {
      out.push(full);
    }
  }
}

function analyzeFile(file) {
  const content = readFileSync(file, 'utf8');
  const lines = content.split(/\r?\n/);
  let code = 0;
  let comments = 0;
  let blank = 0;
  let inBlock = false;
  for (const raw of lines) {
    const line = raw.trim();
    if (line === '') {
      blank++;
      continue;
    }
    if (inBlock) {
      comments++;
      if (line.includes('*/')) inBlock = false;
      continue;
    }
    if (line.startsWith('//') || line.startsWith('*') || line.startsWith('/*')) {
      comments++;
      if (line.startsWith('/*') && !line.includes('*/')) inBlock = true;
      continue;
    }
    code++;
  }
  return { code, comments, blank };
}

const files = [];
const target = process.argv[2] ? path.resolve(ROOT, process.argv[2]) : ROOT;
collect(target, files);

const totals = { files: 0, code: 0, comments: 0, blank: 0, bytes: 0 };
const byDir = new Map();
const byExt = new Map();

for (const file of files) {
  const a = analyzeFile(file);
  const rel = path.relative(ROOT, file);
  const dir = path.dirname(rel) === '.' ? '(root)' : path.dirname(rel);
  const ext = path.extname(file) || '(none)';

  totals.files++;
  totals.code += a.code;
  totals.comments += a.comments;
  totals.blank += a.blank;
  totals.bytes += statSync(file).size;

  const d = byDir.get(dir) ?? { code: 0, files: 0 };
  d.code += a.code;
  d.files++;
  byDir.set(dir, d);

  const e = byExt.get(ext) ?? { code: 0, files: 0 };
  e.code += a.code;
  e.files++;
  byExt.set(ext, e);
}

const total = totals.code + totals.comments + totals.blank;
console.log('==============================================');
console.log(`  VOIDBREAK line count`);
console.log(`  Target: ${process.argv[2] ? path.relative(ROOT, target) : '(whole project)'}`);
console.log('==============================================');
console.log(`  Files:    ${totals.files}`);
console.log(`  Code:     ${totals.code.toLocaleString()}`);
console.log(`  Comments: ${totals.comments.toLocaleString()}`);
console.log(`  Blank:    ${totals.blank.toLocaleString()}`);
console.log(`  TOTAL:    ${total.toLocaleString()} lines (${(totals.bytes / 1024).toFixed(0)} KB)`);
console.log('----------------------------------------------');
console.log('  By directory:');
const dirRows = [...byDir.entries()].sort((a, b) => b[1].code - a[1].code);
for (const [dir, d] of dirRows) {
  console.log(`    ${dir.padEnd(28)} ${d.files.toString().padStart(4)} files  ${d.code.toLocaleString().padStart(8)} code lines`);
}
console.log('----------------------------------------------');
console.log('  By extension:');
for (const [ext, e] of [...byExt.entries()].sort((a, b) => b[1].code - a[1].code)) {
  console.log(`    ${(ext || '(none)').padEnd(8)} ${e.files.toString().padStart(4)} files  ${e.code.toLocaleString().padStart(8)} code lines`);
}
console.log('==============================================');
