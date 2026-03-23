import { useEffect } from "react";
import { siteName, siteUrl } from "@/content/siteContent";

type JsonLd = Record<string, unknown>;

type AlternateLink = {
  rel?: string;
  href: string;
  hrefLang?: string;
  type?: string;
  title?: string;
};

type SEOHeadProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  robots?: string;
  keywords?: string[];
  section?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
  siteOrigin?: string;
  alternateLinks?: AlternateLink[];
  structuredData?: JsonLd[];
};

function syncElement<T extends HTMLElement>(selector: string, create: () => T, attributes?: Record<string, string>) {
  const existingElement = document.head.querySelector<T>(selector);

  if (!attributes) {
    existingElement?.remove();
    return;
  }

  const element = existingElement ?? create();
  if (!existingElement) {
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function upsertMeta(selector: string, attributes?: Record<string, string>) {
  syncElement(selector, () => document.createElement("meta"), attributes);
}

function upsertLink(selector: string, attributes?: Record<string, string>) {
  syncElement(selector, () => document.createElement("link"), attributes);
}

function syncAlternateLinks(alternateLinks: AlternateLink[]) {
  document.head.querySelectorAll('link[data-seo-head="alternate"]').forEach((node) => node.remove());

  alternateLinks.forEach((link, index) => {
    const element = document.createElement("link");
    element.dataset.seoHead = "alternate";
    element.dataset.seoIndex = String(index);
    element.rel = link.rel ?? "alternate";
    element.href = link.href;
    if (link.hrefLang) element.hreflang = link.hrefLang;
    if (link.type) element.type = link.type;
    if (link.title) element.title = link.title;
    document.head.appendChild(element);
  });
}

function syncStructuredData(structuredData: JsonLd[]) {
  document.head.querySelectorAll('script[data-seo-head="dynamic"]').forEach((node) => node.remove());

  structuredData.forEach((entry, index) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.seoHead = "dynamic";
    script.dataset.seoIndex = String(index);
    script.textContent = JSON.stringify(entry);
    document.head.appendChild(script);
  });
}

function normalizeUrl(origin: string, path: string) {
  return new URL(path, origin).toString();
}

export function SEOHead({
  title,
  description,
  path,
  image = `${siteUrl}/og-image.svg`,
  type = "website",
  robots = "index, follow, max-image-preview:large",
  keywords,
  section,
  publishedTime,
  modifiedTime,
  authorName,
  siteOrigin = siteUrl,
  alternateLinks = [],
  structuredData = [],
}: SEOHeadProps) {
  const absoluteUrl = normalizeUrl(siteOrigin, path);
  const absoluteImage = image.startsWith("http://") || image.startsWith("https://") ? image : normalizeUrl(siteOrigin, image);
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const keywordContent = keywords?.length ? keywords.join(", ") : "";

  useEffect(() => {
    document.title = fullTitle;

    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[name="author"]', { name: "author", content: authorName ?? siteName });
    upsertMeta('meta[name="application-name"]', { name: "application-name", content: siteName });
    upsertMeta('meta[name="format-detection"]', { name: "format-detection", content: "telephone=no" });
    upsertMeta('meta[name="robots"]', { name: "robots", content: robots });
    upsertMeta('meta[name="googlebot"]', { name: "googlebot", content: robots });
    upsertMeta('meta[name="keywords"]', keywordContent ? { name: "keywords", content: keywordContent } : undefined);

    upsertMeta('meta[property="og:title"]', { property: "og:title", content: fullTitle });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: type });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: absoluteUrl });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: siteName });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: "en_US" });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: absoluteImage });
    upsertMeta('meta[property="og:image:alt"]', { property: "og:image:alt", content: `${siteName} logo and preview` });

    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: fullTitle });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: absoluteImage });
    upsertMeta('meta[name="twitter:image:alt"]', { name: "twitter:image:alt", content: `${siteName} logo and preview` });

    upsertMeta(
      'meta[property="article:section"]',
      section ? { property: "article:section", content: section } : undefined
    );
    upsertMeta(
      'meta[property="article:published_time"]',
      publishedTime ? { property: "article:published_time", content: publishedTime } : undefined
    );
    upsertMeta(
      'meta[property="article:modified_time"]',
      modifiedTime ? { property: "article:modified_time", content: modifiedTime } : undefined
    );
    upsertMeta(
      'meta[property="article:author"]',
      authorName ? { property: "article:author", content: authorName } : undefined
    );

    upsertLink('link[rel="canonical"]', { rel: "canonical", href: absoluteUrl });
    syncAlternateLinks(alternateLinks);
    syncStructuredData(structuredData);
  }, [
    absoluteImage,
    absoluteUrl,
    alternateLinks,
    authorName,
    description,
    fullTitle,
    keywordContent,
    modifiedTime,
    publishedTime,
    robots,
    section,
    structuredData,
    type,
  ]);

  return null;
}
