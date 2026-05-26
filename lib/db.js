import pg from "pg";

const { Pool } = pg;

let pool;
let schemaReady;

export function getPool() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }

  return pool;
}

export async function ensureContactSchema() {
  const activePool = getPool();

  if (!activePool) {
    return false;
  }

  if (!schemaReady) {
    schemaReady = activePool.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(90) NOT NULL,
        email VARCHAR(180) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
  }

  await schemaReady;
  return true;
}
