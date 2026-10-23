/**
 * run-all.js
 * ------------------------------------------------------------
 * Runs every example file in the course (or only one folder).
 * Usage:
 *   node scripts/run-all.js              -> run everything
 *   node scripts/run-all.js 01-basics    -> run one folder
 */
import { readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const only = process.argv[2];
const skip = new Set(['node_modules', 'scripts', '05-modules']);

/** Recursively collect .js files in a directory, sorted by name. */
function collect(dir) {
  return readdirSync(dir).sort().flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? collect(full) : full.endsWith('.js') ? [full] : [];
  });
}

const folders = readdirSync(root)
  .filter((f) => statSync(join(root, f)).isDirectory() && !skip.has(f) && !f.startsWith('.'))
  .filter((f) => !only || f === only)
  .sort();

let failed = 0;
for (const folder of folders) {
  for (const file of collect(join(root, folder))) {
    const rel = file.replace(root + '/', '');
    const res = spawnSync('node', [file], { encoding: 'utf8' });
    const ok = res.status === 0;
    if (!ok) failed++;
    console.log(`${ok ? '✅' : '❌'} ${rel}`);
    if (!ok) console.log(res.stderr);
  }
}
if (!only || only === '05-modules') {
  const res = spawnSync('node', [join(root, '05-modules/main.js')], { encoding: 'utf8' });
  console.log(`${res.status === 0 ? '✅' : '❌'} 05-modules/main.js`);
  if (res.status !== 0) { failed++; console.log(res.stderr); }
}
console.log(failed ? `\n${failed} file(s) failed` : '\nAll examples ran successfully 🎉');
process.exit(failed ? 1 : 0);
