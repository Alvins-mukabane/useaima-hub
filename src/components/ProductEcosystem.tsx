import { DollarSign, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";
import { toolLinks } from "@/content/siteContent";

const products = [
  {
    name: "eva",
    icon: DollarSign,
    logoSrc: "/eva-logo.png",
    logoFrameClass:
      "flex min-h-16 flex-1 items-center rounded-2xl border border-primary/15 bg-secondary/80 px-4 py-3 shadow-inner",
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
];

const statusColors = {
  Live: "bg-primary/10 text-primary",
  Beta: "bg-accent/20 text-accent-foreground",
};

export function ProductEcosystem() {
  return (
    <section id="products" className="py-24">
      <div className="container">
        <SectionHeader
          title="eva"
          subtitle="eva is the live product from aima. It is an AI finance assistant built to help people understand spending, detect anomalies, and make clearer money decisions with less manual effort."
        />
        <div className="mx-auto grid max-w-3xl gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: (typeof products)[number]; index: number }) {
  const { ref, isVisible, shouldAnimate } = useScrollReveal();
  const Icon = product.icon;
  const hasLogo = "logoSrc" in product;

  return (
    <div
      ref={ref}
      className={cn(
        "group relative flex flex-col rounded-xl border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg",
        shouldAnimate ? "opacity-0" : "opacity-100",
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
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80 active:scale-[0.97]"
        aria-label={product.ctaLabel}
      >
        {product.ctaLabel} <ArrowRight className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
