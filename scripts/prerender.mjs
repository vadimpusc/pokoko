import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { render } from 'svelte/server';

const root = resolve(import.meta.dirname, '..');
const { default: App } = await import(resolve(root, '.ssr/App.js'));
const pages = [
  { locale: 'en', file: 'dist/index.html', lang: 'en' },
  { locale: 'ja', file: 'dist/ja/index.html', lang: 'ja' }
];

for (const page of pages) {
  const file = resolve(root, page.file);
  const template = await readFile(file, 'utf8');
  const { body, head } = render(App, { props: { initialLocale: page.locale } });
  const html = template
    .replace(/<html lang="[^"]+">/, `<html lang="${page.lang}">`)
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', body);
  await mkdir(resolve(file, '..'), { recursive: true });
  await writeFile(file, html);
}
