import { FormEvent, useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { BlogArticleCard } from "@/components/blog/BlogArticleCard";
import { BlogFooter } from "@/components/blog/BlogFooter";
import { BlogNavbar } from "@/components/blog/BlogNavbar";
import { SEOHead } from "@/components/SEOHead";
import { blogCategories, blogDescription, blogTitle, sortedBlogPosts } from "@/content/blogContent";
import { blogUrl } from "@/content/siteContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getBlogRoute } from "@/lib/siteMode";

export default function BlogSearch() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q")?.trim() ?? "";
  const [draftQuery, setDraftQuery] = useState(query);

  useEffect(() => {
    setDraftQuery(query);
  }, [query]);

  const results = useMemo(() => {
    if (!query) return sortedBlogPosts;

    const normalizedQuery = query.toLowerCase();
    return sortedBlogPosts.filter((post) => {
      const categoryTitle = blogCategories.find((category) => category.slug === post.categorySlug)?.title ?? "";
      return [post.title, post.description, post.excerpt, categoryTitle, ...post.tags]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    });
  }, [query]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = draftQuery.trim();
    navigate(trimmedQuery ? `${getBlogRoute("/search")}?q=${encodeURIComponent(trimmedQuery)}` : getBlogRoute("/search"));
  };

  return (
    <>
      <SEOHead
        title={query ? `Search: ${query}` : "Search Articles"}
        description={query ? `Search results for "${query}" on the aima blog.` : blogDescription}
        path="/search"
        siteOrigin={blogUrl}
        robots="noindex, follow"
        keywords={query ? [query, "aima blog search", "eva blog"] : ["aima blog search", "eva articles"]}
      />
      <BlogNavbar />
      <main>
        <section className="border-b bg-muted/20 py-16">
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Search</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Search the aima editorial archive</h1>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Find the right article across AI agents, personal finance, protocols, and eva product updates.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={draftQuery}
                  onChange={(event) => setDraftQuery(event.target.value)}
                  placeholder="Search AI agents, finance, AP2, eva..."
                  className="h-12 rounded-full pl-11"
                />
              </div>
              <Button type="submit" size="lg" className="rounded-full">
                Search
              </Button>
            </form>

            <div className="mt-6 flex flex-wrap gap-2">
              {blogCategories.map((category) => (
                <Link
                  key={category.slug}
                  to={getBlogRoute(`/category/${category.slug}`)}
                  className="rounded-full border bg-card/80 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <div className="mb-8 text-sm text-muted-foreground">
              {query ? `${results.length} result(s) for "${query}"` : `${results.length} article(s) available`}
            </div>
            {results.length === 0 ? (
              <div className="rounded-[2rem] border bg-card p-10 text-center shadow-sm">
                <h2 className="text-2xl font-semibold">No articles matched your search</h2>
                <p className="mt-3 text-muted-foreground">Try broader terms like AI agents, finance, protocols, subscriptions, or eva.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {results.map((post) => (
                  <BlogArticleCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <BlogFooter />
    </>
  );
}
