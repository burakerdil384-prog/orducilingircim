import type { MetadataRoute } from "next";
import { prisma, isMockMode } from "@/lib/db";
import { mockServices, mockPosts, mockLocations } from "@/lib/mock-data";
import { slugify } from "@/lib/utils";
import { neighborhoodSlugFromLocationSlug } from "@/lib/locations/slug";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://orducilingircim.com.tr";
  const staticLastModified = new Date(
    process.env.NEXT_PUBLIC_SITEMAP_STATIC_LASTMOD || "2026-04-24T00:00:00.000Z"
  );

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: staticLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/ordu-cilingir`,
      lastModified: staticLastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/ordu-anahtarci`,
      lastModified: staticLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/ordu-oto-cilingir`,
      lastModified: staticLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/ordu-acil-cilingir-7-24`,
      lastModified: staticLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/altinordu-cilingir`,
      lastModified: staticLastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/ordu-hizmet-bolgeleri`,
      lastModified: staticLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/ordu`,
      lastModified: staticLastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/hizmetler`,
      lastModified: staticLastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: staticLastModified,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/iletisim`,
      lastModified: staticLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/gizlilik-politikasi`,
      lastModified: staticLastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/kullanim-sartlari`,
      lastModified: staticLastModified,
      changeFrequency: "yearly",
      priority: 0.4,
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
    console.error("Sitemap: services query failed, using mock fallback", e);
    servicePages = mockServices.map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: service.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));
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
    console.error("Sitemap: posts query failed, using mock fallback", e);
    blogPages = mockPosts
      .filter((p) => p.published)
      .map((post) => ({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
  }

  // Dynamic location pages
  let locationPages: MetadataRoute.Sitemap = [];
  let districtPages: MetadataRoute.Sitemap = [];
  const mapLocationPages = (
    locations: Array<{ district: string; slug: string; updatedAt: Date }>
  ) => {
    const orduLocationPages = locations.map((loc) => {
      const district = slugify(loc.district);
      const neighborhood = neighborhoodSlugFromLocationSlug(loc.slug);
      return {
        url: `${siteUrl}/ordu/${district}/${neighborhood}`,
        lastModified: loc.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.82,
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

    const mappedDistrictPages = Array.from(districtLastModified.entries()).map(([district, updatedAt]) => ({
      url: `${siteUrl}/ordu/${district}`,
      lastModified: updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

    return {
      mappedLocationPages: orduLocationPages,
      mappedDistrictPages,
    };
  };

  try {
    const locations = isMockMode
      ? mockLocations
      : await prisma.location.findMany({ select: { district: true, slug: true, updatedAt: true } });
    const mapped = mapLocationPages(locations);
    locationPages = mapped.mappedLocationPages;
    districtPages = mapped.mappedDistrictPages;
  } catch (e) {
    console.error("Sitemap: locations query failed, using mock fallback", e);
    const mapped = mapLocationPages(mockLocations);
    locationPages = mapped.mappedLocationPages;
    districtPages = mapped.mappedDistrictPages;
  }

  const allPages = [...staticPages, ...servicePages, ...blogPages, ...districtPages, ...locationPages];
  if (allPages.length < 20) {
    console.warn(
      `SITEMAP_HEALTH_WARNING: generated sitemap has unexpectedly low URL count (${allPages.length})`
    );
  }
  return allPages;
}
