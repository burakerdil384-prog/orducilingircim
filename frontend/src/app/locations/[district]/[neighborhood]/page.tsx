import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { generateLocationSchema, generateBreadcrumbSchema } from "@/lib/seo/schemas";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_CONFIG } from "@/lib/utils";
import { getCanonicalNeighborhoodSlug } from "@/lib/locations/ordu-data";
import { slugify } from "@/lib/locations/slug";
import { getAllLocations } from "@/lib/locations/repository";

export const dynamic = 'force-dynamic';

const mapImage = "/images/location-map.webp";

async function getLocation(district: string, neighborhood: string) {
  const locations = await getAllLocations();
  return locations.find((loc) => {
    const locDistrict = slugify(loc.district);
    const locNeighborhood = getCanonicalNeighborhoodSlug(loc.slug, loc.neighborhood);
    return locDistrict === district && locNeighborhood === neighborhood;
  }) || null;
}

export async function generateMetadata({ params }: { params: Promise<{ district: string; neighborhood: string }> }): Promise<Metadata> {
  const { district, neighborhood } = await params;
  const location = await getLocation(district, neighborhood);
  if (!location) return {};
  return generatePageMetadata({
    title: `${location.neighborhood} Çilingir | ${location.district} - Ordu Çilingir`,
    description: location.description ?? "",
    path: `/locations/${district}/${neighborhood}`,
    noIndex: true,
  });
}

