import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "h-8",
  md: "h-9",
  lg: "h-11",
} as const;

type BrandLogoProps = {
  className?: string;
  iconOnly?: boolean;
  size?: keyof typeof sizeClasses;
};

export function BrandLogo({ className, iconOnly = false, size = "md" }: BrandLogoProps) {
  const sizeClass = sizeClasses[size];

  if (iconOnly) {
    return <img src="/useaima-mark.svg" alt="USEAIMA" className={cn(sizeClass, "w-auto shrink-0", className)} draggable="false" />;
  }

  return (
    <span className={cn("inline-flex items-center", className)}>
      <img src="/useaima-logo.svg" alt="USEAIMA" className={cn(sizeClass, "w-auto shrink-0 dark:hidden")} draggable="false" />
      <img src="/useaima-logo-dark.svg" alt="USEAIMA" className={cn(sizeClass, "hidden w-auto shrink-0 dark:block")} draggable="false" />
    </span>
  );
}
