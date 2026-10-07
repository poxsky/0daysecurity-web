import type { ConnectionOptions } from "node:tls";

/*
 * Turns DATABASE_URL into safe node-postgres settings.
 *
 * - Local databases (localhost, Docker service names) connect without SSL.
 * - Remote databases such as Supabase always use SSL. Set DATABASE_CA_CERT to your provider's CA certificate to
 *   verify the server's identity as well; without it the connection is encrypted but the certificate isn't verified.
 * - DATABASE_SSL=disable turns SSL off, for remote databases that don't support it.
 *
 * sslmode and related URL parameters are removed: node-postgres treats sslmode=require as verify-full, which fails
 * against Supabase's own certificate authority ("self-signed certificate in certificate chain"), and URL parameters
 * would override the settings below.
 */

export type SslMode = "off" | "verified" | "encrypted";
export type DatabaseProvider = "local" | "supabase-pooler" | "supabase-direct" | "remote";

export type DatabaseConnection = {
  connectionString: string;
  ssl: false | ConnectionOptions;
  sslMode: SslMode;
  host: string;
  port: number;
  provider: DatabaseProvider;
};

const SSL_PARAMS = ["sslmode", "ssl", "sslcert", "sslkey", "sslrootcert", "sslpassword", "sslnegotiation", "uselibpqcompat"];

export function isLocalHost(host: string) {
  if (["localhost", "127.0.0.1", "::1", "0.0.0.0"].includes(host) || host.endsWith(".local")) return true;
  // Single-label names such as "db" or "postgres" are Docker / internal network service names.
  return !host.includes(".") && !host.includes(":");
}

function providerFor(host: string): DatabaseProvider {
  if (isLocalHost(host)) return "local";
  if (host.endsWith(".pooler.supabase.com")) return "supabase-pooler";
  if (/^db\.[a-z0-9-]+\.supabase\.co$/.test(host)) return "supabase-direct";
  return "remote";
}

export function resolveDatabaseConnection(
  rawUrl: string,
  env: Record<string, string | undefined> = process.env,
): DatabaseConnection {
  let url: URL;
  try {
    url = new URL(rawUrl.trim());
  } catch {
    throw new Error("DATABASE_URL is not a valid connection string");
  }
  if (!/^postgres(ql)?:$/.test(url.protocol)) throw new Error("DATABASE_URL must start with postgresql://");

  const sslmode = (url.searchParams.get("sslmode") ?? "").toLowerCase();
  for (const param of SSL_PARAMS) url.searchParams.delete(param);

  const host = url.hostname.replace(/^\[|\]$/g, "").toLowerCase();
  const port = Number(url.port || 5432);
  const provider = providerFor(host);
  const base = { connectionString: url.toString(), host, port, provider };

  const setting = (env.DATABASE_SSL ?? "").trim().toLowerCase();
  const disabled = ["disable", "false", "off", "0"].includes(setting) || sslmode === "disable";
  if (disabled || (provider === "local" && setting !== "require")) return { ...base, ssl: false, sslMode: "off" };

  // Certificates pasted into a single-line environment variable often arrive with literal "\n" sequences.
  const ca = env.DATABASE_CA_CERT?.replace(/\\n/g, "\n").trim();
  if (ca) return { ...base, ssl: { ca, rejectUnauthorized: true }, sslMode: "verified" };
  if (sslmode === "verify-full" || sslmode === "verify-ca") {
    return { ...base, ssl: { rejectUnauthorized: true }, sslMode: "verified" };
  }
  return { ...base, ssl: { rejectUnauthorized: false }, sslMode: "encrypted" };
}

/** Like resolveDatabaseConnection, but returns undefined instead of throwing. */
export function tryResolveDatabaseConnection(rawUrl = process.env.DATABASE_URL): DatabaseConnection | undefined {
  if (!rawUrl) return undefined;
  try {
    return resolveDatabaseConnection(rawUrl);
  } catch {
    return undefined;
  }
}
