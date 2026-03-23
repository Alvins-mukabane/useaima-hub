import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { BlogArticleCard } from "@/components/blog/BlogArticleCard";
import { BlogFooter } from "@/components/blog/BlogFooter";
import { BlogNavbar } from "@/components/blog/BlogNavbar";
import {
  blogCategories,
  blogDescription,
  blogProducts,
  blogTitle,
  featuredBlogPosts,
  latestBlogPosts,
} from "@/content/blogContent";
import { blogUrl, siteName, siteUrl } from "@/content/siteContent";
import { getBlogRoute } from "@/lib/siteMode";
import { Button } from "@/components/ui/button";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: blogTitle,
    url: blogUrl,
    description: blogDescription,
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/android-chrome-512x512.png`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: blogTitle,
    url: blogUrl,
    description: blogDescription,
    isPartOf: blogUrl,
    hasPart: featuredBlogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${blogUrl}/${post.slug}`,
      datePublished: post.publishedAt,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: blogTitle,
    url: blogUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${blogUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
];

export default function BlogHome() {
  return (
    <>
      <SEOHead
        title={blogTitle}
        description={blogDescription}
        path="/"
        siteOrigin={blogUrl}
        keywords={[
          "USEAIMA blog",
          "AI guides",
          "finance insights",
          "social media analytics",
          "AI agents",
          "kids learning",
        ]}
        alternateLinks={[
          {
            type: "application/rss+xml",
            title: "USEAIMA Blog Feed",
            href: `${blogUrl}/blog-feed.xml`,
          },
        ]}
        structuredData={structuredData}
      />
      <BlogNavbar />
      <main>
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-x-0 top-0 h-[460px] bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.15),transparent_36%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_30%),linear-gradient(180deg,rgba(15,23,42,0.03),transparent)]" />
          <div className="container relative py-24 lg:py-28">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Built for learning that converts into action
              </div>
              <h1 className="mt-8 max-w-[15ch] text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
                Learn AI, Finance & Digital Skills That Actually Matter
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                Simple guides, real insights, and tools built for the future. The USEAIMA blog helps people learn faster,
                think more clearly, and discover practical systems that improve work and everyday decisions.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-full">
                  <a href="#latest">
                    Start Learning
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <a href="https://useaima.com/#products">Explore Tools</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Categories</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">Explore by topic</h2>
              </div>
              <Link to={getBlogRoute("/search")} className="text-sm font-medium text-primary">
                Search the blog
              </Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {blogCategories.map((category) => (
                <Link
                  key={category.slug}
                  to={getBlogRoute(`/category/${category.slug}`)}
                  className="group rounded-[1.75rem] border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className={`h-24 rounded-2xl bg-gradient-to-br ${category.gradient}`} />
                  <p className="mt-5 text-2xl">{category.emoji}</p>
                  <h3 className="mt-3 text-xl font-semibold">{category.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{category.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Browse articles
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="featured" className="bg-muted/25 py-20">
          <div className="container">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Featured Articles</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">Big ideas backed by practical systems</h2>
              </div>
            </div>
            <div className="mt-10 grid gap-6 xl:grid-cols-2">
              {featuredBlogPosts.map((post) => (
                <BlogArticleCard key={post.slug} post={post} variant="featured" />
              ))}
            </div>
          </div>
        </section>

        <section id="latest" className="py-20">
          <div className="container">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Latest Articles</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">Fresh thinking from the USEAIMA ecosystem</h2>
              </div>
              <Link to={getBlogRoute("/search")} className="text-sm font-medium text-primary">
                Browse all topics
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {latestBlogPosts.map((post) => (
                <BlogArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-20">
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Built By USEAIMA</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Traffic becomes trust when the products are real</h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                The USEAIMA blog exists to teach, clarify, and connect readers to practical tools built around the same
                ideas.
              </p>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {blogProducts.map((product) => (
                <a
                  key={product.name}
                  href={product.href}
                  className="rounded-[1.75rem] border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">USEAIMA Product</p>
                  <h3 className="mt-4 text-2xl font-semibold">{product.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{product.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                    {product.label}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="rounded-[2rem] border bg-card p-8 shadow-sm lg:p-10">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Newsletter</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">Get smarter every week</h2>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">
                  Receive practical lessons on AI, finance, digital growth, and product systems from the USEAIMA blog.
                </p>
              </div>
              <form className="mt-8 flex flex-col gap-3 sm:flex-row" onSubmit={(event) => event.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 flex-1 rounded-full border bg-background px-5 text-sm outline-none transition focus:border-primary"
                  aria-label="Email address"
                />
                <Button type="submit" size="lg" className="rounded-full">
                  <BookOpen className="h-4 w-4" />
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <BlogFooter />
    </>
  );
}
