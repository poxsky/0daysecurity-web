import { sql } from "drizzle-orm";
import { getDb } from "@/db";
import { tryResolveDatabaseConnection, type DatabaseConnection } from "@/db/connection";
import { describeDatabaseError } from "@/db/errors";
import { siteConfig } from "@/lib/site-config";

export type CheckStatus = "ok" | "warn" | "error" | "info";
export type Check = { label: string; status: CheckStatus; detail: string; fix?: string; code?: string };
export type CheckGroup = { title: string; checks: Check[] };

const REQUIRED_COLUMNS = ["id", "name", "email", "company", "service", "message", "status", "notes", "created_at", "updated_at"];
const PUSH_FIX =
  "Set DATABASE_URL in `.env.local` to your production connection string, then run `npx drizzle-kit push` from the project folder.";

function withTimeout<T>(promise: Promise<T>, ms = 12_000): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(Object.assign(new Error(`Query timed out after ${ms / 1000} seconds`), { code: "ETIMEDOUT" }));
    }, ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error: unknown) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

async function query(statement: ReturnType<typeof sql>) {
  const result = await withTimeout(getDb().execute(statement));
  return result.rows as Record<string, unknown>[];
}

function failure(label: string, error: unknown, connection?: DatabaseConnection): Check {
  const problem = describeDatabaseError(error, connection);
  return { label, status: "error", detail: problem.title, fix: problem.fix, code: problem.code };
}

function serverCheck(connection: DatabaseConnection): Check {
  const onVercel = Boolean(process.env.VERCEL);
  const label = "Database server";
  switch (connection.provider) {
    case "local":
      return onVercel
        ? {
            label,
            status: "error",
            detail: `DATABASE_URL points to ${connection.host}, which doesn't exist on Vercel.`,
            fix: "Set DATABASE_URL to your Supabase connection string (Supabase → Connect → Transaction pooler), then redeploy.",
          }
        : { label, status: "ok", detail: `Local database (${connection.host}:${connection.port}).` };
    case "supabase-direct":
      return {
        label,
        status: onVercel ? "error" : "warn",
        detail: "Supabase direct connection (db.<project>.supabase.co). It only works over IPv6, which Vercel doesn't support.",
        fix: "Use the pooler connection string instead: Supabase → Connect → Transaction pooler (port 6543).",
      };
    case "supabase-pooler":
      return connection.port === 6543
        ? { label, status: "ok", detail: "Supabase transaction pooler (port 6543) — the right choice for Vercel." }
        : {
            label,
            status: onVercel ? "warn" : "ok",
            detail: `Supabase session pooler (port ${connection.port}). It works, but allows only a few connections at a time.`,
            fix: onVercel ? "Switch DATABASE_URL to the transaction pooler (port 6543), which is built for serverless traffic." : undefined,
          };
    default:
      return { label, status: "ok", detail: `${connection.host}:${connection.port}.` };
  }
}

function encryptionCheck(connection: DatabaseConnection): Check {
  const label = "Encryption";
  if (connection.sslMode === "verified") return { label, status: "ok", detail: "SSL with full certificate verification." };
  if (connection.sslMode === "encrypted") {
    return {
      label,
      status: "warn",
      detail: "Encrypted with SSL, but the database's certificate isn't verified.",
      fix: connection.provider.startsWith("supabase")
        ? "For full verification, download the certificate from Supabase → Database Settings → SSL Configuration and add its contents as DATABASE_CA_CERT in Vercel, then redeploy."
        : "Add your database provider's CA certificate as DATABASE_CA_CERT for full verification.",
    };
  }
  if (connection.provider === "local") return { label, status: "ok", detail: "Local database — SSL isn't needed." };
  return {
    label,
    status: "warn",
    detail: "SSL is turned off, so data travels to the database unencrypted.",
    fix: "Remove DATABASE_SSL=disable (and sslmode=disable from DATABASE_URL) unless your database really doesn't support SSL.",
  };
}

