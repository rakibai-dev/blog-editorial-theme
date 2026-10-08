"use client";

import { FormEvent, useEffect, useState } from "react";

type Post = { id:string; title:string; slug:string; excerpt:string; content:string; category:string; author:string; date:string; readTime:string; featured:boolean; };
const blank = { title:"", slug:"", excerpt:"", content:"", category:"Design", author:"Editorial Desk", date:"2026-10-08", readTime:"5 min read", featured:false };

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState(blank);
  const [message, setMessage] = useState("");

  async function load() {
    const res = await fetch("/api/posts", { cache:"no-store" });
    setPosts(await res.json());
  }
  useEffect(() => { load(); }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/posts", { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify(form) });
    if (!res.ok) { setMessage("Please complete the required fields."); return; }
    setForm(blank);
    setMessage("Story published.");
    load();
  }

  async function remove(id: string) {
    await fetch("/api/posts/" + id, { method:"DELETE" });
    load();
  }

  return <main className="admin-page container">
    <div className="admin-head"><div><div className="eyebrow">EDITORIAL DESK</div><h1>Publish a story</h1></div><a href="/">← View site</a></div>
    <div className="admin-layout">
      <form className="editor-form" onSubmit={submit}>
        <input required placeholder="Headline" value={form.title} onChange={e=>setForm({...form,title:e.target.value,slug:form.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")})} />
        <input required placeholder="Slug" value={form.slug} onChange={e=>setForm({...form,slug:e.target.value})} />
        <input required placeholder="Excerpt" value={form.excerpt} onChange={e=>setForm({...form,excerpt:e.target.value})} />
        <textarea required placeholder="Write the story…" rows={12} value={form.content} onChange={e=>setForm({...form,content:e.target.value})} />
        <div className="form-row">
          <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option>Design</option><option>Technology</option><option>Culture</option><option>Work</option></select>
          <input required placeholder="Author" value={form.author} onChange={e=>setForm({...form,author:e.target.value})} />
        </div>
        <button className="publish" type="submit">Publish story</button>
        {message && <p className="form-message">{message}</p>}
      </form>
      <section className="admin-list"><div className="section-heading"><span>Archive</span><span>{posts.length}</span></div>{posts.map(post=><div className="admin-item" key={post.id}><div><strong>{post.title}</strong><small>{post.category} · {post.author}</small></div><button onClick={()=>remove(post.id)} aria-label={"Delete "+post.title}>Delete</button></div>)}</section>
    </div>
  </main>;
}