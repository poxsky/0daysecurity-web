"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { HackerTerminal } from "@/components/hacker-terminal";
import { QuoteDialog } from "@/components/quote-dialog";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { allCapabilities, capabilityCategories, type CapabilityCategory, type CapabilityItem } from "@/lib/capabilities";
import { siteConfig } from "@/lib/site-config";

export function ServicesClient() {
  const [selectedCategory, setSelectedCategory] = useState<CapabilityCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [activeQuoteService, setActiveQuoteService] = useState("vapt");
  const [terminalOpen, setTerminalOpen] = useState(false);

  function handleOpenQuote(serviceValue = "vapt") {
    setActiveQuoteService(serviceValue);
    setQuoteOpen(true);
  }

  const filteredCapabilities = useMemo(() => {
    return allCapabilities.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const inTitle = item.title.toLowerCase().includes(q);
      const inHeadline = item.headline.toLowerCase().includes(q);
      const inDesc = item.description.toLowerCase().includes(q);
      const inMethod = item.methodology.toLowerCase().includes(q);
      const inTags = item.tags.some((tag) => tag.toLowerCase().includes(q));
      const inStandards = item.standards.some((std) => std.toLowerCase().includes(q));

      return inTitle || inHeadline || inDesc || inMethod || inTags || inStandards;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <SiteHeader onQuote={() => handleOpenQuote("vapt")} />

      <main className="services-page-shell" style={{ minHeight: "100vh", background: "#040404", color: "#f0f0f0", paddingTop: "100px" }}>
        {/* Page Hero Header */}
        <section style={{ padding: "60px 24px 40px", borderBottom: "1px solid #161616", background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(192, 0, 240, 0.15), transparent 70%)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "100px", background: "rgba(222, 92, 255, 0.1)", border: "1px solid rgba(222, 92, 255, 0.3)", marginBottom: "20px" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#00ff66", display: "inline-block" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "1.2px", color: "#de5cff", textTransform: "uppercase", fontWeight: 700 }}>
                FULL CAPABILITIES & RESEARCH DIRECTORY
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 62px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-1.5px", margin: "0 0 18px", fontFamily: "var(--font-poppins)" }}>
              Offensive Services & <span style={{ color: "#de5cff", textShadow: "0 0 35px rgba(222, 92, 255, 0.5)" }}>Advanced Research</span>
            </h1>

            <p style={{ fontSize: "clamp(1rem, 1.8vw, 19px)", color: "#9e9e9e", maxWidth: "840px", lineHeight: 1.6, margin: "0 0 32px" }}>
              A definitive directory of our client-facing offensive assessments, specialized research lab capabilities, deep domain testing, and audit-ready governance frameworks.
            </p>

            {/* Quick Stats Banner */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "24px", paddingTop: "24px", borderTop: "1px solid #1a1a1a" }}>
              <div>
                <span style={{ display: "block", fontSize: "24px", fontWeight: 700, color: "#fff", fontFamily: "var(--font-mono)" }}>36+ Domains</span>
                <span style={{ fontSize: "12px", color: "#777", textTransform: "uppercase", letterSpacing: "0.5px" }}>Across 4 Specialized Pillars</span>
              </div>
              <div>
                <span style={{ display: "block", fontSize: "24px", fontWeight: 700, color: "#de5cff", fontFamily: "var(--font-mono)" }}>100% Attacker-Grade</span>
                <span style={{ fontSize: "12px", color: "#777", textTransform: "uppercase", letterSpacing: "0.5px" }}>Senior Researchers · Zero Scanner Noise</span>
              </div>
              <div>
                <span style={{ display: "block", fontSize: "24px", fontWeight: 700, color: "#00ff66", fontFamily: "var(--font-mono)" }}>Verified CVE Authors</span>
                <span style={{ fontSize: "12px", color: "#777", textTransform: "uppercase", letterSpacing: "0.5px" }}>Original Zero-Day Discovery Lab</span>
              </div>
              <div>
                <span style={{ display: "block", fontSize: "24px", fontWeight: 700, color: "#fff", fontFamily: "var(--font-mono)" }}>Audit-Ready</span>
                <span style={{ fontSize: "12px", color: "#777", textTransform: "uppercase", letterSpacing: "0.5px" }}>ISO 27001 · SOC 2 · CERT-In · NIST</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filter and Search Bar Section */}
        <section style={{ position: "sticky", top: "72px", zIndex: 30, background: "rgba(4, 4, 4, 0.94)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1c1c1c", padding: "18px 24px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
              
              {/* Category Filter Pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }} role="tablist" aria-label="Capabilities filter">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "4px",
                    fontSize: "13px",
                    fontFamily: "var(--font-mono)",
                    cursor: "pointer",
                    background: selectedCategory === "all" ? "var(--dark-purple)" : "#101010",
                    color: selectedCategory === "all" ? "#fff" : "#999",
                    border: selectedCategory === "all" ? "1px solid var(--purple)" : "1px solid #222",
                    transition: "all .2s ease",
                  }}
                >
                  All Domains ({allCapabilities.length})
                </button>
                {capabilityCategories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  const count = allCapabilities.filter((item) => item.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "4px",
                        fontSize: "13px",
                        fontFamily: "var(--font-mono)",
                        cursor: "pointer",
                        background: isSelected ? "var(--dark-purple)" : "#101010",
                        color: isSelected ? "#fff" : "#999",
                        border: isSelected ? "1px solid var(--purple)" : "1px solid #222",
                        transition: "all .2s ease",
                      }}
                    >
                      {cat.label} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Instant Search Bar */}
              <div style={{ position: "relative", minWidth: "260px", flex: "1 1 300px", maxWidth: "420px" }}>
                <input
                  type="search"
                  placeholder="Filter by keyword (e.g. Kubernetes, Binary, API, AI)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "4px",
                    background: "#0c0c0c",
                    border: "1px solid #282828",
                    color: "#fff",
                    fontSize: "13px",
                    fontFamily: "var(--font-mono)",
                    outline: "none",
                    transition: "border-color .2s",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--purple)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#282828")}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "transparent",
                      border: "none",
                      color: "#888",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Category Explanation Banner */}
            {selectedCategory !== "all" && (
              <p style={{ margin: 0, fontSize: "13px", color: "#8a8a8a", fontFamily: "var(--font-mono)" }}>
                Showing: <strong style={{ color: "#de5cff" }}>{capabilityCategories.find((c) => c.id === selectedCategory)?.label}</strong> — {capabilityCategories.find((c) => c.id === selectedCategory)?.description}
              </p>
            )}
          </div>
        </section>

        {/* Capabilities Grid */}
        <section style={{ padding: "50px 24px 90px", maxWidth: "1280px", margin: "0 auto" }}>
          {filteredCapabilities.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px", background: "#0a0a0a", borderRadius: "6px", border: "1px dashed #222" }}>
              <h3 style={{ fontSize: "20px", marginBottom: "8px", color: "#ccc" }}>No matching capabilities found</h3>
              <p style={{ color: "#777", fontSize: "14px", marginBottom: "20px" }}>
                We couldn&apos;t find any security domains matching &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                style={{
                  padding: "10px 20px",
                  background: "var(--dark-purple)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Reset Filters & View All
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "24px" }}>
              {filteredCapabilities.map((item) => (
                <article
                  key={item.id}
                  style={{
                    background: "#080808",
                    border: "1px solid #1a1a1a",
                    borderRadius: "6px",
                    padding: "28px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "border-color .25s ease, transform .25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(222, 92, 255, 0.4)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#1a1a1a";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div>
                    {/* Top Meta Line */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          fontFamily: "var(--font-mono)",
                          padding: "3px 8px",
                          borderRadius: "3px",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          background: item.category === "advanced-research" ? "rgba(222, 92, 255, 0.15)" : item.category === "specialized-domains" ? "rgba(0, 180, 255, 0.12)" : item.category === "grc-compliance" ? "rgba(255, 170, 0, 0.12)" : "rgba(255, 255, 255, 0.08)",
                          color: item.category === "advanced-research" ? "#de5cff" : item.category === "specialized-domains" ? "#40c4ff" : item.category === "grc-compliance" ? "#ffb74d" : "#e0e0e0",
                          border: `1px solid ${item.category === "advanced-research" ? "rgba(222, 92, 255, 0.3)" : item.category === "specialized-domains" ? "rgba(0, 180, 255, 0.3)" : item.category === "grc-compliance" ? "rgba(255, 170, 0, 0.3)" : "#2a2a2a"}`,
                        }}
                      >
                        {item.categoryLabel}
                      </span>
                      <span style={{ fontSize: "11px", color: "#666", fontFamily: "var(--font-mono)" }}>
                        {item.methodology.split("·")[0]?.trim()}
                      </span>
                    </div>

                    <h3 style={{ fontSize: "19px", fontWeight: 700, color: "#fff", margin: "0 0 10px", lineHeight: 1.3, fontFamily: "var(--font-poppins)" }}>
                      {item.title}
                    </h3>

                    <p style={{ fontSize: "13px", color: "#de5cff", fontFamily: "var(--font-mono)", margin: "0 0 14px", lineHeight: 1.5 }}>
                      {item.headline}
                    </p>

                    <p style={{ fontSize: "14px", color: "#a5a5a5", lineHeight: 1.6, margin: "0 0 20px" }}>
                      {item.description}
                    </p>

                    {/* Standards Pills */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                      {item.standards.map((std) => (
                        <span
                          key={std}
                          style={{
                            fontSize: "10.5px",
                            fontFamily: "var(--font-mono)",
                            padding: "2px 7px",
                            borderRadius: "2px",
                            background: "#111",
                            border: "1px solid #222",
                            color: "#888",
                          }}
                        >
                          {std}
                        </span>
                      ))}
                    </div>

                    {/* Deliverables List */}
                    <div style={{ borderTop: "1px solid #161616", paddingTop: "16px", marginBottom: "24px" }}>
                      <span style={{ display: "block", fontSize: "11px", fontFamily: "var(--font-mono)", color: "#777", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
                        Key Deliverables:
                      </span>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                        {item.deliverables.map((del) => (
                          <li key={del} style={{ fontSize: "12.5px", color: "#bcbcbc", display: "flex", alignItems: "flex-start", gap: "8px", lineHeight: 1.4 }}>
                            <span style={{ color: "#de5cff", fontSize: "10px", marginTop: "2px" }}>■</span>
                            {del}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #1a1a1a", paddingTop: "16px", marginTop: "10px" }}>
                    <button
                      type="button"
                      onClick={() => handleOpenQuote(item.serviceValue)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "9px 16px",
                        background: "var(--dark-purple)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "3px",
                        fontSize: "12px",
                        fontWeight: 600,
                        fontFamily: "var(--font-mono)",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        cursor: "pointer",
                        transition: "background .2s",
                      }}
                    >
                      Scope This Domain ↗
                    </button>
                    <Link
                      href="/research"
                      style={{
                        fontSize: "12px",
                        color: "#888",
                        fontFamily: "var(--font-mono)",
                        textDecoration: "underline",
                      }}
                    >
                      View Related CVEs →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Global Enterprise Scoping Banner */}
        <section style={{ background: "#080808", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", padding: "60px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "1.5px", color: "#de5cff", textTransform: "uppercase", fontWeight: 700 }}>
              DIRECT ACCESS TO PRINCIPAL RESEARCHERS
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.2vw, 36px)", fontWeight: 700, margin: "10px 0 16px", fontFamily: "var(--font-poppins)" }}>
              Custom Scope for Regulated & High-Stakes Environments
            </h2>
            <p style={{ color: "#9a9a9a", fontSize: "15px", lineHeight: 1.6, marginBottom: "28px" }}>
              Whether you need a one-off VAPT assessment for compliance, an ongoing Red Team adversary emulation, or deep-dive zero-day vulnerability research on custom binary protocols — we tailor each engagement directly to your threat model and timeline.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => handleOpenQuote("vapt")}
                style={{
                  padding: "14px 28px",
                  background: "var(--dark-purple)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  cursor: "pointer",
                }}
              >
                Schedule Free Scoping Call ↗
              </button>
              <Link
                href="/research"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "13px 24px",
                  background: "transparent",
                  border: "1px solid #333",
                  color: "#e0e0e0",
                  borderRadius: "4px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                }}
              >
                Inspect Research Track Record & CVEs →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter onQuote={() => handleOpenQuote("vapt")} onTerminal={() => setTerminalOpen(true)} onService={() => {}} />

      <QuoteDialog open={quoteOpen} service={activeQuoteService} onClose={() => setQuoteOpen(false)} />
      <HackerTerminal open={terminalOpen} onClose={() => setTerminalOpen(false)} onQuote={() => handleOpenQuote("vapt")} />
    </>
  );
}
