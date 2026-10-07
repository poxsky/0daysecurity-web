import { about } from "@/lib/content";
import { revealDelay } from "@/lib/reveal";

export function AboutSection() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="site-container">
        <h2 className="section-label" id="about-title" data-reveal>Who we are</h2>
        <p className="section-statement" data-reveal style={revealDelay(80)}>
          {about.statement.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <div className="about-copy" data-reveal style={revealDelay(160)}>
          <p>{about.body}</p>
          <a href="#services" className="text-link">
            See what we do <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
