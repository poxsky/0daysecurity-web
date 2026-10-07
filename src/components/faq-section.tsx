import { faqs } from "@/lib/content";
import { revealDelay } from "@/lib/reveal";

export function FaqSection({ onQuote }: { onQuote: () => void }) {
  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-title">
      <div className="site-container faq-layout">
        <div data-reveal>
          <h2 className="section-label" id="faq-title">FAQ</h2>
          <p className="faq-lead">Straight answers to the questions we hear most often.</p>
          <button type="button" className="text-link" onClick={onQuote} aria-haspopup="dialog">
            Still have questions? Ask us <span aria-hidden="true">↗</span>
          </button>
        </div>
        <div className="faq-list" data-reveal style={revealDelay(100)}>
          {faqs.map((faq, index) => (
            <details className="faq-item" key={faq.question} open={index === 0}>
              <summary>
                <span>{faq.question}</span>
                <span className="faq-toggle" aria-hidden="true" />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
