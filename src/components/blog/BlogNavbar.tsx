import { FormEvent, useState } from "react";
import { ChevronDown, Search, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { blogCategories } from "@/content/blogContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BrandLogo } from "@/components/BrandLogo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getBlogRoute } from "@/lib/siteMode";

export function BlogNavbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    const target = trimmedQuery
      ? `${getBlogRoute("/search")}?q=${encodeURIComponent(trimmedQuery)}`
      : getBlogRoute("/search");
    navigate(target);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="container flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <Link to={getBlogRoute("/")} className="inline-flex items-center" aria-label="USEAIMA blog home">
            <BrandLogo size="md" />
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 rounded-full">
                  Categories
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 rounded-2xl">
                {blogCategories.map((category) => (
                  <DropdownMenuItem key={category.slug} asChild>
                    <Link to={getBlogRoute(`/category/${category.slug}`)} className="flex flex-col items-start py-3">
                      <span className="font-medium">
                        {category.emoji} {category.title}
                      </span>
                      <span className="text-xs leading-5 text-muted-foreground">{category.description}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to={getBlogRoute("/")}
              className="inline-flex items-center rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Latest articles
            </Link>
          </div>
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
          <Button asChild className="rounded-full">
            <a href="https://useaima.com/#products">
              <Sparkles className="h-4 w-4" />
              Explore Tools
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
