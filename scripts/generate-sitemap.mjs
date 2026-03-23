import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const siteUrl = "https://useaima.com";
const today = new Date().toISOString().slice(0, 10);

const routes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/finance", changefreq: "weekly", priority: "0.8" },
  { path: "/health", changefreq: "weekly", priority: "0.7" },
  { path: "/kids", changefreq: "weekly", priority: "0.8" },
  { path: "/privacy-policy", changefreq: "monthly", priority: "0.5" },
  { path: "/terms-of-service", changefreq: "monthly", priority: "0.5" },
];

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map(
    ({ path, changefreq, priority }) => `  <url>
    <loc>${new URL(path, siteUrl).toString()}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  ),
  "</urlset>",
  "",
].join("\n");

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const outputPath = resolve(rootDir, "public", "sitemap.xml");

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, xml, "utf8");

console.log(`Generated sitemap at ${outputPath}`);
