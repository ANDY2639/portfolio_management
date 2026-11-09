// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import { loadEnv } from 'vite';
import { fileURLToPath } from 'node:url';

const webRoot = fileURLToPath(new URL('.', import.meta.url));
const env = loadEnv(process.env.NODE_ENV ?? 'development', webRoot, '');
process.env.DATABASE_URL ??= env.DATABASE_URL;

export default defineConfig({
  integrations: [preact()],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
