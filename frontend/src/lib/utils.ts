import { slugify as slugifyLocation } from "@/lib/locations/slug";

export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Ordu Çilingir",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://orducilingircim.com.tr",
  phone: process.env.NEXT_PUBLIC_PHONE || "0554 127 92 92",
  phoneRaw: process.env.NEXT_PUBLIC_PHONE_RAW || "+905541279292",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "905541279292",
  description:
    "Ordu genelinde 7/24 profesyonel çilingir hizmeti. Altınordu merkezli mobil ekip ile kapı açma, oto çilingir, kilit değişimi ve anahtarcı desteği.",
  address: {
    line: "Şarkiye Mh, Bucak Caddesi No:20/A",
    district: "Altınordu",
    city: "Ordu",
    country: "TR",
  },
  mapsUrl: "https://maps.app.goo.gl/goewe3A26KSmXKdh7?g_st=awb",
  mapsPlaceUrl: "https://maps.app.goo.gl/goewe3A26KSmXKdh7?g_st=awb",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Ordu%C3%A7ilingircim%2C%20%C5%9Earkiye%2C%20Alt%C4%B1nordu%2FOrdu&output=embed",
} as const;

export function slugify(text: string): string {
  return slugifyLocation(text);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
