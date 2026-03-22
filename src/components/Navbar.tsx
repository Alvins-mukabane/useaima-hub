import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { SearchModal } from "./SearchModal";
import { BrandLogo } from "./BrandLogo";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", to: "/" },
  { label: "Blog", to: "https://blog.useaima.com", external: true },
  { label: "Finance", to: "/finance" },
  { label: "Health", to: "/health" },
  { label: "Kids", to: "/kids" },
  { label: "FAQs", to: "/#faq" },
  { label: "About Us", to: "/about" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  // Cmd/Ctrl+K to open search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center" aria-label="USEAIMA home">
            <BrandLogo size="md" />
          </Link>

          {/* Desktop */}
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) =>
              l.external ? (
                <a
                  key={l.label}
                  href={l.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.label}
                  to={l.to}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                    location.pathname === l.to ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {l.label}
                </Link>
              )
            )}
            <button
              onClick={() => setSearchOpen(true)}
              className="ml-1 flex items-center gap-1.5 rounded-md border border-border bg-muted/50 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-[0.97]"
              aria-label="Search"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">Search</span>
              <kbd className="hidden rounded border border-border bg-background px-1 py-0.5 text-[10px] lg:inline">⌘K</kbd>
            </button>
            <ThemeToggle />
          </nav>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <button onClick={() => setSearchOpen(true)} className="p-2 text-muted-foreground hover:text-foreground" aria-label="Search">
              <Search className="h-5 w-5" />
            </button>
            <ThemeToggle />
            <button onClick={() => setOpen(!open)} className="p-2" aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t bg-background px-4 pb-4 md:hidden">
            {links.map((l) =>
              l.external ? (
                <a
                  key={l.label}
                  href={l.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2.5 text-sm font-medium text-muted-foreground"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.label}
                  to={l.to}
                  className="block py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              )
            )}
          </nav>
        )}
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
