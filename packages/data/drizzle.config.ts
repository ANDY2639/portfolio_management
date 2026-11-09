import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config({ path: '../../apps/web/.env.local' });

const url = process.env.DATABASE_URL_UNPOOLED;

if (!url) {
  throw new Error('DATABASE_URL_UNPOOLED is required to run drizzle-kit');
}

export default defineConfig({
  schema: './src/schema/index.ts',
  out: '../../db/migrations',
  dialect: 'postgresql',
  dbCredentials: { url },
  verbose: true,
  strict: true,
});
