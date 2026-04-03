import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className }: Props) {
  const { ref, isVisible, shouldAnimate } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto mb-12 max-w-2xl text-center",
        shouldAnimate ? "opacity-0" : "opacity-100",
        isVisible && "animate-fade-in",
        className
      )}
    >
      <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-pretty text-lg text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
