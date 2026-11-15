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
  proofPoints: ["10+ Published CVEs (Root RCE)", "100+ Global Hall of Fames", "100% Manually Validated Findings"],
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
    "0DAY Security: Offensive security firm led by Anmol Singh Rajput. 10+ CVEs, 100+ Hall of Fame recognitions (Google, Webflow, YesWeHack), VAPT, Red Teaming, Cloud Security & CERT-In compliance audits.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://0daysecurity.tech").replace(/\/+$/, ""),
  phone: { display: "+91 73094 35990", href: "tel:+917309435990" },
  email: "anmol@0daysecurity.tech",
  emailSubject: "0DAY Security Quote Request",
  referencePrefix: "0DAY",
  terminalHost: "0day",
  founder: {
    name: "Anmol Singh Rajput",
    pronouns: "He/Him",
    role: "Founder & Principal Security Researcher",
    headline: "Cybersecurity Researcher | 10+ CVEs | 100+ HoF | THM Top 20 | Pwn.college Expert",
    bio: "Independent Security Researcher specializing in Web, API, and Application Security. Discovered multiple zero-days and critical authentication/RCE flaws across enterprise systems.",
    linkedin: "https://www.linkedin.com/in/anmol-singh-rajput/",
    email: "anmol@0daysecurity.tech",
    directEmail: "anmol.researcher@gmail.com",
    speaking: "Speaker at Hack The Box (HTB) Mumbai",
    achievements: [
      { label: "10+ Published CVEs", desc: "Including CVSS 10.0 Critical Root RCE" },
      { label: "100+ Hall of Fames", desc: "Google, Webflow, YesWeHack, Coopérative U" },
      { label: "THM Global Top 20", desc: "Top 0.01% among global ethical hackers" },
      { label: "Pwn.college Expert", desc: "Advanced binary exploitation & kernel security" },
      { label: "HTB Mumbai Speaker", desc: "Technical speaker on real-world vulnerability research" },
    ],
    expertise: [
      "Vulnerability Assessment & Penetration Testing (VAPT)",
      "Web & API Application Security",
      "Manual Source Code Review",
      "Authentication & Authorization Bypasses",
      "Business Logic Flaws & Exploit Development",
      "Red Team Operations & Attack Simulation",
    ],
  },
};

export function quoteReference(id: string) {
  return `${siteConfig.referencePrefix}-${id.slice(0, 8).toUpperCase()}`;
}
