import { ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { AuthorProfileCard } from "@/components/blog/AuthorProfileCard";
import { BlogArticleCard } from "@/components/blog/BlogArticleCard";
import { BlogFooter } from "@/components/blog/BlogFooter";
import { BlogNavbar } from "@/components/blog/BlogNavbar";
import { SEOHead } from "@/components/SEOHead";
import {
  blogTitle,
  getBlogAuthorBySlug,
  getBlogAuthorUrl,
  getBlogPostUrl,
  getPostsByAuthorSlug,
} from "@/content/blogContent";
import { createBreadcrumbStructuredData, getPersonStructuredData } from "@/content/entitySchema";
import { blogUrl, toolLinks } from "@/content/siteContent";
import { getBlogRoute } from "@/lib/siteMode";
import BlogNotFound from "./BlogNotFound";

export default function BlogAuthor() {
  const { slug = "" } = useParams();
  const author = getBlogAuthorBySlug(slug);

  if (!author) {
    return <BlogNotFound />;
  }

  const posts = getPostsByAuthorSlug(slug);
  const latestPost = posts[0];
  const canonicalPath = `/author/${slug}`;
  const structuredData = [
    getPersonStructuredData(author),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${author.name} Articles`,
      url: getBlogAuthorUrl(author.slug),
      description: author.bio,
      author: {
        "@type": "Person",
        name: author.name,
      },
    },
    createBreadcrumbStructuredData([
      { label: blogTitle, href: blogUrl },
      { label: author.name, href: getBlogAuthorUrl(author.slug) },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: getBlogPostUrl(post.slug),
        name: post.title,
      })),
    },
  ];

  return (
    <>
      <SEOHead
        title={`${author.name} | aima Blog Author`}
        description={author.bio}
        path={canonicalPath}
        siteOrigin={blogUrl}
        image={author.avatar}
        keywords={[author.name, "aima author", "eva blog author"]}
        structuredData={structuredData}
      />
      <BlogNavbar />
      <main>
        <section className="border-b bg-muted/20 py-16">
          <div className="container grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div>
              <Link to={getBlogRoute("/")} className="text-sm font-medium text-primary">
                ← Back to blog home
              </Link>
              <div className="mt-8 max-w-4xl">
                <AuthorProfileCard author={author} articleCount={posts.length} latestArticleTitle={latestPost?.title} showLink={false} />
              </div>
            </div>
            <div className="rounded-[1.75rem] border bg-card p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Author focus</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">{author.name} writes about eva, trust, and practical AI systems.</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                This archive groups every article written by {author.name} so readers can follow the themes, systems, and product stories they cover most often.
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
        </section>

        <section className="py-16">
          <div className="container">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Articles by {author.name}</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight">Published work</h1>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post, index) => (
                <BlogArticleCard key={post.slug} post={post} variant={index === 0 ? "featured" : "latest"} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <BlogFooter />
    </>
  );
}
