import { blogUrl, supportUrl } from "@/content/siteContent";

function normalizePath(path: string) {
  if (!path || path === "/") return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export function isBlogHost() {
  if (typeof window === "undefined") return false;
  return window.location.hostname.toLowerCase() === "blog.useaima.com";
}

export function isSupportHost() {
  if (typeof window === "undefined") return false;
  return window.location.hostname.toLowerCase() === "support.useaima.com";
}

export function getBlogRoute(path = "/") {
  const normalizedPath = normalizePath(path);
  if (isBlogHost()) return normalizedPath;
  return normalizedPath === "/" ? "/blog" : `/blog${normalizedPath}`;
}

export function getBlogCanonicalUrl(path = "/") {
  return new URL(normalizePath(path), blogUrl).toString();
}

export function getSupportCanonicalUrl(path = "/") {
  return new URL(normalizePath(path), supportUrl).toString();
}
