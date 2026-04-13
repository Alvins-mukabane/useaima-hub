import { blogUrl, siteName, toolLinks } from "@/content/siteContent";
import {
  BlogAuthorId,
  blogAuthorList,
  blogAuthors,
  defaultBlogAuthorId,
  getBlogAuthor,
  getBlogAuthorBySlug,
} from "@/content/blogAuthors";

export { blogAuthorList, blogAuthors, getBlogAuthor, getBlogAuthorBySlug } from "@/content/blogAuthors";

export const blogTitle = `${siteName} Blog | Editorial Guides for eva`;
export const blogDescription =
  "The official aima blog publishes editorial guides on AI agents, personal finance, product workflows, and protocol design centered on eva.";

export type BlogCategorySlug = "ai-agents" | "personal-finance" | "protocols" | "product-updates";

export type BlogCategory = {
  slug: BlogCategorySlug;
  title: string;
  shortTitle: string;
  description: string;
  emoji: string;
  gradient: string;
  badgeClassName: string;
};

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogMediaSpotlight = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type BlogBreadcrumb = {
  label: string;
  href?: string;
};

export type BlogPost = {
  slug: string;
  authorId: BlogAuthorId;
  authorIds: BlogAuthorId[];
  title: string;
  seoTitle?: string;
  description: string;
  excerpt: string;
  categorySlug: BlogCategorySlug;
  secondaryCategorySlugs?: BlogCategorySlug[];
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  featured: boolean;
  eyebrow: string;
  thumbnailClassName: string;
  coverImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  tags: string[];
  tldr: string;
  summary: string;
  simpleExplanation: string;
  keyTakeaways: string[];
  breadcrumbs: BlogBreadcrumb[];
  sections: BlogSection[];
  mediaSpotlight?: BlogMediaSpotlight[];
  inlineCallout: string;
  productCta: {
    name: string;
    href: string;
    description: string;
    label: string;
  };
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  relatedSlugs: string[];
};

export const blogCategories: BlogCategory[] = [
  {
    slug: "ai-agents",
    title: "AI Agents",
    shortTitle: "Agents",
    description: "Practical guides to agentic systems, assistant workflows, and software that can reason toward action.",
    emoji: "AI",
    gradient: "from-[#2B211C] via-[#3A2A22] to-[#A45B12]",
    badgeClassName: "bg-primary/10 text-primary",
  },
  {
    slug: "personal-finance",
    title: "Personal Finance",
    shortTitle: "Finance",
    description: "Clear frameworks for spending, savings, reviews, and better money decisions supported by eva.",
    emoji: "PF",
    gradient: "from-[#FFF7EF] via-[#F6E7D6] to-[#F0D5AF]",
    badgeClassName: "bg-success/10 text-success",
  },
  {
    slug: "protocols",
    title: "Protocols",
    shortTitle: "Protocols",
    description: "Definitions and operating context for A2A, AP2, KYA, and the infrastructure behind autonomous finance.",
    emoji: "PR",
    gradient: "from-[#231915] via-[#38261F] to-[#704316]",
    badgeClassName: "bg-accent/10 text-accent",
  },
  {
    slug: "product-updates",
    title: "Product Updates",
    shortTitle: "Updates",
    description: "Editorial updates showing how eva turns financial activity into clearer workflows and next-step guidance.",
    emoji: "EV",
    gradient: "from-[#FFF7EE] via-[#F7E3D0] to-[#FFD1A1]",
    badgeClassName: "bg-warning/20 text-foreground",
  },
];

const coverImages: Record<BlogCategorySlug, BlogPost["coverImage"]> = {
  "ai-agents": {
    src: "/blog/covers/ai-agents.svg",
    alt: "Editorial cover illustration for AI agents articles on the aima blog.",
    width: 1600,
    height: 960,
  },
  "personal-finance": {
    src: "/blog/covers/personal-finance.svg",
    alt: "Editorial cover illustration for personal finance guides on the aima blog.",
    width: 1600,
    height: 960,
  },
  protocols: {
    src: "/blog/covers/protocols.svg",
    alt: "Editorial cover illustration for protocol guides on the aima blog.",
    width: 1600,
    height: 960,
  },
  "product-updates": {
    src: "/blog/covers/product-updates.svg",
    alt: "Editorial cover illustration for eva product update articles.",
    width: 1600,
    height: 960,
  },
};

const thumbnailByCategory: Record<BlogCategorySlug, string> = {
  "ai-agents": "from-[#2B211C] via-[#3A2A22] to-[#A45B12]",
  "personal-finance": "from-[#FDF6EE] via-[#F4E4D2] to-[#F0D2AE]",
  protocols: "from-[#241A15] via-[#3A281F] to-[#6B3F15]",
  "product-updates": "from-[#FFF4E7] via-[#FFE2BF] to-[#FFC37C]",
};

const evaProduct = {
  name: "eva",
  logoSrc: "/eva-logo.png",
  logoWidth: 547,
  logoHeight: 374,
  surfaceClass: "border-primary/20 bg-[#fff5ea] text-foreground dark:bg-primary/10",
  description:
    "eva is the live AI finance assistant from aima, built to turn spending records, subscriptions, and financial behavior into next-step guidance.",
  href: toolLinks.eva,
  label: "Explore eva",
};

