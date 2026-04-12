import { NextRequest, NextResponse } from "next/server";
import { prisma, isMockMode } from "@/lib/db";
import { mockPosts } from "@/lib/mock-data";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { invalidateCache } from "@/lib/redis";
import { sanitizeString, sanitizeUrl, MAX_LENGTHS } from "@/lib/sanitize";

type Params = { params: Promise<{ id: string }> };

// GET /api/posts/[id]
export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const postId = parseInt(id, 10);
  if (isNaN(postId)) {
    return NextResponse.json({ error: "Geçersiz ID." }, { status: 400 });
  }

  if (isMockMode) {
    const post = mockPosts.find((p) => p.id === postId);
    if (!post) return NextResponse.json({ error: "Yazı bulunamadı." }, { status: 404 });
    return NextResponse.json(post);
  }

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) return NextResponse.json({ error: "Yazı bulunamadı." }, { status: 404 });
  return NextResponse.json(post);
}

// PUT /api/posts/[id]
export async function PUT(request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  const { id } = await params;
  const postId = parseInt(id, 10);
  if (isNaN(postId)) {
    return NextResponse.json({ error: "Geçersiz ID." }, { status: 400 });
  }

  try {
    const body = await request.json();
    const title = body.title !== undefined ? sanitizeString(body.title, MAX_LENGTHS.TITLE) : undefined;
    const content = body.content !== undefined ? sanitizeString(body.content, MAX_LENGTHS.CONTENT) : undefined;
    const excerpt = body.excerpt !== undefined ? sanitizeString(body.excerpt, MAX_LENGTHS.EXCERPT) : undefined;
    const image = body.image !== undefined ? sanitizeUrl(body.image) : undefined;
    const category = body.category !== undefined ? sanitizeString(body.category, MAX_LENGTHS.CATEGORY) : undefined;
    const published = body.published;

    if (isMockMode) {
      const idx = mockPosts.findIndex((p) => p.id === postId);
      if (idx === -1) return NextResponse.json({ error: "Yazı bulunamadı." }, { status: 404 });
      const updated = {
        ...mockPosts[idx],
        ...(title !== undefined && title !== null && { title, slug: slugify(title) }),
        ...(content !== undefined && { content }),
        ...(excerpt !== undefined && { excerpt }),
        ...(image !== undefined && { image }),
        ...(category !== undefined && { category }),
        ...(published !== undefined && { published }),
        updatedAt: new Date(),
      };
      mockPosts[idx] = updated;
      return NextResponse.json(updated);
    }

    const data: Record<string, unknown> = {};
    if (title !== undefined && title !== null) { data.title = title; data.slug = slugify(title); }
    if (content !== undefined) data.content = content;
    if (excerpt !== undefined) data.excerpt = excerpt;
    if (image !== undefined) data.image = image;
    if (category !== undefined) data.category = category;
    if (published !== undefined) data.published = published;

    const post = await prisma.post.update({ where: { id: postId }, data });

    await invalidateCache("posts:*");
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}

// DELETE /api/posts/[id]
export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  const { id } = await params;
  const postId = parseInt(id, 10);
  if (isNaN(postId)) {
    return NextResponse.json({ error: "Geçersiz ID." }, { status: 400 });
  }

  try {
    if (isMockMode) {
      const idx = mockPosts.findIndex((p) => p.id === postId);
      if (idx === -1) return NextResponse.json({ error: "Yazı bulunamadı." }, { status: 404 });
      mockPosts.splice(idx, 1);
      return NextResponse.json({ success: true });
    }

    await prisma.post.delete({ where: { id: postId } });
    await invalidateCache("posts:*");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
