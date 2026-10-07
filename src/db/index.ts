import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { resolveDatabaseConnection } from "./connection";

/*
 * The database connects lazily, on first use. Builds therefore never fail because DATABASE_URL is missing,
 * and a missing or wrong value produces a clear error at runtime instead (see /admin/status).
 */

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

function createPool() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
  }
  const { connectionString, ssl } = resolveDatabaseConnection(databaseUrl);
  const pool = new Pool({
    connectionString,
    ssl,
    // A small pool per server instance: serverless platforms run many instances, and Supabase's pooler multiplexes them.
    max: Number(process.env.DATABASE_POOL_MAX) || 5,
    idleTimeoutMillis: 10_000,
    // Fail fast with a clear error instead of hanging until the request times out.
    connectionTimeoutMillis: 10_000,
  });
  // Idle connections can be dropped by the server or pooler. Without a listener, that error would crash the process.
  pool.on("error", (error) => {
    console.error("Database connection error:", error.message);
  });
  return pool;
}

export function getPool(): Pool {
  globalForDb.__arenaNextJsPostgresqlPool ??= createPool();
  return globalForDb.__arenaNextJsPostgresqlPool;
}

function createDb() {
  return drizzle(getPool());
}

type Database = ReturnType<typeof createDb>;
let instance: Database | undefined;

export function getDb(): Database {
  instance ??= createDb();
  return instance;
}

/** Drizzle client. Connects on first use. */
export const db: Database = new Proxy({} as Database, {
  get(_target, property) {
    const target = getDb();
    const value = Reflect.get(target, property, target);
    return typeof value === "function" ? value.bind(target) : value;
  },
});
