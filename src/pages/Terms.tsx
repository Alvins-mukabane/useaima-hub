import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { siteName, siteUrl } from "@/content/siteContent";

const termsStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service",
    url: `${siteUrl}/terms-of-service`,
    description: `Terms of Service for ${siteName}.`,
  },
];

const sections = [
  {
    title: "Use of the Platform",
    body: `${siteName} provides AI-powered tools, content, and product experiences intended to assist users. By using the platform, users agree to use it lawfully, responsibly, and in a way that does not abuse the service or harm others.`,
  },
  {
    title: "Product Availability",
    body: "Some features may be experimental, in beta, limited, or changed over time. aima may update, improve, suspend, or remove features as the platform evolves.",
  },
  {
    title: "No Professional Advice",
    body: "aima may provide recommendations, analysis, and insights, but it does not replace professional financial, legal, medical, educational, or other licensed advice. Users remain responsible for reviewing outputs and making final decisions.",
  },
  {
    title: "Accounts and Access",
    body: "Some features may require registration, subscriptions, or controlled access. Users are responsible for maintaining accurate information and protecting their own credentials where accounts are used.",
  },
  {
    title: "Intellectual Property",
    body: "The aima brand, site content, interface design, and platform materials are protected by applicable intellectual property rights. Users may not copy, resell, misuse, or reverse-engineer platform materials except where allowed by law.",
  },
  {
    title: "Limitation of Liability",
    body: "The platform is provided on an as-available basis. While aima aims to provide useful and reliable systems, no output should be treated as guaranteed, error-free, or universally applicable. Users should exercise judgment when relying on platform recommendations.",
  },
];

const Terms = () => {
  return (
    <>
      <SEOHead
        title="Terms of Service"
        description="Read the terms that govern use of the aima platform, eva, and AI-powered recommendations."
        path="/terms-of-service"
        structuredData={termsStructuredData}
      />
      <Navbar />
      <main>
        <section className="py-24">
          <div className="container max-w-3xl">
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">Terms of Service</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              These terms provide a clear baseline for how aima and eva are offered and how users are expected to use
              the platform responsibly.
            </p>

            <div className="mt-10 space-y-6">
              {sections.map((section) => (
                <article key={section.title} className="rounded-2xl border bg-card p-6 shadow-sm">
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                  <p className="mt-3 leading-7 text-muted-foreground">{section.body}</p>
                </article>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border bg-muted/30 p-6">
              <h2 className="text-xl font-semibold">Changes to These Terms</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                As the platform evolves, these terms may also be updated. Continued use of the service after updates means
                users accept the latest published version.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Terms;
