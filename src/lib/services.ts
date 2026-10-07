import type { IconName } from "@/components/icons";

export type ServiceItem = { label: string; description: string; icon: IconName };

export type SecurityService = {
  /** Tab id and URL hash, e.g. /#grc */
  id: string;
  /** Value saved with quote requests */
  value: string;
  number: string;
  /** Service name shown in the services list */
  short: string;
  /** Compact label for small screens and the social share image */
  tag: string;
  /** Full name shown as the panel heading */
  name: string;
  /** One-line hook shown under the heading */
  tagline: string;
  summary: string;
  cta: string;
  items: ServiceItem[];
};

export const services: SecurityService[] = [
  {
    id: "vapt",
    value: "vapt",
    number: "01",
    short: "VAPT",
    tag: "VAPT",
    name: "Vulnerability Assessment & Penetration Testing (VAPT)",
    tagline: "Proof, not scanner noise.",
    summary:
      "Manual, attacker-grade testing of your networks, web and mobile apps, APIs and Wi-Fi. Every finding is manually validated, ranked by business risk and delivered with a clear fix.",
    cta: "Scope a VAPT engagement",
    items: [
      {
        label: "Network Infrastructure Security Testing",
        description: "Servers, firewalls and network devices tested for exploitable weaknesses.",
        icon: "network",
      },
      {
        label: "Web Application Penetration Testing",
        description: "In-depth manual testing for OWASP Top 10 and business-logic flaws.",
        icon: "browser",
      },
      {
        label: "API Security Testing",
        description: "APIs checked for broken authentication, data exposure and abuse.",
        icon: "apiHub",
      },
      {
        label: "Mobile Application Security Testing",
        description: "Android and iOS apps assessed, from on-device storage to backend APIs.",
        icon: "mobile",
      },
      {
        label: "Wireless Security Testing",
        description: "Wi-Fi networks tested for weak encryption, rogue access points and leaks.",
        icon: "wifi",
      },
      {
        label: "Comprehensive Vulnerability Assessment & Management",
        description: "Continuous scanning, prioritisation and tracking until every issue is closed.",
        icon: "radar",
      },
    ],
  },
  {
    id: "red-teaming",
    value: "red-teaming",
    number: "02",
    short: "Red Teaming",
    tag: "Red Teaming",
    name: "Red Teaming & Attack Simulation",
    tagline: "A real attack. Minus the damage.",
    summary:
      "A full-scale, objective-driven attack on your organisation — across people, processes and technology. Find out how far a real adversary would get, and how quickly your team would notice.",
    cta: "Plan a red team exercise",
    items: [
      {
        label: "Real-world Adversary Simulation",
        description: "Objective-driven attacks that mirror the tactics of real threat actors.",
        icon: "crosshair",
      },
      {
        label: "Attack Simulation & Threat Modeling",
        description: "Map your likely attack paths, then test the scenarios that matter most.",
        icon: "blueprint",
      },
      {
        label: "Compromise Assessment",
        description: "Hunt for signs that attackers are already inside your environment.",
        icon: "bugSearch",
      },
    ],
  },
  {
    id: "application-security",
    value: "application-security",
    number: "03",
    short: "Application & Cloud Security",
    tag: "AppSec & Cloud",
    name: "Application & Cloud Security",
    tagline: "Secure code. Hardened cloud.",
    summary:
      "We review your code, test your applications and audit your AWS, Azure and GCP environments — closing design flaws and misconfigurations while they’re still cheap to fix.",
    cta: "Secure your applications",
    items: [
      {
        label: "Application Security Testing",
        description: "Thorough testing of your applications across the development lifecycle.",
        icon: "shieldCheck",
      },
      {
        label: "Source Code Review (Manual + Automated)",
        description: "Expert manual review, backed by tooling, to catch flaws scanners miss.",
        icon: "code",
      },
      {
        label: "Secure Development Advisory",
        description: "Practical guidance that helps your team ship secure code by default.",
        icon: "lightbulb",
      },
      {
        label: "Cloud Security Assessments (AWS / Azure / GCP)",
        description: "Configuration and architecture reviews against industry benchmarks.",
        icon: "cloudLock",
      },
    ],
  },
  {
    id: "grc",
    value: "grc",
    number: "04",
    short: "GRC & Compliance",
    tag: "GRC",
    name: "Governance, Risk & Compliance (GRC)",
    tagline: "Audit-ready, not audit-anxious.",
    summary:
      "ISO 27001, SOC 2, DPDP and RBI, SEBI and IRDAI requirements — turned into a clear, practical program. We take you from the first gap assessment to certification readiness, and keep you there.",
    cta: "Get audit-ready",
    items: [
      {
        label: "ISO 27001 Readiness, Implementation & Audit Support",
        description: "Gap analysis, ISMS implementation and hands-on support through your audit.",
        icon: "award",
      },
      {
        label: "SOC 2 (Type 1 & Type 2) Readiness & Advisory",
        description: "The right controls and evidence in place for a confident SOC 2 audit.",
        icon: "clipboardCheck",
      },
      {
        label: "GDPR / DPDP Act (Data Protection) Compliance Advisory",
        description: "Privacy programs aligned with GDPR and India’s DPDP Act, 2023.",
        icon: "privacy",
      },
      {
        label: "Regulatory Compliance & Gap Assessment (RBI, SEBI, IRDAI etc.)",
        description: "Meet the cybersecurity requirements set by your sector’s regulators.",
        icon: "bank",
      },
      {
        label: "Risk Assessment & Risk Management Framework",
        description: "Identify, score and treat risks with a framework that grows with you.",
        icon: "gauge",
      },
      {
        label: "Third-Party / Vendor Risk Assessment",
        description: "Assess and monitor the security of the vendors you depend on.",
        icon: "link",
      },
      {
        label: "Policy, Procedure & Documentation Development",
        description: "Clear, audit-ready policies and procedures tailored to how you work.",
        icon: "document",
      },
      {
        label: "Internal Audit & Continuous Compliance Support",
        description: "Regular internal audits that keep you compliant all year round.",
        icon: "cycleCheck",
      },
    ],
  },
  {
    id: "government-audits",
    value: "government-audits",
    number: "05",
    short: "Government & Regulatory Security Audits",
    tag: "Gov Audits",
    name: "Government & Regulatory Security Audits",
    tagline: "Security that stands up to scrutiny.",
    summary:
      "Independent security audits for government departments, PSUs and regulated institutions — covering citizen-facing portals, mission-critical applications and the infrastructure behind them, with formal reports aligned to CERT-In guidelines and regulator expectations.",
    cta: "Discuss an audit",
    items: [
      {
        label: "Government Website & Portal Security Audits",
        description: "Security audits of government websites, citizen portals and e-governance applications.",
        icon: "browser",
      },
      {
        label: "Network & Infrastructure Security Audits",
        description: "In-depth audits of the networks, servers and data centres behind public services.",
        icon: "network",
      },
      {
        label: "CERT-In Guidelines & Directions Compliance",
        description: "Gap assessments against CERT-In directions and its security guidelines for government entities.",
        icon: "clipboardCheck",
      },
      {
        label: "Regulatory Audit Readiness (RBI, SEBI, IRDAI)",
        description: "Independent pre-audit assessments that prepare regulated entities for mandated cybersecurity audits.",
        icon: "bank",
      },
      {
        label: "Audit Reporting, Remediation & Closure",
        description: "Formal audit reports, remediation guidance and verification of every fix through to closure.",
        icon: "document",
      },
    ],
  },
  {
    id: "security-training",
    value: "security-training",
    number: "06",
    short: "Security Awareness & Training",
    tag: "Training",
    name: "Security Awareness & Training",
    tagline: "Make your team hard to fool.",
    summary:
      "Engaging training and realistic phishing simulations that change behaviour — not just tick a compliance box. Your people learn to spot and report attacks, and you get the numbers to prove it’s working.",
    cta: "Train your team",
    items: [
      {
        label: "Employee Security Awareness Training",
        description: "Engaging sessions that help every employee spot and stop threats.",
        icon: "users",
      },
      {
        label: "Phishing Simulation Campaigns",
        description: "Realistic phishing tests that measure and reduce risky clicks over time.",
        icon: "mailHook",
      },
      {
        label: "Corporate Cybersecurity Training Programs",
        description: "Role-based programs for technical teams, managers and leadership.",
        icon: "presentation",
      },
    ],
  },
  {
    id: "vciso",
    value: "vciso",
    number: "07",
    short: "Virtual CISO",
    tag: "vCISO",
    name: "Virtual CISO (vCISO) & Advisory",
    tagline: "A CISO’s judgement. Without the full-time cost.",
    summary:
      "Senior security leadership, sized to your needs. We set your strategy, build your roadmap, mature your security program and brief your board in plain business language.",
    cta: "Talk to a virtual CISO",
    items: [
      {
        label: "Ongoing Security Strategy & Roadmap",
        description: "A clear, prioritised roadmap aligned with your business goals.",
        icon: "route",
      },
      {
        label: "Security Program Development & Maturity Improvement",
        description: "Build and mature your security program, one measurable step at a time.",
        icon: "chartUp",
      },
      {
        label: "Board & Leadership Level Security Advisory",
        description: "Jargon-free security guidance for your board and leadership team.",
        icon: "briefcase",
      },
    ],
  },
];

/** Labels for service values used by earlier versions of the quote form. */
const legacyLabels: Record<string, string> = {
  "penetration-testing": "Penetration Testing",
  "cloud-security": "Cloud Security",
};

export const quoteServiceValues: readonly string[] = [...services.map((service) => service.value), "not-sure"];

export function serviceLabel(value: string) {
  if (value === "not-sure") return "Not sure yet";
  return services.find((service) => service.value === value)?.name ?? legacyLabels[value] ?? value;
}
