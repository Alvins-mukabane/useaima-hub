import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { AuthorProfileCard } from "@/components/blog/AuthorProfileCard";
import { BlogArticleCard } from "@/components/blog/BlogArticleCard";
import { BlogArticleMetaRow } from "@/components/blog/BlogArticleMetaRow";
import { BlogCommentsSection } from "@/components/blog/BlogCommentsSection";
import { BlogEngagementBar } from "@/components/blog/BlogEngagementBar";
import { BlogFooter } from "@/components/blog/BlogFooter";
import { BlogNavbar } from "@/components/blog/BlogNavbar";
import { BlogSubscribeBar } from "@/components/blog/BlogSubscribeBar";
import { QuickSummaryAside } from "@/components/blog/QuickSummaryAside";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { StoryMediaShowcase } from "@/components/blog/StoryMediaShowcase";
import { SEOHead } from "@/components/SEOHead";
import { SemanticBreadcrumbs } from "@/components/SemanticBreadcrumbs";
import { ToolMentionText } from "@/components/ToolMentionText";
import { Button } from "@/components/ui/button";
import {
  createBreadcrumbStructuredData,
  getAgentByKey,
  getPersonStructuredData,
  getPrimaryAgentKey,
  organizationSchemaId,
} from "@/content/entitySchema";
import {
  getBlogAuthor,
  getBlogCategoryUrl,
  getBlogPostUrl,
  getCategoriesForPost,
  getPostBySlug,
  getRelatedPosts,
} from "@/content/blogContent";
import { blogUrl, siteUrl, toolLinks } from "@/content/siteContent";
import { getBlogRoute } from "@/lib/siteMode";
import BlogNotFound from "./BlogNotFound";

