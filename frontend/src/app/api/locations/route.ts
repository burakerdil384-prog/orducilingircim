import { NextRequest, NextResponse } from "next/server";
import { prisma, isMockMode } from "@/lib/db";
import { mockLocations } from "@/lib/mock-data";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { getCached, invalidateCache, CACHE_TTL } from "@/lib/redis";
import { sanitizeString, sanitizeUrl, MAX_LENGTHS } from "@/lib/sanitize";

// GET /api/locations
export async function GET() {
  if (isMockMode) {
    return NextResponse.json(mockLocations);
  }

  const locations = await getCached(
    "locations:all",
    () => prisma.location.findMany({ orderBy: { neighborhood: "asc" } }),
    CACHE_TTL.LOCATION
  );

  return NextResponse.json(locations);
}

// POST /api/locations
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const district = sanitizeString(body.district, MAX_LENGTHS.DISTRICT);
    const neighborhood = sanitizeString(body.neighborhood, MAX_LENGTHS.NEIGHBORHOOD);
    const description = sanitizeString(body.description, MAX_LENGTHS.DESCRIPTION);
    const content = sanitizeString(body.content, MAX_LENGTHS.CONTENT);
    const image = sanitizeUrl(body.image);
    const mapUrl = sanitizeUrl(body.mapUrl);

    if (!district || !neighborhood) {
      return NextResponse.json({ error: "İlçe ve mahalle zorunludur." }, { status: 400 });
    }

    const slug = `${slugify(district)}-${slugify(neighborhood)}`;

    if (isMockMode) {
      const newLocation = {
        id: mockLocations.length + 1,
        district,
        neighborhood,
        slug,
        description: description || null,
        content: content || null,
        image: image || null,
        mapUrl: mapUrl || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockLocations.push(newLocation);
      return NextResponse.json(newLocation, { status: 201 });
    }

    const location = await prisma.location.create({
      data: { district, neighborhood, slug, description, content, image, mapUrl },
    });

    await invalidateCache("locations:*");
    return NextResponse.json(location, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json({ error: "Bu mahalle zaten kayıtlı." }, { status: 409 });
    }
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
