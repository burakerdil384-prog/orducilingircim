import raw from "@/data/ordu-locations.generated.json";
import { buildLocationSlug, neighborhoodSlugFromLocationSlug, slugify } from "@/lib/locations/slug";

type RawDistrict = {
  id: number;
  name: string;
  slug: string;
  neighborhoods: Array<{
    id: number;
    name: string;
    slug: string;
    population: number | null;
  }>;
};

type LocationCopy = {
  description: string;
  content: string;
};

const SPEED_LINES = [
  "yoğunluk durumuna göre hızlı yönlendirme",
  "merkez koordinasyonla hızlı ekip planlaması",
  "acil çağrılarda öncelikli saha organizasyonu",
];

const TRUST_LINES = [
  "hasarsız açma önceliği",
  "şeffaf fiyat bilgilendirmesi",
  "7/24 aktif çağrı yönetimi",
];

const SERVICE_LINES = [
  "kapı açma",
  "kilit değişimi",
  "anahtar çoğaltma",
  "oto çilingir desteği",
];

const data = raw as {
  districts: RawDistrict[];
  source: {
    generatedAt: string;
  };
  totals: {
    districtCount: number;
    neighborhoodCount: number;
  };
};

function pickLine(pool: string[], key: string) {
  const hash = key.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return pool[hash % pool.length];
}

export function isOrduDistrictSlug(slug: string): boolean {
  return data.districts.some((district) => district.slug === slug);
}

export function getDistrictBySlug(slug: string) {
  return data.districts.find((district) => district.slug === slug) ?? null;
}

export function getDistrictByName(name: string) {
  const districtSlug = slugify(name);
  return getDistrictBySlug(districtSlug);
}

export function getAllDistricts() {
  return data.districts;
}

export function getCanonicalNeighborhoodSlug(locationSlug: string, neighborhood: string): string {
  return neighborhoodSlugFromLocationSlug(locationSlug, neighborhood);
}

export function buildLocationCopy(district: string, neighborhood: string, nearbyNeighborhoods: string[]): LocationCopy {
  const key = `${district}-${neighborhood}`;
  const speedLine = pickLine(SPEED_LINES, key);
  const trustLine = pickLine(TRUST_LINES, `${key}-trust`);
  const serviceLine = pickLine(SERVICE_LINES, `${key}-service`);
  const nearby = nearbyNeighborhoods.slice(0, 3).join(", ");

  return {
    description: `${district} ${neighborhood} Mahallesi ve çevresinde ${speedLine}, ${trustLine} ile profesyonel çilingir hizmeti.`,
    content:
      `${district} ${neighborhood} bölgesinde ${serviceLine} taleplerinde ekiplerimiz konumunuza göre planlama yapar. ` +
      `İşlem öncesinde süre ve ücret bilgisi net şekilde paylaşılır. ` +
      (nearby
        ? `Yakın bölgelerde ${nearby} mahalleleriyle birlikte koordineli servis akışı yürütülür.`
        : `${district} genelinde mobil servis modeliyle kesintisiz destek sağlanır.`),
  };
}

export function createLocationRecord(input: {
  id: number;
  district: string;
  neighborhood: string;
  districtSlug?: string;
  neighborhoodSlug?: string;
  neighborhoodIndex: number;
  neighborhoodsInDistrict: string[];
  createdAt?: Date;
  updatedAt?: Date;
}) {
  const { id, district, neighborhood, neighborhoodIndex, neighborhoodsInDistrict } = input;
  const nearby = neighborhoodsInDistrict
    .filter((name) => name !== neighborhood)
    .slice(neighborhoodIndex, neighborhoodIndex + 4);
  const copy = buildLocationCopy(district, neighborhood, nearby);

  return {
    id,
    district,
    neighborhood,
    slug: input.neighborhoodSlug
      ? `${input.districtSlug ?? slugify(district)}-${input.neighborhoodSlug}`
      : buildLocationSlug(district, neighborhood),
    description: copy.description,
    content: copy.content,
    image: null,
    mapUrl: null,
    createdAt: input.createdAt ?? new Date("2024-01-01T00:00:00.000Z"),
    updatedAt: input.updatedAt ?? new Date(),
  };
}

export function buildAllLocationRecords() {
  const records: ReturnType<typeof createLocationRecord>[] = [];
  let id = 1;

  for (const district of data.districts) {
    const neighborhoodNames = district.neighborhoods.map((item) => item.name);

    district.neighborhoods.forEach((item, index) => {
      records.push(
        createLocationRecord({
          id,
          district: district.name,
          neighborhood: item.name,
          districtSlug: district.slug,
          neighborhoodSlug: item.slug,
          neighborhoodIndex: index,
          neighborhoodsInDistrict: neighborhoodNames,
        })
      );
      id += 1;
    });
  }

  return records;
}

export function getGeneratedLocationStats() {
  return data.totals;
}

export const GENERATED_LOCATIONS_TIMESTAMP = data.source.generatedAt;
