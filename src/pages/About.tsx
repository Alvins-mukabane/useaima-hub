import { ArrowRight, Bot, BrainCircuit, BriefcaseBusiness, Layers3, Lightbulb, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { siteName, siteUrl } from "@/content/siteContent";

const focusAreas = [
  {
    title: "Finance",
    description: "Helping users understand and improve their financial decisions with more context and guidance.",
  },
  {
    title: "Communication",
    description: "Turning emails and messages into structured insights, tasks, priorities, and actions.",
  },
  {
    title: "Learning and Kids",
    description: "Creating safe, engaging, and practical AI-powered learning environments for different ages and needs.",
  },
  {
    title: "Health",
    description: "Exploring intelligent systems for personal health awareness, prevention, and better decision support.",
  },
  {
    title: "Digital Growth",
    description: "Providing creators, marketers, and operators with tools powered by actionable data and AI insight.",
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
    description: "Every product is designed to work as part of one ecosystem rather than as a disconnected tool.",
    icon: Layers3,
  },
];

const aboutStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About USEAIMA",
    url: `${siteUrl}/about`,
    description:
      "Learn about USEAIMA, an AI-powered platform building intelligent systems for finance, communication, learning, health, productivity, and digital growth.",
    isPartOf: siteUrl,
    about: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/android-chrome-512x512.png`,
    },
  },
];

const About = () => {
  return (
    <>
      <SEOHead
        title="About USEAIMA"
        description="Learn what USEAIMA is, what the platform builds, and the vision behind its AI-powered ecosystem."
        path="/about"
        keywords={["about USEAIMA", "AI startup", "AI platform", "USEAIMA vision"]}
        structuredData={aboutStructuredData}
      />
      <Navbar />
      <main>
        <section className="py-24">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-3xl border bg-card p-8 shadow-sm sm:p-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                  <Bot className="h-3.5 w-3.5" />
                  About USEAIMA
                </div>
                <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
                  Building AI systems that actively assist, guide, and improve everyday life
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                  USEAIMA is a platform built to redefine how people interact with technology by creating AI systems that
                  actively assist, guide, and improve everyday life. Instead of building tools that only display data,
                  USEAIMA focuses on systems that think, analyze, and provide actionable insights.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild>
                    <Link to="/">
                      Explore the platform
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/terms-of-service">Terms of Service</Link>
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
                  We design and develop AI-powered applications across key areas of life. Each product is built with the
                  goal of acting like a personal assistant, not just a tool.
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
                    USEAIMA is not just a collection of apps. It is an evolving ecosystem of AI agents that can understand
                    context, analyze behavior, suggest actions, and improve decision-making over time.
                  </p>
                </div>
                <div className="mt-6 rounded-2xl border bg-background p-6">
                  <h3 className="font-semibold">Why USEAIMA Exists</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Most tools today show data but do not explain it, require manual effort, and do not adapt to users.
                    USEAIMA exists to change that by building systems that understand, adapt, and act.
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
                  USEAIMA is built by an independent developer focused on AI systems, automation, and cloud and DevOps
                  engineering. The goal is to create practical, real-world AI solutions that go beyond theory and actually
                  help people.
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
                  Clear About, FAQ, and policy content helps users understand the platform quickly. USEAIMA is positioned to
                  feel like a serious startup platform with clear thinking, visible trust signals, and a strong product
                  direction.
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
