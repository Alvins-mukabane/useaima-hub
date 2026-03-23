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
import { faqItems, blogUrl, siteDescription, siteEmail, siteName, siteUrl } from "@/content/siteContent";

const homeStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/android-chrome-512x512.png`,
    email: siteEmail,
    sameAs: [blogUrl],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: siteDescription,
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
      { "@type": "ListItem", position: 1, name: "FinanceAI", url: `${siteUrl}/finance` },
      { "@type": "ListItem", position: 2, name: "HealthAI", url: `${siteUrl}/health` },
      { "@type": "ListItem", position: 3, name: "KidsAI", url: `${siteUrl}/kids` },
      { "@type": "ListItem", position: 4, name: "Blog", url: blogUrl },
    ],
  },
];

const Index = () => (
  <>
    <SEOHead
      title="USEAIMA | AI Systems for Everyday Decisions"
      description={siteDescription}
      path="/"
      keywords={[
        "AI platform",
        "AI assistants",
        "finance AI",
        "health AI",
        "kids AI",
        "social media analytics",
      ]}
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
