export type CVEItem = {
  id: string;
  title: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
  cvss?: string;
  product: string;
  versions: string;
  type: string;
  description: string;
  status: "Patched" | "Coordinated Disclosure" | "Fixed";
  nvdUrl?: string;
};

export type HallOfFameItem = {
  name: string;
  platform?: string;
  hunter?: string;
  badge?: string;
  category: "Enterprise" | "Web3 / DeFi" | "SaaS / Platform" | "Retail / Industry";
};

export const cveList: CVEItem[] = [
  {
    id: "CVE-2026-24516",
    title: "DigitalOcean Droplet Agent — Critical Root Remote Code Execution (RCE)",
    severity: "CRITICAL",
    cvss: "10.0",
    product: "DigitalOcean Droplet Agent",
    versions: "≤ 1.3.2",
    type: "Remote Code Execution / Command Injection",
    description:
      "Critical command injection vulnerability in DigitalOcean Droplet Agent allowing unauthenticated attackers to execute arbitrary system commands with root privileges.",
    status: "Fixed",
    nvdUrl: "https://nvd.nist.gov/vuln/detail/CVE-2026-24516",
  },
  {
    id: "CVE-2026-38577",
    title: "Tenda HG21 — Hardcoded Administrative Credentials",
    severity: "HIGH",
    cvss: "8.8",
    product: "Tenda HG21 Router",
    versions: "V4.0.0-260302",
    type: "Authentication Bypass / Hardcoded Credentials",
    description:
      "Insecure hardcoded credentials in the Admin account allowing remote attackers to bypass authentication and gain root administrative access.",
    status: "Coordinated Disclosure",
    nvdUrl: "https://nvd.nist.gov/vuln/detail/CVE-2026-38577",
  },
  {
    id: "CVE-2026-117325",
    title: "FreeRDP — Denial of Service via Progressive Graphics Decoder",
    severity: "HIGH",
    cvss: "7.5",
    product: "FreeRDP",
    versions: "3.32.2 & 3.32.3-dev0",
    type: "Denial of Service / Memory Exhaustion",
    description:
      "Resource exhaustion flaw in the FreeRDP Progressive graphics decoder leading to denial of service through crafted remote desktop streams.",
    status: "Patched",
    nvdUrl: "https://nvd.nist.gov/vuln/detail/CVE-2026-117325",
  },
  {
    id: "CVE-2025-66961",
    title: "Cherry-Studio TrendRadar — Command Injection Code Execution",
    severity: "HIGH",
    cvss: "8.5",
    product: "Cherry-Studio TrendRadar",
    versions: "≤ 1.0.0",
    type: "Command Injection",
    description:
      "Code execution via command injection flaw in docker/manage.py allowing unauthorized attackers to execute arbitrary commands.",
    status: "Patched",
    nvdUrl: "https://nvd.nist.gov/vuln/detail/CVE-2025-66961",
  },
  {
    id: "CVE-2025-66962",
    title: "Moonshile ChineseWordSegmentation — Memory Exhaustion DoS",
    severity: "MEDIUM",
    cvss: "6.5",
    product: "Moonshile ChineseWordSegmentation",
    versions: "≤ 0.1.0",
    type: "Denial of Service / Input Validation",
    description:
      "Improper input validation causing excessive memory allocation and denial of service via specially crafted input strings.",
    status: "Patched",
    nvdUrl: "https://nvd.nist.gov/vuln/detail/CVE-2025-66962",
  },
  {
    id: "CVE-2026-89092",
    title: "0DAY Security Advisory — Responsible Vulnerability Disclosure",
    severity: "HIGH",
    cvss: "8.2",
    product: "Enterprise Software",
    versions: "Current",
    type: "Security Flaw",
    description:
      "Security vulnerability identified, reported and validated through responsible disclosure channels.",
    status: "Coordinated Disclosure",
    nvdUrl: "https://nvd.nist.gov/vuln/detail/CVE-2026-89092",
  },
];

export const hallOfFameList: HallOfFameItem[] = [
  {
    name: "Google (Vulnerability Reward Program)",
    platform: "Google Security Rewards",
    badge: "Hall of Fame Recognition",
    category: "Enterprise",
  },
  {
    name: "YesWeHack Global",
    platform: "Global Bug Bounty Leaderboard",
    hunter: "gearhead5598",
    badge: "Verified Hunter · Top Rank",
    category: "Enterprise",
  },
  {
    name: "Coopérative U - U TECHNO",
    platform: "YesWeHack Program",
    hunter: "gearhead5598",
    badge: "Medal of Recognition",
    category: "Retail / Industry",
  },
  {
    name: "Webflow",
    platform: "Bug Bounty & Responsible Disclosure",
    badge: "Hall of Fame",
    category: "SaaS / Platform",
  },
  {
    name: "Kaia Web",
    platform: "Responsible Disclosure",
    badge: "Security Acknowledgement",
    category: "Web3 / DeFi",
  },
  {
    name: "Superposition Finance Web",
    platform: "Security Research",
    badge: "Hall of Fame",
    category: "Web3 / DeFi",
  },
  {
    name: "U2Staking Web",
    platform: "Responsible Disclosure",
    badge: "Security Acknowledgement",
    category: "Web3 / DeFi",
  },
];
