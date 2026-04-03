import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createTldr } from "@/content/entitySchema";
import { cn } from "@/lib/utils";

type UtilityAction = {
  label: string;
  href?: string;
  external?: boolean;
  onClick?: () => void;
};

type AtomicUtilityBlockProps = {
  tldr: string;
  action: UtilityAction;
  title?: string;
  eyebrow?: string;
  highlights?: string[];
  note?: string;
  className?: string;
  actionClassName?: string;
};

export function AtomicUtilityBlock({
  tldr,
  action,
  title = "Quick Summary",
  eyebrow = "30-Second Utility",
  highlights = [],
  note,
  className,
  actionClassName,
}: AtomicUtilityBlockProps) {
  const shortSummary = createTldr(tldr, 150);

  return (
    <aside
      aria-label={title}
      className={cn(
        "rounded-[1.75rem] border bg-card/90 p-6 shadow-sm backdrop-blur sm:p-7",
        className,
      )}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_320px] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">{eyebrow}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-foreground/90">{shortSummary}</p>
          {highlights.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {highlights.slice(0, 3).map((highlight) => (
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

        <div className="rounded-[1.5rem] border bg-muted/20 p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Zap className="h-4 w-4 text-primary" />
            Next step
          </div>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Keep the session active immediately with a direct action instead of making the visitor search for it.
          </p>
          {action.href ? (
            <Button asChild className={cn("mt-5 w-full rounded-full", actionClassName)}>
              <a
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noreferrer noopener" : undefined}
              >
                {action.label}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          ) : (
            <Button type="button" onClick={action.onClick} className={cn("mt-5 w-full rounded-full", actionClassName)}>
              {action.label}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
          {note ? <p className="mt-3 text-xs leading-6 text-muted-foreground">{note}</p> : null}
        </div>
      </div>
    </aside>
  );
}
