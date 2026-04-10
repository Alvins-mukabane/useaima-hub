import { BrainCircuit, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeader } from "./SectionHeader";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { siteBrandSummary } from "@/content/siteContent";

const pillars = [
  {
    title: "A company focused on useful AI",
    description:
      "aima focuses on AI systems that interpret signals, surface actions, and guide decisions instead of stopping at passive reporting.",
    icon: BrainCircuit,
  },
  {
    title: "One live product with a clear purpose",
    description:
      "eva is the current public product. It is built to help users review spending, spot patterns, detect anomalies, and make better financial decisions faster.",
    icon: BrainCircuit,
  },
  {
    title: "Product, support, and education together",
    description:
      "The main site, blog, and support hub are designed to work together so visitors can understand the product, explore guides, and get help quickly.",
    icon: ShieldCheck,
  },
];

export function WhatIsaimaSection() {
  return (
    <section id="what-is-aima" className="py-24">
      <div className="container">
        <SectionHeader
          title="What Is aima?"
          subtitle="aima is the company building eva, the AI finance assistant designed to turn financial activity into clearer decisions, useful alerts, and practical support."
        />

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border bg-card p-8 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Built to assist, guide, and simplify
            </div>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              {siteBrandSummary} Instead of presenting a broad list of unfinished products, aima is intentionally
              focused on building eva well first. That means clearer product positioning, stronger support, and a more
              credible experience for users, partners, and startup programs reviewing the company.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href="#products">Explore eva</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">About Us</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/support">Support</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {pillars.map((pillar, index) => (
              <PillarCard key={pillar.title} index={index} {...pillar} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PillarCard({
  title,
  description,
  icon: Icon,
  index,
}: {
  title: string;
  description: string;
  icon: typeof BrainCircuit;
  index: number;
}) {
  const { ref, isVisible, shouldAnimate } = useScrollReveal();

  return (
    <article
      ref={ref}
      className={cn(
        "rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md",
        shouldAnimate ? "opacity-0" : "opacity-100",
        isVisible && "animate-fade-in",
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-base font-semibold">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
      </div>
    </article>
  );
}
