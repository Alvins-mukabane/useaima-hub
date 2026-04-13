import {
  blogUrl,
  siteDescription,
  siteEmail,
  siteName,
  siteTagline,
  siteUrl,
  supportLinks,
  supportUrl,
  toolLinks,
} from "@/content/siteContent";
import { BlogAuthorProfile } from "@/content/blogAuthors";

export type StructuredDataEntry = Record<string, unknown>;

export type AgentKey = "eva";

export type AgentProfile = {
  key: AgentKey;
  name: string;
  applicationCategory: string;
  pageHref: string;
  toolHref: string;
  logoPath: string;
  description: string;
  utilityTldr: string;
  previewLabel: string;
  relatedKeys: AgentKey[];
};

export const organizationSchemaId = `${siteUrl}#organization`;
export const protocolSchemaId = `${siteUrl}#agent-protocols`;

export const agentProfiles: AgentProfile[] = [
  {
    key: "eva",
    name: "eva",
    applicationCategory: "FinanceApplication",
    pageHref: toolLinks.eva,
    toolHref: toolLinks.eva,
    logoPath: "/eva-logo.png",
    description: "AI finance assistant for spending visibility, anomaly detection, subscription review, and clearer next-step guidance.",
    utilityTldr: "eva helps users understand spending, spot risks early, and turn financial signals into next-step guidance.",
    previewLabel: "Open eva",
    relatedKeys: [],
  },
];

function getAgentSchemaId(key: AgentKey) {
  return `${siteUrl}#agent-${key}`;
}

export function getAgentByKey(key: AgentKey) {
  return agentProfiles.find((agent) => agent.key === key);
}

export function getAgentByName(name: string) {
  const normalizedName = name.trim().toLowerCase();
  return agentProfiles.find((agent) => agent.name.toLowerCase() === normalizedName);
}

export function getRelatedAgents(agentKey: AgentKey, limit = 3) {
  const agent = getAgentByKey(agentKey);
  if (!agent) return [];

  return agent.relatedKeys
    .map((key) => getAgentByKey(key))
    .filter((relatedAgent): relatedAgent is AgentProfile => Boolean(relatedAgent))
    .slice(0, limit);
}

export function getAgentStructuredData(agentKey: AgentKey): StructuredDataEntry {
  const agent = getAgentByKey(agentKey);
  if (!agent) {
    throw new Error(`Unknown agent key: ${agentKey}`);
  }

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": getAgentSchemaId(agent.key),
    name: agent.name,
    applicationCategory: agent.applicationCategory,
    operatingSystem: "Web",
    url: agent.pageHref,
    downloadUrl: agent.toolHref,
    image: `${siteUrl}${agent.logoPath}`,
    description: agent.description,
    brand: {
      "@id": organizationSchemaId,
    },
    publisher: {
      "@id": organizationSchemaId,
    },
    isRelatedTo: {
      "@id": organizationSchemaId,
    },
  };
}

export function getPersonStructuredData(author: BlogAuthorProfile): StructuredDataEntry {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${blogUrl}/author/${author.slug}#person`,
    name: author.name,
    url: `${blogUrl}/author/${author.slug}`,
    image: `${siteUrl}${author.avatar}`,
    description: author.bio,
    jobTitle: author.role,
    sameAs: author.sameAs,
    worksFor: {
      "@id": organizationSchemaId,
    },
  };
}

