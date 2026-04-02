import { Link, useLocation } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { BlogFooter } from "@/components/blog/BlogFooter";
import { BlogNavbar } from "@/components/blog/BlogNavbar";
import { blogDescription } from "@/content/blogContent";
import { blogUrl } from "@/content/siteContent";
import { getBlogRoute } from "@/lib/siteMode";

export default function BlogNotFound() {
  const location = useLocation();

  return (
    <>
      <SEOHead
        title="Blog Page Not Found"
        description={blogDescription}
        path={location.pathname}
        siteOrigin={blogUrl}
        robots="noindex, nofollow"
      />
      <BlogNavbar />
      <main className="py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl rounded-[2rem] border bg-card p-10 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">404</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">That article or page does not exist</h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Head back to the aima blog homepage or browse by category.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to={getBlogRoute("/")} className="rounded-full border px-5 py-3 text-sm font-medium">
                Blog home
              </Link>
              <Link to={getBlogRoute("/search")} className="rounded-full border px-5 py-3 text-sm font-medium">
                Search articles
              </Link>
            </div>
          </div>
        </div>
      </main>
      <BlogFooter />
    </>
  );
}
