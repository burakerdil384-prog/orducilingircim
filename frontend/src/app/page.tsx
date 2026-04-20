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
    : await prisma.post.findMany({
        where: { published: true },
        take: 3,
        orderBy: { createdAt: "desc" },
      });

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <main>
        <HeroSection />
        <ServicesGridSection />
        <WhyUsSection />
        <CoverageMapSection />
        <BlogSection posts={recentPosts} />
        <TestimonialsSection />
      </main>
    </>
  );
}
