import { readFile } from 'node:fs/promises';
const source = await readFile('src/data/sources.ts', 'utf8');
for (const [, url] of source.matchAll(/url: '(https:[^']+)'/g)) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
    console.log(response.status, url);
    if (!response.ok) process.exitCode = 1;
    await response.body?.cancel();
  } catch (error) {
    console.error(url, error.message);
    process.exitCode = 1;
  }
}
