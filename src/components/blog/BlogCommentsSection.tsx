import { FormEvent, useEffect, useMemo, useState } from "react";
import { ExternalLink, Loader2, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createBlogComment, fetchBlogComments, type PublicBlogComment } from "@/lib/blogApi";
import { useToast } from "@/hooks/use-toast";

type BlogCommentsSectionProps = {
  slug: string;
  title: string;
  articleUrl: string;
};

function formatCommentDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function BlogCommentsSection({ slug, title, articleUrl }: BlogCommentsSectionProps) {
  const [comments, setComments] = useState<PublicBlogComment[]>([]);
  const [issueUrl, setIssueUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const commentsHeading = useMemo(
    () => `${comments.length} public comment${comments.length === 1 ? "" : "s"}`,
    [comments.length]
  );

  useEffect(() => {
    let cancelled = false;

    async function loadComments() {
      setLoading(true);

      try {
        const response = await fetchBlogComments(slug);
        if (cancelled) return;
        setComments(response.comments ?? []);
        setIssueUrl(response.issueUrl ?? null);
      } catch (error) {
        if (cancelled) return;
        toast({
          title: "Comments unavailable",
          description: error instanceof Error ? error.message : "Could not load the public discussion right now.",
        });
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadComments();

    return () => {
      cancelled = true;
    };
  }, [slug, toast]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2) {
      toast({
        title: "Name is too short",
        description: "Use at least 2 characters so your comment can be identified clearly.",
      });
      return;
    }

    if (trimmedMessage.length < 8) {
      toast({
        title: "Comment is too short",
        description: "Add a little more detail before posting your comment.",
      });
      return;
    }

    setSubmitting(true);

    try {
      const response = await createBlogComment({
        slug,
        title,
        articleUrl,
        name: trimmedName,
        email: trimmedEmail || undefined,
        message: trimmedMessage,
      });

      setComments((current) => [response.comment, ...current]);
      setIssueUrl(response.issueUrl ?? issueUrl);
      setName("");
      setEmail("");
      setMessage("");

      toast({
        title: "Comment posted",
        description: "Your comment is now visible in the public thread for this article.",
      });
    } catch (error) {
      toast({
        title: "Comment failed",
        description: error instanceof Error ? error.message : "Could not post your comment right now.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="comments" className="mt-16 rounded-[2rem] border bg-card p-8 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Comments</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Join the public discussion</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            Comments posted here are shared publicly so every reader can see the discussion around this article.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium">
          <MessageSquareText className="h-4 w-4 text-primary" />
          {commentsHeading}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
        <div className="grid gap-4 md:grid-cols-[180px_220px_minmax(0,1fr)]">
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            aria-label="Your name"
          />
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email (optional)"
            aria-label="Your email address"
          />
          <Textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Share your thoughts on this article..."
            aria-label="Your comment"
            className="min-h-[140px] resize-y rounded-2xl"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs leading-6 text-muted-foreground">
            New comments can notify the USEAIMA team by email and Slack, so keep the discussion thoughtful and specific.
          </p>
          <Button type="submit" className="rounded-full" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Posting...
              </>
            ) : (
              "Post comment"
            )}
          </Button>
        </div>
      </form>

      <div className="mt-8 flex flex-wrap gap-3">
        {issueUrl ? (
          <a
            href={issueUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/60"
          >
            View source thread
            <ExternalLink className="h-4 w-4" />
          </a>
        ) : null}
      </div>

      <div className="mt-10 space-y-4">
        {loading ? (
          <div className="rounded-[1.5rem] border bg-muted/15 p-8 text-center text-sm text-muted-foreground">
            Loading public comments...
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <article key={comment.id} className="rounded-[1.5rem] border bg-muted/20 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">{comment.name}</p>
                  <p className="text-xs text-muted-foreground">{formatCommentDate(comment.createdAt)}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {comment.name.slice(0, 1).toUpperCase()}
                </div>
              </div>
              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted-foreground">{comment.message}</p>
            </article>
          ))
        ) : (
          <div className="rounded-[1.5rem] border border-dashed bg-muted/15 p-8 text-center">
            <p className="text-lg font-semibold">No public comments yet</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Be the first reader to start the discussion on this article.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
