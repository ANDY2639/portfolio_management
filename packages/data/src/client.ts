import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { getEnv } from './env.js';
import * as schema from './schema/index.js';

function createDb() {
  const sql = neon(getEnv().DATABASE_URL);
  return drizzle(sql, { schema });
}

type Db = ReturnType<typeof createDb>;

let db: Db | undefined;

export function getDb(): Db {
  db ??= createDb();
  return db;
}
