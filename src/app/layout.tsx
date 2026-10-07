import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { siteConfig } from "@/lib/site-config";
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
  title: `${siteConfig.name} — Offensive Security Services`,
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.slogan}`,
    description:
      "Offensive security services: VAPT, red teaming, application & cloud security, GRC & compliance, government & regulatory audits, security training and virtual CISO advisory.",
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0d0d0d", colorScheme: "dark" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${anonymousPro.variable} ${robotoMono.variable} ${roboto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
