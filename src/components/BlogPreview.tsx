import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  getLightweightBlogPostUrl,
  getListingCategoryBySlug,
  homepageBlogPreviewPosts,
} from "@/content/blogListings";

const posts = homepageBlogPreviewPosts;

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
  const { ref, isVisible, shouldAnimate } = useScrollReveal();
  const category = getListingCategoryBySlug(post.categorySlug);

  return (
    <article
      ref={ref}
      className={cn(
        "group rounded-xl border bg-card p-6 transition-shadow duration-300 hover:shadow-md",
        shouldAnimate ? "opacity-0" : "opacity-100",
        isVisible && "animate-fade-in"
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-xs font-medium", category?.badgeClassName ?? "bg-muted text-muted-foreground")}>
        {category?.title ?? "Blog"}
      </span>
      <a href={getLightweightBlogPostUrl(post.slug)} target="_blank" rel="noopener noreferrer" className="block">
        <h3 className="mt-3 text-lg font-semibold transition-colors group-hover:text-primary">{post.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
      </a>
    </article>
  );
}
