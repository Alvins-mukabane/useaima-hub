import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-[400px] w-[400px] rounded-full bg-primary/6 blur-[100px]" />

      <div className="container relative flex min-h-[85vh] flex-col items-center justify-center py-24 text-center">
        <span className="mb-6 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-wide text-primary opacity-0 animate-fade-in">
          AI-Powered Ecosystem
        </span>
        <h1
          className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight opacity-0 animate-fade-in sm:text-5xl lg:text-6xl"
          style={{ animationDelay: "100ms" }}
        >
          Build Smarter. Live Better.
          <br />
          <span className="text-primary">Powered by AI.</span>
        </h1>
        <p
          className="mt-6 max-w-[52ch] text-pretty text-lg leading-relaxed text-muted-foreground opacity-0 animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          A unified ecosystem of AI-powered systems designed to manage and improve your life — from finances and communication to learning, health, and digital growth.
        </p>
        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-4 opacity-0 animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          <Button size="lg" className="gap-2 active:scale-[0.97]" asChild>
            <a href="#products">
              Explore Tools <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" className="gap-2 active:scale-[0.97]" asChild>
            <a href="https://blog.useaima.com" target="_blank" rel="noopener noreferrer">
              <BookOpen className="h-4 w-4" /> Read Blog
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
