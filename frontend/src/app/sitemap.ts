import type { MetadataRoute } from "next";
import { prisma, isMockMode } from "@/lib/db";
import { mockServices, mockPosts, mockLocations } from "@/lib/mock-data";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://orducilingircim.com.tr";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/ordu-cilingir`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/ordu-anahtarci`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/ordu-oto-cilingir`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/ordu-acil-cilingir-7-24`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/altinordu-cilingir`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/ordu-hizmet-bolgeleri`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/hizmetler`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic service pages
  let servicePages: MetadataRoute.Sitemap = [];
  try {
    const services = isMockMode
      ? mockServices
      : await prisma.service.findMany({ select: { slug: true, updatedAt: true } });
    servicePages = services.map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: service.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));
  } catch (e) {
    console.error("Sitemap: services query failed", e);
  }

  // Dynamic blog pages
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = isMockMode
      ? mockPosts.filter((p) => p.published)
      : await prisma.post.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } });
    blogPages = posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (e) {
    console.error("Sitemap: posts query failed", e);
  }

  // Dynamic location pages
  let locationPages: MetadataRoute.Sitemap = [];
  let districtPages: MetadataRoute.Sitemap = [];
  try {
    const locations = isMockMode
      ? mockLocations
      : await prisma.location.findMany({ select: { district: true, slug: true, updatedAt: true } });
    locationPages = locations.map((loc) => {
      const district = slugify(loc.district);
      const neighborhood = loc.slug.split("-").slice(1).join("-");
      return {
        url: `${siteUrl}/locations/${district}/${neighborhood}`,
        lastModified: loc.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      };
    });

    const districtLastModified = new Map<string, Date>();
    for (const loc of locations) {
      const district = slugify(loc.district);
      const prev = districtLastModified.get(district);
      if (!prev || loc.updatedAt > prev) {
        districtLastModified.set(district, loc.updatedAt);
      }
    }

    districtPages = Array.from(districtLastModified.entries()).map(([district, updatedAt]) => ({
      url: `${siteUrl}/locations/${district}`,
      lastModified: updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }));
  } catch (e) {
    console.error("Sitemap: locations query failed", e);
  }

  return [...staticPages, ...servicePages, ...blogPages, ...districtPages, ...locationPages];
}
