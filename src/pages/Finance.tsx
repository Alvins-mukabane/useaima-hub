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
import { DollarSign, TrendingUp, Shield, BarChart3, ArrowRight } from "lucide-react";
import { toolLinks } from "@/content/siteContent";
import { getBlogPostUrl, getCategoryBySlug, getPostsByProduct } from "@/content/blogContent";

const features = [
  { icon: DollarSign, title: "Smart Spending Tracking", desc: "AI categorizes and analyzes every transaction to reveal patterns you'd never catch manually." },
  { icon: TrendingUp, title: "Real-Time Market Insights", desc: "Stay ahead with AI-curated updates on crypto, stocks, and macro-economic shifts." },
  { icon: Shield, title: "Risk Detection", desc: "Proactive alerts when spending anomalies or financial risks are detected." },
  { icon: BarChart3, title: "Financial Education", desc: "Personalized learning paths to improve your financial literacy over time." },
];

const updates = [
  { date: "Mar 2026", title: "Multi-currency support", tag: "New" },
  { date: "Feb 2026", title: "Crypto portfolio tracking", tag: "New" },
  { date: "Jan 2026", title: "Tax optimization suggestions", tag: "Improvement" },
];

const financeGuides = getPostsByProduct("eva").slice(0, 4);
const financeAgent = getAgentByKey("eva");
const financeBreadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/#products" },
  { label: "eva", href: "/finance" },
];

const financeStructuredData = [
  getAgentStructuredData("eva"),
  createBreadcrumbStructuredData(
    financeBreadcrumbs.map((item) => ({
      label: item.label,
      href: new URL(item.href, "https://useaima.com").toString(),
    })),
  ),
];

const Finance = () => {
  const { ref, isVisible, shouldAnimate } = useScrollReveal();
  return (
    <>
      <SEOHead
        title="eva | AI Financial Intelligence"
        description="Explore eva, the aima financial intelligence product for tracking spending, insights, risk detection, and smarter decisions."
        path="/finance"
        image="/eva-logo.png"
        keywords={["eva", "AI finance assistant", "financial intelligence", "budget analysis"]}
        structuredData={financeStructuredData}
      />
      <Navbar />
      <main id="main-content">
        <section className="py-24">
          <div className="container">
            <SemanticBreadcrumbs items={financeBreadcrumbs} className="mb-8" />
            <div className="mx-auto max-w-4xl rounded-[2rem] border border-emerald-500/15 bg-[linear-gradient(135deg,rgba(16,185,129,0.12),rgba(255,255,255,0.98)),linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,1))] p-8 shadow-sm dark:border-emerald-400/20 dark:bg-[linear-gradient(135deg,rgba(16,185,129,0.18),rgba(15,23,42,0.95)),linear-gradient(180deg,rgba(15,23,42,0.88),rgba(15,23,42,0.95))] sm:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                AIMA Finance Product
              </div>
              <img
                src="/eva-logo.png"
                alt="eva logo"
                width={547}
                height={374}
                className="mt-6 h-20 w-auto max-w-full object-contain sm:h-24"
                draggable="false"
                decoding="async"
              />
              <h1 className="mt-8 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                AI-powered financial intelligence that helps you understand, plan, and grow
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                eva is the finance experience inside aima. It tracks spending, detects unusual patterns, highlights opportunities,
                and turns raw money data into decisions you can actually act on.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="rounded-full bg-emerald-600 text-white hover:bg-emerald-700">
                  <a href={toolLinks.financeAI} target="_blank" rel="noreferrer">
                    Open eva
                  </a>
                </Button>
                <Button variant="outline" asChild className="rounded-full border-emerald-500/25">
                  <a href="https://blog.useaima.com/category/finance" target="_blank" rel="noopener noreferrer">
                    Explore finance guides
                  </a>
                </Button>
              </div>
            </div>
            {financeAgent ? (
              <div className="mx-auto mt-8 max-w-4xl">
                <AtomicUtilityBlock
                  title="Quick Summary for eva"
                  tldr={financeAgent.utilityTldr}
                  action={{
                    label: financeAgent.previewLabel,
                    href: financeAgent.toolHref,
                    external: true,
                  }}
                  highlights={features.slice(0, 3).map((feature) => feature.title)}
                  note="Best for visitors who want to validate the product in under 30 seconds."
                  actionClassName="bg-emerald-600 text-white hover:bg-emerald-700"
                />
              </div>
            ) : null}
            <div className="mx-auto mt-8 max-w-4xl">
              <AgentInsightsChart
                agentKey="eva"
                title="eva utility snapshot"
                description="Interactive bars keep the finance page grounded in practical outcomes like cost savings, anomaly response, and review efficiency."
              />
            </div>
            <div className="mt-16">
              <SectionHeader
                title="What eva helps you do"
                subtitle="From daily awareness to long-term decision support, eva is designed to feel more like a financial copilot than a spreadsheet."
              />
            </div>
            <div
              ref={ref}
              className={cn("grid gap-6 sm:grid-cols-2", shouldAnimate ? "opacity-0" : "opacity-100", isVisible && "animate-fade-in")}
            >
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-md" style={{ animationDelay: `${i * 80}ms` }}>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
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

        <section className="bg-muted/30 py-24">
          <div className="container max-w-2xl">
            <SectionHeader title="Product Updates" />
            <div className="space-y-4">
              {updates.map((u, i) => (
                <div key={i} className="flex items-start gap-4 rounded-lg border bg-card p-4">
                  <span className="shrink-0 text-xs text-muted-foreground">{u.date}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{u.title}</p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{u.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container">
            <SectionHeader
              title="eva Guides"
              subtitle="Finance-related articles from the aima blog that explain the ideas behind eva, including autonomous finance, AI agents, and financial decision support."
            />
            <div className="grid gap-6 md:grid-cols-2">
              {financeGuides.map((post) => {
                const category = getCategoryBySlug(post.categorySlug);

                return (
                  <article key={post.slug} className="group rounded-xl border bg-card p-6 transition-shadow hover:shadow-md">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">{post.eyebrow}</span>
                      {category ? <span>{category.title}</span> : null}
                      <span>{post.readingTime}</span>
                    </div>
                    <a href={getBlogPostUrl(post.slug)} target="_blank" rel="noopener noreferrer" className="block">
                      <h3 className="mt-4 text-xl font-semibold transition-colors group-hover:text-primary">{post.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                    </a>
                    <a
                      href={getBlogPostUrl(post.slug)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      Read article <ArrowRight className="h-4 w-4" />
                    </a>
                  </article>
                );
              })}
            </div>
            <div className="mt-10 flex justify-center">
              <Button variant="outline" asChild className="rounded-full">
                <a href="https://blog.useaima.com/category/finance" target="_blank" rel="noopener noreferrer">
                  View all finance articles
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Finance;
