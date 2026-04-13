import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createTldr } from "@/content/entitySchema";
import { cn } from "@/lib/utils";

type QuickSummaryAsideProps = {
  title?: string;
  tldr: string;
  highlights?: string[];
  action: {
    label: string;
    href: string;
  };
  note?: string;
  className?: string;
};

export function QuickSummaryAside({
  title = "Quick Summary",
  tldr,
  highlights = [],
  action,
  note,
  className,
}: QuickSummaryAsideProps) {
  return (
    <aside
      aria-label={title}
      className={cn(
        "rounded-[1.75rem] border border-border/70 bg-card/95 p-6 shadow-sm backdrop-blur sm:p-7",
        className,
      )}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            30-Second Utility
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-foreground/90">{createTldr(tldr, 150)}</p>
          {highlights.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {highlights.slice(0, 4).map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {highlight}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <div className="rounded-[1.5rem] border bg-[#fff8f2] p-5 dark:bg-primary/5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Next step</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Stay in momentum with a direct path into eva instead of making the reader search for the product after they finish the guide.
          </p>
          <Button asChild className="mt-5 w-full rounded-full">
            <a href={action.href} target="_blank" rel="noreferrer noopener">
              {action.label}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          {note ? <p className="mt-3 text-xs leading-6 text-muted-foreground">{note}</p> : null}
        </div>
      </div>
    </aside>
  );
}
