import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// The builder's live preview shows the site inside an iframe. Everywhere else (Vercel, self-hosting) the site
// refuses to be framed by other websites, which protects visitors from clickjacking.
const allowFraming = process.env.E2B_SANDBOX === "true";

// Vercel's toolbar on preview deployments (shown only to your team) loads from these origins.
const vercelPreview = process.env.VERCEL_ENV === "preview";
const toolbar = (sources: string) => (vercelPreview ? ` ${sources}` : "");

// Strict security headers — a security company's own site should lead by example.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${toolbar("https://vercel.live")}`,
  `style-src 'self' 'unsafe-inline'${toolbar("https://vercel.live")}`,
  `img-src 'self' data: blob:${toolbar("https://vercel.live https://vercel.com")}`,
  `font-src 'self' data:${toolbar("https://vercel.live https://assets.vercel.com")}`,
  `connect-src 'self'${isDev ? " ws: wss:" : ""}${toolbar("https://vercel.live wss://ws-us3.pusher.com")}`,
  `frame-src 'self'${toolbar("https://vercel.live")}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "manifest-src 'self'",
  ...(allowFraming ? [] : ["frame-ancestors 'none'"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ...(allowFraming ? [] : [{ key: "X-Frame-Options", value: "DENY" }]),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex" }] },
    ];
  },
  async rewrites() {
    return [{ source: "/.well-known/security.txt", destination: "/security.txt" }];
  },
};

export default nextConfig;
