/**
 * Central brand, hero copy and contact settings.
 * Change these values to update the whole website in one place.
 */
const heroTitle: [string, string] = ["Hacked by us.", "Not by them."];

export const siteConfig = {
  name: "0DAY Security",
  /** Big two-line hero headline. The last word of line two is highlighted in purple. */
  heroTitle,
  slogan: heroTitle.join(" "),
  /** Supporting line under the hero headline. */
  heroLead:
    "We break in the way real attackers would — with your permission. Then we help you fix every finding and prove your security to auditors, regulators and customers.",
  /** Short credibility points shown under the hero buttons. */
  proofPoints: ["Hall of Fame recognitions", "CVE credits", "Manually validated findings"],
  /** Phrases typed out above the headline. The first one is shown when the page loads. */
  heroPhrases: [
    "Offensive security services",
    "VAPT & penetration testing",
    "Red team operations",
    "Application & cloud security",
    "ISO 27001 · SOC 2 · DPDP",
    "Government & regulatory audits",
    "Virtual CISO advisory",
  ],
  /** Footer tagline — each item is shown on its own line. */
  tagline: ["Real attacks.", "Real findings.", "Real security."],
  description:
    "0DAY Security: VAPT, red teaming, application & cloud security, GRC & compliance, government & regulatory security audits, security awareness training and virtual CISO advisory.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://0daysecurity.tech").replace(/\/+$/, ""),
  phone: { display: "+91 73094 35990", href: "tel:+917309435990" },
  email: "anmol@0daysecurity.tech",
  emailSubject: "0DAY Security Quote Request",
  referencePrefix: "0DAY",
  terminalHost: "0day",
};

export function quoteReference(id: string) {
  return `${siteConfig.referencePrefix}-${id.slice(0, 8).toUpperCase()}`;
}
