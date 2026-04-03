import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Layers3, Lightbulb, Sparkles } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { AgentInsightsChart } from "@/components/AgentInsightsChart";
import { AtomicUtilityBlock } from "@/components/AtomicUtilityBlock";
import { RelatedAgents } from "@/components/RelatedAgents";
import { SemanticBreadcrumbs } from "@/components/SemanticBreadcrumbs";
import { BlogCommentsSection } from "@/components/blog/BlogCommentsSection";
import { BlogEngagementBar } from "@/components/blog/BlogEngagementBar";
import { BlogSubscribeBar } from "@/components/blog/BlogSubscribeBar";
import { SEOHead } from "@/components/SEOHead";
import { ToolMentionText } from "@/components/ToolMentionText";
import { Button } from "@/components/ui/button";
import {
  createBreadcrumbStructuredData,
  getAgentByKey,
  getPrimaryAgentKey,
  getProtocolContext,
  organizationSchemaId,
} from "@/content/entitySchema";
import { cn } from "@/lib/utils";
import { BlogFooter } from "@/components/blog/BlogFooter";
import { BlogNavbar } from "@/components/blog/BlogNavbar";
import { blogAuthor, getBlogPostUrl, getCategoriesForPost, getCategoryBySlug, getPostBySlug } from "@/content/blogContent";
import { blogUrl, siteUrl } from "@/content/siteContent";
import { getBlogRoute } from "@/lib/siteMode";
import BlogNotFound from "./BlogNotFound";

type ArticlePanel = "summary" | "simple" | "takeaways";

const panelIcons = {
  summary: Sparkles,
  simple: Lightbulb,
  takeaways: Layers3,
} as const;

