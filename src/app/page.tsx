import { SecuritySite } from "@/components/security-site";
import { getClientsWithLogos } from "@/lib/client-logos";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  slogan: siteConfig.slogan,
  description: siteConfig.description,
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: siteConfig.phone.href.replace("tel:", ""),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Cybersecurity services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service.name, description: service.summary },
    })),
  },
};

export default function HomePage() {
  const clients = getClientsWithLogos();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <SecuritySite clients={clients} />
    </>
  );
}
