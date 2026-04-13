import { ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { BlogArticleCard } from "@/components/blog/BlogArticleCard";
import { BlogFooter } from "@/components/blog/BlogFooter";
import { BlogNavbar } from "@/components/blog/BlogNavbar";
import { SEOHead } from "@/components/SEOHead";
import { createBreadcrumbStructuredData } from "@/content/entitySchema";
import { blogTitle, getCategoryBySlug, getPostsByCategory } from "@/content/blogContent";
import { blogUrl, siteName, siteUrl, toolLinks } from "@/content/siteContent";
import { getBlogRoute } from "@/lib/siteMode";
import BlogNotFound from "./BlogNotFound";

export default function BlogCategory() {
  const { slug = "" } = useParams();
  const category = getCategoryBySlug(slug);

  if (!category) {
    return <BlogNotFound />;
  }

  const posts = getPostsByCategory(slug);
  const leadPost = posts[0];
  const canonicalPath = `/category/${slug}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${category.title} Articles`,
      url: `${blogUrl}${canonicalPath}`,
      description: category.description,
    },
    createBreadcrumbStructuredData([
      { label: blogTitle, href: blogUrl },
      { label: category.title, href: `${blogUrl}${canonicalPath}` },
    ]),
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
        image={leadPost?.coverImage.src}
        keywords={[category.title, "aima blog", "eva", "guides"]}
        structuredData={structuredData}
      />
      <BlogNavbar />
      <main>
        <section className="border-b bg-muted/20 py-16">
          <div className="container">
            <Link to={getBlogRoute("/")} className="text-sm font-medium text-primary">
              ← Back to blog home
            </Link>
            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
              <div className="max-w-3xl">
                <div className={`inline-flex rounded-full px-4 py-2 text-sm font-medium ${category.badgeClassName}`}>
                  {category.title}
                </div>
                <h1 className="mt-6 text-balance text-5xl font-semibold tracking-tight">{category.title}</h1>
                <p className="mt-5 text-lg leading-8 text-muted-foreground">{category.description}</p>
                <div className="mt-8 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span>{posts.length} articles</span>
                  <span>Official aima editorial coverage</span>
                </div>
              </div>
              <div className="rounded-[1.75rem] border bg-card p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Next step</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">Turn the guide into action with eva.</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  The aima blog explains the systems clearly. eva is where those ideas become a practical product experience.
                </p>
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
          </div>
        </section>

        <section className="py-16">
          <div className="container grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, index) => (
              <BlogArticleCard key={post.slug} post={post} variant={index === 0 ? "featured" : "latest"} />
            ))}
          </div>
        </section>
      </main>
      <BlogFooter />
    </>
  );
}