function toSectionId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function BlogArticle() {
  const { slug = "" } = useParams();
  const post = getPostBySlug(slug);
  const [activePanel, setActivePanel] = useState<ArticlePanel>("summary");
  const [readingProgress, setReadingProgress] = useState(0);
  const articleUrl = getBlogPostUrl(post?.slug ?? slug);
  const category = post ? getCategoryBySlug(post.categorySlug) : undefined;
  const postCategories = useMemo(() => (post ? getCategoriesForPost(post) : []), [post]);
  const primaryAgentKey = getPrimaryAgentKey({
    title: post?.title,
    tags: post?.tags,
    categorySlug: post?.categorySlug,
    productName: post?.productCta.name,
    excerpt: post?.excerpt,
  });
  const primaryAgent = getAgentByKey(primaryAgentKey);
  const protocolContext = getProtocolContext(post?.title ?? "", post?.tags ?? []);
  const breadcrumbItems = useMemo(
    () => [
      { label: "Home", href: siteUrl },
      { label: "Blog", href: blogUrl },
      ...(category ? [{ label: category.title, href: `${blogUrl}/category/${category.slug}` }] : []),
      ...(protocolContext ? [{ label: protocolContext.label, href: protocolContext.href }] : []),
      ...(primaryAgent && !protocolContext ? [{ label: primaryAgent.name, href: primaryAgent.pageHref }] : []),
      { label: post?.title ?? "Article" },
    ],
    [category, post?.title, primaryAgent, protocolContext],
  );
  const sectionLinks = useMemo(
    () => post?.sections.map((section) => ({ id: toSectionId(section.heading), label: section.heading })) ?? [],
    [post]
  );

  const panelCopy = useMemo(
    () => ({
      summary: post?.summary ?? "",
      simple: post?.simpleExplanation ?? "",
      takeaways: post?.keyTakeaways.join(" ") ?? "",
    }),
    [post]
  );

  useEffect(() => {
    const updateReadingProgress = () => {
      const articleElement = document.getElementById("blog-article-content");
      if (!articleElement) return;

      const rect = articleElement.getBoundingClientRect();
      const articleTop = window.scrollY + rect.top;
      const articleHeight = articleElement.offsetHeight;
      const distance = window.scrollY - articleTop + window.innerHeight * 0.2;
      const progress = (distance / Math.max(articleHeight, 1)) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    updateReadingProgress();
    window.addEventListener("scroll", updateReadingProgress, { passive: true });
    window.addEventListener("resize", updateReadingProgress);

    return () => {
      window.removeEventListener("scroll", updateReadingProgress);
      window.removeEventListener("resize", updateReadingProgress);
    };
  }, [post?.slug]);

  const scrollToComments = () => {
    document.getElementById("comments")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!post) {
    return <BlogNotFound />;
  }

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      abstract: post.summary,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      inLanguage: "en-US",
      isAccessibleForFree: true,
      author: {
        "@type": "Organization",
        name: blogAuthor,
        url: blogUrl,
      },
      publisher: {
        "@id": organizationSchemaId,
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": articleUrl,
      },
      url: articleUrl,
      articleSection: postCategories.map((item) => item.title),
      keywords: post.tags.join(", "),
      about: postCategories.map((item) => ({
        "@type": "Thing",
        name: item.title,
        description: item.description,
      })),
      mentions: primaryAgent
        ? [
            {
              "@type": "SoftwareApplication",
              name: primaryAgent.name,
              url: primaryAgent.toolHref,
            },
          ]
        : [],
    },
    createBreadcrumbStructuredData(
      [...breadcrumbItems.slice(0, -1), { label: post.title, href: articleUrl }].map((item) => ({
        label: item.label,
        href: item.href ?? articleUrl,
      })),
    ),
    ...(post.faqs?.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: post.faqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          },
        ]
      : []),
  ];

  return (
    <>
      <SEOHead
        title={post.seoTitle ?? post.title}
        description={post.description}
        path={`/${post.slug}`}
        siteOrigin={blogUrl}
        type="article"
        section={category?.title}
        authorName={blogAuthor}
        publishedTime={post.publishedAt}
        modifiedTime={post.updatedAt}
        keywords={[...postCategories.map((item) => item.title), ...post.tags]}
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
        <div className="sticky top-[73px] z-40 h-1 bg-border/40">
          <div
            className="h-full bg-gradient-to-r from-primary via-sky-500 to-emerald-400 transition-[width] duration-200"
            style={{ width: `${readingProgress}%` }}
          />
        </div>
        <section className="border-b bg-muted/20 py-16">
          <div className="container">
            <div className="max-w-4xl">
              <SemanticBreadcrumbs items={breadcrumbItems} />

              <div className={cn("mt-8 rounded-[2rem] bg-gradient-to-br p-8 text-white shadow-xl", post.thumbnailClassName)}>
                <div className="flex flex-wrap gap-2">
                  {postCategories.map((item) => (
                    <span key={item.slug} className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white/85">
                      {item.emoji} {item.title}
                    </span>
                  ))}
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">{post.eyebrow}</p>
                <h1 className="mt-4 max-w-[15ch] text-balance text-4xl font-semibold leading-tight sm:text-5xl">
                  {post.title}
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">{post.excerpt}</p>
                <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/80">
                  <span>By {blogAuthor}</span>
                  <span>Published {post.publishedAt}</span>
                  {post.updatedAt !== post.publishedAt ? <span>Updated {post.updatedAt}</span> : null}
                  <span>{post.readingTime}</span>
                </div>
              </div>

              <div className="mt-8">
                <AtomicUtilityBlock
                  title="Quick Summary"
                  tldr={post.summary}
                  action={{
                    label: primaryAgent?.previewLabel ?? "Agent Preview",
                    href: primaryAgent?.toolHref ?? post.productCta.href,
                    external: true,
                  }}
                  highlights={post.keyTakeaways}
                  note={`This guide points readers toward ${primaryAgent?.name ?? post.productCta.name} as the clearest next step.`}
                />
              </div>
              {primaryAgent ? (
                <div className="mt-8">
                  <AgentInsightsChart
                    agentKey={primaryAgent.key}
                    title={`${primaryAgent.name} utility snapshot`}
                    description="Interactive signal views increase time on page while reinforcing the value of the product connected to this article."
                  />
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container grid gap-12 xl:grid-cols-[minmax(0,1fr)_320px]">
            <article className="min-w-0">
              <div className="mb-10 rounded-[1.75rem] border bg-card p-6 shadow-sm">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Reader Actions</p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      Like, share, or jump into the discussion for this article.
                    </p>
                  </div>
                  <BlogEngagementBar
                    slug={post.slug}
                    title={post.title}
                    url={articleUrl}
                    variant="article"
                    onCommentClick={scrollToComments}
                  />
                </div>
              </div>

              <div
                id="blog-article-content"
                className="prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-p:text-foreground/90 prose-p:leading-8 prose-li:leading-8 dark:prose-invert"
              >
                {post.sections.map((section, index) => (
                  <div key={section.heading}>
                    <h2 id={toSectionId(section.heading)}>{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>
                        <ToolMentionText text={paragraph} />
                      </p>
                    ))}
                    {section.bullets ? (
                      <ul>
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>
                            <ToolMentionText text={bullet} />
                          </li>
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

              {post.faqs?.length ? (
                <div id="article-faqs" className="mt-12 rounded-[1.75rem] border bg-card p-8 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Frequently Asked Questions</p>
                  <div className="mt-6 space-y-4">
                    {post.faqs.map((item) => (
                      <div key={item.question} className="rounded-2xl border bg-muted/20 p-5">
                        <h2 className="text-lg font-semibold tracking-tight">{item.question}</h2>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                          <ToolMentionText text={item.answer} />
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

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

              <div className="mt-16">
                <RelatedAgents primaryAgentKey={primaryAgentKey} />
              </div>

              <BlogCommentsSection slug={post.slug} title={post.title} articleUrl={articleUrl} />

              <div className="mt-16">
                <BlogSubscribeBar compact />
              </div>
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

                <div className="mt-6 rounded-2xl border bg-muted/15 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">On This Page</p>
                  <div className="mt-4 grid gap-3">
                    {sectionLinks.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {section.label}
                      </a>
                    ))}
                    {post.faqs?.length ? (
                      <a href="#article-faqs" className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">
                        Frequently asked questions
                      </a>
                    ) : null}
                    <button
                      type="button"
                      onClick={scrollToComments}
                      className="text-left text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      Jump to comments
                    </button>
                  </div>
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
