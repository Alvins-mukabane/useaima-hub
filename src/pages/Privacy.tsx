import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { siteName, siteUrl } from "@/content/siteContent";

const privacyStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    url: `${siteUrl}/privacy-policy`,
    description: `Privacy Policy for ${siteName}.`,
  },
];

const sections = [
  {
    title: "Overview",
    body: `${siteName} is designed with privacy in mind. We aim to handle user information responsibly, process data securely, and build eva in a way that earns trust instead of taking it for granted.`,
  },
  {
    title: "Information We May Collect",
    body: "Depending on the product or feature, aima may collect account details, contact information, usage data, uploaded content, and technical information needed to operate, improve, and secure the platform.",
  },
  {
    title: "How Information Is Used",
    body: "Information may be used to deliver product features, generate AI-powered insights, improve performance, communicate updates, prevent abuse, and maintain the security and reliability of the platform.",
  },
  {
    title: "Data Sharing",
    body: "aima does not sell personal data. Information may be shared only when necessary to operate the service, comply with legal obligations, protect users, or support essential infrastructure providers acting on our behalf.",
  },
  {
    title: "Security and Retention",
    body: "Reasonable technical and organizational safeguards are used to protect data. Information is retained only for as long as necessary to provide the service, comply with obligations, resolve disputes, and improve operations.",
  },
  {
    title: "User Choice",
    body: "Users may request updates, corrections, or deletion of certain information where applicable. As eva evolves, more account-level controls may be introduced to give users clearer control over their data and preferences.",
  },
];

const Privacy = () => {
  return (
    <>
      <SEOHead
        title="Privacy Policy"
        description="Read how aima approaches privacy, security, and responsible data handling across the platform."
        path="/privacy-policy"
        structuredData={privacyStructuredData}
      />
      <Navbar />
      <main>
        <section className="py-24">
          <div className="container max-w-3xl">
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">Privacy Policy</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              This page explains the general privacy approach for aima and eva. It is intended to provide
              clarity, trust, and a straightforward understanding of how the platform handles information.
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
              <h2 className="text-xl font-semibold">Updates</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                This policy may be updated as the platform evolves. Material updates should be reflected on this page so
                visitors and users can review the latest privacy terms in one place.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Privacy;
