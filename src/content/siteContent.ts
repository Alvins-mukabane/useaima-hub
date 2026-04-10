export const siteName = "aima";
export const siteUrl = "https://useaima.com";
export const blogUrl = "https://blog.useaima.com";
export const supportUrl = "https://support.useaima.com";
export const siteEmail = "help@useaima.com";
export const siteDescription =
  "aima is the official company behind eva, an AI finance assistant built to help people understand spending, spot anomalies early, and make clearer money decisions.";
export const siteTagline =
  "aima builds eva, an AI finance assistant for spending analysis, anomaly detection, and everyday financial decision support.";
export const siteBrandSummary =
  "aima is the official home of eva, a live AI finance assistant that turns financial activity into alerts, summaries, and practical next-step guidance.";
export const brandKeywords = [
  "aima",
  "useaima",
  "aima official website",
  "aima AI platform",
  "aima blog",
  "eva by aima",
  "eva.useaima.com",
  "eva finance assistant",
  "AI finance assistant",
  "AI finance startup",
  "aima support",
] as const;

export const toolLinks = {
  eva: "https://eva.useaima.com",
  socialPulse: "https://socialpulse.useaima.com",
  financeAI: "https://eva.useaima.com",
  emailAI: "https://mailmind.useaima.com",
} as const;

export const supportLinks = {
  home: supportUrl,
  email: `mailto:${siteEmail}`,
  emailAddress: siteEmail,
  instagram: "https://www.instagram.com/aima.ai123/",
  instagramHandle: "@aima.ai123",
  youtube: "https://www.youtube.com/channel/UCdUDx6XhvYMKTpEfjUPGgEQ",
  youtubeLabel: "aima",
} as const;

export const supportChannels = [
  {
    title: "Email support",
    description: "Reach the team directly for product questions, startup inquiries, or help using eva.",
    href: supportLinks.email,
    label: supportLinks.emailAddress,
  },
  {
    title: "Instagram updates",
    description: "Follow aima for quick updates, product drops, and support prompts.",
    href: supportLinks.instagram,
    label: supportLinks.instagramHandle,
  },
  {
    title: "YouTube explainers",
    description: "Watch explainers, walkthroughs, and product updates from the aima team.",
    href: supportLinks.youtube,
    label: supportLinks.youtubeLabel,
  },
  {
    title: "Support hub",
    description: "Use the support center for help, Q&A, product guidance, and the fastest route to answers.",
    href: supportLinks.home,
    label: "support.useaima.com",
  },
] as const;

export const faqItems = [
  {
    question: "What is aima?",
    answer:
      "aima is the official platform behind eva, an AI finance assistant designed to help people understand spending, track patterns, and make better financial decisions.",
  },
  {
    question: "What kind of tools does aima offer?",
    answer:
      "aima currently focuses on eva, the AI finance assistant built for financial guidance, anomaly detection, and decision support.",
  },
  {
    question: "Are the tools free to use?",
    answer:
      "Some tools may be free during early stages or offer limited free access. As the platform grows, certain advanced features may require a subscription or premium access.",
  },
  {
    question: "How is my data handled?",
    answer:
      "aima is designed with privacy in mind. User data is processed securely and is not shared without consent. The goal is to provide intelligent insights while maintaining trust and data protection.",
  },
  {
    question: "Can I use multiple tools together?",
    answer:
      "Right now, aima is focused on eva as the main product experience. Future tools may be added over time, but the current public platform centers on finance.",
  },
  {
    question: "Who is aima for?",
    answer:
      "aima is designed for students, professionals, content creators, developers, and anyone looking to improve productivity and decision-making using AI.",
  },
  {
    question: "Does aima replace human decision-making?",
    answer:
      "No. aima assists and guides decisions but does not replace human judgment. It provides insights, recommendations, and analysis to help users make better choices.",
  },
  {
    question: "How accurate are the AI recommendations?",
    answer:
      "The system is designed to provide useful and data-driven insights, but results may vary depending on the quality of the input data. Users should always review recommendations before acting on them.",
  },
  {
    question: "Is aima a single app or multiple platforms?",
    answer:
      "Today, aima is primarily the home of eva. The platform may expand in the future, but the current live product focus is the finance experience.",
  },
  {
    question: "How can I stay updated with new features?",
    answer:
      "You can stay updated by visiting the aima blog, checking product pages like Finance, and following new product updates and changelogs across the platform.",
  },
  {
    question: "How do I get help and support?",
    answer:
      "You can get help through support.useaima.com, by emailing help@useaima.com, or by following aima on Instagram and YouTube for updates and explainers.",
  },
] as const;

export const supportFaqItems = [
  {
    question: "What is aima?",
    answer:
      "aima is the company behind eva, the AI finance assistant focused on spending clarity, anomaly detection, and better everyday money decisions.",
  },
  {
    question: "What is eva?",
    answer:
      "eva is the live product from aima. It helps people review financial activity, understand spending behavior, spot risks earlier, and make smarter next decisions.",
  },
  {
    question: "Where do I get support for eva?",
    answer:
      "The official support hub is support.useaima.com. You can also email help@useaima.com for direct product and account support.",
  },
  {
    question: "Where can I learn more about the product?",
    answer:
      "You can explore eva at eva.useaima.com, read practical explainers on blog.useaima.com, and visit useaima.com/about for the company story and product direction.",
  },
  {
    question: "Can I contact the team on social media?",
    answer:
      "Yes. aima shares updates and support prompts on Instagram at aima.ai123 and on the official aima YouTube channel.",
  },
] as const;
