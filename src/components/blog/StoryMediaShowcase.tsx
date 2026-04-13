import { cn } from "@/lib/utils";

type StoryMediaItem = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

type StoryMediaShowcaseProps = {
  title?: string;
  eyebrow?: string;
  items: StoryMediaItem[];
  compact?: boolean;
  className?: string;
};

export function StoryMediaShowcase({
  title = "Proof of product",
  eyebrow = "Inside eva",
  items,
  compact = false,
  className,
}: StoryMediaShowcaseProps) {
  if (!items.length) return null;

  return (
    <section className={cn("rounded-[2rem] border bg-card/95 p-6 shadow-sm sm:p-8", className)}>
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">{eyebrow}</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      <div className={cn("mt-8 grid gap-5", compact ? "md:grid-cols-2" : "lg:grid-cols-2")}>
        {items.map((item, index) => (
          <figure
            key={`${item.src}-${index}`}
            className={cn(
              "group overflow-hidden rounded-[1.75rem] border bg-[#fff8f2] shadow-sm dark:bg-primary/5",
              index % 2 === 0 ? "animate-fade-in" : "animate-fade-in-right",
            )}
            style={{ animationDelay: `${index * 120}ms` }}
          >
            <div className="relative overflow-hidden">
              <img
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className="h-[420px] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="border-t px-5 py-4 text-sm leading-7 text-muted-foreground">{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