function toSectionId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function BlogArticle() {
  const { slug = "" } = useParams();
  const post = getPostBySlug(slug);
  const [readingProgress, setReadingProgress] = useState(0);

  const articleUrl = getBlogPostUrl(post?.slug ?? slug);
  const authors = post?.authorIds.map((authorId) => getBlogAuthor(authorId)) ?? [];
  const primaryAuthor = authors[0];
  const postCategories = useMemo(() => (post ? getCategoriesForPost(post) : []), [post]);
  const relatedPosts = useMemo(() => (post ? getRelatedPosts(post).slice(0, 3) : []), [post]);
  const primaryAgentKey = getPrimaryAgentKey({
    title: post?.title,
    tags: post?.tags,
    categorySlug: post?.categorySlug,
    productName: post?.productCta.name,
    excerpt: post?.excerpt,
  });
  const primaryAgent = getAgentByKey(primaryAgentKey);
  const sectionLinks = useMemo(
    () => post?.sections.map((section) => ({ id: toSectionId(section.heading), label: section.heading })) ?? [],
    [post],
  );
  const breadcrumbItems = useMemo(() => {
    if (!post) return [];

    return [
      { label: "Home", href: siteUrl },
      { label: "Blog", href: blogUrl },
      ...post.breadcrumbs.map((item) => ({
        label: item.label,
        href: item.href ? new URL(item.href, blogUrl).toString() : undefined,
      })),
      { label: post.title },
    ];
  }, [post]);

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
      image: post.coverImage.src.startsWith("http") ? post.coverImage.src : `${siteUrl}${post.coverImage.src}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ?? post.publishedAt,
      inLanguage: "en-US",
      isAccessibleForFree: true,
      author: authors.map((author) => ({
        "@type": "Person",
        name: author.name,
        url: `${blogUrl}/author/${author.slug}`,
      })),
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
    ...authors.map((author) => getPersonStructuredData(author)),
    createBreadcrumbStructuredData(
      [...breadcrumbItems.slice(0, -1), { label: post.title, href: articleUrl }]
        .filter((item): item is { label: string; href: string } => Boolean(item.href))
        .map((item) => ({ label: item.label, href: item.href }))
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
        section={postCategories[0]?.title}
        authorName={authors.map((author) => author.name).join(", ")}
        publishedTime={post.publishedAt}
        modifiedTime={post.updatedAt ?? post.publishedAt}
        keywords={[...postCategories.map((item) => item.title), ...post.tags]}
        image={post.coverImage.src}
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
        <ReadingProgressBar progress={readingProgress} />
        <section className="border-b bg-muted/20 py-14 lg:py-16">
          <div className="container grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
            <div>
              <SemanticBreadcrumbs items={breadcrumbItems} />
              <div className="mt-8 flex flex-wrap gap-2">
                {postCategories.map((item) => (
                  <Link
                    key={item.slug}
                    to={getBlogRoute(`/category/${item.slug}`)}
                    className="rounded-full border bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">{post.eyebrow}</p>
              <h1 className="mt-4 max-w-[16ch] text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{post.excerpt}</p>
              {primaryAuthor ? (
                <div className="mt-8">
                  <BlogArticleMetaRow
                    authorName={authors.map((author) => author.name).join(", ")}
                    publishedAt={post.publishedAt}
                    updatedAt={post.updatedAt}
                    readingTime={post.readingTime}
                  />
                </div>
              ) : null}
              <div className="mt-8 overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-sm">
                <img
                  src={post.coverImage.src}
                  alt={post.coverImage.alt}
                  width={post.coverImage.width}
                  height={post.coverImage.height}
                  className="h-[320px] w-full object-cover sm:h-[420px]"
                  fetchpriority="high"
                  decoding="async"
                />
              </div>
              <div className="mt-8">
                <QuickSummaryAside
                  tldr={post.tldr}
                  highlights={post.keyTakeaways}
                  action={{
                    label: post.productCta.label,
                    href: post.productCta.href,
                  }}
                  note={`This article points readers toward ${post.productCta.name} as the clearest next step.`}
                />
              </div>
            </div>

            <aside className="xl:sticky xl:top-24 xl:self-start">
              {primaryAuthor ? (
                <AuthorProfileCard author={primaryAuthor} compact showLink showSocial={false} />
              ) : null}
              <div className="mt-6 rounded-[1.75rem] border bg-card p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Open eva</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">Move from explanation to action.</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">Read the guide, then open eva to apply the idea inside a live finance workflow.</p>
                <Button asChild className="mt-5 w-full rounded-full">
                  <a href={toolLinks.eva} target="_blank" rel="noreferrer noopener">
                    Open eva
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </aside>
          </div>
        </section>

        <section className="py-16">
          <div className="container grid gap-12 xl:grid-cols-[minmax(0,1fr)_300px]">
            <article className="min-w-0">
              <div className="mb-8 rounded-[1.75rem] border bg-card p-6 shadow-sm">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Reader actions</p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">Like, share, or jump into the discussion for this article.</p>
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

              {post.mediaSpotlight?.length ? (
                <div className="mb-12">
                  <StoryMediaShowcase title="Product proof" eyebrow="Inside eva" items={post.mediaSpotlight} compact />
                </div>
              ) : null}

              <div
                id="blog-article-content"
                className="prose max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:text-foreground prose-p:text-foreground/90 prose-li:text-foreground/85 prose-p:leading-8 prose-li:leading-8"
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
                      <div className="not-prose my-10 rounded-[1.75rem] border bg-[#fff8f2] p-7 shadow-sm dark:bg-primary/5">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Inline product CTA</p>
                        <h3 className="mt-4 text-2xl font-semibold">{post.productCta.name}</h3>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.productCta.description}</p>
                        <Button asChild className="mt-6 rounded-full">
                          <a href={post.productCta.href} target="_blank" rel="noreferrer noopener">
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
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Frequently asked questions</p>
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

              <div className="mt-12 rounded-[1.75rem] border bg-card p-8 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Related agent</p>
                <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-center">
                  <div>
                    <h2 className="text-3xl font-semibold tracking-tight">eva</h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">{post.inlineCallout}</p>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.productCta.description}</p>
                    <Button asChild className="mt-6 rounded-full">
                      <a href={post.productCta.href} target="_blank" rel="noreferrer noopener">
                        {post.productCta.label}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  <div className="rounded-[1.5rem] border bg-[#fff8f2] p-5 dark:bg-primary/5">
                    <img
                      src="/eva-logo.png"
                      alt="eva logo"
                      width={547}
                      height={374}
                      className="h-14 w-auto max-w-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      eva is the live AI finance assistant from aima, built to turn spending patterns into clearer actions.
                    </p>
                  </div>
                </div>
              </div>

              {relatedPosts.length ? (
                <div className="mt-12">
                  <div className="mb-6 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Read next</p>
                      <h2 className="mt-3 text-2xl font-semibold tracking-tight">More from the editorial desk</h2>
                    </div>
                  </div>
                  <div className="grid gap-4">
                    {relatedPosts.map((relatedPost) => (
                      <BlogArticleCard key={relatedPost.slug} post={relatedPost} variant="compact" />
                    ))}
                  </div>
                </div>
              ) : null}

              <BlogCommentsSection slug={post.slug} title={post.title} articleUrl={articleUrl} />

              <div className="mt-16">
                <BlogSubscribeBar compact />
              </div>
            </article>

            <aside className="xl:sticky xl:top-24 xl:self-start">
              <div className="rounded-[1.75rem] border bg-card p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">On this page</p>
                <div className="mt-5 grid gap-3">
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
                {authors.length > 1 ? (
                  <div className="mt-6 border-t pt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Authors</p>
                    <div className="mt-4 space-y-3 text-sm">
                      {authors.map((author) => (
                        <Link key={author.id} to={getBlogRoute(`/author/${author.slug}`)} className="block text-muted-foreground transition-colors hover:text-foreground">
                          {author.name}
                        </Link>
                      ))}
                    </div>
                  </div>
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
