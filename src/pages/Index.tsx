import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProductEcosystem } from "@/components/ProductEcosystem";
import { BlogPreview } from "@/components/BlogPreview";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";

const Index = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <ProductEcosystem />
      <BlogPreview />
      <NewsletterSignup />
      <FAQSection />
    </main>
    <Footer />
  </>
);

export default Index;
