import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "useaima-blog-engagement-v1";
const UPDATE_EVENT = "useaima-blog-engagement-updated";

export type BlogArticleEngagement = {
  liked: boolean;
  likes: number;
  shares: number;
};

type BlogEngagementStore = Record<string, BlogArticleEngagement>;

const defaultEngagement: BlogArticleEngagement = {
  liked: false,
  likes: 0,
  shares: 0,
};

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function normalizeEngagement(value: unknown): BlogArticleEngagement {
  if (!value || typeof value !== "object") return { ...defaultEngagement };

  const engagement = value as Partial<BlogArticleEngagement>;
  return {
    liked: Boolean(engagement.liked),
    likes: typeof engagement.likes === "number" ? engagement.likes : 0,
    shares: typeof engagement.shares === "number" ? engagement.shares : 0,
  };
}

function readStore(): BlogEngagementStore {
  if (!canUseStorage()) return {};

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return Object.fromEntries(
      Object.entries(parsed).map(([slug, engagement]) => [slug, normalizeEngagement(engagement)])
    );
  } catch {
    return {};
  }
}

function writeStore(store: BlogEngagementStore) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function notifyUpdate(slug: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: { slug } }));
}

export function getBlogArticleEngagement(slug: string) {
  const store = readStore();
  return normalizeEngagement(store[slug]);
}

export function useBlogEngagement(slug: string) {
  const [engagement, setEngagement] = useState<BlogArticleEngagement>(() => getBlogArticleEngagement(slug));

  useEffect(() => {
    setEngagement(getBlogArticleEngagement(slug));

    const handleStorage = (event: StorageEvent) => {
      if (event.key && event.key !== STORAGE_KEY) return;
      setEngagement(getBlogArticleEngagement(slug));
    };

    const handleCustomUpdate = (event: Event) => {
      const detail = (event as CustomEvent<{ slug?: string }>).detail;
      if (!detail?.slug || detail.slug === slug) {
        setEngagement(getBlogArticleEngagement(slug));
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(UPDATE_EVENT, handleCustomUpdate);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(UPDATE_EVENT, handleCustomUpdate);
    };
  }, [slug]);

  const updateEngagement = useCallback(
    (updater: (current: BlogArticleEngagement) => BlogArticleEngagement) => {
      const store = readStore();
      const nextEngagement = updater(normalizeEngagement(store[slug]));
      store[slug] = nextEngagement;
      writeStore(store);
      setEngagement(nextEngagement);
      notifyUpdate(slug);
    },
    [slug]
  );

  const toggleLike = useCallback(() => {
    updateEngagement((current) => {
      const liked = !current.liked;
      return {
        ...current,
        liked,
        likes: Math.max(0, current.likes + (liked ? 1 : -1)),
      };
    });
  }, [updateEngagement]);

  const registerShare = useCallback(() => {
    updateEngagement((current) => ({
      ...current,
      shares: current.shares + 1,
    }));
  }, [updateEngagement]);

  return useMemo(
    () => ({
      engagement,
      likes: engagement.likes,
      shares: engagement.shares,
      liked: engagement.liked,
      toggleLike,
      registerShare,
    }),
    [engagement, registerShare, toggleLike]
  );
}
