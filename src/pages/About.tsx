import { ArrowRight, Bot, BrainCircuit, BriefcaseBusiness, Lightbulb, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { siteName, siteUrl, supportUrl, toolLinks } from "@/content/siteContent";

const focusAreas = [
  {
    title: "Financial clarity",
    description: "Helping users understand spending patterns, anomalies, and better next steps with more context and guidance.",
  },
  {
    title: "AI-assisted reviews",
    description: "Turning raw financial activity into summaries, alerts, and practical decision support people can act on.",
  },
  {
    title: "Trustworthy product focus",
    description: "Building one useful product well before expanding into additional public tools or categories.",
  },
];

const principles = [
  {
    title: "Intelligence Over Data",
    description: "We do not stop at showing information. We interpret it and turn it into guidance people can use.",
    icon: BrainCircuit,
  },
  {
    title: "Simplicity Over Complexity",
    description: "Powerful systems should still feel understandable, approachable, and easy to use.",
    icon: Lightbulb,
  },
  {
    title: "Integration Over Isolation",
    description: "We focus on making eva genuinely useful in real financial workflows before expanding the platform further.",
    icon: BrainCircuit,
  },
];

const aboutStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About aima",
    url: `${siteUrl}/about`,
    description:
      "Learn about aima, the platform behind eva, an AI finance assistant focused on clearer money decisions.",
    isPartOf: siteUrl,
    about: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/aima-mark.png`,
    },
  },
];

const About = () => {
  return (
    <>
      <SEOHead
        title="About aima"
        description="Learn what aima is, what eva does today, and the vision behind the platform."
        path="/about"
        keywords={["about aima", "AI startup", "AI platform", "aima vision"]}
        structuredData={aboutStructuredData}
      />
      <Navbar />
      <main id="main-content">
        <section className="py-24">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-3xl border bg-card p-8 shadow-sm sm:p-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                  <Bot className="h-3.5 w-3.5" />
                  About aima
                </div>
                <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
                  Building a focused AI finance product that actively assists, guides, and improves everyday decisions
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                  aima is a platform built to redefine how people interact with technology by creating AI systems that
                  actively assist, guide, and improve everyday life. Today that work is centered on eva, our AI finance
                  assistant. Instead of building tools that only display data, aima focuses on systems that think,
                  analyze, and provide actionable insights people can use in real financial decisions.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild>
                    <a href={toolLinks.financeAI} target="_blank" rel="noopener noreferrer">
                      Open eva
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={supportUrl} target="_blank" rel="noopener noreferrer">Support & Help</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container">
            <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <article className="rounded-3xl border bg-card p-8 shadow-sm">
                <h2 className="text-2xl font-semibold tracking-tight">What We Do</h2>
                <p className="mt-4 leading-7 text-muted-foreground">
                  We design and develop AI-powered financial experiences that act more like assistants than passive
                  dashboards. The current public focus is eva, and the goal is to make that experience genuinely useful
                  before broadening the product surface.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {focusAreas.map((area) => (
                    <div key={area.title} className="rounded-2xl border bg-background p-5">
                      <h3 className="font-semibold">{area.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{area.description}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-3xl border bg-card p-8 shadow-sm">
                <h2 className="text-2xl font-semibold tracking-tight">Our Vision</h2>
                <p className="mt-4 leading-7 text-muted-foreground">
                  To build a future where AI does not just provide information, but actively helps people make better
                  decisions, manage their lives, and unlock their full potential.
                </p>
                <div className="mt-8 rounded-2xl border bg-background p-6">
                  <h3 className="font-semibold">The Bigger Picture</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    aima is being built with a long-term platform vision, but the current public product is eva. That
                    focus helps the company build trust by shipping one strong finance experience instead of presenting
                    multiple unfinished tools.
                  </p>
                </div>
                <div className="mt-6 rounded-2xl border bg-background p-6">
                  <h3 className="font-semibold">Why aima Exists</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Most financial tools show data but do not explain it, require manual effort, and do not adapt to
                    users. aima exists to change that by building systems that understand, adapt, and act.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-24">
          <div className="container">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-3xl font-bold tracking-tight">Our Approach</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {principles.map((principle) => {
                  const Icon = principle.icon;
                  return (
                    <article key={principle.title} className="rounded-2xl border bg-card p-6 shadow-sm">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold">{principle.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{principle.description}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container">
            <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
              <article className="rounded-3xl border bg-card p-8 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <BriefcaseBusiness className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight">Built By</h2>
                </div>
                <p className="mt-4 leading-7 text-muted-foreground">
                  aima is built by an independent developer focused on AI systems, automation, and cloud and DevOps
                  engineering. The goal is to create practical, real-world AI solutions that go beyond theory and
                  actually help people, starting with finance.
                </p>
              </article>

              <article className="rounded-3xl border bg-card p-8 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight">Why This Matters</h2>
                </div>
                <p className="mt-4 leading-7 text-muted-foreground">
                  Clear About, FAQ, and policy content helps users understand the platform quickly. aima is positioned
                  to feel focused and credible by being honest about what is live today: eva is the product users can
                  trust and explore right now.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
