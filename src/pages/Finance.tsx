import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { DollarSign, TrendingUp, Shield, BarChart3 } from "lucide-react";

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

const Finance = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <>
      <Navbar />
      <main>
        <section className="py-24">
          <div className="container">
            <SectionHeader
              title="FinanceAI"
              subtitle="Your AI-powered financial advisor — tracking, insights, and smarter decisions in one place."
            />
            <div
              ref={ref}
              className={cn("grid gap-6 sm:grid-cols-2 opacity-0", isVisible && "animate-fade-in")}
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
      </main>
      <Footer />
    </>
  );
};

export default Finance;
