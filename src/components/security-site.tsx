"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { ClientsSection } from "@/components/clients-section";
import { HackerTerminal } from "@/components/hacker-terminal";
import { MouseIcon } from "@/components/icons";
import { QuoteDialog } from "@/components/quote-dialog";
import { ServicesSection } from "@/components/services-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StandardsBanner } from "@/components/standards-banner";
import type { ClientWithLogo } from "@/lib/clients";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";
import { scrollToElement, useSmoothScroll } from "@/lib/smooth-scroll";
import { useReveal } from "@/lib/use-reveal";

function isTypingTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
  );
}

/** Two stacked lines; the last word of the second line is highlighted in purple. */
function AccentLines({ lines }: { lines: readonly [string, string] }) {
  const [first, second] = lines;
  const split = second.lastIndexOf(" ") + 1;
  return (
    <>
      <span className="title-line">{first}</span>
      <span className="title-line">
        {second.slice(0, split)}
        <span className="accent">{second.slice(split)}</span>
      </span>
    </>
  );
}

export function SecuritySite({ clients }: { clients: ClientWithLogo[] }) {
  const [activeService, setActiveService] = useState(services[0].id);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const service = services.find((item) => item.id === activeService) ?? services[0];

  useSmoothScroll();
  useReveal();

  // Direct links to a service (for example /#grc) open that tab and bring the services section into view.
  useEffect(() => {
    const onHashChange = () => {
      const match = services.find((item) => item.id === window.location.hash.slice(1));
      if (!match) return;
      setActiveService(match.id);
      window.requestAnimationFrame(() => {
        document.getElementById("services")?.scrollIntoView({ behavior: "instant", block: "start" });
      });
    };
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "`" || event.ctrlKey || event.metaKey || event.altKey) return;
      if (isTypingTarget(event.target) || document.querySelector("dialog[open]")) return;
      event.preventDefault();
      setTerminalOpen(true);
    };
    window.addEventListener("keydown", onKeyDown);
    console.info(`%c${siteConfig.name}`, "font: 700 22px monospace; color: #de5cff;");
    console.info(
      "%cCurious? We like that. Press ` anywhere on the page to open the terminal.",
      "font: 13px monospace; color: #bbbbbb;",
    );
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function openQuote() {
    setTerminalOpen(false);
    setQuoteOpen(true);
  }

  function selectService(id: string) {
    setActiveService(id);
    window.history.replaceState(null, "", `#${id}`);
  }

  function goToService(id: string) {
    selectService(id);
    const section = document.getElementById("services");
    if (section) scrollToElement(section);
  }

  return (
    <>
      <a className="skip-link" href="#services">Skip to services</a>
      <SiteHeader onQuote={openQuote} />

      <main id="top">
        {/* Full Screen Hero with fluid canvas matching Day Zero Security */}
        <section className="hero" id="home" aria-labelledby="hero-title">
          <canvas id="fluid-canvas" className="fluid-canvas" aria-hidden="true" />
          <div className="hero-text">
            <h1 id="hero-title">
              <AccentLines lines={siteConfig.heroTitle} />
            </h1>
            <h2 className="hero-subtitle">
              Offensive security specialists
            </h2>
            <div className="hero-actions">
              <button type="button" className="hero-cta" onClick={openQuote} aria-haspopup="dialog">
                Get a quote <span aria-hidden="true">↗</span>
              </button>
              <a href="#services" className="hero-link">Explore services</a>
            </div>
          </div>
          <a href="#services" className="scroll-down" aria-label="Scroll down to services">
            <MouseIcon />
          </a>
        </section>

        {/* Benchmarked Testing Standards */}
        <StandardsBanner />

        {/* Clean Services Section with Interactive Tabs */}
        <ServicesSection activeId={activeService} onSelect={selectService} onQuote={openQuote} />

        {/* Clean Gateway to the Detailed Next Page */}
        <section className="research-gateway-section" id="research-gateway">
          <div className="site-container">
            <div className="research-gateway-card" data-reveal>
              <div className="gateway-badge">RESEARCH & LEADERSHIP DOSSIER</div>
              <h3 className="gateway-title">
                Proof, not promises. Zero-day research & credited CVEs.
              </h3>
              <p className="gateway-desc">
                We believe offensive security credibility must be proven on the public record. 
                Explore our published CVE advisories (including CVSS 10.0 Root RCEs), 100+ global Hall of Fame recognitions (Google, Webflow, YesWeHack), 
                and leadership dossier for principal researcher <strong>Anmol Singh Rajput</strong>.
              </p>
              <div className="gateway-actions">
                <Link href="/research" className="gateway-btn">
                  View Full Research Dossier & CVEs →
                </Link>
                <button type="button" className="gateway-quote-btn" onClick={openQuote}>
                  Schedule Free Scoping Call ↗
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee: Responsible Disclosures & Platforms */}
        <ClientsSection clients={clients} />
      </main>

      <SiteFooter onQuote={openQuote} onTerminal={() => setTerminalOpen(true)} onService={goToService} />

      <QuoteDialog open={quoteOpen} service={service.value} onClose={() => setQuoteOpen(false)} />
      <HackerTerminal open={terminalOpen} onClose={() => setTerminalOpen(false)} onQuote={openQuote} />
      <Script src="/effects/purple-fluid.js" strategy="lazyOnload" />
    </>
  );
}
