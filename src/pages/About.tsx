import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const About = () => {
  const { ref, isVisible } = useScrollReveal();
  const { ref: ref2, isVisible: isVisible2 } = useScrollReveal();

  return (
    <>
      <Navbar />
      <main>
        <section className="py-24">
          <div className="container max-w-2xl">
            <div
              ref={ref}
              className={cn("opacity-0", isVisible && "animate-fade-in")}
            >
              <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">About USEAIMA</h1>
              <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  USEAIMA is an AI-driven platform focused on building intelligent systems that act as assistants in everyday life. We believe AI shouldn't be a novelty — it should be a quiet, reliable partner in the decisions that shape your day.
                </p>
                <p>
                  From managing finances and triaging email to keeping kids safe while they learn, each product in our ecosystem is designed to solve a real problem with thoughtful, human-centered AI.
                </p>
              </div>
            </div>

            <div
              ref={ref2}
              className={cn("mt-16 opacity-0", isVisible2 && "animate-fade-in")}
            >
              <h2 className="text-2xl font-bold tracking-tight">Our Mission</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                To create AI systems that don't just show data — but help people make better decisions. We're not building another dashboard. We're building an ecosystem of agents that understand context, anticipate needs, and act on your behalf.
              </p>
              <div className="mt-8 rounded-xl border bg-card p-6">
                <h3 className="font-semibold">The Builder's Story</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  USEAIMA started as a solo project — one developer frustrated by the gap between what AI could do and what everyday tools actually offered. No venture capital, no 50-person team. Just a conviction that personal AI should be personal, practical, and accessible to everyone.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