async function databaseChecks(): Promise<Check[]> {
  if (!process.env.DATABASE_URL) {
    return [
      {
        label: "Connection",
        status: "error",
        detail: "DATABASE_URL isn't set.",
        fix: "Add DATABASE_URL in Vercel → Settings → Environment Variables (Production), then redeploy with `vercel --prod`.",
      },
    ];
  }
  const connection = tryResolveDatabaseConnection();
  if (!connection) {
    return [failure("Connection", new Error("DATABASE_URL is not a valid connection string"))];
  }

  const checks: Check[] = [serverCheck(connection), encryptionCheck(connection)];
  const supabase = connection.provider.startsWith("supabase");

  const started = Date.now();
  try {
    const [row] = await query(sql`select current_setting('server_version') as version`);
    const version = String(row?.version ?? "").split(" ")[0];
    checks.push({
      label: "Connection",
      status: "ok",
      detail: `Connected in ${Date.now() - started} ms${version ? ` · PostgreSQL ${version}` : ""}.`,
    });
  } catch (error) {
    checks.push(failure("Connection", error, connection));
    return checks;
  }

  try {
    const tables = (await query(sql`
      select c.relname as name, c.relrowsecurity as rls, c.relforcerowsecurity as force_rls,
             pg_get_userbyid(c.relowner) as owner
      from pg_class c
      join pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'public' and c.relkind in ('r', 'p')
      order by c.relname
    `)) as { name: string; rls: boolean; force_rls: boolean; owner: string }[];
    const leads = tables.find((table) => table.name === "quote_requests");

    if (!leads) {
      checks.push({
        label: "Leads table",
        status: "error",
        detail: "The quote_requests table doesn't exist, so the quote form can't save enquiries.",
        fix: PUSH_FIX,
      });
    } else {
      const columns = await query(sql`
        select column_name from information_schema.columns
        where table_schema = 'public' and table_name = 'quote_requests'
      `);
      const present = new Set(columns.map((column) => String(column.column_name)));
      const missing = REQUIRED_COLUMNS.filter((column) => !present.has(column));
      if (missing.length > 0) {
        checks.push({
          label: "Leads table",
          status: "error",
          detail: `The quote_requests table is out of date (missing: ${missing.join(", ")}).`,
          fix: PUSH_FIX,
        });
      } else {
        const [row] = await query(sql`select count(*)::int as total from public.quote_requests`);
        const total = Number(row?.total ?? 0);
        checks.push({
          label: "Leads table",
          status: "ok",
          detail: `Ready — ${total} ${total === 1 ? "enquiry" : "enquiries"} stored.`,
        });
      }

      const [user] = (await query(sql`
        select current_user as name, r.rolsuper as superuser, r.rolbypassrls as bypass
        from pg_roles r where r.rolname = current_user
      `)) as { name: string; superuser: boolean; bypass: boolean }[];
      const exempt = Boolean(user && (user.name === leads.owner || user.superuser || user.bypass));

      if (!leads.rls) {
        checks.push({
          label: "Row Level Security",
          status: supabase ? "error" : "info",
          detail: supabase
            ? "Off for quote_requests — anyone with your project's public anon key can read and change customer enquiries through Supabase's Data API."
            : "Off for quote_requests. This matters if the database is exposed through an API (for example Supabase's).",
          fix: "Run `npx drizzle-kit push` (the schema turns it on), or run this in Supabase → SQL Editor: `alter table public.quote_requests enable row level security;`",
        });
      } else if (leads.force_rls && !user?.superuser && !user?.bypass) {
        checks.push({
          label: "Row Level Security",
          status: "error",
          detail: "FORCE ROW LEVEL SECURITY is on, which blocks the website itself from reading and saving leads.",
          fix: "Run in Supabase → SQL Editor: `alter table public.quote_requests no force row level security;`",
        });
      } else if (!exempt) {
        checks.push({
          label: "Row Level Security",
          status: "error",
          detail: `On, but the website's database user (${user?.name ?? "unknown"}) isn't the table owner (${leads.owner}), so it can't read or save leads.`,
          fix: "Connect as the table owner — the postgres user in Supabase's connection string.",
        });
      } else {
        checks.push({
          label: "Row Level Security",
          status: "ok",
          detail: "On — the public Data API can't touch enquiries, and the website still works because it connects as the table owner.",
        });
      }
    }

    if (supabase) {
      const exposed = tables.filter((table) => !table.rls && table.name !== "quote_requests").map((table) => table.name);
      checks.push(
        exposed.length > 0
          ? {
              label: "Other tables",
              status: "error",
              detail: `These tables can be read and changed with your public anon key: ${exposed.join(", ")}.`,
              fix: `Turn on RLS for each one (for example \`alter table public.${exposed[0]} enable row level security;\`), or delete tables you no longer need. Deleting a table permanently removes its data.`,
            }
          : { label: "Other tables", status: "ok", detail: "Every table in the public schema has Row Level Security on." },
      );
    }
  } catch (error) {
    checks.push(failure("Tables", error, connection));
  }

  return checks;
}

