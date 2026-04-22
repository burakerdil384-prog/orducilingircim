import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://orducilingircim.com.tr";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Ordu Çilingir";

interface MetadataOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

function composeTitleWithBrand(title: string): string {
  const cleanTitle = title.trim();
  const cleanSiteName = SITE_NAME.trim();

  if (!cleanTitle) return cleanSiteName;

  const normalizedTitle = cleanTitle.toLocaleLowerCase("tr-TR");
  const normalizedSiteName = cleanSiteName.toLocaleLowerCase("tr-TR");

  if (
    normalizedTitle === normalizedSiteName ||
    normalizedTitle.includes(`| ${normalizedSiteName}`) ||
    normalizedTitle.includes(`- ${normalizedSiteName}`) ||
    normalizedTitle.includes(`— ${normalizedSiteName}`)
  ) {
    return cleanTitle;
  }

  return `${cleanTitle} | ${cleanSiteName}`;
}

export function generatePageMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: MetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image || `${SITE_URL}/og-image.jpg`;
  const fullTitle = composeTitleWithBrand(title);

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "tr_TR",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
