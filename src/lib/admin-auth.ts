import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_COOKIE = "d0_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES_PER_CLIENT = 5;
const MAX_FAILURES_GLOBAL = 100;

type FailureStore = { clients: Map<string, number[]>; global: number[] };
const globalStore = globalThis as typeof globalThis & { __d0AdminFailures?: FailureStore };
const failures: FailureStore = (globalStore.__d0AdminFailures ??= {
  clients: new Map<string, number[]>(),
  global: [],
});

export function isAdminConfigured() {
  return (process.env.ADMIN_PASSWORD ?? "").length >= 8;
}

function signingKey() {
  return createHash("sha256")
    .update(`d0-admin-session:${process.env.ADMIN_SESSION_SECRET ?? ""}:${process.env.ADMIN_PASSWORD ?? ""}`)
    .digest();
}

function sign(payload: string) {
  return createHmac("sha256", signingKey()).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function passwordMatches(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !isAdminConfigured()) return false;
  const given = createHash("sha256").update(input).digest();
  const wanted = createHash("sha256").update(expected).digest();
  return timingSafeEqual(given, wanted);
}

function createSessionToken() {
  const expires = Date.now() + SESSION_TTL_SECONDS * 1000;
  const payload = `${expires}.${randomBytes(16).toString("base64url")}`;
  return `${payload}.${sign(payload)}`;
}

function isValidSessionToken(token: string | undefined) {
  if (!token || !isAdminConfigured()) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [expires, nonce, signature] = parts;
  if (!safeEqual(signature, sign(`${expires}.${nonce}`))) return false;
  return Number(expires) > Date.now();
}

async function cookieSettings() {
  const requestHeaders = await headers();
  const isHttps = requestHeaders.get("x-forwarded-proto")?.split(",")[0]?.trim() === "https";
  // Partitioned + SameSite=None keeps the session working when the preview is embedded.
  return isHttps
    ? ({ httpOnly: true, secure: true, sameSite: "none", partitioned: true, path: "/admin" } as const)
    : ({ httpOnly: true, secure: false, sameSite: "lax", path: "/admin" } as const);
}

export async function startAdminSession() {
  const store = await cookies();
  store.set(ADMIN_COOKIE, createSessionToken(), { ...(await cookieSettings()), maxAge: SESSION_TTL_SECONDS });
}

export async function endAdminSession() {
  const store = await cookies();
  store.set(ADMIN_COOKIE, "", { ...(await cookieSettings()), maxAge: 0 });
}

export async function hasAdminSession() {
  const store = await cookies();
  return isValidSessionToken(store.get(ADMIN_COOKIE)?.value);
}

export async function requireAdmin() {
  if (!(await hasAdminSession())) redirect("/admin/login");
}

export async function getClientKey() {
  const requestHeaders = await headers();
  return (
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "unknown"
  );
}

function recent(list: number[], now: number) {
  return list.filter((time) => now - time < RATE_WINDOW_MS);
}

export function isLoginRateLimited(client: string) {
  const now = Date.now();
  failures.global = recent(failures.global, now);
  const clientFailures = recent(failures.clients.get(client) ?? [], now);
  failures.clients.set(client, clientFailures);
  return clientFailures.length >= MAX_FAILURES_PER_CLIENT || failures.global.length >= MAX_FAILURES_GLOBAL;
}

export function recordLoginFailure(client: string) {
  const now = Date.now();
  if (failures.clients.size > 5000) failures.clients.clear();
  failures.global.push(now);
  failures.clients.set(client, [...recent(failures.clients.get(client) ?? [], now), now]);
}

export function clearLoginFailures(client: string) {
  failures.clients.delete(client);
}