function securityChecks(): Check[] {
  const checks: Check[] = [];

  const password = process.env.ADMIN_PASSWORD ?? "";
  if (password === "change-me-to-a-strong-password") {
    checks.push({
      label: "Admin password",
      status: "error",
      detail: "ADMIN_PASSWORD is still the example value from .env.example.",
      fix: "Set a long, unique password in Vercel → Settings → Environment Variables, then redeploy.",
    });
  } else if (password.length >= 14) {
    checks.push({ label: "Admin password", status: "ok", detail: `Set (${password.length} characters).` });
  } else {
    checks.push({
      label: "Admin password",
      status: "warn",
      detail: `ADMIN_PASSWORD is only ${password.length} characters long.`,
      fix: "Use at least 14 characters — a password manager can generate one. Update it in Vercel, then redeploy.",
    });
  }

  const secret = process.env.ADMIN_SESSION_SECRET ?? "";
  checks.push(
    secret.length >= 32
      ? { label: "Session signing", status: "ok", detail: "Admin sessions are signed with ADMIN_SESSION_SECRET." }
      : {
          label: "Session signing",
          status: "warn",
          detail: secret
            ? "ADMIN_SESSION_SECRET is shorter than 32 characters."
            : "ADMIN_SESSION_SECRET isn't set, so sessions are signed with a key based on your admin password alone.",
          fix: "Generate one with `openssl rand -base64 32`, add it as ADMIN_SESSION_SECRET in Vercel and redeploy. You'll need to sign in again.",
        },
  );

  const supabaseKeys = Object.keys(process.env)
    .filter((name) => /supabase/i.test(name) && /(key|secret|token|jwt)/i.test(name))
    .sort();
  checks.push(
    supabaseKeys.length > 0
      ? {
          label: "Supabase API keys",
          status: "warn",
          detail: `This site doesn't use Supabase API keys, but these are set: ${supabaseKeys.join(", ")}.`,
          fix: "Remove them in Vercel → Settings → Environment Variables. If a key was ever shared (for example in a chat), revoke it in Supabase → Project Settings → API Keys.",
        }
      : { label: "Supabase API keys", status: "ok", detail: "No unnecessary Supabase API keys in the environment." },
  );

  const resendKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.QUOTE_NOTIFY_EMAIL;
  if (resendKey && notifyEmail) {
    checks.push(
      process.env.QUOTE_FROM_EMAIL
        ? { label: "Email alerts", status: "ok", detail: `New enquiries are emailed to ${notifyEmail}.` }
        : {
            label: "Email alerts",
            status: "warn",
            detail: "Alerts use Resend's test sender, which only delivers to your own Resend account's email address.",
            fix: "Verify your domain in Resend, then set QUOTE_FROM_EMAIL (for example `0DAY Security <alerts@0daysecurity.tech>`).",
          },
    );
  } else if (resendKey || notifyEmail) {
    checks.push({
      label: "Email alerts",
      status: "warn",
      detail: "Email alerts are only half set up.",
      fix: "Set both RESEND_API_KEY and QUOTE_NOTIFY_EMAIL in Vercel, then redeploy.",
    });
  } else {
    checks.push({
      label: "Email alerts",
      status: "info",
      detail: "Off (optional). New enquiries still appear on the leads dashboard.",
    });
  }

  return checks;
}

async function deploymentChecks(requestHost: string | null): Promise<Check[]> {
  const checks: Check[] = [];

  if (process.env.VERCEL) {
    const environment = process.env.VERCEL_ENV ?? "unknown";
    const region = process.env.VERCEL_REGION;
    checks.push({
      label: "Deployment",
      status: environment === "production" ? "ok" : "info",
      detail: `Vercel ${environment} deployment${region ? ` · region ${region}` : ""}.`,
    });
    const sha = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7);
    const message = process.env.VERCEL_GIT_COMMIT_MESSAGE?.split("\n")[0]?.slice(0, 90);
    checks.push({
      label: "Deployed code",
      status: "info",
      detail: sha
        ? `Commit ${sha}${message ? ` — “${message}”` : ""}.`
        : "Deployed with the Vercel CLI (no Git commit attached).",
    });
  } else {
    checks.push({ label: "Deployment", status: "info", detail: `Not running on Vercel (${process.env.NODE_ENV ?? "unknown"} mode).` });
  }

  const site = new URL(siteConfig.url);
  try {
    const response = await fetch(`${site.origin}/api/health`, {
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(6_000),
    });
    checks.push(
      response.ok
        ? { label: "Site address", status: "ok", detail: `${site.host} is live and healthy.` }
        : {
            label: "Site address",
            status: "warn",
            detail: `${site.host} responded with HTTP ${response.status}.`,
            fix: response.status >= 500
              ? "The site's health check failed — fix the problems in the Database section, then redeploy."
              : `Check that ${site.host} is assigned to this project in Vercel → Settings → Domains.`,
          },
    );
  } catch {
    checks.push({
      label: "Site address",
      status: "warn",
      detail: `${site.host} isn't reachable yet, so sitemap links and social previews that use it won't work.`,
      fix: `Add ${site.host} and www.${site.host} in Vercel → Settings → Domains, then create the DNS records Vercel shows at your domain provider. It can take up to an hour to go live.`,
    });
  }

  if (requestHost && requestHost !== site.host) {
    checks.push({
      label: "Viewing address",
      status: "info",
      detail: `You're viewing this on ${requestHost}. Search engines and social previews use ${site.host} (NEXT_PUBLIC_SITE_URL).`,
    });
  }

  return checks;
}

export async function runSystemChecks(requestHost: string | null) {
  const [database, deployment] = await Promise.all([databaseChecks(), deploymentChecks(requestHost)]);
  const groups: CheckGroup[] = [
    { title: "Database", checks: database },
    { title: "Security", checks: securityChecks() },
    { title: "Deployment", checks: deployment },
  ];
  const counts: Record<CheckStatus, number> = { ok: 0, warn: 0, error: 0, info: 0 };
  for (const group of groups) for (const check of group.checks) counts[check.status] += 1;
  return { groups, counts };
}
