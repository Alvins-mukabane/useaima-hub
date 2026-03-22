import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { ref, isVisible } = useScrollReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-24">
      <div
        ref={ref}
        className={cn(
          "container mx-auto max-w-xl text-center opacity-0",
          isVisible && "animate-fade-in"
        )}
      >
        <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">Stay in the loop</h2>
        <p className="mt-3 text-muted-foreground">Get product updates, AI insights, and early access — no spam.</p>
        {submitted ? (
          <p className="mt-8 rounded-lg border bg-accent/50 p-4 text-sm font-medium text-accent-foreground">
            Thanks! You're on the list. 🎉
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex gap-3">
            <Input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="gap-2 active:scale-[0.97]">
              <Send className="h-4 w-4" /> Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
