import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const joke = 'I put my resignation in the shared doc; three coworkers requested edits.';

try {
  const count = [...joke].length;
  if (count < 1 || count > 200 || !joke.trim() || /[\r\n\u2028\u2029]/u.test(joke)) {
    throw new Error('Entry must be one nonblank line of 1–200 Unicode code points.');
  }
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, 'entry.txt'), joke, 'utf8');
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Could not write entry.txt: ${message}`);
  process.exitCode = 1;
}
