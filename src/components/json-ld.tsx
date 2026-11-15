import { faqs } from "@/lib/content";
import { cveList } from "@/lib/research";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "0DAY Security",
    alternateName: ["0day Security", "Zero-Day Security", "0day"],
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    email: siteConfig.email,
    telephone: siteConfig.phone.display,
    sameAs: [
      siteConfig.founder.linkedin,
      "https://github.com/poxsky",
      "https://x.com/poxsky",
    ],
    founder: {
      "@type": "Person",
      name: siteConfig.founder.name,
      jobTitle: siteConfig.founder.role,
      url: siteConfig.founder.linkedin,
      sameAs: [
        siteConfig.founder.linkedin,
        "https://github.com/poxsky",
      ],
    },
    knowsAbout: [
      "Zero-Day Vulnerability Research",
      "Vulnerability Assessment & Penetration Testing (VAPT)",
      "Red Team Operations",
      "Application & Cloud Security",
      "CERT-In Guidelines & Audits",
      "ISO 27001 & SOC 2 Compliance",
      "DPDP Act, 2023",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: siteConfig.phone.display,
      email: siteConfig.email,
      availableLanguage: ["English", "Hindi"],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cybersecurity & Offensive Security Services",
    itemListElement: services.map((s, idx) => ({
      "@type": "Service",
      position: idx + 1,
      name: s.name,
      description: s.summary,
      provider: {
        "@type": "Organization",
        name: "0DAY Security",
      },
      serviceType: s.short,
    })),
  };

  const cveItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Published Vulnerability Disclosures and CVE Research",
    itemListElement: cveList.map((cve, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: `${cve.id}: ${cve.title}`,
      description: cve.description,
      url: cve.nvdUrl || `${siteConfig.url}/#research`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cveItemList) }}
      />
    </>
  );
}
