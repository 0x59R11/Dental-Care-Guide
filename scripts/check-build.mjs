import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { gzipSync } from 'node:zlib';
const output = resolve('dist');
const base =
  (process.env.BASE_PATH ?? '/Dental-Care-Guide').replace(/\/$/, '') + '/';
const origin = process.env.SITE_URL ?? 'https://0x59r11.github.io';
async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? files(join(directory, entry.name))
          : join(directory, entry.name),
      ),
    )
  ).flat();
}
const paths = await files(output);
const htmlFiles = paths.filter((path) => path.endsWith('.html'));
const failures = [];
const budgets = { learn: 30 * 1024, practice: 30 * 1024, test: 50 * 1024 };
let maxJs = 0;
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const relative = file.slice(output.length + 1).replace(/index\.html$/, '');
  const pageUrl = new URL(base + relative, origin);
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const url = new URL(match[1].replaceAll('&amp;', '&'), pageUrl);
    if (
      url.origin !== pageUrl.origin ||
      !['http:', 'https:'].includes(url.protocol)
    )
      continue;
    if (!url.pathname.startsWith(base)) {
      failures.push(`${relative}: outside deployment base ${url.pathname}`);
      continue;
    }
    let target = join(
      output,
      decodeURIComponent(url.pathname.slice(base.length)),
    );
    try {
      if ((await stat(target)).isDirectory())
        target = join(target, 'index.html');
      const contents = await readFile(target, 'utf8');
      if (url.hash && target.endsWith('.html')) {
        const id = decodeURIComponent(url.hash.slice(1));
        if (!contents.includes(`id="${id}"`))
          failures.push(`${relative}: missing anchor ${url.href}`);
      }
    } catch {
      failures.push(`${relative}: missing target ${url.href}`);
    }
  }
  const scriptPaths = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(
    (match) =>
      join(output, new URL(match[1], pageUrl).pathname.slice(base.length)),
  );
  const scripts = new Set(scriptPaths);
  async function collectImports(path) {
    const js = await readFile(path, 'utf8');
    for (const match of js.matchAll(
      /(?:from\s*|import\s*|import\s*\()(["'])(\.[^"']+\.js)\1/g,
    )) {
      const dependency = resolve(dirname(path), match[2]);
      if (!scripts.has(dependency)) {
        scripts.add(dependency);
        await collectImports(dependency);
      }
    }
  }
  for (const script of scriptPaths) await collectImports(script);
  let jsBytes = 0;
  for (const script of scripts)
    jsBytes += gzipSync(await readFile(script)).length;
  const inline = [
    ...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g),
  ]
    .map((match) => match[1])
    .join('\n');
  if (inline) jsBytes += gzipSync(inline).length;
  maxJs = Math.max(maxJs, jsBytes);
  const module = relative.split('/')[1];
  if (budgets[module] && jsBytes > budgets[module])
    failures.push(
      `${relative}: JS ${jsBytes} exceeds ${budgets[module]} bytes gzip`,
    );
  if (
    /<(?:script|iframe)[^>]+src="https?:\/\//.test(html) ||
    /<link[^>]+href="https:\/\/fonts\./.test(html)
  )
    failures.push(`${relative}: remote runtime dependency`);
}
let cssBytes = 0;
for (const file of paths.filter((path) => path.endsWith('.css')))
  cssBytes += gzipSync(await readFile(file)).length;
if (cssBytes > 25 * 1024) failures.push(`CSS ${cssBytes} exceeds 25KB gzip`);
if (htmlFiles.length !== 46)
  failures.push(`Expected 46 HTML pages, got ${htmlFiles.length}`);
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else
  console.log(
    `Checked ${htmlFiles.length} pages, internal links, anchors and assets at ${base}. Maximum JS: ${maxJs} bytes gzip; shared CSS: ${cssBytes} bytes gzip.`,
  );
