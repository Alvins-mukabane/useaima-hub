import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { WhatIsUseaimaSection } from "@/components/WhatIsUseaimaSection";
import { ProductEcosystem } from "@/components/ProductEcosystem";
import { TrustSection } from "@/components/TrustSection";
import { BlogPreview } from "@/components/BlogPreview";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import {
  brandKeywords,
  faqItems,
  blogUrl,
  siteBrandSummary,
  siteDescription,
  siteEmail,
  siteName,
  siteTagline,
  siteUrl,
  toolLinks,
} from "@/content/siteContent";

const homeStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    alternateName: ["Useaima", "USEAIMA AI"],
    url: siteUrl,
    logo: `${siteUrl}/android-chrome-512x512.png`,
    image: `${siteUrl}/og-image.svg`,
    description: siteDescription,
    email: siteEmail,
    slogan: siteTagline,
    sameAs: [blogUrl],
    hasPart: [
      {
        "@type": "SoftwareApplication",
        name: "SocialPulse",
        applicationCategory: "BusinessApplication",
        url: toolLinks.socialPulse,
      },
      {
        "@type": "SoftwareApplication",
        name: "FinanceAI",
        applicationCategory: "FinanceApplication",
        url: toolLinks.financeAI,
      },
      {
        "@type": "SoftwareApplication",
        name: "KidsAI",
        applicationCategory: "EducationalApplication",
        url: toolLinks.kidsAI,
      },
      {
        "@type": "SoftwareApplication",
        name: "MailMind",
        alternateName: "EmailAI",
        applicationCategory: "ProductivityApplication",
        url: toolLinks.emailAI,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    alternateName: ["USEAIMA Official Website", "Useaima"],
    url: siteUrl,
    description: siteDescription,
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
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
    name: "USEAIMA Official Website",
    url: siteUrl,
    description: siteBrandSummary,
    about: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
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
      { "@type": "ListItem", position: 1, name: "FinanceAI", url: toolLinks.financeAI },
      { "@type": "ListItem", position: 2, name: "EmailAI", url: toolLinks.emailAI },
      { "@type": "ListItem", position: 3, name: "KidsAI", url: toolLinks.kidsAI },
      { "@type": "ListItem", position: 4, name: "SocialPulse", url: toolLinks.socialPulse },
      { "@type": "ListItem", position: 5, name: "HealthAI", url: `${siteUrl}/health` },
      { "@type": "ListItem", position: 6, name: "Blog", url: blogUrl },
    ],
  },
];

const Index = () => (
  <>
    <SEOHead
      title="USEAIMA Official Website | AI Assistants for Everyday Decisions"
      description={siteDescription}
      path="/"
      keywords={[...brandKeywords]}
      alternateLinks={[
        {
          type: "application/rss+xml",
          title: "USEAIMA Blog Feed",
          href: `${blogUrl}/blog-feed.xml`,
        },
      ]}
      structuredData={homeStructuredData}
    />
    <Navbar />
    <main>
      <HeroSection />
      <WhatIsUseaimaSection />
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
