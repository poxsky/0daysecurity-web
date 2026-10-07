import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { hasAdminSession } from "@/lib/admin-auth";
import { siteConfig } from "@/lib/site-config";
import { runSystemChecks, type CheckStatus } from "@/lib/system-check";
import { AdminHeader } from "../admin-header";
import { FixText } from "../fix-text";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: `System check — ${siteConfig.name}` };

const STATUS: Record<CheckStatus, { label: string; badge: string; dot: string }> = {
  error: { label: "Problem", badge: "bg-rose-400/10 text-rose-200 ring-rose-300/40", dot: "bg-rose-400" },
  warn: { label: "Warning", badge: "bg-amber-300/10 text-amber-100 ring-amber-300/40", dot: "bg-amber-300" },
  ok: { label: "OK", badge: "bg-emerald-400/10 text-emerald-200 ring-emerald-300/30", dot: "bg-emerald-400" },
  info: { label: "Info", badge: "bg-white/[0.04] text-zinc-300 ring-white/15", dot: "bg-zinc-400" },
};

export default async function SystemCheckPage() {
  if (!(await hasAdminSession())) redirect("/admin/login");

  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host")?.split(",")[0]?.trim() || requestHeaders.get("host");
  const { groups, counts } = await runSystemChecks(host);
  const checkedAt = new Date();

  const summary =
    counts.error > 0
      ? {
          box: "border-rose-300/30 bg-rose-400/[0.06]",
          title: `${counts.error} ${counts.error === 1 ? "problem needs" : "problems need"} attention`,
          detail: `${counts.warn} ${counts.warn === 1 ? "warning" : "warnings"} · ${counts.ok} checks passed. Fix the problems first.`,
        }
      : counts.warn > 0
        ? {
            box: "border-amber-300/30 bg-amber-300/[0.05]",
            title: "Everything works",
            detail: `${counts.warn} ${counts.warn === 1 ? "recommendation" : "recommendations"} to make it more secure · ${counts.ok} checks passed.`,
          }
        : {
            box: "border-emerald-300/30 bg-emerald-400/[0.06]",
            title: "All systems go",
            detail: `All ${counts.ok} checks passed.`,
          };

  return (
    <>
      <AdminHeader section="status" />
      <main className="mx-auto max-w-4xl px-5 pb-20 pt-10">
        <p className="font-mono text-[11px] tracking-[0.18em] text-brand">DEPLOYMENT HEALTH</p>
        <h1 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">System check</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
          Checks your database, security settings and deployment — and explains how to fix anything that’s wrong.
        </p>

        <div role="status" className={`mt-8 flex flex-wrap items-center justify-between gap-4 border p-5 ${summary.box}`}>
          <div>
            <p className="font-display text-lg font-semibold" data-testid="check-summary">{summary.title}</p>
            <p className="mt-1 text-sm text-zinc-400">{summary.detail}</p>
          </div>
          <Link
            href="/admin/status"
            className="border border-white/15 px-4 py-2 font-mono text-xs text-zinc-200 transition hover:border-brand hover:text-white"
          >
            Run checks again
          </Link>
        </div>

        {groups.map((group) => (
          <section key={group.title} className="mt-10" aria-label={group.title}>
            <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-500">{group.title}</h2>
            <ul className="mt-3 divide-y divide-white/10 border border-white/10 bg-[#0f0f10]">
              {group.checks.map((check, index) => {
                const style = STATUS[check.status];
                return (
                  <li key={`${group.title}-${index}`} className="p-5" data-check={check.label} data-status={check.status}>
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                      <h3 className="font-display text-base font-medium">{check.label}</h3>
                      <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 font-mono text-[11px] ring-1 ${style.badge}`}>
                        <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                        {style.label}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">
                      <FixText text={check.detail} />
                    </p>
                    {check.fix && (
                      <p className="mt-3 border-l-2 border-brand/60 pl-3 text-sm leading-6 text-zinc-400">
                        <span className="font-medium text-zinc-200">How to fix: </span>
                        <FixText text={check.fix} />
                      </p>
                    )}
                    {check.code && <p className="mt-2 font-mono text-[11px] text-zinc-500">Error code: {check.code}</p>}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        <p className="mt-8 font-mono text-[11px] text-zinc-600" suppressHydrationWarning>
          Checked {checkedAt.toUTCString()}
        </p>
      </main>
    </>
  );
}
