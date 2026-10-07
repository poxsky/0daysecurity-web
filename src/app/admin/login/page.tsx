import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { hasAdminSession, isAdminConfigured } from "@/lib/admin-auth";
import { siteConfig } from "@/lib/site-config";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: `Admin sign in — ${siteConfig.name}` };

export default async function AdminLoginPage() {
  if (await hasAdminSession()) redirect("/admin");
  const configured = isAdminConfigured();

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-5 py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#c000f0]/20 blur-[120px]"
      />
      <div className="relative w-full max-w-[420px]">
        <a href="/" className="font-logo text-2xl font-bold tracking-tight">
          {siteConfig.name}
        </a>
        <div className="mt-6 border border-white/10 bg-[#111012]/90 p-7 shadow-2xl sm:p-9">
          <p className="font-mono text-[11px] tracking-[0.18em] text-brand">RESTRICTED AREA</p>
          <h1 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight">Leads dashboard</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Sign in to view and manage quote requests from your website.
          </p>
          {configured ? (
            <LoginForm />
          ) : (
            <div role="status" className="mt-6 border-l-2 border-amber-300/80 bg-amber-300/5 p-4 text-sm leading-6 text-amber-100">
              Admin access isn’t set up yet. Add <code className="font-mono text-amber-50">ADMIN_PASSWORD</code> (at least
              8 characters) to your environment, then restart the app.
            </div>
          )}
        </div>
        <a href="/" className="mt-6 inline-block font-mono text-xs text-zinc-500 transition hover:text-white">
          ← Back to website
        </a>
      </div>
    </main>
  );
}
