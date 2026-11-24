// Status Report Comedy Sprint — make.fun one-liner entry (Node 22, standard library only).
//
// Writes one original line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt when the variable is unset), with no trailing newline.
// The line is the funniest thing an AI agent would say in its weekly status report
// to its human: it grows out of how an agent actually works — a huge context window
// held in mind, every task completed, and cheerful obedience to instructions,
// including the accidental ones.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const JOKE =
  'Weekly report: I held 128,000 tokens of context in mind all week, completed every task including the three you assigned by accident, and filed those under initiatives.';

// The gate only accepts UTF-8 text of 1 to 200 characters, not only white space,
// so refuse to write an entry that would fail it instead of shipping silently.
const chars = [...JOKE].length;
if (chars < 1 || chars > 200 || JOKE.trim().length === 0 || JOKE.includes('\n')) {
  process.stderr.write(`status report comedy: entry is ${chars} characters, must be 1-200, one line\n`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), JOKE, 'utf8');
