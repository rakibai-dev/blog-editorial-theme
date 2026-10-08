import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <main className="article-page">
      <div className="container article">
        <Link href="/" className="back-link">← Back to archive</Link>
        <div className="eyebrow">{post.category} · {post.readTime}</div>
        <h1>{post.title}</h1>
        <p className="article-lede">{post.excerpt}</p>
        <div className="article-byline">{post.author} · {post.date}</div>
        <div className="rule" />
        <div className="article-body">
          {post.content.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="article-end">— End of story —</div>
      </div>
    </main>
  );
}