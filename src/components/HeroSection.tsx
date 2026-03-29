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
        animationDelay: `${delay}ms`,
        animationDuration: "18s",
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
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
        className="pointer-events-none absolute -top-32 left-1/4 h-[480px] w-[480px] rounded-full bg-primary/6 blur-[100px] animate-float"
        delay={0}
      />
      <FloatingShape
        className="pointer-events-none absolute top-20 right-[10%] h-[320px] w-[320px] rounded-full bg-primary/8 blur-[80px] animate-float-reverse"
        delay={3000}
      />
      <FloatingShape
        className="pointer-events-none absolute -bottom-20 left-[15%] h-[260px] w-[260px] rounded-full bg-accent/40 blur-[90px] animate-float"
        delay={6000}
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
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-[60%] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container relative flex min-h-[85vh] flex-col items-center justify-center py-24 text-center">
        <span
          className={`mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-wide text-primary transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-4 blur-[4px]"
          }`}
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          Official USEAIMA Website
        </span>

        <h1
          className={`text-balance text-4xl font-extrabold leading-[1.08] tracking-tight transition-all duration-700 ease-out sm:text-5xl lg:text-6xl ${
            mounted ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-4 blur-[4px]"
          }`}
          style={{ transitionDelay: "120ms", lineHeight: 1.08 }}
        >
          USEAIMA is the official home
          <br />
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            for AI assistants in real life.
          </span>
        </h1>

        <p
          className={`mt-6 max-w-[52ch] text-pretty text-lg leading-relaxed text-muted-foreground transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-4 blur-[4px]"
          }`}
          style={{ transitionDelay: "240ms" }}
        >
          {siteTagline} USEAIMA creates intelligent systems for finance, communication, health, learning, productivity,
          and digital growth. Each product is designed to act like an assistant, not just a dashboard.
        </p>

        <div
          className={`mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-4 blur-[4px]"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          {["Professional startup-style experience", "Unified AI ecosystem", "Privacy-minded product design"].map((item) => (
            <span key={item} className="rounded-full border bg-background/70 px-3 py-1.5">
              {item}
            </span>
          ))}
        </div>

        <div
          className={`mt-10 flex flex-wrap items-center justify-center gap-4 transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-4 blur-[4px]"
          }`}
          style={{ transitionDelay: "360ms" }}
        >
          <Button size="lg" className="gap-2 active:scale-[0.97]" asChild>
            <a href="#products">
              Explore USEAIMA <ArrowRight className="h-4 w-4" />
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
            mounted ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-4 blur-[4px]"
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
              <div className="h-1.5 w-1 rounded-full bg-muted-foreground/50 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
