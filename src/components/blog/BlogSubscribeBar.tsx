import { FormEvent, useState } from "react";
import { BellRing, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeToBlogUpdates } from "@/lib/blogApi";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type BlogSubscribeBarProps = {
  compact?: boolean;
};

export function BlogSubscribeBar({ compact = false }: BlogSubscribeBarProps) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      toast({
        title: "Enter a valid email",
        description: "Add the email address that should receive blog updates.",
      });
      return;
    }

    setSubmitting(true);

    try {
      await subscribeToBlogUpdates({
        email: trimmedEmail,
        source: compact ? "blog-article" : "blog-home",
        url: typeof window !== "undefined" ? window.location.href : "",
      });

      setEmail("");
      toast({
        title: "Subscription received",
        description: "This email is now on the aima blog updates list.",
      });
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: error instanceof Error ? error.message : "Try again in a moment.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className={cn(
        "rounded-[2rem] border bg-card p-8 shadow-sm lg:p-10",
        compact && "rounded-[1.75rem] p-7 lg:p-8",
      )}
    >
      <div className="max-w-3xl">
        <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          <BellRing className="h-4 w-4 text-primary" />
          Daily Updates
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">
          {compact ? "Get new blog updates in your inbox" : "Subscribe for daily eva blog notifications"}
        </h2>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Receive new articles, eva updates, and finance insights from the aima blog without having to check
          manually.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="h-12 rounded-full px-5"
          aria-label="Email address"
        />
        <Button type="submit" size="lg" className="rounded-full" disabled={submitting}>
          <BookOpen className="h-4 w-4" />
          {submitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>

      <p className="mt-4 text-xs leading-6 text-muted-foreground">
        By subscribing, readers opt in to blog updates and eva-related notifications from aima.
      </p>
    </section>
  );
}
