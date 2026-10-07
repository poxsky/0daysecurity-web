import { NextRequest, NextResponse, after } from "next/server";
import { and, count, eq, gte } from "drizzle-orm";
import { db } from "@/db";
import { quoteRequests } from "@/db/schema";
import { notifyNewQuote } from "@/lib/notify";
import { quoteServiceValues } from "@/lib/services";
import { quoteReference } from "@/lib/site-config";

export const runtime = "nodejs";

function badRequest(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      const allowedHosts = [
        request.nextUrl.host,
        request.headers.get("host"),
        request.headers.get("x-forwarded-host")?.split(",")[0]?.trim(),
      ];
      if (!allowedHosts.includes(new URL(origin).host)) {
        return badRequest("This request is not allowed.", 403);
      }
    } catch {
      return badRequest("This request is not allowed.", 403);
    }
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return badRequest("Please send the form as JSON.", 415);
  }
  if (Number(request.headers.get("content-length") || 0) > 16000) {
    return badRequest("Your message is too long.", 413);
  }

  let data: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 16000) return badRequest("Your message is too long.", 413);
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return badRequest("Please check your form and try again.");
    }
    data = parsed as Record<string, unknown>;
  } catch {
    return badRequest("Please check your form and try again.");
  }

  const field = (key: string) => (typeof data[key] === "string" ? data[key].trim() : "");
  const name = field("name");
  const email = field("email").toLowerCase();
  const company = field("company");
  const service = field("service");
  const message = field("message");

  if (field("website")) return badRequest("Your request could not be submitted.");
  if (name.length < 2 || name.length > 100) {
    return badRequest("Please enter your name (2–100 characters).");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return badRequest("Please enter a valid email address.");
  }
  if (company.length > 200) return badRequest("Your organisation name is too long.");
  if (!quoteServiceValues.some((value) => value === service)) {
    return badRequest("Please select a security service.");
  }
  if (message.length < 20 || message.length > 5000) {
    return badRequest("Please describe your project in 20–5,000 characters.");
  }

  try {
    const [recent] = await db
      .select({ total: count() })
      .from(quoteRequests)
      .where(
        and(
          eq(quoteRequests.email, email),
          gte(quoteRequests.createdAt, new Date(Date.now() - 10 * 60 * 1000)),
        ),
      );

    if (recent.total >= 3) {
      return NextResponse.json(
        { error: "You’ve sent a few requests recently. Please try again in 10 minutes." },
        { status: 429, headers: { "Retry-After": "600" } },
      );
    }

    const [saved] = await db
      .insert(quoteRequests)
      .values({ name, email, company: company || null, service, message })
      .returning({ id: quoteRequests.id });

    const reference = quoteReference(saved.id);
    after(() => notifyNewQuote({ reference, name, email, company: company || null, service, message }));

    return NextResponse.json(
      { success: true, reference },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Quote request could not be saved:", error instanceof Error ? error.message : "Database error");
    return badRequest("We couldn’t save your request. Please try again, or contact us directly using the details below.", 503);
  }
}
