"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

type QuoteDialogProps = {
  open: boolean;
  service: string;
  onClose: () => void;
};

export function QuoteDialog({ open, service, onClose }: QuoteDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      setStatus("idle");
      setError("");
      setReference("");
      dialog.querySelector("form")?.reset();
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  async function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = new FormData(event.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries())),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Your request could not be saved. Please try again.");
      setReference(result.reference);
      setStatus("success");
    } catch (err) {
      setError(
        err instanceof Error && err.name !== "TimeoutError"
          ? err.message
          : "The connection timed out. Please try again or contact us directly.",
      );
      setStatus("error");
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="quote-dialog"
      aria-labelledby="quote-dialog-title"
      data-lenis-prevent
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget && status !== "sending") onClose();
      }}
    >
      <div className="quote-dialog-inner">
        <button className="dialog-close" type="button" onClick={onClose} aria-label="Close quote request">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
        <p className="dialog-eyebrow">{siteConfig.name.toUpperCase()} / LET’S TALK</p>
        <h2 id="quote-dialog-title">{status === "success" ? "Request received." : "Get a quote."}</h2>
        {status === "success" ? (
          <div className="quote-success" role="status">
            <span className="success-icon" aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="m8 16 5 5 11-11" /><circle cx="16" cy="16" r="14" />
              </svg>
            </span>
            <p>Thank you for sharing your project. Your scoping request has been saved.</p>
            <div className="request-reference"><span>Your reference</span><strong>{reference}</strong></div>
            <p className="success-note">
              Keep this reference for your enquiry. You can also reach us directly at{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>
            <button type="button" className="submit-quote" onClick={onClose}>Back to the site <span aria-hidden="true">↗</span></button>
          </div>
        ) : (
          <>
            <p className="dialog-intro">Free scoping. Clear next steps.<br />Tell us what you need — testing, audits, compliance or advisory.</p>
            <form onSubmit={submitQuote}>
              <fieldset disabled={status === "sending"}>
                <div className="form-row">
                  <label htmlFor="quote-name">Your name <span aria-hidden="true">*</span>
                    <input id="quote-name" name="name" placeholder="Full name" autoComplete="name" required minLength={2} maxLength={100} />
                  </label>
                  <label htmlFor="quote-email">Work email <span aria-hidden="true">*</span>
                    <input id="quote-email" name="email" type="email" placeholder="you@company.com" autoComplete="email" required maxLength={254} />
                  </label>
                </div>
                <label htmlFor="quote-company">Organisation <span className="field-optional">(optional)</span>
                  <input id="quote-company" name="company" placeholder="Your organisation" autoComplete="organization" maxLength={200} />
                </label>
                <label htmlFor="quote-service">How can we help? <span aria-hidden="true">*</span>
                  <select id="quote-service" name="service" defaultValue={service} key={service} required>
                    {services.map((item) => <option key={item.value} value={item.value}>{item.name}</option>)}
                    <option value="not-sure">Not sure yet — let’s talk</option>
                  </select>
                </label>
                <label htmlFor="quote-message">About your project <span aria-hidden="true">*</span>
                  <textarea id="quote-message" name="message" rows={4} placeholder="What would you like help with? Share your scope, goals or timeline." required minLength={20} maxLength={5000} aria-describedby="message-hint" />
                </label>
                <p className="form-hint" id="message-hint">20–5,000 characters. Please don’t include passwords or sensitive information.</p>
                <div className="form-honeypot" aria-hidden="true">
                  <label htmlFor="quote-website">Website<input id="quote-website" name="website" autoComplete="off" tabIndex={-1} /></label>
                </div>
                {error && <p className="form-error" role="alert">{error}</p>}
                <button type="submit" className="submit-quote" disabled={status === "sending"}>
                  {status === "sending" ? "Sending your request…" : "Request a quote"}
                  {status === "sending" ? <span className="button-spinner" aria-hidden="true" /> : <span aria-hidden="true">↗</span>}
                </button>
                <p className="form-privacy">
                  Your details are only used to respond to your enquiry.{" "}
                  <a href="/privacy" target="_blank" rel="noopener">Privacy notice</a>
                </p>
              </fieldset>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
