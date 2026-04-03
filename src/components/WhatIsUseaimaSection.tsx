import { BrainCircuit, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeader } from "./SectionHeader";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { siteBrandSummary } from "@/content/siteContent";

const pillars = [
  {
    title: "AI assistants, not static dashboards",
    description:
      "aima is built to interpret information, surface actions, and guide decisions instead of simply displaying raw data.",
    icon: BrainCircuit,
  },
  {
    title: "One ecosystem across real life",
    description:
      "Finance, communication, productivity, and digital growth tools are designed to work together as a unified platform.",
    icon: Layers3,
  },
  {
    title: "Trust, clarity, and privacy first",
    description:
      "The experience is designed to be simple to understand, professional to use, and responsible about user trust and data handling.",
    icon: ShieldCheck,
  },
];

export function WhatIsaimaSection() {
  return (
    <section id="what-is-aima" className="py-24">
      <div className="container">
        <SectionHeader
          title="What Is aima?"
          subtitle="aima is the official platform behind the aima ecosystem, building intelligent systems that help people make better decisions across finance, communication, productivity, and digital growth."
        />

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border bg-card p-8 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Built to assist, guide, and simplify
            </div>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              {siteBrandSummary} Instead of building tools that only display data, aima focuses on systems that think,
              analyze, and provide actionable insights. The goal is to create AI products that feel like practical
              assistants for everyday life.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href="#products">Explore the Ecosystem</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">About Us</Link>
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
  const { ref, isVisible } = useScrollReveal();

  return (
    <article
      ref={ref}
      className={cn(
        "rounded-2xl border bg-card p-6 shadow-sm opacity-0 transition-shadow hover:shadow-md",
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
