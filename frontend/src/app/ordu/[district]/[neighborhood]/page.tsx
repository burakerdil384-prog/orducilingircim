import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { generateLocationSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo/schemas";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_CONFIG } from "@/lib/utils";
import { getAllLocations } from "@/lib/locations/repository";
import { getCanonicalNeighborhoodSlug } from "@/lib/locations/ordu-data";
import { slugify } from "@/lib/locations/slug";

export const dynamic = "force-dynamic";

const mapImage = "/images/location-map.webp";

async function getLocation(district: string, neighborhood: string) {
  const locations = await getAllLocations();

  const current =
    locations.find((loc) => {
      const locDistrict = slugify(loc.district);
      const locNeighborhood = getCanonicalNeighborhoodSlug(loc.slug, loc.neighborhood);
      return locDistrict === district && locNeighborhood === neighborhood;
    }) ?? null;

  const districtLocations = locations.filter((loc) => slugify(loc.district) === district);

  return {
    current,
    districtLocations,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ district: string; neighborhood: string }> }): Promise<Metadata> {
  const { district, neighborhood } = await params;
  const { current } = await getLocation(district, neighborhood);

  if (!current) {
    return {};
  }

  return generatePageMetadata({
    title: `${current.neighborhood} Mahallesi Çilingir | ${current.district} / Ordu`,
    description:
      current.description ||
      `${current.district} ${current.neighborhood} Mahallesi'nde kapı açma, kilit değişimi ve acil çilingir desteği.`,
    path: `/ordu/${district}/${neighborhood}`,
  });
}

export default async function OrduNeighborhoodPage({
  params,
}: {
  params: Promise<{ district: string; neighborhood: string }>;
}) {
  const { district, neighborhood } = await params;
  const { current, districtLocations } = await getLocation(district, neighborhood);

  if (!current) {
    notFound();
  }

  const nearbyNeighborhoods = districtLocations
    .filter((loc) => loc.id !== current.id)
    .slice(0, 10)
    .map((loc) => ({
      id: loc.id,
      neighborhood: loc.neighborhood,
      slug: getCanonicalNeighborhoodSlug(loc.slug, loc.neighborhood),
    }));

  const faqs = [
    {
      question: `${current.neighborhood} Mahallesi'ne ne kadar sürede geliyorsunuz?`,
      answer: `${current.district} içindeki yoğunluk ve konuma göre tahmini ulaşım süresi telefonda paylaşılır, acil çağrılar öncelikli planlanır.`,
    },
    {
      question: `${current.neighborhood} için gece hizmeti var mı?`,
      answer: "Evet, 7/24 çağrı hattımız üzerinden gece dahil tüm saatlerde yönlendirme yapılır.",
    },
    {
      question: `${current.neighborhood} sayfasındaki fiyatlar sabit mi?`,
      answer: "Ücret; işlem tipi, kilit durumu ve mesafeye göre belirlenir. İşlem öncesinde net bilgilendirme yapılır.",
    },
  ];

  return (
    <main className="min-h-screen pt-24 pb-32">
      <JsonLd data={generateLocationSchema({ district: current.district, neighborhood: current.neighborhood, basePath: "/ordu" })} />
      <JsonLd data={generateFAQSchema(faqs)} />
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Ana Sayfa", url: "/" },
          { name: "Ordu", url: "/ordu" },
          { name: current.district, url: `/ordu/${district}` },
          { name: current.neighborhood, url: `/ordu/${district}/${neighborhood}` },
        ])}
      />

      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                {current.district} / {current.neighborhood}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-primary tracking-tight leading-[1.1]">
              {current.neighborhood} Mahallesi <span className="text-secondary">Çilingir</span> Hizmeti
            </h1>
            <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
              {current.content ||
                `${current.neighborhood} Mahallesi'nde kapıda kalma, kilit arızası ve acil anahtar sorunlarında ${current.district} saha ekibimizle hızlı destek sağlıyoruz.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="bg-secondary text-on-secondary px-8 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-3 shadow-2xl shadow-secondary/30 hover:brightness-110 transition-all"
              >
                <span className="material-symbols-outlined">call</span>
                Hemen Ulaşın
              </a>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-container text-white px-8 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-3 hover:bg-primary transition-all"
              >
                <span className="material-symbols-outlined">chat</span>
                WhatsApp Hattı
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 bg-surface-container-low p-2">
              <img
                alt={`${current.neighborhood} Mahallesi Ordu Haritası, Acil Çilingir`}
                className="w-full h-full object-cover rounded-2xl"
                src={mapImage}
              />
              <div className="absolute inset-0 pointer-events-none border-[12px] border-white/20 rounded-3xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 max-w-7xl mx-auto px-6">
        <div className="bg-surface-container-low rounded-2xl border border-outline-variant/20 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-primary mb-3">Bağlı Olduğu İlçe ve Yakın Mahalleler</h2>
          <p className="text-on-surface-variant mb-5">
            Bu sayfa {current.district} ilçesine bağlıdır. İlçe genelindeki diğer mahalle sayfalarına da buradan geçebilirsiniz.
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            <Link
              href={`/ordu/${district}`}
              className="px-4 py-2 rounded-full bg-primary text-white border border-primary hover:bg-primary-container transition-colors"
            >
              {current.district} İlçe Sayfası
            </Link>
            <Link
              href="/ordu"
              className="px-4 py-2 rounded-full bg-white border border-outline-variant/30 text-primary hover:bg-primary hover:text-white transition-colors"
            >
              Tüm Ordu İlçeleri
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {nearbyNeighborhoods.map((item) => (
              <Link
                key={item.id}
                href={`/ordu/${district}/${item.slug}`}
                className="p-3 rounded-xl text-sm text-center font-semibold bg-white border border-outline-variant/20 text-primary hover:bg-primary hover:text-white transition-colors"
              >
                {item.neighborhood}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-headline font-extrabold text-primary mb-8">Sık Sorulan Sorular</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/20"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-surface-container transition-colors">
                <span className="font-bold text-primary">{faq.question}</span>
                <span className="material-symbols-outlined text-secondary group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <div className="px-6 pb-6 text-on-surface-variant">{faq.answer}</div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
