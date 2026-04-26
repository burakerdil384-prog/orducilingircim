import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { generateBreadcrumbSchema } from "@/lib/seo/schemas";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { getAllLocations } from "@/lib/locations/repository";
import { getCanonicalNeighborhoodSlug, getDistrictBySlug } from "@/lib/locations/ordu-data";
import { slugify } from "@/lib/locations/slug";

export const dynamic = "force-dynamic";

async function getDistrictLocations(districtSlug: string) {
  const allLocations = await getAllLocations();
  const locations = allLocations.filter((loc) => slugify(loc.district) === districtSlug);
  const districtInfo = getDistrictBySlug(districtSlug);

  return {
    districtName: locations[0]?.district ?? districtInfo?.name ?? districtSlug.replace(/-/g, " "),
    districtInfo,
    locations,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ district: string }> }): Promise<Metadata> {
  const { district } = await params;
  const { districtName, locations } = await getDistrictLocations(district);

  return generatePageMetadata({
    title: `${districtName} Çilingir Mahalleleri`,
    description:
      locations.length > 0
        ? `${districtName} ilçesindeki tüm mahalle çilingir sayfalarını görüntüleyin, bulunduğunuz mahalle detayına hızlıca geçin.`
        : `${districtName} ilçesi için çilingir hizmet bölgesi bilgileri.`,
    path: `/ordu/${district}`,
  });
}

export default async function OrduDistrictPage({ params }: { params: Promise<{ district: string }> }) {
  const { district } = await params;
  const { districtName, districtInfo, locations } = await getDistrictLocations(district);

  if (!districtInfo) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-24 pb-24">
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Ana Sayfa", url: "/" },
          { name: "Ordu", url: "/ordu" },
          { name: districtName, url: `/ordu/${district}` },
        ])}
      />

      <section className="container mx-auto px-6">
        <div className="max-w-4xl mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-xs font-bold tracking-widest uppercase text-primary mb-4">
            İlçe Lokasyonları
          </span>
          <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-primary tracking-tight mb-4">
            {districtName} Mahalle Çilingir Sayfaları
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            {districtName} ilçesinde hizmet verdiğimiz mahallelerin detay sayfaları aşağıda listelenmiştir.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6">
        {locations.length === 0 ? (
          <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10">
            <p className="text-on-surface-variant">Bu ilçe için henüz mahalle kaydı bulunmuyor.</p>
            <Link href="/ordu" className="inline-flex items-center gap-2 mt-4 text-secondary font-semibold hover:text-orange-400">
              İlçe listesine dön
              <span className="material-symbols-outlined text-sm">west</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {locations.map((location) => {
              const neighborhoodSlug = getCanonicalNeighborhoodSlug(location.slug, location.neighborhood);
              return (
                <Link
                  key={location.id}
                  href={`/ordu/${district}/${neighborhoodSlug}`}
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

      <section className="container mx-auto px-6 mt-12">
        <div className="bg-surface-container-low rounded-2xl border border-outline-variant/20 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-primary mb-3">Hızlı Geçiş</h2>
          <p className="text-on-surface-variant mb-5">
            İlçe detayından sonra genel hizmet sayfalarına buradan geçebilirsiniz.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/ordu" className="px-4 py-2 rounded-full bg-white border border-outline-variant/30 text-primary hover:bg-primary hover:text-white transition-colors">Ordu İlçeleri</Link>
            <Link href="/ordu-cilingir" className="px-4 py-2 rounded-full bg-white border border-outline-variant/30 text-primary hover:bg-primary hover:text-white transition-colors">Ordu Çilingir</Link>
            <Link href="/ordu-hizmet-bolgeleri" className="px-4 py-2 rounded-full bg-white border border-outline-variant/30 text-primary hover:bg-primary hover:text-white transition-colors">Ordu Hizmet Bölgeleri</Link>
            <Link href="/hizmetler" className="px-4 py-2 rounded-full bg-white border border-outline-variant/30 text-primary hover:bg-primary hover:text-white transition-colors">Hizmetler</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
