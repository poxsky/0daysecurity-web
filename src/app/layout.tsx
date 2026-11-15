import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { siteConfig } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import "./globals.css";

const poppins = localFont({
  src: [
    { path: "../../public/fonts/poppins-300.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/poppins-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/poppins-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/poppins-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});
const anonymousPro = localFont({
  src: [
    { path: "../../public/fonts/anonymous-pro-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/anonymous-pro-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-anonymous",
  display: "swap",
});
const robotoMono = localFont({
  src: [
    { path: "../../public/fonts/roboto-mono-200.woff2", weight: "200", style: "normal" },
    { path: "../../public/fonts/roboto-mono-400.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
});
const roboto = localFont({
  src: "../../public/fonts/roboto-400.woff2",
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "0DAY Security (Zero-Day) | Advanced VAPT, Red Teaming & Offensive Security",
  description:
    "0DAY Security is an offensive cybersecurity firm specializing in zero-day (0day) vulnerability research, VAPT, red teaming, and regulatory audits (ISO 27001, SOC 2, DPDP, CERT-In). Powered by credited CVE researchers and Hall of Fame hackers.",
  keywords: [
    "0day security",
    "zero-day security",
    "0day security testing",
    "zero-day protection",
    "cybersecurity company",
    "cyber security",
    "VAPT services",
    "penetration testing company",
    "red teaming",
    "offensive security",
    "vulnerability research",
    "CERT-In security audit",
    "cloud security assessment",
    "application security testing",
    "SOC 2 readiness",
    "ISO 27001 audit",
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "0DAY Security (Zero-Day) | Advanced VAPT & Offensive Security",
    description:
      "Manual attacker-grade testing, zero-day research, CVE credited findings, and full compliance readiness (ISO 27001, SOC 2, DPDP, CERT-In).",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "0DAY Security (Zero-Day) | Advanced VAPT & Offensive Security",
    description:
      "Offensive security testing, zero-day research, and compliance audits by verified CVE researchers and Hall of Fame hackers.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = { themeColor: "#0d0d0d", colorScheme: "dark" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${anonymousPro.variable} ${robotoMono.variable} ${roboto.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body>{children}</body>
    </html>
  );
}
