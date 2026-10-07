import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { logoutAction } from "./actions";

type AdminHeaderProps = { section: "leads" | "status"; exportHref?: string };

export function AdminHeader({ section, exportHref }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-white/10 bg-black/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4">
        <div className="flex min-w-0 items-baseline gap-3">
          <a href="/" className="truncate font-logo text-xl font-bold tracking-tight sm:text-2xl">
            {siteConfig.name}
          </a>
          <span className="hidden font-mono text-xs text-zinc-500 sm:inline">
            / {section === "leads" ? "leads" : "system check"}
          </span>
        </div>
        <nav className="flex shrink-0 items-center gap-1.5 sm:gap-3" aria-label="Admin">
          <a href="/" className="hidden font-mono text-xs text-zinc-400 transition hover:text-white md:inline">
            View site ↗
          </a>
          {section === "leads" ? (
            <Link
              href="/admin/status"
              className="px-2 py-2 font-mono text-xs text-zinc-300 transition hover:text-brand sm:px-3"
            >
              <span className="sm:hidden">Status</span>
              <span className="hidden sm:inline">System check</span>
            </Link>
          ) : (
            <Link href="/admin" className="px-2 py-2 font-mono text-xs text-zinc-300 transition hover:text-brand sm:px-3">
              ← Leads
            </Link>
          )}
          {exportHref && (
            <a
              href={exportHref}
              className="border border-white/15 px-3 py-2 font-mono text-xs transition hover:border-brand hover:text-brand"
            >
              <span className="sm:hidden">CSV</span>
              <span className="hidden sm:inline">Export CSV</span>
            </a>
          )}
          <form action={logoutAction}>
            <button type="submit" className="px-2 py-2 font-mono text-xs text-zinc-400 transition hover:text-white sm:px-3">
              Log out
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
