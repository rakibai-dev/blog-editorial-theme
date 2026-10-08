import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getPosts } from "@/lib/posts";

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  const params = await searchParams;
  const posts = await getPosts(params);
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const remaining = posts.filter((post) => post.id !== featured?.id);

  return (
    <main>
      <section className="hero container">
        <div className="eyebrow">ISSUE 01 · OCTOBER 2026</div>
        <h1>Ideas, observations,<br /><em>and useful detours.</em></h1>
        <p className="hero-copy">A deliberately calm place for writing about design, technology, work, and the culture around making things.</p>
        <form className="search" action="/">
          <input name="q" defaultValue={params.q ?? ""} placeholder="Search the archive…" aria-label="Search posts" />
          <button type="submit">Search</button>
        </form>
      </section>
      <section className="container archive">
        <div className="section-heading"><span>Latest writing</span><span>{posts.length} stories</span></div>
        {featured ? (
          <div className="featured-wrap">
            <PostCard post={featured} featured />
            <aside className="editor-note">
              <span className="eyebrow">EDITOR'S NOTE</span>
              <p>Placeholder stories are included so you can immediately explore the full reading experience.</p>
              <Link href="/admin">Add a story →</Link>
            </aside>
          </div>
        ) : <p className="empty">No stories found. Try another search.</p>}
        <div className="post-grid">{remaining.map((post) => <PostCard key={post.id} post={post} />)}</div>
      </section>
    </main>
  );
}