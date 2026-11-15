import Link from "next/link";
import { about } from "@/lib/content";
import { revealDelay } from "@/lib/reveal";
import { siteConfig } from "@/lib/site-config";

export function AboutSection() {
  const { founder } = siteConfig;

  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="site-container">
        <h2 className="section-label" id="about-title" data-reveal>Who we are</h2>
        <p className="section-statement" data-reveal style={revealDelay(80)}>
          {about.statement.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>

        <div className="about-layout" style={{ marginTop: "40px", display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)", gap: "48px", alignItems: "start" }}>
          {/* Main Story Copy */}
          <div className="about-copy" data-reveal style={revealDelay(140)}>
            <p style={{ fontSize: "17px", lineHeight: "1.7", color: "#ccc", marginBottom: "20px" }}>
              <strong>{siteConfig.name}</strong> was founded by practitioners who live and breathe offensive security. 
              We don’t run automated scanners and bill you for noisy false-positive PDFs. Instead, we emulate real threat actors, 
              reverse-engineer systems, test business logic, and discover the zero-day vulnerabilities that scanners miss.
            </p>
            <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#999", marginBottom: "32px" }}>
              Led by credited CVE author <strong>Anmol Singh Rajput</strong>, our security findings have helped protect millions of users across 
              global platforms like <strong>Google, Webflow, DigitalOcean, and FreeRDP</strong>. Whether you are preparing for 
              compliance audits (ISO 27001, SOC 2, DPDP, CERT-In) or need high-stakes Red Teaming, we give you proof over promises.
            </p>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "center" }}>
              <Link href="/research" className="text-link" style={{ fontSize: "14px", fontWeight: 600 }}>
                Explore Research & CVEs <span aria-hidden="true">→</span>
              </Link>
              <a href="#services" className="text-link" style={{ fontSize: "14px", color: "#888" }}>
                See our services <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          {/* Founder Profile Card */}
          <div
            className="founder-card"
            data-reveal
            style={{
              ...revealDelay(200),
              background: "#080808",
              border: "1px solid #222",
              borderRadius: "6px",
              padding: "32px",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "16px" }}>
              <div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#de5cff", letterSpacing: "1px", textTransform: "uppercase" }}>
                  LEADERSHIP & RESEARCH
                </span>
                <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", marginTop: "4px", fontFamily: "var(--font-poppins)" }}>
                  {founder.name}
                </h3>
                <p style={{ fontSize: "13px", color: "#888", fontFamily: "var(--font-mono)" }}>
                  {founder.role} · {founder.pronouns}
                </p>
              </div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "4px 8px",
                  borderRadius: "3px",
                  background: "rgba(0, 255, 102, 0.12)",
                  color: "#00ff66",
                  border: "1px solid rgba(0, 255, 102, 0.3)",
                  fontSize: "11px",
                  fontFamily: "var(--font-mono)",
                }}
              >
                ● Verified Researcher
              </span>
            </div>

            <p style={{ fontSize: "14px", color: "#b5b5b5", lineHeight: "1.6", marginBottom: "20px" }}>
              {founder.headline}
            </p>

            {/* Micro Achievement Pills */}
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <li style={{ background: "#121212", border: "1px solid #1c1c1c", padding: "8px 12px", borderRadius: "4px" }}>
                <span style={{ display: "block", fontSize: "16px", fontWeight: 700, color: "#de5cff", fontFamily: "var(--font-mono)" }}>10+ CVEs</span>
                <span style={{ fontSize: "11px", color: "#777" }}>CVSS 10.0 Root RCE</span>
              </li>
              <li style={{ background: "#121212", border: "1px solid #1c1c1c", padding: "8px 12px", borderRadius: "4px" }}>
                <span style={{ display: "block", fontSize: "16px", fontWeight: 700, color: "#de5cff", fontFamily: "var(--font-mono)" }}>100+ HoF</span>
                <span style={{ fontSize: "11px", color: "#777" }}>Google, Webflow, etc.</span>
              </li>
              <li style={{ background: "#121212", border: "1px solid #1c1c1c", padding: "8px 12px", borderRadius: "4px" }}>
                <span style={{ display: "block", fontSize: "16px", fontWeight: 700, color: "#de5cff", fontFamily: "var(--font-mono)" }}>THM Top 20</span>
                <span style={{ fontSize: "11px", color: "#777" }}>Global Elite Rank</span>
              </li>
              <li style={{ background: "#121212", border: "1px solid #1c1c1c", padding: "8px 12px", borderRadius: "4px" }}>
                <span style={{ display: "block", fontSize: "16px", fontWeight: 700, color: "#de5cff", fontFamily: "var(--font-mono)" }}>HTB Speaker</span>
                <span style={{ fontSize: "11px", color: "#777" }}>Hack The Box Mumbai</span>
              </li>
            </ul>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #1a1a1a", paddingTop: "16px" }}>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#0a66c2",
                  fontSize: "13px",
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                }}
              >
                LinkedIn Profile <span aria-hidden="true">↗</span>
              </a>
              <span style={{ fontSize: "12px", color: "#666", fontFamily: "var(--font-mono)" }}>
                {founder.directEmail}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
