import { Link } from "react-router-dom";
import { BrandLogo } from "@/components/BrandLogo";
import { AuthorProfileCard } from "@/components/blog/AuthorProfileCard";
import { blogAuthorList, blogCategories, blogProducts } from "@/content/blogContent";
import { blogUrl, siteUrl, supportUrl } from "@/content/siteContent";
import { getBlogRoute } from "@/lib/siteMode";

export function BlogFooter() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container py-16">
        <div className="grid gap-10 xl:grid-cols-[1.1fr_0.9fr_1fr]">
          <div>
            <BrandLogo size="lg" />
            <p className="mt-4 max-w-[34ch] text-sm leading-7 text-muted-foreground">
              Editorial guides, protocol explainers, and finance thinking built to make eva easier to trust and easier to use.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={siteUrl} className="rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-background">
                Main site
              </a>
              <a href={`${siteUrl}/about`} className="rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-background">
                About aima
              </a>
              <a href={supportUrl} className="rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-background">
                Support
              </a>
              <a href={`${blogUrl}/blog-feed.xml`} className="rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-background">
                RSS Feed
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {blogCategories.map((category) => (
                <li key={category.slug}>
                  <Link to={getBlogRoute(`/category/${category.slug}`)} className="text-muted-foreground transition-colors hover:text-foreground">
                    {category.title}
                  </Link>
                </li>
              ))}
              {blogAuthorList.map((author) => (
                <li key={author.id}>
                  <Link to={getBlogRoute(`/author/${author.slug}`)} className="text-muted-foreground transition-colors hover:text-foreground">
                    {author.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Built around eva</h3>
            <div className="mt-5 space-y-5">
              {blogProducts.map((product) => (
                <a
                  key={product.name}
                  href={product.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="block rounded-[1.75rem] border bg-card p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className={`flex min-h-16 items-center rounded-2xl border px-4 py-3 ${product.surfaceClass}`}>
                    <img
                      src={product.logoSrc}
                      alt="eva logo"
                      width={product.logoWidth}
                      height={product.logoHeight}
                      className="h-9 w-auto max-w-full object-contain"
                      draggable="false"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <p className="mt-4 text-xl font-semibold">{product.name}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{product.description}</p>
                  <span className="mt-4 inline-flex text-sm font-medium text-primary">{product.label}</span>
                </a>
              ))}
              <div className="grid gap-4 sm:grid-cols-2">
                {blogAuthorList.map((author) => (
                  <AuthorProfileCard key={author.id} author={author} compact showSocial={false} className="p-4" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} aima Blog. Editorial content designed to teach clearly and lead readers toward eva.
        </div>
      </div>
    </footer>
  );
}
