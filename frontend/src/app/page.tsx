import type { Metadata } from "next";
import Link from "next/link";
import { unstable_cache } from "next/cache";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { prisma, isMockMode } from "@/lib/db";
import { mockPosts } from "@/lib/mock-data";
import {
  HeroSection,
  ServicesGridSection,
  WhyUsSection,
  CoverageMapSection,
  NeighborhoodDirectorySection,
  BlogSection,
  TestimonialsSection,
} from "@/components/sections";

export const revalidate = 900;

export const metadata: Metadata = generatePageMetadata({
  title: "Ordu Çilingir",
  description:
    "Ordu genelinde 7/24 profesyonel çilingir hizmeti. Altınordu merkezli mobil ekip ile kapı açma, oto çilingir, kilit değişimi ve anahtarcı desteği.",
  path: "/",
});

const getRecentPosts = unstable_cache(
  async () =>
    prisma.post
      .findMany({
        where: { published: true },
        take: 3,
        orderBy: { createdAt: "desc" },
      })
      .catch((error) => {
        console.error("HomePage: posts query failed, falling back to mock data.", error);
        return mockPosts.filter((p) => p.published).slice(0, 3);
      }),
  ["home-recent-posts"],
  { revalidate: 900 }
);

export default async function HomePage() {
  const recentPosts = isMockMode
    ? mockPosts.filter((p) => p.published).slice(0, 3)
    : await getRecentPosts();

  return (
    <>
      <main>
        <HeroSection />
        <ServicesGridSection />
        <WhyUsSection />
        <CoverageMapSection />
        <NeighborhoodDirectorySection />
        <section className="py-14 px-6 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-headline font-extrabold text-primary mb-3">Ordu Çilingir Rehberi</h2>
            <p className="text-on-surface-variant mb-5">
              Ordu genelinde en çok aranan hizmet sayfalarına buradan hızlıca geçebilirsiniz.
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
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-headline font-extrabold text-primary mb-3">Sık Karşılaşılan Sorunlar</h2>
            <p className="text-on-surface-variant mb-5">
              En çok yaşanan çilingir ihtiyaçları için ilgili sayfaya tek tıkla ulaşın.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/ordu-acil-cilingir-7-24"
                className="rounded-2xl border border-outline-variant/30 bg-surface-container-low px-5 py-4 text-primary hover:bg-primary hover:text-white transition-colors"
              >
                Kapıda kaldım, hemen yardım lazım
              </Link>
              <Link
                href="/ordu-oto-cilingir"
                className="rounded-2xl border border-outline-variant/30 bg-surface-container-low px-5 py-4 text-primary hover:bg-primary hover:text-white transition-colors"
              >
                Araç anahtarı içeride kaldı veya kayboldu
              </Link>
              <Link
                href="/ordu-cilingir"
                className="rounded-2xl border border-outline-variant/30 bg-surface-container-low px-5 py-4 text-primary hover:bg-primary hover:text-white transition-colors"
              >
                Ev ve iş yeri kilit sorunları
              </Link>
              <Link
                href="/iletisim"
                className="rounded-2xl border border-outline-variant/30 bg-surface-container-low px-5 py-4 text-primary hover:bg-primary hover:text-white transition-colors"
              >
                Ustaya danışmak ve fiyat bilgisi almak istiyorum
              </Link>
            </div>
          </div>
        </section>
        <BlogSection posts={recentPosts} />
        <TestimonialsSection />
      </main>
    </>
  );
}
