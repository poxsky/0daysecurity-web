"use client";

import { useRef, type KeyboardEvent } from "react";
import { Icon } from "@/components/icons";
import { servicesCopy } from "@/lib/content";
import { revealDelay } from "@/lib/reveal";
import { services } from "@/lib/services";

const NUMBER_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];
const TOTAL = String(services.length).padStart(2, "0");
const STATEMENT = servicesCopy.statement(NUMBER_WORDS[services.length] ?? String(services.length));

type ServicesSectionProps = {
  activeId: string;
  onSelect: (id: string) => void;
  onQuote: () => void;
};

export function ServicesSection({ activeId, onSelect, onQuote }: ServicesSectionProps) {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % services.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + services.length) % services.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = services.length - 1;
    else return;
    event.preventDefault();
    onSelect(services[next].id);
    tabsRef.current[next]?.focus();
  }

  return (
    <section className="services-section" id="services" aria-labelledby="services-title">
      <div className="site-container">
        <h2 className="section-label" id="services-title" data-reveal>Services</h2>
        <p className="section-statement" data-reveal style={revealDelay(80)}>
          {STATEMENT.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <p className="section-intro" data-reveal style={revealDelay(160)}>{servicesCopy.intro}</p>

        <div className="services-layout" data-reveal style={revealDelay(200)}>
          <div className="service-tabs" role="tablist" aria-label="Security services" aria-orientation="vertical">
            {services.map((service, index) => {
              const active = service.id === activeId;
              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  id={`tab-${service.id}`}
                  aria-label={service.short}
                  aria-selected={active}
                  aria-controls={service.id}
                  tabIndex={active ? 0 : -1}
                  className={`service-tab${active ? " is-active" : ""}`}
                  ref={(element) => {
                    tabsRef.current[index] = element;
                  }}
                  onClick={() => onSelect(service.id)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                >
                  <span className="tab-number" aria-hidden="true">{service.number}</span>
                  <span className="tab-label" aria-hidden="true">{service.short}</span>
                  <span className="tab-tag" aria-hidden="true">{service.tag}</span>
                </button>
              );
            })}
          </div>

          <div className="service-panels">
            {services.map((service) => (
              <div
                key={service.id}
                className="service-panel"
                role="tabpanel"
                id={service.id}
                aria-labelledby={`tab-${service.id}`}
                hidden={service.id !== activeId}
                tabIndex={0}
              >
                <div className="service-intro">
                  <p className="service-index">
                    {service.number}
                    <span> / {TOTAL}</span>
                  </p>
                  <h3>{service.name}</h3>
                  <p className="service-tagline">{service.tagline}</p>
                  <p className="service-summary">{service.summary}</p>
                  <button type="button" className="service-cta" onClick={onQuote} aria-haspopup="dialog">
                    {service.cta} <span aria-hidden="true">↗</span>
                  </button>
                </div>
                <ul className="service-items" aria-label={`${service.name} services`}>
                  {service.items.map((item) => (
                    <li className="service-item" key={item.label}>
                      <Icon name={item.icon} className="service-icon" />
                      <div>
                        <h4>{item.label}</h4>
                        <p>{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
