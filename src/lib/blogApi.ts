export type PublicBlogComment = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  url?: string | null;
};

type ApiError = {
  error?: string;
};

async function parseJsonResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  const payload = text ? (JSON.parse(text) as T & ApiError) : ({} as T & ApiError);

  if (!response.ok) {
    throw new Error(payload.error || "Request failed");
  }

  return payload as T;
}

export async function sendBlogEvent(input: Record<string, unknown>) {
  const response = await fetch("/api/blog-event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  return parseJsonResponse<{ ok: boolean }>(response);
}

export async function fetchBlogComments(slug: string) {
  const params = new URLSearchParams({ slug });
  const response = await fetch(`/api/blog-comments?${params.toString()}`);
  return parseJsonResponse<{
    ok: boolean;
    comments: PublicBlogComment[];
    issueUrl?: string | null;
  }>(response);
}

export async function createBlogComment(input: {
  slug: string;
  title: string;
  articleUrl: string;
  name: string;
  email?: string;
  message: string;
}) {
  const response = await fetch("/api/blog-comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  return parseJsonResponse<{
    ok: boolean;
    comment: PublicBlogComment;
    issueUrl?: string | null;
  }>(response);
}

export async function subscribeToBlogUpdates(input: {
  email: string;
  source: string;
  url?: string;
}) {
  const response = await fetch("/api/blog-subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  return parseJsonResponse<{
    ok: boolean;
    subscriberStored: boolean;
  }>(response);
}
