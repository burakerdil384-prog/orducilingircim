import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { slugify } from "../src/lib/locations/slug";

type DistrictApiItem = {
  id: number;
  province: string;
  name: string;
  population?: number;
  area?: number;
};

type NeighborhoodApiItem = {
  id: number;
  districtId?: number;
  province: string;
  district: string;
  name: string;
  population?: number;
};

type ApiResponse<T> = {
  status?: string;
  data?: T[];
};

type OutputDistrict = {
  id: number;
  name: string;
  slug: string;
  population: number | null;
  area: number | null;
  neighborhoods: Array<{
    id: number;
    name: string;
    slug: string;
    population: number | null;
  }>;
};

const BASE_URL = "https://api.turkiyeapi.dev/v1";
const PROVINCE = "Ordu";
const EXPECTED_DISTRICTS = [
  "Akkuş",
  "Altınordu",
  "Aybastı",
  "Çamaş",
  "Çatalpınar",
  "Çaybaşı",
  "Fatsa",
  "Gölköy",
  "Gülyalı",
  "Gürgentepe",
  "İkizce",
  "Kabadüz",
  "Kabataş",
  "Korgan",
  "Kumru",
  "Mesudiye",
  "Perşembe",
  "Ulubey",
  "Ünye",
] as const;

async function fetchJson<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "ordu-cilingir-seo-generator/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`API isteği başarısız (${response.status}): ${url}`);
  }

  return (await response.json()) as ApiResponse<T>;
}

function toUniqueNeighborhoods(neighborhoods: NeighborhoodApiItem[], districtName: string) {
  const usedSlugs = new Map<string, number>();
  const duplicateBaseSlugs: string[] = [];
  const uniqueNeighborhoods = neighborhoods
    .filter((item) => item.name?.trim())
    .sort((a, b) => a.name.localeCompare(b.name, "tr-TR"))
    .map((item) => {
      const baseSlug = slugify(item.name);
      const counter = (usedSlugs.get(baseSlug) ?? 0) + 1;
      usedSlugs.set(baseSlug, counter);
      if (counter > 1) {
        duplicateBaseSlugs.push(baseSlug);
      }
      const slug = counter > 1 ? `${baseSlug}-${counter}` : baseSlug;

      return {
        id: item.id,
        name: item.name.trim(),
        slug,
        population: typeof item.population === "number" ? item.population : null,
      };
    });

  if (duplicateBaseSlugs.length > 0) {
    console.warn(
      `[${districtName}] Tekrarlayan mahalle slug'ları bulundu: ${Array.from(new Set(duplicateBaseSlugs)).join(", ")}`
    );
  }

  return uniqueNeighborhoods;
}

async function getNeighborhoodsForDistrict(district: DistrictApiItem): Promise<NeighborhoodApiItem[]> {
  const districtIdUrl = `${BASE_URL}/neighborhoods?districtId=${district.id}&limit=1000`;
  const byId = await fetchJson<NeighborhoodApiItem>(districtIdUrl);

  if (Array.isArray(byId.data) && byId.data.length > 0) {
    return byId.data;
  }

  const byNameUrl = `${BASE_URL}/neighborhoods?province=${encodeURIComponent(PROVINCE)}&district=${encodeURIComponent(district.name)}&limit=1000`;
  const byName = await fetchJson<NeighborhoodApiItem>(byNameUrl);

  if (Array.isArray(byName.data)) {
    return byName.data;
  }

  return [];
}

async function main() {
  const districtsResponse = await fetchJson<DistrictApiItem>(
    `${BASE_URL}/districts?province=${encodeURIComponent(PROVINCE)}&limit=100`
  );

  if (!Array.isArray(districtsResponse.data)) {
    throw new Error("districts endpoint beklenen formatta veri döndürmedi.");
  }

  const expectedDistrictSet = new Set(EXPECTED_DISTRICTS);
  const apiDistricts = districtsResponse.data
    .filter((d) => d.province === PROVINCE)
    .filter((d) => expectedDistrictSet.has(d.name as (typeof EXPECTED_DISTRICTS)[number]))
    .sort((a, b) => a.name.localeCompare(b.name, "tr-TR"));

  const missingDistricts = EXPECTED_DISTRICTS.filter(
    (expected) => !apiDistricts.some((district) => district.name === expected)
  );

  if (missingDistricts.length > 0) {
    console.warn(`Eksik ilçe verileri: ${missingDistricts.join(", ")}`);
  }

  const outputDistricts: OutputDistrict[] = [];

  for (const district of apiDistricts) {
    const neighborhoods = await getNeighborhoodsForDistrict(district);
    const uniqueNeighborhoods = toUniqueNeighborhoods(neighborhoods, district.name);

    if (uniqueNeighborhoods.length === 0) {
      console.warn(`Mahalle bulunamadı: ${district.name}`);
    }

    outputDistricts.push({
      id: district.id,
      name: district.name,
      slug: slugify(district.name),
      population: typeof district.population === "number" ? district.population : null,
      area: typeof district.area === "number" ? district.area : null,
      neighborhoods: uniqueNeighborhoods,
    });
  }

  const output = {
    source: {
      provider: "TurkiyeAPI",
      baseUrl: BASE_URL,
      province: PROVINCE,
      generatedAt: new Date().toISOString(),
    },
    districts: outputDistricts,
    totals: {
      districtCount: outputDistricts.length,
      neighborhoodCount: outputDistricts.reduce((sum, district) => sum + district.neighborhoods.length, 0),
    },
  };

  const outputPath = path.resolve(process.cwd(), "src/data/ordu-locations.generated.json");
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");

  console.log(`Ordu ilçe/mahalle verisi oluşturuldu: ${outputPath}`);
  console.log(`İlçe: ${output.totals.districtCount}, Mahalle: ${output.totals.neighborhoodCount}`);
}

main().catch((error) => {
  console.error("Veri çekme hatası:", error);
  process.exit(1);
});
