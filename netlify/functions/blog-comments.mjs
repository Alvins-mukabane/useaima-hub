import { handleBlogCommentsRequest, handleNetlify } from "../../server/blog-api.mjs";

export async function handler(event) {
  return handleNetlify(handleBlogCommentsRequest, event);
}
