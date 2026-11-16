import type { Metadata } from "next";
import { ServicesClient } from "@/app/services/services-client";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cybersecurity Services & Advanced Security Research Directory | 0DAY Security",
  description:
    "Comprehensive directory of 36+ offensive security domains: VAPT, Red Teaming, Zero-Day Research, Exploit Development, Cloud-Native, OT/SCADA, and ISO 27001/SOC 2 GRC.",
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: "Offensive Security Services & Advanced Research | 0DAY Security",
    description:
      "Enterprise cybersecurity services and specialist research lab capabilities across 36+ domains. Manual, exploit-backed, zero scanner noise.",
    url: `${siteConfig.url}/services`,
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
