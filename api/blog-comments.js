import { handleBlogCommentsRequest, handleVercel } from "../server/blog-api.mjs";

export default async function handler(req, res) {
  return handleVercel(handleBlogCommentsRequest, req, res);
}
