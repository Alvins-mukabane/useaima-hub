export type BlogAuthorId = "alvins" | "adams";

export type BlogAuthorProfile = {
  id: BlogAuthorId;
  slug: string;
  name: string;
  role: string;
  shortBio: string;
  bio: string;
  avatar: string;
  instagramUrl: string;
  instagramHandle: string;
  facebookUrl: string;
  facebookLabel: string;
  primaryUrl: string;
  sameAs: string[];
};

export const defaultBlogAuthorId: BlogAuthorId = "alvins";

export const blogAuthors: Record<BlogAuthorId, BlogAuthorProfile> = {
  alvins: {
    id: "alvins",
    slug: "alvins-mukabane",
    name: "Alvins Mukabane",
    role: "Founder, product engineer, and editorial lead at aima",
    shortBio:
      "Writes about practical AI systems, autonomous finance, and how eva turns raw financial activity into clear action.",
    bio:
      "Alvins leads product direction at aima and writes about practical AI systems, autonomous finance, product clarity, and the operational ideas behind eva. His articles focus on making complex AI and finance topics easier to understand without losing their real-world depth.",
    avatar: "/authors/alvins-mukabane.svg",
    instagramUrl: "https://www.instagram.com/techtrendedge/",
    instagramHandle: "@techtrendedge",
    facebookUrl: "https://www.facebook.com/public/Alvins-Mukabane",
    facebookLabel: "Alvins Mukabane",
    primaryUrl: "https://www.instagram.com/techtrendedge/",
    sameAs: [
      "https://www.instagram.com/techtrendedge/",
      "https://www.facebook.com/public/Alvins-Mukabane",
    ],
  },
  adams: {
    id: "adams",
    slug: "adams-aura",
    name: "Adams Aura",
    role: "Research and content contributor at aima",
    shortBio:
      "Writes about AI agents, protocol infrastructure, financial trust, and the systems thinking behind autonomous commerce.",
    bio:
      "Adams contributes research-driven explainers on AI agents, protocol infrastructure, financial trust, and the systems thinking behind autonomous commerce. His writing connects technical shifts like A2A, AP2, and KYA to practical product understanding inside the aima ecosystem.",
    avatar: "/authors/adams-aura.svg",
    instagramUrl: "https://www.instagram.com/adams.2wild/",
    instagramHandle: "@adams.2wild",
    facebookUrl: "https://www.facebook.com/public/Pos-Sheisty",
    facebookLabel: "Pos sheisty",
    primaryUrl: "https://www.instagram.com/adams.2wild/",
    sameAs: [
      "https://www.instagram.com/adams.2wild/",
      "https://www.facebook.com/public/Pos-Sheisty",
    ],
  },
};

export const blogAuthorList = Object.values(blogAuthors);

export function getBlogAuthor(authorId: BlogAuthorId = defaultBlogAuthorId) {
  return blogAuthors[authorId] ?? blogAuthors[defaultBlogAuthorId];
}

export function getBlogAuthorBySlug(slug: string) {
  return blogAuthorList.find((author) => author.slug === slug);
}
