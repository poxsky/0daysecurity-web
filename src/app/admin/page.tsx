import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { hasAdminSession } from "@/lib/admin-auth";
import { getLeads, getLeadStats, LEADS_PAGE_SIZE, parseLeadFilters, type LeadFilters } from "@/lib/leads";
import { leadStatuses, leadStatusLabel } from "@/lib/lead-status";
import { serviceLabel, services } from "@/lib/services";
import { quoteReference, siteConfig } from "@/lib/site-config";
import { deleteLead, logoutAction, updateLeadNotes, updateLeadStatus } from "./actions";
import { DeleteLeadForm, StatusSelect, SubmitButton } from "./lead-controls";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: `Leads — ${siteConfig.name}` };

const statusTone: Record<string, string> = {
  new: "bg-brand/15 text-[#efb2ff] ring-brand/40",
  contacted: "bg-sky-400/10 text-sky-200 ring-sky-300/30",
  won: "bg-emerald-400/10 text-emerald-200 ring-emerald-300/30",
  lost: "bg-zinc-400/10 text-zinc-400 ring-zinc-400/25",
};

const inputClass =
  "mt-1.5 block w-full border border-white/15 bg-black px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-brand focus:ring-1 focus:ring-brand";

function relativeTime(date: Date) {
  const seconds = Math.round((date.getTime() - Date.now()) / 1000);
  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return formatter.format(Math.round(seconds / size), unit);
  }
  return "just now";
}

