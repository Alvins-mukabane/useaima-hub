import { handleBlogSubscribeRequest, handleNetlify } from "../../server/blog-api.mjs";

export async function handler(event) {
  return handleNetlify(handleBlogSubscribeRequest, event);
}
