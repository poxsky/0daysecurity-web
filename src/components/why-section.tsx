import { Icon } from "@/components/icons";
import { whyUs } from "@/lib/content";
import { revealDelay } from "@/lib/reveal";
import { siteConfig } from "@/lib/site-config";

export function WhySection() {
  return (
    <section className="why-section" id="why-us" aria-labelledby="why-title">
      <div className="site-container">
        <h2 className="section-label" id="why-title" data-reveal>Why {siteConfig.name}</h2>
        <p className="section-statement" data-reveal style={revealDelay(80)}>
          {whyUs.statement.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <ul className="why-grid">
          {whyUs.points.map((point, index) => (
            <li className="why-card" key={point.title} data-reveal style={revealDelay((index % 3) * 90)}>
              <Icon name={point.icon} className="why-icon" />
              <h3>{point.title}</h3>
              <p>{point.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
