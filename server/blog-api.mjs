const DEFAULT_ALERT_EMAIL = "mukabanealvins@gmail.com";
const DEFAULT_GITHUB_OWNER = "Alvins-mukabane";
const DEFAULT_GITHUB_REPO = "useaima-hub";
const GITHUB_API_BASE = "https://api.github.com";
const RESEND_API_BASE = "https://api.resend.com";
const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: JSON_HEADERS,
    body: JSON.stringify(body),
  };
}

function parseBody(rawBody) {
  if (!rawBody) return {};
  if (typeof rawBody === "object") return rawBody;

  try {
    return JSON.parse(rawBody);
  } catch {
    return {};
  }
}

function cleanString(value, maxLength = 280) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function cleanMultiline(value, maxLength = 4000) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\r\n/g, "\n").slice(0, maxLength);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function githubRepoPath() {
  const owner = process.env.GITHUB_OWNER ?? DEFAULT_GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO ?? DEFAULT_GITHUB_REPO;
  return { owner, repo };
}

async function githubRequest(path, options = {}) {
  const token = process.env.GITHUB_TOKEN;
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "USEAIMA-Blog-API",
    "X-GitHub-Api-Version": "2022-11-28",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  } else if (options.requireAuth) {
    throw new Error("Missing GITHUB_TOKEN");
  }

  const response = await fetch(`${GITHUB_API_BASE}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (options.allow404 && response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub request failed (${response.status}): ${text}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

function buildDiscussionIssueBody({ slug, title, url }) {
  return [
    "<!-- useaima-blog-discussion",
    `slug: ${slug}`,
    `url: ${url}`,
    "-->",
    "",
    `Public discussion thread for "${title}" on the USEAIMA blog.`,
    "",
    `Source article: ${url}`,
  ].join("\n");
}

function buildCommentBody({ name, email, message }) {
  const hiddenMeta = [
    "<!-- useaima-blog-comment",
    `author: ${name}`,
    email ? `email: ${email}` : "",
    "-->",
  ]
    .filter(Boolean)
    .join("\n");

  return `${hiddenMeta}\n\n${message}`;
}

function parseCommentBody(body, fallbackName) {
  const source = cleanMultiline(body, 8000);
  const match = source.match(/<!--\s*useaima-blog-comment\s*([\s\S]*?)-->\s*([\s\S]*)$/m);

  if (!match) {
    return {
      name: fallbackName || "USEAIMA Reader",
      message: source,
    };
  }

  const meta = match[1]
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const message = match[2].trim();
  const authorLine = meta.find((line) => line.startsWith("author:"));
  const name = authorLine ? authorLine.replace("author:", "").trim() : fallbackName || "USEAIMA Reader";

  return { name, message };
}

async function findDiscussionIssue(slug) {
  const { owner, repo } = githubRepoPath();
  const issues = await githubRequest(`/repos/${owner}/${repo}/issues?state=all&per_page=100`);

  return issues.find(
    (issue) =>
      !issue.pull_request &&
      typeof issue.body === "string" &&
      issue.body.includes("useaima-blog-discussion") &&
      issue.body.includes(`slug: ${slug}`),
  );
}

async function ensureDiscussionIssue({ slug, title, url }) {
  const existingIssue = await findDiscussionIssue(slug);
  if (existingIssue) return existingIssue;

  const { owner, repo } = githubRepoPath();
  return githubRequest(`/repos/${owner}/${repo}/issues`, {
    method: "POST",
    requireAuth: true,
    body: {
      title: `Blog discussion: ${title}`,
      body: buildDiscussionIssueBody({ slug, title, url }),
    },
  });
}

async function listDiscussionComments(slug) {
  const issue = await findDiscussionIssue(slug);
  if (!issue) {
    return {
      comments: [],
      issueUrl: null,
    };
  }

  const { owner, repo } = githubRepoPath();
  const comments = await githubRequest(`/repos/${owner}/${repo}/issues/${issue.number}/comments?per_page=100`);

  return {
    issueUrl: issue.html_url,
    comments: comments
      .map((comment) => {
        const parsed = parseCommentBody(comment.body ?? "", comment.user?.login);
        return {
          id: String(comment.id),
          name: parsed.name,
          message: parsed.message,
          createdAt: comment.created_at,
          url: comment.html_url,
        };
      })
      .filter((comment) => comment.message.length > 0),
  };
}

async function createDiscussionComment({ slug, title, articleUrl, name, email, message }) {
  const issue = await ensureDiscussionIssue({ slug, title, url: articleUrl });
  const { owner, repo } = githubRepoPath();
  const comment = await githubRequest(`/repos/${owner}/${repo}/issues/${issue.number}/comments`, {
    method: "POST",
    requireAuth: true,
    body: {
      body: buildCommentBody({ name, email, message }),
    },
  });

  return {
    comment: {
      id: String(comment.id),
      name,
      message,
      createdAt: comment.created_at,
      url: comment.html_url,
    },
    issueUrl: issue.html_url,
  };
}

async function resendRequest(path, options = {}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }

  const response = await fetch(`${RESEND_API_BASE}${path}`, {
    method: options.method ?? "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (options.allow404 && response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Resend request failed (${response.status}): ${text}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

async function sendOwnerEmail({ subject, lines }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { skipped: true };

  const from = process.env.RESEND_FROM_EMAIL ?? "USEAIMA Alerts <alerts@useaima.com>";
  const to = process.env.BLOG_ALERT_EMAIL_TO ?? DEFAULT_ALERT_EMAIL;
  const text = lines.join("\n");
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;">
      <h2 style="margin-bottom:16px;">${escapeHtml(subject)}</h2>
      ${lines.map((line) => `<p style="margin:0 0 10px;">${escapeHtml(line)}</p>`).join("")}
    </div>
  `;

  await resendRequest("/emails", {
    method: "POST",
    body: {
      from,
      to: [to],
      subject,
      text,
      html,
    },
  });

  return { skipped: false };
}

