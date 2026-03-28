import { handleBlogEventRequest, handleVercel } from "../server/blog-api.mjs";

export default async function handler(req, res) {
  return handleVercel(handleBlogEventRequest, req, res);
}
