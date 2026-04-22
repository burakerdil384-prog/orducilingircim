import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { generateBreadcrumbSchema } from "@/lib/seo/schemas";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { prisma, isMockMode } from "@/lib/db";
import { mockLocations } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

function slugifyDistrict(name: string) {
  return name
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/\s+/g, "-");
}

function neighborhoodSlugFromLocationSlug(locationSlug: string, neighborhood: string) {
  const parts = locationSlug.split("-");
  if (parts.length > 1) return parts.slice(1).join("-");
  return neighborhood
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/\s+/g, "-");
}

async function getDistrictLocations(districtSlug: string) {
  const allLocations = isMockMode
    ? mockLocations
    : await prisma.location.findMany({ orderBy: { neighborhood: "asc" } });

  const locations = allLocations.filter((loc) => slugifyDistrict(loc.district) === districtSlug);

  return {
    districtName: locations[0]?.district ?? districtSlug.replace(/-/g, " "),
    locations,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ district: string }> }): Promise<Metadata> {
  const { district } = await params;
  const { districtName, locations } = await getDistrictLocations(district);

  return generatePageMetadata({
    title: `${districtName} Mahalleleri`,
    description:
      locations.length > 0
        ? `${districtName} ilçesindeki hizmet verdiğimiz mahalleleri görüntüleyin ve ilgili mahalle sayfasından hızlıca iletişime geçin.`
        : `${districtName} ilçesi için hizmet bölgeleri ve iletişim bilgileri.`,
    path: `/locations/${district}`,
  });
}

export default async function DistrictLocationsPage({ params }: { params: Promise<{ district: string }> }) {
  const { district } = await params;
  const { districtName, locations } = await getDistrictLocations(district);

  return (
    <main className="min-h-screen pt-24 pb-24">
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Ana Sayfa", url: "/" },
          { name: "Hizmetler", url: "/hizmetler" },
          { name: districtName, url: `/locations/${district}` },
        ])}
      />

      <section className="container mx-auto px-6">
        <div className="max-w-4xl mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-xs font-bold tracking-widest uppercase text-primary mb-4">
            İlçe Lokasyonları
          </span>
          <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-primary tracking-tight mb-4">
            {districtName} Mahalle Sayfaları
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            Bu ilçede hizmet verdiğimiz mahalleleri aşağıdan seçerek ilgili mahalle sayfasına gidebilirsiniz.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6">
        {locations.length === 0 ? (
          <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10">
            <p className="text-on-surface-variant">
              Bu ilçe için henüz mahalle kaydı bulunmuyor. Yeni mahalleler admin panelden eklendiğinde burada otomatik görünür.
            </p>
            <Link href="/hizmetler" className="inline-flex items-center gap-2 mt-4 text-secondary font-semibold hover:text-orange-400">
              Hizmetler sayfasına dön
              <span className="material-symbols-outlined text-sm">west</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {locations.map((location) => {
              const neighborhoodSlug = neighborhoodSlugFromLocationSlug(location.slug, location.neighborhood);
              return (
                <Link
                  key={location.id}
                  href={`/locations/${district}/${neighborhoodSlug}`}
                  className="bg-white p-4 rounded-xl border border-outline-variant/20 shadow-sm hover:bg-primary transition-colors group"
                >
                  <p className="text-sm font-bold text-primary group-hover:text-white">{location.neighborhood}</p>
                  <p className="text-xs text-on-surface-variant group-hover:text-slate-300 mt-1">Mahalle Detay Sayfası</p>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
