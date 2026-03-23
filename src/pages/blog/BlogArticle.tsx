import { useMemo, useState } from "react";
import { ArrowRight, BookOpenCheck, Layers3, Lightbulb, Sparkles } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BlogArticleCard } from "@/components/blog/BlogArticleCard";
import { BlogFooter } from "@/components/blog/BlogFooter";
import { BlogNavbar } from "@/components/blog/BlogNavbar";
import { blogAuthor, blogTitle, getCategoryBySlug, getPostBySlug, getRelatedPosts } from "@/content/blogContent";
import { blogUrl, siteName, siteUrl } from "@/content/siteContent";
import { getBlogRoute } from "@/lib/siteMode";
import BlogNotFound from "./BlogNotFound";

type ArticlePanel = "summary" | "simple" | "takeaways";

const panelIcons = {
  summary: Sparkles,
  simple: Lightbulb,
  takeaways: Layers3,
} as const;

export default function BlogArticle() {
  const { slug = "" } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return <BlogNotFound />;
  }

  const category = getCategoryBySlug(post.categorySlug);
  const relatedPosts = getRelatedPosts(post);
  const [activePanel, setActivePanel] = useState<ArticlePanel>("summary");

  const panelCopy = useMemo(
    () => ({
      summary: post.summary,
      simple: post.simpleExplanation,
      takeaways: post.keyTakeaways.join(" "),
    }),
    [post]
  );

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: {
        "@type": "Organization",
        name: blogAuthor,
      },
      publisher: {
        "@type": "Organization",
        name: siteName,
        url: siteUrl,
        logo: `${siteUrl}/android-chrome-512x512.png`,
      },
      mainEntityOfPage: `${blogUrl}/${post.slug}`,
      articleSection: category?.title,
      keywords: post.tags.join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: blogTitle, item: blogUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: category?.title ?? "Articles",
          item: category ? `${blogUrl}/category/${category.slug}` : blogUrl,
        },
        { "@type": "ListItem", position: 3, name: post.title, item: `${blogUrl}/${post.slug}` },
      ],
    },
  ];

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.description}
        path={`/${post.slug}`}
        siteOrigin={blogUrl}
        type="article"
        section={category?.title}
        authorName={blogAuthor}
        publishedTime={post.publishedAt}
        modifiedTime={post.updatedAt}
        keywords={[category?.title ?? "USEAIMA", ...post.tags]}
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
        <section className="border-b bg-muted/20 py-16">
          <div className="container">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <Link to={getBlogRoute("/")} className="hover:text-foreground">
                  Blog
                </Link>
                {category && (
                  <>
                    <span>/</span>
                    <Link to={getBlogRoute(`/category/${category.slug}`)} className="hover:text-foreground">
                      {category.title}
                    </Link>
                  </>
                )}
              </div>

              <div className={cn("mt-8 rounded-[2rem] bg-gradient-to-br p-8 text-white shadow-xl", post.thumbnailClassName)}>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">{post.eyebrow}</p>
                <h1 className="mt-4 max-w-[15ch] text-balance text-4xl font-semibold leading-tight sm:text-5xl">
                  {post.title}
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">{post.excerpt}</p>
                <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/80">
                  <span>By {blogAuthor}</span>
                  <span>{post.publishedAt}</span>
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container grid gap-12 xl:grid-cols-[minmax(0,1fr)_320px]">
            <article className="min-w-0">
              <div className="prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-p:text-foreground/90 prose-p:leading-8 prose-li:leading-8 dark:prose-invert">
                {post.sections.map((section, index) => (
                  <div key={section.heading}>
                    <h2>{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.bullets ? (
                      <ul>
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}

                    {index === 1 ? (
                      <div className="not-prose my-10 rounded-[1.75rem] border bg-card p-7 shadow-sm">
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Inline Product CTA</p>
                        <h3 className="mt-4 text-2xl font-semibold">{post.productCta.name}</h3>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.productCta.description}</p>
                        <Button asChild className="mt-6 rounded-full">
                          <a href={post.productCta.href}>
                            {post.productCta.label}
                            <ArrowRight className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="mt-12 rounded-[1.75rem] border bg-muted/20 p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Key Takeaways</p>
                <ul className="mt-6 space-y-4">
                  {post.keyTakeaways.map((item) => (
                    <li key={item} className="rounded-2xl border bg-card px-5 py-4 text-sm leading-7 text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 rounded-[1.75rem] border bg-card p-8 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Product CTA</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight">{post.productCta.name}</h2>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">{post.inlineCallout}</p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.productCta.description}</p>
                <Button asChild className="mt-6 rounded-full">
                  <a href={post.productCta.href}>
                    {post.productCta.label}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              {relatedPosts.length > 0 ? (
                <div className="mt-16">
                  <div className="flex items-center gap-3">
                    <BookOpenCheck className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-semibold tracking-tight">Related articles</h2>
                  </div>
                  <div className="mt-8 grid gap-6 md:grid-cols-2">
                    {relatedPosts.map((relatedPost) => (
                      <BlogArticleCard key={relatedPost.slug} post={relatedPost} variant="compact" />
                    ))}
                  </div>
                </div>
              ) : null}
            </article>

            <aside className="xl:sticky xl:top-24 xl:self-start">
              <div className="rounded-[1.75rem] border bg-card p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Article Tools</p>
                <div className="mt-5 grid gap-3">
                  {([
                    ["summary", "Summarize this article"],
                    ["simple", "Explain simply"],
                    ["takeaways", "Key takeaways"],
                  ] as const).map(([panelKey, label]) => {
                    const Icon = panelIcons[panelKey];
                    return (
                      <button
                        key={panelKey}
                        type="button"
                        onClick={() => setActivePanel(panelKey)}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-colors",
                          activePanel === panelKey ? "border-primary/50 bg-primary/5 text-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-2xl bg-muted/30 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    {activePanel === "summary" ? "Summary" : activePanel === "simple" ? "Simple Explanation" : "Takeaways"}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{panelCopy[activePanel]}</p>
                </div>

                {category ? (
                  <Link to={getBlogRoute(`/category/${category.slug}`)} className="mt-6 inline-flex text-sm font-medium text-primary">
                    More in {category.title}
                  </Link>
                ) : null}
              </div>
            </aside>
          </div>
        </section>
      </main>
      <BlogFooter />
    </>
  );
}
