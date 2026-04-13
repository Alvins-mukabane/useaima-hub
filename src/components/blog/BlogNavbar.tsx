import { FormEvent, useState } from "react";
import { ChevronDown, Search, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { blogCategories } from "@/content/blogContent";
import { blogUrl, toolLinks } from "@/content/siteContent";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Input } from "@/components/ui/input";
import { BrandLogo } from "@/components/BrandLogo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBlogVisitorTracking } from "@/hooks/useBlogVisitorTracking";
import { getBlogRoute } from "@/lib/siteMode";

export function BlogNavbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  useBlogVisitorTracking();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    navigate(trimmedQuery ? `${getBlogRoute("/search")}?q=${encodeURIComponent(trimmedQuery)}` : getBlogRoute("/search"));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="container py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <Link to={getBlogRoute("/")} className="inline-flex items-center gap-3" aria-label="aima blog home">
              <BrandLogo size="md" />
              <span className="hidden text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground sm:inline-flex">
                Editorial hub for eva
              </span>
            </Link>

            <nav className="flex flex-wrap items-center gap-2 text-sm">
              <Link
                to={getBlogRoute("/")}
                className="rounded-full px-3 py-2 font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Latest
              </Link>
              <a
                href={`${blogUrl}/#authors`}
                className="rounded-full px-3 py-2 font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Authors
              </a>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 rounded-full">
                    Categories
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-72 rounded-2xl">
                  {blogCategories.map((category) => (
                    <DropdownMenuItem key={category.slug} asChild>
                      <Link to={getBlogRoute(`/category/${category.slug}`)} className="flex flex-col items-start py-3">
                        <span className="font-medium">{category.title}</span>
                        <span className="text-xs leading-5 text-muted-foreground">{category.description}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <form onSubmit={handleSubmit} className="relative w-full sm:min-w-[280px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search articles"
                className="rounded-full border-border/70 bg-background pl-10"
                aria-label="Search blog articles"
              />
            </form>
            <ThemeToggle />
            <Button asChild className="rounded-full">
              <a href={toolLinks.eva} target="_blank" rel="noreferrer noopener">
                <Sparkles className="h-4 w-4" />
                Open eva
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