async function sendSlackNotification({ title, lines }) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return { skipped: true };

  const payload = {
    text: `${title}\n${lines.join("\n")}`,
  };

  if (process.env.SLACK_CHANNEL) {
    payload.channel = process.env.SLACK_CHANNEL;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Slack webhook failed (${response.status}): ${text}`);
  }

  return { skipped: false };
}

async function notifyOwner({ title, lines }) {
  const results = await Promise.allSettled([
    sendOwnerEmail({ subject: title, lines }),
    sendSlackNotification({ title, lines }),
  ]);

  return results.map((result) => (result.status === "fulfilled" ? result.value : { error: result.reason?.message ?? "Unknown error" }));
}

async function upsertSubscriber(email) {
  if (!process.env.RESEND_API_KEY) {
    return {
      configured: false,
    };
  }

  const contactPath = `/contacts/${encodeURIComponent(email)}`;
  const existing = await resendRequest(contactPath, { allow404: true });
  const basePayload = {
    unsubscribed: false,
    properties: {
      source: "useaima-blog",
      cadence: "daily-updates",
    },
  };

  if (existing?.id) {
    await resendRequest(contactPath, {
      method: "PATCH",
      body: basePayload,
    });
  } else {
    const body = {
      email,
      ...basePayload,
    };

    if (process.env.RESEND_BLOG_TOPIC_ID) {
      body.topics = [
        {
          id: process.env.RESEND_BLOG_TOPIC_ID,
          subscription: "opt_in",
        },
      ];
    }

    await resendRequest("/contacts", {
      method: "POST",
      body,
    });
  }

  return {
    configured: true,
  };
}

export async function handleBlogEventRequest(request) {
  if (request.method !== "POST") {
    return json(405, { ok: false, error: "Method not allowed" });
  }

  const body = parseBody(request.body);
  const type = cleanString(body.type, 40);
  const title = cleanString(body.title, 180) || "USEAIMA Blog";
  const url = cleanString(body.url, 500);
  const path = cleanString(body.path, 240);
  const visitorId = cleanString(body.visitorId, 120);
  const referrer = cleanString(body.referrer, 280);

  if (!["visit", "like", "share"].includes(type)) {
    return json(400, { ok: false, error: "Unsupported blog event type" });
  }

  const prettyType = type === "visit" ? "New blog visitor" : type === "like" ? "New article like" : "New article share";
  const lines = [
    `Event: ${prettyType}`,
    `Title: ${title}`,
    url ? `URL: ${url}` : "",
    path ? `Path: ${path}` : "",
    visitorId ? `Visitor ID: ${visitorId}` : "",
    referrer ? `Referrer: ${referrer}` : "",
  ].filter(Boolean);

  const notifications = await notifyOwner({
    title: `${prettyType} on USEAIMA Blog`,
    lines,
  });

  return json(200, {
    ok: true,
    notifications,
  });
}

export async function handleBlogCommentsRequest(request) {
  if (request.method === "GET") {
    const slug = cleanString(request.query?.slug, 120);
    if (!slug) {
      return json(400, { ok: false, error: "Missing article slug" });
    }

    try {
      const payload = await listDiscussionComments(slug);
      return json(200, {
        ok: true,
        ...payload,
      });
    } catch (error) {
      return json(500, {
        ok: false,
        error: error.message || "Failed to load comments",
      });
    }
  }

  if (request.method !== "POST") {
    return json(405, { ok: false, error: "Method not allowed" });
  }

  const body = parseBody(request.body);
  const slug = cleanString(body.slug, 120);
  const title = cleanString(body.title, 180);
  const articleUrl = cleanString(body.articleUrl, 500);
  const name = cleanString(body.name, 80);
  const email = cleanString(body.email, 160);
  const message = cleanMultiline(body.message, 2000);

  if (!slug || !title || !articleUrl) {
    return json(400, { ok: false, error: "Missing article details" });
  }

  if (name.length < 2) {
    return json(400, { ok: false, error: "Use a longer display name" });
  }

  if (email && !isValidEmail(email)) {
    return json(400, { ok: false, error: "Enter a valid email or leave it blank" });
  }

  if (message.length < 8) {
    return json(400, { ok: false, error: "Comment is too short" });
  }

  try {
    const payload = await createDiscussionComment({
      slug,
      title,
      articleUrl,
      name,
      email,
      message,
    });

    const lines = [
      `Article: ${title}`,
      `Author: ${name}`,
      email ? `Email: ${email}` : "",
      `URL: ${articleUrl}`,
      `Comment: ${message}`,
    ].filter(Boolean);

    const notifications = await notifyOwner({
      title: `New blog comment on ${title}`,
      lines,
    });

    return json(200, {
      ok: true,
      ...payload,
      notifications,
    });
  } catch (error) {
    return json(500, {
      ok: false,
      error: error.message || "Failed to create comment",
    });
  }
}

export async function handleBlogSubscribeRequest(request) {
  if (request.method !== "POST") {
    return json(405, { ok: false, error: "Method not allowed" });
  }

  const body = parseBody(request.body);
  const email = cleanString(body.email, 160).toLowerCase();
  const source = cleanString(body.source, 160) || "blog";
  const url = cleanString(body.url, 500);

  if (!isValidEmail(email)) {
    return json(400, { ok: false, error: "Enter a valid email address" });
  }

  try {
    const result = await upsertSubscriber(email);
    const lines = [
      `Subscriber: ${email}`,
      `Source: ${source}`,
      url ? `URL: ${url}` : "",
    ].filter(Boolean);

    const notifications = await notifyOwner({
      title: "New USEAIMA blog subscriber",
      lines,
    });

    return json(200, {
      ok: true,
      subscriberStored: result.configured,
      notifications,
    });
  } catch (error) {
    return json(500, {
      ok: false,
      error: error.message || "Failed to subscribe email",
    });
  }
}

export async function handleVercel(handler, req, res) {
  const result = await handler({
    method: req.method,
    body: req.body,
    query: req.query ?? {},
    headers: req.headers ?? {},
  });

  Object.entries(result.headers ?? {}).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
  res.status(result.statusCode).send(result.body);
}

export async function handleNetlify(handler, event) {
  return handler({
    method: event.httpMethod,
    body: event.body,
    query: event.queryStringParameters ?? {},
    headers: event.headers ?? {},
  });
}
