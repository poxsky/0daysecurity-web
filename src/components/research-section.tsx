import Link from "next/link";
import { cveList, hallOfFameList } from "@/lib/research";
import { revealDelay } from "@/lib/reveal";
import { siteConfig } from "@/lib/site-config";

export function ResearchSection() {
  return (
    <section className="research-section" id="research" aria-labelledby="research-title">
      <div className="site-container">
        <div className="section-head" data-reveal>
          <p className="section-label" id="research-title">OFFENSIVE RESEARCH & TRACK RECORD</p>
          <h2 className="section-statement">
            <span>Proof, not promises.</span>
            <span className="accent"> Real CVEs & Disclosures.</span>
          </h2>
          <p className="research-intro">
            We don’t just run automated scans. Our researchers discover zero-day flaws, publish coordinated CVE advisories,
            and rank in global Bug Bounty Halls of Fame. This deep attacker expertise is what protects your systems.
          </p>
        </div>

        {/* CVE Grid - Featured Top 3 on Homepage */}
        <div className="cve-grid">
          {cveList.slice(0, 3).map((cve, index) => (
            <article
              key={cve.id}
              className="cve-card"
              data-reveal
              style={revealDelay((index % 3) * 80)}
            >
              <div className="cve-card-top">
                <span className="cve-id">{cve.id}</span>
                <span className={`cve-severity severity-${cve.severity.toLowerCase()}`}>
                  {cve.cvss ? `CVSS ${cve.cvss} ` : ""}{cve.severity}
                </span>
              </div>
              <h3 className="cve-title">{cve.title}</h3>
              <p className="cve-meta">
                <span className="cve-product">{cve.product} ({cve.versions})</span>
                <span className="cve-dot">·</span>
                <span className="cve-type">{cve.type}</span>
              </p>
              <p className="cve-desc">{cve.description}</p>
              <div className="cve-card-bottom">
                <span className="cve-status">
                  <span className="status-indicator" aria-hidden="true" />
                  {cve.status}
                </span>
                {cve.nvdUrl && (
                  <a
                    href={cve.nvdUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cve-link"
                    aria-label={`View ${cve.id} on NVD`}
                  >
                    NVD / MITRE <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div data-reveal style={{ textAlign: "center", marginTop: "36px", ...revealDelay(120) }}>
          <Link
            href="/research"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 28px",
              border: "1px solid rgba(222, 92, 255, 0.5)",
              background: "rgba(222, 92, 255, 0.1)",
              color: "#fff",
              borderRadius: "4px",
              fontSize: "13px",
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              fontWeight: 600,
              boxShadow: "0 0 20px rgba(192, 0, 240, 0.15)",
            }}
          >
            Explore Complete Research Dossier & Full CVE List (10+ Published) →
          </Link>
        </div>

        {/* Hall of Fame Highlights */}
        <div className="hof-band" data-reveal style={revealDelay(150)}>
          <div className="hof-header">
            <h3>Responsible Disclosure & Bug Bounty Recognitions</h3>
            <p>Verified security contributions acknowledged by enterprise programs and leading security platforms.</p>
          </div>
          <div className="hof-grid">
            {hallOfFameList.map((hof) => (
              <div className="hof-card" key={hof.name}>
                <div className="hof-badge-icon" aria-hidden="true">★</div>
                <div className="hof-info">
                  <h4 className="hof-name">{hof.name}</h4>
                  <p className="hof-platform">{hof.platform || hof.category}</p>
                  {hof.badge && <span className="hof-pill">{hof.badge}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
