import { blogUrl } from "@/content/siteContent";

export type BlogListing = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  categorySlug: "ai-agents" | "finance" | "social-media" | "dev-systems";
};

export const blogListingCategories = {
  "ai-agents": {
    slug: "ai-agents",
    title: "AI & Agents",
    badgeClassName: "bg-primary/10 text-primary",
  },
  finance: {
    slug: "finance",
    title: "Finance",
    badgeClassName: "bg-success/10 text-success",
  },
  "social-media": {
    slug: "social-media",
    title: "Social Media",
    badgeClassName: "bg-accent/20 text-accent-foreground",
  },
  "dev-systems": {
    slug: "dev-systems",
    title: "Dev & Systems",
    badgeClassName: "bg-secondary text-secondary-foreground",
  },
} as const;

export const lightweightBlogListings: BlogListing[] = [
  {
    slug: "what-is-personal-finance",
    title: "What Is Personal Finance? (Beginner Guide for 2026)",
    description:
      "Learn what personal finance is, how to manage your money, save, budget, and invest in 2026.",
    excerpt:
      "Personal finance is simply how you manage your money. This beginner guide explains the basics of earning, spending, saving, investing, and using AI tools to build better money habits.",
    categorySlug: "finance",
  },
  {
    slug: "agent-to-agent-payments-explained",
    title: "Agent-to-Agent (A2A) Payments: The Future of Autonomous Commerce in 2026",
    description:
      "Learn how A2A payments work, why they matter in 2026, and how AI agents will transact autonomously.",
    excerpt:
      "A2A payments let AI agents transact directly with other agents, turning financial recommendations into autonomous execution across subscriptions, commerce, and operations.",
    categorySlug: "finance",
  },
  {
    slug: "what-is-kya-know-your-agent",
    title: "What Is KYA (Know Your Agent)? The Future of Financial Security in 2026",
    description:
      "Discover what KYA means, how it differs from KYC, and how trusted AI agents are reshaping financial security in 2026.",
    excerpt:
      "KYC verifies the person. KYA verifies the AI agent acting on that person's behalf. That difference matters more as finance becomes more autonomous.",
    categorySlug: "finance",
  },
  {
    slug: "a2a-ap2-kya-explained",
    title: "A2A, AP2 & KYA Explained: How AI Agents Will Control Financial Systems in 2026",
    description:
      "Learn how A2A, AP2, and KYA are shaping the future of AI-driven finance and autonomous systems.",
    excerpt:
      "A2A helps agents communicate, AP2 helps them transact, and KYA helps financial systems trust them. Together, they form the operating stack for agentic finance.",
    categorySlug: "ai-agents",
  },
  {
    slug: "what-are-ai-agents",
    title: "What Are AI Agents? The Complete Beginner Guide to Autonomous Finance in 2026",
    description:
      "Learn what AI agents are, how they work, and how they are transforming personal finance in 2026.",
    excerpt:
      "AI agents are moving from simple assistants to autonomous financial systems. This beginner guide explains how they work and why autonomous finance matters now.",
    categorySlug: "ai-agents",
  },
  {
    slug: "why-your-social-media-posts-get-no-views",
    title: "Why Your Social Media Posts Get No Views (And How to Fix It)",
    description:
      "A practical reach and retention guide for creators, teams, and marketers who want better performance.",
    excerpt:
      "If your posts are getting almost no views, the issue is usually not luck. It is usually the combination of weak hooks, mixed direction, poor retention, and no performance analysis.",
    categorySlug: "social-media",
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
