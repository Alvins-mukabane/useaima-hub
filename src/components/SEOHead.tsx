import { useEffect } from "react";
import { siteName, siteUrl } from "@/content/siteContent";

type JsonLd = Record<string, unknown>;

type SEOHeadProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  robots?: string;
  structuredData?: JsonLd[];
};

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
}

function upsertLink(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
}

export function SEOHead({
  title,
  description,
  path,
  image = `${siteUrl}/og-image.svg`,
  type = "website",
  robots = "index, follow, max-image-preview:large",
  structuredData = [],
}: SEOHeadProps) {
  const absoluteUrl = new URL(path, siteUrl).toString();
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  useEffect(() => {
    document.title = fullTitle;

    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[name="author"]', { name: "author", content: siteName });
    upsertMeta('meta[name="application-name"]', { name: "application-name", content: siteName });
    upsertMeta('meta[name="robots"]', { name: "robots", content: robots });

    upsertMeta('meta[property="og:title"]', { property: "og:title", content: fullTitle });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: type });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: absoluteUrl });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: siteName });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: image });
    upsertMeta('meta[property="og:image:alt"]', { property: "og:image:alt", content: `${siteName} logo and preview` });

    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: fullTitle });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });
    upsertMeta('meta[name="twitter:image:alt"]', { name: "twitter:image:alt", content: `${siteName} logo and preview` });

    upsertLink('link[rel="canonical"]', { rel: "canonical", href: absoluteUrl });

    document.head.querySelectorAll('script[data-seo-head="dynamic"]').forEach((node) => node.remove());

    structuredData.forEach((entry, index) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoHead = "dynamic";
      script.dataset.seoIndex = String(index);
      script.textContent = JSON.stringify(entry);
      document.head.appendChild(script);
    });
  }, [absoluteUrl, description, fullTitle, image, robots, structuredData, type]);

  return null;
}
