"use client";

import Link from "next/link";

export default function AdminError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto grid min-h-screen max-w-xl place-items-center px-5 py-16">
      <div className="w-full border border-rose-300/30 bg-rose-400/[0.05] p-7">
        <p className="font-mono text-[11px] tracking-[0.18em] text-rose-200">SOMETHING WENT WRONG</p>
        <h1 className="mt-3 font-display text-2xl font-bold uppercase tracking-tight">That didn’t work</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-300">
          The dashboard hit an unexpected error. This is usually a database or configuration problem — the system check
          explains what’s wrong and how to fix it.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="bg-[#9f24c1] px-4 py-2 font-mono text-xs text-white transition hover:bg-[#b934de]"
          >
            Try again
          </button>
          <Link
            href="/admin/status"
            className="border border-white/15 px-4 py-2 font-mono text-xs text-zinc-200 transition hover:border-brand hover:text-white"
          >
            Open system check
          </Link>
        </div>
      </div>
    </main>
  );
}
