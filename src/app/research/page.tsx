import type { Metadata } from "next";
import Link from "next/link";
import { cveList, hallOfFameList } from "@/lib/research";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Security Research, CVE Advisories & Founder Profile | 0DAY Security",
  description:
    "Zero-day vulnerability research, coordinated CVE disclosures, and leadership profile of Anmol Singh Rajput (CVE Author, 100+ HoFs, THM Top 20).",
  alternates: {
    canonical: `${siteConfig.url}/research`,
  },
  openGraph: {
    title: "Security Research & Leadership | 0DAY Security",
    description: "Published CVEs (Root RCE CVSS 10.0), 100+ Bug Bounty Hall of Fames, and offensive security research by Anmol Singh Rajput.",
    url: `${siteConfig.url}/research`,
  },
};

export default function ResearchPage() {
  const { founder } = siteConfig;

  return (
    <div className="doc-shell" style={{ minHeight: "100vh", background: "#050505", color: "#fff", padding: "60px 24px" }}>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        
        {/* Navigation */}
        <div style={{ marginBottom: "36px" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#de5cff",
              fontSize: "13px",
              fontFamily: "var(--font-mono)",
            }}
          >
            ← Back to 0DAY Security
          </Link>
        </div>

        {/* Lead Profile Banner */}
        <section
          id="founder"
          style={{
            background: "radial-gradient(ellipse 70% 90% at 85% 20%, rgba(192, 0, 240, 0.12), transparent 70%), #0a0a0a",
            border: "1px solid #222",
            borderRadius: "8px",
            padding: "44px 36px",
            marginBottom: "60px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "1.5px", color: "#de5cff", textTransform: "uppercase" }}>
                FOUNDER & PRINCIPAL RESEARCHER
              </span>
              <h1 style={{ fontSize: "clamp(2rem, 3.8vw, 44px)", fontWeight: 700, margin: "8px 0 6px", fontFamily: "var(--font-poppins)" }}>
                {founder.name} <span style={{ fontSize: "18px", color: "#777", fontWeight: 400 }}>({founder.pronouns})</span>
              </h1>
              <p style={{ color: "#a8a8a8", fontSize: "16px", maxWidth: "720px", lineHeight: "1.6", marginTop: "10px" }}>
                {founder.headline}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-start" }}>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "#0a66c2",
                  color: "#fff",
                  padding: "10px 18px",
                  borderRadius: "4px",
                  fontSize: "13px",
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                }}
              >
                Verify on LinkedIn ↗
              </a>
              <span style={{ fontSize: "12px", color: "#888", fontFamily: "var(--font-mono)" }}>
                Direct: <a href={`mailto:${founder.directEmail}`} style={{ color: "#de5cff" }}>{founder.directEmail}</a>
              </span>
            </div>
          </div>

          {/* Achievement Badges */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "16px",
              marginTop: "32px",
              paddingTop: "28px",
              borderTop: "1px solid #1c1c1c",
            }}
          >
            {founder.achievements.map((item) => (
              <div key={item.label} style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: "4px", padding: "16px" }}>
                <span style={{ display: "block", fontSize: "18px", fontWeight: 700, color: "#de5cff", fontFamily: "var(--font-mono)" }}>
                  {item.label}
                </span>
                <span style={{ fontSize: "12px", color: "#888", lineHeight: "1.4", marginTop: "4px", display: "block" }}>
                  {item.desc}
                </span>
              </div>
            ))}
          </div>

          {/* Speaking & Specializations */}
          <div style={{ marginTop: "28px", display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
            <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "#777", textTransform: "uppercase" }}>
              Expertise:
            </span>
            {founder.expertise.map((skill) => (
              <span
                key={skill}
                style={{
                  fontSize: "12px",
                  fontFamily: "var(--font-mono)",
                  padding: "4px 10px",
                  background: "#161616",
                  border: "1px solid #282828",
                  borderRadius: "3px",
                  color: "#d0d0d0",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* CVE Disclosures Section */}
        <section style={{ marginBottom: "70px" }}>
          <div style={{ marginBottom: "28px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "1px", color: "#de5cff", textTransform: "uppercase" }}>
              COORDINATED VULNERABILITY DISCLOSURES
            </span>
            <h2 style={{ fontSize: "28px", fontWeight: 700, marginTop: "6px", fontFamily: "var(--font-poppins)" }}>
              Published CVE Advisories
            </h2>
            <p style={{ color: "#8c8c8c", fontSize: "15px", marginTop: "6px" }}>
              Every CVE below was discovered, responsibly disclosed, and coordinated with vendor engineering teams.
            </p>
          </div>

          <div style={{ display: "grid", gap: "24px" }}>
            {cveList.map((cve) => (
              <article
                key={cve.id}
                style={{
                  background: "#0d0d0d",
                  border: "1px solid #1e1e1e",
                  borderRadius: "6px",
                  padding: "32px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "16px", fontWeight: 700, color: "#fff" }}>
                    {cve.id}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      fontWeight: 700,
                      padding: "4px 12px",
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

        {/* 100+ Hall of Fame Recognitions */}
        <section style={{ marginBottom: "60px", background: "#060606", border: "1px solid #1f1f1f", borderRadius: "6px", padding: "40px 36px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "28px", paddingBottom: "20px", borderBottom: "1px solid #1a1a1a" }}>
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "1.5px", color: "#de5cff", textTransform: "uppercase", fontWeight: 700 }}>
                ★ 100+ HALL OF FAME RECOGNITIONS
              </span>
              <h2 style={{ fontSize: "28px", fontWeight: 700, margin: "6px 0 8px", fontFamily: "var(--font-poppins)" }}>
                Global Responsible Disclosure Track Record
              </h2>
              <p style={{ color: "#9c9c9c", fontSize: "15px", margin: 0, maxWidth: "780px" }}>
                Security vulnerabilities identified, responsibly disclosed, and acknowledged by Fortune 500 tech platforms, Web3 protocols, and global bug bounty platforms.
              </p>
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "4px", background: "rgba(0, 255, 102, 0.08)", border: "1px solid rgba(0, 255, 102, 0.25)", color: "#00ff66", fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 600 }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#00ff66", display: "inline-block" }} />
              Verified & Coordinated Disclosures
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: "20px" }}>
            {hallOfFameList.map((hof) => (
              <div
                key={hof.name}
                style={{
                  background: "#0a0a0a",
                  border: "1px solid #1e1e1e",
                  borderRadius: "6px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "14px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "4px", background: "rgba(222, 92, 255, 0.12)", color: "#de5cff", fontSize: "15px", border: "1px solid rgba(222, 92, 255, 0.3)" }}>
                      ★
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "10.5px", color: "#777", textTransform: "uppercase", padding: "2px 7px", background: "#121212", border: "1px solid #222", borderRadius: "2px" }}>
                      {hof.category}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#fff", margin: "0 0 4px", fontFamily: "var(--font-poppins)" }}>
                    {hof.name}
                  </h3>
                  <p style={{ fontSize: "12.5px", color: "#8a8a8a", fontFamily: "var(--font-mono)", margin: "0 0 12px" }}>
                    {hof.platform}
                  </p>

                  <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 10px", borderRadius: "3px", fontSize: "11px", fontFamily: "var(--font-mono)", fontWeight: 600, background: "rgba(222, 92, 255, 0.12)", color: "#de5cff", border: "1px solid rgba(222, 92, 255, 0.25)", marginBottom: "14px" }}>
                    ★ {hof.badge}
                  </div>

                  {hof.scope && (
                    <p style={{ fontSize: "12px", color: "#888", margin: "0 0 12px", lineHeight: 1.4, fontFamily: "var(--font-mono)" }}>
                      Scope: <span style={{ color: "#bbb" }}>{hof.scope}</span>
                    </p>
                  )}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: "1px solid #161616", fontSize: "11.5px", fontFamily: "var(--font-mono)" }}>
                  <span style={{ color: "#888" }}>Hunter: <strong style={{ color: "#ccc" }}>{hof.hunter || "Anmol Singh Rajput"}</strong></span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "#00ff66" }}>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#00ff66", display: "inline-block" }} />
                    {hof.status || "Verified"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Direct Scoping Call */}
        <div style={{ textAlign: "center", padding: "50px 20px", borderTop: "1px solid #1a1a1a" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "14px", fontFamily: "var(--font-poppins)" }}>
            Work Directly With Credited Offensive Researchers
          </h2>
          <p style={{ color: "#999", maxWidth: "600px", margin: "0 auto 28px", fontSize: "15px", lineHeight: "1.6" }}>
            Don’t settle for checkbox scans. Get senior offensive engineers testing your web applications, APIs, cloud, and network perimeter.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
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
              Get a Free Scoping Call ↗
            </Link>
            <a
              href={founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 24px",
                border: "1px solid #333",
                color: "#fff",
                borderRadius: "4px",
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
              }}
            >
              Connect with Anmol on LinkedIn
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
