import type { DatabaseConnection } from "./connection";

/** A database error explained in plain language, with the most likely fix. */
export type DatabaseProblem = { title: string; fix: string; code?: string };

const PUSH_FIX =
  "Set DATABASE_URL in `.env.local` to your production connection string, then run `npx drizzle-kit push` from the project folder.";
const POOLER_FIX =
  "Use the pooler connection string instead: Supabase → Connect → Transaction pooler (port 6543). The direct connection (db.<project>.supabase.co) only works over IPv6, which Vercel doesn't support.";
const NETWORK_CODES = ["ENOTFOUND", "EAI_AGAIN", "ENETUNREACH", "EHOSTUNREACH", "ETIMEDOUT", "ECONNRESET"];
const TLS_CODES = [
  "SELF_SIGNED_CERT_IN_CHAIN",
  "DEPTH_ZERO_SELF_SIGNED_CERT",
  "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
  "UNABLE_TO_GET_ISSUER_CERT_LOCALLY",
  "ERR_TLS_CERT_ALTNAME_INVALID",
  "CERT_HAS_EXPIRED",
];

/** Collects codes and messages from an error and everything it wraps (Drizzle wraps driver errors in `cause`). */
function inspect(error: unknown) {
  const codes: string[] = [];
  const messages: string[] = [];
  let hostname = "";
  const queue: unknown[] = [error];
  const seen = new Set<unknown>();
  while (queue.length > 0 && seen.size < 12) {
    const current = queue.shift();
    if (!current || typeof current !== "object" || seen.has(current)) continue;
    seen.add(current);
    const item = current as { code?: unknown; message?: unknown; hostname?: unknown; cause?: unknown; errors?: unknown };
    if (typeof item.code === "string" && !codes.includes(item.code)) codes.push(item.code);
    // Skip Drizzle's "Failed query: <sql> params: <values>" wrapper: its parameters can contain user text.
    if (typeof item.message === "string" && item.message && !item.message.startsWith("Failed query:")) {
      messages.push(item.message);
    }
    if (!hostname && typeof item.hostname === "string") hostname = item.hostname;
    if (item.cause) queue.push(item.cause);
    if (Array.isArray(item.errors)) queue.push(...item.errors);
  }
  if (typeof error === "string") messages.push(error);
  return { codes, messages, hostname };
}

