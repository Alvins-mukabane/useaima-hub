import { useState, useEffect, useCallback } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getBlogPostUrl, latestBlogPosts } from "@/content/blogContent";
import { toolLinks } from "@/content/siteContent";

interface SearchItem {
  title: string;
  description: string;
  category: string;
  to: string;
  external?: boolean;
}

const staticSearchData: SearchItem[] = [
  { title: "What is aima?", description: "Overview of the aima platform and ecosystem", category: "Page", to: "/#what-is-aima" },
  { title: "eva", description: "AI financial advisor — tracks spending and provides insights", category: "Product", to: toolLinks.financeAI, external: true },
  { title: "MailMind", description: "AI email intelligence — summarizes, detects deadlines, generates plans", category: "Product", to: toolLinks.emailAI, external: true },
  {
    title: "ace",
    description: "AI social media analytics — trends, content ideas, algorithm detection",
    category: "Product",
    to: toolLinks.socialPulse,
    external: true,
  },
  { title: "Finance", description: "AI-powered financial intelligence hub", category: "Page", to: "/finance" },
  { title: "About Us", description: "Learn about the aima mission, vision, and approach", category: "Page", to: "/about" },
  { title: "Privacy Policy", description: "How aima handles user data and privacy", category: "Page", to: "/privacy-policy" },
  { title: "Terms of Service", description: "Terms that govern use of the aima platform", category: "Page", to: "/terms-of-service" },
  { title: "FAQs", description: "Frequently asked questions about aima", category: "Page", to: "/#faq" },
];

const searchData: SearchItem[] = [
  ...staticSearchData,
  ...latestBlogPosts.slice(0, 5).map((post) => ({
    title: post.title,
    description: post.description,
    category: "Blog",
    to: getBlogPostUrl(post.slug),
    external: true,
  })),
];

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [open, handleKeyDown]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  // Cmd/Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) onClose();
        else {
          // parent controls open state
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const categoryColor: Record<string, string> = {
    Product: "bg-primary/10 text-primary",
    Blog: "bg-accent text-accent-foreground",
    Page: "bg-secondary text-secondary-foreground",
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-xl border border-border bg-card shadow-2xl animate-fade-in mx-4">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, pages, blog…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button onClick={onClose} className="rounded p-1 text-muted-foreground hover:text-foreground active:scale-95">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[320px] overflow-y-auto p-2">
          {query.trim() && filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">No results for "{query}"</p>
          )}
          {!query.trim() && (
            <p className="py-8 text-center text-sm text-muted-foreground">Start typing to search…</p>
          )}
          {filtered.map((item) => {
            const inner = (
              <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent/60 group cursor-pointer">
                <span className={cn("shrink-0 rounded-md px-2 py-0.5 text-xs font-medium", categoryColor[item.category])}>
                  {item.category}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{item.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{item.description}</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            );
            return item.external ? (
              <a key={item.title} href={item.to} target="_blank" rel="noopener noreferrer" onClick={onClose}>
                {inner}
              </a>
            ) : (
              <Link key={item.title} to={item.to} onClick={onClose}>
                {inner}
              </Link>
            );
          })}
        </div>

        <div className="border-t border-border px-4 py-2">
          <p className="text-xs text-muted-foreground">
            <kbd className="rounded border border-border bg-muted px-1 py-0.5 text-xs">ESC</kbd> to close
            {" · "}
            <kbd className="rounded border border-border bg-muted px-1 py-0.5 text-xs">⌘K</kbd> to toggle
          </p>
        </div>
      </div>
    </div>
  );
}
