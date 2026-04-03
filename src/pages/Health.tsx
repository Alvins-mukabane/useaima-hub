import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AgentInsightsChart } from "@/components/AgentInsightsChart";
import { AtomicUtilityBlock } from "@/components/AtomicUtilityBlock";
import { SemanticBreadcrumbs } from "@/components/SemanticBreadcrumbs";
import { SectionHeader } from "@/components/SectionHeader";
import { SEOHead } from "@/components/SEOHead";
import { createBreadcrumbStructuredData, getAgentByKey, getAgentStructuredData } from "@/content/entitySchema";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { HeartPulse, Brain, Activity, Leaf } from "lucide-react";

const features = [
  { icon: HeartPulse, title: "Preventive Health Insights", desc: "AI-driven analysis that identifies health risks before they become problems." },
  { icon: Brain, title: "Mental Wellness Tracking", desc: "Monitor stress patterns and receive evidence-based coping recommendations." },
  { icon: Activity, title: "Activity Intelligence", desc: "Go beyond step counts — understand how your movement patterns affect overall health." },
  { icon: Leaf, title: "Nutrition Guidance", desc: "Personalized meal insights based on your goals, preferences, and health data." },
];

const roadmap = [
  { phase: "Signal Layer", detail: "Build a practical health status view that turns habits and routines into clearer preventive signals." },
  { phase: "Guidance Layer", detail: "Translate those signals into simple next-step recommendations instead of passive charts." },
  { phase: "Trust Layer", detail: "Add more transparent health summaries so users know what the agent is watching and why." },
];

const healthStructuredData = [
  getAgentStructuredData("healthai"),
  createBreadcrumbStructuredData([
    { label: "Home", href: "https://useaima.com/" },
    { label: "Products", href: "https://useaima.com/#products" },
    { label: "HealthAI", href: "https://useaima.com/health" },
  ]),
];
const healthAgent = getAgentByKey("healthai");
const healthBreadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/#products" },
  { label: "HealthAI", href: "/health" },
];

const Health = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <>
      <SEOHead
        title="HealthAI"
        description="Learn about HealthAI, the upcoming aima health intelligence product focused on preventive insights and smarter recommendations."
        path="/health"
        keywords={["HealthAI", "AI health assistant", "preventive health insights", "health intelligence"]}
        structuredData={healthStructuredData}
      />
      <Navbar />
      <main>
        <section className="py-24">
          <div className="container">
            <SemanticBreadcrumbs items={healthBreadcrumbs} className="mb-8" />
            <SectionHeader
              title="HealthAI"
              subtitle="AI health intelligence — preventive insights, smart recommendations, and a healthier life."
            />
            <div id="health-status" className="mx-auto mb-8 max-w-md text-center">
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">Coming Soon</span>
            </div>
            {healthAgent ? (
              <div className="mx-auto mb-8 max-w-4xl">
                <AtomicUtilityBlock
                  title="Quick Summary for HealthAI"
                  tldr={healthAgent.utilityTldr}
                  action={{ label: healthAgent.previewLabel, href: "#health-roadmap" }}
                  highlights={features.slice(0, 3).map((feature) => feature.title)}
                  note="HealthAI is still evolving, so the fastest useful action is to check the rollout status and direction."
                />
              </div>
            ) : null}
            <div className="mx-auto mb-12 max-w-4xl">
              <AgentInsightsChart
                agentKey="healthai"
                title="HealthAI readiness snapshot"
                description="A lightweight interactive view makes the future direction concrete without relying on static mockups."
              />
            </div>
            <div
              ref={ref}
              className={cn("grid gap-6 sm:grid-cols-2 opacity-0", isVisible && "animate-fade-in")}
            >
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-md">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                  </div>
                );
              })}
            </div>

            <div id="health-roadmap" className="mx-auto mt-16 max-w-4xl rounded-[1.75rem] border bg-card p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Status & Roadmap</p>
              <div className="mt-6 grid gap-4">
                {roadmap.map((item) => (
                  <div key={item.phase} className="rounded-2xl border bg-muted/20 p-5">
                    <h2 className="text-lg font-semibold">{item.phase}</h2>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Health;
