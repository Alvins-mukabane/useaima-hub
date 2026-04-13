import { cn } from "@/lib/utils";

type ReadingProgressBarProps = {
  progress: number;
  className?: string;
};

export function ReadingProgressBar({ progress, className }: ReadingProgressBarProps) {
  return (
    <div className={cn("sticky top-[73px] z-40 h-1 bg-border/50", className)} aria-hidden="true">
      <div
        className="h-full bg-gradient-to-r from-primary via-warning to-accent transition-[width] duration-200"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
}
