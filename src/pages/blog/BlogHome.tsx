import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthorProfileCard } from "@/components/blog/AuthorProfileCard";
import { BlogArticleCard } from "@/components/blog/BlogArticleCard";
import { BlogFooter } from "@/components/blog/BlogFooter";
import { BlogNavbar } from "@/components/blog/BlogNavbar";
import { BlogSubscribeBar } from "@/components/blog/BlogSubscribeBar";
import { StoryMediaShowcase } from "@/components/blog/StoryMediaShowcase";
import { SEOHead } from "@/components/SEOHead";
import {
  blogAuthorList,
  blogCategories,
  blogDescription,
  blogProducts,
  blogTitle,
  featuredBlogPosts,
  getBlogAuthor,
  latestBlogPosts,
} from "@/content/blogContent";
import { blogUrl, brandKeywords, siteName, siteUrl, toolLinks } from "@/content/siteContent";
import { formatBlogDate } from "@/lib/formatBlogDate";
import { getBlogRoute } from "@/lib/siteMode";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: blogTitle,
    url: blogUrl,
    description: blogDescription,
    inLanguage: "en-US",
    isAccessibleForFree: true,
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
    hasPart: latestBlogPosts.slice(0, 6).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${blogUrl}/${post.slug}`,
      datePublished: post.publishedAt,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Latest aima blog articles",
    itemListElement: latestBlogPosts.slice(0, 6).map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${blogUrl}/${post.slug}`,
      name: post.title,
    })),
  },
];

