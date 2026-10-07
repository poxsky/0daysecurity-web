import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

// RFC 9116 security.txt, also served at /.well-known/security.txt via a rewrite.
export function GET() {
  const expires = new Date(Date.now() + 300 * 24 * 60 * 60 * 1000);
  expires.setUTCHours(0, 0, 0, 0);
  const body = [
    `Contact: mailto:${siteConfig.email}`,
    `Contact: ${siteConfig.phone.href}`,
    `Expires: ${expires.toISOString().replace(/\.\d{3}Z$/, "Z")}`,
    "Preferred-Languages: en",
    `Canonical: ${siteConfig.url}/.well-known/security.txt`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=86400" },
  });
}
