import { ArrowRight, BookOpen, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { siteBrandSummary, siteTagline } from "@/content/siteContent";

function FloatingShape({ className, delay }: { className: string; delay: number }) {
  return (
    <div
      className={className}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    />
  );
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Animated background shapes */}
      <FloatingShape
        className="pointer-events-none absolute -top-32 left-1/4 h-[480px] w-[480px] rounded-full bg-violet-700/10 blur-[100px]"
        delay={0}
      />
      <FloatingShape
        className="pointer-events-none absolute top-20 right-[10%] h-[320px] w-[320px] rounded-full bg-sky-500/10 blur-[80px]"
        delay={3000}
      />
      <FloatingShape
        className="pointer-events-none absolute -bottom-20 left-[15%] h-[260px] w-[260px] rounded-full bg-amber-300/30 blur-[90px]"
        delay={6000}
      />
      <FloatingShape
        className="pointer-events-none absolute bottom-10 right-[18%] h-[220px] w-[220px] rounded-full bg-emerald-400/15 blur-[80px]"
        delay={1800}
      />
      <FloatingShape
        className="pointer-events-none absolute top-1/3 left-[6%] h-[180px] w-[180px] rounded-full bg-orange-900/10 blur-[70px]"
        delay={4500}
      />

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient line accent */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-[60%] bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="container relative flex min-h-[85vh] flex-col items-center justify-center py-24 text-center">
        <span
          className={`mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-4 py-1.5 text-xs font-medium tracking-wide text-violet-700 dark:text-violet-300 transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          Official aima Website
        </span>

        <h1
          className={`text-balance text-4xl font-extrabold leading-[1.08] tracking-tight transition-all duration-700 ease-out sm:text-5xl lg:text-6xl ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "120ms", lineHeight: 1.08 }}
        >
          aima is the official home
          <br />
          <span className="bg-gradient-to-r from-violet-700 via-sky-600 to-amber-500 bg-clip-text text-transparent">
            for AI assistants in real life.
          </span>
        </h1>

        <p
          className={`mt-6 max-w-[52ch] text-pretty text-lg leading-relaxed text-muted-foreground transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "240ms" }}
        >
          {siteTagline} aima creates intelligent systems for finance, communication, productivity,
          and digital growth. Each product is designed to act like an assistant, not just a dashboard.
        </p>

        <div
          className={`mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          {["Dark-purple-led identity", "Linked AI ecosystem", "Privacy-minded product design"].map((item) => (
            <span key={item} className="rounded-full border bg-background/70 px-3 py-1.5">
              {item}
            </span>
          ))}
        </div>

        <div
          className={`mt-10 flex flex-wrap items-center justify-center gap-4 transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "360ms" }}
        >
          <Button size="lg" className="gap-2 active:scale-[0.97]" asChild>
            <a href="#products">
              Explore aima <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" className="gap-2 active:scale-[0.97]" asChild>
            <Link to="/about">
              About Us <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="lg" className="gap-2 active:scale-[0.97]" asChild>
            <a href="https://blog.useaima.com" target="_blank" rel="noopener noreferrer">
              <BookOpen className="h-4 w-4" /> Read Blog
            </a>
          </Button>
        </div>

        <p
          className={`mt-5 text-sm text-muted-foreground transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "420ms" }}
        >
          {siteBrandSummary}
        </p>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 ease-out ${
            mounted ? "opacity-60 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-5 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5">
              <div className="h-1.5 w-1 rounded-full bg-muted-foreground/50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
