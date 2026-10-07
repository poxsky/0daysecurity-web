import { processCopy, processSteps } from "@/lib/content";
import { revealDelay } from "@/lib/reveal";

export function ProcessSection() {
  return (
    <section className="process-section" id="process" aria-labelledby="process-title">
      <div className="site-container">
        <h2 className="section-label" id="process-title" data-reveal>How we work</h2>
        <p className="section-statement" data-reveal style={revealDelay(80)}>
          {processCopy.statement.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <ol className="process-grid">
          {processSteps.map((step, index) => (
            <li className="process-step" key={step.number} data-reveal style={revealDelay(index * 100)}>
              <span className="process-number" aria-hidden="true">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
