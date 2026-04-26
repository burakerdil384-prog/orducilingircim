import { prisma, isMockMode } from "@/lib/db";
import { mockLocations } from "@/lib/mock-data";

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
    return await prisma.location.findMany({ orderBy: [{ district: "asc" }, { neighborhood: "asc" }] });
  } catch (error) {
    console.error("Location repository: DB query failed, falling back to generated mock data.", error);
    return mockLocations;
  }
}
