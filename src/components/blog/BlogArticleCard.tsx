import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BlogPost, getCategoryBySlug } from "@/content/blogContent";
import { getBlogRoute } from "@/lib/siteMode";
import { cn } from "@/lib/utils";

type BlogArticleCardProps = {
  post: BlogPost;
  variant?: "featured" | "latest" | "compact";
};

export function BlogArticleCard({ post, variant = "latest" }: BlogArticleCardProps) {
  const category = getCategoryBySlug(post.categorySlug);
  const isCompact = variant === "compact";

  return (
    <Link
      to={getBlogRoute(`/${post.slug}`)}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        isCompact && "rounded-2xl"
      )}
    >
      <div className={cn("relative overflow-hidden border-b p-6", isCompact ? "min-h-[140px]" : "min-h-[180px]")}>
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-95", post.thumbnailClassName)} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_42%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent_55%)]" />
        <div className="relative flex h-full flex-col justify-between text-white">
          <div className="flex items-start justify-between gap-3">
            <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
              {category?.emoji} {category?.title ?? "USEAIMA"}
            </span>
            <span className="text-xs font-medium text-white/80">{post.readingTime}</span>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">{post.eyebrow}</p>
            <h3 className={cn("mt-3 max-w-[16ch] font-semibold leading-tight", isCompact ? "text-xl" : "text-2xl")}>
              {post.title}
            </h3>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        {category && (
          <span className={cn("inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium", category.badgeClassName)}>
            {category.title}
          </span>
        )}
        <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
        <div className="mt-5 flex items-center justify-between gap-3 text-sm">
          <span className="text-muted-foreground">{post.publishedAt}</span>
          <span className="inline-flex items-center gap-2 font-medium text-foreground">
            Read article
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
