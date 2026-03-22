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
import { siteDescription } from "@/content/siteContent";

const Index = () => (
  <>
    <SEOHead
      title="USEAIMA | AI Systems for Everyday Decisions"
      description={siteDescription}
      path="/"
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