export const blogProducts = [evaProduct];

function createEvaCta(description: string, label = "Open eva") {
  return {
    name: "eva",
    href: toolLinks.eva,
    description,
    label,
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "inside-eva-finance-workspace",
    authorId: "alvins",
    authorIds: ["alvins"],
    title: "Inside eva: The Finance Workspace Built to Turn Spending Into Next Actions",
    seoTitle: "Inside eva: Finance Workspace Walkthrough | aima Blog",
    description:
      "A close look at the eva workspace, including cash position, subscriptions, AI analysis, and the product design choices behind practical financial clarity.",
    excerpt:
      "eva is not designed like a generic money dashboard. It is built to help users notice what changed, what matters, and what they should do next.",
    categorySlug: "product-updates",
    secondaryCategorySlugs: ["personal-finance"],
    publishedAt: "2026-04-10",
    updatedAt: "2026-04-12",
    readingTime: "6 min read",
    featured: true,
    eyebrow: "Product Update",
    thumbnailClassName: thumbnailByCategory["product-updates"],
    coverImage: coverImages["product-updates"],
    tags: ["eva", "product update", "finance workspace", "subscriptions", "spending analysis", "aima"],
    tldr:
      "eva combines spending visibility, subscription review, and AI-guided next steps in one calm finance workspace.",
    summary:
      "eva is built to help users go from raw financial records to practical next actions. The workspace combines balance visibility, subscription analysis, and AI-generated prompts so a user can see what changed and respond faster.",
    simpleExplanation:
      "eva is a finance workspace that tries to do more than show charts. It highlights what changed, where pressure is building, and what action makes sense next.",
    keyTakeaways: [
      "eva is designed as a calm decision workspace, not a noisy dashboard.",
      "The product turns recurring payments, balance signals, and habit changes into usable next steps.",
      "Real screenshots help show that eva is already a live product inside the aima ecosystem.",
    ],
    breadcrumbs: [
      { label: "Product Updates", href: "/category/product-updates" },
      { label: "eva Workspace" },
    ],
    sections: [
      {
        heading: "Why the workspace looks this way",
        paragraphs: [
          "eva is built around one idea: financial tools should help users decide, not just report. That means the interface has to feel calm, legible, and action-oriented from the first screen.",
          "Instead of pushing the user through several disconnected dashboards, the workspace keeps the most useful signals close together: balances, monthly spending, subscription pressure, and one obvious next action.",
        ],
      },
      {
        heading: "What the first screen proves",
        paragraphs: [
          "The welcome workspace shows how eva treats financial history as live context. Cash position, monthly spending, and health score all reinforce the same goal: help the user understand the current financial state without scanning several menus.",
          "The next-action card matters because it shifts the product from passive display to guided action. The best finance products do not stop at explanation. They point to the next useful step.",
        ],
        bullets: [
          "Cash position provides fast context.",
          "Monthly spending shows recent pressure at a glance.",
          "Goal momentum makes the product feel forward-looking.",
          "Next action keeps the user moving.",
        ],
      },
      {
        heading: "Why subscriptions belong in the same system",
        paragraphs: [
          "Recurring payments are one of the clearest places where money leaks happen quietly. That is why eva treats subscriptions as a first-class part of the product instead of hiding them in an account detail screen.",
          "By surfacing monthly and yearly totals together with category breakdowns, eva gives users a clearer picture of where recurring obligations are creating pressure and where action might save money fast.",
        ],
      },
      {
        heading: "How this supports autonomous finance",
        paragraphs: [
          "The long-term direction is not more manual review. It is finance software that notices patterns, explains why they matter, and prepares the next step in context. That is what makes eva relevant to the broader conversation around AI agents and autonomous finance.",
          "The workspace is intentionally simple because trust in AI finance starts with clarity. If the product feels noisy or confusing, users will not rely on the recommendations when the stakes matter.",
        ],
      },
    ],
    mediaSpotlight: [
      {
        src: "/blog/eva-dashboard-mobile.jpg",
        alt: "A mobile screenshot of the eva workspace showing cash position, monthly spending, health score, and a next action card.",
        caption: "The primary eva workspace keeps the most important money signals and the next action in the same view.",
        width: 1080,
        height: 2340,
      },
      {
        src: "/blog/eva-subscriptions-mobile.jpg",
        alt: "A mobile screenshot of eva showing the subscriptions view with totals, category breakdowns, and an AI analysis action.",
        caption: "The subscriptions screen shows how eva turns recurring payments into an AI-assisted review workflow.",
        width: 1080,
        height: 2340,
      },
    ],
    inlineCallout:
      "eva is designed to shorten the path between financial awareness and the next useful action.",
    productCta: createEvaCta(
      "Open the live eva product to see how aima is turning spending analysis, subscriptions, and financial review into one connected workflow.",
      "Open the eva workspace",
    ),
    faqs: [
      {
        question: "What is eva?",
        answer:
          "eva is the live AI finance assistant from aima. It helps users understand spending, review subscriptions, and act on clearer financial signals.",
      },
      {
        question: "Why show product screenshots in the blog?",
        answer:
          "Real screenshots help readers understand that eva is a working product, not just a concept. They connect the educational content back to product trust.",
      },
    ],
    relatedSlugs: [
      "what-is-personal-finance",
      "weekly-finance-review-with-ai",
      "what-are-ai-agents",
    ],
  },
  {
    slug: "what-are-ai-agents",
    authorId: "alvins",
    authorIds: ["alvins"],
    title: "What Are AI Agents? The Complete Beginner Guide to Autonomous Finance in 2026",
    seoTitle: "What Are AI Agents? (Beginner Guide 2026) - Autonomous Finance Explained",
    description:
      "Learn what AI agents are, how they work, and how they are transforming personal finance in 2026. Discover autonomous finance and how AI can manage your money automatically.",
    excerpt:
      "AI agents are moving from simple assistants to autonomous financial systems. This beginner guide explains how they work and why autonomous finance matters now.",
    categorySlug: "ai-agents",
    secondaryCategorySlugs: ["personal-finance"],
    publishedAt: "2026-03-25",
    updatedAt: "2026-03-30",
    readingTime: "7 min read",
    featured: true,
    eyebrow: "Beginner Guide",
    thumbnailClassName: thumbnailByCategory["ai-agents"],
    coverImage: coverImages["ai-agents"],
    tags: [
      "AI agents",
      "autonomous finance",
      "AI finance assistant",
      "personal finance AI",
      "what are AI agents",
      "aima",
      "eva",
    ],
    tldr:
      "AI agents are systems that observe, decide, and act. In finance, they make autonomous guidance and faster decisions possible.",
    summary:
      "AI agents are intelligent systems that can observe data, make decisions, and take actions independently to achieve specific goals. In finance, they make autonomous finance possible by tracking money in real time, spotting unusual patterns, and recommending better decisions before problems grow.",
    simpleExplanation:
      "An AI agent is software that can watch what is happening, think about what it means, and do useful work for you. In finance, that means monitoring spending, spotting risks, and suggesting what to do next without waiting for you to catch every problem manually.",
    keyTakeaways: [
      "AI agents can observe, decide, and act instead of only responding to prompts.",
      "Autonomous finance uses AI agents to monitor spending, detect risks, and suggest actions in real time.",
      "eva shows how an AI finance assistant can turn raw signals into next-step guidance.",
    ],
    breadcrumbs: [
      { label: "AI Agents", href: "/category/ai-agents" },
      { label: "Autonomous Finance" },
    ],
    sections: [
      {
        heading: "What changes when software becomes agentic",
        paragraphs: [
          "AI is no longer just a tool you open and instruct step by step. In agentic systems, the software can observe a goal, gather the context it needs, and move toward an outcome with less manual direction.",
          "That matters in finance because many useful decisions happen too late. By the time a person notices overspending, a growing subscription stack, or a risky pattern, the best intervention window may already be gone.",
        ],
      },
      {
        heading: "What an AI agent actually does",
        paragraphs: [
          "An AI agent is an intelligent system that can observe its environment, reason about a goal, and take action. The important difference is that the system is not just answering prompts. It is coordinating information and deciding what matters next.",
          "In a finance workflow, that might mean monitoring transactions, spotting behavior shifts, and preparing a useful recommendation before a user even opens the product.",
        ],
        bullets: [
          "Observe information from transactions, APIs, and history.",
          "Reason about patterns, priorities, and possible outcomes.",
          "Act by generating alerts, summaries, or suggested next steps.",
        ],
      },
      {
        heading: "Why autonomous finance is a strong first use case",
        paragraphs: [
          "Finance is a natural place for agentic software because the user benefit is easy to understand. People want earlier awareness, fewer money leaks, and more confidence in what action to take next.",
          "Autonomous finance is not about removing people from the loop entirely. It is about reducing delay, reducing friction, and making financial review easier to sustain.",
        ],
      },
      {
        heading: "Where eva fits",
        paragraphs: [
          "Inside aima, eva is the live product where these ideas become real. It is designed to turn spending patterns, recurring costs, and financial pressure into practical guidance instead of passive dashboards.",
          "That is what makes the product useful in everyday life: it helps the user understand what changed, why it matters, and where attention belongs next.",
        ],
      },
      {
        heading: "The future from here",
        paragraphs: [
          "As agentic systems mature, users will spend less time manually stitching together apps and more time describing desired outcomes. The interface becomes less about menus and more about intent, context, and supervised execution.",
          "For finance products, that makes trust, policy boundaries, and clarity even more important. Good agentic products feel helpful because they are both intelligent and understandable.",
        ],
      },
    ],
    inlineCallout:
      "eva turns the idea of autonomous finance into a practical user experience by monitoring patterns and surfacing next-step guidance.",
    productCta: createEvaCta(
      "Use eva to turn raw spending activity into clearer alerts, summaries, and financial next steps.",
      "Explore eva",
    ),
    faqs: [
      {
        question: "What is an AI agent in simple terms?",
        answer: "An AI agent is software that can observe, decide, and act toward a goal instead of only answering prompts.",
      },
      {
        question: "What is autonomous finance?",
        answer:
          "Autonomous finance is the use of AI systems to monitor financial activity, detect changes, and support better decisions without constant manual review.",
      },
      {
        question: "How does eva relate to AI agents?",
        answer:
          "eva is a finance assistant from aima that applies agent-style thinking to spending analysis, anomaly detection, and next-step guidance.",
      },
    ],
    relatedSlugs: [
      "what-is-personal-finance",
      "what-is-kya-know-your-agent",
      "a2a-ap2-kya-explained",
      "inside-eva-finance-workspace",
    ],
  },
  {
    slug: "what-is-kya-know-your-agent",
    authorId: "adams",
    authorIds: ["adams"],
    title: "What Is KYA (Know Your Agent)? The Future of Financial Security in 2026",
    seoTitle: "What Is KYA (Know Your Agent)? vs KYC Explained (2026 Guide)",
    description:
      "Discover what KYA (Know Your Agent) means, how it differs from KYC, and how trusted AI agents are reshaping financial security in 2026.",
    excerpt:
      "KYC verifies the person. KYA verifies the AI agent acting on that person's behalf. That difference matters more as finance becomes more autonomous.",
    categorySlug: "protocols",
    secondaryCategorySlugs: ["ai-agents"],
    publishedAt: "2026-03-30",
    updatedAt: "2026-03-30",
    readingTime: "7 min read",
    featured: true,
    eyebrow: "Financial Trust",
    thumbnailClassName: thumbnailByCategory.protocols,
    coverImage: coverImages.protocols,
    tags: ["KYA", "Know Your Agent", "KYC vs KYA", "AI financial security", "agent trust", "eva"],
    tldr:
      "KYA means Know Your Agent. It verifies the software actor, its permissions, and whether its behavior stays trustworthy.",
    summary:
      "KYA means Know Your Agent. It is the practice of verifying which AI agent is acting, who authorized it, what it is allowed to do, and whether its behavior stays within trusted limits. In finance, that matters because autonomous systems need more than human identity checks to stay safe.",
    simpleExplanation:
      "KYC checks the human. KYA checks the AI agent. If software can act for a user, financial systems need to know which agent it is and what it is allowed to do.",
    keyTakeaways: [
      "KYA stands for Know Your Agent, not Know Your Activity.",
      "KYC verifies the human user, while KYA verifies the software agent acting on the user's behalf.",
      "Trusted agentic finance needs identity, permissions, policy boundaries, and auditability.",
    ],
    breadcrumbs: [
      { label: "Protocols", href: "/category/protocols" },
      { label: "KYA" },
    ],
    sections: [
      {
        heading: "Why KYC alone stops being enough",
        paragraphs: [
          "Traditional financial trust models start with the human account holder. That still matters, but it does not answer what happens when software begins to analyze, recommend, or act on behalf of that user.",
          "Autonomous finance introduces a second actor into the system: the agent. Once that software starts carrying intent, permissions, and execution logic, financial systems need a way to recognize and trust the agent itself.",
        ],
      },
      {
        heading: "What KYA means in practice",
        paragraphs: [
          "Know Your Agent is a trust and security model for software actors. It verifies which agent is operating, who authorized it, and what it is supposed to be allowed to do.",
          "That is different from the mistaken idea that KYA only means watching activity. Behavior still matters, but the first question is whether the software actor is known, attributable, and constrained.",
        ],
        bullets: [
          "Verify agent identity.",
          "Link the agent to an authorized person or organization.",
          "Define policy limits for what the agent can do.",
          "Monitor whether its behavior stays inside those limits.",
        ],
      },
      {
        heading: "Why this matters for finance",
        paragraphs: [
          "Financial workflows have real consequences. If an agent can recommend transfers, approve subscriptions, or trigger actions across payment systems, trust can no longer stop at the user login.",
          "That is why KYA belongs next to other protocol ideas like A2A and AP2. It is the trust layer that helps autonomous finance feel responsible instead of reckless.",
        ],
      },
      {
        heading: "What users should expect from products like eva",
        paragraphs: [
          "Most users do not need to think in protocol language every day, but they do benefit from products that feel trustworthy. That means clarity around what the system sees, what it recommends, and where human review still matters.",
          "eva fits into this shift by helping people understand behavior and anomalies without pretending that the product should make every decision in the dark.",
        ],
      },
    ],
    inlineCallout:
      "Trusted AI finance depends on knowing which software agent is acting, what it can do, and when a human should stay in control.",
    productCta: createEvaCta(
      "Use eva to see how clearer financial signals and better anomaly awareness improve trust in AI-assisted finance.",
      "See eva in action",
    ),
    faqs: [
      {
        question: "What does KYA stand for?",
        answer: "KYA stands for Know Your Agent, a trust model for verifying the software agent acting inside a system.",
      },
      {
        question: "How is KYA different from KYC?",
        answer: "KYC verifies the human customer. KYA verifies the software agent acting on that customer's behalf.",
      },
    ],
    relatedSlugs: [
      "a2a-ap2-kya-explained",
      "agent-to-agent-payments-explained",
      "what-are-ai-agents",
    ],
  },
  {
    slug: "a2a-ap2-kya-explained",
    authorId: "adams",
    authorIds: ["adams"],
    title: "A2A, AP2 & KYA Explained: How AI Agents Will Control Financial Systems in 2026",
    seoTitle: "A2A, AP2 & KYA Explained - The Future of AI Agent Finance (2026 Guide)",
    description:
      "Learn how A2A (Agent-to-Agent), AP2 (Agent Payment Protocol), and KYA (Know Your Agent) are shaping the future of AI-driven finance and autonomous systems.",
    excerpt:
      "A2A helps agents communicate, AP2 helps them transact, and KYA helps financial systems trust them. Together, they form the operating stack for agentic finance.",
    categorySlug: "protocols",
    secondaryCategorySlugs: ["ai-agents"],
    publishedAt: "2026-03-29",
    updatedAt: "2026-03-29",
    readingTime: "8 min read",
    featured: true,
    eyebrow: "Protocol Guide",
    thumbnailClassName: thumbnailByCategory.protocols,
    coverImage: coverImages.protocols,
    tags: ["A2A", "AP2", "KYA", "AI agents finance", "agent payment protocol", "autonomous finance"],
    tldr:
      "A2A is the communication layer, AP2 is the transaction layer, and KYA is the trust layer for autonomous finance.",
    summary:
      "A2A, AP2, and KYA are not isolated ideas. Together they describe the communication, payment, and trust infrastructure needed for AI agents to coordinate and act inside financial systems safely.",
    simpleExplanation:
      "If AI agents are going to work together in finance, they need a way to talk, a way to pay, and a way to be trusted. That is what A2A, AP2, and KYA provide.",
    keyTakeaways: [
      "A2A lets software agents coordinate with each other.",
      "AP2 gives agents a payment execution model.",
      "KYA helps systems trust the agent that is acting.",
    ],
    breadcrumbs: [
      { label: "Protocols", href: "/category/protocols" },
      { label: "AP2" },
    ],
    sections: [
      {
        heading: "The stack behind autonomous finance",
        paragraphs: [
          "The agent economy is not powered by one protocol. It depends on several layers working together. Software agents need a way to exchange context, execute transactions, and prove that their behavior is legitimate.",
          "That is why A2A, AP2, and KYA matter most when they are discussed together. They describe different parts of the same operating system for agentic finance.",
        ],
      },
      {
        heading: "A2A is the communication layer",
        paragraphs: [
          "A2A stands for agent-to-agent communication. It allows one software agent to exchange requests, context, and outcomes with another without forcing the human to manually bridge every step.",
          "In finance, that might mean one agent asking another to confirm pricing, retrieve policy constraints, or coordinate a multi-step workflow before money moves.",
        ],
      },
      {
        heading: "AP2 is the payment layer",
        paragraphs: [
          "AP2, or Agent Payment Protocol, is the layer that turns agent intent into payment execution. Without a payment protocol, software can analyze and recommend but it still cannot transact safely.",
          "A mature AP2 model needs policy limits, traceability, and clear execution boundaries so payment actions stay accountable.",
        ],
      },
      {
        heading: "KYA is the trust layer",
        paragraphs: [
          "KYA completes the stack by verifying which agent is acting and whether it is allowed to perform the requested operation. That matters because payments and coordination are not useful if the system cannot trust the software actor inside the workflow.",
          "Together, A2A, AP2, and KYA describe the communication, transaction, and trust structure required for autonomous financial systems to become practical.",
        ],
      },
      {
        heading: "Why this matters for eva",
        paragraphs: [
          "eva is already moving users toward a finance workflow where signals become recommendations and recommendations become next actions. As the ecosystem around agents matures, that same user need for clarity and trust will only become more important.",
        ],
      },
    ],
    inlineCallout:
      "Protocol literacy matters because trust, communication, and payment execution all shape what autonomous finance can safely become.",
    productCta: createEvaCta(
      "Explore eva to see how agent-style finance experiences can stay useful, readable, and user-centered even as protocol complexity grows.",
      "Try eva",
    ),
    relatedSlugs: [
      "what-is-kya-know-your-agent",
      "agent-to-agent-payments-explained",
      "what-are-ai-agents",
    ],
  },
  {
    slug: "agent-to-agent-payments-explained",
    authorId: "adams",
    authorIds: ["adams"],
    title: "Agent-to-Agent (A2A) Payments: The Future of Autonomous Commerce in 2026",
    seoTitle: "Agent-to-Agent Payments Explained (A2A) - The Future of AI Commerce",
    description:
      "Learn how A2A payments work, why they matter in 2026, and how AI agents will transact autonomously. Discover the opportunities and the risks.",
    excerpt:
      "A2A payments let AI agents transact directly with other agents, turning financial recommendations into autonomous execution across subscriptions, commerce, and operations.",
    categorySlug: "protocols",
    secondaryCategorySlugs: ["personal-finance"],
    publishedAt: "2026-04-03",
    updatedAt: "2026-04-03",
    readingTime: "6 min read",
    featured: false,
    eyebrow: "Payments",
    thumbnailClassName: thumbnailByCategory.protocols,
    coverImage: coverImages.protocols,
    tags: ["agent to agent payments", "A2A payments", "AI fintech", "future of payments", "autonomous commerce"],
    tldr:
      "A2A payments let software agents move from recommendation to transaction, making autonomous commerce possible.",
    summary:
      "Agent-to-agent payments are financial transactions executed between autonomous software systems. They matter because they move AI from analysis into execution, allowing agents to pay subscriptions, switch services, and coordinate money flows with less manual work.",
    simpleExplanation:
      "A2A payments mean one AI agent can pay another system or service without the user manually doing every step.",
    keyTakeaways: [
      "A2A payments let agents execute transactions instead of stopping at recommendations.",
      "They can reduce delay, improve optimization, and support continuous financial workflows.",
      "Trust, regulation, and security still need careful design.",
    ],
    breadcrumbs: [
      { label: "Protocols", href: "/category/protocols" },
      { label: "A2A Payments" },
    ],
    sections: [
      {
        heading: "What changes when agents can pay",
        paragraphs: [
          "Once an AI agent can initiate or coordinate a transaction, the product moves beyond advisory software. It becomes part of the operational layer of commerce itself.",
          "That is why A2A payments matter. They do not just speed up old workflows. They redefine who or what can execute the workflow in the first place.",
        ],
      },
      {
        heading: "Why A2A payments are attractive",
        paragraphs: [
          "Agents can monitor conditions continuously and act faster than people. That makes them useful for recurring payments, service optimization, portfolio maintenance, and routine business operations.",
          "When the system can negotiate, compare, and execute in one flow, the user experiences less friction and fewer missed opportunities.",
        ],
        bullets: [
          "Always-on monitoring.",
          "Faster execution.",
          "Less emotional decision-making.",
          "Better optimization of recurring workflows.",
        ],
      },
      {
        heading: "Where risk enters the picture",
        paragraphs: [
          "The same speed that makes A2A payments attractive also makes mistakes more expensive. If permissions are weak or the agent is poorly monitored, a bad decision can scale fast.",
          "That is why payment infrastructure, policy constraints, and Know Your Agent controls need to mature alongside the product experience.",
        ],
      },
      {
        heading: "Why this still matters today",
        paragraphs: [
          "Even before full autonomous payments become common, people already benefit from finance products that shorten the distance between insight and action. That is where eva fits today: clearer signals, earlier awareness, and faster next steps.",
        ],
      },
    ],
    inlineCallout:
      "The future of payments is not just digital. It is increasingly agentic, policy-aware, and tied to software that can execute with context.",
    productCta: createEvaCta(
      "Start with clearer financial signals inside eva before moving toward more autonomous financial workflows.",
      "Start with eva",
    ),
    relatedSlugs: [
      "a2a-ap2-kya-explained",
      "what-is-kya-know-your-agent",
      "weekly-finance-review-with-ai",
    ],
  },
  {
    slug: "what-is-personal-finance",
    authorId: "alvins",
    authorIds: ["alvins"],
    title: "What Is Personal Finance? (Beginner Guide for 2026)",
    seoTitle: "What Is Personal Finance? Beginner Guide (2026)",
    description:
      "Learn what personal finance is, how to manage your money, save, budget, and invest in 2026. Simple guide plus AI tools to improve your finances.",
    excerpt:
      "Personal finance is simply how you manage your money. This beginner guide explains the basics of earning, spending, saving, investing, and using AI tools to build better money habits.",
    categorySlug: "personal-finance",
    publishedAt: "2026-04-03",
    updatedAt: "2026-04-03",
    readingTime: "7 min read",
    featured: true,
    eyebrow: "Finance Basics",
    thumbnailClassName: thumbnailByCategory["personal-finance"],
    coverImage: coverImages["personal-finance"],
    tags: ["personal finance", "money management", "budgeting", "saving money", "finance basics", "eva"],
    tldr:
      "Personal finance is how you earn, spend, save, invest, and protect money. Good systems make those choices easier.",
    summary:
      "Personal finance is the process of managing income, expenses, savings, investments, and protection. The goal is not complexity. It is control, stability, and better decisions over time.",
    simpleExplanation:
      "Personal finance is simply how you handle money in daily life. That includes what comes in, what goes out, what you save, and how you plan ahead.",
    keyTakeaways: [
      "Personal finance is about control, not complexity.",
      "The five big areas are income, spending, saving, investing, and protection.",
      "AI tools like eva can help people stay aware and consistent.",
    ],
    breadcrumbs: [
      { label: "Personal Finance", href: "/category/personal-finance" },
      { label: "Beginner Guide" },
    ],
    sections: [
      {
        heading: "Why personal finance feels harder than it should",
        paragraphs: [
          "Most people do not struggle because personal finance is impossible. They struggle because money systems are rarely taught in a practical, repeatable way.",
          "The result is that people learn through stress, surprises, and trial and error. A good finance system reduces that friction by making the basics visible and manageable.",
        ],
      },
      {
        heading: "The five pillars that matter most",
        paragraphs: [
          "Personal finance becomes easier when it is broken into clear operating parts. The goal is not to master everything at once. It is to understand the few components that shape most financial outcomes.",
        ],
        bullets: [
          "Income: what you earn and how reliably it comes in.",
          "Spending: where money goes and how habits shift over time.",
          "Savings: what protects you from pressure and surprise.",
          "Investing: how money grows over time instead of sitting still.",
          "Protection: how you reduce risk and avoid preventable financial damage.",
        ],
      },
      {
        heading: "Where most people lose control",
        paragraphs: [
          "The most common failure point is not advanced investing. It is basic awareness. Many people do not know where money leaks are happening until the pressure has already built.",
          "That is why recurring reviews, subscription visibility, and behavior tracking matter so much. Small signals are easier to fix than big financial surprises.",
        ],
      },
      {
        heading: "How AI changes the workflow",
        paragraphs: [
          "AI makes personal finance more useful when it reduces manual checking. A good finance assistant can monitor patterns, highlight anomalies, and suggest what deserves attention now.",
          "That does not replace judgment. It gives the user better context at the moment when action is still easy.",
        ],
      },
      {
        heading: "A stronger starting system",
        paragraphs: [
          "Beginners do not need a perfect financial model. They need a system they can keep using. That means tracking what comes in, watching what changes, and reviewing a few important signals consistently.",
        ],
      },
    ],
    mediaSpotlight: [
      {
        src: "/blog/eva-dashboard-mobile.jpg",
        alt: "A mobile screenshot of the eva dashboard showing key financial indicators and a next action card.",
        caption: "eva demonstrates how a finance product can summarize core signals without overwhelming the user.",
        width: 1080,
        height: 2340,
      },
    ],
    inlineCallout:
      "Personal finance gets easier when the system helps you notice what changed and what matters next.",
    productCta: createEvaCta(
      "Use eva to monitor spending patterns, surface recurring costs, and build clearer money habits over time.",
      "Try eva",
    ),
    faqs: [
      {
        question: "What is personal finance?",
        answer:
          "Personal finance is how you manage income, spending, saving, investing, and protection in daily life.",
      },
      {
        question: "Why do beginners struggle with personal finance?",
        answer:
          "Most people are not taught a clear system. They often react to money problems after they happen instead of noticing patterns early.",
      },
    ],
    relatedSlugs: [
      "weekly-finance-review-with-ai",
      "why-most-budgets-fail-and-what-to-track-instead",
      "inside-eva-finance-workspace",
    ],
  },
  {
    slug: "weekly-finance-review-with-ai",
    authorId: "alvins",
    authorIds: ["alvins"],
    title: "A Simple Weekly Finance Review You Can Run With AI",
    description:
      "Use a practical weekly review to understand spending patterns, risks, and better financial decisions.",
    excerpt:
      "Most people do not need a more complicated budget. They need a weekly review that helps them notice what changed and what to do next.",
    categorySlug: "personal-finance",
    publishedAt: "2026-03-21",
    updatedAt: "2026-03-24",
    readingTime: "6 min read",
    featured: false,
    eyebrow: "Finance Workflow",
    thumbnailClassName: thumbnailByCategory["personal-finance"],
    coverImage: coverImages["personal-finance"],
    tags: ["finance review", "budgeting", "money habits", "eva"],
    tldr:
      "A short weekly finance review works because it is light, repeatable, and focused on the one next decision that matters.",
    summary:
      "A weekly finance review works because it is lightweight, consistent, and focused on decisions. AI becomes useful when it highlights changes, surfaces risks, and helps users respond without getting lost in spreadsheets.",
    simpleExplanation:
      "You do not need to review every money detail every day. A short weekly check-in helps you notice trends, spot problems early, and stay in control.",
    keyTakeaways: [
      "Short weekly reviews are easier to sustain than complex monthly systems.",
      "AI is most useful when it highlights unusual spending and recurring patterns.",
      "The goal is not perfect tracking. The goal is clearer decisions.",
    ],
    breadcrumbs: [
      { label: "Personal Finance", href: "/category/personal-finance" },
      { label: "Weekly Review" },
    ],
    sections: [
      {
        heading: "Why weekly beats overbuilt",
        paragraphs: [
          "People often abandon finance systems because they are too heavy. A weekly rhythm keeps the process short enough to repeat while still catching meaningful changes.",
          "That consistency is more valuable than a complicated model that only gets used once a month when stress is already high.",
        ],
      },
      {
        heading: "What to look for each week",
        paragraphs: [
          "A good weekly review is built around signal detection. You are not auditing every tiny line. You are looking for what changed, what repeated, and what needs attention.",
        ],
        bullets: [
          "Spending spikes compared with the prior week.",
          "Subscriptions or recurring costs worth reviewing.",
          "Savings progress and cash-flow pressure points.",
          "One action to improve next week.",
        ],
      },
      {
        heading: "Where AI actually helps",
        paragraphs: [
          "AI is most useful when it summarizes the story behind the numbers. That lets the user spend less time scanning transactions and more time making the next good decision.",
          "Tools like eva are valuable because they turn scattered financial signals into a readable weekly briefing instead of another manual spreadsheet routine.",
        ],
      },
    ],
    inlineCallout:
      "The best review systems are simple enough to repeat and smart enough to point toward action.",
    productCta: createEvaCta(
      "Use eva to support a repeatable weekly review with clearer spending summaries, category changes, and financial pressure signals.",
      "Run your review with eva",
    ),
    relatedSlugs: [
      "what-is-personal-finance",
      "why-most-budgets-fail-and-what-to-track-instead",
      "inside-eva-finance-workspace",
    ],
  },
  {
    slug: "why-most-budgets-fail-and-what-to-track-instead",
    authorId: "alvins",
    authorIds: ["alvins"],
    title: "Why Most Budgets Fail and What to Track Instead",
    description:
      "Learn why budgets break down and how better financial signals create decisions people can maintain.",
    excerpt:
      "Budget failure is usually not a motivation problem. It is a system design problem built around too much friction and too little feedback.",
    categorySlug: "personal-finance",
    publishedAt: "2026-03-18",
    updatedAt: "2026-03-24",
    readingTime: "5 min read",
    featured: false,
    eyebrow: "Financial Clarity",
    thumbnailClassName: thumbnailByCategory["personal-finance"],
    coverImage: coverImages["personal-finance"],
    tags: ["budgeting", "finance systems", "habits", "money leaks", "eva"],
    tldr:
      "Budgets usually fail because they create too much maintenance and too little feedback. Track stronger signals instead.",
    summary:
      "Budgets fail when they ask for too much precision and provide too little guidance. Tracking trend changes, recurring costs, and cash-flow pressure points often leads to better behavior than forcing perfect budget lines.",
    simpleExplanation:
      "Many budgets fail because they are annoying to maintain. It is usually more helpful to watch a few important signals than to track every tiny detail.",
    keyTakeaways: [
      "Financial systems fail when they create friction without feedback.",
      "Track a few meaningful signals instead of every possible category.",
      "The best systems make it easy to notice change and respond early.",
    ],
    breadcrumbs: [
      { label: "Personal Finance", href: "/category/personal-finance" },
      { label: "Budget Systems" },
    ],
    sections: [
      {
        heading: "Why budgets break down",
        paragraphs: [
          "Rigid budgets often assume that people have time and patience to classify everything perfectly. Real life is messier than that, which is why many budgeting systems start strong and then collapse.",
          "The problem is not always discipline. It is often that the system produces work without producing useful feedback quickly enough.",
        ],
      },
      {
        heading: "What to track instead",
        paragraphs: [
          "A smaller set of signals often tells a clearer story than a giant spreadsheet. What matters most is whether you can notice meaningful change while there is still time to respond.",
        ],
        bullets: [
          "Month-over-month spending changes.",
          "Categories that drift upward repeatedly.",
          "Recurring costs with low value.",
          "Emergency-buffer health and savings consistency.",
        ],
      },
      {
        heading: "Where eva helps",
        paragraphs: [
          "When an AI assistant summarizes changes and offers context, users spend less time manually auditing transactions and more time making better choices. That is the opportunity behind eva.",
        ],
      },
    ],
    inlineCallout:
      "Tracking better signals is often more powerful than building a more complicated budget.",
    productCta: createEvaCta(
      "Use eva to spot trend changes, recurring costs, and financial pressure earlier without forcing a rigid spreadsheet habit.",
      "See eva",
    ),
    relatedSlugs: [
      "weekly-finance-review-with-ai",
      "what-is-personal-finance",
      "inside-eva-finance-workspace",
    ],
  },
];

