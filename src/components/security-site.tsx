"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { AboutSection } from "@/components/about-section";
import { ClientsSection } from "@/components/clients-section";
import { FaqSection } from "@/components/faq-section";
import { HackerTerminal } from "@/components/hacker-terminal";
import { MouseIcon } from "@/components/icons";
import { ProcessSection } from "@/components/process-section";
import { QuoteDialog } from "@/components/quote-dialog";
import { ServicesSection } from "@/components/services-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TypedSubtitle } from "@/components/typed-subtitle";
import { WhySection } from "@/components/why-section";
import type { ClientWithLogo } from "@/lib/clients";
import { finalCta } from "@/lib/content";
import { revealDelay } from "@/lib/reveal";
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
      <a className="skip-link" href="#about">Skip to content</a>
      <SiteHeader onQuote={openQuote} />

      <main id="top">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <canvas id="fluid-canvas" className="fluid-canvas" aria-hidden="true" />
          <div className="hero-text">
            <TypedSubtitle />
            <h1 id="hero-title">
              <AccentLines lines={siteConfig.heroTitle} />
            </h1>
            <p className="hero-lead">{siteConfig.heroLead}</p>
            <div className="hero-actions">
              <button type="button" className="hero-cta" onClick={openQuote} aria-haspopup="dialog">
                {finalCta.button} <span aria-hidden="true">↗</span>
              </button>
              <a href="#services" className="hero-link">Explore services</a>
            </div>
            <ul className="hero-proof" aria-label="Our track record">
              {siteConfig.proofPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <a href={clients.length > 0 ? "#clients" : "#about"} className="scroll-down" aria-label="Scroll down">
            <MouseIcon />
          </a>
        </section>

        <ClientsSection clients={clients} />
        <AboutSection />
        <ServicesSection activeId={activeService} onSelect={selectService} onQuote={openQuote} />
        <ProcessSection />
        <WhySection />
        <FaqSection onQuote={openQuote} />

        <section className="cta-band" id="cta" aria-labelledby="cta-title">
          <div className="site-container">
            <h2 id="cta-title" data-reveal>
              <AccentLines lines={finalCta.title} />
            </h2>
            <div className="cta-row" data-reveal style={revealDelay(120)}>
              <p>{finalCta.body}</p>
              <div className="cta-buttons">
                <button type="button" className="cta-button" onClick={openQuote} aria-haspopup="dialog">
                  {finalCta.button} <span aria-hidden="true">↗</span>
                </button>
                <a className="cta-phone" href={siteConfig.phone.href}>Or call {siteConfig.phone.display}</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter onQuote={openQuote} onTerminal={() => setTerminalOpen(true)} onService={goToService} />

      <QuoteDialog open={quoteOpen} service={service.value} onClose={() => setQuoteOpen(false)} />
      <HackerTerminal open={terminalOpen} onClose={() => setTerminalOpen(false)} onQuote={openQuote} />
      <Script src="/effects/purple-fluid.js" strategy="lazyOnload" />
    </>
  );
}
