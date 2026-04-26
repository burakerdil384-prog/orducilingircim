import { prisma, isMockMode } from "@/lib/db";
import { mockLocations } from "@/lib/mock-data";
import { getGeneratedLocationStats } from "@/lib/locations/ordu-data";

export type LocationRecord = {
  id: number;
  district: string;
  neighborhood: string;
  slug: string;
  description: string | null;
  content: string | null;
  image: string | null;
  mapUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export async function getAllLocations(): Promise<LocationRecord[]> {
  if (isMockMode) {
    return mockLocations;
  }

  try {
    const dbLocations = await prisma.location.findMany({ orderBy: [{ district: "asc" }, { neighborhood: "asc" }] });
    const generatedStats = getGeneratedLocationStats();

    if (dbLocations.length >= generatedStats.neighborhoodCount) {
      return dbLocations;
    }

    // DB kısmi doluysa ilçe sayfaları boş görünmesin diye generated verilerle tamamla.
    const mergedBySlug = new Map<string, LocationRecord>();
    for (const loc of mockLocations) {
      mergedBySlug.set(loc.slug, loc);
    }
    for (const loc of dbLocations) {
      mergedBySlug.set(loc.slug, loc);
    }

    console.warn(
      `Location repository: DB locations are partial (${dbLocations.length}/${generatedStats.neighborhoodCount}). Using merged fallback data.`
    );

    return Array.from(mergedBySlug.values()).sort((a, b) => {
      const districtCompare = a.district.localeCompare(b.district, "tr-TR");
      if (districtCompare !== 0) return districtCompare;
      return a.neighborhood.localeCompare(b.neighborhood, "tr-TR");
    });
  } catch (error) {
    console.error("Location repository: DB query failed, falling back to generated mock data.", error);
    return mockLocations;
  }
}
