"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "why-us", label: "Why us" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];
const menuLinks = [{ id: "about", label: "About" }, ...navLinks];
const SECTION_IDS = ["home", "clients", "about", "services", "process", "why-us", "faq", "cta", "contact"];

export function SiteHeader({ onQuote }: { onQuote: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const [section, setSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const active = atBottom ? "contact" : section;

  // Header state follows the scroll position, measured at most once per frame.
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      setShowTop(y > 700);
      setAtBottom(window.innerHeight + y >= document.documentElement.scrollHeight - 4);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > 160 && y > lastY);
        lastY = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  // Highlight the navigation link for the section in the middle of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setSection(entry.target.id);
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    for (const id of SECTION_IDS) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    if (menuOpen && !menu.open) menu.showModal();
    else if (!menuOpen && menu.open) menu.close();
  }, [menuOpen]);

  // Close synchronously so the link's scroll happens with the page unlocked.
  function closeMenu() {
    menuRef.current?.close();
    setMenuOpen(false);
  }

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}${hidden && !menuOpen ? " is-hidden" : ""}`}>
        <a className="brand" href="#top" aria-label={`${siteConfig.name} home`}>
          {siteConfig.name}
        </a>
        <nav className="site-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link${active === link.id ? " is-active" : ""}`}
              aria-current={active === link.id ? "true" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button type="button" className="header-quote" onClick={onQuote} aria-haspopup="dialog">
            Get a quote
          </button>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-label="Open menu"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </header>

      <dialog ref={menuRef} className="menu-dialog" aria-label="Menu" onClose={() => setMenuOpen(false)} data-lenis-prevent>
        <div className="menu-top">
          <a className="brand" href="#top" onClick={closeMenu}>
            {siteConfig.name}
          </a>
          <button type="button" className="menu-close" onClick={closeMenu} aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <div className="menu-body">
          <nav aria-label="Menu">
            <ol className="menu-links">
              {menuLinks.map((link, index) => (
                <li key={link.id} style={{ "--i": index } as CSSProperties}>
                  <a href={`#${link.id}`} onClick={closeMenu} aria-current={active === link.id ? "true" : undefined}>
                    <span className="menu-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="menu-footer">
            <button
              type="button"
              className="hero-cta"
              onClick={() => {
                closeMenu();
                onQuote();
              }}
              aria-haspopup="dialog"
            >
              Get a free scoping call <span aria-hidden="true">↗</span>
            </button>
            <a className="menu-contact" href={siteConfig.phone.href}>{siteConfig.phone.display}</a>
            <a className="menu-contact" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </div>
        </div>
      </dialog>

      <a
        href="#top"
        className={`back-to-top${showTop ? " is-visible" : ""}`}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M12 19V5m-6 6 6-6 6 6" />
        </svg>
      </a>
    </>
  );
}
