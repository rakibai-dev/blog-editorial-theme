import { NextResponse } from "next/server";
import { createPost, getPosts } from "@/lib/posts";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  return NextResponse.json(await getPosts({ q: searchParams.get("q") ?? undefined, category: searchParams.get("category") ?? undefined }));
}

export async function POST(request: Request) {
  const body = await request.json();
  const required = ["title","slug","excerpt","content","category","author"];
  if (required.some((key) => !body[key])) return NextResponse.json({ error:"Missing required fields" }, { status:400 });
  const post = await createPost({
    title: body.title, slug: body.slug, excerpt: body.excerpt, content: body.content,
    category: body.category, author: body.author, date: body.date || new Date().toISOString().slice(0,10),
    readTime: body.readTime || "5 min read", featured: Boolean(body.featured)
  });
  return NextResponse.json(post, { status:201 });
}