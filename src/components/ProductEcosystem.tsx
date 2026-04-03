import { DollarSign, Mail, BarChart3, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { toolLinks } from "@/content/siteContent";

const products = [
  {
    name: "eva",
    icon: DollarSign,
    logoSrc: "/eva-logo.png",
    logoFrameClass:
      "flex min-h-16 flex-1 items-center rounded-2xl border border-emerald-500/15 bg-emerald-500/10 px-4 py-3 dark:border-emerald-400/20 dark:bg-emerald-400/10",
    logoImageClass: "h-10 w-auto max-w-full object-contain",
    logoWidth: 547,
    logoHeight: 374,
    status: "Live" as const,
    description: "AI financial advisor that tracks spending behavior, provides real-time insights, and detects risks & opportunities.",
    features: ["Spending behavior tracking", "Real-time financial insights", "Risk & opportunity detection"],
    link: toolLinks.financeAI,
    external: true,
    ctaLabel: "Open eva",
  },
  {
    name: "MailMind",
    icon: Mail,
    status: "Beta" as const,
    description: "AI email intelligence that summarizes emails, detects deadlines and tasks, and generates daily action plans.",
    features: ["Smart email summaries", "Deadline & task detection", "Daily action plans"],
    link: toolLinks.emailAI,
    external: true,
    ctaLabel: "Open MailMind",
  },
  {
    name: "ace",
    icon: BarChart3,
    logoSrc: "/ace-logo.png",
    logoFrameClass:
      "flex min-h-16 flex-1 items-center rounded-2xl border border-amber-700/20 bg-[#2d1c1a] px-4 py-3 dark:border-amber-500/20 dark:bg-[#261715]",
    logoImageClass: "h-11 w-auto max-w-full object-contain",
    logoWidth: 712,
    logoHeight: 465,
    status: "Beta" as const,
    description: "AI social media analytics agent with cross-platform analytics, trend discovery, and content idea generation.",
    features: ["Cross-platform analytics", "Trend discovery", "Algorithm change detection"],
    link: toolLinks.socialPulse,
    external: true,
    ctaLabel: "Open ace",
  },
];

const statusColors = {
  Live: "bg-primary/10 text-primary",
  Beta: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export function ProductEcosystem() {
  return (
    <section id="products" className="py-24">
      <div className="container">
        <SectionHeader
          title="The aima Ecosystem"
          subtitle="A unified collection of AI-powered products built to help users understand context, take action, and make better decisions."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: (typeof products)[number]; index: number }) {
  const { ref, isVisible } = useScrollReveal();
  const Icon = product.icon;
  const hasLogo = "logoSrc" in product;

  return (
    <div
      ref={ref}
      className={cn(
        "group relative flex flex-col rounded-xl border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg opacity-0",
        isVisible && "animate-fade-in"
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div
          className={cn(
            "transition-transform duration-200 group-hover:scale-[1.02]",
            hasLogo
              ? product.logoFrameClass
              : "flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary"
          )}
        >
          {hasLogo ? (
            <img
              src={product.logoSrc}
              alt=""
              aria-hidden="true"
              width={product.logoWidth}
              height={product.logoHeight}
              className={product.logoImageClass}
              draggable="false"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <Icon className="h-5 w-5" />
          )}
        </div>
        <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", statusColors[product.status])}>
          {product.status}
        </span>
      </div>
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
      <ul className="mt-4 space-y-1.5">
        {product.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-primary" />
            {f}
          </li>
        ))}
      </ul>
      {product.external ? (
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80 active:scale-[0.97]"
          aria-label={product.ctaLabel}
        >
          {product.ctaLabel} <ArrowRight className="h-3.5 w-3.5" />
        </a>
      ) : (
        <Link
          to={product.link}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80 active:scale-[0.97]"
        >
          {product.ctaLabel} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
