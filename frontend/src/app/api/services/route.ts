import { NextRequest, NextResponse } from "next/server";
import { prisma, isMockMode } from "@/lib/db";
import { mockServices } from "@/lib/mock-data";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { getCached, invalidateCache, CACHE_TTL } from "@/lib/redis";
import { sanitizeString, sanitizeUrl, MAX_LENGTHS } from "@/lib/sanitize";
import { purgeCloudflareCache } from "@/lib/cache-purge";

// GET /api/services
export async function GET() {
  if (isMockMode) {
    return NextResponse.json(mockServices);
  }

  const services = await getCached(
    "services:all",
    () => prisma.service.findMany({ orderBy: { createdAt: "desc" } }),
    CACHE_TTL.SERVICE
  );

  return NextResponse.json(services);
}

// POST /api/services
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const title = sanitizeString(body.title, MAX_LENGTHS.TITLE);
    const description = sanitizeString(body.description, MAX_LENGTHS.DESCRIPTION);
    const content = sanitizeString(body.content, MAX_LENGTHS.CONTENT);
    const icon = sanitizeString(body.icon, MAX_LENGTHS.ICON);
    const image = sanitizeUrl(body.image);
    const price = sanitizeString(body.price, MAX_LENGTHS.PRICE);
    const faqs = body.faqs;
    const pricing = body.pricing;

    if (!title || !description || !content) {
      return NextResponse.json({ error: "Başlık, açıklama ve içerik zorunludur." }, { status: 400 });
    }

    const slug = slugify(title);

    if (isMockMode) {
      const newService = {
        id: mockServices.length + 1,
        title,
        slug,
        description,
        content,
        icon: icon || null,
        image: image || null,
        price: price || null,
        faqs: faqs || null,
        pricing: pricing || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockServices.push(newService);
      return NextResponse.json(newService, { status: 201 });
    }

    const service = await prisma.service.create({
      data: { title, slug, description, content, icon, image, price, faqs: faqs || undefined, pricing: pricing || undefined },
    });

    await invalidateCache("services:*");
    await purgeCloudflareCache();
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json({ error: "Bu başlıkla bir hizmet zaten var." }, { status: 409 });
    }
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
