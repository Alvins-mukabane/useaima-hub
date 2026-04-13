import { formatBlogDate } from "@/lib/formatBlogDate";

type BlogArticleMetaRowProps = {
  authorName: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
};

export function BlogArticleMetaRow({ authorName, publishedAt, updatedAt, readingTime }: BlogArticleMetaRowProps) {
  return (
    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
      <span>By {authorName}</span>
      <span>Published {formatBlogDate(publishedAt)}</span>
      {updatedAt && updatedAt !== publishedAt ? <span>Updated {formatBlogDate(updatedAt)}</span> : null}
      <span>{readingTime}</span>
    </div>
  );
}
