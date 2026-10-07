import { and, count, desc, eq, gte, ilike, or, sql, type SQL } from "drizzle-orm";
import { db } from "@/db";
import { quoteRequests } from "@/db/schema";
import { isLeadStatus, leadStatuses, type LeadStatus } from "@/lib/lead-status";
import { quoteServiceValues } from "@/lib/services";

export const LEADS_PAGE_SIZE = 20;

export type Lead = typeof quoteRequests.$inferSelect;
export type LeadFilters = { q: string; status: LeadStatus | "all"; service: string; page: number };

type RawParams = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

export function parseLeadFilters(params: RawParams): LeadFilters {
  const status = firstValue(params.status);
  const service = firstValue(params.service);
  const page = Number.parseInt(firstValue(params.page), 10);
  return {
    q: firstValue(params.q).trim().slice(0, 100),
    status: isLeadStatus(status) ? status : "all",
    service: quoteServiceValues.some((value) => value === service) ? service : "all",
    page: Number.isFinite(page) ? Math.min(Math.max(page, 1), 10000) : 1,
  };
}

// Matches "0DAY-7E990ABC", older references such as "D0-7E990ABC", or just "7e990abc".
const referencePattern = /^(?:[a-z0-9]+-)?([0-9a-f]{8})$/i;

function whereFor(filters: LeadFilters): SQL | undefined {
  const conditions: SQL[] = [];
  if (filters.status !== "all") conditions.push(eq(quoteRequests.status, filters.status));
  if (filters.service !== "all") conditions.push(eq(quoteRequests.service, filters.service));
  if (filters.q) {
    const pattern = `%${filters.q.replace(/[\\%_]/g, "\\$&")}%`;
    const reference = filters.q.match(referencePattern);
    const match = or(
      ilike(quoteRequests.name, pattern),
      ilike(quoteRequests.email, pattern),
      ilike(quoteRequests.company, pattern),
      ilike(quoteRequests.message, pattern),
      reference ? sql`${quoteRequests.id}::text like ${`${reference[1].toLowerCase()}%`}` : undefined,
    );
    if (match) conditions.push(match);
  }
  return conditions.length ? and(...conditions) : undefined;
}

export async function getLeads(filters: LeadFilters) {
  const where = whereFor(filters);
  const [[{ total }], rows] = await Promise.all([
    db.select({ total: count() }).from(quoteRequests).where(where),
    db
      .select()
      .from(quoteRequests)
      .where(where)
      .orderBy(desc(quoteRequests.createdAt))
      .limit(LEADS_PAGE_SIZE)
      .offset((filters.page - 1) * LEADS_PAGE_SIZE),
  ]);
  return { rows, total };
}

export function getLeadsForExport(filters: LeadFilters) {
  return db.select().from(quoteRequests).where(whereFor(filters)).orderBy(desc(quoteRequests.createdAt)).limit(5000);
}

export async function getLeadStats() {
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [byStatus, [recent]] = await Promise.all([
    db.select({ status: quoteRequests.status, total: count() }).from(quoteRequests).groupBy(quoteRequests.status),
    db.select({ total: count() }).from(quoteRequests).where(gte(quoteRequests.createdAt, since)),
  ]);
  const counts = Object.fromEntries(leadStatuses.map((status) => [status.value, 0])) as Record<LeadStatus, number>;
  let total = 0;
  for (const row of byStatus) {
    total += row.total;
    if (isLeadStatus(row.status)) counts[row.status] = row.total;
  }
  return { total, recent: recent.total, counts };
}
