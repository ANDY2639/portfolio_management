// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';
import { fileURLToPath } from 'node:url';

const webRoot = fileURLToPath(new URL('.', import.meta.url));
const env = loadEnv(process.env.NODE_ENV ?? 'development', webRoot, '');
process.env.DATABASE_URL ??= env.DATABASE_URL;

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://portfolio-management.vercel.app',
  integrations: [
    preact(),
    sitemap({
      filter: (page) => !page.endsWith('/404'),
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
