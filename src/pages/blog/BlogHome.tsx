import { ArrowRight, BrainCircuit, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { BlogArticleCard } from "@/components/blog/BlogArticleCard";
import { BlogFooter } from "@/components/blog/BlogFooter";
import { BlogNavbar } from "@/components/blog/BlogNavbar";
import { BlogSubscribeBar } from "@/components/blog/BlogSubscribeBar";
import {
  blogCategories,
  blogDescription,
  blogProducts,
  blogTitle,
  featuredBlogPosts,
  latestBlogPosts,
} from "@/content/blogContent";
import { blogUrl, brandKeywords, siteName, siteUrl } from "@/content/siteContent";
import { getBlogRoute } from "@/lib/siteMode";
import { Button } from "@/components/ui/button";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: blogTitle,
    url: blogUrl,
    description: blogDescription,
    inLanguage: "en",
    isAccessibleForFree: true,
    about: blogCategories.map((category) => ({
      "@type": "Thing",
      name: category.title,
      description: category.description,
    })),
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/aima-mark.png`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: blogTitle,
    url: blogUrl,
    description: blogDescription,
    isPartOf: blogUrl,
    about: blogCategories.map((category) => category.title),
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
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Latest aima Blog Articles",
    itemListElement: latestBlogPosts.slice(0, 6).map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${blogUrl}/${post.slug}`,
      name: post.title,
    })),
  },
];

export default function BlogHome() {
  const heroPosts = featuredBlogPosts.slice(0, 2);
  const learningSignals = [
    {
      icon: BrainCircuit,
      label: "AI, finance, creators, and systems",
      description: "Learn the operating ideas behind the products, not just surface tips.",
    },
    {
      icon: TrendingUp,
      label: "Traffic that can convert into trust",
      description: "Every article is designed to be useful first and product-aware second.",
    },
  ];

  return (
    <>
      <SEOHead
        title={blogTitle}
        description={blogDescription}
        path="/"
        siteOrigin={blogUrl}
        keywords={[
          "aima blog",
          "official aima blog",
          "blog.useaima.com",
          ...brandKeywords,
          "AI guides",
          "finance insights",
        ]}
        alternateLinks={[
          {
            type: "application/rss+xml",
            title: "aima Blog Feed",
            href: `${blogUrl}/blog-feed.xml`,
          },
        ]}
        structuredData={structuredData}
      />
      <BlogNavbar />
      <main>
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.16),transparent_36%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_34%),radial-gradient(circle_at_bottom,rgba(14,165,233,0.10),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.05),transparent)]" />
          <div className="container relative py-24 lg:py-28">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  Official blog of the aima ecosystem
                </div>
                <h1 className="mt-8 max-w-[15ch] text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
                  Learn AI, Finance & Digital Skills That Actually Matter
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                  If you searched for the aima blog, this is the official publication at blog.useaima.com. It helps
                  people learn faster, think more clearly, and discover practical systems that improve work and everyday
                  decisions.
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
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {learningSignals.map((signal) => {
                    const Icon = signal.icon;
                    return (
                      <div
                        key={signal.label}
                        className="rounded-[1.5rem] border border-border/60 bg-card/70 p-5 shadow-sm backdrop-blur"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <Icon className="h-5 w-5" />
                          </div>
                          <p className="text-sm font-semibold">{signal.label}</p>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">{signal.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[2rem] border border-border/60 bg-card/80 p-6 shadow-xl backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Start Here</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">Reader-friendly guides with product context</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Explore the articles that explain AI assistants, digital growth, and practical systems in the clearest way.
                </p>
                <div className="mt-6 space-y-4">
                  {heroPosts.map((post) => (
                    <Link
                      key={post.slug}
                      to={getBlogRoute(`/${post.slug}`)}
                      className="block rounded-[1.5rem] border bg-background/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{post.eyebrow}</p>
                      <h3 className="mt-2 text-lg font-semibold leading-tight">{post.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {blogCategories.slice(0, 4).map((category) => (
                    <Link
                      key={category.slug}
                      to={getBlogRoute(`/category/${category.slug}`)}
                      className="rounded-full border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {category.emoji} {category.title}
                    </Link>
                  ))}
                </div>
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
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">Fresh thinking from the aima ecosystem</h2>
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
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Built By aima</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Traffic becomes trust when the products are real</h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                The aima blog exists to teach, clarify, and connect readers to practical tools built around the same
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
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">aima Product</p>
                  <div className={`mt-4 flex min-h-20 items-center rounded-[1.35rem] border px-4 py-4 ${product.surfaceClass}`}>
                    <img src={product.logoSrc} alt={product.name} className="h-11 w-auto max-w-full object-contain" draggable="false" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold">{product.name}</h3>
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
            <BlogSubscribeBar />
          </div>
        </section>
      </main>
      <BlogFooter />
    </>
  );
}
