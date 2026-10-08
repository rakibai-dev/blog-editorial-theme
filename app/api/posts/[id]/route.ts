import { NextResponse } from "next/server";
import { deletePost } from "@/lib/posts";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deleted = await deletePost(id);
  return deleted ? NextResponse.json({ ok:true }) : NextResponse.json({ error:"Not found" }, { status:404 });
}