function filterHref(filters: LeadFilters, changes: Partial<LeadFilters>) {
  const next = { ...filters, ...changes };
  const params = new URLSearchParams();
  if (next.q) params.set("q", next.q);
  if (next.status !== "all") params.set("status", next.status);
  if (next.service !== "all") params.set("service", next.service);
  if (next.page > 1) params.set("page", String(next.page));
  const query = params.toString();
  return query ? `/admin?${query}` : "/admin";
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (!(await hasAdminSession())) redirect("/admin/login");

  const filters = parseLeadFilters(await searchParams);
  const [stats, { rows, total }] = await Promise.all([getLeadStats(), getLeads(filters)]);
  const totalPages = Math.max(1, Math.ceil(total / LEADS_PAGE_SIZE));
  const hasFilters = Boolean(filters.q) || filters.status !== "all" || filters.service !== "all";
  const exportHref = filterHref({ ...filters, page: 1 }, {}).replace(/^\/admin/, "/admin/export");
  const firstShown = total === 0 ? 0 : (filters.page - 1) * LEADS_PAGE_SIZE + 1;
  const lastShown = Math.min(filters.page * LEADS_PAGE_SIZE, total);
  const summaryCards = [
    { label: "All leads", value: stats.total, status: "all" as const },
    ...leadStatuses.map((status) => ({ label: status.label, value: stats.counts[status.value], status: status.value })),
  ];

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-white/10 bg-black/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4">
          <div className="flex min-w-0 items-baseline gap-3">
            <a href="/" className="truncate font-logo text-xl font-bold tracking-tight sm:text-2xl">
              {siteConfig.name}
            </a>
            <span className="hidden font-mono text-xs text-zinc-500 sm:inline">/ leads</span>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <a href="/" className="hidden font-mono text-xs text-zinc-400 transition hover:text-white md:inline">
              View site ↗
            </a>
            <a
              href={exportHref}
              className="border border-white/15 px-3 py-2 font-mono text-xs transition hover:border-brand hover:text-brand"
            >
              Export CSV
            </a>
            <form action={logoutAction}>
              <button type="submit" className="px-2 py-2 font-mono text-xs text-zinc-400 transition hover:text-white sm:px-3">
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-20 pt-10">
        <p className="font-mono text-[11px] tracking-[0.18em] text-brand">QUOTE REQUESTS</p>
        <h1 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">Leads dashboard</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
          Every quote form submission lands here. Update the status as you follow up and keep private notes for your team.
        </p>

        <section aria-label="Lead summary" className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {summaryCards.map((card) => {
            const active = filters.status === card.status;
            return (
              <Link
                key={card.label}
                href={filterHref(filters, { status: card.status, page: 1 })}
                aria-current={active ? "page" : undefined}
                className={`border p-4 transition ${
                  active ? "border-brand/70 bg-brand/[0.07]" : "border-white/10 bg-white/[0.02] hover:border-white/25"
                }`}
              >
                <span className="block font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500">{card.label}</span>
                <span className="mt-2 block font-display text-3xl font-semibold tabular-nums">{card.value}</span>
              </Link>
            );
          })}
          <div className="border border-white/10 bg-white/[0.02] p-4">
            <span className="block font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500">Last 7 days</span>
            <span className="mt-2 block font-display text-3xl font-semibold tabular-nums">{stats.recent}</span>
          </div>
        </section>

        <form
          method="get"
          action="/admin"
          role="search"
          className="mt-8 grid gap-3 border border-white/10 bg-[#0f0f10] p-4 md:grid-cols-[minmax(0,1fr)_170px_200px_auto] md:items-end"
        >
          <label className="block">
            <span className="font-mono text-[11px] text-zinc-400">Search</span>
            <input
              type="search"
              name="q"
              defaultValue={filters.q}
              maxLength={100}
              placeholder={`Name, email, company or ${siteConfig.referencePrefix}-reference`}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="font-mono text-[11px] text-zinc-400">Status</span>
            <select name="status" defaultValue={filters.status} className={inputClass}>
              <option value="all">All statuses</option>
              {leadStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="font-mono text-[11px] text-zinc-400">Service</span>
            <select name="service" defaultValue={filters.service} className={inputClass}>
              <option value="all">All services</option>
              {services.map((service) => (
                <option key={service.value} value={service.value}>
                  {service.name}
                </option>
              ))}
              <option value="not-sure">Not sure yet</option>
            </select>
          </label>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-[#9f24c1] px-5 py-2.5 font-mono text-xs text-white transition hover:bg-[#b934de] md:flex-none"
            >
              Apply
            </button>
            {hasFilters && (
              <Link
                href="/admin"
                className="border border-white/15 px-4 py-2.5 font-mono text-xs text-zinc-300 transition hover:border-white/40 hover:text-white"
              >
                Reset
              </Link>
            )}
          </div>
        </form>

        <p className="mt-6 font-mono text-xs text-zinc-500" aria-live="polite">
          {total === 0 ? "No leads found" : `Showing ${firstShown}–${lastShown} of ${total} ${total === 1 ? "lead" : "leads"}`}
        </p>

        {rows.length === 0 ? (
          <div className="mt-4 border border-dashed border-white/15 px-6 py-16 text-center">
            <p className="font-display text-xl font-medium">
              {hasFilters ? "No leads match these filters." : "No quote requests yet."}
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-400">
              {hasFilters
                ? "Try a different search, or reset the filters to see every lead."
                : "When someone submits the quote form on your website, their request will appear here."}
            </p>
            {hasFilters ? (
              <Link href="/admin" className="mt-6 inline-block font-mono text-xs text-brand hover:text-white">
                Reset filters
              </Link>
            ) : (
              <a href="/#contact" className="mt-6 inline-block font-mono text-xs text-brand hover:text-white">
                Open the website ↗
              </a>
            )}
          </div>
        ) : (
          <ul className="mt-4 space-y-3">
            {rows.map((lead) => {
              const reference = quoteReference(lead.id);
              const replyHref = `mailto:${encodeURIComponent(lead.email).replace(/%40/g, "@")}?subject=${encodeURIComponent(
                `Re: your quote request ${reference}`,
              )}`;
              return (
                <li key={lead.id} className="border border-white/10 bg-[#0f0f10] p-5 sm:p-6" data-lead-reference={reference}>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-zinc-500">
                        <span className={`rounded-full px-2.5 py-0.5 ring-1 ${statusTone[lead.status] ?? statusTone.lost}`}>
                          {leadStatusLabel(lead.status)}
                        </span>
                        <span className="text-zinc-300">{reference}</span>
                        <span aria-hidden="true">·</span>
                        <time dateTime={lead.createdAt.toISOString()} title={lead.createdAt.toUTCString()}>
                          {relativeTime(lead.createdAt)}
                        </time>
                      </div>
                      <h2 className="mt-3 break-words font-display text-lg font-medium leading-snug">
                        {lead.name}
                        {lead.company && <span className="text-zinc-500"> — {lead.company}</span>}
                      </h2>
                      <a
                        href={replyHref}
                        className="mt-1 inline-block break-all text-sm text-zinc-300 underline-offset-4 transition hover:text-brand hover:underline"
                      >
                        {lead.email}
                      </a>
                    </div>
                    <StatusSelect id={lead.id} status={lead.status} action={updateLeadStatus} />
                  </div>

                  <p className="mt-4 inline-block border border-white/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-zinc-300">
                    {serviceLabel(lead.service)}
                  </p>
                  <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-6 text-zinc-300">{lead.message}</p>

                  <div className="mt-5 grid gap-4 border-t border-white/10 pt-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
                    <form action={updateLeadNotes} className="grid gap-2">
                      <input type="hidden" name="id" value={lead.id} />
                      <label htmlFor={`notes-${lead.id}`} className="font-mono text-[11px] text-zinc-500">
                        Internal notes (only visible here)
                      </label>
                      <textarea
                        id={`notes-${lead.id}`}
                        name="notes"
                        defaultValue={lead.notes ?? ""}
                        rows={2}
                        maxLength={2000}
                        placeholder="e.g. Called on Monday — sending proposal Friday"
                        className="w-full resize-y border border-white/15 bg-black px-3 py-2 text-sm leading-6 text-white outline-none transition placeholder:text-zinc-600 focus:border-brand"
                      />
                      <div className="flex flex-wrap items-center gap-3">
                        <SubmitButton pendingLabel="Saving…">Save note</SubmitButton>
                        {lead.updatedAt.getTime() > lead.createdAt.getTime() && (
                          <span className="font-mono text-[11px] text-zinc-500">Updated {relativeTime(lead.updatedAt)}</span>
                        )}
                      </div>
                    </form>
                    <div className="flex flex-wrap items-center gap-2 md:justify-end">
                      <a
                        href={replyHref}
                        className="border border-white/15 px-3.5 py-2 font-mono text-xs text-zinc-200 transition hover:border-brand hover:text-white"
                      >
                        Reply by email ↗
                      </a>
                      <DeleteLeadForm id={lead.id} name={lead.name} action={deleteLead} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {totalPages > 1 && (
          <nav aria-label="Pagination" className="mt-6 flex items-center justify-between font-mono text-xs">
            {filters.page > 1 ? (
              <Link href={filterHref(filters, { page: filters.page - 1 })} className="text-zinc-300 hover:text-brand">
                ← Newer
              </Link>
            ) : (
              <span />
            )}
            <span className="text-zinc-500">
              Page {filters.page} of {totalPages}
            </span>
            {filters.page < totalPages ? (
              <Link href={filterHref(filters, { page: filters.page + 1 })} className="text-zinc-300 hover:text-brand">
                Older →
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </main>
    </>
  );
}
