import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthorProfileCard } from "@/components/blog/AuthorProfileCard";
import { BlogPost, getBlogAuthor, getCategoriesForPost } from "@/content/blogContent";
import { formatBlogDate } from "@/lib/formatBlogDate";
import { getBlogRoute } from "@/lib/siteMode";
import { cn } from "@/lib/utils";

type BlogArticleCardProps = {
  post: BlogPost;
  variant?: "featured" | "latest" | "compact";
};

export function BlogArticleCard({ post, variant = "latest" }: BlogArticleCardProps) {
  const author = getBlogAuthor(post.authorId);
  const categories = getCategoriesForPost(post).slice(0, 2);
  const articleRoute = getBlogRoute(`/${post.slug}`);
  const isCompact = variant === "compact";
  const isFeatured = variant === "featured";

  if (isCompact) {
    return (
      <article className="rounded-[1.5rem] border border-border/70 bg-card/95 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
        <Link to={articleRoute} className="grid gap-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:items-center">
          <div className="overflow-hidden rounded-[1.25rem] border bg-muted/20">
            <img
              src={post.coverImage.src}
              alt={post.coverImage.alt}
              width={post.coverImage.width}
              height={post.coverImage.height}
              className="h-40 w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category.slug}
                  className={cn("rounded-full px-3 py-1 text-xs font-medium", category.badgeClassName)}
                >
                  {category.title}
                </span>
              ))}
            </div>
            <h3 className="mt-3 text-xl font-semibold leading-tight">{post.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span>{formatBlogDate(post.publishedAt)}</span>
              <span>{post.readingTime}</span>
              <span>{author.name}</span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[1.9rem] border border-border/70 bg-card/95 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        isFeatured && "rounded-[2.2rem]",
      )}
    >
      <Link to={articleRoute} className="flex h-full flex-col">
        <div className="relative overflow-hidden border-b bg-muted/20">
          <img
            src={post.coverImage.src}
            alt={post.coverImage.alt}
            width={post.coverImage.width}
            height={post.coverImage.height}
            className={cn(
              "w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]",
              isFeatured ? "h-[320px]" : "h-[240px]",
            )}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent p-5">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category.slug}
                  className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur"
                >
                  {category.title}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">{post.eyebrow}</p>
          <h3 className={cn("mt-3 font-semibold leading-tight tracking-tight", isFeatured ? "text-[1.9rem]" : "text-[1.45rem]")}>{post.title}</h3>
          <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
          <div className="mt-6 border-t pt-5">
            <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
              <span>{formatBlogDate(post.publishedAt)}</span>
              <span>{post.readingTime}</span>
            </div>
            <div className="mt-4">
              <AuthorProfileCard
                author={author}
                compact
                showLink={false}
                showSocial={false}
                className="border-0 bg-transparent p-0 shadow-none"
              />
            </div>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
              Read article
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
