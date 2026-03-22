import { DollarSign, Mail, Baby, BarChart3, HeartPulse, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const products = [
  {
    name: "FinanceAI",
    icon: DollarSign,
    status: "Live" as const,
    description: "AI financial advisor that tracks spending behavior, provides real-time insights, and detects risks & opportunities.",
    features: ["Spending behavior tracking", "Real-time financial insights", "Risk & opportunity detection"],
    link: "/finance",
  },
  {
    name: "EmailAI",
    icon: Mail,
    status: "Beta" as const,
    description: "AI email intelligence that summarizes emails, detects deadlines and tasks, and generates daily action plans.",
    features: ["Smart email summaries", "Deadline & task detection", "Daily action plans"],
    link: "#",
  },
  {
    name: "KidsAI",
    icon: Baby,
    status: "Live" as const,
    description: "AI learning and entertainment platform for kids — safe, personalized education combined with games.",
    features: ["Safe environment", "Personalized education", "Interactive games"],
    link: "/kids",
  },
  {
    name: "SocialPulse",
    icon: BarChart3,
    status: "Beta" as const,
    description: "AI social media analytics agent with cross-platform analytics, trend discovery, and content idea generation.",
    features: ["Cross-platform analytics", "Trend discovery", "Algorithm change detection"],
    link: "#",
  },
  {
    name: "HealthAI",
    icon: HeartPulse,
    status: "Coming Soon" as const,
    description: "AI health intelligence system with preventive health insights and smart recommendations.",
    features: ["Preventive health insights", "Smart recommendations", "Health tracking"],
    link: "/health",
  },
];

const statusColors = {
  Live: "bg-primary/10 text-primary",
  Beta: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Coming Soon": "bg-muted text-muted-foreground",
};

export function ProductEcosystem() {
  return (
    <section id="products" className="py-24">
      <div className="container">
        <SectionHeader
          title="The AI Ecosystem"
          subtitle="Intelligent tools that work together to manage and improve every aspect of your daily life."
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

  return (
    <div
      ref={ref}
      className={cn(
        "group relative flex flex-col rounded-xl border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg opacity-0",
        isVisible && "animate-fade-in"
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-105">
          <Icon className="h-5 w-5" />
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
      <Link
        to={product.link}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80 active:scale-[0.97]"
      >
        {product.status === "Coming Soon" ? "Learn More" : "Explore"} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
