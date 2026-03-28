import { useState } from "react";
import { Check, Heart, MessageCircle, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { sendBlogEvent } from "@/lib/blogApi";
import { getOrCreateBlogVisitorId } from "@/hooks/useBlogVisitorTracking";
import { cn } from "@/lib/utils";
import { useBlogEngagement } from "@/lib/blogEngagement";
import { useToast } from "@/hooks/use-toast";

type BlogEngagementBarProps = {
  slug: string;
  title: string;
  url: string;
  variant?: "card" | "article";
  commentHref?: string;
  onCommentClick?: () => void;
};

export function BlogEngagementBar({
  slug,
  title,
  url,
  variant = "article",
  commentHref,
  onCommentClick,
}: BlogEngagementBarProps) {
  const { liked, likes, shares, toggleLike, registerShare } = useBlogEngagement(slug);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const notifyEvent = (type: "like" | "share") => {
    if (typeof window === "undefined") return;

    void sendBlogEvent({
      type,
      slug,
      title,
      url,
      path: window.location.pathname,
      visitorId: getOrCreateBlogVisitorId(),
    }).catch(() => {
      // Quietly fail so interaction UX stays smooth even if the webhook layer is unavailable.
    });
  };

  const handleLike = () => {
    const nextLiked = !liked;
    toggleLike();

    if (nextLiked) {
      notifyEvent("like");
    }
  };

  const recordShare = () => {
    registerShare();
    notifyEvent("share");
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          url,
          text: title,
        });
        recordShare();
        return;
      }

      await navigator.clipboard.writeText(url);
      recordShare();
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
      toast({
        title: "Link copied",
        description: "The article URL is ready to share.",
      });
    } catch {
      toast({
        title: "Share unavailable",
        description: "Copy the page URL manually to share this article.",
      });
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      recordShare();
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
      toast({
        title: "Link copied",
        description: "The article URL is ready to share.",
      });
    } catch {
      toast({
        title: "Copy failed",
        description: "Your browser blocked clipboard access for this action.",
      });
    }
  };

  const isArticle = variant === "article";
  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  const commentAction = commentHref ? (
    <Link
      to={commentHref}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/60",
        !isArticle && "px-3 py-1.5 text-xs"
      )}
    >
      <MessageCircle className={cn("h-4 w-4", !isArticle && "h-3.5 w-3.5")} />
      <span>{isArticle ? "Comments" : "Comment"}</span>
    </Link>
  ) : (
    <button
      type="button"
      onClick={onCommentClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/60",
        !isArticle && "px-3 py-1.5 text-xs"
      )}
    >
      <MessageCircle className={cn("h-4 w-4", !isArticle && "h-3.5 w-3.5")} />
      <span>{isArticle ? "Comments" : "Comment"}</span>
    </button>
  );

  return (
    <div className={cn("flex flex-col gap-3", !isArticle && "gap-2")}>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleLike}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/60",
            liked && "border-primary/40 bg-primary/10 text-primary",
            !isArticle && "px-3 py-1.5 text-xs"
          )}
        >
          <Heart className={cn("h-4 w-4", liked && "fill-current", !isArticle && "h-3.5 w-3.5")} />
          <span>{likes}</span>
        </button>

        {commentAction}

        <button
          type="button"
          onClick={handleShare}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/60",
            !isArticle && "px-3 py-1.5 text-xs"
          )}
        >
          <Share2 className={cn("h-4 w-4", !isArticle && "h-3.5 w-3.5")} />
          <span>{shares}</span>
        </button>
      </div>

      {isArticle ? (
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" className="rounded-full" onClick={handleCopyLink}>
            {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
            {copied ? "Copied" : "Copy link"}
          </Button>
          <Button asChild type="button" variant="outline" className="rounded-full">
            <a href={xShareUrl} target="_blank" rel="noreferrer" onClick={recordShare}>
              Share on X
            </a>
          </Button>
          <Button asChild type="button" variant="outline" className="rounded-full">
            <a href={linkedInShareUrl} target="_blank" rel="noreferrer" onClick={recordShare}>
              Share on LinkedIn
            </a>
          </Button>
        </div>
      ) : null}
    </div>
  );
}