export function describeDatabaseError(error: unknown, connection?: DatabaseConnection): DatabaseProblem {
  const { codes, messages, hostname } = inspect(error);
  const text = messages.join(" | ");
  const has = (...list: string[]) => list.some((code) => codes.includes(code));
  const says = (pattern: RegExp) => pattern.test(text);
  const code = codes.find((value) => /^[0-9A-Z]{5}$/.test(value)) ?? codes[0];
  const host = connection?.host ?? hostname;
  const problem = (title: string, fix: string): DatabaseProblem => ({ title, fix, code });

  if (says(/DATABASE_URL is required/)) {
    return problem(
      "DATABASE_URL isn't set.",
      "Add DATABASE_URL in Vercel → Settings → Environment Variables (Production), then redeploy with `vercel --prod`.",
    );
  }
  if (says(/not a valid connection string|must start with postgres/)) {
    return problem(
      "DATABASE_URL isn't a valid connection string.",
      "It should look like postgresql://user:password@host:6543/postgres. If your password contains symbols such as @ # / ? or %, URL-encode them (or reset the password to letters and numbers).",
    );
  }
  if (connection?.provider === "supabase-direct" && (has(...NETWORK_CODES) || says(/timeout|timed out/i))) {
    return problem("Vercel can't reach Supabase's direct connection.", POOLER_FIX);
  }
  if (has("ENOTFOUND", "EAI_AGAIN")) {
    return problem(
      `The database host${host ? ` (${host})` : ""} wasn't found.`,
      "Check the host name in DATABASE_URL. Copy the connection string again from Supabase → Connect → Transaction pooler.",
    );
  }
  if (has("ECONNREFUSED")) {
    if (connection?.provider === "local" && process.env.VERCEL) {
      return problem(
        "DATABASE_URL points to localhost, which doesn't exist on Vercel.",
        "Set DATABASE_URL in Vercel to your Supabase connection string (Supabase → Connect → Transaction pooler), then redeploy.",
      );
    }
    return problem(
      "The database refused the connection.",
      "Check the host and port in DATABASE_URL. Supabase's transaction pooler uses port 6543 and the session pooler uses 5432.",
    );
  }
  if (has("28P01") || says(/password authentication failed/i)) {
    return problem(
      "The database password is wrong.",
      "Copy the connection string from Supabase → Connect and replace [YOUR-PASSWORD] with your database password. You can reset it under Database Settings. URL-encode any symbols in the password.",
    );
  }
  if (says(/tenant or user not found/i)) {
    return problem(
      "Supabase's connection pooler doesn't recognise the username.",
      "Pooler usernames look like postgres.<project-ref>. Copy the full connection string from Supabase → Connect → Transaction pooler.",
    );
  }
  if (says(/circuit breaker/i)) {
    return problem(
      "Supabase is temporarily blocking connections after too many failed logins.",
      "Fix the password in DATABASE_URL, redeploy, then wait a few minutes.",
    );
  }
  if (has(...TLS_CODES) || says(/self[- ]signed certificate|unable to verify|certificate/i)) {
    return problem(
      "The database's SSL certificate couldn't be verified.",
      "If you set DATABASE_CA_CERT, make sure it contains your provider's CA certificate (Supabase → Database Settings → SSL Configuration → Download certificate). Remove DATABASE_CA_CERT to use an encrypted connection without certificate verification.",
    );
  }
  if (says(/does not support SSL/i)) {
    return problem(
      "This database server doesn't accept SSL connections.",
      "Add DATABASE_SSL=disable — only for databases that really don't support SSL.",
    );
  }
  if (has("53300") || says(/too many (connections|clients)|remaining connection slots|max client connections/i)) {
    return problem(
      "The database has run out of connections.",
      "Use Supabase's transaction pooler (port 6543), which is built for serverless traffic, or lower DATABASE_POOL_MAX.",
    );
  }
  if (has("ETIMEDOUT") || says(/timeout|timed out/i)) {
    return problem(
      "Connecting to the database timed out.",
      "Make sure the Supabase project is running — free projects pause after a week without activity (restore it from the Supabase dashboard). Also check the host, the port and any network restrictions (Database Settings → Network restrictions).",
    );
  }
  if (has("ENETUNREACH", "EHOSTUNREACH", "ECONNRESET")) {
    return problem(
      "The network connection to the database failed.",
      "Check the host in DATABASE_URL and any network restrictions on the database. On Supabase, use the pooler connection string.",
    );
  }
  if (has("3D000")) {
    return problem(
      "The database name in DATABASE_URL doesn't exist.",
      "Supabase's database is called postgres, so the connection string should end with /postgres.",
    );
  }
  if (has("42P01")) return problem("The leads table doesn't exist in this database yet.", PUSH_FIX);
  if (has("42703")) return problem("The database tables are out of date (a column is missing).", PUSH_FIX);
  if (has("42501") || says(/permission denied|row-level security policy/i)) {
    return problem(
      "The database user isn't allowed to use the leads table.",
      "Connect as the table owner (the postgres user in Supabase's connection string). If you ran FORCE ROW LEVEL SECURITY, undo it with `alter table public.quote_requests no force row level security;`.",
    );
  }
  if (has("57P01", "57P03") || says(/starting up|shutting down/i)) {
    return problem("The database is restarting.", "Wait a minute, then try again.");
  }
  if (has("28000") || says(/pg_hba\.conf/i)) {
    return problem(
      "The database rejected this connection.",
      "Check the database's network restrictions (Supabase → Database Settings → Network restrictions) and don't disable SSL.",
    );
  }

  const detail = (messages.at(-1) ?? "").replace(/\s+/g, " ").slice(0, 160);
  return problem(
    `Unexpected database error${detail ? `: ${detail}` : "."}`,
    "Check Vercel → your project → Logs for the full error.",
  );
}
