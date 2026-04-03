import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: {
    icon: "h-8 w-8",
    wordmark: "text-lg",
    gap: "gap-2.5",
  },
  md: {
    icon: "h-9 w-9",
    wordmark: "text-[1.35rem]",
    gap: "gap-3",
  },
  lg: {
    icon: "h-11 w-11",
    wordmark: "text-[1.7rem]",
    gap: "gap-3.5",
  },
} as const;

type BrandLogoProps = {
  className?: string;
  iconOnly?: boolean;
  size?: keyof typeof sizeClasses;
};

export function BrandLogo({ className, iconOnly = false, size = "md" }: BrandLogoProps) {
  const sizeClass = sizeClasses[size];

  if (iconOnly) {
    return (
      <img
        src="/aima-mark-128.png"
        alt="aima"
        width={128}
        height={128}
        className={cn(sizeClass.icon, "shrink-0 rounded-[22%] object-cover", className)}
        draggable="false"
        decoding="async"
      />
    );
  }

  return (
    <span className={cn("inline-flex items-center", sizeClass.gap, className)}>
      <img
        src="/aima-mark-128.png"
        alt=""
        aria-hidden="true"
        width={128}
        height={128}
        className={cn(sizeClass.icon, "shrink-0 rounded-[22%] object-cover")}
        draggable="false"
        decoding="async"
      />
      <span
        className={cn(
          sizeClass.wordmark,
          "font-semibold lowercase tracking-[-0.08em] text-foreground"
        )}
      >
        aima
      </span>
    </span>
  );
}
