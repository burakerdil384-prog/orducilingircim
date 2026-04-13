import { NextRequest, NextResponse } from "next/server";
import { prisma, isMockMode } from "@/lib/db";
import { mockServices } from "@/lib/mock-data";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { invalidateCache } from "@/lib/redis";
import { sanitizeString, sanitizeUrl, MAX_LENGTHS } from "@/lib/sanitize";

type Params = { params: Promise<{ id: string }> };

// GET /api/services/[id]
export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const serviceId = parseInt(id, 10);
  if (isNaN(serviceId)) {
    return NextResponse.json({ error: "Geçersiz ID." }, { status: 400 });
  }

  if (isMockMode) {
    const service = mockServices.find((s) => s.id === serviceId);
    if (!service) return NextResponse.json({ error: "Hizmet bulunamadı." }, { status: 404 });
    return NextResponse.json(service);
  }

  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service) return NextResponse.json({ error: "Hizmet bulunamadı." }, { status: 404 });
  return NextResponse.json(service);
}

// PUT /api/services/[id]
export async function PUT(request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  const { id } = await params;
  const serviceId = parseInt(id, 10);
  if (isNaN(serviceId)) {
    return NextResponse.json({ error: "Geçersiz ID." }, { status: 400 });
  }

  try {
    const body = await request.json();
    const title = body.title !== undefined ? sanitizeString(body.title, MAX_LENGTHS.TITLE) : undefined;
    const description = body.description !== undefined ? sanitizeString(body.description, MAX_LENGTHS.DESCRIPTION) : undefined;
    const content = body.content !== undefined ? sanitizeString(body.content, MAX_LENGTHS.CONTENT) : undefined;
    const icon = body.icon !== undefined ? sanitizeString(body.icon, MAX_LENGTHS.ICON) : undefined;
    const image = body.image !== undefined ? sanitizeUrl(body.image) : undefined;
    const price = body.price !== undefined ? sanitizeString(body.price, MAX_LENGTHS.PRICE) : undefined;
    const faqs = body.faqs;

    if (isMockMode) {
      const idx = mockServices.findIndex((s) => s.id === serviceId);
      if (idx === -1) return NextResponse.json({ error: "Hizmet bulunamadı." }, { status: 404 });
      const updated = {
        ...mockServices[idx],
        ...(title !== undefined && title !== null && { title, slug: slugify(title) }),
        ...(description !== undefined && { description }),
        ...(content !== undefined && { content }),
        ...(icon !== undefined && { icon }),
        ...(image !== undefined && { image }),
        ...(price !== undefined && { price }),
        ...(faqs !== undefined && { faqs }),
        updatedAt: new Date(),
      };
      mockServices[idx] = updated;
      return NextResponse.json(updated);
    }

    const data: Record<string, unknown> = {};
    if (title !== undefined && title !== null) { data.title = title; data.slug = slugify(title); }
    if (description !== undefined) data.description = description;
    if (content !== undefined) data.content = content;
    if (icon !== undefined) data.icon = icon;
    if (image !== undefined) data.image = image;
    if (price !== undefined) data.price = price;
    if (faqs !== undefined) data.faqs = faqs;

    const service = await prisma.service.update({ where: { id: serviceId }, data });

    await invalidateCache("services:*");
    return NextResponse.json(service);
  } catch {
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}

// DELETE /api/services/[id]
export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  const { id } = await params;
  const serviceId = parseInt(id, 10);
  if (isNaN(serviceId)) {
    return NextResponse.json({ error: "Geçersiz ID." }, { status: 400 });
  }

  try {
    if (isMockMode) {
      const idx = mockServices.findIndex((s) => s.id === serviceId);
      if (idx === -1) return NextResponse.json({ error: "Hizmet bulunamadı." }, { status: 404 });
      mockServices.splice(idx, 1);
      return NextResponse.json({ success: true });
    }

    await prisma.service.delete({ where: { id: serviceId } });
    await invalidateCache("services:*");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
