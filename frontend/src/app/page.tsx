import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { generateLocalBusinessSchema } from "@/lib/seo";
import { prisma, isMockMode } from "@/lib/db";
import { mockPosts } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

import {
  HeroSection,
  ServicesGridSection,
  WhyUsSection,
  CoverageMapSection,
  BlogSection,
  TestimonialsSection,
} from "@/components/sections";

export default async function HomePage() {
  const localBusinessSchema = generateLocalBusinessSchema();

  const recentPosts = isMockMode
    ? mockPosts.filter((p) => p.published).slice(0, 3)
    : await prisma.post
        .findMany({
          where: { published: true },
          take: 3,
          orderBy: { createdAt: "desc" },
        })
        .catch((error) => {
          console.error("HomePage: posts query failed, falling back to mock data.", error);
          return mockPosts.filter((p) => p.published).slice(0, 3);
        });

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <main>
        <HeroSection />
        <ServicesGridSection />
        <WhyUsSection />
        <CoverageMapSection />
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
        <BlogSection posts={recentPosts} />
        <TestimonialsSection />
      </main>
    </>
  );
}
