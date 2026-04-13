const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://orducilingircim.com.tr";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Ordu Çilingir";
const PHONE = process.env.NEXT_PUBLIC_PHONE || "0500 000 00 00";

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Locksmith",
    name: SITE_NAME,
    description:
      "Ordu Altınordu bölgesinde 7/24 profesyonel çilingir hizmeti. Kapı açma, kasa açma, oto çilingir ve anahtar kopyalama.",
    url: SITE_URL,
    telephone: PHONE,
    address: {
      "@type": "PostalAddress",
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
        "@type": "City",
        name: "Ordu",
      },
      {
        "@type": "AdministrativeArea",
        name: "Altınordu",
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
    sameAs: [],
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
      telephone: PHONE,
    },
    areaServed: {
      "@type": "City",
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
  return {
    "@context": "https://schema.org",
    "@type": "Locksmith",
    name: `${location.neighborhood} Çilingir - ${SITE_NAME}`,
    description: `${location.neighborhood}, ${location.district} bölgesinde 7/24 profesyonel çilingir hizmeti.`,
    url: `${SITE_URL}/locations/${encodeURIComponent(location.district.toLowerCase())}/${encodeURIComponent(location.neighborhood.toLowerCase())}`,
    telephone: PHONE,
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
