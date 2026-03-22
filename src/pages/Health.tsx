import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { SEOHead } from "@/components/SEOHead";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { HeartPulse, Brain, Activity, Leaf } from "lucide-react";

const features = [
  { icon: HeartPulse, title: "Preventive Health Insights", desc: "AI-driven analysis that identifies health risks before they become problems." },
  { icon: Brain, title: "Mental Wellness Tracking", desc: "Monitor stress patterns and receive evidence-based coping recommendations." },
  { icon: Activity, title: "Activity Intelligence", desc: "Go beyond step counts — understand how your movement patterns affect overall health." },
  { icon: Leaf, title: "Nutrition Guidance", desc: "Personalized meal insights based on your goals, preferences, and health data." },
];

const Health = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <>
      <SEOHead
        title="HealthAI"
        description="Learn about HealthAI, the upcoming USEAIMA health intelligence product focused on preventive insights and smarter recommendations."
        path="/health"
      />
      <Navbar />
      <main>
        <section className="py-24">
          <div className="container">
            <SectionHeader
              title="HealthAI"
              subtitle="AI health intelligence — preventive insights, smart recommendations, and a healthier life."
            />
            <div className="mx-auto mb-8 max-w-md text-center">
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">Coming Soon</span>
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Health;
