import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { sendBlogEvent } from "@/lib/blogApi";

const BLOG_VISITOR_ID_KEY = "useaima-blog-visitor-id";
const BLOG_VISITOR_NOTIFIED_KEY = "useaima-blog-visitor-notified-v1";

function createVisitorId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `visitor-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getOrCreateBlogVisitorId() {
  if (typeof window === "undefined") return "server-render";

  const existing = window.localStorage.getItem(BLOG_VISITOR_ID_KEY);
  if (existing) return existing;

  const nextId = createVisitorId();
  window.localStorage.setItem(BLOG_VISITOR_ID_KEY, nextId);
  return nextId;
}

export function useBlogVisitorTracking() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const alreadyNotified = window.localStorage.getItem(BLOG_VISITOR_NOTIFIED_KEY);
    if (alreadyNotified) return;

    const visitorId = getOrCreateBlogVisitorId();
    window.localStorage.setItem(BLOG_VISITOR_NOTIFIED_KEY, new Date().toISOString());

    void sendBlogEvent({
      type: "visit",
      visitorId,
      path: location.pathname,
      url: window.location.href,
      referrer: document.referrer,
      pageTitle: document.title,
      language: navigator.language,
      userAgent: navigator.userAgent,
    }).catch(() => {
      window.localStorage.removeItem(BLOG_VISITOR_NOTIFIED_KEY);
    });
  }, [location.pathname]);
}