export const sortedBlogPosts = [...blogPosts].sort(
  (left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
);

export const featuredBlogPosts = sortedBlogPosts.filter((post) => post.featured).slice(0, 4);
export const latestBlogPosts = sortedBlogPosts.slice(0, 8);

export function getCategoryBySlug(slug: string) {
  return blogCategories.find((category) => category.slug === slug);
}

export function getCategoriesForPost(post: BlogPost) {
  return [post.categorySlug, ...(post.secondaryCategorySlugs ?? [])]
    .map((slug) => getCategoryBySlug(slug))
    .filter((category): category is BlogCategory => Boolean(category));
}

export function getPostBySlug(slug: string) {
  return sortedBlogPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(slug: string) {
  return sortedBlogPosts.filter(
    (post) => post.categorySlug === slug || post.secondaryCategorySlugs?.includes(slug as BlogCategorySlug),
  );
}

export function getPostsByAuthor(authorId: BlogAuthorId) {
  return sortedBlogPosts.filter((post) => post.authorIds.includes(authorId));
}

export function getPostsByAuthorSlug(slug: string) {
  const author = getBlogAuthorBySlug(slug);
  return author ? getPostsByAuthor(author.id) : [];
}

export function getRelatedPosts(post: BlogPost) {
  return post.relatedSlugs
    .map((slug) => getPostBySlug(slug))
    .filter((relatedPost): relatedPost is BlogPost => Boolean(relatedPost));
}

export function getPostsByProduct(productName: string) {
  const normalized = productName.trim().toLowerCase();
  return sortedBlogPosts.filter((post) => post.productCta.name.toLowerCase() === normalized);
}

export function getBlogPostUrl(slug: string) {
  return `${blogUrl}/${slug}`;
}

export function getBlogCategoryUrl(slug: string) {
  return `${blogUrl}/category/${slug}`;
}

export function getBlogAuthorUrl(slug: string) {
  return `${blogUrl}/author/${slug}`;
}
