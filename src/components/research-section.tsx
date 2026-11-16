import Link from "next/link";
import { cveList, hallOfFameList } from "@/lib/research";
import { revealDelay } from "@/lib/reveal";
import { siteConfig } from "@/lib/site-config";

export function ResearchSection({ onQuote }: { onQuote?: () => void }) {
  return (
    <section className="research-section" id="research" aria-labelledby="research-title">
      <div className="site-container">
        <div className="section-head" data-reveal>
          <p className="section-label" id="research-title">RESEARCH & LEADERSHIP DOSSIER</p>
          <h2 className="section-statement">
            <span>Proof, not promises.</span>
            <span className="accent"> Zero-day research & credited CVEs.</span>
          </h2>
          <p className="research-intro">
            We believe offensive security credibility must be proven on the public record. 
            Explore our published CVE advisories (including CVSS 10.0 Root RCEs), 100+ global Hall of Fame recognitions (Google, Webflow, YesWeHack), 
            and leadership dossier for principal researcher <strong>{siteConfig.founder.name}</strong>.
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

        <div data-reveal style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "16px", marginTop: "40px", ...revealDelay(120) }}>
          <Link
            href="/research"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 28px",
              background: "var(--dark-purple)",
              color: "#fff",
              borderRadius: "4px",
              fontSize: "13px",
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              fontWeight: 600,
              boxShadow: "0 0 25px rgba(192, 0, 240, 0.25)",
              transition: "background .2s, transform .2s",
            }}
          >
            View Full Research Dossier & CVEs →
          </Link>
          {onQuote && (
            <button
              type="button"
              onClick={onQuote}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "13px 24px",
                background: "transparent",
                border: "1px solid #333",
                color: "#e0e0e0",
                borderRadius: "4px",
                fontSize: "13px",
                fontFamily: "var(--font-mono)",
                cursor: "pointer",
                transition: "border-color .2s, color .2s",
              }}
            >
              Schedule Free Scoping Call ↗
            </button>
          )}
        </div>

        {/* Hall of Fame Highlights */}
        <div className="hof-band" data-reveal style={revealDelay(150)}>
          <div className="hof-header">
            <div className="hof-header-left">
              <span className="hof-header-tag">RESPONSIBLE DISCLOSURE & BUG BOUNTY RECOGNITIONS</span>
              <h3>Verified Security Contributions & Hall of Fame Standing</h3>
              <p>Verified security contributions acknowledged by enterprise programs and leading security platforms.</p>
            </div>
            <div className="hof-stats-pill">
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#00ff66", display: "inline-block" }} />
              100+ Global Recognitions
            </div>
          </div>
          <div className="hof-grid">
            {hallOfFameList.map((hof) => (
              <div className="hof-card" key={hof.name}>
                <div>
                  <div className="hof-card-top">
                    <div className="hof-badge-icon" aria-hidden="true">★</div>
                    <span className="hof-category-tag">{hof.category}</span>
                  </div>
                  <h4 className="hof-name">{hof.name}</h4>
                  <p className="hof-platform">{hof.platform}</p>
                  <div className="hof-badge-pill">
                    ★ {hof.badge}
                  </div>
                  {hof.scope && (
                    <p style={{ fontSize: "12px", color: "#888", margin: "0 0 12px", lineHeight: 1.4, fontFamily: "var(--font-mono)" }}>
                      Scope: <span style={{ color: "#bbb" }}>{hof.scope}</span>
                    </p>
                  )}
                </div>
                <div className="hof-card-bottom">
                  <span className="hof-hunter">Hunter: <strong>{hof.hunter || "Anmol Singh Rajput"}</strong></span>
                  <span className="hof-status-dot">
                    <span />
                    {hof.status || "Verified"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
