import { serviceLabel } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

type NewQuote = {
  reference: string;
  name: string;
  email: string;
  company: string | null;
  service: string;
  message: string;
};

/**
 * Optional email alert for new quote requests.
 * Enabled when RESEND_API_KEY and QUOTE_NOTIFY_EMAIL are set.
 */
export async function notifyNewQuote(quote: NewQuote) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipients = (process.env.QUOTE_NOTIFY_EMAIL ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  if (!apiKey || recipients.length === 0) return;

  const text = [
    `New quote request ${quote.reference}`,
    "",
    `Name: ${quote.name}`,
    `Email: ${quote.email}`,
    `Organisation: ${quote.company ?? "—"}`,
    `Service: ${serviceLabel(quote.service)}`,
    "",
    quote.message,
    "",
    `Manage leads: ${siteConfig.url}/admin`,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.QUOTE_FROM_EMAIL || `${siteConfig.name} <onboarding@resend.dev>`,
        to: recipients,
        reply_to: quote.email,
        subject: `New quote request ${quote.reference} — ${serviceLabel(quote.service)}`,
        text,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) console.error(`Quote notification failed with status ${response.status}.`);
  } catch {
    console.error("Quote notification failed: the email service could not be reached.");
  }
}
