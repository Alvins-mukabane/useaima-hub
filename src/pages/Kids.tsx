import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AgentInsightsChart } from "@/components/AgentInsightsChart";
import { AtomicUtilityBlock } from "@/components/AtomicUtilityBlock";
import { SemanticBreadcrumbs } from "@/components/SemanticBreadcrumbs";
import { SectionHeader } from "@/components/SectionHeader";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { createBreadcrumbStructuredData, getAgentByKey, getAgentStructuredData } from "@/content/entitySchema";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { ShieldCheck, Gamepad2, GraduationCap, Heart } from "lucide-react";
import { toolLinks } from "@/content/siteContent";

const features = [
  { icon: ShieldCheck, title: "Safe Environment", desc: "Every interaction is filtered and age-appropriate. Parental controls built in from day one." },
  { icon: GraduationCap, title: "Personalized Learning", desc: "AI adapts to each child's pace and interests, making education feel like play." },
  { icon: Gamepad2, title: "Interactive Games", desc: "Educational games that reinforce concepts while keeping kids genuinely entertained." },
  { icon: Heart, title: "Parental Trust", desc: "Full transparency on what your child interacts with. Weekly progress reports and content logs." },
];

const kidsStructuredData = [
  getAgentStructuredData("ally"),
  createBreadcrumbStructuredData([
    { label: "Home", href: "https://useaima.com/" },
    { label: "Products", href: "https://useaima.com/#products" },
    { label: "ally", href: "https://useaima.com/kids" },
  ]),
];
const allyAgent = getAgentByKey("ally");
const kidsBreadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/#products" },
  { label: "ally", href: "/kids" },
];

const Kids = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <>
      <SEOHead
        title="ally | Safe AI Learning for Kids"
        description="Discover ally, the aima learning and entertainment experience built to be safe, personalized, and engaging for children."
        path="/kids"
        image="/ally-logo.png"
        keywords={["ally", "AI learning for kids", "safe AI for children", "children's education technology"]}
        structuredData={kidsStructuredData}
      />
      <Navbar />
      <main>
        <section className="py-24">
          <div className="container">
            <SemanticBreadcrumbs items={kidsBreadcrumbs} className="mb-8" />
            <div className="mx-auto max-w-4xl rounded-[2rem] border border-violet-500/20 bg-[linear-gradient(135deg,rgba(139,92,246,0.16),rgba(255,255,255,0.98)),radial-gradient(circle_at_top_right,rgba(250,204,21,0.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,255,255,1))] p-8 shadow-sm dark:border-violet-400/20 dark:bg-[linear-gradient(135deg,rgba(139,92,246,0.2),rgba(23,16,39,0.95)),radial-gradient(circle_at_top_right,rgba(250,204,21,0.14),transparent_32%),linear-gradient(180deg,rgba(23,16,39,0.9),rgba(23,16,39,0.96))] sm:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
                AIMA Kids Product
              </div>
              <img src="/ally-logo.png" alt="ally" className="mt-6 h-20 w-auto max-w-full object-contain sm:h-24" draggable="false" />
              <h1 className="mt-8 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                Safe, playful AI learning designed for curious young minds
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                ally is the kids learning experience inside aima. It combines safety, guided exploration, playful education,
                and parent-friendly trust signals in one friendly product.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="rounded-full bg-violet-600 text-white hover:bg-violet-700">
                  <a href={toolLinks.kidsAI} target="_blank" rel="noreferrer">
                    Open ally
                  </a>
                </Button>
                <Button variant="outline" asChild className="rounded-full border-violet-500/25">
                  <a href="https://blog.useaima.com/category/kids-learning" target="_blank" rel="noopener noreferrer">
                    Explore learning guides
                  </a>
                </Button>
              </div>
            </div>
            {allyAgent ? (
              <div className="mx-auto mt-8 max-w-4xl">
                <AtomicUtilityBlock
                  title="Quick Summary for ally"
                  tldr={allyAgent.utilityTldr}
                  action={{
                    label: allyAgent.previewLabel,
                    href: allyAgent.toolHref,
                    external: true,
                  }}
                  highlights={features.slice(0, 3).map((feature) => feature.title)}
                  note="This gives new visitors a fast answer plus a direct way to validate the product."
                  actionClassName="bg-violet-600 text-white hover:bg-violet-700"
                />
              </div>
            ) : null}
            <div className="mx-auto mt-8 max-w-4xl">
              <AgentInsightsChart
                agentKey="ally"
                title="ally trust and learning snapshot"
                description="These interactive signals reinforce the main promise quickly: safer sessions, clearer parent trust, and better learning momentum."
              />
            </div>
            <div className="mt-16">
              <SectionHeader
                title="What ally helps families do"
                subtitle="ally brings together safety, personalized learning, and playful exploration so children can learn with more structure and joy."
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
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Kids;
