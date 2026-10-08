import { promises as fs } from "fs";
import path from "path";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
};

const dataPath = path.join(process.cwd(), "data", "posts.json");

async function readPosts(): Promise<Post[]> {
  const raw = await fs.readFile(dataPath, "utf8");
  return JSON.parse(raw) as Post[];
}

async function writePosts(posts: Post[]) {
  await fs.writeFile(dataPath, JSON.stringify(posts, null, 2) + "\n", "utf8");
}

export async function getPosts(options?: { q?: string; category?: string }) {
  const posts = await readPosts();
  const q = options?.q?.trim().toLowerCase();
  const category = options?.category?.trim().toLowerCase();

  return posts
    .filter((post) => !q || [post.title, post.excerpt, post.author].some((value) => value.toLowerCase().includes(q)))
    .filter((post) => !category || post.category.toLowerCase() === category)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string) {
  const posts = await readPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function createPost(input: Omit<Post, "id">) {
  const posts = await readPosts();
  const post: Post = { ...input, id: crypto.randomUUID() };
  await writePosts([post, ...posts]);
  return post;
}

export async function deletePost(id: string) {
  const posts = await readPosts();
  const next = posts.filter((post) => post.id !== id);
  if (next.length === posts.length) return false;
  await writePosts(next);
  return true;
}