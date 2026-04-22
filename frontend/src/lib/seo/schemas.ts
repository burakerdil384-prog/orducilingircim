import { SITE_CONFIG } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://orducilingircim.com.tr";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Ordu Çilingir";
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE || "0554 127 92 92";
const PHONE_E164 = process.env.NEXT_PUBLIC_PHONE_RAW || "+905541279292";
const SAME_AS = [
  process.env.NEXT_PUBLIC_GBP_URL,
  process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  process.env.NEXT_PUBLIC_FACEBOOK_URL,
].filter(Boolean) as string[];
const HAS_MAP = process.env.NEXT_PUBLIC_GBP_MAP_URL || SITE_CONFIG.mapsUrl;

function slugifySegment(value: string) {
  return value
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/\s+/g, "-");
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Locksmith", "LocalBusiness"],
    "@id": `${SITE_URL}/#locksmith`,
    name: SITE_NAME,
    description:
      "Ordu genelinde 7/24 profesyonel çilingir hizmeti. Altınordu merkezli mobil ekip ile kapı açma, oto çilingir, kilit değişimi ve anahtarcı desteği.",
    url: SITE_URL,
    telephone: PHONE_E164,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: PHONE_E164,
        availableLanguage: ["tr-TR"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.line,
      addressLocality: "Altınordu",
      addressRegion: "Ordu",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.9839,
      longitude: 37.8764,
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Ordu",
      },
      {
        "@type": "AdministrativeArea",
        name: "Altınordu",
      },
      {
        "@type": "AdministrativeArea",
        name: "Ünye",
      },
      {
        "@type": "AdministrativeArea",
        name: "Fatsa",
      },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "₺₺",
    image: `${SITE_URL}/og-image.jpg`,
    hasMap: HAS_MAP,
    sameAs: SAME_AS,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "displayPhone",
        value: PHONE_DISPLAY,
      },
    ],
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  slug: string;
  price?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: {
      "@type": "Locksmith",
      name: SITE_NAME,
      telephone: PHONE_E164,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Ordu",
    },
    ...(service.price && {
      offers: {
        "@type": "Offer",
        price: service.price,
        priceCurrency: "TRY",
      },
    }),
  };
}

export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateArticleSchema(article: {
  title: string;
  slug: string;
  excerpt?: string;
  image?: string;
  createdAt: string;
  updatedAt?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    url: `${SITE_URL}/blog/${article.slug}`,
    image: article.image || `${SITE_URL}/og-image.jpg`,
    datePublished: article.createdAt,
    dateModified: article.updatedAt || article.createdAt,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateLocationSchema(location: {
  district: string;
  neighborhood: string;
}) {
  const districtSlug = slugifySegment(location.district);
  const neighborhoodSlug = slugifySegment(location.neighborhood);
  return {
    "@context": "https://schema.org",
    "@type": "Locksmith",
    name: `${location.neighborhood} Çilingir - ${SITE_NAME}`,
    description: `${location.neighborhood}, ${location.district} bölgesinde 7/24 profesyonel çilingir hizmeti.`,
    url: `${SITE_URL}/locations/${districtSlug}/${neighborhoodSlug}`,
    telephone: PHONE_E164,
    address: {
      "@type": "PostalAddress",
      addressLocality: location.district,
      addressRegion: "Ordu",
      addressCountry: "TR",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${location.neighborhood}, ${location.district}`,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  };
}
