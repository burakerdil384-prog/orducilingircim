import Link from "next/link";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { generateBreadcrumbSchema } from "@/lib/seo/schemas";
import { getAllDistricts } from "@/lib/locations/ordu-data";
import { getAllLocations } from "@/lib/locations/repository";
import { slugify } from "@/lib/locations/slug";

export const dynamic = "force-dynamic";

export const metadata: Metadata = generatePageMetadata({
  title: "Ordu İlçe ve Mahalle Çilingir Sayfaları",
  description:
    "Ordu ilçe ve mahalle çilingir sayfaları: Akkuş'tan Ünye'ye tüm ilçelerde hizmet bölgelerini inceleyin, mahalle detay sayfalarına geçin.",
  path: "/ordu",
});

export default async function OrduDistrictIndexPage() {
  const [districts, locations] = await Promise.all([Promise.resolve(getAllDistricts()), getAllLocations()]);

  const districtCards = districts.map((district) => {
    const count = locations.filter((location) => slugify(location.district) === district.slug).length;
    return {
      ...district,
      neighborhoodCount: count,
    };
  });

  return (
    <main className="min-h-screen pt-24 pb-24">
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Ana Sayfa", url: "/" },
          { name: "Ordu İlçe Sayfaları", url: "/ordu" },
        ])}
      />

      <section className="container mx-auto px-6">
        <div className="max-w-4xl mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-xs font-bold tracking-widest uppercase text-primary mb-4">
            SEO Hizmet Bölgeleri
          </span>
          <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-primary tracking-tight mb-4">
            Ordu İlçeleri ve Mahalle Sayfaları
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            İlçe bazlı sayfalardan mahalle detaylarına geçebilir, bulunduğunuz konuma göre hızlı iletişim akışını başlatabilirsiniz.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {districtCards.map((district) => (
            <Link
              key={district.slug}
              href={`/ordu/${district.slug}`}
              className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm hover:bg-primary transition-colors group"
            >
              <p className="text-xs uppercase tracking-wide font-semibold text-secondary group-hover:text-orange-300">
                Ordu / {district.name}
              </p>
              <h2 className="text-2xl font-bold text-primary group-hover:text-white mt-2">{district.name}</h2>
              <p className="text-sm text-on-surface-variant group-hover:text-slate-300 mt-3">
                {district.neighborhoodCount} mahalle sayfası
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
