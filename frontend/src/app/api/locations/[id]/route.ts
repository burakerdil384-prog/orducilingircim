import { NextRequest, NextResponse } from "next/server";
import { prisma, isMockMode } from "@/lib/db";
import { mockLocations } from "@/lib/mock-data";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { invalidateCache } from "@/lib/redis";
import { sanitizeString, sanitizeUrl, MAX_LENGTHS } from "@/lib/sanitize";

type Params = { params: Promise<{ id: string }> };

// GET /api/locations/[id]
export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const locId = parseInt(id, 10);
  if (isNaN(locId)) {
    return NextResponse.json({ error: "Geçersiz ID." }, { status: 400 });
  }

  if (isMockMode) {
    const loc = mockLocations.find((l) => l.id === locId);
    if (!loc) return NextResponse.json({ error: "Konum bulunamadı." }, { status: 404 });
    return NextResponse.json(loc);
  }

  const loc = await prisma.location.findUnique({ where: { id: locId } });
  if (!loc) return NextResponse.json({ error: "Konum bulunamadı." }, { status: 404 });
  return NextResponse.json(loc);
}

// PUT /api/locations/[id]
export async function PUT(request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  const { id } = await params;
  const locId = parseInt(id, 10);
  if (isNaN(locId)) {
    return NextResponse.json({ error: "Geçersiz ID." }, { status: 400 });
  }

  try {
    const body = await request.json();
    const district = body.district !== undefined ? sanitizeString(body.district, MAX_LENGTHS.DISTRICT) : undefined;
    const neighborhood = body.neighborhood !== undefined ? sanitizeString(body.neighborhood, MAX_LENGTHS.NEIGHBORHOOD) : undefined;
    const description = body.description !== undefined ? sanitizeString(body.description, MAX_LENGTHS.DESCRIPTION) : undefined;
    const content = body.content !== undefined ? sanitizeString(body.content, MAX_LENGTHS.CONTENT) : undefined;
    const image = body.image !== undefined ? sanitizeUrl(body.image) : undefined;
    const mapUrl = body.mapUrl !== undefined ? sanitizeUrl(body.mapUrl) : undefined;

    if (isMockMode) {
      const idx = mockLocations.findIndex((l) => l.id === locId);
      if (idx === -1) return NextResponse.json({ error: "Konum bulunamadı." }, { status: 404 });
      const d = district ?? mockLocations[idx].district;
      const n = neighborhood ?? mockLocations[idx].neighborhood;
      if (!d || !n) return NextResponse.json({ error: "İlçe ve mahalle boş olamaz." }, { status: 400 });
      const updated = {
        ...mockLocations[idx],
        ...(district !== undefined && { district: d }),
        ...(neighborhood !== undefined && { neighborhood: n }),
        ...((district !== undefined || neighborhood !== undefined) && {
          slug: `${slugify(d)}-${slugify(n)}`,
        }),
        ...(description !== undefined && { description }),
        ...(content !== undefined && { content }),
        ...(image !== undefined && { image }),
        ...(mapUrl !== undefined && { mapUrl }),
        updatedAt: new Date(),
      };
      mockLocations[idx] = updated;
      return NextResponse.json(updated);
    }

    const existing = await prisma.location.findUnique({ where: { id: locId } });
    if (!existing) return NextResponse.json({ error: "Konum bulunamadı." }, { status: 404 });

    const data: Record<string, unknown> = {};
    if (district !== undefined) data.district = district;
    if (neighborhood !== undefined) data.neighborhood = neighborhood;
    if (district !== undefined || neighborhood !== undefined) {
      data.slug = `${slugify((district as string) ?? existing.district)}-${slugify((neighborhood as string) ?? existing.neighborhood)}`;
    }
    if (description !== undefined) data.description = description;
    if (content !== undefined) data.content = content;
    if (image !== undefined) data.image = image;
    if (mapUrl !== undefined) data.mapUrl = mapUrl;

    const location = await prisma.location.update({ where: { id: locId }, data });

    await invalidateCache("locations:*");
    return NextResponse.json(location);
  } catch {
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}

// DELETE /api/locations/[id]
export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  const { id } = await params;
  const locId = parseInt(id, 10);
  if (isNaN(locId)) {
    return NextResponse.json({ error: "Geçersiz ID." }, { status: 400 });
  }

  try {
    if (isMockMode) {
      const idx = mockLocations.findIndex((l) => l.id === locId);
      if (idx === -1) return NextResponse.json({ error: "Konum bulunamadı." }, { status: 404 });
      mockLocations.splice(idx, 1);
      return NextResponse.json({ success: true });
    }

    await prisma.location.delete({ where: { id: locId } });
    await invalidateCache("locations:*");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
