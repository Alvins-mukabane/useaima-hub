import { blogUrl } from "@/content/siteContent";

export type BlogListingCategorySlug = "ai-agents" | "personal-finance" | "protocols" | "product-updates";

export type BlogListing = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  categorySlug: BlogListingCategorySlug;
};

export const blogListingCategories = {
  "ai-agents": {
    slug: "ai-agents",
    title: "AI Agents",
    badgeClassName: "bg-primary/10 text-primary",
  },
  "personal-finance": {
    slug: "personal-finance",
    title: "Personal Finance",
    badgeClassName: "bg-success/10 text-success",
  },
  protocols: {
    slug: "protocols",
    title: "Protocols",
    badgeClassName: "bg-accent/10 text-accent",
  },
  "product-updates": {
    slug: "product-updates",
    title: "Product Updates",
    badgeClassName: "bg-warning/20 text-foreground",
  },
} as const;

export const lightweightBlogListings: BlogListing[] = [
  {
    slug: "inside-eva-finance-workspace",
    title: "Inside eva: The Finance Workspace Built to Turn Spending Into Next Actions",
    description: "A close look at the eva workspace, subscriptions flow, and the design choices behind practical financial clarity.",
    excerpt: "eva is built to help users notice what changed, what matters, and what they should do next without wading through noisy dashboards.",
    categorySlug: "product-updates",
  },
  {
    slug: "what-is-personal-finance",
    title: "What Is Personal Finance? (Beginner Guide for 2026)",
    description: "A simple guide to earning, spending, saving, investing, and using AI tools to improve financial habits.",
    excerpt: "Personal finance is simply how you manage your money. The better your system, the clearer your decisions become.",
    categorySlug: "personal-finance",
  },
  {
    slug: "what-are-ai-agents",
    title: "What Are AI Agents? The Complete Beginner Guide to Autonomous Finance in 2026",
    description: "A beginner-friendly guide to AI agents, autonomous finance, and why agent-style systems matter now.",
    excerpt: "AI agents are moving from simple assistants to autonomous financial systems. This guide explains how they work and why that shift matters.",
    categorySlug: "ai-agents",
  },
  {
    slug: "a2a-ap2-kya-explained",
    title: "A2A, AP2 & KYA Explained: How AI Agents Will Control Financial Systems in 2026",
    description: "A practical guide to A2A, AP2, and KYA in the emerging agent economy.",
    excerpt: "A2A helps agents communicate, AP2 helps them transact, and KYA helps systems trust them. Together they form the operating stack for agentic finance.",
    categorySlug: "protocols",
  },
  {
    slug: "agent-to-agent-payments-explained",
    title: "Agent-to-Agent (A2A) Payments: The Future of Autonomous Commerce in 2026",
    description: "An introduction to A2A payments, autonomous commerce, and AI-led financial execution.",
    excerpt: "A2A payments let AI agents transact directly with other agents, turning recommendations into execution across commerce and subscriptions.",
    categorySlug: "protocols",
  },
];

export const homepageBlogPreviewPosts = lightweightBlogListings.slice(0, 4);
export const searchBlogSuggestions = lightweightBlogListings.slice(0, 5);

export function getListingCategoryBySlug(slug: BlogListing["categorySlug"]) {
  return blogListingCategories[slug];
}

export function getLightweightBlogPostUrl(slug: string) {
  return `${blogUrl}/${slug}`;
}