export const baseStructuredData: StructuredDataEntry[] = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationSchemaId,
    name: siteName,
    alternateName: ["aima", "USEAIMA", "useaima"],
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/aima-mark.png`,
      width: 1024,
      height: 1024,
    },
    image: `${siteUrl}/aima-mark.png`,
    description: siteDescription,
    slogan: siteTagline,
    email: siteEmail,
    sameAs: [blogUrl, supportUrl, supportLinks.instagram, supportLinks.youtube],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: siteEmail,
        url: supportUrl,
        availableLanguage: ["en-US"],
      },
    ],
    knowsAbout: [
      "AI finance assistants",
      "Personal finance intelligence",
      "Autonomous finance",
      "Spending analysis",
      "AP2",
      "A2A",
      "KYA",
    ],
    hasPart: agentProfiles.map((agent) => ({
      "@id": getAgentSchemaId(agent.key),
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": protocolSchemaId,
    name: "Agent Economy Protocol Definitions",
    description: "Core protocol definitions published by aima for AI agent payments, coordination, and trust.",
    creator: {
      "@id": organizationSchemaId,
    },
    hasDefinedTerm: [
      {
        "@type": "DefinedTerm",
        "@id": `${siteUrl}#term-ap2`,
        name: "AP2 Protocol",
        alternateName: "Agent Payments Protocol",
        termCode: "AP2",
        description:
          "AP2 is the payment layer that helps AI agents initiate and coordinate transactions with explicit policy limits and safer execution rules.",
        url: `${blogUrl}/a2a-ap2-kya-explained`,
        inDefinedTermSet: {
          "@id": protocolSchemaId,
        },
      },
      {
        "@type": "DefinedTerm",
        "@id": `${siteUrl}#term-a2a`,
        name: "A2A",
        alternateName: "Agent-to-Agent",
        termCode: "A2A",
        description:
          "A2A describes the communication layer that allows AI agents to exchange context, coordinate actions, and complete workflows together.",
        url: `${blogUrl}/agent-to-agent-payments-explained`,
        inDefinedTermSet: {
          "@id": protocolSchemaId,
        },
      },
      {
        "@type": "DefinedTerm",
        "@id": `${siteUrl}#term-kya`,
        name: "KYA",
        alternateName: "Know Your Agent",
        termCode: "KYA",
        description:
          "KYA is the trust layer for autonomous systems, verifying which agent is acting, what it is allowed to do, and whether its behavior is still trustworthy.",
        url: `${blogUrl}/what-is-kya-know-your-agent`,
        inDefinedTermSet: {
          "@id": protocolSchemaId,
        },
      },
    ],
  },
  ...agentProfiles.map((agent) => getAgentStructuredData(agent.key)),
];

export function dedupeStructuredData(entries: StructuredDataEntry[]) {
  const seen = new Set<string>();
  const deduped: StructuredDataEntry[] = [];

  for (let index = entries.length - 1; index >= 0; index -= 1) {
    const entry = entries[index];
    const id = typeof entry["@id"] === "string" ? entry["@id"] : `${entry["@type"] ?? "structured-data"}-${index}`;

    if (seen.has(id)) {
      continue;
    }

    seen.add(id);
    deduped.unshift(entry);
  }

  return deduped;
}

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export type AgentContentContext = {
  title?: string;
  tags?: string[];
  categorySlug?: string;
  productName?: string;
  excerpt?: string;
};

export function createBreadcrumbStructuredData(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href,
    })),
  };
}

export function createTldr(text: string, maxLength = 150) {
  const collapsed = text.replace(/\s+/g, " ").trim();

  if (collapsed.length <= maxLength) {
    return collapsed;
  }

  const sliced = collapsed.slice(0, maxLength - 1);
  const lastSpace = sliced.lastIndexOf(" ");

  if (lastSpace < 90) {
    return `${sliced.trimEnd()}...`;
  }

  return `${sliced.slice(0, lastSpace).trimEnd()}...`;
}

export function getProtocolContext(title: string, tags: string[]) {
  const haystack = `${title} ${tags.join(" ")}`.toUpperCase();

  if (haystack.includes("AP2")) {
    return {
      label: "AP2",
      href: `${blogUrl}/a2a-ap2-kya-explained`,
    };
  }

  if (haystack.includes("A2A")) {
    return {
      label: "A2A",
      href: `${blogUrl}/agent-to-agent-payments-explained`,
    };
  }

  if (haystack.includes("KYA")) {
    return {
      label: "KYA",
      href: `${blogUrl}/what-is-kya-know-your-agent`,
    };
  }

  return null;
}

export function inferRelevantAgentKeys(
  { title = "", tags = [], categorySlug = "", productName = "", excerpt = "" }: AgentContentContext,
  limit = 3,
) {
  const haystack = `${title} ${productName} ${excerpt} ${categorySlug} ${tags.join(" ")}`.toLowerCase();
  const matches: AgentKey[] = [];

  const add = (key: AgentKey) => {
    if (!matches.includes(key)) {
      matches.push(key);
    }
  };

  if (
    /eva|finance|budget|spending|money|payments?|ap2|a2a|kya|autonomous finance|subscription/.test(haystack)
  ) {
    add("eva");
  }

  if (matches.length === 0) {
    add("eva");
  }

  return matches.slice(0, limit);
}

export function getPrimaryAgentKey(context: AgentContentContext) {
  return inferRelevantAgentKeys(context, 1)[0] ?? "eva";
}
