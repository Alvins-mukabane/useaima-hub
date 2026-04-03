import { lazy, startTransition, Suspense, useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { WhatIsaimaSection } from "@/components/WhatIsUseaimaSection";
import { ProductEcosystem } from "@/components/ProductEcosystem";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { organizationSchemaId } from "@/content/entitySchema";
import {
  brandKeywords,
  faqItems,
  blogUrl,
  siteBrandSummary,
  siteDescription,
  siteName,
  siteUrl,
  toolLinks,
} from "@/content/siteContent";

const TrustSection = lazy(() =>
  import("@/components/TrustSection").then((module) => ({
    default: module.TrustSection,
  })),
);
const BlogPreview = lazy(() =>
  import("@/components/BlogPreview").then((module) => ({
    default: module.BlogPreview,
  })),
);
const NewsletterSignup = lazy(() =>
  import("@/components/NewsletterSignup").then((module) => ({
    default: module.NewsletterSignup,
  })),
);
const FAQSection = lazy(() =>
  import("@/components/FAQSection").then((module) => ({
    default: module.FAQSection,
  })),
);

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
      { "@type": "ListItem", position: 2, name: "MailMind", url: toolLinks.emailAI },
      { "@type": "ListItem", position: 3, name: "ace", url: toolLinks.socialPulse },
      { "@type": "ListItem", position: 4, name: "Blog", url: blogUrl },
    ],
  },
];

function DeferredHomeSections() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const activate = () => startTransition(() => setReady(true));

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(activate, { timeout: 1200 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(activate, 400);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const fallback = (
    <>
      <SectionPlaceholder minHeight={420} tinted />
      <SectionPlaceholder minHeight={420} />
      <SectionPlaceholder minHeight={340} />
      <SectionPlaceholder minHeight={420} tinted />
    </>
  );

  if (!ready) {
    return fallback;
  }

  return (
    <Suspense fallback={fallback}>
      <TrustSection />
      <BlogPreview />
      <NewsletterSignup />
      <FAQSection />
    </Suspense>
  );
}

function SectionPlaceholder({ minHeight, tinted = false }: { minHeight: number; tinted?: boolean }) {
  return (
    <section className={tinted ? "bg-muted/30 py-24" : "py-24"} aria-hidden="true">
      <div className="container">
        <div
          className="rounded-[2rem] border bg-muted/20"
          style={{ minHeight }}
        />
      </div>
    </section>
  );
}

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
    <main id="main-content">
      <HeroSection />
      <WhatIsaimaSection />
      <ProductEcosystem />
      <DeferredHomeSections />
    </main>
    <Footer />
  </>
);

export default Index;
