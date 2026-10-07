"use client";

import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

const companyLinks = [
  { href: "#about", label: "About us" },
  { href: "#process", label: "How we work" },
  { href: "#why-us", label: "Why 0DAY" },
  { href: "#faq", label: "FAQ" },
];

type SiteFooterProps = {
  onQuote: () => void;
  onTerminal: () => void;
  onService: (id: string) => void;
};

export function SiteFooter({ onQuote, onTerminal, onService }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" id="contact">
      <div className="site-container">
        <div className="footer-top">
          <div className="footer-brand-column">
            <a href="#top" className="footer-brand" aria-label={`${siteConfig.name}, back to top`}>
              {siteConfig.name}
            </a>
            <p className="footer-tagline">
              {siteConfig.tagline.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          </div>
          <div className="footer-contact">
            <h2>
              <button className="quote-heading" type="button" onClick={onQuote} aria-haspopup="dialog">
                Get a quote
              </button>
            </h2>
            <p className="contact-intro">
              <button type="button" onClick={onQuote}>Contact us for free scoping and a quote</button>
            </p>
            <a className="contact-link" href={siteConfig.phone.href}>{siteConfig.phone.display}</a>
            <a className="contact-link" href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(siteConfig.emailSubject)}`}>
              {siteConfig.email}
            </a>
          </div>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          <div className="footer-col footer-col-services">
            <h3>Services</h3>
            <ul>
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href={`#${service.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      onService(service.id);
                    }}
                  >
                    {service.short}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h3>Company</h3>
            <ul>
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h3>Trust</h3>
            <ul>
              <li><a href="/.well-known/security.txt">Responsible disclosure</a></li>
              <li><a href="/privacy">Privacy notice</a></li>
            </ul>
          </div>
        </nav>

        <div className="footer-bottom">
          <p suppressHydrationWarning>© {year} {siteConfig.name}. All rights reserved.</p>
          <button type="button" className="terminal-trigger" onClick={onTerminal} aria-haspopup="dialog">
            &gt;_ open terminal
          </button>
        </div>
      </div>
    </footer>
  );
}
