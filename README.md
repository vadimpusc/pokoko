# POKOKOKO

Premium bilingual website for POKOKOKO, built with Svelte and Vite.

## Development

```bash
npm install
npm run dev
```

## Production

```bash
npm run check
npm run build
npm run preview
```

The production build prerenders both `/` (English) and `/ja/` (Japanese) for search engines.

## Landing mode

Build a completely separate landing page for your public domain while keeping the full site on localhost:

```bash
npm run build:landing   # outputs dist/index.html (standalone landing page)
npm run preview         # preview locally
```

The landing page is a fully standalone HTML page (`welcome.html` → `src/Welcome.svelte` → `src/welcome.js`). It has no connection to the main site — deploy `dist/` from this build to your domain. Use `npm run build` for local development.

## Updating content

All editable website copy lives in `src/lib/content.js`. English and Japanese fields use the same structure, making translation gaps easy to spot. Keep the keys identical in both language objects.

Before launch, update:

- Instagram URL and map URL in `src/lib/content.js`
- Weekly locations and menu items in `src/lib/content.js`
- Welcome page copy in `src/Welcome.svelte`
- Production domain in `public/robots.txt`, `public/sitemap.xml`, and canonical URLs if the final domain is not `pokokoko.jp`
- Newsletter form handler with your email platform endpoint
