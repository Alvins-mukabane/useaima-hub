import { Link } from "react-router-dom";
import { BrandLogo } from "@/components/BrandLogo";
import { blogCategories, blogProducts } from "@/content/blogContent";
import { getBlogRoute } from "@/lib/siteMode";

export function BlogFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr_1fr]">
          <div>
            <BrandLogo size="lg" />
            <p className="mt-4 max-w-[34ch] text-sm leading-7 text-muted-foreground">
              Simple guides, practical insight, and product-backed thinking across AI, finance, digital growth, and
              systems design.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://useaima.com"
                className="rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-background"
              >
                Main site
              </a>
              <a
                href="https://useaima.com/about"
                className="rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-background"
              >
                About aima
              </a>
              <a
                href="https://blog.useaima.com/blog-feed.xml"
                className="rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-background"
              >
                RSS Feed
              </a>
              <a
                href="https://blog.useaima.com/blog-sitemap.xml"
                className="rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-background"
              >
                Sitemap
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Categories</h3>
            <ul className="mt-5 space-y-3">
              {blogCategories.map((category) => (
                <li key={category.slug}>
                  <Link
                    to={getBlogRoute(`/category/${category.slug}`)}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {category.emoji} {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Built By aima</h3>
            <div className="mt-5 space-y-4">
              {blogProducts.map((product) => (
                <a
                  key={product.name}
                  href={product.href}
                  className="block rounded-2xl border bg-card p-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className={`flex min-h-16 items-center rounded-2xl border px-4 py-3 ${product.surfaceClass}`}>
                    <img src={product.logoSrc} alt={product.name} className="h-9 w-auto max-w-full object-contain" draggable="false" />
                  </div>
                  <p className="mt-4 font-semibold">{product.name}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{product.description}</p>
                  <span className="mt-4 inline-flex text-sm font-medium text-primary">{product.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} aima Blog. Built for learning, trust, and product discovery.
        </div>
      </div>
    </footer>
  );
}
