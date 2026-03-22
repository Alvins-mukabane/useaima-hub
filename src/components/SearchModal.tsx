import { useState, useEffect, useCallback } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SearchItem {
  title: string;
  description: string;
  category: string;
  to: string;
  external?: boolean;
}

const searchData: SearchItem[] = [
  { title: "What is USEAIMA?", description: "Overview of the USEAIMA platform and ecosystem", category: "Page", to: "/#what-is-useaima" },
  { title: "FinanceAI", description: "AI financial advisor — tracks spending and provides insights", category: "Product", to: "/finance" },
  { title: "EmailAI", description: "AI email intelligence — summarizes, detects deadlines, generates plans", category: "Product", to: "/#products" },
  { title: "KidsAI", description: "AI learning and entertainment platform for kids", category: "Product", to: "/kids" },
  {
    title: "SocialPulse",
    description: "AI social media analytics — trends, content ideas, algorithm detection",
    category: "Product",
    to: "https://socialpulse.useaima.com",
    external: true,
  },
  { title: "HealthAI", description: "AI health intelligence — preventive insights and recommendations", category: "Product", to: "/health" },
  { title: "How I Built an AI Email Assistant", description: "Deep dive into building an AI-powered email system", category: "Blog", to: "https://blog.useaima.com", external: true },
  { title: "The Future of Personal AI Systems", description: "Exploring next-gen personal AI assistants", category: "Blog", to: "https://blog.useaima.com", external: true },
  { title: "Why Most People Fail at Managing Money", description: "Common pitfalls and how AI can help", category: "Blog", to: "https://blog.useaima.com", external: true },
  { title: "Finance", description: "AI-powered financial intelligence hub", category: "Page", to: "/finance" },
  { title: "Health", description: "AI in healthcare and preventive care", category: "Page", to: "/health" },
  { title: "Kids", description: "Safe AI for children's learning and fun", category: "Page", to: "/kids" },
  { title: "About Us", description: "Learn about the USEAIMA mission, vision, and approach", category: "Page", to: "/about" },
  { title: "Privacy Policy", description: "How USEAIMA handles user data and privacy", category: "Page", to: "/privacy-policy" },
  { title: "Terms of Service", description: "Terms that govern use of the USEAIMA platform", category: "Page", to: "/terms-of-service" },
  { title: "FAQs", description: "Frequently asked questions about USEAIMA", category: "Page", to: "/#faq" },
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
                <span className={cn("shrink-0 rounded-md px-2 py-0.5 text-[11px] font-medium", categoryColor[item.category])}>
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
          <p className="text-[11px] text-muted-foreground">
            <kbd className="rounded border border-border bg-muted px-1 py-0.5 text-[10px]">ESC</kbd> to close
            {" · "}
            <kbd className="rounded border border-border bg-muted px-1 py-0.5 text-[10px]">⌘K</kbd> to toggle
          </p>
        </div>
      </div>
    </div>
  );
}
