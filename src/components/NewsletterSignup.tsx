import { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { ref, isVisible, shouldAnimate } = useScrollReveal();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate a short delay for UX feel — replace with real API call when backend is connected
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSubmitted(true);
    toast({
      title: "Subscribed!",
      description: "You'll receive AI insights and product updates.",
    });
  };

  return (
    <section className="py-24">
      <div
        ref={ref}
        className={cn(
          "container mx-auto max-w-xl text-center",
          shouldAnimate ? "opacity-0" : "opacity-100",
          isVisible && "animate-fade-in"
        )}
      >
        <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
          Stay in the loop
        </h2>
        <p className="mt-3 text-muted-foreground">
          Subscribe to get product updates, AI insights, and early access — no spam, ever.
        </p>

        {submitted ? (
          <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border bg-accent/50 p-6">
            <CheckCircle className="h-8 w-8 text-primary" />
            <p className="text-sm font-medium text-accent-foreground">You're subscribed. Check your inbox for a confirmation.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex gap-3">
            <Input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              disabled={loading}
            />
            <Button type="submit" className="gap-2 active:scale-[0.97]" disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {loading ? "Subscribing…" : "Subscribe"}
            </Button>
          </form>
        )}

        <p className="mt-4 text-xs text-muted-foreground">
          We respect your privacy. Review our{" "}
          <Link to="/privacy-policy" className="underline underline-offset-4 hover:text-foreground">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link to="/terms-of-service" className="underline underline-offset-4 hover:text-foreground">
            Terms of Service
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
