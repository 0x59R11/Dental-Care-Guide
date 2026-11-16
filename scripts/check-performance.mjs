import { chromium } from '@playwright/test';
import lighthouse from 'lighthouse';
import { mkdir, writeFile } from 'node:fs/promises';
const base = (process.env.BASE_PATH ?? '/Dental-Care-Guide').replace(/\/$/, '');
const browser = await chromium.launch({
  executablePath: process.env.BROWSER_PATH,
  args: ['--remote-debugging-port=9223'],
});
const targets = {
  performance: 0.95,
  accessibility: 1,
  'best-practices': 0.95,
  seo: 0.95,
};
await mkdir('artifacts/lighthouse', { recursive: true });
try {
  for (const route of [
    'en/',
    'de/learn/when-problems-progress/',
    'uk/practice/',
    'ru/test/',
  ]) {
    const result = await lighthouse(`http://127.0.0.1:4387${base}/${route}`, {
      port: 9223,
      output: 'json',
      onlyCategories: Object.keys(targets),
      logLevel: 'error',
    });
    const report = result.lhr;
    await writeFile(
      `artifacts/lighthouse/${route.replaceAll('/', '-')}.json`,
      JSON.stringify(report, null, 2),
    );
    const scores = Object.fromEntries(
      Object.entries(report.categories).map(([id, category]) => [
        id,
        category.score,
      ]),
    );
    console.log(route, scores);
    for (const [id, minimum] of Object.entries(targets))
      if (scores[id] < minimum) process.exitCode = 1;
  }
} finally {
  await browser.close();
}
