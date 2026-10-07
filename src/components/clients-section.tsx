"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { clientsCopy, type ClientWithLogo } from "@/lib/clients";

/** Marquee speed in pixels per second: slow and calm at every screen size. */
const SPEED = 36;

function ClientMark({ client, decorative = false }: { client: ClientWithLogo; decorative?: boolean }) {
  if (client.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- small static logos; a plain <img> keeps each logo's natural width.
      <img
        className={`client-logo${client.originalColors ? "" : " is-mono"}`}
        src={client.logo}
        alt={decorative ? "" : client.name}
        draggable={false}
        decoding="async"
      />
    );
  }
  return <span className="client-wordmark">{client.name}</span>;
}

export function ClientsSection({ clients }: { clients: ClientWithLogo[] }) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);
  const [offscreen, setOffscreen] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const group = groupRef.current;
    if (!marquee || !group) return;
    // Keep the same speed on every screen: duration follows the width of one set of logos.
    const measure = () => setDuration(Math.max(group.offsetWidth / SPEED, 10));
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(group);
    // Stop animating while the strip is off screen.
    const visibilityObserver = new IntersectionObserver(([entry]) => setOffscreen(!entry.isIntersecting));
    visibilityObserver.observe(marquee);
    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  if (clients.length === 0) return null;

  const style = duration ? ({ "--marquee-duration": `${duration.toFixed(1)}s` } as CSSProperties) : undefined;
  const items = (decorative: boolean) =>
    clients.map((client) => (
      <li className="marquee-item" key={client.slug}>
        <ClientMark client={client} decorative={decorative} />
      </li>
    ));

  return (
    <section className="clients-section" id="clients" aria-labelledby="clients-title">
      <div className="site-container clients-inner" data-reveal>
        <div className="clients-head">
          <h2 className="clients-label" id="clients-title">{clientsCopy.label}</h2>
          <button
            type="button"
            className="marquee-toggle"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? "Play logo animation" : "Pause logo animation"}
          >
            {paused ? (
              <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3.5 1.8v8.4L10 6z" fill="currentColor" /></svg>
            ) : (
              <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5h2v9H3zM7 1.5h2v9H7z" fill="currentColor" /></svg>
            )}
          </button>
        </div>
        <div ref={marqueeRef} className={`marquee${paused || offscreen ? " is-paused" : ""}`} style={style}>
          <ul className="marquee-group" ref={groupRef} aria-label="Clients">
            {items(false)}
          </ul>
          <ul className="marquee-group" aria-hidden="true">
            {items(true)}
          </ul>
        </div>
      </div>
    </section>
  );
}
