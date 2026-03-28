import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const siteUrl = "https://useaima.com";
const blogUrl = "https://blog.useaima.com";
const today = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Africa/Nairobi",
}).format(new Date());

const siteRoutes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/finance", changefreq: "weekly", priority: "0.8" },
  { path: "/health", changefreq: "weekly", priority: "0.7" },
  { path: "/kids", changefreq: "weekly", priority: "0.8" },
  { path: "/privacy-policy", changefreq: "monthly", priority: "0.5" },
  { path: "/terms-of-service", changefreq: "monthly", priority: "0.5" },
];

const blogCategories = [
  { slug: "ai-agents", title: "AI & Agents" },
  { slug: "finance", title: "Finance" },
  { slug: "social-media", title: "Social Media" },
  { slug: "kids-learning", title: "Kids & Learning" },
  { slug: "dev-systems", title: "Dev & Systems" },
];

const blogPosts = [
  {
    slug: "what-are-ai-agents",
    title: "What Are AI Agents? Beginner Guide for 2026",
    description: "Learn what AI agents are, how they differ from traditional apps, and why they matter in 2026.",
    publishedAt: "2026-03-25",
  },
  {
    slug: "how-ai-assistants-are-replacing-apps",
    title: "How AI Assistants Are Replacing Apps (And What It Means for You)",
    description: "Discover why AI assistants are replacing standalone apps and what that means for work and productivity.",
    publishedAt: "2026-03-25",
  },
  {
    slug: "why-your-social-media-posts-get-no-views",
    title: "Why Your Social Media Posts Get No Views (And How to Fix It)",
    description: "Learn the biggest reasons social posts get low views and how to improve reach with data and better structure.",
    publishedAt: "2026-03-25",
  },
  {
    slug: "what-is-agentic-ai-and-why-it-matters",
    title: "What Is Agentic AI and Why It Matters for Everyday Work",
    description: "Understand agentic AI in simple terms and why assistant-style systems matter.",
    publishedAt: "2026-03-24",
  },
  {
    slug: "choosing-ai-tools-that-reduce-work",
    title: "Choosing AI Tools That Reduce Work Instead of Adding More Dashboards",
    description: "A framework for evaluating AI products based on clarity, trust, and actionability.",
    publishedAt: "2026-03-22",
  },
  {
    slug: "weekly-finance-review-with-ai",
    title: "A Simple Weekly Finance Review You Can Run With AI",
    description: "Use a practical weekly review to understand spending patterns and better decisions.",
    publishedAt: "2026-03-21",
  },
  {
    slug: "why-most-budgets-fail-and-what-to-track-instead",
    title: "Why Most Budgets Fail and What to Track Instead",
    description: "Learn why budgets break down and which signals matter more.",
    publishedAt: "2026-03-18",
  },
  {
    slug: "what-creators-should-measure-before-posting-again",
    title: "What Creators Should Measure Before Posting Again",
    description: "A practical social media review framework for creators.",
    publishedAt: "2026-03-20",
  },
  {
    slug: "social-media-analytics-that-lead-to-action",
    title: "Social Media Analytics That Lead to Action",
    description: "Move from passive reporting to insight-led social decisions.",
    publishedAt: "2026-03-17",
  },
  {
    slug: "designing-safe-ai-learning-for-kids",
    title: "Designing Safe AI Learning Experiences for Kids",
    description: "A practical look at safe AI learning design for children and families.",
    publishedAt: "2026-03-19",
  },
  {
    slug: "why-ai-products-need-operational-clarity",
    title: "Why AI Products Need Operational Clarity, Not Just Clever Features",
    description: "Operational clarity keeps AI products trustworthy and useful beyond the demo.",
    publishedAt: "2026-03-16",
  },
];

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function buildSitemapXml(baseUrl, routes) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map(
      ({ path, changefreq, priority, lastmod = today }) => `  <url>
    <loc>${new URL(path, baseUrl).toString()}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
    ),
    "</urlset>",
    "",
  ].join("\n");
}

function buildRssFeed() {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    "    <title>USEAIMA Blog</title>",
    `    <link>${blogUrl}</link>`,
    `    <atom:link href="${blogUrl}/blog-feed.xml" rel="self" type="application/rss+xml" />`,
    "    <description>Simple guides, real insights, and tools built for the future.</description>",
    "    <language>en-us</language>",
    `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    ...blogPosts.map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${blogUrl}/${post.slug}</link>
      <guid>${blogUrl}/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`,
    ),
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}

function buildBlogLlms() {
  return [
    "# USEAIMA Blog",
    "",
    "> The USEAIMA Blog publishes practical guides on AI agents, finance, creator growth, safe learning systems, and operational product design.",
    "",
    "## Primary URLs",
    "",
    `- Home: ${blogUrl}/`,
    ...blogCategories.map((category) => `- ${category.title}: ${blogUrl}/category/${category.slug}`),
    ...blogPosts.map((post) => `- ${post.title}: ${blogUrl}/${post.slug}`),
    "",
    "## Summary",
    "",
    "- This blog is part of the broader USEAIMA ecosystem.",
    "- The blog is public, indexable, and intended for search engines, answer engines, and AI retrieval systems.",
    "- The goal is to help readers learn useful digital skills, trust the brand, and discover practical AI-powered products.",
    "- Featured products include SocialPulse, FinanceAI, and KidsAI.",
    "",
    "## Editorial Themes",
    "",
    "- AI & Agents: practical assistant-style software and product thinking",
    "- Finance: simple frameworks for better money decisions",
    "- Social Media: analytics, creator growth, and content strategy",
    "- Kids & Learning: safer AI-supported education experiences",
    "- Dev & Systems: operational clarity, systems design, and reliability",
    "",
    "## Product Links",
    "",
    "- USEAIMA: https://useaima.com",
    "- SocialPulse: https://socialpulse.useaima.com",
    "- FinanceAI: https://useaima.com/finance",
    "- KidsAI: https://useaima.com/kids",
    "",
  ].join("\n");
}

const blogRoutes = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  ...blogCategories.map((category) => ({
    path: `/category/${category.slug}`,
    changefreq: "weekly",
    priority: "0.8",
  })),
  ...blogPosts.map((post) => ({
    path: `/${post.slug}`,
    changefreq: "monthly",
    priority: "0.7",
    lastmod: post.publishedAt,
  })),
];

const siteSitemapXml = buildSitemapXml(siteUrl, siteRoutes);
const blogSitemapXml = buildSitemapXml(blogUrl, blogRoutes);
const rssXml = buildRssFeed();
const blogLlms = buildBlogLlms();

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const publicDir = resolve(rootDir, "public");

mkdirSync(publicDir, { recursive: true });
writeFileSync(resolve(publicDir, "sitemap.xml"), siteSitemapXml, "utf8");
writeFileSync(resolve(publicDir, "blog-sitemap.xml"), blogSitemapXml, "utf8");
writeFileSync(resolve(publicDir, "blog-feed.xml"), rssXml, "utf8");
writeFileSync(resolve(publicDir, "blog-llms.txt"), blogLlms, "utf8");

console.log(`Generated sitemaps and blog discovery assets in ${publicDir}`);
