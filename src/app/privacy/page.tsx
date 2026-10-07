import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Privacy notice — ${siteConfig.name}`,
  description: `How ${siteConfig.name} collects, uses and protects personal data submitted through this website.`,
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "7 October 2026";

const email = (
  <a href={`mailto:${siteConfig.email}`} className="text-white underline underline-offset-4 hover:text-brand">
    {siteConfig.email}
  </a>
);

const sections: { title: string; body: ReactNode }[] = [
  {
    title: "Who we are",
    body: (
      <p>
        {siteConfig.name} (“we”, “us”) provides cybersecurity services, including security testing, compliance and
        advisory. This notice explains how we handle personal data collected through this website, in line with
        India’s Digital Personal Data Protection Act, 2023 (DPDP Act).
      </p>
    ),
  },
  {
    title: "What we collect",
    body: (
      <ul>
        <li>
          <strong>When you request a quote:</strong> your name, work email address, organisation (optional), the
          service you’re interested in and your message. We also record when your request was submitted.
        </li>
        <li>
          <strong>When you call or email us:</strong> the details you choose to share with us.
        </li>
        <li>
          <strong>Technical data:</strong> like most websites, our hosting provider may process technical information
          such as your IP address and browser type to deliver and protect the website.
        </li>
      </ul>
    ),
  },
  {
    title: "Cookies",
    body: (
      <p>
        This website doesn’t use advertising or analytics cookies, and we don’t track visitors. The only cookie we set
        is a security cookie used when our own team signs in to manage enquiries.
      </p>
    ),
  },
  {
    title: "How we use your data",
    body: (
      <>
        <ul>
          <li>To respond to your enquiry and scope the work you’ve asked about.</li>
          <li>To communicate with you about the services you’re interested in.</li>
          <li>To keep records of our business communications.</li>
          <li>To protect this website and our services from abuse and fraud.</li>
        </ul>
        <p>We never sell your personal data or use it for advertising.</p>
      </>
    ),
  },
  {
    title: "Your consent",
    body: (
      <p>
        We process the details you submit on the basis of the consent you give when you send the form. You can withdraw
        your consent at any time by emailing {email}. Withdrawing consent doesn’t affect processing that has already
        taken place.
      </p>
    ),
  },
  {
    title: "Who we share it with",
    body: (
      <p>
        We share personal data only with service providers that help us run this website and our communications — such
        as hosting, database and email delivery providers — and only as far as they need it to provide their services.
        We may also disclose data where the law requires us to.
      </p>
    ),
  },
  {
    title: "How long we keep it",
    body: (
      <p>
        We keep enquiry details only for as long as we need them for the purposes described above, and then delete
        them, unless the law requires us to keep them longer.
      </p>
    ),
  },
  {
    title: "How we protect it",
    body: (
      <p>
        Enquiries are stored in a secured database, access is limited to authorised members of our team, and data is
        sent to us over encrypted connections (HTTPS).
      </p>
    ),
  },
  {
    title: "Your rights",
    body: (
      <>
        <p>Under the DPDP Act, you can ask us to:</p>
        <ul>
          <li>give you a summary of the personal data we hold about you and how we use it;</li>
          <li>correct, complete or update your personal data;</li>
          <li>erase your personal data;</li>
          <li>record a person you nominate to exercise your rights if you’re unable to; and</li>
          <li>address any concern or grievance about how we handle your data.</li>
        </ul>
        <p>
          To make a request, email {email}. If you’re not satisfied with our response, you can complain to the Data
          Protection Board of India.
        </p>
      </>
    ),
  },
  {
    title: "Children",
    body: <p>Our services are intended for businesses and are not directed at children.</p>,
  },
  {
    title: "Changes to this notice",
    body: <p>We may update this notice from time to time. The date at the top shows when it was last changed.</p>,
  },
  {
    title: "Contact us",
    body: (
      <p>
        Questions about this notice or your personal data? Email {email} or call{" "}
        <a href={siteConfig.phone.href} className="text-white underline underline-offset-4 hover:text-brand">
          {siteConfig.phone.display}
        </a>
        .
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div className="doc-shell min-h-screen bg-black text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-5">
          <Link href="/" className="font-logo text-2xl font-bold tracking-tight">
            {siteConfig.name}
          </Link>
          <Link href="/" className="font-mono text-xs text-zinc-400 transition hover:text-white">
            ← Back to website
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 pb-24 pt-14">
        <p className="font-mono text-[11px] tracking-[0.18em] text-brand">LEGAL</p>
        <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">Privacy notice</h1>
        <p className="mt-4 font-mono text-xs text-zinc-500">Last updated: {LAST_UPDATED}</p>

        <div className="mt-12 space-y-12">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-xl font-semibold tracking-tight">{section.title}</h2>
              <div className="mt-4 space-y-4 text-[15.5px] leading-7 text-zinc-300 [&_li]:mt-2 [&_li]:pl-1 [&_strong]:font-medium [&_strong]:text-white [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:marker:text-brand">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
