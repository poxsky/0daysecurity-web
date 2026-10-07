import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Page not found — ${siteConfig.name}`,
};

export default function NotFound() {
  return (
    <main className="doc-shell relative grid min-h-screen place-items-center overflow-hidden bg-black px-5 py-16 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 -top-48 h-[560px] w-[560px] rounded-full bg-[#c000f0]/20 blur-[120px]"
      />
      <div className="relative w-full max-w-2xl">
        <Link href="/" className="font-logo text-2xl font-bold tracking-tight">
          {siteConfig.name}
        </Link>
        <p className="mt-14 font-mono text-sm text-brand">&gt; HTTP 404</p>
        <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-[1.02] tracking-tight sm:text-7xl">
          Nothing to
          <br />
          exploit here.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-8 text-zinc-400">
          The page you’re looking for doesn’t exist or has moved. Everything else is still locked down.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-[3px] border-2 border-[#c000f0] bg-[#c000f0]/15 px-6 py-3 font-mono text-sm uppercase tracking-wide transition hover:bg-[#c000f0]"
          >
            Back to home <span aria-hidden="true">↗</span>
          </Link>
          <Link
            href="/#services"
            className="border-b border-white/35 pb-1 font-mono text-sm text-zinc-300 transition hover:border-brand hover:text-brand"
          >
            Explore services
          </Link>
        </div>
      </div>
    </main>
  );
}