export default async function LocationPage({ params }: { params: Promise<{ district: string; neighborhood: string }> }) {
  const { district, neighborhood } = await params;
  const location = await getLocation(district, neighborhood);

  if (!location) {
    notFound();
  }

  const allLocations = await getAllLocations();
  const districtLocations = allLocations.filter((loc) => slugify(loc.district) === district);

  return (
    <main className="min-h-screen pt-24 pb-32">
      <JsonLd data={generateLocationSchema({ district: location.district, neighborhood: location.neighborhood })} />
      <JsonLd data={generateBreadcrumbSchema([{ name: "Ana Sayfa", url: "/" }, { name: location.district, url: `/locations/${district}` }, { name: location.neighborhood, url: `/locations/${district}/${neighborhood}` }])} />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">{location.district} / {location.neighborhood}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-primary tracking-tight leading-[1.1]">
              {location.neighborhood} Mahallesi <span className="text-secondary">Çilingir</span> Hizmeti
            </h1>
            {location.description ? (
              <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
                {location.description}
              </p>
            ) : (
              <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
                {location.neighborhood} Mahallesi&apos;nde anahtarınızı mı unuttunuz? Panik yapmayın. Uzman ekibimizle <span className="font-bold text-primary">15 dakikada yanınızdayız.</span> Hasarsız kapı açma garantisi.
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="bg-secondary text-on-secondary px-8 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-3 shadow-2xl shadow-secondary/30 hover:brightness-110 transition-all">
                <span className="material-symbols-outlined">call</span>
                Hemen Ulaşın
              </a>
              <a href={`https://wa.me/${SITE_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer" className="bg-primary-container text-white px-8 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-3 hover:bg-primary transition-all">
                <span className="material-symbols-outlined">chat</span>
                WhatsApp Hattı
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 bg-surface-container-low p-2">
              <img alt={`${location.neighborhood} Mahallesi Ordu Haritası, Acil Çilingir`} className="w-full h-full object-cover rounded-2xl" src={mapImage} />
              <div className="absolute inset-0 pointer-events-none border-[12px] border-white/20 rounded-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards / Content */}
      <section className="mt-24 max-w-7xl mx-auto px-6">
        {location.content ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-outline-variant/10 prose prose-lg max-w-none text-on-surface-variant mb-12">
            <p>{location.content}</p>
          </div>
        ) : null}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/10">
            <span className="material-symbols-outlined text-4xl text-secondary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>speed</span>
            <h3 className="text-xl font-bold text-primary mb-2">Hızlı Müdahale</h3>
            <p className="text-on-surface-variant">Konumunuza en yakın mobil aracımızı yönlendirerek Ordu {location.neighborhood} bölgesinde 15 dakikada servis sağlıyoruz.</p>
          </div>
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/10">
            <span className="material-symbols-outlined text-4xl text-secondary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            <h3 className="text-xl font-bold text-primary mb-2">Sertifikalı Uzmanlar</h3>
            <p className="text-on-surface-variant">Tüm personelimiz oda kayıtlı, profesyonel eğitim almış sertifikalı çilingirlerden oluşmaktadır.</p>
          </div>
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/10">
            <span className="material-symbols-outlined text-4xl text-secondary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>key_visualizer</span>
            <h3 className="text-xl font-bold text-primary mb-2">Modern Ekipman</h3>
            <p className="text-on-surface-variant">En yeni teknikleri ve ekipmanları kullanarak kapılarınıza hiçbir zarar vermeden açma işlemini gerçekleştiriyoruz.</p>
          </div>
        </div>
      </section>

      <section className="mt-12 max-w-7xl mx-auto px-6">
        <div className="bg-surface-container-low rounded-2xl border border-outline-variant/20 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-primary mb-3">Ordu Geneli Sayfalar</h2>
          <p className="text-on-surface-variant mb-5">
            İlçe/mahalle detayından sonra genel sayfalara buradan geçebilirsiniz.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/ordu-cilingir" className="px-4 py-2 rounded-full bg-white border border-outline-variant/30 text-primary hover:bg-primary hover:text-white transition-colors">Ordu Çilingir</Link>
            <Link href="/ordu-acil-cilingir-7-24" className="px-4 py-2 rounded-full bg-white border border-outline-variant/30 text-primary hover:bg-primary hover:text-white transition-colors">Ordu Acil Çilingir 7/24</Link>
            <Link href="/ordu-hizmet-bolgeleri" className="px-4 py-2 rounded-full bg-white border border-outline-variant/30 text-primary hover:bg-primary hover:text-white transition-colors">Ordu Hizmet Bölgeleri</Link>
            <Link href="/hizmetler" className="px-4 py-2 rounded-full bg-white border border-outline-variant/30 text-primary hover:bg-primary hover:text-white transition-colors">Hizmetler</Link>
          </div>
        </div>
      </section>

      {/* All Neighborhoods Grid */}
      <section className="mt-24 py-20 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-headline font-extrabold text-primary mb-4">{location.district}&apos;daki Diğer Mahalleler</h2>
            <p className="text-on-surface-variant">Ordu&apos;nun neresinde olursanız olun bir telefon uzağınızdayız.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {districtLocations.map((loc) => {
              const locDistrict = slugify(loc.district);
              const locNeighborhood = getCanonicalNeighborhoodSlug(loc.slug, loc.neighborhood);
              const isActive = locDistrict === district && locNeighborhood === neighborhood;
              return (
                <Link
                  prefetch={false}
                  key={loc.id}
                  href={`/locations/${locDistrict}/${locNeighborhood}`}
                  className={`p-4 rounded-xl text-center text-sm font-semibold transition-all shadow-sm ${
                    isActive
                      ? "bg-secondary text-white font-extrabold shadow-md scale-105"
                      : "bg-white text-primary hover:bg-primary hover:text-white"
                  }`}
                >
                  {loc.neighborhood}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="mt-24 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-lg font-headline font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-12">Güvenilir Çözüm Ortaklarımız ve Belgelerimiz</h2>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-4xl">workspace_premium</span>
            <span className="font-bold text-xl">Ustalık Belgesi</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-4xl">admin_panel_settings</span>
            <span className="font-bold text-xl">Oda Kayıtlı</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-4xl">verified</span>
            <span className="font-bold text-xl">ISO 9001</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-4xl">handshake</span>
            <span className="font-bold text-xl">Resmi Kurum Onaylı</span>
          </div>
        </div>
      </section>
    </main>
  );
}
