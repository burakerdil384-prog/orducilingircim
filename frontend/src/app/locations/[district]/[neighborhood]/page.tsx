import Link from "next/link";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { generateLocationSchema, generateBreadcrumbSchema } from "@/lib/seo/schemas";
import { JsonLd } from "@/components/seo/json-ld";
import { isMockMode } from "@/lib/db";
import { mockLocations } from "@/lib/mock-data";
import { SITE_CONFIG } from "@/lib/utils";

const mapImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuDxTYTVUzA3CrcHYf97Ls_gCR0rKpYw3ZSw7jvhGpGXJUt7-uiOy2Lo13SM__Ta2PMNabokwBpU0BoXI9FEt9xZNbx17JrYXbiOZeqIxpPsidudoMaX_of1uRbsndJe1j_OyIVF4upeyNR-rCcw6yQPsh9RJGn12F9TpWUZ6Zlv1fxNCMKdPPgcufZ3PmcmIn1RbyuZguh4Pc9piFaMTcrBTKcseWIkROUwfLWASrPIViF5zZxC1WGLk1LMTsRkATseHIv_KsznEANq";

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

async function getLocation(district: string, neighborhood: string) {
  if (isMockMode) {
    return mockLocations.find((loc) => {
      const locDistrict = slugifyDistrict(loc.district);
      const locNeighborhood = loc.slug.split("-").slice(1).join("-");
      return locDistrict === district && locNeighborhood === neighborhood;
    }) || null;
  }
  
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/locations`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const locations = await res.json();
    return locations.find((loc: any) => {
      const locDistrict = slugifyDistrict(loc.district);
      const locNeighborhood = loc.slug.split("-").slice(1).join("-");
      return locDistrict === district && locNeighborhood === neighborhood;
    }) || null;
  } catch (error) {
    console.error('Failed to fetch location:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ district: string; neighborhood: string }> }): Promise<Metadata> {
  const { district, neighborhood } = await params;
  const location = await getLocation(district, neighborhood);
  if (!location) return {};
  return generatePageMetadata({
    title: `${location.neighborhood} Çilingir | ${location.district} - Ordu Çilingir`,
    description: location.description ?? "",
    path: `/locations/${district}/${neighborhood}`,
  });
}

export default async function LocationPage({ params }: { params: Promise<{ district: string; neighborhood: string }> }) {
  const { district, neighborhood } = await params;
  const location = await getLocation(district, neighborhood);

  if (!location) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-headline font-extrabold text-primary mb-4">Mahalle Bulunamadı</h1>
          <Link href="/" className="text-secondary font-bold">Ana Sayfaya Dön</Link>
        </div>
      </main>
    );
  }

  const allLocations = isMockMode ? mockLocations : [];

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
            <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
              {location.neighborhood} Mahallesi&apos;nde anahtarınızı mı unuttunuz? Panik yapmayın. Uzman ekibimizle <span className="font-bold text-primary">15 dakikada yanınızdayız.</span> Hasarsız kapı açma garantisi.
            </p>
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
              <img alt={`${location.neighborhood} Mahallesi Ordu Haritası`} className="w-full h-full object-cover rounded-2xl" src={mapImage} />
              <div className="absolute inset-0 pointer-events-none border-[12px] border-white/20 rounded-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="mt-24 max-w-7xl mx-auto px-6">
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

      {/* All Neighborhoods Grid */}
      <section className="mt-24 py-20 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-headline font-extrabold text-primary mb-4">Altınordu&apos;nun Tüm Mahallelerindeyiz</h2>
            <p className="text-on-surface-variant">Ordu&apos;nun neresinde olursanız olun bir telefon uzağınızdayız.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allLocations.map((loc) => {
              const locDistrict = slugifyDistrict(loc.district);
              const locNeighborhood = loc.slug.split("-").slice(1).join("-");
              const isActive = locDistrict === district && locNeighborhood === neighborhood;
              return (
                <Link
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
