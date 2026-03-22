import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const posts = [
  { title: "How I Built an AI Email Assistant", desc: "A deep dive into building intelligent email workflows that save hours every week.", tag: "Engineering" },
  { title: "The Future of Personal AI Systems", desc: "Why the next decade belongs to AI agents that understand your life, not just your commands.", tag: "Vision" },
  { title: "Why Most People Fail at Managing Money", desc: "Behavioral patterns that sabotage finances — and how AI can intervene before it's too late.", tag: "Finance" },
  { title: "Designing Safe AI for Children", desc: "Principles and guardrails behind KidsAI's approach to age-appropriate AI interactions.", tag: "Kids" },
];

const tagColors: Record<string, string> = {
  Engineering: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Vision: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  Finance: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Kids: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
};

export function BlogPreview() {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container">
        <SectionHeader title="Insights, Systems & AI" subtitle="Ideas and stories from the frontier of personal AI." />
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((p, i) => (
            <BlogCard key={p.title} post={p} index={i} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="gap-2 active:scale-[0.97]" asChild>
            <a href="https://blog.useaima.com" target="_blank" rel="noopener noreferrer">
              Go to Blog <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function BlogCard({ post, index }: { post: (typeof posts)[number]; index: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <article
      ref={ref}
      className={cn(
        "group rounded-xl border bg-card p-6 transition-shadow duration-300 hover:shadow-md opacity-0",
        isVisible && "animate-fade-in"
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-xs font-medium", tagColors[post.tag] || "bg-muted text-muted-foreground")}>
        {post.tag}
      </span>
      <h3 className="mt-3 text-lg font-semibold group-hover:text-primary transition-colors">{post.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.desc}</p>
    </article>
  );
}
