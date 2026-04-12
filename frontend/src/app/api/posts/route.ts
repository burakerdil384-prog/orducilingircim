import { NextRequest, NextResponse } from "next/server";
import { prisma, isMockMode } from "@/lib/db";
import { mockPosts } from "@/lib/mock-data";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { getCached, invalidateCache, CACHE_TTL } from "@/lib/redis";
import { sanitizeString, sanitizeUrl, MAX_LENGTHS } from "@/lib/sanitize";

// GET /api/posts — list all posts (public: only published, admin: all)
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const all = searchParams.get("all") === "true";
  const session = all ? await getSession() : null;

  if (isMockMode) {
    const posts = all && session ? mockPosts : mockPosts.filter((p) => p.published);
    return NextResponse.json(posts);
  }

  const posts = await getCached(
    all && session ? "posts:all" : "posts:published",
    () =>
      prisma.post.findMany({
        where: all && session ? {} : { published: true },
        orderBy: { createdAt: "desc" },
      }),
    CACHE_TTL.BLOG_LIST
  );

  return NextResponse.json(posts);
}

// POST /api/posts — create new post (admin only)
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const title = sanitizeString(body.title, MAX_LENGTHS.TITLE);
    const content = sanitizeString(body.content, MAX_LENGTHS.CONTENT);
    const excerpt = sanitizeString(body.excerpt, MAX_LENGTHS.EXCERPT);
    const image = sanitizeUrl(body.image);
    const category = sanitizeString(body.category, MAX_LENGTHS.CATEGORY);
    const published = body.published ?? false;

    if (!title || !content) {
      return NextResponse.json({ error: "Başlık ve içerik zorunludur." }, { status: 400 });
    }

    const slug = slugify(title);

    if (isMockMode) {
      const newPost = {
        id: mockPosts.length + 1,
        title,
        slug,
        content,
        excerpt: excerpt || null,
        image: image || null,
        category: category || null,
        published: published ?? false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockPosts.push(newPost);
      return NextResponse.json(newPost, { status: 201 });
    }

    const post = await prisma.post.create({
      data: { title, slug, content, excerpt, image, category, published: published ?? false },
    });

    await invalidateCache("posts:*");
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json({ error: "Bu başlıkla bir yazı zaten var." }, { status: 409 });
    }
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
