import Link from "next/link";
import type { Post } from "@/lib/posts";

export default function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <article className={featured ? "post-card featured-card" : "post-card"}>
      <div className="post-meta"><span>{post.category}</span><span>{post.readTime}</span></div>
      <h2><Link href={"/blog/" + post.slug}>{post.title}</Link></h2>
      <p>{post.excerpt}</p>
      <div className="post-byline">{post.author} <span>·</span> {post.date}</div>
    </article>
  );
}