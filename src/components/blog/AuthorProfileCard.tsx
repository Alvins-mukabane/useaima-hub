import { Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { BlogAuthorProfile } from "@/content/blogAuthors";
import { getBlogRoute } from "@/lib/siteMode";
import { cn } from "@/lib/utils";

type AuthorProfileCardProps = {
  author: BlogAuthorProfile;
  articleCount?: number;
  latestArticleTitle?: string;
  compact?: boolean;
  showLink?: boolean;
  showSocial?: boolean;
  className?: string;
};

export function AuthorProfileCard({
  author,
  articleCount,
  latestArticleTitle,
  compact = false,
  showLink = true,
  showSocial = true,
  className,
}: AuthorProfileCardProps) {
  return (
    <article
      className={cn(
        "rounded-[1.75rem] border border-border/70 bg-card/95 p-6 shadow-sm",
        compact && "rounded-[1.5rem] p-5",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <img
          src={author.avatar}
          alt={`${author.name} portrait`}
          width={160}
          height={160}
          className={cn("h-20 w-20 rounded-[1.4rem] border object-cover", compact && "h-16 w-16 rounded-2xl")}
          loading="lazy"
          decoding="async"
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Author</p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight">{author.name}</h3>
          <p className="mt-1 text-sm font-medium text-primary">{author.role}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">{compact ? author.shortBio : author.bio}</p>
      {articleCount ? (
        <div className="mt-5 rounded-2xl border bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{articleCount}</span> published article{articleCount === 1 ? "" : "s"}
          {latestArticleTitle ? <span className="block pt-1 text-xs">Latest: {latestArticleTitle}</span> : null}
        </div>
      ) : null}
      {showSocial ? (
        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          <a
            href={author.instagramUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 transition-colors hover:bg-muted/30"
          >
            <Instagram className="h-4 w-4" />
            {author.instagramHandle}
          </a>
          <a
            href={author.facebookUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 transition-colors hover:bg-muted/30"
          >
            <Facebook className="h-4 w-4" />
            {author.facebookLabel}
          </a>
        </div>
      ) : null}
      {showLink ? (
        <Link
          to={getBlogRoute(`/author/${author.slug}`)}
          className="mt-5 inline-flex text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          View author page
        </Link>
      ) : null}
    </article>
  );
}
