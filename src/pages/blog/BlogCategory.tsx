import { ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { BlogArticleCard } from "@/components/blog/BlogArticleCard";
import { BlogFooter } from "@/components/blog/BlogFooter";
import { BlogNavbar } from "@/components/blog/BlogNavbar";
import { blogTitle, getCategoryBySlug, getPostsByCategory } from "@/content/blogContent";
import { blogUrl, siteName, siteUrl } from "@/content/siteContent";
import { getBlogRoute } from "@/lib/siteMode";
import BlogNotFound from "./BlogNotFound";

export default function BlogCategory() {
  const { slug = "" } = useParams();
  const category = getCategoryBySlug(slug);

  if (!category) {
    return <BlogNotFound />;
  }

  const posts = getPostsByCategory(slug);
  const canonicalPath = `/category/${slug}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${category.title} Articles`,
      url: `${blogUrl}${canonicalPath}`,
      description: category.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: blogTitle, item: blogUrl },
        { "@type": "ListItem", position: 2, name: category.title, item: `${blogUrl}${canonicalPath}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${blogUrl}/${post.slug}`,
        name: post.title,
      })),
    },
  ];

  return (
    <>
      <SEOHead
        title={`${category.title} Articles`}
        description={`${category.description} Browse practical ${category.title.toLowerCase()} guides on the aima blog.`}
        path={canonicalPath}
        siteOrigin={blogUrl}
        keywords={[category.title, "aima blog", "guides", "AI blog"]}
        structuredData={structuredData}
      />
      <BlogNavbar />
      <main>
        <section className="border-b bg-muted/25 py-20">
          <div className="container">
            <Link to={getBlogRoute("/")} className="text-sm font-medium text-primary">
              ← Back to blog home
            </Link>
            <div className="mt-8 max-w-3xl">
              <div className={`inline-flex rounded-full px-4 py-2 text-sm font-medium ${category.badgeClassName}`}>
                {category.emoji} {category.title}
              </div>
              <h1 className="mt-6 text-balance text-5xl font-semibold tracking-tight">{category.title}</h1>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">{category.description}</p>
              <div className="mt-8 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span>{posts.length} articles</span>
                <span>Practical breakdowns from the aima ecosystem</span>
              </div>
              <div className="mt-8 rounded-[1.5rem] border bg-card/80 p-5 shadow-sm">
                <p className="text-sm leading-7 text-muted-foreground">
                  This category page is built to help readers move from explanation to action, with guides that connect
                  learning, product thinking, and real aima tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <BlogArticleCard key={post.slug} post={post} />
              ))}
            </div>

            <div className="mt-16 rounded-[2rem] border bg-card p-8 shadow-sm lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Built By {siteName}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">Learn first, then explore the products</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
                aima combines educational content, assistant-style tools, and a clearer product philosophy across
                finance, digital growth, learning, and intelligent systems.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href={siteUrl} className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                  Visit aima
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href={`${siteUrl}/about`} className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                  About aima
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BlogFooter />
    </>
  );
}