export default function BlogHome() {
  const leadPost = featuredBlogPosts[0] ?? latestBlogPosts[0];
  const editorialRail = featuredBlogPosts.slice(1, 4);
  const latestGrid = latestBlogPosts.slice(0, 6);

  return (
    <>
      <SEOHead
        title={blogTitle}
        description={blogDescription}
        path="/"
        siteOrigin={blogUrl}
        image={`${siteUrl}/og-image.svg`}
        keywords={[...brandKeywords, "eva blog", "AI finance blog", "autonomous finance blog"]}
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
        <section className="border-b bg-[linear-gradient(180deg,rgba(253,247,239,0.84),rgba(255,255,255,0.98))] py-16 dark:bg-[linear-gradient(180deg,rgba(14,12,11,0.92),rgba(20,16,14,0.98))] lg:py-20">
          <div className="container grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_360px] lg:items-start">
            <div>
              <p className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Official editorial hub for eva
              </p>
              <h1 className="mt-6 max-w-[14ch] text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
                The aima blog built like a product newsroom.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                blog.useaima.com is the official aima publication for practical AI agents, personal finance systems, protocol guides, and product updates tied directly to eva.
              </p>

              <article className="mt-10 overflow-hidden rounded-[2rem] border border-border/70 bg-card/95 shadow-xl">
                <div className="grid gap-0 lg:grid-cols-[1.1fr_minmax(0,0.9fr)]">
                  <div className="border-b lg:border-b-0 lg:border-r">
                    <img
                      src={leadPost.coverImage.src}
                      alt={leadPost.coverImage.alt}
                      width={leadPost.coverImage.width}
                      height={leadPost.coverImage.height}
                      className="h-full min-h-[280px] w-full object-cover"
                      fetchpriority="high"
                      decoding="async"
                    />
                  </div>
                  <div className="p-7 lg:p-8">
                    <div className="flex flex-wrap gap-2">
                      {leadPost.authorIds.map((authorId) => {
                        const author = getBlogAuthor(authorId);
                        return (
                          <span key={authorId} className="rounded-full border bg-muted/20 px-3 py-1 text-xs font-medium text-muted-foreground">
                            {author.name}
                          </span>
                        );
                      })}
                    </div>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Featured story</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight">{leadPost.title}</h2>
                    <p className="mt-4 text-base leading-8 text-muted-foreground">{leadPost.excerpt}</p>
                    <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>{formatBlogDate(leadPost.publishedAt)}</span>
                      <span>{leadPost.readingTime}</span>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <Link to={getBlogRoute(`/${leadPost.slug}`)} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
                        Read lead story
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <a
                        href={toolLinks.eva}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted/30"
                      >
                        Open eva
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            <aside className="space-y-5">
              <div className="rounded-[1.9rem] border border-border/70 bg-card/95 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Top stories</p>
                <div className="mt-5 space-y-5">
                  {editorialRail.map((post) => (
                    <Link key={post.slug} to={getBlogRoute(`/${post.slug}`)} className="block border-b pb-5 last:border-b-0 last:pb-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{post.eyebrow}</p>
                      <h3 className="mt-2 text-lg font-semibold leading-tight">{post.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="rounded-[1.9rem] border border-border/70 bg-card/95 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Built around eva</p>
                {blogProducts.map((product) => (
                  <a
                    key={product.name}
                    href={product.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-4 block rounded-[1.5rem] border bg-[#fff8f2] p-5 transition-transform duration-300 hover:-translate-y-1 dark:bg-primary/5"
                  >
                    <div className={`flex min-h-20 items-center rounded-[1.25rem] border px-4 py-4 ${product.surfaceClass}`}>
                      <img
                        src={product.logoSrc}
                        alt="eva logo"
                        width={product.logoWidth}
                        height={product.logoHeight}
                        className="h-11 w-auto max-w-full object-contain"
                        decoding="async"
                      />
                    </div>
                    <p className="mt-4 text-lg font-semibold">{product.name}</p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{product.description}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                      {product.label}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </a>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="py-12">
          <div className="container grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {blogCategories.map((category) => (
              <Link
                key={category.slug}
                to={getBlogRoute(`/category/${category.slug}`)}
                className="rounded-[1.5rem] border bg-card/95 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className={`h-20 rounded-[1.2rem] bg-gradient-to-br ${category.gradient}`} />
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">{category.shortTitle}</p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight">{category.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{category.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-muted/20 py-16">
          <div className="container grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <StoryMediaShowcase
              title="What readers can verify immediately inside eva"
              eyebrow="Real product proof"
              items={[
                {
                  src: "/blog/eva-dashboard-mobile.jpg",
                  alt: "The eva dashboard showing cash position, spent this month, health score, and a next action prompt.",
                  caption: "The main eva workspace keeps context and next steps visible in one place.",
                  width: 1080,
                  height: 2340,
                },
                {
                  src: "/blog/eva-subscriptions-mobile.jpg",
                  alt: "The eva subscriptions screen showing totals, category breakdown, and the AI analysis action.",
                  caption: "Subscriptions are treated as a first-class review workflow instead of being buried in a settings screen.",
                  width: 1080,
                  height: 2340,
                },
              ]}
            />
            <div className="rounded-[1.9rem] border border-border/70 bg-card/95 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Why this matters</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">Utility first reduces bounce.</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Readers trust a blog more when the product is visible, the authors are real, and the next step is clear. That is why this editorial design keeps proof, people, and product close together.
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
                <li>Real screenshots show that eva is already live.</li>
                <li>Author pages make ownership visible.</li>
                <li>Each article can lead directly into eva when the reader is ready.</li>
              </ul>
              <a
                href={toolLinks.eva}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Open eva
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section id="latest" className="py-16">
          <div className="container">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Latest articles</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">Current thinking from the aima editorial desk</h2>
              </div>
              <Link to={getBlogRoute("/search")} className="text-sm font-medium text-primary">
                Search the archive
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {latestGrid.map((post) => (
                <BlogArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>

        <section id="authors" className="bg-muted/20 py-16">
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Authors</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">The people writing the guides behind eva</h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Every article is linked to a real author page so readers can see who wrote it, what they focus on, and the body of work they have published for aima.
              </p>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {blogAuthorList.map((author) => {
                const latestArticle = latestBlogPosts.find((post) => post.authorIds.includes(author.id));
                const articleCount = latestBlogPosts.filter((post) => post.authorIds.includes(author.id)).length;
                return (
                  <AuthorProfileCard
                    key={author.id}
                    author={author}
                    articleCount={articleCount}
                    latestArticleTitle={latestArticle?.title}
                  />
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <BlogSubscribeBar />
          </div>
        </section>
      </main>
      <BlogFooter />
    </>
  );
}
