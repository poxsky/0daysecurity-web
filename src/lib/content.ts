import type { IconName } from "@/components/icons";

/* All homepage section copy lives here, so it can be edited in one place. */

export const about = {
  statement: ["We think like attackers.", "We report like auditors."],
  body: "0DAY Security was built by a team that hacks for a living. Our researchers have earned Hall of Fame recognitions and CVE credits through responsible disclosure, and we bring that same attacker mindset to every engagement. We work with startups, enterprises and regulated institutions — and now with government and public sector bodies — to uncover real risk, fix it fast and meet the standards they’re measured against: ISO 27001, SOC 2, DPDP, and RBI, SEBI and IRDAI mandates.",
};

export const servicesCopy = {
  /** Receives the number of services as a word, e.g. "Seven". */
  statement: (count: string) => [`${count} ways we make you`, "harder to hack."],
  intro:
    "From hands-on hacking to audit-ready compliance — choose one service, or combine them into a complete security program.",
};

export const processCopy = {
  statement: ["Four steps. Zero guesswork.", "From first call to verified fix."],
};

export const processSteps = [
  {
    number: "01",
    title: "Scope",
    description:
      "A free call to understand your business, your systems and what’s at stake. We agree on objectives, boundaries and rules of engagement in writing — before any work begins.",
  },
  {
    number: "02",
    title: "Attack & Assess",
    description:
      "Hands-on testing, code review or compliance gap analysis — depending on the engagement. Every finding is manually validated, so nothing reaches your report unverified.",
  },
  {
    number: "03",
    title: "Report",
    description:
      "A clear, prioritised report: an executive summary your leadership can act on, plus technical detail and step-by-step fixes your engineers can use right away.",
  },
  {
    number: "04",
    title: "Fix & Verify",
    description:
      "We support your team through remediation, retest every fix and stay with you through audits, renewals and whatever comes next.",
  },
];

export const whyUs: {
  statement: string[];
  points: { title: string; description: string; icon: IconName }[];
} = {
  statement: ["Proof over promises."],
  points: [
    {
      title: "Real hackers. Verified findings.",
      description:
        "Every engagement is led by hands-on offensive security specialists, and every finding is manually validated — never a raw scanner export.",
      icon: "crosshair",
    },
    {
      title: "A public track record",
      description:
        "Hall of Fame recognitions and CVE credits from responsible disclosure. Our research is on the public record, not just on our website.",
      icon: "award",
    },
    {
      title: "Offence and compliance, one team",
      description:
        "The people who find your gaps also get you audit-ready for ISO 27001, SOC 2, DPDP and sector regulators. No hand-offs, no lost context.",
      icon: "link",
    },
    {
      title: "Proven methodology",
      description:
        "OWASP and PTES for testing. ISO 27001 and SOC 2 for compliance. Repeatable results you can defend in front of auditors and your board.",
      icon: "clipboardCheck",
    },
    {
      title: "Reports leaders actually read",
      description:
        "Plain-language executive summaries, backed by the technical detail and step-by-step fixes your engineers need.",
      icon: "presentation",
    },
    {
      title: "Engagements that fit you",
      description:
        "A one-time assessment, an ongoing retainer or a long-term vCISO partnership. Scale up or down as your needs change.",
      icon: "route",
    },
  ],
};

export const finalCta: { title: [string, string]; body: string; button: string } = {
  title: ["Someone will test your defences.", "Make sure it’s us."],
  body: "Start with a free scoping call. You’ll know exactly what we’d test, how long it would take and what it would cost — before you commit to anything.",
  button: "Get a free scoping call",
};

export const faqs = [
  {
    question: "What’s the difference between VAPT and red teaming?",
    answer:
      "VAPT aims to find and validate as many vulnerabilities as possible within a defined scope, such as a web application, an API or a network. Red teaming is objective-driven: we act like a real adversary to test how well your organisation detects, responds to and recovers from an attack.",
  },
  {
    question: "Will testing disrupt our systems?",
    answer:
      "Every engagement is planned with you in advance. We agree on scope, testing windows and any sensitive systems up front, and keep an open line of communication throughout, so testing stays safe and controlled.",
  },
  {
    question: "How long does an engagement take?",
    answer:
      "It depends on scope. A focused web application or API test usually takes a few days, a red team operation can run for several weeks, and compliance programs are delivered in clear phases. You’ll get a realistic timeline during scoping.",
  },
  {
    question: "Can you help us get ready for ISO 27001 or SOC 2?",
    answer:
      "Yes. We run the gap assessment, help you implement the right controls and policies, prepare your evidence and support you through the audit. The certificate or report itself is issued by an accredited certification body (ISO 27001) or an independent CPA firm (SOC 2) — our job is to make sure you walk in ready.",
  },
  {
    question: "Do you help with RBI, SEBI, IRDAI and DPDP Act compliance?",
    answer:
      "Yes. We map your current controls against the regulatory requirements that apply to you, identify the gaps and help you close them — with clear documentation to back it up.",
  },
  {
    question: "Do you work with government departments and PSUs?",
    answer:
      "Yes. We audit government websites, citizen portals, applications and infrastructure, and help departments and PSUs align with CERT-In guidelines. Share your audit requirements and we’ll scope an engagement that meets them.",
  },
  {
    question: "What is a virtual CISO, and do we need one?",
    answer:
      "A virtual CISO gives you senior security leadership without a full-time hire. If you need a security strategy, a roadmap and someone to brief your board — but aren’t ready to hire a CISO — a vCISO is a cost-effective fit.",
  },
  {
    question: "How do we get a quote?",
    answer:
      "Send us a few details through the quote form, or call or email us. Scoping is free, and we’ll come back with a proposal tailored to your environment.",
  },
];
