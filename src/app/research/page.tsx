import type { Metadata } from "next";
import Link from "next/link";
import { cveList, hallOfFameList } from "@/lib/research";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Security Research & CVE Advisories | 0DAY Security",
  description:
    "Zero-day research, coordinated CVE disclosures, and bug bounty Hall of Fame recognitions by 0DAY Security offensive security specialists.",
  alternates: {
    canonical: `${siteConfig.url}/research`,
  },
  openGraph: {
    title: "Security Research & CVE Advisories | 0DAY Security",
    description: "Published CVEs, root RCE disclosures, and global Bug Bounty Hall of Fame achievements.",
    url: `${siteConfig.url}/research`,
  },
};

export default function ResearchPage() {
  return (
    <div className="doc-shell" style={{ minHeight: "100vh", background: "#050505", color: "#fff", padding: "60px 24px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <header style={{ marginBottom: "50px", borderBottom: "1px solid #1a1a1a", paddingBottom: "30px" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#de5cff",
              fontSize: "13px",
              fontFamily: "var(--font-mono)",
              marginBottom: "24px",
            }}
          >
            ← Back to 0DAY Security
          </Link>
          <p style={{ color: "#de5cff", fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase" }}>
            OFFENSIVE RESEARCH PORTAL
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 42px)", fontWeight: 700, margin: "12px 0 16px", fontFamily: "var(--font-poppins)" }}>
            Security Research & CVE Advisories
          </h1>
          <p style={{ color: "#a0a0a0", fontSize: "17px", lineHeight: "1.6", maxWidth: "780px" }}>
            0DAY Security believes offensive credibility is proven through real technical work.
            Below is our public track record of coordinated vulnerability disclosures, CVE credits,
            and enterprise Hall of Fame recognitions.
          </p>
        </header>

        {/* CVE List */}
        <section style={{ marginBottom: "70px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "28px", fontFamily: "var(--font-poppins)" }}>
            Published CVE Disclosures
          </h2>
          <div style={{ display: "grid", gap: "24px" }}>
            {cveList.map((cve) => (
              <article
                key={cve.id}
                style={{
                  background: "#0d0d0d",
                  border: "1px solid #1e1e1e",
                  borderRadius: "6px",
                  padding: "32px",
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "15px", fontWeight: 700, color: "#fff" }}>
                    {cve.id}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: "4px",
                      background: cve.severity === "CRITICAL" ? "rgba(222,92,255,0.18)" : "rgba(255,87,87,0.18)",
                      color: cve.severity === "CRITICAL" ? "#de5cff" : "#ff6b6b",
                      border: `1px solid ${cve.severity === "CRITICAL" ? "rgba(222,92,255,0.4)" : "rgba(255,87,87,0.4)"}`,
                    }}
                  >
                    {cve.cvss ? `CVSS ${cve.cvss} ` : ""}{cve.severity}
                  </span>
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px", fontFamily: "var(--font-poppins)" }}>
                  {cve.title}
                </h3>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "#888", marginBottom: "16px" }}>
                  Affected: <strong style={{ color: "#bbb" }}>{cve.product}</strong> ({cve.versions}) · Vulnerability: <strong style={{ color: "#bbb" }}>{cve.type}</strong>
                </p>
                <p style={{ color: "#b0b0b0", fontSize: "15px", lineHeight: "1.6", marginBottom: "20px" }}>
                  {cve.description}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #1a1a1a", paddingTop: "16px" }}>
                  <span style={{ fontSize: "13px", color: "#777", fontFamily: "var(--font-mono)", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00ff66", display: "inline-block" }} />
                    Status: {cve.status}
                  </span>
                  {cve.nvdUrl && (
                    <a
                      href={cve.nvdUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#de5cff", fontSize: "13px", fontFamily: "var(--font-mono)", textDecoration: "underline" }}
                    >
                      View on NVD / MITRE ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Hall of Fame List */}
        <section style={{ marginBottom: "60px", background: "#090909", border: "1px solid #1a1a1a", borderRadius: "6px", padding: "36px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: 600, marginBottom: "12px", fontFamily: "var(--font-poppins)" }}>
            Hall of Fame & Platform Acknowledgements
          </h2>
          <p style={{ color: "#8c8c8c", fontSize: "15px", marginBottom: "28px" }}>
            Recognitions earned by 0DAY Security researchers through ethical bug bounty programs and responsible disclosures.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            {hallOfFameList.map((hof) => (
              <div
                key={hof.name}
                style={{
                  background: "#121212",
                  border: "1px solid #222",
                  borderRadius: "4px",
                  padding: "18px 20px",
                }}
              >
                <h4 style={{ fontSize: "16px", fontWeight: 600, color: "#fff", marginBottom: "4px" }}>{hof.name}</h4>
                <p style={{ fontSize: "13px", color: "#888", fontFamily: "var(--font-mono)", marginBottom: "8px" }}>
                  {hof.platform} {hof.hunter ? `(Hunter: ${hof.hunter})` : ""}
                </p>
                {hof.badge && (
                  <span style={{ fontSize: "11px", color: "#de5cff", fontFamily: "var(--font-mono)" }}>
                    ★ {hof.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Call to action */}
        <div style={{ textAlign: "center", padding: "50px 20px", borderTop: "1px solid #1a1a1a" }}>
          <h2 style={{ fontSize: "26px", fontWeight: 700, marginBottom: "14px", fontFamily: "var(--font-poppins)" }}>
            Want attacker-grade testing for your organisation?
          </h2>
          <p style={{ color: "#999", maxWidth: "560px", margin: "0 auto 28px", fontSize: "15px" }}>
            Work with researchers who find zero-day vulnerabilities before real adversaries do.
          </p>
          <Link
            href="/#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 28px",
              background: "#c000f0",
              color: "#fff",
              borderRadius: "4px",
              fontFamily: "var(--font-mono)",
              fontSize: "14px",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Schedule a Free Scoping Call ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
