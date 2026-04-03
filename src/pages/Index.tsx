import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { WhatIsaimaSection } from "@/components/WhatIsUseaimaSection";
import { ProductEcosystem } from "@/components/ProductEcosystem";
import { TrustSection } from "@/components/TrustSection";
import { BlogPreview } from "@/components/BlogPreview";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { organizationSchemaId } from "@/content/entitySchema";
import {
  brandKeywords,
  faqItems,
  blogUrl,
  siteBrandSummary,
  siteDescription,
  siteUrl,
  toolLinks,
} from "@/content/siteContent";

const homeStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    name: siteName,
    alternateName: ["aima Official Website", "aima"],
    url: siteUrl,
    inLanguage: "en-US",
    description: siteDescription,
    publisher: {
      "@id": organizationSchemaId,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${blogUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}#homepage`,
    name: "aima Official Website",
    url: siteUrl,
    description: siteBrandSummary,
    about: {
      "@id": organizationSchemaId,
    },
    isPartOf: {
      "@id": `${siteUrl}#website`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "eva", url: toolLinks.financeAI },
      { "@type": "ListItem", position: 2, name: "EmailAI", url: toolLinks.emailAI },
      { "@type": "ListItem", position: 3, name: "ally", url: toolLinks.kidsAI },
      { "@type": "ListItem", position: 4, name: "ace", url: toolLinks.socialPulse },
      { "@type": "ListItem", position: 5, name: "HealthAI", url: `${siteUrl}/health` },
      { "@type": "ListItem", position: 6, name: "Blog", url: blogUrl },
    ],
  },
];

const Index = () => (
  <>
    <SEOHead
      title="aima Official Website | AI Assistants for Everyday Decisions"
      description={siteDescription}
      path="/"
      keywords={[...brandKeywords]}
      alternateLinks={[
        {
          type: "application/rss+xml",
          title: "aima Blog Feed",
          href: `${blogUrl}/blog-feed.xml`,
        },
      ]}
      structuredData={homeStructuredData}
    />
    <Navbar />
    <main>
      <HeroSection />
      <WhatIsaimaSection />
      <ProductEcosystem />
      <TrustSection />
      <BlogPreview />
      <NewsletterSignup />
      <FAQSection />
    </main>
    <Footer />
  </>
);

export default Index;
