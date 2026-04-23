import Link from "next/link";
import type { Metadata } from "next";
import { prisma, isMockMode } from "@/lib/db";
import { mockLocations, mockServices } from "@/lib/mock-data";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = generatePageMetadata({
  title: "Hizmetler",
  description:
    "Ordu Çilingir hizmetlerini ve servis verilen mahalleleri tek sayfada inceleyin. Hizmet detaylarına ve mahalle sayfalarına hızlıca ulaşın.",
  path: "/hizmetler",
});

async function getServices() {
  if (isMockMode) return mockServices;

  try {
    return await prisma.service.findMany({
      orderBy: { title: "asc" },
      select: { id: true, slug: true, title: true, description: true },
    });
  } catch (error) {
    console.error("HizmetlerPage: services query failed, falling back to mock data.", error);
    return mockServices;
  }
}

async function getLocations() {
  if (isMockMode) return mockLocations;

  try {
    return await prisma.location.findMany({
      orderBy: [{ district: "asc" }, { neighborhood: "asc" }],
      select: { id: true, district: true, neighborhood: true, slug: true, description: true },
    });
  } catch (error) {
    console.error("HizmetlerPage: locations query failed, falling back to mock data.", error);
    return mockLocations;
  }
}

function getNeighborhoodSlug(locationSlug: string, neighborhood: string): string {
  const parts = locationSlug.split("-");
  if (parts.length > 1) return parts.slice(1).join("-");
  return slugify(neighborhood);
}

export default async function HizmetlerPage() {
  const [services, locations] = await Promise.all([getServices(), getLocations()]);

  return (
    <main className="min-h-screen bg-surface">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-container py-24 px-6">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-secondary/20 blur-2xl" />
        <div className="absolute -bottom-28 -left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl space-y-4 mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold tracking-widest uppercase text-white">
              Hizmetler ve Lokasyonlar
            </span>
            <h1 className="text-4xl md:text-6xl font-headline font-extrabold text-white tracking-tight">
              Tüm Hizmetler ve Mahalle Sayfaları
            </h1>
            <p className="text-slate-200 text-lg leading-relaxed">
              Hizmet detaylarını inceleyin, ardından bulunduğunuz mahalle sayfasından doğrudan iletişime geçin.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
            <div className="rounded-xl bg-white/10 border border-white/20 p-4 text-center">
              <p className="text-2xl font-extrabold text-white">{services.length}</p>
              <p className="text-xs text-slate-200 uppercase tracking-wider">Hizmet</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/20 p-4 text-center">
              <p className="text-2xl font-extrabold text-white">{locations.length}</p>
              <p className="text-xs text-slate-200 uppercase tracking-wider">Mahalle</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/20 p-4 text-center">
              <p className="text-2xl font-extrabold text-white">7/24</p>
              <p className="text-xs text-slate-200 uppercase tracking-wider">Destek</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/20 p-4 text-center">
              <p className="text-2xl font-extrabold text-white">Ordu</p>
              <p className="text-xs text-slate-200 uppercase tracking-wider">Geneli</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pt-14">
        <div className="max-w-3xl space-y-4 mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-xs font-bold tracking-widest uppercase text-primary">
            Hizmetler ve Lokasyonlar
          </span>
          <h2 className="text-2xl md:text-3xl font-headline font-extrabold text-primary tracking-tight">
            Hizmet Seçin ve Doğrudan İlerleyin
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
            İhtiyacınıza uygun hizmete tıklayın, ardından mahalle sayfanızdan hızlıca ekip yönlendirelim.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary">Hizmetler</h2>
          <span className="text-sm text-on-surface-variant">{services.length} hizmet</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 hover:bg-primary hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-primary group-hover:text-white mb-2">{service.title}</h3>
              <p className="text-sm text-on-surface-variant group-hover:text-slate-300 leading-relaxed min-h-[48px]">
                {service.description || "Hizmet detaylarını görüntülemek için sayfaya gidin."}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-secondary font-bold group-hover:text-orange-300">
                Detaya Git
                <span className="material-symbols-outlined text-base">east</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary">Mahalleler / Lokasyonlar</h2>
          <span className="text-sm text-on-surface-variant">{locations.length} mahalle</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {locations.map((location) => {
            const districtSlug = slugify(location.district);
            const neighborhoodSlug = getNeighborhoodSlug(location.slug, location.neighborhood);

            return (
              <Link
                key={location.id}
                href={`/locations/${districtSlug}/${neighborhoodSlug}`}
                className="group bg-white p-4 rounded-xl border border-outline-variant/20 shadow-sm hover:bg-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-secondary group-hover:text-orange-300">
                  {location.district}
                </p>
                <p className="text-sm font-bold text-primary group-hover:text-white mt-1 leading-snug">
                  {location.neighborhood}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-6 pb-24">
        <div className="bg-surface-container-low rounded-2xl border border-outline-variant/20 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-primary mb-3">Ordu Genelinde Öne Çıkan Çilingir Sayfaları</h2>
          <p className="text-on-surface-variant mb-5 leading-relaxed">
            Ordu genelinde en çok aranan hizmet başlıklarına bu sayfalardan hızlıca ulaşabilirsiniz.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/ordu-cilingir" className="px-4 py-2 rounded-full bg-white border border-outline-variant/30 text-primary hover:bg-primary hover:text-white transition-colors">
              Ordu Çilingir
            </Link>
            <Link href="/ordu-anahtarci" className="px-4 py-2 rounded-full bg-white border border-outline-variant/30 text-primary hover:bg-primary hover:text-white transition-colors">
              Ordu Anahtarcı
            </Link>
            <Link href="/ordu-oto-cilingir" className="px-4 py-2 rounded-full bg-white border border-outline-variant/30 text-primary hover:bg-primary hover:text-white transition-colors">
              Ordu Oto Çilingir
            </Link>
            <Link href="/ordu-acil-cilingir-7-24" className="px-4 py-2 rounded-full bg-white border border-outline-variant/30 text-primary hover:bg-primary hover:text-white transition-colors">
              Ordu Acil Çilingir 7/24
            </Link>
            <Link href="/altinordu-cilingir" className="px-4 py-2 rounded-full bg-white border border-outline-variant/30 text-primary hover:bg-primary hover:text-white transition-colors">
              Altınordu Çilingir
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
